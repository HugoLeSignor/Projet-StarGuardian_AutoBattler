<?php

namespace App\Service;

use App\Entity\Character;

class CombatEngine
{


    public function fightBattleWithRounds(array &$team1, array &$team2, int $maxRounds = 50): array
    {
        $logs = [];
        $round = 1;

        while ($this->teamAlive($team1) && $this->teamAlive($team2) && $round <= $maxRounds) {
            $logs[] = "=== Tour $round ===";

            $turnOrder = $this->rollInitiative($team1, $team2);

            foreach ($turnOrder as $data) {
                if ($data['char']->getHP() > 0) {
                    $logs[] = sprintf(
                        "%s (%s) → Initiative %.2f | HP %d",
                        $data['char']->getName(),
                        $data['team'],
                        $data['initiative'],
                        $data['char']->getHP()
                    );
                }
            }

            $this->attackPhase($turnOrder, $team1, $team2, $logs);

            $round++;
        }

        if ($this->teamAlive($team1)) {
            $logs[] = "Equipe 1 gagne !";
        } elseif ($this->teamAlive($team2)) {
            $logs[] = "Equipe 2 gagne !";
        } else {
            $logs[] = "Match nul !";
        }

        return $logs;
    }


    private function rollInitiative(array $team1, array $team2): array
    {
        $all = array_merge($team1, $team2);

        foreach ($all as &$data) {
            $char = $data['char'];
            $roll = rand(1, 20);
            $speedBonus = $char->getSPEED();
            $tieBreaker = ($char->getSPEED() / 100) + (rand(0, 99) / 1000);

            $data['initiative'] = $roll + $speedBonus + $tieBreaker;
        }

        usort($all, fn($a, $b) => $b['initiative'] <=> $a['initiative']);

        return $all;
    }

    private function attackPhase(array $turnOrder, array &$team1, array &$team2, array &$logs): void
    {
        foreach ($turnOrder as $actorData) {

            $attacker = $actorData['char'];
            if ($attacker->getHP() <= 0) continue;

            $enemyTeam = ($actorData['team'] === 'Equipe 1' ? $team2 : $team1);
            $targetIndex = $this->getRandomAliveIndex($enemyTeam);
            if ($targetIndex === null) continue;

            $targetData =& $enemyTeam[$targetIndex];
            $target = $targetData['char'];

   
            if (rand(1, 100) <= $target->getDODGE()) {
                $logs[] = "{$target->getName()} esquive l'attaque de {$attacker->getName()} !";
                continue;
            }

            $damage = rand($attacker->getDMGMIN(), $attacker->getDMGMAX());

            if (rand(1, 100) <= $attacker->getCRIT()) {
                $damage = (int)($damage * 1.5);
                $crit = " (CRIT!)";
            } else {
                $crit = "";
            }

            $newHP = max(0, $target->getHP() - $damage);
            $target->setHP($newHP);

            $logs[] = sprintf(
                "%s attaque %s → %d dégâts (HP restant: %d)%s",
                $attacker->getName(),
                $target->getName(),
                $damage,
                $newHP,
                $crit
            );

            if ($newHP === 0 && !in_array('dead', $targetData['statuses'], true)) {
                $targetData['statuses'][] = 'dead';
                $logs[] = "{$target->getName()} ({$targetData['team']}) est K.O !";
            }
        }
    }

    private function getRandomAliveIndex(array $team): ?int
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
            if ($data['char']->getHP() > 0) {
                return true;
            }
        }
        return false;
    }
}