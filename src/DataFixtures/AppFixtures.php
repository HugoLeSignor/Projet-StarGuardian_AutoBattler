<?php

namespace App\DataFixtures;

use App\Entity\Character;
use App\Entity\Role;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;

class AppFixtures extends Fixture
{
    public function load(ObjectManager $manager): void
    {
        // Création des rôles
        $roles = [
            'Tank' => $this->createRole('Tank'),
            'DPS' => $this->createRole('DPS'),
            'Support' => $this->createRole('Support'),
            'Soigneur' => $this->createRole('Soigneur'),
            'Buffer' => $this->createRole('Buffer'),
        ];

        foreach ($roles as $role) {
            $manager->persist($role);
        }

        // Création des personnages de Darkest Dungeon
        $characters = [
            // Tanks
            $this->createCharacter('Crusader', $roles['Tank'], 60, 100, 40, 15, 12, 1200),
            $this->createCharacter('Man-At-Arms', $roles['Tank'], 55, 95, 35, 20, 10, 1300),
            $this->createCharacter('Leper', $roles['Tank'], 80, 120, 30, 8, 18, 1400),

            // DPS
            $this->createCharacter('Hwyman', $roles['DPS'], 85, 135, 65, 25, 35, 750),
            $this->createCharacter('Hellion', $roles['DPS'], 90, 140, 60, 20, 40, 800),
            $this->createCharacter('Grave-Robber', $roles['DPS'], 75, 125, 75, 35, 38, 700),
            $this->createCharacter('Bounty-Hunter', $roles['DPS'], 80, 130, 55, 22, 32, 780),
            $this->createCharacter('Shieldbreaker', $roles['DPS'], 85, 140, 70, 28, 36, 720),

            // Support
            $this->createCharacter('Abomination', $roles['Support'], 70, 110, 50, 18, 25, 900),
            $this->createCharacter('Plague Doctor', $roles['Support'], 55, 95, 60, 30, 20, 820),
            $this->createCharacter('Houndmaster', $roles['Support'], 65, 105, 58, 24, 28, 850),
            $this->createCharacter('Antiquarian', $roles['Support'], 30, 60, 48, 32, 10, 780),
            $this->createCharacter('Flagellant', $roles['Support'], 60, 100, 52, 20, 30, 880),

            // Soigneurs
            $this->createCharacter('Vestal', $roles['Soigneur'], 40, 75, 45, 18, 15, 950),
            $this->createCharacter('Occultist', $roles['Soigneur'], 50, 85, 55, 22, 18, 820),

            // Ranged DPS
            $this->createCharacter('Musketeer', $roles['DPS'], 75, 120, 62, 20, 42, 680),
        ];

        foreach ($characters as $character) {
            $manager->persist($character);
        }

        $manager->flush();
    }

    private function createRole(string $name): Role
    {
        $role = new Role();
        $role->setName($name);
        return $role;
    }

    private function createCharacter(
        string $name,
        Role $role,
        int $dmgMin,
        int $dmgMax,
        int $speed,
        int $dodge,
        int $crit,
        int $hp
    ): Character {
        $character = new Character();
        $character->setName($name);
        $character->setRole($role);
        $character->setDMGMIN($dmgMin);
        $character->setDMGMAX($dmgMax);
        $character->setSPEED($speed);
        $character->setDODGE($dodge);
        $character->setCRIT($crit);
        $character->setHP($hp);
        return $character;
    }
}