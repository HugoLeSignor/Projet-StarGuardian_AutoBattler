<?php

namespace App\Controller;

use App\Repository\CharacterRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Contracts\Translation\TranslatorInterface;

final class PersonnagesController extends AbstractController
{
    #[Route('/personnages', name: 'app_personnages')]
    public function index(CharacterRepository $characterRepository, TranslatorInterface $translator): Response
    {
        $characters = $characterRepository->findAll();

        $categories = [
            'Tanks' => ['icon' => 'fa-shield-alt', 'desc' => $translator->trans('chars.category.tanks_desc'), 'characters' => []],
            'DPS' => ['icon' => 'fa-crosshairs', 'desc' => $translator->trans('chars.category.dps_desc'), 'characters' => []],
            'Supports' => ['icon' => 'fa-hand-holding-medical', 'desc' => $translator->trans('chars.category.supports_desc'), 'characters' => []],
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
