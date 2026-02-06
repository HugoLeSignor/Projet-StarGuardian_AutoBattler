<?php

namespace App\Controller;

use App\Repository\CharacterRepository;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;

final class ChampSelectController extends AbstractController
{
    #[Route('/champ', name: 'app_champ_select')]
    public function index(CharacterRepository $repo): Response
    {
        $Character = $repo->findAll();

        return $this->render('champ_select/index.html.twig', [
            'Character' => $Character,
        ]);
    }
}
