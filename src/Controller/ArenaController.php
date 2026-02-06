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
        $team1Ids = [1, 2, 3];
        $team2Ids = [1, 2, 3];

        $team1 = $this->buildTeam($team1Ids, $repo, 'Equipe 1');
        $team2 = $this->buildTeam($team2Ids, $repo, 'Equipe 2');

        $composition = [
            'Equipe 1' => array_map(fn($d) => ['name' => $d['char']->getName(), 'hp' => $d['char']->getHP()], $team1),
            'Equipe 2' => array_map(fn($d) => ['name' => $d['char']->getName(), 'hp' => $d['char']->getHP()], $team2),
        ];

        $logs = $engine->fightBattleWithRounds($team1, $team2);

        return $this->render('arena/index.html.twig', [
            'composition' => $composition,
            'logs' => $logs,
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