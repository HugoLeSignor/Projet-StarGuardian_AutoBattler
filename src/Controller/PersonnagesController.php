<?php

namespace App\Controller;

use App\Repository\CharacterRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class PersonnagesController extends AbstractController
{
    #[Route('/personnages', name: 'app_personnages')]
    public function index(CharacterRepository $characterRepository): Response
    {
        $characters = $characterRepository->findAll();

        $categories = [
            'Tanks' => ['icon' => 'fa-shield-alt', 'desc' => 'Remparts indestructibles, ils protegent leurs allies au peril de leur vie.', 'characters' => []],
            'DPS' => ['icon' => 'fa-crosshairs', 'desc' => 'Lames et projectiles, ils fauchent les ennemis sans pitie.', 'characters' => []],
            'Healers' => ['icon' => 'fa-hand-holding-medical', 'desc' => 'Guerisseurs devoues, ils maintiennent le groupe en vie par leurs soins.', 'characters' => []],
            'Supports' => ['icon' => 'fa-chess-rook', 'desc' => 'Strateges et utilitaires, ils renforcent l\'equipe avec des capacites uniques.', 'characters' => []],
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

        return $this->render('personnages/index.html.twig', [
            'categories' => $categories,
        ]);
    }
}
