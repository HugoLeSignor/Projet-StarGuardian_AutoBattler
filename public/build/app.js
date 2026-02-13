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

      // Désactiver le bouton si le slot de ce rôle est déjà pris
      if (roleCat !== 'Legend' && !alreadySelected && !canSelectRole(portrait)) {
        btnRight.disabled = true;
        btnRight.textContent = "Slot ".concat(roleCat, " d\xE9j\xE0 pris");
      }

      // Disable if a Legend is selected and this isn't that Legend
      if (isLegendSelected() && !alreadySelected) {
        btnRight.disabled = true;
        btnRight.textContent = 'Ultra Instinct actif';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTtBQUMyQjtBQUN3QjtBQUMzQjtBQUNDOztBQUV6QjtBQUNBO0FBQ0E7QUFDQSxTQUFTQSxVQUFVQSxDQUFDQyxHQUFHLEVBQUU7RUFDckIsSUFBSSxDQUFDQSxHQUFHLEVBQUUsT0FBTyxFQUFFO0VBQ25CLElBQU1DLEdBQUcsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO0VBQ3pDRixHQUFHLENBQUNHLFdBQVcsQ0FBQ0YsUUFBUSxDQUFDRyxjQUFjLENBQUNMLEdBQUcsQ0FBQyxDQUFDO0VBQzdDLE9BQU9DLEdBQUcsQ0FBQ0ssU0FBUztBQUN4Qjs7QUFFQTtBQUNBO0FBQ0E7QUFDQUosUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0VBQ2hELElBQU1DLE1BQU0sR0FBR04sUUFBUSxDQUFDTyxhQUFhLENBQUMsU0FBUyxDQUFDO0VBQ2hELElBQU1DLEdBQUcsR0FBR1IsUUFBUSxDQUFDTyxhQUFhLENBQUMsa0JBQWtCLENBQUM7RUFFdEQsSUFBSUQsTUFBTSxJQUFJRSxHQUFHLEVBQUU7SUFDZkYsTUFBTSxDQUFDRCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUNuQ0csR0FBRyxDQUFDQyxTQUFTLENBQUNDLE1BQU0sQ0FBQyxRQUFRLENBQUM7SUFDbEMsQ0FBQyxDQUFDO0VBQ047QUFDSixDQUFDLENBQUM7O0FBR0Y7QUFDQTtBQUNBOztBQUVBO0FBQ0EsSUFBTUMsUUFBUSxHQUFHO0VBQ2JDLEdBQUcsRUFBRSxFQUFFO0VBQ1BDLEtBQUssRUFBRSxFQUFFO0VBQ1RDLEtBQUssRUFBRSxFQUFFO0VBQ1RDLElBQUksRUFBRSxFQUFFO0VBQ1JDLEVBQUUsRUFBRTtBQUNSLENBQUM7QUFFRGhCLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtFQUNoRCxJQUFNWSxTQUFTLEdBQUdqQixRQUFRLENBQUNrQixnQkFBZ0IsQ0FBQyxnQkFBZ0IsQ0FBQztFQUM3RCxJQUFNQyxPQUFPLEdBQUduQixRQUFRLENBQUNvQixjQUFjLENBQUMsYUFBYSxDQUFDO0VBQ3RELElBQU1DLFlBQVksR0FBR3JCLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLGdCQUFnQixDQUFDO0VBQzdELElBQU1lLFNBQVMsR0FBR3RCLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLGFBQWEsQ0FBQztFQUV2RCxJQUFJLENBQUNZLE9BQU8sSUFBSUYsU0FBUyxDQUFDTSxNQUFNLEtBQUssQ0FBQyxFQUFFO0VBRXhDLElBQU1DLFlBQVksR0FBRyxDQUFDO0VBQ3RCLElBQUlDLGNBQWMsR0FBRyxFQUFFO0VBQ3ZCLElBQUlDLGVBQWUsR0FBRyxFQUFFOztFQUV4QjtFQUNBO0VBQ0EsU0FBU0MsV0FBV0EsQ0FBQ0MsUUFBUSxFQUFFO0lBQzNCLE9BQU9BLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDQyxRQUFRLElBQUksU0FBUztFQUNqRDtFQUVBLFNBQVNDLGdCQUFnQkEsQ0FBQSxFQUFHO0lBQ3hCLElBQU1DLEtBQUssR0FBRztNQUFFQyxJQUFJLEVBQUUsQ0FBQztNQUFFQyxHQUFHLEVBQUUsQ0FBQztNQUFFQyxNQUFNLEVBQUUsQ0FBQztNQUFFQyxPQUFPLEVBQUU7SUFBRSxDQUFDO0lBQ3hEVixlQUFlLENBQUNXLE9BQU8sQ0FBQyxVQUFBQyxFQUFFLEVBQUk7TUFDMUIsSUFBTUMsQ0FBQyxHQUFHQyxLQUFLLENBQUNDLElBQUksQ0FBQ3hCLFNBQVMsQ0FBQyxDQUFDeUIsSUFBSSxDQUFDLFVBQUFDLEVBQUU7UUFBQSxPQUFJQSxFQUFFLENBQUNkLE9BQU8sQ0FBQ1MsRUFBRSxLQUFLQSxFQUFFO01BQUEsRUFBQztNQUNoRSxJQUFJQyxDQUFDLEVBQUU7UUFDSCxJQUFNSyxHQUFHLEdBQUdqQixXQUFXLENBQUNZLENBQUMsQ0FBQztRQUMxQlAsS0FBSyxDQUFDWSxHQUFHLENBQUMsRUFBRTtNQUNoQjtJQUNKLENBQUMsQ0FBQztJQUNGLE9BQU9aLEtBQUs7RUFDaEI7RUFFQSxTQUFTYSxhQUFhQSxDQUFDQyxVQUFVLEVBQUU7SUFDL0IsSUFBTUYsR0FBRyxHQUFHakIsV0FBVyxDQUFDbUIsVUFBVSxDQUFDO0lBQ25DLElBQU1kLEtBQUssR0FBR0QsZ0JBQWdCLENBQUMsQ0FBQztJQUNoQyxPQUFPQyxLQUFLLENBQUNZLEdBQUcsQ0FBQyxHQUFHLENBQUM7RUFDekI7O0VBRUE7RUFDQSxTQUFTRyxnQkFBZ0JBLENBQUEsRUFBRztJQUN4QixJQUFJckIsZUFBZSxDQUFDSCxNQUFNLEtBQUssQ0FBQyxFQUFFLE9BQU8sS0FBSztJQUM5QyxJQUFNZ0IsQ0FBQyxHQUFHQyxLQUFLLENBQUNDLElBQUksQ0FBQ3hCLFNBQVMsQ0FBQyxDQUFDeUIsSUFBSSxDQUFDLFVBQUFDLEVBQUU7TUFBQSxPQUFJQSxFQUFFLENBQUNkLE9BQU8sQ0FBQ1MsRUFBRSxLQUFLWixlQUFlLENBQUMsQ0FBQyxDQUFDO0lBQUEsRUFBQztJQUNoRixPQUFPYSxDQUFDLElBQUlaLFdBQVcsQ0FBQ1ksQ0FBQyxDQUFDLEtBQUssUUFBUTtFQUMzQztFQUVBdEIsU0FBUyxDQUFDb0IsT0FBTyxDQUFDLFVBQUFULFFBQVEsRUFBSTtJQUMxQkEsUUFBUSxDQUFDdkIsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07TUFDckNZLFNBQVMsQ0FBQ29CLE9BQU8sQ0FBQyxVQUFBRSxDQUFDO1FBQUEsT0FBSUEsQ0FBQyxDQUFDOUIsU0FBUyxDQUFDdUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztNQUFBLEVBQUM7TUFDcERwQixRQUFRLENBQUNuQixTQUFTLENBQUN3QyxHQUFHLENBQUMsUUFBUSxDQUFDO01BRWhDLElBQU1YLEVBQUUsR0FBR1YsUUFBUSxDQUFDQyxPQUFPLENBQUNTLEVBQUU7TUFDOUIsSUFBTVksSUFBSSxHQUFHdEIsUUFBUSxDQUFDQyxPQUFPLENBQUNxQixJQUFJO01BQ2xDLElBQU1DLElBQUksR0FBR3ZCLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDc0IsSUFBSTtNQUNsQyxJQUFNQyxNQUFNLEdBQUdDLE1BQU0sQ0FBQ3pCLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDdUIsTUFBTSxDQUFDO01BQzlDLElBQU1FLE1BQU0sR0FBR0QsTUFBTSxDQUFDekIsUUFBUSxDQUFDQyxPQUFPLENBQUN5QixNQUFNLENBQUM7TUFDOUMsSUFBTXpDLEtBQUssR0FBR3dDLE1BQU0sQ0FBQ3pCLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDaEIsS0FBSyxDQUFDO01BQzVDLElBQU1DLEtBQUssR0FBR3VDLE1BQU0sQ0FBQ3pCLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDZixLQUFLLENBQUM7TUFDNUMsSUFBTUMsSUFBSSxHQUFHc0MsTUFBTSxDQUFDekIsUUFBUSxDQUFDQyxPQUFPLENBQUNkLElBQUksQ0FBQztNQUMxQyxJQUFNQyxFQUFFLEdBQUdxQyxNQUFNLENBQUN6QixRQUFRLENBQUNDLE9BQU8sQ0FBQ2IsRUFBRSxDQUFDO01BQ3RDLElBQU11QyxVQUFVLEdBQUczQixRQUFRLENBQUNDLE9BQU8sQ0FBQzJCLE1BQU07TUFDMUMsSUFBTUMsV0FBVyxHQUFHN0IsUUFBUSxDQUFDQyxPQUFPLENBQUM0QixXQUFXLElBQUksRUFBRTtNQUN0RCxJQUFNQyxXQUFXLEdBQUc5QixRQUFRLENBQUNDLE9BQU8sQ0FBQzZCLFdBQVcsSUFBSSxFQUFFO01BQ3RELElBQU1DLFNBQVMsR0FBRy9CLFFBQVEsQ0FBQ0MsT0FBTyxDQUFDOEIsU0FBUyxJQUFJLEVBQUU7TUFFbEQsSUFBTUMsVUFBVSxxQkFBQUMsTUFBQSxDQUFxQk4sVUFBVSxDQUFFO01BQ2pELElBQU1PLFVBQVUsR0FBR3BDLGVBQWUsQ0FBQ3FDLFFBQVEsQ0FBQ3pCLEVBQUUsQ0FBQztNQUUvQyxJQUFNMEIsV0FBVyxHQUFHUCxXQUFXLCtQQUFBSSxNQUFBLENBSXVCaEUsVUFBVSxDQUFDNEQsV0FBVyxDQUFDLHVIQUFBSSxNQUFBLENBQ2FoRSxVQUFVLENBQUM4RCxTQUFTLENBQUMsMkdBQUFFLE1BQUEsQ0FFaEVoRSxVQUFVLENBQUM2RCxXQUFXLENBQUMsc0RBRWxFLEVBQUU7O01BRU47TUFDQSxJQUFNTyxhQUFhLEdBQUdDLFVBQVUsQ0FBQ2hCLElBQUksQ0FBQyxJQUFJLEVBQUU7TUFDNUMsSUFBSWlCLFdBQVcsR0FBRyxFQUFFO01BQ3BCLElBQUlGLGFBQWEsQ0FBQzFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDMUI0QyxXQUFXLHNVQUFBTixNQUFBLENBTURJLGFBQWEsQ0FBQ0csR0FBRyxDQUFDLFVBQUFDLENBQUM7VUFBQSwyRUFBQVIsTUFBQSxDQUNtQnBDLGNBQWMsQ0FBQ3NDLFFBQVEsQ0FBQ00sQ0FBQyxDQUFDQyxPQUFPLENBQUMsR0FBRywrQkFBK0IsR0FBRyxFQUFFLG9GQUFBVCxNQUFBLENBQ2hFaEUsVUFBVSxDQUFDd0UsQ0FBQyxDQUFDQyxPQUFPLENBQUMsc0ZBQUFULE1BQUEsQ0FDdkJoRSxVQUFVLENBQUN3RSxDQUFDLENBQUNuQixJQUFJLENBQUMsa0ZBQUFXLE1BQUEsQ0FDdEJoRSxVQUFVLENBQUN3RSxDQUFDLENBQUNFLElBQUksQ0FBQztRQUFBLENBRTVELENBQUMsQ0FBQ0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxtREFFbEI7TUFDTDtNQUVBckQsT0FBTyxDQUFDZixTQUFTLHNGQUFBeUQsTUFBQSxDQUVIWCxJQUFJLG1EQUFBVyxNQUFBLENBQ1FWLElBQUksb0dBQUFVLE1BQUEsQ0FHTkQsVUFBVSx5QkFBQUMsTUFBQSxDQUFvQlgsSUFBSSxpV0FBQVcsTUFBQSxDQVFuQlksSUFBSSxDQUFDQyxHQUFHLENBQUVwQixNQUFNLEdBQUczQyxRQUFRLENBQUNDLEdBQUcsR0FBSSxHQUFHLEVBQUUsR0FBRyxDQUFDLDBIQUFBaUQsTUFBQSxDQUczRFQsTUFBTSxTQUFBUyxNQUFBLENBQU1QLE1BQU0sOFRBQUFPLE1BQUEsQ0FPSFksSUFBSSxDQUFDQyxHQUFHLENBQUU3RCxLQUFLLEdBQUdGLFFBQVEsQ0FBQ0UsS0FBSyxHQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsMEhBQUFnRCxNQUFBLENBRzVEaEQsS0FBSyxrVUFBQWdELE1BQUEsQ0FPVVksSUFBSSxDQUFDQyxHQUFHLENBQUU1RCxLQUFLLEdBQUdILFFBQVEsQ0FBQ0csS0FBSyxHQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsMEhBQUErQyxNQUFBLENBRzVEL0MsS0FBSyxnVUFBQStDLE1BQUEsQ0FPVVksSUFBSSxDQUFDQyxHQUFHLENBQUUzRCxJQUFJLEdBQUdKLFFBQVEsQ0FBQ0ksSUFBSSxHQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsMEhBQUE4QyxNQUFBLENBRzFEOUMsSUFBSSw0VEFBQThDLE1BQUEsQ0FPV1ksSUFBSSxDQUFDQyxHQUFHLENBQUUxRCxFQUFFLEdBQUdMLFFBQVEsQ0FBQ0ssRUFBRSxHQUFJLEdBQUcsRUFBRSxHQUFHLENBQUMsMEhBQUE2QyxNQUFBLENBR3REN0MsRUFBRSxpR0FBQTZDLE1BQUEsQ0FJaEJHLFdBQVcsNEJBQUFILE1BQUEsQ0FDWE0sV0FBVywyRkFBQU4sTUFBQSxDQUdQQyxVQUFVLEdBQUcsZ0JBQWdCLEdBQUcsY0FBYywwRUFHM0Q7TUFFRCxJQUFNYSxRQUFRLEdBQUd4RCxPQUFPLENBQUNaLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztNQUMzRCxJQUFNcUUsT0FBTyxHQUFHakQsV0FBVyxDQUFDQyxRQUFRLENBQUM7TUFDckMsSUFBTWlELGVBQWUsR0FBR25ELGVBQWUsQ0FBQ3FDLFFBQVEsQ0FBQ3pCLEVBQUUsQ0FBQzs7TUFFcEQ7TUFDQSxJQUFJc0MsT0FBTyxLQUFLLFFBQVEsSUFBSSxDQUFDQyxlQUFlLElBQUksQ0FBQ2hDLGFBQWEsQ0FBQ2pCLFFBQVEsQ0FBQyxFQUFFO1FBQ3RFK0MsUUFBUSxDQUFDRyxRQUFRLEdBQUcsSUFBSTtRQUN4QkgsUUFBUSxDQUFDSSxXQUFXLFdBQUFsQixNQUFBLENBQVdlLE9BQU8scUJBQVk7TUFDdEQ7O01BRUE7TUFDQSxJQUFJN0IsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQUM4QixlQUFlLEVBQUU7UUFDeENGLFFBQVEsQ0FBQ0csUUFBUSxHQUFHLElBQUk7UUFDeEJILFFBQVEsQ0FBQ0ksV0FBVyxHQUFHLHNCQUFzQjtNQUNqRDtNQUVBSixRQUFRLENBQUN0RSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtRQUNyQztRQUNBLElBQUl1RSxPQUFPLEtBQUssUUFBUSxFQUFFO1VBQ3RCLElBQUlsRCxlQUFlLENBQUNxQyxRQUFRLENBQUN6QixFQUFFLENBQUMsRUFBRTtZQUM5QjtZQUNBWixlQUFlLEdBQUcsRUFBRTtZQUNwQkQsY0FBYyxHQUFHLEVBQUU7WUFDbkJSLFNBQVMsQ0FBQ29CLE9BQU8sQ0FBQyxVQUFBRSxDQUFDO2NBQUEsT0FBSUEsQ0FBQyxDQUFDOUIsU0FBUyxDQUFDdUMsTUFBTSxDQUFDLFVBQVUsQ0FBQztZQUFBLEVBQUM7VUFDMUQsQ0FBQyxNQUFNO1lBQ0g7WUFDQXRCLGVBQWUsR0FBRyxDQUFDWSxFQUFFLENBQUM7WUFDdEJiLGNBQWMsR0FBRyxDQUFDeUIsSUFBSSxDQUFDO1lBQ3ZCakMsU0FBUyxDQUFDb0IsT0FBTyxDQUFDLFVBQUFFLENBQUM7Y0FBQSxPQUFJQSxDQUFDLENBQUM5QixTQUFTLENBQUN1QyxNQUFNLENBQUMsVUFBVSxDQUFDO1lBQUEsRUFBQztZQUN0RHBCLFFBQVEsQ0FBQ25CLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxVQUFVLENBQUM7VUFDdEM7VUFDQStCLGtCQUFrQixDQUFDLENBQUM7VUFDcEJMLFFBQVEsQ0FBQ0ksV0FBVyxHQUFHckQsZUFBZSxDQUFDcUMsUUFBUSxDQUFDekIsRUFBRSxDQUFDLEdBQUcsZ0JBQWdCLEdBQUcsY0FBYztVQUN2RnFDLFFBQVEsQ0FBQ0csUUFBUSxHQUFHLEtBQUs7VUFDekI7UUFDSjs7UUFFQTtRQUNBLElBQUkvQixnQkFBZ0IsQ0FBQyxDQUFDLEVBQUU7VUFDcEJrQyxLQUFLLENBQUMsMERBQTBELENBQUM7VUFDakU7UUFDSjtRQUVBLElBQUl2RCxlQUFlLENBQUNxQyxRQUFRLENBQUN6QixFQUFFLENBQUMsRUFBRTtVQUM5QlosZUFBZSxHQUFHQSxlQUFlLENBQUN3RCxNQUFNLENBQUMsVUFBQUMsR0FBRztZQUFBLE9BQUlBLEdBQUcsS0FBSzdDLEVBQUU7VUFBQSxFQUFDO1VBQzNEYixjQUFjLEdBQUdBLGNBQWMsQ0FBQ3lELE1BQU0sQ0FBQyxVQUFBRSxDQUFDO1lBQUEsT0FBSUEsQ0FBQyxLQUFLbEMsSUFBSTtVQUFBLEVBQUM7VUFDdkR0QixRQUFRLENBQUNuQixTQUFTLENBQUN1QyxNQUFNLENBQUMsVUFBVSxDQUFDO1FBQ3pDLENBQUMsTUFBTTtVQUNILElBQUksQ0FBQ0gsYUFBYSxDQUFDakIsUUFBUSxDQUFDLEVBQUU7WUFDMUJxRCxLQUFLLDRCQUFBcEIsTUFBQSxDQUFzQmUsT0FBTyw0QkFBc0IsQ0FBQztZQUN6RDtVQUNKO1VBQ0EsSUFBSWxELGVBQWUsQ0FBQ0gsTUFBTSxJQUFJQyxZQUFZLEVBQUU7WUFDeEN5RCxLQUFLLENBQUMsa0RBQWtELENBQUM7WUFDekQ7VUFDSjtVQUNBdkQsZUFBZSxDQUFDMkQsSUFBSSxDQUFDL0MsRUFBRSxDQUFDO1VBQ3hCYixjQUFjLENBQUM0RCxJQUFJLENBQUNuQyxJQUFJLENBQUM7VUFDekJ0QixRQUFRLENBQUNuQixTQUFTLENBQUN3QyxHQUFHLENBQUMsVUFBVSxDQUFDO1FBQ3RDO1FBRUErQixrQkFBa0IsQ0FBQyxDQUFDO1FBQ3BCTCxRQUFRLENBQUNJLFdBQVcsR0FBR3JELGVBQWUsQ0FBQ3FDLFFBQVEsQ0FBQ3pCLEVBQUUsQ0FBQyxHQUM3QyxnQkFBZ0IsR0FDaEIsY0FBYztRQUNwQnFDLFFBQVEsQ0FBQ0csUUFBUSxHQUFHLEtBQUs7TUFDN0IsQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDOztFQUVGO0VBQ0EsSUFBTVEsV0FBVyxHQUFHdEYsUUFBUSxDQUFDTyxhQUFhLENBQUMsYUFBYSxDQUFDO0VBQ3pELElBQU0yRCxVQUFVLEdBQUdvQixXQUFXLEdBQUdDLElBQUksQ0FBQ0MsS0FBSyxDQUFDRixXQUFXLENBQUN6RCxPQUFPLENBQUNxQyxVQUFVLElBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDOztFQUV4RjtFQUNBLFNBQVNjLGtCQUFrQkEsQ0FBQSxFQUFHO0lBQzFCM0QsWUFBWSxDQUFDakIsU0FBUyxHQUFHLEVBQUU7SUFFM0IsSUFBTXFGLFlBQVksR0FBRzFDLGdCQUFnQixDQUFDLENBQUM7SUFFdkMsSUFBSTBDLFlBQVksRUFBRTtNQUNkO01BQ0EsSUFBTUMsSUFBSSxHQUFHbEQsS0FBSyxDQUFDQyxJQUFJLENBQUN4QixTQUFTLENBQUMsQ0FBQ3lCLElBQUksQ0FBQyxVQUFBSCxDQUFDO1FBQUEsT0FBSUEsQ0FBQyxDQUFDVixPQUFPLENBQUNTLEVBQUUsS0FBS1osZUFBZSxDQUFDLENBQUMsQ0FBQztNQUFBLEVBQUM7TUFDakYsSUFBSWdFLElBQUksRUFBRTtRQUNOLElBQU14QyxJQUFJLEdBQUd3QyxJQUFJLENBQUM3RCxPQUFPLENBQUNxQixJQUFJO1FBQzlCLElBQU1VLFVBQVUscUJBQUFDLE1BQUEsQ0FBcUI2QixJQUFJLENBQUM3RCxPQUFPLENBQUMyQixNQUFNLENBQUU7UUFDMUQsS0FBSyxJQUFJbUMsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxFQUFFLEVBQUU7VUFDeEIsSUFBTUMsTUFBTSxHQUFHNUYsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO1VBQzVDMkYsTUFBTSxDQUFDbkYsU0FBUyxDQUFDd0MsR0FBRyxDQUFDLHNCQUFzQixDQUFDO1VBQzVDMkMsTUFBTSxDQUFDeEYsU0FBUywyQ0FBQXlELE1BQUEsQ0FDQUQsVUFBVSx5QkFBQUMsTUFBQSxDQUFvQlgsSUFBSSx5Q0FBQVcsTUFBQSxDQUN0Q1gsSUFBSSxrQ0FDZjtVQUNEN0IsWUFBWSxDQUFDbkIsV0FBVyxDQUFDMEYsTUFBTSxDQUFDO1FBQ3BDO01BQ0o7SUFDSixDQUFDLE1BQU07TUFDSGxFLGVBQWUsQ0FBQ1csT0FBTyxDQUFDLFVBQUFDLEVBQUUsRUFBSTtRQUMxQixJQUFNb0QsSUFBSSxHQUFHbEQsS0FBSyxDQUFDQyxJQUFJLENBQUN4QixTQUFTLENBQUMsQ0FBQ3lCLElBQUksQ0FBQyxVQUFBSCxDQUFDO1VBQUEsT0FBSUEsQ0FBQyxDQUFDVixPQUFPLENBQUNTLEVBQUUsS0FBS0EsRUFBRTtRQUFBLEVBQUM7UUFDakUsSUFBSSxDQUFDb0QsSUFBSSxFQUFFO1FBQ1gsSUFBTXhDLElBQUksR0FBR3dDLElBQUksQ0FBQzdELE9BQU8sQ0FBQ3FCLElBQUk7UUFDOUIsSUFBTVUsVUFBVSxxQkFBQUMsTUFBQSxDQUFxQjZCLElBQUksQ0FBQzdELE9BQU8sQ0FBQzJCLE1BQU0sQ0FBRTtRQUMxRCxJQUFNb0MsTUFBTSxHQUFHNUYsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQzVDMkYsTUFBTSxDQUFDbkYsU0FBUyxDQUFDd0MsR0FBRyxDQUFDLHNCQUFzQixDQUFDO1FBQzVDMkMsTUFBTSxDQUFDeEYsU0FBUyx1Q0FBQXlELE1BQUEsQ0FDQUQsVUFBVSx5QkFBQUMsTUFBQSxDQUFvQlgsSUFBSSxxQ0FBQVcsTUFBQSxDQUN0Q1gsSUFBSSw4QkFDZjtRQUNEN0IsWUFBWSxDQUFDbkIsV0FBVyxDQUFDMEYsTUFBTSxDQUFDO01BQ3BDLENBQUMsQ0FBQztJQUNOOztJQUVBO0lBQ0FDLG9CQUFvQixDQUFDLENBQUM7O0lBRXRCO0lBQ0FDLHVCQUF1QixDQUFDLENBQUM7SUFFekIsSUFBSXhFLFNBQVMsRUFBRTtNQUNYLElBQUltRSxZQUFZLEVBQUU7UUFDZG5FLFNBQVMsQ0FBQ3dELFFBQVEsR0FBRyxLQUFLO01BQzlCLENBQUMsTUFBTTtRQUNILElBQU05QyxLQUFLLEdBQUdELGdCQUFnQixDQUFDLENBQUM7UUFDaEMsSUFBTWdFLFlBQVksR0FBRy9ELEtBQUssQ0FBQ0MsSUFBSSxLQUFLLENBQUMsSUFBSUQsS0FBSyxDQUFDRSxHQUFHLEtBQUssQ0FBQyxJQUFJRixLQUFLLENBQUNHLE1BQU0sS0FBSyxDQUFDLElBQUlILEtBQUssQ0FBQ0ksT0FBTyxLQUFLLENBQUM7UUFDckdkLFNBQVMsQ0FBQ3dELFFBQVEsR0FBRyxDQUFDaUIsWUFBWTtNQUN0QztJQUNKO0VBQ0o7RUFFQSxTQUFTRCx1QkFBdUJBLENBQUEsRUFBRztJQUMvQjtJQUNBN0UsU0FBUyxDQUFDb0IsT0FBTyxDQUFDLFVBQUFFLENBQUMsRUFBSTtNQUNuQkEsQ0FBQyxDQUFDOUIsU0FBUyxDQUFDdUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLGdCQUFnQixDQUFDO01BQ3pELElBQU1nRCxLQUFLLEdBQUd6RCxDQUFDLENBQUNoQyxhQUFhLENBQUMsZ0JBQWdCLENBQUM7TUFDL0MsSUFBSXlGLEtBQUssRUFBRUEsS0FBSyxDQUFDaEQsTUFBTSxDQUFDLENBQUM7SUFDN0IsQ0FBQyxDQUFDO0lBRUYsSUFBSXRCLGVBQWUsQ0FBQ0gsTUFBTSxLQUFLLENBQUMsRUFBRTs7SUFFbEM7SUFDQSxJQUFNMEUsYUFBYSxHQUFHdkUsZUFBZSxDQUFDMEMsR0FBRyxDQUFDLFVBQUE5QixFQUFFLEVBQUk7TUFDNUMsSUFBTUMsQ0FBQyxHQUFHQyxLQUFLLENBQUNDLElBQUksQ0FBQ3hCLFNBQVMsQ0FBQyxDQUFDeUIsSUFBSSxDQUFDLFVBQUFDLEVBQUU7UUFBQSxPQUFJQSxFQUFFLENBQUNkLE9BQU8sQ0FBQ1MsRUFBRSxLQUFLQSxFQUFFO01BQUEsRUFBQztNQUNoRSxPQUFPQyxDQUFDLEdBQUdBLENBQUMsQ0FBQ1YsT0FBTyxDQUFDcUIsSUFBSSxHQUFHLElBQUk7SUFDcEMsQ0FBQyxDQUFDLENBQUNnQyxNQUFNLENBQUNnQixPQUFPLENBQUM7O0lBRWxCO0lBQ0EsSUFBTUMsZUFBZSxHQUFHLEVBQUU7SUFDMUIsSUFBTUMsU0FBUyxHQUFHLElBQUlDLEdBQUcsQ0FBQyxDQUFDO0lBQzNCSixhQUFhLENBQUM1RCxPQUFPLENBQUMsVUFBQWEsSUFBSSxFQUFJO01BQzFCLElBQU1vRCxTQUFTLEdBQUdwQyxVQUFVLENBQUNoQixJQUFJLENBQUMsSUFBSSxFQUFFO01BQ3hDb0QsU0FBUyxDQUFDakUsT0FBTyxDQUFDLFVBQUFrRSxHQUFHLEVBQUk7UUFDckIsSUFBSU4sYUFBYSxDQUFDbEMsUUFBUSxDQUFDd0MsR0FBRyxDQUFDakMsT0FBTyxDQUFDLEVBQUU7VUFDckMsSUFBTWtDLE9BQU8sR0FBRyxDQUFDdEQsSUFBSSxFQUFFcUQsR0FBRyxDQUFDakMsT0FBTyxDQUFDLENBQUNtQyxJQUFJLENBQUMsQ0FBQyxDQUFDakMsSUFBSSxDQUFDLEdBQUcsQ0FBQztVQUNwRCxJQUFJLENBQUM0QixTQUFTLENBQUNNLEdBQUcsQ0FBQ0YsT0FBTyxDQUFDLEVBQUU7WUFDekJKLFNBQVMsQ0FBQ25ELEdBQUcsQ0FBQ3VELE9BQU8sQ0FBQztZQUN0QkwsZUFBZSxDQUFDZCxJQUFJLENBQUM7Y0FBRXNCLEtBQUssRUFBRXpELElBQUk7Y0FBRTBELEtBQUssRUFBRUwsR0FBRyxDQUFDakMsT0FBTztjQUFFdUMsV0FBVyxFQUFFTixHQUFHLENBQUNyRCxJQUFJO2NBQUVxQixJQUFJLEVBQUVnQyxHQUFHLENBQUNoQztZQUFLLENBQUMsQ0FBQztVQUNwRztRQUNKO01BQ0osQ0FBQyxDQUFDO0lBQ04sQ0FBQyxDQUFDOztJQUVGO0lBQ0E0QixlQUFlLENBQUM5RCxPQUFPLENBQUMsVUFBQWtFLEdBQUcsRUFBSTtNQUMzQnRGLFNBQVMsQ0FBQ29CLE9BQU8sQ0FBQyxVQUFBRSxDQUFDLEVBQUk7UUFDbkIsSUFBSSxDQUFDQSxDQUFDLENBQUNWLE9BQU8sQ0FBQ3FCLElBQUksS0FBS3FELEdBQUcsQ0FBQ0ksS0FBSyxJQUFJcEUsQ0FBQyxDQUFDVixPQUFPLENBQUNxQixJQUFJLEtBQUtxRCxHQUFHLENBQUNLLEtBQUssS0FDMURsRixlQUFlLENBQUNxQyxRQUFRLENBQUN4QixDQUFDLENBQUNWLE9BQU8sQ0FBQ1MsRUFBRSxDQUFDLEVBQUU7VUFDM0NDLENBQUMsQ0FBQzlCLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxnQkFBZ0IsQ0FBQztRQUNyQztNQUNKLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQzs7SUFFRjtJQUNBaEMsU0FBUyxDQUFDb0IsT0FBTyxDQUFDLFVBQUFFLENBQUMsRUFBSTtNQUNuQixJQUFJYixlQUFlLENBQUNxQyxRQUFRLENBQUN4QixDQUFDLENBQUNWLE9BQU8sQ0FBQ1MsRUFBRSxDQUFDLEVBQUU7TUFDNUMsSUFBTXdFLEtBQUssR0FBR3ZFLENBQUMsQ0FBQ1YsT0FBTyxDQUFDcUIsSUFBSTtNQUM1QixJQUFNZSxhQUFhLEdBQUdDLFVBQVUsQ0FBQzRDLEtBQUssQ0FBQyxJQUFJLEVBQUU7TUFDN0MsSUFBTUMsUUFBUSxHQUFHOUMsYUFBYSxDQUFDaUIsTUFBTSxDQUFDLFVBQUFxQixHQUFHO1FBQUEsT0FBSU4sYUFBYSxDQUFDbEMsUUFBUSxDQUFDd0MsR0FBRyxDQUFDakMsT0FBTyxDQUFDO01BQUEsRUFBQztNQUVqRixJQUFJeUMsUUFBUSxDQUFDeEYsTUFBTSxHQUFHLENBQUMsRUFBRTtRQUNyQmdCLENBQUMsQ0FBQzlCLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztRQUNwQyxJQUFNK0MsS0FBSyxHQUFHaEcsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO1FBQzNDK0YsS0FBSyxDQUFDZ0IsU0FBUyxHQUFHLGVBQWU7UUFDakNoQixLQUFLLENBQUM1RixTQUFTLEdBQUcsNkJBQTZCO1FBQy9DNEYsS0FBSyxDQUFDaUIsS0FBSyxHQUFHRixRQUFRLENBQUMzQyxHQUFHLENBQUMsVUFBQUMsQ0FBQztVQUFBLE9BQUlBLENBQUMsQ0FBQ25CLElBQUk7UUFBQSxFQUFDLENBQUNzQixJQUFJLENBQUMsSUFBSSxDQUFDO1FBQ2xEakMsQ0FBQyxDQUFDckMsV0FBVyxDQUFDOEYsS0FBSyxDQUFDO01BQ3hCO0lBQ0osQ0FBQyxDQUFDOztJQUVGO0lBQ0FrQixvQkFBb0IsQ0FBQ2YsZUFBZSxDQUFDO0VBQ3pDO0VBRUEsU0FBU2Usb0JBQW9CQSxDQUFDZixlQUFlLEVBQUU7SUFDM0MsSUFBSWdCLFNBQVMsR0FBR25ILFFBQVEsQ0FBQ08sYUFBYSxDQUFDLGtCQUFrQixDQUFDO0lBQzFELElBQUksQ0FBQzRHLFNBQVMsRUFBRTtNQUNaQSxTQUFTLEdBQUduSCxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDekNrSCxTQUFTLENBQUNILFNBQVMsR0FBRyxpQkFBaUI7TUFDdkMsSUFBTUksT0FBTyxHQUFHcEgsUUFBUSxDQUFDTyxhQUFhLENBQUMseUJBQXlCLENBQUM7TUFDakUsSUFBSTZHLE9BQU8sRUFBRTtRQUNUQSxPQUFPLENBQUNDLFVBQVUsQ0FBQ0MsWUFBWSxDQUFDSCxTQUFTLEVBQUVDLE9BQU8sQ0FBQztNQUN2RDtJQUNKO0lBRUEsSUFBSWpCLGVBQWUsQ0FBQzVFLE1BQU0sS0FBSyxDQUFDLEVBQUU7TUFDOUI0RixTQUFTLENBQUMvRyxTQUFTLEdBQUcsRUFBRTtNQUN4QjtJQUNKO0lBRUErRyxTQUFTLENBQUMvRyxTQUFTLDZKQUFBeUQsTUFBQSxDQUlic0MsZUFBZSxDQUFDL0IsR0FBRyxDQUFDLFVBQUFDLENBQUM7TUFBQSw2SEFBQVIsTUFBQSxDQUV1QmhFLFVBQVUsQ0FBQ3dFLENBQUMsQ0FBQ3dDLFdBQVcsQ0FBQywwRUFBQWhELE1BQUEsQ0FDeEJoRSxVQUFVLENBQUN3RSxDQUFDLENBQUNzQyxLQUFLLENBQUMsU0FBQTlDLE1BQUEsQ0FBTWhFLFVBQVUsQ0FBQ3dFLENBQUMsQ0FBQ3VDLEtBQUssQ0FBQyx5RUFBQS9DLE1BQUEsQ0FDN0NoRSxVQUFVLENBQUN3RSxDQUFDLENBQUNFLElBQUksQ0FBQztJQUFBLENBRS9ELENBQUMsQ0FBQ0MsSUFBSSxDQUFDLEVBQUUsQ0FBQyxlQUNkO0VBQ0w7RUFFQSxTQUFTcUIsb0JBQW9CQSxDQUFBLEVBQUc7SUFDNUIsSUFBTUosWUFBWSxHQUFHMUMsZ0JBQWdCLENBQUMsQ0FBQztJQUN2QyxJQUFNZixLQUFLLEdBQUdELGdCQUFnQixDQUFDLENBQUM7SUFDaEMsSUFBTXdGLFNBQVMsR0FBR3ZILFFBQVEsQ0FBQ08sYUFBYSxDQUFDLGlCQUFpQixDQUFDO0lBQzNELElBQUlnSCxTQUFTLEVBQUU7TUFDWEEsU0FBUyxDQUFDckcsZ0JBQWdCLENBQUMsWUFBWSxDQUFDLENBQUNtQixPQUFPLENBQUMsVUFBQW1GLElBQUksRUFBSTtRQUNyRCxJQUFNNUUsR0FBRyxHQUFHNEUsSUFBSSxDQUFDM0YsT0FBTyxDQUFDc0IsSUFBSTtRQUM3QixJQUFJc0MsWUFBWSxJQUFJekQsS0FBSyxDQUFDWSxHQUFHLENBQUMsS0FBSyxDQUFDLEVBQUU7VUFDbEM0RSxJQUFJLENBQUMvRyxTQUFTLENBQUN3QyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQ2hDLENBQUMsTUFBTTtVQUNIdUUsSUFBSSxDQUFDL0csU0FBUyxDQUFDdUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUNuQztNQUNKLENBQUMsQ0FBQztJQUNOO0VBQ0o7O0VBRUE7QUFDSjtBQUNBO0VBQ0ksSUFBTXlFLGFBQWEsR0FBR3pILFFBQVEsQ0FBQ08sYUFBYSxDQUFDLGtCQUFrQixDQUFDO0VBQ2hFLElBQU1tSCxXQUFXLEdBQUcxSCxRQUFRLENBQUNvQixjQUFjLENBQUMsYUFBYSxDQUFDO0VBQzFELElBQU11RyxlQUFlLEdBQUczSCxRQUFRLENBQUNvQixjQUFjLENBQUMsWUFBWSxDQUFDO0VBQzdELElBQU13RyxnQkFBZ0IsR0FBRzVILFFBQVEsQ0FBQ29CLGNBQWMsQ0FBQyxlQUFlLENBQUM7RUFDakUsSUFBTXlHLGVBQWUsR0FBRzdILFFBQVEsQ0FBQ29CLGNBQWMsQ0FBQyxjQUFjLENBQUM7O0VBRS9EO0VBQ0EsU0FBUzBHLG1CQUFtQkEsQ0FBQSxFQUFHO0lBQzNCLElBQUlMLGFBQWEsRUFBRTtNQUNmO01BQ0EsSUFBSTFFLGdCQUFnQixDQUFDLENBQUMsRUFBRTtRQUNwQjBFLGFBQWEsQ0FBQzNDLFFBQVEsR0FBRyxJQUFJO1FBQzdCO01BQ0o7TUFDQSxJQUFNOUMsS0FBSyxHQUFHRCxnQkFBZ0IsQ0FBQyxDQUFDO01BQ2hDLElBQU1nRSxZQUFZLEdBQUcvRCxLQUFLLENBQUNDLElBQUksS0FBSyxDQUFDLElBQUlELEtBQUssQ0FBQ0UsR0FBRyxLQUFLLENBQUMsSUFBSUYsS0FBSyxDQUFDRyxNQUFNLEtBQUssQ0FBQyxJQUFJSCxLQUFLLENBQUNJLE9BQU8sS0FBSyxDQUFDO01BQ3JHcUYsYUFBYSxDQUFDM0MsUUFBUSxHQUFHLENBQUNpQixZQUFZO0lBQzFDO0VBQ0o7O0VBRUE7RUFDQSxJQUFNZ0MsMEJBQTBCLEdBQUcvQyxrQkFBa0I7RUFDckQ7RUFDQSxJQUFNZ0QsV0FBVyxHQUFHaEQsa0JBQWtCOztFQUV0QztFQUNBO0VBQ0EsSUFBTWlELG1CQUFtQixHQUFHcEMsb0JBQW9COztFQUVoRDtFQUNBLElBQUk0QixhQUFhLElBQUlDLFdBQVcsRUFBRTtJQUM5QkQsYUFBYSxDQUFDcEgsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07TUFDMUNzSCxlQUFlLENBQUNPLEtBQUssR0FBRyxFQUFFO01BQzFCUixXQUFXLENBQUNTLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07TUFDbENDLFVBQVUsQ0FBQztRQUFBLE9BQU1WLGVBQWUsQ0FBQ1csS0FBSyxDQUFDLENBQUM7TUFBQSxHQUFFLEdBQUcsQ0FBQztJQUNsRCxDQUFDLENBQUM7O0lBRUY7SUFDQVQsZUFBZSxDQUFDeEgsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFlBQU07TUFDNUNxSCxXQUFXLENBQUNTLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07SUFDdEMsQ0FBQyxDQUFDO0lBRUZWLFdBQVcsQ0FBQ25ILGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDRixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUNqRnFILFdBQVcsQ0FBQ1MsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtJQUN0QyxDQUFDLENBQUM7O0lBRUY7SUFDQVIsZ0JBQWdCLENBQUN2SCxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUM3QyxJQUFNNkMsSUFBSSxHQUFHeUUsZUFBZSxDQUFDTyxLQUFLLENBQUNLLElBQUksQ0FBQyxDQUFDO01BQ3pDLElBQUksQ0FBQ3JGLElBQUksRUFBRTtRQUNQeUUsZUFBZSxDQUFDUSxLQUFLLENBQUNLLFdBQVcsR0FBRyxTQUFTO1FBQzdDO01BQ0o7TUFFQVosZ0JBQWdCLENBQUM5QyxRQUFRLEdBQUcsSUFBSTtNQUNoQzhDLGdCQUFnQixDQUFDN0MsV0FBVyxHQUFHLEtBQUs7TUFFcEMwRCxLQUFLLENBQUMscUJBQXFCLEVBQUU7UUFDekJDLE1BQU0sRUFBRSxNQUFNO1FBQ2RDLE9BQU8sRUFBRTtVQUNMLGNBQWMsRUFBRSxrQkFBa0I7VUFDbEMsa0JBQWtCLEVBQUU7UUFDeEIsQ0FBQztRQUNEQyxJQUFJLEVBQUVyRCxJQUFJLENBQUNzRCxTQUFTLENBQUM7VUFDakIzRixJQUFJLEVBQUVBLElBQUk7VUFDVjRGLFlBQVksRUFBRXBILGVBQWUsQ0FBQzBDLEdBQUcsQ0FBQ2YsTUFBTTtRQUM1QyxDQUFDO01BQ0wsQ0FBQyxDQUFDLENBQ0QwRixJQUFJLENBQUMsVUFBQUMsR0FBRztRQUFBLE9BQUlBLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDLENBQUM7TUFBQSxFQUFDLENBQ3ZCRixJQUFJLENBQUMsVUFBQUcsSUFBSSxFQUFJO1FBQ1YsSUFBSUEsSUFBSSxDQUFDQyxPQUFPLEVBQUU7VUFDZDtVQUNBQyxNQUFNLENBQUNDLFFBQVEsQ0FBQ0MsTUFBTSxDQUFDLENBQUM7UUFDNUIsQ0FBQyxNQUFNO1VBQ0hyRSxLQUFLLENBQUNpRSxJQUFJLENBQUNLLEtBQUssSUFBSSw4QkFBOEIsQ0FBQztVQUNuRDNCLGdCQUFnQixDQUFDOUMsUUFBUSxHQUFHLEtBQUs7VUFDakM4QyxnQkFBZ0IsQ0FBQzdDLFdBQVcsR0FBRyxhQUFhO1FBQ2hEO01BQ0osQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxZQUFNO1FBQ1RFLEtBQUssQ0FBQyw4QkFBOEIsQ0FBQztRQUNyQzJDLGdCQUFnQixDQUFDOUMsUUFBUSxHQUFHLEtBQUs7UUFDakM4QyxnQkFBZ0IsQ0FBQzdDLFdBQVcsR0FBRyxhQUFhO01BQ2hELENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQzs7SUFFRjtJQUNBNEMsZUFBZSxDQUFDdEgsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUNtSixDQUFDLEVBQUs7TUFDL0MsSUFBSUEsQ0FBQyxDQUFDQyxHQUFHLEtBQUssT0FBTyxFQUFFN0IsZ0JBQWdCLENBQUM4QixLQUFLLENBQUMsQ0FBQztNQUMvQy9CLGVBQWUsQ0FBQ1EsS0FBSyxDQUFDSyxXQUFXLEdBQUcsRUFBRTtJQUMxQyxDQUFDLENBQUM7RUFDTjs7RUFFQTtFQUNBLFNBQVNtQixVQUFVQSxDQUFDYixZQUFZLEVBQUU7SUFDOUI7SUFDQXBILGVBQWUsR0FBRyxFQUFFO0lBQ3BCRCxjQUFjLEdBQUcsRUFBRTtJQUNuQlIsU0FBUyxDQUFDb0IsT0FBTyxDQUFDLFVBQUFFLENBQUM7TUFBQSxPQUFJQSxDQUFDLENBQUM5QixTQUFTLENBQUN1QyxNQUFNLENBQUMsVUFBVSxDQUFDO0lBQUEsRUFBQzs7SUFFdEQ7SUFDQThGLFlBQVksQ0FBQ3pHLE9BQU8sQ0FBQyxVQUFBQyxFQUFFLEVBQUk7TUFDdkIsSUFBTXNILEtBQUssR0FBR0MsTUFBTSxDQUFDdkgsRUFBRSxDQUFDO01BQ3hCLElBQU1WLFFBQVEsR0FBR1ksS0FBSyxDQUFDQyxJQUFJLENBQUN4QixTQUFTLENBQUMsQ0FBQ3lCLElBQUksQ0FBQyxVQUFBSCxDQUFDO1FBQUEsT0FBSUEsQ0FBQyxDQUFDVixPQUFPLENBQUNTLEVBQUUsS0FBS3NILEtBQUs7TUFBQSxFQUFDO01BQ3hFLElBQUloSSxRQUFRLEVBQUU7UUFDVkYsZUFBZSxDQUFDMkQsSUFBSSxDQUFDdUUsS0FBSyxDQUFDO1FBQzNCbkksY0FBYyxDQUFDNEQsSUFBSSxDQUFDekQsUUFBUSxDQUFDQyxPQUFPLENBQUNxQixJQUFJLENBQUM7UUFDMUN0QixRQUFRLENBQUNuQixTQUFTLENBQUN3QyxHQUFHLENBQUMsVUFBVSxDQUFDO01BQ3RDO0lBQ0osQ0FBQyxDQUFDO0lBRUYrQixrQkFBa0IsQ0FBQyxDQUFDO0lBQ3BCOEMsbUJBQW1CLENBQUMsQ0FBQztFQUN6Qjs7RUFFQTtFQUNBLFNBQVNnQyxZQUFZQSxDQUFDQyxRQUFRLEVBQUVDLE1BQU0sRUFBRTtJQUNwQyxJQUFJLENBQUNDLE9BQU8sQ0FBQyx1QkFBdUIsQ0FBQyxFQUFFO0lBRXZDeEIsS0FBSyxtQkFBQTVFLE1BQUEsQ0FBbUJrRyxRQUFRLEdBQUk7TUFDaENyQixNQUFNLEVBQUUsUUFBUTtNQUNoQkMsT0FBTyxFQUFFO1FBQUUsa0JBQWtCLEVBQUU7TUFBaUI7SUFDcEQsQ0FBQyxDQUFDLENBQ0RJLElBQUksQ0FBQyxVQUFBQyxHQUFHO01BQUEsT0FBSUEsR0FBRyxDQUFDQyxJQUFJLENBQUMsQ0FBQztJQUFBLEVBQUMsQ0FDdkJGLElBQUksQ0FBQyxVQUFBRyxJQUFJLEVBQUk7TUFDVixJQUFJQSxJQUFJLENBQUNDLE9BQU8sRUFBRTtRQUNkYSxNQUFNLENBQUNoSCxNQUFNLENBQUMsQ0FBQztRQUNmO1FBQ0EsSUFBTWtILElBQUksR0FBR2xLLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLG9CQUFvQixDQUFDO1FBQ3pELElBQUkySixJQUFJLElBQUlBLElBQUksQ0FBQ0MsUUFBUSxDQUFDNUksTUFBTSxLQUFLLENBQUMsRUFBRTtVQUFBLElBQUE2SSxxQkFBQTtVQUNwQyxDQUFBQSxxQkFBQSxHQUFBcEssUUFBUSxDQUFDTyxhQUFhLENBQUMsY0FBYyxDQUFDLGNBQUE2SixxQkFBQSxlQUF0Q0EscUJBQUEsQ0FBd0NwSCxNQUFNLENBQUMsQ0FBQztRQUNwRDtNQUNKO0lBQ0osQ0FBQyxDQUFDLFNBQ0ksQ0FBQztNQUFBLE9BQU1pQyxLQUFLLENBQUMsK0JBQStCLENBQUM7SUFBQSxFQUFDO0VBQ3hEOztFQUVBO0VBQ0FqRixRQUFRLENBQUNrQixnQkFBZ0IsQ0FBQyxjQUFjLENBQUMsQ0FBQ21CLE9BQU8sQ0FBQyxVQUFBZ0ksSUFBSSxFQUFJO0lBQ3RELElBQU1OLFFBQVEsR0FBR00sSUFBSSxDQUFDeEksT0FBTyxDQUFDa0ksUUFBUTtJQUN0QyxJQUFNTyxPQUFPLEdBQUcvRSxJQUFJLENBQUNDLEtBQUssQ0FBQzZFLElBQUksQ0FBQ3hJLE9BQU8sQ0FBQzBJLFNBQVMsQ0FBQztJQUVsREYsSUFBSSxDQUFDOUosYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUNGLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO01BQ3JFc0osVUFBVSxDQUFDVyxPQUFPLENBQUM7SUFDdkIsQ0FBQyxDQUFDO0lBRUZELElBQUksQ0FBQzlKLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDRixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQ21KLENBQUMsRUFBSztNQUN4RUEsQ0FBQyxDQUFDZ0IsZUFBZSxDQUFDLENBQUM7TUFDbkJWLFlBQVksQ0FBQ0MsUUFBUSxFQUFFTSxJQUFJLENBQUM7SUFDaEMsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDOztFQUVGO0VBQ0E7RUFDQSxJQUFNSSxvQkFBb0IsR0FBRyxJQUFJQyxnQkFBZ0IsQ0FBQztJQUFBLE9BQU01QyxtQkFBbUIsQ0FBQyxDQUFDO0VBQUEsRUFBQztFQUM5RSxJQUFJekcsWUFBWSxFQUFFO0lBQ2RvSixvQkFBb0IsQ0FBQ0UsT0FBTyxDQUFDdEosWUFBWSxFQUFFO01BQUV1SixTQUFTLEVBQUU7SUFBSyxDQUFDLENBQUM7RUFDbkU7RUFFQSxJQUFJdEosU0FBUyxFQUFFO0lBQ1hBLFNBQVMsQ0FBQ2pCLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO01BQ3RDLElBQUlxQixlQUFlLENBQUNILE1BQU0sR0FBRyxDQUFDLEVBQUU7UUFDNUI7UUFDQWtILEtBQUssQ0FBQyxlQUFlLEVBQUU7VUFDbkJDLE1BQU0sRUFBRSxNQUFNO1VBQ2RDLE9BQU8sRUFBRTtZQUNMLGNBQWMsRUFBRSxtQ0FBbUM7WUFDbkQsa0JBQWtCLEVBQUU7VUFDeEIsQ0FBQztVQUNEQyxJQUFJLEVBQUVsSCxlQUFlLENBQUMwQyxHQUFHLENBQUMsVUFBQzlCLEVBQUUsRUFBRXFELENBQUM7WUFBQSx3QkFBQTlCLE1BQUEsQ0FBc0I4QixDQUFDLFFBQUE5QixNQUFBLENBQUtnSCxrQkFBa0IsQ0FBQ3ZJLEVBQUUsQ0FBQztVQUFBLENBQUUsQ0FBQyxDQUFDa0MsSUFBSSxDQUFDLEdBQUc7UUFDbEcsQ0FBQyxDQUFDLENBQ0R1RSxJQUFJLENBQUMsVUFBQStCLFFBQVEsRUFBSTtVQUNkLElBQUlBLFFBQVEsQ0FBQ0MsVUFBVSxFQUFFO1lBQ3JCM0IsTUFBTSxDQUFDQyxRQUFRLENBQUMyQixJQUFJLEdBQUdGLFFBQVEsQ0FBQ0csR0FBRztVQUN2QyxDQUFDLE1BQU07WUFDSDtZQUNBN0IsTUFBTSxDQUFDQyxRQUFRLENBQUMyQixJQUFJLEdBQUcsY0FBYztVQUN6QztRQUNKLENBQUMsQ0FBQyxTQUNJLENBQUMsWUFBTTtVQUNUL0YsS0FBSyxDQUFDLDJDQUEyQyxDQUFDO1FBQ3RELENBQUMsQ0FBQztNQUNOO0lBQ0osQ0FBQyxDQUFDO0VBQ047QUFDSixDQUFDLENBQUM7O0FBRUY7QUFDQTtBQUNBO0FBQ0FqRixRQUFRLENBQUNLLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQU07RUFDaEQsSUFBTUssTUFBTSxHQUFHVixRQUFRLENBQUNPLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztFQUM5RCxJQUFNMkssS0FBSyxHQUFHbEwsUUFBUSxDQUFDTyxhQUFhLENBQUMsc0JBQXNCLENBQUM7RUFDNUQsSUFBTTRLLFFBQVEsR0FBR25MLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLHlCQUF5QixDQUFDO0VBQ2xFLElBQU02SyxRQUFRLEdBQUdwTCxRQUFRLENBQUNPLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztFQUMvRCxJQUFNOEssT0FBTyxHQUFHckwsUUFBUSxDQUFDTyxhQUFhLENBQUMsd0JBQXdCLENBQUM7RUFFaEUsSUFBSSxDQUFDRyxNQUFNLElBQUksQ0FBQ3dLLEtBQUssRUFBRTtFQUV2QixJQUFJSSxNQUFNLEdBQUcsS0FBSztFQUVsQixTQUFTQyxTQUFTQSxDQUFBLEVBQUc7SUFDakJMLEtBQUssQ0FBQy9DLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE9BQU87SUFDN0IrQyxRQUFRLENBQUNoRCxLQUFLLENBQUNDLE9BQU8sR0FBRyxPQUFPO0lBQ2hDOEMsS0FBSyxDQUFDTSxZQUFZLENBQUMsQ0FBQztJQUNwQk4sS0FBSyxDQUFDekssU0FBUyxDQUFDd0MsR0FBRyxDQUFDLHFCQUFxQixDQUFDO0lBQzFDa0ksUUFBUSxDQUFDMUssU0FBUyxDQUFDd0MsR0FBRyxDQUFDLCtCQUErQixDQUFDO0lBRXZELElBQUksQ0FBQ3FJLE1BQU0sRUFBRTtNQUNURyxZQUFZLENBQUMsQ0FBQztJQUNsQjtFQUNKO0VBRUEsU0FBU0MsVUFBVUEsQ0FBQSxFQUFHO0lBQ2xCUixLQUFLLENBQUN6SyxTQUFTLENBQUN1QyxNQUFNLENBQUMscUJBQXFCLENBQUM7SUFDN0NtSSxRQUFRLENBQUMxSyxTQUFTLENBQUN1QyxNQUFNLENBQUMsK0JBQStCLENBQUM7SUFDMURxRixVQUFVLENBQUMsWUFBTTtNQUNiNkMsS0FBSyxDQUFDL0MsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtNQUM1QitDLFFBQVEsQ0FBQ2hELEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07SUFDbkMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztFQUNYO0VBRUExSCxNQUFNLENBQUNMLGdCQUFnQixDQUFDLE9BQU8sRUFBRWtMLFNBQVMsQ0FBQztFQUMzQ0gsUUFBUSxDQUFDL0ssZ0JBQWdCLENBQUMsT0FBTyxFQUFFcUwsVUFBVSxDQUFDO0VBQzlDUCxRQUFRLENBQUM5SyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUVxTCxVQUFVLENBQUM7RUFFOUMsU0FBU0QsWUFBWUEsQ0FBQSxFQUFHO0lBQ3BCaEQsS0FBSyxDQUFDLGNBQWMsQ0FBQyxDQUNoQk0sSUFBSSxDQUFDLFVBQUFDLEdBQUc7TUFBQSxPQUFJQSxHQUFHLENBQUNDLElBQUksQ0FBQyxDQUFDO0lBQUEsRUFBQyxDQUN2QkYsSUFBSSxDQUFDLFVBQUFHLElBQUksRUFBSTtNQUNWb0MsTUFBTSxHQUFHLElBQUk7TUFDYkssYUFBYSxDQUFDekMsSUFBSSxDQUFDO0lBQ3ZCLENBQUMsQ0FBQyxTQUNJLENBQUMsWUFBTTtNQUNUbUMsT0FBTyxDQUFDakwsU0FBUyxHQUFHLDBEQUEwRDtJQUNsRixDQUFDLENBQUM7RUFDVjtFQUVBLFNBQVN1TCxhQUFhQSxDQUFDekMsSUFBSSxFQUFFO0lBQ3pCLElBQU0wQyxXQUFXLEdBQUcsU0FBZEEsV0FBV0EsQ0FBSUMsQ0FBQztNQUFBLE9BQUtBLENBQUMsS0FBSyxLQUFLLEdBQUcsYUFBYSxHQUFHQSxDQUFDLEtBQUssTUFBTSxHQUFHLGNBQWMsR0FBRyxjQUFjO0lBQUE7SUFDdkcsSUFBTUMsV0FBVyxHQUFHLFNBQWRBLFdBQVdBLENBQUlELENBQUM7TUFBQSxPQUFLQSxDQUFDLEtBQUssS0FBSyxHQUFHLFVBQVUsR0FBR0EsQ0FBQyxLQUFLLE1BQU0sR0FBRyxZQUFjLEdBQUcsS0FBSztJQUFBO0lBRTNGLElBQU1FLFVBQVUsR0FBRzdDLElBQUksQ0FBQzhDLFlBQVksaUJBQUFuSSxNQUFBLENBQ2pCaEUsVUFBVSxDQUFDcUosSUFBSSxDQUFDOEMsWUFBWSxDQUFDLHlCQUFBbkksTUFBQSxDQUFvQmhFLFVBQVUsQ0FBQ3FKLElBQUksQ0FBQytDLFFBQVEsQ0FBQyxzRUFDaEM7SUFFN0QsSUFBSUMsSUFBSSxrSEFBQXJJLE1BQUEsQ0FFcUNrSSxVQUFVLCtIQUFBbEksTUFBQSxDQUVIaEUsVUFBVSxDQUFDcUosSUFBSSxDQUFDK0MsUUFBUSxDQUFDLG1DQUFBcEksTUFBQSxDQUMvRHFGLElBQUksQ0FBQ2lELEtBQUssZ0RBQUF0SSxNQUFBLENBQWdEaEUsVUFBVSxDQUFDcUosSUFBSSxDQUFDaUQsS0FBSyxDQUFDLG9CQUFtQixFQUFFLDRCQUFBdEksTUFBQSxDQUNyR3FGLElBQUksQ0FBQ2tELEdBQUcsc0NBQUF2SSxNQUFBLENBQW9DaEUsVUFBVSxDQUFDcUosSUFBSSxDQUFDa0QsR0FBRyxDQUFDLFlBQVMsRUFBRSw4TUFBQXZJLE1BQUEsQ0FNekNoRSxVQUFVLENBQUNnSyxNQUFNLENBQUNYLElBQUksQ0FBQ21ELE1BQU0sQ0FBQyxDQUFDLGlOQUFBeEksTUFBQSxDQUkvQmhFLFVBQVUsQ0FBQ2dLLE1BQU0sQ0FBQ1gsSUFBSSxDQUFDb0QsS0FBSyxDQUFDQyxJQUFJLENBQUMsQ0FBQyx1TkFBQTFJLE1BQUEsQ0FJbkNoRSxVQUFVLENBQUNnSyxNQUFNLENBQUNYLElBQUksQ0FBQ29ELEtBQUssQ0FBQ0UsTUFBTSxDQUFDLENBQUMseU5BQUEzSSxNQUFBLENBSXJDaEUsVUFBVSxDQUFDZ0ssTUFBTSxDQUFDWCxJQUFJLENBQUNvRCxLQUFLLENBQUNHLE9BQU8sQ0FBQyxDQUFDLDRJQUlyRjtJQUVELElBQUl2RCxJQUFJLENBQUN3RCxpQkFBaUIsRUFBRTtNQUN4QlIsSUFBSSx5V0FBQXJJLE1BQUEsQ0FNK0NoRSxVQUFVLENBQUNxSixJQUFJLENBQUN3RCxpQkFBaUIsQ0FBQ3hKLElBQUksQ0FBQyw4RUFBQVcsTUFBQSxDQUN2Q2hFLFVBQVUsQ0FBQ3FKLElBQUksQ0FBQ3dELGlCQUFpQixDQUFDdkosSUFBSSxDQUFDLCtFQUFBVSxNQUFBLENBQ3RDaEUsVUFBVSxDQUFDZ0ssTUFBTSxDQUFDWCxJQUFJLENBQUN3RCxpQkFBaUIsQ0FBQ0MsV0FBVyxDQUFDLENBQUMsc0ZBR3pHO0lBQ0w7SUFFQSxJQUFJekQsSUFBSSxDQUFDMEQsUUFBUSxDQUFDckwsTUFBTSxHQUFHLENBQUMsRUFBRTtNQUMxQjJLLElBQUksMFVBQUFySSxNQUFBLENBTVVxRixJQUFJLENBQUMwRCxRQUFRLENBQUN4SSxHQUFHLENBQUMsVUFBQXlJLENBQUM7UUFBQSwySkFBQWhKLE1BQUEsQ0FFMkJoRSxVQUFVLENBQUNnTixDQUFDLENBQUMzSixJQUFJLENBQUMsdUZBQUFXLE1BQUEsQ0FDbEJoRSxVQUFVLENBQUNnTixDQUFDLENBQUMxSixJQUFJLENBQUM7TUFBQSxDQUVqRSxDQUFDLENBQUNxQixJQUFJLENBQUMsRUFBRSxDQUFDLHVFQUd0QjtJQUNMO0lBRUEsSUFBSTBFLElBQUksQ0FBQzRELGFBQWEsQ0FBQ3ZMLE1BQU0sR0FBRyxDQUFDLEVBQUU7TUFDL0IySyxJQUFJLGtVQUFBckksTUFBQSxDQU1VcUYsSUFBSSxDQUFDNEQsYUFBYSxDQUFDMUksR0FBRyxDQUFDLFVBQUEySSxDQUFDO1FBQUEsZ0VBQUFsSixNQUFBLENBQ0dtSixRQUFRLENBQUNELENBQUMsQ0FBQ3pLLEVBQUUsRUFBRSxFQUFFLENBQUMsd0NBQUF1QixNQUFBLENBQW1DK0gsV0FBVyxDQUFDbUIsQ0FBQyxDQUFDRSxNQUFNLENBQUMsbUZBQUFwSixNQUFBLENBQ3ZEaUksV0FBVyxDQUFDaUIsQ0FBQyxDQUFDRSxNQUFNLENBQUMsNEZBQUFwSixNQUFBLENBQ2hCaEUsVUFBVSxDQUFDa04sQ0FBQyxDQUFDRyxRQUFRLENBQUMscUZBQUFySixNQUFBLENBQzdCaEUsVUFBVSxDQUFDa04sQ0FBQyxDQUFDSSxTQUFTLENBQUMsQ0FBQ0MsV0FBVyxDQUFDLENBQUMscUZBQUF2SixNQUFBLENBQ3JDaEUsVUFBVSxDQUFDa04sQ0FBQyxDQUFDTSxJQUFJLENBQUM7TUFBQSxDQUcvRCxDQUFDLENBQUM3SSxJQUFJLENBQUMsRUFBRSxDQUFDLHVFQUd0QjtJQUNMLENBQUMsTUFBTTtNQUNIMEgsSUFBSSwwTEFJSDtJQUNMO0lBRUFBLElBQUksbVJBTUg7SUFFRGIsT0FBTyxDQUFDakwsU0FBUyxHQUFHOEwsSUFBSTtFQUM1QjtBQUVKLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUNqeUJGO0FBQ0E7QUFDQTtBQUNBO0FBSEEsSUFJTW9CLGdCQUFnQjtFQUNsQixTQUFBQSxpQkFBWW5HLFNBQVMsRUFBRTtJQUFBb0csZUFBQSxPQUFBRCxnQkFBQTtJQUNuQixJQUFJLENBQUNuRyxTQUFTLEdBQUdBLFNBQVM7SUFDMUIsSUFBSSxDQUFDcUcsSUFBSSxHQUFHLEVBQUU7SUFDZCxJQUFJLENBQUNDLFlBQVksR0FBRyxDQUFDO0lBQ3JCLElBQUksQ0FBQ0MsU0FBUyxHQUFHLEtBQUs7SUFDdEIsSUFBSSxDQUFDQyxRQUFRLEdBQUcsS0FBSztJQUNyQixJQUFJLENBQUM5TSxLQUFLLEdBQUcsQ0FBQztJQUNkLElBQUksQ0FBQytNLGlCQUFpQixHQUFHLENBQUMsQ0FBQztJQUMzQixJQUFJLENBQUNDLGNBQWMsR0FBRyxDQUFDLENBQUM7SUFFeEIsSUFBSSxDQUFDQyxJQUFJLENBQUMsQ0FBQztFQUNmO0VBQUMsT0FBQUMsWUFBQSxDQUFBVCxnQkFBQTtJQUFBN0QsR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUE0RixJQUFJQSxDQUFBLEVBQUc7TUFBQSxJQUFBRSxLQUFBO01BQ0g7TUFDQSxJQUFNQyxRQUFRLEdBQUcsSUFBSSxDQUFDOUcsU0FBUyxDQUFDdEYsT0FBTyxDQUFDcU0sVUFBVTtNQUNsRCxJQUFJRCxRQUFRLEVBQUU7UUFDVixJQUFJO1VBQ0EsSUFBSSxDQUFDVCxJQUFJLEdBQUdqSSxJQUFJLENBQUNDLEtBQUssQ0FBQ3lJLFFBQVEsQ0FBQztRQUNwQyxDQUFDLENBQUMsT0FBT3pFLENBQUMsRUFBRTtVQUNSMkUsT0FBTyxDQUFDNUUsS0FBSyxDQUFDLHNCQUFzQixFQUFFQyxDQUFDLENBQUM7VUFDeEM7UUFDSjtNQUNKOztNQUVBO01BQ0EsSUFBSSxDQUFDNEUsWUFBWSxHQUFHLElBQUksQ0FBQ2pILFNBQVMsQ0FBQzVHLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztNQUNyRSxJQUFJLENBQUM4TixPQUFPLEdBQUcsSUFBSSxDQUFDbEgsU0FBUyxDQUFDNUcsYUFBYSxDQUFDLHVCQUF1QixDQUFDO01BQ3BFLElBQUksQ0FBQytOLE9BQU8sR0FBRyxJQUFJLENBQUNuSCxTQUFTLENBQUM1RyxhQUFhLENBQUMsb0JBQW9CLENBQUM7TUFDakUsSUFBSSxDQUFDZ08sT0FBTyxHQUFHLElBQUksQ0FBQ3BILFNBQVMsQ0FBQzVHLGFBQWEsQ0FBQyxvQkFBb0IsQ0FBQztNQUNqRSxJQUFJLENBQUNpTyxTQUFTLEdBQUcsSUFBSSxDQUFDckgsU0FBUyxDQUFDakcsZ0JBQWdCLENBQUMscUJBQXFCLENBQUM7O01BRXZFO01BQ0EsSUFBSSxDQUFDMk0sY0FBYyxHQUFHLENBQUMsQ0FBQztNQUN4QixJQUFJLENBQUNZLGNBQWMsR0FBRyxDQUFDLENBQUM7TUFDeEIsSUFBSSxDQUFDQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUM7TUFDMUIsSUFBSSxDQUFDQyxnQkFBZ0IsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDO01BQzVCLElBQUksQ0FBQ0MsaUJBQWlCLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztNQUM3QixJQUFJLENBQUN6SCxTQUFTLENBQUNqRyxnQkFBZ0IsQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDbUIsT0FBTyxDQUFDLFVBQUF3TSxFQUFFLEVBQUk7UUFDbkUsSUFBTTNMLElBQUksR0FBRzJMLEVBQUUsQ0FBQ2hOLE9BQU8sQ0FBQ2lOLGFBQWE7UUFDckMsSUFBTUMsSUFBSSxHQUFHRixFQUFFLENBQUNoTixPQUFPLENBQUNtTixhQUFhO1FBQ3JDLElBQU12RixHQUFHLE1BQUE1RixNQUFBLENBQU1rTCxJQUFJLE9BQUFsTCxNQUFBLENBQUlYLElBQUksQ0FBRTtRQUM3QjhLLEtBQUksQ0FBQ0osaUJBQWlCLENBQUNuRSxHQUFHLENBQUMsR0FBR29GLEVBQUU7UUFDaENiLEtBQUksQ0FBQ1MsY0FBYyxDQUFDaEYsR0FBRyxDQUFDLEdBQUdvRixFQUFFLENBQUNoTixPQUFPLENBQUNvTixhQUFhLElBQUksRUFBRTtRQUN6RGpCLEtBQUksQ0FBQ1UsZ0JBQWdCLENBQUNqRixHQUFHLENBQUMsR0FBR29GLEVBQUUsQ0FBQ2hOLE9BQU8sQ0FBQ3FOLE9BQU8sS0FBSyxNQUFNOztRQUUxRDtRQUNBLElBQU1DLE1BQU0sR0FBR04sRUFBRSxDQUFDdE8sYUFBYSxDQUFDLFVBQVUsQ0FBQztRQUMzQyxJQUFJNE8sTUFBTSxFQUFFO1VBQ1IsSUFBTUMsS0FBSyxHQUFHRCxNQUFNLENBQUNwSyxXQUFXLENBQUNxSyxLQUFLLENBQUMsY0FBYyxDQUFDO1VBQ3RELElBQUlBLEtBQUssRUFBRTtZQUNQcEIsS0FBSSxDQUFDSCxjQUFjLENBQUNwRSxHQUFHLENBQUMsR0FBR3VELFFBQVEsQ0FBQ29DLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztVQUNqRDtRQUNKOztRQUVBO1FBQ0FwQixLQUFJLENBQUNZLGlCQUFpQixDQUFDbkYsR0FBRyxDQUFDLEdBQUd1RSxLQUFJLENBQUNxQixtQkFBbUIsQ0FBQyxDQUFDO01BQzVELENBQUMsQ0FBQzs7TUFFRjtNQUNBLElBQUksQ0FBQ0MsZUFBZSxHQUFHLENBQUMsQ0FBQztNQUN6QixJQUFJLENBQUNuSSxTQUFTLENBQUNqRyxnQkFBZ0IsQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDbUIsT0FBTyxDQUFDLFVBQUF3TSxFQUFFLEVBQUk7UUFDN0UsSUFBTTNMLElBQUksR0FBRzJMLEVBQUUsQ0FBQ2hOLE9BQU8sQ0FBQzBOLFFBQVE7UUFDaEMsSUFBTVIsSUFBSSxHQUFHRixFQUFFLENBQUNoTixPQUFPLENBQUMyTixRQUFRO1FBQ2hDLElBQU0vRixHQUFHLE1BQUE1RixNQUFBLENBQU1rTCxJQUFJLE9BQUFsTCxNQUFBLENBQUlYLElBQUksQ0FBRTtRQUM3QixJQUFNdU0sU0FBUyxHQUFHWixFQUFFLENBQUN0TyxhQUFhLENBQUMsMEJBQTBCLENBQUM7UUFDOUQsSUFBSWtQLFNBQVMsRUFBRTtVQUNYekIsS0FBSSxDQUFDc0IsZUFBZSxDQUFDN0YsR0FBRyxDQUFDLEdBQUc7WUFDeEJvRixFQUFFLEVBQUVZLFNBQVM7WUFDYkMsS0FBSyxFQUFFMUMsUUFBUSxDQUFDeUMsU0FBUyxDQUFDNU4sT0FBTyxDQUFDOE4sWUFBWSxDQUFDLElBQUksQ0FBQztZQUNwRDNKLEtBQUssRUFBRXlKLFNBQVMsQ0FBQ2xQLGFBQWEsQ0FBQyxtQ0FBbUMsQ0FBQztZQUNuRXFQLE1BQU0sRUFBRUgsU0FBUyxDQUFDbFAsYUFBYSxDQUFDLCtCQUErQixDQUFDO1lBQ2hFc1AsTUFBTSxFQUFFSixTQUFTLENBQUNsUCxhQUFhLENBQUMsR0FBRztVQUN2QyxDQUFDO1FBQ0w7TUFDSixDQUFDLENBQUM7O01BRUY7TUFDQSxJQUFJLElBQUksQ0FBQzhOLE9BQU8sRUFBRTtRQUNkLElBQUksQ0FBQ0EsT0FBTyxDQUFDbEcsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtRQUNuQyxJQUFJLENBQUNpRyxPQUFPLENBQUNsRyxLQUFLLENBQUMySCxPQUFPLEdBQUcsR0FBRztNQUNwQzs7TUFFQTtNQUNBLElBQUksSUFBSSxDQUFDMUIsWUFBWSxFQUFFO1FBQ25CLElBQUksQ0FBQ0EsWUFBWSxDQUFDaE8sU0FBUyxHQUFHLEVBQUU7TUFDcEM7O01BRUE7TUFDQSxJQUFJLENBQUMyUCxhQUFhLEdBQUcsS0FBSztNQUMxQixJQUFJLENBQUNDLFdBQVcsR0FBRyxJQUFJO01BQ3ZCLElBQUksQ0FBQ0MsY0FBYyxHQUFHLENBQUMsQ0FBQztNQUN4QixJQUFJLENBQUNDLE9BQU8sR0FBRyxLQUFLO01BQ3BCLElBQUksQ0FBQ0MsTUFBTSxHQUFHLElBQUk7TUFDbEIsSUFBSSxDQUFDQyxTQUFTLEdBQUcsSUFBSTtNQUNyQixJQUFJLENBQUNDLGNBQWMsR0FBRyxDQUNsQixnREFBZ0QsRUFDaEQsMENBQTBDLENBQzdDOztNQUVEO01BQ0EsSUFBTUMsT0FBTyxHQUFHOU4sS0FBSyxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDMEUsU0FBUyxDQUFDakcsZ0JBQWdCLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxDQUMvRXFQLElBQUksQ0FBQyxVQUFBMUIsRUFBRTtRQUFBLE9BQUlBLEVBQUUsQ0FBQ2hOLE9BQU8sQ0FBQ29OLGFBQWEsS0FBSyxNQUFNO01BQUEsRUFBQztNQUNwRCxJQUFJcUIsT0FBTyxFQUFFO1FBQ1QsSUFBSSxDQUFDRCxjQUFjLEdBQUcsQ0FBQyx3Q0FBd0MsQ0FBQztNQUNwRTtNQUVBLElBQUksQ0FBQ0csUUFBUSxHQUFHLElBQUk7TUFDcEIsSUFBSSxDQUFDQyxRQUFRLEdBQUcsQ0FBQyxDQUFDO01BQ2xCLElBQUksQ0FBQ0MsT0FBTyxHQUFHLElBQUksQ0FBQ3ZKLFNBQVMsQ0FBQzVHLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztNQUNoRSxJQUFJLENBQUNvUSxZQUFZLEdBQUcsSUFBSSxDQUFDeEosU0FBUyxDQUFDNUcsYUFBYSxDQUFDLHFCQUFxQixDQUFDO01BQ3ZFLElBQUksQ0FBQ3FRLFNBQVMsR0FBRyxJQUFJLENBQUN6SixTQUFTLENBQUM1RyxhQUFhLENBQUMsbUJBQW1CLENBQUM7O01BRWxFO01BQ0EsSUFBSSxDQUFDc1EsVUFBVSxDQUFDLENBQUM7O01BRWpCO01BQ0F4SSxVQUFVLENBQUM7UUFBQSxPQUFNMkYsS0FBSSxDQUFDOEMsSUFBSSxDQUFDLENBQUM7TUFBQSxHQUFFLEdBQUcsQ0FBQztJQUN0Qzs7SUFFQTtFQUFBO0lBQUFySCxHQUFBO0lBQUF2QixLQUFBLEVBRUEsU0FBQW1ILG1CQUFtQkEsQ0FBQSxFQUFHO01BQ2xCLE9BQU87UUFDSDBCLFFBQVEsRUFBRSxDQUFDO1FBQ1hDLFFBQVEsRUFBRSxDQUFDO1FBQ1hDLE9BQU8sRUFBRSxLQUFLO1FBQ2RDLE1BQU0sRUFBRSxDQUFDO1FBQ1QsYUFBVyxDQUFDO1FBQ1pDLFNBQVMsRUFBRSxDQUFDO1FBQ1pDLE9BQU8sRUFBRSxDQUFDO1FBQ1ZDLEtBQUssRUFBRSxDQUFDO1FBQ1JDLEtBQUssRUFBRSxDQUFDO1FBQ1JDLE9BQU8sRUFBRSxDQUFDO1FBQ1ZDLE1BQU0sRUFBRTtNQUNaLENBQUM7SUFDTDtFQUFDO0lBQUEvSCxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQXVKLHVCQUF1QkEsQ0FBQ0MsR0FBRyxFQUFFO01BQ3pCLFFBQVFBLEdBQUcsQ0FBQ0MsSUFBSTtRQUNaLEtBQUssT0FBTztVQUNSLElBQUksQ0FBQ0MsaUJBQWlCLENBQUMsQ0FBQztVQUN4QjtRQUFROztRQUVaLEtBQUssYUFBYTtVQUNkLElBQUksQ0FBQ0MseUJBQXlCLENBQUNILEdBQUcsQ0FBQztVQUNuQztRQUVKLEtBQUssUUFBUTtVQUNULElBQUksQ0FBQ0ksU0FBUyxDQUFDSixHQUFHLENBQUNLLE1BQU0sRUFBRUwsR0FBRyxDQUFDTSxVQUFVLEVBQUUsV0FBVyxFQUFFTixHQUFHLENBQUNPLFFBQVEsSUFBSSxDQUFDLENBQUM7VUFDMUU7UUFFSixLQUFLLFlBQVk7VUFDYixJQUFJUCxHQUFHLENBQUNRLGNBQWMsS0FBS0MsU0FBUyxJQUFJVCxHQUFHLENBQUNRLGNBQWMsSUFBSSxDQUFDLEVBQUU7WUFDN0QsSUFBSSxDQUFDSixTQUFTLENBQUNKLEdBQUcsQ0FBQ0ssTUFBTSxFQUFFTCxHQUFHLENBQUNNLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1VBQzdEO1VBQ0E7UUFFSixLQUFLLGFBQWE7VUFDZCxJQUFJTixHQUFHLENBQUNRLGNBQWMsS0FBS0MsU0FBUyxJQUFJVCxHQUFHLENBQUNRLGNBQWMsSUFBSSxDQUFDLEVBQUU7WUFDN0QsSUFBSSxDQUFDSixTQUFTLENBQUNKLEdBQUcsQ0FBQ0ssTUFBTSxFQUFFTCxHQUFHLENBQUNNLFVBQVUsRUFBRSxVQUFVLEVBQUUsQ0FBQyxDQUFDO1VBQzdEO1VBQ0E7UUFFSixLQUFLLGNBQWM7VUFDZixJQUFJLENBQUNGLFNBQVMsQ0FBQ0osR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxFQUFFLFNBQVMsRUFBRSxLQUFLLENBQUM7VUFDNUQ7UUFFSixLQUFLLFFBQVE7VUFDVDtVQUNBLElBQUlOLEdBQUcsQ0FBQ1UsUUFBUSxJQUFJVixHQUFHLENBQUNXLFlBQVksRUFBRTtZQUNsQyxJQUFNNUksR0FBRyxNQUFBNUYsTUFBQSxDQUFNNk4sR0FBRyxDQUFDVyxZQUFZLE9BQUF4TyxNQUFBLENBQUk2TixHQUFHLENBQUNVLFFBQVEsQ0FBRTtZQUNqRCxJQUFJLElBQUksQ0FBQ3hELGlCQUFpQixDQUFDbkYsR0FBRyxDQUFDLElBQUksSUFBSSxDQUFDbUYsaUJBQWlCLENBQUNuRixHQUFHLENBQUMsQ0FBQzBILFNBQVMsR0FBRyxDQUFDLEVBQUU7Y0FDMUUsSUFBSSxDQUFDdkMsaUJBQWlCLENBQUNuRixHQUFHLENBQUMsQ0FBQzBILFNBQVMsR0FBRyxDQUFDO1lBQzdDO1VBQ0o7VUFDQTtRQUVKLEtBQUssaUJBQWlCO1VBQ2xCLElBQUksQ0FBQ21CLHlCQUF5QixDQUFDWixHQUFHLENBQUM7VUFDbkM7UUFFSixLQUFLLE9BQU87VUFDUixJQUFJLENBQUNhLGdCQUFnQixDQUFDYixHQUFHLENBQUNLLE1BQU0sRUFBRUwsR0FBRyxDQUFDTSxVQUFVLENBQUM7VUFDakQ7TUFDUjtNQUVBLElBQUksQ0FBQ1Esb0JBQW9CLENBQUMsQ0FBQztJQUMvQjtFQUFDO0lBQUEvSSxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQTJKLHlCQUF5QkEsQ0FBQ0gsR0FBRyxFQUFFO01BQzNCLFFBQVFBLEdBQUcsQ0FBQ2UsT0FBTztRQUNmLEtBQUssY0FBYztVQUNmLElBQUlmLEdBQUcsQ0FBQ0ssTUFBTSxJQUFJTCxHQUFHLENBQUNNLFVBQVUsRUFBRTtZQUM5QixJQUFJLENBQUNGLFNBQVMsQ0FBQ0osR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxFQUFFLFVBQVUsRUFBRU4sR0FBRyxDQUFDZ0IsVUFBVSxJQUFJLENBQUMsQ0FBQztVQUMvRTtVQUNBO1FBQ0osS0FBSyxlQUFlO1VBQ2hCLElBQUloQixHQUFHLENBQUNpQixPQUFPLEVBQUU7WUFDYixJQUFNQyxPQUFPLEdBQUdsQixHQUFHLENBQUNpQixPQUFPLENBQUNqUSxJQUFJLENBQUMsVUFBQTBDLENBQUM7Y0FBQSxPQUFJQSxDQUFDLENBQUN5TixTQUFTO1lBQUEsRUFBQztZQUNsRCxJQUFJRCxPQUFPLEVBQUU7Y0FDVCxJQUFJLENBQUNkLFNBQVMsQ0FBQ2MsT0FBTyxDQUFDMVAsSUFBSSxFQUFFMFAsT0FBTyxDQUFDN0QsSUFBSSxFQUFFLFVBQVUsRUFBRTJDLEdBQUcsQ0FBQ29CLFdBQVcsSUFBSSxDQUFDLENBQUM7WUFDaEY7VUFDSixDQUFDLE1BQU0sSUFBSXBCLEdBQUcsQ0FBQ0ssTUFBTSxFQUFFO1lBQ25CLElBQUksQ0FBQ0QsU0FBUyxDQUFDSixHQUFHLENBQUNLLE1BQU0sRUFBRUwsR0FBRyxDQUFDTSxVQUFVLEVBQUUsVUFBVSxFQUFFTixHQUFHLENBQUNvQixXQUFXLElBQUksQ0FBQyxDQUFDO1VBQ2hGO1VBQ0E7UUFDSixLQUFLLE1BQU07VUFDUCxJQUFJcEIsR0FBRyxDQUFDSyxNQUFNLElBQUlMLEdBQUcsQ0FBQ00sVUFBVSxFQUFFO1lBQzlCLElBQUksQ0FBQ0YsU0FBUyxDQUFDSixHQUFHLENBQUNLLE1BQU0sRUFBRUwsR0FBRyxDQUFDTSxVQUFVLEVBQUUsU0FBUyxFQUFFLElBQUksQ0FBQztVQUMvRDtVQUNBO1FBQ0osS0FBSyxNQUFNO1VBQ1AsSUFBSU4sR0FBRyxDQUFDSyxNQUFNLElBQUlMLEdBQUcsQ0FBQ00sVUFBVSxFQUFFO1lBQzlCLElBQUksQ0FBQ0YsU0FBUyxDQUFDSixHQUFHLENBQUNLLE1BQU0sRUFBRUwsR0FBRyxDQUFDTSxVQUFVLEVBQUUsUUFBUSxFQUFFTixHQUFHLENBQUNxQixTQUFTLElBQUksQ0FBQyxDQUFDO1VBQzVFO1VBQ0E7UUFDSixLQUFLLGNBQWM7VUFDZixJQUFJckIsR0FBRyxDQUFDc0IsTUFBTSxJQUFJdEIsR0FBRyxDQUFDdUIsVUFBVSxFQUFFO1lBQzlCLElBQUksQ0FBQ25CLFNBQVMsQ0FBQ0osR0FBRyxDQUFDc0IsTUFBTSxFQUFFdEIsR0FBRyxDQUFDdUIsVUFBVSxFQUFFLFNBQVMsRUFBRXZCLEdBQUcsQ0FBQ3dCLFlBQVksSUFBSSxDQUFDLENBQUM7VUFDaEY7VUFDQTtRQUNKLEtBQUssV0FBVztVQUNaLElBQUl4QixHQUFHLENBQUNzQixNQUFNLElBQUl0QixHQUFHLENBQUN1QixVQUFVLEVBQUU7WUFDOUIsSUFBSSxDQUFDRSxpQkFBaUIsQ0FBQ3pCLEdBQUcsQ0FBQ3NCLE1BQU0sRUFBRXRCLEdBQUcsQ0FBQ3VCLFVBQVUsRUFBRXZCLEdBQUcsQ0FBQzBCLEtBQUssRUFBRTFCLEdBQUcsQ0FBQzJCLFlBQVksSUFBSSxDQUFDLENBQUM7VUFDeEY7VUFDQTtRQUNKLEtBQUssWUFBWTtVQUNiLElBQUkzQixHQUFHLENBQUN1QixVQUFVLEVBQUU7WUFDaEIsSUFBSSxDQUFDSyxxQkFBcUIsQ0FBQzVCLEdBQUcsQ0FBQ3VCLFVBQVUsRUFBRXZCLEdBQUcsQ0FBQzBCLEtBQUssRUFBRTFCLEdBQUcsQ0FBQzJCLFlBQVksSUFBSSxDQUFDLENBQUM7VUFDaEY7VUFDQTtRQUNKLEtBQUssU0FBUztVQUNWLElBQUkzQixHQUFHLENBQUNzQixNQUFNLElBQUl0QixHQUFHLENBQUN1QixVQUFVLEVBQUU7WUFDOUIsSUFBSSxDQUFDbkIsU0FBUyxDQUFDSixHQUFHLENBQUNzQixNQUFNLEVBQUV0QixHQUFHLENBQUN1QixVQUFVLEVBQUUsV0FBVyxFQUFFdkIsR0FBRyxDQUFDNkIsWUFBWSxJQUFJLENBQUMsQ0FBQztVQUNsRjtVQUNBO1FBQ0osS0FBSyxlQUFlO1VBQ2hCLElBQUk3QixHQUFHLENBQUNLLE1BQU0sSUFBSUwsR0FBRyxDQUFDTSxVQUFVLEVBQUU7WUFDOUIsSUFBSSxDQUFDRixTQUFTLENBQUNKLEdBQUcsQ0FBQ0ssTUFBTSxFQUFFTCxHQUFHLENBQUNNLFVBQVUsRUFBRSxXQUFXLEVBQUVOLEdBQUcsQ0FBQzhCLFlBQVksSUFBSSxDQUFDLENBQUM7WUFDOUUsSUFBSSxDQUFDMUIsU0FBUyxDQUFDSixHQUFHLENBQUNLLE1BQU0sRUFBRUwsR0FBRyxDQUFDTSxVQUFVLEVBQUUsU0FBUyxFQUFFTixHQUFHLENBQUM4QixZQUFZLElBQUksQ0FBQyxDQUFDO1VBQ2hGO1VBQ0E7UUFDSixLQUFLLGdCQUFnQjtVQUNqQixJQUFJOUIsR0FBRyxDQUFDK0IsY0FBYyxJQUFJL0IsR0FBRyxDQUFDK0IsY0FBYyxHQUFHLENBQUMsSUFBSS9CLEdBQUcsQ0FBQ3NCLE1BQU0sRUFBRTtZQUM1RCxJQUFJLENBQUNsQixTQUFTLENBQUNKLEdBQUcsQ0FBQ3NCLE1BQU0sRUFBRXRCLEdBQUcsQ0FBQ3VCLFVBQVUsRUFBRSxVQUFVLEVBQUV2QixHQUFHLENBQUMrQixjQUFjLENBQUM7VUFDOUU7VUFDQTtRQUNKLEtBQUssaUJBQWlCO1VBQ2xCO1VBQ0EsSUFBSS9CLEdBQUcsQ0FBQ0ssTUFBTSxJQUFJTCxHQUFHLENBQUNNLFVBQVUsRUFBRTtZQUM5QixJQUFNMEIsSUFBSSxNQUFBN1AsTUFBQSxDQUFNNk4sR0FBRyxDQUFDTSxVQUFVLE9BQUFuTyxNQUFBLENBQUk2TixHQUFHLENBQUNLLE1BQU0sQ0FBRTtZQUM5QztVQUNKO1VBQ0E7TUFDUjtJQUNKO0VBQUM7SUFBQXRJLEdBQUE7SUFBQXZCLEtBQUEsRUFFRCxTQUFBb0sseUJBQXlCQSxDQUFDWixHQUFHLEVBQUU7TUFBQSxJQUFBaUMsTUFBQTtNQUMzQixJQUFJLENBQUNqQyxHQUFHLENBQUNrQyxVQUFVLEVBQUU7TUFFckIsUUFBUWxDLEdBQUcsQ0FBQ2tDLFVBQVU7UUFDbEIsS0FBSyxlQUFlO1VBQ2hCLElBQUksQ0FBQzlCLFNBQVMsQ0FBQ0osR0FBRyxDQUFDbUMsV0FBVyxFQUFFbkMsR0FBRyxDQUFDb0MsZUFBZSxFQUFFLFNBQVMsRUFBRXBDLEdBQUcsQ0FBQ3FDLFlBQVksSUFBSSxDQUFDLENBQUM7VUFDdEY7UUFDSixLQUFLLFdBQVc7VUFDWixJQUFJckMsR0FBRyxDQUFDc0MsU0FBUyxFQUFFO1lBQ2YsSUFBTS9CLFFBQVEsR0FBR1AsR0FBRyxDQUFDMkIsWUFBWSxJQUFJLENBQUM7WUFDdEMzQixHQUFHLENBQUNzQyxTQUFTLENBQUMzUixPQUFPLENBQUMsVUFBQXNQLElBQUksRUFBSTtjQUMxQixJQUFNc0MsU0FBUyxHQUFHTixNQUFJLENBQUNPLG1CQUFtQixDQUFDdkMsSUFBSSxDQUFDO2NBQ2hELElBQUlzQyxTQUFTLEVBQUU7Z0JBQ1hOLE1BQUksQ0FBQzdCLFNBQVMsQ0FBQ0osR0FBRyxDQUFDbUMsV0FBVyxFQUFFbkMsR0FBRyxDQUFDb0MsZUFBZSxFQUFFRyxTQUFTLEVBQUVoQyxRQUFRLENBQUM7Y0FDN0U7WUFDSixDQUFDLENBQUM7VUFDTjtVQUNBO1FBQ0osS0FBSyxZQUFZO1VBQ2IsSUFBSVAsR0FBRyxDQUFDSyxNQUFNLEVBQUU7WUFDWixJQUFJLENBQUNELFNBQVMsQ0FBQ0osR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxFQUFFLFFBQVEsRUFBRU4sR0FBRyxDQUFDcUIsU0FBUyxJQUFJLENBQUMsQ0FBQztVQUM1RTtVQUNBO1FBQ0osS0FBSyxhQUFhO1VBQ2QsSUFBSSxDQUFDakIsU0FBUyxDQUFDSixHQUFHLENBQUNtQyxXQUFXLEVBQUVuQyxHQUFHLENBQUNvQyxlQUFlLEVBQUUsU0FBUyxFQUFFcEMsR0FBRyxDQUFDeUMsYUFBYSxJQUFJLENBQUMsQ0FBQztVQUN2RjtRQUNKLEtBQUssZ0JBQWdCO1VBQ2pCLElBQUl6QyxHQUFHLENBQUNtQyxXQUFXLElBQUluQyxHQUFHLENBQUNvQyxlQUFlLEVBQUU7WUFDeEMsSUFBTXJLLEdBQUcsTUFBQTVGLE1BQUEsQ0FBTTZOLEdBQUcsQ0FBQ29DLGVBQWUsT0FBQWpRLE1BQUEsQ0FBSTZOLEdBQUcsQ0FBQ21DLFdBQVcsQ0FBRTtZQUN2RCxJQUFJLElBQUksQ0FBQ2pGLGlCQUFpQixDQUFDbkYsR0FBRyxDQUFDLEVBQUU7Y0FDN0IsSUFBSSxDQUFDbUYsaUJBQWlCLENBQUNuRixHQUFHLENBQUMsQ0FBQzBILFNBQVMsSUFBS08sR0FBRyxDQUFDMEMsVUFBVSxJQUFJLENBQUU7WUFDbEU7VUFDSjtVQUNBO1FBQ0osS0FBSyxpQkFBaUI7VUFDbEIsSUFBSSxDQUFDdEMsU0FBUyxDQUFDSixHQUFHLENBQUNtQyxXQUFXLEVBQUVuQyxHQUFHLENBQUNvQyxlQUFlLEVBQUUsUUFBUSxFQUFFLENBQUMsQ0FBQztVQUNqRTtNQUNSO0lBQ0o7RUFBQztJQUFBckssR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUFnTSxtQkFBbUJBLENBQUN2QyxJQUFJLEVBQUU7TUFDdEIsUUFBUUEsSUFBSTtRQUNSLEtBQUssUUFBUTtVQUFFLE9BQU8sT0FBTztRQUM3QixLQUFLLE9BQU87VUFBRSxPQUFPLE9BQU87UUFDNUIsS0FBSyxPQUFPO1VBQUUsT0FBTyxTQUFTO1FBQzlCLEtBQUssTUFBTTtVQUFFLE9BQU8sUUFBUTtRQUM1QjtVQUFTLE9BQU8sSUFBSTtNQUN4QjtJQUNKO0VBQUM7SUFBQWxJLEdBQUE7SUFBQXZCLEtBQUEsRUFFRCxTQUFBaUwsaUJBQWlCQSxDQUFDNUQsUUFBUSxFQUFFOEUsUUFBUSxFQUFFakIsS0FBSyxFQUFFbkIsUUFBUSxFQUFFO01BQ25ELElBQUksQ0FBQ21CLEtBQUssRUFBRTtNQUNaLElBQU0zSixHQUFHLE1BQUE1RixNQUFBLENBQU13USxRQUFRLE9BQUF4USxNQUFBLENBQUkwTCxRQUFRLENBQUU7TUFDckMsSUFBTWxMLENBQUMsR0FBRyxJQUFJLENBQUN1SyxpQkFBaUIsQ0FBQ25GLEdBQUcsQ0FBQztNQUNyQyxJQUFJLENBQUNwRixDQUFDLEVBQUU7TUFFUixJQUFJK08sS0FBSyxDQUFDa0IsTUFBTSxJQUFJbEIsS0FBSyxDQUFDa0IsTUFBTSxHQUFHLENBQUMsRUFBRWpRLENBQUMsQ0FBQ2dOLEtBQUssR0FBRzVNLElBQUksQ0FBQzhQLEdBQUcsQ0FBQ2xRLENBQUMsQ0FBQ2dOLEtBQUssRUFBRVksUUFBUSxDQUFDO01BQzNFLElBQUltQixLQUFLLENBQUN2UyxLQUFLLElBQUl1UyxLQUFLLENBQUN2UyxLQUFLLEdBQUcsQ0FBQyxFQUFFd0QsQ0FBQyxDQUFDaU4sS0FBSyxHQUFHN00sSUFBSSxDQUFDOFAsR0FBRyxDQUFDbFEsQ0FBQyxDQUFDaU4sS0FBSyxFQUFFVyxRQUFRLENBQUM7TUFDekUsSUFBSW1CLEtBQUssQ0FBQ3RTLEtBQUssSUFBSXNTLEtBQUssQ0FBQ3RTLEtBQUssR0FBRyxDQUFDLEVBQUV1RCxDQUFDLENBQUNrTixPQUFPLEdBQUc5TSxJQUFJLENBQUM4UCxHQUFHLENBQUNsUSxDQUFDLENBQUNrTixPQUFPLEVBQUVVLFFBQVEsQ0FBQztNQUM3RSxJQUFJbUIsS0FBSyxDQUFDclMsSUFBSSxJQUFJcVMsS0FBSyxDQUFDclMsSUFBSSxHQUFHLENBQUMsRUFBRXNELENBQUMsQ0FBQ21OLE1BQU0sR0FBRy9NLElBQUksQ0FBQzhQLEdBQUcsQ0FBQ2xRLENBQUMsQ0FBQ21OLE1BQU0sRUFBRVMsUUFBUSxDQUFDO0lBQzdFO0VBQUM7SUFBQXhJLEdBQUE7SUFBQXZCLEtBQUEsRUFFRCxTQUFBb0wscUJBQXFCQSxDQUFDZSxRQUFRLEVBQUVqQixLQUFLLEVBQUVuQixRQUFRLEVBQUU7TUFDN0MsSUFBSSxDQUFDbUIsS0FBSyxFQUFFO01BQ1osU0FBQW9CLEVBQUEsTUFBQUMsWUFBQSxHQUFrQkMsTUFBTSxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDL0YsaUJBQWlCLENBQUMsRUFBQTRGLEVBQUEsR0FBQUMsWUFBQSxDQUFBbFQsTUFBQSxFQUFBaVQsRUFBQSxJQUFFO1FBQWxELElBQU0vSyxHQUFHLEdBQUFnTCxZQUFBLENBQUFELEVBQUE7UUFDVixJQUFJL0ssR0FBRyxDQUFDbUwsVUFBVSxDQUFDUCxRQUFRLEdBQUcsR0FBRyxDQUFDLEVBQUU7VUFDaEMsSUFBTWhRLENBQUMsR0FBRyxJQUFJLENBQUN1SyxpQkFBaUIsQ0FBQ25GLEdBQUcsQ0FBQztVQUNyQyxJQUFJMkosS0FBSyxDQUFDa0IsTUFBTSxJQUFJbEIsS0FBSyxDQUFDa0IsTUFBTSxHQUFHLENBQUMsRUFBRWpRLENBQUMsQ0FBQ2dOLEtBQUssR0FBRzVNLElBQUksQ0FBQzhQLEdBQUcsQ0FBQ2xRLENBQUMsQ0FBQ2dOLEtBQUssRUFBRVksUUFBUSxDQUFDO1VBQzNFLElBQUltQixLQUFLLENBQUN2UyxLQUFLLElBQUl1UyxLQUFLLENBQUN2UyxLQUFLLEdBQUcsQ0FBQyxFQUFFd0QsQ0FBQyxDQUFDaU4sS0FBSyxHQUFHN00sSUFBSSxDQUFDOFAsR0FBRyxDQUFDbFEsQ0FBQyxDQUFDaU4sS0FBSyxFQUFFVyxRQUFRLENBQUM7VUFDekUsSUFBSW1CLEtBQUssQ0FBQ3RTLEtBQUssSUFBSXNTLEtBQUssQ0FBQ3RTLEtBQUssR0FBRyxDQUFDLEVBQUV1RCxDQUFDLENBQUNrTixPQUFPLEdBQUc5TSxJQUFJLENBQUM4UCxHQUFHLENBQUNsUSxDQUFDLENBQUNrTixPQUFPLEVBQUVVLFFBQVEsQ0FBQztVQUM3RSxJQUFJbUIsS0FBSyxDQUFDclMsSUFBSSxJQUFJcVMsS0FBSyxDQUFDclMsSUFBSSxHQUFHLENBQUMsRUFBRXNELENBQUMsQ0FBQ21OLE1BQU0sR0FBRy9NLElBQUksQ0FBQzhQLEdBQUcsQ0FBQ2xRLENBQUMsQ0FBQ21OLE1BQU0sRUFBRVMsUUFBUSxDQUFDO1FBQzdFO01BQ0o7SUFDSjtFQUFDO0lBQUF4SSxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQTRKLFNBQVNBLENBQUN2QyxRQUFRLEVBQUU4RSxRQUFRLEVBQUVKLFNBQVMsRUFBRS9MLEtBQUssRUFBRTtNQUM1QyxJQUFNdUIsR0FBRyxNQUFBNUYsTUFBQSxDQUFNd1EsUUFBUSxPQUFBeFEsTUFBQSxDQUFJMEwsUUFBUSxDQUFFO01BQ3JDLElBQUksQ0FBQyxJQUFJLENBQUNYLGlCQUFpQixDQUFDbkYsR0FBRyxDQUFDLEVBQUU7TUFDbEMsSUFBSSxDQUFDbUYsaUJBQWlCLENBQUNuRixHQUFHLENBQUMsQ0FBQ3dLLFNBQVMsQ0FBQyxHQUFHL0wsS0FBSztJQUNsRDtFQUFDO0lBQUF1QixHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQXFLLGdCQUFnQkEsQ0FBQ2hELFFBQVEsRUFBRThFLFFBQVEsRUFBRTtNQUNqQyxJQUFNNUssR0FBRyxNQUFBNUYsTUFBQSxDQUFNd1EsUUFBUSxPQUFBeFEsTUFBQSxDQUFJMEwsUUFBUSxDQUFFO01BQ3JDLElBQUksSUFBSSxDQUFDWCxpQkFBaUIsQ0FBQ25GLEdBQUcsQ0FBQyxFQUFFO1FBQzdCLElBQUksQ0FBQ21GLGlCQUFpQixDQUFDbkYsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDNEYsbUJBQW1CLENBQUMsQ0FBQztNQUM1RDtJQUNKO0VBQUM7SUFBQTVGLEdBQUE7SUFBQXZCLEtBQUEsRUFFRCxTQUFBMEosaUJBQWlCQSxDQUFBLEVBQUc7TUFDaEIsU0FBQWlELEdBQUEsTUFBQUMsYUFBQSxHQUFrQkosTUFBTSxDQUFDQyxJQUFJLENBQUMsSUFBSSxDQUFDL0YsaUJBQWlCLENBQUMsRUFBQWlHLEdBQUEsR0FBQUMsYUFBQSxDQUFBdlQsTUFBQSxFQUFBc1QsR0FBQSxJQUFFO1FBQWxELElBQU1wTCxHQUFHLEdBQUFxTCxhQUFBLENBQUFELEdBQUE7UUFDVixJQUFNeFEsQ0FBQyxHQUFHLElBQUksQ0FBQ3VLLGlCQUFpQixDQUFDbkYsR0FBRyxDQUFDO1FBQ3JDO1FBQ0E7UUFDQSxJQUFJcEYsQ0FBQyxDQUFDNk0sTUFBTSxHQUFHLENBQUMsSUFBSTdNLENBQUMsQ0FBQzZNLE1BQU0sR0FBRyxHQUFHLEVBQUU3TSxDQUFDLENBQUM2TSxNQUFNLEVBQUU7UUFDOUMsSUFBSTdNLENBQUMsYUFBVSxHQUFHLENBQUMsSUFBSUEsQ0FBQyxhQUFVLEdBQUcsR0FBRyxFQUFFQSxDQUFDLGFBQVUsRUFBRTtRQUN2RCxJQUFJQSxDQUFDLENBQUM4TSxTQUFTLEdBQUcsQ0FBQyxJQUFJOU0sQ0FBQyxDQUFDOE0sU0FBUyxHQUFHLEdBQUcsRUFBRTlNLENBQUMsQ0FBQzhNLFNBQVMsRUFBRTtRQUN2RCxJQUFJOU0sQ0FBQyxDQUFDK00sT0FBTyxHQUFHLENBQUMsSUFBSS9NLENBQUMsQ0FBQytNLE9BQU8sR0FBRyxHQUFHLEVBQUUvTSxDQUFDLENBQUMrTSxPQUFPLEVBQUU7UUFDakQsSUFBSS9NLENBQUMsQ0FBQ2dOLEtBQUssR0FBRyxDQUFDLElBQUloTixDQUFDLENBQUNnTixLQUFLLEdBQUcsR0FBRyxFQUFFaE4sQ0FBQyxDQUFDZ04sS0FBSyxFQUFFO1FBQzNDLElBQUloTixDQUFDLENBQUNpTixLQUFLLEdBQUcsQ0FBQyxJQUFJak4sQ0FBQyxDQUFDaU4sS0FBSyxHQUFHLEdBQUcsRUFBRWpOLENBQUMsQ0FBQ2lOLEtBQUssRUFBRTtRQUMzQyxJQUFJak4sQ0FBQyxDQUFDa04sT0FBTyxHQUFHLENBQUMsSUFBSWxOLENBQUMsQ0FBQ2tOLE9BQU8sR0FBRyxHQUFHLEVBQUVsTixDQUFDLENBQUNrTixPQUFPLEVBQUU7UUFDakQsSUFBSWxOLENBQUMsQ0FBQ21OLE1BQU0sR0FBRyxDQUFDLElBQUluTixDQUFDLENBQUNtTixNQUFNLEdBQUcsR0FBRyxFQUFFbk4sQ0FBQyxDQUFDbU4sTUFBTSxFQUFFO01BQ2xEO01BQ0EsSUFBSSxDQUFDZ0Isb0JBQW9CLENBQUMsQ0FBQztJQUMvQjtFQUFDO0lBQUEvSSxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQXNLLG9CQUFvQkEsQ0FBQSxFQUFHO01BQ25CLFNBQUF1QyxHQUFBLE1BQUFDLGFBQUEsR0FBa0JOLE1BQU0sQ0FBQ0MsSUFBSSxDQUFDLElBQUksQ0FBQy9GLGlCQUFpQixDQUFDLEVBQUFtRyxHQUFBLEdBQUFDLGFBQUEsQ0FBQXpULE1BQUEsRUFBQXdULEdBQUEsSUFBRTtRQUFsRCxJQUFNdEwsR0FBRyxHQUFBdUwsYUFBQSxDQUFBRCxHQUFBO1FBQ1YsSUFBSSxDQUFDRSxpQkFBaUIsQ0FBQ3hMLEdBQUcsQ0FBQztNQUMvQjtJQUNKO0VBQUM7SUFBQUEsR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUErTSxpQkFBaUJBLENBQUN4TCxHQUFHLEVBQUU7TUFDbkIsSUFBTW9GLEVBQUUsR0FBRyxJQUFJLENBQUNqQixpQkFBaUIsQ0FBQ25FLEdBQUcsQ0FBQztNQUN0QyxJQUFJLENBQUNvRixFQUFFLEVBQUU7TUFFVCxJQUFNMUgsU0FBUyxHQUFHMEgsRUFBRSxDQUFDdE8sYUFBYSxDQUFDLGVBQWUsQ0FBQztNQUNuRCxJQUFJLENBQUM0RyxTQUFTLEVBQUU7TUFFaEIsSUFBTTlDLENBQUMsR0FBRyxJQUFJLENBQUN1SyxpQkFBaUIsQ0FBQ25GLEdBQUcsQ0FBQztNQUNyQyxJQUFNeUwsS0FBSyxHQUFHLEVBQUU7O01BRWhCO01BQ0EsSUFBSTdRLENBQUMsQ0FBQzBNLFFBQVEsR0FBRyxDQUFDLEVBQUVtRSxLQUFLLENBQUM3UCxJQUFJLENBQUM7UUFBRThQLElBQUksRUFBRSxTQUFTO1FBQUVDLEdBQUcsRUFBRSxvQkFBb0I7UUFBRW5PLEtBQUssRUFBRTtNQUFhLENBQUMsQ0FBQztNQUNuRyxJQUFJNUMsQ0FBQyxDQUFDMk0sUUFBUSxHQUFHLENBQUMsRUFBRWtFLEtBQUssQ0FBQzdQLElBQUksQ0FBQztRQUFFOFAsSUFBSSxFQUFFLHFCQUFxQjtRQUFFQyxHQUFHLEVBQUUscUJBQXFCO1FBQUVuTyxLQUFLLEVBQUU7TUFBUSxDQUFDLENBQUM7TUFDM0csSUFBSTVDLENBQUMsQ0FBQzRNLE9BQU8sRUFBRWlFLEtBQUssQ0FBQzdQLElBQUksQ0FBQztRQUFFOFAsSUFBSSxFQUFFLFVBQVU7UUFBRUMsR0FBRyxFQUFFLG1CQUFtQjtRQUFFbk8sS0FBSyxFQUFFO01BQVUsQ0FBQyxDQUFDO01BQzNGLElBQUk1QyxDQUFDLENBQUM2TSxNQUFNLEdBQUcsQ0FBQyxFQUFFZ0UsS0FBSyxDQUFDN1AsSUFBSSxDQUFDO1FBQUU4UCxJQUFJLEVBQUUsZUFBZTtRQUFFQyxHQUFHLEVBQUUsbUJBQW1CO1FBQUVuTyxLQUFLLEVBQUU7TUFBUyxDQUFDLENBQUM7O01BRWxHO01BQ0EsSUFBSTVDLENBQUMsYUFBVSxHQUFHLENBQUMsRUFBRTZRLEtBQUssQ0FBQzdQLElBQUksQ0FBQztRQUFFOFAsSUFBSSxFQUFFLGVBQWU7UUFBRUMsR0FBRyxFQUFFLHNCQUFzQjtRQUFFbk8sS0FBSyxFQUFFO01BQVUsQ0FBQyxDQUFDO01BQ3pHLElBQUk1QyxDQUFDLENBQUM4TSxTQUFTLEdBQUcsQ0FBQyxFQUFFK0QsS0FBSyxDQUFDN1AsSUFBSSxDQUFDO1FBQUU4UCxJQUFJLEVBQUUsY0FBYztRQUFFQyxHQUFHLEVBQUUsc0JBQXNCO1FBQUVuTyxLQUFLLEVBQUU7TUFBUyxDQUFDLENBQUM7TUFDdkcsSUFBSTVDLENBQUMsQ0FBQytNLE9BQU8sR0FBRyxDQUFDLEVBQUU4RCxLQUFLLENBQUM3UCxJQUFJLENBQUM7UUFBRThQLElBQUksRUFBRSxpQkFBaUI7UUFBRUMsR0FBRyxFQUFFLHNCQUFzQjtRQUFFbk8sS0FBSyxFQUFFO01BQVUsQ0FBQyxDQUFDO01BQ3pHLElBQUk1QyxDQUFDLENBQUNnTixLQUFLLEdBQUcsQ0FBQyxFQUFFNkQsS0FBSyxDQUFDN1AsSUFBSSxDQUFDO1FBQUU4UCxJQUFJLEVBQUUsZ0JBQWdCO1FBQUVDLEdBQUcsRUFBRSxxQkFBcUI7UUFBRW5PLEtBQUssRUFBRTtNQUFVLENBQUMsQ0FBQztNQUNyRyxJQUFJNUMsQ0FBQyxDQUFDaU4sS0FBSyxHQUFHLENBQUMsRUFBRTRELEtBQUssQ0FBQzdQLElBQUksQ0FBQztRQUFFOFAsSUFBSSxFQUFFLFNBQVM7UUFBRUMsR0FBRyxFQUFFLHFCQUFxQjtRQUFFbk8sS0FBSyxFQUFFO01BQVcsQ0FBQyxDQUFDO01BQy9GLElBQUk1QyxDQUFDLENBQUNrTixPQUFPLEdBQUcsQ0FBQyxFQUFFMkQsS0FBSyxDQUFDN1AsSUFBSSxDQUFDO1FBQUU4UCxJQUFJLEVBQUUsWUFBWTtRQUFFQyxHQUFHLEVBQUUsdUJBQXVCO1FBQUVuTyxLQUFLLEVBQUU7TUFBVyxDQUFDLENBQUM7TUFDdEcsSUFBSTVDLENBQUMsQ0FBQ21OLE1BQU0sR0FBRyxDQUFDLEVBQUUwRCxLQUFLLENBQUM3UCxJQUFJLENBQUM7UUFBRThQLElBQUksRUFBRSxhQUFhO1FBQUVDLEdBQUcsRUFBRSxzQkFBc0I7UUFBRW5PLEtBQUssRUFBRTtNQUFZLENBQUMsQ0FBQztNQUV0R0UsU0FBUyxDQUFDL0csU0FBUyxHQUFHOFUsS0FBSyxDQUFDOVEsR0FBRyxDQUFDLFVBQUF1QixDQUFDO1FBQUEsb0NBQUE5QixNQUFBLENBQ0Q4QixDQUFDLENBQUN5UCxHQUFHLGlCQUFBdlIsTUFBQSxDQUFZOEIsQ0FBQyxDQUFDc0IsS0FBSyx3QkFBQXBELE1BQUEsQ0FBbUI4QixDQUFDLENBQUN3UCxJQUFJO01BQUEsQ0FDakYsQ0FBQyxDQUFDM1EsSUFBSSxDQUFDLEVBQUUsQ0FBQztJQUNkOztJQUVBO0VBQUE7SUFBQWlGLEdBQUE7SUFBQXZCLEtBQUEsRUFFQSxTQUFBMkksVUFBVUEsQ0FBQSxFQUFHO01BQUEsSUFBQXdFLE1BQUE7TUFDVCxJQUFJLElBQUksQ0FBQy9HLE9BQU8sRUFBRTtRQUNkLElBQUksQ0FBQ0EsT0FBTyxDQUFDak8sZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1VBQUEsT0FBTWdWLE1BQUksQ0FBQ0MsVUFBVSxDQUFDLENBQUM7UUFBQSxFQUFDO01BQ25FO01BRUEsSUFBSSxJQUFJLENBQUMvRyxPQUFPLEVBQUU7UUFDZCxJQUFJLENBQUNBLE9BQU8sQ0FBQ2xPLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtVQUFBLE9BQU1nVixNQUFJLENBQUNFLElBQUksQ0FBQyxDQUFDO1FBQUEsRUFBQztNQUM3RDtNQUVBLElBQUksQ0FBQy9HLFNBQVMsQ0FBQ25NLE9BQU8sQ0FBQyxVQUFBbVQsR0FBRyxFQUFJO1FBQzFCQSxHQUFHLENBQUNuVixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsVUFBQ21KLENBQUM7VUFBQSxPQUFLNkwsTUFBSSxDQUFDSSxRQUFRLENBQUNqTSxDQUFDLENBQUM7UUFBQSxFQUFDO01BQzFELENBQUMsQ0FBQzs7TUFFRjtNQUNBLElBQUksSUFBSSxDQUFDa0gsT0FBTyxFQUFFO1FBQ2QsSUFBSSxDQUFDQSxPQUFPLENBQUNyUSxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUU7VUFBQSxPQUFNZ1YsTUFBSSxDQUFDSyxVQUFVLENBQUMsQ0FBQztRQUFBLEVBQUM7TUFDbkU7TUFDQSxJQUFJLElBQUksQ0FBQy9FLFlBQVksRUFBRTtRQUNuQixJQUFJLENBQUNBLFlBQVksQ0FBQ3RRLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDbUosQ0FBQyxFQUFLO1VBQy9DNkwsTUFBSSxDQUFDbEYsTUFBTSxHQUFHd0YsVUFBVSxDQUFDbk0sQ0FBQyxDQUFDdUksTUFBTSxDQUFDN0osS0FBSyxDQUFDO1VBQ3hDLElBQUltTixNQUFJLENBQUNyRixXQUFXLEVBQUU7WUFDbEJxRixNQUFJLENBQUNyRixXQUFXLENBQUNHLE1BQU0sR0FBR2tGLE1BQUksQ0FBQ25GLE9BQU8sR0FBRyxDQUFDLEdBQUdtRixNQUFJLENBQUNsRixNQUFNO1VBQzVEO1VBQ0EsSUFBSWtGLE1BQUksQ0FBQzdFLFFBQVEsRUFBRTtZQUNmNkUsTUFBSSxDQUFDN0UsUUFBUSxDQUFDTCxNQUFNLEdBQUdrRixNQUFJLENBQUNuRixPQUFPLEdBQUcsQ0FBQyxHQUFHbUYsTUFBSSxDQUFDbEYsTUFBTTtVQUN6RDtRQUNKLENBQUMsQ0FBQztNQUNOO01BQ0EsSUFBSSxJQUFJLENBQUNTLFNBQVMsRUFBRTtRQUNoQixJQUFJLENBQUNBLFNBQVMsQ0FBQ3ZRLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDbUosQ0FBQyxFQUFLO1VBQzVDNkwsTUFBSSxDQUFDakYsU0FBUyxHQUFHdUYsVUFBVSxDQUFDbk0sQ0FBQyxDQUFDdUksTUFBTSxDQUFDN0osS0FBSyxDQUFDO1FBQy9DLENBQUMsQ0FBQztNQUNOOztNQUVBO01BQ0FsSSxRQUFRLENBQUNLLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO1FBQ3JDLElBQUlnVixNQUFJLENBQUN0RixhQUFhLEVBQUU7UUFDeEJzRixNQUFJLENBQUN0RixhQUFhLEdBQUcsSUFBSTtRQUN6QnNGLE1BQUksQ0FBQ08sYUFBYSxDQUFDLENBQUM7TUFDeEIsQ0FBQyxFQUFFO1FBQUVDLElBQUksRUFBRTtNQUFLLENBQUMsQ0FBQztJQUN0QjtFQUFDO0lBQUFwTSxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQTRJLElBQUlBLENBQUEsRUFBRztNQUNILElBQUksSUFBSSxDQUFDcEQsU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDQyxRQUFRLEVBQUU7TUFFdEMsSUFBSSxDQUFDRCxTQUFTLEdBQUcsSUFBSTtNQUNyQixJQUFJLENBQUNDLFFBQVEsR0FBRyxLQUFLO01BQ3JCLElBQUksQ0FBQ21JLGdCQUFnQixDQUFDLENBQUM7TUFDdkIsSUFBSSxDQUFDQyxjQUFjLENBQUMsQ0FBQztJQUN6QjtFQUFDO0lBQUF0TSxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQThOLEtBQUtBLENBQUEsRUFBRztNQUNKLElBQUksQ0FBQ3JJLFFBQVEsR0FBRyxJQUFJO01BQ3BCLElBQUksQ0FBQ21JLGdCQUFnQixDQUFDLENBQUM7SUFDM0I7RUFBQztJQUFBck0sR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUFvTixVQUFVQSxDQUFBLEVBQUc7TUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDNUgsU0FBUyxJQUFJLElBQUksQ0FBQ0MsUUFBUSxFQUFFO1FBQ2xDLElBQUksQ0FBQ21ELElBQUksQ0FBQyxDQUFDO01BQ2YsQ0FBQyxNQUFNO1FBQ0gsSUFBSSxDQUFDa0YsS0FBSyxDQUFDLENBQUM7TUFDaEI7SUFDSjtFQUFDO0lBQUF2TSxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQXFOLElBQUlBLENBQUEsRUFBRztNQUNILElBQUksQ0FBQzdILFNBQVMsR0FBRyxLQUFLO01BQ3RCLElBQUksQ0FBQ0MsUUFBUSxHQUFHLEtBQUs7O01BRXJCO01BQ0EsT0FBTyxJQUFJLENBQUNGLFlBQVksR0FBRyxJQUFJLENBQUNELElBQUksQ0FBQ2pNLE1BQU0sRUFBRTtRQUN6QyxJQUFNbVEsR0FBRyxHQUFHLElBQUksQ0FBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUNDLFlBQVksQ0FBQztRQUN4QyxJQUFJLENBQUN3SSxVQUFVLENBQUN2RSxHQUFHLENBQUM7UUFDcEIsSUFBSSxDQUFDd0UsZ0JBQWdCLENBQUN4RSxHQUFHLENBQUM7UUFDMUIsSUFBSSxDQUFDeUUscUJBQXFCLENBQUN6RSxHQUFHLENBQUM7UUFDL0IsSUFBSSxDQUFDRCx1QkFBdUIsQ0FBQ0MsR0FBRyxDQUFDO1FBQ2pDLElBQUlBLEdBQUcsQ0FBQ0MsSUFBSSxLQUFLLE9BQU8sRUFBRTtVQUN0QixJQUFJLENBQUN5RSxZQUFZLENBQUMxRSxHQUFHLENBQUNLLE1BQU0sRUFBRUwsR0FBRyxDQUFDTSxVQUFVLENBQUM7UUFDakQ7UUFDQTtRQUNBLElBQUlOLEdBQUcsQ0FBQ0MsSUFBSSxLQUFLLGlCQUFpQixJQUFJRCxHQUFHLENBQUMyRSxRQUFRLEtBQUssQ0FBQyxJQUFJM0UsR0FBRyxDQUFDSyxNQUFNLEVBQUU7VUFDcEUsSUFBSSxDQUFDcUUsWUFBWSxDQUFDMUUsR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxDQUFDO1FBQ2pEO1FBQ0EsSUFBSSxDQUFDdkUsWUFBWSxFQUFFO01BQ3ZCO01BRUEsSUFBSSxDQUFDNkksa0JBQWtCLENBQUMsQ0FBQztNQUN6QixJQUFJLENBQUNSLGdCQUFnQixDQUFDLENBQUM7SUFDM0I7RUFBQztJQUFBck0sR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUF1TixRQUFRQSxDQUFDYyxLQUFLLEVBQUU7TUFDWixJQUFNMVYsS0FBSyxHQUFHOFUsVUFBVSxDQUFDWSxLQUFLLENBQUNDLGFBQWEsQ0FBQzNVLE9BQU8sQ0FBQzRVLFdBQVcsQ0FBQztNQUNqRSxJQUFJLENBQUM1VixLQUFLLEdBQUdBLEtBQUs7O01BRWxCO01BQ0EsSUFBSSxDQUFDMk4sU0FBUyxDQUFDbk0sT0FBTyxDQUFDLFVBQUFtVCxHQUFHO1FBQUEsT0FBSUEsR0FBRyxDQUFDL1UsU0FBUyxDQUFDdUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztNQUFBLEVBQUM7TUFDN0R1VCxLQUFLLENBQUNDLGFBQWEsQ0FBQy9WLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxRQUFRLENBQUM7SUFDL0M7RUFBQztJQUFBd0csR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUE2TixjQUFjQSxDQUFBLEVBQUc7TUFBQSxJQUFBVyxNQUFBO01BQ2IsSUFBSSxDQUFDLElBQUksQ0FBQ2hKLFNBQVMsSUFBSSxJQUFJLENBQUNDLFFBQVEsRUFBRTtNQUV0QyxJQUFJLElBQUksQ0FBQ0YsWUFBWSxJQUFJLElBQUksQ0FBQ0QsSUFBSSxDQUFDak0sTUFBTSxFQUFFO1FBQ3ZDLElBQUksQ0FBQ21NLFNBQVMsR0FBRyxLQUFLO1FBQ3RCLElBQUksQ0FBQzRJLGtCQUFrQixDQUFDLENBQUM7UUFDekIsSUFBSSxDQUFDUixnQkFBZ0IsQ0FBQyxDQUFDO1FBQ3ZCO01BQ0o7TUFFQSxJQUFNcEUsR0FBRyxHQUFHLElBQUksQ0FBQ2xFLElBQUksQ0FBQyxJQUFJLENBQUNDLFlBQVksQ0FBQztNQUN4QyxJQUFJLENBQUNrSixVQUFVLENBQUNqRixHQUFHLENBQUM7TUFDcEIsSUFBSSxDQUFDakUsWUFBWSxFQUFFOztNQUVuQjtNQUNBLElBQUltSixLQUFLLEdBQUcsSUFBSSxDQUFDQyxjQUFjLENBQUNuRixHQUFHLENBQUM7TUFDcENrRixLQUFLLEdBQUdBLEtBQUssR0FBRyxJQUFJLENBQUMvVixLQUFLO01BRTFCd0gsVUFBVSxDQUFDO1FBQUEsT0FBTXFPLE1BQUksQ0FBQ1gsY0FBYyxDQUFDLENBQUM7TUFBQSxHQUFFYSxLQUFLLENBQUM7SUFDbEQ7RUFBQztJQUFBbk4sR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUEyTyxjQUFjQSxDQUFDbkYsR0FBRyxFQUFFO01BQ2hCLFFBQVFBLEdBQUcsQ0FBQ0MsSUFBSTtRQUNaLEtBQUssT0FBTztVQUFFLE9BQU8sSUFBSTtRQUN6QixLQUFLLFlBQVk7VUFBRSxPQUFPLEdBQUc7UUFDN0IsS0FBSyxRQUFRO1VBQUUsT0FBTyxJQUFJO1FBQzFCLEtBQUssTUFBTTtVQUFFLE9BQU8sSUFBSTtRQUN4QixLQUFLLFFBQVE7VUFBRSxPQUFPLElBQUk7UUFDMUIsS0FBSyxPQUFPO1VBQUUsT0FBTyxJQUFJO1FBQ3pCLEtBQUssT0FBTztVQUFFLE9BQU8sSUFBSTtRQUN6QixLQUFLLFNBQVM7VUFBRSxPQUFPLElBQUk7UUFDM0IsS0FBSyxTQUFTO1FBQ2QsS0FBSyxNQUFNO1VBQUUsT0FBTyxJQUFJO1FBQ3hCO1FBQ0EsS0FBSyxZQUFZO1VBQUUsT0FBTyxJQUFJO1FBQzlCLEtBQUssYUFBYTtVQUFFLE9BQU8sSUFBSTtRQUMvQixLQUFLLGNBQWM7VUFBRSxPQUFPLElBQUk7UUFDaEMsS0FBSyxrQkFBa0I7VUFBRSxPQUFPLElBQUk7UUFDcEMsS0FBSyxhQUFhO1VBQUUsT0FBTyxJQUFJLENBQUNtRixlQUFlLENBQUNwRixHQUFHLENBQUM7UUFDcEQ7UUFDQSxLQUFLLGtCQUFrQjtVQUFFLE9BQU8sSUFBSTtRQUNwQyxLQUFLLGlCQUFpQjtVQUFFLE9BQU8sSUFBSSxDQUFDcUYsc0JBQXNCLENBQUNyRixHQUFHLENBQUM7UUFDL0Q7VUFBUyxPQUFPLElBQUk7TUFDeEI7SUFDSjtFQUFDO0lBQUFqSSxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQTZPLHNCQUFzQkEsQ0FBQ3JGLEdBQUcsRUFBRTtNQUN4QjtNQUNBLElBQUlBLEdBQUcsQ0FBQzRDLE1BQU0sS0FBS25DLFNBQVMsRUFBRSxPQUFPLElBQUk7TUFDekMsT0FBTyxJQUFJO0lBQ2Y7RUFBQztJQUFBMUksR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUE0TyxlQUFlQSxDQUFDcEYsR0FBRyxFQUFFO01BQ2pCLFFBQVFBLEdBQUcsQ0FBQ2UsT0FBTztRQUNmLEtBQUssY0FBYztRQUNuQixLQUFLLGlCQUFpQjtRQUN0QixLQUFLLGNBQWM7UUFDbkIsS0FBSyxpQkFBaUI7VUFBRSxPQUFPLElBQUk7UUFDbkMsS0FBSyxlQUFlO1VBQUUsT0FBTyxJQUFJO1FBQ2pDLEtBQUssTUFBTTtVQUFFLE9BQU8sSUFBSTtRQUN4QixLQUFLLE1BQU07VUFBRSxPQUFPLElBQUk7UUFDeEIsS0FBSyxjQUFjO1FBQ25CLEtBQUssV0FBVztRQUNoQixLQUFLLFNBQVM7VUFBRSxPQUFPLElBQUk7UUFDM0IsS0FBSyxZQUFZO1VBQUUsT0FBTyxJQUFJO1FBQzlCLEtBQUssWUFBWTtVQUFFLE9BQU8sSUFBSTtRQUM5QixLQUFLLGdCQUFnQjtVQUFFLE9BQU8sSUFBSTtRQUNsQyxLQUFLLGVBQWU7VUFBRSxPQUFPLElBQUk7UUFDakMsS0FBSyxrQkFBa0I7VUFBRSxPQUFPLElBQUk7UUFDcEMsS0FBSyxnQkFBZ0I7VUFBRSxPQUFPLElBQUk7UUFDbEM7VUFBUyxPQUFPLElBQUk7TUFDeEI7SUFDSjtFQUFDO0lBQUFoSixHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQXlPLFVBQVVBLENBQUNqRixHQUFHLEVBQUU7TUFBQSxJQUFBc0YsTUFBQTtNQUNaLElBQUksQ0FBQ0MsYUFBYSxDQUFDdkYsR0FBRyxDQUFDO01BQ3ZCLElBQUksQ0FBQ3VFLFVBQVUsQ0FBQ3ZFLEdBQUcsQ0FBQzs7TUFFcEI7TUFDQSxJQUFNd0YsT0FBTyxHQUFHLElBQUksQ0FBQ0MsZ0JBQWdCLENBQUN6RixHQUFHLENBQUM7TUFDMUMsSUFBSXdGLE9BQU8sR0FBRyxDQUFDLEVBQUU7UUFDYjdPLFVBQVUsQ0FBQztVQUFBLE9BQU0yTyxNQUFJLENBQUNkLGdCQUFnQixDQUFDeEUsR0FBRyxDQUFDO1FBQUEsR0FBRXdGLE9BQU8sR0FBRyxJQUFJLENBQUNyVyxLQUFLLENBQUM7TUFDdEUsQ0FBQyxNQUFNO1FBQ0gsSUFBSSxDQUFDcVYsZ0JBQWdCLENBQUN4RSxHQUFHLENBQUM7TUFDOUI7O01BRUE7TUFDQSxJQUFJLENBQUN5RSxxQkFBcUIsQ0FBQ3pFLEdBQUcsQ0FBQzs7TUFFL0I7TUFDQSxJQUFJLENBQUNELHVCQUF1QixDQUFDQyxHQUFHLENBQUM7SUFDckM7RUFBQztJQUFBakksR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUFpTyxxQkFBcUJBLENBQUN6RSxHQUFHLEVBQUU7TUFDdkI7TUFDQSxJQUFJQSxHQUFHLENBQUNDLElBQUksS0FBSyxhQUFhLElBQUlELEdBQUcsQ0FBQ3NCLE1BQU0sSUFBSXRCLEdBQUcsQ0FBQ3VCLFVBQVUsRUFBRTtRQUM1RCxJQUFNeEosR0FBRyxNQUFBNUYsTUFBQSxDQUFNNk4sR0FBRyxDQUFDdUIsVUFBVSxPQUFBcFAsTUFBQSxDQUFJNk4sR0FBRyxDQUFDc0IsTUFBTSxDQUFFO1FBQzdDLElBQU1vRSxXQUFXLEdBQUcsSUFBSSxDQUFDOUgsZUFBZSxDQUFDN0YsR0FBRyxDQUFDO1FBQzdDLElBQUkyTixXQUFXLElBQUlBLFdBQVcsQ0FBQzFILEtBQUssR0FBRyxDQUFDLEVBQUU7VUFDdEMsSUFBSSxDQUFDZixnQkFBZ0IsQ0FBQ2xGLEdBQUcsQ0FBQyxHQUFHMk4sV0FBVyxDQUFDMUgsS0FBSztVQUM5QyxJQUFJLENBQUMySCw0QkFBNEIsQ0FBQzVOLEdBQUcsQ0FBQztRQUMxQztNQUNKOztNQUVBO01BQ0EsSUFBSWlJLEdBQUcsQ0FBQ0MsSUFBSSxLQUFLLE9BQU8sRUFBRTtRQUN0QixLQUFLLElBQU1sSSxJQUFHLElBQUksSUFBSSxDQUFDa0YsZ0JBQWdCLEVBQUU7VUFDckMsSUFBSSxJQUFJLENBQUNBLGdCQUFnQixDQUFDbEYsSUFBRyxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQ2tGLGdCQUFnQixDQUFDbEYsSUFBRyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDNE4sNEJBQTRCLENBQUM1TixJQUFHLENBQUM7VUFDMUM7UUFDSjtNQUNKO0lBQ0o7RUFBQztJQUFBQSxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQW1QLDRCQUE0QkEsQ0FBQzVOLEdBQUcsRUFBRTtNQUM5QixJQUFNMk4sV0FBVyxHQUFHLElBQUksQ0FBQzlILGVBQWUsQ0FBQzdGLEdBQUcsQ0FBQztNQUM3QyxJQUFJLENBQUMyTixXQUFXLEVBQUU7TUFFbEIsSUFBTUUsRUFBRSxHQUFHLElBQUksQ0FBQzNJLGdCQUFnQixDQUFDbEYsR0FBRyxDQUFDLElBQUksQ0FBQztNQUUxQyxJQUFJNk4sRUFBRSxHQUFHLENBQUMsRUFBRTtRQUNSO1FBQ0FGLFdBQVcsQ0FBQ3ZJLEVBQUUsQ0FBQ3BPLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxnQ0FBZ0MsQ0FBQztRQUM5RCxJQUFJbVUsV0FBVyxDQUFDcFIsS0FBSyxFQUFFO1VBQ25Cb1IsV0FBVyxDQUFDcFIsS0FBSyxDQUFDakIsV0FBVyxNQUFBbEIsTUFBQSxDQUFNeVQsRUFBRSxNQUFHO1VBQ3hDRixXQUFXLENBQUNwUixLQUFLLENBQUNtQyxLQUFLLENBQUNDLE9BQU8sR0FBRyxRQUFRO1FBQzlDO01BQ0osQ0FBQyxNQUFNO1FBQ0g7UUFDQWdQLFdBQVcsQ0FBQ3ZJLEVBQUUsQ0FBQ3BPLFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQyxnQ0FBZ0MsQ0FBQztRQUNqRSxJQUFJb1UsV0FBVyxDQUFDcFIsS0FBSyxFQUFFO1VBQ25Cb1IsV0FBVyxDQUFDcFIsS0FBSyxDQUFDbUMsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtRQUM1QztNQUNKO0lBQ0o7RUFBQztJQUFBcUIsR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUFpUCxnQkFBZ0JBLENBQUN6RixHQUFHLEVBQUU7TUFDbEIsUUFBUUEsR0FBRyxDQUFDQyxJQUFJO1FBQ1osS0FBSyxRQUFRO1VBQUUsT0FBTyxHQUFHO1FBQ3pCLEtBQUssTUFBTTtVQUFFLE9BQU8sR0FBRztRQUN2QixLQUFLLE9BQU87VUFBRSxPQUFPLENBQUM7UUFDdEIsS0FBSyxZQUFZO1VBQUUsT0FBTyxHQUFHO1FBQzdCLEtBQUssYUFBYTtVQUFFLE9BQU8sR0FBRztRQUM5QixLQUFLLGtCQUFrQjtVQUFFLE9BQU8sR0FBRztRQUNuQyxLQUFLLGFBQWE7VUFBRSxPQUFPLElBQUksQ0FBQzRGLGlCQUFpQixDQUFDN0YsR0FBRyxDQUFDO1FBQ3RELEtBQUssaUJBQWlCO1VBQUUsT0FBTyxHQUFHO1FBQ2xDO1VBQVMsT0FBTyxDQUFDO01BQ3JCO0lBQ0o7RUFBQztJQUFBakksR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUFxUCxpQkFBaUJBLENBQUM3RixHQUFHLEVBQUU7TUFDbkIsUUFBUUEsR0FBRyxDQUFDZSxPQUFPO1FBQ2YsS0FBSyxjQUFjO1FBQ25CLEtBQUssZUFBZTtRQUNwQixLQUFLLGlCQUFpQjtRQUN0QixLQUFLLGNBQWM7UUFDbkIsS0FBSyxpQkFBaUI7UUFDdEIsS0FBSyxNQUFNO1VBQUUsT0FBTyxHQUFHO1FBQ3ZCLEtBQUssWUFBWTtRQUNqQixLQUFLLGdCQUFnQjtVQUFFLE9BQU8sR0FBRztRQUNqQyxLQUFLLGtCQUFrQjtVQUFFLE9BQU8sR0FBRztRQUNuQyxLQUFLLGdCQUFnQjtVQUFFLE9BQU8sR0FBRztRQUNqQztVQUFTLE9BQU8sQ0FBQztNQUNyQjtJQUNKO0VBQUM7SUFBQWhKLEdBQUE7SUFBQXZCLEtBQUEsRUFFRCxTQUFBK08sYUFBYUEsQ0FBQ3ZGLEdBQUcsRUFBRTtNQUNmLFFBQVFBLEdBQUcsQ0FBQ0MsSUFBSTtRQUNaLEtBQUssUUFBUTtVQUNULElBQUksQ0FBQzZGLGFBQWEsQ0FBQzlGLEdBQUcsQ0FBQ1UsUUFBUSxFQUFFVixHQUFHLENBQUNXLFlBQVksRUFBRVgsR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxFQUFFTixHQUFHLENBQUMrRixNQUFNLENBQUM7VUFDMUY7UUFDSixLQUFLLE1BQU07VUFDUCxJQUFJLENBQUNDLFdBQVcsQ0FBQ2hHLEdBQUcsQ0FBQ2lHLE1BQU0sRUFBRWpHLEdBQUcsQ0FBQ2tHLFVBQVUsRUFBRWxHLEdBQUcsQ0FBQ0ssTUFBTSxFQUFFTCxHQUFHLENBQUNNLFVBQVUsQ0FBQztVQUN4RTtRQUNKLEtBQUssUUFBUTtVQUNULElBQUksQ0FBQzZGLGFBQWEsQ0FBQ25HLEdBQUcsQ0FBQ29HLFFBQVEsRUFBRXBHLEdBQUcsQ0FBQ3FHLFlBQVksQ0FBQztVQUNsRDtRQUNKLEtBQUssT0FBTztVQUNSLElBQUksQ0FBQ0MsWUFBWSxDQUFDdEcsR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxDQUFDO1VBQzdDO1FBQ0osS0FBSyxPQUFPO1VBQ1IsSUFBSSxDQUFDb0UsWUFBWSxDQUFDMUUsR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxDQUFDO1VBQzdDO1FBQ0o7UUFDQSxLQUFLLFlBQVk7VUFDYixJQUFJLENBQUNpRyxVQUFVLENBQUN2RyxHQUFHLENBQUNLLE1BQU0sRUFBRUwsR0FBRyxDQUFDTSxVQUFVLEVBQUUsVUFBVSxDQUFDO1VBQ3ZEO1FBQ0osS0FBSyxhQUFhO1VBQ2QsSUFBSSxDQUFDaUcsVUFBVSxDQUFDdkcsR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxFQUFFLFVBQVUsQ0FBQztVQUN2RDtRQUNKLEtBQUssY0FBYztVQUNmLElBQUksQ0FBQ2tHLGNBQWMsQ0FBQ3hHLEdBQUcsQ0FBQ0ssTUFBTSxFQUFFTCxHQUFHLENBQUNNLFVBQVUsQ0FBQztVQUMvQztRQUNKLEtBQUssa0JBQWtCO1VBQ25CLElBQUksQ0FBQ3dGLGFBQWEsQ0FBQzlGLEdBQUcsQ0FBQ1UsUUFBUSxFQUFFVixHQUFHLENBQUNXLFlBQVksRUFBRVgsR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxFQUFFLEtBQUssQ0FBQztVQUNyRjtRQUNKLEtBQUssYUFBYTtVQUNkLElBQUksQ0FBQ21HLG9CQUFvQixDQUFDekcsR0FBRyxDQUFDO1VBQzlCO1FBQ0o7UUFDQSxLQUFLLGtCQUFrQjtVQUNuQixJQUFJLENBQUMwRyxzQkFBc0IsQ0FBQzFHLEdBQUcsQ0FBQztVQUNoQztRQUNKLEtBQUssaUJBQWlCO1VBQ2xCLElBQUksQ0FBQzJHLHFCQUFxQixDQUFDM0csR0FBRyxDQUFDO1VBQy9CO01BQ1I7SUFDSjs7SUFFQTtFQUFBO0lBQUFqSSxHQUFBO0lBQUF2QixLQUFBLEVBRUEsU0FBQStQLFVBQVVBLENBQUNLLFVBQVUsRUFBRXRHLFVBQVUsRUFBRXVHLFFBQVEsRUFBRTtNQUN6QyxJQUFNeEcsTUFBTSxHQUFHLElBQUksQ0FBQ3lHLG1CQUFtQixDQUFDRixVQUFVLEVBQUV0RyxVQUFVLENBQUM7TUFDL0QsSUFBSUQsTUFBTSxFQUFFO1FBQ1JBLE1BQU0sQ0FBQ3RSLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQ3NWLFFBQVEsQ0FBQztRQUM5QmxRLFVBQVUsQ0FBQztVQUFBLE9BQU0wSixNQUFNLENBQUN0UixTQUFTLENBQUN1QyxNQUFNLENBQUN1VixRQUFRLENBQUM7UUFBQSxHQUFFLElBQUksQ0FBQztNQUM3RDtJQUNKO0VBQUM7SUFBQTlPLEdBQUE7SUFBQXZCLEtBQUEsRUFFRCxTQUFBZ1EsY0FBY0EsQ0FBQ0ksVUFBVSxFQUFFdEcsVUFBVSxFQUFFO01BQ25DLElBQU1ELE1BQU0sR0FBRyxJQUFJLENBQUN5RyxtQkFBbUIsQ0FBQ0YsVUFBVSxFQUFFdEcsVUFBVSxDQUFDO01BQy9ELElBQUlELE1BQU0sRUFBRTtRQUNSQSxNQUFNLENBQUN0UixTQUFTLENBQUN3QyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQy9Cb0YsVUFBVSxDQUFDO1VBQUEsT0FBTTBKLE1BQU0sQ0FBQ3RSLFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFBQSxHQUFFLElBQUksQ0FBQztNQUM5RDtJQUNKO0VBQUM7SUFBQXlHLEdBQUE7SUFBQXZCLEtBQUEsRUFFRCxTQUFBdVEsYUFBYUEsQ0FBQ0gsVUFBVSxFQUFFdEcsVUFBVSxFQUFFO01BQ2xDLElBQU1ELE1BQU0sR0FBRyxJQUFJLENBQUN5RyxtQkFBbUIsQ0FBQ0YsVUFBVSxFQUFFdEcsVUFBVSxDQUFDO01BQy9ELElBQUlELE1BQU0sRUFBRTtRQUNSQSxNQUFNLENBQUN0UixTQUFTLENBQUN3QyxHQUFHLENBQUMsUUFBUSxDQUFDO1FBQzlCO1FBQ0FvRixVQUFVLENBQUM7VUFBQSxPQUFNMEosTUFBTSxDQUFDdFIsU0FBUyxDQUFDdUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUFBLEdBQUUsSUFBSSxDQUFDO01BQzdEO0lBQ0o7RUFBQztJQUFBeUcsR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUF3USxXQUFXQSxDQUFDSixVQUFVLEVBQUV0RyxVQUFVLEVBQUU7TUFDaEMsSUFBTUQsTUFBTSxHQUFHLElBQUksQ0FBQ3lHLG1CQUFtQixDQUFDRixVQUFVLEVBQUV0RyxVQUFVLENBQUM7TUFDL0QsSUFBSUQsTUFBTSxFQUFFO1FBQ1JBLE1BQU0sQ0FBQ3RSLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxRQUFRLENBQUM7UUFDOUJvRixVQUFVLENBQUM7VUFBQSxPQUFNMEosTUFBTSxDQUFDdFIsU0FBUyxDQUFDdUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztRQUFBLEdBQUUsSUFBSSxDQUFDO01BQzdEO0lBQ0o7RUFBQztJQUFBeUcsR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUF5USxjQUFjQSxDQUFDTCxVQUFVLEVBQUV0RyxVQUFVLEVBQUU7TUFDbkMsSUFBTUQsTUFBTSxHQUFHLElBQUksQ0FBQ3lHLG1CQUFtQixDQUFDRixVQUFVLEVBQUV0RyxVQUFVLENBQUM7TUFDL0QsSUFBSUQsTUFBTSxFQUFFO1FBQ1JBLE1BQU0sQ0FBQ3RSLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxXQUFXLENBQUM7UUFDakNvRixVQUFVLENBQUM7VUFBQSxPQUFNMEosTUFBTSxDQUFDdFIsU0FBUyxDQUFDdUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUFBLEdBQUUsSUFBSSxDQUFDO01BQ2hFO0lBQ0o7RUFBQztJQUFBeUcsR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUFpUSxvQkFBb0JBLENBQUN6RyxHQUFHLEVBQUU7TUFBQSxJQUFBa0gsTUFBQTtNQUN0QixRQUFRbEgsR0FBRyxDQUFDZSxPQUFPO1FBQ2YsS0FBSyxjQUFjO1VBQ2YsSUFBSWYsR0FBRyxDQUFDc0IsTUFBTSxJQUFJdEIsR0FBRyxDQUFDdUIsVUFBVSxFQUFFLElBQUksQ0FBQ3VFLGFBQWEsQ0FBQzlGLEdBQUcsQ0FBQ3NCLE1BQU0sRUFBRXRCLEdBQUcsQ0FBQ3VCLFVBQVUsRUFBRXZCLEdBQUcsQ0FBQ0ssTUFBTSxFQUFFTCxHQUFHLENBQUNNLFVBQVUsRUFBRSxLQUFLLENBQUM7VUFDbkgsSUFBSU4sR0FBRyxDQUFDSyxNQUFNLElBQUlMLEdBQUcsQ0FBQ00sVUFBVSxFQUFFO1lBQzlCM0osVUFBVSxDQUFDO2NBQUEsT0FBTXVRLE1BQUksQ0FBQ1gsVUFBVSxDQUFDdkcsR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxFQUFFLFVBQVUsQ0FBQztZQUFBLEdBQUUsR0FBRyxDQUFDO1VBQ2xGO1VBQ0E7UUFDSixLQUFLLGVBQWU7VUFDaEIsSUFBSU4sR0FBRyxDQUFDc0IsTUFBTSxJQUFJdEIsR0FBRyxDQUFDdUIsVUFBVSxFQUFFO1lBQzlCLElBQU00RixTQUFTLE1BQUFoVixNQUFBLENBQU02TixHQUFHLENBQUN1QixVQUFVLE9BQUFwUCxNQUFBLENBQUk2TixHQUFHLENBQUNzQixNQUFNLENBQUU7WUFDbkQsSUFBSSxDQUFDOEYsVUFBVSxDQUFDRCxTQUFTLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQztZQUM5QyxJQUFJLENBQUNFLFdBQVcsQ0FBQ0YsU0FBUyxFQUFFLE9BQU8sQ0FBQztZQUNwQyxJQUFNRyxRQUFRLEdBQUcsSUFBSSxDQUFDUixtQkFBbUIsQ0FBQzlHLEdBQUcsQ0FBQ3NCLE1BQU0sRUFBRXRCLEdBQUcsQ0FBQ3VCLFVBQVUsQ0FBQztZQUNyRSxJQUFJK0YsUUFBUSxFQUFFO2NBQ1ZBLFFBQVEsQ0FBQ3ZZLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxXQUFXLENBQUM7Y0FDbkNvRixVQUFVLENBQUM7Z0JBQUEsT0FBTTJRLFFBQVEsQ0FBQ3ZZLFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQyxXQUFXLENBQUM7Y0FBQSxHQUFFLElBQUksQ0FBQztZQUNsRTtVQUNKO1VBQ0E7VUFDQSxJQUFJME8sR0FBRyxDQUFDaUIsT0FBTyxFQUFFO1lBQ2J0SyxVQUFVLENBQUMsWUFBTTtjQUNicUosR0FBRyxDQUFDaUIsT0FBTyxDQUFDdFEsT0FBTyxDQUFDLFVBQUErQyxDQUFDLEVBQUk7Z0JBQ3JCLElBQU15SixFQUFFLEdBQUcrSixNQUFJLENBQUNKLG1CQUFtQixDQUFDcFQsQ0FBQyxDQUFDbEMsSUFBSSxFQUFFa0MsQ0FBQyxDQUFDMkosSUFBSSxDQUFDO2dCQUNuRCxJQUFJRixFQUFFLEVBQUU7a0JBQ0pBLEVBQUUsQ0FBQ3BPLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxNQUFNLENBQUM7a0JBQ3hCb0YsVUFBVSxDQUFDO29CQUFBLE9BQU13RyxFQUFFLENBQUNwTyxTQUFTLENBQUN1QyxNQUFNLENBQUMsTUFBTSxDQUFDO2tCQUFBLEdBQUUsR0FBRyxDQUFDO2dCQUN0RDtjQUNKLENBQUMsQ0FBQztZQUNOLENBQUMsRUFBRSxHQUFHLENBQUM7WUFDUDtZQUNBLElBQU00UCxPQUFPLEdBQUdsQixHQUFHLENBQUNpQixPQUFPLENBQUNqUSxJQUFJLENBQUMsVUFBQTBDLENBQUM7Y0FBQSxPQUFJQSxDQUFDLENBQUN5TixTQUFTO1lBQUEsRUFBQztZQUNsRCxJQUFJRCxPQUFPLEVBQUU7Y0FDVHZLLFVBQVUsQ0FBQztnQkFBQSxPQUFNdVEsTUFBSSxDQUFDWCxVQUFVLENBQUNyRixPQUFPLENBQUMxUCxJQUFJLEVBQUUwUCxPQUFPLENBQUM3RCxJQUFJLEVBQUUsVUFBVSxDQUFDO2NBQUEsR0FBRSxJQUFJLENBQUM7WUFDbkY7VUFDSixDQUFDLE1BQU0sSUFBSTJDLEdBQUcsQ0FBQ0ssTUFBTSxJQUFJTCxHQUFHLENBQUNNLFVBQVUsRUFBRTtZQUNyQztZQUNBM0osVUFBVSxDQUFDO2NBQUEsT0FBTXVRLE1BQUksQ0FBQ1gsVUFBVSxDQUFDdkcsR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxFQUFFLFVBQVUsQ0FBQztZQUFBLEdBQUUsR0FBRyxDQUFDO1VBQ2xGO1VBQ0E7UUFDSixLQUFLLE1BQU07VUFDUCxJQUFJTixHQUFHLENBQUNzQixNQUFNLElBQUl0QixHQUFHLENBQUN1QixVQUFVLEVBQUUsSUFBSSxDQUFDdUUsYUFBYSxDQUFDOUYsR0FBRyxDQUFDc0IsTUFBTSxFQUFFdEIsR0FBRyxDQUFDdUIsVUFBVSxFQUFFdkIsR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxFQUFFLEtBQUssQ0FBQztVQUNuSCxJQUFJTixHQUFHLENBQUNLLE1BQU0sSUFBSUwsR0FBRyxDQUFDTSxVQUFVLEVBQUU7WUFDOUIzSixVQUFVLENBQUM7Y0FBQSxPQUFNdVEsTUFBSSxDQUFDVixjQUFjLENBQUN4RyxHQUFHLENBQUNLLE1BQU0sRUFBRUwsR0FBRyxDQUFDTSxVQUFVLENBQUM7WUFBQSxHQUFFLEdBQUcsQ0FBQztVQUMxRTtVQUNBO1FBQ0osS0FBSyxNQUFNO1VBQ1AsSUFBSU4sR0FBRyxDQUFDc0IsTUFBTSxJQUFJdEIsR0FBRyxDQUFDdUIsVUFBVSxFQUFFO1lBQzlCLElBQU1nRyxPQUFPLE1BQUFwVixNQUFBLENBQU02TixHQUFHLENBQUN1QixVQUFVLE9BQUFwUCxNQUFBLENBQUk2TixHQUFHLENBQUNzQixNQUFNLENBQUU7WUFDakQsSUFBSSxDQUFDOEYsVUFBVSxDQUFDRyxPQUFPLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQztZQUM1QyxJQUFJLENBQUNGLFdBQVcsQ0FBQ0UsT0FBTyxFQUFFLE9BQU8sQ0FBQztZQUNsQyxJQUFJLENBQUNQLFdBQVcsQ0FBQ2hILEdBQUcsQ0FBQ3NCLE1BQU0sRUFBRXRCLEdBQUcsQ0FBQ3VCLFVBQVUsQ0FBQztVQUNoRDtVQUNBLElBQUl2QixHQUFHLENBQUNLLE1BQU0sSUFBSUwsR0FBRyxDQUFDTSxVQUFVLEVBQUUsSUFBSSxDQUFDeUcsYUFBYSxDQUFDL0csR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxDQUFDO1VBQ2hGO1FBQ0osS0FBSyxjQUFjO1VBQ2YsSUFBSU4sR0FBRyxDQUFDc0IsTUFBTSxJQUFJdEIsR0FBRyxDQUFDdUIsVUFBVSxFQUFFO1lBQzlCLElBQU1pRyxVQUFVLE1BQUFyVixNQUFBLENBQU02TixHQUFHLENBQUN1QixVQUFVLE9BQUFwUCxNQUFBLENBQUk2TixHQUFHLENBQUNzQixNQUFNLENBQUU7WUFDcEQsSUFBSSxDQUFDOEYsVUFBVSxDQUFDSSxVQUFVLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQztZQUMvQyxJQUFJLENBQUNILFdBQVcsQ0FBQ0csVUFBVSxFQUFFLE9BQU8sQ0FBQztZQUNyQyxJQUFJLENBQUNSLFdBQVcsQ0FBQ2hILEdBQUcsQ0FBQ3NCLE1BQU0sRUFBRXRCLEdBQUcsQ0FBQ3VCLFVBQVUsQ0FBQztVQUNoRDtVQUNBO1FBQ0osS0FBSyxXQUFXO1VBQ1osSUFBSXZCLEdBQUcsQ0FBQ3NCLE1BQU0sSUFBSXRCLEdBQUcsQ0FBQ3VCLFVBQVUsRUFBRTtZQUM5QixJQUFNa0csV0FBVyxNQUFBdFYsTUFBQSxDQUFNNk4sR0FBRyxDQUFDdUIsVUFBVSxPQUFBcFAsTUFBQSxDQUFJNk4sR0FBRyxDQUFDc0IsTUFBTSxDQUFFO1lBQ3JEO1lBQ0EsSUFBSXRCLEdBQUcsQ0FBQ2pPLFdBQVcsS0FBSyxnQkFBZ0IsRUFBRTtjQUN0QyxJQUFJLENBQUNnTCxjQUFjLENBQUMwSyxXQUFXLENBQUMsR0FBRyxPQUFPO1lBQzlDO1lBQ0EsSUFBSSxDQUFDTCxVQUFVLENBQUNLLFdBQVcsRUFBRSxZQUFZLEVBQUUsSUFBSSxDQUFDO1lBQ2hELElBQUksQ0FBQ0osV0FBVyxDQUFDSSxXQUFXLEVBQUUsT0FBTyxDQUFDO1lBQ3RDLElBQUksQ0FBQ1QsV0FBVyxDQUFDaEgsR0FBRyxDQUFDc0IsTUFBTSxFQUFFdEIsR0FBRyxDQUFDdUIsVUFBVSxDQUFDO1VBQ2hEO1VBQ0E7UUFDSixLQUFLLFlBQVk7VUFDYixJQUFJdkIsR0FBRyxDQUFDc0IsTUFBTSxJQUFJdEIsR0FBRyxDQUFDdUIsVUFBVSxFQUFFO1lBQzlCLElBQU1tRyxZQUFZLE1BQUF2VixNQUFBLENBQU02TixHQUFHLENBQUN1QixVQUFVLE9BQUFwUCxNQUFBLENBQUk2TixHQUFHLENBQUNzQixNQUFNLENBQUU7WUFDdEQsSUFBSSxDQUFDK0YsV0FBVyxDQUFDSyxZQUFZLEVBQUUsTUFBTSxDQUFDO1lBQ3RDLElBQUksQ0FBQzFCLFdBQVcsQ0FBQ2hHLEdBQUcsQ0FBQ3NCLE1BQU0sRUFBRXRCLEdBQUcsQ0FBQ3VCLFVBQVUsRUFBRXZCLEdBQUcsQ0FBQ3NCLE1BQU0sRUFBRXRCLEdBQUcsQ0FBQ3VCLFVBQVUsQ0FBQztZQUN4RTtZQUNBLElBQUl2QixHQUFHLENBQUMySCxNQUFNLEVBQUU7Y0FDWjNILEdBQUcsQ0FBQzJILE1BQU0sQ0FBQ2hYLE9BQU8sQ0FBQyxVQUFBK0MsQ0FBQyxFQUFJO2dCQUNwQixJQUFNeUosRUFBRSxHQUFHK0osTUFBSSxDQUFDSixtQkFBbUIsQ0FBQ3BULENBQUMsQ0FBQ2xDLElBQUksRUFBRWtDLENBQUMsQ0FBQzJKLElBQUksQ0FBQztnQkFDbkQsSUFBSUYsRUFBRSxFQUFFO2tCQUNKQSxFQUFFLENBQUNwTyxTQUFTLENBQUN3QyxHQUFHLENBQUMsUUFBUSxDQUFDO2tCQUMxQm9GLFVBQVUsQ0FBQztvQkFBQSxPQUFNd0csRUFBRSxDQUFDcE8sU0FBUyxDQUFDdUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztrQkFBQSxHQUFFLElBQUksQ0FBQztnQkFDekQ7Y0FDSixDQUFDLENBQUM7WUFDTjtVQUNKO1VBQ0E7UUFDSixLQUFLLFlBQVk7VUFDYixJQUFJME8sR0FBRyxDQUFDc0IsTUFBTSxJQUFJdEIsR0FBRyxDQUFDdUIsVUFBVSxFQUFFO1lBQzlCLElBQU1xRyxZQUFZLE1BQUF6VixNQUFBLENBQU02TixHQUFHLENBQUN1QixVQUFVLE9BQUFwUCxNQUFBLENBQUk2TixHQUFHLENBQUNzQixNQUFNLENBQUU7WUFDdEQsSUFBSSxDQUFDOEYsVUFBVSxDQUFDUSxZQUFZLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQztZQUNqRCxJQUFJLENBQUNQLFdBQVcsQ0FBQ08sWUFBWSxFQUFFLE9BQU8sQ0FBQztZQUN2QyxJQUFJLENBQUNaLFdBQVcsQ0FBQ2hILEdBQUcsQ0FBQ3NCLE1BQU0sRUFBRXRCLEdBQUcsQ0FBQ3VCLFVBQVUsQ0FBQztVQUNoRDtVQUNBO1VBQ0EsSUFBSSxDQUFDc0csZUFBZSxDQUFDN0gsR0FBRyxDQUFDdUIsVUFBVSxDQUFDO1VBQ3BDO1FBQ0osS0FBSyxTQUFTO1VBQ1YsSUFBSXZCLEdBQUcsQ0FBQ3NCLE1BQU0sSUFBSXRCLEdBQUcsQ0FBQ3VCLFVBQVUsRUFBRTtZQUM5QixJQUFNdUcsVUFBVSxNQUFBM1YsTUFBQSxDQUFNNk4sR0FBRyxDQUFDdUIsVUFBVSxPQUFBcFAsTUFBQSxDQUFJNk4sR0FBRyxDQUFDc0IsTUFBTSxDQUFFO1lBQ3BELElBQUksQ0FBQzhGLFVBQVUsQ0FBQ1UsVUFBVSxFQUFFLFlBQVksRUFBRSxJQUFJLENBQUM7WUFDL0MsSUFBSSxDQUFDVCxXQUFXLENBQUNTLFVBQVUsRUFBRSxPQUFPLENBQUM7WUFDckMsSUFBSSxDQUFDYixjQUFjLENBQUNqSCxHQUFHLENBQUNzQixNQUFNLEVBQUV0QixHQUFHLENBQUN1QixVQUFVLENBQUM7VUFDbkQ7VUFDQTtRQUNKLEtBQUssY0FBYztRQUNuQixLQUFLLGlCQUFpQjtRQUN0QixLQUFLLGlCQUFpQjtVQUNsQixJQUFJdkIsR0FBRyxDQUFDc0IsTUFBTSxJQUFJdEIsR0FBRyxDQUFDdUIsVUFBVSxFQUFFLElBQUksQ0FBQ3VFLGFBQWEsQ0FBQzlGLEdBQUcsQ0FBQ3NCLE1BQU0sRUFBRXRCLEdBQUcsQ0FBQ3VCLFVBQVUsRUFBRXZCLEdBQUcsQ0FBQ0ssTUFBTSxFQUFFTCxHQUFHLENBQUNNLFVBQVUsRUFBRU4sR0FBRyxDQUFDK0YsTUFBTSxJQUFJLEtBQUssQ0FBQztVQUNqSTtRQUNKLEtBQUssZ0JBQWdCO1VBQ2pCLElBQUkvRixHQUFHLENBQUNzQixNQUFNLElBQUl0QixHQUFHLENBQUN1QixVQUFVLEVBQUU7WUFDOUIsSUFBTXdHLFlBQVksTUFBQTVWLE1BQUEsQ0FBTTZOLEdBQUcsQ0FBQ3VCLFVBQVUsT0FBQXBQLE1BQUEsQ0FBSTZOLEdBQUcsQ0FBQ3NCLE1BQU0sQ0FBRTtZQUN0RCxJQUFJLENBQUMrRixXQUFXLENBQUNVLFlBQVksRUFBRSxNQUFNLENBQUM7WUFDdEMsSUFBSSxDQUFDL0IsV0FBVyxDQUFDaEcsR0FBRyxDQUFDc0IsTUFBTSxFQUFFdEIsR0FBRyxDQUFDdUIsVUFBVSxFQUFFdkIsR0FBRyxDQUFDc0IsTUFBTSxFQUFFdEIsR0FBRyxDQUFDdUIsVUFBVSxDQUFDO1VBQzVFO1VBQ0E7UUFDSixLQUFLLGVBQWU7VUFDaEIsSUFBSXZCLEdBQUcsQ0FBQ3NCLE1BQU0sSUFBSXRCLEdBQUcsQ0FBQ3VCLFVBQVUsRUFBRTtZQUM5QixJQUFNeUcsWUFBWSxNQUFBN1YsTUFBQSxDQUFNNk4sR0FBRyxDQUFDdUIsVUFBVSxPQUFBcFAsTUFBQSxDQUFJNk4sR0FBRyxDQUFDc0IsTUFBTSxDQUFFO1lBQ3RELElBQUksQ0FBQytGLFdBQVcsQ0FBQ1csWUFBWSxFQUFFLE9BQU8sQ0FBQztZQUN2QyxJQUFJLENBQUM3QixhQUFhLENBQUNuRyxHQUFHLENBQUNzQixNQUFNLEVBQUV0QixHQUFHLENBQUN1QixVQUFVLENBQUM7VUFDbEQ7VUFDQTtRQUNKLEtBQUssa0JBQWtCO1VBQ25CLElBQUl2QixHQUFHLENBQUNLLE1BQU0sSUFBSUwsR0FBRyxDQUFDTSxVQUFVLEVBQUU7WUFDOUIsSUFBTW5ELEVBQUUsR0FBRyxJQUFJLENBQUMySixtQkFBbUIsQ0FBQzlHLEdBQUcsQ0FBQ0ssTUFBTSxFQUFFTCxHQUFHLENBQUNNLFVBQVUsQ0FBQztZQUMvRCxJQUFJbkQsRUFBRSxFQUFFO2NBQ0pBLEVBQUUsQ0FBQ3BPLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Y0FDeEJvRixVQUFVLENBQUM7Z0JBQUEsT0FBTXdHLEVBQUUsQ0FBQ3BPLFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQyxNQUFNLENBQUM7Y0FBQSxHQUFFLEdBQUcsQ0FBQztZQUN0RDtVQUNKO1VBQ0E7UUFDSixLQUFLLGdCQUFnQjtVQUNqQixJQUFJME8sR0FBRyxDQUFDc0IsTUFBTSxJQUFJdEIsR0FBRyxDQUFDdUIsVUFBVSxFQUFFO1lBQzlCLElBQU0wRyxLQUFLLE1BQUE5VixNQUFBLENBQU02TixHQUFHLENBQUN1QixVQUFVLE9BQUFwUCxNQUFBLENBQUk2TixHQUFHLENBQUNzQixNQUFNLENBQUU7WUFDL0MsSUFBSSxDQUFDOEYsVUFBVSxDQUFDYSxLQUFLLEVBQUUsc0JBQXNCLEVBQUUsSUFBSSxDQUFDO1lBQ3BELElBQUksQ0FBQ1osV0FBVyxDQUFDWSxLQUFLLEVBQUUsT0FBTyxDQUFDO1lBQ2hDLElBQU1DLFVBQVUsR0FBRyxJQUFJLENBQUNwQixtQkFBbUIsQ0FBQzlHLEdBQUcsQ0FBQ3NCLE1BQU0sRUFBRXRCLEdBQUcsQ0FBQ3VCLFVBQVUsQ0FBQztZQUN2RSxJQUFJMkcsVUFBVSxFQUFFO2NBQ1pBLFVBQVUsQ0FBQ25aLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyx1QkFBdUIsQ0FBQztjQUNqRG9GLFVBQVUsQ0FBQztnQkFBQSxPQUFNdVIsVUFBVSxDQUFDblosU0FBUyxDQUFDdUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDO2NBQUEsR0FBRSxJQUFJLENBQUM7WUFDaEY7VUFDSjtVQUNBLElBQUkwTyxHQUFHLENBQUNLLE1BQU0sSUFBSUwsR0FBRyxDQUFDTSxVQUFVLEVBQUU7WUFDOUIzSixVQUFVLENBQUMsWUFBTTtjQUNiLElBQU13UixVQUFVLEdBQUdqQixNQUFJLENBQUNKLG1CQUFtQixDQUFDOUcsR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxDQUFDO2NBQ3ZFLElBQUk2SCxVQUFVLEVBQUU7Z0JBQ1pBLFVBQVUsQ0FBQ3BaLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsTUFBTSxDQUFDO2dCQUN4Q29GLFVBQVUsQ0FBQztrQkFBQSxPQUFNd1IsVUFBVSxDQUFDcFosU0FBUyxDQUFDdUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7Z0JBQUEsR0FBRSxHQUFHLENBQUM7Y0FDdEU7WUFDSixDQUFDLEVBQUUsR0FBRyxDQUFDO1VBQ1g7VUFDQTtNQUNSO0lBQ0o7RUFBQztJQUFBeUcsR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUFxUixlQUFlQSxDQUFDdEcsVUFBVSxFQUFFO01BQUEsSUFBQTZHLE1BQUE7TUFDeEJwRixNQUFNLENBQUNDLElBQUksQ0FBQyxJQUFJLENBQUMvRyxpQkFBaUIsQ0FBQyxDQUFDdkwsT0FBTyxDQUFDLFVBQUFvSCxHQUFHLEVBQUk7UUFDL0MsSUFBSUEsR0FBRyxDQUFDbUwsVUFBVSxDQUFDM0IsVUFBVSxDQUFDLEVBQUU7VUFDNUIsSUFBTXBFLEVBQUUsR0FBR2lMLE1BQUksQ0FBQ2xNLGlCQUFpQixDQUFDbkUsR0FBRyxDQUFDO1VBQ3RDb0YsRUFBRSxDQUFDcE8sU0FBUyxDQUFDd0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztVQUMxQm9GLFVBQVUsQ0FBQztZQUFBLE9BQU13RyxFQUFFLENBQUNwTyxTQUFTLENBQUN1QyxNQUFNLENBQUMsUUFBUSxDQUFDO1VBQUEsR0FBRSxJQUFJLENBQUM7UUFDekQ7TUFDSixDQUFDLENBQUM7SUFDTjs7SUFFQTtFQUFBO0lBQUF5RyxHQUFBO0lBQUF2QixLQUFBLEVBRUEsU0FBQWtRLHNCQUFzQkEsQ0FBQzFHLEdBQUcsRUFBRTtNQUN4QixJQUFNcUksT0FBTyxHQUFHLElBQUksQ0FBQ3ZCLG1CQUFtQixDQUFDOUcsR0FBRyxDQUFDc0ksV0FBVyxFQUFFdEksR0FBRyxDQUFDM0MsSUFBSSxDQUFDO01BQ25FLElBQU16SyxPQUFPLEdBQUcsSUFBSSxDQUFDa1UsbUJBQW1CLENBQUM5RyxHQUFHLENBQUNtQyxXQUFXLEVBQUVuQyxHQUFHLENBQUMzQyxJQUFJLENBQUM7TUFFbkUsSUFBSWdMLE9BQU8sRUFBRTtRQUNUQSxPQUFPLENBQUN0WixTQUFTLENBQUN3QyxHQUFHLENBQUMsdUJBQXVCLENBQUM7UUFDOUNvRixVQUFVLENBQUM7VUFBQSxPQUFNMFIsT0FBTyxDQUFDdFosU0FBUyxDQUFDdUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDO1FBQUEsR0FBRSxJQUFJLENBQUM7TUFDN0U7TUFDQSxJQUFJc0IsT0FBTyxFQUFFO1FBQ1QrRCxVQUFVLENBQUMsWUFBTTtVQUNiL0QsT0FBTyxDQUFDN0QsU0FBUyxDQUFDd0MsR0FBRyxDQUFDLHVCQUF1QixDQUFDO1VBQzlDb0YsVUFBVSxDQUFDO1lBQUEsT0FBTS9ELE9BQU8sQ0FBQzdELFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQyx1QkFBdUIsQ0FBQztVQUFBLEdBQUUsSUFBSSxDQUFDO1FBQzdFLENBQUMsRUFBRSxHQUFHLENBQUM7TUFDWDs7TUFFQTtNQUNBLElBQUkrVyxPQUFPLElBQUl6VixPQUFPLEVBQUU7UUFDcEIsSUFBSSxDQUFDMlYsZUFBZSxDQUFDRixPQUFPLEVBQUV6VixPQUFPLENBQUM7TUFDMUM7SUFDSjtFQUFDO0lBQUFtRixHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQW1RLHFCQUFxQkEsQ0FBQzNHLEdBQUcsRUFBRTtNQUFBLElBQUF3SSxNQUFBO01BQ3ZCLElBQU1ILE9BQU8sR0FBRyxJQUFJLENBQUN2QixtQkFBbUIsQ0FBQzlHLEdBQUcsQ0FBQ3NJLFdBQVcsRUFBRXRJLEdBQUcsQ0FBQ3lJLGVBQWUsQ0FBQztNQUM5RSxJQUFNN1YsT0FBTyxHQUFHLElBQUksQ0FBQ2tVLG1CQUFtQixDQUFDOUcsR0FBRyxDQUFDbUMsV0FBVyxFQUFFbkMsR0FBRyxDQUFDb0MsZUFBZSxDQUFDOztNQUU5RTtNQUNBLElBQUlpRyxPQUFPLEVBQUU7UUFDVEEsT0FBTyxDQUFDdFosU0FBUyxDQUFDd0MsR0FBRyxDQUFDLHNCQUFzQixDQUFDO1FBQzdDb0YsVUFBVSxDQUFDO1VBQUEsT0FBTTBSLE9BQU8sQ0FBQ3RaLFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQyxzQkFBc0IsQ0FBQztRQUFBLEdBQUUsSUFBSSxDQUFDO01BQzVFOztNQUVBO01BQ0EsSUFBSStXLE9BQU8sSUFBSXpWLE9BQU8sRUFBRTtRQUNwQitELFVBQVUsQ0FBQztVQUFBLE9BQU02UixNQUFJLENBQUNELGVBQWUsQ0FBQ0YsT0FBTyxFQUFFelYsT0FBTyxDQUFDO1FBQUEsR0FBRSxHQUFHLENBQUM7TUFDakU7O01BRUE7TUFDQSxJQUFJQSxPQUFPLEVBQUU7UUFDVCtELFVBQVUsQ0FBQyxZQUFNO1VBQ2IvRCxPQUFPLENBQUM3RCxTQUFTLENBQUN3QyxHQUFHLENBQUMsZUFBZSxDQUFDO1VBQ3RDb0YsVUFBVSxDQUFDO1lBQUEsT0FBTS9ELE9BQU8sQ0FBQzdELFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQyxlQUFlLENBQUM7VUFBQSxHQUFFLEdBQUcsQ0FBQzs7VUFFaEU7VUFDQSxJQUFJME8sR0FBRyxDQUFDNEMsTUFBTSxLQUFLbkMsU0FBUyxJQUFJVCxHQUFHLENBQUNLLE1BQU0sRUFBRTtZQUN4QyxJQUFNcUksVUFBVSxNQUFBdlcsTUFBQSxDQUFNNk4sR0FBRyxDQUFDb0MsZUFBZSxPQUFBalEsTUFBQSxDQUFJNk4sR0FBRyxDQUFDbUMsV0FBVyxDQUFFO1lBQzlEcUcsTUFBSSxDQUFDcEIsVUFBVSxDQUFDc0IsVUFBVSxFQUFFLHNCQUFzQixFQUFFLElBQUksQ0FBQztZQUN6REYsTUFBSSxDQUFDbkIsV0FBVyxDQUFDcUIsVUFBVSxFQUFFLFFBQVEsQ0FBQztZQUV0QyxJQUFNckksTUFBTSxHQUFHbUksTUFBSSxDQUFDMUIsbUJBQW1CLENBQUM5RyxHQUFHLENBQUNLLE1BQU0sRUFBRUwsR0FBRyxDQUFDTSxVQUFVLENBQUM7WUFDbkUsSUFBSUQsTUFBTSxFQUFFO2NBQ1IxSixVQUFVLENBQUMsWUFBTTtnQkFDYjBKLE1BQU0sQ0FBQ3RSLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxNQUFNLENBQUM7Z0JBQzVCb0YsVUFBVSxDQUFDO2tCQUFBLE9BQU0wSixNQUFNLENBQUN0UixTQUFTLENBQUN1QyxNQUFNLENBQUMsTUFBTSxDQUFDO2dCQUFBLEdBQUUsR0FBRyxDQUFDO2NBQzFELENBQUMsRUFBRSxHQUFHLENBQUM7WUFDWDtVQUNKO1FBQ0osQ0FBQyxFQUFFLEdBQUcsQ0FBQztNQUNYO0lBQ0o7RUFBQztJQUFBeUcsR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUErUixlQUFlQSxDQUFDSSxHQUFHLEVBQUVDLEdBQUcsRUFBRTtNQUN0QixJQUFNQyxLQUFLLEdBQUcsSUFBSSxDQUFDcFQsU0FBUyxDQUFDNUcsYUFBYSxDQUFDLGVBQWUsQ0FBQztNQUMzRCxJQUFJLENBQUNnYSxLQUFLLEVBQUU7O01BRVo7TUFDQSxJQUFNQyxXQUFXLEdBQUdELEtBQUssQ0FBQ2hhLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQztNQUM1RCxJQUFJaWEsV0FBVyxFQUFFQSxXQUFXLENBQUN4WCxNQUFNLENBQUMsQ0FBQztNQUVyQyxJQUFNeVgsR0FBRyxHQUFHemEsUUFBUSxDQUFDMGEsZUFBZSxDQUFDLDRCQUE0QixFQUFFLEtBQUssQ0FBQztNQUN6RUQsR0FBRyxDQUFDaGEsU0FBUyxDQUFDd0MsR0FBRyxDQUFDLGtCQUFrQixDQUFDO01BQ3JDd1gsR0FBRyxDQUFDRSxZQUFZLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQztNQUNqQ0YsR0FBRyxDQUFDRSxZQUFZLENBQUMsUUFBUSxFQUFFLE1BQU0sQ0FBQztNQUVsQyxJQUFNQyxTQUFTLEdBQUdMLEtBQUssQ0FBQ00scUJBQXFCLENBQUMsQ0FBQztNQUMvQyxJQUFNQyxLQUFLLEdBQUdULEdBQUcsQ0FBQ1EscUJBQXFCLENBQUMsQ0FBQztNQUN6QyxJQUFNRSxLQUFLLEdBQUdULEdBQUcsQ0FBQ08scUJBQXFCLENBQUMsQ0FBQztNQUV6QyxJQUFNRyxFQUFFLEdBQUdGLEtBQUssQ0FBQ0csSUFBSSxHQUFHSCxLQUFLLENBQUNJLEtBQUssR0FBRyxDQUFDLEdBQUdOLFNBQVMsQ0FBQ0ssSUFBSTtNQUN4RCxJQUFNRSxFQUFFLEdBQUdMLEtBQUssQ0FBQ00sR0FBRyxHQUFHTixLQUFLLENBQUNPLE1BQU0sR0FBRyxDQUFDLEdBQUdULFNBQVMsQ0FBQ1EsR0FBRztNQUN2RCxJQUFNRSxFQUFFLEdBQUdQLEtBQUssQ0FBQ0UsSUFBSSxHQUFHRixLQUFLLENBQUNHLEtBQUssR0FBRyxDQUFDLEdBQUdOLFNBQVMsQ0FBQ0ssSUFBSTtNQUN4RCxJQUFNTSxFQUFFLEdBQUdSLEtBQUssQ0FBQ0ssR0FBRyxHQUFHTCxLQUFLLENBQUNNLE1BQU0sR0FBRyxDQUFDLEdBQUdULFNBQVMsQ0FBQ1EsR0FBRztNQUV2RCxJQUFNSSxJQUFJLEdBQUd4YixRQUFRLENBQUMwYSxlQUFlLENBQUMsNEJBQTRCLEVBQUUsTUFBTSxDQUFDO01BQzNFYyxJQUFJLENBQUMvYSxTQUFTLENBQUN3QyxHQUFHLENBQUMsbUJBQW1CLENBQUM7TUFDdkN1WSxJQUFJLENBQUNiLFlBQVksQ0FBQyxJQUFJLEVBQUVLLEVBQUUsQ0FBQztNQUMzQlEsSUFBSSxDQUFDYixZQUFZLENBQUMsSUFBSSxFQUFFUSxFQUFFLENBQUM7TUFDM0JLLElBQUksQ0FBQ2IsWUFBWSxDQUFDLElBQUksRUFBRVcsRUFBRSxDQUFDO01BQzNCRSxJQUFJLENBQUNiLFlBQVksQ0FBQyxJQUFJLEVBQUVZLEVBQUUsQ0FBQztNQUUzQmQsR0FBRyxDQUFDdmEsV0FBVyxDQUFDc2IsSUFBSSxDQUFDO01BQ3JCakIsS0FBSyxDQUFDcmEsV0FBVyxDQUFDdWEsR0FBRyxDQUFDOztNQUV0QjtNQUNBcFMsVUFBVSxDQUFDO1FBQUEsT0FBTW9TLEdBQUcsQ0FBQ3pYLE1BQU0sQ0FBQyxDQUFDO01BQUEsR0FBRSxJQUFJLEdBQUcsSUFBSSxDQUFDbkMsS0FBSyxDQUFDO0lBQ3JEOztJQUVBO0VBQUE7SUFBQTRJLEdBQUE7SUFBQXZCLEtBQUEsRUFFQSxTQUFBNFEsVUFBVUEsQ0FBQ3JQLEdBQUcsRUFBRWdTLFVBQVUsRUFBRXhKLFFBQVEsRUFBRTtNQUFBLElBQUF5SixNQUFBO01BQ2xDLElBQU03TSxFQUFFLEdBQUcsSUFBSSxDQUFDakIsaUJBQWlCLENBQUNuRSxHQUFHLENBQUM7TUFDdEMsSUFBSSxDQUFDb0YsRUFBRSxFQUFFO01BQ1QsSUFBTThNLElBQUksR0FBRyxJQUFJLENBQUNsTixjQUFjLENBQUNoRixHQUFHLENBQUM7TUFDckMsSUFBSSxDQUFDa1MsSUFBSSxFQUFFO01BQ1gsSUFBTUMsR0FBRyxHQUFHL00sRUFBRSxDQUFDdE8sYUFBYSxDQUFDLG1CQUFtQixDQUFDO01BQ2pELElBQUksQ0FBQ3FiLEdBQUcsRUFBRTtNQUNWQSxHQUFHLENBQUNDLEdBQUcsd0JBQUFoWSxNQUFBLENBQXdCOFgsSUFBSSxPQUFBOVgsTUFBQSxDQUFJNFgsVUFBVSxDQUFFO01BQ25ELElBQUl4SixRQUFRLEdBQUcsQ0FBQyxFQUFFO1FBQ2Q1SixVQUFVLENBQUMsWUFBTTtVQUNiLElBQUksQ0FBQ3dHLEVBQUUsQ0FBQ3BPLFNBQVMsQ0FBQ3FiLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtZQUNoQ0YsR0FBRyxDQUFDQyxHQUFHLHdCQUFBaFksTUFBQSxDQUF3QjZYLE1BQUksQ0FBQ2pOLGNBQWMsQ0FBQ2hGLEdBQUcsQ0FBQyxvQkFBaUI7VUFDNUU7UUFDSixDQUFDLEVBQUV3SSxRQUFRLENBQUM7TUFDaEI7SUFDSjs7SUFFQTtFQUFBO0lBQUF4SSxHQUFBO0lBQUF2QixLQUFBLEVBRUEsU0FBQXNQLGFBQWFBLENBQUN1RSxZQUFZLEVBQUUxSixZQUFZLEVBQUVpRyxVQUFVLEVBQUV0RyxVQUFVLEVBQUV5RixNQUFNLEVBQUU7TUFDdEUsSUFBTXJGLFFBQVEsR0FBRyxJQUFJLENBQUNvRyxtQkFBbUIsQ0FBQ3VELFlBQVksRUFBRTFKLFlBQVksQ0FBQztNQUNyRSxJQUFNTixNQUFNLEdBQUcsSUFBSSxDQUFDeUcsbUJBQW1CLENBQUNGLFVBQVUsRUFBRXRHLFVBQVUsQ0FBQztNQUUvRCxJQUFJSSxRQUFRLEVBQUU7UUFDVixJQUFNM0ksR0FBRyxNQUFBNUYsTUFBQSxDQUFNd08sWUFBWSxPQUFBeE8sTUFBQSxDQUFJa1ksWUFBWSxDQUFFO1FBQzdDLElBQUksQ0FBQ2pELFVBQVUsQ0FBQ3JQLEdBQUcsRUFBRSxzQkFBc0IsRUFBRSxJQUFJLENBQUM7UUFDbEQySSxRQUFRLENBQUMzUixTQUFTLENBQUN3QyxHQUFHLENBQUMsV0FBVyxDQUFDO1FBQ25DLElBQUksQ0FBQzhWLFdBQVcsQ0FBQ3RQLEdBQUcsRUFBRSxRQUFRLENBQUM7UUFDL0JwQixVQUFVLENBQUM7VUFBQSxPQUFNK0osUUFBUSxDQUFDM1IsU0FBUyxDQUFDdUMsTUFBTSxDQUFDLFdBQVcsQ0FBQztRQUFBLEdBQUUsSUFBSSxDQUFDO01BQ2xFO01BRUEsSUFBSStPLE1BQU0sRUFBRTtRQUNSMUosVUFBVSxDQUFDLFlBQU07VUFDYjBKLE1BQU0sQ0FBQ3RSLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxNQUFNLENBQUM7VUFDNUIsSUFBSXdVLE1BQU0sRUFBRTFGLE1BQU0sQ0FBQ3RSLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxNQUFNLENBQUM7VUFDeENvRixVQUFVLENBQUM7WUFBQSxPQUFNMEosTUFBTSxDQUFDdFIsU0FBUyxDQUFDdUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxNQUFNLENBQUM7VUFBQSxHQUFFLEdBQUcsQ0FBQztRQUNsRSxDQUFDLEVBQUUsR0FBRyxDQUFDO01BQ1g7SUFDSjtFQUFDO0lBQUF5RyxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQXdQLFdBQVdBLENBQUNzRSxVQUFVLEVBQUVwRSxVQUFVLEVBQUVVLFVBQVUsRUFBRXRHLFVBQVUsRUFBRTtNQUN4RCxJQUFNMkYsTUFBTSxHQUFHLElBQUksQ0FBQ2EsbUJBQW1CLENBQUN3RCxVQUFVLEVBQUVwRSxVQUFVLENBQUM7TUFDL0QsSUFBTTdGLE1BQU0sR0FBRyxJQUFJLENBQUN5RyxtQkFBbUIsQ0FBQ0YsVUFBVSxFQUFFdEcsVUFBVSxDQUFDO01BRS9ELElBQUkyRixNQUFNLEVBQUU7UUFDUixJQUFNbE8sR0FBRyxNQUFBNUYsTUFBQSxDQUFNK1QsVUFBVSxPQUFBL1QsTUFBQSxDQUFJbVksVUFBVSxDQUFFO1FBQ3pDLElBQUksSUFBSSxDQUFDdE4sZ0JBQWdCLENBQUNqRixHQUFHLENBQUMsRUFBRTtVQUM1QixJQUFJLENBQUNxUCxVQUFVLENBQUNyUCxHQUFHLEVBQUUsY0FBYyxFQUFFLElBQUksQ0FBQztRQUM5QyxDQUFDLE1BQU07VUFDSCxJQUFJLENBQUNxUCxVQUFVLENBQUNyUCxHQUFHLEVBQUUsWUFBWSxFQUFFLElBQUksQ0FBQztRQUM1QztRQUNBa08sTUFBTSxDQUFDbFgsU0FBUyxDQUFDd0MsR0FBRyxDQUFDLFNBQVMsQ0FBQztRQUMvQixJQUFJLENBQUM4VixXQUFXLENBQUN0UCxHQUFHLEVBQUUsTUFBTSxDQUFDO1FBQzdCcEIsVUFBVSxDQUFDO1VBQUEsT0FBTXNQLE1BQU0sQ0FBQ2xYLFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFBQSxHQUFFLElBQUksQ0FBQztNQUM5RDtNQUVBLElBQUkrTyxNQUFNLEVBQUU7UUFDUkEsTUFBTSxDQUFDdFIsU0FBUyxDQUFDd0MsR0FBRyxDQUFDLFFBQVEsQ0FBQztRQUM5Qm9GLFVBQVUsQ0FBQztVQUFBLE9BQU0wSixNQUFNLENBQUN0UixTQUFTLENBQUN1QyxNQUFNLENBQUMsUUFBUSxDQUFDO1FBQUEsR0FBRSxJQUFJLENBQUM7TUFDN0Q7SUFDSjtFQUFDO0lBQUF5RyxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQTJQLGFBQWFBLENBQUNvRSxZQUFZLEVBQUVsRSxZQUFZLEVBQUU7TUFDdEMsSUFBTUQsUUFBUSxHQUFHLElBQUksQ0FBQ1UsbUJBQW1CLENBQUN5RCxZQUFZLEVBQUVsRSxZQUFZLENBQUM7TUFDckUsSUFBSUQsUUFBUSxFQUFFO1FBQ1YsSUFBTXJPLEdBQUcsTUFBQTVGLE1BQUEsQ0FBTWtVLFlBQVksT0FBQWxVLE1BQUEsQ0FBSW9ZLFlBQVksQ0FBRTtRQUM3QyxJQUFJLENBQUNuRCxVQUFVLENBQUNyUCxHQUFHLEVBQUUsZ0JBQWdCLEVBQUUsSUFBSSxDQUFDO1FBQzVDcU8sUUFBUSxDQUFDclgsU0FBUyxDQUFDd0MsR0FBRyxDQUFDLFdBQVcsQ0FBQztRQUNuQyxJQUFJLENBQUM4VixXQUFXLENBQUN0UCxHQUFHLEVBQUUsT0FBTyxDQUFDO1FBQzlCcEIsVUFBVSxDQUFDO1VBQUEsT0FBTXlQLFFBQVEsQ0FBQ3JYLFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQyxXQUFXLENBQUM7UUFBQSxHQUFFLElBQUksQ0FBQztNQUNsRTtJQUNKO0VBQUM7SUFBQXlHLEdBQUE7SUFBQXZCLEtBQUEsRUFFRCxTQUFBOFAsWUFBWUEsQ0FBQ00sVUFBVSxFQUFFdEcsVUFBVSxFQUFFO01BQ2pDLElBQU1ELE1BQU0sR0FBRyxJQUFJLENBQUN5RyxtQkFBbUIsQ0FBQ0YsVUFBVSxFQUFFdEcsVUFBVSxDQUFDO01BQy9ELElBQUlELE1BQU0sRUFBRTtRQUNSQSxNQUFNLENBQUN0UixTQUFTLENBQUN3QyxHQUFHLENBQUMsU0FBUyxDQUFDO1FBQy9Cb0YsVUFBVSxDQUFDO1VBQUEsT0FBTTBKLE1BQU0sQ0FBQ3RSLFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQyxTQUFTLENBQUM7UUFBQSxHQUFFLElBQUksQ0FBQztNQUM5RDtJQUNKO0VBQUM7SUFBQXlHLEdBQUE7SUFBQXZCLEtBQUEsRUFFRCxTQUFBa08sWUFBWUEsQ0FBQ2tDLFVBQVUsRUFBRXRHLFVBQVUsRUFBRTtNQUNqQyxJQUFNRCxNQUFNLEdBQUcsSUFBSSxDQUFDeUcsbUJBQW1CLENBQUNGLFVBQVUsRUFBRXRHLFVBQVUsQ0FBQztNQUMvRCxJQUFJLENBQUNELE1BQU0sRUFBRTtNQUViLElBQU10SSxHQUFHLE1BQUE1RixNQUFBLENBQU1tTyxVQUFVLE9BQUFuTyxNQUFBLENBQUl5VSxVQUFVLENBQUU7TUFDekMsSUFBTXFELElBQUksR0FBRyxJQUFJLENBQUNsTixjQUFjLENBQUNoRixHQUFHLENBQUM7TUFDckMsSUFBTW1TLEdBQUcsR0FBRzdKLE1BQU0sQ0FBQ3hSLGFBQWEsQ0FBQyxtQkFBbUIsQ0FBQzs7TUFFckQ7TUFDQSxJQUFJcWIsR0FBRyxJQUFJRCxJQUFJLEVBQUU7UUFDYixJQUFNTyxTQUFTLEdBQUcsSUFBSUMsS0FBSyxDQUFDLENBQUM7UUFDN0JELFNBQVMsQ0FBQ0wsR0FBRyx3QkFBQWhZLE1BQUEsQ0FBd0I4WCxJQUFJLGdCQUFhO1FBQ3RETyxTQUFTLENBQUNFLE1BQU0sR0FBRyxZQUFNO1VBQ3JCUixHQUFHLENBQUNDLEdBQUcsR0FBR0ssU0FBUyxDQUFDTCxHQUFHO1VBQ3ZCOUosTUFBTSxDQUFDdFIsU0FBUyxDQUFDd0MsR0FBRyxDQUFDLE1BQU0sRUFBRSxjQUFjLENBQUM7UUFDaEQsQ0FBQztRQUNEaVosU0FBUyxDQUFDRyxPQUFPLEdBQUcsWUFBTTtVQUN0QjtVQUNBdEssTUFBTSxDQUFDdFIsU0FBUyxDQUFDd0MsR0FBRyxDQUFDLE1BQU0sQ0FBQztRQUNoQyxDQUFDO01BQ0wsQ0FBQyxNQUFNO1FBQ0g4TyxNQUFNLENBQUN0UixTQUFTLENBQUN3QyxHQUFHLENBQUMsTUFBTSxDQUFDO01BQ2hDO0lBQ0o7RUFBQztJQUFBd0csR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUFzUSxtQkFBbUJBLENBQUN0VixJQUFJLEVBQUU2TCxJQUFJLEVBQUU7TUFDNUIsT0FBTyxJQUFJLENBQUNuQixpQkFBaUIsSUFBQS9KLE1BQUEsQ0FBSWtMLElBQUksT0FBQWxMLE1BQUEsQ0FBSVgsSUFBSSxFQUFHO0lBQ3BEO0VBQUM7SUFBQXVHLEdBQUE7SUFBQXZCLEtBQUEsRUFFRCxTQUFBK04sVUFBVUEsQ0FBQ3ZFLEdBQUcsRUFBRTtNQUNaLElBQUksQ0FBQyxJQUFJLENBQUN0RCxZQUFZLEVBQUU7TUFFeEIsSUFBTWtPLEtBQUssR0FBR3RjLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEdBQUcsQ0FBQztNQUN6Q3FjLEtBQUssQ0FBQ3RWLFNBQVMsR0FBRyxtQkFBbUI7TUFFckMsSUFBSTBLLEdBQUcsQ0FBQ0MsSUFBSSxLQUFLLE9BQU8sRUFBRTtRQUN0QjJLLEtBQUssQ0FBQzdiLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQztNQUNuRCxDQUFDLE1BQU0sSUFBSXlPLEdBQUcsQ0FBQ0MsSUFBSSxLQUFLLFNBQVMsRUFBRTtRQUMvQjJLLEtBQUssQ0FBQzdiLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQztNQUNyRCxDQUFDLE1BQU0sSUFBSXlPLEdBQUcsQ0FBQ0MsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUM1QjJLLEtBQUssQ0FBQzdiLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztNQUNwRCxDQUFDLE1BQU0sSUFBSXlPLEdBQUcsQ0FBQ0MsSUFBSSxLQUFLLGFBQWEsRUFBRTtRQUNuQzJLLEtBQUssQ0FBQzdiLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyw0QkFBNEIsQ0FBQztNQUNyRCxDQUFDLE1BQU0sSUFBSXlPLEdBQUcsQ0FBQ0MsSUFBSSxLQUFLLFlBQVksRUFBRTtRQUNsQzJLLEtBQUssQ0FBQzdiLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQztNQUNuRCxDQUFDLE1BQU0sSUFBSXlPLEdBQUcsQ0FBQ0MsSUFBSSxLQUFLLGFBQWEsRUFBRTtRQUNuQzJLLEtBQUssQ0FBQzdiLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQywyQkFBMkIsQ0FBQztNQUNwRCxDQUFDLE1BQU0sSUFBSXlPLEdBQUcsQ0FBQ0MsSUFBSSxLQUFLLGNBQWMsRUFBRTtRQUNwQzJLLEtBQUssQ0FBQzdiLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyx5QkFBeUIsQ0FBQztNQUNsRCxDQUFDLE1BQU0sSUFBSXlPLEdBQUcsQ0FBQ0MsSUFBSSxLQUFLLGtCQUFrQixFQUFFO1FBQ3hDMkssS0FBSyxDQUFDN2IsU0FBUyxDQUFDd0MsR0FBRyxDQUFDLDRCQUE0QixDQUFDO01BQ3JELENBQUMsTUFBTSxJQUFJeU8sR0FBRyxDQUFDQyxJQUFJLEtBQUssa0JBQWtCLEVBQUU7UUFDeEMySyxLQUFLLENBQUM3YixTQUFTLENBQUN3QyxHQUFHLENBQUMscUNBQXFDLENBQUM7TUFDOUQsQ0FBQyxNQUFNLElBQUl5TyxHQUFHLENBQUNDLElBQUksS0FBSyxpQkFBaUIsRUFBRTtRQUN2QzJLLEtBQUssQ0FBQzdiLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxvQ0FBb0MsQ0FBQztNQUM3RDtNQUVBcVosS0FBSyxDQUFDbGMsU0FBUyxHQUFHc1IsR0FBRyxDQUFDNkssT0FBTztNQUM3QixJQUFJLENBQUNuTyxZQUFZLENBQUNsTyxXQUFXLENBQUNvYyxLQUFLLENBQUM7TUFDcEMsSUFBSSxDQUFDbE8sWUFBWSxDQUFDb08sU0FBUyxHQUFHLElBQUksQ0FBQ3BPLFlBQVksQ0FBQ3FPLFlBQVk7SUFDaEU7RUFBQztJQUFBaFQsR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUFnTyxnQkFBZ0JBLENBQUN4RSxHQUFHLEVBQUU7TUFDbEIsSUFBSTVDLGFBQWEsR0FBRyxJQUFJO01BQ3hCLElBQUl1RixRQUFRLEdBQUcsSUFBSTtNQUNuQixJQUFJcUksU0FBUyxHQUFHLElBQUk7TUFDcEIsSUFBSUMsS0FBSyxHQUFHLElBQUk7O01BRWhCO01BQ0EsSUFBSWpMLEdBQUcsQ0FBQ0MsSUFBSSxLQUFLLFFBQVEsSUFBSUQsR0FBRyxDQUFDQyxJQUFJLEtBQUssa0JBQWtCLEVBQUU7UUFDMUQ3QyxhQUFhLEdBQUc0QyxHQUFHLENBQUNLLE1BQU07UUFDMUJzQyxRQUFRLEdBQUczQyxHQUFHLENBQUNNLFVBQVU7UUFDekIwSyxTQUFTLEdBQUdoTCxHQUFHLENBQUMyRSxRQUFRO1FBQ3hCc0csS0FBSyxHQUFHakwsR0FBRyxDQUFDa0wsV0FBVztNQUMzQixDQUFDLE1BQU0sSUFBSWxMLEdBQUcsQ0FBQ0MsSUFBSSxLQUFLLE1BQU0sRUFBRTtRQUM1QjdDLGFBQWEsR0FBRzRDLEdBQUcsQ0FBQ0ssTUFBTTtRQUMxQnNDLFFBQVEsR0FBRzNDLEdBQUcsQ0FBQ00sVUFBVTtRQUN6QjBLLFNBQVMsR0FBR2hMLEdBQUcsQ0FBQzJFLFFBQVE7UUFDeEJzRyxLQUFLLEdBQUdqTCxHQUFHLENBQUNrTCxXQUFXO01BQzNCLENBQUMsTUFBTSxJQUFJbEwsR0FBRyxDQUFDQyxJQUFJLEtBQUssWUFBWSxJQUFJRCxHQUFHLENBQUNDLElBQUksS0FBSyxhQUFhLEVBQUU7UUFDaEU3QyxhQUFhLEdBQUc0QyxHQUFHLENBQUNLLE1BQU07UUFDMUJzQyxRQUFRLEdBQUczQyxHQUFHLENBQUNNLFVBQVU7UUFDekIwSyxTQUFTLEdBQUdoTCxHQUFHLENBQUMyRSxRQUFRO1FBQ3hCc0csS0FBSyxHQUFHakwsR0FBRyxDQUFDa0wsV0FBVztNQUMzQixDQUFDLE1BQU0sSUFBSWxMLEdBQUcsQ0FBQ0MsSUFBSSxLQUFLLGFBQWEsRUFBRTtRQUNuQyxJQUFJLENBQUNrTCx1QkFBdUIsQ0FBQ25MLEdBQUcsQ0FBQztRQUNqQztNQUNKLENBQUMsTUFBTSxJQUFJQSxHQUFHLENBQUNDLElBQUksS0FBSyxpQkFBaUIsRUFBRTtRQUN2QztRQUNBLElBQUlELEdBQUcsQ0FBQ0ssTUFBTSxJQUFJTCxHQUFHLENBQUMyRSxRQUFRLEtBQUtsRSxTQUFTLElBQUlULEdBQUcsQ0FBQ2tMLFdBQVcsRUFBRTtVQUM3RDlOLGFBQWEsR0FBRzRDLEdBQUcsQ0FBQ0ssTUFBTTtVQUMxQnNDLFFBQVEsR0FBRzNDLEdBQUcsQ0FBQ00sVUFBVTtVQUN6QjBLLFNBQVMsR0FBR2hMLEdBQUcsQ0FBQzJFLFFBQVE7VUFDeEJzRyxLQUFLLEdBQUdqTCxHQUFHLENBQUNrTCxXQUFXO1FBQzNCO01BQ0o7O01BRUE7TUFDQSxJQUFJOU4sYUFBYSxJQUFJdUYsUUFBUSxJQUFJcUksU0FBUyxLQUFLLElBQUksSUFBSUEsU0FBUyxLQUFLdkssU0FBUyxJQUFJd0ssS0FBSyxFQUFFO1FBQ3JGLElBQUksQ0FBQ0csaUJBQWlCLENBQUNoTyxhQUFhLEVBQUV1RixRQUFRLEVBQUVxSSxTQUFTLEVBQUVDLEtBQUssQ0FBQztNQUNyRTtJQUNKO0VBQUM7SUFBQWxULEdBQUE7SUFBQXZCLEtBQUEsRUFFRCxTQUFBMlUsdUJBQXVCQSxDQUFDbkwsR0FBRyxFQUFFO01BQUEsSUFBQXFMLE1BQUE7TUFDekI7TUFDQSxJQUFJckwsR0FBRyxDQUFDaUIsT0FBTyxFQUFFO1FBQ2JqQixHQUFHLENBQUNpQixPQUFPLENBQUN0USxPQUFPLENBQUMsVUFBQStDLENBQUMsRUFBSTtVQUNyQjJYLE1BQUksQ0FBQ0QsaUJBQWlCLENBQUMxWCxDQUFDLENBQUNsQyxJQUFJLEVBQUVrQyxDQUFDLENBQUMySixJQUFJLEVBQUUzSixDQUFDLENBQUNwRSxFQUFFLEVBQUVvRSxDQUFDLENBQUM0WCxLQUFLLENBQUM7UUFDekQsQ0FBQyxDQUFDO01BQ047TUFDQTtNQUFBLEtBQ0ssSUFBSXRMLEdBQUcsQ0FBQ0ssTUFBTSxJQUFJTCxHQUFHLENBQUMyRSxRQUFRLEtBQUtsRSxTQUFTLElBQUlULEdBQUcsQ0FBQ2tMLFdBQVcsRUFBRTtRQUNsRSxJQUFJLENBQUNFLGlCQUFpQixDQUFDcEwsR0FBRyxDQUFDSyxNQUFNLEVBQUVMLEdBQUcsQ0FBQ00sVUFBVSxFQUFFTixHQUFHLENBQUMyRSxRQUFRLEVBQUUzRSxHQUFHLENBQUNrTCxXQUFXLENBQUM7TUFDckY7O01BRUE7TUFDQSxJQUFJbEwsR0FBRyxDQUFDZSxPQUFPLEtBQUssWUFBWSxJQUFJZixHQUFHLENBQUMySCxNQUFNLEVBQUU7UUFDNUMzSCxHQUFHLENBQUMySCxNQUFNLENBQUNoWCxPQUFPLENBQUMsVUFBQStDLENBQUMsRUFBSTtVQUNwQjJYLE1BQUksQ0FBQ0QsaUJBQWlCLENBQUMxWCxDQUFDLENBQUNsQyxJQUFJLEVBQUVrQyxDQUFDLENBQUMySixJQUFJLEVBQUUzSixDQUFDLENBQUNwRSxFQUFFLEVBQUVvRSxDQUFDLENBQUM0WCxLQUFLLENBQUM7UUFDekQsQ0FBQyxDQUFDO01BQ047O01BRUE7TUFDQSxJQUFJdEwsR0FBRyxDQUFDZSxPQUFPLEtBQUssZ0JBQWdCLElBQUlmLEdBQUcsQ0FBQ3NCLE1BQU0sRUFBRTtRQUNoRCxJQUFJLENBQUM4SixpQkFBaUIsQ0FBQ3BMLEdBQUcsQ0FBQ3NCLE1BQU0sRUFBRXRCLEdBQUcsQ0FBQ3VCLFVBQVUsRUFBRXZCLEdBQUcsQ0FBQzJFLFFBQVEsRUFBRTNFLEdBQUcsQ0FBQ2tMLFdBQVcsQ0FBQztNQUNyRjtJQUNKO0VBQUM7SUFBQW5ULEdBQUE7SUFBQXZCLEtBQUEsRUFFRCxTQUFBNFUsaUJBQWlCQSxDQUFDaE8sYUFBYSxFQUFFdUYsUUFBUSxFQUFFcUksU0FBUyxFQUFFQyxLQUFLLEVBQUU7TUFDekQsSUFBTTVLLE1BQU0sR0FBRyxJQUFJLENBQUN5RyxtQkFBbUIsQ0FBQzFKLGFBQWEsRUFBRXVGLFFBQVEsQ0FBQztNQUVoRSxJQUFJLENBQUN0QyxNQUFNLEVBQUU7UUFDVDtNQUNKO01BRUEsSUFBTWtMLE9BQU8sR0FBR04sS0FBSyxHQUFHLENBQUMsR0FBSUQsU0FBUyxHQUFHQyxLQUFLLEdBQUksR0FBRyxHQUFHLENBQUM7O01BRXpEO01BQ0EsSUFBTU8sS0FBSyxHQUFHbkwsTUFBTSxDQUFDeFIsYUFBYSxDQUFDLGVBQWUsQ0FBQztNQUNuRCxJQUFNNE8sTUFBTSxHQUFHNEMsTUFBTSxDQUFDeFIsYUFBYSxDQUFDLFVBQVUsQ0FBQztNQUUvQyxJQUFJMmMsS0FBSyxFQUFFO1FBQ1A7UUFDQUEsS0FBSyxDQUFDL1UsS0FBSyxDQUFDZ1YsVUFBVSx3QkFBd0I7UUFDOUNELEtBQUssQ0FBQy9VLEtBQUssQ0FBQytTLEtBQUssTUFBQXJYLE1BQUEsQ0FBTW9aLE9BQU8sTUFBRzs7UUFFakM7UUFDQUMsS0FBSyxDQUFDemMsU0FBUyxDQUFDdUMsTUFBTSxDQUFDLG1CQUFtQixFQUFFLHdCQUF3QixDQUFDO1FBQ3JFLElBQUlpYSxPQUFPLElBQUksRUFBRSxFQUFFO1VBQ2ZDLEtBQUssQ0FBQ3pjLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyx3QkFBd0IsQ0FBQztRQUNqRCxDQUFDLE1BQU0sSUFBSWdhLE9BQU8sSUFBSSxFQUFFLEVBQUU7VUFDdEJDLEtBQUssQ0FBQ3pjLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQztRQUM1QztNQUNKO01BRUEsSUFBSWtNLE1BQU0sRUFBRTtRQUNSQSxNQUFNLENBQUNwSyxXQUFXLE1BQUFsQixNQUFBLENBQU02WSxTQUFTLE9BQUE3WSxNQUFBLENBQUk4WSxLQUFLLENBQUU7TUFDaEQ7O01BRUE7TUFDQSxJQUFJLENBQUNTLGVBQWUsQ0FBQ3RPLGFBQWEsRUFBRXVGLFFBQVEsRUFBRXFJLFNBQVMsQ0FBQztJQUM1RDtFQUFDO0lBQUFqVCxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQWtWLGVBQWVBLENBQUN0TyxhQUFhLEVBQUV1RixRQUFRLEVBQUVxSSxTQUFTLEVBQUU7TUFDaEQ7TUFDQSxJQUFNVyxVQUFVLEdBQUdoSixRQUFRLEtBQUssVUFBVSxHQUFHLG9CQUFvQixHQUFHLG9CQUFvQjtNQUN4RixJQUFNaUosS0FBSyxHQUFHLElBQUksQ0FBQ25XLFNBQVMsQ0FBQzVHLGFBQWEsQ0FBQzhjLFVBQVUsQ0FBQztNQUV0RCxJQUFJLENBQUNDLEtBQUssRUFBRTs7TUFFWjtNQUNBLElBQU1DLGNBQWMsR0FBR0QsS0FBSyxDQUFDcGMsZ0JBQWdCLENBQUMsaUJBQWlCLENBQUM7TUFBQyxJQUFBc2MsU0FBQSxHQUFBQywwQkFBQSxDQUM5Q0YsY0FBYztRQUFBRyxLQUFBO01BQUE7UUFBQSxJQUFBQyxLQUFBLFlBQUFBLE1BQUEsRUFBRTtVQUFBLElBQXhCQyxJQUFJLEdBQUFGLEtBQUEsQ0FBQXhWLEtBQUE7VUFDWCxJQUFNMEgsTUFBTSxHQUFHZ08sSUFBSSxDQUFDcmQsYUFBYSxDQUFDLHVCQUF1QixDQUFDO1VBQzFELElBQUlxUCxNQUFNLElBQUlBLE1BQU0sQ0FBQzdLLFdBQVcsQ0FBQ3dELElBQUksQ0FBQyxDQUFDLEtBQUt1RyxhQUFhLEVBQUU7WUFDdkQsSUFBTStPLFNBQVMsR0FBR0QsSUFBSSxDQUFDcmQsYUFBYSxDQUFDLDZCQUE2QixDQUFDO1lBQ25FLElBQUlzZCxTQUFTLEVBQUU7Y0FDWEEsU0FBUyxDQUFDOVksV0FBVyxHQUFHMlgsU0FBUzs7Y0FFakM7Y0FDQW1CLFNBQVMsQ0FBQ3BkLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxZQUFZLENBQUM7Y0FDckNvRixVQUFVLENBQUM7Z0JBQUEsT0FBTXdWLFNBQVMsQ0FBQ3BkLFNBQVMsQ0FBQ3VDLE1BQU0sQ0FBQyxZQUFZLENBQUM7Y0FBQSxHQUFFLEdBQUcsQ0FBQztZQUNuRTtZQUFDO1VBRUw7UUFDSixDQUFDO1FBYkQsS0FBQXdhLFNBQUEsQ0FBQW5aLENBQUEsTUFBQXFaLEtBQUEsR0FBQUYsU0FBQSxDQUFBTSxDQUFBLElBQUFDLElBQUE7VUFBQSxJQUFBSixLQUFBLElBV1E7UUFBTTtNQUViLFNBQUFLLEdBQUE7UUFBQVIsU0FBQSxDQUFBaFUsQ0FBQSxDQUFBd1UsR0FBQTtNQUFBO1FBQUFSLFNBQUEsQ0FBQVMsQ0FBQTtNQUFBO0lBQ0w7RUFBQztJQUFBeFUsR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUFvTyxrQkFBa0JBLENBQUEsRUFBRztNQUFBLElBQUE0SCxNQUFBO01BQ2pCLElBQUksSUFBSSxDQUFDN1AsT0FBTyxFQUFFO1FBQ2QsSUFBSSxDQUFDQSxPQUFPLENBQUNsRyxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO1FBQ25DQyxVQUFVLENBQUMsWUFBTTtVQUNiNlYsTUFBSSxDQUFDN1AsT0FBTyxDQUFDbEcsS0FBSyxDQUFDMkgsT0FBTyxHQUFHLEdBQUc7UUFDcEMsQ0FBQyxFQUFFLEVBQUUsQ0FBQztNQUNWOztNQUVBO01BQ0EsSUFBSSxDQUFDcU8sWUFBWSxDQUFDLENBQUM7O01BRW5CO01BQ0EsSUFBSSxDQUFDQyxjQUFjLENBQUMsQ0FBQztJQUN6QjtFQUFDO0lBQUEzVSxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQWlXLFlBQVlBLENBQUEsRUFBRztNQUNYO01BQ0EsSUFBSSxJQUFJLENBQUNuTyxXQUFXLEVBQUU7UUFDbEIsSUFBSSxDQUFDQSxXQUFXLENBQUNnRyxLQUFLLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUNoRyxXQUFXLEdBQUcsSUFBSTtNQUMzQjs7TUFFQTtNQUNBLElBQUlxTyxLQUFLLEdBQUcsSUFBSTtNQUNoQixJQUFJLElBQUksQ0FBQ2hRLE9BQU8sRUFBRTtRQUNkLElBQUksSUFBSSxDQUFDQSxPQUFPLENBQUM1TixTQUFTLENBQUNxYixRQUFRLENBQUMsZ0NBQWdDLENBQUMsRUFBRTtVQUNuRXVDLEtBQUssR0FBRyxnQ0FBZ0M7UUFDNUMsQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDaFEsT0FBTyxDQUFDNU4sU0FBUyxDQUFDcWIsUUFBUSxDQUFDLCtCQUErQixDQUFDLEVBQUU7VUFDekV1QyxLQUFLLEdBQUcsK0JBQStCO1FBQzNDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQ2hRLE9BQU8sQ0FBQzVOLFNBQVMsQ0FBQ3FiLFFBQVEsQ0FBQyw2QkFBNkIsQ0FBQyxFQUFFO1VBQ3ZFdUMsS0FBSyxHQUFHLCtCQUErQjtRQUMzQztNQUNKO01BRUEsSUFBSUEsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDbk8sT0FBTyxFQUFFO1FBQ3hCLElBQUksQ0FBQ00sUUFBUSxHQUFHLElBQUk4TixLQUFLLENBQUNELEtBQUssQ0FBQztRQUNoQyxJQUFJLENBQUM3TixRQUFRLENBQUNMLE1BQU0sR0FBRyxJQUFJLENBQUNBLE1BQU07UUFDbEMsSUFBSSxDQUFDSyxRQUFRLENBQUNNLElBQUksQ0FBQyxDQUFDLFNBQU0sQ0FBQyxZQUFNLENBQUMsQ0FBQyxDQUFDO01BQ3hDO0lBQ0o7RUFBQztJQUFBckgsR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUFrVyxjQUFjQSxDQUFBLEVBQUc7TUFBQSxJQUFBRyxPQUFBO01BQ2IsSUFBTUMsV0FBVyxHQUFHLElBQUksQ0FBQ3JYLFNBQVMsQ0FBQ3RGLE9BQU8sQ0FBQzJjLFdBQVc7TUFDdEQsSUFBSSxDQUFDQSxXQUFXLEVBQUU7TUFFbEIvVixLQUFLLENBQUMrVixXQUFXLEVBQUU7UUFDZjlWLE1BQU0sRUFBRSxNQUFNO1FBQ2RDLE9BQU8sRUFBRTtVQUFFLGtCQUFrQixFQUFFO1FBQWlCO01BQ3BELENBQUMsQ0FBQyxDQUNESSxJQUFJLENBQUMsVUFBQUMsR0FBRztRQUFBLE9BQUlBLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDLENBQUM7TUFBQSxFQUFDLENBQ3ZCRixJQUFJLENBQUMsVUFBQUcsSUFBSSxFQUFJO1FBQ1YsSUFBSUEsSUFBSSxDQUFDQyxPQUFPLElBQUlELElBQUksQ0FBQ3VWLFlBQVksS0FBSyxDQUFDLEVBQUU7VUFDekNGLE9BQUksQ0FBQ0csZ0JBQWdCLENBQUN4VixJQUFJLENBQUN1VixZQUFZLEVBQUV2VixJQUFJLENBQUN5VixTQUFTLEVBQUV6VixJQUFJLENBQUMwVixVQUFVLENBQUM7UUFDN0U7TUFDSixDQUFDLENBQUMsU0FDSSxDQUFDLFVBQUFaLEdBQUc7UUFBQSxPQUFJN1AsT0FBTyxDQUFDNUUsS0FBSyxDQUFDLDZCQUE2QixFQUFFeVUsR0FBRyxDQUFDO01BQUEsRUFBQztJQUNwRTtFQUFDO0lBQUF2VSxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQXdXLGdCQUFnQkEsQ0FBQ0csTUFBTSxFQUFFRixTQUFTLEVBQUVDLFVBQVUsRUFBRTtNQUM1QztNQUNBLElBQU1FLFFBQVEsR0FBRyxJQUFJLENBQUMzWCxTQUFTLENBQUM1RyxhQUFhLENBQUMsd0NBQXdDLENBQUM7TUFDdkYsSUFBSXVlLFFBQVEsSUFBSUgsU0FBUyxLQUFLLElBQUksRUFBRTtRQUNoQ0csUUFBUSxDQUFDMWUsU0FBUyxzQ0FBQXlELE1BQUEsQ0FBb0M4YSxTQUFTLFNBQU07TUFDekU7O01BRUE7TUFDQSxJQUFNSSxTQUFTLEdBQUcsSUFBSSxDQUFDNVgsU0FBUyxDQUFDNUcsYUFBYSxDQUFDLCtDQUErQyxDQUFDO01BQy9GLElBQUl3ZSxTQUFTLElBQUlILFVBQVUsS0FBSyxJQUFJLEVBQUU7UUFDbENHLFNBQVMsQ0FBQzNlLFNBQVMsc0NBQUF5RCxNQUFBLENBQW9DK2EsVUFBVSxTQUFNO01BQzNFOztNQUVBO01BQ0EsSUFBTXZRLE9BQU8sR0FBRyxJQUFJLENBQUNsSCxTQUFTLENBQUM1RyxhQUFhLENBQUMsdUJBQXVCLENBQUM7TUFDckUsSUFBSThOLE9BQU8sRUFBRTtRQUNULElBQU0yUSxTQUFTLEdBQUczUSxPQUFPLENBQUM5TixhQUFhLENBQUMsdUJBQXVCLENBQUM7O1FBRWhFO1FBQ0EsSUFBTTBlLE1BQU0sR0FBR2pmLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUM1Q2dmLE1BQU0sQ0FBQ2pZLFNBQVMsR0FBRyxlQUFlO1FBQ2xDaVksTUFBTSxDQUFDOVcsS0FBSyxDQUFDK1csT0FBTyxHQUFHLHNGQUFzRjtRQUM3R0QsTUFBTSxDQUFDbGEsV0FBVyxHQUFHOFosTUFBTSxHQUFHLENBQUMsa0JBQUFoYixNQUFBLENBQWtCZ2IsTUFBTSwwQkFBQWhiLE1BQUEsQ0FBdUJnYixNQUFNLFNBQU07UUFDMUZJLE1BQU0sQ0FBQzlXLEtBQUssQ0FBQ2dYLEtBQUssR0FBR04sTUFBTSxHQUFHLENBQUMsR0FBRyxTQUFTLEdBQUcsU0FBUztRQUN2REcsU0FBUyxDQUFDOWUsV0FBVyxDQUFDK2UsTUFBTSxDQUFDOztRQUU3QjtRQUNBLElBQU1HLE9BQU8sR0FBRyxDQUFDUCxNQUFNO1FBQ3ZCLElBQU1RLE1BQU0sR0FBR3JmLFFBQVEsQ0FBQ0MsYUFBYSxDQUFDLEtBQUssQ0FBQztRQUM1Q29mLE1BQU0sQ0FBQ3JZLFNBQVMsR0FBRyxlQUFlO1FBQ2xDcVksTUFBTSxDQUFDbFgsS0FBSyxDQUFDK1csT0FBTyxHQUFHLHFGQUFxRjtRQUM1R0csTUFBTSxDQUFDdGEsV0FBVyxHQUFHcWEsT0FBTyxHQUFHLENBQUMsa0JBQUF2YixNQUFBLENBQWtCdWIsT0FBTywwQkFBQXZiLE1BQUEsQ0FBdUJ1YixPQUFPLFNBQU07UUFDN0ZDLE1BQU0sQ0FBQ2xYLEtBQUssQ0FBQ2dYLEtBQUssR0FBR0MsT0FBTyxHQUFHLENBQUMsR0FBRyxTQUFTLEdBQUcsU0FBUztRQUN4REosU0FBUyxDQUFDOWUsV0FBVyxDQUFDbWYsTUFBTSxDQUFDO1FBRTdCaFgsVUFBVSxDQUFDLFlBQU07VUFDYjRXLE1BQU0sQ0FBQzlXLEtBQUssQ0FBQzJILE9BQU8sR0FBRyxHQUFHO1VBQzFCdVAsTUFBTSxDQUFDbFgsS0FBSyxDQUFDMkgsT0FBTyxHQUFHLEdBQUc7UUFDOUIsQ0FBQyxFQUFFLEdBQUcsQ0FBQztNQUNYO0lBQ0o7O0lBRUE7RUFBQTtJQUFBckcsR0FBQTtJQUFBdkIsS0FBQSxFQUVBLFNBQUEwTixhQUFhQSxDQUFBLEVBQUc7TUFBQSxJQUFBMEosT0FBQTtNQUNaLElBQUksQ0FBQyxJQUFJLENBQUN2UCxhQUFhLEVBQUU7TUFFekIsSUFBSSxJQUFJLENBQUNDLFdBQVcsRUFBRTtRQUNsQixJQUFJLENBQUNBLFdBQVcsQ0FBQ2dHLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQ2hHLFdBQVcsR0FBRyxJQUFJO01BQzNCO01BRUEsSUFBTXVQLEdBQUcsR0FBRyxJQUFJLENBQUNDLG1CQUFtQixDQUFDLENBQUM7TUFDdEMsSUFBSSxDQUFDeFAsV0FBVyxHQUFHLElBQUlzTyxLQUFLLENBQUMsSUFBSSxDQUFDak8sY0FBYyxDQUFDa1AsR0FBRyxDQUFDLENBQUM7TUFDdEQsSUFBSSxDQUFDdlAsV0FBVyxDQUFDRyxNQUFNLEdBQUcsSUFBSSxDQUFDRCxPQUFPLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQ0MsTUFBTTtNQUN4RCxJQUFJLENBQUNILFdBQVcsQ0FBQzNQLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUFBLE9BQU1pZixPQUFJLENBQUMxSixhQUFhLENBQUMsQ0FBQztNQUFBLEVBQUM7TUFDdEUsSUFBSSxDQUFDNUYsV0FBVyxDQUFDYyxJQUFJLENBQUMsQ0FBQyxTQUFNLENBQUMsWUFBTSxDQUFDLENBQUMsQ0FBQztJQUMzQztFQUFDO0lBQUFySCxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQXNYLG1CQUFtQkEsQ0FBQSxFQUFHO01BQ2xCLElBQUk3WixDQUFDO01BQ0wsR0FBRztRQUNDQSxDQUFDLEdBQUdsQixJQUFJLENBQUNnYixLQUFLLENBQUNoYixJQUFJLENBQUNpYixNQUFNLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQ3JQLGNBQWMsQ0FBQzlPLE1BQU0sQ0FBQztNQUM5RCxDQUFDLFFBQVFvRSxDQUFDLEtBQUssSUFBSSxDQUFDc0ssY0FBYyxJQUFJLElBQUksQ0FBQ0ksY0FBYyxDQUFDOU8sTUFBTSxHQUFHLENBQUM7TUFDcEUsSUFBSSxDQUFDME8sY0FBYyxHQUFHdEssQ0FBQztNQUN2QixPQUFPQSxDQUFDO0lBQ1o7RUFBQztJQUFBOEQsR0FBQTtJQUFBdkIsS0FBQSxFQUVELFNBQUF3TixVQUFVQSxDQUFBLEVBQUc7TUFDVCxJQUFJLENBQUN4RixPQUFPLEdBQUcsQ0FBQyxJQUFJLENBQUNBLE9BQU87TUFDNUIsSUFBSSxJQUFJLENBQUNGLFdBQVcsRUFBRTtRQUNsQixJQUFJLENBQUNBLFdBQVcsQ0FBQ0csTUFBTSxHQUFHLElBQUksQ0FBQ0QsT0FBTyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUNDLE1BQU07TUFDNUQ7TUFDQSxJQUFJLElBQUksQ0FBQ0ssUUFBUSxFQUFFO1FBQ2YsSUFBSSxDQUFDQSxRQUFRLENBQUNMLE1BQU0sR0FBRyxJQUFJLENBQUNELE9BQU8sR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDQyxNQUFNO01BQ3pEO01BQ0EsSUFBSSxJQUFJLENBQUNPLE9BQU8sRUFBRTtRQUNkLElBQU15RSxJQUFJLEdBQUcsSUFBSSxDQUFDekUsT0FBTyxDQUFDblEsYUFBYSxDQUFDLEdBQUcsQ0FBQztRQUM1QyxJQUFJNFUsSUFBSSxFQUFFO1VBQ05BLElBQUksQ0FBQ25PLFNBQVMsR0FBRyxJQUFJLENBQUNrSixPQUFPLEdBQUcsb0JBQW9CLEdBQUcsa0JBQWtCO1FBQzdFO01BQ0o7TUFDQSxJQUFJLElBQUksQ0FBQ1MsWUFBWSxFQUFFO1FBQ25CLElBQUksQ0FBQ0EsWUFBWSxDQUFDN0wsUUFBUSxHQUFHLElBQUksQ0FBQ29MLE9BQU87TUFDN0M7TUFDQSxJQUFJLElBQUksQ0FBQ1UsU0FBUyxFQUFFO1FBQ2hCLElBQUksQ0FBQ0EsU0FBUyxDQUFDOUwsUUFBUSxHQUFHLElBQUksQ0FBQ29MLE9BQU87TUFDMUM7SUFDSjs7SUFFQTs7SUFFQTtBQUNKO0FBQ0E7RUFGSTtJQUFBekcsR0FBQTtJQUFBdkIsS0FBQSxFQUdBLFNBQUF5WCxPQUFPQSxDQUFDQyxJQUFJLEVBQUU7TUFDVixJQUFJLENBQUMsSUFBSSxDQUFDblAsUUFBUSxDQUFDbVAsSUFBSSxDQUFDLEVBQUU7UUFDdEIsSUFBSSxDQUFDblAsUUFBUSxDQUFDbVAsSUFBSSxDQUFDLEdBQUcsSUFBSXRCLEtBQUssQ0FBQ3NCLElBQUksQ0FBQztNQUN6QztNQUNBLE9BQU8sSUFBSSxDQUFDblAsUUFBUSxDQUFDbVAsSUFBSSxDQUFDO0lBQzlCOztJQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7RUFKSTtJQUFBblcsR0FBQTtJQUFBdkIsS0FBQSxFQUtBLFNBQUEyWCxPQUFPQSxDQUFDbEUsSUFBSSxFQUFFbUUsT0FBTyxFQUFFO01BQ25CLElBQUksSUFBSSxDQUFDNVAsT0FBTyxJQUFJLENBQUN5TCxJQUFJLEVBQUU7TUFFM0IsSUFBTWlFLElBQUkscUJBQUEvYixNQUFBLENBQXFCOFgsSUFBSSxPQUFBOVgsTUFBQSxDQUFJaWMsT0FBTyxTQUFNO01BQ3BELElBQU1DLE1BQU0sR0FBRyxJQUFJLENBQUNKLE9BQU8sQ0FBQ0MsSUFBSSxDQUFDOztNQUVqQztNQUNBLElBQU1JLEtBQUssR0FBR0QsTUFBTSxDQUFDRSxTQUFTLENBQUMsQ0FBQztNQUNoQ0QsS0FBSyxDQUFDN1AsTUFBTSxHQUFHLElBQUksQ0FBQ0MsU0FBUztNQUM3QjRQLEtBQUssQ0FBQ2xQLElBQUksQ0FBQyxDQUFDLFNBQU0sQ0FBQyxZQUFNLENBQUMsQ0FBQyxDQUFDO0lBQ2hDOztJQUVBO0FBQ0o7QUFDQTtBQUNBO0FBQ0E7RUFKSTtJQUFBckgsR0FBQTtJQUFBdkIsS0FBQSxFQUtBLFNBQUE2USxXQUFXQSxDQUFDdFAsR0FBRyxFQUFFeVcsTUFBTSxFQUFFO01BQ3JCLElBQU12RSxJQUFJLEdBQUcsSUFBSSxDQUFDbE4sY0FBYyxDQUFDaEYsR0FBRyxDQUFDO01BQ3JDLElBQUksQ0FBQ2tTLElBQUksRUFBRTtNQUVYLFFBQVF1RSxNQUFNO1FBQ1YsS0FBSyxRQUFRO1VBQ1QsSUFBSSxDQUFDTCxPQUFPLENBQUNsRSxJQUFJLEVBQUUsYUFBYSxDQUFDO1VBQ2pDO1FBQ0osS0FBSyxNQUFNO1VBQ1A7VUFDQSxJQUFJLElBQUksQ0FBQ2pOLGdCQUFnQixDQUFDakYsR0FBRyxDQUFDLEVBQUU7WUFDNUIsSUFBSSxDQUFDb1csT0FBTyxDQUFDbEUsSUFBSSxFQUFFLE1BQU0sQ0FBQztVQUM5QixDQUFDLE1BQU07WUFDSCxJQUFJLENBQUNrRSxPQUFPLENBQUNsRSxJQUFJLEVBQUUsWUFBWSxDQUFDO1VBQ3BDO1VBQ0E7UUFDSixLQUFLLE9BQU87VUFDUixJQUFJLENBQUNrRSxPQUFPLENBQUNsRSxJQUFJLEVBQUUsWUFBWSxDQUFDO1VBQ2hDO01BQ1I7SUFDSjtFQUFDO0lBQUFsUyxHQUFBO0lBQUF2QixLQUFBLEVBRUQsU0FBQTROLGdCQUFnQkEsQ0FBQSxFQUFHO01BQ2YsSUFBSSxDQUFDLElBQUksQ0FBQ3hILE9BQU8sRUFBRTtNQUVuQixJQUFJLElBQUksQ0FBQ1osU0FBUyxJQUFJLENBQUMsSUFBSSxDQUFDQyxRQUFRLEVBQUU7UUFDbEMsSUFBSSxDQUFDVyxPQUFPLENBQUN2SixXQUFXLEdBQUcsT0FBTztNQUN0QyxDQUFDLE1BQU0sSUFBSSxJQUFJLENBQUMwSSxZQUFZLElBQUksSUFBSSxDQUFDRCxJQUFJLENBQUNqTSxNQUFNLEVBQUU7UUFDOUMsSUFBSSxDQUFDK00sT0FBTyxDQUFDdkosV0FBVyxHQUFHLFNBQVM7UUFDcEMsSUFBSSxDQUFDdUosT0FBTyxDQUFDeEosUUFBUSxHQUFHLElBQUk7TUFDaEMsQ0FBQyxNQUFNO1FBQ0gsSUFBSSxDQUFDd0osT0FBTyxDQUFDdkosV0FBVyxHQUFHLElBQUksQ0FBQzBJLFlBQVksR0FBRyxDQUFDLEdBQUcsV0FBVyxHQUFHLFFBQVE7TUFDN0U7SUFDSjtFQUFDO0FBQUEsS0FHTDtBQUNBek4sUUFBUSxDQUFDSyxnQkFBZ0IsQ0FBQyxrQkFBa0IsRUFBRSxZQUFNO0VBQ2hELElBQU04ZixlQUFlLEdBQUduZ0IsUUFBUSxDQUFDTyxhQUFhLENBQUMsb0JBQW9CLENBQUM7RUFDcEUsSUFBSTRmLGVBQWUsRUFBRTtJQUNqQixJQUFJN1MsZ0JBQWdCLENBQUM2UyxlQUFlLENBQUM7RUFDekM7QUFDSixDQUFDLENBQUM7QUFFRixpRUFBZTdTLGdCQUFnQixFOzs7Ozs7Ozs7O0FDcC9DL0I7QUFDQTtBQUNBOztBQUVBLFNBQVN6TixVQUFVQSxDQUFDQyxHQUFHLEVBQUU7RUFDckIsSUFBTUMsR0FBRyxHQUFHQyxRQUFRLENBQUNDLGFBQWEsQ0FBQyxLQUFLLENBQUM7RUFDekNGLEdBQUcsQ0FBQ2dGLFdBQVcsR0FBR2pGLEdBQUc7RUFDckIsT0FBT0MsR0FBRyxDQUFDSyxTQUFTO0FBQ3hCO0FBRUFKLFFBQVEsQ0FBQ0ssZ0JBQWdCLENBQUMsa0JBQWtCLEVBQUUsWUFBTTtFQUNoRCxJQUFNSyxNQUFNLEdBQUdWLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLHVCQUF1QixDQUFDO0VBQzlELElBQU0rYyxLQUFLLEdBQUd0ZCxRQUFRLENBQUNPLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztFQUM1RCxJQUFNNEssUUFBUSxHQUFHbkwsUUFBUSxDQUFDTyxhQUFhLENBQUMseUJBQXlCLENBQUM7RUFDbEUsSUFBTTZLLFFBQVEsR0FBR3BMLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLHNCQUFzQixDQUFDO0VBQy9ELElBQU15RixLQUFLLEdBQUdoRyxRQUFRLENBQUNPLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztFQUU1RCxJQUFJLENBQUNHLE1BQU0sSUFBSSxDQUFDNGMsS0FBSyxFQUFFO0VBRXZCLElBQUk4QyxTQUFTLEdBQUcsS0FBSztFQUNyQixJQUFJQyxVQUFVLEdBQUcsU0FBUztFQUMxQixJQUFJQyx5QkFBeUIsR0FBRyxJQUFJO0VBQ3BDLElBQUlDLGFBQWEsR0FBRyxDQUFDO0VBQ3JCLElBQUlDLHNCQUFzQixHQUFHLElBQUk7RUFDakMsSUFBSUMscUJBQXFCLEdBQUcsSUFBSTtFQUNoQyxJQUFJQyxhQUFhLEdBQUcsS0FBSztFQUN6QixJQUFJQyxjQUFjLEdBQUcsS0FBSzs7RUFFMUI7RUFDQTtFQUNBO0VBQ0EsU0FBU0MsU0FBU0EsQ0FBQSxFQUFHO0lBQ2pCdEQsS0FBSyxDQUFDblYsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtJQUM1QitDLFFBQVEsQ0FBQ2hELEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE9BQU87SUFDaENrVixLQUFLLENBQUM5UixZQUFZLENBQUMsQ0FBQztJQUNwQjhSLEtBQUssQ0FBQzdjLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FBQztJQUMxQ2tJLFFBQVEsQ0FBQzFLLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQywrQkFBK0IsQ0FBQztJQUN2RG1kLFNBQVMsR0FBRyxJQUFJO0lBRWhCLElBQUksQ0FBQ00sYUFBYSxFQUFFO01BQ2hCRyxXQUFXLENBQUMsQ0FBQztJQUNqQjtFQUNKO0VBRUEsU0FBU0MsVUFBVUEsQ0FBQSxFQUFHO0lBQ2xCeEQsS0FBSyxDQUFDN2MsU0FBUyxDQUFDdUMsTUFBTSxDQUFDLHFCQUFxQixDQUFDO0lBQzdDbUksUUFBUSxDQUFDMUssU0FBUyxDQUFDdUMsTUFBTSxDQUFDLCtCQUErQixDQUFDO0lBQzFEb2QsU0FBUyxHQUFHLEtBQUs7SUFDakJXLGtCQUFrQixDQUFDLENBQUM7SUFDcEIxWSxVQUFVLENBQUMsWUFBTTtNQUNiaVYsS0FBSyxDQUFDblYsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtNQUM1QitDLFFBQVEsQ0FBQ2hELEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07SUFDbkMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztFQUNYO0VBRUExSCxNQUFNLENBQUNMLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtJQUFBLE9BQU0rZixTQUFTLEdBQUdVLFVBQVUsQ0FBQyxDQUFDLEdBQUdGLFNBQVMsQ0FBQyxDQUFDO0VBQUEsRUFBQztFQUM5RXhWLFFBQVEsQ0FBQy9LLGdCQUFnQixDQUFDLE9BQU8sRUFBRXlnQixVQUFVLENBQUM7RUFDOUMzVixRQUFRLENBQUM5SyxnQkFBZ0IsQ0FBQyxPQUFPLEVBQUV5Z0IsVUFBVSxDQUFDOztFQUU5QztFQUNBO0VBQ0E7RUFDQTlnQixRQUFRLENBQUNrQixnQkFBZ0IsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDbUIsT0FBTyxDQUFDLFVBQUEyZSxNQUFNLEVBQUk7SUFDOURBLE1BQU0sQ0FBQzNnQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUNuQyxJQUFNNGdCLE9BQU8sR0FBR0QsTUFBTSxDQUFDbmYsT0FBTyxDQUFDcWYsVUFBVTtNQUN6Q0MsU0FBUyxDQUFDRixPQUFPLENBQUM7SUFDdEIsQ0FBQyxDQUFDO0VBQ04sQ0FBQyxDQUFDO0VBRUYsU0FBU0UsU0FBU0EsQ0FBQ0YsT0FBTyxFQUFFO0lBQ3hCWixVQUFVLEdBQUdZLE9BQU87SUFFcEJqaEIsUUFBUSxDQUFDa0IsZ0JBQWdCLENBQUMsb0JBQW9CLENBQUMsQ0FBQ21CLE9BQU8sQ0FBQyxVQUFBbVQsR0FBRyxFQUFJO01BQzNEQSxHQUFHLENBQUMvVSxTQUFTLENBQUNDLE1BQU0sQ0FBQyw0QkFBNEIsRUFBRThVLEdBQUcsQ0FBQzNULE9BQU8sQ0FBQ3FmLFVBQVUsS0FBS0QsT0FBTyxDQUFDO0lBQzFGLENBQUMsQ0FBQztJQUVGamhCLFFBQVEsQ0FBQ2tCLGdCQUFnQixDQUFDLG9CQUFvQixDQUFDLENBQUNtQixPQUFPLENBQUMsVUFBQWdKLE9BQU8sRUFBSTtNQUMvREEsT0FBTyxDQUFDbEQsS0FBSyxDQUFDQyxPQUFPLEdBQUdpRCxPQUFPLENBQUN4SixPQUFPLENBQUN1ZixVQUFVLEtBQUtILE9BQU8sR0FBRyxPQUFPLEdBQUcsTUFBTTtJQUNyRixDQUFDLENBQUM7SUFFRmpoQixRQUFRLENBQUNPLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDNEgsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtJQUNyRXBJLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLHlCQUF5QixDQUFDLENBQUM0SCxLQUFLLENBQUNDLE9BQU8sR0FBRyxPQUFPO0lBQ3pFcEksUUFBUSxDQUFDTyxhQUFhLENBQUMsNkJBQTZCLENBQUMsQ0FBQzRILEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07SUFDNUUyWSxrQkFBa0IsQ0FBQyxDQUFDO0lBRXBCLElBQUlFLE9BQU8sS0FBSyxTQUFTLElBQUksQ0FBQ1AsYUFBYSxFQUFFRyxXQUFXLENBQUMsQ0FBQztJQUMxRCxJQUFJSSxPQUFPLEtBQUssVUFBVSxJQUFJLENBQUNOLGNBQWMsRUFBRVUsWUFBWSxDQUFDLENBQUM7RUFDakU7O0VBRUE7RUFDQTtFQUNBO0VBQ0EsU0FBU1IsV0FBV0EsQ0FBQSxFQUFHO0lBQ25CLElBQU0xWixTQUFTLEdBQUduSCxRQUFRLENBQUNPLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQztJQUN4RTRHLFNBQVMsQ0FBQy9HLFNBQVMsR0FBRyxnR0FBZ0c7SUFFdEhxSSxLQUFLLENBQUMsZUFBZSxFQUFFO01BQ25CRSxPQUFPLEVBQUU7UUFBRSxrQkFBa0IsRUFBRTtNQUFpQjtJQUNwRCxDQUFDLENBQUMsQ0FDREksSUFBSSxDQUFDLFVBQUFDLEdBQUc7TUFBQSxPQUFJQSxHQUFHLENBQUNDLElBQUksQ0FBQyxDQUFDO0lBQUEsRUFBQyxDQUN2QkYsSUFBSSxDQUFDLFVBQUFHLElBQUksRUFBSTtNQUNWd1gsYUFBYSxHQUFHLElBQUk7TUFDcEIsSUFBSXhYLElBQUksQ0FBQ29ZLE9BQU8sQ0FBQy9mLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDM0I0RixTQUFTLENBQUMvRyxTQUFTLEdBQUcsOEdBQThHO1FBQ3BJO01BQ0o7TUFFQStHLFNBQVMsQ0FBQy9HLFNBQVMsR0FBRzhJLElBQUksQ0FBQ29ZLE9BQU8sQ0FBQ2xkLEdBQUcsQ0FBQyxVQUFBNlosQ0FBQztRQUFBLDZFQUFBcGEsTUFBQSxDQUNZb2EsQ0FBQyxDQUFDc0QsTUFBTSw0RkFBQTFkLE1BQUEsQ0FFOUNvYSxDQUFDLENBQUNqUyxZQUFZLGlCQUFBbkksTUFBQSxDQUNHaEUsVUFBVSxDQUFDb2UsQ0FBQyxDQUFDalMsWUFBWSxDQUFDLGVBQUFuSSxNQUFBLENBQVVoRSxVQUFVLENBQUNvZSxDQUFDLENBQUNoUyxRQUFRLENBQUMsV0FDdkUsNkJBQTZCLHFKQUFBcEksTUFBQSxDQUdEaEUsVUFBVSxDQUFDb2UsQ0FBQyxDQUFDaFMsUUFBUSxDQUFDLDBHQUFBcEksTUFBQSxDQUVsRG9hLENBQUMsQ0FBQ3VELFdBQVcsR0FDVCxDQUFDdkQsQ0FBQyxDQUFDdUQsV0FBVyxDQUFDQyxRQUFRLEdBQUcsUUFBUSxHQUFHLEVBQUUsSUFBSTVoQixVQUFVLENBQUNvZSxDQUFDLENBQUN1RCxXQUFXLENBQUNuVyxPQUFPLENBQUMsR0FDNUUsZUFBZSw2SkFBQXhILE1BQUEsQ0FHcUNvYSxDQUFDLENBQUM1UixNQUFNO01BQUEsQ0FFakYsQ0FBQyxDQUFDN0gsSUFBSSxDQUFDLEVBQUUsQ0FBQztNQUVYMkMsU0FBUyxDQUFDakcsZ0JBQWdCLENBQUMsY0FBYyxDQUFDLENBQUNtQixPQUFPLENBQUMsVUFBQXFmLElBQUksRUFBSTtRQUN2REEsSUFBSSxDQUFDcmhCLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxZQUFNO1VBQ2pDLElBQU1raEIsTUFBTSxHQUFHdlUsUUFBUSxDQUFDMFUsSUFBSSxDQUFDN2YsT0FBTyxDQUFDOGYsWUFBWSxDQUFDO1VBQ2xELElBQU16ZSxJQUFJLEdBQUd3ZSxJQUFJLENBQUNuaEIsYUFBYSxDQUFDLG9CQUFvQixDQUFDLENBQUN3RSxXQUFXO1VBQ2pFNmMsZ0JBQWdCLENBQUNMLE1BQU0sRUFBRXJlLElBQUksQ0FBQztRQUNsQyxDQUFDLENBQUM7TUFDTixDQUFDLENBQUM7SUFDTixDQUFDLENBQUMsU0FDSSxDQUFDLFlBQU07TUFDVGlFLFNBQVMsQ0FBQy9HLFNBQVMsR0FBRywwREFBMEQ7SUFDcEYsQ0FBQyxDQUFDO0VBQ047O0VBRUE7RUFDQTtFQUNBO0VBQ0EsU0FBU2loQixZQUFZQSxDQUFBLEVBQUc7SUFDcEIsSUFBTWxhLFNBQVMsR0FBR25ILFFBQVEsQ0FBQ08sYUFBYSxDQUFDLCtCQUErQixDQUFDO0lBQ3pFNEcsU0FBUyxDQUFDL0csU0FBUyxHQUFHLGdHQUFnRztJQUV0SHFJLEtBQUssQ0FBQyxrQkFBa0IsRUFBRTtNQUN0QkUsT0FBTyxFQUFFO1FBQUUsa0JBQWtCLEVBQUU7TUFBaUI7SUFDcEQsQ0FBQyxDQUFDLENBQ0RJLElBQUksQ0FBQyxVQUFBQyxHQUFHO01BQUEsT0FBSUEsR0FBRyxDQUFDQyxJQUFJLENBQUMsQ0FBQztJQUFBLEVBQUMsQ0FDdkJGLElBQUksQ0FBQyxVQUFBRyxJQUFJLEVBQUk7TUFDVnlYLGNBQWMsR0FBRyxJQUFJO01BQ3JCLElBQUl6WCxJQUFJLENBQUMyWSxRQUFRLENBQUN0Z0IsTUFBTSxLQUFLLENBQUMsRUFBRTtRQUM1QjRGLFNBQVMsQ0FBQy9HLFNBQVMsR0FBRywrREFBK0Q7UUFDckY7TUFDSjtNQUVBK0csU0FBUyxDQUFDL0csU0FBUyxHQUFHOEksSUFBSSxDQUFDMlksUUFBUSxDQUFDemQsR0FBRyxDQUFDLFVBQUF5SCxDQUFDO1FBQUEseUVBQUFoSSxNQUFBLENBQ09nSSxDQUFDLENBQUNpVyxZQUFZLDRGQUFBamUsTUFBQSxDQUVoRGdJLENBQUMsQ0FBQ0csWUFBWSxpQkFBQW5JLE1BQUEsQ0FDR2hFLFVBQVUsQ0FBQ2dNLENBQUMsQ0FBQ0csWUFBWSxDQUFDLGVBQUFuSSxNQUFBLENBQVVoRSxVQUFVLENBQUNnTSxDQUFDLENBQUNJLFFBQVEsQ0FBQyxXQUN2RSw2QkFBNkIscUpBQUFwSSxNQUFBLENBR0RoRSxVQUFVLENBQUNnTSxDQUFDLENBQUNJLFFBQVEsQ0FBQyw0RUFBQXBJLE1BQUEsQ0FDbkJoRSxVQUFVLENBQUNnTSxDQUFDLENBQUN3QixJQUFJLENBQUMsb01BQUF4SixNQUFBLENBR2VnSSxDQUFDLENBQUNpVyxZQUFZLHlNQUFBamUsTUFBQSxDQUdkZ0ksQ0FBQyxDQUFDaVcsWUFBWTtNQUFBLENBSy9GLENBQUMsQ0FBQ3RkLElBQUksQ0FBQyxFQUFFLENBQUM7TUFFWDJDLFNBQVMsQ0FBQ2pHLGdCQUFnQixDQUFDLGtCQUFrQixDQUFDLENBQUNtQixPQUFPLENBQUMsVUFBQW1ULEdBQUcsRUFBSTtRQUMxREEsR0FBRyxDQUFDblYsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUNtSixDQUFDLEVBQUs7VUFDakNBLENBQUMsQ0FBQ2dCLGVBQWUsQ0FBQyxDQUFDO1VBQ25CdVgsYUFBYSxDQUFDdk0sR0FBRyxDQUFDM1QsT0FBTyxDQUFDbWdCLFFBQVEsRUFBRSxRQUFRLENBQUM7UUFDakQsQ0FBQyxDQUFDO01BQ04sQ0FBQyxDQUFDO01BRUY3YSxTQUFTLENBQUNqRyxnQkFBZ0IsQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDbUIsT0FBTyxDQUFDLFVBQUFtVCxHQUFHLEVBQUk7UUFDMURBLEdBQUcsQ0FBQ25WLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDbUosQ0FBQyxFQUFLO1VBQ2pDQSxDQUFDLENBQUNnQixlQUFlLENBQUMsQ0FBQztVQUNuQnVYLGFBQWEsQ0FBQ3ZNLEdBQUcsQ0FBQzNULE9BQU8sQ0FBQ29nQixRQUFRLEVBQUUsUUFBUSxDQUFDO1FBQ2pELENBQUMsQ0FBQztNQUNOLENBQUMsQ0FBQztJQUNOLENBQUMsQ0FBQyxTQUNJLENBQUMsWUFBTTtNQUNUOWEsU0FBUyxDQUFDL0csU0FBUyxHQUFHLDBEQUEwRDtJQUNwRixDQUFDLENBQUM7RUFDTjtFQUVBLFNBQVMyaEIsYUFBYUEsQ0FBQ0QsWUFBWSxFQUFFNUIsTUFBTSxFQUFFO0lBQ3pDelgsS0FBSyxhQUFBNUUsTUFBQSxDQUFhcWMsTUFBTSxPQUFBcmMsTUFBQSxDQUFJaWUsWUFBWSxHQUFJO01BQ3hDcFosTUFBTSxFQUFFLE1BQU07TUFDZEMsT0FBTyxFQUFFO1FBQUUsa0JBQWtCLEVBQUU7TUFBaUI7SUFDcEQsQ0FBQyxDQUFDLENBQ0RJLElBQUksQ0FBQyxVQUFBQyxHQUFHO01BQUEsT0FBSUEsR0FBRyxDQUFDQyxJQUFJLENBQUMsQ0FBQztJQUFBLEVBQUMsQ0FDdkJGLElBQUksQ0FBQyxVQUFBRyxJQUFJLEVBQUk7TUFDVixJQUFJQSxJQUFJLENBQUNDLE9BQU8sRUFBRTtRQUNkdVgsYUFBYSxHQUFHLEtBQUs7UUFDckJDLGNBQWMsR0FBRyxLQUFLO1FBQ3RCVSxZQUFZLENBQUMsQ0FBQztRQUNkYSxnQkFBZ0IsQ0FBQyxDQUFDO01BQ3RCO0lBQ0osQ0FBQyxDQUFDO0VBQ047O0VBRUE7RUFDQTtFQUNBO0VBQ0EsSUFBTUMsV0FBVyxHQUFHbmlCLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLDZCQUE2QixDQUFDO0VBQ3pFLElBQU02aEIsYUFBYSxHQUFHcGlCLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLCtCQUErQixDQUFDO0VBQzdFLElBQUk4aEIsYUFBYSxHQUFHLElBQUk7RUFFeEIsSUFBSUYsV0FBVyxFQUFFO0lBQ2JBLFdBQVcsQ0FBQzloQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUN4Q2lpQixZQUFZLENBQUNELGFBQWEsQ0FBQztNQUMzQixJQUFNRSxLQUFLLEdBQUdKLFdBQVcsQ0FBQ2phLEtBQUssQ0FBQ0ssSUFBSSxDQUFDLENBQUM7TUFFdEMsSUFBSWdhLEtBQUssQ0FBQ2hoQixNQUFNLEdBQUcsQ0FBQyxFQUFFO1FBQ2xCNmdCLGFBQWEsQ0FBQ2hpQixTQUFTLEdBQUcsRUFBRTtRQUM1QjtNQUNKO01BRUFpaUIsYUFBYSxHQUFHaGEsVUFBVSxDQUFDLFlBQU07UUFDN0JJLEtBQUssc0JBQUE1RSxNQUFBLENBQXNCZ0gsa0JBQWtCLENBQUMwWCxLQUFLLENBQUMsR0FBSTtVQUNwRDVaLE9BQU8sRUFBRTtZQUFFLGtCQUFrQixFQUFFO1VBQWlCO1FBQ3BELENBQUMsQ0FBQyxDQUNESSxJQUFJLENBQUMsVUFBQUMsR0FBRztVQUFBLE9BQUlBLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDLENBQUM7UUFBQSxFQUFDLENBQ3ZCRixJQUFJLENBQUMsVUFBQUcsSUFBSSxFQUFJO1VBQ1YsSUFBSUEsSUFBSSxDQUFDc1osS0FBSyxDQUFDamhCLE1BQU0sS0FBSyxDQUFDLEVBQUU7WUFDekI2Z0IsYUFBYSxDQUFDaGlCLFNBQVMsR0FBRywyREFBMkQ7WUFDckY7VUFDSjtVQUVBZ2lCLGFBQWEsQ0FBQ2hpQixTQUFTLEdBQUc4SSxJQUFJLENBQUNzWixLQUFLLENBQUNwZSxHQUFHLENBQUMsVUFBQXFlLENBQUMsRUFBSTtZQUMxQyxJQUFJQyxVQUFVLEdBQUcsRUFBRTtZQUNuQixJQUFJRCxDQUFDLENBQUNFLFlBQVksS0FBSyxVQUFVLEVBQUU7Y0FDL0JELFVBQVUsR0FBRywrREFBK0Q7WUFDaEYsQ0FBQyxNQUFNLElBQUlELENBQUMsQ0FBQ0UsWUFBWSxLQUFLLGNBQWMsRUFBRTtjQUMxQ0QsVUFBVSxHQUFHLG1FQUFtRTtZQUNwRixDQUFDLE1BQU0sSUFBSUQsQ0FBQyxDQUFDRSxZQUFZLEtBQUssa0JBQWtCLEVBQUU7Y0FDOUNELFVBQVUsR0FBRyxpRUFBaUU7WUFDbEYsQ0FBQyxNQUFNO2NBQ0hBLFVBQVUsOEVBQUE3ZSxNQUFBLENBQTJFNGUsQ0FBQyxDQUFDbEIsTUFBTSw4R0FFbkY7WUFDZDtZQUVBLDhLQUFBMWQsTUFBQSxDQUdjNGUsQ0FBQyxDQUFDelcsWUFBWSxpQkFBQW5JLE1BQUEsQ0FDR2hFLFVBQVUsQ0FBQzRpQixDQUFDLENBQUN6VyxZQUFZLENBQUMsZUFBQW5JLE1BQUEsQ0FBVWhFLFVBQVUsQ0FBQzRpQixDQUFDLENBQUN4VyxRQUFRLENBQUMsV0FDdkUsNkJBQTZCLHlMQUFBcEksTUFBQSxDQUdEaEUsVUFBVSxDQUFDNGlCLENBQUMsQ0FBQ3hXLFFBQVEsQ0FBQyx1SEFBQXBJLE1BQUEsQ0FDVTRlLENBQUMsQ0FBQ3BXLE1BQU0sMkhBQUF4SSxNQUFBLENBRTFDNmUsVUFBVTtVQUcxRCxDQUFDLENBQUMsQ0FBQ2xlLElBQUksQ0FBQyxFQUFFLENBQUM7VUFFWDRkLGFBQWEsQ0FBQ2xoQixnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDbUIsT0FBTyxDQUFDLFVBQUFtVCxHQUFHLEVBQUk7WUFDbEVBLEdBQUcsQ0FBQ25WLGdCQUFnQixDQUFDLE9BQU8sRUFBRSxVQUFDbUosQ0FBQyxFQUFLO2NBQ2pDQSxDQUFDLENBQUNnQixlQUFlLENBQUMsQ0FBQztjQUNuQm9ZLGlCQUFpQixDQUFDcE4sR0FBRyxDQUFDM1QsT0FBTyxDQUFDZ2hCLFdBQVcsRUFBRXJOLEdBQUcsQ0FBQztZQUNuRCxDQUFDLENBQUM7VUFDTixDQUFDLENBQUM7UUFDTixDQUFDLENBQUM7TUFDTixDQUFDLEVBQUUsR0FBRyxDQUFDO0lBQ1gsQ0FBQyxDQUFDO0VBQ047RUFFQSxTQUFTb04saUJBQWlCQSxDQUFDckIsTUFBTSxFQUFFL0wsR0FBRyxFQUFFO0lBQ3BDQSxHQUFHLENBQUMxUSxRQUFRLEdBQUcsSUFBSTtJQUNuQjJELEtBQUsscUJBQUE1RSxNQUFBLENBQXFCMGQsTUFBTSxHQUFJO01BQ2hDN1ksTUFBTSxFQUFFLE1BQU07TUFDZEMsT0FBTyxFQUFFO1FBQUUsa0JBQWtCLEVBQUU7TUFBaUI7SUFDcEQsQ0FBQyxDQUFDLENBQ0RJLElBQUksQ0FBQyxVQUFBQyxHQUFHO01BQUEsT0FBSUEsR0FBRyxDQUFDQyxJQUFJLENBQUMsQ0FBQztJQUFBLEVBQUMsQ0FDdkJGLElBQUksQ0FBQyxVQUFBRyxJQUFJLEVBQUk7TUFDVixJQUFJQSxJQUFJLENBQUNDLE9BQU8sRUFBRTtRQUNkcU0sR0FBRyxDQUFDc04sU0FBUyxHQUFHLG1FQUFtRTtNQUN2RixDQUFDLE1BQU07UUFDSHROLEdBQUcsQ0FBQzFRLFFBQVEsR0FBRyxLQUFLO01BQ3hCO0lBQ0osQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxZQUFNO01BQUUwUSxHQUFHLENBQUMxUSxRQUFRLEdBQUcsS0FBSztJQUFFLENBQUMsQ0FBQztFQUMzQztFQUVBLFNBQVNpZSxtQkFBbUJBLENBQUNDLFNBQVMsRUFBRXhOLEdBQUcsRUFBRTtJQUN6QyxJQUFNeU4sTUFBTSxHQUFHQyxNQUFNLENBQUMseUJBQXlCLENBQUM7SUFDaEQsSUFBSUQsTUFBTSxLQUFLLElBQUksRUFBRSxPQUFPLENBQUM7O0lBRTdCek4sR0FBRyxDQUFDMVEsUUFBUSxHQUFHLElBQUk7SUFDbkIyRCxLQUFLLHNCQUFBNUUsTUFBQSxDQUFzQm1mLFNBQVMsY0FBVztNQUMzQ3RhLE1BQU0sRUFBRSxNQUFNO01BQ2RDLE9BQU8sRUFBRTtRQUNMLGNBQWMsRUFBRSxrQkFBa0I7UUFDbEMsa0JBQWtCLEVBQUU7TUFDeEIsQ0FBQztNQUNEQyxJQUFJLEVBQUVyRCxJQUFJLENBQUNzRCxTQUFTLENBQUM7UUFBRW9hLE1BQU0sRUFBRUE7TUFBTyxDQUFDO0lBQzNDLENBQUMsQ0FBQyxDQUNEbGEsSUFBSSxDQUFDLFVBQUFDLEdBQUc7TUFBQSxPQUFJQSxHQUFHLENBQUNDLElBQUksQ0FBQyxDQUFDO0lBQUEsRUFBQyxDQUN2QkYsSUFBSSxDQUFDLFVBQUFHLElBQUksRUFBSTtNQUNWLElBQUlBLElBQUksQ0FBQ0MsT0FBTyxFQUFFO1FBQ2RxTSxHQUFHLENBQUNwVixTQUFTLEdBQUcsOEJBQThCO1FBQzlDb1YsR0FBRyxDQUFDL1UsU0FBUyxDQUFDd0MsR0FBRyxDQUFDLDRCQUE0QixDQUFDO1FBQy9DdVMsR0FBRyxDQUFDdk8sS0FBSyxHQUFHLFNBQVM7TUFDekIsQ0FBQyxNQUFNO1FBQ0h1TyxHQUFHLENBQUMxUSxRQUFRLEdBQUcsS0FBSztNQUN4QjtJQUNKLENBQUMsQ0FBQyxTQUNJLENBQUMsWUFBTTtNQUFFMFEsR0FBRyxDQUFDMVEsUUFBUSxHQUFHLEtBQUs7SUFBRSxDQUFDLENBQUM7RUFDM0M7O0VBRUE7RUFDQTtFQUNBO0VBQ0EsU0FBUzhjLGdCQUFnQkEsQ0FBQ0wsTUFBTSxFQUFFdFYsUUFBUSxFQUFFO0lBQ3hDcVUseUJBQXlCLEdBQUdpQixNQUFNO0lBQ2xDaEIsYUFBYSxHQUFHLENBQUM7SUFFakJ2Z0IsUUFBUSxDQUFDTyxhQUFhLENBQUMsc0JBQXNCLENBQUMsQ0FBQzRILEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07SUFDckVwSSxRQUFRLENBQUNPLGFBQWEsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDNEgsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtJQUN4RSxJQUFNK2EsTUFBTSxHQUFHbmpCLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLDZCQUE2QixDQUFDO0lBQ3BFNGlCLE1BQU0sQ0FBQ2hiLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07SUFFN0JwSSxRQUFRLENBQUNPLGFBQWEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDd0UsV0FBVyxHQUFHa0gsUUFBUTtJQUN6RSxJQUFNbVgsVUFBVSxHQUFHcGpCLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLDhCQUE4QixDQUFDO0lBQ3pFNmlCLFVBQVUsQ0FBQ2hqQixTQUFTLEdBQUcsZ0dBQWdHO0lBRXZIcUksS0FBSyxzQkFBQTVFLE1BQUEsQ0FBc0IwZCxNQUFNLEdBQUk7TUFDakM1WSxPQUFPLEVBQUU7UUFBRSxrQkFBa0IsRUFBRTtNQUFpQjtJQUNwRCxDQUFDLENBQUMsQ0FDREksSUFBSSxDQUFDLFVBQUFDLEdBQUc7TUFBQSxPQUFJQSxHQUFHLENBQUNDLElBQUksQ0FBQyxDQUFDO0lBQUEsRUFBQyxDQUN2QkYsSUFBSSxDQUFDLFVBQUFHLElBQUksRUFBSTtNQUNWbWEsY0FBYyxDQUFDbmEsSUFBSSxDQUFDb2EsUUFBUSxFQUFFLEtBQUssQ0FBQztNQUNwQ0MsbUJBQW1CLENBQUMsQ0FBQztJQUN6QixDQUFDLENBQUM7RUFDTjtFQUVBLFNBQVNGLGNBQWNBLENBQUNDLFFBQVEsRUFBRUUsTUFBTSxFQUFFO0lBQ3RDLElBQU1KLFVBQVUsR0FBR3BqQixRQUFRLENBQUNPLGFBQWEsQ0FBQyw4QkFBOEIsQ0FBQztJQUV6RSxJQUFJLENBQUNpakIsTUFBTSxFQUFFO01BQ1QsSUFBSUYsUUFBUSxDQUFDL2hCLE1BQU0sS0FBSyxDQUFDLEVBQUU7UUFDdkI2aEIsVUFBVSxDQUFDaGpCLFNBQVMsR0FBRywyRkFBMkY7TUFDdEgsQ0FBQyxNQUFNO1FBQ0hnakIsVUFBVSxDQUFDaGpCLFNBQVMsR0FBRyxFQUFFO01BQzdCO0lBQ0o7O0lBRUE7SUFDQSxJQUFJb2pCLE1BQU0sSUFBSUYsUUFBUSxDQUFDL2hCLE1BQU0sR0FBRyxDQUFDLEVBQUU7TUFDL0IsSUFBTWtpQixXQUFXLEdBQUdMLFVBQVUsQ0FBQzdpQixhQUFhLENBQUMsdUJBQXVCLENBQUM7TUFDckUsSUFBSWtqQixXQUFXLEVBQUVBLFdBQVcsQ0FBQ3pnQixNQUFNLENBQUMsQ0FBQztJQUN6QztJQUVBc2dCLFFBQVEsQ0FBQ2poQixPQUFPLENBQUMsVUFBQXFoQixHQUFHLEVBQUk7TUFDcEIsSUFBSUEsR0FBRyxDQUFDcGhCLEVBQUUsR0FBR2llLGFBQWEsRUFBRUEsYUFBYSxHQUFHbUQsR0FBRyxDQUFDcGhCLEVBQUU7TUFFbEQsSUFBTXZDLEdBQUcsR0FBR0MsUUFBUSxDQUFDQyxhQUFhLENBQUMsS0FBSyxDQUFDO01BQ3pDRixHQUFHLENBQUNVLFNBQVMsQ0FBQ3dDLEdBQUcsQ0FBQyxjQUFjLEVBQUV5Z0IsR0FBRyxDQUFDakMsUUFBUSxHQUFHLG9CQUFvQixHQUFHLHNCQUFzQixDQUFDO01BRS9GLElBQUlrQyxTQUFTLEdBQUcsRUFBRTtNQUNsQixJQUFJLENBQUNELEdBQUcsQ0FBQ2pDLFFBQVEsRUFBRTtRQUNma0MsU0FBUyxrRUFBQTlmLE1BQUEsQ0FBK0Q2ZixHQUFHLENBQUNwaEIsRUFBRSw0RUFBb0U7TUFDdEo7TUFFQXZDLEdBQUcsQ0FBQ0ssU0FBUyx3QkFBQXlELE1BQUEsQ0FDUGhFLFVBQVUsQ0FBQzZqQixHQUFHLENBQUNyWSxPQUFPLENBQUMsMkRBQUF4SCxNQUFBLENBQ1VoRSxVQUFVLENBQUM2akIsR0FBRyxDQUFDclcsSUFBSSxDQUFDLE9BQUF4SixNQUFBLENBQUk4ZixTQUFTLDBCQUN2RTs7TUFFRDtNQUNBLElBQU1DLFFBQVEsR0FBRzdqQixHQUFHLENBQUNRLGFBQWEsQ0FBQyxzQkFBc0IsQ0FBQztNQUMxRCxJQUFJcWpCLFFBQVEsRUFBRTtRQUNWQSxRQUFRLENBQUN2akIsZ0JBQWdCLENBQUMsT0FBTyxFQUFFLFVBQUNtSixDQUFDLEVBQUs7VUFDdENBLENBQUMsQ0FBQ2dCLGVBQWUsQ0FBQyxDQUFDO1VBQ25CdVksbUJBQW1CLENBQUNhLFFBQVEsQ0FBQy9oQixPQUFPLENBQUNnaUIsV0FBVyxFQUFFRCxRQUFRLENBQUM7UUFDL0QsQ0FBQyxDQUFDO01BQ047TUFFQVIsVUFBVSxDQUFDbGpCLFdBQVcsQ0FBQ0gsR0FBRyxDQUFDO0lBQy9CLENBQUMsQ0FBQztJQUVGcWpCLFVBQVUsQ0FBQzVHLFNBQVMsR0FBRzRHLFVBQVUsQ0FBQzNHLFlBQVk7RUFDbEQ7O0VBRUE7RUFDQSxJQUFNcUgsT0FBTyxHQUFHOWpCLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLDBCQUEwQixDQUFDO0VBQ2xFLElBQU13akIsT0FBTyxHQUFHL2pCLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLDJCQUEyQixDQUFDO0VBRW5FLElBQUl1akIsT0FBTyxJQUFJQyxPQUFPLEVBQUU7SUFDcEJELE9BQU8sQ0FBQ3pqQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUyakIsV0FBVyxDQUFDO0lBQzlDRCxPQUFPLENBQUMxakIsZ0JBQWdCLENBQUMsU0FBUyxFQUFFLFVBQUNtSixDQUFDLEVBQUs7TUFDdkMsSUFBSUEsQ0FBQyxDQUFDQyxHQUFHLEtBQUssT0FBTyxFQUFFdWEsV0FBVyxDQUFDLENBQUM7SUFDeEMsQ0FBQyxDQUFDO0VBQ047RUFFQSxTQUFTQSxXQUFXQSxDQUFBLEVBQUc7SUFDbkIsSUFBTTNZLE9BQU8sR0FBRzBZLE9BQU8sQ0FBQzdiLEtBQUssQ0FBQ0ssSUFBSSxDQUFDLENBQUM7SUFDcEMsSUFBSSxDQUFDOEMsT0FBTyxJQUFJLENBQUNpVix5QkFBeUIsRUFBRTtJQUU1Q3lELE9BQU8sQ0FBQzdiLEtBQUssR0FBRyxFQUFFO0lBRWxCTyxLQUFLLHNCQUFBNUUsTUFBQSxDQUFzQnljLHlCQUF5QixHQUFJO01BQ3BENVgsTUFBTSxFQUFFLE1BQU07TUFDZEMsT0FBTyxFQUFFO1FBQ0wsY0FBYyxFQUFFLGtCQUFrQjtRQUNsQyxrQkFBa0IsRUFBRTtNQUN4QixDQUFDO01BQ0RDLElBQUksRUFBRXJELElBQUksQ0FBQ3NELFNBQVMsQ0FBQztRQUFFd0MsT0FBTyxFQUFFQTtNQUFRLENBQUM7SUFDN0MsQ0FBQyxDQUFDLENBQ0R0QyxJQUFJLENBQUMsVUFBQUMsR0FBRztNQUFBLE9BQUlBLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDLENBQUM7SUFBQSxFQUFDLENBQ3ZCRixJQUFJLENBQUMsVUFBQUcsSUFBSSxFQUFJO01BQ1YsSUFBSUEsSUFBSSxDQUFDQyxPQUFPLElBQUlELElBQUksQ0FBQ3FULE9BQU8sRUFBRTtRQUM5QjhHLGNBQWMsQ0FBQyxDQUFDbmEsSUFBSSxDQUFDcVQsT0FBTyxDQUFDLEVBQUUsSUFBSSxDQUFDO01BQ3hDO0lBQ0osQ0FBQyxDQUFDO0VBQ047O0VBRUE7RUFDQSxJQUFNMEgsT0FBTyxHQUFHamtCLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLDBCQUEwQixDQUFDO0VBQ2xFLElBQUkwakIsT0FBTyxFQUFFO0lBQ1RBLE9BQU8sQ0FBQzVqQixnQkFBZ0IsQ0FBQyxPQUFPLEVBQUUsWUFBTTtNQUNwQ2lnQix5QkFBeUIsR0FBRyxJQUFJO01BQ2hDUyxrQkFBa0IsQ0FBQyxDQUFDO01BQ3BCTCxhQUFhLEdBQUcsS0FBSztNQUNyQlMsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUN4QixDQUFDLENBQUM7RUFDTjs7RUFFQTtFQUNBO0VBQ0E7RUFDQSxTQUFTb0MsbUJBQW1CQSxDQUFBLEVBQUc7SUFDM0J4QyxrQkFBa0IsQ0FBQyxDQUFDO0lBQ3BCUCxzQkFBc0IsR0FBRzBELFdBQVcsQ0FBQyxZQUFNO01BQ3ZDLElBQUksQ0FBQzVELHlCQUF5QixFQUFFO01BRWhDN1gsS0FBSyxzQkFBQTVFLE1BQUEsQ0FBc0J5Yyx5QkFBeUIsZUFBQXpjLE1BQUEsQ0FBWTBjLGFBQWEsR0FBSTtRQUM3RTVYLE9BQU8sRUFBRTtVQUFFLGtCQUFrQixFQUFFO1FBQWlCO01BQ3BELENBQUMsQ0FBQyxDQUNESSxJQUFJLENBQUMsVUFBQUMsR0FBRztRQUFBLE9BQUlBLEdBQUcsQ0FBQ0MsSUFBSSxDQUFDLENBQUM7TUFBQSxFQUFDLENBQ3ZCRixJQUFJLENBQUMsVUFBQUcsSUFBSSxFQUFJO1FBQ1YsSUFBSUEsSUFBSSxDQUFDb2EsUUFBUSxJQUFJcGEsSUFBSSxDQUFDb2EsUUFBUSxDQUFDL2hCLE1BQU0sR0FBRyxDQUFDLEVBQUU7VUFDM0M4aEIsY0FBYyxDQUFDbmEsSUFBSSxDQUFDb2EsUUFBUSxFQUFFLElBQUksQ0FBQztRQUN2QztNQUNKLENBQUMsQ0FBQztJQUNOLENBQUMsRUFBRSxJQUFJLENBQUM7RUFDWjtFQUVBLFNBQVN2QyxrQkFBa0JBLENBQUEsRUFBRztJQUMxQixJQUFJUCxzQkFBc0IsRUFBRTtNQUN4QjJELGFBQWEsQ0FBQzNELHNCQUFzQixDQUFDO01BQ3JDQSxzQkFBc0IsR0FBRyxJQUFJO0lBQ2pDO0VBQ0o7O0VBRUE7RUFDQTtFQUNBO0VBQ0EsU0FBUzBCLGdCQUFnQkEsQ0FBQSxFQUFHO0lBQ3hCelosS0FBSyxDQUFDLHVCQUF1QixFQUFFO01BQzNCRSxPQUFPLEVBQUU7UUFBRSxrQkFBa0IsRUFBRTtNQUFpQjtJQUNwRCxDQUFDLENBQUMsQ0FDREksSUFBSSxDQUFDLFVBQUFDLEdBQUc7TUFBQSxPQUFJQSxHQUFHLENBQUNDLElBQUksQ0FBQyxDQUFDO0lBQUEsRUFBQyxDQUN2QkYsSUFBSSxDQUFDLFVBQUFHLElBQUksRUFBSTtNQUNWLElBQUlBLElBQUksQ0FBQ2tiLEtBQUssR0FBRyxDQUFDLEVBQUU7UUFDaEJwZSxLQUFLLENBQUNqQixXQUFXLEdBQUdtRSxJQUFJLENBQUNrYixLQUFLO1FBQzlCcGUsS0FBSyxDQUFDbUMsS0FBSyxDQUFDQyxPQUFPLEdBQUcsY0FBYztNQUN4QyxDQUFDLE1BQU07UUFDSHBDLEtBQUssQ0FBQ21DLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07TUFDaEM7TUFFQSxJQUFNaWMsYUFBYSxHQUFHcmtCLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLHVCQUF1QixDQUFDO01BQ3JFLElBQUk4akIsYUFBYSxFQUFFO1FBQ2YsSUFBSW5iLElBQUksQ0FBQ29iLGVBQWUsR0FBRyxDQUFDLEVBQUU7VUFDMUJELGFBQWEsQ0FBQ3RmLFdBQVcsR0FBR21FLElBQUksQ0FBQ29iLGVBQWU7VUFDaERELGFBQWEsQ0FBQ2xjLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLGNBQWM7UUFDaEQsQ0FBQyxNQUFNO1VBQ0hpYyxhQUFhLENBQUNsYyxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO1FBQ3hDO01BQ0o7SUFDSixDQUFDLENBQUMsU0FDSSxDQUFDLFlBQU0sQ0FBQyxDQUFDLENBQUM7RUFDcEI7RUFFQThaLGdCQUFnQixDQUFDLENBQUM7RUFDbEJ6QixxQkFBcUIsR0FBR3lELFdBQVcsQ0FBQ2hDLGdCQUFnQixFQUFFLEtBQUssQ0FBQztBQUNoRSxDQUFDLENBQUMsQzs7Ozs7Ozs7Ozs7O0FDdGZGOzs7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9jb21iYXQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2ZyaWVuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzPzJkYzkiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9hcHAuc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBXZWxjb21lIHRvIHlvdXIgYXBwJ3MgbWFpbiBKYXZhU2NyaXB0IGZpbGUhXHJcbiAqL1xyXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcyc7XHJcbmltcG9ydCAnLi9qcy9jb21iYXQuanMnO1xyXG5pbXBvcnQgJy4vanMvZnJpZW5kcy5qcyc7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIFVUSUxJVEFJUkUgU0VDVVJJVEUgWFNTXHJcbj09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcclxuICAgIGlmICghc3RyKSByZXR1cm4gJyc7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKTtcclxuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIE1FTlUgQlVSR0VSXHJcbj09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXJnZXJcIik7XHJcbiAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tbmF2aWdhdGlvblwiKTtcclxuXHJcbiAgICBpZiAoYnVyZ2VyICYmIG5hdikge1xyXG4gICAgICAgIGJ1cmdlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgUEFHRSBURUFNUyAoQ09SUklHw4lFKVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyog8J+UpyBNQVggREVTIFNUQVRTIChhZGFwdGVyIMOgIHRhIEJERCAvIMOpcXVpbGlicmFnZSkgKi9cclxuY29uc3QgU1RBVF9NQVggPSB7XHJcbiAgICBkbWc6IDMwLFxyXG4gICAgc3BlZWQ6IDEyLFxyXG4gICAgZG9kZ2U6IDQwLFxyXG4gICAgY3JpdDogMTUsXHJcbiAgICBocDogNzVcclxufTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBwb3J0cmFpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVhbS1wb3J0cmFpdCcpO1xyXG4gICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZWFtRGV0YWlscycpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkLWxpc3QnKTtcclxuICAgIGNvbnN0IGxhdW5jaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tbGF1bmNoJyk7XHJcblxyXG4gICAgaWYgKCFkZXRhaWxzIHx8IHBvcnRyYWl0cy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBtYXhTZWxlY3Rpb24gPSA0O1xyXG4gICAgbGV0IHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICBsZXQgc2VsZWN0ZWRIZXJvSWRzID0gW107XHJcblxyXG4gICAgLy8gQ29tcG9zaXRpb24gb2JsaWdhdG9pcmUgOiAxIFRhbmssIDEgRFBTLCAxIEhlYWxlciwgMSBTdXBwb3J0XHJcbiAgICAvLyBMYSBjYXRlZ29yaWUgdmllbnQgZGlyZWN0ZW1lbnQgZHUgZGF0YS1jYXRlZ29yeSAoY2FsY3VsZSBjb3RlIHNlcnZldXIpXHJcbiAgICBmdW5jdGlvbiBnZXRDYXRlZ29yeShwb3J0cmFpdCkge1xyXG4gICAgICAgIHJldHVybiBwb3J0cmFpdC5kYXRhc2V0LmNhdGVnb3J5IHx8ICdTdXBwb3J0JztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZWxlY3RlZFJvbGVzKCkge1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0geyBUYW5rOiAwLCBEUFM6IDAsIEhlYWxlcjogMCwgU3VwcG9ydDogMCB9O1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHBwID0+IHBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgaWYgKHApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhdCA9IGdldENhdGVnb3J5KHApO1xyXG4gICAgICAgICAgICAgICAgcm9sZXNbY2F0XSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhblNlbGVjdFJvbGUocG9ydHJhaXRFbCkge1xyXG4gICAgICAgIGNvbnN0IGNhdCA9IGdldENhdGVnb3J5KHBvcnRyYWl0RWwpO1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgIHJldHVybiByb2xlc1tjYXRdIDwgMTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGVjayBpZiBhIExlZ2VuZCBjaGFyYWN0ZXIgaXMgY3VycmVudGx5IHNlbGVjdGVkXHJcbiAgICBmdW5jdGlvbiBpc0xlZ2VuZFNlbGVjdGVkKCkge1xyXG4gICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMubGVuZ3RoICE9PSAxKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgY29uc3QgcCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHBwID0+IHBwLmRhdGFzZXQuaWQgPT09IHNlbGVjdGVkSGVyb0lkc1swXSk7XHJcbiAgICAgICAgcmV0dXJuIHAgJiYgZ2V0Q2F0ZWdvcnkocCkgPT09ICdMZWdlbmQnO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcnRyYWl0cy5mb3JFYWNoKHBvcnRyYWl0ID0+IHtcclxuICAgICAgICBwb3J0cmFpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHBvcnRyYWl0LmRhdGFzZXQuaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwb3J0cmFpdC5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGUgPSBwb3J0cmFpdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01pbiA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01pbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01heCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01heCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuc3BlZWQpO1xyXG4gICAgICAgICAgICBjb25zdCBkb2RnZSA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRvZGdlKTtcclxuICAgICAgICAgICAgY29uc3QgY3JpdCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmNyaXQpO1xyXG4gICAgICAgICAgICBjb25zdCBocCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmhwKTtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlRmlsZSA9IHBvcnRyYWl0LmRhdGFzZXQuc3ByaXRlO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5TmFtZSA9IHBvcnRyYWl0LmRhdGFzZXQuYWJpbGl0eU5hbWUgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlEZXNjID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5RGVzYyB8fCAnJztcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUNkID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5Q2QgfHwgJyc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7c3ByaXRlRmlsZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlIdG1sID0gYWJpbGl0eU5hbWUgPyBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFiaWxpdHktc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZpcmUtYWx0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX25hbWVcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eU5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19jZFwiPjxpIGNsYXNzPVwiZmFzIGZhLWhvdXJnbGFzcy1oYWxmXCI+PC9pPiAke2VzY2FwZUh0bWwoYWJpbGl0eUNkKX1UPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX2Rlc2NcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eURlc2MpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCA6ICcnO1xyXG5cclxuICAgICAgICAgICAgLy8gQnVpbGQgc3luZXJneSBpbmZvIGZvciB0aGlzIGNoYXJhY3RlclxyXG4gICAgICAgICAgICBjb25zdCBjaGFyU3luZXJnaWVzID0gc3luZXJneU1hcFtuYW1lXSB8fCBbXTtcclxuICAgICAgICAgICAgbGV0IHN5bmVyZ3lIdG1sID0gJyc7XHJcbiAgICAgICAgICAgIGlmIChjaGFyU3luZXJnaWVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHN5bmVyZ3lIdG1sID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvbl9faGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1saW5rXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25fX3RpdGxlXCI+U3luZXJnaWVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtjaGFyU3luZXJnaWVzLm1hcChzID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25fX2l0ZW0gJHtzZWxlY3RlZEhlcm9lcy5pbmNsdWRlcyhzLnBhcnRuZXIpID8gJ3N5bmVyZ3ktc2VjdGlvbl9faXRlbS0tYWN0aXZlJyA6ICcnfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1zZWN0aW9uX19wYXJ0bmVyXCI+JHtlc2NhcGVIdG1sKHMucGFydG5lcil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1zZWN0aW9uX19zbmFtZVwiPiR7ZXNjYXBlSHRtbChzLm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvbl9fZGVzY1wiPiR7ZXNjYXBlSHRtbChzLmRlc2MpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRldGFpbHMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYW0tZGV0YWlscy1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPiR7bmFtZX08L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicm9sZVwiPiR7cm9sZX08L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnaWYtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzcHJpdGVQYXRofVwiIGFsdD1cIlNwcml0ZSBkZSAke25hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE1HPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWRtZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoZG1nTWF4IC8gU1RBVF9NQVguZG1nKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZG1nTWlufSAtICR7ZG1nTWF4fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VklUPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLXNwZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoc3BlZWQgLyBTVEFUX01BWC5zcGVlZCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke3NwZWVkfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE9ER0U8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tZG9kZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGRvZGdlIC8gU1RBVF9NQVguZG9kZ2UpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkb2RnZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNSSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tY3JpdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoY3JpdCAvIFNUQVRfTUFYLmNyaXQpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtjcml0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+SFA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0taHBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGhwIC8gU1RBVF9NQVguaHApICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtocH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAke2FiaWxpdHlIdG1sfVxyXG4gICAgICAgICAgICAgICAgICAgICR7c3luZXJneUh0bWx9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tc2VsZWN0LXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7aXNTZWxlY3RlZCA/ICdEw6lzw6lsZWN0aW9ubmVyJyA6ICdTw6lsZWN0aW9ubmVyJ31cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYnRuUmlnaHQgPSBkZXRhaWxzLnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2VsZWN0LXJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVDYXQgPSBnZXRDYXRlZ29yeShwb3J0cmFpdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscmVhZHlTZWxlY3RlZCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEw6lzYWN0aXZlciBsZSBib3V0b24gc2kgbGUgc2xvdCBkZSBjZSByw7RsZSBlc3QgZMOpasOgIHByaXNcclxuICAgICAgICAgICAgaWYgKHJvbGVDYXQgIT09ICdMZWdlbmQnICYmICFhbHJlYWR5U2VsZWN0ZWQgJiYgIWNhblNlbGVjdFJvbGUocG9ydHJhaXQpKSB7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IGBTbG90ICR7cm9sZUNhdH0gZMOpasOgIHByaXNgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAvLyBEaXNhYmxlIGlmIGEgTGVnZW5kIGlzIHNlbGVjdGVkIGFuZCB0aGlzIGlzbid0IHRoYXQgTGVnZW5kXHJcbiAgICAgICAgICAgIGlmIChpc0xlZ2VuZFNlbGVjdGVkKCkgJiYgIWFscmVhZHlTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQudGV4dENvbnRlbnQgPSAnVWx0cmEgSW5zdGluY3QgYWN0aWYnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIEVBU1RFUiBFR0c6IExlZ2VuZCBjaGFyYWN0ZXIgZmlsbHMgYWxsIDQgc2xvdHNcclxuICAgICAgICAgICAgICAgIGlmIChyb2xlQ2F0ID09PSAnTGVnZW5kJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlc2VsZWN0IExlZ2VuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlbGVjdCBMZWdlbmQ6IGNsZWFyIGFsbCBhbmQgc2VsZWN0IG9ubHkgdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMgPSBbaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcyA9IFtuYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCkgPyAnRMOpc8OpbGVjdGlvbm5lcicgOiAnU8OpbGVjdGlvbm5lcic7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCBzZWxlY3Rpbmcgbm9ybWFsIGNoYXJzIGlmIExlZ2VuZCBpcyBhY3RpdmVcclxuICAgICAgICAgICAgICAgIGlmIChpc0xlZ2VuZFNlbGVjdGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnVWx0cmEgSW5zdGluY3QgZXN0IGFjdGlmICEgRMOpc8OpbGVjdGlvbm5leiBHb2t1IGRcXCdhYm9yZC4nKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMgPSBzZWxlY3RlZEhlcm9JZHMuZmlsdGVyKGhpZCA9PiBoaWQgIT09IGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcyA9IHNlbGVjdGVkSGVyb2VzLmZpbHRlcihoID0+IGggIT09IG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuU2VsZWN0Um9sZShwb3J0cmFpdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoYFZvdXMgYXZleiBkw6lqw6AgdW4gJHtyb2xlQ2F0fSBkYW5zIHZvdHJlIMOpcXVpcGUgIWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMubGVuZ3RoID49IG1heFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIlZvdXMgcG91dmV6IHPDqWxlY3Rpb25uZXIgbWF4aW11bSA0IHBlcnNvbm5hZ2VzICFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzLnB1c2gobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LnRleHRDb250ZW50ID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKVxyXG4gICAgICAgICAgICAgICAgICAgID8gJ0TDqXPDqWxlY3Rpb25uZXInXHJcbiAgICAgICAgICAgICAgICAgICAgOiAnU8OpbGVjdGlvbm5lcic7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vID09PSBTWU5FUkdZIFNZU1RFTSA9PT1cclxuICAgIGNvbnN0IHRlYW1zUGFnZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlYW1zLXBhZ2UnKTtcclxuICAgIGNvbnN0IHN5bmVyZ3lNYXAgPSB0ZWFtc1BhZ2VFbCA/IEpTT04ucGFyc2UodGVhbXNQYWdlRWwuZGF0YXNldC5zeW5lcmd5TWFwIHx8ICd7fScpIDoge307XHJcblxyXG4gICAgLyogIFpPTkUgw4lRVUlQRSDigJQgc3ByaXRlcyBzZXVsZW1lbnQgKi9cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkVGVhbSgpIHtcclxuICAgICAgICBzZWxlY3RlZExpc3QuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICAgIGNvbnN0IGxlZ2VuZEFjdGl2ZSA9IGlzTGVnZW5kU2VsZWN0ZWQoKTtcclxuXHJcbiAgICAgICAgaWYgKGxlZ2VuZEFjdGl2ZSkge1xyXG4gICAgICAgICAgICAvLyBFYXN0ZXIgZWdnOiBzaG93IEdva3UgeDRcclxuICAgICAgICAgICAgY29uc3QgaGVybyA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBzZWxlY3RlZEhlcm9JZHNbMF0pO1xyXG4gICAgICAgICAgICBpZiAoaGVybykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGhlcm8uZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3ByaXRlUGF0aCA9IGAvYXNzZXQvc3ByaXRlcy8ke2hlcm8uZGF0YXNldC5zcHJpdGV9YDtcclxuICAgICAgICAgICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgNDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGVyb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWhlcm8tc3ByaXRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVyb0VsLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Nwcml0ZVBhdGh9XCIgYWx0PVwiU3ByaXRlIGRlICR7bmFtZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkTGlzdC5hcHBlbmRDaGlsZChoZXJvRWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVybyA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWhlcm8pIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBoZXJvLmRhdGFzZXQubmFtZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwcml0ZVBhdGggPSBgL2Fzc2V0L3Nwcml0ZXMvJHtoZXJvLmRhdGFzZXQuc3ByaXRlfWA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZXJvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGhlcm9FbC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1oZXJvLXNwcml0ZScpO1xyXG4gICAgICAgICAgICAgICAgaGVyb0VsLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c3ByaXRlUGF0aH1cIiBhbHQ9XCJTcHJpdGUgZGUgJHtuYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7bmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRMaXN0LmFwcGVuZENoaWxkKGhlcm9FbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbGVzIGluZGljYXRldXJzIGRlIHLDtGxlc1xyXG4gICAgICAgIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCk7XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGxlcyBzeW5lcmdpZXNcclxuICAgICAgICB1cGRhdGVTeW5lcmd5SGlnaGxpZ2h0cygpO1xyXG5cclxuICAgICAgICBpZiAobGF1bmNoQnRuKSB7XHJcbiAgICAgICAgICAgIGlmIChsZWdlbmRBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGxhdW5jaEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5IZWFsZXIgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgICAgIGxhdW5jaEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU3luZXJneUhpZ2hsaWdodHMoKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBleGlzdGluZyBzeW5lcmd5IGhpZ2hsaWdodHNcclxuICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgcC5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LWF2YWlsYWJsZScsICdzeW5lcmd5LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBjb25zdCBiYWRnZSA9IHAucXVlcnlTZWxlY3RvcignLnN5bmVyZ3ktYmFkZ2UnKTtcclxuICAgICAgICAgICAgaWYgKGJhZGdlKSBiYWRnZS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gR2V0IG5hbWVzIG9mIHNlbGVjdGVkIGhlcm9lc1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTmFtZXMgPSBzZWxlY3RlZEhlcm9JZHMubWFwKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHBwID0+IHBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHAgPyBwLmRhdGFzZXQubmFtZSA6IG51bGw7XHJcbiAgICAgICAgfSkuZmlsdGVyKEJvb2xlYW4pO1xyXG5cclxuICAgICAgICAvLyBGaW5kIGFjdGl2ZSBzeW5lcmdpZXMgKGJvdGggbWVtYmVycyBzZWxlY3RlZClcclxuICAgICAgICBjb25zdCBhY3RpdmVTeW5lcmdpZXMgPSBbXTtcclxuICAgICAgICBjb25zdCBzZWVuUGFpcnMgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgc2VsZWN0ZWROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzeW5lcmdpZXMgPSBzeW5lcmd5TWFwW25hbWVdIHx8IFtdO1xyXG4gICAgICAgICAgICBzeW5lcmdpZXMuZm9yRWFjaChzeW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkTmFtZXMuaW5jbHVkZXMoc3luLnBhcnRuZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFpcktleSA9IFtuYW1lLCBzeW4ucGFydG5lcl0uc29ydCgpLmpvaW4oJysnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlZW5QYWlycy5oYXMocGFpcktleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VlblBhaXJzLmFkZChwYWlyS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlU3luZXJnaWVzLnB1c2goeyBuYW1lMTogbmFtZSwgbmFtZTI6IHN5bi5wYXJ0bmVyLCBzeW5lcmd5TmFtZTogc3luLm5hbWUsIGRlc2M6IHN5bi5kZXNjIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcmsgc2VsZWN0ZWQgcG9ydHJhaXRzIHdpdGggYWN0aXZlIHN5bmVyZ3lcclxuICAgICAgICBhY3RpdmVTeW5lcmdpZXMuZm9yRWFjaChzeW4gPT4ge1xyXG4gICAgICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgocC5kYXRhc2V0Lm5hbWUgPT09IHN5bi5uYW1lMSB8fCBwLmRhdGFzZXQubmFtZSA9PT0gc3luLm5hbWUyKVxyXG4gICAgICAgICAgICAgICAgICAgICYmIHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhwLmRhdGFzZXQuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gSGlnaGxpZ2h0IHVuc2VsZWN0ZWQgcG9ydHJhaXRzIHRoYXQgaGF2ZSBzeW5lcmd5IHdpdGggc2VsZWN0ZWQgaGVyb2VzXHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMocC5kYXRhc2V0LmlkKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBwTmFtZSA9IHAuZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBjaGFyU3luZXJnaWVzID0gc3luZXJneU1hcFtwTmFtZV0gfHwgW107XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoaW5nID0gY2hhclN5bmVyZ2llcy5maWx0ZXIoc3luID0+IHNlbGVjdGVkTmFtZXMuaW5jbHVkZXMoc3luLnBhcnRuZXIpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaGluZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktYXZhaWxhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYWRnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UuY2xhc3NOYW1lID0gJ3N5bmVyZ3ktYmFkZ2UnO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLWxpbmtcIj48L2k+JztcclxuICAgICAgICAgICAgICAgIGJhZGdlLnRpdGxlID0gbWF0Y2hpbmcubWFwKHMgPT4gcy5uYW1lKS5qb2luKCcsICcpO1xyXG4gICAgICAgICAgICAgICAgcC5hcHBlbmRDaGlsZChiYWRnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzeW5lcmd5IGRpc3BsYXkgcGFuZWxcclxuICAgICAgICB1cGRhdGVTeW5lcmd5RGlzcGxheShhY3RpdmVTeW5lcmdpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVN5bmVyZ3lEaXNwbGF5KGFjdGl2ZVN5bmVyZ2llcykge1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3luZXJneS1kaXNwbGF5Jyk7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSAnc3luZXJneS1kaXNwbGF5JztcclxuICAgICAgICAgICAgY29uc3QgYWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC10ZWFtX19hY3Rpb25zJyk7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgYWN0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmVTeW5lcmdpZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5bmVyZ3ktZGlzcGxheV9fdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWxpbmtcIj48L2k+IFN5bmVyZ2llcyBhY3RpdmVzXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAke2FjdGl2ZVN5bmVyZ2llcy5tYXAocyA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzeW5lcmd5LWRpc3BsYXlfX25hbWVcIj4ke2VzY2FwZUh0bWwocy5zeW5lcmd5TmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19jaGFyc1wiPiR7ZXNjYXBlSHRtbChzLm5hbWUxKX0gKyAke2VzY2FwZUh0bWwocy5uYW1lMil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19kZXNjXCI+JHtlc2NhcGVIdG1sKHMuZGVzYyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUm9sZUluZGljYXRvcnMoKSB7XHJcbiAgICAgICAgY29uc3QgbGVnZW5kQWN0aXZlID0gaXNMZWdlbmRTZWxlY3RlZCgpO1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgIGNvbnN0IGluZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb2xlLWluZGljYXRvcicpO1xyXG4gICAgICAgIGlmIChpbmRpY2F0b3IpIHtcclxuICAgICAgICAgICAgaW5kaWNhdG9yLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb2xlLXNsb3QnKS5mb3JFYWNoKHNsb3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2F0ID0gc2xvdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVnZW5kQWN0aXZlIHx8IHJvbGVzW2NhdF0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbGxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgIFBSRVNFVFNcclxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbiAgICBjb25zdCBzYXZlUHJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1zYXZlLXByZXNldCcpO1xyXG4gICAgY29uc3QgcHJlc2V0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0TW9kYWwnKTtcclxuICAgIGNvbnN0IHByZXNldE5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXROYW1lJyk7XHJcbiAgICBjb25zdCBwcmVzZXRDb25maXJtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldENvbmZpcm0nKTtcclxuICAgIGNvbnN0IHByZXNldENhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRDYW5jZWwnKTtcclxuXHJcbiAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIGJvdXRvbiBzYXV2ZWdhcmRlciBzZWxvbiBsYSBzZWxlY3Rpb25cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNhdmVQcmVzZXRCdG4oKSB7XHJcbiAgICAgICAgaWYgKHNhdmVQcmVzZXRCdG4pIHtcclxuICAgICAgICAgICAgLy8gTGVnZW5kIHRlYW1zIGNhbm5vdCBiZSBzYXZlZCBhcyBwcmVzZXRzXHJcbiAgICAgICAgICAgIGlmIChpc0xlZ2VuZFNlbGVjdGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIHNhdmVQcmVzZXRCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5IZWFsZXIgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgc2F2ZVByZXNldEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcGVsZXIgdXBkYXRlU2F2ZVByZXNldEJ0biBhIGNoYXF1ZSBjaGFuZ2VtZW50IGRlIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0gPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcbiAgICAvLyBPbiBzdXJjaGFyZ2UgZW4gYWpvdXRhbnQgbCdhcHBlbFxyXG4gICAgY29uc3QgX29yaWdVcGRhdGUgPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcblxyXG4gICAgLy8gUGF0Y2g6IGFqb3V0ZXIgbCdhcHBlbCBhIHVwZGF0ZVNhdmVQcmVzZXRCdG4gZGFucyB1cGRhdGVTZWxlY3RlZFRlYW1cclxuICAgIC8vIE9uIGxlIGZhaXQgZW4gd3JhcHBhbnQgbGVzIGluZGljYXRldXJzXHJcbiAgICBjb25zdCBfb3JpZ1JvbGVJbmRpY2F0b3JzID0gdXBkYXRlUm9sZUluZGljYXRvcnM7XHJcblxyXG4gICAgLy8gT3V2cmlyIGxhIG1vZGFsXHJcbiAgICBpZiAoc2F2ZVByZXNldEJ0biAmJiBwcmVzZXRNb2RhbCkge1xyXG4gICAgICAgIHNhdmVQcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHByZXNldE5hbWVJbnB1dC5mb2N1cygpLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGZXJtZXIgbGEgbW9kYWxcclxuICAgICAgICBwcmVzZXRDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByZXNldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtbW9kYWxfX2JhY2tkcm9wJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNhdXZlZ2FyZGVyIGxlIHByZXNldFxyXG4gICAgICAgIHByZXNldENvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcmVzZXROYW1lSW5wdXQudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZGMxNDNjJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnLi4uJztcclxuXHJcbiAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvcHJlc2V0cy9zYXZlJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVySWRzOiBzZWxlY3RlZEhlcm9JZHMubWFwKE51bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWNoYXJnZXIgbGEgcGFnZSBwb3VyIGFmZmljaGVyIGxlIG5vdXZlYXUgcHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yIHx8ICdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUnKTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRW50ZXIgcG91ciB2YWxpZGVyXHJcbiAgICAgICAgcHJlc2V0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHByZXNldENvbmZpcm1CdG4uY2xpY2soKTtcclxuICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhcmdlciB1biBwcmVzZXQgKHNlbGVjdGlvbiBwcm9ncmFtbWF0aXF1ZSBkZXMgcGVyc29ubmFnZXMpXHJcbiAgICBmdW5jdGlvbiBsb2FkUHJlc2V0KGNoYXJhY3Rlcklkcykge1xyXG4gICAgICAgIC8vIFJlc2V0IGxhIHNlbGVjdGlvbiBhY3R1ZWxsZVxyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG5cclxuICAgICAgICAvLyBTZWxlY3Rpb25uZXIgbGVzIHBlcnNvbm5hZ2VzIGR1IHByZXNldFxyXG4gICAgICAgIGNoYXJhY3Rlcklkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWRTdHIgPSBTdHJpbmcoaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3J0cmFpdCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBpZFN0cik7XHJcbiAgICAgICAgICAgIGlmIChwb3J0cmFpdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWRTdHIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMucHVzaChwb3J0cmFpdC5kYXRhc2V0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICB1cGRhdGVTYXZlUHJlc2V0QnRuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3VwcHJpbWVyIHVuIHByZXNldFxyXG4gICAgZnVuY3Rpb24gZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwRWwpIHtcclxuICAgICAgICBpZiAoIWNvbmZpcm0oJ1N1cHByaW1lciBjZSBwcmVzZXQgPycpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGAvdGVhbXMvcHJlc2V0cy8ke3ByZXNldElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlwRWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTaSBwbHVzIGRlIHByZXNldHMsIGNhY2hlciBsYSBiYXJyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXRzLWJhcl9fbGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QgJiYgbGlzdC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0cy1iYXInKT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXR0YWNoZXIgbGVzIGV2ZW50cyBhdXggY2hpcHMgZGUgcHJlc2V0c1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZXNldC1jaGlwJykuZm9yRWFjaChjaGlwID0+IHtcclxuICAgICAgICBjb25zdCBwcmVzZXRJZCA9IGNoaXAuZGF0YXNldC5wcmVzZXRJZDtcclxuICAgICAgICBjb25zdCBjaGFySWRzID0gSlNPTi5wYXJzZShjaGlwLmRhdGFzZXQucHJlc2V0SWRzKTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2xvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbG9hZFByZXNldChjaGFySWRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2RlbGV0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9ic2VydmVyIGxlcyBjaGFuZ2VtZW50cyBkZSBzZWxlY3Rpb24gcG91ciBsZSBib3V0b24gc2F2ZVxyXG4gICAgLy8gT24gdXRpbGlzZSB1biBNdXRhdGlvbk9ic2VydmVyIHN1ciBzZWxlY3RlZExpc3RcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdXBkYXRlU2F2ZVByZXNldEJ0bigpKTtcclxuICAgIGlmIChzZWxlY3RlZExpc3QpIHtcclxuICAgICAgICBzZWxlY3RlZExpc3RPYnNlcnZlci5vYnNlcnZlKHNlbGVjdGVkTGlzdCwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhdW5jaEJ0bikge1xyXG4gICAgICAgIGxhdW5jaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnZvaSBQT1NUIEFKQVggdmVycyAvdGVhbXMvc2VsZWN0XHJcbiAgICAgICAgICAgICAgICBmZXRjaCgnL3RlYW1zL3NlbGVjdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogc2VsZWN0ZWRIZXJvSWRzLm1hcCgoaWQsIGkpID0+IGBjaGFyYWN0ZXJfaWRzWyR7aX1dPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGlkKX1gKS5qb2luKCcmJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlZGlyZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVkaXJpZ2UgbWFudWVsbGVtZW50IHNpIHBhcyBkZSByZWRpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbWF0Y2htYWtpbmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzw6lsZWN0aW9uIGRlIGxcXCfDqXF1aXBlLicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQUk9GSUxFIFBPUFVQXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1wb3B1cF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWNvbnRlbnRdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBvcHVwKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwb3B1cC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3Byb2ZpbGUtcG9wdXAtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwX19iYWNrZHJvcC0tb3BlbicpO1xyXG5cclxuICAgICAgICBpZiAoIWxvYWRlZCkge1xyXG4gICAgICAgICAgICBmZXRjaFByb2ZpbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cCk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmZXRjaFByb2ZpbGUoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9hcGkvcHJvZmlsZScpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9maWxlKGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lcnJvclwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclByb2ZpbGUoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdENsYXNzID0gKHIpID0+IHIgPT09ICd3aW4nID8gJ3Jlc3VsdC0td2luJyA6IHIgPT09ICdsb3NzJyA/ICdyZXN1bHQtLWxvc3MnIDogJ3Jlc3VsdC0tZHJhdyc7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0TGFiZWwgPSAocikgPT4gciA9PT0gJ3dpbicgPyAnVmljdG9pcmUnIDogciA9PT0gJ2xvc3MnID8gJ0RcXHUwMGU5ZmFpdGUnIDogJ051bCc7XHJcblxyXG4gICAgICAgIGNvbnN0IGF2YXRhckh0bWwgPSBkYXRhLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChkYXRhLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiQXZhdGFyIGRlICR7ZXNjYXBlSHRtbChkYXRhLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmFzIGZhLXVzZXItY2lyY2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPmA7XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faWRlbnRpdHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hdmF0YXJcIj4ke2F2YXRhckh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fdXNlcm5hbWVcIj4ke2VzY2FwZUh0bWwoZGF0YS51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5tb3R0byA/IGA8c3BhbiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX21vdHRvXCI+XFx1MDBhYiAke2VzY2FwZUh0bWwoZGF0YS5tb3R0byl9IFxcdTAwYmI8L3NwYW4+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5iaW8gPyBgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19iaW9cIj4ke2VzY2FwZUh0bWwoZGF0YS5iaW8pfTwvcD5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3RhdHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEucmF0aW5nKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPk1NUjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy53aW5zKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPlZpY3RvaXJlczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy5sb3NzZXMpKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+RFxcdTAwZTlmYWl0ZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMud2luUmF0ZSkpfSU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+V2luIFJhdGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXN0YXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IENoYW1waW9uIEZhdm9yaVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19uYW1lXCI+JHtlc2NhcGVIdG1sKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIubmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX3JvbGVcIj4ke2VzY2FwZUh0bWwoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5yb2xlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fY291bnRcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIuZ2FtZXNQbGF5ZWQpKX0gcGFydGllczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubGFzdFRlYW0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlcnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IERlcm5pXFx1MDBlOHJlIFxcdTAwYzlxdWlwZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5sYXN0VGVhbS5tYXAoYyA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX21lbWJlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoYy5uYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fcm9sZVwiPiR7ZXNjYXBlSHRtbChjLnJvbGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEucmVjZW50QmF0dGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zaGllbGQtYWx0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBIaXN0b3JpcXVlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5yZWNlbnRCYXR0bGVzLm1hcChiID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYXJlbmEvcmVwbGF5LyR7cGFyc2VJbnQoYi5pZCwgMTApfVwiIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19lbnRyeSAke3Jlc3VsdENsYXNzKGIucmVzdWx0KX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fcmVzdWx0XCI+JHtyZXN1bHRMYWJlbChiLnJlc3VsdCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19vcHBvbmVudFwiPnZzICR7ZXNjYXBlSHRtbChiLm9wcG9uZW50KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX3R5cGVcIj4ke2VzY2FwZUh0bWwoYi5tYXRjaFR5cGUpLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19kYXRlXCI+JHtlc2NhcGVIdG1sKGIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsYXkgcHJvZmlsZS1oaXN0b3J5X19yZXBsYXlcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZW1wdHlcIj5BdWN1biBjb21iYXQgZW5yZWdpc3RyXFx1MDBlOTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3Byb2ZpbGVcIiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2VkaXQtbGlua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gXFx1MDBjOWRpdGVyIGxlIHByb2ZpbFxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB9XHJcblxyXG59KTsiLCIvKipcclxuICogQ29tYmF0IEFuaW1hdGlvbiBDb250cm9sbGVyXHJcbiAqIEfDqHJlIGwnYWZmaWNoYWdlIHByb2dyZXNzaWYgZGVzIGxvZ3MgZGUgY29tYmF0IGF2ZWMgYW5pbWF0aW9uc1xyXG4gKi9cclxuY2xhc3MgQ29tYmF0Q29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLmxvZ3MgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFAgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICAvLyBSw6ljdXDDqXJlciBsZXMgbG9ncyBkZXB1aXMgbCdhdHRyaWJ1dCBkYXRhXHJcbiAgICAgICAgY29uc3QgbG9nc0RhdGEgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmNvbWJhdExvZ3M7XHJcbiAgICAgICAgaWYgKGxvZ3NEYXRhKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ3MgPSBKU09OLnBhcnNlKGxvZ3NEYXRhKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyZXVyIHBhcnNpbmcgbG9nczonLCBlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGVzIMOpbMOpbWVudHNcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1sb2ddJyk7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LW92ZXJsYXldJyk7XHJcbiAgICAgICAgdGhpcy5wbGF5QnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXBsYXldJyk7XHJcbiAgICAgICAgdGhpcy5za2lwQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXNraXBdJyk7XHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb21iYXQtc3BlZWRdJyk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgcGVyc29ubmFnZXMgYXZlYyBzdG9ja2FnZSBkZXMgSFAgbWF4IGluaXRpYXV4XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUCA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyU2x1Z3MgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlckhhc0hlYWwgPSB7fTtcclxuICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnMgPSB7fTsgLy8gU3VpdmkgZGVzIGNvb2xkb3ducyBlbiBjb3Vyc1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXMgPSB7fTsgLy8gU3VpdmkgZGVzIHN0YXR1dHMgYWN0aWZzIHBhciBwZXJzb25uYWdlXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2hhcmFjdGVyLW5hbWVdJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbC5kYXRhc2V0LmNoYXJhY3Rlck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJhY3RlclRlYW07XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW19LSR7bmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV0gPSBlbDtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJTbHVnIHx8ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3Rlckhhc0hlYWxba2V5XSA9IGVsLmRhdGFzZXQuaGFzSGVhbCA9PT0gJ3RydWUnO1xyXG5cclxuICAgICAgICAgICAgLy8gRXh0cmFpcmUgbGUgSFAgbWF4IGRlcHVpcyBsZSB0ZXh0ZSBpbml0aWFsXHJcbiAgICAgICAgICAgIGNvbnN0IGhwVGV4dCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcbiAgICAgICAgICAgIGlmIChocFRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gaHBUZXh0LnRleHRDb250ZW50Lm1hdGNoKC8oXFxkKylcXC8oXFxkKykvKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFBba2V5XSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhbGlzZXIgbGVzIHN0YXR1dHMgdmlkZXNcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldID0gdGhpcy5jcmVhdGVFbXB0eVN0YXR1c2VzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgw6lsw6ltZW50cyBkJ2FiaWxpdHkgZGFucyBsZXMgaW5mbyBwYW5lbHNcclxuICAgICAgICB0aGlzLmFiaWxpdHlFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGFyYWN0ZXItaW5mb1tkYXRhLWNoYXItbmFtZV0nKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsLmRhdGFzZXQuY2hhck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJUZWFtO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUVsID0gZWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5Jyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWw6IGFiaWxpdHlFbCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhDZDogcGFyc2VJbnQoYWJpbGl0eUVsLmRhdGFzZXQuYWJpbGl0eU1heENkKSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhZGdlOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LWNkLWJhZGdlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZUVsOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LW5hbWUnKSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uRWw6IGFiaWxpdHlFbC5xdWVyeVNlbGVjdG9yKCdpJyksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENhY2hlciBsJ292ZXJsYXlcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZpZGVyIGxlIGxvZ1xyXG4gICAgICAgIGlmICh0aGlzLmxvZ0NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF1ZGlvXHJcbiAgICAgICAgdGhpcy5hdWRpb1VubG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYXN0VHJhY2tJbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuaXNNdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudm9sdW1lID0gMC4wNTtcclxuICAgICAgICB0aGlzLnNmeFZvbHVtZSA9IDAuMDU7XHJcbiAgICAgICAgdGhpcy5jb21iYXRQbGF5bGlzdCA9IFtcclxuICAgICAgICAgICAgJy9hc3NldC9hdWRpby9jb21iYXQvYnV0Y2hlcnNib3VsZXZhcmRtdXNpYy5tcDMnLFxyXG4gICAgICAgICAgICAnL2Fzc2V0L2F1ZGlvL2NvbWJhdC9jb21iYXRpbnRoZXJ1aW5zLm1wMycsXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgLy8gRWFzdGVyIGVnZzogVWx0cmEgSW5zdGluY3QgbXVzaWMgb3ZlcnJpZGUgd2hlbiBHb2t1IGlzIHByZXNlbnRcclxuICAgICAgICBjb25zdCBoYXNHb2t1ID0gQXJyYXkuZnJvbSh0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jaGFyYWN0ZXItc2x1Z10nKSlcclxuICAgICAgICAgICAgLnNvbWUoZWwgPT4gZWwuZGF0YXNldC5jaGFyYWN0ZXJTbHVnID09PSAnZ29rdScpO1xyXG4gICAgICAgIGlmIChoYXNHb2t1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tYmF0UGxheWxpc3QgPSBbJy9hc3NldC9hdWRpby9jb21iYXQvdWx0cmEtaW5zdGluY3QubXAzJ107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmVuZE11c2ljID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNmeENhY2hlID0ge307XHJcbiAgICAgICAgdGhpcy5tdXRlQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtYXVkaW8tbXV0ZV0nKTtcclxuICAgICAgICB0aGlzLnZvbHVtZVNsaWRlciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWF1ZGlvLXZvbHVtZV0nKTtcclxuICAgICAgICB0aGlzLnNmeFNsaWRlciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNmeC12b2x1bWVdJyk7XHJcblxyXG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyBMYW5jZXIgYXV0b21hdGlxdWVtZW50IGFwcsOocyB1biBkw6lsYWlcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGxheSgpLCA4MDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBTVEFUVVMgVFJBQ0tJTkcgPT09XHJcblxyXG4gICAgY3JlYXRlRW1wdHlTdGF0dXNlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBibGVlZGluZzogMCxcclxuICAgICAgICAgICAgYmxpZ2h0ZWQ6IDAsXHJcbiAgICAgICAgICAgIHN0dW5uZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBtYXJrZWQ6IDAsXHJcbiAgICAgICAgICAgIHByb3RlY3RlZDogMCxcclxuICAgICAgICAgICAgc3RlYWx0aGVkOiAwLFxyXG4gICAgICAgICAgICByaXBvc3RlOiAwLFxyXG4gICAgICAgICAgICBkbWdVcDogMCxcclxuICAgICAgICAgICAgc3BkVXA6IDAsXHJcbiAgICAgICAgICAgIGRvZGdlVXA6IDAsXHJcbiAgICAgICAgICAgIGNyaXRVcDogMCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYXJhY3RlclN0YXR1c2VzKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncm91bmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50aWNrUm91bmRTdGF0dXNlcygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyB0aWNrUm91bmRTdGF0dXNlcyBhbHJlYWR5IGNhbGxzIHJlbmRlckFsbFN0YXR1c0ljb25zXHJcblxyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFiaWxpdHlTdGF0dXNDaGFuZ2UobG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnZGVmZW5kJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAncHJvdGVjdGVkJywgbG9nLmR1cmF0aW9uIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudHVybnNSZW1haW5pbmcgIT09IHVuZGVmaW5lZCAmJiBsb2cudHVybnNSZW1haW5pbmcgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxlZWRpbmcnLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50dXJuc1JlbWFpbmluZyAhPT0gdW5kZWZpbmVkICYmIGxvZy50dXJuc1JlbWFpbmluZyA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGlnaHRlZCcsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdzdHVubmVkX3NraXAnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdzdHVubmVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgLy8gU3RlYWx0aCBjb25zdW1lZCBvbiBhdHRhY2tcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuYXR0YWNrZXIgJiYgbG9nLmF0dGFja2VyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2xvZy5hdHRhY2tlclRlYW19LSR7bG9nLmF0dGFja2VyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XSAmJiB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0uc3RlYWx0aGVkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0uc3RlYWx0aGVkID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ3N5bmVyZ3lfdHJpZ2dlcic6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVN5bmVyZ3lTdGF0dXNDaGFuZ2UobG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckFsbFN0YXR1c2VzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJBbGxTdGF0dXNJY29ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUFiaWxpdHlTdGF0dXNDaGFuZ2UobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cuc3VidHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF9hdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJywgbG9nLmJsZWVkVHVybnMgfHwgMyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmFsbEhpdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmltYXJ5ID0gbG9nLmFsbEhpdHMuZmluZChoID0+IGguaXNQcmltYXJ5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJpbWFyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhwcmltYXJ5Lm5hbWUsIHByaW1hcnkudGVhbSwgJ2JsaWdodGVkJywgbG9nLmJsaWdodFR1cm5zIHx8IDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9nLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnLCBsb2cuYmxpZ2h0VHVybnMgfHwgMyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnc3R1bm5lZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcmsnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ21hcmtlZCcsIGxvZy5tYXJrVHVybnMgfHwgMyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sICdyaXBvc3RlJywgbG9nLnJpcG9zdGVUdXJucyB8fCAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWxmX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5QnVmZlN0YXR1c2VzKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cuYnVmZnMsIGxvZy5idWZmRHVyYXRpb24gfHwgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5VGVhbUJ1ZmZTdGF0dXNlcyhsb2cuY2FzdGVyVGVhbSwgbG9nLmJ1ZmZzLCBsb2cuYnVmZkR1cmF0aW9uIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0ZWFsdGgnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgJ3N0ZWFsdGhlZCcsIGxvZy5zdGVhbHRoVHVybnMgfHwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdF9kb2RnZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAncHJvdGVjdGVkJywgbG9nLnByb3RlY3RUdXJucyB8fCAyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2RvZGdlVXAnLCBsb2cucHJvdGVjdFR1cm5zIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuc2VsZkJsZWVkVHVybnMgJiYgbG9nLnNlbGZCbGVlZFR1cm5zID4gMCAmJiBsb2cuY2FzdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sICdibGVlZGluZycsIGxvZy5zZWxmQmxlZWRUdXJucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYm9udXNfdnNfbWFya2VkJzpcclxuICAgICAgICAgICAgICAgIC8vIE1hcmsgbWF5IGJlIGNvbnN1bWVkIG9uIGhpdCAocmVtb3ZlT25IaXQpXHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRLZXkgPSBgJHtsb2cudGFyZ2V0VGVhbX0tJHtsb2cudGFyZ2V0fWA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2FuJ3Qga25vdyBmb3Igc3VyZSBpZiByZW1vdmVPbkhpdCwgc28gbGVhdmUgdGhlIGljb24gLSBpdCB3aWxsIHRpY2sgZG93blxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVN5bmVyZ3lTdGF0dXNDaGFuZ2UobG9nKSB7XHJcbiAgICAgICAgaWYgKCFsb2cuZWZmZWN0VHlwZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGxvZy5lZmZlY3RUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2dyYW50X3JpcG9zdGUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtLCAncmlwb3N0ZScsIGxvZy5ncmFudGVkVHVybnMgfHwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndGVtcF9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuYnVmZlR5cGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBsb2cuYnVmZkR1cmF0aW9uIHx8IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nLmJ1ZmZUeXBlcy5mb3JFYWNoKHR5cGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNLZXkgPSB0aGlzLmJ1ZmZUeXBlVG9TdGF0dXNLZXkodHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXNLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5wYXJ0bmVyQ2hhciwgbG9nLnBhcnRuZXJDaGFyVGVhbSwgc3RhdHVzS2V5LCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhcHBseV9tYXJrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdtYXJrZWQnLCBsb2cubWFya1R1cm5zIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2dyYW50X2RvZGdlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5wYXJ0bmVyQ2hhciwgbG9nLnBhcnRuZXJDaGFyVGVhbSwgJ2RvZGdlVXAnLCBsb2cuZG9kZ2VEdXJhdGlvbiB8fCAyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdleHRlbmRfc3RlYWx0aCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnBhcnRuZXJDaGFyICYmIGxvZy5wYXJ0bmVyQ2hhclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtsb2cucGFydG5lckNoYXJUZWFtfS0ke2xvZy5wYXJ0bmVyQ2hhcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldLnN0ZWFsdGhlZCArPSAobG9nLmV4dHJhVHVybnMgfHwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2d1YXJhbnRlZWRfY3JpdCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cucGFydG5lckNoYXIsIGxvZy5wYXJ0bmVyQ2hhclRlYW0sICdjcml0VXAnLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBidWZmVHlwZVRvU3RhdHVzS2V5KHR5cGUpIHtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnZGFtYWdlJzogcmV0dXJuICdkbWdVcCc7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NwZWVkJzogcmV0dXJuICdzcGRVcCc7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RvZGdlJzogcmV0dXJuICdkb2RnZVVwJztcclxuICAgICAgICAgICAgY2FzZSAnY3JpdCc6IHJldHVybiAnY3JpdFVwJztcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5QnVmZlN0YXR1c2VzKGNoYXJOYW1lLCB0ZWFtTmFtZSwgYnVmZnMsIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgaWYgKCFidWZmcykgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW1OYW1lfS0ke2NoYXJOYW1lfWA7XHJcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XTtcclxuICAgICAgICBpZiAoIXMpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKGJ1ZmZzLmRhbWFnZSAmJiBidWZmcy5kYW1hZ2UgPiAwKSBzLmRtZ1VwID0gTWF0aC5tYXgocy5kbWdVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgIGlmIChidWZmcy5zcGVlZCAmJiBidWZmcy5zcGVlZCA+IDApIHMuc3BkVXAgPSBNYXRoLm1heChzLnNwZFVwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgaWYgKGJ1ZmZzLmRvZGdlICYmIGJ1ZmZzLmRvZGdlID4gMCkgcy5kb2RnZVVwID0gTWF0aC5tYXgocy5kb2RnZVVwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgaWYgKGJ1ZmZzLmNyaXQgJiYgYnVmZnMuY3JpdCA+IDApIHMuY3JpdFVwID0gTWF0aC5tYXgocy5jcml0VXAsIGR1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseVRlYW1CdWZmU3RhdHVzZXModGVhbU5hbWUsIGJ1ZmZzLCBkdXJhdGlvbikge1xyXG4gICAgICAgIGlmICghYnVmZnMpIHJldHVybjtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLmNoYXJhY3RlclN0YXR1c2VzKSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgodGVhbU5hbWUgKyAnLScpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZzLmRhbWFnZSAmJiBidWZmcy5kYW1hZ2UgPiAwKSBzLmRtZ1VwID0gTWF0aC5tYXgocy5kbWdVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZzLnNwZWVkICYmIGJ1ZmZzLnNwZWVkID4gMCkgcy5zcGRVcCA9IE1hdGgubWF4KHMuc3BkVXAsIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmcy5kb2RnZSAmJiBidWZmcy5kb2RnZSA+IDApIHMuZG9kZ2VVcCA9IE1hdGgubWF4KHMuZG9kZ2VVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZzLmNyaXQgJiYgYnVmZnMuY3JpdCA+IDApIHMuY3JpdFVwID0gTWF0aC5tYXgocy5jcml0VXAsIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRTdGF0dXMoY2hhck5hbWUsIHRlYW1OYW1lLCBzdGF0dXNLZXksIHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gYCR7dGVhbU5hbWV9LSR7Y2hhck5hbWV9YDtcclxuICAgICAgICBpZiAoIXRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XVtzdGF0dXNLZXldID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJBbGxTdGF0dXNlcyhjaGFyTmFtZSwgdGVhbU5hbWUpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtTmFtZX0tJHtjaGFyTmFtZX1gO1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0pIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldID0gdGhpcy5jcmVhdGVFbXB0eVN0YXR1c2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRpY2tSb3VuZFN0YXR1c2VzKCkge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXMpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV07XHJcbiAgICAgICAgICAgIC8vIERPVHM6IE5PVCBkZWNyZW1lbnRlZCBoZXJlLCBoYW5kbGVkIGJ5IGJsZWVkX3RpY2svYmxpZ2h0X3RpY2sgbG9nc1xyXG4gICAgICAgICAgICAvLyBEZWNyZW1lbnQgZHVyYXRpb24tYmFzZWQgc3RhdHVzZXMgKHNraXAgcGVybWFuZW50IGJ1ZmZzID49IDk5OSlcclxuICAgICAgICAgICAgaWYgKHMubWFya2VkID4gMCAmJiBzLm1hcmtlZCA8IDk5OSkgcy5tYXJrZWQtLTtcclxuICAgICAgICAgICAgaWYgKHMucHJvdGVjdGVkID4gMCAmJiBzLnByb3RlY3RlZCA8IDk5OSkgcy5wcm90ZWN0ZWQtLTtcclxuICAgICAgICAgICAgaWYgKHMuc3RlYWx0aGVkID4gMCAmJiBzLnN0ZWFsdGhlZCA8IDk5OSkgcy5zdGVhbHRoZWQtLTtcclxuICAgICAgICAgICAgaWYgKHMucmlwb3N0ZSA+IDAgJiYgcy5yaXBvc3RlIDwgOTk5KSBzLnJpcG9zdGUtLTtcclxuICAgICAgICAgICAgaWYgKHMuZG1nVXAgPiAwICYmIHMuZG1nVXAgPCA5OTkpIHMuZG1nVXAtLTtcclxuICAgICAgICAgICAgaWYgKHMuc3BkVXAgPiAwICYmIHMuc3BkVXAgPCA5OTkpIHMuc3BkVXAtLTtcclxuICAgICAgICAgICAgaWYgKHMuZG9kZ2VVcCA+IDAgJiYgcy5kb2RnZVVwIDwgOTk5KSBzLmRvZGdlVXAtLTtcclxuICAgICAgICAgICAgaWYgKHMuY3JpdFVwID4gMCAmJiBzLmNyaXRVcCA8IDk5OSkgcy5jcml0VXAtLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW5kZXJBbGxTdGF0dXNJY29ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckFsbFN0YXR1c0ljb25zKCkge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU3RhdHVzSWNvbnMoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU3RhdHVzSWNvbnMoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgZWwgPSB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzLWljb25zJyk7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XTtcclxuICAgICAgICBjb25zdCBpY29ucyA9IFtdO1xyXG5cclxuICAgICAgICAvLyBEZWJ1ZmZzXHJcbiAgICAgICAgaWYgKHMuYmxlZWRpbmcgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLXRpbnQnLCBjbHM6ICdzdGF0dXMtaWNvbi0tYmxlZWQnLCB0aXRsZTogJ1NhaWduZW1lbnQnIH0pO1xyXG4gICAgICAgIGlmIChzLmJsaWdodGVkID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1za3VsbC1jcm9zc2JvbmVzJywgY2xzOiAnc3RhdHVzLWljb24tLWJsaWdodCcsIHRpdGxlOiAnUGVzdGUnIH0pO1xyXG4gICAgICAgIGlmIChzLnN0dW5uZWQpIGljb25zLnB1c2goeyBpY29uOiAnZmEtZGl6enknLCBjbHM6ICdzdGF0dXMtaWNvbi0tc3R1bicsIHRpdGxlOiAnRXRvdXJkaScgfSk7XHJcbiAgICAgICAgaWYgKHMubWFya2VkID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1jcm9zc2hhaXJzJywgY2xzOiAnc3RhdHVzLWljb24tLW1hcmsnLCB0aXRsZTogJ01hcnF1ZScgfSk7XHJcblxyXG4gICAgICAgIC8vIEJ1ZmZzXHJcbiAgICAgICAgaWYgKHMucHJvdGVjdGVkID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1zaGllbGQtYWx0JywgY2xzOiAnc3RhdHVzLWljb24tLXByb3RlY3QnLCB0aXRsZTogJ1Byb3RlZ2UnIH0pO1xyXG4gICAgICAgIGlmIChzLnN0ZWFsdGhlZCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtZXllLXNsYXNoJywgY2xzOiAnc3RhdHVzLWljb24tLXN0ZWFsdGgnLCB0aXRsZTogJ0Z1cnRpZicgfSk7XHJcbiAgICAgICAgaWYgKHMucmlwb3N0ZSA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtZXhjaGFuZ2UtYWx0JywgY2xzOiAnc3RhdHVzLWljb24tLXJpcG9zdGUnLCB0aXRsZTogJ1JpcG9zdGUnIH0pO1xyXG4gICAgICAgIGlmIChzLmRtZ1VwID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1maXN0LXJhaXNlZCcsIGNsczogJ3N0YXR1cy1pY29uLS1kbWctdXAnLCB0aXRsZTogJytEZWdhdHMnIH0pO1xyXG4gICAgICAgIGlmIChzLnNwZFVwID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS13aW5kJywgY2xzOiAnc3RhdHVzLWljb24tLXNwZC11cCcsIHRpdGxlOiAnK1ZpdGVzc2UnIH0pO1xyXG4gICAgICAgIGlmIChzLmRvZGdlVXAgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLXJ1bm5pbmcnLCBjbHM6ICdzdGF0dXMtaWNvbi0tZG9kZ2UtdXAnLCB0aXRsZTogJytFc3F1aXZlJyB9KTtcclxuICAgICAgICBpZiAocy5jcml0VXAgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLWJ1bGxzZXllJywgY2xzOiAnc3RhdHVzLWljb24tLWNyaXQtdXAnLCB0aXRsZTogJytDcml0aXF1ZScgfSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBpY29ucy5tYXAoaSA9PlxyXG4gICAgICAgICAgICBgPHNwYW4gY2xhc3M9XCJzdGF0dXMtaWNvbiAke2kuY2xzfVwiIHRpdGxlPVwiJHtpLnRpdGxlfVwiPjxpIGNsYXNzPVwiZmFzICR7aS5pY29ufVwiPjwvaT48L3NwYW4+YFxyXG4gICAgICAgICkuam9pbignJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IEVORCBTVEFUVVMgVFJBQ0tJTkcgPT09XHJcblxyXG4gICAgYmluZEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5wbGF5QnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlUGxheSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNraXBCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5za2lwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5za2lwKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5zZXRTcGVlZChlKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEF1ZGlvIGNvbnRyb2xzXHJcbiAgICAgICAgaWYgKHRoaXMubXV0ZUJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLm11dGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZU11dGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnZvbHVtZVNsaWRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnZvbHVtZVNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZvbHVtZSA9IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29tYmF0TXVzaWMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbWJhdE11c2ljLnZvbHVtZSA9IHRoaXMuaXNNdXRlZCA/IDAgOiB0aGlzLnZvbHVtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZE11c2ljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRNdXNpYy52b2x1bWUgPSB0aGlzLmlzTXV0ZWQgPyAwIDogdGhpcy52b2x1bWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZnhTbGlkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZnhTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZnhWb2x1bWUgPSBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVbmxvY2sgYXVkaW8gb24gZmlyc3QgdXNlciBpbnRlcmFjdGlvbiAoYnJvd3NlciBhdXRvcGxheSBwb2xpY3kpXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1ZGlvVW5sb2NrZWQpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb1VubG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5TmV4dFRyYWNrKCk7XHJcbiAgICAgICAgfSwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nICYmICF0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTmV4dExvZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVBsYXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZyB8fCB0aGlzLmlzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2tpcCgpIHtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gQWZmaWNoZXIgdG91cyBsZXMgbG9ncyByZXN0YW50c1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9nID0gdGhpcy5sb2dzW3RoaXMuY3VycmVudEluZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TG9nKGxvZyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNrQWJpbGl0eUNvb2xkb3ducyhsb2cpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlclN0YXR1c2VzKGxvZyk7XHJcbiAgICAgICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2RlYXRoJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVhdGgobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFN5bmVyZ3kgdHJpZ2dlcnMgdGhhdCBraWxsIHRhcmdldHNcclxuICAgICAgICAgICAgaWYgKGxvZy50eXBlID09PSAnc3luZXJneV90cmlnZ2VyJyAmJiBsb2cudGFyZ2V0SFAgPT09IDAgJiYgbG9nLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVhdGgobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNob3dWaWN0b3J5T3ZlcmxheSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNwZWVkKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3Qgc3BlZWQgPSBwYXJzZUZsb2F0KGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb21iYXRTcGVlZCk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBsJ1VJXHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMuZm9yRWFjaChidG4gPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NOZXh0TG9nKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcgfHwgdGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWaWN0b3J5T3ZlcmxheSgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbG9nID0gdGhpcy5sb2dzW3RoaXMuY3VycmVudEluZGV4XTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NMb2cobG9nKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxlciBsZSBkw6lsYWlcclxuICAgICAgICBsZXQgZGVsYXkgPSB0aGlzLmdldERlbGF5Rm9yTG9nKGxvZyk7XHJcbiAgICAgICAgZGVsYXkgPSBkZWxheSAvIHRoaXMuc3BlZWQ7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9jZXNzTmV4dExvZygpLCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGVsYXlGb3JMb2cobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdyb3VuZCc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdpbml0aWF0aXZlJzogcmV0dXJuIDYwMDtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzogcmV0dXJuIDMwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOiByZXR1cm4gMjgwMDtcclxuICAgICAgICAgICAgY2FzZSAnZGVmZW5kJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RvZGdlJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzogcmV0dXJuIDM1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3QnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAndmljdG9yeSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2RyYXcnOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgLy8gTm91dmVhdXggdHlwZXNcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfdGljayc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVubmVkX3NraXAnOiByZXR1cm4gMTgwMDtcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6IHJldHVybiB0aGlzLmdldEFiaWxpdHlEZWxheShsb2cpO1xyXG4gICAgICAgICAgICAvLyBTeW5lcmdpZXNcclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV9hbm5vdW5jZSc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X3RyaWdnZXInOiByZXR1cm4gdGhpcy5nZXRTeW5lcmd5VHJpZ2dlckRlbGF5KGxvZyk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAxMjAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTeW5lcmd5VHJpZ2dlckRlbGF5KGxvZykge1xyXG4gICAgICAgIC8vIFJlYWN0aXZlIHN5bmVyZ2llcyAoYm9udXMgYXR0YWNrcykgbmVlZCBtb3JlIHRpbWVcclxuICAgICAgICBpZiAobG9nLmRhbWFnZSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gMzUwMDtcclxuICAgICAgICByZXR1cm4gMjUwMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBYmlsaXR5RGVsYXkobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cuc3VidHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOiByZXR1cm4gMzAwMDtcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6IHJldHVybiAzNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcmsnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9idWZmJzpcclxuICAgICAgICAgICAgY2FzZSAnc2VsZl9idWZmJzpcclxuICAgICAgICAgICAgY2FzZSAnc3RlYWx0aCc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9oZWFsJzogcmV0dXJuIDI4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2J1ZmYnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAnZW1lcmdlbmN5X2hlYWwnOiByZXR1cm4gMjgwMDtcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdF9kb2RnZSc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2Zvcm1fZGFtYWdlJzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3VsdHJhX2luc3RpbmN0JzogcmV0dXJuIDM1MDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAyMDAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTG9nKGxvZykge1xyXG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbihsb2cpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUxvZyhsb2cpO1xyXG5cclxuICAgICAgICAvLyBTeW5jaHJvbmlzZXIgbGEgbWlzZSDDoCBqb3VyIGRlcyBIUCBhdmVjIGwnYW5pbWF0aW9uXHJcbiAgICAgICAgY29uc3QgaHBEZWxheSA9IHRoaXMuZ2V0SFBVcGRhdGVEZWxheShsb2cpO1xyXG4gICAgICAgIGlmIChocERlbGF5ID4gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpLCBocERlbGF5IC8gdGhpcy5zcGVlZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTdWl2aSBkZXMgY29vbGRvd25zXHJcbiAgICAgICAgdGhpcy50cmFja0FiaWxpdHlDb29sZG93bnMobG9nKTtcclxuXHJcbiAgICAgICAgLy8gU3VpdmkgZGVzIHN0YXR1dHMgKGljb25lcyBidWZmL2RlYnVmZilcclxuICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlclN0YXR1c2VzKGxvZyk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhY2tBYmlsaXR5Q29vbGRvd25zKGxvZykge1xyXG4gICAgICAgIC8vIFF1YW5kIHVuZSBjb21ww6l0ZW5jZSBlc3QgdXRpbGlzw6llLCBtZXR0cmUgZW4gY29vbGRvd25cclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdhYmlsaXR5X3VzZScgJiYgbG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlEYXRhID0gdGhpcy5hYmlsaXR5RWxlbWVudHNba2V5XTtcclxuICAgICAgICAgICAgaWYgKGFiaWxpdHlEYXRhICYmIGFiaWxpdHlEYXRhLm1heENkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hYmlsaXR5Q29vbGRvd25zW2tleV0gPSBhYmlsaXR5RGF0YS5tYXhDZDtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheShrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBIGNoYXF1ZSBub3V2ZWF1IHJvdW5kLCBkw6ljcsOpbWVudGVyIHRvdXMgbGVzIGNvb2xkb3duc1xyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ3JvdW5kJykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmFiaWxpdHlDb29sZG93bnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheShrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUFiaWxpdHlDb29sZG93bkRpc3BsYXkoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgYWJpbGl0eURhdGEgPSB0aGlzLmFiaWxpdHlFbGVtZW50c1trZXldO1xyXG4gICAgICAgIGlmICghYWJpbGl0eURhdGEpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY2QgPSB0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XSB8fCAwO1xyXG5cclxuICAgICAgICBpZiAoY2QgPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIEVuIGNvb2xkb3duIDogZ3Jpc2VyICsgYWZmaWNoZXIgYmFkZ2VcclxuICAgICAgICAgICAgYWJpbGl0eURhdGEuZWwuY2xhc3NMaXN0LmFkZCgnY2hhcmFjdGVyLWluZm9fX2FiaWxpdHktLW9uLWNkJyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RGF0YS5iYWRnZSkge1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eURhdGEuYmFkZ2UudGV4dENvbnRlbnQgPSBgJHtjZH1UYDtcclxuICAgICAgICAgICAgICAgIGFiaWxpdHlEYXRhLmJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFByw6p0IDogcmV0aXJlciBsZSBncmlzXHJcbiAgICAgICAgICAgIGFiaWxpdHlEYXRhLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2NoYXJhY3Rlci1pbmZvX19hYmlsaXR5LS1vbi1jZCcpO1xyXG4gICAgICAgICAgICBpZiAoYWJpbGl0eURhdGEuYmFkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGFiaWxpdHlEYXRhLmJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SFBVcGRhdGVEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6IHJldHVybiAzNTA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOiByZXR1cm4gNDAwO1xyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6IHJldHVybiAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzogcmV0dXJuIDIwMDtcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOiByZXR1cm4gMjAwO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2FjdGl2YXRlJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAnYWJpbGl0eV91c2UnOiByZXR1cm4gdGhpcy5nZXRBYmlsaXR5SFBEZWxheShsb2cpO1xyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X3RyaWdnZXInOiByZXR1cm4gODAwO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWJpbGl0eUhQRGVsYXkobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cuc3VidHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfYXR0YWNrJzpcclxuICAgICAgICAgICAgY2FzZSAnYmFja2xpbmVfc3RyaWtlJzpcclxuICAgICAgICAgICAgY2FzZSAnYXJtb3JfcGllcmNlJzpcclxuICAgICAgICAgICAgY2FzZSAnYm9udXNfdnNfbWFya2VkJzpcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6IHJldHVybiAzNTA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2hlYWwnOlxyXG4gICAgICAgICAgICBjYXNlICdlbWVyZ2VuY3lfaGVhbCc6IHJldHVybiA0MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyYW5zZm9ybV9kYW1hZ2UnOiByZXR1cm4gMjAwO1xyXG4gICAgICAgICAgICBjYXNlICd1bHRyYV9pbnN0aW5jdCc6IHJldHVybiA0MDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QW5pbWF0aW9uKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuYXR0YWNrZXIsIGxvZy5hdHRhY2tlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cuaXNDcml0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmhlYWxlciwgbG9nLmhlYWxlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVmZW5kKGxvZy5kZWZlbmRlciwgbG9nLmRlZmVuZGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9kZ2UobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBOb3V2ZWF1eCB0eXBlc1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVubmVkX3NraXAnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3R1bm5lZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmF0dGFja2VyLCBsb2cuYXR0YWNrZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheUFiaWxpdHlBbmltYXRpb24obG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBTeW5lcmdpZXNcclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV9hbm5vdW5jZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTeW5lcmd5QW5ub3VuY2UobG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X3RyaWdnZXInOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3luZXJneVRyaWdnZXIobG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gTk9VVkVMTEVTIEFOSU1BVElPTlMgPT09XHJcblxyXG4gICAgYW5pbWF0ZURvVCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtLCBkb3RDbGFzcykge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKGRvdENsYXNzKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShkb3RDbGFzcyksIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlU3R1bm5lZCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3N0dW5uZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc3R1bm5lZCcpLCAxNDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZU1hcmtlZCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ21hcmtlZCcpO1xyXG4gICAgICAgICAgICAvLyBMYSBtYXJxdWUgcmVzdGUgdmlzaWJsZSBwbHVzIGxvbmd0ZW1wc1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdtYXJrZWQnKSwgMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVCdWZmKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnYnVmZmVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2J1ZmZlZCcpLCAxNDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVN0ZWFsdGgodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzdGVhbHRoZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc3RlYWx0aGVkJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QWJpbGl0eUFuaW1hdGlvbihsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJyksIDcwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsaWdodEtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoYmxpZ2h0S2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoYmxpZ2h0S2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXN0ZXJFbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhc3RlckVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc3RlckVsLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2luZycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGNhc3RlckVsLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGFja2luZycpLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBBT0U6IGh1cnQgYWxsIGhpdCBlbmVtaWVzXHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmFsbEhpdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nLmFsbEhpdHMuZm9yRWFjaChoID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGgubmFtZSwgaC50ZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2h1cnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnKSwgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBCbGlnaHQgRE9UIGFuaW1hdGlvbiBvbmx5IG9uIHByaW1hcnkgdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpbWFyeSA9IGxvZy5hbGxIaXRzLmZpbmQoaCA9PiBoLmlzUHJpbWFyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByaW1hcnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFuaW1hdGVEb1QocHJpbWFyeS5uYW1lLCBwcmltYXJ5LnRlYW0sICdibGlnaHRlZCcpLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBGYWxsYmFjayBmb3Igb2xkIGxvZyBmb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsaWdodGVkJyksIDcwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZVN0dW5uZWQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pLCA3MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcmsnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXJrS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShtYXJrS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngobWFya0tleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkgdGhpcy5hbmltYXRlTWFya2VkKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByaXBvc3RlS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShyaXBvc3RlS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngocmlwb3N0ZUtleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc2VsZl9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZkJ1ZmZLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWJvbWluYXRpb24gVHJhbnNmb3JtYXRpb24gOiBzd2l0Y2ggc2x1ZyB0byBiZWFzdCBwZXJtYW5lbnRseVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2cuYWJpbGl0eU5hbWUgPT09ICdUcmFuc2Zvcm1hdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTbHVnc1tzZWxmQnVmZktleV0gPSAnYmVhc3QnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoc2VsZkJ1ZmZLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChzZWxmQnVmZktleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfaGVhbCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnR5SGVhbEtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHBhcnR5SGVhbEtleSwgJ2hlYWwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVIZWFsKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWVyIHRvdXMgbGVzIGFsbGnDqXMgc29pZ27DqXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9nLmhlYWxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2cuaGVhbGVkLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChoLm5hbWUsIGgudGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdoZWFsZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxlZCcpLCAxNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0eUJ1ZmZLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHBhcnR5QnVmZktleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHBhcnR5QnVmZktleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBBbmltZXIgdG91cyBsZXMgYWxsacOpcyBkdSBtw6ptZSBjw7R0w6lcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVRlYW1CdWZmKGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdGVhbHRoJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RlYWx0aEtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoc3RlYWx0aEtleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHN0ZWFsdGhLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN0ZWFsdGgobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FybW9yX3BpZXJjZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JhY2tsaW5lX3N0cmlrZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvbnVzX3ZzX21hcmtlZCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgbG9nLmlzQ3JpdCB8fCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZW1lcmdlbmN5X2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbWVyZ0hlYWxLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChlbWVyZ0hlYWxLZXksICdoZWFsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3RfZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm90RG9kZ2VLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChwcm90RG9kZ2VLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlZmVuZChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnKSwgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndWx0cmFfaW5zdGluY3QnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1aUtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUodWlLZXksICdhdHRhY2thbmltYXRpb24ud2VicCcsIDE4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngodWlLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVpQ2FzdGVyRWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1aUNhc3RlckVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpQ2FzdGVyRWwuY2xhc3NMaXN0LmFkZCgndWx0cmEtaW5zdGluY3QtYXR0YWNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdWlDYXN0ZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCd1bHRyYS1pbnN0aW5jdC1hdHRhY2snKSwgMTgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdWlUYXJnZXRFbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1aVRhcmdldEVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aVRhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2h1cnQnLCAnY3JpdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB1aVRhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnLCAnY3JpdCcpLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlVGVhbUJ1ZmYoY2FzdGVyVGVhbSkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY2hhcmFjdGVyRWxlbWVudHMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKGNhc3RlclRlYW0pKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2J1ZmZlZCcpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdidWZmZWQnKSwgMTQwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gU1lORVJHWSBBTklNQVRJT05TID09PVxyXG5cclxuICAgIGFuaW1hdGVTeW5lcmd5QW5ub3VuY2UobG9nKSB7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudHJpZ2dlckNoYXIsIGxvZy50ZWFtKTtcclxuICAgICAgICBjb25zdCBwYXJ0bmVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy5wYXJ0bmVyQ2hhciwgbG9nLnRlYW0pO1xyXG5cclxuICAgICAgICBpZiAodHJpZ2dlcikge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktYW5ub3VuY2UtZ2xvdycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS1hbm5vdW5jZS1nbG93JyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFydG5lcikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBhcnRuZXIuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1hbm5vdW5jZS1nbG93Jyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHBhcnRuZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS1hbm5vdW5jZS1nbG93JyksIDE1MDApO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRHJhdyBTVkcgbGluayBiZXR3ZWVuIHRoZSB0d29cclxuICAgICAgICBpZiAodHJpZ2dlciAmJiBwYXJ0bmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1N5bmVyZ3lMaW5rKHRyaWdnZXIsIHBhcnRuZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlU3luZXJneVRyaWdnZXIobG9nKSB7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudHJpZ2dlckNoYXIsIGxvZy50cmlnZ2VyQ2hhclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHBhcnRuZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtKTtcclxuXHJcbiAgICAgICAgLy8gUGhhc2UgMTogVHJpZ2dlciBnbG93XHJcbiAgICAgICAgaWYgKHRyaWdnZXIpIHtcclxuICAgICAgICAgICAgdHJpZ2dlci5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LXRyaWdnZXItZ2xvdycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS10cmlnZ2VyLWdsb3cnKSwgMTgwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQaGFzZSAyOiBTVkcgbGluayBiZXR3ZWVuIHRyaWdnZXIgYW5kIHBhcnRuZXJcclxuICAgICAgICBpZiAodHJpZ2dlciAmJiBwYXJ0bmVyKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kcmF3U3luZXJneUxpbmsodHJpZ2dlciwgcGFydG5lciksIDQwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQaGFzZSAzOiBQYXJ0bmVyIHJlYWN0aW9uXHJcbiAgICAgICAgaWYgKHBhcnRuZXIpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0bmVyLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktcmVhY3QnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcGFydG5lci5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LXJlYWN0JyksIDgwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgaXQncyBhIGJvbnVzIGF0dGFjaywgYW5pbWF0ZSB0aGUgcGFydG5lciBhdHRhY2tpbmdcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuZGFtYWdlICE9PSB1bmRlZmluZWQgJiYgbG9nLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRuZXJLZXkgPSBgJHtsb2cucGFydG5lckNoYXJUZWFtfS0ke2xvZy5wYXJ0bmVyQ2hhcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShwYXJ0bmVyS2V5LCAnYXR0YWNrYW5pbWF0aW9uLndlYnAnLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHBhcnRuZXJLZXksICdhdHRhY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2h1cnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnKSwgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdTeW5lcmd5TGluayhlbDEsIGVsMikge1xyXG4gICAgICAgIGNvbnN0IHN0YWdlID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmJhdHRsZS1zdGFnZScpO1xyXG4gICAgICAgIGlmICghc3RhZ2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGV4aXN0aW5nIFNWRyBpZiBhbnlcclxuICAgICAgICBjb25zdCBleGlzdGluZ1N2ZyA9IHN0YWdlLnF1ZXJ5U2VsZWN0b3IoJy5zeW5lcmd5LWxpbmstc3ZnJyk7XHJcbiAgICAgICAgaWYgKGV4aXN0aW5nU3ZnKSBleGlzdGluZ1N2Zy5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKTtcclxuICAgICAgICBzdmcuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1saW5rLXN2ZycpO1xyXG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpO1xyXG5cclxuICAgICAgICBjb25zdCBzdGFnZVJlY3QgPSBzdGFnZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCByZWN0MSA9IGVsMS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCByZWN0MiA9IGVsMi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgY29uc3QgeDEgPSByZWN0MS5sZWZ0ICsgcmVjdDEud2lkdGggLyAyIC0gc3RhZ2VSZWN0LmxlZnQ7XHJcbiAgICAgICAgY29uc3QgeTEgPSByZWN0MS50b3AgKyByZWN0MS5oZWlnaHQgLyAyIC0gc3RhZ2VSZWN0LnRvcDtcclxuICAgICAgICBjb25zdCB4MiA9IHJlY3QyLmxlZnQgKyByZWN0Mi53aWR0aCAvIDIgLSBzdGFnZVJlY3QubGVmdDtcclxuICAgICAgICBjb25zdCB5MiA9IHJlY3QyLnRvcCArIHJlY3QyLmhlaWdodCAvIDIgLSBzdGFnZVJlY3QudG9wO1xyXG5cclxuICAgICAgICBjb25zdCBsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdsaW5lJyk7XHJcbiAgICAgICAgbGluZS5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWxpbmstbGluZScpO1xyXG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd4MScsIHgxKTtcclxuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgneTEnLCB5MSk7XHJcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgeDIpO1xyXG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd5MicsIHkyKTtcclxuXHJcbiAgICAgICAgc3ZnLmFwcGVuZENoaWxkKGxpbmUpO1xyXG4gICAgICAgIHN0YWdlLmFwcGVuZENoaWxkKHN2Zyk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBhZnRlciBhbmltYXRpb25cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHN2Zy5yZW1vdmUoKSwgMTgwMCAvIHRoaXMuc3BlZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBTUFJJVEUgU1dBUCA9PT1cclxuXHJcbiAgICBzd2FwU3ByaXRlKGtleSwgc3ByaXRlTmFtZSwgZHVyYXRpb24pIHtcclxuICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICBpZiAoIWVsKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgc2x1ZyA9IHRoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XTtcclxuICAgICAgICBpZiAoIXNsdWcpIHJldHVybjtcclxuICAgICAgICBjb25zdCBpbWcgPSBlbC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLXNwcml0ZScpO1xyXG4gICAgICAgIGlmICghaW1nKSByZXR1cm47XHJcbiAgICAgICAgaW1nLnNyYyA9IGAvYXNzZXQvaW1nL2NvbWJhdC8ke3NsdWd9LyR7c3ByaXRlTmFtZX1gO1xyXG4gICAgICAgIGlmIChkdXJhdGlvbiA+IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucygnZGVhZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IGAvYXNzZXQvaW1nL2NvbWJhdC8ke3RoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XX0vZmlnaHRpZGxlLndlYnBgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBBTklNQVRJT05TIEVYSVNUQU5URVMgPT09XHJcblxyXG4gICAgYW5pbWF0ZUF0dGFjayhhdHRhY2tlck5hbWUsIGF0dGFja2VyVGVhbSwgdGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSwgaXNDcml0KSB7XHJcbiAgICAgICAgY29uc3QgYXR0YWNrZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoYXR0YWNrZXJOYW1lLCBhdHRhY2tlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGF0dGFja2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2F0dGFja2VyVGVhbX0tJHthdHRhY2tlck5hbWV9YDtcclxuICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKGtleSwgJ2F0dGFja2FuaW1hdGlvbi53ZWJwJywgMTIwMCk7XHJcbiAgICAgICAgICAgIGF0dGFja2VyLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2luZycpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KGtleSwgJ2F0dGFjaycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGF0dGFja2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGFja2luZycpLCAxMjAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ3JpdCkgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NyaXQnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnLCAnY3JpdCcpLCA4MDApO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlSGVhbChoZWFsZXJOYW1lLCBoZWFsZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgaGVhbGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGhlYWxlck5hbWUsIGhlYWxlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGhlYWxlcikge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtoZWFsZXJUZWFtfS0ke2hlYWxlck5hbWV9YDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVySGFzSGVhbFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnaGVhbGluZy53ZWJwJywgMTUwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnc2tpbGwud2VicCcsIDE1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhlYWxlci5jbGFzc0xpc3QuYWRkKCdoZWFsaW5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoa2V5LCAnaGVhbCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGhlYWxlci5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsaW5nJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGVhbGVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxlZCcpLCAxNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlZmVuZChkZWZlbmRlck5hbWUsIGRlZmVuZGVyVGVhbSkge1xyXG4gICAgICAgIGNvbnN0IGRlZmVuZGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGRlZmVuZGVyTmFtZSwgZGVmZW5kZXJUZWFtKTtcclxuICAgICAgICBpZiAoZGVmZW5kZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7ZGVmZW5kZXJUZWFtfS0ke2RlZmVuZGVyTmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnZGVmZW5kaW5nLndlYnAnLCAxODAwKTtcclxuICAgICAgICAgICAgZGVmZW5kZXIuY2xhc3NMaXN0LmFkZCgnZGVmZW5kaW5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoa2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBkZWZlbmRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWZlbmRpbmcnKSwgMTgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEb2RnZSh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RvZGdpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZG9kZ2luZycpLCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlYXRoKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qga2V5ID0gYCR7dGFyZ2V0VGVhbX0tJHt0YXJnZXROYW1lfWA7XHJcbiAgICAgICAgY29uc3Qgc2x1ZyA9IHRoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XTtcclxuICAgICAgICBjb25zdCBpbWcgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1zcHJpdGUnKTtcclxuXHJcbiAgICAgICAgLy8gVHJ5IHRvIHN3YXAgdG8gY29ycHNlIGltYWdlXHJcbiAgICAgICAgaWYgKGltZyAmJiBzbHVnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvcnBzZUltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICBjb3Jwc2VJbWcuc3JjID0gYC9hc3NldC9pbWcvY29tYmF0LyR7c2x1Z30vY29ycHNlLnBuZ2A7XHJcbiAgICAgICAgICAgIGNvcnBzZUltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3JjID0gY29ycHNlSW1nLnNyYztcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdkZWFkJywgJ2RlYWQtLWNvcnBzZScpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb3Jwc2VJbWcub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIE5vIGNvcnBzZSBpbWFnZSBhdmFpbGFibGUsIHVzZSBDU1MgZmFsbGJhY2tcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdkZWFkJyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RlYWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hhcmFjdGVyRWxlbWVudChuYW1lLCB0ZWFtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcmFjdGVyRWxlbWVudHNbYCR7dGVhbX0tJHtuYW1lfWBdO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlMb2cobG9nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvZ0NvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBlbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBlbnRyeS5jbGFzc05hbWUgPSAnY29tYmF0LWxvZ19fZW50cnknO1xyXG5cclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdyb3VuZCcpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXJvdW5kJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3ZpY3RvcnknKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS12aWN0b3J5Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2RyYXcnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1kZWZlYXQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYWJpbGl0eV91c2UnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1hYmlsaXR5Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsZWVkX3RpY2snKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1ibGVlZCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdibGlnaHRfdGljaycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWJsaWdodCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdzdHVubmVkX3NraXAnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1zdHVuJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3JpcG9zdGVfYWN0aXZhdGUnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1yaXBvc3RlJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3N5bmVyZ3lfYW5ub3VuY2UnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1zeW5lcmd5LWFubm91bmNlJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3N5bmVyZ3lfdHJpZ2dlcicpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXN5bmVyZ3ktdHJpZ2dlcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZW50cnkuaW5uZXJIVE1MID0gbG9nLm1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIuYXBwZW5kQ2hpbGQoZW50cnkpO1xyXG4gICAgICAgIHRoaXMubG9nQ29udGFpbmVyLnNjcm9sbFRvcCA9IHRoaXMubG9nQ29udGFpbmVyLnNjcm9sbEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVIZWFsdGhCYXJzKGxvZykge1xyXG4gICAgICAgIGxldCBjaGFyYWN0ZXJOYW1lID0gbnVsbDtcclxuICAgICAgICBsZXQgdGVhbU5hbWUgPSBudWxsO1xyXG4gICAgICAgIGxldCBjdXJyZW50SFAgPSBudWxsO1xyXG4gICAgICAgIGxldCBtYXhIUCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIETDqXRlcm1pbmVyIGxlcyBkb25uw6llcyBzZWxvbiBsZSB0eXBlIGRlIGxvZ1xyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2F0dGFjaycgfHwgbG9nLnR5cGUgPT09ICdyaXBvc3RlX2FjdGl2YXRlJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnaGVhbCcpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsZWVkX3RpY2snIHx8IGxvZy50eXBlID09PSAnYmxpZ2h0X3RpY2snKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdhYmlsaXR5X3VzZScpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVBYmlsaXR5SGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3N5bmVyZ3lfdHJpZ2dlcicpIHtcclxuICAgICAgICAgICAgLy8gU3luZXJnaWVzIGNhbiBjYXVzZSBkYW1hZ2VcclxuICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldEhQICE9PSB1bmRlZmluZWQgJiYgbG9nLnRhcmdldE1heEhQKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgc2kgbm91cyBhdm9ucyBsZXMgZG9ubsOpZXMgbsOpY2Vzc2FpcmVzXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlck5hbWUgJiYgdGVhbU5hbWUgJiYgY3VycmVudEhQICE9PSBudWxsICYmIGN1cnJlbnRIUCAhPT0gdW5kZWZpbmVkICYmIG1heEhQKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCwgbWF4SFApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBYmlsaXR5SGVhbHRoQmFycyhsb2cpIHtcclxuICAgICAgICAvLyBBT0UgaGl0cyAoYmxpZ2h0X2F0dGFjayk6IHVwZGF0ZSBIUCBmb3IgYWxsIGhpdCBlbmVtaWVzXHJcbiAgICAgICAgaWYgKGxvZy5hbGxIaXRzKSB7XHJcbiAgICAgICAgICAgIGxvZy5hbGxIaXRzLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGgubmFtZSwgaC50ZWFtLCBoLmhwLCBoLm1heEhwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENvbXDDqXRlbmNlcyBxdWkgaW5mbGlnZW50IGRlcyBkw6lnw6J0cyDDoCB1bmUgY2libGVcclxuICAgICAgICBlbHNlIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRIUCAhPT0gdW5kZWZpbmVkICYmIGxvZy50YXJnZXRNYXhIUCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cudGFyZ2V0SFAsIGxvZy50YXJnZXRNYXhIUCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTb2luIGRlIGdyb3VwZSA6IG1ldHRyZSDDoCBqb3VyIGNoYXF1ZSBhbGxpw6kgc29pZ27DqVxyXG4gICAgICAgIGlmIChsb2cuc3VidHlwZSA9PT0gJ3BhcnR5X2hlYWwnICYmIGxvZy5oZWFsZWQpIHtcclxuICAgICAgICAgICAgbG9nLmhlYWxlZC5mb3JFYWNoKGggPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChoLm5hbWUsIGgudGVhbSwgaC5ocCwgaC5tYXhIcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU29pbiBkJ3VyZ2VuY2UgOiBtZXR0cmUgw6Agam91ciBsZSBsYW5jZXVyXHJcbiAgICAgICAgaWYgKGxvZy5zdWJ0eXBlID09PSAnZW1lcmdlbmN5X2hlYWwnICYmIGxvZy5jYXN0ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldEhQLCBsb2cudGFyZ2V0TWF4SFApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDaGFyYWN0ZXJIUChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCBtYXhIUCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSk7XHJcblxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBtYXhIUCA+IDAgPyAoY3VycmVudEhQIC8gbWF4SFApICogMTAwIDogMDtcclxuXHJcbiAgICAgICAgLy8gTWlzZSDDoCBqb3VyIGRlIGxhIGJhcnJlIEhQIGRhbnMgbGEgem9uZSBkZSBjb21iYXQgKGJhdHRsZS1zdGFnZSlcclxuICAgICAgICBjb25zdCBocEJhciA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuaHAtYmFyX19maWxsJyk7XHJcbiAgICAgICAgY29uc3QgaHBUZXh0ID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcblxyXG4gICAgICAgIGlmIChocEJhcikge1xyXG4gICAgICAgICAgICAvLyBBbmltYXRpb24gZmx1aWRlIGRlIGxhIGJhcnJlXHJcbiAgICAgICAgICAgIGhwQmFyLnN0eWxlLnRyYW5zaXRpb24gPSBgd2lkdGggMC4zcyBlYXNlLW91dGA7XHJcbiAgICAgICAgICAgIGhwQmFyLnN0eWxlLndpZHRoID0gYCR7cGVyY2VudH0lYDtcclxuXHJcbiAgICAgICAgICAgIC8vIENsYXNzZXMgZGUgY291bGV1ciBzZWxvbiBsZSBwb3VyY2VudGFnZVxyXG4gICAgICAgICAgICBocEJhci5jbGFzc0xpc3QucmVtb3ZlKCdocC1iYXJfX2ZpbGwtLWxvdycsICdocC1iYXJfX2ZpbGwtLWNyaXRpY2FsJyk7XHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50IDw9IDI1KSB7XHJcbiAgICAgICAgICAgICAgICBocEJhci5jbGFzc0xpc3QuYWRkKCdocC1iYXJfX2ZpbGwtLWNyaXRpY2FsJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGVyY2VudCA8PSA1MCkge1xyXG4gICAgICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LmFkZCgnaHAtYmFyX19maWxsLS1sb3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhwVGV4dCkge1xyXG4gICAgICAgICAgICBocFRleHQudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50SFB9LyR7bWF4SFB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1pc2Ugw6Agam91ciBkZXMgcGFubmVhdXggZCdpbmZvIGxhdMOpcmF1eFxyXG4gICAgICAgIHRoaXMudXBkYXRlSW5mb1BhbmVsKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUluZm9QYW5lbChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQKSB7XHJcbiAgICAgICAgLy8gVHJvdXZlciBsZSBib24gcGFubmVhdSBzZWxvbiBsJ8OpcXVpcGVcclxuICAgICAgICBjb25zdCBwYW5lbENsYXNzID0gdGVhbU5hbWUgPT09ICdFcXVpcGUgMScgPyAnLmluZm8tcGFuZWwtLXRlYW0xJyA6ICcuaW5mby1wYW5lbC0tdGVhbTInO1xyXG4gICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihwYW5lbENsYXNzKTtcclxuXHJcbiAgICAgICAgaWYgKCFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBUcm91dmVyIGxlIHBlcnNvbm5hZ2UgZGFucyBsZSBwYW5uZWF1IHBhciBzb24gbm9tXHJcbiAgICAgICAgY29uc3QgY2hhcmFjdGVySW5mb3MgPSBwYW5lbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hhcmFjdGVyLWluZm8nKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGluZm8gb2YgY2hhcmFjdGVySW5mb3MpIHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZUVsID0gaW5mby5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX25hbWUnKTtcclxuICAgICAgICAgICAgaWYgKG5hbWVFbCAmJiBuYW1lRWwudGV4dENvbnRlbnQudHJpbSgpID09PSBjaGFyYWN0ZXJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0c1NwYW4gPSBpbmZvLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fc3RhdHMgc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRzU3Bhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzU3Bhbi50ZXh0Q29udGVudCA9IGN1cnJlbnRIUDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGZsYXNoIHBvdXIgbW9udHJlciBsZSBjaGFuZ2VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNTcGFuLmNsYXNzTGlzdC5hZGQoJ2hwLXVwZGF0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHN0YXRzU3Bhbi5jbGFzc0xpc3QucmVtb3ZlKCdocC11cGRhdGVkJyksIDMwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93VmljdG9yeU92ZXJsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUGxheSB2aWN0b3J5IG9yIGRlZmVhdCBtdXNpY1xyXG4gICAgICAgIHRoaXMucGxheUVuZE11c2ljKCk7XHJcblxyXG4gICAgICAgIC8vIEZpbmFsaXNlciBsZSBNTVIgYSBsYSBmaW4gZHUgY29tYmF0XHJcbiAgICAgICAgdGhpcy5maW5hbGl6ZVJhdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlFbmRNdXNpYygpIHtcclxuICAgICAgICAvLyBTdG9wIGNvbWJhdCBtdXNpY1xyXG4gICAgICAgIGlmICh0aGlzLmNvbWJhdE11c2ljKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tYmF0TXVzaWMucGF1c2UoKTtcclxuICAgICAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgb3V0Y29tZSBmcm9tIG92ZXJsYXkgY2xhc3NcclxuICAgICAgICBsZXQgdHJhY2sgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2JhdHRsZS1zdGFnZV9fb3ZlcmxheS0tdmljdG9yeScpKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFjayA9ICcvYXNzZXQvb3N0L3dpbmxvc2UvdmljdG9yeS5tcDMnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2JhdHRsZS1zdGFnZV9fb3ZlcmxheS0tZGVmZWF0JykpIHtcclxuICAgICAgICAgICAgICAgIHRyYWNrID0gJy9hc3NldC9vc3Qvd2lubG9zZS9kZWZlYXQubXAzJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdiYXR0bGUtc3RhZ2VfX292ZXJsYXktLWRyYXcnKSkge1xyXG4gICAgICAgICAgICAgICAgdHJhY2sgPSAnL2Fzc2V0L29zdC93aW5sb3NlL2RlZmVhdC5tcDMnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHJhY2sgJiYgIXRoaXMuaXNNdXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZE11c2ljID0gbmV3IEF1ZGlvKHRyYWNrKTtcclxuICAgICAgICAgICAgdGhpcy5lbmRNdXNpYy52b2x1bWUgPSB0aGlzLnZvbHVtZTtcclxuICAgICAgICAgICAgdGhpcy5lbmRNdXNpYy5wbGF5KCkuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5hbGl6ZVJhdGluZygpIHtcclxuICAgICAgICBjb25zdCBmaW5hbGl6ZVVybCA9IHRoaXMuY29udGFpbmVyLmRhdGFzZXQuZmluYWxpemVVcmw7XHJcbiAgICAgICAgaWYgKCFmaW5hbGl6ZVVybCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBmZXRjaChmaW5hbGl6ZVVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICYmIGRhdGEucmF0aW5nQ2hhbmdlICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSYXRpbmdVcGRhdGUoZGF0YS5yYXRpbmdDaGFuZ2UsIGRhdGEubmV3UmF0aW5nLCBkYXRhLm5ld1JhdGluZzIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBmaW5hbGlzYXRpb24gcmF0aW5nOicsIGVycikpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dSYXRpbmdVcGRhdGUoY2hhbmdlLCBuZXdSYXRpbmcsIG5ld1JhdGluZzIpIHtcclxuICAgICAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIE1NUiBhZmZpY2hlIGRhbnMgbGUgcGFubmVhdSBqb3VldXIgKEVxdWlwZSAxKVxyXG4gICAgICAgIGNvbnN0IHJhdGluZ0VsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0xIC5pbmZvLXBhbmVsX19yYXRpbmcnKTtcclxuICAgICAgICBpZiAocmF0aW5nRWwgJiYgbmV3UmF0aW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7bmV3UmF0aW5nfSBNTVJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIGEgam91ciBsZSBNTVIgYWZmaWNoZSBkYW5zIGxlIHBhbm5lYXUgYWR2ZXJzYWlyZSAoRXF1aXBlIDIpXHJcbiAgICAgICAgY29uc3QgcmF0aW5nRWwyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0yIC5pbmZvLXBhbmVsX19yYXRpbmctLWVuZW15Jyk7XHJcbiAgICAgICAgaWYgKHJhdGluZ0VsMiAmJiBuZXdSYXRpbmcyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsMi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke25ld1JhdGluZzJ9IE1NUmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZmZpY2hlciBsYSBub3RpZmljYXRpb24gZGUgY2hhbmdlbWVudCBkYW5zIGwnb3ZlcmxheVxyXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtb3ZlcmxheV0nKTtcclxuICAgICAgICBpZiAob3ZlcmxheSkge1xyXG4gICAgICAgICAgICBjb25zdCB3aW5uZXJEaXYgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGUtc3RhZ2VfX3dpbm5lcicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hhbmdlbWVudCBNTVIgRXF1aXBlIDFcclxuICAgICAgICAgICAgY29uc3Qgbm90aWYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG5vdGlmMS5jbGFzc05hbWUgPSAncmF0aW5nLWNoYW5nZSc7XHJcbiAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZToxLjJyZW07bWFyZ2luLXRvcDoxMnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMS50ZXh0Q29udGVudCA9IGNoYW5nZSA+IDAgPyBgRXF1aXBlIDEgOiArJHtjaGFuZ2V9IE1NUmAgOiBgRXF1aXBlIDEgOiAke2NoYW5nZX0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYxLnN0eWxlLmNvbG9yID0gY2hhbmdlID4gMCA/ICcjNGNhZjUwJyA6ICcjZjQ0MzM2JztcclxuICAgICAgICAgICAgd2lubmVyRGl2LmFwcGVuZENoaWxkKG5vdGlmMSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGFuZ2VtZW50IE1NUiBFcXVpcGUgMiAoaW52ZXJzZSlcclxuICAgICAgICAgICAgY29uc3QgY2hhbmdlMiA9IC1jaGFuZ2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBub3RpZjIuY2xhc3NOYW1lID0gJ3JhdGluZy1jaGFuZ2UnO1xyXG4gICAgICAgICAgICBub3RpZjIuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MS4ycmVtO21hcmdpbi10b3A6NnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMi50ZXh0Q29udGVudCA9IGNoYW5nZTIgPiAwID8gYEVxdWlwZSAyIDogKyR7Y2hhbmdlMn0gTU1SYCA6IGBFcXVpcGUgMiA6ICR7Y2hhbmdlMn0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYyLnN0eWxlLmNvbG9yID0gY2hhbmdlMiA+IDAgPyAnIzRjYWY1MCcgOiAnI2Y0NDMzNic7XHJcbiAgICAgICAgICAgIHdpbm5lckRpdi5hcHBlbmRDaGlsZChub3RpZjIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3RpZjEuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gQVVESU8gPT09XHJcblxyXG4gICAgcGxheU5leHRUcmFjaygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXVkaW9VbmxvY2tlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb21iYXRNdXNpYykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbWJhdE11c2ljLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tYmF0TXVzaWMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5nZXRSYW5kb21UcmFja0luZGV4KCk7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG5ldyBBdWRpbyh0aGlzLmNvbWJhdFBsYXlsaXN0W2lkeF0pO1xyXG4gICAgICAgIHRoaXMuY29tYmF0TXVzaWMudm9sdW1lID0gdGhpcy5pc011dGVkID8gMCA6IHRoaXMudm9sdW1lO1xyXG4gICAgICAgIHRoaXMuY29tYmF0TXVzaWMuYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB0aGlzLnBsYXlOZXh0VHJhY2soKSk7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYy5wbGF5KCkuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJhbmRvbVRyYWNrSW5kZXgoKSB7XHJcbiAgICAgICAgbGV0IGk7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5jb21iYXRQbGF5bGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIH0gd2hpbGUgKGkgPT09IHRoaXMubGFzdFRyYWNrSW5kZXggJiYgdGhpcy5jb21iYXRQbGF5bGlzdC5sZW5ndGggPiAxKTtcclxuICAgICAgICB0aGlzLmxhc3RUcmFja0luZGV4ID0gaTtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVNdXRlKCkge1xyXG4gICAgICAgIHRoaXMuaXNNdXRlZCA9ICF0aGlzLmlzTXV0ZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tYmF0TXVzaWMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21iYXRNdXNpYy52b2x1bWUgPSB0aGlzLmlzTXV0ZWQgPyAwIDogdGhpcy52b2x1bWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmVuZE11c2ljKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kTXVzaWMudm9sdW1lID0gdGhpcy5pc011dGVkID8gMCA6IHRoaXMudm9sdW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tdXRlQnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSB0aGlzLm11dGVCdG4ucXVlcnlTZWxlY3RvcignaScpO1xyXG4gICAgICAgICAgICBpZiAoaWNvbikge1xyXG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc05hbWUgPSB0aGlzLmlzTXV0ZWQgPyAnZmFzIGZhLXZvbHVtZS1tdXRlJyA6ICdmYXMgZmEtdm9sdW1lLXVwJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy52b2x1bWVTbGlkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy52b2x1bWVTbGlkZXIuZGlzYWJsZWQgPSB0aGlzLmlzTXV0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNmeFNsaWRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNmeFNsaWRlci5kaXNhYmxlZCA9IHRoaXMuaXNNdXRlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IFNGWCA9PT1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByZS1sb2FkIGFuZCBjYWNoZSBhbiBhdWRpbyBmaWxlLCByZXR1cm5zIHRoZSBjYWNoZWQgQXVkaW8gY2xvbmUgZm9yIHBsYXliYWNrLlxyXG4gICAgICovXHJcbiAgICBsb2FkU2Z4KHBhdGgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2Z4Q2FjaGVbcGF0aF0pIHtcclxuICAgICAgICAgICAgdGhpcy5zZnhDYWNoZVtwYXRoXSA9IG5ldyBBdWRpbyhwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Z4Q2FjaGVbcGF0aF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQbGF5IGEgc291bmQgZWZmZWN0IGZvciBhIGNoYXJhY3RlciBhY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2x1ZyAtIGNoYXJhY3RlciBzbHVnIChlLmcuICdjcnVzYWRlcicsICdwbGFndWUtZG9jdG9yJylcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZnhOYW1lIC0gc291bmQgZmlsZSBuYW1lIChlLmcuICdhdHRhY2tzb3VuZCcsICdza2lsbHNvdW5kJywgJ2hlYWwnKVxyXG4gICAgICovXHJcbiAgICBwbGF5U2Z4KHNsdWcsIHNmeE5hbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5pc011dGVkIHx8ICFzbHVnKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHBhdGggPSBgL2Fzc2V0L29zdC92ZngvJHtzbHVnfS8ke3NmeE5hbWV9LndhdmA7XHJcbiAgICAgICAgY29uc3QgY2FjaGVkID0gdGhpcy5sb2FkU2Z4KHBhdGgpO1xyXG5cclxuICAgICAgICAvLyBDbG9uZSB0aGUgYXVkaW8gbm9kZSBzbyBvdmVybGFwcGluZyBwbGF5cyBkb24ndCBjdXQgZWFjaCBvdGhlciBvZmZcclxuICAgICAgICBjb25zdCBzb3VuZCA9IGNhY2hlZC5jbG9uZU5vZGUoKTtcclxuICAgICAgICBzb3VuZC52b2x1bWUgPSB0aGlzLnNmeFZvbHVtZTtcclxuICAgICAgICBzb3VuZC5wbGF5KCkuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGxheSB0aGUgYXBwcm9wcmlhdGUgU0ZYIGZvciBhIGNoYXJhY3RlciBnaXZlbiB0aGVpciBrZXkgYW5kIGFjdGlvbiB0eXBlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGNoYXJhY3RlciBrZXkgKGUuZy4gJ0VxdWlwZSAxLUNydXNhZGVyJylcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24gLSAnYXR0YWNrJywgJ3NraWxsJywgb3IgJ2hlYWwnXHJcbiAgICAgKi9cclxuICAgIHBsYXlDaGFyU2Z4KGtleSwgYWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3Qgc2x1ZyA9IHRoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XTtcclxuICAgICAgICBpZiAoIXNsdWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVNmeChzbHVnLCAnYXR0YWNrc291bmQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzpcclxuICAgICAgICAgICAgICAgIC8vIFRyeSBoZWFsLndhdiBmaXJzdCwgZmFsbGJhY2sgdG8gc2tpbGxzb3VuZC53YXZcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXJhY3Rlckhhc0hlYWxba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVNmeChzbHVnLCAnaGVhbCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTZngoc2x1ZywgJ3NraWxsc291bmQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdza2lsbCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTZngoc2x1ZywgJ3NraWxsc291bmQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQbGF5QnV0dG9uKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wbGF5QnRuKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZyAmJiAhdGhpcy5pc1BhdXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSAnUGF1c2UnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSAnVGVybWluw6knO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9IHRoaXMuY3VycmVudEluZGV4ID4gMCA/ICdSZXByZW5kcmUnIDogJ0xhbmNlcic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBJbml0aWFsaXNlciBxdWFuZCBsZSBET00gZXN0IHByw6p0XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBjb21iYXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtbG9nc10nKTtcclxuICAgIGlmIChjb21iYXRDb250YWluZXIpIHtcclxuICAgICAgICBuZXcgQ29tYmF0Q29udHJvbGxlcihjb21iYXRDb250YWluZXIpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbWJhdENvbnRyb2xsZXI7XHJcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIEZSSUVORCBTWVNURU1cclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi50ZXh0Q29udGVudCA9IHN0cjtcclxuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy10b2dnbGVdJyk7XHJcbiAgICBjb25zdCBwYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtcGFuZWxdJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtYmFja2Ryb3BdJyk7XHJcbiAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtY2xvc2VdJyk7XHJcbiAgICBjb25zdCBiYWRnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtYmFkZ2VdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBhbmVsKSByZXR1cm47XHJcblxyXG4gICAgbGV0IHBhbmVsT3BlbiA9IGZhbHNlO1xyXG4gICAgbGV0IGN1cnJlbnRUYWIgPSAnZnJpZW5kcyc7XHJcbiAgICBsZXQgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IG51bGw7XHJcbiAgICBsZXQgbGFzdE1lc3NhZ2VJZCA9IDA7XHJcbiAgICBsZXQgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICBsZXQgdW5yZWFkUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgIGxldCBmcmllbmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICBsZXQgcmVxdWVzdHNMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFBBTkVMIE9QRU4vQ0xPU0VcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gb3BlblBhbmVsKCkge1xyXG4gICAgICAgIHBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgcGFuZWwub2Zmc2V0SGVpZ2h0OyAvLyByZWZsb3dcclxuICAgICAgICBwYW5lbC5jbGFzc0xpc3QuYWRkKCdmcmllbmRzLXBhbmVsLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnZnJpZW5kcy1wYW5lbF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBwYW5lbE9wZW4gPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIWZyaWVuZHNMb2FkZWQpIHtcclxuICAgICAgICAgICAgbG9hZEZyaWVuZHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQYW5lbCgpIHtcclxuICAgICAgICBwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdmcmllbmRzLXBhbmVsLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnZnJpZW5kcy1wYW5lbF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBwYW5lbE9wZW4gPSBmYWxzZTtcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHBhbmVsT3BlbiA/IGNsb3NlUGFuZWwoKSA6IG9wZW5QYW5lbCgpKTtcclxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQYW5lbCk7XHJcbiAgICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUGFuZWwpO1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gVEFCU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mcmllbmRzLXRhYl0nKS5mb3JFYWNoKHRhYkJ0biA9PiB7XHJcbiAgICAgICAgdGFiQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YWJOYW1lID0gdGFiQnRuLmRhdGFzZXQuZnJpZW5kc1RhYjtcclxuICAgICAgICAgICAgc3dpdGNoVGFiKHRhYk5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc3dpdGNoVGFiKHRhYk5hbWUpIHtcclxuICAgICAgICBjdXJyZW50VGFiID0gdGFiTmFtZTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZnJpZW5kcy10YWJdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgnZnJpZW5kcy1wYW5lbF9fdGFiLS1hY3RpdmUnLCBidG4uZGF0YXNldC5mcmllbmRzVGFiID09PSB0YWJOYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiLWNvbnRlbnRdJykuZm9yRWFjaChjb250ZW50ID0+IHtcclxuICAgICAgICAgICAgY29udGVudC5zdHlsZS5kaXNwbGF5ID0gY29udGVudC5kYXRhc2V0LnRhYkNvbnRlbnQgPT09IHRhYk5hbWUgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fdGFicycpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX2NvbnRlbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNvbnZlcnNhdGlvbl0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG5cclxuICAgICAgICBpZiAodGFiTmFtZSA9PT0gJ2ZyaWVuZHMnICYmICFmcmllbmRzTG9hZGVkKSBsb2FkRnJpZW5kcygpO1xyXG4gICAgICAgIGlmICh0YWJOYW1lID09PSAncmVxdWVzdHMnICYmICFyZXF1ZXN0c0xvYWRlZCkgbG9hZFJlcXVlc3RzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBMT0FEIEZSSUVORFMgTElTVFxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBsb2FkRnJpZW5kcygpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YWItY29udGVudD1cImZyaWVuZHNcIl0nKTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19sb2FkaW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBDaGFyZ2VtZW50Li4uPC9kaXY+JztcclxuXHJcbiAgICAgICAgZmV0Y2goJy9mcmllbmRzL2xpc3QnLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBmcmllbmRzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuZnJpZW5kcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPjxpIGNsYXNzPVwiZmFzIGZhLWdob3N0XCI+PC9pPiBBdWN1biBjb21wYWdub24uLi4gTGUgZG9uam9uIGVzdCBzb2xpdGFpcmUuPC9wPic7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhLmZyaWVuZHMubWFwKGYgPT4gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCIgZGF0YS1mcmllbmQtdXNlci1pZD1cIiR7Zi51c2VySWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtmLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwoZi5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbChmLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoZi51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19wcmV2aWV3XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2YubGFzdE1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChmLmxhc3RNZXNzYWdlLmlzRnJvbU1lID8gJ1ZvdXM6ICcgOiAnJykgKyBlc2NhcGVIdG1sKGYubGFzdE1lc3NhZ2UuY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdBdWN1biBtZXNzYWdlJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3JhdGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHtmLnJhdGluZ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmZyaWVuZC1pdGVtJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlcklkID0gcGFyc2VJbnQoaXRlbS5kYXRhc2V0LmZyaWVuZFVzZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmZyaWVuZC1pdGVtX19uYW1lJykudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbkNvbnZlcnNhdGlvbih1c2VySWQsIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RXJyZXVyIGRlIGNoYXJnZW1lbnQ8L3A+JztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIExPQUQgUEVORElORyBSRVFVRVNUU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBsb2FkUmVxdWVzdHMoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGFiLWNvbnRlbnQ9XCJyZXF1ZXN0c1wiXScpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+IENoYXJnZW1lbnQuLi48L2Rpdj4nO1xyXG5cclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvcGVuZGluZycsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVxdWVzdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5BdWN1bmUgZGVtYW5kZSBlbiBhdHRlbnRlPC9wPic7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhLnJlcXVlc3RzLm1hcChyID0+IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiIGRhdGEtcmVxdWVzdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtyLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwoci5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbChyLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoci51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19wcmV2aWV3XCI+JHtlc2NhcGVIdG1sKHIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1hY2NlcHRcIiBkYXRhLWFjY2VwdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1jaGVja1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXJlamVjdFwiIGRhdGEtcmVqZWN0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hY2NlcHQtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlcXVlc3QoYnRuLmRhdGFzZXQuYWNjZXB0SWQsICdhY2NlcHQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZWplY3QtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlcXVlc3QoYnRuLmRhdGFzZXQucmVqZWN0SWQsICdyZWplY3QnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChmcmllbmRzaGlwSWQsIGFjdGlvbikge1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy8ke2FjdGlvbn0vJHtmcmllbmRzaGlwSWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsb2FkUmVxdWVzdHMoKTtcclxuICAgICAgICAgICAgICAgIGZldGNoVW5yZWFkQ291bnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gU0VBUkNIIFVTRVJTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1zZWFyY2gtaW5wdXRdJyk7XHJcbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1zZWFyY2gtcmVzdWx0c10nKTtcclxuICAgIGxldCBzZWFyY2hUaW1lb3V0ID0gbnVsbDtcclxuXHJcbiAgICBpZiAoc2VhcmNoSW5wdXQpIHtcclxuICAgICAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNlYXJjaFRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChxdWVyeS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmZXRjaChgL2ZyaWVuZHMvc2VhcmNoP3E9JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnkpfWAsIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS51c2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkF1Y3VuIGd1ZXJyaWVyIHRyb3V2ZTwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9IGRhdGEudXNlcnMubWFwKHUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aW9uSHRtbCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdhY2NlcHRlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5BbWk8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ3BlbmRpbmdfc2VudCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5FbnZveWVlPC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdwZW5kaW5nX3JlY2VpdmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPlJlY3VlPC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gYDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLWFkZFwiIGRhdGEtYWRkLWZyaWVuZC1pZD1cIiR7dS51c2VySWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGx1c1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3UucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbCh1LnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKHUudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbCh1LnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3JhdGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHt1LnJhdGluZ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hY3Rpb25zXCI+JHthY3Rpb25IdG1sfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWRkLWZyaWVuZC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZEZyaWVuZFJlcXVlc3QoYnRuLmRhdGFzZXQuYWRkRnJpZW5kSWQsIGJ0bik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VuZEZyaWVuZFJlcXVlc3QodXNlcklkLCBidG4pIHtcclxuICAgICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9yZXF1ZXN0LyR7dXNlcklkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBidG4ub3V0ZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+RW52b3llZTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IGJ0bi5kaXNhYmxlZCA9IGZhbHNlOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXBvcnRNZXNzYWdlQWN0aW9uKG1lc3NhZ2VJZCwgYnRuKSB7XHJcbiAgICAgICAgY29uc3QgcmVhc29uID0gcHJvbXB0KCdSYWlzb24gZHUgc2lnbmFsZW1lbnQgOicpO1xyXG4gICAgICAgIGlmIChyZWFzb24gPT09IG51bGwpIHJldHVybjsgLy8gY2FuY2VsbGVkXHJcblxyXG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7bWVzc2FnZUlkfS9yZXBvcnRgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcmVhc29uOiByZWFzb24gfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBidG4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrXCI+PC9pPic7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnY2hhdC1tZXNzYWdlX19yZXBvcnQtLWRvbmUnKTtcclxuICAgICAgICAgICAgICAgIGJ0bi50aXRsZSA9ICdTaWduYWxlJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4geyBidG4uZGlzYWJsZWQgPSBmYWxzZTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBDT05WRVJTQVRJT05cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gb3BlbkNvbnZlcnNhdGlvbih1c2VySWQsIHVzZXJuYW1lKSB7XHJcbiAgICAgICAgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgICBsYXN0TWVzc2FnZUlkID0gMDtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX3RhYnMnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19jb250ZW50Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBjb25zdCBjb252RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNvbnZlcnNhdGlvbl0nKTtcclxuICAgICAgICBjb252RWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW5hbWVdJykudGV4dENvbnRlbnQgPSB1c2VybmFtZTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW1lc3NhZ2VzXScpO1xyXG4gICAgICAgIG1lc3NhZ2VzRWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19sb2FkaW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBDaGFyZ2VtZW50Li4uPC9kaXY+JztcclxuXHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7dXNlcklkfWAsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKGRhdGEubWVzc2FnZXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgc3RhcnRNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlck1lc3NhZ2VzKG1lc3NhZ2VzLCBhcHBlbmQpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW1lc3NhZ2VzXScpO1xyXG5cclxuICAgICAgICBpZiAoIWFwcGVuZCkge1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RGVidXQgZGUgbGEgY29udmVyc2F0aW9uLiBFbnZveWV6IGxlIHByZW1pZXIgbWVzc2FnZSE8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzRWwuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNpIG9uIGFqb3V0ZSBkZXMgbWVzc2FnZXMgZXQgcXVlIGxlIGNvbnRlbmV1ciBhZmZpY2hlIGxlIHBsYWNlaG9sZGVyLCBsZSBzdXBwcmltZXJcclxuICAgICAgICBpZiAoYXBwZW5kICYmIG1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBtZXNzYWdlc0VsLnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19lbXB0eScpO1xyXG4gICAgICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHBsYWNlaG9sZGVyLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtc2cgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLmlkID4gbGFzdE1lc3NhZ2VJZCkgbGFzdE1lc3NhZ2VJZCA9IG1zZy5pZDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2hhdC1tZXNzYWdlJywgbXNnLmlzRnJvbU1lID8gJ2NoYXQtbWVzc2FnZS0tbWluZScgOiAnY2hhdC1tZXNzYWdlLS10aGVpcnMnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXBvcnRCdG4gPSAnJztcclxuICAgICAgICAgICAgaWYgKCFtc2cuaXNGcm9tTWUpIHtcclxuICAgICAgICAgICAgICAgIHJlcG9ydEJ0biA9IGA8YnV0dG9uIGNsYXNzPVwiY2hhdC1tZXNzYWdlX19yZXBvcnRcIiBkYXRhLXJlcG9ydC1tc2ctaWQ9XCIke21zZy5pZH1cIiB0aXRsZT1cIlNpZ25hbGVyIGNlIG1lc3NhZ2VcIj48aSBjbGFzcz1cImZhcyBmYS1mbGFnXCI+PC9pPjwvYnV0dG9uPmA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICAke2VzY2FwZUh0bWwobXNnLmNvbnRlbnQpfVxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGF0LW1lc3NhZ2VfX3RpbWVcIj4ke2VzY2FwZUh0bWwobXNnLmRhdGUpfSAke3JlcG9ydEJ0bn08L3NwYW4+XHJcbiAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgICAgICAvLyBBdHRhY2ggcmVwb3J0IGhhbmRsZXJcclxuICAgICAgICAgICAgY29uc3QgcmVwb3J0RWwgPSBkaXYucXVlcnlTZWxlY3RvcignW2RhdGEtcmVwb3J0LW1zZy1pZF0nKTtcclxuICAgICAgICAgICAgaWYgKHJlcG9ydEVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnRFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRNZXNzYWdlQWN0aW9uKHJlcG9ydEVsLmRhdGFzZXQucmVwb3J0TXNnSWQsIHJlcG9ydEVsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZXNzYWdlc0VsLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1lc3NhZ2VzRWwuc2Nyb2xsVG9wID0gbWVzc2FnZXNFbC5zY3JvbGxIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2VuZCBtZXNzYWdlXHJcbiAgICBjb25zdCBzZW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLXNlbmRdJyk7XHJcbiAgICBjb25zdCBpbnB1dEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLWlucHV0XScpO1xyXG5cclxuICAgIGlmIChzZW5kQnRuICYmIGlucHV0RWwpIHtcclxuICAgICAgICBzZW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VuZE1lc3NhZ2UpO1xyXG4gICAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgc2VuZE1lc3NhZ2UoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kTWVzc2FnZSgpIHtcclxuICAgICAgICBjb25zdCBjb250ZW50ID0gaW5wdXRFbC52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgaWYgKCFjb250ZW50IHx8ICFjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlucHV0RWwudmFsdWUgPSAnJztcclxuXHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7Y3VycmVudENvbnZlcnNhdGlvblVzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY29udGVudDogY29udGVudCB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgJiYgZGF0YS5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhbZGF0YS5tZXNzYWdlXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBCYWNrIGJ1dHRvblxyXG4gICAgY29uc3QgYmFja0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1iYWNrXScpO1xyXG4gICAgaWYgKGJhY2tCdG4pIHtcclxuICAgICAgICBiYWNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkID0gbnVsbDtcclxuICAgICAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3dpdGNoVGFiKCdmcmllbmRzJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBNRVNTQUdFIFBPTExJTkcgKGV2ZXJ5IDVzIHdoZW4gY29udmVyc2F0aW9uIG9wZW4pXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIHN0YXJ0TWVzc2FnZVBvbGxpbmcoKSB7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHtjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkfT9hZnRlcklkPSR7bGFzdE1lc3NhZ2VJZH1gLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lc3NhZ2VzICYmIGRhdGEubWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKGRhdGEubWVzc2FnZXMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1MDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdG9wTWVzc2FnZVBvbGxpbmcoKSB7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChtZXNzYWdlUG9sbGluZ0ludGVydmFsKTtcclxuICAgICAgICAgICAgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gVU5SRUFEIENPVU5UIFBPTExJTkcgKGV2ZXJ5IDMwcywgYWx3YXlzIGFjdGl2ZSlcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gZmV0Y2hVbnJlYWRDb3VudCgpIHtcclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvdW5yZWFkLWNvdW50Jywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEudG90YWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS50ZXh0Q29udGVudCA9IGRhdGEudG90YWw7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0c0JhZGdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcmVxdWVzdHMtYmFkZ2VdJyk7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0c0JhZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wZW5kaW5nUmVxdWVzdHMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS50ZXh0Q29udGVudCA9IGRhdGEucGVuZGluZ1JlcXVlc3RzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmV0Y2hVbnJlYWRDb3VudCgpO1xyXG4gICAgdW5yZWFkUG9sbGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZmV0Y2hVbnJlYWRDb3VudCwgMzAwMDApO1xyXG59KTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbImVzY2FwZUh0bWwiLCJzdHIiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwiaW5uZXJIVE1MIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJ1cmdlciIsInF1ZXJ5U2VsZWN0b3IiLCJuYXYiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJTVEFUX01BWCIsImRtZyIsInNwZWVkIiwiZG9kZ2UiLCJjcml0IiwiaHAiLCJwb3J0cmFpdHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGV0YWlscyIsImdldEVsZW1lbnRCeUlkIiwic2VsZWN0ZWRMaXN0IiwibGF1bmNoQnRuIiwibGVuZ3RoIiwibWF4U2VsZWN0aW9uIiwic2VsZWN0ZWRIZXJvZXMiLCJzZWxlY3RlZEhlcm9JZHMiLCJnZXRDYXRlZ29yeSIsInBvcnRyYWl0IiwiZGF0YXNldCIsImNhdGVnb3J5IiwiZ2V0U2VsZWN0ZWRSb2xlcyIsInJvbGVzIiwiVGFuayIsIkRQUyIsIkhlYWxlciIsIlN1cHBvcnQiLCJmb3JFYWNoIiwiaWQiLCJwIiwiQXJyYXkiLCJmcm9tIiwiZmluZCIsInBwIiwiY2F0IiwiY2FuU2VsZWN0Um9sZSIsInBvcnRyYWl0RWwiLCJpc0xlZ2VuZFNlbGVjdGVkIiwicmVtb3ZlIiwiYWRkIiwibmFtZSIsInJvbGUiLCJkbWdNaW4iLCJOdW1iZXIiLCJkbWdNYXgiLCJzcHJpdGVGaWxlIiwic3ByaXRlIiwiYWJpbGl0eU5hbWUiLCJhYmlsaXR5RGVzYyIsImFiaWxpdHlDZCIsInNwcml0ZVBhdGgiLCJjb25jYXQiLCJpc1NlbGVjdGVkIiwiaW5jbHVkZXMiLCJhYmlsaXR5SHRtbCIsImNoYXJTeW5lcmdpZXMiLCJzeW5lcmd5TWFwIiwic3luZXJneUh0bWwiLCJtYXAiLCJzIiwicGFydG5lciIsImRlc2MiLCJqb2luIiwiTWF0aCIsIm1pbiIsImJ0blJpZ2h0Iiwicm9sZUNhdCIsImFscmVhZHlTZWxlY3RlZCIsImRpc2FibGVkIiwidGV4dENvbnRlbnQiLCJ1cGRhdGVTZWxlY3RlZFRlYW0iLCJhbGVydCIsImZpbHRlciIsImhpZCIsImgiLCJwdXNoIiwidGVhbXNQYWdlRWwiLCJKU09OIiwicGFyc2UiLCJsZWdlbmRBY3RpdmUiLCJoZXJvIiwiaSIsImhlcm9FbCIsInVwZGF0ZVJvbGVJbmRpY2F0b3JzIiwidXBkYXRlU3luZXJneUhpZ2hsaWdodHMiLCJ0ZWFtQ29tcGxldGUiLCJiYWRnZSIsInNlbGVjdGVkTmFtZXMiLCJCb29sZWFuIiwiYWN0aXZlU3luZXJnaWVzIiwic2VlblBhaXJzIiwiU2V0Iiwic3luZXJnaWVzIiwic3luIiwicGFpcktleSIsInNvcnQiLCJoYXMiLCJuYW1lMSIsIm5hbWUyIiwic3luZXJneU5hbWUiLCJwTmFtZSIsIm1hdGNoaW5nIiwiY2xhc3NOYW1lIiwidGl0bGUiLCJ1cGRhdGVTeW5lcmd5RGlzcGxheSIsImNvbnRhaW5lciIsImFjdGlvbnMiLCJwYXJlbnROb2RlIiwiaW5zZXJ0QmVmb3JlIiwiaW5kaWNhdG9yIiwic2xvdCIsInNhdmVQcmVzZXRCdG4iLCJwcmVzZXRNb2RhbCIsInByZXNldE5hbWVJbnB1dCIsInByZXNldENvbmZpcm1CdG4iLCJwcmVzZXRDYW5jZWxCdG4iLCJ1cGRhdGVTYXZlUHJlc2V0QnRuIiwib3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0iLCJfb3JpZ1VwZGF0ZSIsIl9vcmlnUm9sZUluZGljYXRvcnMiLCJ2YWx1ZSIsInN0eWxlIiwiZGlzcGxheSIsInNldFRpbWVvdXQiLCJmb2N1cyIsInRyaW0iLCJib3JkZXJDb2xvciIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJzdHJpbmdpZnkiLCJjaGFyYWN0ZXJJZHMiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJzdWNjZXNzIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJlcnJvciIsImUiLCJrZXkiLCJjbGljayIsImxvYWRQcmVzZXQiLCJpZFN0ciIsIlN0cmluZyIsImRlbGV0ZVByZXNldCIsInByZXNldElkIiwiY2hpcEVsIiwiY29uZmlybSIsImxpc3QiLCJjaGlsZHJlbiIsIl9kb2N1bWVudCRxdWVyeVNlbGVjdCIsImNoaXAiLCJjaGFySWRzIiwicHJlc2V0SWRzIiwic3RvcFByb3BhZ2F0aW9uIiwic2VsZWN0ZWRMaXN0T2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlc3BvbnNlIiwicmVkaXJlY3RlZCIsImhyZWYiLCJ1cmwiLCJwb3B1cCIsImJhY2tkcm9wIiwiY2xvc2VCdG4iLCJjb250ZW50IiwibG9hZGVkIiwib3BlblBvcHVwIiwib2Zmc2V0SGVpZ2h0IiwiZmV0Y2hQcm9maWxlIiwiY2xvc2VQb3B1cCIsInJlbmRlclByb2ZpbGUiLCJyZXN1bHRDbGFzcyIsInIiLCJyZXN1bHRMYWJlbCIsImF2YXRhckh0bWwiLCJwcm9maWxlSW1hZ2UiLCJ1c2VybmFtZSIsImh0bWwiLCJtb3R0byIsImJpbyIsInJhdGluZyIsInN0YXRzIiwid2lucyIsImxvc3NlcyIsIndpblJhdGUiLCJmYXZvcml0ZUNoYXJhY3RlciIsImdhbWVzUGxheWVkIiwibGFzdFRlYW0iLCJjIiwicmVjZW50QmF0dGxlcyIsImIiLCJwYXJzZUludCIsInJlc3VsdCIsIm9wcG9uZW50IiwibWF0Y2hUeXBlIiwidG9VcHBlckNhc2UiLCJkYXRlIiwiQ29tYmF0Q29udHJvbGxlciIsIl9jbGFzc0NhbGxDaGVjayIsImxvZ3MiLCJjdXJyZW50SW5kZXgiLCJpc1BsYXlpbmciLCJpc1BhdXNlZCIsImNoYXJhY3RlckVsZW1lbnRzIiwiY2hhcmFjdGVyTWF4SFAiLCJpbml0IiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJsb2dzRGF0YSIsImNvbWJhdExvZ3MiLCJjb25zb2xlIiwibG9nQ29udGFpbmVyIiwib3ZlcmxheSIsInBsYXlCdG4iLCJza2lwQnRuIiwic3BlZWRCdG5zIiwiY2hhcmFjdGVyU2x1Z3MiLCJjaGFyYWN0ZXJIYXNIZWFsIiwiYWJpbGl0eUNvb2xkb3ducyIsImNoYXJhY3RlclN0YXR1c2VzIiwiZWwiLCJjaGFyYWN0ZXJOYW1lIiwidGVhbSIsImNoYXJhY3RlclRlYW0iLCJjaGFyYWN0ZXJTbHVnIiwiaGFzSGVhbCIsImhwVGV4dCIsIm1hdGNoIiwiY3JlYXRlRW1wdHlTdGF0dXNlcyIsImFiaWxpdHlFbGVtZW50cyIsImNoYXJOYW1lIiwiY2hhclRlYW0iLCJhYmlsaXR5RWwiLCJtYXhDZCIsImFiaWxpdHlNYXhDZCIsIm5hbWVFbCIsImljb25FbCIsIm9wYWNpdHkiLCJhdWRpb1VubG9ja2VkIiwiY29tYmF0TXVzaWMiLCJsYXN0VHJhY2tJbmRleCIsImlzTXV0ZWQiLCJ2b2x1bWUiLCJzZnhWb2x1bWUiLCJjb21iYXRQbGF5bGlzdCIsImhhc0dva3UiLCJzb21lIiwiZW5kTXVzaWMiLCJzZnhDYWNoZSIsIm11dGVCdG4iLCJ2b2x1bWVTbGlkZXIiLCJzZnhTbGlkZXIiLCJiaW5kRXZlbnRzIiwicGxheSIsImJsZWVkaW5nIiwiYmxpZ2h0ZWQiLCJzdHVubmVkIiwibWFya2VkIiwic3RlYWx0aGVkIiwicmlwb3N0ZSIsImRtZ1VwIiwic3BkVXAiLCJkb2RnZVVwIiwiY3JpdFVwIiwidXBkYXRlQ2hhcmFjdGVyU3RhdHVzZXMiLCJsb2ciLCJ0eXBlIiwidGlja1JvdW5kU3RhdHVzZXMiLCJoYW5kbGVBYmlsaXR5U3RhdHVzQ2hhbmdlIiwic2V0U3RhdHVzIiwidGFyZ2V0IiwidGFyZ2V0VGVhbSIsImR1cmF0aW9uIiwidHVybnNSZW1haW5pbmciLCJ1bmRlZmluZWQiLCJhdHRhY2tlciIsImF0dGFja2VyVGVhbSIsImhhbmRsZVN5bmVyZ3lTdGF0dXNDaGFuZ2UiLCJjbGVhckFsbFN0YXR1c2VzIiwicmVuZGVyQWxsU3RhdHVzSWNvbnMiLCJzdWJ0eXBlIiwiYmxlZWRUdXJucyIsImFsbEhpdHMiLCJwcmltYXJ5IiwiaXNQcmltYXJ5IiwiYmxpZ2h0VHVybnMiLCJtYXJrVHVybnMiLCJjYXN0ZXIiLCJjYXN0ZXJUZWFtIiwicmlwb3N0ZVR1cm5zIiwiYXBwbHlCdWZmU3RhdHVzZXMiLCJidWZmcyIsImJ1ZmZEdXJhdGlvbiIsImFwcGx5VGVhbUJ1ZmZTdGF0dXNlcyIsInN0ZWFsdGhUdXJucyIsInByb3RlY3RUdXJucyIsInNlbGZCbGVlZFR1cm5zIiwidEtleSIsIl90aGlzMiIsImVmZmVjdFR5cGUiLCJwYXJ0bmVyQ2hhciIsInBhcnRuZXJDaGFyVGVhbSIsImdyYW50ZWRUdXJucyIsImJ1ZmZUeXBlcyIsInN0YXR1c0tleSIsImJ1ZmZUeXBlVG9TdGF0dXNLZXkiLCJkb2RnZUR1cmF0aW9uIiwiZXh0cmFUdXJucyIsInRlYW1OYW1lIiwiZGFtYWdlIiwibWF4IiwiX2kiLCJfT2JqZWN0JGtleXMiLCJPYmplY3QiLCJrZXlzIiwic3RhcnRzV2l0aCIsIl9pMiIsIl9PYmplY3Qka2V5czIiLCJfaTMiLCJfT2JqZWN0JGtleXMzIiwicmVuZGVyU3RhdHVzSWNvbnMiLCJpY29ucyIsImljb24iLCJjbHMiLCJfdGhpczMiLCJ0b2dnbGVQbGF5Iiwic2tpcCIsImJ0biIsInNldFNwZWVkIiwidG9nZ2xlTXV0ZSIsInBhcnNlRmxvYXQiLCJwbGF5TmV4dFRyYWNrIiwib25jZSIsInVwZGF0ZVBsYXlCdXR0b24iLCJwcm9jZXNzTmV4dExvZyIsInBhdXNlIiwiZGlzcGxheUxvZyIsInVwZGF0ZUhlYWx0aEJhcnMiLCJ0cmFja0FiaWxpdHlDb29sZG93bnMiLCJhbmltYXRlRGVhdGgiLCJ0YXJnZXRIUCIsInNob3dWaWN0b3J5T3ZlcmxheSIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsImNvbWJhdFNwZWVkIiwiX3RoaXM0IiwicHJvY2Vzc0xvZyIsImRlbGF5IiwiZ2V0RGVsYXlGb3JMb2ciLCJnZXRBYmlsaXR5RGVsYXkiLCJnZXRTeW5lcmd5VHJpZ2dlckRlbGF5IiwiX3RoaXM1IiwicGxheUFuaW1hdGlvbiIsImhwRGVsYXkiLCJnZXRIUFVwZGF0ZURlbGF5IiwiYWJpbGl0eURhdGEiLCJ1cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5IiwiY2QiLCJnZXRBYmlsaXR5SFBEZWxheSIsImFuaW1hdGVBdHRhY2siLCJpc0NyaXQiLCJhbmltYXRlSGVhbCIsImhlYWxlciIsImhlYWxlclRlYW0iLCJhbmltYXRlRGVmZW5kIiwiZGVmZW5kZXIiLCJkZWZlbmRlclRlYW0iLCJhbmltYXRlRG9kZ2UiLCJhbmltYXRlRG9UIiwiYW5pbWF0ZVN0dW5uZWQiLCJwbGF5QWJpbGl0eUFuaW1hdGlvbiIsImFuaW1hdGVTeW5lcmd5QW5ub3VuY2UiLCJhbmltYXRlU3luZXJneVRyaWdnZXIiLCJ0YXJnZXROYW1lIiwiZG90Q2xhc3MiLCJnZXRDaGFyYWN0ZXJFbGVtZW50IiwiYW5pbWF0ZU1hcmtlZCIsImFuaW1hdGVCdWZmIiwiYW5pbWF0ZVN0ZWFsdGgiLCJfdGhpczYiLCJibGlnaHRLZXkiLCJzd2FwU3ByaXRlIiwicGxheUNoYXJTZngiLCJjYXN0ZXJFbCIsIm1hcmtLZXkiLCJyaXBvc3RlS2V5Iiwic2VsZkJ1ZmZLZXkiLCJwYXJ0eUhlYWxLZXkiLCJoZWFsZWQiLCJwYXJ0eUJ1ZmZLZXkiLCJhbmltYXRlVGVhbUJ1ZmYiLCJzdGVhbHRoS2V5IiwiZW1lcmdIZWFsS2V5IiwicHJvdERvZGdlS2V5IiwidWlLZXkiLCJ1aUNhc3RlckVsIiwidWlUYXJnZXRFbCIsIl90aGlzNyIsInRyaWdnZXIiLCJ0cmlnZ2VyQ2hhciIsImRyYXdTeW5lcmd5TGluayIsIl90aGlzOCIsInRyaWdnZXJDaGFyVGVhbSIsInBhcnRuZXJLZXkiLCJlbDEiLCJlbDIiLCJzdGFnZSIsImV4aXN0aW5nU3ZnIiwic3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwic2V0QXR0cmlidXRlIiwic3RhZ2VSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicmVjdDEiLCJyZWN0MiIsIngxIiwibGVmdCIsIndpZHRoIiwieTEiLCJ0b3AiLCJoZWlnaHQiLCJ4MiIsInkyIiwibGluZSIsInNwcml0ZU5hbWUiLCJfdGhpczkiLCJzbHVnIiwiaW1nIiwic3JjIiwiY29udGFpbnMiLCJhdHRhY2tlck5hbWUiLCJoZWFsZXJOYW1lIiwiZGVmZW5kZXJOYW1lIiwiY29ycHNlSW1nIiwiSW1hZ2UiLCJvbmxvYWQiLCJvbmVycm9yIiwiZW50cnkiLCJtZXNzYWdlIiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwiY3VycmVudEhQIiwibWF4SFAiLCJ0YXJnZXRNYXhIUCIsInVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzIiwidXBkYXRlQ2hhcmFjdGVySFAiLCJfdGhpczAiLCJtYXhIcCIsInBlcmNlbnQiLCJocEJhciIsInRyYW5zaXRpb24iLCJ1cGRhdGVJbmZvUGFuZWwiLCJwYW5lbENsYXNzIiwicGFuZWwiLCJjaGFyYWN0ZXJJbmZvcyIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJfbG9vcCIsImluZm8iLCJzdGF0c1NwYW4iLCJuIiwiZG9uZSIsImVyciIsImYiLCJfdGhpczEiLCJwbGF5RW5kTXVzaWMiLCJmaW5hbGl6ZVJhdGluZyIsInRyYWNrIiwiQXVkaW8iLCJfdGhpczEwIiwiZmluYWxpemVVcmwiLCJyYXRpbmdDaGFuZ2UiLCJzaG93UmF0aW5nVXBkYXRlIiwibmV3UmF0aW5nIiwibmV3UmF0aW5nMiIsImNoYW5nZSIsInJhdGluZ0VsIiwicmF0aW5nRWwyIiwid2lubmVyRGl2Iiwibm90aWYxIiwiY3NzVGV4dCIsImNvbG9yIiwiY2hhbmdlMiIsIm5vdGlmMiIsIl90aGlzMTEiLCJpZHgiLCJnZXRSYW5kb21UcmFja0luZGV4IiwiZmxvb3IiLCJyYW5kb20iLCJsb2FkU2Z4IiwicGF0aCIsInBsYXlTZngiLCJzZnhOYW1lIiwiY2FjaGVkIiwic291bmQiLCJjbG9uZU5vZGUiLCJhY3Rpb24iLCJjb21iYXRDb250YWluZXIiLCJwYW5lbE9wZW4iLCJjdXJyZW50VGFiIiwiY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCIsImxhc3RNZXNzYWdlSWQiLCJtZXNzYWdlUG9sbGluZ0ludGVydmFsIiwidW5yZWFkUG9sbGluZ0ludGVydmFsIiwiZnJpZW5kc0xvYWRlZCIsInJlcXVlc3RzTG9hZGVkIiwib3BlblBhbmVsIiwibG9hZEZyaWVuZHMiLCJjbG9zZVBhbmVsIiwic3RvcE1lc3NhZ2VQb2xsaW5nIiwidGFiQnRuIiwidGFiTmFtZSIsImZyaWVuZHNUYWIiLCJzd2l0Y2hUYWIiLCJ0YWJDb250ZW50IiwibG9hZFJlcXVlc3RzIiwiZnJpZW5kcyIsInVzZXJJZCIsImxhc3RNZXNzYWdlIiwiaXNGcm9tTWUiLCJpdGVtIiwiZnJpZW5kVXNlcklkIiwib3BlbkNvbnZlcnNhdGlvbiIsInJlcXVlc3RzIiwiZnJpZW5kc2hpcElkIiwiaGFuZGxlUmVxdWVzdCIsImFjY2VwdElkIiwicmVqZWN0SWQiLCJmZXRjaFVucmVhZENvdW50Iiwic2VhcmNoSW5wdXQiLCJzZWFyY2hSZXN1bHRzIiwic2VhcmNoVGltZW91dCIsImNsZWFyVGltZW91dCIsInF1ZXJ5IiwidXNlcnMiLCJ1IiwiYWN0aW9uSHRtbCIsImZyaWVuZFN0YXR1cyIsInNlbmRGcmllbmRSZXF1ZXN0IiwiYWRkRnJpZW5kSWQiLCJvdXRlckhUTUwiLCJyZXBvcnRNZXNzYWdlQWN0aW9uIiwibWVzc2FnZUlkIiwicmVhc29uIiwicHJvbXB0IiwiY29udkVsIiwibWVzc2FnZXNFbCIsInJlbmRlck1lc3NhZ2VzIiwibWVzc2FnZXMiLCJzdGFydE1lc3NhZ2VQb2xsaW5nIiwiYXBwZW5kIiwicGxhY2Vob2xkZXIiLCJtc2ciLCJyZXBvcnRCdG4iLCJyZXBvcnRFbCIsInJlcG9ydE1zZ0lkIiwic2VuZEJ0biIsImlucHV0RWwiLCJzZW5kTWVzc2FnZSIsImJhY2tCdG4iLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ0b3RhbCIsInJlcXVlc3RzQmFkZ2UiLCJwZW5kaW5nUmVxdWVzdHMiXSwic291cmNlUm9vdCI6IiJ9