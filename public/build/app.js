(self["webpackChunk"] = self["webpackChunk"] || []).push([["app"],{

/***/ "./assets/app.js"
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/app.scss */ "./assets/styles/app.scss");
/* harmony import */ var _fortawesome_fontawesome_free_css_all_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/all.css */ "./node_modules/@fortawesome/fontawesome-free/css/all.css");
/* harmony import */ var _js_combat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/combat.js */ "./assets/js/combat.js");
/* harmony import */ var _js_friends_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./js/friends.js */ "./assets/js/friends.js");
/* harmony import */ var _js_friends_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_js_friends_js__WEBPACK_IMPORTED_MODULE_3__);
/*
 * Welcome to your app's main JavaScript file!
 */





/* ======================
   UTILITAIRE SECURITE XSS
====================== */
function escapeHtml(str) {
  if (!str) return '';
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

/* ======================
   MENU BURGER
====================== */
document.addEventListener("DOMContentLoaded", function () {
  var burger = document.querySelector(".burger");
  var nav = document.querySelector(".main-navigation");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      nav.classList.toggle("active");
    });
  }
});

/* ================================
   PAGE TEAMS (CORRIGÉE)
================================ */

/* 🔧 MAX DES STATS (adapter à ta BDD / équilibrage) */
var STAT_MAX = {
  dmg: 30,
  speed: 12,
  dodge: 40,
  crit: 15,
  hp: 75
};
document.addEventListener('DOMContentLoaded', function () {
  var portraits = document.querySelectorAll('.team-portrait');
  var details = document.getElementById('teamDetails');
  var selectedList = document.querySelector('.selected-list');
  var launchBtn = document.querySelector('.btn-launch');
  if (!details || portraits.length === 0) return;
  var maxSelection = 4;
  var selectedHeroes = [];
  var selectedHeroIds = [];

  // Composition obligatoire : 1 Tank, 1 DPS, 1 Healer, 1 Support
  // La categorie vient directement du data-category (calcule cote serveur)
  function getCategory(portrait) {
    return portrait.dataset.category || 'Support';
  }
  function getSelectedRoles() {
    var roles = {
      Tank: 0,
      DPS: 0,
      Healer: 0,
      Support: 0
    };
    selectedHeroIds.forEach(function (id) {
      var p = Array.from(portraits).find(function (pp) {
        return pp.dataset.id === id;
      });
      if (p) {
        var cat = getCategory(p);
        roles[cat]++;
      }
    });
    return roles;
  }
  function canSelectRole(portraitEl) {
    var cat = getCategory(portraitEl);
    var roles = getSelectedRoles();
    return roles[cat] < 1;
  }
  portraits.forEach(function (portrait) {
    portrait.addEventListener('click', function () {
      portraits.forEach(function (p) {
        return p.classList.remove('active');
      });
      portrait.classList.add('active');
      var id = portrait.dataset.id;
      var name = portrait.dataset.name;
      var role = portrait.dataset.role;
      var dmgMin = Number(portrait.dataset.dmgMin);
      var dmgMax = Number(portrait.dataset.dmgMax);
      var speed = Number(portrait.dataset.speed);
      var dodge = Number(portrait.dataset.dodge);
      var crit = Number(portrait.dataset.crit);
      var hp = Number(portrait.dataset.hp);
      var spriteFile = portrait.dataset.sprite;
      var abilityName = portrait.dataset.abilityName || '';
      var abilityDesc = portrait.dataset.abilityDesc || '';
      var abilityCd = portrait.dataset.abilityCd || '';
      var spritePath = "/asset/sprites/".concat(spriteFile);
      var isSelected = selectedHeroIds.includes(id);
      var abilityHtml = abilityName ? "\n                    <div class=\"ability-section\">\n                        <div class=\"ability-section__header\">\n                            <i class=\"fas fa-fire-alt\"></i>\n                            <span class=\"ability-section__name\">".concat(escapeHtml(abilityName), "</span>\n                            <span class=\"ability-section__cd\"><i class=\"fas fa-hourglass-half\"></i> ").concat(escapeHtml(abilityCd), "T</span>\n                        </div>\n                        <p class=\"ability-section__desc\">").concat(escapeHtml(abilityDesc), "</p>\n                    </div>\n            ") : '';

      // Build synergy info for this character
      var charSynergies = synergyMap[name] || [];
      var synergyHtml = '';
      if (charSynergies.length > 0) {
        synergyHtml = "\n                    <div class=\"synergy-section\">\n                        <div class=\"synergy-section__header\">\n                            <i class=\"fas fa-link\"></i>\n                            <span class=\"synergy-section__title\">Synergies</span>\n                        </div>\n                        ".concat(charSynergies.map(function (s) {
          return "\n                            <div class=\"synergy-section__item ".concat(selectedHeroes.includes(s.partner) ? 'synergy-section__item--active' : '', "\">\n                                <span class=\"synergy-section__partner\">").concat(escapeHtml(s.partner), "</span>\n                                <span class=\"synergy-section__sname\">").concat(escapeHtml(s.name), "</span>\n                                <p class=\"synergy-section__desc\">").concat(escapeHtml(s.desc), "</p>\n                            </div>\n                        ");
        }).join(''), "\n                    </div>\n                ");
      }
      details.innerHTML = "\n                <div class=\"team-details-content\">\n                    <h2>".concat(name, "</h2>\n                    <p class=\"role\">").concat(role, "</p>\n\n                    <div class=\"gif-container\">\n                        <img src=\"").concat(spritePath, "\" alt=\"Sprite de ").concat(name, "\">\n                    </div>\n\n                    <div class=\"stats\">\n                        <div class=\"stat\">\n                            <span>DMG</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--dmg\"\n                                    style=\"width:").concat(Math.min(dmgMax / STAT_MAX.dmg * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(dmgMin, " - ").concat(dmgMax, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>VIT</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--spd\"\n                                    style=\"width:").concat(Math.min(speed / STAT_MAX.speed * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(speed, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>DODGE</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--dodge\"\n                                    style=\"width:").concat(Math.min(dodge / STAT_MAX.dodge * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(dodge, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>CRIT</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--crit\"\n                                    style=\"width:").concat(Math.min(crit / STAT_MAX.crit * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(crit, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>HP</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--hp\"\n                                    style=\"width:").concat(Math.min(hp / STAT_MAX.hp * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(hp, "</span>\n                        </div>\n                    </div>\n\n                    ").concat(abilityHtml, "\n                    ").concat(synergyHtml, "\n\n                    <button class=\"btn-select-right\">\n                        ").concat(isSelected ? 'Désélectionner' : 'Sélectionner', "\n                    </button>\n                </div>\n            ");
      var btnRight = details.querySelector('.btn-select-right');
      var roleCat = getCategory(portrait);
      var alreadySelected = selectedHeroIds.includes(id);

      // Désactiver le bouton si le slot de ce rôle est déjà pris
      if (!alreadySelected && !canSelectRole(portrait)) {
        btnRight.disabled = true;
        btnRight.textContent = "Slot ".concat(roleCat, " d\xE9j\xE0 pris");
      }
      btnRight.addEventListener('click', function () {
        if (selectedHeroIds.includes(id)) {
          selectedHeroIds = selectedHeroIds.filter(function (hid) {
            return hid !== id;
          });
          selectedHeroes = selectedHeroes.filter(function (h) {
            return h !== name;
          });
          portrait.classList.remove('selected');
        } else {
          if (!canSelectRole(portrait)) {
            alert("Vous avez d\xE9j\xE0 un ".concat(roleCat, " dans votre \xE9quipe !"));
            return;
          }
          if (selectedHeroIds.length >= maxSelection) {
            alert("Vous pouvez sélectionner maximum 4 personnages !");
            return;
          }
          selectedHeroIds.push(id);
          selectedHeroes.push(name);
          portrait.classList.add('selected');
        }
        updateSelectedTeam();
        btnRight.textContent = selectedHeroIds.includes(id) ? 'Désélectionner' : 'Sélectionner';
        btnRight.disabled = false;
      });
    });
  });

  // === SYNERGY SYSTEM ===
  var teamsPageEl = document.querySelector('.teams-page');
  var synergyMap = teamsPageEl ? JSON.parse(teamsPageEl.dataset.synergyMap || '{}') : {};

  /*  ZONE ÉQUIPE — sprites seulement */
  function updateSelectedTeam() {
    selectedList.innerHTML = '';
    selectedHeroIds.forEach(function (id) {
      var hero = Array.from(portraits).find(function (p) {
        return p.dataset.id === id;
      });
      if (!hero) return;
      var name = hero.dataset.name;
      var spritePath = "/asset/sprites/".concat(hero.dataset.sprite);
      var heroEl = document.createElement('div');
      heroEl.classList.add('selected-hero-sprite');
      heroEl.innerHTML = "\n                <img src=\"".concat(spritePath, "\" alt=\"Sprite de ").concat(name, "\">\n                <span>").concat(name, "</span>\n            ");
      selectedList.appendChild(heroEl);
    });
    // Mettre à jour les indicateurs de rôles
    updateRoleIndicators();

    // Mettre à jour les synergies
    updateSynergyHighlights();
    if (launchBtn) {
      var roles = getSelectedRoles();
      var teamComplete = roles.Tank === 1 && roles.DPS === 1 && roles.Healer === 1 && roles.Support === 1;
      launchBtn.disabled = !teamComplete;
    }
  }
  function updateSynergyHighlights() {
    // Remove all existing synergy highlights
    portraits.forEach(function (p) {
      p.classList.remove('synergy-available', 'synergy-active');
      var badge = p.querySelector('.synergy-badge');
      if (badge) badge.remove();
    });
    if (selectedHeroIds.length === 0) return;

    // Get names of selected heroes
    var selectedNames = selectedHeroIds.map(function (id) {
      var p = Array.from(portraits).find(function (pp) {
        return pp.dataset.id === id;
      });
      return p ? p.dataset.name : null;
    }).filter(Boolean);

    // Find active synergies (both members selected)
    var activeSynergies = [];
    var seenPairs = new Set();
    selectedNames.forEach(function (name) {
      var synergies = synergyMap[name] || [];
      synergies.forEach(function (syn) {
        if (selectedNames.includes(syn.partner)) {
          var pairKey = [name, syn.partner].sort().join('+');
          if (!seenPairs.has(pairKey)) {
            seenPairs.add(pairKey);
            activeSynergies.push({
              name1: name,
              name2: syn.partner,
              synergyName: syn.name,
              desc: syn.desc
            });
          }
        }
      });
    });

    // Mark selected portraits with active synergy
    activeSynergies.forEach(function (syn) {
      portraits.forEach(function (p) {
        if ((p.dataset.name === syn.name1 || p.dataset.name === syn.name2) && selectedHeroIds.includes(p.dataset.id)) {
          p.classList.add('synergy-active');
        }
      });
    });

    // Highlight unselected portraits that have synergy with selected heroes
    portraits.forEach(function (p) {
      if (selectedHeroIds.includes(p.dataset.id)) return;
      var pName = p.dataset.name;
      var charSynergies = synergyMap[pName] || [];
      var matching = charSynergies.filter(function (syn) {
        return selectedNames.includes(syn.partner);
      });
      if (matching.length > 0) {
        p.classList.add('synergy-available');
        var badge = document.createElement('div');
        badge.className = 'synergy-badge';
        badge.innerHTML = '<i class="fas fa-link"></i>';
        badge.title = matching.map(function (s) {
          return s.name;
        }).join(', ');
        p.appendChild(badge);
      }
    });

    // Update the synergy display panel
    updateSynergyDisplay(activeSynergies);
  }
  function updateSynergyDisplay(activeSynergies) {
    var container = document.querySelector('.synergy-display');
    if (!container) {
      container = document.createElement('div');
      container.className = 'synergy-display';
      var actions = document.querySelector('.selected-team__actions');
      if (actions) {
        actions.parentNode.insertBefore(container, actions);
      }
    }
    if (activeSynergies.length === 0) {
      container.innerHTML = '';
      return;
    }
    container.innerHTML = "\n            <div class=\"synergy-display__title\">\n                <i class=\"fas fa-link\"></i> Synergies actives\n            </div>\n            ".concat(activeSynergies.map(function (s) {
      return "\n                <div class=\"synergy-display__item\">\n                    <span class=\"synergy-display__name\">".concat(escapeHtml(s.synergyName), "</span>\n                    <span class=\"synergy-display__chars\">").concat(escapeHtml(s.name1), " + ").concat(escapeHtml(s.name2), "</span>\n                    <span class=\"synergy-display__desc\">").concat(escapeHtml(s.desc), "</span>\n                </div>\n            ");
    }).join(''), "\n        ");
  }
  function updateRoleIndicators() {
    var roles = getSelectedRoles();
    var indicator = document.querySelector('.role-indicator');
    if (indicator) {
      indicator.querySelectorAll('.role-slot').forEach(function (slot) {
        var cat = slot.dataset.role;
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
  var savePresetBtn = document.querySelector('.btn-save-preset');
  var presetModal = document.getElementById('presetModal');
  var presetNameInput = document.getElementById('presetName');
  var presetConfirmBtn = document.getElementById('presetConfirm');
  var presetCancelBtn = document.getElementById('presetCancel');

  // Mettre a jour le bouton sauvegarder selon la selection
  function updateSavePresetBtn() {
    if (savePresetBtn) {
      var roles = getSelectedRoles();
      var teamComplete = roles.Tank === 1 && roles.DPS === 1 && roles.Healer === 1 && roles.Support === 1;
      savePresetBtn.disabled = !teamComplete;
    }
  }

  // Appeler updateSavePresetBtn a chaque changement de selection
  var originalUpdateSelectedTeam = updateSelectedTeam;
  // On surcharge en ajoutant l'appel
  var _origUpdate = updateSelectedTeam;

  // Patch: ajouter l'appel a updateSavePresetBtn dans updateSelectedTeam
  // On le fait en wrappant les indicateurs
  var _origRoleIndicators = updateRoleIndicators;

  // Ouvrir la modal
  if (savePresetBtn && presetModal) {
    savePresetBtn.addEventListener('click', function () {
      presetNameInput.value = '';
      presetModal.style.display = 'flex';
      setTimeout(function () {
        return presetNameInput.focus();
      }, 100);
    });

    // Fermer la modal
    presetCancelBtn.addEventListener('click', function () {
      presetModal.style.display = 'none';
    });
    presetModal.querySelector('.preset-modal__backdrop').addEventListener('click', function () {
      presetModal.style.display = 'none';
    });

    // Sauvegarder le preset
    presetConfirmBtn.addEventListener('click', function () {
      var name = presetNameInput.value.trim();
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
          'X-Requested-With': 'XMLHttpRequest'
        },
        body: JSON.stringify({
          name: name,
          characterIds: selectedHeroIds.map(Number)
        })
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data.success) {
          // Recharger la page pour afficher le nouveau preset
          window.location.reload();
        } else {
          alert(data.error || 'Erreur lors de la sauvegarde');
          presetConfirmBtn.disabled = false;
          presetConfirmBtn.textContent = 'Sauvegarder';
        }
      })["catch"](function () {
        alert('Erreur lors de la sauvegarde');
        presetConfirmBtn.disabled = false;
        presetConfirmBtn.textContent = 'Sauvegarder';
      });
    });

    // Enter pour valider
    presetNameInput.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') presetConfirmBtn.click();
      presetNameInput.style.borderColor = '';
    });
  }

  // Charger un preset (selection programmatique des personnages)
  function loadPreset(characterIds) {
    // Reset la selection actuelle
    selectedHeroIds = [];
    selectedHeroes = [];
    portraits.forEach(function (p) {
      return p.classList.remove('selected');
    });

    // Selectionner les personnages du preset
    characterIds.forEach(function (id) {
      var idStr = String(id);
      var portrait = Array.from(portraits).find(function (p) {
        return p.dataset.id === idStr;
      });
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
    fetch("/teams/presets/".concat(presetId), {
      method: 'DELETE',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.success) {
        chipEl.remove();
        // Si plus de presets, cacher la barre
        var list = document.querySelector('.presets-bar__list');
        if (list && list.children.length === 0) {
          var _document$querySelect;
          (_document$querySelect = document.querySelector('.presets-bar')) === null || _document$querySelect === void 0 || _document$querySelect.remove();
        }
      }
    })["catch"](function () {
      return alert('Erreur lors de la suppression');
    });
  }

  // Attacher les events aux chips de presets
  document.querySelectorAll('.preset-chip').forEach(function (chip) {
    var presetId = chip.dataset.presetId;
    var charIds = JSON.parse(chip.dataset.presetIds);
    chip.querySelector('.preset-chip__load').addEventListener('click', function () {
      loadPreset(charIds);
    });
    chip.querySelector('.preset-chip__delete').addEventListener('click', function (e) {
      e.stopPropagation();
      deletePreset(presetId, chip);
    });
  });

  // Observer les changements de selection pour le bouton save
  // On utilise un MutationObserver sur selectedList
  var selectedListObserver = new MutationObserver(function () {
    return updateSavePresetBtn();
  });
  if (selectedList) {
    selectedListObserver.observe(selectedList, {
      childList: true
    });
  }
  if (launchBtn) {
    launchBtn.addEventListener('click', function () {
      if (selectedHeroIds.length > 0) {
        // Envoi POST AJAX vers /teams/select
        fetch('/teams/select', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
          },
          body: selectedHeroIds.map(function (id, i) {
            return "character_ids[".concat(i, "]=").concat(encodeURIComponent(id));
          }).join('&')
        }).then(function (response) {
          if (response.redirected) {
            window.location.href = response.url;
          } else {
            // Redirige manuellement si pas de redirection
            window.location.href = '/matchmaking';
          }
        })["catch"](function () {
          alert('Erreur lors de la sélection de l\'équipe.');
        });
      }
    });
  }
});

/* ================================
   PROFILE POPUP
================================ */
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('[data-profile-toggle]');
  var popup = document.querySelector('[data-profile-popup]');
  var backdrop = document.querySelector('[data-profile-backdrop]');
  var closeBtn = document.querySelector('[data-profile-close]');
  var content = document.querySelector('[data-profile-content]');
  if (!toggle || !popup) return;
  var loaded = false;
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
    setTimeout(function () {
      popup.style.display = 'none';
      backdrop.style.display = 'none';
    }, 300);
  }
  toggle.addEventListener('click', openPopup);
  closeBtn.addEventListener('click', closePopup);
  backdrop.addEventListener('click', closePopup);
  function fetchProfile() {
    fetch('/api/profile').then(function (res) {
      return res.json();
    }).then(function (data) {
      loaded = true;
      renderProfile(data);
    })["catch"](function () {
      content.innerHTML = '<p class="profile-popup__error">Erreur de chargement</p>';
    });
  }
  function renderProfile(data) {
    var resultClass = function resultClass(r) {
      return r === 'win' ? 'result--win' : r === 'loss' ? 'result--loss' : 'result--draw';
    };
    var resultLabel = function resultLabel(r) {
      return r === 'win' ? 'Victoire' : r === 'loss' ? "D\xE9faite" : 'Nul';
    };
    var avatarHtml = data.profileImage ? "<img src=\"".concat(escapeHtml(data.profileImage), "\" alt=\"Avatar de ").concat(escapeHtml(data.username), "\">") : "<i class=\"fas fa-user-circle\" aria-hidden=\"true\"></i>";
    var html = "\n            <div class=\"profile-popup__identity\">\n                <div class=\"profile-popup__avatar\">".concat(avatarHtml, "</div>\n                <div class=\"profile-popup__info\">\n                    <span class=\"profile-popup__username\">").concat(escapeHtml(data.username), "</span>\n                    ").concat(data.motto ? "<span class=\"profile-popup__motto\">\xAB ".concat(escapeHtml(data.motto), " \xBB</span>") : '', "\n                    ").concat(data.bio ? "<p class=\"profile-popup__bio\">".concat(escapeHtml(data.bio), "</p>") : '', "\n                </div>\n            </div>\n\n            <div class=\"profile-popup__stats\">\n                <div class=\"profile-stat\">\n                    <span class=\"profile-stat__value\">").concat(escapeHtml(String(data.rating)), "</span>\n                    <span class=\"profile-stat__label\">MMR</span>\n                </div>\n                <div class=\"profile-stat\">\n                    <span class=\"profile-stat__value\">").concat(escapeHtml(String(data.stats.wins)), "</span>\n                    <span class=\"profile-stat__label\">Victoires</span>\n                </div>\n                <div class=\"profile-stat\">\n                    <span class=\"profile-stat__value\">").concat(escapeHtml(String(data.stats.losses)), "</span>\n                    <span class=\"profile-stat__label\">D\xE9faites</span>\n                </div>\n                <div class=\"profile-stat\">\n                    <span class=\"profile-stat__value\">").concat(escapeHtml(String(data.stats.winRate)), "%</span>\n                    <span class=\"profile-stat__label\">Win Rate</span>\n                </div>\n            </div>\n        ");
    if (data.favoriteCharacter) {
      html += "\n                <div class=\"profile-popup__section\">\n                    <h3 class=\"profile-popup__subtitle\">\n                        <i class=\"fas fa-star\" aria-hidden=\"true\"></i> Champion Favori\n                    </h3>\n                    <div class=\"profile-favorite\">\n                        <span class=\"profile-favorite__name\">".concat(escapeHtml(data.favoriteCharacter.name), "</span>\n                        <span class=\"profile-favorite__role\">").concat(escapeHtml(data.favoriteCharacter.role), "</span>\n                        <span class=\"profile-favorite__count\">").concat(escapeHtml(String(data.favoriteCharacter.gamesPlayed)), " parties</span>\n                    </div>\n                </div>\n            ");
    }
    if (data.lastTeam.length > 0) {
      html += "\n                <div class=\"profile-popup__section\">\n                    <h3 class=\"profile-popup__subtitle\">\n                        <i class=\"fas fa-users\" aria-hidden=\"true\"></i> Derni\xE8re \xC9quipe\n                    </h3>\n                    <div class=\"profile-last-team\">\n                        ".concat(data.lastTeam.map(function (c) {
        return "\n                            <div class=\"profile-last-team__member\">\n                                <span class=\"profile-last-team__name\">".concat(escapeHtml(c.name), "</span>\n                                <span class=\"profile-last-team__role\">").concat(escapeHtml(c.role), "</span>\n                            </div>\n                        ");
      }).join(''), "\n                    </div>\n                </div>\n            ");
    }
    if (data.recentBattles.length > 0) {
      html += "\n                <div class=\"profile-popup__section\">\n                    <h3 class=\"profile-popup__subtitle\">\n                        <i class=\"fas fa-shield-alt\" aria-hidden=\"true\"></i> Historique\n                    </h3>\n                    <div class=\"profile-history\">\n                        ".concat(data.recentBattles.map(function (b) {
        return "\n                            <a href=\"/arena/replay/".concat(parseInt(b.id, 10), "\" class=\"profile-history__entry ").concat(resultClass(b.result), "\">\n                                <span class=\"profile-history__result\">").concat(resultLabel(b.result), "</span>\n                                <span class=\"profile-history__opponent\">vs ").concat(escapeHtml(b.opponent), "</span>\n                                <span class=\"profile-history__type\">").concat(escapeHtml(b.matchType).toUpperCase(), "</span>\n                                <span class=\"profile-history__date\">").concat(escapeHtml(b.date), "</span>\n                                <i class=\"fas fa-play profile-history__replay\" aria-hidden=\"true\"></i>\n                            </a>\n                        ");
      }).join(''), "\n                    </div>\n                </div>\n            ");
    } else {
      html += "\n                <div class=\"profile-popup__section\">\n                    <p class=\"profile-popup__empty\">Aucun combat enregistr\xE9</p>\n                </div>\n            ";
    }
    html += "\n            <div class=\"profile-popup__actions\">\n                <a href=\"/profile\" class=\"profile-popup__edit-link\">\n                    <i class=\"fas fa-pen\" aria-hidden=\"true\"></i> \xC9diter le profil\n                </a>\n            </div>\n        ";
    content.innerHTML = html;
  }
});

/***/ },

/***/ "./assets/js/combat.js"
/*!*****************************!*\
  !*** ./assets/js/combat.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/**
 * Combat Animation Controller
 * Gère l'affichage progressif des logs de combat avec animations
 */
var CombatController = /*#__PURE__*/function () {
  function CombatController(container) {
    _classCallCheck(this, CombatController);
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
  return _createClass(CombatController, [{
    key: "init",
    value: function init() {
      var _this = this;
      // Récupérer les logs depuis l'attribut data
      var logsData = this.container.dataset.combatLogs;
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
      this.container.querySelectorAll('[data-character-name]').forEach(function (el) {
        var name = el.dataset.characterName;
        var team = el.dataset.characterTeam;
        var key = "".concat(team, "-").concat(name);
        _this.characterElements[key] = el;
        _this.characterSlugs[key] = el.dataset.characterSlug || '';
        _this.characterHasHeal[key] = el.dataset.hasHeal === 'true';

        // Extraire le HP max depuis le texte initial
        var hpText = el.querySelector('.hp-text');
        if (hpText) {
          var match = hpText.textContent.match(/(\d+)\/(\d+)/);
          if (match) {
            _this.characterMaxHP[key] = parseInt(match[2]);
          }
        }

        // Initialiser les statuts vides
        _this.characterStatuses[key] = _this.createEmptyStatuses();
      });

      // Map des éléments d'ability dans les info panels
      this.abilityElements = {};
      this.container.querySelectorAll('.character-info[data-char-name]').forEach(function (el) {
        var name = el.dataset.charName;
        var team = el.dataset.charTeam;
        var key = "".concat(team, "-").concat(name);
        var abilityEl = el.querySelector('.character-info__ability');
        if (abilityEl) {
          _this.abilityElements[key] = {
            el: abilityEl,
            maxCd: parseInt(abilityEl.dataset.abilityMaxCd) || 0,
            badge: abilityEl.querySelector('.character-info__ability-cd-badge'),
            nameEl: abilityEl.querySelector('.character-info__ability-name'),
            iconEl: abilityEl.querySelector('i')
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
      this.volume = 0.4;
      this.sfxVolume = 0.6;
      this.combatPlaylist = ['/asset/audio/combat/butchersboulevardmusic.mp3', '/asset/audio/combat/combatintheruins.mp3'];
      this.sfxCache = {};
      this.muteBtn = this.container.querySelector('[data-audio-mute]');
      this.volumeSlider = this.container.querySelector('[data-audio-volume]');
      this.sfxSlider = this.container.querySelector('[data-sfx-volume]');

      // Event listeners
      this.bindEvents();

      // Lancer automatiquement après un délai
      setTimeout(function () {
        return _this.play();
      }, 800);
    }

    // === STATUS TRACKING ===
  }, {
    key: "createEmptyStatuses",
    value: function createEmptyStatuses() {
      return {
        bleeding: 0,
        blighted: 0,
        stunned: false,
        marked: 0,
        "protected": 0,
        stealthed: 0,
        riposte: 0,
        dmgUp: 0,
        spdUp: 0,
        dodgeUp: 0,
        critUp: 0
      };
    }
  }, {
    key: "updateCharacterStatuses",
    value: function updateCharacterStatuses(log) {
      switch (log.type) {
        case 'round':
          this.tickRoundStatuses();
          return;
        // tickRoundStatuses already calls renderAllStatusIcons

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
            var key = "".concat(log.attackerTeam, "-").concat(log.attacker);
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
  }, {
    key: "handleAbilityStatusChange",
    value: function handleAbilityStatusChange(log) {
      switch (log.subtype) {
        case 'bleed_attack':
          if (log.target && log.targetTeam) {
            this.setStatus(log.target, log.targetTeam, 'bleeding', log.bleedTurns || 3);
          }
          break;
        case 'blight_attack':
          if (log.allHits) {
            var primary = log.allHits.find(function (h) {
              return h.isPrimary;
            });
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
            var tKey = "".concat(log.targetTeam, "-").concat(log.target);
            // We can't know for sure if removeOnHit, so leave the icon - it will tick down
          }
          break;
      }
    }
  }, {
    key: "handleSynergyStatusChange",
    value: function handleSynergyStatusChange(log) {
      var _this2 = this;
      if (!log.effectType) return;
      switch (log.effectType) {
        case 'grant_riposte':
          this.setStatus(log.partnerChar, log.partnerCharTeam, 'riposte', log.grantedTurns || 1);
          break;
        case 'temp_buff':
          if (log.buffTypes) {
            var duration = log.buffDuration || 2;
            log.buffTypes.forEach(function (type) {
              var statusKey = _this2.buffTypeToStatusKey(type);
              if (statusKey) {
                _this2.setStatus(log.partnerChar, log.partnerCharTeam, statusKey, duration);
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
            var key = "".concat(log.partnerCharTeam, "-").concat(log.partnerChar);
            if (this.characterStatuses[key]) {
              this.characterStatuses[key].stealthed += log.extraTurns || 1;
            }
          }
          break;
        case 'guaranteed_crit':
          this.setStatus(log.partnerChar, log.partnerCharTeam, 'critUp', 1);
          break;
      }
    }
  }, {
    key: "buffTypeToStatusKey",
    value: function buffTypeToStatusKey(type) {
      switch (type) {
        case 'damage':
          return 'dmgUp';
        case 'speed':
          return 'spdUp';
        case 'dodge':
          return 'dodgeUp';
        case 'crit':
          return 'critUp';
        default:
          return null;
      }
    }
  }, {
    key: "applyBuffStatuses",
    value: function applyBuffStatuses(charName, teamName, buffs, duration) {
      if (!buffs) return;
      var key = "".concat(teamName, "-").concat(charName);
      var s = this.characterStatuses[key];
      if (!s) return;
      if (buffs.damage && buffs.damage > 0) s.dmgUp = Math.max(s.dmgUp, duration);
      if (buffs.speed && buffs.speed > 0) s.spdUp = Math.max(s.spdUp, duration);
      if (buffs.dodge && buffs.dodge > 0) s.dodgeUp = Math.max(s.dodgeUp, duration);
      if (buffs.crit && buffs.crit > 0) s.critUp = Math.max(s.critUp, duration);
    }
  }, {
    key: "applyTeamBuffStatuses",
    value: function applyTeamBuffStatuses(teamName, buffs, duration) {
      if (!buffs) return;
      for (var _i = 0, _Object$keys = Object.keys(this.characterStatuses); _i < _Object$keys.length; _i++) {
        var key = _Object$keys[_i];
        if (key.startsWith(teamName + '-')) {
          var s = this.characterStatuses[key];
          if (buffs.damage && buffs.damage > 0) s.dmgUp = Math.max(s.dmgUp, duration);
          if (buffs.speed && buffs.speed > 0) s.spdUp = Math.max(s.spdUp, duration);
          if (buffs.dodge && buffs.dodge > 0) s.dodgeUp = Math.max(s.dodgeUp, duration);
          if (buffs.crit && buffs.crit > 0) s.critUp = Math.max(s.critUp, duration);
        }
      }
    }
  }, {
    key: "setStatus",
    value: function setStatus(charName, teamName, statusKey, value) {
      var key = "".concat(teamName, "-").concat(charName);
      if (!this.characterStatuses[key]) return;
      this.characterStatuses[key][statusKey] = value;
    }
  }, {
    key: "clearAllStatuses",
    value: function clearAllStatuses(charName, teamName) {
      var key = "".concat(teamName, "-").concat(charName);
      if (this.characterStatuses[key]) {
        this.characterStatuses[key] = this.createEmptyStatuses();
      }
    }
  }, {
    key: "tickRoundStatuses",
    value: function tickRoundStatuses() {
      for (var _i2 = 0, _Object$keys2 = Object.keys(this.characterStatuses); _i2 < _Object$keys2.length; _i2++) {
        var key = _Object$keys2[_i2];
        var s = this.characterStatuses[key];
        // DOTs: NOT decremented here, handled by bleed_tick/blight_tick logs
        // Decrement duration-based statuses (skip permanent buffs >= 999)
        if (s.marked > 0 && s.marked < 999) s.marked--;
        if (s["protected"] > 0 && s["protected"] < 999) s["protected"]--;
        if (s.stealthed > 0 && s.stealthed < 999) s.stealthed--;
        if (s.riposte > 0 && s.riposte < 999) s.riposte--;
        if (s.dmgUp > 0 && s.dmgUp < 999) s.dmgUp--;
        if (s.spdUp > 0 && s.spdUp < 999) s.spdUp--;
        if (s.dodgeUp > 0 && s.dodgeUp < 999) s.dodgeUp--;
        if (s.critUp > 0 && s.critUp < 999) s.critUp--;
      }
      this.renderAllStatusIcons();
    }
  }, {
    key: "renderAllStatusIcons",
    value: function renderAllStatusIcons() {
      for (var _i3 = 0, _Object$keys3 = Object.keys(this.characterStatuses); _i3 < _Object$keys3.length; _i3++) {
        var key = _Object$keys3[_i3];
        this.renderStatusIcons(key);
      }
    }
  }, {
    key: "renderStatusIcons",
    value: function renderStatusIcons(key) {
      var el = this.characterElements[key];
      if (!el) return;
      var container = el.querySelector('.status-icons');
      if (!container) return;
      var s = this.characterStatuses[key];
      var icons = [];

      // Debuffs
      if (s.bleeding > 0) icons.push({
        icon: 'fa-tint',
        cls: 'status-icon--bleed',
        title: 'Saignement'
      });
      if (s.blighted > 0) icons.push({
        icon: 'fa-skull-crossbones',
        cls: 'status-icon--blight',
        title: 'Peste'
      });
      if (s.stunned) icons.push({
        icon: 'fa-dizzy',
        cls: 'status-icon--stun',
        title: 'Etourdi'
      });
      if (s.marked > 0) icons.push({
        icon: 'fa-crosshairs',
        cls: 'status-icon--mark',
        title: 'Marque'
      });

      // Buffs
      if (s["protected"] > 0) icons.push({
        icon: 'fa-shield-alt',
        cls: 'status-icon--protect',
        title: 'Protege'
      });
      if (s.stealthed > 0) icons.push({
        icon: 'fa-eye-slash',
        cls: 'status-icon--stealth',
        title: 'Furtif'
      });
      if (s.riposte > 0) icons.push({
        icon: 'fa-exchange-alt',
        cls: 'status-icon--riposte',
        title: 'Riposte'
      });
      if (s.dmgUp > 0) icons.push({
        icon: 'fa-fist-raised',
        cls: 'status-icon--dmg-up',
        title: '+Degats'
      });
      if (s.spdUp > 0) icons.push({
        icon: 'fa-wind',
        cls: 'status-icon--spd-up',
        title: '+Vitesse'
      });
      if (s.dodgeUp > 0) icons.push({
        icon: 'fa-running',
        cls: 'status-icon--dodge-up',
        title: '+Esquive'
      });
      if (s.critUp > 0) icons.push({
        icon: 'fa-bullseye',
        cls: 'status-icon--crit-up',
        title: '+Critique'
      });
      container.innerHTML = icons.map(function (i) {
        return "<span class=\"status-icon ".concat(i.cls, "\" title=\"").concat(i.title, "\"><i class=\"fas ").concat(i.icon, "\"></i></span>");
      }).join('');
    }

    // === END STATUS TRACKING ===
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this3 = this;
      if (this.playBtn) {
        this.playBtn.addEventListener('click', function () {
          return _this3.togglePlay();
        });
      }
      if (this.skipBtn) {
        this.skipBtn.addEventListener('click', function () {
          return _this3.skip();
        });
      }
      this.speedBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          return _this3.setSpeed(e);
        });
      });

      // Audio controls
      if (this.muteBtn) {
        this.muteBtn.addEventListener('click', function () {
          return _this3.toggleMute();
        });
      }
      if (this.volumeSlider) {
        this.volumeSlider.addEventListener('input', function (e) {
          _this3.volume = parseFloat(e.target.value);
          if (_this3.combatMusic) {
            _this3.combatMusic.volume = _this3.isMuted ? 0 : _this3.volume;
          }
        });
      }
      if (this.sfxSlider) {
        this.sfxSlider.addEventListener('input', function (e) {
          _this3.sfxVolume = parseFloat(e.target.value);
        });
      }

      // Unlock audio on first user interaction (browser autoplay policy)
      document.addEventListener('click', function () {
        if (_this3.audioUnlocked) return;
        _this3.audioUnlocked = true;
        _this3.playNextTrack();
      }, {
        once: true
      });
    }
  }, {
    key: "play",
    value: function play() {
      if (this.isPlaying && !this.isPaused) return;
      this.isPlaying = true;
      this.isPaused = false;
      this.updatePlayButton();
      this.processNextLog();
    }
  }, {
    key: "pause",
    value: function pause() {
      this.isPaused = true;
      this.updatePlayButton();
    }
  }, {
    key: "togglePlay",
    value: function togglePlay() {
      if (!this.isPlaying || this.isPaused) {
        this.play();
      } else {
        this.pause();
      }
    }
  }, {
    key: "skip",
    value: function skip() {
      this.isPlaying = false;
      this.isPaused = false;

      // Afficher tous les logs restants
      while (this.currentIndex < this.logs.length) {
        var log = this.logs[this.currentIndex];
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
  }, {
    key: "setSpeed",
    value: function setSpeed(event) {
      var speed = parseFloat(event.currentTarget.dataset.combatSpeed);
      this.speed = speed;

      // Mettre à jour l'UI
      this.speedBtns.forEach(function (btn) {
        return btn.classList.remove('active');
      });
      event.currentTarget.classList.add('active');
    }
  }, {
    key: "processNextLog",
    value: function processNextLog() {
      var _this4 = this;
      if (!this.isPlaying || this.isPaused) return;
      if (this.currentIndex >= this.logs.length) {
        this.isPlaying = false;
        this.showVictoryOverlay();
        this.updatePlayButton();
        return;
      }
      var log = this.logs[this.currentIndex];
      this.processLog(log);
      this.currentIndex++;

      // Calculer le délai
      var delay = this.getDelayForLog(log);
      delay = delay / this.speed;
      setTimeout(function () {
        return _this4.processNextLog();
      }, delay);
    }
  }, {
    key: "getDelayForLog",
    value: function getDelayForLog(log) {
      switch (log.type) {
        case 'round':
          return 2500;
        case 'initiative':
          return 600;
        case 'attack':
          return 3000;
        case 'heal':
          return 2800;
        case 'defend':
          return 2500;
        case 'dodge':
          return 2000;
        case 'death':
          return 3500;
        case 'protect':
          return 2500;
        case 'victory':
        case 'draw':
          return 1500;
        // Nouveaux types
        case 'bleed_tick':
          return 1500;
        case 'blight_tick':
          return 1500;
        case 'stunned_skip':
          return 1800;
        case 'riposte_activate':
          return 2000;
        case 'ability_use':
          return this.getAbilityDelay(log);
        // Synergies
        case 'synergy_announce':
          return 2000;
        case 'synergy_trigger':
          return this.getSynergyTriggerDelay(log);
        default:
          return 1200;
      }
    }
  }, {
    key: "getSynergyTriggerDelay",
    value: function getSynergyTriggerDelay(log) {
      // Reactive synergies (bonus attacks) need more time
      if (log.damage !== undefined) return 3500;
      return 2500;
    }
  }, {
    key: "getAbilityDelay",
    value: function getAbilityDelay(log) {
      switch (log.subtype) {
        case 'bleed_attack':
        case 'backline_strike':
        case 'armor_pierce':
        case 'bonus_vs_marked':
          return 3000;
        case 'blight_attack':
          return 3500;
        case 'stun':
          return 2500;
        case 'mark':
          return 2000;
        case 'riposte_buff':
        case 'self_buff':
        case 'stealth':
          return 2000;
        case 'party_heal':
          return 2800;
        case 'party_buff':
          return 2500;
        case 'emergency_heal':
          return 2800;
        case 'protect_dodge':
          return 2500;
        case 'transform_damage':
          return 1500;
        default:
          return 2000;
      }
    }
  }, {
    key: "processLog",
    value: function processLog(log) {
      var _this5 = this;
      this.playAnimation(log);
      this.displayLog(log);

      // Synchroniser la mise à jour des HP avec l'animation
      var hpDelay = this.getHPUpdateDelay(log);
      if (hpDelay > 0) {
        setTimeout(function () {
          return _this5.updateHealthBars(log);
        }, hpDelay / this.speed);
      } else {
        this.updateHealthBars(log);
      }

      // Suivi des cooldowns
      this.trackAbilityCooldowns(log);

      // Suivi des statuts (icones buff/debuff)
      this.updateCharacterStatuses(log);
    }
  }, {
    key: "trackAbilityCooldowns",
    value: function trackAbilityCooldowns(log) {
      // Quand une compétence est utilisée, mettre en cooldown
      if (log.type === 'ability_use' && log.caster && log.casterTeam) {
        var key = "".concat(log.casterTeam, "-").concat(log.caster);
        var abilityData = this.abilityElements[key];
        if (abilityData && abilityData.maxCd > 0) {
          this.abilityCooldowns[key] = abilityData.maxCd;
          this.updateAbilityCooldownDisplay(key);
        }
      }

      // A chaque nouveau round, décrémenter tous les cooldowns
      if (log.type === 'round') {
        for (var _key in this.abilityCooldowns) {
          if (this.abilityCooldowns[_key] > 0) {
            this.abilityCooldowns[_key]--;
            this.updateAbilityCooldownDisplay(_key);
          }
        }
      }
    }
  }, {
    key: "updateAbilityCooldownDisplay",
    value: function updateAbilityCooldownDisplay(key) {
      var abilityData = this.abilityElements[key];
      if (!abilityData) return;
      var cd = this.abilityCooldowns[key] || 0;
      if (cd > 0) {
        // En cooldown : griser + afficher badge
        abilityData.el.classList.add('character-info__ability--on-cd');
        if (abilityData.badge) {
          abilityData.badge.textContent = "".concat(cd, "T");
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
  }, {
    key: "getHPUpdateDelay",
    value: function getHPUpdateDelay(log) {
      switch (log.type) {
        case 'attack':
          return 350;
        case 'heal':
          return 400;
        case 'death':
          return 0;
        case 'bleed_tick':
          return 200;
        case 'blight_tick':
          return 200;
        case 'riposte_activate':
          return 350;
        case 'ability_use':
          return this.getAbilityHPDelay(log);
        case 'synergy_trigger':
          return 800;
        default:
          return 0;
      }
    }
  }, {
    key: "getAbilityHPDelay",
    value: function getAbilityHPDelay(log) {
      switch (log.subtype) {
        case 'bleed_attack':
        case 'blight_attack':
        case 'backline_strike':
        case 'armor_pierce':
        case 'bonus_vs_marked':
        case 'stun':
          return 350;
        case 'party_heal':
        case 'emergency_heal':
          return 400;
        case 'transform_damage':
          return 200;
        default:
          return 0;
      }
    }
  }, {
    key: "playAnimation",
    value: function playAnimation(log) {
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
  }, {
    key: "animateDoT",
    value: function animateDoT(targetName, targetTeam, dotClass) {
      var target = this.getCharacterElement(targetName, targetTeam);
      if (target) {
        target.classList.add(dotClass);
        setTimeout(function () {
          return target.classList.remove(dotClass);
        }, 1000);
      }
    }
  }, {
    key: "animateStunned",
    value: function animateStunned(targetName, targetTeam) {
      var target = this.getCharacterElement(targetName, targetTeam);
      if (target) {
        target.classList.add('stunned');
        setTimeout(function () {
          return target.classList.remove('stunned');
        }, 1400);
      }
    }
  }, {
    key: "animateMarked",
    value: function animateMarked(targetName, targetTeam) {
      var target = this.getCharacterElement(targetName, targetTeam);
      if (target) {
        target.classList.add('marked');
        // La marque reste visible plus longtemps
        setTimeout(function () {
          return target.classList.remove('marked');
        }, 2000);
      }
    }
  }, {
    key: "animateBuff",
    value: function animateBuff(targetName, targetTeam) {
      var target = this.getCharacterElement(targetName, targetTeam);
      if (target) {
        target.classList.add('buffed');
        setTimeout(function () {
          return target.classList.remove('buffed');
        }, 1400);
      }
    }
  }, {
    key: "animateStealth",
    value: function animateStealth(targetName, targetTeam) {
      var target = this.getCharacterElement(targetName, targetTeam);
      if (target) {
        target.classList.add('stealthed');
        setTimeout(function () {
          return target.classList.remove('stealthed');
        }, 1500);
      }
    }
  }, {
    key: "playAbilityAnimation",
    value: function playAbilityAnimation(log) {
      var _this6 = this;
      switch (log.subtype) {
        case 'bleed_attack':
          if (log.caster && log.casterTeam) this.animateAttack(log.caster, log.casterTeam, log.target, log.targetTeam, false);
          if (log.target && log.targetTeam) {
            setTimeout(function () {
              return _this6.animateDoT(log.target, log.targetTeam, 'bleeding');
            }, 700);
          }
          break;
        case 'blight_attack':
          if (log.caster && log.casterTeam) {
            var blightKey = "".concat(log.casterTeam, "-").concat(log.caster);
            this.swapSprite(blightKey, 'skill.webp', 1400);
            this.playCharSfx(blightKey, 'skill');
            var casterEl = this.getCharacterElement(log.caster, log.casterTeam);
            if (casterEl) {
              casterEl.classList.add('attacking');
              setTimeout(function () {
                return casterEl.classList.remove('attacking');
              }, 1200);
            }
          }
          // AOE: hurt all hit enemies
          if (log.allHits) {
            setTimeout(function () {
              log.allHits.forEach(function (h) {
                var el = _this6.getCharacterElement(h.name, h.team);
                if (el) {
                  el.classList.add('hurt');
                  setTimeout(function () {
                    return el.classList.remove('hurt');
                  }, 800);
                }
              });
            }, 500);
            // Blight DOT animation only on primary target
            var primary = log.allHits.find(function (h) {
              return h.isPrimary;
            });
            if (primary) {
              setTimeout(function () {
                return _this6.animateDoT(primary.name, primary.team, 'blighted');
              }, 1000);
            }
          } else if (log.target && log.targetTeam) {
            // Fallback for old log format
            setTimeout(function () {
              return _this6.animateDoT(log.target, log.targetTeam, 'blighted');
            }, 700);
          }
          break;
        case 'stun':
          if (log.caster && log.casterTeam) this.animateAttack(log.caster, log.casterTeam, log.target, log.targetTeam, false);
          if (log.target && log.targetTeam) {
            setTimeout(function () {
              return _this6.animateStunned(log.target, log.targetTeam);
            }, 700);
          }
          break;
        case 'mark':
          if (log.caster && log.casterTeam) {
            var markKey = "".concat(log.casterTeam, "-").concat(log.caster);
            this.swapSprite(markKey, 'skill.webp', 1400);
            this.playCharSfx(markKey, 'skill');
            this.animateBuff(log.caster, log.casterTeam);
          }
          if (log.target && log.targetTeam) this.animateMarked(log.target, log.targetTeam);
          break;
        case 'riposte_buff':
          if (log.caster && log.casterTeam) {
            var riposteKey = "".concat(log.casterTeam, "-").concat(log.caster);
            this.swapSprite(riposteKey, 'skill.webp', 1400);
            this.playCharSfx(riposteKey, 'skill');
            this.animateBuff(log.caster, log.casterTeam);
          }
          break;
        case 'self_buff':
          if (log.caster && log.casterTeam) {
            var selfBuffKey = "".concat(log.casterTeam, "-").concat(log.caster);
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
            var partyHealKey = "".concat(log.casterTeam, "-").concat(log.caster);
            this.playCharSfx(partyHealKey, 'heal');
            this.animateHeal(log.caster, log.casterTeam, log.caster, log.casterTeam);
            // Animer tous les alliés soignés
            if (log.healed) {
              log.healed.forEach(function (h) {
                var el = _this6.getCharacterElement(h.name, h.team);
                if (el) {
                  el.classList.add('healed');
                  setTimeout(function () {
                    return el.classList.remove('healed');
                  }, 1500);
                }
              });
            }
          }
          break;
        case 'party_buff':
          if (log.caster && log.casterTeam) {
            var partyBuffKey = "".concat(log.casterTeam, "-").concat(log.caster);
            this.swapSprite(partyBuffKey, 'skill.webp', 1400);
            this.playCharSfx(partyBuffKey, 'skill');
            this.animateBuff(log.caster, log.casterTeam);
          }
          // Animer tous les alliés du même côté
          this.animateTeamBuff(log.casterTeam);
          break;
        case 'stealth':
          if (log.caster && log.casterTeam) {
            var stealthKey = "".concat(log.casterTeam, "-").concat(log.caster);
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
            var emergHealKey = "".concat(log.casterTeam, "-").concat(log.caster);
            this.playCharSfx(emergHealKey, 'heal');
            this.animateHeal(log.caster, log.casterTeam, log.caster, log.casterTeam);
          }
          break;
        case 'protect_dodge':
          if (log.caster && log.casterTeam) {
            var protDodgeKey = "".concat(log.casterTeam, "-").concat(log.caster);
            this.playCharSfx(protDodgeKey, 'skill');
            this.animateDefend(log.caster, log.casterTeam);
          }
          break;
        case 'transform_damage':
          if (log.target && log.targetTeam) {
            var el = this.getCharacterElement(log.target, log.targetTeam);
            if (el) {
              el.classList.add('hurt');
              setTimeout(function () {
                return el.classList.remove('hurt');
              }, 800);
            }
          }
          break;
      }
    }
  }, {
    key: "animateTeamBuff",
    value: function animateTeamBuff(casterTeam) {
      var _this7 = this;
      Object.keys(this.characterElements).forEach(function (key) {
        if (key.startsWith(casterTeam)) {
          var el = _this7.characterElements[key];
          el.classList.add('buffed');
          setTimeout(function () {
            return el.classList.remove('buffed');
          }, 1400);
        }
      });
    }

    // === SYNERGY ANIMATIONS ===
  }, {
    key: "animateSynergyAnnounce",
    value: function animateSynergyAnnounce(log) {
      var trigger = this.getCharacterElement(log.triggerChar, log.team);
      var partner = this.getCharacterElement(log.partnerChar, log.team);
      if (trigger) {
        trigger.classList.add('synergy-announce-glow');
        setTimeout(function () {
          return trigger.classList.remove('synergy-announce-glow');
        }, 1500);
      }
      if (partner) {
        setTimeout(function () {
          partner.classList.add('synergy-announce-glow');
          setTimeout(function () {
            return partner.classList.remove('synergy-announce-glow');
          }, 1500);
        }, 300);
      }

      // Draw SVG link between the two
      if (trigger && partner) {
        this.drawSynergyLink(trigger, partner);
      }
    }
  }, {
    key: "animateSynergyTrigger",
    value: function animateSynergyTrigger(log) {
      var _this8 = this;
      var trigger = this.getCharacterElement(log.triggerChar, log.triggerCharTeam);
      var partner = this.getCharacterElement(log.partnerChar, log.partnerCharTeam);

      // Phase 1: Trigger glow
      if (trigger) {
        trigger.classList.add('synergy-trigger-glow');
        setTimeout(function () {
          return trigger.classList.remove('synergy-trigger-glow');
        }, 1800);
      }

      // Phase 2: SVG link between trigger and partner
      if (trigger && partner) {
        setTimeout(function () {
          return _this8.drawSynergyLink(trigger, partner);
        }, 400);
      }

      // Phase 3: Partner reaction
      if (partner) {
        setTimeout(function () {
          partner.classList.add('synergy-react');
          setTimeout(function () {
            return partner.classList.remove('synergy-react');
          }, 800);

          // If it's a bonus attack, animate the partner attacking
          if (log.damage !== undefined && log.target) {
            var partnerKey = "".concat(log.partnerCharTeam, "-").concat(log.partnerChar);
            _this8.swapSprite(partnerKey, 'attackanimation.webp', 1200);
            _this8.playCharSfx(partnerKey, 'attack');
            var target = _this8.getCharacterElement(log.target, log.targetTeam);
            if (target) {
              setTimeout(function () {
                target.classList.add('hurt');
                setTimeout(function () {
                  return target.classList.remove('hurt');
                }, 800);
              }, 400);
            }
          }
        }, 800);
      }
    }
  }, {
    key: "drawSynergyLink",
    value: function drawSynergyLink(el1, el2) {
      var stage = this.container.querySelector('.battle-stage');
      if (!stage) return;

      // Remove existing SVG if any
      var existingSvg = stage.querySelector('.synergy-link-svg');
      if (existingSvg) existingSvg.remove();
      var svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svg.classList.add('synergy-link-svg');
      svg.setAttribute('width', '100%');
      svg.setAttribute('height', '100%');
      var stageRect = stage.getBoundingClientRect();
      var rect1 = el1.getBoundingClientRect();
      var rect2 = el2.getBoundingClientRect();
      var x1 = rect1.left + rect1.width / 2 - stageRect.left;
      var y1 = rect1.top + rect1.height / 2 - stageRect.top;
      var x2 = rect2.left + rect2.width / 2 - stageRect.left;
      var y2 = rect2.top + rect2.height / 2 - stageRect.top;
      var line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
      line.classList.add('synergy-link-line');
      line.setAttribute('x1', x1);
      line.setAttribute('y1', y1);
      line.setAttribute('x2', x2);
      line.setAttribute('y2', y2);
      svg.appendChild(line);
      stage.appendChild(svg);

      // Remove after animation
      setTimeout(function () {
        return svg.remove();
      }, 1800 / this.speed);
    }

    // === SPRITE SWAP ===
  }, {
    key: "swapSprite",
    value: function swapSprite(key, spriteName, duration) {
      var _this9 = this;
      var el = this.characterElements[key];
      if (!el) return;
      var slug = this.characterSlugs[key];
      if (!slug) return;
      var img = el.querySelector('.character-sprite');
      if (!img) return;
      img.src = "/asset/img/combat/".concat(slug, "/").concat(spriteName);
      if (duration > 0) {
        setTimeout(function () {
          if (!el.classList.contains('dead')) {
            img.src = "/asset/img/combat/".concat(_this9.characterSlugs[key], "/fightidle.webp");
          }
        }, duration);
      }
    }

    // === ANIMATIONS EXISTANTES ===
  }, {
    key: "animateAttack",
    value: function animateAttack(attackerName, attackerTeam, targetName, targetTeam, isCrit) {
      var attacker = this.getCharacterElement(attackerName, attackerTeam);
      var target = this.getCharacterElement(targetName, targetTeam);
      if (attacker) {
        var key = "".concat(attackerTeam, "-").concat(attackerName);
        this.swapSprite(key, 'attackanimation.webp', 1200);
        attacker.classList.add('attacking');
        this.playCharSfx(key, 'attack');
        setTimeout(function () {
          return attacker.classList.remove('attacking');
        }, 1200);
      }
      if (target) {
        setTimeout(function () {
          target.classList.add('hurt');
          if (isCrit) target.classList.add('crit');
          setTimeout(function () {
            return target.classList.remove('hurt', 'crit');
          }, 800);
        }, 500);
      }
    }
  }, {
    key: "animateHeal",
    value: function animateHeal(healerName, healerTeam, targetName, targetTeam) {
      var healer = this.getCharacterElement(healerName, healerTeam);
      var target = this.getCharacterElement(targetName, targetTeam);
      if (healer) {
        var key = "".concat(healerTeam, "-").concat(healerName);
        if (this.characterHasHeal[key]) {
          this.swapSprite(key, 'healing.webp', 1500);
        } else {
          this.swapSprite(key, 'skill.webp', 1500);
        }
        healer.classList.add('healing');
        this.playCharSfx(key, 'heal');
        setTimeout(function () {
          return healer.classList.remove('healing');
        }, 1500);
      }
      if (target) {
        target.classList.add('healed');
        setTimeout(function () {
          return target.classList.remove('healed');
        }, 1500);
      }
    }
  }, {
    key: "animateDefend",
    value: function animateDefend(defenderName, defenderTeam) {
      var defender = this.getCharacterElement(defenderName, defenderTeam);
      if (defender) {
        var key = "".concat(defenderTeam, "-").concat(defenderName);
        this.swapSprite(key, 'defending.webp', 1800);
        defender.classList.add('defending');
        this.playCharSfx(key, 'skill');
        setTimeout(function () {
          return defender.classList.remove('defending');
        }, 1800);
      }
    }
  }, {
    key: "animateDodge",
    value: function animateDodge(targetName, targetTeam) {
      var target = this.getCharacterElement(targetName, targetTeam);
      if (target) {
        target.classList.add('dodging');
        setTimeout(function () {
          return target.classList.remove('dodging');
        }, 1000);
      }
    }
  }, {
    key: "animateDeath",
    value: function animateDeath(targetName, targetTeam) {
      var target = this.getCharacterElement(targetName, targetTeam);
      if (target) {
        target.classList.add('dead');
      }
    }
  }, {
    key: "getCharacterElement",
    value: function getCharacterElement(name, team) {
      return this.characterElements["".concat(team, "-").concat(name)];
    }
  }, {
    key: "displayLog",
    value: function displayLog(log) {
      if (!this.logContainer) return;
      var entry = document.createElement('p');
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
  }, {
    key: "updateHealthBars",
    value: function updateHealthBars(log) {
      var characterName = null;
      var teamName = null;
      var currentHP = null;
      var maxHP = null;

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
  }, {
    key: "updateAbilityHealthBars",
    value: function updateAbilityHealthBars(log) {
      var _this0 = this;
      // AOE hits (blight_attack): update HP for all hit enemies
      if (log.allHits) {
        log.allHits.forEach(function (h) {
          _this0.updateCharacterHP(h.name, h.team, h.hp, h.maxHp);
        });
      }
      // Compétences qui infligent des dégâts à une cible
      else if (log.target && log.targetHP !== undefined && log.targetMaxHP) {
        this.updateCharacterHP(log.target, log.targetTeam, log.targetHP, log.targetMaxHP);
      }

      // Soin de groupe : mettre à jour chaque allié soigné
      if (log.subtype === 'party_heal' && log.healed) {
        log.healed.forEach(function (h) {
          _this0.updateCharacterHP(h.name, h.team, h.hp, h.maxHp);
        });
      }

      // Soin d'urgence : mettre à jour le lanceur
      if (log.subtype === 'emergency_heal' && log.caster) {
        this.updateCharacterHP(log.caster, log.casterTeam, log.targetHP, log.targetMaxHP);
      }
    }
  }, {
    key: "updateCharacterHP",
    value: function updateCharacterHP(characterName, teamName, currentHP, maxHP) {
      var target = this.getCharacterElement(characterName, teamName);
      if (!target) {
        return;
      }
      var percent = maxHP > 0 ? currentHP / maxHP * 100 : 0;

      // Mise à jour de la barre HP dans la zone de combat (battle-stage)
      var hpBar = target.querySelector('.hp-bar__fill');
      var hpText = target.querySelector('.hp-text');
      if (hpBar) {
        // Animation fluide de la barre
        hpBar.style.transition = "width 0.3s ease-out";
        hpBar.style.width = "".concat(percent, "%");

        // Classes de couleur selon le pourcentage
        hpBar.classList.remove('hp-bar__fill--low', 'hp-bar__fill--critical');
        if (percent <= 25) {
          hpBar.classList.add('hp-bar__fill--critical');
        } else if (percent <= 50) {
          hpBar.classList.add('hp-bar__fill--low');
        }
      }
      if (hpText) {
        hpText.textContent = "".concat(currentHP, "/").concat(maxHP);
      }

      // Mise à jour des panneaux d'info latéraux
      this.updateInfoPanel(characterName, teamName, currentHP);
    }
  }, {
    key: "updateInfoPanel",
    value: function updateInfoPanel(characterName, teamName, currentHP) {
      // Trouver le bon panneau selon l'équipe
      var panelClass = teamName === 'Equipe 1' ? '.info-panel--team1' : '.info-panel--team2';
      var panel = this.container.querySelector(panelClass);
      if (!panel) return;

      // Trouver le personnage dans le panneau par son nom
      var characterInfos = panel.querySelectorAll('.character-info');
      var _iterator = _createForOfIteratorHelper(characterInfos),
        _step;
      try {
        var _loop = function _loop() {
          var info = _step.value;
          var nameEl = info.querySelector('.character-info__name');
          if (nameEl && nameEl.textContent.trim() === characterName) {
            var statsSpan = info.querySelector('.character-info__stats span');
            if (statsSpan) {
              statsSpan.textContent = currentHP;

              // Animation flash pour montrer le changement
              statsSpan.classList.add('hp-updated');
              setTimeout(function () {
                return statsSpan.classList.remove('hp-updated');
              }, 300);
            }
            return 1; // break
          }
        };
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          if (_loop()) break;
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    }
  }, {
    key: "showVictoryOverlay",
    value: function showVictoryOverlay() {
      var _this1 = this;
      if (this.overlay) {
        this.overlay.style.display = 'flex';
        setTimeout(function () {
          _this1.overlay.style.opacity = '1';
        }, 50);
      }

      // Finaliser le MMR a la fin du combat
      this.finalizeRating();
    }
  }, {
    key: "finalizeRating",
    value: function finalizeRating() {
      var _this10 = this;
      var finalizeUrl = this.container.dataset.finalizeUrl;
      if (!finalizeUrl) return;
      fetch(finalizeUrl, {
        method: 'POST',
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data.success && data.ratingChange !== 0) {
          _this10.showRatingUpdate(data.ratingChange, data.newRating, data.newRating2);
        }
      })["catch"](function (err) {
        return console.error('Erreur finalisation rating:', err);
      });
    }
  }, {
    key: "showRatingUpdate",
    value: function showRatingUpdate(change, newRating, newRating2) {
      // Mettre a jour le MMR affiche dans le panneau joueur (Equipe 1)
      var ratingEl = this.container.querySelector('.info-panel--team1 .info-panel__rating');
      if (ratingEl && newRating !== null) {
        ratingEl.innerHTML = "<i class=\"fas fa-trophy\"></i> ".concat(newRating, " MMR");
      }

      // Mettre a jour le MMR affiche dans le panneau adversaire (Equipe 2)
      var ratingEl2 = this.container.querySelector('.info-panel--team2 .info-panel__rating--enemy');
      if (ratingEl2 && newRating2 !== null) {
        ratingEl2.innerHTML = "<i class=\"fas fa-trophy\"></i> ".concat(newRating2, " MMR");
      }

      // Afficher la notification de changement dans l'overlay
      var overlay = this.container.querySelector('[data-combat-overlay]');
      if (overlay) {
        var winnerDiv = overlay.querySelector('.battle-stage__winner');

        // Changement MMR Equipe 1
        var notif1 = document.createElement('div');
        notif1.className = 'rating-change';
        notif1.style.cssText = 'font-size:1.2rem;margin-top:12px;font-weight:bold;opacity:0;transition:opacity 0.5s;';
        notif1.textContent = change > 0 ? "Equipe 1 : +".concat(change, " MMR") : "Equipe 1 : ".concat(change, " MMR");
        notif1.style.color = change > 0 ? '#4caf50' : '#f44336';
        winnerDiv.appendChild(notif1);

        // Changement MMR Equipe 2 (inverse)
        var change2 = -change;
        var notif2 = document.createElement('div');
        notif2.className = 'rating-change';
        notif2.style.cssText = 'font-size:1.2rem;margin-top:6px;font-weight:bold;opacity:0;transition:opacity 0.5s;';
        notif2.textContent = change2 > 0 ? "Equipe 2 : +".concat(change2, " MMR") : "Equipe 2 : ".concat(change2, " MMR");
        notif2.style.color = change2 > 0 ? '#4caf50' : '#f44336';
        winnerDiv.appendChild(notif2);
        setTimeout(function () {
          notif1.style.opacity = '1';
          notif2.style.opacity = '1';
        }, 100);
      }
    }

    // === AUDIO ===
  }, {
    key: "playNextTrack",
    value: function playNextTrack() {
      var _this11 = this;
      if (!this.audioUnlocked) return;
      if (this.combatMusic) {
        this.combatMusic.pause();
        this.combatMusic = null;
      }
      var idx = this.getRandomTrackIndex();
      this.combatMusic = new Audio(this.combatPlaylist[idx]);
      this.combatMusic.volume = this.isMuted ? 0 : this.volume;
      this.combatMusic.addEventListener('ended', function () {
        return _this11.playNextTrack();
      });
      this.combatMusic.play()["catch"](function () {});
    }
  }, {
    key: "getRandomTrackIndex",
    value: function getRandomTrackIndex() {
      var i;
      do {
        i = Math.floor(Math.random() * this.combatPlaylist.length);
      } while (i === this.lastTrackIndex && this.combatPlaylist.length > 1);
      this.lastTrackIndex = i;
      return i;
    }
  }, {
    key: "toggleMute",
    value: function toggleMute() {
      this.isMuted = !this.isMuted;
      if (this.combatMusic) {
        this.combatMusic.volume = this.isMuted ? 0 : this.volume;
      }
      if (this.muteBtn) {
        var icon = this.muteBtn.querySelector('i');
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
  }, {
    key: "loadSfx",
    value: function loadSfx(path) {
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
  }, {
    key: "playSfx",
    value: function playSfx(slug, sfxName) {
      if (this.isMuted || !slug) return;
      var path = "/asset/ost/vfx/".concat(slug, "/").concat(sfxName, ".wav");
      var cached = this.loadSfx(path);

      // Clone the audio node so overlapping plays don't cut each other off
      var sound = cached.cloneNode();
      sound.volume = this.sfxVolume;
      sound.play()["catch"](function () {});
    }

    /**
     * Play the appropriate SFX for a character given their key and action type.
     * @param {string} key - character key (e.g. 'Equipe 1-Crusader')
     * @param {string} action - 'attack', 'skill', or 'heal'
     */
  }, {
    key: "playCharSfx",
    value: function playCharSfx(key, action) {
      var slug = this.characterSlugs[key];
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
  }, {
    key: "updatePlayButton",
    value: function updatePlayButton() {
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
  }]);
}(); // Initialiser quand le DOM est prêt
document.addEventListener('DOMContentLoaded', function () {
  var combatContainer = document.querySelector('[data-combat-logs]');
  if (combatContainer) {
    new CombatController(combatContainer);
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CombatController);

/***/ },

/***/ "./assets/js/friends.js"
/*!******************************!*\
  !*** ./assets/js/friends.js ***!
  \******************************/
() {

/* ================================
   FRIEND SYSTEM
================================ */

function escapeHtml(str) {
  var div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('[data-friends-toggle]');
  var panel = document.querySelector('[data-friends-panel]');
  var backdrop = document.querySelector('[data-friends-backdrop]');
  var closeBtn = document.querySelector('[data-friends-close]');
  var badge = document.querySelector('[data-friends-badge]');
  if (!toggle || !panel) return;
  var panelOpen = false;
  var currentTab = 'friends';
  var currentConversationUserId = null;
  var lastMessageId = 0;
  var messagePollingInterval = null;
  var unreadPollingInterval = null;
  var friendsLoaded = false;
  var requestsLoaded = false;

  // ==========================================
  // PANEL OPEN/CLOSE
  // ==========================================
  function openPanel() {
    panel.style.display = 'flex';
    backdrop.style.display = 'block';
    panel.offsetHeight; // reflow
    panel.classList.add('friends-panel--open');
    backdrop.classList.add('friends-panel__backdrop--open');
    panelOpen = true;
    if (!friendsLoaded) {
      loadFriends();
    }
  }
  function closePanel() {
    panel.classList.remove('friends-panel--open');
    backdrop.classList.remove('friends-panel__backdrop--open');
    panelOpen = false;
    stopMessagePolling();
    setTimeout(function () {
      panel.style.display = 'none';
      backdrop.style.display = 'none';
    }, 300);
  }
  toggle.addEventListener('click', function () {
    return panelOpen ? closePanel() : openPanel();
  });
  closeBtn.addEventListener('click', closePanel);
  backdrop.addEventListener('click', closePanel);

  // ==========================================
  // TABS
  // ==========================================
  document.querySelectorAll('[data-friends-tab]').forEach(function (tabBtn) {
    tabBtn.addEventListener('click', function () {
      var tabName = tabBtn.dataset.friendsTab;
      switchTab(tabName);
    });
  });
  function switchTab(tabName) {
    currentTab = tabName;
    document.querySelectorAll('[data-friends-tab]').forEach(function (btn) {
      btn.classList.toggle('friends-panel__tab--active', btn.dataset.friendsTab === tabName);
    });
    document.querySelectorAll('[data-tab-content]').forEach(function (content) {
      content.style.display = content.dataset.tabContent === tabName ? 'block' : 'none';
    });
    document.querySelector('.friends-panel__tabs').style.display = 'flex';
    document.querySelector('.friends-panel__content').style.display = 'block';
    document.querySelector('[data-friends-conversation]').style.display = 'none';
    stopMessagePolling();
    if (tabName === 'friends' && !friendsLoaded) loadFriends();
    if (tabName === 'requests' && !requestsLoaded) loadRequests();
  }

  // ==========================================
  // LOAD FRIENDS LIST
  // ==========================================
  function loadFriends() {
    var container = document.querySelector('[data-tab-content="friends"]');
    container.innerHTML = '<div class="friends-panel__loading"><i class="fas fa-spinner fa-spin"></i> Chargement...</div>';
    fetch('/friends/list', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      friendsLoaded = true;
      if (data.friends.length === 0) {
        container.innerHTML = '<p class="friends-panel__empty"><i class="fas fa-ghost"></i> Aucun compagnon... Le donjon est solitaire.</p>';
        return;
      }
      container.innerHTML = data.friends.map(function (f) {
        return "\n                <div class=\"friend-item\" data-friend-user-id=\"".concat(f.userId, "\">\n                    <div class=\"friend-item__avatar\">\n                        ").concat(f.profileImage ? "<img src=\"".concat(escapeHtml(f.profileImage), "\" alt=\"").concat(escapeHtml(f.username), "\">") : '<i class="fas fa-user"></i>', "\n                    </div>\n                    <div class=\"friend-item__info\">\n                        <span class=\"friend-item__name\">").concat(escapeHtml(f.username), "</span>\n                        <span class=\"friend-item__preview\">\n                            ").concat(f.lastMessage ? (f.lastMessage.isFromMe ? 'Vous: ' : '') + escapeHtml(f.lastMessage.content) : 'Aucun message', "\n                        </span>\n                    </div>\n                    <span class=\"friend-item__rating\"><i class=\"fas fa-trophy\"></i> ").concat(f.rating, "</span>\n                </div>\n            ");
      }).join('');
      container.querySelectorAll('.friend-item').forEach(function (item) {
        item.addEventListener('click', function () {
          var userId = parseInt(item.dataset.friendUserId);
          var name = item.querySelector('.friend-item__name').textContent;
          openConversation(userId, name);
        });
      });
    })["catch"](function () {
      container.innerHTML = '<p class="friends-panel__empty">Erreur de chargement</p>';
    });
  }

  // ==========================================
  // LOAD PENDING REQUESTS
  // ==========================================
  function loadRequests() {
    var container = document.querySelector('[data-tab-content="requests"]');
    container.innerHTML = '<div class="friends-panel__loading"><i class="fas fa-spinner fa-spin"></i> Chargement...</div>';
    fetch('/friends/pending', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      requestsLoaded = true;
      if (data.requests.length === 0) {
        container.innerHTML = '<p class="friends-panel__empty">Aucune demande en attente</p>';
        return;
      }
      container.innerHTML = data.requests.map(function (r) {
        return "\n                <div class=\"friend-item\" data-request-id=\"".concat(r.friendshipId, "\">\n                    <div class=\"friend-item__avatar\">\n                        ").concat(r.profileImage ? "<img src=\"".concat(escapeHtml(r.profileImage), "\" alt=\"").concat(escapeHtml(r.username), "\">") : '<i class="fas fa-user"></i>', "\n                    </div>\n                    <div class=\"friend-item__info\">\n                        <span class=\"friend-item__name\">").concat(escapeHtml(r.username), "</span>\n                        <span class=\"friend-item__preview\">").concat(escapeHtml(r.date), "</span>\n                    </div>\n                    <div class=\"friend-item__actions\">\n                        <button class=\"friend-action friend-action--accept\" data-accept-id=\"").concat(r.friendshipId, "\">\n                            <i class=\"fas fa-check\"></i>\n                        </button>\n                        <button class=\"friend-action friend-action--reject\" data-reject-id=\"").concat(r.friendshipId, "\">\n                            <i class=\"fas fa-times\"></i>\n                        </button>\n                    </div>\n                </div>\n            ");
      }).join('');
      container.querySelectorAll('[data-accept-id]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          handleRequest(btn.dataset.acceptId, 'accept');
        });
      });
      container.querySelectorAll('[data-reject-id]').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          e.stopPropagation();
          handleRequest(btn.dataset.rejectId, 'reject');
        });
      });
    })["catch"](function () {
      container.innerHTML = '<p class="friends-panel__empty">Erreur de chargement</p>';
    });
  }
  function handleRequest(friendshipId, action) {
    fetch("/friends/".concat(action, "/").concat(friendshipId), {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.success) {
        friendsLoaded = false;
        requestsLoaded = false;
        loadRequests();
        fetchUnreadCount();
      }
    });
  }

  // ==========================================
  // SEARCH USERS
  // ==========================================
  var searchInput = document.querySelector('[data-friends-search-input]');
  var searchResults = document.querySelector('[data-friends-search-results]');
  var searchTimeout = null;
  if (searchInput) {
    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      var query = searchInput.value.trim();
      if (query.length < 2) {
        searchResults.innerHTML = '';
        return;
      }
      searchTimeout = setTimeout(function () {
        fetch("/friends/search?q=".concat(encodeURIComponent(query)), {
          headers: {
            'X-Requested-With': 'XMLHttpRequest'
          }
        }).then(function (res) {
          return res.json();
        }).then(function (data) {
          if (data.users.length === 0) {
            searchResults.innerHTML = '<p class="friends-panel__empty">Aucun guerrier trouve</p>';
            return;
          }
          searchResults.innerHTML = data.users.map(function (u) {
            var actionHtml = '';
            if (u.friendStatus === 'accepted') {
              actionHtml = '<span class="friend-action friend-action--pending">Ami</span>';
            } else if (u.friendStatus === 'pending_sent') {
              actionHtml = '<span class="friend-action friend-action--pending">Envoyee</span>';
            } else if (u.friendStatus === 'pending_received') {
              actionHtml = '<span class="friend-action friend-action--pending">Recue</span>';
            } else {
              actionHtml = "<button class=\"friend-action friend-action--add\" data-add-friend-id=\"".concat(u.userId, "\">\n                                <i class=\"fas fa-plus\"></i>\n                            </button>");
            }
            return "\n                            <div class=\"friend-item\">\n                                <div class=\"friend-item__avatar\">\n                                    ".concat(u.profileImage ? "<img src=\"".concat(escapeHtml(u.profileImage), "\" alt=\"").concat(escapeHtml(u.username), "\">") : '<i class="fas fa-user"></i>', "\n                                </div>\n                                <div class=\"friend-item__info\">\n                                    <span class=\"friend-item__name\">").concat(escapeHtml(u.username), "</span>\n                                    <span class=\"friend-item__rating\"><i class=\"fas fa-trophy\"></i> ").concat(u.rating, "</span>\n                                </div>\n                                <div class=\"friend-item__actions\">").concat(actionHtml, "</div>\n                            </div>\n                        ");
          }).join('');
          searchResults.querySelectorAll('[data-add-friend-id]').forEach(function (btn) {
            btn.addEventListener('click', function (e) {
              e.stopPropagation();
              sendFriendRequest(btn.dataset.addFriendId, btn);
            });
          });
        });
      }, 300);
    });
  }
  function sendFriendRequest(userId, btn) {
    btn.disabled = true;
    fetch("/friends/request/".concat(userId), {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.success) {
        btn.outerHTML = '<span class="friend-action friend-action--pending">Envoyee</span>';
      } else {
        btn.disabled = false;
      }
    })["catch"](function () {
      btn.disabled = false;
    });
  }
  function reportMessageAction(messageId, btn) {
    var reason = prompt('Raison du signalement :');
    if (reason === null) return; // cancelled

    btn.disabled = true;
    fetch("/friends/messages/".concat(messageId, "/report"), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        reason: reason
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.success) {
        btn.innerHTML = '<i class="fas fa-check"></i>';
        btn.classList.add('chat-message__report--done');
        btn.title = 'Signale';
      } else {
        btn.disabled = false;
      }
    })["catch"](function () {
      btn.disabled = false;
    });
  }

  // ==========================================
  // CONVERSATION
  // ==========================================
  function openConversation(userId, username) {
    currentConversationUserId = userId;
    lastMessageId = 0;
    document.querySelector('.friends-panel__tabs').style.display = 'none';
    document.querySelector('.friends-panel__content').style.display = 'none';
    var convEl = document.querySelector('[data-friends-conversation]');
    convEl.style.display = 'flex';
    document.querySelector('[data-conversation-name]').textContent = username;
    var messagesEl = document.querySelector('[data-conversation-messages]');
    messagesEl.innerHTML = '<div class="friends-panel__loading"><i class="fas fa-spinner fa-spin"></i> Chargement...</div>';
    fetch("/friends/messages/".concat(userId), {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      renderMessages(data.messages, false);
      startMessagePolling();
    });
  }
  function renderMessages(messages, append) {
    var messagesEl = document.querySelector('[data-conversation-messages]');
    if (!append) {
      if (messages.length === 0) {
        messagesEl.innerHTML = '<p class="friends-panel__empty">Debut de la conversation. Envoyez le premier message!</p>';
      } else {
        messagesEl.innerHTML = '';
      }
    }

    // Si on ajoute des messages et que le conteneur affiche le placeholder, le supprimer
    if (append && messages.length > 0) {
      var placeholder = messagesEl.querySelector('.friends-panel__empty');
      if (placeholder) placeholder.remove();
    }
    messages.forEach(function (msg) {
      if (msg.id > lastMessageId) lastMessageId = msg.id;
      var div = document.createElement('div');
      div.classList.add('chat-message', msg.isFromMe ? 'chat-message--mine' : 'chat-message--theirs');
      var reportBtn = '';
      if (!msg.isFromMe) {
        reportBtn = "<button class=\"chat-message__report\" data-report-msg-id=\"".concat(msg.id, "\" title=\"Signaler ce message\"><i class=\"fas fa-flag\"></i></button>");
      }
      div.innerHTML = "\n                ".concat(escapeHtml(msg.content), "\n                <span class=\"chat-message__time\">").concat(escapeHtml(msg.date), " ").concat(reportBtn, "</span>\n            ");

      // Attach report handler
      var reportEl = div.querySelector('[data-report-msg-id]');
      if (reportEl) {
        reportEl.addEventListener('click', function (e) {
          e.stopPropagation();
          reportMessageAction(reportEl.dataset.reportMsgId, reportEl);
        });
      }
      messagesEl.appendChild(div);
    });
    messagesEl.scrollTop = messagesEl.scrollHeight;
  }

  // Send message
  var sendBtn = document.querySelector('[data-conversation-send]');
  var inputEl = document.querySelector('[data-conversation-input]');
  if (sendBtn && inputEl) {
    sendBtn.addEventListener('click', sendMessage);
    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') sendMessage();
    });
  }
  function sendMessage() {
    var content = inputEl.value.trim();
    if (!content || !currentConversationUserId) return;
    inputEl.value = '';
    fetch("/friends/messages/".concat(currentConversationUserId), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Requested-With': 'XMLHttpRequest'
      },
      body: JSON.stringify({
        content: content
      })
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.success && data.message) {
        renderMessages([data.message], true);
      }
    });
  }

  // Back button
  var backBtn = document.querySelector('[data-conversation-back]');
  if (backBtn) {
    backBtn.addEventListener('click', function () {
      currentConversationUserId = null;
      stopMessagePolling();
      friendsLoaded = false;
      switchTab('friends');
    });
  }

  // ==========================================
  // MESSAGE POLLING (every 5s when conversation open)
  // ==========================================
  function startMessagePolling() {
    stopMessagePolling();
    messagePollingInterval = setInterval(function () {
      if (!currentConversationUserId) return;
      fetch("/friends/messages/".concat(currentConversationUserId, "?afterId=").concat(lastMessageId), {
        headers: {
          'X-Requested-With': 'XMLHttpRequest'
        }
      }).then(function (res) {
        return res.json();
      }).then(function (data) {
        if (data.messages && data.messages.length > 0) {
          renderMessages(data.messages, true);
        }
      });
    }, 5000);
  }
  function stopMessagePolling() {
    if (messagePollingInterval) {
      clearInterval(messagePollingInterval);
      messagePollingInterval = null;
    }
  }

  // ==========================================
  // UNREAD COUNT POLLING (every 30s, always active)
  // ==========================================
  function fetchUnreadCount() {
    fetch('/friends/unread-count', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      if (data.total > 0) {
        badge.textContent = data.total;
        badge.style.display = 'inline-block';
      } else {
        badge.style.display = 'none';
      }
      var requestsBadge = document.querySelector('[data-requests-badge]');
      if (requestsBadge) {
        if (data.pendingRequests > 0) {
          requestsBadge.textContent = data.pendingRequests;
          requestsBadge.style.display = 'inline-block';
        } else {
          requestsBadge.style.display = 'none';
        }
      }
    })["catch"](function () {});
  }
  fetchUnreadCount();
  unreadPollingInterval = setInterval(fetchUnreadCount, 30000);
});

/***/ },

/***/ "./node_modules/@fortawesome/fontawesome-free/css/all.css"
/*!****************************************************************!*\
  !*** ./node_modules/@fortawesome/fontawesome-free/css/all.css ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./assets/styles/app.scss"
/*!********************************!*\
  !*** ./assets/styles/app.scss ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ }

},
/******/ __webpack_require__ => { // webpackRuntimeModules
/******/ var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
/******/ __webpack_require__.O(0, ["vendors-node_modules_fortawesome_fontawesome-free_css_all_css"], () => (__webpack_exec__("./assets/app.js")));
/******/ var __webpack_exports__ = __webpack_require__.O();
/******/ }
]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ckUsSUFBSWdqQixhQUFhLEVBQUU7UUFDZixJQUFJeGEsSUFBSSxDQUFDeWEsZUFBZSxHQUFHLENBQUMsRUFBRTtVQUMxQkQsYUFBYSxDQUFDemUsV0FBVyxHQUFHaUUsSUFBSSxDQUFDeWEsZUFBZTtVQUNoREQsYUFBYSxDQUFDdmIsS0FBSyxDQUFDQyxPQUFPLEdBQUcsY0FBYztRQUNoRCxDQUFDLE1BQU07VUFDSHNiLGFBQWEsQ0FBQ3ZiLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07UUFDeEM7TUFDSjtJQUNKLENBQUMsQ0FBQyxTQUNJLENBQUMsWUFBTSxDQUFDLENBQUMsQ0FBQztFQUNwQjtFQUVBbVosZ0JBQWdCLENBQUMsQ0FBQztFQUNsQnpCLHFCQUFxQixHQUFHeUQsV0FBVyxDQUFDaEMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDO0FBQ2hFLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7Ozs7QUN0ZkY7Ozs7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2NvbWJhdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZnJpZW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5jc3M/MmRjOSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcclxuICovXHJcbmltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnO1xyXG5pbXBvcnQgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzJztcclxuaW1wb3J0ICcuL2pzL2NvbWJhdC5qcyc7XHJcbmltcG9ydCAnLi9qcy9mcmllbmRzLmpzJztcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgVVRJTElUQUlSRSBTRUNVUklURSBYU1NcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xyXG4gICAgaWYgKCFzdHIpIHJldHVybiAnJztcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cikpO1xyXG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgTUVOVSBCVVJHRVJcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBidXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1cmdlclwiKTtcclxuICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1uYXZpZ2F0aW9uXCIpO1xyXG5cclxuICAgIGlmIChidXJnZXIgJiYgbmF2KSB7XHJcbiAgICAgICAgYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQQUdFIFRFQU1TIChDT1JSSUfDiUUpXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKiDwn5SnIE1BWCBERVMgU1RBVFMgKGFkYXB0ZXIgw6AgdGEgQkREIC8gw6lxdWlsaWJyYWdlKSAqL1xyXG5jb25zdCBTVEFUX01BWCA9IHtcclxuICAgIGRtZzogMzAsXHJcbiAgICBzcGVlZDogMTIsXHJcbiAgICBkb2RnZTogNDAsXHJcbiAgICBjcml0OiAxNSxcclxuICAgIGhwOiA3NVxyXG59O1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHBvcnRyYWl0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFtLXBvcnRyYWl0Jyk7XHJcbiAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlYW1EZXRhaWxzJyk7XHJcbiAgICBjb25zdCBzZWxlY3RlZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGlzdCcpO1xyXG4gICAgY29uc3QgbGF1bmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1sYXVuY2gnKTtcclxuXHJcbiAgICBpZiAoIWRldGFpbHMgfHwgcG9ydHJhaXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG1heFNlbGVjdGlvbiA9IDQ7XHJcbiAgICBsZXQgc2VsZWN0ZWRIZXJvZXMgPSBbXTtcclxuICAgIGxldCBzZWxlY3RlZEhlcm9JZHMgPSBbXTtcclxuXHJcbiAgICAvLyBDb21wb3NpdGlvbiBvYmxpZ2F0b2lyZSA6IDEgVGFuaywgMSBEUFMsIDEgSGVhbGVyLCAxIFN1cHBvcnRcclxuICAgIC8vIExhIGNhdGVnb3JpZSB2aWVudCBkaXJlY3RlbWVudCBkdSBkYXRhLWNhdGVnb3J5IChjYWxjdWxlIGNvdGUgc2VydmV1cilcclxuICAgIGZ1bmN0aW9uIGdldENhdGVnb3J5KHBvcnRyYWl0KSB7XHJcbiAgICAgICAgcmV0dXJuIHBvcnRyYWl0LmRhdGFzZXQuY2F0ZWdvcnkgfHwgJ1N1cHBvcnQnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkUm9sZXMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSB7IFRhbms6IDAsIERQUzogMCwgSGVhbGVyOiAwLCBTdXBwb3J0OiAwIH07XHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocHAgPT4gcHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAocCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2F0ID0gZ2V0Q2F0ZWdvcnkocCk7XHJcbiAgICAgICAgICAgICAgICByb2xlc1tjYXRdKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcm9sZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FuU2VsZWN0Um9sZShwb3J0cmFpdEVsKSB7XHJcbiAgICAgICAgY29uc3QgY2F0ID0gZ2V0Q2F0ZWdvcnkocG9ydHJhaXRFbCk7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzW2NhdF0gPCAxO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcnRyYWl0cy5mb3JFYWNoKHBvcnRyYWl0ID0+IHtcclxuICAgICAgICBwb3J0cmFpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHBvcnRyYWl0LmRhdGFzZXQuaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwb3J0cmFpdC5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGUgPSBwb3J0cmFpdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01pbiA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01pbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01heCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01heCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuc3BlZWQpO1xyXG4gICAgICAgICAgICBjb25zdCBkb2RnZSA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRvZGdlKTtcclxuICAgICAgICAgICAgY29uc3QgY3JpdCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmNyaXQpO1xyXG4gICAgICAgICAgICBjb25zdCBocCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmhwKTtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlRmlsZSA9IHBvcnRyYWl0LmRhdGFzZXQuc3ByaXRlO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5TmFtZSA9IHBvcnRyYWl0LmRhdGFzZXQuYWJpbGl0eU5hbWUgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlEZXNjID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5RGVzYyB8fCAnJztcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUNkID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5Q2QgfHwgJyc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7c3ByaXRlRmlsZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlIdG1sID0gYWJpbGl0eU5hbWUgPyBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFiaWxpdHktc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZpcmUtYWx0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX25hbWVcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eU5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19jZFwiPjxpIGNsYXNzPVwiZmFzIGZhLWhvdXJnbGFzcy1oYWxmXCI+PC9pPiAke2VzY2FwZUh0bWwoYWJpbGl0eUNkKX1UPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX2Rlc2NcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eURlc2MpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCA6ICcnO1xyXG5cclxuICAgICAgICAgICAgLy8gQnVpbGQgc3luZXJneSBpbmZvIGZvciB0aGlzIGNoYXJhY3RlclxyXG4gICAgICAgICAgICBjb25zdCBjaGFyU3luZXJnaWVzID0gc3luZXJneU1hcFtuYW1lXSB8fCBbXTtcclxuICAgICAgICAgICAgbGV0IHN5bmVyZ3lIdG1sID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChjaGFyU3luZXJnaWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHN5bmVyZ3lIdG1sID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvbl9faGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1saW5rXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25fX3RpdGxlXCI+U3luZXJnaWVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtjaGFyU3luZXJnaWVzLm1hcChzID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25fX2l0ZW0gJHtzZWxlY3RlZEhlcm9lcy5pbmNsdWRlcyhzLnBhcnRuZXIpID8gJ3N5bmVyZ3ktc2VjdGlvbl9faXRlbS0tYWN0aXZlJyA6ICcnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1zZWN0aW9uX19wYXJ0bmVyXCI+JHtlc2NhcGVIdG1sKHMucGFydG5lcil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1zZWN0aW9uX19zbmFtZVwiPiR7ZXNjYXBlSHRtbChzLm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvbl9fZGVzY1wiPiR7ZXNjYXBlSHRtbChzLmRlc2MpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRldGFpbHMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYW0tZGV0YWlscy1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPiR7bmFtZX08L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicm9sZVwiPiR7cm9sZX08L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnaWYtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzcHJpdGVQYXRofVwiIGFsdD1cIlNwcml0ZSBkZSAke25hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE1HPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWRtZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoZG1nTWF4IC8gU1RBVF9NQVguZG1nKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZG1nTWlufSAtICR7ZG1nTWF4fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VklUPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLXNwZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoc3BlZWQgLyBTVEFUX01BWC5zcGVlZCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke3NwZWVkfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE9ER0U8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tZG9kZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGRvZGdlIC8gU1RBVF9NQVguZG9kZ2UpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkb2RnZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNSSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tY3JpdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoY3JpdCAvIFNUQVRfTUFYLmNyaXQpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtjcml0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+SFA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0taHBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGhwIC8gU1RBVF9NQVguaHApICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtocH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAke2FiaWxpdHlIdG1sfVxyXG4gICAgICAgICAgICAgICAgICAgICR7c3luZXJneUh0bWx9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tc2VsZWN0LXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7aXNTZWxlY3RlZCA/ICdEw6lzw6lsZWN0aW9ubmVyJyA6ICdTw6lsZWN0aW9ubmVyJ31cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYnRuUmlnaHQgPSBkZXRhaWxzLnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2VsZWN0LXJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVDYXQgPSBnZXRDYXRlZ29yeShwb3J0cmFpdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscmVhZHlTZWxlY3RlZCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEw6lzYWN0aXZlciBsZSBib3V0b24gc2kgbGUgc2xvdCBkZSBjZSByw7RsZSBlc3QgZMOpasOgIHByaXNcclxuICAgICAgICAgICAgaWYgKCFhbHJlYWR5U2VsZWN0ZWQgJiYgIWNhblNlbGVjdFJvbGUocG9ydHJhaXQpKSB7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IGBTbG90ICR7cm9sZUNhdH0gZMOpasOgIHByaXNgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzID0gc2VsZWN0ZWRIZXJvSWRzLmZpbHRlcihoaWQgPT4gaGlkICE9PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBzZWxlY3RlZEhlcm9lcy5maWx0ZXIoaCA9PiBoICE9PSBuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhblNlbGVjdFJvbGUocG9ydHJhaXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGBWb3VzIGF2ZXogZMOpasOgIHVuICR7cm9sZUNhdH0gZGFucyB2b3RyZSDDqXF1aXBlICFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCA+PSBtYXhTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJWb3VzIHBvdXZleiBzw6lsZWN0aW9ubmVyIG1heGltdW0gNCBwZXJzb25uYWdlcyAhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcy5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcy5wdXNoKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0ZWRUZWFtKCk7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZClcclxuICAgICAgICAgICAgICAgICAgICA/ICdEw6lzw6lsZWN0aW9ubmVyJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogJ1PDqWxlY3Rpb25uZXInO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyA9PT0gU1lORVJHWSBTWVNURU0gPT09XHJcbiAgICBjb25zdCB0ZWFtc1BhZ2VFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZWFtcy1wYWdlJyk7XHJcbiAgICBjb25zdCBzeW5lcmd5TWFwID0gdGVhbXNQYWdlRWwgPyBKU09OLnBhcnNlKHRlYW1zUGFnZUVsLmRhdGFzZXQuc3luZXJneU1hcCB8fCAne30nKSA6IHt9O1xyXG5cclxuICAgIC8qICBaT05FIMOJUVVJUEUg4oCUIHNwcml0ZXMgc2V1bGVtZW50ICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTZWxlY3RlZFRlYW0oKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm8gPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwID0+IHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAoIWhlcm8pIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGhlcm8uZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7aGVyby5kYXRhc2V0LnNwcml0ZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgaGVyb0VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWhlcm8tc3ByaXRlJyk7XHJcbiAgICAgICAgICAgIGhlcm9FbC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c3ByaXRlUGF0aH1cIiBhbHQ9XCJTcHJpdGUgZGUgJHtuYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+JHtuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgc2VsZWN0ZWRMaXN0LmFwcGVuZENoaWxkKGhlcm9FbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbGVzIGluZGljYXRldXJzIGRlIHLDtGxlc1xyXG4gICAgICAgIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCk7XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGxlcyBzeW5lcmdpZXNcclxuICAgICAgICB1cGRhdGVTeW5lcmd5SGlnaGxpZ2h0cygpO1xyXG5cclxuICAgICAgICBpZiAobGF1bmNoQnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5IZWFsZXIgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgbGF1bmNoQnRuLmRpc2FibGVkID0gIXRlYW1Db21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU3luZXJneUhpZ2hsaWdodHMoKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBleGlzdGluZyBzeW5lcmd5IGhpZ2hsaWdodHNcclxuICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgcC5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LWF2YWlsYWJsZScsICdzeW5lcmd5LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBjb25zdCBiYWRnZSA9IHAucXVlcnlTZWxlY3RvcignLnN5bmVyZ3ktYmFkZ2UnKTtcclxuICAgICAgICAgICAgaWYgKGJhZGdlKSBiYWRnZS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gR2V0IG5hbWVzIG9mIHNlbGVjdGVkIGhlcm9lc1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTmFtZXMgPSBzZWxlY3RlZEhlcm9JZHMubWFwKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHBwID0+IHBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHAgPyBwLmRhdGFzZXQubmFtZSA6IG51bGw7XHJcbiAgICAgICAgfSkuZmlsdGVyKEJvb2xlYW4pO1xyXG5cclxuICAgICAgICAvLyBGaW5kIGFjdGl2ZSBzeW5lcmdpZXMgKGJvdGggbWVtYmVycyBzZWxlY3RlZClcclxuICAgICAgICBjb25zdCBhY3RpdmVTeW5lcmdpZXMgPSBbXTtcclxuICAgICAgICBjb25zdCBzZWVuUGFpcnMgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgc2VsZWN0ZWROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzeW5lcmdpZXMgPSBzeW5lcmd5TWFwW25hbWVdIHx8IFtdO1xyXG4gICAgICAgICAgICBzeW5lcmdpZXMuZm9yRWFjaChzeW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkTmFtZXMuaW5jbHVkZXMoc3luLnBhcnRuZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFpcktleSA9IFtuYW1lLCBzeW4ucGFydG5lcl0uc29ydCgpLmpvaW4oJysnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlZW5QYWlycy5oYXMocGFpcktleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VlblBhaXJzLmFkZChwYWlyS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlU3luZXJnaWVzLnB1c2goeyBuYW1lMTogbmFtZSwgbmFtZTI6IHN5bi5wYXJ0bmVyLCBzeW5lcmd5TmFtZTogc3luLm5hbWUsIGRlc2M6IHN5bi5kZXNjIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcmsgc2VsZWN0ZWQgcG9ydHJhaXRzIHdpdGggYWN0aXZlIHN5bmVyZ3lcclxuICAgICAgICBhY3RpdmVTeW5lcmdpZXMuZm9yRWFjaChzeW4gPT4ge1xyXG4gICAgICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgocC5kYXRhc2V0Lm5hbWUgPT09IHN5bi5uYW1lMSB8fCBwLmRhdGFzZXQubmFtZSA9PT0gc3luLm5hbWUyKVxyXG4gICAgICAgICAgICAgICAgICAgICYmIHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhwLmRhdGFzZXQuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gSGlnaGxpZ2h0IHVuc2VsZWN0ZWQgcG9ydHJhaXRzIHRoYXQgaGF2ZSBzeW5lcmd5IHdpdGggc2VsZWN0ZWQgaGVyb2VzXHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMocC5kYXRhc2V0LmlkKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBwTmFtZSA9IHAuZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBjaGFyU3luZXJnaWVzID0gc3luZXJneU1hcFtwTmFtZV0gfHwgW107XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoaW5nID0gY2hhclN5bmVyZ2llcy5maWx0ZXIoc3luID0+IHNlbGVjdGVkTmFtZXMuaW5jbHVkZXMoc3luLnBhcnRuZXIpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaGluZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktYXZhaWxhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYWRnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UuY2xhc3NOYW1lID0gJ3N5bmVyZ3ktYmFkZ2UnO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLWxpbmtcIj48L2k+JztcclxuICAgICAgICAgICAgICAgIGJhZGdlLnRpdGxlID0gbWF0Y2hpbmcubWFwKHMgPT4gcy5uYW1lKS5qb2luKCcsICcpO1xyXG4gICAgICAgICAgICAgICAgcC5hcHBlbmRDaGlsZChiYWRnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzeW5lcmd5IGRpc3BsYXkgcGFuZWxcclxuICAgICAgICB1cGRhdGVTeW5lcmd5RGlzcGxheShhY3RpdmVTeW5lcmdpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVN5bmVyZ3lEaXNwbGF5KGFjdGl2ZVN5bmVyZ2llcykge1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3luZXJneS1kaXNwbGF5Jyk7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSAnc3luZXJneS1kaXNwbGF5JztcclxuICAgICAgICAgICAgY29uc3QgYWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC10ZWFtX19hY3Rpb25zJyk7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgYWN0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmVTeW5lcmdpZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5bmVyZ3ktZGlzcGxheV9fdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWxpbmtcIj48L2k+IFN5bmVyZ2llcyBhY3RpdmVzXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAke2FjdGl2ZVN5bmVyZ2llcy5tYXAocyA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzeW5lcmd5LWRpc3BsYXlfX25hbWVcIj4ke2VzY2FwZUh0bWwocy5zeW5lcmd5TmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19jaGFyc1wiPiR7ZXNjYXBlSHRtbChzLm5hbWUxKX0gKyAke2VzY2FwZUh0bWwocy5uYW1lMil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19kZXNjXCI+JHtlc2NhcGVIdG1sKHMuZGVzYyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUm9sZUluZGljYXRvcnMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgY29uc3QgaW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvbGUtaW5kaWNhdG9yJyk7XHJcbiAgICAgICAgaWYgKGluZGljYXRvcikge1xyXG4gICAgICAgICAgICBpbmRpY2F0b3IucXVlcnlTZWxlY3RvckFsbCgnLnJvbGUtc2xvdCcpLmZvckVhY2goc2xvdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSBzbG90LmRhdGFzZXQucm9sZTtcclxuICAgICAgICAgICAgICAgIGlmIChyb2xlc1tjYXRdID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICBQUkVTRVRTXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4gICAgY29uc3Qgc2F2ZVByZXNldEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2F2ZS1wcmVzZXQnKTtcclxuICAgIGNvbnN0IHByZXNldE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldE1vZGFsJyk7XHJcbiAgICBjb25zdCBwcmVzZXROYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0TmFtZScpO1xyXG4gICAgY29uc3QgcHJlc2V0Q29uZmlybUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRDb25maXJtJyk7XHJcbiAgICBjb25zdCBwcmVzZXRDYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0Q2FuY2VsJyk7XHJcblxyXG4gICAgLy8gTWV0dHJlIGEgam91ciBsZSBib3V0b24gc2F1dmVnYXJkZXIgc2Vsb24gbGEgc2VsZWN0aW9uXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTYXZlUHJlc2V0QnRuKCkge1xyXG4gICAgICAgIGlmIChzYXZlUHJlc2V0QnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5IZWFsZXIgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgc2F2ZVByZXNldEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcGVsZXIgdXBkYXRlU2F2ZVByZXNldEJ0biBhIGNoYXF1ZSBjaGFuZ2VtZW50IGRlIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0gPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcbiAgICAvLyBPbiBzdXJjaGFyZ2UgZW4gYWpvdXRhbnQgbCdhcHBlbFxyXG4gICAgY29uc3QgX29yaWdVcGRhdGUgPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcblxyXG4gICAgLy8gUGF0Y2g6IGFqb3V0ZXIgbCdhcHBlbCBhIHVwZGF0ZVNhdmVQcmVzZXRCdG4gZGFucyB1cGRhdGVTZWxlY3RlZFRlYW1cclxuICAgIC8vIE9uIGxlIGZhaXQgZW4gd3JhcHBhbnQgbGVzIGluZGljYXRldXJzXHJcbiAgICBjb25zdCBfb3JpZ1JvbGVJbmRpY2F0b3JzID0gdXBkYXRlUm9sZUluZGljYXRvcnM7XHJcblxyXG4gICAgLy8gT3V2cmlyIGxhIG1vZGFsXHJcbiAgICBpZiAoc2F2ZVByZXNldEJ0biAmJiBwcmVzZXRNb2RhbCkge1xyXG4gICAgICAgIHNhdmVQcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHByZXNldE5hbWVJbnB1dC5mb2N1cygpLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGZXJtZXIgbGEgbW9kYWxcclxuICAgICAgICBwcmVzZXRDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByZXNldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtbW9kYWxfX2JhY2tkcm9wJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNhdXZlZ2FyZGVyIGxlIHByZXNldFxyXG4gICAgICAgIHByZXNldENvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcmVzZXROYW1lSW5wdXQudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZGMxNDNjJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnLi4uJztcclxuXHJcbiAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvcHJlc2V0cy9zYXZlJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVySWRzOiBzZWxlY3RlZEhlcm9JZHMubWFwKE51bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWNoYXJnZXIgbGEgcGFnZSBwb3VyIGFmZmljaGVyIGxlIG5vdXZlYXUgcHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yIHx8ICdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUnKTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRW50ZXIgcG91ciB2YWxpZGVyXHJcbiAgICAgICAgcHJlc2V0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHByZXNldENvbmZpcm1CdG4uY2xpY2soKTtcclxuICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhcmdlciB1biBwcmVzZXQgKHNlbGVjdGlvbiBwcm9ncmFtbWF0aXF1ZSBkZXMgcGVyc29ubmFnZXMpXHJcbiAgICBmdW5jdGlvbiBsb2FkUHJlc2V0KGNoYXJhY3Rlcklkcykge1xyXG4gICAgICAgIC8vIFJlc2V0IGxhIHNlbGVjdGlvbiBhY3R1ZWxsZVxyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG5cclxuICAgICAgICAvLyBTZWxlY3Rpb25uZXIgbGVzIHBlcnNvbm5hZ2VzIGR1IHByZXNldFxyXG4gICAgICAgIGNoYXJhY3Rlcklkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWRTdHIgPSBTdHJpbmcoaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3J0cmFpdCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBpZFN0cik7XHJcbiAgICAgICAgICAgIGlmIChwb3J0cmFpdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWRTdHIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMucHVzaChwb3J0cmFpdC5kYXRhc2V0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICB1cGRhdGVTYXZlUHJlc2V0QnRuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3VwcHJpbWVyIHVuIHByZXNldFxyXG4gICAgZnVuY3Rpb24gZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwRWwpIHtcclxuICAgICAgICBpZiAoIWNvbmZpcm0oJ1N1cHByaW1lciBjZSBwcmVzZXQgPycpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGAvdGVhbXMvcHJlc2V0cy8ke3ByZXNldElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlwRWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTaSBwbHVzIGRlIHByZXNldHMsIGNhY2hlciBsYSBiYXJyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXRzLWJhcl9fbGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QgJiYgbGlzdC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0cy1iYXInKT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXR0YWNoZXIgbGVzIGV2ZW50cyBhdXggY2hpcHMgZGUgcHJlc2V0c1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZXNldC1jaGlwJykuZm9yRWFjaChjaGlwID0+IHtcclxuICAgICAgICBjb25zdCBwcmVzZXRJZCA9IGNoaXAuZGF0YXNldC5wcmVzZXRJZDtcclxuICAgICAgICBjb25zdCBjaGFySWRzID0gSlNPTi5wYXJzZShjaGlwLmRhdGFzZXQucHJlc2V0SWRzKTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2xvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbG9hZFByZXNldChjaGFySWRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2RlbGV0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9ic2VydmVyIGxlcyBjaGFuZ2VtZW50cyBkZSBzZWxlY3Rpb24gcG91ciBsZSBib3V0b24gc2F2ZVxyXG4gICAgLy8gT24gdXRpbGlzZSB1biBNdXRhdGlvbk9ic2VydmVyIHN1ciBzZWxlY3RlZExpc3RcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdXBkYXRlU2F2ZVByZXNldEJ0bigpKTtcclxuICAgIGlmIChzZWxlY3RlZExpc3QpIHtcclxuICAgICAgICBzZWxlY3RlZExpc3RPYnNlcnZlci5vYnNlcnZlKHNlbGVjdGVkTGlzdCwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhdW5jaEJ0bikge1xyXG4gICAgICAgIGxhdW5jaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnZvaSBQT1NUIEFKQVggdmVycyAvdGVhbXMvc2VsZWN0XHJcbiAgICAgICAgICAgICAgICBmZXRjaCgnL3RlYW1zL3NlbGVjdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogc2VsZWN0ZWRIZXJvSWRzLm1hcCgoaWQsIGkpID0+IGBjaGFyYWN0ZXJfaWRzWyR7aX1dPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGlkKX1gKS5qb2luKCcmJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlZGlyZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVkaXJpZ2UgbWFudWVsbGVtZW50IHNpIHBhcyBkZSByZWRpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbWF0Y2htYWtpbmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzw6lsZWN0aW9uIGRlIGxcXCfDqXF1aXBlLicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQUk9GSUxFIFBPUFVQXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1wb3B1cF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWNvbnRlbnRdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBvcHVwKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwb3B1cC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3Byb2ZpbGUtcG9wdXAtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwX19iYWNrZHJvcC0tb3BlbicpO1xyXG5cclxuICAgICAgICBpZiAoIWxvYWRlZCkge1xyXG4gICAgICAgICAgICBmZXRjaFByb2ZpbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cCk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmZXRjaFByb2ZpbGUoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9hcGkvcHJvZmlsZScpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9maWxlKGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lcnJvclwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclByb2ZpbGUoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdENsYXNzID0gKHIpID0+IHIgPT09ICd3aW4nID8gJ3Jlc3VsdC0td2luJyA6IHIgPT09ICdsb3NzJyA/ICdyZXN1bHQtLWxvc3MnIDogJ3Jlc3VsdC0tZHJhdyc7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0TGFiZWwgPSAocikgPT4gciA9PT0gJ3dpbicgPyAnVmljdG9pcmUnIDogciA9PT0gJ2xvc3MnID8gJ0RcXHUwMGU5ZmFpdGUnIDogJ051bCc7XHJcblxyXG4gICAgICAgIGNvbnN0IGF2YXRhckh0bWwgPSBkYXRhLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChkYXRhLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiQXZhdGFyIGRlICR7ZXNjYXBlSHRtbChkYXRhLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmFzIGZhLXVzZXItY2lyY2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPmA7XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faWRlbnRpdHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hdmF0YXJcIj4ke2F2YXRhckh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fdXNlcm5hbWVcIj4ke2VzY2FwZUh0bWwoZGF0YS51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5tb3R0byA/IGA8c3BhbiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX21vdHRvXCI+XFx1MDBhYiAke2VzY2FwZUh0bWwoZGF0YS5tb3R0byl9IFxcdTAwYmI8L3NwYW4+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5iaW8gPyBgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19iaW9cIj4ke2VzY2FwZUh0bWwoZGF0YS5iaW8pfTwvcD5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3RhdHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEucmF0aW5nKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPk1NUjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy53aW5zKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPlZpY3RvaXJlczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy5sb3NzZXMpKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+RFxcdTAwZTlmYWl0ZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMud2luUmF0ZSkpfSU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+V2luIFJhdGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXN0YXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IENoYW1waW9uIEZhdm9yaVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19uYW1lXCI+JHtlc2NhcGVIdG1sKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIubmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX3JvbGVcIj4ke2VzY2FwZUh0bWwoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5yb2xlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fY291bnRcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIuZ2FtZXNQbGF5ZWQpKX0gcGFydGllczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubGFzdFRlYW0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlcnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IERlcm5pXFx1MDBlOHJlIFxcdTAwYzlxdWlwZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5sYXN0VGVhbS5tYXAoYyA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX21lbWJlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoYy5uYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fcm9sZVwiPiR7ZXNjYXBlSHRtbChjLnJvbGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEucmVjZW50QmF0dGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zaGllbGQtYWx0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBIaXN0b3JpcXVlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5yZWNlbnRCYXR0bGVzLm1hcChiID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYXJlbmEvcmVwbGF5LyR7cGFyc2VJbnQoYi5pZCwgMTApfVwiIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19lbnRyeSAke3Jlc3VsdENsYXNzKGIucmVzdWx0KX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fcmVzdWx0XCI+JHtyZXN1bHRMYWJlbChiLnJlc3VsdCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19vcHBvbmVudFwiPnZzICR7ZXNjYXBlSHRtbChiLm9wcG9uZW50KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX3R5cGVcIj4ke2VzY2FwZUh0bWwoYi5tYXRjaFR5cGUpLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19kYXRlXCI+JHtlc2NhcGVIdG1sKGIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsYXkgcHJvZmlsZS1oaXN0b3J5X19yZXBsYXlcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZW1wdHlcIj5BdWN1biBjb21iYXQgZW5yZWdpc3RyXFx1MDBlOTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3Byb2ZpbGVcIiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2VkaXQtbGlua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gXFx1MDBjOWRpdGVyIGxlIHByb2ZpbFxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB9XHJcblxyXG59KTsiLCIvKipcclxuICogQ29tYmF0IEFuaW1hdGlvbiBDb250cm9sbGVyXHJcbiAqIEfDqHJlIGwnYWZmaWNoYWdlIHByb2dyZXNzaWYgZGVzIGxvZ3MgZGUgY29tYmF0IGF2ZWMgYW5pbWF0aW9uc1xyXG4gKi9cclxuY2xhc3MgQ29tYmF0Q29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLmxvZ3MgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFAgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICAvLyBSw6ljdXDDqXJlciBsZXMgbG9ncyBkZXB1aXMgbCdhdHRyaWJ1dCBkYXRhXHJcbiAgICAgICAgY29uc3QgbG9nc0RhdGEgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmNvbWJhdExvZ3M7XHJcbiAgICAgICAgaWYgKGxvZ3NEYXRhKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ3MgPSBKU09OLnBhcnNlKGxvZ3NEYXRhKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyZXVyIHBhcnNpbmcgbG9nczonLCBlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGVzIMOpbMOpbWVudHNcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1sb2ddJyk7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LW92ZXJsYXldJyk7XHJcbiAgICAgICAgdGhpcy5wbGF5QnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXBsYXldJyk7XHJcbiAgICAgICAgdGhpcy5za2lwQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXNraXBdJyk7XHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb21iYXQtc3BlZWRdJyk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgcGVyc29ubmFnZXMgYXZlYyBzdG9ja2FnZSBkZXMgSFAgbWF4IGluaXRpYXV4XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUCA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyU2x1Z3MgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlckhhc0hlYWwgPSB7fTtcclxuICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnMgPSB7fTsgLy8gU3VpdmkgZGVzIGNvb2xkb3ducyBlbiBjb3Vyc1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXMgPSB7fTsgLy8gU3VpdmkgZGVzIHN0YXR1dHMgYWN0aWZzIHBhciBwZXJzb25uYWdlXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2hhcmFjdGVyLW5hbWVdJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbC5kYXRhc2V0LmNoYXJhY3Rlck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJhY3RlclRlYW07XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW19LSR7bmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV0gPSBlbDtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJTbHVnIHx8ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3Rlckhhc0hlYWxba2V5XSA9IGVsLmRhdGFzZXQuaGFzSGVhbCA9PT0gJ3RydWUnO1xyXG5cclxuICAgICAgICAgICAgLy8gRXh0cmFpcmUgbGUgSFAgbWF4IGRlcHVpcyBsZSB0ZXh0ZSBpbml0aWFsXHJcbiAgICAgICAgICAgIGNvbnN0IGhwVGV4dCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcbiAgICAgICAgICAgIGlmIChocFRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gaHBUZXh0LnRleHRDb250ZW50Lm1hdGNoKC8oXFxkKylcXC8oXFxkKykvKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFBba2V5XSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhbGlzZXIgbGVzIHN0YXR1dHMgdmlkZXNcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldID0gdGhpcy5jcmVhdGVFbXB0eVN0YXR1c2VzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgw6lsw6ltZW50cyBkJ2FiaWxpdHkgZGFucyBsZXMgaW5mbyBwYW5lbHNcclxuICAgICAgICB0aGlzLmFiaWxpdHlFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGFyYWN0ZXItaW5mb1tkYXRhLWNoYXItbmFtZV0nKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsLmRhdGFzZXQuY2hhck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJUZWFtO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUVsID0gZWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5Jyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWw6IGFiaWxpdHlFbCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhDZDogcGFyc2VJbnQoYWJpbGl0eUVsLmRhdGFzZXQuYWJpbGl0eU1heENkKSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhZGdlOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LWNkLWJhZGdlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZUVsOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LW5hbWUnKSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uRWw6IGFiaWxpdHlFbC5xdWVyeVNlbGVjdG9yKCdpJyksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENhY2hlciBsJ292ZXJsYXlcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZpZGVyIGxlIGxvZ1xyXG4gICAgICAgIGlmICh0aGlzLmxvZ0NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF1ZGlvXHJcbiAgICAgICAgdGhpcy5hdWRpb1VubG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYXN0VHJhY2tJbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuaXNNdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudm9sdW1lID0gMC40O1xyXG4gICAgICAgIHRoaXMuc2Z4Vm9sdW1lID0gMC42O1xyXG4gICAgICAgIHRoaXMuY29tYmF0UGxheWxpc3QgPSBbXHJcbiAgICAgICAgICAgICcvYXNzZXQvYXVkaW8vY29tYmF0L2J1dGNoZXJzYm91bGV2YXJkbXVzaWMubXAzJyxcclxuICAgICAgICAgICAgJy9hc3NldC9hdWRpby9jb21iYXQvY29tYmF0aW50aGVydWlucy5tcDMnLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5zZnhDYWNoZSA9IHt9O1xyXG4gICAgICAgIHRoaXMubXV0ZUJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWF1ZGlvLW11dGVdJyk7XHJcbiAgICAgICAgdGhpcy52b2x1bWVTbGlkZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hdWRpby12b2x1bWVdJyk7XHJcbiAgICAgICAgdGhpcy5zZnhTbGlkZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZngtdm9sdW1lXScpO1xyXG5cclxuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lcnNcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gTGFuY2VyIGF1dG9tYXRpcXVlbWVudCBhcHLDqHMgdW4gZMOpbGFpXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBsYXkoKSwgODAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gU1RBVFVTIFRSQUNLSU5HID09PVxyXG5cclxuICAgIGNyZWF0ZUVtcHR5U3RhdHVzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYmxlZWRpbmc6IDAsXHJcbiAgICAgICAgICAgIGJsaWdodGVkOiAwLFxyXG4gICAgICAgICAgICBzdHVubmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgbWFya2VkOiAwLFxyXG4gICAgICAgICAgICBwcm90ZWN0ZWQ6IDAsXHJcbiAgICAgICAgICAgIHN0ZWFsdGhlZDogMCxcclxuICAgICAgICAgICAgcmlwb3N0ZTogMCxcclxuICAgICAgICAgICAgZG1nVXA6IDAsXHJcbiAgICAgICAgICAgIHNwZFVwOiAwLFxyXG4gICAgICAgICAgICBkb2RnZVVwOiAwLFxyXG4gICAgICAgICAgICBjcml0VXA6IDAsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDaGFyYWN0ZXJTdGF0dXNlcyhsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JvdW5kJzpcclxuICAgICAgICAgICAgICAgIHRoaXMudGlja1JvdW5kU3RhdHVzZXMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gdGlja1JvdW5kU3RhdHVzZXMgYWxyZWFkeSBjYWxscyByZW5kZXJBbGxTdGF0dXNJY29uc1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnYWJpbGl0eV91c2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBYmlsaXR5U3RhdHVzQ2hhbmdlKGxvZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2RlZmVuZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ3Byb3RlY3RlZCcsIGxvZy5kdXJhdGlvbiB8fCAyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfdGljayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnR1cm5zUmVtYWluaW5nICE9PSB1bmRlZmluZWQgJiYgbG9nLnR1cm5zUmVtYWluaW5nIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJywgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF90aWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudHVybnNSZW1haW5pbmcgIT09IHVuZGVmaW5lZCAmJiBsb2cudHVybnNSZW1haW5pbmcgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnc3R1bm5lZF9za2lwJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnc3R1bm5lZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIC8vIFN0ZWFsdGggY29uc3VtZWQgb24gYXR0YWNrXHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmF0dGFja2VyICYmIGxvZy5hdHRhY2tlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtsb2cuYXR0YWNrZXJUZWFtfS0ke2xvZy5hdHRhY2tlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0gJiYgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldLnN0ZWFsdGhlZCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldLnN0ZWFsdGhlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X3RyaWdnZXInOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTeW5lcmd5U3RhdHVzQ2hhbmdlKGxvZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJBbGxTdGF0dXNlcyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyQWxsU3RhdHVzSWNvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVBYmlsaXR5U3RhdHVzQ2hhbmdlKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnN1YnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGVlZGluZycsIGxvZy5ibGVlZFR1cm5zIHx8IDMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5hbGxIaXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpbWFyeSA9IGxvZy5hbGxIaXRzLmZpbmQoaCA9PiBoLmlzUHJpbWFyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByaW1hcnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMocHJpbWFyeS5uYW1lLCBwcmltYXJ5LnRlYW0sICdibGlnaHRlZCcsIGxvZy5ibGlnaHRUdXJucyB8fCAzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvZy50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsaWdodGVkJywgbG9nLmJsaWdodFR1cm5zIHx8IDMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW4nOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ3N0dW5uZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtYXJrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdtYXJrZWQnLCBsb2cubWFya1R1cm5zIHx8IDMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCAncmlwb3N0ZScsIGxvZy5yaXBvc3RlVHVybnMgfHwgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc2VsZl9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUJ1ZmZTdGF0dXNlcyhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLmJ1ZmZzLCBsb2cuYnVmZkR1cmF0aW9uIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseVRlYW1CdWZmU3RhdHVzZXMobG9nLmNhc3RlclRlYW0sIGxvZy5idWZmcywgbG9nLmJ1ZmZEdXJhdGlvbiB8fCAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdGVhbHRoJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sICdzdGVhbHRoZWQnLCBsb2cuc3RlYWx0aFR1cm5zIHx8IDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3RfZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ3Byb3RlY3RlZCcsIGxvZy5wcm90ZWN0VHVybnMgfHwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdkb2RnZVVwJywgbG9nLnByb3RlY3RUdXJucyB8fCAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdlbWVyZ2VuY3lfaGVhbCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnNlbGZCbGVlZFR1cm5zICYmIGxvZy5zZWxmQmxlZWRUdXJucyA+IDAgJiYgbG9nLmNhc3Rlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCAnYmxlZWRpbmcnLCBsb2cuc2VsZkJsZWVkVHVybnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvbnVzX3ZzX21hcmtlZCc6XHJcbiAgICAgICAgICAgICAgICAvLyBNYXJrIG1heSBiZSBjb25zdW1lZCBvbiBoaXQgKHJlbW92ZU9uSGl0KVxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0S2V5ID0gYCR7bG9nLnRhcmdldFRlYW19LSR7bG9nLnRhcmdldH1gO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGNhbid0IGtub3cgZm9yIHN1cmUgaWYgcmVtb3ZlT25IaXQsIHNvIGxlYXZlIHRoZSBpY29uIC0gaXQgd2lsbCB0aWNrIGRvd25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTeW5lcmd5U3RhdHVzQ2hhbmdlKGxvZykge1xyXG4gICAgICAgIGlmICghbG9nLmVmZmVjdFR5cGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgc3dpdGNoIChsb2cuZWZmZWN0VHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdncmFudF9yaXBvc3RlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5wYXJ0bmVyQ2hhciwgbG9nLnBhcnRuZXJDaGFyVGVhbSwgJ3JpcG9zdGUnLCBsb2cuZ3JhbnRlZFR1cm5zIHx8IDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RlbXBfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmJ1ZmZUeXBlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gbG9nLmJ1ZmZEdXJhdGlvbiB8fCAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZy5idWZmVHlwZXMuZm9yRWFjaCh0eXBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzS2V5ID0gdGhpcy5idWZmVHlwZVRvU3RhdHVzS2V5KHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cucGFydG5lckNoYXIsIGxvZy5wYXJ0bmVyQ2hhclRlYW0sIHN0YXR1c0tleSwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYXBwbHlfbWFyayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnbWFya2VkJywgbG9nLm1hcmtUdXJucyB8fCAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdncmFudF9kb2RnZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cucGFydG5lckNoYXIsIGxvZy5wYXJ0bmVyQ2hhclRlYW0sICdkb2RnZVVwJywgbG9nLmRvZGdlRHVyYXRpb24gfHwgMik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZXh0ZW5kX3N0ZWFsdGgnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5wYXJ0bmVyQ2hhciAmJiBsb2cucGFydG5lckNoYXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7bG9nLnBhcnRuZXJDaGFyVGVhbX0tJHtsb2cucGFydG5lckNoYXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XS5zdGVhbHRoZWQgKz0gKGxvZy5leHRyYVR1cm5zIHx8IDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdndWFyYW50ZWVkX2NyaXQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtLCAnY3JpdFVwJywgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYnVmZlR5cGVUb1N0YXR1c0tleSh0eXBlKSB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RhbWFnZSc6IHJldHVybiAnZG1nVXAnO1xyXG4gICAgICAgICAgICBjYXNlICdzcGVlZCc6IHJldHVybiAnc3BkVXAnO1xyXG4gICAgICAgICAgICBjYXNlICdkb2RnZSc6IHJldHVybiAnZG9kZ2VVcCc7XHJcbiAgICAgICAgICAgIGNhc2UgJ2NyaXQnOiByZXR1cm4gJ2NyaXRVcCc7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcHBseUJ1ZmZTdGF0dXNlcyhjaGFyTmFtZSwgdGVhbU5hbWUsIGJ1ZmZzLCBkdXJhdGlvbikge1xyXG4gICAgICAgIGlmICghYnVmZnMpIHJldHVybjtcclxuICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtTmFtZX0tJHtjaGFyTmFtZX1gO1xyXG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV07XHJcbiAgICAgICAgaWYgKCFzKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChidWZmcy5kYW1hZ2UgJiYgYnVmZnMuZGFtYWdlID4gMCkgcy5kbWdVcCA9IE1hdGgubWF4KHMuZG1nVXAsIGR1cmF0aW9uKTtcclxuICAgICAgICBpZiAoYnVmZnMuc3BlZWQgJiYgYnVmZnMuc3BlZWQgPiAwKSBzLnNwZFVwID0gTWF0aC5tYXgocy5zcGRVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgIGlmIChidWZmcy5kb2RnZSAmJiBidWZmcy5kb2RnZSA+IDApIHMuZG9kZ2VVcCA9IE1hdGgubWF4KHMuZG9kZ2VVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgIGlmIChidWZmcy5jcml0ICYmIGJ1ZmZzLmNyaXQgPiAwKSBzLmNyaXRVcCA9IE1hdGgubWF4KHMuY3JpdFVwLCBkdXJhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlUZWFtQnVmZlN0YXR1c2VzKHRlYW1OYW1lLCBidWZmcywgZHVyYXRpb24pIHtcclxuICAgICAgICBpZiAoIWJ1ZmZzKSByZXR1cm47XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5jaGFyYWN0ZXJTdGF0dXNlcykpIHtcclxuICAgICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKHRlYW1OYW1lICsgJy0nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmcy5kYW1hZ2UgJiYgYnVmZnMuZGFtYWdlID4gMCkgcy5kbWdVcCA9IE1hdGgubWF4KHMuZG1nVXAsIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmcy5zcGVlZCAmJiBidWZmcy5zcGVlZCA+IDApIHMuc3BkVXAgPSBNYXRoLm1heChzLnNwZFVwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZnMuZG9kZ2UgJiYgYnVmZnMuZG9kZ2UgPiAwKSBzLmRvZGdlVXAgPSBNYXRoLm1heChzLmRvZGdlVXAsIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmcy5jcml0ICYmIGJ1ZmZzLmNyaXQgPiAwKSBzLmNyaXRVcCA9IE1hdGgubWF4KHMuY3JpdFVwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RhdHVzKGNoYXJOYW1lLCB0ZWFtTmFtZSwgc3RhdHVzS2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW1OYW1lfS0ke2NoYXJOYW1lfWA7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0pIHJldHVybjtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV1bc3RhdHVzS2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyQWxsU3RhdHVzZXMoY2hhck5hbWUsIHRlYW1OYW1lKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gYCR7dGVhbU5hbWV9LSR7Y2hhck5hbWV9YDtcclxuICAgICAgICBpZiAodGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XSA9IHRoaXMuY3JlYXRlRW1wdHlTdGF0dXNlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aWNrUm91bmRTdGF0dXNlcygpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLmNoYXJhY3RlclN0YXR1c2VzKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzID0gdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldO1xyXG4gICAgICAgICAgICAvLyBET1RzOiBOT1QgZGVjcmVtZW50ZWQgaGVyZSwgaGFuZGxlZCBieSBibGVlZF90aWNrL2JsaWdodF90aWNrIGxvZ3NcclxuICAgICAgICAgICAgLy8gRGVjcmVtZW50IGR1cmF0aW9uLWJhc2VkIHN0YXR1c2VzIChza2lwIHBlcm1hbmVudCBidWZmcyA+PSA5OTkpXHJcbiAgICAgICAgICAgIGlmIChzLm1hcmtlZCA+IDAgJiYgcy5tYXJrZWQgPCA5OTkpIHMubWFya2VkLS07XHJcbiAgICAgICAgICAgIGlmIChzLnByb3RlY3RlZCA+IDAgJiYgcy5wcm90ZWN0ZWQgPCA5OTkpIHMucHJvdGVjdGVkLS07XHJcbiAgICAgICAgICAgIGlmIChzLnN0ZWFsdGhlZCA+IDAgJiYgcy5zdGVhbHRoZWQgPCA5OTkpIHMuc3RlYWx0aGVkLS07XHJcbiAgICAgICAgICAgIGlmIChzLnJpcG9zdGUgPiAwICYmIHMucmlwb3N0ZSA8IDk5OSkgcy5yaXBvc3RlLS07XHJcbiAgICAgICAgICAgIGlmIChzLmRtZ1VwID4gMCAmJiBzLmRtZ1VwIDwgOTk5KSBzLmRtZ1VwLS07XHJcbiAgICAgICAgICAgIGlmIChzLnNwZFVwID4gMCAmJiBzLnNwZFVwIDwgOTk5KSBzLnNwZFVwLS07XHJcbiAgICAgICAgICAgIGlmIChzLmRvZGdlVXAgPiAwICYmIHMuZG9kZ2VVcCA8IDk5OSkgcy5kb2RnZVVwLS07XHJcbiAgICAgICAgICAgIGlmIChzLmNyaXRVcCA+IDAgJiYgcy5jcml0VXAgPCA5OTkpIHMuY3JpdFVwLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVuZGVyQWxsU3RhdHVzSWNvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJBbGxTdGF0dXNJY29ucygpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLmNoYXJhY3RlclN0YXR1c2VzKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclN0YXR1c0ljb25zKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclN0YXR1c0ljb25zKGtleSkge1xyXG4gICAgICAgIGNvbnN0IGVsID0gdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1trZXldO1xyXG4gICAgICAgIGlmICghZWwpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZWwucXVlcnlTZWxlY3RvcignLnN0YXR1cy1pY29ucycpO1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV07XHJcbiAgICAgICAgY29uc3QgaWNvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gRGVidWZmc1xyXG4gICAgICAgIGlmIChzLmJsZWVkaW5nID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS10aW50JywgY2xzOiAnc3RhdHVzLWljb24tLWJsZWVkJywgdGl0bGU6ICdTYWlnbmVtZW50JyB9KTtcclxuICAgICAgICBpZiAocy5ibGlnaHRlZCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtc2t1bGwtY3Jvc3Nib25lcycsIGNsczogJ3N0YXR1cy1pY29uLS1ibGlnaHQnLCB0aXRsZTogJ1Blc3RlJyB9KTtcclxuICAgICAgICBpZiAocy5zdHVubmVkKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLWRpenp5JywgY2xzOiAnc3RhdHVzLWljb24tLXN0dW4nLCB0aXRsZTogJ0V0b3VyZGknIH0pO1xyXG4gICAgICAgIGlmIChzLm1hcmtlZCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtY3Jvc3NoYWlycycsIGNsczogJ3N0YXR1cy1pY29uLS1tYXJrJywgdGl0bGU6ICdNYXJxdWUnIH0pO1xyXG5cclxuICAgICAgICAvLyBCdWZmc1xyXG4gICAgICAgIGlmIChzLnByb3RlY3RlZCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtc2hpZWxkLWFsdCcsIGNsczogJ3N0YXR1cy1pY29uLS1wcm90ZWN0JywgdGl0bGU6ICdQcm90ZWdlJyB9KTtcclxuICAgICAgICBpZiAocy5zdGVhbHRoZWQgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLWV5ZS1zbGFzaCcsIGNsczogJ3N0YXR1cy1pY29uLS1zdGVhbHRoJywgdGl0bGU6ICdGdXJ0aWYnIH0pO1xyXG4gICAgICAgIGlmIChzLnJpcG9zdGUgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLWV4Y2hhbmdlLWFsdCcsIGNsczogJ3N0YXR1cy1pY29uLS1yaXBvc3RlJywgdGl0bGU6ICdSaXBvc3RlJyB9KTtcclxuICAgICAgICBpZiAocy5kbWdVcCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtZmlzdC1yYWlzZWQnLCBjbHM6ICdzdGF0dXMtaWNvbi0tZG1nLXVwJywgdGl0bGU6ICcrRGVnYXRzJyB9KTtcclxuICAgICAgICBpZiAocy5zcGRVcCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtd2luZCcsIGNsczogJ3N0YXR1cy1pY29uLS1zcGQtdXAnLCB0aXRsZTogJytWaXRlc3NlJyB9KTtcclxuICAgICAgICBpZiAocy5kb2RnZVVwID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1ydW5uaW5nJywgY2xzOiAnc3RhdHVzLWljb24tLWRvZGdlLXVwJywgdGl0bGU6ICcrRXNxdWl2ZScgfSk7XHJcbiAgICAgICAgaWYgKHMuY3JpdFVwID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1idWxsc2V5ZScsIGNsczogJ3N0YXR1cy1pY29uLS1jcml0LXVwJywgdGl0bGU6ICcrQ3JpdGlxdWUnIH0pO1xyXG5cclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gaWNvbnMubWFwKGkgPT5cclxuICAgICAgICAgICAgYDxzcGFuIGNsYXNzPVwic3RhdHVzLWljb24gJHtpLmNsc31cIiB0aXRsZT1cIiR7aS50aXRsZX1cIj48aSBjbGFzcz1cImZhcyAke2kuaWNvbn1cIj48L2k+PC9zcGFuPmBcclxuICAgICAgICApLmpvaW4oJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBFTkQgU1RBVFVTIFRSQUNLSU5HID09PVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheUJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZVBsYXkoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5za2lwQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2tpcCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuc2V0U3BlZWQoZSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBdWRpbyBjb250cm9sc1xyXG4gICAgICAgIGlmICh0aGlzLm11dGVCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVNdXRlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy52b2x1bWVTbGlkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy52b2x1bWVTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52b2x1bWUgPSBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbWJhdE11c2ljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21iYXRNdXNpYy52b2x1bWUgPSB0aGlzLmlzTXV0ZWQgPyAwIDogdGhpcy52b2x1bWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZnhTbGlkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZnhTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZnhWb2x1bWUgPSBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVbmxvY2sgYXVkaW8gb24gZmlyc3QgdXNlciBpbnRlcmFjdGlvbiAoYnJvd3NlciBhdXRvcGxheSBwb2xpY3kpXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1ZGlvVW5sb2NrZWQpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb1VubG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5TmV4dFRyYWNrKCk7XHJcbiAgICAgICAgfSwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nICYmICF0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTmV4dExvZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVBsYXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZyB8fCB0aGlzLmlzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2tpcCgpIHtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gQWZmaWNoZXIgdG91cyBsZXMgbG9ncyByZXN0YW50c1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9nID0gdGhpcy5sb2dzW3RoaXMuY3VycmVudEluZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TG9nKGxvZyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNrQWJpbGl0eUNvb2xkb3ducyhsb2cpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlclN0YXR1c2VzKGxvZyk7XHJcbiAgICAgICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2RlYXRoJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVhdGgobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFN5bmVyZ3kgdHJpZ2dlcnMgdGhhdCBraWxsIHRhcmdldHNcclxuICAgICAgICAgICAgaWYgKGxvZy50eXBlID09PSAnc3luZXJneV90cmlnZ2VyJyAmJiBsb2cudGFyZ2V0SFAgPT09IDAgJiYgbG9nLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVhdGgobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNob3dWaWN0b3J5T3ZlcmxheSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNwZWVkKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3Qgc3BlZWQgPSBwYXJzZUZsb2F0KGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb21iYXRTcGVlZCk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBsJ1VJXHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMuZm9yRWFjaChidG4gPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NOZXh0TG9nKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcgfHwgdGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWaWN0b3J5T3ZlcmxheSgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbG9nID0gdGhpcy5sb2dzW3RoaXMuY3VycmVudEluZGV4XTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NMb2cobG9nKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxlciBsZSBkw6lsYWlcclxuICAgICAgICBsZXQgZGVsYXkgPSB0aGlzLmdldERlbGF5Rm9yTG9nKGxvZyk7XHJcbiAgICAgICAgZGVsYXkgPSBkZWxheSAvIHRoaXMuc3BlZWQ7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9jZXNzTmV4dExvZygpLCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGVsYXlGb3JMb2cobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdyb3VuZCc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdpbml0aWF0aXZlJzogcmV0dXJuIDYwMDtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzogcmV0dXJuIDMwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOiByZXR1cm4gMjgwMDtcclxuICAgICAgICAgICAgY2FzZSAnZGVmZW5kJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RvZGdlJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzogcmV0dXJuIDM1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3QnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAndmljdG9yeSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2RyYXcnOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgLy8gTm91dmVhdXggdHlwZXNcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfdGljayc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVubmVkX3NraXAnOiByZXR1cm4gMTgwMDtcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6IHJldHVybiB0aGlzLmdldEFiaWxpdHlEZWxheShsb2cpO1xyXG4gICAgICAgICAgICAvLyBTeW5lcmdpZXNcclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV9hbm5vdW5jZSc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X3RyaWdnZXInOiByZXR1cm4gdGhpcy5nZXRTeW5lcmd5VHJpZ2dlckRlbGF5KGxvZyk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAxMjAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTeW5lcmd5VHJpZ2dlckRlbGF5KGxvZykge1xyXG4gICAgICAgIC8vIFJlYWN0aXZlIHN5bmVyZ2llcyAoYm9udXMgYXR0YWNrcykgbmVlZCBtb3JlIHRpbWVcclxuICAgICAgICBpZiAobG9nLmRhbWFnZSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gMzUwMDtcclxuICAgICAgICByZXR1cm4gMjUwMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBYmlsaXR5RGVsYXkobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cuc3VidHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOiByZXR1cm4gMzAwMDtcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6IHJldHVybiAzNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcmsnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9idWZmJzpcclxuICAgICAgICAgICAgY2FzZSAnc2VsZl9idWZmJzpcclxuICAgICAgICAgICAgY2FzZSAnc3RlYWx0aCc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9oZWFsJzogcmV0dXJuIDI4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2J1ZmYnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAnZW1lcmdlbmN5X2hlYWwnOiByZXR1cm4gMjgwMDtcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdF9kb2RnZSc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2Zvcm1fZGFtYWdlJzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAyMDAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTG9nKGxvZykge1xyXG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbihsb2cpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUxvZyhsb2cpO1xyXG5cclxuICAgICAgICAvLyBTeW5jaHJvbmlzZXIgbGEgbWlzZSDDoCBqb3VyIGRlcyBIUCBhdmVjIGwnYW5pbWF0aW9uXHJcbiAgICAgICAgY29uc3QgaHBEZWxheSA9IHRoaXMuZ2V0SFBVcGRhdGVEZWxheShsb2cpO1xyXG4gICAgICAgIGlmIChocERlbGF5ID4gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpLCBocERlbGF5IC8gdGhpcy5zcGVlZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTdWl2aSBkZXMgY29vbGRvd25zXHJcbiAgICAgICAgdGhpcy50cmFja0FiaWxpdHlDb29sZG93bnMobG9nKTtcclxuXHJcbiAgICAgICAgLy8gU3VpdmkgZGVzIHN0YXR1dHMgKGljb25lcyBidWZmL2RlYnVmZilcclxuICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlclN0YXR1c2VzKGxvZyk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhY2tBYmlsaXR5Q29vbGRvd25zKGxvZykge1xyXG4gICAgICAgIC8vIFF1YW5kIHVuZSBjb21ww6l0ZW5jZSBlc3QgdXRpbGlzw6llLCBtZXR0cmUgZW4gY29vbGRvd25cclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdhYmlsaXR5X3VzZScgJiYgbG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlEYXRhID0gdGhpcy5hYmlsaXR5RWxlbWVudHNba2V5XTtcclxuICAgICAgICAgICAgaWYgKGFiaWxpdHlEYXRhICYmIGFiaWxpdHlEYXRhLm1heENkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hYmlsaXR5Q29vbGRvd25zW2tleV0gPSBhYmlsaXR5RGF0YS5tYXhDZDtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheShrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBIGNoYXF1ZSBub3V2ZWF1IHJvdW5kLCBkw6ljcsOpbWVudGVyIHRvdXMgbGVzIGNvb2xkb3duc1xyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ3JvdW5kJykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmFiaWxpdHlDb29sZG93bnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheShrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUFiaWxpdHlDb29sZG93bkRpc3BsYXkoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgYWJpbGl0eURhdGEgPSB0aGlzLmFiaWxpdHlFbGVtZW50c1trZXldO1xyXG4gICAgICAgIGlmICghYWJpbGl0eURhdGEpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY2QgPSB0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XSB8fCAwO1xyXG5cclxuICAgICAgICBpZiAoY2QgPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIEVuIGNvb2xkb3duIDogZ3Jpc2VyICsgYWZmaWNoZXIgYmFkZ2VcclxuICAgICAgICAgICAgYWJpbGl0eURhdGEuZWwuY2xhc3NMaXN0LmFkZCgnY2hhcmFjdGVyLWluZm9fX2FiaWxpdHktLW9uLWNkJyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RGF0YS5iYWRnZSkge1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eURhdGEuYmFkZ2UudGV4dENvbnRlbnQgPSBgJHtjZH1UYDtcclxuICAgICAgICAgICAgICAgIGFiaWxpdHlEYXRhLmJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFByw6p0IDogcmV0aXJlciBsZSBncmlzXHJcbiAgICAgICAgICAgIGFiaWxpdHlEYXRhLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2NoYXJhY3Rlci1pbmZvX19hYmlsaXR5LS1vbi1jZCcpO1xyXG4gICAgICAgICAgICBpZiAoYWJpbGl0eURhdGEuYmFkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGFiaWxpdHlEYXRhLmJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SFBVcGRhdGVEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6IHJldHVybiAzNTA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOiByZXR1cm4gNDAwO1xyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6IHJldHVybiAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzogcmV0dXJuIDIwMDtcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOiByZXR1cm4gMjAwO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2FjdGl2YXRlJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAnYWJpbGl0eV91c2UnOiByZXR1cm4gdGhpcy5nZXRBYmlsaXR5SFBEZWxheShsb2cpO1xyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X3RyaWdnZXInOiByZXR1cm4gODAwO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWJpbGl0eUhQRGVsYXkobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cuc3VidHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfYXR0YWNrJzpcclxuICAgICAgICAgICAgY2FzZSAnYmFja2xpbmVfc3RyaWtlJzpcclxuICAgICAgICAgICAgY2FzZSAnYXJtb3JfcGllcmNlJzpcclxuICAgICAgICAgICAgY2FzZSAnYm9udXNfdnNfbWFya2VkJzpcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6IHJldHVybiAzNTA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2hlYWwnOlxyXG4gICAgICAgICAgICBjYXNlICdlbWVyZ2VuY3lfaGVhbCc6IHJldHVybiA0MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyYW5zZm9ybV9kYW1hZ2UnOiByZXR1cm4gMjAwO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGxheUFuaW1hdGlvbihsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmF0dGFja2VyLCBsb2cuYXR0YWNrZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgbG9nLmlzQ3JpdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVIZWFsKGxvZy5oZWFsZXIsIGxvZy5oZWFsZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZGVmZW5kJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlZmVuZChsb2cuZGVmZW5kZXIsIGxvZy5kZWZlbmRlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RvZGdlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURvZGdlKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWF0aChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gTm91dmVhdXggdHlwZXNcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfdGljayc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEb1QobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGVlZGluZycpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF90aWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsaWdodGVkJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3R1bm5lZF9za2lwJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN0dW5uZWQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYWN0aXZhdGUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5hdHRhY2tlciwgbG9nLmF0dGFja2VyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlBYmlsaXR5QW5pbWF0aW9uKGxvZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gU3luZXJnaWVzXHJcbiAgICAgICAgICAgIGNhc2UgJ3N5bmVyZ3lfYW5ub3VuY2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3luZXJneUFubm91bmNlKGxvZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV90cmlnZ2VyJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN5bmVyZ3lUcmlnZ2VyKGxvZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IE5PVVZFTExFUyBBTklNQVRJT05TID09PVxyXG5cclxuICAgIGFuaW1hdGVEb1QodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSwgZG90Q2xhc3MpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChkb3RDbGFzcyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoZG90Q2xhc3MpLCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVN0dW5uZWQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzdHVubmVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3N0dW5uZWQnKSwgMTQwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVNYXJrZWQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdtYXJrZWQnKTtcclxuICAgICAgICAgICAgLy8gTGEgbWFycXVlIHJlc3RlIHZpc2libGUgcGx1cyBsb25ndGVtcHNcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbWFya2VkJyksIDIwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlQnVmZih0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2J1ZmZlZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdidWZmZWQnKSwgMTQwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVTdGVhbHRoKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc3RlYWx0aGVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3N0ZWFsdGhlZCcpLCAxNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGxheUFiaWxpdHlBbmltYXRpb24obG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cuc3VidHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF9hdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFuaW1hdGVEb1QobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGVlZGluZycpLCA3MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBibGlnaHRLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKGJsaWdodEtleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KGJsaWdodEtleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FzdGVyRWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXN0ZXJFbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXN0ZXJFbC5jbGFzc0xpc3QuYWRkKCdhdHRhY2tpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjYXN0ZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCdhdHRhY2tpbmcnKSwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gQU9FOiBodXJ0IGFsbCBoaXQgZW5lbWllc1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5hbGxIaXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZy5hbGxIaXRzLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChoLm5hbWUsIGgudGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdodXJ0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdodXJ0JyksIDgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQmxpZ2h0IERPVCBhbmltYXRpb24gb25seSBvbiBwcmltYXJ5IHRhcmdldFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaW1hcnkgPSBsb2cuYWxsSGl0cy5maW5kKGggPT4gaC5pc1ByaW1hcnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmltYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hbmltYXRlRG9UKHByaW1hcnkubmFtZSwgcHJpbWFyeS50ZWFtLCAnYmxpZ2h0ZWQnKSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmFsbGJhY2sgZm9yIG9sZCBsb2cgZm9ybWF0XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFuaW1hdGVEb1QobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGlnaHRlZCcpLCA3MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW4nOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFuaW1hdGVTdHVubmVkKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKSwgNzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtYXJrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFya0tleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUobWFya0tleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KG1hcmtLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHRoaXMuYW5pbWF0ZU1hcmtlZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcmlwb3N0ZUtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUocmlwb3N0ZUtleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHJpcG9zdGVLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlbGZfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGZCdWZmS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFib21pbmF0aW9uIFRyYW5zZm9ybWF0aW9uIDogc3dpdGNoIHNsdWcgdG8gYmVhc3QgcGVybWFuZW50bHlcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9nLmFiaWxpdHlOYW1lID09PSAnVHJhbnNmb3JtYXRpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU2x1Z3Nbc2VsZkJ1ZmZLZXldID0gJ2JlYXN0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHNlbGZCdWZmS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoc2VsZkJ1ZmZLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0eUhlYWxLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChwYXJ0eUhlYWxLZXksICdoZWFsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuaW1lciB0b3VzIGxlcyBhbGxpw6lzIHNvaWduw6lzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvZy5oZWFsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nLmhlYWxlZC5mb3JFYWNoKGggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoaC5uYW1lLCBoLnRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaGVhbGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsZWQnKSwgMTUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydHlCdWZmS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShwYXJ0eUJ1ZmZLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChwYXJ0eUJ1ZmZLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gQW5pbWVyIHRvdXMgbGVzIGFsbGnDqXMgZHUgbcOqbWUgY8O0dMOpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVUZWFtQnVmZihsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3RlYWx0aCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0ZWFsdGhLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHN0ZWFsdGhLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChzdGVhbHRoS2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTdGVhbHRoKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy5pc0NyaXQgfHwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW1lcmdIZWFsS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoZW1lcmdIZWFsS2V5LCAnaGVhbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0X2RvZGdlJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdERvZGdlS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngocHJvdERvZGdlS2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWZlbmQobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyYW5zZm9ybV9kYW1hZ2UnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2h1cnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdodXJ0JyksIDgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVUZWFtQnVmZihjYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5jaGFyYWN0ZXJFbGVtZW50cykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoY2FzdGVyVGVhbSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1trZXldO1xyXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnYnVmZmVkJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2J1ZmZlZCcpLCAxNDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBTWU5FUkdZIEFOSU1BVElPTlMgPT09XHJcblxyXG4gICAgYW5pbWF0ZVN5bmVyZ3lBbm5vdW5jZShsb2cpIHtcclxuICAgICAgICBjb25zdCB0cmlnZ2VyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50cmlnZ2VyQ2hhciwgbG9nLnRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHBhcnRuZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLnBhcnRuZXJDaGFyLCBsb2cudGVhbSk7XHJcblxyXG4gICAgICAgIGlmICh0cmlnZ2VyKSB7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1hbm5vdW5jZS1nbG93Jyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LWFubm91bmNlLWdsb3cnKSwgMTUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJ0bmVyKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGFydG5lci5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWFubm91bmNlLWdsb3cnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcGFydG5lci5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LWFubm91bmNlLWdsb3cnKSwgMTUwMCk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEcmF3IFNWRyBsaW5rIGJldHdlZW4gdGhlIHR3b1xyXG4gICAgICAgIGlmICh0cmlnZ2VyICYmIHBhcnRuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3U3luZXJneUxpbmsodHJpZ2dlciwgcGFydG5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVTeW5lcmd5VHJpZ2dlcihsb2cpIHtcclxuICAgICAgICBjb25zdCB0cmlnZ2VyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50cmlnZ2VyQ2hhciwgbG9nLnRyaWdnZXJDaGFyVGVhbSk7XHJcbiAgICAgICAgY29uc3QgcGFydG5lciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cucGFydG5lckNoYXIsIGxvZy5wYXJ0bmVyQ2hhclRlYW0pO1xyXG5cclxuICAgICAgICAvLyBQaGFzZSAxOiBUcmlnZ2VyIGdsb3dcclxuICAgICAgICBpZiAodHJpZ2dlcikge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktdHJpZ2dlci1nbG93Jyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LXRyaWdnZXItZ2xvdycpLCAxODAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFBoYXNlIDI6IFNWRyBsaW5rIGJldHdlZW4gdHJpZ2dlciBhbmQgcGFydG5lclxyXG4gICAgICAgIGlmICh0cmlnZ2VyICYmIHBhcnRuZXIpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmRyYXdTeW5lcmd5TGluayh0cmlnZ2VyLCBwYXJ0bmVyKSwgNDAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFBoYXNlIDM6IFBhcnRuZXIgcmVhY3Rpb25cclxuICAgICAgICBpZiAocGFydG5lcikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBhcnRuZXIuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1yZWFjdCcpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwYXJ0bmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3N5bmVyZ3ktcmVhY3QnKSwgODAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpdCdzIGEgYm9udXMgYXR0YWNrLCBhbmltYXRlIHRoZSBwYXJ0bmVyIGF0dGFja2luZ1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5kYW1hZ2UgIT09IHVuZGVmaW5lZCAmJiBsb2cudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydG5lcktleSA9IGAke2xvZy5wYXJ0bmVyQ2hhclRlYW19LSR7bG9nLnBhcnRuZXJDaGFyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHBhcnRuZXJLZXksICdhdHRhY2thbmltYXRpb24ud2VicCcsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngocGFydG5lcktleSwgJ2F0dGFjaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcpLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1N5bmVyZ3lMaW5rKGVsMSwgZWwyKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhZ2UgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYmF0dGxlLXN0YWdlJyk7XHJcbiAgICAgICAgaWYgKCFzdGFnZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgZXhpc3RpbmcgU1ZHIGlmIGFueVxyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nU3ZnID0gc3RhZ2UucXVlcnlTZWxlY3RvcignLnN5bmVyZ3ktbGluay1zdmcnKTtcclxuICAgICAgICBpZiAoZXhpc3RpbmdTdmcpIGV4aXN0aW5nU3ZnLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpO1xyXG4gICAgICAgIHN2Zy5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWxpbmstc3ZnJyk7XHJcbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpO1xyXG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YWdlUmVjdCA9IHN0YWdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IHJlY3QxID0gZWwxLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IHJlY3QyID0gZWwyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICBjb25zdCB4MSA9IHJlY3QxLmxlZnQgKyByZWN0MS53aWR0aCAvIDIgLSBzdGFnZVJlY3QubGVmdDtcclxuICAgICAgICBjb25zdCB5MSA9IHJlY3QxLnRvcCArIHJlY3QxLmhlaWdodCAvIDIgLSBzdGFnZVJlY3QudG9wO1xyXG4gICAgICAgIGNvbnN0IHgyID0gcmVjdDIubGVmdCArIHJlY3QyLndpZHRoIC8gMiAtIHN0YWdlUmVjdC5sZWZ0O1xyXG4gICAgICAgIGNvbnN0IHkyID0gcmVjdDIudG9wICsgcmVjdDIuaGVpZ2h0IC8gMiAtIHN0YWdlUmVjdC50b3A7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2xpbmUnKTtcclxuICAgICAgICBsaW5lLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktbGluay1saW5lJyk7XHJcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgeDEpO1xyXG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd5MScsIHkxKTtcclxuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgneDInLCB4Mik7XHJcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgeTIpO1xyXG5cclxuICAgICAgICBzdmcuYXBwZW5kQ2hpbGQobGluZSk7XHJcbiAgICAgICAgc3RhZ2UuYXBwZW5kQ2hpbGQoc3ZnKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGFmdGVyIGFuaW1hdGlvblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc3ZnLnJlbW92ZSgpLCAxODAwIC8gdGhpcy5zcGVlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IFNQUklURSBTV0FQID09PVxyXG5cclxuICAgIHN3YXBTcHJpdGUoa2V5LCBzcHJpdGVOYW1lLCBkdXJhdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVsID0gdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1trZXldO1xyXG4gICAgICAgIGlmICghZWwpIHJldHVybjtcclxuICAgICAgICBjb25zdCBzbHVnID0gdGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldO1xyXG4gICAgICAgIGlmICghc2x1ZykgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGltZyA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItc3ByaXRlJyk7XHJcbiAgICAgICAgaWYgKCFpbWcpIHJldHVybjtcclxuICAgICAgICBpbWcuc3JjID0gYC9hc3NldC9pbWcvY29tYmF0LyR7c2x1Z30vJHtzcHJpdGVOYW1lfWA7XHJcbiAgICAgICAgaWYgKGR1cmF0aW9uID4gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWFkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjID0gYC9hc3NldC9pbWcvY29tYmF0LyR7dGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldfS9maWdodGlkbGUud2VicGA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IEFOSU1BVElPTlMgRVhJU1RBTlRFUyA9PT1cclxuXHJcbiAgICBhbmltYXRlQXR0YWNrKGF0dGFja2VyTmFtZSwgYXR0YWNrZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtLCBpc0NyaXQpIHtcclxuICAgICAgICBjb25zdCBhdHRhY2tlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChhdHRhY2tlck5hbWUsIGF0dGFja2VyVGVhbSk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG5cclxuICAgICAgICBpZiAoYXR0YWNrZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7YXR0YWNrZXJUZWFtfS0ke2F0dGFja2VyTmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnYXR0YWNrYW5pbWF0aW9uLndlYnAnLCAxMjAwKTtcclxuICAgICAgICAgICAgYXR0YWNrZXIuY2xhc3NMaXN0LmFkZCgnYXR0YWNraW5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoa2V5LCAnYXR0YWNrJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gYXR0YWNrZXIuY2xhc3NMaXN0LnJlbW92ZSgnYXR0YWNraW5nJyksIDEyMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdodXJ0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNDcml0KSB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnY3JpdCcpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcsICdjcml0JyksIDgwMCk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVIZWFsKGhlYWxlck5hbWUsIGhlYWxlclRlYW0sIHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCBoZWFsZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoaGVhbGVyTmFtZSwgaGVhbGVyVGVhbSk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG5cclxuICAgICAgICBpZiAoaGVhbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2hlYWxlclRlYW19LSR7aGVhbGVyTmFtZX1gO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGFyYWN0ZXJIYXNIZWFsW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShrZXksICdoZWFsaW5nLndlYnAnLCAxNTAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShrZXksICdza2lsbC53ZWJwJywgMTUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaGVhbGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWxpbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChrZXksICdoZWFsJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaGVhbGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxpbmcnKSwgMTUwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdoZWFsZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaGVhbGVkJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRGVmZW5kKGRlZmVuZGVyTmFtZSwgZGVmZW5kZXJUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgZGVmZW5kZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoZGVmZW5kZXJOYW1lLCBkZWZlbmRlclRlYW0pO1xyXG4gICAgICAgIGlmIChkZWZlbmRlcikge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtkZWZlbmRlclRlYW19LSR7ZGVmZW5kZXJOYW1lfWA7XHJcbiAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShrZXksICdkZWZlbmRpbmcud2VicCcsIDE4MDApO1xyXG4gICAgICAgICAgICBkZWZlbmRlci5jbGFzc0xpc3QuYWRkKCdkZWZlbmRpbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChrZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGRlZmVuZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlZmVuZGluZycpLCAxODAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURvZGdlKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZG9kZ2luZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkb2RnaW5nJyksIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRGVhdGgodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdkZWFkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldENoYXJhY3RlckVsZW1lbnQobmFtZSwgdGVhbSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2Ake3RlYW19LSR7bmFtZX1gXTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5TG9nKGxvZykge1xyXG4gICAgICAgIGlmICghdGhpcy5sb2dDb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgZW50cnkuY2xhc3NOYW1lID0gJ2NvbWJhdC1sb2dfX2VudHJ5JztcclxuXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAncm91bmQnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1yb3VuZCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICd2aWN0b3J5Jykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tdmljdG9yeScpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdkcmF3Jykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tZGVmZWF0Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2FiaWxpdHlfdXNlJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tYWJpbGl0eScpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdibGVlZF90aWNrJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tYmxlZWQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYmxpZ2h0X3RpY2snKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1ibGlnaHQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnc3R1bm5lZF9za2lwJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tc3R1bicpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdyaXBvc3RlX2FjdGl2YXRlJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tcmlwb3N0ZScpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdzeW5lcmd5X2Fubm91bmNlJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tc3luZXJneS1hbm5vdW5jZScpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdzeW5lcmd5X3RyaWdnZXInKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1zeW5lcmd5LXRyaWdnZXInKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVudHJ5LmlubmVySFRNTCA9IGxvZy5tZXNzYWdlO1xyXG4gICAgICAgIHRoaXMubG9nQ29udGFpbmVyLmFwcGVuZENoaWxkKGVudHJ5KTtcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5zY3JvbGxUb3AgPSB0aGlzLmxvZ0NvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSGVhbHRoQmFycyhsb2cpIHtcclxuICAgICAgICBsZXQgY2hhcmFjdGVyTmFtZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IHRlYW1OYW1lID0gbnVsbDtcclxuICAgICAgICBsZXQgY3VycmVudEhQID0gbnVsbDtcclxuICAgICAgICBsZXQgbWF4SFAgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBEw6l0ZXJtaW5lciBsZXMgZG9ubsOpZXMgc2Vsb24gbGUgdHlwZSBkZSBsb2dcclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdhdHRhY2snIHx8IGxvZy50eXBlID09PSAncmlwb3N0ZV9hY3RpdmF0ZScpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2hlYWwnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdibGVlZF90aWNrJyB8fCBsb2cudHlwZSA9PT0gJ2JsaWdodF90aWNrJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYWJpbGl0eV91c2UnKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQWJpbGl0eUhlYWx0aEJhcnMobG9nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdzeW5lcmd5X3RyaWdnZXInKSB7XHJcbiAgICAgICAgICAgIC8vIFN5bmVyZ2llcyBjYW4gY2F1c2UgZGFtYWdlXHJcbiAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRIUCAhPT0gdW5kZWZpbmVkICYmIGxvZy50YXJnZXRNYXhIUCkge1xyXG4gICAgICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIHNpIG5vdXMgYXZvbnMgbGVzIGRvbm7DqWVzIG7DqWNlc3NhaXJlc1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJOYW1lICYmIHRlYW1OYW1lICYmIGN1cnJlbnRIUCAhPT0gbnVsbCAmJiBjdXJyZW50SFAgIT09IHVuZGVmaW5lZCAmJiBtYXhIUCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsIG1heEhQKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQWJpbGl0eUhlYWx0aEJhcnMobG9nKSB7XHJcbiAgICAgICAgLy8gQU9FIGhpdHMgKGJsaWdodF9hdHRhY2spOiB1cGRhdGUgSFAgZm9yIGFsbCBoaXQgZW5lbWllc1xyXG4gICAgICAgIGlmIChsb2cuYWxsSGl0cykge1xyXG4gICAgICAgICAgICBsb2cuYWxsSGl0cy5mb3JFYWNoKGggPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChoLm5hbWUsIGgudGVhbSwgaC5ocCwgaC5tYXhIcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICAvLyBDb21ww6l0ZW5jZXMgcXVpIGluZmxpZ2VudCBkZXMgZMOpZ8OidHMgw6AgdW5lIGNpYmxlXHJcbiAgICAgICAgZWxzZSBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0SFAgIT09IHVuZGVmaW5lZCAmJiBsb2cudGFyZ2V0TWF4SFApIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgbG9nLnRhcmdldEhQLCBsb2cudGFyZ2V0TWF4SFApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU29pbiBkZSBncm91cGUgOiBtZXR0cmUgw6Agam91ciBjaGFxdWUgYWxsacOpIHNvaWduw6lcclxuICAgICAgICBpZiAobG9nLnN1YnR5cGUgPT09ICdwYXJ0eV9oZWFsJyAmJiBsb2cuaGVhbGVkKSB7XHJcbiAgICAgICAgICAgIGxvZy5oZWFsZWQuZm9yRWFjaChoID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAoaC5uYW1lLCBoLnRlYW0sIGguaHAsIGgubWF4SHApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNvaW4gZCd1cmdlbmNlIDogbWV0dHJlIMOgIGpvdXIgbGUgbGFuY2V1clxyXG4gICAgICAgIGlmIChsb2cuc3VidHlwZSA9PT0gJ2VtZXJnZW5jeV9oZWFsJyAmJiBsb2cuY2FzdGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy50YXJnZXRIUCwgbG9nLnRhcmdldE1heEhQKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2hhcmFjdGVySFAoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCwgbWF4SFApIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUpO1xyXG5cclxuICAgICAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwZXJjZW50ID0gbWF4SFAgPiAwID8gKGN1cnJlbnRIUCAvIG1heEhQKSAqIDEwMCA6IDA7XHJcblxyXG4gICAgICAgIC8vIE1pc2Ugw6Agam91ciBkZSBsYSBiYXJyZSBIUCBkYW5zIGxhIHpvbmUgZGUgY29tYmF0IChiYXR0bGUtc3RhZ2UpXHJcbiAgICAgICAgY29uc3QgaHBCYXIgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmhwLWJhcl9fZmlsbCcpO1xyXG4gICAgICAgIGNvbnN0IGhwVGV4dCA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuaHAtdGV4dCcpO1xyXG5cclxuICAgICAgICBpZiAoaHBCYXIpIHtcclxuICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGZsdWlkZSBkZSBsYSBiYXJyZVxyXG4gICAgICAgICAgICBocEJhci5zdHlsZS50cmFuc2l0aW9uID0gYHdpZHRoIDAuM3MgZWFzZS1vdXRgO1xyXG4gICAgICAgICAgICBocEJhci5zdHlsZS53aWR0aCA9IGAke3BlcmNlbnR9JWA7XHJcblxyXG4gICAgICAgICAgICAvLyBDbGFzc2VzIGRlIGNvdWxldXIgc2Vsb24gbGUgcG91cmNlbnRhZ2VcclxuICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LnJlbW92ZSgnaHAtYmFyX19maWxsLS1sb3cnLCAnaHAtYmFyX19maWxsLS1jcml0aWNhbCcpO1xyXG4gICAgICAgICAgICBpZiAocGVyY2VudCA8PSAyNSkge1xyXG4gICAgICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LmFkZCgnaHAtYmFyX19maWxsLS1jcml0aWNhbCcpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBlcmNlbnQgPD0gNTApIHtcclxuICAgICAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5hZGQoJ2hwLWJhcl9fZmlsbC0tbG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChocFRleHQpIHtcclxuICAgICAgICAgICAgaHBUZXh0LnRleHRDb250ZW50ID0gYCR7Y3VycmVudEhQfS8ke21heEhQfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNaXNlIMOgIGpvdXIgZGVzIHBhbm5lYXV4IGQnaW5mbyBsYXTDqXJhdXhcclxuICAgICAgICB0aGlzLnVwZGF0ZUluZm9QYW5lbChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVJbmZvUGFuZWwoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCkge1xyXG4gICAgICAgIC8vIFRyb3V2ZXIgbGUgYm9uIHBhbm5lYXUgc2Vsb24gbCfDqXF1aXBlXHJcbiAgICAgICAgY29uc3QgcGFuZWxDbGFzcyA9IHRlYW1OYW1lID09PSAnRXF1aXBlIDEnID8gJy5pbmZvLXBhbmVsLS10ZWFtMScgOiAnLmluZm8tcGFuZWwtLXRlYW0yJztcclxuICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IocGFuZWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGlmICghcGFuZWwpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gVHJvdXZlciBsZSBwZXJzb25uYWdlIGRhbnMgbGUgcGFubmVhdSBwYXIgc29uIG5vbVxyXG4gICAgICAgIGNvbnN0IGNoYXJhY3RlckluZm9zID0gcGFuZWwucXVlcnlTZWxlY3RvckFsbCgnLmNoYXJhY3Rlci1pbmZvJyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBpbmZvIG9mIGNoYXJhY3RlckluZm9zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWVFbCA9IGluZm8ucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19uYW1lJyk7XHJcbiAgICAgICAgICAgIGlmIChuYW1lRWwgJiYgbmFtZUVsLnRleHRDb250ZW50LnRyaW0oKSA9PT0gY2hhcmFjdGVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHNTcGFuID0gaW5mby5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX3N0YXRzIHNwYW4nKTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0c1NwYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0c1NwYW4udGV4dENvbnRlbnQgPSBjdXJyZW50SFA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuaW1hdGlvbiBmbGFzaCBwb3VyIG1vbnRyZXIgbGUgY2hhbmdlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzU3Bhbi5jbGFzc0xpc3QuYWRkKCdocC11cGRhdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzdGF0c1NwYW4uY2xhc3NMaXN0LnJlbW92ZSgnaHAtdXBkYXRlZCcpLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ZpY3RvcnlPdmVybGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZpbmFsaXNlciBsZSBNTVIgYSBsYSBmaW4gZHUgY29tYmF0XHJcbiAgICAgICAgdGhpcy5maW5hbGl6ZVJhdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmFsaXplUmF0aW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGZpbmFsaXplVXJsID0gdGhpcy5jb250YWluZXIuZGF0YXNldC5maW5hbGl6ZVVybDtcclxuICAgICAgICBpZiAoIWZpbmFsaXplVXJsKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGZpbmFsaXplVXJsLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgJiYgZGF0YS5yYXRpbmdDaGFuZ2UgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JhdGluZ1VwZGF0ZShkYXRhLnJhdGluZ0NoYW5nZSwgZGF0YS5uZXdSYXRpbmcsIGRhdGEubmV3UmF0aW5nMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcignRXJyZXVyIGZpbmFsaXNhdGlvbiByYXRpbmc6JywgZXJyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1JhdGluZ1VwZGF0ZShjaGFuZ2UsIG5ld1JhdGluZywgbmV3UmF0aW5nMikge1xyXG4gICAgICAgIC8vIE1ldHRyZSBhIGpvdXIgbGUgTU1SIGFmZmljaGUgZGFucyBsZSBwYW5uZWF1IGpvdWV1ciAoRXF1aXBlIDEpXHJcbiAgICAgICAgY29uc3QgcmF0aW5nRWwgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW5mby1wYW5lbC0tdGVhbTEgLmluZm8tcGFuZWxfX3JhdGluZycpO1xyXG4gICAgICAgIGlmIChyYXRpbmdFbCAmJiBuZXdSYXRpbmcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmF0aW5nRWwuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHtuZXdSYXRpbmd9IE1NUmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIE1NUiBhZmZpY2hlIGRhbnMgbGUgcGFubmVhdSBhZHZlcnNhaXJlIChFcXVpcGUgMilcclxuICAgICAgICBjb25zdCByYXRpbmdFbDIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW5mby1wYW5lbC0tdGVhbTIgLmluZm8tcGFuZWxfX3JhdGluZy0tZW5lbXknKTtcclxuICAgICAgICBpZiAocmF0aW5nRWwyICYmIG5ld1JhdGluZzIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmF0aW5nRWwyLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7bmV3UmF0aW5nMn0gTU1SYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFmZmljaGVyIGxhIG5vdGlmaWNhdGlvbiBkZSBjaGFuZ2VtZW50IGRhbnMgbCdvdmVybGF5XHJcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1vdmVybGF5XScpO1xyXG4gICAgICAgIGlmIChvdmVybGF5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdpbm5lckRpdiA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignLmJhdHRsZS1zdGFnZV9fd2lubmVyJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGFuZ2VtZW50IE1NUiBFcXVpcGUgMVxyXG4gICAgICAgICAgICBjb25zdCBub3RpZjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbm90aWYxLmNsYXNzTmFtZSA9ICdyYXRpbmctY2hhbmdlJztcclxuICAgICAgICAgICAgbm90aWYxLnN0eWxlLmNzc1RleHQgPSAnZm9udC1zaXplOjEuMnJlbTttYXJnaW4tdG9wOjEycHg7Zm9udC13ZWlnaHQ6Ym9sZDtvcGFjaXR5OjA7dHJhbnNpdGlvbjpvcGFjaXR5IDAuNXM7JztcclxuICAgICAgICAgICAgbm90aWYxLnRleHRDb250ZW50ID0gY2hhbmdlID4gMCA/IGBFcXVpcGUgMSA6ICske2NoYW5nZX0gTU1SYCA6IGBFcXVpcGUgMSA6ICR7Y2hhbmdlfSBNTVJgO1xyXG4gICAgICAgICAgICBub3RpZjEuc3R5bGUuY29sb3IgPSBjaGFuZ2UgPiAwID8gJyM0Y2FmNTAnIDogJyNmNDQzMzYnO1xyXG4gICAgICAgICAgICB3aW5uZXJEaXYuYXBwZW5kQ2hpbGQobm90aWYxKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoYW5nZW1lbnQgTU1SIEVxdWlwZSAyIChpbnZlcnNlKVxyXG4gICAgICAgICAgICBjb25zdCBjaGFuZ2UyID0gLWNoYW5nZTtcclxuICAgICAgICAgICAgY29uc3Qgbm90aWYyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG5vdGlmMi5jbGFzc05hbWUgPSAncmF0aW5nLWNoYW5nZSc7XHJcbiAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZToxLjJyZW07bWFyZ2luLXRvcDo2cHg7Zm9udC13ZWlnaHQ6Ym9sZDtvcGFjaXR5OjA7dHJhbnNpdGlvbjpvcGFjaXR5IDAuNXM7JztcclxuICAgICAgICAgICAgbm90aWYyLnRleHRDb250ZW50ID0gY2hhbmdlMiA+IDAgPyBgRXF1aXBlIDIgOiArJHtjaGFuZ2UyfSBNTVJgIDogYEVxdWlwZSAyIDogJHtjaGFuZ2UyfSBNTVJgO1xyXG4gICAgICAgICAgICBub3RpZjIuc3R5bGUuY29sb3IgPSBjaGFuZ2UyID4gMCA/ICcjNGNhZjUwJyA6ICcjZjQ0MzM2JztcclxuICAgICAgICAgICAgd2lubmVyRGl2LmFwcGVuZENoaWxkKG5vdGlmMik7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgbm90aWYyLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBBVURJTyA9PT1cclxuXHJcbiAgICBwbGF5TmV4dFRyYWNrKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdWRpb1VubG9ja2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbWJhdE11c2ljKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tYmF0TXVzaWMucGF1c2UoKTtcclxuICAgICAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpZHggPSB0aGlzLmdldFJhbmRvbVRyYWNrSW5kZXgoKTtcclxuICAgICAgICB0aGlzLmNvbWJhdE11c2ljID0gbmV3IEF1ZGlvKHRoaXMuY29tYmF0UGxheWxpc3RbaWR4XSk7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYy52b2x1bWUgPSB0aGlzLmlzTXV0ZWQgPyAwIDogdGhpcy52b2x1bWU7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYy5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsICgpID0+IHRoaXMucGxheU5leHRUcmFjaygpKTtcclxuICAgICAgICB0aGlzLmNvbWJhdE11c2ljLnBsYXkoKS5jYXRjaCgoKSA9PiB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmFuZG9tVHJhY2tJbmRleCgpIHtcclxuICAgICAgICBsZXQgaTtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmNvbWJhdFBsYXlsaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgfSB3aGlsZSAoaSA9PT0gdGhpcy5sYXN0VHJhY2tJbmRleCAmJiB0aGlzLmNvbWJhdFBsYXlsaXN0Lmxlbmd0aCA+IDEpO1xyXG4gICAgICAgIHRoaXMubGFzdFRyYWNrSW5kZXggPSBpO1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZU11dGUoKSB7XHJcbiAgICAgICAgdGhpcy5pc011dGVkID0gIXRoaXMuaXNNdXRlZDtcclxuICAgICAgICBpZiAodGhpcy5jb21iYXRNdXNpYykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbWJhdE11c2ljLnZvbHVtZSA9IHRoaXMuaXNNdXRlZCA/IDAgOiB0aGlzLnZvbHVtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubXV0ZUJ0bikge1xyXG4gICAgICAgICAgICBjb25zdCBpY29uID0gdGhpcy5tdXRlQnRuLnF1ZXJ5U2VsZWN0b3IoJ2knKTtcclxuICAgICAgICAgICAgaWYgKGljb24pIHtcclxuICAgICAgICAgICAgICAgIGljb24uY2xhc3NOYW1lID0gdGhpcy5pc011dGVkID8gJ2ZhcyBmYS12b2x1bWUtbXV0ZScgOiAnZmFzIGZhLXZvbHVtZS11cCc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudm9sdW1lU2xpZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudm9sdW1lU2xpZGVyLmRpc2FibGVkID0gdGhpcy5pc011dGVkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZnhTbGlkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZnhTbGlkZXIuZGlzYWJsZWQgPSB0aGlzLmlzTXV0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBTRlggPT09XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQcmUtbG9hZCBhbmQgY2FjaGUgYW4gYXVkaW8gZmlsZSwgcmV0dXJucyB0aGUgY2FjaGVkIEF1ZGlvIGNsb25lIGZvciBwbGF5YmFjay5cclxuICAgICAqL1xyXG4gICAgbG9hZFNmeChwYXRoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNmeENhY2hlW3BhdGhdKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Z4Q2FjaGVbcGF0aF0gPSBuZXcgQXVkaW8ocGF0aCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnNmeENhY2hlW3BhdGhdO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGxheSBhIHNvdW5kIGVmZmVjdCBmb3IgYSBjaGFyYWN0ZXIgYWN0aW9uLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNsdWcgLSBjaGFyYWN0ZXIgc2x1ZyAoZS5nLiAnY3J1c2FkZXInLCAncGxhZ3VlLWRvY3RvcicpXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2Z4TmFtZSAtIHNvdW5kIGZpbGUgbmFtZSAoZS5nLiAnYXR0YWNrc291bmQnLCAnc2tpbGxzb3VuZCcsICdoZWFsJylcclxuICAgICAqL1xyXG4gICAgcGxheVNmeChzbHVnLCBzZnhOYW1lKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNNdXRlZCB8fCAhc2x1ZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBwYXRoID0gYC9hc3NldC9vc3QvdmZ4LyR7c2x1Z30vJHtzZnhOYW1lfS53YXZgO1xyXG4gICAgICAgIGNvbnN0IGNhY2hlZCA9IHRoaXMubG9hZFNmeChwYXRoKTtcclxuXHJcbiAgICAgICAgLy8gQ2xvbmUgdGhlIGF1ZGlvIG5vZGUgc28gb3ZlcmxhcHBpbmcgcGxheXMgZG9uJ3QgY3V0IGVhY2ggb3RoZXIgb2ZmXHJcbiAgICAgICAgY29uc3Qgc291bmQgPSBjYWNoZWQuY2xvbmVOb2RlKCk7XHJcbiAgICAgICAgc291bmQudm9sdW1lID0gdGhpcy5zZnhWb2x1bWU7XHJcbiAgICAgICAgc291bmQucGxheSgpLmNhdGNoKCgpID0+IHt9KTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBsYXkgdGhlIGFwcHJvcHJpYXRlIFNGWCBmb3IgYSBjaGFyYWN0ZXIgZ2l2ZW4gdGhlaXIga2V5IGFuZCBhY3Rpb24gdHlwZS5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBrZXkgLSBjaGFyYWN0ZXIga2V5IChlLmcuICdFcXVpcGUgMS1DcnVzYWRlcicpXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gYWN0aW9uIC0gJ2F0dGFjaycsICdza2lsbCcsIG9yICdoZWFsJ1xyXG4gICAgICovXHJcbiAgICBwbGF5Q2hhclNmeChrZXksIGFjdGlvbikge1xyXG4gICAgICAgIGNvbnN0IHNsdWcgPSB0aGlzLmNoYXJhY3RlclNsdWdzW2tleV07XHJcbiAgICAgICAgaWYgKCFzbHVnKSByZXR1cm47XHJcblxyXG4gICAgICAgIHN3aXRjaCAoYWN0aW9uKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTZngoc2x1ZywgJ2F0dGFja3NvdW5kJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6XHJcbiAgICAgICAgICAgICAgICAvLyBUcnkgaGVhbC53YXYgZmlyc3QsIGZhbGxiYWNrIHRvIHNraWxsc291bmQud2F2XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyYWN0ZXJIYXNIZWFsW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTZngoc2x1ZywgJ2hlYWwnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5U2Z4KHNsdWcsICdza2lsbHNvdW5kJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc2tpbGwnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5U2Z4KHNsdWcsICdza2lsbHNvdW5kJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUGxheUJ1dHRvbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheUJ0bikgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcgJiYgIXRoaXMuaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gJ1BhdXNlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gJ1Rlcm1pbsOpJztcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSB0aGlzLmN1cnJlbnRJbmRleCA+IDAgPyAnUmVwcmVuZHJlJyA6ICdMYW5jZXInO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gSW5pdGlhbGlzZXIgcXVhbmQgbGUgRE9NIGVzdCBwcsOqdFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgY29tYmF0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LWxvZ3NdJyk7XHJcbiAgICBpZiAoY29tYmF0Q29udGFpbmVyKSB7XHJcbiAgICAgICAgbmV3IENvbWJhdENvbnRyb2xsZXIoY29tYmF0Q29udGFpbmVyKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21iYXRDb250cm9sbGVyO1xyXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBGUklFTkQgU1lTVEVNXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYudGV4dENvbnRlbnQgPSBzdHI7XHJcbiAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtdG9nZ2xlXScpO1xyXG4gICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXBhbmVsXScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWJhY2tkcm9wXScpO1xyXG4gICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNsb3NlXScpO1xyXG4gICAgY29uc3QgYmFkZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWJhZGdlXScpO1xyXG5cclxuICAgIGlmICghdG9nZ2xlIHx8ICFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgIGxldCBwYW5lbE9wZW4gPSBmYWxzZTtcclxuICAgIGxldCBjdXJyZW50VGFiID0gJ2ZyaWVuZHMnO1xyXG4gICAgbGV0IGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSBudWxsO1xyXG4gICAgbGV0IGxhc3RNZXNzYWdlSWQgPSAwO1xyXG4gICAgbGV0IG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgbGV0IHVucmVhZFBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICBsZXQgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHJlcXVlc3RzTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBQQU5FTCBPUEVOL0NMT1NFXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIG9wZW5QYW5lbCgpIHtcclxuICAgICAgICBwYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHBhbmVsLm9mZnNldEhlaWdodDsgLy8gcmVmbG93XHJcbiAgICAgICAgcGFuZWwuY2xhc3NMaXN0LmFkZCgnZnJpZW5kcy1wYW5lbC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ2ZyaWVuZHMtcGFuZWxfX2JhY2tkcm9wLS1vcGVuJyk7XHJcbiAgICAgICAgcGFuZWxPcGVuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCFmcmllbmRzTG9hZGVkKSB7XHJcbiAgICAgICAgICAgIGxvYWRGcmllbmRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUGFuZWwoKSB7XHJcbiAgICAgICAgcGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnZnJpZW5kcy1wYW5lbC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2ZyaWVuZHMtcGFuZWxfX2JhY2tkcm9wLS1vcGVuJyk7XHJcbiAgICAgICAgcGFuZWxPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwYW5lbE9wZW4gPyBjbG9zZVBhbmVsKCkgOiBvcGVuUGFuZWwoKSk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUGFuZWwpO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBhbmVsKTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFRBQlNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZnJpZW5kcy10YWJdJykuZm9yRWFjaCh0YWJCdG4gPT4ge1xyXG4gICAgICAgIHRhYkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFiTmFtZSA9IHRhYkJ0bi5kYXRhc2V0LmZyaWVuZHNUYWI7XHJcbiAgICAgICAgICAgIHN3aXRjaFRhYih0YWJOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXRjaFRhYih0YWJOYW1lKSB7XHJcbiAgICAgICAgY3VycmVudFRhYiA9IHRhYk5hbWU7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZyaWVuZHMtdGFiXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ2ZyaWVuZHMtcGFuZWxfX3RhYi0tYWN0aXZlJywgYnRuLmRhdGFzZXQuZnJpZW5kc1RhYiA9PT0gdGFiTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYi1jb250ZW50XScpLmZvckVhY2goY29udGVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IGNvbnRlbnQuZGF0YXNldC50YWJDb250ZW50ID09PSB0YWJOYW1lID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX3RhYnMnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19jb250ZW50Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jb252ZXJzYXRpb25dJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKHRhYk5hbWUgPT09ICdmcmllbmRzJyAmJiAhZnJpZW5kc0xvYWRlZCkgbG9hZEZyaWVuZHMoKTtcclxuICAgICAgICBpZiAodGFiTmFtZSA9PT0gJ3JlcXVlc3RzJyAmJiAhcmVxdWVzdHNMb2FkZWQpIGxvYWRSZXF1ZXN0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTE9BRCBGUklFTkRTIExJU1RcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gbG9hZEZyaWVuZHMoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGFiLWNvbnRlbnQ9XCJmcmllbmRzXCJdJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gQ2hhcmdlbWVudC4uLjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy9saXN0Jywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZyaWVuZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj48aSBjbGFzcz1cImZhcyBmYS1naG9zdFwiPjwvaT4gQXVjdW4gY29tcGFnbm9uLi4uIExlIGRvbmpvbiBlc3Qgc29saXRhaXJlLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gZGF0YS5mcmllbmRzLm1hcChmID0+IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiIGRhdGEtZnJpZW5kLXVzZXItaWQ9XCIke2YudXNlcklkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7Zi5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKGYucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwoZi51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKGYudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcHJldmlld1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtmLmxhc3RNZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoZi5sYXN0TWVzc2FnZS5pc0Zyb21NZSA/ICdWb3VzOiAnIDogJycpICsgZXNjYXBlSHRtbChmLmxhc3RNZXNzYWdlLmNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnQXVjdW4gbWVzc2FnZSd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19yYXRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7Zi5yYXRpbmd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mcmllbmQtaXRlbScpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9IHBhcnNlSW50KGl0ZW0uZGF0YXNldC5mcmllbmRVc2VySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmQtaXRlbV9fbmFtZScpLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Db252ZXJzYXRpb24odXNlcklkLCBuYW1lKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBMT0FEIFBFTkRJTkcgUkVRVUVTVFNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gbG9hZFJlcXVlc3RzKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRhYi1jb250ZW50PVwicmVxdWVzdHNcIl0nKTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19sb2FkaW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBDaGFyZ2VtZW50Li4uPC9kaXY+JztcclxuXHJcbiAgICAgICAgZmV0Y2goJy9mcmllbmRzL3BlbmRpbmcnLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICByZXF1ZXN0c0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlcXVlc3RzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+QXVjdW5lIGRlbWFuZGUgZW4gYXR0ZW50ZTwvcD4nO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gZGF0YS5yZXF1ZXN0cy5tYXAociA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIiBkYXRhLXJlcXVlc3QtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ci5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKHIucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwoci51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKHIudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcHJldmlld1wiPiR7ZXNjYXBlSHRtbChyLmRhdGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2FjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tYWNjZXB0XCIgZGF0YS1hY2NlcHQtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2tcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1yZWplY3RcIiBkYXRhLXJlamVjdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWNjZXB0LWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVSZXF1ZXN0KGJ0bi5kYXRhc2V0LmFjY2VwdElkLCAnYWNjZXB0Jyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmVqZWN0LWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVSZXF1ZXN0KGJ0bi5kYXRhc2V0LnJlamVjdElkLCAncmVqZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5FcnJldXIgZGUgY2hhcmdlbWVudDwvcD4nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3QoZnJpZW5kc2hpcElkLCBhY3Rpb24pIHtcclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvJHthY3Rpb259LyR7ZnJpZW5kc2hpcElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBmcmllbmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0c0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbG9hZFJlcXVlc3RzKCk7XHJcbiAgICAgICAgICAgICAgICBmZXRjaFVucmVhZENvdW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFNFQVJDSCBVU0VSU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtc2VhcmNoLWlucHV0XScpO1xyXG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtc2VhcmNoLXJlc3VsdHNdJyk7XHJcbiAgICBsZXQgc2VhcmNoVGltZW91dCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHNlYXJjaElucHV0KSB7XHJcbiAgICAgICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChzZWFyY2hUaW1lb3V0KTtcclxuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBzZWFyY2hJbnB1dC52YWx1ZS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocXVlcnkubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmV0Y2goYC9mcmllbmRzL3NlYXJjaD9xPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KX1gLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudXNlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5BdWN1biBndWVycmllciB0cm91dmU8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSBkYXRhLnVzZXJzLm1hcCh1ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGlvbkh0bWwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAnYWNjZXB0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+QW1pPC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdwZW5kaW5nX3NlbnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+RW52b3llZTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAncGVuZGluZ19yZWNlaXZlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5SZWN1ZTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9IGA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1hZGRcIiBkYXRhLWFkZC1mcmllbmQtaWQ9XCIke3UudXNlcklkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsdXNcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHt1LnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwodS5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbCh1LnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwodS51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19yYXRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7dS5yYXRpbmd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYWN0aW9uc1wiPiR7YWN0aW9uSHRtbH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFkZC1mcmllbmQtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRGcmllbmRSZXF1ZXN0KGJ0bi5kYXRhc2V0LmFkZEZyaWVuZElkLCBidG4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRGcmllbmRSZXF1ZXN0KHVzZXJJZCwgYnRuKSB7XHJcbiAgICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvcmVxdWVzdC8ke3VzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgYnRuLm91dGVySFRNTCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPkVudm95ZWU8L3NwYW4+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4geyBidG4uZGlzYWJsZWQgPSBmYWxzZTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVwb3J0TWVzc2FnZUFjdGlvbihtZXNzYWdlSWQsIGJ0bikge1xyXG4gICAgICAgIGNvbnN0IHJlYXNvbiA9IHByb21wdCgnUmFpc29uIGR1IHNpZ25hbGVtZW50IDonKTtcclxuICAgICAgICBpZiAocmVhc29uID09PSBudWxsKSByZXR1cm47IC8vIGNhbmNlbGxlZFxyXG5cclxuICAgICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke21lc3NhZ2VJZH0vcmVwb3J0YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHJlYXNvbjogcmVhc29uIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgYnRuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1jaGVja1wiPjwvaT4nO1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2NoYXQtbWVzc2FnZV9fcmVwb3J0LS1kb25lJyk7XHJcbiAgICAgICAgICAgICAgICBidG4udGl0bGUgPSAnU2lnbmFsZSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgYnRuLmRpc2FibGVkID0gZmFsc2U7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gQ09OVkVSU0FUSU9OXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIG9wZW5Db252ZXJzYXRpb24odXNlcklkLCB1c2VybmFtZSkge1xyXG4gICAgICAgIGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgICAgbGFzdE1lc3NhZ2VJZCA9IDA7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX190YWJzJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fY29udGVudCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgY29uc3QgY29udkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jb252ZXJzYXRpb25dJyk7XHJcbiAgICAgICAgY29udkVsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1uYW1lXScpLnRleHRDb250ZW50ID0gdXNlcm5hbWU7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1tZXNzYWdlc10nKTtcclxuICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gQ2hhcmdlbWVudC4uLjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke3VzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhkYXRhLm1lc3NhZ2VzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHN0YXJ0TWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJNZXNzYWdlcyhtZXNzYWdlcywgYXBwZW5kKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1tZXNzYWdlc10nKTtcclxuXHJcbiAgICAgICAgaWYgKCFhcHBlbmQpIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkRlYnV0IGRlIGxhIGNvbnZlcnNhdGlvbi4gRW52b3lleiBsZSBwcmVtaWVyIG1lc3NhZ2UhPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaSBvbiBham91dGUgZGVzIG1lc3NhZ2VzIGV0IHF1ZSBsZSBjb250ZW5ldXIgYWZmaWNoZSBsZSBwbGFjZWhvbGRlciwgbGUgc3VwcHJpbWVyXHJcbiAgICAgICAgaWYgKGFwcGVuZCAmJiBtZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gbWVzc2FnZXNFbC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fZW1wdHknKTtcclxuICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyKSBwbGFjZWhvbGRlci5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1lc3NhZ2VzLmZvckVhY2gobXNnID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5pZCA+IGxhc3RNZXNzYWdlSWQpIGxhc3RNZXNzYWdlSWQgPSBtc2cuaWQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NoYXQtbWVzc2FnZScsIG1zZy5pc0Zyb21NZSA/ICdjaGF0LW1lc3NhZ2UtLW1pbmUnIDogJ2NoYXQtbWVzc2FnZS0tdGhlaXJzJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVwb3J0QnRuID0gJyc7XHJcbiAgICAgICAgICAgIGlmICghbXNnLmlzRnJvbU1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnRCdG4gPSBgPGJ1dHRvbiBjbGFzcz1cImNoYXQtbWVzc2FnZV9fcmVwb3J0XCIgZGF0YS1yZXBvcnQtbXNnLWlkPVwiJHttc2cuaWR9XCIgdGl0bGU9XCJTaWduYWxlciBjZSBtZXNzYWdlXCI+PGkgY2xhc3M9XCJmYXMgZmEtZmxhZ1wiPjwvaT48L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgJHtlc2NhcGVIdG1sKG1zZy5jb250ZW50KX1cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hhdC1tZXNzYWdlX190aW1lXCI+JHtlc2NhcGVIdG1sKG1zZy5kYXRlKX0gJHtyZXBvcnRCdG59PC9zcGFuPlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgLy8gQXR0YWNoIHJlcG9ydCBoYW5kbGVyXHJcbiAgICAgICAgICAgIGNvbnN0IHJlcG9ydEVsID0gZGl2LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlcG9ydC1tc2ctaWRdJyk7XHJcbiAgICAgICAgICAgIGlmIChyZXBvcnRFbCkge1xyXG4gICAgICAgICAgICAgICAgcmVwb3J0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0TWVzc2FnZUFjdGlvbihyZXBvcnRFbC5kYXRhc2V0LnJlcG9ydE1zZ0lkLCByZXBvcnRFbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWVzc2FnZXNFbC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtZXNzYWdlc0VsLnNjcm9sbFRvcCA9IG1lc3NhZ2VzRWwuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlbmQgbWVzc2FnZVxyXG4gICAgY29uc3Qgc2VuZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1zZW5kXScpO1xyXG4gICAgY29uc3QgaW5wdXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1pbnB1dF0nKTtcclxuXHJcbiAgICBpZiAoc2VuZEJ0biAmJiBpbnB1dEVsKSB7XHJcbiAgICAgICAgc2VuZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbmRNZXNzYWdlKTtcclxuICAgICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHNlbmRNZXNzYWdlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VuZE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IGlucHV0RWwudmFsdWUudHJpbSgpO1xyXG4gICAgICAgIGlmICghY29udGVudCB8fCAhY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpbnB1dEVsLnZhbHVlID0gJyc7XHJcblxyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke2N1cnJlbnRDb252ZXJzYXRpb25Vc2VySWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNvbnRlbnQ6IGNvbnRlbnQgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICYmIGRhdGEubWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyTWVzc2FnZXMoW2RhdGEubWVzc2FnZV0sIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQmFjayBidXR0b25cclxuICAgIGNvbnN0IGJhY2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tYmFja10nKTtcclxuICAgIGlmIChiYWNrQnRuKSB7XHJcbiAgICAgICAgYmFja0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgICAgICBmcmllbmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaFRhYignZnJpZW5kcycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTUVTU0FHRSBQT0xMSU5HIChldmVyeSA1cyB3aGVuIGNvbnZlcnNhdGlvbiBvcGVuKVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBzdGFydE1lc3NhZ2VQb2xsaW5nKCkge1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7Y3VycmVudENvbnZlcnNhdGlvblVzZXJJZH0/YWZ0ZXJJZD0ke2xhc3RNZXNzYWdlSWR9YCwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5tZXNzYWdlcyAmJiBkYXRhLm1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhkYXRhLm1lc3NhZ2VzLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RvcE1lc3NhZ2VQb2xsaW5nKCkge1xyXG4gICAgICAgIGlmIChtZXNzYWdlUG9sbGluZ0ludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobWVzc2FnZVBvbGxpbmdJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFVOUkVBRCBDT1VOVCBQT0xMSU5HIChldmVyeSAzMHMsIGFsd2F5cyBhY3RpdmUpXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGZldGNoVW5yZWFkQ291bnQoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9mcmllbmRzL3VucmVhZC1jb3VudCcsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnRvdGFsID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UudGV4dENvbnRlbnQgPSBkYXRhLnRvdGFsO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdHNCYWRnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlcXVlc3RzLWJhZGdlXScpO1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdHNCYWRnZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucGVuZGluZ1JlcXVlc3RzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2UudGV4dENvbnRlbnQgPSBkYXRhLnBlbmRpbmdSZXF1ZXN0cztcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIGZldGNoVW5yZWFkQ291bnQoKTtcclxuICAgIHVucmVhZFBvbGxpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKGZldGNoVW5yZWFkQ291bnQsIDMwMDAwKTtcclxufSk7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJlc2NhcGVIdG1sIiwic3RyIiwiZGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVUZXh0Tm9kZSIsImlubmVySFRNTCIsImFkZEV2ZW50TGlzdGVuZXIiLCJidXJnZXIiLCJxdWVyeVNlbGVjdG9yIiwibmF2IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiU1RBVF9NQVgiLCJkbWciLCJzcGVlZCIsImRvZGdlIiwiY3JpdCIsImhwIiwicG9ydHJhaXRzIiwicXVlcnlTZWxlY3RvckFsbCIsImRldGFpbHMiLCJnZXRFbGVtZW50QnlJZCIsInNlbGVjdGVkTGlzdCIsImxhdW5jaEJ0biIsImxlbmd0aCIsIm1heFNlbGVjdGlvbiIsInNlbGVjdGVkSGVyb2VzIiwic2VsZWN0ZWRIZXJvSWRzIiwiZ2V0Q2F0ZWdvcnkiLCJwb3J0cmFpdCIsImRhdGFzZXQiLCJjYXRlZ29yeSIsImdldFNlbGVjdGVkUm9sZXMiLCJyb2xlcyIsIlRhbmsiLCJEUFMiLCJIZWFsZXIiLCJTdXBwb3J0IiwiZm9yRWFjaCIsImlkIiwicCIsIkFycmF5IiwiZnJvbSIsImZpbmQiLCJwcCIsImNhdCIsImNhblNlbGVjdFJvbGUiLCJwb3J0cmFpdEVsIiwicmVtb3ZlIiwiYWRkIiwibmFtZSIsInJvbGUiLCJkbWdNaW4iLCJOdW1iZXIiLCJkbWdNYXgiLCJzcHJpdGVGaWxlIiwic3ByaXRlIiwiYWJpbGl0eU5hbWUiLCJhYmlsaXR5RGVzYyIsImFiaWxpdHlDZCIsInNwcml0ZVBhdGgiLCJjb25jYXQiLCJpc1NlbGVjdGVkIiwiaW5jbHVkZXMiLCJhYmlsaXR5SHRtbCIsImNoYXJTeW5lcmdpZXMiLCJzeW5lcmd5TWFwIiwic3luZXJneUh0bWwiLCJtYXAiLCJzIiwicGFydG5lciIsImRlc2MiLCJqb2luIiwiTWF0aCIsIm1pbiIsImJ0blJpZ2h0Iiwicm9sZUNhdCIsImFscmVhZHlTZWxlY3RlZCIsImRpc2FibGVkIiwidGV4dENvbnRlbnQiLCJmaWx0ZXIiLCJoaWQiLCJoIiwiYWxlcnQiLCJwdXNoIiwidXBkYXRlU2VsZWN0ZWRUZWFtIiwidGVhbXNQYWdlRWwiLCJKU09OIiwicGFyc2UiLCJoZXJvIiwiaGVyb0VsIiwidXBkYXRlUm9sZUluZGljYXRvcnMiLCJ1cGRhdGVTeW5lcmd5SGlnaGxpZ2h0cyIsInRlYW1Db21wbGV0ZSIsImJhZGdlIiwic2VsZWN0ZWROYW1lcyIsIkJvb2xlYW4iLCJhY3RpdmVTeW5lcmdpZXMiLCJzZWVuUGFpcnMiLCJTZXQiLCJzeW5lcmdpZXMiLCJzeW4iLCJwYWlyS2V5Iiwic29ydCIsImhhcyIsIm5hbWUxIiwibmFtZTIiLCJzeW5lcmd5TmFtZSIsInBOYW1lIiwibWF0Y2hpbmciLCJjbGFzc05hbWUiLCJ0aXRsZSIsInVwZGF0ZVN5bmVyZ3lEaXNwbGF5IiwiY29udGFpbmVyIiwiYWN0aW9ucyIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJpbmRpY2F0b3IiLCJzbG90Iiwic2F2ZVByZXNldEJ0biIsInByZXNldE1vZGFsIiwicHJlc2V0TmFtZUlucHV0IiwicHJlc2V0Q29uZmlybUJ0biIsInByZXNldENhbmNlbEJ0biIsInVwZGF0ZVNhdmVQcmVzZXRCdG4iLCJvcmlnaW5hbFVwZGF0ZVNlbGVjdGVkVGVhbSIsIl9vcmlnVXBkYXRlIiwiX29yaWdSb2xlSW5kaWNhdG9ycyIsInZhbHVlIiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsImZvY3VzIiwidHJpbSIsImJvcmRlckNvbG9yIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsInN0cmluZ2lmeSIsImNoYXJhY3RlcklkcyIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsInN1Y2Nlc3MiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImVycm9yIiwiZSIsImtleSIsImNsaWNrIiwibG9hZFByZXNldCIsImlkU3RyIiwiU3RyaW5nIiwiZGVsZXRlUHJlc2V0IiwicHJlc2V0SWQiLCJjaGlwRWwiLCJjb25maXJtIiwibGlzdCIsImNoaWxkcmVuIiwiX2RvY3VtZW50JHF1ZXJ5U2VsZWN0IiwiY2hpcCIsImNoYXJJZHMiLCJwcmVzZXRJZHMiLCJzdG9wUHJvcGFnYXRpb24iLCJzZWxlY3RlZExpc3RPYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiY2hpbGRMaXN0IiwiaSIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlc3BvbnNlIiwicmVkaXJlY3RlZCIsImhyZWYiLCJ1cmwiLCJwb3B1cCIsImJhY2tkcm9wIiwiY2xvc2VCdG4iLCJjb250ZW50IiwibG9hZGVkIiwib3BlblBvcHVwIiwib2Zmc2V0SGVpZ2h0IiwiZmV0Y2hQcm9maWxlIiwiY2xvc2VQb3B1cCIsInJlbmRlclByb2ZpbGUiLCJyZXN1bHRDbGFzcyIsInIiLCJyZXN1bHRMYWJlbCIsImF2YXRhckh0bWwiLCJwcm9maWxlSW1hZ2UiLCJ1c2VybmFtZSIsImh0bWwiLCJtb3R0byIsImJpbyIsInJhdGluZyIsInN0YXRzIiwid2lucyIsImxvc3NlcyIsIndpblJhdGUiLCJmYXZvcml0ZUNoYXJhY3RlciIsImdhbWVzUGxheWVkIiwibGFzdFRlYW0iLCJjIiwicmVjZW50QmF0dGxlcyIsImIiLCJwYXJzZUludCIsInJlc3VsdCIsIm9wcG9uZW50IiwibWF0Y2hUeXBlIiwidG9VcHBlckNhc2UiLCJkYXRlIiwiQ29tYmF0Q29udHJvbGxlciIsIl9jbGFzc0NhbGxDaGVjayIsImxvZ3MiLCJjdXJyZW50SW5kZXgiLCJpc1BsYXlpbmciLCJpc1BhdXNlZCIsImNoYXJhY3RlckVsZW1lbnRzIiwiY2hhcmFjdGVyTWF4SFAiLCJpbml0IiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJsb2dzRGF0YSIsImNvbWJhdExvZ3MiLCJjb25zb2xlIiwibG9nQ29udGFpbmVyIiwib3ZlcmxheSIsInBsYXlCdG4iLCJza2lwQnRuIiwic3BlZWRCdG5zIiwiY2hhcmFjdGVyU2x1Z3MiLCJjaGFyYWN0ZXJIYXNIZWFsIiwiYWJpbGl0eUNvb2xkb3ducyIsImNoYXJhY3RlclN0YXR1c2VzIiwiZWwiLCJjaGFyYWN0ZXJOYW1lIiwidGVhbSIsImNoYXJhY3RlclRlYW0iLCJjaGFyYWN0ZXJTbHVnIiwiaGFzSGVhbCIsImhwVGV4dCIsIm1hdGNoIiwiY3JlYXRlRW1wdHlTdGF0dXNlcyIsImFiaWxpdHlFbGVtZW50cyIsImNoYXJOYW1lIiwiY2hhclRlYW0iLCJhYmlsaXR5RWwiLCJtYXhDZCIsImFiaWxpdHlNYXhDZCIsIm5hbWVFbCIsImljb25FbCIsIm9wYWNpdHkiLCJhdWRpb1VubG9ja2VkIiwiY29tYmF0TXVzaWMiLCJsYXN0VHJhY2tJbmRleCIsImlzTXV0ZWQiLCJ2b2x1bWUiLCJzZnhWb2x1bWUiLCJjb21iYXRQbGF5bGlzdCIsInNmeENhY2hlIiwibXV0ZUJ0biIsInZvbHVtZVNsaWRlciIsInNmeFNsaWRlciIsImJpbmRFdmVudHMiLCJwbGF5IiwiYmxlZWRpbmciLCJibGlnaHRlZCIsInN0dW5uZWQiLCJtYXJrZWQiLCJzdGVhbHRoZWQiLCJyaXBvc3RlIiwiZG1nVXAiLCJzcGRVcCIsImRvZGdlVXAiLCJjcml0VXAiLCJ1cGRhdGVDaGFyYWN0ZXJTdGF0dXNlcyIsImxvZyIsInR5cGUiLCJ0aWNrUm91bmRTdGF0dXNlcyIsImhhbmRsZUFiaWxpdHlTdGF0dXNDaGFuZ2UiLCJzZXRTdGF0dXMiLCJ0YXJnZXQiLCJ0YXJnZXRUZWFtIiwiZHVyYXRpb24iLCJ0dXJuc1JlbWFpbmluZyIsInVuZGVmaW5lZCIsImF0dGFja2VyIiwiYXR0YWNrZXJUZWFtIiwiaGFuZGxlU3luZXJneVN0YXR1c0NoYW5nZSIsImNsZWFyQWxsU3RhdHVzZXMiLCJyZW5kZXJBbGxTdGF0dXNJY29ucyIsInN1YnR5cGUiLCJibGVlZFR1cm5zIiwiYWxsSGl0cyIsInByaW1hcnkiLCJpc1ByaW1hcnkiLCJibGlnaHRUdXJucyIsIm1hcmtUdXJucyIsImNhc3RlciIsImNhc3RlclRlYW0iLCJyaXBvc3RlVHVybnMiLCJhcHBseUJ1ZmZTdGF0dXNlcyIsImJ1ZmZzIiwiYnVmZkR1cmF0aW9uIiwiYXBwbHlUZWFtQnVmZlN0YXR1c2VzIiwic3RlYWx0aFR1cm5zIiwicHJvdGVjdFR1cm5zIiwic2VsZkJsZWVkVHVybnMiLCJ0S2V5IiwiX3RoaXMyIiwiZWZmZWN0VHlwZSIsInBhcnRuZXJDaGFyIiwicGFydG5lckNoYXJUZWFtIiwiZ3JhbnRlZFR1cm5zIiwiYnVmZlR5cGVzIiwic3RhdHVzS2V5IiwiYnVmZlR5cGVUb1N0YXR1c0tleSIsImRvZGdlRHVyYXRpb24iLCJleHRyYVR1cm5zIiwidGVhbU5hbWUiLCJkYW1hZ2UiLCJtYXgiLCJfaSIsIl9PYmplY3Qka2V5cyIsIk9iamVjdCIsImtleXMiLCJzdGFydHNXaXRoIiwiX2kyIiwiX09iamVjdCRrZXlzMiIsIl9pMyIsIl9PYmplY3Qka2V5czMiLCJyZW5kZXJTdGF0dXNJY29ucyIsImljb25zIiwiaWNvbiIsImNscyIsIl90aGlzMyIsInRvZ2dsZVBsYXkiLCJza2lwIiwiYnRuIiwic2V0U3BlZWQiLCJ0b2dnbGVNdXRlIiwicGFyc2VGbG9hdCIsInBsYXlOZXh0VHJhY2siLCJvbmNlIiwidXBkYXRlUGxheUJ1dHRvbiIsInByb2Nlc3NOZXh0TG9nIiwicGF1c2UiLCJkaXNwbGF5TG9nIiwidXBkYXRlSGVhbHRoQmFycyIsInRyYWNrQWJpbGl0eUNvb2xkb3ducyIsImFuaW1hdGVEZWF0aCIsInRhcmdldEhQIiwic2hvd1ZpY3RvcnlPdmVybGF5IiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiY29tYmF0U3BlZWQiLCJfdGhpczQiLCJwcm9jZXNzTG9nIiwiZGVsYXkiLCJnZXREZWxheUZvckxvZyIsImdldEFiaWxpdHlEZWxheSIsImdldFN5bmVyZ3lUcmlnZ2VyRGVsYXkiLCJfdGhpczUiLCJwbGF5QW5pbWF0aW9uIiwiaHBEZWxheSIsImdldEhQVXBkYXRlRGVsYXkiLCJhYmlsaXR5RGF0YSIsInVwZGF0ZUFiaWxpdHlDb29sZG93bkRpc3BsYXkiLCJjZCIsImdldEFiaWxpdHlIUERlbGF5IiwiYW5pbWF0ZUF0dGFjayIsImlzQ3JpdCIsImFuaW1hdGVIZWFsIiwiaGVhbGVyIiwiaGVhbGVyVGVhbSIsImFuaW1hdGVEZWZlbmQiLCJkZWZlbmRlciIsImRlZmVuZGVyVGVhbSIsImFuaW1hdGVEb2RnZSIsImFuaW1hdGVEb1QiLCJhbmltYXRlU3R1bm5lZCIsInBsYXlBYmlsaXR5QW5pbWF0aW9uIiwiYW5pbWF0ZVN5bmVyZ3lBbm5vdW5jZSIsImFuaW1hdGVTeW5lcmd5VHJpZ2dlciIsInRhcmdldE5hbWUiLCJkb3RDbGFzcyIsImdldENoYXJhY3RlckVsZW1lbnQiLCJhbmltYXRlTWFya2VkIiwiYW5pbWF0ZUJ1ZmYiLCJhbmltYXRlU3RlYWx0aCIsIl90aGlzNiIsImJsaWdodEtleSIsInN3YXBTcHJpdGUiLCJwbGF5Q2hhclNmeCIsImNhc3RlckVsIiwibWFya0tleSIsInJpcG9zdGVLZXkiLCJzZWxmQnVmZktleSIsInBhcnR5SGVhbEtleSIsImhlYWxlZCIsInBhcnR5QnVmZktleSIsImFuaW1hdGVUZWFtQnVmZiIsInN0ZWFsdGhLZXkiLCJlbWVyZ0hlYWxLZXkiLCJwcm90RG9kZ2VLZXkiLCJfdGhpczciLCJ0cmlnZ2VyIiwidHJpZ2dlckNoYXIiLCJkcmF3U3luZXJneUxpbmsiLCJfdGhpczgiLCJ0cmlnZ2VyQ2hhclRlYW0iLCJwYXJ0bmVyS2V5IiwiZWwxIiwiZWwyIiwic3RhZ2UiLCJleGlzdGluZ1N2ZyIsInN2ZyIsImNyZWF0ZUVsZW1lbnROUyIsInNldEF0dHJpYnV0ZSIsInN0YWdlUmVjdCIsImdldEJvdW5kaW5nQ2xpZW50UmVjdCIsInJlY3QxIiwicmVjdDIiLCJ4MSIsImxlZnQiLCJ3aWR0aCIsInkxIiwidG9wIiwiaGVpZ2h0IiwieDIiLCJ5MiIsImxpbmUiLCJzcHJpdGVOYW1lIiwiX3RoaXM5Iiwic2x1ZyIsImltZyIsInNyYyIsImNvbnRhaW5zIiwiYXR0YWNrZXJOYW1lIiwiaGVhbGVyTmFtZSIsImRlZmVuZGVyTmFtZSIsImVudHJ5IiwibWVzc2FnZSIsInNjcm9sbFRvcCIsInNjcm9sbEhlaWdodCIsImN1cnJlbnRIUCIsIm1heEhQIiwidGFyZ2V0TWF4SFAiLCJ1cGRhdGVBYmlsaXR5SGVhbHRoQmFycyIsInVwZGF0ZUNoYXJhY3RlckhQIiwiX3RoaXMwIiwibWF4SHAiLCJwZXJjZW50IiwiaHBCYXIiLCJ0cmFuc2l0aW9uIiwidXBkYXRlSW5mb1BhbmVsIiwicGFuZWxDbGFzcyIsInBhbmVsIiwiY2hhcmFjdGVySW5mb3MiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwiX2xvb3AiLCJpbmZvIiwic3RhdHNTcGFuIiwibiIsImRvbmUiLCJlcnIiLCJmIiwiX3RoaXMxIiwiZmluYWxpemVSYXRpbmciLCJfdGhpczEwIiwiZmluYWxpemVVcmwiLCJyYXRpbmdDaGFuZ2UiLCJzaG93UmF0aW5nVXBkYXRlIiwibmV3UmF0aW5nIiwibmV3UmF0aW5nMiIsImNoYW5nZSIsInJhdGluZ0VsIiwicmF0aW5nRWwyIiwid2lubmVyRGl2Iiwibm90aWYxIiwiY3NzVGV4dCIsImNvbG9yIiwiY2hhbmdlMiIsIm5vdGlmMiIsIl90aGlzMTEiLCJpZHgiLCJnZXRSYW5kb21UcmFja0luZGV4IiwiQXVkaW8iLCJmbG9vciIsInJhbmRvbSIsImxvYWRTZngiLCJwYXRoIiwicGxheVNmeCIsInNmeE5hbWUiLCJjYWNoZWQiLCJzb3VuZCIsImNsb25lTm9kZSIsImFjdGlvbiIsImNvbWJhdENvbnRhaW5lciIsInBhbmVsT3BlbiIsImN1cnJlbnRUYWIiLCJjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkIiwibGFzdE1lc3NhZ2VJZCIsIm1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwiLCJ1bnJlYWRQb2xsaW5nSW50ZXJ2YWwiLCJmcmllbmRzTG9hZGVkIiwicmVxdWVzdHNMb2FkZWQiLCJvcGVuUGFuZWwiLCJsb2FkRnJpZW5kcyIsImNsb3NlUGFuZWwiLCJzdG9wTWVzc2FnZVBvbGxpbmciLCJ0YWJCdG4iLCJ0YWJOYW1lIiwiZnJpZW5kc1RhYiIsInN3aXRjaFRhYiIsInRhYkNvbnRlbnQiLCJsb2FkUmVxdWVzdHMiLCJmcmllbmRzIiwidXNlcklkIiwibGFzdE1lc3NhZ2UiLCJpc0Zyb21NZSIsIml0ZW0iLCJmcmllbmRVc2VySWQiLCJvcGVuQ29udmVyc2F0aW9uIiwicmVxdWVzdHMiLCJmcmllbmRzaGlwSWQiLCJoYW5kbGVSZXF1ZXN0IiwiYWNjZXB0SWQiLCJyZWplY3RJZCIsImZldGNoVW5yZWFkQ291bnQiLCJzZWFyY2hJbnB1dCIsInNlYXJjaFJlc3VsdHMiLCJzZWFyY2hUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwicXVlcnkiLCJ1c2VycyIsInUiLCJhY3Rpb25IdG1sIiwiZnJpZW5kU3RhdHVzIiwic2VuZEZyaWVuZFJlcXVlc3QiLCJhZGRGcmllbmRJZCIsIm91dGVySFRNTCIsInJlcG9ydE1lc3NhZ2VBY3Rpb24iLCJtZXNzYWdlSWQiLCJyZWFzb24iLCJwcm9tcHQiLCJjb252RWwiLCJtZXNzYWdlc0VsIiwicmVuZGVyTWVzc2FnZXMiLCJtZXNzYWdlcyIsInN0YXJ0TWVzc2FnZVBvbGxpbmciLCJhcHBlbmQiLCJwbGFjZWhvbGRlciIsIm1zZyIsInJlcG9ydEJ0biIsInJlcG9ydEVsIiwicmVwb3J0TXNnSWQiLCJzZW5kQnRuIiwiaW5wdXRFbCIsInNlbmRNZXNzYWdlIiwiYmFja0J0biIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInRvdGFsIiwicmVxdWVzdHNCYWRnZSIsInBlbmRpbmdSZXF1ZXN0cyJdLCJzb3VyY2VSb290IjoiIn0=