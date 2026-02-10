<?php

namespace App\Controller;

use App\Repository\CharacterRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Entity\Character;
use App\Service\CombatEngine;

final class ArenaController extends AbstractController
{
    #[Route('/arena', name: 'app_arena')]
    public function test(CharacterRepository $repo, CombatEngine $engine): Response
    {
        // Récupérer tous les personnages
        $allCharacters = $repo->findAll();

        if (count($allCharacters) < 6) {
            throw $this->createNotFoundException("Pas assez de personnages dans la base de données. Veuillez charger les fixtures.");
        }

        // Grouper par rôle
        $tanks = [];
        $dps = [];
        $supports = [];

        foreach ($allCharacters as $char) {
            $roleName = $char->getRole()->getName();
            if ($roleName === 'Tank') {
                $tanks[] = $char;
            } elseif ($roleName === 'DPS') {
                $dps[] = $char;
            } else {
                $supports[] = $char;
            }
        }

        // Mélanger chaque groupe
        shuffle($tanks);
        shuffle($dps);
        shuffle($supports);

        // Composer les équipes : 1 tank, 1 DPS, 1 support par équipe
        // Equipe 1: DPS, Support, Tank (tank à la fin)
        $team1Chars = [
            $dps[0] ?? $allCharacters[1],
            $supports[0] ?? $allCharacters[2],
            $tanks[0] ?? $allCharacters[0]
        ];

        // Equipe 2: Tank, DPS, Support (tank au début)
        $team2Chars = [
            $tanks[1] ?? $tanks[0] ?? $allCharacters[3],
            $dps[1] ?? $dps[0] ?? $allCharacters[4],
            $supports[1] ?? $supports[0] ?? $allCharacters[5]
        ];

        $team1Ids = array_map(fn($char) => $char->getId(), $team1Chars);
        $team2Ids = array_map(fn($char) => $char->getId(), $team2Chars);

        $team1 = $this->buildTeam($team1Ids, $repo, 'Equipe 1');
        $team2 = $this->buildTeam($team2Ids, $repo, 'Equipe 2');

        $composition = [
            'Equipe 1' => array_map(fn($d) => ['name' => $d['char']->getName(), 'hp' => $d['char']->getHP()], $team1),
            'Equipe 2' => array_map(fn($d) => ['name' => $d['char']->getName(), 'hp' => $d['char']->getHP()], $team2),
        ];

        $logs = $engine->fightBattleWithRounds($team1, $team2);

        // Déterminer le vainqueur depuis les logs structurés
        $winner = null;
        $lastLog = end($logs);
        if (is_array($lastLog)) {
            if ($lastLog['type'] === 'victory') {
                $winner = $lastLog['winner'];
            } elseif ($lastLog['type'] === 'draw') {
                $winner = 'Match nul';
            }
        }

        return $this->render('arena/index.html.twig', [
            'composition' => $composition,
            'logsJson' => json_encode($logs),
            'winner' => $winner,
        ]);
    }

    private function buildTeam(array $ids, CharacterRepository $repo, string $teamName): array
    {
        $team = [];
        foreach ($ids as $id) {
            $char = $repo->find($id);
            if (!$char) {
                throw $this->createNotFoundException("Character $id introuvable");
            }

            $team[] = [
                'char' => clone $char,
                'team' => $teamName,
                'statuses' => []
            ];
        }
        return $team;
    }
}