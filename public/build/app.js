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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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cEUsSUFBSXFQLGVBQWUsRUFBRTtJQUNqQnJILE9BQU8sQ0FBQ0MsR0FBRyxDQUFDLDZCQUE2QixDQUFDO0lBQzFDLElBQUlDLGdCQUFnQixDQUFDbUgsZUFBZSxDQUFDO0VBQ3pDO0FBQ0osQ0FBQyxDQUFDO0FBRUYsaUVBQWVuSCxnQkFBZ0IsRTs7Ozs7Ozs7Ozs7QUMxYS9COzs7Ozs7Ozs7Ozs7QUNBQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2Fzc2V0cy9hcHAuanMiLCJ3ZWJwYWNrOi8vLy4vYXNzZXRzL2pzL2NvbWJhdC5qcyIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvQGZvcnRhd2Vzb21lL2ZvbnRhd2Vzb21lLWZyZWUvY3NzL2FsbC5jc3M/MmRjOSIsIndlYnBhY2s6Ly8vLi9hc3NldHMvc3R5bGVzL2FwcC5zY3NzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qXHJcbiAqIFdlbGNvbWUgdG8geW91ciBhcHAncyBtYWluIEphdmFTY3JpcHQgZmlsZSFcclxuICovXHJcbmltcG9ydCAnLi9zdHlsZXMvYXBwLnNjc3MnO1xyXG5pbXBvcnQgJ0Bmb3J0YXdlc29tZS9mb250YXdlc29tZS1mcmVlL2Nzcy9hbGwuY3NzJztcclxuaW1wb3J0ICcuL2pzL2NvbWJhdC5qcyc7XHJcblxyXG4vKiA9PT09PT09PT09PT09PT09PT09PT09XHJcbiAgIE1FTlUgQlVSR0VSXHJcbj09PT09PT09PT09PT09PT09PT09PT0gKi9cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIkRPTUNvbnRlbnRMb2FkZWRcIiwgKCkgPT4ge1xyXG4gICAgY29uc3QgYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5idXJnZXJcIik7XHJcbiAgICBjb25zdCBuYXYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLm1haW4tbmF2aWdhdGlvblwiKTtcclxuXHJcbiAgICBpZiAoYnVyZ2VyICYmIG5hdikge1xyXG4gICAgICAgIGJ1cmdlci5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xyXG4gICAgICAgICAgICBuYXYuY2xhc3NMaXN0LnRvZ2dsZShcImFjdGl2ZVwiKTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxufSk7XHJcblxyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgUEFHRSBURUFNUyAoQ09SUklHw4lFKVxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5cclxuLyog8J+UpyBNQVggREVTIFNUQVRTIChhZGFwdGVyIMOgIHRhIEJERCAvIMOpcXVpbGlicmFnZSkgKi9cclxuY29uc3QgU1RBVF9NQVggPSB7XHJcbiAgICBkbWc6IDEwMCxcclxuICAgIHNwZWVkOiAxMDAsXHJcbiAgICBkb2RnZTogMTAwLFxyXG4gICAgY3JpdDogMTAwLFxyXG4gICAgaHA6IDIwMFxyXG59O1xyXG5cclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcclxuICAgIGNvbnN0IHBvcnRyYWl0cyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50ZWFtLXBvcnRyYWl0Jyk7XHJcbiAgICBjb25zdCBkZXRhaWxzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RlYW1EZXRhaWxzJyk7XHJcbiAgICBjb25zdCBzZWxlY3RlZExpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2VsZWN0ZWQtbGlzdCcpO1xyXG4gICAgY29uc3QgbGF1bmNoQnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bi1sYXVuY2gnKTtcclxuXHJcbiAgICBpZiAoIWRldGFpbHMgfHwgcG9ydHJhaXRzLmxlbmd0aCA9PT0gMCkgcmV0dXJuO1xyXG5cclxuICAgIGNvbnN0IG1heFNlbGVjdGlvbiA9IDM7XHJcbiAgICBsZXQgc2VsZWN0ZWRIZXJvZXMgPSBbXTtcclxuICAgIGxldCBzZWxlY3RlZEhlcm9JZHMgPSBbXTtcclxuXHJcbiAgICAvLyBDb21wb3NpdGlvbiBvYmxpZ2F0b2lyZSA6IDEgVGFuaywgMSBEUFMsIDEgU3VwcG9ydFxyXG4gICAgY29uc3QgUk9MRV9DQVRFR09SSUVTID0geyAnVGFuayc6ICdUYW5rJywgJ0RQUyc6ICdEUFMnLCAnU3VwcG9ydCc6ICdTdXBwb3J0JywgJ1NvaWduZXVyJzogJ1N1cHBvcnQnLCAnQnVmZmVyJzogJ1N1cHBvcnQnIH07XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0U2VsZWN0ZWRSb2xlcygpIHtcclxuICAgICAgICBjb25zdCByb2xlcyA9IHsgVGFuazogMCwgRFBTOiAwLCBTdXBwb3J0OiAwIH07XHJcbiAgICAgICAgc2VsZWN0ZWRIZXJvSWRzLmZvckVhY2goaWQgPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBwID0gQXJyYXkuZnJvbShwb3J0cmFpdHMpLmZpbmQocHAgPT4gcHAuZGF0YXNldC5pZCA9PT0gaWQpO1xyXG4gICAgICAgICAgICBpZiAocCkge1xyXG4gICAgICAgICAgICAgICAgY29uc3QgY2F0ID0gUk9MRV9DQVRFR09SSUVTW3AuZGF0YXNldC5yb2xlXSB8fCAnU3VwcG9ydCc7XHJcbiAgICAgICAgICAgICAgICByb2xlc1tjYXRdKys7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICByZXR1cm4gcm9sZXM7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gY2FuU2VsZWN0Um9sZShyb2xlKSB7XHJcbiAgICAgICAgY29uc3QgY2F0ID0gUk9MRV9DQVRFR09SSUVTW3JvbGVdIHx8ICdTdXBwb3J0JztcclxuICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICByZXR1cm4gcm9sZXNbY2F0XSA8IDE7XHJcbiAgICB9XHJcblxyXG4gICAgcG9ydHJhaXRzLmZvckVhY2gocG9ydHJhaXQgPT4ge1xyXG4gICAgICAgIHBvcnRyYWl0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICBwb3J0cmFpdHMuZm9yRWFjaChwID0+IHAuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJykpO1xyXG4gICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKTtcclxuXHJcbiAgICAgICAgICAgIGNvbnN0IGlkID0gcG9ydHJhaXQuZGF0YXNldC5pZDtcclxuICAgICAgICAgICAgY29uc3QgbmFtZSA9IHBvcnRyYWl0LmRhdGFzZXQubmFtZTtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZSA9IHBvcnRyYWl0LmRhdGFzZXQucm9sZTtcclxuICAgICAgICAgICAgY29uc3QgZG1nTWluID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuZG1nTWluKTtcclxuICAgICAgICAgICAgY29uc3QgZG1nTWF4ID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuZG1nTWF4KTtcclxuICAgICAgICAgICAgY29uc3Qgc3BlZWQgPSBOdW1iZXIocG9ydHJhaXQuZGF0YXNldC5zcGVlZCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGRvZGdlID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuZG9kZ2UpO1xyXG4gICAgICAgICAgICBjb25zdCBjcml0ID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuY3JpdCk7XHJcbiAgICAgICAgICAgIGNvbnN0IGhwID0gTnVtYmVyKHBvcnRyYWl0LmRhdGFzZXQuaHApO1xyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVGaWxlID0gcG9ydHJhaXQuZGF0YXNldC5zcHJpdGU7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBzcHJpdGVQYXRoID0gYC9hc3NldC9zcHJpdGVzLyR7c3ByaXRlRmlsZX1gO1xyXG4gICAgICAgICAgICBjb25zdCBpc1NlbGVjdGVkID0gc2VsZWN0ZWRIZXJvSWRzLmluY2x1ZGVzKGlkKTtcclxuXHJcbiAgICAgICAgICAgIGRldGFpbHMuaW5uZXJIVE1MID0gYFxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInRlYW0tZGV0YWlscy1jb250ZW50XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgyPiR7bmFtZX08L2gyPlxyXG4gICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicm9sZVwiPiR7cm9sZX08L3A+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJnaWYtY29udGFpbmVyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzcHJpdGVQYXRofVwiIGFsdD1cIlNwcml0ZSBkZSAke25hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0c1wiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE1HPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoZG1nTWF4IC8gU1RBVF9NQVguZG1nKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZG1nTWlufSAtICR7ZG1nTWF4fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+VklUPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoc3BlZWQgLyBTVEFUX01BWC5zcGVlZCkgKiAxMDAsIDEwMCl9JVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj4ke3NwZWVkfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+RE9ER0U8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChkb2RnZSAvIFNUQVRfTUFYLmRvZGdlKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7ZG9kZ2V9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJzdGF0XCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3Bhbj5DUklUPC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtYmFyXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInN0YXQtZmlsbFwiXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHN0eWxlPVwid2lkdGg6JHtNYXRoLm1pbigoY3JpdCAvIFNUQVRfTUFYLmNyaXQpICogMTAwLCAxMDApfSVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+JHtjcml0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcblxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+SFA8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1iYXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwic3RhdC1maWxsXCJcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc3R5bGU9XCJ3aWR0aDoke01hdGgubWluKChocCAvIFNUQVRfTUFYLmhwKSAqIDEwMCwgMTAwKX0lXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPiR7aHB9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvbiBjbGFzcz1cImJ0bi1zZWxlY3QtcmlnaHRcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgJHtpc1NlbGVjdGVkID8gJ0TDqXPDqWxlY3Rpb25uZXInIDogJ1PDqWxlY3Rpb25uZXInfVxyXG4gICAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcblxyXG4gICAgICAgICAgICBjb25zdCBidG5SaWdodCA9IGRldGFpbHMucXVlcnlTZWxlY3RvcignLmJ0bi1zZWxlY3QtcmlnaHQnKTtcclxuICAgICAgICAgICAgY29uc3Qgcm9sZUNhdCA9IFJPTEVfQ0FURUdPUklFU1tyb2xlXSB8fCAnU3VwcG9ydCc7XHJcbiAgICAgICAgICAgIGNvbnN0IGFscmVhZHlTZWxlY3RlZCA9IHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCk7XHJcblxyXG4gICAgICAgICAgICAvLyBEw6lzYWN0aXZlciBsZSBib3V0b24gc2kgbGUgc2xvdCBkZSBjZSByw7RsZSBlc3QgZMOpasOgIHByaXNcclxuICAgICAgICAgICAgaWYgKCFhbHJlYWR5U2VsZWN0ZWQgJiYgIWNhblNlbGVjdFJvbGUocm9sZSkpIHtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LnRleHRDb250ZW50ID0gYFNsb3QgJHtyb2xlQ2F0fSBkw6lqw6AgcHJpc2A7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGJ0blJpZ2h0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5pbmNsdWRlcyhpZCkpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMgPSBzZWxlY3RlZEhlcm9JZHMuZmlsdGVyKGhpZCA9PiBoaWQgIT09IGlkKTtcclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9lcyA9IHNlbGVjdGVkSGVyb2VzLmZpbHRlcihoID0+IGggIT09IG5hbWUpO1xyXG4gICAgICAgICAgICAgICAgICAgIHBvcnRyYWl0LmNsYXNzTGlzdC5yZW1vdmUoJ3NlbGVjdGVkJyk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmICghY2FuU2VsZWN0Um9sZShyb2xlKSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBhbGVydChgVm91cyBhdmV6IGTDqWrDoCB1biAke3JvbGVDYXR9IGRhbnMgdm90cmUgw6lxdWlwZSAhYCk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNlbGVjdGVkSGVyb0lkcy5sZW5ndGggPj0gbWF4U2VsZWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGFsZXJ0KFwiVm91cyBwb3V2ZXogc8OpbGVjdGlvbm5lciBtYXhpbXVtIDMgcGVyc29ubmFnZXMgIVwiKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZEhlcm9JZHMucHVzaChpZCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2VsZWN0ZWRIZXJvZXMucHVzaChuYW1lKTtcclxuICAgICAgICAgICAgICAgICAgICBwb3J0cmFpdC5jbGFzc0xpc3QuYWRkKCdzZWxlY3RlZCcpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgICAgIHVwZGF0ZVNlbGVjdGVkVGVhbSgpO1xyXG4gICAgICAgICAgICAgICAgYnRuUmlnaHQudGV4dENvbnRlbnQgPSBzZWxlY3RlZEhlcm9JZHMuaW5jbHVkZXMoaWQpXHJcbiAgICAgICAgICAgICAgICAgICAgPyAnRMOpc8OpbGVjdGlvbm5lcidcclxuICAgICAgICAgICAgICAgICAgICA6ICdTw6lsZWN0aW9ubmVyJztcclxuICAgICAgICAgICAgICAgIGJ0blJpZ2h0LmRpc2FibGVkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfSk7XHJcblxyXG4gICAgLyogIFpPTkUgw4lRVUlQRSDigJQgc3ByaXRlcyBzZXVsZW1lbnQgKi9cclxuICAgIGZ1bmN0aW9uIHVwZGF0ZVNlbGVjdGVkVGVhbSgpIHtcclxuICAgICAgICBzZWxlY3RlZExpc3QuaW5uZXJIVE1MID0gJyc7XHJcblxyXG4gICAgICAgIHNlbGVjdGVkSGVyb0lkcy5mb3JFYWNoKGlkID0+IHtcclxuICAgICAgICAgICAgY29uc3QgaGVybyA9IEFycmF5LmZyb20ocG9ydHJhaXRzKS5maW5kKHAgPT4gcC5kYXRhc2V0LmlkID09PSBpZCk7XHJcbiAgICAgICAgICAgIGlmICghaGVybykgcmV0dXJuO1xyXG4gICAgICAgICAgICBjb25zdCBuYW1lID0gaGVyby5kYXRhc2V0Lm5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHNwcml0ZVBhdGggPSBgL2Fzc2V0L3Nwcml0ZXMvJHtoZXJvLmRhdGFzZXQuc3ByaXRlfWA7XHJcbiAgICAgICAgICAgIGNvbnN0IGhlcm9FbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xyXG4gICAgICAgICAgICBoZXJvRWwuY2xhc3NMaXN0LmFkZCgnc2VsZWN0ZWQtaGVyby1zcHJpdGUnKTtcclxuICAgICAgICAgICAgaGVyb0VsLmlubmVySFRNTCA9IGBcclxuICAgICAgICAgICAgICAgIDxpbWcgc3JjPVwiJHtzcHJpdGVQYXRofVwiIGFsdD1cIlNwcml0ZSBkZSAke25hbWV9XCI+XHJcbiAgICAgICAgICAgICAgICA8c3Bhbj4ke25hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICBgO1xyXG4gICAgICAgICAgICBzZWxlY3RlZExpc3QuYXBwZW5kQ2hpbGQoaGVyb0VsKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBsZXMgaW5kaWNhdGV1cnMgZGUgcsO0bGVzXHJcbiAgICAgICAgdXBkYXRlUm9sZUluZGljYXRvcnMoKTtcclxuXHJcbiAgICAgICAgaWYgKGxhdW5jaEJ0bikge1xyXG4gICAgICAgICAgICBjb25zdCByb2xlcyA9IGdldFNlbGVjdGVkUm9sZXMoKTtcclxuICAgICAgICAgICAgY29uc3QgdGVhbUNvbXBsZXRlID0gcm9sZXMuVGFuayA9PT0gMSAmJiByb2xlcy5EUFMgPT09IDEgJiYgcm9sZXMuU3VwcG9ydCA9PT0gMTtcclxuICAgICAgICAgICAgbGF1bmNoQnRuLmRpc2FibGVkID0gIXRlYW1Db21wbGV0ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdXBkYXRlUm9sZUluZGljYXRvcnMoKSB7XHJcbiAgICAgICAgY29uc3Qgcm9sZXMgPSBnZXRTZWxlY3RlZFJvbGVzKCk7XHJcbiAgICAgICAgY29uc3QgaW5kaWNhdG9yID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnJvbGUtaW5kaWNhdG9yJyk7XHJcbiAgICAgICAgaWYgKGluZGljYXRvcikge1xyXG4gICAgICAgICAgICBpbmRpY2F0b3IucXVlcnlTZWxlY3RvckFsbCgnLnJvbGUtc2xvdCcpLmZvckVhY2goc2xvdCA9PiB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBjYXQgPSBzbG90LmRhdGFzZXQucm9sZTtcclxuICAgICAgICAgICAgICAgIGlmIChyb2xlc1tjYXRdID09PSAxKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QuYWRkKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2xvdC5jbGFzc0xpc3QucmVtb3ZlKCdmaWxsZWQnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGlmIChsYXVuY2hCdG4pIHtcclxuICAgICAgICBsYXVuY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChzZWxlY3RlZEhlcm9JZHMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgLy8gRW52b2kgUE9TVCBBSkFYIHZlcnMgL3RlYW1zL3NlbGVjdFxyXG4gICAgICAgICAgICAgICAgZmV0Y2goJy90ZWFtcy9zZWxlY3QnLCB7XHJcbiAgICAgICAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgICAgICAgaGVhZGVyczoge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcsXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICdYLVJlcXVlc3RlZC1XaXRoJzogJ1hNTEh0dHBSZXF1ZXN0JyxcclxuICAgICAgICAgICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICAgICAgICAgIGJvZHk6IHNlbGVjdGVkSGVyb0lkcy5tYXAoKGlkLCBpKSA9PiBgY2hhcmFjdGVyX2lkc1ske2l9XT0ke2VuY29kZVVSSUNvbXBvbmVudChpZCl9YCkuam9pbignJicpXHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLnRoZW4ocmVzcG9uc2UgPT4ge1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChyZXNwb25zZS5yZWRpcmVjdGVkKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhdGlvbi5ocmVmID0gcmVzcG9uc2UudXJsO1xyXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFJlZGlyaWdlIG1hbnVlbGxlbWVudCBzaSBwYXMgZGUgcmVkaXJlY3Rpb25cclxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2F0aW9uLmhyZWYgPSAnL21hdGNobWFraW5nJztcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnRXJyZXVyIGxvcnMgZGUgbGEgc8OpbGVjdGlvbiBkZSBsXFwnw6lxdWlwZS4nKTtcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuLyogPT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PT1cclxuICAgUFJPRklMRSBQT1BVUFxyXG49PT09PT09PT09PT09PT09PT09PT09PT09PT09PT09PSAqL1xyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgdG9nZ2xlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS10b2dnbGVdJyk7XHJcbiAgICBjb25zdCBwb3B1cCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtcG9wdXBdJyk7XHJcbiAgICBjb25zdCBiYWNrZHJvcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtYmFja2Ryb3BdJyk7XHJcbiAgICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1tkYXRhLXByb2ZpbGUtY2xvc2VdJyk7XHJcbiAgICBjb25zdCBjb250ZW50ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtcHJvZmlsZS1jb250ZW50XScpO1xyXG5cclxuICAgIGlmICghdG9nZ2xlIHx8ICFwb3B1cCkgcmV0dXJuO1xyXG5cclxuICAgIGxldCBsb2FkZWQgPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiBvcGVuUG9wdXAoKSB7XHJcbiAgICAgICAgcG9wdXAuc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgYmFja2Ryb3Auc3R5bGUuZGlzcGxheSA9ICdibG9jayc7XHJcbiAgICAgICAgcG9wdXAub2Zmc2V0SGVpZ2h0OyAvLyByZWZsb3dcclxuICAgICAgICBwb3B1cC5jbGFzc0xpc3QuYWRkKCdwcm9maWxlLXBvcHVwLS1vcGVuJyk7XHJcbiAgICAgICAgYmFja2Ryb3AuY2xhc3NMaXN0LmFkZCgncHJvZmlsZS1wb3B1cF9fYmFja2Ryb3AtLW9wZW4nKTtcclxuXHJcbiAgICAgICAgaWYgKCFsb2FkZWQpIHtcclxuICAgICAgICAgICAgZmV0Y2hQcm9maWxlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNsb3NlUG9wdXAoKSB7XHJcbiAgICAgICAgcG9wdXAuY2xhc3NMaXN0LnJlbW92ZSgncHJvZmlsZS1wb3B1cC0tb3BlbicpO1xyXG4gICAgICAgIGJhY2tkcm9wLmNsYXNzTGlzdC5yZW1vdmUoJ3Byb2ZpbGUtcG9wdXBfX2JhY2tkcm9wLS1vcGVuJyk7XHJcbiAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgIHBvcHVwLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIGJhY2tkcm9wLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgfSwgMzAwKTtcclxuICAgIH1cclxuXHJcbiAgICB0b2dnbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBvcGVuUG9wdXApO1xyXG4gICAgY2xvc2VCdG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjbG9zZVBvcHVwKTtcclxuICAgIGJhY2tkcm9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VQb3B1cCk7XHJcblxyXG4gICAgZnVuY3Rpb24gZmV0Y2hQcm9maWxlKCkge1xyXG4gICAgICAgIGZldGNoKCcvYXBpL3Byb2ZpbGUnKVxyXG4gICAgICAgICAgICAudGhlbihyZXMgPT4gcmVzLmpzb24oKSlcclxuICAgICAgICAgICAgLnRoZW4oZGF0YSA9PiB7XHJcbiAgICAgICAgICAgICAgICBsb2FkZWQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgcmVuZGVyUHJvZmlsZShkYXRhKTtcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgLmNhdGNoKCgpID0+IHtcclxuICAgICAgICAgICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gJzxwIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZXJyb3JcIj5FcnJldXIgZGUgY2hhcmdlbWVudDwvcD4nO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW5kZXJQcm9maWxlKGRhdGEpIHtcclxuICAgICAgICBjb25zdCByZXN1bHRDbGFzcyA9IChyKSA9PiByID09PSAnd2luJyA/ICdyZXN1bHQtLXdpbicgOiByID09PSAnbG9zcycgPyAncmVzdWx0LS1sb3NzJyA6ICdyZXN1bHQtLWRyYXcnO1xyXG4gICAgICAgIGNvbnN0IHJlc3VsdExhYmVsID0gKHIpID0+IHIgPT09ICd3aW4nID8gJ1ZpY3RvaXJlJyA6IHIgPT09ICdsb3NzJyA/ICdEXFx1MDBlOWZhaXRlJyA6ICdOdWwnO1xyXG5cclxuICAgICAgICBjb25zdCBhdmF0YXJIdG1sID0gZGF0YS5wcm9maWxlSW1hZ2VcclxuICAgICAgICAgICAgPyBgPGltZyBzcmM9XCIke2RhdGEucHJvZmlsZUltYWdlfVwiIGFsdD1cIkF2YXRhclwiPmBcclxuICAgICAgICAgICAgOiBgPGkgY2xhc3M9XCJmYXMgZmEtdXNlci1jaXJjbGVcIj48L2k+YDtcclxuXHJcbiAgICAgICAgbGV0IGh0bWwgPSBgXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19pZGVudGl0eVwiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2F2YXRhclwiPiR7YXZhdGFySHRtbH08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19pbmZvXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXBvcHVwX191c2VybmFtZVwiPiR7ZGF0YS51c2VybmFtZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgJHtkYXRhLm1vdHRvID8gYDxzcGFuIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fbW90dG9cIj5cXHUwMGFiICR7ZGF0YS5tb3R0b30gXFx1MDBiYjwvc3Bhbj5gIDogJyd9XHJcbiAgICAgICAgICAgICAgICAgICAgJHtkYXRhLmJpbyA/IGA8cCBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2Jpb1wiPiR7ZGF0YS5iaW99PC9wPmAgOiAnJ31cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuXHJcbiAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zdGF0c1wiPlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZGF0YS5yYXRpbmd9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X19sYWJlbFwiPk1NUjwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZGF0YS5zdGF0cy53aW5zfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5WaWN0b2lyZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXN0YXRcIj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fdmFsdWVcIj4ke2RhdGEuc3RhdHMubG9zc2VzfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtc3RhdF9fbGFiZWxcIj5EXFx1MDBlOWZhaXRlczwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtc3RhdFwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1zdGF0X192YWx1ZVwiPiR7ZGF0YS5zdGF0cy53aW5SYXRlfSU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLXN0YXRfX2xhYmVsXCI+V2luIFJhdGU8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgYDtcclxuXHJcbiAgICAgICAgaWYgKGRhdGEuZmF2b3JpdGVDaGFyYWN0ZXIpIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXN0YXJcIj48L2k+IENoYW1waW9uIEZhdm9yaVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWZhdm9yaXRlX19uYW1lXCI+JHtkYXRhLmZhdm9yaXRlQ2hhcmFjdGVyLm5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtZmF2b3JpdGVfX3JvbGVcIj4ke2RhdGEuZmF2b3JpdGVDaGFyYWN0ZXIucm9sZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1mYXZvcml0ZV9fY291bnRcIj4ke2RhdGEuZmF2b3JpdGVDaGFyYWN0ZXIuZ2FtZXNQbGF5ZWR9IHBhcnRpZXM8L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLmxhc3RUZWFtLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgaHRtbCArPSBgXHJcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc2VjdGlvblwiPlxyXG4gICAgICAgICAgICAgICAgICAgIDxoMyBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX3N1YnRpdGxlXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzPVwiZmFzIGZhLXVzZXJzXCI+PC9pPiBEZXJuaVxcdTAwZThyZSBcXHUwMGM5cXVpcGVcclxuICAgICAgICAgICAgICAgICAgICA8L2gzPlxyXG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLWxhc3QtdGVhbVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2RhdGEubGFzdFRlYW0ubWFwKGMgPT4gYFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtX19tZW1iZXJcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtbGFzdC10ZWFtX19uYW1lXCI+JHtjLm5hbWV9PC9zcGFuPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1sYXN0LXRlYW1fX3JvbGVcIj4ke2Mucm9sZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYCkuam9pbignJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChkYXRhLnJlY2VudEJhdHRsZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGgzIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fc3VidGl0bGVcIj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtc2hpZWxkLWFsdFwiPjwvaT4gSGlzdG9yaXF1ZVxyXG4gICAgICAgICAgICAgICAgICAgIDwvaDM+XHJcbiAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAke2RhdGEucmVjZW50QmF0dGxlcy5tYXAoYiA9PiBgXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPVwiL2FyZW5hL3JlcGxheS8ke2IuaWR9XCIgY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX2VudHJ5ICR7cmVzdWx0Q2xhc3MoYi5yZXN1bHQpfVwiPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwicHJvZmlsZS1oaXN0b3J5X19yZXN1bHRcIj4ke3Jlc3VsdExhYmVsKGIucmVzdWx0KX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX29wcG9uZW50XCI+dnMgJHtiLm9wcG9uZW50fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cInByb2ZpbGUtaGlzdG9yeV9fdHlwZVwiPiR7Yi5tYXRjaFR5cGUudG9VcHBlckNhc2UoKX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJwcm9maWxlLWhpc3RvcnlfX2RhdGVcIj4ke2IuZGF0ZX08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGxheSBwcm9maWxlLWhpc3RvcnlfX3JlcGxheVwiPjwvaT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgYCkuam9pbignJyl9XHJcbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgYDtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19zZWN0aW9uXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9maWxlLXBvcHVwX19lbXB0eVwiPkF1Y3VuIGNvbWJhdCBlbnJlZ2lzdHJcXHUwMGU5PC9wPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIGA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBodG1sICs9IGBcclxuICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2ZpbGUtcG9wdXBfX2FjdGlvbnNcIj5cclxuICAgICAgICAgICAgICAgIDxhIGhyZWY9XCIvcHJvZmlsZVwiIGNsYXNzPVwicHJvZmlsZS1wb3B1cF9fZWRpdC1saW5rXCI+XHJcbiAgICAgICAgICAgICAgICAgICAgPGkgY2xhc3M9XCJmYXMgZmEtcGVuXCI+PC9pPiBcXHUwMGM5ZGl0ZXIgbGUgcHJvZmlsXHJcbiAgICAgICAgICAgICAgICA8L2E+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgIGA7XHJcblxyXG4gICAgICAgIGNvbnRlbnQuaW5uZXJIVE1MID0gaHRtbDtcclxuICAgIH1cclxufSk7XHJcblxyXG5jb25zb2xlLmxvZygnYXNzZXRzL2FwcC5qcyBjaGFyZ1xcdTAwZTkgXFx1MjcxNCcpO1xyXG4iLCIvKipcclxuICogQ29tYmF0IEFuaW1hdGlvbiBDb250cm9sbGVyXHJcbiAqIEfDqHJlIGwnYWZmaWNoYWdlIHByb2dyZXNzaWYgZGVzIGxvZ3MgZGUgY29tYmF0IGF2ZWMgYW5pbWF0aW9uc1xyXG4gKi9cclxuY2xhc3MgQ29tYmF0Q29udHJvbGxlciB7XHJcbiAgICBjb25zdHJ1Y3Rvcihjb250YWluZXIpIHtcclxuICAgICAgICB0aGlzLmNvbnRhaW5lciA9IGNvbnRhaW5lcjtcclxuICAgICAgICB0aGlzLmxvZ3MgPSBbXTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCA9IDA7XHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IDE7XHJcbiAgICAgICAgdGhpcy5jaGFyYWN0ZXJFbGVtZW50cyA9IHt9O1xyXG4gICAgICAgIHRoaXMuY2hhcmFjdGVyTWF4SFAgPSB7fTtcclxuXHJcbiAgICAgICAgdGhpcy5pbml0KCk7XHJcbiAgICB9XHJcblxyXG4gICAgaW5pdCgpIHtcclxuICAgICAgICAvLyBSw6ljdXDDqXJlciBsZXMgbG9ncyBkZXB1aXMgbCdhdHRyaWJ1dCBkYXRhXHJcbiAgICAgICAgY29uc3QgbG9nc0RhdGEgPSB0aGlzLmNvbnRhaW5lci5kYXRhc2V0LmNvbWJhdExvZ3M7XHJcbiAgICAgICAgaWYgKGxvZ3NEYXRhKSB7XHJcbiAgICAgICAgICAgIHRyeSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvZ3MgPSBKU09OLnBhcnNlKGxvZ3NEYXRhKTtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfwn5OLIExvZ3MgY2hhcmfDqXM6JywgdGhpcy5sb2dzLmxlbmd0aCwgJ2VudHLDqWVzJyk7XHJcblxyXG4gICAgICAgICAgICAgICAgLy8gQWZmaWNoZXIgdW4gZXhlbXBsZSBkZSBsb2cgZCdhdHRhcXVlIHBvdXIgZGVidWdcclxuICAgICAgICAgICAgICAgIGNvbnN0IGF0dGFja0xvZyA9IHRoaXMubG9ncy5maW5kKGxvZyA9PiBsb2cudHlwZSA9PT0gJ2F0dGFjaycpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGF0dGFja0xvZykge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCfwn5OMIEV4ZW1wbGUgZGUgbG9nIGRcXCdhdHRhcXVlOicsIGF0dGFja0xvZyk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0gY2F0Y2ggKGUpIHtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUuZXJyb3IoJ+KdjCBFcnJldXIgcGFyc2luZyBsb2dzOicsIGUpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBSw6ljdXDDqXJlciBsZXMgw6lsw6ltZW50c1xyXG4gICAgICAgIHRoaXMubG9nQ29udGFpbmVyID0gdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LWxvZ10nKTtcclxuICAgICAgICB0aGlzLm92ZXJsYXkgPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtb3ZlcmxheV0nKTtcclxuICAgICAgICB0aGlzLnBsYXlCdG4gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtcGxheV0nKTtcclxuICAgICAgICB0aGlzLnNraXBCdG4gPSB0aGlzLmNvbnRhaW5lci5xdWVyeVNlbGVjdG9yKCdbZGF0YS1jb21iYXQtc2tpcF0nKTtcclxuICAgICAgICB0aGlzLnNwZWVkQnRucyA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tkYXRhLWNvbWJhdC1zcGVlZF0nKTtcclxuXHJcbiAgICAgICAgLy8gTWFwIGRlcyBwZXJzb25uYWdlcyBhdmVjIHN0b2NrYWdlIGRlcyBIUCBtYXggaW5pdGlhdXhcclxuICAgICAgICB0aGlzLmNoYXJhY3Rlck1heEhQID0ge307XHJcbiAgICAgICAgdGhpcy5jb250YWluZXIucXVlcnlTZWxlY3RvckFsbCgnW2RhdGEtY2hhcmFjdGVyLW5hbWVdJykuZm9yRWFjaChlbCA9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbC5kYXRhc2V0LmNoYXJhY3Rlck5hbWU7XHJcbiAgICAgICAgICAgIGNvbnN0IHRlYW0gPSBlbC5kYXRhc2V0LmNoYXJhY3RlclRlYW07XHJcbiAgICAgICAgICAgIGNvbnN0IGtleSA9IGAke3RlYW19LSR7bmFtZX1gO1xyXG4gICAgICAgICAgICB0aGlzLmNoYXJhY3RlckVsZW1lbnRzW2tleV0gPSBlbDtcclxuXHJcbiAgICAgICAgICAgIC8vIEV4dHJhaXJlIGxlIEhQIG1heCBkZXB1aXMgbGUgdGV4dGUgaW5pdGlhbFxyXG4gICAgICAgICAgICBjb25zdCBocFRleHQgPSBlbC5xdWVyeVNlbGVjdG9yKCcuaHAtdGV4dCcpO1xyXG4gICAgICAgICAgICBpZiAoaHBUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBjb25zdCBtYXRjaCA9IGhwVGV4dC50ZXh0Q29udGVudC5tYXRjaCgvKFxcZCspXFwvKFxcZCspLyk7XHJcbiAgICAgICAgICAgICAgICBpZiAobWF0Y2gpIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLmNoYXJhY3Rlck1heEhQW2tleV0gPSBwYXJzZUludChtYXRjaFsyXSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuXHJcbiAgICAgICAgY29uc29sZS5sb2coJ/CfkaUgUGVyc29ubmFnZXMgY2hhcmfDqXM6JywgT2JqZWN0LmtleXModGhpcy5jaGFyYWN0ZXJFbGVtZW50cykpO1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCfwn5KaIEhQIG1heDonLCB0aGlzLmNoYXJhY3Rlck1heEhQKTtcclxuXHJcbiAgICAgICAgLy8gQ2FjaGVyIGwnb3ZlcmxheVxyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XHJcbiAgICAgICAgICAgIHRoaXMub3ZlcmxheS5zdHlsZS5vcGFjaXR5ID0gJzAnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gVmlkZXIgbGUgbG9nXHJcbiAgICAgICAgaWYgKHRoaXMubG9nQ29udGFpbmVyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubG9nQ29udGFpbmVyLmlubmVySFRNTCA9ICcnO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy8gRXZlbnQgbGlzdGVuZXJzXHJcbiAgICAgICAgdGhpcy5iaW5kRXZlbnRzKCk7XHJcblxyXG4gICAgICAgIC8vIExhbmNlciBhdXRvbWF0aXF1ZW1lbnQgYXByw6hzIHVuIGTDqWxhaVxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wbGF5KCksIDgwMCk7XHJcbiAgICB9XHJcblxyXG4gICAgYmluZEV2ZW50cygpIHtcclxuICAgICAgICBpZiAodGhpcy5wbGF5QnRuKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGxheUJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHRoaXMudG9nZ2xlUGxheSgpKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnNraXBCdG4pIHtcclxuICAgICAgICAgICAgdGhpcy5za2lwQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gdGhpcy5za2lwKCkpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMuZm9yRWFjaChidG4gPT4ge1xyXG4gICAgICAgICAgICBidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZSkgPT4gdGhpcy5zZXRTcGVlZChlKSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgcGxheSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcgJiYgIXRoaXMuaXNQYXVzZWQpIHJldHVybjtcclxuXHJcbiAgICAgICAgdGhpcy5pc1BsYXlpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuaXNQYXVzZWQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NOZXh0TG9nKCk7XHJcbiAgICB9XHJcblxyXG4gICAgcGF1c2UoKSB7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQbGF5QnV0dG9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdG9nZ2xlUGxheSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNQbGF5aW5nIHx8IHRoaXMuaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5KCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5wYXVzZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBza2lwKCkge1xyXG4gICAgICAgIHRoaXMuaXNQbGF5aW5nID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5pc1BhdXNlZCA9IGZhbHNlO1xyXG5cclxuICAgICAgICAvLyBBZmZpY2hlciB0b3VzIGxlcyBsb2dzIHJlc3RhbnRzXHJcbiAgICAgICAgd2hpbGUgKHRoaXMuY3VycmVudEluZGV4IDwgdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBjb25zdCBsb2cgPSB0aGlzLmxvZ3NbdGhpcy5jdXJyZW50SW5kZXhdO1xyXG4gICAgICAgICAgICB0aGlzLmRpc3BsYXlMb2cobG9nKTtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyk7XHJcbiAgICAgICAgICAgIGlmIChsb2cudHlwZSA9PT0gJ2RlYXRoJykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVhdGgobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudEluZGV4Kys7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICB0aGlzLnNob3dWaWN0b3J5T3ZlcmxheSgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGxheUJ1dHRvbigpO1xyXG4gICAgfVxyXG5cclxuICAgIHNldFNwZWVkKGV2ZW50KSB7XHJcbiAgICAgICAgY29uc3Qgc3BlZWQgPSBwYXJzZUZsb2F0KGV2ZW50LmN1cnJlbnRUYXJnZXQuZGF0YXNldC5jb21iYXRTcGVlZCk7XHJcbiAgICAgICAgdGhpcy5zcGVlZCA9IHNwZWVkO1xyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBsJ1VJXHJcbiAgICAgICAgdGhpcy5zcGVlZEJ0bnMuZm9yRWFjaChidG4gPT4gYnRuLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpKTtcclxuICAgICAgICBldmVudC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xyXG4gICAgfVxyXG5cclxuICAgIHByb2Nlc3NOZXh0TG9nKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1BsYXlpbmcgfHwgdGhpcy5pc1BhdXNlZCkgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50SW5kZXggPj0gdGhpcy5sb2dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzUGxheWluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICB0aGlzLnNob3dWaWN0b3J5T3ZlcmxheSgpO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVBsYXlCdXR0b24oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgY29uc3QgbG9nID0gdGhpcy5sb2dzW3RoaXMuY3VycmVudEluZGV4XTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NMb2cobG9nKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRJbmRleCsrO1xyXG5cclxuICAgICAgICAvLyBDYWxjdWxlciBsZSBkw6lsYWlcclxuICAgICAgICBsZXQgZGVsYXkgPSB0aGlzLmdldERlbGF5Rm9yTG9nKGxvZyk7XHJcbiAgICAgICAgZGVsYXkgPSBkZWxheSAvIHRoaXMuc3BlZWQ7XHJcblxyXG4gICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5wcm9jZXNzTmV4dExvZygpLCBkZWxheSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0RGVsYXlGb3JMb2cobG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdyb3VuZCc6IHJldHVybiAyMDAwOyAgICAgICAgIC8vIDIgc2Vjb25kZXMgcG91ciBsZXMgcm91bmRzXHJcbiAgICAgICAgICAgIGNhc2UgJ2luaXRpYXRpdmUnOiByZXR1cm4gNDAwOyAgICAgLy8gMC40IHNlY29uZGVzIHBvdXIgbCdpbml0aWF0aXZlXHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6IHJldHVybiAyMDAwOyAgICAgICAgLy8gMiBzZWNvbmRlcyBwb3VyIGxlcyBhdHRhcXVlc1xyXG4gICAgICAgICAgICBjYXNlICdoZWFsJzogcmV0dXJuIDE4MDA7ICAgICAgICAgIC8vIDEuOCBzZWNvbmRlcyBwb3VyIGxlcyBzb2luc1xyXG4gICAgICAgICAgICBjYXNlICdkZWZlbmQnOiByZXR1cm4gMTUwMDsgICAgICAgIC8vIDEuNSBzZWNvbmRlcyBwb3VyIGxhIGTDqWZlbnNlXHJcbiAgICAgICAgICAgIGNhc2UgJ2RvZGdlJzogcmV0dXJuIDEyMDA7ICAgICAgICAgLy8gMS4yIHNlY29uZGVzIHBvdXIgbCdlc3F1aXZlXHJcbiAgICAgICAgICAgIGNhc2UgJ2RlYXRoJzogcmV0dXJuIDI1MDA7ICAgICAgICAgLy8gMi41IHNlY29uZGVzIHBvdXIgbGEgbW9ydFxyXG4gICAgICAgICAgICBjYXNlICdwcm90ZWN0JzogcmV0dXJuIDE1MDA7ICAgICAgIC8vIDEuNSBzZWNvbmRlcyBwb3VyIGxhIHByb3RlY3Rpb25cclxuICAgICAgICAgICAgY2FzZSAndmljdG9yeSc6XHJcbiAgICAgICAgICAgIGNhc2UgJ2RyYXcnOiByZXR1cm4gMTAwMDsgICAgICAgICAgLy8gMSBzZWNvbmRlIHBvdXIgbGEgdmljdG9pcmVcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDgwMDsgICAgICAgICAgICAgICAvLyAwLjggc2Vjb25kZXMgcGFyIGTDqWZhdXRcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgcHJvY2Vzc0xvZyhsb2cpIHtcclxuICAgICAgICB0aGlzLnBsYXlBbmltYXRpb24obG9nKTtcclxuICAgICAgICB0aGlzLmRpc3BsYXlMb2cobG9nKTtcclxuXHJcbiAgICAgICAgLy8gU3luY2hyb25pc2VyIGxhIG1pc2Ugw6Agam91ciBkZXMgSFAgYXZlYyBsJ2FuaW1hdGlvblxyXG4gICAgICAgIC8vIExlcyBiYXJyZXMgc2UgbWV0dGVudCDDoCBqb3VyIHF1YW5kIGxlIHBlcnNvbm5hZ2UgXCJwcmVuZCBsZSBjb3VwXCJcclxuICAgICAgICBjb25zdCBocERlbGF5ID0gdGhpcy5nZXRIUFVwZGF0ZURlbGF5KGxvZyk7XHJcbiAgICAgICAgaWYgKGhwRGVsYXkgPiAwKSB7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy51cGRhdGVIZWFsdGhCYXJzKGxvZyksIGhwRGVsYXkgLyB0aGlzLnNwZWVkKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUhlYWx0aEJhcnMobG9nKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0SFBVcGRhdGVEZWxheShsb2cpIHtcclxuICAgICAgICBzd2l0Y2ggKGxvZy50eXBlKSB7XHJcbiAgICAgICAgICAgIGNhc2UgJ2F0dGFjayc6IHJldHVybiAzNTA7ICAgLy8gQXByw6hzIHF1ZSBsJ2F0dGFxdWUgdG91Y2hlICgzMDBtcyBhdHRhcXVlICsgNTBtcylcclxuICAgICAgICAgICAgY2FzZSAnaGVhbCc6IHJldHVybiA0MDA7ICAgICAvLyBQZW5kYW50IGwnYW5pbWF0aW9uIGRlIHNvaW5cclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOiByZXR1cm4gMDsgICAgICAvLyBJbW3DqWRpYXRcclxuICAgICAgICAgICAgZGVmYXVsdDogcmV0dXJuIDA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHBsYXlBbmltYXRpb24obG9nKSB7XHJcbiAgICAgICAgc3dpdGNoIChsb2cudHlwZSkge1xyXG4gICAgICAgICAgICBjYXNlICdhdHRhY2snOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlQXR0YWNrKGxvZy5hdHRhY2tlciwgbG9nLmF0dGFja2VyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0sIGxvZy5pc0NyaXQpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2hlYWwnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlSGVhbChsb2cuaGVhbGVyLCBsb2cuaGVhbGVyVGVhbSwgbG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIGNhc2UgJ2RlZmVuZCc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEZWZlbmQobG9nLmRlZmVuZGVyLCBsb2cuZGVmZW5kZXJUZWFtKTtcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICBjYXNlICdkb2RnZSc6XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFuaW1hdGVEb2RnZShsb2cudGFyZ2V0LCBsb2cudGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgY2FzZSAnZGVhdGgnOlxyXG4gICAgICAgICAgICAgICAgdGhpcy5hbmltYXRlRGVhdGgobG9nLnRhcmdldCwgbG9nLnRhcmdldFRlYW0pO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVBdHRhY2soYXR0YWNrZXJOYW1lLCBhdHRhY2tlclRlYW0sIHRhcmdldE5hbWUsIHRhcmdldFRlYW0sIGlzQ3JpdCkge1xyXG4gICAgICAgIGNvbnN0IGF0dGFja2VyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGF0dGFja2VyTmFtZSwgYXR0YWNrZXJUZWFtKTtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcblxyXG4gICAgICAgIGlmIChhdHRhY2tlcikge1xyXG4gICAgICAgICAgICBhdHRhY2tlci5jbGFzc0xpc3QuYWRkKCdhdHRhY2tpbmcnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBhdHRhY2tlci5jbGFzc0xpc3QucmVtb3ZlKCdhdHRhY2tpbmcnKSwgNjAwKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB7XHJcbiAgICAgICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnaHVydCcpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGlzQ3JpdCkgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2NyaXQnKTtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4gdGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2h1cnQnLCAnY3JpdCcpLCA0MDApO1xyXG4gICAgICAgICAgICB9LCAzMDApO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBhbmltYXRlSGVhbChoZWFsZXJOYW1lLCBoZWFsZXJUZWFtLCB0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgaGVhbGVyID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGhlYWxlck5hbWUsIGhlYWxlclRlYW0pO1xyXG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKTtcclxuXHJcbiAgICAgICAgaWYgKGhlYWxlcikge1xyXG4gICAgICAgICAgICBoZWFsZXIuY2xhc3NMaXN0LmFkZCgnaGVhbGluZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGhlYWxlci5jbGFzc0xpc3QucmVtb3ZlKCdoZWFsaW5nJyksIDgwMCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpZiAodGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHRhcmdldC5jbGFzc0xpc3QuYWRkKCdoZWFsZWQnKTtcclxuICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiB0YXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnaGVhbGVkJyksIDgwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEZWZlbmQoZGVmZW5kZXJOYW1lLCBkZWZlbmRlclRlYW0pIHtcclxuICAgICAgICBjb25zdCBkZWZlbmRlciA9IHRoaXMuZ2V0Q2hhcmFjdGVyRWxlbWVudChkZWZlbmRlck5hbWUsIGRlZmVuZGVyVGVhbSk7XHJcbiAgICAgICAgaWYgKGRlZmVuZGVyKSB7XHJcbiAgICAgICAgICAgIGRlZmVuZGVyLmNsYXNzTGlzdC5hZGQoJ2RlZmVuZGluZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IGRlZmVuZGVyLmNsYXNzTGlzdC5yZW1vdmUoJ2RlZmVuZGluZycpLCAxMDAwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgYW5pbWF0ZURvZGdlKHRhcmdldE5hbWUsIHRhcmdldFRlYW0pIHtcclxuICAgICAgICBjb25zdCB0YXJnZXQgPSB0aGlzLmdldENoYXJhY3RlckVsZW1lbnQodGFyZ2V0TmFtZSwgdGFyZ2V0VGVhbSk7XHJcbiAgICAgICAgaWYgKHRhcmdldCkge1xyXG4gICAgICAgICAgICB0YXJnZXQuY2xhc3NMaXN0LmFkZCgnZG9kZ2luZycpO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKCdkb2RnaW5nJyksIDYwMCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIGFuaW1hdGVEZWF0aCh0YXJnZXROYW1lLCB0YXJnZXRUZWFtKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KHRhcmdldE5hbWUsIHRhcmdldFRlYW0pO1xyXG4gICAgICAgIGlmICh0YXJnZXQpIHtcclxuICAgICAgICAgICAgdGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2RlYWQnKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0Q2hhcmFjdGVyRWxlbWVudChuYW1lLCB0ZWFtKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2hhcmFjdGVyRWxlbWVudHNbYCR7dGVhbX0tJHtuYW1lfWBdO1xyXG4gICAgfVxyXG5cclxuICAgIGRpc3BsYXlMb2cobG9nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmxvZ0NvbnRhaW5lcikgcmV0dXJuO1xyXG5cclxuICAgICAgICBjb25zdCBlbnRyeSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3AnKTtcclxuICAgICAgICBlbnRyeS5jbGFzc05hbWUgPSAnY29tYmF0LWxvZ19fZW50cnknO1xyXG5cclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdyb3VuZCcpIHtcclxuICAgICAgICAgICAgZW50cnkuY2xhc3NMaXN0LmFkZCgnY29tYmF0LWxvZ19fZW50cnktLXJvdW5kJyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ3ZpY3RvcnknKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS12aWN0b3J5Jyk7XHJcbiAgICAgICAgfSBlbHNlIGlmIChsb2cudHlwZSA9PT0gJ2RyYXcnKSB7XHJcbiAgICAgICAgICAgIGVudHJ5LmNsYXNzTGlzdC5hZGQoJ2NvbWJhdC1sb2dfX2VudHJ5LS1kZWZlYXQnKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGVudHJ5LmlubmVySFRNTCA9IGxvZy5tZXNzYWdlO1xyXG4gICAgICAgIHRoaXMubG9nQ29udGFpbmVyLmFwcGVuZENoaWxkKGVudHJ5KTtcclxuICAgICAgICB0aGlzLmxvZ0NvbnRhaW5lci5zY3JvbGxUb3AgPSB0aGlzLmxvZ0NvbnRhaW5lci5zY3JvbGxIZWlnaHQ7XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlSGVhbHRoQmFycyhsb2cpIHtcclxuICAgICAgICBsZXQgY2hhcmFjdGVyTmFtZSA9IG51bGw7XHJcbiAgICAgICAgbGV0IHRlYW1OYW1lID0gbnVsbDtcclxuICAgICAgICBsZXQgY3VycmVudEhQID0gbnVsbDtcclxuICAgICAgICBsZXQgbWF4SFAgPSBudWxsO1xyXG5cclxuICAgICAgICAvLyBEw6l0ZXJtaW5lciBsZXMgZG9ubsOpZXMgc2Vsb24gbGUgdHlwZSBkZSBsb2dcclxuICAgICAgICBpZiAobG9nLnR5cGUgPT09ICdhdHRhY2snKSB7XHJcbiAgICAgICAgICAgIGNoYXJhY3Rlck5hbWUgPSBsb2cudGFyZ2V0O1xyXG4gICAgICAgICAgICB0ZWFtTmFtZSA9IGxvZy50YXJnZXRUZWFtO1xyXG4gICAgICAgICAgICBjdXJyZW50SFAgPSBsb2cudGFyZ2V0SFA7XHJcbiAgICAgICAgICAgIG1heEhQID0gbG9nLnRhcmdldE1heEhQO1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnQXR0YWNrIGRldGVjdGVkIC0gSFAgdXBkYXRlOicsIGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsICcvJywgbWF4SFApO1xyXG4gICAgICAgIH0gZWxzZSBpZiAobG9nLnR5cGUgPT09ICdoZWFsJykge1xyXG4gICAgICAgICAgICBjaGFyYWN0ZXJOYW1lID0gbG9nLnRhcmdldDtcclxuICAgICAgICAgICAgdGVhbU5hbWUgPSBsb2cudGFyZ2V0VGVhbTtcclxuICAgICAgICAgICAgY3VycmVudEhQID0gbG9nLnRhcmdldEhQO1xyXG4gICAgICAgICAgICBtYXhIUCA9IGxvZy50YXJnZXRNYXhIUDtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ0hlYWwgZGV0ZWN0ZWQgLSBIUCB1cGRhdGU6JywgY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCwgJy8nLCBtYXhIUCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNZXR0cmUgw6Agam91ciBzaSBub3VzIGF2b25zIGxlcyBkb25uw6llcyBuw6ljZXNzYWlyZXNcclxuICAgICAgICBpZiAoY2hhcmFjdGVyTmFtZSAmJiB0ZWFtTmFtZSAmJiBjdXJyZW50SFAgIT09IG51bGwgJiYgY3VycmVudEhQICE9PSB1bmRlZmluZWQgJiYgbWF4SFApIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVDaGFyYWN0ZXJIUChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQLCBtYXhIUCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHVwZGF0ZUNoYXJhY3RlckhQKGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lLCBjdXJyZW50SFAsIG1heEhQKSB7XHJcbiAgICAgICAgY29uc3QgdGFyZ2V0ID0gdGhpcy5nZXRDaGFyYWN0ZXJFbGVtZW50KGNoYXJhY3Rlck5hbWUsIHRlYW1OYW1lKTtcclxuXHJcbiAgICAgICAgaWYgKCF0YXJnZXQpIHtcclxuICAgICAgICAgICAgY29uc29sZS5lcnJvcign4p2MIENoYXJhY3RlciBlbGVtZW50IG5vdCBmb3VuZCBmb3I6JywgY2hhcmFjdGVyTmFtZSwgJ2luIHRlYW06JywgdGVhbU5hbWUpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBjb25zdCBwZXJjZW50ID0gbWF4SFAgPiAwID8gKGN1cnJlbnRIUCAvIG1heEhQKSAqIDEwMCA6IDA7XHJcblxyXG4gICAgICAgIC8vIE1pc2Ugw6Agam91ciBkZSBsYSBiYXJyZSBIUCBkYW5zIGxhIHpvbmUgZGUgY29tYmF0IChiYXR0bGUtc3RhZ2UpXHJcbiAgICAgICAgY29uc3QgaHBCYXIgPSB0YXJnZXQucXVlcnlTZWxlY3RvcignLmhwLWJhcl9fZmlsbCcpO1xyXG4gICAgICAgIGNvbnN0IGhwVGV4dCA9IHRhcmdldC5xdWVyeVNlbGVjdG9yKCcuaHAtdGV4dCcpO1xyXG5cclxuICAgICAgICBpZiAoaHBCYXIpIHtcclxuICAgICAgICAgICAgLy8gQW5pbWF0aW9uIGZsdWlkZSBkZSBsYSBiYXJyZVxyXG4gICAgICAgICAgICBocEJhci5zdHlsZS50cmFuc2l0aW9uID0gYHdpZHRoIDAuM3MgZWFzZS1vdXRgO1xyXG4gICAgICAgICAgICBocEJhci5zdHlsZS53aWR0aCA9IGAke3BlcmNlbnR9JWA7XHJcblxyXG4gICAgICAgICAgICAvLyBDbGFzc2VzIGRlIGNvdWxldXIgc2Vsb24gbGUgcG91cmNlbnRhZ2VcclxuICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LnJlbW92ZSgnaHAtYmFyX19maWxsLS1sb3cnLCAnaHAtYmFyX19maWxsLS1jcml0aWNhbCcpO1xyXG4gICAgICAgICAgICBpZiAocGVyY2VudCA8PSAyNSkge1xyXG4gICAgICAgICAgICAgICAgaHBCYXIuY2xhc3NMaXN0LmFkZCgnaHAtYmFyX19maWxsLS1jcml0aWNhbCcpO1xyXG4gICAgICAgICAgICB9IGVsc2UgaWYgKHBlcmNlbnQgPD0gNTApIHtcclxuICAgICAgICAgICAgICAgIGhwQmFyLmNsYXNzTGlzdC5hZGQoJ2hwLWJhcl9fZmlsbC0tbG93Jyk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGlmIChocFRleHQpIHtcclxuICAgICAgICAgICAgaHBUZXh0LnRleHRDb250ZW50ID0gYCR7Y3VycmVudEhQfS8ke21heEhQfWA7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICAvLyBNaXNlIMOgIGpvdXIgZGVzIHBhbm5lYXV4IGQnaW5mbyBsYXTDqXJhdXhcclxuICAgICAgICB0aGlzLnVwZGF0ZUluZm9QYW5lbChjaGFyYWN0ZXJOYW1lLCB0ZWFtTmFtZSwgY3VycmVudEhQKTtcclxuICAgIH1cclxuXHJcbiAgICB1cGRhdGVJbmZvUGFuZWwoY2hhcmFjdGVyTmFtZSwgdGVhbU5hbWUsIGN1cnJlbnRIUCkge1xyXG4gICAgICAgIC8vIFRyb3V2ZXIgbGUgYm9uIHBhbm5lYXUgc2Vsb24gbCfDqXF1aXBlXHJcbiAgICAgICAgY29uc3QgcGFuZWxDbGFzcyA9IHRlYW1OYW1lID09PSAnRXF1aXBlIDEnID8gJy5pbmZvLXBhbmVsLS10ZWFtMScgOiAnLmluZm8tcGFuZWwtLXRlYW0yJztcclxuICAgICAgICBjb25zdCBwYW5lbCA9IHRoaXMuY29udGFpbmVyLnF1ZXJ5U2VsZWN0b3IocGFuZWxDbGFzcyk7XHJcblxyXG4gICAgICAgIGlmICghcGFuZWwpIHJldHVybjtcclxuXHJcbiAgICAgICAgLy8gVHJvdXZlciBsZSBwZXJzb25uYWdlIGRhbnMgbGUgcGFubmVhdSBwYXIgc29uIG5vbVxyXG4gICAgICAgIGNvbnN0IGNoYXJhY3RlckluZm9zID0gcGFuZWwucXVlcnlTZWxlY3RvckFsbCgnLmNoYXJhY3Rlci1pbmZvJyk7XHJcbiAgICAgICAgZm9yIChjb25zdCBpbmZvIG9mIGNoYXJhY3RlckluZm9zKSB7XHJcbiAgICAgICAgICAgIGNvbnN0IG5hbWVFbCA9IGluZm8ucXVlcnlTZWxlY3RvcignLmNoYXJhY3Rlci1pbmZvX19uYW1lJyk7XHJcbiAgICAgICAgICAgIGlmIChuYW1lRWwgJiYgbmFtZUVsLnRleHRDb250ZW50LnRyaW0oKSA9PT0gY2hhcmFjdGVyTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgY29uc3Qgc3RhdHNTcGFuID0gaW5mby5xdWVyeVNlbGVjdG9yKCcuY2hhcmFjdGVyLWluZm9fX3N0YXRzIHNwYW4nKTtcclxuICAgICAgICAgICAgICAgIGlmIChzdGF0c1NwYW4pIHtcclxuICAgICAgICAgICAgICAgICAgICBzdGF0c1NwYW4udGV4dENvbnRlbnQgPSBjdXJyZW50SFA7XHJcblxyXG4gICAgICAgICAgICAgICAgICAgIC8vIEFuaW1hdGlvbiBmbGFzaCBwb3VyIG1vbnRyZXIgbGUgY2hhbmdlbWVudFxyXG4gICAgICAgICAgICAgICAgICAgIHN0YXRzU3Bhbi5jbGFzc0xpc3QuYWRkKCdocC11cGRhdGVkJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0VGltZW91dCgoKSA9PiBzdGF0c1NwYW4uY2xhc3NMaXN0LnJlbW92ZSgnaHAtdXBkYXRlZCcpLCAzMDApO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgc2hvd1ZpY3RvcnlPdmVybGF5KCkge1xyXG4gICAgICAgIGlmICh0aGlzLm92ZXJsYXkpIHtcclxuICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLmRpc3BsYXkgPSAnZmxleCc7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoKCkgPT4ge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5vdmVybGF5LnN0eWxlLm9wYWNpdHkgPSAnMSc7XHJcbiAgICAgICAgICAgIH0sIDUwKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcblxyXG4gICAgdXBkYXRlUGxheUJ1dHRvbigpIHtcclxuICAgICAgICBpZiAoIXRoaXMucGxheUJ0bikgcmV0dXJuO1xyXG5cclxuICAgICAgICBpZiAodGhpcy5pc1BsYXlpbmcgJiYgIXRoaXMuaXNQYXVzZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gJ1BhdXNlJztcclxuICAgICAgICB9IGVsc2UgaWYgKHRoaXMuY3VycmVudEluZGV4ID49IHRoaXMubG9ncy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLnRleHRDb250ZW50ID0gJ1Rlcm1pbsOpJztcclxuICAgICAgICAgICAgdGhpcy5wbGF5QnRuLmRpc2FibGVkID0gdHJ1ZTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnBsYXlCdG4udGV4dENvbnRlbnQgPSB0aGlzLmN1cnJlbnRJbmRleCA+IDAgPyAnUmVwcmVuZHJlJyA6ICdMYW5jZXInO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuLy8gSW5pdGlhbGlzZXIgcXVhbmQgbGUgRE9NIGVzdCBwcsOqdFxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdET01Db250ZW50TG9hZGVkJywgKCkgPT4ge1xyXG4gICAgY29uc3QgY29tYmF0Q29udGFpbmVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW2RhdGEtY29tYmF0LWxvZ3NdJyk7XHJcbiAgICBpZiAoY29tYmF0Q29udGFpbmVyKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ0luaXRpYWxpc2F0aW9uIGR1IGNvbWJhdC4uLicpO1xyXG4gICAgICAgIG5ldyBDb21iYXRDb250cm9sbGVyKGNvbWJhdENvbnRhaW5lcik7XHJcbiAgICB9XHJcbn0pO1xyXG5cclxuZXhwb3J0IGRlZmF1bHQgQ29tYmF0Q29udHJvbGxlcjtcclxuIiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307Il0sIm5hbWVzIjpbImRvY3VtZW50IiwiYWRkRXZlbnRMaXN0ZW5lciIsImJ1cmdlciIsInF1ZXJ5U2VsZWN0b3IiLCJuYXYiLCJjbGFzc0xpc3QiLCJ0b2dnbGUiLCJTVEFUX01BWCIsImRtZyIsInNwZWVkIiwiZG9kZ2UiLCJjcml0IiwiaHAiLCJwb3J0cmFpdHMiLCJxdWVyeVNlbGVjdG9yQWxsIiwiZGV0YWlscyIsImdldEVsZW1lbnRCeUlkIiwic2VsZWN0ZWRMaXN0IiwibGF1bmNoQnRuIiwibGVuZ3RoIiwibWF4U2VsZWN0aW9uIiwic2VsZWN0ZWRIZXJvZXMiLCJzZWxlY3RlZEhlcm9JZHMiLCJST0xFX0NBVEVHT1JJRVMiLCJnZXRTZWxlY3RlZFJvbGVzIiwicm9sZXMiLCJUYW5rIiwiRFBTIiwiU3VwcG9ydCIsImZvckVhY2giLCJpZCIsInAiLCJBcnJheSIsImZyb20iLCJmaW5kIiwicHAiLCJkYXRhc2V0IiwiY2F0Iiwicm9sZSIsImNhblNlbGVjdFJvbGUiLCJwb3J0cmFpdCIsInJlbW92ZSIsImFkZCIsIm5hbWUiLCJkbWdNaW4iLCJOdW1iZXIiLCJkbWdNYXgiLCJzcHJpdGVGaWxlIiwic3ByaXRlIiwic3ByaXRlUGF0aCIsImNvbmNhdCIsImlzU2VsZWN0ZWQiLCJpbmNsdWRlcyIsImlubmVySFRNTCIsIk1hdGgiLCJtaW4iLCJidG5SaWdodCIsInJvbGVDYXQiLCJhbHJlYWR5U2VsZWN0ZWQiLCJkaXNhYmxlZCIsInRleHRDb250ZW50IiwiZmlsdGVyIiwiaGlkIiwiaCIsImFsZXJ0IiwicHVzaCIsInVwZGF0ZVNlbGVjdGVkVGVhbSIsImhlcm8iLCJoZXJvRWwiLCJjcmVhdGVFbGVtZW50IiwiYXBwZW5kQ2hpbGQiLCJ1cGRhdGVSb2xlSW5kaWNhdG9ycyIsInRlYW1Db21wbGV0ZSIsImluZGljYXRvciIsInNsb3QiLCJmZXRjaCIsIm1ldGhvZCIsImhlYWRlcnMiLCJib2R5IiwibWFwIiwiaSIsImVuY29kZVVSSUNvbXBvbmVudCIsImpvaW4iLCJ0aGVuIiwicmVzcG9uc2UiLCJyZWRpcmVjdGVkIiwid2luZG93IiwibG9jYXRpb24iLCJocmVmIiwidXJsIiwicG9wdXAiLCJiYWNrZHJvcCIsImNsb3NlQnRuIiwiY29udGVudCIsImxvYWRlZCIsIm9wZW5Qb3B1cCIsInN0eWxlIiwiZGlzcGxheSIsIm9mZnNldEhlaWdodCIsImZldGNoUHJvZmlsZSIsImNsb3NlUG9wdXAiLCJzZXRUaW1lb3V0IiwicmVzIiwianNvbiIsImRhdGEiLCJyZW5kZXJQcm9maWxlIiwicmVzdWx0Q2xhc3MiLCJyIiwicmVzdWx0TGFiZWwiLCJhdmF0YXJIdG1sIiwicHJvZmlsZUltYWdlIiwiaHRtbCIsInVzZXJuYW1lIiwibW90dG8iLCJiaW8iLCJyYXRpbmciLCJzdGF0cyIsIndpbnMiLCJsb3NzZXMiLCJ3aW5SYXRlIiwiZmF2b3JpdGVDaGFyYWN0ZXIiLCJnYW1lc1BsYXllZCIsImxhc3RUZWFtIiwiYyIsInJlY2VudEJhdHRsZXMiLCJiIiwicmVzdWx0Iiwib3Bwb25lbnQiLCJtYXRjaFR5cGUiLCJ0b1VwcGVyQ2FzZSIsImRhdGUiLCJjb25zb2xlIiwibG9nIiwiQ29tYmF0Q29udHJvbGxlciIsImNvbnRhaW5lciIsIl9jbGFzc0NhbGxDaGVjayIsImxvZ3MiLCJjdXJyZW50SW5kZXgiLCJpc1BsYXlpbmciLCJpc1BhdXNlZCIsImNoYXJhY3RlckVsZW1lbnRzIiwiY2hhcmFjdGVyTWF4SFAiLCJpbml0IiwiX2NyZWF0ZUNsYXNzIiwia2V5IiwidmFsdWUiLCJfdGhpcyIsImxvZ3NEYXRhIiwiY29tYmF0TG9ncyIsIkpTT04iLCJwYXJzZSIsImF0dGFja0xvZyIsInR5cGUiLCJlIiwiZXJyb3IiLCJsb2dDb250YWluZXIiLCJvdmVybGF5IiwicGxheUJ0biIsInNraXBCdG4iLCJzcGVlZEJ0bnMiLCJlbCIsImNoYXJhY3Rlck5hbWUiLCJ0ZWFtIiwiY2hhcmFjdGVyVGVhbSIsImhwVGV4dCIsIm1hdGNoIiwicGFyc2VJbnQiLCJPYmplY3QiLCJrZXlzIiwib3BhY2l0eSIsImJpbmRFdmVudHMiLCJwbGF5IiwiX3RoaXMyIiwidG9nZ2xlUGxheSIsInNraXAiLCJidG4iLCJzZXRTcGVlZCIsInVwZGF0ZVBsYXlCdXR0b24iLCJwcm9jZXNzTmV4dExvZyIsInBhdXNlIiwiZGlzcGxheUxvZyIsInVwZGF0ZUhlYWx0aEJhcnMiLCJhbmltYXRlRGVhdGgiLCJ0YXJnZXQiLCJ0YXJnZXRUZWFtIiwic2hvd1ZpY3RvcnlPdmVybGF5IiwiZXZlbnQiLCJwYXJzZUZsb2F0IiwiY3VycmVudFRhcmdldCIsImNvbWJhdFNwZWVkIiwiX3RoaXMzIiwicHJvY2Vzc0xvZyIsImRlbGF5IiwiZ2V0RGVsYXlGb3JMb2ciLCJfdGhpczQiLCJwbGF5QW5pbWF0aW9uIiwiaHBEZWxheSIsImdldEhQVXBkYXRlRGVsYXkiLCJhbmltYXRlQXR0YWNrIiwiYXR0YWNrZXIiLCJhdHRhY2tlclRlYW0iLCJpc0NyaXQiLCJhbmltYXRlSGVhbCIsImhlYWxlciIsImhlYWxlclRlYW0iLCJhbmltYXRlRGVmZW5kIiwiZGVmZW5kZXIiLCJkZWZlbmRlclRlYW0iLCJhbmltYXRlRG9kZ2UiLCJhdHRhY2tlck5hbWUiLCJ0YXJnZXROYW1lIiwiZ2V0Q2hhcmFjdGVyRWxlbWVudCIsImhlYWxlck5hbWUiLCJkZWZlbmRlck5hbWUiLCJlbnRyeSIsImNsYXNzTmFtZSIsIm1lc3NhZ2UiLCJzY3JvbGxUb3AiLCJzY3JvbGxIZWlnaHQiLCJ0ZWFtTmFtZSIsImN1cnJlbnRIUCIsIm1heEhQIiwidGFyZ2V0SFAiLCJ0YXJnZXRNYXhIUCIsInVuZGVmaW5lZCIsInVwZGF0ZUNoYXJhY3RlckhQIiwicGVyY2VudCIsImhwQmFyIiwidHJhbnNpdGlvbiIsIndpZHRoIiwidXBkYXRlSW5mb1BhbmVsIiwicGFuZWxDbGFzcyIsInBhbmVsIiwiY2hhcmFjdGVySW5mb3MiLCJfaXRlcmF0b3IiLCJfY3JlYXRlRm9yT2ZJdGVyYXRvckhlbHBlciIsIl9zdGVwIiwiX2xvb3AiLCJpbmZvIiwibmFtZUVsIiwidHJpbSIsInN0YXRzU3BhbiIsInMiLCJuIiwiZG9uZSIsImVyciIsImYiLCJfdGhpczUiLCJjb21iYXRDb250YWluZXIiXSwic291cmNlUm9vdCI6IiJ9