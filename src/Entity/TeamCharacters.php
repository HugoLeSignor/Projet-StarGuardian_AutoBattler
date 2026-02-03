<?php

namespace App\Entity;

use App\Repository\TeamCharactersRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: TeamCharactersRepository::class)]
class TeamCharacters
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * @var Collection<int, team>
     */
    #[ORM\OneToMany(targetEntity: team::class, mappedBy: 'teamCharacters')]
    private Collection $team;

    #[ORM\Column]
    private ?int $position = null;

    /**
     * @var Collection<int, character>
     */
    #[ORM\OneToMany(targetEntity: character::class, mappedBy: 'teamCharacters')]
    private Collection $characters;

    public function __construct()
    {
        $this->team = new ArrayCollection();
        $this->characters = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    /**
     * @return Collection<int, team>
     */
    public function getTeam(): Collection
    {
        return $this->team;
    }

    public function addTeam(team $team): static
    {
        if (!$this->team->contains($team)) {
            $this->team->add($team);
            $team->setTeamCharacters($this);
        }

        return $this;
    }

    public function removeTeam(team $team): static
    {
        if ($this->team->removeElement($team)) {
            // set the owning side to null (unless already changed)
            if ($team->getTeamCharacters() === $this) {
                $team->setTeamCharacters(null);
            }
        }

        return $this;
    }

    public function getPosition(): ?int
    {
        return $this->position;
    }

    public function setPosition(int $position): static
    {
        $this->position = $position;

        return $this;
    }

    /**
     * @return Collection<int, character>
     */
    public function getCharacters(): Collection
    {
        return $this->characters;
    }

    public function addCharacter(character $character): static
    {
        if (!$this->characters->contains($character)) {
            $this->characters->add($character);
            $character->setTeamCharacters($this);
        }

        return $this;
    }

    public function removeCharacter(character $character): static
    {
        if ($this->characters->removeElement($character)) {
            // set the owning side to null (unless already changed)
            if ($character->getTeamCharacters() === $this) {
                $character->setTeamCharacters(null);
            }
        }

        return $this;
    }
}
