<?php

namespace App\Controller;

use App\Entity\Battle;
use App\Repository\BattleRepository;
use App\Repository\CharacterRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Service\CombatEngine;

final class ArenaController extends AbstractController
{
    #[Route('/arena', name: 'app_arena')]
    public function test(Request $request, CharacterRepository $repo, CombatEngine $engine, EntityManagerInterface $em): Response
    {
        $session = $request->getSession();
        $matchData = $session->get('match_data');

        if ($matchData) {
            // Vient du matchmaking : utiliser les équipes sélectionnées
            $session->remove('match_data');
            $session->remove('selected_team_ids');

            $team1Ids = $matchData['team1_char_ids'];
            $team2Ids = $matchData['team2_char_ids'];
            $team1DisplayName = 'Votre équipe';
            $team2DisplayName = $matchData['type'] === 'bot'
                ? ($matchData['bot_name'] ?? 'Bot')
                : ($matchData['player2']?->getUsername() ?? 'Adversaire');
        } else {
            // Accès direct : équipes aléatoires (fallback)
            $allCharacters = $repo->findAll();

            if (count($allCharacters) < 6) {
                throw $this->createNotFoundException("Pas assez de personnages dans la base de données. Veuillez charger les fixtures.");
            }

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

            shuffle($tanks);
            shuffle($dps);
            shuffle($supports);

            $team1Chars = [
                $dps[0] ?? $allCharacters[1],
                $supports[0] ?? $allCharacters[2],
                $tanks[0] ?? $allCharacters[0]
            ];

            $team2Chars = [
                $tanks[1] ?? $tanks[0] ?? $allCharacters[3],
                $dps[1] ?? $dps[0] ?? $allCharacters[4],
                $supports[1] ?? $supports[0] ?? $allCharacters[5]
            ];

            $team1Ids = array_map(fn($char) => $char->getId(), $team1Chars);
            $team2Ids = array_map(fn($char) => $char->getId(), $team2Chars);
            $team1DisplayName = 'Equipe 1';
            $team2DisplayName = 'Equipe 2';
        }

        // "Equipe 1"/"Equipe 2" restent les identifiants internes (CombatEngine + JS)
        $team1 = $this->buildTeam($team1Ids, $repo, 'Equipe 1');
        $team2 = $this->buildTeam($team2Ids, $repo, 'Equipe 2');

        // Tri par rôle : Support → DPS → Tank (healer à gauche, tank à droite)
        // Le CSS row-reverse sur l'équipe droite se charge du miroir automatiquement
        $team1 = $this->sortTeamByRole($team1, ['Support', 'DPS', 'Tank']);
        $team2 = $this->sortTeamByRole($team2, ['Support', 'DPS', 'Tank']);

        $composition = [
            'Equipe 1' => array_map(fn($d) => [
                'name' => $d['char']->getName(),
                'hp' => $d['char']->getHP(),
                'role' => $this->getRoleCategory($d['char']->getRole()->getName()),
            ], $team1),
            'Equipe 2' => array_map(fn($d) => [
                'name' => $d['char']->getName(),
                'hp' => $d['char']->getHP(),
                'role' => $this->getRoleCategory($d['char']->getRole()->getName()),
            ], $team2),
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

        // Persister le combat en base si vient du matchmaking
        $currentUser = $this->getUser();
        $opponent = null;

        if ($matchData && $currentUser) {
            $battle = new Battle();
            $battle->setPlayer1($currentUser);

            // Re-fetch player2 depuis la BDD (l'objet session est detache)
            if ($matchData['player2'] ?? null) {
                $opponent = $em->getRepository(\App\Entity\User::class)->find($matchData['player2']->getId());
            }
            $battle->setPlayer2($opponent);

            $battle->setTeam1CharacterIds($team1Ids);
            $battle->setTeam2CharacterIds($team2Ids);
            $battle->setMatchType($matchData['type']);
            $battle->setBotName($matchData['bot_name'] ?? null);
            $battle->setCombatLogs($logs);

            if ($winner === 'Equipe 1') {
                $battle->setWinner('player1');
            } elseif ($winner === 'Equipe 2') {
                $battle->setWinner('player2');
            } else {
                $battle->setWinner('draw');
            }

            $roundCount = count(array_filter($logs, fn($l) => ($l['type'] ?? '') === 'round'));
            $battle->setDurationSeconds($roundCount * 6);

            $em->persist($battle);

            // Mise a jour du rating
            $ratingChange = 0;
            if ($battle->getWinner() === 'player1') {
                $ratingChange = $matchData['type'] === 'pvp' ? 25 : 10;
            } elseif ($battle->getWinner() === 'player2') {
                $ratingChange = $matchData['type'] === 'pvp' ? -25 : -10;
            }
            $currentUser->setRating($currentUser->getRating() + $ratingChange);

            $em->flush();
        }

        return $this->render('arena/index.html.twig', [
            'composition' => $composition,
            'logsJson' => json_encode($logs),
            'winner' => $winner,
            'team1Name' => $team1DisplayName,
            'team2Name' => $team2DisplayName,
            'opponent' => $opponent,
        ]);
    }

    #[Route('/arena/combat', name: 'app_arena_combat')]
    public function combat(Request $request): Response
    {
        // Si on vient du matchmaking, rediriger vers l'arène (match_data reste en session)
        if ($request->getSession()->has('match_data')) {
            return $this->redirectToRoute('app_arena');
        }

        return $this->redirectToRoute('app_teams');
    }

    #[Route('/arena/replay/{id}', name: 'app_arena_replay')]
    public function replay(int $id, BattleRepository $battleRepo, CharacterRepository $charRepo): Response
    {
        $battle = $battleRepo->find($id);
        if (!$battle) {
            throw $this->createNotFoundException('Combat introuvable');
        }

        // Reconstruire la composition depuis les IDs sauvegardes
        $team1 = $this->buildTeam($battle->getTeam1CharacterIds(), $charRepo, 'Equipe 1');
        $team2 = $this->buildTeam($battle->getTeam2CharacterIds(), $charRepo, 'Equipe 2');
        $team1 = $this->sortTeamByRole($team1, ['Support', 'DPS', 'Tank']);
        $team2 = $this->sortTeamByRole($team2, ['Support', 'DPS', 'Tank']);

        $composition = [
            'Equipe 1' => array_map(fn($d) => [
                'name' => $d['char']->getName(),
                'hp' => $d['char']->getHP(),
                'role' => $this->getRoleCategory($d['char']->getRole()->getName()),
            ], $team1),
            'Equipe 2' => array_map(fn($d) => [
                'name' => $d['char']->getName(),
                'hp' => $d['char']->getHP(),
                'role' => $this->getRoleCategory($d['char']->getRole()->getName()),
            ], $team2),
        ];

        // Noms d'equipes
        $currentUser = $this->getUser();
        $isPlayer1 = $battle->getPlayer1() === $currentUser;
        $opponent = null;

        if ($isPlayer1) {
            $team1Name = 'Votre equipe';
            $team2Name = $battle->isVsBot()
                ? ($battle->getBotName() ?? 'Bot')
                : ($battle->getPlayer2()?->getUsername() ?? 'Adversaire');
            $opponent = $battle->getPlayer2();
        } else {
            $team1Name = $battle->getPlayer1()->getUsername();
            $team2Name = 'Votre equipe';
            $opponent = $battle->getPlayer1();
        }

        // Reconvertir le winner stocke en format template
        $winner = match ($battle->getWinner()) {
            'player1' => 'Equipe 1',
            'player2' => 'Equipe 2',
            default => 'Match nul',
        };

        return $this->render('arena/index.html.twig', [
            'composition' => $composition,
            'logsJson' => json_encode($battle->getCombatLogs()),
            'winner' => $winner,
            'team1Name' => $team1Name,
            'team2Name' => $team2Name,
            'opponent' => $opponent,
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

    private function getRoleCategory(string $roleName): string
    {
        return match ($roleName) {
            'Tank' => 'Tank',
            'DPS' => 'DPS',
            default => 'Support',
        };
    }

    private function sortTeamByRole(array $team, array $roleOrder): array
    {
        usort($team, function ($a, $b) use ($roleOrder) {
            $catA = $this->getRoleCategory($a['char']->getRole()->getName());
            $catB = $this->getRoleCategory($b['char']->getRole()->getName());
            $posA = array_search($catA, $roleOrder);
            $posB = array_search($catB, $roleOrder);
            return $posA <=> $posB;
        });
        return $team;
    }
}