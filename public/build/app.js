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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QWEsQ0FBQ25jLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07UUFDeEM7TUFDSjtJQUNKLENBQUMsQ0FBQyxTQUNJLENBQUMsWUFBTSxDQUFDLENBQUMsQ0FBQztFQUNwQjtFQUVBK1osZ0JBQWdCLENBQUMsQ0FBQztFQUNsQnpCLHFCQUFxQixHQUFHeUQsV0FBVyxDQUFDaEMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDO0FBQ2hFLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7Ozs7QUN0ZkY7Ozs7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2NvbWJhdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZnJpZW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5jc3M/MmRjOSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcclxuICovXHJcbmltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnO1xyXG5pbXBvcnQgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzJztcclxuaW1wb3J0ICcuL2pzL2NvbWJhdC5qcyc7XHJcbmltcG9ydCAnLi9qcy9mcmllbmRzLmpzJztcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgVVRJTElUQUlSRSBTRUNVUklURSBYU1NcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xyXG4gICAgaWYgKCFzdHIpIHJldHVybiAnJztcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cikpO1xyXG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgTUVOVSBCVVJHRVJcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBidXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1cmdlclwiKTtcclxuICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1uYXZpZ2F0aW9uXCIpO1xyXG5cclxuICAgIGlmIChidXJnZXIgJiYgbmF2KSB7XHJcbiAgICAgICAgYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQQUdFIFRFQU1TIChDT1JSSUfDiUUpXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKiDwn5SnIE1BWCBERVMgU1RBVFMgKGFkYXB0ZXIgw6AgdGEgQkREIC8gw6lxdWlsaWJyYWdlKSAqL1xyXG5jb25zdCBTVEFUX01BWCA9IHtcclxuICAgIGRtZzogMzAsXHJcbiAgICBzcGVlZDogMTIsXHJcbiAgICBkb2RnZTogNDAsXHJcbiAgICBjcml0OiAxNSxcclxuICAgIGhwOiA3NVxyXG59O1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHBvcnRyYWl0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFtLXBvcnRyYWl0Jyk7XHJcbiAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlYW1EZXRhaWxzJyk7XHJcbiAgICBjb25zdCBzZWxlY3RlZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGlzdCcpO1xyXG4gICAgY29uc3QgbGF1bmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1sYXVuY2gnKTtcclxuXHJcbiAgICBpZiAoIWRldGFpbHMgfHwgcG9ydHJhaXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG1heFNlbGVjdGlvbiA9IDQ7XHJcbiAgICBsZXQgc2VsZWN0ZWRIZXJvZXMgPSBbXTtcclxuICAgIGxldCBzZWxlY3RlZEhlcm9JZHMgPSBbXTtcclxuXHJcbiAgICAvLyBDb21wb3NpdGlvbiBvYmxpZ2F0b2lyZSA6IDEgVGFuaywgMSBEUFMsIDEgSGVhbGVyLCAxIFN1cHBvcnRcclxuICAgIC8vIExhIGNhdGVnb3JpZSB2aWVudCBkaXJlY3RlbWVudCBkdSBkYXRhLWNhdGVnb3J5IChjYWxjdWxlIGNvdGUgc2VydmV1cilcclxuICAgIGZ1bmN0aW9uIGdldENhdGVnb3J5KHBvcnRyYWl0KSB7XHJcbiAgICAgICAgcmV0dXJuIHBvcnRyYWl0LmRhdGFzZXQuY2F0ZWdvcnkgfHwgJ1N1cHBvcnQnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkUm9sZXMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSB7IFRhbms6IDAsIERQUzogMCwgSGVhbGVyOiAwLCBTdXBwb3J0OiAwIH07XHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocHAgPT4gcHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAocCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2F0ID0gZ2V0Q2F0ZWdvcnkocCk7XHJcbiAgICAgICAgICAgICAgICByb2xlc1tjYXRdKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcm9sZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FuU2VsZWN0Um9sZShwb3J0cmFpdEVsKSB7XHJcbiAgICAgICAgY29uc3QgY2F0ID0gZ2V0Q2F0ZWdvcnkocG9ydHJhaXRFbCk7XHJcbiAgICAgICAgaWYgKGNhdCA9PT0gJ0xlZ2VuZCcpIHJldHVybiB0cnVlOyAvLyBMZWdlbmQgYnlwYXNzZXMgcm9sZSBsaW1pdHNcclxuICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICByZXR1cm4gcm9sZXNbY2F0XSA8IDE7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hlY2sgaWYgYSBMZWdlbmQgY2hhcmFjdGVyIGlzIGN1cnJlbnRseSBzZWxlY3RlZFxyXG4gICAgZnVuY3Rpb24gaXNMZWdlbmRTZWxlY3RlZCgpIHtcclxuICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCAhPT0gMSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGNvbnN0IHAgPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwcCA9PiBwcC5kYXRhc2V0LmlkID09PSBzZWxlY3RlZEhlcm9JZHNbMF0pO1xyXG4gICAgICAgIHJldHVybiBwICYmIGdldENhdGVnb3J5KHApID09PSAnTGVnZW5kJztcclxuICAgIH1cclxuXHJcbiAgICBwb3J0cmFpdHMuZm9yRWFjaChwb3J0cmFpdCA9PiB7XHJcbiAgICAgICAgcG9ydHJhaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcnRyYWl0cy5mb3JFYWNoKHAgPT4gcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaWQgPSBwb3J0cmFpdC5kYXRhc2V0LmlkO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gcG9ydHJhaXQuZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCByb2xlID0gcG9ydHJhaXQuZGF0YXNldC5yb2xlO1xyXG4gICAgICAgICAgICBjb25zdCBkbWdNaW4gPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kbWdNaW4pO1xyXG4gICAgICAgICAgICBjb25zdCBkbWdNYXggPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kbWdNYXgpO1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LnNwZWVkKTtcclxuICAgICAgICAgICAgY29uc3QgZG9kZ2UgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kb2RnZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyaXQgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5jcml0KTtcclxuICAgICAgICAgICAgY29uc3QgaHAgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5ocCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZUZpbGUgPSBwb3J0cmFpdC5kYXRhc2V0LnNwcml0ZTtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eU5hbWUgPSBwb3J0cmFpdC5kYXRhc2V0LmFiaWxpdHlOYW1lIHx8ICcnO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5RGVzYyA9IHBvcnRyYWl0LmRhdGFzZXQuYWJpbGl0eURlc2MgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlDZCA9IHBvcnRyYWl0LmRhdGFzZXQuYWJpbGl0eUNkIHx8ICcnO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlUGF0aCA9IGAvYXNzZXQvc3ByaXRlcy8ke3Nwcml0ZUZpbGV9YDtcclxuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5SHRtbCA9IGFiaWxpdHlOYW1lID8gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFiaWxpdHktc2VjdGlvbl9faGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1maXJlLWFsdFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19uYW1lXCI+JHtlc2NhcGVIdG1sKGFiaWxpdHlOYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFiaWxpdHktc2VjdGlvbl9fY2RcIj48aSBjbGFzcz1cImZhcyBmYS1ob3VyZ2xhc3MtaGFsZlwiPjwvaT4gJHtlc2NhcGVIdG1sKGFiaWxpdHlDZCl9VDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19kZXNjXCI+JHtlc2NhcGVIdG1sKGFiaWxpdHlEZXNjKX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGAgOiAnJztcclxuXHJcbiAgICAgICAgICAgIC8vIEJ1aWxkIHN5bmVyZ3kgaW5mbyBmb3IgdGhpcyBjaGFyYWN0ZXJcclxuICAgICAgICAgICAgY29uc3QgY2hhclN5bmVyZ2llcyA9IHN5bmVyZ3lNYXBbbmFtZV0gfHwgW107XHJcbiAgICAgICAgICAgIGxldCBzeW5lcmd5SHRtbCA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoY2hhclN5bmVyZ2llcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBzeW5lcmd5SHRtbCA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3luZXJneS1zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25fX2hlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtbGlua1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1zZWN0aW9uX190aXRsZVwiPlN5bmVyZ2llczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7Y2hhclN5bmVyZ2llcy5tYXAocyA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3luZXJneS1zZWN0aW9uX19pdGVtICR7c2VsZWN0ZWRIZXJvZXMuaW5jbHVkZXMocy5wYXJ0bmVyKSA/ICdzeW5lcmd5LXNlY3Rpb25fX2l0ZW0tLWFjdGl2ZScgOiAnJ31cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvbl9fcGFydG5lclwiPiR7ZXNjYXBlSHRtbChzLnBhcnRuZXIpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInN5bmVyZ3ktc2VjdGlvbl9fc25hbWVcIj4ke2VzY2FwZUh0bWwocy5uYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJzeW5lcmd5LXNlY3Rpb25fX2Rlc2NcIj4ke2VzY2FwZUh0bWwocy5kZXNjKX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYCkuam9pbignJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkZXRhaWxzLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZWFtLWRldGFpbHMtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMj4ke25hbWV9PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInJvbGVcIj4ke3JvbGV9PC9wPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2lmLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c3ByaXRlUGF0aH1cIiBhbHQ9XCJTcHJpdGUgZGUgJHtuYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkRNRzwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1kbWdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGRtZ01heCAvIFNUQVRfTUFYLmRtZykgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2RtZ01pbn0gLSAke2RtZ01heH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlZJVDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1zcGRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKHNwZWVkIC8gU1RBVF9NQVguc3BlZWQpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtzcGVlZH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkRPREdFPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWRvZGdlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChkb2RnZSAvIFNUQVRfTUFYLmRvZGdlKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZG9kZ2V9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5DUklUPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWNyaXRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGNyaXQgLyBTVEFUX01BWC5jcml0KSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7Y3JpdH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkhQPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWhwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChocCAvIFNUQVRfTUFYLmhwKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7aHB9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHthYmlsaXR5SHRtbH1cclxuICAgICAgICAgICAgICAgICAgICAke3N5bmVyZ3lIdG1sfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLXNlbGVjdC1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2lzU2VsZWN0ZWQgPyAnRMOpc8OpbGVjdGlvbm5lcicgOiAnU8OpbGVjdGlvbm5lcid9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJ0blJpZ2h0ID0gZGV0YWlscy5xdWVyeVNlbGVjdG9yKCcuYnRuLXNlbGVjdC1yaWdodCcpO1xyXG4gICAgICAgICAgICBjb25zdCByb2xlQ2F0ID0gZ2V0Q2F0ZWdvcnkocG9ydHJhaXQpO1xyXG4gICAgICAgICAgICBjb25zdCBhbHJlYWR5U2VsZWN0ZWQgPSBzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gTGVnZW5kIGNoYXJhY3RlcnMgYXJlIGFsd2F5cyBzZWxlY3RhYmxlXHJcbiAgICAgICAgICAgIGlmIChyb2xlQ2F0ID09PSAnTGVnZW5kJykge1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChpc0xlZ2VuZFNlbGVjdGVkKCkgJiYgIWFscmVhZHlTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRGlzYWJsZSBub3JtYWwgY2hhcnMgaWYgYSBMZWdlbmQgaXMgc2VsZWN0ZWRcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LnRleHRDb250ZW50ID0gJ1VsdHJhIEluc3RpbmN0IGFjdGlmJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICghYWxyZWFkeVNlbGVjdGVkICYmICFjYW5TZWxlY3RSb2xlKHBvcnRyYWl0KSkge1xyXG4gICAgICAgICAgICAgICAgLy8gRMOpc2FjdGl2ZXIgbGUgYm91dG9uIHNpIGxlIHNsb3QgZGUgY2UgcsO0bGUgZXN0IGTDqWrDoCBwcmlzXHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IGBTbG90ICR7cm9sZUNhdH0gZMOpasOgIHByaXNgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIEVBU1RFUiBFR0c6IExlZ2VuZCBjaGFyYWN0ZXIgZmlsbHMgYWxsIDQgc2xvdHNcclxuICAgICAgICAgICAgICAgIGlmIChyb2xlQ2F0ID09PSAnTGVnZW5kJykge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIERlc2VsZWN0IExlZ2VuZFxyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBbXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFNlbGVjdCBMZWdlbmQ6IGNsZWFyIGFsbCBhbmQgc2VsZWN0IG9ubHkgdGhpc1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMgPSBbaWRdO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcyA9IFtuYW1lXTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCkgPyAnRMOpc8OpbGVjdGlvbm5lcicgOiAnU8OpbGVjdGlvbm5lcic7XHJcbiAgICAgICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gUHJldmVudCBzZWxlY3Rpbmcgbm9ybWFsIGNoYXJzIGlmIExlZ2VuZCBpcyBhY3RpdmVcclxuICAgICAgICAgICAgICAgIGlmIChpc0xlZ2VuZFNlbGVjdGVkKCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnVWx0cmEgSW5zdGluY3QgZXN0IGFjdGlmICEgRMOpc8OpbGVjdGlvbm5leiBHb2t1IGRcXCdhYm9yZC4nKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMgPSBzZWxlY3RlZEhlcm9JZHMuZmlsdGVyKGhpZCA9PiBoaWQgIT09IGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcyA9IHNlbGVjdGVkSGVyb2VzLmZpbHRlcihoID0+IGggIT09IG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuU2VsZWN0Um9sZShwb3J0cmFpdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoYFZvdXMgYXZleiBkw6lqw6AgdW4gJHtyb2xlQ2F0fSBkYW5zIHZvdHJlIMOpcXVpcGUgIWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMubGVuZ3RoID49IG1heFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIlZvdXMgcG91dmV6IHPDqWxlY3Rpb25uZXIgbWF4aW11bSA0IHBlcnNvbm5hZ2VzICFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzLnB1c2gobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LnRleHRDb250ZW50ID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKVxyXG4gICAgICAgICAgICAgICAgICAgID8gJ0TDqXPDqWxlY3Rpb25uZXInXHJcbiAgICAgICAgICAgICAgICAgICAgOiAnU8OpbGVjdGlvbm5lcic7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vID09PSBTWU5FUkdZIFNZU1RFTSA9PT1cclxuICAgIGNvbnN0IHRlYW1zUGFnZUVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnRlYW1zLXBhZ2UnKTtcclxuICAgIGNvbnN0IHN5bmVyZ3lNYXAgPSB0ZWFtc1BhZ2VFbCA/IEpTT04ucGFyc2UodGVhbXNQYWdlRWwuZGF0YXNldC5zeW5lcmd5TWFwIHx8ICd7fScpIDoge307XHJcblxyXG4gICAgLyogIFpPTkUgw4lRVUlQRSDigJQgc3ByaXRlcyBzZXVsZW1lbnQgKi9cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkVGVhbSgpIHtcclxuICAgICAgICBzZWxlY3RlZExpc3QuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICAgIGNvbnN0IGxlZ2VuZEFjdGl2ZSA9IGlzTGVnZW5kU2VsZWN0ZWQoKTtcclxuXHJcbiAgICAgICAgaWYgKGxlZ2VuZEFjdGl2ZSkge1xyXG4gICAgICAgICAgICAvLyBFYXN0ZXIgZWdnOiBzaG93IHNvbG8gR29rdVxyXG4gICAgICAgICAgICBjb25zdCBoZXJvID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocCA9PiBwLmRhdGFzZXQuaWQgPT09IHNlbGVjdGVkSGVyb0lkc1swXSk7XHJcbiAgICAgICAgICAgIGlmIChoZXJvKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gaGVyby5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7aGVyby5kYXRhc2V0LnNwcml0ZX1gO1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVyb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgICAgICBoZXJvRWwuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtaGVyby1zcHJpdGUnKTtcclxuICAgICAgICAgICAgICAgIGhlcm9FbC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Nwcml0ZVBhdGh9XCIgYWx0PVwiU3ByaXRlIGRlICR7bmFtZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke25hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkTGlzdC5hcHBlbmRDaGlsZChoZXJvRWwpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgaGVybyA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWhlcm8pIHJldHVybjtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBoZXJvLmRhdGFzZXQubmFtZTtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHNwcml0ZVBhdGggPSBgL2Fzc2V0L3Nwcml0ZXMvJHtoZXJvLmRhdGFzZXQuc3ByaXRlfWA7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBoZXJvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgICAgIGhlcm9FbC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1oZXJvLXNwcml0ZScpO1xyXG4gICAgICAgICAgICAgICAgaGVyb0VsLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c3ByaXRlUGF0aH1cIiBhbHQ9XCJTcHJpdGUgZGUgJHtuYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7bmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRMaXN0LmFwcGVuZENoaWxkKGhlcm9FbCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbGVzIGluZGljYXRldXJzIGRlIHLDtGxlc1xyXG4gICAgICAgIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCk7XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGxlcyBzeW5lcmdpZXNcclxuICAgICAgICB1cGRhdGVTeW5lcmd5SGlnaGxpZ2h0cygpO1xyXG5cclxuICAgICAgICBpZiAobGF1bmNoQnRuKSB7XHJcbiAgICAgICAgICAgIGlmIChsZWdlbmRBY3RpdmUpIHtcclxuICAgICAgICAgICAgICAgIGxhdW5jaEJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5IZWFsZXIgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgICAgIGxhdW5jaEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU3luZXJneUhpZ2hsaWdodHMoKSB7XHJcbiAgICAgICAgLy8gUmVtb3ZlIGFsbCBleGlzdGluZyBzeW5lcmd5IGhpZ2hsaWdodHNcclxuICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgcC5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LWF2YWlsYWJsZScsICdzeW5lcmd5LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICBjb25zdCBiYWRnZSA9IHAucXVlcnlTZWxlY3RvcignLnN5bmVyZ3ktYmFkZ2UnKTtcclxuICAgICAgICAgICAgaWYgKGJhZGdlKSBiYWRnZS5yZW1vdmUoKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gR2V0IG5hbWVzIG9mIHNlbGVjdGVkIGhlcm9lc1xyXG4gICAgICAgIGNvbnN0IHNlbGVjdGVkTmFtZXMgPSBzZWxlY3RlZEhlcm9JZHMubWFwKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHBwID0+IHBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgcmV0dXJuIHAgPyBwLmRhdGFzZXQubmFtZSA6IG51bGw7XHJcbiAgICAgICAgfSkuZmlsdGVyKEJvb2xlYW4pO1xyXG5cclxuICAgICAgICAvLyBGaW5kIGFjdGl2ZSBzeW5lcmdpZXMgKGJvdGggbWVtYmVycyBzZWxlY3RlZClcclxuICAgICAgICBjb25zdCBhY3RpdmVTeW5lcmdpZXMgPSBbXTtcclxuICAgICAgICBjb25zdCBzZWVuUGFpcnMgPSBuZXcgU2V0KCk7XHJcbiAgICAgICAgc2VsZWN0ZWROYW1lcy5mb3JFYWNoKG5hbWUgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBzeW5lcmdpZXMgPSBzeW5lcmd5TWFwW25hbWVdIHx8IFtdO1xyXG4gICAgICAgICAgICBzeW5lcmdpZXMuZm9yRWFjaChzeW4gPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkTmFtZXMuaW5jbHVkZXMoc3luLnBhcnRuZXIpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFpcktleSA9IFtuYW1lLCBzeW4ucGFydG5lcl0uc29ydCgpLmpvaW4oJysnKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXNlZW5QYWlycy5oYXMocGFpcktleSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VlblBhaXJzLmFkZChwYWlyS2V5KTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWN0aXZlU3luZXJnaWVzLnB1c2goeyBuYW1lMTogbmFtZSwgbmFtZTI6IHN5bi5wYXJ0bmVyLCBzeW5lcmd5TmFtZTogc3luLm5hbWUsIGRlc2M6IHN5bi5kZXNjIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcmsgc2VsZWN0ZWQgcG9ydHJhaXRzIHdpdGggYWN0aXZlIHN5bmVyZ3lcclxuICAgICAgICBhY3RpdmVTeW5lcmdpZXMuZm9yRWFjaChzeW4gPT4ge1xyXG4gICAgICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICgocC5kYXRhc2V0Lm5hbWUgPT09IHN5bi5uYW1lMSB8fCBwLmRhdGFzZXQubmFtZSA9PT0gc3luLm5hbWUyKVxyXG4gICAgICAgICAgICAgICAgICAgICYmIHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhwLmRhdGFzZXQuaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcC5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWFjdGl2ZScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gSGlnaGxpZ2h0IHVuc2VsZWN0ZWQgcG9ydHJhaXRzIHRoYXQgaGF2ZSBzeW5lcmd5IHdpdGggc2VsZWN0ZWQgaGVyb2VzXHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMocC5kYXRhc2V0LmlkKSkgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBwTmFtZSA9IHAuZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBjaGFyU3luZXJnaWVzID0gc3luZXJneU1hcFtwTmFtZV0gfHwgW107XHJcbiAgICAgICAgICAgIGNvbnN0IG1hdGNoaW5nID0gY2hhclN5bmVyZ2llcy5maWx0ZXIoc3luID0+IHNlbGVjdGVkTmFtZXMuaW5jbHVkZXMoc3luLnBhcnRuZXIpKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChtYXRjaGluZy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBwLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktYXZhaWxhYmxlJyk7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBiYWRnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UuY2xhc3NOYW1lID0gJ3N5bmVyZ3ktYmFkZ2UnO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UuaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLWxpbmtcIj48L2k+JztcclxuICAgICAgICAgICAgICAgIGJhZGdlLnRpdGxlID0gbWF0Y2hpbmcubWFwKHMgPT4gcy5uYW1lKS5qb2luKCcsICcpO1xyXG4gICAgICAgICAgICAgICAgcC5hcHBlbmRDaGlsZChiYWRnZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gVXBkYXRlIHRoZSBzeW5lcmd5IGRpc3BsYXkgcGFuZWxcclxuICAgICAgICB1cGRhdGVTeW5lcmd5RGlzcGxheShhY3RpdmVTeW5lcmdpZXMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVN5bmVyZ3lEaXNwbGF5KGFjdGl2ZVN5bmVyZ2llcykge1xyXG4gICAgICAgIGxldCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3luZXJneS1kaXNwbGF5Jyk7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHtcclxuICAgICAgICAgICAgY29udGFpbmVyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5jbGFzc05hbWUgPSAnc3luZXJneS1kaXNwbGF5JztcclxuICAgICAgICAgICAgY29uc3QgYWN0aW9ucyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC10ZWFtX19hY3Rpb25zJyk7XHJcbiAgICAgICAgICAgIGlmIChhY3Rpb25zKSB7XHJcbiAgICAgICAgICAgICAgICBhY3Rpb25zLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNvbnRhaW5lciwgYWN0aW9ucyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChhY3RpdmVTeW5lcmdpZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN5bmVyZ3ktZGlzcGxheV9fdGl0bGVcIj5cclxuICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWxpbmtcIj48L2k+IFN5bmVyZ2llcyBhY3RpdmVzXHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAke2FjdGl2ZVN5bmVyZ2llcy5tYXAocyA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJzeW5lcmd5LWRpc3BsYXlfX25hbWVcIj4ke2VzY2FwZUh0bWwocy5zeW5lcmd5TmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19jaGFyc1wiPiR7ZXNjYXBlSHRtbChzLm5hbWUxKX0gKyAke2VzY2FwZUh0bWwocy5uYW1lMil9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwic3luZXJneS1kaXNwbGF5X19kZXNjXCI+JHtlc2NhcGVIdG1sKHMuZGVzYyl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgIGA7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUm9sZUluZGljYXRvcnMoKSB7XHJcbiAgICAgICAgY29uc3QgbGVnZW5kQWN0aXZlID0gaXNMZWdlbmRTZWxlY3RlZCgpO1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgIGNvbnN0IGluZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb2xlLWluZGljYXRvcicpO1xyXG4gICAgICAgIGlmIChpbmRpY2F0b3IpIHtcclxuICAgICAgICAgICAgaW5kaWNhdG9yLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb2xlLXNsb3QnKS5mb3JFYWNoKHNsb3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2F0ID0gc2xvdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgICAgICBpZiAobGVnZW5kQWN0aXZlIHx8IHJvbGVzW2NhdF0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbGxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgIFBSRVNFVFNcclxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbiAgICBjb25zdCBzYXZlUHJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1zYXZlLXByZXNldCcpO1xyXG4gICAgY29uc3QgcHJlc2V0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0TW9kYWwnKTtcclxuICAgIGNvbnN0IHByZXNldE5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXROYW1lJyk7XHJcbiAgICBjb25zdCBwcmVzZXRDb25maXJtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldENvbmZpcm0nKTtcclxuICAgIGNvbnN0IHByZXNldENhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRDYW5jZWwnKTtcclxuXHJcbiAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIGJvdXRvbiBzYXV2ZWdhcmRlciBzZWxvbiBsYSBzZWxlY3Rpb25cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNhdmVQcmVzZXRCdG4oKSB7XHJcbiAgICAgICAgaWYgKHNhdmVQcmVzZXRCdG4pIHtcclxuICAgICAgICAgICAgLy8gTGVnZW5kIHRlYW1zIGNhbm5vdCBiZSBzYXZlZCBhcyBwcmVzZXRzXHJcbiAgICAgICAgICAgIGlmIChpc0xlZ2VuZFNlbGVjdGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIHNhdmVQcmVzZXRCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5IZWFsZXIgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgc2F2ZVByZXNldEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcGVsZXIgdXBkYXRlU2F2ZVByZXNldEJ0biBhIGNoYXF1ZSBjaGFuZ2VtZW50IGRlIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0gPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcbiAgICAvLyBPbiBzdXJjaGFyZ2UgZW4gYWpvdXRhbnQgbCdhcHBlbFxyXG4gICAgY29uc3QgX29yaWdVcGRhdGUgPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcblxyXG4gICAgLy8gUGF0Y2g6IGFqb3V0ZXIgbCdhcHBlbCBhIHVwZGF0ZVNhdmVQcmVzZXRCdG4gZGFucyB1cGRhdGVTZWxlY3RlZFRlYW1cclxuICAgIC8vIE9uIGxlIGZhaXQgZW4gd3JhcHBhbnQgbGVzIGluZGljYXRldXJzXHJcbiAgICBjb25zdCBfb3JpZ1JvbGVJbmRpY2F0b3JzID0gdXBkYXRlUm9sZUluZGljYXRvcnM7XHJcblxyXG4gICAgLy8gT3V2cmlyIGxhIG1vZGFsXHJcbiAgICBpZiAoc2F2ZVByZXNldEJ0biAmJiBwcmVzZXRNb2RhbCkge1xyXG4gICAgICAgIHNhdmVQcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHByZXNldE5hbWVJbnB1dC5mb2N1cygpLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGZXJtZXIgbGEgbW9kYWxcclxuICAgICAgICBwcmVzZXRDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByZXNldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtbW9kYWxfX2JhY2tkcm9wJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNhdXZlZ2FyZGVyIGxlIHByZXNldFxyXG4gICAgICAgIHByZXNldENvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcmVzZXROYW1lSW5wdXQudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZGMxNDNjJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnLi4uJztcclxuXHJcbiAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvcHJlc2V0cy9zYXZlJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVySWRzOiBzZWxlY3RlZEhlcm9JZHMubWFwKE51bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWNoYXJnZXIgbGEgcGFnZSBwb3VyIGFmZmljaGVyIGxlIG5vdXZlYXUgcHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yIHx8ICdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUnKTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRW50ZXIgcG91ciB2YWxpZGVyXHJcbiAgICAgICAgcHJlc2V0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHByZXNldENvbmZpcm1CdG4uY2xpY2soKTtcclxuICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhcmdlciB1biBwcmVzZXQgKHNlbGVjdGlvbiBwcm9ncmFtbWF0aXF1ZSBkZXMgcGVyc29ubmFnZXMpXHJcbiAgICBmdW5jdGlvbiBsb2FkUHJlc2V0KGNoYXJhY3Rlcklkcykge1xyXG4gICAgICAgIC8vIFJlc2V0IGxhIHNlbGVjdGlvbiBhY3R1ZWxsZVxyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG5cclxuICAgICAgICAvLyBTZWxlY3Rpb25uZXIgbGVzIHBlcnNvbm5hZ2VzIGR1IHByZXNldFxyXG4gICAgICAgIGNoYXJhY3Rlcklkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWRTdHIgPSBTdHJpbmcoaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3J0cmFpdCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBpZFN0cik7XHJcbiAgICAgICAgICAgIGlmIChwb3J0cmFpdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWRTdHIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMucHVzaChwb3J0cmFpdC5kYXRhc2V0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICB1cGRhdGVTYXZlUHJlc2V0QnRuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3VwcHJpbWVyIHVuIHByZXNldFxyXG4gICAgZnVuY3Rpb24gZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwRWwpIHtcclxuICAgICAgICBpZiAoIWNvbmZpcm0oJ1N1cHByaW1lciBjZSBwcmVzZXQgPycpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGAvdGVhbXMvcHJlc2V0cy8ke3ByZXNldElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlwRWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTaSBwbHVzIGRlIHByZXNldHMsIGNhY2hlciBsYSBiYXJyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXRzLWJhcl9fbGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QgJiYgbGlzdC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0cy1iYXInKT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXR0YWNoZXIgbGVzIGV2ZW50cyBhdXggY2hpcHMgZGUgcHJlc2V0c1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZXNldC1jaGlwJykuZm9yRWFjaChjaGlwID0+IHtcclxuICAgICAgICBjb25zdCBwcmVzZXRJZCA9IGNoaXAuZGF0YXNldC5wcmVzZXRJZDtcclxuICAgICAgICBjb25zdCBjaGFySWRzID0gSlNPTi5wYXJzZShjaGlwLmRhdGFzZXQucHJlc2V0SWRzKTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2xvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbG9hZFByZXNldChjaGFySWRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2RlbGV0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9ic2VydmVyIGxlcyBjaGFuZ2VtZW50cyBkZSBzZWxlY3Rpb24gcG91ciBsZSBib3V0b24gc2F2ZVxyXG4gICAgLy8gT24gdXRpbGlzZSB1biBNdXRhdGlvbk9ic2VydmVyIHN1ciBzZWxlY3RlZExpc3RcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdXBkYXRlU2F2ZVByZXNldEJ0bigpKTtcclxuICAgIGlmIChzZWxlY3RlZExpc3QpIHtcclxuICAgICAgICBzZWxlY3RlZExpc3RPYnNlcnZlci5vYnNlcnZlKHNlbGVjdGVkTGlzdCwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhdW5jaEJ0bikge1xyXG4gICAgICAgIGxhdW5jaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnZvaSBQT1NUIEFKQVggdmVycyAvdGVhbXMvc2VsZWN0XHJcbiAgICAgICAgICAgICAgICBmZXRjaCgnL3RlYW1zL3NlbGVjdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogc2VsZWN0ZWRIZXJvSWRzLm1hcCgoaWQsIGkpID0+IGBjaGFyYWN0ZXJfaWRzWyR7aX1dPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGlkKX1gKS5qb2luKCcmJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlZGlyZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVkaXJpZ2UgbWFudWVsbGVtZW50IHNpIHBhcyBkZSByZWRpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbWF0Y2htYWtpbmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzw6lsZWN0aW9uIGRlIGxcXCfDqXF1aXBlLicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQUk9GSUxFIFBPUFVQXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1wb3B1cF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWNvbnRlbnRdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBvcHVwKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwb3B1cC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3Byb2ZpbGUtcG9wdXAtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwX19iYWNrZHJvcC0tb3BlbicpO1xyXG5cclxuICAgICAgICBpZiAoIWxvYWRlZCkge1xyXG4gICAgICAgICAgICBmZXRjaFByb2ZpbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cCk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmZXRjaFByb2ZpbGUoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9hcGkvcHJvZmlsZScpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9maWxlKGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lcnJvclwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclByb2ZpbGUoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdENsYXNzID0gKHIpID0+IHIgPT09ICd3aW4nID8gJ3Jlc3VsdC0td2luJyA6IHIgPT09ICdsb3NzJyA/ICdyZXN1bHQtLWxvc3MnIDogJ3Jlc3VsdC0tZHJhdyc7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0TGFiZWwgPSAocikgPT4gciA9PT0gJ3dpbicgPyAnVmljdG9pcmUnIDogciA9PT0gJ2xvc3MnID8gJ0RcXHUwMGU5ZmFpdGUnIDogJ051bCc7XHJcblxyXG4gICAgICAgIGNvbnN0IGF2YXRhckh0bWwgPSBkYXRhLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChkYXRhLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiQXZhdGFyIGRlICR7ZXNjYXBlSHRtbChkYXRhLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmFzIGZhLXVzZXItY2lyY2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPmA7XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faWRlbnRpdHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hdmF0YXJcIj4ke2F2YXRhckh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fdXNlcm5hbWVcIj4ke2VzY2FwZUh0bWwoZGF0YS51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5tb3R0byA/IGA8c3BhbiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX21vdHRvXCI+XFx1MDBhYiAke2VzY2FwZUh0bWwoZGF0YS5tb3R0byl9IFxcdTAwYmI8L3NwYW4+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5iaW8gPyBgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19iaW9cIj4ke2VzY2FwZUh0bWwoZGF0YS5iaW8pfTwvcD5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3RhdHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEucmF0aW5nKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPk1NUjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy53aW5zKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPlZpY3RvaXJlczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy5sb3NzZXMpKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+RFxcdTAwZTlmYWl0ZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMud2luUmF0ZSkpfSU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+V2luIFJhdGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXN0YXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IENoYW1waW9uIEZhdm9yaVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19uYW1lXCI+JHtlc2NhcGVIdG1sKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIubmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX3JvbGVcIj4ke2VzY2FwZUh0bWwoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5yb2xlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fY291bnRcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIuZ2FtZXNQbGF5ZWQpKX0gcGFydGllczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubGFzdFRlYW0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlcnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IERlcm5pXFx1MDBlOHJlIFxcdTAwYzlxdWlwZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5sYXN0VGVhbS5tYXAoYyA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX21lbWJlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoYy5uYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fcm9sZVwiPiR7ZXNjYXBlSHRtbChjLnJvbGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEucmVjZW50QmF0dGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zaGllbGQtYWx0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBIaXN0b3JpcXVlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5yZWNlbnRCYXR0bGVzLm1hcChiID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYXJlbmEvcmVwbGF5LyR7cGFyc2VJbnQoYi5pZCwgMTApfVwiIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19lbnRyeSAke3Jlc3VsdENsYXNzKGIucmVzdWx0KX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fcmVzdWx0XCI+JHtyZXN1bHRMYWJlbChiLnJlc3VsdCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19vcHBvbmVudFwiPnZzICR7ZXNjYXBlSHRtbChiLm9wcG9uZW50KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX3R5cGVcIj4ke2VzY2FwZUh0bWwoYi5tYXRjaFR5cGUpLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19kYXRlXCI+JHtlc2NhcGVIdG1sKGIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsYXkgcHJvZmlsZS1oaXN0b3J5X19yZXBsYXlcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZW1wdHlcIj5BdWN1biBjb21iYXQgZW5yZWdpc3RyXFx1MDBlOTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3Byb2ZpbGVcIiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2VkaXQtbGlua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gXFx1MDBjOWRpdGVyIGxlIHByb2ZpbFxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB9XHJcblxyXG59KTsiLCIvKipcclxuICogQ29tYmF0IEFuaW1hdGlvbiBDb250cm9sbGVyXHJcbiAqIEfDqHJlIGwnYWZmaWNoYWdlIHByb2dyZXNzaWYgZGVzIGxvZ3MgZGUgY29tYmF0IGF2ZWMgYW5pbWF0aW9uc1xyXG4gKi9cclxuY2xhc3MgQ29tYmF0Q29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLmxvZ3MgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFAgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICAvLyBSw6ljdXDDqXJlciBsZXMgbG9ncyBkZXB1aXMgbCdhdHRyaWJ1dCBkYXRhXHJcbiAgICAgICAgY29uc3QgbG9nc0RhdGEgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmNvbWJhdExvZ3M7XHJcbiAgICAgICAgaWYgKGxvZ3NEYXRhKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ3MgPSBKU09OLnBhcnNlKGxvZ3NEYXRhKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyZXVyIHBhcnNpbmcgbG9nczonLCBlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGVzIMOpbMOpbWVudHNcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1sb2ddJyk7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LW92ZXJsYXldJyk7XHJcbiAgICAgICAgdGhpcy5wbGF5QnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXBsYXldJyk7XHJcbiAgICAgICAgdGhpcy5za2lwQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXNraXBdJyk7XHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb21iYXQtc3BlZWRdJyk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgcGVyc29ubmFnZXMgYXZlYyBzdG9ja2FnZSBkZXMgSFAgbWF4IGluaXRpYXV4XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUCA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyU2x1Z3MgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlckhhc0hlYWwgPSB7fTtcclxuICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnMgPSB7fTsgLy8gU3VpdmkgZGVzIGNvb2xkb3ducyBlbiBjb3Vyc1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXMgPSB7fTsgLy8gU3VpdmkgZGVzIHN0YXR1dHMgYWN0aWZzIHBhciBwZXJzb25uYWdlXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2hhcmFjdGVyLW5hbWVdJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbC5kYXRhc2V0LmNoYXJhY3Rlck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJhY3RlclRlYW07XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW19LSR7bmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV0gPSBlbDtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJTbHVnIHx8ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3Rlckhhc0hlYWxba2V5XSA9IGVsLmRhdGFzZXQuaGFzSGVhbCA9PT0gJ3RydWUnO1xyXG5cclxuICAgICAgICAgICAgLy8gRXh0cmFpcmUgbGUgSFAgbWF4IGRlcHVpcyBsZSB0ZXh0ZSBpbml0aWFsXHJcbiAgICAgICAgICAgIGNvbnN0IGhwVGV4dCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcbiAgICAgICAgICAgIGlmIChocFRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gaHBUZXh0LnRleHRDb250ZW50Lm1hdGNoKC8oXFxkKylcXC8oXFxkKykvKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFBba2V5XSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgLy8gSW5pdGlhbGlzZXIgbGVzIHN0YXR1dHMgdmlkZXNcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldID0gdGhpcy5jcmVhdGVFbXB0eVN0YXR1c2VzKCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgw6lsw6ltZW50cyBkJ2FiaWxpdHkgZGFucyBsZXMgaW5mbyBwYW5lbHNcclxuICAgICAgICB0aGlzLmFiaWxpdHlFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGFyYWN0ZXItaW5mb1tkYXRhLWNoYXItbmFtZV0nKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsLmRhdGFzZXQuY2hhck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJUZWFtO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUVsID0gZWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5Jyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWw6IGFiaWxpdHlFbCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhDZDogcGFyc2VJbnQoYWJpbGl0eUVsLmRhdGFzZXQuYWJpbGl0eU1heENkKSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhZGdlOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LWNkLWJhZGdlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZUVsOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LW5hbWUnKSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uRWw6IGFiaWxpdHlFbC5xdWVyeVNlbGVjdG9yKCdpJyksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENhY2hlciBsJ292ZXJsYXlcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZpZGVyIGxlIGxvZ1xyXG4gICAgICAgIGlmICh0aGlzLmxvZ0NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEF1ZGlvXHJcbiAgICAgICAgdGhpcy5hdWRpb1VubG9ja2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG51bGw7XHJcbiAgICAgICAgdGhpcy5sYXN0VHJhY2tJbmRleCA9IC0xO1xyXG4gICAgICAgIHRoaXMuaXNNdXRlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudm9sdW1lID0gMC4wNTtcclxuICAgICAgICB0aGlzLnNmeFZvbHVtZSA9IDAuMDU7XHJcbiAgICAgICAgdGhpcy5jb21iYXRQbGF5bGlzdCA9IFtcclxuICAgICAgICAgICAgJy9hc3NldC9hdWRpby9jb21iYXQvYnV0Y2hlcnNib3VsZXZhcmRtdXNpYy5tcDMnLFxyXG4gICAgICAgICAgICAnL2Fzc2V0L2F1ZGlvL2NvbWJhdC9jb21iYXRpbnRoZXJ1aW5zLm1wMycsXHJcbiAgICAgICAgXTtcclxuXHJcbiAgICAgICAgLy8gRWFzdGVyIGVnZzogVWx0cmEgSW5zdGluY3QgbXVzaWMgb3ZlcnJpZGUgd2hlbiBHb2t1IGlzIHByZXNlbnRcclxuICAgICAgICBjb25zdCBoYXNHb2t1ID0gQXJyYXkuZnJvbSh0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jaGFyYWN0ZXItc2x1Z10nKSlcclxuICAgICAgICAgICAgLnNvbWUoZWwgPT4gZWwuZGF0YXNldC5jaGFyYWN0ZXJTbHVnID09PSAnZ29rdScpO1xyXG4gICAgICAgIGlmIChoYXNHb2t1KSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tYmF0UGxheWxpc3QgPSBbJy9hc3NldC9hdWRpby9jb21iYXQvdWx0cmEtaW5zdGluY3QubXAzJ107XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLmVuZE11c2ljID0gbnVsbDtcclxuICAgICAgICB0aGlzLnNmeENhY2hlID0ge307XHJcbiAgICAgICAgdGhpcy5tdXRlQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtYXVkaW8tbXV0ZV0nKTtcclxuICAgICAgICB0aGlzLnZvbHVtZVNsaWRlciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWF1ZGlvLXZvbHVtZV0nKTtcclxuICAgICAgICB0aGlzLnNmeFNsaWRlciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXNmeC12b2x1bWVdJyk7XHJcblxyXG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyBMYW5jZXIgYXV0b21hdGlxdWVtZW50IGFwcsOocyB1biBkw6lsYWlcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGxheSgpLCA4MDApO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBTVEFUVVMgVFJBQ0tJTkcgPT09XHJcblxyXG4gICAgY3JlYXRlRW1wdHlTdGF0dXNlcygpIHtcclxuICAgICAgICByZXR1cm4ge1xyXG4gICAgICAgICAgICBibGVlZGluZzogMCxcclxuICAgICAgICAgICAgYmxpZ2h0ZWQ6IDAsXHJcbiAgICAgICAgICAgIHN0dW5uZWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBtYXJrZWQ6IDAsXHJcbiAgICAgICAgICAgIHByb3RlY3RlZDogMCxcclxuICAgICAgICAgICAgc3RlYWx0aGVkOiAwLFxyXG4gICAgICAgICAgICByaXBvc3RlOiAwLFxyXG4gICAgICAgICAgICBkbWdVcDogMCxcclxuICAgICAgICAgICAgc3BkVXA6IDAsXHJcbiAgICAgICAgICAgIGRvZGdlVXA6IDAsXHJcbiAgICAgICAgICAgIGNyaXRVcDogMCxcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYXJhY3RlclN0YXR1c2VzKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncm91bmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy50aWNrUm91bmRTdGF0dXNlcygpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuOyAvLyB0aWNrUm91bmRTdGF0dXNlcyBhbHJlYWR5IGNhbGxzIHJlbmRlckFsbFN0YXR1c0ljb25zXHJcblxyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZUFiaWxpdHlTdGF0dXNDaGFuZ2UobG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnZGVmZW5kJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAncHJvdGVjdGVkJywgbG9nLmR1cmF0aW9uIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudHVybnNSZW1haW5pbmcgIT09IHVuZGVmaW5lZCAmJiBsb2cudHVybnNSZW1haW5pbmcgPD0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxlZWRpbmcnLCAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50dXJuc1JlbWFpbmluZyAhPT0gdW5kZWZpbmVkICYmIGxvZy50dXJuc1JlbWFpbmluZyA8PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGlnaHRlZCcsIDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdzdHVubmVkX3NraXAnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdzdHVubmVkJywgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcblxyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgLy8gU3RlYWx0aCBjb25zdW1lZCBvbiBhdHRhY2tcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuYXR0YWNrZXIgJiYgbG9nLmF0dGFja2VyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2xvZy5hdHRhY2tlclRlYW19LSR7bG9nLmF0dGFja2VyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XSAmJiB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0uc3RlYWx0aGVkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0uc3RlYWx0aGVkID0gMDtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuXHJcbiAgICAgICAgICAgIGNhc2UgJ3N5bmVyZ3lfdHJpZ2dlcic6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmhhbmRsZVN5bmVyZ3lTdGF0dXNDaGFuZ2UobG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5jbGVhckFsbFN0YXR1c2VzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5yZW5kZXJBbGxTdGF0dXNJY29ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZUFiaWxpdHlTdGF0dXNDaGFuZ2UobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cuc3VidHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF9hdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJywgbG9nLmJsZWVkVHVybnMgfHwgMyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmFsbEhpdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcmltYXJ5ID0gbG9nLmFsbEhpdHMuZmluZChoID0+IGguaXNQcmltYXJ5KTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocHJpbWFyeSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhwcmltYXJ5Lm5hbWUsIHByaW1hcnkudGVhbSwgJ2JsaWdodGVkJywgbG9nLmJsaWdodFR1cm5zIHx8IDMpO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAobG9nLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnLCBsb2cuYmxpZ2h0VHVybnMgfHwgMyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnc3R1bm5lZCcsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcmsnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ21hcmtlZCcsIGxvZy5tYXJrVHVybnMgfHwgMyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sICdyaXBvc3RlJywgbG9nLnJpcG9zdGVUdXJucyB8fCAyKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWxmX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5QnVmZlN0YXR1c2VzKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cuYnVmZnMsIGxvZy5idWZmRHVyYXRpb24gfHwgMik7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFwcGx5VGVhbUJ1ZmZTdGF0dXNlcyhsb2cuY2FzdGVyVGVhbSwgbG9nLmJ1ZmZzLCBsb2cuYnVmZkR1cmF0aW9uIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0ZWFsdGgnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgJ3N0ZWFsdGhlZCcsIGxvZy5zdGVhbHRoVHVybnMgfHwgMSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdF9kb2RnZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAncHJvdGVjdGVkJywgbG9nLnByb3RlY3RUdXJucyB8fCAyKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2RvZGdlVXAnLCBsb2cucHJvdGVjdFR1cm5zIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuc2VsZkJsZWVkVHVybnMgJiYgbG9nLnNlbGZCbGVlZFR1cm5zID4gMCAmJiBsb2cuY2FzdGVyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sICdibGVlZGluZycsIGxvZy5zZWxmQmxlZWRUdXJucyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYm9udXNfdnNfbWFya2VkJzpcclxuICAgICAgICAgICAgICAgIC8vIE1hcmsgbWF5IGJlIGNvbnN1bWVkIG9uIGhpdCAocmVtb3ZlT25IaXQpXHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHRLZXkgPSBgJHtsb2cudGFyZ2V0VGVhbX0tJHtsb2cudGFyZ2V0fWA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gV2UgY2FuJ3Qga25vdyBmb3Igc3VyZSBpZiByZW1vdmVPbkhpdCwgc28gbGVhdmUgdGhlIGljb24gLSBpdCB3aWxsIHRpY2sgZG93blxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGhhbmRsZVN5bmVyZ3lTdGF0dXNDaGFuZ2UobG9nKSB7XHJcbiAgICAgICAgaWYgKCFsb2cuZWZmZWN0VHlwZSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBzd2l0Y2ggKGxvZy5lZmZlY3RUeXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2dyYW50X3JpcG9zdGUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtLCAncmlwb3N0ZScsIGxvZy5ncmFudGVkVHVybnMgfHwgMSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndGVtcF9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuYnVmZlR5cGVzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBsb2cuYnVmZkR1cmF0aW9uIHx8IDI7XHJcbiAgICAgICAgICAgICAgICAgICAgbG9nLmJ1ZmZUeXBlcy5mb3JFYWNoKHR5cGUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGF0dXNLZXkgPSB0aGlzLmJ1ZmZUeXBlVG9TdGF0dXNLZXkodHlwZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzdGF0dXNLZXkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5wYXJ0bmVyQ2hhciwgbG9nLnBhcnRuZXJDaGFyVGVhbSwgc3RhdHVzS2V5LCBkdXJhdGlvbik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhcHBseV9tYXJrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0dXMobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdtYXJrZWQnLCBsb2cubWFya1R1cm5zIHx8IDIpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2dyYW50X2RvZGdlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuc2V0U3RhdHVzKGxvZy5wYXJ0bmVyQ2hhciwgbG9nLnBhcnRuZXJDaGFyVGVhbSwgJ2RvZGdlVXAnLCBsb2cuZG9kZ2VEdXJhdGlvbiB8fCAyKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdleHRlbmRfc3RlYWx0aCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnBhcnRuZXJDaGFyICYmIGxvZy5wYXJ0bmVyQ2hhclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtsb2cucGFydG5lckNoYXJUZWFtfS0ke2xvZy5wYXJ0bmVyQ2hhcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldLnN0ZWFsdGhlZCArPSAobG9nLmV4dHJhVHVybnMgfHwgMSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2d1YXJhbnRlZWRfY3JpdCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNldFN0YXR1cyhsb2cucGFydG5lckNoYXIsIGxvZy5wYXJ0bmVyQ2hhclRlYW0sICdjcml0VXAnLCAxKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBidWZmVHlwZVRvU3RhdHVzS2V5KHR5cGUpIHtcclxuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnZGFtYWdlJzogcmV0dXJuICdkbWdVcCc7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NwZWVkJzogcmV0dXJuICdzcGRVcCc7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RvZGdlJzogcmV0dXJuICdkb2RnZVVwJztcclxuICAgICAgICAgICAgY2FzZSAnY3JpdCc6IHJldHVybiAnY3JpdFVwJztcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFwcGx5QnVmZlN0YXR1c2VzKGNoYXJOYW1lLCB0ZWFtTmFtZSwgYnVmZnMsIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgaWYgKCFidWZmcykgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW1OYW1lfS0ke2NoYXJOYW1lfWA7XHJcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XTtcclxuICAgICAgICBpZiAoIXMpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKGJ1ZmZzLmRhbWFnZSAmJiBidWZmcy5kYW1hZ2UgPiAwKSBzLmRtZ1VwID0gTWF0aC5tYXgocy5kbWdVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgIGlmIChidWZmcy5zcGVlZCAmJiBidWZmcy5zcGVlZCA+IDApIHMuc3BkVXAgPSBNYXRoLm1heChzLnNwZFVwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgaWYgKGJ1ZmZzLmRvZGdlICYmIGJ1ZmZzLmRvZGdlID4gMCkgcy5kb2RnZVVwID0gTWF0aC5tYXgocy5kb2RnZVVwLCBkdXJhdGlvbik7XHJcbiAgICAgICAgaWYgKGJ1ZmZzLmNyaXQgJiYgYnVmZnMuY3JpdCA+IDApIHMuY3JpdFVwID0gTWF0aC5tYXgocy5jcml0VXAsIGR1cmF0aW9uKTtcclxuICAgIH1cclxuXHJcbiAgICBhcHBseVRlYW1CdWZmU3RhdHVzZXModGVhbU5hbWUsIGJ1ZmZzLCBkdXJhdGlvbikge1xyXG4gICAgICAgIGlmICghYnVmZnMpIHJldHVybjtcclxuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyh0aGlzLmNoYXJhY3RlclN0YXR1c2VzKSkge1xyXG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgodGVhbU5hbWUgKyAnLScpKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzID0gdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZzLmRhbWFnZSAmJiBidWZmcy5kYW1hZ2UgPiAwKSBzLmRtZ1VwID0gTWF0aC5tYXgocy5kbWdVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZzLnNwZWVkICYmIGJ1ZmZzLnNwZWVkID4gMCkgcy5zcGRVcCA9IE1hdGgubWF4KHMuc3BkVXAsIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgICAgIGlmIChidWZmcy5kb2RnZSAmJiBidWZmcy5kb2RnZSA+IDApIHMuZG9kZ2VVcCA9IE1hdGgubWF4KHMuZG9kZ2VVcCwgZHVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGJ1ZmZzLmNyaXQgJiYgYnVmZnMuY3JpdCA+IDApIHMuY3JpdFVwID0gTWF0aC5tYXgocy5jcml0VXAsIGR1cmF0aW9uKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzZXRTdGF0dXMoY2hhck5hbWUsIHRlYW1OYW1lLCBzdGF0dXNLZXksIHZhbHVlKSB7XHJcbiAgICAgICAgY29uc3Qga2V5ID0gYCR7dGVhbU5hbWV9LSR7Y2hhck5hbWV9YDtcclxuICAgICAgICBpZiAoIXRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XVtzdGF0dXNLZXldID0gdmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgY2xlYXJBbGxTdGF0dXNlcyhjaGFyTmFtZSwgdGVhbU5hbWUpIHtcclxuICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtTmFtZX0tJHtjaGFyTmFtZX1gO1xyXG4gICAgICAgIGlmICh0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV0pIHtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTdGF0dXNlc1trZXldID0gdGhpcy5jcmVhdGVFbXB0eVN0YXR1c2VzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHRpY2tSb3VuZFN0YXR1c2VzKCkge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXMpKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHMgPSB0aGlzLmNoYXJhY3RlclN0YXR1c2VzW2tleV07XHJcbiAgICAgICAgICAgIC8vIERPVHM6IE5PVCBkZWNyZW1lbnRlZCBoZXJlLCBoYW5kbGVkIGJ5IGJsZWVkX3RpY2svYmxpZ2h0X3RpY2sgbG9nc1xyXG4gICAgICAgICAgICAvLyBEZWNyZW1lbnQgZHVyYXRpb24tYmFzZWQgc3RhdHVzZXMgKHNraXAgcGVybWFuZW50IGJ1ZmZzID49IDk5OSlcclxuICAgICAgICAgICAgaWYgKHMubWFya2VkID4gMCAmJiBzLm1hcmtlZCA8IDk5OSkgcy5tYXJrZWQtLTtcclxuICAgICAgICAgICAgaWYgKHMucHJvdGVjdGVkID4gMCAmJiBzLnByb3RlY3RlZCA8IDk5OSkgcy5wcm90ZWN0ZWQtLTtcclxuICAgICAgICAgICAgaWYgKHMuc3RlYWx0aGVkID4gMCAmJiBzLnN0ZWFsdGhlZCA8IDk5OSkgcy5zdGVhbHRoZWQtLTtcclxuICAgICAgICAgICAgaWYgKHMucmlwb3N0ZSA+IDAgJiYgcy5yaXBvc3RlIDwgOTk5KSBzLnJpcG9zdGUtLTtcclxuICAgICAgICAgICAgaWYgKHMuZG1nVXAgPiAwICYmIHMuZG1nVXAgPCA5OTkpIHMuZG1nVXAtLTtcclxuICAgICAgICAgICAgaWYgKHMuc3BkVXAgPiAwICYmIHMuc3BkVXAgPCA5OTkpIHMuc3BkVXAtLTtcclxuICAgICAgICAgICAgaWYgKHMuZG9kZ2VVcCA+IDAgJiYgcy5kb2RnZVVwIDwgOTk5KSBzLmRvZGdlVXAtLTtcclxuICAgICAgICAgICAgaWYgKHMuY3JpdFVwID4gMCAmJiBzLmNyaXRVcCA8IDk5OSkgcy5jcml0VXAtLTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZW5kZXJBbGxTdGF0dXNJY29ucygpO1xyXG4gICAgfVxyXG5cclxuICAgIHJlbmRlckFsbFN0YXR1c0ljb25zKCkge1xyXG4gICAgICAgIGZvciAoY29uc3Qga2V5IG9mIE9iamVjdC5rZXlzKHRoaXMuY2hhcmFjdGVyU3RhdHVzZXMpKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyU3RhdHVzSWNvbnMoa2V5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcmVuZGVyU3RhdHVzSWNvbnMoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgZWwgPSB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBlbC5xdWVyeVNlbGVjdG9yKCcuc3RhdHVzLWljb25zJyk7XHJcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgcyA9IHRoaXMuY2hhcmFjdGVyU3RhdHVzZXNba2V5XTtcclxuICAgICAgICBjb25zdCBpY29ucyA9IFtdO1xyXG5cclxuICAgICAgICAvLyBEZWJ1ZmZzXHJcbiAgICAgICAgaWYgKHMuYmxlZWRpbmcgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLXRpbnQnLCBjbHM6ICdzdGF0dXMtaWNvbi0tYmxlZWQnLCB0aXRsZTogJ1NhaWduZW1lbnQnIH0pO1xyXG4gICAgICAgIGlmIChzLmJsaWdodGVkID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1za3VsbC1jcm9zc2JvbmVzJywgY2xzOiAnc3RhdHVzLWljb24tLWJsaWdodCcsIHRpdGxlOiAnUGVzdGUnIH0pO1xyXG4gICAgICAgIGlmIChzLnN0dW5uZWQpIGljb25zLnB1c2goeyBpY29uOiAnZmEtZGl6enknLCBjbHM6ICdzdGF0dXMtaWNvbi0tc3R1bicsIHRpdGxlOiAnRXRvdXJkaScgfSk7XHJcbiAgICAgICAgaWYgKHMubWFya2VkID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1jcm9zc2hhaXJzJywgY2xzOiAnc3RhdHVzLWljb24tLW1hcmsnLCB0aXRsZTogJ01hcnF1ZScgfSk7XHJcblxyXG4gICAgICAgIC8vIEJ1ZmZzXHJcbiAgICAgICAgaWYgKHMucHJvdGVjdGVkID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1zaGllbGQtYWx0JywgY2xzOiAnc3RhdHVzLWljb24tLXByb3RlY3QnLCB0aXRsZTogJ1Byb3RlZ2UnIH0pO1xyXG4gICAgICAgIGlmIChzLnN0ZWFsdGhlZCA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtZXllLXNsYXNoJywgY2xzOiAnc3RhdHVzLWljb24tLXN0ZWFsdGgnLCB0aXRsZTogJ0Z1cnRpZicgfSk7XHJcbiAgICAgICAgaWYgKHMucmlwb3N0ZSA+IDApIGljb25zLnB1c2goeyBpY29uOiAnZmEtZXhjaGFuZ2UtYWx0JywgY2xzOiAnc3RhdHVzLWljb24tLXJpcG9zdGUnLCB0aXRsZTogJ1JpcG9zdGUnIH0pO1xyXG4gICAgICAgIGlmIChzLmRtZ1VwID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS1maXN0LXJhaXNlZCcsIGNsczogJ3N0YXR1cy1pY29uLS1kbWctdXAnLCB0aXRsZTogJytEZWdhdHMnIH0pO1xyXG4gICAgICAgIGlmIChzLnNwZFVwID4gMCkgaWNvbnMucHVzaCh7IGljb246ICdmYS13aW5kJywgY2xzOiAnc3RhdHVzLWljb24tLXNwZC11cCcsIHRpdGxlOiAnK1ZpdGVzc2UnIH0pO1xyXG4gICAgICAgIGlmIChzLmRvZGdlVXAgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLXJ1bm5pbmcnLCBjbHM6ICdzdGF0dXMtaWNvbi0tZG9kZ2UtdXAnLCB0aXRsZTogJytFc3F1aXZlJyB9KTtcclxuICAgICAgICBpZiAocy5jcml0VXAgPiAwKSBpY29ucy5wdXNoKHsgaWNvbjogJ2ZhLWJ1bGxzZXllJywgY2xzOiAnc3RhdHVzLWljb24tLWNyaXQtdXAnLCB0aXRsZTogJytDcml0aXF1ZScgfSk7XHJcblxyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBpY29ucy5tYXAoaSA9PlxyXG4gICAgICAgICAgICBgPHNwYW4gY2xhc3M9XCJzdGF0dXMtaWNvbiAke2kuY2xzfVwiIHRpdGxlPVwiJHtpLnRpdGxlfVwiPjxpIGNsYXNzPVwiZmFzICR7aS5pY29ufVwiPjwvaT48L3NwYW4+YFxyXG4gICAgICAgICkuam9pbignJyk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IEVORCBTVEFUVVMgVFJBQ0tJTkcgPT09XHJcblxyXG4gICAgYmluZEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5wbGF5QnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlUGxheSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNraXBCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5za2lwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5za2lwKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5zZXRTcGVlZChlKSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEF1ZGlvIGNvbnRyb2xzXHJcbiAgICAgICAgaWYgKHRoaXMubXV0ZUJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLm11dGVCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZU11dGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnZvbHVtZVNsaWRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnZvbHVtZVNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnZvbHVtZSA9IHBhcnNlRmxvYXQoZS50YXJnZXQudmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuY29tYmF0TXVzaWMpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNvbWJhdE11c2ljLnZvbHVtZSA9IHRoaXMuaXNNdXRlZCA/IDAgOiB0aGlzLnZvbHVtZTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmVuZE11c2ljKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5lbmRNdXNpYy52b2x1bWUgPSB0aGlzLmlzTXV0ZWQgPyAwIDogdGhpcy52b2x1bWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zZnhTbGlkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5zZnhTbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zZnhWb2x1bWUgPSBwYXJzZUZsb2F0KGUudGFyZ2V0LnZhbHVlKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBVbmxvY2sgYXVkaW8gb24gZmlyc3QgdXNlciBpbnRlcmFjdGlvbiAoYnJvd3NlciBhdXRvcGxheSBwb2xpY3kpXHJcbiAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmF1ZGlvVW5sb2NrZWQpIHJldHVybjtcclxuICAgICAgICAgICAgdGhpcy5hdWRpb1VubG9ja2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgdGhpcy5wbGF5TmV4dFRyYWNrKCk7XHJcbiAgICAgICAgfSwgeyBvbmNlOiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nICYmICF0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTmV4dExvZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVBsYXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZyB8fCB0aGlzLmlzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2tpcCgpIHtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gQWZmaWNoZXIgdG91cyBsZXMgbG9ncyByZXN0YW50c1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9nID0gdGhpcy5sb2dzW3RoaXMuY3VycmVudEluZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TG9nKGxvZyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNrQWJpbGl0eUNvb2xkb3ducyhsb2cpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlclN0YXR1c2VzKGxvZyk7XHJcbiAgICAgICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2RlYXRoJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVhdGgobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIC8vIFN5bmVyZ3kgdHJpZ2dlcnMgdGhhdCBraWxsIHRhcmdldHNcclxuICAgICAgICAgICAgaWYgKGxvZy50eXBlID09PSAnc3luZXJneV90cmlnZ2VyJyAmJiBsb2cudGFyZ2V0SFAgPT09IDAgJiYgbG9nLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVhdGgobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNob3dWaWN0b3J5T3ZlcmxheSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNwZWVkKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3Qgc3BlZWQgPSBwYXJzZUZsb2F0KGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb21iYXRTcGVlZCk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBsJ1VJXHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMuZm9yRWFjaChidG4gPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NOZXh0TG9nKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcgfHwgdGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWaWN0b3J5T3ZlcmxheSgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbG9nID0gdGhpcy5sb2dzW3RoaXMuY3VycmVudEluZGV4XTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NMb2cobG9nKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxlciBsZSBkw6lsYWlcclxuICAgICAgICBsZXQgZGVsYXkgPSB0aGlzLmdldERlbGF5Rm9yTG9nKGxvZyk7XHJcbiAgICAgICAgZGVsYXkgPSBkZWxheSAvIHRoaXMuc3BlZWQ7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9jZXNzTmV4dExvZygpLCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGVsYXlGb3JMb2cobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdyb3VuZCc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdpbml0aWF0aXZlJzogcmV0dXJuIDYwMDtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzogcmV0dXJuIDMwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOiByZXR1cm4gMjgwMDtcclxuICAgICAgICAgICAgY2FzZSAnZGVmZW5kJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RvZGdlJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzogcmV0dXJuIDM1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3QnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAndmljdG9yeSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2RyYXcnOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgLy8gTm91dmVhdXggdHlwZXNcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfdGljayc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVubmVkX3NraXAnOiByZXR1cm4gMTgwMDtcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6IHJldHVybiB0aGlzLmdldEFiaWxpdHlEZWxheShsb2cpO1xyXG4gICAgICAgICAgICAvLyBTeW5lcmdpZXNcclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV9hbm5vdW5jZSc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X3RyaWdnZXInOiByZXR1cm4gdGhpcy5nZXRTeW5lcmd5VHJpZ2dlckRlbGF5KGxvZyk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAxMjAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRTeW5lcmd5VHJpZ2dlckRlbGF5KGxvZykge1xyXG4gICAgICAgIC8vIFJlYWN0aXZlIHN5bmVyZ2llcyAoYm9udXMgYXR0YWNrcykgbmVlZCBtb3JlIHRpbWVcclxuICAgICAgICBpZiAobG9nLmRhbWFnZSAhPT0gdW5kZWZpbmVkKSByZXR1cm4gMzUwMDtcclxuICAgICAgICByZXR1cm4gMjUwMDtcclxuICAgIH1cclxuXHJcbiAgICBnZXRBYmlsaXR5RGVsYXkobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cuc3VidHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOiByZXR1cm4gMzAwMDtcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6IHJldHVybiAzNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcmsnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9idWZmJzpcclxuICAgICAgICAgICAgY2FzZSAnc2VsZl9idWZmJzpcclxuICAgICAgICAgICAgY2FzZSAnc3RlYWx0aCc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9oZWFsJzogcmV0dXJuIDI4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2J1ZmYnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAnZW1lcmdlbmN5X2hlYWwnOiByZXR1cm4gMjgwMDtcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdF9kb2RnZSc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2Zvcm1fZGFtYWdlJzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3VsdHJhX2luc3RpbmN0JzogcmV0dXJuIDM1MDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAyMDAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTG9nKGxvZykge1xyXG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbihsb2cpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUxvZyhsb2cpO1xyXG5cclxuICAgICAgICAvLyBTeW5jaHJvbmlzZXIgbGEgbWlzZSDDoCBqb3VyIGRlcyBIUCBhdmVjIGwnYW5pbWF0aW9uXHJcbiAgICAgICAgY29uc3QgaHBEZWxheSA9IHRoaXMuZ2V0SFBVcGRhdGVEZWxheShsb2cpO1xyXG4gICAgICAgIGlmIChocERlbGF5ID4gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpLCBocERlbGF5IC8gdGhpcy5zcGVlZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTdWl2aSBkZXMgY29vbGRvd25zXHJcbiAgICAgICAgdGhpcy50cmFja0FiaWxpdHlDb29sZG93bnMobG9nKTtcclxuXHJcbiAgICAgICAgLy8gU3VpdmkgZGVzIHN0YXR1dHMgKGljb25lcyBidWZmL2RlYnVmZilcclxuICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlclN0YXR1c2VzKGxvZyk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhY2tBYmlsaXR5Q29vbGRvd25zKGxvZykge1xyXG4gICAgICAgIC8vIFF1YW5kIHVuZSBjb21ww6l0ZW5jZSBlc3QgdXRpbGlzw6llLCBtZXR0cmUgZW4gY29vbGRvd25cclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdhYmlsaXR5X3VzZScgJiYgbG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlEYXRhID0gdGhpcy5hYmlsaXR5RWxlbWVudHNba2V5XTtcclxuICAgICAgICAgICAgaWYgKGFiaWxpdHlEYXRhICYmIGFiaWxpdHlEYXRhLm1heENkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hYmlsaXR5Q29vbGRvd25zW2tleV0gPSBhYmlsaXR5RGF0YS5tYXhDZDtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheShrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBIGNoYXF1ZSBub3V2ZWF1IHJvdW5kLCBkw6ljcsOpbWVudGVyIHRvdXMgbGVzIGNvb2xkb3duc1xyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ3JvdW5kJykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmFiaWxpdHlDb29sZG93bnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheShrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUFiaWxpdHlDb29sZG93bkRpc3BsYXkoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgYWJpbGl0eURhdGEgPSB0aGlzLmFiaWxpdHlFbGVtZW50c1trZXldO1xyXG4gICAgICAgIGlmICghYWJpbGl0eURhdGEpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY2QgPSB0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XSB8fCAwO1xyXG5cclxuICAgICAgICBpZiAoY2QgPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIEVuIGNvb2xkb3duIDogZ3Jpc2VyICsgYWZmaWNoZXIgYmFkZ2VcclxuICAgICAgICAgICAgYWJpbGl0eURhdGEuZWwuY2xhc3NMaXN0LmFkZCgnY2hhcmFjdGVyLWluZm9fX2FiaWxpdHktLW9uLWNkJyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RGF0YS5iYWRnZSkge1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eURhdGEuYmFkZ2UudGV4dENvbnRlbnQgPSBgJHtjZH1UYDtcclxuICAgICAgICAgICAgICAgIGFiaWxpdHlEYXRhLmJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFByw6p0IDogcmV0aXJlciBsZSBncmlzXHJcbiAgICAgICAgICAgIGFiaWxpdHlEYXRhLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2NoYXJhY3Rlci1pbmZvX19hYmlsaXR5LS1vbi1jZCcpO1xyXG4gICAgICAgICAgICBpZiAoYWJpbGl0eURhdGEuYmFkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGFiaWxpdHlEYXRhLmJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SFBVcGRhdGVEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6IHJldHVybiAzNTA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOiByZXR1cm4gNDAwO1xyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6IHJldHVybiAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzogcmV0dXJuIDIwMDtcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOiByZXR1cm4gMjAwO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2FjdGl2YXRlJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAnYWJpbGl0eV91c2UnOiByZXR1cm4gdGhpcy5nZXRBYmlsaXR5SFBEZWxheShsb2cpO1xyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X3RyaWdnZXInOiByZXR1cm4gODAwO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWJpbGl0eUhQRGVsYXkobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cuc3VidHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfYXR0YWNrJzpcclxuICAgICAgICAgICAgY2FzZSAnYmFja2xpbmVfc3RyaWtlJzpcclxuICAgICAgICAgICAgY2FzZSAnYXJtb3JfcGllcmNlJzpcclxuICAgICAgICAgICAgY2FzZSAnYm9udXNfdnNfbWFya2VkJzpcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6IHJldHVybiAzNTA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2hlYWwnOlxyXG4gICAgICAgICAgICBjYXNlICdlbWVyZ2VuY3lfaGVhbCc6IHJldHVybiA0MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyYW5zZm9ybV9kYW1hZ2UnOiByZXR1cm4gMjAwO1xyXG4gICAgICAgICAgICBjYXNlICd1bHRyYV9pbnN0aW5jdCc6IHJldHVybiA0MDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QW5pbWF0aW9uKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuYXR0YWNrZXIsIGxvZy5hdHRhY2tlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cuaXNDcml0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmhlYWxlciwgbG9nLmhlYWxlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVmZW5kKGxvZy5kZWZlbmRlciwgbG9nLmRlZmVuZGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9kZ2UobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBOb3V2ZWF1eCB0eXBlc1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVubmVkX3NraXAnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3R1bm5lZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmF0dGFja2VyLCBsb2cuYXR0YWNrZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheUFiaWxpdHlBbmltYXRpb24obG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBTeW5lcmdpZXNcclxuICAgICAgICAgICAgY2FzZSAnc3luZXJneV9hbm5vdW5jZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTeW5lcmd5QW5ub3VuY2UobG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzeW5lcmd5X3RyaWdnZXInOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3luZXJneVRyaWdnZXIobG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gTk9VVkVMTEVTIEFOSU1BVElPTlMgPT09XHJcblxyXG4gICAgYW5pbWF0ZURvVCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtLCBkb3RDbGFzcykge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKGRvdENsYXNzKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShkb3RDbGFzcyksIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlU3R1bm5lZCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3N0dW5uZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc3R1bm5lZCcpLCAxNDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZU1hcmtlZCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ21hcmtlZCcpO1xyXG4gICAgICAgICAgICAvLyBMYSBtYXJxdWUgcmVzdGUgdmlzaWJsZSBwbHVzIGxvbmd0ZW1wc1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdtYXJrZWQnKSwgMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVCdWZmKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnYnVmZmVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2J1ZmZlZCcpLCAxNDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVN0ZWFsdGgodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzdGVhbHRoZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc3RlYWx0aGVkJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QWJpbGl0eUFuaW1hdGlvbihsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJyksIDcwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGJsaWdodEtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoYmxpZ2h0S2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoYmxpZ2h0S2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBjYXN0ZXJFbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGNhc3RlckVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGNhc3RlckVsLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2luZycpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGNhc3RlckVsLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGFja2luZycpLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBBT0U6IGh1cnQgYWxsIGhpdCBlbmVtaWVzXHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmFsbEhpdHMpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nLmFsbEhpdHMuZm9yRWFjaChoID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGgubmFtZSwgaC50ZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2h1cnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnKSwgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBCbGlnaHQgRE9UIGFuaW1hdGlvbiBvbmx5IG9uIHByaW1hcnkgdGFyZ2V0XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcHJpbWFyeSA9IGxvZy5hbGxIaXRzLmZpbmQoaCA9PiBoLmlzUHJpbWFyeSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHByaW1hcnkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFuaW1hdGVEb1QocHJpbWFyeS5uYW1lLCBwcmltYXJ5LnRlYW0sICdibGlnaHRlZCcpLCAxMDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBGYWxsYmFjayBmb3Igb2xkIGxvZyBmb3JtYXRcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsaWdodGVkJyksIDcwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZVN0dW5uZWQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pLCA3MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcmsnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXJrS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShtYXJrS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngobWFya0tleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkgdGhpcy5hbmltYXRlTWFya2VkKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByaXBvc3RlS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShyaXBvc3RlS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngocmlwb3N0ZUtleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc2VsZl9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZkJ1ZmZLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWJvbWluYXRpb24gVHJhbnNmb3JtYXRpb24gOiBzd2l0Y2ggc2x1ZyB0byBiZWFzdCBwZXJtYW5lbnRseVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2cuYWJpbGl0eU5hbWUgPT09ICdUcmFuc2Zvcm1hdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTbHVnc1tzZWxmQnVmZktleV0gPSAnYmVhc3QnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoc2VsZkJ1ZmZLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChzZWxmQnVmZktleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfaGVhbCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnR5SGVhbEtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHBhcnR5SGVhbEtleSwgJ2hlYWwnKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVIZWFsKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWVyIHRvdXMgbGVzIGFsbGnDqXMgc29pZ27DqXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9nLmhlYWxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2cuaGVhbGVkLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChoLm5hbWUsIGgudGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdoZWFsZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxlZCcpLCAxNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0eUJ1ZmZLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHBhcnR5QnVmZktleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHBhcnR5QnVmZktleSwgJ3NraWxsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBBbmltZXIgdG91cyBsZXMgYWxsacOpcyBkdSBtw6ptZSBjw7R0w6lcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVRlYW1CdWZmKGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdGVhbHRoJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RlYWx0aEtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoc3RlYWx0aEtleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHN0ZWFsdGhLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN0ZWFsdGgobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FybW9yX3BpZXJjZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JhY2tsaW5lX3N0cmlrZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvbnVzX3ZzX21hcmtlZCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgbG9nLmlzQ3JpdCB8fCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZW1lcmdlbmN5X2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbWVyZ0hlYWxLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChlbWVyZ0hlYWxLZXksICdoZWFsJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3RfZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwcm90RG9kZ2VLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5wbGF5Q2hhclNmeChwcm90RG9kZ2VLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlZmVuZChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnKSwgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndWx0cmFfaW5zdGluY3QnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1aUtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUodWlLZXksICdhdHRhY2thbmltYXRpb24ud2VicCcsIDE4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngodWlLZXksICdza2lsbCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVpQ2FzdGVyRWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICh1aUNhc3RlckVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHVpQ2FzdGVyRWwuY2xhc3NMaXN0LmFkZCgndWx0cmEtaW5zdGluY3QtYXR0YWNrJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdWlDYXN0ZXJFbC5jbGFzc0xpc3QucmVtb3ZlKCd1bHRyYS1pbnN0aW5jdC1hdHRhY2snKSwgMTgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgdWlUYXJnZXRFbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1aVRhcmdldEVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB1aVRhcmdldEVsLmNsYXNzTGlzdC5hZGQoJ2h1cnQnLCAnY3JpdCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB1aVRhcmdldEVsLmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnLCAnY3JpdCcpLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSwgNjAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlVGVhbUJ1ZmYoY2FzdGVyVGVhbSkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY2hhcmFjdGVyRWxlbWVudHMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKGNhc3RlclRlYW0pKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2J1ZmZlZCcpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdidWZmZWQnKSwgMTQwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gU1lORVJHWSBBTklNQVRJT05TID09PVxyXG5cclxuICAgIGFuaW1hdGVTeW5lcmd5QW5ub3VuY2UobG9nKSB7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudHJpZ2dlckNoYXIsIGxvZy50ZWFtKTtcclxuICAgICAgICBjb25zdCBwYXJ0bmVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy5wYXJ0bmVyQ2hhciwgbG9nLnRlYW0pO1xyXG5cclxuICAgICAgICBpZiAodHJpZ2dlcikge1xyXG4gICAgICAgICAgICB0cmlnZ2VyLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktYW5ub3VuY2UtZ2xvdycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS1hbm5vdW5jZS1nbG93JyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAocGFydG5lcikge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHBhcnRuZXIuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1hbm5vdW5jZS1nbG93Jyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHBhcnRuZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS1hbm5vdW5jZS1nbG93JyksIDE1MDApO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRHJhdyBTVkcgbGluayBiZXR3ZWVuIHRoZSB0d29cclxuICAgICAgICBpZiAodHJpZ2dlciAmJiBwYXJ0bmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZHJhd1N5bmVyZ3lMaW5rKHRyaWdnZXIsIHBhcnRuZXIpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlU3luZXJneVRyaWdnZXIobG9nKSB7XHJcbiAgICAgICAgY29uc3QgdHJpZ2dlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudHJpZ2dlckNoYXIsIGxvZy50cmlnZ2VyQ2hhclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHBhcnRuZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLnBhcnRuZXJDaGFyLCBsb2cucGFydG5lckNoYXJUZWFtKTtcclxuXHJcbiAgICAgICAgLy8gUGhhc2UgMTogVHJpZ2dlciBnbG93XHJcbiAgICAgICAgaWYgKHRyaWdnZXIpIHtcclxuICAgICAgICAgICAgdHJpZ2dlci5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LXRyaWdnZXItZ2xvdycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRyaWdnZXIuY2xhc3NMaXN0LnJlbW92ZSgnc3luZXJneS10cmlnZ2VyLWdsb3cnKSwgMTgwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQaGFzZSAyOiBTVkcgbGluayBiZXR3ZWVuIHRyaWdnZXIgYW5kIHBhcnRuZXJcclxuICAgICAgICBpZiAodHJpZ2dlciAmJiBwYXJ0bmVyKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5kcmF3U3luZXJneUxpbmsodHJpZ2dlciwgcGFydG5lciksIDQwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBQaGFzZSAzOiBQYXJ0bmVyIHJlYWN0aW9uXHJcbiAgICAgICAgaWYgKHBhcnRuZXIpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBwYXJ0bmVyLmNsYXNzTGlzdC5hZGQoJ3N5bmVyZ3ktcmVhY3QnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcGFydG5lci5jbGFzc0xpc3QucmVtb3ZlKCdzeW5lcmd5LXJlYWN0JyksIDgwMCk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gSWYgaXQncyBhIGJvbnVzIGF0dGFjaywgYW5pbWF0ZSB0aGUgcGFydG5lciBhdHRhY2tpbmdcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuZGFtYWdlICE9PSB1bmRlZmluZWQgJiYgbG9nLnRhcmdldCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnRuZXJLZXkgPSBgJHtsb2cucGFydG5lckNoYXJUZWFtfS0ke2xvZy5wYXJ0bmVyQ2hhcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShwYXJ0bmVyS2V5LCAnYXR0YWNrYW5pbWF0aW9uLndlYnAnLCAxMjAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KHBhcnRuZXJLZXksICdhdHRhY2snKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2h1cnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnKSwgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSwgNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGRyYXdTeW5lcmd5TGluayhlbDEsIGVsMikge1xyXG4gICAgICAgIGNvbnN0IHN0YWdlID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmJhdHRsZS1zdGFnZScpO1xyXG4gICAgICAgIGlmICghc3RhZ2UpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gUmVtb3ZlIGV4aXN0aW5nIFNWRyBpZiBhbnlcclxuICAgICAgICBjb25zdCBleGlzdGluZ1N2ZyA9IHN0YWdlLnF1ZXJ5U2VsZWN0b3IoJy5zeW5lcmd5LWxpbmstc3ZnJyk7XHJcbiAgICAgICAgaWYgKGV4aXN0aW5nU3ZnKSBleGlzdGluZ1N2Zy5yZW1vdmUoKTtcclxuXHJcbiAgICAgICAgY29uc3Qgc3ZnID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdzdmcnKTtcclxuICAgICAgICBzdmcuY2xhc3NMaXN0LmFkZCgnc3luZXJneS1saW5rLXN2ZycpO1xyXG4gICAgICAgIHN2Zy5zZXRBdHRyaWJ1dGUoJ3dpZHRoJywgJzEwMCUnKTtcclxuICAgICAgICBzdmcuc2V0QXR0cmlidXRlKCdoZWlnaHQnLCAnMTAwJScpO1xyXG5cclxuICAgICAgICBjb25zdCBzdGFnZVJlY3QgPSBzdGFnZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCByZWN0MSA9IGVsMS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuICAgICAgICBjb25zdCByZWN0MiA9IGVsMi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcclxuXHJcbiAgICAgICAgY29uc3QgeDEgPSByZWN0MS5sZWZ0ICsgcmVjdDEud2lkdGggLyAyIC0gc3RhZ2VSZWN0LmxlZnQ7XHJcbiAgICAgICAgY29uc3QgeTEgPSByZWN0MS50b3AgKyByZWN0MS5oZWlnaHQgLyAyIC0gc3RhZ2VSZWN0LnRvcDtcclxuICAgICAgICBjb25zdCB4MiA9IHJlY3QyLmxlZnQgKyByZWN0Mi53aWR0aCAvIDIgLSBzdGFnZVJlY3QubGVmdDtcclxuICAgICAgICBjb25zdCB5MiA9IHJlY3QyLnRvcCArIHJlY3QyLmhlaWdodCAvIDIgLSBzdGFnZVJlY3QudG9wO1xyXG5cclxuICAgICAgICBjb25zdCBsaW5lID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudE5TKCdodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZycsICdsaW5lJyk7XHJcbiAgICAgICAgbGluZS5jbGFzc0xpc3QuYWRkKCdzeW5lcmd5LWxpbmstbGluZScpO1xyXG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd4MScsIHgxKTtcclxuICAgICAgICBsaW5lLnNldEF0dHJpYnV0ZSgneTEnLCB5MSk7XHJcbiAgICAgICAgbGluZS5zZXRBdHRyaWJ1dGUoJ3gyJywgeDIpO1xyXG4gICAgICAgIGxpbmUuc2V0QXR0cmlidXRlKCd5MicsIHkyKTtcclxuXHJcbiAgICAgICAgc3ZnLmFwcGVuZENoaWxkKGxpbmUpO1xyXG4gICAgICAgIHN0YWdlLmFwcGVuZENoaWxkKHN2Zyk7XHJcblxyXG4gICAgICAgIC8vIFJlbW92ZSBhZnRlciBhbmltYXRpb25cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHN2Zy5yZW1vdmUoKSwgMTgwMCAvIHRoaXMuc3BlZWQpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBTUFJJVEUgU1dBUCA9PT1cclxuXHJcbiAgICBzd2FwU3ByaXRlKGtleSwgc3ByaXRlTmFtZSwgZHVyYXRpb24pIHtcclxuICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICBpZiAoIWVsKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgc2x1ZyA9IHRoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XTtcclxuICAgICAgICBpZiAoIXNsdWcpIHJldHVybjtcclxuICAgICAgICBjb25zdCBpbWcgPSBlbC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLXNwcml0ZScpO1xyXG4gICAgICAgIGlmICghaW1nKSByZXR1cm47XHJcbiAgICAgICAgaW1nLnNyYyA9IGAvYXNzZXQvaW1nL2NvbWJhdC8ke3NsdWd9LyR7c3ByaXRlTmFtZX1gO1xyXG4gICAgICAgIGlmIChkdXJhdGlvbiA+IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucygnZGVhZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IGAvYXNzZXQvaW1nL2NvbWJhdC8ke3RoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XX0vZmlnaHRpZGxlLndlYnBgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBBTklNQVRJT05TIEVYSVNUQU5URVMgPT09XHJcblxyXG4gICAgYW5pbWF0ZUF0dGFjayhhdHRhY2tlck5hbWUsIGF0dGFja2VyVGVhbSwgdGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSwgaXNDcml0KSB7XHJcbiAgICAgICAgY29uc3QgYXR0YWNrZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoYXR0YWNrZXJOYW1lLCBhdHRhY2tlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGF0dGFja2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2F0dGFja2VyVGVhbX0tJHthdHRhY2tlck5hbWV9YDtcclxuICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKGtleSwgJ2F0dGFja2FuaW1hdGlvbi53ZWJwJywgMTIwMCk7XHJcbiAgICAgICAgICAgIGF0dGFja2VyLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2luZycpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlDaGFyU2Z4KGtleSwgJ2F0dGFjaycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGF0dGFja2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGFja2luZycpLCAxMjAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ3JpdCkgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NyaXQnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnLCAnY3JpdCcpLCA4MDApO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlSGVhbChoZWFsZXJOYW1lLCBoZWFsZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgaGVhbGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGhlYWxlck5hbWUsIGhlYWxlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGhlYWxlcikge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtoZWFsZXJUZWFtfS0ke2hlYWxlck5hbWV9YDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVySGFzSGVhbFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnaGVhbGluZy53ZWJwJywgMTUwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnc2tpbGwud2VicCcsIDE1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhlYWxlci5jbGFzc0xpc3QuYWRkKCdoZWFsaW5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoa2V5LCAnaGVhbCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGhlYWxlci5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsaW5nJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGVhbGVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxlZCcpLCAxNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlZmVuZChkZWZlbmRlck5hbWUsIGRlZmVuZGVyVGVhbSkge1xyXG4gICAgICAgIGNvbnN0IGRlZmVuZGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGRlZmVuZGVyTmFtZSwgZGVmZW5kZXJUZWFtKTtcclxuICAgICAgICBpZiAoZGVmZW5kZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7ZGVmZW5kZXJUZWFtfS0ke2RlZmVuZGVyTmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnZGVmZW5kaW5nLndlYnAnLCAxODAwKTtcclxuICAgICAgICAgICAgZGVmZW5kZXIuY2xhc3NMaXN0LmFkZCgnZGVmZW5kaW5nJyk7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUNoYXJTZngoa2V5LCAnc2tpbGwnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBkZWZlbmRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWZlbmRpbmcnKSwgMTgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEb2RnZSh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RvZGdpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZG9kZ2luZycpLCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlYXRoKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3Qga2V5ID0gYCR7dGFyZ2V0VGVhbX0tJHt0YXJnZXROYW1lfWA7XHJcbiAgICAgICAgY29uc3Qgc2x1ZyA9IHRoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XTtcclxuICAgICAgICBjb25zdCBpbWcgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1zcHJpdGUnKTtcclxuXHJcbiAgICAgICAgLy8gVHJ5IHRvIHN3YXAgdG8gY29ycHNlIGltYWdlXHJcbiAgICAgICAgaWYgKGltZyAmJiBzbHVnKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGNvcnBzZUltZyA9IG5ldyBJbWFnZSgpO1xyXG4gICAgICAgICAgICBjb3Jwc2VJbWcuc3JjID0gYC9hc3NldC9pbWcvY29tYmF0LyR7c2x1Z30vY29ycHNlLnBuZ2A7XHJcbiAgICAgICAgICAgIGNvcnBzZUltZy5vbmxvYWQgPSAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpbWcuc3JjID0gY29ycHNlSW1nLnNyYztcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdkZWFkJywgJ2RlYWQtLWNvcnBzZScpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBjb3Jwc2VJbWcub25lcnJvciA9ICgpID0+IHtcclxuICAgICAgICAgICAgICAgIC8vIE5vIGNvcnBzZSBpbWFnZSBhdmFpbGFibGUsIHVzZSBDU1MgZmFsbGJhY2tcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdkZWFkJyk7XHJcbiAgICAgICAgICAgIH07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RlYWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hhcmFjdGVyRWxlbWVudChuYW1lLCB0ZWFtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcmFjdGVyRWxlbWVudHNbYCR7dGVhbX0tJHtuYW1lfWBdO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlMb2cobG9nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvZ0NvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBlbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBlbnRyeS5jbGFzc05hbWUgPSAnY29tYmF0LWxvZ19fZW50cnknO1xyXG5cclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdyb3VuZCcpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXJvdW5kJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3ZpY3RvcnknKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS12aWN0b3J5Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2RyYXcnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1kZWZlYXQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYWJpbGl0eV91c2UnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1hYmlsaXR5Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsZWVkX3RpY2snKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1ibGVlZCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdibGlnaHRfdGljaycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWJsaWdodCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdzdHVubmVkX3NraXAnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1zdHVuJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3JpcG9zdGVfYWN0aXZhdGUnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1yaXBvc3RlJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3N5bmVyZ3lfYW5ub3VuY2UnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1zeW5lcmd5LWFubm91bmNlJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3N5bmVyZ3lfdHJpZ2dlcicpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXN5bmVyZ3ktdHJpZ2dlcicpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZW50cnkuaW5uZXJIVE1MID0gbG9nLm1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIuYXBwZW5kQ2hpbGQoZW50cnkpO1xyXG4gICAgICAgIHRoaXMubG9nQ29udGFpbmVyLnNjcm9sbFRvcCA9IHRoaXMubG9nQ29udGFpbmVyLnNjcm9sbEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVIZWFsdGhCYXJzKGxvZykge1xyXG4gICAgICAgIGxldCBjaGFyYWN0ZXJOYW1lID0gbnVsbDtcclxuICAgICAgICBsZXQgdGVhbU5hbWUgPSBudWxsO1xyXG4gICAgICAgIGxldCBjdXJyZW50SFAgPSBudWxsO1xyXG4gICAgICAgIGxldCBtYXhIUCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIETDqXRlcm1pbmVyIGxlcyBkb25uw6llcyBzZWxvbiBsZSB0eXBlIGRlIGxvZ1xyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2F0dGFjaycgfHwgbG9nLnR5cGUgPT09ICdyaXBvc3RlX2FjdGl2YXRlJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnaGVhbCcpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsZWVkX3RpY2snIHx8IGxvZy50eXBlID09PSAnYmxpZ2h0X3RpY2snKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdhYmlsaXR5X3VzZScpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVBYmlsaXR5SGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3N5bmVyZ3lfdHJpZ2dlcicpIHtcclxuICAgICAgICAgICAgLy8gU3luZXJnaWVzIGNhbiBjYXVzZSBkYW1hZ2VcclxuICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldEhQICE9PSB1bmRlZmluZWQgJiYgbG9nLnRhcmdldE1heEhQKSB7XHJcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgc2kgbm91cyBhdm9ucyBsZXMgZG9ubsOpZXMgbsOpY2Vzc2FpcmVzXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlck5hbWUgJiYgdGVhbU5hbWUgJiYgY3VycmVudEhQICE9PSBudWxsICYmIGN1cnJlbnRIUCAhPT0gdW5kZWZpbmVkICYmIG1heEhQKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCwgbWF4SFApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBYmlsaXR5SGVhbHRoQmFycyhsb2cpIHtcclxuICAgICAgICAvLyBBT0UgaGl0cyAoYmxpZ2h0X2F0dGFjayk6IHVwZGF0ZSBIUCBmb3IgYWxsIGhpdCBlbmVtaWVzXHJcbiAgICAgICAgaWYgKGxvZy5hbGxIaXRzKSB7XHJcbiAgICAgICAgICAgIGxvZy5hbGxIaXRzLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGgubmFtZSwgaC50ZWFtLCBoLmhwLCBoLm1heEhwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIC8vIENvbXDDqXRlbmNlcyBxdWkgaW5mbGlnZW50IGRlcyBkw6lnw6J0cyDDoCB1bmUgY2libGVcclxuICAgICAgICBlbHNlIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRIUCAhPT0gdW5kZWZpbmVkICYmIGxvZy50YXJnZXRNYXhIUCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cudGFyZ2V0SFAsIGxvZy50YXJnZXRNYXhIUCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTb2luIGRlIGdyb3VwZSA6IG1ldHRyZSDDoCBqb3VyIGNoYXF1ZSBhbGxpw6kgc29pZ27DqVxyXG4gICAgICAgIGlmIChsb2cuc3VidHlwZSA9PT0gJ3BhcnR5X2hlYWwnICYmIGxvZy5oZWFsZWQpIHtcclxuICAgICAgICAgICAgbG9nLmhlYWxlZC5mb3JFYWNoKGggPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChoLm5hbWUsIGgudGVhbSwgaC5ocCwgaC5tYXhIcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU29pbiBkJ3VyZ2VuY2UgOiBtZXR0cmUgw6Agam91ciBsZSBsYW5jZXVyXHJcbiAgICAgICAgaWYgKGxvZy5zdWJ0eXBlID09PSAnZW1lcmdlbmN5X2hlYWwnICYmIGxvZy5jYXN0ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldEhQLCBsb2cudGFyZ2V0TWF4SFApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDaGFyYWN0ZXJIUChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCBtYXhIUCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSk7XHJcblxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBtYXhIUCA+IDAgPyAoY3VycmVudEhQIC8gbWF4SFApICogMTAwIDogMDtcclxuXHJcbiAgICAgICAgLy8gTWlzZSDDoCBqb3VyIGRlIGxhIGJhcnJlIEhQIGRhbnMgbGEgem9uZSBkZSBjb21iYXQgKGJhdHRsZS1zdGFnZSlcclxuICAgICAgICBjb25zdCBocEJhciA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuaHAtYmFyX19maWxsJyk7XHJcbiAgICAgICAgY29uc3QgaHBUZXh0ID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcblxyXG4gICAgICAgIGlmIChocEJhcikge1xyXG4gICAgICAgICAgICAvLyBBbmltYXRpb24gZmx1aWRlIGRlIGxhIGJhcnJlXHJcbiAgICAgICAgICAgIGhwQmFyLnN0eWxlLnRyYW5zaXRpb24gPSBgd2lkdGggMC4zcyBlYXNlLW91dGA7XHJcbiAgICAgICAgICAgIGhwQmFyLnN0eWxlLndpZHRoID0gYCR7cGVyY2VudH0lYDtcclxuXHJcbiAgICAgICAgICAgIC8vIENsYXNzZXMgZGUgY291bGV1ciBzZWxvbiBsZSBwb3VyY2VudGFnZVxyXG4gICAgICAgICAgICBocEJhci5jbGFzc0xpc3QucmVtb3ZlKCdocC1iYXJfX2ZpbGwtLWxvdycsICdocC1iYXJfX2ZpbGwtLWNyaXRpY2FsJyk7XHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50IDw9IDI1KSB7XHJcbiAgICAgICAgICAgICAgICBocEJhci5jbGFzc0xpc3QuYWRkKCdocC1iYXJfX2ZpbGwtLWNyaXRpY2FsJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGVyY2VudCA8PSA1MCkge1xyXG4gICAgICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LmFkZCgnaHAtYmFyX19maWxsLS1sb3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhwVGV4dCkge1xyXG4gICAgICAgICAgICBocFRleHQudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50SFB9LyR7bWF4SFB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1pc2Ugw6Agam91ciBkZXMgcGFubmVhdXggZCdpbmZvIGxhdMOpcmF1eFxyXG4gICAgICAgIHRoaXMudXBkYXRlSW5mb1BhbmVsKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUluZm9QYW5lbChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQKSB7XHJcbiAgICAgICAgLy8gVHJvdXZlciBsZSBib24gcGFubmVhdSBzZWxvbiBsJ8OpcXVpcGVcclxuICAgICAgICBjb25zdCBwYW5lbENsYXNzID0gdGVhbU5hbWUgPT09ICdFcXVpcGUgMScgPyAnLmluZm8tcGFuZWwtLXRlYW0xJyA6ICcuaW5mby1wYW5lbC0tdGVhbTInO1xyXG4gICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihwYW5lbENsYXNzKTtcclxuXHJcbiAgICAgICAgaWYgKCFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBUcm91dmVyIGxlIHBlcnNvbm5hZ2UgZGFucyBsZSBwYW5uZWF1IHBhciBzb24gbm9tXHJcbiAgICAgICAgY29uc3QgY2hhcmFjdGVySW5mb3MgPSBwYW5lbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hhcmFjdGVyLWluZm8nKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGluZm8gb2YgY2hhcmFjdGVySW5mb3MpIHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZUVsID0gaW5mby5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX25hbWUnKTtcclxuICAgICAgICAgICAgaWYgKG5hbWVFbCAmJiBuYW1lRWwudGV4dENvbnRlbnQudHJpbSgpID09PSBjaGFyYWN0ZXJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0c1NwYW4gPSBpbmZvLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fc3RhdHMgc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRzU3Bhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzU3Bhbi50ZXh0Q29udGVudCA9IGN1cnJlbnRIUDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGZsYXNoIHBvdXIgbW9udHJlciBsZSBjaGFuZ2VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNTcGFuLmNsYXNzTGlzdC5hZGQoJ2hwLXVwZGF0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHN0YXRzU3Bhbi5jbGFzc0xpc3QucmVtb3ZlKCdocC11cGRhdGVkJyksIDMwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93VmljdG9yeU92ZXJsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUGxheSB2aWN0b3J5IG9yIGRlZmVhdCBtdXNpY1xyXG4gICAgICAgIHRoaXMucGxheUVuZE11c2ljKCk7XHJcblxyXG4gICAgICAgIC8vIEZpbmFsaXNlciBsZSBNTVIgYSBsYSBmaW4gZHUgY29tYmF0XHJcbiAgICAgICAgdGhpcy5maW5hbGl6ZVJhdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXlFbmRNdXNpYygpIHtcclxuICAgICAgICAvLyBTdG9wIGNvbWJhdCBtdXNpY1xyXG4gICAgICAgIGlmICh0aGlzLmNvbWJhdE11c2ljKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY29tYmF0TXVzaWMucGF1c2UoKTtcclxuICAgICAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG51bGw7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBEZXRlcm1pbmUgb3V0Y29tZSBmcm9tIG92ZXJsYXkgY2xhc3NcclxuICAgICAgICBsZXQgdHJhY2sgPSBudWxsO1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2JhdHRsZS1zdGFnZV9fb3ZlcmxheS0tdmljdG9yeScpKSB7XHJcbiAgICAgICAgICAgICAgICB0cmFjayA9ICcvYXNzZXQvb3N0L3dpbmxvc2UvdmljdG9yeS5tcDMnO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMub3ZlcmxheS5jbGFzc0xpc3QuY29udGFpbnMoJ2JhdHRsZS1zdGFnZV9fb3ZlcmxheS0tZGVmZWF0JykpIHtcclxuICAgICAgICAgICAgICAgIHRyYWNrID0gJy9hc3NldC9vc3Qvd2lubG9zZS9kZWZlYXQubXAzJztcclxuICAgICAgICAgICAgfSBlbHNlIGlmICh0aGlzLm92ZXJsYXkuY2xhc3NMaXN0LmNvbnRhaW5zKCdiYXR0bGUtc3RhZ2VfX292ZXJsYXktLWRyYXcnKSkge1xyXG4gICAgICAgICAgICAgICAgdHJhY2sgPSAnL2Fzc2V0L29zdC93aW5sb3NlL2RlZmVhdC5tcDMnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodHJhY2sgJiYgIXRoaXMuaXNNdXRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmVuZE11c2ljID0gbmV3IEF1ZGlvKHRyYWNrKTtcclxuICAgICAgICAgICAgdGhpcy5lbmRNdXNpYy52b2x1bWUgPSB0aGlzLnZvbHVtZTtcclxuICAgICAgICAgICAgdGhpcy5lbmRNdXNpYy5wbGF5KCkuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmaW5hbGl6ZVJhdGluZygpIHtcclxuICAgICAgICBjb25zdCBmaW5hbGl6ZVVybCA9IHRoaXMuY29udGFpbmVyLmRhdGFzZXQuZmluYWxpemVVcmw7XHJcbiAgICAgICAgaWYgKCFmaW5hbGl6ZVVybCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBmZXRjaChmaW5hbGl6ZVVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICYmIGRhdGEucmF0aW5nQ2hhbmdlICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSYXRpbmdVcGRhdGUoZGF0YS5yYXRpbmdDaGFuZ2UsIGRhdGEubmV3UmF0aW5nLCBkYXRhLm5ld1JhdGluZzIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBmaW5hbGlzYXRpb24gcmF0aW5nOicsIGVycikpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dSYXRpbmdVcGRhdGUoY2hhbmdlLCBuZXdSYXRpbmcsIG5ld1JhdGluZzIpIHtcclxuICAgICAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIE1NUiBhZmZpY2hlIGRhbnMgbGUgcGFubmVhdSBqb3VldXIgKEVxdWlwZSAxKVxyXG4gICAgICAgIGNvbnN0IHJhdGluZ0VsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0xIC5pbmZvLXBhbmVsX19yYXRpbmcnKTtcclxuICAgICAgICBpZiAocmF0aW5nRWwgJiYgbmV3UmF0aW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7bmV3UmF0aW5nfSBNTVJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIGEgam91ciBsZSBNTVIgYWZmaWNoZSBkYW5zIGxlIHBhbm5lYXUgYWR2ZXJzYWlyZSAoRXF1aXBlIDIpXHJcbiAgICAgICAgY29uc3QgcmF0aW5nRWwyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0yIC5pbmZvLXBhbmVsX19yYXRpbmctLWVuZW15Jyk7XHJcbiAgICAgICAgaWYgKHJhdGluZ0VsMiAmJiBuZXdSYXRpbmcyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsMi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke25ld1JhdGluZzJ9IE1NUmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZmZpY2hlciBsYSBub3RpZmljYXRpb24gZGUgY2hhbmdlbWVudCBkYW5zIGwnb3ZlcmxheVxyXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtb3ZlcmxheV0nKTtcclxuICAgICAgICBpZiAob3ZlcmxheSkge1xyXG4gICAgICAgICAgICBjb25zdCB3aW5uZXJEaXYgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGUtc3RhZ2VfX3dpbm5lcicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hhbmdlbWVudCBNTVIgRXF1aXBlIDFcclxuICAgICAgICAgICAgY29uc3Qgbm90aWYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG5vdGlmMS5jbGFzc05hbWUgPSAncmF0aW5nLWNoYW5nZSc7XHJcbiAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZToxLjJyZW07bWFyZ2luLXRvcDoxMnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMS50ZXh0Q29udGVudCA9IGNoYW5nZSA+IDAgPyBgRXF1aXBlIDEgOiArJHtjaGFuZ2V9IE1NUmAgOiBgRXF1aXBlIDEgOiAke2NoYW5nZX0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYxLnN0eWxlLmNvbG9yID0gY2hhbmdlID4gMCA/ICcjNGNhZjUwJyA6ICcjZjQ0MzM2JztcclxuICAgICAgICAgICAgd2lubmVyRGl2LmFwcGVuZENoaWxkKG5vdGlmMSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGFuZ2VtZW50IE1NUiBFcXVpcGUgMiAoaW52ZXJzZSlcclxuICAgICAgICAgICAgY29uc3QgY2hhbmdlMiA9IC1jaGFuZ2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBub3RpZjIuY2xhc3NOYW1lID0gJ3JhdGluZy1jaGFuZ2UnO1xyXG4gICAgICAgICAgICBub3RpZjIuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MS4ycmVtO21hcmdpbi10b3A6NnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMi50ZXh0Q29udGVudCA9IGNoYW5nZTIgPiAwID8gYEVxdWlwZSAyIDogKyR7Y2hhbmdlMn0gTU1SYCA6IGBFcXVpcGUgMiA6ICR7Y2hhbmdlMn0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYyLnN0eWxlLmNvbG9yID0gY2hhbmdlMiA+IDAgPyAnIzRjYWY1MCcgOiAnI2Y0NDMzNic7XHJcbiAgICAgICAgICAgIHdpbm5lckRpdi5hcHBlbmRDaGlsZChub3RpZjIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3RpZjEuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gQVVESU8gPT09XHJcblxyXG4gICAgcGxheU5leHRUcmFjaygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuYXVkaW9VbmxvY2tlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jb21iYXRNdXNpYykge1xyXG4gICAgICAgICAgICB0aGlzLmNvbWJhdE11c2ljLnBhdXNlKCk7XHJcbiAgICAgICAgICAgIHRoaXMuY29tYmF0TXVzaWMgPSBudWxsO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgaWR4ID0gdGhpcy5nZXRSYW5kb21UcmFja0luZGV4KCk7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYyA9IG5ldyBBdWRpbyh0aGlzLmNvbWJhdFBsYXlsaXN0W2lkeF0pO1xyXG4gICAgICAgIHRoaXMuY29tYmF0TXVzaWMudm9sdW1lID0gdGhpcy5pc011dGVkID8gMCA6IHRoaXMudm9sdW1lO1xyXG4gICAgICAgIHRoaXMuY29tYmF0TXVzaWMuYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoKSA9PiB0aGlzLnBsYXlOZXh0VHJhY2soKSk7XHJcbiAgICAgICAgdGhpcy5jb21iYXRNdXNpYy5wbGF5KCkuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIGdldFJhbmRvbVRyYWNrSW5kZXgoKSB7XHJcbiAgICAgICAgbGV0IGk7XHJcbiAgICAgICAgZG8ge1xyXG4gICAgICAgICAgICBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5jb21iYXRQbGF5bGlzdC5sZW5ndGgpO1xyXG4gICAgICAgIH0gd2hpbGUgKGkgPT09IHRoaXMubGFzdFRyYWNrSW5kZXggJiYgdGhpcy5jb21iYXRQbGF5bGlzdC5sZW5ndGggPiAxKTtcclxuICAgICAgICB0aGlzLmxhc3RUcmFja0luZGV4ID0gaTtcclxuICAgICAgICByZXR1cm4gaTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVNdXRlKCkge1xyXG4gICAgICAgIHRoaXMuaXNNdXRlZCA9ICF0aGlzLmlzTXV0ZWQ7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tYmF0TXVzaWMpIHtcclxuICAgICAgICAgICAgdGhpcy5jb21iYXRNdXNpYy52b2x1bWUgPSB0aGlzLmlzTXV0ZWQgPyAwIDogdGhpcy52b2x1bWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmVuZE11c2ljKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZW5kTXVzaWMudm9sdW1lID0gdGhpcy5pc011dGVkID8gMCA6IHRoaXMudm9sdW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tdXRlQnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGljb24gPSB0aGlzLm11dGVCdG4ucXVlcnlTZWxlY3RvcignaScpO1xyXG4gICAgICAgICAgICBpZiAoaWNvbikge1xyXG4gICAgICAgICAgICAgICAgaWNvbi5jbGFzc05hbWUgPSB0aGlzLmlzTXV0ZWQgPyAnZmFzIGZhLXZvbHVtZS1tdXRlJyA6ICdmYXMgZmEtdm9sdW1lLXVwJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy52b2x1bWVTbGlkZXIpIHtcclxuICAgICAgICAgICAgdGhpcy52b2x1bWVTbGlkZXIuZGlzYWJsZWQgPSB0aGlzLmlzTXV0ZWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnNmeFNsaWRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnNmeFNsaWRlci5kaXNhYmxlZCA9IHRoaXMuaXNNdXRlZDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IFNGWCA9PT1cclxuXHJcbiAgICAvKipcclxuICAgICAqIFByZS1sb2FkIGFuZCBjYWNoZSBhbiBhdWRpbyBmaWxlLCByZXR1cm5zIHRoZSBjYWNoZWQgQXVkaW8gY2xvbmUgZm9yIHBsYXliYWNrLlxyXG4gICAgICovXHJcbiAgICBsb2FkU2Z4KHBhdGgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2Z4Q2FjaGVbcGF0aF0pIHtcclxuICAgICAgICAgICAgdGhpcy5zZnhDYWNoZVtwYXRoXSA9IG5ldyBBdWRpbyhwYXRoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuc2Z4Q2FjaGVbcGF0aF07XHJcbiAgICB9XHJcblxyXG4gICAgLyoqXHJcbiAgICAgKiBQbGF5IGEgc291bmQgZWZmZWN0IGZvciBhIGNoYXJhY3RlciBhY3Rpb24uXHJcbiAgICAgKiBAcGFyYW0ge3N0cmluZ30gc2x1ZyAtIGNoYXJhY3RlciBzbHVnIChlLmcuICdjcnVzYWRlcicsICdwbGFndWUtZG9jdG9yJylcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBzZnhOYW1lIC0gc291bmQgZmlsZSBuYW1lIChlLmcuICdhdHRhY2tzb3VuZCcsICdza2lsbHNvdW5kJywgJ2hlYWwnKVxyXG4gICAgICovXHJcbiAgICBwbGF5U2Z4KHNsdWcsIHNmeE5hbWUpIHtcclxuICAgICAgICBpZiAodGhpcy5pc011dGVkIHx8ICFzbHVnKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IHBhdGggPSBgL2Fzc2V0L29zdC92ZngvJHtzbHVnfS8ke3NmeE5hbWV9LndhdmA7XHJcbiAgICAgICAgY29uc3QgY2FjaGVkID0gdGhpcy5sb2FkU2Z4KHBhdGgpO1xyXG5cclxuICAgICAgICAvLyBDbG9uZSB0aGUgYXVkaW8gbm9kZSBzbyBvdmVybGFwcGluZyBwbGF5cyBkb24ndCBjdXQgZWFjaCBvdGhlciBvZmZcclxuICAgICAgICBjb25zdCBzb3VuZCA9IGNhY2hlZC5jbG9uZU5vZGUoKTtcclxuICAgICAgICBzb3VuZC52b2x1bWUgPSB0aGlzLnNmeFZvbHVtZTtcclxuICAgICAgICBzb3VuZC5wbGF5KCkuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIC8qKlxyXG4gICAgICogUGxheSB0aGUgYXBwcm9wcmlhdGUgU0ZYIGZvciBhIGNoYXJhY3RlciBnaXZlbiB0aGVpciBrZXkgYW5kIGFjdGlvbiB0eXBlLlxyXG4gICAgICogQHBhcmFtIHtzdHJpbmd9IGtleSAtIGNoYXJhY3RlciBrZXkgKGUuZy4gJ0VxdWlwZSAxLUNydXNhZGVyJylcclxuICAgICAqIEBwYXJhbSB7c3RyaW5nfSBhY3Rpb24gLSAnYXR0YWNrJywgJ3NraWxsJywgb3IgJ2hlYWwnXHJcbiAgICAgKi9cclxuICAgIHBsYXlDaGFyU2Z4KGtleSwgYWN0aW9uKSB7XHJcbiAgICAgICAgY29uc3Qgc2x1ZyA9IHRoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XTtcclxuICAgICAgICBpZiAoIXNsdWcpIHJldHVybjtcclxuXHJcbiAgICAgICAgc3dpdGNoIChhY3Rpb24pIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheVNmeChzbHVnLCAnYXR0YWNrc291bmQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzpcclxuICAgICAgICAgICAgICAgIC8vIFRyeSBoZWFsLndhdiBmaXJzdCwgZmFsbGJhY2sgdG8gc2tpbGxzb3VuZC53YXZcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmNoYXJhY3Rlckhhc0hlYWxba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheVNmeChzbHVnLCAnaGVhbCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnBsYXlTZngoc2x1ZywgJ3NraWxsc291bmQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdza2lsbCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlTZngoc2x1ZywgJ3NraWxsc291bmQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQbGF5QnV0dG9uKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wbGF5QnRuKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZyAmJiAhdGhpcy5pc1BhdXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSAnUGF1c2UnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSAnVGVybWluw6knO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9IHRoaXMuY3VycmVudEluZGV4ID4gMCA/ICdSZXByZW5kcmUnIDogJ0xhbmNlcic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBJbml0aWFsaXNlciBxdWFuZCBsZSBET00gZXN0IHByw6p0XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBjb21iYXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtbG9nc10nKTtcclxuICAgIGlmIChjb21iYXRDb250YWluZXIpIHtcclxuICAgICAgICBuZXcgQ29tYmF0Q29udHJvbGxlcihjb21iYXRDb250YWluZXIpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbWJhdENvbnRyb2xsZXI7XHJcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIEZSSUVORCBTWVNURU1cclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi50ZXh0Q29udGVudCA9IHN0cjtcclxuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy10b2dnbGVdJyk7XHJcbiAgICBjb25zdCBwYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtcGFuZWxdJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtYmFja2Ryb3BdJyk7XHJcbiAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtY2xvc2VdJyk7XHJcbiAgICBjb25zdCBiYWRnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtYmFkZ2VdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBhbmVsKSByZXR1cm47XHJcblxyXG4gICAgbGV0IHBhbmVsT3BlbiA9IGZhbHNlO1xyXG4gICAgbGV0IGN1cnJlbnRUYWIgPSAnZnJpZW5kcyc7XHJcbiAgICBsZXQgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IG51bGw7XHJcbiAgICBsZXQgbGFzdE1lc3NhZ2VJZCA9IDA7XHJcbiAgICBsZXQgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICBsZXQgdW5yZWFkUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgIGxldCBmcmllbmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICBsZXQgcmVxdWVzdHNMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFBBTkVMIE9QRU4vQ0xPU0VcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gb3BlblBhbmVsKCkge1xyXG4gICAgICAgIHBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgcGFuZWwub2Zmc2V0SGVpZ2h0OyAvLyByZWZsb3dcclxuICAgICAgICBwYW5lbC5jbGFzc0xpc3QuYWRkKCdmcmllbmRzLXBhbmVsLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnZnJpZW5kcy1wYW5lbF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBwYW5lbE9wZW4gPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIWZyaWVuZHNMb2FkZWQpIHtcclxuICAgICAgICAgICAgbG9hZEZyaWVuZHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQYW5lbCgpIHtcclxuICAgICAgICBwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdmcmllbmRzLXBhbmVsLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnZnJpZW5kcy1wYW5lbF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBwYW5lbE9wZW4gPSBmYWxzZTtcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHBhbmVsT3BlbiA/IGNsb3NlUGFuZWwoKSA6IG9wZW5QYW5lbCgpKTtcclxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQYW5lbCk7XHJcbiAgICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUGFuZWwpO1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gVEFCU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mcmllbmRzLXRhYl0nKS5mb3JFYWNoKHRhYkJ0biA9PiB7XHJcbiAgICAgICAgdGFiQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YWJOYW1lID0gdGFiQnRuLmRhdGFzZXQuZnJpZW5kc1RhYjtcclxuICAgICAgICAgICAgc3dpdGNoVGFiKHRhYk5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc3dpdGNoVGFiKHRhYk5hbWUpIHtcclxuICAgICAgICBjdXJyZW50VGFiID0gdGFiTmFtZTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZnJpZW5kcy10YWJdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgnZnJpZW5kcy1wYW5lbF9fdGFiLS1hY3RpdmUnLCBidG4uZGF0YXNldC5mcmllbmRzVGFiID09PSB0YWJOYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiLWNvbnRlbnRdJykuZm9yRWFjaChjb250ZW50ID0+IHtcclxuICAgICAgICAgICAgY29udGVudC5zdHlsZS5kaXNwbGF5ID0gY29udGVudC5kYXRhc2V0LnRhYkNvbnRlbnQgPT09IHRhYk5hbWUgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fdGFicycpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX2NvbnRlbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNvbnZlcnNhdGlvbl0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG5cclxuICAgICAgICBpZiAodGFiTmFtZSA9PT0gJ2ZyaWVuZHMnICYmICFmcmllbmRzTG9hZGVkKSBsb2FkRnJpZW5kcygpO1xyXG4gICAgICAgIGlmICh0YWJOYW1lID09PSAncmVxdWVzdHMnICYmICFyZXF1ZXN0c0xvYWRlZCkgbG9hZFJlcXVlc3RzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBMT0FEIEZSSUVORFMgTElTVFxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBsb2FkRnJpZW5kcygpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YWItY29udGVudD1cImZyaWVuZHNcIl0nKTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19sb2FkaW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBDaGFyZ2VtZW50Li4uPC9kaXY+JztcclxuXHJcbiAgICAgICAgZmV0Y2goJy9mcmllbmRzL2xpc3QnLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBmcmllbmRzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuZnJpZW5kcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPjxpIGNsYXNzPVwiZmFzIGZhLWdob3N0XCI+PC9pPiBBdWN1biBjb21wYWdub24uLi4gTGUgZG9uam9uIGVzdCBzb2xpdGFpcmUuPC9wPic7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhLmZyaWVuZHMubWFwKGYgPT4gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCIgZGF0YS1mcmllbmQtdXNlci1pZD1cIiR7Zi51c2VySWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtmLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwoZi5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbChmLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoZi51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19wcmV2aWV3XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2YubGFzdE1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChmLmxhc3RNZXNzYWdlLmlzRnJvbU1lID8gJ1ZvdXM6ICcgOiAnJykgKyBlc2NhcGVIdG1sKGYubGFzdE1lc3NhZ2UuY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdBdWN1biBtZXNzYWdlJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3JhdGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHtmLnJhdGluZ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmZyaWVuZC1pdGVtJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlcklkID0gcGFyc2VJbnQoaXRlbS5kYXRhc2V0LmZyaWVuZFVzZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmZyaWVuZC1pdGVtX19uYW1lJykudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbkNvbnZlcnNhdGlvbih1c2VySWQsIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RXJyZXVyIGRlIGNoYXJnZW1lbnQ8L3A+JztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIExPQUQgUEVORElORyBSRVFVRVNUU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBsb2FkUmVxdWVzdHMoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGFiLWNvbnRlbnQ9XCJyZXF1ZXN0c1wiXScpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+IENoYXJnZW1lbnQuLi48L2Rpdj4nO1xyXG5cclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvcGVuZGluZycsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVxdWVzdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5BdWN1bmUgZGVtYW5kZSBlbiBhdHRlbnRlPC9wPic7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhLnJlcXVlc3RzLm1hcChyID0+IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiIGRhdGEtcmVxdWVzdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtyLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwoci5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbChyLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoci51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19wcmV2aWV3XCI+JHtlc2NhcGVIdG1sKHIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1hY2NlcHRcIiBkYXRhLWFjY2VwdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1jaGVja1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXJlamVjdFwiIGRhdGEtcmVqZWN0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hY2NlcHQtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlcXVlc3QoYnRuLmRhdGFzZXQuYWNjZXB0SWQsICdhY2NlcHQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZWplY3QtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlcXVlc3QoYnRuLmRhdGFzZXQucmVqZWN0SWQsICdyZWplY3QnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChmcmllbmRzaGlwSWQsIGFjdGlvbikge1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy8ke2FjdGlvbn0vJHtmcmllbmRzaGlwSWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsb2FkUmVxdWVzdHMoKTtcclxuICAgICAgICAgICAgICAgIGZldGNoVW5yZWFkQ291bnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gU0VBUkNIIFVTRVJTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1zZWFyY2gtaW5wdXRdJyk7XHJcbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1zZWFyY2gtcmVzdWx0c10nKTtcclxuICAgIGxldCBzZWFyY2hUaW1lb3V0ID0gbnVsbDtcclxuXHJcbiAgICBpZiAoc2VhcmNoSW5wdXQpIHtcclxuICAgICAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNlYXJjaFRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChxdWVyeS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmZXRjaChgL2ZyaWVuZHMvc2VhcmNoP3E9JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnkpfWAsIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS51c2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkF1Y3VuIGd1ZXJyaWVyIHRyb3V2ZTwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9IGRhdGEudXNlcnMubWFwKHUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aW9uSHRtbCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdhY2NlcHRlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5BbWk8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ3BlbmRpbmdfc2VudCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5FbnZveWVlPC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdwZW5kaW5nX3JlY2VpdmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPlJlY3VlPC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gYDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLWFkZFwiIGRhdGEtYWRkLWZyaWVuZC1pZD1cIiR7dS51c2VySWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGx1c1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3UucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbCh1LnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKHUudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbCh1LnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3JhdGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHt1LnJhdGluZ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hY3Rpb25zXCI+JHthY3Rpb25IdG1sfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWRkLWZyaWVuZC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZEZyaWVuZFJlcXVlc3QoYnRuLmRhdGFzZXQuYWRkRnJpZW5kSWQsIGJ0bik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VuZEZyaWVuZFJlcXVlc3QodXNlcklkLCBidG4pIHtcclxuICAgICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9yZXF1ZXN0LyR7dXNlcklkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBidG4ub3V0ZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+RW52b3llZTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IGJ0bi5kaXNhYmxlZCA9IGZhbHNlOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXBvcnRNZXNzYWdlQWN0aW9uKG1lc3NhZ2VJZCwgYnRuKSB7XHJcbiAgICAgICAgY29uc3QgcmVhc29uID0gcHJvbXB0KCdSYWlzb24gZHUgc2lnbmFsZW1lbnQgOicpO1xyXG4gICAgICAgIGlmIChyZWFzb24gPT09IG51bGwpIHJldHVybjsgLy8gY2FuY2VsbGVkXHJcblxyXG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7bWVzc2FnZUlkfS9yZXBvcnRgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcmVhc29uOiByZWFzb24gfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBidG4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrXCI+PC9pPic7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnY2hhdC1tZXNzYWdlX19yZXBvcnQtLWRvbmUnKTtcclxuICAgICAgICAgICAgICAgIGJ0bi50aXRsZSA9ICdTaWduYWxlJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4geyBidG4uZGlzYWJsZWQgPSBmYWxzZTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBDT05WRVJTQVRJT05cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gb3BlbkNvbnZlcnNhdGlvbih1c2VySWQsIHVzZXJuYW1lKSB7XHJcbiAgICAgICAgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgICBsYXN0TWVzc2FnZUlkID0gMDtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX3RhYnMnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19jb250ZW50Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBjb25zdCBjb252RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNvbnZlcnNhdGlvbl0nKTtcclxuICAgICAgICBjb252RWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW5hbWVdJykudGV4dENvbnRlbnQgPSB1c2VybmFtZTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW1lc3NhZ2VzXScpO1xyXG4gICAgICAgIG1lc3NhZ2VzRWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19sb2FkaW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBDaGFyZ2VtZW50Li4uPC9kaXY+JztcclxuXHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7dXNlcklkfWAsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKGRhdGEubWVzc2FnZXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgc3RhcnRNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlck1lc3NhZ2VzKG1lc3NhZ2VzLCBhcHBlbmQpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW1lc3NhZ2VzXScpO1xyXG5cclxuICAgICAgICBpZiAoIWFwcGVuZCkge1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RGVidXQgZGUgbGEgY29udmVyc2F0aW9uLiBFbnZveWV6IGxlIHByZW1pZXIgbWVzc2FnZSE8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzRWwuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNpIG9uIGFqb3V0ZSBkZXMgbWVzc2FnZXMgZXQgcXVlIGxlIGNvbnRlbmV1ciBhZmZpY2hlIGxlIHBsYWNlaG9sZGVyLCBsZSBzdXBwcmltZXJcclxuICAgICAgICBpZiAoYXBwZW5kICYmIG1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBtZXNzYWdlc0VsLnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19lbXB0eScpO1xyXG4gICAgICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHBsYWNlaG9sZGVyLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtc2cgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLmlkID4gbGFzdE1lc3NhZ2VJZCkgbGFzdE1lc3NhZ2VJZCA9IG1zZy5pZDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2hhdC1tZXNzYWdlJywgbXNnLmlzRnJvbU1lID8gJ2NoYXQtbWVzc2FnZS0tbWluZScgOiAnY2hhdC1tZXNzYWdlLS10aGVpcnMnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXBvcnRCdG4gPSAnJztcclxuICAgICAgICAgICAgaWYgKCFtc2cuaXNGcm9tTWUpIHtcclxuICAgICAgICAgICAgICAgIHJlcG9ydEJ0biA9IGA8YnV0dG9uIGNsYXNzPVwiY2hhdC1tZXNzYWdlX19yZXBvcnRcIiBkYXRhLXJlcG9ydC1tc2ctaWQ9XCIke21zZy5pZH1cIiB0aXRsZT1cIlNpZ25hbGVyIGNlIG1lc3NhZ2VcIj48aSBjbGFzcz1cImZhcyBmYS1mbGFnXCI+PC9pPjwvYnV0dG9uPmA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICAke2VzY2FwZUh0bWwobXNnLmNvbnRlbnQpfVxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGF0LW1lc3NhZ2VfX3RpbWVcIj4ke2VzY2FwZUh0bWwobXNnLmRhdGUpfSAke3JlcG9ydEJ0bn08L3NwYW4+XHJcbiAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgICAgICAvLyBBdHRhY2ggcmVwb3J0IGhhbmRsZXJcclxuICAgICAgICAgICAgY29uc3QgcmVwb3J0RWwgPSBkaXYucXVlcnlTZWxlY3RvcignW2RhdGEtcmVwb3J0LW1zZy1pZF0nKTtcclxuICAgICAgICAgICAgaWYgKHJlcG9ydEVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnRFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRNZXNzYWdlQWN0aW9uKHJlcG9ydEVsLmRhdGFzZXQucmVwb3J0TXNnSWQsIHJlcG9ydEVsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZXNzYWdlc0VsLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1lc3NhZ2VzRWwuc2Nyb2xsVG9wID0gbWVzc2FnZXNFbC5zY3JvbGxIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2VuZCBtZXNzYWdlXHJcbiAgICBjb25zdCBzZW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLXNlbmRdJyk7XHJcbiAgICBjb25zdCBpbnB1dEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLWlucHV0XScpO1xyXG5cclxuICAgIGlmIChzZW5kQnRuICYmIGlucHV0RWwpIHtcclxuICAgICAgICBzZW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VuZE1lc3NhZ2UpO1xyXG4gICAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgc2VuZE1lc3NhZ2UoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kTWVzc2FnZSgpIHtcclxuICAgICAgICBjb25zdCBjb250ZW50ID0gaW5wdXRFbC52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgaWYgKCFjb250ZW50IHx8ICFjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlucHV0RWwudmFsdWUgPSAnJztcclxuXHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7Y3VycmVudENvbnZlcnNhdGlvblVzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY29udGVudDogY29udGVudCB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgJiYgZGF0YS5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhbZGF0YS5tZXNzYWdlXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBCYWNrIGJ1dHRvblxyXG4gICAgY29uc3QgYmFja0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1iYWNrXScpO1xyXG4gICAgaWYgKGJhY2tCdG4pIHtcclxuICAgICAgICBiYWNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkID0gbnVsbDtcclxuICAgICAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3dpdGNoVGFiKCdmcmllbmRzJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBNRVNTQUdFIFBPTExJTkcgKGV2ZXJ5IDVzIHdoZW4gY29udmVyc2F0aW9uIG9wZW4pXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIHN0YXJ0TWVzc2FnZVBvbGxpbmcoKSB7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHtjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkfT9hZnRlcklkPSR7bGFzdE1lc3NhZ2VJZH1gLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lc3NhZ2VzICYmIGRhdGEubWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKGRhdGEubWVzc2FnZXMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1MDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdG9wTWVzc2FnZVBvbGxpbmcoKSB7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChtZXNzYWdlUG9sbGluZ0ludGVydmFsKTtcclxuICAgICAgICAgICAgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gVU5SRUFEIENPVU5UIFBPTExJTkcgKGV2ZXJ5IDMwcywgYWx3YXlzIGFjdGl2ZSlcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gZmV0Y2hVbnJlYWRDb3VudCgpIHtcclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvdW5yZWFkLWNvdW50Jywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEudG90YWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS50ZXh0Q29udGVudCA9IGRhdGEudG90YWw7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0c0JhZGdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcmVxdWVzdHMtYmFkZ2VdJyk7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0c0JhZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wZW5kaW5nUmVxdWVzdHMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS50ZXh0Q29udGVudCA9IGRhdGEucGVuZGluZ1JlcXVlc3RzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmV0Y2hVbnJlYWRDb3VudCgpO1xyXG4gICAgdW5yZWFkUG9sbGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZmV0Y2hVbnJlYWRDb3VudCwgMzAwMDApO1xyXG59KTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbImVzY2FwZUh0bWwiLCJzdHIiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwiaW5uZXJIVE1MIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJ1cmdlciIsInF1ZXJ5U2VsZWN0b3IiLCJuYXYiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJTVEFUX01BWCIsImRtZyIsInNwZWVkIiwiZG9kZ2UiLCJjcml0IiwiaHAiLCJwb3J0cmFpdHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGV0YWlscyIsImdldEVsZW1lbnRCeUlkIiwic2VsZWN0ZWRMaXN0IiwibGF1bmNoQnRuIiwibGVuZ3RoIiwibWF4U2VsZWN0aW9uIiwic2VsZWN0ZWRIZXJvZXMiLCJzZWxlY3RlZEhlcm9JZHMiLCJnZXRDYXRlZ29yeSIsInBvcnRyYWl0IiwiZGF0YXNldCIsImNhdGVnb3J5IiwiZ2V0U2VsZWN0ZWRSb2xlcyIsInJvbGVzIiwiVGFuayIsIkRQUyIsIkhlYWxlciIsIlN1cHBvcnQiLCJmb3JFYWNoIiwiaWQiLCJwIiwiQXJyYXkiLCJmcm9tIiwiZmluZCIsInBwIiwiY2F0IiwiY2FuU2VsZWN0Um9sZSIsInBvcnRyYWl0RWwiLCJpc0xlZ2VuZFNlbGVjdGVkIiwicmVtb3ZlIiwiYWRkIiwibmFtZSIsInJvbGUiLCJkbWdNaW4iLCJOdW1iZXIiLCJkbWdNYXgiLCJzcHJpdGVGaWxlIiwic3ByaXRlIiwiYWJpbGl0eU5hbWUiLCJhYmlsaXR5RGVzYyIsImFiaWxpdHlDZCIsInNwcml0ZVBhdGgiLCJjb25jYXQiLCJpc1NlbGVjdGVkIiwiaW5jbHVkZXMiLCJhYmlsaXR5SHRtbCIsImNoYXJTeW5lcmdpZXMiLCJzeW5lcmd5TWFwIiwic3luZXJneUh0bWwiLCJtYXAiLCJzIiwicGFydG5lciIsImRlc2MiLCJqb2luIiwiTWF0aCIsIm1pbiIsImJ0blJpZ2h0Iiwicm9sZUNhdCIsImFscmVhZHlTZWxlY3RlZCIsImRpc2FibGVkIiwidGV4dENvbnRlbnQiLCJ1cGRhdGVTZWxlY3RlZFRlYW0iLCJhbGVydCIsImZpbHRlciIsImhpZCIsImgiLCJwdXNoIiwidGVhbXNQYWdlRWwiLCJKU09OIiwicGFyc2UiLCJsZWdlbmRBY3RpdmUiLCJoZXJvIiwiaGVyb0VsIiwidXBkYXRlUm9sZUluZGljYXRvcnMiLCJ1cGRhdGVTeW5lcmd5SGlnaGxpZ2h0cyIsInRlYW1Db21wbGV0ZSIsImJhZGdlIiwic2VsZWN0ZWROYW1lcyIsIkJvb2xlYW4iLCJhY3RpdmVTeW5lcmdpZXMiLCJzZWVuUGFpcnMiLCJTZXQiLCJzeW5lcmdpZXMiLCJzeW4iLCJwYWlyS2V5Iiwic29ydCIsImhhcyIsIm5hbWUxIiwibmFtZTIiLCJzeW5lcmd5TmFtZSIsInBOYW1lIiwibWF0Y2hpbmciLCJjbGFzc05hbWUiLCJ0aXRsZSIsInVwZGF0ZVN5bmVyZ3lEaXNwbGF5IiwiY29udGFpbmVyIiwiYWN0aW9ucyIsInBhcmVudE5vZGUiLCJpbnNlcnRCZWZvcmUiLCJpbmRpY2F0b3IiLCJzbG90Iiwic2F2ZVByZXNldEJ0biIsInByZXNldE1vZGFsIiwicHJlc2V0TmFtZUlucHV0IiwicHJlc2V0Q29uZmlybUJ0biIsInByZXNldENhbmNlbEJ0biIsInVwZGF0ZVNhdmVQcmVzZXRCdG4iLCJvcmlnaW5hbFVwZGF0ZVNlbGVjdGVkVGVhbSIsIl9vcmlnVXBkYXRlIiwiX29yaWdSb2xlSW5kaWNhdG9ycyIsInZhbHVlIiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsImZvY3VzIiwidHJpbSIsImJvcmRlckNvbG9yIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsInN0cmluZ2lmeSIsImNoYXJhY3RlcklkcyIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsInN1Y2Nlc3MiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImVycm9yIiwiZSIsImtleSIsImNsaWNrIiwibG9hZFByZXNldCIsImlkU3RyIiwiU3RyaW5nIiwiZGVsZXRlUHJlc2V0IiwicHJlc2V0SWQiLCJjaGlwRWwiLCJjb25maXJtIiwibGlzdCIsImNoaWxkcmVuIiwiX2RvY3VtZW50JHF1ZXJ5U2VsZWN0IiwiY2hpcCIsImNoYXJJZHMiLCJwcmVzZXRJZHMiLCJzdG9wUHJvcGFnYXRpb24iLCJzZWxlY3RlZExpc3RPYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiY2hpbGRMaXN0IiwiaSIsImVuY29kZVVSSUNvbXBvbmVudCIsInJlc3BvbnNlIiwicmVkaXJlY3RlZCIsImhyZWYiLCJ1cmwiLCJwb3B1cCIsImJhY2tkcm9wIiwiY2xvc2VCdG4iLCJjb250ZW50IiwibG9hZGVkIiwib3BlblBvcHVwIiwib2Zmc2V0SGVpZ2h0IiwiZmV0Y2hQcm9maWxlIiwiY2xvc2VQb3B1cCIsInJlbmRlclByb2ZpbGUiLCJyZXN1bHRDbGFzcyIsInIiLCJyZXN1bHRMYWJlbCIsImF2YXRhckh0bWwiLCJwcm9maWxlSW1hZ2UiLCJ1c2VybmFtZSIsImh0bWwiLCJtb3R0byIsImJpbyIsInJhdGluZyIsInN0YXRzIiwid2lucyIsImxvc3NlcyIsIndpblJhdGUiLCJmYXZvcml0ZUNoYXJhY3RlciIsImdhbWVzUGxheWVkIiwibGFzdFRlYW0iLCJjIiwicmVjZW50QmF0dGxlcyIsImIiLCJwYXJzZUludCIsInJlc3VsdCIsIm9wcG9uZW50IiwibWF0Y2hUeXBlIiwidG9VcHBlckNhc2UiLCJkYXRlIiwiQ29tYmF0Q29udHJvbGxlciIsIl9jbGFzc0NhbGxDaGVjayIsImxvZ3MiLCJjdXJyZW50SW5kZXgiLCJpc1BsYXlpbmciLCJpc1BhdXNlZCIsImNoYXJhY3RlckVsZW1lbnRzIiwiY2hhcmFjdGVyTWF4SFAiLCJpbml0IiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJsb2dzRGF0YSIsImNvbWJhdExvZ3MiLCJjb25zb2xlIiwibG9nQ29udGFpbmVyIiwib3ZlcmxheSIsInBsYXlCdG4iLCJza2lwQnRuIiwic3BlZWRCdG5zIiwiY2hhcmFjdGVyU2x1Z3MiLCJjaGFyYWN0ZXJIYXNIZWFsIiwiYWJpbGl0eUNvb2xkb3ducyIsImNoYXJhY3RlclN0YXR1c2VzIiwiZWwiLCJjaGFyYWN0ZXJOYW1lIiwidGVhbSIsImNoYXJhY3RlclRlYW0iLCJjaGFyYWN0ZXJTbHVnIiwiaGFzSGVhbCIsImhwVGV4dCIsIm1hdGNoIiwiY3JlYXRlRW1wdHlTdGF0dXNlcyIsImFiaWxpdHlFbGVtZW50cyIsImNoYXJOYW1lIiwiY2hhclRlYW0iLCJhYmlsaXR5RWwiLCJtYXhDZCIsImFiaWxpdHlNYXhDZCIsIm5hbWVFbCIsImljb25FbCIsIm9wYWNpdHkiLCJhdWRpb1VubG9ja2VkIiwiY29tYmF0TXVzaWMiLCJsYXN0VHJhY2tJbmRleCIsImlzTXV0ZWQiLCJ2b2x1bWUiLCJzZnhWb2x1bWUiLCJjb21iYXRQbGF5bGlzdCIsImhhc0dva3UiLCJzb21lIiwiZW5kTXVzaWMiLCJzZnhDYWNoZSIsIm11dGVCdG4iLCJ2b2x1bWVTbGlkZXIiLCJzZnhTbGlkZXIiLCJiaW5kRXZlbnRzIiwicGxheSIsImJsZWVkaW5nIiwiYmxpZ2h0ZWQiLCJzdHVubmVkIiwibWFya2VkIiwic3RlYWx0aGVkIiwicmlwb3N0ZSIsImRtZ1VwIiwic3BkVXAiLCJkb2RnZVVwIiwiY3JpdFVwIiwidXBkYXRlQ2hhcmFjdGVyU3RhdHVzZXMiLCJsb2ciLCJ0eXBlIiwidGlja1JvdW5kU3RhdHVzZXMiLCJoYW5kbGVBYmlsaXR5U3RhdHVzQ2hhbmdlIiwic2V0U3RhdHVzIiwidGFyZ2V0IiwidGFyZ2V0VGVhbSIsImR1cmF0aW9uIiwidHVybnNSZW1haW5pbmciLCJ1bmRlZmluZWQiLCJhdHRhY2tlciIsImF0dGFja2VyVGVhbSIsImhhbmRsZVN5bmVyZ3lTdGF0dXNDaGFuZ2UiLCJjbGVhckFsbFN0YXR1c2VzIiwicmVuZGVyQWxsU3RhdHVzSWNvbnMiLCJzdWJ0eXBlIiwiYmxlZWRUdXJucyIsImFsbEhpdHMiLCJwcmltYXJ5IiwiaXNQcmltYXJ5IiwiYmxpZ2h0VHVybnMiLCJtYXJrVHVybnMiLCJjYXN0ZXIiLCJjYXN0ZXJUZWFtIiwicmlwb3N0ZVR1cm5zIiwiYXBwbHlCdWZmU3RhdHVzZXMiLCJidWZmcyIsImJ1ZmZEdXJhdGlvbiIsImFwcGx5VGVhbUJ1ZmZTdGF0dXNlcyIsInN0ZWFsdGhUdXJucyIsInByb3RlY3RUdXJucyIsInNlbGZCbGVlZFR1cm5zIiwidEtleSIsIl90aGlzMiIsImVmZmVjdFR5cGUiLCJwYXJ0bmVyQ2hhciIsInBhcnRuZXJDaGFyVGVhbSIsImdyYW50ZWRUdXJucyIsImJ1ZmZUeXBlcyIsInN0YXR1c0tleSIsImJ1ZmZUeXBlVG9TdGF0dXNLZXkiLCJkb2RnZUR1cmF0aW9uIiwiZXh0cmFUdXJucyIsInRlYW1OYW1lIiwiZGFtYWdlIiwibWF4IiwiX2kiLCJfT2JqZWN0JGtleXMiLCJPYmplY3QiLCJrZXlzIiwic3RhcnRzV2l0aCIsIl9pMiIsIl9PYmplY3Qka2V5czIiLCJfaTMiLCJfT2JqZWN0JGtleXMzIiwicmVuZGVyU3RhdHVzSWNvbnMiLCJpY29ucyIsImljb24iLCJjbHMiLCJfdGhpczMiLCJ0b2dnbGVQbGF5Iiwic2tpcCIsImJ0biIsInNldFNwZWVkIiwidG9nZ2xlTXV0ZSIsInBhcnNlRmxvYXQiLCJwbGF5TmV4dFRyYWNrIiwib25jZSIsInVwZGF0ZVBsYXlCdXR0b24iLCJwcm9jZXNzTmV4dExvZyIsInBhdXNlIiwiZGlzcGxheUxvZyIsInVwZGF0ZUhlYWx0aEJhcnMiLCJ0cmFja0FiaWxpdHlDb29sZG93bnMiLCJhbmltYXRlRGVhdGgiLCJ0YXJnZXRIUCIsInNob3dWaWN0b3J5T3ZlcmxheSIsImV2ZW50IiwiY3VycmVudFRhcmdldCIsImNvbWJhdFNwZWVkIiwiX3RoaXM0IiwicHJvY2Vzc0xvZyIsImRlbGF5IiwiZ2V0RGVsYXlGb3JMb2ciLCJnZXRBYmlsaXR5RGVsYXkiLCJnZXRTeW5lcmd5VHJpZ2dlckRlbGF5IiwiX3RoaXM1IiwicGxheUFuaW1hdGlvbiIsImhwRGVsYXkiLCJnZXRIUFVwZGF0ZURlbGF5IiwiYWJpbGl0eURhdGEiLCJ1cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5IiwiY2QiLCJnZXRBYmlsaXR5SFBEZWxheSIsImFuaW1hdGVBdHRhY2siLCJpc0NyaXQiLCJhbmltYXRlSGVhbCIsImhlYWxlciIsImhlYWxlclRlYW0iLCJhbmltYXRlRGVmZW5kIiwiZGVmZW5kZXIiLCJkZWZlbmRlclRlYW0iLCJhbmltYXRlRG9kZ2UiLCJhbmltYXRlRG9UIiwiYW5pbWF0ZVN0dW5uZWQiLCJwbGF5QWJpbGl0eUFuaW1hdGlvbiIsImFuaW1hdGVTeW5lcmd5QW5ub3VuY2UiLCJhbmltYXRlU3luZXJneVRyaWdnZXIiLCJ0YXJnZXROYW1lIiwiZG90Q2xhc3MiLCJnZXRDaGFyYWN0ZXJFbGVtZW50IiwiYW5pbWF0ZU1hcmtlZCIsImFuaW1hdGVCdWZmIiwiYW5pbWF0ZVN0ZWFsdGgiLCJfdGhpczYiLCJibGlnaHRLZXkiLCJzd2FwU3ByaXRlIiwicGxheUNoYXJTZngiLCJjYXN0ZXJFbCIsIm1hcmtLZXkiLCJyaXBvc3RlS2V5Iiwic2VsZkJ1ZmZLZXkiLCJwYXJ0eUhlYWxLZXkiLCJoZWFsZWQiLCJwYXJ0eUJ1ZmZLZXkiLCJhbmltYXRlVGVhbUJ1ZmYiLCJzdGVhbHRoS2V5IiwiZW1lcmdIZWFsS2V5IiwicHJvdERvZGdlS2V5IiwidWlLZXkiLCJ1aUNhc3RlckVsIiwidWlUYXJnZXRFbCIsIl90aGlzNyIsInRyaWdnZXIiLCJ0cmlnZ2VyQ2hhciIsImRyYXdTeW5lcmd5TGluayIsIl90aGlzOCIsInRyaWdnZXJDaGFyVGVhbSIsInBhcnRuZXJLZXkiLCJlbDEiLCJlbDIiLCJzdGFnZSIsImV4aXN0aW5nU3ZnIiwic3ZnIiwiY3JlYXRlRWxlbWVudE5TIiwic2V0QXR0cmlidXRlIiwic3RhZ2VSZWN0IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0IiwicmVjdDEiLCJyZWN0MiIsIngxIiwibGVmdCIsIndpZHRoIiwieTEiLCJ0b3AiLCJoZWlnaHQiLCJ4MiIsInkyIiwibGluZSIsInNwcml0ZU5hbWUiLCJfdGhpczkiLCJzbHVnIiwiaW1nIiwic3JjIiwiY29udGFpbnMiLCJhdHRhY2tlck5hbWUiLCJoZWFsZXJOYW1lIiwiZGVmZW5kZXJOYW1lIiwiY29ycHNlSW1nIiwiSW1hZ2UiLCJvbmxvYWQiLCJvbmVycm9yIiwiZW50cnkiLCJtZXNzYWdlIiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwiY3VycmVudEhQIiwibWF4SFAiLCJ0YXJnZXRNYXhIUCIsInVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzIiwidXBkYXRlQ2hhcmFjdGVySFAiLCJfdGhpczAiLCJtYXhIcCIsInBlcmNlbnQiLCJocEJhciIsInRyYW5zaXRpb24iLCJ1cGRhdGVJbmZvUGFuZWwiLCJwYW5lbENsYXNzIiwicGFuZWwiLCJjaGFyYWN0ZXJJbmZvcyIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJfbG9vcCIsImluZm8iLCJzdGF0c1NwYW4iLCJuIiwiZG9uZSIsImVyciIsImYiLCJfdGhpczEiLCJwbGF5RW5kTXVzaWMiLCJmaW5hbGl6ZVJhdGluZyIsInRyYWNrIiwiQXVkaW8iLCJfdGhpczEwIiwiZmluYWxpemVVcmwiLCJyYXRpbmdDaGFuZ2UiLCJzaG93UmF0aW5nVXBkYXRlIiwibmV3UmF0aW5nIiwibmV3UmF0aW5nMiIsImNoYW5nZSIsInJhdGluZ0VsIiwicmF0aW5nRWwyIiwid2lubmVyRGl2Iiwibm90aWYxIiwiY3NzVGV4dCIsImNvbG9yIiwiY2hhbmdlMiIsIm5vdGlmMiIsIl90aGlzMTEiLCJpZHgiLCJnZXRSYW5kb21UcmFja0luZGV4IiwiZmxvb3IiLCJyYW5kb20iLCJsb2FkU2Z4IiwicGF0aCIsInBsYXlTZngiLCJzZnhOYW1lIiwiY2FjaGVkIiwic291bmQiLCJjbG9uZU5vZGUiLCJhY3Rpb24iLCJjb21iYXRDb250YWluZXIiLCJwYW5lbE9wZW4iLCJjdXJyZW50VGFiIiwiY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCIsImxhc3RNZXNzYWdlSWQiLCJtZXNzYWdlUG9sbGluZ0ludGVydmFsIiwidW5yZWFkUG9sbGluZ0ludGVydmFsIiwiZnJpZW5kc0xvYWRlZCIsInJlcXVlc3RzTG9hZGVkIiwib3BlblBhbmVsIiwibG9hZEZyaWVuZHMiLCJjbG9zZVBhbmVsIiwic3RvcE1lc3NhZ2VQb2xsaW5nIiwidGFiQnRuIiwidGFiTmFtZSIsImZyaWVuZHNUYWIiLCJzd2l0Y2hUYWIiLCJ0YWJDb250ZW50IiwibG9hZFJlcXVlc3RzIiwiZnJpZW5kcyIsInVzZXJJZCIsImxhc3RNZXNzYWdlIiwiaXNGcm9tTWUiLCJpdGVtIiwiZnJpZW5kVXNlcklkIiwib3BlbkNvbnZlcnNhdGlvbiIsInJlcXVlc3RzIiwiZnJpZW5kc2hpcElkIiwiaGFuZGxlUmVxdWVzdCIsImFjY2VwdElkIiwicmVqZWN0SWQiLCJmZXRjaFVucmVhZENvdW50Iiwic2VhcmNoSW5wdXQiLCJzZWFyY2hSZXN1bHRzIiwic2VhcmNoVGltZW91dCIsImNsZWFyVGltZW91dCIsInF1ZXJ5IiwidXNlcnMiLCJ1IiwiYWN0aW9uSHRtbCIsImZyaWVuZFN0YXR1cyIsInNlbmRGcmllbmRSZXF1ZXN0IiwiYWRkRnJpZW5kSWQiLCJvdXRlckhUTUwiLCJyZXBvcnRNZXNzYWdlQWN0aW9uIiwibWVzc2FnZUlkIiwicmVhc29uIiwicHJvbXB0IiwiY29udkVsIiwibWVzc2FnZXNFbCIsInJlbmRlck1lc3NhZ2VzIiwibWVzc2FnZXMiLCJzdGFydE1lc3NhZ2VQb2xsaW5nIiwiYXBwZW5kIiwicGxhY2Vob2xkZXIiLCJtc2ciLCJyZXBvcnRCdG4iLCJyZXBvcnRFbCIsInJlcG9ydE1zZ0lkIiwic2VuZEJ0biIsImlucHV0RWwiLCJzZW5kTWVzc2FnZSIsImJhY2tCdG4iLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ0b3RhbCIsInJlcXVlc3RzQmFkZ2UiLCJwZW5kaW5nUmVxdWVzdHMiXSwic291cmNlUm9vdCI6IiJ9