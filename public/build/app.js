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
   TRANSLATION HELPER
====================== */
var _translations = null;
function _t(key) {
  if (!_translations) {
    try {
      _translations = JSON.parse(document.body.dataset.translations || '{}');
    } catch (e) {
      _translations = {};
    }
  }
  return _translations[key] || key;
}
window._t = _t;

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
      var abilityName = portrait.dataset.abilityName || '';
      var abilityDesc = portrait.dataset.abilityDesc || '';
      var abilityCd = portrait.dataset.abilityCd || '';
      var spritePath = "/asset/sprites/".concat(spriteFile);
      var isSelected = selectedHeroIds.includes(id);
      var abilityHtml = abilityName ? "\n                    <div class=\"ability-section\">\n                        <div class=\"ability-section__header\">\n                            <i class=\"fas fa-fire-alt\"></i>\n                            <span class=\"ability-section__name\">".concat(escapeHtml(abilityName), "</span>\n                            <span class=\"ability-section__cd\"><i class=\"fas fa-hourglass-half\"></i> ").concat(escapeHtml(abilityCd), "T</span>\n                        </div>\n                        <p class=\"ability-section__desc\">").concat(escapeHtml(abilityDesc), "</p>\n                    </div>\n            ") : '';
      details.innerHTML = "\n                <div class=\"team-details-content\">\n                    <h2>".concat(name, "</h2>\n                    <p class=\"role\">").concat(role, "</p>\n\n                    <div class=\"gif-container\">\n                        <img src=\"").concat(spritePath, "\" alt=\"Sprite de ").concat(name, "\">\n                    </div>\n\n                    <div class=\"stats\">\n                        <div class=\"stat\">\n                            <span>DMG</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--dmg\"\n                                    style=\"width:").concat(Math.min(dmgMax / STAT_MAX.dmg * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(dmgMin, " - ").concat(dmgMax, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>VIT</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--spd\"\n                                    style=\"width:").concat(Math.min(speed / STAT_MAX.speed * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(speed, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>DODGE</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--dodge\"\n                                    style=\"width:").concat(Math.min(dodge / STAT_MAX.dodge * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(dodge, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>CRIT</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--crit\"\n                                    style=\"width:").concat(Math.min(crit / STAT_MAX.crit * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(crit, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>HP</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--hp\"\n                                    style=\"width:").concat(Math.min(hp / STAT_MAX.hp * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(hp, "</span>\n                        </div>\n                    </div>\n\n                    ").concat(abilityHtml, "\n\n                    <button class=\"btn-select-right\">\n                        ").concat(isSelected ? _t('deselect') : _t('select'), "\n                    </button>\n                </div>\n            ");
      var btnRight = details.querySelector('.btn-select-right');
      var roleCat = ROLE_CATEGORIES[role] || 'Support';
      var alreadySelected = selectedHeroIds.includes(id);

      // Désactiver le bouton si le slot de ce rôle est déjà pris
      if (!alreadySelected && !canSelectRole(role)) {
        btnRight.disabled = true;
        btnRight.textContent = _t('slot_taken').replace('%role%', roleCat);
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
            alert(_t('slot_taken').replace('%role%', roleCat));
            return;
          }
          if (selectedHeroIds.length >= maxSelection) {
            alert(_t('max_3'));
            return;
          }
          selectedHeroIds.push(id);
          selectedHeroes.push(name);
          portrait.classList.add('selected');
        }
        updateSelectedTeam();
        btnRight.textContent = selectedHeroIds.includes(id) ? _t('deselect') : _t('select');
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
          alert(data.error || _t('save_error'));
          presetConfirmBtn.disabled = false;
          presetConfirmBtn.textContent = _t('save');
        }
      })["catch"](function () {
        alert(_t('save_error'));
        presetConfirmBtn.disabled = false;
        presetConfirmBtn.textContent = _t('save');
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
    if (!confirm(_t('delete_preset_confirm'))) return;
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
      return alert(_t('delete_error'));
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
          alert(_t('team_select_error'));
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
      content.innerHTML = "<p class=\"profile-popup__error\">".concat(_t('loading_error'), "</p>");
    });
  }
  function renderProfile(data) {
    var resultClass = function resultClass(r) {
      return r === 'win' ? 'result--win' : r === 'loss' ? 'result--loss' : 'result--draw';
    };
    var resultLabel = function resultLabel(r) {
      return r === 'win' ? _t('win') : r === 'loss' ? _t('loss') : _t('draw');
    };
    var avatarHtml = data.profileImage ? "<img src=\"".concat(escapeHtml(data.profileImage), "\" alt=\"Avatar de ").concat(escapeHtml(data.username), "\">") : "<i class=\"fas fa-user-circle\" aria-hidden=\"true\"></i>";
    var html = "\n            <div class=\"profile-popup__identity\">\n                <div class=\"profile-popup__avatar\">".concat(avatarHtml, "</div>\n                <div class=\"profile-popup__info\">\n                    <span class=\"profile-popup__username\">").concat(escapeHtml(data.username), "</span>\n                    ").concat(data.motto ? "<span class=\"profile-popup__motto\">\xAB ".concat(escapeHtml(data.motto), " \xBB</span>") : '', "\n                    ").concat(data.bio ? "<p class=\"profile-popup__bio\">".concat(escapeHtml(data.bio), "</p>") : '', "\n                </div>\n            </div>\n\n            <div class=\"profile-popup__stats\">\n                <div class=\"profile-stat\">\n                    <span class=\"profile-stat__value\">").concat(escapeHtml(String(data.rating)), "</span>\n                    <span class=\"profile-stat__label\">MMR</span>\n                </div>\n                <div class=\"profile-stat\">\n                    <span class=\"profile-stat__value\">").concat(escapeHtml(String(data.stats.wins)), "</span>\n                    <span class=\"profile-stat__label\">").concat(_t('victories'), "</span>\n                </div>\n                <div class=\"profile-stat\">\n                    <span class=\"profile-stat__value\">").concat(escapeHtml(String(data.stats.losses)), "</span>\n                    <span class=\"profile-stat__label\">").concat(_t('defeats'), "</span>\n                </div>\n                <div class=\"profile-stat\">\n                    <span class=\"profile-stat__value\">").concat(escapeHtml(String(data.stats.winRate)), "%</span>\n                    <span class=\"profile-stat__label\">Win Rate</span>\n                </div>\n            </div>\n        ");
    if (data.favoriteCharacter) {
      html += "\n                <div class=\"profile-popup__section\">\n                    <h3 class=\"profile-popup__subtitle\">\n                        <i class=\"fas fa-star\" aria-hidden=\"true\"></i> ".concat(_t('favorite_champion'), "\n                    </h3>\n                    <div class=\"profile-favorite\">\n                        <span class=\"profile-favorite__name\">").concat(escapeHtml(data.favoriteCharacter.name), "</span>\n                        <span class=\"profile-favorite__role\">").concat(escapeHtml(data.favoriteCharacter.role), "</span>\n                        <span class=\"profile-favorite__count\">").concat(escapeHtml(String(data.favoriteCharacter.gamesPlayed)), " ").concat(_t('games'), "</span>\n                    </div>\n                </div>\n            ");
    }
    if (data.lastTeam.length > 0) {
      html += "\n                <div class=\"profile-popup__section\">\n                    <h3 class=\"profile-popup__subtitle\">\n                        <i class=\"fas fa-users\" aria-hidden=\"true\"></i> ".concat(_t('last_team'), "\n                    </h3>\n                    <div class=\"profile-last-team\">\n                        ").concat(data.lastTeam.map(function (c) {
        return "\n                            <div class=\"profile-last-team__member\">\n                                <span class=\"profile-last-team__name\">".concat(escapeHtml(c.name), "</span>\n                                <span class=\"profile-last-team__role\">").concat(escapeHtml(c.role), "</span>\n                            </div>\n                        ");
      }).join(''), "\n                    </div>\n                </div>\n            ");
    }
    if (data.recentBattles.length > 0) {
      html += "\n                <div class=\"profile-popup__section\">\n                    <h3 class=\"profile-popup__subtitle\">\n                        <i class=\"fas fa-shield-alt\" aria-hidden=\"true\"></i> ".concat(_t('history'), "\n                    </h3>\n                    <div class=\"profile-history\">\n                        ").concat(data.recentBattles.map(function (b) {
        return "\n                            <a href=\"/arena/replay/".concat(parseInt(b.id, 10), "\" class=\"profile-history__entry ").concat(resultClass(b.result), "\">\n                                <span class=\"profile-history__result\">").concat(resultLabel(b.result), "</span>\n                                <span class=\"profile-history__opponent\">vs ").concat(escapeHtml(b.opponent), "</span>\n                                <span class=\"profile-history__type\">").concat(escapeHtml(b.matchType).toUpperCase(), "</span>\n                                <span class=\"profile-history__date\">").concat(escapeHtml(b.date), "</span>\n                                <i class=\"fas fa-play profile-history__replay\" aria-hidden=\"true\"></i>\n                            </a>\n                        ");
      }).join(''), "\n                    </div>\n                </div>\n            ");
    } else {
      html += "\n                <div class=\"profile-popup__section\">\n                    <p class=\"profile-popup__empty\">".concat(_t('no_battle'), "</p>\n                </div>\n            ");
    }
    html += "\n            <div class=\"profile-popup__actions\">\n                <a href=\"/profile\" class=\"profile-popup__edit-link\">\n                    <i class=\"fas fa-pen\" aria-hidden=\"true\"></i> ".concat(_t('edit_profile'), "\n                </a>\n            </div>\n        ");
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
      this.abilityCooldowns = {}; // Suivi des cooldowns en cours
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
          return 2000;
        case 'initiative':
          return 400;
        case 'attack':
          return 2000;
        case 'heal':
          return 1800;
        case 'defend':
          return 1500;
        case 'dodge':
          return 1200;
        case 'death':
          return 2500;
        case 'protect':
          return 1500;
        case 'victory':
        case 'draw':
          return 1000;
        // Nouveaux types
        case 'bleed_tick':
          return 800;
        case 'blight_tick':
          return 800;
        case 'stunned_skip':
          return 1000;
        case 'riposte_activate':
          return 1200;
        case 'ability_use':
          return this.getAbilityDelay(log);
        default:
          return 800;
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
          return 2000;
        case 'stun':
          return 1500;
        case 'mark':
          return 1200;
        case 'riposte_buff':
        case 'self_buff':
        case 'stealth':
          return 1200;
        case 'party_heal':
          return 1800;
        case 'party_buff':
          return 1500;
        case 'emergency_heal':
          return 1800;
        case 'protect_dodge':
          return 1500;
        case 'transform_damage':
          return 800;
        default:
          return 1200;
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
        }, 600);
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
        }, 800);
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
        }, 800);
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
            }, 400);
          }
          break;
        case 'blight_attack':
          if (log.caster && log.casterTeam) this.animateAttack(log.caster, log.casterTeam, log.target, log.targetTeam, false);
          if (log.target && log.targetTeam) {
            setTimeout(function () {
              return _this5.animateDoT(log.target, log.targetTeam, 'blighted');
            }, 400);
          }
          break;
        case 'stun':
          if (log.caster && log.casterTeam) this.animateAttack(log.caster, log.casterTeam, log.target, log.targetTeam, false);
          if (log.target && log.targetTeam) {
            setTimeout(function () {
              return _this5.animateStunned(log.target, log.targetTeam);
            }, 400);
          }
          break;
        case 'mark':
          if (log.caster && log.casterTeam) this.animateBuff(log.caster, log.casterTeam);
          if (log.target && log.targetTeam) this.animateMarked(log.target, log.targetTeam);
          break;
        case 'riposte_buff':
          if (log.caster && log.casterTeam) this.animateBuff(log.caster, log.casterTeam);
          break;
        case 'self_buff':
          if (log.caster && log.casterTeam) this.animateBuff(log.caster, log.casterTeam);
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
                  }, 800);
                }
              });
            }
          }
          break;
        case 'party_buff':
          if (log.caster && log.casterTeam) this.animateBuff(log.caster, log.casterTeam);
          // Animer tous les alliés du même côté
          this.animateTeamBuff(log.casterTeam);
          break;
        case 'stealth':
          if (log.caster && log.casterTeam) this.animateStealth(log.caster, log.casterTeam);
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
              }, 400);
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
          }, 800);
        }
      });
    }

    // === ANIMATIONS EXISTANTES ===
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
      var _this7 = this;
      // Compétences qui infligent des dégâts à une cible
      if (log.target && log.targetHP !== undefined && log.targetMaxHP) {
        this.updateCharacterHP(log.target, log.targetTeam, log.targetHP, log.targetMaxHP);
      }

      // Soin de groupe : mettre à jour chaque allié soigné
      if (log.subtype === 'party_heal' && log.healed) {
        log.healed.forEach(function (h) {
          _this7.updateCharacterHP(h.name, h.team, h.hp, h.maxHp);
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
      var _this8 = this;
      if (this.overlay) {
        this.overlay.style.display = 'flex';
        setTimeout(function () {
          _this8.overlay.style.opacity = '1';
        }, 50);
      }

      // Finaliser le MMR a la fin du combat
      this.finalizeRating();
    }
  }, {
    key: "finalizeRating",
    value: function finalizeRating() {
      var _this9 = this;
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
          _this9.showRatingUpdate(data.ratingChange, data.newRating, data.newRating2);
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
      var _t = window._t || function (k) {
        return k;
      };
      if (this.isPlaying && !this.isPaused) {
        this.playBtn.textContent = _t('pause');
      } else if (this.currentIndex >= this.logs.length) {
        this.playBtn.textContent = _t('finished');
        this.playBtn.disabled = true;
      } else {
        this.playBtn.textContent = this.currentIndex > 0 ? _t('resume') : _t('start');
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
    var _t = window._t || function (k) {
      return k;
    };
    container.innerHTML = "<div class=\"friends-panel__loading\"><i class=\"fas fa-spinner fa-spin\"></i> ".concat(_t('loading'), "</div>");
    fetch('/friends/list', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      friendsLoaded = true;
      if (data.friends.length === 0) {
        container.innerHTML = "<p class=\"friends-panel__empty\"><i class=\"fas fa-ghost\"></i> ".concat(_t('no_companions'), "</p>");
        return;
      }
      container.innerHTML = data.friends.map(function (f) {
        return "\n                <div class=\"friend-item\" data-friend-user-id=\"".concat(f.userId, "\">\n                    <div class=\"friend-item__avatar\">\n                        ").concat(f.profileImage ? "<img src=\"".concat(escapeHtml(f.profileImage), "\" alt=\"").concat(escapeHtml(f.username), "\">") : '<i class="fas fa-user"></i>', "\n                    </div>\n                    <div class=\"friend-item__info\">\n                        <span class=\"friend-item__name\">").concat(escapeHtml(f.username), "</span>\n                        <span class=\"friend-item__preview\">\n                            ").concat(f.lastMessage ? (f.lastMessage.isFromMe ? _t('you_prefix') : '') + escapeHtml(f.lastMessage.content) : _t('no_message'), "\n                        </span>\n                    </div>\n                    <span class=\"friend-item__rating\"><i class=\"fas fa-trophy\"></i> ").concat(f.rating, "</span>\n                </div>\n            ");
      }).join('');
      container.querySelectorAll('.friend-item').forEach(function (item) {
        item.addEventListener('click', function () {
          var userId = parseInt(item.dataset.friendUserId);
          var name = item.querySelector('.friend-item__name').textContent;
          openConversation(userId, name);
        });
      });
    })["catch"](function () {
      container.innerHTML = "<p class=\"friends-panel__empty\">".concat(_t('loading_error'), "</p>");
    });
  }

  // ==========================================
  // LOAD PENDING REQUESTS
  // ==========================================
  function loadRequests() {
    var container = document.querySelector('[data-tab-content="requests"]');
    container.innerHTML = "<div class=\"friends-panel__loading\"><i class=\"fas fa-spinner fa-spin\"></i> ".concat(_t('loading'), "</div>");
    fetch('/friends/pending', {
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(function (res) {
      return res.json();
    }).then(function (data) {
      requestsLoaded = true;
      if (data.requests.length === 0) {
        container.innerHTML = "<p class=\"friends-panel__empty\">".concat(_t('no_requests'), "</p>");
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
      container.innerHTML = "<p class=\"friends-panel__empty\">".concat(_t('loading_error'), "</p>");
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
            searchResults.innerHTML = "<p class=\"friends-panel__empty\">".concat(_t('no_warrior'), "</p>");
            return;
          }
          searchResults.innerHTML = data.users.map(function (u) {
            var actionHtml = '';
            if (u.friendStatus === 'accepted') {
              actionHtml = "<span class=\"friend-action friend-action--pending\">".concat(_t('friend_status'), "</span>");
            } else if (u.friendStatus === 'pending_sent') {
              actionHtml = "<span class=\"friend-action friend-action--pending\">".concat(_t('sent_status'), "</span>");
            } else if (u.friendStatus === 'pending_received') {
              actionHtml = "<span class=\"friend-action friend-action--pending\">".concat(_t('received_status'), "</span>");
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
        btn.outerHTML = "<span class=\"friend-action friend-action--pending\">".concat(_t('sent_status'), "</span>");
      } else {
        btn.disabled = false;
      }
    })["catch"](function () {
      btn.disabled = false;
    });
  }
  function reportMessageAction(messageId, btn) {
    var reason = prompt(_t('report_reason'));
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
        btn.title = _t('reported');
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
    messagesEl.innerHTML = "<div class=\"friends-panel__loading\"><i class=\"fas fa-spinner fa-spin\"></i> ".concat(_t('loading'), "</div>");
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
        messagesEl.innerHTML = "<p class=\"friends-panel__empty\">".concat(_t('start_conversation'), "</p>");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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SSxDQUFDLENBQUM7SUFBQSxFQUFDLENBQ3ZCRixJQUFJLENBQUMsVUFBQUcsSUFBSSxFQUFJO01BQ1YsSUFBSUEsSUFBSSxDQUFDb1MsS0FBSyxHQUFHLENBQUMsRUFBRTtRQUNoQmhNLEtBQUssQ0FBQzNJLFdBQVcsR0FBR3VDLElBQUksQ0FBQ29TLEtBQUs7UUFDOUJoTSxLQUFLLENBQUNuSCxLQUFLLENBQUNDLE9BQU8sR0FBRyxjQUFjO01BQ3hDLENBQUMsTUFBTTtRQUNIa0gsS0FBSyxDQUFDbkgsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtNQUNoQztNQUVBLElBQU1tVCxhQUFhLEdBQUd0WixRQUFRLENBQUNlLGFBQWEsQ0FBQyx1QkFBdUIsQ0FBQztNQUNyRSxJQUFJdVksYUFBYSxFQUFFO1FBQ2YsSUFBSXJTLElBQUksQ0FBQ3NTLGVBQWUsR0FBRyxDQUFDLEVBQUU7VUFDMUJELGFBQWEsQ0FBQzVVLFdBQVcsR0FBR3VDLElBQUksQ0FBQ3NTLGVBQWU7VUFDaERELGFBQWEsQ0FBQ3BULEtBQUssQ0FBQ0MsT0FBTyxHQUFHLGNBQWM7UUFDaEQsQ0FBQyxNQUFNO1VBQ0htVCxhQUFhLENBQUNwVCxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO1FBQ3hDO01BQ0o7SUFDSixDQUFDLENBQUMsU0FDSSxDQUFDLFlBQU0sQ0FBQyxDQUFDLENBQUM7RUFDcEI7RUFFQStRLGdCQUFnQixDQUFDLENBQUM7RUFDbEIxQixxQkFBcUIsR0FBRzJELFdBQVcsQ0FBQ2pDLGdCQUFnQixFQUFFLEtBQUssQ0FBQztBQUNoRSxDQUFDLENBQUMsQzs7Ozs7Ozs7Ozs7O0FDdmZGOzs7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9jb21iYXQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2ZyaWVuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzPzJkYzkiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9hcHAuc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBXZWxjb21lIHRvIHlvdXIgYXBwJ3MgbWFpbiBKYXZhU2NyaXB0IGZpbGUhXHJcbiAqL1xyXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcyc7XHJcbmltcG9ydCAnLi9qcy9jb21iYXQuanMnO1xyXG5pbXBvcnQgJy4vanMvZnJpZW5kcy5qcyc7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIFRSQU5TTEFUSU9OIEhFTFBFUlxyXG49PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmxldCBfdHJhbnNsYXRpb25zID0gbnVsbDtcclxuZnVuY3Rpb24gX3Qoa2V5KSB7XHJcbiAgICBpZiAoIV90cmFuc2xhdGlvbnMpIHtcclxuICAgICAgICB0cnkgeyBfdHJhbnNsYXRpb25zID0gSlNPTi5wYXJzZShkb2N1bWVudC5ib2R5LmRhdGFzZXQudHJhbnNsYXRpb25zIHx8ICd7fScpOyB9XHJcbiAgICAgICAgY2F0Y2goZSkgeyBfdHJhbnNsYXRpb25zID0ge307IH1cclxuICAgIH1cclxuICAgIHJldHVybiBfdHJhbnNsYXRpb25zW2tleV0gfHwga2V5O1xyXG59XHJcbndpbmRvdy5fdCA9IF90O1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBVVElMSVRBSVJFIFNFQ1VSSVRFIFhTU1xyXG49PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XHJcbiAgICBpZiAoIXN0cikgcmV0dXJuICcnO1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyKSk7XHJcbiAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBNRU5VIEJVUkdFUlxyXG49PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGNvbnN0IGJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnVyZ2VyXCIpO1xyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLW5hdmlnYXRpb25cIik7XHJcblxyXG4gICAgaWYgKGJ1cmdlciAmJiBuYXYpIHtcclxuICAgICAgICBidXJnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIFBBR0UgVEVBTVMgKENPUlJJR8OJRSlcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qIPCflKcgTUFYIERFUyBTVEFUUyAoYWRhcHRlciDDoCB0YSBCREQgLyDDqXF1aWxpYnJhZ2UpICovXHJcbmNvbnN0IFNUQVRfTUFYID0ge1xyXG4gICAgZG1nOiAzMCxcclxuICAgIHNwZWVkOiAxMixcclxuICAgIGRvZGdlOiA0MCxcclxuICAgIGNyaXQ6IDE1LFxyXG4gICAgaHA6IDc1XHJcbn07XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgcG9ydHJhaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRlYW0tcG9ydHJhaXQnKTtcclxuICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVhbURldGFpbHMnKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC1saXN0Jyk7XHJcbiAgICBjb25zdCBsYXVuY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWxhdW5jaCcpO1xyXG5cclxuICAgIGlmICghZGV0YWlscyB8fCBwb3J0cmFpdHMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgbWF4U2VsZWN0aW9uID0gMztcclxuICAgIGxldCBzZWxlY3RlZEhlcm9lcyA9IFtdO1xyXG4gICAgbGV0IHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG5cclxuICAgIC8vIENvbXBvc2l0aW9uIG9ibGlnYXRvaXJlIDogMSBUYW5rLCAxIERQUywgMSBTdXBwb3J0XHJcbiAgICBjb25zdCBST0xFX0NBVEVHT1JJRVMgPSB7ICdUYW5rJzogJ1RhbmsnLCAnRFBTJzogJ0RQUycsICdTdXBwb3J0JzogJ1N1cHBvcnQnLCAnU29pZ25ldXInOiAnU3VwcG9ydCcsICdCdWZmZXInOiAnU3VwcG9ydCcgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTZWxlY3RlZFJvbGVzKCkge1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0geyBUYW5rOiAwLCBEUFM6IDAsIFN1cHBvcnQ6IDAgfTtcclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwcCA9PiBwcC5kYXRhc2V0LmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgIGlmIChwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSBST0xFX0NBVEVHT1JJRVNbcC5kYXRhc2V0LnJvbGVdIHx8ICdTdXBwb3J0JztcclxuICAgICAgICAgICAgICAgIHJvbGVzW2NhdF0rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByb2xlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYW5TZWxlY3RSb2xlKHJvbGUpIHtcclxuICAgICAgICBjb25zdCBjYXQgPSBST0xFX0NBVEVHT1JJRVNbcm9sZV0gfHwgJ1N1cHBvcnQnO1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgIHJldHVybiByb2xlc1tjYXRdIDwgMTtcclxuICAgIH1cclxuXHJcbiAgICBwb3J0cmFpdHMuZm9yRWFjaChwb3J0cmFpdCA9PiB7XHJcbiAgICAgICAgcG9ydHJhaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcnRyYWl0cy5mb3JFYWNoKHAgPT4gcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaWQgPSBwb3J0cmFpdC5kYXRhc2V0LmlkO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gcG9ydHJhaXQuZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCByb2xlID0gcG9ydHJhaXQuZGF0YXNldC5yb2xlO1xyXG4gICAgICAgICAgICBjb25zdCBkbWdNaW4gPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kbWdNaW4pO1xyXG4gICAgICAgICAgICBjb25zdCBkbWdNYXggPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kbWdNYXgpO1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LnNwZWVkKTtcclxuICAgICAgICAgICAgY29uc3QgZG9kZ2UgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kb2RnZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyaXQgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5jcml0KTtcclxuICAgICAgICAgICAgY29uc3QgaHAgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5ocCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZUZpbGUgPSBwb3J0cmFpdC5kYXRhc2V0LnNwcml0ZTtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eU5hbWUgPSBwb3J0cmFpdC5kYXRhc2V0LmFiaWxpdHlOYW1lIHx8ICcnO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5RGVzYyA9IHBvcnRyYWl0LmRhdGFzZXQuYWJpbGl0eURlc2MgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlDZCA9IHBvcnRyYWl0LmRhdGFzZXQuYWJpbGl0eUNkIHx8ICcnO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlUGF0aCA9IGAvYXNzZXQvc3ByaXRlcy8ke3Nwcml0ZUZpbGV9YDtcclxuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5SHRtbCA9IGFiaWxpdHlOYW1lID8gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFiaWxpdHktc2VjdGlvbl9faGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1maXJlLWFsdFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19uYW1lXCI+JHtlc2NhcGVIdG1sKGFiaWxpdHlOYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFiaWxpdHktc2VjdGlvbl9fY2RcIj48aSBjbGFzcz1cImZhcyBmYS1ob3VyZ2xhc3MtaGFsZlwiPjwvaT4gJHtlc2NhcGVIdG1sKGFiaWxpdHlDZCl9VDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19kZXNjXCI+JHtlc2NhcGVIdG1sKGFiaWxpdHlEZXNjKX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGAgOiAnJztcclxuXHJcbiAgICAgICAgICAgIGRldGFpbHMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYW0tZGV0YWlscy1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPiR7bmFtZX08L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicm9sZVwiPiR7cm9sZX08L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnaWYtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzcHJpdGVQYXRofVwiIGFsdD1cIlNwcml0ZSBkZSAke25hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE1HPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWRtZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoZG1nTWF4IC8gU1RBVF9NQVguZG1nKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZG1nTWlufSAtICR7ZG1nTWF4fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VklUPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLXNwZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoc3BlZWQgLyBTVEFUX01BWC5zcGVlZCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke3NwZWVkfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE9ER0U8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tZG9kZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGRvZGdlIC8gU1RBVF9NQVguZG9kZ2UpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkb2RnZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNSSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tY3JpdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoY3JpdCAvIFNUQVRfTUFYLmNyaXQpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtjcml0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+SFA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0taHBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGhwIC8gU1RBVF9NQVguaHApICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtocH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAke2FiaWxpdHlIdG1sfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLXNlbGVjdC1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2lzU2VsZWN0ZWQgPyBfdCgnZGVzZWxlY3QnKSA6IF90KCdzZWxlY3QnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYnRuUmlnaHQgPSBkZXRhaWxzLnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2VsZWN0LXJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVDYXQgPSBST0xFX0NBVEVHT1JJRVNbcm9sZV0gfHwgJ1N1cHBvcnQnO1xyXG4gICAgICAgICAgICBjb25zdCBhbHJlYWR5U2VsZWN0ZWQgPSBzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gRMOpc2FjdGl2ZXIgbGUgYm91dG9uIHNpIGxlIHNsb3QgZGUgY2UgcsO0bGUgZXN0IGTDqWrDoCBwcmlzXHJcbiAgICAgICAgICAgIGlmICghYWxyZWFkeVNlbGVjdGVkICYmICFjYW5TZWxlY3RSb2xlKHJvbGUpKSB7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IF90KCdzbG90X3Rha2VuJykucmVwbGFjZSgnJXJvbGUlJywgcm9sZUNhdCk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMgPSBzZWxlY3RlZEhlcm9JZHMuZmlsdGVyKGhpZCA9PiBoaWQgIT09IGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcyA9IHNlbGVjdGVkSGVyb2VzLmZpbHRlcihoID0+IGggIT09IG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuU2VsZWN0Um9sZShyb2xlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChfdCgnc2xvdF90YWtlbicpLnJlcGxhY2UoJyVyb2xlJScsIHJvbGVDYXQpKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCA+PSBtYXhTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoX3QoJ21heF8zJykpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcy5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcy5wdXNoKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0ZWRUZWFtKCk7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZClcclxuICAgICAgICAgICAgICAgICAgICA/IF90KCdkZXNlbGVjdCcpXHJcbiAgICAgICAgICAgICAgICAgICAgOiBfdCgnc2VsZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qICBaT05FIMOJUVVJUEUg4oCUIHNwcml0ZXMgc2V1bGVtZW50ICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTZWxlY3RlZFRlYW0oKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm8gPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwID0+IHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAoIWhlcm8pIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGhlcm8uZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7aGVyby5kYXRhc2V0LnNwcml0ZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgaGVyb0VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWhlcm8tc3ByaXRlJyk7XHJcbiAgICAgICAgICAgIGhlcm9FbC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c3ByaXRlUGF0aH1cIiBhbHQ9XCJTcHJpdGUgZGUgJHtuYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+JHtuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgc2VsZWN0ZWRMaXN0LmFwcGVuZENoaWxkKGhlcm9FbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbGVzIGluZGljYXRldXJzIGRlIHLDtGxlc1xyXG4gICAgICAgIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCk7XHJcblxyXG4gICAgICAgIGlmIChsYXVuY2hCdG4pIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW1Db21wbGV0ZSA9IHJvbGVzLlRhbmsgPT09IDEgJiYgcm9sZXMuRFBTID09PSAxICYmIHJvbGVzLlN1cHBvcnQgPT09IDE7XHJcbiAgICAgICAgICAgIGxhdW5jaEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCkge1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgIGNvbnN0IGluZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb2xlLWluZGljYXRvcicpO1xyXG4gICAgICAgIGlmIChpbmRpY2F0b3IpIHtcclxuICAgICAgICAgICAgaW5kaWNhdG9yLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb2xlLXNsb3QnKS5mb3JFYWNoKHNsb3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2F0ID0gc2xvdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgICAgICBpZiAocm9sZXNbY2F0XSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2xhc3NMaXN0LnJlbW92ZSgnZmlsbGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgUFJFU0VUU1xyXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuICAgIGNvbnN0IHNhdmVQcmVzZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXNhdmUtcHJlc2V0Jyk7XHJcbiAgICBjb25zdCBwcmVzZXRNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRNb2RhbCcpO1xyXG4gICAgY29uc3QgcHJlc2V0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldE5hbWUnKTtcclxuICAgIGNvbnN0IHByZXNldENvbmZpcm1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0Q29uZmlybScpO1xyXG4gICAgY29uc3QgcHJlc2V0Q2FuY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldENhbmNlbCcpO1xyXG5cclxuICAgIC8vIE1ldHRyZSBhIGpvdXIgbGUgYm91dG9uIHNhdXZlZ2FyZGVyIHNlbG9uIGxhIHNlbGVjdGlvblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2F2ZVByZXNldEJ0bigpIHtcclxuICAgICAgICBpZiAoc2F2ZVByZXNldEJ0bikge1xyXG4gICAgICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbUNvbXBsZXRlID0gcm9sZXMuVGFuayA9PT0gMSAmJiByb2xlcy5EUFMgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgc2F2ZVByZXNldEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcGVsZXIgdXBkYXRlU2F2ZVByZXNldEJ0biBhIGNoYXF1ZSBjaGFuZ2VtZW50IGRlIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0gPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcbiAgICAvLyBPbiBzdXJjaGFyZ2UgZW4gYWpvdXRhbnQgbCdhcHBlbFxyXG4gICAgY29uc3QgX29yaWdVcGRhdGUgPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcblxyXG4gICAgLy8gUGF0Y2g6IGFqb3V0ZXIgbCdhcHBlbCBhIHVwZGF0ZVNhdmVQcmVzZXRCdG4gZGFucyB1cGRhdGVTZWxlY3RlZFRlYW1cclxuICAgIC8vIE9uIGxlIGZhaXQgZW4gd3JhcHBhbnQgbGVzIGluZGljYXRldXJzXHJcbiAgICBjb25zdCBfb3JpZ1JvbGVJbmRpY2F0b3JzID0gdXBkYXRlUm9sZUluZGljYXRvcnM7XHJcblxyXG4gICAgLy8gT3V2cmlyIGxhIG1vZGFsXHJcbiAgICBpZiAoc2F2ZVByZXNldEJ0biAmJiBwcmVzZXRNb2RhbCkge1xyXG4gICAgICAgIHNhdmVQcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHByZXNldE5hbWVJbnB1dC5mb2N1cygpLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGZXJtZXIgbGEgbW9kYWxcclxuICAgICAgICBwcmVzZXRDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByZXNldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtbW9kYWxfX2JhY2tkcm9wJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNhdXZlZ2FyZGVyIGxlIHByZXNldFxyXG4gICAgICAgIHByZXNldENvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcmVzZXROYW1lSW5wdXQudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZGMxNDNjJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnLi4uJztcclxuXHJcbiAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvcHJlc2V0cy9zYXZlJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVySWRzOiBzZWxlY3RlZEhlcm9JZHMubWFwKE51bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWNoYXJnZXIgbGEgcGFnZSBwb3VyIGFmZmljaGVyIGxlIG5vdXZlYXUgcHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yIHx8IF90KCdzYXZlX2Vycm9yJykpO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLnRleHRDb250ZW50ID0gX3QoJ3NhdmUnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGFsZXJ0KF90KCdzYXZlX2Vycm9yJykpO1xyXG4gICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi50ZXh0Q29udGVudCA9IF90KCdzYXZlJyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBFbnRlciBwb3VyIHZhbGlkZXJcclxuICAgICAgICBwcmVzZXROYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgcHJlc2V0Q29uZmlybUJ0bi5jbGljaygpO1xyXG4gICAgICAgICAgICBwcmVzZXROYW1lSW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGFyZ2VyIHVuIHByZXNldCAoc2VsZWN0aW9uIHByb2dyYW1tYXRpcXVlIGRlcyBwZXJzb25uYWdlcylcclxuICAgIGZ1bmN0aW9uIGxvYWRQcmVzZXQoY2hhcmFjdGVySWRzKSB7XHJcbiAgICAgICAgLy8gUmVzZXQgbGEgc2VsZWN0aW9uIGFjdHVlbGxlXHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzID0gW107XHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBbXTtcclxuICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHAuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKSk7XHJcblxyXG4gICAgICAgIC8vIFNlbGVjdGlvbm5lciBsZXMgcGVyc29ubmFnZXMgZHUgcHJlc2V0XHJcbiAgICAgICAgY2hhcmFjdGVySWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpZFN0ciA9IFN0cmluZyhpZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvcnRyYWl0ID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocCA9PiBwLmRhdGFzZXQuaWQgPT09IGlkU3RyKTtcclxuICAgICAgICAgICAgaWYgKHBvcnRyYWl0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMucHVzaChpZFN0cik7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcy5wdXNoKHBvcnRyYWl0LmRhdGFzZXQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVNlbGVjdGVkVGVhbSgpO1xyXG4gICAgICAgIHVwZGF0ZVNhdmVQcmVzZXRCdG4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTdXBwcmltZXIgdW4gcHJlc2V0XHJcbiAgICBmdW5jdGlvbiBkZWxldGVQcmVzZXQocHJlc2V0SWQsIGNoaXBFbCkge1xyXG4gICAgICAgIGlmICghY29uZmlybShfdCgnZGVsZXRlX3ByZXNldF9jb25maXJtJykpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGAvdGVhbXMvcHJlc2V0cy8ke3ByZXNldElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlwRWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTaSBwbHVzIGRlIHByZXNldHMsIGNhY2hlciBsYSBiYXJyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXRzLWJhcl9fbGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QgJiYgbGlzdC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0cy1iYXInKT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiBhbGVydChfdCgnZGVsZXRlX2Vycm9yJykpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBdHRhY2hlciBsZXMgZXZlbnRzIGF1eCBjaGlwcyBkZSBwcmVzZXRzXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlc2V0LWNoaXAnKS5mb3JFYWNoKGNoaXAgPT4ge1xyXG4gICAgICAgIGNvbnN0IHByZXNldElkID0gY2hpcC5kYXRhc2V0LnByZXNldElkO1xyXG4gICAgICAgIGNvbnN0IGNoYXJJZHMgPSBKU09OLnBhcnNlKGNoaXAuZGF0YXNldC5wcmVzZXRJZHMpO1xyXG5cclxuICAgICAgICBjaGlwLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtY2hpcF9fbG9hZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsb2FkUHJlc2V0KGNoYXJJZHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjaGlwLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtY2hpcF9fZGVsZXRlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBkZWxldGVQcmVzZXQocHJlc2V0SWQsIGNoaXApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gT2JzZXJ2ZXIgbGVzIGNoYW5nZW1lbnRzIGRlIHNlbGVjdGlvbiBwb3VyIGxlIGJvdXRvbiBzYXZlXHJcbiAgICAvLyBPbiB1dGlsaXNlIHVuIE11dGF0aW9uT2JzZXJ2ZXIgc3VyIHNlbGVjdGVkTGlzdFxyXG4gICAgY29uc3Qgc2VsZWN0ZWRMaXN0T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB1cGRhdGVTYXZlUHJlc2V0QnRuKCkpO1xyXG4gICAgaWYgKHNlbGVjdGVkTGlzdCkge1xyXG4gICAgICAgIHNlbGVjdGVkTGlzdE9ic2VydmVyLm9ic2VydmUoc2VsZWN0ZWRMaXN0LCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGF1bmNoQnRuKSB7XHJcbiAgICAgICAgbGF1bmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIEVudm9pIFBPU1QgQUpBWCB2ZXJzIC90ZWFtcy9zZWxlY3RcclxuICAgICAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvc2VsZWN0Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBzZWxlY3RlZEhlcm9JZHMubWFwKChpZCwgaSkgPT4gYGNoYXJhY3Rlcl9pZHNbJHtpfV09JHtlbmNvZGVVUklDb21wb25lbnQoaWQpfWApLmpvaW4oJyYnKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UucmVkaXJlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLnVybDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWRpcmlnZSBtYW51ZWxsZW1lbnQgc2kgcGFzIGRlIHJlZGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9tYXRjaG1ha2luZyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoX3QoJ3RlYW1fc2VsZWN0X2Vycm9yJykpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQUk9GSUxFIFBPUFVQXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1wb3B1cF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWNvbnRlbnRdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBvcHVwKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwb3B1cC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3Byb2ZpbGUtcG9wdXAtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwX19iYWNrZHJvcC0tb3BlbicpO1xyXG5cclxuICAgICAgICBpZiAoIWxvYWRlZCkge1xyXG4gICAgICAgICAgICBmZXRjaFByb2ZpbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cCk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmZXRjaFByb2ZpbGUoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9hcGkvcHJvZmlsZScpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9maWxlKGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSBgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lcnJvclwiPiR7X3QoJ2xvYWRpbmdfZXJyb3InKX08L3A+YDtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyUHJvZmlsZShkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0Q2xhc3MgPSAocikgPT4gciA9PT0gJ3dpbicgPyAncmVzdWx0LS13aW4nIDogciA9PT0gJ2xvc3MnID8gJ3Jlc3VsdC0tbG9zcycgOiAncmVzdWx0LS1kcmF3JztcclxuICAgICAgICBjb25zdCByZXN1bHRMYWJlbCA9IChyKSA9PiByID09PSAnd2luJyA/IF90KCd3aW4nKSA6IHIgPT09ICdsb3NzJyA/IF90KCdsb3NzJykgOiBfdCgnZHJhdycpO1xyXG5cclxuICAgICAgICBjb25zdCBhdmF0YXJIdG1sID0gZGF0YS5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwoZGF0YS5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIkF2YXRhciBkZSAke2VzY2FwZUh0bWwoZGF0YS51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICA6IGA8aSBjbGFzcz1cImZhcyBmYS11c2VyLWNpcmNsZVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5gO1xyXG5cclxuICAgICAgICBsZXQgaHRtbCA9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2lkZW50aXR5XCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fYXZhdGFyXCI+JHthdmF0YXJIdG1sfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3VzZXJuYW1lXCI+JHtlc2NhcGVIdG1sKGRhdGEudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAke2RhdGEubW90dG8gPyBgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXBvcHVwX19tb3R0b1wiPlxcdTAwYWIgJHtlc2NhcGVIdG1sKGRhdGEubW90dG8pfSBcXHUwMGJiPC9zcGFuPmAgOiAnJ31cclxuICAgICAgICAgICAgICAgICAgICAke2RhdGEuYmlvID8gYDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fYmlvXCI+JHtlc2NhcGVIdG1sKGRhdGEuYmlvKX08L3A+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N0YXRzXCI+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX3ZhbHVlXCI+JHtlc2NhcGVIdG1sKFN0cmluZyhkYXRhLnJhdGluZykpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5NTVI8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMud2lucykpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj4ke190KCd2aWN0b3JpZXMnKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMubG9zc2VzKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPiR7X3QoJ2RlZmVhdHMnKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMud2luUmF0ZSkpfSU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+V2luIFJhdGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXN0YXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+ICR7X3QoJ2Zhdm9yaXRlX2NoYW1waW9uJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX25hbWVcIj4ke2VzY2FwZUh0bWwoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5uYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fcm9sZVwiPiR7ZXNjYXBlSHRtbChkYXRhLmZhdm9yaXRlQ2hhcmFjdGVyLnJvbGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19jb3VudFwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5nYW1lc1BsYXllZCkpfSAke190KCdnYW1lcycpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubGFzdFRlYW0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlcnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+ICR7X3QoJ2xhc3RfdGVhbScpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5sYXN0VGVhbS5tYXAoYyA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX21lbWJlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoYy5uYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fcm9sZVwiPiR7ZXNjYXBlSHRtbChjLnJvbGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEucmVjZW50QmF0dGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zaGllbGQtYWx0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiAke190KCdoaXN0b3J5Jyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5yZWNlbnRCYXR0bGVzLm1hcChiID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYXJlbmEvcmVwbGF5LyR7cGFyc2VJbnQoYi5pZCwgMTApfVwiIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19lbnRyeSAke3Jlc3VsdENsYXNzKGIucmVzdWx0KX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fcmVzdWx0XCI+JHtyZXN1bHRMYWJlbChiLnJlc3VsdCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19vcHBvbmVudFwiPnZzICR7ZXNjYXBlSHRtbChiLm9wcG9uZW50KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX3R5cGVcIj4ke2VzY2FwZUh0bWwoYi5tYXRjaFR5cGUpLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19kYXRlXCI+JHtlc2NhcGVIdG1sKGIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsYXkgcHJvZmlsZS1oaXN0b3J5X19yZXBsYXlcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZW1wdHlcIj4ke190KCdub19iYXR0bGUnKX08L3A+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9wcm9maWxlXCIgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lZGl0LWxpbmtcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wZW5cIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+ICR7X3QoJ2VkaXRfcHJvZmlsZScpfVxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIiwiLyoqXHJcbiAqIENvbWJhdCBBbmltYXRpb24gQ29udHJvbGxlclxyXG4gKiBHw6hyZSBsJ2FmZmljaGFnZSBwcm9ncmVzc2lmIGRlcyBsb2dzIGRlIGNvbWJhdCBhdmVjIGFuaW1hdGlvbnNcclxuICovXHJcbmNsYXNzIENvbWJhdENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5sb2dzID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAxO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyRWxlbWVudHMgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlck1heEhQID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGVzIGxvZ3MgZGVwdWlzIGwnYXR0cmlidXQgZGF0YVxyXG4gICAgICAgIGNvbnN0IGxvZ3NEYXRhID0gdGhpcy5jb250YWluZXIuZGF0YXNldC5jb21iYXRMb2dzO1xyXG4gICAgICAgIGlmIChsb2dzRGF0YSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dzID0gSlNPTi5wYXJzZShsb2dzRGF0YSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBwYXJzaW5nIGxvZ3M6JywgZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFLDqWN1cMOpcmVyIGxlcyDDqWzDqW1lbnRzXHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtbG9nXScpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1vdmVybGF5XScpO1xyXG4gICAgICAgIHRoaXMucGxheUJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1wbGF5XScpO1xyXG4gICAgICAgIHRoaXMuc2tpcEJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1za2lwXScpO1xyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29tYmF0LXNwZWVkXScpO1xyXG5cclxuICAgICAgICAvLyBNYXAgZGVzIHBlcnNvbm5hZ2VzIGF2ZWMgc3RvY2thZ2UgZGVzIEhQIG1heCBpbml0aWF1eFxyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFAgPSB7fTtcclxuICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnMgPSB7fTsgLy8gU3VpdmkgZGVzIGNvb2xkb3ducyBlbiBjb3Vyc1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNoYXJhY3Rlci1uYW1lXScpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJOYW1lO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJUZWFtO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1trZXldID0gZWw7XHJcblxyXG4gICAgICAgICAgICAvLyBFeHRyYWlyZSBsZSBIUCBtYXggZGVwdWlzIGxlIHRleHRlIGluaXRpYWxcclxuICAgICAgICAgICAgY29uc3QgaHBUZXh0ID0gZWwucXVlcnlTZWxlY3RvcignLmhwLXRleHQnKTtcclxuICAgICAgICAgICAgaWYgKGhwVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBocFRleHQudGV4dENvbnRlbnQubWF0Y2goLyhcXGQrKVxcLyhcXGQrKS8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUFtrZXldID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgw6lsw6ltZW50cyBkJ2FiaWxpdHkgZGFucyBsZXMgaW5mbyBwYW5lbHNcclxuICAgICAgICB0aGlzLmFiaWxpdHlFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGFyYWN0ZXItaW5mb1tkYXRhLWNoYXItbmFtZV0nKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsLmRhdGFzZXQuY2hhck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJUZWFtO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUVsID0gZWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5Jyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWw6IGFiaWxpdHlFbCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhDZDogcGFyc2VJbnQoYWJpbGl0eUVsLmRhdGFzZXQuYWJpbGl0eU1heENkKSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhZGdlOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LWNkLWJhZGdlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZUVsOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LW5hbWUnKSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uRWw6IGFiaWxpdHlFbC5xdWVyeVNlbGVjdG9yKCdpJyksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENhY2hlciBsJ292ZXJsYXlcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZpZGVyIGxlIGxvZ1xyXG4gICAgICAgIGlmICh0aGlzLmxvZ0NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyBMYW5jZXIgYXV0b21hdGlxdWVtZW50IGFwcsOocyB1biBkw6lsYWlcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGxheSgpLCA4MDApO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheUJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZVBsYXkoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5za2lwQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2tpcCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuc2V0U3BlZWQoZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nICYmICF0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTmV4dExvZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVBsYXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZyB8fCB0aGlzLmlzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2tpcCgpIHtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gQWZmaWNoZXIgdG91cyBsZXMgbG9ncyByZXN0YW50c1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9nID0gdGhpcy5sb2dzW3RoaXMuY3VycmVudEluZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TG9nKGxvZyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNrQWJpbGl0eUNvb2xkb3ducyhsb2cpO1xyXG4gICAgICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdkZWF0aCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zaG93VmljdG9yeU92ZXJsYXkoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTcGVlZChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHNwZWVkID0gcGFyc2VGbG9hdChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY29tYmF0U3BlZWQpO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbCdVSVxyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zLmZvckVhY2goYnRuID0+IGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTmV4dExvZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nIHx8IHRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmljdG9yeU92ZXJsYXkoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZyA9IHRoaXMubG9nc1t0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTG9nKGxvZyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsZXIgbGUgZMOpbGFpXHJcbiAgICAgICAgbGV0IGRlbGF5ID0gdGhpcy5nZXREZWxheUZvckxvZyhsb2cpO1xyXG4gICAgICAgIGRlbGF5ID0gZGVsYXkgLyB0aGlzLnNwZWVkO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvY2Vzc05leHRMb2coKSwgZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlbGF5Rm9yTG9nKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncm91bmQnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAnaW5pdGlhdGl2ZSc6IHJldHVybiA0MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzogcmV0dXJuIDE4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlZmVuZCc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdkb2RnZSc6IHJldHVybiAxMjAwO1xyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0JzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZpY3RvcnknOlxyXG4gICAgICAgICAgICBjYXNlICdkcmF3JzogcmV0dXJuIDEwMDA7XHJcbiAgICAgICAgICAgIC8vIE5vdXZlYXV4IHR5cGVzXHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOiByZXR1cm4gODAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6IHJldHVybiA4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW5uZWRfc2tpcCc6IHJldHVybiAxMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2FjdGl2YXRlJzogcmV0dXJuIDEyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzogcmV0dXJuIHRoaXMuZ2V0QWJpbGl0eURlbGF5KGxvZyk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiA4MDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFiaWxpdHlEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdtYXJrJzogcmV0dXJuIDEyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYnVmZic6XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlbGZfYnVmZic6XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0ZWFsdGgnOiByZXR1cm4gMTIwMDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfaGVhbCc6IHJldHVybiAxODAwO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9idWZmJzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzogcmV0dXJuIDE4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3RfZG9kZ2UnOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6IHJldHVybiA4MDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAxMjAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTG9nKGxvZykge1xyXG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbihsb2cpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUxvZyhsb2cpO1xyXG5cclxuICAgICAgICAvLyBTeW5jaHJvbmlzZXIgbGEgbWlzZSDDoCBqb3VyIGRlcyBIUCBhdmVjIGwnYW5pbWF0aW9uXHJcbiAgICAgICAgY29uc3QgaHBEZWxheSA9IHRoaXMuZ2V0SFBVcGRhdGVEZWxheShsb2cpO1xyXG4gICAgICAgIGlmIChocERlbGF5ID4gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpLCBocERlbGF5IC8gdGhpcy5zcGVlZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTdWl2aSBkZXMgY29vbGRvd25zXHJcbiAgICAgICAgdGhpcy50cmFja0FiaWxpdHlDb29sZG93bnMobG9nKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFja0FiaWxpdHlDb29sZG93bnMobG9nKSB7XHJcbiAgICAgICAgLy8gUXVhbmQgdW5lIGNvbXDDqXRlbmNlIGVzdCB1dGlsaXPDqWUsIG1ldHRyZSBlbiBjb29sZG93blxyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2FiaWxpdHlfdXNlJyAmJiBsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eURhdGEgPSB0aGlzLmFiaWxpdHlFbGVtZW50c1trZXldO1xyXG4gICAgICAgICAgICBpZiAoYWJpbGl0eURhdGEgJiYgYWJpbGl0eURhdGEubWF4Q2QgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XSA9IGFiaWxpdHlEYXRhLm1heENkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5KGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEEgY2hhcXVlIG5vdXZlYXUgcm91bmQsIGTDqWNyw6ltZW50ZXIgdG91cyBsZXMgY29vbGRvd25zXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAncm91bmQnKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuYWJpbGl0eUNvb2xkb3ducykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldLS07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5KGtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheShrZXkpIHtcclxuICAgICAgICBjb25zdCBhYmlsaXR5RGF0YSA9IHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgaWYgKCFhYmlsaXR5RGF0YSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjZCA9IHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldIHx8IDA7XHJcblxyXG4gICAgICAgIGlmIChjZCA+IDApIHtcclxuICAgICAgICAgICAgLy8gRW4gY29vbGRvd24gOiBncmlzZXIgKyBhZmZpY2hlciBiYWRnZVxyXG4gICAgICAgICAgICBhYmlsaXR5RGF0YS5lbC5jbGFzc0xpc3QuYWRkKCdjaGFyYWN0ZXItaW5mb19fYWJpbGl0eS0tb24tY2QnKTtcclxuICAgICAgICAgICAgaWYgKGFiaWxpdHlEYXRhLmJhZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBhYmlsaXR5RGF0YS5iYWRnZS50ZXh0Q29udGVudCA9IGAke2NkfVRgO1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eURhdGEuYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gUHLDqnQgOiByZXRpcmVyIGxlIGdyaXNcclxuICAgICAgICAgICAgYWJpbGl0eURhdGEuZWwuY2xhc3NMaXN0LnJlbW92ZSgnY2hhcmFjdGVyLWluZm9fX2FiaWxpdHktLW9uLWNkJyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RGF0YS5iYWRnZSkge1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eURhdGEuYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRIUFVwZGF0ZURlbGF5KGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6IHJldHVybiA0MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzogcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOiByZXR1cm4gMjAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYWN0aXZhdGUnOiByZXR1cm4gMzUwO1xyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6IHJldHVybiB0aGlzLmdldEFiaWxpdHlIUERlbGF5KGxvZyk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBYmlsaXR5SFBEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfaGVhbCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzogcmV0dXJuIDQwMDtcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QW5pbWF0aW9uKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuYXR0YWNrZXIsIGxvZy5hdHRhY2tlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cuaXNDcml0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmhlYWxlciwgbG9nLmhlYWxlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVmZW5kKGxvZy5kZWZlbmRlciwgbG9nLmRlZmVuZGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9kZ2UobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBOb3V2ZWF1eCB0eXBlc1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVubmVkX3NraXAnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3R1bm5lZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmF0dGFja2VyLCBsb2cuYXR0YWNrZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheUFiaWxpdHlBbmltYXRpb24obG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gTk9VVkVMTEVTIEFOSU1BVElPTlMgPT09XHJcblxyXG4gICAgYW5pbWF0ZURvVCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtLCBkb3RDbGFzcykge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKGRvdENsYXNzKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShkb3RDbGFzcyksIDYwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVTdHVubmVkKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc3R1bm5lZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdzdHVubmVkJyksIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVNYXJrZWQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdtYXJrZWQnKTtcclxuICAgICAgICAgICAgLy8gTGEgbWFycXVlIHJlc3RlIHZpc2libGUgcGx1cyBsb25ndGVtcHNcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbWFya2VkJyksIDIwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlQnVmZih0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2J1ZmZlZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdidWZmZWQnKSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVN0ZWFsdGgodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzdGVhbHRoZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc3RlYWx0aGVkJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QWJpbGl0eUFuaW1hdGlvbihsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJyksIDQwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsaWdodGVkJyksIDQwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZVN0dW5uZWQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pLCA0MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcmsnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHRoaXMuYW5pbWF0ZU1hcmtlZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWxmX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVIZWFsKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWVyIHRvdXMgbGVzIGFsbGnDqXMgc29pZ27DqXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9nLmhlYWxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2cuaGVhbGVkLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChoLm5hbWUsIGgudGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdoZWFsZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxlZCcpLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICAvLyBBbmltZXIgdG91cyBsZXMgYWxsacOpcyBkdSBtw6ptZSBjw7R0w6lcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVRlYW1CdWZmKGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdGVhbHRoJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVTdGVhbHRoKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy5pc0NyaXQgfHwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3RfZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZURlZmVuZChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnKSwgNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVRlYW1CdWZmKGNhc3RlclRlYW0pIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmNoYXJhY3RlckVsZW1lbnRzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChjYXN0ZXJUZWFtKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdidWZmZWQnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnYnVmZmVkJyksIDgwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gQU5JTUFUSU9OUyBFWElTVEFOVEVTID09PVxyXG5cclxuICAgIGFuaW1hdGVBdHRhY2soYXR0YWNrZXJOYW1lLCBhdHRhY2tlclRlYW0sIHRhcmdldE5hbWUsIHRhcmdldFRlYW0sIGlzQ3JpdCkge1xyXG4gICAgICAgIGNvbnN0IGF0dGFja2VyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGF0dGFja2VyTmFtZSwgYXR0YWNrZXJUZWFtKTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcblxyXG4gICAgICAgIGlmIChhdHRhY2tlcikge1xyXG4gICAgICAgICAgICBhdHRhY2tlci5jbGFzc0xpc3QuYWRkKCdhdHRhY2tpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBhdHRhY2tlci5jbGFzc0xpc3QucmVtb3ZlKCdhdHRhY2tpbmcnKSwgNjAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ3JpdCkgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NyaXQnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnLCAnY3JpdCcpLCA0MDApO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlSGVhbChoZWFsZXJOYW1lLCBoZWFsZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgaGVhbGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGhlYWxlck5hbWUsIGhlYWxlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGhlYWxlcikge1xyXG4gICAgICAgICAgICBoZWFsZXIuY2xhc3NMaXN0LmFkZCgnaGVhbGluZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGhlYWxlci5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsaW5nJyksIDgwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdoZWFsZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaGVhbGVkJyksIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEZWZlbmQoZGVmZW5kZXJOYW1lLCBkZWZlbmRlclRlYW0pIHtcclxuICAgICAgICBjb25zdCBkZWZlbmRlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChkZWZlbmRlck5hbWUsIGRlZmVuZGVyVGVhbSk7XHJcbiAgICAgICAgaWYgKGRlZmVuZGVyKSB7XHJcbiAgICAgICAgICAgIGRlZmVuZGVyLmNsYXNzTGlzdC5hZGQoJ2RlZmVuZGluZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGRlZmVuZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlZmVuZGluZycpLCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURvZGdlKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZG9kZ2luZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkb2RnaW5nJyksIDYwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEZWF0aCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RlYWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hhcmFjdGVyRWxlbWVudChuYW1lLCB0ZWFtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcmFjdGVyRWxlbWVudHNbYCR7dGVhbX0tJHtuYW1lfWBdO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlMb2cobG9nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvZ0NvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBlbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBlbnRyeS5jbGFzc05hbWUgPSAnY29tYmF0LWxvZ19fZW50cnknO1xyXG5cclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdyb3VuZCcpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXJvdW5kJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3ZpY3RvcnknKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS12aWN0b3J5Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2RyYXcnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1kZWZlYXQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYWJpbGl0eV91c2UnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1hYmlsaXR5Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsZWVkX3RpY2snKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1ibGVlZCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdibGlnaHRfdGljaycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWJsaWdodCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdzdHVubmVkX3NraXAnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1zdHVuJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3JpcG9zdGVfYWN0aXZhdGUnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1yaXBvc3RlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbnRyeS5pbm5lckhUTUwgPSBsb2cubWVzc2FnZTtcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsVG9wID0gdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUhlYWx0aEJhcnMobG9nKSB7XHJcbiAgICAgICAgbGV0IGNoYXJhY3Rlck5hbWUgPSBudWxsO1xyXG4gICAgICAgIGxldCB0ZWFtTmFtZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRIUCA9IG51bGw7XHJcbiAgICAgICAgbGV0IG1heEhQID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gRMOpdGVybWluZXIgbGVzIGRvbm7DqWVzIHNlbG9uIGxlIHR5cGUgZGUgbG9nXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAnYXR0YWNrJyB8fCBsb2cudHlwZSA9PT0gJ3JpcG9zdGVfYWN0aXZhdGUnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdoZWFsJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYmxlZWRfdGljaycgfHwgbG9nLnR5cGUgPT09ICdibGlnaHRfdGljaycpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2FiaWxpdHlfdXNlJykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIHNpIG5vdXMgYXZvbnMgbGVzIGRvbm7DqWVzIG7DqWNlc3NhaXJlc1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJOYW1lICYmIHRlYW1OYW1lICYmIGN1cnJlbnRIUCAhPT0gbnVsbCAmJiBjdXJyZW50SFAgIT09IHVuZGVmaW5lZCAmJiBtYXhIUCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsIG1heEhQKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQWJpbGl0eUhlYWx0aEJhcnMobG9nKSB7XHJcbiAgICAgICAgLy8gQ29tcMOpdGVuY2VzIHF1aSBpbmZsaWdlbnQgZGVzIGTDqWfDonRzIMOgIHVuZSBjaWJsZVxyXG4gICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRIUCAhPT0gdW5kZWZpbmVkICYmIGxvZy50YXJnZXRNYXhIUCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cudGFyZ2V0SFAsIGxvZy50YXJnZXRNYXhIUCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTb2luIGRlIGdyb3VwZSA6IG1ldHRyZSDDoCBqb3VyIGNoYXF1ZSBhbGxpw6kgc29pZ27DqVxyXG4gICAgICAgIGlmIChsb2cuc3VidHlwZSA9PT0gJ3BhcnR5X2hlYWwnICYmIGxvZy5oZWFsZWQpIHtcclxuICAgICAgICAgICAgbG9nLmhlYWxlZC5mb3JFYWNoKGggPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChoLm5hbWUsIGgudGVhbSwgaC5ocCwgaC5tYXhIcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU29pbiBkJ3VyZ2VuY2UgOiBtZXR0cmUgw6Agam91ciBsZSBsYW5jZXVyXHJcbiAgICAgICAgaWYgKGxvZy5zdWJ0eXBlID09PSAnZW1lcmdlbmN5X2hlYWwnICYmIGxvZy5jYXN0ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldEhQLCBsb2cudGFyZ2V0TWF4SFApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDaGFyYWN0ZXJIUChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCBtYXhIUCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSk7XHJcblxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBtYXhIUCA+IDAgPyAoY3VycmVudEhQIC8gbWF4SFApICogMTAwIDogMDtcclxuXHJcbiAgICAgICAgLy8gTWlzZSDDoCBqb3VyIGRlIGxhIGJhcnJlIEhQIGRhbnMgbGEgem9uZSBkZSBjb21iYXQgKGJhdHRsZS1zdGFnZSlcclxuICAgICAgICBjb25zdCBocEJhciA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuaHAtYmFyX19maWxsJyk7XHJcbiAgICAgICAgY29uc3QgaHBUZXh0ID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcblxyXG4gICAgICAgIGlmIChocEJhcikge1xyXG4gICAgICAgICAgICAvLyBBbmltYXRpb24gZmx1aWRlIGRlIGxhIGJhcnJlXHJcbiAgICAgICAgICAgIGhwQmFyLnN0eWxlLnRyYW5zaXRpb24gPSBgd2lkdGggMC4zcyBlYXNlLW91dGA7XHJcbiAgICAgICAgICAgIGhwQmFyLnN0eWxlLndpZHRoID0gYCR7cGVyY2VudH0lYDtcclxuXHJcbiAgICAgICAgICAgIC8vIENsYXNzZXMgZGUgY291bGV1ciBzZWxvbiBsZSBwb3VyY2VudGFnZVxyXG4gICAgICAgICAgICBocEJhci5jbGFzc0xpc3QucmVtb3ZlKCdocC1iYXJfX2ZpbGwtLWxvdycsICdocC1iYXJfX2ZpbGwtLWNyaXRpY2FsJyk7XHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50IDw9IDI1KSB7XHJcbiAgICAgICAgICAgICAgICBocEJhci5jbGFzc0xpc3QuYWRkKCdocC1iYXJfX2ZpbGwtLWNyaXRpY2FsJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGVyY2VudCA8PSA1MCkge1xyXG4gICAgICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LmFkZCgnaHAtYmFyX19maWxsLS1sb3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhwVGV4dCkge1xyXG4gICAgICAgICAgICBocFRleHQudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50SFB9LyR7bWF4SFB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1pc2Ugw6Agam91ciBkZXMgcGFubmVhdXggZCdpbmZvIGxhdMOpcmF1eFxyXG4gICAgICAgIHRoaXMudXBkYXRlSW5mb1BhbmVsKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUluZm9QYW5lbChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQKSB7XHJcbiAgICAgICAgLy8gVHJvdXZlciBsZSBib24gcGFubmVhdSBzZWxvbiBsJ8OpcXVpcGVcclxuICAgICAgICBjb25zdCBwYW5lbENsYXNzID0gdGVhbU5hbWUgPT09ICdFcXVpcGUgMScgPyAnLmluZm8tcGFuZWwtLXRlYW0xJyA6ICcuaW5mby1wYW5lbC0tdGVhbTInO1xyXG4gICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihwYW5lbENsYXNzKTtcclxuXHJcbiAgICAgICAgaWYgKCFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBUcm91dmVyIGxlIHBlcnNvbm5hZ2UgZGFucyBsZSBwYW5uZWF1IHBhciBzb24gbm9tXHJcbiAgICAgICAgY29uc3QgY2hhcmFjdGVySW5mb3MgPSBwYW5lbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hhcmFjdGVyLWluZm8nKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGluZm8gb2YgY2hhcmFjdGVySW5mb3MpIHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZUVsID0gaW5mby5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX25hbWUnKTtcclxuICAgICAgICAgICAgaWYgKG5hbWVFbCAmJiBuYW1lRWwudGV4dENvbnRlbnQudHJpbSgpID09PSBjaGFyYWN0ZXJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0c1NwYW4gPSBpbmZvLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fc3RhdHMgc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRzU3Bhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzU3Bhbi50ZXh0Q29udGVudCA9IGN1cnJlbnRIUDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGZsYXNoIHBvdXIgbW9udHJlciBsZSBjaGFuZ2VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNTcGFuLmNsYXNzTGlzdC5hZGQoJ2hwLXVwZGF0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHN0YXRzU3Bhbi5jbGFzc0xpc3QucmVtb3ZlKCdocC11cGRhdGVkJyksIDMwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93VmljdG9yeU92ZXJsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmluYWxpc2VyIGxlIE1NUiBhIGxhIGZpbiBkdSBjb21iYXRcclxuICAgICAgICB0aGlzLmZpbmFsaXplUmF0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluYWxpemVSYXRpbmcoKSB7XHJcbiAgICAgICAgY29uc3QgZmluYWxpemVVcmwgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmZpbmFsaXplVXJsO1xyXG4gICAgICAgIGlmICghZmluYWxpemVVcmwpIHJldHVybjtcclxuXHJcbiAgICAgICAgZmV0Y2goZmluYWxpemVVcmwsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyAmJiBkYXRhLnJhdGluZ0NoYW5nZSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmF0aW5nVXBkYXRlKGRhdGEucmF0aW5nQ2hhbmdlLCBkYXRhLm5ld1JhdGluZywgZGF0YS5uZXdSYXRpbmcyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKCdFcnJldXIgZmluYWxpc2F0aW9uIHJhdGluZzonLCBlcnIpKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93UmF0aW5nVXBkYXRlKGNoYW5nZSwgbmV3UmF0aW5nLCBuZXdSYXRpbmcyKSB7XHJcbiAgICAgICAgLy8gTWV0dHJlIGEgam91ciBsZSBNTVIgYWZmaWNoZSBkYW5zIGxlIHBhbm5lYXUgam91ZXVyIChFcXVpcGUgMSlcclxuICAgICAgICBjb25zdCByYXRpbmdFbCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXBhbmVsLS10ZWFtMSAuaW5mby1wYW5lbF9fcmF0aW5nJyk7XHJcbiAgICAgICAgaWYgKHJhdGluZ0VsICYmIG5ld1JhdGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByYXRpbmdFbC5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke25ld1JhdGluZ30gTU1SYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSBhIGpvdXIgbGUgTU1SIGFmZmljaGUgZGFucyBsZSBwYW5uZWF1IGFkdmVyc2FpcmUgKEVxdWlwZSAyKVxyXG4gICAgICAgIGNvbnN0IHJhdGluZ0VsMiA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXBhbmVsLS10ZWFtMiAuaW5mby1wYW5lbF9fcmF0aW5nLS1lbmVteScpO1xyXG4gICAgICAgIGlmIChyYXRpbmdFbDIgJiYgbmV3UmF0aW5nMiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByYXRpbmdFbDIuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHtuZXdSYXRpbmcyfSBNTVJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWZmaWNoZXIgbGEgbm90aWZpY2F0aW9uIGRlIGNoYW5nZW1lbnQgZGFucyBsJ292ZXJsYXlcclxuICAgICAgICBjb25zdCBvdmVybGF5ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LW92ZXJsYXldJyk7XHJcbiAgICAgICAgaWYgKG92ZXJsYXkpIHtcclxuICAgICAgICAgICAgY29uc3Qgd2lubmVyRGl2ID0gb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcuYmF0dGxlLXN0YWdlX193aW5uZXInKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoYW5nZW1lbnQgTU1SIEVxdWlwZSAxXHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBub3RpZjEuY2xhc3NOYW1lID0gJ3JhdGluZy1jaGFuZ2UnO1xyXG4gICAgICAgICAgICBub3RpZjEuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MS4ycmVtO21hcmdpbi10b3A6MTJweDtmb250LXdlaWdodDpib2xkO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgMC41czsnO1xyXG4gICAgICAgICAgICBub3RpZjEudGV4dENvbnRlbnQgPSBjaGFuZ2UgPiAwID8gYEVxdWlwZSAxIDogKyR7Y2hhbmdlfSBNTVJgIDogYEVxdWlwZSAxIDogJHtjaGFuZ2V9IE1NUmA7XHJcbiAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5jb2xvciA9IGNoYW5nZSA+IDAgPyAnIzRjYWY1MCcgOiAnI2Y0NDMzNic7XHJcbiAgICAgICAgICAgIHdpbm5lckRpdi5hcHBlbmRDaGlsZChub3RpZjEpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hhbmdlbWVudCBNTVIgRXF1aXBlIDIgKGludmVyc2UpXHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZTIgPSAtY2hhbmdlO1xyXG4gICAgICAgICAgICBjb25zdCBub3RpZjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbm90aWYyLmNsYXNzTmFtZSA9ICdyYXRpbmctY2hhbmdlJztcclxuICAgICAgICAgICAgbm90aWYyLnN0eWxlLmNzc1RleHQgPSAnZm9udC1zaXplOjEuMnJlbTttYXJnaW4tdG9wOjZweDtmb250LXdlaWdodDpib2xkO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgMC41czsnO1xyXG4gICAgICAgICAgICBub3RpZjIudGV4dENvbnRlbnQgPSBjaGFuZ2UyID4gMCA/IGBFcXVpcGUgMiA6ICske2NoYW5nZTJ9IE1NUmAgOiBgRXF1aXBlIDIgOiAke2NoYW5nZTJ9IE1NUmA7XHJcbiAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5jb2xvciA9IGNoYW5nZTIgPiAwID8gJyM0Y2FmNTAnIDogJyNmNDQzMzYnO1xyXG4gICAgICAgICAgICB3aW5uZXJEaXYuYXBwZW5kQ2hpbGQobm90aWYyKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90aWYxLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgICAgICBub3RpZjIuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUGxheUJ1dHRvbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheUJ0bikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBfdCA9IHdpbmRvdy5fdCB8fCAoayA9PiBrKTtcclxuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcgJiYgIXRoaXMuaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gX3QoJ3BhdXNlJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9IF90KCdmaW5pc2hlZCcpO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9IHRoaXMuY3VycmVudEluZGV4ID4gMCA/IF90KCdyZXN1bWUnKSA6IF90KCdzdGFydCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gSW5pdGlhbGlzZXIgcXVhbmQgbGUgRE9NIGVzdCBwcsOqdFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgY29tYmF0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LWxvZ3NdJyk7XHJcbiAgICBpZiAoY29tYmF0Q29udGFpbmVyKSB7XHJcbiAgICAgICAgbmV3IENvbWJhdENvbnRyb2xsZXIoY29tYmF0Q29udGFpbmVyKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21iYXRDb250cm9sbGVyO1xyXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBGUklFTkQgU1lTVEVNXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYudGV4dENvbnRlbnQgPSBzdHI7XHJcbiAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtdG9nZ2xlXScpO1xyXG4gICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXBhbmVsXScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWJhY2tkcm9wXScpO1xyXG4gICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNsb3NlXScpO1xyXG4gICAgY29uc3QgYmFkZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWJhZGdlXScpO1xyXG5cclxuICAgIGlmICghdG9nZ2xlIHx8ICFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgIGxldCBwYW5lbE9wZW4gPSBmYWxzZTtcclxuICAgIGxldCBjdXJyZW50VGFiID0gJ2ZyaWVuZHMnO1xyXG4gICAgbGV0IGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSBudWxsO1xyXG4gICAgbGV0IGxhc3RNZXNzYWdlSWQgPSAwO1xyXG4gICAgbGV0IG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgbGV0IHVucmVhZFBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICBsZXQgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHJlcXVlc3RzTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBQQU5FTCBPUEVOL0NMT1NFXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIG9wZW5QYW5lbCgpIHtcclxuICAgICAgICBwYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHBhbmVsLm9mZnNldEhlaWdodDsgLy8gcmVmbG93XHJcbiAgICAgICAgcGFuZWwuY2xhc3NMaXN0LmFkZCgnZnJpZW5kcy1wYW5lbC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ2ZyaWVuZHMtcGFuZWxfX2JhY2tkcm9wLS1vcGVuJyk7XHJcbiAgICAgICAgcGFuZWxPcGVuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCFmcmllbmRzTG9hZGVkKSB7XHJcbiAgICAgICAgICAgIGxvYWRGcmllbmRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUGFuZWwoKSB7XHJcbiAgICAgICAgcGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnZnJpZW5kcy1wYW5lbC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2ZyaWVuZHMtcGFuZWxfX2JhY2tkcm9wLS1vcGVuJyk7XHJcbiAgICAgICAgcGFuZWxPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwYW5lbE9wZW4gPyBjbG9zZVBhbmVsKCkgOiBvcGVuUGFuZWwoKSk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUGFuZWwpO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBhbmVsKTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFRBQlNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZnJpZW5kcy10YWJdJykuZm9yRWFjaCh0YWJCdG4gPT4ge1xyXG4gICAgICAgIHRhYkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFiTmFtZSA9IHRhYkJ0bi5kYXRhc2V0LmZyaWVuZHNUYWI7XHJcbiAgICAgICAgICAgIHN3aXRjaFRhYih0YWJOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXRjaFRhYih0YWJOYW1lKSB7XHJcbiAgICAgICAgY3VycmVudFRhYiA9IHRhYk5hbWU7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZyaWVuZHMtdGFiXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ2ZyaWVuZHMtcGFuZWxfX3RhYi0tYWN0aXZlJywgYnRuLmRhdGFzZXQuZnJpZW5kc1RhYiA9PT0gdGFiTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYi1jb250ZW50XScpLmZvckVhY2goY29udGVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IGNvbnRlbnQuZGF0YXNldC50YWJDb250ZW50ID09PSB0YWJOYW1lID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX3RhYnMnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19jb250ZW50Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jb252ZXJzYXRpb25dJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKHRhYk5hbWUgPT09ICdmcmllbmRzJyAmJiAhZnJpZW5kc0xvYWRlZCkgbG9hZEZyaWVuZHMoKTtcclxuICAgICAgICBpZiAodGFiTmFtZSA9PT0gJ3JlcXVlc3RzJyAmJiAhcmVxdWVzdHNMb2FkZWQpIGxvYWRSZXF1ZXN0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTE9BRCBGUklFTkRTIExJU1RcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gbG9hZEZyaWVuZHMoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGFiLWNvbnRlbnQ9XCJmcmllbmRzXCJdJyk7XHJcbiAgICAgICAgY29uc3QgX3QgPSB3aW5kb3cuX3QgfHwgKGsgPT4gayk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gJHtfdCgnbG9hZGluZycpfTwvZGl2PmA7XHJcblxyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy9saXN0Jywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZyaWVuZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYDxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj48aSBjbGFzcz1cImZhcyBmYS1naG9zdFwiPjwvaT4gJHtfdCgnbm9fY29tcGFuaW9ucycpfTwvcD5gO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gZGF0YS5mcmllbmRzLm1hcChmID0+IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiIGRhdGEtZnJpZW5kLXVzZXItaWQ9XCIke2YudXNlcklkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7Zi5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKGYucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwoZi51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKGYudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcHJldmlld1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtmLmxhc3RNZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoZi5sYXN0TWVzc2FnZS5pc0Zyb21NZSA/IF90KCd5b3VfcHJlZml4JykgOiAnJykgKyBlc2NhcGVIdG1sKGYubGFzdE1lc3NhZ2UuY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IF90KCdub19tZXNzYWdlJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19yYXRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7Zi5yYXRpbmd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mcmllbmQtaXRlbScpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9IHBhcnNlSW50KGl0ZW0uZGF0YXNldC5mcmllbmRVc2VySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmQtaXRlbV9fbmFtZScpLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Db252ZXJzYXRpb24odXNlcklkLCBuYW1lKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPiR7X3QoJ2xvYWRpbmdfZXJyb3InKX08L3A+YDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIExPQUQgUEVORElORyBSRVFVRVNUU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBsb2FkUmVxdWVzdHMoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGFiLWNvbnRlbnQ9XCJyZXF1ZXN0c1wiXScpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBgPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+ICR7X3QoJ2xvYWRpbmcnKX08L2Rpdj5gO1xyXG5cclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvcGVuZGluZycsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVxdWVzdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYDxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj4ke190KCdub19yZXF1ZXN0cycpfTwvcD5gO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gZGF0YS5yZXF1ZXN0cy5tYXAociA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIiBkYXRhLXJlcXVlc3QtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ci5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKHIucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwoci51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKHIudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcHJldmlld1wiPiR7ZXNjYXBlSHRtbChyLmRhdGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2FjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tYWNjZXB0XCIgZGF0YS1hY2NlcHQtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2tcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1yZWplY3RcIiBkYXRhLXJlamVjdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWNjZXB0LWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVSZXF1ZXN0KGJ0bi5kYXRhc2V0LmFjY2VwdElkLCAnYWNjZXB0Jyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmVqZWN0LWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVSZXF1ZXN0KGJ0bi5kYXRhc2V0LnJlamVjdElkLCAncmVqZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gYDxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj4ke190KCdsb2FkaW5nX2Vycm9yJyl9PC9wPmA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChmcmllbmRzaGlwSWQsIGFjdGlvbikge1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy8ke2FjdGlvbn0vJHtmcmllbmRzaGlwSWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsb2FkUmVxdWVzdHMoKTtcclxuICAgICAgICAgICAgICAgIGZldGNoVW5yZWFkQ291bnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gU0VBUkNIIFVTRVJTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1zZWFyY2gtaW5wdXRdJyk7XHJcbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1zZWFyY2gtcmVzdWx0c10nKTtcclxuICAgIGxldCBzZWFyY2hUaW1lb3V0ID0gbnVsbDtcclxuXHJcbiAgICBpZiAoc2VhcmNoSW5wdXQpIHtcclxuICAgICAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNlYXJjaFRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChxdWVyeS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmZXRjaChgL2ZyaWVuZHMvc2VhcmNoP3E9JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnkpfWAsIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS51c2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSBgPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPiR7X3QoJ25vX3dhcnJpb3InKX08L3A+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSBkYXRhLnVzZXJzLm1hcCh1ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGlvbkh0bWwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAnYWNjZXB0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gYDxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+JHtfdCgnZnJpZW5kX3N0YXR1cycpfTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAncGVuZGluZ19zZW50Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9IGA8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPiR7X3QoJ3NlbnRfc3RhdHVzJyl9PC9zcGFuPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdwZW5kaW5nX3JlY2VpdmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9IGA8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPiR7X3QoJ3JlY2VpdmVkX3N0YXR1cycpfTwvc3Bhbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9IGA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1hZGRcIiBkYXRhLWFkZC1mcmllbmQtaWQ9XCIke3UudXNlcklkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsdXNcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHt1LnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwodS5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbCh1LnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwodS51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19yYXRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7dS5yYXRpbmd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYWN0aW9uc1wiPiR7YWN0aW9uSHRtbH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFkZC1mcmllbmQtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRGcmllbmRSZXF1ZXN0KGJ0bi5kYXRhc2V0LmFkZEZyaWVuZElkLCBidG4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRGcmllbmRSZXF1ZXN0KHVzZXJJZCwgYnRuKSB7XHJcbiAgICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvcmVxdWVzdC8ke3VzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgYnRuLm91dGVySFRNTCA9IGA8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPiR7X3QoJ3NlbnRfc3RhdHVzJyl9PC9zcGFuPmA7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgYnRuLmRpc2FibGVkID0gZmFsc2U7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlcG9ydE1lc3NhZ2VBY3Rpb24obWVzc2FnZUlkLCBidG4pIHtcclxuICAgICAgICBjb25zdCByZWFzb24gPSBwcm9tcHQoX3QoJ3JlcG9ydF9yZWFzb24nKSk7XHJcbiAgICAgICAgaWYgKHJlYXNvbiA9PT0gbnVsbCkgcmV0dXJuOyAvLyBjYW5jZWxsZWRcclxuXHJcbiAgICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHttZXNzYWdlSWR9L3JlcG9ydGAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWFzb246IHJlYXNvbiB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2tcIj48L2k+JztcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdjaGF0LW1lc3NhZ2VfX3JlcG9ydC0tZG9uZScpO1xyXG4gICAgICAgICAgICAgICAgYnRuLnRpdGxlID0gX3QoJ3JlcG9ydGVkJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgYnRuLmRpc2FibGVkID0gZmFsc2U7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gQ09OVkVSU0FUSU9OXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIG9wZW5Db252ZXJzYXRpb24odXNlcklkLCB1c2VybmFtZSkge1xyXG4gICAgICAgIGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgICAgbGFzdE1lc3NhZ2VJZCA9IDA7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX190YWJzJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fY29udGVudCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgY29uc3QgY29udkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jb252ZXJzYXRpb25dJyk7XHJcbiAgICAgICAgY29udkVsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1uYW1lXScpLnRleHRDb250ZW50ID0gdXNlcm5hbWU7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1tZXNzYWdlc10nKTtcclxuICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9IGA8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gJHtfdCgnbG9hZGluZycpfTwvZGl2PmA7XHJcblxyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke3VzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhkYXRhLm1lc3NhZ2VzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHN0YXJ0TWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJNZXNzYWdlcyhtZXNzYWdlcywgYXBwZW5kKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1tZXNzYWdlc10nKTtcclxuXHJcbiAgICAgICAgaWYgKCFhcHBlbmQpIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSBgPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPiR7X3QoJ3N0YXJ0X2NvbnZlcnNhdGlvbicpfTwvcD5gO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2kgb24gYWpvdXRlIGRlcyBtZXNzYWdlcyBldCBxdWUgbGUgY29udGVuZXVyIGFmZmljaGUgbGUgcGxhY2Vob2xkZXIsIGxlIHN1cHByaW1lclxyXG4gICAgICAgIGlmIChhcHBlbmQgJiYgbWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IG1lc3NhZ2VzRWwucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlcikgcGxhY2Vob2xkZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG1zZyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuaWQgPiBsYXN0TWVzc2FnZUlkKSBsYXN0TWVzc2FnZUlkID0gbXNnLmlkO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjaGF0LW1lc3NhZ2UnLCBtc2cuaXNGcm9tTWUgPyAnY2hhdC1tZXNzYWdlLS1taW5lJyA6ICdjaGF0LW1lc3NhZ2UtLXRoZWlycycpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcG9ydEJ0biA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoIW1zZy5pc0Zyb21NZSkge1xyXG4gICAgICAgICAgICAgICAgcmVwb3J0QnRuID0gYDxidXR0b24gY2xhc3M9XCJjaGF0LW1lc3NhZ2VfX3JlcG9ydFwiIGRhdGEtcmVwb3J0LW1zZy1pZD1cIiR7bXNnLmlkfVwiIHRpdGxlPVwiU2lnbmFsZXIgY2UgbWVzc2FnZVwiPjxpIGNsYXNzPVwiZmFzIGZhLWZsYWdcIj48L2k+PC9idXR0b24+YDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgICR7ZXNjYXBlSHRtbChtc2cuY29udGVudCl9XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoYXQtbWVzc2FnZV9fdGltZVwiPiR7ZXNjYXBlSHRtbChtc2cuZGF0ZSl9ICR7cmVwb3J0QnRufTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgIC8vIEF0dGFjaCByZXBvcnQgaGFuZGxlclxyXG4gICAgICAgICAgICBjb25zdCByZXBvcnRFbCA9IGRpdi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXBvcnQtbXNnLWlkXScpO1xyXG4gICAgICAgICAgICBpZiAocmVwb3J0RWwpIHtcclxuICAgICAgICAgICAgICAgIHJlcG9ydEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydE1lc3NhZ2VBY3Rpb24ocmVwb3J0RWwuZGF0YXNldC5yZXBvcnRNc2dJZCwgcmVwb3J0RWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzRWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbWVzc2FnZXNFbC5zY3JvbGxUb3AgPSBtZXNzYWdlc0VsLnNjcm9sbEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZW5kIG1lc3NhZ2VcclxuICAgIGNvbnN0IHNlbmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tc2VuZF0nKTtcclxuICAgIGNvbnN0IGlucHV0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24taW5wdXRdJyk7XHJcblxyXG4gICAgaWYgKHNlbmRCdG4gJiYgaW5wdXRFbCkge1xyXG4gICAgICAgIHNlbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZW5kTWVzc2FnZSk7XHJcbiAgICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBzZW5kTWVzc2FnZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBpbnB1dEVsLnZhbHVlLnRyaW0oKTtcclxuICAgICAgICBpZiAoIWNvbnRlbnQgfHwgIWN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaW5wdXRFbC52YWx1ZSA9ICcnO1xyXG5cclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHtjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjb250ZW50OiBjb250ZW50IH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyAmJiBkYXRhLm1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKFtkYXRhLm1lc3NhZ2VdLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJhY2sgYnV0dG9uXHJcbiAgICBjb25zdCBiYWNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLWJhY2tdJyk7XHJcbiAgICBpZiAoYmFja0J0bikge1xyXG4gICAgICAgIGJhY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSBudWxsO1xyXG4gICAgICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzd2l0Y2hUYWIoJ2ZyaWVuZHMnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIE1FU1NBR0UgUE9MTElORyAoZXZlcnkgNXMgd2hlbiBjb252ZXJzYXRpb24gb3BlbilcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gc3RhcnRNZXNzYWdlUG9sbGluZygpIHtcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke2N1cnJlbnRDb252ZXJzYXRpb25Vc2VySWR9P2FmdGVySWQ9JHtsYXN0TWVzc2FnZUlkfWAsIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubWVzc2FnZXMgJiYgZGF0YS5tZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTWVzc2FnZXMoZGF0YS5tZXNzYWdlcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDUwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3BNZXNzYWdlUG9sbGluZygpIHtcclxuICAgICAgICBpZiAobWVzc2FnZVBvbGxpbmdJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBVTlJFQUQgQ09VTlQgUE9MTElORyAoZXZlcnkgMzBzLCBhbHdheXMgYWN0aXZlKVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBmZXRjaFVucmVhZENvdW50KCkge1xyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy91bnJlYWQtY291bnQnLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS50b3RhbCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnRleHRDb250ZW50ID0gZGF0YS50b3RhbDtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RzQmFkZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXF1ZXN0cy1iYWRnZV0nKTtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3RzQmFkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnBlbmRpbmdSZXF1ZXN0cyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnRleHRDb250ZW50ID0gZGF0YS5wZW5kaW5nUmVxdWVzdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHt9KTtcclxuICAgIH1cclxuXHJcbiAgICBmZXRjaFVucmVhZENvdW50KCk7XHJcbiAgICB1bnJlYWRQb2xsaW5nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmZXRjaFVucmVhZENvdW50LCAzMDAwMCk7XHJcbn0pO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiX3RyYW5zbGF0aW9ucyIsIl90Iiwia2V5IiwiSlNPTiIsInBhcnNlIiwiZG9jdW1lbnQiLCJib2R5IiwiZGF0YXNldCIsInRyYW5zbGF0aW9ucyIsImUiLCJ3aW5kb3ciLCJlc2NhcGVIdG1sIiwic3RyIiwiZGl2IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY3JlYXRlVGV4dE5vZGUiLCJpbm5lckhUTUwiLCJhZGRFdmVudExpc3RlbmVyIiwiYnVyZ2VyIiwicXVlcnlTZWxlY3RvciIsIm5hdiIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIlNUQVRfTUFYIiwiZG1nIiwic3BlZWQiLCJkb2RnZSIsImNyaXQiLCJocCIsInBvcnRyYWl0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkZXRhaWxzIiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3RlZExpc3QiLCJsYXVuY2hCdG4iLCJsZW5ndGgiLCJtYXhTZWxlY3Rpb24iLCJzZWxlY3RlZEhlcm9lcyIsInNlbGVjdGVkSGVyb0lkcyIsIlJPTEVfQ0FURUdPUklFUyIsImdldFNlbGVjdGVkUm9sZXMiLCJyb2xlcyIsIlRhbmsiLCJEUFMiLCJTdXBwb3J0IiwiZm9yRWFjaCIsImlkIiwicCIsIkFycmF5IiwiZnJvbSIsImZpbmQiLCJwcCIsImNhdCIsInJvbGUiLCJjYW5TZWxlY3RSb2xlIiwicG9ydHJhaXQiLCJyZW1vdmUiLCJhZGQiLCJuYW1lIiwiZG1nTWluIiwiTnVtYmVyIiwiZG1nTWF4Iiwic3ByaXRlRmlsZSIsInNwcml0ZSIsImFiaWxpdHlOYW1lIiwiYWJpbGl0eURlc2MiLCJhYmlsaXR5Q2QiLCJzcHJpdGVQYXRoIiwiY29uY2F0IiwiaXNTZWxlY3RlZCIsImluY2x1ZGVzIiwiYWJpbGl0eUh0bWwiLCJNYXRoIiwibWluIiwiYnRuUmlnaHQiLCJyb2xlQ2F0IiwiYWxyZWFkeVNlbGVjdGVkIiwiZGlzYWJsZWQiLCJ0ZXh0Q29udGVudCIsInJlcGxhY2UiLCJmaWx0ZXIiLCJoaWQiLCJoIiwiYWxlcnQiLCJwdXNoIiwidXBkYXRlU2VsZWN0ZWRUZWFtIiwiaGVybyIsImhlcm9FbCIsInVwZGF0ZVJvbGVJbmRpY2F0b3JzIiwidGVhbUNvbXBsZXRlIiwiaW5kaWNhdG9yIiwic2xvdCIsInNhdmVQcmVzZXRCdG4iLCJwcmVzZXRNb2RhbCIsInByZXNldE5hbWVJbnB1dCIsInByZXNldENvbmZpcm1CdG4iLCJwcmVzZXRDYW5jZWxCdG4iLCJ1cGRhdGVTYXZlUHJlc2V0QnRuIiwib3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0iLCJfb3JpZ1VwZGF0ZSIsIl9vcmlnUm9sZUluZGljYXRvcnMiLCJ2YWx1ZSIsInN0eWxlIiwiZGlzcGxheSIsInNldFRpbWVvdXQiLCJmb2N1cyIsInRyaW0iLCJib3JkZXJDb2xvciIsImZldGNoIiwibWV0aG9kIiwiaGVhZGVycyIsInN0cmluZ2lmeSIsImNoYXJhY3RlcklkcyIsIm1hcCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsInN1Y2Nlc3MiLCJsb2NhdGlvbiIsInJlbG9hZCIsImVycm9yIiwiY2xpY2siLCJsb2FkUHJlc2V0IiwiaWRTdHIiLCJTdHJpbmciLCJkZWxldGVQcmVzZXQiLCJwcmVzZXRJZCIsImNoaXBFbCIsImNvbmZpcm0iLCJsaXN0IiwiY2hpbGRyZW4iLCJfZG9jdW1lbnQkcXVlcnlTZWxlY3QiLCJjaGlwIiwiY2hhcklkcyIsInByZXNldElkcyIsInN0b3BQcm9wYWdhdGlvbiIsInNlbGVjdGVkTGlzdE9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJpIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsInJlc3BvbnNlIiwicmVkaXJlY3RlZCIsImhyZWYiLCJ1cmwiLCJwb3B1cCIsImJhY2tkcm9wIiwiY2xvc2VCdG4iLCJjb250ZW50IiwibG9hZGVkIiwib3BlblBvcHVwIiwib2Zmc2V0SGVpZ2h0IiwiZmV0Y2hQcm9maWxlIiwiY2xvc2VQb3B1cCIsInJlbmRlclByb2ZpbGUiLCJyZXN1bHRDbGFzcyIsInIiLCJyZXN1bHRMYWJlbCIsImF2YXRhckh0bWwiLCJwcm9maWxlSW1hZ2UiLCJ1c2VybmFtZSIsImh0bWwiLCJtb3R0byIsImJpbyIsInJhdGluZyIsInN0YXRzIiwid2lucyIsImxvc3NlcyIsIndpblJhdGUiLCJmYXZvcml0ZUNoYXJhY3RlciIsImdhbWVzUGxheWVkIiwibGFzdFRlYW0iLCJjIiwicmVjZW50QmF0dGxlcyIsImIiLCJwYXJzZUludCIsInJlc3VsdCIsIm9wcG9uZW50IiwibWF0Y2hUeXBlIiwidG9VcHBlckNhc2UiLCJkYXRlIiwiQ29tYmF0Q29udHJvbGxlciIsImNvbnRhaW5lciIsIl9jbGFzc0NhbGxDaGVjayIsImxvZ3MiLCJjdXJyZW50SW5kZXgiLCJpc1BsYXlpbmciLCJpc1BhdXNlZCIsImNoYXJhY3RlckVsZW1lbnRzIiwiY2hhcmFjdGVyTWF4SFAiLCJpbml0IiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJsb2dzRGF0YSIsImNvbWJhdExvZ3MiLCJjb25zb2xlIiwibG9nQ29udGFpbmVyIiwib3ZlcmxheSIsInBsYXlCdG4iLCJza2lwQnRuIiwic3BlZWRCdG5zIiwiYWJpbGl0eUNvb2xkb3ducyIsImVsIiwiY2hhcmFjdGVyTmFtZSIsInRlYW0iLCJjaGFyYWN0ZXJUZWFtIiwiaHBUZXh0IiwibWF0Y2giLCJhYmlsaXR5RWxlbWVudHMiLCJjaGFyTmFtZSIsImNoYXJUZWFtIiwiYWJpbGl0eUVsIiwibWF4Q2QiLCJhYmlsaXR5TWF4Q2QiLCJiYWRnZSIsIm5hbWVFbCIsImljb25FbCIsIm9wYWNpdHkiLCJiaW5kRXZlbnRzIiwicGxheSIsIl90aGlzMiIsInRvZ2dsZVBsYXkiLCJza2lwIiwiYnRuIiwic2V0U3BlZWQiLCJ1cGRhdGVQbGF5QnV0dG9uIiwicHJvY2Vzc05leHRMb2ciLCJwYXVzZSIsImxvZyIsImRpc3BsYXlMb2ciLCJ1cGRhdGVIZWFsdGhCYXJzIiwidHJhY2tBYmlsaXR5Q29vbGRvd25zIiwidHlwZSIsImFuaW1hdGVEZWF0aCIsInRhcmdldCIsInRhcmdldFRlYW0iLCJzaG93VmljdG9yeU92ZXJsYXkiLCJldmVudCIsInBhcnNlRmxvYXQiLCJjdXJyZW50VGFyZ2V0IiwiY29tYmF0U3BlZWQiLCJfdGhpczMiLCJwcm9jZXNzTG9nIiwiZGVsYXkiLCJnZXREZWxheUZvckxvZyIsImdldEFiaWxpdHlEZWxheSIsInN1YnR5cGUiLCJfdGhpczQiLCJwbGF5QW5pbWF0aW9uIiwiaHBEZWxheSIsImdldEhQVXBkYXRlRGVsYXkiLCJjYXN0ZXIiLCJjYXN0ZXJUZWFtIiwiYWJpbGl0eURhdGEiLCJ1cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5IiwiY2QiLCJnZXRBYmlsaXR5SFBEZWxheSIsImFuaW1hdGVBdHRhY2siLCJhdHRhY2tlciIsImF0dGFja2VyVGVhbSIsImlzQ3JpdCIsImFuaW1hdGVIZWFsIiwiaGVhbGVyIiwiaGVhbGVyVGVhbSIsImFuaW1hdGVEZWZlbmQiLCJkZWZlbmRlciIsImRlZmVuZGVyVGVhbSIsImFuaW1hdGVEb2RnZSIsImFuaW1hdGVEb1QiLCJhbmltYXRlU3R1bm5lZCIsInBsYXlBYmlsaXR5QW5pbWF0aW9uIiwidGFyZ2V0TmFtZSIsImRvdENsYXNzIiwiZ2V0Q2hhcmFjdGVyRWxlbWVudCIsImFuaW1hdGVNYXJrZWQiLCJhbmltYXRlQnVmZiIsImFuaW1hdGVTdGVhbHRoIiwiX3RoaXM1IiwiaGVhbGVkIiwiYW5pbWF0ZVRlYW1CdWZmIiwiX3RoaXM2IiwiT2JqZWN0Iiwia2V5cyIsInN0YXJ0c1dpdGgiLCJhdHRhY2tlck5hbWUiLCJoZWFsZXJOYW1lIiwiZGVmZW5kZXJOYW1lIiwiZW50cnkiLCJjbGFzc05hbWUiLCJtZXNzYWdlIiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwidGVhbU5hbWUiLCJjdXJyZW50SFAiLCJtYXhIUCIsInRhcmdldEhQIiwidGFyZ2V0TWF4SFAiLCJ1cGRhdGVBYmlsaXR5SGVhbHRoQmFycyIsInVuZGVmaW5lZCIsInVwZGF0ZUNoYXJhY3RlckhQIiwiX3RoaXM3IiwibWF4SHAiLCJwZXJjZW50IiwiaHBCYXIiLCJ0cmFuc2l0aW9uIiwid2lkdGgiLCJ1cGRhdGVJbmZvUGFuZWwiLCJwYW5lbENsYXNzIiwicGFuZWwiLCJjaGFyYWN0ZXJJbmZvcyIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJfbG9vcCIsImluZm8iLCJzdGF0c1NwYW4iLCJzIiwibiIsImRvbmUiLCJlcnIiLCJmIiwiX3RoaXM4IiwiZmluYWxpemVSYXRpbmciLCJfdGhpczkiLCJmaW5hbGl6ZVVybCIsInJhdGluZ0NoYW5nZSIsInNob3dSYXRpbmdVcGRhdGUiLCJuZXdSYXRpbmciLCJuZXdSYXRpbmcyIiwiY2hhbmdlIiwicmF0aW5nRWwiLCJyYXRpbmdFbDIiLCJ3aW5uZXJEaXYiLCJub3RpZjEiLCJjc3NUZXh0IiwiY29sb3IiLCJjaGFuZ2UyIiwibm90aWYyIiwiayIsImNvbWJhdENvbnRhaW5lciIsInBhbmVsT3BlbiIsImN1cnJlbnRUYWIiLCJjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkIiwibGFzdE1lc3NhZ2VJZCIsIm1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwiLCJ1bnJlYWRQb2xsaW5nSW50ZXJ2YWwiLCJmcmllbmRzTG9hZGVkIiwicmVxdWVzdHNMb2FkZWQiLCJvcGVuUGFuZWwiLCJsb2FkRnJpZW5kcyIsImNsb3NlUGFuZWwiLCJzdG9wTWVzc2FnZVBvbGxpbmciLCJ0YWJCdG4iLCJ0YWJOYW1lIiwiZnJpZW5kc1RhYiIsInN3aXRjaFRhYiIsInRhYkNvbnRlbnQiLCJsb2FkUmVxdWVzdHMiLCJmcmllbmRzIiwidXNlcklkIiwibGFzdE1lc3NhZ2UiLCJpc0Zyb21NZSIsIml0ZW0iLCJmcmllbmRVc2VySWQiLCJvcGVuQ29udmVyc2F0aW9uIiwicmVxdWVzdHMiLCJmcmllbmRzaGlwSWQiLCJoYW5kbGVSZXF1ZXN0IiwiYWNjZXB0SWQiLCJyZWplY3RJZCIsImFjdGlvbiIsImZldGNoVW5yZWFkQ291bnQiLCJzZWFyY2hJbnB1dCIsInNlYXJjaFJlc3VsdHMiLCJzZWFyY2hUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwicXVlcnkiLCJ1c2VycyIsInUiLCJhY3Rpb25IdG1sIiwiZnJpZW5kU3RhdHVzIiwic2VuZEZyaWVuZFJlcXVlc3QiLCJhZGRGcmllbmRJZCIsIm91dGVySFRNTCIsInJlcG9ydE1lc3NhZ2VBY3Rpb24iLCJtZXNzYWdlSWQiLCJyZWFzb24iLCJwcm9tcHQiLCJ0aXRsZSIsImNvbnZFbCIsIm1lc3NhZ2VzRWwiLCJyZW5kZXJNZXNzYWdlcyIsIm1lc3NhZ2VzIiwic3RhcnRNZXNzYWdlUG9sbGluZyIsImFwcGVuZCIsInBsYWNlaG9sZGVyIiwibXNnIiwicmVwb3J0QnRuIiwicmVwb3J0RWwiLCJyZXBvcnRNc2dJZCIsInNlbmRCdG4iLCJpbnB1dEVsIiwic2VuZE1lc3NhZ2UiLCJiYWNrQnRuIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwidG90YWwiLCJyZXF1ZXN0c0JhZGdlIiwicGVuZGluZ1JlcXVlc3RzIl0sInNvdXJjZVJvb3QiOiIifQ==