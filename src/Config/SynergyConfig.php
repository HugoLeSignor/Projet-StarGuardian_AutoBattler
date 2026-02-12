<?php

namespace App\Config;

class SynergyConfig
{
    /**
     * Returns all synergy definitions.
     * Each synergy has: triggerChar, partnerChar, triggerCondition, type, effect, name, description
     */
    public static function getSynergyRegistry(): array
    {
        return [
            // === REACTIVE SYNERGIES (immediate bonus action) ===
            'tir_marque' => [
                'id' => 'tir_marque',
                'name' => 'Tir Marqué',
                'triggerChar' => 'Occultist',
                'partnerChar' => 'Musketeer',
                'triggerCondition' => 'mark',
                'type' => 'reactive',
                'description' => 'Marque → tir bonus',
                'effect' => [
                    'action' => 'bonus_attack',
                    'dmgMultiplier' => 0.70,
                    'targetFromLog' => true,
                ],
            ],
            'chasse_homme' => [
                'id' => 'chasse_homme',
                'name' => "Chasse à l'Homme",
                'triggerChar' => 'Bounty-Hunter',
                'partnerChar' => 'Houndmaster',
                'triggerCondition' => 'stun',
                'type' => 'reactive',
                'description' => 'Stun → attaque bonus',
                'effect' => [
                    'action' => 'bonus_attack',
                    'dmgMultiplier' => 0.80,
                    'targetFromLog' => true,
                ],
            ],
            'duo_combat' => [
                'id' => 'duo_combat',
                'name' => 'Duo de Combat',
                'triggerChar' => 'Man-At-Arms',
                'partnerChar' => 'Highwayman',
                'triggerCondition' => 'riposte_buff',
                'type' => 'buff',
                'description' => 'Riposte → riposte partagée',
                'effect' => [
                    'action' => 'grant_riposte',
                    'riposteTurns' => 1,
                    'dmgMultiplier' => 40,
                ],
            ],

            // === BUFF SYNERGIES (temporary buff on partner) ===
            'lumiere_sacree' => [
                'id' => 'lumiere_sacree',
                'name' => 'Lumière Sacrée',
                'triggerChar' => 'Vestal',
                'partnerChar' => 'Crusader',
                'triggerCondition' => 'party_heal',
                'type' => 'buff',
                'description' => 'Soin groupe → +25% dégâts',
                'effect' => [
                    'action' => 'temp_buff',
                    'buffs' => ['damage' => 25],
                    'duration' => 2,
                ],
            ],
            'ballade_lepreux' => [
                'id' => 'ballade_lepreux',
                'name' => 'Ballade du Lépreux',
                'triggerChar' => 'Jester',
                'partnerChar' => 'Leper',
                'triggerCondition' => 'party_buff',
                'type' => 'buff',
                'description' => 'Buff → esquive restaurée + 10% dégâts',
                'effect' => [
                    'action' => 'temp_buff',
                    'buffs' => ['damage' => 10, 'dodge' => 10],
                    'duration' => 2,
                ],
            ],
            'cible_illuminee' => [
                'id' => 'cible_illuminee',
                'name' => 'Cible Illuminée',
                'triggerChar' => 'Jester',
                'partnerChar' => 'Musketeer',
                'triggerCondition' => 'party_buff',
                'type' => 'buff',
                'description' => 'Buff → +15% crit',
                'effect' => [
                    'action' => 'temp_buff',
                    'buffs' => ['crit' => 15],
                    'duration' => 3,
                ],
            ],
            'fleau_fer' => [
                'id' => 'fleau_fer',
                'name' => 'Fléau de Fer',
                'triggerChar' => 'Plague Doctor',
                'partnerChar' => 'Hellion',
                'triggerCondition' => 'blight_attack',
                'type' => 'buff',
                'description' => 'Peste → +30% dégâts sur empoisonnés',
                'effect' => [
                    'action' => 'temp_buff',
                    'buffs' => ['damage' => 30],
                    'duration' => 2,
                ],
            ],
            'les_damnes' => [
                'id' => 'les_damnes',
                'name' => 'Les Damnés',
                'triggerChar' => 'Flagellant',
                'partnerChar' => 'Leper',
                'triggerCondition' => 'emergency_heal',
                'type' => 'buff',
                'description' => 'Soin urgence → +20% dégâts',
                'effect' => [
                    'action' => 'temp_buff',
                    'buffs' => ['damage' => 20],
                    'duration' => 2,
                ],
            ],
            'resolution_sacree' => [
                'id' => 'resolution_sacree',
                'name' => 'Résolution Sacrée',
                'triggerChar' => 'Abomination',
                'partnerChar' => 'Crusader',
                'triggerCondition' => 'self_buff',
                'type' => 'buff',
                'description' => 'Transformation → +20% dégâts',
                'effect' => [
                    'action' => 'temp_buff',
                    'buffs' => ['damage' => 20],
                    'duration' => 2,
                ],
            ],
            'formation_combat' => [
                'id' => 'formation_combat',
                'name' => 'Formation de Combat',
                'triggerChar' => 'Man-At-Arms',
                'partnerChar' => 'Shieldbreaker',
                'triggerCondition' => 'defend',
                'type' => 'buff',
                'description' => 'Protection → +30% dégâts',
                'effect' => [
                    'action' => 'temp_buff',
                    'buffs' => ['damage' => 30],
                    'duration' => 1,
                ],
            ],
            'benediction_guerriere' => [
                'id' => 'benediction_guerriere',
                'name' => 'Bénédiction Guerrière',
                'triggerChar' => 'Vestal',
                'partnerChar' => 'Hellion',
                'triggerCondition' => 'party_heal',
                'type' => 'buff',
                'description' => 'Soin → crit garanti',
                'effect' => [
                    'action' => 'guaranteed_crit',
                ],
            ],
            'vapeurs_protectrices' => [
                'id' => 'vapeurs_protectrices',
                'name' => 'Vapeurs Protectrices',
                'triggerChar' => 'Antiquarian',
                'partnerChar' => 'Highwayman',
                'triggerCondition' => 'party_buff',
                'type' => 'buff',
                'description' => 'Buff esquive → +10 esquive extra',
                'effect' => [
                    'action' => 'grant_dodge',
                    'dodgeBonus' => 10,
                    'duration' => 2,
                ],
            ],

            // === CONDITIONAL / OTHER SYNERGIES ===
            'prime_maudite' => [
                'id' => 'prime_maudite',
                'name' => 'Prime Maudite',
                'triggerChar' => 'Bounty-Hunter',
                'partnerChar' => 'Occultist',
                'triggerCondition' => 'stun',
                'type' => 'conditional',
                'description' => 'Stun → cible aussi marquée',
                'effect' => [
                    'action' => 'apply_mark',
                    'markTurns' => 2,
                    'bonusDamage' => 20,
                    'targetFromLog' => true,
                ],
            ],
            'sang_acier' => [
                'id' => 'sang_acier',
                'name' => 'Sang & Acier',
                'triggerChar' => 'Shieldbreaker',
                'partnerChar' => 'Flagellant',
                'triggerCondition' => 'armor_pierce',
                'type' => 'conditional',
                'description' => 'Pierce sur cible saignante → +40%',
                'effect' => [
                    'action' => 'bonus_damage_if_bleeding',
                    'bonusMultiplier' => 0.40,
                ],
            ],
            'chasseuses_tresors' => [
                'id' => 'chasseuses_tresors',
                'name' => 'Chasseuses de Trésors',
                'triggerChar' => 'Grave-Robber',
                'partnerChar' => 'Antiquarian',
                'triggerCondition' => 'stealth',
                'type' => 'buff',
                'description' => 'Stealth → +20 esquive',
                'effect' => [
                    'action' => 'grant_dodge',
                    'dodgeBonus' => 20,
                    'duration' => 1,
                ],
            ],
            'pistage' => [
                'id' => 'pistage',
                'name' => 'Pistage',
                'triggerChar' => 'Houndmaster',
                'partnerChar' => 'Grave-Robber',
                'triggerCondition' => 'protect_dodge',
                'type' => 'buff',
                'description' => 'Protection → +1 tour stealth',
                'effect' => [
                    'action' => 'extend_stealth',
                    'extraTurns' => 1,
                ],
            ],
        ];
    }

    /**
     * Returns a simplified map for the frontend: characterName => [partner info]
     */
    public static function getSynergyMap(): array
    {
        $registry = self::getSynergyRegistry();
        $map = [];

        foreach ($registry as $synergy) {
            $map[$synergy['triggerChar']][] = [
                'partner' => $synergy['partnerChar'],
                'name' => $synergy['name'],
                'desc' => $synergy['description'],
            ];
            $map[$synergy['partnerChar']][] = [
                'partner' => $synergy['triggerChar'],
                'name' => $synergy['name'],
                'desc' => $synergy['description'],
            ];
        }

        // Deduplicate (same pair may appear twice from different synergies)
        foreach ($map as $charName => &$synergies) {
            $seen = [];
            $synergies = array_values(array_filter($synergies, function ($s) use (&$seen) {
                $key = $s['partner'] . '|' . $s['name'];
                if (in_array($key, $seen, true)) return false;
                $seen[] = $key;
                return true;
            }));
        }

        return $map;
    }
}
