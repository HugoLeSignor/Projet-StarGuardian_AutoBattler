<?php

namespace App\Service;

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
 * Attaque + Peste (Blight) DoT
 * Utilisé par : Plague Doctor (Blast Nocif)
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

        $targetIndex = CombatEngine::getRandomAliveIndex($teamEnemies, true);
        if ($targetIndex === null) return;

        $targetData =& $teamEnemies[$targetIndex];
        $target = $targetData['char'];

        // Attaque réduite (70% des dégâts)
        $damage = (int)(rand($user->getDMGMIN(), $user->getDMGMAX()) * 0.7);
        $newHP = max(0, $target->getHP() - $damage);
        $target->setHP($newHP);

        // Appliquer la peste
        $targetData['dots']['blight'] = ['damage' => $this->blightDamage, 'turnsLeft' => $this->blightTurns];
        if (!in_array('blighted', $targetData['statuses'], true)) {
            $targetData['statuses'][] = 'blighted';
        }

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'blight_attack',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'target' => $target->getName(),
            'targetTeam' => $targetData['team'],
            'abilityName' => $this->abilityName,
            'damage' => $damage,
            'targetHP' => $newHP,
            'targetMaxHP' => $targetData['HP_MAX'],
            'blightDamage' => $this->blightDamage,
            'blightTurns' => $this->blightTurns,
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> sur " . CombatEngine::colorNameStatic($targetData) . " → $damage dégâts + Peste ({$this->blightDamage}/tour, {$this->blightTurns} tours)"
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
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> ! ($effectStr, $durationText)"
        ];

        // Dégâts aux alliés (Abomination : Transformation)
        if ($this->allyDamage > 0) {
            foreach ($teamAllies as &$allyData) {
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
            $ally = $allyData['char'];
            if ($ally->getHP() <= 0) continue;
            $amount = min($this->healAmount, $allyData['HP_MAX'] - $ally->getHP());
            if ($amount > 0) {
                $ally->setHP($ally->getHP() + $amount);
                $healed[] = ['name' => $ally->getName(), 'team' => $allyData['team'], 'amount' => $amount, 'hp' => $ally->getHP(), 'maxHp' => $allyData['HP_MAX']];
            }
        }

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
            if ($allyData['char']->getHP() <= 0) continue;
            $allyData['tempBuffs'] = array_merge($allyData['tempBuffs'], $this->buffs);
            $allyData['tempBuffs']['turnsLeft'] = $this->duration;
        }

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
 * Protection d'allié + bonus d'esquive
 * Utilisé par : Houndmaster (Chien de Garde)
 */
class ProtectDodgeAction implements ActionInterface
{
    private int $dodgeBonus;
    private int $protectTurns;
    private int $cooldownTurns;
    private string $abilityName;

    public function __construct(int $dodgeBonus, int $protectTurns, int $cooldownTurns, string $abilityName = 'Protection')
    {
        $this->dodgeBonus = $dodgeBonus;
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

        $logs[] = [
            'type' => 'ability_use',
            'subtype' => 'protect_dodge',
            'caster' => $user->getName(),
            'casterTeam' => $userData['team'],
            'target' => $targetData['char']->getName(),
            'targetTeam' => $targetData['team'],
            'abilityName' => $this->abilityName,
            'message' => CombatEngine::colorNameStatic($userData) . " utilise <span class='ability-name'>{$this->abilityName}</span> → Protège " . CombatEngine::colorNameStatic($targetData) . " (+{$this->dodgeBonus} esquive, {$this->protectTurns} tours)"
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
// MOTEUR DE COMBAT
// ============================================================

class CombatEngine
{
    public function fightBattleWithRounds(array &$team1, array &$team2, int $maxRounds = 50): array
    {
        $logs = [];

        $this->initializeTeamData($team1);
        $this->initializeTeamData($team2);

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
        }
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
                    $name
                );
            case 'bonus_vs_marked':
                return new BonusVsMarkedAction(
                    $params['markedBonus'] ?? 50,
                    $cd,
                    $name
                );
            default:
                return null;
        }
    }

    private function tickTeam(array &$team, array &$logs): void
    {
        foreach ($team as &$data) {
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

            // Retrouver la donnée originale dans les tableaux d'équipe
            $actorData = null;
            $teamAllies = null;
            $teamEnemies = null;

            foreach ($team1 as $i => &$d) {
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

            $action = $actions[array_rand($actions)];
            $action->execute($char, $teamAllies, $teamEnemies, $logs, $actorData);
        }
    }

    private function rollInitiative(array &$team1, array &$team2): array
    {
        $all = array_merge($team1, $team2);

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
}
