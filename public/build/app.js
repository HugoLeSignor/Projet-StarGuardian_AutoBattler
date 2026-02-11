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
      details.innerHTML = "\n                <div class=\"team-details-content\">\n                    <h2>".concat(name, "</h2>\n                    <p class=\"role\">").concat(role, "</p>\n\n                    <div class=\"gif-container\">\n                        <img src=\"").concat(spritePath, "\" alt=\"Sprite de ").concat(name, "\">\n                    </div>\n\n                    <div class=\"stats\">\n                        <div class=\"stat\">\n                            <span>DMG</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill\"\n                                    style=\"width:").concat(Math.min(dmgMax / STAT_MAX.dmg * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(dmgMin, " - ").concat(dmgMax, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>VIT</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill\"\n                                    style=\"width:").concat(Math.min(speed / STAT_MAX.speed * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(speed, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>DODGE</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill\"\n                                    style=\"width:").concat(Math.min(dodge / STAT_MAX.dodge * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(dodge, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>CRIT</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill\"\n                                    style=\"width:").concat(Math.min(crit / STAT_MAX.crit * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(crit, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>HP</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill\"\n                                    style=\"width:").concat(Math.min(hp / STAT_MAX.hp * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(hp, "</span>\n                        </div>\n                    </div>\n\n                    <button class=\"btn-select-right\">\n                        ").concat(isSelected ? 'Désélectionner' : 'Sélectionner', "\n                    </button>\n                </div>\n            ");
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
          _this6.showRatingUpdate(data.ratingChange, data.newRating);
        }
      })["catch"](function (err) {
        return console.error('Erreur finalisation rating:', err);
      });
    }
  }, {
    key: "showRatingUpdate",
    value: function showRatingUpdate(change, newRating) {
      // Mettre a jour le MMR affiche dans le panneau joueur
      var ratingEl = this.container.querySelector('.info-panel--team1 .info-panel__rating');
      if (ratingEl && newRating !== null) {
        ratingEl.innerHTML = "<i class=\"fas fa-trophy\"></i> ".concat(newRating, " MMR");
      }

      // Afficher la notification de changement dans l'overlay
      var overlay = this.container.querySelector('[data-combat-overlay]');
      if (overlay) {
        var notif = document.createElement('div');
        notif.className = 'rating-change';
        notif.style.cssText = 'font-size:1.4rem;margin-top:12px;font-weight:bold;opacity:0;transition:opacity 0.5s;';
        notif.textContent = change > 0 ? "+".concat(change, " MMR") : "".concat(change, " MMR");
        notif.style.color = change > 0 ? '#4caf50' : '#f44336';
        overlay.querySelector('.battle-stage__winner').appendChild(notif);
        setTimeout(function () {
          notif.style.opacity = '1';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY29tYmF0LmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcz8yZGM5Iiwid2VicGFjazovLy8uL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxyXG4gKi9cclxuaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2Nzcyc7XHJcbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5jc3MnO1xyXG5pbXBvcnQgJy4vanMvY29tYmF0LmpzJztcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgTUVOVSBCVVJHRVJcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBidXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1cmdlclwiKTtcclxuICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1uYXZpZ2F0aW9uXCIpO1xyXG5cclxuICAgIGlmIChidXJnZXIgJiYgbmF2KSB7XHJcbiAgICAgICAgYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQQUdFIFRFQU1TIChDT1JSSUfDiUUpXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKiDwn5SnIE1BWCBERVMgU1RBVFMgKGFkYXB0ZXIgw6AgdGEgQkREIC8gw6lxdWlsaWJyYWdlKSAqL1xyXG5jb25zdCBTVEFUX01BWCA9IHtcclxuICAgIGRtZzogMTAwLFxyXG4gICAgc3BlZWQ6IDEwMCxcclxuICAgIGRvZGdlOiAxMDAsXHJcbiAgICBjcml0OiAxMDAsXHJcbiAgICBocDogMjAwXHJcbn07XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgcG9ydHJhaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRlYW0tcG9ydHJhaXQnKTtcclxuICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVhbURldGFpbHMnKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC1saXN0Jyk7XHJcbiAgICBjb25zdCBsYXVuY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWxhdW5jaCcpO1xyXG5cclxuICAgIGlmICghZGV0YWlscyB8fCBwb3J0cmFpdHMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgbWF4U2VsZWN0aW9uID0gMztcclxuICAgIGxldCBzZWxlY3RlZEhlcm9lcyA9IFtdO1xyXG4gICAgbGV0IHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG5cclxuICAgIC8vIENvbXBvc2l0aW9uIG9ibGlnYXRvaXJlIDogMSBUYW5rLCAxIERQUywgMSBTdXBwb3J0XHJcbiAgICBjb25zdCBST0xFX0NBVEVHT1JJRVMgPSB7ICdUYW5rJzogJ1RhbmsnLCAnRFBTJzogJ0RQUycsICdTdXBwb3J0JzogJ1N1cHBvcnQnLCAnU29pZ25ldXInOiAnU3VwcG9ydCcsICdCdWZmZXInOiAnU3VwcG9ydCcgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZWxlY3RlZFJvbGVzKCkge1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0geyBUYW5rOiAwLCBEUFM6IDAsIFN1cHBvcnQ6IDAgfTtcclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwcCA9PiBwcC5kYXRhc2V0LmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgIGlmIChwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSBST0xFX0NBVEVHT1JJRVNbcC5kYXRhc2V0LnJvbGVdIHx8ICdTdXBwb3J0JztcclxuICAgICAgICAgICAgICAgIHJvbGVzW2NhdF0rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByb2xlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYW5TZWxlY3RSb2xlKHJvbGUpIHtcclxuICAgICAgICBjb25zdCBjYXQgPSBST0xFX0NBVEVHT1JJRVNbcm9sZV0gfHwgJ1N1cHBvcnQnO1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgIHJldHVybiByb2xlc1tjYXRdIDwgMTtcclxuICAgIH1cclxuXHJcbiAgICBwb3J0cmFpdHMuZm9yRWFjaChwb3J0cmFpdCA9PiB7XHJcbiAgICAgICAgcG9ydHJhaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcnRyYWl0cy5mb3JFYWNoKHAgPT4gcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaWQgPSBwb3J0cmFpdC5kYXRhc2V0LmlkO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gcG9ydHJhaXQuZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCByb2xlID0gcG9ydHJhaXQuZGF0YXNldC5yb2xlO1xyXG4gICAgICAgICAgICBjb25zdCBkbWdNaW4gPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kbWdNaW4pO1xyXG4gICAgICAgICAgICBjb25zdCBkbWdNYXggPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kbWdNYXgpO1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LnNwZWVkKTtcclxuICAgICAgICAgICAgY29uc3QgZG9kZ2UgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kb2RnZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyaXQgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5jcml0KTtcclxuICAgICAgICAgICAgY29uc3QgaHAgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5ocCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZUZpbGUgPSBwb3J0cmFpdC5kYXRhc2V0LnNwcml0ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZVBhdGggPSBgL2Fzc2V0L3Nwcml0ZXMvJHtzcHJpdGVGaWxlfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpO1xyXG5cclxuICAgICAgICAgICAgZGV0YWlscy5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhbS1kZXRhaWxzLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDI+JHtuYW1lfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJyb2xlXCI+JHtyb2xlfTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdpZi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Nwcml0ZVBhdGh9XCIgYWx0PVwiU3ByaXRlIGRlICR7bmFtZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ETUc8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChkbWdNYXggLyBTVEFUX01BWC5kbWcpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkbWdNaW59IC0gJHtkbWdNYXh9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5WSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChzcGVlZCAvIFNUQVRfTUFYLnNwZWVkKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7c3BlZWR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ET0RHRTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGRvZGdlIC8gU1RBVF9NQVguZG9kZ2UpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkb2RnZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNSSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChjcml0IC8gU1RBVF9NQVguY3JpdCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2NyaXR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5IUDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGxcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGhwIC8gU1RBVF9NQVguaHApICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtocH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLXNlbGVjdC1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2lzU2VsZWN0ZWQgPyAnRMOpc8OpbGVjdGlvbm5lcicgOiAnU8OpbGVjdGlvbm5lcid9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJ0blJpZ2h0ID0gZGV0YWlscy5xdWVyeVNlbGVjdG9yKCcuYnRuLXNlbGVjdC1yaWdodCcpO1xyXG4gICAgICAgICAgICBjb25zdCByb2xlQ2F0ID0gUk9MRV9DQVRFR09SSUVTW3JvbGVdIHx8ICdTdXBwb3J0JztcclxuICAgICAgICAgICAgY29uc3QgYWxyZWFkeVNlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIETDqXNhY3RpdmVyIGxlIGJvdXRvbiBzaSBsZSBzbG90IGRlIGNlIHLDtGxlIGVzdCBkw6lqw6AgcHJpc1xyXG4gICAgICAgICAgICBpZiAoIWFscmVhZHlTZWxlY3RlZCAmJiAhY2FuU2VsZWN0Um9sZShyb2xlKSkge1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQudGV4dENvbnRlbnQgPSBgU2xvdCAke3JvbGVDYXR9IGTDqWrDoCBwcmlzYDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IHNlbGVjdGVkSGVyb0lkcy5maWx0ZXIoaGlkID0+IGhpZCAhPT0gaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzID0gc2VsZWN0ZWRIZXJvZXMuZmlsdGVyKGggPT4gaCAhPT0gbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5TZWxlY3RSb2xlKHJvbGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGBWb3VzIGF2ZXogZMOpasOgIHVuICR7cm9sZUNhdH0gZGFucyB2b3RyZSDDqXF1aXBlICFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCA+PSBtYXhTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJWb3VzIHBvdXZleiBzw6lsZWN0aW9ubmVyIG1heGltdW0gMyBwZXJzb25uYWdlcyAhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcy5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcy5wdXNoKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0ZWRUZWFtKCk7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZClcclxuICAgICAgICAgICAgICAgICAgICA/ICdEw6lzw6lsZWN0aW9ubmVyJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogJ1PDqWxlY3Rpb25uZXInO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiAgWk9ORSDDiVFVSVBFIOKAlCBzcHJpdGVzIHNldWxlbWVudCAqL1xyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRUZWFtKCkge1xyXG4gICAgICAgIHNlbGVjdGVkTGlzdC5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocCA9PiBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgaWYgKCFoZXJvKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBoZXJvLmRhdGFzZXQubmFtZTtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlUGF0aCA9IGAvYXNzZXQvc3ByaXRlcy8ke2hlcm8uZGF0YXNldC5zcHJpdGV9YDtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGhlcm9FbC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1oZXJvLXNwcml0ZScpO1xyXG4gICAgICAgICAgICBoZXJvRWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Nwcml0ZVBhdGh9XCIgYWx0PVwiU3ByaXRlIGRlICR7bmFtZX1cIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPiR7bmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkTGlzdC5hcHBlbmRDaGlsZChoZXJvRWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGxlcyBpbmRpY2F0ZXVycyBkZSByw7RsZXNcclxuICAgICAgICB1cGRhdGVSb2xlSW5kaWNhdG9ycygpO1xyXG5cclxuICAgICAgICBpZiAobGF1bmNoQnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5TdXBwb3J0ID09PSAxO1xyXG4gICAgICAgICAgICBsYXVuY2hCdG4uZGlzYWJsZWQgPSAhdGVhbUNvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVSb2xlSW5kaWNhdG9ycygpIHtcclxuICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICBjb25zdCBpbmRpY2F0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm9sZS1pbmRpY2F0b3InKTtcclxuICAgICAgICBpZiAoaW5kaWNhdG9yKSB7XHJcbiAgICAgICAgICAgIGluZGljYXRvci5xdWVyeVNlbGVjdG9yQWxsKCcucm9sZS1zbG90JykuZm9yRWFjaChzbG90ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhdCA9IHNsb3QuZGF0YXNldC5yb2xlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvbGVzW2NhdF0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbGxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgIFBSRVNFVFNcclxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbiAgICBjb25zdCBzYXZlUHJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1zYXZlLXByZXNldCcpO1xyXG4gICAgY29uc3QgcHJlc2V0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0TW9kYWwnKTtcclxuICAgIGNvbnN0IHByZXNldE5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXROYW1lJyk7XHJcbiAgICBjb25zdCBwcmVzZXRDb25maXJtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldENvbmZpcm0nKTtcclxuICAgIGNvbnN0IHByZXNldENhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRDYW5jZWwnKTtcclxuXHJcbiAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIGJvdXRvbiBzYXV2ZWdhcmRlciBzZWxvbiBsYSBzZWxlY3Rpb25cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNhdmVQcmVzZXRCdG4oKSB7XHJcbiAgICAgICAgaWYgKHNhdmVQcmVzZXRCdG4pIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW1Db21wbGV0ZSA9IHJvbGVzLlRhbmsgPT09IDEgJiYgcm9sZXMuRFBTID09PSAxICYmIHJvbGVzLlN1cHBvcnQgPT09IDE7XHJcbiAgICAgICAgICAgIHNhdmVQcmVzZXRCdG4uZGlzYWJsZWQgPSAhdGVhbUNvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBBcHBlbGVyIHVwZGF0ZVNhdmVQcmVzZXRCdG4gYSBjaGFxdWUgY2hhbmdlbWVudCBkZSBzZWxlY3Rpb25cclxuICAgIGNvbnN0IG9yaWdpbmFsVXBkYXRlU2VsZWN0ZWRUZWFtID0gdXBkYXRlU2VsZWN0ZWRUZWFtO1xyXG4gICAgLy8gT24gc3VyY2hhcmdlIGVuIGFqb3V0YW50IGwnYXBwZWxcclxuICAgIGNvbnN0IF9vcmlnVXBkYXRlID0gdXBkYXRlU2VsZWN0ZWRUZWFtO1xyXG5cclxuICAgIC8vIFBhdGNoOiBham91dGVyIGwnYXBwZWwgYSB1cGRhdGVTYXZlUHJlc2V0QnRuIGRhbnMgdXBkYXRlU2VsZWN0ZWRUZWFtXHJcbiAgICAvLyBPbiBsZSBmYWl0IGVuIHdyYXBwYW50IGxlcyBpbmRpY2F0ZXVyc1xyXG4gICAgY29uc3QgX29yaWdSb2xlSW5kaWNhdG9ycyA9IHVwZGF0ZVJvbGVJbmRpY2F0b3JzO1xyXG5cclxuICAgIC8vIE91dnJpciBsYSBtb2RhbFxyXG4gICAgaWYgKHNhdmVQcmVzZXRCdG4gJiYgcHJlc2V0TW9kYWwpIHtcclxuICAgICAgICBzYXZlUHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBwcmVzZXROYW1lSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgcHJlc2V0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwcmVzZXROYW1lSW5wdXQuZm9jdXMoKSwgMTAwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRmVybWVyIGxhIG1vZGFsXHJcbiAgICAgICAgcHJlc2V0Q2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwcmVzZXRNb2RhbC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LW1vZGFsX19iYWNrZHJvcCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBTYXV2ZWdhcmRlciBsZSBwcmVzZXRcclxuICAgICAgICBwcmVzZXRDb25maXJtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gcHJlc2V0TmFtZUlucHV0LnZhbHVlLnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKCFuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVzZXROYW1lSW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI2RjMTQzYyc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLnRleHRDb250ZW50ID0gJy4uLic7XHJcblxyXG4gICAgICAgICAgICBmZXRjaCgnL3RlYW1zL3ByZXNldHMvc2F2ZScsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcklkczogc2VsZWN0ZWRIZXJvSWRzLm1hcChOdW1iZXIpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVjaGFyZ2VyIGxhIHBhZ2UgcG91ciBhZmZpY2hlciBsZSBub3V2ZWF1IHByZXNldFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoZGF0YS5lcnJvciB8fCAnRXJyZXVyIGxvcnMgZGUgbGEgc2F1dmVnYXJkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLnRleHRDb250ZW50ID0gJ1NhdXZlZ2FyZGVyJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlJyk7XHJcbiAgICAgICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLnRleHRDb250ZW50ID0gJ1NhdXZlZ2FyZGVyJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEVudGVyIHBvdXIgdmFsaWRlclxyXG4gICAgICAgIHByZXNldE5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBwcmVzZXRDb25maXJtQnRuLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoYXJnZXIgdW4gcHJlc2V0IChzZWxlY3Rpb24gcHJvZ3JhbW1hdGlxdWUgZGVzIHBlcnNvbm5hZ2VzKVxyXG4gICAgZnVuY3Rpb24gbG9hZFByZXNldChjaGFyYWN0ZXJJZHMpIHtcclxuICAgICAgICAvLyBSZXNldCBsYSBzZWxlY3Rpb24gYWN0dWVsbGVcclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMgPSBbXTtcclxuICAgICAgICBzZWxlY3RlZEhlcm9lcyA9IFtdO1xyXG4gICAgICAgIHBvcnRyYWl0cy5mb3JFYWNoKHAgPT4gcC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpKTtcclxuXHJcbiAgICAgICAgLy8gU2VsZWN0aW9ubmVyIGxlcyBwZXJzb25uYWdlcyBkdSBwcmVzZXRcclxuICAgICAgICBjaGFyYWN0ZXJJZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkU3RyID0gU3RyaW5nKGlkKTtcclxuICAgICAgICAgICAgY29uc3QgcG9ydHJhaXQgPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwID0+IHAuZGF0YXNldC5pZCA9PT0gaWRTdHIpO1xyXG4gICAgICAgICAgICBpZiAocG9ydHJhaXQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcy5wdXNoKGlkU3RyKTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzLnB1c2gocG9ydHJhaXQuZGF0YXNldC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdXBkYXRlU2VsZWN0ZWRUZWFtKCk7XHJcbiAgICAgICAgdXBkYXRlU2F2ZVByZXNldEJ0bigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFN1cHByaW1lciB1biBwcmVzZXRcclxuICAgIGZ1bmN0aW9uIGRlbGV0ZVByZXNldChwcmVzZXRJZCwgY2hpcEVsKSB7XHJcbiAgICAgICAgaWYgKCFjb25maXJtKCdTdXBwcmltZXIgY2UgcHJlc2V0ID8nKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBmZXRjaChgL3RlYW1zL3ByZXNldHMvJHtwcmVzZXRJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgY2hpcEVsLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gU2kgcGx1cyBkZSBwcmVzZXRzLCBjYWNoZXIgbGEgYmFycmVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0cy1iYXJfX2xpc3QnKTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ICYmIGxpc3QuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXNldHMtYmFyJyk/LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4gYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHN1cHByZXNzaW9uJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEF0dGFjaGVyIGxlcyBldmVudHMgYXV4IGNoaXBzIGRlIHByZXNldHNcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVzZXQtY2hpcCcpLmZvckVhY2goY2hpcCA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJlc2V0SWQgPSBjaGlwLmRhdGFzZXQucHJlc2V0SWQ7XHJcbiAgICAgICAgY29uc3QgY2hhcklkcyA9IEpTT04ucGFyc2UoY2hpcC5kYXRhc2V0LnByZXNldElkcyk7XHJcblxyXG4gICAgICAgIGNoaXAucXVlcnlTZWxlY3RvcignLnByZXNldC1jaGlwX19sb2FkJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxvYWRQcmVzZXQoY2hhcklkcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNoaXAucXVlcnlTZWxlY3RvcignLnByZXNldC1jaGlwX19kZWxldGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZVByZXNldChwcmVzZXRJZCwgY2hpcCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBPYnNlcnZlciBsZXMgY2hhbmdlbWVudHMgZGUgc2VsZWN0aW9uIHBvdXIgbGUgYm91dG9uIHNhdmVcclxuICAgIC8vIE9uIHV0aWxpc2UgdW4gTXV0YXRpb25PYnNlcnZlciBzdXIgc2VsZWN0ZWRMaXN0XHJcbiAgICBjb25zdCBzZWxlY3RlZExpc3RPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHVwZGF0ZVNhdmVQcmVzZXRCdG4oKSk7XHJcbiAgICBpZiAoc2VsZWN0ZWRMaXN0KSB7XHJcbiAgICAgICAgc2VsZWN0ZWRMaXN0T2JzZXJ2ZXIub2JzZXJ2ZShzZWxlY3RlZExpc3QsIHsgY2hpbGRMaXN0OiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXVuY2hCdG4pIHtcclxuICAgICAgICBsYXVuY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRW52b2kgUE9TVCBBSkFYIHZlcnMgL3RlYW1zL3NlbGVjdFxyXG4gICAgICAgICAgICAgICAgZmV0Y2goJy90ZWFtcy9zZWxlY3QnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHNlbGVjdGVkSGVyb0lkcy5tYXAoKGlkLCBpKSA9PiBgY2hhcmFjdGVyX2lkc1ske2l9XT0ke2VuY29kZVVSSUNvbXBvbmVudChpZCl9YCkuam9pbignJicpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZWRpcmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzcG9uc2UudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlZGlyaWdlIG1hbnVlbGxlbWVudCBzaSBwYXMgZGUgcmVkaXJlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL21hdGNobWFraW5nJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc8OpbGVjdGlvbiBkZSBsXFwnw6lxdWlwZS4nKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgUFJPRklMRSBQT1BVUFxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS10b2dnbGVdJyk7XHJcbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtcG9wdXBdJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtYmFja2Ryb3BdJyk7XHJcbiAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtY2xvc2VdJyk7XHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jb250ZW50XScpO1xyXG5cclxuICAgIGlmICghdG9nZ2xlIHx8ICFwb3B1cCkgcmV0dXJuO1xyXG5cclxuICAgIGxldCBsb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuUG9wdXAoKSB7XHJcbiAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgcG9wdXAub2Zmc2V0SGVpZ2h0OyAvLyByZWZsb3dcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgaWYgKCFsb2FkZWQpIHtcclxuICAgICAgICAgICAgZmV0Y2hQcm9maWxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2ZpbGUtcG9wdXBfX2JhY2tkcm9wLS1vcGVuJyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuUG9wdXApO1xyXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZmV0Y2hQcm9maWxlKCkge1xyXG4gICAgICAgIGZldGNoKCcvYXBpL3Byb2ZpbGUnKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyUHJvZmlsZShkYXRhKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZXJyb3JcIj5FcnJldXIgZGUgY2hhcmdlbWVudDwvcD4nO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJQcm9maWxlKGRhdGEpIHtcclxuICAgICAgICBjb25zdCByZXN1bHRDbGFzcyA9IChyKSA9PiByID09PSAnd2luJyA/ICdyZXN1bHQtLXdpbicgOiByID09PSAnbG9zcycgPyAncmVzdWx0LS1sb3NzJyA6ICdyZXN1bHQtLWRyYXcnO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdExhYmVsID0gKHIpID0+IHIgPT09ICd3aW4nID8gJ1ZpY3RvaXJlJyA6IHIgPT09ICdsb3NzJyA/ICdEXFx1MDBlOWZhaXRlJyA6ICdOdWwnO1xyXG5cclxuICAgICAgICBjb25zdCBhdmF0YXJIdG1sID0gZGF0YS5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2RhdGEucHJvZmlsZUltYWdlfVwiIGFsdD1cIkF2YXRhclwiPmBcclxuICAgICAgICAgICAgOiBgPGkgY2xhc3M9XCJmYXMgZmEtdXNlci1jaXJjbGVcIj48L2k+YDtcclxuXHJcbiAgICAgICAgbGV0IGh0bWwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19pZGVudGl0eVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2F2YXRhclwiPiR7YXZhdGFySHRtbH08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXBvcHVwX191c2VybmFtZVwiPiR7ZGF0YS51c2VybmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtkYXRhLm1vdHRvID8gYDxzcGFuIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fbW90dG9cIj5cXHUwMGFiICR7ZGF0YS5tb3R0b30gXFx1MDBiYjwvc3Bhbj5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgJHtkYXRhLmJpbyA/IGA8cCBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2Jpb1wiPiR7ZGF0YS5iaW99PC9wPmAgOiAnJ31cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdGF0c1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZGF0YS5yYXRpbmd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPk1NUjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZGF0YS5zdGF0cy53aW5zfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5WaWN0b2lyZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2RhdGEuc3RhdHMubG9zc2VzfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5EXFx1MDBlOWZhaXRlczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZGF0YS5zdGF0cy53aW5SYXRlfSU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+V2luIFJhdGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXN0YXJcIj48L2k+IENoYW1waW9uIEZhdm9yaVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19uYW1lXCI+JHtkYXRhLmZhdm9yaXRlQ2hhcmFjdGVyLm5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX3JvbGVcIj4ke2RhdGEuZmF2b3JpdGVDaGFyYWN0ZXIucm9sZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fY291bnRcIj4ke2RhdGEuZmF2b3JpdGVDaGFyYWN0ZXIuZ2FtZXNQbGF5ZWR9IHBhcnRpZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmxhc3RUZWFtLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXVzZXJzXCI+PC9pPiBEZXJuaVxcdTAwZThyZSBcXHUwMGM5cXVpcGVcclxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2RhdGEubGFzdFRlYW0ubWFwKGMgPT4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtX19tZW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtX19uYW1lXCI+JHtjLm5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX3JvbGVcIj4ke2Mucm9sZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYCkuam9pbignJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLnJlY2VudEJhdHRsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtc2hpZWxkLWFsdFwiPjwvaT4gSGlzdG9yaXF1ZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2RhdGEucmVjZW50QmF0dGxlcy5tYXAoYiA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2FyZW5hL3JlcGxheS8ke2IuaWR9XCIgY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX2VudHJ5ICR7cmVzdWx0Q2xhc3MoYi5yZXN1bHQpfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19yZXN1bHRcIj4ke3Jlc3VsdExhYmVsKGIucmVzdWx0KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX29wcG9uZW50XCI+dnMgJHtiLm9wcG9uZW50fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fdHlwZVwiPiR7Yi5tYXRjaFR5cGUudG9VcHBlckNhc2UoKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX2RhdGVcIj4ke2IuZGF0ZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGxheSBwcm9maWxlLWhpc3RvcnlfX3JlcGxheVwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYCkuam9pbignJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lbXB0eVwiPkF1Y3VuIGNvbWJhdCBlbnJlZ2lzdHJcXHUwMGU5PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2FjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvcHJvZmlsZVwiIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZWRpdC1saW5rXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGVuXCI+PC9pPiBcXHUwMGM5ZGl0ZXIgbGUgcHJvZmlsXHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIH1cclxufSk7XHJcblxyXG5jb25zb2xlLmxvZygnYXNzZXRzL2FwcC5qcyBjaGFyZ1xcdTAwZTkgXFx1MjcxNCcpO1xyXG4iLCIvKipcclxuICogQ29tYmF0IEFuaW1hdGlvbiBDb250cm9sbGVyXHJcbiAqIEfDqHJlIGwnYWZmaWNoYWdlIHByb2dyZXNzaWYgZGVzIGxvZ3MgZGUgY29tYmF0IGF2ZWMgYW5pbWF0aW9uc1xyXG4gKi9cclxuY2xhc3MgQ29tYmF0Q29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLmxvZ3MgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFAgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICAvLyBSw6ljdXDDqXJlciBsZXMgbG9ncyBkZXB1aXMgbCdhdHRyaWJ1dCBkYXRhXHJcbiAgICAgICAgY29uc3QgbG9nc0RhdGEgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmNvbWJhdExvZ3M7XHJcbiAgICAgICAgaWYgKGxvZ3NEYXRhKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ3MgPSBKU09OLnBhcnNlKGxvZ3NEYXRhKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfwn5OLIExvZ3MgY2hhcmfDqXM6JywgdGhpcy5sb2dzLmxlbmd0aCwgJ2VudHLDqWVzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWZmaWNoZXIgdW4gZXhlbXBsZSBkZSBsb2cgZCdhdHRhcXVlIHBvdXIgZGVidWdcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF0dGFja0xvZyA9IHRoaXMubG9ncy5maW5kKGxvZyA9PiBsb2cudHlwZSA9PT0gJ2F0dGFjaycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja0xvZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfwn5OMIEV4ZW1wbGUgZGUgbG9nIGRcXCdhdHRhcXVlOicsIGF0dGFja0xvZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+KdjCBFcnJldXIgcGFyc2luZyBsb2dzOicsIGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSw6ljdXDDqXJlciBsZXMgw6lsw6ltZW50c1xyXG4gICAgICAgIHRoaXMubG9nQ29udGFpbmVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LWxvZ10nKTtcclxuICAgICAgICB0aGlzLm92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtb3ZlcmxheV0nKTtcclxuICAgICAgICB0aGlzLnBsYXlCdG4gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtcGxheV0nKTtcclxuICAgICAgICB0aGlzLnNraXBCdG4gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtc2tpcF0nKTtcclxuICAgICAgICB0aGlzLnNwZWVkQnRucyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvbWJhdC1zcGVlZF0nKTtcclxuXHJcbiAgICAgICAgLy8gTWFwIGRlcyBwZXJzb25uYWdlcyBhdmVjIHN0b2NrYWdlIGRlcyBIUCBtYXggaW5pdGlhdXhcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlck1heEhQID0ge307XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2hhcmFjdGVyLW5hbWVdJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbC5kYXRhc2V0LmNoYXJhY3Rlck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJhY3RlclRlYW07XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW19LSR7bmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV0gPSBlbDtcclxuXHJcbiAgICAgICAgICAgIC8vIEV4dHJhaXJlIGxlIEhQIG1heCBkZXB1aXMgbGUgdGV4dGUgaW5pdGlhbFxyXG4gICAgICAgICAgICBjb25zdCBocFRleHQgPSBlbC5xdWVyeVNlbGVjdG9yKCcuaHAtdGV4dCcpO1xyXG4gICAgICAgICAgICBpZiAoaHBUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IGhwVGV4dC50ZXh0Q29udGVudC5tYXRjaCgvKFxcZCspXFwvKFxcZCspLyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJhY3Rlck1heEhQW2tleV0gPSBwYXJzZUludChtYXRjaFsyXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ/CfkaUgUGVyc29ubmFnZXMgY2hhcmfDqXM6JywgT2JqZWN0LmtleXModGhpcy5jaGFyYWN0ZXJFbGVtZW50cykpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfwn5KaIEhQIG1heDonLCB0aGlzLmNoYXJhY3Rlck1heEhQKTtcclxuXHJcbiAgICAgICAgLy8gQ2FjaGVyIGwnb3ZlcmxheVxyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVmlkZXIgbGUgbG9nXHJcbiAgICAgICAgaWYgKHRoaXMubG9nQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIExhbmNlciBhdXRvbWF0aXF1ZW1lbnQgYXByw6hzIHVuIGTDqWxhaVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wbGF5KCksIDgwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5wbGF5QnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlUGxheSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNraXBCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5za2lwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5za2lwKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5zZXRTcGVlZChlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcgJiYgIXRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NOZXh0TG9nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlUGxheSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nIHx8IHRoaXMuaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBza2lwKCkge1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBBZmZpY2hlciB0b3VzIGxlcyBsb2dzIHJlc3RhbnRzXHJcbiAgICAgICAgd2hpbGUgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBsb2cgPSB0aGlzLmxvZ3NbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlMb2cobG9nKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2RlYXRoJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVhdGgobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNob3dWaWN0b3J5T3ZlcmxheSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNwZWVkKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3Qgc3BlZWQgPSBwYXJzZUZsb2F0KGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb21iYXRTcGVlZCk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBsJ1VJXHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMuZm9yRWFjaChidG4gPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NOZXh0TG9nKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcgfHwgdGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWaWN0b3J5T3ZlcmxheSgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbG9nID0gdGhpcy5sb2dzW3RoaXMuY3VycmVudEluZGV4XTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NMb2cobG9nKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxlciBsZSBkw6lsYWlcclxuICAgICAgICBsZXQgZGVsYXkgPSB0aGlzLmdldERlbGF5Rm9yTG9nKGxvZyk7XHJcbiAgICAgICAgZGVsYXkgPSBkZWxheSAvIHRoaXMuc3BlZWQ7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9jZXNzTmV4dExvZygpLCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGVsYXlGb3JMb2cobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdyb3VuZCc6IHJldHVybiAyMDAwOyAgICAgICAgIC8vIDIgc2Vjb25kZXMgcG91ciBsZXMgcm91bmRzXHJcbiAgICAgICAgICAgIGNhc2UgJ2luaXRpYXRpdmUnOiByZXR1cm4gNDAwOyAgICAgLy8gMC40IHNlY29uZGVzIHBvdXIgbCdpbml0aWF0aXZlXHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6IHJldHVybiAyMDAwOyAgICAgICAgLy8gMiBzZWNvbmRlcyBwb3VyIGxlcyBhdHRhcXVlc1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzogcmV0dXJuIDE4MDA7ICAgICAgICAgIC8vIDEuOCBzZWNvbmRlcyBwb3VyIGxlcyBzb2luc1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOiByZXR1cm4gMTUwMDsgICAgICAgIC8vIDEuNSBzZWNvbmRlcyBwb3VyIGxhIGTDqWZlbnNlXHJcbiAgICAgICAgICAgIGNhc2UgJ2RvZGdlJzogcmV0dXJuIDEyMDA7ICAgICAgICAgLy8gMS4yIHNlY29uZGVzIHBvdXIgbCdlc3F1aXZlXHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzogcmV0dXJuIDI1MDA7ICAgICAgICAgLy8gMi41IHNlY29uZGVzIHBvdXIgbGEgbW9ydFxyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0JzogcmV0dXJuIDE1MDA7ICAgICAgIC8vIDEuNSBzZWNvbmRlcyBwb3VyIGxhIHByb3RlY3Rpb25cclxuICAgICAgICAgICAgY2FzZSAndmljdG9yeSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2RyYXcnOiByZXR1cm4gMTAwMDsgICAgICAgICAgLy8gMSBzZWNvbmRlIHBvdXIgbGEgdmljdG9pcmVcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDgwMDsgICAgICAgICAgICAgICAvLyAwLjggc2Vjb25kZXMgcGFyIGTDqWZhdXRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc0xvZyhsb2cpIHtcclxuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24obG9nKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlMb2cobG9nKTtcclxuXHJcbiAgICAgICAgLy8gU3luY2hyb25pc2VyIGxhIG1pc2Ugw6Agam91ciBkZXMgSFAgYXZlYyBsJ2FuaW1hdGlvblxyXG4gICAgICAgIC8vIExlcyBiYXJyZXMgc2UgbWV0dGVudCDDoCBqb3VyIHF1YW5kIGxlIHBlcnNvbm5hZ2UgXCJwcmVuZCBsZSBjb3VwXCJcclxuICAgICAgICBjb25zdCBocERlbGF5ID0gdGhpcy5nZXRIUFVwZGF0ZURlbGF5KGxvZyk7XHJcbiAgICAgICAgaWYgKGhwRGVsYXkgPiAwKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyksIGhwRGVsYXkgLyB0aGlzLnNwZWVkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SFBVcGRhdGVEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6IHJldHVybiAzNTA7ICAgLy8gQXByw6hzIHF1ZSBsJ2F0dGFxdWUgdG91Y2hlICgzMDBtcyBhdHRhcXVlICsgNTBtcylcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6IHJldHVybiA0MDA7ICAgICAvLyBQZW5kYW50IGwnYW5pbWF0aW9uIGRlIHNvaW5cclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOiByZXR1cm4gMDsgICAgICAvLyBJbW3DqWRpYXRcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBbmltYXRpb24obG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5hdHRhY2tlciwgbG9nLmF0dGFja2VyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy5pc0NyaXQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuaGVhbGVyLCBsb2cuaGVhbGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlZmVuZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWZlbmQobG9nLmRlZmVuZGVyLCBsb2cuZGVmZW5kZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkb2RnZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEb2RnZShsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVhdGgobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVBdHRhY2soYXR0YWNrZXJOYW1lLCBhdHRhY2tlclRlYW0sIHRhcmdldE5hbWUsIHRhcmdldFRlYW0sIGlzQ3JpdCkge1xyXG4gICAgICAgIGNvbnN0IGF0dGFja2VyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGF0dGFja2VyTmFtZSwgYXR0YWNrZXJUZWFtKTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcblxyXG4gICAgICAgIGlmIChhdHRhY2tlcikge1xyXG4gICAgICAgICAgICBhdHRhY2tlci5jbGFzc0xpc3QuYWRkKCdhdHRhY2tpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBhdHRhY2tlci5jbGFzc0xpc3QucmVtb3ZlKCdhdHRhY2tpbmcnKSwgNjAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ3JpdCkgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NyaXQnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnLCAnY3JpdCcpLCA0MDApO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlSGVhbChoZWFsZXJOYW1lLCBoZWFsZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgaGVhbGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGhlYWxlck5hbWUsIGhlYWxlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGhlYWxlcikge1xyXG4gICAgICAgICAgICBoZWFsZXIuY2xhc3NMaXN0LmFkZCgnaGVhbGluZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGhlYWxlci5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsaW5nJyksIDgwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdoZWFsZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaGVhbGVkJyksIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEZWZlbmQoZGVmZW5kZXJOYW1lLCBkZWZlbmRlclRlYW0pIHtcclxuICAgICAgICBjb25zdCBkZWZlbmRlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChkZWZlbmRlck5hbWUsIGRlZmVuZGVyVGVhbSk7XHJcbiAgICAgICAgaWYgKGRlZmVuZGVyKSB7XHJcbiAgICAgICAgICAgIGRlZmVuZGVyLmNsYXNzTGlzdC5hZGQoJ2RlZmVuZGluZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGRlZmVuZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlZmVuZGluZycpLCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURvZGdlKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZG9kZ2luZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkb2RnaW5nJyksIDYwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEZWF0aCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RlYWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hhcmFjdGVyRWxlbWVudChuYW1lLCB0ZWFtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcmFjdGVyRWxlbWVudHNbYCR7dGVhbX0tJHtuYW1lfWBdO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlMb2cobG9nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvZ0NvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBlbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBlbnRyeS5jbGFzc05hbWUgPSAnY29tYmF0LWxvZ19fZW50cnknO1xyXG5cclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdyb3VuZCcpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXJvdW5kJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3ZpY3RvcnknKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS12aWN0b3J5Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2RyYXcnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1kZWZlYXQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVudHJ5LmlubmVySFRNTCA9IGxvZy5tZXNzYWdlO1xyXG4gICAgICAgIHRoaXMubG9nQ29udGFpbmVyLmFwcGVuZENoaWxkKGVudHJ5KTtcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5zY3JvbGxUb3AgPSB0aGlzLmxvZ0NvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSGVhbHRoQmFycyhsb2cpIHtcclxuICAgICAgICBsZXQgY2hhcmFjdGVyTmFtZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IHRlYW1OYW1lID0gbnVsbDtcclxuICAgICAgICBsZXQgY3VycmVudEhQID0gbnVsbDtcclxuICAgICAgICBsZXQgbWF4SFAgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBEw6l0ZXJtaW5lciBsZXMgZG9ubsOpZXMgc2Vsb24gbGUgdHlwZSBkZSBsb2dcclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdhdHRhY2snKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIGRldGVjdGVkIC0gSFAgdXBkYXRlOicsIGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsICcvJywgbWF4SFApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdoZWFsJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0hlYWwgZGV0ZWN0ZWQgLSBIUCB1cGRhdGU6JywgY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCwgJy8nLCBtYXhIUCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBzaSBub3VzIGF2b25zIGxlcyBkb25uw6llcyBuw6ljZXNzYWlyZXNcclxuICAgICAgICBpZiAoY2hhcmFjdGVyTmFtZSAmJiB0ZWFtTmFtZSAmJiBjdXJyZW50SFAgIT09IG51bGwgJiYgY3VycmVudEhQICE9PSB1bmRlZmluZWQgJiYgbWF4SFApIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCBtYXhIUCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYXJhY3RlckhQKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsIG1heEhQKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign4p2MIENoYXJhY3RlciBlbGVtZW50IG5vdCBmb3VuZCBmb3I6JywgY2hhcmFjdGVyTmFtZSwgJ2luIHRlYW06JywgdGVhbU5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwZXJjZW50ID0gbWF4SFAgPiAwID8gKGN1cnJlbnRIUCAvIG1heEhQKSAqIDEwMCA6IDA7XHJcblxyXG4gICAgICAgIC8vIE1pc2Ugw6Agam91ciBkZSBsYSBiYXJyZSBIUCBkYW5zIGxhIHpvbmUgZGUgY29tYmF0IChiYXR0bGUtc3RhZ2UpXHJcbiAgICAgICAgY29uc3QgaHBCYXIgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmhwLWJhcl9fZmlsbCcpO1xyXG4gICAgICAgIGNvbnN0IGhwVGV4dCA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuaHAtdGV4dCcpO1xyXG5cclxuICAgICAgICBpZiAoaHBCYXIpIHtcclxuICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGZsdWlkZSBkZSBsYSBiYXJyZVxyXG4gICAgICAgICAgICBocEJhci5zdHlsZS50cmFuc2l0aW9uID0gYHdpZHRoIDAuM3MgZWFzZS1vdXRgO1xyXG4gICAgICAgICAgICBocEJhci5zdHlsZS53aWR0aCA9IGAke3BlcmNlbnR9JWA7XHJcblxyXG4gICAgICAgICAgICAvLyBDbGFzc2VzIGRlIGNvdWxldXIgc2Vsb24gbGUgcG91cmNlbnRhZ2VcclxuICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LnJlbW92ZSgnaHAtYmFyX19maWxsLS1sb3cnLCAnaHAtYmFyX19maWxsLS1jcml0aWNhbCcpO1xyXG4gICAgICAgICAgICBpZiAocGVyY2VudCA8PSAyNSkge1xyXG4gICAgICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LmFkZCgnaHAtYmFyX19maWxsLS1jcml0aWNhbCcpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBlcmNlbnQgPD0gNTApIHtcclxuICAgICAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5hZGQoJ2hwLWJhcl9fZmlsbC0tbG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChocFRleHQpIHtcclxuICAgICAgICAgICAgaHBUZXh0LnRleHRDb250ZW50ID0gYCR7Y3VycmVudEhQfS8ke21heEhQfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNaXNlIMOgIGpvdXIgZGVzIHBhbm5lYXV4IGQnaW5mbyBsYXTDqXJhdXhcclxuICAgICAgICB0aGlzLnVwZGF0ZUluZm9QYW5lbChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVJbmZvUGFuZWwoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCkge1xyXG4gICAgICAgIC8vIFRyb3V2ZXIgbGUgYm9uIHBhbm5lYXUgc2Vsb24gbCfDqXF1aXBlXHJcbiAgICAgICAgY29uc3QgcGFuZWxDbGFzcyA9IHRlYW1OYW1lID09PSAnRXF1aXBlIDEnID8gJy5pbmZvLXBhbmVsLS10ZWFtMScgOiAnLmluZm8tcGFuZWwtLXRlYW0yJztcclxuICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IocGFuZWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGlmICghcGFuZWwpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gVHJvdXZlciBsZSBwZXJzb25uYWdlIGRhbnMgbGUgcGFubmVhdSBwYXIgc29uIG5vbVxyXG4gICAgICAgIGNvbnN0IGNoYXJhY3RlckluZm9zID0gcGFuZWwucXVlcnlTZWxlY3RvckFsbCgnLmNoYXJhY3Rlci1pbmZvJyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBpbmZvIG9mIGNoYXJhY3RlckluZm9zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWVFbCA9IGluZm8ucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19uYW1lJyk7XHJcbiAgICAgICAgICAgIGlmIChuYW1lRWwgJiYgbmFtZUVsLnRleHRDb250ZW50LnRyaW0oKSA9PT0gY2hhcmFjdGVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHNTcGFuID0gaW5mby5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX3N0YXRzIHNwYW4nKTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0c1NwYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0c1NwYW4udGV4dENvbnRlbnQgPSBjdXJyZW50SFA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuaW1hdGlvbiBmbGFzaCBwb3VyIG1vbnRyZXIgbGUgY2hhbmdlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzU3Bhbi5jbGFzc0xpc3QuYWRkKCdocC11cGRhdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzdGF0c1NwYW4uY2xhc3NMaXN0LnJlbW92ZSgnaHAtdXBkYXRlZCcpLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ZpY3RvcnlPdmVybGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZpbmFsaXNlciBsZSBNTVIgYSBsYSBmaW4gZHUgY29tYmF0XHJcbiAgICAgICAgdGhpcy5maW5hbGl6ZVJhdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmFsaXplUmF0aW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGZpbmFsaXplVXJsID0gdGhpcy5jb250YWluZXIuZGF0YXNldC5maW5hbGl6ZVVybDtcclxuICAgICAgICBpZiAoIWZpbmFsaXplVXJsKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGZpbmFsaXplVXJsLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgJiYgZGF0YS5yYXRpbmdDaGFuZ2UgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JhdGluZ1VwZGF0ZShkYXRhLnJhdGluZ0NoYW5nZSwgZGF0YS5uZXdSYXRpbmcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBmaW5hbGlzYXRpb24gcmF0aW5nOicsIGVycikpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dSYXRpbmdVcGRhdGUoY2hhbmdlLCBuZXdSYXRpbmcpIHtcclxuICAgICAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIE1NUiBhZmZpY2hlIGRhbnMgbGUgcGFubmVhdSBqb3VldXJcclxuICAgICAgICBjb25zdCByYXRpbmdFbCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXBhbmVsLS10ZWFtMSAuaW5mby1wYW5lbF9fcmF0aW5nJyk7XHJcbiAgICAgICAgaWYgKHJhdGluZ0VsICYmIG5ld1JhdGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByYXRpbmdFbC5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke25ld1JhdGluZ30gTU1SYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFmZmljaGVyIGxhIG5vdGlmaWNhdGlvbiBkZSBjaGFuZ2VtZW50IGRhbnMgbCdvdmVybGF5XHJcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1vdmVybGF5XScpO1xyXG4gICAgICAgIGlmIChvdmVybGF5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG5vdGlmLmNsYXNzTmFtZSA9ICdyYXRpbmctY2hhbmdlJztcclxuICAgICAgICAgICAgbm90aWYuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MS40cmVtO21hcmdpbi10b3A6MTJweDtmb250LXdlaWdodDpib2xkO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgMC41czsnO1xyXG4gICAgICAgICAgICBub3RpZi50ZXh0Q29udGVudCA9IGNoYW5nZSA+IDAgPyBgKyR7Y2hhbmdlfSBNTVJgIDogYCR7Y2hhbmdlfSBNTVJgO1xyXG4gICAgICAgICAgICBub3RpZi5zdHlsZS5jb2xvciA9IGNoYW5nZSA+IDAgPyAnIzRjYWY1MCcgOiAnI2Y0NDMzNic7XHJcbiAgICAgICAgICAgIG92ZXJsYXkucXVlcnlTZWxlY3RvcignLmJhdHRsZS1zdGFnZV9fd2lubmVyJykuYXBwZW5kQ2hpbGQobm90aWYpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHsgbm90aWYuc3R5bGUub3BhY2l0eSA9ICcxJzsgfSwgMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUGxheUJ1dHRvbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheUJ0bikgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcgJiYgIXRoaXMuaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gJ1BhdXNlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gJ1Rlcm1pbsOpJztcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSB0aGlzLmN1cnJlbnRJbmRleCA+IDAgPyAnUmVwcmVuZHJlJyA6ICdMYW5jZXInO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gSW5pdGlhbGlzZXIgcXVhbmQgbGUgRE9NIGVzdCBwcsOqdFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgY29tYmF0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LWxvZ3NdJyk7XHJcbiAgICBpZiAoY29tYmF0Q29udGFpbmVyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpc2F0aW9uIGR1IGNvbWJhdC4uLicpO1xyXG4gICAgICAgIG5ldyBDb21iYXRDb250cm9sbGVyKGNvbWJhdENvbnRhaW5lcik7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tYmF0Q29udHJvbGxlcjtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJ1cmdlciIsInF1ZXJ5U2VsZWN0b3IiLCJuYXYiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJTVEFUX01BWCIsImRtZyIsInNwZWVkIiwiZG9kZ2UiLCJjcml0IiwiaHAiLCJwb3J0cmFpdHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGV0YWlscyIsImdldEVsZW1lbnRCeUlkIiwic2VsZWN0ZWRMaXN0IiwibGF1bmNoQnRuIiwibGVuZ3RoIiwibWF4U2VsZWN0aW9uIiwic2VsZWN0ZWRIZXJvZXMiLCJzZWxlY3RlZEhlcm9JZHMiLCJST0xFX0NBVEVHT1JJRVMiLCJnZXRTZWxlY3RlZFJvbGVzIiwicm9sZXMiLCJUYW5rIiwiRFBTIiwiU3VwcG9ydCIsImZvckVhY2giLCJpZCIsInAiLCJBcnJheSIsImZyb20iLCJmaW5kIiwicHAiLCJkYXRhc2V0IiwiY2F0Iiwicm9sZSIsImNhblNlbGVjdFJvbGUiLCJwb3J0cmFpdCIsInJlbW92ZSIsImFkZCIsIm5hbWUiLCJkbWdNaW4iLCJOdW1iZXIiLCJkbWdNYXgiLCJzcHJpdGVGaWxlIiwic3ByaXRlIiwic3ByaXRlUGF0aCIsImNvbmNhdCIsImlzU2VsZWN0ZWQiLCJpbmNsdWRlcyIsImlubmVySFRNTCIsIk1hdGgiLCJtaW4iLCJidG5SaWdodCIsInJvbGVDYXQiLCJhbHJlYWR5U2VsZWN0ZWQiLCJkaXNhYmxlZCIsInRleHRDb250ZW50IiwiZmlsdGVyIiwiaGlkIiwiaCIsImFsZXJ0IiwicHVzaCIsInVwZGF0ZVNlbGVjdGVkVGVhbSIsImhlcm8iLCJoZXJvRWwiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJ1cGRhdGVSb2xlSW5kaWNhdG9ycyIsInRlYW1Db21wbGV0ZSIsImluZGljYXRvciIsInNsb3QiLCJzYXZlUHJlc2V0QnRuIiwicHJlc2V0TW9kYWwiLCJwcmVzZXROYW1lSW5wdXQiLCJwcmVzZXRDb25maXJtQnRuIiwicHJlc2V0Q2FuY2VsQnRuIiwidXBkYXRlU2F2ZVByZXNldEJ0biIsIm9yaWdpbmFsVXBkYXRlU2VsZWN0ZWRUZWFtIiwiX29yaWdVcGRhdGUiLCJfb3JpZ1JvbGVJbmRpY2F0b3JzIiwidmFsdWUiLCJzdHlsZSIsImRpc3BsYXkiLCJzZXRUaW1lb3V0IiwiZm9jdXMiLCJ0cmltIiwiYm9yZGVyQ29sb3IiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNoYXJhY3RlcklkcyIsIm1hcCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsInN1Y2Nlc3MiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImVycm9yIiwiZSIsImtleSIsImNsaWNrIiwibG9hZFByZXNldCIsImlkU3RyIiwiU3RyaW5nIiwiZGVsZXRlUHJlc2V0IiwicHJlc2V0SWQiLCJjaGlwRWwiLCJjb25maXJtIiwibGlzdCIsImNoaWxkcmVuIiwiX2RvY3VtZW50JHF1ZXJ5U2VsZWN0IiwiY2hpcCIsImNoYXJJZHMiLCJwYXJzZSIsInByZXNldElkcyIsInN0b3BQcm9wYWdhdGlvbiIsInNlbGVjdGVkTGlzdE9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJpIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsInJlc3BvbnNlIiwicmVkaXJlY3RlZCIsImhyZWYiLCJ1cmwiLCJwb3B1cCIsImJhY2tkcm9wIiwiY2xvc2VCdG4iLCJjb250ZW50IiwibG9hZGVkIiwib3BlblBvcHVwIiwib2Zmc2V0SGVpZ2h0IiwiZmV0Y2hQcm9maWxlIiwiY2xvc2VQb3B1cCIsInJlbmRlclByb2ZpbGUiLCJyZXN1bHRDbGFzcyIsInIiLCJyZXN1bHRMYWJlbCIsImF2YXRhckh0bWwiLCJwcm9maWxlSW1hZ2UiLCJodG1sIiwidXNlcm5hbWUiLCJtb3R0byIsImJpbyIsInJhdGluZyIsInN0YXRzIiwid2lucyIsImxvc3NlcyIsIndpblJhdGUiLCJmYXZvcml0ZUNoYXJhY3RlciIsImdhbWVzUGxheWVkIiwibGFzdFRlYW0iLCJjIiwicmVjZW50QmF0dGxlcyIsImIiLCJyZXN1bHQiLCJvcHBvbmVudCIsIm1hdGNoVHlwZSIsInRvVXBwZXJDYXNlIiwiZGF0ZSIsImNvbnNvbGUiLCJsb2ciLCJDb21iYXRDb250cm9sbGVyIiwiY29udGFpbmVyIiwiX2NsYXNzQ2FsbENoZWNrIiwibG9ncyIsImN1cnJlbnRJbmRleCIsImlzUGxheWluZyIsImlzUGF1c2VkIiwiY2hhcmFjdGVyRWxlbWVudHMiLCJjaGFyYWN0ZXJNYXhIUCIsImluaXQiLCJfY3JlYXRlQ2xhc3MiLCJfdGhpcyIsImxvZ3NEYXRhIiwiY29tYmF0TG9ncyIsImF0dGFja0xvZyIsInR5cGUiLCJsb2dDb250YWluZXIiLCJvdmVybGF5IiwicGxheUJ0biIsInNraXBCdG4iLCJzcGVlZEJ0bnMiLCJlbCIsImNoYXJhY3Rlck5hbWUiLCJ0ZWFtIiwiY2hhcmFjdGVyVGVhbSIsImhwVGV4dCIsIm1hdGNoIiwicGFyc2VJbnQiLCJPYmplY3QiLCJrZXlzIiwib3BhY2l0eSIsImJpbmRFdmVudHMiLCJwbGF5IiwiX3RoaXMyIiwidG9nZ2xlUGxheSIsInNraXAiLCJidG4iLCJzZXRTcGVlZCIsInVwZGF0ZVBsYXlCdXR0b24iLCJwcm9jZXNzTmV4dExvZyIsInBhdXNlIiwiZGlzcGxheUxvZyIsInVwZGF0ZUhlYWx0aEJhcnMiLCJhbmltYXRlRGVhdGgiLCJ0YXJnZXQiLCJ0YXJnZXRUZWFtIiwic2hvd1ZpY3RvcnlPdmVybGF5IiwiZXZlbnQiLCJwYXJzZUZsb2F0IiwiY3VycmVudFRhcmdldCIsImNvbWJhdFNwZWVkIiwiX3RoaXMzIiwicHJvY2Vzc0xvZyIsImRlbGF5IiwiZ2V0RGVsYXlGb3JMb2ciLCJfdGhpczQiLCJwbGF5QW5pbWF0aW9uIiwiaHBEZWxheSIsImdldEhQVXBkYXRlRGVsYXkiLCJhbmltYXRlQXR0YWNrIiwiYXR0YWNrZXIiLCJhdHRhY2tlclRlYW0iLCJpc0NyaXQiLCJhbmltYXRlSGVhbCIsImhlYWxlciIsImhlYWxlclRlYW0iLCJhbmltYXRlRGVmZW5kIiwiZGVmZW5kZXIiLCJkZWZlbmRlclRlYW0iLCJhbmltYXRlRG9kZ2UiLCJhdHRhY2tlck5hbWUiLCJ0YXJnZXROYW1lIiwiZ2V0Q2hhcmFjdGVyRWxlbWVudCIsImhlYWxlck5hbWUiLCJkZWZlbmRlck5hbWUiLCJlbnRyeSIsImNsYXNzTmFtZSIsIm1lc3NhZ2UiLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJ0ZWFtTmFtZSIsImN1cnJlbnRIUCIsIm1heEhQIiwidGFyZ2V0SFAiLCJ0YXJnZXRNYXhIUCIsInVuZGVmaW5lZCIsInVwZGF0ZUNoYXJhY3RlckhQIiwicGVyY2VudCIsImhwQmFyIiwidHJhbnNpdGlvbiIsIndpZHRoIiwidXBkYXRlSW5mb1BhbmVsIiwicGFuZWxDbGFzcyIsInBhbmVsIiwiY2hhcmFjdGVySW5mb3MiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwiX2xvb3AiLCJpbmZvIiwibmFtZUVsIiwic3RhdHNTcGFuIiwicyIsIm4iLCJkb25lIiwiZXJyIiwiZiIsIl90aGlzNSIsImZpbmFsaXplUmF0aW5nIiwiX3RoaXM2IiwiZmluYWxpemVVcmwiLCJyYXRpbmdDaGFuZ2UiLCJzaG93UmF0aW5nVXBkYXRlIiwibmV3UmF0aW5nIiwiY2hhbmdlIiwicmF0aW5nRWwiLCJub3RpZiIsImNzc1RleHQiLCJjb2xvciIsImNvbWJhdENvbnRhaW5lciJdLCJzb3VyY2VSb290IjoiIn0=