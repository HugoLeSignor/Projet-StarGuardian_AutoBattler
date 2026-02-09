<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

final class TeamsController extends AbstractController
{
    #[Route('/teams', name: 'app_teams')]
    public function index(): Response
    {
        $heroes = [
            [
                'name' => 'Crusader',
                'role' => 'Tank • Soutien',
                'image' => 'asset/img/Crusader.webp',
                'gif' => 'asset/gif/Crusader.gif',
                'atq' => 75,
                'def' => 85,
                'vit' => 60,
                'description' => 'Guerrier sacré au cœur pur, défenseur de ses alliés.'
            ],
            [
                'name' => 'Plague Doctor',
                'role' => 'Soigneur • Support',
                'image' => 'asset/img/Plague_Doctor.webp',
                'gif' => 'asset/gif/Plague_Doctor.gif',
                'atq' => 65,
                'def' => 45,
                'vit' => 70,
                'description' => 'Spécialiste des maladies et du contrôle de groupe.'
            ],
            [
                'name' => 'Hellion',
                'role' => 'DPS • Frontline',
                'image' => 'asset/img/Hellion.webp',
                'gif' => 'asset/gif/Hellion.gif',
                'atq' => 80,
                'def' => 50,
                'vit' => 75,
                'description' => 'Guerrière sauvage infligeant de lourds dégâts.'
            ],
        ];

        return $this->render('teams/index.html.twig', [
            'heroes' => $heroes,
        ]);
    }
}
