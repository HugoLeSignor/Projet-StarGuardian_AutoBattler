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
        if ($initialTargetIndex === null) return;

        $initialTargetData =& $teamEnemies[$initialTargetIndex];
        $targetData =& $initialTargetData;

        if (in_array('protected', $initialTargetData['statuses'], true) && isset($initialTargetData['protectedBy'])) {
            foreach ($teamEnemies as &$edata) {
                if ($edata['char'] === $initialTargetData['protectedBy'] && $edata['char']->getHP() > 0) {
                    $logs[] = CombatEngine::colorNameStatic($edata) . " protège " . CombatEngine::colorNameStatic($initialTargetData);
                    $targetData =& $edata;
                    break;
                }
            }
        }

        $target = $targetData['char'];

        if (rand(1, 100) <= $target->getDODGE()) {
            $logs[] = CombatEngine::colorNameStatic($targetData) . " esquive l'attaque de " . CombatEngine::colorNameStatic($userData);
            return;
        }

        $damage = rand($user->getDMGMIN(), $user->getDMGMAX());
        $crit = '';

        if (rand(1, 100) <= $user->getCRIT()) {
            $damage = (int)($damage * 1.5);
            $crit = " (CRIT!)";
        }

        $newHP = max(0, $target->getHP() - $damage);
        $target->setHP($newHP);

        $logs[] = CombatEngine::colorNameStatic($userData) . " attaque " . CombatEngine::colorNameStatic($targetData) . " → $damage dégâts (HP: $newHP)$crit";

        if ($newHP === 0 && !in_array('dead', $targetData['statuses'], true)) {
            $targetData['statuses'][] = 'dead';
            $logs[] = CombatEngine::colorNameStatic($targetData) . " est K.O !";
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
        if ($targetIndex === null) return;

        $targetData =& $teamAllies[$targetIndex];
        $target = $targetData['char'];

        if ($target->getHP() >= $targetData['HP_MAX']) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $healAmount = min($this->healAmount, $targetData['HP_MAX'] - $target->getHP());
        $target->setHP($target->getHP() + $healAmount);

        $logs[] = CombatEngine::colorNameStatic($userData) . " soigne " . CombatEngine::colorNameStatic($targetData) . " (+$healAmount PV)";

        $userData['cooldowns']['heal'] = $this->cooldownTurns;
    }

    private function getLowestHPIndex(array $team): ?int
    {
        $lowest = null;
        $ratio = 999;

        foreach ($team as $i => $data) {
            if ($data['char']->getHP() <= 0) continue;

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

        $logs[] = CombatEngine::colorNameStatic($userData) . " protège " . CombatEngine::colorNameStatic($targetData) . " pendant 2 tours";

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

            $logs[] = "=== Tour $round ===";

            $this->tickTeam($team1);
            $this->tickTeam($team2);

            $turnOrder = $this->rollInitiative($team1, $team2);

            foreach ($turnOrder as $data) {
                if ($data['char']->getHP() > 0) {
                    $logs[] = sprintf(
                        "%s → Initiative %.2f | HP %d",
                        self::colorNameStatic($data),
                        $data['initiative'],
                        $data['char']->getHP()
                    );
                }
            }

            $this->attackPhase($turnOrder, $team1, $team2, $logs);

            $round++;
        }

        if ($this->teamAlive($team1)) $logs[] = "Equipe 1 gagne !";
        elseif ($this->teamAlive($team2)) $logs[] = "Equipe 2 gagne !";
        else $logs[] = "Match nul !";

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

            switch ($char->getRole()->getId()) {
                case 1:
                    $actions[] = new AttackAction();
                    break;
                case 2:
                    $actions[] = new AttackAction();
                    $actions[] = new DefendAllyAction();
                    break;
                case 3:
                    $actions[] = new AttackAction();
                    $actions[] = new HealAction(20);
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
            if ($attacker->getHP() <= 0) continue;

            if ($actorData['team'] === 'Equipe 1') {
                $teamAllies =& $team1;
                $teamEnemies =& $team2;
            } else {
                $teamAllies =& $team2;
                $teamEnemies =& $team1;
            }

            $actions = $actorData['actions'] ?? [];
            if (empty($actions)) continue;

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

            if (!isset($data['HP_MAX'])) $data['HP_MAX'] = $char->getHP();
            if (!isset($data['cooldowns'])) $data['cooldowns'] = [];
            if (!isset($data['statuses'])) $data['statuses'] = [];
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
            if ($data['char']->getHP() > 0) return true;
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