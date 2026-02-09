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
        // Récupérer 3 personnages aléatoires pour chaque équipe
        $allCharacters = $repo->findAll();

        if (count($allCharacters) < 3) {
            throw $this->createNotFoundException("Pas assez de personnages dans la base de données. Veuillez charger les fixtures.");
        }

        // Sélectionner 3 personnages aléatoires pour l'équipe 1
        $team1Chars = array_slice($allCharacters, 0, 3);
        $team1Ids = array_map(fn($char) => $char->getId(), $team1Chars);

        // Sélectionner 3 personnages aléatoires pour l'équipe 2 (réutilisation possible)
        $team2Chars = array_slice($allCharacters, 3, 3);
        if (count($team2Chars) < 3) {
            // Si pas assez de personnages, réutiliser les premiers
            $team2Chars = array_slice($allCharacters, 0, 3);
        }
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