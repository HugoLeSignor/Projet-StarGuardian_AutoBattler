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
      details.innerHTML = "\n                <div class=\"team-details-content\">\n                    <h2>".concat(name, "</h2>\n                    <p class=\"role\">").concat(role, "</p>\n\n                    <div class=\"gif-container\">\n                        <img src=\"").concat(spritePath, "\" alt=\"Sprite de ").concat(name, "\">\n                    </div>\n\n                    <div class=\"stats\">\n                        <div class=\"stat\">\n                            <span>DMG</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--dmg\"\n                                    style=\"width:").concat(Math.min(dmgMax / STAT_MAX.dmg * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(dmgMin, " - ").concat(dmgMax, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>VIT</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--spd\"\n                                    style=\"width:").concat(Math.min(speed / STAT_MAX.speed * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(speed, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>DODGE</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--dodge\"\n                                    style=\"width:").concat(Math.min(dodge / STAT_MAX.dodge * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(dodge, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>CRIT</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--crit\"\n                                    style=\"width:").concat(Math.min(crit / STAT_MAX.crit * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(crit, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>HP</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--hp\"\n                                    style=\"width:").concat(Math.min(hp / STAT_MAX.hp * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(hp, "</span>\n                        </div>\n                    </div>\n\n                    ").concat(abilityHtml, "\n\n                    <button class=\"btn-select-right\">\n                        ").concat(isSelected ? 'Désélectionner' : 'Sélectionner', "\n                    </button>\n                </div>\n            ");
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
    if (launchBtn) {
      var roles = getSelectedRoles();
      var teamComplete = roles.Tank === 1 && roles.DPS === 1 && roles.Healer === 1 && roles.Support === 1;
      launchBtn.disabled = !teamComplete;
    }
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
var combatMusic = null;
var audioUnlocked = false;
var lastIndex = -1;
var COMBAT_PLAYLIST = ["/asset/audio/combat/butchersboulevardmusic.mp3", "/asset/audio/combat/combatintheruins.mp3"];
function getRandomIndex() {
  var i;
  do {
    i = Math.floor(Math.random() * COMBAT_PLAYLIST.length);
  } while (i === lastIndex);
  lastIndex = i;
  return i;
}
function playNextCombatTrack() {
  if (!document.querySelector(".battle-stage")) return;
  if (!audioUnlocked) return; // 🔥 sécurité autoplay

  if (combatMusic) {
    combatMusic.pause();
    combatMusic = null;
  }
  var src = COMBAT_PLAYLIST[getRandomIndex()];
  combatMusic = new Audio(src);
  combatMusic.volume = 0.4;
  combatMusic.addEventListener("ended", playNextCombatTrack);
  combatMusic.play()["catch"](function () {
    console.log("Autoplay bloqué");
  });
}
document.addEventListener("DOMContentLoaded", function () {
  if (!document.querySelector(".battle-stage")) return;

  // 🔥 UN SEUL unlock global
  document.addEventListener("click", function () {
    if (audioUnlocked) return;
    audioUnlocked = true;

    // petit hack pour débloquer audio engine
    var unlock = new Audio();
    unlock.play()["catch"](function () {});
    playNextCombatTrack();
  }, {
    once: true
  });
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

      // Event listeners
      this.bindEvents();

      // Lancer automatiquement après un délai
      setTimeout(function () {
        return _this.play();
      }, 800);
    }
  }, {
    key: "bindEvents",
    value: function bindEvents() {
      var _this2 = this;
      if (this.playBtn) {
        this.playBtn.addEventListener('click', function () {
          return _this2.togglePlay();
        });
      }
      if (this.skipBtn) {
        this.skipBtn.addEventListener('click', function () {
          return _this2.skip();
        });
      }
      this.speedBtns.forEach(function (btn) {
        btn.addEventListener('click', function (e) {
          return _this2.setSpeed(e);
        });
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
        if (log.type === 'death') {
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
      var _this3 = this;
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
        return _this3.processNextLog();
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
        default:
          return 1200;
      }
    }
  }, {
    key: "getAbilityDelay",
    value: function getAbilityDelay(log) {
      switch (log.subtype) {
        case 'bleed_attack':
        case 'blight_attack':
        case 'backline_strike':
        case 'armor_pierce':
        case 'bonus_vs_marked':
          return 3000;
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
      var _this4 = this;
      this.playAnimation(log);
      this.displayLog(log);

      // Synchroniser la mise à jour des HP avec l'animation
      var hpDelay = this.getHPUpdateDelay(log);
      if (hpDelay > 0) {
        setTimeout(function () {
          return _this4.updateHealthBars(log);
        }, hpDelay / this.speed);
      } else {
        this.updateHealthBars(log);
      }

      // Suivi des cooldowns
      this.trackAbilityCooldowns(log);
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
      var _this5 = this;
      switch (log.subtype) {
        case 'bleed_attack':
          if (log.caster && log.casterTeam) this.animateAttack(log.caster, log.casterTeam, log.target, log.targetTeam, false);
          if (log.target && log.targetTeam) {
            setTimeout(function () {
              return _this5.animateDoT(log.target, log.targetTeam, 'bleeding');
            }, 700);
          }
          break;
        case 'blight_attack':
          if (log.caster && log.casterTeam) this.animateAttack(log.caster, log.casterTeam, log.target, log.targetTeam, false);
          if (log.target && log.targetTeam) {
            setTimeout(function () {
              return _this5.animateDoT(log.target, log.targetTeam, 'blighted');
            }, 700);
          }
          break;
        case 'stun':
          if (log.caster && log.casterTeam) this.animateAttack(log.caster, log.casterTeam, log.target, log.targetTeam, false);
          if (log.target && log.targetTeam) {
            setTimeout(function () {
              return _this5.animateStunned(log.target, log.targetTeam);
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
                var el = _this5.getCharacterElement(h.name, h.team);
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
      var _this6 = this;
      Object.keys(this.characterElements).forEach(function (key) {
        if (key.startsWith(casterTeam)) {
          var el = _this6.characterElements[key];
          el.classList.add('buffed');
          setTimeout(function () {
            return el.classList.remove('buffed');
          }, 1400);
        }
      });
    }

    // === SPRITE SWAP ===
  }, {
    key: "swapSprite",
    value: function swapSprite(key, spriteName, duration) {
      var _this7 = this;
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
            img.src = "/asset/img/combat/".concat(_this7.characterSlugs[key], "/fightidle.webp");
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
      }

      // Mettre à jour si nous avons les données nécessaires
      if (characterName && teamName && currentHP !== null && currentHP !== undefined && maxHP) {
        this.updateCharacterHP(characterName, teamName, currentHP, maxHP);
      }
    }
  }, {
    key: "updateAbilityHealthBars",
    value: function updateAbilityHealthBars(log) {
      var _this8 = this;
      // Compétences qui infligent des dégâts à une cible
      if (log.target && log.targetHP !== undefined && log.targetMaxHP) {
        this.updateCharacterHP(log.target, log.targetTeam, log.targetHP, log.targetMaxHP);
      }

      // Soin de groupe : mettre à jour chaque allié soigné
      if (log.subtype === 'party_heal' && log.healed) {
        log.healed.forEach(function (h) {
          _this8.updateCharacterHP(h.name, h.team, h.hp, h.maxHp);
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
      var _this9 = this;
      if (this.overlay) {
        this.overlay.style.display = 'flex';
        setTimeout(function () {
          _this9.overlay.style.opacity = '1';
        }, 50);
      }

      // Finaliser le MMR a la fin du combat
      this.finalizeRating();
    }
  }, {
    key: "finalizeRating",
    value: function finalizeRating() {
      var _this0 = this;
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
          _this0.showRatingUpdate(data.ratingChange, data.newRating, data.newRating2);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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Q0FBQyxDOzs7Ozs7Ozs7Ozs7QUN0ZkY7Ozs7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2NvbWJhdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZnJpZW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5jc3M/MmRjOSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcclxuICovXHJcbmltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnO1xyXG5pbXBvcnQgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzJztcclxuaW1wb3J0ICcuL2pzL2NvbWJhdC5qcyc7XHJcbmltcG9ydCAnLi9qcy9mcmllbmRzLmpzJztcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgVVRJTElUQUlSRSBTRUNVUklURSBYU1NcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xyXG4gICAgaWYgKCFzdHIpIHJldHVybiAnJztcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cikpO1xyXG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgTUVOVSBCVVJHRVJcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBidXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1cmdlclwiKTtcclxuICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1uYXZpZ2F0aW9uXCIpO1xyXG5cclxuICAgIGlmIChidXJnZXIgJiYgbmF2KSB7XHJcbiAgICAgICAgYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQQUdFIFRFQU1TIChDT1JSSUfDiUUpXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKiDwn5SnIE1BWCBERVMgU1RBVFMgKGFkYXB0ZXIgw6AgdGEgQkREIC8gw6lxdWlsaWJyYWdlKSAqL1xyXG5jb25zdCBTVEFUX01BWCA9IHtcclxuICAgIGRtZzogMzAsXHJcbiAgICBzcGVlZDogMTIsXHJcbiAgICBkb2RnZTogNDAsXHJcbiAgICBjcml0OiAxNSxcclxuICAgIGhwOiA3NVxyXG59O1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHBvcnRyYWl0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFtLXBvcnRyYWl0Jyk7XHJcbiAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlYW1EZXRhaWxzJyk7XHJcbiAgICBjb25zdCBzZWxlY3RlZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGlzdCcpO1xyXG4gICAgY29uc3QgbGF1bmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1sYXVuY2gnKTtcclxuXHJcbiAgICBpZiAoIWRldGFpbHMgfHwgcG9ydHJhaXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG1heFNlbGVjdGlvbiA9IDQ7XHJcbiAgICBsZXQgc2VsZWN0ZWRIZXJvZXMgPSBbXTtcclxuICAgIGxldCBzZWxlY3RlZEhlcm9JZHMgPSBbXTtcclxuXHJcbiAgICAvLyBDb21wb3NpdGlvbiBvYmxpZ2F0b2lyZSA6IDEgVGFuaywgMSBEUFMsIDEgSGVhbGVyLCAxIFN1cHBvcnRcclxuICAgIC8vIExhIGNhdGVnb3JpZSB2aWVudCBkaXJlY3RlbWVudCBkdSBkYXRhLWNhdGVnb3J5IChjYWxjdWxlIGNvdGUgc2VydmV1cilcclxuICAgIGZ1bmN0aW9uIGdldENhdGVnb3J5KHBvcnRyYWl0KSB7XHJcbiAgICAgICAgcmV0dXJuIHBvcnRyYWl0LmRhdGFzZXQuY2F0ZWdvcnkgfHwgJ1N1cHBvcnQnO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkUm9sZXMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSB7IFRhbms6IDAsIERQUzogMCwgSGVhbGVyOiAwLCBTdXBwb3J0OiAwIH07XHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocHAgPT4gcHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAocCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2F0ID0gZ2V0Q2F0ZWdvcnkocCk7XHJcbiAgICAgICAgICAgICAgICByb2xlc1tjYXRdKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcm9sZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FuU2VsZWN0Um9sZShwb3J0cmFpdEVsKSB7XHJcbiAgICAgICAgY29uc3QgY2F0ID0gZ2V0Q2F0ZWdvcnkocG9ydHJhaXRFbCk7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzW2NhdF0gPCAxO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcnRyYWl0cy5mb3JFYWNoKHBvcnRyYWl0ID0+IHtcclxuICAgICAgICBwb3J0cmFpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHBvcnRyYWl0LmRhdGFzZXQuaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwb3J0cmFpdC5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGUgPSBwb3J0cmFpdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01pbiA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01pbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01heCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01heCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuc3BlZWQpO1xyXG4gICAgICAgICAgICBjb25zdCBkb2RnZSA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRvZGdlKTtcclxuICAgICAgICAgICAgY29uc3QgY3JpdCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmNyaXQpO1xyXG4gICAgICAgICAgICBjb25zdCBocCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmhwKTtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlRmlsZSA9IHBvcnRyYWl0LmRhdGFzZXQuc3ByaXRlO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5TmFtZSA9IHBvcnRyYWl0LmRhdGFzZXQuYWJpbGl0eU5hbWUgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlEZXNjID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5RGVzYyB8fCAnJztcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUNkID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5Q2QgfHwgJyc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7c3ByaXRlRmlsZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlIdG1sID0gYWJpbGl0eU5hbWUgPyBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFiaWxpdHktc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZpcmUtYWx0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX25hbWVcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eU5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19jZFwiPjxpIGNsYXNzPVwiZmFzIGZhLWhvdXJnbGFzcy1oYWxmXCI+PC9pPiAke2VzY2FwZUh0bWwoYWJpbGl0eUNkKX1UPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX2Rlc2NcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eURlc2MpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCA6ICcnO1xyXG5cclxuICAgICAgICAgICAgZGV0YWlscy5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhbS1kZXRhaWxzLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDI+JHtuYW1lfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJyb2xlXCI+JHtyb2xlfTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdpZi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Nwcml0ZVBhdGh9XCIgYWx0PVwiU3ByaXRlIGRlICR7bmFtZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ETUc8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tZG1nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChkbWdNYXggLyBTVEFUX01BWC5kbWcpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkbWdNaW59IC0gJHtkbWdNYXh9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5WSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tc3BkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChzcGVlZCAvIFNUQVRfTUFYLnNwZWVkKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7c3BlZWR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ET0RHRTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1kb2RnZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoZG9kZ2UgLyBTVEFUX01BWC5kb2RnZSkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2RvZGdlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q1JJVDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1jcml0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChjcml0IC8gU1RBVF9NQVguY3JpdCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2NyaXR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5IUDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1ocFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoaHAgLyBTVEFUX01BWC5ocCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2hwfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR7YWJpbGl0eUh0bWx9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tc2VsZWN0LXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7aXNTZWxlY3RlZCA/ICdEw6lzw6lsZWN0aW9ubmVyJyA6ICdTw6lsZWN0aW9ubmVyJ31cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYnRuUmlnaHQgPSBkZXRhaWxzLnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2VsZWN0LXJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVDYXQgPSBnZXRDYXRlZ29yeShwb3J0cmFpdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscmVhZHlTZWxlY3RlZCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEw6lzYWN0aXZlciBsZSBib3V0b24gc2kgbGUgc2xvdCBkZSBjZSByw7RsZSBlc3QgZMOpasOgIHByaXNcclxuICAgICAgICAgICAgaWYgKCFhbHJlYWR5U2VsZWN0ZWQgJiYgIWNhblNlbGVjdFJvbGUocG9ydHJhaXQpKSB7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IGBTbG90ICR7cm9sZUNhdH0gZMOpasOgIHByaXNgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzID0gc2VsZWN0ZWRIZXJvSWRzLmZpbHRlcihoaWQgPT4gaGlkICE9PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBzZWxlY3RlZEhlcm9lcy5maWx0ZXIoaCA9PiBoICE9PSBuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhblNlbGVjdFJvbGUocG9ydHJhaXQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGBWb3VzIGF2ZXogZMOpasOgIHVuICR7cm9sZUNhdH0gZGFucyB2b3RyZSDDqXF1aXBlICFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCA+PSBtYXhTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJWb3VzIHBvdXZleiBzw6lsZWN0aW9ubmVyIG1heGltdW0gNCBwZXJzb25uYWdlcyAhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcy5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcy5wdXNoKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0ZWRUZWFtKCk7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZClcclxuICAgICAgICAgICAgICAgICAgICA/ICdEw6lzw6lsZWN0aW9ubmVyJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogJ1PDqWxlY3Rpb25uZXInO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiAgWk9ORSDDiVFVSVBFIOKAlCBzcHJpdGVzIHNldWxlbWVudCAqL1xyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRUZWFtKCkge1xyXG4gICAgICAgIHNlbGVjdGVkTGlzdC5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocCA9PiBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgaWYgKCFoZXJvKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBoZXJvLmRhdGFzZXQubmFtZTtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlUGF0aCA9IGAvYXNzZXQvc3ByaXRlcy8ke2hlcm8uZGF0YXNldC5zcHJpdGV9YDtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGhlcm9FbC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1oZXJvLXNwcml0ZScpO1xyXG4gICAgICAgICAgICBoZXJvRWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Nwcml0ZVBhdGh9XCIgYWx0PVwiU3ByaXRlIGRlICR7bmFtZX1cIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPiR7bmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkTGlzdC5hcHBlbmRDaGlsZChoZXJvRWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGxlcyBpbmRpY2F0ZXVycyBkZSByw7RsZXNcclxuICAgICAgICB1cGRhdGVSb2xlSW5kaWNhdG9ycygpO1xyXG5cclxuICAgICAgICBpZiAobGF1bmNoQnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5IZWFsZXIgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgbGF1bmNoQnRuLmRpc2FibGVkID0gIXRlYW1Db21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUm9sZUluZGljYXRvcnMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgY29uc3QgaW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvbGUtaW5kaWNhdG9yJyk7XHJcbiAgICAgICAgaWYgKGluZGljYXRvcikge1xyXG4gICAgICAgICAgICBpbmRpY2F0b3IucXVlcnlTZWxlY3RvckFsbCgnLnJvbGUtc2xvdCcpLmZvckVhY2goc2xvdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSBzbG90LmRhdGFzZXQucm9sZTtcclxuICAgICAgICAgICAgICAgIGlmIChyb2xlc1tjYXRdID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICBQUkVTRVRTXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4gICAgY29uc3Qgc2F2ZVByZXNldEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2F2ZS1wcmVzZXQnKTtcclxuICAgIGNvbnN0IHByZXNldE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldE1vZGFsJyk7XHJcbiAgICBjb25zdCBwcmVzZXROYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0TmFtZScpO1xyXG4gICAgY29uc3QgcHJlc2V0Q29uZmlybUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRDb25maXJtJyk7XHJcbiAgICBjb25zdCBwcmVzZXRDYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0Q2FuY2VsJyk7XHJcblxyXG4gICAgLy8gTWV0dHJlIGEgam91ciBsZSBib3V0b24gc2F1dmVnYXJkZXIgc2Vsb24gbGEgc2VsZWN0aW9uXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTYXZlUHJlc2V0QnRuKCkge1xyXG4gICAgICAgIGlmIChzYXZlUHJlc2V0QnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5IZWFsZXIgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgc2F2ZVByZXNldEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcGVsZXIgdXBkYXRlU2F2ZVByZXNldEJ0biBhIGNoYXF1ZSBjaGFuZ2VtZW50IGRlIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0gPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcbiAgICAvLyBPbiBzdXJjaGFyZ2UgZW4gYWpvdXRhbnQgbCdhcHBlbFxyXG4gICAgY29uc3QgX29yaWdVcGRhdGUgPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcblxyXG4gICAgLy8gUGF0Y2g6IGFqb3V0ZXIgbCdhcHBlbCBhIHVwZGF0ZVNhdmVQcmVzZXRCdG4gZGFucyB1cGRhdGVTZWxlY3RlZFRlYW1cclxuICAgIC8vIE9uIGxlIGZhaXQgZW4gd3JhcHBhbnQgbGVzIGluZGljYXRldXJzXHJcbiAgICBjb25zdCBfb3JpZ1JvbGVJbmRpY2F0b3JzID0gdXBkYXRlUm9sZUluZGljYXRvcnM7XHJcblxyXG4gICAgLy8gT3V2cmlyIGxhIG1vZGFsXHJcbiAgICBpZiAoc2F2ZVByZXNldEJ0biAmJiBwcmVzZXRNb2RhbCkge1xyXG4gICAgICAgIHNhdmVQcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHByZXNldE5hbWVJbnB1dC5mb2N1cygpLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGZXJtZXIgbGEgbW9kYWxcclxuICAgICAgICBwcmVzZXRDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByZXNldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtbW9kYWxfX2JhY2tkcm9wJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNhdXZlZ2FyZGVyIGxlIHByZXNldFxyXG4gICAgICAgIHByZXNldENvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcmVzZXROYW1lSW5wdXQudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZGMxNDNjJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnLi4uJztcclxuXHJcbiAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvcHJlc2V0cy9zYXZlJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVySWRzOiBzZWxlY3RlZEhlcm9JZHMubWFwKE51bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWNoYXJnZXIgbGEgcGFnZSBwb3VyIGFmZmljaGVyIGxlIG5vdXZlYXUgcHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yIHx8ICdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUnKTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRW50ZXIgcG91ciB2YWxpZGVyXHJcbiAgICAgICAgcHJlc2V0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHByZXNldENvbmZpcm1CdG4uY2xpY2soKTtcclxuICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhcmdlciB1biBwcmVzZXQgKHNlbGVjdGlvbiBwcm9ncmFtbWF0aXF1ZSBkZXMgcGVyc29ubmFnZXMpXHJcbiAgICBmdW5jdGlvbiBsb2FkUHJlc2V0KGNoYXJhY3Rlcklkcykge1xyXG4gICAgICAgIC8vIFJlc2V0IGxhIHNlbGVjdGlvbiBhY3R1ZWxsZVxyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG5cclxuICAgICAgICAvLyBTZWxlY3Rpb25uZXIgbGVzIHBlcnNvbm5hZ2VzIGR1IHByZXNldFxyXG4gICAgICAgIGNoYXJhY3Rlcklkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWRTdHIgPSBTdHJpbmcoaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3J0cmFpdCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBpZFN0cik7XHJcbiAgICAgICAgICAgIGlmIChwb3J0cmFpdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWRTdHIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMucHVzaChwb3J0cmFpdC5kYXRhc2V0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICB1cGRhdGVTYXZlUHJlc2V0QnRuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3VwcHJpbWVyIHVuIHByZXNldFxyXG4gICAgZnVuY3Rpb24gZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwRWwpIHtcclxuICAgICAgICBpZiAoIWNvbmZpcm0oJ1N1cHByaW1lciBjZSBwcmVzZXQgPycpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGAvdGVhbXMvcHJlc2V0cy8ke3ByZXNldElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlwRWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTaSBwbHVzIGRlIHByZXNldHMsIGNhY2hlciBsYSBiYXJyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXRzLWJhcl9fbGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QgJiYgbGlzdC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0cy1iYXInKT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXR0YWNoZXIgbGVzIGV2ZW50cyBhdXggY2hpcHMgZGUgcHJlc2V0c1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZXNldC1jaGlwJykuZm9yRWFjaChjaGlwID0+IHtcclxuICAgICAgICBjb25zdCBwcmVzZXRJZCA9IGNoaXAuZGF0YXNldC5wcmVzZXRJZDtcclxuICAgICAgICBjb25zdCBjaGFySWRzID0gSlNPTi5wYXJzZShjaGlwLmRhdGFzZXQucHJlc2V0SWRzKTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2xvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbG9hZFByZXNldChjaGFySWRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2RlbGV0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9ic2VydmVyIGxlcyBjaGFuZ2VtZW50cyBkZSBzZWxlY3Rpb24gcG91ciBsZSBib3V0b24gc2F2ZVxyXG4gICAgLy8gT24gdXRpbGlzZSB1biBNdXRhdGlvbk9ic2VydmVyIHN1ciBzZWxlY3RlZExpc3RcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdXBkYXRlU2F2ZVByZXNldEJ0bigpKTtcclxuICAgIGlmIChzZWxlY3RlZExpc3QpIHtcclxuICAgICAgICBzZWxlY3RlZExpc3RPYnNlcnZlci5vYnNlcnZlKHNlbGVjdGVkTGlzdCwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhdW5jaEJ0bikge1xyXG4gICAgICAgIGxhdW5jaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnZvaSBQT1NUIEFKQVggdmVycyAvdGVhbXMvc2VsZWN0XHJcbiAgICAgICAgICAgICAgICBmZXRjaCgnL3RlYW1zL3NlbGVjdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogc2VsZWN0ZWRIZXJvSWRzLm1hcCgoaWQsIGkpID0+IGBjaGFyYWN0ZXJfaWRzWyR7aX1dPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGlkKX1gKS5qb2luKCcmJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlZGlyZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVkaXJpZ2UgbWFudWVsbGVtZW50IHNpIHBhcyBkZSByZWRpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbWF0Y2htYWtpbmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzw6lsZWN0aW9uIGRlIGxcXCfDqXF1aXBlLicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQUk9GSUxFIFBPUFVQXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1wb3B1cF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWNvbnRlbnRdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBvcHVwKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwb3B1cC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3Byb2ZpbGUtcG9wdXAtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwX19iYWNrZHJvcC0tb3BlbicpO1xyXG5cclxuICAgICAgICBpZiAoIWxvYWRlZCkge1xyXG4gICAgICAgICAgICBmZXRjaFByb2ZpbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cCk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmZXRjaFByb2ZpbGUoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9hcGkvcHJvZmlsZScpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9maWxlKGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lcnJvclwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclByb2ZpbGUoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdENsYXNzID0gKHIpID0+IHIgPT09ICd3aW4nID8gJ3Jlc3VsdC0td2luJyA6IHIgPT09ICdsb3NzJyA/ICdyZXN1bHQtLWxvc3MnIDogJ3Jlc3VsdC0tZHJhdyc7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0TGFiZWwgPSAocikgPT4gciA9PT0gJ3dpbicgPyAnVmljdG9pcmUnIDogciA9PT0gJ2xvc3MnID8gJ0RcXHUwMGU5ZmFpdGUnIDogJ051bCc7XHJcblxyXG4gICAgICAgIGNvbnN0IGF2YXRhckh0bWwgPSBkYXRhLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChkYXRhLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiQXZhdGFyIGRlICR7ZXNjYXBlSHRtbChkYXRhLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmFzIGZhLXVzZXItY2lyY2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPmA7XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faWRlbnRpdHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hdmF0YXJcIj4ke2F2YXRhckh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fdXNlcm5hbWVcIj4ke2VzY2FwZUh0bWwoZGF0YS51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5tb3R0byA/IGA8c3BhbiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX21vdHRvXCI+XFx1MDBhYiAke2VzY2FwZUh0bWwoZGF0YS5tb3R0byl9IFxcdTAwYmI8L3NwYW4+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5iaW8gPyBgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19iaW9cIj4ke2VzY2FwZUh0bWwoZGF0YS5iaW8pfTwvcD5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3RhdHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEucmF0aW5nKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPk1NUjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy53aW5zKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPlZpY3RvaXJlczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy5sb3NzZXMpKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+RFxcdTAwZTlmYWl0ZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMud2luUmF0ZSkpfSU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+V2luIFJhdGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXN0YXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IENoYW1waW9uIEZhdm9yaVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19uYW1lXCI+JHtlc2NhcGVIdG1sKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIubmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX3JvbGVcIj4ke2VzY2FwZUh0bWwoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5yb2xlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fY291bnRcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIuZ2FtZXNQbGF5ZWQpKX0gcGFydGllczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubGFzdFRlYW0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlcnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IERlcm5pXFx1MDBlOHJlIFxcdTAwYzlxdWlwZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5sYXN0VGVhbS5tYXAoYyA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX21lbWJlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoYy5uYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fcm9sZVwiPiR7ZXNjYXBlSHRtbChjLnJvbGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEucmVjZW50QmF0dGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zaGllbGQtYWx0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBIaXN0b3JpcXVlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5yZWNlbnRCYXR0bGVzLm1hcChiID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYXJlbmEvcmVwbGF5LyR7cGFyc2VJbnQoYi5pZCwgMTApfVwiIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19lbnRyeSAke3Jlc3VsdENsYXNzKGIucmVzdWx0KX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fcmVzdWx0XCI+JHtyZXN1bHRMYWJlbChiLnJlc3VsdCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19vcHBvbmVudFwiPnZzICR7ZXNjYXBlSHRtbChiLm9wcG9uZW50KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX3R5cGVcIj4ke2VzY2FwZUh0bWwoYi5tYXRjaFR5cGUpLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19kYXRlXCI+JHtlc2NhcGVIdG1sKGIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsYXkgcHJvZmlsZS1oaXN0b3J5X19yZXBsYXlcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZW1wdHlcIj5BdWN1biBjb21iYXQgZW5yZWdpc3RyXFx1MDBlOTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3Byb2ZpbGVcIiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2VkaXQtbGlua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gXFx1MDBjOWRpdGVyIGxlIHByb2ZpbFxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB9XHJcbiAgICBcclxuXHJcblxyXG59KTtcclxuXHJcblxyXG5sZXQgY29tYmF0TXVzaWMgPSBudWxsO1xyXG5sZXQgYXVkaW9VbmxvY2tlZCA9IGZhbHNlO1xyXG5sZXQgbGFzdEluZGV4ID0gLTE7XHJcblxyXG5jb25zdCBDT01CQVRfUExBWUxJU1QgPSBbXHJcbiAgICBcIi9hc3NldC9hdWRpby9jb21iYXQvYnV0Y2hlcnNib3VsZXZhcmRtdXNpYy5tcDNcIixcclxuICAgIFwiL2Fzc2V0L2F1ZGlvL2NvbWJhdC9jb21iYXRpbnRoZXJ1aW5zLm1wM1wiLFxyXG5dO1xyXG5cclxuZnVuY3Rpb24gZ2V0UmFuZG9tSW5kZXgoKSB7XHJcbiAgICBsZXQgaTtcclxuICAgIGRvIHtcclxuICAgICAgICBpID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogQ09NQkFUX1BMQVlMSVNULmxlbmd0aCk7XHJcbiAgICB9IHdoaWxlIChpID09PSBsYXN0SW5kZXgpO1xyXG5cclxuICAgIGxhc3RJbmRleCA9IGk7XHJcbiAgICByZXR1cm4gaTtcclxufVxyXG5cclxuZnVuY3Rpb24gcGxheU5leHRDb21iYXRUcmFjaygpIHtcclxuXHJcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmF0dGxlLXN0YWdlXCIpKSByZXR1cm47XHJcbiAgICBpZiAoIWF1ZGlvVW5sb2NrZWQpIHJldHVybjsgLy8g8J+UpSBzw6ljdXJpdMOpIGF1dG9wbGF5XHJcblxyXG4gICAgaWYgKGNvbWJhdE11c2ljKSB7XHJcbiAgICAgICAgY29tYmF0TXVzaWMucGF1c2UoKTtcclxuICAgICAgICBjb21iYXRNdXNpYyA9IG51bGw7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3Qgc3JjID0gQ09NQkFUX1BMQVlMSVNUW2dldFJhbmRvbUluZGV4KCldO1xyXG5cclxuICAgIGNvbWJhdE11c2ljID0gbmV3IEF1ZGlvKHNyYyk7XHJcbiAgICBjb21iYXRNdXNpYy52b2x1bWUgPSAwLjQ7XHJcblxyXG4gICAgY29tYmF0TXVzaWMuYWRkRXZlbnRMaXN0ZW5lcihcImVuZGVkXCIsIHBsYXlOZXh0Q29tYmF0VHJhY2spO1xyXG5cclxuICAgIGNvbWJhdE11c2ljLnBsYXkoKS5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJBdXRvcGxheSBibG9xdcOpXCIpO1xyXG4gICAgfSk7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuXHJcbiAgICBpZiAoIWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYmF0dGxlLXN0YWdlXCIpKSByZXR1cm47XHJcblxyXG4gICAgLy8g8J+UpSBVTiBTRVVMIHVubG9jayBnbG9iYWxcclxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcblxyXG4gICAgICAgIGlmIChhdWRpb1VubG9ja2VkKSByZXR1cm47XHJcbiAgICAgICAgYXVkaW9VbmxvY2tlZCA9IHRydWU7XHJcblxyXG4gICAgICAgIC8vIHBldGl0IGhhY2sgcG91ciBkw6libG9xdWVyIGF1ZGlvIGVuZ2luZVxyXG4gICAgICAgIGNvbnN0IHVubG9jayA9IG5ldyBBdWRpbygpO1xyXG4gICAgICAgIHVubG9jay5wbGF5KCkuY2F0Y2goKCk9Pnt9KTtcclxuXHJcbiAgICAgICAgcGxheU5leHRDb21iYXRUcmFjaygpO1xyXG5cclxuICAgIH0sIHsgb25jZTogdHJ1ZSB9KTtcclxuXHJcbn0pOyIsIi8qKlxyXG4gKiBDb21iYXQgQW5pbWF0aW9uIENvbnRyb2xsZXJcclxuICogR8OocmUgbCdhZmZpY2hhZ2UgcHJvZ3Jlc3NpZiBkZXMgbG9ncyBkZSBjb21iYXQgYXZlYyBhbmltYXRpb25zXHJcbiAqL1xyXG5jbGFzcyBDb21iYXRDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMubG9ncyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gMTtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlckVsZW1lbnRzID0ge307XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUCA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIC8vIFLDqWN1cMOpcmVyIGxlcyBsb2dzIGRlcHVpcyBsJ2F0dHJpYnV0IGRhdGFcclxuICAgICAgICBjb25zdCBsb2dzRGF0YSA9IHRoaXMuY29udGFpbmVyLmRhdGFzZXQuY29tYmF0TG9ncztcclxuICAgICAgICBpZiAobG9nc0RhdGEpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ncyA9IEpTT04ucGFyc2UobG9nc0RhdGEpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJldXIgcGFyc2luZyBsb2dzOicsIGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSw6ljdXDDqXJlciBsZXMgw6lsw6ltZW50c1xyXG4gICAgICAgIHRoaXMubG9nQ29udGFpbmVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LWxvZ10nKTtcclxuICAgICAgICB0aGlzLm92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtb3ZlcmxheV0nKTtcclxuICAgICAgICB0aGlzLnBsYXlCdG4gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtcGxheV0nKTtcclxuICAgICAgICB0aGlzLnNraXBCdG4gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtc2tpcF0nKTtcclxuICAgICAgICB0aGlzLnNwZWVkQnRucyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvbWJhdC1zcGVlZF0nKTtcclxuXHJcbiAgICAgICAgLy8gTWFwIGRlcyBwZXJzb25uYWdlcyBhdmVjIHN0b2NrYWdlIGRlcyBIUCBtYXggaW5pdGlhdXhcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlck1heEhQID0ge307XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJTbHVncyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVySGFzSGVhbCA9IHt9O1xyXG4gICAgICAgIHRoaXMuYWJpbGl0eUNvb2xkb3ducyA9IHt9OyAvLyBTdWl2aSBkZXMgY29vbGRvd25zIGVuIGNvdXJzXHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2hhcmFjdGVyLW5hbWVdJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbC5kYXRhc2V0LmNoYXJhY3Rlck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJhY3RlclRlYW07XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW19LSR7bmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV0gPSBlbDtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJTbHVnIHx8ICcnO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3Rlckhhc0hlYWxba2V5XSA9IGVsLmRhdGFzZXQuaGFzSGVhbCA9PT0gJ3RydWUnO1xyXG5cclxuICAgICAgICAgICAgLy8gRXh0cmFpcmUgbGUgSFAgbWF4IGRlcHVpcyBsZSB0ZXh0ZSBpbml0aWFsXHJcbiAgICAgICAgICAgIGNvbnN0IGhwVGV4dCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcbiAgICAgICAgICAgIGlmIChocFRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gaHBUZXh0LnRleHRDb250ZW50Lm1hdGNoKC8oXFxkKylcXC8oXFxkKykvKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFBba2V5XSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBNYXAgZGVzIMOpbMOpbWVudHMgZCdhYmlsaXR5IGRhbnMgbGVzIGluZm8gcGFuZWxzXHJcbiAgICAgICAgdGhpcy5hYmlsaXR5RWxlbWVudHMgPSB7fTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuY2hhcmFjdGVyLWluZm9bZGF0YS1jaGFyLW5hbWVdJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbC5kYXRhc2V0LmNoYXJOYW1lO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtID0gZWwuZGF0YXNldC5jaGFyVGVhbTtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7dGVhbX0tJHtuYW1lfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlFbCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fYWJpbGl0eScpO1xyXG4gICAgICAgICAgICBpZiAoYWJpbGl0eUVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFiaWxpdHlFbGVtZW50c1trZXldID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIGVsOiBhYmlsaXR5RWwsXHJcbiAgICAgICAgICAgICAgICAgICAgbWF4Q2Q6IHBhcnNlSW50KGFiaWxpdHlFbC5kYXRhc2V0LmFiaWxpdHlNYXhDZCkgfHwgMCxcclxuICAgICAgICAgICAgICAgICAgICBiYWRnZTogYWJpbGl0eUVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fYWJpbGl0eS1jZC1iYWRnZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIG5hbWVFbDogYWJpbGl0eUVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fYWJpbGl0eS1uYW1lJyksXHJcbiAgICAgICAgICAgICAgICAgICAgaWNvbkVsOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignaScpLFxyXG4gICAgICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDYWNoZXIgbCdvdmVybGF5XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBWaWRlciBsZSBsb2dcclxuICAgICAgICBpZiAodGhpcy5sb2dDb250YWluZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lcnNcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gTGFuY2VyIGF1dG9tYXRpcXVlbWVudCBhcHLDqHMgdW4gZMOpbGFpXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBsYXkoKSwgODAwKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXlCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVQbGF5KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2tpcEJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLnNraXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNraXAoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNwZWVkQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLnNldFNwZWVkKGUpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZyAmJiAhdGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc05leHRMb2coKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVQbGF5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcgfHwgdGhpcy5pc1BhdXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNraXAoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIEFmZmljaGVyIHRvdXMgbGVzIGxvZ3MgcmVzdGFudHNcclxuICAgICAgICB3aGlsZSAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvZyA9IHRoaXMubG9nc1t0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUxvZyhsb2cpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKTtcclxuICAgICAgICAgICAgdGhpcy50cmFja0FiaWxpdHlDb29sZG93bnMobG9nKTtcclxuICAgICAgICAgICAgaWYgKGxvZy50eXBlID09PSAnZGVhdGgnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWF0aChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2hvd1ZpY3RvcnlPdmVybGF5KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3BlZWQoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBzcGVlZCA9IHBhcnNlRmxvYXQoZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbWJhdFNwZWVkKTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGwnVUlcclxuICAgICAgICB0aGlzLnNwZWVkQnRucy5mb3JFYWNoKGJ0biA9PiBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc05leHRMb2coKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZyB8fCB0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZpY3RvcnlPdmVybGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBsb2cgPSB0aGlzLmxvZ3NbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc0xvZyhsb2cpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGVyIGxlIGTDqWxhaVxyXG4gICAgICAgIGxldCBkZWxheSA9IHRoaXMuZ2V0RGVsYXlGb3JMb2cobG9nKTtcclxuICAgICAgICBkZWxheSA9IGRlbGF5IC8gdGhpcy5zcGVlZDtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb2Nlc3NOZXh0TG9nKCksIGRlbGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZWxheUZvckxvZyhsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JvdW5kJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2luaXRpYXRpdmUnOiByZXR1cm4gNjAwO1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOiByZXR1cm4gMzAwMDtcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6IHJldHVybiAyODAwO1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOiByZXR1cm4gMzUwMDtcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdCc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICd2aWN0b3J5JzpcclxuICAgICAgICAgICAgY2FzZSAnZHJhdyc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICAvLyBOb3V2ZWF1eCB0eXBlc1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF90aWNrJzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW5uZWRfc2tpcCc6IHJldHVybiAxODAwO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2FjdGl2YXRlJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzogcmV0dXJuIHRoaXMuZ2V0QWJpbGl0eURlbGF5KGxvZyk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAxMjAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBYmlsaXR5RGVsYXkobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cuc3VidHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfYXR0YWNrJzpcclxuICAgICAgICAgICAgY2FzZSAnYmFja2xpbmVfc3RyaWtlJzpcclxuICAgICAgICAgICAgY2FzZSAnYXJtb3JfcGllcmNlJzpcclxuICAgICAgICAgICAgY2FzZSAnYm9udXNfdnNfbWFya2VkJzogcmV0dXJuIDMwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW4nOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAnbWFyayc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2J1ZmYnOlxyXG4gICAgICAgICAgICBjYXNlICdzZWxmX2J1ZmYnOlxyXG4gICAgICAgICAgICBjYXNlICdzdGVhbHRoJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2hlYWwnOiByZXR1cm4gMjgwMDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfYnVmZic6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdlbWVyZ2VuY3lfaGVhbCc6IHJldHVybiAyODAwO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0X2RvZGdlJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyYW5zZm9ybV9kYW1hZ2UnOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NMb2cobG9nKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKGxvZyk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TG9nKGxvZyk7XHJcblxyXG4gICAgICAgIC8vIFN5bmNocm9uaXNlciBsYSBtaXNlIMOgIGpvdXIgZGVzIEhQIGF2ZWMgbCdhbmltYXRpb25cclxuICAgICAgICBjb25zdCBocERlbGF5ID0gdGhpcy5nZXRIUFVwZGF0ZURlbGF5KGxvZyk7XHJcbiAgICAgICAgaWYgKGhwRGVsYXkgPiAwKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyksIGhwRGVsYXkgLyB0aGlzLnNwZWVkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFN1aXZpIGRlcyBjb29sZG93bnNcclxuICAgICAgICB0aGlzLnRyYWNrQWJpbGl0eUNvb2xkb3ducyhsb2cpO1xyXG4gICAgfVxyXG5cclxuICAgIHRyYWNrQWJpbGl0eUNvb2xkb3ducyhsb2cpIHtcclxuICAgICAgICAvLyBRdWFuZCB1bmUgY29tcMOpdGVuY2UgZXN0IHV0aWxpc8OpZSwgbWV0dHJlIGVuIGNvb2xkb3duXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAnYWJpbGl0eV91c2UnICYmIGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5RGF0YSA9IHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RGF0YSAmJiBhYmlsaXR5RGF0YS5tYXhDZCA+IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldID0gYWJpbGl0eURhdGEubWF4Q2Q7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUFiaWxpdHlDb29sZG93bkRpc3BsYXkoa2V5KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQSBjaGFxdWUgbm91dmVhdSByb3VuZCwgZMOpY3LDqW1lbnRlciB0b3VzIGxlcyBjb29sZG93bnNcclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdyb3VuZCcpIHtcclxuICAgICAgICAgICAgZm9yIChjb25zdCBrZXkgaW4gdGhpcy5hYmlsaXR5Q29vbGRvd25zKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5hYmlsaXR5Q29vbGRvd25zW2tleV0gPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hYmlsaXR5Q29vbGRvd25zW2tleV0tLTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUFiaWxpdHlDb29sZG93bkRpc3BsYXkoa2V5KTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5KGtleSkge1xyXG4gICAgICAgIGNvbnN0IGFiaWxpdHlEYXRhID0gdGhpcy5hYmlsaXR5RWxlbWVudHNba2V5XTtcclxuICAgICAgICBpZiAoIWFiaWxpdHlEYXRhKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGNkID0gdGhpcy5hYmlsaXR5Q29vbGRvd25zW2tleV0gfHwgMDtcclxuXHJcbiAgICAgICAgaWYgKGNkID4gMCkge1xyXG4gICAgICAgICAgICAvLyBFbiBjb29sZG93biA6IGdyaXNlciArIGFmZmljaGVyIGJhZGdlXHJcbiAgICAgICAgICAgIGFiaWxpdHlEYXRhLmVsLmNsYXNzTGlzdC5hZGQoJ2NoYXJhY3Rlci1pbmZvX19hYmlsaXR5LS1vbi1jZCcpO1xyXG4gICAgICAgICAgICBpZiAoYWJpbGl0eURhdGEuYmFkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGFiaWxpdHlEYXRhLmJhZGdlLnRleHRDb250ZW50ID0gYCR7Y2R9VGA7XHJcbiAgICAgICAgICAgICAgICBhYmlsaXR5RGF0YS5iYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAvLyBQcsOqdCA6IHJldGlyZXIgbGUgZ3Jpc1xyXG4gICAgICAgICAgICBhYmlsaXR5RGF0YS5lbC5jbGFzc0xpc3QucmVtb3ZlKCdjaGFyYWN0ZXItaW5mb19fYWJpbGl0eS0tb24tY2QnKTtcclxuICAgICAgICAgICAgaWYgKGFiaWxpdHlEYXRhLmJhZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBhYmlsaXR5RGF0YS5iYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEhQVXBkYXRlRGVsYXkobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOiByZXR1cm4gMzUwO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzogcmV0dXJuIDQwMDtcclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOiByZXR1cm4gMDtcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfdGljayc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF90aWNrJzogcmV0dXJuIDIwMDtcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6IHJldHVybiAzNTA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzogcmV0dXJuIHRoaXMuZ2V0QWJpbGl0eUhQRGVsYXkobG9nKTtcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFiaWxpdHlIUERlbGF5KGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnN1YnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfYXR0YWNrJzpcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JhY2tsaW5lX3N0cmlrZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2FybW9yX3BpZXJjZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvbnVzX3ZzX21hcmtlZCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW4nOiByZXR1cm4gMzUwO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9oZWFsJzpcclxuICAgICAgICAgICAgY2FzZSAnZW1lcmdlbmN5X2hlYWwnOiByZXR1cm4gNDAwO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2Zvcm1fZGFtYWdlJzogcmV0dXJuIDIwMDtcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBbmltYXRpb24obG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5hdHRhY2tlciwgbG9nLmF0dGFja2VyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy5pc0NyaXQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuaGVhbGVyLCBsb2cuaGVhbGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlZmVuZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWZlbmQobG9nLmRlZmVuZGVyLCBsb2cuZGVmZW5kZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkb2RnZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEb2RnZShsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVhdGgobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIC8vIE5vdXZlYXV4IHR5cGVzXHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxlZWRpbmcnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEb1QobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGlnaHRlZCcpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW5uZWRfc2tpcCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTdHVubmVkKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2FjdGl2YXRlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuYXR0YWNrZXIsIGxvZy5hdHRhY2tlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYWJpbGl0eV91c2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5wbGF5QWJpbGl0eUFuaW1hdGlvbihsb2cpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBOT1VWRUxMRVMgQU5JTUFUSU9OUyA9PT1cclxuXHJcbiAgICBhbmltYXRlRG9UKHRhcmdldE5hbWUsIHRhcmdldFRlYW0sIGRvdENsYXNzKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoZG90Q2xhc3MpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKGRvdENsYXNzKSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVTdHVubmVkKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc3R1bm5lZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdzdHVubmVkJyksIDE0MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlTWFya2VkKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnbWFya2VkJyk7XHJcbiAgICAgICAgICAgIC8vIExhIG1hcnF1ZSByZXN0ZSB2aXNpYmxlIHBsdXMgbG9uZ3RlbXBzXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ21hcmtlZCcpLCAyMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZUJ1ZmYodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdidWZmZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnYnVmZmVkJyksIDE0MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlU3RlYWx0aCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3N0ZWFsdGhlZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdzdGVhbHRoZWQnKSwgMTUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBYmlsaXR5QW5pbWF0aW9uKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnN1YnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxlZWRpbmcnKSwgNzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnKSwgNzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5hbmltYXRlU3R1bm5lZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSksIDcwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnbWFyayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG1hcmtLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKG1hcmtLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkgdGhpcy5hbmltYXRlTWFya2VkKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByaXBvc3RlS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShyaXBvc3RlS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlbGZfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHNlbGZCdWZmS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFib21pbmF0aW9uIFRyYW5zZm9ybWF0aW9uIDogc3dpdGNoIHNsdWcgdG8gYmVhc3QgcGVybWFuZW50bHlcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9nLmFiaWxpdHlOYW1lID09PSAnVHJhbnNmb3JtYXRpb24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU2x1Z3Nbc2VsZkJ1ZmZLZXldID0gJ2JlYXN0JztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHNlbGZCdWZmS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVIZWFsKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWVyIHRvdXMgbGVzIGFsbGnDqXMgc29pZ27DqXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9nLmhlYWxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2cuaGVhbGVkLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChoLm5hbWUsIGgudGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdoZWFsZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxlZCcpLCAxNTAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0eUJ1ZmZLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHBhcnR5QnVmZktleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIC8vIEFuaW1lciB0b3VzIGxlcyBhbGxpw6lzIGR1IG3Dqm1lIGPDtHTDqVxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlVGVhbUJ1ZmYobG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0ZWFsdGgnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzdGVhbHRoS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShzdGVhbHRoS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN0ZWFsdGgobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FybW9yX3BpZXJjZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JhY2tsaW5lX3N0cmlrZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvbnVzX3ZzX21hcmtlZCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgbG9nLmlzQ3JpdCB8fCBmYWxzZSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZW1lcmdlbmN5X2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVIZWFsKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdF9kb2RnZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlRGVmZW5kKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2Zvcm1fZGFtYWdlJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdodXJ0Jyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcpLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlVGVhbUJ1ZmYoY2FzdGVyVGVhbSkge1xyXG4gICAgICAgIE9iamVjdC5rZXlzKHRoaXMuY2hhcmFjdGVyRWxlbWVudHMpLmZvckVhY2goa2V5ID0+IHtcclxuICAgICAgICAgICAgaWYgKGtleS5zdGFydHNXaXRoKGNhc3RlclRlYW0pKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2J1ZmZlZCcpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdidWZmZWQnKSwgMTQwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gU1BSSVRFIFNXQVAgPT09XHJcblxyXG4gICAgc3dhcFNwcml0ZShrZXksIHNwcml0ZU5hbWUsIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZWwgPSB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHNsdWcgPSB0aGlzLmNoYXJhY3RlclNsdWdzW2tleV07XHJcbiAgICAgICAgaWYgKCFzbHVnKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgaW1nID0gZWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1zcHJpdGUnKTtcclxuICAgICAgICBpZiAoIWltZykgcmV0dXJuO1xyXG4gICAgICAgIGltZy5zcmMgPSBgL2Fzc2V0L2ltZy9jb21iYXQvJHtzbHVnfS8ke3Nwcml0ZU5hbWV9YDtcclxuICAgICAgICBpZiAoZHVyYXRpb24gPiAwKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlYWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSBgL2Fzc2V0L2ltZy9jb21iYXQvJHt0aGlzLmNoYXJhY3RlclNsdWdzW2tleV19L2ZpZ2h0aWRsZS53ZWJwYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZHVyYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gQU5JTUFUSU9OUyBFWElTVEFOVEVTID09PVxyXG5cclxuICAgIGFuaW1hdGVBdHRhY2soYXR0YWNrZXJOYW1lLCBhdHRhY2tlclRlYW0sIHRhcmdldE5hbWUsIHRhcmdldFRlYW0sIGlzQ3JpdCkge1xyXG4gICAgICAgIGNvbnN0IGF0dGFja2VyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGF0dGFja2VyTmFtZSwgYXR0YWNrZXJUZWFtKTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcblxyXG4gICAgICAgIGlmIChhdHRhY2tlcikge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHthdHRhY2tlclRlYW19LSR7YXR0YWNrZXJOYW1lfWA7XHJcbiAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShrZXksICdhdHRhY2thbmltYXRpb24ud2VicCcsIDEyMDApO1xyXG4gICAgICAgICAgICBhdHRhY2tlci5jbGFzc0xpc3QuYWRkKCdhdHRhY2tpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBhdHRhY2tlci5jbGFzc0xpc3QucmVtb3ZlKCdhdHRhY2tpbmcnKSwgMTIwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2h1cnQnKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0NyaXQpIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdjcml0Jyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdodXJ0JywgJ2NyaXQnKSwgODAwKTtcclxuICAgICAgICAgICAgfSwgNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZUhlYWwoaGVhbGVyTmFtZSwgaGVhbGVyVGVhbSwgdGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IGhlYWxlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChoZWFsZXJOYW1lLCBoZWFsZXJUZWFtKTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcblxyXG4gICAgICAgIGlmIChoZWFsZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7aGVhbGVyVGVhbX0tJHtoZWFsZXJOYW1lfWA7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmNoYXJhY3Rlckhhc0hlYWxba2V5XSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKGtleSwgJ2hlYWxpbmcud2VicCcsIDE1MDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKGtleSwgJ3NraWxsLndlYnAnLCAxNTAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBoZWFsZXIuY2xhc3NMaXN0LmFkZCgnaGVhbGluZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGhlYWxlci5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsaW5nJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGVhbGVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxlZCcpLCAxNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlZmVuZChkZWZlbmRlck5hbWUsIGRlZmVuZGVyVGVhbSkge1xyXG4gICAgICAgIGNvbnN0IGRlZmVuZGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGRlZmVuZGVyTmFtZSwgZGVmZW5kZXJUZWFtKTtcclxuICAgICAgICBpZiAoZGVmZW5kZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7ZGVmZW5kZXJUZWFtfS0ke2RlZmVuZGVyTmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnZGVmZW5kaW5nLndlYnAnLCAxODAwKTtcclxuICAgICAgICAgICAgZGVmZW5kZXIuY2xhc3NMaXN0LmFkZCgnZGVmZW5kaW5nJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZGVmZW5kZXIuY2xhc3NMaXN0LnJlbW92ZSgnZGVmZW5kaW5nJyksIDE4MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRG9kZ2UodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdkb2RnaW5nJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RvZGdpbmcnKSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEZWF0aCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RlYWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hhcmFjdGVyRWxlbWVudChuYW1lLCB0ZWFtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcmFjdGVyRWxlbWVudHNbYCR7dGVhbX0tJHtuYW1lfWBdO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlMb2cobG9nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvZ0NvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBlbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBlbnRyeS5jbGFzc05hbWUgPSAnY29tYmF0LWxvZ19fZW50cnknO1xyXG5cclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdyb3VuZCcpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXJvdW5kJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3ZpY3RvcnknKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS12aWN0b3J5Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2RyYXcnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1kZWZlYXQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYWJpbGl0eV91c2UnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1hYmlsaXR5Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsZWVkX3RpY2snKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1ibGVlZCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdibGlnaHRfdGljaycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWJsaWdodCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdzdHVubmVkX3NraXAnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1zdHVuJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3JpcG9zdGVfYWN0aXZhdGUnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1yaXBvc3RlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbnRyeS5pbm5lckhUTUwgPSBsb2cubWVzc2FnZTtcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsVG9wID0gdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUhlYWx0aEJhcnMobG9nKSB7XHJcbiAgICAgICAgbGV0IGNoYXJhY3Rlck5hbWUgPSBudWxsO1xyXG4gICAgICAgIGxldCB0ZWFtTmFtZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRIUCA9IG51bGw7XHJcbiAgICAgICAgbGV0IG1heEhQID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gRMOpdGVybWluZXIgbGVzIGRvbm7DqWVzIHNlbG9uIGxlIHR5cGUgZGUgbG9nXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAnYXR0YWNrJyB8fCBsb2cudHlwZSA9PT0gJ3JpcG9zdGVfYWN0aXZhdGUnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdoZWFsJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYmxlZWRfdGljaycgfHwgbG9nLnR5cGUgPT09ICdibGlnaHRfdGljaycpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2FiaWxpdHlfdXNlJykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIHNpIG5vdXMgYXZvbnMgbGVzIGRvbm7DqWVzIG7DqWNlc3NhaXJlc1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJOYW1lICYmIHRlYW1OYW1lICYmIGN1cnJlbnRIUCAhPT0gbnVsbCAmJiBjdXJyZW50SFAgIT09IHVuZGVmaW5lZCAmJiBtYXhIUCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsIG1heEhQKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQWJpbGl0eUhlYWx0aEJhcnMobG9nKSB7XHJcbiAgICAgICAgLy8gQ29tcMOpdGVuY2VzIHF1aSBpbmZsaWdlbnQgZGVzIGTDqWfDonRzIMOgIHVuZSBjaWJsZVxyXG4gICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRIUCAhPT0gdW5kZWZpbmVkICYmIGxvZy50YXJnZXRNYXhIUCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cudGFyZ2V0SFAsIGxvZy50YXJnZXRNYXhIUCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTb2luIGRlIGdyb3VwZSA6IG1ldHRyZSDDoCBqb3VyIGNoYXF1ZSBhbGxpw6kgc29pZ27DqVxyXG4gICAgICAgIGlmIChsb2cuc3VidHlwZSA9PT0gJ3BhcnR5X2hlYWwnICYmIGxvZy5oZWFsZWQpIHtcclxuICAgICAgICAgICAgbG9nLmhlYWxlZC5mb3JFYWNoKGggPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChoLm5hbWUsIGgudGVhbSwgaC5ocCwgaC5tYXhIcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU29pbiBkJ3VyZ2VuY2UgOiBtZXR0cmUgw6Agam91ciBsZSBsYW5jZXVyXHJcbiAgICAgICAgaWYgKGxvZy5zdWJ0eXBlID09PSAnZW1lcmdlbmN5X2hlYWwnICYmIGxvZy5jYXN0ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldEhQLCBsb2cudGFyZ2V0TWF4SFApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDaGFyYWN0ZXJIUChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCBtYXhIUCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSk7XHJcblxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBtYXhIUCA+IDAgPyAoY3VycmVudEhQIC8gbWF4SFApICogMTAwIDogMDtcclxuXHJcbiAgICAgICAgLy8gTWlzZSDDoCBqb3VyIGRlIGxhIGJhcnJlIEhQIGRhbnMgbGEgem9uZSBkZSBjb21iYXQgKGJhdHRsZS1zdGFnZSlcclxuICAgICAgICBjb25zdCBocEJhciA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuaHAtYmFyX19maWxsJyk7XHJcbiAgICAgICAgY29uc3QgaHBUZXh0ID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcblxyXG4gICAgICAgIGlmIChocEJhcikge1xyXG4gICAgICAgICAgICAvLyBBbmltYXRpb24gZmx1aWRlIGRlIGxhIGJhcnJlXHJcbiAgICAgICAgICAgIGhwQmFyLnN0eWxlLnRyYW5zaXRpb24gPSBgd2lkdGggMC4zcyBlYXNlLW91dGA7XHJcbiAgICAgICAgICAgIGhwQmFyLnN0eWxlLndpZHRoID0gYCR7cGVyY2VudH0lYDtcclxuXHJcbiAgICAgICAgICAgIC8vIENsYXNzZXMgZGUgY291bGV1ciBzZWxvbiBsZSBwb3VyY2VudGFnZVxyXG4gICAgICAgICAgICBocEJhci5jbGFzc0xpc3QucmVtb3ZlKCdocC1iYXJfX2ZpbGwtLWxvdycsICdocC1iYXJfX2ZpbGwtLWNyaXRpY2FsJyk7XHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50IDw9IDI1KSB7XHJcbiAgICAgICAgICAgICAgICBocEJhci5jbGFzc0xpc3QuYWRkKCdocC1iYXJfX2ZpbGwtLWNyaXRpY2FsJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGVyY2VudCA8PSA1MCkge1xyXG4gICAgICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LmFkZCgnaHAtYmFyX19maWxsLS1sb3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhwVGV4dCkge1xyXG4gICAgICAgICAgICBocFRleHQudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50SFB9LyR7bWF4SFB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1pc2Ugw6Agam91ciBkZXMgcGFubmVhdXggZCdpbmZvIGxhdMOpcmF1eFxyXG4gICAgICAgIHRoaXMudXBkYXRlSW5mb1BhbmVsKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUluZm9QYW5lbChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQKSB7XHJcbiAgICAgICAgLy8gVHJvdXZlciBsZSBib24gcGFubmVhdSBzZWxvbiBsJ8OpcXVpcGVcclxuICAgICAgICBjb25zdCBwYW5lbENsYXNzID0gdGVhbU5hbWUgPT09ICdFcXVpcGUgMScgPyAnLmluZm8tcGFuZWwtLXRlYW0xJyA6ICcuaW5mby1wYW5lbC0tdGVhbTInO1xyXG4gICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihwYW5lbENsYXNzKTtcclxuXHJcbiAgICAgICAgaWYgKCFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBUcm91dmVyIGxlIHBlcnNvbm5hZ2UgZGFucyBsZSBwYW5uZWF1IHBhciBzb24gbm9tXHJcbiAgICAgICAgY29uc3QgY2hhcmFjdGVySW5mb3MgPSBwYW5lbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hhcmFjdGVyLWluZm8nKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGluZm8gb2YgY2hhcmFjdGVySW5mb3MpIHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZUVsID0gaW5mby5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX25hbWUnKTtcclxuICAgICAgICAgICAgaWYgKG5hbWVFbCAmJiBuYW1lRWwudGV4dENvbnRlbnQudHJpbSgpID09PSBjaGFyYWN0ZXJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0c1NwYW4gPSBpbmZvLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fc3RhdHMgc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRzU3Bhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzU3Bhbi50ZXh0Q29udGVudCA9IGN1cnJlbnRIUDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGZsYXNoIHBvdXIgbW9udHJlciBsZSBjaGFuZ2VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNTcGFuLmNsYXNzTGlzdC5hZGQoJ2hwLXVwZGF0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHN0YXRzU3Bhbi5jbGFzc0xpc3QucmVtb3ZlKCdocC11cGRhdGVkJyksIDMwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93VmljdG9yeU92ZXJsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmluYWxpc2VyIGxlIE1NUiBhIGxhIGZpbiBkdSBjb21iYXRcclxuICAgICAgICB0aGlzLmZpbmFsaXplUmF0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluYWxpemVSYXRpbmcoKSB7XHJcbiAgICAgICAgY29uc3QgZmluYWxpemVVcmwgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmZpbmFsaXplVXJsO1xyXG4gICAgICAgIGlmICghZmluYWxpemVVcmwpIHJldHVybjtcclxuXHJcbiAgICAgICAgZmV0Y2goZmluYWxpemVVcmwsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyAmJiBkYXRhLnJhdGluZ0NoYW5nZSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmF0aW5nVXBkYXRlKGRhdGEucmF0aW5nQ2hhbmdlLCBkYXRhLm5ld1JhdGluZywgZGF0YS5uZXdSYXRpbmcyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKCdFcnJldXIgZmluYWxpc2F0aW9uIHJhdGluZzonLCBlcnIpKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93UmF0aW5nVXBkYXRlKGNoYW5nZSwgbmV3UmF0aW5nLCBuZXdSYXRpbmcyKSB7XHJcbiAgICAgICAgLy8gTWV0dHJlIGEgam91ciBsZSBNTVIgYWZmaWNoZSBkYW5zIGxlIHBhbm5lYXUgam91ZXVyIChFcXVpcGUgMSlcclxuICAgICAgICBjb25zdCByYXRpbmdFbCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXBhbmVsLS10ZWFtMSAuaW5mby1wYW5lbF9fcmF0aW5nJyk7XHJcbiAgICAgICAgaWYgKHJhdGluZ0VsICYmIG5ld1JhdGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByYXRpbmdFbC5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke25ld1JhdGluZ30gTU1SYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSBhIGpvdXIgbGUgTU1SIGFmZmljaGUgZGFucyBsZSBwYW5uZWF1IGFkdmVyc2FpcmUgKEVxdWlwZSAyKVxyXG4gICAgICAgIGNvbnN0IHJhdGluZ0VsMiA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXBhbmVsLS10ZWFtMiAuaW5mby1wYW5lbF9fcmF0aW5nLS1lbmVteScpO1xyXG4gICAgICAgIGlmIChyYXRpbmdFbDIgJiYgbmV3UmF0aW5nMiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByYXRpbmdFbDIuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHtuZXdSYXRpbmcyfSBNTVJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWZmaWNoZXIgbGEgbm90aWZpY2F0aW9uIGRlIGNoYW5nZW1lbnQgZGFucyBsJ292ZXJsYXlcclxuICAgICAgICBjb25zdCBvdmVybGF5ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LW92ZXJsYXldJyk7XHJcbiAgICAgICAgaWYgKG92ZXJsYXkpIHtcclxuICAgICAgICAgICAgY29uc3Qgd2lubmVyRGl2ID0gb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcuYmF0dGxlLXN0YWdlX193aW5uZXInKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoYW5nZW1lbnQgTU1SIEVxdWlwZSAxXHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBub3RpZjEuY2xhc3NOYW1lID0gJ3JhdGluZy1jaGFuZ2UnO1xyXG4gICAgICAgICAgICBub3RpZjEuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MS4ycmVtO21hcmdpbi10b3A6MTJweDtmb250LXdlaWdodDpib2xkO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgMC41czsnO1xyXG4gICAgICAgICAgICBub3RpZjEudGV4dENvbnRlbnQgPSBjaGFuZ2UgPiAwID8gYEVxdWlwZSAxIDogKyR7Y2hhbmdlfSBNTVJgIDogYEVxdWlwZSAxIDogJHtjaGFuZ2V9IE1NUmA7XHJcbiAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5jb2xvciA9IGNoYW5nZSA+IDAgPyAnIzRjYWY1MCcgOiAnI2Y0NDMzNic7XHJcbiAgICAgICAgICAgIHdpbm5lckRpdi5hcHBlbmRDaGlsZChub3RpZjEpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hhbmdlbWVudCBNTVIgRXF1aXBlIDIgKGludmVyc2UpXHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZTIgPSAtY2hhbmdlO1xyXG4gICAgICAgICAgICBjb25zdCBub3RpZjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbm90aWYyLmNsYXNzTmFtZSA9ICdyYXRpbmctY2hhbmdlJztcclxuICAgICAgICAgICAgbm90aWYyLnN0eWxlLmNzc1RleHQgPSAnZm9udC1zaXplOjEuMnJlbTttYXJnaW4tdG9wOjZweDtmb250LXdlaWdodDpib2xkO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgMC41czsnO1xyXG4gICAgICAgICAgICBub3RpZjIudGV4dENvbnRlbnQgPSBjaGFuZ2UyID4gMCA/IGBFcXVpcGUgMiA6ICske2NoYW5nZTJ9IE1NUmAgOiBgRXF1aXBlIDIgOiAke2NoYW5nZTJ9IE1NUmA7XHJcbiAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5jb2xvciA9IGNoYW5nZTIgPiAwID8gJyM0Y2FmNTAnIDogJyNmNDQzMzYnO1xyXG4gICAgICAgICAgICB3aW5uZXJEaXYuYXBwZW5kQ2hpbGQobm90aWYyKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90aWYxLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgICAgICBub3RpZjIuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUGxheUJ1dHRvbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheUJ0bikgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcgJiYgIXRoaXMuaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gJ1BhdXNlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gJ1Rlcm1pbsOpJztcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSB0aGlzLmN1cnJlbnRJbmRleCA+IDAgPyAnUmVwcmVuZHJlJyA6ICdMYW5jZXInO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gSW5pdGlhbGlzZXIgcXVhbmQgbGUgRE9NIGVzdCBwcsOqdFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgY29tYmF0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LWxvZ3NdJyk7XHJcbiAgICBpZiAoY29tYmF0Q29udGFpbmVyKSB7XHJcbiAgICAgICAgbmV3IENvbWJhdENvbnRyb2xsZXIoY29tYmF0Q29udGFpbmVyKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21iYXRDb250cm9sbGVyO1xyXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBGUklFTkQgU1lTVEVNXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYudGV4dENvbnRlbnQgPSBzdHI7XHJcbiAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtdG9nZ2xlXScpO1xyXG4gICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXBhbmVsXScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWJhY2tkcm9wXScpO1xyXG4gICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNsb3NlXScpO1xyXG4gICAgY29uc3QgYmFkZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWJhZGdlXScpO1xyXG5cclxuICAgIGlmICghdG9nZ2xlIHx8ICFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgIGxldCBwYW5lbE9wZW4gPSBmYWxzZTtcclxuICAgIGxldCBjdXJyZW50VGFiID0gJ2ZyaWVuZHMnO1xyXG4gICAgbGV0IGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSBudWxsO1xyXG4gICAgbGV0IGxhc3RNZXNzYWdlSWQgPSAwO1xyXG4gICAgbGV0IG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgbGV0IHVucmVhZFBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICBsZXQgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHJlcXVlc3RzTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBQQU5FTCBPUEVOL0NMT1NFXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIG9wZW5QYW5lbCgpIHtcclxuICAgICAgICBwYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHBhbmVsLm9mZnNldEhlaWdodDsgLy8gcmVmbG93XHJcbiAgICAgICAgcGFuZWwuY2xhc3NMaXN0LmFkZCgnZnJpZW5kcy1wYW5lbC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ2ZyaWVuZHMtcGFuZWxfX2JhY2tkcm9wLS1vcGVuJyk7XHJcbiAgICAgICAgcGFuZWxPcGVuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCFmcmllbmRzTG9hZGVkKSB7XHJcbiAgICAgICAgICAgIGxvYWRGcmllbmRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUGFuZWwoKSB7XHJcbiAgICAgICAgcGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnZnJpZW5kcy1wYW5lbC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2ZyaWVuZHMtcGFuZWxfX2JhY2tkcm9wLS1vcGVuJyk7XHJcbiAgICAgICAgcGFuZWxPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwYW5lbE9wZW4gPyBjbG9zZVBhbmVsKCkgOiBvcGVuUGFuZWwoKSk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUGFuZWwpO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBhbmVsKTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFRBQlNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZnJpZW5kcy10YWJdJykuZm9yRWFjaCh0YWJCdG4gPT4ge1xyXG4gICAgICAgIHRhYkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFiTmFtZSA9IHRhYkJ0bi5kYXRhc2V0LmZyaWVuZHNUYWI7XHJcbiAgICAgICAgICAgIHN3aXRjaFRhYih0YWJOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXRjaFRhYih0YWJOYW1lKSB7XHJcbiAgICAgICAgY3VycmVudFRhYiA9IHRhYk5hbWU7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZyaWVuZHMtdGFiXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ2ZyaWVuZHMtcGFuZWxfX3RhYi0tYWN0aXZlJywgYnRuLmRhdGFzZXQuZnJpZW5kc1RhYiA9PT0gdGFiTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYi1jb250ZW50XScpLmZvckVhY2goY29udGVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IGNvbnRlbnQuZGF0YXNldC50YWJDb250ZW50ID09PSB0YWJOYW1lID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX3RhYnMnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19jb250ZW50Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jb252ZXJzYXRpb25dJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKHRhYk5hbWUgPT09ICdmcmllbmRzJyAmJiAhZnJpZW5kc0xvYWRlZCkgbG9hZEZyaWVuZHMoKTtcclxuICAgICAgICBpZiAodGFiTmFtZSA9PT0gJ3JlcXVlc3RzJyAmJiAhcmVxdWVzdHNMb2FkZWQpIGxvYWRSZXF1ZXN0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTE9BRCBGUklFTkRTIExJU1RcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gbG9hZEZyaWVuZHMoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGFiLWNvbnRlbnQ9XCJmcmllbmRzXCJdJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gQ2hhcmdlbWVudC4uLjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy9saXN0Jywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZyaWVuZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj48aSBjbGFzcz1cImZhcyBmYS1naG9zdFwiPjwvaT4gQXVjdW4gY29tcGFnbm9uLi4uIExlIGRvbmpvbiBlc3Qgc29saXRhaXJlLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gZGF0YS5mcmllbmRzLm1hcChmID0+IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiIGRhdGEtZnJpZW5kLXVzZXItaWQ9XCIke2YudXNlcklkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7Zi5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKGYucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwoZi51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKGYudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcHJldmlld1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtmLmxhc3RNZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoZi5sYXN0TWVzc2FnZS5pc0Zyb21NZSA/ICdWb3VzOiAnIDogJycpICsgZXNjYXBlSHRtbChmLmxhc3RNZXNzYWdlLmNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnQXVjdW4gbWVzc2FnZSd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19yYXRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7Zi5yYXRpbmd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mcmllbmQtaXRlbScpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9IHBhcnNlSW50KGl0ZW0uZGF0YXNldC5mcmllbmRVc2VySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmQtaXRlbV9fbmFtZScpLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Db252ZXJzYXRpb24odXNlcklkLCBuYW1lKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBMT0FEIFBFTkRJTkcgUkVRVUVTVFNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gbG9hZFJlcXVlc3RzKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRhYi1jb250ZW50PVwicmVxdWVzdHNcIl0nKTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19sb2FkaW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBDaGFyZ2VtZW50Li4uPC9kaXY+JztcclxuXHJcbiAgICAgICAgZmV0Y2goJy9mcmllbmRzL3BlbmRpbmcnLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICByZXF1ZXN0c0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlcXVlc3RzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+QXVjdW5lIGRlbWFuZGUgZW4gYXR0ZW50ZTwvcD4nO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gZGF0YS5yZXF1ZXN0cy5tYXAociA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIiBkYXRhLXJlcXVlc3QtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ci5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKHIucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwoci51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKHIudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcHJldmlld1wiPiR7ZXNjYXBlSHRtbChyLmRhdGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2FjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tYWNjZXB0XCIgZGF0YS1hY2NlcHQtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2tcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1yZWplY3RcIiBkYXRhLXJlamVjdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWNjZXB0LWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVSZXF1ZXN0KGJ0bi5kYXRhc2V0LmFjY2VwdElkLCAnYWNjZXB0Jyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmVqZWN0LWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVSZXF1ZXN0KGJ0bi5kYXRhc2V0LnJlamVjdElkLCAncmVqZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5FcnJldXIgZGUgY2hhcmdlbWVudDwvcD4nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3QoZnJpZW5kc2hpcElkLCBhY3Rpb24pIHtcclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvJHthY3Rpb259LyR7ZnJpZW5kc2hpcElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBmcmllbmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0c0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbG9hZFJlcXVlc3RzKCk7XHJcbiAgICAgICAgICAgICAgICBmZXRjaFVucmVhZENvdW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFNFQVJDSCBVU0VSU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtc2VhcmNoLWlucHV0XScpO1xyXG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtc2VhcmNoLXJlc3VsdHNdJyk7XHJcbiAgICBsZXQgc2VhcmNoVGltZW91dCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHNlYXJjaElucHV0KSB7XHJcbiAgICAgICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChzZWFyY2hUaW1lb3V0KTtcclxuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBzZWFyY2hJbnB1dC52YWx1ZS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocXVlcnkubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmV0Y2goYC9mcmllbmRzL3NlYXJjaD9xPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KX1gLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudXNlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5BdWN1biBndWVycmllciB0cm91dmU8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSBkYXRhLnVzZXJzLm1hcCh1ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGlvbkh0bWwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAnYWNjZXB0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+QW1pPC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdwZW5kaW5nX3NlbnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+RW52b3llZTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAncGVuZGluZ19yZWNlaXZlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5SZWN1ZTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9IGA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1hZGRcIiBkYXRhLWFkZC1mcmllbmQtaWQ9XCIke3UudXNlcklkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsdXNcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHt1LnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwodS5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbCh1LnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwodS51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19yYXRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7dS5yYXRpbmd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYWN0aW9uc1wiPiR7YWN0aW9uSHRtbH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFkZC1mcmllbmQtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRGcmllbmRSZXF1ZXN0KGJ0bi5kYXRhc2V0LmFkZEZyaWVuZElkLCBidG4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRGcmllbmRSZXF1ZXN0KHVzZXJJZCwgYnRuKSB7XHJcbiAgICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvcmVxdWVzdC8ke3VzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgYnRuLm91dGVySFRNTCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPkVudm95ZWU8L3NwYW4+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4geyBidG4uZGlzYWJsZWQgPSBmYWxzZTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVwb3J0TWVzc2FnZUFjdGlvbihtZXNzYWdlSWQsIGJ0bikge1xyXG4gICAgICAgIGNvbnN0IHJlYXNvbiA9IHByb21wdCgnUmFpc29uIGR1IHNpZ25hbGVtZW50IDonKTtcclxuICAgICAgICBpZiAocmVhc29uID09PSBudWxsKSByZXR1cm47IC8vIGNhbmNlbGxlZFxyXG5cclxuICAgICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke21lc3NhZ2VJZH0vcmVwb3J0YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHJlYXNvbjogcmVhc29uIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgYnRuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1jaGVja1wiPjwvaT4nO1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2NoYXQtbWVzc2FnZV9fcmVwb3J0LS1kb25lJyk7XHJcbiAgICAgICAgICAgICAgICBidG4udGl0bGUgPSAnU2lnbmFsZSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgYnRuLmRpc2FibGVkID0gZmFsc2U7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gQ09OVkVSU0FUSU9OXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIG9wZW5Db252ZXJzYXRpb24odXNlcklkLCB1c2VybmFtZSkge1xyXG4gICAgICAgIGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgICAgbGFzdE1lc3NhZ2VJZCA9IDA7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX190YWJzJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fY29udGVudCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgY29uc3QgY29udkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jb252ZXJzYXRpb25dJyk7XHJcbiAgICAgICAgY29udkVsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1uYW1lXScpLnRleHRDb250ZW50ID0gdXNlcm5hbWU7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1tZXNzYWdlc10nKTtcclxuICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gQ2hhcmdlbWVudC4uLjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke3VzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhkYXRhLm1lc3NhZ2VzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHN0YXJ0TWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJNZXNzYWdlcyhtZXNzYWdlcywgYXBwZW5kKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1tZXNzYWdlc10nKTtcclxuXHJcbiAgICAgICAgaWYgKCFhcHBlbmQpIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkRlYnV0IGRlIGxhIGNvbnZlcnNhdGlvbi4gRW52b3lleiBsZSBwcmVtaWVyIG1lc3NhZ2UhPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaSBvbiBham91dGUgZGVzIG1lc3NhZ2VzIGV0IHF1ZSBsZSBjb250ZW5ldXIgYWZmaWNoZSBsZSBwbGFjZWhvbGRlciwgbGUgc3VwcHJpbWVyXHJcbiAgICAgICAgaWYgKGFwcGVuZCAmJiBtZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gbWVzc2FnZXNFbC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fZW1wdHknKTtcclxuICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyKSBwbGFjZWhvbGRlci5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1lc3NhZ2VzLmZvckVhY2gobXNnID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5pZCA+IGxhc3RNZXNzYWdlSWQpIGxhc3RNZXNzYWdlSWQgPSBtc2cuaWQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NoYXQtbWVzc2FnZScsIG1zZy5pc0Zyb21NZSA/ICdjaGF0LW1lc3NhZ2UtLW1pbmUnIDogJ2NoYXQtbWVzc2FnZS0tdGhlaXJzJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVwb3J0QnRuID0gJyc7XHJcbiAgICAgICAgICAgIGlmICghbXNnLmlzRnJvbU1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnRCdG4gPSBgPGJ1dHRvbiBjbGFzcz1cImNoYXQtbWVzc2FnZV9fcmVwb3J0XCIgZGF0YS1yZXBvcnQtbXNnLWlkPVwiJHttc2cuaWR9XCIgdGl0bGU9XCJTaWduYWxlciBjZSBtZXNzYWdlXCI+PGkgY2xhc3M9XCJmYXMgZmEtZmxhZ1wiPjwvaT48L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgJHtlc2NhcGVIdG1sKG1zZy5jb250ZW50KX1cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hhdC1tZXNzYWdlX190aW1lXCI+JHtlc2NhcGVIdG1sKG1zZy5kYXRlKX0gJHtyZXBvcnRCdG59PC9zcGFuPlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgLy8gQXR0YWNoIHJlcG9ydCBoYW5kbGVyXHJcbiAgICAgICAgICAgIGNvbnN0IHJlcG9ydEVsID0gZGl2LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlcG9ydC1tc2ctaWRdJyk7XHJcbiAgICAgICAgICAgIGlmIChyZXBvcnRFbCkge1xyXG4gICAgICAgICAgICAgICAgcmVwb3J0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0TWVzc2FnZUFjdGlvbihyZXBvcnRFbC5kYXRhc2V0LnJlcG9ydE1zZ0lkLCByZXBvcnRFbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWVzc2FnZXNFbC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtZXNzYWdlc0VsLnNjcm9sbFRvcCA9IG1lc3NhZ2VzRWwuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlbmQgbWVzc2FnZVxyXG4gICAgY29uc3Qgc2VuZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1zZW5kXScpO1xyXG4gICAgY29uc3QgaW5wdXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1pbnB1dF0nKTtcclxuXHJcbiAgICBpZiAoc2VuZEJ0biAmJiBpbnB1dEVsKSB7XHJcbiAgICAgICAgc2VuZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbmRNZXNzYWdlKTtcclxuICAgICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHNlbmRNZXNzYWdlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VuZE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IGlucHV0RWwudmFsdWUudHJpbSgpO1xyXG4gICAgICAgIGlmICghY29udGVudCB8fCAhY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpbnB1dEVsLnZhbHVlID0gJyc7XHJcblxyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke2N1cnJlbnRDb252ZXJzYXRpb25Vc2VySWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNvbnRlbnQ6IGNvbnRlbnQgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICYmIGRhdGEubWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyTWVzc2FnZXMoW2RhdGEubWVzc2FnZV0sIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQmFjayBidXR0b25cclxuICAgIGNvbnN0IGJhY2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tYmFja10nKTtcclxuICAgIGlmIChiYWNrQnRuKSB7XHJcbiAgICAgICAgYmFja0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgICAgICBmcmllbmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaFRhYignZnJpZW5kcycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTUVTU0FHRSBQT0xMSU5HIChldmVyeSA1cyB3aGVuIGNvbnZlcnNhdGlvbiBvcGVuKVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBzdGFydE1lc3NhZ2VQb2xsaW5nKCkge1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7Y3VycmVudENvbnZlcnNhdGlvblVzZXJJZH0/YWZ0ZXJJZD0ke2xhc3RNZXNzYWdlSWR9YCwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5tZXNzYWdlcyAmJiBkYXRhLm1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhkYXRhLm1lc3NhZ2VzLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RvcE1lc3NhZ2VQb2xsaW5nKCkge1xyXG4gICAgICAgIGlmIChtZXNzYWdlUG9sbGluZ0ludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobWVzc2FnZVBvbGxpbmdJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFVOUkVBRCBDT1VOVCBQT0xMSU5HIChldmVyeSAzMHMsIGFsd2F5cyBhY3RpdmUpXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGZldGNoVW5yZWFkQ291bnQoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9mcmllbmRzL3VucmVhZC1jb3VudCcsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnRvdGFsID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UudGV4dENvbnRlbnQgPSBkYXRhLnRvdGFsO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdHNCYWRnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlcXVlc3RzLWJhZGdlXScpO1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdHNCYWRnZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucGVuZGluZ1JlcXVlc3RzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2UudGV4dENvbnRlbnQgPSBkYXRhLnBlbmRpbmdSZXF1ZXN0cztcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIGZldGNoVW5yZWFkQ291bnQoKTtcclxuICAgIHVucmVhZFBvbGxpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKGZldGNoVW5yZWFkQ291bnQsIDMwMDAwKTtcclxufSk7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJlc2NhcGVIdG1sIiwic3RyIiwiZGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVUZXh0Tm9kZSIsImlubmVySFRNTCIsImFkZEV2ZW50TGlzdGVuZXIiLCJidXJnZXIiLCJxdWVyeVNlbGVjdG9yIiwibmF2IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiU1RBVF9NQVgiLCJkbWciLCJzcGVlZCIsImRvZGdlIiwiY3JpdCIsImhwIiwicG9ydHJhaXRzIiwicXVlcnlTZWxlY3RvckFsbCIsImRldGFpbHMiLCJnZXRFbGVtZW50QnlJZCIsInNlbGVjdGVkTGlzdCIsImxhdW5jaEJ0biIsImxlbmd0aCIsIm1heFNlbGVjdGlvbiIsInNlbGVjdGVkSGVyb2VzIiwic2VsZWN0ZWRIZXJvSWRzIiwiZ2V0Q2F0ZWdvcnkiLCJwb3J0cmFpdCIsImRhdGFzZXQiLCJjYXRlZ29yeSIsImdldFNlbGVjdGVkUm9sZXMiLCJyb2xlcyIsIlRhbmsiLCJEUFMiLCJIZWFsZXIiLCJTdXBwb3J0IiwiZm9yRWFjaCIsImlkIiwicCIsIkFycmF5IiwiZnJvbSIsImZpbmQiLCJwcCIsImNhdCIsImNhblNlbGVjdFJvbGUiLCJwb3J0cmFpdEVsIiwicmVtb3ZlIiwiYWRkIiwibmFtZSIsInJvbGUiLCJkbWdNaW4iLCJOdW1iZXIiLCJkbWdNYXgiLCJzcHJpdGVGaWxlIiwic3ByaXRlIiwiYWJpbGl0eU5hbWUiLCJhYmlsaXR5RGVzYyIsImFiaWxpdHlDZCIsInNwcml0ZVBhdGgiLCJjb25jYXQiLCJpc1NlbGVjdGVkIiwiaW5jbHVkZXMiLCJhYmlsaXR5SHRtbCIsIk1hdGgiLCJtaW4iLCJidG5SaWdodCIsInJvbGVDYXQiLCJhbHJlYWR5U2VsZWN0ZWQiLCJkaXNhYmxlZCIsInRleHRDb250ZW50IiwiZmlsdGVyIiwiaGlkIiwiaCIsImFsZXJ0IiwicHVzaCIsInVwZGF0ZVNlbGVjdGVkVGVhbSIsImhlcm8iLCJoZXJvRWwiLCJ1cGRhdGVSb2xlSW5kaWNhdG9ycyIsInRlYW1Db21wbGV0ZSIsImluZGljYXRvciIsInNsb3QiLCJzYXZlUHJlc2V0QnRuIiwicHJlc2V0TW9kYWwiLCJwcmVzZXROYW1lSW5wdXQiLCJwcmVzZXRDb25maXJtQnRuIiwicHJlc2V0Q2FuY2VsQnRuIiwidXBkYXRlU2F2ZVByZXNldEJ0biIsIm9yaWdpbmFsVXBkYXRlU2VsZWN0ZWRUZWFtIiwiX29yaWdVcGRhdGUiLCJfb3JpZ1JvbGVJbmRpY2F0b3JzIiwidmFsdWUiLCJzdHlsZSIsImRpc3BsYXkiLCJzZXRUaW1lb3V0IiwiZm9jdXMiLCJ0cmltIiwiYm9yZGVyQ29sb3IiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNoYXJhY3RlcklkcyIsIm1hcCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsInN1Y2Nlc3MiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImVycm9yIiwiZSIsImtleSIsImNsaWNrIiwibG9hZFByZXNldCIsImlkU3RyIiwiU3RyaW5nIiwiZGVsZXRlUHJlc2V0IiwicHJlc2V0SWQiLCJjaGlwRWwiLCJjb25maXJtIiwibGlzdCIsImNoaWxkcmVuIiwiX2RvY3VtZW50JHF1ZXJ5U2VsZWN0IiwiY2hpcCIsImNoYXJJZHMiLCJwYXJzZSIsInByZXNldElkcyIsInN0b3BQcm9wYWdhdGlvbiIsInNlbGVjdGVkTGlzdE9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJpIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsInJlc3BvbnNlIiwicmVkaXJlY3RlZCIsImhyZWYiLCJ1cmwiLCJwb3B1cCIsImJhY2tkcm9wIiwiY2xvc2VCdG4iLCJjb250ZW50IiwibG9hZGVkIiwib3BlblBvcHVwIiwib2Zmc2V0SGVpZ2h0IiwiZmV0Y2hQcm9maWxlIiwiY2xvc2VQb3B1cCIsInJlbmRlclByb2ZpbGUiLCJyZXN1bHRDbGFzcyIsInIiLCJyZXN1bHRMYWJlbCIsImF2YXRhckh0bWwiLCJwcm9maWxlSW1hZ2UiLCJ1c2VybmFtZSIsImh0bWwiLCJtb3R0byIsImJpbyIsInJhdGluZyIsInN0YXRzIiwid2lucyIsImxvc3NlcyIsIndpblJhdGUiLCJmYXZvcml0ZUNoYXJhY3RlciIsImdhbWVzUGxheWVkIiwibGFzdFRlYW0iLCJjIiwicmVjZW50QmF0dGxlcyIsImIiLCJwYXJzZUludCIsInJlc3VsdCIsIm9wcG9uZW50IiwibWF0Y2hUeXBlIiwidG9VcHBlckNhc2UiLCJkYXRlIiwiY29tYmF0TXVzaWMiLCJhdWRpb1VubG9ja2VkIiwibGFzdEluZGV4IiwiQ09NQkFUX1BMQVlMSVNUIiwiZ2V0UmFuZG9tSW5kZXgiLCJmbG9vciIsInJhbmRvbSIsInBsYXlOZXh0Q29tYmF0VHJhY2siLCJwYXVzZSIsInNyYyIsIkF1ZGlvIiwidm9sdW1lIiwicGxheSIsImNvbnNvbGUiLCJsb2ciLCJ1bmxvY2siLCJvbmNlIiwiQ29tYmF0Q29udHJvbGxlciIsImNvbnRhaW5lciIsIl9jbGFzc0NhbGxDaGVjayIsImxvZ3MiLCJjdXJyZW50SW5kZXgiLCJpc1BsYXlpbmciLCJpc1BhdXNlZCIsImNoYXJhY3RlckVsZW1lbnRzIiwiY2hhcmFjdGVyTWF4SFAiLCJpbml0IiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJsb2dzRGF0YSIsImNvbWJhdExvZ3MiLCJsb2dDb250YWluZXIiLCJvdmVybGF5IiwicGxheUJ0biIsInNraXBCdG4iLCJzcGVlZEJ0bnMiLCJjaGFyYWN0ZXJTbHVncyIsImNoYXJhY3Rlckhhc0hlYWwiLCJhYmlsaXR5Q29vbGRvd25zIiwiZWwiLCJjaGFyYWN0ZXJOYW1lIiwidGVhbSIsImNoYXJhY3RlclRlYW0iLCJjaGFyYWN0ZXJTbHVnIiwiaGFzSGVhbCIsImhwVGV4dCIsIm1hdGNoIiwiYWJpbGl0eUVsZW1lbnRzIiwiY2hhck5hbWUiLCJjaGFyVGVhbSIsImFiaWxpdHlFbCIsIm1heENkIiwiYWJpbGl0eU1heENkIiwiYmFkZ2UiLCJuYW1lRWwiLCJpY29uRWwiLCJvcGFjaXR5IiwiYmluZEV2ZW50cyIsIl90aGlzMiIsInRvZ2dsZVBsYXkiLCJza2lwIiwiYnRuIiwic2V0U3BlZWQiLCJ1cGRhdGVQbGF5QnV0dG9uIiwicHJvY2Vzc05leHRMb2ciLCJkaXNwbGF5TG9nIiwidXBkYXRlSGVhbHRoQmFycyIsInRyYWNrQWJpbGl0eUNvb2xkb3ducyIsInR5cGUiLCJhbmltYXRlRGVhdGgiLCJ0YXJnZXQiLCJ0YXJnZXRUZWFtIiwic2hvd1ZpY3RvcnlPdmVybGF5IiwiZXZlbnQiLCJwYXJzZUZsb2F0IiwiY3VycmVudFRhcmdldCIsImNvbWJhdFNwZWVkIiwiX3RoaXMzIiwicHJvY2Vzc0xvZyIsImRlbGF5IiwiZ2V0RGVsYXlGb3JMb2ciLCJnZXRBYmlsaXR5RGVsYXkiLCJzdWJ0eXBlIiwiX3RoaXM0IiwicGxheUFuaW1hdGlvbiIsImhwRGVsYXkiLCJnZXRIUFVwZGF0ZURlbGF5IiwiY2FzdGVyIiwiY2FzdGVyVGVhbSIsImFiaWxpdHlEYXRhIiwidXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheSIsImNkIiwiZ2V0QWJpbGl0eUhQRGVsYXkiLCJhbmltYXRlQXR0YWNrIiwiYXR0YWNrZXIiLCJhdHRhY2tlclRlYW0iLCJpc0NyaXQiLCJhbmltYXRlSGVhbCIsImhlYWxlciIsImhlYWxlclRlYW0iLCJhbmltYXRlRGVmZW5kIiwiZGVmZW5kZXIiLCJkZWZlbmRlclRlYW0iLCJhbmltYXRlRG9kZ2UiLCJhbmltYXRlRG9UIiwiYW5pbWF0ZVN0dW5uZWQiLCJwbGF5QWJpbGl0eUFuaW1hdGlvbiIsInRhcmdldE5hbWUiLCJkb3RDbGFzcyIsImdldENoYXJhY3RlckVsZW1lbnQiLCJhbmltYXRlTWFya2VkIiwiYW5pbWF0ZUJ1ZmYiLCJhbmltYXRlU3RlYWx0aCIsIl90aGlzNSIsIm1hcmtLZXkiLCJzd2FwU3ByaXRlIiwicmlwb3N0ZUtleSIsInNlbGZCdWZmS2V5IiwiaGVhbGVkIiwicGFydHlCdWZmS2V5IiwiYW5pbWF0ZVRlYW1CdWZmIiwic3RlYWx0aEtleSIsIl90aGlzNiIsIk9iamVjdCIsImtleXMiLCJzdGFydHNXaXRoIiwic3ByaXRlTmFtZSIsImR1cmF0aW9uIiwiX3RoaXM3Iiwic2x1ZyIsImltZyIsImNvbnRhaW5zIiwiYXR0YWNrZXJOYW1lIiwiaGVhbGVyTmFtZSIsImRlZmVuZGVyTmFtZSIsImVudHJ5IiwiY2xhc3NOYW1lIiwibWVzc2FnZSIsInNjcm9sbFRvcCIsInNjcm9sbEhlaWdodCIsInRlYW1OYW1lIiwiY3VycmVudEhQIiwibWF4SFAiLCJ0YXJnZXRIUCIsInRhcmdldE1heEhQIiwidXBkYXRlQWJpbGl0eUhlYWx0aEJhcnMiLCJ1bmRlZmluZWQiLCJ1cGRhdGVDaGFyYWN0ZXJIUCIsIl90aGlzOCIsIm1heEhwIiwicGVyY2VudCIsImhwQmFyIiwidHJhbnNpdGlvbiIsIndpZHRoIiwidXBkYXRlSW5mb1BhbmVsIiwicGFuZWxDbGFzcyIsInBhbmVsIiwiY2hhcmFjdGVySW5mb3MiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwiX2xvb3AiLCJpbmZvIiwic3RhdHNTcGFuIiwicyIsIm4iLCJkb25lIiwiZXJyIiwiZiIsIl90aGlzOSIsImZpbmFsaXplUmF0aW5nIiwiX3RoaXMwIiwiZmluYWxpemVVcmwiLCJyYXRpbmdDaGFuZ2UiLCJzaG93UmF0aW5nVXBkYXRlIiwibmV3UmF0aW5nIiwibmV3UmF0aW5nMiIsImNoYW5nZSIsInJhdGluZ0VsIiwicmF0aW5nRWwyIiwid2lubmVyRGl2Iiwibm90aWYxIiwiY3NzVGV4dCIsImNvbG9yIiwiY2hhbmdlMiIsIm5vdGlmMiIsImNvbWJhdENvbnRhaW5lciIsInBhbmVsT3BlbiIsImN1cnJlbnRUYWIiLCJjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkIiwibGFzdE1lc3NhZ2VJZCIsIm1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwiLCJ1bnJlYWRQb2xsaW5nSW50ZXJ2YWwiLCJmcmllbmRzTG9hZGVkIiwicmVxdWVzdHNMb2FkZWQiLCJvcGVuUGFuZWwiLCJsb2FkRnJpZW5kcyIsImNsb3NlUGFuZWwiLCJzdG9wTWVzc2FnZVBvbGxpbmciLCJ0YWJCdG4iLCJ0YWJOYW1lIiwiZnJpZW5kc1RhYiIsInN3aXRjaFRhYiIsInRhYkNvbnRlbnQiLCJsb2FkUmVxdWVzdHMiLCJmcmllbmRzIiwidXNlcklkIiwibGFzdE1lc3NhZ2UiLCJpc0Zyb21NZSIsIml0ZW0iLCJmcmllbmRVc2VySWQiLCJvcGVuQ29udmVyc2F0aW9uIiwicmVxdWVzdHMiLCJmcmllbmRzaGlwSWQiLCJoYW5kbGVSZXF1ZXN0IiwiYWNjZXB0SWQiLCJyZWplY3RJZCIsImFjdGlvbiIsImZldGNoVW5yZWFkQ291bnQiLCJzZWFyY2hJbnB1dCIsInNlYXJjaFJlc3VsdHMiLCJzZWFyY2hUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwicXVlcnkiLCJ1c2VycyIsInUiLCJhY3Rpb25IdG1sIiwiZnJpZW5kU3RhdHVzIiwic2VuZEZyaWVuZFJlcXVlc3QiLCJhZGRGcmllbmRJZCIsIm91dGVySFRNTCIsInJlcG9ydE1lc3NhZ2VBY3Rpb24iLCJtZXNzYWdlSWQiLCJyZWFzb24iLCJwcm9tcHQiLCJ0aXRsZSIsImNvbnZFbCIsIm1lc3NhZ2VzRWwiLCJyZW5kZXJNZXNzYWdlcyIsIm1lc3NhZ2VzIiwic3RhcnRNZXNzYWdlUG9sbGluZyIsImFwcGVuZCIsInBsYWNlaG9sZGVyIiwibXNnIiwicmVwb3J0QnRuIiwicmVwb3J0RWwiLCJyZXBvcnRNc2dJZCIsInNlbmRCdG4iLCJpbnB1dEVsIiwic2VuZE1lc3NhZ2UiLCJiYWNrQnRuIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwidG90YWwiLCJyZXF1ZXN0c0JhZGdlIiwicGVuZGluZ1JlcXVlc3RzIl0sInNvdXJjZVJvb3QiOiIifQ==