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
      this.volume = 0.15;
      this.sfxVolume = 0.3;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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ckUsSUFBSWdqQixhQUFhLEVBQUU7UUFDZixJQUFJeGEsSUFBSSxDQUFDeWEsZUFBZSxHQUFHLENBQUMsRUFBRTtVQUMxQkQsYUFBYSxDQUFDemUsV0FBVyxHQUFHaUUsSUFBSSxDQUFDeWEsZUFBZTtVQUNoREQsYUFBYSxDQUFDdmIsS0FBSyxDQUFDQyxPQUFPLEdBQUcsY0FBYztRQUNoRCxDQUFDLE1BQU07VUFDSHNiLGFBQWEsQ0FBQ3ZiLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07UUFDeEM7TUFDSjtJQUNKLENBQUMsQ0FBQyxTQUNJLENBQUMsWUFBTSxDQUFDLENBQUMsQ0FBQztFQUNwQjtFQUVBbVosZ0JBQWdCLENBQUMsQ0FBQztFQUNsQnpCLHFCQUFxQixHQUFHeUQsV0FBVyxDQUFDaEMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDO0FBQ2hFLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7Ozs7QUN0ZkY7Ozs7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2NvbWJhdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZnJpZW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5jc3M/MmRjOSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcclxuICovXHJcbmltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnO1xyXG5pbXBvcnQgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzJztcclxuaW1wb3J0ICcuL2pzL2NvbWJhdC5qcyc7XHJcbmltcG9ydCAnLi9qcy9mcmllbmRzLmpzJztcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgVVRJTElUQUlSRSBTRUNVUklURSBYU1NcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xyXG4gICAgaWYgKCFzdHIpIHJldHVybiAnJztcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cikpO1xyXG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgTUVOVSBCVVJHRVJcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBidXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1cmdlclwiKTtcclxuICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1uYXZpZ2F0aW9uXCIpO1xyXG5cclxuICAgIGlmIChidXJnZXIgJiYgbmF2KSB7XHJcbiAgICAgICAgYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQQUdFIFRFQU1TIChDT1JSSUfDiUUpXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKiDwn5SnIE1BWCBERVMgU1RBVFMgKGFkYXB0ZXIgw6AgdGEgQkREIC8gw6lxdWlsaWJyYWdlKSAqL1xyXG5jb25zdCBTVEFUX01BWCA9IHtcclxuICAgIGRtZzogMzAsXHJcbiAgICBzcGVlZDogMTIsXHJcbiAgICBkb2RnZTogNDAsXHJcbiAgICBjcml0OiAxNSxcclxuICAgIGhwOiA3NVxyXG59O1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHBvcnRyYWl0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFtLXBvcnRyYWl0Jyk7XHJcbiAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlYW1EZXRhaWxzJyk7XHJcbiAgICBjb25zdCBzZWxlY3RlZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGlzdCcpO1xyXG4gICAgY29uc3QgbGF1bmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1sYXVuY2gnKTtcclxuXHJcbiAgICBpZiAoIWRldGFpbHMgfHwgcG9ydHJhaXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG1heFNlbGVjdGlvbiA9IDQ7XHJcbiAgICBsZXQgc2VsZWN0ZWRIZXJvZXMgPSBbXTtcclxuICAgIGxldCBzZWxlY3RlZEhlcm9JZHMgPSBbXTtcclxuXHJcbiAgICAvLyBDb21wb3NpdGlvbiBvYmxpZ2F0b2lyZSA6IDEgVGFuaywgMSBEUFMsIDEgSGVhbGVyLCAxIFN1cHBvcnRcclxuICAgIC8vIExhIGNhdGVnb3JpZSB2aWVudCBkaXJlY3RlbWVudCBkdSBkYXRhLWNhdGVnb3J5IChjYWxjdWxlIGNvdGUgc2VydmV1cilcclxuICAgIGZ1bmN0aW9uIGdldENhdGVnb3J5KHBvcnRyYWl0KSB7XHJcbiAgICAgICAgcmV0dXJuIHBvcnRyYWl0LmRhdGFzZXQuY2F0ZWdvcnkgfHwgJ1N1cHBvcnQnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkUm9sZXMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSB7IFRhbms6IDAsIERQUzogMCwgSGVhbGVyOiAwLCBTdXBwb3J0OiAwIH07XHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocHAgPT4gcHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAocCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2F0ID0gZ2V0Q2F0ZWdvcnkocCk7XHJcbiAgICAgICAgICAgICAgICByb2xlc1tjYXRdKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcm9sZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FuU2VsZWN0Um9sZShwb3J0cmFpdEVsKSB7XHJcbiAgICAgICAgY29uc3QgY2F0ID0gZ2V0Q2F0ZWdvcnkocG9ydHJhaXRFbCk7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzW2NhdF0gPCAxO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcnRyYWl0cy5mb3JFYWNoKHBvcnRyYWl0ID0+IHtcclxuICAgICAgICBwb3J0cmFpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHBvcnRyYWl0LmRhdGFzZXQuaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwb3J0cmFpdC5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGUgPSBwb3J0cmFpdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01pbiA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01pbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01heCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01heCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuc3BlZWQpO1xyXG4gICAgICAgICAgICBjb25zdCBkb2RnZSA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRvZGdlKTtcclxuICAgICAgICAgICAgY29uc3QgY3JpdCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmNyaXQpO1xyXG4gICAgICAgICAgICBjb25zdCBocCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmhwKTtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlRmlsZSA9IHBvcnRyYWl0LmRhdGFzZXQuc3ByaXRlO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5TmFtZSA9IHBvcnRyYWl0LmRhdGFzZXQuYWJpbGl0eU5hbWUgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlEZXNjID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5RGVzYyB8fCAnJztcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUNkID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5Q2QgfHwgJyc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7c3ByaXRlRmlsZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlIdG1sID0gYWJpbGl0eU5hbWUgPyBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFiaWxpdHktc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZpcmUtYWx0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX25hbWVcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eU5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19jZFwiPjxpIGNsYXNzPVwiZmFzIGZhLWhvdXJnbGFzcy1oYWxmXCI+PC9pPiAke2VzY2FwZUh0bWwoYWJpbGl0eUNkKX1UPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX2Rlc2NcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eURlc2MpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCA6ICcnO1xyXG5cclxuICAgICAgICAgICAgLy8gQnVpbGQgc3luZXJneSBpbmZvIGZvciB0aGlzIGNoYXJhY3RlclxyXG4gICAgICAgICAgICBjb25zdCBjaGFyU3luZXJnaWVzID0gc3luZXJneU1hcFtuYW1lXSB8fCBbXTtcclxuICAgICAgICAgICAgbGV0IHN5bmVyZ3lIdG1sID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChjaGFyU3luZXJnaWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHN5bmVyZ3lIdG1sID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvbl9faGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1saW5rXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25fX3RpdGxlXCI+U3luZXJnaWVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtjaGFyU3luZXJnaWVzLm1hcChzID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25fX2l0ZW0gJHtzZWxlY3RlZEhlcm9lcy5pbmNsdWRlcyhzLnBhcnRuZXIpID8gJ3N5bmVyZ3ktc2VjdGlvbl9faXRlbS0tYWN0aXZlJyA6ICcnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1zZWN0aW9uX19wYXJ0bmVyXCI+JHtlc2NhcGVIdG1sKHMucGFydG5lcil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1zZWN0aW9uX19zbmFtZVwiPiR7ZXNjYXBlSHRtbChzLm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvbl9fZGVzY1wiPiR7ZXNjYXBlSHRtbChzLmRlc2MpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRldGFpbHMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYW0tZGV0YWlscy1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPiR7bmFtZX08L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicm9sZVwiPiR7cm9sZX08L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnaWYtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzcHJpdGVQYXRofVwiIGFsdD1cIlNwcml0ZSBkZSAke25hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE1HPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWRtZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoZG1nTWF4IC8gU1RBVF9NQVguZG1nKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZG1nTWlufSAtICR7ZG1nTWF4fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VklUPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLXNwZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoc3BlZWQgLyBTVEFUX01BWC5zcGVlZCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke3NwZWVkfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE9ER0U8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tZG9kZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGRvZGdlIC8gU1RBVF9NQVguZG9kZ2UpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkb2RnZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNSSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tY3JpdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoY3JpdCAvIFNUQVRfTUFYLmNyaXQpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtjcml0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+SFA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0taHBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGhwIC8gU1RBVF9NQVguaHApICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtocH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAke2FiaWxpdHlIdG1sfVxyXG4gICAgICAgICAgICAgICAgICAgICR7c3luZXJneUh0bWx9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tc2VsZWN0LXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7aXNTZWxlY3RlZCA/ICdEw6lzw6lsZWN0aW9ubmVyJyA6ICdTw6lsZWN0aW9ubmVyJ31cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYnRuUmlnaHQgPSBkZXRhaWxzLnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2VsZWN0LXJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVDYXQgPSBnZXRDYXRlZ29yeShwb3J0cmFpdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscmVhZHlTZWxlY3RlZCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEw6lzYWN0aXZlciBsZSBib3V0b24gc2kgbGUgc2xvdCBkZSBjZSByw7RsZSBlc3QgZMOpasOgIHByaXNcclxuICAgICAgICAgICAgaWYgKCFhbHJlYWR5U2VsZWN0ZWQgJiYgIWNhblNlbGVjdFJvbGUocG9ydHJhaXQpKSB7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IGBTbG90ICR7cm9sZUNhdH0gZMOpasOgIHByaXNgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzID0gc2VsZWN0ZWRIZXJvSWRzLmZpbHRlcihoaWQgPT4gaGlkICE9PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBzZWxlY3RlZEhlcm9lcy5maWx0ZXIoaCA9PiBoICE9PSBuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhblNlbGVjdFJvbGUocG9ydHJhaXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGBWb3VzIGF2ZXogZMOpasOgIHVuICR7cm9sZUNhdH0gZGFucyB2b3RyZSDDqXF1aXBlICFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCA+PSBtYXhTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJWb3VzIHBvdXZleiBzw6lsZWN0aW9ubmVyIG1heGltdW0gNCBwZXJzb25uYWdlcyAhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcy5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcy5wdXNoKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0ZWRUZWFtKCk7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZClcclxuICAgICAgICAgICAgICAgICAgICA/ICdEw6lzw6lsZWN0aW9ubmVyJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogJ1PDqWxlY3Rpb25uZXInO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyA9PT0gU1lORVJHWSBTWVNURU0gPT09XHJcbiAgICBjb25zdCB0ZWFtc1BhZ2VFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZWFtcy1wYWdlJyk7XHJcbiAgICBjb25zdCBzeW5lcmd5TWFwID0gdGVhbXNQYWdlRWwgPyBKU09OLnBhcnNlKHRlYW1zUGFnZUVsLmRhdGFzZXQuc3luZXJneU1hcCB8fCAne30nKSA6IHt9O1xyXG5cclxuICAgIC8qICBaT05FIMOJUVVJUEUg4oCUIHNwcml0ZXMgc2V1bGVtZW50ICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTZWxlY3RlZFRlYW0oKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm8gPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwID0+IHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAoIWhlcm8pIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGhlcm8uZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7aGVyby5kYXRhc2V0LnNwcml0ZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgaGVyb0VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWhlcm8tc3ByaXRlJyk7XHJcbiAgICAgICAgICAgIGhlcm9FbC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c3ByaXRlUGF0aH1cIiBhbHQ9XCJTcHJpdGUgZGUgJHtuYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+JHtuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgc2VsZWN0ZWRMaXN0LmFwcGVuZENoaWxkKGhlcm9FbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbGVzIGluZGljYXRldXJzIGRlIHLDtGxlc1xyXG4gICAgICAgIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCk7XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGxlcyBzeW5lcmdpZXNcclxuICAgICAgICB1cGRhdGVTeW5lcmd5SGlnaGxpZ2h0cygpO1xyXG5cclxuICAgICAgICBpZiAobGF1bmNoQnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5IZWFsZXIgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgbGF1bmNoQnRuLmRpc2FibGVkID0gIXRlYW1Db21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU3luZXJneUhpZ2hsaWdodHMoKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBleGlzdGluZyBzeW5lcmd5IGhpZ2hsaWdodHNcclxuICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgcC5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LWF2YWlsYWJsZScsICdzeW5lcmd5LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBjb25zdCBiYWRnZSA9IHAucXVlcnlTZWxlY3RvcignLnN5bmVyZ3ktYmFkZ2UnKTtcclxuICAgICAgICAgICAgaWYgKGJhZGdlKSBiYWRnZS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gR2V0IG5hbWVzIG9mIHNlbGVjdGVkIGhlcm9lc1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTmFtZXMgPSBzZWxlY3RlZEhlcm9JZHMubWFwKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHBwID0+IHBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHAgPyBwLmRhdGFzZXQubmFtZSA6IG51bGw7XHJcbiAgICAgICAgfSkuZmlsdGVyKEJvb2xlYW4pO1xyXG5cclxuICAgICAgICAvLyBGaW5kIGFjdGl2ZSBzeW5lcmdpZXMgKGJvdGggbWVtYmVycyBzZWxlY3RlZClcclxuICAgICAgICBjb25zdCBhY3RpdmVTeW5lcmdpZXMgPSBbXTtcclxuICAgICAgICBjb25zdCBzZWVuUGFpcnMgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgc2VsZWN0ZWROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzeW5lcmdpZXMgPSBzeW5lcmd5TWFwW25hbWVdIHx8IFtdO1xyXG4gICAgICAgICAgICBzeW5lcmdpZXMuZm9yRWFjaChzeW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkTmFtZXMuaW5jbHVkZXMoc3luLnBhcnRuZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFpcktleSA9IFtuYW1lLCBzeW4ucGFydG5lcl0uc29ydCgpLmpvaW4oJysnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlZW5QYWlycy5oYXMocGFpcktleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VlblBhaXJzLmFkZChwYWlyS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlU3luZXJnaWVzLnB1c2goeyBuYW1lMTogbmFtZSwgbmFtZTI6IHN5bi5wYXJ0bmVyLCBzeW5lcmd5TmFtZTogc3luLm5hbWUsIGRlc2M6IHN5bi5kZXNjIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcmsgc2VsZWN0ZWQgcG9ydHJhaXRzIHdpdGggYWN0aXZlIHN5bmVyZ3lcclxuICAgICAgICBhY3RpdmVTeW5lcmdpZXMuZm9yRWFjaChzeW4gPT4ge1xyXG4gICAgICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgocC5kYXRhc2V0Lm5hbWUgPT09IHN5bi5uYW1lMSB8fCBwLmRhdGFzZXQubmFtZSA9PT0gc3luLm5hbWUyKVxyXG4gICAgICAgICAgICAgICAgICAgICYmIHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhwLmRhdGFzZXQuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gSGlnaGxpZ2h0IHVuc2VsZWN0ZWQgcG9ydHJhaXRzIHRoYXQgaGF2ZSBzeW5lcmd5IHdpdGggc2VsZWN0ZWQgaGVyb2VzXHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMocC5kYXRhc2V0LmlkKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBwTmFtZSA9IHAuZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBjaGFyU3luZXJnaWVzID0gc3luZXJneU1hcFtwTmFtZV0gfHwgW107XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoaW5nID0gY2hhclN5bmVyZ2llcy5maWx0ZXIoc3luID0+IHNlbGVjdGVkTmFtZXMuaW5jbHVkZXMoc3luLnBhcnRuZXIpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaGluZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktYXZhaWxhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYWRnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UuY2xhc3NOYW1lID0gJ3N5bmVyZ3ktYmFkZ2UnO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLWxpbmtcIj48L2k+JztcclxuICAgICAgICAgICAgICAgIGJhZGdlLnRpdGxlID0gbWF0Y2hpbmcubWFwKHMgPT4gcy5uYW1lKS5qb2luKCcsICcpO1xyXG4gICAgICAgICAgICAgICAgcC5hcHBlbmRDaGlsZChiYWRnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzeW5lcmd5IGRpc3BsYXkgcGFuZWxcclxuICAgICAgICB1cGRhdGVTeW5lcmd5RGlzcGxheShhY3RpdmVTeW5lcmdpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVN5bmVyZ3lEaXNwbGF5KGFjdGl2ZVN5bmVyZ2llcykge1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3luZXJneS1kaXNwbGF5Jyk7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSAnc3luZXJneS1kaXNwbGF5JztcclxuICAgICAgICAgICAgY29uc3QgYWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC10ZWFtX19hY3Rpb25zJyk7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgYWN0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmVTeW5lcmdpZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5bmVyZ3ktZGlzcGxheV9fdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWxpbmtcIj48L2k+IFN5bmVyZ2llcyBhY3RpdmVzXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAke2FjdGl2ZVN5bmVyZ2llcy5tYXAocyA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzeW5lcmd5LWRpc3BsYXlfX25hbWVcIj4ke2VzY2FwZUh0bWwocy5zeW5lcmd5TmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19jaGFyc1wiPiR7ZXNjYXBlSHRtbChzLm5hbWUxKX0gKyAke2VzY2FwZUh0bWwocy5uYW1lMil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19kZXNjXCI+JHtlc2NhcGVIdG1sKHMuZGVzYyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUm9sZUluZGljYXRvcnMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgY29uc3QgaW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvbGUtaW5kaWNhdG9yJyk7XHJcbiAgICAgICAgaWYgKGluZGljYXRvcikge1xyXG4gICAgICAgICAgICBpbmRpY2F0b3IucXVlcnlTZWxlY3RvckFsbCgnLnJvbGUtc2xvdCcpLmZvckVhY2goc2xvdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSBzbG90LmRhdGFzZXQucm9sZTtcclxuICAgICAgICAgICAgICAgIGlmIChyb2xlc1tjYXRdID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICBQUkVTRVRTXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4gICAgY29uc3Qgc2F2ZVByZXNldEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2F2ZS1wcmVzZXQnKTtcclxuICAgIGNvbnN0IHByZXNldE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldE1vZGFsJyk7XHJcbiAgICBjb25zdCBwcmVzZXROYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0TmFtZScpO1xyXG4gICAgY29uc3QgcHJlc2V0Q29uZmlybUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRDb25maXJtJyk7XHJcbiAgICBjb25zdCBwcmVzZXRDYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0Q2FuY2VsJyk7XHJcblxyXG4gICAgLy8gTWV0dHJlIGEgam91ciBsZSBib3V0b24gc2F1dmVnYXJkZXIgc2Vsb24gbGEgc2VsZWN0aW9uXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTYXZlUHJlc2V0QnRuKCkge1xyXG4gICAgICAgIGlmIChzYXZlUHJlc2V0QnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5IZWFsZXIgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgc2F2ZVByZXNldEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcGVsZXIgdXBkYXRlU2F2ZVByZXNldEJ0biBhIGNoYXF1ZSBjaGFuZ2VtZW50IGRlIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0gPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcbiAgICAvLyBPbiBzdXJjaGFyZ2UgZW4gYWpvdXRhbnQgbCdhcHBlbFxyXG4gICAgY29uc3QgX29yaWdVcGRhdGUgPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcblxyXG4gICAgLy8gUGF0Y2g6IGFqb3V0ZXIgbCdhcHBlbCBhIHVwZGF0ZVNhdmVQcmVzZXRCdG4gZGFucyB1cGRhdGVTZWxlY3RlZFRlYW1cclxuICAgIC8vIE9uIGxlIGZhaXQgZW4gd3JhcHBhbnQgbGVzIGluZGljYXRldXJzXHJcbiAgICBjb25zdCBfb3JpZ1JvbGVJbmRpY2F0b3JzID0gdXBkYXRlUm9sZUluZGljYXRvcnM7XHJcblxyXG4gICAgLy8gT3V2cmlyIGxhIG1vZGFsXHJcbiAgICBpZiAoc2F2ZVByZXNldEJ0biAmJiBwcmVzZXRNb2RhbCkge1xyXG4gICAgICAgIHNhdmVQcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHByZXNldE5hbWVJbnB1dC5mb2N1cygpLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGZXJtZXIgbGEgbW9kYWxcclxuICAgICAgICBwcmVzZXRDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByZXNldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtbW9kYWxfX2JhY2tkcm9wJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNhdXZlZ2FyZGVyIGxlIHByZXNldFxyXG4gICAgICAgIHByZXNldENvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcmVzZXROYW1lSW5wdXQudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZGMxNDNjJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnLi4uJztcclxuXHJcbiAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvcHJlc2V0cy9zYXZlJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVySWRzOiBzZWxlY3RlZEhlcm9JZHMubWFwKE51bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWNoYXJnZXIgbGEgcGFnZSBwb3VyIGFmZmljaGVyIGxlIG5vdXZlYXUgcHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yIHx8ICdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUnKTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRW50ZXIgcG91ciB2YWxpZGVyXHJcbiAgICAgICAgcHJlc2V0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHByZXNldENvbmZpcm1CdG4uY2xpY2soKTtcclxuICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhcmdlciB1biBwcmVzZXQgKHNlbGVjdGlvbiBwcm9ncmFtbWF0aXF1ZSBkZXMgcGVyc29ubmFnZXMpXHJcbiAgICBmdW5jdGlvbiBsb2FkUHJlc2V0KGNoYXJhY3Rlcklkcykge1xyXG4gICAgICAgIC8vIFJlc2V0IGxhIHNlbGVjdGlvbiBhY3R1ZWxsZVxyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG5cclxuICAgICAgICAvLyBTZWxlY3Rpb25uZXIgbGVzIHBlcnNvbm5hZ2VzIGR1IHByZXNldFxyXG4gICAgICAgIGNoYXJhY3Rlcklkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWRTdHIgPSBTdHJpbmcoaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3J0cmFpdCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBpZFN0cik7XHJcbiAgICAgICAgICAgIGlmIChwb3J0cmFpdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWRTdHIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMucHVzaChwb3J0cmFpdC5kYXRhc2V0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICB1cGRhdGVTYXZlUHJlc2V0QnRuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3VwcHJpbWVyIHVuIHByZXNldFxyXG4gICAgZnVuY3Rpb24gZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwRWwpIHtcclxuICAgICAgICBpZiAoIWNvbmZpcm0oJ1N1cHByaW1lciBjZSBwcmVzZXQgPycpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGAvdGVhbXMvcHJlc2V0cy8ke3ByZXNldElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlwRWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTaSBwbHVzIGRlIHByZXNldHMsIGNhY2hlciBsYSBiYXJyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXRzLWJhcl9fbGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QgJiYgbGlzdC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0cy1iYXInKT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXR0YWNoZXIgbGVzIGV2ZW50cyBhdXggY2hpcHMgZGUgcHJlc2V0c1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZXNldC1jaGlwJykuZm9yRWFjaChjaGlwID0+IHtcclxuICAgICAgICBjb25zdCBwcmVzZXRJZCA9IGNoaXAuZGF0YXNldC5wcmVzZXRJZDtcclxuICAgICAgICBjb25zdCBjaGFySWRzID0gSlNPTi5wYXJzZShjaGlwLmRhdGFzZXQucHJlc2V0SWRzKTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2xvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbG9hZFByZXNldChjaGFySWRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2RlbGV0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9ic2VydmVyIGxlcyBjaGFuZ2VtZW50cyBkZSBzZWxlY3Rpb24gcG91ciBsZSBib3V0b24gc2F2ZVxyXG4gICAgLy8gT24gdXRpbGlzZSB1biBNdXRhdGlvbk9ic2VydmVyIHN1ciBzZWxlY3RlZExpc3RcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdXBkYXRlU2F2ZVByZXNldEJ0bigpKTtcclxuICAgIGlmIChzZWxlY3RlZExpc3QpIHtcclxuICAgICAgICBzZWxlY3RlZExpc3RPYnNlcnZlci5vYnNlcnZlKHNlbGVjdGVkTGlzdCwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhdW5jaEJ0bikge1xyXG4gICAgICAgIGxhdW5jaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnZvaSBQT1NUIEFKQVggdmVycyAvdGVhbXMvc2VsZWN0XHJcbiAgICAgICAgICAgICAgICBmZXRjaCgnL3RlYW1zL3NlbGVjdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogc2VsZWN0ZWRIZXJvSWRzLm1hcCgoaWQsIGkpID0+IGBjaGFyYWN0ZXJfaWRzWyR7aX1dPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGlkKX1gKS5qb2luKCcmJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlZGlyZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVkaXJpZ2UgbWFudWVsbGVtZW50IHNpIHBhcyBkZSByZWRpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbWF0Y2htYWtpbmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzw6lsZWN0aW9uIGRlIGxcXCfDqXF1aXBlLicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQUk9GSUxFIFBPUFVQXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1wb3B1cF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWNvbnRlbnRdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBvcHVwKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwb3B1cC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3Byb2ZpbGUtcG9wdXAtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwX19iYWNrZHJvcC0tb3BlbicpO1xyXG5cclxuICAgICAgICBpZiAoIWxvYWRlZCkge1xyXG4gICAgICAgICAgICBmZXRjaFByb2ZpbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cCk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmZXRjaFByb2ZpbGUoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9hcGkvcHJvZmlsZScpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9maWxlKGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lcnJvclwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclByb2ZpbGUoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdENsYXNzID0gKHIpID0+IHIgPT09ICd3aW4nID8gJ3Jlc3VsdC0td2luJyA6IHIgPT09ICdsb3NzJyA/ICdyZXN1bHQtLWxvc3MnIDogJ3Jlc3VsdC0tZHJhdyc7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0TGFiZWwgPSAocikgPT4gciA9PT0gJ3dpbicgPyAnVmljdG9pcmUnIDogciA9PT0gJ2xvc3MnID8gJ0RcXHUwMGU5ZmFpdGUnIDogJ051bCc7XHJcblxyXG4gICAgICAgIGNvbnN0IGF2YXRhckh0bWwgPSBkYXRhLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChkYXRhLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiQXZhdGFyIGRlICR7ZXNjYXBlSHRtbChkYXRhLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmFzIGZhLXVzZXItY2lyY2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPmA7XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faWRlbnRpdHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hdmF0YXJcIj4ke2F2YXRhckh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fdXNlcm5hbWVcIj4ke2VzY2FwZUh0bWwoZGF0YS51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5tb3R0byA/IGA8c3BhbiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX21vdHRvXCI+XFx1MDBhYiAke2VzY2FwZUh0bWwoZGF0YS5tb3R0byl9IFxcdTAwYmI8L3NwYW4+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5iaW8gPyBgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19iaW9cIj4ke2VzY2FwZUh0bWwoZGF0YS5iaW8pfTwvcD5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3RhdHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEucmF0aW5nKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPk1NUjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy53aW5zKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPlZpY3RvaXJlczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy5sb3NzZXMpKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+RFxcdTAwZTlmYWl0ZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMud2luUmF0ZSkpfSU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+V2luIFJhdGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXN0YXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IENoYW1waW9uIEZhdm9yaVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19uYW1lXCI+JHtlc2NhcGVIdG1sKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIubmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX3JvbGVcIj4ke2VzY2FwZUh0bWwoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5yb2xlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fY291bnRcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIuZ2FtZXNQbGF5ZWQpKX0gcGFydGllczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubGFzdFRlYW0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlcnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IERlcm5pXFx1MDBlOHJlIFxcdTAwYzlxdWlwZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5sYXN0VGVhbS5tYXAoYyA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX21lbWJlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoYy5uYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fcm9sZVwiPiR7ZXNjYXBlSHRtbChjLnJvbGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEucmVjZW50QmF0dGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zaGllbGQtYWx0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBIaXN0b3JpcXVlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5yZWNlbnRCYXR0bGVzLm1hcChiID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYXJlbmEvcmVwbGF5LyR7cGFyc2VJbnQoYi5pZCwgMTApfVwiIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19lbnRyeSAke3Jlc3VsdENsYXNzKGIucmVzdWx0KX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fcmVzdWx0XCI+JHtyZXN1bHRMYWJlbChiLnJlc3VsdCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19vcHBvbmVudFwiPnZzICR7ZXNjYXBlSHRtbChiLm9wcG9uZW50KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX3R5cGVcIj4ke2VzY2FwZUh0bWwoYi5tYXRjaFR5cGUpLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19kYXRlXCI+JHtlc2NhcGVIdG1sKGIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsYXkgcHJvZmlsZS1oaXN0b3J5X19yZXBsYXlcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZW1wdHlcIj5BdWN1biBjb21iYXQgZW5yZWdpc3RyXFx1MDBlOTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3Byb2ZpbGVcIiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2VkaXQtbGlua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gXFx1MDBjOWRpdGVyIGxlIHByb2ZpbFxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB9XHJcblxyXG59KTsiLCIvKipcclxuICogQ29tYmF0IEFuaW1hdGlvbiBDb250cm9sbGVyXHJcbiAqIEfDqHJlIGwnYWZmaWNoYWdlIHByb2dyZXNzaWYgZGVzIGxvZ3MgZGUgY29tYmF0IGF2ZWMgYW5pbWF0aW9uc1xyXG4gKi9cclxuY2xhc3MgQ29tYmF0Q29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLmxvZ3MgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFAgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICAvLyBSw6ljdXDDqXJlciBsZXMgbG9ncyBkZXB1aXMgbCdhdHRyaWJ1dCBkYXRhXHJcbiAgICAgICAgY29uc3QgbG9nc0RhdGEgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmNvbWJhdExvZ3M7XHJcbiAgICAgICAgaWYgKGxvZ3NEYXRhKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ3MgPSBKU09OLnBhcnNlKGxvZ3NEYXRhKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyZXVyIHBhcnNpbmcgbG9nczonLCBlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGVzIMOpbMOpbWVudHNcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1sb2ddJyk7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LW92ZXJsYXldJyk7XHJcbiAgICAgICAgdGhpcy5wbGF5QnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXBsYXldJyk7XHJcbiAgICAgICAgdGhpcy5za2lwQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXNraXBdJyk7XHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb21iYXQtc3BlZWRdJyk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgcGVyc29ubmFnZXMgYXZlYyBzdG9ja2FnZSBkZXMgSFAgbWF4IGluaXRpYXV4XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUCA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyU2x1Z3MgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlckhhc0hlYWwgPSB7fTtcclxuICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnMgPSB7fTsgLy8gU3VpdmkgZGVzIGNvb2xkb3ducyBlbiBjb3Vyc1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXMgPSB7fTsgLy8gU3VpdmkgZGVzIHN0YXR1dHMgYWN0aWZzIHBhciBwZXJzb25uYWdlXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2hhcmFjdGVyLW5hbWVdJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbC5kYXRhc2V0LmNoYXJhY3Rlck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJhY3RlclRlYW07XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW19LSR7bmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV0gPSBlbDtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJTbHVnIHx8ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3Rlckhhc0hlYWxba2V5XSA9IGVsLmRhdGFzZXQuaGFzSGVhbCA9PT0gJ3RydWUnO1xyXG5cclxuICAgICAgICAgICAgLy8gRXh0cmFpcmUgbGUgSFAgbWF4IGRlcHVpcyBsZSB0ZXh0ZSBpbml0aWFsXHJcbiAgICAgICAgICAgIGNvbnN0IGhwVGV4dCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcbiAgICAgICAgICAgIGlmIChocFRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gaHBUZXh0LnRleHRDb250ZW50Lm1hdGNoKC8oXFxkKylcXC8oXFxkKykvKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFBba2V5XSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhbGlzZXIgbGVzIHN0YXR1dHMgdmlkZXNcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldID0gdGhpcy5jcmVhdGVFbXB0eVN0YXR1c2VzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgw6lsw6ltZW50cyBkJ2FiaWxpdHkgZGFucyBsZXMgaW5mbyBwYW5lbHNcclxuICAgICAgICB0aGlzLmFiaWxpdHlFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGFyYWN0ZXItaW5mb1tkYXRhLWNoYXItbmFtZV0nKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsLmRhdGFzZXQuY2hhck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJUZWFtO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUVsID0gZWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5Jyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWw6IGFiaWxpdHlFbCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhDZDogcGFyc2VJbnQoYWJpbGl0eUVsLmRhdGFzZXQuYWJpbGl0eU1heENkKSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhZGdlOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LWNkLWJhZGdlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZUVsOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LW5hbWUnKSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uRWw6IGFiaWxpdHlFbC5xdWVyeVNlbGVjdG9yKCdpJyksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENhY2hlciBsJ292ZXJsYXlcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZpZGVyIGxlIGxvZ1xyXG4gICAgICAgIGlmICh0aGlzLmxvZ0NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF1ZGlvXHJcbiAgICAgICAgdGhpcy5hdWRpb1VubG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYXN0VHJhY2tJbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuaXNNdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudm9sdW1lID0gMC4xNTtcclxuICAgICAgICB0aGlzLnNmeFZvbHVtZSA9IDAuMztcclxuICAgICAgICB0aGlzLmNvbWJhdFBsYXlsaXN0ID0gW1xyXG4gICAgICAgICAgICAnL2Fzc2V0L2F1ZGlvL2NvbWJhdC9idXRjaGVyc2JvdWxldmFyZG11c2ljLm1wMycsXHJcbiAgICAgICAgICAgICcvYXNzZXQvYXVkaW8vY29tYmF0L2NvbWJhdGludGhlcnVpbnMubXAzJyxcclxuICAgICAgICBdO1xyXG4gICAgICAgIHRoaXMuc2Z4Q2FjaGUgPSB7fTtcclxuICAgICAgICB0aGlzLm11dGVCdG4gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hdWRpby1tdXRlXScpO1xyXG4gICAgICAgIHRoaXMudm9sdW1lU2xpZGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtYXVkaW8tdm9sdW1lXScpO1xyXG4gICAgICAgIHRoaXMuc2Z4U2xpZGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2Z4LXZvbHVtZV0nKTtcclxuXHJcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIExhbmNlciBhdXRvbWF0aXF1ZW1lbnQgYXByw6hzIHVuIGTDqWxhaVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wbGF5KCksIDgwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IFNUQVRVUyBUUkFDS0lORyA9PT1cclxuXHJcbiAgICBjcmVhdGVFbXB0eVN0YXR1c2VzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJsZWVkaW5nOiAwLFxyXG4gICAgICAgICAgICBibGlnaHRlZDogMCxcclxuICAgICAgICAgICAgc3R1bm5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgIG1hcmtlZDogMCxcclxuICAgICAgICAgICAgcHJvdGVjdGVkOiAwLFxyXG4gICAgICAgICAgICBzdGVhbHRoZWQ6IDAsXHJcbiAgICAgICAgICAgIHJpcG9zdGU6IDAsXHJcbiAgICAgICAgICAgIGRtZ1VwOiAwLFxyXG4gICAgICAgICAgICBzcGRVcDogMCxcclxuICAgICAgICAgICAgZG9kZ2VVcDogMCxcclxuICAgICAgICAgICAgY3JpdFVwOiAwLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2hhcmFjdGVyU3RhdHVzZXMobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdyb3VuZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpY2tSb3VuZFN0YXR1c2VzKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHRpY2tSb3VuZFN0YXR1c2VzIGFscmVhZHkgY2FsbHMgcmVuZGVyQWxsU3RhdHVzSWNvbnNcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQWJpbGl0eVN0YXR1c0NoYW5nZShsb2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdwcm90ZWN0ZWQnLCBsb2cuZHVyYXRpb24gfHwgMik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50dXJuc1JlbWFpbmluZyAhPT0gdW5kZWZpbmVkICYmIGxvZy50dXJuc1JlbWFpbmluZyA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGVlZGluZycsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnR1cm5zUmVtYWluaW5nICE9PSB1bmRlZmluZWQgJiYgbG9nLnR1cm5zUmVtYWluaW5nIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsaWdodGVkJywgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW5uZWRfc2tpcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ3N0dW5uZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICAvLyBTdGVhbHRoIGNvbnN1bWVkIG9uIGF0dGFja1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5hdHRhY2tlciAmJiBsb2cuYXR0YWNrZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7bG9nLmF0dGFja2VyVGVhbX0tJHtsb2cuYXR0YWNrZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldICYmIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XS5zdGVhbHRoZWQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XS5zdGVhbHRoZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV90cmlnZ2VyJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU3luZXJneVN0YXR1c0NoYW5nZShsb2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQWxsU3RhdHVzZXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckFsbFN0YXR1c0ljb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQWJpbGl0eVN0YXR1c0NoYW5nZShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxlZWRpbmcnLCBsb2cuYmxlZWRUdXJucyB8fCAzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuYWxsSGl0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaW1hcnkgPSBsb2cuYWxsSGl0cy5maW5kKGggPT4gaC5pc1ByaW1hcnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmltYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKHByaW1hcnkubmFtZSwgcHJpbWFyeS50ZWFtLCAnYmxpZ2h0ZWQnLCBsb2cuYmxpZ2h0VHVybnMgfHwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2cudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGlnaHRlZCcsIGxvZy5ibGlnaHRUdXJucyB8fCAzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdzdHVubmVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWFyayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnbWFya2VkJywgbG9nLm1hcmtUdXJucyB8fCAzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgJ3JpcG9zdGUnLCBsb2cucmlwb3N0ZVR1cm5zIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlbGZfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlCdWZmU3RhdHVzZXMobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy5idWZmcywgbG9nLmJ1ZmZEdXJhdGlvbiB8fCAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlUZWFtQnVmZlN0YXR1c2VzKGxvZy5jYXN0ZXJUZWFtLCBsb2cuYnVmZnMsIGxvZy5idWZmRHVyYXRpb24gfHwgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3RlYWx0aCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCAnc3RlYWx0aGVkJywgbG9nLnN0ZWFsdGhUdXJucyB8fCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0X2RvZGdlJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdwcm90ZWN0ZWQnLCBsb2cucHJvdGVjdFR1cm5zIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnZG9kZ2VVcCcsIGxvZy5wcm90ZWN0VHVybnMgfHwgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZW1lcmdlbmN5X2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5zZWxmQmxlZWRUdXJucyAmJiBsb2cuc2VsZkJsZWVkVHVybnMgPiAwICYmIGxvZy5jYXN0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgJ2JsZWVkaW5nJywgbG9nLnNlbGZCbGVlZFR1cm5zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICAgICAgLy8gTWFyayBtYXkgYmUgY29uc3VtZWQgb24gaGl0IChyZW1vdmVPbkhpdClcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdEtleSA9IGAke2xvZy50YXJnZXRUZWFtfS0ke2xvZy50YXJnZXR9YDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW4ndCBrbm93IGZvciBzdXJlIGlmIHJlbW92ZU9uSGl0LCBzbyBsZWF2ZSB0aGUgaWNvbiAtIGl0IHdpbGwgdGljayBkb3duXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU3luZXJneVN0YXR1c0NoYW5nZShsb2cpIHtcclxuICAgICAgICBpZiAoIWxvZy5lZmZlY3RUeXBlKSByZXR1cm47XHJcblxyXG4gICAgICAgIHN3aXRjaCAobG9nLmVmZmVjdFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnZ3JhbnRfcmlwb3N0ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cucGFydG5lckNoYXIsIGxvZy5wYXJ0bmVyQ2hhclRlYW0sICdyaXBvc3RlJywgbG9nLmdyYW50ZWRUdXJucyB8fCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0ZW1wX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5idWZmVHlwZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IGxvZy5idWZmRHVyYXRpb24gfHwgMjtcclxuICAgICAgICAgICAgICAgICAgICBsb2cuYnVmZlR5cGVzLmZvckVhY2godHlwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1c0tleSA9IHRoaXMuYnVmZlR5cGVUb1N0YXR1c0tleSh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1c0tleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtLCBzdGF0dXNLZXksIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FwcGx5X21hcmsnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ21hcmtlZCcsIGxvZy5tYXJrVHVybnMgfHwgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZ3JhbnRfZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtLCAnZG9kZ2VVcCcsIGxvZy5kb2RnZUR1cmF0aW9uIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2V4dGVuZF9zdGVhbHRoJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cucGFydG5lckNoYXIgJiYgbG9nLnBhcnRuZXJDaGFyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2xvZy5wYXJ0bmVyQ2hhclRlYW19LSR7bG9nLnBhcnRuZXJDaGFyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0uc3RlYWx0aGVkICs9IChsb2cuZXh0cmFUdXJucyB8fCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZ3VhcmFudGVlZF9jcml0JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5wYXJ0bmVyQ2hhciwgbG9nLnBhcnRuZXJDaGFyVGVhbSwgJ2NyaXRVcCcsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJ1ZmZUeXBlVG9TdGF0dXNLZXkodHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdkYW1hZ2UnOiByZXR1cm4gJ2RtZ1VwJztcclxuICAgICAgICAgICAgY2FzZSAnc3BlZWQnOiByZXR1cm4gJ3NwZFVwJztcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOiByZXR1cm4gJ2RvZGdlVXAnO1xyXG4gICAgICAgICAgICBjYXNlICdjcml0JzogcmV0dXJuICdjcml0VXAnO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlCdWZmU3RhdHVzZXMoY2hhck5hbWUsIHRlYW1OYW1lLCBidWZmcywgZHVyYXRpb24pIHtcclxuICAgICAgICBpZiAoIWJ1ZmZzKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qga2V5ID0gYCR7dGVhbU5hbWV9LSR7Y2hhck5hbWV9YDtcclxuICAgICAgICBjb25zdCBzID0gdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldO1xyXG4gICAgICAgIGlmICghcykgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoYnVmZnMuZGFtYWdlICYmIGJ1ZmZzLmRhbWFnZSA+IDApIHMuZG1nVXAgPSBNYXRoLm1heChzLmRtZ1VwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgaWYgKGJ1ZmZzLnNwZWVkICYmIGJ1ZmZzLnNwZWVkID4gMCkgcy5zcGRVcCA9IE1hdGgubWF4KHMuc3BkVXAsIGR1cmF0aW9uKTtcclxuICAgICAgICBpZiAoYnVmZnMuZG9kZ2UgJiYgYnVmZnMuZG9kZ2UgPiAwKSBzLmRvZGdlVXAgPSBNYXRoLm1heChzLmRvZGdlVXAsIGR1cmF0aW9uKTtcclxuICAgICAgICBpZiAoYnVmZnMuY3JpdCAmJiBidWZmcy5jcml0ID4gMCkgcy5jcml0VXAgPSBNYXRoLm1heChzLmNyaXRVcCwgZHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5VGVhbUJ1ZmZTdGF0dXNlcyh0ZWFtTmFtZSwgYnVmZnMsIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgaWYgKCFidWZmcykgcmV0dXJuO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXMpKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aCh0ZWFtTmFtZSArICctJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZnMuZGFtYWdlICYmIGJ1ZmZzLmRhbWFnZSA+IDApIHMuZG1nVXAgPSBNYXRoLm1heChzLmRtZ1VwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZnMuc3BlZWQgJiYgYnVmZnMuc3BlZWQgPiAwKSBzLnNwZFVwID0gTWF0aC5tYXgocy5zcGRVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZzLmRvZGdlICYmIGJ1ZmZzLmRvZGdlID4gMCkgcy5kb2RnZVVwID0gTWF0aC5tYXgocy5kb2RnZVVwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZnMuY3JpdCAmJiBidWZmcy5jcml0ID4gMCkgcy5jcml0VXAgPSBNYXRoLm1heChzLmNyaXRVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFN0YXR1cyhjaGFyTmFtZSwgdGVhbU5hbWUsIHN0YXR1c0tleSwgdmFsdWUpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtTmFtZX0tJHtjaGFyTmFtZX1gO1xyXG4gICAgICAgIGlmICghdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldW3N0YXR1c0tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckFsbFN0YXR1c2VzKGNoYXJOYW1lLCB0ZWFtTmFtZSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW1OYW1lfS0ke2NoYXJOYW1lfWA7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0gPSB0aGlzLmNyZWF0ZUVtcHR5U3RhdHVzZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGlja1JvdW5kU3RhdHVzZXMoKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5jaGFyYWN0ZXJTdGF0dXNlcykpIHtcclxuICAgICAgICAgICAgY29uc3QgcyA9IHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XTtcclxuICAgICAgICAgICAgLy8gRE9UczogTk9UIGRlY3JlbWVudGVkIGhlcmUsIGhhbmRsZWQgYnkgYmxlZWRfdGljay9ibGlnaHRfdGljayBsb2dzXHJcbiAgICAgICAgICAgIC8vIERlY3JlbWVudCBkdXJhdGlvbi1iYXNlZCBzdGF0dXNlcyAoc2tpcCBwZXJtYW5lbnQgYnVmZnMgPj0gOTk5KVxyXG4gICAgICAgICAgICBpZiAocy5tYXJrZWQgPiAwICYmIHMubWFya2VkIDwgOTk5KSBzLm1hcmtlZC0tO1xyXG4gICAgICAgICAgICBpZiAocy5wcm90ZWN0ZWQgPiAwICYmIHMucHJvdGVjdGVkIDwgOTk5KSBzLnByb3RlY3RlZC0tO1xyXG4gICAgICAgICAgICBpZiAocy5zdGVhbHRoZWQgPiAwICYmIHMuc3RlYWx0aGVkIDwgOTk5KSBzLnN0ZWFsdGhlZC0tO1xyXG4gICAgICAgICAgICBpZiAocy5yaXBvc3RlID4gMCAmJiBzLnJpcG9zdGUgPCA5OTkpIHMucmlwb3N0ZS0tO1xyXG4gICAgICAgICAgICBpZiAocy5kbWdVcCA+IDAgJiYgcy5kbWdVcCA8IDk5OSkgcy5kbWdVcC0tO1xyXG4gICAgICAgICAgICBpZiAocy5zcGRVcCA+IDAgJiYgcy5zcGRVcCA8IDk5OSkgcy5zcGRVcC0tO1xyXG4gICAgICAgICAgICBpZiAocy5kb2RnZVVwID4gMCAmJiBzLmRvZGdlVXAgPCA5OTkpIHMuZG9kZ2VVcC0tO1xyXG4gICAgICAgICAgICBpZiAocy5jcml0VXAgPiAwICYmIHMuY3JpdFVwIDwgOTk5KSBzLmNyaXRVcC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlckFsbFN0YXR1c0ljb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQWxsU3RhdHVzSWNvbnMoKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5jaGFyYWN0ZXJTdGF0dXNlcykpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJTdGF0dXNJY29ucyhrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTdGF0dXNJY29ucyhrZXkpIHtcclxuICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICBpZiAoIWVsKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMtaWNvbnMnKTtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBzID0gdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldO1xyXG4gICAgICAgIGNvbnN0IGljb25zID0gW107XHJcblxyXG4gICAgICAgIC8vIERlYnVmZnNcclxuICAgICAgICBpZiAocy5ibGVlZGluZyA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtdGludCcsIGNsczogJ3N0YXR1cy1pY29uLS1ibGVlZCcsIHRpdGxlOiAnU2FpZ25lbWVudCcgfSk7XHJcbiAgICAgICAgaWYgKHMuYmxpZ2h0ZWQgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLXNrdWxsLWNyb3NzYm9uZXMnLCBjbHM6ICdzdGF0dXMtaWNvbi0tYmxpZ2h0JywgdGl0bGU6ICdQZXN0ZScgfSk7XHJcbiAgICAgICAgaWYgKHMuc3R1bm5lZCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1kaXp6eScsIGNsczogJ3N0YXR1cy1pY29uLS1zdHVuJywgdGl0bGU6ICdFdG91cmRpJyB9KTtcclxuICAgICAgICBpZiAocy5tYXJrZWQgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLWNyb3NzaGFpcnMnLCBjbHM6ICdzdGF0dXMtaWNvbi0tbWFyaycsIHRpdGxlOiAnTWFycXVlJyB9KTtcclxuXHJcbiAgICAgICAgLy8gQnVmZnNcclxuICAgICAgICBpZiAocy5wcm90ZWN0ZWQgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLXNoaWVsZC1hbHQnLCBjbHM6ICdzdGF0dXMtaWNvbi0tcHJvdGVjdCcsIHRpdGxlOiAnUHJvdGVnZScgfSk7XHJcbiAgICAgICAgaWYgKHMuc3RlYWx0aGVkID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1leWUtc2xhc2gnLCBjbHM6ICdzdGF0dXMtaWNvbi0tc3RlYWx0aCcsIHRpdGxlOiAnRnVydGlmJyB9KTtcclxuICAgICAgICBpZiAocy5yaXBvc3RlID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1leGNoYW5nZS1hbHQnLCBjbHM6ICdzdGF0dXMtaWNvbi0tcmlwb3N0ZScsIHRpdGxlOiAnUmlwb3N0ZScgfSk7XHJcbiAgICAgICAgaWYgKHMuZG1nVXAgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLWZpc3QtcmFpc2VkJywgY2xzOiAnc3RhdHVzLWljb24tLWRtZy11cCcsIHRpdGxlOiAnK0RlZ2F0cycgfSk7XHJcbiAgICAgICAgaWYgKHMuc3BkVXAgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLXdpbmQnLCBjbHM6ICdzdGF0dXMtaWNvbi0tc3BkLXVwJywgdGl0bGU6ICcrVml0ZXNzZScgfSk7XHJcbiAgICAgICAgaWYgKHMuZG9kZ2VVcCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtcnVubmluZycsIGNsczogJ3N0YXR1cy1pY29uLS1kb2RnZS11cCcsIHRpdGxlOiAnK0VzcXVpdmUnIH0pO1xyXG4gICAgICAgIGlmIChzLmNyaXRVcCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtYnVsbHNleWUnLCBjbHM6ICdzdGF0dXMtaWNvbi0tY3JpdC11cCcsIHRpdGxlOiAnK0NyaXRpcXVlJyB9KTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGljb25zLm1hcChpID0+XHJcbiAgICAgICAgICAgIGA8c3BhbiBjbGFzcz1cInN0YXR1cy1pY29uICR7aS5jbHN9XCIgdGl0bGU9XCIke2kudGl0bGV9XCI+PGkgY2xhc3M9XCJmYXMgJHtpLmljb259XCI+PC9pPjwvc3Bhbj5gXHJcbiAgICAgICAgKS5qb2luKCcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gRU5EIFNUQVRVUyBUUkFDS0lORyA9PT1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXlCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVQbGF5KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2tpcEJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLnNraXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNraXAoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNwZWVkQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLnNldFNwZWVkKGUpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQXVkaW8gY29udHJvbHNcclxuICAgICAgICBpZiAodGhpcy5tdXRlQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlTXV0ZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudm9sdW1lU2xpZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudm9sdW1lU2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudm9sdW1lID0gcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb21iYXRNdXNpYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tYmF0TXVzaWMudm9sdW1lID0gdGhpcy5pc011dGVkID8gMCA6IHRoaXMudm9sdW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2Z4U2xpZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Z4U2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Z4Vm9sdW1lID0gcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVW5sb2NrIGF1ZGlvIG9uIGZpcnN0IHVzZXIgaW50ZXJhY3Rpb24gKGJyb3dzZXIgYXV0b3BsYXkgcG9saWN5KVxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdWRpb1VubG9ja2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9VbmxvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucGxheU5leHRUcmFjaygpO1xyXG4gICAgICAgIH0sIHsgb25jZTogdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZyAmJiAhdGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc05leHRMb2coKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVQbGF5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcgfHwgdGhpcy5pc1BhdXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNraXAoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIEFmZmljaGVyIHRvdXMgbGVzIGxvZ3MgcmVzdGFudHNcclxuICAgICAgICB3aGlsZSAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvZyA9IHRoaXMubG9nc1t0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUxvZyhsb2cpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKTtcclxuICAgICAgICAgICAgdGhpcy50cmFja0FiaWxpdHlDb29sZG93bnMobG9nKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJTdGF0dXNlcyhsb2cpO1xyXG4gICAgICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdkZWF0aCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTeW5lcmd5IHRyaWdnZXJzIHRoYXQga2lsbCB0YXJnZXRzXHJcbiAgICAgICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ3N5bmVyZ3lfdHJpZ2dlcicgJiYgbG9nLnRhcmdldEhQID09PSAwICYmIGxvZy50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zaG93VmljdG9yeU92ZXJsYXkoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTcGVlZChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHNwZWVkID0gcGFyc2VGbG9hdChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY29tYmF0U3BlZWQpO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbCdVSVxyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zLmZvckVhY2goYnRuID0+IGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTmV4dExvZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nIHx8IHRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmljdG9yeU92ZXJsYXkoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZyA9IHRoaXMubG9nc1t0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTG9nKGxvZyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsZXIgbGUgZMOpbGFpXHJcbiAgICAgICAgbGV0IGRlbGF5ID0gdGhpcy5nZXREZWxheUZvckxvZyhsb2cpO1xyXG4gICAgICAgIGRlbGF5ID0gZGVsYXkgLyB0aGlzLnNwZWVkO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvY2Vzc05leHRMb2coKSwgZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlbGF5Rm9yTG9nKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncm91bmQnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAnaW5pdGlhdGl2ZSc6IHJldHVybiA2MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6IHJldHVybiAzMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzogcmV0dXJuIDI4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlZmVuZCc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdkb2RnZSc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6IHJldHVybiAzNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0JzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZpY3RvcnknOlxyXG4gICAgICAgICAgICBjYXNlICdkcmF3JzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIC8vIE5vdXZlYXV4IHR5cGVzXHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgY2FzZSAnc3R1bm5lZF9za2lwJzogcmV0dXJuIDE4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYWN0aXZhdGUnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAnYWJpbGl0eV91c2UnOiByZXR1cm4gdGhpcy5nZXRBYmlsaXR5RGVsYXkobG9nKTtcclxuICAgICAgICAgICAgLy8gU3luZXJnaWVzXHJcbiAgICAgICAgICAgIGNhc2UgJ3N5bmVyZ3lfYW5ub3VuY2UnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV90cmlnZ2VyJzogcmV0dXJuIHRoaXMuZ2V0U3luZXJneVRyaWdnZXJEZWxheShsb2cpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMTIwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3luZXJneVRyaWdnZXJEZWxheShsb2cpIHtcclxuICAgICAgICAvLyBSZWFjdGl2ZSBzeW5lcmdpZXMgKGJvbnVzIGF0dGFja3MpIG5lZWQgbW9yZSB0aW1lXHJcbiAgICAgICAgaWYgKGxvZy5kYW1hZ2UgIT09IHVuZGVmaW5lZCkgcmV0dXJuIDM1MDA7XHJcbiAgICAgICAgcmV0dXJuIDI1MDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWJpbGl0eURlbGF5KGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnN1YnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfYXR0YWNrJzpcclxuICAgICAgICAgICAgY2FzZSAnYmFja2xpbmVfc3RyaWtlJzpcclxuICAgICAgICAgICAgY2FzZSAnYXJtb3JfcGllcmNlJzpcclxuICAgICAgICAgICAgY2FzZSAnYm9udXNfdnNfbWFya2VkJzogcmV0dXJuIDMwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOiByZXR1cm4gMzUwMDtcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdtYXJrJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYnVmZic6XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlbGZfYnVmZic6XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0ZWFsdGgnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfaGVhbCc6IHJldHVybiAyODAwO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9idWZmJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzogcmV0dXJuIDI4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3RfZG9kZ2UnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMjAwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc0xvZyhsb2cpIHtcclxuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24obG9nKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlMb2cobG9nKTtcclxuXHJcbiAgICAgICAgLy8gU3luY2hyb25pc2VyIGxhIG1pc2Ugw6Agam91ciBkZXMgSFAgYXZlYyBsJ2FuaW1hdGlvblxyXG4gICAgICAgIGNvbnN0IGhwRGVsYXkgPSB0aGlzLmdldEhQVXBkYXRlRGVsYXkobG9nKTtcclxuICAgICAgICBpZiAoaHBEZWxheSA+IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKSwgaHBEZWxheSAvIHRoaXMuc3BlZWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3VpdmkgZGVzIGNvb2xkb3duc1xyXG4gICAgICAgIHRoaXMudHJhY2tBYmlsaXR5Q29vbGRvd25zKGxvZyk7XHJcblxyXG4gICAgICAgIC8vIFN1aXZpIGRlcyBzdGF0dXRzIChpY29uZXMgYnVmZi9kZWJ1ZmYpXHJcbiAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJTdGF0dXNlcyhsb2cpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYWNrQWJpbGl0eUNvb2xkb3ducyhsb2cpIHtcclxuICAgICAgICAvLyBRdWFuZCB1bmUgY29tcMOpdGVuY2UgZXN0IHV0aWxpc8OpZSwgbWV0dHJlIGVuIGNvb2xkb3duXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAnYWJpbGl0eV91c2UnICYmIGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5RGF0YSA9IHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RGF0YSAmJiBhYmlsaXR5RGF0YS5tYXhDZCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldID0gYWJpbGl0eURhdGEubWF4Q2Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUFiaWxpdHlDb29sZG93bkRpc3BsYXkoa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQSBjaGFxdWUgbm91dmVhdSByb3VuZCwgZMOpY3LDqW1lbnRlciB0b3VzIGxlcyBjb29sZG93bnNcclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdyb3VuZCcpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5hYmlsaXR5Q29vbGRvd25zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hYmlsaXR5Q29vbGRvd25zW2tleV0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hYmlsaXR5Q29vbGRvd25zW2tleV0tLTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUFiaWxpdHlDb29sZG93bkRpc3BsYXkoa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5KGtleSkge1xyXG4gICAgICAgIGNvbnN0IGFiaWxpdHlEYXRhID0gdGhpcy5hYmlsaXR5RWxlbWVudHNba2V5XTtcclxuICAgICAgICBpZiAoIWFiaWxpdHlEYXRhKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNkID0gdGhpcy5hYmlsaXR5Q29vbGRvd25zW2tleV0gfHwgMDtcclxuXHJcbiAgICAgICAgaWYgKGNkID4gMCkge1xyXG4gICAgICAgICAgICAvLyBFbiBjb29sZG93biA6IGdyaXNlciArIGFmZmljaGVyIGJhZGdlXHJcbiAgICAgICAgICAgIGFiaWxpdHlEYXRhLmVsLmNsYXNzTGlzdC5hZGQoJ2NoYXJhY3Rlci1pbmZvX19hYmlsaXR5LS1vbi1jZCcpO1xyXG4gICAgICAgICAgICBpZiAoYWJpbGl0eURhdGEuYmFkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGFiaWxpdHlEYXRhLmJhZGdlLnRleHRDb250ZW50ID0gYCR7Y2R9VGA7XHJcbiAgICAgICAgICAgICAgICBhYmlsaXR5RGF0YS5iYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBQcsOqdCA6IHJldGlyZXIgbGUgZ3Jpc1xyXG4gICAgICAgICAgICBhYmlsaXR5RGF0YS5lbC5jbGFzc0xpc3QucmVtb3ZlKCdjaGFyYWN0ZXItaW5mb19fYWJpbGl0eS0tb24tY2QnKTtcclxuICAgICAgICAgICAgaWYgKGFiaWxpdHlEYXRhLmJhZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBhYmlsaXR5RGF0YS5iYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEhQVXBkYXRlRGVsYXkobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOiByZXR1cm4gMzUwO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzogcmV0dXJuIDQwMDtcclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOiByZXR1cm4gMDtcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfdGljayc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF90aWNrJzogcmV0dXJuIDIwMDtcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6IHJldHVybiAzNTA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzogcmV0dXJuIHRoaXMuZ2V0QWJpbGl0eUhQRGVsYXkobG9nKTtcclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV90cmlnZ2VyJzogcmV0dXJuIDgwMDtcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFiaWxpdHlIUERlbGF5KGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnN1YnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfYXR0YWNrJzpcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JhY2tsaW5lX3N0cmlrZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2FybW9yX3BpZXJjZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvbnVzX3ZzX21hcmtlZCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW4nOiByZXR1cm4gMzUwO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9oZWFsJzpcclxuICAgICAgICAgICAgY2FzZSAnZW1lcmdlbmN5X2hlYWwnOiByZXR1cm4gNDAwO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2Zvcm1fZGFtYWdlJzogcmV0dXJuIDIwMDtcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBbmltYXRpb24obG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5hdHRhY2tlciwgbG9nLmF0dGFja2VyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy5pc0NyaXQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuaGVhbGVyLCBsb2cuaGVhbGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlZmVuZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWZlbmQobG9nLmRlZmVuZGVyLCBsb2cuZGVmZW5kZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkb2RnZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEb2RnZShsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVhdGgobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIE5vdXZlYXV4IHR5cGVzXHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxlZWRpbmcnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEb1QobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGlnaHRlZCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW5uZWRfc2tpcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTdHVubmVkKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2FjdGl2YXRlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuYXR0YWNrZXIsIGxvZy5hdHRhY2tlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYWJpbGl0eV91c2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5QWJpbGl0eUFuaW1hdGlvbihsb2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIFN5bmVyZ2llc1xyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X2Fubm91bmNlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN5bmVyZ3lBbm5vdW5jZShsb2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N5bmVyZ3lfdHJpZ2dlcic6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTeW5lcmd5VHJpZ2dlcihsb2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBOT1VWRUxMRVMgQU5JTUFUSU9OUyA9PT1cclxuXHJcbiAgICBhbmltYXRlRG9UKHRhcmdldE5hbWUsIHRhcmdldFRlYW0sIGRvdENsYXNzKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoZG90Q2xhc3MpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKGRvdENsYXNzKSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVTdHVubmVkKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc3R1bm5lZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdzdHVubmVkJyksIDE0MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlTWFya2VkKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnbWFya2VkJyk7XHJcbiAgICAgICAgICAgIC8vIExhIG1hcnF1ZSByZXN0ZSB2aXNpYmxlIHBsdXMgbG9uZ3RlbXBzXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ21hcmtlZCcpLCAyMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZUJ1ZmYodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdidWZmZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnYnVmZmVkJyksIDE0MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlU3RlYWx0aCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3N0ZWFsdGhlZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdzdGVhbHRoZWQnKSwgMTUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBYmlsaXR5QW5pbWF0aW9uKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnN1YnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxlZWRpbmcnKSwgNzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmxpZ2h0S2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShibGlnaHRLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChibGlnaHRLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhc3RlckVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FzdGVyRWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzdGVyRWwuY2xhc3NMaXN0LmFkZCgnYXR0YWNraW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY2FzdGVyRWwuY2xhc3NMaXN0LnJlbW92ZSgnYXR0YWNraW5nJyksIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEFPRTogaHVydCBhbGwgaGl0IGVuZW1pZXNcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuYWxsSGl0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2cuYWxsSGl0cy5mb3JFYWNoKGggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoaC5uYW1lLCBoLnRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcpLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEJsaWdodCBET1QgYW5pbWF0aW9uIG9ubHkgb24gcHJpbWFyeSB0YXJnZXRcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmltYXJ5ID0gbG9nLmFsbEhpdHMuZmluZChoID0+IGguaXNQcmltYXJ5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJpbWFyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChwcmltYXJ5Lm5hbWUsIHByaW1hcnkudGVhbSwgJ2JsaWdodGVkJyksIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZhbGxiYWNrIGZvciBvbGQgbG9nIGZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnKSwgNzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hbmltYXRlU3R1bm5lZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSksIDcwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWFyayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKG1hcmtLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChtYXJrS2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB0aGlzLmFuaW1hdGVNYXJrZWQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJpcG9zdGVLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHJpcG9zdGVLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChyaXBvc3RlS2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWxmX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxmQnVmZktleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBYm9taW5hdGlvbiBUcmFuc2Zvcm1hdGlvbiA6IHN3aXRjaCBzbHVnIHRvIGJlYXN0IHBlcm1hbmVudGx5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvZy5hYmlsaXR5TmFtZSA9PT0gJ1RyYW5zZm9ybWF0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJhY3RlclNsdWdzW3NlbGZCdWZmS2V5XSA9ICdiZWFzdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShzZWxmQnVmZktleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHNlbGZCdWZmS2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9oZWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydHlIZWFsS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngocGFydHlIZWFsS2V5LCAnaGVhbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBbmltZXIgdG91cyBsZXMgYWxsacOpcyBzb2lnbsOpc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2cuaGVhbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZy5oZWFsZWQuZm9yRWFjaChoID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGgubmFtZSwgaC50ZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hlYWxlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGVhbGVkJyksIDE1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnR5QnVmZktleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUocGFydHlCdWZmS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngocGFydHlCdWZmS2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEFuaW1lciB0b3VzIGxlcyBhbGxpw6lzIGR1IG3Dqm1lIGPDtHTDqVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlVGVhbUJ1ZmYobG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0ZWFsdGgnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGVhbHRoS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShzdGVhbHRoS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoc3RlYWx0aEtleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3RlYWx0aChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYXJtb3JfcGllcmNlJzpcclxuICAgICAgICAgICAgY2FzZSAnYmFja2xpbmVfc3RyaWtlJzpcclxuICAgICAgICAgICAgY2FzZSAnYm9udXNfdnNfbWFya2VkJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cuaXNDcml0IHx8IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdlbWVyZ2VuY3lfaGVhbCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVtZXJnSGVhbEtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KGVtZXJnSGVhbEtleSwgJ2hlYWwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVIZWFsKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdF9kb2RnZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3REb2RnZUtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHByb3REb2RnZUtleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVmZW5kKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2Zvcm1fZGFtYWdlJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdodXJ0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcpLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlVGVhbUJ1ZmYoY2FzdGVyVGVhbSkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY2hhcmFjdGVyRWxlbWVudHMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKGNhc3RlclRlYW0pKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2J1ZmZlZCcpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdidWZmZWQnKSwgMTQwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gU1lORVJHWSBBTklNQVRJT05TID09PVxyXG5cclxuICAgIGFuaW1hdGVTeW5lcmd5QW5ub3VuY2UobG9nKSB7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudHJpZ2dlckNoYXIsIGxvZy50ZWFtKTtcclxuICAgICAgICBjb25zdCBwYXJ0bmVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy5wYXJ0bmVyQ2hhciwgbG9nLnRlYW0pO1xyXG5cclxuICAgICAgICBpZiAodHJpZ2dlcikge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktYW5ub3VuY2UtZ2xvdycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS1hbm5vdW5jZS1nbG93JyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFydG5lcikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBhcnRuZXIuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1hbm5vdW5jZS1nbG93Jyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHBhcnRuZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS1hbm5vdW5jZS1nbG93JyksIDE1MDApO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRHJhdyBTVkcgbGluayBiZXR3ZWVuIHRoZSB0d29cclxuICAgICAgICBpZiAodHJpZ2dlciAmJiBwYXJ0bmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1N5bmVyZ3lMaW5rKHRyaWdnZXIsIHBhcnRuZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlU3luZXJneVRyaWdnZXIobG9nKSB7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudHJpZ2dlckNoYXIsIGxvZy50cmlnZ2VyQ2hhclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHBhcnRuZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtKTtcclxuXHJcbiAgICAgICAgLy8gUGhhc2UgMTogVHJpZ2dlciBnbG93XHJcbiAgICAgICAgaWYgKHRyaWdnZXIpIHtcclxuICAgICAgICAgICAgdHJpZ2dlci5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LXRyaWdnZXItZ2xvdycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS10cmlnZ2VyLWdsb3cnKSwgMTgwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQaGFzZSAyOiBTVkcgbGluayBiZXR3ZWVuIHRyaWdnZXIgYW5kIHBhcnRuZXJcclxuICAgICAgICBpZiAodHJpZ2dlciAmJiBwYXJ0bmVyKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kcmF3U3luZXJneUxpbmsodHJpZ2dlciwgcGFydG5lciksIDQwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQaGFzZSAzOiBQYXJ0bmVyIHJlYWN0aW9uXHJcbiAgICAgICAgaWYgKHBhcnRuZXIpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0bmVyLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktcmVhY3QnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcGFydG5lci5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LXJlYWN0JyksIDgwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgaXQncyBhIGJvbnVzIGF0dGFjaywgYW5pbWF0ZSB0aGUgcGFydG5lciBhdHRhY2tpbmdcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuZGFtYWdlICE9PSB1bmRlZmluZWQgJiYgbG9nLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRuZXJLZXkgPSBgJHtsb2cucGFydG5lckNoYXJUZWFtfS0ke2xvZy5wYXJ0bmVyQ2hhcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShwYXJ0bmVyS2V5LCAnYXR0YWNrYW5pbWF0aW9uLndlYnAnLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHBhcnRuZXJLZXksICdhdHRhY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2h1cnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnKSwgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdTeW5lcmd5TGluayhlbDEsIGVsMikge1xyXG4gICAgICAgIGNvbnN0IHN0YWdlID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmJhdHRsZS1zdGFnZScpO1xyXG4gICAgICAgIGlmICghc3RhZ2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGV4aXN0aW5nIFNWRyBpZiBhbnlcclxuICAgICAgICBjb25zdCBleGlzdGluZ1N2ZyA9IHN0YWdlLnF1ZXJ5U2VsZWN0b3IoJy5zeW5lcmd5LWxpbmstc3ZnJyk7XHJcbiAgICAgICAgaWYgKGV4aXN0aW5nU3ZnKSBleGlzdGluZ1N2Zy5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKTtcclxuICAgICAgICBzdmcuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1saW5rLXN2ZycpO1xyXG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpO1xyXG5cclxuICAgICAgICBjb25zdCBzdGFnZVJlY3QgPSBzdGFnZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCByZWN0MSA9IGVsMS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCByZWN0MiA9IGVsMi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgY29uc3QgeDEgPSByZWN0MS5sZWZ0ICsgcmVjdDEud2lkdGggLyAyIC0gc3RhZ2VSZWN0LmxlZnQ7XHJcbiAgICAgICAgY29uc3QgeTEgPSByZWN0MS50b3AgKyByZWN0MS5oZWlnaHQgLyAyIC0gc3RhZ2VSZWN0LnRvcDtcclxuICAgICAgICBjb25zdCB4MiA9IHJlY3QyLmxlZnQgKyByZWN0Mi53aWR0aCAvIDIgLSBzdGFnZVJlY3QubGVmdDtcclxuICAgICAgICBjb25zdCB5MiA9IHJlY3QyLnRvcCArIHJlY3QyLmhlaWdodCAvIDIgLSBzdGFnZVJlY3QudG9wO1xyXG5cclxuICAgICAgICBjb25zdCBsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdsaW5lJyk7XHJcbiAgICAgICAgbGluZS5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWxpbmstbGluZScpO1xyXG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd4MScsIHgxKTtcclxuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgneTEnLCB5MSk7XHJcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgeDIpO1xyXG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd5MicsIHkyKTtcclxuXHJcbiAgICAgICAgc3ZnLmFwcGVuZENoaWxkKGxpbmUpO1xyXG4gICAgICAgIHN0YWdlLmFwcGVuZENoaWxkKHN2Zyk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBhZnRlciBhbmltYXRpb25cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHN2Zy5yZW1vdmUoKSwgMTgwMCAvIHRoaXMuc3BlZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBTUFJJVEUgU1dBUCA9PT1cclxuXHJcbiAgICBzd2FwU3ByaXRlKGtleSwgc3ByaXRlTmFtZSwgZHVyYXRpb24pIHtcclxuICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICBpZiAoIWVsKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgc2x1ZyA9IHRoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XTtcclxuICAgICAgICBpZiAoIXNsdWcpIHJldHVybjtcclxuICAgICAgICBjb25zdCBpbWcgPSBlbC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLXNwcml0ZScpO1xyXG4gICAgICAgIGlmICghaW1nKSByZXR1cm47XHJcbiAgICAgICAgaW1nLnNyYyA9IGAvYXNzZXQvaW1nL2NvbWJhdC8ke3NsdWd9LyR7c3ByaXRlTmFtZX1gO1xyXG4gICAgICAgIGlmIChkdXJhdGlvbiA+IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucygnZGVhZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IGAvYXNzZXQvaW1nL2NvbWJhdC8ke3RoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XX0vZmlnaHRpZGxlLndlYnBgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBBTklNQVRJT05TIEVYSVNUQU5URVMgPT09XHJcblxyXG4gICAgYW5pbWF0ZUF0dGFjayhhdHRhY2tlck5hbWUsIGF0dGFja2VyVGVhbSwgdGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSwgaXNDcml0KSB7XHJcbiAgICAgICAgY29uc3QgYXR0YWNrZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoYXR0YWNrZXJOYW1lLCBhdHRhY2tlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGF0dGFja2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2F0dGFja2VyVGVhbX0tJHthdHRhY2tlck5hbWV9YDtcclxuICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKGtleSwgJ2F0dGFja2FuaW1hdGlvbi53ZWJwJywgMTIwMCk7XHJcbiAgICAgICAgICAgIGF0dGFja2VyLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2luZycpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KGtleSwgJ2F0dGFjaycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGF0dGFja2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGFja2luZycpLCAxMjAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ3JpdCkgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NyaXQnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnLCAnY3JpdCcpLCA4MDApO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlSGVhbChoZWFsZXJOYW1lLCBoZWFsZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgaGVhbGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGhlYWxlck5hbWUsIGhlYWxlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGhlYWxlcikge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtoZWFsZXJUZWFtfS0ke2hlYWxlck5hbWV9YDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVySGFzSGVhbFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnaGVhbGluZy53ZWJwJywgMTUwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnc2tpbGwud2VicCcsIDE1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhlYWxlci5jbGFzc0xpc3QuYWRkKCdoZWFsaW5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoa2V5LCAnaGVhbCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGhlYWxlci5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsaW5nJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGVhbGVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxlZCcpLCAxNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlZmVuZChkZWZlbmRlck5hbWUsIGRlZmVuZGVyVGVhbSkge1xyXG4gICAgICAgIGNvbnN0IGRlZmVuZGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGRlZmVuZGVyTmFtZSwgZGVmZW5kZXJUZWFtKTtcclxuICAgICAgICBpZiAoZGVmZW5kZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7ZGVmZW5kZXJUZWFtfS0ke2RlZmVuZGVyTmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnZGVmZW5kaW5nLndlYnAnLCAxODAwKTtcclxuICAgICAgICAgICAgZGVmZW5kZXIuY2xhc3NMaXN0LmFkZCgnZGVmZW5kaW5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoa2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBkZWZlbmRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWZlbmRpbmcnKSwgMTgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEb2RnZSh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RvZGdpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZG9kZ2luZycpLCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlYXRoKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZGVhZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGFyYWN0ZXJFbGVtZW50KG5hbWUsIHRlYW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1tgJHt0ZWFtfS0ke25hbWV9YF07XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheUxvZyhsb2cpIHtcclxuICAgICAgICBpZiAoIXRoaXMubG9nQ29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGVudHJ5LmNsYXNzTmFtZSA9ICdjb21iYXQtbG9nX19lbnRyeSc7XHJcblxyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ3JvdW5kJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tcm91bmQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAndmljdG9yeScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXZpY3RvcnknKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnZHJhdycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWRlZmVhdCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdhYmlsaXR5X3VzZScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWFiaWxpdHknKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYmxlZWRfdGljaycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWJsZWVkJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsaWdodF90aWNrJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tYmxpZ2h0Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3N0dW5uZWRfc2tpcCcpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXN0dW4nKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAncmlwb3N0ZV9hY3RpdmF0ZScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXJpcG9zdGUnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnc3luZXJneV9hbm5vdW5jZScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXN5bmVyZ3ktYW5ub3VuY2UnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnc3luZXJneV90cmlnZ2VyJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tc3luZXJneS10cmlnZ2VyJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbnRyeS5pbm5lckhUTUwgPSBsb2cubWVzc2FnZTtcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsVG9wID0gdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUhlYWx0aEJhcnMobG9nKSB7XHJcbiAgICAgICAgbGV0IGNoYXJhY3Rlck5hbWUgPSBudWxsO1xyXG4gICAgICAgIGxldCB0ZWFtTmFtZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRIUCA9IG51bGw7XHJcbiAgICAgICAgbGV0IG1heEhQID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gRMOpdGVybWluZXIgbGVzIGRvbm7DqWVzIHNlbG9uIGxlIHR5cGUgZGUgbG9nXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAnYXR0YWNrJyB8fCBsb2cudHlwZSA9PT0gJ3JpcG9zdGVfYWN0aXZhdGUnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdoZWFsJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYmxlZWRfdGljaycgfHwgbG9nLnR5cGUgPT09ICdibGlnaHRfdGljaycpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2FiaWxpdHlfdXNlJykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnc3luZXJneV90cmlnZ2VyJykge1xyXG4gICAgICAgICAgICAvLyBTeW5lcmdpZXMgY2FuIGNhdXNlIGRhbWFnZVxyXG4gICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0SFAgIT09IHVuZGVmaW5lZCAmJiBsb2cudGFyZ2V0TWF4SFApIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBzaSBub3VzIGF2b25zIGxlcyBkb25uw6llcyBuw6ljZXNzYWlyZXNcclxuICAgICAgICBpZiAoY2hhcmFjdGVyTmFtZSAmJiB0ZWFtTmFtZSAmJiBjdXJyZW50SFAgIT09IG51bGwgJiYgY3VycmVudEhQICE9PSB1bmRlZmluZWQgJiYgbWF4SFApIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCBtYXhIUCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzKGxvZykge1xyXG4gICAgICAgIC8vIEFPRSBoaXRzIChibGlnaHRfYXR0YWNrKTogdXBkYXRlIEhQIGZvciBhbGwgaGl0IGVuZW1pZXNcclxuICAgICAgICBpZiAobG9nLmFsbEhpdHMpIHtcclxuICAgICAgICAgICAgbG9nLmFsbEhpdHMuZm9yRWFjaChoID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAoaC5uYW1lLCBoLnRlYW0sIGguaHAsIGgubWF4SHApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ29tcMOpdGVuY2VzIHF1aSBpbmZsaWdlbnQgZGVzIGTDqWfDonRzIMOgIHVuZSBjaWJsZVxyXG4gICAgICAgIGVsc2UgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldEhQICE9PSB1bmRlZmluZWQgJiYgbG9nLnRhcmdldE1heEhQKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy50YXJnZXRIUCwgbG9nLnRhcmdldE1heEhQKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNvaW4gZGUgZ3JvdXBlIDogbWV0dHJlIMOgIGpvdXIgY2hhcXVlIGFsbGnDqSBzb2lnbsOpXHJcbiAgICAgICAgaWYgKGxvZy5zdWJ0eXBlID09PSAncGFydHlfaGVhbCcgJiYgbG9nLmhlYWxlZCkge1xyXG4gICAgICAgICAgICBsb2cuaGVhbGVkLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGgubmFtZSwgaC50ZWFtLCBoLmhwLCBoLm1heEhwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTb2luIGQndXJnZW5jZSA6IG1ldHRyZSDDoCBqb3VyIGxlIGxhbmNldXJcclxuICAgICAgICBpZiAobG9nLnN1YnR5cGUgPT09ICdlbWVyZ2VuY3lfaGVhbCcgJiYgbG9nLmNhc3Rlcikge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0SFAsIGxvZy50YXJnZXRNYXhIUCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYXJhY3RlckhQKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsIG1heEhQKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IG1heEhQID4gMCA/IChjdXJyZW50SFAgLyBtYXhIUCkgKiAxMDAgOiAwO1xyXG5cclxuICAgICAgICAvLyBNaXNlIMOgIGpvdXIgZGUgbGEgYmFycmUgSFAgZGFucyBsYSB6b25lIGRlIGNvbWJhdCAoYmF0dGxlLXN0YWdlKVxyXG4gICAgICAgIGNvbnN0IGhwQmFyID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ocC1iYXJfX2ZpbGwnKTtcclxuICAgICAgICBjb25zdCBocFRleHQgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmhwLXRleHQnKTtcclxuXHJcbiAgICAgICAgaWYgKGhwQmFyKSB7XHJcbiAgICAgICAgICAgIC8vIEFuaW1hdGlvbiBmbHVpZGUgZGUgbGEgYmFycmVcclxuICAgICAgICAgICAgaHBCYXIuc3R5bGUudHJhbnNpdGlvbiA9IGB3aWR0aCAwLjNzIGVhc2Utb3V0YDtcclxuICAgICAgICAgICAgaHBCYXIuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50fSVgO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xhc3NlcyBkZSBjb3VsZXVyIHNlbG9uIGxlIHBvdXJjZW50YWdlXHJcbiAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hwLWJhcl9fZmlsbC0tbG93JywgJ2hwLWJhcl9fZmlsbC0tY3JpdGljYWwnKTtcclxuICAgICAgICAgICAgaWYgKHBlcmNlbnQgPD0gMjUpIHtcclxuICAgICAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5hZGQoJ2hwLWJhcl9fZmlsbC0tY3JpdGljYWwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwZXJjZW50IDw9IDUwKSB7XHJcbiAgICAgICAgICAgICAgICBocEJhci5jbGFzc0xpc3QuYWRkKCdocC1iYXJfX2ZpbGwtLWxvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaHBUZXh0KSB7XHJcbiAgICAgICAgICAgIGhwVGV4dC50ZXh0Q29udGVudCA9IGAke2N1cnJlbnRIUH0vJHttYXhIUH1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWlzZSDDoCBqb3VyIGRlcyBwYW5uZWF1eCBkJ2luZm8gbGF0w6lyYXV4XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbmZvUGFuZWwoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSW5mb1BhbmVsKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFApIHtcclxuICAgICAgICAvLyBUcm91dmVyIGxlIGJvbiBwYW5uZWF1IHNlbG9uIGwnw6lxdWlwZVxyXG4gICAgICAgIGNvbnN0IHBhbmVsQ2xhc3MgPSB0ZWFtTmFtZSA9PT0gJ0VxdWlwZSAxJyA/ICcuaW5mby1wYW5lbC0tdGVhbTEnIDogJy5pbmZvLXBhbmVsLS10ZWFtMic7XHJcbiAgICAgICAgY29uc3QgcGFuZWwgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKHBhbmVsQ2xhc3MpO1xyXG5cclxuICAgICAgICBpZiAoIXBhbmVsKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIFRyb3V2ZXIgbGUgcGVyc29ubmFnZSBkYW5zIGxlIHBhbm5lYXUgcGFyIHNvbiBub21cclxuICAgICAgICBjb25zdCBjaGFyYWN0ZXJJbmZvcyA9IHBhbmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGFyYWN0ZXItaW5mbycpO1xyXG4gICAgICAgIGZvciAoY29uc3QgaW5mbyBvZiBjaGFyYWN0ZXJJbmZvcykge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lRWwgPSBpbmZvLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fbmFtZScpO1xyXG4gICAgICAgICAgICBpZiAobmFtZUVsICYmIG5hbWVFbC50ZXh0Q29udGVudC50cmltKCkgPT09IGNoYXJhY3Rlck5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRzU3BhbiA9IGluZm8ucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19zdGF0cyBzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHNTcGFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNTcGFuLnRleHRDb250ZW50ID0gY3VycmVudEhQO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBBbmltYXRpb24gZmxhc2ggcG91ciBtb250cmVyIGxlIGNoYW5nZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBzdGF0c1NwYW4uY2xhc3NMaXN0LmFkZCgnaHAtdXBkYXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc3RhdHNTcGFuLmNsYXNzTGlzdC5yZW1vdmUoJ2hwLXVwZGF0ZWQnKSwgMzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dWaWN0b3J5T3ZlcmxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaW5hbGlzZXIgbGUgTU1SIGEgbGEgZmluIGR1IGNvbWJhdFxyXG4gICAgICAgIHRoaXMuZmluYWxpemVSYXRpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5hbGl6ZVJhdGluZygpIHtcclxuICAgICAgICBjb25zdCBmaW5hbGl6ZVVybCA9IHRoaXMuY29udGFpbmVyLmRhdGFzZXQuZmluYWxpemVVcmw7XHJcbiAgICAgICAgaWYgKCFmaW5hbGl6ZVVybCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBmZXRjaChmaW5hbGl6ZVVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICYmIGRhdGEucmF0aW5nQ2hhbmdlICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSYXRpbmdVcGRhdGUoZGF0YS5yYXRpbmdDaGFuZ2UsIGRhdGEubmV3UmF0aW5nLCBkYXRhLm5ld1JhdGluZzIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBmaW5hbGlzYXRpb24gcmF0aW5nOicsIGVycikpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dSYXRpbmdVcGRhdGUoY2hhbmdlLCBuZXdSYXRpbmcsIG5ld1JhdGluZzIpIHtcclxuICAgICAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIE1NUiBhZmZpY2hlIGRhbnMgbGUgcGFubmVhdSBqb3VldXIgKEVxdWlwZSAxKVxyXG4gICAgICAgIGNvbnN0IHJhdGluZ0VsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0xIC5pbmZvLXBhbmVsX19yYXRpbmcnKTtcclxuICAgICAgICBpZiAocmF0aW5nRWwgJiYgbmV3UmF0aW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7bmV3UmF0aW5nfSBNTVJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIGEgam91ciBsZSBNTVIgYWZmaWNoZSBkYW5zIGxlIHBhbm5lYXUgYWR2ZXJzYWlyZSAoRXF1aXBlIDIpXHJcbiAgICAgICAgY29uc3QgcmF0aW5nRWwyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0yIC5pbmZvLXBhbmVsX19yYXRpbmctLWVuZW15Jyk7XHJcbiAgICAgICAgaWYgKHJhdGluZ0VsMiAmJiBuZXdSYXRpbmcyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsMi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke25ld1JhdGluZzJ9IE1NUmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZmZpY2hlciBsYSBub3RpZmljYXRpb24gZGUgY2hhbmdlbWVudCBkYW5zIGwnb3ZlcmxheVxyXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtb3ZlcmxheV0nKTtcclxuICAgICAgICBpZiAob3ZlcmxheSkge1xyXG4gICAgICAgICAgICBjb25zdCB3aW5uZXJEaXYgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGUtc3RhZ2VfX3dpbm5lcicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hhbmdlbWVudCBNTVIgRXF1aXBlIDFcclxuICAgICAgICAgICAgY29uc3Qgbm90aWYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG5vdGlmMS5jbGFzc05hbWUgPSAncmF0aW5nLWNoYW5nZSc7XHJcbiAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZToxLjJyZW07bWFyZ2luLXRvcDoxMnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMS50ZXh0Q29udGVudCA9IGNoYW5nZSA+IDAgPyBgRXF1aXBlIDEgOiArJHtjaGFuZ2V9IE1NUmAgOiBgRXF1aXBlIDEgOiAke2NoYW5nZX0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYxLnN0eWxlLmNvbG9yID0gY2hhbmdlID4gMCA/ICcjNGNhZjUwJyA6ICcjZjQ0MzM2JztcclxuICAgICAgICAgICAgd2lubmVyRGl2LmFwcGVuZENoaWxkKG5vdGlmMSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGFuZ2VtZW50IE1NUiBFcXVpcGUgMiAoaW52ZXJzZSlcclxuICAgICAgICAgICAgY29uc3QgY2hhbmdlMiA9IC1jaGFuZ2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBub3RpZjIuY2xhc3NOYW1lID0gJ3JhdGluZy1jaGFuZ2UnO1xyXG4gICAgICAgICAgICBub3RpZjIuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MS4ycmVtO21hcmdpbi10b3A6NnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMi50ZXh0Q29udGVudCA9IGNoYW5nZTIgPiAwID8gYEVxdWlwZSAyIDogKyR7Y2hhbmdlMn0gTU1SYCA6IGBFcXVpcGUgMiA6ICR7Y2hhbmdlMn0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYyLnN0eWxlLmNvbG9yID0gY2hhbmdlMiA+IDAgPyAnIzRjYWY1MCcgOiAnI2Y0NDMzNic7XHJcbiAgICAgICAgICAgIHdpbm5lckRpdi5hcHBlbmRDaGlsZChub3RpZjIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3RpZjEuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gQVVESU8gPT09XHJcblxyXG4gICAgcGxheU5leHRUcmFjaygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXVkaW9VbmxvY2tlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb21iYXRNdXNpYykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbWJhdE11c2ljLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tYmF0TXVzaWMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5nZXRSYW5kb21UcmFja0luZGV4KCk7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG5ldyBBdWRpbyh0aGlzLmNvbWJhdFBsYXlsaXN0W2lkeF0pO1xyXG4gICAgICAgIHRoaXMuY29tYmF0TXVzaWMudm9sdW1lID0gdGhpcy5pc011dGVkID8gMCA6IHRoaXMudm9sdW1lO1xyXG4gICAgICAgIHRoaXMuY29tYmF0TXVzaWMuYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB0aGlzLnBsYXlOZXh0VHJhY2soKSk7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYy5wbGF5KCkuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJhbmRvbVRyYWNrSW5kZXgoKSB7XHJcbiAgICAgICAgbGV0IGk7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5jb21iYXRQbGF5bGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIH0gd2hpbGUgKGkgPT09IHRoaXMubGFzdFRyYWNrSW5kZXggJiYgdGhpcy5jb21iYXRQbGF5bGlzdC5sZW5ndGggPiAxKTtcclxuICAgICAgICB0aGlzLmxhc3RUcmFja0luZGV4ID0gaTtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVNdXRlKCkge1xyXG4gICAgICAgIHRoaXMuaXNNdXRlZCA9ICF0aGlzLmlzTXV0ZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tYmF0TXVzaWMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21iYXRNdXNpYy52b2x1bWUgPSB0aGlzLmlzTXV0ZWQgPyAwIDogdGhpcy52b2x1bWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm11dGVCdG4pIHtcclxuICAgICAgICAgICAgY29uc3QgaWNvbiA9IHRoaXMubXV0ZUJ0bi5xdWVyeVNlbGVjdG9yKCdpJyk7XHJcbiAgICAgICAgICAgIGlmIChpY29uKSB7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTmFtZSA9IHRoaXMuaXNNdXRlZCA/ICdmYXMgZmEtdm9sdW1lLW11dGUnIDogJ2ZhcyBmYS12b2x1bWUtdXAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnZvbHVtZVNsaWRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnZvbHVtZVNsaWRlci5kaXNhYmxlZCA9IHRoaXMuaXNNdXRlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2Z4U2xpZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Z4U2xpZGVyLmRpc2FibGVkID0gdGhpcy5pc011dGVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gU0ZYID09PVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJlLWxvYWQgYW5kIGNhY2hlIGFuIGF1ZGlvIGZpbGUsIHJldHVybnMgdGhlIGNhY2hlZCBBdWRpbyBjbG9uZSBmb3IgcGxheWJhY2suXHJcbiAgICAgKi9cclxuICAgIGxvYWRTZngocGF0aCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zZnhDYWNoZVtwYXRoXSkge1xyXG4gICAgICAgICAgICB0aGlzLnNmeENhY2hlW3BhdGhdID0gbmV3IEF1ZGlvKHBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zZnhDYWNoZVtwYXRoXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBsYXkgYSBzb3VuZCBlZmZlY3QgZm9yIGEgY2hhcmFjdGVyIGFjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzbHVnIC0gY2hhcmFjdGVyIHNsdWcgKGUuZy4gJ2NydXNhZGVyJywgJ3BsYWd1ZS1kb2N0b3InKVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNmeE5hbWUgLSBzb3VuZCBmaWxlIG5hbWUgKGUuZy4gJ2F0dGFja3NvdW5kJywgJ3NraWxsc291bmQnLCAnaGVhbCcpXHJcbiAgICAgKi9cclxuICAgIHBsYXlTZngoc2x1Zywgc2Z4TmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzTXV0ZWQgfHwgIXNsdWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgcGF0aCA9IGAvYXNzZXQvb3N0L3ZmeC8ke3NsdWd9LyR7c2Z4TmFtZX0ud2F2YDtcclxuICAgICAgICBjb25zdCBjYWNoZWQgPSB0aGlzLmxvYWRTZngocGF0aCk7XHJcblxyXG4gICAgICAgIC8vIENsb25lIHRoZSBhdWRpbyBub2RlIHNvIG92ZXJsYXBwaW5nIHBsYXlzIGRvbid0IGN1dCBlYWNoIG90aGVyIG9mZlxyXG4gICAgICAgIGNvbnN0IHNvdW5kID0gY2FjaGVkLmNsb25lTm9kZSgpO1xyXG4gICAgICAgIHNvdW5kLnZvbHVtZSA9IHRoaXMuc2Z4Vm9sdW1lO1xyXG4gICAgICAgIHNvdW5kLnBsYXkoKS5jYXRjaCgoKSA9PiB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQbGF5IHRoZSBhcHByb3ByaWF0ZSBTRlggZm9yIGEgY2hhcmFjdGVyIGdpdmVuIHRoZWlyIGtleSBhbmQgYWN0aW9uIHR5cGUuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gY2hhcmFjdGVyIGtleSAoZS5nLiAnRXF1aXBlIDEtQ3J1c2FkZXInKVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvbiAtICdhdHRhY2snLCAnc2tpbGwnLCBvciAnaGVhbCdcclxuICAgICAqL1xyXG4gICAgcGxheUNoYXJTZngoa2V5LCBhY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBzbHVnID0gdGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldO1xyXG4gICAgICAgIGlmICghc2x1ZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5U2Z4KHNsdWcsICdhdHRhY2tzb3VuZCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgLy8gVHJ5IGhlYWwud2F2IGZpcnN0LCBmYWxsYmFjayB0byBza2lsbHNvdW5kLndhdlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVySGFzSGVhbFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5U2Z4KHNsdWcsICdoZWFsJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVNmeChzbHVnLCAnc2tpbGxzb3VuZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NraWxsJzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVNmeChzbHVnLCAnc2tpbGxzb3VuZCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVBsYXlCdXR0b24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBsYXlCdG4pIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nICYmICF0aGlzLmlzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9ICdQYXVzZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9ICdUZXJtaW7DqSc7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gdGhpcy5jdXJyZW50SW5kZXggPiAwID8gJ1JlcHJlbmRyZScgOiAnTGFuY2VyJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEluaXRpYWxpc2VyIHF1YW5kIGxlIERPTSBlc3QgcHLDqnRcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IGNvbWJhdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1sb2dzXScpO1xyXG4gICAgaWYgKGNvbWJhdENvbnRhaW5lcikge1xyXG4gICAgICAgIG5ldyBDb21iYXRDb250cm9sbGVyKGNvbWJhdENvbnRhaW5lcik7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tYmF0Q29udHJvbGxlcjtcclxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgRlJJRU5EIFNZU1RFTVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LnRleHRDb250ZW50ID0gc3RyO1xyXG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1wYW5lbF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGJhZGdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1iYWRnZV0nKTtcclxuXHJcbiAgICBpZiAoIXRvZ2dsZSB8fCAhcGFuZWwpIHJldHVybjtcclxuXHJcbiAgICBsZXQgcGFuZWxPcGVuID0gZmFsc2U7XHJcbiAgICBsZXQgY3VycmVudFRhYiA9ICdmcmllbmRzJztcclxuICAgIGxldCBjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkID0gbnVsbDtcclxuICAgIGxldCBsYXN0TWVzc2FnZUlkID0gMDtcclxuICAgIGxldCBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgIGxldCB1bnJlYWRQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgbGV0IGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgIGxldCByZXF1ZXN0c0xvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gUEFORUwgT1BFTi9DTE9TRVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBvcGVuUGFuZWwoKSB7XHJcbiAgICAgICAgcGFuZWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwYW5lbC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBhbmVsLmNsYXNzTGlzdC5hZGQoJ2ZyaWVuZHMtcGFuZWwtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdmcmllbmRzLXBhbmVsX19iYWNrZHJvcC0tb3BlbicpO1xyXG4gICAgICAgIHBhbmVsT3BlbiA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICghZnJpZW5kc0xvYWRlZCkge1xyXG4gICAgICAgICAgICBsb2FkRnJpZW5kcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBhbmVsKCkge1xyXG4gICAgICAgIHBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZyaWVuZHMtcGFuZWwtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdmcmllbmRzLXBhbmVsX19iYWNrZHJvcC0tb3BlbicpO1xyXG4gICAgICAgIHBhbmVsT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBwYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcGFuZWxPcGVuID8gY2xvc2VQYW5lbCgpIDogb3BlblBhbmVsKCkpO1xyXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBhbmVsKTtcclxuICAgIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQYW5lbCk7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBUQUJTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZyaWVuZHMtdGFiXScpLmZvckVhY2godGFiQnRuID0+IHtcclxuICAgICAgICB0YWJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhYk5hbWUgPSB0YWJCdG4uZGF0YXNldC5mcmllbmRzVGFiO1xyXG4gICAgICAgICAgICBzd2l0Y2hUYWIodGFiTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzd2l0Y2hUYWIodGFiTmFtZSkge1xyXG4gICAgICAgIGN1cnJlbnRUYWIgPSB0YWJOYW1lO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mcmllbmRzLXRhYl0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdmcmllbmRzLXBhbmVsX190YWItLWFjdGl2ZScsIGJ0bi5kYXRhc2V0LmZyaWVuZHNUYWIgPT09IHRhYk5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWItY29udGVudF0nKS5mb3JFYWNoKGNvbnRlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBjb250ZW50LmRhdGFzZXQudGFiQ29udGVudCA9PT0gdGFiTmFtZSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX190YWJzJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fY29udGVudCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtY29udmVyc2F0aW9uXScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICh0YWJOYW1lID09PSAnZnJpZW5kcycgJiYgIWZyaWVuZHNMb2FkZWQpIGxvYWRGcmllbmRzKCk7XHJcbiAgICAgICAgaWYgKHRhYk5hbWUgPT09ICdyZXF1ZXN0cycgJiYgIXJlcXVlc3RzTG9hZGVkKSBsb2FkUmVxdWVzdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIExPQUQgRlJJRU5EUyBMSVNUXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGxvYWRGcmllbmRzKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRhYi1jb250ZW50PVwiZnJpZW5kc1wiXScpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+IENoYXJnZW1lbnQuLi48L2Rpdj4nO1xyXG5cclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvbGlzdCcsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5mcmllbmRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+PGkgY2xhc3M9XCJmYXMgZmEtZ2hvc3RcIj48L2k+IEF1Y3VuIGNvbXBhZ25vbi4uLiBMZSBkb25qb24gZXN0IHNvbGl0YWlyZS48L3A+JztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGRhdGEuZnJpZW5kcy5tYXAoZiA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIiBkYXRhLWZyaWVuZC11c2VyLWlkPVwiJHtmLnVzZXJJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2YucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChmLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKGYudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChmLnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3ByZXZpZXdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7Zi5sYXN0TWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKGYubGFzdE1lc3NhZ2UuaXNGcm9tTWUgPyAnVm91czogJyA6ICcnKSArIGVzY2FwZUh0bWwoZi5sYXN0TWVzc2FnZS5jb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ0F1Y3VuIG1lc3NhZ2UnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcmF0aW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke2YucmF0aW5nfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuZnJpZW5kLWl0ZW0nKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VySWQgPSBwYXJzZUludChpdGVtLmRhdGFzZXQuZnJpZW5kVXNlcklkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kLWl0ZW1fX25hbWUnKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuQ29udmVyc2F0aW9uKHVzZXJJZCwgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5FcnJldXIgZGUgY2hhcmdlbWVudDwvcD4nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTE9BRCBQRU5ESU5HIFJFUVVFU1RTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGxvYWRSZXF1ZXN0cygpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YWItY29udGVudD1cInJlcXVlc3RzXCJdJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gQ2hhcmdlbWVudC4uLjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy9wZW5kaW5nJywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgcmVxdWVzdHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXF1ZXN0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkF1Y3VuZSBkZW1hbmRlIGVuIGF0dGVudGU8L3A+JztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGRhdGEucmVxdWVzdHMubWFwKHIgPT4gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCIgZGF0YS1yZXF1ZXN0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke3IucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChyLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKHIudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChyLnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3ByZXZpZXdcIj4ke2VzY2FwZUh0bWwoci5kYXRlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLWFjY2VwdFwiIGRhdGEtYWNjZXB0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcmVqZWN0XCIgZGF0YS1yZWplY3QtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXNcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjY2VwdC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVxdWVzdChidG4uZGF0YXNldC5hY2NlcHRJZCwgJ2FjY2VwdCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJlamVjdC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVxdWVzdChidG4uZGF0YXNldC5yZWplY3RJZCwgJ3JlamVjdCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RXJyZXVyIGRlIGNoYXJnZW1lbnQ8L3A+JztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0KGZyaWVuZHNoaXBJZCwgYWN0aW9uKSB7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzLyR7YWN0aW9ufS8ke2ZyaWVuZHNoaXBJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxvYWRSZXF1ZXN0cygpO1xyXG4gICAgICAgICAgICAgICAgZmV0Y2hVbnJlYWRDb3VudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBTRUFSQ0ggVVNFUlNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXNlYXJjaC1pbnB1dF0nKTtcclxuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXNlYXJjaC1yZXN1bHRzXScpO1xyXG4gICAgbGV0IHNlYXJjaFRpbWVvdXQgPSBudWxsO1xyXG5cclxuICAgIGlmIChzZWFyY2hJbnB1dCkge1xyXG4gICAgICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc2VhcmNoVGltZW91dCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gc2VhcmNoSW5wdXQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZldGNoKGAvZnJpZW5kcy9zZWFyY2g/cT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeSl9YCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnVzZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+QXVjdW4gZ3VlcnJpZXIgdHJvdXZlPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gZGF0YS51c2Vycy5tYXAodSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpb25IdG1sID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ2FjY2VwdGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPkFtaTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAncGVuZGluZ19zZW50Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPkVudm95ZWU8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ3BlbmRpbmdfcmVjZWl2ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+UmVjdWU8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSBgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tYWRkXCIgZGF0YS1hZGQtZnJpZW5kLWlkPVwiJHt1LnVzZXJJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wbHVzXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dS5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKHUucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwodS51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKHUudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcmF0aW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke3UucmF0aW5nfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2FjdGlvbnNcIj4ke2FjdGlvbkh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hZGQtZnJpZW5kLWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kRnJpZW5kUmVxdWVzdChidG4uZGF0YXNldC5hZGRGcmllbmRJZCwgYnRuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kRnJpZW5kUmVxdWVzdCh1c2VySWQsIGJ0bikge1xyXG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL3JlcXVlc3QvJHt1c2VySWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5vdXRlckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5FbnZveWVlPC9zcGFuPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgYnRuLmRpc2FibGVkID0gZmFsc2U7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlcG9ydE1lc3NhZ2VBY3Rpb24obWVzc2FnZUlkLCBidG4pIHtcclxuICAgICAgICBjb25zdCByZWFzb24gPSBwcm9tcHQoJ1JhaXNvbiBkdSBzaWduYWxlbWVudCA6Jyk7XHJcbiAgICAgICAgaWYgKHJlYXNvbiA9PT0gbnVsbCkgcmV0dXJuOyAvLyBjYW5jZWxsZWRcclxuXHJcbiAgICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHttZXNzYWdlSWR9L3JlcG9ydGAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWFzb246IHJlYXNvbiB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2tcIj48L2k+JztcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdjaGF0LW1lc3NhZ2VfX3JlcG9ydC0tZG9uZScpO1xyXG4gICAgICAgICAgICAgICAgYnRuLnRpdGxlID0gJ1NpZ25hbGUnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IGJ0bi5kaXNhYmxlZCA9IGZhbHNlOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIENPTlZFUlNBVElPTlxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBvcGVuQ29udmVyc2F0aW9uKHVzZXJJZCwgdXNlcm5hbWUpIHtcclxuICAgICAgICBjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkID0gdXNlcklkO1xyXG4gICAgICAgIGxhc3RNZXNzYWdlSWQgPSAwO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fdGFicycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX2NvbnRlbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGNvbnN0IGNvbnZFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtY29udmVyc2F0aW9uXScpO1xyXG4gICAgICAgIGNvbnZFbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tbmFtZV0nKS50ZXh0Q29udGVudCA9IHVzZXJuYW1lO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tbWVzc2FnZXNdJyk7XHJcbiAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+IENoYXJnZW1lbnQuLi48L2Rpdj4nO1xyXG5cclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHt1c2VySWR9YCwge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgcmVuZGVyTWVzc2FnZXMoZGF0YS5tZXNzYWdlcywgZmFsc2UpO1xyXG4gICAgICAgICAgICBzdGFydE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyTWVzc2FnZXMobWVzc2FnZXMsIGFwcGVuZCkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tbWVzc2FnZXNdJyk7XHJcblxyXG4gICAgICAgIGlmICghYXBwZW5kKSB7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzRWwuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5EZWJ1dCBkZSBsYSBjb252ZXJzYXRpb24uIEVudm95ZXogbGUgcHJlbWllciBtZXNzYWdlITwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2kgb24gYWpvdXRlIGRlcyBtZXNzYWdlcyBldCBxdWUgbGUgY29udGVuZXVyIGFmZmljaGUgbGUgcGxhY2Vob2xkZXIsIGxlIHN1cHByaW1lclxyXG4gICAgICAgIGlmIChhcHBlbmQgJiYgbWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IG1lc3NhZ2VzRWwucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlcikgcGxhY2Vob2xkZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG1zZyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuaWQgPiBsYXN0TWVzc2FnZUlkKSBsYXN0TWVzc2FnZUlkID0gbXNnLmlkO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjaGF0LW1lc3NhZ2UnLCBtc2cuaXNGcm9tTWUgPyAnY2hhdC1tZXNzYWdlLS1taW5lJyA6ICdjaGF0LW1lc3NhZ2UtLXRoZWlycycpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcG9ydEJ0biA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoIW1zZy5pc0Zyb21NZSkge1xyXG4gICAgICAgICAgICAgICAgcmVwb3J0QnRuID0gYDxidXR0b24gY2xhc3M9XCJjaGF0LW1lc3NhZ2VfX3JlcG9ydFwiIGRhdGEtcmVwb3J0LW1zZy1pZD1cIiR7bXNnLmlkfVwiIHRpdGxlPVwiU2lnbmFsZXIgY2UgbWVzc2FnZVwiPjxpIGNsYXNzPVwiZmFzIGZhLWZsYWdcIj48L2k+PC9idXR0b24+YDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgICR7ZXNjYXBlSHRtbChtc2cuY29udGVudCl9XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoYXQtbWVzc2FnZV9fdGltZVwiPiR7ZXNjYXBlSHRtbChtc2cuZGF0ZSl9ICR7cmVwb3J0QnRufTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgIC8vIEF0dGFjaCByZXBvcnQgaGFuZGxlclxyXG4gICAgICAgICAgICBjb25zdCByZXBvcnRFbCA9IGRpdi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXBvcnQtbXNnLWlkXScpO1xyXG4gICAgICAgICAgICBpZiAocmVwb3J0RWwpIHtcclxuICAgICAgICAgICAgICAgIHJlcG9ydEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydE1lc3NhZ2VBY3Rpb24ocmVwb3J0RWwuZGF0YXNldC5yZXBvcnRNc2dJZCwgcmVwb3J0RWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzRWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbWVzc2FnZXNFbC5zY3JvbGxUb3AgPSBtZXNzYWdlc0VsLnNjcm9sbEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZW5kIG1lc3NhZ2VcclxuICAgIGNvbnN0IHNlbmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tc2VuZF0nKTtcclxuICAgIGNvbnN0IGlucHV0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24taW5wdXRdJyk7XHJcblxyXG4gICAgaWYgKHNlbmRCdG4gJiYgaW5wdXRFbCkge1xyXG4gICAgICAgIHNlbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZW5kTWVzc2FnZSk7XHJcbiAgICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBzZW5kTWVzc2FnZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBpbnB1dEVsLnZhbHVlLnRyaW0oKTtcclxuICAgICAgICBpZiAoIWNvbnRlbnQgfHwgIWN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaW5wdXRFbC52YWx1ZSA9ICcnO1xyXG5cclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHtjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjb250ZW50OiBjb250ZW50IH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyAmJiBkYXRhLm1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKFtkYXRhLm1lc3NhZ2VdLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJhY2sgYnV0dG9uXHJcbiAgICBjb25zdCBiYWNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLWJhY2tdJyk7XHJcbiAgICBpZiAoYmFja0J0bikge1xyXG4gICAgICAgIGJhY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSBudWxsO1xyXG4gICAgICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzd2l0Y2hUYWIoJ2ZyaWVuZHMnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIE1FU1NBR0UgUE9MTElORyAoZXZlcnkgNXMgd2hlbiBjb252ZXJzYXRpb24gb3BlbilcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gc3RhcnRNZXNzYWdlUG9sbGluZygpIHtcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke2N1cnJlbnRDb252ZXJzYXRpb25Vc2VySWR9P2FmdGVySWQ9JHtsYXN0TWVzc2FnZUlkfWAsIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubWVzc2FnZXMgJiYgZGF0YS5tZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTWVzc2FnZXMoZGF0YS5tZXNzYWdlcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDUwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3BNZXNzYWdlUG9sbGluZygpIHtcclxuICAgICAgICBpZiAobWVzc2FnZVBvbGxpbmdJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBVTlJFQUQgQ09VTlQgUE9MTElORyAoZXZlcnkgMzBzLCBhbHdheXMgYWN0aXZlKVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBmZXRjaFVucmVhZENvdW50KCkge1xyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy91bnJlYWQtY291bnQnLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS50b3RhbCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnRleHRDb250ZW50ID0gZGF0YS50b3RhbDtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RzQmFkZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXF1ZXN0cy1iYWRnZV0nKTtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3RzQmFkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnBlbmRpbmdSZXF1ZXN0cyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnRleHRDb250ZW50ID0gZGF0YS5wZW5kaW5nUmVxdWVzdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHt9KTtcclxuICAgIH1cclxuXHJcbiAgICBmZXRjaFVucmVhZENvdW50KCk7XHJcbiAgICB1bnJlYWRQb2xsaW5nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmZXRjaFVucmVhZENvdW50LCAzMDAwMCk7XHJcbn0pO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiZXNjYXBlSHRtbCIsInN0ciIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY3JlYXRlVGV4dE5vZGUiLCJpbm5lckhUTUwiLCJhZGRFdmVudExpc3RlbmVyIiwiYnVyZ2VyIiwicXVlcnlTZWxlY3RvciIsIm5hdiIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIlNUQVRfTUFYIiwiZG1nIiwic3BlZWQiLCJkb2RnZSIsImNyaXQiLCJocCIsInBvcnRyYWl0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkZXRhaWxzIiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3RlZExpc3QiLCJsYXVuY2hCdG4iLCJsZW5ndGgiLCJtYXhTZWxlY3Rpb24iLCJzZWxlY3RlZEhlcm9lcyIsInNlbGVjdGVkSGVyb0lkcyIsImdldENhdGVnb3J5IiwicG9ydHJhaXQiLCJkYXRhc2V0IiwiY2F0ZWdvcnkiLCJnZXRTZWxlY3RlZFJvbGVzIiwicm9sZXMiLCJUYW5rIiwiRFBTIiwiSGVhbGVyIiwiU3VwcG9ydCIsImZvckVhY2giLCJpZCIsInAiLCJBcnJheSIsImZyb20iLCJmaW5kIiwicHAiLCJjYXQiLCJjYW5TZWxlY3RSb2xlIiwicG9ydHJhaXRFbCIsInJlbW92ZSIsImFkZCIsIm5hbWUiLCJyb2xlIiwiZG1nTWluIiwiTnVtYmVyIiwiZG1nTWF4Iiwic3ByaXRlRmlsZSIsInNwcml0ZSIsImFiaWxpdHlOYW1lIiwiYWJpbGl0eURlc2MiLCJhYmlsaXR5Q2QiLCJzcHJpdGVQYXRoIiwiY29uY2F0IiwiaXNTZWxlY3RlZCIsImluY2x1ZGVzIiwiYWJpbGl0eUh0bWwiLCJjaGFyU3luZXJnaWVzIiwic3luZXJneU1hcCIsInN5bmVyZ3lIdG1sIiwibWFwIiwicyIsInBhcnRuZXIiLCJkZXNjIiwiam9pbiIsIk1hdGgiLCJtaW4iLCJidG5SaWdodCIsInJvbGVDYXQiLCJhbHJlYWR5U2VsZWN0ZWQiLCJkaXNhYmxlZCIsInRleHRDb250ZW50IiwiZmlsdGVyIiwiaGlkIiwiaCIsImFsZXJ0IiwicHVzaCIsInVwZGF0ZVNlbGVjdGVkVGVhbSIsInRlYW1zUGFnZUVsIiwiSlNPTiIsInBhcnNlIiwiaGVybyIsImhlcm9FbCIsInVwZGF0ZVJvbGVJbmRpY2F0b3JzIiwidXBkYXRlU3luZXJneUhpZ2hsaWdodHMiLCJ0ZWFtQ29tcGxldGUiLCJiYWRnZSIsInNlbGVjdGVkTmFtZXMiLCJCb29sZWFuIiwiYWN0aXZlU3luZXJnaWVzIiwic2VlblBhaXJzIiwiU2V0Iiwic3luZXJnaWVzIiwic3luIiwicGFpcktleSIsInNvcnQiLCJoYXMiLCJuYW1lMSIsIm5hbWUyIiwic3luZXJneU5hbWUiLCJwTmFtZSIsIm1hdGNoaW5nIiwiY2xhc3NOYW1lIiwidGl0bGUiLCJ1cGRhdGVTeW5lcmd5RGlzcGxheSIsImNvbnRhaW5lciIsImFjdGlvbnMiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiaW5kaWNhdG9yIiwic2xvdCIsInNhdmVQcmVzZXRCdG4iLCJwcmVzZXRNb2RhbCIsInByZXNldE5hbWVJbnB1dCIsInByZXNldENvbmZpcm1CdG4iLCJwcmVzZXRDYW5jZWxCdG4iLCJ1cGRhdGVTYXZlUHJlc2V0QnRuIiwib3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0iLCJfb3JpZ1VwZGF0ZSIsIl9vcmlnUm9sZUluZGljYXRvcnMiLCJ2YWx1ZSIsInN0eWxlIiwiZGlzcGxheSIsInNldFRpbWVvdXQiLCJmb2N1cyIsInRyaW0iLCJib3JkZXJDb2xvciIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJzdHJpbmdpZnkiLCJjaGFyYWN0ZXJJZHMiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJzdWNjZXNzIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJlcnJvciIsImUiLCJrZXkiLCJjbGljayIsImxvYWRQcmVzZXQiLCJpZFN0ciIsIlN0cmluZyIsImRlbGV0ZVByZXNldCIsInByZXNldElkIiwiY2hpcEVsIiwiY29uZmlybSIsImxpc3QiLCJjaGlsZHJlbiIsIl9kb2N1bWVudCRxdWVyeVNlbGVjdCIsImNoaXAiLCJjaGFySWRzIiwicHJlc2V0SWRzIiwic3RvcFByb3BhZ2F0aW9uIiwic2VsZWN0ZWRMaXN0T2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsImkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJyZXNwb25zZSIsInJlZGlyZWN0ZWQiLCJocmVmIiwidXJsIiwicG9wdXAiLCJiYWNrZHJvcCIsImNsb3NlQnRuIiwiY29udGVudCIsImxvYWRlZCIsIm9wZW5Qb3B1cCIsIm9mZnNldEhlaWdodCIsImZldGNoUHJvZmlsZSIsImNsb3NlUG9wdXAiLCJyZW5kZXJQcm9maWxlIiwicmVzdWx0Q2xhc3MiLCJyIiwicmVzdWx0TGFiZWwiLCJhdmF0YXJIdG1sIiwicHJvZmlsZUltYWdlIiwidXNlcm5hbWUiLCJodG1sIiwibW90dG8iLCJiaW8iLCJyYXRpbmciLCJzdGF0cyIsIndpbnMiLCJsb3NzZXMiLCJ3aW5SYXRlIiwiZmF2b3JpdGVDaGFyYWN0ZXIiLCJnYW1lc1BsYXllZCIsImxhc3RUZWFtIiwiYyIsInJlY2VudEJhdHRsZXMiLCJiIiwicGFyc2VJbnQiLCJyZXN1bHQiLCJvcHBvbmVudCIsIm1hdGNoVHlwZSIsInRvVXBwZXJDYXNlIiwiZGF0ZSIsIkNvbWJhdENvbnRyb2xsZXIiLCJfY2xhc3NDYWxsQ2hlY2siLCJsb2dzIiwiY3VycmVudEluZGV4IiwiaXNQbGF5aW5nIiwiaXNQYXVzZWQiLCJjaGFyYWN0ZXJFbGVtZW50cyIsImNoYXJhY3Rlck1heEhQIiwiaW5pdCIsIl9jcmVhdGVDbGFzcyIsIl90aGlzIiwibG9nc0RhdGEiLCJjb21iYXRMb2dzIiwiY29uc29sZSIsImxvZ0NvbnRhaW5lciIsIm92ZXJsYXkiLCJwbGF5QnRuIiwic2tpcEJ0biIsInNwZWVkQnRucyIsImNoYXJhY3RlclNsdWdzIiwiY2hhcmFjdGVySGFzSGVhbCIsImFiaWxpdHlDb29sZG93bnMiLCJjaGFyYWN0ZXJTdGF0dXNlcyIsImVsIiwiY2hhcmFjdGVyTmFtZSIsInRlYW0iLCJjaGFyYWN0ZXJUZWFtIiwiY2hhcmFjdGVyU2x1ZyIsImhhc0hlYWwiLCJocFRleHQiLCJtYXRjaCIsImNyZWF0ZUVtcHR5U3RhdHVzZXMiLCJhYmlsaXR5RWxlbWVudHMiLCJjaGFyTmFtZSIsImNoYXJUZWFtIiwiYWJpbGl0eUVsIiwibWF4Q2QiLCJhYmlsaXR5TWF4Q2QiLCJuYW1lRWwiLCJpY29uRWwiLCJvcGFjaXR5IiwiYXVkaW9VbmxvY2tlZCIsImNvbWJhdE11c2ljIiwibGFzdFRyYWNrSW5kZXgiLCJpc011dGVkIiwidm9sdW1lIiwic2Z4Vm9sdW1lIiwiY29tYmF0UGxheWxpc3QiLCJzZnhDYWNoZSIsIm11dGVCdG4iLCJ2b2x1bWVTbGlkZXIiLCJzZnhTbGlkZXIiLCJiaW5kRXZlbnRzIiwicGxheSIsImJsZWVkaW5nIiwiYmxpZ2h0ZWQiLCJzdHVubmVkIiwibWFya2VkIiwic3RlYWx0aGVkIiwicmlwb3N0ZSIsImRtZ1VwIiwic3BkVXAiLCJkb2RnZVVwIiwiY3JpdFVwIiwidXBkYXRlQ2hhcmFjdGVyU3RhdHVzZXMiLCJsb2ciLCJ0eXBlIiwidGlja1JvdW5kU3RhdHVzZXMiLCJoYW5kbGVBYmlsaXR5U3RhdHVzQ2hhbmdlIiwic2V0U3RhdHVzIiwidGFyZ2V0IiwidGFyZ2V0VGVhbSIsImR1cmF0aW9uIiwidHVybnNSZW1haW5pbmciLCJ1bmRlZmluZWQiLCJhdHRhY2tlciIsImF0dGFja2VyVGVhbSIsImhhbmRsZVN5bmVyZ3lTdGF0dXNDaGFuZ2UiLCJjbGVhckFsbFN0YXR1c2VzIiwicmVuZGVyQWxsU3RhdHVzSWNvbnMiLCJzdWJ0eXBlIiwiYmxlZWRUdXJucyIsImFsbEhpdHMiLCJwcmltYXJ5IiwiaXNQcmltYXJ5IiwiYmxpZ2h0VHVybnMiLCJtYXJrVHVybnMiLCJjYXN0ZXIiLCJjYXN0ZXJUZWFtIiwicmlwb3N0ZVR1cm5zIiwiYXBwbHlCdWZmU3RhdHVzZXMiLCJidWZmcyIsImJ1ZmZEdXJhdGlvbiIsImFwcGx5VGVhbUJ1ZmZTdGF0dXNlcyIsInN0ZWFsdGhUdXJucyIsInByb3RlY3RUdXJucyIsInNlbGZCbGVlZFR1cm5zIiwidEtleSIsIl90aGlzMiIsImVmZmVjdFR5cGUiLCJwYXJ0bmVyQ2hhciIsInBhcnRuZXJDaGFyVGVhbSIsImdyYW50ZWRUdXJucyIsImJ1ZmZUeXBlcyIsInN0YXR1c0tleSIsImJ1ZmZUeXBlVG9TdGF0dXNLZXkiLCJkb2RnZUR1cmF0aW9uIiwiZXh0cmFUdXJucyIsInRlYW1OYW1lIiwiZGFtYWdlIiwibWF4IiwiX2kiLCJfT2JqZWN0JGtleXMiLCJPYmplY3QiLCJrZXlzIiwic3RhcnRzV2l0aCIsIl9pMiIsIl9PYmplY3Qka2V5czIiLCJfaTMiLCJfT2JqZWN0JGtleXMzIiwicmVuZGVyU3RhdHVzSWNvbnMiLCJpY29ucyIsImljb24iLCJjbHMiLCJfdGhpczMiLCJ0b2dnbGVQbGF5Iiwic2tpcCIsImJ0biIsInNldFNwZWVkIiwidG9nZ2xlTXV0ZSIsInBhcnNlRmxvYXQiLCJwbGF5TmV4dFRyYWNrIiwib25jZSIsInVwZGF0ZVBsYXlCdXR0b24iLCJwcm9jZXNzTmV4dExvZyIsInBhdXNlIiwiZGlzcGxheUxvZyIsInVwZGF0ZUhlYWx0aEJhcnMiLCJ0cmFja0FiaWxpdHlDb29sZG93bnMiLCJhbmltYXRlRGVhdGgiLCJ0YXJnZXRIUCIsInNob3dWaWN0b3J5T3ZlcmxheSIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsImNvbWJhdFNwZWVkIiwiX3RoaXM0IiwicHJvY2Vzc0xvZyIsImRlbGF5IiwiZ2V0RGVsYXlGb3JMb2ciLCJnZXRBYmlsaXR5RGVsYXkiLCJnZXRTeW5lcmd5VHJpZ2dlckRlbGF5IiwiX3RoaXM1IiwicGxheUFuaW1hdGlvbiIsImhwRGVsYXkiLCJnZXRIUFVwZGF0ZURlbGF5IiwiYWJpbGl0eURhdGEiLCJ1cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5IiwiY2QiLCJnZXRBYmlsaXR5SFBEZWxheSIsImFuaW1hdGVBdHRhY2siLCJpc0NyaXQiLCJhbmltYXRlSGVhbCIsImhlYWxlciIsImhlYWxlclRlYW0iLCJhbmltYXRlRGVmZW5kIiwiZGVmZW5kZXIiLCJkZWZlbmRlclRlYW0iLCJhbmltYXRlRG9kZ2UiLCJhbmltYXRlRG9UIiwiYW5pbWF0ZVN0dW5uZWQiLCJwbGF5QWJpbGl0eUFuaW1hdGlvbiIsImFuaW1hdGVTeW5lcmd5QW5ub3VuY2UiLCJhbmltYXRlU3luZXJneVRyaWdnZXIiLCJ0YXJnZXROYW1lIiwiZG90Q2xhc3MiLCJnZXRDaGFyYWN0ZXJFbGVtZW50IiwiYW5pbWF0ZU1hcmtlZCIsImFuaW1hdGVCdWZmIiwiYW5pbWF0ZVN0ZWFsdGgiLCJfdGhpczYiLCJibGlnaHRLZXkiLCJzd2FwU3ByaXRlIiwicGxheUNoYXJTZngiLCJjYXN0ZXJFbCIsIm1hcmtLZXkiLCJyaXBvc3RlS2V5Iiwic2VsZkJ1ZmZLZXkiLCJwYXJ0eUhlYWxLZXkiLCJoZWFsZWQiLCJwYXJ0eUJ1ZmZLZXkiLCJhbmltYXRlVGVhbUJ1ZmYiLCJzdGVhbHRoS2V5IiwiZW1lcmdIZWFsS2V5IiwicHJvdERvZGdlS2V5IiwiX3RoaXM3IiwidHJpZ2dlciIsInRyaWdnZXJDaGFyIiwiZHJhd1N5bmVyZ3lMaW5rIiwiX3RoaXM4IiwidHJpZ2dlckNoYXJUZWFtIiwicGFydG5lcktleSIsImVsMSIsImVsMiIsInN0YWdlIiwiZXhpc3RpbmdTdmciLCJzdmciLCJjcmVhdGVFbGVtZW50TlMiLCJzZXRBdHRyaWJ1dGUiLCJzdGFnZVJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyZWN0MSIsInJlY3QyIiwieDEiLCJsZWZ0Iiwid2lkdGgiLCJ5MSIsInRvcCIsImhlaWdodCIsIngyIiwieTIiLCJsaW5lIiwic3ByaXRlTmFtZSIsIl90aGlzOSIsInNsdWciLCJpbWciLCJzcmMiLCJjb250YWlucyIsImF0dGFja2VyTmFtZSIsImhlYWxlck5hbWUiLCJkZWZlbmRlck5hbWUiLCJlbnRyeSIsIm1lc3NhZ2UiLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJjdXJyZW50SFAiLCJtYXhIUCIsInRhcmdldE1heEhQIiwidXBkYXRlQWJpbGl0eUhlYWx0aEJhcnMiLCJ1cGRhdGVDaGFyYWN0ZXJIUCIsIl90aGlzMCIsIm1heEhwIiwicGVyY2VudCIsImhwQmFyIiwidHJhbnNpdGlvbiIsInVwZGF0ZUluZm9QYW5lbCIsInBhbmVsQ2xhc3MiLCJwYW5lbCIsImNoYXJhY3RlckluZm9zIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsIl9sb29wIiwiaW5mbyIsInN0YXRzU3BhbiIsIm4iLCJkb25lIiwiZXJyIiwiZiIsIl90aGlzMSIsImZpbmFsaXplUmF0aW5nIiwiX3RoaXMxMCIsImZpbmFsaXplVXJsIiwicmF0aW5nQ2hhbmdlIiwic2hvd1JhdGluZ1VwZGF0ZSIsIm5ld1JhdGluZyIsIm5ld1JhdGluZzIiLCJjaGFuZ2UiLCJyYXRpbmdFbCIsInJhdGluZ0VsMiIsIndpbm5lckRpdiIsIm5vdGlmMSIsImNzc1RleHQiLCJjb2xvciIsImNoYW5nZTIiLCJub3RpZjIiLCJfdGhpczExIiwiaWR4IiwiZ2V0UmFuZG9tVHJhY2tJbmRleCIsIkF1ZGlvIiwiZmxvb3IiLCJyYW5kb20iLCJsb2FkU2Z4IiwicGF0aCIsInBsYXlTZngiLCJzZnhOYW1lIiwiY2FjaGVkIiwic291bmQiLCJjbG9uZU5vZGUiLCJhY3Rpb24iLCJjb21iYXRDb250YWluZXIiLCJwYW5lbE9wZW4iLCJjdXJyZW50VGFiIiwiY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCIsImxhc3RNZXNzYWdlSWQiLCJtZXNzYWdlUG9sbGluZ0ludGVydmFsIiwidW5yZWFkUG9sbGluZ0ludGVydmFsIiwiZnJpZW5kc0xvYWRlZCIsInJlcXVlc3RzTG9hZGVkIiwib3BlblBhbmVsIiwibG9hZEZyaWVuZHMiLCJjbG9zZVBhbmVsIiwic3RvcE1lc3NhZ2VQb2xsaW5nIiwidGFiQnRuIiwidGFiTmFtZSIsImZyaWVuZHNUYWIiLCJzd2l0Y2hUYWIiLCJ0YWJDb250ZW50IiwibG9hZFJlcXVlc3RzIiwiZnJpZW5kcyIsInVzZXJJZCIsImxhc3RNZXNzYWdlIiwiaXNGcm9tTWUiLCJpdGVtIiwiZnJpZW5kVXNlcklkIiwib3BlbkNvbnZlcnNhdGlvbiIsInJlcXVlc3RzIiwiZnJpZW5kc2hpcElkIiwiaGFuZGxlUmVxdWVzdCIsImFjY2VwdElkIiwicmVqZWN0SWQiLCJmZXRjaFVucmVhZENvdW50Iiwic2VhcmNoSW5wdXQiLCJzZWFyY2hSZXN1bHRzIiwic2VhcmNoVGltZW91dCIsImNsZWFyVGltZW91dCIsInF1ZXJ5IiwidXNlcnMiLCJ1IiwiYWN0aW9uSHRtbCIsImZyaWVuZFN0YXR1cyIsInNlbmRGcmllbmRSZXF1ZXN0IiwiYWRkRnJpZW5kSWQiLCJvdXRlckhUTUwiLCJyZXBvcnRNZXNzYWdlQWN0aW9uIiwibWVzc2FnZUlkIiwicmVhc29uIiwicHJvbXB0IiwiY29udkVsIiwibWVzc2FnZXNFbCIsInJlbmRlck1lc3NhZ2VzIiwibWVzc2FnZXMiLCJzdGFydE1lc3NhZ2VQb2xsaW5nIiwiYXBwZW5kIiwicGxhY2Vob2xkZXIiLCJtc2ciLCJyZXBvcnRCdG4iLCJyZXBvcnRFbCIsInJlcG9ydE1zZ0lkIiwic2VuZEJ0biIsImlucHV0RWwiLCJzZW5kTWVzc2FnZSIsImJhY2tCdG4iLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ0b3RhbCIsInJlcXVlc3RzQmFkZ2UiLCJwZW5kaW5nUmVxdWVzdHMiXSwic291cmNlUm9vdCI6IiJ9