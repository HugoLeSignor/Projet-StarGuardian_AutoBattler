<?php

namespace App\Entity;

use App\Repository\TeamRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TeamRepository::class)]
class Team
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne]
    private ?user $user = null;

    #[ORM\ManyToOne(inversedBy: 'team')]
    private ?TeamCharacters $teamCharacters = null;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getUser(): ?user
    {
        return $this->user;
    }

    public function setUser(?user $user): static
    {
        $this->user = $user;

        return $this;
    }

    public function getTeamCharacters(): ?TeamCharacters
    {
        return $this->teamCharacters;
    }

    public function setTeamCharacters(?TeamCharacters $teamCharacters): static
    {
        $this->teamCharacters = $teamCharacters;

        return $this;
    }
   
}
