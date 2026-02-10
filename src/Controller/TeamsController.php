<?php

namespace App\Controller;

use App\Repository\CharacterRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class TeamsController extends AbstractController
{
    #[Route('/teams', name: 'app_teams')]
    public function index(CharacterRepository $characterRepository): Response
    {
        $characters = $characterRepository->findAll();

        return $this->render('teams/index.html.twig', [
            'heroes' => $characters,
        ]);
    }

    #[Route('/teams/select', name: 'app_teams_select', methods: ['POST'])]
    public function select(Request $request): Response
    {
        $selectedIds = $request->request->all('character_ids');
        
        if (count($selectedIds) !== 3) {
            $this->addFlash('error', 'Veuillez sélectionner exactement 3 personnages');
            return $this->redirectToRoute('app_teams');
        }

        // Stocker en session
        $request->getSession()->set('selected_team_ids', array_map('intval', $selectedIds));
        
        $this->addFlash('success', 'Équipe sélectionnée ! Vous pouvez lancer le matchmaking.');
        
        return $this->redirectToRoute('app_matchmaking');
    }
}