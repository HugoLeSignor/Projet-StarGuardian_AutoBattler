<?php

namespace App\DataFixtures;

use App\Entity\Ability;
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
            'Crusader' => $this->createCharacter('Crusader', $roles['Tank'], 10, 19, 3, 25, 7, 61),
            'Man-At-Arms' => $this->createCharacter('Man-At-Arms', $roles['Tank'], 8, 14, 5, 25, 6, 55),
            'Leper' => $this->createCharacter('Leper', $roles['Tank'], 13, 26, 4, 20, 5, 63),

            // DPS
            'Highwayman' => $this->createCharacter('Highwayman', $roles['DPS'], 9, 16, 7, 30, 9, 43),
            'Hellion' => $this->createCharacter('Hellion', $roles['DPS'], 10, 19, 6, 30, 9, 46),
            'Grave-Robber' => $this->createCharacter('Grave-Robber', $roles['DPS'], 7, 14, 10, 30, 10, 36),
            'Bounty-Hunter' => $this->createCharacter('Bounty-Hunter', $roles['DPS'], 8, 16, 7, 25, 8, 45),
            'Shieldbreaker' => $this->createCharacter('Shieldbreaker', $roles['DPS'], 9, 18, 9, 28, 10, 36),
            'Abomination' => $this->createCharacter('Abomination', $roles['DPS'], 11, 20, 9, 27, 6, 46),

            // Support
            'Plague Doctor' => $this->createCharacter('Plague Doctor', $roles['Support'], 7, 13, 9, 20, 6, 38),
            'Houndmaster' => $this->createCharacter('Houndmaster', $roles['Buffer'], 7, 13, 7, 30, 8, 37),
            'Antiquarian' => $this->createCharacter('Antiquarian', $roles['Support'], 5, 9, 7, 30, 5, 29),
            'Flagellant' => $this->createCharacter('Flagellant', $roles['Support'], 5, 11, 9, 20, 6, 38),

            // Soigneurs
            'Vestal' => $this->createCharacter('Vestal', $roles['Soigneur'], 7, 14, 6, 20, 5, 44),
            'Occultist' => $this->createCharacter('Occultist', $roles['Soigneur'], 7, 13, 8, 30, 10, 35),

            // Ranged DPS
            'Musketeer' => $this->createCharacter('Musketeer', $roles['DPS'], 7, 14, 5, 20, 10, 47),

            // Melee DPS
            'Jester' => $this->createCharacter('Jester', $roles['DPS'], 7, 14, 9, 30, 12, 36),
        ];

        foreach ($characters as $character) {
            $manager->persist($character);
        }

        // Création des compétences signatures
        $abilities = [
            // === TANKS ===
            $this->createAbility(
                $characters['Crusader'],
                'Cri Inspirant',
                'Pousse un cri de guerre qui soigne tous les alliés.',
                'party_heal',
                ['healAmount' => 5],
                4
            ),
            $this->createAbility(
                $characters['Man-At-Arms'],
                'Rétribution',
                'Se prépare à contre-attaquer tout ennemi qui l\'attaque.',
                'riposte',
                ['riposteTurns' => 2, 'dmgMultiplier' => 50],
                4
            ),
            $this->createAbility(
                $characters['Leper'],
                'Vengeance',
                'Entre dans une rage folle, augmentant ses dégâts mais réduisant son esquive.',
                'self_buff',
                ['buffs' => ['damage' => 50, 'dodge' => -10, 'speed' => 0, 'crit' => 0], 'duration' => 2],
                4
            ),

            // === DPS ===
            $this->createAbility(
                $characters['Highwayman'],
                'Veine Ouverte',
                'Tranche l\'ennemi, infligeant une blessure qui saigne au fil des tours.',
                'bleed_attack',
                ['bleedDamage' => 3, 'bleedTurns' => 3],
                3
            ),
            $this->createAbility(
                $characters['Hellion'],
                'Iron Swan',
                'Frappe puissante ciblant l\'ennemi le plus affaibli.',
                'backline_strike',
                ['dmgMultiplier' => 1.2],
                3
            ),
            $this->createAbility(
                $characters['Grave-Robber'],
                'Shadow Fade',
                'Disparaît dans les ombres, devenant impossible à cibler. La prochaine attaque inflige des dégâts bonus.',
                'stealth',
                ['stealthTurns' => 1, 'dmgBonus' => 50],
                4
            ),
            $this->createAbility(
                $characters['Bounty-Hunter'],
                'Uppercut',
                'Coup puissant qui étourdit l\'ennemi, le forçant à passer son prochain tour.',
                'stun',
                [],
                4
            ),
            $this->createAbility(
                $characters['Shieldbreaker'],
                'Pierce',
                'Transperce l\'ennemi, ignorant totalement son esquive et sa protection.',
                'armor_pierce',
                [],
                3
            ),
            $this->createAbility(
                $characters['Abomination'],
                'Transformation',
                'Se transforme en bête, gagnant en puissance mais blessant ses alliés.',
                'self_buff',
                ['buffs' => ['damage' => 30, 'speed' => 3, 'dodge' => 0, 'crit' => 0], 'duration' => 3, 'allyDamage' => 5],
                5
            ),

            // === SUPPORT ===
            $this->createAbility(
                $characters['Plague Doctor'],
                'Blast Nocif',
                'Lance une fiole de poison qui infecte l\'ennemi avec la peste.',
                'blight_attack',
                ['blightDamage' => 4, 'blightTurns' => 3],
                3
            ),
            $this->createAbility(
                $characters['Houndmaster'],
                'Chien de Garde',
                'Ordonne à son chien de protéger un allié, augmentant aussi son esquive.',
                'protect_dodge',
                ['dodgeBonus' => 15, 'protectTurns' => 2],
                4
            ),
            $this->createAbility(
                $characters['Antiquarian'],
                'Vapeurs Revigorantes',
                'Répand des vapeurs qui augmentent l\'esquive de toute l\'équipe.',
                'party_buff',
                ['buffs' => ['dodge' => 10, 'speed' => 0, 'crit' => 0, 'damage' => 0], 'duration' => 2],
                4
            ),
            $this->createAbility(
                $characters['Flagellant'],
                'Exsanguination',
                'Quand ses PV sont bas, se soigne massivement mais s\'inflige un saignement.',
                'emergency_heal',
                ['hpThreshold' => 0.4, 'healPercent' => 0.5, 'selfBleed' => 3],
                5
            ),

            // === SOIGNEURS ===
            $this->createAbility(
                $characters['Vestal'],
                'Réconfort Divin',
                'Invoque une lumière divine qui soigne tous les alliés.',
                'party_heal',
                ['healAmount' => 8],
                4
            ),
            $this->createAbility(
                $characters['Occultist'],
                'Malédiction de Vulnérabilité',
                'Marque un ennemi, le rendant vulnérable et augmentant les dégâts qu\'il reçoit.',
                'mark',
                ['markTurns' => 3, 'bonusDamage' => 30],
                3
            ),

            // === DPS (suite) ===
            $this->createAbility(
                $characters['Musketeer'],
                'Tir Précis',
                'Tir dévastateur qui inflige des dégâts bonus sur les cibles marquées.',
                'bonus_vs_marked',
                ['markedBonus' => 50],
                2
            ),
            $this->createAbility(
                $characters['Jester'],
                'Ballade de Bataille',
                'Joue une mélodie entraînante qui augmente la vitesse et le critique de toute l\'équipe.',
                'party_buff',
                ['buffs' => ['speed' => 3, 'crit' => 5, 'dodge' => 0, 'damage' => 0], 'duration' => 3],
                4
            ),
        ];

        foreach ($abilities as $ability) {
            $manager->persist($ability);
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

    private function createAbility(
        Character $character,
        string $name,
        string $description,
        string $type,
        array $parameters,
        int $cooldown
    ): Ability {
        $ability = new Ability();
        $ability->setName($name);
        $ability->setDescription($description);
        $ability->setType($type);
        $ability->setParameters($parameters);
        $ability->setCooldown($cooldown);
        $ability->setCharacter($character);
        return $ability;
    }
}
