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
      div.innerHTML = "\n                ".concat(escapeHtml(msg.content), "\n                <span class=\"chat-message__time\">").concat(escapeHtml(msg.date), "</span>\n            ");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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USxJQUFJLENBQUNxUSxlQUFlLEdBQUcsQ0FBQyxFQUFFO1VBQzFCRCxhQUFhLENBQUM5UyxXQUFXLEdBQUcwQyxJQUFJLENBQUNxUSxlQUFlO1VBQ2hERCxhQUFhLENBQUNyUixLQUFLLENBQUNDLE9BQU8sR0FBRyxjQUFjO1FBQ2hELENBQUMsTUFBTTtVQUNIb1IsYUFBYSxDQUFDclIsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtRQUN4QztNQUNKO0lBQ0osQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxZQUFNLENBQUMsQ0FBQyxDQUFDO0VBQ3BCO0VBRUF3UCxnQkFBZ0IsQ0FBQyxDQUFDO0VBQ2xCMUIscUJBQXFCLEdBQUdtRCxXQUFXLENBQUN6QixnQkFBZ0IsRUFBRSxLQUFLLENBQUM7QUFDaEUsQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7OztBQzVjRjs7Ozs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY29tYmF0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9mcmllbmRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcz8yZGM5Iiwid2VicGFjazovLy8uL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxyXG4gKi9cclxuaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2Nzcyc7XHJcbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5jc3MnO1xyXG5pbXBvcnQgJy4vanMvY29tYmF0LmpzJztcclxuaW1wb3J0ICcuL2pzL2ZyaWVuZHMuanMnO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBNRU5VIEJVUkdFUlxyXG49PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGNvbnN0IGJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnVyZ2VyXCIpO1xyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLW5hdmlnYXRpb25cIik7XHJcblxyXG4gICAgaWYgKGJ1cmdlciAmJiBuYXYpIHtcclxuICAgICAgICBidXJnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIFBBR0UgVEVBTVMgKENPUlJJR8OJRSlcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qIPCflKcgTUFYIERFUyBTVEFUUyAoYWRhcHRlciDDoCB0YSBCREQgLyDDqXF1aWxpYnJhZ2UpICovXHJcbmNvbnN0IFNUQVRfTUFYID0ge1xyXG4gICAgZG1nOiAzMCxcclxuICAgIHNwZWVkOiAxMixcclxuICAgIGRvZGdlOiA0MCxcclxuICAgIGNyaXQ6IDE1LFxyXG4gICAgaHA6IDc1XHJcbn07XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgcG9ydHJhaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRlYW0tcG9ydHJhaXQnKTtcclxuICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVhbURldGFpbHMnKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC1saXN0Jyk7XHJcbiAgICBjb25zdCBsYXVuY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWxhdW5jaCcpO1xyXG5cclxuICAgIGlmICghZGV0YWlscyB8fCBwb3J0cmFpdHMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgbWF4U2VsZWN0aW9uID0gMztcclxuICAgIGxldCBzZWxlY3RlZEhlcm9lcyA9IFtdO1xyXG4gICAgbGV0IHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG5cclxuICAgIC8vIENvbXBvc2l0aW9uIG9ibGlnYXRvaXJlIDogMSBUYW5rLCAxIERQUywgMSBTdXBwb3J0XHJcbiAgICBjb25zdCBST0xFX0NBVEVHT1JJRVMgPSB7ICdUYW5rJzogJ1RhbmsnLCAnRFBTJzogJ0RQUycsICdTdXBwb3J0JzogJ1N1cHBvcnQnLCAnU29pZ25ldXInOiAnU3VwcG9ydCcsICdCdWZmZXInOiAnU3VwcG9ydCcgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZWxlY3RlZFJvbGVzKCkge1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0geyBUYW5rOiAwLCBEUFM6IDAsIFN1cHBvcnQ6IDAgfTtcclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwcCA9PiBwcC5kYXRhc2V0LmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgIGlmIChwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSBST0xFX0NBVEVHT1JJRVNbcC5kYXRhc2V0LnJvbGVdIHx8ICdTdXBwb3J0JztcclxuICAgICAgICAgICAgICAgIHJvbGVzW2NhdF0rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByb2xlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYW5TZWxlY3RSb2xlKHJvbGUpIHtcclxuICAgICAgICBjb25zdCBjYXQgPSBST0xFX0NBVEVHT1JJRVNbcm9sZV0gfHwgJ1N1cHBvcnQnO1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgIHJldHVybiByb2xlc1tjYXRdIDwgMTtcclxuICAgIH1cclxuXHJcbiAgICBwb3J0cmFpdHMuZm9yRWFjaChwb3J0cmFpdCA9PiB7XHJcbiAgICAgICAgcG9ydHJhaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcnRyYWl0cy5mb3JFYWNoKHAgPT4gcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaWQgPSBwb3J0cmFpdC5kYXRhc2V0LmlkO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gcG9ydHJhaXQuZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCByb2xlID0gcG9ydHJhaXQuZGF0YXNldC5yb2xlO1xyXG4gICAgICAgICAgICBjb25zdCBkbWdNaW4gPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kbWdNaW4pO1xyXG4gICAgICAgICAgICBjb25zdCBkbWdNYXggPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kbWdNYXgpO1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LnNwZWVkKTtcclxuICAgICAgICAgICAgY29uc3QgZG9kZ2UgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kb2RnZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyaXQgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5jcml0KTtcclxuICAgICAgICAgICAgY29uc3QgaHAgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5ocCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZUZpbGUgPSBwb3J0cmFpdC5kYXRhc2V0LnNwcml0ZTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZVBhdGggPSBgL2Fzc2V0L3Nwcml0ZXMvJHtzcHJpdGVGaWxlfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpO1xyXG5cclxuICAgICAgICAgICAgZGV0YWlscy5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhbS1kZXRhaWxzLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDI+JHtuYW1lfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJyb2xlXCI+JHtyb2xlfTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdpZi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Nwcml0ZVBhdGh9XCIgYWx0PVwiU3ByaXRlIGRlICR7bmFtZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ETUc8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tZG1nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChkbWdNYXggLyBTVEFUX01BWC5kbWcpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkbWdNaW59IC0gJHtkbWdNYXh9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5WSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tc3BkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChzcGVlZCAvIFNUQVRfTUFYLnNwZWVkKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7c3BlZWR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ET0RHRTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1kb2RnZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoZG9kZ2UgLyBTVEFUX01BWC5kb2RnZSkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2RvZGdlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q1JJVDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1jcml0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChjcml0IC8gU1RBVF9NQVguY3JpdCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2NyaXR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5IUDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1ocFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoaHAgLyBTVEFUX01BWC5ocCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2hwfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tc2VsZWN0LXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7aXNTZWxlY3RlZCA/ICdEw6lzw6lsZWN0aW9ubmVyJyA6ICdTw6lsZWN0aW9ubmVyJ31cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYnRuUmlnaHQgPSBkZXRhaWxzLnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2VsZWN0LXJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVDYXQgPSBST0xFX0NBVEVHT1JJRVNbcm9sZV0gfHwgJ1N1cHBvcnQnO1xyXG4gICAgICAgICAgICBjb25zdCBhbHJlYWR5U2VsZWN0ZWQgPSBzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gRMOpc2FjdGl2ZXIgbGUgYm91dG9uIHNpIGxlIHNsb3QgZGUgY2UgcsO0bGUgZXN0IGTDqWrDoCBwcmlzXHJcbiAgICAgICAgICAgIGlmICghYWxyZWFkeVNlbGVjdGVkICYmICFjYW5TZWxlY3RSb2xlKHJvbGUpKSB7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IGBTbG90ICR7cm9sZUNhdH0gZMOpasOgIHByaXNgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzID0gc2VsZWN0ZWRIZXJvSWRzLmZpbHRlcihoaWQgPT4gaGlkICE9PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBzZWxlY3RlZEhlcm9lcy5maWx0ZXIoaCA9PiBoICE9PSBuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhblNlbGVjdFJvbGUocm9sZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoYFZvdXMgYXZleiBkw6lqw6AgdW4gJHtyb2xlQ2F0fSBkYW5zIHZvdHJlIMOpcXVpcGUgIWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMubGVuZ3RoID49IG1heFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIlZvdXMgcG91dmV6IHPDqWxlY3Rpb25uZXIgbWF4aW11bSAzIHBlcnNvbm5hZ2VzICFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzLnB1c2gobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LnRleHRDb250ZW50ID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKVxyXG4gICAgICAgICAgICAgICAgICAgID8gJ0TDqXPDqWxlY3Rpb25uZXInXHJcbiAgICAgICAgICAgICAgICAgICAgOiAnU8OpbGVjdGlvbm5lcic7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qICBaT05FIMOJUVVJUEUg4oCUIHNwcml0ZXMgc2V1bGVtZW50ICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTZWxlY3RlZFRlYW0oKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm8gPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwID0+IHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAoIWhlcm8pIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGhlcm8uZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7aGVyby5kYXRhc2V0LnNwcml0ZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgaGVyb0VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWhlcm8tc3ByaXRlJyk7XHJcbiAgICAgICAgICAgIGhlcm9FbC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c3ByaXRlUGF0aH1cIiBhbHQ9XCJTcHJpdGUgZGUgJHtuYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+JHtuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgc2VsZWN0ZWRMaXN0LmFwcGVuZENoaWxkKGhlcm9FbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbGVzIGluZGljYXRldXJzIGRlIHLDtGxlc1xyXG4gICAgICAgIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCk7XHJcblxyXG4gICAgICAgIGlmIChsYXVuY2hCdG4pIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW1Db21wbGV0ZSA9IHJvbGVzLlRhbmsgPT09IDEgJiYgcm9sZXMuRFBTID09PSAxICYmIHJvbGVzLlN1cHBvcnQgPT09IDE7XHJcbiAgICAgICAgICAgIGxhdW5jaEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCkge1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgIGNvbnN0IGluZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb2xlLWluZGljYXRvcicpO1xyXG4gICAgICAgIGlmIChpbmRpY2F0b3IpIHtcclxuICAgICAgICAgICAgaW5kaWNhdG9yLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb2xlLXNsb3QnKS5mb3JFYWNoKHNsb3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2F0ID0gc2xvdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgICAgICBpZiAocm9sZXNbY2F0XSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2xhc3NMaXN0LnJlbW92ZSgnZmlsbGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgUFJFU0VUU1xyXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuICAgIGNvbnN0IHNhdmVQcmVzZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXNhdmUtcHJlc2V0Jyk7XHJcbiAgICBjb25zdCBwcmVzZXRNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRNb2RhbCcpO1xyXG4gICAgY29uc3QgcHJlc2V0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldE5hbWUnKTtcclxuICAgIGNvbnN0IHByZXNldENvbmZpcm1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0Q29uZmlybScpO1xyXG4gICAgY29uc3QgcHJlc2V0Q2FuY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldENhbmNlbCcpO1xyXG5cclxuICAgIC8vIE1ldHRyZSBhIGpvdXIgbGUgYm91dG9uIHNhdXZlZ2FyZGVyIHNlbG9uIGxhIHNlbGVjdGlvblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2F2ZVByZXNldEJ0bigpIHtcclxuICAgICAgICBpZiAoc2F2ZVByZXNldEJ0bikge1xyXG4gICAgICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbUNvbXBsZXRlID0gcm9sZXMuVGFuayA9PT0gMSAmJiByb2xlcy5EUFMgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgc2F2ZVByZXNldEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcGVsZXIgdXBkYXRlU2F2ZVByZXNldEJ0biBhIGNoYXF1ZSBjaGFuZ2VtZW50IGRlIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0gPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcbiAgICAvLyBPbiBzdXJjaGFyZ2UgZW4gYWpvdXRhbnQgbCdhcHBlbFxyXG4gICAgY29uc3QgX29yaWdVcGRhdGUgPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcblxyXG4gICAgLy8gUGF0Y2g6IGFqb3V0ZXIgbCdhcHBlbCBhIHVwZGF0ZVNhdmVQcmVzZXRCdG4gZGFucyB1cGRhdGVTZWxlY3RlZFRlYW1cclxuICAgIC8vIE9uIGxlIGZhaXQgZW4gd3JhcHBhbnQgbGVzIGluZGljYXRldXJzXHJcbiAgICBjb25zdCBfb3JpZ1JvbGVJbmRpY2F0b3JzID0gdXBkYXRlUm9sZUluZGljYXRvcnM7XHJcblxyXG4gICAgLy8gT3V2cmlyIGxhIG1vZGFsXHJcbiAgICBpZiAoc2F2ZVByZXNldEJ0biAmJiBwcmVzZXRNb2RhbCkge1xyXG4gICAgICAgIHNhdmVQcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHByZXNldE5hbWVJbnB1dC5mb2N1cygpLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGZXJtZXIgbGEgbW9kYWxcclxuICAgICAgICBwcmVzZXRDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByZXNldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtbW9kYWxfX2JhY2tkcm9wJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNhdXZlZ2FyZGVyIGxlIHByZXNldFxyXG4gICAgICAgIHByZXNldENvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcmVzZXROYW1lSW5wdXQudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZGMxNDNjJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnLi4uJztcclxuXHJcbiAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvcHJlc2V0cy9zYXZlJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVySWRzOiBzZWxlY3RlZEhlcm9JZHMubWFwKE51bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWNoYXJnZXIgbGEgcGFnZSBwb3VyIGFmZmljaGVyIGxlIG5vdXZlYXUgcHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yIHx8ICdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUnKTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRW50ZXIgcG91ciB2YWxpZGVyXHJcbiAgICAgICAgcHJlc2V0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHByZXNldENvbmZpcm1CdG4uY2xpY2soKTtcclxuICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhcmdlciB1biBwcmVzZXQgKHNlbGVjdGlvbiBwcm9ncmFtbWF0aXF1ZSBkZXMgcGVyc29ubmFnZXMpXHJcbiAgICBmdW5jdGlvbiBsb2FkUHJlc2V0KGNoYXJhY3Rlcklkcykge1xyXG4gICAgICAgIC8vIFJlc2V0IGxhIHNlbGVjdGlvbiBhY3R1ZWxsZVxyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG5cclxuICAgICAgICAvLyBTZWxlY3Rpb25uZXIgbGVzIHBlcnNvbm5hZ2VzIGR1IHByZXNldFxyXG4gICAgICAgIGNoYXJhY3Rlcklkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWRTdHIgPSBTdHJpbmcoaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3J0cmFpdCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBpZFN0cik7XHJcbiAgICAgICAgICAgIGlmIChwb3J0cmFpdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWRTdHIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMucHVzaChwb3J0cmFpdC5kYXRhc2V0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICB1cGRhdGVTYXZlUHJlc2V0QnRuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3VwcHJpbWVyIHVuIHByZXNldFxyXG4gICAgZnVuY3Rpb24gZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwRWwpIHtcclxuICAgICAgICBpZiAoIWNvbmZpcm0oJ1N1cHByaW1lciBjZSBwcmVzZXQgPycpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGAvdGVhbXMvcHJlc2V0cy8ke3ByZXNldElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlwRWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTaSBwbHVzIGRlIHByZXNldHMsIGNhY2hlciBsYSBiYXJyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXRzLWJhcl9fbGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QgJiYgbGlzdC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0cy1iYXInKT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXR0YWNoZXIgbGVzIGV2ZW50cyBhdXggY2hpcHMgZGUgcHJlc2V0c1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZXNldC1jaGlwJykuZm9yRWFjaChjaGlwID0+IHtcclxuICAgICAgICBjb25zdCBwcmVzZXRJZCA9IGNoaXAuZGF0YXNldC5wcmVzZXRJZDtcclxuICAgICAgICBjb25zdCBjaGFySWRzID0gSlNPTi5wYXJzZShjaGlwLmRhdGFzZXQucHJlc2V0SWRzKTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2xvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbG9hZFByZXNldChjaGFySWRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2RlbGV0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9ic2VydmVyIGxlcyBjaGFuZ2VtZW50cyBkZSBzZWxlY3Rpb24gcG91ciBsZSBib3V0b24gc2F2ZVxyXG4gICAgLy8gT24gdXRpbGlzZSB1biBNdXRhdGlvbk9ic2VydmVyIHN1ciBzZWxlY3RlZExpc3RcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdXBkYXRlU2F2ZVByZXNldEJ0bigpKTtcclxuICAgIGlmIChzZWxlY3RlZExpc3QpIHtcclxuICAgICAgICBzZWxlY3RlZExpc3RPYnNlcnZlci5vYnNlcnZlKHNlbGVjdGVkTGlzdCwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhdW5jaEJ0bikge1xyXG4gICAgICAgIGxhdW5jaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnZvaSBQT1NUIEFKQVggdmVycyAvdGVhbXMvc2VsZWN0XHJcbiAgICAgICAgICAgICAgICBmZXRjaCgnL3RlYW1zL3NlbGVjdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogc2VsZWN0ZWRIZXJvSWRzLm1hcCgoaWQsIGkpID0+IGBjaGFyYWN0ZXJfaWRzWyR7aX1dPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGlkKX1gKS5qb2luKCcmJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlZGlyZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVkaXJpZ2UgbWFudWVsbGVtZW50IHNpIHBhcyBkZSByZWRpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbWF0Y2htYWtpbmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzw6lsZWN0aW9uIGRlIGxcXCfDqXF1aXBlLicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQUk9GSUxFIFBPUFVQXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1wb3B1cF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWNvbnRlbnRdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBvcHVwKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwb3B1cC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3Byb2ZpbGUtcG9wdXAtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwX19iYWNrZHJvcC0tb3BlbicpO1xyXG5cclxuICAgICAgICBpZiAoIWxvYWRlZCkge1xyXG4gICAgICAgICAgICBmZXRjaFByb2ZpbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cCk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmZXRjaFByb2ZpbGUoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9hcGkvcHJvZmlsZScpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9maWxlKGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lcnJvclwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclByb2ZpbGUoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdENsYXNzID0gKHIpID0+IHIgPT09ICd3aW4nID8gJ3Jlc3VsdC0td2luJyA6IHIgPT09ICdsb3NzJyA/ICdyZXN1bHQtLWxvc3MnIDogJ3Jlc3VsdC0tZHJhdyc7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0TGFiZWwgPSAocikgPT4gciA9PT0gJ3dpbicgPyAnVmljdG9pcmUnIDogciA9PT0gJ2xvc3MnID8gJ0RcXHUwMGU5ZmFpdGUnIDogJ051bCc7XHJcblxyXG4gICAgICAgIGNvbnN0IGF2YXRhckh0bWwgPSBkYXRhLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZGF0YS5wcm9maWxlSW1hZ2V9XCIgYWx0PVwiQXZhdGFyXCI+YFxyXG4gICAgICAgICAgICA6IGA8aSBjbGFzcz1cImZhcyBmYS11c2VyLWNpcmNsZVwiPjwvaT5gO1xyXG5cclxuICAgICAgICBsZXQgaHRtbCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2lkZW50aXR5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fYXZhdGFyXCI+JHthdmF0YXJIdG1sfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3VzZXJuYW1lXCI+JHtkYXRhLnVzZXJuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAke2RhdGEubW90dG8gPyBgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXBvcHVwX19tb3R0b1wiPlxcdTAwYWIgJHtkYXRhLm1vdHRvfSBcXHUwMGJiPC9zcGFuPmAgOiAnJ31cclxuICAgICAgICAgICAgICAgICAgICAke2RhdGEuYmlvID8gYDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fYmlvXCI+JHtkYXRhLmJpb308L3A+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N0YXRzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX3ZhbHVlXCI+JHtkYXRhLnJhdGluZ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+TU1SPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX3ZhbHVlXCI+JHtkYXRhLnN0YXRzLndpbnN9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPlZpY3RvaXJlczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZGF0YS5zdGF0cy5sb3NzZXN9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPkRcXHUwMGU5ZmFpdGVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX3ZhbHVlXCI+JHtkYXRhLnN0YXRzLndpblJhdGV9JTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5XaW4gUmF0ZTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtc3RhclwiPjwvaT4gQ2hhbXBpb24gRmF2b3JpXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX25hbWVcIj4ke2RhdGEuZmF2b3JpdGVDaGFyYWN0ZXIubmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fcm9sZVwiPiR7ZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5yb2xlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19jb3VudFwiPiR7ZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5nYW1lc1BsYXllZH0gcGFydGllczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubGFzdFRlYW0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlcnNcIj48L2k+IERlcm5pXFx1MDBlOHJlIFxcdTAwYzlxdWlwZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5sYXN0VGVhbS5tYXAoYyA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX21lbWJlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX25hbWVcIj4ke2MubmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fcm9sZVwiPiR7Yy5yb2xlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEucmVjZW50QmF0dGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zaGllbGQtYWx0XCI+PC9pPiBIaXN0b3JpcXVlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5yZWNlbnRCYXR0bGVzLm1hcChiID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYXJlbmEvcmVwbGF5LyR7Yi5pZH1cIiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fZW50cnkgJHtyZXN1bHRDbGFzcyhiLnJlc3VsdCl9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX3Jlc3VsdFwiPiR7cmVzdWx0TGFiZWwoYi5yZXN1bHQpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fb3Bwb25lbnRcIj52cyAke2Iub3Bwb25lbnR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X190eXBlXCI+JHtiLm1hdGNoVHlwZS50b1VwcGVyQ2FzZSgpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fZGF0ZVwiPiR7Yi5kYXRlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wbGF5IHByb2ZpbGUtaGlzdG9yeV9fcmVwbGF5XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2VtcHR5XCI+QXVjdW4gY29tYmF0IGVucmVnaXN0clxcdTAwZTk8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9wcm9maWxlXCIgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lZGl0LWxpbmtcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wZW5cIj48L2k+IFxcdTAwYzlkaXRlciBsZSBwcm9maWxcclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmNvbnNvbGUubG9nKCdhc3NldHMvYXBwLmpzIGNoYXJnXFx1MDBlOSBcXHUyNzE0Jyk7XHJcbiIsIi8qKlxyXG4gKiBDb21iYXQgQW5pbWF0aW9uIENvbnRyb2xsZXJcclxuICogR8OocmUgbCdhZmZpY2hhZ2UgcHJvZ3Jlc3NpZiBkZXMgbG9ncyBkZSBjb21iYXQgYXZlYyBhbmltYXRpb25zXHJcbiAqL1xyXG5jbGFzcyBDb21iYXRDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMubG9ncyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gMTtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlckVsZW1lbnRzID0ge307XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUCA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIC8vIFLDqWN1cMOpcmVyIGxlcyBsb2dzIGRlcHVpcyBsJ2F0dHJpYnV0IGRhdGFcclxuICAgICAgICBjb25zdCBsb2dzRGF0YSA9IHRoaXMuY29udGFpbmVyLmRhdGFzZXQuY29tYmF0TG9ncztcclxuICAgICAgICBpZiAobG9nc0RhdGEpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ncyA9IEpTT04ucGFyc2UobG9nc0RhdGEpO1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ/Cfk4sgTG9ncyBjaGFyZ8OpczonLCB0aGlzLmxvZ3MubGVuZ3RoLCAnZW50csOpZXMnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAvLyBBZmZpY2hlciB1biBleGVtcGxlIGRlIGxvZyBkJ2F0dGFxdWUgcG91ciBkZWJ1Z1xyXG4gICAgICAgICAgICAgICAgY29uc3QgYXR0YWNrTG9nID0gdGhpcy5sb2dzLmZpbmQobG9nID0+IGxvZy50eXBlID09PSAnYXR0YWNrJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoYXR0YWNrTG9nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ/Cfk4wgRXhlbXBsZSBkZSBsb2cgZFxcJ2F0dGFxdWU6JywgYXR0YWNrTG9nKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcign4p2MIEVycmV1ciBwYXJzaW5nIGxvZ3M6JywgZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFLDqWN1cMOpcmVyIGxlcyDDqWzDqW1lbnRzXHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtbG9nXScpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1vdmVybGF5XScpO1xyXG4gICAgICAgIHRoaXMucGxheUJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1wbGF5XScpO1xyXG4gICAgICAgIHRoaXMuc2tpcEJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1za2lwXScpO1xyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29tYmF0LXNwZWVkXScpO1xyXG5cclxuICAgICAgICAvLyBNYXAgZGVzIHBlcnNvbm5hZ2VzIGF2ZWMgc3RvY2thZ2UgZGVzIEhQIG1heCBpbml0aWF1eFxyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFAgPSB7fTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jaGFyYWN0ZXItbmFtZV0nKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsLmRhdGFzZXQuY2hhcmFjdGVyTmFtZTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbSA9IGVsLmRhdGFzZXQuY2hhcmFjdGVyVGVhbTtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7dGVhbX0tJHtuYW1lfWA7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XSA9IGVsO1xyXG5cclxuICAgICAgICAgICAgLy8gRXh0cmFpcmUgbGUgSFAgbWF4IGRlcHVpcyBsZSB0ZXh0ZSBpbml0aWFsXHJcbiAgICAgICAgICAgIGNvbnN0IGhwVGV4dCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcbiAgICAgICAgICAgIGlmIChocFRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gaHBUZXh0LnRleHRDb250ZW50Lm1hdGNoKC8oXFxkKylcXC8oXFxkKykvKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFBba2V5XSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjb25zb2xlLmxvZygn8J+RpSBQZXJzb25uYWdlcyBjaGFyZ8OpczonLCBPYmplY3Qua2V5cyh0aGlzLmNoYXJhY3RlckVsZW1lbnRzKSk7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ/CfkpogSFAgbWF4OicsIHRoaXMuY2hhcmFjdGVyTWF4SFApO1xyXG5cclxuICAgICAgICAvLyBDYWNoZXIgbCdvdmVybGF5XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBWaWRlciBsZSBsb2dcclxuICAgICAgICBpZiAodGhpcy5sb2dDb250YWluZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lcnNcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gTGFuY2VyIGF1dG9tYXRpcXVlbWVudCBhcHLDqHMgdW4gZMOpbGFpXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBsYXkoKSwgODAwKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXlCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVQbGF5KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2tpcEJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLnNraXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNraXAoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNwZWVkQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLnNldFNwZWVkKGUpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZyAmJiAhdGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc05leHRMb2coKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVQbGF5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcgfHwgdGhpcy5pc1BhdXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNraXAoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIEFmZmljaGVyIHRvdXMgbGVzIGxvZ3MgcmVzdGFudHNcclxuICAgICAgICB3aGlsZSAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvZyA9IHRoaXMubG9nc1t0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUxvZyhsb2cpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKTtcclxuICAgICAgICAgICAgaWYgKGxvZy50eXBlID09PSAnZGVhdGgnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWF0aChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2hvd1ZpY3RvcnlPdmVybGF5KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3BlZWQoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBzcGVlZCA9IHBhcnNlRmxvYXQoZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbWJhdFNwZWVkKTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGwnVUlcclxuICAgICAgICB0aGlzLnNwZWVkQnRucy5mb3JFYWNoKGJ0biA9PiBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc05leHRMb2coKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZyB8fCB0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZpY3RvcnlPdmVybGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBsb2cgPSB0aGlzLmxvZ3NbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc0xvZyhsb2cpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGVyIGxlIGTDqWxhaVxyXG4gICAgICAgIGxldCBkZWxheSA9IHRoaXMuZ2V0RGVsYXlGb3JMb2cobG9nKTtcclxuICAgICAgICBkZWxheSA9IGRlbGF5IC8gdGhpcy5zcGVlZDtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb2Nlc3NOZXh0TG9nKCksIGRlbGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZWxheUZvckxvZyhsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JvdW5kJzogcmV0dXJuIDIwMDA7ICAgICAgICAgLy8gMiBzZWNvbmRlcyBwb3VyIGxlcyByb3VuZHNcclxuICAgICAgICAgICAgY2FzZSAnaW5pdGlhdGl2ZSc6IHJldHVybiA0MDA7ICAgICAvLyAwLjQgc2Vjb25kZXMgcG91ciBsJ2luaXRpYXRpdmVcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzogcmV0dXJuIDIwMDA7ICAgICAgICAvLyAyIHNlY29uZGVzIHBvdXIgbGVzIGF0dGFxdWVzXHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOiByZXR1cm4gMTgwMDsgICAgICAgICAgLy8gMS44IHNlY29uZGVzIHBvdXIgbGVzIHNvaW5zXHJcbiAgICAgICAgICAgIGNhc2UgJ2RlZmVuZCc6IHJldHVybiAxNTAwOyAgICAgICAgLy8gMS41IHNlY29uZGVzIHBvdXIgbGEgZMOpZmVuc2VcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOiByZXR1cm4gMTIwMDsgICAgICAgICAvLyAxLjIgc2Vjb25kZXMgcG91ciBsJ2VzcXVpdmVcclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOiByZXR1cm4gMjUwMDsgICAgICAgICAvLyAyLjUgc2Vjb25kZXMgcG91ciBsYSBtb3J0XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3QnOiByZXR1cm4gMTUwMDsgICAgICAgLy8gMS41IHNlY29uZGVzIHBvdXIgbGEgcHJvdGVjdGlvblxyXG4gICAgICAgICAgICBjYXNlICd2aWN0b3J5JzpcclxuICAgICAgICAgICAgY2FzZSAnZHJhdyc6IHJldHVybiAxMDAwOyAgICAgICAgICAvLyAxIHNlY29uZGUgcG91ciBsYSB2aWN0b2lyZVxyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gODAwOyAgICAgICAgICAgICAgIC8vIDAuOCBzZWNvbmRlcyBwYXIgZMOpZmF1dFxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTG9nKGxvZykge1xyXG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbihsb2cpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUxvZyhsb2cpO1xyXG5cclxuICAgICAgICAvLyBTeW5jaHJvbmlzZXIgbGEgbWlzZSDDoCBqb3VyIGRlcyBIUCBhdmVjIGwnYW5pbWF0aW9uXHJcbiAgICAgICAgLy8gTGVzIGJhcnJlcyBzZSBtZXR0ZW50IMOgIGpvdXIgcXVhbmQgbGUgcGVyc29ubmFnZSBcInByZW5kIGxlIGNvdXBcIlxyXG4gICAgICAgIGNvbnN0IGhwRGVsYXkgPSB0aGlzLmdldEhQVXBkYXRlRGVsYXkobG9nKTtcclxuICAgICAgICBpZiAoaHBEZWxheSA+IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKSwgaHBEZWxheSAvIHRoaXMuc3BlZWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRIUFVwZGF0ZURlbGF5KGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzogcmV0dXJuIDM1MDsgICAvLyBBcHLDqHMgcXVlIGwnYXR0YXF1ZSB0b3VjaGUgKDMwMG1zIGF0dGFxdWUgKyA1MG1zKVxyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzogcmV0dXJuIDQwMDsgICAgIC8vIFBlbmRhbnQgbCdhbmltYXRpb24gZGUgc29pblxyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6IHJldHVybiAwOyAgICAgIC8vIEltbcOpZGlhdFxyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGxheUFuaW1hdGlvbihsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmF0dGFja2VyLCBsb2cuYXR0YWNrZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgbG9nLmlzQ3JpdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVIZWFsKGxvZy5oZWFsZXIsIGxvZy5oZWFsZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZGVmZW5kJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlZmVuZChsb2cuZGVmZW5kZXIsIGxvZy5kZWZlbmRlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RvZGdlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURvZGdlKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWF0aChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZUF0dGFjayhhdHRhY2tlck5hbWUsIGF0dGFja2VyVGVhbSwgdGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSwgaXNDcml0KSB7XHJcbiAgICAgICAgY29uc3QgYXR0YWNrZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoYXR0YWNrZXJOYW1lLCBhdHRhY2tlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGF0dGFja2VyKSB7XHJcbiAgICAgICAgICAgIGF0dGFja2VyLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2luZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGF0dGFja2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGFja2luZycpLCA2MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdodXJ0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNDcml0KSB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnY3JpdCcpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcsICdjcml0JyksIDQwMCk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVIZWFsKGhlYWxlck5hbWUsIGhlYWxlclRlYW0sIHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCBoZWFsZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoaGVhbGVyTmFtZSwgaGVhbGVyVGVhbSk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG5cclxuICAgICAgICBpZiAoaGVhbGVyKSB7XHJcbiAgICAgICAgICAgIGhlYWxlci5jbGFzc0xpc3QuYWRkKCdoZWFsaW5nJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaGVhbGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxpbmcnKSwgODAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hlYWxlZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsZWQnKSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlZmVuZChkZWZlbmRlck5hbWUsIGRlZmVuZGVyVGVhbSkge1xyXG4gICAgICAgIGNvbnN0IGRlZmVuZGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGRlZmVuZGVyTmFtZSwgZGVmZW5kZXJUZWFtKTtcclxuICAgICAgICBpZiAoZGVmZW5kZXIpIHtcclxuICAgICAgICAgICAgZGVmZW5kZXIuY2xhc3NMaXN0LmFkZCgnZGVmZW5kaW5nJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZGVmZW5kZXIuY2xhc3NMaXN0LnJlbW92ZSgnZGVmZW5kaW5nJyksIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRG9kZ2UodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdkb2RnaW5nJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RvZGdpbmcnKSwgNjAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlYXRoKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZGVhZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGFyYWN0ZXJFbGVtZW50KG5hbWUsIHRlYW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1tgJHt0ZWFtfS0ke25hbWV9YF07XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheUxvZyhsb2cpIHtcclxuICAgICAgICBpZiAoIXRoaXMubG9nQ29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGVudHJ5LmNsYXNzTmFtZSA9ICdjb21iYXQtbG9nX19lbnRyeSc7XHJcblxyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ3JvdW5kJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tcm91bmQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAndmljdG9yeScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXZpY3RvcnknKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnZHJhdycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWRlZmVhdCcpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZW50cnkuaW5uZXJIVE1MID0gbG9nLm1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIuYXBwZW5kQ2hpbGQoZW50cnkpO1xyXG4gICAgICAgIHRoaXMubG9nQ29udGFpbmVyLnNjcm9sbFRvcCA9IHRoaXMubG9nQ29udGFpbmVyLnNjcm9sbEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVIZWFsdGhCYXJzKGxvZykge1xyXG4gICAgICAgIGxldCBjaGFyYWN0ZXJOYW1lID0gbnVsbDtcclxuICAgICAgICBsZXQgdGVhbU5hbWUgPSBudWxsO1xyXG4gICAgICAgIGxldCBjdXJyZW50SFAgPSBudWxsO1xyXG4gICAgICAgIGxldCBtYXhIUCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIETDqXRlcm1pbmVyIGxlcyBkb25uw6llcyBzZWxvbiBsZSB0eXBlIGRlIGxvZ1xyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2F0dGFjaycpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdBdHRhY2sgZGV0ZWN0ZWQgLSBIUCB1cGRhdGU6JywgY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCwgJy8nLCBtYXhIUCk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2hlYWwnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnSGVhbCBkZXRlY3RlZCAtIEhQIHVwZGF0ZTonLCBjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCAnLycsIG1heEhQKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIHNpIG5vdXMgYXZvbnMgbGVzIGRvbm7DqWVzIG7DqWNlc3NhaXJlc1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJOYW1lICYmIHRlYW1OYW1lICYmIGN1cnJlbnRIUCAhPT0gbnVsbCAmJiBjdXJyZW50SFAgIT09IHVuZGVmaW5lZCAmJiBtYXhIUCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsIG1heEhQKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2hhcmFjdGVySFAoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCwgbWF4SFApIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUpO1xyXG5cclxuICAgICAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmVycm9yKCfinYwgQ2hhcmFjdGVyIGVsZW1lbnQgbm90IGZvdW5kIGZvcjonLCBjaGFyYWN0ZXJOYW1lLCAnaW4gdGVhbTonLCB0ZWFtTmFtZSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBtYXhIUCA+IDAgPyAoY3VycmVudEhQIC8gbWF4SFApICogMTAwIDogMDtcclxuXHJcbiAgICAgICAgLy8gTWlzZSDDoCBqb3VyIGRlIGxhIGJhcnJlIEhQIGRhbnMgbGEgem9uZSBkZSBjb21iYXQgKGJhdHRsZS1zdGFnZSlcclxuICAgICAgICBjb25zdCBocEJhciA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuaHAtYmFyX19maWxsJyk7XHJcbiAgICAgICAgY29uc3QgaHBUZXh0ID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcblxyXG4gICAgICAgIGlmIChocEJhcikge1xyXG4gICAgICAgICAgICAvLyBBbmltYXRpb24gZmx1aWRlIGRlIGxhIGJhcnJlXHJcbiAgICAgICAgICAgIGhwQmFyLnN0eWxlLnRyYW5zaXRpb24gPSBgd2lkdGggMC4zcyBlYXNlLW91dGA7XHJcbiAgICAgICAgICAgIGhwQmFyLnN0eWxlLndpZHRoID0gYCR7cGVyY2VudH0lYDtcclxuXHJcbiAgICAgICAgICAgIC8vIENsYXNzZXMgZGUgY291bGV1ciBzZWxvbiBsZSBwb3VyY2VudGFnZVxyXG4gICAgICAgICAgICBocEJhci5jbGFzc0xpc3QucmVtb3ZlKCdocC1iYXJfX2ZpbGwtLWxvdycsICdocC1iYXJfX2ZpbGwtLWNyaXRpY2FsJyk7XHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50IDw9IDI1KSB7XHJcbiAgICAgICAgICAgICAgICBocEJhci5jbGFzc0xpc3QuYWRkKCdocC1iYXJfX2ZpbGwtLWNyaXRpY2FsJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGVyY2VudCA8PSA1MCkge1xyXG4gICAgICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LmFkZCgnaHAtYmFyX19maWxsLS1sb3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhwVGV4dCkge1xyXG4gICAgICAgICAgICBocFRleHQudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50SFB9LyR7bWF4SFB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1pc2Ugw6Agam91ciBkZXMgcGFubmVhdXggZCdpbmZvIGxhdMOpcmF1eFxyXG4gICAgICAgIHRoaXMudXBkYXRlSW5mb1BhbmVsKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUluZm9QYW5lbChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQKSB7XHJcbiAgICAgICAgLy8gVHJvdXZlciBsZSBib24gcGFubmVhdSBzZWxvbiBsJ8OpcXVpcGVcclxuICAgICAgICBjb25zdCBwYW5lbENsYXNzID0gdGVhbU5hbWUgPT09ICdFcXVpcGUgMScgPyAnLmluZm8tcGFuZWwtLXRlYW0xJyA6ICcuaW5mby1wYW5lbC0tdGVhbTInO1xyXG4gICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihwYW5lbENsYXNzKTtcclxuXHJcbiAgICAgICAgaWYgKCFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBUcm91dmVyIGxlIHBlcnNvbm5hZ2UgZGFucyBsZSBwYW5uZWF1IHBhciBzb24gbm9tXHJcbiAgICAgICAgY29uc3QgY2hhcmFjdGVySW5mb3MgPSBwYW5lbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hhcmFjdGVyLWluZm8nKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGluZm8gb2YgY2hhcmFjdGVySW5mb3MpIHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZUVsID0gaW5mby5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX25hbWUnKTtcclxuICAgICAgICAgICAgaWYgKG5hbWVFbCAmJiBuYW1lRWwudGV4dENvbnRlbnQudHJpbSgpID09PSBjaGFyYWN0ZXJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0c1NwYW4gPSBpbmZvLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fc3RhdHMgc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRzU3Bhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzU3Bhbi50ZXh0Q29udGVudCA9IGN1cnJlbnRIUDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGZsYXNoIHBvdXIgbW9udHJlciBsZSBjaGFuZ2VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNTcGFuLmNsYXNzTGlzdC5hZGQoJ2hwLXVwZGF0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHN0YXRzU3Bhbi5jbGFzc0xpc3QucmVtb3ZlKCdocC11cGRhdGVkJyksIDMwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93VmljdG9yeU92ZXJsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmluYWxpc2VyIGxlIE1NUiBhIGxhIGZpbiBkdSBjb21iYXRcclxuICAgICAgICB0aGlzLmZpbmFsaXplUmF0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluYWxpemVSYXRpbmcoKSB7XHJcbiAgICAgICAgY29uc3QgZmluYWxpemVVcmwgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmZpbmFsaXplVXJsO1xyXG4gICAgICAgIGlmICghZmluYWxpemVVcmwpIHJldHVybjtcclxuXHJcbiAgICAgICAgZmV0Y2goZmluYWxpemVVcmwsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyAmJiBkYXRhLnJhdGluZ0NoYW5nZSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmF0aW5nVXBkYXRlKGRhdGEucmF0aW5nQ2hhbmdlLCBkYXRhLm5ld1JhdGluZywgZGF0YS5uZXdSYXRpbmcyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKCdFcnJldXIgZmluYWxpc2F0aW9uIHJhdGluZzonLCBlcnIpKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93UmF0aW5nVXBkYXRlKGNoYW5nZSwgbmV3UmF0aW5nLCBuZXdSYXRpbmcyKSB7XHJcbiAgICAgICAgLy8gTWV0dHJlIGEgam91ciBsZSBNTVIgYWZmaWNoZSBkYW5zIGxlIHBhbm5lYXUgam91ZXVyIChFcXVpcGUgMSlcclxuICAgICAgICBjb25zdCByYXRpbmdFbCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXBhbmVsLS10ZWFtMSAuaW5mby1wYW5lbF9fcmF0aW5nJyk7XHJcbiAgICAgICAgaWYgKHJhdGluZ0VsICYmIG5ld1JhdGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByYXRpbmdFbC5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke25ld1JhdGluZ30gTU1SYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSBhIGpvdXIgbGUgTU1SIGFmZmljaGUgZGFucyBsZSBwYW5uZWF1IGFkdmVyc2FpcmUgKEVxdWlwZSAyKVxyXG4gICAgICAgIGNvbnN0IHJhdGluZ0VsMiA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXBhbmVsLS10ZWFtMiAuaW5mby1wYW5lbF9fcmF0aW5nLS1lbmVteScpO1xyXG4gICAgICAgIGlmIChyYXRpbmdFbDIgJiYgbmV3UmF0aW5nMiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByYXRpbmdFbDIuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHtuZXdSYXRpbmcyfSBNTVJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWZmaWNoZXIgbGEgbm90aWZpY2F0aW9uIGRlIGNoYW5nZW1lbnQgZGFucyBsJ292ZXJsYXlcclxuICAgICAgICBjb25zdCBvdmVybGF5ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LW92ZXJsYXldJyk7XHJcbiAgICAgICAgaWYgKG92ZXJsYXkpIHtcclxuICAgICAgICAgICAgY29uc3Qgd2lubmVyRGl2ID0gb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcuYmF0dGxlLXN0YWdlX193aW5uZXInKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoYW5nZW1lbnQgTU1SIEVxdWlwZSAxXHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBub3RpZjEuY2xhc3NOYW1lID0gJ3JhdGluZy1jaGFuZ2UnO1xyXG4gICAgICAgICAgICBub3RpZjEuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MS4ycmVtO21hcmdpbi10b3A6MTJweDtmb250LXdlaWdodDpib2xkO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgMC41czsnO1xyXG4gICAgICAgICAgICBub3RpZjEudGV4dENvbnRlbnQgPSBjaGFuZ2UgPiAwID8gYEVxdWlwZSAxIDogKyR7Y2hhbmdlfSBNTVJgIDogYEVxdWlwZSAxIDogJHtjaGFuZ2V9IE1NUmA7XHJcbiAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5jb2xvciA9IGNoYW5nZSA+IDAgPyAnIzRjYWY1MCcgOiAnI2Y0NDMzNic7XHJcbiAgICAgICAgICAgIHdpbm5lckRpdi5hcHBlbmRDaGlsZChub3RpZjEpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hhbmdlbWVudCBNTVIgRXF1aXBlIDIgKGludmVyc2UpXHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZTIgPSAtY2hhbmdlO1xyXG4gICAgICAgICAgICBjb25zdCBub3RpZjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbm90aWYyLmNsYXNzTmFtZSA9ICdyYXRpbmctY2hhbmdlJztcclxuICAgICAgICAgICAgbm90aWYyLnN0eWxlLmNzc1RleHQgPSAnZm9udC1zaXplOjEuMnJlbTttYXJnaW4tdG9wOjZweDtmb250LXdlaWdodDpib2xkO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgMC41czsnO1xyXG4gICAgICAgICAgICBub3RpZjIudGV4dENvbnRlbnQgPSBjaGFuZ2UyID4gMCA/IGBFcXVpcGUgMiA6ICske2NoYW5nZTJ9IE1NUmAgOiBgRXF1aXBlIDIgOiAke2NoYW5nZTJ9IE1NUmA7XHJcbiAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5jb2xvciA9IGNoYW5nZTIgPiAwID8gJyM0Y2FmNTAnIDogJyNmNDQzMzYnO1xyXG4gICAgICAgICAgICB3aW5uZXJEaXYuYXBwZW5kQ2hpbGQobm90aWYyKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90aWYxLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgICAgICBub3RpZjIuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUGxheUJ1dHRvbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheUJ0bikgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcgJiYgIXRoaXMuaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gJ1BhdXNlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gJ1Rlcm1pbsOpJztcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSB0aGlzLmN1cnJlbnRJbmRleCA+IDAgPyAnUmVwcmVuZHJlJyA6ICdMYW5jZXInO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gSW5pdGlhbGlzZXIgcXVhbmQgbGUgRE9NIGVzdCBwcsOqdFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgY29tYmF0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LWxvZ3NdJyk7XHJcbiAgICBpZiAoY29tYmF0Q29udGFpbmVyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpc2F0aW9uIGR1IGNvbWJhdC4uLicpO1xyXG4gICAgICAgIG5ldyBDb21iYXRDb250cm9sbGVyKGNvbWJhdENvbnRhaW5lcik7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tYmF0Q29udHJvbGxlcjtcclxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgRlJJRU5EIFNZU1RFTVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LnRleHRDb250ZW50ID0gc3RyO1xyXG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1wYW5lbF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGJhZGdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1iYWRnZV0nKTtcclxuXHJcbiAgICBpZiAoIXRvZ2dsZSB8fCAhcGFuZWwpIHJldHVybjtcclxuXHJcbiAgICBsZXQgcGFuZWxPcGVuID0gZmFsc2U7XHJcbiAgICBsZXQgY3VycmVudFRhYiA9ICdmcmllbmRzJztcclxuICAgIGxldCBjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkID0gbnVsbDtcclxuICAgIGxldCBsYXN0TWVzc2FnZUlkID0gMDtcclxuICAgIGxldCBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgIGxldCB1bnJlYWRQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgbGV0IGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgIGxldCByZXF1ZXN0c0xvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gUEFORUwgT1BFTi9DTE9TRVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBvcGVuUGFuZWwoKSB7XHJcbiAgICAgICAgcGFuZWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwYW5lbC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBhbmVsLmNsYXNzTGlzdC5hZGQoJ2ZyaWVuZHMtcGFuZWwtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdmcmllbmRzLXBhbmVsX19iYWNrZHJvcC0tb3BlbicpO1xyXG4gICAgICAgIHBhbmVsT3BlbiA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICghZnJpZW5kc0xvYWRlZCkge1xyXG4gICAgICAgICAgICBsb2FkRnJpZW5kcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBhbmVsKCkge1xyXG4gICAgICAgIHBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZyaWVuZHMtcGFuZWwtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdmcmllbmRzLXBhbmVsX19iYWNrZHJvcC0tb3BlbicpO1xyXG4gICAgICAgIHBhbmVsT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBwYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcGFuZWxPcGVuID8gY2xvc2VQYW5lbCgpIDogb3BlblBhbmVsKCkpO1xyXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBhbmVsKTtcclxuICAgIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQYW5lbCk7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBUQUJTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZyaWVuZHMtdGFiXScpLmZvckVhY2godGFiQnRuID0+IHtcclxuICAgICAgICB0YWJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhYk5hbWUgPSB0YWJCdG4uZGF0YXNldC5mcmllbmRzVGFiO1xyXG4gICAgICAgICAgICBzd2l0Y2hUYWIodGFiTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzd2l0Y2hUYWIodGFiTmFtZSkge1xyXG4gICAgICAgIGN1cnJlbnRUYWIgPSB0YWJOYW1lO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mcmllbmRzLXRhYl0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdmcmllbmRzLXBhbmVsX190YWItLWFjdGl2ZScsIGJ0bi5kYXRhc2V0LmZyaWVuZHNUYWIgPT09IHRhYk5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWItY29udGVudF0nKS5mb3JFYWNoKGNvbnRlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBjb250ZW50LmRhdGFzZXQudGFiQ29udGVudCA9PT0gdGFiTmFtZSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX190YWJzJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fY29udGVudCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtY29udmVyc2F0aW9uXScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICh0YWJOYW1lID09PSAnZnJpZW5kcycgJiYgIWZyaWVuZHNMb2FkZWQpIGxvYWRGcmllbmRzKCk7XHJcbiAgICAgICAgaWYgKHRhYk5hbWUgPT09ICdyZXF1ZXN0cycgJiYgIXJlcXVlc3RzTG9hZGVkKSBsb2FkUmVxdWVzdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIExPQUQgRlJJRU5EUyBMSVNUXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGxvYWRGcmllbmRzKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRhYi1jb250ZW50PVwiZnJpZW5kc1wiXScpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+IENoYXJnZW1lbnQuLi48L2Rpdj4nO1xyXG5cclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvbGlzdCcsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5mcmllbmRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+PGkgY2xhc3M9XCJmYXMgZmEtZ2hvc3RcIj48L2k+IEF1Y3VuIGNvbXBhZ25vbi4uLiBMZSBkb25qb24gZXN0IHNvbGl0YWlyZS48L3A+JztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGRhdGEuZnJpZW5kcy5tYXAoZiA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIiBkYXRhLWZyaWVuZC11c2VyLWlkPVwiJHtmLnVzZXJJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2YucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChmLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKGYudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChmLnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3ByZXZpZXdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7Zi5sYXN0TWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKGYubGFzdE1lc3NhZ2UuaXNGcm9tTWUgPyAnVm91czogJyA6ICcnKSArIGVzY2FwZUh0bWwoZi5sYXN0TWVzc2FnZS5jb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ0F1Y3VuIG1lc3NhZ2UnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcmF0aW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke2YucmF0aW5nfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuZnJpZW5kLWl0ZW0nKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VySWQgPSBwYXJzZUludChpdGVtLmRhdGFzZXQuZnJpZW5kVXNlcklkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kLWl0ZW1fX25hbWUnKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuQ29udmVyc2F0aW9uKHVzZXJJZCwgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5FcnJldXIgZGUgY2hhcmdlbWVudDwvcD4nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTE9BRCBQRU5ESU5HIFJFUVVFU1RTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGxvYWRSZXF1ZXN0cygpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YWItY29udGVudD1cInJlcXVlc3RzXCJdJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gQ2hhcmdlbWVudC4uLjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy9wZW5kaW5nJywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgcmVxdWVzdHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXF1ZXN0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkF1Y3VuZSBkZW1hbmRlIGVuIGF0dGVudGU8L3A+JztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGRhdGEucmVxdWVzdHMubWFwKHIgPT4gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCIgZGF0YS1yZXF1ZXN0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke3IucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChyLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKHIudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChyLnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3ByZXZpZXdcIj4ke2VzY2FwZUh0bWwoci5kYXRlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLWFjY2VwdFwiIGRhdGEtYWNjZXB0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcmVqZWN0XCIgZGF0YS1yZWplY3QtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXNcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjY2VwdC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVxdWVzdChidG4uZGF0YXNldC5hY2NlcHRJZCwgJ2FjY2VwdCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJlamVjdC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVxdWVzdChidG4uZGF0YXNldC5yZWplY3RJZCwgJ3JlamVjdCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RXJyZXVyIGRlIGNoYXJnZW1lbnQ8L3A+JztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0KGZyaWVuZHNoaXBJZCwgYWN0aW9uKSB7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzLyR7YWN0aW9ufS8ke2ZyaWVuZHNoaXBJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxvYWRSZXF1ZXN0cygpO1xyXG4gICAgICAgICAgICAgICAgZmV0Y2hVbnJlYWRDb3VudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBTRUFSQ0ggVVNFUlNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXNlYXJjaC1pbnB1dF0nKTtcclxuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXNlYXJjaC1yZXN1bHRzXScpO1xyXG4gICAgbGV0IHNlYXJjaFRpbWVvdXQgPSBudWxsO1xyXG5cclxuICAgIGlmIChzZWFyY2hJbnB1dCkge1xyXG4gICAgICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc2VhcmNoVGltZW91dCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gc2VhcmNoSW5wdXQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZldGNoKGAvZnJpZW5kcy9zZWFyY2g/cT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeSl9YCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnVzZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+QXVjdW4gZ3VlcnJpZXIgdHJvdXZlPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gZGF0YS51c2Vycy5tYXAodSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpb25IdG1sID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ2FjY2VwdGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPkFtaTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAncGVuZGluZ19zZW50Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPkVudm95ZWU8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ3BlbmRpbmdfcmVjZWl2ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+UmVjdWU8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSBgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tYWRkXCIgZGF0YS1hZGQtZnJpZW5kLWlkPVwiJHt1LnVzZXJJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wbHVzXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dS5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKHUucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwodS51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKHUudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcmF0aW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke3UucmF0aW5nfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2FjdGlvbnNcIj4ke2FjdGlvbkh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hZGQtZnJpZW5kLWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kRnJpZW5kUmVxdWVzdChidG4uZGF0YXNldC5hZGRGcmllbmRJZCwgYnRuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kRnJpZW5kUmVxdWVzdCh1c2VySWQsIGJ0bikge1xyXG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL3JlcXVlc3QvJHt1c2VySWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5vdXRlckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5FbnZveWVlPC9zcGFuPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgYnRuLmRpc2FibGVkID0gZmFsc2U7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gQ09OVkVSU0FUSU9OXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIG9wZW5Db252ZXJzYXRpb24odXNlcklkLCB1c2VybmFtZSkge1xyXG4gICAgICAgIGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgICAgbGFzdE1lc3NhZ2VJZCA9IDA7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX190YWJzJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fY29udGVudCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgY29uc3QgY29udkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jb252ZXJzYXRpb25dJyk7XHJcbiAgICAgICAgY29udkVsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1uYW1lXScpLnRleHRDb250ZW50ID0gdXNlcm5hbWU7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1tZXNzYWdlc10nKTtcclxuICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gQ2hhcmdlbWVudC4uLjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke3VzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhkYXRhLm1lc3NhZ2VzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHN0YXJ0TWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJNZXNzYWdlcyhtZXNzYWdlcywgYXBwZW5kKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1tZXNzYWdlc10nKTtcclxuXHJcbiAgICAgICAgaWYgKCFhcHBlbmQpIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkRlYnV0IGRlIGxhIGNvbnZlcnNhdGlvbi4gRW52b3lleiBsZSBwcmVtaWVyIG1lc3NhZ2UhPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaSBvbiBham91dGUgZGVzIG1lc3NhZ2VzIGV0IHF1ZSBsZSBjb250ZW5ldXIgYWZmaWNoZSBsZSBwbGFjZWhvbGRlciwgbGUgc3VwcHJpbWVyXHJcbiAgICAgICAgaWYgKGFwcGVuZCAmJiBtZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gbWVzc2FnZXNFbC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fZW1wdHknKTtcclxuICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyKSBwbGFjZWhvbGRlci5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1lc3NhZ2VzLmZvckVhY2gobXNnID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5pZCA+IGxhc3RNZXNzYWdlSWQpIGxhc3RNZXNzYWdlSWQgPSBtc2cuaWQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NoYXQtbWVzc2FnZScsIG1zZy5pc0Zyb21NZSA/ICdjaGF0LW1lc3NhZ2UtLW1pbmUnIDogJ2NoYXQtbWVzc2FnZS0tdGhlaXJzJyk7XHJcbiAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICAke2VzY2FwZUh0bWwobXNnLmNvbnRlbnQpfVxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGF0LW1lc3NhZ2VfX3RpbWVcIj4ke2VzY2FwZUh0bWwobXNnLmRhdGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgbWVzc2FnZXNFbC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtZXNzYWdlc0VsLnNjcm9sbFRvcCA9IG1lc3NhZ2VzRWwuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlbmQgbWVzc2FnZVxyXG4gICAgY29uc3Qgc2VuZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1zZW5kXScpO1xyXG4gICAgY29uc3QgaW5wdXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1pbnB1dF0nKTtcclxuXHJcbiAgICBpZiAoc2VuZEJ0biAmJiBpbnB1dEVsKSB7XHJcbiAgICAgICAgc2VuZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbmRNZXNzYWdlKTtcclxuICAgICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHNlbmRNZXNzYWdlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VuZE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IGlucHV0RWwudmFsdWUudHJpbSgpO1xyXG4gICAgICAgIGlmICghY29udGVudCB8fCAhY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpbnB1dEVsLnZhbHVlID0gJyc7XHJcblxyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke2N1cnJlbnRDb252ZXJzYXRpb25Vc2VySWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNvbnRlbnQ6IGNvbnRlbnQgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICYmIGRhdGEubWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyTWVzc2FnZXMoW2RhdGEubWVzc2FnZV0sIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQmFjayBidXR0b25cclxuICAgIGNvbnN0IGJhY2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tYmFja10nKTtcclxuICAgIGlmIChiYWNrQnRuKSB7XHJcbiAgICAgICAgYmFja0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgICAgICBmcmllbmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaFRhYignZnJpZW5kcycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTUVTU0FHRSBQT0xMSU5HIChldmVyeSA1cyB3aGVuIGNvbnZlcnNhdGlvbiBvcGVuKVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBzdGFydE1lc3NhZ2VQb2xsaW5nKCkge1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7Y3VycmVudENvbnZlcnNhdGlvblVzZXJJZH0/YWZ0ZXJJZD0ke2xhc3RNZXNzYWdlSWR9YCwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5tZXNzYWdlcyAmJiBkYXRhLm1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhkYXRhLm1lc3NhZ2VzLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RvcE1lc3NhZ2VQb2xsaW5nKCkge1xyXG4gICAgICAgIGlmIChtZXNzYWdlUG9sbGluZ0ludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobWVzc2FnZVBvbGxpbmdJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFVOUkVBRCBDT1VOVCBQT0xMSU5HIChldmVyeSAzMHMsIGFsd2F5cyBhY3RpdmUpXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGZldGNoVW5yZWFkQ291bnQoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9mcmllbmRzL3VucmVhZC1jb3VudCcsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnRvdGFsID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UudGV4dENvbnRlbnQgPSBkYXRhLnRvdGFsO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdHNCYWRnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlcXVlc3RzLWJhZGdlXScpO1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdHNCYWRnZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucGVuZGluZ1JlcXVlc3RzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2UudGV4dENvbnRlbnQgPSBkYXRhLnBlbmRpbmdSZXF1ZXN0cztcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIGZldGNoVW5yZWFkQ291bnQoKTtcclxuICAgIHVucmVhZFBvbGxpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKGZldGNoVW5yZWFkQ291bnQsIDMwMDAwKTtcclxufSk7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJidXJnZXIiLCJxdWVyeVNlbGVjdG9yIiwibmF2IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiU1RBVF9NQVgiLCJkbWciLCJzcGVlZCIsImRvZGdlIiwiY3JpdCIsImhwIiwicG9ydHJhaXRzIiwicXVlcnlTZWxlY3RvckFsbCIsImRldGFpbHMiLCJnZXRFbGVtZW50QnlJZCIsInNlbGVjdGVkTGlzdCIsImxhdW5jaEJ0biIsImxlbmd0aCIsIm1heFNlbGVjdGlvbiIsInNlbGVjdGVkSGVyb2VzIiwic2VsZWN0ZWRIZXJvSWRzIiwiUk9MRV9DQVRFR09SSUVTIiwiZ2V0U2VsZWN0ZWRSb2xlcyIsInJvbGVzIiwiVGFuayIsIkRQUyIsIlN1cHBvcnQiLCJmb3JFYWNoIiwiaWQiLCJwIiwiQXJyYXkiLCJmcm9tIiwiZmluZCIsInBwIiwiZGF0YXNldCIsImNhdCIsInJvbGUiLCJjYW5TZWxlY3RSb2xlIiwicG9ydHJhaXQiLCJyZW1vdmUiLCJhZGQiLCJuYW1lIiwiZG1nTWluIiwiTnVtYmVyIiwiZG1nTWF4Iiwic3ByaXRlRmlsZSIsInNwcml0ZSIsInNwcml0ZVBhdGgiLCJjb25jYXQiLCJpc1NlbGVjdGVkIiwiaW5jbHVkZXMiLCJpbm5lckhUTUwiLCJNYXRoIiwibWluIiwiYnRuUmlnaHQiLCJyb2xlQ2F0IiwiYWxyZWFkeVNlbGVjdGVkIiwiZGlzYWJsZWQiLCJ0ZXh0Q29udGVudCIsImZpbHRlciIsImhpZCIsImgiLCJhbGVydCIsInB1c2giLCJ1cGRhdGVTZWxlY3RlZFRlYW0iLCJoZXJvIiwiaGVyb0VsIiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwidXBkYXRlUm9sZUluZGljYXRvcnMiLCJ0ZWFtQ29tcGxldGUiLCJpbmRpY2F0b3IiLCJzbG90Iiwic2F2ZVByZXNldEJ0biIsInByZXNldE1vZGFsIiwicHJlc2V0TmFtZUlucHV0IiwicHJlc2V0Q29uZmlybUJ0biIsInByZXNldENhbmNlbEJ0biIsInVwZGF0ZVNhdmVQcmVzZXRCdG4iLCJvcmlnaW5hbFVwZGF0ZVNlbGVjdGVkVGVhbSIsIl9vcmlnVXBkYXRlIiwiX29yaWdSb2xlSW5kaWNhdG9ycyIsInZhbHVlIiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsImZvY3VzIiwidHJpbSIsImJvcmRlckNvbG9yIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjaGFyYWN0ZXJJZHMiLCJtYXAiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJzdWNjZXNzIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJlcnJvciIsImUiLCJrZXkiLCJjbGljayIsImxvYWRQcmVzZXQiLCJpZFN0ciIsIlN0cmluZyIsImRlbGV0ZVByZXNldCIsInByZXNldElkIiwiY2hpcEVsIiwiY29uZmlybSIsImxpc3QiLCJjaGlsZHJlbiIsIl9kb2N1bWVudCRxdWVyeVNlbGVjdCIsImNoaXAiLCJjaGFySWRzIiwicGFyc2UiLCJwcmVzZXRJZHMiLCJzdG9wUHJvcGFnYXRpb24iLCJzZWxlY3RlZExpc3RPYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiY2hpbGRMaXN0IiwiaSIsImVuY29kZVVSSUNvbXBvbmVudCIsImpvaW4iLCJyZXNwb25zZSIsInJlZGlyZWN0ZWQiLCJocmVmIiwidXJsIiwicG9wdXAiLCJiYWNrZHJvcCIsImNsb3NlQnRuIiwiY29udGVudCIsImxvYWRlZCIsIm9wZW5Qb3B1cCIsIm9mZnNldEhlaWdodCIsImZldGNoUHJvZmlsZSIsImNsb3NlUG9wdXAiLCJyZW5kZXJQcm9maWxlIiwicmVzdWx0Q2xhc3MiLCJyIiwicmVzdWx0TGFiZWwiLCJhdmF0YXJIdG1sIiwicHJvZmlsZUltYWdlIiwiaHRtbCIsInVzZXJuYW1lIiwibW90dG8iLCJiaW8iLCJyYXRpbmciLCJzdGF0cyIsIndpbnMiLCJsb3NzZXMiLCJ3aW5SYXRlIiwiZmF2b3JpdGVDaGFyYWN0ZXIiLCJnYW1lc1BsYXllZCIsImxhc3RUZWFtIiwiYyIsInJlY2VudEJhdHRsZXMiLCJiIiwicmVzdWx0Iiwib3Bwb25lbnQiLCJtYXRjaFR5cGUiLCJ0b1VwcGVyQ2FzZSIsImRhdGUiLCJjb25zb2xlIiwibG9nIiwiQ29tYmF0Q29udHJvbGxlciIsImNvbnRhaW5lciIsIl9jbGFzc0NhbGxDaGVjayIsImxvZ3MiLCJjdXJyZW50SW5kZXgiLCJpc1BsYXlpbmciLCJpc1BhdXNlZCIsImNoYXJhY3RlckVsZW1lbnRzIiwiY2hhcmFjdGVyTWF4SFAiLCJpbml0IiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJsb2dzRGF0YSIsImNvbWJhdExvZ3MiLCJhdHRhY2tMb2ciLCJ0eXBlIiwibG9nQ29udGFpbmVyIiwib3ZlcmxheSIsInBsYXlCdG4iLCJza2lwQnRuIiwic3BlZWRCdG5zIiwiZWwiLCJjaGFyYWN0ZXJOYW1lIiwidGVhbSIsImNoYXJhY3RlclRlYW0iLCJocFRleHQiLCJtYXRjaCIsInBhcnNlSW50IiwiT2JqZWN0Iiwia2V5cyIsIm9wYWNpdHkiLCJiaW5kRXZlbnRzIiwicGxheSIsIl90aGlzMiIsInRvZ2dsZVBsYXkiLCJza2lwIiwiYnRuIiwic2V0U3BlZWQiLCJ1cGRhdGVQbGF5QnV0dG9uIiwicHJvY2Vzc05leHRMb2ciLCJwYXVzZSIsImRpc3BsYXlMb2ciLCJ1cGRhdGVIZWFsdGhCYXJzIiwiYW5pbWF0ZURlYXRoIiwidGFyZ2V0IiwidGFyZ2V0VGVhbSIsInNob3dWaWN0b3J5T3ZlcmxheSIsImV2ZW50IiwicGFyc2VGbG9hdCIsImN1cnJlbnRUYXJnZXQiLCJjb21iYXRTcGVlZCIsIl90aGlzMyIsInByb2Nlc3NMb2ciLCJkZWxheSIsImdldERlbGF5Rm9yTG9nIiwiX3RoaXM0IiwicGxheUFuaW1hdGlvbiIsImhwRGVsYXkiLCJnZXRIUFVwZGF0ZURlbGF5IiwiYW5pbWF0ZUF0dGFjayIsImF0dGFja2VyIiwiYXR0YWNrZXJUZWFtIiwiaXNDcml0IiwiYW5pbWF0ZUhlYWwiLCJoZWFsZXIiLCJoZWFsZXJUZWFtIiwiYW5pbWF0ZURlZmVuZCIsImRlZmVuZGVyIiwiZGVmZW5kZXJUZWFtIiwiYW5pbWF0ZURvZGdlIiwiYXR0YWNrZXJOYW1lIiwidGFyZ2V0TmFtZSIsImdldENoYXJhY3RlckVsZW1lbnQiLCJoZWFsZXJOYW1lIiwiZGVmZW5kZXJOYW1lIiwiZW50cnkiLCJjbGFzc05hbWUiLCJtZXNzYWdlIiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwidGVhbU5hbWUiLCJjdXJyZW50SFAiLCJtYXhIUCIsInRhcmdldEhQIiwidGFyZ2V0TWF4SFAiLCJ1bmRlZmluZWQiLCJ1cGRhdGVDaGFyYWN0ZXJIUCIsInBlcmNlbnQiLCJocEJhciIsInRyYW5zaXRpb24iLCJ3aWR0aCIsInVwZGF0ZUluZm9QYW5lbCIsInBhbmVsQ2xhc3MiLCJwYW5lbCIsImNoYXJhY3RlckluZm9zIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsIl9sb29wIiwiaW5mbyIsIm5hbWVFbCIsInN0YXRzU3BhbiIsInMiLCJuIiwiZG9uZSIsImVyciIsImYiLCJfdGhpczUiLCJmaW5hbGl6ZVJhdGluZyIsIl90aGlzNiIsImZpbmFsaXplVXJsIiwicmF0aW5nQ2hhbmdlIiwic2hvd1JhdGluZ1VwZGF0ZSIsIm5ld1JhdGluZyIsIm5ld1JhdGluZzIiLCJjaGFuZ2UiLCJyYXRpbmdFbCIsInJhdGluZ0VsMiIsIndpbm5lckRpdiIsIm5vdGlmMSIsImNzc1RleHQiLCJjb2xvciIsImNoYW5nZTIiLCJub3RpZjIiLCJjb21iYXRDb250YWluZXIiLCJlc2NhcGVIdG1sIiwic3RyIiwiZGl2IiwiYmFkZ2UiLCJwYW5lbE9wZW4iLCJjdXJyZW50VGFiIiwiY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCIsImxhc3RNZXNzYWdlSWQiLCJtZXNzYWdlUG9sbGluZ0ludGVydmFsIiwidW5yZWFkUG9sbGluZ0ludGVydmFsIiwiZnJpZW5kc0xvYWRlZCIsInJlcXVlc3RzTG9hZGVkIiwib3BlblBhbmVsIiwibG9hZEZyaWVuZHMiLCJjbG9zZVBhbmVsIiwic3RvcE1lc3NhZ2VQb2xsaW5nIiwidGFiQnRuIiwidGFiTmFtZSIsImZyaWVuZHNUYWIiLCJzd2l0Y2hUYWIiLCJ0YWJDb250ZW50IiwibG9hZFJlcXVlc3RzIiwiZnJpZW5kcyIsInVzZXJJZCIsImxhc3RNZXNzYWdlIiwiaXNGcm9tTWUiLCJpdGVtIiwiZnJpZW5kVXNlcklkIiwib3BlbkNvbnZlcnNhdGlvbiIsInJlcXVlc3RzIiwiZnJpZW5kc2hpcElkIiwiaGFuZGxlUmVxdWVzdCIsImFjY2VwdElkIiwicmVqZWN0SWQiLCJhY3Rpb24iLCJmZXRjaFVucmVhZENvdW50Iiwic2VhcmNoSW5wdXQiLCJzZWFyY2hSZXN1bHRzIiwic2VhcmNoVGltZW91dCIsImNsZWFyVGltZW91dCIsInF1ZXJ5IiwidXNlcnMiLCJ1IiwiYWN0aW9uSHRtbCIsImZyaWVuZFN0YXR1cyIsInNlbmRGcmllbmRSZXF1ZXN0IiwiYWRkRnJpZW5kSWQiLCJvdXRlckhUTUwiLCJjb252RWwiLCJtZXNzYWdlc0VsIiwicmVuZGVyTWVzc2FnZXMiLCJtZXNzYWdlcyIsInN0YXJ0TWVzc2FnZVBvbGxpbmciLCJhcHBlbmQiLCJwbGFjZWhvbGRlciIsIm1zZyIsInNlbmRCdG4iLCJpbnB1dEVsIiwic2VuZE1lc3NhZ2UiLCJiYWNrQnRuIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwidG90YWwiLCJyZXF1ZXN0c0JhZGdlIiwicGVuZGluZ1JlcXVlc3RzIl0sInNvdXJjZVJvb3QiOiIifQ==