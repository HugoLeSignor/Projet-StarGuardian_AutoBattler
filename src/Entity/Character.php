<?php

namespace App\Entity;

use App\Repository\CharacterRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CharacterRepository::class)]
#[ORM\Table(name: '`character`')]
class Character
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    private ?string $name = null;

    #[ORM\ManyToOne(inversedBy: 'characters')]
    private ?TeamCharacters $teamCharacters = null;

    #[ORM\ManyToOne]
    private ?role $role = null;

    #[ORM\Column]
    private ?int $healt = null;

    #[ORM\Column]
    private ?int $attack = null;

    #[ORM\Column]
    private ?int $defense = null;

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

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

    public function getRole(): ?role
    {
        return $this->role;
    }

    public function setRole(?role $role): static
    {
        $this->role = $role;

        return $this;
    }

    public function getHealt(): ?int
    {
        return $this->healt;
    }

    public function setHealt(int $healt): static
    {
        $this->healt = $healt;

        return $this;
    }

    public function getAttack(): ?int
    {
        return $this->attack;
    }

    public function setAttack(int $attack): static
    {
        $this->attack = $attack;

        return $this;
    }

    public function getDefense(): ?int
    {
        return $this->defense;
    }

    public function setDefense(int $defense): static
    {
        $this->defense = $defense;

        return $this;
    }

}
