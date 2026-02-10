/*
 * Welcome to your app's main JavaScript file!
 */
import './styles/app.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import './js/combat.js';

/* ======================
   MENU BURGER
====================== */
document.addEventListener("DOMContentLoaded", () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".main-navigation");

    if (burger && nav) {
        burger.addEventListener("click", () => {
            nav.classList.toggle("active");
        });
    }
});


/* =================================================
   AUTRE PAGE (character select) — inchangé
================================================= */
document.addEventListener('DOMContentLoaded', () => {
    const characterCards = document.querySelectorAll('.character-card');
    const confirmBtn = document.querySelector('.btn-confirm');

    if (!confirmBtn || characterCards.length === 0) return;

    let selectedCharacter = null;

    characterCards.forEach(card => {
        card.addEventListener('click', (e) => {
            e.preventDefault();

            if (selectedCharacter && selectedCharacter !== card) {
                selectedCharacter.classList.remove('selected');
            }

            if (card.classList.contains('selected')) {
                card.classList.remove('selected');
                selectedCharacter = null;
                confirmBtn.disabled = true;
            } else {
                card.classList.add('selected');
                selectedCharacter = card;
                confirmBtn.disabled = false;
            }
        });
    });

    confirmBtn.addEventListener('click', () => {
        if (!selectedCharacter) return;

        const heroName = selectedCharacter.querySelector('.character-name').textContent;

        selectedCharacter.style.animation = 'pulse 0.4s ease';

        setTimeout(() => {
            alert(`Vous avez choisi : ${heroName}`);
        }, 300);
    });
});

// Animation pulse
const style = document.createElement('style');
style.textContent = `
@keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}`;
document.head.appendChild(style);


/* ================================
   PAGE TEAMS (CORRIGÉE)
================================ */

/* 🔧 MAX DES STATS (adapter à ta BDD / équilibrage) */
const STAT_MAX = {
    dmg: 100,
    speed: 100,
    dodge: 100,
    crit: 100,
    hp: 200
};

document.addEventListener('DOMContentLoaded', () => {
    const portraits = document.querySelectorAll('.team-portrait');
    const details = document.getElementById('teamDetails');
    const selectedList = document.querySelector('.selected-list');
    const launchBtn = document.querySelector('.btn-launch');

    if (!details || portraits.length === 0) return;

    const maxSelection = 3;
    let selectedHeroes = [];
        let selectedHeroIds = [];

    portraits.forEach(portrait => {
        portrait.addEventListener('click', () => {
            portraits.forEach(p => p.classList.remove('active'));
            portrait.classList.add('active');

            const id = portrait.dataset.id;
            const name = portrait.dataset.name;
            const role = portrait.dataset.role;
            const dmgMin = Number(portrait.dataset.dmgMin);
            const dmgMax = Number(portrait.dataset.dmgMax);
            const speed = Number(portrait.dataset.speed);
            const dodge = Number(portrait.dataset.dodge);
            const crit = Number(portrait.dataset.crit);
            const hp = Number(portrait.dataset.hp);
            const spriteFile = portrait.dataset.sprite;

            const spritePath = `/asset/sprites/${spriteFile}`;
            const isSelected = selectedHeroIds.includes(id);

            details.innerHTML = `
                <div class="team-details-content">
                    <h2>${name}</h2>
                    <p class="role">${role}</p>

                    <div class="gif-container">
                        <img src="${spritePath}" alt="Sprite de ${name}">
                    </div>

                    <div class="stats">
                        <div class="stat">
                            <span>DMG</span>
                            <div class="stat-bar">
                                <div class="stat-fill"
                                    style="width:${Math.min((dmgMax / STAT_MAX.dmg) * 100, 100)}%">
                                </div>
                            </div>
                            <span>${dmgMin} - ${dmgMax}</span>
                        </div>

                        <div class="stat">
                            <span>VIT</span>
                            <div class="stat-bar">
                                <div class="stat-fill"
                                    style="width:${Math.min((speed / STAT_MAX.speed) * 100, 100)}%">
                                </div>
                            </div>
                            <span>${speed}</span>
                        </div>

                        <div class="stat">
                            <span>DODGE</span>
                            <div class="stat-bar">
                                <div class="stat-fill"
                                    style="width:${Math.min((dodge / STAT_MAX.dodge) * 100, 100)}%">
                                </div>
                            </div>
                            <span>${dodge}</span>
                        </div>

                        <div class="stat">
                            <span>CRIT</span>
                            <div class="stat-bar">
                                <div class="stat-fill"
                                    style="width:${Math.min((crit / STAT_MAX.crit) * 100, 100)}%">
                                </div>
                            </div>
                            <span>${crit}</span>
                        </div>

                        <div class="stat">
                            <span>HP</span>
                            <div class="stat-bar">
                                <div class="stat-fill"
                                    style="width:${Math.min((hp / STAT_MAX.hp) * 100, 100)}%">
                                </div>
                            </div>
                            <span>${hp}</span>
                        </div>
                    </div>

                    <button class="btn-select-right">
                        ${isSelected ? 'Désélectionner' : 'Sélectionner'}
                    </button>
                </div>
            `;

            const btnRight = details.querySelector('.btn-select-right');
            btnRight.addEventListener('click', () => {
                if (selectedHeroIds.includes(id)) {
                    selectedHeroIds = selectedHeroIds.filter(hid => hid !== id);
                    selectedHeroes = selectedHeroes.filter(h => h !== name);
                    portrait.classList.remove('selected');
                } else {
                    if (selectedHeroIds.length >= maxSelection) {
                        alert("Vous pouvez sélectionner maximum 3 personnages !");
                        return;
                    }
                    selectedHeroIds.push(id);
                    selectedHeroes.push(name);
                    portrait.classList.add('selected');
                }

                updateSelectedTeam();
                btnRight.textContent = selectedHeroIds.includes(id)
                    ? 'Désélectionner'
                    : 'Sélectionner';
            });
        });
    });

    /*  ZONE ÉQUIPE — sprites seulement */
    function updateSelectedTeam() {
        selectedList.innerHTML = '';

        selectedHeroIds.forEach(id => {
            const hero = Array.from(portraits).find(p => p.dataset.id === id);
            if (!hero) return;
            const name = hero.dataset.name;
            const spritePath = `/asset/sprites/${hero.dataset.sprite}`;
            const heroEl = document.createElement('div');
            heroEl.classList.add('selected-hero-sprite');
            heroEl.innerHTML = `
                <img src="${spritePath}" alt="Sprite de ${name}">
                <span>${name}</span>
            `;
            selectedList.appendChild(heroEl);
        });
        if (launchBtn) {
            launchBtn.disabled = selectedHeroIds.length === 0;
        }
    }

    if (launchBtn) {
        launchBtn.addEventListener('click', () => {
            if (selectedHeroIds.length > 0) {
                // Envoi POST AJAX vers /teams/select
                fetch('/teams/select', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'X-Requested-With': 'XMLHttpRequest',
                    },
                    body: selectedHeroIds.map((id, i) => `character_ids[${i}]=${encodeURIComponent(id)}`).join('&')
                })
                .then(response => {
                    if (response.redirected) {
                        window.location.href = response.url;
                    } else {
                        // Redirige manuellement si pas de redirection
                        window.location.href = '/matchmaking';
                    }
                })
                .catch(() => {
                    alert('Erreur lors de la sélection de l\'équipe.');
                });
            }
        });
    }
});

console.log('assets/app.js chargé ✔');
