<?php

namespace App\DataFixtures;

use App\Entity\Character;
use App\Entity\Role;
use App\Entity\User;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Doctrine\Persistence\ObjectManager;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;

class AppFixtures extends Fixture
{
    private UserPasswordHasherInterface $passwordHasher;

    public function __construct(UserPasswordHasherInterface $passwordHasher)
    {
        $this->passwordHasher = $passwordHasher;
    }

    public function load(ObjectManager $manager): void
    {
        // Création d'un utilisateur admin
        $admin = new User();
        $admin->setUsername('admin');
        $admin->setEmail('admin@starguardian.com');
        $admin->setRoles(['ROLE_ADMIN']);
        $hashedPassword = $this->passwordHasher->hashPassword($admin, '123456');
        $admin->setPassword($hashedPassword);
        $manager->persist($admin);
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

        // Création des personnages de Darkest Dungeon (Stats niveau 5 authentiques)
        $characters = [
            // Tanks
            $this->createCharacter('Crusader', $roles['Tank'], 10, 19, 3, 25, 7, 61),
            $this->createCharacter('Man-At-Arms', $roles['Tank'], 8, 14, 5, 25, 6, 55),
            $this->createCharacter('Leper', $roles['Tank'], 13, 26, 4, 20, 5, 63),

            // DPS
            $this->createCharacter('Highwayman', $roles['DPS'], 9, 16, 7, 30, 9, 43),
            $this->createCharacter('Hellion', $roles['DPS'], 10, 19, 6, 30, 9, 46),
            $this->createCharacter('Grave-Robber', $roles['DPS'], 7, 14, 10, 30, 10, 36),
            $this->createCharacter('Bounty-Hunter', $roles['DPS'], 8, 16, 7, 25, 8, 45),
            $this->createCharacter('Shieldbreaker', $roles['DPS'], 9, 18, 9, 28, 10, 36),

            // Support
            $this->createCharacter('Abomination', $roles['Support'], 11, 20, 9, 27, 6, 46),
            $this->createCharacter('Plague Doctor', $roles['Support'], 7, 13, 9, 20, 6, 38),
            $this->createCharacter('Houndmaster', $roles['Support'], 7, 13, 7, 30, 8, 37),
            $this->createCharacter('Antiquarian', $roles['Support'], 5, 9, 7, 30, 5, 29),
            $this->createCharacter('Flagellant', $roles['Support'], 5, 11, 9, 20, 6, 38),

            // Soigneurs
            $this->createCharacter('Vestal', $roles['Soigneur'], 7, 14, 6, 20, 5, 44),
            $this->createCharacter('Occultist', $roles['Soigneur'], 7, 13, 8, 30, 10, 35),

            // Ranged DPS
            $this->createCharacter('Musketeer', $roles['DPS'], 7, 14, 5, 20, 10, 47),

            // Melee DPS
            $this->createCharacter('Jester', $roles['DPS'], 7, 14, 9, 30, 12, 36),
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
