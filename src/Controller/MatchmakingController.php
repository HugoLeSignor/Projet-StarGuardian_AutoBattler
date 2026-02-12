<?php

namespace App\Controller;

use App\Service\MatchmakingService;
use App\Repository\MatchmakingQueueRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class MatchmakingController extends AbstractController
{
    public function __construct(
        private MatchmakingService $matchmakingService,
        private EntityManagerInterface $entityManager
    ) {}

    #[Route('/matchmaking', name: 'app_matchmaking')]
    public function index(Request $request): Response
    {
        // Récupérer l'équipe sélectionnée depuis la session
        $selectedTeam = $request->getSession()->get('selected_team_ids', []);
        
        if (empty($selectedTeam)) {
            $this->addFlash('error', 'Veuillez d\'abord sélectionner une équipe');
            return $this->redirectToRoute('app_teams');
        }

        return $this->render('matchmaking/search.html.twig', [
            'teamSize' => count($selectedTeam)
        ]);
    }

    #[Route('/matchmaking/join', name: 'app_matchmaking_join', methods: ['POST'])]
    public function join(Request $request): JsonResponse
    {
        $player = $this->getUser();
        
        if (!$player) {
            return $this->json(['error' => 'Non authentifié'], 401);
        }

        $selectedTeam = $request->getSession()->get('selected_team_ids', []);
        
        if (empty($selectedTeam)) {
            return $this->json(['error' => 'Aucune équipe sélectionnée'], 400);
        }

        $queue = $this->matchmakingService->joinQueue($player, $selectedTeam);

        return $this->json([
            'success' => true,
            'queueId' => $queue->getId()
        ]);
    }

    #[Route('/matchmaking/search', name: 'app_matchmaking_search', methods: ['POST'])]
    public function search(Request $request): JsonResponse
    {
        $player = $this->getUser();
        $queueId = $request->request->get('queueId');

        /** @var MatchmakingQueueRepository $repo */
        $repo = $this->entityManager->getRepository(\App\Entity\MatchmakingQueue::class);
        $queue = $repo->find($queueId);

        if (!$queue || $queue->getPlayer() !== $player) {
            return $this->json(['error' => 'File d\'attente invalide'], 400);
        }

        $match = $this->matchmakingService->findMatch($queue);

        if ($match) {
            // Stocker les données du match en session
            $request->getSession()->set('match_data', $match);

            return $this->json([
                'found' => true,
                'type' => $match['type'],
                'redirectUrl' => $this->generateUrl('app_arena_combat')
            ]);
        }

        return $this->json(['found' => false]);
    }

    #[Route('/matchmaking/cancel', name: 'app_matchmaking_cancel', methods: ['POST'])]
    public function cancel(): JsonResponse
    {
        $player = $this->getUser();
        
        if ($player) {
            $this->matchmakingService->leaveQueue($player);
        }

        return $this->json(['success' => true]);
    }
}