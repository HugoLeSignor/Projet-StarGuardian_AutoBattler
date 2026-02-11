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
                console.error('❌ Erreur parsing logs:', e);
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
            case 'round': return 2000;         // 2 secondes pour les rounds
            case 'initiative': return 400;     // 0.4 secondes pour l'initiative
            case 'attack': return 2000;        // 2 secondes pour les attaques
            case 'heal': return 1800;          // 1.8 secondes pour les soins
            case 'defend': return 1500;        // 1.5 secondes pour la défense
            case 'dodge': return 1200;         // 1.2 secondes pour l'esquive
            case 'death': return 2500;         // 2.5 secondes pour la mort
            case 'protect': return 1500;       // 1.5 secondes pour la protection
            case 'victory':
            case 'draw': return 1000;          // 1 seconde pour la victoire
            default: return 800;               // 0.8 secondes par défaut
        }
    }

    processLog(log) {
        this.playAnimation(log);
        this.displayLog(log);

        // Synchroniser la mise à jour des HP avec l'animation
        // Les barres se mettent à jour quand le personnage "prend le coup"
        const hpDelay = this.getHPUpdateDelay(log);
        if (hpDelay > 0) {
            setTimeout(() => this.updateHealthBars(log), hpDelay / this.speed);
        } else {
            this.updateHealthBars(log);
        }
    }

    getHPUpdateDelay(log) {
        switch (log.type) {
            case 'attack': return 350;   // Après que l'attaque touche (300ms attaque + 50ms)
            case 'heal': return 400;     // Pendant l'animation de soin
            case 'death': return 0;      // Immédiat
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
        }
    }

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
        if (log.type === 'attack') {
            characterName = log.target;
            teamName = log.targetTeam;
            currentHP = log.targetHP;
            maxHP = log.targetMaxHP;
        } else if (log.type === 'heal') {
            characterName = log.target;
            teamName = log.targetTeam;
            currentHP = log.targetHP;
            maxHP = log.targetMaxHP;
        }

        // Mettre à jour si nous avons les données nécessaires
        if (characterName && teamName && currentHP !== null && currentHP !== undefined && maxHP) {
            this.updateCharacterHP(characterName, teamName, currentHP, maxHP);
        }
    }

    updateCharacterHP(characterName, teamName, currentHP, maxHP) {
        const target = this.getCharacterElement(characterName, teamName);

        if (!target) {
            console.error('❌ Character element not found for:', characterName, 'in team:', teamName);
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
