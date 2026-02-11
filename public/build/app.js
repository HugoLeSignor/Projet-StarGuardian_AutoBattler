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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUNDLE9BQU8sR0FBRyxNQUFNO1FBQ3hDO01BQ0o7SUFDSixDQUFDLENBQUMsU0FDSSxDQUFDLFlBQU0sQ0FBQyxDQUFDLENBQUM7RUFDcEI7RUFFQXdRLGdCQUFnQixDQUFDLENBQUM7RUFDbEIxQixxQkFBcUIsR0FBRzJELFdBQVcsQ0FBQ2pDLGdCQUFnQixFQUFFLEtBQUssQ0FBQztBQUNoRSxDQUFDLENBQUMsQzs7Ozs7Ozs7Ozs7O0FDdGZGOzs7Ozs7Ozs7Ozs7O0FDQUEiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9hc3NldHMvYXBwLmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9jb21iYXQuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2ZyaWVuZHMuanMiLCJ3ZWJwYWNrOi8vLy4vbm9kZV9tb2R1bGVzL0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzPzJkYzkiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL3N0eWxlcy9hcHAuc2NzcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKlxyXG4gKiBXZWxjb21lIHRvIHlvdXIgYXBwJ3MgbWFpbiBKYXZhU2NyaXB0IGZpbGUhXHJcbiAqL1xyXG5pbXBvcnQgJy4vc3R5bGVzL2FwcC5zY3NzJztcclxuaW1wb3J0ICdAZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcyc7XHJcbmltcG9ydCAnLi9qcy9jb21iYXQuanMnO1xyXG5pbXBvcnQgJy4vanMvZnJpZW5kcy5qcyc7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIFVUSUxJVEFJUkUgU0VDVVJJVEUgWFNTXHJcbj09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcclxuICAgIGlmICghc3RyKSByZXR1cm4gJyc7XHJcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgIGRpdi5hcHBlbmRDaGlsZChkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShzdHIpKTtcclxuICAgIHJldHVybiBkaXYuaW5uZXJIVE1MO1xyXG59XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIE1FTlUgQlVSR0VSXHJcbj09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXJnZXJcIik7XHJcbiAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tbmF2aWdhdGlvblwiKTtcclxuXHJcbiAgICBpZiAoYnVyZ2VyICYmIG5hdikge1xyXG4gICAgICAgIGJ1cmdlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgUEFHRSBURUFNUyAoQ09SUklHw4lFKVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyog8J+UpyBNQVggREVTIFNUQVRTIChhZGFwdGVyIMOgIHRhIEJERCAvIMOpcXVpbGlicmFnZSkgKi9cclxuY29uc3QgU1RBVF9NQVggPSB7XHJcbiAgICBkbWc6IDMwLFxyXG4gICAgc3BlZWQ6IDEyLFxyXG4gICAgZG9kZ2U6IDQwLFxyXG4gICAgY3JpdDogMTUsXHJcbiAgICBocDogNzVcclxufTtcclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCBwb3J0cmFpdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGVhbS1wb3J0cmFpdCcpO1xyXG4gICAgY29uc3QgZGV0YWlscyA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0ZWFtRGV0YWlscycpO1xyXG4gICAgY29uc3Qgc2VsZWN0ZWRMaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNlbGVjdGVkLWxpc3QnKTtcclxuICAgIGNvbnN0IGxhdW5jaEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG4tbGF1bmNoJyk7XHJcblxyXG4gICAgaWYgKCFkZXRhaWxzIHx8IHBvcnRyYWl0cy5sZW5ndGggPT09IDApIHJldHVybjtcclxuXHJcbiAgICBjb25zdCBtYXhTZWxlY3Rpb24gPSAzO1xyXG4gICAgbGV0IHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICBsZXQgc2VsZWN0ZWRIZXJvSWRzID0gW107XHJcblxyXG4gICAgLy8gQ29tcG9zaXRpb24gb2JsaWdhdG9pcmUgOiAxIFRhbmssIDEgRFBTLCAxIFN1cHBvcnRcclxuICAgIGNvbnN0IFJPTEVfQ0FURUdPUklFUyA9IHsgJ1RhbmsnOiAnVGFuaycsICdEUFMnOiAnRFBTJywgJ1N1cHBvcnQnOiAnU3VwcG9ydCcsICdTb2lnbmV1cic6ICdTdXBwb3J0JywgJ0J1ZmZlcic6ICdTdXBwb3J0JyB9O1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFNlbGVjdGVkUm9sZXMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSB7IFRhbms6IDAsIERQUzogMCwgU3VwcG9ydDogMCB9O1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgcCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHBwID0+IHBwLmRhdGFzZXQuaWQgPT09IGlkKTtcclxuICAgICAgICAgICAgaWYgKHApIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhdCA9IFJPTEVfQ0FURUdPUklFU1twLmRhdGFzZXQucm9sZV0gfHwgJ1N1cHBvcnQnO1xyXG4gICAgICAgICAgICAgICAgcm9sZXNbY2F0XSsrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNhblNlbGVjdFJvbGUocm9sZSkge1xyXG4gICAgICAgIGNvbnN0IGNhdCA9IFJPTEVfQ0FURUdPUklFU1tyb2xlXSB8fCAnU3VwcG9ydCc7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgcmV0dXJuIHJvbGVzW2NhdF0gPCAxO1xyXG4gICAgfVxyXG5cclxuICAgIHBvcnRyYWl0cy5mb3JFYWNoKHBvcnRyYWl0ID0+IHtcclxuICAgICAgICBwb3J0cmFpdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBpZCA9IHBvcnRyYWl0LmRhdGFzZXQuaWQ7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwb3J0cmFpdC5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGUgPSBwb3J0cmFpdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01pbiA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01pbik7XHJcbiAgICAgICAgICAgIGNvbnN0IGRtZ01heCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRtZ01heCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwZWVkID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuc3BlZWQpO1xyXG4gICAgICAgICAgICBjb25zdCBkb2RnZSA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmRvZGdlKTtcclxuICAgICAgICAgICAgY29uc3QgY3JpdCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmNyaXQpO1xyXG4gICAgICAgICAgICBjb25zdCBocCA9IE51bWJlcihwb3J0cmFpdC5kYXRhc2V0LmhwKTtcclxuICAgICAgICAgICAgY29uc3Qgc3ByaXRlRmlsZSA9IHBvcnRyYWl0LmRhdGFzZXQuc3ByaXRlO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5TmFtZSA9IHBvcnRyYWl0LmRhdGFzZXQuYWJpbGl0eU5hbWUgfHwgJyc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlEZXNjID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5RGVzYyB8fCAnJztcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUNkID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5Q2QgfHwgJyc7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7c3ByaXRlRmlsZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlIdG1sID0gYWJpbGl0eU5hbWUgPyBgXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImFiaWxpdHktc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19oZWFkZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWZpcmUtYWx0XCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX25hbWVcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eU5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uX19jZFwiPjxpIGNsYXNzPVwiZmFzIGZhLWhvdXJnbGFzcy1oYWxmXCI+PC9pPiAke2VzY2FwZUh0bWwoYWJpbGl0eUNkKX1UPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX2Rlc2NcIj4ke2VzY2FwZUh0bWwoYWJpbGl0eURlc2MpfTwvcD5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCA6ICcnO1xyXG5cclxuICAgICAgICAgICAgZGV0YWlscy5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwidGVhbS1kZXRhaWxzLWNvbnRlbnRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDI+JHtuYW1lfTwvaDI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJyb2xlXCI+JHtyb2xlfTwvcD5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdpZi1jb250YWluZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGltZyBzcmM9XCIke3Nwcml0ZVBhdGh9XCIgYWx0PVwiU3ByaXRlIGRlICR7bmFtZX1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRzXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ETUc8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tZG1nXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChkbWdNYXggLyBTVEFUX01BWC5kbWcpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtkbWdNaW59IC0gJHtkbWdNYXh9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5WSVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsIHN0YXQtZmlsbC0tc3BkXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChzcGVlZCAvIFNUQVRfTUFYLnNwZWVkKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7c3BlZWR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5ET0RHRTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1kb2RnZVwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoZG9kZ2UgLyBTVEFUX01BWC5kb2RnZSkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2RvZGdlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+Q1JJVDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1jcml0XCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChjcml0IC8gU1RBVF9NQVguY3JpdCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2NyaXR9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5IUDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1ocFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoaHAgLyBTVEFUX01BWC5ocCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2hwfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICR7YWJpbGl0eUh0bWx9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJidG4tc2VsZWN0LXJpZ2h0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7aXNTZWxlY3RlZCA/ICdEw6lzw6lsZWN0aW9ubmVyJyA6ICdTw6lsZWN0aW9ubmVyJ31cclxuICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYnRuUmlnaHQgPSBkZXRhaWxzLnF1ZXJ5U2VsZWN0b3IoJy5idG4tc2VsZWN0LXJpZ2h0Jyk7XHJcbiAgICAgICAgICAgIGNvbnN0IHJvbGVDYXQgPSBST0xFX0NBVEVHT1JJRVNbcm9sZV0gfHwgJ1N1cHBvcnQnO1xyXG4gICAgICAgICAgICBjb25zdCBhbHJlYWR5U2VsZWN0ZWQgPSBzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpO1xyXG5cclxuICAgICAgICAgICAgLy8gRMOpc2FjdGl2ZXIgbGUgYm91dG9uIHNpIGxlIHNsb3QgZGUgY2UgcsO0bGUgZXN0IGTDqWrDoCBwcmlzXHJcbiAgICAgICAgICAgIGlmICghYWxyZWFkeVNlbGVjdGVkICYmICFjYW5TZWxlY3RSb2xlKHJvbGUpKSB7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC50ZXh0Q29udGVudCA9IGBTbG90ICR7cm9sZUNhdH0gZMOpasOgIHByaXNgO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBidG5SaWdodC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzID0gc2VsZWN0ZWRIZXJvSWRzLmZpbHRlcihoaWQgPT4gaGlkICE9PSBpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBzZWxlY3RlZEhlcm9lcy5maWx0ZXIoaCA9PiBoICE9PSBuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QucmVtb3ZlKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIWNhblNlbGVjdFJvbGUocm9sZSkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoYFZvdXMgYXZleiBkw6lqw6AgdW4gJHtyb2xlQ2F0fSBkYW5zIHZvdHJlIMOpcXVpcGUgIWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMubGVuZ3RoID49IG1heFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIlZvdXMgcG91dmV6IHPDqWxlY3Rpb25uZXIgbWF4aW11bSAzIHBlcnNvbm5hZ2VzICFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzLnB1c2gobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LnRleHRDb250ZW50ID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKVxyXG4gICAgICAgICAgICAgICAgICAgID8gJ0TDqXPDqWxlY3Rpb25uZXInXHJcbiAgICAgICAgICAgICAgICAgICAgOiAnU8OpbGVjdGlvbm5lcic7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qICBaT05FIMOJUVVJUEUg4oCUIHNwcml0ZXMgc2V1bGVtZW50ICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTZWxlY3RlZFRlYW0oKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm8gPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwID0+IHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAoIWhlcm8pIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGhlcm8uZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7aGVyby5kYXRhc2V0LnNwcml0ZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgaGVyb0VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWhlcm8tc3ByaXRlJyk7XHJcbiAgICAgICAgICAgIGhlcm9FbC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c3ByaXRlUGF0aH1cIiBhbHQ9XCJTcHJpdGUgZGUgJHtuYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+JHtuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgc2VsZWN0ZWRMaXN0LmFwcGVuZENoaWxkKGhlcm9FbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbGVzIGluZGljYXRldXJzIGRlIHLDtGxlc1xyXG4gICAgICAgIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCk7XHJcblxyXG4gICAgICAgIGlmIChsYXVuY2hCdG4pIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW1Db21wbGV0ZSA9IHJvbGVzLlRhbmsgPT09IDEgJiYgcm9sZXMuRFBTID09PSAxICYmIHJvbGVzLlN1cHBvcnQgPT09IDE7XHJcbiAgICAgICAgICAgIGxhdW5jaEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCkge1xyXG4gICAgICAgIGNvbnN0IHJvbGVzID0gZ2V0U2VsZWN0ZWRSb2xlcygpO1xyXG4gICAgICAgIGNvbnN0IGluZGljYXRvciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5yb2xlLWluZGljYXRvcicpO1xyXG4gICAgICAgIGlmIChpbmRpY2F0b3IpIHtcclxuICAgICAgICAgICAgaW5kaWNhdG9yLnF1ZXJ5U2VsZWN0b3JBbGwoJy5yb2xlLXNsb3QnKS5mb3JFYWNoKHNsb3QgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2F0ID0gc2xvdC5kYXRhc2V0LnJvbGU7XHJcbiAgICAgICAgICAgICAgICBpZiAocm9sZXNbY2F0XSA9PT0gMSkge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2xhc3NMaXN0LmFkZCgnZmlsbGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHNsb3QuY2xhc3NMaXN0LnJlbW92ZSgnZmlsbGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgICAgUFJFU0VUU1xyXG4gICAgPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuICAgIGNvbnN0IHNhdmVQcmVzZXRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLXNhdmUtcHJlc2V0Jyk7XHJcbiAgICBjb25zdCBwcmVzZXRNb2RhbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRNb2RhbCcpO1xyXG4gICAgY29uc3QgcHJlc2V0TmFtZUlucHV0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldE5hbWUnKTtcclxuICAgIGNvbnN0IHByZXNldENvbmZpcm1CdG4gPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0Q29uZmlybScpO1xyXG4gICAgY29uc3QgcHJlc2V0Q2FuY2VsQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldENhbmNlbCcpO1xyXG5cclxuICAgIC8vIE1ldHRyZSBhIGpvdXIgbGUgYm91dG9uIHNhdXZlZ2FyZGVyIHNlbG9uIGxhIHNlbGVjdGlvblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlU2F2ZVByZXNldEJ0bigpIHtcclxuICAgICAgICBpZiAoc2F2ZVByZXNldEJ0bikge1xyXG4gICAgICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbUNvbXBsZXRlID0gcm9sZXMuVGFuayA9PT0gMSAmJiByb2xlcy5EUFMgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgc2F2ZVByZXNldEJ0bi5kaXNhYmxlZCA9ICF0ZWFtQ29tcGxldGU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vIEFwcGVsZXIgdXBkYXRlU2F2ZVByZXNldEJ0biBhIGNoYXF1ZSBjaGFuZ2VtZW50IGRlIHNlbGVjdGlvblxyXG4gICAgY29uc3Qgb3JpZ2luYWxVcGRhdGVTZWxlY3RlZFRlYW0gPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcbiAgICAvLyBPbiBzdXJjaGFyZ2UgZW4gYWpvdXRhbnQgbCdhcHBlbFxyXG4gICAgY29uc3QgX29yaWdVcGRhdGUgPSB1cGRhdGVTZWxlY3RlZFRlYW07XHJcblxyXG4gICAgLy8gUGF0Y2g6IGFqb3V0ZXIgbCdhcHBlbCBhIHVwZGF0ZVNhdmVQcmVzZXRCdG4gZGFucyB1cGRhdGVTZWxlY3RlZFRlYW1cclxuICAgIC8vIE9uIGxlIGZhaXQgZW4gd3JhcHBhbnQgbGVzIGluZGljYXRldXJzXHJcbiAgICBjb25zdCBfb3JpZ1JvbGVJbmRpY2F0b3JzID0gdXBkYXRlUm9sZUluZGljYXRvcnM7XHJcblxyXG4gICAgLy8gT3V2cmlyIGxhIG1vZGFsXHJcbiAgICBpZiAoc2F2ZVByZXNldEJ0biAmJiBwcmVzZXRNb2RhbCkge1xyXG4gICAgICAgIHNhdmVQcmVzZXRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC52YWx1ZSA9ICcnO1xyXG4gICAgICAgICAgICBwcmVzZXRNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHByZXNldE5hbWVJbnB1dC5mb2N1cygpLCAxMDApO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBGZXJtZXIgbGEgbW9kYWxcclxuICAgICAgICBwcmVzZXRDYW5jZWxCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHByZXNldE1vZGFsLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtbW9kYWxfX2JhY2tkcm9wJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIFNhdXZlZ2FyZGVyIGxlIHByZXNldFxyXG4gICAgICAgIHByZXNldENvbmZpcm1CdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBwcmVzZXROYW1lSW5wdXQudmFsdWUudHJpbSgpO1xyXG4gICAgICAgICAgICBpZiAoIW5hbWUpIHtcclxuICAgICAgICAgICAgICAgIHByZXNldE5hbWVJbnB1dC5zdHlsZS5ib3JkZXJDb2xvciA9ICcjZGMxNDNjJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnLi4uJztcclxuXHJcbiAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvcHJlc2V0cy9zYXZlJywge1xyXG4gICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xyXG4gICAgICAgICAgICAgICAgICAgIG5hbWU6IG5hbWUsXHJcbiAgICAgICAgICAgICAgICAgICAgY2hhcmFjdGVySWRzOiBzZWxlY3RlZEhlcm9JZHMubWFwKE51bWJlcilcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgICAgICAvLyBSZWNoYXJnZXIgbGEgcGFnZSBwb3VyIGFmZmljaGVyIGxlIG5vdXZlYXUgcHJlc2V0XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydChkYXRhLmVycm9yIHx8ICdFcnJldXIgbG9ycyBkZSBsYSBzYXV2ZWdhcmRlJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUnKTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIHByZXNldENvbmZpcm1CdG4udGV4dENvbnRlbnQgPSAnU2F1dmVnYXJkZXInO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gRW50ZXIgcG91ciB2YWxpZGVyXHJcbiAgICAgICAgcHJlc2V0TmFtZUlucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHByZXNldENvbmZpcm1CdG4uY2xpY2soKTtcclxuICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyc7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQ2hhcmdlciB1biBwcmVzZXQgKHNlbGVjdGlvbiBwcm9ncmFtbWF0aXF1ZSBkZXMgcGVyc29ubmFnZXMpXHJcbiAgICBmdW5jdGlvbiBsb2FkUHJlc2V0KGNoYXJhY3Rlcklkcykge1xyXG4gICAgICAgIC8vIFJlc2V0IGxhIHNlbGVjdGlvbiBhY3R1ZWxsZVxyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG4gICAgICAgIHNlbGVjdGVkSGVyb2VzID0gW107XHJcbiAgICAgICAgcG9ydHJhaXRzLmZvckVhY2gocCA9PiBwLmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJykpO1xyXG5cclxuICAgICAgICAvLyBTZWxlY3Rpb25uZXIgbGVzIHBlcnNvbm5hZ2VzIGR1IHByZXNldFxyXG4gICAgICAgIGNoYXJhY3Rlcklkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaWRTdHIgPSBTdHJpbmcoaWQpO1xyXG4gICAgICAgICAgICBjb25zdCBwb3J0cmFpdCA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBpZFN0cik7XHJcbiAgICAgICAgICAgIGlmIChwb3J0cmFpdCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWRTdHIpO1xyXG4gICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMucHVzaChwb3J0cmFpdC5kYXRhc2V0Lm5hbWUpO1xyXG4gICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICB1cGRhdGVTYXZlUHJlc2V0QnRuKCk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gU3VwcHJpbWVyIHVuIHByZXNldFxyXG4gICAgZnVuY3Rpb24gZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwRWwpIHtcclxuICAgICAgICBpZiAoIWNvbmZpcm0oJ1N1cHByaW1lciBjZSBwcmVzZXQgPycpKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGAvdGVhbXMvcHJlc2V0cy8ke3ByZXNldElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnREVMRVRFJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfSxcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBjaGlwRWwucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICAvLyBTaSBwbHVzIGRlIHByZXNldHMsIGNhY2hlciBsYSBiYXJyZVxyXG4gICAgICAgICAgICAgICAgY29uc3QgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXRzLWJhcl9fbGlzdCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxpc3QgJiYgbGlzdC5jaGlsZHJlbi5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0cy1iYXInKT8ucmVtb3ZlKCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc3VwcHJlc3Npb24nKSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXR0YWNoZXIgbGVzIGV2ZW50cyBhdXggY2hpcHMgZGUgcHJlc2V0c1xyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnByZXNldC1jaGlwJykuZm9yRWFjaChjaGlwID0+IHtcclxuICAgICAgICBjb25zdCBwcmVzZXRJZCA9IGNoaXAuZGF0YXNldC5wcmVzZXRJZDtcclxuICAgICAgICBjb25zdCBjaGFySWRzID0gSlNPTi5wYXJzZShjaGlwLmRhdGFzZXQucHJlc2V0SWRzKTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2xvYWQnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgbG9hZFByZXNldChjaGFySWRzKTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY2hpcC5xdWVyeVNlbGVjdG9yKCcucHJlc2V0LWNoaXBfX2RlbGV0ZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgZGVsZXRlUHJlc2V0KHByZXNldElkLCBjaGlwKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8vIE9ic2VydmVyIGxlcyBjaGFuZ2VtZW50cyBkZSBzZWxlY3Rpb24gcG91ciBsZSBib3V0b24gc2F2ZVxyXG4gICAgLy8gT24gdXRpbGlzZSB1biBNdXRhdGlvbk9ic2VydmVyIHN1ciBzZWxlY3RlZExpc3RcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdE9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKCkgPT4gdXBkYXRlU2F2ZVByZXNldEJ0bigpKTtcclxuICAgIGlmIChzZWxlY3RlZExpc3QpIHtcclxuICAgICAgICBzZWxlY3RlZExpc3RPYnNlcnZlci5vYnNlcnZlKHNlbGVjdGVkTGlzdCwgeyBjaGlsZExpc3Q6IHRydWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgaWYgKGxhdW5jaEJ0bikge1xyXG4gICAgICAgIGxhdW5jaEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAvLyBFbnZvaSBQT1NUIEFKQVggdmVycyAvdGVhbXMvc2VsZWN0XHJcbiAgICAgICAgICAgICAgICBmZXRjaCgnL3RlYW1zL3NlbGVjdCcsIHtcclxuICAgICAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgICAgICBoZWFkZXJzOiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyxcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnLFxyXG4gICAgICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICAgICAgYm9keTogc2VsZWN0ZWRIZXJvSWRzLm1hcCgoaWQsIGkpID0+IGBjaGFyYWN0ZXJfaWRzWyR7aX1dPSR7ZW5jb2RlVVJJQ29tcG9uZW50KGlkKX1gKS5qb2luKCcmJylcclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXNwb25zZSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHJlc3BvbnNlLnJlZGlyZWN0ZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSByZXNwb25zZS51cmw7XHJcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gUmVkaXJpZ2UgbWFudWVsbGVtZW50IHNpIHBhcyBkZSByZWRpcmVjdGlvblxyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9ICcvbWF0Y2htYWtpbmcnO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzw6lsZWN0aW9uIGRlIGxcXCfDqXF1aXBlLicpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBQUk9GSUxFIFBPUFVQXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBvcHVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1wb3B1cF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGNvbnRlbnQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWNvbnRlbnRdJyk7XHJcblxyXG4gICAgaWYgKCF0b2dnbGUgfHwgIXBvcHVwKSByZXR1cm47XHJcblxyXG4gICAgbGV0IGxvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIGZ1bmN0aW9uIG9wZW5Qb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwb3B1cC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5hZGQoJ3Byb2ZpbGUtcG9wdXAtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwX19iYWNrZHJvcC0tb3BlbicpO1xyXG5cclxuICAgICAgICBpZiAoIWxvYWRlZCkge1xyXG4gICAgICAgICAgICBmZXRjaFByb2ZpbGUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2xvc2VQb3B1cCgpIHtcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9LCAzMDApO1xyXG4gICAgfVxyXG5cclxuICAgIHRvZ2dsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG9wZW5Qb3B1cCk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuXHJcbiAgICBmdW5jdGlvbiBmZXRjaFByb2ZpbGUoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9hcGkvcHJvZmlsZScpXHJcbiAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgICAgIGxvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICByZW5kZXJQcm9maWxlKGRhdGEpO1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgY29udGVudC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lcnJvclwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbmRlclByb2ZpbGUoZGF0YSkge1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdENsYXNzID0gKHIpID0+IHIgPT09ICd3aW4nID8gJ3Jlc3VsdC0td2luJyA6IHIgPT09ICdsb3NzJyA/ICdyZXN1bHQtLWxvc3MnIDogJ3Jlc3VsdC0tZHJhdyc7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0TGFiZWwgPSAocikgPT4gciA9PT0gJ3dpbicgPyAnVmljdG9pcmUnIDogciA9PT0gJ2xvc3MnID8gJ0RcXHUwMGU5ZmFpdGUnIDogJ051bCc7XHJcblxyXG4gICAgICAgIGNvbnN0IGF2YXRhckh0bWwgPSBkYXRhLnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChkYXRhLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiQXZhdGFyIGRlICR7ZXNjYXBlSHRtbChkYXRhLnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgIDogYDxpIGNsYXNzPVwiZmFzIGZhLXVzZXItY2lyY2xlXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPmA7XHJcblxyXG4gICAgICAgIGxldCBodG1sID0gYFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faWRlbnRpdHlcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hdmF0YXJcIj4ke2F2YXRhckh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fdXNlcm5hbWVcIj4ke2VzY2FwZUh0bWwoZGF0YS51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5tb3R0byA/IGA8c3BhbiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX21vdHRvXCI+XFx1MDBhYiAke2VzY2FwZUh0bWwoZGF0YS5tb3R0byl9IFxcdTAwYmI8L3NwYW4+YCA6ICcnfVxyXG4gICAgICAgICAgICAgICAgICAgICR7ZGF0YS5iaW8gPyBgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19iaW9cIj4ke2VzY2FwZUh0bWwoZGF0YS5iaW8pfTwvcD5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3RhdHNcIj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEucmF0aW5nKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPk1NUjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy53aW5zKSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPlZpY3RvaXJlczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy5sb3NzZXMpKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+RFxcdTAwZTlmYWl0ZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuc3RhdHMud2luUmF0ZSkpfSU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+V2luIFJhdGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXN0YXJcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IENoYW1waW9uIEZhdm9yaVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19uYW1lXCI+JHtlc2NhcGVIdG1sKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIubmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX3JvbGVcIj4ke2VzY2FwZUh0bWwoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5yb2xlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fY291bnRcIj4ke2VzY2FwZUh0bWwoU3RyaW5nKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIuZ2FtZXNQbGF5ZWQpKX0gcGFydGllczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEubGFzdFRlYW0ubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdXNlcnNcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IERlcm5pXFx1MDBlOHJlIFxcdTAwYzlxdWlwZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5sYXN0VGVhbS5tYXAoYyA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX21lbWJlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX25hbWVcIj4ke2VzY2FwZUh0bWwoYy5uYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fcm9sZVwiPiR7ZXNjYXBlSHRtbChjLnJvbGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgKS5qb2luKCcnKX1cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGRhdGEucmVjZW50QmF0dGxlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1zaGllbGQtYWx0XCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBIaXN0b3JpcXVlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ZGF0YS5yZWNlbnRCYXR0bGVzLm1hcChiID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvYXJlbmEvcmVwbGF5LyR7cGFyc2VJbnQoYi5pZCwgMTApfVwiIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19lbnRyeSAke3Jlc3VsdENsYXNzKGIucmVzdWx0KX1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fcmVzdWx0XCI+JHtyZXN1bHRMYWJlbChiLnJlc3VsdCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19vcHBvbmVudFwiPnZzICR7ZXNjYXBlSHRtbChiLm9wcG9uZW50KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX3R5cGVcIj4ke2VzY2FwZUh0bWwoYi5tYXRjaFR5cGUpLnRvVXBwZXJDYXNlKCl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19kYXRlXCI+JHtlc2NhcGVIdG1sKGIuZGF0ZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsYXkgcHJvZmlsZS1oaXN0b3J5X19yZXBsYXlcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZW1wdHlcIj5BdWN1biBjb21iYXQgZW5yZWdpc3RyXFx1MDBlOTwvcD5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICA8YSBocmVmPVwiL3Byb2ZpbGVcIiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2VkaXQtbGlua1wiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBlblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gXFx1MDBjOWRpdGVyIGxlIHByb2ZpbFxyXG4gICAgICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBjb250ZW50LmlubmVySFRNTCA9IGh0bWw7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuIiwiLyoqXHJcbiAqIENvbWJhdCBBbmltYXRpb24gQ29udHJvbGxlclxyXG4gKiBHw6hyZSBsJ2FmZmljaGFnZSBwcm9ncmVzc2lmIGRlcyBsb2dzIGRlIGNvbWJhdCBhdmVjIGFuaW1hdGlvbnNcclxuICovXHJcbmNsYXNzIENvbWJhdENvbnRyb2xsZXIge1xyXG4gICAgY29uc3RydWN0b3IoY29udGFpbmVyKSB7XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIgPSBjb250YWluZXI7XHJcbiAgICAgICAgdGhpcy5sb2dzID0gW107XHJcbiAgICAgICAgdGhpcy5jdXJyZW50SW5kZXggPSAwO1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMuc3BlZWQgPSAxO1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyRWxlbWVudHMgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlck1heEhQID0ge307XHJcblxyXG4gICAgICAgIHRoaXMuaW5pdCgpO1xyXG4gICAgfVxyXG5cclxuICAgIGluaXQoKSB7XHJcbiAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGVzIGxvZ3MgZGVwdWlzIGwnYXR0cmlidXQgZGF0YVxyXG4gICAgICAgIGNvbnN0IGxvZ3NEYXRhID0gdGhpcy5jb250YWluZXIuZGF0YXNldC5jb21iYXRMb2dzO1xyXG4gICAgICAgIGlmIChsb2dzRGF0YSkge1xyXG4gICAgICAgICAgICB0cnkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2dzID0gSlNPTi5wYXJzZShsb2dzRGF0YSk7XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ0VycmV1ciBwYXJzaW5nIGxvZ3M6JywgZSk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFLDqWN1cMOpcmVyIGxlcyDDqWzDqW1lbnRzXHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtbG9nXScpO1xyXG4gICAgICAgIHRoaXMub3ZlcmxheSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1vdmVybGF5XScpO1xyXG4gICAgICAgIHRoaXMucGxheUJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1wbGF5XScpO1xyXG4gICAgICAgIHRoaXMuc2tpcEJ0biA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1za2lwXScpO1xyXG4gICAgICAgIHRoaXMuc3BlZWRCdG5zID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY29tYmF0LXNwZWVkXScpO1xyXG5cclxuICAgICAgICAvLyBNYXAgZGVzIHBlcnNvbm5hZ2VzIGF2ZWMgc3RvY2thZ2UgZGVzIEhQIG1heCBpbml0aWF1eFxyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFAgPSB7fTtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jaGFyYWN0ZXItbmFtZV0nKS5mb3JFYWNoKGVsID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsLmRhdGFzZXQuY2hhcmFjdGVyTmFtZTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbSA9IGVsLmRhdGFzZXQuY2hhcmFjdGVyVGVhbTtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7dGVhbX0tJHtuYW1lfWA7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyRWxlbWVudHNba2V5XSA9IGVsO1xyXG5cclxuICAgICAgICAgICAgLy8gRXh0cmFpcmUgbGUgSFAgbWF4IGRlcHVpcyBsZSB0ZXh0ZSBpbml0aWFsXHJcbiAgICAgICAgICAgIGNvbnN0IGhwVGV4dCA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcbiAgICAgICAgICAgIGlmIChocFRleHQpIHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IG1hdGNoID0gaHBUZXh0LnRleHRDb250ZW50Lm1hdGNoKC8oXFxkKylcXC8oXFxkKykvKTtcclxuICAgICAgICAgICAgICAgIGlmIChtYXRjaCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFBba2V5XSA9IHBhcnNlSW50KG1hdGNoWzJdKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBDYWNoZXIgbCdvdmVybGF5XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLm9wYWNpdHkgPSAnMCc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBWaWRlciBsZSBsb2dcclxuICAgICAgICBpZiAodGhpcy5sb2dDb250YWluZXIpIHtcclxuICAgICAgICAgICAgdGhpcy5sb2dDb250YWluZXIuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBFdmVudCBsaXN0ZW5lcnNcclxuICAgICAgICB0aGlzLmJpbmRFdmVudHMoKTtcclxuXHJcbiAgICAgICAgLy8gTGFuY2VyIGF1dG9tYXRpcXVlbWVudCBhcHLDqHMgdW4gZMOpbGFpXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnBsYXkoKSwgODAwKTtcclxuICAgIH1cclxuXHJcbiAgICBiaW5kRXZlbnRzKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnBsYXlCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy50b2dnbGVQbGF5KCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRoaXMuc2tpcEJ0bikge1xyXG4gICAgICAgICAgICB0aGlzLnNraXBCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB0aGlzLnNraXAoKSk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNwZWVkQnRucy5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB0aGlzLnNldFNwZWVkKGUpKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBwbGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUGxheWluZyAmJiAhdGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICB0aGlzLmlzUGxheWluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc05leHRMb2coKTtcclxuICAgIH1cclxuXHJcbiAgICBwYXVzZSgpIHtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGVQbGF5KCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcgfHwgdGhpcy5pc1BhdXNlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXkoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBhdXNlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHNraXAoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcblxyXG4gICAgICAgIC8vIEFmZmljaGVyIHRvdXMgbGVzIGxvZ3MgcmVzdGFudHNcclxuICAgICAgICB3aGlsZSAodGhpcy5jdXJyZW50SW5kZXggPCB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGxvZyA9IHRoaXMubG9nc1t0aGlzLmN1cnJlbnRJbmRleF07XHJcbiAgICAgICAgICAgIHRoaXMuZGlzcGxheUxvZyhsb2cpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKTtcclxuICAgICAgICAgICAgaWYgKGxvZy50eXBlID09PSAnZGVhdGgnKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWF0aChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50SW5kZXgrKztcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIHRoaXMuc2hvd1ZpY3RvcnlPdmVybGF5KCk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgc2V0U3BlZWQoZXZlbnQpIHtcclxuICAgICAgICBjb25zdCBzcGVlZCA9IHBhcnNlRmxvYXQoZXZlbnQuY3VycmVudFRhcmdldC5kYXRhc2V0LmNvbWJhdFNwZWVkKTtcclxuICAgICAgICB0aGlzLnNwZWVkID0gc3BlZWQ7XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIGwnVUlcclxuICAgICAgICB0aGlzLnNwZWVkQnRucy5mb3JFYWNoKGJ0biA9PiBidG4uY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgIGV2ZW50LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJyk7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc05leHRMb2coKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzUGxheWluZyB8fCB0aGlzLmlzUGF1c2VkKSByZXR1cm47XHJcblxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc2hvd1ZpY3RvcnlPdmVybGF5KCk7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBsb2cgPSB0aGlzLmxvZ3NbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc0xvZyhsb2cpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcblxyXG4gICAgICAgIC8vIENhbGN1bGVyIGxlIGTDqWxhaVxyXG4gICAgICAgIGxldCBkZWxheSA9IHRoaXMuZ2V0RGVsYXlGb3JMb2cobG9nKTtcclxuICAgICAgICBkZWxheSA9IGRlbGF5IC8gdGhpcy5zcGVlZDtcclxuXHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnByb2Nlc3NOZXh0TG9nKCksIGRlbGF5KTtcclxuICAgIH1cclxuXHJcbiAgICBnZXREZWxheUZvckxvZyhsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JvdW5kJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2luaXRpYXRpdmUnOiByZXR1cm4gNDAwO1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6IHJldHVybiAxODAwO1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOiByZXR1cm4gMTIwMDtcclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdCc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICd2aWN0b3J5JzpcclxuICAgICAgICAgICAgY2FzZSAnZHJhdyc6IHJldHVybiAxMDAwO1xyXG4gICAgICAgICAgICAvLyBOb3V2ZWF1eCB0eXBlc1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzogcmV0dXJuIDgwMDtcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOiByZXR1cm4gODAwO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVubmVkX3NraXAnOiByZXR1cm4gMTAwMDtcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6IHJldHVybiAxMjAwO1xyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6IHJldHVybiB0aGlzLmdldEFiaWxpdHlEZWxheShsb2cpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gODAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBYmlsaXR5RGVsYXkobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cuc3VidHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfYXR0YWNrJzpcclxuICAgICAgICAgICAgY2FzZSAnYmFja2xpbmVfc3RyaWtlJzpcclxuICAgICAgICAgICAgY2FzZSAnYXJtb3JfcGllcmNlJzpcclxuICAgICAgICAgICAgY2FzZSAnYm9udXNfdnNfbWFya2VkJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3N0dW4nOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgY2FzZSAnbWFyayc6IHJldHVybiAxMjAwO1xyXG4gICAgICAgICAgICBjYXNlICdyaXBvc3RlX2J1ZmYnOlxyXG4gICAgICAgICAgICBjYXNlICdzZWxmX2J1ZmYnOlxyXG4gICAgICAgICAgICBjYXNlICdzdGVhbHRoJzogcmV0dXJuIDEyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2hlYWwnOiByZXR1cm4gMTgwMDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfYnVmZic6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdlbWVyZ2VuY3lfaGVhbCc6IHJldHVybiAxODAwO1xyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0X2RvZGdlJzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3RyYW5zZm9ybV9kYW1hZ2UnOiByZXR1cm4gODAwO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMTIwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc0xvZyhsb2cpIHtcclxuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24obG9nKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlMb2cobG9nKTtcclxuXHJcbiAgICAgICAgLy8gU3luY2hyb25pc2VyIGxhIG1pc2Ugw6Agam91ciBkZXMgSFAgYXZlYyBsJ2FuaW1hdGlvblxyXG4gICAgICAgIGNvbnN0IGhwRGVsYXkgPSB0aGlzLmdldEhQVXBkYXRlRGVsYXkobG9nKTtcclxuICAgICAgICBpZiAoaHBEZWxheSA+IDApIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKSwgaHBEZWxheSAvIHRoaXMuc3BlZWQpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRIUFVwZGF0ZURlbGF5KGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6IHJldHVybiA0MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzogcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOiByZXR1cm4gMjAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYWN0aXZhdGUnOiByZXR1cm4gMzUwO1xyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6IHJldHVybiB0aGlzLmdldEFiaWxpdHlIUERlbGF5KGxvZyk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBYmlsaXR5SFBEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfaGVhbCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzogcmV0dXJuIDQwMDtcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QW5pbWF0aW9uKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuYXR0YWNrZXIsIGxvZy5hdHRhY2tlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cuaXNDcml0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmhlYWxlciwgbG9nLmhlYWxlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVmZW5kKGxvZy5kZWZlbmRlciwgbG9nLmRlZmVuZGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9kZ2UobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBOb3V2ZWF1eCB0eXBlc1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVubmVkX3NraXAnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3R1bm5lZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmF0dGFja2VyLCBsb2cuYXR0YWNrZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheUFiaWxpdHlBbmltYXRpb24obG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gTk9VVkVMTEVTIEFOSU1BVElPTlMgPT09XHJcblxyXG4gICAgYW5pbWF0ZURvVCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtLCBkb3RDbGFzcykge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKGRvdENsYXNzKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShkb3RDbGFzcyksIDYwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVTdHVubmVkKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnc3R1bm5lZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdzdHVubmVkJyksIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVNYXJrZWQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdtYXJrZWQnKTtcclxuICAgICAgICAgICAgLy8gTGEgbWFycXVlIHJlc3RlIHZpc2libGUgcGx1cyBsb25ndGVtcHNcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnbWFya2VkJyksIDIwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlQnVmZih0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2J1ZmZlZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdidWZmZWQnKSwgODAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVN0ZWFsdGgodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzdGVhbHRoZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc3RlYWx0aGVkJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QWJpbGl0eUFuaW1hdGlvbihsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJyksIDQwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsaWdodGVkJyksIDQwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZVN0dW5uZWQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pLCA0MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcmsnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHRoaXMuYW5pbWF0ZU1hcmtlZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWxmX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVIZWFsKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWVyIHRvdXMgbGVzIGFsbGnDqXMgc29pZ27DqXNcclxuICAgICAgICAgICAgICAgICAgICBpZiAobG9nLmhlYWxlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBsb2cuaGVhbGVkLmZvckVhY2goaCA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zdCBlbCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChoLm5hbWUsIGgudGVhbSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdoZWFsZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hlYWxlZCcpLCA4MDApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfYnVmZic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICAvLyBBbmltZXIgdG91cyBsZXMgYWxsacOpcyBkdSBtw6ptZSBjw7R0w6lcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVRlYW1CdWZmKGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdGVhbHRoJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB0aGlzLmFuaW1hdGVTdGVhbHRoKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy5pc0NyaXQgfHwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3RfZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZURlZmVuZChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnKSwgNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVRlYW1CdWZmKGNhc3RlclRlYW0pIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmNoYXJhY3RlckVsZW1lbnRzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChjYXN0ZXJUZWFtKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdidWZmZWQnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnYnVmZmVkJyksIDgwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gQU5JTUFUSU9OUyBFWElTVEFOVEVTID09PVxyXG5cclxuICAgIGFuaW1hdGVBdHRhY2soYXR0YWNrZXJOYW1lLCBhdHRhY2tlclRlYW0sIHRhcmdldE5hbWUsIHRhcmdldFRlYW0sIGlzQ3JpdCkge1xyXG4gICAgICAgIGNvbnN0IGF0dGFja2VyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGF0dGFja2VyTmFtZSwgYXR0YWNrZXJUZWFtKTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcblxyXG4gICAgICAgIGlmIChhdHRhY2tlcikge1xyXG4gICAgICAgICAgICBhdHRhY2tlci5jbGFzc0xpc3QuYWRkKCdhdHRhY2tpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBhdHRhY2tlci5jbGFzc0xpc3QucmVtb3ZlKCdhdHRhY2tpbmcnKSwgNjAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ3JpdCkgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NyaXQnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnLCAnY3JpdCcpLCA0MDApO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlSGVhbChoZWFsZXJOYW1lLCBoZWFsZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgaGVhbGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGhlYWxlck5hbWUsIGhlYWxlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGhlYWxlcikge1xyXG4gICAgICAgICAgICBoZWFsZXIuY2xhc3NMaXN0LmFkZCgnaGVhbGluZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGhlYWxlci5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsaW5nJyksIDgwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdoZWFsZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaGVhbGVkJyksIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEZWZlbmQoZGVmZW5kZXJOYW1lLCBkZWZlbmRlclRlYW0pIHtcclxuICAgICAgICBjb25zdCBkZWZlbmRlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChkZWZlbmRlck5hbWUsIGRlZmVuZGVyVGVhbSk7XHJcbiAgICAgICAgaWYgKGRlZmVuZGVyKSB7XHJcbiAgICAgICAgICAgIGRlZmVuZGVyLmNsYXNzTGlzdC5hZGQoJ2RlZmVuZGluZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGRlZmVuZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlZmVuZGluZycpLCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURvZGdlKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZG9kZ2luZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkb2RnaW5nJyksIDYwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEZWF0aCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RlYWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hhcmFjdGVyRWxlbWVudChuYW1lLCB0ZWFtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcmFjdGVyRWxlbWVudHNbYCR7dGVhbX0tJHtuYW1lfWBdO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlMb2cobG9nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvZ0NvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBlbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBlbnRyeS5jbGFzc05hbWUgPSAnY29tYmF0LWxvZ19fZW50cnknO1xyXG5cclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdyb3VuZCcpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXJvdW5kJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3ZpY3RvcnknKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS12aWN0b3J5Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2RyYXcnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1kZWZlYXQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYWJpbGl0eV91c2UnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1hYmlsaXR5Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsZWVkX3RpY2snKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1ibGVlZCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdibGlnaHRfdGljaycpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLWJsaWdodCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdzdHVubmVkX3NraXAnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1zdHVuJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3JpcG9zdGVfYWN0aXZhdGUnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1yaXBvc3RlJyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBlbnRyeS5pbm5lckhUTUwgPSBsb2cubWVzc2FnZTtcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5hcHBlbmRDaGlsZChlbnRyeSk7XHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsVG9wID0gdGhpcy5sb2dDb250YWluZXIuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUhlYWx0aEJhcnMobG9nKSB7XHJcbiAgICAgICAgbGV0IGNoYXJhY3Rlck5hbWUgPSBudWxsO1xyXG4gICAgICAgIGxldCB0ZWFtTmFtZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IGN1cnJlbnRIUCA9IG51bGw7XHJcbiAgICAgICAgbGV0IG1heEhQID0gbnVsbDtcclxuXHJcbiAgICAgICAgLy8gRMOpdGVybWluZXIgbGVzIGRvbm7DqWVzIHNlbG9uIGxlIHR5cGUgZGUgbG9nXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAnYXR0YWNrJyB8fCBsb2cudHlwZSA9PT0gJ3JpcG9zdGVfYWN0aXZhdGUnKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdoZWFsJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYmxlZWRfdGljaycgfHwgbG9nLnR5cGUgPT09ICdibGlnaHRfdGljaycpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2FiaWxpdHlfdXNlJykge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSDDoCBqb3VyIHNpIG5vdXMgYXZvbnMgbGVzIGRvbm7DqWVzIG7DqWNlc3NhaXJlc1xyXG4gICAgICAgIGlmIChjaGFyYWN0ZXJOYW1lICYmIHRlYW1OYW1lICYmIGN1cnJlbnRIUCAhPT0gbnVsbCAmJiBjdXJyZW50SFAgIT09IHVuZGVmaW5lZCAmJiBtYXhIUCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsIG1heEhQKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQWJpbGl0eUhlYWx0aEJhcnMobG9nKSB7XHJcbiAgICAgICAgLy8gQ29tcMOpdGVuY2VzIHF1aSBpbmZsaWdlbnQgZGVzIGTDqWfDonRzIMOgIHVuZSBjaWJsZVxyXG4gICAgICAgIGlmIChsb2cudGFyZ2V0ICYmIGxvZy50YXJnZXRIUCAhPT0gdW5kZWZpbmVkICYmIGxvZy50YXJnZXRNYXhIUCkge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUNoYXJhY3RlckhQKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cudGFyZ2V0SFAsIGxvZy50YXJnZXRNYXhIUCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTb2luIGRlIGdyb3VwZSA6IG1ldHRyZSDDoCBqb3VyIGNoYXF1ZSBhbGxpw6kgc29pZ27DqVxyXG4gICAgICAgIGlmIChsb2cuc3VidHlwZSA9PT0gJ3BhcnR5X2hlYWwnICYmIGxvZy5oZWFsZWQpIHtcclxuICAgICAgICAgICAgbG9nLmhlYWxlZC5mb3JFYWNoKGggPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChoLm5hbWUsIGgudGVhbSwgaC5ocCwgaC5tYXhIcCk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU29pbiBkJ3VyZ2VuY2UgOiBtZXR0cmUgw6Agam91ciBsZSBsYW5jZXVyXHJcbiAgICAgICAgaWYgKGxvZy5zdWJ0eXBlID09PSAnZW1lcmdlbmN5X2hlYWwnICYmIGxvZy5jYXN0ZXIpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldEhQLCBsb2cudGFyZ2V0TWF4SFApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVDaGFyYWN0ZXJIUChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCBtYXhIUCkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSk7XHJcblxyXG4gICAgICAgIGlmICghdGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGNvbnN0IHBlcmNlbnQgPSBtYXhIUCA+IDAgPyAoY3VycmVudEhQIC8gbWF4SFApICogMTAwIDogMDtcclxuXHJcbiAgICAgICAgLy8gTWlzZSDDoCBqb3VyIGRlIGxhIGJhcnJlIEhQIGRhbnMgbGEgem9uZSBkZSBjb21iYXQgKGJhdHRsZS1zdGFnZSlcclxuICAgICAgICBjb25zdCBocEJhciA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuaHAtYmFyX19maWxsJyk7XHJcbiAgICAgICAgY29uc3QgaHBUZXh0ID0gdGFyZ2V0LnF1ZXJ5U2VsZWN0b3IoJy5ocC10ZXh0Jyk7XHJcblxyXG4gICAgICAgIGlmIChocEJhcikge1xyXG4gICAgICAgICAgICAvLyBBbmltYXRpb24gZmx1aWRlIGRlIGxhIGJhcnJlXHJcbiAgICAgICAgICAgIGhwQmFyLnN0eWxlLnRyYW5zaXRpb24gPSBgd2lkdGggMC4zcyBlYXNlLW91dGA7XHJcbiAgICAgICAgICAgIGhwQmFyLnN0eWxlLndpZHRoID0gYCR7cGVyY2VudH0lYDtcclxuXHJcbiAgICAgICAgICAgIC8vIENsYXNzZXMgZGUgY291bGV1ciBzZWxvbiBsZSBwb3VyY2VudGFnZVxyXG4gICAgICAgICAgICBocEJhci5jbGFzc0xpc3QucmVtb3ZlKCdocC1iYXJfX2ZpbGwtLWxvdycsICdocC1iYXJfX2ZpbGwtLWNyaXRpY2FsJyk7XHJcbiAgICAgICAgICAgIGlmIChwZXJjZW50IDw9IDI1KSB7XHJcbiAgICAgICAgICAgICAgICBocEJhci5jbGFzc0xpc3QuYWRkKCdocC1iYXJfX2ZpbGwtLWNyaXRpY2FsJyk7XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAocGVyY2VudCA8PSA1MCkge1xyXG4gICAgICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LmFkZCgnaHAtYmFyX19maWxsLS1sb3cnKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKGhwVGV4dCkge1xyXG4gICAgICAgICAgICBocFRleHQudGV4dENvbnRlbnQgPSBgJHtjdXJyZW50SFB9LyR7bWF4SFB9YDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1pc2Ugw6Agam91ciBkZXMgcGFubmVhdXggZCdpbmZvIGxhdMOpcmF1eFxyXG4gICAgICAgIHRoaXMudXBkYXRlSW5mb1BhbmVsKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFApO1xyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUluZm9QYW5lbChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQKSB7XHJcbiAgICAgICAgLy8gVHJvdXZlciBsZSBib24gcGFubmVhdSBzZWxvbiBsJ8OpcXVpcGVcclxuICAgICAgICBjb25zdCBwYW5lbENsYXNzID0gdGVhbU5hbWUgPT09ICdFcXVpcGUgMScgPyAnLmluZm8tcGFuZWwtLXRlYW0xJyA6ICcuaW5mby1wYW5lbC0tdGVhbTInO1xyXG4gICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcihwYW5lbENsYXNzKTtcclxuXHJcbiAgICAgICAgaWYgKCFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAvLyBUcm91dmVyIGxlIHBlcnNvbm5hZ2UgZGFucyBsZSBwYW5uZWF1IHBhciBzb24gbm9tXHJcbiAgICAgICAgY29uc3QgY2hhcmFjdGVySW5mb3MgPSBwYW5lbC5xdWVyeVNlbGVjdG9yQWxsKCcuY2hhcmFjdGVyLWluZm8nKTtcclxuICAgICAgICBmb3IgKGNvbnN0IGluZm8gb2YgY2hhcmFjdGVySW5mb3MpIHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZUVsID0gaW5mby5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX25hbWUnKTtcclxuICAgICAgICAgICAgaWYgKG5hbWVFbCAmJiBuYW1lRWwudGV4dENvbnRlbnQudHJpbSgpID09PSBjaGFyYWN0ZXJOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBzdGF0c1NwYW4gPSBpbmZvLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItaW5mb19fc3RhdHMgc3BhbicpO1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXRzU3Bhbikge1xyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzU3Bhbi50ZXh0Q29udGVudCA9IGN1cnJlbnRIUDtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGZsYXNoIHBvdXIgbW9udHJlciBsZSBjaGFuZ2VtZW50XHJcbiAgICAgICAgICAgICAgICAgICAgc3RhdHNTcGFuLmNsYXNzTGlzdC5hZGQoJ2hwLXVwZGF0ZWQnKTtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHN0YXRzU3Bhbi5jbGFzc0xpc3QucmVtb3ZlKCdocC11cGRhdGVkJyksIDMwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBzaG93VmljdG9yeU92ZXJsYXkoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMub3ZlcmxheSkge1xyXG4gICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm92ZXJsYXkuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgfSwgNTApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRmluYWxpc2VyIGxlIE1NUiBhIGxhIGZpbiBkdSBjb21iYXRcclxuICAgICAgICB0aGlzLmZpbmFsaXplUmF0aW5nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZmluYWxpemVSYXRpbmcoKSB7XHJcbiAgICAgICAgY29uc3QgZmluYWxpemVVcmwgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmZpbmFsaXplVXJsO1xyXG4gICAgICAgIGlmICghZmluYWxpemVVcmwpIHJldHVybjtcclxuXHJcbiAgICAgICAgZmV0Y2goZmluYWxpemVVcmwsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH0sXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyAmJiBkYXRhLnJhdGluZ0NoYW5nZSAhPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG93UmF0aW5nVXBkYXRlKGRhdGEucmF0aW5nQ2hhbmdlLCBkYXRhLm5ld1JhdGluZywgZGF0YS5uZXdSYXRpbmcyKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKGVyciA9PiBjb25zb2xlLmVycm9yKCdFcnJldXIgZmluYWxpc2F0aW9uIHJhdGluZzonLCBlcnIpKTtcclxuICAgIH1cclxuXHJcbiAgICBzaG93UmF0aW5nVXBkYXRlKGNoYW5nZSwgbmV3UmF0aW5nLCBuZXdSYXRpbmcyKSB7XHJcbiAgICAgICAgLy8gTWV0dHJlIGEgam91ciBsZSBNTVIgYWZmaWNoZSBkYW5zIGxlIHBhbm5lYXUgam91ZXVyIChFcXVpcGUgMSlcclxuICAgICAgICBjb25zdCByYXRpbmdFbCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXBhbmVsLS10ZWFtMSAuaW5mby1wYW5lbF9fcmF0aW5nJyk7XHJcbiAgICAgICAgaWYgKHJhdGluZ0VsICYmIG5ld1JhdGluZyAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByYXRpbmdFbC5pbm5lckhUTUwgPSBgPGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke25ld1JhdGluZ30gTU1SYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIE1ldHRyZSBhIGpvdXIgbGUgTU1SIGFmZmljaGUgZGFucyBsZSBwYW5uZWF1IGFkdmVyc2FpcmUgKEVxdWlwZSAyKVxyXG4gICAgICAgIGNvbnN0IHJhdGluZ0VsMiA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJy5pbmZvLXBhbmVsLS10ZWFtMiAuaW5mby1wYW5lbF9fcmF0aW5nLS1lbmVteScpO1xyXG4gICAgICAgIGlmIChyYXRpbmdFbDIgJiYgbmV3UmF0aW5nMiAhPT0gbnVsbCkge1xyXG4gICAgICAgICAgICByYXRpbmdFbDIuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHtuZXdSYXRpbmcyfSBNTVJgO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gQWZmaWNoZXIgbGEgbm90aWZpY2F0aW9uIGRlIGNoYW5nZW1lbnQgZGFucyBsJ292ZXJsYXlcclxuICAgICAgICBjb25zdCBvdmVybGF5ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LW92ZXJsYXldJyk7XHJcbiAgICAgICAgaWYgKG92ZXJsYXkpIHtcclxuICAgICAgICAgICAgY29uc3Qgd2lubmVyRGl2ID0gb3ZlcmxheS5xdWVyeVNlbGVjdG9yKCcuYmF0dGxlLXN0YWdlX193aW5uZXInKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoYW5nZW1lbnQgTU1SIEVxdWlwZSAxXHJcbiAgICAgICAgICAgIGNvbnN0IG5vdGlmMSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBub3RpZjEuY2xhc3NOYW1lID0gJ3JhdGluZy1jaGFuZ2UnO1xyXG4gICAgICAgICAgICBub3RpZjEuc3R5bGUuY3NzVGV4dCA9ICdmb250LXNpemU6MS4ycmVtO21hcmdpbi10b3A6MTJweDtmb250LXdlaWdodDpib2xkO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgMC41czsnO1xyXG4gICAgICAgICAgICBub3RpZjEudGV4dENvbnRlbnQgPSBjaGFuZ2UgPiAwID8gYEVxdWlwZSAxIDogKyR7Y2hhbmdlfSBNTVJgIDogYEVxdWlwZSAxIDogJHtjaGFuZ2V9IE1NUmA7XHJcbiAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5jb2xvciA9IGNoYW5nZSA+IDAgPyAnIzRjYWY1MCcgOiAnI2Y0NDMzNic7XHJcbiAgICAgICAgICAgIHdpbm5lckRpdi5hcHBlbmRDaGlsZChub3RpZjEpO1xyXG5cclxuICAgICAgICAgICAgLy8gQ2hhbmdlbWVudCBNTVIgRXF1aXBlIDIgKGludmVyc2UpXHJcbiAgICAgICAgICAgIGNvbnN0IGNoYW5nZTIgPSAtY2hhbmdlO1xyXG4gICAgICAgICAgICBjb25zdCBub3RpZjIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbm90aWYyLmNsYXNzTmFtZSA9ICdyYXRpbmctY2hhbmdlJztcclxuICAgICAgICAgICAgbm90aWYyLnN0eWxlLmNzc1RleHQgPSAnZm9udC1zaXplOjEuMnJlbTttYXJnaW4tdG9wOjZweDtmb250LXdlaWdodDpib2xkO29wYWNpdHk6MDt0cmFuc2l0aW9uOm9wYWNpdHkgMC41czsnO1xyXG4gICAgICAgICAgICBub3RpZjIudGV4dENvbnRlbnQgPSBjaGFuZ2UyID4gMCA/IGBFcXVpcGUgMiA6ICske2NoYW5nZTJ9IE1NUmAgOiBgRXF1aXBlIDIgOiAke2NoYW5nZTJ9IE1NUmA7XHJcbiAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5jb2xvciA9IGNoYW5nZTIgPiAwID8gJyM0Y2FmNTAnIDogJyNmNDQzMzYnO1xyXG4gICAgICAgICAgICB3aW5uZXJEaXYuYXBwZW5kQ2hpbGQobm90aWYyKTtcclxuXHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgbm90aWYxLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgICAgICBub3RpZjIuc3R5bGUub3BhY2l0eSA9ICcxJztcclxuICAgICAgICAgICAgfSwgMTAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUGxheUJ1dHRvbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheUJ0bikgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcgJiYgIXRoaXMuaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gJ1BhdXNlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gJ1Rlcm1pbsOpJztcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSB0aGlzLmN1cnJlbnRJbmRleCA+IDAgPyAnUmVwcmVuZHJlJyA6ICdMYW5jZXInO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gSW5pdGlhbGlzZXIgcXVhbmQgbGUgRE9NIGVzdCBwcsOqdFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgY29tYmF0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LWxvZ3NdJyk7XHJcbiAgICBpZiAoY29tYmF0Q29udGFpbmVyKSB7XHJcbiAgICAgICAgbmV3IENvbWJhdENvbnRyb2xsZXIoY29tYmF0Q29udGFpbmVyKTtcclxuICAgIH1cclxufSk7XHJcblxyXG5leHBvcnQgZGVmYXVsdCBDb21iYXRDb250cm9sbGVyO1xyXG4iLCIvKiA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBGUklFTkQgU1lTVEVNXHJcbj09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcblxyXG5mdW5jdGlvbiBlc2NhcGVIdG1sKHN0cikge1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYudGV4dENvbnRlbnQgPSBzdHI7XHJcbiAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtdG9nZ2xlXScpO1xyXG4gICAgY29uc3QgcGFuZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXBhbmVsXScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWJhY2tkcm9wXScpO1xyXG4gICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWNsb3NlXScpO1xyXG4gICAgY29uc3QgYmFkZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLWJhZGdlXScpO1xyXG5cclxuICAgIGlmICghdG9nZ2xlIHx8ICFwYW5lbCkgcmV0dXJuO1xyXG5cclxuICAgIGxldCBwYW5lbE9wZW4gPSBmYWxzZTtcclxuICAgIGxldCBjdXJyZW50VGFiID0gJ2ZyaWVuZHMnO1xyXG4gICAgbGV0IGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSBudWxsO1xyXG4gICAgbGV0IGxhc3RNZXNzYWdlSWQgPSAwO1xyXG4gICAgbGV0IG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgbGV0IHVucmVhZFBvbGxpbmdJbnRlcnZhbCA9IG51bGw7XHJcbiAgICBsZXQgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgbGV0IHJlcXVlc3RzTG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBQQU5FTCBPUEVOL0NMT1NFXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIG9wZW5QYW5lbCgpIHtcclxuICAgICAgICBwYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHBhbmVsLm9mZnNldEhlaWdodDsgLy8gcmVmbG93XHJcbiAgICAgICAgcGFuZWwuY2xhc3NMaXN0LmFkZCgnZnJpZW5kcy1wYW5lbC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ2ZyaWVuZHMtcGFuZWxfX2JhY2tkcm9wLS1vcGVuJyk7XHJcbiAgICAgICAgcGFuZWxPcGVuID0gdHJ1ZTtcclxuXHJcbiAgICAgICAgaWYgKCFmcmllbmRzTG9hZGVkKSB7XHJcbiAgICAgICAgICAgIGxvYWRGcmllbmRzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUGFuZWwoKSB7XHJcbiAgICAgICAgcGFuZWwuY2xhc3NMaXN0LnJlbW92ZSgnZnJpZW5kcy1wYW5lbC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ2ZyaWVuZHMtcGFuZWxfX2JhY2tkcm9wLS1vcGVuJyk7XHJcbiAgICAgICAgcGFuZWxPcGVuID0gZmFsc2U7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHBhbmVsLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiBwYW5lbE9wZW4gPyBjbG9zZVBhbmVsKCkgOiBvcGVuUGFuZWwoKSk7XHJcbiAgICBjbG9zZUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUGFuZWwpO1xyXG4gICAgYmFja2Ryb3AuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBhbmVsKTtcclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFRBQlNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtZnJpZW5kcy10YWJdJykuZm9yRWFjaCh0YWJCdG4gPT4ge1xyXG4gICAgICAgIHRhYkJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgdGFiTmFtZSA9IHRhYkJ0bi5kYXRhc2V0LmZyaWVuZHNUYWI7XHJcbiAgICAgICAgICAgIHN3aXRjaFRhYih0YWJOYW1lKTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIGZ1bmN0aW9uIHN3aXRjaFRhYih0YWJOYW1lKSB7XHJcbiAgICAgICAgY3VycmVudFRhYiA9IHRhYk5hbWU7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZyaWVuZHMtdGFiXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC50b2dnbGUoJ2ZyaWVuZHMtcGFuZWxfX3RhYi0tYWN0aXZlJywgYnRuLmRhdGFzZXQuZnJpZW5kc1RhYiA9PT0gdGFiTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXRhYi1jb250ZW50XScpLmZvckVhY2goY29udGVudCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRlbnQuc3R5bGUuZGlzcGxheSA9IGNvbnRlbnQuZGF0YXNldC50YWJDb250ZW50ID09PSB0YWJOYW1lID8gJ2Jsb2NrJyA6ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX3RhYnMnKS5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX19jb250ZW50Jykuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jb252ZXJzYXRpb25dJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuXHJcbiAgICAgICAgaWYgKHRhYk5hbWUgPT09ICdmcmllbmRzJyAmJiAhZnJpZW5kc0xvYWRlZCkgbG9hZEZyaWVuZHMoKTtcclxuICAgICAgICBpZiAodGFiTmFtZSA9PT0gJ3JlcXVlc3RzJyAmJiAhcmVxdWVzdHNMb2FkZWQpIGxvYWRSZXF1ZXN0cygpO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTE9BRCBGUklFTkRTIExJU1RcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gbG9hZEZyaWVuZHMoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtdGFiLWNvbnRlbnQ9XCJmcmllbmRzXCJdJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gQ2hhcmdlbWVudC4uLjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy9saXN0Jywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLmZyaWVuZHMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj48aSBjbGFzcz1cImZhcyBmYS1naG9zdFwiPjwvaT4gQXVjdW4gY29tcGFnbm9uLi4uIExlIGRvbmpvbiBlc3Qgc29saXRhaXJlLjwvcD4nO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gZGF0YS5mcmllbmRzLm1hcChmID0+IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiIGRhdGEtZnJpZW5kLXVzZXItaWQ9XCIke2YudXNlcklkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7Zi5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKGYucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwoZi51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKGYudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcHJldmlld1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgJHtmLmxhc3RNZXNzYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyAoZi5sYXN0TWVzc2FnZS5pc0Zyb21NZSA/ICdWb3VzOiAnIDogJycpICsgZXNjYXBlSHRtbChmLmxhc3RNZXNzYWdlLmNvbnRlbnQpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnQXVjdW4gbWVzc2FnZSd9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19yYXRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7Zi5yYXRpbmd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJy5mcmllbmQtaXRlbScpLmZvckVhY2goaXRlbSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IHVzZXJJZCA9IHBhcnNlSW50KGl0ZW0uZGF0YXNldC5mcmllbmRVc2VySWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBpdGVtLnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmQtaXRlbV9fbmFtZScpLnRleHRDb250ZW50O1xyXG4gICAgICAgICAgICAgICAgICAgIG9wZW5Db252ZXJzYXRpb24odXNlcklkLCBuYW1lKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkVycmV1ciBkZSBjaGFyZ2VtZW50PC9wPic7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBMT0FEIFBFTkRJTkcgUkVRVUVTVFNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gbG9hZFJlcXVlc3RzKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRhYi1jb250ZW50PVwicmVxdWVzdHNcIl0nKTtcclxuICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxkaXYgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19sb2FkaW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtc3Bpbm5lciBmYS1zcGluXCI+PC9pPiBDaGFyZ2VtZW50Li4uPC9kaXY+JztcclxuXHJcbiAgICAgICAgZmV0Y2goJy9mcmllbmRzL3BlbmRpbmcnLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICByZXF1ZXN0c0xvYWRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnJlcXVlc3RzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+QXVjdW5lIGRlbWFuZGUgZW4gYXR0ZW50ZTwvcD4nO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gZGF0YS5yZXF1ZXN0cy5tYXAociA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIiBkYXRhLXJlcXVlc3QtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICR7ci5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKHIucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwoci51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKHIudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcHJldmlld1wiPiR7ZXNjYXBlSHRtbChyLmRhdGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2FjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tYWNjZXB0XCIgZGF0YS1hY2NlcHQtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2tcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1yZWplY3RcIiBkYXRhLXJlamVjdC1pZD1cIiR7ci5mcmllbmRzaGlwSWR9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS10aW1lc1wiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYCkuam9pbignJyk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtYWNjZXB0LWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVSZXF1ZXN0KGJ0bi5kYXRhc2V0LmFjY2VwdElkLCAnYWNjZXB0Jyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcblxyXG4gICAgICAgICAgICBjb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtcmVqZWN0LWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgIGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIChlKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICBoYW5kbGVSZXF1ZXN0KGJ0bi5kYXRhc2V0LnJlamVjdElkLCAncmVqZWN0Jyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5FcnJldXIgZGUgY2hhcmdlbWVudDwvcD4nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGhhbmRsZVJlcXVlc3QoZnJpZW5kc2hpcElkLCBhY3Rpb24pIHtcclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvJHthY3Rpb259LyR7ZnJpZW5kc2hpcElkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBmcmllbmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICByZXF1ZXN0c0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgbG9hZFJlcXVlc3RzKCk7XHJcbiAgICAgICAgICAgICAgICBmZXRjaFVucmVhZENvdW50KCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFNFQVJDSCBVU0VSU1xyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBjb25zdCBzZWFyY2hJbnB1dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtc2VhcmNoLWlucHV0XScpO1xyXG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtc2VhcmNoLXJlc3VsdHNdJyk7XHJcbiAgICBsZXQgc2VhcmNoVGltZW91dCA9IG51bGw7XHJcblxyXG4gICAgaWYgKHNlYXJjaElucHV0KSB7XHJcbiAgICAgICAgc2VhcmNoSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignaW5wdXQnLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChzZWFyY2hUaW1lb3V0KTtcclxuICAgICAgICAgICAgY29uc3QgcXVlcnkgPSBzZWFyY2hJbnB1dC52YWx1ZS50cmltKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAocXVlcnkubGVuZ3RoIDwgMikge1xyXG4gICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgc2VhcmNoVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgZmV0Y2goYC9mcmllbmRzL3NlYXJjaD9xPSR7ZW5jb2RlVVJJQ29tcG9uZW50KHF1ZXJ5KX1gLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGRhdGEudXNlcnMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5BdWN1biBndWVycmllciB0cm91dmU8L3A+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5pbm5lckhUTUwgPSBkYXRhLnVzZXJzLm1hcCh1ID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbGV0IGFjdGlvbkh0bWwgPSAnJztcclxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAnYWNjZXB0ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+QW1pPC9zcGFuPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAodS5mcmllbmRTdGF0dXMgPT09ICdwZW5kaW5nX3NlbnQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+RW52b3llZTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAncGVuZGluZ19yZWNlaXZlZCcpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5SZWN1ZTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9IGA8YnV0dG9uIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1hZGRcIiBkYXRhLWFkZC1mcmllbmQtaWQ9XCIke3UudXNlcklkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXBsdXNcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hdmF0YXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgJHt1LnByb2ZpbGVJbWFnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2VzY2FwZUh0bWwodS5wcm9maWxlSW1hZ2UpfVwiIGFsdD1cIiR7ZXNjYXBlSHRtbCh1LnVzZXJuYW1lKX1cIj5gXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6ICc8aSBjbGFzcz1cImZhcyBmYS11c2VyXCI+PC9pPid9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX25hbWVcIj4ke2VzY2FwZUh0bWwodS51c2VybmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19yYXRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7dS5yYXRpbmd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYWN0aW9uc1wiPiR7YWN0aW9uSHRtbH08L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICAgICAgICAgIH0pLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFkZC1mcmllbmQtaWRdJykuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNlbmRGcmllbmRSZXF1ZXN0KGJ0bi5kYXRhc2V0LmFkZEZyaWVuZElkLCBidG4pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRGcmllbmRSZXF1ZXN0KHVzZXJJZCwgYnRuKSB7XHJcbiAgICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvcmVxdWVzdC8ke3VzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgYnRuLm91dGVySFRNTCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPkVudm95ZWU8L3NwYW4+JztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4geyBidG4uZGlzYWJsZWQgPSBmYWxzZTsgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVwb3J0TWVzc2FnZUFjdGlvbihtZXNzYWdlSWQsIGJ0bikge1xyXG4gICAgICAgIGNvbnN0IHJlYXNvbiA9IHByb21wdCgnUmFpc29uIGR1IHNpZ25hbGVtZW50IDonKTtcclxuICAgICAgICBpZiAocmVhc29uID09PSBudWxsKSByZXR1cm47IC8vIGNhbmNlbGxlZFxyXG5cclxuICAgICAgICBidG4uZGlzYWJsZWQgPSB0cnVlO1xyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke21lc3NhZ2VJZH0vcmVwb3J0YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IHJlYXNvbjogcmVhc29uIH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgYnRuLmlubmVySFRNTCA9ICc8aSBjbGFzcz1cImZhcyBmYS1jaGVja1wiPjwvaT4nO1xyXG4gICAgICAgICAgICAgICAgYnRuLmNsYXNzTGlzdC5hZGQoJ2NoYXQtbWVzc2FnZV9fcmVwb3J0LS1kb25lJyk7XHJcbiAgICAgICAgICAgICAgICBidG4udGl0bGUgPSAnU2lnbmFsZSc7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgYnRuLmRpc2FibGVkID0gZmFsc2U7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gQ09OVkVSU0FUSU9OXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIG9wZW5Db252ZXJzYXRpb24odXNlcklkLCB1c2VybmFtZSkge1xyXG4gICAgICAgIGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSB1c2VySWQ7XHJcbiAgICAgICAgbGFzdE1lc3NhZ2VJZCA9IDA7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX190YWJzJykuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fY29udGVudCcpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgY29uc3QgY29udkVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jb252ZXJzYXRpb25dJyk7XHJcbiAgICAgICAgY29udkVsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1uYW1lXScpLnRleHRDb250ZW50ID0gdXNlcm5hbWU7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1tZXNzYWdlc10nKTtcclxuICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gQ2hhcmdlbWVudC4uLjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke3VzZXJJZH1gLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhkYXRhLm1lc3NhZ2VzLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIHN0YXJ0TWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJNZXNzYWdlcyhtZXNzYWdlcywgYXBwZW5kKSB7XHJcbiAgICAgICAgY29uc3QgbWVzc2FnZXNFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1tZXNzYWdlc10nKTtcclxuXHJcbiAgICAgICAgaWYgKCFhcHBlbmQpIHtcclxuICAgICAgICAgICAgaWYgKG1lc3NhZ2VzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkRlYnV0IGRlIGxhIGNvbnZlcnNhdGlvbi4gRW52b3lleiBsZSBwcmVtaWVyIG1lc3NhZ2UhPC9wPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBtZXNzYWdlc0VsLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTaSBvbiBham91dGUgZGVzIG1lc3NhZ2VzIGV0IHF1ZSBsZSBjb250ZW5ldXIgYWZmaWNoZSBsZSBwbGFjZWhvbGRlciwgbGUgc3VwcHJpbWVyXHJcbiAgICAgICAgaWYgKGFwcGVuZCAmJiBtZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHBsYWNlaG9sZGVyID0gbWVzc2FnZXNFbC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fZW1wdHknKTtcclxuICAgICAgICAgICAgaWYgKHBsYWNlaG9sZGVyKSBwbGFjZWhvbGRlci5yZW1vdmUoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIG1lc3NhZ2VzLmZvckVhY2gobXNnID0+IHtcclxuICAgICAgICAgICAgaWYgKG1zZy5pZCA+IGxhc3RNZXNzYWdlSWQpIGxhc3RNZXNzYWdlSWQgPSBtc2cuaWQ7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgZGl2LmNsYXNzTGlzdC5hZGQoJ2NoYXQtbWVzc2FnZScsIG1zZy5pc0Zyb21NZSA/ICdjaGF0LW1lc3NhZ2UtLW1pbmUnIDogJ2NoYXQtbWVzc2FnZS0tdGhlaXJzJyk7XHJcblxyXG4gICAgICAgICAgICBsZXQgcmVwb3J0QnRuID0gJyc7XHJcbiAgICAgICAgICAgIGlmICghbXNnLmlzRnJvbU1lKSB7XHJcbiAgICAgICAgICAgICAgICByZXBvcnRCdG4gPSBgPGJ1dHRvbiBjbGFzcz1cImNoYXQtbWVzc2FnZV9fcmVwb3J0XCIgZGF0YS1yZXBvcnQtbXNnLWlkPVwiJHttc2cuaWR9XCIgdGl0bGU9XCJTaWduYWxlciBjZSBtZXNzYWdlXCI+PGkgY2xhc3M9XCJmYXMgZmEtZmxhZ1wiPjwvaT48L2J1dHRvbj5gO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBkaXYuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgJHtlc2NhcGVIdG1sKG1zZy5jb250ZW50KX1cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiY2hhdC1tZXNzYWdlX190aW1lXCI+JHtlc2NhcGVIdG1sKG1zZy5kYXRlKX0gJHtyZXBvcnRCdG59PC9zcGFuPlxyXG4gICAgICAgICAgICBgO1xyXG5cclxuICAgICAgICAgICAgLy8gQXR0YWNoIHJlcG9ydCBoYW5kbGVyXHJcbiAgICAgICAgICAgIGNvbnN0IHJlcG9ydEVsID0gZGl2LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlcG9ydC1tc2ctaWRdJyk7XHJcbiAgICAgICAgICAgIGlmIChyZXBvcnRFbCkge1xyXG4gICAgICAgICAgICAgICAgcmVwb3J0RWwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVwb3J0TWVzc2FnZUFjdGlvbihyZXBvcnRFbC5kYXRhc2V0LnJlcG9ydE1zZ0lkLCByZXBvcnRFbCk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgbWVzc2FnZXNFbC5hcHBlbmRDaGlsZChkaXYpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBtZXNzYWdlc0VsLnNjcm9sbFRvcCA9IG1lc3NhZ2VzRWwuc2Nyb2xsSGVpZ2h0O1xyXG4gICAgfVxyXG5cclxuICAgIC8vIFNlbmQgbWVzc2FnZVxyXG4gICAgY29uc3Qgc2VuZEJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1zZW5kXScpO1xyXG4gICAgY29uc3QgaW5wdXRFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbnZlcnNhdGlvbi1pbnB1dF0nKTtcclxuXHJcbiAgICBpZiAoc2VuZEJ0biAmJiBpbnB1dEVsKSB7XHJcbiAgICAgICAgc2VuZEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNlbmRNZXNzYWdlKTtcclxuICAgICAgICBpbnB1dEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHNlbmRNZXNzYWdlKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2VuZE1lc3NhZ2UoKSB7XHJcbiAgICAgICAgY29uc3QgY29udGVudCA9IGlucHV0RWwudmFsdWUudHJpbSgpO1xyXG4gICAgICAgIGlmICghY29udGVudCB8fCAhY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpbnB1dEVsLnZhbHVlID0gJyc7XHJcblxyXG4gICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke2N1cnJlbnRDb252ZXJzYXRpb25Vc2VySWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcclxuICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0J1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7IGNvbnRlbnQ6IGNvbnRlbnQgfSlcclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5zdWNjZXNzICYmIGRhdGEubWVzc2FnZSkge1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyTWVzc2FnZXMoW2RhdGEubWVzc2FnZV0sIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQmFjayBidXR0b25cclxuICAgIGNvbnN0IGJhY2tCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tYmFja10nKTtcclxuICAgIGlmIChiYWNrQnRuKSB7XHJcbiAgICAgICAgYmFja0J0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCA9IG51bGw7XHJcbiAgICAgICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgICAgICBmcmllbmRzTG9hZGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHN3aXRjaFRhYignZnJpZW5kcycpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTUVTU0FHRSBQT0xMSU5HIChldmVyeSA1cyB3aGVuIGNvbnZlcnNhdGlvbiBvcGVuKVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBzdGFydE1lc3NhZ2VQb2xsaW5nKCkge1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmICghY3VycmVudENvbnZlcnNhdGlvblVzZXJJZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICAgICAgZmV0Y2goYC9mcmllbmRzL21lc3NhZ2VzLyR7Y3VycmVudENvbnZlcnNhdGlvblVzZXJJZH0/YWZ0ZXJJZD0ke2xhc3RNZXNzYWdlSWR9YCwge1xyXG4gICAgICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZGF0YS5tZXNzYWdlcyAmJiBkYXRhLm1lc3NhZ2VzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZW5kZXJNZXNzYWdlcyhkYXRhLm1lc3NhZ2VzLCB0cnVlKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSwgNTAwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc3RvcE1lc3NhZ2VQb2xsaW5nKCkge1xyXG4gICAgICAgIGlmIChtZXNzYWdlUG9sbGluZ0ludGVydmFsKSB7XHJcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwobWVzc2FnZVBvbGxpbmdJbnRlcnZhbCk7XHJcbiAgICAgICAgICAgIG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIFVOUkVBRCBDT1VOVCBQT0xMSU5HIChldmVyeSAzMHMsIGFsd2F5cyBhY3RpdmUpXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGZldGNoVW5yZWFkQ291bnQoKSB7XHJcbiAgICAgICAgZmV0Y2goJy9mcmllbmRzL3VucmVhZC1jb3VudCcsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnRvdGFsID4gMCkge1xyXG4gICAgICAgICAgICAgICAgYmFkZ2UudGV4dENvbnRlbnQgPSBkYXRhLnRvdGFsO1xyXG4gICAgICAgICAgICAgICAgYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29uc3QgcmVxdWVzdHNCYWRnZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXJlcXVlc3RzLWJhZGdlXScpO1xyXG4gICAgICAgICAgICBpZiAocmVxdWVzdHNCYWRnZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEucGVuZGluZ1JlcXVlc3RzID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2UudGV4dENvbnRlbnQgPSBkYXRhLnBlbmRpbmdSZXF1ZXN0cztcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge30pO1xyXG4gICAgfVxyXG5cclxuICAgIGZldGNoVW5yZWFkQ291bnQoKTtcclxuICAgIHVucmVhZFBvbGxpbmdJbnRlcnZhbCA9IHNldEludGVydmFsKGZldGNoVW5yZWFkQ291bnQsIDMwMDAwKTtcclxufSk7XHJcbiIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyJdLCJuYW1lcyI6WyJlc2NhcGVIdG1sIiwic3RyIiwiZGl2IiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJjcmVhdGVUZXh0Tm9kZSIsImlubmVySFRNTCIsImFkZEV2ZW50TGlzdGVuZXIiLCJidXJnZXIiLCJxdWVyeVNlbGVjdG9yIiwibmF2IiwiY2xhc3NMaXN0IiwidG9nZ2xlIiwiU1RBVF9NQVgiLCJkbWciLCJzcGVlZCIsImRvZGdlIiwiY3JpdCIsImhwIiwicG9ydHJhaXRzIiwicXVlcnlTZWxlY3RvckFsbCIsImRldGFpbHMiLCJnZXRFbGVtZW50QnlJZCIsInNlbGVjdGVkTGlzdCIsImxhdW5jaEJ0biIsImxlbmd0aCIsIm1heFNlbGVjdGlvbiIsInNlbGVjdGVkSGVyb2VzIiwic2VsZWN0ZWRIZXJvSWRzIiwiUk9MRV9DQVRFR09SSUVTIiwiZ2V0U2VsZWN0ZWRSb2xlcyIsInJvbGVzIiwiVGFuayIsIkRQUyIsIlN1cHBvcnQiLCJmb3JFYWNoIiwiaWQiLCJwIiwiQXJyYXkiLCJmcm9tIiwiZmluZCIsInBwIiwiZGF0YXNldCIsImNhdCIsInJvbGUiLCJjYW5TZWxlY3RSb2xlIiwicG9ydHJhaXQiLCJyZW1vdmUiLCJhZGQiLCJuYW1lIiwiZG1nTWluIiwiTnVtYmVyIiwiZG1nTWF4Iiwic3ByaXRlRmlsZSIsInNwcml0ZSIsImFiaWxpdHlOYW1lIiwiYWJpbGl0eURlc2MiLCJhYmlsaXR5Q2QiLCJzcHJpdGVQYXRoIiwiY29uY2F0IiwiaXNTZWxlY3RlZCIsImluY2x1ZGVzIiwiYWJpbGl0eUh0bWwiLCJNYXRoIiwibWluIiwiYnRuUmlnaHQiLCJyb2xlQ2F0IiwiYWxyZWFkeVNlbGVjdGVkIiwiZGlzYWJsZWQiLCJ0ZXh0Q29udGVudCIsImZpbHRlciIsImhpZCIsImgiLCJhbGVydCIsInB1c2giLCJ1cGRhdGVTZWxlY3RlZFRlYW0iLCJoZXJvIiwiaGVyb0VsIiwidXBkYXRlUm9sZUluZGljYXRvcnMiLCJ0ZWFtQ29tcGxldGUiLCJpbmRpY2F0b3IiLCJzbG90Iiwic2F2ZVByZXNldEJ0biIsInByZXNldE1vZGFsIiwicHJlc2V0TmFtZUlucHV0IiwicHJlc2V0Q29uZmlybUJ0biIsInByZXNldENhbmNlbEJ0biIsInVwZGF0ZVNhdmVQcmVzZXRCdG4iLCJvcmlnaW5hbFVwZGF0ZVNlbGVjdGVkVGVhbSIsIl9vcmlnVXBkYXRlIiwiX29yaWdSb2xlSW5kaWNhdG9ycyIsInZhbHVlIiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsImZvY3VzIiwidHJpbSIsImJvcmRlckNvbG9yIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjaGFyYWN0ZXJJZHMiLCJtYXAiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJzdWNjZXNzIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJlcnJvciIsImUiLCJrZXkiLCJjbGljayIsImxvYWRQcmVzZXQiLCJpZFN0ciIsIlN0cmluZyIsImRlbGV0ZVByZXNldCIsInByZXNldElkIiwiY2hpcEVsIiwiY29uZmlybSIsImxpc3QiLCJjaGlsZHJlbiIsIl9kb2N1bWVudCRxdWVyeVNlbGVjdCIsImNoaXAiLCJjaGFySWRzIiwicGFyc2UiLCJwcmVzZXRJZHMiLCJzdG9wUHJvcGFnYXRpb24iLCJzZWxlY3RlZExpc3RPYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiY2hpbGRMaXN0IiwiaSIsImVuY29kZVVSSUNvbXBvbmVudCIsImpvaW4iLCJyZXNwb25zZSIsInJlZGlyZWN0ZWQiLCJocmVmIiwidXJsIiwicG9wdXAiLCJiYWNrZHJvcCIsImNsb3NlQnRuIiwiY29udGVudCIsImxvYWRlZCIsIm9wZW5Qb3B1cCIsIm9mZnNldEhlaWdodCIsImZldGNoUHJvZmlsZSIsImNsb3NlUG9wdXAiLCJyZW5kZXJQcm9maWxlIiwicmVzdWx0Q2xhc3MiLCJyIiwicmVzdWx0TGFiZWwiLCJhdmF0YXJIdG1sIiwicHJvZmlsZUltYWdlIiwidXNlcm5hbWUiLCJodG1sIiwibW90dG8iLCJiaW8iLCJyYXRpbmciLCJzdGF0cyIsIndpbnMiLCJsb3NzZXMiLCJ3aW5SYXRlIiwiZmF2b3JpdGVDaGFyYWN0ZXIiLCJnYW1lc1BsYXllZCIsImxhc3RUZWFtIiwiYyIsInJlY2VudEJhdHRsZXMiLCJiIiwicGFyc2VJbnQiLCJyZXN1bHQiLCJvcHBvbmVudCIsIm1hdGNoVHlwZSIsInRvVXBwZXJDYXNlIiwiZGF0ZSIsIkNvbWJhdENvbnRyb2xsZXIiLCJjb250YWluZXIiLCJfY2xhc3NDYWxsQ2hlY2siLCJsb2dzIiwiY3VycmVudEluZGV4IiwiaXNQbGF5aW5nIiwiaXNQYXVzZWQiLCJjaGFyYWN0ZXJFbGVtZW50cyIsImNoYXJhY3Rlck1heEhQIiwiaW5pdCIsIl9jcmVhdGVDbGFzcyIsIl90aGlzIiwibG9nc0RhdGEiLCJjb21iYXRMb2dzIiwiY29uc29sZSIsImxvZ0NvbnRhaW5lciIsIm92ZXJsYXkiLCJwbGF5QnRuIiwic2tpcEJ0biIsInNwZWVkQnRucyIsImVsIiwiY2hhcmFjdGVyTmFtZSIsInRlYW0iLCJjaGFyYWN0ZXJUZWFtIiwiaHBUZXh0IiwibWF0Y2giLCJvcGFjaXR5IiwiYmluZEV2ZW50cyIsInBsYXkiLCJfdGhpczIiLCJ0b2dnbGVQbGF5Iiwic2tpcCIsImJ0biIsInNldFNwZWVkIiwidXBkYXRlUGxheUJ1dHRvbiIsInByb2Nlc3NOZXh0TG9nIiwicGF1c2UiLCJsb2ciLCJkaXNwbGF5TG9nIiwidXBkYXRlSGVhbHRoQmFycyIsInR5cGUiLCJhbmltYXRlRGVhdGgiLCJ0YXJnZXQiLCJ0YXJnZXRUZWFtIiwic2hvd1ZpY3RvcnlPdmVybGF5IiwiZXZlbnQiLCJwYXJzZUZsb2F0IiwiY3VycmVudFRhcmdldCIsImNvbWJhdFNwZWVkIiwiX3RoaXMzIiwicHJvY2Vzc0xvZyIsImRlbGF5IiwiZ2V0RGVsYXlGb3JMb2ciLCJnZXRBYmlsaXR5RGVsYXkiLCJzdWJ0eXBlIiwiX3RoaXM0IiwicGxheUFuaW1hdGlvbiIsImhwRGVsYXkiLCJnZXRIUFVwZGF0ZURlbGF5IiwiZ2V0QWJpbGl0eUhQRGVsYXkiLCJhbmltYXRlQXR0YWNrIiwiYXR0YWNrZXIiLCJhdHRhY2tlclRlYW0iLCJpc0NyaXQiLCJhbmltYXRlSGVhbCIsImhlYWxlciIsImhlYWxlclRlYW0iLCJhbmltYXRlRGVmZW5kIiwiZGVmZW5kZXIiLCJkZWZlbmRlclRlYW0iLCJhbmltYXRlRG9kZ2UiLCJhbmltYXRlRG9UIiwiYW5pbWF0ZVN0dW5uZWQiLCJwbGF5QWJpbGl0eUFuaW1hdGlvbiIsInRhcmdldE5hbWUiLCJkb3RDbGFzcyIsImdldENoYXJhY3RlckVsZW1lbnQiLCJhbmltYXRlTWFya2VkIiwiYW5pbWF0ZUJ1ZmYiLCJhbmltYXRlU3RlYWx0aCIsIl90aGlzNSIsImNhc3RlciIsImNhc3RlclRlYW0iLCJoZWFsZWQiLCJhbmltYXRlVGVhbUJ1ZmYiLCJfdGhpczYiLCJPYmplY3QiLCJrZXlzIiwic3RhcnRzV2l0aCIsImF0dGFja2VyTmFtZSIsImhlYWxlck5hbWUiLCJkZWZlbmRlck5hbWUiLCJlbnRyeSIsImNsYXNzTmFtZSIsIm1lc3NhZ2UiLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJ0ZWFtTmFtZSIsImN1cnJlbnRIUCIsIm1heEhQIiwidGFyZ2V0SFAiLCJ0YXJnZXRNYXhIUCIsInVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzIiwidW5kZWZpbmVkIiwidXBkYXRlQ2hhcmFjdGVySFAiLCJfdGhpczciLCJtYXhIcCIsInBlcmNlbnQiLCJocEJhciIsInRyYW5zaXRpb24iLCJ3aWR0aCIsInVwZGF0ZUluZm9QYW5lbCIsInBhbmVsQ2xhc3MiLCJwYW5lbCIsImNoYXJhY3RlckluZm9zIiwiX2l0ZXJhdG9yIiwiX2NyZWF0ZUZvck9mSXRlcmF0b3JIZWxwZXIiLCJfc3RlcCIsIl9sb29wIiwiaW5mbyIsIm5hbWVFbCIsInN0YXRzU3BhbiIsInMiLCJuIiwiZG9uZSIsImVyciIsImYiLCJfdGhpczgiLCJmaW5hbGl6ZVJhdGluZyIsIl90aGlzOSIsImZpbmFsaXplVXJsIiwicmF0aW5nQ2hhbmdlIiwic2hvd1JhdGluZ1VwZGF0ZSIsIm5ld1JhdGluZyIsIm5ld1JhdGluZzIiLCJjaGFuZ2UiLCJyYXRpbmdFbCIsInJhdGluZ0VsMiIsIndpbm5lckRpdiIsIm5vdGlmMSIsImNzc1RleHQiLCJjb2xvciIsImNoYW5nZTIiLCJub3RpZjIiLCJjb21iYXRDb250YWluZXIiLCJiYWRnZSIsInBhbmVsT3BlbiIsImN1cnJlbnRUYWIiLCJjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkIiwibGFzdE1lc3NhZ2VJZCIsIm1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwiLCJ1bnJlYWRQb2xsaW5nSW50ZXJ2YWwiLCJmcmllbmRzTG9hZGVkIiwicmVxdWVzdHNMb2FkZWQiLCJvcGVuUGFuZWwiLCJsb2FkRnJpZW5kcyIsImNsb3NlUGFuZWwiLCJzdG9wTWVzc2FnZVBvbGxpbmciLCJ0YWJCdG4iLCJ0YWJOYW1lIiwiZnJpZW5kc1RhYiIsInN3aXRjaFRhYiIsInRhYkNvbnRlbnQiLCJsb2FkUmVxdWVzdHMiLCJmcmllbmRzIiwidXNlcklkIiwibGFzdE1lc3NhZ2UiLCJpc0Zyb21NZSIsIml0ZW0iLCJmcmllbmRVc2VySWQiLCJvcGVuQ29udmVyc2F0aW9uIiwicmVxdWVzdHMiLCJmcmllbmRzaGlwSWQiLCJoYW5kbGVSZXF1ZXN0IiwiYWNjZXB0SWQiLCJyZWplY3RJZCIsImFjdGlvbiIsImZldGNoVW5yZWFkQ291bnQiLCJzZWFyY2hJbnB1dCIsInNlYXJjaFJlc3VsdHMiLCJzZWFyY2hUaW1lb3V0IiwiY2xlYXJUaW1lb3V0IiwicXVlcnkiLCJ1c2VycyIsInUiLCJhY3Rpb25IdG1sIiwiZnJpZW5kU3RhdHVzIiwic2VuZEZyaWVuZFJlcXVlc3QiLCJhZGRGcmllbmRJZCIsIm91dGVySFRNTCIsInJlcG9ydE1lc3NhZ2VBY3Rpb24iLCJtZXNzYWdlSWQiLCJyZWFzb24iLCJwcm9tcHQiLCJ0aXRsZSIsImNvbnZFbCIsIm1lc3NhZ2VzRWwiLCJyZW5kZXJNZXNzYWdlcyIsIm1lc3NhZ2VzIiwic3RhcnRNZXNzYWdlUG9sbGluZyIsImFwcGVuZCIsInBsYWNlaG9sZGVyIiwibXNnIiwicmVwb3J0QnRuIiwicmVwb3J0RWwiLCJyZXBvcnRNc2dJZCIsInNlbmRCdG4iLCJpbnB1dEVsIiwic2VuZE1lc3NhZ2UiLCJiYWNrQnRuIiwic2V0SW50ZXJ2YWwiLCJjbGVhckludGVydmFsIiwidG90YWwiLCJyZXF1ZXN0c0JhZGdlIiwicGVuZGluZ1JlcXVlc3RzIl0sInNvdXJjZVJvb3QiOiIifQ==