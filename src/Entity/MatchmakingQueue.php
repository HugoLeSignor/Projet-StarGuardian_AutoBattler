<?php

namespace App\Entity;

use App\Repository\MatchmakingQueueRepository;
use Doctrine\ORM\Mapping as ORM;
use App\Entity\User;

#[ORM\Entity(repositoryClass: MatchmakingQueueRepository::class)]
class MatchmakingQueue
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $player = null;

    #[ORM\Column(type: 'json')]
    private array $characterIds = [];

    #[ORM\Column(type: 'boolean', options: ['default' => true])]
    private bool $isSearching = true;

    #[ORM\Column(type: 'integer', options: ['default' => 1000])]
    private int $rating = 1000;

    #[ORM\Column(type: 'datetime_immutable')]
    private ?\DateTimeImmutable $joinedAt = null;

    public function __construct()
    {
        $this->joinedAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayer(): ?User
    {
        return $this->player;
    }

    public function setPlayer(?User $player): static
    {
        $this->player = $player;
        return $this;
    }

    public function getCharacterIds(): array
    {
        return $this->characterIds;
    }

    public function setCharacterIds(array $characterIds): static
    {
        $this->characterIds = $characterIds;
        return $this;
    }

    public function isSearching(): bool
    {
        return $this->isSearching;
    }

    public function setIsSearching(bool $isSearching): static
    {
        $this->isSearching = $isSearching;
        return $this;
    }

    public function getRating(): int
    {
        return $this->rating;
    }

    public function setRating(int $rating): static
    {
        $this->rating = $rating;
        return $this;
    }

    public function getJoinedAt(): ?\DateTimeImmutable
    {
        return $this->joinedAt;
    }

    public function setJoinedAt(\DateTimeImmutable $joinedAt): static
    {
        $this->joinedAt = $joinedAt;
        return $this;
    }
}