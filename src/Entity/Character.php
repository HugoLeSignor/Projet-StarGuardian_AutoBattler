<?php

namespace App\Entity;

use App\Repository\CharacterRepository;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: CharacterRepository::class)]
#[ORM\Table(name: '`Character`')]
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
    private ?Role $role = null;

    #[ORM\OneToOne(mappedBy: 'character', cascade: ['persist', 'remove'])]
    private ?Ability $ability = null;

    #[ORM\Column]
    private ?int $DMG_MIN = null;

    #[ORM\Column]
    private ?int $DMG_MAX = null;

    #[ORM\Column]
    private ?int $SPEED = null;

    #[ORM\Column]
    private ?int $DODGE = null;

    #[ORM\Column]
    private ?int $CRIT = null;

    #[ORM\Column]
    private ?int $HP = null;

    public function getId(): ?int
    {
        return $this->id;
    }

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

    public function getRole(): ?Role
    {
        return $this->role;
    }

    public function setRole(?Role $role): static
    {
        $this->role = $role;

        return $this;
    }

    public function getDMGMIN(): ?int
    {
        return $this->DMG_MIN;
    }

    public function setDMGMIN(int $DMG_MIN): static
    {
        $this->DMG_MIN = $DMG_MIN;

        return $this;
    }

    public function getDMGMAX(): ?int
    {
        return $this->DMG_MAX;
    }

    public function setDMGMAX(int $DMG_MAX): static
    {
        $this->DMG_MAX = $DMG_MAX;

        return $this;
    }

    public function getSPEED(): ?int
    {
        return $this->SPEED;
    }

    public function setSPEED(int $SPEED): static
    {
        $this->SPEED = $SPEED;

        return $this;
    }

    public function getDODGE(): ?int
    {
        return $this->DODGE;
    }

    public function setDODGE(int $DODGE): static
    {
        $this->DODGE = $DODGE;

        return $this;
    }

    public function getCRIT(): ?int
    {
        return $this->CRIT;
    }

    public function setCRIT(int $CRIT): static
    {
        $this->CRIT = $CRIT;

        return $this;
    }

    public function getHP(): ?int
    {
        return $this->HP;
    }

    public function setHP(int $HP): static
    {
        $this->HP = $HP;

        return $this;
    }

    public function getAbility(): ?Ability
    {
        return $this->ability;
    }

    public function setAbility(?Ability $ability): static
    {
        if ($ability === null && $this->ability !== null) {
            $this->ability->setCharacter(null);
        }

        if ($ability !== null && $ability->getCharacter() !== $this) {
            $ability->setCharacter($this);
        }

        $this->ability = $ability;

        return $this;
    }
}
