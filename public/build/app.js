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
  var ROLE_CATEGORIES = {
    'Tank': 'Tank',
    'DPS': 'DPS',
    'Soigneur': 'Healer',
    'Support': 'Support',
    'Buffer': 'Support'
  };
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
      details.innerHTML = "\n                <div class=\"team-details-content\">\n                    <h2>".concat(name, "</h2>\n                    <p class=\"role\">").concat(role, "</p>\n\n                    <div class=\"gif-container\">\n                        <img src=\"").concat(spritePath, "\" alt=\"Sprite de ").concat(name, "\">\n                    </div>\n\n                    <div class=\"stats\">\n                        <div class=\"stat\">\n                            <span>DMG</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--dmg\"\n                                    style=\"width:").concat(Math.min(dmgMax / STAT_MAX.dmg * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(dmgMin, " - ").concat(dmgMax, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>VIT</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--spd\"\n                                    style=\"width:").concat(Math.min(speed / STAT_MAX.speed * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(speed, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>DODGE</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--dodge\"\n                                    style=\"width:").concat(Math.min(dodge / STAT_MAX.dodge * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(dodge, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>CRIT</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--crit\"\n                                    style=\"width:").concat(Math.min(crit / STAT_MAX.crit * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(crit, "</span>\n                        </div>\n\n                        <div class=\"stat\">\n                            <span>HP</span>\n                            <div class=\"stat-bar\">\n                                <div class=\"stat-fill stat-fill--hp\"\n                                    style=\"width:").concat(Math.min(hp / STAT_MAX.hp * 100, 100), "%\">\n                                </div>\n                            </div>\n                            <span>").concat(hp, "</span>\n                        </div>\n                    </div>\n\n                    ").concat(abilityHtml, "\n\n                    <button class=\"btn-select-right\">\n                        ").concat(isSelected ? 'Désélectionner' : 'Sélectionner', "\n                    </button>\n                </div>\n            ");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUM3SCxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO01BQ2hDO01BRUEsSUFBTXlVLGFBQWEsR0FBR3JhLFFBQVEsQ0FBQ08sYUFBYSxDQUFDLHVCQUF1QixDQUFDO01BQ3JFLElBQUk4WixhQUFhLEVBQUU7UUFDZixJQUFJelQsSUFBSSxDQUFDMFQsZUFBZSxHQUFHLENBQUMsRUFBRTtVQUMxQkQsYUFBYSxDQUFDalcsV0FBVyxHQUFHd0MsSUFBSSxDQUFDMFQsZUFBZTtVQUNoREQsYUFBYSxDQUFDMVUsS0FBSyxDQUFDQyxPQUFPLEdBQUcsY0FBYztRQUNoRCxDQUFDLE1BQU07VUFDSHlVLGFBQWEsQ0FBQzFVLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLE1BQU07UUFDeEM7TUFDSjtJQUNKLENBQUMsQ0FBQyxTQUNJLENBQUMsWUFBTSxDQUFDLENBQUMsQ0FBQztFQUNwQjtFQUVBcVMsZ0JBQWdCLENBQUMsQ0FBQztFQUNsQjFCLHFCQUFxQixHQUFHMkQsV0FBVyxDQUFDakMsZ0JBQWdCLEVBQUUsS0FBSyxDQUFDO0FBQ2hFLENBQUMsQ0FBQyxDOzs7Ozs7Ozs7Ozs7QUN0ZkY7Ozs7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2NvbWJhdC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvZnJpZW5kcy5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5jc3M/MmRjOSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcclxuICovXHJcbmltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnO1xyXG5pbXBvcnQgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzJztcclxuaW1wb3J0ICcuL2pzL2NvbWJhdC5qcyc7XHJcbmltcG9ydCAnLi9qcy9mcmllbmRzLmpzJztcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgVVRJTElUQUlSRSBTRUNVUklURSBYU1NcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xyXG4gICAgaWYgKCFzdHIpIHJldHVybiAnJztcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKHN0cikpO1xyXG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT1cclxuICAgTUVOVSBCVVJHRVJcclxuPT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiRE9NQ29udGVudExvYWRlZFwiLCAoKSA9PiB7XHJcbiAgICBjb25zdCBidXJnZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmJ1cmdlclwiKTtcclxuICAgIGNvbnN0IG5hdiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIubWFpbi1uYXZpZ2F0aW9uXCIpO1xyXG5cclxuICAgIGlmIChidXJnZXIgJiYgbmF2KSB7XHJcbiAgICAgICAgYnVyZ2VyLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIG5hdi5jbGFzc0xpc3QudG9nZ2xlKFwiYWN0aXZlXCIpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQQUdFIFRFQU1TIChDT1JSSUfDiUUpXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG4vKiDwn5SnIE1BWCBERVMgU1RBVFMgKGFkYXB0ZXIgw6AgdGEgQkREIC8gw6lxdWlsaWJyYWdlKSAqL1xyXG5jb25zdCBTVEFUX01BWCA9IHtcclxuICAgIGRtZzogMzAsXHJcbiAgICBzcGVlZDogMTIsXHJcbiAgICBkb2RnZTogNDAsXHJcbiAgICBjcml0OiAxNSxcclxuICAgIGhwOiA3NVxyXG59O1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHBvcnRyYWl0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFtLXBvcnRyYWl0Jyk7XHJcbiAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlYW1EZXRhaWxzJyk7XHJcbiAgICBjb25zdCBzZWxlY3RlZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGlzdCcpO1xyXG4gICAgY29uc3QgbGF1bmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1sYXVuY2gnKTtcclxuXHJcbiAgICBpZiAoIWRldGFpbHMgfHwgcG9ydHJhaXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG1heFNlbGVjdGlvbiA9IDQ7XHJcbiAgICBsZXQgc2VsZWN0ZWRIZXJvZXMgPSBbXTtcclxuICAgIGxldCBzZWxlY3RlZEhlcm9JZHMgPSBbXTtcclxuXHJcbiAgICAvLyBDb21wb3NpdGlvbiBvYmxpZ2F0b2lyZSA6IDEgVGFuaywgMSBEUFMsIDEgSGVhbGVyLCAxIFN1cHBvcnRcclxuICAgIGNvbnN0IFJPTEVfQ0FURUdPUklFUyA9IHsgJ1RhbmsnOiAnVGFuaycsICdEUFMnOiAnRFBTJywgJ1NvaWduZXVyJzogJ0hlYWxlcicsICdTdXBwb3J0JzogJ1N1cHBvcnQnLCAnQnVmZmVyJzogJ1N1cHBvcnQnIH07XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRSb2xlcygpIHtcclxuICAgICAgICBjb25zdCByb2xlcyA9IHsgVGFuazogMCwgRFBTOiAwLCBIZWFsZXI6IDAsIFN1cHBvcnQ6IDAgfTtcclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwcCA9PiBwcC5kYXRhc2V0LmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgIGlmIChwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSBST0xFX0NBVEVHT1JJRVNbcC5kYXRhc2V0LnJvbGVdIHx8ICdTdXBwb3J0JztcclxuICAgICAgICAgICAgICAgIHJvbGVzW2NhdF0rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByb2xlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYW5TZWxlY3RSb2xlKHJvbGUpIHtcclxuICAgICAgICBjb25zdCBjYXQgPSBST0xFX0NBVEVHT1JJRVNbcm9sZV0gfHwgJ1N1cHBvcnQnO1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgIHJldHVybiByb2xlc1tjYXRdIDwgMTtcclxuICAgIH1cclxuXHJcbiAgICBwb3J0cmFpdHMuZm9yRWFjaChwb3J0cmFpdCA9PiB7XHJcbiAgICAgICAgcG9ydHJhaXQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcnRyYWl0cy5mb3JFYWNoKHAgPT4gcC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgaWQgPSBwb3J0cmFpdC5kYXRhc2V0LmlkO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gcG9ydHJhaXQuZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCByb2xlID0gcG9ydHJhaXQuZGF0YXNldC5yb2xlO1xyXG4gICAgICAgICAgICBjb25zdCBkbWdNaW4gPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kbWdNaW4pO1xyXG4gICAgICAgICAgICBjb25zdCBkbWdNYXggPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kbWdNYXgpO1xyXG4gICAgICAgICAgICBjb25zdCBzcGVlZCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LnNwZWVkKTtcclxuICAgICAgICAgICAgY29uc3QgZG9kZ2UgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5kb2RnZSk7XHJcbiAgICAgICAgICAgIGNvbnN0IGNyaXQgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5jcml0KTtcclxuICAgICAgICAgICAgY29uc3QgaHAgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5ocCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZUZpbGUgPSBwb3J0cmFpdC5kYXRhc2V0LnNwcml0ZTtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eU5hbWUgPSBwb3J0cmFpdC5kYXRhc2V0LmFiaWxpdHlOYW1lIHx8ICcnO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5RGVzYyA9IHBvcnRyYWl0LmRhdGFzZXQuYWJpbGl0eURlc2MgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlDZCA9IHBvcnRyYWl0LmRhdGFzZXQuYWJpbGl0eUNkIHx8ICcnO1xyXG5cclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlUGF0aCA9IGAvYXNzZXQvc3ByaXRlcy8ke3Nwcml0ZUZpbGV9YDtcclxuICAgICAgICAgICAgY29uc3QgaXNTZWxlY3RlZCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5SHRtbCA9IGFiaWxpdHlOYW1lID8gYFxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFiaWxpdHktc2VjdGlvbl9faGVhZGVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1maXJlLWFsdFwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19uYW1lXCI+JHtlc2NhcGVIdG1sKGFiaWxpdHlOYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFiaWxpdHktc2VjdGlvbl9fY2RcIj48aSBjbGFzcz1cImZhcyBmYS1ob3VyZ2xhc3MtaGFsZlwiPjwvaT4gJHtlc2NhcGVIdG1sKGFiaWxpdHlDZCl9VDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19kZXNjXCI+JHtlc2NhcGVIdG1sKGFiaWxpdHlEZXNjKX08L3A+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGAgOiAnJztcclxuXHJcbiAgICAgICAgICAgIGRldGFpbHMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYW0tZGV0YWlscy1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPiR7bmFtZX08L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicm9sZVwiPiR7cm9sZX08L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnaWYtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzcHJpdGVQYXRofVwiIGFsdD1cIlNwcml0ZSBkZSAke25hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE1HPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWRtZ1wiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoZG1nTWF4IC8gU1RBVF9NQVguZG1nKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZG1nTWlufSAtICR7ZG1nTWF4fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VklUPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLXNwZFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoc3BlZWQgLyBTVEFUX01BWC5zcGVlZCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke3NwZWVkfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE9ER0U8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tZG9kZ2VcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGRvZGdlIC8gU1RBVF9NQVguZG9kZ2UpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkb2RnZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkNSSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tY3JpdFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoY3JpdCAvIFNUQVRfTUFYLmNyaXQpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtjcml0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+SFA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0taHBcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGhwIC8gU1RBVF9NQVguaHApICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtocH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAke2FiaWxpdHlIdG1sfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiYnRuLXNlbGVjdC1yaWdodFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2lzU2VsZWN0ZWQgPyAnRMOpc8OpbGVjdGlvbm5lcicgOiAnU8OpbGVjdGlvbm5lcid9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGJ0blJpZ2h0ID0gZGV0YWlscy5xdWVyeVNlbGVjdG9yKCcuYnRuLXNlbGVjdC1yaWdodCcpO1xyXG4gICAgICAgICAgICBjb25zdCByb2xlQ2F0ID0gUk9MRV9DQVRFR09SSUVTW3JvbGVdIHx8ICdTdXBwb3J0JztcclxuICAgICAgICAgICAgY29uc3QgYWxyZWFkeVNlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIETDqXNhY3RpdmVyIGxlIGJvdXRvbiBzaSBsZSBzbG90IGRlIGNlIHLDtGxlIGVzdCBkw6lqw6AgcHJpc1xyXG4gICAgICAgICAgICBpZiAoIWFscmVhZHlTZWxlY3RlZCAmJiAhY2FuU2VsZWN0Um9sZShyb2xlKSkge1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQudGV4dENvbnRlbnQgPSBgU2xvdCAke3JvbGVDYXR9IGTDqWrDoCBwcmlzYDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgYnRuUmlnaHQuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IHNlbGVjdGVkSGVyb0lkcy5maWx0ZXIoaGlkID0+IGhpZCAhPT0gaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzID0gc2VsZWN0ZWRIZXJvZXMuZmlsdGVyKGggPT4gaCAhPT0gbmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKCFjYW5TZWxlY3RSb2xlKHJvbGUpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KGBWb3VzIGF2ZXogZMOpasOgIHVuICR7cm9sZUNhdH0gZGFucyB2b3RyZSDDqXF1aXBlICFgKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCA+PSBtYXhTZWxlY3Rpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoXCJWb3VzIHBvdXZleiBzw6lsZWN0aW9ubmVyIG1heGltdW0gMyBwZXJzb25uYWdlcyAhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb0lkcy5wdXNoKGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcy5wdXNoKG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgdXBkYXRlU2VsZWN0ZWRUZWFtKCk7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZClcclxuICAgICAgICAgICAgICAgICAgICA/ICdEw6lzw6lsZWN0aW9ubmVyJ1xyXG4gICAgICAgICAgICAgICAgICAgIDogJ1PDqWxlY3Rpb25uZXInO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQuZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICAvKiAgWk9ORSDDiVFVSVBFIOKAlCBzcHJpdGVzIHNldWxlbWVudCAqL1xyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2VsZWN0ZWRUZWFtKCkge1xyXG4gICAgICAgIHNlbGVjdGVkTGlzdC5pbm5lckhUTUwgPSAnJztcclxuXHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocCA9PiBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgaWYgKCFoZXJvKSByZXR1cm47XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBoZXJvLmRhdGFzZXQubmFtZTtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlUGF0aCA9IGAvYXNzZXQvc3ByaXRlcy8ke2hlcm8uZGF0YXNldC5zcHJpdGV9YDtcclxuICAgICAgICAgICAgY29uc3QgaGVyb0VsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGhlcm9FbC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZC1oZXJvLXNwcml0ZScpO1xyXG4gICAgICAgICAgICBoZXJvRWwuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Nwcml0ZVBhdGh9XCIgYWx0PVwiU3ByaXRlIGRlICR7bmFtZX1cIj5cclxuICAgICAgICAgICAgICAgIDxzcGFuPiR7bmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkTGlzdC5hcHBlbmRDaGlsZChoZXJvRWwpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGxlcyBpbmRpY2F0ZXVycyBkZSByw7RsZXNcclxuICAgICAgICB1cGRhdGVSb2xlSW5kaWNhdG9ycygpO1xyXG5cclxuICAgICAgICBpZiAobGF1bmNoQnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5IZWFsZXIgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgbGF1bmNoQnRuLmRpc2FibGVkID0gIXRlYW1Db21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUm9sZUluZGljYXRvcnMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgY29uc3QgaW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvbGUtaW5kaWNhdG9yJyk7XHJcbiAgICAgICAgaWYgKGluZGljYXRvcikge1xyXG4gICAgICAgICAgICBpbmRpY2F0b3IucXVlcnlTZWxlY3RvckFsbCgnLnJvbGUtc2xvdCcpLmZvckVhY2goc2xvdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSBzbG90LmRhdGFzZXQucm9sZTtcclxuICAgICAgICAgICAgICAgIGlmIChyb2xlc1tjYXRdID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAgICBQUkVTRVRTXHJcbiAgICA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG4gICAgY29uc3Qgc2F2ZVByZXNldEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2F2ZS1wcmVzZXQnKTtcclxuICAgIGNvbnN0IHByZXNldE1vZGFsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldE1vZGFsJyk7XHJcbiAgICBjb25zdCBwcmVzZXROYW1lSW5wdXQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0TmFtZScpO1xyXG4gICAgY29uc3QgcHJlc2V0Q29uZmlybUJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRDb25maXJtJyk7XHJcbiAgICBjb25zdCBwcmVzZXRDYW5jZWxCdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0Q2FuY2VsJyk7XHJcblxyXG4gICAgLy8gTWV0dHJlIGEgam91ciBsZSBib3V0b24gc2F1dmVnYXJkZXIgc2Vsb24gbGEgc2VsZWN0aW9uXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTYXZlUHJlc2V0QnRuKCkge1xyXG4gICAgICAgIGlmIChzYXZlUHJlc2V0QnRuKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtQ29tcGxldGUgPSByb2xlcy5UYW5rID09PSAxICYmIHJvbGVzLkRQUyA9PT0gMSAmJiByb2xlcy5IZWFsZXIgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgc2F2ZVByZXNldEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcGVsZXIgdXBkYXRlU2F2ZVByZXNldEJ0biBhIGNoYXF1ZSBjaGFuZ2VtZW50IGRlIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0gPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcbiAgICAvLyBPbiBzdXJjaGFyZ2UgZW4gYWpvdXRhbnQgbCdhcHBlbFxyXG4gICAgY29uc3QgX29yaWdVcGRhdGUgPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcblxyXG4gICAgLy8gUGF0Y2g6IGFqb3V0ZXIgbCdhcHBlbCBhIHVwZGF0ZVNhdmVQcmVzZXRCdG4gZGFucyB1cGRhdGVTZWxlY3RlZFRlYW1cclxuICAgIC8vIE9uIGxlIGZhaXQgZW4gd3JhcHBhbnQgbGVzIGluZGljYXRldXJzXHJcbiAgICBjb25zdCBfb3JpZ1JvbGVJbmRpY2F0b3JzID0gdXBkYXRlUm9sZUluZGljYXRvcnM7XHJcblxyXG4gICAgLy8gT3V2cmlyIGxhIG1vZGFsXHJcbiAgICBpZiAoc2F2ZVByZXNldEJ0biAmJiBwcmVzZXRNb2RhbCkge1xyXG4gICAgICAgIHNhdmVQcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHByZXNldE5hbWVJbnB1dC5mb2N1cygpLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGZXJtZXIgbGEgbW9kYWxcclxuICAgICAgICBwcmVzZXRDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByZXNldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtbW9kYWxfX2JhY2tkcm9wJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNhdXZlZ2FyZGVyIGxlIHByZXNldFxyXG4gICAgICAgIHByZXNldENvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcmVzZXROYW1lSW5wdXQudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZGMxNDNjJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnLi4uJztcclxuXHJcbiAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvcHJlc2V0cy9zYXZlJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVySWRzOiBzZWxlY3RlZEhlcm9JZHMubWFwKE51bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWNoYXJnZXIgbGEgcGFnZSBwb3VyIGFmZmljaGVyIGxlIG5vdXZlYXUgcHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yIHx8ICdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUnKTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRW50ZXIgcG91ciB2YWxpZGVyXHJcbiAgICAgICAgcHJlc2V0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHByZXNldENvbmZpcm1CdG4uY2xpY2soKTtcclxuICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhcmdlciB1biBwcmVzZXQgKHNlbGVjdGlvbiBwcm9ncmFtbWF0aXF1ZSBkZXMgcGVyc29ubmFnZXMpXHJcbiAgICBmdW5jdGlvbiBsb2FkUHJlc2V0KGNoYXJhY3Rlcklkcykge1xyXG4gICAgICAgIC8vIFJlc2V0IGxhIHNlbGVjdGlvbiBhY3R1ZWxsZVxyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG5cclxuICAgICAgICAvLyBTZWxlY3Rpb25uZXIgbGVzIHBlcnNvbm5hZ2VzIGR1IHByZXNldFxyXG4gICAgICAgIGNoYXJhY3Rlcklkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWRTdHIgPSBTdHJpbmcoaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3J0cmFpdCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBpZFN0cik7XHJcbiAgICAgICAgICAgIGlmIChwb3J0cmFpdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWRTdHIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMucHVzaChwb3J0cmFpdC5kYXRhc2V0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICB1cGRhdGVTYXZlUHJlc2V0QnRuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3VwcHJpbWVyIHVuIHByZXNldFxyXG4gICAgZnVuY3Rpb24gZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwRWwpIHtcclxuICAgICAgICBpZiAoIWNvbmZpcm0oJ1N1cHByaW1lciBjZSBwcmVzZXQgPycpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGAvdGVhbXMvcHJlc2V0cy8ke3ByZXNldElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlwRWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTaSBwbHVzIGRlIHByZXNldHMsIGNhY2hlciBsYSBiYXJyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXRzLWJhcl9fbGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QgJiYgbGlzdC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0cy1iYXInKT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXR0YWNoZXIgbGVzIGV2ZW50cyBhdXggY2hpcHMgZGUgcHJlc2V0c1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZXNldC1jaGlwJykuZm9yRWFjaChjaGlwID0+IHtcclxuICAgICAgICBjb25zdCBwcmVzZXRJZCA9IGNoaXAuZGF0YXNldC5wcmVzZXRJZDtcclxuICAgICAgICBjb25zdCBjaGFySWRzID0gSlNPTi5wYXJzZShjaGlwLmRhdGFzZXQucHJlc2V0SWRzKTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2xvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbG9hZFByZXNldChjaGFySWRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2RlbGV0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9ic2VydmVyIGxlcyBjaGFuZ2VtZW50cyBkZSBzZWxlY3Rpb24gcG91ciBsZSBib3V0b24gc2F2ZVxyXG4gICAgLy8gT24gdXRpbGlzZSB1biBNdXRhdGlvbk9ic2VydmVyIHN1ciBzZWxlY3RlZExpc3RcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdXBkYXRlU2F2ZVByZXNldEJ0bigpKTtcclxuICAgIGlmIChzZWxlY3RlZExpc3QpIHtcclxuICAgICAgICBzZWxlY3RlZExpc3RPYnNlcnZlci5vYnNlcnZlKHNlbGVjdGVkTGlzdCwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhdW5jaEJ0bikge1xyXG4gICAgICAgIGxhdW5jaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnZvaSBQT1NUIEFKQVggdmVycyAvdGVhbXMvc2VsZWN0XHJcbiAgICAgICAgICAgICAgICBmZXRjaCgnL3RlYW1zL3NlbGVjdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogc2VsZWN0ZWRIZXJvSWRzLm1hcCgoaWQsIGkpID0+IGBjaGFyYWN0ZXJfaWRzWyR7aX1dPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGlkKX1gKS5qb2luKCcmJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlZGlyZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVkaXJpZ2UgbWFudWVsbGVtZW50IHNpIHBhcyBkZSByZWRpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbWF0Y2htYWtpbmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzw6lsZWN0aW9uIGRlIGxcXCfDqXF1aXBlLicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQUk9GSUxFIFBPUFVQXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1wb3B1cF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWNvbnRlbnRdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBvcHVwKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwb3B1cC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3Byb2ZpbGUtcG9wdXAtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwX19iYWNrZHJvcC0tb3BlbicpO1xyXG5cclxuICAgICAgICBpZiAoIWxvYWRlZCkge1xyXG4gICAgICAgICAgICBmZXRjaFByb2ZpbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cCk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmZXRjaFByb2ZpbGUoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9hcGkvcHJvZmlsZScpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9maWxlKGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lcnJvclwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclByb2ZpbGUoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdENsYXNzID0gKHIpID0+IHIgPT09ICd3aW4nID8gJ3Jlc3VsdC0td2luJyA6IHIgPT09ICdsb3NzJyA/ICdyZXN1bHQtLWxvc3MnIDogJ3Jlc3VsdC0tZHJhdyc7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0TGFiZWwgPSAocikgPT4gciA9PT0gJ3dpbicgPyAnVmljdG9pcmUnIDogciA9PT0gJ2xvc3MnID8gJ0RcXHUwMGU5ZmFpdGUnIDogJ051bCc7XHJcblxyXG4gICAgICAgIGNvbnN0IGF2YXRhckh0bWwgPSBkYXRhLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChkYXRhLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiQXZhdGFyIGRlICR7ZXNjYXBlSHRtbChkYXRhLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmFzIGZhLXVzZXItY2lyY2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPmA7XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faWRlbnRpdHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hdmF0YXJcIj4ke2F2YXRhckh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fdXNlcm5hbWVcIj4ke2VzY2FwZUh0bWwoZGF0YS51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5tb3R0byA/IGA8c3BhbiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX21vdHRvXCI+XFx1MDBhYiAke2VzY2FwZUh0bWwoZGF0YS5tb3R0byl9IFxcdTAwYmI8L3NwYW4+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5iaW8gPyBgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19iaW9cIj4ke2VzY2FwZUh0bWwoZGF0YS5iaW8pfTwvcD5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3RhdHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEucmF0aW5nKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPk1NUjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy53aW5zKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPlZpY3RvaXJlczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy5sb3NzZXMpKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+RFxcdTAwZTlmYWl0ZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMud2luUmF0ZSkpfSU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+V2luIFJhdGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXN0YXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IENoYW1waW9uIEZhdm9yaVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19uYW1lXCI+JHtlc2NhcGVIdG1sKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIubmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX3JvbGVcIj4ke2VzY2FwZUh0bWwoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5yb2xlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fY291bnRcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIuZ2FtZXNQbGF5ZWQpKX0gcGFydGllczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubGFzdFRlYW0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlcnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IERlcm5pXFx1MDBlOHJlIFxcdTAwYzlxdWlwZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5sYXN0VGVhbS5tYXAoYyA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX21lbWJlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoYy5uYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fcm9sZVwiPiR7ZXNjYXBlSHRtbChjLnJvbGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEucmVjZW50QmF0dGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zaGllbGQtYWx0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBIaXN0b3JpcXVlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5yZWNlbnRCYXR0bGVzLm1hcChiID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYXJlbmEvcmVwbGF5LyR7cGFyc2VJbnQoYi5pZCwgMTApfVwiIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19lbnRyeSAke3Jlc3VsdENsYXNzKGIucmVzdWx0KX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fcmVzdWx0XCI+JHtyZXN1bHRMYWJlbChiLnJlc3VsdCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19vcHBvbmVudFwiPnZzICR7ZXNjYXBlSHRtbChiLm9wcG9uZW50KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX3R5cGVcIj4ke2VzY2FwZUh0bWwoYi5tYXRjaFR5cGUpLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19kYXRlXCI+JHtlc2NhcGVIdG1sKGIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsYXkgcHJvZmlsZS1oaXN0b3J5X19yZXBsYXlcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZW1wdHlcIj5BdWN1biBjb21iYXQgZW5yZWdpc3RyXFx1MDBlOTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3Byb2ZpbGVcIiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2VkaXQtbGlua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gXFx1MDBjOWRpdGVyIGxlIHByb2ZpbFxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIiwiLyoqXHJcbiAqIENvbWJhdCBBbmltYXRpb24gQ29udHJvbGxlclxyXG4gKiBHw6hyZSBsJ2FmZmljaGFnZSBwcm9ncmVzc2lmIGRlcyBsb2dzIGRlIGNvbWJhdCBhdmVjIGFuaW1hdGlvbnNcclxuICovXHJcbmNsYXNzIENvbWJhdENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5sb2dzID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAxO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyRWxlbWVudHMgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlck1heEhQID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGVzIGxvZ3MgZGVwdWlzIGwnYXR0cmlidXQgZGF0YVxyXG4gICAgICAgIGNvbnN0IGxvZ3NEYXRhID0gdGhpcy5jb250YWluZXIuZGF0YXNldC5jb21iYXRMb2dzO1xyXG4gICAgICAgIGlmIChsb2dzRGF0YSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dzID0gSlNPTi5wYXJzZShsb2dzRGF0YSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBwYXJzaW5nIGxvZ3M6JywgZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFLDqWN1cMOpcmVyIGxlcyDDqWzDqW1lbnRzXHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtbG9nXScpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1vdmVybGF5XScpO1xyXG4gICAgICAgIHRoaXMucGxheUJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1wbGF5XScpO1xyXG4gICAgICAgIHRoaXMuc2tpcEJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1za2lwXScpO1xyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29tYmF0LXNwZWVkXScpO1xyXG5cclxuICAgICAgICAvLyBNYXAgZGVzIHBlcnNvbm5hZ2VzIGF2ZWMgc3RvY2thZ2UgZGVzIEhQIG1heCBpbml0aWF1eFxyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFAgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlclNsdWdzID0ge307XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJIYXNIZWFsID0ge307XHJcbiAgICAgICAgdGhpcy5hYmlsaXR5Q29vbGRvd25zID0ge307IC8vIFN1aXZpIGRlcyBjb29sZG93bnMgZW4gY291cnNcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jaGFyYWN0ZXItbmFtZV0nKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsLmRhdGFzZXQuY2hhcmFjdGVyTmFtZTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbSA9IGVsLmRhdGFzZXQuY2hhcmFjdGVyVGVhbTtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7dGVhbX0tJHtuYW1lfWA7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XSA9IGVsO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclNsdWdzW2tleV0gPSBlbC5kYXRhc2V0LmNoYXJhY3RlclNsdWcgfHwgJyc7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVySGFzSGVhbFtrZXldID0gZWwuZGF0YXNldC5oYXNIZWFsID09PSAndHJ1ZSc7XHJcblxyXG4gICAgICAgICAgICAvLyBFeHRyYWlyZSBsZSBIUCBtYXggZGVwdWlzIGxlIHRleHRlIGluaXRpYWxcclxuICAgICAgICAgICAgY29uc3QgaHBUZXh0ID0gZWwucXVlcnlTZWxlY3RvcignLmhwLXRleHQnKTtcclxuICAgICAgICAgICAgaWYgKGhwVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBocFRleHQudGV4dENvbnRlbnQubWF0Y2goLyhcXGQrKVxcLyhcXGQrKS8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUFtrZXldID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgw6lsw6ltZW50cyBkJ2FiaWxpdHkgZGFucyBsZXMgaW5mbyBwYW5lbHNcclxuICAgICAgICB0aGlzLmFiaWxpdHlFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGFyYWN0ZXItaW5mb1tkYXRhLWNoYXItbmFtZV0nKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsLmRhdGFzZXQuY2hhck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJUZWFtO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUVsID0gZWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5Jyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWw6IGFiaWxpdHlFbCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhDZDogcGFyc2VJbnQoYWJpbGl0eUVsLmRhdGFzZXQuYWJpbGl0eU1heENkKSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhZGdlOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LWNkLWJhZGdlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZUVsOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LW5hbWUnKSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uRWw6IGFiaWxpdHlFbC5xdWVyeVNlbGVjdG9yKCdpJyksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENhY2hlciBsJ292ZXJsYXlcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZpZGVyIGxlIGxvZ1xyXG4gICAgICAgIGlmICh0aGlzLmxvZ0NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyBMYW5jZXIgYXV0b21hdGlxdWVtZW50IGFwcsOocyB1biBkw6lsYWlcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGxheSgpLCA4MDApO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheUJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZVBsYXkoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5za2lwQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2tpcCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuc2V0U3BlZWQoZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nICYmICF0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTmV4dExvZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVBsYXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZyB8fCB0aGlzLmlzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2tpcCgpIHtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gQWZmaWNoZXIgdG91cyBsZXMgbG9ncyByZXN0YW50c1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9nID0gdGhpcy5sb2dzW3RoaXMuY3VycmVudEluZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TG9nKGxvZyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNrQWJpbGl0eUNvb2xkb3ducyhsb2cpO1xyXG4gICAgICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdkZWF0aCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zaG93VmljdG9yeU92ZXJsYXkoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTcGVlZChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHNwZWVkID0gcGFyc2VGbG9hdChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY29tYmF0U3BlZWQpO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbCdVSVxyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zLmZvckVhY2goYnRuID0+IGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTmV4dExvZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nIHx8IHRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmljdG9yeU92ZXJsYXkoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZyA9IHRoaXMubG9nc1t0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTG9nKGxvZyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsZXIgbGUgZMOpbGFpXHJcbiAgICAgICAgbGV0IGRlbGF5ID0gdGhpcy5nZXREZWxheUZvckxvZyhsb2cpO1xyXG4gICAgICAgIGRlbGF5ID0gZGVsYXkgLyB0aGlzLnNwZWVkO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvY2Vzc05leHRMb2coKSwgZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlbGF5Rm9yTG9nKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncm91bmQnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAnaW5pdGlhdGl2ZSc6IHJldHVybiA2MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6IHJldHVybiAzMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzogcmV0dXJuIDI4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlZmVuZCc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdkb2RnZSc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6IHJldHVybiAzNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0JzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZpY3RvcnknOlxyXG4gICAgICAgICAgICBjYXNlICdkcmF3JzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIC8vIE5vdXZlYXV4IHR5cGVzXHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgY2FzZSAnc3R1bm5lZF9za2lwJzogcmV0dXJuIDE4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYWN0aXZhdGUnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAnYWJpbGl0eV91c2UnOiByZXR1cm4gdGhpcy5nZXRBYmlsaXR5RGVsYXkobG9nKTtcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDEyMDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFiaWxpdHlEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOiByZXR1cm4gMzAwMDtcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdtYXJrJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYnVmZic6XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlbGZfYnVmZic6XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0ZWFsdGgnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfaGVhbCc6IHJldHVybiAyODAwO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9idWZmJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzogcmV0dXJuIDI4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3RfZG9kZ2UnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMjAwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc0xvZyhsb2cpIHtcclxuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24obG9nKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlMb2cobG9nKTtcclxuXHJcbiAgICAgICAgLy8gU3luY2hyb25pc2VyIGxhIG1pc2Ugw6Agam91ciBkZXMgSFAgYXZlYyBsJ2FuaW1hdGlvblxyXG4gICAgICAgIGNvbnN0IGhwRGVsYXkgPSB0aGlzLmdldEhQVXBkYXRlRGVsYXkobG9nKTtcclxuICAgICAgICBpZiAoaHBEZWxheSA+IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKSwgaHBEZWxheSAvIHRoaXMuc3BlZWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU3VpdmkgZGVzIGNvb2xkb3duc1xyXG4gICAgICAgIHRoaXMudHJhY2tBYmlsaXR5Q29vbGRvd25zKGxvZyk7XHJcbiAgICB9XHJcblxyXG4gICAgdHJhY2tBYmlsaXR5Q29vbGRvd25zKGxvZykge1xyXG4gICAgICAgIC8vIFF1YW5kIHVuZSBjb21ww6l0ZW5jZSBlc3QgdXRpbGlzw6llLCBtZXR0cmUgZW4gY29vbGRvd25cclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdhYmlsaXR5X3VzZScgJiYgbG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlEYXRhID0gdGhpcy5hYmlsaXR5RWxlbWVudHNba2V5XTtcclxuICAgICAgICAgICAgaWYgKGFiaWxpdHlEYXRhICYmIGFiaWxpdHlEYXRhLm1heENkID4gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hYmlsaXR5Q29vbGRvd25zW2tleV0gPSBhYmlsaXR5RGF0YS5tYXhDZDtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheShrZXkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBIGNoYXF1ZSBub3V2ZWF1IHJvdW5kLCBkw6ljcsOpbWVudGVyIHRvdXMgbGVzIGNvb2xkb3duc1xyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ3JvdW5kJykge1xyXG4gICAgICAgICAgICBmb3IgKGNvbnN0IGtleSBpbiB0aGlzLmFiaWxpdHlDb29sZG93bnMpIHtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XSA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XS0tO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheShrZXkpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUFiaWxpdHlDb29sZG93bkRpc3BsYXkoa2V5KSB7XHJcbiAgICAgICAgY29uc3QgYWJpbGl0eURhdGEgPSB0aGlzLmFiaWxpdHlFbGVtZW50c1trZXldO1xyXG4gICAgICAgIGlmICghYWJpbGl0eURhdGEpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgY2QgPSB0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XSB8fCAwO1xyXG5cclxuICAgICAgICBpZiAoY2QgPiAwKSB7XHJcbiAgICAgICAgICAgIC8vIEVuIGNvb2xkb3duIDogZ3Jpc2VyICsgYWZmaWNoZXIgYmFkZ2VcclxuICAgICAgICAgICAgYWJpbGl0eURhdGEuZWwuY2xhc3NMaXN0LmFkZCgnY2hhcmFjdGVyLWluZm9fX2FiaWxpdHktLW9uLWNkJyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RGF0YS5iYWRnZSkge1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eURhdGEuYmFkZ2UudGV4dENvbnRlbnQgPSBgJHtjZH1UYDtcclxuICAgICAgICAgICAgICAgIGFiaWxpdHlEYXRhLmJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIC8vIFByw6p0IDogcmV0aXJlciBsZSBncmlzXHJcbiAgICAgICAgICAgIGFiaWxpdHlEYXRhLmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2NoYXJhY3Rlci1pbmZvX19hYmlsaXR5LS1vbi1jZCcpO1xyXG4gICAgICAgICAgICBpZiAoYWJpbGl0eURhdGEuYmFkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGFiaWxpdHlEYXRhLmJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SFBVcGRhdGVEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6IHJldHVybiAzNTA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOiByZXR1cm4gNDAwO1xyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6IHJldHVybiAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzogcmV0dXJuIDIwMDtcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOiByZXR1cm4gMjAwO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2FjdGl2YXRlJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAnYWJpbGl0eV91c2UnOiByZXR1cm4gdGhpcy5nZXRBYmlsaXR5SFBEZWxheShsb2cpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWJpbGl0eUhQRGVsYXkobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cuc3VidHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfYXR0YWNrJzpcclxuICAgICAgICAgICAgY2FzZSAnYmFja2xpbmVfc3RyaWtlJzpcclxuICAgICAgICAgICAgY2FzZSAnYXJtb3JfcGllcmNlJzpcclxuICAgICAgICAgICAgY2FzZSAnYm9udXNfdnNfbWFya2VkJzpcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6IHJldHVybiAzNTA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2hlYWwnOlxyXG4gICAgICAgICAgICBjYXNlICdlbWVyZ2VuY3lfaGVhbCc6IHJldHVybiA0MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyYW5zZm9ybV9kYW1hZ2UnOiByZXR1cm4gMjAwO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGxheUFuaW1hdGlvbihsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmF0dGFja2VyLCBsb2cuYXR0YWNrZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgbG9nLmlzQ3JpdCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVIZWFsKGxvZy5oZWFsZXIsIGxvZy5oZWFsZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZGVmZW5kJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlZmVuZChsb2cuZGVmZW5kZXIsIGxvZy5kZWZlbmRlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RvZGdlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURvZGdlKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWF0aChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgLy8gTm91dmVhdXggdHlwZXNcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfdGljayc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEb1QobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGVlZGluZycpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF90aWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsaWdodGVkJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3R1bm5lZF9za2lwJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVN0dW5uZWQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYWN0aXZhdGUnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5hdHRhY2tlciwgbG9nLmF0dGFja2VyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLnBsYXlBYmlsaXR5QW5pbWF0aW9uKGxvZyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IE5PVVZFTExFUyBBTklNQVRJT05TID09PVxyXG5cclxuICAgIGFuaW1hdGVEb1QodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSwgZG90Q2xhc3MpIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZChkb3RDbGFzcyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoZG90Q2xhc3MpLCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVN0dW5uZWQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzdHVubmVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3N0dW5uZWQnKSwgMTQwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVNYXJrZWQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdtYXJrZWQnKTtcclxuICAgICAgICAgICAgLy8gTGEgbWFycXVlIHJlc3RlIHZpc2libGUgcGx1cyBsb25ndGVtcHNcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbWFya2VkJyksIDIwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlQnVmZih0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2J1ZmZlZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdidWZmZWQnKSwgMTQwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVTdGVhbHRoKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc3RlYWx0aGVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ3N0ZWFsdGhlZCcpLCAxNTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcGxheUFiaWxpdHlBbmltYXRpb24obG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cuc3VidHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF9hdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFuaW1hdGVEb1QobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGVlZGluZycpLCA3MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFuaW1hdGVEb1QobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sICdibGlnaHRlZCcpLCA3MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW4nOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLmFuaW1hdGVTdHVubmVkKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKSwgNzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdtYXJrJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbWFya0tleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUobWFya0tleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRUZWFtKSB0aGlzLmFuaW1hdGVNYXJrZWQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHJpcG9zdGVLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHJpcG9zdGVLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc2VsZl9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZkJ1ZmZLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWJvbWluYXRpb24gVHJhbnNmb3JtYXRpb24gOiBzd2l0Y2ggc2x1ZyB0byBiZWFzdCBwZXJtYW5lbnRseVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2cuYWJpbGl0eU5hbWUgPT09ICdUcmFuc2Zvcm1hdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTbHVnc1tzZWxmQnVmZktleV0gPSAnYmVhc3QnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoc2VsZkJ1ZmZLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfaGVhbCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBbmltZXIgdG91cyBsZXMgYWxsacOpcyBzb2lnbsOpc1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2cuaGVhbGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxvZy5oZWFsZWQuZm9yRWFjaChoID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGgubmFtZSwgaC50ZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChlbCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2hlYWxlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGVhbGVkJyksIDE1MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHBhcnR5QnVmZktleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUocGFydHlCdWZmS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gQW5pbWVyIHRvdXMgbGVzIGFsbGnDqXMgZHUgbcOqbWUgY8O0dMOpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVUZWFtQnVmZihsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3RlYWx0aCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0ZWFsdGhLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHN0ZWFsdGhLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3RlYWx0aChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYXJtb3JfcGllcmNlJzpcclxuICAgICAgICAgICAgY2FzZSAnYmFja2xpbmVfc3RyaWtlJzpcclxuICAgICAgICAgICAgY2FzZSAnYm9udXNfdnNfbWFya2VkJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cuaXNDcml0IHx8IGZhbHNlKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdlbWVyZ2VuY3lfaGVhbCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0X2RvZGdlJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVEZWZlbmQobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyYW5zZm9ybV9kYW1hZ2UnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2h1cnQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdodXJ0JyksIDgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVUZWFtQnVmZihjYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgT2JqZWN0LmtleXModGhpcy5jaGFyYWN0ZXJFbGVtZW50cykuZm9yRWFjaChrZXkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoa2V5LnN0YXJ0c1dpdGgoY2FzdGVyVGVhbSkpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1trZXldO1xyXG4gICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnYnVmZmVkJyk7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2J1ZmZlZCcpLCAxNDAwKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBTUFJJVEUgU1dBUCA9PT1cclxuXHJcbiAgICBzd2FwU3ByaXRlKGtleSwgc3ByaXRlTmFtZSwgZHVyYXRpb24pIHtcclxuICAgICAgICBjb25zdCBlbCA9IHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XTtcclxuICAgICAgICBpZiAoIWVsKSByZXR1cm47XHJcbiAgICAgICAgY29uc3Qgc2x1ZyA9IHRoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XTtcclxuICAgICAgICBpZiAoIXNsdWcpIHJldHVybjtcclxuICAgICAgICBjb25zdCBpbWcgPSBlbC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLXNwcml0ZScpO1xyXG4gICAgICAgIGlmICghaW1nKSByZXR1cm47XHJcbiAgICAgICAgaW1nLnNyYyA9IGAvYXNzZXQvaW1nL2NvbWJhdC8ke3NsdWd9LyR7c3ByaXRlTmFtZX1gO1xyXG4gICAgICAgIGlmIChkdXJhdGlvbiA+IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWVsLmNsYXNzTGlzdC5jb250YWlucygnZGVhZCcpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgaW1nLnNyYyA9IGAvYXNzZXQvaW1nL2NvbWJhdC8ke3RoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XX0vZmlnaHRpZGxlLndlYnBgO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9LCBkdXJhdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PSBBTklNQVRJT05TIEVYSVNUQU5URVMgPT09XHJcblxyXG4gICAgYW5pbWF0ZUF0dGFjayhhdHRhY2tlck5hbWUsIGF0dGFja2VyVGVhbSwgdGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSwgaXNDcml0KSB7XHJcbiAgICAgICAgY29uc3QgYXR0YWNrZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoYXR0YWNrZXJOYW1lLCBhdHRhY2tlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGF0dGFja2VyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2F0dGFja2VyVGVhbX0tJHthdHRhY2tlck5hbWV9YDtcclxuICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKGtleSwgJ2F0dGFja2FuaW1hdGlvbi53ZWJwJywgMTIwMCk7XHJcbiAgICAgICAgICAgIGF0dGFja2VyLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2luZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGF0dGFja2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGFja2luZycpLCAxMjAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ3JpdCkgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NyaXQnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnLCAnY3JpdCcpLCA4MDApO1xyXG4gICAgICAgICAgICB9LCA1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlSGVhbChoZWFsZXJOYW1lLCBoZWFsZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgaGVhbGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGhlYWxlck5hbWUsIGhlYWxlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGhlYWxlcikge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtoZWFsZXJUZWFtfS0ke2hlYWxlck5hbWV9YDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuY2hhcmFjdGVySGFzSGVhbFtrZXldKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnaGVhbGluZy53ZWJwJywgMTUwMCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnc2tpbGwud2VicCcsIDE1MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhlYWxlci5jbGFzc0xpc3QuYWRkKCdoZWFsaW5nJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaGVhbGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxpbmcnKSwgMTUwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdoZWFsZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaGVhbGVkJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRGVmZW5kKGRlZmVuZGVyTmFtZSwgZGVmZW5kZXJUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgZGVmZW5kZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoZGVmZW5kZXJOYW1lLCBkZWZlbmRlclRlYW0pO1xyXG4gICAgICAgIGlmIChkZWZlbmRlcikge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHtkZWZlbmRlclRlYW19LSR7ZGVmZW5kZXJOYW1lfWA7XHJcbiAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShrZXksICdkZWZlbmRpbmcud2VicCcsIDE4MDApO1xyXG4gICAgICAgICAgICBkZWZlbmRlci5jbGFzc0xpc3QuYWRkKCdkZWZlbmRpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBkZWZlbmRlci5jbGFzc0xpc3QucmVtb3ZlKCdkZWZlbmRpbmcnKSwgMTgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEb2RnZSh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RvZGdpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnZG9kZ2luZycpLCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlYXRoKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZGVhZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGFyYWN0ZXJFbGVtZW50KG5hbWUsIHRlYW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1tgJHt0ZWFtfS0ke25hbWV9YF07XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheUxvZyhsb2cpIHtcclxuICAgICAgICBpZiAoIXRoaXMubG9nQ29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGVudHJ5LmNsYXNzTmFtZSA9ICdjb21iYXQtbG9nX19lbnRyeSc7XHJcblxyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ3JvdW5kJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tcm91bmQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAndmljdG9yeScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXZpY3RvcnknKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnZHJhdycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWRlZmVhdCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdhYmlsaXR5X3VzZScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWFiaWxpdHknKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYmxlZWRfdGljaycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWJsZWVkJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsaWdodF90aWNrJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tYmxpZ2h0Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3N0dW5uZWRfc2tpcCcpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXN0dW4nKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAncmlwb3N0ZV9hY3RpdmF0ZScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXJpcG9zdGUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVudHJ5LmlubmVySFRNTCA9IGxvZy5tZXNzYWdlO1xyXG4gICAgICAgIHRoaXMubG9nQ29udGFpbmVyLmFwcGVuZENoaWxkKGVudHJ5KTtcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5zY3JvbGxUb3AgPSB0aGlzLmxvZ0NvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSGVhbHRoQmFycyhsb2cpIHtcclxuICAgICAgICBsZXQgY2hhcmFjdGVyTmFtZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IHRlYW1OYW1lID0gbnVsbDtcclxuICAgICAgICBsZXQgY3VycmVudEhQID0gbnVsbDtcclxuICAgICAgICBsZXQgbWF4SFAgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBEw6l0ZXJtaW5lciBsZXMgZG9ubsOpZXMgc2Vsb24gbGUgdHlwZSBkZSBsb2dcclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdhdHRhY2snIHx8IGxvZy50eXBlID09PSAncmlwb3N0ZV9hY3RpdmF0ZScpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2hlYWwnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdibGVlZF90aWNrJyB8fCBsb2cudHlwZSA9PT0gJ2JsaWdodF90aWNrJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYWJpbGl0eV91c2UnKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQWJpbGl0eUhlYWx0aEJhcnMobG9nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgc2kgbm91cyBhdm9ucyBsZXMgZG9ubsOpZXMgbsOpY2Vzc2FpcmVzXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlck5hbWUgJiYgdGVhbU5hbWUgJiYgY3VycmVudEhQICE9PSBudWxsICYmIGN1cnJlbnRIUCAhPT0gdW5kZWZpbmVkICYmIG1heEhQKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCwgbWF4SFApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBYmlsaXR5SGVhbHRoQmFycyhsb2cpIHtcclxuICAgICAgICAvLyBDb21ww6l0ZW5jZXMgcXVpIGluZmxpZ2VudCBkZXMgZMOpZ8OidHMgw6AgdW5lIGNpYmxlXHJcbiAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldEhQICE9PSB1bmRlZmluZWQgJiYgbG9nLnRhcmdldE1heEhQKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy50YXJnZXRIUCwgbG9nLnRhcmdldE1heEhQKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNvaW4gZGUgZ3JvdXBlIDogbWV0dHJlIMOgIGpvdXIgY2hhcXVlIGFsbGnDqSBzb2lnbsOpXHJcbiAgICAgICAgaWYgKGxvZy5zdWJ0eXBlID09PSAncGFydHlfaGVhbCcgJiYgbG9nLmhlYWxlZCkge1xyXG4gICAgICAgICAgICBsb2cuaGVhbGVkLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGgubmFtZSwgaC50ZWFtLCBoLmhwLCBoLm1heEhwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTb2luIGQndXJnZW5jZSA6IG1ldHRyZSDDoCBqb3VyIGxlIGxhbmNldXJcclxuICAgICAgICBpZiAobG9nLnN1YnR5cGUgPT09ICdlbWVyZ2VuY3lfaGVhbCcgJiYgbG9nLmNhc3Rlcikge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0SFAsIGxvZy50YXJnZXRNYXhIUCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYXJhY3RlckhQKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsIG1heEhQKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IG1heEhQID4gMCA/IChjdXJyZW50SFAgLyBtYXhIUCkgKiAxMDAgOiAwO1xyXG5cclxuICAgICAgICAvLyBNaXNlIMOgIGpvdXIgZGUgbGEgYmFycmUgSFAgZGFucyBsYSB6b25lIGRlIGNvbWJhdCAoYmF0dGxlLXN0YWdlKVxyXG4gICAgICAgIGNvbnN0IGhwQmFyID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ocC1iYXJfX2ZpbGwnKTtcclxuICAgICAgICBjb25zdCBocFRleHQgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmhwLXRleHQnKTtcclxuXHJcbiAgICAgICAgaWYgKGhwQmFyKSB7XHJcbiAgICAgICAgICAgIC8vIEFuaW1hdGlvbiBmbHVpZGUgZGUgbGEgYmFycmVcclxuICAgICAgICAgICAgaHBCYXIuc3R5bGUudHJhbnNpdGlvbiA9IGB3aWR0aCAwLjNzIGVhc2Utb3V0YDtcclxuICAgICAgICAgICAgaHBCYXIuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50fSVgO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xhc3NlcyBkZSBjb3VsZXVyIHNlbG9uIGxlIHBvdXJjZW50YWdlXHJcbiAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hwLWJhcl9fZmlsbC0tbG93JywgJ2hwLWJhcl9fZmlsbC0tY3JpdGljYWwnKTtcclxuICAgICAgICAgICAgaWYgKHBlcmNlbnQgPD0gMjUpIHtcclxuICAgICAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5hZGQoJ2hwLWJhcl9fZmlsbC0tY3JpdGljYWwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwZXJjZW50IDw9IDUwKSB7XHJcbiAgICAgICAgICAgICAgICBocEJhci5jbGFzc0xpc3QuYWRkKCdocC1iYXJfX2ZpbGwtLWxvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaHBUZXh0KSB7XHJcbiAgICAgICAgICAgIGhwVGV4dC50ZXh0Q29udGVudCA9IGAke2N1cnJlbnRIUH0vJHttYXhIUH1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWlzZSDDoCBqb3VyIGRlcyBwYW5uZWF1eCBkJ2luZm8gbGF0w6lyYXV4XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbmZvUGFuZWwoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSW5mb1BhbmVsKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFApIHtcclxuICAgICAgICAvLyBUcm91dmVyIGxlIGJvbiBwYW5uZWF1IHNlbG9uIGwnw6lxdWlwZVxyXG4gICAgICAgIGNvbnN0IHBhbmVsQ2xhc3MgPSB0ZWFtTmFtZSA9PT0gJ0VxdWlwZSAxJyA/ICcuaW5mby1wYW5lbC0tdGVhbTEnIDogJy5pbmZvLXBhbmVsLS10ZWFtMic7XHJcbiAgICAgICAgY29uc3QgcGFuZWwgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKHBhbmVsQ2xhc3MpO1xyXG5cclxuICAgICAgICBpZiAoIXBhbmVsKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIFRyb3V2ZXIgbGUgcGVyc29ubmFnZSBkYW5zIGxlIHBhbm5lYXUgcGFyIHNvbiBub21cclxuICAgICAgICBjb25zdCBjaGFyYWN0ZXJJbmZvcyA9IHBhbmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGFyYWN0ZXItaW5mbycpO1xyXG4gICAgICAgIGZvciAoY29uc3QgaW5mbyBvZiBjaGFyYWN0ZXJJbmZvcykge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lRWwgPSBpbmZvLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fbmFtZScpO1xyXG4gICAgICAgICAgICBpZiAobmFtZUVsICYmIG5hbWVFbC50ZXh0Q29udGVudC50cmltKCkgPT09IGNoYXJhY3Rlck5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRzU3BhbiA9IGluZm8ucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19zdGF0cyBzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHNTcGFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNTcGFuLnRleHRDb250ZW50ID0gY3VycmVudEhQO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBBbmltYXRpb24gZmxhc2ggcG91ciBtb250cmVyIGxlIGNoYW5nZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBzdGF0c1NwYW4uY2xhc3NMaXN0LmFkZCgnaHAtdXBkYXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc3RhdHNTcGFuLmNsYXNzTGlzdC5yZW1vdmUoJ2hwLXVwZGF0ZWQnKSwgMzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dWaWN0b3J5T3ZlcmxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaW5hbGlzZXIgbGUgTU1SIGEgbGEgZmluIGR1IGNvbWJhdFxyXG4gICAgICAgIHRoaXMuZmluYWxpemVSYXRpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5hbGl6ZVJhdGluZygpIHtcclxuICAgICAgICBjb25zdCBmaW5hbGl6ZVVybCA9IHRoaXMuY29udGFpbmVyLmRhdGFzZXQuZmluYWxpemVVcmw7XHJcbiAgICAgICAgaWYgKCFmaW5hbGl6ZVVybCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBmZXRjaChmaW5hbGl6ZVVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICYmIGRhdGEucmF0aW5nQ2hhbmdlICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSYXRpbmdVcGRhdGUoZGF0YS5yYXRpbmdDaGFuZ2UsIGRhdGEubmV3UmF0aW5nLCBkYXRhLm5ld1JhdGluZzIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBmaW5hbGlzYXRpb24gcmF0aW5nOicsIGVycikpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dSYXRpbmdVcGRhdGUoY2hhbmdlLCBuZXdSYXRpbmcsIG5ld1JhdGluZzIpIHtcclxuICAgICAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIE1NUiBhZmZpY2hlIGRhbnMgbGUgcGFubmVhdSBqb3VldXIgKEVxdWlwZSAxKVxyXG4gICAgICAgIGNvbnN0IHJhdGluZ0VsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0xIC5pbmZvLXBhbmVsX19yYXRpbmcnKTtcclxuICAgICAgICBpZiAocmF0aW5nRWwgJiYgbmV3UmF0aW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7bmV3UmF0aW5nfSBNTVJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIGEgam91ciBsZSBNTVIgYWZmaWNoZSBkYW5zIGxlIHBhbm5lYXUgYWR2ZXJzYWlyZSAoRXF1aXBlIDIpXHJcbiAgICAgICAgY29uc3QgcmF0aW5nRWwyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0yIC5pbmZvLXBhbmVsX19yYXRpbmctLWVuZW15Jyk7XHJcbiAgICAgICAgaWYgKHJhdGluZ0VsMiAmJiBuZXdSYXRpbmcyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsMi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke25ld1JhdGluZzJ9IE1NUmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZmZpY2hlciBsYSBub3RpZmljYXRpb24gZGUgY2hhbmdlbWVudCBkYW5zIGwnb3ZlcmxheVxyXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtb3ZlcmxheV0nKTtcclxuICAgICAgICBpZiAob3ZlcmxheSkge1xyXG4gICAgICAgICAgICBjb25zdCB3aW5uZXJEaXYgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGUtc3RhZ2VfX3dpbm5lcicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hhbmdlbWVudCBNTVIgRXF1aXBlIDFcclxuICAgICAgICAgICAgY29uc3Qgbm90aWYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG5vdGlmMS5jbGFzc05hbWUgPSAncmF0aW5nLWNoYW5nZSc7XHJcbiAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZToxLjJyZW07bWFyZ2luLXRvcDoxMnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMS50ZXh0Q29udGVudCA9IGNoYW5nZSA+IDAgPyBgRXF1aXBlIDEgOiArJHtjaGFuZ2V9IE1NUmAgOiBgRXF1aXBlIDEgOiAke2NoYW5nZX0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYxLnN0eWxlLmNvbG9yID0gY2hhbmdlID4gMCA/ICcjNGNhZjUwJyA6ICcjZjQ0MzM2JztcclxuICAgICAgICAgICAgd2lubmVyRGl2LmFwcGVuZENoaWxkKG5vdGlmMSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGFuZ2VtZW50IE1NUiBFcXVpcGUgMiAoaW52ZXJzZSlcclxuICAgICAgICAgICAgY29uc3QgY2hhbmdlMiA9IC1jaGFuZ2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBub3RpZjIuY2xhc3NOYW1lID0gJ3JhdGluZy1jaGFuZ2UnO1xyXG4gICAgICAgICAgICBub3RpZjIuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MS4ycmVtO21hcmdpbi10b3A6NnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMi50ZXh0Q29udGVudCA9IGNoYW5nZTIgPiAwID8gYEVxdWlwZSAyIDogKyR7Y2hhbmdlMn0gTU1SYCA6IGBFcXVpcGUgMiA6ICR7Y2hhbmdlMn0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYyLnN0eWxlLmNvbG9yID0gY2hhbmdlMiA+IDAgPyAnIzRjYWY1MCcgOiAnI2Y0NDMzNic7XHJcbiAgICAgICAgICAgIHdpbm5lckRpdi5hcHBlbmRDaGlsZChub3RpZjIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3RpZjEuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQbGF5QnV0dG9uKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wbGF5QnRuKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZyAmJiAhdGhpcy5pc1BhdXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSAnUGF1c2UnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSAnVGVybWluw6knO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9IHRoaXMuY3VycmVudEluZGV4ID4gMCA/ICdSZXByZW5kcmUnIDogJ0xhbmNlcic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBJbml0aWFsaXNlciBxdWFuZCBsZSBET00gZXN0IHByw6p0XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBjb21iYXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtbG9nc10nKTtcclxuICAgIGlmIChjb21iYXRDb250YWluZXIpIHtcclxuICAgICAgICBuZXcgQ29tYmF0Q29udHJvbGxlcihjb21iYXRDb250YWluZXIpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbWJhdENvbnRyb2xsZXI7XHJcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIEZSSUVORCBTWVNURU1cclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi50ZXh0Q29udGVudCA9IHN0cjtcclxuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy10b2dnbGVdJyk7XHJcbiAgICBjb25zdCBwYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtcGFuZWxdJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtYmFja2Ryb3BdJyk7XHJcbiAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtY2xvc2VdJyk7XHJcbiAgICBjb25zdCBiYWRnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtYmFkZ2VdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBhbmVsKSByZXR1cm47XHJcblxyXG4gICAgbGV0IHBhbmVsT3BlbiA9IGZhbHNlO1xyXG4gICAgbGV0IGN1cnJlbnRUYWIgPSAnZnJpZW5kcyc7XHJcbiAgICBsZXQgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IG51bGw7XHJcbiAgICBsZXQgbGFzdE1lc3NhZ2VJZCA9IDA7XHJcbiAgICBsZXQgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICBsZXQgdW5yZWFkUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgIGxldCBmcmllbmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICBsZXQgcmVxdWVzdHNMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFBBTkVMIE9QRU4vQ0xPU0VcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gb3BlblBhbmVsKCkge1xyXG4gICAgICAgIHBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgcGFuZWwub2Zmc2V0SGVpZ2h0OyAvLyByZWZsb3dcclxuICAgICAgICBwYW5lbC5jbGFzc0xpc3QuYWRkKCdmcmllbmRzLXBhbmVsLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnZnJpZW5kcy1wYW5lbF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBwYW5lbE9wZW4gPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIWZyaWVuZHNMb2FkZWQpIHtcclxuICAgICAgICAgICAgbG9hZEZyaWVuZHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQYW5lbCgpIHtcclxuICAgICAgICBwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdmcmllbmRzLXBhbmVsLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnZnJpZW5kcy1wYW5lbF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBwYW5lbE9wZW4gPSBmYWxzZTtcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHBhbmVsT3BlbiA/IGNsb3NlUGFuZWwoKSA6IG9wZW5QYW5lbCgpKTtcclxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQYW5lbCk7XHJcbiAgICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUGFuZWwpO1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gVEFCU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mcmllbmRzLXRhYl0nKS5mb3JFYWNoKHRhYkJ0biA9PiB7XHJcbiAgICAgICAgdGFiQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YWJOYW1lID0gdGFiQnRuLmRhdGFzZXQuZnJpZW5kc1RhYjtcclxuICAgICAgICAgICAgc3dpdGNoVGFiKHRhYk5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc3dpdGNoVGFiKHRhYk5hbWUpIHtcclxuICAgICAgICBjdXJyZW50VGFiID0gdGFiTmFtZTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZnJpZW5kcy10YWJdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgnZnJpZW5kcy1wYW5lbF9fdGFiLS1hY3RpdmUnLCBidG4uZGF0YXNldC5mcmllbmRzVGFiID09PSB0YWJOYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiLWNvbnRlbnRdJykuZm9yRWFjaChjb250ZW50ID0+IHtcclxuICAgICAgICAgICAgY29udGVudC5zdHlsZS5kaXNwbGF5ID0gY29udGVudC5kYXRhc2V0LnRhYkNvbnRlbnQgPT09IHRhYk5hbWUgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fdGFicycpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX2NvbnRlbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNvbnZlcnNhdGlvbl0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG5cclxuICAgICAgICBpZiAodGFiTmFtZSA9PT0gJ2ZyaWVuZHMnICYmICFmcmllbmRzTG9hZGVkKSBsb2FkRnJpZW5kcygpO1xyXG4gICAgICAgIGlmICh0YWJOYW1lID09PSAncmVxdWVzdHMnICYmICFyZXF1ZXN0c0xvYWRlZCkgbG9hZFJlcXVlc3RzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBMT0FEIEZSSUVORFMgTElTVFxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBsb2FkRnJpZW5kcygpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YWItY29udGVudD1cImZyaWVuZHNcIl0nKTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19sb2FkaW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBDaGFyZ2VtZW50Li4uPC9kaXY+JztcclxuXHJcbiAgICAgICAgZmV0Y2goJy9mcmllbmRzL2xpc3QnLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBmcmllbmRzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuZnJpZW5kcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPjxpIGNsYXNzPVwiZmFzIGZhLWdob3N0XCI+PC9pPiBBdWN1biBjb21wYWdub24uLi4gTGUgZG9uam9uIGVzdCBzb2xpdGFpcmUuPC9wPic7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhLmZyaWVuZHMubWFwKGYgPT4gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCIgZGF0YS1mcmllbmQtdXNlci1pZD1cIiR7Zi51c2VySWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtmLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwoZi5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbChmLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoZi51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19wcmV2aWV3XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2YubGFzdE1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChmLmxhc3RNZXNzYWdlLmlzRnJvbU1lID8gJ1ZvdXM6ICcgOiAnJykgKyBlc2NhcGVIdG1sKGYubGFzdE1lc3NhZ2UuY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdBdWN1biBtZXNzYWdlJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3JhdGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHtmLnJhdGluZ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmZyaWVuZC1pdGVtJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlcklkID0gcGFyc2VJbnQoaXRlbS5kYXRhc2V0LmZyaWVuZFVzZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmZyaWVuZC1pdGVtX19uYW1lJykudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbkNvbnZlcnNhdGlvbih1c2VySWQsIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RXJyZXVyIGRlIGNoYXJnZW1lbnQ8L3A+JztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIExPQUQgUEVORElORyBSRVFVRVNUU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBsb2FkUmVxdWVzdHMoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGFiLWNvbnRlbnQ9XCJyZXF1ZXN0c1wiXScpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+IENoYXJnZW1lbnQuLi48L2Rpdj4nO1xyXG5cclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvcGVuZGluZycsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVxdWVzdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5BdWN1bmUgZGVtYW5kZSBlbiBhdHRlbnRlPC9wPic7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhLnJlcXVlc3RzLm1hcChyID0+IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiIGRhdGEtcmVxdWVzdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtyLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwoci5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbChyLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoci51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19wcmV2aWV3XCI+JHtlc2NhcGVIdG1sKHIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1hY2NlcHRcIiBkYXRhLWFjY2VwdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1jaGVja1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXJlamVjdFwiIGRhdGEtcmVqZWN0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hY2NlcHQtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlcXVlc3QoYnRuLmRhdGFzZXQuYWNjZXB0SWQsICdhY2NlcHQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZWplY3QtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlcXVlc3QoYnRuLmRhdGFzZXQucmVqZWN0SWQsICdyZWplY3QnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChmcmllbmRzaGlwSWQsIGFjdGlvbikge1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy8ke2FjdGlvbn0vJHtmcmllbmRzaGlwSWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsb2FkUmVxdWVzdHMoKTtcclxuICAgICAgICAgICAgICAgIGZldGNoVW5yZWFkQ291bnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gU0VBUkNIIFVTRVJTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1zZWFyY2gtaW5wdXRdJyk7XHJcbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1zZWFyY2gtcmVzdWx0c10nKTtcclxuICAgIGxldCBzZWFyY2hUaW1lb3V0ID0gbnVsbDtcclxuXHJcbiAgICBpZiAoc2VhcmNoSW5wdXQpIHtcclxuICAgICAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNlYXJjaFRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChxdWVyeS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmZXRjaChgL2ZyaWVuZHMvc2VhcmNoP3E9JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnkpfWAsIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS51c2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkF1Y3VuIGd1ZXJyaWVyIHRyb3V2ZTwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9IGRhdGEudXNlcnMubWFwKHUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aW9uSHRtbCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdhY2NlcHRlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5BbWk8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ3BlbmRpbmdfc2VudCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5FbnZveWVlPC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdwZW5kaW5nX3JlY2VpdmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPlJlY3VlPC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gYDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLWFkZFwiIGRhdGEtYWRkLWZyaWVuZC1pZD1cIiR7dS51c2VySWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGx1c1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3UucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbCh1LnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKHUudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbCh1LnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3JhdGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHt1LnJhdGluZ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hY3Rpb25zXCI+JHthY3Rpb25IdG1sfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWRkLWZyaWVuZC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZEZyaWVuZFJlcXVlc3QoYnRuLmRhdGFzZXQuYWRkRnJpZW5kSWQsIGJ0bik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VuZEZyaWVuZFJlcXVlc3QodXNlcklkLCBidG4pIHtcclxuICAgICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9yZXF1ZXN0LyR7dXNlcklkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBidG4ub3V0ZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+RW52b3llZTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IGJ0bi5kaXNhYmxlZCA9IGZhbHNlOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXBvcnRNZXNzYWdlQWN0aW9uKG1lc3NhZ2VJZCwgYnRuKSB7XHJcbiAgICAgICAgY29uc3QgcmVhc29uID0gcHJvbXB0KCdSYWlzb24gZHUgc2lnbmFsZW1lbnQgOicpO1xyXG4gICAgICAgIGlmIChyZWFzb24gPT09IG51bGwpIHJldHVybjsgLy8gY2FuY2VsbGVkXHJcblxyXG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7bWVzc2FnZUlkfS9yZXBvcnRgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcmVhc29uOiByZWFzb24gfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBidG4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrXCI+PC9pPic7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnY2hhdC1tZXNzYWdlX19yZXBvcnQtLWRvbmUnKTtcclxuICAgICAgICAgICAgICAgIGJ0bi50aXRsZSA9ICdTaWduYWxlJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4geyBidG4uZGlzYWJsZWQgPSBmYWxzZTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBDT05WRVJTQVRJT05cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gb3BlbkNvbnZlcnNhdGlvbih1c2VySWQsIHVzZXJuYW1lKSB7XHJcbiAgICAgICAgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgICBsYXN0TWVzc2FnZUlkID0gMDtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX3RhYnMnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19jb250ZW50Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBjb25zdCBjb252RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNvbnZlcnNhdGlvbl0nKTtcclxuICAgICAgICBjb252RWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW5hbWVdJykudGV4dENvbnRlbnQgPSB1c2VybmFtZTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW1lc3NhZ2VzXScpO1xyXG4gICAgICAgIG1lc3NhZ2VzRWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19sb2FkaW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBDaGFyZ2VtZW50Li4uPC9kaXY+JztcclxuXHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7dXNlcklkfWAsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKGRhdGEubWVzc2FnZXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgc3RhcnRNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlck1lc3NhZ2VzKG1lc3NhZ2VzLCBhcHBlbmQpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW1lc3NhZ2VzXScpO1xyXG5cclxuICAgICAgICBpZiAoIWFwcGVuZCkge1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RGVidXQgZGUgbGEgY29udmVyc2F0aW9uLiBFbnZveWV6IGxlIHByZW1pZXIgbWVzc2FnZSE8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzRWwuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNpIG9uIGFqb3V0ZSBkZXMgbWVzc2FnZXMgZXQgcXVlIGxlIGNvbnRlbmV1ciBhZmZpY2hlIGxlIHBsYWNlaG9sZGVyLCBsZSBzdXBwcmltZXJcclxuICAgICAgICBpZiAoYXBwZW5kICYmIG1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBtZXNzYWdlc0VsLnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19lbXB0eScpO1xyXG4gICAgICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHBsYWNlaG9sZGVyLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtc2cgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLmlkID4gbGFzdE1lc3NhZ2VJZCkgbGFzdE1lc3NhZ2VJZCA9IG1zZy5pZDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2hhdC1tZXNzYWdlJywgbXNnLmlzRnJvbU1lID8gJ2NoYXQtbWVzc2FnZS0tbWluZScgOiAnY2hhdC1tZXNzYWdlLS10aGVpcnMnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXBvcnRCdG4gPSAnJztcclxuICAgICAgICAgICAgaWYgKCFtc2cuaXNGcm9tTWUpIHtcclxuICAgICAgICAgICAgICAgIHJlcG9ydEJ0biA9IGA8YnV0dG9uIGNsYXNzPVwiY2hhdC1tZXNzYWdlX19yZXBvcnRcIiBkYXRhLXJlcG9ydC1tc2ctaWQ9XCIke21zZy5pZH1cIiB0aXRsZT1cIlNpZ25hbGVyIGNlIG1lc3NhZ2VcIj48aSBjbGFzcz1cImZhcyBmYS1mbGFnXCI+PC9pPjwvYnV0dG9uPmA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICAke2VzY2FwZUh0bWwobXNnLmNvbnRlbnQpfVxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGF0LW1lc3NhZ2VfX3RpbWVcIj4ke2VzY2FwZUh0bWwobXNnLmRhdGUpfSAke3JlcG9ydEJ0bn08L3NwYW4+XHJcbiAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgICAgICAvLyBBdHRhY2ggcmVwb3J0IGhhbmRsZXJcclxuICAgICAgICAgICAgY29uc3QgcmVwb3J0RWwgPSBkaXYucXVlcnlTZWxlY3RvcignW2RhdGEtcmVwb3J0LW1zZy1pZF0nKTtcclxuICAgICAgICAgICAgaWYgKHJlcG9ydEVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnRFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRNZXNzYWdlQWN0aW9uKHJlcG9ydEVsLmRhdGFzZXQucmVwb3J0TXNnSWQsIHJlcG9ydEVsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZXNzYWdlc0VsLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1lc3NhZ2VzRWwuc2Nyb2xsVG9wID0gbWVzc2FnZXNFbC5zY3JvbGxIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2VuZCBtZXNzYWdlXHJcbiAgICBjb25zdCBzZW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLXNlbmRdJyk7XHJcbiAgICBjb25zdCBpbnB1dEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLWlucHV0XScpO1xyXG5cclxuICAgIGlmIChzZW5kQnRuICYmIGlucHV0RWwpIHtcclxuICAgICAgICBzZW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VuZE1lc3NhZ2UpO1xyXG4gICAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgc2VuZE1lc3NhZ2UoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kTWVzc2FnZSgpIHtcclxuICAgICAgICBjb25zdCBjb250ZW50ID0gaW5wdXRFbC52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgaWYgKCFjb250ZW50IHx8ICFjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlucHV0RWwudmFsdWUgPSAnJztcclxuXHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7Y3VycmVudENvbnZlcnNhdGlvblVzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY29udGVudDogY29udGVudCB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgJiYgZGF0YS5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhbZGF0YS5tZXNzYWdlXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBCYWNrIGJ1dHRvblxyXG4gICAgY29uc3QgYmFja0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1iYWNrXScpO1xyXG4gICAgaWYgKGJhY2tCdG4pIHtcclxuICAgICAgICBiYWNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkID0gbnVsbDtcclxuICAgICAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3dpdGNoVGFiKCdmcmllbmRzJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBNRVNTQUdFIFBPTExJTkcgKGV2ZXJ5IDVzIHdoZW4gY29udmVyc2F0aW9uIG9wZW4pXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIHN0YXJ0TWVzc2FnZVBvbGxpbmcoKSB7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHtjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkfT9hZnRlcklkPSR7bGFzdE1lc3NhZ2VJZH1gLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lc3NhZ2VzICYmIGRhdGEubWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKGRhdGEubWVzc2FnZXMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1MDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdG9wTWVzc2FnZVBvbGxpbmcoKSB7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChtZXNzYWdlUG9sbGluZ0ludGVydmFsKTtcclxuICAgICAgICAgICAgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gVU5SRUFEIENPVU5UIFBPTExJTkcgKGV2ZXJ5IDMwcywgYWx3YXlzIGFjdGl2ZSlcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gZmV0Y2hVbnJlYWRDb3VudCgpIHtcclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvdW5yZWFkLWNvdW50Jywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEudG90YWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS50ZXh0Q29udGVudCA9IGRhdGEudG90YWw7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0c0JhZGdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcmVxdWVzdHMtYmFkZ2VdJyk7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0c0JhZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wZW5kaW5nUmVxdWVzdHMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS50ZXh0Q29udGVudCA9IGRhdGEucGVuZGluZ1JlcXVlc3RzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmV0Y2hVbnJlYWRDb3VudCgpO1xyXG4gICAgdW5yZWFkUG9sbGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZmV0Y2hVbnJlYWRDb3VudCwgMzAwMDApO1xyXG59KTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbImVzY2FwZUh0bWwiLCJzdHIiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwiaW5uZXJIVE1MIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJ1cmdlciIsInF1ZXJ5U2VsZWN0b3IiLCJuYXYiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJTVEFUX01BWCIsImRtZyIsInNwZWVkIiwiZG9kZ2UiLCJjcml0IiwiaHAiLCJwb3J0cmFpdHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGV0YWlscyIsImdldEVsZW1lbnRCeUlkIiwic2VsZWN0ZWRMaXN0IiwibGF1bmNoQnRuIiwibGVuZ3RoIiwibWF4U2VsZWN0aW9uIiwic2VsZWN0ZWRIZXJvZXMiLCJzZWxlY3RlZEhlcm9JZHMiLCJST0xFX0NBVEVHT1JJRVMiLCJnZXRTZWxlY3RlZFJvbGVzIiwicm9sZXMiLCJUYW5rIiwiRFBTIiwiSGVhbGVyIiwiU3VwcG9ydCIsImZvckVhY2giLCJpZCIsInAiLCJBcnJheSIsImZyb20iLCJmaW5kIiwicHAiLCJkYXRhc2V0IiwiY2F0Iiwicm9sZSIsImNhblNlbGVjdFJvbGUiLCJwb3J0cmFpdCIsInJlbW92ZSIsImFkZCIsIm5hbWUiLCJkbWdNaW4iLCJOdW1iZXIiLCJkbWdNYXgiLCJzcHJpdGVGaWxlIiwic3ByaXRlIiwiYWJpbGl0eU5hbWUiLCJhYmlsaXR5RGVzYyIsImFiaWxpdHlDZCIsInNwcml0ZVBhdGgiLCJjb25jYXQiLCJpc1NlbGVjdGVkIiwiaW5jbHVkZXMiLCJhYmlsaXR5SHRtbCIsIk1hdGgiLCJtaW4iLCJidG5SaWdodCIsInJvbGVDYXQiLCJhbHJlYWR5U2VsZWN0ZWQiLCJkaXNhYmxlZCIsInRleHRDb250ZW50IiwiZmlsdGVyIiwiaGlkIiwiaCIsImFsZXJ0IiwicHVzaCIsInVwZGF0ZVNlbGVjdGVkVGVhbSIsImhlcm8iLCJoZXJvRWwiLCJ1cGRhdGVSb2xlSW5kaWNhdG9ycyIsInRlYW1Db21wbGV0ZSIsImluZGljYXRvciIsInNsb3QiLCJzYXZlUHJlc2V0QnRuIiwicHJlc2V0TW9kYWwiLCJwcmVzZXROYW1lSW5wdXQiLCJwcmVzZXRDb25maXJtQnRuIiwicHJlc2V0Q2FuY2VsQnRuIiwidXBkYXRlU2F2ZVByZXNldEJ0biIsIm9yaWdpbmFsVXBkYXRlU2VsZWN0ZWRUZWFtIiwiX29yaWdVcGRhdGUiLCJfb3JpZ1JvbGVJbmRpY2F0b3JzIiwidmFsdWUiLCJzdHlsZSIsImRpc3BsYXkiLCJzZXRUaW1lb3V0IiwiZm9jdXMiLCJ0cmltIiwiYm9yZGVyQ29sb3IiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNoYXJhY3RlcklkcyIsIm1hcCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsInN1Y2Nlc3MiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImVycm9yIiwiZSIsImtleSIsImNsaWNrIiwibG9hZFByZXNldCIsImlkU3RyIiwiU3RyaW5nIiwiZGVsZXRlUHJlc2V0IiwicHJlc2V0SWQiLCJjaGlwRWwiLCJjb25maXJtIiwibGlzdCIsImNoaWxkcmVuIiwiX2RvY3VtZW50JHF1ZXJ5U2VsZWN0IiwiY2hpcCIsImNoYXJJZHMiLCJwYXJzZSIsInByZXNldElkcyIsInN0b3BQcm9wYWdhdGlvbiIsInNlbGVjdGVkTGlzdE9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJpIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsInJlc3BvbnNlIiwicmVkaXJlY3RlZCIsImhyZWYiLCJ1cmwiLCJwb3B1cCIsImJhY2tkcm9wIiwiY2xvc2VCdG4iLCJjb250ZW50IiwibG9hZGVkIiwib3BlblBvcHVwIiwib2Zmc2V0SGVpZ2h0IiwiZmV0Y2hQcm9maWxlIiwiY2xvc2VQb3B1cCIsInJlbmRlclByb2ZpbGUiLCJyZXN1bHRDbGFzcyIsInIiLCJyZXN1bHRMYWJlbCIsImF2YXRhckh0bWwiLCJwcm9maWxlSW1hZ2UiLCJ1c2VybmFtZSIsImh0bWwiLCJtb3R0byIsImJpbyIsInJhdGluZyIsInN0YXRzIiwid2lucyIsImxvc3NlcyIsIndpblJhdGUiLCJmYXZvcml0ZUNoYXJhY3RlciIsImdhbWVzUGxheWVkIiwibGFzdFRlYW0iLCJjIiwicmVjZW50QmF0dGxlcyIsImIiLCJwYXJzZUludCIsInJlc3VsdCIsIm9wcG9uZW50IiwibWF0Y2hUeXBlIiwidG9VcHBlckNhc2UiLCJkYXRlIiwiQ29tYmF0Q29udHJvbGxlciIsImNvbnRhaW5lciIsIl9jbGFzc0NhbGxDaGVjayIsImxvZ3MiLCJjdXJyZW50SW5kZXgiLCJpc1BsYXlpbmciLCJpc1BhdXNlZCIsImNoYXJhY3RlckVsZW1lbnRzIiwiY2hhcmFjdGVyTWF4SFAiLCJpbml0IiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJsb2dzRGF0YSIsImNvbWJhdExvZ3MiLCJjb25zb2xlIiwibG9nQ29udGFpbmVyIiwib3ZlcmxheSIsInBsYXlCdG4iLCJza2lwQnRuIiwic3BlZWRCdG5zIiwiY2hhcmFjdGVyU2x1Z3MiLCJjaGFyYWN0ZXJIYXNIZWFsIiwiYWJpbGl0eUNvb2xkb3ducyIsImVsIiwiY2hhcmFjdGVyTmFtZSIsInRlYW0iLCJjaGFyYWN0ZXJUZWFtIiwiY2hhcmFjdGVyU2x1ZyIsImhhc0hlYWwiLCJocFRleHQiLCJtYXRjaCIsImFiaWxpdHlFbGVtZW50cyIsImNoYXJOYW1lIiwiY2hhclRlYW0iLCJhYmlsaXR5RWwiLCJtYXhDZCIsImFiaWxpdHlNYXhDZCIsImJhZGdlIiwibmFtZUVsIiwiaWNvbkVsIiwib3BhY2l0eSIsImJpbmRFdmVudHMiLCJwbGF5IiwiX3RoaXMyIiwidG9nZ2xlUGxheSIsInNraXAiLCJidG4iLCJzZXRTcGVlZCIsInVwZGF0ZVBsYXlCdXR0b24iLCJwcm9jZXNzTmV4dExvZyIsInBhdXNlIiwibG9nIiwiZGlzcGxheUxvZyIsInVwZGF0ZUhlYWx0aEJhcnMiLCJ0cmFja0FiaWxpdHlDb29sZG93bnMiLCJ0eXBlIiwiYW5pbWF0ZURlYXRoIiwidGFyZ2V0IiwidGFyZ2V0VGVhbSIsInNob3dWaWN0b3J5T3ZlcmxheSIsImV2ZW50IiwicGFyc2VGbG9hdCIsImN1cnJlbnRUYXJnZXQiLCJjb21iYXRTcGVlZCIsIl90aGlzMyIsInByb2Nlc3NMb2ciLCJkZWxheSIsImdldERlbGF5Rm9yTG9nIiwiZ2V0QWJpbGl0eURlbGF5Iiwic3VidHlwZSIsIl90aGlzNCIsInBsYXlBbmltYXRpb24iLCJocERlbGF5IiwiZ2V0SFBVcGRhdGVEZWxheSIsImNhc3RlciIsImNhc3RlclRlYW0iLCJhYmlsaXR5RGF0YSIsInVwZGF0ZUFiaWxpdHlDb29sZG93bkRpc3BsYXkiLCJjZCIsImdldEFiaWxpdHlIUERlbGF5IiwiYW5pbWF0ZUF0dGFjayIsImF0dGFja2VyIiwiYXR0YWNrZXJUZWFtIiwiaXNDcml0IiwiYW5pbWF0ZUhlYWwiLCJoZWFsZXIiLCJoZWFsZXJUZWFtIiwiYW5pbWF0ZURlZmVuZCIsImRlZmVuZGVyIiwiZGVmZW5kZXJUZWFtIiwiYW5pbWF0ZURvZGdlIiwiYW5pbWF0ZURvVCIsImFuaW1hdGVTdHVubmVkIiwicGxheUFiaWxpdHlBbmltYXRpb24iLCJ0YXJnZXROYW1lIiwiZG90Q2xhc3MiLCJnZXRDaGFyYWN0ZXJFbGVtZW50IiwiYW5pbWF0ZU1hcmtlZCIsImFuaW1hdGVCdWZmIiwiYW5pbWF0ZVN0ZWFsdGgiLCJfdGhpczUiLCJtYXJrS2V5Iiwic3dhcFNwcml0ZSIsInJpcG9zdGVLZXkiLCJzZWxmQnVmZktleSIsImhlYWxlZCIsInBhcnR5QnVmZktleSIsImFuaW1hdGVUZWFtQnVmZiIsInN0ZWFsdGhLZXkiLCJfdGhpczYiLCJPYmplY3QiLCJrZXlzIiwic3RhcnRzV2l0aCIsInNwcml0ZU5hbWUiLCJkdXJhdGlvbiIsIl90aGlzNyIsInNsdWciLCJpbWciLCJzcmMiLCJjb250YWlucyIsImF0dGFja2VyTmFtZSIsImhlYWxlck5hbWUiLCJkZWZlbmRlck5hbWUiLCJlbnRyeSIsImNsYXNzTmFtZSIsIm1lc3NhZ2UiLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJ0ZWFtTmFtZSIsImN1cnJlbnRIUCIsIm1heEhQIiwidGFyZ2V0SFAiLCJ0YXJnZXRNYXhIUCIsInVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzIiwidW5kZWZpbmVkIiwidXBkYXRlQ2hhcmFjdGVySFAiLCJfdGhpczgiLCJtYXhIcCIsInBlcmNlbnQiLCJocEJhciIsInRyYW5zaXRpb24iLCJ3aWR0aCIsInVwZGF0ZUluZm9QYW5lbCIsInBhbmVsQ2xhc3MiLCJwYW5lbCIsImNoYXJhY3RlckluZm9zIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsIl9sb29wIiwiaW5mbyIsInN0YXRzU3BhbiIsInMiLCJuIiwiZG9uZSIsImVyciIsImYiLCJfdGhpczkiLCJmaW5hbGl6ZVJhdGluZyIsIl90aGlzMCIsImZpbmFsaXplVXJsIiwicmF0aW5nQ2hhbmdlIiwic2hvd1JhdGluZ1VwZGF0ZSIsIm5ld1JhdGluZyIsIm5ld1JhdGluZzIiLCJjaGFuZ2UiLCJyYXRpbmdFbCIsInJhdGluZ0VsMiIsIndpbm5lckRpdiIsIm5vdGlmMSIsImNzc1RleHQiLCJjb2xvciIsImNoYW5nZTIiLCJub3RpZjIiLCJjb21iYXRDb250YWluZXIiLCJwYW5lbE9wZW4iLCJjdXJyZW50VGFiIiwiY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCIsImxhc3RNZXNzYWdlSWQiLCJtZXNzYWdlUG9sbGluZ0ludGVydmFsIiwidW5yZWFkUG9sbGluZ0ludGVydmFsIiwiZnJpZW5kc0xvYWRlZCIsInJlcXVlc3RzTG9hZGVkIiwib3BlblBhbmVsIiwibG9hZEZyaWVuZHMiLCJjbG9zZVBhbmVsIiwic3RvcE1lc3NhZ2VQb2xsaW5nIiwidGFiQnRuIiwidGFiTmFtZSIsImZyaWVuZHNUYWIiLCJzd2l0Y2hUYWIiLCJ0YWJDb250ZW50IiwibG9hZFJlcXVlc3RzIiwiZnJpZW5kcyIsInVzZXJJZCIsImxhc3RNZXNzYWdlIiwiaXNGcm9tTWUiLCJpdGVtIiwiZnJpZW5kVXNlcklkIiwib3BlbkNvbnZlcnNhdGlvbiIsInJlcXVlc3RzIiwiZnJpZW5kc2hpcElkIiwiaGFuZGxlUmVxdWVzdCIsImFjY2VwdElkIiwicmVqZWN0SWQiLCJhY3Rpb24iLCJmZXRjaFVucmVhZENvdW50Iiwic2VhcmNoSW5wdXQiLCJzZWFyY2hSZXN1bHRzIiwic2VhcmNoVGltZW91dCIsImNsZWFyVGltZW91dCIsInF1ZXJ5IiwidXNlcnMiLCJ1IiwiYWN0aW9uSHRtbCIsImZyaWVuZFN0YXR1cyIsInNlbmRGcmllbmRSZXF1ZXN0IiwiYWRkRnJpZW5kSWQiLCJvdXRlckhUTUwiLCJyZXBvcnRNZXNzYWdlQWN0aW9uIiwibWVzc2FnZUlkIiwicmVhc29uIiwicHJvbXB0IiwidGl0bGUiLCJjb252RWwiLCJtZXNzYWdlc0VsIiwicmVuZGVyTWVzc2FnZXMiLCJtZXNzYWdlcyIsInN0YXJ0TWVzc2FnZVBvbGxpbmciLCJhcHBlbmQiLCJwbGFjZWhvbGRlciIsIm1zZyIsInJlcG9ydEJ0biIsInJlcG9ydEVsIiwicmVwb3J0TXNnSWQiLCJzZW5kQnRuIiwiaW5wdXRFbCIsInNlbmRNZXNzYWdlIiwiYmFja0J0biIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInRvdGFsIiwicmVxdWVzdHNCYWRnZSIsInBlbmRpbmdSZXF1ZXN0cyJdLCJzb3VyY2VSb290IjoiIn0=