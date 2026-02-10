<?php

namespace App\Controller;

use App\Form\ProfileFormType;
use App\Repository\BattleRepository;
use App\Repository\CharacterRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\File\Exception\FileException;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\String\Slugger\SluggerInterface;

class ProfileController extends AbstractController
{
    #[Route('/profile', name: 'app_profile', methods: ['GET', 'POST'])]
    public function edit(Request $request, EntityManagerInterface $em, SluggerInterface $slugger): Response
    {
        $user = $this->getUser();

        $form = $this->createForm(ProfileFormType::class, $user);
        $form->handleRequest($request);

        if ($form->isSubmitted() && $form->isValid()) {
            $imageFile = $form->get('profileImageFile')->getData();

            if ($imageFile) {
                $originalFilename = pathinfo($imageFile->getClientOriginalName(), PATHINFO_FILENAME);
                $safeFilename = $slugger->slug($originalFilename);
                $newFilename = $safeFilename . '-' . uniqid() . '.' . $imageFile->guessExtension();

                try {
                    $imageFile->move(
                        $this->getParameter('kernel.project_dir') . '/public/uploads/avatars',
                        $newFilename
                    );

                    // Supprimer l'ancien avatar
                    $oldImage = $user->getProfileImage();
                    if ($oldImage) {
                        $oldPath = $this->getParameter('kernel.project_dir') . '/public/uploads/avatars/' . $oldImage;
                        if (file_exists($oldPath)) {
                            unlink($oldPath);
                        }
                    }

                    $user->setProfileImage($newFilename);
                } catch (FileException $e) {
                    $this->addFlash('error', 'Erreur lors de l\'upload de l\'image.');
                }
            }

            $em->flush();
            $this->addFlash('success', 'Profil mis a jour avec succes !');

            return $this->redirectToRoute('app_profile');
        }

        return $this->render('profile/edit.html.twig', [
            'form' => $form->createView(),
            'user' => $user,
        ]);
    }
    #[Route('/api/profile', name: 'api_profile', methods: ['GET'])]
    public function index(
        BattleRepository $battleRepo,
        CharacterRepository $characterRepo
    ): JsonResponse {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $stats = $battleRepo->getPlayerStats($user);

        $recentBattles = $battleRepo->findByPlayer($user, 10);
        $battlesData = [];
        foreach ($recentBattles as $battle) {
            $isPlayer1 = $battle->getPlayer1() === $user;
            $won = ($isPlayer1 && $battle->getWinner() === 'player1')
                || (!$isPlayer1 && $battle->getWinner() === 'player2');
            $isDraw = $battle->getWinner() === 'draw';

            $charIds = $isPlayer1
                ? $battle->getTeam1CharacterIds()
                : $battle->getTeam2CharacterIds();
            $charNames = [];
            foreach ($charIds as $id) {
                $char = $characterRepo->find($id);
                if ($char) {
                    $charNames[] = $char->getName();
                }
            }

            $opponentName = $battle->isVsBot()
                ? ($battle->getBotName() ?? 'Bot')
                : ($isPlayer1
                    ? ($battle->getPlayer2()?->getUsername() ?? 'Inconnu')
                    : $battle->getPlayer1()->getUsername());

            $battlesData[] = [
                'id' => $battle->getId(),
                'date' => $battle->getCreatedAt()->format('d/m/Y H:i'),
                'matchType' => $battle->getMatchType(),
                'opponent' => $opponentName,
                'result' => $isDraw ? 'draw' : ($won ? 'win' : 'loss'),
                'team' => $charNames,
            ];
        }

        $characterCounts = $battleRepo->getMostPlayedCharacterIds($user);
        $favoriteCharacter = null;
        if (!empty($characterCounts)) {
            $topCharId = array_key_first($characterCounts);
            $topChar = $characterRepo->find($topCharId);
            if ($topChar) {
                $favoriteCharacter = [
                    'name' => $topChar->getName(),
                    'role' => $topChar->getRole()->getName(),
                    'gamesPlayed' => $characterCounts[$topCharId],
                ];
            }
        }

        $lastTeam = [];
        if (!empty($recentBattles)) {
            $lastBattle = $recentBattles[0];
            $isP1 = $lastBattle->getPlayer1() === $user;
            $lastCharIds = $isP1
                ? $lastBattle->getTeam1CharacterIds()
                : $lastBattle->getTeam2CharacterIds();
            foreach ($lastCharIds as $id) {
                $char = $characterRepo->find($id);
                if ($char) {
                    $lastTeam[] = [
                        'name' => $char->getName(),
                        'role' => $char->getRole()->getName(),
                    ];
                }
            }
        }

        return $this->json([
            'username' => $user->getUsername(),
            'rating' => $user->getRating(),
            'bio' => $user->getBio(),
            'motto' => $user->getMotto(),
            'profileImage' => $user->getProfileImage()
                ? '/uploads/avatars/' . $user->getProfileImage()
                : null,
            'stats' => $stats,
            'favoriteCharacter' => $favoriteCharacter,
            'lastTeam' => $lastTeam,
            'recentBattles' => $battlesData,
        ]);
    }
}
