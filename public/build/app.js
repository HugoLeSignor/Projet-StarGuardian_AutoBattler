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
      this.combatPlaylist = ['/asset/audio/combat/butchersboulevardmusic.mp3', '/asset/audio/combat/combatintheruins.mp3'];
      this.muteBtn = this.container.querySelector('[data-audio-mute]');
      this.volumeSlider = this.container.querySelector('[data-audio-volume]');

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
            this.animateBuff(log.caster, log.casterTeam);
          }
          if (log.target && log.targetTeam) this.animateMarked(log.target, log.targetTeam);
          break;
        case 'riposte_buff':
          if (log.caster && log.casterTeam) {
            var riposteKey = "".concat(log.casterTeam, "-").concat(log.caster);
            this.swapSprite(riposteKey, 'skill.webp', 1400);
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
            this.animateBuff(log.caster, log.casterTeam);
          }
          break;
        case 'party_heal':
          if (log.caster && log.casterTeam) {
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
            this.animateBuff(log.caster, log.casterTeam);
          }
          // Animer tous les alliés du même côté
          this.animateTeamBuff(log.casterTeam);
          break;
        case 'stealth':
          if (log.caster && log.casterTeam) {
            var stealthKey = "".concat(log.casterTeam, "-").concat(log.caster);
            this.swapSprite(stealthKey, 'skill.webp', 1400);
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
            this.animateHeal(log.caster, log.casterTeam, log.caster, log.casterTeam);
          }
          break;
        case 'protect_dodge':
          if (log.caster && log.casterTeam) this.animateDefend(log.caster, log.casterTeam);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LEdBQUd6aUIsUUFBUSxDQUFDTyxhQUFhLENBQUMsdUJBQXVCLENBQUM7TUFDckUsSUFBSWtpQixhQUFhLEVBQUU7UUFDZixJQUFJMVosSUFBSSxDQUFDMlosZUFBZSxHQUFHLENBQUMsRUFBRTtVQUMxQkQsYUFBYSxDQUFDM2QsV0FBVyxHQUFHaUUsSUFBSSxDQUFDMlosZUFBZTtVQUNoREQsYUFBYSxDQUFDemEsS0FBSyxDQUFDQyxPQUFPLEdBQUcsY0FBYztRQUNoRCxDQUFDLE1BQU07VUFDSHdhLGFBQWEsQ0FBQ3phLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07UUFDeEM7TUFDSjtJQUNKLENBQUMsQ0FBQyxTQUNJLENBQUMsWUFBTSxDQUFDLENBQUMsQ0FBQztFQUNwQjtFQUVBcVksZ0JBQWdCLENBQUMsQ0FBQztFQUNsQjFCLHFCQUFxQixHQUFHMEQsV0FBVyxDQUFDaEMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDO0FBQ2hFLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7Ozs7QUN0ZkY7Ozs7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2NvbWJhdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZnJpZW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5jc3M/MmRjOSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcclxuICovXHJcbmltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnO1xyXG5pbXBvcnQgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzJztcclxuaW1wb3J0ICcuL2pzL2NvbWJhdC5qcyc7XHJcbmltcG9ydCAnLi9qcy9mcmllbmRzLmpzJztcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgVVRJTElUQUlSRSBTRUNVUklURSBYU1NcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xyXG4gICAgaWYgKCFzdHIpIHJldHVybiAnJztcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cikpO1xyXG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgTUVOVSBCVVJHRVJcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBidXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1cmdlclwiKTtcclxuICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1uYXZpZ2F0aW9uXCIpO1xyXG5cclxuICAgIGlmIChidXJnZXIgJiYgbmF2KSB7XHJcbiAgICAgICAgYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQQUdFIFRFQU1TIChDT1JSSUfDiUUpXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKiDwn5SnIE1BWCBERVMgU1RBVFMgKGFkYXB0ZXIgw6AgdGEgQkREIC8gw6lxdWlsaWJyYWdlKSAqL1xyXG5jb25zdCBTVEFUX01BWCA9IHtcclxuICAgIGRtZzogMzAsXHJcbiAgICBzcGVlZDogMTIsXHJcbiAgICBkb2RnZTogNDAsXHJcbiAgICBjcml0OiAxNSxcclxuICAgIGhwOiA3NVxyXG59O1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHBvcnRyYWl0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFtLXBvcnRyYWl0Jyk7XHJcbiAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlYW1EZXRhaWxzJyk7XHJcbiAgICBjb25zdCBzZWxlY3RlZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGlzdCcpO1xyXG4gICAgY29uc3QgbGF1bmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1sYXVuY2gnKTtcclxuXHJcbiAgICBpZiAoIWRldGFpbHMgfHwgcG9ydHJhaXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG1heFNlbGVjdGlvbiA9IDQ7XHJcbiAgICBsZXQgc2VsZWN0ZWRIZXJvZXMgPSBbXTtcclxuICAgIGxldCBzZWxlY3RlZEhlcm9JZHMgPSBbXTtcclxuXHJcbiAgICAvLyBDb21wb3NpdGlvbiBvYmxpZ2F0b2lyZSA6IDEgVGFuaywgMSBEUFMsIDEgSGVhbGVyLCAxIFN1cHBvcnRcclxuICAgIC8vIExhIGNhdGVnb3JpZSB2aWVudCBkaXJlY3RlbWVudCBkdSBkYXRhLWNhdGVnb3J5IChjYWxjdWxlIGNvdGUgc2VydmV1cilcclxuICAgIGZ1bmN0aW9uIGdldENhdGVnb3J5KHBvcnRyYWl0KSB7XHJcbiAgICAgICAgcmV0dXJuIHBvcnRyYWl0LmRhdGFzZXQuY2F0ZWdvcnkgfHwgJ1N1cHBvcnQnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkUm9sZXMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSB7IFRhbms6IDAsIERQUzogMCwgSGVhbGVyOiAwLCBTdXBwb3J0OiAwIH07XHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocHAgPT4gcHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAocCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2F0ID0gZ2V0Q2F0ZWdvcnkocCk7XHJcbiAgICAgICAgICAgICAgICByb2xlc1tjYXRdKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcm9sZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FuU2VsZWN0Um9sZShwb3J0cmFpdEVsKSB7XHJcbiAgICAgICAgY29uc3QgY2F0ID0gZ2V0Q2F0ZWdvcnkocG9ydHJhaXRFbCk7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzW2NhdF0gPCAxO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcnRyYWl0cy5mb3JFYWNoKHBvcnRyYWl0ID0+IHtcclxuICAgICAgICBwb3J0cmFpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHBvcnRyYWl0LmRhdGFzZXQuaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwb3J0cmFpdC5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGUgPSBwb3J0cmFpdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01pbiA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01pbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01heCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01heCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuc3BlZWQpO1xyXG4gICAgICAgICAgICBjb25zdCBkb2RnZSA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRvZGdlKTtcclxuICAgICAgICAgICAgY29uc3QgY3JpdCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmNyaXQpO1xyXG4gICAgICAgICAgICBjb25zdCBocCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmhwKTtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlRmlsZSA9IHBvcnRyYWl0LmRhdGFzZXQuc3ByaXRlO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5TmFtZSA9IHBvcnRyYWl0LmRhdGFzZXQuYWJpbGl0eU5hbWUgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlEZXNjID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5RGVzYyB8fCAnJztcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUNkID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5Q2QgfHwgJyc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7c3ByaXRlRmlsZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlIdG1sID0gYWJpbGl0eU5hbWUgPyBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFiaWxpdHktc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZpcmUtYWx0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX25hbWVcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eU5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19jZFwiPjxpIGNsYXNzPVwiZmFzIGZhLWhvdXJnbGFzcy1oYWxmXCI+PC9pPiAke2VzY2FwZUh0bWwoYWJpbGl0eUNkKX1UPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX2Rlc2NcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eURlc2MpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCA6ICcnO1xyXG5cclxuICAgICAgICAgICAgLy8gQnVpbGQgc3luZXJneSBpbmZvIGZvciB0aGlzIGNoYXJhY3RlclxyXG4gICAgICAgICAgICBjb25zdCBjaGFyU3luZXJnaWVzID0gc3luZXJneU1hcFtuYW1lXSB8fCBbXTtcclxuICAgICAgICAgICAgbGV0IHN5bmVyZ3lIdG1sID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChjaGFyU3luZXJnaWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHN5bmVyZ3lIdG1sID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvbl9faGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1saW5rXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25fX3RpdGxlXCI+U3luZXJnaWVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtjaGFyU3luZXJnaWVzLm1hcChzID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25fX2l0ZW0gJHtzZWxlY3RlZEhlcm9lcy5pbmNsdWRlcyhzLnBhcnRuZXIpID8gJ3N5bmVyZ3ktc2VjdGlvbl9faXRlbS0tYWN0aXZlJyA6ICcnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1zZWN0aW9uX19wYXJ0bmVyXCI+JHtlc2NhcGVIdG1sKHMucGFydG5lcil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1zZWN0aW9uX19zbmFtZVwiPiR7ZXNjYXBlSHRtbChzLm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvbl9fZGVzY1wiPiR7ZXNjYXBlSHRtbChzLmRlc2MpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRldGFpbHMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYW0tZGV0YWlscy1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPiR7bmFtZX08L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicm9sZVwiPiR7cm9sZX08L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnaWYtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzcHJpdGVQYXRofVwiIGFsdD1cIlNwcml0ZSBkZSAke25hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE1HPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWRtZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoZG1nTWF4IC8gU1RBVF9NQVguZG1nKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZG1nTWlufSAtICR7ZG1nTWF4fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VklUPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLXNwZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoc3BlZWQgLyBTVEFUX01BWC5zcGVlZCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke3NwZWVkfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE9ER0U8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tZG9kZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGRvZGdlIC8gU1RBVF9NQVguZG9kZ2UpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkb2RnZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNSSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tY3JpdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoY3JpdCAvIFNUQVRfTUFYLmNyaXQpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtjcml0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+SFA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0taHBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGhwIC8gU1RBVF9NQVguaHApICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtocH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAke2FiaWxpdHlIdG1sfVxyXG4gICAgICAgICAgICAgICAgICAgICR7c3luZXJneUh0bWx9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tc2VsZWN0LXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7aXNTZWxlY3RlZCA/ICdEw6lzw6lsZWN0aW9ubmVyJyA6ICdTw6lsZWN0aW9ubmVyJ31cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYnRuUmlnaHQgPSBkZXRhaWxzLnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2VsZWN0LXJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVDYXQgPSBnZXRDYXRlZ29yeShwb3J0cmFpdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscmVhZHlTZWxlY3RlZCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEw6lzYWN0aXZlciBsZSBib3V0b24gc2kgbGUgc2xvdCBkZSBjZSByw7RsZSBlc3QgZMOpasOgIHByaXNcclxuICAgICAgICAgICAgaWYgKCFhbHJlYWR5U2VsZWN0ZWQgJiYgIWNhblNlbGVjdFJvbGUocG9ydHJhaXQpKSB7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IGBTbG90ICR7cm9sZUNhdH0gZMOpasOgIHByaXNgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzID0gc2VsZWN0ZWRIZXJvSWRzLmZpbHRlcihoaWQgPT4gaGlkICE9PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBzZWxlY3RlZEhlcm9lcy5maWx0ZXIoaCA9PiBoICE9PSBuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhblNlbGVjdFJvbGUocG9ydHJhaXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGBWb3VzIGF2ZXogZMOpasOgIHVuICR7cm9sZUNhdH0gZGFucyB2b3RyZSDDqXF1aXBlICFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCA+PSBtYXhTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJWb3VzIHBvdXZleiBzw6lsZWN0aW9ubmVyIG1heGltdW0gNCBwZXJzb25uYWdlcyAhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcy5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcy5wdXNoKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0ZWRUZWFtKCk7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZClcclxuICAgICAgICAgICAgICAgICAgICA/ICdEw6lzw6lsZWN0aW9ubmVyJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogJ1PDqWxlY3Rpb25uZXInO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyA9PT0gU1lORVJHWSBTWVNURU0gPT09XHJcbiAgICBjb25zdCB0ZWFtc1BhZ2VFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZWFtcy1wYWdlJyk7XHJcbiAgICBjb25zdCBzeW5lcmd5TWFwID0gdGVhbXNQYWdlRWwgPyBKU09OLnBhcnNlKHRlYW1zUGFnZUVsLmRhdGFzZXQuc3luZXJneU1hcCB8fCAne30nKSA6IHt9O1xyXG5cclxuICAgIC8qICBaT05FIMOJUVVJUEUg4oCUIHNwcml0ZXMgc2V1bGVtZW50ICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTZWxlY3RlZFRlYW0oKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm8gPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwID0+IHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAoIWhlcm8pIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGhlcm8uZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7aGVyby5kYXRhc2V0LnNwcml0ZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgaGVyb0VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWhlcm8tc3ByaXRlJyk7XHJcbiAgICAgICAgICAgIGhlcm9FbC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c3ByaXRlUGF0aH1cIiBhbHQ9XCJTcHJpdGUgZGUgJHtuYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+JHtuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgc2VsZWN0ZWRMaXN0LmFwcGVuZENoaWxkKGhlcm9FbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbGVzIGluZGljYXRldXJzIGRlIHLDtGxlc1xyXG4gICAgICAgIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCk7XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGxlcyBzeW5lcmdpZXNcclxuICAgICAgICB1cGRhdGVTeW5lcmd5SGlnaGxpZ2h0cygpO1xyXG5cclxuICAgICAgICBpZiAobGF1bmNoQnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5IZWFsZXIgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgbGF1bmNoQnRuLmRpc2FibGVkID0gIXRlYW1Db21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU3luZXJneUhpZ2hsaWdodHMoKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBleGlzdGluZyBzeW5lcmd5IGhpZ2hsaWdodHNcclxuICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgcC5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LWF2YWlsYWJsZScsICdzeW5lcmd5LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBjb25zdCBiYWRnZSA9IHAucXVlcnlTZWxlY3RvcignLnN5bmVyZ3ktYmFkZ2UnKTtcclxuICAgICAgICAgICAgaWYgKGJhZGdlKSBiYWRnZS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gR2V0IG5hbWVzIG9mIHNlbGVjdGVkIGhlcm9lc1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTmFtZXMgPSBzZWxlY3RlZEhlcm9JZHMubWFwKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHBwID0+IHBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHAgPyBwLmRhdGFzZXQubmFtZSA6IG51bGw7XHJcbiAgICAgICAgfSkuZmlsdGVyKEJvb2xlYW4pO1xyXG5cclxuICAgICAgICAvLyBGaW5kIGFjdGl2ZSBzeW5lcmdpZXMgKGJvdGggbWVtYmVycyBzZWxlY3RlZClcclxuICAgICAgICBjb25zdCBhY3RpdmVTeW5lcmdpZXMgPSBbXTtcclxuICAgICAgICBjb25zdCBzZWVuUGFpcnMgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgc2VsZWN0ZWROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzeW5lcmdpZXMgPSBzeW5lcmd5TWFwW25hbWVdIHx8IFtdO1xyXG4gICAgICAgICAgICBzeW5lcmdpZXMuZm9yRWFjaChzeW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkTmFtZXMuaW5jbHVkZXMoc3luLnBhcnRuZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFpcktleSA9IFtuYW1lLCBzeW4ucGFydG5lcl0uc29ydCgpLmpvaW4oJysnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlZW5QYWlycy5oYXMocGFpcktleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VlblBhaXJzLmFkZChwYWlyS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlU3luZXJnaWVzLnB1c2goeyBuYW1lMTogbmFtZSwgbmFtZTI6IHN5bi5wYXJ0bmVyLCBzeW5lcmd5TmFtZTogc3luLm5hbWUsIGRlc2M6IHN5bi5kZXNjIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcmsgc2VsZWN0ZWQgcG9ydHJhaXRzIHdpdGggYWN0aXZlIHN5bmVyZ3lcclxuICAgICAgICBhY3RpdmVTeW5lcmdpZXMuZm9yRWFjaChzeW4gPT4ge1xyXG4gICAgICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgocC5kYXRhc2V0Lm5hbWUgPT09IHN5bi5uYW1lMSB8fCBwLmRhdGFzZXQubmFtZSA9PT0gc3luLm5hbWUyKVxyXG4gICAgICAgICAgICAgICAgICAgICYmIHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhwLmRhdGFzZXQuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gSGlnaGxpZ2h0IHVuc2VsZWN0ZWQgcG9ydHJhaXRzIHRoYXQgaGF2ZSBzeW5lcmd5IHdpdGggc2VsZWN0ZWQgaGVyb2VzXHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMocC5kYXRhc2V0LmlkKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBwTmFtZSA9IHAuZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBjaGFyU3luZXJnaWVzID0gc3luZXJneU1hcFtwTmFtZV0gfHwgW107XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoaW5nID0gY2hhclN5bmVyZ2llcy5maWx0ZXIoc3luID0+IHNlbGVjdGVkTmFtZXMuaW5jbHVkZXMoc3luLnBhcnRuZXIpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaGluZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktYXZhaWxhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYWRnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UuY2xhc3NOYW1lID0gJ3N5bmVyZ3ktYmFkZ2UnO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLWxpbmtcIj48L2k+JztcclxuICAgICAgICAgICAgICAgIGJhZGdlLnRpdGxlID0gbWF0Y2hpbmcubWFwKHMgPT4gcy5uYW1lKS5qb2luKCcsICcpO1xyXG4gICAgICAgICAgICAgICAgcC5hcHBlbmRDaGlsZChiYWRnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzeW5lcmd5IGRpc3BsYXkgcGFuZWxcclxuICAgICAgICB1cGRhdGVTeW5lcmd5RGlzcGxheShhY3RpdmVTeW5lcmdpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVN5bmVyZ3lEaXNwbGF5KGFjdGl2ZVN5bmVyZ2llcykge1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3luZXJneS1kaXNwbGF5Jyk7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSAnc3luZXJneS1kaXNwbGF5JztcclxuICAgICAgICAgICAgY29uc3QgYWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC10ZWFtX19hY3Rpb25zJyk7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgYWN0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmVTeW5lcmdpZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5bmVyZ3ktZGlzcGxheV9fdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWxpbmtcIj48L2k+IFN5bmVyZ2llcyBhY3RpdmVzXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAke2FjdGl2ZVN5bmVyZ2llcy5tYXAocyA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzeW5lcmd5LWRpc3BsYXlfX25hbWVcIj4ke2VzY2FwZUh0bWwocy5zeW5lcmd5TmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19jaGFyc1wiPiR7ZXNjYXBlSHRtbChzLm5hbWUxKX0gKyAke2VzY2FwZUh0bWwocy5uYW1lMil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19kZXNjXCI+JHtlc2NhcGVIdG1sKHMuZGVzYyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUm9sZUluZGljYXRvcnMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgY29uc3QgaW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvbGUtaW5kaWNhdG9yJyk7XHJcbiAgICAgICAgaWYgKGluZGljYXRvcikge1xyXG4gICAgICAgICAgICBpbmRpY2F0b3IucXVlcnlTZWxlY3RvckFsbCgnLnJvbGUtc2xvdCcpLmZvckVhY2goc2xvdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSBzbG90LmRhdGFzZXQucm9sZTtcclxuICAgICAgICAgICAgICAgIGlmIChyb2xlc1tjYXRdID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICBQUkVTRVRTXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4gICAgY29uc3Qgc2F2ZVByZXNldEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2F2ZS1wcmVzZXQnKTtcclxuICAgIGNvbnN0IHByZXNldE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldE1vZGFsJyk7XHJcbiAgICBjb25zdCBwcmVzZXROYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0TmFtZScpO1xyXG4gICAgY29uc3QgcHJlc2V0Q29uZmlybUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRDb25maXJtJyk7XHJcbiAgICBjb25zdCBwcmVzZXRDYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0Q2FuY2VsJyk7XHJcblxyXG4gICAgLy8gTWV0dHJlIGEgam91ciBsZSBib3V0b24gc2F1dmVnYXJkZXIgc2Vsb24gbGEgc2VsZWN0aW9uXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTYXZlUHJlc2V0QnRuKCkge1xyXG4gICAgICAgIGlmIChzYXZlUHJlc2V0QnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5IZWFsZXIgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgc2F2ZVByZXNldEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcGVsZXIgdXBkYXRlU2F2ZVByZXNldEJ0biBhIGNoYXF1ZSBjaGFuZ2VtZW50IGRlIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0gPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcbiAgICAvLyBPbiBzdXJjaGFyZ2UgZW4gYWpvdXRhbnQgbCdhcHBlbFxyXG4gICAgY29uc3QgX29yaWdVcGRhdGUgPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcblxyXG4gICAgLy8gUGF0Y2g6IGFqb3V0ZXIgbCdhcHBlbCBhIHVwZGF0ZVNhdmVQcmVzZXRCdG4gZGFucyB1cGRhdGVTZWxlY3RlZFRlYW1cclxuICAgIC8vIE9uIGxlIGZhaXQgZW4gd3JhcHBhbnQgbGVzIGluZGljYXRldXJzXHJcbiAgICBjb25zdCBfb3JpZ1JvbGVJbmRpY2F0b3JzID0gdXBkYXRlUm9sZUluZGljYXRvcnM7XHJcblxyXG4gICAgLy8gT3V2cmlyIGxhIG1vZGFsXHJcbiAgICBpZiAoc2F2ZVByZXNldEJ0biAmJiBwcmVzZXRNb2RhbCkge1xyXG4gICAgICAgIHNhdmVQcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHByZXNldE5hbWVJbnB1dC5mb2N1cygpLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGZXJtZXIgbGEgbW9kYWxcclxuICAgICAgICBwcmVzZXRDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByZXNldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtbW9kYWxfX2JhY2tkcm9wJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNhdXZlZ2FyZGVyIGxlIHByZXNldFxyXG4gICAgICAgIHByZXNldENvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcmVzZXROYW1lSW5wdXQudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZGMxNDNjJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnLi4uJztcclxuXHJcbiAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvcHJlc2V0cy9zYXZlJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVySWRzOiBzZWxlY3RlZEhlcm9JZHMubWFwKE51bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWNoYXJnZXIgbGEgcGFnZSBwb3VyIGFmZmljaGVyIGxlIG5vdXZlYXUgcHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yIHx8ICdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUnKTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRW50ZXIgcG91ciB2YWxpZGVyXHJcbiAgICAgICAgcHJlc2V0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHByZXNldENvbmZpcm1CdG4uY2xpY2soKTtcclxuICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhcmdlciB1biBwcmVzZXQgKHNlbGVjdGlvbiBwcm9ncmFtbWF0aXF1ZSBkZXMgcGVyc29ubmFnZXMpXHJcbiAgICBmdW5jdGlvbiBsb2FkUHJlc2V0KGNoYXJhY3Rlcklkcykge1xyXG4gICAgICAgIC8vIFJlc2V0IGxhIHNlbGVjdGlvbiBhY3R1ZWxsZVxyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG5cclxuICAgICAgICAvLyBTZWxlY3Rpb25uZXIgbGVzIHBlcnNvbm5hZ2VzIGR1IHByZXNldFxyXG4gICAgICAgIGNoYXJhY3Rlcklkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWRTdHIgPSBTdHJpbmcoaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3J0cmFpdCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBpZFN0cik7XHJcbiAgICAgICAgICAgIGlmIChwb3J0cmFpdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWRTdHIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMucHVzaChwb3J0cmFpdC5kYXRhc2V0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICB1cGRhdGVTYXZlUHJlc2V0QnRuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3VwcHJpbWVyIHVuIHByZXNldFxyXG4gICAgZnVuY3Rpb24gZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwRWwpIHtcclxuICAgICAgICBpZiAoIWNvbmZpcm0oJ1N1cHByaW1lciBjZSBwcmVzZXQgPycpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGAvdGVhbXMvcHJlc2V0cy8ke3ByZXNldElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlwRWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTaSBwbHVzIGRlIHByZXNldHMsIGNhY2hlciBsYSBiYXJyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXRzLWJhcl9fbGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QgJiYgbGlzdC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0cy1iYXInKT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXR0YWNoZXIgbGVzIGV2ZW50cyBhdXggY2hpcHMgZGUgcHJlc2V0c1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZXNldC1jaGlwJykuZm9yRWFjaChjaGlwID0+IHtcclxuICAgICAgICBjb25zdCBwcmVzZXRJZCA9IGNoaXAuZGF0YXNldC5wcmVzZXRJZDtcclxuICAgICAgICBjb25zdCBjaGFySWRzID0gSlNPTi5wYXJzZShjaGlwLmRhdGFzZXQucHJlc2V0SWRzKTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2xvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbG9hZFByZXNldChjaGFySWRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2RlbGV0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9ic2VydmVyIGxlcyBjaGFuZ2VtZW50cyBkZSBzZWxlY3Rpb24gcG91ciBsZSBib3V0b24gc2F2ZVxyXG4gICAgLy8gT24gdXRpbGlzZSB1biBNdXRhdGlvbk9ic2VydmVyIHN1ciBzZWxlY3RlZExpc3RcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdXBkYXRlU2F2ZVByZXNldEJ0bigpKTtcclxuICAgIGlmIChzZWxlY3RlZExpc3QpIHtcclxuICAgICAgICBzZWxlY3RlZExpc3RPYnNlcnZlci5vYnNlcnZlKHNlbGVjdGVkTGlzdCwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhdW5jaEJ0bikge1xyXG4gICAgICAgIGxhdW5jaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnZvaSBQT1NUIEFKQVggdmVycyAvdGVhbXMvc2VsZWN0XHJcbiAgICAgICAgICAgICAgICBmZXRjaCgnL3RlYW1zL3NlbGVjdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogc2VsZWN0ZWRIZXJvSWRzLm1hcCgoaWQsIGkpID0+IGBjaGFyYWN0ZXJfaWRzWyR7aX1dPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGlkKX1gKS5qb2luKCcmJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlZGlyZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVkaXJpZ2UgbWFudWVsbGVtZW50IHNpIHBhcyBkZSByZWRpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbWF0Y2htYWtpbmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzw6lsZWN0aW9uIGRlIGxcXCfDqXF1aXBlLicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQUk9GSUxFIFBPUFVQXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1wb3B1cF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWNvbnRlbnRdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBvcHVwKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwb3B1cC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3Byb2ZpbGUtcG9wdXAtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwX19iYWNrZHJvcC0tb3BlbicpO1xyXG5cclxuICAgICAgICBpZiAoIWxvYWRlZCkge1xyXG4gICAgICAgICAgICBmZXRjaFByb2ZpbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cCk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmZXRjaFByb2ZpbGUoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9hcGkvcHJvZmlsZScpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9maWxlKGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lcnJvclwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclByb2ZpbGUoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdENsYXNzID0gKHIpID0+IHIgPT09ICd3aW4nID8gJ3Jlc3VsdC0td2luJyA6IHIgPT09ICdsb3NzJyA/ICdyZXN1bHQtLWxvc3MnIDogJ3Jlc3VsdC0tZHJhdyc7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0TGFiZWwgPSAocikgPT4gciA9PT0gJ3dpbicgPyAnVmljdG9pcmUnIDogciA9PT0gJ2xvc3MnID8gJ0RcXHUwMGU5ZmFpdGUnIDogJ051bCc7XHJcblxyXG4gICAgICAgIGNvbnN0IGF2YXRhckh0bWwgPSBkYXRhLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChkYXRhLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiQXZhdGFyIGRlICR7ZXNjYXBlSHRtbChkYXRhLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmFzIGZhLXVzZXItY2lyY2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPmA7XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faWRlbnRpdHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hdmF0YXJcIj4ke2F2YXRhckh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fdXNlcm5hbWVcIj4ke2VzY2FwZUh0bWwoZGF0YS51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5tb3R0byA/IGA8c3BhbiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX21vdHRvXCI+XFx1MDBhYiAke2VzY2FwZUh0bWwoZGF0YS5tb3R0byl9IFxcdTAwYmI8L3NwYW4+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5iaW8gPyBgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19iaW9cIj4ke2VzY2FwZUh0bWwoZGF0YS5iaW8pfTwvcD5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3RhdHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEucmF0aW5nKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPk1NUjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy53aW5zKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPlZpY3RvaXJlczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy5sb3NzZXMpKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+RFxcdTAwZTlmYWl0ZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMud2luUmF0ZSkpfSU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+V2luIFJhdGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXN0YXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IENoYW1waW9uIEZhdm9yaVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19uYW1lXCI+JHtlc2NhcGVIdG1sKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIubmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX3JvbGVcIj4ke2VzY2FwZUh0bWwoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5yb2xlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fY291bnRcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIuZ2FtZXNQbGF5ZWQpKX0gcGFydGllczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubGFzdFRlYW0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlcnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IERlcm5pXFx1MDBlOHJlIFxcdTAwYzlxdWlwZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5sYXN0VGVhbS5tYXAoYyA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX21lbWJlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoYy5uYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fcm9sZVwiPiR7ZXNjYXBlSHRtbChjLnJvbGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEucmVjZW50QmF0dGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zaGllbGQtYWx0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBIaXN0b3JpcXVlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5yZWNlbnRCYXR0bGVzLm1hcChiID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYXJlbmEvcmVwbGF5LyR7cGFyc2VJbnQoYi5pZCwgMTApfVwiIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19lbnRyeSAke3Jlc3VsdENsYXNzKGIucmVzdWx0KX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fcmVzdWx0XCI+JHtyZXN1bHRMYWJlbChiLnJlc3VsdCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19vcHBvbmVudFwiPnZzICR7ZXNjYXBlSHRtbChiLm9wcG9uZW50KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX3R5cGVcIj4ke2VzY2FwZUh0bWwoYi5tYXRjaFR5cGUpLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19kYXRlXCI+JHtlc2NhcGVIdG1sKGIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsYXkgcHJvZmlsZS1oaXN0b3J5X19yZXBsYXlcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZW1wdHlcIj5BdWN1biBjb21iYXQgZW5yZWdpc3RyXFx1MDBlOTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3Byb2ZpbGVcIiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2VkaXQtbGlua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gXFx1MDBjOWRpdGVyIGxlIHByb2ZpbFxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB9XHJcblxyXG59KTsiLCIvKipcclxuICogQ29tYmF0IEFuaW1hdGlvbiBDb250cm9sbGVyXHJcbiAqIEfDqHJlIGwnYWZmaWNoYWdlIHByb2dyZXNzaWYgZGVzIGxvZ3MgZGUgY29tYmF0IGF2ZWMgYW5pbWF0aW9uc1xyXG4gKi9cclxuY2xhc3MgQ29tYmF0Q29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLmxvZ3MgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFAgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICAvLyBSw6ljdXDDqXJlciBsZXMgbG9ncyBkZXB1aXMgbCdhdHRyaWJ1dCBkYXRhXHJcbiAgICAgICAgY29uc3QgbG9nc0RhdGEgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmNvbWJhdExvZ3M7XHJcbiAgICAgICAgaWYgKGxvZ3NEYXRhKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ3MgPSBKU09OLnBhcnNlKGxvZ3NEYXRhKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyZXVyIHBhcnNpbmcgbG9nczonLCBlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGVzIMOpbMOpbWVudHNcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1sb2ddJyk7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LW92ZXJsYXldJyk7XHJcbiAgICAgICAgdGhpcy5wbGF5QnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXBsYXldJyk7XHJcbiAgICAgICAgdGhpcy5za2lwQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXNraXBdJyk7XHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb21iYXQtc3BlZWRdJyk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgcGVyc29ubmFnZXMgYXZlYyBzdG9ja2FnZSBkZXMgSFAgbWF4IGluaXRpYXV4XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUCA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyU2x1Z3MgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlckhhc0hlYWwgPSB7fTtcclxuICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnMgPSB7fTsgLy8gU3VpdmkgZGVzIGNvb2xkb3ducyBlbiBjb3Vyc1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXMgPSB7fTsgLy8gU3VpdmkgZGVzIHN0YXR1dHMgYWN0aWZzIHBhciBwZXJzb25uYWdlXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2hhcmFjdGVyLW5hbWVdJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbC5kYXRhc2V0LmNoYXJhY3Rlck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJhY3RlclRlYW07XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW19LSR7bmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV0gPSBlbDtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJTbHVnIHx8ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3Rlckhhc0hlYWxba2V5XSA9IGVsLmRhdGFzZXQuaGFzSGVhbCA9PT0gJ3RydWUnO1xyXG5cclxuICAgICAgICAgICAgLy8gRXh0cmFpcmUgbGUgSFAgbWF4IGRlcHVpcyBsZSB0ZXh0ZSBpbml0aWFsXHJcbiAgICAgICAgICAgIGNvbnN0IGhwVGV4dCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcbiAgICAgICAgICAgIGlmIChocFRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gaHBUZXh0LnRleHRDb250ZW50Lm1hdGNoKC8oXFxkKylcXC8oXFxkKykvKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFBba2V5XSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhbGlzZXIgbGVzIHN0YXR1dHMgdmlkZXNcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldID0gdGhpcy5jcmVhdGVFbXB0eVN0YXR1c2VzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgw6lsw6ltZW50cyBkJ2FiaWxpdHkgZGFucyBsZXMgaW5mbyBwYW5lbHNcclxuICAgICAgICB0aGlzLmFiaWxpdHlFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGFyYWN0ZXItaW5mb1tkYXRhLWNoYXItbmFtZV0nKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsLmRhdGFzZXQuY2hhck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJUZWFtO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUVsID0gZWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5Jyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWw6IGFiaWxpdHlFbCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhDZDogcGFyc2VJbnQoYWJpbGl0eUVsLmRhdGFzZXQuYWJpbGl0eU1heENkKSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhZGdlOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LWNkLWJhZGdlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZUVsOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LW5hbWUnKSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uRWw6IGFiaWxpdHlFbC5xdWVyeVNlbGVjdG9yKCdpJyksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENhY2hlciBsJ292ZXJsYXlcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZpZGVyIGxlIGxvZ1xyXG4gICAgICAgIGlmICh0aGlzLmxvZ0NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF1ZGlvXHJcbiAgICAgICAgdGhpcy5hdWRpb1VubG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYXN0VHJhY2tJbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuaXNNdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudm9sdW1lID0gMC40O1xyXG4gICAgICAgIHRoaXMuY29tYmF0UGxheWxpc3QgPSBbXHJcbiAgICAgICAgICAgICcvYXNzZXQvYXVkaW8vY29tYmF0L2J1dGNoZXJzYm91bGV2YXJkbXVzaWMubXAzJyxcclxuICAgICAgICAgICAgJy9hc3NldC9hdWRpby9jb21iYXQvY29tYmF0aW50aGVydWlucy5tcDMnLFxyXG4gICAgICAgIF07XHJcbiAgICAgICAgdGhpcy5tdXRlQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtYXVkaW8tbXV0ZV0nKTtcclxuICAgICAgICB0aGlzLnZvbHVtZVNsaWRlciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWF1ZGlvLXZvbHVtZV0nKTtcclxuXHJcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIExhbmNlciBhdXRvbWF0aXF1ZW1lbnQgYXByw6hzIHVuIGTDqWxhaVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wbGF5KCksIDgwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IFNUQVRVUyBUUkFDS0lORyA9PT1cclxuXHJcbiAgICBjcmVhdGVFbXB0eVN0YXR1c2VzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJsZWVkaW5nOiAwLFxyXG4gICAgICAgICAgICBibGlnaHRlZDogMCxcclxuICAgICAgICAgICAgc3R1bm5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgIG1hcmtlZDogMCxcclxuICAgICAgICAgICAgcHJvdGVjdGVkOiAwLFxyXG4gICAgICAgICAgICBzdGVhbHRoZWQ6IDAsXHJcbiAgICAgICAgICAgIHJpcG9zdGU6IDAsXHJcbiAgICAgICAgICAgIGRtZ1VwOiAwLFxyXG4gICAgICAgICAgICBzcGRVcDogMCxcclxuICAgICAgICAgICAgZG9kZ2VVcDogMCxcclxuICAgICAgICAgICAgY3JpdFVwOiAwLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2hhcmFjdGVyU3RhdHVzZXMobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdyb3VuZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpY2tSb3VuZFN0YXR1c2VzKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHRpY2tSb3VuZFN0YXR1c2VzIGFscmVhZHkgY2FsbHMgcmVuZGVyQWxsU3RhdHVzSWNvbnNcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQWJpbGl0eVN0YXR1c0NoYW5nZShsb2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdwcm90ZWN0ZWQnLCBsb2cuZHVyYXRpb24gfHwgMik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50dXJuc1JlbWFpbmluZyAhPT0gdW5kZWZpbmVkICYmIGxvZy50dXJuc1JlbWFpbmluZyA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGVlZGluZycsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnR1cm5zUmVtYWluaW5nICE9PSB1bmRlZmluZWQgJiYgbG9nLnR1cm5zUmVtYWluaW5nIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsaWdodGVkJywgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW5uZWRfc2tpcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ3N0dW5uZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICAvLyBTdGVhbHRoIGNvbnN1bWVkIG9uIGF0dGFja1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5hdHRhY2tlciAmJiBsb2cuYXR0YWNrZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7bG9nLmF0dGFja2VyVGVhbX0tJHtsb2cuYXR0YWNrZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldICYmIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XS5zdGVhbHRoZWQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XS5zdGVhbHRoZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV90cmlnZ2VyJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU3luZXJneVN0YXR1c0NoYW5nZShsb2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQWxsU3RhdHVzZXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckFsbFN0YXR1c0ljb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQWJpbGl0eVN0YXR1c0NoYW5nZShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxlZWRpbmcnLCBsb2cuYmxlZWRUdXJucyB8fCAzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuYWxsSGl0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaW1hcnkgPSBsb2cuYWxsSGl0cy5maW5kKGggPT4gaC5pc1ByaW1hcnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmltYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKHByaW1hcnkubmFtZSwgcHJpbWFyeS50ZWFtLCAnYmxpZ2h0ZWQnLCBsb2cuYmxpZ2h0VHVybnMgfHwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2cudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGlnaHRlZCcsIGxvZy5ibGlnaHRUdXJucyB8fCAzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdzdHVubmVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWFyayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnbWFya2VkJywgbG9nLm1hcmtUdXJucyB8fCAzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgJ3JpcG9zdGUnLCBsb2cucmlwb3N0ZVR1cm5zIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlbGZfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlCdWZmU3RhdHVzZXMobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy5idWZmcywgbG9nLmJ1ZmZEdXJhdGlvbiB8fCAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlUZWFtQnVmZlN0YXR1c2VzKGxvZy5jYXN0ZXJUZWFtLCBsb2cuYnVmZnMsIGxvZy5idWZmRHVyYXRpb24gfHwgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3RlYWx0aCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCAnc3RlYWx0aGVkJywgbG9nLnN0ZWFsdGhUdXJucyB8fCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0X2RvZGdlJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdwcm90ZWN0ZWQnLCBsb2cucHJvdGVjdFR1cm5zIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnZG9kZ2VVcCcsIGxvZy5wcm90ZWN0VHVybnMgfHwgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZW1lcmdlbmN5X2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5zZWxmQmxlZWRUdXJucyAmJiBsb2cuc2VsZkJsZWVkVHVybnMgPiAwICYmIGxvZy5jYXN0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgJ2JsZWVkaW5nJywgbG9nLnNlbGZCbGVlZFR1cm5zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICAgICAgLy8gTWFyayBtYXkgYmUgY29uc3VtZWQgb24gaGl0IChyZW1vdmVPbkhpdClcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdEtleSA9IGAke2xvZy50YXJnZXRUZWFtfS0ke2xvZy50YXJnZXR9YDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW4ndCBrbm93IGZvciBzdXJlIGlmIHJlbW92ZU9uSGl0LCBzbyBsZWF2ZSB0aGUgaWNvbiAtIGl0IHdpbGwgdGljayBkb3duXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU3luZXJneVN0YXR1c0NoYW5nZShsb2cpIHtcclxuICAgICAgICBpZiAoIWxvZy5lZmZlY3RUeXBlKSByZXR1cm47XHJcblxyXG4gICAgICAgIHN3aXRjaCAobG9nLmVmZmVjdFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnZ3JhbnRfcmlwb3N0ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cucGFydG5lckNoYXIsIGxvZy5wYXJ0bmVyQ2hhclRlYW0sICdyaXBvc3RlJywgbG9nLmdyYW50ZWRUdXJucyB8fCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0ZW1wX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5idWZmVHlwZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IGxvZy5idWZmRHVyYXRpb24gfHwgMjtcclxuICAgICAgICAgICAgICAgICAgICBsb2cuYnVmZlR5cGVzLmZvckVhY2godHlwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1c0tleSA9IHRoaXMuYnVmZlR5cGVUb1N0YXR1c0tleSh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1c0tleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtLCBzdGF0dXNLZXksIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FwcGx5X21hcmsnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ21hcmtlZCcsIGxvZy5tYXJrVHVybnMgfHwgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZ3JhbnRfZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtLCAnZG9kZ2VVcCcsIGxvZy5kb2RnZUR1cmF0aW9uIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2V4dGVuZF9zdGVhbHRoJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cucGFydG5lckNoYXIgJiYgbG9nLnBhcnRuZXJDaGFyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2xvZy5wYXJ0bmVyQ2hhclRlYW19LSR7bG9nLnBhcnRuZXJDaGFyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0uc3RlYWx0aGVkICs9IChsb2cuZXh0cmFUdXJucyB8fCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZ3VhcmFudGVlZF9jcml0JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5wYXJ0bmVyQ2hhciwgbG9nLnBhcnRuZXJDaGFyVGVhbSwgJ2NyaXRVcCcsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJ1ZmZUeXBlVG9TdGF0dXNLZXkodHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdkYW1hZ2UnOiByZXR1cm4gJ2RtZ1VwJztcclxuICAgICAgICAgICAgY2FzZSAnc3BlZWQnOiByZXR1cm4gJ3NwZFVwJztcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOiByZXR1cm4gJ2RvZGdlVXAnO1xyXG4gICAgICAgICAgICBjYXNlICdjcml0JzogcmV0dXJuICdjcml0VXAnO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlCdWZmU3RhdHVzZXMoY2hhck5hbWUsIHRlYW1OYW1lLCBidWZmcywgZHVyYXRpb24pIHtcclxuICAgICAgICBpZiAoIWJ1ZmZzKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qga2V5ID0gYCR7dGVhbU5hbWV9LSR7Y2hhck5hbWV9YDtcclxuICAgICAgICBjb25zdCBzID0gdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldO1xyXG4gICAgICAgIGlmICghcykgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoYnVmZnMuZGFtYWdlICYmIGJ1ZmZzLmRhbWFnZSA+IDApIHMuZG1nVXAgPSBNYXRoLm1heChzLmRtZ1VwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgaWYgKGJ1ZmZzLnNwZWVkICYmIGJ1ZmZzLnNwZWVkID4gMCkgcy5zcGRVcCA9IE1hdGgubWF4KHMuc3BkVXAsIGR1cmF0aW9uKTtcclxuICAgICAgICBpZiAoYnVmZnMuZG9kZ2UgJiYgYnVmZnMuZG9kZ2UgPiAwKSBzLmRvZGdlVXAgPSBNYXRoLm1heChzLmRvZGdlVXAsIGR1cmF0aW9uKTtcclxuICAgICAgICBpZiAoYnVmZnMuY3JpdCAmJiBidWZmcy5jcml0ID4gMCkgcy5jcml0VXAgPSBNYXRoLm1heChzLmNyaXRVcCwgZHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5VGVhbUJ1ZmZTdGF0dXNlcyh0ZWFtTmFtZSwgYnVmZnMsIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgaWYgKCFidWZmcykgcmV0dXJuO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXMpKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aCh0ZWFtTmFtZSArICctJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZnMuZGFtYWdlICYmIGJ1ZmZzLmRhbWFnZSA+IDApIHMuZG1nVXAgPSBNYXRoLm1heChzLmRtZ1VwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZnMuc3BlZWQgJiYgYnVmZnMuc3BlZWQgPiAwKSBzLnNwZFVwID0gTWF0aC5tYXgocy5zcGRVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZzLmRvZGdlICYmIGJ1ZmZzLmRvZGdlID4gMCkgcy5kb2RnZVVwID0gTWF0aC5tYXgocy5kb2RnZVVwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZnMuY3JpdCAmJiBidWZmcy5jcml0ID4gMCkgcy5jcml0VXAgPSBNYXRoLm1heChzLmNyaXRVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFN0YXR1cyhjaGFyTmFtZSwgdGVhbU5hbWUsIHN0YXR1c0tleSwgdmFsdWUpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtTmFtZX0tJHtjaGFyTmFtZX1gO1xyXG4gICAgICAgIGlmICghdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldW3N0YXR1c0tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckFsbFN0YXR1c2VzKGNoYXJOYW1lLCB0ZWFtTmFtZSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW1OYW1lfS0ke2NoYXJOYW1lfWA7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0gPSB0aGlzLmNyZWF0ZUVtcHR5U3RhdHVzZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGlja1JvdW5kU3RhdHVzZXMoKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5jaGFyYWN0ZXJTdGF0dXNlcykpIHtcclxuICAgICAgICAgICAgY29uc3QgcyA9IHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XTtcclxuICAgICAgICAgICAgLy8gRE9UczogTk9UIGRlY3JlbWVudGVkIGhlcmUsIGhhbmRsZWQgYnkgYmxlZWRfdGljay9ibGlnaHRfdGljayBsb2dzXHJcbiAgICAgICAgICAgIC8vIERlY3JlbWVudCBkdXJhdGlvbi1iYXNlZCBzdGF0dXNlcyAoc2tpcCBwZXJtYW5lbnQgYnVmZnMgPj0gOTk5KVxyXG4gICAgICAgICAgICBpZiAocy5tYXJrZWQgPiAwICYmIHMubWFya2VkIDwgOTk5KSBzLm1hcmtlZC0tO1xyXG4gICAgICAgICAgICBpZiAocy5wcm90ZWN0ZWQgPiAwICYmIHMucHJvdGVjdGVkIDwgOTk5KSBzLnByb3RlY3RlZC0tO1xyXG4gICAgICAgICAgICBpZiAocy5zdGVhbHRoZWQgPiAwICYmIHMuc3RlYWx0aGVkIDwgOTk5KSBzLnN0ZWFsdGhlZC0tO1xyXG4gICAgICAgICAgICBpZiAocy5yaXBvc3RlID4gMCAmJiBzLnJpcG9zdGUgPCA5OTkpIHMucmlwb3N0ZS0tO1xyXG4gICAgICAgICAgICBpZiAocy5kbWdVcCA+IDAgJiYgcy5kbWdVcCA8IDk5OSkgcy5kbWdVcC0tO1xyXG4gICAgICAgICAgICBpZiAocy5zcGRVcCA+IDAgJiYgcy5zcGRVcCA8IDk5OSkgcy5zcGRVcC0tO1xyXG4gICAgICAgICAgICBpZiAocy5kb2RnZVVwID4gMCAmJiBzLmRvZGdlVXAgPCA5OTkpIHMuZG9kZ2VVcC0tO1xyXG4gICAgICAgICAgICBpZiAocy5jcml0VXAgPiAwICYmIHMuY3JpdFVwIDwgOTk5KSBzLmNyaXRVcC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlckFsbFN0YXR1c0ljb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQWxsU3RhdHVzSWNvbnMoKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5jaGFyYWN0ZXJTdGF0dXNlcykpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJTdGF0dXNJY29ucyhrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTdGF0dXNJY29ucyhrZXkpIHtcclxuICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICBpZiAoIWVsKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMtaWNvbnMnKTtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBzID0gdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldO1xyXG4gICAgICAgIGNvbnN0IGljb25zID0gW107XHJcblxyXG4gICAgICAgIC8vIERlYnVmZnNcclxuICAgICAgICBpZiAocy5ibGVlZGluZyA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtdGludCcsIGNsczogJ3N0YXR1cy1pY29uLS1ibGVlZCcsIHRpdGxlOiAnU2FpZ25lbWVudCcgfSk7XHJcbiAgICAgICAgaWYgKHMuYmxpZ2h0ZWQgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLXNrdWxsLWNyb3NzYm9uZXMnLCBjbHM6ICdzdGF0dXMtaWNvbi0tYmxpZ2h0JywgdGl0bGU6ICdQZXN0ZScgfSk7XHJcbiAgICAgICAgaWYgKHMuc3R1bm5lZCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1kaXp6eScsIGNsczogJ3N0YXR1cy1pY29uLS1zdHVuJywgdGl0bGU6ICdFdG91cmRpJyB9KTtcclxuICAgICAgICBpZiAocy5tYXJrZWQgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLWNyb3NzaGFpcnMnLCBjbHM6ICdzdGF0dXMtaWNvbi0tbWFyaycsIHRpdGxlOiAnTWFycXVlJyB9KTtcclxuXHJcbiAgICAgICAgLy8gQnVmZnNcclxuICAgICAgICBpZiAocy5wcm90ZWN0ZWQgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLXNoaWVsZC1hbHQnLCBjbHM6ICdzdGF0dXMtaWNvbi0tcHJvdGVjdCcsIHRpdGxlOiAnUHJvdGVnZScgfSk7XHJcbiAgICAgICAgaWYgKHMuc3RlYWx0aGVkID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1leWUtc2xhc2gnLCBjbHM6ICdzdGF0dXMtaWNvbi0tc3RlYWx0aCcsIHRpdGxlOiAnRnVydGlmJyB9KTtcclxuICAgICAgICBpZiAocy5yaXBvc3RlID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1leGNoYW5nZS1hbHQnLCBjbHM6ICdzdGF0dXMtaWNvbi0tcmlwb3N0ZScsIHRpdGxlOiAnUmlwb3N0ZScgfSk7XHJcbiAgICAgICAgaWYgKHMuZG1nVXAgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLWZpc3QtcmFpc2VkJywgY2xzOiAnc3RhdHVzLWljb24tLWRtZy11cCcsIHRpdGxlOiAnK0RlZ2F0cycgfSk7XHJcbiAgICAgICAgaWYgKHMuc3BkVXAgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLXdpbmQnLCBjbHM6ICdzdGF0dXMtaWNvbi0tc3BkLXVwJywgdGl0bGU6ICcrVml0ZXNzZScgfSk7XHJcbiAgICAgICAgaWYgKHMuZG9kZ2VVcCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtcnVubmluZycsIGNsczogJ3N0YXR1cy1pY29uLS1kb2RnZS11cCcsIHRpdGxlOiAnK0VzcXVpdmUnIH0pO1xyXG4gICAgICAgIGlmIChzLmNyaXRVcCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtYnVsbHNleWUnLCBjbHM6ICdzdGF0dXMtaWNvbi0tY3JpdC11cCcsIHRpdGxlOiAnK0NyaXRpcXVlJyB9KTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGljb25zLm1hcChpID0+XHJcbiAgICAgICAgICAgIGA8c3BhbiBjbGFzcz1cInN0YXR1cy1pY29uICR7aS5jbHN9XCIgdGl0bGU9XCIke2kudGl0bGV9XCI+PGkgY2xhc3M9XCJmYXMgJHtpLmljb259XCI+PC9pPjwvc3Bhbj5gXHJcbiAgICAgICAgKS5qb2luKCcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gRU5EIFNUQVRVUyBUUkFDS0lORyA9PT1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXlCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVQbGF5KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2tpcEJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLnNraXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNraXAoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNwZWVkQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLnNldFNwZWVkKGUpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQXVkaW8gY29udHJvbHNcclxuICAgICAgICBpZiAodGhpcy5tdXRlQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlTXV0ZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudm9sdW1lU2xpZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudm9sdW1lU2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudm9sdW1lID0gcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb21iYXRNdXNpYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tYmF0TXVzaWMudm9sdW1lID0gdGhpcy5pc011dGVkID8gMCA6IHRoaXMudm9sdW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVubG9jayBhdWRpbyBvbiBmaXJzdCB1c2VyIGludGVyYWN0aW9uIChicm93c2VyIGF1dG9wbGF5IHBvbGljeSlcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXVkaW9VbmxvY2tlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvVW5sb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlOZXh0VHJhY2soKTtcclxuICAgICAgICB9LCB7IG9uY2U6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcgJiYgIXRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NOZXh0TG9nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlUGxheSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nIHx8IHRoaXMuaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBza2lwKCkge1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBBZmZpY2hlciB0b3VzIGxlcyBsb2dzIHJlc3RhbnRzXHJcbiAgICAgICAgd2hpbGUgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBsb2cgPSB0aGlzLmxvZ3NbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlMb2cobG9nKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2tBYmlsaXR5Q29vbGRvd25zKGxvZyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVyU3RhdHVzZXMobG9nKTtcclxuICAgICAgICAgICAgaWYgKGxvZy50eXBlID09PSAnZGVhdGgnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWF0aChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU3luZXJneSB0cmlnZ2VycyB0aGF0IGtpbGwgdGFyZ2V0c1xyXG4gICAgICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdzeW5lcmd5X3RyaWdnZXInICYmIGxvZy50YXJnZXRIUCA9PT0gMCAmJiBsb2cudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWF0aChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2hvd1ZpY3RvcnlPdmVybGF5KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3BlZWQoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBzcGVlZCA9IHBhcnNlRmxvYXQoZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbWJhdFNwZWVkKTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGwnVUlcclxuICAgICAgICB0aGlzLnNwZWVkQnRucy5mb3JFYWNoKGJ0biA9PiBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc05leHRMb2coKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZyB8fCB0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZpY3RvcnlPdmVybGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBsb2cgPSB0aGlzLmxvZ3NbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc0xvZyhsb2cpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGVyIGxlIGTDqWxhaVxyXG4gICAgICAgIGxldCBkZWxheSA9IHRoaXMuZ2V0RGVsYXlGb3JMb2cobG9nKTtcclxuICAgICAgICBkZWxheSA9IGRlbGF5IC8gdGhpcy5zcGVlZDtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb2Nlc3NOZXh0TG9nKCksIGRlbGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZWxheUZvckxvZyhsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JvdW5kJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2luaXRpYXRpdmUnOiByZXR1cm4gNjAwO1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOiByZXR1cm4gMzAwMDtcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6IHJldHVybiAyODAwO1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOiByZXR1cm4gMzUwMDtcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdCc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICd2aWN0b3J5JzpcclxuICAgICAgICAgICAgY2FzZSAnZHJhdyc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICAvLyBOb3V2ZWF1eCB0eXBlc1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF90aWNrJzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW5uZWRfc2tpcCc6IHJldHVybiAxODAwO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2FjdGl2YXRlJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzogcmV0dXJuIHRoaXMuZ2V0QWJpbGl0eURlbGF5KGxvZyk7XHJcbiAgICAgICAgICAgIC8vIFN5bmVyZ2llc1xyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X2Fubm91bmNlJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N5bmVyZ3lfdHJpZ2dlcic6IHJldHVybiB0aGlzLmdldFN5bmVyZ3lUcmlnZ2VyRGVsYXkobG9nKTtcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDEyMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN5bmVyZ3lUcmlnZ2VyRGVsYXkobG9nKSB7XHJcbiAgICAgICAgLy8gUmVhY3RpdmUgc3luZXJnaWVzIChib251cyBhdHRhY2tzKSBuZWVkIG1vcmUgdGltZVxyXG4gICAgICAgIGlmIChsb2cuZGFtYWdlICE9PSB1bmRlZmluZWQpIHJldHVybiAzNTAwO1xyXG4gICAgICAgIHJldHVybiAyNTAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFiaWxpdHlEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JhY2tsaW5lX3N0cmlrZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2FybW9yX3BpZXJjZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvbnVzX3ZzX21hcmtlZCc6IHJldHVybiAzMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfYXR0YWNrJzogcmV0dXJuIDM1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW4nOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAnbWFyayc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2J1ZmYnOlxyXG4gICAgICAgICAgICBjYXNlICdzZWxmX2J1ZmYnOlxyXG4gICAgICAgICAgICBjYXNlICdzdGVhbHRoJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2hlYWwnOiByZXR1cm4gMjgwMDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfYnVmZic6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdlbWVyZ2VuY3lfaGVhbCc6IHJldHVybiAyODAwO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0X2RvZGdlJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyYW5zZm9ybV9kYW1hZ2UnOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NMb2cobG9nKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKGxvZyk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TG9nKGxvZyk7XHJcblxyXG4gICAgICAgIC8vIFN5bmNocm9uaXNlciBsYSBtaXNlIMOgIGpvdXIgZGVzIEhQIGF2ZWMgbCdhbmltYXRpb25cclxuICAgICAgICBjb25zdCBocERlbGF5ID0gdGhpcy5nZXRIUFVwZGF0ZURlbGF5KGxvZyk7XHJcbiAgICAgICAgaWYgKGhwRGVsYXkgPiAwKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyksIGhwRGVsYXkgLyB0aGlzLnNwZWVkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFN1aXZpIGRlcyBjb29sZG93bnNcclxuICAgICAgICB0aGlzLnRyYWNrQWJpbGl0eUNvb2xkb3ducyhsb2cpO1xyXG5cclxuICAgICAgICAvLyBTdWl2aSBkZXMgc3RhdHV0cyAoaWNvbmVzIGJ1ZmYvZGVidWZmKVxyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVyU3RhdHVzZXMobG9nKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFja0FiaWxpdHlDb29sZG93bnMobG9nKSB7XHJcbiAgICAgICAgLy8gUXVhbmQgdW5lIGNvbXDDqXRlbmNlIGVzdCB1dGlsaXPDqWUsIG1ldHRyZSBlbiBjb29sZG93blxyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2FiaWxpdHlfdXNlJyAmJiBsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eURhdGEgPSB0aGlzLmFiaWxpdHlFbGVtZW50c1trZXldO1xyXG4gICAgICAgICAgICBpZiAoYWJpbGl0eURhdGEgJiYgYWJpbGl0eURhdGEubWF4Q2QgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XSA9IGFiaWxpdHlEYXRhLm1heENkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5KGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEEgY2hhcXVlIG5vdXZlYXUgcm91bmQsIGTDqWNyw6ltZW50ZXIgdG91cyBsZXMgY29vbGRvd25zXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAncm91bmQnKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuYWJpbGl0eUNvb2xkb3ducykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldLS07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5KGtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheShrZXkpIHtcclxuICAgICAgICBjb25zdCBhYmlsaXR5RGF0YSA9IHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgaWYgKCFhYmlsaXR5RGF0YSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjZCA9IHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldIHx8IDA7XHJcblxyXG4gICAgICAgIGlmIChjZCA+IDApIHtcclxuICAgICAgICAgICAgLy8gRW4gY29vbGRvd24gOiBncmlzZXIgKyBhZmZpY2hlciBiYWRnZVxyXG4gICAgICAgICAgICBhYmlsaXR5RGF0YS5lbC5jbGFzc0xpc3QuYWRkKCdjaGFyYWN0ZXItaW5mb19fYWJpbGl0eS0tb24tY2QnKTtcclxuICAgICAgICAgICAgaWYgKGFiaWxpdHlEYXRhLmJhZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBhYmlsaXR5RGF0YS5iYWRnZS50ZXh0Q29udGVudCA9IGAke2NkfVRgO1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eURhdGEuYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gUHLDqnQgOiByZXRpcmVyIGxlIGdyaXNcclxuICAgICAgICAgICAgYWJpbGl0eURhdGEuZWwuY2xhc3NMaXN0LnJlbW92ZSgnY2hhcmFjdGVyLWluZm9fX2FiaWxpdHktLW9uLWNkJyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RGF0YS5iYWRnZSkge1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eURhdGEuYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRIUFVwZGF0ZURlbGF5KGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6IHJldHVybiA0MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzogcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOiByZXR1cm4gMjAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYWN0aXZhdGUnOiByZXR1cm4gMzUwO1xyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6IHJldHVybiB0aGlzLmdldEFiaWxpdHlIUERlbGF5KGxvZyk7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N5bmVyZ3lfdHJpZ2dlcic6IHJldHVybiA4MDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBYmlsaXR5SFBEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfaGVhbCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzogcmV0dXJuIDQwMDtcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QW5pbWF0aW9uKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuYXR0YWNrZXIsIGxvZy5hdHRhY2tlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cuaXNDcml0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmhlYWxlciwgbG9nLmhlYWxlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVmZW5kKGxvZy5kZWZlbmRlciwgbG9nLmRlZmVuZGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9kZ2UobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBOb3V2ZWF1eCB0eXBlc1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVubmVkX3NraXAnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3R1bm5lZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmF0dGFja2VyLCBsb2cuYXR0YWNrZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheUFiaWxpdHlBbmltYXRpb24obG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBTeW5lcmdpZXNcclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV9hbm5vdW5jZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTeW5lcmd5QW5ub3VuY2UobG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X3RyaWdnZXInOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3luZXJneVRyaWdnZXIobG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gTk9VVkVMTEVTIEFOSU1BVElPTlMgPT09XHJcblxyXG4gICAgYW5pbWF0ZURvVCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtLCBkb3RDbGFzcykge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKGRvdENsYXNzKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShkb3RDbGFzcyksIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlU3R1bm5lZCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3N0dW5uZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc3R1bm5lZCcpLCAxNDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZU1hcmtlZCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ21hcmtlZCcpO1xyXG4gICAgICAgICAgICAvLyBMYSBtYXJxdWUgcmVzdGUgdmlzaWJsZSBwbHVzIGxvbmd0ZW1wc1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdtYXJrZWQnKSwgMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVCdWZmKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnYnVmZmVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2J1ZmZlZCcpLCAxNDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVN0ZWFsdGgodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzdGVhbHRoZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc3RlYWx0aGVkJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QWJpbGl0eUFuaW1hdGlvbihsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJyksIDcwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsaWdodEtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoYmxpZ2h0S2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhc3RlckVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FzdGVyRWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzdGVyRWwuY2xhc3NMaXN0LmFkZCgnYXR0YWNraW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY2FzdGVyRWwuY2xhc3NMaXN0LnJlbW92ZSgnYXR0YWNraW5nJyksIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEFPRTogaHVydCBhbGwgaGl0IGVuZW1pZXNcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuYWxsSGl0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2cuYWxsSGl0cy5mb3JFYWNoKGggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoaC5uYW1lLCBoLnRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcpLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEJsaWdodCBET1QgYW5pbWF0aW9uIG9ubHkgb24gcHJpbWFyeSB0YXJnZXRcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmltYXJ5ID0gbG9nLmFsbEhpdHMuZmluZChoID0+IGguaXNQcmltYXJ5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJpbWFyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChwcmltYXJ5Lm5hbWUsIHByaW1hcnkudGVhbSwgJ2JsaWdodGVkJyksIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZhbGxiYWNrIGZvciBvbGQgbG9nIGZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnKSwgNzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hbmltYXRlU3R1bm5lZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSksIDcwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWFyayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKG1hcmtLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkgdGhpcy5hbmltYXRlTWFya2VkKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByaXBvc3RlS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShyaXBvc3RlS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlbGZfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGZCdWZmS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFib21pbmF0aW9uIFRyYW5zZm9ybWF0aW9uIDogc3dpdGNoIHNsdWcgdG8gYmVhc3QgcGVybWFuZW50bHlcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9nLmFiaWxpdHlOYW1lID09PSAnVHJhbnNmb3JtYXRpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU2x1Z3Nbc2VsZkJ1ZmZLZXldID0gJ2JlYXN0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHNlbGZCdWZmS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVIZWFsKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWVyIHRvdXMgbGVzIGFsbGnDqXMgc29pZ27DqXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9nLmhlYWxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2cuaGVhbGVkLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChoLm5hbWUsIGgudGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdoZWFsZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxlZCcpLCAxNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0eUJ1ZmZLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHBhcnR5QnVmZktleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEFuaW1lciB0b3VzIGxlcyBhbGxpw6lzIGR1IG3Dqm1lIGPDtHTDqVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlVGVhbUJ1ZmYobG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0ZWFsdGgnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGVhbHRoS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShzdGVhbHRoS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN0ZWFsdGgobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FybW9yX3BpZXJjZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JhY2tsaW5lX3N0cmlrZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvbnVzX3ZzX21hcmtlZCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgbG9nLmlzQ3JpdCB8fCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZW1lcmdlbmN5X2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVIZWFsKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdF9kb2RnZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlRGVmZW5kKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2Zvcm1fZGFtYWdlJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdodXJ0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcpLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlVGVhbUJ1ZmYoY2FzdGVyVGVhbSkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY2hhcmFjdGVyRWxlbWVudHMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKGNhc3RlclRlYW0pKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2J1ZmZlZCcpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdidWZmZWQnKSwgMTQwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gU1lORVJHWSBBTklNQVRJT05TID09PVxyXG5cclxuICAgIGFuaW1hdGVTeW5lcmd5QW5ub3VuY2UobG9nKSB7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudHJpZ2dlckNoYXIsIGxvZy50ZWFtKTtcclxuICAgICAgICBjb25zdCBwYXJ0bmVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy5wYXJ0bmVyQ2hhciwgbG9nLnRlYW0pO1xyXG5cclxuICAgICAgICBpZiAodHJpZ2dlcikge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktYW5ub3VuY2UtZ2xvdycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS1hbm5vdW5jZS1nbG93JyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFydG5lcikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBhcnRuZXIuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1hbm5vdW5jZS1nbG93Jyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHBhcnRuZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS1hbm5vdW5jZS1nbG93JyksIDE1MDApO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRHJhdyBTVkcgbGluayBiZXR3ZWVuIHRoZSB0d29cclxuICAgICAgICBpZiAodHJpZ2dlciAmJiBwYXJ0bmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1N5bmVyZ3lMaW5rKHRyaWdnZXIsIHBhcnRuZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlU3luZXJneVRyaWdnZXIobG9nKSB7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudHJpZ2dlckNoYXIsIGxvZy50cmlnZ2VyQ2hhclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHBhcnRuZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtKTtcclxuXHJcbiAgICAgICAgLy8gUGhhc2UgMTogVHJpZ2dlciBnbG93XHJcbiAgICAgICAgaWYgKHRyaWdnZXIpIHtcclxuICAgICAgICAgICAgdHJpZ2dlci5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LXRyaWdnZXItZ2xvdycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS10cmlnZ2VyLWdsb3cnKSwgMTgwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQaGFzZSAyOiBTVkcgbGluayBiZXR3ZWVuIHRyaWdnZXIgYW5kIHBhcnRuZXJcclxuICAgICAgICBpZiAodHJpZ2dlciAmJiBwYXJ0bmVyKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kcmF3U3luZXJneUxpbmsodHJpZ2dlciwgcGFydG5lciksIDQwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQaGFzZSAzOiBQYXJ0bmVyIHJlYWN0aW9uXHJcbiAgICAgICAgaWYgKHBhcnRuZXIpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0bmVyLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktcmVhY3QnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcGFydG5lci5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LXJlYWN0JyksIDgwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgaXQncyBhIGJvbnVzIGF0dGFjaywgYW5pbWF0ZSB0aGUgcGFydG5lciBhdHRhY2tpbmdcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuZGFtYWdlICE9PSB1bmRlZmluZWQgJiYgbG9nLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRuZXJLZXkgPSBgJHtsb2cucGFydG5lckNoYXJUZWFtfS0ke2xvZy5wYXJ0bmVyQ2hhcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShwYXJ0bmVyS2V5LCAnYXR0YWNrYW5pbWF0aW9uLndlYnAnLCAxMjAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2h1cnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnKSwgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdTeW5lcmd5TGluayhlbDEsIGVsMikge1xyXG4gICAgICAgIGNvbnN0IHN0YWdlID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmJhdHRsZS1zdGFnZScpO1xyXG4gICAgICAgIGlmICghc3RhZ2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGV4aXN0aW5nIFNWRyBpZiBhbnlcclxuICAgICAgICBjb25zdCBleGlzdGluZ1N2ZyA9IHN0YWdlLnF1ZXJ5U2VsZWN0b3IoJy5zeW5lcmd5LWxpbmstc3ZnJyk7XHJcbiAgICAgICAgaWYgKGV4aXN0aW5nU3ZnKSBleGlzdGluZ1N2Zy5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKTtcclxuICAgICAgICBzdmcuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1saW5rLXN2ZycpO1xyXG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpO1xyXG5cclxuICAgICAgICBjb25zdCBzdGFnZVJlY3QgPSBzdGFnZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCByZWN0MSA9IGVsMS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCByZWN0MiA9IGVsMi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgY29uc3QgeDEgPSByZWN0MS5sZWZ0ICsgcmVjdDEud2lkdGggLyAyIC0gc3RhZ2VSZWN0LmxlZnQ7XHJcbiAgICAgICAgY29uc3QgeTEgPSByZWN0MS50b3AgKyByZWN0MS5oZWlnaHQgLyAyIC0gc3RhZ2VSZWN0LnRvcDtcclxuICAgICAgICBjb25zdCB4MiA9IHJlY3QyLmxlZnQgKyByZWN0Mi53aWR0aCAvIDIgLSBzdGFnZVJlY3QubGVmdDtcclxuICAgICAgICBjb25zdCB5MiA9IHJlY3QyLnRvcCArIHJlY3QyLmhlaWdodCAvIDIgLSBzdGFnZVJlY3QudG9wO1xyXG5cclxuICAgICAgICBjb25zdCBsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdsaW5lJyk7XHJcbiAgICAgICAgbGluZS5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWxpbmstbGluZScpO1xyXG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd4MScsIHgxKTtcclxuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgneTEnLCB5MSk7XHJcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgeDIpO1xyXG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd5MicsIHkyKTtcclxuXHJcbiAgICAgICAgc3ZnLmFwcGVuZENoaWxkKGxpbmUpO1xyXG4gICAgICAgIHN0YWdlLmFwcGVuZENoaWxkKHN2Zyk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBhZnRlciBhbmltYXRpb25cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHN2Zy5yZW1vdmUoKSwgMTgwMCAvIHRoaXMuc3BlZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBTUFJJVEUgU1dBUCA9PT1cclxuXHJcbiAgICBzd2FwU3ByaXRlKGtleSwgc3ByaXRlTmFtZSwgZHVyYXRpb24pIHtcclxuICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICBpZiAoIWVsKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgc2x1ZyA9IHRoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XTtcclxuICAgICAgICBpZiAoIXNsdWcpIHJldHVybjtcclxuICAgICAgICBjb25zdCBpbWcgPSBlbC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLXNwcml0ZScpO1xyXG4gICAgICAgIGlmICghaW1nKSByZXR1cm47XHJcbiAgICAgICAgaW1nLnNyYyA9IGAvYXNzZXQvaW1nL2NvbWJhdC8ke3NsdWd9LyR7c3ByaXRlTmFtZX1gO1xyXG4gICAgICAgIGlmIChkdXJhdGlvbiA+IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucygnZGVhZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IGAvYXNzZXQvaW1nL2NvbWJhdC8ke3RoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XX0vZmlnaHRpZGxlLndlYnBgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBBTklNQVRJT05TIEVYSVNUQU5URVMgPT09XHJcblxyXG4gICAgYW5pbWF0ZUF0dGFjayhhdHRhY2tlck5hbWUsIGF0dGFja2VyVGVhbSwgdGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSwgaXNDcml0KSB7XHJcbiAgICAgICAgY29uc3QgYXR0YWNrZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoYXR0YWNrZXJOYW1lLCBhdHRhY2tlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGF0dGFja2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2F0dGFja2VyVGVhbX0tJHthdHRhY2tlck5hbWV9YDtcclxuICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKGtleSwgJ2F0dGFja2FuaW1hdGlvbi53ZWJwJywgMTIwMCk7XHJcbiAgICAgICAgICAgIGF0dGFja2VyLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2luZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGF0dGFja2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGFja2luZycpLCAxMjAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ3JpdCkgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NyaXQnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnLCAnY3JpdCcpLCA4MDApO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlSGVhbChoZWFsZXJOYW1lLCBoZWFsZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgaGVhbGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGhlYWxlck5hbWUsIGhlYWxlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGhlYWxlcikge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtoZWFsZXJUZWFtfS0ke2hlYWxlck5hbWV9YDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVySGFzSGVhbFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnaGVhbGluZy53ZWJwJywgMTUwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnc2tpbGwud2VicCcsIDE1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhlYWxlci5jbGFzc0xpc3QuYWRkKCdoZWFsaW5nJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaGVhbGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxpbmcnKSwgMTUwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdoZWFsZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaGVhbGVkJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRGVmZW5kKGRlZmVuZGVyTmFtZSwgZGVmZW5kZXJUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgZGVmZW5kZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoZGVmZW5kZXJOYW1lLCBkZWZlbmRlclRlYW0pO1xyXG4gICAgICAgIGlmIChkZWZlbmRlcikge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtkZWZlbmRlclRlYW19LSR7ZGVmZW5kZXJOYW1lfWA7XHJcbiAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShrZXksICdkZWZlbmRpbmcud2VicCcsIDE4MDApO1xyXG4gICAgICAgICAgICBkZWZlbmRlci5jbGFzc0xpc3QuYWRkKCdkZWZlbmRpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBkZWZlbmRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWZlbmRpbmcnKSwgMTgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEb2RnZSh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RvZGdpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZG9kZ2luZycpLCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlYXRoKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZGVhZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGFyYWN0ZXJFbGVtZW50KG5hbWUsIHRlYW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1tgJHt0ZWFtfS0ke25hbWV9YF07XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheUxvZyhsb2cpIHtcclxuICAgICAgICBpZiAoIXRoaXMubG9nQ29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGVudHJ5LmNsYXNzTmFtZSA9ICdjb21iYXQtbG9nX19lbnRyeSc7XHJcblxyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ3JvdW5kJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tcm91bmQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAndmljdG9yeScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXZpY3RvcnknKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnZHJhdycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWRlZmVhdCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdhYmlsaXR5X3VzZScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWFiaWxpdHknKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYmxlZWRfdGljaycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWJsZWVkJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsaWdodF90aWNrJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tYmxpZ2h0Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3N0dW5uZWRfc2tpcCcpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXN0dW4nKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAncmlwb3N0ZV9hY3RpdmF0ZScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXJpcG9zdGUnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnc3luZXJneV9hbm5vdW5jZScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXN5bmVyZ3ktYW5ub3VuY2UnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnc3luZXJneV90cmlnZ2VyJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tc3luZXJneS10cmlnZ2VyJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbnRyeS5pbm5lckhUTUwgPSBsb2cubWVzc2FnZTtcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsVG9wID0gdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUhlYWx0aEJhcnMobG9nKSB7XHJcbiAgICAgICAgbGV0IGNoYXJhY3Rlck5hbWUgPSBudWxsO1xyXG4gICAgICAgIGxldCB0ZWFtTmFtZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRIUCA9IG51bGw7XHJcbiAgICAgICAgbGV0IG1heEhQID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gRMOpdGVybWluZXIgbGVzIGRvbm7DqWVzIHNlbG9uIGxlIHR5cGUgZGUgbG9nXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAnYXR0YWNrJyB8fCBsb2cudHlwZSA9PT0gJ3JpcG9zdGVfYWN0aXZhdGUnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdoZWFsJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYmxlZWRfdGljaycgfHwgbG9nLnR5cGUgPT09ICdibGlnaHRfdGljaycpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2FiaWxpdHlfdXNlJykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnc3luZXJneV90cmlnZ2VyJykge1xyXG4gICAgICAgICAgICAvLyBTeW5lcmdpZXMgY2FuIGNhdXNlIGRhbWFnZVxyXG4gICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0SFAgIT09IHVuZGVmaW5lZCAmJiBsb2cudGFyZ2V0TWF4SFApIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBzaSBub3VzIGF2b25zIGxlcyBkb25uw6llcyBuw6ljZXNzYWlyZXNcclxuICAgICAgICBpZiAoY2hhcmFjdGVyTmFtZSAmJiB0ZWFtTmFtZSAmJiBjdXJyZW50SFAgIT09IG51bGwgJiYgY3VycmVudEhQICE9PSB1bmRlZmluZWQgJiYgbWF4SFApIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCBtYXhIUCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzKGxvZykge1xyXG4gICAgICAgIC8vIEFPRSBoaXRzIChibGlnaHRfYXR0YWNrKTogdXBkYXRlIEhQIGZvciBhbGwgaGl0IGVuZW1pZXNcclxuICAgICAgICBpZiAobG9nLmFsbEhpdHMpIHtcclxuICAgICAgICAgICAgbG9nLmFsbEhpdHMuZm9yRWFjaChoID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAoaC5uYW1lLCBoLnRlYW0sIGguaHAsIGgubWF4SHApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ29tcMOpdGVuY2VzIHF1aSBpbmZsaWdlbnQgZGVzIGTDqWfDonRzIMOgIHVuZSBjaWJsZVxyXG4gICAgICAgIGVsc2UgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldEhQICE9PSB1bmRlZmluZWQgJiYgbG9nLnRhcmdldE1heEhQKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy50YXJnZXRIUCwgbG9nLnRhcmdldE1heEhQKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNvaW4gZGUgZ3JvdXBlIDogbWV0dHJlIMOgIGpvdXIgY2hhcXVlIGFsbGnDqSBzb2lnbsOpXHJcbiAgICAgICAgaWYgKGxvZy5zdWJ0eXBlID09PSAncGFydHlfaGVhbCcgJiYgbG9nLmhlYWxlZCkge1xyXG4gICAgICAgICAgICBsb2cuaGVhbGVkLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGgubmFtZSwgaC50ZWFtLCBoLmhwLCBoLm1heEhwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTb2luIGQndXJnZW5jZSA6IG1ldHRyZSDDoCBqb3VyIGxlIGxhbmNldXJcclxuICAgICAgICBpZiAobG9nLnN1YnR5cGUgPT09ICdlbWVyZ2VuY3lfaGVhbCcgJiYgbG9nLmNhc3Rlcikge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0SFAsIGxvZy50YXJnZXRNYXhIUCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYXJhY3RlckhQKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsIG1heEhQKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IG1heEhQID4gMCA/IChjdXJyZW50SFAgLyBtYXhIUCkgKiAxMDAgOiAwO1xyXG5cclxuICAgICAgICAvLyBNaXNlIMOgIGpvdXIgZGUgbGEgYmFycmUgSFAgZGFucyBsYSB6b25lIGRlIGNvbWJhdCAoYmF0dGxlLXN0YWdlKVxyXG4gICAgICAgIGNvbnN0IGhwQmFyID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ocC1iYXJfX2ZpbGwnKTtcclxuICAgICAgICBjb25zdCBocFRleHQgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmhwLXRleHQnKTtcclxuXHJcbiAgICAgICAgaWYgKGhwQmFyKSB7XHJcbiAgICAgICAgICAgIC8vIEFuaW1hdGlvbiBmbHVpZGUgZGUgbGEgYmFycmVcclxuICAgICAgICAgICAgaHBCYXIuc3R5bGUudHJhbnNpdGlvbiA9IGB3aWR0aCAwLjNzIGVhc2Utb3V0YDtcclxuICAgICAgICAgICAgaHBCYXIuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50fSVgO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xhc3NlcyBkZSBjb3VsZXVyIHNlbG9uIGxlIHBvdXJjZW50YWdlXHJcbiAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hwLWJhcl9fZmlsbC0tbG93JywgJ2hwLWJhcl9fZmlsbC0tY3JpdGljYWwnKTtcclxuICAgICAgICAgICAgaWYgKHBlcmNlbnQgPD0gMjUpIHtcclxuICAgICAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5hZGQoJ2hwLWJhcl9fZmlsbC0tY3JpdGljYWwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwZXJjZW50IDw9IDUwKSB7XHJcbiAgICAgICAgICAgICAgICBocEJhci5jbGFzc0xpc3QuYWRkKCdocC1iYXJfX2ZpbGwtLWxvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaHBUZXh0KSB7XHJcbiAgICAgICAgICAgIGhwVGV4dC50ZXh0Q29udGVudCA9IGAke2N1cnJlbnRIUH0vJHttYXhIUH1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWlzZSDDoCBqb3VyIGRlcyBwYW5uZWF1eCBkJ2luZm8gbGF0w6lyYXV4XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbmZvUGFuZWwoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSW5mb1BhbmVsKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFApIHtcclxuICAgICAgICAvLyBUcm91dmVyIGxlIGJvbiBwYW5uZWF1IHNlbG9uIGwnw6lxdWlwZVxyXG4gICAgICAgIGNvbnN0IHBhbmVsQ2xhc3MgPSB0ZWFtTmFtZSA9PT0gJ0VxdWlwZSAxJyA/ICcuaW5mby1wYW5lbC0tdGVhbTEnIDogJy5pbmZvLXBhbmVsLS10ZWFtMic7XHJcbiAgICAgICAgY29uc3QgcGFuZWwgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKHBhbmVsQ2xhc3MpO1xyXG5cclxuICAgICAgICBpZiAoIXBhbmVsKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIFRyb3V2ZXIgbGUgcGVyc29ubmFnZSBkYW5zIGxlIHBhbm5lYXUgcGFyIHNvbiBub21cclxuICAgICAgICBjb25zdCBjaGFyYWN0ZXJJbmZvcyA9IHBhbmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGFyYWN0ZXItaW5mbycpO1xyXG4gICAgICAgIGZvciAoY29uc3QgaW5mbyBvZiBjaGFyYWN0ZXJJbmZvcykge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lRWwgPSBpbmZvLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fbmFtZScpO1xyXG4gICAgICAgICAgICBpZiAobmFtZUVsICYmIG5hbWVFbC50ZXh0Q29udGVudC50cmltKCkgPT09IGNoYXJhY3Rlck5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRzU3BhbiA9IGluZm8ucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19zdGF0cyBzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHNTcGFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNTcGFuLnRleHRDb250ZW50ID0gY3VycmVudEhQO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBBbmltYXRpb24gZmxhc2ggcG91ciBtb250cmVyIGxlIGNoYW5nZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBzdGF0c1NwYW4uY2xhc3NMaXN0LmFkZCgnaHAtdXBkYXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc3RhdHNTcGFuLmNsYXNzTGlzdC5yZW1vdmUoJ2hwLXVwZGF0ZWQnKSwgMzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dWaWN0b3J5T3ZlcmxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaW5hbGlzZXIgbGUgTU1SIGEgbGEgZmluIGR1IGNvbWJhdFxyXG4gICAgICAgIHRoaXMuZmluYWxpemVSYXRpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5hbGl6ZVJhdGluZygpIHtcclxuICAgICAgICBjb25zdCBmaW5hbGl6ZVVybCA9IHRoaXMuY29udGFpbmVyLmRhdGFzZXQuZmluYWxpemVVcmw7XHJcbiAgICAgICAgaWYgKCFmaW5hbGl6ZVVybCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBmZXRjaChmaW5hbGl6ZVVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICYmIGRhdGEucmF0aW5nQ2hhbmdlICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSYXRpbmdVcGRhdGUoZGF0YS5yYXRpbmdDaGFuZ2UsIGRhdGEubmV3UmF0aW5nLCBkYXRhLm5ld1JhdGluZzIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBmaW5hbGlzYXRpb24gcmF0aW5nOicsIGVycikpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dSYXRpbmdVcGRhdGUoY2hhbmdlLCBuZXdSYXRpbmcsIG5ld1JhdGluZzIpIHtcclxuICAgICAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIE1NUiBhZmZpY2hlIGRhbnMgbGUgcGFubmVhdSBqb3VldXIgKEVxdWlwZSAxKVxyXG4gICAgICAgIGNvbnN0IHJhdGluZ0VsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0xIC5pbmZvLXBhbmVsX19yYXRpbmcnKTtcclxuICAgICAgICBpZiAocmF0aW5nRWwgJiYgbmV3UmF0aW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7bmV3UmF0aW5nfSBNTVJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIGEgam91ciBsZSBNTVIgYWZmaWNoZSBkYW5zIGxlIHBhbm5lYXUgYWR2ZXJzYWlyZSAoRXF1aXBlIDIpXHJcbiAgICAgICAgY29uc3QgcmF0aW5nRWwyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0yIC5pbmZvLXBhbmVsX19yYXRpbmctLWVuZW15Jyk7XHJcbiAgICAgICAgaWYgKHJhdGluZ0VsMiAmJiBuZXdSYXRpbmcyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsMi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke25ld1JhdGluZzJ9IE1NUmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZmZpY2hlciBsYSBub3RpZmljYXRpb24gZGUgY2hhbmdlbWVudCBkYW5zIGwnb3ZlcmxheVxyXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtb3ZlcmxheV0nKTtcclxuICAgICAgICBpZiAob3ZlcmxheSkge1xyXG4gICAgICAgICAgICBjb25zdCB3aW5uZXJEaXYgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGUtc3RhZ2VfX3dpbm5lcicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hhbmdlbWVudCBNTVIgRXF1aXBlIDFcclxuICAgICAgICAgICAgY29uc3Qgbm90aWYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG5vdGlmMS5jbGFzc05hbWUgPSAncmF0aW5nLWNoYW5nZSc7XHJcbiAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZToxLjJyZW07bWFyZ2luLXRvcDoxMnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMS50ZXh0Q29udGVudCA9IGNoYW5nZSA+IDAgPyBgRXF1aXBlIDEgOiArJHtjaGFuZ2V9IE1NUmAgOiBgRXF1aXBlIDEgOiAke2NoYW5nZX0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYxLnN0eWxlLmNvbG9yID0gY2hhbmdlID4gMCA/ICcjNGNhZjUwJyA6ICcjZjQ0MzM2JztcclxuICAgICAgICAgICAgd2lubmVyRGl2LmFwcGVuZENoaWxkKG5vdGlmMSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGFuZ2VtZW50IE1NUiBFcXVpcGUgMiAoaW52ZXJzZSlcclxuICAgICAgICAgICAgY29uc3QgY2hhbmdlMiA9IC1jaGFuZ2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBub3RpZjIuY2xhc3NOYW1lID0gJ3JhdGluZy1jaGFuZ2UnO1xyXG4gICAgICAgICAgICBub3RpZjIuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MS4ycmVtO21hcmdpbi10b3A6NnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMi50ZXh0Q29udGVudCA9IGNoYW5nZTIgPiAwID8gYEVxdWlwZSAyIDogKyR7Y2hhbmdlMn0gTU1SYCA6IGBFcXVpcGUgMiA6ICR7Y2hhbmdlMn0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYyLnN0eWxlLmNvbG9yID0gY2hhbmdlMiA+IDAgPyAnIzRjYWY1MCcgOiAnI2Y0NDMzNic7XHJcbiAgICAgICAgICAgIHdpbm5lckRpdi5hcHBlbmRDaGlsZChub3RpZjIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3RpZjEuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gQVVESU8gPT09XHJcblxyXG4gICAgcGxheU5leHRUcmFjaygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXVkaW9VbmxvY2tlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb21iYXRNdXNpYykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbWJhdE11c2ljLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tYmF0TXVzaWMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5nZXRSYW5kb21UcmFja0luZGV4KCk7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG5ldyBBdWRpbyh0aGlzLmNvbWJhdFBsYXlsaXN0W2lkeF0pO1xyXG4gICAgICAgIHRoaXMuY29tYmF0TXVzaWMudm9sdW1lID0gdGhpcy5pc011dGVkID8gMCA6IHRoaXMudm9sdW1lO1xyXG4gICAgICAgIHRoaXMuY29tYmF0TXVzaWMuYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB0aGlzLnBsYXlOZXh0VHJhY2soKSk7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYy5wbGF5KCkuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJhbmRvbVRyYWNrSW5kZXgoKSB7XHJcbiAgICAgICAgbGV0IGk7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5jb21iYXRQbGF5bGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIH0gd2hpbGUgKGkgPT09IHRoaXMubGFzdFRyYWNrSW5kZXggJiYgdGhpcy5jb21iYXRQbGF5bGlzdC5sZW5ndGggPiAxKTtcclxuICAgICAgICB0aGlzLmxhc3RUcmFja0luZGV4ID0gaTtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVNdXRlKCkge1xyXG4gICAgICAgIHRoaXMuaXNNdXRlZCA9ICF0aGlzLmlzTXV0ZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tYmF0TXVzaWMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21iYXRNdXNpYy52b2x1bWUgPSB0aGlzLmlzTXV0ZWQgPyAwIDogdGhpcy52b2x1bWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm11dGVCdG4pIHtcclxuICAgICAgICAgICAgY29uc3QgaWNvbiA9IHRoaXMubXV0ZUJ0bi5xdWVyeVNlbGVjdG9yKCdpJyk7XHJcbiAgICAgICAgICAgIGlmIChpY29uKSB7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTmFtZSA9IHRoaXMuaXNNdXRlZCA/ICdmYXMgZmEtdm9sdW1lLW11dGUnIDogJ2ZhcyBmYS12b2x1bWUtdXAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnZvbHVtZVNsaWRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnZvbHVtZVNsaWRlci5kaXNhYmxlZCA9IHRoaXMuaXNNdXRlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUGxheUJ1dHRvbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheUJ0bikgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcgJiYgIXRoaXMuaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gJ1BhdXNlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gJ1Rlcm1pbsOpJztcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSB0aGlzLmN1cnJlbnRJbmRleCA+IDAgPyAnUmVwcmVuZHJlJyA6ICdMYW5jZXInO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gSW5pdGlhbGlzZXIgcXVhbmQgbGUgRE9NIGVzdCBwcsOqdFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgY29tYmF0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LWxvZ3NdJyk7XHJcbiAgICBpZiAoY29tYmF0Q29udGFpbmVyKSB7XHJcbiAgICAgICAgbmV3IENvbWJhdENvbnRyb2xsZXIoY29tYmF0Q29udGFpbmVyKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21iYXRDb250cm9sbGVyO1xyXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBGUklFTkQgU1lTVEVNXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYudGV4dENvbnRlbnQgPSBzdHI7XHJcbiAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtdG9nZ2xlXScpO1xyXG4gICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXBhbmVsXScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWJhY2tkcm9wXScpO1xyXG4gICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNsb3NlXScpO1xyXG4gICAgY29uc3QgYmFkZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWJhZGdlXScpO1xyXG5cclxuICAgIGlmICghdG9nZ2xlIHx8ICFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgIGxldCBwYW5lbE9wZW4gPSBmYWxzZTtcclxuICAgIGxldCBjdXJyZW50VGFiID0gJ2ZyaWVuZHMnO1xyXG4gICAgbGV0IGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSBudWxsO1xyXG4gICAgbGV0IGxhc3RNZXNzYWdlSWQgPSAwO1xyXG4gICAgbGV0IG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgbGV0IHVucmVhZFBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICBsZXQgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHJlcXVlc3RzTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBQQU5FTCBPUEVOL0NMT1NFXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIG9wZW5QYW5lbCgpIHtcclxuICAgICAgICBwYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHBhbmVsLm9mZnNldEhlaWdodDsgLy8gcmVmbG93XHJcbiAgICAgICAgcGFuZWwuY2xhc3NMaXN0LmFkZCgnZnJpZW5kcy1wYW5lbC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ2ZyaWVuZHMtcGFuZWxfX2JhY2tkcm9wLS1vcGVuJyk7XHJcbiAgICAgICAgcGFuZWxPcGVuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCFmcmllbmRzTG9hZGVkKSB7XHJcbiAgICAgICAgICAgIGxvYWRGcmllbmRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUGFuZWwoKSB7XHJcbiAgICAgICAgcGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnZnJpZW5kcy1wYW5lbC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2ZyaWVuZHMtcGFuZWxfX2JhY2tkcm9wLS1vcGVuJyk7XHJcbiAgICAgICAgcGFuZWxPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwYW5lbE9wZW4gPyBjbG9zZVBhbmVsKCkgOiBvcGVuUGFuZWwoKSk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUGFuZWwpO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBhbmVsKTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFRBQlNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZnJpZW5kcy10YWJdJykuZm9yRWFjaCh0YWJCdG4gPT4ge1xyXG4gICAgICAgIHRhYkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFiTmFtZSA9IHRhYkJ0bi5kYXRhc2V0LmZyaWVuZHNUYWI7XHJcbiAgICAgICAgICAgIHN3aXRjaFRhYih0YWJOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXRjaFRhYih0YWJOYW1lKSB7XHJcbiAgICAgICAgY3VycmVudFRhYiA9IHRhYk5hbWU7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZyaWVuZHMtdGFiXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ2ZyaWVuZHMtcGFuZWxfX3RhYi0tYWN0aXZlJywgYnRuLmRhdGFzZXQuZnJpZW5kc1RhYiA9PT0gdGFiTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYi1jb250ZW50XScpLmZvckVhY2goY29udGVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IGNvbnRlbnQuZGF0YXNldC50YWJDb250ZW50ID09PSB0YWJOYW1lID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX3RhYnMnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19jb250ZW50Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jb252ZXJzYXRpb25dJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKHRhYk5hbWUgPT09ICdmcmllbmRzJyAmJiAhZnJpZW5kc0xvYWRlZCkgbG9hZEZyaWVuZHMoKTtcclxuICAgICAgICBpZiAodGFiTmFtZSA9PT0gJ3JlcXVlc3RzJyAmJiAhcmVxdWVzdHNMb2FkZWQpIGxvYWRSZXF1ZXN0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTE9BRCBGUklFTkRTIExJU1RcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gbG9hZEZyaWVuZHMoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGFiLWNvbnRlbnQ9XCJmcmllbmRzXCJdJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gQ2hhcmdlbWVudC4uLjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy9saXN0Jywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZyaWVuZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj48aSBjbGFzcz1cImZhcyBmYS1naG9zdFwiPjwvaT4gQXVjdW4gY29tcGFnbm9uLi4uIExlIGRvbmpvbiBlc3Qgc29saXRhaXJlLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gZGF0YS5mcmllbmRzLm1hcChmID0+IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiIGRhdGEtZnJpZW5kLXVzZXItaWQ9XCIke2YudXNlcklkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7Zi5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKGYucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwoZi51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKGYudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcHJldmlld1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtmLmxhc3RNZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoZi5sYXN0TWVzc2FnZS5pc0Zyb21NZSA/ICdWb3VzOiAnIDogJycpICsgZXNjYXBlSHRtbChmLmxhc3RNZXNzYWdlLmNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnQXVjdW4gbWVzc2FnZSd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19yYXRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7Zi5yYXRpbmd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mcmllbmQtaXRlbScpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9IHBhcnNlSW50KGl0ZW0uZGF0YXNldC5mcmllbmRVc2VySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmQtaXRlbV9fbmFtZScpLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Db252ZXJzYXRpb24odXNlcklkLCBuYW1lKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBMT0FEIFBFTkRJTkcgUkVRVUVTVFNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gbG9hZFJlcXVlc3RzKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRhYi1jb250ZW50PVwicmVxdWVzdHNcIl0nKTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19sb2FkaW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBDaGFyZ2VtZW50Li4uPC9kaXY+JztcclxuXHJcbiAgICAgICAgZmV0Y2goJy9mcmllbmRzL3BlbmRpbmcnLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICByZXF1ZXN0c0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlcXVlc3RzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+QXVjdW5lIGRlbWFuZGUgZW4gYXR0ZW50ZTwvcD4nO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gZGF0YS5yZXF1ZXN0cy5tYXAociA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIiBkYXRhLXJlcXVlc3QtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ci5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKHIucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwoci51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKHIudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcHJldmlld1wiPiR7ZXNjYXBlSHRtbChyLmRhdGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2FjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tYWNjZXB0XCIgZGF0YS1hY2NlcHQtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2tcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1yZWplY3RcIiBkYXRhLXJlamVjdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWNjZXB0LWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVSZXF1ZXN0KGJ0bi5kYXRhc2V0LmFjY2VwdElkLCAnYWNjZXB0Jyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmVqZWN0LWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVSZXF1ZXN0KGJ0bi5kYXRhc2V0LnJlamVjdElkLCAncmVqZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5FcnJldXIgZGUgY2hhcmdlbWVudDwvcD4nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3QoZnJpZW5kc2hpcElkLCBhY3Rpb24pIHtcclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvJHthY3Rpb259LyR7ZnJpZW5kc2hpcElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBmcmllbmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0c0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbG9hZFJlcXVlc3RzKCk7XHJcbiAgICAgICAgICAgICAgICBmZXRjaFVucmVhZENvdW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFNFQVJDSCBVU0VSU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtc2VhcmNoLWlucHV0XScpO1xyXG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtc2VhcmNoLXJlc3VsdHNdJyk7XHJcbiAgICBsZXQgc2VhcmNoVGltZW91dCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHNlYXJjaElucHV0KSB7XHJcbiAgICAgICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChzZWFyY2hUaW1lb3V0KTtcclxuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBzZWFyY2hJbnB1dC52YWx1ZS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocXVlcnkubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmV0Y2goYC9mcmllbmRzL3NlYXJjaD9xPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KX1gLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudXNlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5BdWN1biBndWVycmllciB0cm91dmU8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSBkYXRhLnVzZXJzLm1hcCh1ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGlvbkh0bWwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAnYWNjZXB0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+QW1pPC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdwZW5kaW5nX3NlbnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+RW52b3llZTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAncGVuZGluZ19yZWNlaXZlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5SZWN1ZTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9IGA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1hZGRcIiBkYXRhLWFkZC1mcmllbmQtaWQ9XCIke3UudXNlcklkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsdXNcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHt1LnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwodS5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbCh1LnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwodS51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19yYXRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7dS5yYXRpbmd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYWN0aW9uc1wiPiR7YWN0aW9uSHRtbH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFkZC1mcmllbmQtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRGcmllbmRSZXF1ZXN0KGJ0bi5kYXRhc2V0LmFkZEZyaWVuZElkLCBidG4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRGcmllbmRSZXF1ZXN0KHVzZXJJZCwgYnRuKSB7XHJcbiAgICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvcmVxdWVzdC8ke3VzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgYnRuLm91dGVySFRNTCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPkVudm95ZWU8L3NwYW4+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4geyBidG4uZGlzYWJsZWQgPSBmYWxzZTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVwb3J0TWVzc2FnZUFjdGlvbihtZXNzYWdlSWQsIGJ0bikge1xyXG4gICAgICAgIGNvbnN0IHJlYXNvbiA9IHByb21wdCgnUmFpc29uIGR1IHNpZ25hbGVtZW50IDonKTtcclxuICAgICAgICBpZiAocmVhc29uID09PSBudWxsKSByZXR1cm47IC8vIGNhbmNlbGxlZFxyXG5cclxuICAgICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke21lc3NhZ2VJZH0vcmVwb3J0YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHJlYXNvbjogcmVhc29uIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgYnRuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1jaGVja1wiPjwvaT4nO1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2NoYXQtbWVzc2FnZV9fcmVwb3J0LS1kb25lJyk7XHJcbiAgICAgICAgICAgICAgICBidG4udGl0bGUgPSAnU2lnbmFsZSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgYnRuLmRpc2FibGVkID0gZmFsc2U7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gQ09OVkVSU0FUSU9OXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIG9wZW5Db252ZXJzYXRpb24odXNlcklkLCB1c2VybmFtZSkge1xyXG4gICAgICAgIGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgICAgbGFzdE1lc3NhZ2VJZCA9IDA7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX190YWJzJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fY29udGVudCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgY29uc3QgY29udkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jb252ZXJzYXRpb25dJyk7XHJcbiAgICAgICAgY29udkVsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1uYW1lXScpLnRleHRDb250ZW50ID0gdXNlcm5hbWU7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1tZXNzYWdlc10nKTtcclxuICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gQ2hhcmdlbWVudC4uLjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke3VzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhkYXRhLm1lc3NhZ2VzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHN0YXJ0TWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJNZXNzYWdlcyhtZXNzYWdlcywgYXBwZW5kKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1tZXNzYWdlc10nKTtcclxuXHJcbiAgICAgICAgaWYgKCFhcHBlbmQpIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkRlYnV0IGRlIGxhIGNvbnZlcnNhdGlvbi4gRW52b3lleiBsZSBwcmVtaWVyIG1lc3NhZ2UhPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaSBvbiBham91dGUgZGVzIG1lc3NhZ2VzIGV0IHF1ZSBsZSBjb250ZW5ldXIgYWZmaWNoZSBsZSBwbGFjZWhvbGRlciwgbGUgc3VwcHJpbWVyXHJcbiAgICAgICAgaWYgKGFwcGVuZCAmJiBtZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gbWVzc2FnZXNFbC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fZW1wdHknKTtcclxuICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyKSBwbGFjZWhvbGRlci5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1lc3NhZ2VzLmZvckVhY2gobXNnID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5pZCA+IGxhc3RNZXNzYWdlSWQpIGxhc3RNZXNzYWdlSWQgPSBtc2cuaWQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NoYXQtbWVzc2FnZScsIG1zZy5pc0Zyb21NZSA/ICdjaGF0LW1lc3NhZ2UtLW1pbmUnIDogJ2NoYXQtbWVzc2FnZS0tdGhlaXJzJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVwb3J0QnRuID0gJyc7XHJcbiAgICAgICAgICAgIGlmICghbXNnLmlzRnJvbU1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnRCdG4gPSBgPGJ1dHRvbiBjbGFzcz1cImNoYXQtbWVzc2FnZV9fcmVwb3J0XCIgZGF0YS1yZXBvcnQtbXNnLWlkPVwiJHttc2cuaWR9XCIgdGl0bGU9XCJTaWduYWxlciBjZSBtZXNzYWdlXCI+PGkgY2xhc3M9XCJmYXMgZmEtZmxhZ1wiPjwvaT48L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgJHtlc2NhcGVIdG1sKG1zZy5jb250ZW50KX1cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hhdC1tZXNzYWdlX190aW1lXCI+JHtlc2NhcGVIdG1sKG1zZy5kYXRlKX0gJHtyZXBvcnRCdG59PC9zcGFuPlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgLy8gQXR0YWNoIHJlcG9ydCBoYW5kbGVyXHJcbiAgICAgICAgICAgIGNvbnN0IHJlcG9ydEVsID0gZGl2LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlcG9ydC1tc2ctaWRdJyk7XHJcbiAgICAgICAgICAgIGlmIChyZXBvcnRFbCkge1xyXG4gICAgICAgICAgICAgICAgcmVwb3J0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0TWVzc2FnZUFjdGlvbihyZXBvcnRFbC5kYXRhc2V0LnJlcG9ydE1zZ0lkLCByZXBvcnRFbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWVzc2FnZXNFbC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtZXNzYWdlc0VsLnNjcm9sbFRvcCA9IG1lc3NhZ2VzRWwuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlbmQgbWVzc2FnZVxyXG4gICAgY29uc3Qgc2VuZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1zZW5kXScpO1xyXG4gICAgY29uc3QgaW5wdXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1pbnB1dF0nKTtcclxuXHJcbiAgICBpZiAoc2VuZEJ0biAmJiBpbnB1dEVsKSB7XHJcbiAgICAgICAgc2VuZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbmRNZXNzYWdlKTtcclxuICAgICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHNlbmRNZXNzYWdlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VuZE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IGlucHV0RWwudmFsdWUudHJpbSgpO1xyXG4gICAgICAgIGlmICghY29udGVudCB8fCAhY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpbnB1dEVsLnZhbHVlID0gJyc7XHJcblxyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke2N1cnJlbnRDb252ZXJzYXRpb25Vc2VySWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNvbnRlbnQ6IGNvbnRlbnQgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICYmIGRhdGEubWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyTWVzc2FnZXMoW2RhdGEubWVzc2FnZV0sIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQmFjayBidXR0b25cclxuICAgIGNvbnN0IGJhY2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tYmFja10nKTtcclxuICAgIGlmIChiYWNrQnRuKSB7XHJcbiAgICAgICAgYmFja0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgICAgICBmcmllbmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaFRhYignZnJpZW5kcycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTUVTU0FHRSBQT0xMSU5HIChldmVyeSA1cyB3aGVuIGNvbnZlcnNhdGlvbiBvcGVuKVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBzdGFydE1lc3NhZ2VQb2xsaW5nKCkge1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7Y3VycmVudENvbnZlcnNhdGlvblVzZXJJZH0/YWZ0ZXJJZD0ke2xhc3RNZXNzYWdlSWR9YCwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5tZXNzYWdlcyAmJiBkYXRhLm1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhkYXRhLm1lc3NhZ2VzLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RvcE1lc3NhZ2VQb2xsaW5nKCkge1xyXG4gICAgICAgIGlmIChtZXNzYWdlUG9sbGluZ0ludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobWVzc2FnZVBvbGxpbmdJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFVOUkVBRCBDT1VOVCBQT0xMSU5HIChldmVyeSAzMHMsIGFsd2F5cyBhY3RpdmUpXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGZldGNoVW5yZWFkQ291bnQoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9mcmllbmRzL3VucmVhZC1jb3VudCcsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnRvdGFsID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UudGV4dENvbnRlbnQgPSBkYXRhLnRvdGFsO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdHNCYWRnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlcXVlc3RzLWJhZGdlXScpO1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdHNCYWRnZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucGVuZGluZ1JlcXVlc3RzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2UudGV4dENvbnRlbnQgPSBkYXRhLnBlbmRpbmdSZXF1ZXN0cztcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIGZldGNoVW5yZWFkQ291bnQoKTtcclxuICAgIHVucmVhZFBvbGxpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKGZldGNoVW5yZWFkQ291bnQsIDMwMDAwKTtcclxufSk7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJlc2NhcGVIdG1sIiwic3RyIiwiZGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVUZXh0Tm9kZSIsImlubmVySFRNTCIsImFkZEV2ZW50TGlzdGVuZXIiLCJidXJnZXIiLCJxdWVyeVNlbGVjdG9yIiwibmF2IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiU1RBVF9NQVgiLCJkbWciLCJzcGVlZCIsImRvZGdlIiwiY3JpdCIsImhwIiwicG9ydHJhaXRzIiwicXVlcnlTZWxlY3RvckFsbCIsImRldGFpbHMiLCJnZXRFbGVtZW50QnlJZCIsInNlbGVjdGVkTGlzdCIsImxhdW5jaEJ0biIsImxlbmd0aCIsIm1heFNlbGVjdGlvbiIsInNlbGVjdGVkSGVyb2VzIiwic2VsZWN0ZWRIZXJvSWRzIiwiZ2V0Q2F0ZWdvcnkiLCJwb3J0cmFpdCIsImRhdGFzZXQiLCJjYXRlZ29yeSIsImdldFNlbGVjdGVkUm9sZXMiLCJyb2xlcyIsIlRhbmsiLCJEUFMiLCJIZWFsZXIiLCJTdXBwb3J0IiwiZm9yRWFjaCIsImlkIiwicCIsIkFycmF5IiwiZnJvbSIsImZpbmQiLCJwcCIsImNhdCIsImNhblNlbGVjdFJvbGUiLCJwb3J0cmFpdEVsIiwicmVtb3ZlIiwiYWRkIiwibmFtZSIsInJvbGUiLCJkbWdNaW4iLCJOdW1iZXIiLCJkbWdNYXgiLCJzcHJpdGVGaWxlIiwic3ByaXRlIiwiYWJpbGl0eU5hbWUiLCJhYmlsaXR5RGVzYyIsImFiaWxpdHlDZCIsInNwcml0ZVBhdGgiLCJjb25jYXQiLCJpc1NlbGVjdGVkIiwiaW5jbHVkZXMiLCJhYmlsaXR5SHRtbCIsImNoYXJTeW5lcmdpZXMiLCJzeW5lcmd5TWFwIiwic3luZXJneUh0bWwiLCJtYXAiLCJzIiwicGFydG5lciIsImRlc2MiLCJqb2luIiwiTWF0aCIsIm1pbiIsImJ0blJpZ2h0Iiwicm9sZUNhdCIsImFscmVhZHlTZWxlY3RlZCIsImRpc2FibGVkIiwidGV4dENvbnRlbnQiLCJmaWx0ZXIiLCJoaWQiLCJoIiwiYWxlcnQiLCJwdXNoIiwidXBkYXRlU2VsZWN0ZWRUZWFtIiwidGVhbXNQYWdlRWwiLCJKU09OIiwicGFyc2UiLCJoZXJvIiwiaGVyb0VsIiwidXBkYXRlUm9sZUluZGljYXRvcnMiLCJ1cGRhdGVTeW5lcmd5SGlnaGxpZ2h0cyIsInRlYW1Db21wbGV0ZSIsImJhZGdlIiwic2VsZWN0ZWROYW1lcyIsIkJvb2xlYW4iLCJhY3RpdmVTeW5lcmdpZXMiLCJzZWVuUGFpcnMiLCJTZXQiLCJzeW5lcmdpZXMiLCJzeW4iLCJwYWlyS2V5Iiwic29ydCIsImhhcyIsIm5hbWUxIiwibmFtZTIiLCJzeW5lcmd5TmFtZSIsInBOYW1lIiwibWF0Y2hpbmciLCJjbGFzc05hbWUiLCJ0aXRsZSIsInVwZGF0ZVN5bmVyZ3lEaXNwbGF5IiwiY29udGFpbmVyIiwiYWN0aW9ucyIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJpbmRpY2F0b3IiLCJzbG90Iiwic2F2ZVByZXNldEJ0biIsInByZXNldE1vZGFsIiwicHJlc2V0TmFtZUlucHV0IiwicHJlc2V0Q29uZmlybUJ0biIsInByZXNldENhbmNlbEJ0biIsInVwZGF0ZVNhdmVQcmVzZXRCdG4iLCJvcmlnaW5hbFVwZGF0ZVNlbGVjdGVkVGVhbSIsIl9vcmlnVXBkYXRlIiwiX29yaWdSb2xlSW5kaWNhdG9ycyIsInZhbHVlIiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsImZvY3VzIiwidHJpbSIsImJvcmRlckNvbG9yIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsInN0cmluZ2lmeSIsImNoYXJhY3RlcklkcyIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsInN1Y2Nlc3MiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImVycm9yIiwiZSIsImtleSIsImNsaWNrIiwibG9hZFByZXNldCIsImlkU3RyIiwiU3RyaW5nIiwiZGVsZXRlUHJlc2V0IiwicHJlc2V0SWQiLCJjaGlwRWwiLCJjb25maXJtIiwibGlzdCIsImNoaWxkcmVuIiwiX2RvY3VtZW50JHF1ZXJ5U2VsZWN0IiwiY2hpcCIsImNoYXJJZHMiLCJwcmVzZXRJZHMiLCJzdG9wUHJvcGFnYXRpb24iLCJzZWxlY3RlZExpc3RPYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiY2hpbGRMaXN0IiwiaSIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlc3BvbnNlIiwicmVkaXJlY3RlZCIsImhyZWYiLCJ1cmwiLCJwb3B1cCIsImJhY2tkcm9wIiwiY2xvc2VCdG4iLCJjb250ZW50IiwibG9hZGVkIiwib3BlblBvcHVwIiwib2Zmc2V0SGVpZ2h0IiwiZmV0Y2hQcm9maWxlIiwiY2xvc2VQb3B1cCIsInJlbmRlclByb2ZpbGUiLCJyZXN1bHRDbGFzcyIsInIiLCJyZXN1bHRMYWJlbCIsImF2YXRhckh0bWwiLCJwcm9maWxlSW1hZ2UiLCJ1c2VybmFtZSIsImh0bWwiLCJtb3R0byIsImJpbyIsInJhdGluZyIsInN0YXRzIiwid2lucyIsImxvc3NlcyIsIndpblJhdGUiLCJmYXZvcml0ZUNoYXJhY3RlciIsImdhbWVzUGxheWVkIiwibGFzdFRlYW0iLCJjIiwicmVjZW50QmF0dGxlcyIsImIiLCJwYXJzZUludCIsInJlc3VsdCIsIm9wcG9uZW50IiwibWF0Y2hUeXBlIiwidG9VcHBlckNhc2UiLCJkYXRlIiwiQ29tYmF0Q29udHJvbGxlciIsIl9jbGFzc0NhbGxDaGVjayIsImxvZ3MiLCJjdXJyZW50SW5kZXgiLCJpc1BsYXlpbmciLCJpc1BhdXNlZCIsImNoYXJhY3RlckVsZW1lbnRzIiwiY2hhcmFjdGVyTWF4SFAiLCJpbml0IiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJsb2dzRGF0YSIsImNvbWJhdExvZ3MiLCJjb25zb2xlIiwibG9nQ29udGFpbmVyIiwib3ZlcmxheSIsInBsYXlCdG4iLCJza2lwQnRuIiwic3BlZWRCdG5zIiwiY2hhcmFjdGVyU2x1Z3MiLCJjaGFyYWN0ZXJIYXNIZWFsIiwiYWJpbGl0eUNvb2xkb3ducyIsImNoYXJhY3RlclN0YXR1c2VzIiwiZWwiLCJjaGFyYWN0ZXJOYW1lIiwidGVhbSIsImNoYXJhY3RlclRlYW0iLCJjaGFyYWN0ZXJTbHVnIiwiaGFzSGVhbCIsImhwVGV4dCIsIm1hdGNoIiwiY3JlYXRlRW1wdHlTdGF0dXNlcyIsImFiaWxpdHlFbGVtZW50cyIsImNoYXJOYW1lIiwiY2hhclRlYW0iLCJhYmlsaXR5RWwiLCJtYXhDZCIsImFiaWxpdHlNYXhDZCIsIm5hbWVFbCIsImljb25FbCIsIm9wYWNpdHkiLCJhdWRpb1VubG9ja2VkIiwiY29tYmF0TXVzaWMiLCJsYXN0VHJhY2tJbmRleCIsImlzTXV0ZWQiLCJ2b2x1bWUiLCJjb21iYXRQbGF5bGlzdCIsIm11dGVCdG4iLCJ2b2x1bWVTbGlkZXIiLCJiaW5kRXZlbnRzIiwicGxheSIsImJsZWVkaW5nIiwiYmxpZ2h0ZWQiLCJzdHVubmVkIiwibWFya2VkIiwic3RlYWx0aGVkIiwicmlwb3N0ZSIsImRtZ1VwIiwic3BkVXAiLCJkb2RnZVVwIiwiY3JpdFVwIiwidXBkYXRlQ2hhcmFjdGVyU3RhdHVzZXMiLCJsb2ciLCJ0eXBlIiwidGlja1JvdW5kU3RhdHVzZXMiLCJoYW5kbGVBYmlsaXR5U3RhdHVzQ2hhbmdlIiwic2V0U3RhdHVzIiwidGFyZ2V0IiwidGFyZ2V0VGVhbSIsImR1cmF0aW9uIiwidHVybnNSZW1haW5pbmciLCJ1bmRlZmluZWQiLCJhdHRhY2tlciIsImF0dGFja2VyVGVhbSIsImhhbmRsZVN5bmVyZ3lTdGF0dXNDaGFuZ2UiLCJjbGVhckFsbFN0YXR1c2VzIiwicmVuZGVyQWxsU3RhdHVzSWNvbnMiLCJzdWJ0eXBlIiwiYmxlZWRUdXJucyIsImFsbEhpdHMiLCJwcmltYXJ5IiwiaXNQcmltYXJ5IiwiYmxpZ2h0VHVybnMiLCJtYXJrVHVybnMiLCJjYXN0ZXIiLCJjYXN0ZXJUZWFtIiwicmlwb3N0ZVR1cm5zIiwiYXBwbHlCdWZmU3RhdHVzZXMiLCJidWZmcyIsImJ1ZmZEdXJhdGlvbiIsImFwcGx5VGVhbUJ1ZmZTdGF0dXNlcyIsInN0ZWFsdGhUdXJucyIsInByb3RlY3RUdXJucyIsInNlbGZCbGVlZFR1cm5zIiwidEtleSIsIl90aGlzMiIsImVmZmVjdFR5cGUiLCJwYXJ0bmVyQ2hhciIsInBhcnRuZXJDaGFyVGVhbSIsImdyYW50ZWRUdXJucyIsImJ1ZmZUeXBlcyIsInN0YXR1c0tleSIsImJ1ZmZUeXBlVG9TdGF0dXNLZXkiLCJkb2RnZUR1cmF0aW9uIiwiZXh0cmFUdXJucyIsInRlYW1OYW1lIiwiZGFtYWdlIiwibWF4IiwiX2kiLCJfT2JqZWN0JGtleXMiLCJPYmplY3QiLCJrZXlzIiwic3RhcnRzV2l0aCIsIl9pMiIsIl9PYmplY3Qka2V5czIiLCJfaTMiLCJfT2JqZWN0JGtleXMzIiwicmVuZGVyU3RhdHVzSWNvbnMiLCJpY29ucyIsImljb24iLCJjbHMiLCJfdGhpczMiLCJ0b2dnbGVQbGF5Iiwic2tpcCIsImJ0biIsInNldFNwZWVkIiwidG9nZ2xlTXV0ZSIsInBhcnNlRmxvYXQiLCJwbGF5TmV4dFRyYWNrIiwib25jZSIsInVwZGF0ZVBsYXlCdXR0b24iLCJwcm9jZXNzTmV4dExvZyIsInBhdXNlIiwiZGlzcGxheUxvZyIsInVwZGF0ZUhlYWx0aEJhcnMiLCJ0cmFja0FiaWxpdHlDb29sZG93bnMiLCJhbmltYXRlRGVhdGgiLCJ0YXJnZXRIUCIsInNob3dWaWN0b3J5T3ZlcmxheSIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsImNvbWJhdFNwZWVkIiwiX3RoaXM0IiwicHJvY2Vzc0xvZyIsImRlbGF5IiwiZ2V0RGVsYXlGb3JMb2ciLCJnZXRBYmlsaXR5RGVsYXkiLCJnZXRTeW5lcmd5VHJpZ2dlckRlbGF5IiwiX3RoaXM1IiwicGxheUFuaW1hdGlvbiIsImhwRGVsYXkiLCJnZXRIUFVwZGF0ZURlbGF5IiwiYWJpbGl0eURhdGEiLCJ1cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5IiwiY2QiLCJnZXRBYmlsaXR5SFBEZWxheSIsImFuaW1hdGVBdHRhY2siLCJpc0NyaXQiLCJhbmltYXRlSGVhbCIsImhlYWxlciIsImhlYWxlclRlYW0iLCJhbmltYXRlRGVmZW5kIiwiZGVmZW5kZXIiLCJkZWZlbmRlclRlYW0iLCJhbmltYXRlRG9kZ2UiLCJhbmltYXRlRG9UIiwiYW5pbWF0ZVN0dW5uZWQiLCJwbGF5QWJpbGl0eUFuaW1hdGlvbiIsImFuaW1hdGVTeW5lcmd5QW5ub3VuY2UiLCJhbmltYXRlU3luZXJneVRyaWdnZXIiLCJ0YXJnZXROYW1lIiwiZG90Q2xhc3MiLCJnZXRDaGFyYWN0ZXJFbGVtZW50IiwiYW5pbWF0ZU1hcmtlZCIsImFuaW1hdGVCdWZmIiwiYW5pbWF0ZVN0ZWFsdGgiLCJfdGhpczYiLCJibGlnaHRLZXkiLCJzd2FwU3ByaXRlIiwiY2FzdGVyRWwiLCJtYXJrS2V5Iiwicmlwb3N0ZUtleSIsInNlbGZCdWZmS2V5IiwiaGVhbGVkIiwicGFydHlCdWZmS2V5IiwiYW5pbWF0ZVRlYW1CdWZmIiwic3RlYWx0aEtleSIsIl90aGlzNyIsInRyaWdnZXIiLCJ0cmlnZ2VyQ2hhciIsImRyYXdTeW5lcmd5TGluayIsIl90aGlzOCIsInRyaWdnZXJDaGFyVGVhbSIsInBhcnRuZXJLZXkiLCJlbDEiLCJlbDIiLCJzdGFnZSIsImV4aXN0aW5nU3ZnIiwic3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwic2V0QXR0cmlidXRlIiwic3RhZ2VSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicmVjdDEiLCJyZWN0MiIsIngxIiwibGVmdCIsIndpZHRoIiwieTEiLCJ0b3AiLCJoZWlnaHQiLCJ4MiIsInkyIiwibGluZSIsInNwcml0ZU5hbWUiLCJfdGhpczkiLCJzbHVnIiwiaW1nIiwic3JjIiwiY29udGFpbnMiLCJhdHRhY2tlck5hbWUiLCJoZWFsZXJOYW1lIiwiZGVmZW5kZXJOYW1lIiwiZW50cnkiLCJtZXNzYWdlIiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwiY3VycmVudEhQIiwibWF4SFAiLCJ0YXJnZXRNYXhIUCIsInVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzIiwidXBkYXRlQ2hhcmFjdGVySFAiLCJfdGhpczAiLCJtYXhIcCIsInBlcmNlbnQiLCJocEJhciIsInRyYW5zaXRpb24iLCJ1cGRhdGVJbmZvUGFuZWwiLCJwYW5lbENsYXNzIiwicGFuZWwiLCJjaGFyYWN0ZXJJbmZvcyIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJfbG9vcCIsImluZm8iLCJzdGF0c1NwYW4iLCJuIiwiZG9uZSIsImVyciIsImYiLCJfdGhpczEiLCJmaW5hbGl6ZVJhdGluZyIsIl90aGlzMTAiLCJmaW5hbGl6ZVVybCIsInJhdGluZ0NoYW5nZSIsInNob3dSYXRpbmdVcGRhdGUiLCJuZXdSYXRpbmciLCJuZXdSYXRpbmcyIiwiY2hhbmdlIiwicmF0aW5nRWwiLCJyYXRpbmdFbDIiLCJ3aW5uZXJEaXYiLCJub3RpZjEiLCJjc3NUZXh0IiwiY29sb3IiLCJjaGFuZ2UyIiwibm90aWYyIiwiX3RoaXMxMSIsImlkeCIsImdldFJhbmRvbVRyYWNrSW5kZXgiLCJBdWRpbyIsImZsb29yIiwicmFuZG9tIiwiY29tYmF0Q29udGFpbmVyIiwicGFuZWxPcGVuIiwiY3VycmVudFRhYiIsImN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQiLCJsYXN0TWVzc2FnZUlkIiwibWVzc2FnZVBvbGxpbmdJbnRlcnZhbCIsInVucmVhZFBvbGxpbmdJbnRlcnZhbCIsImZyaWVuZHNMb2FkZWQiLCJyZXF1ZXN0c0xvYWRlZCIsIm9wZW5QYW5lbCIsImxvYWRGcmllbmRzIiwiY2xvc2VQYW5lbCIsInN0b3BNZXNzYWdlUG9sbGluZyIsInRhYkJ0biIsInRhYk5hbWUiLCJmcmllbmRzVGFiIiwic3dpdGNoVGFiIiwidGFiQ29udGVudCIsImxvYWRSZXF1ZXN0cyIsImZyaWVuZHMiLCJ1c2VySWQiLCJsYXN0TWVzc2FnZSIsImlzRnJvbU1lIiwiaXRlbSIsImZyaWVuZFVzZXJJZCIsIm9wZW5Db252ZXJzYXRpb24iLCJyZXF1ZXN0cyIsImZyaWVuZHNoaXBJZCIsImhhbmRsZVJlcXVlc3QiLCJhY2NlcHRJZCIsInJlamVjdElkIiwiYWN0aW9uIiwiZmV0Y2hVbnJlYWRDb3VudCIsInNlYXJjaElucHV0Iiwic2VhcmNoUmVzdWx0cyIsInNlYXJjaFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJxdWVyeSIsInVzZXJzIiwidSIsImFjdGlvbkh0bWwiLCJmcmllbmRTdGF0dXMiLCJzZW5kRnJpZW5kUmVxdWVzdCIsImFkZEZyaWVuZElkIiwib3V0ZXJIVE1MIiwicmVwb3J0TWVzc2FnZUFjdGlvbiIsIm1lc3NhZ2VJZCIsInJlYXNvbiIsInByb21wdCIsImNvbnZFbCIsIm1lc3NhZ2VzRWwiLCJyZW5kZXJNZXNzYWdlcyIsIm1lc3NhZ2VzIiwic3RhcnRNZXNzYWdlUG9sbGluZyIsImFwcGVuZCIsInBsYWNlaG9sZGVyIiwibXNnIiwicmVwb3J0QnRuIiwicmVwb3J0RWwiLCJyZXBvcnRNc2dJZCIsInNlbmRCdG4iLCJpbnB1dEVsIiwic2VuZE1lc3NhZ2UiLCJiYWNrQnRuIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwidG90YWwiLCJyZXF1ZXN0c0JhZGdlIiwicGVuZGluZ1JlcXVlc3RzIl0sInNvdXJjZVJvb3QiOiIifQ==