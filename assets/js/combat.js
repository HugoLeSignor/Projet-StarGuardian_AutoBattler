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
        this.abilityCooldowns = {}; // Suivi des cooldowns en cours
        this.container.querySelectorAll('[data-character-name]').forEach(el => {
            const name = el.dataset.characterName;
            const team = el.dataset.characterTeam;
            const key = `${team}-${name}`;
            this.characterElements[key] = el;

            // Extraire le HP max depuis le texte initial
            const hpText = el.querySelector('.hp-text');
            if (hpText) {
                const match = hpText.textContent.match(/(\d+)\/(\d+)/);
                if (match) {
                    this.characterMaxHP[key] = parseInt(match[2]);
                }
            }
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

        // Event listeners
        this.bindEvents();

        // Lancer automatiquement après un délai
        setTimeout(() => this.play(), 800);
    }

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
            if (log.type === 'death') {
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
            case 'round': return 2000;
            case 'initiative': return 400;
            case 'attack': return 2000;
            case 'heal': return 1800;
            case 'defend': return 1500;
            case 'dodge': return 1200;
            case 'death': return 2500;
            case 'protect': return 1500;
            case 'victory':
            case 'draw': return 1000;
            // Nouveaux types
            case 'bleed_tick': return 800;
            case 'blight_tick': return 800;
            case 'stunned_skip': return 1000;
            case 'riposte_activate': return 1200;
            case 'ability_use': return this.getAbilityDelay(log);
            default: return 800;
        }
    }

    getAbilityDelay(log) {
        switch (log.subtype) {
            case 'bleed_attack':
            case 'blight_attack':
            case 'backline_strike':
            case 'armor_pierce':
            case 'bonus_vs_marked': return 2000;
            case 'stun': return 1500;
            case 'mark': return 1200;
            case 'riposte_buff':
            case 'self_buff':
            case 'stealth': return 1200;
            case 'party_heal': return 1800;
            case 'party_buff': return 1500;
            case 'emergency_heal': return 1800;
            case 'protect_dodge': return 1500;
            case 'transform_damage': return 800;
            default: return 1200;
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
        }
    }

    // === NOUVELLES ANIMATIONS ===

    animateDoT(targetName, targetTeam, dotClass) {
        const target = this.getCharacterElement(targetName, targetTeam);
        if (target) {
            target.classList.add(dotClass);
            setTimeout(() => target.classList.remove(dotClass), 600);
        }
    }

    animateStunned(targetName, targetTeam) {
        const target = this.getCharacterElement(targetName, targetTeam);
        if (target) {
            target.classList.add('stunned');
            setTimeout(() => target.classList.remove('stunned'), 800);
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
            setTimeout(() => target.classList.remove('buffed'), 800);
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
                    setTimeout(() => this.animateDoT(log.target, log.targetTeam, 'bleeding'), 400);
                }
                break;
            case 'blight_attack':
                if (log.caster && log.casterTeam) this.animateAttack(log.caster, log.casterTeam, log.target, log.targetTeam, false);
                if (log.target && log.targetTeam) {
                    setTimeout(() => this.animateDoT(log.target, log.targetTeam, 'blighted'), 400);
                }
                break;
            case 'stun':
                if (log.caster && log.casterTeam) this.animateAttack(log.caster, log.casterTeam, log.target, log.targetTeam, false);
                if (log.target && log.targetTeam) {
                    setTimeout(() => this.animateStunned(log.target, log.targetTeam), 400);
                }
                break;
            case 'mark':
                if (log.caster && log.casterTeam) this.animateBuff(log.caster, log.casterTeam);
                if (log.target && log.targetTeam) this.animateMarked(log.target, log.targetTeam);
                break;
            case 'riposte_buff':
                if (log.caster && log.casterTeam) this.animateBuff(log.caster, log.casterTeam);
                break;
            case 'self_buff':
                if (log.caster && log.casterTeam) this.animateBuff(log.caster, log.casterTeam);
                break;
            case 'party_heal':
                if (log.caster && log.casterTeam) {
                    this.animateHeal(log.caster, log.casterTeam, log.caster, log.casterTeam);
                    // Animer tous les alliés soignés
                    if (log.healed) {
                        log.healed.forEach(h => {
                            const el = this.getCharacterElement(h.name, h.team);
                            if (el) {
                                el.classList.add('healed');
                                setTimeout(() => el.classList.remove('healed'), 800);
                            }
                        });
                    }
                }
                break;
            case 'party_buff':
                if (log.caster && log.casterTeam) this.animateBuff(log.caster, log.casterTeam);
                // Animer tous les alliés du même côté
                this.animateTeamBuff(log.casterTeam);
                break;
            case 'stealth':
                if (log.caster && log.casterTeam) this.animateStealth(log.caster, log.casterTeam);
                break;
            case 'armor_pierce':
            case 'backline_strike':
            case 'bonus_vs_marked':
                if (log.caster && log.casterTeam) this.animateAttack(log.caster, log.casterTeam, log.target, log.targetTeam, log.isCrit || false);
                break;
            case 'emergency_heal':
                if (log.caster && log.casterTeam) {
                    this.animateHeal(log.caster, log.casterTeam, log.caster, log.casterTeam);
                }
                break;
            case 'protect_dodge':
                if (log.caster && log.casterTeam) this.animateDefend(log.caster, log.casterTeam);
                break;
            case 'transform_damage':
                if (log.target && log.targetTeam) {
                    const el = this.getCharacterElement(log.target, log.targetTeam);
                    if (el) {
                        el.classList.add('hurt');
                        setTimeout(() => el.classList.remove('hurt'), 400);
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
                setTimeout(() => el.classList.remove('buffed'), 800);
            }
        });
    }

    // === ANIMATIONS EXISTANTES ===

    animateAttack(attackerName, attackerTeam, targetName, targetTeam, isCrit) {
        const attacker = this.getCharacterElement(attackerName, attackerTeam);
        const target = this.getCharacterElement(targetName, targetTeam);

        if (attacker) {
            attacker.classList.add('attacking');
            setTimeout(() => attacker.classList.remove('attacking'), 600);
        }

        if (target) {
            setTimeout(() => {
                target.classList.add('hurt');
                if (isCrit) target.classList.add('crit');
                setTimeout(() => target.classList.remove('hurt', 'crit'), 400);
            }, 300);
        }
    }

    animateHeal(healerName, healerTeam, targetName, targetTeam) {
        const healer = this.getCharacterElement(healerName, healerTeam);
        const target = this.getCharacterElement(targetName, targetTeam);

        if (healer) {
            healer.classList.add('healing');
            setTimeout(() => healer.classList.remove('healing'), 800);
        }

        if (target) {
            target.classList.add('healed');
            setTimeout(() => target.classList.remove('healed'), 800);
        }
    }

    animateDefend(defenderName, defenderTeam) {
        const defender = this.getCharacterElement(defenderName, defenderTeam);
        if (defender) {
            defender.classList.add('defending');
            setTimeout(() => defender.classList.remove('defending'), 1000);
        }
    }

    animateDodge(targetName, targetTeam) {
        const target = this.getCharacterElement(targetName, targetTeam);
        if (target) {
            target.classList.add('dodging');
            setTimeout(() => target.classList.remove('dodging'), 600);
        }
    }

    animateDeath(targetName, targetTeam) {
        const target = this.getCharacterElement(targetName, targetTeam);
        if (target) {
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
        }

        // Mettre à jour si nous avons les données nécessaires
        if (characterName && teamName && currentHP !== null && currentHP !== undefined && maxHP) {
            this.updateCharacterHP(characterName, teamName, currentHP, maxHP);
        }
    }

    updateAbilityHealthBars(log) {
        // Compétences qui infligent des dégâts à une cible
        if (log.target && log.targetHP !== undefined && log.targetMaxHP) {
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

        // Finaliser le MMR a la fin du combat
        this.finalizeRating();
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

    updatePlayButton() {
        if (!this.playBtn) return;

        const _t = window._t || (k => k);
        if (this.isPlaying && !this.isPaused) {
            this.playBtn.textContent = _t('pause');
        } else if (this.currentIndex >= this.logs.length) {
            this.playBtn.textContent = _t('finished');
            this.playBtn.disabled = true;
        } else {
            this.playBtn.textContent = this.currentIndex > 0 ? _t('resume') : _t('start');
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
