/**
 * Combat Animation Controller
 * Gère l'affichage progressif des logs de combat avec animations
 */
class CombatController {
    constructor(container) {
        this.container = container;
        this.logs = [];
        this.currentIndex = 0;
        this.isPlaying = false;
        this.isPaused = false;
        this.speed = 1;
        this.characterElements = {};
        this.characterMaxHP = {};

        this.init();
    }

    init() {
        // Récupérer les logs depuis l'attribut data
        const logsData = this.container.dataset.combatLogs;
        if (logsData) {
            try {
                this.logs = JSON.parse(logsData);
            } catch (e) {
                console.error('Erreur parsing logs:', e);
                return;
            }
        }

        // Récupérer les éléments
        this.logContainer = this.container.querySelector('[data-combat-log]');
        this.overlay = this.container.querySelector('[data-combat-overlay]');
        this.playBtn = this.container.querySelector('[data-combat-play]');
        this.skipBtn = this.container.querySelector('[data-combat-skip]');
        this.speedBtns = this.container.querySelectorAll('[data-combat-speed]');

        // Map des personnages avec stockage des HP max initiaux
        this.characterMaxHP = {};
        this.characterSlugs = {};
        this.characterHasHeal = {};
        this.abilityCooldowns = {}; // Suivi des cooldowns en cours
        this.characterStatuses = {}; // Suivi des statuts actifs par personnage
        this.container.querySelectorAll('[data-character-name]').forEach(el => {
            const name = el.dataset.characterName;
            const team = el.dataset.characterTeam;
            const key = `${team}-${name}`;
            this.characterElements[key] = el;
            this.characterSlugs[key] = el.dataset.characterSlug || '';
            this.characterHasHeal[key] = el.dataset.hasHeal === 'true';

            // Extraire le HP max depuis le texte initial
            const hpText = el.querySelector('.hp-text');
            if (hpText) {
                const match = hpText.textContent.match(/(\d+)\/(\d+)/);
                if (match) {
                    this.characterMaxHP[key] = parseInt(match[2]);
                }
            }

            // Initialiser les statuts vides
            this.characterStatuses[key] = this.createEmptyStatuses();
        });

        // Map des éléments d'ability dans les info panels
        this.abilityElements = {};
        this.container.querySelectorAll('.character-info[data-char-name]').forEach(el => {
            const name = el.dataset.charName;
            const team = el.dataset.charTeam;
            const key = `${team}-${name}`;
            const abilityEl = el.querySelector('.character-info__ability');
            if (abilityEl) {
                this.abilityElements[key] = {
                    el: abilityEl,
                    maxCd: parseInt(abilityEl.dataset.abilityMaxCd) || 0,
                    badge: abilityEl.querySelector('.character-info__ability-cd-badge'),
                    nameEl: abilityEl.querySelector('.character-info__ability-name'),
                    iconEl: abilityEl.querySelector('i'),
                };
            }
        });

        // Cacher l'overlay
        if (this.overlay) {
            this.overlay.style.display = 'none';
            this.overlay.style.opacity = '0';
        }

        // Vider le log
        if (this.logContainer) {
            this.logContainer.innerHTML = '';
        }

        // Audio
        this.audioUnlocked = false;
        this.combatMusic = null;
        this.lastTrackIndex = -1;
        this.isMuted = false;
        this.volume = 0.05;
        this.sfxVolume = 0.15;
        this.combatPlaylist = [
            '/asset/audio/combat/butchersboulevardmusic.mp3',
            '/asset/audio/combat/combatintheruins.mp3',
        ];
        this.endMusic = null;
        this.sfxCache = {};
        this.muteBtn = this.container.querySelector('[data-audio-mute]');
        this.volumeSlider = this.container.querySelector('[data-audio-volume]');
        this.sfxSlider = this.container.querySelector('[data-sfx-volume]');

        // Event listeners
        this.bindEvents();

        // Lancer automatiquement après un délai
        setTimeout(() => this.play(), 800);
    }

    // === STATUS TRACKING ===

    createEmptyStatuses() {
        return {
            bleeding: 0,
            blighted: 0,
            stunned: false,
            marked: 0,
            protected: 0,
            stealthed: 0,
            riposte: 0,
            dmgUp: 0,
            spdUp: 0,
            dodgeUp: 0,
            critUp: 0,
        };
    }

    updateCharacterStatuses(log) {
        switch (log.type) {
            case 'round':
                this.tickRoundStatuses();
                return; // tickRoundStatuses already calls renderAllStatusIcons

            case 'ability_use':
                this.handleAbilityStatusChange(log);
                break;

            case 'defend':
                this.setStatus(log.target, log.targetTeam, 'protected', log.duration || 2);
                break;

            case 'bleed_tick':
                if (log.turnsRemaining !== undefined && log.turnsRemaining <= 0) {
                    this.setStatus(log.target, log.targetTeam, 'bleeding', 0);
                }
                break;

            case 'blight_tick':
                if (log.turnsRemaining !== undefined && log.turnsRemaining <= 0) {
                    this.setStatus(log.target, log.targetTeam, 'blighted', 0);
                }
                break;

            case 'stunned_skip':
                this.setStatus(log.target, log.targetTeam, 'stunned', false);
                break;

            case 'attack':
                // Stealth consumed on attack
                if (log.attacker && log.attackerTeam) {
                    const key = `${log.attackerTeam}-${log.attacker}`;
                    if (this.characterStatuses[key] && this.characterStatuses[key].stealthed > 0) {
                        this.characterStatuses[key].stealthed = 0;
                    }
                }
                break;

            case 'synergy_trigger':
                this.handleSynergyStatusChange(log);
                break;

            case 'death':
                this.clearAllStatuses(log.target, log.targetTeam);
                break;
        }

        this.renderAllStatusIcons();
    }

    handleAbilityStatusChange(log) {
        switch (log.subtype) {
            case 'bleed_attack':
                if (log.target && log.targetTeam) {
                    this.setStatus(log.target, log.targetTeam, 'bleeding', log.bleedTurns || 3);
                }
                break;
            case 'blight_attack':
                if (log.allHits) {
                    const primary = log.allHits.find(h => h.isPrimary);
                    if (primary) {
                        this.setStatus(primary.name, primary.team, 'blighted', log.blightTurns || 3);
                    }
                } else if (log.target) {
                    this.setStatus(log.target, log.targetTeam, 'blighted', log.blightTurns || 3);
                }
                break;
            case 'stun':
                if (log.target && log.targetTeam) {
                    this.setStatus(log.target, log.targetTeam, 'stunned', true);
                }
                break;
            case 'mark':
                if (log.target && log.targetTeam) {
                    this.setStatus(log.target, log.targetTeam, 'marked', log.markTurns || 3);
                }
                break;
            case 'riposte_buff':
                if (log.caster && log.casterTeam) {
                    this.setStatus(log.caster, log.casterTeam, 'riposte', log.riposteTurns || 2);
                }
                break;
            case 'self_buff':
                if (log.caster && log.casterTeam) {
                    this.applyBuffStatuses(log.caster, log.casterTeam, log.buffs, log.buffDuration || 2);
                }
                break;
            case 'party_buff':
                if (log.casterTeam) {
                    this.applyTeamBuffStatuses(log.casterTeam, log.buffs, log.buffDuration || 2);
                }
                break;
            case 'stealth':
                if (log.caster && log.casterTeam) {
                    this.setStatus(log.caster, log.casterTeam, 'stealthed', log.stealthTurns || 1);
                }
                break;
            case 'protect_dodge':
                if (log.target && log.targetTeam) {
                    this.setStatus(log.target, log.targetTeam, 'protected', log.protectTurns || 2);
                    this.setStatus(log.target, log.targetTeam, 'dodgeUp', log.protectTurns || 2);
                }
                break;
            case 'emergency_heal':
                if (log.selfBleedTurns && log.selfBleedTurns > 0 && log.caster) {
                    this.setStatus(log.caster, log.casterTeam, 'bleeding', log.selfBleedTurns);
                }
                break;
            case 'bonus_vs_marked':
                // Mark may be consumed on hit (removeOnHit)
                if (log.target && log.targetTeam) {
                    const tKey = `${log.targetTeam}-${log.target}`;
                    // We can't know for sure if removeOnHit, so leave the icon - it will tick down
                }
                break;
        }
    }

    handleSynergyStatusChange(log) {
        if (!log.effectType) return;

        switch (log.effectType) {
            case 'grant_riposte':
                this.setStatus(log.partnerChar, log.partnerCharTeam, 'riposte', log.grantedTurns || 1);
                break;
            case 'temp_buff':
                if (log.buffTypes) {
                    const duration = log.buffDuration || 2;
                    log.buffTypes.forEach(type => {
                        const statusKey = this.buffTypeToStatusKey(type);
                        if (statusKey) {
                            this.setStatus(log.partnerChar, log.partnerCharTeam, statusKey, duration);
                        }
                    });
                }
                break;
            case 'apply_mark':
                if (log.target) {
                    this.setStatus(log.target, log.targetTeam, 'marked', log.markTurns || 2);
                }
                break;
            case 'grant_dodge':
                this.setStatus(log.partnerChar, log.partnerCharTeam, 'dodgeUp', log.dodgeDuration || 2);
                break;
            case 'extend_stealth':
                if (log.partnerChar && log.partnerCharTeam) {
                    const key = `${log.partnerCharTeam}-${log.partnerChar}`;
                    if (this.characterStatuses[key]) {
                        this.characterStatuses[key].stealthed += (log.extraTurns || 1);
                    }
                }
                break;
            case 'guaranteed_crit':
                this.setStatus(log.partnerChar, log.partnerCharTeam, 'critUp', 1);
                break;
        }
    }

    buffTypeToStatusKey(type) {
        switch (type) {
            case 'damage': return 'dmgUp';
            case 'speed': return 'spdUp';
            case 'dodge': return 'dodgeUp';
            case 'crit': return 'critUp';
            default: return null;
        }
    }

    applyBuffStatuses(charName, teamName, buffs, duration) {
        if (!buffs) return;
        const key = `${teamName}-${charName}`;
        const s = this.characterStatuses[key];
        if (!s) return;

        if (buffs.damage && buffs.damage > 0) s.dmgUp = Math.max(s.dmgUp, duration);
        if (buffs.speed && buffs.speed > 0) s.spdUp = Math.max(s.spdUp, duration);
        if (buffs.dodge && buffs.dodge > 0) s.dodgeUp = Math.max(s.dodgeUp, duration);
        if (buffs.crit && buffs.crit > 0) s.critUp = Math.max(s.critUp, duration);
    }

    applyTeamBuffStatuses(teamName, buffs, duration) {
        if (!buffs) return;
        for (const key of Object.keys(this.characterStatuses)) {
            if (key.startsWith(teamName + '-')) {
                const s = this.characterStatuses[key];
                if (buffs.damage && buffs.damage > 0) s.dmgUp = Math.max(s.dmgUp, duration);
                if (buffs.speed && buffs.speed > 0) s.spdUp = Math.max(s.spdUp, duration);
                if (buffs.dodge && buffs.dodge > 0) s.dodgeUp = Math.max(s.dodgeUp, duration);
                if (buffs.crit && buffs.crit > 0) s.critUp = Math.max(s.critUp, duration);
            }
        }
    }

    setStatus(charName, teamName, statusKey, value) {
        const key = `${teamName}-${charName}`;
        if (!this.characterStatuses[key]) return;
        this.characterStatuses[key][statusKey] = value;
    }

    clearAllStatuses(charName, teamName) {
        const key = `${teamName}-${charName}`;
        if (this.characterStatuses[key]) {
            this.characterStatuses[key] = this.createEmptyStatuses();
        }
    }

    tickRoundStatuses() {
        for (const key of Object.keys(this.characterStatuses)) {
            const s = this.characterStatuses[key];
            // DOTs: NOT decremented here, handled by bleed_tick/blight_tick logs
            // Decrement duration-based statuses (skip permanent buffs >= 999)
            if (s.marked > 0 && s.marked < 999) s.marked--;
            if (s.protected > 0 && s.protected < 999) s.protected--;
            if (s.stealthed > 0 && s.stealthed < 999) s.stealthed--;
            if (s.riposte > 0 && s.riposte < 999) s.riposte--;
            if (s.dmgUp > 0 && s.dmgUp < 999) s.dmgUp--;
            if (s.spdUp > 0 && s.spdUp < 999) s.spdUp--;
            if (s.dodgeUp > 0 && s.dodgeUp < 999) s.dodgeUp--;
            if (s.critUp > 0 && s.critUp < 999) s.critUp--;
        }
        this.renderAllStatusIcons();
    }

    renderAllStatusIcons() {
        for (const key of Object.keys(this.characterStatuses)) {
            this.renderStatusIcons(key);
        }
    }

    renderStatusIcons(key) {
        const el = this.characterElements[key];
        if (!el) return;

        const container = el.querySelector('.status-icons');
        if (!container) return;

        const s = this.characterStatuses[key];
        const icons = [];

        // Debuffs
        if (s.bleeding > 0) icons.push({ icon: 'fa-tint', cls: 'status-icon--bleed', title: 'Saignement' });
        if (s.blighted > 0) icons.push({ icon: 'fa-skull-crossbones', cls: 'status-icon--blight', title: 'Peste' });
        if (s.stunned) icons.push({ icon: 'fa-dizzy', cls: 'status-icon--stun', title: 'Etourdi' });
        if (s.marked > 0) icons.push({ icon: 'fa-crosshairs', cls: 'status-icon--mark', title: 'Marque' });

        // Buffs
        if (s.protected > 0) icons.push({ icon: 'fa-shield-alt', cls: 'status-icon--protect', title: 'Protege' });
        if (s.stealthed > 0) icons.push({ icon: 'fa-eye-slash', cls: 'status-icon--stealth', title: 'Furtif' });
        if (s.riposte > 0) icons.push({ icon: 'fa-exchange-alt', cls: 'status-icon--riposte', title: 'Riposte' });
        if (s.dmgUp > 0) icons.push({ icon: 'fa-fist-raised', cls: 'status-icon--dmg-up', title: '+Degats' });
        if (s.spdUp > 0) icons.push({ icon: 'fa-wind', cls: 'status-icon--spd-up', title: '+Vitesse' });
        if (s.dodgeUp > 0) icons.push({ icon: 'fa-running', cls: 'status-icon--dodge-up', title: '+Esquive' });
        if (s.critUp > 0) icons.push({ icon: 'fa-bullseye', cls: 'status-icon--crit-up', title: '+Critique' });

        container.innerHTML = icons.map(i =>
            `<span class="status-icon ${i.cls}" title="${i.title}"><i class="fas ${i.icon}"></i></span>`
        ).join('');
    }

    // === END STATUS TRACKING ===

    bindEvents() {
        if (this.playBtn) {
            this.playBtn.addEventListener('click', () => this.togglePlay());
        }

        if (this.skipBtn) {
            this.skipBtn.addEventListener('click', () => this.skip());
        }

        this.speedBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.setSpeed(e));
        });

        // Audio controls
        if (this.muteBtn) {
            this.muteBtn.addEventListener('click', () => this.toggleMute());
        }
        if (this.volumeSlider) {
            this.volumeSlider.addEventListener('input', (e) => {
                this.volume = parseFloat(e.target.value);
                if (this.combatMusic) {
                    this.combatMusic.volume = this.isMuted ? 0 : this.volume;
                }
                if (this.endMusic) {
                    this.endMusic.volume = this.isMuted ? 0 : this.volume;
                }
            });
        }
        if (this.sfxSlider) {
            this.sfxSlider.addEventListener('input', (e) => {
                this.sfxVolume = parseFloat(e.target.value);
            });
        }

        // Unlock audio on first user interaction (browser autoplay policy)
        document.addEventListener('click', () => {
            if (this.audioUnlocked) return;
            this.audioUnlocked = true;
            this.playNextTrack();
        }, { once: true });
    }

    play() {
        if (this.isPlaying && !this.isPaused) return;

        this.isPlaying = true;
        this.isPaused = false;
        this.updatePlayButton();
        this.processNextLog();
    }

    pause() {
        this.isPaused = true;
        this.updatePlayButton();
    }

    togglePlay() {
        if (!this.isPlaying || this.isPaused) {
            this.play();
        } else {
            this.pause();
        }
    }

    skip() {
        this.isPlaying = false;
        this.isPaused = false;

        // Afficher tous les logs restants
        while (this.currentIndex < this.logs.length) {
            const log = this.logs[this.currentIndex];
            this.displayLog(log);
            this.updateHealthBars(log);
            this.trackAbilityCooldowns(log);
            this.updateCharacterStatuses(log);
            if (log.type === 'death') {
                this.animateDeath(log.target, log.targetTeam);
            }
            // Synergy triggers that kill targets
            if (log.type === 'synergy_trigger' && log.targetHP === 0 && log.target) {
                this.animateDeath(log.target, log.targetTeam);
            }
            this.currentIndex++;
        }

        this.showVictoryOverlay();
        this.updatePlayButton();
    }

    setSpeed(event) {
        const speed = parseFloat(event.currentTarget.dataset.combatSpeed);
        this.speed = speed;

        // Mettre à jour l'UI
        this.speedBtns.forEach(btn => btn.classList.remove('active'));
        event.currentTarget.classList.add('active');
    }

    processNextLog() {
        if (!this.isPlaying || this.isPaused) return;

        if (this.currentIndex >= this.logs.length) {
            this.isPlaying = false;
            this.showVictoryOverlay();
            this.updatePlayButton();
            return;
        }

        const log = this.logs[this.currentIndex];
        this.processLog(log);
        this.currentIndex++;

        // Calculer le délai
        let delay = this.getDelayForLog(log);
        delay = delay / this.speed;

        setTimeout(() => this.processNextLog(), delay);
    }

    getDelayForLog(log) {
        switch (log.type) {
            case 'round': return 2500;
            case 'initiative': return 600;
            case 'attack': return 3000;
            case 'heal': return 2800;
            case 'defend': return 2500;
            case 'dodge': return 2000;
            case 'death': return 3500;
            case 'protect': return 2500;
            case 'victory':
            case 'draw': return 1500;
            // Nouveaux types
            case 'bleed_tick': return 1500;
            case 'blight_tick': return 1500;
            case 'stunned_skip': return 1800;
            case 'riposte_activate': return 2000;
            case 'ability_use': return this.getAbilityDelay(log);
            // Synergies
            case 'synergy_announce': return 2000;
            case 'synergy_trigger': return this.getSynergyTriggerDelay(log);
            default: return 1200;
        }
    }

    getSynergyTriggerDelay(log) {
        // Reactive synergies (bonus attacks) need more time
        if (log.damage !== undefined) return 3500;
        return 2500;
    }

    getAbilityDelay(log) {
        switch (log.subtype) {
            case 'bleed_attack':
            case 'backline_strike':
            case 'armor_pierce':
            case 'bonus_vs_marked': return 3000;
            case 'blight_attack': return 3500;
            case 'stun': return 2500;
            case 'mark': return 2000;
            case 'riposte_buff':
            case 'self_buff':
            case 'stealth': return 2000;
            case 'party_heal': return 2800;
            case 'party_buff': return 2500;
            case 'emergency_heal': return 2800;
            case 'protect_dodge': return 2500;
            case 'transform_damage': return 1500;
            default: return 2000;
        }
    }

    processLog(log) {
        this.playAnimation(log);
        this.displayLog(log);

        // Synchroniser la mise à jour des HP avec l'animation
        const hpDelay = this.getHPUpdateDelay(log);
        if (hpDelay > 0) {
            setTimeout(() => this.updateHealthBars(log), hpDelay / this.speed);
        } else {
            this.updateHealthBars(log);
        }

        // Suivi des cooldowns
        this.trackAbilityCooldowns(log);

        // Suivi des statuts (icones buff/debuff)
        this.updateCharacterStatuses(log);
    }

    trackAbilityCooldowns(log) {
        // Quand une compétence est utilisée, mettre en cooldown
        if (log.type === 'ability_use' && log.caster && log.casterTeam) {
            const key = `${log.casterTeam}-${log.caster}`;
            const abilityData = this.abilityElements[key];
            if (abilityData && abilityData.maxCd > 0) {
                this.abilityCooldowns[key] = abilityData.maxCd;
                this.updateAbilityCooldownDisplay(key);
            }
        }

        // A chaque nouveau round, décrémenter tous les cooldowns
        if (log.type === 'round') {
            for (const key in this.abilityCooldowns) {
                if (this.abilityCooldowns[key] > 0) {
                    this.abilityCooldowns[key]--;
                    this.updateAbilityCooldownDisplay(key);
                }
            }
        }
    }

    updateAbilityCooldownDisplay(key) {
        const abilityData = this.abilityElements[key];
        if (!abilityData) return;

        const cd = this.abilityCooldowns[key] || 0;

        if (cd > 0) {
            // En cooldown : griser + afficher badge
            abilityData.el.classList.add('character-info__ability--on-cd');
            if (abilityData.badge) {
                abilityData.badge.textContent = `${cd}T`;
                abilityData.badge.style.display = 'inline';
            }
        } else {
            // Prêt : retirer le gris
            abilityData.el.classList.remove('character-info__ability--on-cd');
            if (abilityData.badge) {
                abilityData.badge.style.display = 'none';
            }
        }
    }

    getHPUpdateDelay(log) {
        switch (log.type) {
            case 'attack': return 350;
            case 'heal': return 400;
            case 'death': return 0;
            case 'bleed_tick': return 200;
            case 'blight_tick': return 200;
            case 'riposte_activate': return 350;
            case 'ability_use': return this.getAbilityHPDelay(log);
            case 'synergy_trigger': return 800;
            default: return 0;
        }
    }

    getAbilityHPDelay(log) {
        switch (log.subtype) {
            case 'bleed_attack':
            case 'blight_attack':
            case 'backline_strike':
            case 'armor_pierce':
            case 'bonus_vs_marked':
            case 'stun': return 350;
            case 'party_heal':
            case 'emergency_heal': return 400;
            case 'transform_damage': return 200;
            default: return 0;
        }
    }

    playAnimation(log) {
        switch (log.type) {
            case 'attack':
                this.animateAttack(log.attacker, log.attackerTeam, log.target, log.targetTeam, log.isCrit);
                break;
            case 'heal':
                this.animateHeal(log.healer, log.healerTeam, log.target, log.targetTeam);
                break;
            case 'defend':
                this.animateDefend(log.defender, log.defenderTeam);
                break;
            case 'dodge':
                this.animateDodge(log.target, log.targetTeam);
                break;
            case 'death':
                this.animateDeath(log.target, log.targetTeam);
                break;
            // Nouveaux types
            case 'bleed_tick':
                this.animateDoT(log.target, log.targetTeam, 'bleeding');
                break;
            case 'blight_tick':
                this.animateDoT(log.target, log.targetTeam, 'blighted');
                break;
            case 'stunned_skip':
                this.animateStunned(log.target, log.targetTeam);
                break;
            case 'riposte_activate':
                this.animateAttack(log.attacker, log.attackerTeam, log.target, log.targetTeam, false);
                break;
            case 'ability_use':
                this.playAbilityAnimation(log);
                break;
            // Synergies
            case 'synergy_announce':
                this.animateSynergyAnnounce(log);
                break;
            case 'synergy_trigger':
                this.animateSynergyTrigger(log);
                break;
        }
    }

    // === NOUVELLES ANIMATIONS ===

    animateDoT(targetName, targetTeam, dotClass) {
        const target = this.getCharacterElement(targetName, targetTeam);
        if (target) {
            target.classList.add(dotClass);
            setTimeout(() => target.classList.remove(dotClass), 1000);
        }
    }

    animateStunned(targetName, targetTeam) {
        const target = this.getCharacterElement(targetName, targetTeam);
        if (target) {
            target.classList.add('stunned');
            setTimeout(() => target.classList.remove('stunned'), 1400);
        }
    }

    animateMarked(targetName, targetTeam) {
        const target = this.getCharacterElement(targetName, targetTeam);
        if (target) {
            target.classList.add('marked');
            // La marque reste visible plus longtemps
            setTimeout(() => target.classList.remove('marked'), 2000);
        }
    }

    animateBuff(targetName, targetTeam) {
        const target = this.getCharacterElement(targetName, targetTeam);
        if (target) {
            target.classList.add('buffed');
            setTimeout(() => target.classList.remove('buffed'), 1400);
        }
    }

    animateStealth(targetName, targetTeam) {
        const target = this.getCharacterElement(targetName, targetTeam);
        if (target) {
            target.classList.add('stealthed');
            setTimeout(() => target.classList.remove('stealthed'), 1500);
        }
    }

    playAbilityAnimation(log) {
        switch (log.subtype) {
            case 'bleed_attack':
                if (log.caster && log.casterTeam) this.animateAttack(log.caster, log.casterTeam, log.target, log.targetTeam, false);
                if (log.target && log.targetTeam) {
                    setTimeout(() => this.animateDoT(log.target, log.targetTeam, 'bleeding'), 700);
                }
                break;
            case 'blight_attack':
                if (log.caster && log.casterTeam) {
                    const blightKey = `${log.casterTeam}-${log.caster}`;
                    this.swapSprite(blightKey, 'skill.webp', 1400);
                    this.playCharSfx(blightKey, 'skill');
                    const casterEl = this.getCharacterElement(log.caster, log.casterTeam);
                    if (casterEl) {
                        casterEl.classList.add('attacking');
                        setTimeout(() => casterEl.classList.remove('attacking'), 1200);
                    }
                }
                // AOE: hurt all hit enemies
                if (log.allHits) {
                    setTimeout(() => {
                        log.allHits.forEach(h => {
                            const el = this.getCharacterElement(h.name, h.team);
                            if (el) {
                                el.classList.add('hurt');
                                setTimeout(() => el.classList.remove('hurt'), 800);
                            }
                        });
                    }, 500);
                    // Blight DOT animation only on primary target
                    const primary = log.allHits.find(h => h.isPrimary);
                    if (primary) {
                        setTimeout(() => this.animateDoT(primary.name, primary.team, 'blighted'), 1000);
                    }
                } else if (log.target && log.targetTeam) {
                    // Fallback for old log format
                    setTimeout(() => this.animateDoT(log.target, log.targetTeam, 'blighted'), 700);
                }
                break;
            case 'stun':
                if (log.caster && log.casterTeam) this.animateAttack(log.caster, log.casterTeam, log.target, log.targetTeam, false);
                if (log.target && log.targetTeam) {
                    setTimeout(() => this.animateStunned(log.target, log.targetTeam), 700);
                }
                break;
            case 'mark':
                if (log.caster && log.casterTeam) {
                    const markKey = `${log.casterTeam}-${log.caster}`;
                    this.swapSprite(markKey, 'skill.webp', 1400);
                    this.playCharSfx(markKey, 'skill');
                    this.animateBuff(log.caster, log.casterTeam);
                }
                if (log.target && log.targetTeam) this.animateMarked(log.target, log.targetTeam);
                break;
            case 'riposte_buff':
                if (log.caster && log.casterTeam) {
                    const riposteKey = `${log.casterTeam}-${log.caster}`;
                    this.swapSprite(riposteKey, 'skill.webp', 1400);
                    this.playCharSfx(riposteKey, 'skill');
                    this.animateBuff(log.caster, log.casterTeam);
                }
                break;
            case 'self_buff':
                if (log.caster && log.casterTeam) {
                    const selfBuffKey = `${log.casterTeam}-${log.caster}`;
                    // Abomination Transformation : switch slug to beast permanently
                    if (log.abilityName === 'Transformation') {
                        this.characterSlugs[selfBuffKey] = 'beast';
                    }
                    this.swapSprite(selfBuffKey, 'skill.webp', 1400);
                    this.playCharSfx(selfBuffKey, 'skill');
                    this.animateBuff(log.caster, log.casterTeam);
                }
                break;
            case 'party_heal':
                if (log.caster && log.casterTeam) {
                    const partyHealKey = `${log.casterTeam}-${log.caster}`;
                    this.playCharSfx(partyHealKey, 'heal');
                    this.animateHeal(log.caster, log.casterTeam, log.caster, log.casterTeam);
                    // Animer tous les alliés soignés
                    if (log.healed) {
                        log.healed.forEach(h => {
                            const el = this.getCharacterElement(h.name, h.team);
                            if (el) {
                                el.classList.add('healed');
                                setTimeout(() => el.classList.remove('healed'), 1500);
                            }
                        });
                    }
                }
                break;
            case 'party_buff':
                if (log.caster && log.casterTeam) {
                    const partyBuffKey = `${log.casterTeam}-${log.caster}`;
                    this.swapSprite(partyBuffKey, 'skill.webp', 1400);
                    this.playCharSfx(partyBuffKey, 'skill');
                    this.animateBuff(log.caster, log.casterTeam);
                }
                // Animer tous les alliés du même côté
                this.animateTeamBuff(log.casterTeam);
                break;
            case 'stealth':
                if (log.caster && log.casterTeam) {
                    const stealthKey = `${log.casterTeam}-${log.caster}`;
                    this.swapSprite(stealthKey, 'skill.webp', 1400);
                    this.playCharSfx(stealthKey, 'skill');
                    this.animateStealth(log.caster, log.casterTeam);
                }
                break;
            case 'armor_pierce':
            case 'backline_strike':
            case 'bonus_vs_marked':
                if (log.caster && log.casterTeam) this.animateAttack(log.caster, log.casterTeam, log.target, log.targetTeam, log.isCrit || false);
                break;
            case 'emergency_heal':
                if (log.caster && log.casterTeam) {
                    const emergHealKey = `${log.casterTeam}-${log.caster}`;
                    this.playCharSfx(emergHealKey, 'heal');
                    this.animateHeal(log.caster, log.casterTeam, log.caster, log.casterTeam);
                }
                break;
            case 'protect_dodge':
                if (log.caster && log.casterTeam) {
                    const protDodgeKey = `${log.casterTeam}-${log.caster}`;
                    this.playCharSfx(protDodgeKey, 'skill');
                    this.animateDefend(log.caster, log.casterTeam);
                }
                break;
            case 'transform_damage':
                if (log.target && log.targetTeam) {
                    const el = this.getCharacterElement(log.target, log.targetTeam);
                    if (el) {
                        el.classList.add('hurt');
                        setTimeout(() => el.classList.remove('hurt'), 800);
                    }
                }
                break;
        }
    }

    animateTeamBuff(casterTeam) {
        Object.keys(this.characterElements).forEach(key => {
            if (key.startsWith(casterTeam)) {
                const el = this.characterElements[key];
                el.classList.add('buffed');
                setTimeout(() => el.classList.remove('buffed'), 1400);
            }
        });
    }

    // === SYNERGY ANIMATIONS ===

    animateSynergyAnnounce(log) {
        const trigger = this.getCharacterElement(log.triggerChar, log.team);
        const partner = this.getCharacterElement(log.partnerChar, log.team);

        if (trigger) {
            trigger.classList.add('synergy-announce-glow');
            setTimeout(() => trigger.classList.remove('synergy-announce-glow'), 1500);
        }
        if (partner) {
            setTimeout(() => {
                partner.classList.add('synergy-announce-glow');
                setTimeout(() => partner.classList.remove('synergy-announce-glow'), 1500);
            }, 300);
        }

        // Draw SVG link between the two
        if (trigger && partner) {
            this.drawSynergyLink(trigger, partner);
        }
    }

    animateSynergyTrigger(log) {
        const trigger = this.getCharacterElement(log.triggerChar, log.triggerCharTeam);
        const partner = this.getCharacterElement(log.partnerChar, log.partnerCharTeam);

        // Phase 1: Trigger glow
        if (trigger) {
            trigger.classList.add('synergy-trigger-glow');
            setTimeout(() => trigger.classList.remove('synergy-trigger-glow'), 1800);
        }

        // Phase 2: SVG link between trigger and partner
        if (trigger && partner) {
            setTimeout(() => this.drawSynergyLink(trigger, partner), 400);
        }

        // Phase 3: Partner reaction
        if (partner) {
            setTimeout(() => {
                partner.classList.add('synergy-react');
                setTimeout(() => partner.classList.remove('synergy-react'), 800);

                // If it's a bonus attack, animate the partner attacking
                if (log.damage !== undefined && log.target) {
                    const partnerKey = `${log.partnerCharTeam}-${log.partnerChar}`;
                    this.swapSprite(partnerKey, 'attackanimation.webp', 1200);
                    this.playCharSfx(partnerKey, 'attack');

                    const target = this.getCharacterElement(log.target, log.targetTeam);
                    if (target) {
                        setTimeout(() => {
                            target.classList.add('hurt');
                            setTimeout(() => target.classList.remove('hurt'), 800);
                        }, 400);
                    }
                }
            }, 800);
        }
    }

    drawSynergyLink(el1, el2) {
        const stage = this.container.querySelector('.battle-stage');
        if (!stage) return;

        // Remove existing SVG if any
        const existingSvg = stage.querySelector('.synergy-link-svg');
        if (existingSvg) existingSvg.remove();

        const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
        svg.classList.add('synergy-link-svg');
        svg.setAttribute('width', '100%');
        svg.setAttribute('height', '100%');

        const stageRect = stage.getBoundingClientRect();
        const rect1 = el1.getBoundingClientRect();
        const rect2 = el2.getBoundingClientRect();

        const x1 = rect1.left + rect1.width / 2 - stageRect.left;
        const y1 = rect1.top + rect1.height / 2 - stageRect.top;
        const x2 = rect2.left + rect2.width / 2 - stageRect.left;
        const y2 = rect2.top + rect2.height / 2 - stageRect.top;

        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.classList.add('synergy-link-line');
        line.setAttribute('x1', x1);
        line.setAttribute('y1', y1);
        line.setAttribute('x2', x2);
        line.setAttribute('y2', y2);

        svg.appendChild(line);
        stage.appendChild(svg);

        // Remove after animation
        setTimeout(() => svg.remove(), 1800 / this.speed);
    }

    // === SPRITE SWAP ===

    swapSprite(key, spriteName, duration) {
        const el = this.characterElements[key];
        if (!el) return;
        const slug = this.characterSlugs[key];
        if (!slug) return;
        const img = el.querySelector('.character-sprite');
        if (!img) return;
        img.src = `/asset/img/combat/${slug}/${spriteName}`;
        if (duration > 0) {
            setTimeout(() => {
                if (!el.classList.contains('dead')) {
                    img.src = `/asset/img/combat/${this.characterSlugs[key]}/fightidle.webp`;
                }
            }, duration);
        }
    }

    // === ANIMATIONS EXISTANTES ===

    animateAttack(attackerName, attackerTeam, targetName, targetTeam, isCrit) {
        const attacker = this.getCharacterElement(attackerName, attackerTeam);
        const target = this.getCharacterElement(targetName, targetTeam);

        if (attacker) {
            const key = `${attackerTeam}-${attackerName}`;
            this.swapSprite(key, 'attackanimation.webp', 1200);
            attacker.classList.add('attacking');
            this.playCharSfx(key, 'attack');
            setTimeout(() => attacker.classList.remove('attacking'), 1200);
        }

        if (target) {
            setTimeout(() => {
                target.classList.add('hurt');
                if (isCrit) target.classList.add('crit');
                setTimeout(() => target.classList.remove('hurt', 'crit'), 800);
            }, 500);
        }
    }

    animateHeal(healerName, healerTeam, targetName, targetTeam) {
        const healer = this.getCharacterElement(healerName, healerTeam);
        const target = this.getCharacterElement(targetName, targetTeam);

        if (healer) {
            const key = `${healerTeam}-${healerName}`;
            if (this.characterHasHeal[key]) {
                this.swapSprite(key, 'healing.webp', 1500);
            } else {
                this.swapSprite(key, 'skill.webp', 1500);
            }
            healer.classList.add('healing');
            this.playCharSfx(key, 'heal');
            setTimeout(() => healer.classList.remove('healing'), 1500);
        }

        if (target) {
            target.classList.add('healed');
            setTimeout(() => target.classList.remove('healed'), 1500);
        }
    }

    animateDefend(defenderName, defenderTeam) {
        const defender = this.getCharacterElement(defenderName, defenderTeam);
        if (defender) {
            const key = `${defenderTeam}-${defenderName}`;
            this.swapSprite(key, 'defending.webp', 1800);
            defender.classList.add('defending');
            this.playCharSfx(key, 'skill');
            setTimeout(() => defender.classList.remove('defending'), 1800);
        }
    }

    animateDodge(targetName, targetTeam) {
        const target = this.getCharacterElement(targetName, targetTeam);
        if (target) {
            target.classList.add('dodging');
            setTimeout(() => target.classList.remove('dodging'), 1000);
        }
    }

    animateDeath(targetName, targetTeam) {
        const target = this.getCharacterElement(targetName, targetTeam);
        if (!target) return;

        const key = `${targetTeam}-${targetName}`;
        const slug = this.characterSlugs[key];
        const img = target.querySelector('.character-sprite');

        // Try to swap to corpse image
        if (img && slug) {
            const corpseImg = new Image();
            corpseImg.src = `/asset/img/combat/${slug}/corpse.png`;
            corpseImg.onload = () => {
                img.src = corpseImg.src;
                target.classList.add('dead', 'dead--corpse');
            };
            corpseImg.onerror = () => {
                // No corpse image available, use CSS fallback
                target.classList.add('dead');
            };
        } else {
            target.classList.add('dead');
        }
    }

    getCharacterElement(name, team) {
        return this.characterElements[`${team}-${name}`];
    }

    displayLog(log) {
        if (!this.logContainer) return;

        const entry = document.createElement('p');
        entry.className = 'combat-log__entry';

        if (log.type === 'round') {
            entry.classList.add('combat-log__entry--round');
        } else if (log.type === 'victory') {
            entry.classList.add('combat-log__entry--victory');
        } else if (log.type === 'draw') {
            entry.classList.add('combat-log__entry--defeat');
        } else if (log.type === 'ability_use') {
            entry.classList.add('combat-log__entry--ability');
        } else if (log.type === 'bleed_tick') {
            entry.classList.add('combat-log__entry--bleed');
        } else if (log.type === 'blight_tick') {
            entry.classList.add('combat-log__entry--blight');
        } else if (log.type === 'stunned_skip') {
            entry.classList.add('combat-log__entry--stun');
        } else if (log.type === 'riposte_activate') {
            entry.classList.add('combat-log__entry--riposte');
        } else if (log.type === 'synergy_announce') {
            entry.classList.add('combat-log__entry--synergy-announce');
        } else if (log.type === 'synergy_trigger') {
            entry.classList.add('combat-log__entry--synergy-trigger');
        }

        entry.innerHTML = log.message;
        this.logContainer.appendChild(entry);
        this.logContainer.scrollTop = this.logContainer.scrollHeight;
    }

    updateHealthBars(log) {
        let characterName = null;
        let teamName = null;
        let currentHP = null;
        let maxHP = null;

        // Déterminer les données selon le type de log
        if (log.type === 'attack' || log.type === 'riposte_activate') {
            characterName = log.target;
            teamName = log.targetTeam;
            currentHP = log.targetHP;
            maxHP = log.targetMaxHP;
        } else if (log.type === 'heal') {
            characterName = log.target;
            teamName = log.targetTeam;
            currentHP = log.targetHP;
            maxHP = log.targetMaxHP;
        } else if (log.type === 'bleed_tick' || log.type === 'blight_tick') {
            characterName = log.target;
            teamName = log.targetTeam;
            currentHP = log.targetHP;
            maxHP = log.targetMaxHP;
        } else if (log.type === 'ability_use') {
            this.updateAbilityHealthBars(log);
            return;
        } else if (log.type === 'synergy_trigger') {
            // Synergies can cause damage
            if (log.target && log.targetHP !== undefined && log.targetMaxHP) {
                characterName = log.target;
                teamName = log.targetTeam;
                currentHP = log.targetHP;
                maxHP = log.targetMaxHP;
            }
        }

        // Mettre à jour si nous avons les données nécessaires
        if (characterName && teamName && currentHP !== null && currentHP !== undefined && maxHP) {
            this.updateCharacterHP(characterName, teamName, currentHP, maxHP);
        }
    }

    updateAbilityHealthBars(log) {
        // AOE hits (blight_attack): update HP for all hit enemies
        if (log.allHits) {
            log.allHits.forEach(h => {
                this.updateCharacterHP(h.name, h.team, h.hp, h.maxHp);
            });
        }
        // Compétences qui infligent des dégâts à une cible
        else if (log.target && log.targetHP !== undefined && log.targetMaxHP) {
            this.updateCharacterHP(log.target, log.targetTeam, log.targetHP, log.targetMaxHP);
        }

        // Soin de groupe : mettre à jour chaque allié soigné
        if (log.subtype === 'party_heal' && log.healed) {
            log.healed.forEach(h => {
                this.updateCharacterHP(h.name, h.team, h.hp, h.maxHp);
            });
        }

        // Soin d'urgence : mettre à jour le lanceur
        if (log.subtype === 'emergency_heal' && log.caster) {
            this.updateCharacterHP(log.caster, log.casterTeam, log.targetHP, log.targetMaxHP);
        }
    }

    updateCharacterHP(characterName, teamName, currentHP, maxHP) {
        const target = this.getCharacterElement(characterName, teamName);

        if (!target) {
            return;
        }

        const percent = maxHP > 0 ? (currentHP / maxHP) * 100 : 0;

        // Mise à jour de la barre HP dans la zone de combat (battle-stage)
        const hpBar = target.querySelector('.hp-bar__fill');
        const hpText = target.querySelector('.hp-text');

        if (hpBar) {
            // Animation fluide de la barre
            hpBar.style.transition = `width 0.3s ease-out`;
            hpBar.style.width = `${percent}%`;

            // Classes de couleur selon le pourcentage
            hpBar.classList.remove('hp-bar__fill--low', 'hp-bar__fill--critical');
            if (percent <= 25) {
                hpBar.classList.add('hp-bar__fill--critical');
            } else if (percent <= 50) {
                hpBar.classList.add('hp-bar__fill--low');
            }
        }

        if (hpText) {
            hpText.textContent = `${currentHP}/${maxHP}`;
        }

        // Mise à jour des panneaux d'info latéraux
        this.updateInfoPanel(characterName, teamName, currentHP);
    }

    updateInfoPanel(characterName, teamName, currentHP) {
        // Trouver le bon panneau selon l'équipe
        const panelClass = teamName === 'Equipe 1' ? '.info-panel--team1' : '.info-panel--team2';
        const panel = this.container.querySelector(panelClass);

        if (!panel) return;

        // Trouver le personnage dans le panneau par son nom
        const characterInfos = panel.querySelectorAll('.character-info');
        for (const info of characterInfos) {
            const nameEl = info.querySelector('.character-info__name');
            if (nameEl && nameEl.textContent.trim() === characterName) {
                const statsSpan = info.querySelector('.character-info__stats span');
                if (statsSpan) {
                    statsSpan.textContent = currentHP;

                    // Animation flash pour montrer le changement
                    statsSpan.classList.add('hp-updated');
                    setTimeout(() => statsSpan.classList.remove('hp-updated'), 300);
                }
                break;
            }
        }
    }

    showVictoryOverlay() {
        if (this.overlay) {
            this.overlay.style.display = 'flex';
            setTimeout(() => {
                this.overlay.style.opacity = '1';
            }, 50);
        }

        // Play victory or defeat music
        this.playEndMusic();

        // Finaliser le MMR a la fin du combat
        this.finalizeRating();
    }

    playEndMusic() {
        // Stop combat music
        if (this.combatMusic) {
            this.combatMusic.pause();
            this.combatMusic = null;
        }

        // Determine outcome from overlay class
        let track = null;
        if (this.overlay) {
            if (this.overlay.classList.contains('battle-stage__overlay--victory')) {
                track = '/asset/ost/winlose/victory.mp3';
            } else if (this.overlay.classList.contains('battle-stage__overlay--defeat')) {
                track = '/asset/ost/winlose/defeat.mp3';
            } else if (this.overlay.classList.contains('battle-stage__overlay--draw')) {
                track = '/asset/ost/winlose/defeat.mp3';
            }
        }

        if (track && !this.isMuted) {
            this.endMusic = new Audio(track);
            this.endMusic.volume = this.volume;
            this.endMusic.play().catch(() => {});
        }
    }

    finalizeRating() {
        const finalizeUrl = this.container.dataset.finalizeUrl;
        if (!finalizeUrl) return;

        fetch(finalizeUrl, {
            method: 'POST',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then(res => res.json())
        .then(data => {
            if (data.success && data.ratingChange !== 0) {
                this.showRatingUpdate(data.ratingChange, data.newRating, data.newRating2);
            }
        })
        .catch(err => console.error('Erreur finalisation rating:', err));
    }

    showRatingUpdate(change, newRating, newRating2) {
        // Mettre a jour le MMR affiche dans le panneau joueur (Equipe 1)
        const ratingEl = this.container.querySelector('.info-panel--team1 .info-panel__rating');
        if (ratingEl && newRating !== null) {
            ratingEl.innerHTML = `<i class="fas fa-trophy"></i> ${newRating} MMR`;
        }

        // Mettre a jour le MMR affiche dans le panneau adversaire (Equipe 2)
        const ratingEl2 = this.container.querySelector('.info-panel--team2 .info-panel__rating--enemy');
        if (ratingEl2 && newRating2 !== null) {
            ratingEl2.innerHTML = `<i class="fas fa-trophy"></i> ${newRating2} MMR`;
        }

        // Afficher la notification de changement dans l'overlay
        const overlay = this.container.querySelector('[data-combat-overlay]');
        if (overlay) {
            const winnerDiv = overlay.querySelector('.battle-stage__winner');

            // Changement MMR Equipe 1
            const notif1 = document.createElement('div');
            notif1.className = 'rating-change';
            notif1.style.cssText = 'font-size:1.2rem;margin-top:12px;font-weight:bold;opacity:0;transition:opacity 0.5s;';
            notif1.textContent = change > 0 ? `Equipe 1 : +${change} MMR` : `Equipe 1 : ${change} MMR`;
            notif1.style.color = change > 0 ? '#4caf50' : '#f44336';
            winnerDiv.appendChild(notif1);

            // Changement MMR Equipe 2 (inverse)
            const change2 = -change;
            const notif2 = document.createElement('div');
            notif2.className = 'rating-change';
            notif2.style.cssText = 'font-size:1.2rem;margin-top:6px;font-weight:bold;opacity:0;transition:opacity 0.5s;';
            notif2.textContent = change2 > 0 ? `Equipe 2 : +${change2} MMR` : `Equipe 2 : ${change2} MMR`;
            notif2.style.color = change2 > 0 ? '#4caf50' : '#f44336';
            winnerDiv.appendChild(notif2);

            setTimeout(() => {
                notif1.style.opacity = '1';
                notif2.style.opacity = '1';
            }, 100);
        }
    }

    // === AUDIO ===

    playNextTrack() {
        if (!this.audioUnlocked) return;

        if (this.combatMusic) {
            this.combatMusic.pause();
            this.combatMusic = null;
        }

        const idx = this.getRandomTrackIndex();
        this.combatMusic = new Audio(this.combatPlaylist[idx]);
        this.combatMusic.volume = this.isMuted ? 0 : this.volume;
        this.combatMusic.addEventListener('ended', () => this.playNextTrack());
        this.combatMusic.play().catch(() => {});
    }

    getRandomTrackIndex() {
        let i;
        do {
            i = Math.floor(Math.random() * this.combatPlaylist.length);
        } while (i === this.lastTrackIndex && this.combatPlaylist.length > 1);
        this.lastTrackIndex = i;
        return i;
    }

    toggleMute() {
        this.isMuted = !this.isMuted;
        if (this.combatMusic) {
            this.combatMusic.volume = this.isMuted ? 0 : this.volume;
        }
        if (this.endMusic) {
            this.endMusic.volume = this.isMuted ? 0 : this.volume;
        }
        if (this.muteBtn) {
            const icon = this.muteBtn.querySelector('i');
            if (icon) {
                icon.className = this.isMuted ? 'fas fa-volume-mute' : 'fas fa-volume-up';
            }
        }
        if (this.volumeSlider) {
            this.volumeSlider.disabled = this.isMuted;
        }
        if (this.sfxSlider) {
            this.sfxSlider.disabled = this.isMuted;
        }
    }

    // === SFX ===

    /**
     * Pre-load and cache an audio file, returns the cached Audio clone for playback.
     */
    loadSfx(path) {
        if (!this.sfxCache[path]) {
            this.sfxCache[path] = new Audio(path);
        }
        return this.sfxCache[path];
    }

    /**
     * Play a sound effect for a character action.
     * @param {string} slug - character slug (e.g. 'crusader', 'plague-doctor')
     * @param {string} sfxName - sound file name (e.g. 'attacksound', 'skillsound', 'heal')
     */
    playSfx(slug, sfxName) {
        if (this.isMuted || !slug) return;

        const path = `/asset/ost/vfx/${slug}/${sfxName}.wav`;
        const cached = this.loadSfx(path);

        // Clone the audio node so overlapping plays don't cut each other off
        const sound = cached.cloneNode();
        sound.volume = this.sfxVolume;
        sound.play().catch(() => {});
    }

    /**
     * Play the appropriate SFX for a character given their key and action type.
     * @param {string} key - character key (e.g. 'Equipe 1-Crusader')
     * @param {string} action - 'attack', 'skill', or 'heal'
     */
    playCharSfx(key, action) {
        const slug = this.characterSlugs[key];
        if (!slug) return;

        switch (action) {
            case 'attack':
                this.playSfx(slug, 'attacksound');
                break;
            case 'heal':
                // Try heal.wav first, fallback to skillsound.wav
                if (this.characterHasHeal[key]) {
                    this.playSfx(slug, 'heal');
                } else {
                    this.playSfx(slug, 'skillsound');
                }
                break;
            case 'skill':
                this.playSfx(slug, 'skillsound');
                break;
        }
    }

    updatePlayButton() {
        if (!this.playBtn) return;

        if (this.isPlaying && !this.isPaused) {
            this.playBtn.textContent = 'Pause';
        } else if (this.currentIndex >= this.logs.length) {
            this.playBtn.textContent = 'Terminé';
            this.playBtn.disabled = true;
        } else {
            this.playBtn.textContent = this.currentIndex > 0 ? 'Reprendre' : 'Lancer';
        }
    }
}

// Initialiser quand le DOM est prêt
document.addEventListener('DOMContentLoaded', () => {
    const combatContainer = document.querySelector('[data-combat-logs]');
    if (combatContainer) {
        new CombatController(combatContainer);
    }
});

export default CombatController;
