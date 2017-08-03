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
		key: "isBrique",
		value: function isBrique() {
			return false;
		}
	}, {
		key: "isBall",
		value: function isBall() {
			return false;
		}
	}, {
		key: "isPlateau",
		value: function isPlateau() {
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

var Ball = __webpack_require__(2);
var Plateau = __webpack_require__(3);
var Brique = __webpack_require__(4);

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
		this.briquesColors = ["black", "red", "green", "orange"];
		this.isStart = false;
		this.isRunning = false;
		this.context = this.$canvas.getContext("2d");
		this.briquesDesign = [];
		this.objects = [new Plateau(this.$canvas.width / 2 - this.$canvas.width / 10 / 2, this.$canvas.height - 20, this.$canvas.width / 10, 20), new Ball(this.$canvas.width / 2, this.$canvas.height - (21 + 20 / 3), 20 / 3, this.speed / 3, -(this.speed / 3))];

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
		key: 'generateMap',
		value: function generateMap(array) {
			if (!array) {
				var colLength = Math.floor(Math.random() * (50 - 10)) + 10;
				var lineLength = Math.floor(Math.random() * (8 - 4)) + 4;

				for (var line = 0; line < lineLength; line++) {
					this.briquesDesign.push([]);
					for (var col = 0; col < colLength; col++) {
						this.briquesDesign[line].push(Math.floor(Math.random() * (0 - 3)) + 3);
					}
				}
			} else {
				this.briquesDesign = array;
			}

			var briqueMaxWidth = this.$canvas.width / this.briquesDesign[0].length - 2;
			for (var briquesLineID in this.briquesDesign) {
				var briquesLine = this.briquesDesign[briquesLineID];
				for (var briquesColID in briquesLine) {
					this.objects.push(new Brique(briquesColID * briqueMaxWidth + briquesColID * 2 + 1, briquesLineID * 20 + briquesLineID * 2 + 1, briqueMaxWidth, 20, briquesLine[briquesColID]));
				}
			}
		}
	}, {
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
		key: 'animateContext',
		value: function animateContext() {
			this.context.clearRect(0, 0, this.$canvas.width, this.$canvas.height);
			var _iteratorNormalCompletion = true;
			var _didIteratorError = false;
			var _iteratorError = undefined;

			try {
				for (var _iterator = this.objects[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
					var object = _step.value;

					if (object.isPlateau() || object.isBrique()) {
						if (object.l >= 0 || object.isPlateau()) {
							this.context.fillStyle = this.briquesColors[object.l || 0];
							this.context.fillRect(object.x, object.y, object.w, object.h);
						}
					} else if (object.isBall()) {
						this.context.beginPath();
						this.context.arc(object.x, object.y, object.r, 2 * Math.PI, false);
						this.context.fillStyle = this.briquesColors[0];
						this.context.fill();
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
		key: 'getPlateau',
		value: function getPlateau() {
			var _iteratorNormalCompletion2 = true;
			var _didIteratorError2 = false;
			var _iteratorError2 = undefined;

			try {
				for (var _iterator2 = this.objects[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
					var object = _step2.value;

					if (object.isPlateau()) {
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
		key: 'getBall',
		value: function getBall() {
			var _iteratorNormalCompletion3 = true;
			var _didIteratorError3 = false;
			var _iteratorError3 = undefined;

			try {
				for (var _iterator3 = this.objects[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
					var object = _step3.value;

					if (object.isBall()) {
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
				return true;
			}
			if (distY <= rect.h / 2) {
				return true;
			}

			var dx = distX - rect.w / 2;
			var dy = distY - rect.h / 2;

			return dx * dx + dy * dy <= circle.r * circle.r;
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
window.game.generateMap([[0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]]);

window.game.run(function () {
	var renewDY = false;
	var plateau = this.getPlateau();
	var ball = this.getBall();

	if (this.isRunning) {
		ball.x = ball.x + ball.dx * (this.speed / 2);
		ball.y = ball.y + ball.dy * (this.speed / 2);

		if (ball.x + ball.r >= this.$canvas.width) {
			ball.dx = -Math.abs(ball.dx);
		}
		if (ball.x - ball.r <= 0) {
			ball.dx = Math.abs(ball.dx);
		}
		if (ball.y + ball.r >= this.$canvas.height) {
			ball.dy = -Math.abs(ball.dy);this.isRunning = false;
		} // gameOver
		if (ball.y - ball.r <= 0) {
			ball.dy = Math.abs(ball.dy);
		}
	}

	if (!this.isStart) {
		if (this.left && !this.right && plateau.x >= 0) {
			ball.x -= 1.5 * this.speed;
		}
		if (this.right && !this.left && plateau.x + plateau.w <= this.$canvas.width) {
			ball.x += 1.5 * this.speed;
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

			if (!brique.isBall()) {
				if (brique.isPlateau() && this.collision(ball, brique) || brique.l > -1 && this.collision(ball, brique)) {
					if (brique.isBrique()) {
						brique.l--;
					} else {
						var zone = brique.w / 6;
						var balance = ball.x - brique.x;
						if (balance >= zone * 5) {
							ball.dx = 3;
						} else if (balance >= zone * 4) {
							ball.dx = 2;
						} else if (balance >= zone * 3) {
							ball.dx = 1;
						} else if (balance >= zone * 2) {
							ball.dx = -1;
						} else if (balance >= zone * 1) {
							ball.dx = -2;
						} else if (balance >= zone * 0) {
							ball.dx = -3;
						}
					}
					renewDY = true;
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

	if (renewDY) {
		ball.dy = ball.dy > 0 ? -Math.abs(ball.dy) : Math.abs(ball.dy);
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

var Ball = function (_Base) {
	_inherits(Ball, _Base);

	function Ball(x, y, r, dx, dy) {
		_classCallCheck(this, Ball);

		var _this = _possibleConstructorReturn(this, (Ball.__proto__ || Object.getPrototypeOf(Ball)).call(this, x, y));

		_this.r = r;
		_this.dx = dx;
		_this.dy = dy;

		console.log(_this);
		return _this;
	}

	_createClass(Ball, [{
		key: 'isBall',
		value: function isBall() {
			return true;
		}
	}]);

	return Ball;
}(Base);

module.exports = Ball;

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

	function Plateau(x, y, w, h) {
		_classCallCheck(this, Plateau);

		var _this = _possibleConstructorReturn(this, (Plateau.__proto__ || Object.getPrototypeOf(Plateau)).call(this, x, y));

		_this.w = w;
		_this.h = h;
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

var Brique = function (_Base) {
	_inherits(Brique, _Base);

	function Brique(x, y, w, h, l) {
		_classCallCheck(this, Brique);

		var _this = _possibleConstructorReturn(this, (Brique.__proto__ || Object.getPrototypeOf(Brique)).call(this, x, y));

		_this.w = w;
		_this.h = h;
		_this.l = l;
		return _this;
	}

	_createClass(Brique, [{
		key: 'isBrique',
		value: function isBrique() {
			return true;
		}
	}]);

	return Brique;
}(Base);

module.exports = Brique;

/***/ })
/******/ ]);