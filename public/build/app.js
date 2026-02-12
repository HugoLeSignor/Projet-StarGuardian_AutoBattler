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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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dmEsUUFBUSxDQUFDTyxhQUFhLENBQUMsdUJBQXVCLENBQUM7TUFDckUsSUFBSWdhLGFBQWEsRUFBRTtRQUNmLElBQUl6VCxJQUFJLENBQUMwVCxlQUFlLEdBQUcsQ0FBQyxFQUFFO1VBQzFCRCxhQUFhLENBQUNqVyxXQUFXLEdBQUd3QyxJQUFJLENBQUMwVCxlQUFlO1VBQ2hERCxhQUFhLENBQUMxVSxLQUFLLENBQUNDLE9BQU8sR0FBRyxjQUFjO1FBQ2hELENBQUMsTUFBTTtVQUNIeVUsYUFBYSxDQUFDMVUsS0FBSyxDQUFDQyxPQUFPLEdBQUcsTUFBTTtRQUN4QztNQUNKO0lBQ0osQ0FBQyxDQUFDLFNBQ0ksQ0FBQyxZQUFNLENBQUMsQ0FBQyxDQUFDO0VBQ3BCO0VBRUFxUyxnQkFBZ0IsQ0FBQyxDQUFDO0VBQ2xCMUIscUJBQXFCLEdBQUcyRCxXQUFXLENBQUNqQyxnQkFBZ0IsRUFBRSxLQUFLLENBQUM7QUFDaEUsQ0FBQyxDQUFDLEM7Ozs7Ozs7Ozs7OztBQ3RmRjs7Ozs7Ozs7Ozs7OztBQ0FBIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2FwcC5qcyIsIndlYnBhY2s6Ly8vLi9hc3NldHMvanMvY29tYmF0LmpzIiwid2VicGFjazovLy8uL2Fzc2V0cy9qcy9mcmllbmRzLmpzIiwid2VicGFjazovLy8uL25vZGVfbW9kdWxlcy9AZm9ydGF3ZXNvbWUvZm9udGF3ZXNvbWUtZnJlZS9jc3MvYWxsLmNzcz8yZGM5Iiwid2VicGFjazovLy8uL2Fzc2V0cy9zdHlsZXMvYXBwLnNjc3MiXSwic291cmNlc0NvbnRlbnQiOlsiLypcclxuICogV2VsY29tZSB0byB5b3VyIGFwcCdzIG1haW4gSmF2YVNjcmlwdCBmaWxlIVxyXG4gKi9cclxuaW1wb3J0ICcuL3N0eWxlcy9hcHAuc2Nzcyc7XHJcbmltcG9ydCAnQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5jc3MnO1xyXG5pbXBvcnQgJy4vanMvY29tYmF0LmpzJztcclxuaW1wb3J0ICcuL2pzL2ZyaWVuZHMuanMnO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBVVElMSVRBSVJFIFNFQ1VSSVRFIFhTU1xyXG49PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmZ1bmN0aW9uIGVzY2FwZUh0bWwoc3RyKSB7XHJcbiAgICBpZiAoIXN0cikgcmV0dXJuICcnO1xyXG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICBkaXYuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoc3RyKSk7XHJcbiAgICByZXR1cm4gZGl2LmlubmVySFRNTDtcclxufVxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PVxyXG4gICBNRU5VIEJVUkdFUlxyXG49PT09PT09PT09PT09PT09PT09PT09ICovXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJET01Db250ZW50TG9hZGVkXCIsICgpID0+IHtcclxuICAgIGNvbnN0IGJ1cmdlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuYnVyZ2VyXCIpO1xyXG4gICAgY29uc3QgbmF2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5tYWluLW5hdmlnYXRpb25cIik7XHJcblxyXG4gICAgaWYgKGJ1cmdlciAmJiBuYXYpIHtcclxuICAgICAgICBidXJnZXIuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsICgpID0+IHtcclxuICAgICAgICAgICAgbmF2LmNsYXNzTGlzdC50b2dnbGUoXCJhY3RpdmVcIik7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIFBBR0UgVEVBTVMgKENPUlJJR8OJRSlcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuXHJcbi8qIPCflKcgTUFYIERFUyBTVEFUUyAoYWRhcHRlciDDoCB0YSBCREQgLyDDqXF1aWxpYnJhZ2UpICovXHJcbmNvbnN0IFNUQVRfTUFYID0ge1xyXG4gICAgZG1nOiAzMCxcclxuICAgIHNwZWVkOiAxMixcclxuICAgIGRvZGdlOiA0MCxcclxuICAgIGNyaXQ6IDE1LFxyXG4gICAgaHA6IDc1XHJcbn07XHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgcG9ydHJhaXRzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRlYW0tcG9ydHJhaXQnKTtcclxuICAgIGNvbnN0IGRldGFpbHMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGVhbURldGFpbHMnKTtcclxuICAgIGNvbnN0IHNlbGVjdGVkTGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zZWxlY3RlZC1saXN0Jyk7XHJcbiAgICBjb25zdCBsYXVuY2hCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuLWxhdW5jaCcpO1xyXG5cclxuICAgIGlmICghZGV0YWlscyB8fCBwb3J0cmFpdHMubGVuZ3RoID09PSAwKSByZXR1cm47XHJcblxyXG4gICAgY29uc3QgbWF4U2VsZWN0aW9uID0gNDtcclxuICAgIGxldCBzZWxlY3RlZEhlcm9lcyA9IFtdO1xyXG4gICAgbGV0IHNlbGVjdGVkSGVyb0lkcyA9IFtdO1xyXG5cclxuICAgIC8vIENvbXBvc2l0aW9uIG9ibGlnYXRvaXJlIDogMSBUYW5rLCAxIERQUywgMSBIZWFsZXIsIDEgU3VwcG9ydFxyXG4gICAgLy8gTGEgY2F0ZWdvcmllIHZpZW50IGRpcmVjdGVtZW50IGR1IGRhdGEtY2F0ZWdvcnkgKGNhbGN1bGUgY290ZSBzZXJ2ZXVyKVxyXG4gICAgZnVuY3Rpb24gZ2V0Q2F0ZWdvcnkocG9ydHJhaXQpIHtcclxuICAgICAgICByZXR1cm4gcG9ydHJhaXQuZGF0YXNldC5jYXRlZ29yeSB8fCAnU3VwcG9ydCc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRSb2xlcygpIHtcclxuICAgICAgICBjb25zdCByb2xlcyA9IHsgVGFuazogMCwgRFBTOiAwLCBIZWFsZXI6IDAsIFN1cHBvcnQ6IDAgfTtcclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHAgPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwcCA9PiBwcC5kYXRhc2V0LmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgIGlmIChwKSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSBnZXRDYXRlZ29yeShwKTtcclxuICAgICAgICAgICAgICAgIHJvbGVzW2NhdF0rKztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHJldHVybiByb2xlcztcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjYW5TZWxlY3RSb2xlKHBvcnRyYWl0RWwpIHtcclxuICAgICAgICBjb25zdCBjYXQgPSBnZXRDYXRlZ29yeShwb3J0cmFpdEVsKTtcclxuICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICByZXR1cm4gcm9sZXNbY2F0XSA8IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcG9ydHJhaXRzLmZvckVhY2gocG9ydHJhaXQgPT4ge1xyXG4gICAgICAgIHBvcnRyYWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gcG9ydHJhaXQuZGF0YXNldC5pZDtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHBvcnRyYWl0LmRhdGFzZXQubmFtZTtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZSA9IHBvcnRyYWl0LmRhdGFzZXQucm9sZTtcclxuICAgICAgICAgICAgY29uc3QgZG1nTWluID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuZG1nTWluKTtcclxuICAgICAgICAgICAgY29uc3QgZG1nTWF4ID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuZG1nTWF4KTtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5zcGVlZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRvZGdlID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuZG9kZ2UpO1xyXG4gICAgICAgICAgICBjb25zdCBjcml0ID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuY3JpdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhwID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuaHApO1xyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVGaWxlID0gcG9ydHJhaXQuZGF0YXNldC5zcHJpdGU7XHJcbiAgICAgICAgICAgIGNvbnN0IGFiaWxpdHlOYW1lID0gcG9ydHJhaXQuZGF0YXNldC5hYmlsaXR5TmFtZSB8fCAnJztcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eURlc2MgPSBwb3J0cmFpdC5kYXRhc2V0LmFiaWxpdHlEZXNjIHx8ICcnO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5Q2QgPSBwb3J0cmFpdC5kYXRhc2V0LmFiaWxpdHlDZCB8fCAnJztcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZVBhdGggPSBgL2Fzc2V0L3Nwcml0ZXMvJHtzcHJpdGVGaWxlfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGlzU2VsZWN0ZWQgPSBzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eUh0bWwgPSBhYmlsaXR5TmFtZSA/IGBcclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYWJpbGl0eS1zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX2hlYWRlclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtZmlyZS1hbHRcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImFiaWxpdHktc2VjdGlvbl9fbmFtZVwiPiR7ZXNjYXBlSHRtbChhYmlsaXR5TmFtZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJhYmlsaXR5LXNlY3Rpb25fX2NkXCI+PGkgY2xhc3M9XCJmYXMgZmEtaG91cmdsYXNzLWhhbGZcIj48L2k+ICR7ZXNjYXBlSHRtbChhYmlsaXR5Q2QpfVQ8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImFiaWxpdHktc2VjdGlvbl9fZGVzY1wiPiR7ZXNjYXBlSHRtbChhYmlsaXR5RGVzYyl9PC9wPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgIDogJyc7XHJcblxyXG4gICAgICAgICAgICBkZXRhaWxzLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJ0ZWFtLWRldGFpbHMtY29udGVudFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMj4ke25hbWV9PC9oMj5cclxuICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cInJvbGVcIj4ke3JvbGV9PC9wPlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2lmLWNvbnRhaW5lclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c3ByaXRlUGF0aH1cIiBhbHQ9XCJTcHJpdGUgZGUgJHtuYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdHNcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkRNRzwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1kbWdcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGRtZ01heCAvIFNUQVRfTUFYLmRtZykgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke2RtZ01pbn0gLSAke2RtZ01heH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPlZJVDwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWJhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0LWZpbGwgc3RhdC1maWxsLS1zcGRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKHNwZWVkIC8gU1RBVF9NQVguc3BlZWQpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtzcGVlZH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkRPREdFPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWRvZGdlXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChkb2RnZSAvIFNUQVRfTUFYLmRvZGdlKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZG9kZ2V9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5DUklUPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWNyaXRcIlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHlsZT1cIndpZHRoOiR7TWF0aC5taW4oKGNyaXQgLyBTVEFUX01BWC5jcml0KSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7Y3JpdH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPkhQPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbCBzdGF0LWZpbGwtLWhwXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChocCAvIFNUQVRfTUFYLmhwKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7aHB9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgJHthYmlsaXR5SHRtbH1cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1zZWxlY3QtcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtpc1NlbGVjdGVkID8gJ0TDqXPDqWxlY3Rpb25uZXInIDogJ1PDqWxlY3Rpb25uZXInfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBidG5SaWdodCA9IGRldGFpbHMucXVlcnlTZWxlY3RvcignLmJ0bi1zZWxlY3QtcmlnaHQnKTtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZUNhdCA9IGdldENhdGVnb3J5KHBvcnRyYWl0KTtcclxuICAgICAgICAgICAgY29uc3QgYWxyZWFkeVNlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIC8vIETDqXNhY3RpdmVyIGxlIGJvdXRvbiBzaSBsZSBzbG90IGRlIGNlIHLDtGxlIGVzdCBkw6lqw6AgcHJpc1xyXG4gICAgICAgICAgICBpZiAoIWFscmVhZHlTZWxlY3RlZCAmJiAhY2FuU2VsZWN0Um9sZShwb3J0cmFpdCkpIHtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LnRleHRDb250ZW50ID0gYFNsb3QgJHtyb2xlQ2F0fSBkw6lqw6AgcHJpc2A7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMgPSBzZWxlY3RlZEhlcm9JZHMuZmlsdGVyKGhpZCA9PiBoaWQgIT09IGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcyA9IHNlbGVjdGVkSGVyb2VzLmZpbHRlcihoID0+IGggIT09IG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuU2VsZWN0Um9sZShwb3J0cmFpdCkpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYWxlcnQoYFZvdXMgYXZleiBkw6lqw6AgdW4gJHtyb2xlQ2F0fSBkYW5zIHZvdHJlIMOpcXVpcGUgIWApO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMubGVuZ3RoID49IG1heFNlbGVjdGlvbikge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChcIlZvdXMgcG91dmV6IHPDqWxlY3Rpb25uZXIgbWF4aW11bSA0IHBlcnNvbm5hZ2VzICFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLnB1c2goaWQpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNlbGVjdGVkSGVyb2VzLnB1c2gobmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgcG9ydHJhaXQuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICAgICB1cGRhdGVTZWxlY3RlZFRlYW0oKTtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LnRleHRDb250ZW50ID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKVxyXG4gICAgICAgICAgICAgICAgICAgID8gJ0TDqXPDqWxlY3Rpb25uZXInXHJcbiAgICAgICAgICAgICAgICAgICAgOiAnU8OpbGVjdGlvbm5lcic7XHJcbiAgICAgICAgICAgICAgICBidG5SaWdodC5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH0pO1xyXG5cclxuICAgIC8qICBaT05FIMOJUVVJUEUg4oCUIHNwcml0ZXMgc2V1bGVtZW50ICovXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVTZWxlY3RlZFRlYW0oKSB7XHJcbiAgICAgICAgc2VsZWN0ZWRMaXN0LmlubmVySFRNTCA9ICcnO1xyXG5cclxuICAgICAgICBzZWxlY3RlZEhlcm9JZHMuZm9yRWFjaChpZCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm8gPSBBcnJheS5mcm9tKHBvcnRyYWl0cykuZmluZChwID0+IHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAoIWhlcm8pIHJldHVybjtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IGhlcm8uZGF0YXNldC5uYW1lO1xyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7aGVyby5kYXRhc2V0LnNwcml0ZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBoZXJvRWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgaGVyb0VsLmNsYXNzTGlzdC5hZGQoJ3NlbGVjdGVkLWhlcm8tc3ByaXRlJyk7XHJcbiAgICAgICAgICAgIGhlcm9FbC5pbm5lckhUTUwgPSBgXHJcbiAgICAgICAgICAgICAgICA8aW1nIHNyYz1cIiR7c3ByaXRlUGF0aH1cIiBhbHQ9XCJTcHJpdGUgZGUgJHtuYW1lfVwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+JHtuYW1lfTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgc2VsZWN0ZWRMaXN0LmFwcGVuZENoaWxkKGhlcm9FbCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgLy8gTWV0dHJlIMOgIGpvdXIgbGVzIGluZGljYXRldXJzIGRlIHLDtGxlc1xyXG4gICAgICAgIHVwZGF0ZVJvbGVJbmRpY2F0b3JzKCk7XHJcblxyXG4gICAgICAgIGlmIChsYXVuY2hCdG4pIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW1Db21wbGV0ZSA9IHJvbGVzLlRhbmsgPT09IDEgJiYgcm9sZXMuRFBTID09PSAxICYmIHJvbGVzLkhlYWxlciA9PT0gMSAmJiByb2xlcy5TdXBwb3J0ID09PSAxO1xyXG4gICAgICAgICAgICBsYXVuY2hCdG4uZGlzYWJsZWQgPSAhdGVhbUNvbXBsZXRlO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiB1cGRhdGVSb2xlSW5kaWNhdG9ycygpIHtcclxuICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICBjb25zdCBpbmRpY2F0b3IgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucm9sZS1pbmRpY2F0b3InKTtcclxuICAgICAgICBpZiAoaW5kaWNhdG9yKSB7XHJcbiAgICAgICAgICAgIGluZGljYXRvci5xdWVyeVNlbGVjdG9yQWxsKCcucm9sZS1zbG90JykuZm9yRWFjaChzbG90ID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnN0IGNhdCA9IHNsb3QuZGF0YXNldC5yb2xlO1xyXG4gICAgICAgICAgICAgICAgaWYgKHJvbGVzW2NhdF0gPT09IDEpIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LmNsYXNzTGlzdC5hZGQoJ2ZpbGxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBzbG90LmNsYXNzTGlzdC5yZW1vdmUoJ2ZpbGxlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgICAgIFBSRVNFVFNcclxuICAgID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09ICovXHJcbiAgICBjb25zdCBzYXZlUHJlc2V0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1zYXZlLXByZXNldCcpO1xyXG4gICAgY29uc3QgcHJlc2V0TW9kYWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgncHJlc2V0TW9kYWwnKTtcclxuICAgIGNvbnN0IHByZXNldE5hbWVJbnB1dCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXROYW1lJyk7XHJcbiAgICBjb25zdCBwcmVzZXRDb25maXJtQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZXNldENvbmZpcm0nKTtcclxuICAgIGNvbnN0IHByZXNldENhbmNlbEJ0biA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVzZXRDYW5jZWwnKTtcclxuXHJcbiAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIGJvdXRvbiBzYXV2ZWdhcmRlciBzZWxvbiBsYSBzZWxlY3Rpb25cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNhdmVQcmVzZXRCdG4oKSB7XHJcbiAgICAgICAgaWYgKHNhdmVQcmVzZXRCdG4pIHtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW1Db21wbGV0ZSA9IHJvbGVzLlRhbmsgPT09IDEgJiYgcm9sZXMuRFBTID09PSAxICYmIHJvbGVzLkhlYWxlciA9PT0gMSAmJiByb2xlcy5TdXBwb3J0ID09PSAxO1xyXG4gICAgICAgICAgICBzYXZlUHJlc2V0QnRuLmRpc2FibGVkID0gIXRlYW1Db21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gQXBwZWxlciB1cGRhdGVTYXZlUHJlc2V0QnRuIGEgY2hhcXVlIGNoYW5nZW1lbnQgZGUgc2VsZWN0aW9uXHJcbiAgICBjb25zdCBvcmlnaW5hbFVwZGF0ZVNlbGVjdGVkVGVhbSA9IHVwZGF0ZVNlbGVjdGVkVGVhbTtcclxuICAgIC8vIE9uIHN1cmNoYXJnZSBlbiBham91dGFudCBsJ2FwcGVsXHJcbiAgICBjb25zdCBfb3JpZ1VwZGF0ZSA9IHVwZGF0ZVNlbGVjdGVkVGVhbTtcclxuXHJcbiAgICAvLyBQYXRjaDogYWpvdXRlciBsJ2FwcGVsIGEgdXBkYXRlU2F2ZVByZXNldEJ0biBkYW5zIHVwZGF0ZVNlbGVjdGVkVGVhbVxyXG4gICAgLy8gT24gbGUgZmFpdCBlbiB3cmFwcGFudCBsZXMgaW5kaWNhdGV1cnNcclxuICAgIGNvbnN0IF9vcmlnUm9sZUluZGljYXRvcnMgPSB1cGRhdGVSb2xlSW5kaWNhdG9ycztcclxuXHJcbiAgICAvLyBPdXZyaXIgbGEgbW9kYWxcclxuICAgIGlmIChzYXZlUHJlc2V0QnRuICYmIHByZXNldE1vZGFsKSB7XHJcbiAgICAgICAgc2F2ZVByZXNldEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnZhbHVlID0gJyc7XHJcbiAgICAgICAgICAgIHByZXNldE1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gcHJlc2V0TmFtZUlucHV0LmZvY3VzKCksIDEwMCk7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIC8vIEZlcm1lciBsYSBtb2RhbFxyXG4gICAgICAgIHByZXNldENhbmNlbEJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcHJlc2V0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgcHJlc2V0TW9kYWwucXVlcnlTZWxlY3RvcignLnByZXNldC1tb2RhbF9fYmFja2Ryb3AnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgcHJlc2V0TW9kYWwuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gU2F1dmVnYXJkZXIgbGUgcHJlc2V0XHJcbiAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHByZXNldE5hbWVJbnB1dC52YWx1ZS50cmltKCk7XHJcbiAgICAgICAgICAgIGlmICghbmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcHJlc2V0TmFtZUlucHV0LnN0eWxlLmJvcmRlckNvbG9yID0gJyNkYzE0M2MnO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi50ZXh0Q29udGVudCA9ICcuLi4nO1xyXG5cclxuICAgICAgICAgICAgZmV0Y2goJy90ZWFtcy9wcmVzZXRzL3NhdmUnLCB7XHJcbiAgICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nLFxyXG4gICAgICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyxcclxuICAgICAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgICAgICBib2R5OiBKU09OLnN0cmluZ2lmeSh7XHJcbiAgICAgICAgICAgICAgICAgICAgbmFtZTogbmFtZSxcclxuICAgICAgICAgICAgICAgICAgICBjaGFyYWN0ZXJJZHM6IHNlbGVjdGVkSGVyb0lkcy5tYXAoTnVtYmVyKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIFJlY2hhcmdlciBsYSBwYWdlIHBvdXIgYWZmaWNoZXIgbGUgbm91dmVhdSBwcmVzZXRcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGFsZXJ0KGRhdGEuZXJyb3IgfHwgJ0VycmV1ciBsb3JzIGRlIGxhIHNhdXZlZ2FyZGUnKTtcclxuICAgICAgICAgICAgICAgICAgICBwcmVzZXRDb25maXJtQnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi50ZXh0Q29udGVudCA9ICdTYXV2ZWdhcmRlcic7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc2F1dmVnYXJkZScpO1xyXG4gICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcHJlc2V0Q29uZmlybUJ0bi50ZXh0Q29udGVudCA9ICdTYXV2ZWdhcmRlcic7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICAvLyBFbnRlciBwb3VyIHZhbGlkZXJcclxuICAgICAgICBwcmVzZXROYW1lSW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIChlKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChlLmtleSA9PT0gJ0VudGVyJykgcHJlc2V0Q29uZmlybUJ0bi5jbGljaygpO1xyXG4gICAgICAgICAgICBwcmVzZXROYW1lSW5wdXQuc3R5bGUuYm9yZGVyQ29sb3IgPSAnJztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBDaGFyZ2VyIHVuIHByZXNldCAoc2VsZWN0aW9uIHByb2dyYW1tYXRpcXVlIGRlcyBwZXJzb25uYWdlcylcclxuICAgIGZ1bmN0aW9uIGxvYWRQcmVzZXQoY2hhcmFjdGVySWRzKSB7XHJcbiAgICAgICAgLy8gUmVzZXQgbGEgc2VsZWN0aW9uIGFjdHVlbGxlXHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzID0gW107XHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvZXMgPSBbXTtcclxuICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHAuY2xhc3NMaXN0LnJlbW92ZSgnc2VsZWN0ZWQnKSk7XHJcblxyXG4gICAgICAgIC8vIFNlbGVjdGlvbm5lciBsZXMgcGVyc29ubmFnZXMgZHUgcHJlc2V0XHJcbiAgICAgICAgY2hhcmFjdGVySWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBpZFN0ciA9IFN0cmluZyhpZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHBvcnRyYWl0ID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocCA9PiBwLmRhdGFzZXQuaWQgPT09IGlkU3RyKTtcclxuICAgICAgICAgICAgaWYgKHBvcnRyYWl0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMucHVzaChpZFN0cik7XHJcbiAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcy5wdXNoKHBvcnRyYWl0LmRhdGFzZXQubmFtZSk7XHJcbiAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIHVwZGF0ZVNlbGVjdGVkVGVhbSgpO1xyXG4gICAgICAgIHVwZGF0ZVNhdmVQcmVzZXRCdG4oKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTdXBwcmltZXIgdW4gcHJlc2V0XHJcbiAgICBmdW5jdGlvbiBkZWxldGVQcmVzZXQocHJlc2V0SWQsIGNoaXBFbCkge1xyXG4gICAgICAgIGlmICghY29uZmlybSgnU3VwcHJpbWVyIGNlIHByZXNldCA/JykpIHJldHVybjtcclxuXHJcbiAgICAgICAgZmV0Y2goYC90ZWFtcy9wcmVzZXRzLyR7cHJlc2V0SWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdERUxFVEUnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGNoaXBFbC5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIC8vIFNpIHBsdXMgZGUgcHJlc2V0cywgY2FjaGVyIGxhIGJhcnJlXHJcbiAgICAgICAgICAgICAgICBjb25zdCBsaXN0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnByZXNldHMtYmFyX19saXN0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobGlzdCAmJiBsaXN0LmNoaWxkcmVuLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXRzLWJhcicpPy5yZW1vdmUoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IGFsZXJ0KCdFcnJldXIgbG9ycyBkZSBsYSBzdXBwcmVzc2lvbicpKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyBBdHRhY2hlciBsZXMgZXZlbnRzIGF1eCBjaGlwcyBkZSBwcmVzZXRzXHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcucHJlc2V0LWNoaXAnKS5mb3JFYWNoKGNoaXAgPT4ge1xyXG4gICAgICAgIGNvbnN0IHByZXNldElkID0gY2hpcC5kYXRhc2V0LnByZXNldElkO1xyXG4gICAgICAgIGNvbnN0IGNoYXJJZHMgPSBKU09OLnBhcnNlKGNoaXAuZGF0YXNldC5wcmVzZXRJZHMpO1xyXG5cclxuICAgICAgICBjaGlwLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtY2hpcF9fbG9hZCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBsb2FkUHJlc2V0KGNoYXJJZHMpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBjaGlwLnF1ZXJ5U2VsZWN0b3IoJy5wcmVzZXQtY2hpcF9fZGVsZXRlJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICBkZWxldGVQcmVzZXQocHJlc2V0SWQsIGNoaXApO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLy8gT2JzZXJ2ZXIgbGVzIGNoYW5nZW1lbnRzIGRlIHNlbGVjdGlvbiBwb3VyIGxlIGJvdXRvbiBzYXZlXHJcbiAgICAvLyBPbiB1dGlsaXNlIHVuIE11dGF0aW9uT2JzZXJ2ZXIgc3VyIHNlbGVjdGVkTGlzdFxyXG4gICAgY29uc3Qgc2VsZWN0ZWRMaXN0T2JzZXJ2ZXIgPSBuZXcgTXV0YXRpb25PYnNlcnZlcigoKSA9PiB1cGRhdGVTYXZlUHJlc2V0QnRuKCkpO1xyXG4gICAgaWYgKHNlbGVjdGVkTGlzdCkge1xyXG4gICAgICAgIHNlbGVjdGVkTGlzdE9ic2VydmVyLm9ic2VydmUoc2VsZWN0ZWRMaXN0LCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcclxuICAgIH1cclxuXHJcbiAgICBpZiAobGF1bmNoQnRuKSB7XHJcbiAgICAgICAgbGF1bmNoQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoc2VsZWN0ZWRIZXJvSWRzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgICAgIC8vIEVudm9pIFBPU1QgQUpBWCB2ZXJzIC90ZWFtcy9zZWxlY3RcclxuICAgICAgICAgICAgICAgIGZldGNoKCcvdGVhbXMvc2VsZWN0Jywge1xyXG4gICAgICAgICAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnLFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcsXHJcbiAgICAgICAgICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgICAgICAgICBib2R5OiBzZWxlY3RlZEhlcm9JZHMubWFwKChpZCwgaSkgPT4gYGNoYXJhY3Rlcl9pZHNbJHtpfV09JHtlbmNvZGVVUklDb21wb25lbnQoaWQpfWApLmpvaW4oJyYnKVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC50aGVuKHJlc3BvbnNlID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAocmVzcG9uc2UucmVkaXJlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYXRpb24uaHJlZiA9IHJlc3BvbnNlLnVybDtcclxuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBSZWRpcmlnZSBtYW51ZWxsZW1lbnQgc2kgcGFzIGRlIHJlZGlyZWN0aW9uXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gJy9tYXRjaG1ha2luZyc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ0VycmV1ciBsb3JzIGRlIGxhIHPDqWxlY3Rpb24gZGUgbFxcJ8OpcXVpcGUuJyk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG59KTtcclxuXHJcbi8qID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIFBST0ZJTEUgUE9QVVBcclxuPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHRvZ2dsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtdG9nZ2xlXScpO1xyXG4gICAgY29uc3QgcG9wdXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLXBvcHVwXScpO1xyXG4gICAgY29uc3QgYmFja2Ryb3AgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWJhY2tkcm9wXScpO1xyXG4gICAgY29uc3QgY2xvc2VCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1wcm9maWxlLWNsb3NlXScpO1xyXG4gICAgY29uc3QgY29udGVudCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtY29udGVudF0nKTtcclxuXHJcbiAgICBpZiAoIXRvZ2dsZSB8fCAhcG9wdXApIHJldHVybjtcclxuXHJcbiAgICBsZXQgbG9hZGVkID0gZmFsc2U7XHJcblxyXG4gICAgZnVuY3Rpb24gb3BlblBvcHVwKCkge1xyXG4gICAgICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIHBvcHVwLm9mZnNldEhlaWdodDsgLy8gcmVmbG93XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LmFkZCgncHJvZmlsZS1wb3B1cC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5hZGQoJ3Byb2ZpbGUtcG9wdXBfX2JhY2tkcm9wLS1vcGVuJyk7XHJcblxyXG4gICAgICAgIGlmICghbG9hZGVkKSB7XHJcbiAgICAgICAgICAgIGZldGNoUHJvZmlsZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBvcHVwKCkge1xyXG4gICAgICAgIHBvcHVwLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2ZpbGUtcG9wdXAtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdwcm9maWxlLXBvcHVwX19iYWNrZHJvcC0tb3BlbicpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBwb3B1cC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgb3BlblBvcHVwKTtcclxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcbiAgICBiYWNrZHJvcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlUG9wdXApO1xyXG5cclxuICAgIGZ1bmN0aW9uIGZldGNoUHJvZmlsZSgpIHtcclxuICAgICAgICBmZXRjaCgnL2FwaS9wcm9maWxlJylcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgbG9hZGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIHJlbmRlclByb2ZpbGUoZGF0YSk7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb250ZW50LmlubmVySFRNTCA9ICc8cCBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2Vycm9yXCI+RXJyZXVyIGRlIGNoYXJnZW1lbnQ8L3A+JztcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyUHJvZmlsZShkYXRhKSB7XHJcbiAgICAgICAgY29uc3QgcmVzdWx0Q2xhc3MgPSAocikgPT4gciA9PT0gJ3dpbicgPyAncmVzdWx0LS13aW4nIDogciA9PT0gJ2xvc3MnID8gJ3Jlc3VsdC0tbG9zcycgOiAncmVzdWx0LS1kcmF3JztcclxuICAgICAgICBjb25zdCByZXN1bHRMYWJlbCA9IChyKSA9PiByID09PSAnd2luJyA/ICdWaWN0b2lyZScgOiByID09PSAnbG9zcycgPyAnRFxcdTAwZTlmYWl0ZScgOiAnTnVsJztcclxuXHJcbiAgICAgICAgY29uc3QgYXZhdGFySHRtbCA9IGRhdGEucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKGRhdGEucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCJBdmF0YXIgZGUgJHtlc2NhcGVIdG1sKGRhdGEudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgOiBgPGkgY2xhc3M9XCJmYXMgZmEtdXNlci1jaXJjbGVcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+YDtcclxuXHJcbiAgICAgICAgbGV0IGh0bWwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19pZGVudGl0eVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2F2YXRhclwiPiR7YXZhdGFySHRtbH08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXBvcHVwX191c2VybmFtZVwiPiR7ZXNjYXBlSHRtbChkYXRhLnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtkYXRhLm1vdHRvID8gYDxzcGFuIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fbW90dG9cIj5cXHUwMGFiICR7ZXNjYXBlSHRtbChkYXRhLm1vdHRvKX0gXFx1MDBiYjwvc3Bhbj5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgJHtkYXRhLmJpbyA/IGA8cCBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2Jpb1wiPiR7ZXNjYXBlSHRtbChkYXRhLmJpbyl9PC9wPmAgOiAnJ31cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdGF0c1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5yYXRpbmcpKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+TU1SPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX3ZhbHVlXCI+JHtlc2NhcGVIdG1sKFN0cmluZyhkYXRhLnN0YXRzLndpbnMpKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+VmljdG9pcmVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1zdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX3ZhbHVlXCI+JHtlc2NhcGVIdG1sKFN0cmluZyhkYXRhLnN0YXRzLmxvc3NlcykpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5EXFx1MDBlOWZhaXRlczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5zdGF0cy53aW5SYXRlKSl9JTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5XaW4gUmF0ZTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICBgO1xyXG5cclxuICAgICAgICBpZiAoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlcikge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtc3RhclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gQ2hhbXBpb24gRmF2b3JpXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX25hbWVcIj4ke2VzY2FwZUh0bWwoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5uYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fcm9sZVwiPiR7ZXNjYXBlSHRtbChkYXRhLmZhdm9yaXRlQ2hhcmFjdGVyLnJvbGUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19jb3VudFwiPiR7ZXNjYXBlSHRtbChTdHJpbmcoZGF0YS5mYXZvcml0ZUNoYXJhY3Rlci5nYW1lc1BsYXllZCkpfSBwYXJ0aWVzPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5sYXN0VGVhbS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIGh0bWwgKz0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3NlY3Rpb25cIj5cclxuICAgICAgICAgICAgICAgICAgICA8aDMgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdWJ0aXRsZVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS11c2Vyc1wiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT4gRGVybmlcXHUwMGU4cmUgXFx1MDBjOXF1aXBlXHJcbiAgICAgICAgICAgICAgICAgICAgPC9oMz5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtkYXRhLmxhc3RUZWFtLm1hcChjID0+IGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fbWVtYmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChjLm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtX19yb2xlXCI+JHtlc2NhcGVIdG1sKGMucm9sZSl9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGApLmpvaW4oJycpfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAoZGF0YS5yZWNlbnRCYXR0bGVzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXNoaWVsZC1hbHRcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48L2k+IEhpc3RvcmlxdWVcclxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtkYXRhLnJlY2VudEJhdHRsZXMubWFwKGIgPT4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgaHJlZj1cIi9hcmVuYS9yZXBsYXkvJHtwYXJzZUludChiLmlkLCAxMCl9XCIgY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX2VudHJ5ICR7cmVzdWx0Q2xhc3MoYi5yZXN1bHQpfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19yZXN1bHRcIj4ke3Jlc3VsdExhYmVsKGIucmVzdWx0KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX29wcG9uZW50XCI+dnMgJHtlc2NhcGVIdG1sKGIub3Bwb25lbnQpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fdHlwZVwiPiR7ZXNjYXBlSHRtbChiLm1hdGNoVHlwZSkudG9VcHBlckNhc2UoKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX2RhdGVcIj4ke2VzY2FwZUh0bWwoYi5kYXRlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGxheSBwcm9maWxlLWhpc3RvcnlfX3JlcGxheVwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYCkuam9pbignJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lbXB0eVwiPkF1Y3VuIGNvbWJhdCBlbnJlZ2lzdHJcXHUwMGU5PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2FjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvcHJvZmlsZVwiIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZWRpdC1saW5rXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGVuXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PC9pPiBcXHUwMGM5ZGl0ZXIgbGUgcHJvZmlsXHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIH1cclxufSk7XHJcblxyXG4iLCIvKipcclxuICogQ29tYmF0IEFuaW1hdGlvbiBDb250cm9sbGVyXHJcbiAqIEfDqHJlIGwnYWZmaWNoYWdlIHByb2dyZXNzaWYgZGVzIGxvZ3MgZGUgY29tYmF0IGF2ZWMgYW5pbWF0aW9uc1xyXG4gKi9cclxuY2xhc3MgQ29tYmF0Q29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLmxvZ3MgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFAgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICAvLyBSw6ljdXDDqXJlciBsZXMgbG9ncyBkZXB1aXMgbCdhdHRyaWJ1dCBkYXRhXHJcbiAgICAgICAgY29uc3QgbG9nc0RhdGEgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmNvbWJhdExvZ3M7XHJcbiAgICAgICAgaWYgKGxvZ3NEYXRhKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ3MgPSBKU09OLnBhcnNlKGxvZ3NEYXRhKTtcclxuICAgICAgICAgICAgfSBjYXRjaCAoZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc29sZS5lcnJvcignRXJyZXVyIHBhcnNpbmcgbG9nczonLCBlKTtcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gUsOpY3Vww6lyZXIgbGVzIMOpbMOpbWVudHNcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lciA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1sb2ddJyk7XHJcbiAgICAgICAgdGhpcy5vdmVybGF5ID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LW92ZXJsYXldJyk7XHJcbiAgICAgICAgdGhpcy5wbGF5QnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXBsYXldJyk7XHJcbiAgICAgICAgdGhpcy5za2lwQnRuID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LXNraXBdJyk7XHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1jb21iYXQtc3BlZWRdJyk7XHJcblxyXG4gICAgICAgIC8vIE1hcCBkZXMgcGVyc29ubmFnZXMgYXZlYyBzdG9ja2FnZSBkZXMgSFAgbWF4IGluaXRpYXV4XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJNYXhIUCA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyU2x1Z3MgPSB7fTtcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlckhhc0hlYWwgPSB7fTtcclxuICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnMgPSB7fTsgLy8gU3VpdmkgZGVzIGNvb2xkb3ducyBlbiBjb3Vyc1xyXG4gICAgICAgIHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNoYXJhY3Rlci1uYW1lXScpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJOYW1lO1xyXG4gICAgICAgICAgICBjb25zdCB0ZWFtID0gZWwuZGF0YXNldC5jaGFyYWN0ZXJUZWFtO1xyXG4gICAgICAgICAgICBjb25zdCBrZXkgPSBgJHt0ZWFtfS0ke25hbWV9YDtcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1trZXldID0gZWw7XHJcbiAgICAgICAgICAgIHRoaXMuY2hhcmFjdGVyU2x1Z3Nba2V5XSA9IGVsLmRhdGFzZXQuY2hhcmFjdGVyU2x1ZyB8fCAnJztcclxuICAgICAgICAgICAgdGhpcy5jaGFyYWN0ZXJIYXNIZWFsW2tleV0gPSBlbC5kYXRhc2V0Lmhhc0hlYWwgPT09ICd0cnVlJztcclxuXHJcbiAgICAgICAgICAgIC8vIEV4dHJhaXJlIGxlIEhQIG1heCBkZXB1aXMgbGUgdGV4dGUgaW5pdGlhbFxyXG4gICAgICAgICAgICBjb25zdCBocFRleHQgPSBlbC5xdWVyeVNlbGVjdG9yKCcuaHAtdGV4dCcpO1xyXG4gICAgICAgICAgICBpZiAoaHBUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IGhwVGV4dC50ZXh0Q29udGVudC5tYXRjaCgvKFxcZCspXFwvKFxcZCspLyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJhY3Rlck1heEhQW2tleV0gPSBwYXJzZUludChtYXRjaFsyXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gTWFwIGRlcyDDqWzDqW1lbnRzIGQnYWJpbGl0eSBkYW5zIGxlcyBpbmZvIHBhbmVsc1xyXG4gICAgICAgIHRoaXMuYWJpbGl0eUVsZW1lbnRzID0ge307XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnLmNoYXJhY3Rlci1pbmZvW2RhdGEtY2hhci1uYW1lXScpLmZvckVhY2goZWwgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gZWwuZGF0YXNldC5jaGFyTmFtZTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbSA9IGVsLmRhdGFzZXQuY2hhclRlYW07XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW19LSR7bmFtZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBhYmlsaXR5RWwgPSBlbC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX2FiaWxpdHknKTtcclxuICAgICAgICAgICAgaWYgKGFiaWxpdHlFbCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hYmlsaXR5RWxlbWVudHNba2V5XSA9IHtcclxuICAgICAgICAgICAgICAgICAgICBlbDogYWJpbGl0eUVsLFxyXG4gICAgICAgICAgICAgICAgICAgIG1heENkOiBwYXJzZUludChhYmlsaXR5RWwuZGF0YXNldC5hYmlsaXR5TWF4Q2QpIHx8IDAsXHJcbiAgICAgICAgICAgICAgICAgICAgYmFkZ2U6IGFiaWxpdHlFbC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX2FiaWxpdHktY2QtYmFkZ2UnKSxcclxuICAgICAgICAgICAgICAgICAgICBuYW1lRWw6IGFiaWxpdHlFbC5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX2FiaWxpdHktbmFtZScpLFxyXG4gICAgICAgICAgICAgICAgICAgIGljb25FbDogYWJpbGl0eUVsLnF1ZXJ5U2VsZWN0b3IoJ2knKSxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgLy8gQ2FjaGVyIGwnb3ZlcmxheVxyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVmlkZXIgbGUgbG9nXHJcbiAgICAgICAgaWYgKHRoaXMubG9nQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIExhbmNlciBhdXRvbWF0aXF1ZW1lbnQgYXByw6hzIHVuIGTDqWxhaVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wbGF5KCksIDgwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5wbGF5QnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlUGxheSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNraXBCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5za2lwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5za2lwKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5zZXRTcGVlZChlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcgJiYgIXRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NOZXh0TG9nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlUGxheSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nIHx8IHRoaXMuaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBza2lwKCkge1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBBZmZpY2hlciB0b3VzIGxlcyBsb2dzIHJlc3RhbnRzXHJcbiAgICAgICAgd2hpbGUgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBsb2cgPSB0aGlzLmxvZ3NbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlMb2cobG9nKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgICAgIHRoaXMudHJhY2tBYmlsaXR5Q29vbGRvd25zKGxvZyk7XHJcbiAgICAgICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2RlYXRoJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVhdGgobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNob3dWaWN0b3J5T3ZlcmxheSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNwZWVkKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3Qgc3BlZWQgPSBwYXJzZUZsb2F0KGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb21iYXRTcGVlZCk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBsJ1VJXHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMuZm9yRWFjaChidG4gPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NOZXh0TG9nKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcgfHwgdGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWaWN0b3J5T3ZlcmxheSgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbG9nID0gdGhpcy5sb2dzW3RoaXMuY3VycmVudEluZGV4XTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NMb2cobG9nKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxlciBsZSBkw6lsYWlcclxuICAgICAgICBsZXQgZGVsYXkgPSB0aGlzLmdldERlbGF5Rm9yTG9nKGxvZyk7XHJcbiAgICAgICAgZGVsYXkgPSBkZWxheSAvIHRoaXMuc3BlZWQ7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9jZXNzTmV4dExvZygpLCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGVsYXlGb3JMb2cobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdyb3VuZCc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdpbml0aWF0aXZlJzogcmV0dXJuIDYwMDtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzogcmV0dXJuIDMwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOiByZXR1cm4gMjgwMDtcclxuICAgICAgICAgICAgY2FzZSAnZGVmZW5kJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RvZGdlJzogcmV0dXJuIDIwMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzogcmV0dXJuIDM1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3QnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAndmljdG9yeSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2RyYXcnOiByZXR1cm4gMTUwMDtcclxuICAgICAgICAgICAgLy8gTm91dmVhdXggdHlwZXNcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfdGljayc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6IHJldHVybiAxNTAwO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVubmVkX3NraXAnOiByZXR1cm4gMTgwMDtcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6IHJldHVybiB0aGlzLmdldEFiaWxpdHlEZWxheShsb2cpO1xyXG4gICAgICAgICAgICBkZWZhdWx0OiByZXR1cm4gMTIwMDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0QWJpbGl0eURlbGF5KGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnN1YnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYmxlZWRfYXR0YWNrJzpcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JhY2tsaW5lX3N0cmlrZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2FybW9yX3BpZXJjZSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JvbnVzX3ZzX21hcmtlZCc6IHJldHVybiAzMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzogcmV0dXJuIDI1MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcmsnOiByZXR1cm4gMjAwMDtcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9idWZmJzpcclxuICAgICAgICAgICAgY2FzZSAnc2VsZl9idWZmJzpcclxuICAgICAgICAgICAgY2FzZSAnc3RlYWx0aCc6IHJldHVybiAyMDAwO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9oZWFsJzogcmV0dXJuIDI4MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3BhcnR5X2J1ZmYnOiByZXR1cm4gMjUwMDtcclxuICAgICAgICAgICAgY2FzZSAnZW1lcmdlbmN5X2hlYWwnOiByZXR1cm4gMjgwMDtcclxuICAgICAgICAgICAgY2FzZSAncHJvdGVjdF9kb2RnZSc6IHJldHVybiAyNTAwO1xyXG4gICAgICAgICAgICBjYXNlICd0cmFuc2Zvcm1fZGFtYWdlJzogcmV0dXJuIDE1MDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAyMDAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwcm9jZXNzTG9nKGxvZykge1xyXG4gICAgICAgIHRoaXMucGxheUFuaW1hdGlvbihsb2cpO1xyXG4gICAgICAgIHRoaXMuZGlzcGxheUxvZyhsb2cpO1xyXG5cclxuICAgICAgICAvLyBTeW5jaHJvbmlzZXIgbGEgbWlzZSDDoCBqb3VyIGRlcyBIUCBhdmVjIGwnYW5pbWF0aW9uXHJcbiAgICAgICAgY29uc3QgaHBEZWxheSA9IHRoaXMuZ2V0SFBVcGRhdGVEZWxheShsb2cpO1xyXG4gICAgICAgIGlmIChocERlbGF5ID4gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMudXBkYXRlSGVhbHRoQmFycyhsb2cpLCBocERlbGF5IC8gdGhpcy5zcGVlZCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBTdWl2aSBkZXMgY29vbGRvd25zXHJcbiAgICAgICAgdGhpcy50cmFja0FiaWxpdHlDb29sZG93bnMobG9nKTtcclxuICAgIH1cclxuXHJcbiAgICB0cmFja0FiaWxpdHlDb29sZG93bnMobG9nKSB7XHJcbiAgICAgICAgLy8gUXVhbmQgdW5lIGNvbXDDqXRlbmNlIGVzdCB1dGlsaXPDqWUsIG1ldHRyZSBlbiBjb29sZG93blxyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2FiaWxpdHlfdXNlJyAmJiBsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgY29uc3QgYWJpbGl0eURhdGEgPSB0aGlzLmFiaWxpdHlFbGVtZW50c1trZXldO1xyXG4gICAgICAgICAgICBpZiAoYWJpbGl0eURhdGEgJiYgYWJpbGl0eURhdGEubWF4Q2QgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFiaWxpdHlDb29sZG93bnNba2V5XSA9IGFiaWxpdHlEYXRhLm1heENkO1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5KGtleSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEEgY2hhcXVlIG5vdXZlYXUgcm91bmQsIGTDqWNyw6ltZW50ZXIgdG91cyBsZXMgY29vbGRvd25zXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAncm91bmQnKSB7XHJcbiAgICAgICAgICAgIGZvciAoY29uc3Qga2V5IGluIHRoaXMuYWJpbGl0eUNvb2xkb3ducykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldID4gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldLS07XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy51cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5KGtleSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQWJpbGl0eUNvb2xkb3duRGlzcGxheShrZXkpIHtcclxuICAgICAgICBjb25zdCBhYmlsaXR5RGF0YSA9IHRoaXMuYWJpbGl0eUVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgaWYgKCFhYmlsaXR5RGF0YSkgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBjZCA9IHRoaXMuYWJpbGl0eUNvb2xkb3duc1trZXldIHx8IDA7XHJcblxyXG4gICAgICAgIGlmIChjZCA+IDApIHtcclxuICAgICAgICAgICAgLy8gRW4gY29vbGRvd24gOiBncmlzZXIgKyBhZmZpY2hlciBiYWRnZVxyXG4gICAgICAgICAgICBhYmlsaXR5RGF0YS5lbC5jbGFzc0xpc3QuYWRkKCdjaGFyYWN0ZXItaW5mb19fYWJpbGl0eS0tb24tY2QnKTtcclxuICAgICAgICAgICAgaWYgKGFiaWxpdHlEYXRhLmJhZGdlKSB7XHJcbiAgICAgICAgICAgICAgICBhYmlsaXR5RGF0YS5iYWRnZS50ZXh0Q29udGVudCA9IGAke2NkfVRgO1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eURhdGEuYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUnO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgLy8gUHLDqnQgOiByZXRpcmVyIGxlIGdyaXNcclxuICAgICAgICAgICAgYWJpbGl0eURhdGEuZWwuY2xhc3NMaXN0LnJlbW92ZSgnY2hhcmFjdGVyLWluZm9fX2FiaWxpdHktLW9uLWNkJyk7XHJcbiAgICAgICAgICAgIGlmIChhYmlsaXR5RGF0YS5iYWRnZSkge1xyXG4gICAgICAgICAgICAgICAgYWJpbGl0eURhdGEuYmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRIUFVwZGF0ZURlbGF5KGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6IHJldHVybiA0MDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzogcmV0dXJuIDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX3RpY2snOiByZXR1cm4gMjAwO1xyXG4gICAgICAgICAgICBjYXNlICdibGlnaHRfdGljayc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGNhc2UgJ3JpcG9zdGVfYWN0aXZhdGUnOiByZXR1cm4gMzUwO1xyXG4gICAgICAgICAgICBjYXNlICdhYmlsaXR5X3VzZSc6IHJldHVybiB0aGlzLmdldEFiaWxpdHlIUERlbGF5KGxvZyk7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBnZXRBYmlsaXR5SFBEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsaWdodF9hdHRhY2snOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICBjYXNlICdzdHVuJzogcmV0dXJuIDM1MDtcclxuICAgICAgICAgICAgY2FzZSAncGFydHlfaGVhbCc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzogcmV0dXJuIDQwMDtcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6IHJldHVybiAyMDA7XHJcbiAgICAgICAgICAgIGRlZmF1bHQ6IHJldHVybiAwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QW5pbWF0aW9uKGxvZykge1xyXG4gICAgICAgIHN3aXRjaCAobG9nLnR5cGUpIHtcclxuICAgICAgICAgICAgY2FzZSAnYXR0YWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuYXR0YWNrZXIsIGxvZy5hdHRhY2tlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCBsb2cuaXNDcml0KTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUhlYWwobG9nLmhlYWxlciwgbG9nLmhlYWxlclRlYW0sIGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVmZW5kKGxvZy5kZWZlbmRlciwgbG9nLmRlZmVuZGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9kZ2UobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURlYXRoKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAvLyBOb3V2ZWF1eCB0eXBlc1xyXG4gICAgICAgICAgICBjYXNlICdibGVlZF90aWNrJzpcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJyk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X3RpY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRG9UKGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtLCAnYmxpZ2h0ZWQnKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdHVubmVkX3NraXAnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlU3R1bm5lZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9hY3RpdmF0ZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVBdHRhY2sobG9nLmF0dGFja2VyLCBsb2cuYXR0YWNrZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2FiaWxpdHlfdXNlJzpcclxuICAgICAgICAgICAgICAgIHRoaXMucGxheUFiaWxpdHlBbmltYXRpb24obG9nKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT0gTk9VVkVMTEVTIEFOSU1BVElPTlMgPT09XHJcblxyXG4gICAgYW5pbWF0ZURvVCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtLCBkb3RDbGFzcykge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKGRvdENsYXNzKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZShkb3RDbGFzcyksIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlU3R1bm5lZCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ3N0dW5uZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc3R1bm5lZCcpLCAxNDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZU1hcmtlZCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ21hcmtlZCcpO1xyXG4gICAgICAgICAgICAvLyBMYSBtYXJxdWUgcmVzdGUgdmlzaWJsZSBwbHVzIGxvbmd0ZW1wc1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdtYXJrZWQnKSwgMjAwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVCdWZmKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnYnVmZmVkJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2J1ZmZlZCcpLCAxNDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVN0ZWFsdGgodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdzdGVhbHRoZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnc3RlYWx0aGVkJyksIDE1MDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBwbGF5QWJpbGl0eUFuaW1hdGlvbihsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy5zdWJ0eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2JsZWVkX2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsZWVkaW5nJyksIDcwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnYmxpZ2h0X2F0dGFjayc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZURvVChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgJ2JsaWdodGVkJyksIDcwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnc3R1bic6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLmNhc3RlciAmJiBsb2cuY2FzdGVyVGVhbSkgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtLCBsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRoaXMuYW5pbWF0ZVN0dW5uZWQobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pLCA3MDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ21hcmsnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBtYXJrS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShtYXJrS2V5LCAnc2tpbGwud2VicCcsIDE0MDApO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZUJ1ZmYobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy50YXJnZXQgJiYgbG9nLnRhcmdldFRlYW0pIHRoaXMuYW5pbWF0ZU1hcmtlZChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAncmlwb3N0ZV9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgcmlwb3N0ZUtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUocmlwb3N0ZUtleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzZWxmX2J1ZmYnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBzZWxmQnVmZktleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICAvLyBBYm9taW5hdGlvbiBUcmFuc2Zvcm1hdGlvbiA6IHN3aXRjaCBzbHVnIHRvIGJlYXN0IHBlcm1hbmVudGx5XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvZy5hYmlsaXR5TmFtZSA9PT0gJ1RyYW5zZm9ybWF0aW9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJhY3RlclNsdWdzW3NlbGZCdWZmS2V5XSA9ICdiZWFzdCc7XHJcbiAgICAgICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShzZWxmQnVmZktleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVCdWZmKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9oZWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuaW1lciB0b3VzIGxlcyBhbGxpw6lzIHNvaWduw6lzXHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKGxvZy5oZWFsZWQpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgbG9nLmhlYWxlZC5mb3JFYWNoKGggPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoaC5uYW1lLCBoLnRlYW0pO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGVsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaGVhbGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsZWQnKSwgMTUwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdwYXJ0eV9idWZmJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3QgcGFydHlCdWZmS2V5ID0gYCR7bG9nLmNhc3RlclRlYW19LSR7bG9nLmNhc3Rlcn1gO1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShwYXJ0eUJ1ZmZLZXksICdza2lsbC53ZWJwJywgMTQwMCk7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQnVmZihsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAvLyBBbmltZXIgdG91cyBsZXMgYWxsacOpcyBkdSBtw6ptZSBjw7R0w6lcclxuICAgICAgICAgICAgICAgIHRoaXMuYW5pbWF0ZVRlYW1CdWZmKGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdzdGVhbHRoJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc3Qgc3RlYWx0aEtleSA9IGAke2xvZy5jYXN0ZXJUZWFtfS0ke2xvZy5jYXN0ZXJ9YDtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoc3RlYWx0aEtleSwgJ3NraWxsLndlYnAnLCAxNDAwKTtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVTdGVhbHRoKGxvZy5jYXN0ZXIsIGxvZy5jYXN0ZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdhcm1vcl9waWVyY2UnOlxyXG4gICAgICAgICAgICBjYXNlICdiYWNrbGluZV9zdHJpa2UnOlxyXG4gICAgICAgICAgICBjYXNlICdib251c192c19tYXJrZWQnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZUF0dGFjayhsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy5pc0NyaXQgfHwgZmFsc2UpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2VtZXJnZW5jeV9oZWFsJzpcclxuICAgICAgICAgICAgICAgIGlmIChsb2cuY2FzdGVyICYmIGxvZy5jYXN0ZXJUZWFtKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSwgbG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ3Byb3RlY3RfZG9kZ2UnOlxyXG4gICAgICAgICAgICAgICAgaWYgKGxvZy5jYXN0ZXIgJiYgbG9nLmNhc3RlclRlYW0pIHRoaXMuYW5pbWF0ZURlZmVuZChsb2cuY2FzdGVyLCBsb2cuY2FzdGVyVGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAndHJhbnNmb3JtX2RhbWFnZSc6XHJcbiAgICAgICAgICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0VGVhbSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGVsID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGxvZy50YXJnZXQsIGxvZy50YXJnZXRUZWFtKTtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnKSwgODAwKTtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZVRlYW1CdWZmKGNhc3RlclRlYW0pIHtcclxuICAgICAgICBPYmplY3Qua2V5cyh0aGlzLmNoYXJhY3RlckVsZW1lbnRzKS5mb3JFYWNoKGtleSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChrZXkuc3RhcnRzV2l0aChjYXN0ZXJUZWFtKSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZWwgPSB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV07XHJcbiAgICAgICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKCdidWZmZWQnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gZWwuY2xhc3NMaXN0LnJlbW92ZSgnYnVmZmVkJyksIDE0MDApO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IFNQUklURSBTV0FQID09PVxyXG5cclxuICAgIHN3YXBTcHJpdGUoa2V5LCBzcHJpdGVOYW1lLCBkdXJhdGlvbikge1xyXG4gICAgICAgIGNvbnN0IGVsID0gdGhpcy5jaGFyYWN0ZXJFbGVtZW50c1trZXldO1xyXG4gICAgICAgIGlmICghZWwpIHJldHVybjtcclxuICAgICAgICBjb25zdCBzbHVnID0gdGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldO1xyXG4gICAgICAgIGlmICghc2x1ZykgcmV0dXJuO1xyXG4gICAgICAgIGNvbnN0IGltZyA9IGVsLnF1ZXJ5U2VsZWN0b3IoJy5jaGFyYWN0ZXItc3ByaXRlJyk7XHJcbiAgICAgICAgaWYgKCFpbWcpIHJldHVybjtcclxuICAgICAgICBpbWcuc3JjID0gYC9hc3NldC9pbWcvY29tYmF0LyR7c2x1Z30vJHtzcHJpdGVOYW1lfWA7XHJcbiAgICAgICAgaWYgKGR1cmF0aW9uID4gMCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGlmICghZWwuY2xhc3NMaXN0LmNvbnRhaW5zKCdkZWFkJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBpbWcuc3JjID0gYC9hc3NldC9pbWcvY29tYmF0LyR7dGhpcy5jaGFyYWN0ZXJTbHVnc1trZXldfS9maWdodGlkbGUud2VicGA7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGR1cmF0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09IEFOSU1BVElPTlMgRVhJU1RBTlRFUyA9PT1cclxuXHJcbiAgICBhbmltYXRlQXR0YWNrKGF0dGFja2VyTmFtZSwgYXR0YWNrZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtLCBpc0NyaXQpIHtcclxuICAgICAgICBjb25zdCBhdHRhY2tlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChhdHRhY2tlck5hbWUsIGF0dGFja2VyVGVhbSk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG5cclxuICAgICAgICBpZiAoYXR0YWNrZXIpIHtcclxuICAgICAgICAgICAgY29uc3Qga2V5ID0gYCR7YXR0YWNrZXJUZWFtfS0ke2F0dGFja2VyTmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLnN3YXBTcHJpdGUoa2V5LCAnYXR0YWNrYW5pbWF0aW9uLndlYnAnLCAxMjAwKTtcclxuICAgICAgICAgICAgYXR0YWNrZXIuY2xhc3NMaXN0LmFkZCgnYXR0YWNraW5nJyk7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gYXR0YWNrZXIuY2xhc3NMaXN0LnJlbW92ZSgnYXR0YWNraW5nJyksIDEyMDApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdodXJ0Jyk7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNDcml0KSB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnY3JpdCcpO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaHVydCcsICdjcml0JyksIDgwMCk7XHJcbiAgICAgICAgICAgIH0sIDUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVIZWFsKGhlYWxlck5hbWUsIGhlYWxlclRlYW0sIHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCBoZWFsZXIgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoaGVhbGVyTmFtZSwgaGVhbGVyVGVhbSk7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG5cclxuICAgICAgICBpZiAoaGVhbGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2hlYWxlclRlYW19LSR7aGVhbGVyTmFtZX1gO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5jaGFyYWN0ZXJIYXNIZWFsW2tleV0pIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShrZXksICdoZWFsaW5nLndlYnAnLCAxNTAwKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc3dhcFNwcml0ZShrZXksICdza2lsbC53ZWJwJywgMTUwMCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaGVhbGVyLmNsYXNzTGlzdC5hZGQoJ2hlYWxpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBoZWFsZXIuY2xhc3NMaXN0LnJlbW92ZSgnaGVhbGluZycpLCAxNTAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2hlYWxlZCcpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsZWQnKSwgMTUwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEZWZlbmQoZGVmZW5kZXJOYW1lLCBkZWZlbmRlclRlYW0pIHtcclxuICAgICAgICBjb25zdCBkZWZlbmRlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChkZWZlbmRlck5hbWUsIGRlZmVuZGVyVGVhbSk7XHJcbiAgICAgICAgaWYgKGRlZmVuZGVyKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke2RlZmVuZGVyVGVhbX0tJHtkZWZlbmRlck5hbWV9YDtcclxuICAgICAgICAgICAgdGhpcy5zd2FwU3ByaXRlKGtleSwgJ2RlZmVuZGluZy53ZWJwJywgMTgwMCk7XHJcbiAgICAgICAgICAgIGRlZmVuZGVyLmNsYXNzTGlzdC5hZGQoJ2RlZmVuZGluZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGRlZmVuZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlZmVuZGluZycpLCAxODAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURvZGdlKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZG9kZ2luZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkb2RnaW5nJyksIDEwMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlRGVhdGgodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSkge1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdkZWFkJyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGdldENoYXJhY3RlckVsZW1lbnQobmFtZSwgdGVhbSkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2Ake3RlYW19LSR7bmFtZX1gXTtcclxuICAgIH1cclxuXHJcbiAgICBkaXNwbGF5TG9nKGxvZykge1xyXG4gICAgICAgIGlmICghdGhpcy5sb2dDb250YWluZXIpIHJldHVybjtcclxuXHJcbiAgICAgICAgY29uc3QgZW50cnkgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdwJyk7XHJcbiAgICAgICAgZW50cnkuY2xhc3NOYW1lID0gJ2NvbWJhdC1sb2dfX2VudHJ5JztcclxuXHJcbiAgICAgICAgaWYgKGxvZy50eXBlID09PSAncm91bmQnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1yb3VuZCcpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICd2aWN0b3J5Jykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tdmljdG9yeScpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdkcmF3Jykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tZGVmZWF0Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2FiaWxpdHlfdXNlJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tYWJpbGl0eScpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdibGVlZF90aWNrJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tYmxlZWQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnYmxpZ2h0X3RpY2snKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1ibGlnaHQnKTtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnc3R1bm5lZF9za2lwJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tc3R1bicpO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdyaXBvc3RlX2FjdGl2YXRlJykge1xyXG4gICAgICAgICAgICBlbnRyeS5jbGFzc0xpc3QuYWRkKCdjb21iYXQtbG9nX19lbnRyeS0tcmlwb3N0ZScpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgZW50cnkuaW5uZXJIVE1MID0gbG9nLm1lc3NhZ2U7XHJcbiAgICAgICAgdGhpcy5sb2dDb250YWluZXIuYXBwZW5kQ2hpbGQoZW50cnkpO1xyXG4gICAgICAgIHRoaXMubG9nQ29udGFpbmVyLnNjcm9sbFRvcCA9IHRoaXMubG9nQ29udGFpbmVyLnNjcm9sbEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVIZWFsdGhCYXJzKGxvZykge1xyXG4gICAgICAgIGxldCBjaGFyYWN0ZXJOYW1lID0gbnVsbDtcclxuICAgICAgICBsZXQgdGVhbU5hbWUgPSBudWxsO1xyXG4gICAgICAgIGxldCBjdXJyZW50SFAgPSBudWxsO1xyXG4gICAgICAgIGxldCBtYXhIUCA9IG51bGw7XHJcblxyXG4gICAgICAgIC8vIETDqXRlcm1pbmVyIGxlcyBkb25uw6llcyBzZWxvbiBsZSB0eXBlIGRlIGxvZ1xyXG4gICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2F0dGFjaycgfHwgbG9nLnR5cGUgPT09ICdyaXBvc3RlX2FjdGl2YXRlJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICB9IGVsc2UgaWYgKGxvZy50eXBlID09PSAnaGVhbCcpIHtcclxuICAgICAgICAgICAgY2hhcmFjdGVyTmFtZSA9IGxvZy50YXJnZXQ7XHJcbiAgICAgICAgICAgIHRlYW1OYW1lID0gbG9nLnRhcmdldFRlYW07XHJcbiAgICAgICAgICAgIGN1cnJlbnRIUCA9IGxvZy50YXJnZXRIUDtcclxuICAgICAgICAgICAgbWF4SFAgPSBsb2cudGFyZ2V0TWF4SFA7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2JsZWVkX3RpY2snIHx8IGxvZy50eXBlID09PSAnYmxpZ2h0X3RpY2snKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdhYmlsaXR5X3VzZScpIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVBYmlsaXR5SGVhbHRoQmFycyhsb2cpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBzaSBub3VzIGF2b25zIGxlcyBkb25uw6llcyBuw6ljZXNzYWlyZXNcclxuICAgICAgICBpZiAoY2hhcmFjdGVyTmFtZSAmJiB0ZWFtTmFtZSAmJiBjdXJyZW50SFAgIT09IG51bGwgJiYgY3VycmVudEhQICE9PSB1bmRlZmluZWQgJiYgbWF4SFApIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCBtYXhIUCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUFiaWxpdHlIZWFsdGhCYXJzKGxvZykge1xyXG4gICAgICAgIC8vIENvbXDDqXRlbmNlcyBxdWkgaW5mbGlnZW50IGRlcyBkw6lnw6J0cyDDoCB1bmUgY2libGVcclxuICAgICAgICBpZiAobG9nLnRhcmdldCAmJiBsb2cudGFyZ2V0SFAgIT09IHVuZGVmaW5lZCAmJiBsb2cudGFyZ2V0TWF4SFApIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSwgbG9nLnRhcmdldEhQLCBsb2cudGFyZ2V0TWF4SFApO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU29pbiBkZSBncm91cGUgOiBtZXR0cmUgw6Agam91ciBjaGFxdWUgYWxsacOpIHNvaWduw6lcclxuICAgICAgICBpZiAobG9nLnN1YnR5cGUgPT09ICdwYXJ0eV9oZWFsJyAmJiBsb2cuaGVhbGVkKSB7XHJcbiAgICAgICAgICAgIGxvZy5oZWFsZWQuZm9yRWFjaChoID0+IHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAoaC5uYW1lLCBoLnRlYW0sIGguaHAsIGgubWF4SHApO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIFNvaW4gZCd1cmdlbmNlIDogbWV0dHJlIMOgIGpvdXIgbGUgbGFuY2V1clxyXG4gICAgICAgIGlmIChsb2cuc3VidHlwZSA9PT0gJ2VtZXJnZW5jeV9oZWFsJyAmJiBsb2cuY2FzdGVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlQ2hhcmFjdGVySFAobG9nLmNhc3RlciwgbG9nLmNhc3RlclRlYW0sIGxvZy50YXJnZXRIUCwgbG9nLnRhcmdldE1heEhQKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlQ2hhcmFjdGVySFAoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCwgbWF4SFApIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUpO1xyXG5cclxuICAgICAgICBpZiAoIXRhcmdldCkge1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwZXJjZW50ID0gbWF4SFAgPiAwID8gKGN1cnJlbnRIUCAvIG1heEhQKSAqIDEwMCA6IDA7XHJcblxyXG4gICAgICAgIC8vIE1pc2Ugw6Agam91ciBkZSBsYSBiYXJyZSBIUCBkYW5zIGxhIHpvbmUgZGUgY29tYmF0IChiYXR0bGUtc3RhZ2UpXHJcbiAgICAgICAgY29uc3QgaHBCYXIgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmhwLWJhcl9fZmlsbCcpO1xyXG4gICAgICAgIGNvbnN0IGhwVGV4dCA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuaHAtdGV4dCcpO1xyXG5cclxuICAgICAgICBpZiAoaHBCYXIpIHtcclxuICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGZsdWlkZSBkZSBsYSBiYXJyZVxyXG4gICAgICAgICAgICBocEJhci5zdHlsZS50cmFuc2l0aW9uID0gYHdpZHRoIDAuM3MgZWFzZS1vdXRgO1xyXG4gICAgICAgICAgICBocEJhci5zdHlsZS53aWR0aCA9IGAke3BlcmNlbnR9JWA7XHJcblxyXG4gICAgICAgICAgICAvLyBDbGFzc2VzIGRlIGNvdWxldXIgc2Vsb24gbGUgcG91cmNlbnRhZ2VcclxuICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LnJlbW92ZSgnaHAtYmFyX19maWxsLS1sb3cnLCAnaHAtYmFyX19maWxsLS1jcml0aWNhbCcpO1xyXG4gICAgICAgICAgICBpZiAocGVyY2VudCA8PSAyNSkge1xyXG4gICAgICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LmFkZCgnaHAtYmFyX19maWxsLS1jcml0aWNhbCcpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBlcmNlbnQgPD0gNTApIHtcclxuICAgICAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5hZGQoJ2hwLWJhcl9fZmlsbC0tbG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChocFRleHQpIHtcclxuICAgICAgICAgICAgaHBUZXh0LnRleHRDb250ZW50ID0gYCR7Y3VycmVudEhQfS8ke21heEhQfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNaXNlIMOgIGpvdXIgZGVzIHBhbm5lYXV4IGQnaW5mbyBsYXTDqXJhdXhcclxuICAgICAgICB0aGlzLnVwZGF0ZUluZm9QYW5lbChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVJbmZvUGFuZWwoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCkge1xyXG4gICAgICAgIC8vIFRyb3V2ZXIgbGUgYm9uIHBhbm5lYXUgc2Vsb24gbCfDqXF1aXBlXHJcbiAgICAgICAgY29uc3QgcGFuZWxDbGFzcyA9IHRlYW1OYW1lID09PSAnRXF1aXBlIDEnID8gJy5pbmZvLXBhbmVsLS10ZWFtMScgOiAnLmluZm8tcGFuZWwtLXRlYW0yJztcclxuICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IocGFuZWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGlmICghcGFuZWwpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gVHJvdXZlciBsZSBwZXJzb25uYWdlIGRhbnMgbGUgcGFubmVhdSBwYXIgc29uIG5vbVxyXG4gICAgICAgIGNvbnN0IGNoYXJhY3RlckluZm9zID0gcGFuZWwucXVlcnlTZWxlY3RvckFsbCgnLmNoYXJhY3Rlci1pbmZvJyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBpbmZvIG9mIGNoYXJhY3RlckluZm9zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWVFbCA9IGluZm8ucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19uYW1lJyk7XHJcbiAgICAgICAgICAgIGlmIChuYW1lRWwgJiYgbmFtZUVsLnRleHRDb250ZW50LnRyaW0oKSA9PT0gY2hhcmFjdGVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHNTcGFuID0gaW5mby5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX3N0YXRzIHNwYW4nKTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0c1NwYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0c1NwYW4udGV4dENvbnRlbnQgPSBjdXJyZW50SFA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuaW1hdGlvbiBmbGFzaCBwb3VyIG1vbnRyZXIgbGUgY2hhbmdlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzU3Bhbi5jbGFzc0xpc3QuYWRkKCdocC11cGRhdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzdGF0c1NwYW4uY2xhc3NMaXN0LnJlbW92ZSgnaHAtdXBkYXRlZCcpLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ZpY3RvcnlPdmVybGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEZpbmFsaXNlciBsZSBNTVIgYSBsYSBmaW4gZHUgY29tYmF0XHJcbiAgICAgICAgdGhpcy5maW5hbGl6ZVJhdGluZygpO1xyXG4gICAgfVxyXG5cclxuICAgIGZpbmFsaXplUmF0aW5nKCkge1xyXG4gICAgICAgIGNvbnN0IGZpbmFsaXplVXJsID0gdGhpcy5jb250YWluZXIuZGF0YXNldC5maW5hbGl6ZVVybDtcclxuICAgICAgICBpZiAoIWZpbmFsaXplVXJsKSByZXR1cm47XHJcblxyXG4gICAgICAgIGZldGNoKGZpbmFsaXplVXJsLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9LFxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MgJiYgZGF0YS5yYXRpbmdDaGFuZ2UgIT09IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuc2hvd1JhdGluZ1VwZGF0ZShkYXRhLnJhdGluZ0NoYW5nZSwgZGF0YS5uZXdSYXRpbmcsIGRhdGEubmV3UmF0aW5nMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaChlcnIgPT4gY29uc29sZS5lcnJvcignRXJyZXVyIGZpbmFsaXNhdGlvbiByYXRpbmc6JywgZXJyKSk7XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1JhdGluZ1VwZGF0ZShjaGFuZ2UsIG5ld1JhdGluZywgbmV3UmF0aW5nMikge1xyXG4gICAgICAgIC8vIE1ldHRyZSBhIGpvdXIgbGUgTU1SIGFmZmljaGUgZGFucyBsZSBwYW5uZWF1IGpvdWV1ciAoRXF1aXBlIDEpXHJcbiAgICAgICAgY29uc3QgcmF0aW5nRWwgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW5mby1wYW5lbC0tdGVhbTEgLmluZm8tcGFuZWxfX3JhdGluZycpO1xyXG4gICAgICAgIGlmIChyYXRpbmdFbCAmJiBuZXdSYXRpbmcgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmF0aW5nRWwuaW5uZXJIVE1MID0gYDxpIGNsYXNzPVwiZmFzIGZhLXRyb3BoeVwiPjwvaT4gJHtuZXdSYXRpbmd9IE1NUmA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNZXR0cmUgYSBqb3VyIGxlIE1NUiBhZmZpY2hlIGRhbnMgbGUgcGFubmVhdSBhZHZlcnNhaXJlIChFcXVpcGUgMilcclxuICAgICAgICBjb25zdCByYXRpbmdFbDIgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCcuaW5mby1wYW5lbC0tdGVhbTIgLmluZm8tcGFuZWxfX3JhdGluZy0tZW5lbXknKTtcclxuICAgICAgICBpZiAocmF0aW5nRWwyICYmIG5ld1JhdGluZzIgIT09IG51bGwpIHtcclxuICAgICAgICAgICAgcmF0aW5nRWwyLmlubmVySFRNTCA9IGA8aSBjbGFzcz1cImZhcyBmYS10cm9waHlcIj48L2k+ICR7bmV3UmF0aW5nMn0gTU1SYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIC8vIEFmZmljaGVyIGxhIG5vdGlmaWNhdGlvbiBkZSBjaGFuZ2VtZW50IGRhbnMgbCdvdmVybGF5XHJcbiAgICAgICAgY29uc3Qgb3ZlcmxheSA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1vdmVybGF5XScpO1xyXG4gICAgICAgIGlmIChvdmVybGF5KSB7XHJcbiAgICAgICAgICAgIGNvbnN0IHdpbm5lckRpdiA9IG92ZXJsYXkucXVlcnlTZWxlY3RvcignLmJhdHRsZS1zdGFnZV9fd2lubmVyJyk7XHJcblxyXG4gICAgICAgICAgICAvLyBDaGFuZ2VtZW50IE1NUiBFcXVpcGUgMVxyXG4gICAgICAgICAgICBjb25zdCBub3RpZjEgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcclxuICAgICAgICAgICAgbm90aWYxLmNsYXNzTmFtZSA9ICdyYXRpbmctY2hhbmdlJztcclxuICAgICAgICAgICAgbm90aWYxLnN0eWxlLmNzc1RleHQgPSAnZm9udC1zaXplOjEuMnJlbTttYXJnaW4tdG9wOjEycHg7Zm9udC13ZWlnaHQ6Ym9sZDtvcGFjaXR5OjA7dHJhbnNpdGlvbjpvcGFjaXR5IDAuNXM7JztcclxuICAgICAgICAgICAgbm90aWYxLnRleHRDb250ZW50ID0gY2hhbmdlID4gMCA/IGBFcXVpcGUgMSA6ICske2NoYW5nZX0gTU1SYCA6IGBFcXVpcGUgMSA6ICR7Y2hhbmdlfSBNTVJgO1xyXG4gICAgICAgICAgICBub3RpZjEuc3R5bGUuY29sb3IgPSBjaGFuZ2UgPiAwID8gJyM0Y2FmNTAnIDogJyNmNDQzMzYnO1xyXG4gICAgICAgICAgICB3aW5uZXJEaXYuYXBwZW5kQ2hpbGQobm90aWYxKTtcclxuXHJcbiAgICAgICAgICAgIC8vIENoYW5nZW1lbnQgTU1SIEVxdWlwZSAyIChpbnZlcnNlKVxyXG4gICAgICAgICAgICBjb25zdCBjaGFuZ2UyID0gLWNoYW5nZTtcclxuICAgICAgICAgICAgY29uc3Qgbm90aWYyID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIG5vdGlmMi5jbGFzc05hbWUgPSAncmF0aW5nLWNoYW5nZSc7XHJcbiAgICAgICAgICAgIG5vdGlmMi5zdHlsZS5jc3NUZXh0ID0gJ2ZvbnQtc2l6ZToxLjJyZW07bWFyZ2luLXRvcDo2cHg7Zm9udC13ZWlnaHQ6Ym9sZDtvcGFjaXR5OjA7dHJhbnNpdGlvbjpvcGFjaXR5IDAuNXM7JztcclxuICAgICAgICAgICAgbm90aWYyLnRleHRDb250ZW50ID0gY2hhbmdlMiA+IDAgPyBgRXF1aXBlIDIgOiArJHtjaGFuZ2UyfSBNTVJgIDogYEVxdWlwZSAyIDogJHtjaGFuZ2UyfSBNTVJgO1xyXG4gICAgICAgICAgICBub3RpZjIuc3R5bGUuY29sb3IgPSBjaGFuZ2UyID4gMCA/ICcjNGNhZjUwJyA6ICcjZjQ0MzM2JztcclxuICAgICAgICAgICAgd2lubmVyRGl2LmFwcGVuZENoaWxkKG5vdGlmMik7XHJcblxyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIG5vdGlmMS5zdHlsZS5vcGFjaXR5ID0gJzEnO1xyXG4gICAgICAgICAgICAgICAgbm90aWYyLnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgIH0sIDEwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZVBsYXlCdXR0b24oKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnBsYXlCdG4pIHJldHVybjtcclxuXHJcbiAgICAgICAgaWYgKHRoaXMuaXNQbGF5aW5nICYmICF0aGlzLmlzUGF1c2VkKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9ICdQYXVzZSc7XHJcbiAgICAgICAgfSBlbHNlIGlmICh0aGlzLmN1cnJlbnRJbmRleCA+PSB0aGlzLmxvZ3MubGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi50ZXh0Q29udGVudCA9ICdUZXJtaW7DqSc7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gdGhpcy5jdXJyZW50SW5kZXggPiAwID8gJ1JlcHJlbmRyZScgOiAnTGFuY2VyJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIEluaXRpYWxpc2VyIHF1YW5kIGxlIERPTSBlc3QgcHLDqnRcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IGNvbWJhdENvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWNvbWJhdC1sb2dzXScpO1xyXG4gICAgaWYgKGNvbWJhdENvbnRhaW5lcikge1xyXG4gICAgICAgIG5ldyBDb21iYXRDb250cm9sbGVyKGNvbWJhdENvbnRhaW5lcik7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tYmF0Q29udHJvbGxlcjtcclxuIiwiLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgRlJJRU5EIFNZU1RFTVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuZnVuY3Rpb24gZXNjYXBlSHRtbChzdHIpIHtcclxuICAgIGNvbnN0IGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgZGl2LnRleHRDb250ZW50ID0gc3RyO1xyXG4gICAgcmV0dXJuIGRpdi5pbm5lckhUTUw7XHJcbn1cclxuXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCAoKSA9PiB7XHJcbiAgICBjb25zdCB0b2dnbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXRvZ2dsZV0nKTtcclxuICAgIGNvbnN0IHBhbmVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1wYW5lbF0nKTtcclxuICAgIGNvbnN0IGJhY2tkcm9wID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1iYWNrZHJvcF0nKTtcclxuICAgIGNvbnN0IGNsb3NlQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1jbG9zZV0nKTtcclxuICAgIGNvbnN0IGJhZGdlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtZnJpZW5kcy1iYWRnZV0nKTtcclxuXHJcbiAgICBpZiAoIXRvZ2dsZSB8fCAhcGFuZWwpIHJldHVybjtcclxuXHJcbiAgICBsZXQgcGFuZWxPcGVuID0gZmFsc2U7XHJcbiAgICBsZXQgY3VycmVudFRhYiA9ICdmcmllbmRzJztcclxuICAgIGxldCBjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkID0gbnVsbDtcclxuICAgIGxldCBsYXN0TWVzc2FnZUlkID0gMDtcclxuICAgIGxldCBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgIGxldCB1bnJlYWRQb2xsaW5nSW50ZXJ2YWwgPSBudWxsO1xyXG4gICAgbGV0IGZyaWVuZHNMb2FkZWQgPSBmYWxzZTtcclxuICAgIGxldCByZXF1ZXN0c0xvYWRlZCA9IGZhbHNlO1xyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gUEFORUwgT1BFTi9DTE9TRVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBvcGVuUGFuZWwoKSB7XHJcbiAgICAgICAgcGFuZWwuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ2Jsb2NrJztcclxuICAgICAgICBwYW5lbC5vZmZzZXRIZWlnaHQ7IC8vIHJlZmxvd1xyXG4gICAgICAgIHBhbmVsLmNsYXNzTGlzdC5hZGQoJ2ZyaWVuZHMtcGFuZWwtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QuYWRkKCdmcmllbmRzLXBhbmVsX19iYWNrZHJvcC0tb3BlbicpO1xyXG4gICAgICAgIHBhbmVsT3BlbiA9IHRydWU7XHJcblxyXG4gICAgICAgIGlmICghZnJpZW5kc0xvYWRlZCkge1xyXG4gICAgICAgICAgICBsb2FkRnJpZW5kcygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBjbG9zZVBhbmVsKCkge1xyXG4gICAgICAgIHBhbmVsLmNsYXNzTGlzdC5yZW1vdmUoJ2ZyaWVuZHMtcGFuZWwtLW9wZW4nKTtcclxuICAgICAgICBiYWNrZHJvcC5jbGFzc0xpc3QucmVtb3ZlKCdmcmllbmRzLXBhbmVsX19iYWNrZHJvcC0tb3BlbicpO1xyXG4gICAgICAgIHBhbmVsT3BlbiA9IGZhbHNlO1xyXG4gICAgICAgIHN0b3BNZXNzYWdlUG9sbGluZygpO1xyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICBwYW5lbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgICAgICBiYWNrZHJvcC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIH0sIDMwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gcGFuZWxPcGVuID8gY2xvc2VQYW5lbCgpIDogb3BlblBhbmVsKCkpO1xyXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBhbmVsKTtcclxuICAgIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQYW5lbCk7XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBUQUJTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWZyaWVuZHMtdGFiXScpLmZvckVhY2godGFiQnRuID0+IHtcclxuICAgICAgICB0YWJCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IHRhYk5hbWUgPSB0YWJCdG4uZGF0YXNldC5mcmllbmRzVGFiO1xyXG4gICAgICAgICAgICBzd2l0Y2hUYWIodGFiTmFtZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9KTtcclxuXHJcbiAgICBmdW5jdGlvbiBzd2l0Y2hUYWIodGFiTmFtZSkge1xyXG4gICAgICAgIGN1cnJlbnRUYWIgPSB0YWJOYW1lO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1mcmllbmRzLXRhYl0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QudG9nZ2xlKCdmcmllbmRzLXBhbmVsX190YWItLWFjdGl2ZScsIGJ0bi5kYXRhc2V0LmZyaWVuZHNUYWIgPT09IHRhYk5hbWUpO1xyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS10YWItY29udGVudF0nKS5mb3JFYWNoKGNvbnRlbnQgPT4ge1xyXG4gICAgICAgICAgICBjb250ZW50LnN0eWxlLmRpc3BsYXkgPSBjb250ZW50LmRhdGFzZXQudGFiQ29udGVudCA9PT0gdGFiTmFtZSA/ICdibG9jaycgOiAnbm9uZSc7XHJcbiAgICAgICAgfSk7XHJcblxyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mcmllbmRzLXBhbmVsX190YWJzJykuc3R5bGUuZGlzcGxheSA9ICdmbGV4JztcclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fY29udGVudCcpLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xyXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtY29udmVyc2F0aW9uXScpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgc3RvcE1lc3NhZ2VQb2xsaW5nKCk7XHJcblxyXG4gICAgICAgIGlmICh0YWJOYW1lID09PSAnZnJpZW5kcycgJiYgIWZyaWVuZHNMb2FkZWQpIGxvYWRGcmllbmRzKCk7XHJcbiAgICAgICAgaWYgKHRhYk5hbWUgPT09ICdyZXF1ZXN0cycgJiYgIXJlcXVlc3RzTG9hZGVkKSBsb2FkUmVxdWVzdHMoKTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIExPQUQgRlJJRU5EUyBMSVNUXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGxvYWRGcmllbmRzKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRhaW5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXRhYi1jb250ZW50PVwiZnJpZW5kc1wiXScpO1xyXG4gICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+IENoYXJnZW1lbnQuLi48L2Rpdj4nO1xyXG5cclxuICAgICAgICBmZXRjaCgnL2ZyaWVuZHMvbGlzdCcsIHtcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGZyaWVuZHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5mcmllbmRzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+PGkgY2xhc3M9XCJmYXMgZmEtZ2hvc3RcIj48L2k+IEF1Y3VuIGNvbXBhZ25vbi4uLiBMZSBkb25qb24gZXN0IHNvbGl0YWlyZS48L3A+JztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGRhdGEuZnJpZW5kcy5tYXAoZiA9PiBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1cIiBkYXRhLWZyaWVuZC11c2VyLWlkPVwiJHtmLnVzZXJJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2YucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChmLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKGYudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChmLnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3ByZXZpZXdcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7Zi5sYXN0TWVzc2FnZVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gKGYubGFzdE1lc3NhZ2UuaXNGcm9tTWUgPyAnVm91czogJyA6ICcnKSArIGVzY2FwZUh0bWwoZi5sYXN0TWVzc2FnZS5jb250ZW50KVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJ0F1Y3VuIG1lc3NhZ2UnfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcmF0aW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke2YucmF0aW5nfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICBgKS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnRhaW5lci5xdWVyeVNlbGVjdG9yQWxsKCcuZnJpZW5kLWl0ZW0nKS5mb3JFYWNoKGl0ZW0gPT4ge1xyXG4gICAgICAgICAgICAgICAgaXRlbS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCB1c2VySWQgPSBwYXJzZUludChpdGVtLmRhdGFzZXQuZnJpZW5kVXNlcklkKTtcclxuICAgICAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gaXRlbS5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kLWl0ZW1fX25hbWUnKS50ZXh0Q29udGVudDtcclxuICAgICAgICAgICAgICAgICAgICBvcGVuQ29udmVyc2F0aW9uKHVzZXJJZCwgbmFtZSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfSlcclxuICAgICAgICAuY2F0Y2goKCkgPT4ge1xyXG4gICAgICAgICAgICBjb250YWluZXIuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5FcnJldXIgZGUgY2hhcmdlbWVudDwvcD4nO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgLy8gTE9BRCBQRU5ESU5HIFJFUVVFU1RTXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIGZ1bmN0aW9uIGxvYWRSZXF1ZXN0cygpIHtcclxuICAgICAgICBjb25zdCBjb250YWluZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS10YWItY29udGVudD1cInJlcXVlc3RzXCJdJyk7XHJcbiAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8ZGl2IGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fbG9hZGluZ1wiPjxpIGNsYXNzPVwiZmFzIGZhLXNwaW5uZXIgZmEtc3BpblwiPjwvaT4gQ2hhcmdlbWVudC4uLjwvZGl2Pic7XHJcblxyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy9wZW5kaW5nJywge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgcmVxdWVzdHNMb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICBpZiAoZGF0YS5yZXF1ZXN0cy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIGNvbnRhaW5lci5pbm5lckhUTUwgPSAnPHAgY2xhc3M9XCJmcmllbmRzLXBhbmVsX19lbXB0eVwiPkF1Y3VuZSBkZW1hbmRlIGVuIGF0dGVudGU8L3A+JztcclxuICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9IGRhdGEucmVxdWVzdHMubWFwKHIgPT4gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtXCIgZGF0YS1yZXF1ZXN0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2F2YXRhclwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke3IucHJvZmlsZUltYWdlXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA/IGA8aW1nIHNyYz1cIiR7ZXNjYXBlSHRtbChyLnByb2ZpbGVJbWFnZSl9XCIgYWx0PVwiJHtlc2NhcGVIdG1sKHIudXNlcm5hbWUpfVwiPmBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDogJzxpIGNsYXNzPVwiZmFzIGZhLXVzZXJcIj48L2k+J31cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2luZm9cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fbmFtZVwiPiR7ZXNjYXBlSHRtbChyLnVzZXJuYW1lKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiZnJpZW5kLWl0ZW1fX3ByZXZpZXdcIj4ke2VzY2FwZUh0bWwoci5kYXRlKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImZyaWVuZC1pdGVtX19hY3Rpb25zXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxidXR0b24gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLWFjY2VwdFwiIGRhdGEtYWNjZXB0LWlkPVwiJHtyLmZyaWVuZHNoaXBJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLWNoZWNrXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcmVqZWN0XCIgZGF0YS1yZWplY3QtaWQ9XCIke3IuZnJpZW5kc2hpcElkfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtdGltZXNcIj48L2k+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGApLmpvaW4oJycpO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWFjY2VwdC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVxdWVzdChidG4uZGF0YXNldC5hY2NlcHRJZCwgJ2FjY2VwdCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG5cclxuICAgICAgICAgICAgY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLXJlamVjdC1pZF0nKS5mb3JFYWNoKGJ0biA9PiB7XHJcbiAgICAgICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgaGFuZGxlUmVxdWVzdChidG4uZGF0YXNldC5yZWplY3RJZCwgJ3JlamVjdCcpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgY29udGFpbmVyLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+RXJyZXVyIGRlIGNoYXJnZW1lbnQ8L3A+JztcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBoYW5kbGVSZXF1ZXN0KGZyaWVuZHNoaXBJZCwgYWN0aW9uKSB7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzLyR7YWN0aW9ufS8ke2ZyaWVuZHNoaXBJZH1gLCB7XHJcbiAgICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgcmVxdWVzdHNMb2FkZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGxvYWRSZXF1ZXN0cygpO1xyXG4gICAgICAgICAgICAgICAgZmV0Y2hVbnJlYWRDb3VudCgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBTRUFSQ0ggVVNFUlNcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgY29uc3Qgc2VhcmNoSW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXNlYXJjaC1pbnB1dF0nKTtcclxuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1mcmllbmRzLXNlYXJjaC1yZXN1bHRzXScpO1xyXG4gICAgbGV0IHNlYXJjaFRpbWVvdXQgPSBudWxsO1xyXG5cclxuICAgIGlmIChzZWFyY2hJbnB1dCkge1xyXG4gICAgICAgIHNlYXJjaElucHV0LmFkZEV2ZW50TGlzdGVuZXIoJ2lucHV0JywgKCkgPT4ge1xyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoc2VhcmNoVGltZW91dCk7XHJcbiAgICAgICAgICAgIGNvbnN0IHF1ZXJ5ID0gc2VhcmNoSW5wdXQudmFsdWUudHJpbSgpO1xyXG5cclxuICAgICAgICAgICAgaWYgKHF1ZXJ5Lmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gJyc7XHJcbiAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIHNlYXJjaFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGZldGNoKGAvZnJpZW5kcy9zZWFyY2g/cT0ke2VuY29kZVVSSUNvbXBvbmVudChxdWVyeSl9YCwge1xyXG4gICAgICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChkYXRhLnVzZXJzLmxlbmd0aCA9PT0gMCkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzZWFyY2hSZXN1bHRzLmlubmVySFRNTCA9ICc8cCBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2VtcHR5XCI+QXVjdW4gZ3VlcnJpZXIgdHJvdXZlPC9wPic7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIHNlYXJjaFJlc3VsdHMuaW5uZXJIVE1MID0gZGF0YS51c2Vycy5tYXAodSA9PiB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGxldCBhY3Rpb25IdG1sID0gJyc7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ2FjY2VwdGVkJykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPkFtaTwvc3Bhbj4nO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKHUuZnJpZW5kU3RhdHVzID09PSAncGVuZGluZ19zZW50Jykge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWN0aW9uSHRtbCA9ICc8c3BhbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tcGVuZGluZ1wiPkVudm95ZWU8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICh1LmZyaWVuZFN0YXR1cyA9PT0gJ3BlbmRpbmdfcmVjZWl2ZWQnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBhY3Rpb25IdG1sID0gJzxzcGFuIGNsYXNzPVwiZnJpZW5kLWFjdGlvbiBmcmllbmQtYWN0aW9uLS1wZW5kaW5nXCI+UmVjdWU8L3NwYW4+JztcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFjdGlvbkh0bWwgPSBgPGJ1dHRvbiBjbGFzcz1cImZyaWVuZC1hY3Rpb24gZnJpZW5kLWFjdGlvbi0tYWRkXCIgZGF0YS1hZGQtZnJpZW5kLWlkPVwiJHt1LnVzZXJJZH1cIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aSBjbGFzcz1cImZhcyBmYS1wbHVzXCI+PC9pPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9idXR0b24+YDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIGBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9fYXZhdGFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICR7dS5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gYDxpbWcgc3JjPVwiJHtlc2NhcGVIdG1sKHUucHJvZmlsZUltYWdlKX1cIiBhbHQ9XCIke2VzY2FwZUh0bWwodS51c2VybmFtZSl9XCI+YFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgOiAnPGkgY2xhc3M9XCJmYXMgZmEtdXNlclwiPjwvaT4nfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJmcmllbmQtaXRlbV9faW5mb1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImZyaWVuZC1pdGVtX19uYW1lXCI+JHtlc2NhcGVIdG1sKHUudXNlcm5hbWUpfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJmcmllbmQtaXRlbV9fcmF0aW5nXCI+PGkgY2xhc3M9XCJmYXMgZmEtdHJvcGh5XCI+PC9pPiAke3UucmF0aW5nfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZnJpZW5kLWl0ZW1fX2FjdGlvbnNcIj4ke2FjdGlvbkh0bWx9PC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYDtcclxuICAgICAgICAgICAgICAgICAgICB9KS5qb2luKCcnKTtcclxuXHJcbiAgICAgICAgICAgICAgICAgICAgc2VhcmNoUmVzdWx0cy5xdWVyeVNlbGVjdG9yQWxsKCdbZGF0YS1hZGQtZnJpZW5kLWlkXScpLmZvckVhY2goYnRuID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzZW5kRnJpZW5kUmVxdWVzdChidG4uZGF0YXNldC5hZGRGcmllbmRJZCwgYnRuKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgICAgICB9KTtcclxuICAgICAgICAgICAgfSwgMzAwKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZW5kRnJpZW5kUmVxdWVzdCh1c2VySWQsIGJ0bikge1xyXG4gICAgICAgIGJ0bi5kaXNhYmxlZCA9IHRydWU7XHJcbiAgICAgICAgZmV0Y2goYC9mcmllbmRzL3JlcXVlc3QvJHt1c2VySWR9YCwge1xyXG4gICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgaGVhZGVyczogeyAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCcgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5vdXRlckhUTUwgPSAnPHNwYW4gY2xhc3M9XCJmcmllbmQtYWN0aW9uIGZyaWVuZC1hY3Rpb24tLXBlbmRpbmdcIj5FbnZveWVlPC9zcGFuPic7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBidG4uZGlzYWJsZWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHsgYnRuLmRpc2FibGVkID0gZmFsc2U7IH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlcG9ydE1lc3NhZ2VBY3Rpb24obWVzc2FnZUlkLCBidG4pIHtcclxuICAgICAgICBjb25zdCByZWFzb24gPSBwcm9tcHQoJ1JhaXNvbiBkdSBzaWduYWxlbWVudCA6Jyk7XHJcbiAgICAgICAgaWYgKHJlYXNvbiA9PT0gbnVsbCkgcmV0dXJuOyAvLyBjYW5jZWxsZWRcclxuXHJcbiAgICAgICAgYnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHttZXNzYWdlSWR9L3JlcG9ydGAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyByZWFzb246IHJlYXNvbiB9KVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChkYXRhLnN1Y2Nlc3MpIHtcclxuICAgICAgICAgICAgICAgIGJ0bi5pbm5lckhUTUwgPSAnPGkgY2xhc3M9XCJmYXMgZmEtY2hlY2tcIj48L2k+JztcclxuICAgICAgICAgICAgICAgIGJ0bi5jbGFzc0xpc3QuYWRkKCdjaGF0LW1lc3NhZ2VfX3JlcG9ydC0tZG9uZScpO1xyXG4gICAgICAgICAgICAgICAgYnRuLnRpdGxlID0gJ1NpZ25hbGUnO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgYnRuLmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC5jYXRjaCgoKSA9PiB7IGJ0bi5kaXNhYmxlZCA9IGZhbHNlOyB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIENPTlZFUlNBVElPTlxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBvcGVuQ29udmVyc2F0aW9uKHVzZXJJZCwgdXNlcm5hbWUpIHtcclxuICAgICAgICBjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkID0gdXNlcklkO1xyXG4gICAgICAgIGxhc3RNZXNzYWdlSWQgPSAwO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnJpZW5kcy1wYW5lbF9fdGFicycpLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX2NvbnRlbnQnKS5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xyXG4gICAgICAgIGNvbnN0IGNvbnZFbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLWZyaWVuZHMtY29udmVyc2F0aW9uXScpO1xyXG4gICAgICAgIGNvbnZFbC5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xyXG5cclxuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tbmFtZV0nKS50ZXh0Q29udGVudCA9IHVzZXJuYW1lO1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tbWVzc2FnZXNdJyk7XHJcbiAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSAnPGRpdiBjbGFzcz1cImZyaWVuZHMtcGFuZWxfX2xvYWRpbmdcIj48aSBjbGFzcz1cImZhcyBmYS1zcGlubmVyIGZhLXNwaW5cIj48L2k+IENoYXJnZW1lbnQuLi48L2Rpdj4nO1xyXG5cclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHt1c2VySWR9YCwge1xyXG4gICAgICAgICAgICBoZWFkZXJzOiB7ICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyB9XHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgcmVuZGVyTWVzc2FnZXMoZGF0YS5tZXNzYWdlcywgZmFsc2UpO1xyXG4gICAgICAgICAgICBzdGFydE1lc3NhZ2VQb2xsaW5nKCk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVuZGVyTWVzc2FnZXMobWVzc2FnZXMsIGFwcGVuZCkge1xyXG4gICAgICAgIGNvbnN0IG1lc3NhZ2VzRWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tbWVzc2FnZXNdJyk7XHJcblxyXG4gICAgICAgIGlmICghYXBwZW5kKSB7XHJcbiAgICAgICAgICAgIGlmIChtZXNzYWdlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICAgICAgICAgIG1lc3NhZ2VzRWwuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwiZnJpZW5kcy1wYW5lbF9fZW1wdHlcIj5EZWJ1dCBkZSBsYSBjb252ZXJzYXRpb24uIEVudm95ZXogbGUgcHJlbWllciBtZXNzYWdlITwvcD4nO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgbWVzc2FnZXNFbC5pbm5lckhUTUwgPSAnJztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gU2kgb24gYWpvdXRlIGRlcyBtZXNzYWdlcyBldCBxdWUgbGUgY29udGVuZXVyIGFmZmljaGUgbGUgcGxhY2Vob2xkZXIsIGxlIHN1cHByaW1lclxyXG4gICAgICAgIGlmIChhcHBlbmQgJiYgbWVzc2FnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBjb25zdCBwbGFjZWhvbGRlciA9IG1lc3NhZ2VzRWwucXVlcnlTZWxlY3RvcignLmZyaWVuZHMtcGFuZWxfX2VtcHR5Jyk7XHJcbiAgICAgICAgICAgIGlmIChwbGFjZWhvbGRlcikgcGxhY2Vob2xkZXIucmVtb3ZlKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBtZXNzYWdlcy5mb3JFYWNoKG1zZyA9PiB7XHJcbiAgICAgICAgICAgIGlmIChtc2cuaWQgPiBsYXN0TWVzc2FnZUlkKSBsYXN0TWVzc2FnZUlkID0gbXNnLmlkO1xyXG5cclxuICAgICAgICAgICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XHJcbiAgICAgICAgICAgIGRpdi5jbGFzc0xpc3QuYWRkKCdjaGF0LW1lc3NhZ2UnLCBtc2cuaXNGcm9tTWUgPyAnY2hhdC1tZXNzYWdlLS1taW5lJyA6ICdjaGF0LW1lc3NhZ2UtLXRoZWlycycpO1xyXG5cclxuICAgICAgICAgICAgbGV0IHJlcG9ydEJ0biA9ICcnO1xyXG4gICAgICAgICAgICBpZiAoIW1zZy5pc0Zyb21NZSkge1xyXG4gICAgICAgICAgICAgICAgcmVwb3J0QnRuID0gYDxidXR0b24gY2xhc3M9XCJjaGF0LW1lc3NhZ2VfX3JlcG9ydFwiIGRhdGEtcmVwb3J0LW1zZy1pZD1cIiR7bXNnLmlkfVwiIHRpdGxlPVwiU2lnbmFsZXIgY2UgbWVzc2FnZVwiPjxpIGNsYXNzPVwiZmFzIGZhLWZsYWdcIj48L2k+PC9idXR0b24+YDtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgZGl2LmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgICR7ZXNjYXBlSHRtbChtc2cuY29udGVudCl9XHJcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImNoYXQtbWVzc2FnZV9fdGltZVwiPiR7ZXNjYXBlSHRtbChtc2cuZGF0ZSl9ICR7cmVwb3J0QnRufTwvc3Bhbj5cclxuICAgICAgICAgICAgYDtcclxuXHJcbiAgICAgICAgICAgIC8vIEF0dGFjaCByZXBvcnQgaGFuZGxlclxyXG4gICAgICAgICAgICBjb25zdCByZXBvcnRFbCA9IGRpdi5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXBvcnQtbXNnLWlkXScpO1xyXG4gICAgICAgICAgICBpZiAocmVwb3J0RWwpIHtcclxuICAgICAgICAgICAgICAgIHJlcG9ydEVsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcG9ydE1lc3NhZ2VBY3Rpb24ocmVwb3J0RWwuZGF0YXNldC5yZXBvcnRNc2dJZCwgcmVwb3J0RWwpO1xyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIG1lc3NhZ2VzRWwuYXBwZW5kQ2hpbGQoZGl2KTtcclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgbWVzc2FnZXNFbC5zY3JvbGxUb3AgPSBtZXNzYWdlc0VsLnNjcm9sbEhlaWdodDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBTZW5kIG1lc3NhZ2VcclxuICAgIGNvbnN0IHNlbmRCdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24tc2VuZF0nKTtcclxuICAgIGNvbnN0IGlucHV0RWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb252ZXJzYXRpb24taW5wdXRdJyk7XHJcblxyXG4gICAgaWYgKHNlbmRCdG4gJiYgaW5wdXRFbCkge1xyXG4gICAgICAgIHNlbmRCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzZW5kTWVzc2FnZSk7XHJcbiAgICAgICAgaW5wdXRFbC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgKGUpID0+IHtcclxuICAgICAgICAgICAgaWYgKGUua2V5ID09PSAnRW50ZXInKSBzZW5kTWVzc2FnZSgpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNlbmRNZXNzYWdlKCkge1xyXG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSBpbnB1dEVsLnZhbHVlLnRyaW0oKTtcclxuICAgICAgICBpZiAoIWNvbnRlbnQgfHwgIWN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgaW5wdXRFbC52YWx1ZSA9ICcnO1xyXG5cclxuICAgICAgICBmZXRjaChgL2ZyaWVuZHMvbWVzc2FnZXMvJHtjdXJyZW50Q29udmVyc2F0aW9uVXNlcklkfWAsIHtcclxuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHtcclxuICAgICAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXHJcbiAgICAgICAgICAgICAgICAnWC1SZXF1ZXN0ZWQtV2l0aCc6ICdYTUxIdHRwUmVxdWVzdCdcclxuICAgICAgICAgICAgfSxcclxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyBjb250ZW50OiBjb250ZW50IH0pXHJcbiAgICAgICAgfSlcclxuICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAudGhlbihkYXRhID0+IHtcclxuICAgICAgICAgICAgaWYgKGRhdGEuc3VjY2VzcyAmJiBkYXRhLm1lc3NhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHJlbmRlck1lc3NhZ2VzKFtkYXRhLm1lc3NhZ2VdLCB0cnVlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIC8vIEJhY2sgYnV0dG9uXHJcbiAgICBjb25zdCBiYWNrQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29udmVyc2F0aW9uLWJhY2tdJyk7XHJcbiAgICBpZiAoYmFja0J0bikge1xyXG4gICAgICAgIGJhY2tCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQgPSBudWxsO1xyXG4gICAgICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICAgICAgZnJpZW5kc0xvYWRlZCA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzd2l0Y2hUYWIoJ2ZyaWVuZHMnKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICAvLyA9PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgIC8vIE1FU1NBR0UgUE9MTElORyAoZXZlcnkgNXMgd2hlbiBjb252ZXJzYXRpb24gb3BlbilcclxuICAgIC8vID09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PVxyXG4gICAgZnVuY3Rpb24gc3RhcnRNZXNzYWdlUG9sbGluZygpIHtcclxuICAgICAgICBzdG9wTWVzc2FnZVBvbGxpbmcoKTtcclxuICAgICAgICBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xyXG4gICAgICAgICAgICBpZiAoIWN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgICAgIGZldGNoKGAvZnJpZW5kcy9tZXNzYWdlcy8ke2N1cnJlbnRDb252ZXJzYXRpb25Vc2VySWR9P2FmdGVySWQ9JHtsYXN0TWVzc2FnZUlkfWAsIHtcclxuICAgICAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLnRoZW4ocmVzID0+IHJlcy5qc29uKCkpXHJcbiAgICAgICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKGRhdGEubWVzc2FnZXMgJiYgZGF0YS5tZXNzYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVuZGVyTWVzc2FnZXMoZGF0YS5tZXNzYWdlcywgdHJ1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0sIDUwMDApO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHN0b3BNZXNzYWdlUG9sbGluZygpIHtcclxuICAgICAgICBpZiAobWVzc2FnZVBvbGxpbmdJbnRlcnZhbCkge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKG1lc3NhZ2VQb2xsaW5nSW50ZXJ2YWwpO1xyXG4gICAgICAgICAgICBtZXNzYWdlUG9sbGluZ0ludGVydmFsID0gbnVsbDtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICAvLyBVTlJFQUQgQ09VTlQgUE9MTElORyAoZXZlcnkgMzBzLCBhbHdheXMgYWN0aXZlKVxyXG4gICAgLy8gPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09XHJcbiAgICBmdW5jdGlvbiBmZXRjaFVucmVhZENvdW50KCkge1xyXG4gICAgICAgIGZldGNoKCcvZnJpZW5kcy91bnJlYWQtY291bnQnLCB7XHJcbiAgICAgICAgICAgIGhlYWRlcnM6IHsgJ1gtUmVxdWVzdGVkLVdpdGgnOiAnWE1MSHR0cFJlcXVlc3QnIH1cclxuICAgICAgICB9KVxyXG4gICAgICAgIC50aGVuKHJlcyA9PiByZXMuanNvbigpKVxyXG4gICAgICAgIC50aGVuKGRhdGEgPT4ge1xyXG4gICAgICAgICAgICBpZiAoZGF0YS50b3RhbCA+IDApIHtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnRleHRDb250ZW50ID0gZGF0YS50b3RhbDtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJztcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGJhZGdlLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGNvbnN0IHJlcXVlc3RzQmFkZ2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbZGF0YS1yZXF1ZXN0cy1iYWRnZV0nKTtcclxuICAgICAgICAgICAgaWYgKHJlcXVlc3RzQmFkZ2UpIHtcclxuICAgICAgICAgICAgICAgIGlmIChkYXRhLnBlbmRpbmdSZXF1ZXN0cyA+IDApIHtcclxuICAgICAgICAgICAgICAgICAgICByZXF1ZXN0c0JhZGdlLnRleHRDb250ZW50ID0gZGF0YS5wZW5kaW5nUmVxdWVzdHM7XHJcbiAgICAgICAgICAgICAgICAgICAgcmVxdWVzdHNCYWRnZS5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jayc7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIHJlcXVlc3RzQmFkZ2Uuc3R5bGUuZGlzcGxheSA9ICdub25lJztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLmNhdGNoKCgpID0+IHt9KTtcclxuICAgIH1cclxuXHJcbiAgICBmZXRjaFVucmVhZENvdW50KCk7XHJcbiAgICB1bnJlYWRQb2xsaW5nSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmZXRjaFVucmVhZENvdW50LCAzMDAwMCk7XHJcbn0pO1xyXG4iLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiLCIvLyBleHRyYWN0ZWQgYnkgbWluaS1jc3MtZXh0cmFjdC1wbHVnaW5cbmV4cG9ydCB7fTsiXSwibmFtZXMiOlsiZXNjYXBlSHRtbCIsInN0ciIsImRpdiIsImRvY3VtZW50IiwiY3JlYXRlRWxlbWVudCIsImFwcGVuZENoaWxkIiwiY3JlYXRlVGV4dE5vZGUiLCJpbm5lckhUTUwiLCJhZGRFdmVudExpc3RlbmVyIiwiYnVyZ2VyIiwicXVlcnlTZWxlY3RvciIsIm5hdiIsImNsYXNzTGlzdCIsInRvZ2dsZSIsIlNUQVRfTUFYIiwiZG1nIiwic3BlZWQiLCJkb2RnZSIsImNyaXQiLCJocCIsInBvcnRyYWl0cyIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJkZXRhaWxzIiwiZ2V0RWxlbWVudEJ5SWQiLCJzZWxlY3RlZExpc3QiLCJsYXVuY2hCdG4iLCJsZW5ndGgiLCJtYXhTZWxlY3Rpb24iLCJzZWxlY3RlZEhlcm9lcyIsInNlbGVjdGVkSGVyb0lkcyIsImdldENhdGVnb3J5IiwicG9ydHJhaXQiLCJkYXRhc2V0IiwiY2F0ZWdvcnkiLCJnZXRTZWxlY3RlZFJvbGVzIiwicm9sZXMiLCJUYW5rIiwiRFBTIiwiSGVhbGVyIiwiU3VwcG9ydCIsImZvckVhY2giLCJpZCIsInAiLCJBcnJheSIsImZyb20iLCJmaW5kIiwicHAiLCJjYXQiLCJjYW5TZWxlY3RSb2xlIiwicG9ydHJhaXRFbCIsInJlbW92ZSIsImFkZCIsIm5hbWUiLCJyb2xlIiwiZG1nTWluIiwiTnVtYmVyIiwiZG1nTWF4Iiwic3ByaXRlRmlsZSIsInNwcml0ZSIsImFiaWxpdHlOYW1lIiwiYWJpbGl0eURlc2MiLCJhYmlsaXR5Q2QiLCJzcHJpdGVQYXRoIiwiY29uY2F0IiwiaXNTZWxlY3RlZCIsImluY2x1ZGVzIiwiYWJpbGl0eUh0bWwiLCJNYXRoIiwibWluIiwiYnRuUmlnaHQiLCJyb2xlQ2F0IiwiYWxyZWFkeVNlbGVjdGVkIiwiZGlzYWJsZWQiLCJ0ZXh0Q29udGVudCIsImZpbHRlciIsImhpZCIsImgiLCJhbGVydCIsInB1c2giLCJ1cGRhdGVTZWxlY3RlZFRlYW0iLCJoZXJvIiwiaGVyb0VsIiwidXBkYXRlUm9sZUluZGljYXRvcnMiLCJ0ZWFtQ29tcGxldGUiLCJpbmRpY2F0b3IiLCJzbG90Iiwic2F2ZVByZXNldEJ0biIsInByZXNldE1vZGFsIiwicHJlc2V0TmFtZUlucHV0IiwicHJlc2V0Q29uZmlybUJ0biIsInByZXNldENhbmNlbEJ0biIsInVwZGF0ZVNhdmVQcmVzZXRCdG4iLCJvcmlnaW5hbFVwZGF0ZVNlbGVjdGVkVGVhbSIsIl9vcmlnVXBkYXRlIiwiX29yaWdSb2xlSW5kaWNhdG9ycyIsInZhbHVlIiwic3R5bGUiLCJkaXNwbGF5Iiwic2V0VGltZW91dCIsImZvY3VzIiwidHJpbSIsImJvcmRlckNvbG9yIiwiZmV0Y2giLCJtZXRob2QiLCJoZWFkZXJzIiwiYm9keSIsIkpTT04iLCJzdHJpbmdpZnkiLCJjaGFyYWN0ZXJJZHMiLCJtYXAiLCJ0aGVuIiwicmVzIiwianNvbiIsImRhdGEiLCJzdWNjZXNzIiwid2luZG93IiwibG9jYXRpb24iLCJyZWxvYWQiLCJlcnJvciIsImUiLCJrZXkiLCJjbGljayIsImxvYWRQcmVzZXQiLCJpZFN0ciIsIlN0cmluZyIsImRlbGV0ZVByZXNldCIsInByZXNldElkIiwiY2hpcEVsIiwiY29uZmlybSIsImxpc3QiLCJjaGlsZHJlbiIsIl9kb2N1bWVudCRxdWVyeVNlbGVjdCIsImNoaXAiLCJjaGFySWRzIiwicGFyc2UiLCJwcmVzZXRJZHMiLCJzdG9wUHJvcGFnYXRpb24iLCJzZWxlY3RlZExpc3RPYnNlcnZlciIsIk11dGF0aW9uT2JzZXJ2ZXIiLCJvYnNlcnZlIiwiY2hpbGRMaXN0IiwiaSIsImVuY29kZVVSSUNvbXBvbmVudCIsImpvaW4iLCJyZXNwb25zZSIsInJlZGlyZWN0ZWQiLCJocmVmIiwidXJsIiwicG9wdXAiLCJiYWNrZHJvcCIsImNsb3NlQnRuIiwiY29udGVudCIsImxvYWRlZCIsIm9wZW5Qb3B1cCIsIm9mZnNldEhlaWdodCIsImZldGNoUHJvZmlsZSIsImNsb3NlUG9wdXAiLCJyZW5kZXJQcm9maWxlIiwicmVzdWx0Q2xhc3MiLCJyIiwicmVzdWx0TGFiZWwiLCJhdmF0YXJIdG1sIiwicHJvZmlsZUltYWdlIiwidXNlcm5hbWUiLCJodG1sIiwibW90dG8iLCJiaW8iLCJyYXRpbmciLCJzdGF0cyIsIndpbnMiLCJsb3NzZXMiLCJ3aW5SYXRlIiwiZmF2b3JpdGVDaGFyYWN0ZXIiLCJnYW1lc1BsYXllZCIsImxhc3RUZWFtIiwiYyIsInJlY2VudEJhdHRsZXMiLCJiIiwicGFyc2VJbnQiLCJyZXN1bHQiLCJvcHBvbmVudCIsIm1hdGNoVHlwZSIsInRvVXBwZXJDYXNlIiwiZGF0ZSIsIkNvbWJhdENvbnRyb2xsZXIiLCJjb250YWluZXIiLCJfY2xhc3NDYWxsQ2hlY2siLCJsb2dzIiwiY3VycmVudEluZGV4IiwiaXNQbGF5aW5nIiwiaXNQYXVzZWQiLCJjaGFyYWN0ZXJFbGVtZW50cyIsImNoYXJhY3Rlck1heEhQIiwiaW5pdCIsIl9jcmVhdGVDbGFzcyIsIl90aGlzIiwibG9nc0RhdGEiLCJjb21iYXRMb2dzIiwiY29uc29sZSIsImxvZ0NvbnRhaW5lciIsIm92ZXJsYXkiLCJwbGF5QnRuIiwic2tpcEJ0biIsInNwZWVkQnRucyIsImNoYXJhY3RlclNsdWdzIiwiY2hhcmFjdGVySGFzSGVhbCIsImFiaWxpdHlDb29sZG93bnMiLCJlbCIsImNoYXJhY3Rlck5hbWUiLCJ0ZWFtIiwiY2hhcmFjdGVyVGVhbSIsImNoYXJhY3RlclNsdWciLCJoYXNIZWFsIiwiaHBUZXh0IiwibWF0Y2giLCJhYmlsaXR5RWxlbWVudHMiLCJjaGFyTmFtZSIsImNoYXJUZWFtIiwiYWJpbGl0eUVsIiwibWF4Q2QiLCJhYmlsaXR5TWF4Q2QiLCJiYWRnZSIsIm5hbWVFbCIsImljb25FbCIsIm9wYWNpdHkiLCJiaW5kRXZlbnRzIiwicGxheSIsIl90aGlzMiIsInRvZ2dsZVBsYXkiLCJza2lwIiwiYnRuIiwic2V0U3BlZWQiLCJ1cGRhdGVQbGF5QnV0dG9uIiwicHJvY2Vzc05leHRMb2ciLCJwYXVzZSIsImxvZyIsImRpc3BsYXlMb2ciLCJ1cGRhdGVIZWFsdGhCYXJzIiwidHJhY2tBYmlsaXR5Q29vbGRvd25zIiwidHlwZSIsImFuaW1hdGVEZWF0aCIsInRhcmdldCIsInRhcmdldFRlYW0iLCJzaG93VmljdG9yeU92ZXJsYXkiLCJldmVudCIsInBhcnNlRmxvYXQiLCJjdXJyZW50VGFyZ2V0IiwiY29tYmF0U3BlZWQiLCJfdGhpczMiLCJwcm9jZXNzTG9nIiwiZGVsYXkiLCJnZXREZWxheUZvckxvZyIsImdldEFiaWxpdHlEZWxheSIsInN1YnR5cGUiLCJfdGhpczQiLCJwbGF5QW5pbWF0aW9uIiwiaHBEZWxheSIsImdldEhQVXBkYXRlRGVsYXkiLCJjYXN0ZXIiLCJjYXN0ZXJUZWFtIiwiYWJpbGl0eURhdGEiLCJ1cGRhdGVBYmlsaXR5Q29vbGRvd25EaXNwbGF5IiwiY2QiLCJnZXRBYmlsaXR5SFBEZWxheSIsImFuaW1hdGVBdHRhY2siLCJhdHRhY2tlciIsImF0dGFja2VyVGVhbSIsImlzQ3JpdCIsImFuaW1hdGVIZWFsIiwiaGVhbGVyIiwiaGVhbGVyVGVhbSIsImFuaW1hdGVEZWZlbmQiLCJkZWZlbmRlciIsImRlZmVuZGVyVGVhbSIsImFuaW1hdGVEb2RnZSIsImFuaW1hdGVEb1QiLCJhbmltYXRlU3R1bm5lZCIsInBsYXlBYmlsaXR5QW5pbWF0aW9uIiwidGFyZ2V0TmFtZSIsImRvdENsYXNzIiwiZ2V0Q2hhcmFjdGVyRWxlbWVudCIsImFuaW1hdGVNYXJrZWQiLCJhbmltYXRlQnVmZiIsImFuaW1hdGVTdGVhbHRoIiwiX3RoaXM1IiwibWFya0tleSIsInN3YXBTcHJpdGUiLCJyaXBvc3RlS2V5Iiwic2VsZkJ1ZmZLZXkiLCJoZWFsZWQiLCJwYXJ0eUJ1ZmZLZXkiLCJhbmltYXRlVGVhbUJ1ZmYiLCJzdGVhbHRoS2V5IiwiX3RoaXM2IiwiT2JqZWN0Iiwia2V5cyIsInN0YXJ0c1dpdGgiLCJzcHJpdGVOYW1lIiwiZHVyYXRpb24iLCJfdGhpczciLCJzbHVnIiwiaW1nIiwic3JjIiwiY29udGFpbnMiLCJhdHRhY2tlck5hbWUiLCJoZWFsZXJOYW1lIiwiZGVmZW5kZXJOYW1lIiwiZW50cnkiLCJjbGFzc05hbWUiLCJtZXNzYWdlIiwic2Nyb2xsVG9wIiwic2Nyb2xsSGVpZ2h0IiwidGVhbU5hbWUiLCJjdXJyZW50SFAiLCJtYXhIUCIsInRhcmdldEhQIiwidGFyZ2V0TWF4SFAiLCJ1cGRhdGVBYmlsaXR5SGVhbHRoQmFycyIsInVuZGVmaW5lZCIsInVwZGF0ZUNoYXJhY3RlckhQIiwiX3RoaXM4IiwibWF4SHAiLCJwZXJjZW50IiwiaHBCYXIiLCJ0cmFuc2l0aW9uIiwid2lkdGgiLCJ1cGRhdGVJbmZvUGFuZWwiLCJwYW5lbENsYXNzIiwicGFuZWwiLCJjaGFyYWN0ZXJJbmZvcyIsIl9pdGVyYXRvciIsIl9jcmVhdGVGb3JPZkl0ZXJhdG9ySGVscGVyIiwiX3N0ZXAiLCJfbG9vcCIsImluZm8iLCJzdGF0c1NwYW4iLCJzIiwibiIsImRvbmUiLCJlcnIiLCJmIiwiX3RoaXM5IiwiZmluYWxpemVSYXRpbmciLCJfdGhpczAiLCJmaW5hbGl6ZVVybCIsInJhdGluZ0NoYW5nZSIsInNob3dSYXRpbmdVcGRhdGUiLCJuZXdSYXRpbmciLCJuZXdSYXRpbmcyIiwiY2hhbmdlIiwicmF0aW5nRWwiLCJyYXRpbmdFbDIiLCJ3aW5uZXJEaXYiLCJub3RpZjEiLCJjc3NUZXh0IiwiY29sb3IiLCJjaGFuZ2UyIiwibm90aWYyIiwiY29tYmF0Q29udGFpbmVyIiwicGFuZWxPcGVuIiwiY3VycmVudFRhYiIsImN1cnJlbnRDb252ZXJzYXRpb25Vc2VySWQiLCJsYXN0TWVzc2FnZUlkIiwibWVzc2FnZVBvbGxpbmdJbnRlcnZhbCIsInVucmVhZFBvbGxpbmdJbnRlcnZhbCIsImZyaWVuZHNMb2FkZWQiLCJyZXF1ZXN0c0xvYWRlZCIsIm9wZW5QYW5lbCIsImxvYWRGcmllbmRzIiwiY2xvc2VQYW5lbCIsInN0b3BNZXNzYWdlUG9sbGluZyIsInRhYkJ0biIsInRhYk5hbWUiLCJmcmllbmRzVGFiIiwic3dpdGNoVGFiIiwidGFiQ29udGVudCIsImxvYWRSZXF1ZXN0cyIsImZyaWVuZHMiLCJ1c2VySWQiLCJsYXN0TWVzc2FnZSIsImlzRnJvbU1lIiwiaXRlbSIsImZyaWVuZFVzZXJJZCIsIm9wZW5Db252ZXJzYXRpb24iLCJyZXF1ZXN0cyIsImZyaWVuZHNoaXBJZCIsImhhbmRsZVJlcXVlc3QiLCJhY2NlcHRJZCIsInJlamVjdElkIiwiYWN0aW9uIiwiZmV0Y2hVbnJlYWRDb3VudCIsInNlYXJjaElucHV0Iiwic2VhcmNoUmVzdWx0cyIsInNlYXJjaFRpbWVvdXQiLCJjbGVhclRpbWVvdXQiLCJxdWVyeSIsInVzZXJzIiwidSIsImFjdGlvbkh0bWwiLCJmcmllbmRTdGF0dXMiLCJzZW5kRnJpZW5kUmVxdWVzdCIsImFkZEZyaWVuZElkIiwib3V0ZXJIVE1MIiwicmVwb3J0TWVzc2FnZUFjdGlvbiIsIm1lc3NhZ2VJZCIsInJlYXNvbiIsInByb21wdCIsInRpdGxlIiwiY29udkVsIiwibWVzc2FnZXNFbCIsInJlbmRlck1lc3NhZ2VzIiwibWVzc2FnZXMiLCJzdGFydE1lc3NhZ2VQb2xsaW5nIiwiYXBwZW5kIiwicGxhY2Vob2xkZXIiLCJtc2ciLCJyZXBvcnRCdG4iLCJyZXBvcnRFbCIsInJlcG9ydE1zZ0lkIiwic2VuZEJ0biIsImlucHV0RWwiLCJzZW5kTWVzc2FnZSIsImJhY2tCdG4iLCJzZXRJbnRlcnZhbCIsImNsZWFySW50ZXJ2YWwiLCJ0b3RhbCIsInJlcXVlc3RzQmFkZ2UiLCJwZW5kaW5nUmVxdWVzdHMiXSwic291cmNlUm9vdCI6IiJ9