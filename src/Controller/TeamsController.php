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
    public function select(Request $request, CharacterRepository $characterRepository): Response
    {
        $selectedIds = $request->request->all('character_ids');

        if (count($selectedIds) !== 3) {
            $this->addFlash('error', 'Veuillez sélectionner exactement 3 personnages');
            return $this->redirectToRoute('app_teams');
        }

        // Valider la composition : 1 Tank, 1 DPS, 1 Support
        $roles = ['Tank' => 0, 'DPS' => 0, 'Support' => 0];
        foreach ($selectedIds as $id) {
            $character = $characterRepository->find((int) $id);
            if (!$character) {
                $this->addFlash('error', 'Personnage introuvable.');
                return $this->redirectToRoute('app_teams');
            }
            $roleName = $character->getRole()->getName();
            if ($roleName === 'Tank') {
                $roles['Tank']++;
            } elseif ($roleName === 'DPS') {
                $roles['DPS']++;
            } else {
                $roles['Support']++;
            }
        }

        if ($roles['Tank'] !== 1 || $roles['DPS'] !== 1 || $roles['Support'] !== 1) {
            $this->addFlash('error', 'Votre équipe doit contenir exactement 1 Tank, 1 DPS et 1 Support.');
            return $this->redirectToRoute('app_teams');
        }

        // Stocker en session
        $request->getSession()->set('selected_team_ids', array_map('intval', $selectedIds));

        $this->addFlash('success', 'Équipe sélectionnée ! Vous pouvez lancer le matchmaking.');

        return $this->redirectToRoute('app_matchmaking');
    }
}