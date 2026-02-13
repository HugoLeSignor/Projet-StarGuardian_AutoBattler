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
      // Easter egg: show solo Goku
      var hero = Array.from(portraits).find(function (p) {
        return p.dataset.id === selectedHeroIds[0];
      });
      if (hero) {
        var name = hero.dataset.name;
        var spritePath = "/asset/sprites/".concat(hero.dataset.sprite);
        var heroEl = document.createElement('div');
        heroEl.classList.add('selected-hero-sprite');
        heroEl.innerHTML = "\n                    <img src=\"".concat(spritePath, "\" alt=\"Sprite de ").concat(name, "\">\n                    <span>").concat(name, "</span>\n                ");
        selectedList.appendChild(heroEl);
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

      // Easter egg: detect Goku for Ultra Instinct transformation
      this.hasGoku = Array.from(this.container.querySelectorAll('[data-character-slug]')).some(function (el) {
        return el.dataset.characterSlug === 'goku';
      });
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
          return log.isTransformation ? 4500 : 3500;
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

            // Transformation: switch sprites to UI form permanently + change music
            if (log.isTransformation) {
              this.characterSlugs[uiKey] = 'goku/ui';
              // Show skill sprite briefly (power-up pose), then settle into UI idle
              this.swapSprite(uiKey, 'skill.webp', 2000);
              this.playCharSfx(uiKey, 'skill');
              var uiCasterEl = this.getCharacterElement(log.caster, log.casterTeam);
              if (uiCasterEl) {
                uiCasterEl.classList.add('ultra-instinct-attack');
                setTimeout(function () {
                  return uiCasterEl.classList.remove('ultra-instinct-attack');
                }, 2000);
              }
              // Switch music to Ultra Instinct theme
              if (this.combatMusic) {
                this.combatMusic.pause();
                this.combatMusic = null;
              }
              this.combatPlaylist = ['/asset/audio/combat/ultra-instinct.mp3'];
              this.lastTrackIndex = -1;
              this.playNextTrack();
            } else {
              // Already transformed: Hakai attack animation
              this.swapSprite(uiKey, 'attackanimation.webp', 1800);
              this.playCharSfx(uiKey, 'skill');
              var _uiCasterEl = this.getCharacterElement(log.caster, log.casterTeam);
              if (_uiCasterEl) {
                _uiCasterEl.classList.add('ultra-instinct-attack');
                setTimeout(function () {
                  return _uiCasterEl.classList.remove('ultra-instinct-attack');
                }, 1800);
              }
            }
          }
          if (log.target && log.targetTeam) {
            // Delay the hit animation more for transformation (power-up takes longer)
            var hitDelay = log.isTransformation ? 1200 : 600;
            setTimeout(function () {
              var uiTargetEl = _this6.getCharacterElement(log.target, log.targetTeam);
              if (uiTargetEl) {
                uiTargetEl.classList.add('hurt', 'crit');
                setTimeout(function () {
                  return uiTargetEl.classList.remove('hurt', 'crit');
                }, 800);
              }
            }, hitDelay);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QixDQUFDLENBQUM7RUFDbEJ6QixxQkFBcUIsR0FBR3lELFdBQVcsQ0FBQ2hDLGdCQUFnQixFQUFFLEtBQUssQ0FBQztBQUNoRSxDQUFDLENBQUMsQzs7Ozs7Ozs7Ozs7O0FDdGZGOzs7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9jb21iYXQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2ZyaWVuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzPzJkYzkiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9hcHAuc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBXZWxjb21lIHRvIHlvdXIgYXBwJ3MgbWFpbiBKYXZhU2NyaXB0IGZpbGUhXHJcbiAqL1xyXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcyc7XHJcbmltcG9ydCAnLi9qcy9jb21iYXQuanMnO1xyXG5pbXBvcnQgJy4vanMvZnJpZW5kcy5qcyc7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIFVUSUxJVEFJUkUgU0VDVVJJVEUgWFNTXHJcbj09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcclxuICAgIGlmICghc3RyKSByZXR1cm4gJyc7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKTtcclxuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIE1FTlUgQlVSR0VSXHJcbj09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXJnZXJcIik7XHJcbiAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tbmF2aWdhdGlvblwiKTtcclxuXHJcbiAgICBpZiAoYnVyZ2VyICYmIG5hdikge1xyXG4gICAgICAgIGJ1cmdlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgUEFHRSBURUFNUyAoQ09SUklHw4lFKVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyog8J+UpyBNQVggREVTIFNUQVRTIChhZGFwdGVyIMOgIHRhIEJERCAvIMOpcXVpbGlicmFnZSkgKi9cclxuY29uc3QgU1RBVF9NQVggPSB7XHJcbiAgICBkbWc6IDMwLFxyXG4gICAgc3BlZWQ6IDEyLFxyXG4gICAgZG9kZ2U6IDQwLFxyXG4gICAgY3JpdDogMTUsXHJcbiAgICBocDogNzVcclxufTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBwb3J0cmFpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVhbS1wb3J0cmFpdCcpO1xyXG4gICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZWFtRGV0YWlscycpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkLWxpc3QnKTtcclxuICAgIGNvbnN0IGxhdW5jaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tbGF1bmNoJyk7XHJcblxyXG4gICAgaWYgKCFkZXRhaWxzIHx8IHBvcnRyYWl0cy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBtYXhTZWxlY3Rpb24gPSA0O1xyXG4gICAgbGV0IHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICBsZXQgc2VsZWN0ZWRIZXJvSWRzID0gW107XHJcblxyXG4gICAgLy8gQ29tcG9zaXRpb24gb2JsaWdhdG9pcmUgOiAxIFRhbmssIDEgRFBTLCAxIEhlYWxlciwgMSBTdXBwb3J0XHJcbiAgICAvLyBMYSBjYXRlZ29yaWUgdmllbnQgZGlyZWN0ZW1lbnQgZHUgZGF0YS1jYXRlZ29yeSAoY2FsY3VsZSBjb3RlIHNlcnZldXIpXHJcbiAgICBmdW5jdGlvbiBnZXRDYXRlZ29yeShwb3J0cmFpdCkge1xyXG4gICAgICAgIHJldHVybiBwb3J0cmFpdC5kYXRhc2V0LmNhdGVnb3J5IHx8ICdTdXBwb3J0JztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZWxlY3RlZFJvbGVzKCkge1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0geyBUYW5rOiAwLCBEUFM6IDAsIEhlYWxlcjogMCwgU3VwcG9ydDogMCB9O1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHBwID0+IHBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgaWYgKHApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhdCA9IGdldENhdGVnb3J5KHApO1xyXG4gICAgICAgICAgICAgICAgcm9sZXNbY2F0XSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhblNlbGVjdFJvbGUocG9ydHJhaXRFbCkge1xyXG4gICAgICAgIGNvbnN0IGNhdCA9IGdldENhdGVnb3J5KHBvcnRyYWl0RWwpO1xyXG4gICAgICAgIGlmIChjYXQgPT09ICdMZWdlbmQnKSByZXR1cm4gdHJ1ZTsgLy8gTGVnZW5kIGJ5cGFzc2VzIHJvbGUgbGltaXRzXHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzW2NhdF0gPCAxO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoZWNrIGlmIGEgTGVnZW5kIGNoYXJhY3RlciBpcyBjdXJyZW50bHkgc2VsZWN0ZWRcclxuICAgIGZ1bmN0aW9uIGlzTGVnZW5kU2VsZWN0ZWQoKSB7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggIT09IDEpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBjb25zdCBwID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocHAgPT4gcHAuZGF0YXNldC5pZCA9PT0gc2VsZWN0ZWRIZXJvSWRzWzBdKTtcclxuICAgICAgICByZXR1cm4gcCAmJiBnZXRDYXRlZ29yeShwKSA9PT0gJ0xlZ2VuZCc7XHJcbiAgICB9XHJcblxyXG4gICAgcG9ydHJhaXRzLmZvckVhY2gocG9ydHJhaXQgPT4ge1xyXG4gICAgICAgIHBvcnRyYWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gcG9ydHJhaXQuZGF0YXNldC5pZDtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHBvcnRyYWl0LmRhdGFzZXQubmFtZTtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZSA9IHBvcnRyYWl0LmRhdGFzZXQucm9sZTtcclxuICAgICAgICAgICAgY29uc3QgZG1nTWluID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuZG1nTWluKTtcclxuICAgICAgICAgICAgY29uc3QgZG1nTWF4ID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuZG1nTWF4KTtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5zcGVlZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRvZGdlID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuZG9kZ2UpO1xyXG4gICAgICAgICAgICBjb25zdCBjcml0ID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuY3JpdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhwID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuaHApO1xyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVGaWxlID0gcG9ydHJhaXQuZGF0YXNldC5zcHJpdGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlOYW1lID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5TmFtZSB8fCAnJztcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eURlc2MgPSBwb3J0cmFpdC5kYXRhc2V0LmFiaWxpdHlEZXNjIHx8ICcnO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5Q2QgPSBwb3J0cmFpdC5kYXRhc2V0LmFiaWxpdHlDZCB8fCAnJztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZVBhdGggPSBgL2Fzc2V0L3Nwcml0ZXMvJHtzcHJpdGVGaWxlfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUh0bWwgPSBhYmlsaXR5TmFtZSA/IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX2hlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZmlyZS1hbHRcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFiaWxpdHktc2VjdGlvbl9fbmFtZVwiPiR7ZXNjYXBlSHRtbChhYmlsaXR5TmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX2NkXCI+PGkgY2xhc3M9XCJmYXMgZmEtaG91cmdsYXNzLWhhbGZcIj48L2k+ICR7ZXNjYXBlSHRtbChhYmlsaXR5Q2QpfVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImFiaWxpdHktc2VjdGlvbl9fZGVzY1wiPiR7ZXNjYXBlSHRtbChhYmlsaXR5RGVzYyl9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgIDogJyc7XHJcblxyXG4gICAgICAgICAgICAvLyBCdWlsZCBzeW5lcmd5IGluZm8gZm9yIHRoaXMgY2hhcmFjdGVyXHJcbiAgICAgICAgICAgIGNvbnN0IGNoYXJTeW5lcmdpZXMgPSBzeW5lcmd5TWFwW25hbWVdIHx8IFtdO1xyXG4gICAgICAgICAgICBsZXQgc3luZXJneUh0bWwgPSAnJztcclxuICAgICAgICAgICAgaWYgKGNoYXJTeW5lcmdpZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgc3luZXJneUh0bWwgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3luZXJneS1zZWN0aW9uX19oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWxpbmtcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvbl9fdGl0bGVcIj5TeW5lcmdpZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2NoYXJTeW5lcmdpZXMubWFwKHMgPT4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvbl9faXRlbSAke3NlbGVjdGVkSGVyb2VzLmluY2x1ZGVzKHMucGFydG5lcikgPyAnc3luZXJneS1zZWN0aW9uX19pdGVtLS1hY3RpdmUnIDogJyd9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25fX3BhcnRuZXJcIj4ke2VzY2FwZUh0bWwocy5wYXJ0bmVyKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25fX3NuYW1lXCI+JHtlc2NhcGVIdG1sKHMubmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwic3luZXJneS1zZWN0aW9uX19kZXNjXCI+JHtlc2NhcGVIdG1sKHMuZGVzYyl9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGV0YWlscy5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhbS1kZXRhaWxzLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDI+JHtuYW1lfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJyb2xlXCI+JHtyb2xlfTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdpZi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Nwcml0ZVBhdGh9XCIgYWx0PVwiU3ByaXRlIGRlICR7bmFtZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ETUc8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tZG1nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChkbWdNYXggLyBTVEFUX01BWC5kbWcpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkbWdNaW59IC0gJHtkbWdNYXh9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5WSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tc3BkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChzcGVlZCAvIFNUQVRfTUFYLnNwZWVkKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7c3BlZWR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ET0RHRTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1kb2RnZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoZG9kZ2UgLyBTVEFUX01BWC5kb2RnZSkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2RvZGdlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q1JJVDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1jcml0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChjcml0IC8gU1RBVF9NQVguY3JpdCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2NyaXR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5IUDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1ocFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoaHAgLyBTVEFUX01BWC5ocCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2hwfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR7YWJpbGl0eUh0bWx9XHJcbiAgICAgICAgICAgICAgICAgICAgJHtzeW5lcmd5SHRtbH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1zZWxlY3QtcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtpc1NlbGVjdGVkID8gJ0TDqXPDqWxlY3Rpb25uZXInIDogJ1PDqWxlY3Rpb25uZXInfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBidG5SaWdodCA9IGRldGFpbHMucXVlcnlTZWxlY3RvcignLmJ0bi1zZWxlY3QtcmlnaHQnKTtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZUNhdCA9IGdldENhdGVnb3J5KHBvcnRyYWl0KTtcclxuICAgICAgICAgICAgY29uc3QgYWxyZWFkeVNlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIExlZ2VuZCBjaGFyYWN0ZXJzIGFyZSBhbHdheXMgc2VsZWN0YWJsZVxyXG4gICAgICAgICAgICBpZiAocm9sZUNhdCA9PT0gJ0xlZ2VuZCcpIHtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaXNMZWdlbmRTZWxlY3RlZCgpICYmICFhbHJlYWR5U2VsZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgIC8vIERpc2FibGUgbm9ybWFsIGNoYXJzIGlmIGEgTGVnZW5kIGlzIHNlbGVjdGVkXHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9ICdVbHRyYSBJbnN0aW5jdCBhY3RpZic7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoIWFscmVhZHlTZWxlY3RlZCAmJiAhY2FuU2VsZWN0Um9sZShwb3J0cmFpdCkpIHtcclxuICAgICAgICAgICAgICAgIC8vIETDqXNhY3RpdmVyIGxlIGJvdXRvbiBzaSBsZSBzbG90IGRlIGNlIHLDtGxlIGVzdCBkw6lqw6AgcHJpc1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQudGV4dENvbnRlbnQgPSBgU2xvdCAke3JvbGVDYXR9IGTDqWrDoCBwcmlzYDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAvLyBFQVNURVIgRUdHOiBMZWdlbmQgY2hhcmFjdGVyIGZpbGxzIGFsbCA0IHNsb3RzXHJcbiAgICAgICAgICAgICAgICBpZiAocm9sZUNhdCA9PT0gJ0xlZ2VuZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEZXNlbGVjdCBMZWdlbmRcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0cy5mb3JFYWNoKHAgPT4gcC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpKTtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTZWxlY3QgTGVnZW5kOiBjbGVhciBhbGwgYW5kIHNlbGVjdCBvbmx5IHRoaXNcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzID0gW2lkXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBbbmFtZV07XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0cy5mb3JFYWNoKHAgPT4gcC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0ZWRUZWFtKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuUmlnaHQudGV4dENvbnRlbnQgPSBzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpID8gJ0TDqXPDqWxlY3Rpb25uZXInIDogJ1PDqWxlY3Rpb25uZXInO1xyXG4gICAgICAgICAgICAgICAgICAgIGJ0blJpZ2h0LmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIC8vIFByZXZlbnQgc2VsZWN0aW5nIG5vcm1hbCBjaGFycyBpZiBMZWdlbmQgaXMgYWN0aXZlXHJcbiAgICAgICAgICAgICAgICBpZiAoaXNMZWdlbmRTZWxlY3RlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ1VsdHJhIEluc3RpbmN0IGVzdCBhY3RpZiAhIETDqXPDqWxlY3Rpb25uZXogR29rdSBkXFwnYWJvcmQuJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzID0gc2VsZWN0ZWRIZXJvSWRzLmZpbHRlcihoaWQgPT4gaGlkICE9PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBzZWxlY3RlZEhlcm9lcy5maWx0ZXIoaCA9PiBoICE9PSBuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhblNlbGVjdFJvbGUocG9ydHJhaXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGBWb3VzIGF2ZXogZMOpasOgIHVuICR7cm9sZUNhdH0gZGFucyB2b3RyZSDDqXF1aXBlICFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCA+PSBtYXhTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJWb3VzIHBvdXZleiBzw6lsZWN0aW9ubmVyIG1heGltdW0gNCBwZXJzb25uYWdlcyAhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcy5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcy5wdXNoKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0ZWRUZWFtKCk7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZClcclxuICAgICAgICAgICAgICAgICAgICA/ICdEw6lzw6lsZWN0aW9ubmVyJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogJ1PDqWxlY3Rpb25uZXInO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyA9PT0gU1lORVJHWSBTWVNURU0gPT09XHJcbiAgICBjb25zdCB0ZWFtc1BhZ2VFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy50ZWFtcy1wYWdlJyk7XHJcbiAgICBjb25zdCBzeW5lcmd5TWFwID0gdGVhbXNQYWdlRWwgPyBKU09OLnBhcnNlKHRlYW1zUGFnZUVsLmRhdGFzZXQuc3luZXJneU1hcCB8fCAne30nKSA6IHt9O1xyXG5cclxuICAgIC8qICBaT05FIMOJUVVJUEUg4oCUIHNwcml0ZXMgc2V1bGVtZW50ICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTZWxlY3RlZFRlYW0oKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBjb25zdCBsZWdlbmRBY3RpdmUgPSBpc0xlZ2VuZFNlbGVjdGVkKCk7XHJcblxyXG4gICAgICAgIGlmIChsZWdlbmRBY3RpdmUpIHtcclxuICAgICAgICAgICAgLy8gRWFzdGVyIGVnZzogc2hvdyBzb2xvIEdva3VcclxuICAgICAgICAgICAgY29uc3QgaGVybyA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBzZWxlY3RlZEhlcm9JZHNbMF0pO1xyXG4gICAgICAgICAgICBpZiAoaGVybykge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGhlcm8uZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3ByaXRlUGF0aCA9IGAvYXNzZXQvc3ByaXRlcy8ke2hlcm8uZGF0YXNldC5zcHJpdGV9YDtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlcm9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgaGVyb0VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWhlcm8tc3ByaXRlJyk7XHJcbiAgICAgICAgICAgICAgICBoZXJvRWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzcHJpdGVQYXRofVwiIGFsdD1cIlNwcml0ZSBkZSAke25hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZExpc3QuYXBwZW5kQ2hpbGQoaGVyb0VsKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGhlcm8gPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwID0+IHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFoZXJvKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gaGVyby5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7aGVyby5kYXRhc2V0LnNwcml0ZX1gO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVyb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBoZXJvRWwuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtaGVyby1zcHJpdGUnKTtcclxuICAgICAgICAgICAgICAgIGhlcm9FbC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Nwcml0ZVBhdGh9XCIgYWx0PVwiU3ByaXRlIGRlICR7bmFtZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke25hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkTGlzdC5hcHBlbmRDaGlsZChoZXJvRWwpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGxlcyBpbmRpY2F0ZXVycyBkZSByw7RsZXNcclxuICAgICAgICB1cGRhdGVSb2xlSW5kaWNhdG9ycygpO1xyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBsZXMgc3luZXJnaWVzXHJcbiAgICAgICAgdXBkYXRlU3luZXJneUhpZ2hsaWdodHMoKTtcclxuXHJcbiAgICAgICAgaWYgKGxhdW5jaEJ0bikge1xyXG4gICAgICAgICAgICBpZiAobGVnZW5kQWN0aXZlKSB7XHJcbiAgICAgICAgICAgICAgICBsYXVuY2hCdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgdGVhbUNvbXBsZXRlID0gcm9sZXMuVGFuayA9PT0gMSAmJiByb2xlcy5EUFMgPT09IDEgJiYgcm9sZXMuSGVhbGVyID09PSAxICYmIHJvbGVzLlN1cHBvcnQgPT09IDE7XHJcbiAgICAgICAgICAgICAgICBsYXVuY2hCdG4uZGlzYWJsZWQgPSAhdGVhbUNvbXBsZXRlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVN5bmVyZ3lIaWdobGlnaHRzKCkge1xyXG4gICAgICAgIC8vIFJlbW92ZSBhbGwgZXhpc3Rpbmcgc3luZXJneSBoaWdobGlnaHRzXHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgICAgIHAuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS1hdmFpbGFibGUnLCAnc3luZXJneS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgY29uc3QgYmFkZ2UgPSBwLnF1ZXJ5U2VsZWN0b3IoJy5zeW5lcmd5LWJhZGdlJyk7XHJcbiAgICAgICAgICAgIGlmIChiYWRnZSkgYmFkZ2UucmVtb3ZlKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIEdldCBuYW1lcyBvZiBzZWxlY3RlZCBoZXJvZXNcclxuICAgICAgICBjb25zdCBzZWxlY3RlZE5hbWVzID0gc2VsZWN0ZWRIZXJvSWRzLm1hcChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwcCA9PiBwcC5kYXRhc2V0LmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgIHJldHVybiBwID8gcC5kYXRhc2V0Lm5hbWUgOiBudWxsO1xyXG4gICAgICAgIH0pLmZpbHRlcihCb29sZWFuKTtcclxuXHJcbiAgICAgICAgLy8gRmluZCBhY3RpdmUgc3luZXJnaWVzIChib3RoIG1lbWJlcnMgc2VsZWN0ZWQpXHJcbiAgICAgICAgY29uc3QgYWN0aXZlU3luZXJnaWVzID0gW107XHJcbiAgICAgICAgY29uc3Qgc2VlblBhaXJzID0gbmV3IFNldCgpO1xyXG4gICAgICAgIHNlbGVjdGVkTmFtZXMuZm9yRWFjaChuYW1lID0+IHtcclxuICAgICAgICAgICAgY29uc3Qgc3luZXJnaWVzID0gc3luZXJneU1hcFtuYW1lXSB8fCBbXTtcclxuICAgICAgICAgICAgc3luZXJnaWVzLmZvckVhY2goc3luID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZE5hbWVzLmluY2x1ZGVzKHN5bi5wYXJ0bmVyKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhaXJLZXkgPSBbbmFtZSwgc3luLnBhcnRuZXJdLnNvcnQoKS5qb2luKCcrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFzZWVuUGFpcnMuaGFzKHBhaXJLZXkpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlZW5QYWlycy5hZGQocGFpcktleSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFjdGl2ZVN5bmVyZ2llcy5wdXNoKHsgbmFtZTE6IG5hbWUsIG5hbWUyOiBzeW4ucGFydG5lciwgc3luZXJneU5hbWU6IHN5bi5uYW1lLCBkZXNjOiBzeW4uZGVzYyB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBNYXJrIHNlbGVjdGVkIHBvcnRyYWl0cyB3aXRoIGFjdGl2ZSBzeW5lcmd5XHJcbiAgICAgICAgYWN0aXZlU3luZXJnaWVzLmZvckVhY2goc3luID0+IHtcclxuICAgICAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoKHAuZGF0YXNldC5uYW1lID09PSBzeW4ubmFtZTEgfHwgcC5kYXRhc2V0Lm5hbWUgPT09IHN5bi5uYW1lMilcclxuICAgICAgICAgICAgICAgICAgICAmJiBzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMocC5kYXRhc2V0LmlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHAuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1hY3RpdmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEhpZ2hsaWdodCB1bnNlbGVjdGVkIHBvcnRyYWl0cyB0aGF0IGhhdmUgc3luZXJneSB3aXRoIHNlbGVjdGVkIGhlcm9lc1xyXG4gICAgICAgIHBvcnRyYWl0cy5mb3JFYWNoKHAgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKHAuZGF0YXNldC5pZCkpIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgcE5hbWUgPSBwLmRhdGFzZXQubmFtZTtcclxuICAgICAgICAgICAgY29uc3QgY2hhclN5bmVyZ2llcyA9IHN5bmVyZ3lNYXBbcE5hbWVdIHx8IFtdO1xyXG4gICAgICAgICAgICBjb25zdCBtYXRjaGluZyA9IGNoYXJTeW5lcmdpZXMuZmlsdGVyKHN5biA9PiBzZWxlY3RlZE5hbWVzLmluY2x1ZGVzKHN5bi5wYXJ0bmVyKSk7XHJcblxyXG4gICAgICAgICAgICBpZiAobWF0Y2hpbmcubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcC5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWF2YWlsYWJsZScpO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYmFkZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGJhZGdlLmNsYXNzTmFtZSA9ICdzeW5lcmd5LWJhZGdlJztcclxuICAgICAgICAgICAgICAgIGJhZGdlLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1saW5rXCI+PC9pPic7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS50aXRsZSA9IG1hdGNoaW5nLm1hcChzID0+IHMubmFtZSkuam9pbignLCAnKTtcclxuICAgICAgICAgICAgICAgIHAuYXBwZW5kQ2hpbGQoYmFkZ2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFVwZGF0ZSB0aGUgc3luZXJneSBkaXNwbGF5IHBhbmVsXHJcbiAgICAgICAgdXBkYXRlU3luZXJneURpc3BsYXkoYWN0aXZlU3luZXJnaWVzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTeW5lcmd5RGlzcGxheShhY3RpdmVTeW5lcmdpZXMpIHtcclxuICAgICAgICBsZXQgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN5bmVyZ3ktZGlzcGxheScpO1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lciA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBjb250YWluZXIuY2xhc3NOYW1lID0gJ3N5bmVyZ3ktZGlzcGxheSc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFjdGlvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtdGVhbV9fYWN0aW9ucycpO1xyXG4gICAgICAgICAgICBpZiAoYWN0aW9ucykge1xyXG4gICAgICAgICAgICAgICAgYWN0aW9ucy5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjb250YWluZXIsIGFjdGlvbnMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoYWN0aXZlU3luZXJnaWVzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW5lcmd5LWRpc3BsYXlfX3RpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1saW5rXCI+PC9pPiBTeW5lcmdpZXMgYWN0aXZlc1xyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgJHthY3RpdmVTeW5lcmdpZXMubWFwKHMgPT4gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5bmVyZ3ktZGlzcGxheV9faXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19uYW1lXCI+JHtlc2NhcGVIdG1sKHMuc3luZXJneU5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN5bmVyZ3ktZGlzcGxheV9fY2hhcnNcIj4ke2VzY2FwZUh0bWwocy5uYW1lMSl9ICsgJHtlc2NhcGVIdG1sKHMubmFtZTIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN5bmVyZ3ktZGlzcGxheV9fZGVzY1wiPiR7ZXNjYXBlSHRtbChzLmRlc2MpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICBgO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCkge1xyXG4gICAgICAgIGNvbnN0IGxlZ2VuZEFjdGl2ZSA9IGlzTGVnZW5kU2VsZWN0ZWQoKTtcclxuICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICBjb25zdCBpbmRpY2F0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm9sZS1pbmRpY2F0b3InKTtcclxuICAgICAgICBpZiAoaW5kaWNhdG9yKSB7XHJcbiAgICAgICAgICAgIGluZGljYXRvci5xdWVyeVNlbGVjdG9yQWxsKCcucm9sZS1zbG90JykuZm9yRWFjaChzbG90ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhdCA9IHNsb3QuZGF0YXNldC5yb2xlO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxlZ2VuZEFjdGl2ZSB8fCByb2xlc1tjYXRdID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICBQUkVTRVRTXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4gICAgY29uc3Qgc2F2ZVByZXNldEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2F2ZS1wcmVzZXQnKTtcclxuICAgIGNvbnN0IHByZXNldE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldE1vZGFsJyk7XHJcbiAgICBjb25zdCBwcmVzZXROYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0TmFtZScpO1xyXG4gICAgY29uc3QgcHJlc2V0Q29uZmlybUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRDb25maXJtJyk7XHJcbiAgICBjb25zdCBwcmVzZXRDYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0Q2FuY2VsJyk7XHJcblxyXG4gICAgLy8gTWV0dHJlIGEgam91ciBsZSBib3V0b24gc2F1dmVnYXJkZXIgc2Vsb24gbGEgc2VsZWN0aW9uXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTYXZlUHJlc2V0QnRuKCkge1xyXG4gICAgICAgIGlmIChzYXZlUHJlc2V0QnRuKSB7XHJcbiAgICAgICAgICAgIC8vIExlZ2VuZCB0ZWFtcyBjYW5ub3QgYmUgc2F2ZWQgYXMgcHJlc2V0c1xyXG4gICAgICAgICAgICBpZiAoaXNMZWdlbmRTZWxlY3RlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICBzYXZlUHJlc2V0QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbUNvbXBsZXRlID0gcm9sZXMuVGFuayA9PT0gMSAmJiByb2xlcy5EUFMgPT09IDEgJiYgcm9sZXMuSGVhbGVyID09PSAxICYmIHJvbGVzLlN1cHBvcnQgPT09IDE7XHJcbiAgICAgICAgICAgIHNhdmVQcmVzZXRCdG4uZGlzYWJsZWQgPSAhdGVhbUNvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBBcHBlbGVyIHVwZGF0ZVNhdmVQcmVzZXRCdG4gYSBjaGFxdWUgY2hhbmdlbWVudCBkZSBzZWxlY3Rpb25cclxuICAgIGNvbnN0IG9yaWdpbmFsVXBkYXRlU2VsZWN0ZWRUZWFtID0gdXBkYXRlU2VsZWN0ZWRUZWFtO1xyXG4gICAgLy8gT24gc3VyY2hhcmdlIGVuIGFqb3V0YW50IGwnYXBwZWxcclxuICAgIGNvbnN0IF9vcmlnVXBkYXRlID0gdXBkYXRlU2VsZWN0ZWRUZWFtO1xyXG5cclxuICAgIC8vIFBhdGNoOiBham91dGVyIGwnYXBwZWwgYSB1cGRhdGVTYXZlUHJlc2V0QnRuIGRhbnMgdXBkYXRlU2VsZWN0ZWRUZWFtXHJcbiAgICAvLyBPbiBsZSBmYWl0IGVuIHdyYXBwYW50IGxlcyBpbmRpY2F0ZXVyc1xyXG4gICAgY29uc3QgX29yaWdSb2xlSW5kaWNhdG9ycyA9IHVwZGF0ZVJvbGVJbmRpY2F0b3JzO1xyXG5cclxuICAgIC8vIE91dnJpciBsYSBtb2RhbFxyXG4gICAgaWYgKHNhdmVQcmVzZXRCdG4gJiYgcHJlc2V0TW9kYWwpIHtcclxuICAgICAgICBzYXZlUHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBwcmVzZXROYW1lSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgcHJlc2V0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwcmVzZXROYW1lSW5wdXQuZm9jdXMoKSwgMTAwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRmVybWVyIGxhIG1vZGFsXHJcbiAgICAgICAgcHJlc2V0Q2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwcmVzZXRNb2RhbC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LW1vZGFsX19iYWNrZHJvcCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBTYXV2ZWdhcmRlciBsZSBwcmVzZXRcclxuICAgICAgICBwcmVzZXRDb25maXJtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gcHJlc2V0TmFtZUlucHV0LnZhbHVlLnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKCFuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVzZXROYW1lSW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI2RjMTQzYyc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLnRleHRDb250ZW50ID0gJy4uLic7XHJcblxyXG4gICAgICAgICAgICBmZXRjaCgnL3RlYW1zL3ByZXNldHMvc2F2ZScsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcklkczogc2VsZWN0ZWRIZXJvSWRzLm1hcChOdW1iZXIpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVjaGFyZ2VyIGxhIHBhZ2UgcG91ciBhZmZpY2hlciBsZSBub3V2ZWF1IHByZXNldFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoZGF0YS5lcnJvciB8fCAnRXJyZXVyIGxvcnMgZGUgbGEgc2F1dmVnYXJkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLnRleHRDb250ZW50ID0gJ1NhdXZlZ2FyZGVyJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlJyk7XHJcbiAgICAgICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLnRleHRDb250ZW50ID0gJ1NhdXZlZ2FyZGVyJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEVudGVyIHBvdXIgdmFsaWRlclxyXG4gICAgICAgIHByZXNldE5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBwcmVzZXRDb25maXJtQnRuLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoYXJnZXIgdW4gcHJlc2V0IChzZWxlY3Rpb24gcHJvZ3JhbW1hdGlxdWUgZGVzIHBlcnNvbm5hZ2VzKVxyXG4gICAgZnVuY3Rpb24gbG9hZFByZXNldChjaGFyYWN0ZXJJZHMpIHtcclxuICAgICAgICAvLyBSZXNldCBsYSBzZWxlY3Rpb24gYWN0dWVsbGVcclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMgPSBbXTtcclxuICAgICAgICBzZWxlY3RlZEhlcm9lcyA9IFtdO1xyXG4gICAgICAgIHBvcnRyYWl0cy5mb3JFYWNoKHAgPT4gcC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpKTtcclxuXHJcbiAgICAgICAgLy8gU2VsZWN0aW9ubmVyIGxlcyBwZXJzb25uYWdlcyBkdSBwcmVzZXRcclxuICAgICAgICBjaGFyYWN0ZXJJZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkU3RyID0gU3RyaW5nKGlkKTtcclxuICAgICAgICAgICAgY29uc3QgcG9ydHJhaXQgPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwID0+IHAuZGF0YXNldC5pZCA9PT0gaWRTdHIpO1xyXG4gICAgICAgICAgICBpZiAocG9ydHJhaXQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcy5wdXNoKGlkU3RyKTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzLnB1c2gocG9ydHJhaXQuZGF0YXNldC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdXBkYXRlU2VsZWN0ZWRUZWFtKCk7XHJcbiAgICAgICAgdXBkYXRlU2F2ZVByZXNldEJ0bigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFN1cHByaW1lciB1biBwcmVzZXRcclxuICAgIGZ1bmN0aW9uIGRlbGV0ZVByZXNldChwcmVzZXRJZCwgY2hpcEVsKSB7XHJcbiAgICAgICAgaWYgKCFjb25maXJtKCdTdXBwcmltZXIgY2UgcHJlc2V0ID8nKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBmZXRjaChgL3RlYW1zL3ByZXNldHMvJHtwcmVzZXRJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgY2hpcEVsLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gU2kgcGx1cyBkZSBwcmVzZXRzLCBjYWNoZXIgbGEgYmFycmVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0cy1iYXJfX2xpc3QnKTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ICYmIGxpc3QuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXNldHMtYmFyJyk/LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4gYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHN1cHByZXNzaW9uJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEF0dGFjaGVyIGxlcyBldmVudHMgYXV4IGNoaXBzIGRlIHByZXNldHNcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVzZXQtY2hpcCcpLmZvckVhY2goY2hpcCA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJlc2V0SWQgPSBjaGlwLmRhdGFzZXQucHJlc2V0SWQ7XHJcbiAgICAgICAgY29uc3QgY2hhcklkcyA9IEpTT04ucGFyc2UoY2hpcC5kYXRhc2V0LnByZXNldElkcyk7XHJcblxyXG4gICAgICAgIGNoaXAucXVlcnlTZWxlY3RvcignLnByZXNldC1jaGlwX19sb2FkJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxvYWRQcmVzZXQoY2hhcklkcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNoaXAucXVlcnlTZWxlY3RvcignLnByZXNldC1jaGlwX19kZWxldGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZVByZXNldChwcmVzZXRJZCwgY2hpcCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBPYnNlcnZlciBsZXMgY2hhbmdlbWVudHMgZGUgc2VsZWN0aW9uIHBvdXIgbGUgYm91dG9uIHNhdmVcclxuICAgIC8vIE9uIHV0aWxpc2UgdW4gTXV0YXRpb25PYnNlcnZlciBzdXIgc2VsZWN0ZWRMaXN0XHJcbiAgICBjb25zdCBzZWxlY3RlZExpc3RPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHVwZGF0ZVNhdmVQcmVzZXRCdG4oKSk7XHJcbiAgICBpZiAoc2VsZWN0ZWRMaXN0KSB7XHJcbiAgICAgICAgc2VsZWN0ZWRMaXN0T2JzZXJ2ZXIub2JzZXJ2ZShzZWxlY3RlZExpc3QsIHsgY2hpbGRMaXN0OiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXVuY2hCdG4pIHtcclxuICAgICAgICBsYXVuY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRW52b2kgUE9TVCBBSkFYIHZlcnMgL3RlYW1zL3NlbGVjdFxyXG4gICAgICAgICAgICAgICAgZmV0Y2goJy90ZWFtcy9zZWxlY3QnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHNlbGVjdGVkSGVyb0lkcy5tYXAoKGlkLCBpKSA9PiBgY2hhcmFjdGVyX2lkc1ske2l9XT0ke2VuY29kZVVSSUNvbXBvbmVudChpZCl9YCkuam9pbignJicpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZWRpcmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzcG9uc2UudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlZGlyaWdlIG1hbnVlbGxlbWVudCBzaSBwYXMgZGUgcmVkaXJlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL21hdGNobWFraW5nJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc8OpbGVjdGlvbiBkZSBsXFwnw6lxdWlwZS4nKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgUFJPRklMRSBQT1BVUFxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS10b2dnbGVdJyk7XHJcbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtcG9wdXBdJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtYmFja2Ryb3BdJyk7XHJcbiAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtY2xvc2VdJyk7XHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jb250ZW50XScpO1xyXG5cclxuICAgIGlmICghdG9nZ2xlIHx8ICFwb3B1cCkgcmV0dXJuO1xyXG5cclxuICAgIGxldCBsb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuUG9wdXAoKSB7XHJcbiAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgcG9wdXAub2Zmc2V0SGVpZ2h0OyAvLyByZWZsb3dcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgaWYgKCFsb2FkZWQpIHtcclxuICAgICAgICAgICAgZmV0Y2hQcm9maWxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2ZpbGUtcG9wdXBfX2JhY2tkcm9wLS1vcGVuJyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuUG9wdXApO1xyXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZmV0Y2hQcm9maWxlKCkge1xyXG4gICAgICAgIGZldGNoKCcvYXBpL3Byb2ZpbGUnKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyUHJvZmlsZShkYXRhKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZXJyb3JcIj5FcnJldXIgZGUgY2hhcmdlbWVudDwvcD4nO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJQcm9maWxlKGRhdGEpIHtcclxuICAgICAgICBjb25zdCByZXN1bHRDbGFzcyA9IChyKSA9PiByID09PSAnd2luJyA/ICdyZXN1bHQtLXdpbicgOiByID09PSAnbG9zcycgPyAncmVzdWx0LS1sb3NzJyA6ICdyZXN1bHQtLWRyYXcnO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdExhYmVsID0gKHIpID0+IHIgPT09ICd3aW4nID8gJ1ZpY3RvaXJlJyA6IHIgPT09ICdsb3NzJyA/ICdEXFx1MDBlOWZhaXRlJyA6ICdOdWwnO1xyXG5cclxuICAgICAgICBjb25zdCBhdmF0YXJIdG1sID0gZGF0YS5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwoZGF0YS5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIkF2YXRhciBkZSAke2VzY2FwZUh0bWwoZGF0YS51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICA6IGA8aSBjbGFzcz1cImZhcyBmYS11c2VyLWNpcmNsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5gO1xyXG5cclxuICAgICAgICBsZXQgaHRtbCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2lkZW50aXR5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fYXZhdGFyXCI+JHthdmF0YXJIdG1sfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3VzZXJuYW1lXCI+JHtlc2NhcGVIdG1sKGRhdGEudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAke2RhdGEubW90dG8gPyBgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXBvcHVwX19tb3R0b1wiPlxcdTAwYWIgJHtlc2NhcGVIdG1sKGRhdGEubW90dG8pfSBcXHUwMGJiPC9zcGFuPmAgOiAnJ31cclxuICAgICAgICAgICAgICAgICAgICAke2RhdGEuYmlvID8gYDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fYmlvXCI+JHtlc2NhcGVIdG1sKGRhdGEuYmlvKX08L3A+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N0YXRzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX3ZhbHVlXCI+JHtlc2NhcGVIdG1sKFN0cmluZyhkYXRhLnJhdGluZykpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5NTVI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMud2lucykpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5WaWN0b2lyZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMubG9zc2VzKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPkRcXHUwMGU5ZmFpdGVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX3ZhbHVlXCI+JHtlc2NhcGVIdG1sKFN0cmluZyhkYXRhLnN0YXRzLndpblJhdGUpKX0lPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPldpbiBSYXRlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmZhdm9yaXRlQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zdGFyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBDaGFtcGlvbiBGYXZvcmlcclxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChkYXRhLmZhdm9yaXRlQ2hhcmFjdGVyLm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19yb2xlXCI+JHtlc2NhcGVIdG1sKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIucm9sZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX2NvdW50XCI+JHtlc2NhcGVIdG1sKFN0cmluZyhkYXRhLmZhdm9yaXRlQ2hhcmFjdGVyLmdhbWVzUGxheWVkKSl9IHBhcnRpZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmxhc3RUZWFtLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXVzZXJzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBEZXJuaVxcdTAwZThyZSBcXHUwMGM5cXVpcGVcclxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2RhdGEubGFzdFRlYW0ubWFwKGMgPT4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtX19tZW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtX19uYW1lXCI+JHtlc2NhcGVIdG1sKGMubmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX3JvbGVcIj4ke2VzY2FwZUh0bWwoYy5yb2xlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYCkuam9pbignJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLnJlY2VudEJhdHRsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtc2hpZWxkLWFsdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gSGlzdG9yaXF1ZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2RhdGEucmVjZW50QmF0dGxlcy5tYXAoYiA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2FyZW5hL3JlcGxheS8ke3BhcnNlSW50KGIuaWQsIDEwKX1cIiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fZW50cnkgJHtyZXN1bHRDbGFzcyhiLnJlc3VsdCl9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX3Jlc3VsdFwiPiR7cmVzdWx0TGFiZWwoYi5yZXN1bHQpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fb3Bwb25lbnRcIj52cyAke2VzY2FwZUh0bWwoYi5vcHBvbmVudCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X190eXBlXCI+JHtlc2NhcGVIdG1sKGIubWF0Y2hUeXBlKS50b1VwcGVyQ2FzZSgpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fZGF0ZVwiPiR7ZXNjYXBlSHRtbChiLmRhdGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wbGF5IHByb2ZpbGUtaGlzdG9yeV9fcmVwbGF5XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2VtcHR5XCI+QXVjdW4gY29tYmF0IGVucmVnaXN0clxcdTAwZTk8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9wcm9maWxlXCIgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lZGl0LWxpbmtcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wZW5cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IFxcdTAwYzlkaXRlciBsZSBwcm9maWxcclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgfVxyXG5cclxufSk7IiwiLyoqXHJcbiAqIENvbWJhdCBBbmltYXRpb24gQ29udHJvbGxlclxyXG4gKiBHw6hyZSBsJ2FmZmljaGFnZSBwcm9ncmVzc2lmIGRlcyBsb2dzIGRlIGNvbWJhdCBhdmVjIGFuaW1hdGlvbnNcclxuICovXHJcbmNsYXNzIENvbWJhdENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5sb2dzID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAxO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyRWxlbWVudHMgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlck1heEhQID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGVzIGxvZ3MgZGVwdWlzIGwnYXR0cmlidXQgZGF0YVxyXG4gICAgICAgIGNvbnN0IGxvZ3NEYXRhID0gdGhpcy5jb250YWluZXIuZGF0YXNldC5jb21iYXRMb2dzO1xyXG4gICAgICAgIGlmIChsb2dzRGF0YSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dzID0gSlNPTi5wYXJzZShsb2dzRGF0YSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBwYXJzaW5nIGxvZ3M6JywgZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFLDqWN1cMOpcmVyIGxlcyDDqWzDqW1lbnRzXHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtbG9nXScpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1vdmVybGF5XScpO1xyXG4gICAgICAgIHRoaXMucGxheUJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1wbGF5XScpO1xyXG4gICAgICAgIHRoaXMuc2tpcEJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1za2lwXScpO1xyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29tYmF0LXNwZWVkXScpO1xyXG5cclxuICAgICAgICAvLyBNYXAgZGVzIHBlcnNvbm5hZ2VzIGF2ZWMgc3RvY2thZ2UgZGVzIEhQIG1heCBpbml0aWF1eFxyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFAgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlclNsdWdzID0ge307XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJIYXNIZWFsID0ge307XHJcbiAgICAgICAgdGhpcy5hYmlsaXR5Q29vbGRvd25zID0ge307IC8vIFN1aXZpIGRlcyBjb29sZG93bnMgZW4gY291cnNcclxuICAgICAgICB0aGlzLmNoYXJhY3RlclN0YXR1c2VzID0ge307IC8vIFN1aXZpIGRlcyBzdGF0dXRzIGFjdGlmcyBwYXIgcGVyc29ubmFnZVxyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNoYXJhY3Rlci1uYW1lXScpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJOYW1lO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJUZWFtO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1trZXldID0gZWw7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XSA9IGVsLmRhdGFzZXQuY2hhcmFjdGVyU2x1ZyB8fCAnJztcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJIYXNIZWFsW2tleV0gPSBlbC5kYXRhc2V0Lmhhc0hlYWwgPT09ICd0cnVlJztcclxuXHJcbiAgICAgICAgICAgIC8vIEV4dHJhaXJlIGxlIEhQIG1heCBkZXB1aXMgbGUgdGV4dGUgaW5pdGlhbFxyXG4gICAgICAgICAgICBjb25zdCBocFRleHQgPSBlbC5xdWVyeVNlbGVjdG9yKCcuaHAtdGV4dCcpO1xyXG4gICAgICAgICAgICBpZiAoaHBUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IGhwVGV4dC50ZXh0Q29udGVudC5tYXRjaCgvKFxcZCspXFwvKFxcZCspLyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJhY3Rlck1heEhQW2tleV0gPSBwYXJzZUludChtYXRjaFsyXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIC8vIEluaXRpYWxpc2VyIGxlcyBzdGF0dXRzIHZpZGVzXHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XSA9IHRoaXMuY3JlYXRlRW1wdHlTdGF0dXNlcygpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBNYXAgZGVzIMOpbMOpbWVudHMgZCdhYmlsaXR5IGRhbnMgbGVzIGluZm8gcGFuZWxzXHJcbiAgICAgICAgdGhpcy5hYmlsaXR5RWxlbWVudHMgPSB7fTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuY2hhcmFjdGVyLWluZm9bZGF0YS1jaGFyLW5hbWVdJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbC5kYXRhc2V0LmNoYXJOYW1lO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtID0gZWwuZGF0YXNldC5jaGFyVGVhbTtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7dGVhbX0tJHtuYW1lfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlFbCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fYWJpbGl0eScpO1xyXG4gICAgICAgICAgICBpZiAoYWJpbGl0eUVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFiaWxpdHlFbGVtZW50c1trZXldID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsOiBhYmlsaXR5RWwsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4Q2Q6IHBhcnNlSW50KGFiaWxpdHlFbC5kYXRhc2V0LmFiaWxpdHlNYXhDZCkgfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICBiYWRnZTogYWJpbGl0eUVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fYWJpbGl0eS1jZC1iYWRnZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVFbDogYWJpbGl0eUVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fYWJpbGl0eS1uYW1lJyksXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbkVsOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignaScpLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDYWNoZXIgbCdvdmVybGF5XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBWaWRlciBsZSBsb2dcclxuICAgICAgICBpZiAodGhpcy5sb2dDb250YWluZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBdWRpb1xyXG4gICAgICAgIHRoaXMuYXVkaW9VbmxvY2tlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY29tYmF0TXVzaWMgPSBudWxsO1xyXG4gICAgICAgIHRoaXMubGFzdFRyYWNrSW5kZXggPSAtMTtcclxuICAgICAgICB0aGlzLmlzTXV0ZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnZvbHVtZSA9IDAuMDU7XHJcbiAgICAgICAgdGhpcy5zZnhWb2x1bWUgPSAwLjA1O1xyXG4gICAgICAgIHRoaXMuY29tYmF0UGxheWxpc3QgPSBbXHJcbiAgICAgICAgICAgICcvYXNzZXQvYXVkaW8vY29tYmF0L2J1dGNoZXJzYm91bGV2YXJkbXVzaWMubXAzJyxcclxuICAgICAgICAgICAgJy9hc3NldC9hdWRpby9jb21iYXQvY29tYmF0aW50aGVydWlucy5tcDMnLFxyXG4gICAgICAgIF07XHJcblxyXG4gICAgICAgIC8vIEVhc3RlciBlZ2c6IGRldGVjdCBHb2t1IGZvciBVbHRyYSBJbnN0aW5jdCB0cmFuc2Zvcm1hdGlvblxyXG4gICAgICAgIHRoaXMuaGFzR29rdSA9IEFycmF5LmZyb20odGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2hhcmFjdGVyLXNsdWddJykpXHJcbiAgICAgICAgICAgIC5zb21lKGVsID0+IGVsLmRhdGFzZXQuY2hhcmFjdGVyU2x1ZyA9PT0gJ2dva3UnKTtcclxuXHJcbiAgICAgICAgdGhpcy5lbmRNdXNpYyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5zZnhDYWNoZSA9IHt9O1xyXG4gICAgICAgIHRoaXMubXV0ZUJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWF1ZGlvLW11dGVdJyk7XHJcbiAgICAgICAgdGhpcy52b2x1bWVTbGlkZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1hdWRpby12b2x1bWVdJyk7XHJcbiAgICAgICAgdGhpcy5zZnhTbGlkZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1zZngtdm9sdW1lXScpO1xyXG5cclxuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lcnNcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gTGFuY2VyIGF1dG9tYXRpcXVlbWVudCBhcHLDqHMgdW4gZMOpbGFpXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBsYXkoKSwgODAwKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gU1RBVFVTIFRSQUNLSU5HID09PVxyXG5cclxuICAgIGNyZWF0ZUVtcHR5U3RhdHVzZXMoKSB7XHJcbiAgICAgICAgcmV0dXJuIHtcclxuICAgICAgICAgICAgYmxlZWRpbmc6IDAsXHJcbiAgICAgICAgICAgIGJsaWdodGVkOiAwLFxyXG4gICAgICAgICAgICBzdHVubmVkOiBmYWxzZSxcclxuICAgICAgICAgICAgbWFya2VkOiAwLFxyXG4gICAgICAgICAgICBwcm90ZWN0ZWQ6IDAsXHJcbiAgICAgICAgICAgIHN0ZWFsdGhlZDogMCxcclxuICAgICAgICAgICAgcmlwb3N0ZTogMCxcclxuICAgICAgICAgICAgZG1nVXA6IDAsXHJcbiAgICAgICAgICAgIHNwZFVwOiAwLFxyXG4gICAgICAgICAgICBkb2RnZVVwOiAwLFxyXG4gICAgICAgICAgICBjcml0VXA6IDAsXHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDaGFyYWN0ZXJTdGF0dXNlcyhsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JvdW5kJzpcclxuICAgICAgICAgICAgICAgIHRoaXMudGlja1JvdW5kU3RhdHVzZXMoKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjsgLy8gdGlja1JvdW5kU3RhdHVzZXMgYWxyZWFkeSBjYWxscyByZW5kZXJBbGxTdGF0dXNJY29uc1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnYWJpbGl0eV91c2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVBYmlsaXR5U3RhdHVzQ2hhbmdlKGxvZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2RlZmVuZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ3Byb3RlY3RlZCcsIGxvZy5kdXJhdGlvbiB8fCAyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfdGljayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnR1cm5zUmVtYWluaW5nICE9PSB1bmRlZmluZWQgJiYgbG9nLnR1cm5zUmVtYWluaW5nIDw9IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJywgMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF90aWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudHVybnNSZW1haW5pbmcgIT09IHVuZGVmaW5lZCAmJiBsb2cudHVybnNSZW1haW5pbmcgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnc3R1bm5lZF9za2lwJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnc3R1bm5lZCcsIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIC8vIFN0ZWFsdGggY29uc3VtZWQgb24gYXR0YWNrXHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmF0dGFja2VyICYmIGxvZy5hdHRhY2tlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtsb2cuYXR0YWNrZXJUZWFtfS0ke2xvZy5hdHRhY2tlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0gJiYgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldLnN0ZWFsdGhlZCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldLnN0ZWFsdGhlZCA9IDA7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X3RyaWdnZXInOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5oYW5kbGVTeW5lcmd5U3RhdHVzQ2hhbmdlKGxvZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuY2xlYXJBbGxTdGF0dXNlcyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMucmVuZGVyQWxsU3RhdHVzSWNvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVBYmlsaXR5U3RhdHVzQ2hhbmdlKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnN1YnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGVlZGluZycsIGxvZy5ibGVlZFR1cm5zIHx8IDMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5hbGxIaXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpbWFyeSA9IGxvZy5hbGxIaXRzLmZpbmQoaCA9PiBoLmlzUHJpbWFyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByaW1hcnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMocHJpbWFyeS5uYW1lLCBwcmltYXJ5LnRlYW0sICdibGlnaHRlZCcsIGxvZy5ibGlnaHRUdXJucyB8fCAzKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvZy50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsaWdodGVkJywgbG9nLmJsaWdodFR1cm5zIHx8IDMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW4nOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ3N0dW5uZWQnLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtYXJrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdtYXJrZWQnLCBsb2cubWFya1R1cm5zIHx8IDMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCAncmlwb3N0ZScsIGxvZy5yaXBvc3RlVHVybnMgfHwgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc2VsZl9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseUJ1ZmZTdGF0dXNlcyhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLmJ1ZmZzLCBsb2cuYnVmZkR1cmF0aW9uIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hcHBseVRlYW1CdWZmU3RhdHVzZXMobG9nLmNhc3RlclRlYW0sIGxvZy5idWZmcywgbG9nLmJ1ZmZEdXJhdGlvbiB8fCAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdGVhbHRoJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sICdzdGVhbHRoZWQnLCBsb2cuc3RlYWx0aFR1cm5zIHx8IDEpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3RfZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ3Byb3RlY3RlZCcsIGxvZy5wcm90ZWN0VHVybnMgfHwgMik7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdkb2RnZVVwJywgbG9nLnByb3RlY3RUdXJucyB8fCAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdlbWVyZ2VuY3lfaGVhbCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnNlbGZCbGVlZFR1cm5zICYmIGxvZy5zZWxmQmxlZWRUdXJucyA+IDAgJiYgbG9nLmNhc3Rlcikge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCAnYmxlZWRpbmcnLCBsb2cuc2VsZkJsZWVkVHVybnMpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvbnVzX3ZzX21hcmtlZCc6XHJcbiAgICAgICAgICAgICAgICAvLyBNYXJrIG1heSBiZSBjb25zdW1lZCBvbiBoaXQgKHJlbW92ZU9uSGl0KVxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB0S2V5ID0gYCR7bG9nLnRhcmdldFRlYW19LSR7bG9nLnRhcmdldH1gO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFdlIGNhbid0IGtub3cgZm9yIHN1cmUgaWYgcmVtb3ZlT25IaXQsIHNvIGxlYXZlIHRoZSBpY29uIC0gaXQgd2lsbCB0aWNrIGRvd25cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBoYW5kbGVTeW5lcmd5U3RhdHVzQ2hhbmdlKGxvZykge1xyXG4gICAgICAgIGlmICghbG9nLmVmZmVjdFR5cGUpIHJldHVybjtcclxuXHJcbiAgICAgICAgc3dpdGNoIChsb2cuZWZmZWN0VHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdncmFudF9yaXBvc3RlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5wYXJ0bmVyQ2hhciwgbG9nLnBhcnRuZXJDaGFyVGVhbSwgJ3JpcG9zdGUnLCBsb2cuZ3JhbnRlZFR1cm5zIHx8IDEpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RlbXBfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmJ1ZmZUeXBlcykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGR1cmF0aW9uID0gbG9nLmJ1ZmZEdXJhdGlvbiB8fCAyO1xyXG4gICAgICAgICAgICAgICAgICAgIGxvZy5idWZmVHlwZXMuZm9yRWFjaCh0eXBlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RhdHVzS2V5ID0gdGhpcy5idWZmVHlwZVRvU3RhdHVzS2V5KHR5cGUpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoc3RhdHVzS2V5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cucGFydG5lckNoYXIsIGxvZy5wYXJ0bmVyQ2hhclRlYW0sIHN0YXR1c0tleSwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYXBwbHlfbWFyayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnbWFya2VkJywgbG9nLm1hcmtUdXJucyB8fCAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdncmFudF9kb2RnZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cucGFydG5lckNoYXIsIGxvZy5wYXJ0bmVyQ2hhclRlYW0sICdkb2RnZVVwJywgbG9nLmRvZGdlRHVyYXRpb24gfHwgMik7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZXh0ZW5kX3N0ZWFsdGgnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5wYXJ0bmVyQ2hhciAmJiBsb2cucGFydG5lckNoYXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7bG9nLnBhcnRuZXJDaGFyVGVhbX0tJHtsb2cucGFydG5lckNoYXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XS5zdGVhbHRoZWQgKz0gKGxvZy5leHRyYVR1cm5zIHx8IDEpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdndWFyYW50ZWVkX2NyaXQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtLCAnY3JpdFVwJywgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYnVmZlR5cGVUb1N0YXR1c0tleSh0eXBlKSB7XHJcbiAgICAgICAgc3dpdGNoICh0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RhbWFnZSc6IHJldHVybiAnZG1nVXAnO1xyXG4gICAgICAgICAgICBjYXNlICdzcGVlZCc6IHJldHVybiAnc3BkVXAnO1xyXG4gICAgICAgICAgICBjYXNlICdkb2RnZSc6IHJldHVybiAnZG9kZ2VVcCc7XHJcbiAgICAgICAgICAgIGNhc2UgJ2NyaXQnOiByZXR1cm4gJ2NyaXRVcCc7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhcHBseUJ1ZmZTdGF0dXNlcyhjaGFyTmFtZSwgdGVhbU5hbWUsIGJ1ZmZzLCBkdXJhdGlvbikge1xyXG4gICAgICAgIGlmICghYnVmZnMpIHJldHVybjtcclxuICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtTmFtZX0tJHtjaGFyTmFtZX1gO1xyXG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV07XHJcbiAgICAgICAgaWYgKCFzKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmIChidWZmcy5kYW1hZ2UgJiYgYnVmZnMuZGFtYWdlID4gMCkgcy5kbWdVcCA9IE1hdGgubWF4KHMuZG1nVXAsIGR1cmF0aW9uKTtcclxuICAgICAgICBpZiAoYnVmZnMuc3BlZWQgJiYgYnVmZnMuc3BlZWQgPiAwKSBzLnNwZFVwID0gTWF0aC5tYXgocy5zcGRVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgIGlmIChidWZmcy5kb2RnZSAmJiBidWZmcy5kb2RnZSA+IDApIHMuZG9kZ2VVcCA9IE1hdGgubWF4KHMuZG9kZ2VVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgIGlmIChidWZmcy5jcml0ICYmIGJ1ZmZzLmNyaXQgPiAwKSBzLmNyaXRVcCA9IE1hdGgubWF4KHMuY3JpdFVwLCBkdXJhdGlvbik7XHJcbiAgICB9XHJcblxyXG4gICAgYXBwbHlUZWFtQnVmZlN0YXR1c2VzKHRlYW1OYW1lLCBidWZmcywgZHVyYXRpb24pIHtcclxuICAgICAgICBpZiAoIWJ1ZmZzKSByZXR1cm47XHJcbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXModGhpcy5jaGFyYWN0ZXJTdGF0dXNlcykpIHtcclxuICAgICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKHRlYW1OYW1lICsgJy0nKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgcyA9IHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmcy5kYW1hZ2UgJiYgYnVmZnMuZGFtYWdlID4gMCkgcy5kbWdVcCA9IE1hdGgubWF4KHMuZG1nVXAsIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmcy5zcGVlZCAmJiBidWZmcy5zcGVlZCA+IDApIHMuc3BkVXAgPSBNYXRoLm1heChzLnNwZFVwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICBpZiAoYnVmZnMuZG9kZ2UgJiYgYnVmZnMuZG9kZ2UgPiAwKSBzLmRvZGdlVXAgPSBNYXRoLm1heChzLmRvZGdlVXAsIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmcy5jcml0ICYmIGJ1ZmZzLmNyaXQgPiAwKSBzLmNyaXRVcCA9IE1hdGgubWF4KHMuY3JpdFVwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3RhdHVzKGNoYXJOYW1lLCB0ZWFtTmFtZSwgc3RhdHVzS2V5LCB2YWx1ZSkge1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW1OYW1lfS0ke2NoYXJOYW1lfWA7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0pIHJldHVybjtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV1bc3RhdHVzS2V5XSA9IHZhbHVlO1xyXG4gICAgfVxyXG5cclxuICAgIGNsZWFyQWxsU3RhdHVzZXMoY2hhck5hbWUsIHRlYW1OYW1lKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gYCR7dGVhbU5hbWV9LSR7Y2hhck5hbWV9YDtcclxuICAgICAgICBpZiAodGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XSA9IHRoaXMuY3JlYXRlRW1wdHlTdGF0dXNlcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB0aWNrUm91bmRTdGF0dXNlcygpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLmNoYXJhY3RlclN0YXR1c2VzKSkge1xyXG4gICAgICAgICAgICBjb25zdCBzID0gdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldO1xyXG4gICAgICAgICAgICAvLyBET1RzOiBOT1QgZGVjcmVtZW50ZWQgaGVyZSwgaGFuZGxlZCBieSBibGVlZF90aWNrL2JsaWdodF90aWNrIGxvZ3NcclxuICAgICAgICAgICAgLy8gRGVjcmVtZW50IGR1cmF0aW9uLWJhc2VkIHN0YXR1c2VzIChza2lwIHBlcm1hbmVudCBidWZmcyA+PSA5OTkpXHJcbiAgICAgICAgICAgIGlmIChzLm1hcmtlZCA+IDAgJiYgcy5tYXJrZWQgPCA5OTkpIHMubWFya2VkLS07XHJcbiAgICAgICAgICAgIGlmIChzLnByb3RlY3RlZCA+IDAgJiYgcy5wcm90ZWN0ZWQgPCA5OTkpIHMucHJvdGVjdGVkLS07XHJcbiAgICAgICAgICAgIGlmIChzLnN0ZWFsdGhlZCA+IDAgJiYgcy5zdGVhbHRoZWQgPCA5OTkpIHMuc3RlYWx0aGVkLS07XHJcbiAgICAgICAgICAgIGlmIChzLnJpcG9zdGUgPiAwICYmIHMucmlwb3N0ZSA8IDk5OSkgcy5yaXBvc3RlLS07XHJcbiAgICAgICAgICAgIGlmIChzLmRtZ1VwID4gMCAmJiBzLmRtZ1VwIDwgOTk5KSBzLmRtZ1VwLS07XHJcbiAgICAgICAgICAgIGlmIChzLnNwZFVwID4gMCAmJiBzLnNwZFVwIDwgOTk5KSBzLnNwZFVwLS07XHJcbiAgICAgICAgICAgIGlmIChzLmRvZGdlVXAgPiAwICYmIHMuZG9kZ2VVcCA8IDk5OSkgcy5kb2RnZVVwLS07XHJcbiAgICAgICAgICAgIGlmIChzLmNyaXRVcCA+IDAgJiYgcy5jcml0VXAgPCA5OTkpIHMuY3JpdFVwLS07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVuZGVyQWxsU3RhdHVzSWNvbnMoKTtcclxuICAgIH1cclxuXHJcbiAgICByZW5kZXJBbGxTdGF0dXNJY29ucygpIHtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLmNoYXJhY3RlclN0YXR1c2VzKSkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlclN0YXR1c0ljb25zKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlclN0YXR1c0ljb25zKGtleSkge1xyXG4gICAgICAgIGNvbnN0IGVsID0gdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1trZXldO1xyXG4gICAgICAgIGlmICghZWwpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZWwucXVlcnlTZWxlY3RvcignLnN0YXR1cy1pY29ucycpO1xyXG4gICAgICAgIGlmICghY29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHMgPSB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV07XHJcbiAgICAgICAgY29uc3QgaWNvbnMgPSBbXTtcclxuXHJcbiAgICAgICAgLy8gRGVidWZmc1xyXG4gICAgICAgIGlmIChzLmJsZWVkaW5nID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS10aW50JywgY2xzOiAnc3RhdHVzLWljb24tLWJsZWVkJywgdGl0bGU6ICdTYWlnbmVtZW50JyB9KTtcclxuICAgICAgICBpZiAocy5ibGlnaHRlZCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtc2t1bGwtY3Jvc3Nib25lcycsIGNsczogJ3N0YXR1cy1pY29uLS1ibGlnaHQnLCB0aXRsZTogJ1Blc3RlJyB9KTtcclxuICAgICAgICBpZiAocy5zdHVubmVkKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLWRpenp5JywgY2xzOiAnc3RhdHVzLWljb24tLXN0dW4nLCB0aXRsZTogJ0V0b3VyZGknIH0pO1xyXG4gICAgICAgIGlmIChzLm1hcmtlZCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtY3Jvc3NoYWlycycsIGNsczogJ3N0YXR1cy1pY29uLS1tYXJrJywgdGl0bGU6ICdNYXJxdWUnIH0pO1xyXG5cclxuICAgICAgICAvLyBCdWZmc1xyXG4gICAgICAgIGlmIChzLnByb3RlY3RlZCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtc2hpZWxkLWFsdCcsIGNsczogJ3N0YXR1cy1pY29uLS1wcm90ZWN0JywgdGl0bGU6ICdQcm90ZWdlJyB9KTtcclxuICAgICAgICBpZiAocy5zdGVhbHRoZWQgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLWV5ZS1zbGFzaCcsIGNsczogJ3N0YXR1cy1pY29uLS1zdGVhbHRoJywgdGl0bGU6ICdGdXJ0aWYnIH0pO1xyXG4gICAgICAgIGlmIChzLnJpcG9zdGUgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLWV4Y2hhbmdlLWFsdCcsIGNsczogJ3N0YXR1cy1pY29uLS1yaXBvc3RlJywgdGl0bGU6ICdSaXBvc3RlJyB9KTtcclxuICAgICAgICBpZiAocy5kbWdVcCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtZmlzdC1yYWlzZWQnLCBjbHM6ICdzdGF0dXMtaWNvbi0tZG1nLXVwJywgdGl0bGU6ICcrRGVnYXRzJyB9KTtcclxuICAgICAgICBpZiAocy5zcGRVcCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtd2luZCcsIGNsczogJ3N0YXR1cy1pY29uLS1zcGQtdXAnLCB0aXRsZTogJytWaXRlc3NlJyB9KTtcclxuICAgICAgICBpZiAocy5kb2RnZVVwID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1ydW5uaW5nJywgY2xzOiAnc3RhdHVzLWljb24tLWRvZGdlLXVwJywgdGl0bGU6ICcrRXNxdWl2ZScgfSk7XHJcbiAgICAgICAgaWYgKHMuY3JpdFVwID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1idWxsc2V5ZScsIGNsczogJ3N0YXR1cy1pY29uLS1jcml0LXVwJywgdGl0bGU6ICcrQ3JpdGlxdWUnIH0pO1xyXG5cclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gaWNvbnMubWFwKGkgPT5cclxuICAgICAgICAgICAgYDxzcGFuIGNsYXNzPVwic3RhdHVzLWljb24gJHtpLmNsc31cIiB0aXRsZT1cIiR7aS50aXRsZX1cIj48aSBjbGFzcz1cImZhcyAke2kuaWNvbn1cIj48L2k+PC9zcGFuPmBcclxuICAgICAgICApLmpvaW4oJycpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBFTkQgU1RBVFVTIFRSQUNLSU5HID09PVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheUJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZVBsYXkoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5za2lwQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2tpcCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuc2V0U3BlZWQoZSkpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBBdWRpbyBjb250cm9sc1xyXG4gICAgICAgIGlmICh0aGlzLm11dGVCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5tdXRlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVNdXRlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy52b2x1bWVTbGlkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy52b2x1bWVTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52b2x1bWUgPSBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbWJhdE11c2ljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jb21iYXRNdXNpYy52b2x1bWUgPSB0aGlzLmlzTXV0ZWQgPyAwIDogdGhpcy52b2x1bWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5lbmRNdXNpYykge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuZW5kTXVzaWMudm9sdW1lID0gdGhpcy5pc011dGVkID8gMCA6IHRoaXMudm9sdW1lO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc2Z4U2xpZGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2Z4U2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2Z4Vm9sdW1lID0gcGFyc2VGbG9hdChlLnRhcmdldC52YWx1ZSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVW5sb2NrIGF1ZGlvIG9uIGZpcnN0IHVzZXIgaW50ZXJhY3Rpb24gKGJyb3dzZXIgYXV0b3BsYXkgcG9saWN5KVxyXG4gICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5hdWRpb1VubG9ja2VkKSByZXR1cm47XHJcbiAgICAgICAgICAgIHRoaXMuYXVkaW9VbmxvY2tlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHRoaXMucGxheU5leHRUcmFjaygpO1xyXG4gICAgICAgIH0sIHsgb25jZTogdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZyAmJiAhdGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc05leHRMb2coKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVQbGF5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcgfHwgdGhpcy5pc1BhdXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNraXAoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIEFmZmljaGVyIHRvdXMgbGVzIGxvZ3MgcmVzdGFudHNcclxuICAgICAgICB3aGlsZSAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvZyA9IHRoaXMubG9nc1t0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUxvZyhsb2cpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKTtcclxuICAgICAgICAgICAgdGhpcy50cmFja0FiaWxpdHlDb29sZG93bnMobG9nKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJTdGF0dXNlcyhsb2cpO1xyXG4gICAgICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdkZWF0aCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAvLyBTeW5lcmd5IHRyaWdnZXJzIHRoYXQga2lsbCB0YXJnZXRzXHJcbiAgICAgICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ3N5bmVyZ3lfdHJpZ2dlcicgJiYgbG9nLnRhcmdldEhQID09PSAwICYmIGxvZy50YXJnZXQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zaG93VmljdG9yeU92ZXJsYXkoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTcGVlZChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHNwZWVkID0gcGFyc2VGbG9hdChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY29tYmF0U3BlZWQpO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbCdVSVxyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zLmZvckVhY2goYnRuID0+IGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTmV4dExvZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nIHx8IHRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmljdG9yeU92ZXJsYXkoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZyA9IHRoaXMubG9nc1t0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTG9nKGxvZyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsZXIgbGUgZMOpbGFpXHJcbiAgICAgICAgbGV0IGRlbGF5ID0gdGhpcy5nZXREZWxheUZvckxvZyhsb2cpO1xyXG4gICAgICAgIGRlbGF5ID0gZGVsYXkgLyB0aGlzLnNwZWVkO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvY2Vzc05leHRMb2coKSwgZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlbGF5Rm9yTG9nKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncm91bmQnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAnaW5pdGlhdGl2ZSc6IHJldHVybiA2MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6IHJldHVybiAzMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzogcmV0dXJuIDI4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlZmVuZCc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdkb2RnZSc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6IHJldHVybiAzNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0JzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZpY3RvcnknOlxyXG4gICAgICAgICAgICBjYXNlICdkcmF3JzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIC8vIE5vdXZlYXV4IHR5cGVzXHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgY2FzZSAnc3R1bm5lZF9za2lwJzogcmV0dXJuIDE4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYWN0aXZhdGUnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAnYWJpbGl0eV91c2UnOiByZXR1cm4gdGhpcy5nZXRBYmlsaXR5RGVsYXkobG9nKTtcclxuICAgICAgICAgICAgLy8gU3luZXJnaWVzXHJcbiAgICAgICAgICAgIGNhc2UgJ3N5bmVyZ3lfYW5ub3VuY2UnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV90cmlnZ2VyJzogcmV0dXJuIHRoaXMuZ2V0U3luZXJneVRyaWdnZXJEZWxheShsb2cpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMTIwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0U3luZXJneVRyaWdnZXJEZWxheShsb2cpIHtcclxuICAgICAgICAvLyBSZWFjdGl2ZSBzeW5lcmdpZXMgKGJvbnVzIGF0dGFja3MpIG5lZWQgbW9yZSB0aW1lXHJcbiAgICAgICAgaWYgKGxvZy5kYW1hZ2UgIT09IHVuZGVmaW5lZCkgcmV0dXJuIDM1MDA7XHJcbiAgICAgICAgcmV0dXJuIDI1MDA7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWJpbGl0eURlbGF5KGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnN1YnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfYXR0YWNrJzpcclxuICAgICAgICAgICAgY2FzZSAnYmFja2xpbmVfc3RyaWtlJzpcclxuICAgICAgICAgICAgY2FzZSAnYXJtb3JfcGllcmNlJzpcclxuICAgICAgICAgICAgY2FzZSAnYm9udXNfdnNfbWFya2VkJzogcmV0dXJuIDMwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOiByZXR1cm4gMzUwMDtcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdtYXJrJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYnVmZic6XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlbGZfYnVmZic6XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0ZWFsdGgnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfaGVhbCc6IHJldHVybiAyODAwO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9idWZmJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzogcmV0dXJuIDI4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3RfZG9kZ2UnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICd1bHRyYV9pbnN0aW5jdCc6IHJldHVybiBsb2cuaXNUcmFuc2Zvcm1hdGlvbiA/IDQ1MDAgOiAzNTAwO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMjAwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc0xvZyhsb2cpIHtcclxuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24obG9nKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlMb2cobG9nKTtcclxuXHJcbiAgICAgICAgLy8gU3luY2hyb25pc2VyIGxhIG1pc2Ugw6Agam91ciBkZXMgSFAgYXZlYyBsJ2FuaW1hdGlvblxyXG4gICAgICAgIGNvbnN0IGhwRGVsYXkgPSB0aGlzLmdldEhQVXBkYXRlRGVsYXkobG9nKTtcclxuICAgICAgICBpZiAoaHBEZWxheSA+IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKSwgaHBEZWxheSAvIHRoaXMuc3BlZWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3VpdmkgZGVzIGNvb2xkb3duc1xyXG4gICAgICAgIHRoaXMudHJhY2tBYmlsaXR5Q29vbGRvd25zKGxvZyk7XHJcblxyXG4gICAgICAgIC8vIFN1aXZpIGRlcyBzdGF0dXRzIChpY29uZXMgYnVmZi9kZWJ1ZmYpXHJcbiAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJTdGF0dXNlcyhsb2cpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYWNrQWJpbGl0eUNvb2xkb3ducyhsb2cpIHtcclxuICAgICAgICAvLyBRdWFuZCB1bmUgY29tcMOpdGVuY2UgZXN0IHV0aWxpc8OpZSwgbWV0dHJlIGVuIGNvb2xkb3duXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAnYWJpbGl0eV91c2UnICYmIGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5RGF0YSA9IHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RGF0YSAmJiBhYmlsaXR5RGF0YS5tYXhDZCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldID0gYWJpbGl0eURhdGEubWF4Q2Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUFiaWxpdHlDb29sZG93bkRpc3BsYXkoa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQSBjaGFxdWUgbm91dmVhdSByb3VuZCwgZMOpY3LDqW1lbnRlciB0b3VzIGxlcyBjb29sZG93bnNcclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdyb3VuZCcpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5hYmlsaXR5Q29vbGRvd25zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hYmlsaXR5Q29vbGRvd25zW2tleV0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hYmlsaXR5Q29vbGRvd25zW2tleV0tLTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUFiaWxpdHlDb29sZG93bkRpc3BsYXkoa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5KGtleSkge1xyXG4gICAgICAgIGNvbnN0IGFiaWxpdHlEYXRhID0gdGhpcy5hYmlsaXR5RWxlbWVudHNba2V5XTtcclxuICAgICAgICBpZiAoIWFiaWxpdHlEYXRhKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNkID0gdGhpcy5hYmlsaXR5Q29vbGRvd25zW2tleV0gfHwgMDtcclxuXHJcbiAgICAgICAgaWYgKGNkID4gMCkge1xyXG4gICAgICAgICAgICAvLyBFbiBjb29sZG93biA6IGdyaXNlciArIGFmZmljaGVyIGJhZGdlXHJcbiAgICAgICAgICAgIGFiaWxpdHlEYXRhLmVsLmNsYXNzTGlzdC5hZGQoJ2NoYXJhY3Rlci1pbmZvX19hYmlsaXR5LS1vbi1jZCcpO1xyXG4gICAgICAgICAgICBpZiAoYWJpbGl0eURhdGEuYmFkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGFiaWxpdHlEYXRhLmJhZGdlLnRleHRDb250ZW50ID0gYCR7Y2R9VGA7XHJcbiAgICAgICAgICAgICAgICBhYmlsaXR5RGF0YS5iYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBQcsOqdCA6IHJldGlyZXIgbGUgZ3Jpc1xyXG4gICAgICAgICAgICBhYmlsaXR5RGF0YS5lbC5jbGFzc0xpc3QucmVtb3ZlKCdjaGFyYWN0ZXItaW5mb19fYWJpbGl0eS0tb24tY2QnKTtcclxuICAgICAgICAgICAgaWYgKGFiaWxpdHlEYXRhLmJhZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBhYmlsaXR5RGF0YS5iYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEhQVXBkYXRlRGVsYXkobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOiByZXR1cm4gMzUwO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzogcmV0dXJuIDQwMDtcclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOiByZXR1cm4gMDtcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfdGljayc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF90aWNrJzogcmV0dXJuIDIwMDtcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6IHJldHVybiAzNTA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzogcmV0dXJuIHRoaXMuZ2V0QWJpbGl0eUhQRGVsYXkobG9nKTtcclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV90cmlnZ2VyJzogcmV0dXJuIDgwMDtcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFiaWxpdHlIUERlbGF5KGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnN1YnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfYXR0YWNrJzpcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JhY2tsaW5lX3N0cmlrZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2FybW9yX3BpZXJjZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvbnVzX3ZzX21hcmtlZCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW4nOiByZXR1cm4gMzUwO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9oZWFsJzpcclxuICAgICAgICAgICAgY2FzZSAnZW1lcmdlbmN5X2hlYWwnOiByZXR1cm4gNDAwO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2Zvcm1fZGFtYWdlJzogcmV0dXJuIDIwMDtcclxuICAgICAgICAgICAgY2FzZSAndWx0cmFfaW5zdGluY3QnOiByZXR1cm4gNDAwO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGxheUFuaW1hdGlvbihsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmF0dGFja2VyLCBsb2cuYXR0YWNrZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgbG9nLmlzQ3JpdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVIZWFsKGxvZy5oZWFsZXIsIGxvZy5oZWFsZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZGVmZW5kJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlZmVuZChsb2cuZGVmZW5kZXIsIGxvZy5kZWZlbmRlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RvZGdlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURvZGdlKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWF0aChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gTm91dmVhdXggdHlwZXNcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfdGljayc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEb1QobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGVlZGluZycpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF90aWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsaWdodGVkJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3R1bm5lZF9za2lwJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN0dW5uZWQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYWN0aXZhdGUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5hdHRhY2tlciwgbG9nLmF0dGFja2VyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlBYmlsaXR5QW5pbWF0aW9uKGxvZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gU3luZXJnaWVzXHJcbiAgICAgICAgICAgIGNhc2UgJ3N5bmVyZ3lfYW5ub3VuY2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3luZXJneUFubm91bmNlKGxvZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV90cmlnZ2VyJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN5bmVyZ3lUcmlnZ2VyKGxvZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IE5PVVZFTExFUyBBTklNQVRJT05TID09PVxyXG5cclxuICAgIGFuaW1hdGVEb1QodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSwgZG90Q2xhc3MpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChkb3RDbGFzcyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoZG90Q2xhc3MpLCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVN0dW5uZWQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzdHVubmVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3N0dW5uZWQnKSwgMTQwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVNYXJrZWQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdtYXJrZWQnKTtcclxuICAgICAgICAgICAgLy8gTGEgbWFycXVlIHJlc3RlIHZpc2libGUgcGx1cyBsb25ndGVtcHNcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbWFya2VkJyksIDIwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlQnVmZih0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2J1ZmZlZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdidWZmZWQnKSwgMTQwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVTdGVhbHRoKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc3RlYWx0aGVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3N0ZWFsdGhlZCcpLCAxNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGxheUFiaWxpdHlBbmltYXRpb24obG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cuc3VidHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF9hdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFuaW1hdGVEb1QobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGVlZGluZycpLCA3MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBibGlnaHRLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKGJsaWdodEtleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KGJsaWdodEtleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgY2FzdGVyRWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChjYXN0ZXJFbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjYXN0ZXJFbC5jbGFzc0xpc3QuYWRkKCdhdHRhY2tpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBjYXN0ZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCdhdHRhY2tpbmcnKSwgMTIwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gQU9FOiBodXJ0IGFsbCBoaXQgZW5lbWllc1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5hbGxIaXRzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZy5hbGxIaXRzLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChoLm5hbWUsIGgudGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdodXJ0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdodXJ0JyksIDgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQmxpZ2h0IERPVCBhbmltYXRpb24gb25seSBvbiBwcmltYXJ5IHRhcmdldFxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHByaW1hcnkgPSBsb2cuYWxsSGl0cy5maW5kKGggPT4gaC5pc1ByaW1hcnkpO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChwcmltYXJ5KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hbmltYXRlRG9UKHByaW1hcnkubmFtZSwgcHJpbWFyeS50ZWFtLCAnYmxpZ2h0ZWQnKSwgMTAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gRmFsbGJhY2sgZm9yIG9sZCBsb2cgZm9ybWF0XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFuaW1hdGVEb1QobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGlnaHRlZCcpLCA3MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW4nOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFuaW1hdGVTdHVubmVkKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKSwgNzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtYXJrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFya0tleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUobWFya0tleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KG1hcmtLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHRoaXMuYW5pbWF0ZU1hcmtlZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcmlwb3N0ZUtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUocmlwb3N0ZUtleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHJpcG9zdGVLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlbGZfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGZCdWZmS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFib21pbmF0aW9uIFRyYW5zZm9ybWF0aW9uIDogc3dpdGNoIHNsdWcgdG8gYmVhc3QgcGVybWFuZW50bHlcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9nLmFiaWxpdHlOYW1lID09PSAnVHJhbnNmb3JtYXRpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU2x1Z3Nbc2VsZkJ1ZmZLZXldID0gJ2JlYXN0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHNlbGZCdWZmS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoc2VsZkJ1ZmZLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0eUhlYWxLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChwYXJ0eUhlYWxLZXksICdoZWFsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuaW1lciB0b3VzIGxlcyBhbGxpw6lzIHNvaWduw6lzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvZy5oZWFsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nLmhlYWxlZC5mb3JFYWNoKGggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoaC5uYW1lLCBoLnRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaGVhbGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsZWQnKSwgMTUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydHlCdWZmS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShwYXJ0eUJ1ZmZLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChwYXJ0eUJ1ZmZLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gQW5pbWVyIHRvdXMgbGVzIGFsbGnDqXMgZHUgbcOqbWUgY8O0dMOpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVUZWFtQnVmZihsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3RlYWx0aCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0ZWFsdGhLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHN0ZWFsdGhLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChzdGVhbHRoS2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTdGVhbHRoKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy5pc0NyaXQgfHwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZW1lcmdIZWFsS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoZW1lcmdIZWFsS2V5LCAnaGVhbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0X2RvZGdlJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJvdERvZGdlS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngocHJvdERvZGdlS2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWZlbmQobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyYW5zZm9ybV9kYW1hZ2UnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2h1cnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdodXJ0JyksIDgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3VsdHJhX2luc3RpbmN0JzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdWlLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIFRyYW5zZm9ybWF0aW9uOiBzd2l0Y2ggc3ByaXRlcyB0byBVSSBmb3JtIHBlcm1hbmVudGx5ICsgY2hhbmdlIG11c2ljXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvZy5pc1RyYW5zZm9ybWF0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU2x1Z3NbdWlLZXldID0gJ2dva3UvdWknO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBTaG93IHNraWxsIHNwcml0ZSBicmllZmx5IChwb3dlci11cCBwb3NlKSwgdGhlbiBzZXR0bGUgaW50byBVSSBpZGxlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZSh1aUtleSwgJ3NraWxsLndlYnAnLCAyMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeCh1aUtleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVpQ2FzdGVyRWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodWlDYXN0ZXJFbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlDYXN0ZXJFbC5jbGFzc0xpc3QuYWRkKCd1bHRyYS1pbnN0aW5jdC1hdHRhY2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdWlDYXN0ZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCd1bHRyYS1pbnN0aW5jdC1hdHRhY2snKSwgMjAwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gU3dpdGNoIG11c2ljIHRvIFVsdHJhIEluc3RpbmN0IHRoZW1lXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNvbWJhdE11c2ljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbWJhdE11c2ljLnBhdXNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbWJhdE11c2ljID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbWJhdFBsYXlsaXN0ID0gWycvYXNzZXQvYXVkaW8vY29tYmF0L3VsdHJhLWluc3RpbmN0Lm1wMyddO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmxhc3RUcmFja0luZGV4ID0gLTE7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMucGxheU5leHRUcmFjaygpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIEFscmVhZHkgdHJhbnNmb3JtZWQ6IEhha2FpIGF0dGFjayBhbmltYXRpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHVpS2V5LCAnYXR0YWNrYW5pbWF0aW9uLndlYnAnLCAxODAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeCh1aUtleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVpQ2FzdGVyRWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodWlDYXN0ZXJFbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlDYXN0ZXJFbC5jbGFzc0xpc3QuYWRkKCd1bHRyYS1pbnN0aW5jdC1hdHRhY2snKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdWlDYXN0ZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCd1bHRyYS1pbnN0aW5jdC1hdHRhY2snKSwgMTgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIERlbGF5IHRoZSBoaXQgYW5pbWF0aW9uIG1vcmUgZm9yIHRyYW5zZm9ybWF0aW9uIChwb3dlci11cCB0YWtlcyBsb25nZXIpXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgaGl0RGVsYXkgPSBsb2cuaXNUcmFuc2Zvcm1hdGlvbiA/IDEyMDAgOiA2MDA7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IHVpVGFyZ2V0RWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodWlUYXJnZXRFbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdWlUYXJnZXRFbC5jbGFzc0xpc3QuYWRkKCdodXJ0JywgJ2NyaXQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdWlUYXJnZXRFbC5jbGFzc0xpc3QucmVtb3ZlKCdodXJ0JywgJ2NyaXQnKSwgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIH0sIGhpdERlbGF5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlVGVhbUJ1ZmYoY2FzdGVyVGVhbSkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY2hhcmFjdGVyRWxlbWVudHMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKGNhc3RlclRlYW0pKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2J1ZmZlZCcpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdidWZmZWQnKSwgMTQwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gU1lORVJHWSBBTklNQVRJT05TID09PVxyXG5cclxuICAgIGFuaW1hdGVTeW5lcmd5QW5ub3VuY2UobG9nKSB7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudHJpZ2dlckNoYXIsIGxvZy50ZWFtKTtcclxuICAgICAgICBjb25zdCBwYXJ0bmVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy5wYXJ0bmVyQ2hhciwgbG9nLnRlYW0pO1xyXG5cclxuICAgICAgICBpZiAodHJpZ2dlcikge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktYW5ub3VuY2UtZ2xvdycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS1hbm5vdW5jZS1nbG93JyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFydG5lcikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBhcnRuZXIuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1hbm5vdW5jZS1nbG93Jyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHBhcnRuZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS1hbm5vdW5jZS1nbG93JyksIDE1MDApO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRHJhdyBTVkcgbGluayBiZXR3ZWVuIHRoZSB0d29cclxuICAgICAgICBpZiAodHJpZ2dlciAmJiBwYXJ0bmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1N5bmVyZ3lMaW5rKHRyaWdnZXIsIHBhcnRuZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlU3luZXJneVRyaWdnZXIobG9nKSB7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudHJpZ2dlckNoYXIsIGxvZy50cmlnZ2VyQ2hhclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHBhcnRuZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtKTtcclxuXHJcbiAgICAgICAgLy8gUGhhc2UgMTogVHJpZ2dlciBnbG93XHJcbiAgICAgICAgaWYgKHRyaWdnZXIpIHtcclxuICAgICAgICAgICAgdHJpZ2dlci5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LXRyaWdnZXItZ2xvdycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS10cmlnZ2VyLWdsb3cnKSwgMTgwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQaGFzZSAyOiBTVkcgbGluayBiZXR3ZWVuIHRyaWdnZXIgYW5kIHBhcnRuZXJcclxuICAgICAgICBpZiAodHJpZ2dlciAmJiBwYXJ0bmVyKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kcmF3U3luZXJneUxpbmsodHJpZ2dlciwgcGFydG5lciksIDQwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQaGFzZSAzOiBQYXJ0bmVyIHJlYWN0aW9uXHJcbiAgICAgICAgaWYgKHBhcnRuZXIpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0bmVyLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktcmVhY3QnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcGFydG5lci5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LXJlYWN0JyksIDgwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgaXQncyBhIGJvbnVzIGF0dGFjaywgYW5pbWF0ZSB0aGUgcGFydG5lciBhdHRhY2tpbmdcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuZGFtYWdlICE9PSB1bmRlZmluZWQgJiYgbG9nLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRuZXJLZXkgPSBgJHtsb2cucGFydG5lckNoYXJUZWFtfS0ke2xvZy5wYXJ0bmVyQ2hhcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShwYXJ0bmVyS2V5LCAnYXR0YWNrYW5pbWF0aW9uLndlYnAnLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHBhcnRuZXJLZXksICdhdHRhY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2h1cnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnKSwgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdTeW5lcmd5TGluayhlbDEsIGVsMikge1xyXG4gICAgICAgIGNvbnN0IHN0YWdlID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmJhdHRsZS1zdGFnZScpO1xyXG4gICAgICAgIGlmICghc3RhZ2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGV4aXN0aW5nIFNWRyBpZiBhbnlcclxuICAgICAgICBjb25zdCBleGlzdGluZ1N2ZyA9IHN0YWdlLnF1ZXJ5U2VsZWN0b3IoJy5zeW5lcmd5LWxpbmstc3ZnJyk7XHJcbiAgICAgICAgaWYgKGV4aXN0aW5nU3ZnKSBleGlzdGluZ1N2Zy5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKTtcclxuICAgICAgICBzdmcuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1saW5rLXN2ZycpO1xyXG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpO1xyXG5cclxuICAgICAgICBjb25zdCBzdGFnZVJlY3QgPSBzdGFnZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCByZWN0MSA9IGVsMS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCByZWN0MiA9IGVsMi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgY29uc3QgeDEgPSByZWN0MS5sZWZ0ICsgcmVjdDEud2lkdGggLyAyIC0gc3RhZ2VSZWN0LmxlZnQ7XHJcbiAgICAgICAgY29uc3QgeTEgPSByZWN0MS50b3AgKyByZWN0MS5oZWlnaHQgLyAyIC0gc3RhZ2VSZWN0LnRvcDtcclxuICAgICAgICBjb25zdCB4MiA9IHJlY3QyLmxlZnQgKyByZWN0Mi53aWR0aCAvIDIgLSBzdGFnZVJlY3QubGVmdDtcclxuICAgICAgICBjb25zdCB5MiA9IHJlY3QyLnRvcCArIHJlY3QyLmhlaWdodCAvIDIgLSBzdGFnZVJlY3QudG9wO1xyXG5cclxuICAgICAgICBjb25zdCBsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdsaW5lJyk7XHJcbiAgICAgICAgbGluZS5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWxpbmstbGluZScpO1xyXG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd4MScsIHgxKTtcclxuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgneTEnLCB5MSk7XHJcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgeDIpO1xyXG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd5MicsIHkyKTtcclxuXHJcbiAgICAgICAgc3ZnLmFwcGVuZENoaWxkKGxpbmUpO1xyXG4gICAgICAgIHN0YWdlLmFwcGVuZENoaWxkKHN2Zyk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBhZnRlciBhbmltYXRpb25cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHN2Zy5yZW1vdmUoKSwgMTgwMCAvIHRoaXMuc3BlZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBTUFJJVEUgU1dBUCA9PT1cclxuXHJcbiAgICBzd2FwU3ByaXRlKGtleSwgc3ByaXRlTmFtZSwgZHVyYXRpb24pIHtcclxuICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICBpZiAoIWVsKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgc2x1ZyA9IHRoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XTtcclxuICAgICAgICBpZiAoIXNsdWcpIHJldHVybjtcclxuICAgICAgICBjb25zdCBpbWcgPSBlbC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLXNwcml0ZScpO1xyXG4gICAgICAgIGlmICghaW1nKSByZXR1cm47XHJcbiAgICAgICAgaW1nLnNyYyA9IGAvYXNzZXQvaW1nL2NvbWJhdC8ke3NsdWd9LyR7c3ByaXRlTmFtZX1gO1xyXG4gICAgICAgIGlmIChkdXJhdGlvbiA+IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucygnZGVhZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IGAvYXNzZXQvaW1nL2NvbWJhdC8ke3RoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XX0vZmlnaHRpZGxlLndlYnBgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBBTklNQVRJT05TIEVYSVNUQU5URVMgPT09XHJcblxyXG4gICAgYW5pbWF0ZUF0dGFjayhhdHRhY2tlck5hbWUsIGF0dGFja2VyVGVhbSwgdGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSwgaXNDcml0KSB7XHJcbiAgICAgICAgY29uc3QgYXR0YWNrZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoYXR0YWNrZXJOYW1lLCBhdHRhY2tlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGF0dGFja2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2F0dGFja2VyVGVhbX0tJHthdHRhY2tlck5hbWV9YDtcclxuICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKGtleSwgJ2F0dGFja2FuaW1hdGlvbi53ZWJwJywgMTIwMCk7XHJcbiAgICAgICAgICAgIGF0dGFja2VyLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2luZycpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KGtleSwgJ2F0dGFjaycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGF0dGFja2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGFja2luZycpLCAxMjAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ3JpdCkgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NyaXQnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnLCAnY3JpdCcpLCA4MDApO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlSGVhbChoZWFsZXJOYW1lLCBoZWFsZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgaGVhbGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGhlYWxlck5hbWUsIGhlYWxlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGhlYWxlcikge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtoZWFsZXJUZWFtfS0ke2hlYWxlck5hbWV9YDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVySGFzSGVhbFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnaGVhbGluZy53ZWJwJywgMTUwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnc2tpbGwud2VicCcsIDE1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhlYWxlci5jbGFzc0xpc3QuYWRkKCdoZWFsaW5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoa2V5LCAnaGVhbCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGhlYWxlci5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsaW5nJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGVhbGVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxlZCcpLCAxNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlZmVuZChkZWZlbmRlck5hbWUsIGRlZmVuZGVyVGVhbSkge1xyXG4gICAgICAgIGNvbnN0IGRlZmVuZGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGRlZmVuZGVyTmFtZSwgZGVmZW5kZXJUZWFtKTtcclxuICAgICAgICBpZiAoZGVmZW5kZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7ZGVmZW5kZXJUZWFtfS0ke2RlZmVuZGVyTmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnZGVmZW5kaW5nLndlYnAnLCAxODAwKTtcclxuICAgICAgICAgICAgZGVmZW5kZXIuY2xhc3NMaXN0LmFkZCgnZGVmZW5kaW5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoa2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBkZWZlbmRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWZlbmRpbmcnKSwgMTgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEb2RnZSh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RvZGdpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZG9kZ2luZycpLCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlYXRoKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qga2V5ID0gYCR7dGFyZ2V0VGVhbX0tJHt0YXJnZXROYW1lfWA7XHJcbiAgICAgICAgY29uc3Qgc2x1ZyA9IHRoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XTtcclxuICAgICAgICBjb25zdCBpbWcgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1zcHJpdGUnKTtcclxuXHJcbiAgICAgICAgLy8gVHJ5IHRvIHN3YXAgdG8gY29ycHNlIGltYWdlXHJcbiAgICAgICAgaWYgKGltZyAmJiBzbHVnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvcnBzZUltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICBjb3Jwc2VJbWcuc3JjID0gYC9hc3NldC9pbWcvY29tYmF0LyR7c2x1Z30vY29ycHNlLnBuZ2A7XHJcbiAgICAgICAgICAgIGNvcnBzZUltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3JjID0gY29ycHNlSW1nLnNyYztcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdkZWFkJywgJ2RlYWQtLWNvcnBzZScpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb3Jwc2VJbWcub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIE5vIGNvcnBzZSBpbWFnZSBhdmFpbGFibGUsIHVzZSBDU1MgZmFsbGJhY2tcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdkZWFkJyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RlYWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hhcmFjdGVyRWxlbWVudChuYW1lLCB0ZWFtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcmFjdGVyRWxlbWVudHNbYCR7dGVhbX0tJHtuYW1lfWBdO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlMb2cobG9nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvZ0NvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBlbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBlbnRyeS5jbGFzc05hbWUgPSAnY29tYmF0LWxvZ19fZW50cnknO1xyXG5cclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdyb3VuZCcpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXJvdW5kJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3ZpY3RvcnknKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS12aWN0b3J5Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2RyYXcnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1kZWZlYXQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYWJpbGl0eV91c2UnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1hYmlsaXR5Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsZWVkX3RpY2snKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1ibGVlZCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdibGlnaHRfdGljaycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWJsaWdodCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdzdHVubmVkX3NraXAnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1zdHVuJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3JpcG9zdGVfYWN0aXZhdGUnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1yaXBvc3RlJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3N5bmVyZ3lfYW5ub3VuY2UnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1zeW5lcmd5LWFubm91bmNlJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3N5bmVyZ3lfdHJpZ2dlcicpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXN5bmVyZ3ktdHJpZ2dlcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZW50cnkuaW5uZXJIVE1MID0gbG9nLm1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIuYXBwZW5kQ2hpbGQoZW50cnkpO1xyXG4gICAgICAgIHRoaXMubG9nQ29udGFpbmVyLnNjcm9sbFRvcCA9IHRoaXMubG9nQ29udGFpbmVyLnNjcm9sbEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVIZWFsdGhCYXJzKGxvZykge1xyXG4gICAgICAgIGxldCBjaGFyYWN0ZXJOYW1lID0gbnVsbDtcclxuICAgICAgICBsZXQgdGVhbU5hbWUgPSBudWxsO1xyXG4gICAgICAgIGxldCBjdXJyZW50SFAgPSBudWxsO1xyXG4gICAgICAgIGxldCBtYXhIUCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIETDqXRlcm1pbmVyIGxlcyBkb25uw6llcyBzZWxvbiBsZSB0eXBlIGRlIGxvZ1xyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2F0dGFjaycgfHwgbG9nLnR5cGUgPT09ICdyaXBvc3RlX2FjdGl2YXRlJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnaGVhbCcpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsZWVkX3RpY2snIHx8IGxvZy50eXBlID09PSAnYmxpZ2h0X3RpY2snKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdhYmlsaXR5X3VzZScpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVBYmlsaXR5SGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3N5bmVyZ3lfdHJpZ2dlcicpIHtcclxuICAgICAgICAgICAgLy8gU3luZXJnaWVzIGNhbiBjYXVzZSBkYW1hZ2VcclxuICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldEhQICE9PSB1bmRlZmluZWQgJiYgbG9nLnRhcmdldE1heEhQKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgc2kgbm91cyBhdm9ucyBsZXMgZG9ubsOpZXMgbsOpY2Vzc2FpcmVzXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlck5hbWUgJiYgdGVhbU5hbWUgJiYgY3VycmVudEhQICE9PSBudWxsICYmIGN1cnJlbnRIUCAhPT0gdW5kZWZpbmVkICYmIG1heEhQKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCwgbWF4SFApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBYmlsaXR5SGVhbHRoQmFycyhsb2cpIHtcclxuICAgICAgICAvLyBBT0UgaGl0cyAoYmxpZ2h0X2F0dGFjayk6IHVwZGF0ZSBIUCBmb3IgYWxsIGhpdCBlbmVtaWVzXHJcbiAgICAgICAgaWYgKGxvZy5hbGxIaXRzKSB7XHJcbiAgICAgICAgICAgIGxvZy5hbGxIaXRzLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGgubmFtZSwgaC50ZWFtLCBoLmhwLCBoLm1heEhwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENvbXDDqXRlbmNlcyBxdWkgaW5mbGlnZW50IGRlcyBkw6lnw6J0cyDDoCB1bmUgY2libGVcclxuICAgICAgICBlbHNlIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRIUCAhPT0gdW5kZWZpbmVkICYmIGxvZy50YXJnZXRNYXhIUCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cudGFyZ2V0SFAsIGxvZy50YXJnZXRNYXhIUCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTb2luIGRlIGdyb3VwZSA6IG1ldHRyZSDDoCBqb3VyIGNoYXF1ZSBhbGxpw6kgc29pZ27DqVxyXG4gICAgICAgIGlmIChsb2cuc3VidHlwZSA9PT0gJ3BhcnR5X2hlYWwnICYmIGxvZy5oZWFsZWQpIHtcclxuICAgICAgICAgICAgbG9nLmhlYWxlZC5mb3JFYWNoKGggPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChoLm5hbWUsIGgudGVhbSwgaC5ocCwgaC5tYXhIcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU29pbiBkJ3VyZ2VuY2UgOiBtZXR0cmUgw6Agam91ciBsZSBsYW5jZXVyXHJcbiAgICAgICAgaWYgKGxvZy5zdWJ0eXBlID09PSAnZW1lcmdlbmN5X2hlYWwnICYmIGxvZy5jYXN0ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldEhQLCBsb2cudGFyZ2V0TWF4SFApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDaGFyYWN0ZXJIUChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCBtYXhIUCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSk7XHJcblxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBtYXhIUCA+IDAgPyAoY3VycmVudEhQIC8gbWF4SFApICogMTAwIDogMDtcclxuXHJcbiAgICAgICAgLy8gTWlzZSDDoCBqb3VyIGRlIGxhIGJhcnJlIEhQIGRhbnMgbGEgem9uZSBkZSBjb21iYXQgKGJhdHRsZS1zdGFnZSlcclxuICAgICAgICBjb25zdCBocEJhciA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuaHAtYmFyX19maWxsJyk7XHJcbiAgICAgICAgY29uc3QgaHBUZXh0ID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcblxyXG4gICAgICAgIGlmIChocEJhcikge1xyXG4gICAgICAgICAgICAvLyBBbmltYXRpb24gZmx1aWRlIGRlIGxhIGJhcnJlXHJcbiAgICAgICAgICAgIGhwQmFyLnN0eWxlLnRyYW5zaXRpb24gPSBgd2lkdGggMC4zcyBlYXNlLW91dGA7XHJcbiAgICAgICAgICAgIGhwQmFyLnN0eWxlLndpZHRoID0gYCR7cGVyY2VudH0lYDtcclxuXHJcbiAgICAgICAgICAgIC8vIENsYXNzZXMgZGUgY291bGV1ciBzZWxvbiBsZSBwb3VyY2VudGFnZVxyXG4gICAgICAgICAgICBocEJhci5jbGFzc0xpc3QucmVtb3ZlKCdocC1iYXJfX2ZpbGwtLWxvdycsICdocC1iYXJfX2ZpbGwtLWNyaXRpY2FsJyk7XHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50IDw9IDI1KSB7XHJcbiAgICAgICAgICAgICAgICBocEJhci5jbGFzc0xpc3QuYWRkKCdocC1iYXJfX2ZpbGwtLWNyaXRpY2FsJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGVyY2VudCA8PSA1MCkge1xyXG4gICAgICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LmFkZCgnaHAtYmFyX19maWxsLS1sb3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhwVGV4dCkge1xyXG4gICAgICAgICAgICBocFRleHQudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50SFB9LyR7bWF4SFB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1pc2Ugw6Agam91ciBkZXMgcGFubmVhdXggZCdpbmZvIGxhdMOpcmF1eFxyXG4gICAgICAgIHRoaXMudXBkYXRlSW5mb1BhbmVsKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUluZm9QYW5lbChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQKSB7XHJcbiAgICAgICAgLy8gVHJvdXZlciBsZSBib24gcGFubmVhdSBzZWxvbiBsJ8OpcXVpcGVcclxuICAgICAgICBjb25zdCBwYW5lbENsYXNzID0gdGVhbU5hbWUgPT09ICdFcXVpcGUgMScgPyAnLmluZm8tcGFuZWwtLXRlYW0xJyA6ICcuaW5mby1wYW5lbC0tdGVhbTInO1xyXG4gICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihwYW5lbENsYXNzKTtcclxuXHJcbiAgICAgICAgaWYgKCFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBUcm91dmVyIGxlIHBlcnNvbm5hZ2UgZGFucyBsZSBwYW5uZWF1IHBhciBzb24gbm9tXHJcbiAgICAgICAgY29uc3QgY2hhcmFjdGVySW5mb3MgPSBwYW5lbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hhcmFjdGVyLWluZm8nKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGluZm8gb2YgY2hhcmFjdGVySW5mb3MpIHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZUVsID0gaW5mby5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX25hbWUnKTtcclxuICAgICAgICAgICAgaWYgKG5hbWVFbCAmJiBuYW1lRWwudGV4dENvbnRlbnQudHJpbSgpID09PSBjaGFyYWN0ZXJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0c1NwYW4gPSBpbmZvLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fc3RhdHMgc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRzU3Bhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzU3Bhbi50ZXh0Q29udGVudCA9IGN1cnJlbnRIUDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGZsYXNoIHBvdXIgbW9udHJlciBsZSBjaGFuZ2VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNTcGFuLmNsYXNzTGlzdC5hZGQoJ2hwLXVwZGF0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHN0YXRzU3Bhbi5jbGFzc0xpc3QucmVtb3ZlKCdocC11cGRhdGVkJyksIDMwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93VmljdG9yeU92ZXJsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUGxheSB2aWN0b3J5IG9yIGRlZmVhdCBtdXNpY1xyXG4gICAgICAgIHRoaXMucGxheUVuZE11c2ljKCk7XHJcblxyXG4gICAgICAgIC8vIEZpbmFsaXNlciBsZSBNTVIgYSBsYSBmaW4gZHUgY29tYmF0XHJcbiAgICAgICAgdGhpcy5maW5hbGl6ZVJhdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlFbmRNdXNpYygpIHtcclxuICAgICAgICAvLyBTdG9wIGNvbWJhdCBtdXNpY1xyXG4gICAgICAgIGlmICh0aGlzLmNvbWJhdE11c2ljKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tYmF0TXVzaWMucGF1c2UoKTtcclxuICAgICAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgb3V0Y29tZSBmcm9tIG92ZXJsYXkgY2xhc3NcclxuICAgICAgICBsZXQgdHJhY2sgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2JhdHRsZS1zdGFnZV9fb3ZlcmxheS0tdmljdG9yeScpKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFjayA9ICcvYXNzZXQvb3N0L3dpbmxvc2UvdmljdG9yeS5tcDMnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2JhdHRsZS1zdGFnZV9fb3ZlcmxheS0tZGVmZWF0JykpIHtcclxuICAgICAgICAgICAgICAgIHRyYWNrID0gJy9hc3NldC9vc3Qvd2lubG9zZS9kZWZlYXQubXAzJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdiYXR0bGUtc3RhZ2VfX292ZXJsYXktLWRyYXcnKSkge1xyXG4gICAgICAgICAgICAgICAgdHJhY2sgPSAnL2Fzc2V0L29zdC93aW5sb3NlL2RlZmVhdC5tcDMnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHJhY2sgJiYgIXRoaXMuaXNNdXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZE11c2ljID0gbmV3IEF1ZGlvKHRyYWNrKTtcclxuICAgICAgICAgICAgdGhpcy5lbmRNdXNpYy52b2x1bWUgPSB0aGlzLnZvbHVtZTtcclxuICAgICAgICAgICAgdGhpcy5lbmRNdXNpYy5wbGF5KCkuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5hbGl6ZVJhdGluZygpIHtcclxuICAgICAgICBjb25zdCBmaW5hbGl6ZVVybCA9IHRoaXMuY29udGFpbmVyLmRhdGFzZXQuZmluYWxpemVVcmw7XHJcbiAgICAgICAgaWYgKCFmaW5hbGl6ZVVybCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBmZXRjaChmaW5hbGl6ZVVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICYmIGRhdGEucmF0aW5nQ2hhbmdlICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSYXRpbmdVcGRhdGUoZGF0YS5yYXRpbmdDaGFuZ2UsIGRhdGEubmV3UmF0aW5nLCBkYXRhLm5ld1JhdGluZzIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBmaW5hbGlzYXRpb24gcmF0aW5nOicsIGVycikpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dSYXRpbmdVcGRhdGUoY2hhbmdlLCBuZXdSYXRpbmcsIG5ld1JhdGluZzIpIHtcclxuICAgICAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIE1NUiBhZmZpY2hlIGRhbnMgbGUgcGFubmVhdSBqb3VldXIgKEVxdWlwZSAxKVxyXG4gICAgICAgIGNvbnN0IHJhdGluZ0VsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0xIC5pbmZvLXBhbmVsX19yYXRpbmcnKTtcclxuICAgICAgICBpZiAocmF0aW5nRWwgJiYgbmV3UmF0aW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7bmV3UmF0aW5nfSBNTVJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIGEgam91ciBsZSBNTVIgYWZmaWNoZSBkYW5zIGxlIHBhbm5lYXUgYWR2ZXJzYWlyZSAoRXF1aXBlIDIpXHJcbiAgICAgICAgY29uc3QgcmF0aW5nRWwyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0yIC5pbmZvLXBhbmVsX19yYXRpbmctLWVuZW15Jyk7XHJcbiAgICAgICAgaWYgKHJhdGluZ0VsMiAmJiBuZXdSYXRpbmcyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsMi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke25ld1JhdGluZzJ9IE1NUmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZmZpY2hlciBsYSBub3RpZmljYXRpb24gZGUgY2hhbmdlbWVudCBkYW5zIGwnb3ZlcmxheVxyXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtb3ZlcmxheV0nKTtcclxuICAgICAgICBpZiAob3ZlcmxheSkge1xyXG4gICAgICAgICAgICBjb25zdCB3aW5uZXJEaXYgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGUtc3RhZ2VfX3dpbm5lcicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hhbmdlbWVudCBNTVIgRXF1aXBlIDFcclxuICAgICAgICAgICAgY29uc3Qgbm90aWYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG5vdGlmMS5jbGFzc05hbWUgPSAncmF0aW5nLWNoYW5nZSc7XHJcbiAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZToxLjJyZW07bWFyZ2luLXRvcDoxMnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMS50ZXh0Q29udGVudCA9IGNoYW5nZSA+IDAgPyBgRXF1aXBlIDEgOiArJHtjaGFuZ2V9IE1NUmAgOiBgRXF1aXBlIDEgOiAke2NoYW5nZX0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYxLnN0eWxlLmNvbG9yID0gY2hhbmdlID4gMCA/ICcjNGNhZjUwJyA6ICcjZjQ0MzM2JztcclxuICAgICAgICAgICAgd2lubmVyRGl2LmFwcGVuZENoaWxkKG5vdGlmMSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGFuZ2VtZW50IE1NUiBFcXVpcGUgMiAoaW52ZXJzZSlcclxuICAgICAgICAgICAgY29uc3QgY2hhbmdlMiA9IC1jaGFuZ2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBub3RpZjIuY2xhc3NOYW1lID0gJ3JhdGluZy1jaGFuZ2UnO1xyXG4gICAgICAgICAgICBub3RpZjIuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MS4ycmVtO21hcmdpbi10b3A6NnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMi50ZXh0Q29udGVudCA9IGNoYW5nZTIgPiAwID8gYEVxdWlwZSAyIDogKyR7Y2hhbmdlMn0gTU1SYCA6IGBFcXVpcGUgMiA6ICR7Y2hhbmdlMn0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYyLnN0eWxlLmNvbG9yID0gY2hhbmdlMiA+IDAgPyAnIzRjYWY1MCcgOiAnI2Y0NDMzNic7XHJcbiAgICAgICAgICAgIHdpbm5lckRpdi5hcHBlbmRDaGlsZChub3RpZjIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3RpZjEuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gQVVESU8gPT09XHJcblxyXG4gICAgcGxheU5leHRUcmFjaygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXVkaW9VbmxvY2tlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb21iYXRNdXNpYykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbWJhdE11c2ljLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tYmF0TXVzaWMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5nZXRSYW5kb21UcmFja0luZGV4KCk7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG5ldyBBdWRpbyh0aGlzLmNvbWJhdFBsYXlsaXN0W2lkeF0pO1xyXG4gICAgICAgIHRoaXMuY29tYmF0TXVzaWMudm9sdW1lID0gdGhpcy5pc011dGVkID8gMCA6IHRoaXMudm9sdW1lO1xyXG4gICAgICAgIHRoaXMuY29tYmF0TXVzaWMuYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB0aGlzLnBsYXlOZXh0VHJhY2soKSk7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYy5wbGF5KCkuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJhbmRvbVRyYWNrSW5kZXgoKSB7XHJcbiAgICAgICAgbGV0IGk7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5jb21iYXRQbGF5bGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIH0gd2hpbGUgKGkgPT09IHRoaXMubGFzdFRyYWNrSW5kZXggJiYgdGhpcy5jb21iYXRQbGF5bGlzdC5sZW5ndGggPiAxKTtcclxuICAgICAgICB0aGlzLmxhc3RUcmFja0luZGV4ID0gaTtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVNdXRlKCkge1xyXG4gICAgICAgIHRoaXMuaXNNdXRlZCA9ICF0aGlzLmlzTXV0ZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tYmF0TXVzaWMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21iYXRNdXNpYy52b2x1bWUgPSB0aGlzLmlzTXV0ZWQgPyAwIDogdGhpcy52b2x1bWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmVuZE11c2ljKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kTXVzaWMudm9sdW1lID0gdGhpcy5pc011dGVkID8gMCA6IHRoaXMudm9sdW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tdXRlQnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSB0aGlzLm11dGVCdG4ucXVlcnlTZWxlY3RvcignaScpO1xyXG4gICAgICAgICAgICBpZiAoaWNvbikge1xyXG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc05hbWUgPSB0aGlzLmlzTXV0ZWQgPyAnZmFzIGZhLXZvbHVtZS1tdXRlJyA6ICdmYXMgZmEtdm9sdW1lLXVwJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy52b2x1bWVTbGlkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy52b2x1bWVTbGlkZXIuZGlzYWJsZWQgPSB0aGlzLmlzTXV0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNmeFNsaWRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNmeFNsaWRlci5kaXNhYmxlZCA9IHRoaXMuaXNNdXRlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IFNGWCA9PT1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByZS1sb2FkIGFuZCBjYWNoZSBhbiBhdWRpbyBmaWxlLCByZXR1cm5zIHRoZSBjYWNoZWQgQXVkaW8gY2xvbmUgZm9yIHBsYXliYWNrLlxyXG4gICAgICovXHJcbiAgICBsb2FkU2Z4KHBhdGgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2Z4Q2FjaGVbcGF0aF0pIHtcclxuICAgICAgICAgICAgdGhpcy5zZnhDYWNoZVtwYXRoXSA9IG5ldyBBdWRpbyhwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Z4Q2FjaGVbcGF0aF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQbGF5IGEgc291bmQgZWZmZWN0IGZvciBhIGNoYXJhY3RlciBhY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2x1ZyAtIGNoYXJhY3RlciBzbHVnIChlLmcuICdjcnVzYWRlcicsICdwbGFndWUtZG9jdG9yJylcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZnhOYW1lIC0gc291bmQgZmlsZSBuYW1lIChlLmcuICdhdHRhY2tzb3VuZCcsICdza2lsbHNvdW5kJywgJ2hlYWwnKVxyXG4gICAgICovXHJcbiAgICBwbGF5U2Z4KHNsdWcsIHNmeE5hbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5pc011dGVkIHx8ICFzbHVnKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHBhdGggPSBgL2Fzc2V0L29zdC92ZngvJHtzbHVnfS8ke3NmeE5hbWV9LndhdmA7XHJcbiAgICAgICAgY29uc3QgY2FjaGVkID0gdGhpcy5sb2FkU2Z4KHBhdGgpO1xyXG5cclxuICAgICAgICAvLyBDbG9uZSB0aGUgYXVkaW8gbm9kZSBzbyBvdmVybGFwcGluZyBwbGF5cyBkb24ndCBjdXQgZWFjaCBvdGhlciBvZmZcclxuICAgICAgICBjb25zdCBzb3VuZCA9IGNhY2hlZC5jbG9uZU5vZGUoKTtcclxuICAgICAgICBzb3VuZC52b2x1bWUgPSB0aGlzLnNmeFZvbHVtZTtcclxuICAgICAgICBzb3VuZC5wbGF5KCkuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGxheSB0aGUgYXBwcm9wcmlhdGUgU0ZYIGZvciBhIGNoYXJhY3RlciBnaXZlbiB0aGVpciBrZXkgYW5kIGFjdGlvbiB0eXBlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGNoYXJhY3RlciBrZXkgKGUuZy4gJ0VxdWlwZSAxLUNydXNhZGVyJylcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24gLSAnYXR0YWNrJywgJ3NraWxsJywgb3IgJ2hlYWwnXHJcbiAgICAgKi9cclxuICAgIHBsYXlDaGFyU2Z4KGtleSwgYWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3Qgc2x1ZyA9IHRoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XTtcclxuICAgICAgICBpZiAoIXNsdWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVNmeChzbHVnLCAnYXR0YWNrc291bmQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzpcclxuICAgICAgICAgICAgICAgIC8vIFRyeSBoZWFsLndhdiBmaXJzdCwgZmFsbGJhY2sgdG8gc2tpbGxzb3VuZC53YXZcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXJhY3Rlckhhc0hlYWxba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVNmeChzbHVnLCAnaGVhbCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTZngoc2x1ZywgJ3NraWxsc291bmQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdza2lsbCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTZngoc2x1ZywgJ3NraWxsc291bmQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQbGF5QnV0dG9uKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wbGF5QnRuKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZyAmJiAhdGhpcy5pc1BhdXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSAnUGF1c2UnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSAnVGVybWluw6knO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9IHRoaXMuY3VycmVudEluZGV4ID4gMCA/ICdSZXByZW5kcmUnIDogJ0xhbmNlcic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBJbml0aWFsaXNlciBxdWFuZCBsZSBET00gZXN0IHByw6p0XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBjb21iYXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtbG9nc10nKTtcclxuICAgIGlmIChjb21iYXRDb250YWluZXIpIHtcclxuICAgICAgICBuZXcgQ29tYmF0Q29udHJvbGxlcihjb21iYXRDb250YWluZXIpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbWJhdENvbnRyb2xsZXI7XHJcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIEZSSUVORCBTWVNURU1cclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi50ZXh0Q29udGVudCA9IHN0cjtcclxuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy10b2dnbGVdJyk7XHJcbiAgICBjb25zdCBwYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtcGFuZWxdJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtYmFja2Ryb3BdJyk7XHJcbiAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtY2xvc2VdJyk7XHJcbiAgICBjb25zdCBiYWRnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtYmFkZ2VdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBhbmVsKSByZXR1cm47XHJcblxyXG4gICAgbGV0IHBhbmVsT3BlbiA9IGZhbHNlO1xyXG4gICAgbGV0IGN1cnJlbnRUYWIgPSAnZnJpZW5kcyc7XHJcbiAgICBsZXQgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IG51bGw7XHJcbiAgICBsZXQgbGFzdE1lc3NhZ2VJZCA9IDA7XHJcbiAgICBsZXQgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICBsZXQgdW5yZWFkUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgIGxldCBmcmllbmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICBsZXQgcmVxdWVzdHNMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFBBTkVMIE9QRU4vQ0xPU0VcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gb3BlblBhbmVsKCkge1xyXG4gICAgICAgIHBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgcGFuZWwub2Zmc2V0SGVpZ2h0OyAvLyByZWZsb3dcclxuICAgICAgICBwYW5lbC5jbGFzc0xpc3QuYWRkKCdmcmllbmRzLXBhbmVsLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnZnJpZW5kcy1wYW5lbF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBwYW5lbE9wZW4gPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIWZyaWVuZHNMb2FkZWQpIHtcclxuICAgICAgICAgICAgbG9hZEZyaWVuZHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQYW5lbCgpIHtcclxuICAgICAgICBwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdmcmllbmRzLXBhbmVsLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnZnJpZW5kcy1wYW5lbF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBwYW5lbE9wZW4gPSBmYWxzZTtcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHBhbmVsT3BlbiA/IGNsb3NlUGFuZWwoKSA6IG9wZW5QYW5lbCgpKTtcclxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQYW5lbCk7XHJcbiAgICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUGFuZWwpO1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gVEFCU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mcmllbmRzLXRhYl0nKS5mb3JFYWNoKHRhYkJ0biA9PiB7XHJcbiAgICAgICAgdGFiQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YWJOYW1lID0gdGFiQnRuLmRhdGFzZXQuZnJpZW5kc1RhYjtcclxuICAgICAgICAgICAgc3dpdGNoVGFiKHRhYk5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc3dpdGNoVGFiKHRhYk5hbWUpIHtcclxuICAgICAgICBjdXJyZW50VGFiID0gdGFiTmFtZTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZnJpZW5kcy10YWJdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgnZnJpZW5kcy1wYW5lbF9fdGFiLS1hY3RpdmUnLCBidG4uZGF0YXNldC5mcmllbmRzVGFiID09PSB0YWJOYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiLWNvbnRlbnRdJykuZm9yRWFjaChjb250ZW50ID0+IHtcclxuICAgICAgICAgICAgY29udGVudC5zdHlsZS5kaXNwbGF5ID0gY29udGVudC5kYXRhc2V0LnRhYkNvbnRlbnQgPT09IHRhYk5hbWUgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fdGFicycpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX2NvbnRlbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNvbnZlcnNhdGlvbl0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG5cclxuICAgICAgICBpZiAodGFiTmFtZSA9PT0gJ2ZyaWVuZHMnICYmICFmcmllbmRzTG9hZGVkKSBsb2FkRnJpZW5kcygpO1xyXG4gICAgICAgIGlmICh0YWJOYW1lID09PSAncmVxdWVzdHMnICYmICFyZXF1ZXN0c0xvYWRlZCkgbG9hZFJlcXVlc3RzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBMT0FEIEZSSUVORFMgTElTVFxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBsb2FkRnJpZW5kcygpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YWItY29udGVudD1cImZyaWVuZHNcIl0nKTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19sb2FkaW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBDaGFyZ2VtZW50Li4uPC9kaXY+JztcclxuXHJcbiAgICAgICAgZmV0Y2goJy9mcmllbmRzL2xpc3QnLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBmcmllbmRzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuZnJpZW5kcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPjxpIGNsYXNzPVwiZmFzIGZhLWdob3N0XCI+PC9pPiBBdWN1biBjb21wYWdub24uLi4gTGUgZG9uam9uIGVzdCBzb2xpdGFpcmUuPC9wPic7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhLmZyaWVuZHMubWFwKGYgPT4gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCIgZGF0YS1mcmllbmQtdXNlci1pZD1cIiR7Zi51c2VySWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtmLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwoZi5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbChmLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoZi51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19wcmV2aWV3XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2YubGFzdE1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChmLmxhc3RNZXNzYWdlLmlzRnJvbU1lID8gJ1ZvdXM6ICcgOiAnJykgKyBlc2NhcGVIdG1sKGYubGFzdE1lc3NhZ2UuY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdBdWN1biBtZXNzYWdlJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3JhdGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHtmLnJhdGluZ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmZyaWVuZC1pdGVtJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlcklkID0gcGFyc2VJbnQoaXRlbS5kYXRhc2V0LmZyaWVuZFVzZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmZyaWVuZC1pdGVtX19uYW1lJykudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbkNvbnZlcnNhdGlvbih1c2VySWQsIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RXJyZXVyIGRlIGNoYXJnZW1lbnQ8L3A+JztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIExPQUQgUEVORElORyBSRVFVRVNUU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBsb2FkUmVxdWVzdHMoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGFiLWNvbnRlbnQ9XCJyZXF1ZXN0c1wiXScpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+IENoYXJnZW1lbnQuLi48L2Rpdj4nO1xyXG5cclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvcGVuZGluZycsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVxdWVzdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5BdWN1bmUgZGVtYW5kZSBlbiBhdHRlbnRlPC9wPic7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhLnJlcXVlc3RzLm1hcChyID0+IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiIGRhdGEtcmVxdWVzdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtyLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwoci5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbChyLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoci51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19wcmV2aWV3XCI+JHtlc2NhcGVIdG1sKHIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1hY2NlcHRcIiBkYXRhLWFjY2VwdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1jaGVja1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXJlamVjdFwiIGRhdGEtcmVqZWN0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hY2NlcHQtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlcXVlc3QoYnRuLmRhdGFzZXQuYWNjZXB0SWQsICdhY2NlcHQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZWplY3QtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlcXVlc3QoYnRuLmRhdGFzZXQucmVqZWN0SWQsICdyZWplY3QnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChmcmllbmRzaGlwSWQsIGFjdGlvbikge1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy8ke2FjdGlvbn0vJHtmcmllbmRzaGlwSWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsb2FkUmVxdWVzdHMoKTtcclxuICAgICAgICAgICAgICAgIGZldGNoVW5yZWFkQ291bnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gU0VBUkNIIFVTRVJTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1zZWFyY2gtaW5wdXRdJyk7XHJcbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1zZWFyY2gtcmVzdWx0c10nKTtcclxuICAgIGxldCBzZWFyY2hUaW1lb3V0ID0gbnVsbDtcclxuXHJcbiAgICBpZiAoc2VhcmNoSW5wdXQpIHtcclxuICAgICAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNlYXJjaFRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChxdWVyeS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmZXRjaChgL2ZyaWVuZHMvc2VhcmNoP3E9JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnkpfWAsIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS51c2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkF1Y3VuIGd1ZXJyaWVyIHRyb3V2ZTwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9IGRhdGEudXNlcnMubWFwKHUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aW9uSHRtbCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdhY2NlcHRlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5BbWk8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ3BlbmRpbmdfc2VudCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5FbnZveWVlPC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdwZW5kaW5nX3JlY2VpdmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPlJlY3VlPC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gYDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLWFkZFwiIGRhdGEtYWRkLWZyaWVuZC1pZD1cIiR7dS51c2VySWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGx1c1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3UucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbCh1LnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKHUudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbCh1LnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3JhdGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHt1LnJhdGluZ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hY3Rpb25zXCI+JHthY3Rpb25IdG1sfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWRkLWZyaWVuZC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZEZyaWVuZFJlcXVlc3QoYnRuLmRhdGFzZXQuYWRkRnJpZW5kSWQsIGJ0bik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VuZEZyaWVuZFJlcXVlc3QodXNlcklkLCBidG4pIHtcclxuICAgICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9yZXF1ZXN0LyR7dXNlcklkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBidG4ub3V0ZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+RW52b3llZTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IGJ0bi5kaXNhYmxlZCA9IGZhbHNlOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXBvcnRNZXNzYWdlQWN0aW9uKG1lc3NhZ2VJZCwgYnRuKSB7XHJcbiAgICAgICAgY29uc3QgcmVhc29uID0gcHJvbXB0KCdSYWlzb24gZHUgc2lnbmFsZW1lbnQgOicpO1xyXG4gICAgICAgIGlmIChyZWFzb24gPT09IG51bGwpIHJldHVybjsgLy8gY2FuY2VsbGVkXHJcblxyXG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7bWVzc2FnZUlkfS9yZXBvcnRgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcmVhc29uOiByZWFzb24gfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBidG4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrXCI+PC9pPic7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnY2hhdC1tZXNzYWdlX19yZXBvcnQtLWRvbmUnKTtcclxuICAgICAgICAgICAgICAgIGJ0bi50aXRsZSA9ICdTaWduYWxlJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4geyBidG4uZGlzYWJsZWQgPSBmYWxzZTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBDT05WRVJTQVRJT05cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gb3BlbkNvbnZlcnNhdGlvbih1c2VySWQsIHVzZXJuYW1lKSB7XHJcbiAgICAgICAgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgICBsYXN0TWVzc2FnZUlkID0gMDtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX3RhYnMnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19jb250ZW50Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBjb25zdCBjb252RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNvbnZlcnNhdGlvbl0nKTtcclxuICAgICAgICBjb252RWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW5hbWVdJykudGV4dENvbnRlbnQgPSB1c2VybmFtZTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW1lc3NhZ2VzXScpO1xyXG4gICAgICAgIG1lc3NhZ2VzRWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19sb2FkaW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBDaGFyZ2VtZW50Li4uPC9kaXY+JztcclxuXHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7dXNlcklkfWAsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKGRhdGEubWVzc2FnZXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgc3RhcnRNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlck1lc3NhZ2VzKG1lc3NhZ2VzLCBhcHBlbmQpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW1lc3NhZ2VzXScpO1xyXG5cclxuICAgICAgICBpZiAoIWFwcGVuZCkge1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RGVidXQgZGUgbGEgY29udmVyc2F0aW9uLiBFbnZveWV6IGxlIHByZW1pZXIgbWVzc2FnZSE8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzRWwuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNpIG9uIGFqb3V0ZSBkZXMgbWVzc2FnZXMgZXQgcXVlIGxlIGNvbnRlbmV1ciBhZmZpY2hlIGxlIHBsYWNlaG9sZGVyLCBsZSBzdXBwcmltZXJcclxuICAgICAgICBpZiAoYXBwZW5kICYmIG1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBtZXNzYWdlc0VsLnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19lbXB0eScpO1xyXG4gICAgICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHBsYWNlaG9sZGVyLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtc2cgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLmlkID4gbGFzdE1lc3NhZ2VJZCkgbGFzdE1lc3NhZ2VJZCA9IG1zZy5pZDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2hhdC1tZXNzYWdlJywgbXNnLmlzRnJvbU1lID8gJ2NoYXQtbWVzc2FnZS0tbWluZScgOiAnY2hhdC1tZXNzYWdlLS10aGVpcnMnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXBvcnRCdG4gPSAnJztcclxuICAgICAgICAgICAgaWYgKCFtc2cuaXNGcm9tTWUpIHtcclxuICAgICAgICAgICAgICAgIHJlcG9ydEJ0biA9IGA8YnV0dG9uIGNsYXNzPVwiY2hhdC1tZXNzYWdlX19yZXBvcnRcIiBkYXRhLXJlcG9ydC1tc2ctaWQ9XCIke21zZy5pZH1cIiB0aXRsZT1cIlNpZ25hbGVyIGNlIG1lc3NhZ2VcIj48aSBjbGFzcz1cImZhcyBmYS1mbGFnXCI+PC9pPjwvYnV0dG9uPmA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICAke2VzY2FwZUh0bWwobXNnLmNvbnRlbnQpfVxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGF0LW1lc3NhZ2VfX3RpbWVcIj4ke2VzY2FwZUh0bWwobXNnLmRhdGUpfSAke3JlcG9ydEJ0bn08L3NwYW4+XHJcbiAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgICAgICAvLyBBdHRhY2ggcmVwb3J0IGhhbmRsZXJcclxuICAgICAgICAgICAgY29uc3QgcmVwb3J0RWwgPSBkaXYucXVlcnlTZWxlY3RvcignW2RhdGEtcmVwb3J0LW1zZy1pZF0nKTtcclxuICAgICAgICAgICAgaWYgKHJlcG9ydEVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnRFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRNZXNzYWdlQWN0aW9uKHJlcG9ydEVsLmRhdGFzZXQucmVwb3J0TXNnSWQsIHJlcG9ydEVsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZXNzYWdlc0VsLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1lc3NhZ2VzRWwuc2Nyb2xsVG9wID0gbWVzc2FnZXNFbC5zY3JvbGxIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2VuZCBtZXNzYWdlXHJcbiAgICBjb25zdCBzZW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLXNlbmRdJyk7XHJcbiAgICBjb25zdCBpbnB1dEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLWlucHV0XScpO1xyXG5cclxuICAgIGlmIChzZW5kQnRuICYmIGlucHV0RWwpIHtcclxuICAgICAgICBzZW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VuZE1lc3NhZ2UpO1xyXG4gICAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgc2VuZE1lc3NhZ2UoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kTWVzc2FnZSgpIHtcclxuICAgICAgICBjb25zdCBjb250ZW50ID0gaW5wdXRFbC52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgaWYgKCFjb250ZW50IHx8ICFjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlucHV0RWwudmFsdWUgPSAnJztcclxuXHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7Y3VycmVudENvbnZlcnNhdGlvblVzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY29udGVudDogY29udGVudCB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgJiYgZGF0YS5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhbZGF0YS5tZXNzYWdlXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBCYWNrIGJ1dHRvblxyXG4gICAgY29uc3QgYmFja0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1iYWNrXScpO1xyXG4gICAgaWYgKGJhY2tCdG4pIHtcclxuICAgICAgICBiYWNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkID0gbnVsbDtcclxuICAgICAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3dpdGNoVGFiKCdmcmllbmRzJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBNRVNTQUdFIFBPTExJTkcgKGV2ZXJ5IDVzIHdoZW4gY29udmVyc2F0aW9uIG9wZW4pXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIHN0YXJ0TWVzc2FnZVBvbGxpbmcoKSB7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHtjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkfT9hZnRlcklkPSR7bGFzdE1lc3NhZ2VJZH1gLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lc3NhZ2VzICYmIGRhdGEubWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKGRhdGEubWVzc2FnZXMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1MDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdG9wTWVzc2FnZVBvbGxpbmcoKSB7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChtZXNzYWdlUG9sbGluZ0ludGVydmFsKTtcclxuICAgICAgICAgICAgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gVU5SRUFEIENPVU5UIFBPTExJTkcgKGV2ZXJ5IDMwcywgYWx3YXlzIGFjdGl2ZSlcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gZmV0Y2hVbnJlYWRDb3VudCgpIHtcclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvdW5yZWFkLWNvdW50Jywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEudG90YWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS50ZXh0Q29udGVudCA9IGRhdGEudG90YWw7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0c0JhZGdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcmVxdWVzdHMtYmFkZ2VdJyk7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0c0JhZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wZW5kaW5nUmVxdWVzdHMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS50ZXh0Q29udGVudCA9IGRhdGEucGVuZGluZ1JlcXVlc3RzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmV0Y2hVbnJlYWRDb3VudCgpO1xyXG4gICAgdW5yZWFkUG9sbGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZmV0Y2hVbnJlYWRDb3VudCwgMzAwMDApO1xyXG59KTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbImVzY2FwZUh0bWwiLCJzdHIiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwiaW5uZXJIVE1MIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJ1cmdlciIsInF1ZXJ5U2VsZWN0b3IiLCJuYXYiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJTVEFUX01BWCIsImRtZyIsInNwZWVkIiwiZG9kZ2UiLCJjcml0IiwiaHAiLCJwb3J0cmFpdHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGV0YWlscyIsImdldEVsZW1lbnRCeUlkIiwic2VsZWN0ZWRMaXN0IiwibGF1bmNoQnRuIiwibGVuZ3RoIiwibWF4U2VsZWN0aW9uIiwic2VsZWN0ZWRIZXJvZXMiLCJzZWxlY3RlZEhlcm9JZHMiLCJnZXRDYXRlZ29yeSIsInBvcnRyYWl0IiwiZGF0YXNldCIsImNhdGVnb3J5IiwiZ2V0U2VsZWN0ZWRSb2xlcyIsInJvbGVzIiwiVGFuayIsIkRQUyIsIkhlYWxlciIsIlN1cHBvcnQiLCJmb3JFYWNoIiwiaWQiLCJwIiwiQXJyYXkiLCJmcm9tIiwiZmluZCIsInBwIiwiY2F0IiwiY2FuU2VsZWN0Um9sZSIsInBvcnRyYWl0RWwiLCJpc0xlZ2VuZFNlbGVjdGVkIiwicmVtb3ZlIiwiYWRkIiwibmFtZSIsInJvbGUiLCJkbWdNaW4iLCJOdW1iZXIiLCJkbWdNYXgiLCJzcHJpdGVGaWxlIiwic3ByaXRlIiwiYWJpbGl0eU5hbWUiLCJhYmlsaXR5RGVzYyIsImFiaWxpdHlDZCIsInNwcml0ZVBhdGgiLCJjb25jYXQiLCJpc1NlbGVjdGVkIiwiaW5jbHVkZXMiLCJhYmlsaXR5SHRtbCIsImNoYXJTeW5lcmdpZXMiLCJzeW5lcmd5TWFwIiwic3luZXJneUh0bWwiLCJtYXAiLCJzIiwicGFydG5lciIsImRlc2MiLCJqb2luIiwiTWF0aCIsIm1pbiIsImJ0blJpZ2h0Iiwicm9sZUNhdCIsImFscmVhZHlTZWxlY3RlZCIsImRpc2FibGVkIiwidGV4dENvbnRlbnQiLCJ1cGRhdGVTZWxlY3RlZFRlYW0iLCJhbGVydCIsImZpbHRlciIsImhpZCIsImgiLCJwdXNoIiwidGVhbXNQYWdlRWwiLCJKU09OIiwicGFyc2UiLCJsZWdlbmRBY3RpdmUiLCJoZXJvIiwiaGVyb0VsIiwidXBkYXRlUm9sZUluZGljYXRvcnMiLCJ1cGRhdGVTeW5lcmd5SGlnaGxpZ2h0cyIsInRlYW1Db21wbGV0ZSIsImJhZGdlIiwic2VsZWN0ZWROYW1lcyIsIkJvb2xlYW4iLCJhY3RpdmVTeW5lcmdpZXMiLCJzZWVuUGFpcnMiLCJTZXQiLCJzeW5lcmdpZXMiLCJzeW4iLCJwYWlyS2V5Iiwic29ydCIsImhhcyIsIm5hbWUxIiwibmFtZTIiLCJzeW5lcmd5TmFtZSIsInBOYW1lIiwibWF0Y2hpbmciLCJjbGFzc05hbWUiLCJ0aXRsZSIsInVwZGF0ZVN5bmVyZ3lEaXNwbGF5IiwiY29udGFpbmVyIiwiYWN0aW9ucyIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJpbmRpY2F0b3IiLCJzbG90Iiwic2F2ZVByZXNldEJ0biIsInByZXNldE1vZGFsIiwicHJlc2V0TmFtZUlucHV0IiwicHJlc2V0Q29uZmlybUJ0biIsInByZXNldENhbmNlbEJ0biIsInVwZGF0ZVNhdmVQcmVzZXRCdG4iLCJvcmlnaW5hbFVwZGF0ZVNlbGVjdGVkVGVhbSIsIl9vcmlnVXBkYXRlIiwiX29yaWdSb2xlSW5kaWNhdG9ycyIsInZhbHVlIiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsImZvY3VzIiwidHJpbSIsImJvcmRlckNvbG9yIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsInN0cmluZ2lmeSIsImNoYXJhY3RlcklkcyIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsInN1Y2Nlc3MiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImVycm9yIiwiZSIsImtleSIsImNsaWNrIiwibG9hZFByZXNldCIsImlkU3RyIiwiU3RyaW5nIiwiZGVsZXRlUHJlc2V0IiwicHJlc2V0SWQiLCJjaGlwRWwiLCJjb25maXJtIiwibGlzdCIsImNoaWxkcmVuIiwiX2RvY3VtZW50JHF1ZXJ5U2VsZWN0IiwiY2hpcCIsImNoYXJJZHMiLCJwcmVzZXRJZHMiLCJzdG9wUHJvcGFnYXRpb24iLCJzZWxlY3RlZExpc3RPYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiY2hpbGRMaXN0IiwiaSIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlc3BvbnNlIiwicmVkaXJlY3RlZCIsImhyZWYiLCJ1cmwiLCJwb3B1cCIsImJhY2tkcm9wIiwiY2xvc2VCdG4iLCJjb250ZW50IiwibG9hZGVkIiwib3BlblBvcHVwIiwib2Zmc2V0SGVpZ2h0IiwiZmV0Y2hQcm9maWxlIiwiY2xvc2VQb3B1cCIsInJlbmRlclByb2ZpbGUiLCJyZXN1bHRDbGFzcyIsInIiLCJyZXN1bHRMYWJlbCIsImF2YXRhckh0bWwiLCJwcm9maWxlSW1hZ2UiLCJ1c2VybmFtZSIsImh0bWwiLCJtb3R0byIsImJpbyIsInJhdGluZyIsInN0YXRzIiwid2lucyIsImxvc3NlcyIsIndpblJhdGUiLCJmYXZvcml0ZUNoYXJhY3RlciIsImdhbWVzUGxheWVkIiwibGFzdFRlYW0iLCJjIiwicmVjZW50QmF0dGxlcyIsImIiLCJwYXJzZUludCIsInJlc3VsdCIsIm9wcG9uZW50IiwibWF0Y2hUeXBlIiwidG9VcHBlckNhc2UiLCJkYXRlIiwiQ29tYmF0Q29udHJvbGxlciIsIl9jbGFzc0NhbGxDaGVjayIsImxvZ3MiLCJjdXJyZW50SW5kZXgiLCJpc1BsYXlpbmciLCJpc1BhdXNlZCIsImNoYXJhY3RlckVsZW1lbnRzIiwiY2hhcmFjdGVyTWF4SFAiLCJpbml0IiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJsb2dzRGF0YSIsImNvbWJhdExvZ3MiLCJjb25zb2xlIiwibG9nQ29udGFpbmVyIiwib3ZlcmxheSIsInBsYXlCdG4iLCJza2lwQnRuIiwic3BlZWRCdG5zIiwiY2hhcmFjdGVyU2x1Z3MiLCJjaGFyYWN0ZXJIYXNIZWFsIiwiYWJpbGl0eUNvb2xkb3ducyIsImNoYXJhY3RlclN0YXR1c2VzIiwiZWwiLCJjaGFyYWN0ZXJOYW1lIiwidGVhbSIsImNoYXJhY3RlclRlYW0iLCJjaGFyYWN0ZXJTbHVnIiwiaGFzSGVhbCIsImhwVGV4dCIsIm1hdGNoIiwiY3JlYXRlRW1wdHlTdGF0dXNlcyIsImFiaWxpdHlFbGVtZW50cyIsImNoYXJOYW1lIiwiY2hhclRlYW0iLCJhYmlsaXR5RWwiLCJtYXhDZCIsImFiaWxpdHlNYXhDZCIsIm5hbWVFbCIsImljb25FbCIsIm9wYWNpdHkiLCJhdWRpb1VubG9ja2VkIiwiY29tYmF0TXVzaWMiLCJsYXN0VHJhY2tJbmRleCIsImlzTXV0ZWQiLCJ2b2x1bWUiLCJzZnhWb2x1bWUiLCJjb21iYXRQbGF5bGlzdCIsImhhc0dva3UiLCJzb21lIiwiZW5kTXVzaWMiLCJzZnhDYWNoZSIsIm11dGVCdG4iLCJ2b2x1bWVTbGlkZXIiLCJzZnhTbGlkZXIiLCJiaW5kRXZlbnRzIiwicGxheSIsImJsZWVkaW5nIiwiYmxpZ2h0ZWQiLCJzdHVubmVkIiwibWFya2VkIiwic3RlYWx0aGVkIiwicmlwb3N0ZSIsImRtZ1VwIiwic3BkVXAiLCJkb2RnZVVwIiwiY3JpdFVwIiwidXBkYXRlQ2hhcmFjdGVyU3RhdHVzZXMiLCJsb2ciLCJ0eXBlIiwidGlja1JvdW5kU3RhdHVzZXMiLCJoYW5kbGVBYmlsaXR5U3RhdHVzQ2hhbmdlIiwic2V0U3RhdHVzIiwidGFyZ2V0IiwidGFyZ2V0VGVhbSIsImR1cmF0aW9uIiwidHVybnNSZW1haW5pbmciLCJ1bmRlZmluZWQiLCJhdHRhY2tlciIsImF0dGFja2VyVGVhbSIsImhhbmRsZVN5bmVyZ3lTdGF0dXNDaGFuZ2UiLCJjbGVhckFsbFN0YXR1c2VzIiwicmVuZGVyQWxsU3RhdHVzSWNvbnMiLCJzdWJ0eXBlIiwiYmxlZWRUdXJucyIsImFsbEhpdHMiLCJwcmltYXJ5IiwiaXNQcmltYXJ5IiwiYmxpZ2h0VHVybnMiLCJtYXJrVHVybnMiLCJjYXN0ZXIiLCJjYXN0ZXJUZWFtIiwicmlwb3N0ZVR1cm5zIiwiYXBwbHlCdWZmU3RhdHVzZXMiLCJidWZmcyIsImJ1ZmZEdXJhdGlvbiIsImFwcGx5VGVhbUJ1ZmZTdGF0dXNlcyIsInN0ZWFsdGhUdXJucyIsInByb3RlY3RUdXJucyIsInNlbGZCbGVlZFR1cm5zIiwidEtleSIsIl90aGlzMiIsImVmZmVjdFR5cGUiLCJwYXJ0bmVyQ2hhciIsInBhcnRuZXJDaGFyVGVhbSIsImdyYW50ZWRUdXJucyIsImJ1ZmZUeXBlcyIsInN0YXR1c0tleSIsImJ1ZmZUeXBlVG9TdGF0dXNLZXkiLCJkb2RnZUR1cmF0aW9uIiwiZXh0cmFUdXJucyIsInRlYW1OYW1lIiwiZGFtYWdlIiwibWF4IiwiX2kiLCJfT2JqZWN0JGtleXMiLCJPYmplY3QiLCJrZXlzIiwic3RhcnRzV2l0aCIsIl9pMiIsIl9PYmplY3Qka2V5czIiLCJfaTMiLCJfT2JqZWN0JGtleXMzIiwicmVuZGVyU3RhdHVzSWNvbnMiLCJpY29ucyIsImljb24iLCJjbHMiLCJfdGhpczMiLCJ0b2dnbGVQbGF5Iiwic2tpcCIsImJ0biIsInNldFNwZWVkIiwidG9nZ2xlTXV0ZSIsInBhcnNlRmxvYXQiLCJwbGF5TmV4dFRyYWNrIiwib25jZSIsInVwZGF0ZVBsYXlCdXR0b24iLCJwcm9jZXNzTmV4dExvZyIsInBhdXNlIiwiZGlzcGxheUxvZyIsInVwZGF0ZUhlYWx0aEJhcnMiLCJ0cmFja0FiaWxpdHlDb29sZG93bnMiLCJhbmltYXRlRGVhdGgiLCJ0YXJnZXRIUCIsInNob3dWaWN0b3J5T3ZlcmxheSIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsImNvbWJhdFNwZWVkIiwiX3RoaXM0IiwicHJvY2Vzc0xvZyIsImRlbGF5IiwiZ2V0RGVsYXlGb3JMb2ciLCJnZXRBYmlsaXR5RGVsYXkiLCJnZXRTeW5lcmd5VHJpZ2dlckRlbGF5IiwiaXNUcmFuc2Zvcm1hdGlvbiIsIl90aGlzNSIsInBsYXlBbmltYXRpb24iLCJocERlbGF5IiwiZ2V0SFBVcGRhdGVEZWxheSIsImFiaWxpdHlEYXRhIiwidXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheSIsImNkIiwiZ2V0QWJpbGl0eUhQRGVsYXkiLCJhbmltYXRlQXR0YWNrIiwiaXNDcml0IiwiYW5pbWF0ZUhlYWwiLCJoZWFsZXIiLCJoZWFsZXJUZWFtIiwiYW5pbWF0ZURlZmVuZCIsImRlZmVuZGVyIiwiZGVmZW5kZXJUZWFtIiwiYW5pbWF0ZURvZGdlIiwiYW5pbWF0ZURvVCIsImFuaW1hdGVTdHVubmVkIiwicGxheUFiaWxpdHlBbmltYXRpb24iLCJhbmltYXRlU3luZXJneUFubm91bmNlIiwiYW5pbWF0ZVN5bmVyZ3lUcmlnZ2VyIiwidGFyZ2V0TmFtZSIsImRvdENsYXNzIiwiZ2V0Q2hhcmFjdGVyRWxlbWVudCIsImFuaW1hdGVNYXJrZWQiLCJhbmltYXRlQnVmZiIsImFuaW1hdGVTdGVhbHRoIiwiX3RoaXM2IiwiYmxpZ2h0S2V5Iiwic3dhcFNwcml0ZSIsInBsYXlDaGFyU2Z4IiwiY2FzdGVyRWwiLCJtYXJrS2V5Iiwicmlwb3N0ZUtleSIsInNlbGZCdWZmS2V5IiwicGFydHlIZWFsS2V5IiwiaGVhbGVkIiwicGFydHlCdWZmS2V5IiwiYW5pbWF0ZVRlYW1CdWZmIiwic3RlYWx0aEtleSIsImVtZXJnSGVhbEtleSIsInByb3REb2RnZUtleSIsInVpS2V5IiwidWlDYXN0ZXJFbCIsImhpdERlbGF5IiwidWlUYXJnZXRFbCIsIl90aGlzNyIsInRyaWdnZXIiLCJ0cmlnZ2VyQ2hhciIsImRyYXdTeW5lcmd5TGluayIsIl90aGlzOCIsInRyaWdnZXJDaGFyVGVhbSIsInBhcnRuZXJLZXkiLCJlbDEiLCJlbDIiLCJzdGFnZSIsImV4aXN0aW5nU3ZnIiwic3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwic2V0QXR0cmlidXRlIiwic3RhZ2VSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicmVjdDEiLCJyZWN0MiIsIngxIiwibGVmdCIsIndpZHRoIiwieTEiLCJ0b3AiLCJoZWlnaHQiLCJ4MiIsInkyIiwibGluZSIsInNwcml0ZU5hbWUiLCJfdGhpczkiLCJzbHVnIiwiaW1nIiwic3JjIiwiY29udGFpbnMiLCJhdHRhY2tlck5hbWUiLCJoZWFsZXJOYW1lIiwiZGVmZW5kZXJOYW1lIiwiY29ycHNlSW1nIiwiSW1hZ2UiLCJvbmxvYWQiLCJvbmVycm9yIiwiZW50cnkiLCJtZXNzYWdlIiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwiY3VycmVudEhQIiwibWF4SFAiLCJ0YXJnZXRNYXhIUCIsInVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzIiwidXBkYXRlQ2hhcmFjdGVySFAiLCJfdGhpczAiLCJtYXhIcCIsInBlcmNlbnQiLCJocEJhciIsInRyYW5zaXRpb24iLCJ1cGRhdGVJbmZvUGFuZWwiLCJwYW5lbENsYXNzIiwicGFuZWwiLCJjaGFyYWN0ZXJJbmZvcyIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJfbG9vcCIsImluZm8iLCJzdGF0c1NwYW4iLCJuIiwiZG9uZSIsImVyciIsImYiLCJfdGhpczEiLCJwbGF5RW5kTXVzaWMiLCJmaW5hbGl6ZVJhdGluZyIsInRyYWNrIiwiQXVkaW8iLCJfdGhpczEwIiwiZmluYWxpemVVcmwiLCJyYXRpbmdDaGFuZ2UiLCJzaG93UmF0aW5nVXBkYXRlIiwibmV3UmF0aW5nIiwibmV3UmF0aW5nMiIsImNoYW5nZSIsInJhdGluZ0VsIiwicmF0aW5nRWwyIiwid2lubmVyRGl2Iiwibm90aWYxIiwiY3NzVGV4dCIsImNvbG9yIiwiY2hhbmdlMiIsIm5vdGlmMiIsIl90aGlzMTEiLCJpZHgiLCJnZXRSYW5kb21UcmFja0luZGV4IiwiZmxvb3IiLCJyYW5kb20iLCJsb2FkU2Z4IiwicGF0aCIsInBsYXlTZngiLCJzZnhOYW1lIiwiY2FjaGVkIiwic291bmQiLCJjbG9uZU5vZGUiLCJhY3Rpb24iLCJjb21iYXRDb250YWluZXIiLCJwYW5lbE9wZW4iLCJjdXJyZW50VGFiIiwiY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCIsImxhc3RNZXNzYWdlSWQiLCJtZXNzYWdlUG9sbGluZ0ludGVydmFsIiwidW5yZWFkUG9sbGluZ0ludGVydmFsIiwiZnJpZW5kc0xvYWRlZCIsInJlcXVlc3RzTG9hZGVkIiwib3BlblBhbmVsIiwibG9hZEZyaWVuZHMiLCJjbG9zZVBhbmVsIiwic3RvcE1lc3NhZ2VQb2xsaW5nIiwidGFiQnRuIiwidGFiTmFtZSIsImZyaWVuZHNUYWIiLCJzd2l0Y2hUYWIiLCJ0YWJDb250ZW50IiwibG9hZFJlcXVlc3RzIiwiZnJpZW5kcyIsInVzZXJJZCIsImxhc3RNZXNzYWdlIiwiaXNGcm9tTWUiLCJpdGVtIiwiZnJpZW5kVXNlcklkIiwib3BlbkNvbnZlcnNhdGlvbiIsInJlcXVlc3RzIiwiZnJpZW5kc2hpcElkIiwiaGFuZGxlUmVxdWVzdCIsImFjY2VwdElkIiwicmVqZWN0SWQiLCJmZXRjaFVucmVhZENvdW50Iiwic2VhcmNoSW5wdXQiLCJzZWFyY2hSZXN1bHRzIiwic2VhcmNoVGltZW91dCIsImNsZWFyVGltZW91dCIsInF1ZXJ5IiwidXNlcnMiLCJ1IiwiYWN0aW9uSHRtbCIsImZyaWVuZFN0YXR1cyIsInNlbmRGcmllbmRSZXF1ZXN0IiwiYWRkRnJpZW5kSWQiLCJvdXRlckhUTUwiLCJyZXBvcnRNZXNzYWdlQWN0aW9uIiwibWVzc2FnZUlkIiwicmVhc29uIiwicHJvbXB0IiwiY29udkVsIiwibWVzc2FnZXNFbCIsInJlbmRlck1lc3NhZ2VzIiwibWVzc2FnZXMiLCJzdGFydE1lc3NhZ2VQb2xsaW5nIiwiYXBwZW5kIiwicGxhY2Vob2xkZXIiLCJtc2ciLCJyZXBvcnRCdG4iLCJyZXBvcnRFbCIsInJlcG9ydE1zZ0lkIiwic2VuZEJ0biIsImlucHV0RWwiLCJzZW5kTWVzc2FnZSIsImJhY2tCdG4iLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ0b3RhbCIsInJlcXVlc3RzQmFkZ2UiLCJwZW5kaW5nUmVxdWVzdHMiXSwic291cmNlUm9vdCI6IiJ9