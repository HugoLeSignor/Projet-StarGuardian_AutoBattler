<?php

namespace App\Repository;

use App\Entity\MatchmakingQueue;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

class MatchmakingQueueRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, MatchmakingQueue::class);
    }

    public function findOpponent(int $playerId): ?MatchmakingQueue
    {
        return $this->createQueryBuilder('q')
            ->where('q.player != :playerId')
            ->andWhere('q.isSearching = true')
            ->setParameter('playerId', $playerId)
            ->orderBy('q.joinedAt', 'ASC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    public function cleanOldEntries(): void
    {
        $fiveMinutesAgo = new \DateTimeImmutable('-5 minutes');
        $this->createQueryBuilder('q')
            ->delete()
            ->where('q.joinedAt < :time')
            ->setParameter('time', $fiveMinutesAgo)
            ->getQuery()
            ->execute();
    }
}