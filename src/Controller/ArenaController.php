<?php

namespace App\Controller;

use App\Entity\Battle;
use App\Repository\BattleRepository;
use App\Repository\CharacterRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use App\Service\CombatEngine;

final class ArenaController extends AbstractController
{
    /**
     * Point d'entree : cree le Battle en BDD puis redirige vers /arena/{id}
     */
    #[Route('/arena', name: 'app_arena')]
    public function index(Request $request, CharacterRepository $repo, CombatEngine $engine, EntityManagerInterface $em, BattleRepository $battleRepo): Response
    {
        $session = $request->getSession();
        $matchData = $session->get('match_data');

        if ($matchData) {
            $session->remove('match_data');
            $session->remove('selected_team_ids');

            $team1Ids = $matchData['team1_char_ids'];
            $team2Ids = $matchData['team2_char_ids'];
            $isCreator = $matchData['is_creator'] ?? true;

            // Seul le creator cree le Battle (evite les doublons PvP)
            if (!$isCreator) {
                // Joiner : chercher le Battle cree par le creator
                $currentUser = $this->getUser();
                if ($currentUser) {
                    $existingBattle = $battleRepo->findRecentBattleAsPlayer2($currentUser);
                    if ($existingBattle) {
                        return $this->redirectToRoute('app_arena_show', ['id' => $existingBattle->getId()]);
                    }
                }
                // Battle pas encore cree (race condition) : afficher page d'attente avec polling
                return $this->render('arena/waiting.html.twig');
            }

            // Creator : simuler, persister, puis rediriger vers /arena/{id}
            $currentUser = $this->getUser();
            $opponent = null;

            if ($matchData['player2'] ?? null) {
                $opponent = $em->getRepository(\App\Entity\User::class)->find($matchData['player2']->getId());
            }

            $team1 = $this->buildTeam($team1Ids, $repo, 'Equipe 1');
            $team2 = $this->buildTeam($team2Ids, $repo, 'Equipe 2');
            $team1 = $this->sortTeamByRole($team1, ['Support', 'DPS', 'Tank']);
            $team2 = $this->sortTeamByRole($team2, ['Support', 'DPS', 'Tank']);

            $logs = $engine->fightBattleWithRounds($team1, $team2);

            // Determiner le vainqueur
            $winner = null;
            $lastLog = end($logs);
            if (is_array($lastLog)) {
                if ($lastLog['type'] === 'victory') {
                    $winner = $lastLog['winner'];
                } elseif ($lastLog['type'] === 'draw') {
                    $winner = 'Match nul';
                }
            }

            // Creer le Battle
            $battle = new Battle();
            $battle->setPlayer1($currentUser);
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
            $em->flush();

            return $this->redirectToRoute('app_arena_show', ['id' => $battle->getId()]);
        }

        // Acces direct sans matchmaking : equipes aleatoires (pas de persist, pas de MMR)
        $allCharacters = $repo->findAll();

        if (count($allCharacters) < 6) {
            throw $this->createNotFoundException("Pas assez de personnages dans la base de données.");
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

        $team1Ids = [
            ($dps[0] ?? $allCharacters[1])->getId(),
            ($supports[0] ?? $allCharacters[2])->getId(),
            ($tanks[0] ?? $allCharacters[0])->getId(),
        ];
        $team2Ids = [
            ($tanks[1] ?? $tanks[0] ?? $allCharacters[3])->getId(),
            ($dps[1] ?? $dps[0] ?? $allCharacters[4])->getId(),
            ($supports[1] ?? $supports[0] ?? $allCharacters[5])->getId(),
        ];

        return $this->renderCombat($repo, $engine, $team1Ids, $team2Ids, null, null);
    }

    /**
     * Affiche un combat depuis la BDD (URL unique /arena/{id})
     */
    #[Route('/arena/{id}', name: 'app_arena_show', requirements: ['id' => '\d+'])]
    public function show(int $id, BattleRepository $battleRepo, CharacterRepository $charRepo): Response
    {
        $battle = $battleRepo->find($id);
        if (!$battle) {
            throw $this->createNotFoundException('Combat introuvable');
        }

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
            $team1Name = $battle->getPlayer1()?->getUsername() ?? 'Joueur';
            $team2Name = 'Votre equipe';
            $opponent = $battle->getPlayer1();
        }

        $winner = match ($battle->getWinner()) {
            'player1' => 'Equipe 1',
            'player2' => 'Equipe 2',
            default => 'Match nul',
        };

        // Le rating n'a pas encore ete applique = combat frais (pas un replay)
        $needsFinalize = !$battle->isRatingApplied() && $battle->getWinner() !== 'draw';

        return $this->render('arena/index.html.twig', [
            'composition' => $composition,
            'logsJson' => json_encode($battle->getCombatLogs()),
            'winner' => $winner,
            'team1Name' => $team1Name,
            'team2Name' => $team2Name,
            'opponent' => $opponent,
            'finalizeUrl' => $needsFinalize ? $this->generateUrl('app_arena_finalize', ['id' => $id]) : null,
        ]);
    }

    /**
     * Applique le MMR a la fin de l'animation (appele par JS)
     * Tout est lu depuis la BDD, pas de dependance a la session
     */
    #[Route('/arena/finalize/{id}', name: 'app_arena_finalize', requirements: ['id' => '\d+'], methods: ['POST'])]
    public function finalize(int $id, BattleRepository $battleRepo, EntityManagerInterface $em): JsonResponse
    {
        $battle = $battleRepo->find($id);

        if (!$battle) {
            return $this->json(['success' => false, 'message' => 'Combat introuvable'], 404);
        }

        // Deja applique ? (anti-doublon)
        if ($battle->isRatingApplied()) {
            return $this->json(['success' => false, 'message' => 'Rating deja applique'], 400);
        }

        // Draw = pas de changement
        if ($battle->getWinner() === 'draw') {
            $battle->setRatingApplied(true);
            $em->flush();
            return $this->json(['success' => true, 'ratingChange' => 0, 'newRating' => null]);
        }

        // Calculer le changement depuis les donnees du Battle
        $isPvp = $battle->isPvP();
        $change = 0;
        if ($battle->getWinner() === 'player1') {
            $change = $isPvp ? 25 : 10;
        } elseif ($battle->getWinner() === 'player2') {
            $change = $isPvp ? -25 : -10;
        }

        // Appliquer aux deux joueurs
        $player1 = $battle->getPlayer1();
        $player2 = $battle->getPlayer2();

        if ($player1) {
            $player1->setRating($player1->getRating() + $change);
        }
        if ($player2) {
            $player2->setRating($player2->getRating() - $change);
        }

        $battle->setRatingApplied(true);
        $em->flush();

        return $this->json([
            'success' => true,
            'ratingChange' => $change,
            'newRating' => $player1?->getRating(),
        ]);
    }

    /**
     * Endpoint de polling pour le joiner : verifie si le battle existe
     */
    #[Route('/arena/check-battle', name: 'app_arena_check_battle', methods: ['POST'])]
    public function checkBattle(BattleRepository $battleRepo): JsonResponse
    {
        $currentUser = $this->getUser();
        if (!$currentUser) {
            return $this->json(['found' => false]);
        }

        $battle = $battleRepo->findRecentBattleAsPlayer2($currentUser);
        if ($battle) {
            return $this->json([
                'found' => true,
                'redirectUrl' => $this->generateUrl('app_arena_show', ['id' => $battle->getId()]),
            ]);
        }

        return $this->json(['found' => false]);
    }

    #[Route('/arena/combat', name: 'app_arena_combat')]
    public function combat(Request $request): Response
    {
        if ($request->getSession()->has('match_data')) {
            return $this->redirectToRoute('app_arena');
        }

        return $this->redirectToRoute('app_teams');
    }

    /**
     * Replay = alias vers /arena/{id} (retrocompatibilite)
     */
    #[Route('/arena/replay/{id}', name: 'app_arena_replay', requirements: ['id' => '\d+'])]
    public function replay(int $id): Response
    {
        return $this->redirectToRoute('app_arena_show', ['id' => $id]);
    }

    /**
     * Render un combat sans persist (acces direct ou joiner)
     */
    private function renderCombat(CharacterRepository $repo, CombatEngine $engine, array $team1Ids, array $team2Ids, ?array $matchData, ?int $battleId): Response
    {
        $team1 = $this->buildTeam($team1Ids, $repo, 'Equipe 1');
        $team2 = $this->buildTeam($team2Ids, $repo, 'Equipe 2');
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

        $winner = null;
        $lastLog = end($logs);
        if (is_array($lastLog)) {
            if ($lastLog['type'] === 'victory') {
                $winner = $lastLog['winner'];
            } elseif ($lastLog['type'] === 'draw') {
                $winner = 'Match nul';
            }
        }

        $team1Name = 'Equipe 1';
        $team2Name = 'Equipe 2';
        $opponent = null;

        if ($matchData) {
            $team1Name = 'Votre equipe';
            $team2Name = ($matchData['type'] ?? '') === 'bot'
                ? ($matchData['bot_name'] ?? 'Bot')
                : ($matchData['player2']?->getUsername() ?? 'Adversaire');
        }

        return $this->render('arena/index.html.twig', [
            'composition' => $composition,
            'logsJson' => json_encode($logs),
            'winner' => $winner,
            'team1Name' => $team1Name,
            'team2Name' => $team2Name,
            'opponent' => $opponent,
            'battleId' => $battleId,
            'finalizeUrl' => null,
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
