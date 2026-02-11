/*
 * Welcome to your app's main JavaScript file!
 */
import './styles/app.scss';
import '@fortawesome/fontawesome-free/css/all.css';
import './js/combat.js';
import './js/friends.js';

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


/* ================================
   PAGE TEAMS (CORRIGÉE)
================================ */

/* 🔧 MAX DES STATS (adapter à ta BDD / équilibrage) */
const STAT_MAX = {
    dmg: 30,
    speed: 12,
    dodge: 40,
    crit: 15,
    hp: 75
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

    // Composition obligatoire : 1 Tank, 1 DPS, 1 Support
    const ROLE_CATEGORIES = { 'Tank': 'Tank', 'DPS': 'DPS', 'Support': 'Support', 'Soigneur': 'Support', 'Buffer': 'Support' };

    function getSelectedRoles() {
        const roles = { Tank: 0, DPS: 0, Support: 0 };
        selectedHeroIds.forEach(id => {
            const p = Array.from(portraits).find(pp => pp.dataset.id === id);
            if (p) {
                const cat = ROLE_CATEGORIES[p.dataset.role] || 'Support';
                roles[cat]++;
            }
        });
        return roles;
    }

    function canSelectRole(role) {
        const cat = ROLE_CATEGORIES[role] || 'Support';
        const roles = getSelectedRoles();
        return roles[cat] < 1;
    }

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
                                <div class="stat-fill stat-fill--dmg"
                                    style="width:${Math.min((dmgMax / STAT_MAX.dmg) * 100, 100)}%">
                                </div>
                            </div>
                            <span>${dmgMin} - ${dmgMax}</span>
                        </div>

                        <div class="stat">
                            <span>VIT</span>
                            <div class="stat-bar">
                                <div class="stat-fill stat-fill--spd"
                                    style="width:${Math.min((speed / STAT_MAX.speed) * 100, 100)}%">
                                </div>
                            </div>
                            <span>${speed}</span>
                        </div>

                        <div class="stat">
                            <span>DODGE</span>
                            <div class="stat-bar">
                                <div class="stat-fill stat-fill--dodge"
                                    style="width:${Math.min((dodge / STAT_MAX.dodge) * 100, 100)}%">
                                </div>
                            </div>
                            <span>${dodge}</span>
                        </div>

                        <div class="stat">
                            <span>CRIT</span>
                            <div class="stat-bar">
                                <div class="stat-fill stat-fill--crit"
                                    style="width:${Math.min((crit / STAT_MAX.crit) * 100, 100)}%">
                                </div>
                            </div>
                            <span>${crit}</span>
                        </div>

                        <div class="stat">
                            <span>HP</span>
                            <div class="stat-bar">
                                <div class="stat-fill stat-fill--hp"
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
            const roleCat = ROLE_CATEGORIES[role] || 'Support';
            const alreadySelected = selectedHeroIds.includes(id);

            // Désactiver le bouton si le slot de ce rôle est déjà pris
            if (!alreadySelected && !canSelectRole(role)) {
                btnRight.disabled = true;
                btnRight.textContent = `Slot ${roleCat} déjà pris`;
            }

            btnRight.addEventListener('click', () => {
                if (selectedHeroIds.includes(id)) {
                    selectedHeroIds = selectedHeroIds.filter(hid => hid !== id);
                    selectedHeroes = selectedHeroes.filter(h => h !== name);
                    portrait.classList.remove('selected');
                } else {
                    if (!canSelectRole(role)) {
                        alert(`Vous avez déjà un ${roleCat} dans votre équipe !`);
                        return;
                    }
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
                btnRight.disabled = false;
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
        // Mettre à jour les indicateurs de rôles
        updateRoleIndicators();

        if (launchBtn) {
            const roles = getSelectedRoles();
            const teamComplete = roles.Tank === 1 && roles.DPS === 1 && roles.Support === 1;
            launchBtn.disabled = !teamComplete;
        }
    }

    function updateRoleIndicators() {
        const roles = getSelectedRoles();
        const indicator = document.querySelector('.role-indicator');
        if (indicator) {
            indicator.querySelectorAll('.role-slot').forEach(slot => {
                const cat = slot.dataset.role;
                if (roles[cat] === 1) {
                    slot.classList.add('filled');
                } else {
                    slot.classList.remove('filled');
                }
            });
        }
    }

    /* ================================
       PRESETS
    ================================ */
    const savePresetBtn = document.querySelector('.btn-save-preset');
    const presetModal = document.getElementById('presetModal');
    const presetNameInput = document.getElementById('presetName');
    const presetConfirmBtn = document.getElementById('presetConfirm');
    const presetCancelBtn = document.getElementById('presetCancel');

    // Mettre a jour le bouton sauvegarder selon la selection
    function updateSavePresetBtn() {
        if (savePresetBtn) {
            const roles = getSelectedRoles();
            const teamComplete = roles.Tank === 1 && roles.DPS === 1 && roles.Support === 1;
            savePresetBtn.disabled = !teamComplete;
        }
    }

    // Appeler updateSavePresetBtn a chaque changement de selection
    const originalUpdateSelectedTeam = updateSelectedTeam;
    // On surcharge en ajoutant l'appel
    const _origUpdate = updateSelectedTeam;

    // Patch: ajouter l'appel a updateSavePresetBtn dans updateSelectedTeam
    // On le fait en wrappant les indicateurs
    const _origRoleIndicators = updateRoleIndicators;

    // Ouvrir la modal
    if (savePresetBtn && presetModal) {
        savePresetBtn.addEventListener('click', () => {
            presetNameInput.value = '';
            presetModal.style.display = 'flex';
            setTimeout(() => presetNameInput.focus(), 100);
        });

        // Fermer la modal
        presetCancelBtn.addEventListener('click', () => {
            presetModal.style.display = 'none';
        });

        presetModal.querySelector('.preset-modal__backdrop').addEventListener('click', () => {
            presetModal.style.display = 'none';
        });

        // Sauvegarder le preset
        presetConfirmBtn.addEventListener('click', () => {
            const name = presetNameInput.value.trim();
            if (!name) {
                presetNameInput.style.borderColor = '#dc143c';
                return;
            }

            presetConfirmBtn.disabled = true;
            presetConfirmBtn.textContent = '...';

            fetch('/teams/presets/save', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                    name: name,
                    characterIds: selectedHeroIds.map(Number)
                })
            })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    // Recharger la page pour afficher le nouveau preset
                    window.location.reload();
                } else {
                    alert(data.error || 'Erreur lors de la sauvegarde');
                    presetConfirmBtn.disabled = false;
                    presetConfirmBtn.textContent = 'Sauvegarder';
                }
            })
            .catch(() => {
                alert('Erreur lors de la sauvegarde');
                presetConfirmBtn.disabled = false;
                presetConfirmBtn.textContent = 'Sauvegarder';
            });
        });

        // Enter pour valider
        presetNameInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') presetConfirmBtn.click();
            presetNameInput.style.borderColor = '';
        });
    }

    // Charger un preset (selection programmatique des personnages)
    function loadPreset(characterIds) {
        // Reset la selection actuelle
        selectedHeroIds = [];
        selectedHeroes = [];
        portraits.forEach(p => p.classList.remove('selected'));

        // Selectionner les personnages du preset
        characterIds.forEach(id => {
            const idStr = String(id);
            const portrait = Array.from(portraits).find(p => p.dataset.id === idStr);
            if (portrait) {
                selectedHeroIds.push(idStr);
                selectedHeroes.push(portrait.dataset.name);
                portrait.classList.add('selected');
            }
        });

        updateSelectedTeam();
        updateSavePresetBtn();
    }

    // Supprimer un preset
    function deletePreset(presetId, chipEl) {
        if (!confirm('Supprimer ce preset ?')) return;

        fetch(`/teams/presets/${presetId}`, {
            method: 'DELETE',
            headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then(res => res.json())
        .then(data => {
            if (data.success) {
                chipEl.remove();
                // Si plus de presets, cacher la barre
                const list = document.querySelector('.presets-bar__list');
                if (list && list.children.length === 0) {
                    document.querySelector('.presets-bar')?.remove();
                }
            }
        })
        .catch(() => alert('Erreur lors de la suppression'));
    }

    // Attacher les events aux chips de presets
    document.querySelectorAll('.preset-chip').forEach(chip => {
        const presetId = chip.dataset.presetId;
        const charIds = JSON.parse(chip.dataset.presetIds);

        chip.querySelector('.preset-chip__load').addEventListener('click', () => {
            loadPreset(charIds);
        });

        chip.querySelector('.preset-chip__delete').addEventListener('click', (e) => {
            e.stopPropagation();
            deletePreset(presetId, chip);
        });
    });

    // Observer les changements de selection pour le bouton save
    // On utilise un MutationObserver sur selectedList
    const selectedListObserver = new MutationObserver(() => updateSavePresetBtn());
    if (selectedList) {
        selectedListObserver.observe(selectedList, { childList: true });
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

/* ================================
   PROFILE POPUP
================================ */
document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('[data-profile-toggle]');
    const popup = document.querySelector('[data-profile-popup]');
    const backdrop = document.querySelector('[data-profile-backdrop]');
    const closeBtn = document.querySelector('[data-profile-close]');
    const content = document.querySelector('[data-profile-content]');

    if (!toggle || !popup) return;

    let loaded = false;

    function openPopup() {
        popup.style.display = 'block';
        backdrop.style.display = 'block';
        popup.offsetHeight; // reflow
        popup.classList.add('profile-popup--open');
        backdrop.classList.add('profile-popup__backdrop--open');

        if (!loaded) {
            fetchProfile();
        }
    }

    function closePopup() {
        popup.classList.remove('profile-popup--open');
        backdrop.classList.remove('profile-popup__backdrop--open');
        setTimeout(() => {
            popup.style.display = 'none';
            backdrop.style.display = 'none';
        }, 300);
    }

    toggle.addEventListener('click', openPopup);
    closeBtn.addEventListener('click', closePopup);
    backdrop.addEventListener('click', closePopup);

    function fetchProfile() {
        fetch('/api/profile')
            .then(res => res.json())
            .then(data => {
                loaded = true;
                renderProfile(data);
            })
            .catch(() => {
                content.innerHTML = '<p class="profile-popup__error">Erreur de chargement</p>';
            });
    }

    function renderProfile(data) {
        const resultClass = (r) => r === 'win' ? 'result--win' : r === 'loss' ? 'result--loss' : 'result--draw';
        const resultLabel = (r) => r === 'win' ? 'Victoire' : r === 'loss' ? 'D\u00e9faite' : 'Nul';

        const avatarHtml = data.profileImage
            ? `<img src="${data.profileImage}" alt="Avatar">`
            : `<i class="fas fa-user-circle"></i>`;

        let html = `
            <div class="profile-popup__identity">
                <div class="profile-popup__avatar">${avatarHtml}</div>
                <div class="profile-popup__info">
                    <span class="profile-popup__username">${data.username}</span>
                    ${data.motto ? `<span class="profile-popup__motto">\u00ab ${data.motto} \u00bb</span>` : ''}
                    ${data.bio ? `<p class="profile-popup__bio">${data.bio}</p>` : ''}
                </div>
            </div>

            <div class="profile-popup__stats">
                <div class="profile-stat">
                    <span class="profile-stat__value">${data.rating}</span>
                    <span class="profile-stat__label">MMR</span>
                </div>
                <div class="profile-stat">
                    <span class="profile-stat__value">${data.stats.wins}</span>
                    <span class="profile-stat__label">Victoires</span>
                </div>
                <div class="profile-stat">
                    <span class="profile-stat__value">${data.stats.losses}</span>
                    <span class="profile-stat__label">D\u00e9faites</span>
                </div>
                <div class="profile-stat">
                    <span class="profile-stat__value">${data.stats.winRate}%</span>
                    <span class="profile-stat__label">Win Rate</span>
                </div>
            </div>
        `;

        if (data.favoriteCharacter) {
            html += `
                <div class="profile-popup__section">
                    <h3 class="profile-popup__subtitle">
                        <i class="fas fa-star"></i> Champion Favori
                    </h3>
                    <div class="profile-favorite">
                        <span class="profile-favorite__name">${data.favoriteCharacter.name}</span>
                        <span class="profile-favorite__role">${data.favoriteCharacter.role}</span>
                        <span class="profile-favorite__count">${data.favoriteCharacter.gamesPlayed} parties</span>
                    </div>
                </div>
            `;
        }

        if (data.lastTeam.length > 0) {
            html += `
                <div class="profile-popup__section">
                    <h3 class="profile-popup__subtitle">
                        <i class="fas fa-users"></i> Derni\u00e8re \u00c9quipe
                    </h3>
                    <div class="profile-last-team">
                        ${data.lastTeam.map(c => `
                            <div class="profile-last-team__member">
                                <span class="profile-last-team__name">${c.name}</span>
                                <span class="profile-last-team__role">${c.role}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `;
        }

        if (data.recentBattles.length > 0) {
            html += `
                <div class="profile-popup__section">
                    <h3 class="profile-popup__subtitle">
                        <i class="fas fa-shield-alt"></i> Historique
                    </h3>
                    <div class="profile-history">
                        ${data.recentBattles.map(b => `
                            <a href="/arena/replay/${b.id}" class="profile-history__entry ${resultClass(b.result)}">
                                <span class="profile-history__result">${resultLabel(b.result)}</span>
                                <span class="profile-history__opponent">vs ${b.opponent}</span>
                                <span class="profile-history__type">${b.matchType.toUpperCase()}</span>
                                <span class="profile-history__date">${b.date}</span>
                                <i class="fas fa-play profile-history__replay"></i>
                            </a>
                        `).join('')}
                    </div>
                </div>
            `;
        } else {
            html += `
                <div class="profile-popup__section">
                    <p class="profile-popup__empty">Aucun combat enregistr\u00e9</p>
                </div>
            `;
        }

        html += `
            <div class="profile-popup__actions">
                <a href="/profile" class="profile-popup__edit-link">
                    <i class="fas fa-pen"></i> \u00c9diter le profil
                </a>
            </div>
        `;

        content.innerHTML = html;
    }
});

console.log('assets/app.js charg\u00e9 \u2714');
