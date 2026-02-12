<?php

namespace App\Service;

use App\Entity\MatchmakingQueue;
use App\Entity\User;
use App\Repository\CharacterRepository;
use App\Repository\MatchmakingQueueRepository;
use Doctrine\ORM\EntityManagerInterface;

class MatchmakingService
{
    private const MAX_SEARCH_TIME = 5; // 5 secondes avant bot

    public function __construct(
        private EntityManagerInterface $entityManager,
        private CharacterRepository $characterRepository
    ) {}

    public function joinQueue(User $player, array $characterIds): MatchmakingQueue
    {
        $this->entityManager->getRepository(MatchmakingQueue::class)->cleanOldEntries();
        $existing = $this->entityManager->getRepository(MatchmakingQueue::class)
            ->findOneBy(['player' => $player, 'isSearching' => true]);
        if ($existing) {
            return $existing;
        }
        $queue = new MatchmakingQueue();
        $queue->setPlayer($player);
        $queue->setCharacterIds($characterIds);
        $player->setIsSearchingMatch(true);
        $this->entityManager->persist($queue);
        $this->entityManager->flush();
        return $queue;
    }

    public function findMatch(MatchmakingQueue $queue): ?array
    {
        // Rafraichir depuis la BDD pour voir les changements faits par l'autre joueur
        $this->entityManager->refresh($queue);

        // Cas 1 : un autre joueur nous a deja matche
        if (!$queue->isSearching() && $queue->getMatchedWith()) {
            $matcher = $queue->getMatchedWith();
            $queue->getPlayer()->setIsSearchingMatch(false);
            $this->entityManager->flush();
            return [
                'type' => 'pvp',
                'is_creator' => false,
                'player1' => $queue->getPlayer(),
                'player2' => $matcher->getPlayer(),
                'team1_char_ids' => $queue->getCharacterIds(),
                'team2_char_ids' => $matcher->getCharacterIds(),
            ];
        }

        // Cas 2 : queue deja traitee (ne devrait pas arriver)
        if (!$queue->isSearching()) {
            return null;
        }

        // Cas 3 : chercher un adversaire
        /** @var MatchmakingQueueRepository $repo */
        $repo = $this->entityManager->getRepository(MatchmakingQueue::class);
        $opponent = $repo->findOpponent($queue->getPlayer()->getId());
        if ($opponent) {
            // Lier les deux queues
            $queue->setMatchedWith($opponent);
            $opponent->setMatchedWith($queue);
            $queue->setIsSearching(false);
            $opponent->setIsSearching(false);
            $queue->getPlayer()->setIsSearchingMatch(false);
            $opponent->getPlayer()->setIsSearchingMatch(false);
            $this->entityManager->flush();
            return [
                'type' => 'pvp',
                'is_creator' => true,
                'player1' => $queue->getPlayer(),
                'player2' => $opponent->getPlayer(),
                'team1_char_ids' => $queue->getCharacterIds(),
                'team2_char_ids' => $opponent->getCharacterIds(),
            ];
        }

        // Cas 4 : timeout -> match contre un bot
        $waitTime = (new \DateTimeImmutable())->getTimestamp() - $queue->getJoinedAt()->getTimestamp();
        if ($waitTime >= self::MAX_SEARCH_TIME) {
            $queue->setIsSearching(false);
            $queue->getPlayer()->setIsSearchingMatch(false);
            $this->entityManager->flush();
            $botCharIds = $this->generateBotTeam();
            return [
                'type' => 'bot',
                'player1' => $queue->getPlayer(),
                'player2' => null,
                'bot_name' => 'Bot_' . rand(1000, 9999),
                'team1_char_ids' => $queue->getCharacterIds(),
                'team2_char_ids' => $botCharIds,
            ];
        }
        return null;
    }

    public function leaveQueue(User $player): void
    {
        $queue = $this->entityManager->getRepository(MatchmakingQueue::class)
            ->findOneBy(['player' => $player, 'isSearching' => true]);
        if ($queue) {
            $player->setIsSearchingMatch(false);
            $this->entityManager->remove($queue);
            $this->entityManager->flush();
        }
    }

    private function generateBotTeam(): array
    {
        $allCharacters = $this->characterRepository->findAll();
        $tanks = [];
        $dps = [];
        $healers = [];
        $supports = [];
        foreach ($allCharacters as $char) {
            if ($char->getId() < 1) continue;
            $roleName = $char->getRole()->getName();
            if ($roleName === 'Tank') {
                $tanks[] = $char;
            } elseif ($roleName === 'DPS') {
                $dps[] = $char;
            } elseif ($roleName === 'Soigneur') {
                $healers[] = $char;
            } else {
                $supports[] = $char;
            }
        }
        if (empty($tanks) || empty($dps) || empty($healers) || empty($supports)) {
            throw new \RuntimeException("Impossible de générer une équipe bot : il manque un Tank, un DPS, un Healer ou un Support dans la base de données.");
        }
        shuffle($tanks);
        shuffle($dps);
        shuffle($healers);
        shuffle($supports);
        $ids = [
            $tanks[0]->getId(),
            $dps[0]->getId(),
            $healers[0]->getId(),
            $supports[0]->getId(),
        ];
        // Sécurité : si un ID 0 apparaît, log et throw
        if (in_array(0, $ids, true)) {
            file_put_contents(__DIR__ . '/../../var/log/bot_team_ids.log', date('c') . ' : ERREUR ID 0 : ' . implode(',', $ids) . "\n", FILE_APPEND);
            throw new \RuntimeException("Erreur critique : génération d'une équipe bot avec un ID 0. Vérifiez la base de données et les rôles.");
        } else {
            file_put_contents(__DIR__ . '/../../var/log/bot_team_ids.log', date('c') . ' : ' . implode(',', $ids) . "\n", FILE_APPEND);
        }
        return $ids;
    }
}
