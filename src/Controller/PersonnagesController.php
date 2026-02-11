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
            'Supports' => ['icon' => 'fa-hand-holding-medical', 'desc' => 'Guerisseurs et strateges, ils maintiennent le groupe en vie.', 'characters' => []],
        ];

        foreach ($characters as $character) {
            $roleName = $character->getRole()->getName();
            if ($roleName === 'Tank') {
                $categories['Tanks']['characters'][] = $character;
            } elseif ($roleName === 'DPS') {
                $categories['DPS']['characters'][] = $character;
            } else {
                $categories['Supports']['characters'][] = $character;
            }
        }

        return $this->render('personnages/index.html.twig', [
            'categories' => $categories,
        ]);
    }
}
