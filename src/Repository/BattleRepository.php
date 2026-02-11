<?php

namespace App\Repository;

use App\Entity\Battle;
use App\Entity\User;
use Doctrine\Bundle\DoctrineBundle\Repository\ServiceEntityRepository;
use Doctrine\Persistence\ManagerRegistry;

/**
 * @extends ServiceEntityRepository<Battle>
 */
class BattleRepository extends ServiceEntityRepository
{
    public function __construct(ManagerRegistry $registry)
    {
        parent::__construct($registry, Battle::class);
    }

    /**
     * @return Battle[]
     */
    public function findByPlayer(User $user, int $limit = 10): array
    {
        return $this->createQueryBuilder('b')
            ->where('b.player1 = :user OR b.player2 = :user')
            ->setParameter('user', $user)
            ->orderBy('b.createdAt', 'DESC')
            ->setMaxResults($limit)
            ->getQuery()
            ->getResult();
    }

    public function getPlayerStats(User $user): array
    {
        $battles = $this->createQueryBuilder('b')
            ->where('b.player1 = :user OR b.player2 = :user')
            ->setParameter('user', $user)
            ->getQuery()
            ->getResult();

        $total = count($battles);
        $wins = 0;
        $losses = 0;
        $draws = 0;

        foreach ($battles as $battle) {
            if ($battle->getWinner() === 'draw') {
                $draws++;
            } elseif (
                ($battle->getPlayer1() === $user && $battle->getWinner() === 'player1') ||
                ($battle->getPlayer2() === $user && $battle->getWinner() === 'player2')
            ) {
                $wins++;
            } else {
                $losses++;
            }
        }

        return [
            'total' => $total,
            'wins' => $wins,
            'losses' => $losses,
            'draws' => $draws,
            'winRate' => $total > 0 ? round(($wins / $total) * 100) : 0,
        ];
    }

    /**
     * Trouve le combat le plus recent ou le joueur est player2 (cree dans les 60 dernieres secondes)
     */
    public function findRecentBattleAsPlayer2(User $user): ?Battle
    {
        $since = new \DateTimeImmutable('-60 seconds');
        return $this->createQueryBuilder('b')
            ->where('b.player2 = :user')
            ->andWhere('b.createdAt >= :since')
            ->setParameter('user', $user)
            ->setParameter('since', $since)
            ->orderBy('b.id', 'DESC')
            ->setMaxResults(1)
            ->getQuery()
            ->getOneOrNullResult();
    }

    /**
     * @return array<int, int> characterId => count
     */
    public function getMostPlayedCharacterIds(User $user): array
    {
        $battles = $this->findByPlayer($user, 100);
        $characterCounts = [];

        foreach ($battles as $battle) {
            $charIds = ($battle->getPlayer1() === $user)
                ? $battle->getTeam1CharacterIds()
                : $battle->getTeam2CharacterIds();

            foreach ($charIds as $id) {
                $characterCounts[$id] = ($characterCounts[$id] ?? 0) + 1;
            }
        }

        arsort($characterCounts);
        return $characterCounts;
    }
}
