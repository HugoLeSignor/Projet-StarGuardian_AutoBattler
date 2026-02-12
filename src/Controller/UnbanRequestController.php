<?php

namespace App\Controller;

use App\Entity\UnbanRequest;
use App\Repository\UnbanRequestRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class UnbanRequestController extends AbstractController
{
    #[Route('/unban-request', name: 'app_unban_request', methods: ['GET', 'POST'])]
    public function index(
        Request $request,
        UserRepository $userRepository,
        UnbanRequestRepository $unbanRequestRepository,
        EntityManagerInterface $entityManager
    ): Response {
        $error = null;
        $emailValue = '';

        if ($request->isMethod('POST')) {
            $email = trim($request->request->get('email', ''));
            $message = trim($request->request->get('message', ''));
            $emailValue = $email;

            if (empty($email) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $error = 'Veuillez entrer une adresse email valide.';
            } elseif (empty($message)) {
                $error = 'Veuillez expliquer la raison de votre demande.';
            } else {
                $user = $userRepository->findOneBy(['email' => $email]);

                if (!$user || !$user->isBanned()) {
                    $error = 'Aucun compte banni ne correspond a cet email.';
                } elseif ($unbanRequestRepository->findPendingByEmail($email)) {
                    $error = 'Une demande de deban est deja en cours pour cet email.';
                } else {
                    $unbanRequest = new UnbanRequest();
                    $unbanRequest->setEmail($email);
                    $unbanRequest->setMessage($message);

                    $entityManager->persist($unbanRequest);
                    $entityManager->flush();

                    $this->addFlash('success', 'Votre demande de deban a ete envoyee. Un administrateur l\'examinera prochainement.');
                    return $this->redirectToRoute('app_login');
                }
            }
        }

        return $this->render('unban_request/index.html.twig', [
            'error' => $error,
            'emailValue' => $emailValue,
        ]);
    }
}
