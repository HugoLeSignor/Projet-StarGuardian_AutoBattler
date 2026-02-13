<?php

namespace App\Service;

use App\Config\SynergyConfig;
use App\Entity\Character;

interface ActionInterface
{
    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void;
}

// ============================================================
// ACTION DE BASE : ATTAQUE
// ============================================================

class AttackAction implements ActionInterface
{
    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        $initialTargetIndex = CombatEngine::getRandomAliveIndex($teamEnemies, true);
        if ($initialTargetIndex === null)
            return;

        $initialTargetData =& $teamEnemies[$initialTargetIndex];
        $targetData =& $initialTargetData;

        if (in_array('protected', $initialTargetData['statuses'], true) && isset($initialTargetData['protectedBy'])) {
            foreach ($teamEnemies as &$edata) {
                if ($edata === null) continue;
                if ($edata['char'] === $initialTargetData['protectedBy'] && $edata['char']->getHP() > 0) {
                    $logs[] = [
                        'type' => 'protect',
                        'protector' => $edata['char']->getName(),
                        'protectorTeam' => $edata['team'],
                        'protected' => $initialTargetData['char']->getName(),
                        'protectedTeam' => $initialTargetData['team'],
                        'message' => CombatEngine::colorNameStatic($edata) . " protège " . CombatEngine::colorNameStatic($initialTargetData)
                    ];
                    $targetData =& $edata;
                    break;
                }
            }
            unset($edata);
        }

        $target = $targetData['char'];

        // Bonus de dégâts si furtivité active
        $stealthBonus = 0;
        if (isset($userData['stealth']) && $userData['stealth']['turnsLeft'] > 0) {
            $stealthBonus = $userData['stealth']['dmgBonus'];
            unset($userData['stealth']);
            $userData['statuses'] = array_values(array_filter($userData['statuses'], fn($s) => $s !== 'stealthed'));
        }

        if (rand(1, 100) <= $target->getDODGE() + ($targetData['tempBuffs']['dodge'] ?? 0)) {
            $logs[] = [
                'type' => 'dodge',
                'attacker' => $user->getName(),
                'attackerTeam' => $userData['team'],
                'target' => $target->getName(),
                'targetTeam' => $targetData['team'],
                'message' => CombatEngine::colorNameStatic($targetData) . " esquive l'attaque de " . CombatEngine::colorNameStatic($userData)
            ];
            return;
        }

        $damage = rand($user->getDMGMIN(), $user->getDMGMAX());

        // Bonus de dégâts temporaires (buffs)
        $dmgBonusPercent = ($userData['tempBuffs']['damage'] ?? 0) + $stealthBonus;
        if ($dmgBonusPercent > 0) {
            $damage = (int)($damage * (1 + $dmgBonusPercent / 100));
        }

        // Bonus si cible marquée
        if (isset($targetData['marked']) && $targetData['marked']['turnsLeft'] > 0) {
            $damage = (int)($damage * (1 + $targetData['marked']['bonusDamage'] / 100));
        }

        $isCrit = false;
        $critChance = $user->getCRIT() + ($userData['tempBuffs']['crit'] ?? 0);
        if (rand(1, 100) <= $critChance) {
            $damage = (int)($damage * 1.5);
            $isCrit = true;
        }

        $newHP = max(0, $target->getHP() - $damage);
        $target->setHP($newHP);

        $logs[] = [
            'type' => 'attack',
            'attacker' => $user->getName(),
            'attackerTeam' => $userData['team'],
            'target' => $target->getName(),
            'targetTeam' => $targetData['team'],
            'damage' => $damage,
            'targetHP' => $newHP,
            'targetMaxHP' => $targetData['HP_MAX'],
            'isCrit' => $isCrit,
            'message' => CombatEngine::colorNameStatic($userData) . " attaque " . CombatEngine::colorNameStatic($targetData) . " → $damage dégâts (HP: $newHP)" . ($isCrit ? " (CRIT!)" : "")
        ];

        // Retirer la marque si removeOnHit
        if (isset($targetData['marked']) && ($targetData['marked']['removeOnHit'] ?? false)) {
            unset($targetData['marked']);
            $targetData['statuses'] = array_values(array_filter($targetData['statuses'], fn($s) => $s !== 'marked'));
        }

        // Riposte : la cible contre-attaque
        if ($newHP > 0 && isset($targetData['riposte']) && $targetData['riposte']['turnsLeft'] > 0) {
            $riposteDmg = rand($target->getDMGMIN(), $target->getDMGMAX());
            $riposteDmg = (int)($riposteDmg * $targetData['riposte']['dmgMultiplier'] / 100);
            $riposteHP = max(0, $user->getHP() - $riposteDmg);
            $user->setHP($riposteHP);

            $logs[] = [
                'type' => 'riposte_activate',
                'attacker' => $target->getName(),
                'attackerTeam' => $targetData['team'],
                'target' => $user->getName(),
                'targetTeam' => $userData['team'],
                'damage' => $riposteDmg,
                'targetHP' => $riposteHP,
                'targetMaxHP' => $userData['HP_MAX'],
                'message' => CombatEngine::colorNameStatic($targetData) . " riposte ! → $riposteDmg dégâts à " . CombatEngine::colorNameStatic($userData) . " (HP: $riposteHP)"
            ];

            if ($riposteHP === 0 && !in_array('dead', $userData['statuses'], true)) {
                $userData['statuses'][] = 'dead';
                $logs[] = [
                    'type' => 'death',
                    'target' => $user->getName(),
                    'targetTeam' => $userData['team'],
                    'message' => CombatEngine::colorNameStatic($userData) . " est K.O !"
                ];
            }
        }

        if ($newHP === 0 && !in_array('dead', $targetData['statuses'], true)) {
            $targetData['statuses'][] = 'dead';
            $logs[] = [
                'type' => 'death',
                'target' => $target->getName(),
                'targetTeam' => $targetData['team'],
                'message' => CombatEngine::colorNameStatic($targetData) . " est K.O !"
            ];
        }
    }
}

// ============================================================
// ACTION EXISTANTE : SOIN
// ============================================================

class HealAction implements ActionInterface
{
    private int $healAmount;
    private int $cooldownTurns;

    public function __construct(int $healAmount, int $cooldownTurns = 2)
    {
        $this->healAmount = $healAmount;
        $this->cooldownTurns = $cooldownTurns;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['heal'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $targetIndex = $this->getLowestHPIndex($teamAllies);
        if ($targetIndex === null)
            return;

        $targetData =& $teamAllies[$targetIndex];
        $target = $targetData['char'];

        if ($target->getHP() >= $targetData['HP_MAX']) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $healAmount = min($this->healAmount, $targetData['HP_MAX'] - $target->getHP());
        $target->setHP($target->getHP() + $healAmount);

        $logs[] = [
            'type' => 'heal',
            'healer' => $user->getName(),
            'healerTeam' => $userData['team'],
            'target' => $target->getName(),
            'targetTeam' => $targetData['team'],
            'amount' => $healAmount,
            'targetHP' => $target->getHP(),
            'targetMaxHP' => $targetData['HP_MAX'],
            'message' => CombatEngine::colorNameStatic($userData) . " soigne " . CombatEngine::colorNameStatic($targetData) . " (+$healAmount PV)"
        ];

        $userData['cooldowns']['heal'] = $this->cooldownTurns;
    }

    private function getLowestHPIndex(array $team): ?int
    {
        $lowest = null;
        $ratio = 999;

        foreach ($team as $i => $data) {
            if ($data === null) continue;
            if ($data['char']->getHP() <= 0)
                continue;

            $currentRatio = $data['char']->getHP() / $data['HP_MAX'];
            if ($currentRatio < $ratio) {
                $ratio = $currentRatio;
                $lowest = $i;
            }
        }

        return $lowest;
    }
}

// ============================================================
// ACTION EXISTANTE : DEFENSE D'ALLIE
// ============================================================

class DefendAllyAction implements ActionInterface
{
    private int $cooldownTurns = 4;

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['defend'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $choices = [];
        foreach ($teamAllies as $i => $data) {
            if ($data === null) continue;
            if ($data['char'] !== $user && $data['char']->getHP() > 0) {
                $choices[] = $i;
            }
        }

        if (empty($choices)) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $targetIndex = $choices[array_rand($choices)];
        $targetData =& $teamAllies[$targetIndex];

        $targetData['statuses'][] = 'protected';
        $targetData['protectedBy'] = $user;
        $targetData['protectTurns'] = 2;

        $logs[] = [
            'type' => 'defend',
            'defender' => $user->getName(),
            'defenderTeam' => $userData['team'],
            'target' => $targetData['char']->getName(),
            'targetTeam' => $targetData['team'],
            'duration' => 2,
            'message' => CombatEngine::colorNameStatic($userData) . " protège " . CombatEngine::colorNameStatic($targetData) . " pendant 2 tours"
        ];

        $userData['cooldowns']['defend'] = $this->cooldownTurns;
    }
}

// ============================================================
// NOUVELLES ACTIONS : COMPETENCES SIGNATURES
// ============================================================

/**
 * Attaque + Saignement DoT
 * Utilisé par : Highwayman (Veine Ouverte)
 */
class BleedAttackAction implements ActionInterface
{
    private int $bleedDamage;
    private int $bleedTurns;
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(int $bleedDamage, int $bleedTurns, int $cooldownTurns, string $abilityName = 'Saignement')
    {
        $this->bleedDamage = $bleedDamage;
        $this->bleedTurns = $bleedTurns;
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $targetIndex = CombatEngine::getRandomAliveIndex($teamEnemies, true);
        if ($targetIndex === null) return;

        $targetData =& $teamEnemies[$targetIndex];
        $target = $targetData['char'];

        // Attaque réduite (80% des dégâts)
        $damage = (int)(rand($user->getDMGMIN(), $user->getDMGMAX()) * 0.8);
        $newHP = max(0, $target->getHP() - $damage);
        $target->setHP($newHP);

        // Appliquer le saignement
        $targetData['dots']['bleed'] = ['damage' => $this->bleedDamage, 'turnsLeft' => $this->bleedTurns];
        if (!in_array('bleeding', $targetData['statuses'], true)) {
            $targetData['statuses'][] = 'bleeding';
        }

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'bleed_attack',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'target' => $target->getName(),
            'targetTeam' => $targetData['team'],
            'abilityName' => $this->abilityName,
            'damage' => $damage,
            'targetHP' => $newHP,
            'targetMaxHP' => $targetData['HP_MAX'],
            'bleedDamage' => $this->bleedDamage,
            'bleedTurns' => $this->bleedTurns,
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> sur " . CombatEngine::colorNameStatic($targetData) . " → $damage dégâts + Saignement ({$this->bleedDamage}/tour, {$this->bleedTurns} tours)"
        ];

        if ($newHP === 0 && !in_array('dead', $targetData['statuses'], true)) {
            $targetData['statuses'][] = 'dead';
            $logs[] = [
                'type' => 'death',
                'target' => $target->getName(),
                'targetTeam' => $targetData['team'],
                'message' => CombatEngine::colorNameStatic($targetData) . " est K.O !"
            ];
        }

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

/**
 * Attaque AoE + Peste (Blight) DoT sur la cible principale
 * Utilisé par : Plague Doctor (Blast Nocif)
 * Inflige des dégâts réduits à TOUS les ennemis, mais le DoT ne touche que la cible principale.
 */
class BlightAttackAction implements ActionInterface
{
    private int $blightDamage;
    private int $blightTurns;
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(int $blightDamage, int $blightTurns, int $cooldownTurns, string $abilityName = 'Peste')
    {
        $this->blightDamage = $blightDamage;
        $this->blightTurns = $blightTurns;
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        // Choisir la cible principale pour le DoT
        $primaryIndex = CombatEngine::getRandomAliveIndex($teamEnemies, true);
        if ($primaryIndex === null) return;

        // Dégâts AoE réduits (50% des dégâts) sur tous les ennemis vivants
        $allHits = [];
        foreach ($teamEnemies as $i => &$enemyData) {
            if ($enemyData === null) continue;
            if ($enemyData['char']->getHP() <= 0) continue;

            $enemy = $enemyData['char'];
            $damage = (int)(rand($user->getDMGMIN(), $user->getDMGMAX()) * 0.5);
            $newHP = max(0, $enemy->getHP() - $damage);
            $enemy->setHP($newHP);

            $allHits[] = [
                'name' => $enemy->getName(),
                'team' => $enemyData['team'],
                'damage' => $damage,
                'hp' => $newHP,
                'maxHp' => $enemyData['HP_MAX'],
                'isPrimary' => ($i === $primaryIndex),
            ];

            if ($newHP === 0 && !in_array('dead', $enemyData['statuses'], true)) {
                $enemyData['statuses'][] = 'dead';
                $logs[] = [
                    'type' => 'death',
                    'target' => $enemy->getName(),
                    'targetTeam' => $enemyData['team'],
                    'message' => CombatEngine::colorNameStatic($enemyData) . " est K.O !"
                ];
            }
        }
        unset($enemyData);

        // Appliquer la peste UNIQUEMENT sur la cible principale
        $primaryData =& $teamEnemies[$primaryIndex];
        if ($primaryData['char']->getHP() > 0) {
            $primaryData['dots']['blight'] = ['damage' => $this->blightDamage, 'turnsLeft' => $this->blightTurns];
            if (!in_array('blighted', $primaryData['statuses'], true)) {
                $primaryData['statuses'][] = 'blighted';
            }
        }

        $primaryName = $primaryData['char']->getName();
        $hitNames = array_map(fn($h) => $h['name'], $allHits);
        $hitList = implode(', ', $hitNames);

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'blight_attack',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'target' => $primaryName,
            'targetTeam' => $primaryData['team'],
            'abilityName' => $this->abilityName,
            'allHits' => $allHits,
            'blightDamage' => $this->blightDamage,
            'blightTurns' => $this->blightTurns,
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> → Empoisonne la zone ! Touche $hitList + Peste sur " . CombatEngine::colorNameStatic($primaryData) . " ({$this->blightDamage}/tour, {$this->blightTurns} tours)"
        ];

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

/**
 * Étourdissement
 * Utilisé par : Bounty-Hunter (Uppercut)
 */
class StunAction implements ActionInterface
{
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(int $cooldownTurns, string $abilityName = 'Étourdissement')
    {
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $targetIndex = CombatEngine::getRandomAliveIndex($teamEnemies, true);
        if ($targetIndex === null) return;

        $targetData =& $teamEnemies[$targetIndex];
        $target = $targetData['char'];

        // Dégâts réduits + stun
        $damage = (int)(rand($user->getDMGMIN(), $user->getDMGMAX()) * 0.6);
        $newHP = max(0, $target->getHP() - $damage);
        $target->setHP($newHP);

        $targetData['stunned'] = true;
        if (!in_array('stunned', $targetData['statuses'], true)) {
            $targetData['statuses'][] = 'stunned';
        }

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'stun',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'target' => $target->getName(),
            'targetTeam' => $targetData['team'],
            'abilityName' => $this->abilityName,
            'damage' => $damage,
            'targetHP' => $newHP,
            'targetMaxHP' => $targetData['HP_MAX'],
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> sur " . CombatEngine::colorNameStatic($targetData) . " → $damage dégâts + Étourdi !"
        ];

        if ($newHP === 0 && !in_array('dead', $targetData['statuses'], true)) {
            $targetData['statuses'][] = 'dead';
            $logs[] = [
                'type' => 'death',
                'target' => $target->getName(),
                'targetTeam' => $targetData['team'],
                'message' => CombatEngine::colorNameStatic($targetData) . " est K.O !"
            ];
        }

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

/**
 * Marquer un ennemi (+X% dégâts reçus)
 * Utilisé par : Occultist (Malédiction de Vulnérabilité)
 */
class MarkAction implements ActionInterface
{
    private int $markTurns;
    private int $bonusDamage;
    private bool $removeOnHit;
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(int $markTurns, int $bonusDamage, int $cooldownTurns, string $abilityName = 'Marque', bool $removeOnHit = false)
    {
        $this->markTurns = $markTurns;
        $this->bonusDamage = $bonusDamage;
        $this->removeOnHit = $removeOnHit;
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $targetIndex = CombatEngine::getRandomAliveIndex($teamEnemies, true);
        if ($targetIndex === null) return;

        $targetData =& $teamEnemies[$targetIndex];
        $target = $targetData['char'];

        $targetData['marked'] = ['turnsLeft' => $this->markTurns, 'bonusDamage' => $this->bonusDamage, 'removeOnHit' => $this->removeOnHit];
        if (!in_array('marked', $targetData['statuses'], true)) {
            $targetData['statuses'][] = 'marked';
        }

        $desc = $this->removeOnHit ? "jusqu'au prochain coup" : "{$this->markTurns} tours";
        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'mark',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'target' => $target->getName(),
            'targetTeam' => $targetData['team'],
            'abilityName' => $this->abilityName,
            'markTurns' => $this->markTurns,
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> → " . CombatEngine::colorNameStatic($targetData) . " est marqué ! (+{$this->bonusDamage}% dégâts reçus, $desc)"
        ];

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

/**
 * Riposte : contre-attaque automatique quand frappé
 * Utilisé par : Man-At-Arms (Rétribution)
 */
class RiposteAction implements ActionInterface
{
    private int $riposteTurns;
    private int $dmgMultiplier;
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(int $riposteTurns, int $dmgMultiplier, int $cooldownTurns, string $abilityName = 'Riposte')
    {
        $this->riposteTurns = $riposteTurns;
        $this->dmgMultiplier = $dmgMultiplier;
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $userData['riposte'] = ['turnsLeft' => $this->riposteTurns, 'dmgMultiplier' => $this->dmgMultiplier];

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'riposte_buff',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'abilityName' => $this->abilityName,
            'riposteTurns' => $this->riposteTurns,
            'message' => CombatEngine::colorNameStatic($userData) . " active <span class='ability-name'>{$this->abilityName}</span> ! (Contre-attaque pendant {$this->riposteTurns} tours)"
        ];

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

/**
 * Buff personnel (dégâts, vitesse, esquive, etc.)
 * Utilisé par : Leper (Vengeance), Abomination (Transformation)
 */
class SelfBuffAction implements ActionInterface
{
    private array $buffs;
    private int $duration;
    private int $cooldownTurns;
    private string $abilityName;
    private int $allyDamage;
    private float $hpThreshold;

    public function __construct(array $buffs, int $duration, int $cooldownTurns, string $abilityName = 'Buff', int $allyDamage = 0, float $hpThreshold = 1.0)
    {
        $this->buffs = $buffs;
        $this->duration = $duration;
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
        $this->allyDamage = $allyDamage;
        $this->hpThreshold = $hpThreshold;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        // Vérifier le seuil de HP (ex: Abomination ne se transforme que sous 50% HP)
        if ($this->hpThreshold < 1.0) {
            $hpRatio = $user->getHP() / $userData['HP_MAX'];
            if ($hpRatio > $this->hpThreshold) {
                $action = new AttackAction();
                $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
                return;
            }
        }

        $userData['tempBuffs'] = array_merge($userData['tempBuffs'], $this->buffs);
        $userData['tempBuffs']['turnsLeft'] = $this->duration;

        $isPermanent = $this->duration >= 999;
        $effects = [];
        if (isset($this->buffs['damage']) && $this->buffs['damage'] > 0) $effects[] = "+{$this->buffs['damage']}% dégâts";
        if (isset($this->buffs['speed']) && $this->buffs['speed'] > 0) $effects[] = "+{$this->buffs['speed']} vitesse";
        if (isset($this->buffs['dodge']) && $this->buffs['dodge'] < 0) $effects[] = "{$this->buffs['dodge']} esquive";
        if (isset($this->buffs['crit']) && $this->buffs['crit'] > 0) $effects[] = "+{$this->buffs['crit']}% crit";
        $effectStr = implode(', ', $effects);

        $durationText = $isPermanent ? 'permanent' : "{$this->duration} tours";
        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'self_buff',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'abilityName' => $this->abilityName,
            'buffDuration' => $this->duration,
            'buffs' => $this->buffs,
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> ! ($effectStr, $durationText)"
        ];

        // Dégâts aux alliés (Abomination : Transformation)
        if ($this->allyDamage > 0) {
            foreach ($teamAllies as &$allyData) {
                if ($allyData === null) continue;
                if ($allyData['char'] === $user || $allyData['char']->getHP() <= 0) continue;
                $ally = $allyData['char'];
                $allyNewHP = max(0, $ally->getHP() - $this->allyDamage);
                $ally->setHP($allyNewHP);
                $logs[] = [
                    'type' => 'ability_use',
                    'subtype' => 'transform_damage',
                    'target' => $ally->getName(),
                    'targetTeam' => $allyData['team'],
                    'damage' => $this->allyDamage,
                    'targetHP' => $allyNewHP,
                    'targetMaxHP' => $allyData['HP_MAX'],
                    'message' => "La transformation inflige {$this->allyDamage} dégâts à " . CombatEngine::colorNameStatic($allyData) . " (HP: $allyNewHP)"
                ];
                if ($allyNewHP === 0 && !in_array('dead', $allyData['statuses'], true)) {
                    $allyData['statuses'][] = 'dead';
                    $logs[] = [
                        'type' => 'death',
                        'target' => $ally->getName(),
                        'targetTeam' => $allyData['team'],
                        'message' => CombatEngine::colorNameStatic($allyData) . " est K.O !"
                    ];
                }
            }
            unset($allyData);
        }

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

/**
 * Soin de groupe (tous les alliés)
 * Utilisé par : Crusader (Cri Inspirant), Vestal (Réconfort Divin)
 */
class PartyHealAction implements ActionInterface
{
    private int $healAmount;
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(int $healAmount, int $cooldownTurns, string $abilityName = 'Soin de groupe')
    {
        $this->healAmount = $healAmount;
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        // Vérifier si au moins un allié a besoin de soin
        $needsHeal = false;
        foreach ($teamAllies as $allyData) {
            if ($allyData === null) continue;
            if ($allyData['char']->getHP() > 0 && $allyData['char']->getHP() < $allyData['HP_MAX']) {
                $needsHeal = true;
                break;
            }
        }
        if (!$needsHeal) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $healed = [];
        foreach ($teamAllies as &$allyData) {
            if ($allyData === null) continue;
            $ally = $allyData['char'];
            if ($ally->getHP() <= 0) continue;
            $amount = min($this->healAmount, $allyData['HP_MAX'] - $ally->getHP());
            if ($amount > 0) {
                $ally->setHP($ally->getHP() + $amount);
                $healed[] = ['name' => $ally->getName(), 'team' => $allyData['team'], 'amount' => $amount, 'hp' => $ally->getHP(), 'maxHp' => $allyData['HP_MAX']];
            }
        }
        unset($allyData);

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'party_heal',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'abilityName' => $this->abilityName,
            'healed' => $healed,
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> → Soigne tous les alliés (+{$this->healAmount} PV)"
        ];

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

/**
 * Buff d'équipe (vitesse, crit, esquive pour tous les alliés)
 * Utilisé par : Jester (Ballade de Bataille), Antiquarian (Vapeurs Revigorantes)
 */
class PartyBuffAction implements ActionInterface
{
    private array $buffs;
    private int $duration;
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(array $buffs, int $duration, int $cooldownTurns, string $abilityName = 'Buff d\'équipe')
    {
        $this->buffs = $buffs;
        $this->duration = $duration;
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        foreach ($teamAllies as &$allyData) {
            if ($allyData === null) continue;
            if ($allyData['char']->getHP() <= 0) continue;
            $allyData['tempBuffs'] = array_merge($allyData['tempBuffs'], $this->buffs);
            $allyData['tempBuffs']['turnsLeft'] = $this->duration;
        }
        unset($allyData);

        $effects = [];
        if (isset($this->buffs['speed']) && $this->buffs['speed'] > 0) $effects[] = "+{$this->buffs['speed']} vitesse";
        if (isset($this->buffs['crit']) && $this->buffs['crit'] > 0) $effects[] = "+{$this->buffs['crit']}% crit";
        if (isset($this->buffs['dodge']) && $this->buffs['dodge'] > 0) $effects[] = "+{$this->buffs['dodge']} esquive";
        if (isset($this->buffs['damage']) && $this->buffs['damage'] > 0) $effects[] = "+{$this->buffs['damage']}% dégâts";
        $effectStr = implode(', ', $effects);

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'party_buff',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'abilityName' => $this->abilityName,
            'buffDuration' => $this->duration,
            'buffs' => $this->buffs,
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> ! Toute l'équipe gagne $effectStr pendant {$this->duration} tours"
        ];

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

/**
 * Furtivité : non-ciblable + bonus de dégâts au prochain coup
 * Utilisé par : Grave-Robber (Shadow Fade)
 */
class StealthAction implements ActionInterface
{
    private int $stealthTurns;
    private int $dmgBonus;
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(int $stealthTurns, int $dmgBonus, int $cooldownTurns, string $abilityName = 'Furtivité')
    {
        $this->stealthTurns = $stealthTurns;
        $this->dmgBonus = $dmgBonus;
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $userData['stealth'] = ['turnsLeft' => $this->stealthTurns, 'dmgBonus' => $this->dmgBonus];
        if (!in_array('stealthed', $userData['statuses'], true)) {
            $userData['statuses'][] = 'stealthed';
        }

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'stealth',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'abilityName' => $this->abilityName,
            'stealthTurns' => $this->stealthTurns,
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> → Disparaît dans l'ombre ! (+{$this->dmgBonus}% dégâts au prochain coup)"
        ];

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

/**
 * Attaque ignorant l'esquive et la protection
 * Utilisé par : Shieldbreaker (Pierce)
 */
class ArmorPierceAction implements ActionInterface
{
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(int $cooldownTurns, string $abilityName = 'Pierce')
    {
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $targetIndex = CombatEngine::getRandomAliveIndex($teamEnemies, false);
        if ($targetIndex === null) return;

        $targetData =& $teamEnemies[$targetIndex];
        $target = $targetData['char'];

        // Dégâts normaux, IGNORE l'esquive et la protection
        $damage = rand($user->getDMGMIN(), $user->getDMGMAX());

        $isCrit = false;
        if (rand(1, 100) <= $user->getCRIT()) {
            $damage = (int)($damage * 1.5);
            $isCrit = true;
        }

        $newHP = max(0, $target->getHP() - $damage);
        $target->setHP($newHP);

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'armor_pierce',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'target' => $target->getName(),
            'targetTeam' => $targetData['team'],
            'abilityName' => $this->abilityName,
            'damage' => $damage,
            'targetHP' => $newHP,
            'targetMaxHP' => $targetData['HP_MAX'],
            'isCrit' => $isCrit,
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> → Transperce " . CombatEngine::colorNameStatic($targetData) . " ! $damage dégâts (HP: $newHP)" . ($isCrit ? " (CRIT!)" : "")
        ];

        if ($newHP === 0 && !in_array('dead', $targetData['statuses'], true)) {
            $targetData['statuses'][] = 'dead';
            $logs[] = [
                'type' => 'death',
                'target' => $target->getName(),
                'targetTeam' => $targetData['team'],
                'message' => CombatEngine::colorNameStatic($targetData) . " est K.O !"
            ];
        }

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

/**
 * Auto-soin d'urgence (seulement si PV < seuil)
 * Utilisé par : Flagellant (Exsanguination)
 */
class EmergencyHealAction implements ActionInterface
{
    private float $hpThreshold;
    private float $healPercent;
    private int $selfBleed;
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(float $hpThreshold, float $healPercent, int $selfBleed, int $cooldownTurns, string $abilityName = 'Soin d\'urgence')
    {
        $this->hpThreshold = $hpThreshold;
        $this->healPercent = $healPercent;
        $this->selfBleed = $selfBleed;
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        // Vérifier si les PV sont sous le seuil
        $hpRatio = $user->getHP() / $userData['HP_MAX'];
        if ($hpRatio > $this->hpThreshold) {
            // PV trop hauts, attaque normale
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        // Auto-soin
        $healAmount = (int)($userData['HP_MAX'] * $this->healPercent);
        $healAmount = min($healAmount, $userData['HP_MAX'] - $user->getHP());
        $user->setHP($user->getHP() + $healAmount);

        // S'infliger un saignement
        if ($this->selfBleed > 0) {
            $userData['dots']['bleed'] = ['damage' => $this->selfBleed, 'turnsLeft' => 3];
            if (!in_array('bleeding', $userData['statuses'], true)) {
                $userData['statuses'][] = 'bleeding';
            }
        }

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'emergency_heal',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'target' => $user->getName(),
            'targetTeam' => $userData['team'],
            'abilityName' => $this->abilityName,
            'selfBleedTurns' => $this->selfBleed > 0 ? 3 : 0,
            'amount' => $healAmount,
            'targetHP' => $user->getHP(),
            'targetMaxHP' => $userData['HP_MAX'],
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> → Se soigne de $healAmount PV (HP: {$user->getHP()})" . ($this->selfBleed > 0 ? " mais s'inflige Saignement ({$this->selfBleed}/tour)" : "")
        ];

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

/**
 * Frappe ciblant l'ennemi le plus faible (plus bas PV)
 * Utilisé par : Hellion (Iron Swan)
 */
class BacklineStrikeAction implements ActionInterface
{
    private float $dmgMultiplier;
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(float $dmgMultiplier, int $cooldownTurns, string $abilityName = 'Frappe arrière')
    {
        $this->dmgMultiplier = $dmgMultiplier;
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        // Trouver l'ennemi vivant avec le moins de PV
        $targetIndex = null;
        $lowestHP = PHP_INT_MAX;
        foreach ($teamEnemies as $i => $edata) {
            if ($edata === null) continue;
            if ($edata['char']->getHP() > 0 && $edata['char']->getHP() < $lowestHP) {
                $lowestHP = $edata['char']->getHP();
                $targetIndex = $i;
            }
        }
        if ($targetIndex === null) return;

        $targetData =& $teamEnemies[$targetIndex];
        $target = $targetData['char'];

        $damage = (int)(rand($user->getDMGMIN(), $user->getDMGMAX()) * $this->dmgMultiplier);
        $isCrit = false;
        if (rand(1, 100) <= $user->getCRIT()) {
            $damage = (int)($damage * 1.5);
            $isCrit = true;
        }

        $newHP = max(0, $target->getHP() - $damage);
        $target->setHP($newHP);

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'backline_strike',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'target' => $target->getName(),
            'targetTeam' => $targetData['team'],
            'abilityName' => $this->abilityName,
            'damage' => $damage,
            'targetHP' => $newHP,
            'targetMaxHP' => $targetData['HP_MAX'],
            'isCrit' => $isCrit,
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> → Frappe " . CombatEngine::colorNameStatic($targetData) . " ! $damage dégâts (HP: $newHP)" . ($isCrit ? " (CRIT!)" : "")
        ];

        if ($newHP === 0 && !in_array('dead', $targetData['statuses'], true)) {
            $targetData['statuses'][] = 'dead';
            $logs[] = [
                'type' => 'death',
                'target' => $target->getName(),
                'targetTeam' => $targetData['team'],
                'message' => CombatEngine::colorNameStatic($targetData) . " est K.O !"
            ];
        }

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

/**
 * Protection d'allié + bonus d'esquive + bonus de dégâts
 * Utilisé par : Houndmaster (Chien de Garde)
 */
class ProtectDodgeAction implements ActionInterface
{
    private int $dodgeBonus;
    private int $dmgBonus;
    private int $protectTurns;
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(int $dodgeBonus, int $protectTurns, int $cooldownTurns, string $abilityName = 'Protection', int $dmgBonus = 0)
    {
        $this->dodgeBonus = $dodgeBonus;
        $this->dmgBonus = $dmgBonus;
        $this->protectTurns = $protectTurns;
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        // Choisir un allié à protéger (le plus faible en % PV)
        $choices = [];
        foreach ($teamAllies as $i => $data) {
            if ($data === null) continue;
            if ($data['char'] !== $user && $data['char']->getHP() > 0) {
                $choices[] = $i;
            }
        }

        if (empty($choices)) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        // Choisir l'allié avec le moins de PV en %
        $bestIdx = null;
        $lowestRatio = 999;
        foreach ($choices as $idx) {
            $ratio = $teamAllies[$idx]['char']->getHP() / $teamAllies[$idx]['HP_MAX'];
            if ($ratio < $lowestRatio) {
                $lowestRatio = $ratio;
                $bestIdx = $idx;
            }
        }

        $targetData =& $teamAllies[$bestIdx];
        $targetData['statuses'][] = 'protected';
        $targetData['protectedBy'] = $user;
        $targetData['protectTurns'] = $this->protectTurns;

        // Bonus d'esquive temporaire
        $targetData['tempBuffs']['dodge'] = ($targetData['tempBuffs']['dodge'] ?? 0) + $this->dodgeBonus;
        $targetData['tempBuffs']['turnsLeft'] = max($targetData['tempBuffs']['turnsLeft'] ?? 0, $this->protectTurns);

        // Bonus de dégâts temporaire
        if ($this->dmgBonus > 0) {
            $targetData['tempBuffs']['damage'] = ($targetData['tempBuffs']['damage'] ?? 0) + $this->dmgBonus;
        }

        $effects = "+{$this->dodgeBonus} esquive";
        if ($this->dmgBonus > 0) {
            $effects .= ", +{$this->dmgBonus}% dégâts";
        }

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'protect_dodge',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'target' => $targetData['char']->getName(),
            'targetTeam' => $targetData['team'],
            'abilityName' => $this->abilityName,
            'protectTurns' => $this->protectTurns,
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> → Protège " . CombatEngine::colorNameStatic($targetData) . " ($effects, {$this->protectTurns} tours)"
        ];

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

/**
 * Dégâts bonus sur cible marquée
 * Utilisé par : Musketeer (Tir Précis)
 */
class BonusVsMarkedAction implements ActionInterface
{
    private int $markedBonus;
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(int $markedBonus, int $cooldownTurns, string $abilityName = 'Tir précis')
    {
        $this->markedBonus = $markedBonus;
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        // Chercher une cible marquée en priorité
        $targetIndex = null;
        foreach ($teamEnemies as $i => $edata) {
            if ($edata === null) continue;
            if ($edata['char']->getHP() > 0 && isset($edata['marked']) && $edata['marked']['turnsLeft'] > 0) {
                $targetIndex = $i;
                break;
            }
        }

        // Si pas de cible marquée, attaque normale
        if ($targetIndex === null) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $targetData =& $teamEnemies[$targetIndex];
        $target = $targetData['char'];

        $damage = rand($user->getDMGMIN(), $user->getDMGMAX());
        $damage = (int)($damage * (1 + $this->markedBonus / 100));

        $newHP = max(0, $target->getHP() - $damage);
        $target->setHP($newHP);

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'bonus_vs_marked',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'target' => $target->getName(),
            'targetTeam' => $targetData['team'],
            'abilityName' => $this->abilityName,
            'damage' => $damage,
            'targetHP' => $newHP,
            'targetMaxHP' => $targetData['HP_MAX'],
            'isCrit' => false,
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> sur cible marquée → " . CombatEngine::colorNameStatic($targetData) . " $damage dégâts (HP: $newHP)"
        ];

        // Retirer la marque si removeOnHit
        if (isset($targetData['marked']) && ($targetData['marked']['removeOnHit'] ?? false)) {
            unset($targetData['marked']);
            $targetData['statuses'] = array_values(array_filter($targetData['statuses'], fn($s) => $s !== 'marked'));
        }

        if ($newHP === 0 && !in_array('dead', $targetData['statuses'], true)) {
            $targetData['statuses'][] = 'dead';
            $logs[] = [
                'type' => 'death',
                'target' => $target->getName(),
                'targetTeam' => $targetData['team'],
                'message' => CombatEngine::colorNameStatic($targetData) . " est K.O !"
            ];
        }

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

// ============================================================
// EASTER EGG : ULTRA INSTINCT (GOKU)
// ============================================================

class UltraInstinctAction implements ActionInterface
{
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(int $cooldownTurns = 1, string $abilityName = 'Hakai')
    {
        $this->cooldownTurns = $cooldownTurns;
        $this->abilityName = $abilityName;
    }

    public function execute(Character $user, array &$teamAllies, array &$teamEnemies, array &$logs, array &$userData): void
    {
        if (($userData['cooldowns']['ability'] ?? 0) > 0) {
            $action = new AttackAction();
            $action->execute($user, $teamAllies, $teamEnemies, $logs, $userData);
            return;
        }

        $targetIndex = CombatEngine::getRandomAliveIndex($teamEnemies);
        if ($targetIndex === null) return;

        $targetData =& $teamEnemies[$targetIndex];
        $target = $targetData['char'];

        $damage = $target->getHP();
        $target->setHP(0);

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'ultra_instinct',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'target' => $target->getName(),
            'targetTeam' => $targetData['team'],
            'abilityName' => $this->abilityName,
            'damage' => $damage,
            'targetHP' => 0,
            'targetMaxHP' => $targetData['HP_MAX'],
            'isCrit' => true,
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> → " . CombatEngine::colorNameStatic($targetData) . " est anéanti ! $damage dégâts (INSTANT KILL)"
        ];

        if (!in_array('dead', $targetData['statuses'], true)) {
            $targetData['statuses'][] = 'dead';
            $logs[] = [
                'type' => 'death',
                'target' => $target->getName(),
                'targetTeam' => $targetData['team'],
                'message' => CombatEngine::colorNameStatic($targetData) . " est K.O !"
            ];
        }

        $userData['cooldowns']['ability'] = $this->cooldownTurns;
    }
}

// ============================================================
// MOTEUR DE COMBAT
// ============================================================

class CombatEngine
{
    public function fightBattleWithRounds(array &$team1, array &$team2, int $maxRounds = 50): array
    {
        $logs = [];

        $this->initializeTeamData($team1);
        $this->initializeTeamData($team2);

        // Announce active synergies before combat starts
        $this->announceSynergies($team1, $logs);
        $this->announceSynergies($team2, $logs);

        $round = 1;

        while ($this->teamAlive($team1) && $this->teamAlive($team2) && $round <= $maxRounds) {

            $logs[] = [
                'type' => 'round',
                'round' => $round,
                'message' => "=== Tour $round ==="
            ];

            $this->tickTeam($team1, $logs);
            $this->tickTeam($team2, $logs);

            $turnOrder = $this->rollInitiative($team1, $team2);
            $this->attackPhase($turnOrder, $team1, $team2, $logs);

            $round++;
        }

        if ($this->teamAlive($team1)) {
            $logs[] = [
                'type' => 'victory',
                'winner' => 'Equipe 1',
                'message' => "Equipe 1 gagne !"
            ];
        } elseif ($this->teamAlive($team2)) {
            $logs[] = [
                'type' => 'victory',
                'winner' => 'Equipe 2',
                'message' => "Equipe 2 gagne !"
            ];
        } else {
            $logs[] = [
                'type' => 'draw',
                'message' => "Match nul !"
            ];
        }

        return $logs;
    }

    private function initializeTeamData(array &$team): void
    {
        foreach ($team as &$data) {
            if ($data === null) continue;
            $char = $data['char'];

            $data['HP_MAX'] = $char->getHP();
            $data['cooldowns'] = $data['cooldowns'] ?? [];
            $data['statuses'] = $data['statuses'] ?? [];
            $data['dots'] = $data['dots'] ?? [];
            $data['stunned'] = false;
            $data['tempBuffs'] = ['damage' => 0, 'speed' => 0, 'dodge' => 0, 'crit' => 0, 'turnsLeft' => 0];

            $actions = [];
            $roleName = $char->getRole()?->getName();

            // Actions de rôle (existantes)
            switch ($roleName) {
                case 'DPS':
                    $actions[] = new AttackAction();
                    break;
                case 'Tank':
                    $actions[] = new AttackAction();
                    $actions[] = new DefendAllyAction();
                    break;
                case 'Soigneur':
                    $actions[] = new AttackAction();
                    $actions[] = new HealAction(20);
                    break;
                case 'Support':
                    $actions[] = new AttackAction();
                    $actions[] = new HealAction(15);
                    break;
                case 'Buffer':
                    $actions[] = new AttackAction();
                    $actions[] = new DefendAllyAction();
                    break;
                case 'Legend':
                    $actions[] = new AttackAction();
                    $actions[] = new HealAction(999);
                    $actions[] = new DefendAllyAction();
                    break;
                default:
                    $actions[] = new AttackAction();
                    break;
            }

            // Compétence signature (depuis l'entité Ability)
            $ability = $char->getAbility();
            if ($ability) {
                $signatureAction = $this->createSignatureAction($ability);
                if ($signatureAction) {
                    $actions[] = $signatureAction;
                }
            }

            $data['actions'] = $actions;
            $data['synergyFlags'] = [];
        }
        unset($data);

        // Detect active synergies for this team
        $this->detectTeamSynergies($team);
    }

    private function createSignatureAction(\App\Entity\Ability $ability): ?ActionInterface
    {
        $params = $ability->getParameters();
        $cd = $ability->getCooldown();
        $name = $ability->getName();

        switch ($ability->getType()) {
            case 'bleed_attack':
                return new BleedAttackAction(
                    $params['bleedDamage'] ?? 3,
                    $params['bleedTurns'] ?? 3,
                    $cd,
                    $name
                );
            case 'blight_attack':
                return new BlightAttackAction(
                    $params['blightDamage'] ?? 4,
                    $params['blightTurns'] ?? 3,
                    $cd,
                    $name
                );
            case 'stun':
                return new StunAction($cd, $name);
            case 'mark':
                return new MarkAction(
                    $params['markTurns'] ?? 3,
                    $params['bonusDamage'] ?? 30,
                    $cd,
                    $name,
                    $params['removeOnHit'] ?? false
                );
            case 'riposte':
                return new RiposteAction(
                    $params['riposteTurns'] ?? 2,
                    $params['dmgMultiplier'] ?? 50,
                    $cd,
                    $name
                );
            case 'self_buff':
                return new SelfBuffAction(
                    $params['buffs'] ?? [],
                    $params['duration'] ?? 2,
                    $cd,
                    $name,
                    $params['allyDamage'] ?? 0,
                    $params['hpThreshold'] ?? 1.0
                );
            case 'party_heal':
                return new PartyHealAction(
                    $params['healAmount'] ?? 5,
                    $cd,
                    $name
                );
            case 'party_buff':
                return new PartyBuffAction(
                    $params['buffs'] ?? [],
                    $params['duration'] ?? 2,
                    $cd,
                    $name
                );
            case 'stealth':
                return new StealthAction(
                    $params['stealthTurns'] ?? 1,
                    $params['dmgBonus'] ?? 50,
                    $cd,
                    $name
                );
            case 'armor_pierce':
                return new ArmorPierceAction($cd, $name);
            case 'emergency_heal':
                return new EmergencyHealAction(
                    $params['hpThreshold'] ?? 0.4,
                    $params['healPercent'] ?? 0.5,
                    $params['selfBleed'] ?? 3,
                    $cd,
                    $name
                );
            case 'backline_strike':
                return new BacklineStrikeAction(
                    $params['dmgMultiplier'] ?? 1.2,
                    $cd,
                    $name
                );
            case 'protect_dodge':
                return new ProtectDodgeAction(
                    $params['dodgeBonus'] ?? 15,
                    $params['protectTurns'] ?? 2,
                    $cd,
                    $name,
                    $params['dmgBonus'] ?? 0
                );
            case 'bonus_vs_marked':
                return new BonusVsMarkedAction(
                    $params['markedBonus'] ?? 50,
                    $cd,
                    $name
                );
            case 'ultra_instinct':
                return new UltraInstinctAction($cd, $name);
            default:
                return null;
        }
    }

    private function tickTeam(array &$team, array &$logs): void
    {
        foreach ($team as &$data) {
            if ($data === null) continue;
            if ($data['char']->getHP() <= 0) continue;

            // Tick des cooldowns
            foreach ($data['cooldowns'] as $key => $cd) {
                if ($cd > 0) {
                    $data['cooldowns'][$key]--;
                }
            }

            // Tick de la protection
            if (isset($data['protectTurns'])) {
                $data['protectTurns']--;
                if ($data['protectTurns'] <= 0) {
                    unset($data['protectTurns']);
                    unset($data['protectedBy']);
                    $data['statuses'] = array_values(array_filter(
                        $data['statuses'],
                        fn($s) => $s !== 'protected'
                    ));
                }
            }

            // Tick du saignement (DoT)
            if (isset($data['dots']['bleed']) && $data['dots']['bleed']['turnsLeft'] > 0) {
                $bleedDmg = $data['dots']['bleed']['damage'];
                $char = $data['char'];
                $newHP = max(0, $char->getHP() - $bleedDmg);
                $char->setHP($newHP);

                $logs[] = [
                    'type' => 'bleed_tick',
                    'target' => $char->getName(),
                    'targetTeam' => $data['team'],
                    'damage' => $bleedDmg,
                    'targetHP' => $newHP,
                    'targetMaxHP' => $data['HP_MAX'],
                    'turnsRemaining' => $data['dots']['bleed']['turnsLeft'] - 1,
                    'message' => CombatEngine::colorNameStatic($data) . " saigne ! (-$bleedDmg PV, HP: $newHP)"
                ];

                $data['dots']['bleed']['turnsLeft']--;
                if ($data['dots']['bleed']['turnsLeft'] <= 0) {
                    unset($data['dots']['bleed']);
                    $data['statuses'] = array_values(array_filter($data['statuses'], fn($s) => $s !== 'bleeding'));
                }

                if ($newHP === 0 && !in_array('dead', $data['statuses'], true)) {
                    $data['statuses'][] = 'dead';
                    $logs[] = [
                        'type' => 'death',
                        'target' => $char->getName(),
                        'targetTeam' => $data['team'],
                        'message' => CombatEngine::colorNameStatic($data) . " succombe au saignement !"
                    ];
                }
            }

            // Tick de la peste (DoT)
            if (isset($data['dots']['blight']) && $data['dots']['blight']['turnsLeft'] > 0) {
                $blightDmg = $data['dots']['blight']['damage'];
                $char = $data['char'];
                $newHP = max(0, $char->getHP() - $blightDmg);
                $char->setHP($newHP);

                $logs[] = [
                    'type' => 'blight_tick',
                    'target' => $char->getName(),
                    'targetTeam' => $data['team'],
                    'damage' => $blightDmg,
                    'targetHP' => $newHP,
                    'targetMaxHP' => $data['HP_MAX'],
                    'turnsRemaining' => $data['dots']['blight']['turnsLeft'] - 1,
                    'message' => CombatEngine::colorNameStatic($data) . " souffre de la peste ! (-$blightDmg PV, HP: $newHP)"
                ];

                $data['dots']['blight']['turnsLeft']--;
                if ($data['dots']['blight']['turnsLeft'] <= 0) {
                    unset($data['dots']['blight']);
                    $data['statuses'] = array_values(array_filter($data['statuses'], fn($s) => $s !== 'blighted'));
                }

                if ($newHP === 0 && !in_array('dead', $data['statuses'], true)) {
                    $data['statuses'][] = 'dead';
                    $logs[] = [
                        'type' => 'death',
                        'target' => $char->getName(),
                        'targetTeam' => $data['team'],
                        'message' => CombatEngine::colorNameStatic($data) . " succombe à la peste !"
                    ];
                }
            }

            // Tick de la marque (pas de decrement si removeOnHit)
            if (isset($data['marked']) && !($data['marked']['removeOnHit'] ?? false)) {
                $data['marked']['turnsLeft']--;
                if ($data['marked']['turnsLeft'] <= 0) {
                    unset($data['marked']);
                    $data['statuses'] = array_values(array_filter($data['statuses'], fn($s) => $s !== 'marked'));
                }
            }

            // Tick de la riposte
            if (isset($data['riposte'])) {
                $data['riposte']['turnsLeft']--;
                if ($data['riposte']['turnsLeft'] <= 0) {
                    unset($data['riposte']);
                }
            }

            // Tick de la furtivité
            if (isset($data['stealth'])) {
                $data['stealth']['turnsLeft']--;
                if ($data['stealth']['turnsLeft'] <= 0) {
                    unset($data['stealth']);
                    $data['statuses'] = array_values(array_filter($data['statuses'], fn($s) => $s !== 'stealthed'));
                }
            }

            // Tick des buffs temporaires (ne pas décrementer les buffs permanents >= 999)
            if (isset($data['tempBuffs']) && $data['tempBuffs']['turnsLeft'] > 0 && $data['tempBuffs']['turnsLeft'] < 999) {
                $data['tempBuffs']['turnsLeft']--;
                if ($data['tempBuffs']['turnsLeft'] <= 0) {
                    $data['tempBuffs'] = ['damage' => 0, 'speed' => 0, 'dodge' => 0, 'crit' => 0, 'turnsLeft' => 0];
                }
            }
        }
        unset($data);
    }

    private function attackPhase(array $turnOrder, array &$team1, array &$team2, array &$logs): void
    {
        // turnOrder contient des copies (array_merge), on retrouve les originaux
        // dans team1/team2 via l'identité de l'objet Character pour que les
        // modifications (cooldowns, buffs, statuts) persistent entre les tours.
        foreach ($turnOrder as $actorInfo) {
            $char = $actorInfo['char'];
            if ($char->getHP() <= 0)
                continue;

            // Casser les liens de référence de l'itération précédente
            unset($actorData, $teamAllies, $teamEnemies);
            $actorData = null;
            $teamAllies = null;
            $teamEnemies = null;

            foreach ($team1 as $i => &$d) {
                if ($d === null) continue;
                if ($d['char'] === $char) {
                    $actorData =& $team1[$i];
                    $teamAllies =& $team1;
                    $teamEnemies =& $team2;
                    break;
                }
            }
            unset($d);

            if ($actorData === null) {
                foreach ($team2 as $i => &$d) {
                    if ($d === null) continue;
                    if ($d['char'] === $char) {
                        $actorData =& $team2[$i];
                        $teamAllies =& $team2;
                        $teamEnemies =& $team1;
                        break;
                    }
                }
                unset($d);
            }

            if ($actorData === null) continue;

            // Vérifier l'étourdissement
            if ($actorData['stunned'] === true) {
                $actorData['stunned'] = false;
                $actorData['statuses'] = array_values(array_filter($actorData['statuses'], fn($s) => $s !== 'stunned'));
                $logs[] = [
                    'type' => 'stunned_skip',
                    'target' => $char->getName(),
                    'targetTeam' => $actorData['team'],
                    'message' => CombatEngine::colorNameStatic($actorData) . " est étourdi et passe son tour !"
                ];
                continue;
            }

            $actions = $actorData['actions'] ?? [];
            if (empty($actions))
                continue;

            $action = $this->chooseAction($actions, $actorData, $teamAllies, $teamEnemies);
            $action->execute($char, $teamAllies, $teamEnemies, $logs, $actorData);

            // Check and apply synergies after each action
            $this->checkAndApplySynergies($char, $actorData, $teamAllies, $teamEnemies, $logs);
        }
    }

    /**
     * Choisit l'action a effectuer avec priorite aux competences pretes.
     * Signature prete → 70% de chance, Role ability prete → 60%, sinon Attack.
     */
    private function chooseAction(array $actions, array $actorData, array &$teamAllies, array &$teamEnemies): ActionInterface
    {
        $attackAction = null;
        $roleAction = null;
        $signatureAction = null;

        foreach ($actions as $action) {
            if ($action instanceof AttackAction) {
                $attackAction = $action;
            } elseif ($action instanceof HealAction || $action instanceof DefendAllyAction) {
                $roleAction = $action;
            } else {
                // Toute autre action = signature
                $signatureAction = $action;
            }
        }

        // Legend (Goku): always use signature when ready
        $roleName = $actorData['char']->getRole()?->getName();
        if ($roleName === 'Legend' && $signatureAction !== null && ($actorData['cooldowns']['ability'] ?? 0) <= 0) {
            return $signatureAction;
        }

        // Priorite 1 : Signature ability si prete (70% de chance)
        if ($signatureAction !== null && ($actorData['cooldowns']['ability'] ?? 0) <= 0) {
            if (rand(1, 100) <= 70) {
                return $signatureAction;
            }
        }

        // Priorite 2 : Role ability (heal/defend) si prete
        if ($roleAction !== null) {
            $roleReady = false;

            if ($roleAction instanceof HealAction) {
                // Heal pret + au moins un allie blesse
                if (($actorData['cooldowns']['heal'] ?? 0) <= 0) {
                    foreach ($teamAllies as $allyData) {
                        if ($allyData === null) continue;
                        if ($allyData['char']->getHP() > 0 && $allyData['char']->getHP() < $allyData['HP_MAX']) {
                            $roleReady = true;
                            break;
                        }
                    }
                }
            } elseif ($roleAction instanceof DefendAllyAction) {
                if (($actorData['cooldowns']['defend'] ?? 0) <= 0) {
                    $roleReady = true;
                }
            }

            if ($roleReady && rand(1, 100) <= 60) {
                return $roleAction;
            }
        }

        // Fallback : Attack
        return $attackAction ?? $actions[array_rand($actions)];
    }

    private function rollInitiative(array &$team1, array &$team2): array
    {
        $all = array_filter(array_merge($team1, $team2), fn($d) => $d !== null);
        $all = array_values($all);

        foreach ($all as &$data) {
            $char = $data['char'];
            $roll = rand(1, 20);
            $speedBonus = $data['tempBuffs']['speed'] ?? 0;

            $data['initiative'] = $roll + $char->getSPEED() + $speedBonus + ($char->getSPEED() / 100) + (rand(0, 99) / 1000);

            if (!isset($data['HP_MAX']))
                $data['HP_MAX'] = $char->getHP();
            if (!isset($data['cooldowns']))
                $data['cooldowns'] = [];
            if (!isset($data['statuses']))
                $data['statuses'] = [];
        }
        unset($data);

        usort($all, fn($a, $b) => $b['initiative'] <=> $a['initiative']);

        return $all;
    }

    /**
     * @param bool $respectStealth Si true, ignore les ennemis en furtivité
     */
    public static function getRandomAliveIndex(array $team, bool $respectStealth = true): ?int
    {
        $alive = [];

        foreach ($team as $i => $data) {
            if ($data === null) continue;
            if ($data['char']->getHP() > 0) {
                if ($respectStealth && in_array('stealthed', $data['statuses'] ?? [], true)) {
                    continue;
                }
                $alive[] = $i;
            }
        }

        // Fallback : si tous sont en stealth, cibler quand même
        if (empty($alive)) {
            foreach ($team as $i => $data) {
                if ($data === null) continue;
                if ($data['char']->getHP() > 0) {
                    $alive[] = $i;
                }
            }
        }

        return empty($alive) ? null : $alive[array_rand($alive)];
    }

    private function teamAlive(array $team): bool
    {
        foreach ($team as $data) {
            if ($data === null) continue;
            if ($data['char']->getHP() > 0)
                return true;
        }
        return false;
    }

    public static function colorNameStatic(array $data): string
    {
        $name = $data['char']->getName();

        if (($data['team'] ?? '') === 'Equipe 1') {
            return "<span style='color:#4da6ff;'>$name</span>";
        }

        return "<span style='color:#ff4d4d;'>$name</span>";
    }

    // ============================================================
    // SYSTEME DE SYNERGIES
    // ============================================================

    /**
     * Detect active synergies for a team and store them in team data
     */
    private function detectTeamSynergies(array &$team): void
    {
        $names = array_map(fn($d) => $d['char']->getName(), array_filter($team, fn($d) => $d !== null));
        $registry = SynergyConfig::getSynergyRegistry();

        $activeSynergies = [];
        foreach ($registry as $synergy) {
            if (in_array($synergy['triggerChar'], $names, true)
                && in_array($synergy['partnerChar'], $names, true)) {
                $activeSynergies[] = $synergy;
            }
        }

        foreach ($team as &$data) {
            if ($data === null) continue;
            $data['activeSynergies'] = $activeSynergies;
        }
        unset($data);
    }

    /**
     * Emit synergy_announce logs before round 1
     */
    private function announceSynergies(array $team, array &$logs): void
    {
        if (empty($team) || $team[0] === null) return;
        $activeSynergies = $team[0]['activeSynergies'] ?? [];
        if (empty($activeSynergies)) return;

        $teamName = $team[0]['team'] ?? 'Equipe';

        foreach ($activeSynergies as $synergy) {
            $logs[] = [
                'type' => 'synergy_announce',
                'synergyId' => $synergy['id'],
                'synergyName' => $synergy['name'],
                'triggerChar' => $synergy['triggerChar'],
                'partnerChar' => $synergy['partnerChar'],
                'team' => $teamName,
                'message' => "<span class='synergy-name'>{$synergy['name']}</span> : {$synergy['triggerChar']} + {$synergy['partnerChar']}"
            ];
        }
    }

    /**
     * After each action, check if the actor triggered any synergy
     */
    private function checkAndApplySynergies(
        Character $actor,
        array &$actorData,
        array &$teamAllies,
        array &$teamEnemies,
        array &$logs
    ): void {
        $actorName = $actor->getName();
        $activeSynergies = $actorData['activeSynergies'] ?? [];
        if (empty($activeSynergies)) return;

        $lastActionLog = $this->findLastActionLog($logs);
        if (!$lastActionLog) return;

        foreach ($activeSynergies as $synergy) {
            if ($synergy['triggerChar'] !== $actorName) continue;

            if (!$this->matchesTriggerCondition($lastActionLog, $synergy['triggerCondition'])) continue;

            // Find the partner alive in allies
            $partnerData = null;
            foreach ($teamAllies as $idx => &$allyData) {
                if ($allyData === null) continue;
                if ($allyData['char']->getName() === $synergy['partnerChar']
                    && $allyData['char']->getHP() > 0) {
                    $partnerData =& $teamAllies[$idx];
                    break;
                }
            }
            unset($allyData);

            if ($partnerData === null) continue;

            $this->executeSynergyEffect(
                $synergy, $actorData, $partnerData,
                $teamAllies, $teamEnemies, $logs, $lastActionLog
            );
        }
    }

    /**
     * Find the last action log (skip death/protect/synergy logs)
     */
    private function findLastActionLog(array $logs): ?array
    {
        $actionTypes = ['attack', 'heal', 'defend', 'ability_use'];
        for ($i = count($logs) - 1; $i >= 0; $i--) {
            if (in_array($logs[$i]['type'], $actionTypes, true)) {
                return $logs[$i];
            }
            if (in_array($logs[$i]['type'], ['round', 'synergy_trigger', 'synergy_announce'], true)) {
                break;
            }
        }
        return null;
    }

    /**
     * Check if a log matches a synergy trigger condition
     */
    private function matchesTriggerCondition(array $log, string $condition): bool
    {
        // For ability_use logs, match on subtype
        if ($log['type'] === 'ability_use' && isset($log['subtype'])) {
            return $log['subtype'] === $condition;
        }
        // For defend action (DefendAllyAction), match on type
        if ($condition === 'defend' && $log['type'] === 'defend') {
            return true;
        }
        return $log['type'] === $condition;
    }

    /**
     * Execute the synergy effect and emit logs
     */
    private function executeSynergyEffect(
        array $synergy,
        array &$actorData,
        array &$partnerData,
        array &$teamAllies,
        array &$teamEnemies,
        array &$logs,
        array $triggerLog
    ): void {
        $effect = $synergy['effect'];
        $partner = $partnerData['char'];

        $synergyLog = [
            'type' => 'synergy_trigger',
            'synergyId' => $synergy['id'],
            'synergyName' => $synergy['name'],
            'synergyType' => $synergy['type'],
            'effectType' => $effect['action'],
            'triggerChar' => $actorData['char']->getName(),
            'triggerCharTeam' => $actorData['team'],
            'partnerChar' => $partner->getName(),
            'partnerCharTeam' => $partnerData['team'],
            'message' => '',
        ];

        switch ($effect['action']) {
            case 'bonus_attack':
                // Partner fires a bonus attack at the trigger target
                $targetName = $triggerLog['target'] ?? null;
                $targetData = null;
                if ($targetName) {
                    foreach ($teamEnemies as $idx => &$edata) {
                        if ($edata === null) continue;
                        if ($edata['char']->getName() === $targetName && $edata['char']->getHP() > 0) {
                            $targetData =& $teamEnemies[$idx];
                            break;
                        }
                    }
                    unset($edata);
                }

                if (!$targetData) {
                    $idx = self::getRandomAliveIndex($teamEnemies, true);
                    if ($idx === null) return;
                    $targetData =& $teamEnemies[$idx];
                }

                $damage = rand($partner->getDMGMIN(), $partner->getDMGMAX());
                $damage = (int)($damage * $effect['dmgMultiplier']);
                $newHP = max(0, $targetData['char']->getHP() - $damage);
                $targetData['char']->setHP($newHP);

                $synergyLog['damage'] = $damage;
                $synergyLog['target'] = $targetData['char']->getName();
                $synergyLog['targetTeam'] = $targetData['team'];
                $synergyLog['targetHP'] = $newHP;
                $synergyLog['targetMaxHP'] = $targetData['HP_MAX'];
                $synergyLog['message'] = "<span class='synergy-name'>{$synergy['name']}</span> ! "
                    . self::colorNameStatic($partnerData) . " attaque "
                    . self::colorNameStatic($targetData) . " → $damage dégâts (HP: $newHP)";

                $logs[] = $synergyLog;

                if ($newHP === 0 && !in_array('dead', $targetData['statuses'], true)) {
                    $targetData['statuses'][] = 'dead';
                    $logs[] = [
                        'type' => 'death',
                        'target' => $targetData['char']->getName(),
                        'targetTeam' => $targetData['team'],
                        'message' => self::colorNameStatic($targetData) . " est K.O !"
                    ];
                }
                break;

            case 'grant_riposte':
                $partnerData['riposte'] = [
                    'turnsLeft' => $effect['riposteTurns'],
                    'dmgMultiplier' => $effect['dmgMultiplier'],
                ];
                $synergyLog['grantedTurns'] = $effect['riposteTurns'];
                $synergyLog['message'] = "<span class='synergy-name'>{$synergy['name']}</span> ! "
                    . self::colorNameStatic($partnerData) . " gagne Riposte ({$effect['riposteTurns']} tour)";
                $logs[] = $synergyLog;
                break;

            case 'temp_buff':
                foreach ($effect['buffs'] as $stat => $value) {
                    $partnerData['tempBuffs'][$stat] = ($partnerData['tempBuffs'][$stat] ?? 0) + $value;
                }
                $partnerData['tempBuffs']['turnsLeft'] = max(
                    $partnerData['tempBuffs']['turnsLeft'] ?? 0,
                    $effect['duration']
                );

                $buffDesc = [];
                foreach ($effect['buffs'] as $stat => $val) {
                    $buffDesc[] = "+{$val}% {$stat}";
                }
                $synergyLog['buffTypes'] = array_keys($effect['buffs']);
                $synergyLog['buffDuration'] = $effect['duration'];
                $synergyLog['message'] = "<span class='synergy-name'>{$synergy['name']}</span> ! "
                    . self::colorNameStatic($partnerData) . " gagne "
                    . implode(', ', $buffDesc) . " ({$effect['duration']} tours)";
                $logs[] = $synergyLog;
                break;

            case 'apply_mark':
                $targetName = $triggerLog['target'] ?? null;
                if (!$targetName) return;

                foreach ($teamEnemies as $idx => &$edata) {
                    if ($edata === null) continue;
                    if ($edata['char']->getName() === $targetName && $edata['char']->getHP() > 0) {
                        $edata['marked'] = [
                            'turnsLeft' => $effect['markTurns'],
                            'bonusDamage' => $effect['bonusDamage'],
                            'removeOnHit' => false,
                        ];
                        if (!in_array('marked', $edata['statuses'], true)) {
                            $edata['statuses'][] = 'marked';
                        }
                        $synergyLog['target'] = $targetName;
                        $synergyLog['targetTeam'] = $edata['team'];
                        $synergyLog['markTurns'] = $effect['markTurns'];
                        $synergyLog['message'] = "<span class='synergy-name'>{$synergy['name']}</span> ! "
                            . self::colorNameStatic($edata) . " est aussi marqué !";
                        break;
                    }
                }
                unset($edata);
                $logs[] = $synergyLog;
                break;

            case 'grant_dodge':
                $partnerData['tempBuffs']['dodge'] = ($partnerData['tempBuffs']['dodge'] ?? 0) + ($effect['dodgeBonus'] ?? 0);
                $partnerData['tempBuffs']['turnsLeft'] = max(
                    $partnerData['tempBuffs']['turnsLeft'] ?? 0,
                    $effect['duration'] ?? 2
                );
                $synergyLog['dodgeDuration'] = $effect['duration'] ?? 2;
                $synergyLog['message'] = "<span class='synergy-name'>{$synergy['name']}</span> ! "
                    . self::colorNameStatic($partnerData) . " gagne +{$effect['dodgeBonus']} esquive";
                $logs[] = $synergyLog;
                break;

            case 'extend_stealth':
                if (isset($partnerData['stealth'])) {
                    $partnerData['stealth']['turnsLeft'] += ($effect['extraTurns'] ?? 1);
                    $synergyLog['message'] = "<span class='synergy-name'>{$synergy['name']}</span> ! "
                        . self::colorNameStatic($partnerData) . " reste furtif (+{$effect['extraTurns']} tour)";
                    $logs[] = $synergyLog;
                }
                break;

            case 'guaranteed_crit':
                $partnerData['tempBuffs']['crit'] = ($partnerData['tempBuffs']['crit'] ?? 0) + 100;
                $partnerData['tempBuffs']['turnsLeft'] = max($partnerData['tempBuffs']['turnsLeft'] ?? 0, 1);
                $synergyLog['message'] = "<span class='synergy-name'>{$synergy['name']}</span> ! "
                    . self::colorNameStatic($partnerData) . " : critique garanti au prochain coup !";
                $logs[] = $synergyLog;
                break;

            case 'bonus_damage_if_bleeding':
                // Sang & Acier: check if the armor_pierce target was bleeding
                $targetName = $triggerLog['target'] ?? null;
                if (!$targetName) return;

                foreach ($teamEnemies as $idx => &$edata) {
                    if ($edata === null) continue;
                    if ($edata['char']->getName() === $targetName && $edata['char']->getHP() > 0) {
                        if (in_array('bleeding', $edata['statuses'] ?? [], true)) {
                            $bonusDmg = (int)(($triggerLog['damage'] ?? 0) * $effect['bonusMultiplier']);
                            $newHP = max(0, $edata['char']->getHP() - $bonusDmg);
                            $edata['char']->setHP($newHP);

                            $synergyLog['damage'] = $bonusDmg;
                            $synergyLog['target'] = $targetName;
                            $synergyLog['targetTeam'] = $edata['team'];
                            $synergyLog['targetHP'] = $newHP;
                            $synergyLog['targetMaxHP'] = $edata['HP_MAX'];
                            $synergyLog['message'] = "<span class='synergy-name'>{$synergy['name']}</span> ! "
                                . "La lance s'enfonce dans les plaies ! +$bonusDmg dégâts à "
                                . self::colorNameStatic($edata) . " (HP: $newHP)";
                            $logs[] = $synergyLog;

                            if ($newHP === 0 && !in_array('dead', $edata['statuses'], true)) {
                                $edata['statuses'][] = 'dead';
                                $logs[] = [
                                    'type' => 'death',
                                    'target' => $edata['char']->getName(),
                                    'targetTeam' => $edata['team'],
                                    'message' => self::colorNameStatic($edata) . " est K.O !"
                                ];
                            }
                        }
                        break;
                    }
                }
                unset($edata);
                break;
        }
    }
}
