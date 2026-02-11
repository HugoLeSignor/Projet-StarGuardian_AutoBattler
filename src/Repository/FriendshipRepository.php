<?php

namespace App\Repository;

use App\Entity\Friendship;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Friendship>
 */
class FriendshipRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Friendship::class);
    }

    /**
     * @return Friendship[]
     */
    public function findAcceptedFriendships(User $user): array
    {
        return $this->createQueryBuilder('f')
            ->where('(f.requester = :user OR f.addressee = :user)')
            ->andWhere('f.status = :status')
            ->setParameter('user', $user)
            ->setParameter('status', Friendship::STATUS_ACCEPTED)
            ->orderBy('f.updatedAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    /**
     * @return Friendship[]
     */
    public function findPendingReceived(User $user): array
    {
        return $this->createQueryBuilder('f')
            ->where('f.addressee = :user')
            ->andWhere('f.status = :status')
            ->setParameter('user', $user)
            ->setParameter('status', Friendship::STATUS_PENDING)
            ->orderBy('f.createdAt', 'DESC')
            ->getQuery()
            ->getResult();
    }

    public function findBetweenUsers(User $user1, User $user2): ?Friendship
    {
        return $this->createQueryBuilder('f')
            ->where('(f.requester = :u1 AND f.addressee = :u2)')
            ->orWhere('(f.requester = :u2 AND f.addressee = :u1)')
            ->setParameter('u1', $user1)
            ->setParameter('u2', $user2)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function areFriends(User $user1, User $user2): bool
    {
        $friendship = $this->findBetweenUsers($user1, $user2);
        return $friendship !== null && $friendship->isAccepted();
    }

    public function countPendingReceived(User $user): int
    {
        return (int) $this->createQueryBuilder('f')
            ->select('COUNT(f.id)')
            ->where('f.addressee = :user')
            ->andWhere('f.status = :status')
            ->setParameter('user', $user)
            ->setParameter('status', Friendship::STATUS_PENDING)
            ->getQuery()
            ->getSingleScalarResult();
    }
}
