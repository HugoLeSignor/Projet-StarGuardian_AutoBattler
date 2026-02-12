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
          if (log.caster && log.casterTeam) {
            var markKey = "".concat(log.casterTeam, "-").concat(log.caster);
            this.swapSprite(markKey, 'skill.webp', 800);
            this.animateBuff(log.caster, log.casterTeam);
          }
          if (log.target && log.targetTeam) this.animateMarked(log.target, log.targetTeam);
          break;
        case 'riposte_buff':
          if (log.caster && log.casterTeam) {
            var riposteKey = "".concat(log.casterTeam, "-").concat(log.caster);
            this.swapSprite(riposteKey, 'skill.webp', 800);
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
            this.swapSprite(selfBuffKey, 'skill.webp', 800);
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
                  }, 800);
                }
              });
            }
          }
          break;
        case 'party_buff':
          if (log.caster && log.casterTeam) {
            var partyBuffKey = "".concat(log.casterTeam, "-").concat(log.caster);
            this.swapSprite(partyBuffKey, 'skill.webp', 800);
            this.animateBuff(log.caster, log.casterTeam);
          }
          // Animer tous les alliés du même côté
          this.animateTeamBuff(log.casterTeam);
          break;
        case 'stealth':
          if (log.caster && log.casterTeam) {
            var stealthKey = "".concat(log.casterTeam, "-").concat(log.caster);
            this.swapSprite(stealthKey, 'skill.webp', 800);
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
        this.swapSprite(key, 'attackanimation.webp', 600);
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
        var key = "".concat(healerTeam, "-").concat(healerName);
        if (this.characterHasHeal[key]) {
          this.swapSprite(key, 'healing.webp', 800);
        } else {
          this.swapSprite(key, 'skill.webp', 800);
        }
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
        var key = "".concat(defenderTeam, "-").concat(defenderName);
        this.swapSprite(key, 'defending.webp', 1000);
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RSxJQUFJNlosYUFBYSxFQUFFO1FBQ2YsSUFBSXpULElBQUksQ0FBQzBULGVBQWUsR0FBRyxDQUFDLEVBQUU7VUFDMUJELGFBQWEsQ0FBQ2pXLFdBQVcsR0FBR3dDLElBQUksQ0FBQzBULGVBQWU7VUFDaERELGFBQWEsQ0FBQzFVLEtBQUssQ0FBQ0MsT0FBTyxHQUFHLGNBQWM7UUFDaEQsQ0FBQyxNQUFNO1VBQ0h5VSxhQUFhLENBQUMxVSxLQUFLLENBQUNDLE9BQU8sR0FBRyxNQUFNO1FBQ3hDO01BQ0o7SUFDSixDQUFDLENBQUMsU0FDSSxDQUFDLFlBQU0sQ0FBQyxDQUFDLENBQUM7RUFDcEI7RUFFQXFTLGdCQUFnQixDQUFDLENBQUM7RUFDbEIxQixxQkFBcUIsR0FBRzJELFdBQVcsQ0FBQ2pDLGdCQUFnQixFQUFFLEtBQUssQ0FBQztBQUNoRSxDQUFDLENBQUMsQzs7Ozs7Ozs7Ozs7O0FDdGZGOzs7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9jb21iYXQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2ZyaWVuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzPzJkYzkiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9hcHAuc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBXZWxjb21lIHRvIHlvdXIgYXBwJ3MgbWFpbiBKYXZhU2NyaXB0IGZpbGUhXHJcbiAqL1xyXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcyc7XHJcbmltcG9ydCAnLi9qcy9jb21iYXQuanMnO1xyXG5pbXBvcnQgJy4vanMvZnJpZW5kcy5qcyc7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIFVUSUxJVEFJUkUgU0VDVVJJVEUgWFNTXHJcbj09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcclxuICAgIGlmICghc3RyKSByZXR1cm4gJyc7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKTtcclxuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIE1FTlUgQlVSR0VSXHJcbj09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXJnZXJcIik7XHJcbiAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tbmF2aWdhdGlvblwiKTtcclxuXHJcbiAgICBpZiAoYnVyZ2VyICYmIG5hdikge1xyXG4gICAgICAgIGJ1cmdlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgUEFHRSBURUFNUyAoQ09SUklHw4lFKVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyog8J+UpyBNQVggREVTIFNUQVRTIChhZGFwdGVyIMOgIHRhIEJERCAvIMOpcXVpbGlicmFnZSkgKi9cclxuY29uc3QgU1RBVF9NQVggPSB7XHJcbiAgICBkbWc6IDMwLFxyXG4gICAgc3BlZWQ6IDEyLFxyXG4gICAgZG9kZ2U6IDQwLFxyXG4gICAgY3JpdDogMTUsXHJcbiAgICBocDogNzVcclxufTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBwb3J0cmFpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVhbS1wb3J0cmFpdCcpO1xyXG4gICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZWFtRGV0YWlscycpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkLWxpc3QnKTtcclxuICAgIGNvbnN0IGxhdW5jaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tbGF1bmNoJyk7XHJcblxyXG4gICAgaWYgKCFkZXRhaWxzIHx8IHBvcnRyYWl0cy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBtYXhTZWxlY3Rpb24gPSAzO1xyXG4gICAgbGV0IHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICBsZXQgc2VsZWN0ZWRIZXJvSWRzID0gW107XHJcblxyXG4gICAgLy8gQ29tcG9zaXRpb24gb2JsaWdhdG9pcmUgOiAxIFRhbmssIDEgRFBTLCAxIFN1cHBvcnRcclxuICAgIGNvbnN0IFJPTEVfQ0FURUdPUklFUyA9IHsgJ1RhbmsnOiAnVGFuaycsICdEUFMnOiAnRFBTJywgJ1N1cHBvcnQnOiAnU3VwcG9ydCcsICdTb2lnbmV1cic6ICdTdXBwb3J0JywgJ0J1ZmZlcic6ICdTdXBwb3J0JyB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkUm9sZXMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSB7IFRhbms6IDAsIERQUzogMCwgU3VwcG9ydDogMCB9O1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHBwID0+IHBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgaWYgKHApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhdCA9IFJPTEVfQ0FURUdPUklFU1twLmRhdGFzZXQucm9sZV0gfHwgJ1N1cHBvcnQnO1xyXG4gICAgICAgICAgICAgICAgcm9sZXNbY2F0XSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhblNlbGVjdFJvbGUocm9sZSkge1xyXG4gICAgICAgIGNvbnN0IGNhdCA9IFJPTEVfQ0FURUdPUklFU1tyb2xlXSB8fCAnU3VwcG9ydCc7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzW2NhdF0gPCAxO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcnRyYWl0cy5mb3JFYWNoKHBvcnRyYWl0ID0+IHtcclxuICAgICAgICBwb3J0cmFpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHBvcnRyYWl0LmRhdGFzZXQuaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwb3J0cmFpdC5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGUgPSBwb3J0cmFpdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01pbiA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01pbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01heCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01heCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuc3BlZWQpO1xyXG4gICAgICAgICAgICBjb25zdCBkb2RnZSA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRvZGdlKTtcclxuICAgICAgICAgICAgY29uc3QgY3JpdCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmNyaXQpO1xyXG4gICAgICAgICAgICBjb25zdCBocCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmhwKTtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlRmlsZSA9IHBvcnRyYWl0LmRhdGFzZXQuc3ByaXRlO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5TmFtZSA9IHBvcnRyYWl0LmRhdGFzZXQuYWJpbGl0eU5hbWUgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlEZXNjID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5RGVzYyB8fCAnJztcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUNkID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5Q2QgfHwgJyc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7c3ByaXRlRmlsZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlIdG1sID0gYWJpbGl0eU5hbWUgPyBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFiaWxpdHktc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZpcmUtYWx0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX25hbWVcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eU5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19jZFwiPjxpIGNsYXNzPVwiZmFzIGZhLWhvdXJnbGFzcy1oYWxmXCI+PC9pPiAke2VzY2FwZUh0bWwoYWJpbGl0eUNkKX1UPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX2Rlc2NcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eURlc2MpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCA6ICcnO1xyXG5cclxuICAgICAgICAgICAgZGV0YWlscy5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhbS1kZXRhaWxzLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDI+JHtuYW1lfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJyb2xlXCI+JHtyb2xlfTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdpZi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Nwcml0ZVBhdGh9XCIgYWx0PVwiU3ByaXRlIGRlICR7bmFtZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ETUc8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tZG1nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChkbWdNYXggLyBTVEFUX01BWC5kbWcpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkbWdNaW59IC0gJHtkbWdNYXh9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5WSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tc3BkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChzcGVlZCAvIFNUQVRfTUFYLnNwZWVkKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7c3BlZWR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ET0RHRTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1kb2RnZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoZG9kZ2UgLyBTVEFUX01BWC5kb2RnZSkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2RvZGdlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q1JJVDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1jcml0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChjcml0IC8gU1RBVF9NQVguY3JpdCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2NyaXR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5IUDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1ocFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoaHAgLyBTVEFUX01BWC5ocCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2hwfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR7YWJpbGl0eUh0bWx9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tc2VsZWN0LXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7aXNTZWxlY3RlZCA/ICdEw6lzw6lsZWN0aW9ubmVyJyA6ICdTw6lsZWN0aW9ubmVyJ31cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYnRuUmlnaHQgPSBkZXRhaWxzLnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2VsZWN0LXJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVDYXQgPSBST0xFX0NBVEVHT1JJRVNbcm9sZV0gfHwgJ1N1cHBvcnQnO1xyXG4gICAgICAgICAgICBjb25zdCBhbHJlYWR5U2VsZWN0ZWQgPSBzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gRMOpc2FjdGl2ZXIgbGUgYm91dG9uIHNpIGxlIHNsb3QgZGUgY2UgcsO0bGUgZXN0IGTDqWrDoCBwcmlzXHJcbiAgICAgICAgICAgIGlmICghYWxyZWFkeVNlbGVjdGVkICYmICFjYW5TZWxlY3RSb2xlKHJvbGUpKSB7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IGBTbG90ICR7cm9sZUNhdH0gZMOpasOgIHByaXNgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzID0gc2VsZWN0ZWRIZXJvSWRzLmZpbHRlcihoaWQgPT4gaGlkICE9PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBzZWxlY3RlZEhlcm9lcy5maWx0ZXIoaCA9PiBoICE9PSBuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhblNlbGVjdFJvbGUocm9sZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoYFZvdXMgYXZleiBkw6lqw6AgdW4gJHtyb2xlQ2F0fSBkYW5zIHZvdHJlIMOpcXVpcGUgIWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMubGVuZ3RoID49IG1heFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIlZvdXMgcG91dmV6IHPDqWxlY3Rpb25uZXIgbWF4aW11bSAzIHBlcnNvbm5hZ2VzICFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzLnB1c2gobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LnRleHRDb250ZW50ID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKVxyXG4gICAgICAgICAgICAgICAgICAgID8gJ0TDqXPDqWxlY3Rpb25uZXInXHJcbiAgICAgICAgICAgICAgICAgICAgOiAnU8OpbGVjdGlvbm5lcic7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qICBaT05FIMOJUVVJUEUg4oCUIHNwcml0ZXMgc2V1bGVtZW50ICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTZWxlY3RlZFRlYW0oKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm8gPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwID0+IHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAoIWhlcm8pIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGhlcm8uZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7aGVyby5kYXRhc2V0LnNwcml0ZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgaGVyb0VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWhlcm8tc3ByaXRlJyk7XHJcbiAgICAgICAgICAgIGhlcm9FbC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c3ByaXRlUGF0aH1cIiBhbHQ9XCJTcHJpdGUgZGUgJHtuYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+JHtuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgc2VsZWN0ZWRMaXN0LmFwcGVuZENoaWxkKGhlcm9FbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbGVzIGluZGljYXRldXJzIGRlIHLDtGxlc1xyXG4gICAgICAgIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCk7XHJcblxyXG4gICAgICAgIGlmIChsYXVuY2hCdG4pIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW1Db21wbGV0ZSA9IHJvbGVzLlRhbmsgPT09IDEgJiYgcm9sZXMuRFBTID09PSAxICYmIHJvbGVzLlN1cHBvcnQgPT09IDE7XHJcbiAgICAgICAgICAgIGxhdW5jaEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCkge1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgIGNvbnN0IGluZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb2xlLWluZGljYXRvcicpO1xyXG4gICAgICAgIGlmIChpbmRpY2F0b3IpIHtcclxuICAgICAgICAgICAgaW5kaWNhdG9yLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb2xlLXNsb3QnKS5mb3JFYWNoKHNsb3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2F0ID0gc2xvdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgICAgICBpZiAocm9sZXNbY2F0XSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2xhc3NMaXN0LnJlbW92ZSgnZmlsbGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgUFJFU0VUU1xyXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuICAgIGNvbnN0IHNhdmVQcmVzZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXNhdmUtcHJlc2V0Jyk7XHJcbiAgICBjb25zdCBwcmVzZXRNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRNb2RhbCcpO1xyXG4gICAgY29uc3QgcHJlc2V0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldE5hbWUnKTtcclxuICAgIGNvbnN0IHByZXNldENvbmZpcm1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0Q29uZmlybScpO1xyXG4gICAgY29uc3QgcHJlc2V0Q2FuY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldENhbmNlbCcpO1xyXG5cclxuICAgIC8vIE1ldHRyZSBhIGpvdXIgbGUgYm91dG9uIHNhdXZlZ2FyZGVyIHNlbG9uIGxhIHNlbGVjdGlvblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2F2ZVByZXNldEJ0bigpIHtcclxuICAgICAgICBpZiAoc2F2ZVByZXNldEJ0bikge1xyXG4gICAgICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbUNvbXBsZXRlID0gcm9sZXMuVGFuayA9PT0gMSAmJiByb2xlcy5EUFMgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgc2F2ZVByZXNldEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcGVsZXIgdXBkYXRlU2F2ZVByZXNldEJ0biBhIGNoYXF1ZSBjaGFuZ2VtZW50IGRlIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0gPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcbiAgICAvLyBPbiBzdXJjaGFyZ2UgZW4gYWpvdXRhbnQgbCdhcHBlbFxyXG4gICAgY29uc3QgX29yaWdVcGRhdGUgPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcblxyXG4gICAgLy8gUGF0Y2g6IGFqb3V0ZXIgbCdhcHBlbCBhIHVwZGF0ZVNhdmVQcmVzZXRCdG4gZGFucyB1cGRhdGVTZWxlY3RlZFRlYW1cclxuICAgIC8vIE9uIGxlIGZhaXQgZW4gd3JhcHBhbnQgbGVzIGluZGljYXRldXJzXHJcbiAgICBjb25zdCBfb3JpZ1JvbGVJbmRpY2F0b3JzID0gdXBkYXRlUm9sZUluZGljYXRvcnM7XHJcblxyXG4gICAgLy8gT3V2cmlyIGxhIG1vZGFsXHJcbiAgICBpZiAoc2F2ZVByZXNldEJ0biAmJiBwcmVzZXRNb2RhbCkge1xyXG4gICAgICAgIHNhdmVQcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHByZXNldE5hbWVJbnB1dC5mb2N1cygpLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGZXJtZXIgbGEgbW9kYWxcclxuICAgICAgICBwcmVzZXRDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByZXNldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtbW9kYWxfX2JhY2tkcm9wJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNhdXZlZ2FyZGVyIGxlIHByZXNldFxyXG4gICAgICAgIHByZXNldENvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcmVzZXROYW1lSW5wdXQudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZGMxNDNjJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnLi4uJztcclxuXHJcbiAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvcHJlc2V0cy9zYXZlJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVySWRzOiBzZWxlY3RlZEhlcm9JZHMubWFwKE51bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWNoYXJnZXIgbGEgcGFnZSBwb3VyIGFmZmljaGVyIGxlIG5vdXZlYXUgcHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yIHx8ICdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUnKTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRW50ZXIgcG91ciB2YWxpZGVyXHJcbiAgICAgICAgcHJlc2V0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHByZXNldENvbmZpcm1CdG4uY2xpY2soKTtcclxuICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhcmdlciB1biBwcmVzZXQgKHNlbGVjdGlvbiBwcm9ncmFtbWF0aXF1ZSBkZXMgcGVyc29ubmFnZXMpXHJcbiAgICBmdW5jdGlvbiBsb2FkUHJlc2V0KGNoYXJhY3Rlcklkcykge1xyXG4gICAgICAgIC8vIFJlc2V0IGxhIHNlbGVjdGlvbiBhY3R1ZWxsZVxyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG5cclxuICAgICAgICAvLyBTZWxlY3Rpb25uZXIgbGVzIHBlcnNvbm5hZ2VzIGR1IHByZXNldFxyXG4gICAgICAgIGNoYXJhY3Rlcklkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWRTdHIgPSBTdHJpbmcoaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3J0cmFpdCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBpZFN0cik7XHJcbiAgICAgICAgICAgIGlmIChwb3J0cmFpdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWRTdHIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMucHVzaChwb3J0cmFpdC5kYXRhc2V0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICB1cGRhdGVTYXZlUHJlc2V0QnRuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3VwcHJpbWVyIHVuIHByZXNldFxyXG4gICAgZnVuY3Rpb24gZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwRWwpIHtcclxuICAgICAgICBpZiAoIWNvbmZpcm0oJ1N1cHByaW1lciBjZSBwcmVzZXQgPycpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGAvdGVhbXMvcHJlc2V0cy8ke3ByZXNldElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlwRWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTaSBwbHVzIGRlIHByZXNldHMsIGNhY2hlciBsYSBiYXJyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXRzLWJhcl9fbGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QgJiYgbGlzdC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0cy1iYXInKT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXR0YWNoZXIgbGVzIGV2ZW50cyBhdXggY2hpcHMgZGUgcHJlc2V0c1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZXNldC1jaGlwJykuZm9yRWFjaChjaGlwID0+IHtcclxuICAgICAgICBjb25zdCBwcmVzZXRJZCA9IGNoaXAuZGF0YXNldC5wcmVzZXRJZDtcclxuICAgICAgICBjb25zdCBjaGFySWRzID0gSlNPTi5wYXJzZShjaGlwLmRhdGFzZXQucHJlc2V0SWRzKTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2xvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbG9hZFByZXNldChjaGFySWRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2RlbGV0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9ic2VydmVyIGxlcyBjaGFuZ2VtZW50cyBkZSBzZWxlY3Rpb24gcG91ciBsZSBib3V0b24gc2F2ZVxyXG4gICAgLy8gT24gdXRpbGlzZSB1biBNdXRhdGlvbk9ic2VydmVyIHN1ciBzZWxlY3RlZExpc3RcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdXBkYXRlU2F2ZVByZXNldEJ0bigpKTtcclxuICAgIGlmIChzZWxlY3RlZExpc3QpIHtcclxuICAgICAgICBzZWxlY3RlZExpc3RPYnNlcnZlci5vYnNlcnZlKHNlbGVjdGVkTGlzdCwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhdW5jaEJ0bikge1xyXG4gICAgICAgIGxhdW5jaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnZvaSBQT1NUIEFKQVggdmVycyAvdGVhbXMvc2VsZWN0XHJcbiAgICAgICAgICAgICAgICBmZXRjaCgnL3RlYW1zL3NlbGVjdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogc2VsZWN0ZWRIZXJvSWRzLm1hcCgoaWQsIGkpID0+IGBjaGFyYWN0ZXJfaWRzWyR7aX1dPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGlkKX1gKS5qb2luKCcmJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlZGlyZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVkaXJpZ2UgbWFudWVsbGVtZW50IHNpIHBhcyBkZSByZWRpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbWF0Y2htYWtpbmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzw6lsZWN0aW9uIGRlIGxcXCfDqXF1aXBlLicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQUk9GSUxFIFBPUFVQXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1wb3B1cF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWNvbnRlbnRdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBvcHVwKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwb3B1cC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3Byb2ZpbGUtcG9wdXAtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwX19iYWNrZHJvcC0tb3BlbicpO1xyXG5cclxuICAgICAgICBpZiAoIWxvYWRlZCkge1xyXG4gICAgICAgICAgICBmZXRjaFByb2ZpbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cCk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmZXRjaFByb2ZpbGUoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9hcGkvcHJvZmlsZScpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9maWxlKGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lcnJvclwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclByb2ZpbGUoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdENsYXNzID0gKHIpID0+IHIgPT09ICd3aW4nID8gJ3Jlc3VsdC0td2luJyA6IHIgPT09ICdsb3NzJyA/ICdyZXN1bHQtLWxvc3MnIDogJ3Jlc3VsdC0tZHJhdyc7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0TGFiZWwgPSAocikgPT4gciA9PT0gJ3dpbicgPyAnVmljdG9pcmUnIDogciA9PT0gJ2xvc3MnID8gJ0RcXHUwMGU5ZmFpdGUnIDogJ051bCc7XHJcblxyXG4gICAgICAgIGNvbnN0IGF2YXRhckh0bWwgPSBkYXRhLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChkYXRhLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiQXZhdGFyIGRlICR7ZXNjYXBlSHRtbChkYXRhLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmFzIGZhLXVzZXItY2lyY2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPmA7XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faWRlbnRpdHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hdmF0YXJcIj4ke2F2YXRhckh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fdXNlcm5hbWVcIj4ke2VzY2FwZUh0bWwoZGF0YS51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5tb3R0byA/IGA8c3BhbiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX21vdHRvXCI+XFx1MDBhYiAke2VzY2FwZUh0bWwoZGF0YS5tb3R0byl9IFxcdTAwYmI8L3NwYW4+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5iaW8gPyBgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19iaW9cIj4ke2VzY2FwZUh0bWwoZGF0YS5iaW8pfTwvcD5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3RhdHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEucmF0aW5nKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPk1NUjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy53aW5zKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPlZpY3RvaXJlczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy5sb3NzZXMpKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+RFxcdTAwZTlmYWl0ZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMud2luUmF0ZSkpfSU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+V2luIFJhdGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXN0YXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IENoYW1waW9uIEZhdm9yaVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19uYW1lXCI+JHtlc2NhcGVIdG1sKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIubmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX3JvbGVcIj4ke2VzY2FwZUh0bWwoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5yb2xlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fY291bnRcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIuZ2FtZXNQbGF5ZWQpKX0gcGFydGllczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubGFzdFRlYW0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlcnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IERlcm5pXFx1MDBlOHJlIFxcdTAwYzlxdWlwZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5sYXN0VGVhbS5tYXAoYyA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX21lbWJlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoYy5uYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fcm9sZVwiPiR7ZXNjYXBlSHRtbChjLnJvbGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEucmVjZW50QmF0dGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zaGllbGQtYWx0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBIaXN0b3JpcXVlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5yZWNlbnRCYXR0bGVzLm1hcChiID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYXJlbmEvcmVwbGF5LyR7cGFyc2VJbnQoYi5pZCwgMTApfVwiIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19lbnRyeSAke3Jlc3VsdENsYXNzKGIucmVzdWx0KX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fcmVzdWx0XCI+JHtyZXN1bHRMYWJlbChiLnJlc3VsdCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19vcHBvbmVudFwiPnZzICR7ZXNjYXBlSHRtbChiLm9wcG9uZW50KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX3R5cGVcIj4ke2VzY2FwZUh0bWwoYi5tYXRjaFR5cGUpLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19kYXRlXCI+JHtlc2NhcGVIdG1sKGIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsYXkgcHJvZmlsZS1oaXN0b3J5X19yZXBsYXlcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZW1wdHlcIj5BdWN1biBjb21iYXQgZW5yZWdpc3RyXFx1MDBlOTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3Byb2ZpbGVcIiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2VkaXQtbGlua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gXFx1MDBjOWRpdGVyIGxlIHByb2ZpbFxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIiwiLyoqXHJcbiAqIENvbWJhdCBBbmltYXRpb24gQ29udHJvbGxlclxyXG4gKiBHw6hyZSBsJ2FmZmljaGFnZSBwcm9ncmVzc2lmIGRlcyBsb2dzIGRlIGNvbWJhdCBhdmVjIGFuaW1hdGlvbnNcclxuICovXHJcbmNsYXNzIENvbWJhdENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5sb2dzID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAxO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyRWxlbWVudHMgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlck1heEhQID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGVzIGxvZ3MgZGVwdWlzIGwnYXR0cmlidXQgZGF0YVxyXG4gICAgICAgIGNvbnN0IGxvZ3NEYXRhID0gdGhpcy5jb250YWluZXIuZGF0YXNldC5jb21iYXRMb2dzO1xyXG4gICAgICAgIGlmIChsb2dzRGF0YSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dzID0gSlNPTi5wYXJzZShsb2dzRGF0YSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBwYXJzaW5nIGxvZ3M6JywgZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFLDqWN1cMOpcmVyIGxlcyDDqWzDqW1lbnRzXHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtbG9nXScpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1vdmVybGF5XScpO1xyXG4gICAgICAgIHRoaXMucGxheUJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1wbGF5XScpO1xyXG4gICAgICAgIHRoaXMuc2tpcEJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1za2lwXScpO1xyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29tYmF0LXNwZWVkXScpO1xyXG5cclxuICAgICAgICAvLyBNYXAgZGVzIHBlcnNvbm5hZ2VzIGF2ZWMgc3RvY2thZ2UgZGVzIEhQIG1heCBpbml0aWF1eFxyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFAgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3RlclNsdWdzID0ge307XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJIYXNIZWFsID0ge307XHJcbiAgICAgICAgdGhpcy5hYmlsaXR5Q29vbGRvd25zID0ge307IC8vIFN1aXZpIGRlcyBjb29sZG93bnMgZW4gY291cnNcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jaGFyYWN0ZXItbmFtZV0nKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsLmRhdGFzZXQuY2hhcmFjdGVyTmFtZTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbSA9IGVsLmRhdGFzZXQuY2hhcmFjdGVyVGVhbTtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7dGVhbX0tJHtuYW1lfWA7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XSA9IGVsO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlclNsdWdzW2tleV0gPSBlbC5kYXRhc2V0LmNoYXJhY3RlclNsdWcgfHwgJyc7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVySGFzSGVhbFtrZXldID0gZWwuZGF0YXNldC5oYXNIZWFsID09PSAndHJ1ZSc7XHJcblxyXG4gICAgICAgICAgICAvLyBFeHRyYWlyZSBsZSBIUCBtYXggZGVwdWlzIGxlIHRleHRlIGluaXRpYWxcclxuICAgICAgICAgICAgY29uc3QgaHBUZXh0ID0gZWwucXVlcnlTZWxlY3RvcignLmhwLXRleHQnKTtcclxuICAgICAgICAgICAgaWYgKGhwVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgbWF0Y2ggPSBocFRleHQudGV4dENvbnRlbnQubWF0Y2goLyhcXGQrKVxcLyhcXGQrKS8pO1xyXG4gICAgICAgICAgICAgICAgaWYgKG1hdGNoKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUFtrZXldID0gcGFyc2VJbnQobWF0Y2hbMl0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgw6lsw6ltZW50cyBkJ2FiaWxpdHkgZGFucyBsZXMgaW5mbyBwYW5lbHNcclxuICAgICAgICB0aGlzLmFiaWxpdHlFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGFyYWN0ZXItaW5mb1tkYXRhLWNoYXItbmFtZV0nKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsLmRhdGFzZXQuY2hhck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJUZWFtO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUVsID0gZWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5Jyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RWwpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV0gPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZWw6IGFiaWxpdHlFbCxcclxuICAgICAgICAgICAgICAgICAgICBtYXhDZDogcGFyc2VJbnQoYWJpbGl0eUVsLmRhdGFzZXQuYWJpbGl0eU1heENkKSB8fCAwLFxyXG4gICAgICAgICAgICAgICAgICAgIGJhZGdlOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LWNkLWJhZGdlJyksXHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZUVsOiBhYmlsaXR5RWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19hYmlsaXR5LW5hbWUnKSxcclxuICAgICAgICAgICAgICAgICAgICBpY29uRWw6IGFiaWxpdHlFbC5xdWVyeVNlbGVjdG9yKCdpJyksXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIENhY2hlciBsJ292ZXJsYXlcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcwJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFZpZGVyIGxlIGxvZ1xyXG4gICAgICAgIGlmICh0aGlzLmxvZ0NvbnRhaW5lcikge1xyXG4gICAgICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEV2ZW50IGxpc3RlbmVyc1xyXG4gICAgICAgIHRoaXMuYmluZEV2ZW50cygpO1xyXG5cclxuICAgICAgICAvLyBMYW5jZXIgYXV0b21hdGlxdWVtZW50IGFwcsOocyB1biBkw6lsYWlcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucGxheSgpLCA4MDApO1xyXG4gICAgfVxyXG5cclxuICAgIGJpbmRFdmVudHMoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucGxheUJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnRvZ2dsZVBsYXkoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGhpcy5za2lwQnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpcEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMuc2tpcCgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHRoaXMuc2V0U3BlZWQoZSkpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIHBsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nICYmICF0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTmV4dExvZygpO1xyXG4gICAgfVxyXG5cclxuICAgIHBhdXNlKCkge1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZVBsYXkoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZyB8fCB0aGlzLmlzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheSgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGF1c2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2tpcCgpIHtcclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuXHJcbiAgICAgICAgLy8gQWZmaWNoZXIgdG91cyBsZXMgbG9ncyByZXN0YW50c1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmN1cnJlbnRJbmRleCA8IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgY29uc3QgbG9nID0gdGhpcy5sb2dzW3RoaXMuY3VycmVudEluZGV4XTtcclxuICAgICAgICAgICAgdGhpcy5kaXNwbGF5TG9nKGxvZyk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgICAgICB0aGlzLnRyYWNrQWJpbGl0eUNvb2xkb3ducyhsb2cpO1xyXG4gICAgICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdkZWF0aCcpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zaG93VmljdG9yeU92ZXJsYXkoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICBzZXRTcGVlZChldmVudCkge1xyXG4gICAgICAgIGNvbnN0IHNwZWVkID0gcGFyc2VGbG9hdChldmVudC5jdXJyZW50VGFyZ2V0LmRhdGFzZXQuY29tYmF0U3BlZWQpO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSBzcGVlZDtcclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbCdVSVxyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zLmZvckVhY2goYnRuID0+IGJ0bi5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKSk7XHJcbiAgICAgICAgZXZlbnQuY3VycmVudFRhcmdldC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTmV4dExvZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nIHx8IHRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgdGhpcy5zaG93VmljdG9yeU92ZXJsYXkoKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IGxvZyA9IHRoaXMubG9nc1t0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzTG9nKGxvZyk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuXHJcbiAgICAgICAgLy8gQ2FsY3VsZXIgbGUgZMOpbGFpXHJcbiAgICAgICAgbGV0IGRlbGF5ID0gdGhpcy5nZXREZWxheUZvckxvZyhsb2cpO1xyXG4gICAgICAgIGRlbGF5ID0gZGVsYXkgLyB0aGlzLnNwZWVkO1xyXG5cclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMucHJvY2Vzc05leHRMb2coKSwgZGVsYXkpO1xyXG4gICAgfVxyXG5cclxuICAgIGdldERlbGF5Rm9yTG9nKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAncm91bmQnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAnaW5pdGlhdGl2ZSc6IHJldHVybiA0MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzogcmV0dXJuIDE4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlZmVuZCc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdkb2RnZSc6IHJldHVybiAxMjAwO1xyXG4gICAgICAgICAgICBjYXNlICdkZWF0aCc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0JzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3ZpY3RvcnknOlxyXG4gICAgICAgICAgICBjYXNlICdkcmF3JzogcmV0dXJuIDEwMDA7XHJcbiAgICAgICAgICAgIC8vIE5vdXZlYXV4IHR5cGVzXHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOiByZXR1cm4gODAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6IHJldHVybiA4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW5uZWRfc2tpcCc6IHJldHVybiAxMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2FjdGl2YXRlJzogcmV0dXJuIDEyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzogcmV0dXJuIHRoaXMuZ2V0QWJpbGl0eURlbGF5KGxvZyk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiA4MDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldEFiaWxpdHlEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdtYXJrJzogcmV0dXJuIDEyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYnVmZic6XHJcbiAgICAgICAgICAgIGNhc2UgJ3NlbGZfYnVmZic6XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0ZWFsdGgnOiByZXR1cm4gMTIwMDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfaGVhbCc6IHJldHVybiAxODAwO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9idWZmJzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzogcmV0dXJuIDE4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3RfZG9kZ2UnOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6IHJldHVybiA4MDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAxMjAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTG9nKGxvZykge1xyXG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbihsb2cpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUxvZyhsb2cpO1xyXG5cclxuICAgICAgICAvLyBTeW5jaHJvbmlzZXIgbGEgbWlzZSDDoCBqb3VyIGRlcyBIUCBhdmVjIGwnYW5pbWF0aW9uXHJcbiAgICAgICAgY29uc3QgaHBEZWxheSA9IHRoaXMuZ2V0SFBVcGRhdGVEZWxheShsb2cpO1xyXG4gICAgICAgIGlmIChocERlbGF5ID4gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpLCBocERlbGF5IC8gdGhpcy5zcGVlZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTdWl2aSBkZXMgY29vbGRvd25zXHJcbiAgICAgICAgdGhpcy50cmFja0FiaWxpdHlDb29sZG93bnMobG9nKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFja0FiaWxpdHlDb29sZG93bnMobG9nKSB7XHJcbiAgICAgICAgLy8gUXVhbmQgdW5lIGNvbXDDqXRlbmNlIGVzdCB1dGlsaXPDqWUsIG1ldHRyZSBlbiBjb29sZG93blxyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2FiaWxpdHlfdXNlJyAmJiBsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eURhdGEgPSB0aGlzLmFiaWxpdHlFbGVtZW50c1trZXldO1xyXG4gICAgICAgICAgICBpZiAoYWJpbGl0eURhdGEgJiYgYWJpbGl0eURhdGEubWF4Q2QgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XSA9IGFiaWxpdHlEYXRhLm1heENkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5KGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEEgY2hhcXVlIG5vdXZlYXUgcm91bmQsIGTDqWNyw6ltZW50ZXIgdG91cyBsZXMgY29vbGRvd25zXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAncm91bmQnKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuYWJpbGl0eUNvb2xkb3ducykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldLS07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5KGtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheShrZXkpIHtcclxuICAgICAgICBjb25zdCBhYmlsaXR5RGF0YSA9IHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgaWYgKCFhYmlsaXR5RGF0YSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjZCA9IHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldIHx8IDA7XHJcblxyXG4gICAgICAgIGlmIChjZCA+IDApIHtcclxuICAgICAgICAgICAgLy8gRW4gY29vbGRvd24gOiBncmlzZXIgKyBhZmZpY2hlciBiYWRnZVxyXG4gICAgICAgICAgICBhYmlsaXR5RGF0YS5lbC5jbGFzc0xpc3QuYWRkKCdjaGFyYWN0ZXItaW5mb19fYWJpbGl0eS0tb24tY2QnKTtcclxuICAgICAgICAgICAgaWYgKGFiaWxpdHlEYXRhLmJhZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBhYmlsaXR5RGF0YS5iYWRnZS50ZXh0Q29udGVudCA9IGAke2NkfVRgO1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eURhdGEuYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gUHLDqnQgOiByZXRpcmVyIGxlIGdyaXNcclxuICAgICAgICAgICAgYWJpbGl0eURhdGEuZWwuY2xhc3NMaXN0LnJlbW92ZSgnY2hhcmFjdGVyLWluZm9fX2FiaWxpdHktLW9uLWNkJyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RGF0YS5iYWRnZSkge1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eURhdGEuYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRIUFVwZGF0ZURlbGF5KGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6IHJldHVybiA0MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzogcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOiByZXR1cm4gMjAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYWN0aXZhdGUnOiByZXR1cm4gMzUwO1xyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6IHJldHVybiB0aGlzLmdldEFiaWxpdHlIUERlbGF5KGxvZyk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBYmlsaXR5SFBEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfaGVhbCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzogcmV0dXJuIDQwMDtcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QW5pbWF0aW9uKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuYXR0YWNrZXIsIGxvZy5hdHRhY2tlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cuaXNDcml0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmhlYWxlciwgbG9nLmhlYWxlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVmZW5kKGxvZy5kZWZlbmRlciwgbG9nLmRlZmVuZGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9kZ2UobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBOb3V2ZWF1eCB0eXBlc1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVubmVkX3NraXAnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3R1bm5lZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmF0dGFja2VyLCBsb2cuYXR0YWNrZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheUFiaWxpdHlBbmltYXRpb24obG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gTk9VVkVMTEVTIEFOSU1BVElPTlMgPT09XHJcblxyXG4gICAgYW5pbWF0ZURvVCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtLCBkb3RDbGFzcykge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKGRvdENsYXNzKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShkb3RDbGFzcyksIDYwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVTdHVubmVkKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc3R1bm5lZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdzdHVubmVkJyksIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVNYXJrZWQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdtYXJrZWQnKTtcclxuICAgICAgICAgICAgLy8gTGEgbWFycXVlIHJlc3RlIHZpc2libGUgcGx1cyBsb25ndGVtcHNcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbWFya2VkJyksIDIwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlQnVmZih0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2J1ZmZlZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdidWZmZWQnKSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVN0ZWFsdGgodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzdGVhbHRoZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc3RlYWx0aGVkJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QWJpbGl0eUFuaW1hdGlvbihsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJyksIDQwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsaWdodGVkJyksIDQwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZVN0dW5uZWQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pLCA0MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcmsnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXJrS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShtYXJrS2V5LCAnc2tpbGwud2VicCcsIDgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkgdGhpcy5hbmltYXRlTWFya2VkKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCByaXBvc3RlS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShyaXBvc3RlS2V5LCAnc2tpbGwud2VicCcsIDgwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc2VsZl9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc2VsZkJ1ZmZLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQWJvbWluYXRpb24gVHJhbnNmb3JtYXRpb24gOiBzd2l0Y2ggc2x1ZyB0byBiZWFzdCBwZXJtYW5lbnRseVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChsb2cuYWJpbGl0eU5hbWUgPT09ICdUcmFuc2Zvcm1hdGlvbicpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJTbHVnc1tzZWxmQnVmZktleV0gPSAnYmVhc3QnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoc2VsZkJ1ZmZLZXksICdza2lsbC53ZWJwJywgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9oZWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuaW1lciB0b3VzIGxlcyBhbGxpw6lzIHNvaWduw6lzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvZy5oZWFsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nLmhlYWxlZC5mb3JFYWNoKGggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoaC5uYW1lLCBoLnRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaGVhbGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsZWQnKSwgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBwYXJ0eUJ1ZmZLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHBhcnR5QnVmZktleSwgJ3NraWxsLndlYnAnLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgLy8gQW5pbWVyIHRvdXMgbGVzIGFsbGnDqXMgZHUgbcOqbWUgY8O0dMOpXHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVUZWFtQnVmZihsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3RlYWx0aCc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHN0ZWFsdGhLZXkgPSBgJHtsb2cuY2FzdGVyVGVhbX0tJHtsb2cuY2FzdGVyfWA7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKHN0ZWFsdGhLZXksICdza2lsbC53ZWJwJywgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTdGVhbHRoKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy5pc0NyaXQgfHwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3RfZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZURlZmVuZChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnKSwgNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVRlYW1CdWZmKGNhc3RlclRlYW0pIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmNoYXJhY3RlckVsZW1lbnRzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChjYXN0ZXJUZWFtKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdidWZmZWQnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnYnVmZmVkJyksIDgwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gU1BSSVRFIFNXQVAgPT09XHJcblxyXG4gICAgc3dhcFNwcml0ZShrZXksIHNwcml0ZU5hbWUsIGR1cmF0aW9uKSB7XHJcbiAgICAgICAgY29uc3QgZWwgPSB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgaWYgKCFlbCkgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IHNsdWcgPSB0aGlzLmNoYXJhY3RlclNsdWdzW2tleV07XHJcbiAgICAgICAgaWYgKCFzbHVnKSByZXR1cm47XHJcbiAgICAgICAgY29uc3QgaW1nID0gZWwucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1zcHJpdGUnKTtcclxuICAgICAgICBpZiAoIWltZykgcmV0dXJuO1xyXG4gICAgICAgIGltZy5zcmMgPSBgL2Fzc2V0L2ltZy9jb21iYXQvJHtzbHVnfS8ke3Nwcml0ZU5hbWV9YDtcclxuICAgICAgICBpZiAoZHVyYXRpb24gPiAwKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFlbC5jbGFzc0xpc3QuY29udGFpbnMoJ2RlYWQnKSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGltZy5zcmMgPSBgL2Fzc2V0L2ltZy9jb21iYXQvJHt0aGlzLmNoYXJhY3RlclNsdWdzW2tleV19L2ZpZ2h0aWRsZS53ZWJwYDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSwgZHVyYXRpb24pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gQU5JTUFUSU9OUyBFWElTVEFOVEVTID09PVxyXG5cclxuICAgIGFuaW1hdGVBdHRhY2soYXR0YWNrZXJOYW1lLCBhdHRhY2tlclRlYW0sIHRhcmdldE5hbWUsIHRhcmdldFRlYW0sIGlzQ3JpdCkge1xyXG4gICAgICAgIGNvbnN0IGF0dGFja2VyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGF0dGFja2VyTmFtZSwgYXR0YWNrZXJUZWFtKTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcblxyXG4gICAgICAgIGlmIChhdHRhY2tlcikge1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHthdHRhY2tlclRlYW19LSR7YXR0YWNrZXJOYW1lfWA7XHJcbiAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShrZXksICdhdHRhY2thbmltYXRpb24ud2VicCcsIDYwMCk7XHJcbiAgICAgICAgICAgIGF0dGFja2VyLmNsYXNzTGlzdC5hZGQoJ2F0dGFja2luZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGF0dGFja2VyLmNsYXNzTGlzdC5yZW1vdmUoJ2F0dGFja2luZycpLCA2MDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdodXJ0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNDcml0KSB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnY3JpdCcpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcsICdjcml0JyksIDQwMCk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVIZWFsKGhlYWxlck5hbWUsIGhlYWxlclRlYW0sIHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCBoZWFsZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoaGVhbGVyTmFtZSwgaGVhbGVyVGVhbSk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG5cclxuICAgICAgICBpZiAoaGVhbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2hlYWxlclRlYW19LSR7aGVhbGVyTmFtZX1gO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGFyYWN0ZXJIYXNIZWFsW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShrZXksICdoZWFsaW5nLndlYnAnLCA4MDApO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKGtleSwgJ3NraWxsLndlYnAnLCA4MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGhlYWxlci5jbGFzc0xpc3QuYWRkKCdoZWFsaW5nJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gaGVhbGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxpbmcnKSwgODAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hlYWxlZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsZWQnKSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlZmVuZChkZWZlbmRlck5hbWUsIGRlZmVuZGVyVGVhbSkge1xyXG4gICAgICAgIGNvbnN0IGRlZmVuZGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGRlZmVuZGVyTmFtZSwgZGVmZW5kZXJUZWFtKTtcclxuICAgICAgICBpZiAoZGVmZW5kZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7ZGVmZW5kZXJUZWFtfS0ke2RlZmVuZGVyTmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnZGVmZW5kaW5nLndlYnAnLCAxMDAwKTtcclxuICAgICAgICAgICAgZGVmZW5kZXIuY2xhc3NMaXN0LmFkZCgnZGVmZW5kaW5nJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZGVmZW5kZXIuY2xhc3NMaXN0LnJlbW92ZSgnZGVmZW5kaW5nJyksIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRG9kZ2UodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdkb2RnaW5nJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2RvZGdpbmcnKSwgNjAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURlYXRoKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZGVhZCcpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRDaGFyYWN0ZXJFbGVtZW50KG5hbWUsIHRlYW0pIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1tgJHt0ZWFtfS0ke25hbWV9YF07XHJcbiAgICB9XHJcblxyXG4gICAgZGlzcGxheUxvZyhsb2cpIHtcclxuICAgICAgICBpZiAoIXRoaXMubG9nQ29udGFpbmVyKSByZXR1cm47XHJcblxyXG4gICAgICAgIGNvbnN0IGVudHJ5ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgncCcpO1xyXG4gICAgICAgIGVudHJ5LmNsYXNzTmFtZSA9ICdjb21iYXQtbG9nX19lbnRyeSc7XHJcblxyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ3JvdW5kJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tcm91bmQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAndmljdG9yeScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXZpY3RvcnknKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnZHJhdycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWRlZmVhdCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdhYmlsaXR5X3VzZScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWFiaWxpdHknKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYmxlZWRfdGljaycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWJsZWVkJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsaWdodF90aWNrJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tYmxpZ2h0Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3N0dW5uZWRfc2tpcCcpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXN0dW4nKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAncmlwb3N0ZV9hY3RpdmF0ZScpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXJpcG9zdGUnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVudHJ5LmlubmVySFRNTCA9IGxvZy5tZXNzYWdlO1xyXG4gICAgICAgIHRoaXMubG9nQ29udGFpbmVyLmFwcGVuZENoaWxkKGVudHJ5KTtcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5zY3JvbGxUb3AgPSB0aGlzLmxvZ0NvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSGVhbHRoQmFycyhsb2cpIHtcclxuICAgICAgICBsZXQgY2hhcmFjdGVyTmFtZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IHRlYW1OYW1lID0gbnVsbDtcclxuICAgICAgICBsZXQgY3VycmVudEhQID0gbnVsbDtcclxuICAgICAgICBsZXQgbWF4SFAgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBEw6l0ZXJtaW5lciBsZXMgZG9ubsOpZXMgc2Vsb24gbGUgdHlwZSBkZSBsb2dcclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdhdHRhY2snIHx8IGxvZy50eXBlID09PSAncmlwb3N0ZV9hY3RpdmF0ZScpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2hlYWwnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdibGVlZF90aWNrJyB8fCBsb2cudHlwZSA9PT0gJ2JsaWdodF90aWNrJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYWJpbGl0eV91c2UnKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQWJpbGl0eUhlYWx0aEJhcnMobG9nKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgc2kgbm91cyBhdm9ucyBsZXMgZG9ubsOpZXMgbsOpY2Vzc2FpcmVzXHJcbiAgICAgICAgaWYgKGNoYXJhY3Rlck5hbWUgJiYgdGVhbU5hbWUgJiYgY3VycmVudEhQICE9PSBudWxsICYmIGN1cnJlbnRIUCAhPT0gdW5kZWZpbmVkICYmIG1heEhQKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCwgbWF4SFApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVBYmlsaXR5SGVhbHRoQmFycyhsb2cpIHtcclxuICAgICAgICAvLyBDb21ww6l0ZW5jZXMgcXVpIGluZmxpZ2VudCBkZXMgZMOpZ8OidHMgw6AgdW5lIGNpYmxlXHJcbiAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldEhQICE9PSB1bmRlZmluZWQgJiYgbG9nLnRhcmdldE1heEhQKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy50YXJnZXRIUCwgbG9nLnRhcmdldE1heEhQKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNvaW4gZGUgZ3JvdXBlIDogbWV0dHJlIMOgIGpvdXIgY2hhcXVlIGFsbGnDqSBzb2lnbsOpXHJcbiAgICAgICAgaWYgKGxvZy5zdWJ0eXBlID09PSAncGFydHlfaGVhbCcgJiYgbG9nLmhlYWxlZCkge1xyXG4gICAgICAgICAgICBsb2cuaGVhbGVkLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGgubmFtZSwgaC50ZWFtLCBoLmhwLCBoLm1heEhwKTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTb2luIGQndXJnZW5jZSA6IG1ldHRyZSDDoCBqb3VyIGxlIGxhbmNldXJcclxuICAgICAgICBpZiAobG9nLnN1YnR5cGUgPT09ICdlbWVyZ2VuY3lfaGVhbCcgJiYgbG9nLmNhc3Rlcikge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0SFAsIGxvZy50YXJnZXRNYXhIUCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYXJhY3RlckhQKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsIG1heEhQKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgcGVyY2VudCA9IG1heEhQID4gMCA/IChjdXJyZW50SFAgLyBtYXhIUCkgKiAxMDAgOiAwO1xyXG5cclxuICAgICAgICAvLyBNaXNlIMOgIGpvdXIgZGUgbGEgYmFycmUgSFAgZGFucyBsYSB6b25lIGRlIGNvbWJhdCAoYmF0dGxlLXN0YWdlKVxyXG4gICAgICAgIGNvbnN0IGhwQmFyID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ocC1iYXJfX2ZpbGwnKTtcclxuICAgICAgICBjb25zdCBocFRleHQgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmhwLXRleHQnKTtcclxuXHJcbiAgICAgICAgaWYgKGhwQmFyKSB7XHJcbiAgICAgICAgICAgIC8vIEFuaW1hdGlvbiBmbHVpZGUgZGUgbGEgYmFycmVcclxuICAgICAgICAgICAgaHBCYXIuc3R5bGUudHJhbnNpdGlvbiA9IGB3aWR0aCAwLjNzIGVhc2Utb3V0YDtcclxuICAgICAgICAgICAgaHBCYXIuc3R5bGUud2lkdGggPSBgJHtwZXJjZW50fSVgO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2xhc3NlcyBkZSBjb3VsZXVyIHNlbG9uIGxlIHBvdXJjZW50YWdlXHJcbiAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5yZW1vdmUoJ2hwLWJhcl9fZmlsbC0tbG93JywgJ2hwLWJhcl9fZmlsbC0tY3JpdGljYWwnKTtcclxuICAgICAgICAgICAgaWYgKHBlcmNlbnQgPD0gMjUpIHtcclxuICAgICAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5hZGQoJ2hwLWJhcl9fZmlsbC0tY3JpdGljYWwnKTtcclxuICAgICAgICAgICAgfSBlbHNlIGlmIChwZXJjZW50IDw9IDUwKSB7XHJcbiAgICAgICAgICAgICAgICBocEJhci5jbGFzc0xpc3QuYWRkKCdocC1iYXJfX2ZpbGwtLWxvdycpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoaHBUZXh0KSB7XHJcbiAgICAgICAgICAgIGhwVGV4dC50ZXh0Q29udGVudCA9IGAke2N1cnJlbnRIUH0vJHttYXhIUH1gO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWlzZSDDoCBqb3VyIGRlcyBwYW5uZWF1eCBkJ2luZm8gbGF0w6lyYXV4XHJcbiAgICAgICAgdGhpcy51cGRhdGVJbmZvUGFuZWwoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCk7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSW5mb1BhbmVsKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFApIHtcclxuICAgICAgICAvLyBUcm91dmVyIGxlIGJvbiBwYW5uZWF1IHNlbG9uIGwnw6lxdWlwZVxyXG4gICAgICAgIGNvbnN0IHBhbmVsQ2xhc3MgPSB0ZWFtTmFtZSA9PT0gJ0VxdWlwZSAxJyA/ICcuaW5mby1wYW5lbC0tdGVhbTEnIDogJy5pbmZvLXBhbmVsLS10ZWFtMic7XHJcbiAgICAgICAgY29uc3QgcGFuZWwgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKHBhbmVsQ2xhc3MpO1xyXG5cclxuICAgICAgICBpZiAoIXBhbmVsKSByZXR1cm47XHJcblxyXG4gICAgICAgIC8vIFRyb3V2ZXIgbGUgcGVyc29ubmFnZSBkYW5zIGxlIHBhbm5lYXUgcGFyIHNvbiBub21cclxuICAgICAgICBjb25zdCBjaGFyYWN0ZXJJbmZvcyA9IHBhbmVsLnF1ZXJ5U2VsZWN0b3JBbGwoJy5jaGFyYWN0ZXItaW5mbycpO1xyXG4gICAgICAgIGZvciAoY29uc3QgaW5mbyBvZiBjaGFyYWN0ZXJJbmZvcykge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lRWwgPSBpbmZvLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fbmFtZScpO1xyXG4gICAgICAgICAgICBpZiAobmFtZUVsICYmIG5hbWVFbC50ZXh0Q29udGVudC50cmltKCkgPT09IGNoYXJhY3Rlck5hbWUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IHN0YXRzU3BhbiA9IGluZm8ucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19zdGF0cyBzcGFuJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoc3RhdHNTcGFuKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNTcGFuLnRleHRDb250ZW50ID0gY3VycmVudEhQO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICAvLyBBbmltYXRpb24gZmxhc2ggcG91ciBtb250cmVyIGxlIGNoYW5nZW1lbnRcclxuICAgICAgICAgICAgICAgICAgICBzdGF0c1NwYW4uY2xhc3NMaXN0LmFkZCgnaHAtdXBkYXRlZCcpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gc3RhdHNTcGFuLmNsYXNzTGlzdC5yZW1vdmUoJ2hwLXVwZGF0ZWQnKSwgMzAwKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNob3dWaWN0b3J5T3ZlcmxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5vdmVybGF5KSB7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9LCA1MCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBGaW5hbGlzZXIgbGUgTU1SIGEgbGEgZmluIGR1IGNvbWJhdFxyXG4gICAgICAgIHRoaXMuZmluYWxpemVSYXRpbmcoKTtcclxuICAgIH1cclxuXHJcbiAgICBmaW5hbGl6ZVJhdGluZygpIHtcclxuICAgICAgICBjb25zdCBmaW5hbGl6ZVVybCA9IHRoaXMuY29udGFpbmVyLmRhdGFzZXQuZmluYWxpemVVcmw7XHJcbiAgICAgICAgaWYgKCFmaW5hbGl6ZVVybCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBmZXRjaChmaW5hbGl6ZVVybCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICYmIGRhdGEucmF0aW5nQ2hhbmdlICE9PSAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3dSYXRpbmdVcGRhdGUoZGF0YS5yYXRpbmdDaGFuZ2UsIGRhdGEubmV3UmF0aW5nLCBkYXRhLm5ld1JhdGluZzIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goZXJyID0+IGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBmaW5hbGlzYXRpb24gcmF0aW5nOicsIGVycikpO1xyXG4gICAgfVxyXG5cclxuICAgIHNob3dSYXRpbmdVcGRhdGUoY2hhbmdlLCBuZXdSYXRpbmcsIG5ld1JhdGluZzIpIHtcclxuICAgICAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIE1NUiBhZmZpY2hlIGRhbnMgbGUgcGFubmVhdSBqb3VldXIgKEVxdWlwZSAxKVxyXG4gICAgICAgIGNvbnN0IHJhdGluZ0VsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0xIC5pbmZvLXBhbmVsX19yYXRpbmcnKTtcclxuICAgICAgICBpZiAocmF0aW5nRWwgJiYgbmV3UmF0aW5nICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7bmV3UmF0aW5nfSBNTVJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gTWV0dHJlIGEgam91ciBsZSBNTVIgYWZmaWNoZSBkYW5zIGxlIHBhbm5lYXUgYWR2ZXJzYWlyZSAoRXF1aXBlIDIpXHJcbiAgICAgICAgY29uc3QgcmF0aW5nRWwyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignLmluZm8tcGFuZWwtLXRlYW0yIC5pbmZvLXBhbmVsX19yYXRpbmctLWVuZW15Jyk7XHJcbiAgICAgICAgaWYgKHJhdGluZ0VsMiAmJiBuZXdSYXRpbmcyICE9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHJhdGluZ0VsMi5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke25ld1JhdGluZzJ9IE1NUmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBBZmZpY2hlciBsYSBub3RpZmljYXRpb24gZGUgY2hhbmdlbWVudCBkYW5zIGwnb3ZlcmxheVxyXG4gICAgICAgIGNvbnN0IG92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtb3ZlcmxheV0nKTtcclxuICAgICAgICBpZiAob3ZlcmxheSkge1xyXG4gICAgICAgICAgICBjb25zdCB3aW5uZXJEaXYgPSBvdmVybGF5LnF1ZXJ5U2VsZWN0b3IoJy5iYXR0bGUtc3RhZ2VfX3dpbm5lcicpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hhbmdlbWVudCBNTVIgRXF1aXBlIDFcclxuICAgICAgICAgICAgY29uc3Qgbm90aWYxID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG5vdGlmMS5jbGFzc05hbWUgPSAncmF0aW5nLWNoYW5nZSc7XHJcbiAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZToxLjJyZW07bWFyZ2luLXRvcDoxMnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMS50ZXh0Q29udGVudCA9IGNoYW5nZSA+IDAgPyBgRXF1aXBlIDEgOiArJHtjaGFuZ2V9IE1NUmAgOiBgRXF1aXBlIDEgOiAke2NoYW5nZX0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYxLnN0eWxlLmNvbG9yID0gY2hhbmdlID4gMCA/ICcjNGNhZjUwJyA6ICcjZjQ0MzM2JztcclxuICAgICAgICAgICAgd2lubmVyRGl2LmFwcGVuZENoaWxkKG5vdGlmMSk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGFuZ2VtZW50IE1NUiBFcXVpcGUgMiAoaW52ZXJzZSlcclxuICAgICAgICAgICAgY29uc3QgY2hhbmdlMiA9IC1jaGFuZ2U7XHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmMiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBub3RpZjIuY2xhc3NOYW1lID0gJ3JhdGluZy1jaGFuZ2UnO1xyXG4gICAgICAgICAgICBub3RpZjIuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MS4ycmVtO21hcmdpbi10b3A6NnB4O2ZvbnQtd2VpZ2h0OmJvbGQ7b3BhY2l0eTowO3RyYW5zaXRpb246b3BhY2l0eSAwLjVzOyc7XHJcbiAgICAgICAgICAgIG5vdGlmMi50ZXh0Q29udGVudCA9IGNoYW5nZTIgPiAwID8gYEVxdWlwZSAyIDogKyR7Y2hhbmdlMn0gTU1SYCA6IGBFcXVpcGUgMiA6ICR7Y2hhbmdlMn0gTU1SYDtcclxuICAgICAgICAgICAgbm90aWYyLnN0eWxlLmNvbG9yID0gY2hhbmdlMiA+IDAgPyAnIzRjYWY1MCcgOiAnI2Y0NDMzNic7XHJcbiAgICAgICAgICAgIHdpbm5lckRpdi5hcHBlbmRDaGlsZChub3RpZjIpO1xyXG5cclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBub3RpZjEuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICB9LCAxMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVQbGF5QnV0dG9uKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5wbGF5QnRuKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZyAmJiAhdGhpcy5pc1BhdXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSAnUGF1c2UnO1xyXG4gICAgICAgIH0gZWxzZSBpZiAodGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSAnVGVybWluw6knO1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9IHRoaXMuY3VycmVudEluZGV4ID4gMCA/ICdSZXByZW5kcmUnIDogJ0xhbmNlcic7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG4vLyBJbml0aWFsaXNlciBxdWFuZCBsZSBET00gZXN0IHByw6p0XHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBjb21iYXRDb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtbG9nc10nKTtcclxuICAgIGlmIChjb21iYXRDb250YWluZXIpIHtcclxuICAgICAgICBuZXcgQ29tYmF0Q29udHJvbGxlcihjb21iYXRDb250YWluZXIpO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbmV4cG9ydCBkZWZhdWx0IENvbWJhdENvbnRyb2xsZXI7XHJcbiIsIi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIEZSSUVORCBTWVNURU1cclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi50ZXh0Q29udGVudCA9IHN0cjtcclxuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy10b2dnbGVdJyk7XHJcbiAgICBjb25zdCBwYW5lbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtcGFuZWxdJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtYmFja2Ryb3BdJyk7XHJcbiAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtY2xvc2VdJyk7XHJcbiAgICBjb25zdCBiYWRnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtYmFkZ2VdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBhbmVsKSByZXR1cm47XHJcblxyXG4gICAgbGV0IHBhbmVsT3BlbiA9IGZhbHNlO1xyXG4gICAgbGV0IGN1cnJlbnRUYWIgPSAnZnJpZW5kcyc7XHJcbiAgICBsZXQgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IG51bGw7XHJcbiAgICBsZXQgbGFzdE1lc3NhZ2VJZCA9IDA7XHJcbiAgICBsZXQgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICBsZXQgdW5yZWFkUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgIGxldCBmcmllbmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICBsZXQgcmVxdWVzdHNMb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFBBTkVMIE9QRU4vQ0xPU0VcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gb3BlblBhbmVsKCkge1xyXG4gICAgICAgIHBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgcGFuZWwub2Zmc2V0SGVpZ2h0OyAvLyByZWZsb3dcclxuICAgICAgICBwYW5lbC5jbGFzc0xpc3QuYWRkKCdmcmllbmRzLXBhbmVsLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgnZnJpZW5kcy1wYW5lbF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBwYW5lbE9wZW4gPSB0cnVlO1xyXG5cclxuICAgICAgICBpZiAoIWZyaWVuZHNMb2FkZWQpIHtcclxuICAgICAgICAgICAgbG9hZEZyaWVuZHMoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQYW5lbCgpIHtcclxuICAgICAgICBwYW5lbC5jbGFzc0xpc3QucmVtb3ZlKCdmcmllbmRzLXBhbmVsLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgnZnJpZW5kcy1wYW5lbF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBwYW5lbE9wZW4gPSBmYWxzZTtcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcGFuZWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHBhbmVsT3BlbiA/IGNsb3NlUGFuZWwoKSA6IG9wZW5QYW5lbCgpKTtcclxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQYW5lbCk7XHJcbiAgICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUGFuZWwpO1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gVEFCU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mcmllbmRzLXRhYl0nKS5mb3JFYWNoKHRhYkJ0biA9PiB7XHJcbiAgICAgICAgdGFiQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCB0YWJOYW1lID0gdGFiQnRuLmRhdGFzZXQuZnJpZW5kc1RhYjtcclxuICAgICAgICAgICAgc3dpdGNoVGFiKHRhYk5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgZnVuY3Rpb24gc3dpdGNoVGFiKHRhYk5hbWUpIHtcclxuICAgICAgICBjdXJyZW50VGFiID0gdGFiTmFtZTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZnJpZW5kcy10YWJdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICBidG4uY2xhc3NMaXN0LnRvZ2dsZSgnZnJpZW5kcy1wYW5lbF9fdGFiLS1hY3RpdmUnLCBidG4uZGF0YXNldC5mcmllbmRzVGFiID09PSB0YWJOYW1lKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtdGFiLWNvbnRlbnRdJykuZm9yRWFjaChjb250ZW50ID0+IHtcclxuICAgICAgICAgICAgY29udGVudC5zdHlsZS5kaXNwbGF5ID0gY29udGVudC5kYXRhc2V0LnRhYkNvbnRlbnQgPT09IHRhYk5hbWUgPyAnYmxvY2snIDogJ25vbmUnO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fdGFicycpLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX2NvbnRlbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNvbnZlcnNhdGlvbl0nKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG5cclxuICAgICAgICBpZiAodGFiTmFtZSA9PT0gJ2ZyaWVuZHMnICYmICFmcmllbmRzTG9hZGVkKSBsb2FkRnJpZW5kcygpO1xyXG4gICAgICAgIGlmICh0YWJOYW1lID09PSAncmVxdWVzdHMnICYmICFyZXF1ZXN0c0xvYWRlZCkgbG9hZFJlcXVlc3RzKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBMT0FEIEZSSUVORFMgTElTVFxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBsb2FkRnJpZW5kcygpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YWItY29udGVudD1cImZyaWVuZHNcIl0nKTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19sb2FkaW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBDaGFyZ2VtZW50Li4uPC9kaXY+JztcclxuXHJcbiAgICAgICAgZmV0Y2goJy9mcmllbmRzL2xpc3QnLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBmcmllbmRzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGRhdGEuZnJpZW5kcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPjxpIGNsYXNzPVwiZmFzIGZhLWdob3N0XCI+PC9pPiBBdWN1biBjb21wYWdub24uLi4gTGUgZG9uam9uIGVzdCBzb2xpdGFpcmUuPC9wPic7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhLmZyaWVuZHMubWFwKGYgPT4gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCIgZGF0YS1mcmllbmQtdXNlci1pZD1cIiR7Zi51c2VySWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtmLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwoZi5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbChmLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoZi51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19wcmV2aWV3XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAke2YubGFzdE1lc3NhZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IChmLmxhc3RNZXNzYWdlLmlzRnJvbU1lID8gJ1ZvdXM6ICcgOiAnJykgKyBlc2NhcGVIdG1sKGYubGFzdE1lc3NhZ2UuY29udGVudClcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICdBdWN1biBtZXNzYWdlJ31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3JhdGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHtmLnJhdGluZ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmZyaWVuZC1pdGVtJykuZm9yRWFjaChpdGVtID0+IHtcclxuICAgICAgICAgICAgICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgdXNlcklkID0gcGFyc2VJbnQoaXRlbS5kYXRhc2V0LmZyaWVuZFVzZXJJZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGl0ZW0ucXVlcnlTZWxlY3RvcignLmZyaWVuZC1pdGVtX19uYW1lJykudGV4dENvbnRlbnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgb3BlbkNvbnZlcnNhdGlvbih1c2VySWQsIG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RXJyZXVyIGRlIGNoYXJnZW1lbnQ8L3A+JztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIExPQUQgUEVORElORyBSRVFVRVNUU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBsb2FkUmVxdWVzdHMoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGFiLWNvbnRlbnQ9XCJyZXF1ZXN0c1wiXScpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+IENoYXJnZW1lbnQuLi48L2Rpdj4nO1xyXG5cclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvcGVuZGluZycsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIHJlcXVlc3RzTG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgaWYgKGRhdGEucmVxdWVzdHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5BdWN1bmUgZGVtYW5kZSBlbiBhdHRlbnRlPC9wPic7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSBkYXRhLnJlcXVlc3RzLm1hcChyID0+IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiIGRhdGEtcmVxdWVzdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtyLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwoci5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbChyLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoci51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19wcmV2aWV3XCI+JHtlc2NhcGVIdG1sKHIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYWN0aW9uc1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1hY2NlcHRcIiBkYXRhLWFjY2VwdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1jaGVja1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXJlamVjdFwiIGRhdGEtcmVqZWN0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXRpbWVzXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hY2NlcHQtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlcXVlc3QoYnRuLmRhdGFzZXQuYWNjZXB0SWQsICdhY2NlcHQnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1yZWplY3QtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGhhbmRsZVJlcXVlc3QoYnRuLmRhdGFzZXQucmVqZWN0SWQsICdyZWplY3QnKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gaGFuZGxlUmVxdWVzdChmcmllbmRzaGlwSWQsIGFjdGlvbikge1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy8ke2FjdGlvbn0vJHtmcmllbmRzaGlwSWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHJlcXVlc3RzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBsb2FkUmVxdWVzdHMoKTtcclxuICAgICAgICAgICAgICAgIGZldGNoVW5yZWFkQ291bnQoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gU0VBUkNIIFVTRVJTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGNvbnN0IHNlYXJjaElucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1zZWFyY2gtaW5wdXRdJyk7XHJcbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1zZWFyY2gtcmVzdWx0c10nKTtcclxuICAgIGxldCBzZWFyY2hUaW1lb3V0ID0gbnVsbDtcclxuXHJcbiAgICBpZiAoc2VhcmNoSW5wdXQpIHtcclxuICAgICAgICBzZWFyY2hJbnB1dC5hZGRFdmVudExpc3RlbmVyKCdpbnB1dCcsICgpID0+IHtcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KHNlYXJjaFRpbWVvdXQpO1xyXG4gICAgICAgICAgICBjb25zdCBxdWVyeSA9IHNlYXJjaElucHV0LnZhbHVlLnRyaW0oKTtcclxuXHJcbiAgICAgICAgICAgIGlmIChxdWVyeS5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBzZWFyY2hUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBmZXRjaChgL2ZyaWVuZHMvc2VhcmNoP3E9JHtlbmNvZGVVUklDb21wb25lbnQocXVlcnkpfWAsIHtcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZGF0YS51c2Vycy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkF1Y3VuIGd1ZXJyaWVyIHRyb3V2ZTwvcD4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9IGRhdGEudXNlcnMubWFwKHUgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsZXQgYWN0aW9uSHRtbCA9ICcnO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdhY2NlcHRlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5BbWk8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ3BlbmRpbmdfc2VudCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5FbnZveWVlPC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdwZW5kaW5nX3JlY2VpdmVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPlJlY3VlPC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gYDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLWFkZFwiIGRhdGEtYWRkLWZyaWVuZC1pZD1cIiR7dS51c2VySWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGx1c1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPmA7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAke3UucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbCh1LnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKHUudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbCh1LnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3JhdGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHt1LnJhdGluZ308L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hY3Rpb25zXCI+JHthY3Rpb25IdG1sfTwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGA7XHJcbiAgICAgICAgICAgICAgICAgICAgfSkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWRkLWZyaWVuZC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc2VuZEZyaWVuZFJlcXVlc3QoYnRuLmRhdGFzZXQuYWRkRnJpZW5kSWQsIGJ0bik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0sIDMwMCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VuZEZyaWVuZFJlcXVlc3QodXNlcklkLCBidG4pIHtcclxuICAgICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9yZXF1ZXN0LyR7dXNlcklkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBidG4ub3V0ZXJIVE1MID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+RW52b3llZTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IGJ0bi5kaXNhYmxlZCA9IGZhbHNlOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXBvcnRNZXNzYWdlQWN0aW9uKG1lc3NhZ2VJZCwgYnRuKSB7XHJcbiAgICAgICAgY29uc3QgcmVhc29uID0gcHJvbXB0KCdSYWlzb24gZHUgc2lnbmFsZW1lbnQgOicpO1xyXG4gICAgICAgIGlmIChyZWFzb24gPT09IG51bGwpIHJldHVybjsgLy8gY2FuY2VsbGVkXHJcblxyXG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7bWVzc2FnZUlkfS9yZXBvcnRgLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgcmVhc29uOiByZWFzb24gfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBidG4uaW5uZXJIVE1MID0gJzxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrXCI+PC9pPic7XHJcbiAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LmFkZCgnY2hhdC1tZXNzYWdlX19yZXBvcnQtLWRvbmUnKTtcclxuICAgICAgICAgICAgICAgIGJ0bi50aXRsZSA9ICdTaWduYWxlJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4geyBidG4uZGlzYWJsZWQgPSBmYWxzZTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBDT05WRVJTQVRJT05cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gb3BlbkNvbnZlcnNhdGlvbih1c2VySWQsIHVzZXJuYW1lKSB7XHJcbiAgICAgICAgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IHVzZXJJZDtcclxuICAgICAgICBsYXN0TWVzc2FnZUlkID0gMDtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX3RhYnMnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19jb250ZW50Jykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBjb25zdCBjb252RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNvbnZlcnNhdGlvbl0nKTtcclxuICAgICAgICBjb252RWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW5hbWVdJykudGV4dENvbnRlbnQgPSB1c2VybmFtZTtcclxuICAgICAgICBjb25zdCBtZXNzYWdlc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW1lc3NhZ2VzXScpO1xyXG4gICAgICAgIG1lc3NhZ2VzRWwuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19sb2FkaW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBDaGFyZ2VtZW50Li4uPC9kaXY+JztcclxuXHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7dXNlcklkfWAsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKGRhdGEubWVzc2FnZXMsIGZhbHNlKTtcclxuICAgICAgICAgICAgc3RhcnRNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlck1lc3NhZ2VzKG1lc3NhZ2VzLCBhcHBlbmQpIHtcclxuICAgICAgICBjb25zdCBtZXNzYWdlc0VsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLW1lc3NhZ2VzXScpO1xyXG5cclxuICAgICAgICBpZiAoIWFwcGVuZCkge1xyXG4gICAgICAgICAgICBpZiAobWVzc2FnZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RGVidXQgZGUgbGEgY29udmVyc2F0aW9uLiBFbnZveWV6IGxlIHByZW1pZXIgbWVzc2FnZSE8L3A+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzRWwuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNpIG9uIGFqb3V0ZSBkZXMgbWVzc2FnZXMgZXQgcXVlIGxlIGNvbnRlbmV1ciBhZmZpY2hlIGxlIHBsYWNlaG9sZGVyLCBsZSBzdXBwcmltZXJcclxuICAgICAgICBpZiAoYXBwZW5kICYmIG1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgY29uc3QgcGxhY2Vob2xkZXIgPSBtZXNzYWdlc0VsLnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19lbXB0eScpO1xyXG4gICAgICAgICAgICBpZiAocGxhY2Vob2xkZXIpIHBsYWNlaG9sZGVyLnJlbW92ZSgpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgbWVzc2FnZXMuZm9yRWFjaChtc2cgPT4ge1xyXG4gICAgICAgICAgICBpZiAobXNnLmlkID4gbGFzdE1lc3NhZ2VJZCkgbGFzdE1lc3NhZ2VJZCA9IG1zZy5pZDtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBkaXYuY2xhc3NMaXN0LmFkZCgnY2hhdC1tZXNzYWdlJywgbXNnLmlzRnJvbU1lID8gJ2NoYXQtbWVzc2FnZS0tbWluZScgOiAnY2hhdC1tZXNzYWdlLS10aGVpcnMnKTtcclxuXHJcbiAgICAgICAgICAgIGxldCByZXBvcnRCdG4gPSAnJztcclxuICAgICAgICAgICAgaWYgKCFtc2cuaXNGcm9tTWUpIHtcclxuICAgICAgICAgICAgICAgIHJlcG9ydEJ0biA9IGA8YnV0dG9uIGNsYXNzPVwiY2hhdC1tZXNzYWdlX19yZXBvcnRcIiBkYXRhLXJlcG9ydC1tc2ctaWQ9XCIke21zZy5pZH1cIiB0aXRsZT1cIlNpZ25hbGVyIGNlIG1lc3NhZ2VcIj48aSBjbGFzcz1cImZhcyBmYS1mbGFnXCI+PC9pPjwvYnV0dG9uPmA7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGRpdi5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICAke2VzY2FwZUh0bWwobXNnLmNvbnRlbnQpfVxyXG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJjaGF0LW1lc3NhZ2VfX3RpbWVcIj4ke2VzY2FwZUh0bWwobXNnLmRhdGUpfSAke3JlcG9ydEJ0bn08L3NwYW4+XHJcbiAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgICAgICAvLyBBdHRhY2ggcmVwb3J0IGhhbmRsZXJcclxuICAgICAgICAgICAgY29uc3QgcmVwb3J0RWwgPSBkaXYucXVlcnlTZWxlY3RvcignW2RhdGEtcmVwb3J0LW1zZy1pZF0nKTtcclxuICAgICAgICAgICAgaWYgKHJlcG9ydEVsKSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnRFbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICByZXBvcnRNZXNzYWdlQWN0aW9uKHJlcG9ydEVsLmRhdGFzZXQucmVwb3J0TXNnSWQsIHJlcG9ydEVsKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBtZXNzYWdlc0VsLmFwcGVuZENoaWxkKGRpdik7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIG1lc3NhZ2VzRWwuc2Nyb2xsVG9wID0gbWVzc2FnZXNFbC5zY3JvbGxIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU2VuZCBtZXNzYWdlXHJcbiAgICBjb25zdCBzZW5kQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLXNlbmRdJyk7XHJcbiAgICBjb25zdCBpbnB1dEVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLWlucHV0XScpO1xyXG5cclxuICAgIGlmIChzZW5kQnRuICYmIGlucHV0RWwpIHtcclxuICAgICAgICBzZW5kQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2VuZE1lc3NhZ2UpO1xyXG4gICAgICAgIGlucHV0RWwuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgc2VuZE1lc3NhZ2UoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kTWVzc2FnZSgpIHtcclxuICAgICAgICBjb25zdCBjb250ZW50ID0gaW5wdXRFbC52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgaWYgKCFjb250ZW50IHx8ICFjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlucHV0RWwudmFsdWUgPSAnJztcclxuXHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7Y3VycmVudENvbnZlcnNhdGlvblVzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnXHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgY29udGVudDogY29udGVudCB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgJiYgZGF0YS5tZXNzYWdlKSB7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhbZGF0YS5tZXNzYWdlXSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBCYWNrIGJ1dHRvblxyXG4gICAgY29uc3QgYmFja0J0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1iYWNrXScpO1xyXG4gICAgaWYgKGJhY2tCdG4pIHtcclxuICAgICAgICBiYWNrQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkID0gbnVsbDtcclxuICAgICAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgc3dpdGNoVGFiKCdmcmllbmRzJyk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBNRVNTQUdFIFBPTExJTkcgKGV2ZXJ5IDVzIHdoZW4gY29udmVyc2F0aW9uIG9wZW4pXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIHN0YXJ0TWVzc2FnZVBvbGxpbmcoKSB7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcclxuICAgICAgICAgICAgaWYgKCFjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkKSByZXR1cm47XHJcblxyXG4gICAgICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHtjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkfT9hZnRlcklkPSR7bGFzdE1lc3NhZ2VJZH1gLCB7XHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLm1lc3NhZ2VzICYmIGRhdGEubWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKGRhdGEubWVzc2FnZXMsIHRydWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9LCA1MDAwKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzdG9wTWVzc2FnZVBvbGxpbmcoKSB7XHJcbiAgICAgICAgaWYgKG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwpIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChtZXNzYWdlUG9sbGluZ0ludGVydmFsKTtcclxuICAgICAgICAgICAgbWVzc2FnZVBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gVU5SRUFEIENPVU5UIFBPTExJTkcgKGV2ZXJ5IDMwcywgYWx3YXlzIGFjdGl2ZSlcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gZmV0Y2hVbnJlYWRDb3VudCgpIHtcclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvdW5yZWFkLWNvdW50Jywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEudG90YWwgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS50ZXh0Q29udGVudCA9IGRhdGEudG90YWw7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBiYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb25zdCByZXF1ZXN0c0JhZGdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcmVxdWVzdHMtYmFkZ2VdJyk7XHJcbiAgICAgICAgICAgIGlmIChyZXF1ZXN0c0JhZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5wZW5kaW5nUmVxdWVzdHMgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS50ZXh0Q29udGVudCA9IGRhdGEucGVuZGluZ1JlcXVlc3RzO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7fSk7XHJcbiAgICB9XHJcblxyXG4gICAgZmV0Y2hVbnJlYWRDb3VudCgpO1xyXG4gICAgdW5yZWFkUG9sbGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoZmV0Y2hVbnJlYWRDb3VudCwgMzAwMDApO1xyXG59KTtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbImVzY2FwZUh0bWwiLCJzdHIiLCJkaXYiLCJkb2N1bWVudCIsImNyZWF0ZUVsZW1lbnQiLCJhcHBlbmRDaGlsZCIsImNyZWF0ZVRleHROb2RlIiwiaW5uZXJIVE1MIiwiYWRkRXZlbnRMaXN0ZW5lciIsImJ1cmdlciIsInF1ZXJ5U2VsZWN0b3IiLCJuYXYiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJTVEFUX01BWCIsImRtZyIsInNwZWVkIiwiZG9kZ2UiLCJjcml0IiwiaHAiLCJwb3J0cmFpdHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGV0YWlscyIsImdldEVsZW1lbnRCeUlkIiwic2VsZWN0ZWRMaXN0IiwibGF1bmNoQnRuIiwibGVuZ3RoIiwibWF4U2VsZWN0aW9uIiwic2VsZWN0ZWRIZXJvZXMiLCJzZWxlY3RlZEhlcm9JZHMiLCJST0xFX0NBVEVHT1JJRVMiLCJnZXRTZWxlY3RlZFJvbGVzIiwicm9sZXMiLCJUYW5rIiwiRFBTIiwiU3VwcG9ydCIsImZvckVhY2giLCJpZCIsInAiLCJBcnJheSIsImZyb20iLCJmaW5kIiwicHAiLCJkYXRhc2V0IiwiY2F0Iiwicm9sZSIsImNhblNlbGVjdFJvbGUiLCJwb3J0cmFpdCIsInJlbW92ZSIsImFkZCIsIm5hbWUiLCJkbWdNaW4iLCJOdW1iZXIiLCJkbWdNYXgiLCJzcHJpdGVGaWxlIiwic3ByaXRlIiwiYWJpbGl0eU5hbWUiLCJhYmlsaXR5RGVzYyIsImFiaWxpdHlDZCIsInNwcml0ZVBhdGgiLCJjb25jYXQiLCJpc1NlbGVjdGVkIiwiaW5jbHVkZXMiLCJhYmlsaXR5SHRtbCIsIk1hdGgiLCJtaW4iLCJidG5SaWdodCIsInJvbGVDYXQiLCJhbHJlYWR5U2VsZWN0ZWQiLCJkaXNhYmxlZCIsInRleHRDb250ZW50IiwiZmlsdGVyIiwiaGlkIiwiaCIsImFsZXJ0IiwicHVzaCIsInVwZGF0ZVNlbGVjdGVkVGVhbSIsImhlcm8iLCJoZXJvRWwiLCJ1cGRhdGVSb2xlSW5kaWNhdG9ycyIsInRlYW1Db21wbGV0ZSIsImluZGljYXRvciIsInNsb3QiLCJzYXZlUHJlc2V0QnRuIiwicHJlc2V0TW9kYWwiLCJwcmVzZXROYW1lSW5wdXQiLCJwcmVzZXRDb25maXJtQnRuIiwicHJlc2V0Q2FuY2VsQnRuIiwidXBkYXRlU2F2ZVByZXNldEJ0biIsIm9yaWdpbmFsVXBkYXRlU2VsZWN0ZWRUZWFtIiwiX29yaWdVcGRhdGUiLCJfb3JpZ1JvbGVJbmRpY2F0b3JzIiwidmFsdWUiLCJzdHlsZSIsImRpc3BsYXkiLCJzZXRUaW1lb3V0IiwiZm9jdXMiLCJ0cmltIiwiYm9yZGVyQ29sb3IiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwiSlNPTiIsInN0cmluZ2lmeSIsImNoYXJhY3RlcklkcyIsIm1hcCIsInRoZW4iLCJyZXMiLCJqc29uIiwiZGF0YSIsInN1Y2Nlc3MiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInJlbG9hZCIsImVycm9yIiwiZSIsImtleSIsImNsaWNrIiwibG9hZFByZXNldCIsImlkU3RyIiwiU3RyaW5nIiwiZGVsZXRlUHJlc2V0IiwicHJlc2V0SWQiLCJjaGlwRWwiLCJjb25maXJtIiwibGlzdCIsImNoaWxkcmVuIiwiX2RvY3VtZW50JHF1ZXJ5U2VsZWN0IiwiY2hpcCIsImNoYXJJZHMiLCJwYXJzZSIsInByZXNldElkcyIsInN0b3BQcm9wYWdhdGlvbiIsInNlbGVjdGVkTGlzdE9ic2VydmVyIiwiTXV0YXRpb25PYnNlcnZlciIsIm9ic2VydmUiLCJjaGlsZExpc3QiLCJpIiwiZW5jb2RlVVJJQ29tcG9uZW50Iiwiam9pbiIsInJlc3BvbnNlIiwicmVkaXJlY3RlZCIsImhyZWYiLCJ1cmwiLCJwb3B1cCIsImJhY2tkcm9wIiwiY2xvc2VCdG4iLCJjb250ZW50IiwibG9hZGVkIiwib3BlblBvcHVwIiwib2Zmc2V0SGVpZ2h0IiwiZmV0Y2hQcm9maWxlIiwiY2xvc2VQb3B1cCIsInJlbmRlclByb2ZpbGUiLCJyZXN1bHRDbGFzcyIsInIiLCJyZXN1bHRMYWJlbCIsImF2YXRhckh0bWwiLCJwcm9maWxlSW1hZ2UiLCJ1c2VybmFtZSIsImh0bWwiLCJtb3R0byIsImJpbyIsInJhdGluZyIsInN0YXRzIiwid2lucyIsImxvc3NlcyIsIndpblJhdGUiLCJmYXZvcml0ZUNoYXJhY3RlciIsImdhbWVzUGxheWVkIiwibGFzdFRlYW0iLCJjIiwicmVjZW50QmF0dGxlcyIsImIiLCJwYXJzZUludCIsInJlc3VsdCIsIm9wcG9uZW50IiwibWF0Y2hUeXBlIiwidG9VcHBlckNhc2UiLCJkYXRlIiwiQ29tYmF0Q29udHJvbGxlciIsImNvbnRhaW5lciIsIl9jbGFzc0NhbGxDaGVjayIsImxvZ3MiLCJjdXJyZW50SW5kZXgiLCJpc1BsYXlpbmciLCJpc1BhdXNlZCIsImNoYXJhY3RlckVsZW1lbnRzIiwiY2hhcmFjdGVyTWF4SFAiLCJpbml0IiwiX2NyZWF0ZUNsYXNzIiwiX3RoaXMiLCJsb2dzRGF0YSIsImNvbWJhdExvZ3MiLCJjb25zb2xlIiwibG9nQ29udGFpbmVyIiwib3ZlcmxheSIsInBsYXlCdG4iLCJza2lwQnRuIiwic3BlZWRCdG5zIiwiY2hhcmFjdGVyU2x1Z3MiLCJjaGFyYWN0ZXJIYXNIZWFsIiwiYWJpbGl0eUNvb2xkb3ducyIsImVsIiwiY2hhcmFjdGVyTmFtZSIsInRlYW0iLCJjaGFyYWN0ZXJUZWFtIiwiY2hhcmFjdGVyU2x1ZyIsImhhc0hlYWwiLCJocFRleHQiLCJtYXRjaCIsImFiaWxpdHlFbGVtZW50cyIsImNoYXJOYW1lIiwiY2hhclRlYW0iLCJhYmlsaXR5RWwiLCJtYXhDZCIsImFiaWxpdHlNYXhDZCIsImJhZGdlIiwibmFtZUVsIiwiaWNvbkVsIiwib3BhY2l0eSIsImJpbmRFdmVudHMiLCJwbGF5IiwiX3RoaXMyIiwidG9nZ2xlUGxheSIsInNraXAiLCJidG4iLCJzZXRTcGVlZCIsInVwZGF0ZVBsYXlCdXR0b24iLCJwcm9jZXNzTmV4dExvZyIsInBhdXNlIiwibG9nIiwiZGlzcGxheUxvZyIsInVwZGF0ZUhlYWx0aEJhcnMiLCJ0cmFja0FiaWxpdHlDb29sZG93bnMiLCJ0eXBlIiwiYW5pbWF0ZURlYXRoIiwidGFyZ2V0IiwidGFyZ2V0VGVhbSIsInNob3dWaWN0b3J5T3ZlcmxheSIsImV2ZW50IiwicGFyc2VGbG9hdCIsImN1cnJlbnRUYXJnZXQiLCJjb21iYXRTcGVlZCIsIl90aGlzMyIsInByb2Nlc3NMb2ciLCJkZWxheSIsImdldERlbGF5Rm9yTG9nIiwiZ2V0QWJpbGl0eURlbGF5Iiwic3VidHlwZSIsIl90aGlzNCIsInBsYXlBbmltYXRpb24iLCJocERlbGF5IiwiZ2V0SFBVcGRhdGVEZWxheSIsImNhc3RlciIsImNhc3RlclRlYW0iLCJhYmlsaXR5RGF0YSIsInVwZGF0ZUFiaWxpdHlDb29sZG93bkRpc3BsYXkiLCJjZCIsImdldEFiaWxpdHlIUERlbGF5IiwiYW5pbWF0ZUF0dGFjayIsImF0dGFja2VyIiwiYXR0YWNrZXJUZWFtIiwiaXNDcml0IiwiYW5pbWF0ZUhlYWwiLCJoZWFsZXIiLCJoZWFsZXJUZWFtIiwiYW5pbWF0ZURlZmVuZCIsImRlZmVuZGVyIiwiZGVmZW5kZXJUZWFtIiwiYW5pbWF0ZURvZGdlIiwiYW5pbWF0ZURvVCIsImFuaW1hdGVTdHVubmVkIiwicGxheUFiaWxpdHlBbmltYXRpb24iLCJ0YXJnZXROYW1lIiwiZG90Q2xhc3MiLCJnZXRDaGFyYWN0ZXJFbGVtZW50IiwiYW5pbWF0ZU1hcmtlZCIsImFuaW1hdGVCdWZmIiwiYW5pbWF0ZVN0ZWFsdGgiLCJfdGhpczUiLCJtYXJrS2V5Iiwic3dhcFNwcml0ZSIsInJpcG9zdGVLZXkiLCJzZWxmQnVmZktleSIsImhlYWxlZCIsInBhcnR5QnVmZktleSIsImFuaW1hdGVUZWFtQnVmZiIsInN0ZWFsdGhLZXkiLCJfdGhpczYiLCJPYmplY3QiLCJrZXlzIiwic3RhcnRzV2l0aCIsInNwcml0ZU5hbWUiLCJkdXJhdGlvbiIsIl90aGlzNyIsInNsdWciLCJpbWciLCJzcmMiLCJjb250YWlucyIsImF0dGFja2VyTmFtZSIsImhlYWxlck5hbWUiLCJkZWZlbmRlck5hbWUiLCJlbnRyeSIsImNsYXNzTmFtZSIsIm1lc3NhZ2UiLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJ0ZWFtTmFtZSIsImN1cnJlbnRIUCIsIm1heEhQIiwidGFyZ2V0SFAiLCJ0YXJnZXRNYXhIUCIsInVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzIiwidW5kZWZpbmVkIiwidXBkYXRlQ2hhcmFjdGVySFAiLCJfdGhpczgiLCJtYXhIcCIsInBlcmNlbnQiLCJocEJhciIsInRyYW5zaXRpb24iLCJ3aWR0aCIsInVwZGF0ZUluZm9QYW5lbCIsInBhbmVsQ2xhc3MiLCJwYW5lbCIsImNoYXJhY3RlckluZm9zIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsIl9sb29wIiwiaW5mbyIsInN0YXRzU3BhbiIsInMiLCJuIiwiZG9uZSIsImVyciIsImYiLCJfdGhpczkiLCJmaW5hbGl6ZVJhdGluZyIsIl90aGlzMCIsImZpbmFsaXplVXJsIiwicmF0aW5nQ2hhbmdlIiwic2hvd1JhdGluZ1VwZGF0ZSIsIm5ld1JhdGluZyIsIm5ld1JhdGluZzIiLCJjaGFuZ2UiLCJyYXRpbmdFbCIsInJhdGluZ0VsMiIsIndpbm5lckRpdiIsIm5vdGlmMSIsImNzc1RleHQiLCJjb2xvciIsImNoYW5nZTIiLCJub3RpZjIiLCJjb21iYXRDb250YWluZXIiLCJwYW5lbE9wZW4iLCJjdXJyZW50VGFiIiwiY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCIsImxhc3RNZXNzYWdlSWQiLCJtZXNzYWdlUG9sbGluZ0ludGVydmFsIiwidW5yZWFkUG9sbGluZ0ludGVydmFsIiwiZnJpZW5kc0xvYWRlZCIsInJlcXVlc3RzTG9hZGVkIiwib3BlblBhbmVsIiwibG9hZEZyaWVuZHMiLCJjbG9zZVBhbmVsIiwic3RvcE1lc3NhZ2VQb2xsaW5nIiwidGFiQnRuIiwidGFiTmFtZSIsImZyaWVuZHNUYWIiLCJzd2l0Y2hUYWIiLCJ0YWJDb250ZW50IiwibG9hZFJlcXVlc3RzIiwiZnJpZW5kcyIsInVzZXJJZCIsImxhc3RNZXNzYWdlIiwiaXNGcm9tTWUiLCJpdGVtIiwiZnJpZW5kVXNlcklkIiwib3BlbkNvbnZlcnNhdGlvbiIsInJlcXVlc3RzIiwiZnJpZW5kc2hpcElkIiwiaGFuZGxlUmVxdWVzdCIsImFjY2VwdElkIiwicmVqZWN0SWQiLCJhY3Rpb24iLCJmZXRjaFVucmVhZENvdW50Iiwic2VhcmNoSW5wdXQiLCJzZWFyY2hSZXN1bHRzIiwic2VhcmNoVGltZW91dCIsImNsZWFyVGltZW91dCIsInF1ZXJ5IiwidXNlcnMiLCJ1IiwiYWN0aW9uSHRtbCIsImZyaWVuZFN0YXR1cyIsInNlbmRGcmllbmRSZXF1ZXN0IiwiYWRkRnJpZW5kSWQiLCJvdXRlckhUTUwiLCJyZXBvcnRNZXNzYWdlQWN0aW9uIiwibWVzc2FnZUlkIiwicmVhc29uIiwicHJvbXB0IiwidGl0bGUiLCJjb252RWwiLCJtZXNzYWdlc0VsIiwicmVuZGVyTWVzc2FnZXMiLCJtZXNzYWdlcyIsInN0YXJ0TWVzc2FnZVBvbGxpbmciLCJhcHBlbmQiLCJwbGFjZWhvbGRlciIsIm1zZyIsInJlcG9ydEJ0biIsInJlcG9ydEVsIiwicmVwb3J0TXNnSWQiLCJzZW5kQnRuIiwiaW5wdXRFbCIsInNlbmRNZXNzYWdlIiwiYmFja0J0biIsInNldEludGVydmFsIiwiY2xlYXJJbnRlcnZhbCIsInRvdGFsIiwicmVxdWVzdHNCYWRnZSIsInBlbmRpbmdSZXF1ZXN0cyJdLCJzb3VyY2VSb290IjoiIn0=