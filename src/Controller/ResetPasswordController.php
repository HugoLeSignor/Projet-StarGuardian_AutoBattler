<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Mailer\MailerInterface;
use Symfony\Component\Mime\Email;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Routing\Generator\UrlGeneratorInterface;

class ResetPasswordController extends AbstractController
{
    #[Route('/forgot-password', name: 'app_forgot_password', methods: ['GET', 'POST'])]
    public function forgotPassword(
        Request $request,
        UserRepository $userRepository,
        EntityManagerInterface $entityManager,
        MailerInterface $mailer
    ): Response {
        $submitted = false;

        if ($request->isMethod('POST')) {
            $email = trim($request->request->get('email', ''));
            $submitted = true;

            if (!empty($email) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
                $user = $userRepository->findOneBy(['email' => $email]);

                if ($user) {
                    $token = bin2hex(random_bytes(32));
                    $user->setResetToken($token);
                    $user->setResetTokenExpiresAt(new \DateTimeImmutable('+1 hour'));
                    $entityManager->flush();

                    $resetUrl = $this->generateUrl('app_reset_password', ['token' => $token], UrlGeneratorInterface::ABSOLUTE_URL);

                    $emailMessage = (new Email())
                        ->from('admin@darkest-fight-arena.sc7duyo5958.universe.wf')
                        ->to($user->getEmail())
                        ->subject('Reinitialisation de votre mot de passe - Darkest Fight Arena')
                        ->html($this->renderView('reset_password/email.html.twig', [
                            'resetUrl' => $resetUrl,
                            'username' => $user->getUsername(),
                        ]));

                    $mailer->send($emailMessage);
                }
            }
        }

        return $this->render('reset_password/request.html.twig', [
            'submitted' => $submitted,
        ]);
    }

    #[Route('/reset-password/{token}', name: 'app_reset_password', methods: ['GET', 'POST'])]
    public function resetPassword(
        string $token,
        Request $request,
        UserRepository $userRepository,
        EntityManagerInterface $entityManager,
        UserPasswordHasherInterface $passwordHasher
    ): Response {
        $user = $userRepository->findOneBy(['resetToken' => $token]);

        if (!$user || $user->getResetTokenExpiresAt() < new \DateTimeImmutable()) {
            $this->addFlash('error', 'Ce lien de reinitialisation est invalide ou a expire.');
            return $this->redirectToRoute('app_forgot_password');
        }

        $error = null;

        if ($request->isMethod('POST')) {
            $password = $request->request->get('password', '');
            $passwordConfirm = $request->request->get('password_confirm', '');

            if (strlen($password) < 6) {
                $error = 'Le mot de passe doit contenir au moins 6 caracteres.';
            } elseif ($password !== $passwordConfirm) {
                $error = 'Les mots de passe ne correspondent pas.';
            } else {
                $user->setPassword($passwordHasher->hashPassword($user, $password));
                $user->setResetToken(null);
                $user->setResetTokenExpiresAt(null);
                $entityManager->flush();

                $this->addFlash('success', 'Votre mot de passe a ete reinitialise. Vous pouvez vous connecter.');
                return $this->redirectToRoute('app_login');
            }
        }

        return $this->render('reset_password/reset.html.twig', [
            'error' => $error,
            'token' => $token,
        ]);
    }
}
