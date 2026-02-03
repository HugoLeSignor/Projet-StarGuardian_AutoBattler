<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;

#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    /**
     * @var Collection<int, team>
     */
    #[ORM\OneToMany(targetEntity: team::class, mappedBy: 'user')]
    private Collection $team;

    public function __construct()
    {
        $this->team = new ArrayCollection();
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
            $team->setUser($this);
        }

        return $this;
    }

    public function removeTeam(team $team): static
    {
        if ($this->team->removeElement($team)) {
            // set the owning side to null (unless already changed)
            if ($team->getUser() === $this) {
                $team->setUser(null);
            }
        }

        return $this;
    }
}
