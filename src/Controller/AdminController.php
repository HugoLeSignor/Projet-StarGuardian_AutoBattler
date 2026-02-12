<?php

namespace App\Controller;

use App\Entity\User;
use App\Repository\BattleRepository;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

#[Route('/admin')]
class AdminController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private UserRepository $userRepository,
        private BattleRepository $battleRepository,
        private MessageRepository $messageRepository
    ) {}

    #[Route('', name: 'app_admin', methods: ['GET'])]
    public function dashboard(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $totalUsers = $this->userRepository->countAll();
        $totalBattles = $this->battleRepository->count([]);
        $totalMessages = $this->messageRepository->count([]);
        $pendingReports = $this->messageRepository->countReported();

        $recentUsers = $this->userRepository->findAllPaginated(1, 5);
        $reportedMessages = $this->messageRepository->findReported();

        return $this->render('admin/dashboard.html.twig', [
            'totalUsers' => $totalUsers,
            'totalBattles' => $totalBattles,
            'totalMessages' => $totalMessages,
            'pendingReports' => $pendingReports,
            'recentUsers' => $recentUsers,
            'reportedMessages' => array_slice($reportedMessages, 0, 5),
        ]);
    }

    #[Route('/users', name: 'app_admin_users', methods: ['GET'])]
    public function users(Request $request): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $page = max(1, $request->query->getInt('page', 1));
        $search = $request->query->get('q', '');
        $limit = 15;

        $users = $this->userRepository->findAllPaginated($page, $limit, $search ?: null);
        $total = $this->userRepository->countAll($search ?: null);
        $totalPages = max(1, (int) ceil($total / $limit));

        return $this->render('admin/users.html.twig', [
            'users' => $users,
            'currentPage' => $page,
            'totalPages' => $totalPages,
            'total' => $total,
            'search' => $search,
        ]);
    }

    #[Route('/users/{id}', name: 'app_admin_user_detail', requirements: ['id' => '\d+'], methods: ['GET'])]
    public function userDetail(int $id): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $user = $this->userRepository->find($id);
        if (!$user) {
            throw $this->createNotFoundException('Utilisateur introuvable');
        }

        $stats = $this->battleRepository->getPlayerStats($user);
        $recentMessages = $this->messageRepository->findByUser($user, 20);
        $recentBattles = $this->battleRepository->findByPlayer($user, 10);

        return $this->render('admin/user_detail.html.twig', [
            'targetUser' => $user,
            'stats' => $stats,
            'recentMessages' => $recentMessages,
            'recentBattles' => $recentBattles,
        ]);
    }

    #[Route('/users/{id}/ban', name: 'app_admin_user_ban', requirements: ['id' => '\d+'], methods: ['POST'])]
    public function banUser(int $id, Request $request): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $user = $this->userRepository->find($id);
        if (!$user) {
            throw $this->createNotFoundException('Utilisateur introuvable');
        }

        $reason = trim($request->request->get('reason', ''));

        $user->setIsBanned(true);
        $user->setBanReason($reason ?: null);
        $user->setBannedAt(new \DateTimeImmutable());
        $this->entityManager->flush();

        $this->addFlash('success', 'Utilisateur ' . $user->getUsername() . ' banni.');
        return $this->redirectToRoute('app_admin_user_detail', ['id' => $id]);
    }

    #[Route('/users/{id}/unban', name: 'app_admin_user_unban', requirements: ['id' => '\d+'], methods: ['POST'])]
    public function unbanUser(int $id): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $user = $this->userRepository->find($id);
        if (!$user) {
            throw $this->createNotFoundException('Utilisateur introuvable');
        }

        $user->setIsBanned(false);
        $user->setBanReason(null);
        $user->setBannedAt(null);
        $this->entityManager->flush();

        $this->addFlash('success', 'Utilisateur ' . $user->getUsername() . ' debanni.');
        return $this->redirectToRoute('app_admin_user_detail', ['id' => $id]);
    }

    #[Route('/reports', name: 'app_admin_reports', methods: ['GET'])]
    public function reports(): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $reportedMessages = $this->messageRepository->findReported();

        return $this->render('admin/reports.html.twig', [
            'reportedMessages' => $reportedMessages,
        ]);
    }

    #[Route('/reports/{id}/remove', name: 'app_admin_report_remove', requirements: ['id' => '\d+'], methods: ['POST'])]
    public function removeMessage(int $id): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $message = $this->messageRepository->find($id);
        if (!$message) {
            throw $this->createNotFoundException('Message introuvable');
        }

        $message->setIsRemoved(true);
        $this->entityManager->flush();

        $this->addFlash('success', 'Message supprime.');
        return $this->redirectToRoute('app_admin_reports');
    }

    #[Route('/reports/{id}/dismiss', name: 'app_admin_report_dismiss', requirements: ['id' => '\d+'], methods: ['POST'])]
    public function dismissReport(int $id): Response
    {
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        $message = $this->messageRepository->find($id);
        if (!$message) {
            throw $this->createNotFoundException('Message introuvable');
        }

        $message->setIsReported(false);
        $message->setReportReason(null);
        $message->setReportedBy(null);
        $message->setReportedAt(null);
        $this->entityManager->flush();

        $this->addFlash('success', 'Signalement rejete.');
        return $this->redirectToRoute('app_admin_reports');
    }
}
