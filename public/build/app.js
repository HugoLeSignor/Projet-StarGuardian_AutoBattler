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
    if (cat === 'Legend') return true; // Legend bypasses role limits
    var roles = getSelectedRoles();
    return roles[cat] < 1;
  }

  // Check if a Legend character is currently selected
  function isLegendSelected() {
    if (selectedHeroIds.length !== 1) return false;
    var p = Array.from(portraits).find(function (pp) {
      return pp.dataset.id === selectedHeroIds[0];
    });
    return p && getCategory(p) === 'Legend';
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

      // Legend characters are always selectable
      if (roleCat === 'Legend') {
        btnRight.disabled = false;
      } else if (isLegendSelected() && !alreadySelected) {
        // Disable normal chars if a Legend is selected
        btnRight.disabled = true;
        btnRight.textContent = 'Ultra Instinct actif';
      } else if (!alreadySelected && !canSelectRole(portrait)) {
        // Désactiver le bouton si le slot de ce rôle est déjà pris
        btnRight.disabled = true;
        btnRight.textContent = "Slot ".concat(roleCat, " d\xE9j\xE0 pris");
      }
      btnRight.addEventListener('click', function () {
        // EASTER EGG: Legend character fills all 4 slots
        if (roleCat === 'Legend') {
          if (selectedHeroIds.includes(id)) {
            // Deselect Legend
            selectedHeroIds = [];
            selectedHeroes = [];
            portraits.forEach(function (p) {
              return p.classList.remove('selected');
            });
          } else {
            // Select Legend: clear all and select only this
            selectedHeroIds = [id];
            selectedHeroes = [name];
            portraits.forEach(function (p) {
              return p.classList.remove('selected');
            });
            portrait.classList.add('selected');
          }
          updateSelectedTeam();
          btnRight.textContent = selectedHeroIds.includes(id) ? 'Désélectionner' : 'Sélectionner';
          btnRight.disabled = false;
          return;
        }

        // Prevent selecting normal chars if Legend is active
        if (isLegendSelected()) {
          alert('Ultra Instinct est actif ! Désélectionnez Goku d\'abord.');
          return;
        }
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
    var legendActive = isLegendSelected();
    if (legendActive) {
      // Easter egg: show Goku x4
      var hero = Array.from(portraits).find(function (p) {
        return p.dataset.id === selectedHeroIds[0];
      });
      if (hero) {
        var name = hero.dataset.name;
        var spritePath = "/asset/sprites/".concat(hero.dataset.sprite);
        for (var i = 0; i < 4; i++) {
          var heroEl = document.createElement('div');
          heroEl.classList.add('selected-hero-sprite');
          heroEl.innerHTML = "\n                        <img src=\"".concat(spritePath, "\" alt=\"Sprite de ").concat(name, "\">\n                        <span>").concat(name, "</span>\n                    ");
          selectedList.appendChild(heroEl);
        }
      }
    } else {
      selectedHeroIds.forEach(function (id) {
        var hero = Array.from(portraits).find(function (p) {
          return p.dataset.id === id;
        });
        if (!hero) return;
        var name = hero.dataset.name;
        var spritePath = "/asset/sprites/".concat(hero.dataset.sprite);
        var heroEl = document.createElement('div');
        heroEl.classList.add('selected-hero-sprite');
        heroEl.innerHTML = "\n                    <img src=\"".concat(spritePath, "\" alt=\"Sprite de ").concat(name, "\">\n                    <span>").concat(name, "</span>\n                ");
        selectedList.appendChild(heroEl);
      });
    }

    // Mettre à jour les indicateurs de rôles
    updateRoleIndicators();

    // Mettre à jour les synergies
    updateSynergyHighlights();
    if (launchBtn) {
      if (legendActive) {
        launchBtn.disabled = false;
      } else {
        var roles = getSelectedRoles();
        var teamComplete = roles.Tank === 1 && roles.DPS === 1 && roles.Healer === 1 && roles.Support === 1;
        launchBtn.disabled = !teamComplete;
      }
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
    var legendActive = isLegendSelected();
    var roles = getSelectedRoles();
    var indicator = document.querySelector('.role-indicator');
    if (indicator) {
      indicator.querySelectorAll('.role-slot').forEach(function (slot) {
        var cat = slot.dataset.role;
        if (legendActive || roles[cat] === 1) {
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
      // Legend teams cannot be saved as presets
      if (isLegendSelected()) {
        savePresetBtn.disabled = true;
        return;
      }
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
      this.volume = 0.05;
      this.sfxVolume = 0.05;
      this.combatPlaylist = ['/asset/audio/combat/butchersboulevardmusic.mp3', '/asset/audio/combat/combatintheruins.mp3'];

      // Easter egg: Ultra Instinct music override when Goku is present
      var hasGoku = Array.from(this.container.querySelectorAll('[data-character-slug]')).some(function (el) {
        return el.dataset.characterSlug === 'goku';
      });
      if (hasGoku) {
        this.combatPlaylist = ['/asset/audio/combat/ultra-instinct.mp3'];
      }
      this.endMusic = null;
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
          if (_this3.endMusic) {
            _this3.endMusic.volume = _this3.isMuted ? 0 : _this3.volume;
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
        case 'ultra_instinct':
          return 3500;
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
        case 'ultra_instinct':
          return 400;
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
        case 'ultra_instinct':
          if (log.caster && log.casterTeam) {
            var uiKey = "".concat(log.casterTeam, "-").concat(log.caster);
            this.swapSprite(uiKey, 'attackanimation.webp', 1800);
            this.playCharSfx(uiKey, 'skill');
            var uiCasterEl = this.getCharacterElement(log.caster, log.casterTeam);
            if (uiCasterEl) {
              uiCasterEl.classList.add('ultra-instinct-attack');
              setTimeout(function () {
                return uiCasterEl.classList.remove('ultra-instinct-attack');
              }, 1800);
            }
          }
          if (log.target && log.targetTeam) {
            setTimeout(function () {
              var uiTargetEl = _this6.getCharacterElement(log.target, log.targetTeam);
              if (uiTargetEl) {
                uiTargetEl.classList.add('hurt', 'crit');
                setTimeout(function () {
                  return uiTargetEl.classList.remove('hurt', 'crit');
                }, 800);
              }
            }, 600);
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
      if (!target) return;
      var key = "".concat(targetTeam, "-").concat(targetName);
      var slug = this.characterSlugs[key];
      var img = target.querySelector('.character-sprite');

      // Try to swap to corpse image
      if (img && slug) {
        var corpseImg = new Image();
        corpseImg.src = "/asset/img/combat/".concat(slug, "/corpse.png");
        corpseImg.onload = function () {
          img.src = corpseImg.src;
          target.classList.add('dead', 'dead--corpse');
        };
        corpseImg.onerror = function () {
          // No corpse image available, use CSS fallback
          target.classList.add('dead');
        };
      } else {
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

      // Play victory or defeat music
      this.playEndMusic();

      // Finaliser le MMR a la fin du combat
      this.finalizeRating();
    }
  }, {
    key: "playEndMusic",
    value: function playEndMusic() {
      // Stop combat music
      if (this.combatMusic) {
        this.combatMusic.pause();
        this.combatMusic = null;
      }

      // Determine outcome from overlay class
      var track = null;
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
        this.endMusic.play()["catch"](function () {});
      }
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
      if (this.endMusic) {
        this.endMusic.volume = this.isMuted ? 0 : this.volume;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNvYixlQUFlO1VBQ2hERCxhQUFhLENBQUNsYyxLQUFLLENBQUNDLE9BQU8sR0FBRyxjQUFjO1FBQ2hELENBQUMsTUFBTTtVQUNIaWMsYUFBYSxDQUFDbGMsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtRQUN4QztNQUNKO0lBQ0osQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxZQUFNLENBQUMsQ0FBQyxDQUFDO0VBQ3BCO0VBRUE4WixnQkFBZ0IsQ0FBQyxDQUFDO0VBQ2xCekIscUJBQXFCLEdBQUd5RCxXQUFXLENBQUNoQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUM7QUFDaEUsQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7OztBQ3RmRjs7Ozs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY29tYmF0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9mcmllbmRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcz8yZGM5Iiwid2VicGFjazovLy8uL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxyXG4gKi9cclxuaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2Nzcyc7XHJcbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5jc3MnO1xyXG5pbXBvcnQgJy4vanMvY29tYmF0LmpzJztcclxuaW1wb3J0ICcuL2pzL2ZyaWVuZHMuanMnO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBVVElMSVRBSVJFIFNFQ1VSSVRFIFhTU1xyXG49PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XHJcbiAgICBpZiAoIXN0cikgcmV0dXJuICcnO1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyKSk7XHJcbiAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBNRU5VIEJVUkdFUlxyXG49PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGNvbnN0IGJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnVyZ2VyXCIpO1xyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLW5hdmlnYXRpb25cIik7XHJcblxyXG4gICAgaWYgKGJ1cmdlciAmJiBuYXYpIHtcclxuICAgICAgICBidXJnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIFBBR0UgVEVBTVMgKENPUlJJR8OJRSlcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qIPCflKcgTUFYIERFUyBTVEFUUyAoYWRhcHRlciDDoCB0YSBCREQgLyDDqXF1aWxpYnJhZ2UpICovXHJcbmNvbnN0IFNUQVRfTUFYID0ge1xyXG4gICAgZG1nOiAzMCxcclxuICAgIHNwZWVkOiAxMixcclxuICAgIGRvZGdlOiA0MCxcclxuICAgIGNyaXQ6IDE1LFxyXG4gICAgaHA6IDc1XHJcbn07XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgcG9ydHJhaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRlYW0tcG9ydHJhaXQnKTtcclxuICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVhbURldGFpbHMnKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC1saXN0Jyk7XHJcbiAgICBjb25zdCBsYXVuY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWxhdW5jaCcpO1xyXG5cclxuICAgIGlmICghZGV0YWlscyB8fCBwb3J0cmFpdHMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgbWF4U2VsZWN0aW9uID0gNDtcclxuICAgIGxldCBzZWxlY3RlZEhlcm9lcyA9IFtdO1xyXG4gICAgbGV0IHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG5cclxuICAgIC8vIENvbXBvc2l0aW9uIG9ibGlnYXRvaXJlIDogMSBUYW5rLCAxIERQUywgMSBIZWFsZXIsIDEgU3VwcG9ydFxyXG4gICAgLy8gTGEgY2F0ZWdvcmllIHZpZW50IGRpcmVjdGVtZW50IGR1IGRhdGEtY2F0ZWdvcnkgKGNhbGN1bGUgY290ZSBzZXJ2ZXVyKVxyXG4gICAgZnVuY3Rpb24gZ2V0Q2F0ZWdvcnkocG9ydHJhaXQpIHtcclxuICAgICAgICByZXR1cm4gcG9ydHJhaXQuZGF0YXNldC5jYXRlZ29yeSB8fCAnU3VwcG9ydCc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRSb2xlcygpIHtcclxuICAgICAgICBjb25zdCByb2xlcyA9IHsgVGFuazogMCwgRFBTOiAwLCBIZWFsZXI6IDAsIFN1cHBvcnQ6IDAgfTtcclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwcCA9PiBwcC5kYXRhc2V0LmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgIGlmIChwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSBnZXRDYXRlZ29yeShwKTtcclxuICAgICAgICAgICAgICAgIHJvbGVzW2NhdF0rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByb2xlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYW5TZWxlY3RSb2xlKHBvcnRyYWl0RWwpIHtcclxuICAgICAgICBjb25zdCBjYXQgPSBnZXRDYXRlZ29yeShwb3J0cmFpdEVsKTtcclxuICAgICAgICBpZiAoY2F0ID09PSAnTGVnZW5kJykgcmV0dXJuIHRydWU7IC8vIExlZ2VuZCBieXBhc3NlcyByb2xlIGxpbWl0c1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgIHJldHVybiByb2xlc1tjYXRdIDwgMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBhIExlZ2VuZCBjaGFyYWN0ZXIgaXMgY3VycmVudGx5IHNlbGVjdGVkXHJcbiAgICBmdW5jdGlvbiBpc0xlZ2VuZFNlbGVjdGVkKCkge1xyXG4gICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMubGVuZ3RoICE9PSAxKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgcCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHBwID0+IHBwLmRhdGFzZXQuaWQgPT09IHNlbGVjdGVkSGVyb0lkc1swXSk7XHJcbiAgICAgICAgcmV0dXJuIHAgJiYgZ2V0Q2F0ZWdvcnkocCkgPT09ICdMZWdlbmQnO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcnRyYWl0cy5mb3JFYWNoKHBvcnRyYWl0ID0+IHtcclxuICAgICAgICBwb3J0cmFpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHBvcnRyYWl0LmRhdGFzZXQuaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwb3J0cmFpdC5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGUgPSBwb3J0cmFpdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01pbiA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01pbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01heCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01heCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuc3BlZWQpO1xyXG4gICAgICAgICAgICBjb25zdCBkb2RnZSA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRvZGdlKTtcclxuICAgICAgICAgICAgY29uc3QgY3JpdCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmNyaXQpO1xyXG4gICAgICAgICAgICBjb25zdCBocCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmhwKTtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlRmlsZSA9IHBvcnRyYWl0LmRhdGFzZXQuc3ByaXRlO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5TmFtZSA9IHBvcnRyYWl0LmRhdGFzZXQuYWJpbGl0eU5hbWUgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlEZXNjID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5RGVzYyB8fCAnJztcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUNkID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5Q2QgfHwgJyc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7c3ByaXRlRmlsZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlIdG1sID0gYWJpbGl0eU5hbWUgPyBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFiaWxpdHktc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZpcmUtYWx0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX25hbWVcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eU5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19jZFwiPjxpIGNsYXNzPVwiZmFzIGZhLWhvdXJnbGFzcy1oYWxmXCI+PC9pPiAke2VzY2FwZUh0bWwoYWJpbGl0eUNkKX1UPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX2Rlc2NcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eURlc2MpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCA6ICcnO1xyXG5cclxuICAgICAgICAgICAgLy8gQnVpbGQgc3luZXJneSBpbmZvIGZvciB0aGlzIGNoYXJhY3RlclxyXG4gICAgICAgICAgICBjb25zdCBjaGFyU3luZXJnaWVzID0gc3luZXJneU1hcFtuYW1lXSB8fCBbXTtcclxuICAgICAgICAgICAgbGV0IHN5bmVyZ3lIdG1sID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChjaGFyU3luZXJnaWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHN5bmVyZ3lIdG1sID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvbl9faGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1saW5rXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25fX3RpdGxlXCI+U3luZXJnaWVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtjaGFyU3luZXJnaWVzLm1hcChzID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25fX2l0ZW0gJHtzZWxlY3RlZEhlcm9lcy5pbmNsdWRlcyhzLnBhcnRuZXIpID8gJ3N5bmVyZ3ktc2VjdGlvbl9faXRlbS0tYWN0aXZlJyA6ICcnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1zZWN0aW9uX19wYXJ0bmVyXCI+JHtlc2NhcGVIdG1sKHMucGFydG5lcil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1zZWN0aW9uX19zbmFtZVwiPiR7ZXNjYXBlSHRtbChzLm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvbl9fZGVzY1wiPiR7ZXNjYXBlSHRtbChzLmRlc2MpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRldGFpbHMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYW0tZGV0YWlscy1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPiR7bmFtZX08L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicm9sZVwiPiR7cm9sZX08L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnaWYtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzcHJpdGVQYXRofVwiIGFsdD1cIlNwcml0ZSBkZSAke25hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE1HPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWRtZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoZG1nTWF4IC8gU1RBVF9NQVguZG1nKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZG1nTWlufSAtICR7ZG1nTWF4fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VklUPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLXNwZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoc3BlZWQgLyBTVEFUX01BWC5zcGVlZCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke3NwZWVkfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE9ER0U8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tZG9kZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGRvZGdlIC8gU1RBVF9NQVguZG9kZ2UpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkb2RnZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNSSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tY3JpdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoY3JpdCAvIFNUQVRfTUFYLmNyaXQpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtjcml0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+SFA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0taHBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGhwIC8gU1RBVF9NQVguaHApICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtocH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAke2FiaWxpdHlIdG1sfVxyXG4gICAgICAgICAgICAgICAgICAgICR7c3luZXJneUh0bWx9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tc2VsZWN0LXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7aXNTZWxlY3RlZCA/ICdEw6lzw6lsZWN0aW9ubmVyJyA6ICdTw6lsZWN0aW9ubmVyJ31cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYnRuUmlnaHQgPSBkZXRhaWxzLnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2VsZWN0LXJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVDYXQgPSBnZXRDYXRlZ29yeShwb3J0cmFpdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscmVhZHlTZWxlY3RlZCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBMZWdlbmQgY2hhcmFjdGVycyBhcmUgYWx3YXlzIHNlbGVjdGFibGVcclxuICAgICAgICAgICAgaWYgKHJvbGVDYXQgPT09ICdMZWdlbmQnKSB7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzTGVnZW5kU2VsZWN0ZWQoKSAmJiAhYWxyZWFkeVNlbGVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEaXNhYmxlIG5vcm1hbCBjaGFycyBpZiBhIExlZ2VuZCBpcyBzZWxlY3RlZFxyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQudGV4dENvbnRlbnQgPSAnVWx0cmEgSW5zdGluY3QgYWN0aWYnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFhbHJlYWR5U2VsZWN0ZWQgJiYgIWNhblNlbGVjdFJvbGUocG9ydHJhaXQpKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBEw6lzYWN0aXZlciBsZSBib3V0b24gc2kgbGUgc2xvdCBkZSBjZSByw7RsZSBlc3QgZMOpasOgIHByaXNcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LnRleHRDb250ZW50ID0gYFNsb3QgJHtyb2xlQ2F0fSBkw6lqw6AgcHJpc2A7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gRUFTVEVSIEVHRzogTGVnZW5kIGNoYXJhY3RlciBmaWxscyBhbGwgNCBzbG90c1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvbGVDYXQgPT09ICdMZWdlbmQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRGVzZWxlY3QgTGVnZW5kXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcyA9IFtdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHAuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU2VsZWN0IExlZ2VuZDogY2xlYXIgYWxsIGFuZCBzZWxlY3Qgb25seSB0aGlzXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IFtpZF07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzID0gW25hbWVdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHAuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHVwZGF0ZVNlbGVjdGVkVGVhbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0blJpZ2h0LnRleHRDb250ZW50ID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKSA/ICdEw6lzw6lsZWN0aW9ubmVyJyA6ICdTw6lsZWN0aW9ubmVyJztcclxuICAgICAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IHNlbGVjdGluZyBub3JtYWwgY2hhcnMgaWYgTGVnZW5kIGlzIGFjdGl2ZVxyXG4gICAgICAgICAgICAgICAgaWYgKGlzTGVnZW5kU2VsZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdVbHRyYSBJbnN0aW5jdCBlc3QgYWN0aWYgISBEw6lzw6lsZWN0aW9ubmV6IEdva3UgZFxcJ2Fib3JkLicpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IHNlbGVjdGVkSGVyb0lkcy5maWx0ZXIoaGlkID0+IGhpZCAhPT0gaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzID0gc2VsZWN0ZWRIZXJvZXMuZmlsdGVyKGggPT4gaCAhPT0gbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5TZWxlY3RSb2xlKHBvcnRyYWl0KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChgVm91cyBhdmV6IGTDqWrDoCB1biAke3JvbGVDYXR9IGRhbnMgdm90cmUgw6lxdWlwZSAhYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPj0gbWF4U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiVm91cyBwb3V2ZXogc8OpbGVjdGlvbm5lciBtYXhpbXVtIDQgcGVyc29ubmFnZXMgIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMucHVzaChuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHVwZGF0ZVNlbGVjdGVkVGVhbSgpO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQudGV4dENvbnRlbnQgPSBzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgPyAnRMOpc8OpbGVjdGlvbm5lcidcclxuICAgICAgICAgICAgICAgICAgICA6ICdTw6lsZWN0aW9ubmVyJztcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gPT09IFNZTkVSR1kgU1lTVEVNID09PVxyXG4gICAgY29uc3QgdGVhbXNQYWdlRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudGVhbXMtcGFnZScpO1xyXG4gICAgY29uc3Qgc3luZXJneU1hcCA9IHRlYW1zUGFnZUVsID8gSlNPTi5wYXJzZSh0ZWFtc1BhZ2VFbC5kYXRhc2V0LnN5bmVyZ3lNYXAgfHwgJ3t9JykgOiB7fTtcclxuXHJcbiAgICAvKiAgWk9ORSDDiVFVSVBFIOKAlCBzcHJpdGVzIHNldWxlbWVudCAqL1xyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRUZWFtKCkge1xyXG4gICAgICAgIHNlbGVjdGVkTGlzdC5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgY29uc3QgbGVnZW5kQWN0aXZlID0gaXNMZWdlbmRTZWxlY3RlZCgpO1xyXG5cclxuICAgICAgICBpZiAobGVnZW5kQWN0aXZlKSB7XHJcbiAgICAgICAgICAgIC8vIEVhc3RlciBlZ2c6IHNob3cgR29rdSB4NFxyXG4gICAgICAgICAgICBjb25zdCBoZXJvID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocCA9PiBwLmRhdGFzZXQuaWQgPT09IHNlbGVjdGVkSGVyb0lkc1swXSk7XHJcbiAgICAgICAgICAgIGlmIChoZXJvKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gaGVyby5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7aGVyby5kYXRhc2V0LnNwcml0ZX1gO1xyXG4gICAgICAgICAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0OyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBoZXJvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvRWwuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtaGVyby1zcHJpdGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBoZXJvRWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c3ByaXRlUGF0aH1cIiBhbHQ9XCJTcHJpdGUgZGUgJHtuYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke25hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRMaXN0LmFwcGVuZENoaWxkKGhlcm9FbCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZXJvID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocCA9PiBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgICAgIGlmICghaGVybykgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGhlcm8uZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3ByaXRlUGF0aCA9IGAvYXNzZXQvc3ByaXRlcy8ke2hlcm8uZGF0YXNldC5zcHJpdGV9YDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgaGVyb0VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWhlcm8tc3ByaXRlJyk7XHJcbiAgICAgICAgICAgICAgICBoZXJvRWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzcHJpdGVQYXRofVwiIGFsdD1cIlNwcml0ZSBkZSAke25hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZExpc3QuYXBwZW5kQ2hpbGQoaGVyb0VsKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBsZXMgaW5kaWNhdGV1cnMgZGUgcsO0bGVzXHJcbiAgICAgICAgdXBkYXRlUm9sZUluZGljYXRvcnMoKTtcclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbGVzIHN5bmVyZ2llc1xyXG4gICAgICAgIHVwZGF0ZVN5bmVyZ3lIaWdobGlnaHRzKCk7XHJcblxyXG4gICAgICAgIGlmIChsYXVuY2hCdG4pIHtcclxuICAgICAgICAgICAgaWYgKGxlZ2VuZEFjdGl2ZSkge1xyXG4gICAgICAgICAgICAgICAgbGF1bmNoQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHRlYW1Db21wbGV0ZSA9IHJvbGVzLlRhbmsgPT09IDEgJiYgcm9sZXMuRFBTID09PSAxICYmIHJvbGVzLkhlYWxlciA9PT0gMSAmJiByb2xlcy5TdXBwb3J0ID09PSAxO1xyXG4gICAgICAgICAgICAgICAgbGF1bmNoQnRuLmRpc2FibGVkID0gIXRlYW1Db21wbGV0ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTeW5lcmd5SGlnaGxpZ2h0cygpIHtcclxuICAgICAgICAvLyBSZW1vdmUgYWxsIGV4aXN0aW5nIHN5bmVyZ3kgaGlnaGxpZ2h0c1xyXG4gICAgICAgIHBvcnRyYWl0cy5mb3JFYWNoKHAgPT4ge1xyXG4gICAgICAgICAgICBwLmNsYXNzTGlzdC5yZW1vdmUoJ3N5bmVyZ3ktYXZhaWxhYmxlJywgJ3N5bmVyZ3ktYWN0aXZlJyk7XHJcbiAgICAgICAgICAgIGNvbnN0IGJhZGdlID0gcC5xdWVyeVNlbGVjdG9yKCcuc3luZXJneS1iYWRnZScpO1xyXG4gICAgICAgICAgICBpZiAoYmFkZ2UpIGJhZGdlLnJlbW92ZSgpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBHZXQgbmFtZXMgb2Ygc2VsZWN0ZWQgaGVyb2VzXHJcbiAgICAgICAgY29uc3Qgc2VsZWN0ZWROYW1lcyA9IHNlbGVjdGVkSGVyb0lkcy5tYXAoaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocHAgPT4gcHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICByZXR1cm4gcCA/IHAuZGF0YXNldC5uYW1lIDogbnVsbDtcclxuICAgICAgICB9KS5maWx0ZXIoQm9vbGVhbik7XHJcblxyXG4gICAgICAgIC8vIEZpbmQgYWN0aXZlIHN5bmVyZ2llcyAoYm90aCBtZW1iZXJzIHNlbGVjdGVkKVxyXG4gICAgICAgIGNvbnN0IGFjdGl2ZVN5bmVyZ2llcyA9IFtdO1xyXG4gICAgICAgIGNvbnN0IHNlZW5QYWlycyA9IG5ldyBTZXQoKTtcclxuICAgICAgICBzZWxlY3RlZE5hbWVzLmZvckVhY2gobmFtZSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHN5bmVyZ2llcyA9IHN5bmVyZ3lNYXBbbmFtZV0gfHwgW107XHJcbiAgICAgICAgICAgIHN5bmVyZ2llcy5mb3JFYWNoKHN5biA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWROYW1lcy5pbmNsdWRlcyhzeW4ucGFydG5lcikpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYWlyS2V5ID0gW25hbWUsIHN5bi5wYXJ0bmVyXS5zb3J0KCkuam9pbignKycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghc2VlblBhaXJzLmhhcyhwYWlyS2V5KSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWVuUGFpcnMuYWRkKHBhaXJLZXkpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhY3RpdmVTeW5lcmdpZXMucHVzaCh7IG5hbWUxOiBuYW1lLCBuYW1lMjogc3luLnBhcnRuZXIsIHN5bmVyZ3lOYW1lOiBzeW4ubmFtZSwgZGVzYzogc3luLmRlc2MgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gTWFyayBzZWxlY3RlZCBwb3J0cmFpdHMgd2l0aCBhY3RpdmUgc3luZXJneVxyXG4gICAgICAgIGFjdGl2ZVN5bmVyZ2llcy5mb3JFYWNoKHN5biA9PiB7XHJcbiAgICAgICAgICAgIHBvcnRyYWl0cy5mb3JFYWNoKHAgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKChwLmRhdGFzZXQubmFtZSA9PT0gc3luLm5hbWUxIHx8IHAuZGF0YXNldC5uYW1lID09PSBzeW4ubmFtZTIpXHJcbiAgICAgICAgICAgICAgICAgICAgJiYgc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKHAuZGF0YXNldC5pZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBwLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktYWN0aXZlJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBIaWdobGlnaHQgdW5zZWxlY3RlZCBwb3J0cmFpdHMgdGhhdCBoYXZlIHN5bmVyZ3kgd2l0aCBzZWxlY3RlZCBoZXJvZXNcclxuICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhwLmRhdGFzZXQuaWQpKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IHBOYW1lID0gcC5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IGNoYXJTeW5lcmdpZXMgPSBzeW5lcmd5TWFwW3BOYW1lXSB8fCBbXTtcclxuICAgICAgICAgICAgY29uc3QgbWF0Y2hpbmcgPSBjaGFyU3luZXJnaWVzLmZpbHRlcihzeW4gPT4gc2VsZWN0ZWROYW1lcy5pbmNsdWRlcyhzeW4ucGFydG5lcikpO1xyXG5cclxuICAgICAgICAgICAgaWYgKG1hdGNoaW5nLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHAuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1hdmFpbGFibGUnKTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGJhZGdlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS5jbGFzc05hbWUgPSAnc3luZXJneS1iYWRnZSc7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtbGlua1wiPjwvaT4nO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UudGl0bGUgPSBtYXRjaGluZy5tYXAocyA9PiBzLm5hbWUpLmpvaW4oJywgJyk7XHJcbiAgICAgICAgICAgICAgICBwLmFwcGVuZENoaWxkKGJhZGdlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBVcGRhdGUgdGhlIHN5bmVyZ3kgZGlzcGxheSBwYW5lbFxyXG4gICAgICAgIHVwZGF0ZVN5bmVyZ3lEaXNwbGF5KGFjdGl2ZVN5bmVyZ2llcyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU3luZXJneURpc3BsYXkoYWN0aXZlU3luZXJnaWVzKSB7XHJcbiAgICAgICAgbGV0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zeW5lcmd5LWRpc3BsYXknKTtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikge1xyXG4gICAgICAgICAgICBjb250YWluZXIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgY29udGFpbmVyLmNsYXNzTmFtZSA9ICdzeW5lcmd5LWRpc3BsYXknO1xyXG4gICAgICAgICAgICBjb25zdCBhY3Rpb25zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkLXRlYW1fX2FjdGlvbnMnKTtcclxuICAgICAgICAgICAgaWYgKGFjdGlvbnMpIHtcclxuICAgICAgICAgICAgICAgIGFjdGlvbnMucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY29udGFpbmVyLCBhY3Rpb25zKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGFjdGl2ZVN5bmVyZ2llcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3luZXJneS1kaXNwbGF5X190aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtbGlua1wiPjwvaT4gU3luZXJnaWVzIGFjdGl2ZXNcclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICR7YWN0aXZlU3luZXJnaWVzLm1hcChzID0+IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW5lcmd5LWRpc3BsYXlfX2l0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN5bmVyZ3ktZGlzcGxheV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChzLnN5bmVyZ3lOYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzeW5lcmd5LWRpc3BsYXlfX2NoYXJzXCI+JHtlc2NhcGVIdG1sKHMubmFtZTEpfSArICR7ZXNjYXBlSHRtbChzLm5hbWUyKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzeW5lcmd5LWRpc3BsYXlfX2Rlc2NcIj4ke2VzY2FwZUh0bWwocy5kZXNjKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCkuam9pbignJyl9XHJcbiAgICAgICAgYDtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVSb2xlSW5kaWNhdG9ycygpIHtcclxuICAgICAgICBjb25zdCBsZWdlbmRBY3RpdmUgPSBpc0xlZ2VuZFNlbGVjdGVkKCk7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgY29uc3QgaW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvbGUtaW5kaWNhdG9yJyk7XHJcbiAgICAgICAgaWYgKGluZGljYXRvcikge1xyXG4gICAgICAgICAgICBpbmRpY2F0b3IucXVlcnlTZWxlY3RvckFsbCgnLnJvbGUtc2xvdCcpLmZvckVhY2goc2xvdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSBzbG90LmRhdGFzZXQucm9sZTtcclxuICAgICAgICAgICAgICAgIGlmIChsZWdlbmRBY3RpdmUgfHwgcm9sZXNbY2F0XSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2xhc3NMaXN0LnJlbW92ZSgnZmlsbGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgUFJFU0VUU1xyXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuICAgIGNvbnN0IHNhdmVQcmVzZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXNhdmUtcHJlc2V0Jyk7XHJcbiAgICBjb25zdCBwcmVzZXRNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRNb2RhbCcpO1xyXG4gICAgY29uc3QgcHJlc2V0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldE5hbWUnKTtcclxuICAgIGNvbnN0IHByZXNldENvbmZpcm1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0Q29uZmlybScpO1xyXG4gICAgY29uc3QgcHJlc2V0Q2FuY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldENhbmNlbCcpO1xyXG5cclxuICAgIC8vIE1ldHRyZSBhIGpvdXIgbGUgYm91dG9uIHNhdXZlZ2FyZGVyIHNlbG9uIGxhIHNlbGVjdGlvblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2F2ZVByZXNldEJ0bigpIHtcclxuICAgICAgICBpZiAoc2F2ZVByZXNldEJ0bikge1xyXG4gICAgICAgICAgICAvLyBMZWdlbmQgdGVhbXMgY2Fubm90IGJlIHNhdmVkIGFzIHByZXNldHNcclxuICAgICAgICAgICAgaWYgKGlzTGVnZW5kU2VsZWN0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgc2F2ZVByZXNldEJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW1Db21wbGV0ZSA9IHJvbGVzLlRhbmsgPT09IDEgJiYgcm9sZXMuRFBTID09PSAxICYmIHJvbGVzLkhlYWxlciA9PT0gMSAmJiByb2xlcy5TdXBwb3J0ID09PSAxO1xyXG4gICAgICAgICAgICBzYXZlUHJlc2V0QnRuLmRpc2FibGVkID0gIXRlYW1Db21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXBwZWxlciB1cGRhdGVTYXZlUHJlc2V0QnRuIGEgY2hhcXVlIGNoYW5nZW1lbnQgZGUgc2VsZWN0aW9uXHJcbiAgICBjb25zdCBvcmlnaW5hbFVwZGF0ZVNlbGVjdGVkVGVhbSA9IHVwZGF0ZVNlbGVjdGVkVGVhbTtcclxuICAgIC8vIE9uIHN1cmNoYXJnZSBlbiBham91dGFudCBsJ2FwcGVsXHJcbiAgICBjb25zdCBfb3JpZ1VwZGF0ZSA9IHVwZGF0ZVNlbGVjdGVkVGVhbTtcclxuXHJcbiAgICAvLyBQYXRjaDogYWpvdXRlciBsJ2FwcGVsIGEgdXBkYXRlU2F2ZVByZXNldEJ0biBkYW5zIHVwZGF0ZVNlbGVjdGVkVGVhbVxyXG4gICAgLy8gT24gbGUgZmFpdCBlbiB3cmFwcGFudCBsZXMgaW5kaWNhdGV1cnNcclxuICAgIGNvbnN0IF9vcmlnUm9sZUluZGljYXRvcnMgPSB1cGRhdGVSb2xlSW5kaWNhdG9ycztcclxuXHJcbiAgICAvLyBPdXZyaXIgbGEgbW9kYWxcclxuICAgIGlmIChzYXZlUHJlc2V0QnRuICYmIHByZXNldE1vZGFsKSB7XHJcbiAgICAgICAgc2F2ZVByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcHJlc2V0TmFtZUlucHV0LmZvY3VzKCksIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEZlcm1lciBsYSBtb2RhbFxyXG4gICAgICAgIHByZXNldENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcHJlc2V0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcHJlc2V0TW9kYWwucXVlcnlTZWxlY3RvcignLnByZXNldC1tb2RhbF9fYmFja2Ryb3AnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcHJlc2V0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU2F1dmVnYXJkZXIgbGUgcHJlc2V0XHJcbiAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHByZXNldE5hbWVJbnB1dC52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgICAgIGlmICghbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyNkYzE0M2MnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi50ZXh0Q29udGVudCA9ICcuLi4nO1xyXG5cclxuICAgICAgICAgICAgZmV0Y2goJy90ZWFtcy9wcmVzZXRzL3NhdmUnLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJJZHM6IHNlbGVjdGVkSGVyb0lkcy5tYXAoTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlY2hhcmdlciBsYSBwYWdlIHBvdXIgYWZmaWNoZXIgbGUgbm91dmVhdSBwcmVzZXRcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEuZXJyb3IgfHwgJ0VycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi50ZXh0Q29udGVudCA9ICdTYXV2ZWdhcmRlcic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc2F1dmVnYXJkZScpO1xyXG4gICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi50ZXh0Q29udGVudCA9ICdTYXV2ZWdhcmRlcic7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBFbnRlciBwb3VyIHZhbGlkZXJcclxuICAgICAgICBwcmVzZXROYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgcHJlc2V0Q29uZmlybUJ0bi5jbGljaygpO1xyXG4gICAgICAgICAgICBwcmVzZXROYW1lSW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGFyZ2VyIHVuIHByZXNldCAoc2VsZWN0aW9uIHByb2dyYW1tYXRpcXVlIGRlcyBwZXJzb25uYWdlcylcclxuICAgIGZ1bmN0aW9uIGxvYWRQcmVzZXQoY2hhcmFjdGVySWRzKSB7XHJcbiAgICAgICAgLy8gUmVzZXQgbGEgc2VsZWN0aW9uIGFjdHVlbGxlXHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzID0gW107XHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBbXTtcclxuICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHAuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKSk7XHJcblxyXG4gICAgICAgIC8vIFNlbGVjdGlvbm5lciBsZXMgcGVyc29ubmFnZXMgZHUgcHJlc2V0XHJcbiAgICAgICAgY2hhcmFjdGVySWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpZFN0ciA9IFN0cmluZyhpZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvcnRyYWl0ID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocCA9PiBwLmRhdGFzZXQuaWQgPT09IGlkU3RyKTtcclxuICAgICAgICAgICAgaWYgKHBvcnRyYWl0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMucHVzaChpZFN0cik7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcy5wdXNoKHBvcnRyYWl0LmRhdGFzZXQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVNlbGVjdGVkVGVhbSgpO1xyXG4gICAgICAgIHVwZGF0ZVNhdmVQcmVzZXRCdG4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTdXBwcmltZXIgdW4gcHJlc2V0XHJcbiAgICBmdW5jdGlvbiBkZWxldGVQcmVzZXQocHJlc2V0SWQsIGNoaXBFbCkge1xyXG4gICAgICAgIGlmICghY29uZmlybSgnU3VwcHJpbWVyIGNlIHByZXNldCA/JykpIHJldHVybjtcclxuXHJcbiAgICAgICAgZmV0Y2goYC90ZWFtcy9wcmVzZXRzLyR7cHJlc2V0SWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGNoaXBFbC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIC8vIFNpIHBsdXMgZGUgcHJlc2V0cywgY2FjaGVyIGxhIGJhcnJlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXNldHMtYmFyX19saXN0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdCAmJiBsaXN0LmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXRzLWJhcicpPy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzdXBwcmVzc2lvbicpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBdHRhY2hlciBsZXMgZXZlbnRzIGF1eCBjaGlwcyBkZSBwcmVzZXRzXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlc2V0LWNoaXAnKS5mb3JFYWNoKGNoaXAgPT4ge1xyXG4gICAgICAgIGNvbnN0IHByZXNldElkID0gY2hpcC5kYXRhc2V0LnByZXNldElkO1xyXG4gICAgICAgIGNvbnN0IGNoYXJJZHMgPSBKU09OLnBhcnNlKGNoaXAuZGF0YXNldC5wcmVzZXRJZHMpO1xyXG5cclxuICAgICAgICBjaGlwLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtY2hpcF9fbG9hZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsb2FkUHJlc2V0KGNoYXJJZHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjaGlwLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtY2hpcF9fZGVsZXRlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBkZWxldGVQcmVzZXQocHJlc2V0SWQsIGNoaXApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gT2JzZXJ2ZXIgbGVzIGNoYW5nZW1lbnRzIGRlIHNlbGVjdGlvbiBwb3VyIGxlIGJvdXRvbiBzYXZlXHJcbiAgICAvLyBPbiB1dGlsaXNlIHVuIE11dGF0aW9uT2JzZXJ2ZXIgc3VyIHNlbGVjdGVkTGlzdFxyXG4gICAgY29uc3Qgc2VsZWN0ZWRMaXN0T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB1cGRhdGVTYXZlUHJlc2V0QnRuKCkpO1xyXG4gICAgaWYgKHNlbGVjdGVkTGlzdCkge1xyXG4gICAgICAgIHNlbGVjdGVkTGlzdE9ic2VydmVyLm9ic2VydmUoc2VsZWN0ZWRMaXN0LCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGF1bmNoQnRuKSB7XHJcbiAgICAgICAgbGF1bmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIEVudm9pIFBPU1QgQUpBWCB2ZXJzIC90ZWFtcy9zZWxlY3RcclxuICAgICAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvc2VsZWN0Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBzZWxlY3RlZEhlcm9JZHMubWFwKChpZCwgaSkgPT4gYGNoYXJhY3Rlcl9pZHNbJHtpfV09JHtlbmNvZGVVUklDb21wb25lbnQoaWQpfWApLmpvaW4oJyYnKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UucmVkaXJlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLnVybDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWRpcmlnZSBtYW51ZWxsZW1lbnQgc2kgcGFzIGRlIHJlZGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9tYXRjaG1ha2luZyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHPDqWxlY3Rpb24gZGUgbFxcJ8OpcXVpcGUuJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIFBST0ZJTEUgUE9QVVBcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtdG9nZ2xlXScpO1xyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLXBvcHVwXScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWJhY2tkcm9wXScpO1xyXG4gICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWNsb3NlXScpO1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtY29udGVudF0nKTtcclxuXHJcbiAgICBpZiAoIXRvZ2dsZSB8fCAhcG9wdXApIHJldHVybjtcclxuXHJcbiAgICBsZXQgbG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlblBvcHVwKCkge1xyXG4gICAgICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHBvcHVwLm9mZnNldEhlaWdodDsgLy8gcmVmbG93XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgncHJvZmlsZS1wb3B1cC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ3Byb2ZpbGUtcG9wdXBfX2JhY2tkcm9wLS1vcGVuJyk7XHJcblxyXG4gICAgICAgIGlmICghbG9hZGVkKSB7XHJcbiAgICAgICAgICAgIGZldGNoUHJvZmlsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2ZpbGUtcG9wdXAtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9maWxlLXBvcHVwX19iYWNrZHJvcC0tb3BlbicpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblBvcHVwKTtcclxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcbiAgICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZldGNoUHJvZmlsZSgpIHtcclxuICAgICAgICBmZXRjaCgnL2FwaS9wcm9maWxlJylcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlbmRlclByb2ZpbGUoZGF0YSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9ICc8cCBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2Vycm9yXCI+RXJyZXVyIGRlIGNoYXJnZW1lbnQ8L3A+JztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyUHJvZmlsZShkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0Q2xhc3MgPSAocikgPT4gciA9PT0gJ3dpbicgPyAncmVzdWx0LS13aW4nIDogciA9PT0gJ2xvc3MnID8gJ3Jlc3VsdC0tbG9zcycgOiAncmVzdWx0LS1kcmF3JztcclxuICAgICAgICBjb25zdCByZXN1bHRMYWJlbCA9IChyKSA9PiByID09PSAnd2luJyA/ICdWaWN0b2lyZScgOiByID09PSAnbG9zcycgPyAnRFxcdTAwZTlmYWl0ZScgOiAnTnVsJztcclxuXHJcbiAgICAgICAgY29uc3QgYXZhdGFySHRtbCA9IGRhdGEucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKGRhdGEucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCJBdmF0YXIgZGUgJHtlc2NhcGVIdG1sKGRhdGEudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgOiBgPGkgY2xhc3M9XCJmYXMgZmEtdXNlci1jaXJjbGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+YDtcclxuXHJcbiAgICAgICAgbGV0IGh0bWwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19pZGVudGl0eVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2F2YXRhclwiPiR7YXZhdGFySHRtbH08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXBvcHVwX191c2VybmFtZVwiPiR7ZXNjYXBlSHRtbChkYXRhLnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtkYXRhLm1vdHRvID8gYDxzcGFuIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fbW90dG9cIj5cXHUwMGFiICR7ZXNjYXBlSHRtbChkYXRhLm1vdHRvKX0gXFx1MDBiYjwvc3Bhbj5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgJHtkYXRhLmJpbyA/IGA8cCBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2Jpb1wiPiR7ZXNjYXBlSHRtbChkYXRhLmJpbyl9PC9wPmAgOiAnJ31cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdGF0c1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5yYXRpbmcpKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+TU1SPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX3ZhbHVlXCI+JHtlc2NhcGVIdG1sKFN0cmluZyhkYXRhLnN0YXRzLndpbnMpKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+VmljdG9pcmVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX3ZhbHVlXCI+JHtlc2NhcGVIdG1sKFN0cmluZyhkYXRhLnN0YXRzLmxvc3NlcykpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5EXFx1MDBlOWZhaXRlczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy53aW5SYXRlKSl9JTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5XaW4gUmF0ZTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtc3RhclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gQ2hhbXBpb24gRmF2b3JpXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX25hbWVcIj4ke2VzY2FwZUh0bWwoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5uYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fcm9sZVwiPiR7ZXNjYXBlSHRtbChkYXRhLmZhdm9yaXRlQ2hhcmFjdGVyLnJvbGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19jb3VudFwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5nYW1lc1BsYXllZCkpfSBwYXJ0aWVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5sYXN0VGVhbS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS11c2Vyc1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gRGVybmlcXHUwMGU4cmUgXFx1MDBjOXF1aXBlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtkYXRhLmxhc3RUZWFtLm1hcChjID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fbWVtYmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChjLm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtX19yb2xlXCI+JHtlc2NhcGVIdG1sKGMucm9sZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5yZWNlbnRCYXR0bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXNoaWVsZC1hbHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IEhpc3RvcmlxdWVcclxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtkYXRhLnJlY2VudEJhdHRsZXMubWFwKGIgPT4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9hcmVuYS9yZXBsYXkvJHtwYXJzZUludChiLmlkLCAxMCl9XCIgY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX2VudHJ5ICR7cmVzdWx0Q2xhc3MoYi5yZXN1bHQpfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19yZXN1bHRcIj4ke3Jlc3VsdExhYmVsKGIucmVzdWx0KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX29wcG9uZW50XCI+dnMgJHtlc2NhcGVIdG1sKGIub3Bwb25lbnQpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fdHlwZVwiPiR7ZXNjYXBlSHRtbChiLm1hdGNoVHlwZSkudG9VcHBlckNhc2UoKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX2RhdGVcIj4ke2VzY2FwZUh0bWwoYi5kYXRlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGxheSBwcm9maWxlLWhpc3RvcnlfX3JlcGxheVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYCkuam9pbignJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lbXB0eVwiPkF1Y3VuIGNvbWJhdCBlbnJlZ2lzdHJcXHUwMGU5PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2FjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvcHJvZmlsZVwiIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZWRpdC1saW5rXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGVuXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBcXHUwMGM5ZGl0ZXIgbGUgcHJvZmlsXHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIH1cclxuXHJcbn0pOyIsIi8qKlxyXG4gKiBDb21iYXQgQW5pbWF0aW9uIENvbnRyb2xsZXJcclxuICogR8OocmUgbCdhZmZpY2hhZ2UgcHJvZ3Jlc3NpZiBkZXMgbG9ncyBkZSBjb21iYXQgYXZlYyBhbmltYXRpb25zXHJcbiAqL1xyXG5jbGFzcyBDb21iYXRDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMubG9ncyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gMTtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlckVsZW1lbnRzID0ge307XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUCA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIC8vIFLDqWN1cMOpcmVyIGxlcyBsb2dzIGRlcHVpcyBsJ2F0dHJpYnV0IGRhdGFcclxuICAgICAgICBjb25zdCBsb2dzRGF0YSA9IHRoaXMuY29udGFpbmVyLmRhdGFzZXQuY29tYmF0TG9ncztcclxuICAgICAgICBpZiAobG9nc0RhdGEpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ncyA9IEpTT04ucGFyc2UobG9nc0RhdGEpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJldXIgcGFyc2luZyBsb2dzOicsIGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSw6ljdXDDqXJlciBsZXMgw6lsw6ltZW50c1xyXG4gICAgICAgIHRoaXMubG9nQ29udGFpbmVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LWxvZ10nKTtcclxuICAgICAgICB0aGlzLm92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtb3ZlcmxheV0nKTtcclxuICAgICAgICB0aGlzLnBsYXlCdG4gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtcGxheV0nKTtcclxuICAgICAgICB0aGlzLnNraXBCdG4gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtc2tpcF0nKTtcclxuICAgICAgICB0aGlzLnNwZWVkQnRucyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvbWJhdC1zcGVlZF0nKTtcclxuXHJcbiAgICAgICAgLy8gTWFwIGRlcyBwZXJzb25uYWdlcyBhdmVjIHN0b2NrYWdlIGRlcyBIUCBtYXggaW5pdGlhdXhcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlck1heEhQID0ge307XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJTbHVncyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVySGFzSGVhbCA9IHt9O1xyXG4gICAgICAgIHRoaXMuYWJpbGl0eUNvb2xkb3ducyA9IHt9OyAvLyBTdWl2aSBkZXMgY29vbGRvd25zIGVuIGNvdXJzXHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlcyA9IHt9OyAvLyBTdWl2aSBkZXMgc3RhdHV0cyBhY3RpZnMgcGFyIHBlcnNvbm5hZ2VcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jaGFyYWN0ZXItbmFtZV0nKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsLmRhdGFzZXQuY2hhcmFjdGVyTmFtZTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbSA9IGVsLmRhdGFzZXQuY2hhcmFjdGVyVGVhbTtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7dGVhbX0tJHtuYW1lfWA7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XSA9IGVsO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclNsdWdzW2tleV0gPSBlbC5kYXRhc2V0LmNoYXJhY3RlclNsdWcgfHwgJyc7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVySGFzSGVhbFtrZXldID0gZWwuZGF0YXNldC5oYXNIZWFsID09PSAndHJ1ZSc7XHJcblxyXG4gICAgICAgICAgICAvLyBFeHRyYWlyZSBsZSBIUCBtYXggZGVwdWlzIGxlIHRleHRlIGluaXRpYWxcclxuICAgICAgICAgICAgY29uc3QgaHBUZXh0ID0gZWwucXVlcnlTZWxlY3RvcignLmhwLXRleHQnKTtcclxuICAgICAgICAgICAgaWYgKGhwVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBocFRleHQudGV4dENvbnRlbnQubWF0Y2goLyhcXGQrKVxcLyhcXGQrKS8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUFtrZXldID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBJbml0aWFsaXNlciBsZXMgc3RhdHV0cyB2aWRlc1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0gPSB0aGlzLmNyZWF0ZUVtcHR5U3RhdHVzZXMoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gTWFwIGRlcyDDqWzDqW1lbnRzIGQnYWJpbGl0eSBkYW5zIGxlcyBpbmZvIHBhbmVsc1xyXG4gICAgICAgIHRoaXMuYWJpbGl0eUVsZW1lbnRzID0ge307XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmNoYXJhY3Rlci1pbmZvW2RhdGEtY2hhci1uYW1lXScpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZWwuZGF0YXNldC5jaGFyTmFtZTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbSA9IGVsLmRhdGFzZXQuY2hhclRlYW07XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW19LSR7bmFtZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5RWwgPSBlbC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX2FiaWxpdHknKTtcclxuICAgICAgICAgICAgaWYgKGFiaWxpdHlFbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hYmlsaXR5RWxlbWVudHNba2V5XSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBlbDogYWJpbGl0eUVsLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heENkOiBwYXJzZUludChhYmlsaXR5RWwuZGF0YXNldC5hYmlsaXR5TWF4Q2QpIHx8IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFkZ2U6IGFiaWxpdHlFbC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX2FiaWxpdHktY2QtYmFkZ2UnKSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lRWw6IGFiaWxpdHlFbC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX2FiaWxpdHktbmFtZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25FbDogYWJpbGl0eUVsLnF1ZXJ5U2VsZWN0b3IoJ2knKSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ2FjaGVyIGwnb3ZlcmxheVxyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVmlkZXIgbGUgbG9nXHJcbiAgICAgICAgaWYgKHRoaXMubG9nQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQXVkaW9cclxuICAgICAgICB0aGlzLmF1ZGlvVW5sb2NrZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmNvbWJhdE11c2ljID0gbnVsbDtcclxuICAgICAgICB0aGlzLmxhc3RUcmFja0luZGV4ID0gLTE7XHJcbiAgICAgICAgdGhpcy5pc011dGVkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy52b2x1bWUgPSAwLjA1O1xyXG4gICAgICAgIHRoaXMuc2Z4Vm9sdW1lID0gMC4wNTtcclxuICAgICAgICB0aGlzLmNvbWJhdFBsYXlsaXN0ID0gW1xyXG4gICAgICAgICAgICAnL2Fzc2V0L2F1ZGlvL2NvbWJhdC9idXRjaGVyc2JvdWxldmFyZG11c2ljLm1wMycsXHJcbiAgICAgICAgICAgICcvYXNzZXQvYXVkaW8vY29tYmF0L2NvbWJhdGludGhlcnVpbnMubXAzJyxcclxuICAgICAgICBdO1xyXG5cclxuICAgICAgICAvLyBFYXN0ZXIgZWdnOiBVbHRyYSBJbnN0aW5jdCBtdXNpYyBvdmVycmlkZSB3aGVuIEdva3UgaXMgcHJlc2VudFxyXG4gICAgICAgIGNvbnN0IGhhc0dva3UgPSBBcnJheS5mcm9tKHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNoYXJhY3Rlci1zbHVnXScpKVxyXG4gICAgICAgICAgICAuc29tZShlbCA9PiBlbC5kYXRhc2V0LmNoYXJhY3RlclNsdWcgPT09ICdnb2t1Jyk7XHJcbiAgICAgICAgaWYgKGhhc0dva3UpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21iYXRQbGF5bGlzdCA9IFsnL2Fzc2V0L2F1ZGlvL2NvbWJhdC91bHRyYS1pbnN0aW5jdC5tcDMnXTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuZW5kTXVzaWMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMuc2Z4Q2FjaGUgPSB7fTtcclxuICAgICAgICB0aGlzLm11dGVCdG4gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hdWRpby1tdXRlXScpO1xyXG4gICAgICAgIHRoaXMudm9sdW1lU2xpZGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtYXVkaW8tdm9sdW1lXScpO1xyXG4gICAgICAgIHRoaXMuc2Z4U2xpZGVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtc2Z4LXZvbHVtZV0nKTtcclxuXHJcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIExhbmNlciBhdXRvbWF0aXF1ZW1lbnQgYXByw6hzIHVuIGTDqWxhaVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wbGF5KCksIDgwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IFNUQVRVUyBUUkFDS0lORyA9PT1cclxuXHJcbiAgICBjcmVhdGVFbXB0eVN0YXR1c2VzKCkge1xyXG4gICAgICAgIHJldHVybiB7XHJcbiAgICAgICAgICAgIGJsZWVkaW5nOiAwLFxyXG4gICAgICAgICAgICBibGlnaHRlZDogMCxcclxuICAgICAgICAgICAgc3R1bm5lZDogZmFsc2UsXHJcbiAgICAgICAgICAgIG1hcmtlZDogMCxcclxuICAgICAgICAgICAgcHJvdGVjdGVkOiAwLFxyXG4gICAgICAgICAgICBzdGVhbHRoZWQ6IDAsXHJcbiAgICAgICAgICAgIHJpcG9zdGU6IDAsXHJcbiAgICAgICAgICAgIGRtZ1VwOiAwLFxyXG4gICAgICAgICAgICBzcGRVcDogMCxcclxuICAgICAgICAgICAgZG9kZ2VVcDogMCxcclxuICAgICAgICAgICAgY3JpdFVwOiAwLFxyXG4gICAgICAgIH07XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2hhcmFjdGVyU3RhdHVzZXMobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdyb3VuZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRpY2tSb3VuZFN0YXR1c2VzKCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47IC8vIHRpY2tSb3VuZFN0YXR1c2VzIGFscmVhZHkgY2FsbHMgcmVuZGVyQWxsU3RhdHVzSWNvbnNcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlQWJpbGl0eVN0YXR1c0NoYW5nZShsb2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdwcm90ZWN0ZWQnLCBsb2cuZHVyYXRpb24gfHwgMik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50dXJuc1JlbWFpbmluZyAhPT0gdW5kZWZpbmVkICYmIGxvZy50dXJuc1JlbWFpbmluZyA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGVlZGluZycsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnR1cm5zUmVtYWluaW5nICE9PSB1bmRlZmluZWQgJiYgbG9nLnR1cm5zUmVtYWluaW5nIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsaWdodGVkJywgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW5uZWRfc2tpcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ3N0dW5uZWQnLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICAvLyBTdGVhbHRoIGNvbnN1bWVkIG9uIGF0dGFja1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5hdHRhY2tlciAmJiBsb2cuYXR0YWNrZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7bG9nLmF0dGFja2VyVGVhbX0tJHtsb2cuYXR0YWNrZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldICYmIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XS5zdGVhbHRoZWQgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XS5zdGVhbHRoZWQgPSAwO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV90cmlnZ2VyJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuaGFuZGxlU3luZXJneVN0YXR1c0NoYW5nZShsb2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNsZWFyQWxsU3RhdHVzZXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnJlbmRlckFsbFN0YXR1c0ljb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlQWJpbGl0eVN0YXR1c0NoYW5nZShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxlZWRpbmcnLCBsb2cuYmxlZWRUdXJucyB8fCAzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuYWxsSGl0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaW1hcnkgPSBsb2cuYWxsSGl0cy5maW5kKGggPT4gaC5pc1ByaW1hcnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmltYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKHByaW1hcnkubmFtZSwgcHJpbWFyeS50ZWFtLCAnYmxpZ2h0ZWQnLCBsb2cuYmxpZ2h0VHVybnMgfHwgMyk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2cudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGlnaHRlZCcsIGxvZy5ibGlnaHRUdXJucyB8fCAzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdzdHVubmVkJywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWFyayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnbWFya2VkJywgbG9nLm1hcmtUdXJucyB8fCAzKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgJ3JpcG9zdGUnLCBsb2cucmlwb3N0ZVR1cm5zIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlbGZfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlCdWZmU3RhdHVzZXMobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy5idWZmcywgbG9nLmJ1ZmZEdXJhdGlvbiB8fCAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYXBwbHlUZWFtQnVmZlN0YXR1c2VzKGxvZy5jYXN0ZXJUZWFtLCBsb2cuYnVmZnMsIGxvZy5idWZmRHVyYXRpb24gfHwgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3RlYWx0aCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCAnc3RlYWx0aGVkJywgbG9nLnN0ZWFsdGhUdXJucyB8fCAxKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0X2RvZGdlJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdwcm90ZWN0ZWQnLCBsb2cucHJvdGVjdFR1cm5zIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnZG9kZ2VVcCcsIGxvZy5wcm90ZWN0VHVybnMgfHwgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZW1lcmdlbmN5X2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5zZWxmQmxlZWRUdXJucyAmJiBsb2cuc2VsZkJsZWVkVHVybnMgPiAwICYmIGxvZy5jYXN0ZXIpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgJ2JsZWVkaW5nJywgbG9nLnNlbGZCbGVlZFR1cm5zKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICAgICAgLy8gTWFyayBtYXkgYmUgY29uc3VtZWQgb24gaGl0IChyZW1vdmVPbkhpdClcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdEtleSA9IGAke2xvZy50YXJnZXRUZWFtfS0ke2xvZy50YXJnZXR9YDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBXZSBjYW4ndCBrbm93IGZvciBzdXJlIGlmIHJlbW92ZU9uSGl0LCBzbyBsZWF2ZSB0aGUgaWNvbiAtIGl0IHdpbGwgdGljayBkb3duXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgaGFuZGxlU3luZXJneVN0YXR1c0NoYW5nZShsb2cpIHtcclxuICAgICAgICBpZiAoIWxvZy5lZmZlY3RUeXBlKSByZXR1cm47XHJcblxyXG4gICAgICAgIHN3aXRjaCAobG9nLmVmZmVjdFR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnZ3JhbnRfcmlwb3N0ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cucGFydG5lckNoYXIsIGxvZy5wYXJ0bmVyQ2hhclRlYW0sICdyaXBvc3RlJywgbG9nLmdyYW50ZWRUdXJucyB8fCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0ZW1wX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5idWZmVHlwZXMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBkdXJhdGlvbiA9IGxvZy5idWZmRHVyYXRpb24gfHwgMjtcclxuICAgICAgICAgICAgICAgICAgICBsb2cuYnVmZlR5cGVzLmZvckVhY2godHlwZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0YXR1c0tleSA9IHRoaXMuYnVmZlR5cGVUb1N0YXR1c0tleSh0eXBlKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHN0YXR1c0tleSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtLCBzdGF0dXNLZXksIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FwcGx5X21hcmsnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ21hcmtlZCcsIGxvZy5tYXJrVHVybnMgfHwgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZ3JhbnRfZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtLCAnZG9kZ2VVcCcsIGxvZy5kb2RnZUR1cmF0aW9uIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2V4dGVuZF9zdGVhbHRoJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cucGFydG5lckNoYXIgJiYgbG9nLnBhcnRuZXJDaGFyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2xvZy5wYXJ0bmVyQ2hhclRlYW19LSR7bG9nLnBhcnRuZXJDaGFyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0uc3RlYWx0aGVkICs9IChsb2cuZXh0cmFUdXJucyB8fCAxKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZ3VhcmFudGVlZF9jcml0JzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5wYXJ0bmVyQ2hhciwgbG9nLnBhcnRuZXJDaGFyVGVhbSwgJ2NyaXRVcCcsIDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGJ1ZmZUeXBlVG9TdGF0dXNLZXkodHlwZSkge1xyXG4gICAgICAgIHN3aXRjaCAodHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdkYW1hZ2UnOiByZXR1cm4gJ2RtZ1VwJztcclxuICAgICAgICAgICAgY2FzZSAnc3BlZWQnOiByZXR1cm4gJ3NwZFVwJztcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOiByZXR1cm4gJ2RvZGdlVXAnO1xyXG4gICAgICAgICAgICBjYXNlICdjcml0JzogcmV0dXJuICdjcml0VXAnO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlCdWZmU3RhdHVzZXMoY2hhck5hbWUsIHRlYW1OYW1lLCBidWZmcywgZHVyYXRpb24pIHtcclxuICAgICAgICBpZiAoIWJ1ZmZzKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qga2V5ID0gYCR7dGVhbU5hbWV9LSR7Y2hhck5hbWV9YDtcclxuICAgICAgICBjb25zdCBzID0gdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldO1xyXG4gICAgICAgIGlmICghcykgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAoYnVmZnMuZGFtYWdlICYmIGJ1ZmZzLmRhbWFnZSA+IDApIHMuZG1nVXAgPSBNYXRoLm1heChzLmRtZ1VwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgaWYgKGJ1ZmZzLnNwZWVkICYmIGJ1ZmZzLnNwZWVkID4gMCkgcy5zcGRVcCA9IE1hdGgubWF4KHMuc3BkVXAsIGR1cmF0aW9uKTtcclxuICAgICAgICBpZiAoYnVmZnMuZG9kZ2UgJiYgYnVmZnMuZG9kZ2UgPiAwKSBzLmRvZGdlVXAgPSBNYXRoLm1heChzLmRvZGdlVXAsIGR1cmF0aW9uKTtcclxuICAgICAgICBpZiAoYnVmZnMuY3JpdCAmJiBidWZmcy5jcml0ID4gMCkgcy5jcml0VXAgPSBNYXRoLm1heChzLmNyaXRVcCwgZHVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5VGVhbUJ1ZmZTdGF0dXNlcyh0ZWFtTmFtZSwgYnVmZnMsIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgaWYgKCFidWZmcykgcmV0dXJuO1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXMpKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aCh0ZWFtTmFtZSArICctJykpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHMgPSB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV07XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZnMuZGFtYWdlICYmIGJ1ZmZzLmRhbWFnZSA+IDApIHMuZG1nVXAgPSBNYXRoLm1heChzLmRtZ1VwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZnMuc3BlZWQgJiYgYnVmZnMuc3BlZWQgPiAwKSBzLnNwZFVwID0gTWF0aC5tYXgocy5zcGRVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZzLmRvZGdlICYmIGJ1ZmZzLmRvZGdlID4gMCkgcy5kb2RnZVVwID0gTWF0aC5tYXgocy5kb2RnZVVwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZnMuY3JpdCAmJiBidWZmcy5jcml0ID4gMCkgcy5jcml0VXAgPSBNYXRoLm1heChzLmNyaXRVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNldFN0YXR1cyhjaGFyTmFtZSwgdGVhbU5hbWUsIHN0YXR1c0tleSwgdmFsdWUpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtTmFtZX0tJHtjaGFyTmFtZX1gO1xyXG4gICAgICAgIGlmICghdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldW3N0YXR1c0tleV0gPSB2YWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBjbGVhckFsbFN0YXR1c2VzKGNoYXJOYW1lLCB0ZWFtTmFtZSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW1OYW1lfS0ke2NoYXJOYW1lfWA7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XSkge1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0gPSB0aGlzLmNyZWF0ZUVtcHR5U3RhdHVzZXMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdGlja1JvdW5kU3RhdHVzZXMoKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5jaGFyYWN0ZXJTdGF0dXNlcykpIHtcclxuICAgICAgICAgICAgY29uc3QgcyA9IHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XTtcclxuICAgICAgICAgICAgLy8gRE9UczogTk9UIGRlY3JlbWVudGVkIGhlcmUsIGhhbmRsZWQgYnkgYmxlZWRfdGljay9ibGlnaHRfdGljayBsb2dzXHJcbiAgICAgICAgICAgIC8vIERlY3JlbWVudCBkdXJhdGlvbi1iYXNlZCBzdGF0dXNlcyAoc2tpcCBwZXJtYW5lbnQgYnVmZnMgPj0gOTk5KVxyXG4gICAgICAgICAgICBpZiAocy5tYXJrZWQgPiAwICYmIHMubWFya2VkIDwgOTk5KSBzLm1hcmtlZC0tO1xyXG4gICAgICAgICAgICBpZiAocy5wcm90ZWN0ZWQgPiAwICYmIHMucHJvdGVjdGVkIDwgOTk5KSBzLnByb3RlY3RlZC0tO1xyXG4gICAgICAgICAgICBpZiAocy5zdGVhbHRoZWQgPiAwICYmIHMuc3RlYWx0aGVkIDwgOTk5KSBzLnN0ZWFsdGhlZC0tO1xyXG4gICAgICAgICAgICBpZiAocy5yaXBvc3RlID4gMCAmJiBzLnJpcG9zdGUgPCA5OTkpIHMucmlwb3N0ZS0tO1xyXG4gICAgICAgICAgICBpZiAocy5kbWdVcCA+IDAgJiYgcy5kbWdVcCA8IDk5OSkgcy5kbWdVcC0tO1xyXG4gICAgICAgICAgICBpZiAocy5zcGRVcCA+IDAgJiYgcy5zcGRVcCA8IDk5OSkgcy5zcGRVcC0tO1xyXG4gICAgICAgICAgICBpZiAocy5kb2RnZVVwID4gMCAmJiBzLmRvZGdlVXAgPCA5OTkpIHMuZG9kZ2VVcC0tO1xyXG4gICAgICAgICAgICBpZiAocy5jcml0VXAgPiAwICYmIHMuY3JpdFVwIDwgOTk5KSBzLmNyaXRVcC0tO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJlbmRlckFsbFN0YXR1c0ljb25zKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyQWxsU3RhdHVzSWNvbnMoKSB7XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5jaGFyYWN0ZXJTdGF0dXNlcykpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJTdGF0dXNJY29ucyhrZXkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJTdGF0dXNJY29ucyhrZXkpIHtcclxuICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICBpZiAoIWVsKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5zdGF0dXMtaWNvbnMnKTtcclxuICAgICAgICBpZiAoIWNvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBzID0gdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldO1xyXG4gICAgICAgIGNvbnN0IGljb25zID0gW107XHJcblxyXG4gICAgICAgIC8vIERlYnVmZnNcclxuICAgICAgICBpZiAocy5ibGVlZGluZyA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtdGludCcsIGNsczogJ3N0YXR1cy1pY29uLS1ibGVlZCcsIHRpdGxlOiAnU2FpZ25lbWVudCcgfSk7XHJcbiAgICAgICAgaWYgKHMuYmxpZ2h0ZWQgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLXNrdWxsLWNyb3NzYm9uZXMnLCBjbHM6ICdzdGF0dXMtaWNvbi0tYmxpZ2h0JywgdGl0bGU6ICdQZXN0ZScgfSk7XHJcbiAgICAgICAgaWYgKHMuc3R1bm5lZCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1kaXp6eScsIGNsczogJ3N0YXR1cy1pY29uLS1zdHVuJywgdGl0bGU6ICdFdG91cmRpJyB9KTtcclxuICAgICAgICBpZiAocy5tYXJrZWQgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLWNyb3NzaGFpcnMnLCBjbHM6ICdzdGF0dXMtaWNvbi0tbWFyaycsIHRpdGxlOiAnTWFycXVlJyB9KTtcclxuXHJcbiAgICAgICAgLy8gQnVmZnNcclxuICAgICAgICBpZiAocy5wcm90ZWN0ZWQgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLXNoaWVsZC1hbHQnLCBjbHM6ICdzdGF0dXMtaWNvbi0tcHJvdGVjdCcsIHRpdGxlOiAnUHJvdGVnZScgfSk7XHJcbiAgICAgICAgaWYgKHMuc3RlYWx0aGVkID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1leWUtc2xhc2gnLCBjbHM6ICdzdGF0dXMtaWNvbi0tc3RlYWx0aCcsIHRpdGxlOiAnRnVydGlmJyB9KTtcclxuICAgICAgICBpZiAocy5yaXBvc3RlID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1leGNoYW5nZS1hbHQnLCBjbHM6ICdzdGF0dXMtaWNvbi0tcmlwb3N0ZScsIHRpdGxlOiAnUmlwb3N0ZScgfSk7XHJcbiAgICAgICAgaWYgKHMuZG1nVXAgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLWZpc3QtcmFpc2VkJywgY2xzOiAnc3RhdHVzLWljb24tLWRtZy11cCcsIHRpdGxlOiAnK0RlZ2F0cycgfSk7XHJcbiAgICAgICAgaWYgKHMuc3BkVXAgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLXdpbmQnLCBjbHM6ICdzdGF0dXMtaWNvbi0tc3BkLXVwJywgdGl0bGU6ICcrVml0ZXNzZScgfSk7XHJcbiAgICAgICAgaWYgKHMuZG9kZ2VVcCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtcnVubmluZycsIGNsczogJ3N0YXR1cy1pY29uLS1kb2RnZS11cCcsIHRpdGxlOiAnK0VzcXVpdmUnIH0pO1xyXG4gICAgICAgIGlmIChzLmNyaXRVcCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtYnVsbHNleWUnLCBjbHM6ICdzdGF0dXMtaWNvbi0tY3JpdC11cCcsIHRpdGxlOiAnK0NyaXRpcXVlJyB9KTtcclxuXHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGljb25zLm1hcChpID0+XHJcbiAgICAgICAgICAgIGA8c3BhbiBjbGFzcz1cInN0YXR1cy1pY29uICR7aS5jbHN9XCIgdGl0bGU9XCIke2kudGl0bGV9XCI+PGkgY2xhc3M9XCJmYXMgJHtpLmljb259XCI+PC9pPjwvc3Bhbj5gXHJcbiAgICAgICAgKS5qb2luKCcnKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gRU5EIFNUQVRVUyBUUkFDS0lORyA9PT1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXlCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVQbGF5KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2tpcEJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLnNraXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNraXAoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNwZWVkQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLnNldFNwZWVkKGUpKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQXVkaW8gY29udHJvbHNcclxuICAgICAgICBpZiAodGhpcy5tdXRlQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMubXV0ZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlTXV0ZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMudm9sdW1lU2xpZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudm9sdW1lU2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudm9sdW1lID0gcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5jb21iYXRNdXNpYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY29tYmF0TXVzaWMudm9sdW1lID0gdGhpcy5pc011dGVkID8gMCA6IHRoaXMudm9sdW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZW5kTXVzaWMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmVuZE11c2ljLnZvbHVtZSA9IHRoaXMuaXNNdXRlZCA/IDAgOiB0aGlzLnZvbHVtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNmeFNsaWRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNmeFNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNmeFZvbHVtZSA9IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFVubG9jayBhdWRpbyBvbiBmaXJzdCB1c2VyIGludGVyYWN0aW9uIChicm93c2VyIGF1dG9wbGF5IHBvbGljeSlcclxuICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuYXVkaW9VbmxvY2tlZCkgcmV0dXJuO1xyXG4gICAgICAgICAgICB0aGlzLmF1ZGlvVW5sb2NrZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlOZXh0VHJhY2soKTtcclxuICAgICAgICB9LCB7IG9uY2U6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcgJiYgIXRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NOZXh0TG9nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlUGxheSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nIHx8IHRoaXMuaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBza2lwKCkge1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBBZmZpY2hlciB0b3VzIGxlcyBsb2dzIHJlc3RhbnRzXHJcbiAgICAgICAgd2hpbGUgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBsb2cgPSB0aGlzLmxvZ3NbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlMb2cobG9nKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2tBYmlsaXR5Q29vbGRvd25zKGxvZyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVyU3RhdHVzZXMobG9nKTtcclxuICAgICAgICAgICAgaWYgKGxvZy50eXBlID09PSAnZGVhdGgnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWF0aChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgLy8gU3luZXJneSB0cmlnZ2VycyB0aGF0IGtpbGwgdGFyZ2V0c1xyXG4gICAgICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdzeW5lcmd5X3RyaWdnZXInICYmIGxvZy50YXJnZXRIUCA9PT0gMCAmJiBsb2cudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWF0aChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2hvd1ZpY3RvcnlPdmVybGF5KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3BlZWQoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBzcGVlZCA9IHBhcnNlRmxvYXQoZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbWJhdFNwZWVkKTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGwnVUlcclxuICAgICAgICB0aGlzLnNwZWVkQnRucy5mb3JFYWNoKGJ0biA9PiBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc05leHRMb2coKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZyB8fCB0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZpY3RvcnlPdmVybGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBsb2cgPSB0aGlzLmxvZ3NbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc0xvZyhsb2cpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGVyIGxlIGTDqWxhaVxyXG4gICAgICAgIGxldCBkZWxheSA9IHRoaXMuZ2V0RGVsYXlGb3JMb2cobG9nKTtcclxuICAgICAgICBkZWxheSA9IGRlbGF5IC8gdGhpcy5zcGVlZDtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb2Nlc3NOZXh0TG9nKCksIGRlbGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZWxheUZvckxvZyhsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JvdW5kJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2luaXRpYXRpdmUnOiByZXR1cm4gNjAwO1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOiByZXR1cm4gMzAwMDtcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6IHJldHVybiAyODAwO1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOiByZXR1cm4gMzUwMDtcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdCc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICd2aWN0b3J5JzpcclxuICAgICAgICAgICAgY2FzZSAnZHJhdyc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICAvLyBOb3V2ZWF1eCB0eXBlc1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF90aWNrJzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW5uZWRfc2tpcCc6IHJldHVybiAxODAwO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2FjdGl2YXRlJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzogcmV0dXJuIHRoaXMuZ2V0QWJpbGl0eURlbGF5KGxvZyk7XHJcbiAgICAgICAgICAgIC8vIFN5bmVyZ2llc1xyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X2Fubm91bmNlJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N5bmVyZ3lfdHJpZ2dlcic6IHJldHVybiB0aGlzLmdldFN5bmVyZ3lUcmlnZ2VyRGVsYXkobG9nKTtcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDEyMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldFN5bmVyZ3lUcmlnZ2VyRGVsYXkobG9nKSB7XHJcbiAgICAgICAgLy8gUmVhY3RpdmUgc3luZXJnaWVzIChib251cyBhdHRhY2tzKSBuZWVkIG1vcmUgdGltZVxyXG4gICAgICAgIGlmIChsb2cuZGFtYWdlICE9PSB1bmRlZmluZWQpIHJldHVybiAzNTAwO1xyXG4gICAgICAgIHJldHVybiAyNTAwO1xyXG4gICAgfVxyXG5cclxuICAgIGdldEFiaWxpdHlEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JhY2tsaW5lX3N0cmlrZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2FybW9yX3BpZXJjZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvbnVzX3ZzX21hcmtlZCc6IHJldHVybiAzMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfYXR0YWNrJzogcmV0dXJuIDM1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW4nOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAnbWFyayc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2J1ZmYnOlxyXG4gICAgICAgICAgICBjYXNlICdzZWxmX2J1ZmYnOlxyXG4gICAgICAgICAgICBjYXNlICdzdGVhbHRoJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2hlYWwnOiByZXR1cm4gMjgwMDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfYnVmZic6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdlbWVyZ2VuY3lfaGVhbCc6IHJldHVybiAyODAwO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0X2RvZGdlJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyYW5zZm9ybV9kYW1hZ2UnOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgY2FzZSAndWx0cmFfaW5zdGluY3QnOiByZXR1cm4gMzUwMDtcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NMb2cobG9nKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKGxvZyk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TG9nKGxvZyk7XHJcblxyXG4gICAgICAgIC8vIFN5bmNocm9uaXNlciBsYSBtaXNlIMOgIGpvdXIgZGVzIEhQIGF2ZWMgbCdhbmltYXRpb25cclxuICAgICAgICBjb25zdCBocERlbGF5ID0gdGhpcy5nZXRIUFVwZGF0ZURlbGF5KGxvZyk7XHJcbiAgICAgICAgaWYgKGhwRGVsYXkgPiAwKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyksIGhwRGVsYXkgLyB0aGlzLnNwZWVkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFN1aXZpIGRlcyBjb29sZG93bnNcclxuICAgICAgICB0aGlzLnRyYWNrQWJpbGl0eUNvb2xkb3ducyhsb2cpO1xyXG5cclxuICAgICAgICAvLyBTdWl2aSBkZXMgc3RhdHV0cyAoaWNvbmVzIGJ1ZmYvZGVidWZmKVxyXG4gICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVyU3RhdHVzZXMobG9nKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFja0FiaWxpdHlDb29sZG93bnMobG9nKSB7XHJcbiAgICAgICAgLy8gUXVhbmQgdW5lIGNvbXDDqXRlbmNlIGVzdCB1dGlsaXPDqWUsIG1ldHRyZSBlbiBjb29sZG93blxyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2FiaWxpdHlfdXNlJyAmJiBsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eURhdGEgPSB0aGlzLmFiaWxpdHlFbGVtZW50c1trZXldO1xyXG4gICAgICAgICAgICBpZiAoYWJpbGl0eURhdGEgJiYgYWJpbGl0eURhdGEubWF4Q2QgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XSA9IGFiaWxpdHlEYXRhLm1heENkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5KGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEEgY2hhcXVlIG5vdXZlYXUgcm91bmQsIGTDqWNyw6ltZW50ZXIgdG91cyBsZXMgY29vbGRvd25zXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAncm91bmQnKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuYWJpbGl0eUNvb2xkb3ducykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldLS07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5KGtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheShrZXkpIHtcclxuICAgICAgICBjb25zdCBhYmlsaXR5RGF0YSA9IHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgaWYgKCFhYmlsaXR5RGF0YSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjZCA9IHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldIHx8IDA7XHJcblxyXG4gICAgICAgIGlmIChjZCA+IDApIHtcclxuICAgICAgICAgICAgLy8gRW4gY29vbGRvd24gOiBncmlzZXIgKyBhZmZpY2hlciBiYWRnZVxyXG4gICAgICAgICAgICBhYmlsaXR5RGF0YS5lbC5jbGFzc0xpc3QuYWRkKCdjaGFyYWN0ZXItaW5mb19fYWJpbGl0eS0tb24tY2QnKTtcclxuICAgICAgICAgICAgaWYgKGFiaWxpdHlEYXRhLmJhZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBhYmlsaXR5RGF0YS5iYWRnZS50ZXh0Q29udGVudCA9IGAke2NkfVRgO1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eURhdGEuYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gUHLDqnQgOiByZXRpcmVyIGxlIGdyaXNcclxuICAgICAgICAgICAgYWJpbGl0eURhdGEuZWwuY2xhc3NMaXN0LnJlbW92ZSgnY2hhcmFjdGVyLWluZm9fX2FiaWxpdHktLW9uLWNkJyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RGF0YS5iYWRnZSkge1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eURhdGEuYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRIUFVwZGF0ZURlbGF5KGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6IHJldHVybiA0MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzogcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOiByZXR1cm4gMjAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYWN0aXZhdGUnOiByZXR1cm4gMzUwO1xyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6IHJldHVybiB0aGlzLmdldEFiaWxpdHlIUERlbGF5KGxvZyk7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N5bmVyZ3lfdHJpZ2dlcic6IHJldHVybiA4MDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBYmlsaXR5SFBEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfaGVhbCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzogcmV0dXJuIDQwMDtcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3VsdHJhX2luc3RpbmN0JzogcmV0dXJuIDQwMDtcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBbmltYXRpb24obG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5hdHRhY2tlciwgbG9nLmF0dGFja2VyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy5pc0NyaXQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuaGVhbGVyLCBsb2cuaGVhbGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlZmVuZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWZlbmQobG9nLmRlZmVuZGVyLCBsb2cuZGVmZW5kZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkb2RnZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEb2RnZShsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVhdGgobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIE5vdXZlYXV4IHR5cGVzXHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxlZWRpbmcnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEb1QobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGlnaHRlZCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW5uZWRfc2tpcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTdHVubmVkKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2FjdGl2YXRlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuYXR0YWNrZXIsIGxvZy5hdHRhY2tlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYWJpbGl0eV91c2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5QWJpbGl0eUFuaW1hdGlvbihsb2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIFN5bmVyZ2llc1xyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X2Fubm91bmNlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN5bmVyZ3lBbm5vdW5jZShsb2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N5bmVyZ3lfdHJpZ2dlcic6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTeW5lcmd5VHJpZ2dlcihsb2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBOT1VWRUxMRVMgQU5JTUFUSU9OUyA9PT1cclxuXHJcbiAgICBhbmltYXRlRG9UKHRhcmdldE5hbWUsIHRhcmdldFRlYW0sIGRvdENsYXNzKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoZG90Q2xhc3MpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKGRvdENsYXNzKSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVTdHVubmVkKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc3R1bm5lZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdzdHVubmVkJyksIDE0MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlTWFya2VkKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnbWFya2VkJyk7XHJcbiAgICAgICAgICAgIC8vIExhIG1hcnF1ZSByZXN0ZSB2aXNpYmxlIHBsdXMgbG9uZ3RlbXBzXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ21hcmtlZCcpLCAyMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZUJ1ZmYodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdidWZmZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnYnVmZmVkJyksIDE0MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlU3RlYWx0aCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3N0ZWFsdGhlZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdzdGVhbHRoZWQnKSwgMTUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBYmlsaXR5QW5pbWF0aW9uKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnN1YnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxlZWRpbmcnKSwgNzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgYmxpZ2h0S2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShibGlnaHRLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChibGlnaHRLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGNhc3RlckVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoY2FzdGVyRWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2FzdGVyRWwuY2xhc3NMaXN0LmFkZCgnYXR0YWNraW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gY2FzdGVyRWwuY2xhc3NMaXN0LnJlbW92ZSgnYXR0YWNraW5nJyksIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEFPRTogaHVydCBhbGwgaGl0IGVuZW1pZXNcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuYWxsSGl0cykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2cuYWxsSGl0cy5mb3JFYWNoKGggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoaC5uYW1lLCBoLnRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcpLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEJsaWdodCBET1QgYW5pbWF0aW9uIG9ubHkgb24gcHJpbWFyeSB0YXJnZXRcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmltYXJ5ID0gbG9nLmFsbEhpdHMuZmluZChoID0+IGguaXNQcmltYXJ5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJpbWFyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChwcmltYXJ5Lm5hbWUsIHByaW1hcnkudGVhbSwgJ2JsaWdodGVkJyksIDEwMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEZhbGxiYWNrIGZvciBvbGQgbG9nIGZvcm1hdFxyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnKSwgNzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hbmltYXRlU3R1bm5lZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSksIDcwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWFyayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKG1hcmtLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChtYXJrS2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB0aGlzLmFuaW1hdGVNYXJrZWQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJpcG9zdGVLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHJpcG9zdGVLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChyaXBvc3RlS2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWxmX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxmQnVmZktleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBYm9taW5hdGlvbiBUcmFuc2Zvcm1hdGlvbiA6IHN3aXRjaCBzbHVnIHRvIGJlYXN0IHBlcm1hbmVudGx5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvZy5hYmlsaXR5TmFtZSA9PT0gJ1RyYW5zZm9ybWF0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJhY3RlclNsdWdzW3NlbGZCdWZmS2V5XSA9ICdiZWFzdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShzZWxmQnVmZktleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHNlbGZCdWZmS2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9oZWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydHlIZWFsS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngocGFydHlIZWFsS2V5LCAnaGVhbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBbmltZXIgdG91cyBsZXMgYWxsacOpcyBzb2lnbsOpc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2cuaGVhbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZy5oZWFsZWQuZm9yRWFjaChoID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGgubmFtZSwgaC50ZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hlYWxlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGVhbGVkJyksIDE1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnR5QnVmZktleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUocGFydHlCdWZmS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngocGFydHlCdWZmS2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEFuaW1lciB0b3VzIGxlcyBhbGxpw6lzIGR1IG3Dqm1lIGPDtHTDqVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlVGVhbUJ1ZmYobG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0ZWFsdGgnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGVhbHRoS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShzdGVhbHRoS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoc3RlYWx0aEtleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3RlYWx0aChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYXJtb3JfcGllcmNlJzpcclxuICAgICAgICAgICAgY2FzZSAnYmFja2xpbmVfc3RyaWtlJzpcclxuICAgICAgICAgICAgY2FzZSAnYm9udXNfdnNfbWFya2VkJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cuaXNDcml0IHx8IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdlbWVyZ2VuY3lfaGVhbCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVtZXJnSGVhbEtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KGVtZXJnSGVhbEtleSwgJ2hlYWwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVIZWFsKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdF9kb2RnZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByb3REb2RnZUtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHByb3REb2RnZUtleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVmZW5kKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2Zvcm1fZGFtYWdlJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdodXJ0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcpLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd1bHRyYV9pbnN0aW5jdCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVpS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZSh1aUtleSwgJ2F0dGFja2FuaW1hdGlvbi53ZWJwJywgMTgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeCh1aUtleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdWlDYXN0ZXJFbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHVpQ2FzdGVyRWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdWlDYXN0ZXJFbC5jbGFzc0xpc3QuYWRkKCd1bHRyYS1pbnN0aW5jdC1hdHRhY2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB1aUNhc3RlckVsLmNsYXNzTGlzdC5yZW1vdmUoJ3VsdHJhLWluc3RpbmN0LWF0dGFjaycpLCAxODAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCB1aVRhcmdldEVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHVpVGFyZ2V0RWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHVpVGFyZ2V0RWwuY2xhc3NMaXN0LmFkZCgnaHVydCcsICdjcml0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHVpVGFyZ2V0RWwuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcsICdjcml0JyksIDgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9LCA2MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVUZWFtQnVmZihjYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5jaGFyYWN0ZXJFbGVtZW50cykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoY2FzdGVyVGVhbSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1trZXldO1xyXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnYnVmZmVkJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2J1ZmZlZCcpLCAxNDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBTWU5FUkdZIEFOSU1BVElPTlMgPT09XHJcblxyXG4gICAgYW5pbWF0ZVN5bmVyZ3lBbm5vdW5jZShsb2cpIHtcclxuICAgICAgICBjb25zdCB0cmlnZ2VyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50cmlnZ2VyQ2hhciwgbG9nLnRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHBhcnRuZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLnBhcnRuZXJDaGFyLCBsb2cudGVhbSk7XHJcblxyXG4gICAgICAgIGlmICh0cmlnZ2VyKSB7XHJcbiAgICAgICAgICAgIHRyaWdnZXIuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1hbm5vdW5jZS1nbG93Jyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LWFubm91bmNlLWdsb3cnKSwgMTUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXJ0bmVyKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgcGFydG5lci5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWFubm91bmNlLWdsb3cnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcGFydG5lci5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LWFubm91bmNlLWdsb3cnKSwgMTUwMCk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEcmF3IFNWRyBsaW5rIGJldHdlZW4gdGhlIHR3b1xyXG4gICAgICAgIGlmICh0cmlnZ2VyICYmIHBhcnRuZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5kcmF3U3luZXJneUxpbmsodHJpZ2dlciwgcGFydG5lcik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVTeW5lcmd5VHJpZ2dlcihsb2cpIHtcclxuICAgICAgICBjb25zdCB0cmlnZ2VyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50cmlnZ2VyQ2hhciwgbG9nLnRyaWdnZXJDaGFyVGVhbSk7XHJcbiAgICAgICAgY29uc3QgcGFydG5lciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cucGFydG5lckNoYXIsIGxvZy5wYXJ0bmVyQ2hhclRlYW0pO1xyXG5cclxuICAgICAgICAvLyBQaGFzZSAxOiBUcmlnZ2VyIGdsb3dcclxuICAgICAgICBpZiAodHJpZ2dlcikge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktdHJpZ2dlci1nbG93Jyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdHJpZ2dlci5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LXRyaWdnZXItZ2xvdycpLCAxODAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFBoYXNlIDI6IFNWRyBsaW5rIGJldHdlZW4gdHJpZ2dlciBhbmQgcGFydG5lclxyXG4gICAgICAgIGlmICh0cmlnZ2VyICYmIHBhcnRuZXIpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmRyYXdTeW5lcmd5TGluayh0cmlnZ2VyLCBwYXJ0bmVyKSwgNDAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFBoYXNlIDM6IFBhcnRuZXIgcmVhY3Rpb25cclxuICAgICAgICBpZiAocGFydG5lcikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBhcnRuZXIuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1yZWFjdCcpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwYXJ0bmVyLmNsYXNzTGlzdC5yZW1vdmUoJ3N5bmVyZ3ktcmVhY3QnKSwgODAwKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBJZiBpdCdzIGEgYm9udXMgYXR0YWNrLCBhbmltYXRlIHRoZSBwYXJ0bmVyIGF0dGFja2luZ1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5kYW1hZ2UgIT09IHVuZGVmaW5lZCAmJiBsb2cudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydG5lcktleSA9IGAke2xvZy5wYXJ0bmVyQ2hhclRlYW19LSR7bG9nLnBhcnRuZXJDaGFyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHBhcnRuZXJLZXksICdhdHRhY2thbmltYXRpb24ud2VicCcsIDEyMDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngocGFydG5lcktleSwgJ2F0dGFjaycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcpLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9LCA0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZHJhd1N5bmVyZ3lMaW5rKGVsMSwgZWwyKSB7XHJcbiAgICAgICAgY29uc3Qgc3RhZ2UgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuYmF0dGxlLXN0YWdlJyk7XHJcbiAgICAgICAgaWYgKCFzdGFnZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBSZW1vdmUgZXhpc3RpbmcgU1ZHIGlmIGFueVxyXG4gICAgICAgIGNvbnN0IGV4aXN0aW5nU3ZnID0gc3RhZ2UucXVlcnlTZWxlY3RvcignLnN5bmVyZ3ktbGluay1zdmcnKTtcclxuICAgICAgICBpZiAoZXhpc3RpbmdTdmcpIGV4aXN0aW5nU3ZnLnJlbW92ZSgpO1xyXG5cclxuICAgICAgICBjb25zdCBzdmcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ3N2ZycpO1xyXG4gICAgICAgIHN2Zy5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWxpbmstc3ZnJyk7XHJcbiAgICAgICAgc3ZnLnNldEF0dHJpYnV0ZSgnd2lkdGgnLCAnMTAwJScpO1xyXG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ2hlaWdodCcsICcxMDAlJyk7XHJcblxyXG4gICAgICAgIGNvbnN0IHN0YWdlUmVjdCA9IHN0YWdlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IHJlY3QxID0gZWwxLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG4gICAgICAgIGNvbnN0IHJlY3QyID0gZWwyLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xyXG5cclxuICAgICAgICBjb25zdCB4MSA9IHJlY3QxLmxlZnQgKyByZWN0MS53aWR0aCAvIDIgLSBzdGFnZVJlY3QubGVmdDtcclxuICAgICAgICBjb25zdCB5MSA9IHJlY3QxLnRvcCArIHJlY3QxLmhlaWdodCAvIDIgLSBzdGFnZVJlY3QudG9wO1xyXG4gICAgICAgIGNvbnN0IHgyID0gcmVjdDIubGVmdCArIHJlY3QyLndpZHRoIC8gMiAtIHN0YWdlUmVjdC5sZWZ0O1xyXG4gICAgICAgIGNvbnN0IHkyID0gcmVjdDIudG9wICsgcmVjdDIuaGVpZ2h0IC8gMiAtIHN0YWdlUmVjdC50b3A7XHJcblxyXG4gICAgICAgIGNvbnN0IGxpbmUgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50TlMoJ2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJywgJ2xpbmUnKTtcclxuICAgICAgICBsaW5lLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktbGluay1saW5lJyk7XHJcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3gxJywgeDEpO1xyXG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd5MScsIHkxKTtcclxuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgneDInLCB4Mik7XHJcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3kyJywgeTIpO1xyXG5cclxuICAgICAgICBzdmcuYXBwZW5kQ2hpbGQobGluZSk7XHJcbiAgICAgICAgc3RhZ2UuYXBwZW5kQ2hpbGQoc3ZnKTtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGFmdGVyIGFuaW1hdGlvblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc3ZnLnJlbW92ZSgpLCAxODAwIC8gdGhpcy5zcGVlZCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IFNQUklURSBTV0FQID09PVxyXG5cclxuICAgIHN3YXBTcHJpdGUoa2V5LCBzcHJpdGVOYW1lLCBkdXJhdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVsID0gdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1trZXldO1xyXG4gICAgICAgIGlmICghZWwpIHJldHVybjtcclxuICAgICAgICBjb25zdCBzbHVnID0gdGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldO1xyXG4gICAgICAgIGlmICghc2x1ZykgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGltZyA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItc3ByaXRlJyk7XHJcbiAgICAgICAgaWYgKCFpbWcpIHJldHVybjtcclxuICAgICAgICBpbWcuc3JjID0gYC9hc3NldC9pbWcvY29tYmF0LyR7c2x1Z30vJHtzcHJpdGVOYW1lfWA7XHJcbiAgICAgICAgaWYgKGR1cmF0aW9uID4gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWFkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjID0gYC9hc3NldC9pbWcvY29tYmF0LyR7dGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldfS9maWdodGlkbGUud2VicGA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IEFOSU1BVElPTlMgRVhJU1RBTlRFUyA9PT1cclxuXHJcbiAgICBhbmltYXRlQXR0YWNrKGF0dGFja2VyTmFtZSwgYXR0YWNrZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtLCBpc0NyaXQpIHtcclxuICAgICAgICBjb25zdCBhdHRhY2tlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChhdHRhY2tlck5hbWUsIGF0dGFja2VyVGVhbSk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG5cclxuICAgICAgICBpZiAoYXR0YWNrZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7YXR0YWNrZXJUZWFtfS0ke2F0dGFja2VyTmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnYXR0YWNrYW5pbWF0aW9uLndlYnAnLCAxMjAwKTtcclxuICAgICAgICAgICAgYXR0YWNrZXIuY2xhc3NMaXN0LmFkZCgnYXR0YWNraW5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoa2V5LCAnYXR0YWNrJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gYXR0YWNrZXIuY2xhc3NMaXN0LnJlbW92ZSgnYXR0YWNraW5nJyksIDEyMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdodXJ0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNDcml0KSB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnY3JpdCcpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcsICdjcml0JyksIDgwMCk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVIZWFsKGhlYWxlck5hbWUsIGhlYWxlclRlYW0sIHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCBoZWFsZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoaGVhbGVyTmFtZSwgaGVhbGVyVGVhbSk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG5cclxuICAgICAgICBpZiAoaGVhbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2hlYWxlclRlYW19LSR7aGVhbGVyTmFtZX1gO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGFyYWN0ZXJIYXNIZWFsW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShrZXksICdoZWFsaW5nLndlYnAnLCAxNTAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShrZXksICdza2lsbC53ZWJwJywgMTUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaGVhbGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWxpbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChrZXksICdoZWFsJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaGVhbGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxpbmcnKSwgMTUwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdoZWFsZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaGVhbGVkJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRGVmZW5kKGRlZmVuZGVyTmFtZSwgZGVmZW5kZXJUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgZGVmZW5kZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoZGVmZW5kZXJOYW1lLCBkZWZlbmRlclRlYW0pO1xyXG4gICAgICAgIGlmIChkZWZlbmRlcikge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtkZWZlbmRlclRlYW19LSR7ZGVmZW5kZXJOYW1lfWA7XHJcbiAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShrZXksICdkZWZlbmRpbmcud2VicCcsIDE4MDApO1xyXG4gICAgICAgICAgICBkZWZlbmRlci5jbGFzc0xpc3QuYWRkKCdkZWZlbmRpbmcnKTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChrZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGRlZmVuZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlZmVuZGluZycpLCAxODAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURvZGdlKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZG9kZ2luZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkb2RnaW5nJyksIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRGVhdGgodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAoIXRhcmdldCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBrZXkgPSBgJHt0YXJnZXRUZWFtfS0ke3RhcmdldE5hbWV9YDtcclxuICAgICAgICBjb25zdCBzbHVnID0gdGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldO1xyXG4gICAgICAgIGNvbnN0IGltZyA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLXNwcml0ZScpO1xyXG5cclxuICAgICAgICAvLyBUcnkgdG8gc3dhcCB0byBjb3Jwc2UgaW1hZ2VcclxuICAgICAgICBpZiAoaW1nICYmIHNsdWcpIHtcclxuICAgICAgICAgICAgY29uc3QgY29ycHNlSW1nID0gbmV3IEltYWdlKCk7XHJcbiAgICAgICAgICAgIGNvcnBzZUltZy5zcmMgPSBgL2Fzc2V0L2ltZy9jb21iYXQvJHtzbHVnfS9jb3Jwc2UucG5nYDtcclxuICAgICAgICAgICAgY29ycHNlSW1nLm9ubG9hZCA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGltZy5zcmMgPSBjb3Jwc2VJbWcuc3JjO1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RlYWQnLCAnZGVhZC0tY29ycHNlJyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIGNvcnBzZUltZy5vbmVycm9yID0gKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgLy8gTm8gY29ycHNlIGltYWdlIGF2YWlsYWJsZSwgdXNlIENTUyBmYWxsYmFja1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RlYWQnKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZGVhZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGFyYWN0ZXJFbGVtZW50KG5hbWUsIHRlYW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1tgJHt0ZWFtfS0ke25hbWV9YF07XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheUxvZyhsb2cpIHtcclxuICAgICAgICBpZiAoIXRoaXMubG9nQ29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGVudHJ5LmNsYXNzTmFtZSA9ICdjb21iYXQtbG9nX19lbnRyeSc7XHJcblxyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ3JvdW5kJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tcm91bmQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAndmljdG9yeScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXZpY3RvcnknKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnZHJhdycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWRlZmVhdCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdhYmlsaXR5X3VzZScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWFiaWxpdHknKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYmxlZWRfdGljaycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWJsZWVkJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsaWdodF90aWNrJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tYmxpZ2h0Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3N0dW5uZWRfc2tpcCcpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXN0dW4nKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAncmlwb3N0ZV9hY3RpdmF0ZScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXJpcG9zdGUnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnc3luZXJneV9hbm5vdW5jZScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXN5bmVyZ3ktYW5ub3VuY2UnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnc3luZXJneV90cmlnZ2VyJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tc3luZXJneS10cmlnZ2VyJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbnRyeS5pbm5lckhUTUwgPSBsb2cubWVzc2FnZTtcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsVG9wID0gdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUhlYWx0aEJhcnMobG9nKSB7XHJcbiAgICAgICAgbGV0IGNoYXJhY3Rlck5hbWUgPSBudWxsO1xyXG4gICAgICAgIGxldCB0ZWFtTmFtZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRIUCA9IG51bGw7XHJcbiAgICAgICAgbGV0IG1heEhQID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gRMOpdGVybWluZXIgbGVzIGRvbm7DqWVzIHNlbG9uIGxlIHR5cGUgZGUgbG9nXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAnYXR0YWNrJyB8fCBsb2cudHlwZSA9PT0gJ3JpcG9zdGVfYWN0aXZhdGUnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdoZWFsJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYmxlZWRfdGljaycgfHwgbG9nLnR5cGUgPT09ICdibGlnaHRfdGljaycpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2FiaWxpdHlfdXNlJykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnc3luZXJneV90cmlnZ2VyJykge1xyXG4gICAgICAgICAgICAvLyBTeW5lcmdpZXMgY2FuIGNhdXNlIGRhbWFnZVxyXG4gICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0SFAgIT09IHVuZGVmaW5lZCAmJiBsb2cudGFyZ2V0TWF4SFApIHtcclxuICAgICAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBzaSBub3VzIGF2b25zIGxlcyBkb25uw6llcyBuw6ljZXNzYWlyZXNcclxuICAgICAgICBpZiAoY2hhcmFjdGVyTmFtZSAmJiB0ZWFtTmFtZSAmJiBjdXJyZW50SFAgIT09IG51bGwgJiYgY3VycmVudEhQICE9PSB1bmRlZmluZWQgJiYgbWF4SFApIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCBtYXhIUCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzKGxvZykge1xyXG4gICAgICAgIC8vIEFPRSBoaXRzIChibGlnaHRfYXR0YWNrKTogdXBkYXRlIEhQIGZvciBhbGwgaGl0IGVuZW1pZXNcclxuICAgICAgICBpZiAobG9nLmFsbEhpdHMpIHtcclxuICAgICAgICAgICAgbG9nLmFsbEhpdHMuZm9yRWFjaChoID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAoaC5uYW1lLCBoLnRlYW0sIGguaHAsIGgubWF4SHApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgLy8gQ29tcMOpdGVuY2VzIHF1aSBpbmZsaWdlbnQgZGVzIGTDqWfDonRzIMOgIHVuZSBjaWJsZVxyXG4gICAgICAgIGVsc2UgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldEhQICE9PSB1bmRlZmluZWQgJiYgbG9nLnRhcmdldE1heEhQKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy50YXJnZXRIUCwgbG9nLnRhcmdldE1heEhQKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNvaW4gZGUgZ3JvdXBlIDogbWV0dHJlIMOgIGpvdXIgY2hhcXVlIGFsbGnDqSBzb2lnbsOpXHJcbiAgICAgICAgaWYgKGxvZy5zdWJ0eXBlID09PSAncGFydHlfaGVhbCcgJiYgbG9nLmhlYWxlZCkge1xyXG4gICAgICAgICAgICBsb2cuaGVhbGVkLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGgubmFtZSwgaC50ZWFtLCBoLmhwLCBoLm1heEhwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTb2luIGQndXJnZW5jZSA6IG1ldHRyZSDDoCBqb3VyIGxlIGxhbmNldXJcclxuICAgICAgICBpZiAobG9nLnN1YnR5cGUgPT09ICdlbWVyZ2VuY3lfaGVhbCcgJiYgbG9nLmNhc3Rlcikge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0SFAsIGxvZy50YXJnZXRNYXhIUCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYXJhY3RlckhQKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsIG1heEhQKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IG1heEhQID4gMCA/IChjdXJyZW50SFAgLyBtYXhIUCkgKiAxMDAgOiAwO1xyXG5cclxuICAgICAgICAvLyBNaXNlIMOgIGpvdXIgZGUgbGEgYmFycmUgSFAgZGFucyBsYSB6b25lIGRlIGNvbWJhdCAoYmF0dGxlLXN0YWdlKVxyXG4gICAgICAgIGNvbnN0IGhwQmFyID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ocC1iYXJfX2ZpbGwnKTtcclxuICAgICAgICBjb25zdCBocFRleHQgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmhwLXRleHQnKTtcclxuXHJcbiAgICAgICAgaWYgKGhwQmFyKSB7XHJcbiAgICAgICAgICAgIC8vIEFuaW1hdGlvbiBmbHVpZGUgZGUgbGEgYmFycmVcclxuICAgICAgICAgICAgaHBCYXIuc3R5bGUudHJhbnNpdGlvbiA9IGB3aWR0aCAwLjNzIGVhc2Utb3V0YDtcclxuICAgICAgICAgICAgaHBCYXIuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50fSVgO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xhc3NlcyBkZSBjb3VsZXVyIHNlbG9uIGxlIHBvdXJjZW50YWdlXHJcbiAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hwLWJhcl9fZmlsbC0tbG93JywgJ2hwLWJhcl9fZmlsbC0tY3JpdGljYWwnKTtcclxuICAgICAgICAgICAgaWYgKHBlcmNlbnQgPD0gMjUpIHtcclxuICAgICAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5hZGQoJ2hwLWJhcl9fZmlsbC0tY3JpdGljYWwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwZXJjZW50IDw9IDUwKSB7XHJcbiAgICAgICAgICAgICAgICBocEJhci5jbGFzc0xpc3QuYWRkKCdocC1iYXJfX2ZpbGwtLWxvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaHBUZXh0KSB7XHJcbiAgICAgICAgICAgIGhwVGV4dC50ZXh0Q29udGVudCA9IGAke2N1cnJlbnRIUH0vJHttYXhIUH1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWlzZSDDoCBqb3VyIGRlcyBwYW5uZWF1eCBkJ2luZm8gbGF0w6lyYXV4XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbmZvUGFuZWwoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSW5mb1BhbmVsKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFApIHtcclxuICAgICAgICAvLyBUcm91dmVyIGxlIGJvbiBwYW5uZWF1IHNlbG9uIGwnw6lxdWlwZVxyXG4gICAgICAgIGNvbnN0IHBhbmVsQ2xhc3MgPSB0ZWFtTmFtZSA9PT0gJ0VxdWlwZSAxJyA/ICcuaW5mby1wYW5lbC0tdGVhbTEnIDogJy5pbmZvLXBhbmVsLS10ZWFtMic7XHJcbiAgICAgICAgY29uc3QgcGFuZWwgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKHBhbmVsQ2xhc3MpO1xyXG5cclxuICAgICAgICBpZiAoIXBhbmVsKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIFRyb3V2ZXIgbGUgcGVyc29ubmFnZSBkYW5zIGxlIHBhbm5lYXUgcGFyIHNvbiBub21cclxuICAgICAgICBjb25zdCBjaGFyYWN0ZXJJbmZvcyA9IHBhbmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGFyYWN0ZXItaW5mbycpO1xyXG4gICAgICAgIGZvciAoY29uc3QgaW5mbyBvZiBjaGFyYWN0ZXJJbmZvcykge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lRWwgPSBpbmZvLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fbmFtZScpO1xyXG4gICAgICAgICAgICBpZiAobmFtZUVsICYmIG5hbWVFbC50ZXh0Q29udGVudC50cmltKCkgPT09IGNoYXJhY3Rlck5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRzU3BhbiA9IGluZm8ucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19zdGF0cyBzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHNTcGFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNTcGFuLnRleHRDb250ZW50ID0gY3VycmVudEhQO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBBbmltYXRpb24gZmxhc2ggcG91ciBtb250cmVyIGxlIGNoYW5nZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBzdGF0c1NwYW4uY2xhc3NMaXN0LmFkZCgnaHAtdXBkYXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc3RhdHNTcGFuLmNsYXNzTGlzdC5yZW1vdmUoJ2hwLXVwZGF0ZWQnKSwgMzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dWaWN0b3J5T3ZlcmxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQbGF5IHZpY3Rvcnkgb3IgZGVmZWF0IG11c2ljXHJcbiAgICAgICAgdGhpcy5wbGF5RW5kTXVzaWMoKTtcclxuXHJcbiAgICAgICAgLy8gRmluYWxpc2VyIGxlIE1NUiBhIGxhIGZpbiBkdSBjb21iYXRcclxuICAgICAgICB0aGlzLmZpbmFsaXplUmF0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheUVuZE11c2ljKCkge1xyXG4gICAgICAgIC8vIFN0b3AgY29tYmF0IG11c2ljXHJcbiAgICAgICAgaWYgKHRoaXMuY29tYmF0TXVzaWMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21iYXRNdXNpYy5wYXVzZSgpO1xyXG4gICAgICAgICAgICB0aGlzLmNvbWJhdE11c2ljID0gbnVsbDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIERldGVybWluZSBvdXRjb21lIGZyb20gb3ZlcmxheSBjbGFzc1xyXG4gICAgICAgIGxldCB0cmFjayA9IG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vdmVybGF5LmNsYXNzTGlzdC5jb250YWlucygnYmF0dGxlLXN0YWdlX19vdmVybGF5LS12aWN0b3J5JykpIHtcclxuICAgICAgICAgICAgICAgIHRyYWNrID0gJy9hc3NldC9vc3Qvd2lubG9zZS92aWN0b3J5Lm1wMyc7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vdmVybGF5LmNsYXNzTGlzdC5jb250YWlucygnYmF0dGxlLXN0YWdlX19vdmVybGF5LS1kZWZlYXQnKSkge1xyXG4gICAgICAgICAgICAgICAgdHJhY2sgPSAnL2Fzc2V0L29zdC93aW5sb3NlL2RlZmVhdC5tcDMnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2JhdHRsZS1zdGFnZV9fb3ZlcmxheS0tZHJhdycpKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFjayA9ICcvYXNzZXQvb3N0L3dpbmxvc2UvZGVmZWF0Lm1wMyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0cmFjayAmJiAhdGhpcy5pc011dGVkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kTXVzaWMgPSBuZXcgQXVkaW8odHJhY2spO1xyXG4gICAgICAgICAgICB0aGlzLmVuZE11c2ljLnZvbHVtZSA9IHRoaXMudm9sdW1lO1xyXG4gICAgICAgICAgICB0aGlzLmVuZE11c2ljLnBsYXkoKS5jYXRjaCgoKSA9PiB7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZpbmFsaXplUmF0aW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGZpbmFsaXplVXJsID0gdGhpcy5jb250YWluZXIuZGF0YXNldC5maW5hbGl6ZVVybDtcclxuICAgICAgICBpZiAoIWZpbmFsaXplVXJsKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGZpbmFsaXplVXJsLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgJiYgZGF0YS5yYXRpbmdDaGFuZ2UgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JhdGluZ1VwZGF0ZShkYXRhLnJhdGluZ0NoYW5nZSwgZGF0YS5uZXdSYXRpbmcsIGRhdGEubmV3UmF0aW5nMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcignRXJyZXVyIGZpbmFsaXNhdGlvbiByYXRpbmc6JywgZXJyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1JhdGluZ1VwZGF0ZShjaGFuZ2UsIG5ld1JhdGluZywgbmV3UmF0aW5nMikge1xyXG4gICAgICAgIC8vIE1ldHRyZSBhIGpvdXIgbGUgTU1SIGFmZmljaGUgZGFucyBsZSBwYW5uZWF1IGpvdWV1ciAoRXF1aXBlIDEpXHJcbiAgICAgICAgY29uc3QgcmF0aW5nRWwgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW5mby1wYW5lbC0tdGVhbTEgLmluZm8tcGFuZWxfX3JhdGluZycpO1xyXG4gICAgICAgIGlmIChyYXRpbmdFbCAmJiBuZXdSYXRpbmcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmF0aW5nRWwuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHtuZXdSYXRpbmd9IE1NUmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIE1NUiBhZmZpY2hlIGRhbnMgbGUgcGFubmVhdSBhZHZlcnNhaXJlIChFcXVpcGUgMilcclxuICAgICAgICBjb25zdCByYXRpbmdFbDIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW5mby1wYW5lbC0tdGVhbTIgLmluZm8tcGFuZWxfX3JhdGluZy0tZW5lbXknKTtcclxuICAgICAgICBpZiAocmF0aW5nRWwyICYmIG5ld1JhdGluZzIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmF0aW5nRWwyLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7bmV3UmF0aW5nMn0gTU1SYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFmZmljaGVyIGxhIG5vdGlmaWNhdGlvbiBkZSBjaGFuZ2VtZW50IGRhbnMgbCdvdmVybGF5XHJcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1vdmVybGF5XScpO1xyXG4gICAgICAgIGlmIChvdmVybGF5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdpbm5lckRpdiA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignLmJhdHRsZS1zdGFnZV9fd2lubmVyJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGFuZ2VtZW50IE1NUiBFcXVpcGUgMVxyXG4gICAgICAgICAgICBjb25zdCBub3RpZjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbm90aWYxLmNsYXNzTmFtZSA9ICdyYXRpbmctY2hhbmdlJztcclxuICAgICAgICAgICAgbm90aWYxLnN0eWxlLmNzc1RleHQgPSAnZm9udC1zaXplOjEuMnJlbTttYXJnaW4tdG9wOjEycHg7Zm9udC13ZWlnaHQ6Ym9sZDtvcGFjaXR5OjA7dHJhbnNpdGlvbjpvcGFjaXR5IDAuNXM7JztcclxuICAgICAgICAgICAgbm90aWYxLnRleHRDb250ZW50ID0gY2hhbmdlID4gMCA/IGBFcXVpcGUgMSA6ICske2NoYW5nZX0gTU1SYCA6IGBFcXVpcGUgMSA6ICR7Y2hhbmdlfSBNTVJgO1xyXG4gICAgICAgICAgICBub3RpZjEuc3R5bGUuY29sb3IgPSBjaGFuZ2UgPiAwID8gJyM0Y2FmNTAnIDogJyNmNDQzMzYnO1xyXG4gICAgICAgICAgICB3aW5uZXJEaXYuYXBwZW5kQ2hpbGQobm90aWYxKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoYW5nZW1lbnQgTU1SIEVxdWlwZSAyIChpbnZlcnNlKVxyXG4gICAgICAgICAgICBjb25zdCBjaGFuZ2UyID0gLWNoYW5nZTtcclxuICAgICAgICAgICAgY29uc3Qgbm90aWYyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG5vdGlmMi5jbGFzc05hbWUgPSAncmF0aW5nLWNoYW5nZSc7XHJcbiAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZToxLjJyZW07bWFyZ2luLXRvcDo2cHg7Zm9udC13ZWlnaHQ6Ym9sZDtvcGFjaXR5OjA7dHJhbnNpdGlvbjpvcGFjaXR5IDAuNXM7JztcclxuICAgICAgICAgICAgbm90aWYyLnRleHRDb250ZW50ID0gY2hhbmdlMiA+IDAgPyBgRXF1aXBlIDIgOiArJHtjaGFuZ2UyfSBNTVJgIDogYEVxdWlwZSAyIDogJHtjaGFuZ2UyfSBNTVJgO1xyXG4gICAgICAgICAgICBub3RpZjIuc3R5bGUuY29sb3IgPSBjaGFuZ2UyID4gMCA/ICcjNGNhZjUwJyA6ICcjZjQ0MzM2JztcclxuICAgICAgICAgICAgd2lubmVyRGl2LmFwcGVuZENoaWxkKG5vdGlmMik7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgbm90aWYyLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBBVURJTyA9PT1cclxuXHJcbiAgICBwbGF5TmV4dFRyYWNrKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5hdWRpb1VubG9ja2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmNvbWJhdE11c2ljKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tYmF0TXVzaWMucGF1c2UoKTtcclxuICAgICAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBpZHggPSB0aGlzLmdldFJhbmRvbVRyYWNrSW5kZXgoKTtcclxuICAgICAgICB0aGlzLmNvbWJhdE11c2ljID0gbmV3IEF1ZGlvKHRoaXMuY29tYmF0UGxheWxpc3RbaWR4XSk7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYy52b2x1bWUgPSB0aGlzLmlzTXV0ZWQgPyAwIDogdGhpcy52b2x1bWU7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYy5hZGRFdmVudExpc3RlbmVyKCdlbmRlZCcsICgpID0+IHRoaXMucGxheU5leHRUcmFjaygpKTtcclxuICAgICAgICB0aGlzLmNvbWJhdE11c2ljLnBsYXkoKS5jYXRjaCgoKSA9PiB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0UmFuZG9tVHJhY2tJbmRleCgpIHtcclxuICAgICAgICBsZXQgaTtcclxuICAgICAgICBkbyB7XHJcbiAgICAgICAgICAgIGkgPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLmNvbWJhdFBsYXlsaXN0Lmxlbmd0aCk7XHJcbiAgICAgICAgfSB3aGlsZSAoaSA9PT0gdGhpcy5sYXN0VHJhY2tJbmRleCAmJiB0aGlzLmNvbWJhdFBsYXlsaXN0Lmxlbmd0aCA+IDEpO1xyXG4gICAgICAgIHRoaXMubGFzdFRyYWNrSW5kZXggPSBpO1xyXG4gICAgICAgIHJldHVybiBpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZU11dGUoKSB7XHJcbiAgICAgICAgdGhpcy5pc011dGVkID0gIXRoaXMuaXNNdXRlZDtcclxuICAgICAgICBpZiAodGhpcy5jb21iYXRNdXNpYykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbWJhdE11c2ljLnZvbHVtZSA9IHRoaXMuaXNNdXRlZCA/IDAgOiB0aGlzLnZvbHVtZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZW5kTXVzaWMpIHtcclxuICAgICAgICAgICAgdGhpcy5lbmRNdXNpYy52b2x1bWUgPSB0aGlzLmlzTXV0ZWQgPyAwIDogdGhpcy52b2x1bWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm11dGVCdG4pIHtcclxuICAgICAgICAgICAgY29uc3QgaWNvbiA9IHRoaXMubXV0ZUJ0bi5xdWVyeVNlbGVjdG9yKCdpJyk7XHJcbiAgICAgICAgICAgIGlmIChpY29uKSB7XHJcbiAgICAgICAgICAgICAgICBpY29uLmNsYXNzTmFtZSA9IHRoaXMuaXNNdXRlZCA/ICdmYXMgZmEtdm9sdW1lLW11dGUnIDogJ2ZhcyBmYS12b2x1bWUtdXAnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnZvbHVtZVNsaWRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnZvbHVtZVNsaWRlci5kaXNhYmxlZCA9IHRoaXMuaXNNdXRlZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2Z4U2xpZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Z4U2xpZGVyLmRpc2FibGVkID0gdGhpcy5pc011dGVkO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gU0ZYID09PVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUHJlLWxvYWQgYW5kIGNhY2hlIGFuIGF1ZGlvIGZpbGUsIHJldHVybnMgdGhlIGNhY2hlZCBBdWRpbyBjbG9uZSBmb3IgcGxheWJhY2suXHJcbiAgICAgKi9cclxuICAgIGxvYWRTZngocGF0aCkge1xyXG4gICAgICAgIGlmICghdGhpcy5zZnhDYWNoZVtwYXRoXSkge1xyXG4gICAgICAgICAgICB0aGlzLnNmeENhY2hlW3BhdGhdID0gbmV3IEF1ZGlvKHBhdGgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5zZnhDYWNoZVtwYXRoXTtcclxuICAgIH1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFBsYXkgYSBzb3VuZCBlZmZlY3QgZm9yIGEgY2hhcmFjdGVyIGFjdGlvbi5cclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzbHVnIC0gY2hhcmFjdGVyIHNsdWcgKGUuZy4gJ2NydXNhZGVyJywgJ3BsYWd1ZS1kb2N0b3InKVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IHNmeE5hbWUgLSBzb3VuZCBmaWxlIG5hbWUgKGUuZy4gJ2F0dGFja3NvdW5kJywgJ3NraWxsc291bmQnLCAnaGVhbCcpXHJcbiAgICAgKi9cclxuICAgIHBsYXlTZngoc2x1Zywgc2Z4TmFtZSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzTXV0ZWQgfHwgIXNsdWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgcGF0aCA9IGAvYXNzZXQvb3N0L3ZmeC8ke3NsdWd9LyR7c2Z4TmFtZX0ud2F2YDtcclxuICAgICAgICBjb25zdCBjYWNoZWQgPSB0aGlzLmxvYWRTZngocGF0aCk7XHJcblxyXG4gICAgICAgIC8vIENsb25lIHRoZSBhdWRpbyBub2RlIHNvIG92ZXJsYXBwaW5nIHBsYXlzIGRvbid0IGN1dCBlYWNoIG90aGVyIG9mZlxyXG4gICAgICAgIGNvbnN0IHNvdW5kID0gY2FjaGVkLmNsb25lTm9kZSgpO1xyXG4gICAgICAgIHNvdW5kLnZvbHVtZSA9IHRoaXMuc2Z4Vm9sdW1lO1xyXG4gICAgICAgIHNvdW5kLnBsYXkoKS5jYXRjaCgoKSA9PiB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQbGF5IHRoZSBhcHByb3ByaWF0ZSBTRlggZm9yIGEgY2hhcmFjdGVyIGdpdmVuIHRoZWlyIGtleSBhbmQgYWN0aW9uIHR5cGUuXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30ga2V5IC0gY2hhcmFjdGVyIGtleSAoZS5nLiAnRXF1aXBlIDEtQ3J1c2FkZXInKVxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGFjdGlvbiAtICdhdHRhY2snLCAnc2tpbGwnLCBvciAnaGVhbCdcclxuICAgICAqL1xyXG4gICAgcGxheUNoYXJTZngoa2V5LCBhY3Rpb24pIHtcclxuICAgICAgICBjb25zdCBzbHVnID0gdGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldO1xyXG4gICAgICAgIGlmICghc2x1ZykgcmV0dXJuO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGFjdGlvbikge1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5U2Z4KHNsdWcsICdhdHRhY2tzb3VuZCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgLy8gVHJ5IGhlYWwud2F2IGZpcnN0LCBmYWxsYmFjayB0byBza2lsbHNvdW5kLndhdlxyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVySGFzSGVhbFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5U2Z4KHNsdWcsICdoZWFsJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVNmeChzbHVnLCAnc2tpbGxzb3VuZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NraWxsJzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVNmeChzbHVnLCAnc2tpbGxzb3VuZCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVBsYXlCdXR0b24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBsYXlCdG4pIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nICYmICF0aGlzLmlzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9ICdQYXVzZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9ICdUZXJtaW7DqSc7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gdGhpcy5jdXJyZW50SW5kZXggPiAwID8gJ1JlcHJlbmRyZScgOiAnTGFuY2VyJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEluaXRpYWxpc2VyIHF1YW5kIGxlIERPTSBlc3QgcHLDqnRcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IGNvbWJhdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1sb2dzXScpO1xyXG4gICAgaWYgKGNvbWJhdENvbnRhaW5lcikge1xyXG4gICAgICAgIG5ldyBDb21iYXRDb250cm9sbGVyKGNvbWJhdENvbnRhaW5lcik7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tYmF0Q29udHJvbGxlcjtcclxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgRlJJRU5EIFNZU1RFTVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LnRleHRDb250ZW50ID0gc3RyO1xyXG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1wYW5lbF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGJhZGdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1iYWRnZV0nKTtcclxuXHJcbiAgICBpZiAoIXRvZ2dsZSB8fCAhcGFuZWwpIHJldHVybjtcclxuXHJcbiAgICBsZXQgcGFuZWxPcGVuID0gZmFsc2U7XHJcbiAgICBsZXQgY3VycmVudFRhYiA9ICdmcmllbmRzJztcclxuICAgIGxldCBjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkID0gbnVsbDtcclxuICAgIGxldCBsYXN0TWVzc2FnZUlkID0gMDtcclxuICAgIGxldCBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgIGxldCB1bnJlYWRQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgbGV0IGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgIGxldCByZXF1ZXN0c0xvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gUEFORUwgT1BFTi9DTE9TRVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBvcGVuUGFuZWwoKSB7XHJcbiAgICAgICAgcGFuZWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwYW5lbC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBhbmVsLmNsYXNzTGlzdC5hZGQoJ2ZyaWVuZHMtcGFuZWwtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdmcmllbmRzLXBhbmVsX19iYWNrZHJvcC0tb3BlbicpO1xyXG4gICAgICAgIHBhbmVsT3BlbiA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICghZnJpZW5kc0xvYWRlZCkge1xyXG4gICAgICAgICAgICBsb2FkRnJpZW5kcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBhbmVsKCkge1xyXG4gICAgICAgIHBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZyaWVuZHMtcGFuZWwtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdmcmllbmRzLXBhbmVsX19iYWNrZHJvcC0tb3BlbicpO1xyXG4gICAgICAgIHBhbmVsT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBwYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcGFuZWxPcGVuID8gY2xvc2VQYW5lbCgpIDogb3BlblBhbmVsKCkpO1xyXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBhbmVsKTtcclxuICAgIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQYW5lbCk7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBUQUJTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZyaWVuZHMtdGFiXScpLmZvckVhY2godGFiQnRuID0+IHtcclxuICAgICAgICB0YWJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhYk5hbWUgPSB0YWJCdG4uZGF0YXNldC5mcmllbmRzVGFiO1xyXG4gICAgICAgICAgICBzd2l0Y2hUYWIodGFiTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzd2l0Y2hUYWIodGFiTmFtZSkge1xyXG4gICAgICAgIGN1cnJlbnRUYWIgPSB0YWJOYW1lO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mcmllbmRzLXRhYl0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdmcmllbmRzLXBhbmVsX190YWItLWFjdGl2ZScsIGJ0bi5kYXRhc2V0LmZyaWVuZHNUYWIgPT09IHRhYk5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWItY29udGVudF0nKS5mb3JFYWNoKGNvbnRlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBjb250ZW50LmRhdGFzZXQudGFiQ29udGVudCA9PT0gdGFiTmFtZSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX190YWJzJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fY29udGVudCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtY29udmVyc2F0aW9uXScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICh0YWJOYW1lID09PSAnZnJpZW5kcycgJiYgIWZyaWVuZHNMb2FkZWQpIGxvYWRGcmllbmRzKCk7XHJcbiAgICAgICAgaWYgKHRhYk5hbWUgPT09ICdyZXF1ZXN0cycgJiYgIXJlcXVlc3RzTG9hZGVkKSBsb2FkUmVxdWVzdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIExPQUQgRlJJRU5EUyBMSVNUXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGxvYWRGcmllbmRzKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRhYi1jb250ZW50PVwiZnJpZW5kc1wiXScpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+IENoYXJnZW1lbnQuLi48L2Rpdj4nO1xyXG5cclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvbGlzdCcsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5mcmllbmRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+PGkgY2xhc3M9XCJmYXMgZmEtZ2hvc3RcIj48L2k+IEF1Y3VuIGNvbXBhZ25vbi4uLiBMZSBkb25qb24gZXN0IHNvbGl0YWlyZS48L3A+JztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGRhdGEuZnJpZW5kcy5tYXAoZiA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIiBkYXRhLWZyaWVuZC11c2VyLWlkPVwiJHtmLnVzZXJJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2YucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChmLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKGYudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChmLnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3ByZXZpZXdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7Zi5sYXN0TWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKGYubGFzdE1lc3NhZ2UuaXNGcm9tTWUgPyAnVm91czogJyA6ICcnKSArIGVzY2FwZUh0bWwoZi5sYXN0TWVzc2FnZS5jb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ0F1Y3VuIG1lc3NhZ2UnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcmF0aW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke2YucmF0aW5nfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuZnJpZW5kLWl0ZW0nKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VySWQgPSBwYXJzZUludChpdGVtLmRhdGFzZXQuZnJpZW5kVXNlcklkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kLWl0ZW1fX25hbWUnKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuQ29udmVyc2F0aW9uKHVzZXJJZCwgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5FcnJldXIgZGUgY2hhcmdlbWVudDwvcD4nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTE9BRCBQRU5ESU5HIFJFUVVFU1RTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGxvYWRSZXF1ZXN0cygpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YWItY29udGVudD1cInJlcXVlc3RzXCJdJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gQ2hhcmdlbWVudC4uLjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy9wZW5kaW5nJywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgcmVxdWVzdHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXF1ZXN0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkF1Y3VuZSBkZW1hbmRlIGVuIGF0dGVudGU8L3A+JztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGRhdGEucmVxdWVzdHMubWFwKHIgPT4gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCIgZGF0YS1yZXF1ZXN0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke3IucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChyLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKHIudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChyLnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3ByZXZpZXdcIj4ke2VzY2FwZUh0bWwoci5kYXRlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLWFjY2VwdFwiIGRhdGEtYWNjZXB0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcmVqZWN0XCIgZGF0YS1yZWplY3QtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXNcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjY2VwdC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVxdWVzdChidG4uZGF0YXNldC5hY2NlcHRJZCwgJ2FjY2VwdCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJlamVjdC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVxdWVzdChidG4uZGF0YXNldC5yZWplY3RJZCwgJ3JlamVjdCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RXJyZXVyIGRlIGNoYXJnZW1lbnQ8L3A+JztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0KGZyaWVuZHNoaXBJZCwgYWN0aW9uKSB7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzLyR7YWN0aW9ufS8ke2ZyaWVuZHNoaXBJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxvYWRSZXF1ZXN0cygpO1xyXG4gICAgICAgICAgICAgICAgZmV0Y2hVbnJlYWRDb3VudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBTRUFSQ0ggVVNFUlNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXNlYXJjaC1pbnB1dF0nKTtcclxuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXNlYXJjaC1yZXN1bHRzXScpO1xyXG4gICAgbGV0IHNlYXJjaFRpbWVvdXQgPSBudWxsO1xyXG5cclxuICAgIGlmIChzZWFyY2hJbnB1dCkge1xyXG4gICAgICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc2VhcmNoVGltZW91dCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gc2VhcmNoSW5wdXQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZldGNoKGAvZnJpZW5kcy9zZWFyY2g/cT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeSl9YCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnVzZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+QXVjdW4gZ3VlcnJpZXIgdHJvdXZlPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gZGF0YS51c2Vycy5tYXAodSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpb25IdG1sID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ2FjY2VwdGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPkFtaTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAncGVuZGluZ19zZW50Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPkVudm95ZWU8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ3BlbmRpbmdfcmVjZWl2ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+UmVjdWU8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSBgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tYWRkXCIgZGF0YS1hZGQtZnJpZW5kLWlkPVwiJHt1LnVzZXJJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wbHVzXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dS5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKHUucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwodS51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKHUudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcmF0aW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke3UucmF0aW5nfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2FjdGlvbnNcIj4ke2FjdGlvbkh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hZGQtZnJpZW5kLWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kRnJpZW5kUmVxdWVzdChidG4uZGF0YXNldC5hZGRGcmllbmRJZCwgYnRuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kRnJpZW5kUmVxdWVzdCh1c2VySWQsIGJ0bikge1xyXG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL3JlcXVlc3QvJHt1c2VySWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5vdXRlckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5FbnZveWVlPC9zcGFuPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgYnRuLmRpc2FibGVkID0gZmFsc2U7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlcG9ydE1lc3NhZ2VBY3Rpb24obWVzc2FnZUlkLCBidG4pIHtcclxuICAgICAgICBjb25zdCByZWFzb24gPSBwcm9tcHQoJ1JhaXNvbiBkdSBzaWduYWxlbWVudCA6Jyk7XHJcbiAgICAgICAgaWYgKHJlYXNvbiA9PT0gbnVsbCkgcmV0dXJuOyAvLyBjYW5jZWxsZWRcclxuXHJcbiAgICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHttZXNzYWdlSWR9L3JlcG9ydGAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWFzb246IHJlYXNvbiB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2tcIj48L2k+JztcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdjaGF0LW1lc3NhZ2VfX3JlcG9ydC0tZG9uZScpO1xyXG4gICAgICAgICAgICAgICAgYnRuLnRpdGxlID0gJ1NpZ25hbGUnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IGJ0bi5kaXNhYmxlZCA9IGZhbHNlOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIENPTlZFUlNBVElPTlxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBvcGVuQ29udmVyc2F0aW9uKHVzZXJJZCwgdXNlcm5hbWUpIHtcclxuICAgICAgICBjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkID0gdXNlcklkO1xyXG4gICAgICAgIGxhc3RNZXNzYWdlSWQgPSAwO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fdGFicycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX2NvbnRlbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGNvbnN0IGNvbnZFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtY29udmVyc2F0aW9uXScpO1xyXG4gICAgICAgIGNvbnZFbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tbmFtZV0nKS50ZXh0Q29udGVudCA9IHVzZXJuYW1lO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tbWVzc2FnZXNdJyk7XHJcbiAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+IENoYXJnZW1lbnQuLi48L2Rpdj4nO1xyXG5cclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHt1c2VySWR9YCwge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgcmVuZGVyTWVzc2FnZXMoZGF0YS5tZXNzYWdlcywgZmFsc2UpO1xyXG4gICAgICAgICAgICBzdGFydE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyTWVzc2FnZXMobWVzc2FnZXMsIGFwcGVuZCkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tbWVzc2FnZXNdJyk7XHJcblxyXG4gICAgICAgIGlmICghYXBwZW5kKSB7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzRWwuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5EZWJ1dCBkZSBsYSBjb252ZXJzYXRpb24uIEVudm95ZXogbGUgcHJlbWllciBtZXNzYWdlITwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2kgb24gYWpvdXRlIGRlcyBtZXNzYWdlcyBldCBxdWUgbGUgY29udGVuZXVyIGFmZmljaGUgbGUgcGxhY2Vob2xkZXIsIGxlIHN1cHByaW1lclxyXG4gICAgICAgIGlmIChhcHBlbmQgJiYgbWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IG1lc3NhZ2VzRWwucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlcikgcGxhY2Vob2xkZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG1zZyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuaWQgPiBsYXN0TWVzc2FnZUlkKSBsYXN0TWVzc2FnZUlkID0gbXNnLmlkO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjaGF0LW1lc3NhZ2UnLCBtc2cuaXNGcm9tTWUgPyAnY2hhdC1tZXNzYWdlLS1taW5lJyA6ICdjaGF0LW1lc3NhZ2UtLXRoZWlycycpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcG9ydEJ0biA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoIW1zZy5pc0Zyb21NZSkge1xyXG4gICAgICAgICAgICAgICAgcmVwb3J0QnRuID0gYDxidXR0b24gY2xhc3M9XCJjaGF0LW1lc3NhZ2VfX3JlcG9ydFwiIGRhdGEtcmVwb3J0LW1zZy1pZD1cIiR7bXNnLmlkfVwiIHRpdGxlPVwiU2lnbmFsZXIgY2UgbWVzc2FnZVwiPjxpIGNsYXNzPVwiZmFzIGZhLWZsYWdcIj48L2k+PC9idXR0b24+YDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgICR7ZXNjYXBlSHRtbChtc2cuY29udGVudCl9XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoYXQtbWVzc2FnZV9fdGltZVwiPiR7ZXNjYXBlSHRtbChtc2cuZGF0ZSl9ICR7cmVwb3J0QnRufTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgIC8vIEF0dGFjaCByZXBvcnQgaGFuZGxlclxyXG4gICAgICAgICAgICBjb25zdCByZXBvcnRFbCA9IGRpdi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXBvcnQtbXNnLWlkXScpO1xyXG4gICAgICAgICAgICBpZiAocmVwb3J0RWwpIHtcclxuICAgICAgICAgICAgICAgIHJlcG9ydEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydE1lc3NhZ2VBY3Rpb24ocmVwb3J0RWwuZGF0YXNldC5yZXBvcnRNc2dJZCwgcmVwb3J0RWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzRWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbWVzc2FnZXNFbC5zY3JvbGxUb3AgPSBtZXNzYWdlc0VsLnNjcm9sbEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZW5kIG1lc3NhZ2VcclxuICAgIGNvbnN0IHNlbmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tc2VuZF0nKTtcclxuICAgIGNvbnN0IGlucHV0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24taW5wdXRdJyk7XHJcblxyXG4gICAgaWYgKHNlbmRCdG4gJiYgaW5wdXRFbCkge1xyXG4gICAgICAgIHNlbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZW5kTWVzc2FnZSk7XHJcbiAgICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBzZW5kTWVzc2FnZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBpbnB1dEVsLnZhbHVlLnRyaW0oKTtcclxuICAgICAgICBpZiAoIWNvbnRlbnQgfHwgIWN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaW5wdXRFbC52YWx1ZSA9ICcnO1xyXG5cclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHtjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjb250ZW50OiBjb250ZW50IH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyAmJiBkYXRhLm1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKFtkYXRhLm1lc3NhZ2VdLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJhY2sgYnV0dG9uXHJcbiAgICBjb25zdCBiYWNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLWJhY2tdJyk7XHJcbiAgICBpZiAoYmFja0J0bikge1xyXG4gICAgICAgIGJhY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSBudWxsO1xyXG4gICAgICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzd2l0Y2hUYWIoJ2ZyaWVuZHMnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIE1FU1NBR0UgUE9MTElORyAoZXZlcnkgNXMgd2hlbiBjb252ZXJzYXRpb24gb3BlbilcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gc3RhcnRNZXNzYWdlUG9sbGluZygpIHtcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke2N1cnJlbnRDb252ZXJzYXRpb25Vc2VySWR9P2FmdGVySWQ9JHtsYXN0TWVzc2FnZUlkfWAsIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubWVzc2FnZXMgJiYgZGF0YS5tZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTWVzc2FnZXMoZGF0YS5tZXNzYWdlcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDUwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3BNZXNzYWdlUG9sbGluZygpIHtcclxuICAgICAgICBpZiAobWVzc2FnZVBvbGxpbmdJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBVTlJFQUQgQ09VTlQgUE9MTElORyAoZXZlcnkgMzBzLCBhbHdheXMgYWN0aXZlKVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBmZXRjaFVucmVhZENvdW50KCkge1xyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy91bnJlYWQtY291bnQnLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS50b3RhbCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnRleHRDb250ZW50ID0gZGF0YS50b3RhbDtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RzQmFkZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXF1ZXN0cy1iYWRnZV0nKTtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3RzQmFkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnBlbmRpbmdSZXF1ZXN0cyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnRleHRDb250ZW50ID0gZGF0YS5wZW5kaW5nUmVxdWVzdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHt9KTtcclxuICAgIH1cclxuXHJcbiAgICBmZXRjaFVucmVhZENvdW50KCk7XHJcbiAgICB1bnJlYWRQb2xsaW5nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmZXRjaFVucmVhZENvdW50LCAzMDAwMCk7XHJcbn0pO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiZXNjYXBlSHRtbCIsInN0ciIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY3JlYXRlVGV4dE5vZGUiLCJpbm5lckhUTUwiLCJhZGRFdmVudExpc3RlbmVyIiwiYnVyZ2VyIiwicXVlcnlTZWxlY3RvciIsIm5hdiIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIlNUQVRfTUFYIiwiZG1nIiwic3BlZWQiLCJkb2RnZSIsImNyaXQiLCJocCIsInBvcnRyYWl0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkZXRhaWxzIiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3RlZExpc3QiLCJsYXVuY2hCdG4iLCJsZW5ndGgiLCJtYXhTZWxlY3Rpb24iLCJzZWxlY3RlZEhlcm9lcyIsInNlbGVjdGVkSGVyb0lkcyIsImdldENhdGVnb3J5IiwicG9ydHJhaXQiLCJkYXRhc2V0IiwiY2F0ZWdvcnkiLCJnZXRTZWxlY3RlZFJvbGVzIiwicm9sZXMiLCJUYW5rIiwiRFBTIiwiSGVhbGVyIiwiU3VwcG9ydCIsImZvckVhY2giLCJpZCIsInAiLCJBcnJheSIsImZyb20iLCJmaW5kIiwicHAiLCJjYXQiLCJjYW5TZWxlY3RSb2xlIiwicG9ydHJhaXRFbCIsImlzTGVnZW5kU2VsZWN0ZWQiLCJyZW1vdmUiLCJhZGQiLCJuYW1lIiwicm9sZSIsImRtZ01pbiIsIk51bWJlciIsImRtZ01heCIsInNwcml0ZUZpbGUiLCJzcHJpdGUiLCJhYmlsaXR5TmFtZSIsImFiaWxpdHlEZXNjIiwiYWJpbGl0eUNkIiwic3ByaXRlUGF0aCIsImNvbmNhdCIsImlzU2VsZWN0ZWQiLCJpbmNsdWRlcyIsImFiaWxpdHlIdG1sIiwiY2hhclN5bmVyZ2llcyIsInN5bmVyZ3lNYXAiLCJzeW5lcmd5SHRtbCIsIm1hcCIsInMiLCJwYXJ0bmVyIiwiZGVzYyIsImpvaW4iLCJNYXRoIiwibWluIiwiYnRuUmlnaHQiLCJyb2xlQ2F0IiwiYWxyZWFkeVNlbGVjdGVkIiwiZGlzYWJsZWQiLCJ0ZXh0Q29udGVudCIsInVwZGF0ZVNlbGVjdGVkVGVhbSIsImFsZXJ0IiwiZmlsdGVyIiwiaGlkIiwiaCIsInB1c2giLCJ0ZWFtc1BhZ2VFbCIsIkpTT04iLCJwYXJzZSIsImxlZ2VuZEFjdGl2ZSIsImhlcm8iLCJpIiwiaGVyb0VsIiwidXBkYXRlUm9sZUluZGljYXRvcnMiLCJ1cGRhdGVTeW5lcmd5SGlnaGxpZ2h0cyIsInRlYW1Db21wbGV0ZSIsImJhZGdlIiwic2VsZWN0ZWROYW1lcyIsIkJvb2xlYW4iLCJhY3RpdmVTeW5lcmdpZXMiLCJzZWVuUGFpcnMiLCJTZXQiLCJzeW5lcmdpZXMiLCJzeW4iLCJwYWlyS2V5Iiwic29ydCIsImhhcyIsIm5hbWUxIiwibmFtZTIiLCJzeW5lcmd5TmFtZSIsInBOYW1lIiwibWF0Y2hpbmciLCJjbGFzc05hbWUiLCJ0aXRsZSIsInVwZGF0ZVN5bmVyZ3lEaXNwbGF5IiwiY29udGFpbmVyIiwiYWN0aW9ucyIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJpbmRpY2F0b3IiLCJzbG90Iiwic2F2ZVByZXNldEJ0biIsInByZXNldE1vZGFsIiwicHJlc2V0TmFtZUlucHV0IiwicHJlc2V0Q29uZmlybUJ0biIsInByZXNldENhbmNlbEJ0biIsInVwZGF0ZVNhdmVQcmVzZXRCdG4iLCJvcmlnaW5hbFVwZGF0ZVNlbGVjdGVkVGVhbSIsIl9vcmlnVXBkYXRlIiwiX29yaWdSb2xlSW5kaWNhdG9ycyIsInZhbHVlIiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsImZvY3VzIiwidHJpbSIsImJvcmRlckNvbG9yIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsInN0cmluZ2lmeSIsImNoYXJhY3RlcklkcyIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsInN1Y2Nlc3MiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImVycm9yIiwiZSIsImtleSIsImNsaWNrIiwibG9hZFByZXNldCIsImlkU3RyIiwiU3RyaW5nIiwiZGVsZXRlUHJlc2V0IiwicHJlc2V0SWQiLCJjaGlwRWwiLCJjb25maXJtIiwibGlzdCIsImNoaWxkcmVuIiwiX2RvY3VtZW50JHF1ZXJ5U2VsZWN0IiwiY2hpcCIsImNoYXJJZHMiLCJwcmVzZXRJZHMiLCJzdG9wUHJvcGFnYXRpb24iLCJzZWxlY3RlZExpc3RPYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiY2hpbGRMaXN0IiwiZW5jb2RlVVJJQ29tcG9uZW50IiwicmVzcG9uc2UiLCJyZWRpcmVjdGVkIiwiaHJlZiIsInVybCIsInBvcHVwIiwiYmFja2Ryb3AiLCJjbG9zZUJ0biIsImNvbnRlbnQiLCJsb2FkZWQiLCJvcGVuUG9wdXAiLCJvZmZzZXRIZWlnaHQiLCJmZXRjaFByb2ZpbGUiLCJjbG9zZVBvcHVwIiwicmVuZGVyUHJvZmlsZSIsInJlc3VsdENsYXNzIiwiciIsInJlc3VsdExhYmVsIiwiYXZhdGFySHRtbCIsInByb2ZpbGVJbWFnZSIsInVzZXJuYW1lIiwiaHRtbCIsIm1vdHRvIiwiYmlvIiwicmF0aW5nIiwic3RhdHMiLCJ3aW5zIiwibG9zc2VzIiwid2luUmF0ZSIsImZhdm9yaXRlQ2hhcmFjdGVyIiwiZ2FtZXNQbGF5ZWQiLCJsYXN0VGVhbSIsImMiLCJyZWNlbnRCYXR0bGVzIiwiYiIsInBhcnNlSW50IiwicmVzdWx0Iiwib3Bwb25lbnQiLCJtYXRjaFR5cGUiLCJ0b1VwcGVyQ2FzZSIsImRhdGUiLCJDb21iYXRDb250cm9sbGVyIiwiX2NsYXNzQ2FsbENoZWNrIiwibG9ncyIsImN1cnJlbnRJbmRleCIsImlzUGxheWluZyIsImlzUGF1c2VkIiwiY2hhcmFjdGVyRWxlbWVudHMiLCJjaGFyYWN0ZXJNYXhIUCIsImluaXQiLCJfY3JlYXRlQ2xhc3MiLCJfdGhpcyIsImxvZ3NEYXRhIiwiY29tYmF0TG9ncyIsImNvbnNvbGUiLCJsb2dDb250YWluZXIiLCJvdmVybGF5IiwicGxheUJ0biIsInNraXBCdG4iLCJzcGVlZEJ0bnMiLCJjaGFyYWN0ZXJTbHVncyIsImNoYXJhY3Rlckhhc0hlYWwiLCJhYmlsaXR5Q29vbGRvd25zIiwiY2hhcmFjdGVyU3RhdHVzZXMiLCJlbCIsImNoYXJhY3Rlck5hbWUiLCJ0ZWFtIiwiY2hhcmFjdGVyVGVhbSIsImNoYXJhY3RlclNsdWciLCJoYXNIZWFsIiwiaHBUZXh0IiwibWF0Y2giLCJjcmVhdGVFbXB0eVN0YXR1c2VzIiwiYWJpbGl0eUVsZW1lbnRzIiwiY2hhck5hbWUiLCJjaGFyVGVhbSIsImFiaWxpdHlFbCIsIm1heENkIiwiYWJpbGl0eU1heENkIiwibmFtZUVsIiwiaWNvbkVsIiwib3BhY2l0eSIsImF1ZGlvVW5sb2NrZWQiLCJjb21iYXRNdXNpYyIsImxhc3RUcmFja0luZGV4IiwiaXNNdXRlZCIsInZvbHVtZSIsInNmeFZvbHVtZSIsImNvbWJhdFBsYXlsaXN0IiwiaGFzR29rdSIsInNvbWUiLCJlbmRNdXNpYyIsInNmeENhY2hlIiwibXV0ZUJ0biIsInZvbHVtZVNsaWRlciIsInNmeFNsaWRlciIsImJpbmRFdmVudHMiLCJwbGF5IiwiYmxlZWRpbmciLCJibGlnaHRlZCIsInN0dW5uZWQiLCJtYXJrZWQiLCJzdGVhbHRoZWQiLCJyaXBvc3RlIiwiZG1nVXAiLCJzcGRVcCIsImRvZGdlVXAiLCJjcml0VXAiLCJ1cGRhdGVDaGFyYWN0ZXJTdGF0dXNlcyIsImxvZyIsInR5cGUiLCJ0aWNrUm91bmRTdGF0dXNlcyIsImhhbmRsZUFiaWxpdHlTdGF0dXNDaGFuZ2UiLCJzZXRTdGF0dXMiLCJ0YXJnZXQiLCJ0YXJnZXRUZWFtIiwiZHVyYXRpb24iLCJ0dXJuc1JlbWFpbmluZyIsInVuZGVmaW5lZCIsImF0dGFja2VyIiwiYXR0YWNrZXJUZWFtIiwiaGFuZGxlU3luZXJneVN0YXR1c0NoYW5nZSIsImNsZWFyQWxsU3RhdHVzZXMiLCJyZW5kZXJBbGxTdGF0dXNJY29ucyIsInN1YnR5cGUiLCJibGVlZFR1cm5zIiwiYWxsSGl0cyIsInByaW1hcnkiLCJpc1ByaW1hcnkiLCJibGlnaHRUdXJucyIsIm1hcmtUdXJucyIsImNhc3RlciIsImNhc3RlclRlYW0iLCJyaXBvc3RlVHVybnMiLCJhcHBseUJ1ZmZTdGF0dXNlcyIsImJ1ZmZzIiwiYnVmZkR1cmF0aW9uIiwiYXBwbHlUZWFtQnVmZlN0YXR1c2VzIiwic3RlYWx0aFR1cm5zIiwicHJvdGVjdFR1cm5zIiwic2VsZkJsZWVkVHVybnMiLCJ0S2V5IiwiX3RoaXMyIiwiZWZmZWN0VHlwZSIsInBhcnRuZXJDaGFyIiwicGFydG5lckNoYXJUZWFtIiwiZ3JhbnRlZFR1cm5zIiwiYnVmZlR5cGVzIiwic3RhdHVzS2V5IiwiYnVmZlR5cGVUb1N0YXR1c0tleSIsImRvZGdlRHVyYXRpb24iLCJleHRyYVR1cm5zIiwidGVhbU5hbWUiLCJkYW1hZ2UiLCJtYXgiLCJfaSIsIl9PYmplY3Qka2V5cyIsIk9iamVjdCIsImtleXMiLCJzdGFydHNXaXRoIiwiX2kyIiwiX09iamVjdCRrZXlzMiIsIl9pMyIsIl9PYmplY3Qka2V5czMiLCJyZW5kZXJTdGF0dXNJY29ucyIsImljb25zIiwiaWNvbiIsImNscyIsIl90aGlzMyIsInRvZ2dsZVBsYXkiLCJza2lwIiwiYnRuIiwic2V0U3BlZWQiLCJ0b2dnbGVNdXRlIiwicGFyc2VGbG9hdCIsInBsYXlOZXh0VHJhY2siLCJvbmNlIiwidXBkYXRlUGxheUJ1dHRvbiIsInByb2Nlc3NOZXh0TG9nIiwicGF1c2UiLCJkaXNwbGF5TG9nIiwidXBkYXRlSGVhbHRoQmFycyIsInRyYWNrQWJpbGl0eUNvb2xkb3ducyIsImFuaW1hdGVEZWF0aCIsInRhcmdldEhQIiwic2hvd1ZpY3RvcnlPdmVybGF5IiwiZXZlbnQiLCJjdXJyZW50VGFyZ2V0IiwiY29tYmF0U3BlZWQiLCJfdGhpczQiLCJwcm9jZXNzTG9nIiwiZGVsYXkiLCJnZXREZWxheUZvckxvZyIsImdldEFiaWxpdHlEZWxheSIsImdldFN5bmVyZ3lUcmlnZ2VyRGVsYXkiLCJfdGhpczUiLCJwbGF5QW5pbWF0aW9uIiwiaHBEZWxheSIsImdldEhQVXBkYXRlRGVsYXkiLCJhYmlsaXR5RGF0YSIsInVwZGF0ZUFiaWxpdHlDb29sZG93bkRpc3BsYXkiLCJjZCIsImdldEFiaWxpdHlIUERlbGF5IiwiYW5pbWF0ZUF0dGFjayIsImlzQ3JpdCIsImFuaW1hdGVIZWFsIiwiaGVhbGVyIiwiaGVhbGVyVGVhbSIsImFuaW1hdGVEZWZlbmQiLCJkZWZlbmRlciIsImRlZmVuZGVyVGVhbSIsImFuaW1hdGVEb2RnZSIsImFuaW1hdGVEb1QiLCJhbmltYXRlU3R1bm5lZCIsInBsYXlBYmlsaXR5QW5pbWF0aW9uIiwiYW5pbWF0ZVN5bmVyZ3lBbm5vdW5jZSIsImFuaW1hdGVTeW5lcmd5VHJpZ2dlciIsInRhcmdldE5hbWUiLCJkb3RDbGFzcyIsImdldENoYXJhY3RlckVsZW1lbnQiLCJhbmltYXRlTWFya2VkIiwiYW5pbWF0ZUJ1ZmYiLCJhbmltYXRlU3RlYWx0aCIsIl90aGlzNiIsImJsaWdodEtleSIsInN3YXBTcHJpdGUiLCJwbGF5Q2hhclNmeCIsImNhc3RlckVsIiwibWFya0tleSIsInJpcG9zdGVLZXkiLCJzZWxmQnVmZktleSIsInBhcnR5SGVhbEtleSIsImhlYWxlZCIsInBhcnR5QnVmZktleSIsImFuaW1hdGVUZWFtQnVmZiIsInN0ZWFsdGhLZXkiLCJlbWVyZ0hlYWxLZXkiLCJwcm90RG9kZ2VLZXkiLCJ1aUtleSIsInVpQ2FzdGVyRWwiLCJ1aVRhcmdldEVsIiwiX3RoaXM3IiwidHJpZ2dlciIsInRyaWdnZXJDaGFyIiwiZHJhd1N5bmVyZ3lMaW5rIiwiX3RoaXM4IiwidHJpZ2dlckNoYXJUZWFtIiwicGFydG5lcktleSIsImVsMSIsImVsMiIsInN0YWdlIiwiZXhpc3RpbmdTdmciLCJzdmciLCJjcmVhdGVFbGVtZW50TlMiLCJzZXRBdHRyaWJ1dGUiLCJzdGFnZVJlY3QiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJyZWN0MSIsInJlY3QyIiwieDEiLCJsZWZ0Iiwid2lkdGgiLCJ5MSIsInRvcCIsImhlaWdodCIsIngyIiwieTIiLCJsaW5lIiwic3ByaXRlTmFtZSIsIl90aGlzOSIsInNsdWciLCJpbWciLCJzcmMiLCJjb250YWlucyIsImF0dGFja2VyTmFtZSIsImhlYWxlck5hbWUiLCJkZWZlbmRlck5hbWUiLCJjb3Jwc2VJbWciLCJJbWFnZSIsIm9ubG9hZCIsIm9uZXJyb3IiLCJlbnRyeSIsIm1lc3NhZ2UiLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJjdXJyZW50SFAiLCJtYXhIUCIsInRhcmdldE1heEhQIiwidXBkYXRlQWJpbGl0eUhlYWx0aEJhcnMiLCJ1cGRhdGVDaGFyYWN0ZXJIUCIsIl90aGlzMCIsIm1heEhwIiwicGVyY2VudCIsImhwQmFyIiwidHJhbnNpdGlvbiIsInVwZGF0ZUluZm9QYW5lbCIsInBhbmVsQ2xhc3MiLCJwYW5lbCIsImNoYXJhY3RlckluZm9zIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsIl9sb29wIiwiaW5mbyIsInN0YXRzU3BhbiIsIm4iLCJkb25lIiwiZXJyIiwiZiIsIl90aGlzMSIsInBsYXlFbmRNdXNpYyIsImZpbmFsaXplUmF0aW5nIiwidHJhY2siLCJBdWRpbyIsIl90aGlzMTAiLCJmaW5hbGl6ZVVybCIsInJhdGluZ0NoYW5nZSIsInNob3dSYXRpbmdVcGRhdGUiLCJuZXdSYXRpbmciLCJuZXdSYXRpbmcyIiwiY2hhbmdlIiwicmF0aW5nRWwiLCJyYXRpbmdFbDIiLCJ3aW5uZXJEaXYiLCJub3RpZjEiLCJjc3NUZXh0IiwiY29sb3IiLCJjaGFuZ2UyIiwibm90aWYyIiwiX3RoaXMxMSIsImlkeCIsImdldFJhbmRvbVRyYWNrSW5kZXgiLCJmbG9vciIsInJhbmRvbSIsImxvYWRTZngiLCJwYXRoIiwicGxheVNmeCIsInNmeE5hbWUiLCJjYWNoZWQiLCJzb3VuZCIsImNsb25lTm9kZSIsImFjdGlvbiIsImNvbWJhdENvbnRhaW5lciIsInBhbmVsT3BlbiIsImN1cnJlbnRUYWIiLCJjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkIiwibGFzdE1lc3NhZ2VJZCIsIm1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwiLCJ1bnJlYWRQb2xsaW5nSW50ZXJ2YWwiLCJmcmllbmRzTG9hZGVkIiwicmVxdWVzdHNMb2FkZWQiLCJvcGVuUGFuZWwiLCJsb2FkRnJpZW5kcyIsImNsb3NlUGFuZWwiLCJzdG9wTWVzc2FnZVBvbGxpbmciLCJ0YWJCdG4iLCJ0YWJOYW1lIiwiZnJpZW5kc1RhYiIsInN3aXRjaFRhYiIsInRhYkNvbnRlbnQiLCJsb2FkUmVxdWVzdHMiLCJmcmllbmRzIiwidXNlcklkIiwibGFzdE1lc3NhZ2UiLCJpc0Zyb21NZSIsIml0ZW0iLCJmcmllbmRVc2VySWQiLCJvcGVuQ29udmVyc2F0aW9uIiwicmVxdWVzdHMiLCJmcmllbmRzaGlwSWQiLCJoYW5kbGVSZXF1ZXN0IiwiYWNjZXB0SWQiLCJyZWplY3RJZCIsImZldGNoVW5yZWFkQ291bnQiLCJzZWFyY2hJbnB1dCIsInNlYXJjaFJlc3VsdHMiLCJzZWFyY2hUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwicXVlcnkiLCJ1c2VycyIsInUiLCJhY3Rpb25IdG1sIiwiZnJpZW5kU3RhdHVzIiwic2VuZEZyaWVuZFJlcXVlc3QiLCJhZGRGcmllbmRJZCIsIm91dGVySFRNTCIsInJlcG9ydE1lc3NhZ2VBY3Rpb24iLCJtZXNzYWdlSWQiLCJyZWFzb24iLCJwcm9tcHQiLCJjb252RWwiLCJtZXNzYWdlc0VsIiwicmVuZGVyTWVzc2FnZXMiLCJtZXNzYWdlcyIsInN0YXJ0TWVzc2FnZVBvbGxpbmciLCJhcHBlbmQiLCJwbGFjZWhvbGRlciIsIm1zZyIsInJlcG9ydEJ0biIsInJlcG9ydEVsIiwicmVwb3J0TXNnSWQiLCJzZW5kQnRuIiwiaW5wdXRFbCIsInNlbmRNZXNzYWdlIiwiYmFja0J0biIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInRvdGFsIiwicmVxdWVzdHNCYWRnZSIsInBlbmRpbmdSZXF1ZXN0cyJdLCJzb3VyY2VSb290IjoiIn0=