<?php

namespace App\Repository;

use App\Entity\Message;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Message>
 */
class MessageRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Message::class);
    }

    /**
     * @return Message[]
     */
    public function findConversation(User $user1, User $user2, int $limit = 50): array
    {
        return $this->createQueryBuilder('m')
            ->where('(m.sender = :u1 AND m.receiver = :u2)')
            ->orWhere('(m.sender = :u2 AND m.receiver = :u1)')
            ->setParameter('u1', $user1)
            ->setParameter('u2', $user2)
            ->orderBy('m.createdAt', 'ASC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    /**
     * @return Message[]
     */
    public function findNewMessages(User $user1, User $user2, int $afterId): array
    {
        return $this->createQueryBuilder('m')
            ->where('(m.sender = :u1 AND m.receiver = :u2)')
            ->orWhere('(m.sender = :u2 AND m.receiver = :u1)')
            ->andWhere('m.id > :afterId')
            ->setParameter('u1', $user1)
            ->setParameter('u2', $user2)
            ->setParameter('afterId', $afterId)
            ->orderBy('m.createdAt', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function markAsRead(User $sender, User $receiver): void
    {
        $this->createQueryBuilder('m')
            ->update()
            ->set('m.isRead', ':true')
            ->where('m.sender = :sender')
            ->andWhere('m.receiver = :receiver')
            ->andWhere('m.isRead = :false')
            ->setParameter('true', true)
            ->setParameter('false', false)
            ->setParameter('sender', $sender)
            ->setParameter('receiver', $receiver)
            ->getQuery()
            ->execute();
    }

    public function countUnread(User $user): int
    {
        return (int) $this->createQueryBuilder('m')
            ->select('COUNT(m.id)')
            ->where('m.receiver = :user')
            ->andWhere('m.isRead = :false')
            ->setParameter('user', $user)
            ->setParameter('false', false)
            ->getQuery()
            ->getSingleScalarResult();
    }

    /**
     * @return array<int, Message>
     */
    public function findLastMessagePerFriend(User $user): array
    {
        $messages = $this->createQueryBuilder('m')
            ->where('m.sender = :user OR m.receiver = :user')
            ->setParameter('user', $user)
            ->orderBy('m.createdAt', 'DESC')
            ->getQuery()
            ->getResult();

        $lastMessages = [];
        foreach ($messages as $message) {
            $friendId = $message->getSender() === $user
                ? $message->getReceiver()->getId()
                : $message->getSender()->getId();

            if (!isset($lastMessages[$friendId])) {
                $lastMessages[$friendId] = $message;
            }
        }

        return $lastMessages;
    }
}
