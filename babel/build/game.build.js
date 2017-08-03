/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 1);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Base = function () {
	function Base(x, y) {
		_classCallCheck(this, Base);

		this.x = x;
		this.y = y;
	}

	_createClass(Base, [{
		key: "isPlateau",
		value: function isPlateau() {
			return false;
		}
	}, {
		key: "isMonster",
		value: function isMonster() {
			return false;
		}
	}, {
		key: "isMissile",
		value: function isMissile() {
			return false;
		}
	}]);

	return Base;
}();

module.exports = Base;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Missile = __webpack_require__(2);
var Plateau = __webpack_require__(3);
var Monster = __webpack_require__(4);

var Game = function () {
	function Game() {
		var _this = this;

		_classCallCheck(this, Game);

		this.$canvas = this.getOrCreateScene();
		this.$canvas.width = window.innerWidth;
		this.$canvas.height = window.innerHeight;
		this.speed = 6;
		this.left = false;
		this.right = false;
		this.isStart = false;
		this.isRunning = false;
		this.context = this.$canvas.getContext("2d");
		this.monsterDesign = [];
		this.objects = [new Plateau(this.$canvas.width / 2 - this.$canvas.width / 10 / 2, this.$canvas.height - 20, this.$canvas.width / 10, 20, 0), new Missile(this.$canvas.width / 2, this.$canvas.height - (21 + 20 / 3), 20 / 3, 0, 0)];

		this.animeLeft = false;
		this.animeRight = false;
		this.animeBot = false;

		document.body.addEventListener("keydown", function (e) {
			if (e.keyCode === 39) {
				_this.right = true;
			}
			if (e.keyCode === 37) {
				_this.left = true;
			}
			if (e.keyCode === 32) {
				_this.isRunning = true;
				_this.isStart = true;
			}
		});

		document.body.addEventListener("keyup", function (e) {
			if (e.keyCode === 39) {
				_this.right = false;
			}
			if (e.keyCode === 37) {
				_this.left = false;
			}
		});
	}

	_createClass(Game, [{
		key: 'getOrCreateScene',
		value: function getOrCreateScene() {
			var canvas = document.querySelector('canvas');
			if (!canvas) {
				document.body.appendChild(document.createElement('canvas'));
				canvas = document.querySelector('canvas');
			}
			return canvas;
		}
	}, {
		key: 'generateMap',
		value: function generateMap(array) {
			if (!array) {
				var colLength = Math.floor(Math.random() * (50 - 10)) + 10;
				var lineLength = Math.floor(Math.random() * (8 - 4)) + 4;

				for (var line = 0; line < lineLength; line++) {
					this.monsterDesign.push([]);
					for (var col = 0; col < colLength; col++) {
						this.monsterDesign[line].push(Math.floor(Math.random() * (0 - 3)) + 3);
					}
				}
			} else {
				this.monsterDesign = array;
			}

			var briqueMaxWidth = this.$canvas.width / this.monsterDesign[0].length - 2;
			var i = 0;
			for (var monsterLineID in this.monsterDesign) {
				if (i % 2 == 1) {
					var monsterLine = this.monsterDesign[monsterLineID];
					var j = 0;
					for (var monsterColID in monsterLine) {
						if (j != 0 && j != monsterLine.length - 1) {
							if (j % 2 == 1) {
								this.objects.push(new Monster(monsterColID * briqueMaxWidth + monsterColID * 2 + 1, monsterLineID * 20 + monsterLineID * 2 + 1, briqueMaxWidth, 20, 0, 0, 0));
							}
						}
						j++;
					}
				}
				i++;
			}
		}
	}, {
		key: 'animateContext',
		value: function animateContext() {
			this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
			var i = 0;
			while (i < this.objects.length) {
				if (this.objects[i].isMonster() || this.objects[i].isPlateau()) {
					if (this.objects[i].l >= 0 || this.objects[i].isPlateau()) {
						this.context.fillStyle = "black";
						this.context.fillRect(this.objects[i].x, this.objects[i].y, this.objects[i].w, this.objects[i].h);

						if (this.objects[i].isPlateau()) {
							var plateau = this.objects[i];
						}
					}
				} else if (this.objects[i].isMissile()) {
					if (this.objects[i].l >= 0) {
						this.context.beginPath();
						this.context.arc(this.objects[i].x, this.objects[i].y, this.objects[i].r, 2 * Math.PI, false);
						this.context.fillStyle = "black";
						this.context.fill();
					} else {
						this.objects[i] = new Missile(plateau.x + plateau.w / 2, this.$canvas.height - (21 + 20 / 3), 20 / 3, 0, 0);
						this.context.beginPath();
						this.context.arc(this.objects[i].x, this.objects[i].y, this.objects[i].r, 2 * Math.PI, false);
						this.context.fillStyle = "black";
						this.context.fill();
					}
				}

				i++;
			}
		}
	}, {
		key: 'getPlateau',
		value: function getPlateau() {
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var object = _step.value;

					if (object.isPlateau()) {
						return object;
					}
				}
			} catch (err) {
				_didIteratorError = true;
				_iteratorError = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion && _iterator.return) {
						_iterator.return();
					}
				} finally {
					if (_didIteratorError) {
						throw _iteratorError;
					}
				}
			}
		}
	}, {
		key: 'getMonster',
		value: function getMonster() {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.objects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var object = _step2.value;

					if (object.isMonster()) {
						return object;
					}
				}
			} catch (err) {
				_didIteratorError2 = true;
				_iteratorError2 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion2 && _iterator2.return) {
						_iterator2.return();
					}
				} finally {
					if (_didIteratorError2) {
						throw _iteratorError2;
					}
				}
			}
		}
	}, {
		key: 'getMissile',
		value: function getMissile() {
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.objects[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var object = _step3.value;

					if (object.isMissile()) {
						return object;
					}
				}
			} catch (err) {
				_didIteratorError3 = true;
				_iteratorError3 = err;
			} finally {
				try {
					if (!_iteratorNormalCompletion3 && _iterator3.return) {
						_iterator3.return();
					}
				} finally {
					if (_didIteratorError3) {
						throw _iteratorError3;
					}
				}
			}
		}
	}, {
		key: 'collision',
		value: function collision(circle, rect) {
			var distX = Math.abs(circle.x - rect.x - rect.w / 2);
			var distY = Math.abs(circle.y - rect.y - rect.h / 2);

			if (distX > rect.w / 2 + circle.r) {
				return false;
			}
			if (distY > rect.h / 2 + circle.r) {
				return false;
			}

			if (distX <= rect.w / 2) {
				circle.l--;rect.l--;return true;
			}
			if (distY <= rect.h / 2) {
				circle.l--;rect.l--;return true;
			}

			var dx = distX - rect.w / 2;
			var dy = distY - rect.h / 2;

			if (dx * dx + dy * dy <= circle.r * circle.r) {
				circle.l--;rect.l--;return true;
			} else {
				return false;
			}
		}
	}, {
		key: 'animateSchema',
		value: function animateSchema() {
			var tabObj = this.objects;
			var i = 0;

			if (this.animeLeft === false && this.animeRight === false && this.animeBot == false) {
				this.animeRight = true;
			}

			while (i < tabObj.length) {
				if (tabObj[i].isMonster()) {
					if (this.animeRight) {
						tabObj[i] = tabObj[i].x + (this.$canvas.width / this.monsterDesign[0].length - 2);
						this.animeLeft = false;
						this.animeRight = false;
						this.animeBot = true;
					} else if (this.animeLeft) {
						tabObj[i] = tabObj[i].x - 2 * (this.$canvas.width / this.monsterDesign[0].length - 2);
						this.animeLeft = false;
						this.animeRight = false;
						this.animeBot = true;
					} else if (this.animeBot) {
						tabObj[i] = tabObj[i].y + 20;
						this.animeLeft = false;
						this.animeRight = true;
						this.animeBot = false;
					}
				}
				i++;
			}
		}
	}, {
		key: 'run',
		value: function run(cycle) {
			cycle.apply(this);
			this.animateContext();
			requestAnimationFrame(this.run.bind(this, cycle));
		}
	}]);

	return Game;
}();

window.game = new Game();
window.game.generateMap([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

window.game.run(function () {
	var renewDY = false;
	var plateau = this.getPlateau();
	var missile = this.getMissile();

	// console.log('isRunning :'+this.isRunning);
	// console.log('isStart :'+this.isStart);

	// this.animateSchema();

	if (this.isRunning) {
		missile.y = missile.y - 10;
		if (missile.y - missile.r <= 0) {
			missile.l--;
			this.isRunning = false;
			this.isStart = false;
		}
	}

	if (!this.isStart) {
		if (this.left && !this.right && plateau.x >= 0) {
			missile.x -= 1.5 * this.speed;
		}
		if (this.right && !this.left && plateau.x + plateau.w <= this.$canvas.width) {
			missile.x += 1.5 * this.speed;
		}
	}

	if (this.left && !this.right && plateau.x >= 0) {
		plateau.x -= 1.5 * this.speed;
	}
	if (this.right && !this.left && plateau.x + plateau.w <= this.$canvas.width) {
		plateau.x += 1.5 * this.speed;
	}

	var _iteratorNormalCompletion4 = true;
	var _didIteratorError4 = false;
	var _iteratorError4 = undefined;

	try {
		for (var _iterator4 = this.objects[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
			var brique = _step4.value;

			if (!brique.isMissile()) {
				if (brique.isPlateau() && this.collision(missile, brique) || brique.l > -1 && this.collision(missile, brique)) {
					brique.l--;
					renewDY = true;
					this.isRunning = false;
					this.isStart = false;
				}
			}
		}
	} catch (err) {
		_didIteratorError4 = true;
		_iteratorError4 = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion4 && _iterator4.return) {
				_iterator4.return();
			}
		} finally {
			if (_didIteratorError4) {
				throw _iteratorError4;
			}
		}
	}
});

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(0);

var Missile = function (_Base) {
	_inherits(Missile, _Base);

	function Missile(x, y, r, dy, l) {
		_classCallCheck(this, Missile);

		var _this = _possibleConstructorReturn(this, (Missile.__proto__ || Object.getPrototypeOf(Missile)).call(this, x, y));

		_this.r = r;
		_this.dy = dy;
		_this.l = l;
		return _this;
	}

	_createClass(Missile, [{
		key: 'isMissile',
		value: function isMissile() {
			return true;
		}
	}]);

	return Missile;
}(Base);

module.exports = Missile;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(0);

var Plateau = function (_Base) {
	_inherits(Plateau, _Base);

	function Plateau(x, y, w, h, l) {
		_classCallCheck(this, Plateau);

		var _this = _possibleConstructorReturn(this, (Plateau.__proto__ || Object.getPrototypeOf(Plateau)).call(this, x, y));

		_this.w = w;
		_this.h = h;
		_this.l = l;
		return _this;
	}

	_createClass(Plateau, [{
		key: 'isPlateau',
		value: function isPlateau() {
			return true;
		}
	}]);

	return Plateau;
}(Base);

module.exports = Plateau;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Base = __webpack_require__(0);

var Monster = function (_Base) {
	_inherits(Monster, _Base);

	function Monster(x, y, w, h, dx, dy, l) {
		_classCallCheck(this, Monster);

		var _this = _possibleConstructorReturn(this, (Monster.__proto__ || Object.getPrototypeOf(Monster)).call(this, x, y));

		_this.w = w;
		_this.h = h;
		_this.dx = dx;
		_this.dy = dy;
		_this.l = l;
		return _this;
	}

	_createClass(Monster, [{
		key: 'isMonster',
		value: function isMonster() {
			return true;
		}
	}]);

	return Monster;
}(Base);

module.exports = Monster;

/***/ })
/******/ ]);