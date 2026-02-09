<?php

namespace App\Service;

use App\Entity\Character;

interface ActionInterface
{
    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void;
}

class AttackAction implements ActionInterface
{
    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        $initialTargetIndex = CombatEngine::getRandomAliveIndex($teamEnemies);
        if ($initialTargetIndex === null)
            return;

        $initialTargetData =& $teamEnemies[$initialTargetIndex];
        $targetData =& $initialTargetData;

        if (in_array('protected', $initialTargetData['statuses'], true) && isset($initialTargetData['protectedBy'])) {
            foreach ($teamEnemies as &$edata) {
                if ($edata['char'] === $initialTargetData['protectedBy'] && $edata['char']->getHP() > 0) {
                    $logs[] = [
                        'type' => 'protect',
                        'protector' => $edata['char']->getName(),
                        'protectorTeam' => $edata['team'],
                        'protected' => $initialTargetData['char']->getName(),
                        'protectedTeam' => $initialTargetData['team'],
                        'message' => CombatEngine::colorNameStatic($edata) . " protège " . CombatEngine::colorNameStatic($initialTargetData)
                    ];
                    $targetData =& $edata;
                    break;
                }
            }
        }

        $target = $targetData['char'];

        if (rand(1, 100) <= $target->getDODGE()) {
            $logs[] = [
                'type' => 'dodge',
                'attacker' => $user->getName(),
                'attackerTeam' => $userData['team'],
                'target' => $target->getName(),
                'targetTeam' => $targetData['team'],
                'message' => CombatEngine::colorNameStatic($targetData) . " esquive l'attaque de " . CombatEngine::colorNameStatic($userData)
            ];
            return;
        }

        $damage = rand($user->getDMGMIN(), $user->getDMGMAX());
        $isCrit = false;

        if (rand(1, 100) <= $user->getCRIT()) {
            $damage = (int) ($damage * 1.5);
            $isCrit = true;
        }

        $newHP = max(0, $target->getHP() - $damage);
        $target->setHP($newHP);

        $logs[] = [
            'type' => 'attack',
            'attacker' => $user->getName(),
            'attackerTeam' => $userData['team'],
            'target' => $target->getName(),
            'targetTeam' => $targetData['team'],
            'damage' => $damage,
            'targetHP' => $newHP,
            'targetMaxHP' => $targetData['HP_MAX'],
            'isCrit' => $isCrit,
            'message' => CombatEngine::colorNameStatic($userData) . " attaque " . CombatEngine::colorNameStatic($targetData) . " → $damage dégâts (HP: $newHP)" . ($isCrit ? " (CRIT!)" : "")
        ];

        if ($newHP === 0 && !in_array('dead', $targetData['statuses'], true)) {
            $targetData['statuses'][] = 'dead';
            $logs[] = [
                'type' => 'death',
                'target' => $target->getName(),
                'targetTeam' => $targetData['team'],
                'message' => CombatEngine::colorNameStatic($targetData) . " est K.O !"
            ];
        }
    }
}

class HealAction implements ActionInterface
{
    private int $healAmount;
    private int $cooldownTurns;

    public function __construct(int $healAmount, int $cooldownTurns = 2)
    {
        $this->healAmount = $healAmount;
        $this->cooldownTurns = $cooldownTurns;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['heal'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $targetIndex = $this->getLowestHPIndex($teamAllies);
        if ($targetIndex === null)
            return;

        $targetData =& $teamAllies[$targetIndex];
        $target = $targetData['char'];

        if ($target->getHP() >= $targetData['HP_MAX']) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $healAmount = min($this->healAmount, $targetData['HP_MAX'] - $target->getHP());
        $target->setHP($target->getHP() + $healAmount);

        $logs[] = [
            'type' => 'heal',
            'healer' => $user->getName(),
            'healerTeam' => $userData['team'],
            'target' => $target->getName(),
            'targetTeam' => $targetData['team'],
            'amount' => $healAmount,
            'targetHP' => $target->getHP(),
            'targetMaxHP' => $targetData['HP_MAX'],
            'message' => CombatEngine::colorNameStatic($userData) . " soigne " . CombatEngine::colorNameStatic($targetData) . " (+$healAmount PV)"
        ];

        $userData['cooldowns']['heal'] = $this->cooldownTurns;
    }

    private function getLowestHPIndex(array $team): ?int
    {
        $lowest = null;
        $ratio = 999;

        foreach ($team as $i => $data) {
            if ($data['char']->getHP() <= 0)
                continue;

            $currentRatio = $data['char']->getHP() / $data['HP_MAX'];
            if ($currentRatio < $ratio) {
                $ratio = $currentRatio;
                $lowest = $i;
            }
        }

        return $lowest;
    }
}

class DefendAllyAction implements ActionInterface
{
    private int $cooldownTurns = 4;

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['defend'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $choices = [];
        foreach ($teamAllies as $i => $data) {
            if ($data['char'] !== $user && $data['char']->getHP() > 0) {
                $choices[] = $i;
            }
        }

        if (empty($choices)) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $targetIndex = $choices[array_rand($choices)];
        $targetData =& $teamAllies[$targetIndex];

        $targetData['statuses'][] = 'protected';
        $targetData['protectedBy'] = $user;
        $targetData['protectTurns'] = 2;

        $logs[] = [
            'type' => 'defend',
            'defender' => $user->getName(),
            'defenderTeam' => $userData['team'],
            'target' => $targetData['char']->getName(),
            'targetTeam' => $targetData['team'],
            'duration' => 2,
            'message' => CombatEngine::colorNameStatic($userData) . " protège " . CombatEngine::colorNameStatic($targetData) . " pendant 2 tours"
        ];

        $userData['cooldowns']['defend'] = $this->cooldownTurns;
    }
}

class CombatEngine
{
    public function fightBattleWithRounds(array &$team1, array &$team2, int $maxRounds = 50): array
    {
        $logs = [];

        $this->initializeTeamData($team1);
        $this->initializeTeamData($team2);

        $round = 1;

        while ($this->teamAlive($team1) && $this->teamAlive($team2) && $round <= $maxRounds) {

            $logs[] = [
                'type' => 'round',
                'round' => $round,
                'message' => "=== Tour $round ==="
            ];

            $this->tickTeam($team1);
            $this->tickTeam($team2);

            $turnOrder = $this->rollInitiative($team1, $team2);
            $this->attackPhase($turnOrder, $team1, $team2, $logs);

            $round++;
        }

        if ($this->teamAlive($team1)) {
            $logs[] = [
                'type' => 'victory',
                'winner' => 'Equipe 1',
                'message' => "Equipe 1 gagne !"
            ];
        } elseif ($this->teamAlive($team2)) {
            $logs[] = [
                'type' => 'victory',
                'winner' => 'Equipe 2',
                'message' => "Equipe 2 gagne !"
            ];
        } else {
            $logs[] = [
                'type' => 'draw',
                'message' => "Match nul !"
            ];
        }

        return $logs;
    }

    private function initializeTeamData(array &$team): void
    {
        foreach ($team as &$data) {
            $char = $data['char'];

            $data['HP_MAX'] = $char->getHP();
            $data['cooldowns'] = $data['cooldowns'] ?? [];
            $data['statuses'] = $data['statuses'] ?? [];

            $actions = [];
            $roleName = $char->getRole()?->getName();

            switch ($roleName) {
                case 'DPS':
                    // DPS : attaque uniquement
                    $actions[] = new AttackAction();
                    break;
                case 'Tank':
                    // Tank : attaque + défense d'allié
                    $actions[] = new AttackAction();
                    $actions[] = new DefendAllyAction();
                    break;
                case 'Soigneur':
                    // Soigneur : attaque + soin
                    $actions[] = new AttackAction();
                    $actions[] = new HealAction(20);
                    break;
                case 'Support':
                    // Support : attaque + soin léger
                    $actions[] = new AttackAction();
                    $actions[] = new HealAction(15);
                    break;
                case 'Buffer':
                    // Buffer : attaque + défense
                    $actions[] = new AttackAction();
                    $actions[] = new DefendAllyAction();
                    break;
                default:
                    // Fallback : au moins l'attaque de base
                    $actions[] = new AttackAction();
                    break;
            }

            $data['actions'] = $actions;
        }
    }

    private function tickTeam(array &$team): void
    {
        foreach ($team as &$data) {

            foreach ($data['cooldowns'] as $key => $cd) {
                if ($cd > 0) {
                    $data['cooldowns'][$key]--;
                }
            }

            if (isset($data['protectTurns'])) {
                $data['protectTurns']--;
                if ($data['protectTurns'] <= 0) {
                    unset($data['protectTurns']);
                    unset($data['protectedBy']);
                    $data['statuses'] = array_values(array_filter(
                        $data['statuses'],
                        fn($s) => $s !== 'protected'
                    ));
                }
            }
        }
    }

    private function attackPhase(array $turnOrder, array &$team1, array &$team2, array &$logs): void
    {
        foreach ($turnOrder as &$actorData) {

            $attacker = $actorData['char'];
            if ($attacker->getHP() <= 0)
                continue;

            if ($actorData['team'] === 'Equipe 1') {
                $teamAllies =& $team1;
                $teamEnemies =& $team2;
            } else {
                $teamAllies =& $team2;
                $teamEnemies =& $team1;
            }

            $actions = $actorData['actions'] ?? [];
            if (empty($actions))
                continue;

            $action = $actions[array_rand($actions)];
            $action->execute($attacker, $teamAllies, $teamEnemies, $logs, $actorData);
        }
    }

    private function rollInitiative(array &$team1, array &$team2): array
    {
        $all = array_merge($team1, $team2);

        foreach ($all as &$data) {
            $char = $data['char'];
            $roll = rand(1, 20);

            $data['initiative'] = $roll + $char->getSPEED() + ($char->getSPEED() / 100) + (rand(0, 99) / 1000);

            if (!isset($data['HP_MAX']))
                $data['HP_MAX'] = $char->getHP();
            if (!isset($data['cooldowns']))
                $data['cooldowns'] = [];
            if (!isset($data['statuses']))
                $data['statuses'] = [];
        }

        usort($all, fn($a, $b) => $b['initiative'] <=> $a['initiative']);

        return $all;
    }

    public static function getRandomAliveIndex(array $team): ?int
    {
        $alive = [];

        foreach ($team as $i => $data) {
            if ($data['char']->getHP() > 0) {
                $alive[] = $i;
            }
        }

        return empty($alive) ? null : $alive[array_rand($alive)];
    }

    private function teamAlive(array $team): bool
    {
        foreach ($team as $data) {
            if ($data['char']->getHP() > 0)
                return true;
        }
        return false;
    }

    public static function colorNameStatic(array $data): string
    {
        $name = $data['char']->getName();

        if (($data['team'] ?? '') === 'Equipe 1') {
            return "<span style='color:#4da6ff;'>$name</span>";
        }

        return "<span style='color:#ff4d4d;'>$name</span>";
    }
}