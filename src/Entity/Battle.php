<?php

namespace App\Entity;

use App\Repository\BattleRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BattleRepository::class)]
class Battle
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'battles')]
    #[ORM\JoinColumn(name: "player1_id", referencedColumnName: "id", nullable: false, onDelete: "CASCADE")]
    private ?User $player1 = null;

    #[ORM\ManyToOne]
    #[ORM\JoinColumn(name: "player2_id", referencedColumnName: "id", nullable: true, onDelete: "SET NULL")]
    private ?User $player2 = null;

    #[ORM\Column(type: Types::JSON)]
    private array $team1CharacterIds = [];

    #[ORM\Column(type: Types::JSON)]
    private array $team2CharacterIds = [];

    #[ORM\Column(type: Types::DATETIME_IMMUTABLE)]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\Column(length: 20)]
    private ?string $matchType = null; // 'pvp' ou 'bot'

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $botName = null;

    #[ORM\Column(length: 50)]
    private ?string $winner = null; // 'player1', 'player2', ou 'draw'

    #[ORM\Column(type: Types::JSON)]
    private array $combatLogs = [];

    #[ORM\Column(nullable: true)]
    private ?int $durationSeconds = null;

    #[ORM\Column(type: 'boolean', options: ['default' => false])]
    private bool $ratingApplied = false;

    public function __construct()
    {
        $this->createdAt = new \DateTimeImmutable();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getPlayer1(): ?User
    {
        return $this->player1;
    }

    public function setPlayer1(?User $player1): static
    {
        $this->player1 = $player1;
        return $this;
    }

    public function getPlayer2(): ?User
    {
        return $this->player2;
    }

    public function setPlayer2(?User $player2): static
    {
        $this->player2 = $player2;
        return $this;
    }

    public function getTeam1CharacterIds(): array
    {
        return $this->team1CharacterIds;
    }

    public function setTeam1CharacterIds(array $team1CharacterIds): static
    {
        $this->team1CharacterIds = $team1CharacterIds;
        return $this;
    }

    public function getTeam2CharacterIds(): array
    {
        return $this->team2CharacterIds;
    }

    public function setTeam2CharacterIds(array $team2CharacterIds): static
    {
        $this->team2CharacterIds = $team2CharacterIds;
        return $this;
    }

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;
        return $this;
    }

    public function getMatchType(): ?string
    {
        return $this->matchType;
    }

    public function setMatchType(string $matchType): static
    {
        $this->matchType = $matchType;
        return $this;
    }

    public function getBotName(): ?string
    {
        return $this->botName;
    }

    public function setBotName(?string $botName): static
    {
        $this->botName = $botName;
        return $this;
    }

    public function getWinner(): ?string
    {
        return $this->winner;
    }

    public function setWinner(string $winner): static
    {
        $this->winner = $winner;
        return $this;
    }

    public function getCombatLogs(): array
    {
        return $this->combatLogs;
    }

    public function setCombatLogs(array $combatLogs): static
    {
        $this->combatLogs = $combatLogs;
        return $this;
    }

    public function getDurationSeconds(): ?int
    {
        return $this->durationSeconds;
    }

    public function setDurationSeconds(?int $durationSeconds): static
    {
        $this->durationSeconds = $durationSeconds;
        return $this;
    }

    public function isRatingApplied(): bool
    {
        return $this->ratingApplied;
    }

    public function setRatingApplied(bool $ratingApplied): static
    {
        $this->ratingApplied = $ratingApplied;
        return $this;
    }

    public function isVsBot(): bool
    {
        return $this->matchType === 'bot';
    }

    public function isPvP(): bool
    {
        return $this->matchType === 'pvp';
    }
}
