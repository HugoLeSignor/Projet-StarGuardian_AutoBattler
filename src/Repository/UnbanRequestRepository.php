<?php

namespace App\Repository;

use App\Entity\UnbanRequest;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<UnbanRequest>
 */
class UnbanRequestRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, UnbanRequest::class);
    }

    /**
     * @return UnbanRequest[]
     */
    public function findPending(): array
    {
        return $this->createQueryBuilder('u')
            ->where('u.status = :status')
            ->setParameter('status', UnbanRequest::STATUS_PENDING)
            ->orderBy('u.createdAt', 'ASC')
            ->getQuery()
            ->getResult();
    }

    public function countPending(): int
    {
        return (int) $this->createQueryBuilder('u')
            ->select('COUNT(u.id)')
            ->where('u.status = :status')
            ->setParameter('status', UnbanRequest::STATUS_PENDING)
            ->getQuery()
            ->getSingleScalarResult();
    }

    public function findPendingByEmail(string $email): ?UnbanRequest
    {
        return $this->createQueryBuilder('u')
            ->where('u.email = :email')
            ->andWhere('u.status = :status')
            ->setParameter('email', $email)
            ->setParameter('status', UnbanRequest::STATUS_PENDING)
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }
}
