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
      } else if (log.type === 'heal') {
        characterName = log.target;
        teamName = log.targetTeam;
        currentHP = log.targetHP;
        maxHP = log.targetMaxHP;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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VyxHQUFHd0MsSUFBSSxDQUFDcVEsS0FBSztRQUM5Qm5FLEtBQUssQ0FBQ25OLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLGNBQWM7TUFDeEMsQ0FBQyxNQUFNO1FBQ0hrTixLQUFLLENBQUNuTixLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO01BQ2hDO01BRUEsSUFBTXNSLGFBQWEsR0FBRzdXLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLHVCQUF1QixDQUFDO01BQ3JFLElBQUlzVyxhQUFhLEVBQUU7UUFDZixJQUFJdFEsSUFBSSxDQUFDdVEsZUFBZSxHQUFHLENBQUMsRUFBRTtVQUMxQkQsYUFBYSxDQUFDOVMsV0FBVyxHQUFHd0MsSUFBSSxDQUFDdVEsZUFBZTtVQUNoREQsYUFBYSxDQUFDdlIsS0FBSyxDQUFDQyxPQUFPLEdBQUcsY0FBYztRQUNoRCxDQUFDLE1BQU07VUFDSHNSLGFBQWEsQ0FBQ3ZSLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07UUFDeEM7TUFDSjtJQUNKLENBQUMsQ0FBQyxTQUNJLENBQUMsWUFBTSxDQUFDLENBQUMsQ0FBQztFQUNwQjtFQUVBa1AsZ0JBQWdCLENBQUMsQ0FBQztFQUNsQjFCLHFCQUFxQixHQUFHMkQsV0FBVyxDQUFDakMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDO0FBQ2hFLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7Ozs7QUN0ZkY7Ozs7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2NvbWJhdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZnJpZW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5jc3M/MmRjOSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcclxuICovXHJcbmltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnO1xyXG5pbXBvcnQgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzJztcclxuaW1wb3J0ICcuL2pzL2NvbWJhdC5qcyc7XHJcbmltcG9ydCAnLi9qcy9mcmllbmRzLmpzJztcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgVVRJTElUQUlSRSBTRUNVUklURSBYU1NcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xyXG4gICAgaWYgKCFzdHIpIHJldHVybiAnJztcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cikpO1xyXG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgTUVOVSBCVVJHRVJcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBidXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1cmdlclwiKTtcclxuICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1uYXZpZ2F0aW9uXCIpO1xyXG5cclxuICAgIGlmIChidXJnZXIgJiYgbmF2KSB7XHJcbiAgICAgICAgYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQQUdFIFRFQU1TIChDT1JSSUfDiUUpXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKiDwn5SnIE1BWCBERVMgU1RBVFMgKGFkYXB0ZXIgw6AgdGEgQkREIC8gw6lxdWlsaWJyYWdlKSAqL1xyXG5jb25zdCBTVEFUX01BWCA9IHtcclxuICAgIGRtZzogMzAsXHJcbiAgICBzcGVlZDogMTIsXHJcbiAgICBkb2RnZTogNDAsXHJcbiAgICBjcml0OiAxNSxcclxuICAgIGhwOiA3NVxyXG59O1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHBvcnRyYWl0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFtLXBvcnRyYWl0Jyk7XHJcbiAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlYW1EZXRhaWxzJyk7XHJcbiAgICBjb25zdCBzZWxlY3RlZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGlzdCcpO1xyXG4gICAgY29uc3QgbGF1bmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1sYXVuY2gnKTtcclxuXHJcbiAgICBpZiAoIWRldGFpbHMgfHwgcG9ydHJhaXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG1heFNlbGVjdGlvbiA9IDM7XHJcbiAgICBsZXQgc2VsZWN0ZWRIZXJvZXMgPSBbXTtcclxuICAgIGxldCBzZWxlY3RlZEhlcm9JZHMgPSBbXTtcclxuXHJcbiAgICAvLyBDb21wb3NpdGlvbiBvYmxpZ2F0b2lyZSA6IDEgVGFuaywgMSBEUFMsIDEgU3VwcG9ydFxyXG4gICAgY29uc3QgUk9MRV9DQVRFR09SSUVTID0geyAnVGFuayc6ICdUYW5rJywgJ0RQUyc6ICdEUFMnLCAnU3VwcG9ydCc6ICdTdXBwb3J0JywgJ1NvaWduZXVyJzogJ1N1cHBvcnQnLCAnQnVmZmVyJzogJ1N1cHBvcnQnIH07XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRSb2xlcygpIHtcclxuICAgICAgICBjb25zdCByb2xlcyA9IHsgVGFuazogMCwgRFBTOiAwLCBTdXBwb3J0OiAwIH07XHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocHAgPT4gcHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAocCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2F0ID0gUk9MRV9DQVRFR09SSUVTW3AuZGF0YXNldC5yb2xlXSB8fCAnU3VwcG9ydCc7XHJcbiAgICAgICAgICAgICAgICByb2xlc1tjYXRdKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcm9sZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FuU2VsZWN0Um9sZShyb2xlKSB7XHJcbiAgICAgICAgY29uc3QgY2F0ID0gUk9MRV9DQVRFR09SSUVTW3JvbGVdIHx8ICdTdXBwb3J0JztcclxuICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICByZXR1cm4gcm9sZXNbY2F0XSA8IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcG9ydHJhaXRzLmZvckVhY2gocG9ydHJhaXQgPT4ge1xyXG4gICAgICAgIHBvcnRyYWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gcG9ydHJhaXQuZGF0YXNldC5pZDtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHBvcnRyYWl0LmRhdGFzZXQubmFtZTtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZSA9IHBvcnRyYWl0LmRhdGFzZXQucm9sZTtcclxuICAgICAgICAgICAgY29uc3QgZG1nTWluID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuZG1nTWluKTtcclxuICAgICAgICAgICAgY29uc3QgZG1nTWF4ID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuZG1nTWF4KTtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5zcGVlZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRvZGdlID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuZG9kZ2UpO1xyXG4gICAgICAgICAgICBjb25zdCBjcml0ID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuY3JpdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhwID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuaHApO1xyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVGaWxlID0gcG9ydHJhaXQuZGF0YXNldC5zcHJpdGU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7c3ByaXRlRmlsZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGRldGFpbHMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYW0tZGV0YWlscy1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPiR7bmFtZX08L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicm9sZVwiPiR7cm9sZX08L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnaWYtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzcHJpdGVQYXRofVwiIGFsdD1cIlNwcml0ZSBkZSAke25hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE1HPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWRtZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoZG1nTWF4IC8gU1RBVF9NQVguZG1nKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZG1nTWlufSAtICR7ZG1nTWF4fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VklUPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLXNwZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoc3BlZWQgLyBTVEFUX01BWC5zcGVlZCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke3NwZWVkfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE9ER0U8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tZG9kZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGRvZGdlIC8gU1RBVF9NQVguZG9kZ2UpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkb2RnZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNSSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tY3JpdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoY3JpdCAvIFNUQVRfTUFYLmNyaXQpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtjcml0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+SFA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0taHBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGhwIC8gU1RBVF9NQVguaHApICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtocH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLXNlbGVjdC1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2lzU2VsZWN0ZWQgPyAnRMOpc8OpbGVjdGlvbm5lcicgOiAnU8OpbGVjdGlvbm5lcid9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJ0blJpZ2h0ID0gZGV0YWlscy5xdWVyeVNlbGVjdG9yKCcuYnRuLXNlbGVjdC1yaWdodCcpO1xyXG4gICAgICAgICAgICBjb25zdCByb2xlQ2F0ID0gUk9MRV9DQVRFR09SSUVTW3JvbGVdIHx8ICdTdXBwb3J0JztcclxuICAgICAgICAgICAgY29uc3QgYWxyZWFkeVNlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIETDqXNhY3RpdmVyIGxlIGJvdXRvbiBzaSBsZSBzbG90IGRlIGNlIHLDtGxlIGVzdCBkw6lqw6AgcHJpc1xyXG4gICAgICAgICAgICBpZiAoIWFscmVhZHlTZWxlY3RlZCAmJiAhY2FuU2VsZWN0Um9sZShyb2xlKSkge1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQudGV4dENvbnRlbnQgPSBgU2xvdCAke3JvbGVDYXR9IGTDqWrDoCBwcmlzYDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IHNlbGVjdGVkSGVyb0lkcy5maWx0ZXIoaGlkID0+IGhpZCAhPT0gaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzID0gc2VsZWN0ZWRIZXJvZXMuZmlsdGVyKGggPT4gaCAhPT0gbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5TZWxlY3RSb2xlKHJvbGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGBWb3VzIGF2ZXogZMOpasOgIHVuICR7cm9sZUNhdH0gZGFucyB2b3RyZSDDqXF1aXBlICFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCA+PSBtYXhTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJWb3VzIHBvdXZleiBzw6lsZWN0aW9ubmVyIG1heGltdW0gMyBwZXJzb25uYWdlcyAhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcy5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcy5wdXNoKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0ZWRUZWFtKCk7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZClcclxuICAgICAgICAgICAgICAgICAgICA/ICdEw6lzw6lsZWN0aW9ubmVyJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogJ1PDqWxlY3Rpb25uZXInO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiAgWk9ORSDDiVFVSVBFIOKAlCBzcHJpdGVzIHNldWxlbWVudCAqL1xyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRUZWFtKCkge1xyXG4gICAgICAgIHNlbGVjdGVkTGlzdC5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocCA9PiBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgaWYgKCFoZXJvKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBoZXJvLmRhdGFzZXQubmFtZTtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlUGF0aCA9IGAvYXNzZXQvc3ByaXRlcy8ke2hlcm8uZGF0YXNldC5zcHJpdGV9YDtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGhlcm9FbC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1oZXJvLXNwcml0ZScpO1xyXG4gICAgICAgICAgICBoZXJvRWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Nwcml0ZVBhdGh9XCIgYWx0PVwiU3ByaXRlIGRlICR7bmFtZX1cIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPiR7bmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkTGlzdC5hcHBlbmRDaGlsZChoZXJvRWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGxlcyBpbmRpY2F0ZXVycyBkZSByw7RsZXNcclxuICAgICAgICB1cGRhdGVSb2xlSW5kaWNhdG9ycygpO1xyXG5cclxuICAgICAgICBpZiAobGF1bmNoQnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5TdXBwb3J0ID09PSAxO1xyXG4gICAgICAgICAgICBsYXVuY2hCdG4uZGlzYWJsZWQgPSAhdGVhbUNvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVSb2xlSW5kaWNhdG9ycygpIHtcclxuICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICBjb25zdCBpbmRpY2F0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm9sZS1pbmRpY2F0b3InKTtcclxuICAgICAgICBpZiAoaW5kaWNhdG9yKSB7XHJcbiAgICAgICAgICAgIGluZGljYXRvci5xdWVyeVNlbGVjdG9yQWxsKCcucm9sZS1zbG90JykuZm9yRWFjaChzbG90ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhdCA9IHNsb3QuZGF0YXNldC5yb2xlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvbGVzW2NhdF0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbGxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgIFBSRVNFVFNcclxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbiAgICBjb25zdCBzYXZlUHJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1zYXZlLXByZXNldCcpO1xyXG4gICAgY29uc3QgcHJlc2V0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0TW9kYWwnKTtcclxuICAgIGNvbnN0IHByZXNldE5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXROYW1lJyk7XHJcbiAgICBjb25zdCBwcmVzZXRDb25maXJtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldENvbmZpcm0nKTtcclxuICAgIGNvbnN0IHByZXNldENhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRDYW5jZWwnKTtcclxuXHJcbiAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIGJvdXRvbiBzYXV2ZWdhcmRlciBzZWxvbiBsYSBzZWxlY3Rpb25cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNhdmVQcmVzZXRCdG4oKSB7XHJcbiAgICAgICAgaWYgKHNhdmVQcmVzZXRCdG4pIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW1Db21wbGV0ZSA9IHJvbGVzLlRhbmsgPT09IDEgJiYgcm9sZXMuRFBTID09PSAxICYmIHJvbGVzLlN1cHBvcnQgPT09IDE7XHJcbiAgICAgICAgICAgIHNhdmVQcmVzZXRCdG4uZGlzYWJsZWQgPSAhdGVhbUNvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyBBcHBlbGVyIHVwZGF0ZVNhdmVQcmVzZXRCdG4gYSBjaGFxdWUgY2hhbmdlbWVudCBkZSBzZWxlY3Rpb25cclxuICAgIGNvbnN0IG9yaWdpbmFsVXBkYXRlU2VsZWN0ZWRUZWFtID0gdXBkYXRlU2VsZWN0ZWRUZWFtO1xyXG4gICAgLy8gT24gc3VyY2hhcmdlIGVuIGFqb3V0YW50IGwnYXBwZWxcclxuICAgIGNvbnN0IF9vcmlnVXBkYXRlID0gdXBkYXRlU2VsZWN0ZWRUZWFtO1xyXG5cclxuICAgIC8vIFBhdGNoOiBham91dGVyIGwnYXBwZWwgYSB1cGRhdGVTYXZlUHJlc2V0QnRuIGRhbnMgdXBkYXRlU2VsZWN0ZWRUZWFtXHJcbiAgICAvLyBPbiBsZSBmYWl0IGVuIHdyYXBwYW50IGxlcyBpbmRpY2F0ZXVyc1xyXG4gICAgY29uc3QgX29yaWdSb2xlSW5kaWNhdG9ycyA9IHVwZGF0ZVJvbGVJbmRpY2F0b3JzO1xyXG5cclxuICAgIC8vIE91dnJpciBsYSBtb2RhbFxyXG4gICAgaWYgKHNhdmVQcmVzZXRCdG4gJiYgcHJlc2V0TW9kYWwpIHtcclxuICAgICAgICBzYXZlUHJlc2V0QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBwcmVzZXROYW1lSW5wdXQudmFsdWUgPSAnJztcclxuICAgICAgICAgICAgcHJlc2V0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBwcmVzZXROYW1lSW5wdXQuZm9jdXMoKSwgMTAwKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRmVybWVyIGxhIG1vZGFsXHJcbiAgICAgICAgcHJlc2V0Q2FuY2VsQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBwcmVzZXRNb2RhbC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LW1vZGFsX19iYWNrZHJvcCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBTYXV2ZWdhcmRlciBsZSBwcmVzZXRcclxuICAgICAgICBwcmVzZXRDb25maXJtQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gcHJlc2V0TmFtZUlucHV0LnZhbHVlLnRyaW0oKTtcclxuICAgICAgICAgICAgaWYgKCFuYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBwcmVzZXROYW1lSW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnI2RjMTQzYyc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLnRleHRDb250ZW50ID0gJy4uLic7XHJcblxyXG4gICAgICAgICAgICBmZXRjaCgnL3RlYW1zL3ByZXNldHMvc2F2ZScsIHtcclxuICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHtcclxuICAgICAgICAgICAgICAgICAgICBuYW1lOiBuYW1lLFxyXG4gICAgICAgICAgICAgICAgICAgIGNoYXJhY3Rlcklkczogc2VsZWN0ZWRIZXJvSWRzLm1hcChOdW1iZXIpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gUmVjaGFyZ2VyIGxhIHBhZ2UgcG91ciBhZmZpY2hlciBsZSBub3V2ZWF1IHByZXNldFxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoZGF0YS5lcnJvciB8fCAnRXJyZXVyIGxvcnMgZGUgbGEgc2F1dmVnYXJkZScpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLnRleHRDb250ZW50ID0gJ1NhdXZlZ2FyZGVyJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlJyk7XHJcbiAgICAgICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLnRleHRDb250ZW50ID0gJ1NhdXZlZ2FyZGVyJztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEVudGVyIHBvdXIgdmFsaWRlclxyXG4gICAgICAgIHByZXNldE5hbWVJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBwcmVzZXRDb25maXJtQnRuLmNsaWNrKCk7XHJcbiAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcnO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIENoYXJnZXIgdW4gcHJlc2V0IChzZWxlY3Rpb24gcHJvZ3JhbW1hdGlxdWUgZGVzIHBlcnNvbm5hZ2VzKVxyXG4gICAgZnVuY3Rpb24gbG9hZFByZXNldChjaGFyYWN0ZXJJZHMpIHtcclxuICAgICAgICAvLyBSZXNldCBsYSBzZWxlY3Rpb24gYWN0dWVsbGVcclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMgPSBbXTtcclxuICAgICAgICBzZWxlY3RlZEhlcm9lcyA9IFtdO1xyXG4gICAgICAgIHBvcnRyYWl0cy5mb3JFYWNoKHAgPT4gcC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpKTtcclxuXHJcbiAgICAgICAgLy8gU2VsZWN0aW9ubmVyIGxlcyBwZXJzb25uYWdlcyBkdSBwcmVzZXRcclxuICAgICAgICBjaGFyYWN0ZXJJZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGlkU3RyID0gU3RyaW5nKGlkKTtcclxuICAgICAgICAgICAgY29uc3QgcG9ydHJhaXQgPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwID0+IHAuZGF0YXNldC5pZCA9PT0gaWRTdHIpO1xyXG4gICAgICAgICAgICBpZiAocG9ydHJhaXQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcy5wdXNoKGlkU3RyKTtcclxuICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzLnB1c2gocG9ydHJhaXQuZGF0YXNldC5uYW1lKTtcclxuICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgdXBkYXRlU2VsZWN0ZWRUZWFtKCk7XHJcbiAgICAgICAgdXBkYXRlU2F2ZVByZXNldEJ0bigpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFN1cHByaW1lciB1biBwcmVzZXRcclxuICAgIGZ1bmN0aW9uIGRlbGV0ZVByZXNldChwcmVzZXRJZCwgY2hpcEVsKSB7XHJcbiAgICAgICAgaWYgKCFjb25maXJtKCdTdXBwcmltZXIgY2UgcHJlc2V0ID8nKSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBmZXRjaChgL3RlYW1zL3ByZXNldHMvJHtwcmVzZXRJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ0RFTEVURScsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgY2hpcEVsLnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgLy8gU2kgcGx1cyBkZSBwcmVzZXRzLCBjYWNoZXIgbGEgYmFycmVcclxuICAgICAgICAgICAgICAgIGNvbnN0IGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0cy1iYXJfX2xpc3QnKTtcclxuICAgICAgICAgICAgICAgIGlmIChsaXN0ICYmIGxpc3QuY2hpbGRyZW4ubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXNldHMtYmFyJyk/LnJlbW92ZSgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4gYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHN1cHByZXNzaW9uJykpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEF0dGFjaGVyIGxlcyBldmVudHMgYXV4IGNoaXBzIGRlIHByZXNldHNcclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5wcmVzZXQtY2hpcCcpLmZvckVhY2goY2hpcCA9PiB7XHJcbiAgICAgICAgY29uc3QgcHJlc2V0SWQgPSBjaGlwLmRhdGFzZXQucHJlc2V0SWQ7XHJcbiAgICAgICAgY29uc3QgY2hhcklkcyA9IEpTT04ucGFyc2UoY2hpcC5kYXRhc2V0LnByZXNldElkcyk7XHJcblxyXG4gICAgICAgIGNoaXAucXVlcnlTZWxlY3RvcignLnByZXNldC1jaGlwX19sb2FkJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGxvYWRQcmVzZXQoY2hhcklkcyk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGNoaXAucXVlcnlTZWxlY3RvcignLnByZXNldC1jaGlwX19kZWxldGUnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgIGRlbGV0ZVByZXNldChwcmVzZXRJZCwgY2hpcCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvLyBPYnNlcnZlciBsZXMgY2hhbmdlbWVudHMgZGUgc2VsZWN0aW9uIHBvdXIgbGUgYm91dG9uIHNhdmVcclxuICAgIC8vIE9uIHV0aWxpc2UgdW4gTXV0YXRpb25PYnNlcnZlciBzdXIgc2VsZWN0ZWRMaXN0XHJcbiAgICBjb25zdCBzZWxlY3RlZExpc3RPYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKCgpID0+IHVwZGF0ZVNhdmVQcmVzZXRCdG4oKSk7XHJcbiAgICBpZiAoc2VsZWN0ZWRMaXN0KSB7XHJcbiAgICAgICAgc2VsZWN0ZWRMaXN0T2JzZXJ2ZXIub2JzZXJ2ZShzZWxlY3RlZExpc3QsIHsgY2hpbGRMaXN0OiB0cnVlIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXVuY2hCdG4pIHtcclxuICAgICAgICBsYXVuY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRW52b2kgUE9TVCBBSkFYIHZlcnMgL3RlYW1zL3NlbGVjdFxyXG4gICAgICAgICAgICAgICAgZmV0Y2goJy90ZWFtcy9zZWxlY3QnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHNlbGVjdGVkSGVyb0lkcy5tYXAoKGlkLCBpKSA9PiBgY2hhcmFjdGVyX2lkc1ske2l9XT0ke2VuY29kZVVSSUNvbXBvbmVudChpZCl9YCkuam9pbignJicpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZWRpcmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzcG9uc2UudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlZGlyaWdlIG1hbnVlbGxlbWVudCBzaSBwYXMgZGUgcmVkaXJlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL21hdGNobWFraW5nJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc8OpbGVjdGlvbiBkZSBsXFwnw6lxdWlwZS4nKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgUFJPRklMRSBQT1BVUFxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS10b2dnbGVdJyk7XHJcbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtcG9wdXBdJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtYmFja2Ryb3BdJyk7XHJcbiAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtY2xvc2VdJyk7XHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jb250ZW50XScpO1xyXG5cclxuICAgIGlmICghdG9nZ2xlIHx8ICFwb3B1cCkgcmV0dXJuO1xyXG5cclxuICAgIGxldCBsb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuUG9wdXAoKSB7XHJcbiAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgcG9wdXAub2Zmc2V0SGVpZ2h0OyAvLyByZWZsb3dcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgaWYgKCFsb2FkZWQpIHtcclxuICAgICAgICAgICAgZmV0Y2hQcm9maWxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2ZpbGUtcG9wdXBfX2JhY2tkcm9wLS1vcGVuJyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuUG9wdXApO1xyXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZmV0Y2hQcm9maWxlKCkge1xyXG4gICAgICAgIGZldGNoKCcvYXBpL3Byb2ZpbGUnKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyUHJvZmlsZShkYXRhKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZXJyb3JcIj5FcnJldXIgZGUgY2hhcmdlbWVudDwvcD4nO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJQcm9maWxlKGRhdGEpIHtcclxuICAgICAgICBjb25zdCByZXN1bHRDbGFzcyA9IChyKSA9PiByID09PSAnd2luJyA/ICdyZXN1bHQtLXdpbicgOiByID09PSAnbG9zcycgPyAncmVzdWx0LS1sb3NzJyA6ICdyZXN1bHQtLWRyYXcnO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdExhYmVsID0gKHIpID0+IHIgPT09ICd3aW4nID8gJ1ZpY3RvaXJlJyA6IHIgPT09ICdsb3NzJyA/ICdEXFx1MDBlOWZhaXRlJyA6ICdOdWwnO1xyXG5cclxuICAgICAgICBjb25zdCBhdmF0YXJIdG1sID0gZGF0YS5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwoZGF0YS5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIkF2YXRhciBkZSAke2VzY2FwZUh0bWwoZGF0YS51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICA6IGA8aSBjbGFzcz1cImZhcyBmYS11c2VyLWNpcmNsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5gO1xyXG5cclxuICAgICAgICBsZXQgaHRtbCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2lkZW50aXR5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fYXZhdGFyXCI+JHthdmF0YXJIdG1sfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3VzZXJuYW1lXCI+JHtlc2NhcGVIdG1sKGRhdGEudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAke2RhdGEubW90dG8gPyBgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXBvcHVwX19tb3R0b1wiPlxcdTAwYWIgJHtlc2NhcGVIdG1sKGRhdGEubW90dG8pfSBcXHUwMGJiPC9zcGFuPmAgOiAnJ31cclxuICAgICAgICAgICAgICAgICAgICAke2RhdGEuYmlvID8gYDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fYmlvXCI+JHtlc2NhcGVIdG1sKGRhdGEuYmlvKX08L3A+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N0YXRzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX3ZhbHVlXCI+JHtlc2NhcGVIdG1sKFN0cmluZyhkYXRhLnJhdGluZykpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5NTVI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMud2lucykpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5WaWN0b2lyZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMubG9zc2VzKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPkRcXHUwMGU5ZmFpdGVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX3ZhbHVlXCI+JHtlc2NhcGVIdG1sKFN0cmluZyhkYXRhLnN0YXRzLndpblJhdGUpKX0lPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPldpbiBSYXRlPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmZhdm9yaXRlQ2hhcmFjdGVyKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zdGFyXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBDaGFtcGlvbiBGYXZvcmlcclxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChkYXRhLmZhdm9yaXRlQ2hhcmFjdGVyLm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19yb2xlXCI+JHtlc2NhcGVIdG1sKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIucm9sZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX2NvdW50XCI+JHtlc2NhcGVIdG1sKFN0cmluZyhkYXRhLmZhdm9yaXRlQ2hhcmFjdGVyLmdhbWVzUGxheWVkKSl9IHBhcnRpZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmxhc3RUZWFtLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXVzZXJzXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBEZXJuaVxcdTAwZThyZSBcXHUwMGM5cXVpcGVcclxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2RhdGEubGFzdFRlYW0ubWFwKGMgPT4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtX19tZW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtX19uYW1lXCI+JHtlc2NhcGVIdG1sKGMubmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX3JvbGVcIj4ke2VzY2FwZUh0bWwoYy5yb2xlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYCkuam9pbignJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLnJlY2VudEJhdHRsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtc2hpZWxkLWFsdFwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gSGlzdG9yaXF1ZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2RhdGEucmVjZW50QmF0dGxlcy5tYXAoYiA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2FyZW5hL3JlcGxheS8ke3BhcnNlSW50KGIuaWQsIDEwKX1cIiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fZW50cnkgJHtyZXN1bHRDbGFzcyhiLnJlc3VsdCl9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX3Jlc3VsdFwiPiR7cmVzdWx0TGFiZWwoYi5yZXN1bHQpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fb3Bwb25lbnRcIj52cyAke2VzY2FwZUh0bWwoYi5vcHBvbmVudCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X190eXBlXCI+JHtlc2NhcGVIdG1sKGIubWF0Y2hUeXBlKS50b1VwcGVyQ2FzZSgpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fZGF0ZVwiPiR7ZXNjYXBlSHRtbChiLmRhdGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wbGF5IHByb2ZpbGUtaGlzdG9yeV9fcmVwbGF5XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2VtcHR5XCI+QXVjdW4gY29tYmF0IGVucmVnaXN0clxcdTAwZTk8L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9wcm9maWxlXCIgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lZGl0LWxpbmtcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wZW5cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IFxcdTAwYzlkaXRlciBsZSBwcm9maWxcclxuICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBodG1sO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbiIsIi8qKlxyXG4gKiBDb21iYXQgQW5pbWF0aW9uIENvbnRyb2xsZXJcclxuICogR8OocmUgbCdhZmZpY2hhZ2UgcHJvZ3Jlc3NpZiBkZXMgbG9ncyBkZSBjb21iYXQgYXZlYyBhbmltYXRpb25zXHJcbiAqL1xyXG5jbGFzcyBDb21iYXRDb250cm9sbGVyIHtcclxuICAgIGNvbnN0cnVjdG9yKGNvbnRhaW5lcikge1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyID0gY29udGFpbmVyO1xyXG4gICAgICAgIHRoaXMubG9ncyA9IFtdO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4ID0gMDtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gMTtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlckVsZW1lbnRzID0ge307XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUCA9IHt9O1xyXG5cclxuICAgICAgICB0aGlzLmluaXQoKTtcclxuICAgIH1cclxuXHJcbiAgICBpbml0KCkge1xyXG4gICAgICAgIC8vIFLDqWN1cMOpcmVyIGxlcyBsb2dzIGRlcHVpcyBsJ2F0dHJpYnV0IGRhdGFcclxuICAgICAgICBjb25zdCBsb2dzRGF0YSA9IHRoaXMuY29udGFpbmVyLmRhdGFzZXQuY29tYmF0TG9ncztcclxuICAgICAgICBpZiAobG9nc0RhdGEpIHtcclxuICAgICAgICAgICAgdHJ5IHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9ncyA9IEpTT04ucGFyc2UobG9nc0RhdGEpO1xyXG4gICAgICAgICAgICB9IGNhdGNoIChlKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmVycm9yKCfinYwgRXJyZXVyIHBhcnNpbmcgbG9nczonLCBlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGVzIMOpbMOpbWVudHNcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1sb2ddJyk7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LW92ZXJsYXldJyk7XHJcbiAgICAgICAgdGhpcy5wbGF5QnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXBsYXldJyk7XHJcbiAgICAgICAgdGhpcy5za2lwQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXNraXBdJyk7XHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb21iYXQtc3BlZWRdJyk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgcGVyc29ubmFnZXMgYXZlYyBzdG9ja2FnZSBkZXMgSFAgbWF4IGluaXRpYXV4XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUCA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNoYXJhY3Rlci1uYW1lXScpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJOYW1lO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJUZWFtO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1trZXldID0gZWw7XHJcblxyXG4gICAgICAgICAgICAvLyBFeHRyYWlyZSBsZSBIUCBtYXggZGVwdWlzIGxlIHRleHRlIGluaXRpYWxcclxuICAgICAgICAgICAgY29uc3QgaHBUZXh0ID0gZWwucXVlcnlTZWxlY3RvcignLmhwLXRleHQnKTtcclxuICAgICAgICAgICAgaWYgKGhwVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBocFRleHQudGV4dENvbnRlbnQubWF0Y2goLyhcXGQrKVxcLyhcXGQrKS8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUFtrZXldID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENhY2hlciBsJ292ZXJsYXlcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZpZGVyIGxlIGxvZ1xyXG4gICAgICAgIGlmICh0aGlzLmxvZ0NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyBMYW5jZXIgYXV0b21hdGlxdWVtZW50IGFwcsOocyB1biBkw6lsYWlcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGxheSgpLCA4MDApO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheUJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZVBsYXkoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5za2lwQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2tpcCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuc2V0U3BlZWQoZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nICYmICF0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTmV4dExvZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVBsYXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZyB8fCB0aGlzLmlzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2tpcCgpIHtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gQWZmaWNoZXIgdG91cyBsZXMgbG9ncyByZXN0YW50c1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9nID0gdGhpcy5sb2dzW3RoaXMuY3VycmVudEluZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TG9nKGxvZyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdkZWF0aCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zaG93VmljdG9yeU92ZXJsYXkoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTcGVlZChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHNwZWVkID0gcGFyc2VGbG9hdChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY29tYmF0U3BlZWQpO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbCdVSVxyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zLmZvckVhY2goYnRuID0+IGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTmV4dExvZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nIHx8IHRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmljdG9yeU92ZXJsYXkoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZyA9IHRoaXMubG9nc1t0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTG9nKGxvZyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsZXIgbGUgZMOpbGFpXHJcbiAgICAgICAgbGV0IGRlbGF5ID0gdGhpcy5nZXREZWxheUZvckxvZyhsb2cpO1xyXG4gICAgICAgIGRlbGF5ID0gZGVsYXkgLyB0aGlzLnNwZWVkO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvY2Vzc05leHRMb2coKSwgZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlbGF5Rm9yTG9nKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncm91bmQnOiByZXR1cm4gMjAwMDsgICAgICAgICAvLyAyIHNlY29uZGVzIHBvdXIgbGVzIHJvdW5kc1xyXG4gICAgICAgICAgICBjYXNlICdpbml0aWF0aXZlJzogcmV0dXJuIDQwMDsgICAgIC8vIDAuNCBzZWNvbmRlcyBwb3VyIGwnaW5pdGlhdGl2ZVxyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOiByZXR1cm4gMjAwMDsgICAgICAgIC8vIDIgc2Vjb25kZXMgcG91ciBsZXMgYXR0YXF1ZXNcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6IHJldHVybiAxODAwOyAgICAgICAgICAvLyAxLjggc2Vjb25kZXMgcG91ciBsZXMgc29pbnNcclxuICAgICAgICAgICAgY2FzZSAnZGVmZW5kJzogcmV0dXJuIDE1MDA7ICAgICAgICAvLyAxLjUgc2Vjb25kZXMgcG91ciBsYSBkw6lmZW5zZVxyXG4gICAgICAgICAgICBjYXNlICdkb2RnZSc6IHJldHVybiAxMjAwOyAgICAgICAgIC8vIDEuMiBzZWNvbmRlcyBwb3VyIGwnZXNxdWl2ZVxyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6IHJldHVybiAyNTAwOyAgICAgICAgIC8vIDIuNSBzZWNvbmRlcyBwb3VyIGxhIG1vcnRcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdCc6IHJldHVybiAxNTAwOyAgICAgICAvLyAxLjUgc2Vjb25kZXMgcG91ciBsYSBwcm90ZWN0aW9uXHJcbiAgICAgICAgICAgIGNhc2UgJ3ZpY3RvcnknOlxyXG4gICAgICAgICAgICBjYXNlICdkcmF3JzogcmV0dXJuIDEwMDA7ICAgICAgICAgIC8vIDEgc2Vjb25kZSBwb3VyIGxhIHZpY3RvaXJlXHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiA4MDA7ICAgICAgICAgICAgICAgLy8gMC44IHNlY29uZGVzIHBhciBkw6lmYXV0XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NMb2cobG9nKSB7XHJcbiAgICAgICAgdGhpcy5wbGF5QW5pbWF0aW9uKGxvZyk7XHJcbiAgICAgICAgdGhpcy5kaXNwbGF5TG9nKGxvZyk7XHJcblxyXG4gICAgICAgIC8vIFN5bmNocm9uaXNlciBsYSBtaXNlIMOgIGpvdXIgZGVzIEhQIGF2ZWMgbCdhbmltYXRpb25cclxuICAgICAgICAvLyBMZXMgYmFycmVzIHNlIG1ldHRlbnQgw6Agam91ciBxdWFuZCBsZSBwZXJzb25uYWdlIFwicHJlbmQgbGUgY291cFwiXHJcbiAgICAgICAgY29uc3QgaHBEZWxheSA9IHRoaXMuZ2V0SFBVcGRhdGVEZWxheShsb2cpO1xyXG4gICAgICAgIGlmIChocERlbGF5ID4gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpLCBocERlbGF5IC8gdGhpcy5zcGVlZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEhQVXBkYXRlRGVsYXkobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOiByZXR1cm4gMzUwOyAgIC8vIEFwcsOocyBxdWUgbCdhdHRhcXVlIHRvdWNoZSAoMzAwbXMgYXR0YXF1ZSArIDUwbXMpXHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOiByZXR1cm4gNDAwOyAgICAgLy8gUGVuZGFudCBsJ2FuaW1hdGlvbiBkZSBzb2luXHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzogcmV0dXJuIDA7ICAgICAgLy8gSW1tw6lkaWF0XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QW5pbWF0aW9uKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuYXR0YWNrZXIsIGxvZy5hdHRhY2tlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cuaXNDcml0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmhlYWxlciwgbG9nLmhlYWxlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVmZW5kKGxvZy5kZWZlbmRlciwgbG9nLmRlZmVuZGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9kZ2UobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlQXR0YWNrKGF0dGFja2VyTmFtZSwgYXR0YWNrZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtLCBpc0NyaXQpIHtcclxuICAgICAgICBjb25zdCBhdHRhY2tlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChhdHRhY2tlck5hbWUsIGF0dGFja2VyVGVhbSk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG5cclxuICAgICAgICBpZiAoYXR0YWNrZXIpIHtcclxuICAgICAgICAgICAgYXR0YWNrZXIuY2xhc3NMaXN0LmFkZCgnYXR0YWNraW5nJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gYXR0YWNrZXIuY2xhc3NMaXN0LnJlbW92ZSgnYXR0YWNraW5nJyksIDYwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2h1cnQnKTtcclxuICAgICAgICAgICAgICAgIGlmIChpc0NyaXQpIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdjcml0Jyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdodXJ0JywgJ2NyaXQnKSwgNDAwKTtcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZUhlYWwoaGVhbGVyTmFtZSwgaGVhbGVyVGVhbSwgdGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IGhlYWxlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChoZWFsZXJOYW1lLCBoZWFsZXJUZWFtKTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcblxyXG4gICAgICAgIGlmIChoZWFsZXIpIHtcclxuICAgICAgICAgICAgaGVhbGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWxpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBoZWFsZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGVhbGluZycpLCA4MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaGVhbGVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxlZCcpLCA4MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRGVmZW5kKGRlZmVuZGVyTmFtZSwgZGVmZW5kZXJUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgZGVmZW5kZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoZGVmZW5kZXJOYW1lLCBkZWZlbmRlclRlYW0pO1xyXG4gICAgICAgIGlmIChkZWZlbmRlcikge1xyXG4gICAgICAgICAgICBkZWZlbmRlci5jbGFzc0xpc3QuYWRkKCdkZWZlbmRpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBkZWZlbmRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWZlbmRpbmcnKSwgMTAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEb2RnZSh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RvZGdpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZG9kZ2luZycpLCA2MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRGVhdGgodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdkZWFkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldENoYXJhY3RlckVsZW1lbnQobmFtZSwgdGVhbSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2Ake3RlYW19LSR7bmFtZX1gXTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5TG9nKGxvZykge1xyXG4gICAgICAgIGlmICghdGhpcy5sb2dDb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgZW50cnkuY2xhc3NOYW1lID0gJ2NvbWJhdC1sb2dfX2VudHJ5JztcclxuXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAncm91bmQnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1yb3VuZCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICd2aWN0b3J5Jykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tdmljdG9yeScpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdkcmF3Jykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tZGVmZWF0Jyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbnRyeS5pbm5lckhUTUwgPSBsb2cubWVzc2FnZTtcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsVG9wID0gdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUhlYWx0aEJhcnMobG9nKSB7XHJcbiAgICAgICAgbGV0IGNoYXJhY3Rlck5hbWUgPSBudWxsO1xyXG4gICAgICAgIGxldCB0ZWFtTmFtZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRIUCA9IG51bGw7XHJcbiAgICAgICAgbGV0IG1heEhQID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gRMOpdGVybWluZXIgbGVzIGRvbm7DqWVzIHNlbG9uIGxlIHR5cGUgZGUgbG9nXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAnYXR0YWNrJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnaGVhbCcpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBzaSBub3VzIGF2b25zIGxlcyBkb25uw6llcyBuw6ljZXNzYWlyZXNcclxuICAgICAgICBpZiAoY2hhcmFjdGVyTmFtZSAmJiB0ZWFtTmFtZSAmJiBjdXJyZW50SFAgIT09IG51bGwgJiYgY3VycmVudEhQICE9PSB1bmRlZmluZWQgJiYgbWF4SFApIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCBtYXhIUCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYXJhY3RlckhQKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsIG1heEhQKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign4p2MIENoYXJhY3RlciBlbGVtZW50IG5vdCBmb3VuZCBmb3I6JywgY2hhcmFjdGVyTmFtZSwgJ2luIHRlYW06JywgdGVhbU5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwZXJjZW50ID0gbWF4SFAgPiAwID8gKGN1cnJlbnRIUCAvIG1heEhQKSAqIDEwMCA6IDA7XHJcblxyXG4gICAgICAgIC8vIE1pc2Ugw6Agam91ciBkZSBsYSBiYXJyZSBIUCBkYW5zIGxhIHpvbmUgZGUgY29tYmF0IChiYXR0bGUtc3RhZ2UpXHJcbiAgICAgICAgY29uc3QgaHBCYXIgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmhwLWJhcl9fZmlsbCcpO1xyXG4gICAgICAgIGNvbnN0IGhwVGV4dCA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuaHAtdGV4dCcpO1xyXG5cclxuICAgICAgICBpZiAoaHBCYXIpIHtcclxuICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGZsdWlkZSBkZSBsYSBiYXJyZVxyXG4gICAgICAgICAgICBocEJhci5zdHlsZS50cmFuc2l0aW9uID0gYHdpZHRoIDAuM3MgZWFzZS1vdXRgO1xyXG4gICAgICAgICAgICBocEJhci5zdHlsZS53aWR0aCA9IGAke3BlcmNlbnR9JWA7XHJcblxyXG4gICAgICAgICAgICAvLyBDbGFzc2VzIGRlIGNvdWxldXIgc2Vsb24gbGUgcG91cmNlbnRhZ2VcclxuICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LnJlbW92ZSgnaHAtYmFyX19maWxsLS1sb3cnLCAnaHAtYmFyX19maWxsLS1jcml0aWNhbCcpO1xyXG4gICAgICAgICAgICBpZiAocGVyY2VudCA8PSAyNSkge1xyXG4gICAgICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LmFkZCgnaHAtYmFyX19maWxsLS1jcml0aWNhbCcpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBlcmNlbnQgPD0gNTApIHtcclxuICAgICAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5hZGQoJ2hwLWJhcl9fZmlsbC0tbG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChocFRleHQpIHtcclxuICAgICAgICAgICAgaHBUZXh0LnRleHRDb250ZW50ID0gYCR7Y3VycmVudEhQfS8ke21heEhQfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNaXNlIMOgIGpvdXIgZGVzIHBhbm5lYXV4IGQnaW5mbyBsYXTDqXJhdXhcclxuICAgICAgICB0aGlzLnVwZGF0ZUluZm9QYW5lbChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVJbmZvUGFuZWwoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCkge1xyXG4gICAgICAgIC8vIFRyb3V2ZXIgbGUgYm9uIHBhbm5lYXUgc2Vsb24gbCfDqXF1aXBlXHJcbiAgICAgICAgY29uc3QgcGFuZWxDbGFzcyA9IHRlYW1OYW1lID09PSAnRXF1aXBlIDEnID8gJy5pbmZvLXBhbmVsLS10ZWFtMScgOiAnLmluZm8tcGFuZWwtLXRlYW0yJztcclxuICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IocGFuZWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGlmICghcGFuZWwpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gVHJvdXZlciBsZSBwZXJzb25uYWdlIGRhbnMgbGUgcGFubmVhdSBwYXIgc29uIG5vbVxyXG4gICAgICAgIGNvbnN0IGNoYXJhY3RlckluZm9zID0gcGFuZWwucXVlcnlTZWxlY3RvckFsbCgnLmNoYXJhY3Rlci1pbmZvJyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBpbmZvIG9mIGNoYXJhY3RlckluZm9zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWVFbCA9IGluZm8ucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19uYW1lJyk7XHJcbiAgICAgICAgICAgIGlmIChuYW1lRWwgJiYgbmFtZUVsLnRleHRDb250ZW50LnRyaW0oKSA9PT0gY2hhcmFjdGVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHNTcGFuID0gaW5mby5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX3N0YXRzIHNwYW4nKTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0c1NwYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0c1NwYW4udGV4dENvbnRlbnQgPSBjdXJyZW50SFA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuaW1hdGlvbiBmbGFzaCBwb3VyIG1vbnRyZXIgbGUgY2hhbmdlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzU3Bhbi5jbGFzc0xpc3QuYWRkKCdocC11cGRhdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzdGF0c1NwYW4uY2xhc3NMaXN0LnJlbW92ZSgnaHAtdXBkYXRlZCcpLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ZpY3RvcnlPdmVybGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZpbmFsaXNlciBsZSBNTVIgYSBsYSBmaW4gZHUgY29tYmF0XHJcbiAgICAgICAgdGhpcy5maW5hbGl6ZVJhdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmFsaXplUmF0aW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGZpbmFsaXplVXJsID0gdGhpcy5jb250YWluZXIuZGF0YXNldC5maW5hbGl6ZVVybDtcclxuICAgICAgICBpZiAoIWZpbmFsaXplVXJsKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGZpbmFsaXplVXJsLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgJiYgZGF0YS5yYXRpbmdDaGFuZ2UgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JhdGluZ1VwZGF0ZShkYXRhLnJhdGluZ0NoYW5nZSwgZGF0YS5uZXdSYXRpbmcsIGRhdGEubmV3UmF0aW5nMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcignRXJyZXVyIGZpbmFsaXNhdGlvbiByYXRpbmc6JywgZXJyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1JhdGluZ1VwZGF0ZShjaGFuZ2UsIG5ld1JhdGluZywgbmV3UmF0aW5nMikge1xyXG4gICAgICAgIC8vIE1ldHRyZSBhIGpvdXIgbGUgTU1SIGFmZmljaGUgZGFucyBsZSBwYW5uZWF1IGpvdWV1ciAoRXF1aXBlIDEpXHJcbiAgICAgICAgY29uc3QgcmF0aW5nRWwgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW5mby1wYW5lbC0tdGVhbTEgLmluZm8tcGFuZWxfX3JhdGluZycpO1xyXG4gICAgICAgIGlmIChyYXRpbmdFbCAmJiBuZXdSYXRpbmcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmF0aW5nRWwuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHtuZXdSYXRpbmd9IE1NUmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIE1NUiBhZmZpY2hlIGRhbnMgbGUgcGFubmVhdSBhZHZlcnNhaXJlIChFcXVpcGUgMilcclxuICAgICAgICBjb25zdCByYXRpbmdFbDIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW5mby1wYW5lbC0tdGVhbTIgLmluZm8tcGFuZWxfX3JhdGluZy0tZW5lbXknKTtcclxuICAgICAgICBpZiAocmF0aW5nRWwyICYmIG5ld1JhdGluZzIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmF0aW5nRWwyLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7bmV3UmF0aW5nMn0gTU1SYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFmZmljaGVyIGxhIG5vdGlmaWNhdGlvbiBkZSBjaGFuZ2VtZW50IGRhbnMgbCdvdmVybGF5XHJcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1vdmVybGF5XScpO1xyXG4gICAgICAgIGlmIChvdmVybGF5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdpbm5lckRpdiA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignLmJhdHRsZS1zdGFnZV9fd2lubmVyJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGFuZ2VtZW50IE1NUiBFcXVpcGUgMVxyXG4gICAgICAgICAgICBjb25zdCBub3RpZjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbm90aWYxLmNsYXNzTmFtZSA9ICdyYXRpbmctY2hhbmdlJztcclxuICAgICAgICAgICAgbm90aWYxLnN0eWxlLmNzc1RleHQgPSAnZm9udC1zaXplOjEuMnJlbTttYXJnaW4tdG9wOjEycHg7Zm9udC13ZWlnaHQ6Ym9sZDtvcGFjaXR5OjA7dHJhbnNpdGlvbjpvcGFjaXR5IDAuNXM7JztcclxuICAgICAgICAgICAgbm90aWYxLnRleHRDb250ZW50ID0gY2hhbmdlID4gMCA/IGBFcXVpcGUgMSA6ICske2NoYW5nZX0gTU1SYCA6IGBFcXVpcGUgMSA6ICR7Y2hhbmdlfSBNTVJgO1xyXG4gICAgICAgICAgICBub3RpZjEuc3R5bGUuY29sb3IgPSBjaGFuZ2UgPiAwID8gJyM0Y2FmNTAnIDogJyNmNDQzMzYnO1xyXG4gICAgICAgICAgICB3aW5uZXJEaXYuYXBwZW5kQ2hpbGQobm90aWYxKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoYW5nZW1lbnQgTU1SIEVxdWlwZSAyIChpbnZlcnNlKVxyXG4gICAgICAgICAgICBjb25zdCBjaGFuZ2UyID0gLWNoYW5nZTtcclxuICAgICAgICAgICAgY29uc3Qgbm90aWYyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG5vdGlmMi5jbGFzc05hbWUgPSAncmF0aW5nLWNoYW5nZSc7XHJcbiAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZToxLjJyZW07bWFyZ2luLXRvcDo2cHg7Zm9udC13ZWlnaHQ6Ym9sZDtvcGFjaXR5OjA7dHJhbnNpdGlvbjpvcGFjaXR5IDAuNXM7JztcclxuICAgICAgICAgICAgbm90aWYyLnRleHRDb250ZW50ID0gY2hhbmdlMiA+IDAgPyBgRXF1aXBlIDIgOiArJHtjaGFuZ2UyfSBNTVJgIDogYEVxdWlwZSAyIDogJHtjaGFuZ2UyfSBNTVJgO1xyXG4gICAgICAgICAgICBub3RpZjIuc3R5bGUuY29sb3IgPSBjaGFuZ2UyID4gMCA/ICcjNGNhZjUwJyA6ICcjZjQ0MzM2JztcclxuICAgICAgICAgICAgd2lubmVyRGl2LmFwcGVuZENoaWxkKG5vdGlmMik7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgbm90aWYyLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVBsYXlCdXR0b24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBsYXlCdG4pIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nICYmICF0aGlzLmlzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9ICdQYXVzZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9ICdUZXJtaW7DqSc7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gdGhpcy5jdXJyZW50SW5kZXggPiAwID8gJ1JlcHJlbmRyZScgOiAnTGFuY2VyJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEluaXRpYWxpc2VyIHF1YW5kIGxlIERPTSBlc3QgcHLDqnRcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IGNvbWJhdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1sb2dzXScpO1xyXG4gICAgaWYgKGNvbWJhdENvbnRhaW5lcikge1xyXG4gICAgICAgIG5ldyBDb21iYXRDb250cm9sbGVyKGNvbWJhdENvbnRhaW5lcik7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tYmF0Q29udHJvbGxlcjtcclxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgRlJJRU5EIFNZU1RFTVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LnRleHRDb250ZW50ID0gc3RyO1xyXG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1wYW5lbF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGJhZGdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1iYWRnZV0nKTtcclxuXHJcbiAgICBpZiAoIXRvZ2dsZSB8fCAhcGFuZWwpIHJldHVybjtcclxuXHJcbiAgICBsZXQgcGFuZWxPcGVuID0gZmFsc2U7XHJcbiAgICBsZXQgY3VycmVudFRhYiA9ICdmcmllbmRzJztcclxuICAgIGxldCBjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkID0gbnVsbDtcclxuICAgIGxldCBsYXN0TWVzc2FnZUlkID0gMDtcclxuICAgIGxldCBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgIGxldCB1bnJlYWRQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgbGV0IGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgIGxldCByZXF1ZXN0c0xvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gUEFORUwgT1BFTi9DTE9TRVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBvcGVuUGFuZWwoKSB7XHJcbiAgICAgICAgcGFuZWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwYW5lbC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBhbmVsLmNsYXNzTGlzdC5hZGQoJ2ZyaWVuZHMtcGFuZWwtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdmcmllbmRzLXBhbmVsX19iYWNrZHJvcC0tb3BlbicpO1xyXG4gICAgICAgIHBhbmVsT3BlbiA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICghZnJpZW5kc0xvYWRlZCkge1xyXG4gICAgICAgICAgICBsb2FkRnJpZW5kcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBhbmVsKCkge1xyXG4gICAgICAgIHBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZyaWVuZHMtcGFuZWwtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdmcmllbmRzLXBhbmVsX19iYWNrZHJvcC0tb3BlbicpO1xyXG4gICAgICAgIHBhbmVsT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBwYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcGFuZWxPcGVuID8gY2xvc2VQYW5lbCgpIDogb3BlblBhbmVsKCkpO1xyXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBhbmVsKTtcclxuICAgIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQYW5lbCk7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBUQUJTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZyaWVuZHMtdGFiXScpLmZvckVhY2godGFiQnRuID0+IHtcclxuICAgICAgICB0YWJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhYk5hbWUgPSB0YWJCdG4uZGF0YXNldC5mcmllbmRzVGFiO1xyXG4gICAgICAgICAgICBzd2l0Y2hUYWIodGFiTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzd2l0Y2hUYWIodGFiTmFtZSkge1xyXG4gICAgICAgIGN1cnJlbnRUYWIgPSB0YWJOYW1lO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mcmllbmRzLXRhYl0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdmcmllbmRzLXBhbmVsX190YWItLWFjdGl2ZScsIGJ0bi5kYXRhc2V0LmZyaWVuZHNUYWIgPT09IHRhYk5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWItY29udGVudF0nKS5mb3JFYWNoKGNvbnRlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBjb250ZW50LmRhdGFzZXQudGFiQ29udGVudCA9PT0gdGFiTmFtZSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX190YWJzJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fY29udGVudCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtY29udmVyc2F0aW9uXScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICh0YWJOYW1lID09PSAnZnJpZW5kcycgJiYgIWZyaWVuZHNMb2FkZWQpIGxvYWRGcmllbmRzKCk7XHJcbiAgICAgICAgaWYgKHRhYk5hbWUgPT09ICdyZXF1ZXN0cycgJiYgIXJlcXVlc3RzTG9hZGVkKSBsb2FkUmVxdWVzdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIExPQUQgRlJJRU5EUyBMSVNUXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGxvYWRGcmllbmRzKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRhYi1jb250ZW50PVwiZnJpZW5kc1wiXScpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+IENoYXJnZW1lbnQuLi48L2Rpdj4nO1xyXG5cclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvbGlzdCcsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5mcmllbmRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+PGkgY2xhc3M9XCJmYXMgZmEtZ2hvc3RcIj48L2k+IEF1Y3VuIGNvbXBhZ25vbi4uLiBMZSBkb25qb24gZXN0IHNvbGl0YWlyZS48L3A+JztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGRhdGEuZnJpZW5kcy5tYXAoZiA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIiBkYXRhLWZyaWVuZC11c2VyLWlkPVwiJHtmLnVzZXJJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2YucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChmLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKGYudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChmLnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3ByZXZpZXdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7Zi5sYXN0TWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKGYubGFzdE1lc3NhZ2UuaXNGcm9tTWUgPyAnVm91czogJyA6ICcnKSArIGVzY2FwZUh0bWwoZi5sYXN0TWVzc2FnZS5jb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ0F1Y3VuIG1lc3NhZ2UnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcmF0aW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke2YucmF0aW5nfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuZnJpZW5kLWl0ZW0nKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VySWQgPSBwYXJzZUludChpdGVtLmRhdGFzZXQuZnJpZW5kVXNlcklkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kLWl0ZW1fX25hbWUnKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuQ29udmVyc2F0aW9uKHVzZXJJZCwgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5FcnJldXIgZGUgY2hhcmdlbWVudDwvcD4nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTE9BRCBQRU5ESU5HIFJFUVVFU1RTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGxvYWRSZXF1ZXN0cygpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YWItY29udGVudD1cInJlcXVlc3RzXCJdJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gQ2hhcmdlbWVudC4uLjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy9wZW5kaW5nJywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgcmVxdWVzdHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXF1ZXN0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkF1Y3VuZSBkZW1hbmRlIGVuIGF0dGVudGU8L3A+JztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGRhdGEucmVxdWVzdHMubWFwKHIgPT4gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCIgZGF0YS1yZXF1ZXN0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke3IucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChyLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKHIudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChyLnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3ByZXZpZXdcIj4ke2VzY2FwZUh0bWwoci5kYXRlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLWFjY2VwdFwiIGRhdGEtYWNjZXB0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcmVqZWN0XCIgZGF0YS1yZWplY3QtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXNcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjY2VwdC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVxdWVzdChidG4uZGF0YXNldC5hY2NlcHRJZCwgJ2FjY2VwdCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJlamVjdC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVxdWVzdChidG4uZGF0YXNldC5yZWplY3RJZCwgJ3JlamVjdCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RXJyZXVyIGRlIGNoYXJnZW1lbnQ8L3A+JztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0KGZyaWVuZHNoaXBJZCwgYWN0aW9uKSB7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzLyR7YWN0aW9ufS8ke2ZyaWVuZHNoaXBJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxvYWRSZXF1ZXN0cygpO1xyXG4gICAgICAgICAgICAgICAgZmV0Y2hVbnJlYWRDb3VudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBTRUFSQ0ggVVNFUlNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXNlYXJjaC1pbnB1dF0nKTtcclxuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXNlYXJjaC1yZXN1bHRzXScpO1xyXG4gICAgbGV0IHNlYXJjaFRpbWVvdXQgPSBudWxsO1xyXG5cclxuICAgIGlmIChzZWFyY2hJbnB1dCkge1xyXG4gICAgICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc2VhcmNoVGltZW91dCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gc2VhcmNoSW5wdXQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZldGNoKGAvZnJpZW5kcy9zZWFyY2g/cT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeSl9YCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnVzZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+QXVjdW4gZ3VlcnJpZXIgdHJvdXZlPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gZGF0YS51c2Vycy5tYXAodSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpb25IdG1sID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ2FjY2VwdGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPkFtaTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAncGVuZGluZ19zZW50Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPkVudm95ZWU8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ3BlbmRpbmdfcmVjZWl2ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+UmVjdWU8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSBgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tYWRkXCIgZGF0YS1hZGQtZnJpZW5kLWlkPVwiJHt1LnVzZXJJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wbHVzXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dS5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKHUucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwodS51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKHUudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcmF0aW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke3UucmF0aW5nfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2FjdGlvbnNcIj4ke2FjdGlvbkh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hZGQtZnJpZW5kLWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kRnJpZW5kUmVxdWVzdChidG4uZGF0YXNldC5hZGRGcmllbmRJZCwgYnRuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kRnJpZW5kUmVxdWVzdCh1c2VySWQsIGJ0bikge1xyXG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL3JlcXVlc3QvJHt1c2VySWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5vdXRlckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5FbnZveWVlPC9zcGFuPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgYnRuLmRpc2FibGVkID0gZmFsc2U7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlcG9ydE1lc3NhZ2VBY3Rpb24obWVzc2FnZUlkLCBidG4pIHtcclxuICAgICAgICBjb25zdCByZWFzb24gPSBwcm9tcHQoJ1JhaXNvbiBkdSBzaWduYWxlbWVudCA6Jyk7XHJcbiAgICAgICAgaWYgKHJlYXNvbiA9PT0gbnVsbCkgcmV0dXJuOyAvLyBjYW5jZWxsZWRcclxuXHJcbiAgICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHttZXNzYWdlSWR9L3JlcG9ydGAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWFzb246IHJlYXNvbiB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2tcIj48L2k+JztcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdjaGF0LW1lc3NhZ2VfX3JlcG9ydC0tZG9uZScpO1xyXG4gICAgICAgICAgICAgICAgYnRuLnRpdGxlID0gJ1NpZ25hbGUnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IGJ0bi5kaXNhYmxlZCA9IGZhbHNlOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIENPTlZFUlNBVElPTlxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBvcGVuQ29udmVyc2F0aW9uKHVzZXJJZCwgdXNlcm5hbWUpIHtcclxuICAgICAgICBjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkID0gdXNlcklkO1xyXG4gICAgICAgIGxhc3RNZXNzYWdlSWQgPSAwO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fdGFicycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX2NvbnRlbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGNvbnN0IGNvbnZFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtY29udmVyc2F0aW9uXScpO1xyXG4gICAgICAgIGNvbnZFbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tbmFtZV0nKS50ZXh0Q29udGVudCA9IHVzZXJuYW1lO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tbWVzc2FnZXNdJyk7XHJcbiAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+IENoYXJnZW1lbnQuLi48L2Rpdj4nO1xyXG5cclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHt1c2VySWR9YCwge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgcmVuZGVyTWVzc2FnZXMoZGF0YS5tZXNzYWdlcywgZmFsc2UpO1xyXG4gICAgICAgICAgICBzdGFydE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyTWVzc2FnZXMobWVzc2FnZXMsIGFwcGVuZCkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tbWVzc2FnZXNdJyk7XHJcblxyXG4gICAgICAgIGlmICghYXBwZW5kKSB7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzRWwuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5EZWJ1dCBkZSBsYSBjb252ZXJzYXRpb24uIEVudm95ZXogbGUgcHJlbWllciBtZXNzYWdlITwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2kgb24gYWpvdXRlIGRlcyBtZXNzYWdlcyBldCBxdWUgbGUgY29udGVuZXVyIGFmZmljaGUgbGUgcGxhY2Vob2xkZXIsIGxlIHN1cHByaW1lclxyXG4gICAgICAgIGlmIChhcHBlbmQgJiYgbWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IG1lc3NhZ2VzRWwucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlcikgcGxhY2Vob2xkZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG1zZyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuaWQgPiBsYXN0TWVzc2FnZUlkKSBsYXN0TWVzc2FnZUlkID0gbXNnLmlkO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjaGF0LW1lc3NhZ2UnLCBtc2cuaXNGcm9tTWUgPyAnY2hhdC1tZXNzYWdlLS1taW5lJyA6ICdjaGF0LW1lc3NhZ2UtLXRoZWlycycpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcG9ydEJ0biA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoIW1zZy5pc0Zyb21NZSkge1xyXG4gICAgICAgICAgICAgICAgcmVwb3J0QnRuID0gYDxidXR0b24gY2xhc3M9XCJjaGF0LW1lc3NhZ2VfX3JlcG9ydFwiIGRhdGEtcmVwb3J0LW1zZy1pZD1cIiR7bXNnLmlkfVwiIHRpdGxlPVwiU2lnbmFsZXIgY2UgbWVzc2FnZVwiPjxpIGNsYXNzPVwiZmFzIGZhLWZsYWdcIj48L2k+PC9idXR0b24+YDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgICR7ZXNjYXBlSHRtbChtc2cuY29udGVudCl9XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoYXQtbWVzc2FnZV9fdGltZVwiPiR7ZXNjYXBlSHRtbChtc2cuZGF0ZSl9ICR7cmVwb3J0QnRufTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgIC8vIEF0dGFjaCByZXBvcnQgaGFuZGxlclxyXG4gICAgICAgICAgICBjb25zdCByZXBvcnRFbCA9IGRpdi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXBvcnQtbXNnLWlkXScpO1xyXG4gICAgICAgICAgICBpZiAocmVwb3J0RWwpIHtcclxuICAgICAgICAgICAgICAgIHJlcG9ydEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydE1lc3NhZ2VBY3Rpb24ocmVwb3J0RWwuZGF0YXNldC5yZXBvcnRNc2dJZCwgcmVwb3J0RWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzRWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbWVzc2FnZXNFbC5zY3JvbGxUb3AgPSBtZXNzYWdlc0VsLnNjcm9sbEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZW5kIG1lc3NhZ2VcclxuICAgIGNvbnN0IHNlbmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tc2VuZF0nKTtcclxuICAgIGNvbnN0IGlucHV0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24taW5wdXRdJyk7XHJcblxyXG4gICAgaWYgKHNlbmRCdG4gJiYgaW5wdXRFbCkge1xyXG4gICAgICAgIHNlbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZW5kTWVzc2FnZSk7XHJcbiAgICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBzZW5kTWVzc2FnZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBpbnB1dEVsLnZhbHVlLnRyaW0oKTtcclxuICAgICAgICBpZiAoIWNvbnRlbnQgfHwgIWN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaW5wdXRFbC52YWx1ZSA9ICcnO1xyXG5cclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHtjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjb250ZW50OiBjb250ZW50IH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyAmJiBkYXRhLm1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKFtkYXRhLm1lc3NhZ2VdLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJhY2sgYnV0dG9uXHJcbiAgICBjb25zdCBiYWNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLWJhY2tdJyk7XHJcbiAgICBpZiAoYmFja0J0bikge1xyXG4gICAgICAgIGJhY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSBudWxsO1xyXG4gICAgICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzd2l0Y2hUYWIoJ2ZyaWVuZHMnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIE1FU1NBR0UgUE9MTElORyAoZXZlcnkgNXMgd2hlbiBjb252ZXJzYXRpb24gb3BlbilcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gc3RhcnRNZXNzYWdlUG9sbGluZygpIHtcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke2N1cnJlbnRDb252ZXJzYXRpb25Vc2VySWR9P2FmdGVySWQ9JHtsYXN0TWVzc2FnZUlkfWAsIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubWVzc2FnZXMgJiYgZGF0YS5tZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTWVzc2FnZXMoZGF0YS5tZXNzYWdlcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDUwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3BNZXNzYWdlUG9sbGluZygpIHtcclxuICAgICAgICBpZiAobWVzc2FnZVBvbGxpbmdJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBVTlJFQUQgQ09VTlQgUE9MTElORyAoZXZlcnkgMzBzLCBhbHdheXMgYWN0aXZlKVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBmZXRjaFVucmVhZENvdW50KCkge1xyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy91bnJlYWQtY291bnQnLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS50b3RhbCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnRleHRDb250ZW50ID0gZGF0YS50b3RhbDtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RzQmFkZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXF1ZXN0cy1iYWRnZV0nKTtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3RzQmFkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnBlbmRpbmdSZXF1ZXN0cyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnRleHRDb250ZW50ID0gZGF0YS5wZW5kaW5nUmVxdWVzdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHt9KTtcclxuICAgIH1cclxuXHJcbiAgICBmZXRjaFVucmVhZENvdW50KCk7XHJcbiAgICB1bnJlYWRQb2xsaW5nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmZXRjaFVucmVhZENvdW50LCAzMDAwMCk7XHJcbn0pO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiZXNjYXBlSHRtbCIsInN0ciIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY3JlYXRlVGV4dE5vZGUiLCJpbm5lckhUTUwiLCJhZGRFdmVudExpc3RlbmVyIiwiYnVyZ2VyIiwicXVlcnlTZWxlY3RvciIsIm5hdiIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIlNUQVRfTUFYIiwiZG1nIiwic3BlZWQiLCJkb2RnZSIsImNyaXQiLCJocCIsInBvcnRyYWl0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkZXRhaWxzIiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3RlZExpc3QiLCJsYXVuY2hCdG4iLCJsZW5ndGgiLCJtYXhTZWxlY3Rpb24iLCJzZWxlY3RlZEhlcm9lcyIsInNlbGVjdGVkSGVyb0lkcyIsIlJPTEVfQ0FURUdPUklFUyIsImdldFNlbGVjdGVkUm9sZXMiLCJyb2xlcyIsIlRhbmsiLCJEUFMiLCJTdXBwb3J0IiwiZm9yRWFjaCIsImlkIiwicCIsIkFycmF5IiwiZnJvbSIsImZpbmQiLCJwcCIsImRhdGFzZXQiLCJjYXQiLCJyb2xlIiwiY2FuU2VsZWN0Um9sZSIsInBvcnRyYWl0IiwicmVtb3ZlIiwiYWRkIiwibmFtZSIsImRtZ01pbiIsIk51bWJlciIsImRtZ01heCIsInNwcml0ZUZpbGUiLCJzcHJpdGUiLCJzcHJpdGVQYXRoIiwiY29uY2F0IiwiaXNTZWxlY3RlZCIsImluY2x1ZGVzIiwiTWF0aCIsIm1pbiIsImJ0blJpZ2h0Iiwicm9sZUNhdCIsImFscmVhZHlTZWxlY3RlZCIsImRpc2FibGVkIiwidGV4dENvbnRlbnQiLCJmaWx0ZXIiLCJoaWQiLCJoIiwiYWxlcnQiLCJwdXNoIiwidXBkYXRlU2VsZWN0ZWRUZWFtIiwiaGVybyIsImhlcm9FbCIsInVwZGF0ZVJvbGVJbmRpY2F0b3JzIiwidGVhbUNvbXBsZXRlIiwiaW5kaWNhdG9yIiwic2xvdCIsInNhdmVQcmVzZXRCdG4iLCJwcmVzZXRNb2RhbCIsInByZXNldE5hbWVJbnB1dCIsInByZXNldENvbmZpcm1CdG4iLCJwcmVzZXRDYW5jZWxCdG4iLCJ1cGRhdGVTYXZlUHJlc2V0QnRuIiwib3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0iLCJfb3JpZ1VwZGF0ZSIsIl9vcmlnUm9sZUluZGljYXRvcnMiLCJ2YWx1ZSIsInN0eWxlIiwiZGlzcGxheSIsInNldFRpbWVvdXQiLCJmb2N1cyIsInRyaW0iLCJib3JkZXJDb2xvciIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsImJvZHkiLCJKU09OIiwic3RyaW5naWZ5IiwiY2hhcmFjdGVySWRzIiwibWFwIiwidGhlbiIsInJlcyIsImpzb24iLCJkYXRhIiwic3VjY2VzcyIsIndpbmRvdyIsImxvY2F0aW9uIiwicmVsb2FkIiwiZXJyb3IiLCJlIiwia2V5IiwiY2xpY2siLCJsb2FkUHJlc2V0IiwiaWRTdHIiLCJTdHJpbmciLCJkZWxldGVQcmVzZXQiLCJwcmVzZXRJZCIsImNoaXBFbCIsImNvbmZpcm0iLCJsaXN0IiwiY2hpbGRyZW4iLCJfZG9jdW1lbnQkcXVlcnlTZWxlY3QiLCJjaGlwIiwiY2hhcklkcyIsInBhcnNlIiwicHJlc2V0SWRzIiwic3RvcFByb3BhZ2F0aW9uIiwic2VsZWN0ZWRMaXN0T2JzZXJ2ZXIiLCJNdXRhdGlvbk9ic2VydmVyIiwib2JzZXJ2ZSIsImNoaWxkTGlzdCIsImkiLCJlbmNvZGVVUklDb21wb25lbnQiLCJqb2luIiwicmVzcG9uc2UiLCJyZWRpcmVjdGVkIiwiaHJlZiIsInVybCIsInBvcHVwIiwiYmFja2Ryb3AiLCJjbG9zZUJ0biIsImNvbnRlbnQiLCJsb2FkZWQiLCJvcGVuUG9wdXAiLCJvZmZzZXRIZWlnaHQiLCJmZXRjaFByb2ZpbGUiLCJjbG9zZVBvcHVwIiwicmVuZGVyUHJvZmlsZSIsInJlc3VsdENsYXNzIiwiciIsInJlc3VsdExhYmVsIiwiYXZhdGFySHRtbCIsInByb2ZpbGVJbWFnZSIsInVzZXJuYW1lIiwiaHRtbCIsIm1vdHRvIiwiYmlvIiwicmF0aW5nIiwic3RhdHMiLCJ3aW5zIiwibG9zc2VzIiwid2luUmF0ZSIsImZhdm9yaXRlQ2hhcmFjdGVyIiwiZ2FtZXNQbGF5ZWQiLCJsYXN0VGVhbSIsImMiLCJyZWNlbnRCYXR0bGVzIiwiYiIsInBhcnNlSW50IiwicmVzdWx0Iiwib3Bwb25lbnQiLCJtYXRjaFR5cGUiLCJ0b1VwcGVyQ2FzZSIsImRhdGUiLCJDb21iYXRDb250cm9sbGVyIiwiY29udGFpbmVyIiwiX2NsYXNzQ2FsbENoZWNrIiwibG9ncyIsImN1cnJlbnRJbmRleCIsImlzUGxheWluZyIsImlzUGF1c2VkIiwiY2hhcmFjdGVyRWxlbWVudHMiLCJjaGFyYWN0ZXJNYXhIUCIsImluaXQiLCJfY3JlYXRlQ2xhc3MiLCJfdGhpcyIsImxvZ3NEYXRhIiwiY29tYmF0TG9ncyIsImNvbnNvbGUiLCJsb2dDb250YWluZXIiLCJvdmVybGF5IiwicGxheUJ0biIsInNraXBCdG4iLCJzcGVlZEJ0bnMiLCJlbCIsImNoYXJhY3Rlck5hbWUiLCJ0ZWFtIiwiY2hhcmFjdGVyVGVhbSIsImhwVGV4dCIsIm1hdGNoIiwib3BhY2l0eSIsImJpbmRFdmVudHMiLCJwbGF5IiwiX3RoaXMyIiwidG9nZ2xlUGxheSIsInNraXAiLCJidG4iLCJzZXRTcGVlZCIsInVwZGF0ZVBsYXlCdXR0b24iLCJwcm9jZXNzTmV4dExvZyIsInBhdXNlIiwibG9nIiwiZGlzcGxheUxvZyIsInVwZGF0ZUhlYWx0aEJhcnMiLCJ0eXBlIiwiYW5pbWF0ZURlYXRoIiwidGFyZ2V0IiwidGFyZ2V0VGVhbSIsInNob3dWaWN0b3J5T3ZlcmxheSIsImV2ZW50IiwicGFyc2VGbG9hdCIsImN1cnJlbnRUYXJnZXQiLCJjb21iYXRTcGVlZCIsIl90aGlzMyIsInByb2Nlc3NMb2ciLCJkZWxheSIsImdldERlbGF5Rm9yTG9nIiwiX3RoaXM0IiwicGxheUFuaW1hdGlvbiIsImhwRGVsYXkiLCJnZXRIUFVwZGF0ZURlbGF5IiwiYW5pbWF0ZUF0dGFjayIsImF0dGFja2VyIiwiYXR0YWNrZXJUZWFtIiwiaXNDcml0IiwiYW5pbWF0ZUhlYWwiLCJoZWFsZXIiLCJoZWFsZXJUZWFtIiwiYW5pbWF0ZURlZmVuZCIsImRlZmVuZGVyIiwiZGVmZW5kZXJUZWFtIiwiYW5pbWF0ZURvZGdlIiwiYXR0YWNrZXJOYW1lIiwidGFyZ2V0TmFtZSIsImdldENoYXJhY3RlckVsZW1lbnQiLCJoZWFsZXJOYW1lIiwiZGVmZW5kZXJOYW1lIiwiZW50cnkiLCJjbGFzc05hbWUiLCJtZXNzYWdlIiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwidGVhbU5hbWUiLCJjdXJyZW50SFAiLCJtYXhIUCIsInRhcmdldEhQIiwidGFyZ2V0TWF4SFAiLCJ1bmRlZmluZWQiLCJ1cGRhdGVDaGFyYWN0ZXJIUCIsInBlcmNlbnQiLCJocEJhciIsInRyYW5zaXRpb24iLCJ3aWR0aCIsInVwZGF0ZUluZm9QYW5lbCIsInBhbmVsQ2xhc3MiLCJwYW5lbCIsImNoYXJhY3RlckluZm9zIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsIl9sb29wIiwiaW5mbyIsIm5hbWVFbCIsInN0YXRzU3BhbiIsInMiLCJuIiwiZG9uZSIsImVyciIsImYiLCJfdGhpczUiLCJmaW5hbGl6ZVJhdGluZyIsIl90aGlzNiIsImZpbmFsaXplVXJsIiwicmF0aW5nQ2hhbmdlIiwic2hvd1JhdGluZ1VwZGF0ZSIsIm5ld1JhdGluZyIsIm5ld1JhdGluZzIiLCJjaGFuZ2UiLCJyYXRpbmdFbCIsInJhdGluZ0VsMiIsIndpbm5lckRpdiIsIm5vdGlmMSIsImNzc1RleHQiLCJjb2xvciIsImNoYW5nZTIiLCJub3RpZjIiLCJjb21iYXRDb250YWluZXIiLCJiYWRnZSIsInBhbmVsT3BlbiIsImN1cnJlbnRUYWIiLCJjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkIiwibGFzdE1lc3NhZ2VJZCIsIm1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwiLCJ1bnJlYWRQb2xsaW5nSW50ZXJ2YWwiLCJmcmllbmRzTG9hZGVkIiwicmVxdWVzdHNMb2FkZWQiLCJvcGVuUGFuZWwiLCJsb2FkRnJpZW5kcyIsImNsb3NlUGFuZWwiLCJzdG9wTWVzc2FnZVBvbGxpbmciLCJ0YWJCdG4iLCJ0YWJOYW1lIiwiZnJpZW5kc1RhYiIsInN3aXRjaFRhYiIsInRhYkNvbnRlbnQiLCJsb2FkUmVxdWVzdHMiLCJmcmllbmRzIiwidXNlcklkIiwibGFzdE1lc3NhZ2UiLCJpc0Zyb21NZSIsIml0ZW0iLCJmcmllbmRVc2VySWQiLCJvcGVuQ29udmVyc2F0aW9uIiwicmVxdWVzdHMiLCJmcmllbmRzaGlwSWQiLCJoYW5kbGVSZXF1ZXN0IiwiYWNjZXB0SWQiLCJyZWplY3RJZCIsImFjdGlvbiIsImZldGNoVW5yZWFkQ291bnQiLCJzZWFyY2hJbnB1dCIsInNlYXJjaFJlc3VsdHMiLCJzZWFyY2hUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwicXVlcnkiLCJ1c2VycyIsInUiLCJhY3Rpb25IdG1sIiwiZnJpZW5kU3RhdHVzIiwic2VuZEZyaWVuZFJlcXVlc3QiLCJhZGRGcmllbmRJZCIsIm91dGVySFRNTCIsInJlcG9ydE1lc3NhZ2VBY3Rpb24iLCJtZXNzYWdlSWQiLCJyZWFzb24iLCJwcm9tcHQiLCJ0aXRsZSIsImNvbnZFbCIsIm1lc3NhZ2VzRWwiLCJyZW5kZXJNZXNzYWdlcyIsIm1lc3NhZ2VzIiwic3RhcnRNZXNzYWdlUG9sbGluZyIsImFwcGVuZCIsInBsYWNlaG9sZGVyIiwibXNnIiwicmVwb3J0QnRuIiwicmVwb3J0RWwiLCJyZXBvcnRNc2dJZCIsInNlbmRCdG4iLCJpbnB1dEVsIiwic2VuZE1lc3NhZ2UiLCJiYWNrQnRuIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwidG90YWwiLCJyZXF1ZXN0c0JhZGdlIiwicGVuZGluZ1JlcXVlc3RzIl0sInNvdXJjZVJvb3QiOiIifQ==