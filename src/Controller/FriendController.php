<?php

namespace App\Controller;

use App\Entity\Friendship;
use App\Entity\Message;
use App\Entity\User;
use App\Repository\FriendshipRepository;
use App\Repository\MessageRepository;
use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Attribute\Route;

class FriendController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private FriendshipRepository $friendshipRepository,
        private MessageRepository $messageRepository,
        private UserRepository $userRepository
    ) {}

    #[Route('/friends/list', name: 'app_friends_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $friendships = $this->friendshipRepository->findAcceptedFriendships($user);
        $lastMessages = $this->messageRepository->findLastMessagePerFriend($user);

        $friends = [];
        foreach ($friendships as $friendship) {
            $friend = $friendship->getFriend($user);
            if (!$friend) continue;

            $lastMsg = $lastMessages[$friend->getId()] ?? null;

            $friends[] = [
                'friendshipId' => $friendship->getId(),
                'userId' => $friend->getId(),
                'username' => $friend->getUsername(),
                'profileImage' => $friend->getProfileImage()
                    ? '/uploads/avatars/' . $friend->getProfileImage()
                    : null,
                'rating' => $friend->getRating(),
                'lastMessage' => $lastMsg ? [
                    'content' => mb_substr($lastMsg->getContent(), 0, 50) . (mb_strlen($lastMsg->getContent()) > 50 ? '...' : ''),
                    'date' => $lastMsg->getCreatedAt()->format('d/m H:i'),
                    'isFromMe' => $lastMsg->getSender() === $user,
                ] : null,
            ];
        }

        return $this->json(['friends' => $friends]);
    }

    #[Route('/friends/request/{id}', name: 'app_friends_request', requirements: ['id' => '\d+'], methods: ['POST'])]
    public function sendRequest(int $id): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        if ($user->getId() === $id) {
            return $this->json(['error' => 'Vous ne pouvez pas vous ajouter vous-meme'], 400);
        }

        $target = $this->userRepository->find($id);
        if (!$target) {
            return $this->json(['error' => 'Utilisateur introuvable'], 404);
        }

        $existing = $this->friendshipRepository->findBetweenUsers($user, $target);
        if ($existing) {
            if ($existing->isAccepted()) {
                return $this->json(['error' => 'Vous etes deja amis'], 400);
            }
            if ($existing->isPending()) {
                return $this->json(['error' => 'Une demande est deja en cours'], 400);
            }
            // Si rejetee, permettre de renvoyer
            $existing->setRequester($user);
            $existing->setAddressee($target);
            $existing->setStatus(Friendship::STATUS_PENDING);
            $this->entityManager->flush();
            return $this->json(['success' => true, 'message' => 'Demande envoyee']);
        }

        $friendship = new Friendship();
        $friendship->setRequester($user);
        $friendship->setAddressee($target);

        $this->entityManager->persist($friendship);
        $this->entityManager->flush();

        return $this->json(['success' => true, 'message' => 'Demande envoyee']);
    }

    #[Route('/friends/accept/{id}', name: 'app_friends_accept', requirements: ['id' => '\d+'], methods: ['POST'])]
    public function accept(int $id): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $friendship = $this->friendshipRepository->find($id);
        if (!$friendship || $friendship->getAddressee() !== $user || !$friendship->isPending()) {
            return $this->json(['error' => 'Demande invalide'], 400);
        }

        $friendship->setStatus(Friendship::STATUS_ACCEPTED);
        $this->entityManager->flush();

        return $this->json(['success' => true, 'message' => 'Demande acceptee']);
    }

    #[Route('/friends/reject/{id}', name: 'app_friends_reject', requirements: ['id' => '\d+'], methods: ['POST'])]
    public function reject(int $id): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $friendship = $this->friendshipRepository->find($id);
        if (!$friendship || $friendship->getAddressee() !== $user || !$friendship->isPending()) {
            return $this->json(['error' => 'Demande invalide'], 400);
        }

        $friendship->setStatus(Friendship::STATUS_REJECTED);
        $this->entityManager->flush();

        return $this->json(['success' => true, 'message' => 'Demande refusee']);
    }

    #[Route('/friends/remove/{id}', name: 'app_friends_remove', requirements: ['id' => '\d+'], methods: ['POST'])]
    public function remove(int $id): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $friendship = $this->friendshipRepository->find($id);
        if (!$friendship) {
            return $this->json(['error' => 'Amitie introuvable'], 404);
        }

        if ($friendship->getRequester() !== $user && $friendship->getAddressee() !== $user) {
            return $this->json(['error' => 'Action non autorisee'], 403);
        }

        $this->entityManager->remove($friendship);
        $this->entityManager->flush();

        return $this->json(['success' => true, 'message' => 'Ami supprime']);
    }

    #[Route('/friends/pending', name: 'app_friends_pending', methods: ['GET'])]
    public function pending(): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $requests = $this->friendshipRepository->findPendingReceived($user);
        $data = [];
        foreach ($requests as $friendship) {
            $requester = $friendship->getRequester();
            $data[] = [
                'friendshipId' => $friendship->getId(),
                'userId' => $requester->getId(),
                'username' => $requester->getUsername(),
                'profileImage' => $requester->getProfileImage()
                    ? '/uploads/avatars/' . $requester->getProfileImage()
                    : null,
                'rating' => $requester->getRating(),
                'date' => $friendship->getCreatedAt()->format('d/m/Y H:i'),
            ];
        }

        return $this->json(['requests' => $data]);
    }

    #[Route('/friends/search', name: 'app_friends_search', methods: ['GET'])]
    public function search(Request $request): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $query = trim($request->query->get('q', ''));
        if (strlen($query) < 2) {
            return $this->json(['users' => []]);
        }

        $users = $this->entityManager->createQueryBuilder()
            ->select('u')
            ->from(User::class, 'u')
            ->where('u.username LIKE :query')
            ->andWhere('u.id != :currentId')
            ->setParameter('query', '%' . $query . '%')
            ->setParameter('currentId', $user->getId())
            ->setMaxResults(10)
            ->getQuery()
            ->getResult();

        $results = [];
        foreach ($users as $u) {
            $friendship = $this->friendshipRepository->findBetweenUsers($user, $u);
            $friendStatus = null;
            if ($friendship) {
                $friendStatus = $friendship->getStatus();
                if ($friendship->isPending()) {
                    $friendStatus = $friendship->getRequester() === $user
                        ? 'pending_sent'
                        : 'pending_received';
                }
            }

            $results[] = [
                'userId' => $u->getId(),
                'username' => $u->getUsername(),
                'profileImage' => $u->getProfileImage()
                    ? '/uploads/avatars/' . $u->getProfileImage()
                    : null,
                'rating' => $u->getRating(),
                'friendStatus' => $friendStatus,
            ];
        }

        return $this->json(['users' => $results]);
    }

    #[Route('/friends/messages/{id}', name: 'app_friends_messages_get', requirements: ['id' => '\d+'], methods: ['GET'])]
    public function getMessages(int $id, Request $request): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $friend = $this->userRepository->find($id);
        if (!$friend) {
            return $this->json(['error' => 'Utilisateur introuvable'], 404);
        }

        if (!$this->friendshipRepository->areFriends($user, $friend)) {
            return $this->json(['error' => 'Vous devez etre amis pour echanger des messages'], 403);
        }

        $afterId = $request->query->getInt('afterId', 0);
        if ($afterId > 0) {
            $messages = $this->messageRepository->findNewMessages($user, $friend, $afterId);
        } else {
            $messages = $this->messageRepository->findConversation($user, $friend);
        }

        // Marquer les messages recus comme lus
        $this->messageRepository->markAsRead($friend, $user);

        $data = [];
        foreach ($messages as $msg) {
            $data[] = [
                'id' => $msg->getId(),
                'senderId' => $msg->getSender()->getId(),
                'senderName' => $msg->getSender()->getUsername(),
                'content' => $msg->getContent(),
                'date' => $msg->getCreatedAt()->format('H:i'),
                'fullDate' => $msg->getCreatedAt()->format('d/m/Y H:i'),
                'isFromMe' => $msg->getSender() === $user,
            ];
        }

        return $this->json(['messages' => $data]);
    }

    #[Route('/friends/messages/{id}', name: 'app_friends_messages_send', requirements: ['id' => '\d+'], methods: ['POST'])]
    public function sendMessage(int $id, Request $request): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $friend = $this->userRepository->find($id);
        if (!$friend) {
            return $this->json(['error' => 'Utilisateur introuvable'], 404);
        }

        if (!$this->friendshipRepository->areFriends($user, $friend)) {
            return $this->json(['error' => 'Vous devez etre amis pour echanger des messages'], 403);
        }

        $data = json_decode($request->getContent(), true);
        $content = trim($data['content'] ?? '');

        if (empty($content)) {
            return $this->json(['error' => 'Le message ne peut pas etre vide'], 400);
        }

        if (mb_strlen($content) > 1000) {
            return $this->json(['error' => 'Message trop long (max 1000 caracteres)'], 400);
        }

        $message = new Message();
        $message->setSender($user);
        $message->setReceiver($friend);
        $message->setContent($content);

        $this->entityManager->persist($message);
        $this->entityManager->flush();

        return $this->json([
            'success' => true,
            'message' => [
                'id' => $message->getId(),
                'senderId' => $user->getId(),
                'senderName' => $user->getUsername(),
                'content' => $message->getContent(),
                'date' => $message->getCreatedAt()->format('H:i'),
                'fullDate' => $message->getCreatedAt()->format('d/m/Y H:i'),
                'isFromMe' => true,
            ]
        ]);
    }

    #[Route('/friends/unread-count', name: 'app_friends_unread_count', methods: ['GET'])]
    public function unreadCount(): JsonResponse
    {
        $user = $this->getUser();
        if (!$user) {
            return $this->json(['error' => 'Non authentifie'], 401);
        }

        $unreadMessages = $this->messageRepository->countUnread($user);
        $pendingRequests = $this->friendshipRepository->countPendingReceived($user);

        return $this->json([
            'unreadMessages' => $unreadMessages,
            'pendingRequests' => $pendingRequests,
            'total' => $unreadMessages + $pendingRequests,
        ]);
    }
}
