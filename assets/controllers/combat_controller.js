import { Controller } from '@hotwired/stimulus';

export default class extends Controller {
    static targets = ['log', 'speed', 'playBtn', 'overlay', 'character'];
    static values = {
        logs: Array,
        speed: { type: Number, default: 1 }
    };

    connect() {
        this.currentIndex = 0;
        this.isPlaying = false;
        this.isPaused = false;
        this.characterElements = {};

        // Map des personnages par nom
        this.characterTargets.forEach(el => {
            const name = el.dataset.characterName;
            const team = el.dataset.characterTeam;
            this.characterElements[`${team}-${name}`] = el;
        });

        // Cacher l'overlay au début
        if (this.hasOverlayTarget) {
            this.overlayTarget.style.display = 'none';
            this.overlayTarget.style.opacity = '0';
        }

        // Vider le log au début
        if (this.hasLogTarget) {
            this.logTarget.innerHTML = '';
        }

        // Lancer automatiquement le combat après un court délai
        setTimeout(() => {
            this.play();
        }, 500);
    }

    // Démarrer/Reprendre le combat
    play() {
        if (this.isPlaying && !this.isPaused) return;

        this.isPlaying = true;
        this.isPaused = false;
        this.updatePlayButton();
        this.processNextLog();
    }

    // Pause
    pause() {
        this.isPaused = true;
        this.updatePlayButton();
    }

    // Toggle play/pause
    togglePlay() {
        if (!this.isPlaying || this.isPaused) {
            this.play();
        } else {
            this.pause();
        }
    }

    // Skip - aller à la fin
    skip() {
        this.isPlaying = false;
        this.isPaused = false;

        // Afficher tous les logs restants
        while (this.currentIndex < this.logsValue.length) {
            const log = this.logsValue[this.currentIndex];
            this.displayLog(log);
            this.currentIndex++;
        }

        this.showVictoryOverlay();
        this.updatePlayButton();
    }

    // Changer la vitesse
    setSpeed(event) {
        const speed = parseFloat(event.currentTarget.dataset.speed);
        this.speedValue = speed;

        // Mettre à jour l'UI des boutons de vitesse
        document.querySelectorAll('[data-speed]').forEach(btn => {
            btn.classList.remove('active');
        });
        event.currentTarget.classList.add('active');
    }

    // Traiter le prochain log
    processNextLog() {
        if (!this.isPlaying || this.isPaused) return;
        if (this.currentIndex >= this.logsValue.length) {
            this.isPlaying = false;
            this.showVictoryOverlay();
            this.updatePlayButton();
            return;
        }

        const log = this.logsValue[this.currentIndex];
        this.processLog(log);
        this.currentIndex++;

        // Calculer le délai selon le type d'action
        let delay = this.getDelayForLog(log);
        delay = delay / this.speedValue;

        setTimeout(() => this.processNextLog(), delay);
    }

    // Obtenir le délai pour un type de log
    getDelayForLog(log) {
        switch (log.type) {
            case 'round':
                return 1000;
            case 'initiative':
                return 200;
            case 'attack':
                return 1500;
            case 'heal':
                return 1200;
            case 'defend':
                return 1000;
            case 'dodge':
                return 800;
            case 'death':
                return 1500;
            case 'protect':
                return 800;
            case 'victory':
            case 'draw':
                return 500;
            default:
                return 500;
        }
    }

    // Traiter un log (animation + affichage)
    processLog(log) {
        // Jouer l'animation correspondante
        this.playAnimation(log);

        // Afficher le message dans le log
        this.displayLog(log);

        // Mettre à jour les barres de vie
        this.updateHealthBars(log);
    }

    // Jouer l'animation correspondante
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

    // Animation d'attaque
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
                setTimeout(() => {
                    target.classList.remove('hurt', 'crit');
                }, 400);
            }, 300);
        }
    }

    // Animation de soin
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

    // Animation de défense
    animateDefend(defenderName, defenderTeam) {
        const defender = this.getCharacterElement(defenderName, defenderTeam);
        if (defender) {
            defender.classList.add('defending');
            setTimeout(() => defender.classList.remove('defending'), 1000);
        }
    }

    // Animation d'esquive
    animateDodge(targetName, targetTeam) {
        const target = this.getCharacterElement(targetName, targetTeam);
        if (target) {
            target.classList.add('dodging');
            setTimeout(() => target.classList.remove('dodging'), 600);
        }
    }

    // Animation de mort
    animateDeath(targetName, targetTeam) {
        const target = this.getCharacterElement(targetName, targetTeam);
        if (target) {
            target.classList.add('dead');
        }
    }

    // Obtenir l'élément d'un personnage
    getCharacterElement(name, team) {
        return this.characterElements[`${team}-${name}`];
    }

    // Afficher un log
    displayLog(log) {
        if (!this.hasLogTarget) return;

        const entry = document.createElement('p');
        entry.className = 'combat-log__entry';

        // Ajouter classe selon le type
        if (log.type === 'round') {
            entry.classList.add('combat-log__entry--round');
        } else if (log.type === 'victory') {
            entry.classList.add('combat-log__entry--victory');
        } else if (log.type === 'draw') {
            entry.classList.add('combat-log__entry--defeat');
        }

        entry.innerHTML = log.message;
        this.logTarget.appendChild(entry);

        // Scroll vers le bas
        this.logTarget.scrollTop = this.logTarget.scrollHeight;
    }

    // Mettre à jour les barres de vie
    updateHealthBars(log) {
        if (log.type === 'attack' || log.type === 'heal') {
            const target = this.getCharacterElement(log.target, log.targetTeam);
            if (target) {
                const hpBar = target.querySelector('.hp-bar__fill');
                const hpText = target.querySelector('.hp-text');
                if (hpBar) {
                    const percent = (log.targetHP / log.targetMaxHP) * 100;
                    hpBar.style.width = `${percent}%`;

                    // Changer la couleur selon les PV
                    if (percent <= 25) {
                        hpBar.classList.add('hp-bar__fill--critical');
                    } else if (percent <= 50) {
                        hpBar.classList.add('hp-bar__fill--low');
                    }
                }
                if (hpText) {
                    hpText.textContent = `${log.targetHP}/${log.targetMaxHP}`;
                }
            }
        }
    }

    // Afficher l'overlay de victoire
    showVictoryOverlay() {
        if (this.hasOverlayTarget) {
            this.overlayTarget.style.display = 'flex';
            // Petit délai pour permettre l'animation CSS
            setTimeout(() => {
                this.overlayTarget.style.opacity = '1';
            }, 50);
        }
    }

    // Mettre à jour le bouton play
    updatePlayButton() {
        if (!this.hasPlayBtnTarget) return;

        if (this.isPlaying && !this.isPaused) {
            this.playBtnTarget.textContent = 'Pause';
            this.playBtnTarget.dataset.action = 'click->combat#pause';
        } else {
            this.playBtnTarget.textContent = this.currentIndex > 0 ? 'Reprendre' : 'Lancer';
            this.playBtnTarget.dataset.action = 'click->combat#play';
        }
    }
}
