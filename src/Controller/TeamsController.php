<?php

namespace App\Controller;

use App\Entity\TeamPreset;
use App\Repository\CharacterRepository;
use App\Repository\TeamPresetRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class TeamsController extends AbstractController
{
    #[Route('/teams', name: 'app_teams')]
    public function index(CharacterRepository $characterRepository, TeamPresetRepository $presetRepo): Response
    {
        $characters = $characterRepository->findAll();

        $categories = [
            'Tanks' => ['icon' => 'fa-shield-alt', 'characters' => []],
            'DPS' => ['icon' => 'fa-crosshairs', 'characters' => []],
            'Healers' => ['icon' => 'fa-hand-holding-medical', 'characters' => []],
            'Supports' => ['icon' => 'fa-chess-rook', 'characters' => []],
        ];

        foreach ($characters as $character) {
            $roleName = $character->getRole()->getName();
            if ($roleName === 'Tank') {
                $categories['Tanks']['characters'][] = $character;
            } elseif ($roleName === 'DPS') {
                $categories['DPS']['characters'][] = $character;
            } elseif (in_array($roleName, ['Support', 'Soigneur'])) {
                $categories['Healers']['characters'][] = $character;
            } else {
                $categories['Supports']['characters'][] = $character;
            }
        }

        $presets = [];
        $user = $this->getUser();
        if ($user) {
            $presets = $presetRepo->findByOwner($user);
        }

        return $this->render('teams/index.html.twig', [
            'heroes' => $characters,
            'categories' => $categories,
            'presets' => $presets,
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

        // Valider la composition : 1 Tank, 1 DPS, 1 Soutien (Healer ou Support)
        $roles = ['Tank' => 0, 'DPS' => 0, 'Soutien' => 0];
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
                $roles['Soutien']++;
            }
        }

        if ($roles['Tank'] !== 1 || $roles['DPS'] !== 1 || $roles['Soutien'] !== 1) {
            $this->addFlash('error', 'Votre équipe doit contenir exactement 1 Tank, 1 DPS et 1 Soutien (Healer ou Support).');
            return $this->redirectToRoute('app_teams');
        }

        // Stocker en session
        $request->getSession()->set('selected_team_ids', array_map('intval', $selectedIds));

        $this->addFlash('success', 'Équipe sélectionnée ! Vous pouvez lancer le matchmaking.');

        return $this->redirectToRoute('app_matchmaking');
    }

    #[Route('/teams/presets', name: 'app_teams_presets', methods: ['GET'])]
    public function listPresets(TeamPresetRepository $presetRepo, CharacterRepository $charRepo): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $presets = $presetRepo->findByOwner($user);
        $data = [];

        foreach ($presets as $preset) {
            $characters = [];
            foreach ($preset->getCharacterIds() as $id) {
                $char = $charRepo->find($id);
                if ($char) {
                    $characters[] = [
                        'id' => $char->getId(),
                        'name' => $char->getName(),
                        'role' => $char->getRole()->getName(),
                    ];
                }
            }

            $data[] = [
                'id' => $preset->getId(),
                'name' => $preset->getName(),
                'characterIds' => $preset->getCharacterIds(),
                'characters' => $characters,
                'createdAt' => $preset->getCreatedAt()->format('d/m/Y H:i'),
            ];
        }

        return $this->json($data);
    }

    #[Route('/teams/presets/save', name: 'app_teams_presets_save', methods: ['POST'])]
    public function savePreset(Request $request, CharacterRepository $charRepo, TeamPresetRepository $presetRepo, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $data = json_decode($request->getContent(), true);
        $name = trim($data['name'] ?? '');
        $characterIds = $data['characterIds'] ?? [];

        if (empty($name)) {
            return $this->json(['error' => 'Nom requis'], 400);
        }

        if (count($characterIds) !== 3) {
            return $this->json(['error' => 'Exactement 3 personnages requis'], 400);
        }

        // Valider que les personnages existent et la composition est correcte
        $roles = ['Tank' => 0, 'DPS' => 0, 'Soutien' => 0];
        foreach ($characterIds as $id) {
            $char = $charRepo->find((int) $id);
            if (!$char) {
                return $this->json(['error' => 'Personnage introuvable'], 400);
            }
            $roleName = $char->getRole()->getName();
            if ($roleName === 'Tank') {
                $roles['Tank']++;
            } elseif ($roleName === 'DPS') {
                $roles['DPS']++;
            } else {
                $roles['Soutien']++;
            }
        }

        if ($roles['Tank'] !== 1 || $roles['DPS'] !== 1 || $roles['Soutien'] !== 1) {
            return $this->json(['error' => 'Composition invalide (1 Tank, 1 DPS, 1 Soutien)'], 400);
        }

        // Limiter a 10 presets par joueur
        $existingCount = count($presetRepo->findByOwner($user));
        if ($existingCount >= 10) {
            return $this->json(['error' => 'Maximum 10 presets atteint'], 400);
        }

        $preset = new TeamPreset();
        $preset->setOwner($user);
        $preset->setName($name);
        $preset->setCharacterIds(array_map('intval', $characterIds));

        $em->persist($preset);
        $em->flush();

        return $this->json([
            'success' => true,
            'id' => $preset->getId(),
            'name' => $preset->getName(),
        ]);
    }

    #[Route('/teams/presets/{id}', name: 'app_teams_presets_delete', requirements: ['id' => '\d+'], methods: ['DELETE'])]
    public function deletePreset(int $id, TeamPresetRepository $presetRepo, EntityManagerInterface $em): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $preset = $presetRepo->find($id);
        if (!$preset || $preset->getOwner() !== $user) {
            return $this->json(['error' => 'Preset introuvable'], 404);
        }

        $em->remove($preset);
        $em->flush();

        return $this->json(['success' => true]);
    }
}
