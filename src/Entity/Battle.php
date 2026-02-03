<?php

namespace App\Entity;

use App\Repository\BattleRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: BattleRepository::class)]
class Battle
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'battles')]
    private ?user $player1 = null;

    #[ORM\ManyToOne]
    private ?user $Player2 = null;

    #[ORM\ManyToOne]
    private ?team $team = null;

    #[ORM\ManyToOne]
    private ?team $team2 = null;

    public function getPlayer1(): ?user
    {
        return $this->player1;
    }

    public function setPlayer1(?user $player1): static
    {
        $this->player1 = $player1;

        return $this;
    }

    public function getPlayer2(): ?user
    {
        return $this->Player2;
    }

    public function setPlayer2(?user $Player2): static
    {
        $this->Player2 = $Player2;

        return $this;
    }

    public function getTeam(): ?team
    {
        return $this->team;
    }

    public function setTeam(?team $team): static
    {
        $this->team = $team;

        return $this;
    }

    public function getTeam2(): ?team
    {
        return $this->team2;
    }

    public function setTeam2(?team $team2): static
    {
        $this->team2 = $team2;

        return $this;
    }

}
