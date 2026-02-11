"use strict";
(self["webpackChunk"] = self["webpackChunk"] || []).push([["app"],{

/***/ "./assets/app.js"
/*!***********************!*\
  !*** ./assets/app.js ***!
  \***********************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./styles/app.scss */ "./assets/styles/app.scss");
/* harmony import */ var _fortawesome_fontawesome_free_css_all_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @fortawesome/fontawesome-free/css/all.css */ "./node_modules/@fortawesome/fontawesome-free/css/all.css");
/* harmony import */ var _js_combat_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./js/combat.js */ "./assets/js/combat.js");
/*
 * Welcome to your app's main JavaScript file!
 */




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
  dmg: 100,
  speed: 100,
  dodge: 100,
  crit: 100,
  hp: 200
};
document.addEventListener('DOMContentLoaded', function () {
  var portraits = document.querySelectorAll('.team-portrait');
  var details = document.getElementById('teamDetails');
  var selectedList = document.querySelector('.selected-list');
  var launchBtn = document.querySelector('.btn-launch');
  if (!details || portraits.length === 0) return;
  var maxSelection = 3;
  var selectedHeroes = [];
  var selectedHeroIds = [];

  // Composition obligatoire : 1 Tank, 1 DPS, 1 Support
  var ROLE_CATEGORIES = {
    'Tank': 'Tank',
    'DPS': 'DPS',
    'Support': 'Support',
    'Soigneur': 'Support',
    'Buffer': 'Support'
  };
  function getSelectedRoles() {
    var roles = {
      Tank: 0,
      DPS: 0,
      Support: 0
    };
    selectedHeroIds.forEach(function (id) {
      var p = Array.from(portraits).find(function (pp) {
        return pp.dataset.id === id;
      });
      if (p) {
        var cat = ROLE_CATEGORIES[p.dataset.role] || 'Support';
        roles[cat]++;
      }
    });
    return roles;
  }
  function canSelectRole(role) {
    var cat = ROLE_CATEGORIES[role] || 'Support';
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
      var spritePath = "/asset/sprites/".concat(spriteFile);
      var isSelected = selectedHeroIds.includes(id);
      details.innerHTML = "\n                <div class=\"team-details-content\">\n                    <h2>".concat(name, "</h2>\n                    <p class=\"role\">").concat(role, "</p>\n\n                    <div class=\"gif-container\">\n                        <img src=\"").concat(spritePath, "\" alt=\"Sprite de ").concat(name, "\">\n                    </div>\n\n                    <div class=\"stats\">\n                        <div class=\"stat\">\n                            <span>DMG</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--dmg\"\n                                    style=\"width:").concat(Math.min(dmgMax / STAT_MAX.dmg * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(dmgMin, " - ").concat(dmgMax, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>VIT</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--spd\"\n                                    style=\"width:").concat(Math.min(speed / STAT_MAX.speed * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(speed, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>DODGE</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--dodge\"\n                                    style=\"width:").concat(Math.min(dodge / STAT_MAX.dodge * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(dodge, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>CRIT</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--crit\"\n                                    style=\"width:").concat(Math.min(crit / STAT_MAX.crit * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(crit, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>HP</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--hp\"\n                                    style=\"width:").concat(Math.min(hp / STAT_MAX.hp * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(hp, "</span>\n                        </div>\n                    </div>\n\n                    <button class=\"btn-select-right\">\n                        ").concat(isSelected ? 'Désélectionner' : 'Sélectionner', "\n                    </button>\n                </div>\n            ");
      var btnRight = details.querySelector('.btn-select-right');
      var roleCat = ROLE_CATEGORIES[role] || 'Support';
      var alreadySelected = selectedHeroIds.includes(id);

      // Désactiver le bouton si le slot de ce rôle est déjà pris
      if (!alreadySelected && !canSelectRole(role)) {
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
          if (!canSelectRole(role)) {
            alert("Vous avez d\xE9j\xE0 un ".concat(roleCat, " dans votre \xE9quipe !"));
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
      var teamComplete = roles.Tank === 1 && roles.DPS === 1 && roles.Support === 1;
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
      var teamComplete = roles.Tank === 1 && roles.DPS === 1 && roles.Support === 1;
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
    var avatarHtml = data.profileImage ? "<img src=\"".concat(data.profileImage, "\" alt=\"Avatar\">") : "<i class=\"fas fa-user-circle\"></i>";
    var html = "\n            <div class=\"profile-popup__identity\">\n                <div class=\"profile-popup__avatar\">".concat(avatarHtml, "</div>\n                <div class=\"profile-popup__info\">\n                    <span class=\"profile-popup__username\">").concat(data.username, "</span>\n                    ").concat(data.motto ? "<span class=\"profile-popup__motto\">\xAB ".concat(data.motto, " \xBB</span>") : '', "\n                    ").concat(data.bio ? "<p class=\"profile-popup__bio\">".concat(data.bio, "</p>") : '', "\n                </div>\n            </div>\n\n            <div class=\"profile-popup__stats\">\n                <div class=\"profile-stat\">\n                    <span class=\"profile-stat__value\">").concat(data.rating, "</span>\n                    <span class=\"profile-stat__label\">MMR</span>\n                </div>\n                <div class=\"profile-stat\">\n                    <span class=\"profile-stat__value\">").concat(data.stats.wins, "</span>\n                    <span class=\"profile-stat__label\">Victoires</span>\n                </div>\n                <div class=\"profile-stat\">\n                    <span class=\"profile-stat__value\">").concat(data.stats.losses, "</span>\n                    <span class=\"profile-stat__label\">D\xE9faites</span>\n                </div>\n                <div class=\"profile-stat\">\n                    <span class=\"profile-stat__value\">").concat(data.stats.winRate, "%</span>\n                    <span class=\"profile-stat__label\">Win Rate</span>\n                </div>\n            </div>\n        ");
    if (data.favoriteCharacter) {
      html += "\n                <div class=\"profile-popup__section\">\n                    <h3 class=\"profile-popup__subtitle\">\n                        <i class=\"fas fa-star\"></i> Champion Favori\n                    </h3>\n                    <div class=\"profile-favorite\">\n                        <span class=\"profile-favorite__name\">".concat(data.favoriteCharacter.name, "</span>\n                        <span class=\"profile-favorite__role\">").concat(data.favoriteCharacter.role, "</span>\n                        <span class=\"profile-favorite__count\">").concat(data.favoriteCharacter.gamesPlayed, " parties</span>\n                    </div>\n                </div>\n            ");
    }
    if (data.lastTeam.length > 0) {
      html += "\n                <div class=\"profile-popup__section\">\n                    <h3 class=\"profile-popup__subtitle\">\n                        <i class=\"fas fa-users\"></i> Derni\xE8re \xC9quipe\n                    </h3>\n                    <div class=\"profile-last-team\">\n                        ".concat(data.lastTeam.map(function (c) {
        return "\n                            <div class=\"profile-last-team__member\">\n                                <span class=\"profile-last-team__name\">".concat(c.name, "</span>\n                                <span class=\"profile-last-team__role\">").concat(c.role, "</span>\n                            </div>\n                        ");
      }).join(''), "\n                    </div>\n                </div>\n            ");
    }
    if (data.recentBattles.length > 0) {
      html += "\n                <div class=\"profile-popup__section\">\n                    <h3 class=\"profile-popup__subtitle\">\n                        <i class=\"fas fa-shield-alt\"></i> Historique\n                    </h3>\n                    <div class=\"profile-history\">\n                        ".concat(data.recentBattles.map(function (b) {
        return "\n                            <a href=\"/arena/replay/".concat(b.id, "\" class=\"profile-history__entry ").concat(resultClass(b.result), "\">\n                                <span class=\"profile-history__result\">").concat(resultLabel(b.result), "</span>\n                                <span class=\"profile-history__opponent\">vs ").concat(b.opponent, "</span>\n                                <span class=\"profile-history__type\">").concat(b.matchType.toUpperCase(), "</span>\n                                <span class=\"profile-history__date\">").concat(b.date, "</span>\n                                <i class=\"fas fa-play profile-history__replay\"></i>\n                            </a>\n                        ");
      }).join(''), "\n                    </div>\n                </div>\n            ");
    } else {
      html += "\n                <div class=\"profile-popup__section\">\n                    <p class=\"profile-popup__empty\">Aucun combat enregistr\xE9</p>\n                </div>\n            ";
    }
    html += "\n            <div class=\"profile-popup__actions\">\n                <a href=\"/profile\" class=\"profile-popup__edit-link\">\n                    <i class=\"fas fa-pen\"></i> \xC9diter le profil\n                </a>\n            </div>\n        ";
    content.innerHTML = html;
  }
});
console.log("assets/app.js charg\xE9 \u2714");

/***/ },

/***/ "./assets/js/combat.js"
/*!*****************************!*\
  !*** ./assets/js/combat.js ***!
  \*****************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
          console.log('📋 Logs chargés:', this.logs.length, 'entrées');

          // Afficher un exemple de log d'attaque pour debug
          var attackLog = this.logs.find(function (log) {
            return log.type === 'attack';
          });
          if (attackLog) {
            console.log('📌 Exemple de log d\'attaque:', attackLog);
          }
        } catch (e) {
          console.error('❌ Erreur parsing logs:', e);
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
      this.container.querySelectorAll('[data-character-name]').forEach(function (el) {
        var name = el.dataset.characterName;
        var team = el.dataset.characterTeam;
        var key = "".concat(team, "-").concat(name);
        _this.characterElements[key] = el;

        // Extraire le HP max depuis le texte initial
        var hpText = el.querySelector('.hp-text');
        if (hpText) {
          var match = hpText.textContent.match(/(\d+)\/(\d+)/);
          if (match) {
            _this.characterMaxHP[key] = parseInt(match[2]);
          }
        }
      });
      console.log('👥 Personnages chargés:', Object.keys(this.characterElements));
      console.log('💚 HP max:', this.characterMaxHP);

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
          return 2000;
        // 2 secondes pour les rounds
        case 'initiative':
          return 400;
        // 0.4 secondes pour l'initiative
        case 'attack':
          return 2000;
        // 2 secondes pour les attaques
        case 'heal':
          return 1800;
        // 1.8 secondes pour les soins
        case 'defend':
          return 1500;
        // 1.5 secondes pour la défense
        case 'dodge':
          return 1200;
        // 1.2 secondes pour l'esquive
        case 'death':
          return 2500;
        // 2.5 secondes pour la mort
        case 'protect':
          return 1500;
        // 1.5 secondes pour la protection
        case 'victory':
        case 'draw':
          return 1000;
        // 1 seconde pour la victoire
        default:
          return 800;
        // 0.8 secondes par défaut
      }
    }
  }, {
    key: "processLog",
    value: function processLog(log) {
      var _this4 = this;
      this.playAnimation(log);
      this.displayLog(log);

      // Synchroniser la mise à jour des HP avec l'animation
      // Les barres se mettent à jour quand le personnage "prend le coup"
      var hpDelay = this.getHPUpdateDelay(log);
      if (hpDelay > 0) {
        setTimeout(function () {
          return _this4.updateHealthBars(log);
        }, hpDelay / this.speed);
      } else {
        this.updateHealthBars(log);
      }
    }
  }, {
    key: "getHPUpdateDelay",
    value: function getHPUpdateDelay(log) {
      switch (log.type) {
        case 'attack':
          return 350;
        // Après que l'attaque touche (300ms attaque + 50ms)
        case 'heal':
          return 400;
        // Pendant l'animation de soin
        case 'death':
          return 0;
        // Immédiat
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
      }
    }
  }, {
    key: "animateAttack",
    value: function animateAttack(attackerName, attackerTeam, targetName, targetTeam, isCrit) {
      var attacker = this.getCharacterElement(attackerName, attackerTeam);
      var target = this.getCharacterElement(targetName, targetTeam);
      if (attacker) {
        attacker.classList.add('attacking');
        setTimeout(function () {
          return attacker.classList.remove('attacking');
        }, 600);
      }
      if (target) {
        setTimeout(function () {
          target.classList.add('hurt');
          if (isCrit) target.classList.add('crit');
          setTimeout(function () {
            return target.classList.remove('hurt', 'crit');
          }, 400);
        }, 300);
      }
    }
  }, {
    key: "animateHeal",
    value: function animateHeal(healerName, healerTeam, targetName, targetTeam) {
      var healer = this.getCharacterElement(healerName, healerTeam);
      var target = this.getCharacterElement(targetName, targetTeam);
      if (healer) {
        healer.classList.add('healing');
        setTimeout(function () {
          return healer.classList.remove('healing');
        }, 800);
      }
      if (target) {
        target.classList.add('healed');
        setTimeout(function () {
          return target.classList.remove('healed');
        }, 800);
      }
    }
  }, {
    key: "animateDefend",
    value: function animateDefend(defenderName, defenderTeam) {
      var defender = this.getCharacterElement(defenderName, defenderTeam);
      if (defender) {
        defender.classList.add('defending');
        setTimeout(function () {
          return defender.classList.remove('defending');
        }, 1000);
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
        }, 600);
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
      if (log.type === 'attack') {
        characterName = log.target;
        teamName = log.targetTeam;
        currentHP = log.targetHP;
        maxHP = log.targetMaxHP;
        console.log('Attack detected - HP update:', characterName, teamName, currentHP, '/', maxHP);
      } else if (log.type === 'heal') {
        characterName = log.target;
        teamName = log.targetTeam;
        currentHP = log.targetHP;
        maxHP = log.targetMaxHP;
        console.log('Heal detected - HP update:', characterName, teamName, currentHP, '/', maxHP);
      }

      // Mettre à jour si nous avons les données nécessaires
      if (characterName && teamName && currentHP !== null && currentHP !== undefined && maxHP) {
        this.updateCharacterHP(characterName, teamName, currentHP, maxHP);
      }
    }
  }, {
    key: "updateCharacterHP",
    value: function updateCharacterHP(characterName, teamName, currentHP, maxHP) {
      var target = this.getCharacterElement(characterName, teamName);
      if (!target) {
        console.error('❌ Character element not found for:', characterName, 'in team:', teamName);
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
      var _this5 = this;
      if (this.overlay) {
        this.overlay.style.display = 'flex';
        setTimeout(function () {
          _this5.overlay.style.opacity = '1';
        }, 50);
      }

      // Finaliser le MMR a la fin du combat
      this.finalizeRating();
    }
  }, {
    key: "finalizeRating",
    value: function finalizeRating() {
      var _this6 = this;
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
          _this6.showRatingUpdate(data.ratingChange, data.newRating, data.newRating2);
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
    console.log('Initialisation du combat...');
    new CombatController(combatContainer);
  }
});
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CombatController);

/***/ },

/***/ "./node_modules/@fortawesome/fontawesome-free/css/all.css"
/*!****************************************************************!*\
  !*** ./node_modules/@fortawesome/fontawesome-free/css/all.css ***!
  \****************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "./assets/styles/app.scss"
/*!********************************!*\
  !*** ./assets/styles/app.scss ***!
  \********************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFDcEIsT0FBTyxFQUFFO01BRW5CLElBQUksSUFBSSxDQUFDYixTQUFTLElBQUksQ0FBQyxJQUFJLENBQUNDLFFBQVEsRUFBRTtRQUNsQyxJQUFJLENBQUNZLE9BQU8sQ0FBQ3BJLFdBQVcsR0FBRyxPQUFPO01BQ3RDLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQ3NILFlBQVksSUFBSSxJQUFJLENBQUNELElBQUksQ0FBQzlKLE1BQU0sRUFBRTtRQUM5QyxJQUFJLENBQUM2SyxPQUFPLENBQUNwSSxXQUFXLEdBQUcsU0FBUztRQUNwQyxJQUFJLENBQUNvSSxPQUFPLENBQUNySSxRQUFRLEdBQUcsSUFBSTtNQUNoQyxDQUFDLE1BQU07UUFDSCxJQUFJLENBQUNxSSxPQUFPLENBQUNwSSxXQUFXLEdBQUcsSUFBSSxDQUFDc0gsWUFBWSxHQUFHLENBQUMsR0FBRyxXQUFXLEdBQUcsUUFBUTtNQUM3RTtJQUNKO0VBQUM7QUFBQSxLQUdMO0FBQ0FsTCxRQUFRLENBQUNDLGdCQUFnQixDQUFDLGtCQUFrQixFQUFFLFlBQU07RUFDaEQsSUFBTXlTLGVBQWUsR0FBRzFTLFFBQVEsQ0FBQ0csYUFBYSxDQUFDLG9CQUFvQixDQUFDO0VBQ3BFLElBQUl1UyxlQUFlLEVBQUU7SUFDakI5SCxPQUFPLENBQUNDLEdBQUcsQ0FBQyw2QkFBNkIsQ0FBQztJQUMxQyxJQUFJQyxnQkFBZ0IsQ0FBQzRILGVBQWUsQ0FBQztFQUN6QztBQUNKLENBQUMsQ0FBQztBQUVGLGlFQUFlNUgsZ0JBQWdCLEU7Ozs7Ozs7Ozs7O0FDeGUvQjs7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9jb21iYXQuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzPzJkYzkiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9hcHAuc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBXZWxjb21lIHRvIHlvdXIgYXBwJ3MgbWFpbiBKYXZhU2NyaXB0IGZpbGUhXHJcbiAqL1xyXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcyc7XHJcbmltcG9ydCAnLi9qcy9jb21iYXQuanMnO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBNRU5VIEJVUkdFUlxyXG49PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGNvbnN0IGJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnVyZ2VyXCIpO1xyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLW5hdmlnYXRpb25cIik7XHJcblxyXG4gICAgaWYgKGJ1cmdlciAmJiBuYXYpIHtcclxuICAgICAgICBidXJnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIFBBR0UgVEVBTVMgKENPUlJJR8OJRSlcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qIPCflKcgTUFYIERFUyBTVEFUUyAoYWRhcHRlciDDoCB0YSBCREQgLyDDqXF1aWxpYnJhZ2UpICovXHJcbmNvbnN0IFNUQVRfTUFYID0ge1xyXG4gICAgZG1nOiAxMDAsXHJcbiAgICBzcGVlZDogMTAwLFxyXG4gICAgZG9kZ2U6IDEwMCxcclxuICAgIGNyaXQ6IDEwMCxcclxuICAgIGhwOiAyMDBcclxufTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBwb3J0cmFpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVhbS1wb3J0cmFpdCcpO1xyXG4gICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZWFtRGV0YWlscycpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkLWxpc3QnKTtcclxuICAgIGNvbnN0IGxhdW5jaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tbGF1bmNoJyk7XHJcblxyXG4gICAgaWYgKCFkZXRhaWxzIHx8IHBvcnRyYWl0cy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBtYXhTZWxlY3Rpb24gPSAzO1xyXG4gICAgbGV0IHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICBsZXQgc2VsZWN0ZWRIZXJvSWRzID0gW107XHJcblxyXG4gICAgLy8gQ29tcG9zaXRpb24gb2JsaWdhdG9pcmUgOiAxIFRhbmssIDEgRFBTLCAxIFN1cHBvcnRcclxuICAgIGNvbnN0IFJPTEVfQ0FURUdPUklFUyA9IHsgJ1RhbmsnOiAnVGFuaycsICdEUFMnOiAnRFBTJywgJ1N1cHBvcnQnOiAnU3VwcG9ydCcsICdTb2lnbmV1cic6ICdTdXBwb3J0JywgJ0J1ZmZlcic6ICdTdXBwb3J0JyB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkUm9sZXMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSB7IFRhbms6IDAsIERQUzogMCwgU3VwcG9ydDogMCB9O1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHBwID0+IHBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgaWYgKHApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhdCA9IFJPTEVfQ0FURUdPUklFU1twLmRhdGFzZXQucm9sZV0gfHwgJ1N1cHBvcnQnO1xyXG4gICAgICAgICAgICAgICAgcm9sZXNbY2F0XSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhblNlbGVjdFJvbGUocm9sZSkge1xyXG4gICAgICAgIGNvbnN0IGNhdCA9IFJPTEVfQ0FURUdPUklFU1tyb2xlXSB8fCAnU3VwcG9ydCc7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzW2NhdF0gPCAxO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcnRyYWl0cy5mb3JFYWNoKHBvcnRyYWl0ID0+IHtcclxuICAgICAgICBwb3J0cmFpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHBvcnRyYWl0LmRhdGFzZXQuaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwb3J0cmFpdC5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGUgPSBwb3J0cmFpdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01pbiA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01pbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01heCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01heCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuc3BlZWQpO1xyXG4gICAgICAgICAgICBjb25zdCBkb2RnZSA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRvZGdlKTtcclxuICAgICAgICAgICAgY29uc3QgY3JpdCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmNyaXQpO1xyXG4gICAgICAgICAgICBjb25zdCBocCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmhwKTtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlRmlsZSA9IHBvcnRyYWl0LmRhdGFzZXQuc3ByaXRlO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlUGF0aCA9IGAvYXNzZXQvc3ByaXRlcy8ke3Nwcml0ZUZpbGV9YDtcclxuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCk7XHJcblxyXG4gICAgICAgICAgICBkZXRhaWxzLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZWFtLWRldGFpbHMtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMj4ke25hbWV9PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInJvbGVcIj4ke3JvbGV9PC9wPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2lmLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c3ByaXRlUGF0aH1cIiBhbHQ9XCJTcHJpdGUgZGUgJHtuYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkRNRzwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1kbWdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGRtZ01heCAvIFNUQVRfTUFYLmRtZykgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2RtZ01pbn0gLSAke2RtZ01heH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlZJVDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1zcGRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKHNwZWVkIC8gU1RBVF9NQVguc3BlZWQpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtzcGVlZH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkRPREdFPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWRvZGdlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChkb2RnZSAvIFNUQVRfTUFYLmRvZGdlKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZG9kZ2V9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5DUklUPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWNyaXRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGNyaXQgLyBTVEFUX01BWC5jcml0KSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7Y3JpdH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkhQPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWhwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChocCAvIFNUQVRfTUFYLmhwKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7aHB9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1zZWxlY3QtcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtpc1NlbGVjdGVkID8gJ0TDqXPDqWxlY3Rpb25uZXInIDogJ1PDqWxlY3Rpb25uZXInfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBidG5SaWdodCA9IGRldGFpbHMucXVlcnlTZWxlY3RvcignLmJ0bi1zZWxlY3QtcmlnaHQnKTtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZUNhdCA9IFJPTEVfQ0FURUdPUklFU1tyb2xlXSB8fCAnU3VwcG9ydCc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscmVhZHlTZWxlY3RlZCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEw6lzYWN0aXZlciBsZSBib3V0b24gc2kgbGUgc2xvdCBkZSBjZSByw7RsZSBlc3QgZMOpasOgIHByaXNcclxuICAgICAgICAgICAgaWYgKCFhbHJlYWR5U2VsZWN0ZWQgJiYgIWNhblNlbGVjdFJvbGUocm9sZSkpIHtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LnRleHRDb250ZW50ID0gYFNsb3QgJHtyb2xlQ2F0fSBkw6lqw6AgcHJpc2A7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMgPSBzZWxlY3RlZEhlcm9JZHMuZmlsdGVyKGhpZCA9PiBoaWQgIT09IGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcyA9IHNlbGVjdGVkSGVyb2VzLmZpbHRlcihoID0+IGggIT09IG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuU2VsZWN0Um9sZShyb2xlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChgVm91cyBhdmV6IGTDqWrDoCB1biAke3JvbGVDYXR9IGRhbnMgdm90cmUgw6lxdWlwZSAhYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPj0gbWF4U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiVm91cyBwb3V2ZXogc8OpbGVjdGlvbm5lciBtYXhpbXVtIDMgcGVyc29ubmFnZXMgIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMucHVzaChuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHVwZGF0ZVNlbGVjdGVkVGVhbSgpO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQudGV4dENvbnRlbnQgPSBzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgPyAnRMOpc8OpbGVjdGlvbm5lcidcclxuICAgICAgICAgICAgICAgICAgICA6ICdTw6lsZWN0aW9ubmVyJztcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyogIFpPTkUgw4lRVUlQRSDigJQgc3ByaXRlcyBzZXVsZW1lbnQgKi9cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkVGVhbSgpIHtcclxuICAgICAgICBzZWxlY3RlZExpc3QuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGVybyA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgIGlmICghaGVybykgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gaGVyby5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZVBhdGggPSBgL2Fzc2V0L3Nwcml0ZXMvJHtoZXJvLmRhdGFzZXQuc3ByaXRlfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBoZXJvRWwuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtaGVyby1zcHJpdGUnKTtcclxuICAgICAgICAgICAgaGVyb0VsLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzcHJpdGVQYXRofVwiIGFsdD1cIlNwcml0ZSBkZSAke25hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj4ke25hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICBzZWxlY3RlZExpc3QuYXBwZW5kQ2hpbGQoaGVyb0VsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBsZXMgaW5kaWNhdGV1cnMgZGUgcsO0bGVzXHJcbiAgICAgICAgdXBkYXRlUm9sZUluZGljYXRvcnMoKTtcclxuXHJcbiAgICAgICAgaWYgKGxhdW5jaEJ0bikge1xyXG4gICAgICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbUNvbXBsZXRlID0gcm9sZXMuVGFuayA9PT0gMSAmJiByb2xlcy5EUFMgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgbGF1bmNoQnRuLmRpc2FibGVkID0gIXRlYW1Db21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUm9sZUluZGljYXRvcnMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgY29uc3QgaW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvbGUtaW5kaWNhdG9yJyk7XHJcbiAgICAgICAgaWYgKGluZGljYXRvcikge1xyXG4gICAgICAgICAgICBpbmRpY2F0b3IucXVlcnlTZWxlY3RvckFsbCgnLnJvbGUtc2xvdCcpLmZvckVhY2goc2xvdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSBzbG90LmRhdGFzZXQucm9sZTtcclxuICAgICAgICAgICAgICAgIGlmIChyb2xlc1tjYXRdID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICBQUkVTRVRTXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4gICAgY29uc3Qgc2F2ZVByZXNldEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2F2ZS1wcmVzZXQnKTtcclxuICAgIGNvbnN0IHByZXNldE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldE1vZGFsJyk7XHJcbiAgICBjb25zdCBwcmVzZXROYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0TmFtZScpO1xyXG4gICAgY29uc3QgcHJlc2V0Q29uZmlybUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRDb25maXJtJyk7XHJcbiAgICBjb25zdCBwcmVzZXRDYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0Q2FuY2VsJyk7XHJcblxyXG4gICAgLy8gTWV0dHJlIGEgam91ciBsZSBib3V0b24gc2F1dmVnYXJkZXIgc2Vsb24gbGEgc2VsZWN0aW9uXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTYXZlUHJlc2V0QnRuKCkge1xyXG4gICAgICAgIGlmIChzYXZlUHJlc2V0QnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5TdXBwb3J0ID09PSAxO1xyXG4gICAgICAgICAgICBzYXZlUHJlc2V0QnRuLmRpc2FibGVkID0gIXRlYW1Db21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXBwZWxlciB1cGRhdGVTYXZlUHJlc2V0QnRuIGEgY2hhcXVlIGNoYW5nZW1lbnQgZGUgc2VsZWN0aW9uXHJcbiAgICBjb25zdCBvcmlnaW5hbFVwZGF0ZVNlbGVjdGVkVGVhbSA9IHVwZGF0ZVNlbGVjdGVkVGVhbTtcclxuICAgIC8vIE9uIHN1cmNoYXJnZSBlbiBham91dGFudCBsJ2FwcGVsXHJcbiAgICBjb25zdCBfb3JpZ1VwZGF0ZSA9IHVwZGF0ZVNlbGVjdGVkVGVhbTtcclxuXHJcbiAgICAvLyBQYXRjaDogYWpvdXRlciBsJ2FwcGVsIGEgdXBkYXRlU2F2ZVByZXNldEJ0biBkYW5zIHVwZGF0ZVNlbGVjdGVkVGVhbVxyXG4gICAgLy8gT24gbGUgZmFpdCBlbiB3cmFwcGFudCBsZXMgaW5kaWNhdGV1cnNcclxuICAgIGNvbnN0IF9vcmlnUm9sZUluZGljYXRvcnMgPSB1cGRhdGVSb2xlSW5kaWNhdG9ycztcclxuXHJcbiAgICAvLyBPdXZyaXIgbGEgbW9kYWxcclxuICAgIGlmIChzYXZlUHJlc2V0QnRuICYmIHByZXNldE1vZGFsKSB7XHJcbiAgICAgICAgc2F2ZVByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcHJlc2V0TmFtZUlucHV0LmZvY3VzKCksIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEZlcm1lciBsYSBtb2RhbFxyXG4gICAgICAgIHByZXNldENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcHJlc2V0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcHJlc2V0TW9kYWwucXVlcnlTZWxlY3RvcignLnByZXNldC1tb2RhbF9fYmFja2Ryb3AnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcHJlc2V0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU2F1dmVnYXJkZXIgbGUgcHJlc2V0XHJcbiAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHByZXNldE5hbWVJbnB1dC52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgICAgIGlmICghbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyNkYzE0M2MnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi50ZXh0Q29udGVudCA9ICcuLi4nO1xyXG5cclxuICAgICAgICAgICAgZmV0Y2goJy90ZWFtcy9wcmVzZXRzL3NhdmUnLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJJZHM6IHNlbGVjdGVkSGVyb0lkcy5tYXAoTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlY2hhcmdlciBsYSBwYWdlIHBvdXIgYWZmaWNoZXIgbGUgbm91dmVhdSBwcmVzZXRcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEuZXJyb3IgfHwgJ0VycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi50ZXh0Q29udGVudCA9ICdTYXV2ZWdhcmRlcic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc2F1dmVnYXJkZScpO1xyXG4gICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi50ZXh0Q29udGVudCA9ICdTYXV2ZWdhcmRlcic7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBFbnRlciBwb3VyIHZhbGlkZXJcclxuICAgICAgICBwcmVzZXROYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgcHJlc2V0Q29uZmlybUJ0bi5jbGljaygpO1xyXG4gICAgICAgICAgICBwcmVzZXROYW1lSW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGFyZ2VyIHVuIHByZXNldCAoc2VsZWN0aW9uIHByb2dyYW1tYXRpcXVlIGRlcyBwZXJzb25uYWdlcylcclxuICAgIGZ1bmN0aW9uIGxvYWRQcmVzZXQoY2hhcmFjdGVySWRzKSB7XHJcbiAgICAgICAgLy8gUmVzZXQgbGEgc2VsZWN0aW9uIGFjdHVlbGxlXHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzID0gW107XHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBbXTtcclxuICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHAuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKSk7XHJcblxyXG4gICAgICAgIC8vIFNlbGVjdGlvbm5lciBsZXMgcGVyc29ubmFnZXMgZHUgcHJlc2V0XHJcbiAgICAgICAgY2hhcmFjdGVySWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpZFN0ciA9IFN0cmluZyhpZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvcnRyYWl0ID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocCA9PiBwLmRhdGFzZXQuaWQgPT09IGlkU3RyKTtcclxuICAgICAgICAgICAgaWYgKHBvcnRyYWl0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMucHVzaChpZFN0cik7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcy5wdXNoKHBvcnRyYWl0LmRhdGFzZXQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVNlbGVjdGVkVGVhbSgpO1xyXG4gICAgICAgIHVwZGF0ZVNhdmVQcmVzZXRCdG4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTdXBwcmltZXIgdW4gcHJlc2V0XHJcbiAgICBmdW5jdGlvbiBkZWxldGVQcmVzZXQocHJlc2V0SWQsIGNoaXBFbCkge1xyXG4gICAgICAgIGlmICghY29uZmlybSgnU3VwcHJpbWVyIGNlIHByZXNldCA/JykpIHJldHVybjtcclxuXHJcbiAgICAgICAgZmV0Y2goYC90ZWFtcy9wcmVzZXRzLyR7cHJlc2V0SWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGNoaXBFbC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIC8vIFNpIHBsdXMgZGUgcHJlc2V0cywgY2FjaGVyIGxhIGJhcnJlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXNldHMtYmFyX19saXN0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdCAmJiBsaXN0LmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXRzLWJhcicpPy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzdXBwcmVzc2lvbicpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBdHRhY2hlciBsZXMgZXZlbnRzIGF1eCBjaGlwcyBkZSBwcmVzZXRzXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlc2V0LWNoaXAnKS5mb3JFYWNoKGNoaXAgPT4ge1xyXG4gICAgICAgIGNvbnN0IHByZXNldElkID0gY2hpcC5kYXRhc2V0LnByZXNldElkO1xyXG4gICAgICAgIGNvbnN0IGNoYXJJZHMgPSBKU09OLnBhcnNlKGNoaXAuZGF0YXNldC5wcmVzZXRJZHMpO1xyXG5cclxuICAgICAgICBjaGlwLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtY2hpcF9fbG9hZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsb2FkUHJlc2V0KGNoYXJJZHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjaGlwLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtY2hpcF9fZGVsZXRlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBkZWxldGVQcmVzZXQocHJlc2V0SWQsIGNoaXApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gT2JzZXJ2ZXIgbGVzIGNoYW5nZW1lbnRzIGRlIHNlbGVjdGlvbiBwb3VyIGxlIGJvdXRvbiBzYXZlXHJcbiAgICAvLyBPbiB1dGlsaXNlIHVuIE11dGF0aW9uT2JzZXJ2ZXIgc3VyIHNlbGVjdGVkTGlzdFxyXG4gICAgY29uc3Qgc2VsZWN0ZWRMaXN0T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB1cGRhdGVTYXZlUHJlc2V0QnRuKCkpO1xyXG4gICAgaWYgKHNlbGVjdGVkTGlzdCkge1xyXG4gICAgICAgIHNlbGVjdGVkTGlzdE9ic2VydmVyLm9ic2VydmUoc2VsZWN0ZWRMaXN0LCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGF1bmNoQnRuKSB7XHJcbiAgICAgICAgbGF1bmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIEVudm9pIFBPU1QgQUpBWCB2ZXJzIC90ZWFtcy9zZWxlY3RcclxuICAgICAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvc2VsZWN0Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBzZWxlY3RlZEhlcm9JZHMubWFwKChpZCwgaSkgPT4gYGNoYXJhY3Rlcl9pZHNbJHtpfV09JHtlbmNvZGVVUklDb21wb25lbnQoaWQpfWApLmpvaW4oJyYnKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UucmVkaXJlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLnVybDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWRpcmlnZSBtYW51ZWxsZW1lbnQgc2kgcGFzIGRlIHJlZGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9tYXRjaG1ha2luZyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHPDqWxlY3Rpb24gZGUgbFxcJ8OpcXVpcGUuJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIFBST0ZJTEUgUE9QVVBcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtdG9nZ2xlXScpO1xyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLXBvcHVwXScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWJhY2tkcm9wXScpO1xyXG4gICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWNsb3NlXScpO1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtY29udGVudF0nKTtcclxuXHJcbiAgICBpZiAoIXRvZ2dsZSB8fCAhcG9wdXApIHJldHVybjtcclxuXHJcbiAgICBsZXQgbG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlblBvcHVwKCkge1xyXG4gICAgICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHBvcHVwLm9mZnNldEhlaWdodDsgLy8gcmVmbG93XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgncHJvZmlsZS1wb3B1cC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ3Byb2ZpbGUtcG9wdXBfX2JhY2tkcm9wLS1vcGVuJyk7XHJcblxyXG4gICAgICAgIGlmICghbG9hZGVkKSB7XHJcbiAgICAgICAgICAgIGZldGNoUHJvZmlsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2ZpbGUtcG9wdXAtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9maWxlLXBvcHVwX19iYWNrZHJvcC0tb3BlbicpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblBvcHVwKTtcclxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcbiAgICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZldGNoUHJvZmlsZSgpIHtcclxuICAgICAgICBmZXRjaCgnL2FwaS9wcm9maWxlJylcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlbmRlclByb2ZpbGUoZGF0YSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9ICc8cCBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2Vycm9yXCI+RXJyZXVyIGRlIGNoYXJnZW1lbnQ8L3A+JztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyUHJvZmlsZShkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0Q2xhc3MgPSAocikgPT4gciA9PT0gJ3dpbicgPyAncmVzdWx0LS13aW4nIDogciA9PT0gJ2xvc3MnID8gJ3Jlc3VsdC0tbG9zcycgOiAncmVzdWx0LS1kcmF3JztcclxuICAgICAgICBjb25zdCByZXN1bHRMYWJlbCA9IChyKSA9PiByID09PSAnd2luJyA/ICdWaWN0b2lyZScgOiByID09PSAnbG9zcycgPyAnRFxcdTAwZTlmYWl0ZScgOiAnTnVsJztcclxuXHJcbiAgICAgICAgY29uc3QgYXZhdGFySHRtbCA9IGRhdGEucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtkYXRhLnByb2ZpbGVJbWFnZX1cIiBhbHQ9XCJBdmF0YXJcIj5gXHJcbiAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmFzIGZhLXVzZXItY2lyY2xlXCI+PC9pPmA7XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faWRlbnRpdHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hdmF0YXJcIj4ke2F2YXRhckh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fdXNlcm5hbWVcIj4ke2RhdGEudXNlcm5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5tb3R0byA/IGA8c3BhbiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX21vdHRvXCI+XFx1MDBhYiAke2RhdGEubW90dG99IFxcdTAwYmI8L3NwYW4+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5iaW8gPyBgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19iaW9cIj4ke2RhdGEuYmlvfTwvcD5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3RhdHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2RhdGEucmF0aW5nfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5NTVI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2RhdGEuc3RhdHMud2luc308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+VmljdG9pcmVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX3ZhbHVlXCI+JHtkYXRhLnN0YXRzLmxvc3Nlc308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+RFxcdTAwZTlmYWl0ZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2RhdGEuc3RhdHMud2luUmF0ZX0lPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPldpbiBSYXRlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmZhdm9yaXRlQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zdGFyXCI+PC9pPiBDaGFtcGlvbiBGYXZvcmlcclxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fbmFtZVwiPiR7ZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5uYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19yb2xlXCI+JHtkYXRhLmZhdm9yaXRlQ2hhcmFjdGVyLnJvbGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX2NvdW50XCI+JHtkYXRhLmZhdm9yaXRlQ2hhcmFjdGVyLmdhbWVzUGxheWVkfSBwYXJ0aWVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5sYXN0VGVhbS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS11c2Vyc1wiPjwvaT4gRGVybmlcXHUwMGU4cmUgXFx1MDBjOXF1aXBlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtkYXRhLmxhc3RUZWFtLm1hcChjID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fbWVtYmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fbmFtZVwiPiR7Yy5uYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtX19yb2xlXCI+JHtjLnJvbGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5yZWNlbnRCYXR0bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXNoaWVsZC1hbHRcIj48L2k+IEhpc3RvcmlxdWVcclxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtkYXRhLnJlY2VudEJhdHRsZXMubWFwKGIgPT4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9hcmVuYS9yZXBsYXkvJHtiLmlkfVwiIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19lbnRyeSAke3Jlc3VsdENsYXNzKGIucmVzdWx0KX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fcmVzdWx0XCI+JHtyZXN1bHRMYWJlbChiLnJlc3VsdCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19vcHBvbmVudFwiPnZzICR7Yi5vcHBvbmVudH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX3R5cGVcIj4ke2IubWF0Y2hUeXBlLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19kYXRlXCI+JHtiLmRhdGV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsYXkgcHJvZmlsZS1oaXN0b3J5X19yZXBsYXlcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZW1wdHlcIj5BdWN1biBjb21iYXQgZW5yZWdpc3RyXFx1MDBlOTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3Byb2ZpbGVcIiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2VkaXQtbGlua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlblwiPjwvaT4gXFx1MDBjOWRpdGVyIGxlIHByb2ZpbFxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuY29uc29sZS5sb2coJ2Fzc2V0cy9hcHAuanMgY2hhcmdcXHUwMGU5IFxcdTI3MTQnKTtcclxuIiwiLyoqXHJcbiAqIENvbWJhdCBBbmltYXRpb24gQ29udHJvbGxlclxyXG4gKiBHw6hyZSBsJ2FmZmljaGFnZSBwcm9ncmVzc2lmIGRlcyBsb2dzIGRlIGNvbWJhdCBhdmVjIGFuaW1hdGlvbnNcclxuICovXHJcbmNsYXNzIENvbWJhdENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5sb2dzID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAxO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyRWxlbWVudHMgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlck1heEhQID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGVzIGxvZ3MgZGVwdWlzIGwnYXR0cmlidXQgZGF0YVxyXG4gICAgICAgIGNvbnN0IGxvZ3NEYXRhID0gdGhpcy5jb250YWluZXIuZGF0YXNldC5jb21iYXRMb2dzO1xyXG4gICAgICAgIGlmIChsb2dzRGF0YSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dzID0gSlNPTi5wYXJzZShsb2dzRGF0YSk7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn8J+TiyBMb2dzIGNoYXJnw6lzOicsIHRoaXMubG9ncy5sZW5ndGgsICdlbnRyw6llcycpO1xyXG5cclxuICAgICAgICAgICAgICAgIC8vIEFmZmljaGVyIHVuIGV4ZW1wbGUgZGUgbG9nIGQnYXR0YXF1ZSBwb3VyIGRlYnVnXHJcbiAgICAgICAgICAgICAgICBjb25zdCBhdHRhY2tMb2cgPSB0aGlzLmxvZ3MuZmluZChsb2cgPT4gbG9nLnR5cGUgPT09ICdhdHRhY2snKTtcclxuICAgICAgICAgICAgICAgIGlmIChhdHRhY2tMb2cpIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZygn8J+TjCBFeGVtcGxlIGRlIGxvZyBkXFwnYXR0YXF1ZTonLCBhdHRhY2tMb2cpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfinYwgRXJyZXVyIHBhcnNpbmcgbG9nczonLCBlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGVzIMOpbMOpbWVudHNcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1sb2ddJyk7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LW92ZXJsYXldJyk7XHJcbiAgICAgICAgdGhpcy5wbGF5QnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXBsYXldJyk7XHJcbiAgICAgICAgdGhpcy5za2lwQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXNraXBdJyk7XHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb21iYXQtc3BlZWRdJyk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgcGVyc29ubmFnZXMgYXZlYyBzdG9ja2FnZSBkZXMgSFAgbWF4IGluaXRpYXV4XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUCA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNoYXJhY3Rlci1uYW1lXScpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJOYW1lO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJUZWFtO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1trZXldID0gZWw7XHJcblxyXG4gICAgICAgICAgICAvLyBFeHRyYWlyZSBsZSBIUCBtYXggZGVwdWlzIGxlIHRleHRlIGluaXRpYWxcclxuICAgICAgICAgICAgY29uc3QgaHBUZXh0ID0gZWwucXVlcnlTZWxlY3RvcignLmhwLXRleHQnKTtcclxuICAgICAgICAgICAgaWYgKGhwVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBocFRleHQudGV4dENvbnRlbnQubWF0Y2goLyhcXGQrKVxcLyhcXGQrKS8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUFtrZXldID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNvbnNvbGUubG9nKCfwn5GlIFBlcnNvbm5hZ2VzIGNoYXJnw6lzOicsIE9iamVjdC5rZXlzKHRoaXMuY2hhcmFjdGVyRWxlbWVudHMpKTtcclxuICAgICAgICBjb25zb2xlLmxvZygn8J+SmiBIUCBtYXg6JywgdGhpcy5jaGFyYWN0ZXJNYXhIUCk7XHJcblxyXG4gICAgICAgIC8vIENhY2hlciBsJ292ZXJsYXlcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZpZGVyIGxlIGxvZ1xyXG4gICAgICAgIGlmICh0aGlzLmxvZ0NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyBMYW5jZXIgYXV0b21hdGlxdWVtZW50IGFwcsOocyB1biBkw6lsYWlcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGxheSgpLCA4MDApO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheUJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZVBsYXkoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5za2lwQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2tpcCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuc2V0U3BlZWQoZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nICYmICF0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTmV4dExvZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVBsYXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZyB8fCB0aGlzLmlzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2tpcCgpIHtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gQWZmaWNoZXIgdG91cyBsZXMgbG9ncyByZXN0YW50c1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9nID0gdGhpcy5sb2dzW3RoaXMuY3VycmVudEluZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TG9nKGxvZyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdkZWF0aCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zaG93VmljdG9yeU92ZXJsYXkoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTcGVlZChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHNwZWVkID0gcGFyc2VGbG9hdChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY29tYmF0U3BlZWQpO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbCdVSVxyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zLmZvckVhY2goYnRuID0+IGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTmV4dExvZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nIHx8IHRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmljdG9yeU92ZXJsYXkoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZyA9IHRoaXMubG9nc1t0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTG9nKGxvZyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsZXIgbGUgZMOpbGFpXHJcbiAgICAgICAgbGV0IGRlbGF5ID0gdGhpcy5nZXREZWxheUZvckxvZyhsb2cpO1xyXG4gICAgICAgIGRlbGF5ID0gZGVsYXkgLyB0aGlzLnNwZWVkO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvY2Vzc05leHRMb2coKSwgZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlbGF5Rm9yTG9nKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncm91bmQnOiByZXR1cm4gMjAwMDsgICAgICAgICAvLyAyIHNlY29uZGVzIHBvdXIgbGVzIHJvdW5kc1xyXG4gICAgICAgICAgICBjYXNlICdpbml0aWF0aXZlJzogcmV0dXJuIDQwMDsgICAgIC8vIDAuNCBzZWNvbmRlcyBwb3VyIGwnaW5pdGlhdGl2ZVxyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOiByZXR1cm4gMjAwMDsgICAgICAgIC8vIDIgc2Vjb25kZXMgcG91ciBsZXMgYXR0YXF1ZXNcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6IHJldHVybiAxODAwOyAgICAgICAgICAvLyAxLjggc2Vjb25kZXMgcG91ciBsZXMgc29pbnNcclxuICAgICAgICAgICAgY2FzZSAnZGVmZW5kJzogcmV0dXJuIDE1MDA7ICAgICAgICAvLyAxLjUgc2Vjb25kZXMgcG91ciBsYSBkw6lmZW5zZVxyXG4gICAgICAgICAgICBjYXNlICdkb2RnZSc6IHJldHVybiAxMjAwOyAgICAgICAgIC8vIDEuMiBzZWNvbmRlcyBwb3VyIGwnZXNxdWl2ZVxyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6IHJldHVybiAyNTAwOyAgICAgICAgIC8vIDIuNSBzZWNvbmRlcyBwb3VyIGxhIG1vcnRcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdCc6IHJldHVybiAxNTAwOyAgICAgICAvLyAxLjUgc2Vjb25kZXMgcG91ciBsYSBwcm90ZWN0aW9uXHJcbiAgICAgICAgICAgIGNhc2UgJ3ZpY3RvcnknOlxyXG4gICAgICAgICAgICBjYXNlICdkcmF3JzogcmV0dXJuIDEwMDA7ICAgICAgICAgIC8vIDEgc2Vjb25kZSBwb3VyIGxhIHZpY3RvaXJlXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiA4MDA7ICAgICAgICAgICAgICAgLy8gMC44IHNlY29uZGVzIHBhciBkw6lmYXV0XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NMb2cobG9nKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKGxvZyk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TG9nKGxvZyk7XHJcblxyXG4gICAgICAgIC8vIFN5bmNocm9uaXNlciBsYSBtaXNlIMOgIGpvdXIgZGVzIEhQIGF2ZWMgbCdhbmltYXRpb25cclxuICAgICAgICAvLyBMZXMgYmFycmVzIHNlIG1ldHRlbnQgw6Agam91ciBxdWFuZCBsZSBwZXJzb25uYWdlIFwicHJlbmQgbGUgY291cFwiXHJcbiAgICAgICAgY29uc3QgaHBEZWxheSA9IHRoaXMuZ2V0SFBVcGRhdGVEZWxheShsb2cpO1xyXG4gICAgICAgIGlmIChocERlbGF5ID4gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpLCBocERlbGF5IC8gdGhpcy5zcGVlZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEhQVXBkYXRlRGVsYXkobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOiByZXR1cm4gMzUwOyAgIC8vIEFwcsOocyBxdWUgbCdhdHRhcXVlIHRvdWNoZSAoMzAwbXMgYXR0YXF1ZSArIDUwbXMpXHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOiByZXR1cm4gNDAwOyAgICAgLy8gUGVuZGFudCBsJ2FuaW1hdGlvbiBkZSBzb2luXHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzogcmV0dXJuIDA7ICAgICAgLy8gSW1tw6lkaWF0XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QW5pbWF0aW9uKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuYXR0YWNrZXIsIGxvZy5hdHRhY2tlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cuaXNDcml0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmhlYWxlciwgbG9nLmhlYWxlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVmZW5kKGxvZy5kZWZlbmRlciwgbG9nLmRlZmVuZGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9kZ2UobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlQXR0YWNrKGF0dGFja2VyTmFtZSwgYXR0YWNrZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtLCBpc0NyaXQpIHtcclxuICAgICAgICBjb25zdCBhdHRhY2tlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChhdHRhY2tlck5hbWUsIGF0dGFja2VyVGVhbSk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG5cclxuICAgICAgICBpZiAoYXR0YWNrZXIpIHtcclxuICAgICAgICAgICAgYXR0YWNrZXIuY2xhc3NMaXN0LmFkZCgnYXR0YWNraW5nJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gYXR0YWNrZXIuY2xhc3NMaXN0LnJlbW92ZSgnYXR0YWNraW5nJyksIDYwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2h1cnQnKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0NyaXQpIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdjcml0Jyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdodXJ0JywgJ2NyaXQnKSwgNDAwKTtcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZUhlYWwoaGVhbGVyTmFtZSwgaGVhbGVyVGVhbSwgdGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IGhlYWxlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChoZWFsZXJOYW1lLCBoZWFsZXJUZWFtKTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcblxyXG4gICAgICAgIGlmIChoZWFsZXIpIHtcclxuICAgICAgICAgICAgaGVhbGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWxpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBoZWFsZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGVhbGluZycpLCA4MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGVhbGVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxlZCcpLCA4MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRGVmZW5kKGRlZmVuZGVyTmFtZSwgZGVmZW5kZXJUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgZGVmZW5kZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoZGVmZW5kZXJOYW1lLCBkZWZlbmRlclRlYW0pO1xyXG4gICAgICAgIGlmIChkZWZlbmRlcikge1xyXG4gICAgICAgICAgICBkZWZlbmRlci5jbGFzc0xpc3QuYWRkKCdkZWZlbmRpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBkZWZlbmRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWZlbmRpbmcnKSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEb2RnZSh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RvZGdpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZG9kZ2luZycpLCA2MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRGVhdGgodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdkZWFkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldENoYXJhY3RlckVsZW1lbnQobmFtZSwgdGVhbSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2Ake3RlYW19LSR7bmFtZX1gXTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5TG9nKGxvZykge1xyXG4gICAgICAgIGlmICghdGhpcy5sb2dDb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgZW50cnkuY2xhc3NOYW1lID0gJ2NvbWJhdC1sb2dfX2VudHJ5JztcclxuXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAncm91bmQnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1yb3VuZCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICd2aWN0b3J5Jykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tdmljdG9yeScpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdkcmF3Jykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tZGVmZWF0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbnRyeS5pbm5lckhUTUwgPSBsb2cubWVzc2FnZTtcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsVG9wID0gdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUhlYWx0aEJhcnMobG9nKSB7XHJcbiAgICAgICAgbGV0IGNoYXJhY3Rlck5hbWUgPSBudWxsO1xyXG4gICAgICAgIGxldCB0ZWFtTmFtZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRIUCA9IG51bGw7XHJcbiAgICAgICAgbGV0IG1heEhQID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gRMOpdGVybWluZXIgbGVzIGRvbm7DqWVzIHNlbG9uIGxlIHR5cGUgZGUgbG9nXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAnYXR0YWNrJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0F0dGFjayBkZXRlY3RlZCAtIEhQIHVwZGF0ZTonLCBjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCAnLycsIG1heEhQKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnaGVhbCcpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdIZWFsIGRldGVjdGVkIC0gSFAgdXBkYXRlOicsIGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsICcvJywgbWF4SFApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgc2kgbm91cyBhdm9ucyBsZXMgZG9ubsOpZXMgbsOpY2Vzc2FpcmVzXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlck5hbWUgJiYgdGVhbU5hbWUgJiYgY3VycmVudEhQICE9PSBudWxsICYmIGN1cnJlbnRIUCAhPT0gdW5kZWZpbmVkICYmIG1heEhQKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCwgbWF4SFApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDaGFyYWN0ZXJIUChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCBtYXhIUCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSk7XHJcblxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+KdjCBDaGFyYWN0ZXIgZWxlbWVudCBub3QgZm91bmQgZm9yOicsIGNoYXJhY3Rlck5hbWUsICdpbiB0ZWFtOicsIHRlYW1OYW1lKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IG1heEhQID4gMCA/IChjdXJyZW50SFAgLyBtYXhIUCkgKiAxMDAgOiAwO1xyXG5cclxuICAgICAgICAvLyBNaXNlIMOgIGpvdXIgZGUgbGEgYmFycmUgSFAgZGFucyBsYSB6b25lIGRlIGNvbWJhdCAoYmF0dGxlLXN0YWdlKVxyXG4gICAgICAgIGNvbnN0IGhwQmFyID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ocC1iYXJfX2ZpbGwnKTtcclxuICAgICAgICBjb25zdCBocFRleHQgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmhwLXRleHQnKTtcclxuXHJcbiAgICAgICAgaWYgKGhwQmFyKSB7XHJcbiAgICAgICAgICAgIC8vIEFuaW1hdGlvbiBmbHVpZGUgZGUgbGEgYmFycmVcclxuICAgICAgICAgICAgaHBCYXIuc3R5bGUudHJhbnNpdGlvbiA9IGB3aWR0aCAwLjNzIGVhc2Utb3V0YDtcclxuICAgICAgICAgICAgaHBCYXIuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50fSVgO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xhc3NlcyBkZSBjb3VsZXVyIHNlbG9uIGxlIHBvdXJjZW50YWdlXHJcbiAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hwLWJhcl9fZmlsbC0tbG93JywgJ2hwLWJhcl9fZmlsbC0tY3JpdGljYWwnKTtcclxuICAgICAgICAgICAgaWYgKHBlcmNlbnQgPD0gMjUpIHtcclxuICAgICAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5hZGQoJ2hwLWJhcl9fZmlsbC0tY3JpdGljYWwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwZXJjZW50IDw9IDUwKSB7XHJcbiAgICAgICAgICAgICAgICBocEJhci5jbGFzc0xpc3QuYWRkKCdocC1iYXJfX2ZpbGwtLWxvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaHBUZXh0KSB7XHJcbiAgICAgICAgICAgIGhwVGV4dC50ZXh0Q29udGVudCA9IGAke2N1cnJlbnRIUH0vJHttYXhIUH1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWlzZSDDoCBqb3VyIGRlcyBwYW5uZWF1eCBkJ2luZm8gbGF0w6lyYXV4XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbmZvUGFuZWwoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSW5mb1BhbmVsKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFApIHtcclxuICAgICAgICAvLyBUcm91dmVyIGxlIGJvbiBwYW5uZWF1IHNlbG9uIGwnw6lxdWlwZVxyXG4gICAgICAgIGNvbnN0IHBhbmVsQ2xhc3MgPSB0ZWFtTmFtZSA9PT0gJ0VxdWlwZSAxJyA/ICcuaW5mby1wYW5lbC0tdGVhbTEnIDogJy5pbmZvLXBhbmVsLS10ZWFtMic7XHJcbiAgICAgICAgY29uc3QgcGFuZWwgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKHBhbmVsQ2xhc3MpO1xyXG5cclxuICAgICAgICBpZiAoIXBhbmVsKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIFRyb3V2ZXIgbGUgcGVyc29ubmFnZSBkYW5zIGxlIHBhbm5lYXUgcGFyIHNvbiBub21cclxuICAgICAgICBjb25zdCBjaGFyYWN0ZXJJbmZvcyA9IHBhbmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGFyYWN0ZXItaW5mbycpO1xyXG4gICAgICAgIGZvciAoY29uc3QgaW5mbyBvZiBjaGFyYWN0ZXJJbmZvcykge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lRWwgPSBpbmZvLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fbmFtZScpO1xyXG4gICAgICAgICAgICBpZiAobmFtZUVsICYmIG5hbWVFbC50ZXh0Q29udGVudC50cmltKCkgPT09IGNoYXJhY3Rlck5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRzU3BhbiA9IGluZm8ucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19zdGF0cyBzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHNTcGFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNTcGFuLnRleHRDb250ZW50ID0gY3VycmVudEhQO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBBbmltYXRpb24gZmxhc2ggcG91ciBtb250cmVyIGxlIGNoYW5nZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBzdGF0c1NwYW4uY2xhc3NMaXN0LmFkZCgnaHAtdXBkYXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc3RhdHNTcGFuLmNsYXNzTGlzdC5yZW1vdmUoJ2hwLXVwZGF0ZWQnKSwgMzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dWaWN0b3J5T3ZlcmxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaW5hbGlzZXIgbGUgTU1SIGEgbGEgZmluIGR1IGNvbWJhdFxyXG4gICAgICAgIHRoaXMuZmluYWxpemVSYXRpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5hbGl6ZVJhdGluZygpIHtcclxuICAgICAgICBjb25zdCBmaW5hbGl6ZVVybCA9IHRoaXMuY29udGFpbmVyLmRhdGFzZXQuZmluYWxpemVVcmw7XHJcbiAgICAgICAgaWYgKCFmaW5hbGl6ZVVybCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBmZXRjaChmaW5hbGl6ZVVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICYmIGRhdGEucmF0aW5nQ2hhbmdlICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSYXRpbmdVcGRhdGUoZGF0YS5yYXRpbmdDaGFuZ2UsIGRhdGEubmV3UmF0aW5nLCBkYXRhLm5ld1JhdGluZzIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBmaW5hbGlzYXRpb24gcmF0aW5nOicsIGVycikpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dSYXRpbmdVcGRhdGUoY2hhbmdlLCBuZXdSYXRpbmcsIG5ld1JhdGluZzIpIHtcclxuICAgICAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIE1NUiBhZmZpY2hlIGRhbnMgbGUgcGFubmVhdSBqb3VldXIgKEVxdWlwZSAxKVxyXG4gICAgICAgIGNvbnN0IHJhdGluZ0VsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0xIC5pbmZvLXBhbmVsX19yYXRpbmcnKTtcclxuICAgICAgICBpZiAocmF0aW5nRWwgJiYgbmV3UmF0aW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7bmV3UmF0aW5nfSBNTVJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIGEgam91ciBsZSBNTVIgYWZmaWNoZSBkYW5zIGxlIHBhbm5lYXUgYWR2ZXJzYWlyZSAoRXF1aXBlIDIpXHJcbiAgICAgICAgY29uc3QgcmF0aW5nRWwyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0yIC5pbmZvLXBhbmVsX19yYXRpbmctLWVuZW15Jyk7XHJcbiAgICAgICAgaWYgKHJhdGluZ0VsMiAmJiBuZXdSYXRpbmcyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsMi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke25ld1JhdGluZzJ9IE1NUmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZmZpY2hlciBsYSBub3RpZmljYXRpb24gZGUgY2hhbmdlbWVudCBkYW5zIGwnb3ZlcmxheVxyXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtb3ZlcmxheV0nKTtcclxuICAgICAgICBpZiAob3ZlcmxheSkge1xyXG4gICAgICAgICAgICBjb25zdCB3aW5uZXJEaXYgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGUtc3RhZ2VfX3dpbm5lcicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hhbmdlbWVudCBNTVIgRXF1aXBlIDFcclxuICAgICAgICAgICAgY29uc3Qgbm90aWYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG5vdGlmMS5jbGFzc05hbWUgPSAncmF0aW5nLWNoYW5nZSc7XHJcbiAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZToxLjJyZW07bWFyZ2luLXRvcDoxMnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMS50ZXh0Q29udGVudCA9IGNoYW5nZSA+IDAgPyBgRXF1aXBlIDEgOiArJHtjaGFuZ2V9IE1NUmAgOiBgRXF1aXBlIDEgOiAke2NoYW5nZX0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYxLnN0eWxlLmNvbG9yID0gY2hhbmdlID4gMCA/ICcjNGNhZjUwJyA6ICcjZjQ0MzM2JztcclxuICAgICAgICAgICAgd2lubmVyRGl2LmFwcGVuZENoaWxkKG5vdGlmMSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGFuZ2VtZW50IE1NUiBFcXVpcGUgMiAoaW52ZXJzZSlcclxuICAgICAgICAgICAgY29uc3QgY2hhbmdlMiA9IC1jaGFuZ2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBub3RpZjIuY2xhc3NOYW1lID0gJ3JhdGluZy1jaGFuZ2UnO1xyXG4gICAgICAgICAgICBub3RpZjIuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MS4ycmVtO21hcmdpbi10b3A6NnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMi50ZXh0Q29udGVudCA9IGNoYW5nZTIgPiAwID8gYEVxdWlwZSAyIDogKyR7Y2hhbmdlMn0gTU1SYCA6IGBFcXVpcGUgMiA6ICR7Y2hhbmdlMn0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYyLnN0eWxlLmNvbG9yID0gY2hhbmdlMiA+IDAgPyAnIzRjYWY1MCcgOiAnI2Y0NDMzNic7XHJcbiAgICAgICAgICAgIHdpbm5lckRpdi5hcHBlbmRDaGlsZChub3RpZjIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3RpZjEuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQbGF5QnV0dG9uKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wbGF5QnRuKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZyAmJiAhdGhpcy5pc1BhdXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSAnUGF1c2UnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSAnVGVybWluw6knO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9IHRoaXMuY3VycmVudEluZGV4ID4gMCA/ICdSZXByZW5kcmUnIDogJ0xhbmNlcic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBJbml0aWFsaXNlciBxdWFuZCBsZSBET00gZXN0IHByw6p0XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBjb21iYXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtbG9nc10nKTtcclxuICAgIGlmIChjb21iYXRDb250YWluZXIpIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnSW5pdGlhbGlzYXRpb24gZHUgY29tYmF0Li4uJyk7XHJcbiAgICAgICAgbmV3IENvbWJhdENvbnRyb2xsZXIoY29tYmF0Q29udGFpbmVyKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21iYXRDb250cm9sbGVyO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwiYnVyZ2VyIiwicXVlcnlTZWxlY3RvciIsIm5hdiIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIlNUQVRfTUFYIiwiZG1nIiwic3BlZWQiLCJkb2RnZSIsImNyaXQiLCJocCIsInBvcnRyYWl0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkZXRhaWxzIiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3RlZExpc3QiLCJsYXVuY2hCdG4iLCJsZW5ndGgiLCJtYXhTZWxlY3Rpb24iLCJzZWxlY3RlZEhlcm9lcyIsInNlbGVjdGVkSGVyb0lkcyIsIlJPTEVfQ0FURUdPUklFUyIsImdldFNlbGVjdGVkUm9sZXMiLCJyb2xlcyIsIlRhbmsiLCJEUFMiLCJTdXBwb3J0IiwiZm9yRWFjaCIsImlkIiwicCIsIkFycmF5IiwiZnJvbSIsImZpbmQiLCJwcCIsImRhdGFzZXQiLCJjYXQiLCJyb2xlIiwiY2FuU2VsZWN0Um9sZSIsInBvcnRyYWl0IiwicmVtb3ZlIiwiYWRkIiwibmFtZSIsImRtZ01pbiIsIk51bWJlciIsImRtZ01heCIsInNwcml0ZUZpbGUiLCJzcHJpdGUiLCJzcHJpdGVQYXRoIiwiY29uY2F0IiwiaXNTZWxlY3RlZCIsImluY2x1ZGVzIiwiaW5uZXJIVE1MIiwiTWF0aCIsIm1pbiIsImJ0blJpZ2h0Iiwicm9sZUNhdCIsImFscmVhZHlTZWxlY3RlZCIsImRpc2FibGVkIiwidGV4dENvbnRlbnQiLCJmaWx0ZXIiLCJoaWQiLCJoIiwiYWxlcnQiLCJwdXNoIiwidXBkYXRlU2VsZWN0ZWRUZWFtIiwiaGVybyIsImhlcm9FbCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsInVwZGF0ZVJvbGVJbmRpY2F0b3JzIiwidGVhbUNvbXBsZXRlIiwiaW5kaWNhdG9yIiwic2xvdCIsInNhdmVQcmVzZXRCdG4iLCJwcmVzZXRNb2RhbCIsInByZXNldE5hbWVJbnB1dCIsInByZXNldENvbmZpcm1CdG4iLCJwcmVzZXRDYW5jZWxCdG4iLCJ1cGRhdGVTYXZlUHJlc2V0QnRuIiwib3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0iLCJfb3JpZ1VwZGF0ZSIsIl9vcmlnUm9sZUluZGljYXRvcnMiLCJ2YWx1ZSIsInN0eWxlIiwiZGlzcGxheSIsInNldFRpbWVvdXQiLCJmb2N1cyIsInRyaW0iLCJib3JkZXJDb2xvciIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiY2hhcmFjdGVySWRzIiwibWFwIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwic3VjY2VzcyIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZXJyb3IiLCJlIiwia2V5IiwiY2xpY2siLCJsb2FkUHJlc2V0IiwiaWRTdHIiLCJTdHJpbmciLCJkZWxldGVQcmVzZXQiLCJwcmVzZXRJZCIsImNoaXBFbCIsImNvbmZpcm0iLCJsaXN0IiwiY2hpbGRyZW4iLCJfZG9jdW1lbnQkcXVlcnlTZWxlY3QiLCJjaGlwIiwiY2hhcklkcyIsInBhcnNlIiwicHJlc2V0SWRzIiwic3RvcFByb3BhZ2F0aW9uIiwic2VsZWN0ZWRMaXN0T2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsImkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJqb2luIiwicmVzcG9uc2UiLCJyZWRpcmVjdGVkIiwiaHJlZiIsInVybCIsInBvcHVwIiwiYmFja2Ryb3AiLCJjbG9zZUJ0biIsImNvbnRlbnQiLCJsb2FkZWQiLCJvcGVuUG9wdXAiLCJvZmZzZXRIZWlnaHQiLCJmZXRjaFByb2ZpbGUiLCJjbG9zZVBvcHVwIiwicmVuZGVyUHJvZmlsZSIsInJlc3VsdENsYXNzIiwiciIsInJlc3VsdExhYmVsIiwiYXZhdGFySHRtbCIsInByb2ZpbGVJbWFnZSIsImh0bWwiLCJ1c2VybmFtZSIsIm1vdHRvIiwiYmlvIiwicmF0aW5nIiwic3RhdHMiLCJ3aW5zIiwibG9zc2VzIiwid2luUmF0ZSIsImZhdm9yaXRlQ2hhcmFjdGVyIiwiZ2FtZXNQbGF5ZWQiLCJsYXN0VGVhbSIsImMiLCJyZWNlbnRCYXR0bGVzIiwiYiIsInJlc3VsdCIsIm9wcG9uZW50IiwibWF0Y2hUeXBlIiwidG9VcHBlckNhc2UiLCJkYXRlIiwiY29uc29sZSIsImxvZyIsIkNvbWJhdENvbnRyb2xsZXIiLCJjb250YWluZXIiLCJfY2xhc3NDYWxsQ2hlY2siLCJsb2dzIiwiY3VycmVudEluZGV4IiwiaXNQbGF5aW5nIiwiaXNQYXVzZWQiLCJjaGFyYWN0ZXJFbGVtZW50cyIsImNoYXJhY3Rlck1heEhQIiwiaW5pdCIsIl9jcmVhdGVDbGFzcyIsIl90aGlzIiwibG9nc0RhdGEiLCJjb21iYXRMb2dzIiwiYXR0YWNrTG9nIiwidHlwZSIsImxvZ0NvbnRhaW5lciIsIm92ZXJsYXkiLCJwbGF5QnRuIiwic2tpcEJ0biIsInNwZWVkQnRucyIsImVsIiwiY2hhcmFjdGVyTmFtZSIsInRlYW0iLCJjaGFyYWN0ZXJUZWFtIiwiaHBUZXh0IiwibWF0Y2giLCJwYXJzZUludCIsIk9iamVjdCIsImtleXMiLCJvcGFjaXR5IiwiYmluZEV2ZW50cyIsInBsYXkiLCJfdGhpczIiLCJ0b2dnbGVQbGF5Iiwic2tpcCIsImJ0biIsInNldFNwZWVkIiwidXBkYXRlUGxheUJ1dHRvbiIsInByb2Nlc3NOZXh0TG9nIiwicGF1c2UiLCJkaXNwbGF5TG9nIiwidXBkYXRlSGVhbHRoQmFycyIsImFuaW1hdGVEZWF0aCIsInRhcmdldCIsInRhcmdldFRlYW0iLCJzaG93VmljdG9yeU92ZXJsYXkiLCJldmVudCIsInBhcnNlRmxvYXQiLCJjdXJyZW50VGFyZ2V0IiwiY29tYmF0U3BlZWQiLCJfdGhpczMiLCJwcm9jZXNzTG9nIiwiZGVsYXkiLCJnZXREZWxheUZvckxvZyIsIl90aGlzNCIsInBsYXlBbmltYXRpb24iLCJocERlbGF5IiwiZ2V0SFBVcGRhdGVEZWxheSIsImFuaW1hdGVBdHRhY2siLCJhdHRhY2tlciIsImF0dGFja2VyVGVhbSIsImlzQ3JpdCIsImFuaW1hdGVIZWFsIiwiaGVhbGVyIiwiaGVhbGVyVGVhbSIsImFuaW1hdGVEZWZlbmQiLCJkZWZlbmRlciIsImRlZmVuZGVyVGVhbSIsImFuaW1hdGVEb2RnZSIsImF0dGFja2VyTmFtZSIsInRhcmdldE5hbWUiLCJnZXRDaGFyYWN0ZXJFbGVtZW50IiwiaGVhbGVyTmFtZSIsImRlZmVuZGVyTmFtZSIsImVudHJ5IiwiY2xhc3NOYW1lIiwibWVzc2FnZSIsInNjcm9sbFRvcCIsInNjcm9sbEhlaWdodCIsInRlYW1OYW1lIiwiY3VycmVudEhQIiwibWF4SFAiLCJ0YXJnZXRIUCIsInRhcmdldE1heEhQIiwidW5kZWZpbmVkIiwidXBkYXRlQ2hhcmFjdGVySFAiLCJwZXJjZW50IiwiaHBCYXIiLCJ0cmFuc2l0aW9uIiwid2lkdGgiLCJ1cGRhdGVJbmZvUGFuZWwiLCJwYW5lbENsYXNzIiwicGFuZWwiLCJjaGFyYWN0ZXJJbmZvcyIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJfbG9vcCIsImluZm8iLCJuYW1lRWwiLCJzdGF0c1NwYW4iLCJzIiwibiIsImRvbmUiLCJlcnIiLCJmIiwiX3RoaXM1IiwiZmluYWxpemVSYXRpbmciLCJfdGhpczYiLCJmaW5hbGl6ZVVybCIsInJhdGluZ0NoYW5nZSIsInNob3dSYXRpbmdVcGRhdGUiLCJuZXdSYXRpbmciLCJuZXdSYXRpbmcyIiwiY2hhbmdlIiwicmF0aW5nRWwiLCJyYXRpbmdFbDIiLCJ3aW5uZXJEaXYiLCJub3RpZjEiLCJjc3NUZXh0IiwiY29sb3IiLCJjaGFuZ2UyIiwibm90aWYyIiwiY29tYmF0Q29udGFpbmVyIl0sInNvdXJjZVJvb3QiOiIifQ==