(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["buttplug-devtools-commonjs"] = factory();
	else
		root["ButtplugDevTools"] = factory();
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/devtools/web/index.web.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "../index":
/***/ (function(module, exports) {

module.exports = Buttplug;

/***/ }),

/***/ "./node_modules/@tweenjs/tween.js/src/Tween.js":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/**
 * Tween.js - Licensed under the MIT license
 * https://github.com/tweenjs/tween.js
 * ----------------------------------------------
 *
 * See https://github.com/tweenjs/tween.js/graphs/contributors for the full list of contributors.
 * Thank you all, you're awesome!
 */


var _Group = function () {
	this._tweens = {};
	this._tweensAddedDuringUpdate = {};
};

_Group.prototype = {
	getAll: function () {

		return Object.keys(this._tweens).map(function (tweenId) {
			return this._tweens[tweenId];
		}.bind(this));

	},

	removeAll: function () {

		this._tweens = {};

	},

	add: function (tween) {

		this._tweens[tween.getId()] = tween;
		this._tweensAddedDuringUpdate[tween.getId()] = tween;

	},

	remove: function (tween) {

		delete this._tweens[tween.getId()];
		delete this._tweensAddedDuringUpdate[tween.getId()];

	},

	update: function (time, preserve) {

		var tweenIds = Object.keys(this._tweens);

		if (tweenIds.length === 0) {
			return false;
		}

		time = time !== undefined ? time : TWEEN.now();

		// Tweens are updated in "batches". If you add a new tween during an update, then the
		// new tween will be updated in the next batch.
		// If you remove a tween during an update, it may or may not be updated. However,
		// if the removed tween was added during the current batch, then it will not be updated.
		while (tweenIds.length > 0) {
			this._tweensAddedDuringUpdate = {};

			for (var i = 0; i < tweenIds.length; i++) {

				var tween = this._tweens[tweenIds[i]];

				if (tween && tween.update(time) === false) {
					tween._isPlaying = false;

					if (!preserve) {
						delete this._tweens[tweenIds[i]];
					}
				}
			}

			tweenIds = Object.keys(this._tweensAddedDuringUpdate);
		}

		return true;

	}
};

var TWEEN = new _Group();

TWEEN.Group = _Group;
TWEEN._nextId = 0;
TWEEN.nextId = function () {
	return TWEEN._nextId++;
};


// Include a performance.now polyfill.
// In node.js, use process.hrtime.
if (typeof (window) === 'undefined' && typeof (process) !== 'undefined') {
	TWEEN.now = function () {
		var time = process.hrtime();

		// Convert [seconds, nanoseconds] to milliseconds.
		return time[0] * 1000 + time[1] / 1000000;
	};
}
// In a browser, use window.performance.now if it is available.
else if (typeof (window) !== 'undefined' &&
         window.performance !== undefined &&
		 window.performance.now !== undefined) {
	// This must be bound, because directly assigning this function
	// leads to an invocation exception in Chrome.
	TWEEN.now = window.performance.now.bind(window.performance);
}
// Use Date.now if it is available.
else if (Date.now !== undefined) {
	TWEEN.now = Date.now;
}
// Otherwise, use 'new Date().getTime()'.
else {
	TWEEN.now = function () {
		return new Date().getTime();
	};
}


TWEEN.Tween = function (object, group) {
	this._object = object;
	this._valuesStart = {};
	this._valuesEnd = {};
	this._valuesStartRepeat = {};
	this._duration = 1000;
	this._repeat = 0;
	this._repeatDelayTime = undefined;
	this._yoyo = false;
	this._isPlaying = false;
	this._reversed = false;
	this._delayTime = 0;
	this._startTime = null;
	this._easingFunction = TWEEN.Easing.Linear.None;
	this._interpolationFunction = TWEEN.Interpolation.Linear;
	this._chainedTweens = [];
	this._onStartCallback = null;
	this._onStartCallbackFired = false;
	this._onUpdateCallback = null;
	this._onCompleteCallback = null;
	this._onStopCallback = null;
	this._group = group || TWEEN;
	this._id = TWEEN.nextId();

};

TWEEN.Tween.prototype = {
	getId: function getId() {
		return this._id;
	},

	isPlaying: function isPlaying() {
		return this._isPlaying;
	},

	to: function to(properties, duration) {

		this._valuesEnd = properties;

		if (duration !== undefined) {
			this._duration = duration;
		}

		return this;

	},

	start: function start(time) {

		this._group.add(this);

		this._isPlaying = true;

		this._onStartCallbackFired = false;

		this._startTime = time !== undefined ? typeof time === 'string' ? TWEEN.now() + parseFloat(time) : time : TWEEN.now();
		this._startTime += this._delayTime;

		for (var property in this._valuesEnd) {

			// Check if an Array was provided as property value
			if (this._valuesEnd[property] instanceof Array) {

				if (this._valuesEnd[property].length === 0) {
					continue;
				}

				// Create a local copy of the Array with the start value at the front
				this._valuesEnd[property] = [this._object[property]].concat(this._valuesEnd[property]);

			}

			// If `to()` specifies a property that doesn't exist in the source object,
			// we should not set that property in the object
			if (this._object[property] === undefined) {
				continue;
			}

			// Save the starting value.
			this._valuesStart[property] = this._object[property];

			if ((this._valuesStart[property] instanceof Array) === false) {
				this._valuesStart[property] *= 1.0; // Ensures we're using numbers, not strings
			}

			this._valuesStartRepeat[property] = this._valuesStart[property] || 0;

		}

		return this;

	},

	stop: function stop() {

		if (!this._isPlaying) {
			return this;
		}

		this._group.remove(this);
		this._isPlaying = false;

		if (this._onStopCallback !== null) {
			this._onStopCallback(this._object);
		}

		this.stopChainedTweens();
		return this;

	},

	end: function end() {

		this.update(this._startTime + this._duration);
		return this;

	},

	stopChainedTweens: function stopChainedTweens() {

		for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
			this._chainedTweens[i].stop();
		}

	},

	group: function group(group) {
		this._group = group;
		return this;
	},

	delay: function delay(amount) {

		this._delayTime = amount;
		return this;

	},

	repeat: function repeat(times) {

		this._repeat = times;
		return this;

	},

	repeatDelay: function repeatDelay(amount) {

		this._repeatDelayTime = amount;
		return this;

	},

	yoyo: function yoyo(yy) {

		this._yoyo = yy;
		return this;

	},

	easing: function easing(eas) {

		this._easingFunction = eas;
		return this;

	},

	interpolation: function interpolation(inter) {

		this._interpolationFunction = inter;
		return this;

	},

	chain: function chain() {

		this._chainedTweens = arguments;
		return this;

	},

	onStart: function onStart(callback) {

		this._onStartCallback = callback;
		return this;

	},

	onUpdate: function onUpdate(callback) {

		this._onUpdateCallback = callback;
		return this;

	},

	onComplete: function onComplete(callback) {

		this._onCompleteCallback = callback;
		return this;

	},

	onStop: function onStop(callback) {

		this._onStopCallback = callback;
		return this;

	},

	update: function update(time) {

		var property;
		var elapsed;
		var value;

		if (time < this._startTime) {
			return true;
		}

		if (this._onStartCallbackFired === false) {

			if (this._onStartCallback !== null) {
				this._onStartCallback(this._object);
			}

			this._onStartCallbackFired = true;
		}

		elapsed = (time - this._startTime) / this._duration;
		elapsed = (this._duration === 0 || elapsed > 1) ? 1 : elapsed;

		value = this._easingFunction(elapsed);

		for (property in this._valuesEnd) {

			// Don't update properties that do not exist in the source object
			if (this._valuesStart[property] === undefined) {
				continue;
			}

			var start = this._valuesStart[property] || 0;
			var end = this._valuesEnd[property];

			if (end instanceof Array) {

				this._object[property] = this._interpolationFunction(end, value);

			} else {

				// Parses relative end values with start as base (e.g.: +10, -3)
				if (typeof (end) === 'string') {

					if (end.charAt(0) === '+' || end.charAt(0) === '-') {
						end = start + parseFloat(end);
					} else {
						end = parseFloat(end);
					}
				}

				// Protect against non numeric properties.
				if (typeof (end) === 'number') {
					this._object[property] = start + (end - start) * value;
				}

			}

		}

		if (this._onUpdateCallback !== null) {
			this._onUpdateCallback(this._object);
		}

		if (elapsed === 1) {

			if (this._repeat > 0) {

				if (isFinite(this._repeat)) {
					this._repeat--;
				}

				// Reassign starting values, restart by making startTime = now
				for (property in this._valuesStartRepeat) {

					if (typeof (this._valuesEnd[property]) === 'string') {
						this._valuesStartRepeat[property] = this._valuesStartRepeat[property] + parseFloat(this._valuesEnd[property]);
					}

					if (this._yoyo) {
						var tmp = this._valuesStartRepeat[property];

						this._valuesStartRepeat[property] = this._valuesEnd[property];
						this._valuesEnd[property] = tmp;
					}

					this._valuesStart[property] = this._valuesStartRepeat[property];

				}

				if (this._yoyo) {
					this._reversed = !this._reversed;
				}

				if (this._repeatDelayTime !== undefined) {
					this._startTime = time + this._repeatDelayTime;
				} else {
					this._startTime = time + this._delayTime;
				}

				return true;

			} else {

				if (this._onCompleteCallback !== null) {

					this._onCompleteCallback(this._object);
				}

				for (var i = 0, numChainedTweens = this._chainedTweens.length; i < numChainedTweens; i++) {
					// Make the chained tweens start exactly at the time they should,
					// even if the `update()` method was called way past the duration of the tween
					this._chainedTweens[i].start(this._startTime + this._duration);
				}

				return false;

			}

		}

		return true;

	}
};


TWEEN.Easing = {

	Linear: {

		None: function (k) {

			return k;

		}

	},

	Quadratic: {

		In: function (k) {

			return k * k;

		},

		Out: function (k) {

			return k * (2 - k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k;
			}

			return - 0.5 * (--k * (k - 2) - 1);

		}

	},

	Cubic: {

		In: function (k) {

			return k * k * k;

		},

		Out: function (k) {

			return --k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k + 2);

		}

	},

	Quartic: {

		In: function (k) {

			return k * k * k * k;

		},

		Out: function (k) {

			return 1 - (--k * k * k * k);

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k;
			}

			return - 0.5 * ((k -= 2) * k * k * k - 2);

		}

	},

	Quintic: {

		In: function (k) {

			return k * k * k * k * k;

		},

		Out: function (k) {

			return --k * k * k * k * k + 1;

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return 0.5 * k * k * k * k * k;
			}

			return 0.5 * ((k -= 2) * k * k * k * k + 2);

		}

	},

	Sinusoidal: {

		In: function (k) {

			return 1 - Math.cos(k * Math.PI / 2);

		},

		Out: function (k) {

			return Math.sin(k * Math.PI / 2);

		},

		InOut: function (k) {

			return 0.5 * (1 - Math.cos(Math.PI * k));

		}

	},

	Exponential: {

		In: function (k) {

			return k === 0 ? 0 : Math.pow(1024, k - 1);

		},

		Out: function (k) {

			return k === 1 ? 1 : 1 - Math.pow(2, - 10 * k);

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			if ((k *= 2) < 1) {
				return 0.5 * Math.pow(1024, k - 1);
			}

			return 0.5 * (- Math.pow(2, - 10 * (k - 1)) + 2);

		}

	},

	Circular: {

		In: function (k) {

			return 1 - Math.sqrt(1 - k * k);

		},

		Out: function (k) {

			return Math.sqrt(1 - (--k * k));

		},

		InOut: function (k) {

			if ((k *= 2) < 1) {
				return - 0.5 * (Math.sqrt(1 - k * k) - 1);
			}

			return 0.5 * (Math.sqrt(1 - (k -= 2) * k) + 1);

		}

	},

	Elastic: {

		In: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return -Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);

		},

		Out: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			return Math.pow(2, -10 * k) * Math.sin((k - 0.1) * 5 * Math.PI) + 1;

		},

		InOut: function (k) {

			if (k === 0) {
				return 0;
			}

			if (k === 1) {
				return 1;
			}

			k *= 2;

			if (k < 1) {
				return -0.5 * Math.pow(2, 10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI);
			}

			return 0.5 * Math.pow(2, -10 * (k - 1)) * Math.sin((k - 1.1) * 5 * Math.PI) + 1;

		}

	},

	Back: {

		In: function (k) {

			var s = 1.70158;

			return k * k * ((s + 1) * k - s);

		},

		Out: function (k) {

			var s = 1.70158;

			return --k * k * ((s + 1) * k + s) + 1;

		},

		InOut: function (k) {

			var s = 1.70158 * 1.525;

			if ((k *= 2) < 1) {
				return 0.5 * (k * k * ((s + 1) * k - s));
			}

			return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);

		}

	},

	Bounce: {

		In: function (k) {

			return 1 - TWEEN.Easing.Bounce.Out(1 - k);

		},

		Out: function (k) {

			if (k < (1 / 2.75)) {
				return 7.5625 * k * k;
			} else if (k < (2 / 2.75)) {
				return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
			} else if (k < (2.5 / 2.75)) {
				return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
			} else {
				return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
			}

		},

		InOut: function (k) {

			if (k < 0.5) {
				return TWEEN.Easing.Bounce.In(k * 2) * 0.5;
			}

			return TWEEN.Easing.Bounce.Out(k * 2 - 1) * 0.5 + 0.5;

		}

	}

};

TWEEN.Interpolation = {

	Linear: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.Linear;

		if (k < 0) {
			return fn(v[0], v[1], f);
		}

		if (k > 1) {
			return fn(v[m], v[m - 1], m - f);
		}

		return fn(v[i], v[i + 1 > m ? m : i + 1], f - i);

	},

	Bezier: function (v, k) {

		var b = 0;
		var n = v.length - 1;
		var pw = Math.pow;
		var bn = TWEEN.Interpolation.Utils.Bernstein;

		for (var i = 0; i <= n; i++) {
			b += pw(1 - k, n - i) * pw(k, i) * v[i] * bn(n, i);
		}

		return b;

	},

	CatmullRom: function (v, k) {

		var m = v.length - 1;
		var f = m * k;
		var i = Math.floor(f);
		var fn = TWEEN.Interpolation.Utils.CatmullRom;

		if (v[0] === v[m]) {

			if (k < 0) {
				i = Math.floor(f = m * (1 + k));
			}

			return fn(v[(i - 1 + m) % m], v[i], v[(i + 1) % m], v[(i + 2) % m], f - i);

		} else {

			if (k < 0) {
				return v[0] - (fn(v[0], v[0], v[1], v[1], -f) - v[0]);
			}

			if (k > 1) {
				return v[m] - (fn(v[m], v[m], v[m - 1], v[m - 1], f - m) - v[m]);
			}

			return fn(v[i ? i - 1 : 0], v[i], v[m < i + 1 ? m : i + 1], v[m < i + 2 ? m : i + 2], f - i);

		}

	},

	Utils: {

		Linear: function (p0, p1, t) {

			return (p1 - p0) * t + p0;

		},

		Bernstein: function (n, i) {

			var fc = TWEEN.Interpolation.Utils.Factorial;

			return fc(n) / fc(i) / fc(n - i);

		},

		Factorial: (function () {

			var a = [1];

			return function (n) {

				var s = 1;

				if (a[n]) {
					return a[n];
				}

				for (var i = n; i > 1; i--) {
					s *= i;
				}

				a[n] = s;
				return s;

			};

		})(),

		CatmullRom: function (p0, p1, p2, p3, t) {

			var v0 = (p2 - p0) * 0.5;
			var v1 = (p3 - p1) * 0.5;
			var t2 = t * t;
			var t3 = t * t2;

			return (2 * p1 - 2 * p2 + v0 + v1) * t3 + (- 3 * p1 + 3 * p2 - 2 * v0 - v1) * t2 + v0 * t + p1;

		}

	}

};

// UMD (Universal Module Definition)
(function (root) {

	if (true) {

		// AMD
		!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = (function () {
			return TWEEN;
		}).apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));

	} else {}

})(this);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./node_modules/css-loader/index.js!./node_modules/jspanel4/dist/jspanel.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "/* jspanel.sass: 2018-10-21 13:41 */\n/* http://stackoverflow.com/questions/30421570/sass-unicode-escape-is-not-preserved-in-css-file */\n.jsPanel {\n  border: 0;\n  box-sizing: border-box;\n  vertical-align: baseline;\n  font-family: Roboto,\"Open Sans\",Lato,\"Helvetica Neue\",Arial,sans-serif;\n  font-weight: normal;\n  display: flex;\n  flex-direction: column;\n  opacity: 0;\n  overflow: visible;\n  position: absolute;\n  top: 0;\n  z-index: 100; }\n  .jsPanel .jsPanel-hdr {\n    border: 0;\n    box-sizing: border-box;\n    vertical-align: baseline;\n    font-family: Roboto,\"Open Sans\",Lato,\"Helvetica Neue\",Arial,sans-serif;\n    font-weight: normal;\n    font-size: 1rem;\n    display: flex;\n    flex-direction: column;\n    flex-shrink: 0; }\n  .jsPanel .jsPanel-content {\n    border: 0;\n    box-sizing: border-box;\n    vertical-align: baseline;\n    font-family: Roboto,\"Open Sans\",Lato,\"Helvetica Neue\",Arial,sans-serif;\n    font-weight: normal;\n    background: #ffffff;\n    color: #000000;\n    font-size: 1rem;\n    position: relative;\n    overflow-x: hidden;\n    overflow-y: auto;\n    flex-grow: 1; }\n    .jsPanel .jsPanel-content pre {\n      color: inherit; }\n  .jsPanel .jsPanel-ftr {\n    flex-direction: row;\n    justify-content: flex-end;\n    flex-wrap: nowrap;\n    align-items: center;\n    border-top: 1px solid #e0e0e0;\n    display: none;\n    box-sizing: border-box;\n    font-size: 1rem;\n    height: auto;\n    background: #f5f5f5;\n    font-weight: normal;\n    color: black;\n    overflow: hidden; }\n  .jsPanel .jsPanel-ftr.active {\n    display: flex;\n    flex-shrink: 0; }\n    .jsPanel .jsPanel-ftr.active > * {\n      margin: 3px 8px; }\n  .jsPanel .jsPanel-ftr.panel-footer {\n    padding: 0; }\n\n.jsPanel-headerbar, .jsPanel-hdr-toolbar {\n  font-size: 1rem; }\n\n.jsPanel-headerbar {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center; }\n  .jsPanel-headerbar img {\n    vertical-align: middle;\n    max-height: 38px; }\n\n.jsPanel-titlebar {\n  display: flex;\n  align-items: center;\n  flex: 1 1 0px;\n  cursor: move;\n  height: 100%;\n  overflow: hidden; }\n  .jsPanel-titlebar .jsPanel-title {\n    white-space: nowrap;\n    overflow: hidden;\n    text-overflow: ellipsis;\n    font-size: 1rem;\n    font-variant: small-caps;\n    font-weight: normal;\n    line-height: 1.5;\n    margin: 0 5px 0 8px;\n    min-width: 0; }\n    .jsPanel-titlebar .jsPanel-title small {\n      font-size: 70%;\n      color: inherit; }\n\n.jsPanel-titlebar.jsPanel-rtl {\n  flex-direction: row-reverse; }\n\n.jsPanel-controlbar {\n  display: flex;\n  align-items: center;\n  touch-action: none; }\n  .jsPanel-controlbar div span:hover, .jsPanel-controlbar div svg:hover {\n    opacity: .6; }\n  .jsPanel-controlbar .jsPanel-btn {\n    cursor: pointer;\n    touch-action: none;\n    padding: 6px 8px 8px 3px; }\n    .jsPanel-controlbar .jsPanel-btn span {\n      vertical-align: middle;\n      padding: 0 4px 0 2px; }\n    .jsPanel-controlbar .jsPanel-btn span.glyphicon {\n      padding: 0 2px; }\n    .jsPanel-controlbar .jsPanel-btn svg.jsPanel-icon {\n      vertical-align: middle; }\n  .jsPanel-controlbar .jsPanel-btn-normalize, .jsPanel-controlbar .jsPanel-btn-smallifyrev {\n    display: none; }\n\n.jsPanel-hdr-toolbar {\n  display: none;\n  width: auto;\n  height: auto; }\n\n.jsPanel-hdr-toolbar.active {\n  box-sizing: border-box;\n  display: flex;\n  flex-direction: row;\n  flex-wrap: nowrap;\n  align-items: center; }\n  .jsPanel-hdr-toolbar.active > * {\n    margin: 3px 8px; }\n\n/* styles for panels using option.rtl */\n.jsPanel-headerbar.jsPanel-rtl, .jsPanel-controlbar.jsPanel-rtl, .jsPanel-hdr-toolbar.jsPanel-rtl {\n  flex-direction: row-reverse; }\n\n.jsPanel-hdr-toolbar.active.jsPanel-rtl {\n  padding: 7px 0 10px 0; }\n\n.jsPanel-ftr.jsPanel-rtl {\n  flex-direction: row; }\n\n/* container that takes the minified jsPanels */\n#jsPanel-replacement-container, .jsPanel-minimized-box, .jsPanel-minimized-container {\n  display: flex;\n  flex-flow: row wrap-reverse;\n  background: transparent none repeat scroll 0 0;\n  bottom: 0;\n  height: auto;\n  left: 0;\n  position: fixed;\n  width: auto;\n  z-index: 9998; }\n  #jsPanel-replacement-container .jsPanel-replacement, .jsPanel-minimized-box .jsPanel-replacement, .jsPanel-minimized-container .jsPanel-replacement {\n    font-family: Roboto,\"Open Sans\",Lato,\"Helvetica Neue\",Arial,sans-serif;\n    display: flex;\n    align-items: center;\n    width: 200px;\n    height: 40px;\n    margin: 1px 1px 0 0;\n    z-index: 9999; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr {\n      flex-grow: 1;\n      min-width: 0;\n      padding: 0; }\n      #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo {\n        max-width: 50%;\n        overflow: hidden; }\n        #jsPanel-replacement-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-hdr .jsPanel-headerlogo img {\n          max-width: 100px;\n          max-height: 38px; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-titlebar, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-titlebar, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-titlebar {\n      cursor: default;\n      min-width: 0; }\n    #jsPanel-replacement-container .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize, .jsPanel-minimized-box .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize, .jsPanel-minimized-container .jsPanel-replacement .jsPanel-btn.jsPanel-btn-normalize {\n      display: block; }\n\n.jsPanel-minimized-box, .jsPanel-minimized-container {\n  position: absolute;\n  width: 100%;\n  overflow: hidden; }\n\n/* helper classes to make .jsPanel-content a flex box */\n.flexOne {\n  display: flex;\n  flex-flow: row wrap; }\n\n/* css for resizeit handles ------------------------- */\n.jsPanel-resizeit-handle {\n  display: block;\n  font-size: 0.1px;\n  position: absolute;\n  touch-action: none; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-n {\n  cursor: n-resize;\n  height: 12px;\n  left: 9px;\n  top: -5px;\n  width: calc(100% - 18px); }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-e {\n  cursor: e-resize;\n  height: calc(100% - 18px);\n  right: -9px;\n  top: 9px;\n  width: 12px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-s {\n  bottom: -9px;\n  cursor: s-resize;\n  height: 12px;\n  left: 9px;\n  width: calc(100% - 18px); }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-w {\n  cursor: w-resize;\n  height: calc(100% - 18px);\n  left: -9px;\n  top: 9px;\n  width: 12px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-ne {\n  cursor: ne-resize;\n  height: 18px;\n  right: -9px;\n  top: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-se {\n  bottom: -9px;\n  cursor: se-resize;\n  height: 18px;\n  right: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-sw {\n  bottom: -9px;\n  cursor: sw-resize;\n  height: 18px;\n  left: -9px;\n  width: 18px; }\n\n.jsPanel-resizeit-handle.jsPanel-resizeit-nw {\n  cursor: nw-resize;\n  height: 18px;\n  left: -9px;\n  top: -9px;\n  width: 18px; }\n\n.jsPanel-drag-overlay {\n  width: 100%;\n  height: 100%;\n  position: absolute;\n  left: 0;\n  top: 0; }\n\n/* box-shadows --------------------------------------------------------------------- */\n.jsPanel-depth-1 {\n  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23); }\n\n.jsPanel-depth-2 {\n  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23); }\n\n.jsPanel-depth-3 {\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22); }\n\n.jsPanel-depth-4 {\n  box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22); }\n\n.jsPanel-depth-5 {\n  box-shadow: 0 24px 48px rgba(0, 0, 0, 0.3), 0 20px 14px rgba(0, 0, 0, 0.22); }\n\n/* snap sensitive areas ------------------------------------------------------------------------------ */\n.jsPanel-snap-area {\n  position: fixed;\n  background: black;\n  opacity: .2;\n  border: 1px solid silver;\n  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.5), 0 10px 10px rgba(0, 0, 0, 0.5);\n  z-index: 9999; }\n\n.jsPanel-snap-area-lt, .jsPanel-snap-area-lc, .jsPanel-snap-area-lb, .jsPanel-snap-area-left-top, .jsPanel-snap-area-left-center, .jsPanel-snap-area-left-bottom {\n  left: 0; }\n\n.jsPanel-snap-area-ct, .jsPanel-snap-area-cb {\n  left: 37.5%; }\n\n.jsPanel-snap-area-rt, .jsPanel-snap-area-rc, .jsPanel-snap-area-rb, .jsPanel-snap-area-right-top, .jsPanel-snap-area-right-center, .jsPanel-snap-area-right-bottom {\n  right: 0; }\n\n.jsPanel-snap-area-lt, .jsPanel-snap-area-ct, .jsPanel-snap-area-rt, .jsPanel-snap-area-left-top, .jsPanel-snap-area-center-top, .jsPanel-snap-area-right-top {\n  top: 0; }\n\n.jsPanel-snap-area-lc, .jsPanel-snap-area-rc {\n  top: 37.5%; }\n\n.jsPanel-snap-area-lb, .jsPanel-snap-area-cb, .jsPanel-snap-area-rb, .jsPanel-snap-area-left-bottom, .jsPanel-snap-area-center-bottom, .jsPanel-snap-area-right-bottom {\n  bottom: 0; }\n\n.jsPanel-snap-area-ct, .jsPanel-snap-area-cb {\n  width: 25%; }\n\n.jsPanel-snap-area-lc, .jsPanel-snap-area-rc {\n  height: 25%; }\n\n.jsPanel-snap-area-lt, .jsPanel-snap-area-left-top {\n  border-bottom-right-radius: 100%; }\n\n.jsPanel-snap-area-rt, .jsPanel-snap-area-right-top {\n  border-bottom-left-radius: 100%; }\n\n.jsPanel-snap-area-rb, .jsPanel-snap-area-right-bottom {\n  border-top-left-radius: 100%; }\n\n.jsPanel-snap-area-lb, .jsPanel-snap-area-left-bottom {\n  border-top-right-radius: 100%; }\n\n/* tooltip and tooltip connectors */\n.jsPanel-connector-left-top-corner,\n.jsPanel-connector-right-top-corner,\n.jsPanel-connector-left-bottom-corner,\n.jsPanel-connector-right-bottom-corner {\n  width: 12px;\n  height: 12px;\n  position: absolute;\n  border-radius: 50%; }\n\n.jsPanel-connector-left-top-corner {\n  left: calc(100% - 6px);\n  top: calc(100% - 6px); }\n\n.jsPanel-connector-right-top-corner {\n  left: -6px;\n  top: calc(100% - 6px); }\n\n.jsPanel-connector-right-bottom-corner {\n  left: -6px;\n  top: -6px; }\n\n.jsPanel-connector-left-bottom-corner {\n  left: calc(100% - 6px);\n  top: -6px; }\n\n.jsPanel-connector-top,\n.jsPanel-connector-topleft,\n.jsPanel-connector-topright,\n.jsPanel-connector-bottom,\n.jsPanel-connector-bottomleft,\n.jsPanel-connector-bottomright,\n.jsPanel-connector-left,\n.jsPanel-connector-lefttop,\n.jsPanel-connector-leftbottom,\n.jsPanel-connector-right,\n.jsPanel-connector-righttop,\n.jsPanel-connector-rightbottom {\n  width: 0;\n  height: 0;\n  position: absolute;\n  border: 12px solid transparent; }\n\n.jsPanel-connector-top,\n.jsPanel-connector-topleft,\n.jsPanel-connector-topright {\n  top: 100%;\n  border-bottom-width: 0; }\n\n.jsPanel-connector-top {\n  left: calc(50% - 12px); }\n\n.jsPanel-connector-topleft {\n  left: 0px; }\n\n.jsPanel-connector-topright {\n  left: calc(100% - 24px); }\n\n.jsPanel-connector-bottom,\n.jsPanel-connector-bottomleft,\n.jsPanel-connector-bottomright {\n  top: -12px;\n  border-top-width: 0; }\n\n.jsPanel-connector-bottom {\n  left: calc(50% - 12px); }\n\n.jsPanel-connector-bottomleft {\n  left: 0px; }\n\n.jsPanel-connector-bottomright {\n  left: calc(100% - 24px); }\n\n.jsPanel-connector-left,\n.jsPanel-connector-lefttop,\n.jsPanel-connector-leftbottom {\n  left: 100%;\n  border-right-width: 0; }\n\n.jsPanel-connector-left {\n  top: calc(50% - 12px); }\n\n.jsPanel-connector-lefttop {\n  top: 0px; }\n\n.jsPanel-connector-leftbottom {\n  top: calc(100% - 24px); }\n\n.jsPanel-connector-right,\n.jsPanel-connector-righttop,\n.jsPanel-connector-rightbottom {\n  left: -12px;\n  border-left-width: 0; }\n\n.jsPanel-connector-right {\n  top: calc(50% - 12px); }\n\n.jsPanel-connector-righttop {\n  top: 0px; }\n\n.jsPanel-connector-rightbottom {\n  top: calc(100% - 24px); }\n\n/* IE11 CSS styles go here */\n@media all and (-ms-high-contrast: none), (-ms-high-contrast: active) {\n  #jsPanel-replacement-container .jsPanel-replacement .jsPanel-titlebar {\n    max-width: 105px; } }\n\n/* XXXXXXXXXXXXXXXXXXXXXXX */\n/* bootstrap adjustments */\n.jsPanel.panel-default, .jsPanel.panel-primary, .jsPanel.panel-info, .jsPanel.panel-success, .jsPanel.panel-warning, .jsPanel.panel-danger, .jsPanel.card.card-inverse {\n  box-shadow: 0 0 6px rgba(0, 33, 50, 0.1), 0 7px 25px rgba(17, 38, 60, 0.4); }\n\n.jsPanel.panel {\n  margin: 0; }\n\n.jsPanel-hdr.panel-heading {\n  border-bottom: none;\n  padding: 0; }\n\n.jsPanel-title.panel-title .small, .jsPanel-title.panel-title small {\n  font-size: 75%; }\n\n/* bootstrap 4 adjustments */\n.jsPanel.card.card-inverse {\n  box-shadow: 0 0 6px rgba(0, 33, 50, 0.1), 0 7px 25px rgba(17, 38, 60, 0.4); }\n\n.card-default {\n  background: #f5f5f5; }\n\n.card-primary > .jsPanel-content.jsPanel-content-filled,\n.card-success > .jsPanel-content.jsPanel-content-filled,\n.card-info > .jsPanel-content.jsPanel-content-filled,\n.card-warning > .jsPanel-content.jsPanel-content-filled,\n.card-danger > .jsPanel-content.jsPanel-content-filled {\n  background: transparent;\n  color: #f5f5f5; }\n\n.card-default > .jsPanel-content.jsPanel-content-filled {\n  background: transparent;\n  color: #000000; }\n\n/* css3 animations */\n@keyframes jsPanelFadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 1; } }\n\n.jsPanelFadeIn {\n  opacity: 0;\n  animation: jsPanelFadeIn ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 600ms; }\n\n@keyframes jsPanelFadeOut {\n  from {\n    opacity: 1; }\n  to {\n    opacity: 0; } }\n\n.jsPanelFadeOut {\n  animation: jsPanelFadeOut ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 600ms; }\n\n@keyframes modalBackdropFadeIn {\n  from {\n    opacity: 0; }\n  to {\n    opacity: 0.65; } }\n\n.jsPanel-modal-backdrop {\n  animation: modalBackdropFadeIn ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 750ms;\n  background: black;\n  position: fixed;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%; }\n\n@keyframes modalBackdropFadeOut {\n  from {\n    opacity: 0.65; }\n  to {\n    opacity: 0; } }\n\n.jsPanel-modal-backdrop-out {\n  animation: modalBackdropFadeOut ease-in 1;\n  animation-fill-mode: forwards;\n  animation-duration: 400ms; }\n\n.jsPanel-modal-backdrop-multi {\n  background: rgba(0, 0, 0, 0.15); }\n\n.jsPanel-content .jsPanel-iframe-overlay {\n  position: absolute;\n  top: 0;\n  width: 100%;\n  height: 100%;\n  background: transparent; }\n\n/* _themes.sass: 2017-07-12 19:16 */\n/* default ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-default {\n  background-color: #cfd8dc;\n  border-color: #cfd8dc; }\n\n.jsPanel-theme-default > .jsPanel-hdr * {\n  color: #000000; }\n\n.jsPanel-theme-default > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content {\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content.jsPanel-content-filled {\n  background-color: #cfd8dc;\n  border-top: 1px solid #90a4ae; }\n\n.jsPanel-theme-default > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #eceff1; }\n\n/* primary ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-primary {\n  background-color: #2196f3;\n  border-color: #2196f3; }\n\n.jsPanel-theme-primary > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-primary > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #42a5f5; }\n\n.jsPanel-theme-primary > .jsPanel-content {\n  border-top: 1px solid #42a5f5; }\n\n.jsPanel-theme-primary > .jsPanel-content.jsPanel-content-filled {\n  background-color: #2196f3;\n  border-top: 1px solid #42a5f5;\n  color: #ffffff; }\n\n.jsPanel-theme-primary > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #bbdefb;\n  color: #000000; }\n\n/* info ------------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-info {\n  background-color: #29b6f6;\n  border-color: #29b6f6; }\n\n.jsPanel-theme-info > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-info > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #4fc3f7; }\n\n.jsPanel-theme-info > .jsPanel-content {\n  border-top: 1px solid #4fc3f7; }\n\n.jsPanel-theme-info > .jsPanel-content.jsPanel-content-filled {\n  background-color: #29b6f6;\n  border-top: 1px solid #4fc3f7;\n  color: #ffffff; }\n\n.jsPanel-theme-info > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #e1f5fe;\n  color: #000000; }\n\n/* success ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-success {\n  background-color: #4caf50;\n  border-color: #4caf50; }\n\n.jsPanel-theme-success > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-success > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #81c784; }\n\n.jsPanel-theme-success > .jsPanel-content.jsPanel-content-filled {\n  background-color: #4caf50;\n  border-top: 1px solid #81c784;\n  color: #ffffff; }\n\n.jsPanel-theme-success > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #e8f5e9;\n  color: #000000; }\n\n/* warning ---------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-warning {\n  background-color: #ffc107;\n  border-color: #ffc107; }\n\n.jsPanel-theme-warning > .jsPanel-hdr * {\n  color: #000000; }\n\n.jsPanel-theme-warning > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #ffd54f; }\n\n.jsPanel-theme-warning > .jsPanel-content.jsPanel-content-filled {\n  background-color: #ffc107;\n  border-top: 1px solid #ffd54f;\n  color: #000000; }\n\n.jsPanel-theme-warning > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #fff3e0;\n  color: #000000; }\n\n/* danger ----------------------------------------------------------------------------------------------------------- */\n.jsPanel-theme-danger {\n  background-color: #ff3d00;\n  border-color: #ff3d00; }\n\n.jsPanel-theme-danger > .jsPanel-hdr * {\n  color: #ffffff; }\n\n.jsPanel-theme-danger > .jsPanel-hdr .jsPanel-hdr-toolbar {\n  border-top: 1px solid #ff6e40; }\n\n.jsPanel-theme-danger > .jsPanel-content.jsPanel-content-filled {\n  background-color: #ff3d00;\n  border-top: 1px solid #ff6e40;\n  color: #ffffff; }\n\n.jsPanel-theme-danger > .jsPanel-content.jsPanel-content-filledlight {\n  background-color: #ff9e80;\n  color: #000000; }\n\n.jsPanel-content.jsPanel-content-noheader {\n  border: none !important; }\n\nbody {\n  -ms-overflow-style: scrollbar; }\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/devtools/web/LogPanel.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "#buttplugdevtoolslogpanel {\n    display:flex;\n    flex-direction:column;\n    width:100%;\n    height:100%;\n    align-items:center;\n    color: #000;\n}\n\n#buttplugdevtoolslogpanel input,select,textarea {\n    color: #000;\n    background: #fff;\n}\n\n#buttplugdevtoolslogpanel #buttplugdevtoolslogtextarea {\n    font-size: 8pt;\n    width:100%;\n    flex:1 1;\n    padding:5px;\n    box-sizing:border-box;\n}\n#buttplugdevtoolslogpanel #buttplugdevtoolsloglevel {\n    width:98%;\n    flex:none;\n    padding:5px;\n    box-sizing:border-box;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/index.js!./src/devtools/web/TestDeviceManagerPanel.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("./node_modules/css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "buttplug-devtools-main {\n    width: 100%;\n    height: 100%;\n}\n\nbuttplug-devtools-main section {\n    display: none;\n    padding: 20px;\n    border-top: 1px solid #ddd;\n}\n\nbuttplug-devtools-main input {\n    display: none;\n}\n\nbuttplug-devtools-main label {\n    display: inline-block;\n    margin: 0 0 -1px;\n    padding: 5px 10px;\n    font-weight: 600;\n    text-align: center;\n    color: #bbb;\n    border: 1px solid transparent;\n}\n\nbuttplug-devtools-main label:before {\n    font-family: fontawesome;\n    font-weight: normal;\n    margin-right: 10px;\n}\n\nbuttplug-devtools-main label:hover {\n    color: #888;\n    cursor: pointer;\n}\n\nbuttplug-devtools-main input:checked + label {\n    color: #555;\n    border: 1px solid #ddd;\n    border-top: 2px solid orange;\n    border-bottom: 1px solid #fff;\n}\n\nbuttplug-devtools-main #tab1:checked ~ #content1,\nbuttplug-devtools-main #tab2:checked ~ #content2,\nbuttplug-devtools-main #tab3:checked ~ #content3,\nbuttplug-devtools-main #tab4:checked ~ #content4 {\n    display: block;\n}\n\nbuttplug-devtools-main #content1 {\n    height: 100%;\n}\n\nbuttplug-devtools-main #content2 {\n    height: 100%;\n}\n\nbuttplug-devtools-main #simulator {\n    display: flex;\n    width: 100%;\n    height: calc(100% - 60px);\n    flex-direction: row;\n}\n\nbuttplug-devtools-main .fleshlight-sim {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    height: 100%;\n    align-items: center;\n    justify-content: center;\n}\n\nbuttplug-devtools-main div.c-fleshlight {\n    display: flex;\n    flex: 1;\n}\n\nbuttplug-devtools-main div.c-fleshlight img {\n    height: 100%;\n    width: auto;\n\t  image-rendering: -moz-crisp-edges;\n\t  image-rendering: -o-crisp-edges;\n\t  image-rendering: -webkit-optimize-contrast;\n\t  image-rendering: pixelated;\n}\n\nbuttplug-devtools-main div.c-fleshlight .o-fleshlight {\n    position: relative;\n    height: 77%;\n}\n\nbuttplug-devtools-main .vibrator-simulator-component {\n    flex: 1;\n    display: flex;\n    flex-direction: column;\n    width: 100%;\n    height: 100%;\n    align-items: center;\n    justify-content: center;\n}\n\nbuttplug-devtools-main div.vibrator {\n    flex: 1 1;\n    align-items: center;\n}\n\nbuttplug-devtools-main div.vibrator-simulator-component img {\n    height: calc(100% - 40px);\n    width: auto;\n    position: relative;\n    image-rendering: -moz-crisp-edges;\n\t  image-rendering: -o-crisp-edges;\n\t  image-rendering: -webkit-optimize-contrast;\n\t  image-rendering: pixelated;\n}\n\nbuttplug-devtools-main div.vibrator-info {\n    flex: 0;\n}\n\nbuttplug-devtools-main .simulator-divider {\n    border-left: 1px #000 dashed;\n    height: 100%;\n}\n", ""]);

// exports


/***/ }),

/***/ "./node_modules/css-loader/lib/css-base.js":
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function(useSourceMap) {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		return this.map(function (item) {
			var content = cssWithMappingToString(item, useSourceMap);
			if(item[2]) {
				return "@media " + item[2] + "{" + content + "}";
			} else {
				return content;
			}
		}).join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};

function cssWithMappingToString(item, useSourceMap) {
	var content = item[1] || '';
	var cssMapping = item[3];
	if (!cssMapping) {
		return content;
	}

	if (useSourceMap && typeof btoa === 'function') {
		var sourceMapping = toComment(cssMapping);
		var sourceURLs = cssMapping.sources.map(function (source) {
			return '/*# sourceURL=' + cssMapping.sourceRoot + source + ' */'
		});

		return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
	}

	return [content].join('\n');
}

// Adapted from convert-source-map (MIT)
function toComment(sourceMap) {
	// eslint-disable-next-line no-undef
	var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
	var data = 'sourceMappingURL=data:application/json;charset=utf-8;base64,' + base64;

	return '/*# ' + data + ' */';
}


/***/ }),

/***/ "./node_modules/events/events.js":
/***/ (function(module, exports) {

// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.

function EventEmitter() {
  this._events = this._events || {};
  this._maxListeners = this._maxListeners || undefined;
}
module.exports = EventEmitter;

// Backwards-compat with node 0.10.x
EventEmitter.EventEmitter = EventEmitter;

EventEmitter.prototype._events = undefined;
EventEmitter.prototype._maxListeners = undefined;

// By default EventEmitters will print a warning if more than 10 listeners are
// added to it. This is a useful default which helps finding memory leaks.
EventEmitter.defaultMaxListeners = 10;

// Obviously not all Emitters should be limited to 10. This function allows
// that to be increased. Set to zero for unlimited.
EventEmitter.prototype.setMaxListeners = function(n) {
  if (!isNumber(n) || n < 0 || isNaN(n))
    throw TypeError('n must be a positive number');
  this._maxListeners = n;
  return this;
};

EventEmitter.prototype.emit = function(type) {
  var er, handler, len, args, i, listeners;

  if (!this._events)
    this._events = {};

  // If there is no 'error' event listener then throw.
  if (type === 'error') {
    if (!this._events.error ||
        (isObject(this._events.error) && !this._events.error.length)) {
      er = arguments[1];
      if (er instanceof Error) {
        throw er; // Unhandled 'error' event
      } else {
        // At least give some kind of context to the user
        var err = new Error('Uncaught, unspecified "error" event. (' + er + ')');
        err.context = er;
        throw err;
      }
    }
  }

  handler = this._events[type];

  if (isUndefined(handler))
    return false;

  if (isFunction(handler)) {
    switch (arguments.length) {
      // fast cases
      case 1:
        handler.call(this);
        break;
      case 2:
        handler.call(this, arguments[1]);
        break;
      case 3:
        handler.call(this, arguments[1], arguments[2]);
        break;
      // slower
      default:
        args = Array.prototype.slice.call(arguments, 1);
        handler.apply(this, args);
    }
  } else if (isObject(handler)) {
    args = Array.prototype.slice.call(arguments, 1);
    listeners = handler.slice();
    len = listeners.length;
    for (i = 0; i < len; i++)
      listeners[i].apply(this, args);
  }

  return true;
};

EventEmitter.prototype.addListener = function(type, listener) {
  var m;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events)
    this._events = {};

  // To avoid recursion in the case that type === "newListener"! Before
  // adding it to the listeners, first emit "newListener".
  if (this._events.newListener)
    this.emit('newListener', type,
              isFunction(listener.listener) ?
              listener.listener : listener);

  if (!this._events[type])
    // Optimize the case of one listener. Don't need the extra array object.
    this._events[type] = listener;
  else if (isObject(this._events[type]))
    // If we've already got an array, just append.
    this._events[type].push(listener);
  else
    // Adding the second element, need to change to array.
    this._events[type] = [this._events[type], listener];

  // Check for listener leak
  if (isObject(this._events[type]) && !this._events[type].warned) {
    if (!isUndefined(this._maxListeners)) {
      m = this._maxListeners;
    } else {
      m = EventEmitter.defaultMaxListeners;
    }

    if (m && m > 0 && this._events[type].length > m) {
      this._events[type].warned = true;
      console.error('(node) warning: possible EventEmitter memory ' +
                    'leak detected. %d listeners added. ' +
                    'Use emitter.setMaxListeners() to increase limit.',
                    this._events[type].length);
      if (typeof console.trace === 'function') {
        // not supported in IE 10
        console.trace();
      }
    }
  }

  return this;
};

EventEmitter.prototype.on = EventEmitter.prototype.addListener;

EventEmitter.prototype.once = function(type, listener) {
  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  var fired = false;

  function g() {
    this.removeListener(type, g);

    if (!fired) {
      fired = true;
      listener.apply(this, arguments);
    }
  }

  g.listener = listener;
  this.on(type, g);

  return this;
};

// emits a 'removeListener' event iff the listener was removed
EventEmitter.prototype.removeListener = function(type, listener) {
  var list, position, length, i;

  if (!isFunction(listener))
    throw TypeError('listener must be a function');

  if (!this._events || !this._events[type])
    return this;

  list = this._events[type];
  length = list.length;
  position = -1;

  if (list === listener ||
      (isFunction(list.listener) && list.listener === listener)) {
    delete this._events[type];
    if (this._events.removeListener)
      this.emit('removeListener', type, listener);

  } else if (isObject(list)) {
    for (i = length; i-- > 0;) {
      if (list[i] === listener ||
          (list[i].listener && list[i].listener === listener)) {
        position = i;
        break;
      }
    }

    if (position < 0)
      return this;

    if (list.length === 1) {
      list.length = 0;
      delete this._events[type];
    } else {
      list.splice(position, 1);
    }

    if (this._events.removeListener)
      this.emit('removeListener', type, listener);
  }

  return this;
};

EventEmitter.prototype.removeAllListeners = function(type) {
  var key, listeners;

  if (!this._events)
    return this;

  // not listening for removeListener, no need to emit
  if (!this._events.removeListener) {
    if (arguments.length === 0)
      this._events = {};
    else if (this._events[type])
      delete this._events[type];
    return this;
  }

  // emit removeListener for all listeners on all events
  if (arguments.length === 0) {
    for (key in this._events) {
      if (key === 'removeListener') continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners('removeListener');
    this._events = {};
    return this;
  }

  listeners = this._events[type];

  if (isFunction(listeners)) {
    this.removeListener(type, listeners);
  } else if (listeners) {
    // LIFO order
    while (listeners.length)
      this.removeListener(type, listeners[listeners.length - 1]);
  }
  delete this._events[type];

  return this;
};

EventEmitter.prototype.listeners = function(type) {
  var ret;
  if (!this._events || !this._events[type])
    ret = [];
  else if (isFunction(this._events[type]))
    ret = [this._events[type]];
  else
    ret = this._events[type].slice();
  return ret;
};

EventEmitter.prototype.listenerCount = function(type) {
  if (this._events) {
    var evlistener = this._events[type];

    if (isFunction(evlistener))
      return 1;
    else if (evlistener)
      return evlistener.length;
  }
  return 0;
};

EventEmitter.listenerCount = function(emitter, type) {
  return emitter.listenerCount(type);
};

function isFunction(arg) {
  return typeof arg === 'function';
}

function isNumber(arg) {
  return typeof arg === 'number';
}

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

function isUndefined(arg) {
  return arg === void 0;
}


/***/ }),

/***/ "./node_modules/jspanel4/dist/jspanel.css":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("./node_modules/css-loader/index.js!./node_modules/jspanel4/dist/jspanel.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./node_modules/jspanel4/es6module/jspanel.min.js":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jsPanel", function() { return jsPanel; });
var _typeof="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e};function _toConsumableArray(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}var jsPanel={version:"4.4.0",date:"2018-11-30 10:30",ajaxAlwaysCallbacks:[],autopositionSpacing:4,closeOnEscape:void document.addEventListener("keydown",function(e){"Escape"!==e.key&&"Esc"!==e.code&&27!==e.keyCode||jsPanel.getPanels(function(){return this.classList.contains("jsPanel")}).some(function(e){return!!e.options.closeOnEscape&&(e.close(),!0)})},!1),defaults:{boxShadow:3,container:"window",contentSize:{width:"400px",height:"200px"},dragit:{cursor:"move",handles:".jsPanel-headerlogo, .jsPanel-titlebar, .jsPanel-ftr",opacity:.8,disableOnMaximized:!0},header:!0,headerTitle:"jsPanel",headerControls:"all",iconfont:!1,maximizedMargin:0,minimizeTo:"default",paneltype:"standard",position:"center",resizeit:{handles:"n, e, s, w, ne, se, sw, nw",minWidth:128,minHeight:128},theme:"default"},defaultSnapConfig:{sensitivity:70,trigger:"panel"},extensions:{},globalCallbacks:!1,icons:{close:'<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><path fill="currentColor" d="M17.75 16l9.85-9.85c0.5-0.5 0.5-1.3 0-1.75-0.5-0.5-1.3-0.5-1.75 0l-9.85 9.85-9.85-9.9c-0.5-0.5-1.3-0.5-1.75 0-0.5 0.5-0.5 1.3 0 1.75l9.85 9.9-9.9 9.85c-0.5 0.5-0.5 1.3 0 1.75 0.25 0.25 0.55 0.35 0.9 0.35s0.65-0.1 0.9-0.35l9.85-9.85 9.85 9.85c0.25 0.25 0.55 0.35 0.9 0.35s0.65-0.1 0.9-0.35c0.5-0.5 0.5-1.3 0-1.75l-9.9-9.85z"></path></svg>',maximize:'<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><path fill="currentColor" d="M27.55 3.9h-22.6c-0.55 0-1 0.45-1 1v22.3c0 0.55 0.45 1 1 1h22.55c0.55 0 1-0.45 1-1v-22.3c0.050-0.55-0.4-1-0.95-1zM5.95 26.15v-18h20.55v18h-20.55z"></path></svg>',normalize:'<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><path fill="currentColor" d="M27.9 3.75h-18.8c-0.4 0-0.75 0.35-0.75 0.75v4.3c0 0.1 0 0.2 0.050 0.3h-4.2c-0.55 0-1 0.45-1 1v17.4c0 0.55 0.45 1 1 1h17.65c0.55 0 1-0.45 1-1v-3.7c0.050 0 0.1 0.050 0.2 0.050h4.9c0.4 0 0.75-0.35 0.75-0.75v-18.6c-0.050-0.4-0.4-0.75-0.8-0.75zM5.2 26.5v-12.95c0.050 0 0.1 0 0.15 0h15.4c0.050 0 0.1 0 0.15 0v12.95h-15.7zM27.15 22.35h-4.15c-0.050 0-0.15 0-0.2 0.050v-12.3c0-0.55-0.45-1-1-1h-12c0.050-0.1 0.050-0.2 0.050-0.3v-3.55h17.3v17.1z"></path></svg>',minimize:'<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><path fill="currentColor" d="M27.3 28.5h-22.6c-0.85 0-1.5-0.65-1.5-1.5s0.65-1.5 1.5-1.5h22.55c0.85 0 1.5 0.65 1.5 1.5s-0.65 1.5-1.45 1.5z"></path></svg>',smallifyrev:'<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><path fill="currentColor" d="M15.95 23.2c0 0 0 0 0 0-0.35 0-0.65-0.15-0.9-0.35l-11.7-11.9c-0.5-0.5-0.5-1.3 0-1.75 0.5-0.5 1.3-0.5 1.75 0l10.85 10.95 10.9-10.8c0.5-0.5 1.3-0.5 1.75 0s0.5 1.3 0 1.75l-11.75 11.7c-0.25 0.25-0.55 0.4-0.9 0.4z"></path></svg>',smallify:'<svg class="jsPanel-icon" version="1.1" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 28 28"><path fill="currentColor" d="M28.65 20.85l-11.8-11.65c-0.5-0.5-1.3-0.5-1.75 0l-11.75 11.85c-0.5 0.5-0.5 1.3 0 1.75 0.25 0.25 0.55 0.35 0.9 0.35 0.3 0 0.65-0.1 0.9-0.35l10.85-10.95 10.9 10.8c0.5 0.5 1.3 0.5 1.75 0 0.5-0.5 0.5-1.3 0-1.8z"></path></svg>'},idCounter:0,isIE:navigator.appVersion.match(/Trident/),mdbthemes:["secondary","elegant","stylish","unique","special"],pointerdown:"ontouchend"in window?["touchstart","mousedown"]:["mousedown"],pointermove:"ontouchend"in window?["touchmove","mousemove"]:["mousemove"],pointerup:"ontouchend"in window?["touchend","mouseup"]:["mouseup"],polyfills:([Element.prototype,Document.prototype,DocumentFragment.prototype].forEach(function(e){e.append=e.append||function(){var e=Array.prototype.slice.call(arguments),t=document.createDocumentFragment();e.forEach(function(e){var n=e instanceof Node;t.appendChild(n?e:document.createTextNode(String(e)))}),this.appendChild(t)}}),window.Element&&!Element.prototype.closest&&(Element.prototype.closest=function(e){var t=(this.document||this.ownerDocument).querySelectorAll(e),n=void 0,o=this;do{for(n=t.length;--n>=0&&t.item(n)!==o;);}while(n<0&&(o=o.parentElement));return o}),window.NodeList&&!NodeList.prototype.forEach&&(NodeList.prototype.forEach=function(e,t){t=t||window;for(var n=0;n<this.length;n++)e.call(t,this[n],n,this)}),Object.assign||Object.defineProperty(Object,"assign",{enumerable:!1,configurable:!0,writable:!0,value:function(e){if(null==e)throw new TypeError("Cannot convert first argument to object");for(var t=Object(e),n=1;n<arguments.length;n++){var o=arguments[n];if(null!=o){o=Object(o);for(var a=Object.keys(Object(o)),i=0,r=a.length;i<r;i++){var l=a[i],s=Object.getOwnPropertyDescriptor(o,l);void 0!==s&&s.enumerable&&(t[l]=o[l])}}}return t}}),function(){if("function"==typeof window.CustomEvent)return!1;function e(e,t){t=t||{bubbles:!1,cancelable:!1,detail:void 0};var n=document.createEvent("CustomEvent");return n.initCustomEvent(e,t.bubbles,t.cancelable,t.detail),n}e.prototype=window.Event.prototype,window.CustomEvent=e}(),String.prototype.endsWith||(String.prototype.endsWith=function(e,t){return t<this.length?t|=0:t=this.length,this.substr(t-e.length,e.length)===e}),String.prototype.startsWith||(String.prototype.startsWith=function(e,t){return this.substr(t||0,e.length)===e}),void(String.prototype.includes||(String.prototype.includes=function(e,t){return"number"!=typeof t&&(t=0),!(t+e.length>this.length)&&-1!==this.indexOf(e,t)}))),themes:["default","primary","info","success","warning","danger"],ziBase:100,colorLighteningFactor:.81,colorDarkeningFactor:.5,colorBrightnessThreshold:.55,colorNames:{aliceblue:"f0f8ff",antiquewhite:"faebd7",aqua:"0ff",aquamarine:"7fffd4",azure:"f0ffff",beige:"f5f5dc",bisque:"ffe4c4",black:"000",blanchedalmond:"ffebcd",blue:"00f",blueviolet:"8a2be2",brown:"a52a2a",burlywood:"deb887",cadetblue:"5f9ea0",chartreuse:"7fff00",chocolate:"d2691e",coral:"ff7f50",cornflowerblue:"6495ed",cornsilk:"fff8dc",crimson:"dc143c",cyan:"0ff",darkblue:"00008b",darkcyan:"008b8b",darkgoldenrod:"b8860b",darkgray:"a9a9a9",darkgrey:"a9a9a9",darkgreen:"006400",darkkhaki:"bdb76b",darkmagenta:"8b008b",darkolivegreen:"556b2f",darkorange:"ff8c00",darkorchid:"9932cc",darkred:"8b0000",darksalmon:"e9967a",darkseagreen:"8fbc8f",darkslateblue:"483d8b",darkslategray:"2f4f4f",darkslategrey:"2f4f4f",darkturquoise:"00ced1",darkviolet:"9400d3",deeppink:"ff1493",deepskyblue:"00bfff",dimgray:"696969",dimgrey:"696969",dodgerblue:"1e90ff",firebrick:"b22222",floralwhite:"fffaf0",forestgreen:"228b22",fuchsia:"f0f",gainsboro:"dcdcdc",ghostwhite:"f8f8ff",gold:"ffd700",goldenrod:"daa520",gray:"808080",grey:"808080",green:"008000",greenyellow:"adff2f",honeydew:"f0fff0",hotpink:"ff69b4",indianred:"cd5c5c",indigo:"4b0082",ivory:"fffff0",khaki:"f0e68c",lavender:"e6e6fa",lavenderblush:"fff0f5",lawngreen:"7cfc00",lemonchiffon:"fffacd",lightblue:"add8e6",lightcoral:"f08080",lightcyan:"e0ffff",lightgoldenrodyellow:"fafad2",lightgray:"d3d3d3",lightgrey:"d3d3d3",lightgreen:"90ee90",lightpink:"ffb6c1",lightsalmon:"ffa07a",lightseagreen:"20b2aa",lightskyblue:"87cefa",lightslategray:"789",lightslategrey:"789",lightsteelblue:"b0c4de",lightyellow:"ffffe0",lime:"0f0",limegreen:"32cd32",linen:"faf0e6",magenta:"f0f",maroon:"800000",mediumaquamarine:"66cdaa",mediumblue:"0000cd",mediumorchid:"ba55d3",mediumpurple:"9370d8",mediumseagreen:"3cb371",mediumslateblue:"7b68ee",mediumspringgreen:"00fa9a",mediumturquoise:"48d1cc",mediumvioletred:"c71585",midnightblue:"191970",mintcream:"f5fffa",mistyrose:"ffe4e1",moccasin:"ffe4b5",navajowhite:"ffdead",navy:"000080",oldlace:"fdf5e6",olive:"808000",olivedrab:"6b8e23",orange:"ffa500",orangered:"ff4500",orchid:"da70d6",palegoldenrod:"eee8aa",palegreen:"98fb98",paleturquoise:"afeeee",palevioletred:"d87093",papayawhip:"ffefd5",peachpuff:"ffdab9",peru:"cd853f",pink:"ffc0cb",plum:"dda0dd",powderblue:"b0e0e6",purple:"800080",rebeccapurple:"639",red:"f00",rosybrown:"bc8f8f",royalblue:"4169e1",saddlebrown:"8b4513",salmon:"fa8072",sandybrown:"f4a460",seagreen:"2e8b57",seashell:"fff5ee",sienna:"a0522d",silver:"c0c0c0",skyblue:"87ceeb",slateblue:"6a5acd",slategray:"708090",slategrey:"708090",snow:"fffafa",springgreen:"00ff7f",steelblue:"4682b4",tan:"d2b48c",teal:"008080",thistle:"d8bfd8",tomato:"ff6347",turquoise:"40e0d0",violet:"ee82ee",wheat:"f5deb3",white:"fff",whitesmoke:"f5f5f5",yellow:"ff0",yellowgreen:"9acd32",grey50:"fafafa",gray50:"fafafa",grey100:"f5f5f5",gray100:"f5f5f5",grey200:"eee",gray200:"eee",grey300:"e0e0e0",gray300:"e0e0e0",grey400:"bdbdbd",gray400:"bdbdbd",grey500:"9e9e9e",gray500:"9e9e9e",grey600:"757575",gray600:"757575",grey700:"616161",gray700:"616161",grey800:"424242",gray800:"424242",grey900:"212121",gray900:"212121",bluegrey50:"eceff1",bluegray50:"eceff1",bluegrey100:"CFD8DC",bluegray100:"CFD8DC",bluegrey200:"B0BEC5",bluegray200:"B0BEC5",bluegrey300:"90A4AE",bluegray300:"90A4AE",bluegrey400:"78909C",bluegray400:"78909C",bluegrey500:"607D8B",bluegray500:"607D8B",bluegrey600:"546E7A",bluegray600:"546E7A",bluegrey700:"455A64",bluegray700:"455A64",bluegrey800:"37474F",bluegray800:"37474F",bluegrey900:"263238",bluegray900:"263238",red50:"FFEBEE",red100:"FFCDD2",red200:"EF9A9A",red300:"E57373",red400:"EF5350",red500:"F44336",red600:"E53935",red700:"D32F2F",red800:"C62828",red900:"B71C1C",reda100:"FF8A80",reda200:"FF5252",reda400:"FF1744",reda700:"D50000",pink50:"FCE4EC",pink100:"F8BBD0",pink200:"F48FB1",pink300:"F06292",pink400:"EC407A",pink500:"E91E63",pink600:"D81B60",pink700:"C2185B",pink800:"AD1457",pink900:"880E4F",pinka100:"FF80AB",pinka200:"FF4081",pinka400:"F50057",pinka700:"C51162",purple50:"F3E5F5",purple100:"E1BEE7",purple200:"CE93D8",purple300:"BA68C8",purple400:"AB47BC",purple500:"9C27B0",purple600:"8E24AA",purple700:"7B1FA2",purple800:"6A1B9A",purple900:"4A148C",purplea100:"EA80FC",purplea200:"E040FB",purplea400:"D500F9",purplea700:"AA00FF",deeppurple50:"EDE7F6",deeppurple100:"D1C4E9",deeppurple200:"B39DDB",deeppurple300:"9575CD",deeppurple400:"7E57C2",deeppurple500:"673AB7",deeppurple600:"5E35B1",deeppurple700:"512DA8",deeppurple800:"4527A0",deeppurple900:"311B92",deeppurplea100:"B388FF",deeppurplea200:"7C4DFF",deeppurplea400:"651FFF",deeppurplea700:"6200EA",indigo50:"E8EAF6",indigo100:"C5CAE9",indigo200:"9FA8DA",indigo300:"7986CB",indigo400:"5C6BC0",indigo500:"3F51B5",indigo600:"3949AB",indigo700:"303F9F",indigo800:"283593",indigo900:"1A237E",indigoa100:"8C9EFF",indigoa200:"536DFE",indigoa400:"3D5AFE",indigoa700:"304FFE",blue50:"E3F2FD",blue100:"BBDEFB",blue200:"90CAF9",blue300:"64B5F6",blue400:"42A5F5",blue500:"2196F3",blue600:"1E88E5",blue700:"1976D2",blue800:"1565C0",blue900:"0D47A1",bluea100:"82B1FF",bluea200:"448AFF",bluea400:"2979FF",bluea700:"2962FF",lightblue50:"E1F5FE",lightblue100:"B3E5FC",lightblue200:"81D4FA",lightblue300:"4FC3F7",lightblue400:"29B6F6",lightblue500:"03A9F4",lightblue600:"039BE5",lightblue700:"0288D1",lightblue800:"0277BD",lightblue900:"01579B",lightbluea100:"80D8FF",lightbluea200:"40C4FF",lightbluea400:"00B0FF",lightbluea700:"0091EA",cyan50:"E0F7FA",cyan100:"B2EBF2",cyan200:"80DEEA",cyan300:"4DD0E1",cyan400:"26C6DA",cyan500:"00BCD4",cyan600:"00ACC1",cyan700:"0097A7",cyan800:"00838F",cyan900:"006064",cyana100:"84FFFF",cyana200:"18FFFF",cyana400:"00E5FF",cyana700:"00B8D4",teal50:"E0F2F1",teal100:"B2DFDB",teal200:"80CBC4",teal300:"4DB6AC",teal400:"26A69A",teal500:"009688",teal600:"00897B",teal700:"00796B",teal800:"00695C",teal900:"004D40",teala100:"A7FFEB",teala200:"64FFDA",teala400:"1DE9B6",teala700:"00BFA5",green50:"E8F5E9",green100:"C8E6C9",green200:"A5D6A7",green300:"81C784",green400:"66BB6A",green500:"4CAF50",green600:"43A047",green700:"388E3C",green800:"2E7D32",green900:"1B5E20",greena100:"B9F6CA",greena200:"69F0AE",greena400:"00E676",greena700:"00C853",lightgreen50:"F1F8E9",lightgreen100:"DCEDC8",lightgreen200:"C5E1A5",lightgreen300:"AED581",lightgreen400:"9CCC65",lightgreen500:"8BC34A",lightgreen600:"7CB342",lightgreen700:"689F38",lightgreen800:"558B2F",lightgreen900:"33691E",lightgreena100:"CCFF90",lightgreena200:"B2FF59",lightgreena400:"76FF03",lightgreena700:"64DD17",lime50:"F9FBE7",lime100:"F0F4C3",lime200:"E6EE9C",lime300:"DCE775",lime400:"D4E157",lime500:"CDDC39",lime600:"C0CA33",lime700:"AFB42B",lime800:"9E9D24",lime900:"827717",limea100:"F4FF81",limea200:"EEFF41",limea400:"C6FF00",limea700:"AEEA00",yellow50:"FFFDE7",yellow100:"FFF9C4",yellow200:"FFF59D",yellow300:"FFF176",yellow400:"FFEE58",yellow500:"FFEB3B",yellow600:"FDD835",yellow700:"FBC02D",yellow800:"F9A825",yellow900:"F57F17",yellowa100:"FFFF8D",yellowa200:"FFFF00",yellowa400:"FFEA00",yellowa700:"FFD600",amber50:"FFF8E1",amber100:"FFECB3",amber200:"FFE082",amber300:"FFD54F",amber400:"FFCA28",amber500:"FFC107",amber600:"FFB300",amber700:"FFA000",amber800:"FF8F00",amber900:"FF6F00",ambera100:"FFE57F",ambera200:"FFD740",ambera400:"FFC400",ambera700:"FFAB00",orange50:"FFF3E0",orange100:"FFE0B2",orange200:"FFCC80",orange300:"FFB74D",orange400:"FFA726",orange500:"FF9800",orange600:"FB8C00",orange700:"F57C00",orange800:"EF6C00",orange900:"E65100",orangea100:"FFD180",orangea200:"FFAB40",orangea400:"FF9100",orangea700:"FF6D00",deeporange50:"FBE9E7",deeporange100:"FFCCBC",deeporange200:"FFAB91",deeporange300:"FF8A65",deeporange400:"FF7043",deeporange500:"FF5722",deeporange600:"F4511E",deeporange700:"E64A19",deeporange800:"D84315",deeporange900:"BF360C",deeporangea100:"FF9E80",deeporangea200:"FF6E40",deeporangea400:"FF3D00",deeporangea700:"DD2C00",brown50:"EFEBE9",brown100:"D7CCC8",brown200:"BCAAA4",brown300:"A1887F",brown400:"8D6E63",brown500:"795548",brown600:"6D4C41",brown700:"5D4037",brown800:"4E342E",brown900:"3E2723"},color:function(e){var t=e.toLowerCase(),n=void 0,o=void 0,a=void 0,i=void 0,r=void 0,l=void 0,s=void 0,c=void 0,d=void 0,p={},f=/^rgba?\(([0-9]{1,3}),([0-9]{1,3}),([0-9]{1,3}),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,h=/^hsla?\(([0-9]{1,3}),([0-9]{1,3}%),([0-9]{1,3}%),?(0|1|0\.[0-9]{1,2}|\.[0-9]{1,2})?\)$/gi,u=this.colorNames;return u[t]&&(t=u[t]),null!==t.match(/^#?([0-9a-f]{3}|[0-9a-f]{6})$/gi)?(t=t.replace("#",""),t.length%2==1?(n=String(t.substr(0,1))+t.substr(0,1),o=String(t.substr(1,1))+t.substr(1,1),a=String(t.substr(2,1))+t.substr(2,1),p.rgb={r:parseInt(n,16),g:parseInt(o,16),b:parseInt(a,16)},p.hex="#"+n+o+a):(p.rgb={r:parseInt(t.substr(0,2),16),g:parseInt(t.substr(2,2),16),b:parseInt(t.substr(4,2),16)},p.hex="#"+t),d=this.rgbToHsl(p.rgb.r,p.rgb.g,p.rgb.b),p.hsl=d,p.rgb.css="rgb("+p.rgb.r+","+p.rgb.g+","+p.rgb.b+")"):t.match(f)?(s=f.exec(t),p.rgb={css:t,r:s[1],g:s[2],b:s[3]},p.hex=this.rgbToHex(s[1],s[2],s[3]),d=this.rgbToHsl(s[1],s[2],s[3]),p.hsl=d):t.match(h)?(i=(s=h.exec(t))[1]/360,r=s[2].substr(0,s[2].length-1)/100,l=s[3].substr(0,s[3].length-1)/100,c=this.hslToRgb(i,r,l),p.rgb={css:"rgb("+c[0]+","+c[1]+","+c[2]+")",r:c[0],g:c[1],b:c[2]},p.hex=this.rgbToHex(p.rgb.r,p.rgb.g,p.rgb.b),p.hsl={css:"hsl("+s[1]+","+s[2]+","+s[3]+")",h:s[1],s:s[2],l:s[3]}):(p.hex="#f5f5f5",p.rgb={css:"rgb(245,245,245)",r:245,g:245,b:245},p.hsl={css:"hsl(0,0%,96%)",h:0,s:"0%",l:"96%"}),p},calcColors:function(e){var t=this.colorBrightnessThreshold,n=this.color(e),o=this.lighten(e,this.colorLighteningFactor),a=this.darken(e,this.colorDarkeningFactor),i=this.perceivedBrightness(e)<=t?"#ffffff":"#000000",r=this.perceivedBrightness(o)<=t?"#ffffff":"#000000",l=this.perceivedBrightness(a)<=t?"#ffffff":"#000000";return[n.hsl.css,o,a,i,r,l]},darken:function(e,t){var n=this.color(e).hsl,o=parseFloat(n.l),a=Math.round(o-o*t)+"%";return"hsl("+n.h+","+n.s+","+a+")"},lighten:function(e,t){var n=this.color(e).hsl,o=parseFloat(n.l),a=Math.round(o+(100-o)*t)+"%";return"hsl("+n.h+","+n.s+","+a+")"},hslToRgb:function(e,t,n){var o=void 0,a=void 0,i=void 0;if(0===t)o=a=i=n;else{var r=function(e,t,n){return n<0&&(n+=1),n>1&&(n-=1),n<1/6?e+6*(t-e)*n:n<.5?t:n<2/3?e+(t-e)*(2/3-n)*6:e},l=n<.5?n*(1+t):n+t-n*t,s=2*n-l;o=r(s,l,e+1/3),a=r(s,l,e),i=r(s,l,e-1/3)}return[Math.round(255*o),Math.round(255*a),Math.round(255*i)]},rgbToHsl:function(e,t,n){e/=255,t/=255,n/=255;var o=Math.max(e,t,n),a=Math.min(e,t,n),i=void 0,r=void 0,l=(o+a)/2;if(o===a)i=r=0;else{var s=o-a;switch(r=l>.5?s/(2-o-a):s/(o+a),o){case e:i=(t-n)/s+(t<n?6:0);break;case t:i=(n-e)/s+2;break;case n:i=(e-t)/s+4}i/=6}return{css:"hsl("+(i=Math.round(360*i))+","+(r=Math.round(100*r)+"%")+","+(l=Math.round(100*l)+"%")+")",h:i,s:r,l:l}},rgbToHex:function(e,t,n){var o=Number(e).toString(16),a=Number(t).toString(16),i=Number(n).toString(16);return 1===o.length&&(o="0"+o),1===a.length&&(a="0"+a),1===i.length&&(i="0"+i),"#"+o+a+i},perceivedBrightness:function(e){var t=this.color(e).rgb;return t.r/255*.2126+t.g/255*.7152+t.b/255*.0722},addScript:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"text/javascript",n=arguments[2],o=document.createElement("script");o.onload=n,o.src=e,o.type=t,document.head.appendChild(o)},ajax:function ajax(obj,ajaxConfig){var objIsPanel=void 0;"object"===(void 0===obj?"undefined":_typeof(obj))&&obj.classList.contains("jsPanel")?objIsPanel=!0:(objIsPanel=!1,"string"==typeof obj&&(obj=document.querySelector(obj)));var conf=ajaxConfig,configDefaults={method:"GET",async:!0,user:"",pwd:"",done:function(){objIsPanel?obj.content.innerHTML=this.responseText:obj.innerHTML=this.responseText},autoresize:!0,autoreposition:!0},config=void 0;if("string"==typeof conf)config=Object.assign({},configDefaults,{url:encodeURI(conf),evalscripttags:!0});else{if("object"!==(void 0===conf?"undefined":_typeof(conf))||!conf.url)return console.info("XMLHttpRequest seems to miss the request url!"),obj;config=Object.assign({},configDefaults,conf),config.url=encodeURI(conf.url),!1===config.async&&(config.timeout=0,config.withCredentials&&(config.withCredentials=void 0),config.responseType&&(config.responseType=void 0))}var xhr=new XMLHttpRequest;return xhr.onreadystatechange=function(){if(4===xhr.readyState){if(200===xhr.status){if(config.done.call(xhr,obj),config.evalscripttags){var scripttags=xhr.responseText.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);scripttags&&scripttags.forEach(function(tag){var js=tag.replace(/<script\b[^>]*>/i,"").replace(/<\/script>/i,"").trim();eval(js)})}}else config.fail&&config.fail.call(xhr,obj);if(config.always&&config.always.call(xhr,obj),objIsPanel){var oContentSize=obj.options.contentSize;if("string"==typeof oContentSize&&oContentSize.match(/auto/i)){var parts=oContentSize.split(" "),sizes=Object.assign({},{width:parts[0],height:parts[1]});config.autoresize&&obj.resize(sizes),obj.classList.contains("jsPanel-contextmenu")||config.autoreposition&&obj.reposition()}else if("object"===(void 0===oContentSize?"undefined":_typeof(oContentSize))&&("auto"===oContentSize.width||"auto"===oContentSize.height)){var _sizes=Object.assign({},oContentSize);config.autoresize&&obj.resize(_sizes),obj.classList.contains("jsPanel-contextmenu")||config.autoreposition&&obj.reposition()}}jsPanel.ajaxAlwaysCallbacks.length&&jsPanel.ajaxAlwaysCallbacks.forEach(function(e){e.call(obj,obj)})}},xhr.open(config.method,config.url,config.async,config.user,config.pwd),xhr.timeout=config.timeout||0,config.withCredentials&&(xhr.withCredentials=config.withCredentials),config.responseType&&(xhr.responseType=config.responseType),config.beforeSend&&config.beforeSend.call(xhr),config.data?xhr.send(config.data):xhr.send(null),obj},createPanelTemplate:function(){var e=!(arguments.length>0&&void 0!==arguments[0])||arguments[0],t=document.createElement("div");return t.className="jsPanel",e&&["close","maximize","normalize","minimize","smallify","smallifyrev"].forEach(function(e){t.setAttribute("data-btn"+e,"enabled")}),t.innerHTML='<div class="jsPanel-hdr">\n                                <div class="jsPanel-headerbar">\n                                    <div class="jsPanel-headerlogo"></div>\n                                    <div class="jsPanel-titlebar">\n                                        <span class="jsPanel-title"></span>\n                                    </div>\n                                    <div class="jsPanel-controlbar">\n                                        <div class="jsPanel-btn jsPanel-btn-smallify">'+this.icons.smallify+'</div>\n                                        <div class="jsPanel-btn jsPanel-btn-smallifyrev">'+this.icons.smallifyrev+'</div>\n                                        <div class="jsPanel-btn jsPanel-btn-minimize">'+this.icons.minimize+'</div>\n                                        <div class="jsPanel-btn jsPanel-btn-normalize">'+this.icons.normalize+'</div>\n                                        <div class="jsPanel-btn jsPanel-btn-maximize">'+this.icons.maximize+'</div>\n                                        <div class="jsPanel-btn jsPanel-btn-close">'+this.icons.close+'</div>\n                                    </div>\n                                </div>\n                                <div class="jsPanel-hdr-toolbar"></div>\n                            </div>\n                            <div class="jsPanel-content"></div>\n                            <div class="jsPanel-minimized-box"></div>\n                            <div class="jsPanel-ftr"></div>',t},createMinimizedTemplate:function(){var e=document.createElement("div");return e.className="jsPanel-replacement",e.innerHTML='<div class="jsPanel-hdr">\n                                <div class="jsPanel-headerbar">\n                                    <div class="jsPanel-headerlogo"></div>\n                                    <div class="jsPanel-titlebar">\n                                        <span class="jsPanel-title"></span>\n                                    </div>\n                                    <div class="jsPanel-controlbar">\n                                        <div class="jsPanel-btn jsPanel-btn-normalize">'+this.icons.normalize+'</div>\n                                        <div class="jsPanel-btn jsPanel-btn-maximize">'+this.icons.maximize+'</div>\n                                        <div class="jsPanel-btn jsPanel-btn-close">'+this.icons.close+"</div>\n                                    </div>\n                                </div>\n                            </div>",e},createSnapArea:function(e,t,n){var o=document.createElement("div"),a=e.parentElement;o.className="jsPanel-snap-area jsPanel-snap-area-"+t,"lt"===t||"rt"===t||"rb"===t||"lb"===t?(o.style.width=n+"px",o.style.height=n+"px"):"ct"===t||"cb"===t?o.style.height=n+"px":"lc"!==t&&"rc"!==t||(o.style.width=n+"px"),a!==document.body&&(o.style.position="absolute"),document.querySelector(".jsPanel-snap-area.jsPanel-snap-area-"+t)||e.parentElement.appendChild(o)},dragit:function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=void 0,a=Object.assign({},this.defaults.dragit,n),i=void 0,r=new CustomEvent("jspaneldragstart",{detail:e.id}),l=new CustomEvent("jspaneldrag",{detail:e.id}),s=new CustomEvent("jspaneldragstop",{detail:e.id});a.grid&&Array.isArray(a.grid)&&1===a.grid.length&&(a.grid[1]=a.grid[0]),t=this.pOcontainment(a.containment);var c=function(){document.removeEventListener("mousemove",i),e.style.opacity=1};return e.querySelectorAll(a.handles).forEach(function(n){n.style.touchAction="none",n.style.cursor=a.cursor,jsPanel.pointerdown.forEach(function(s){n.addEventListener(s,function(n){if(n.preventDefault(),n.button&&n.button>0)return!1;if(!n.target.closest(".jsPanel-ftr-btn")){e.controlbar.style.pointerEvents="none",e.content.style.pointerEvents="none";var s=window.getComputedStyle(e),d=parseFloat(s.left),p=parseFloat(s.top),f=n.touches?n.touches[0].clientX:n.clientX,h=n.touches?n.touches[0].clientY:n.clientY,u=e.parentElement,g=u.getBoundingClientRect(),m=window.getComputedStyle(u),b=e.getScaleFactor(),y=0;i=function(n){if(n.preventDefault(),!o){if(document.dispatchEvent(r),e.style.opacity=a.opacity,e.snapped&&a.snap.resizeToPreSnap&&e.currentData.beforeSnap){e.resize(e.currentData.beforeSnap.width+" "+e.currentData.beforeSnap.height);var i=e.getBoundingClientRect(),s=f-(i.left+i.width),c=i.width/2;s>-c&&(y=s+c)}a.start&&jsPanel.processCallbacks(e,a.start,!1,{left:d,top:p},n),jsPanel.front(e),e.snapped=!1}if(o=1,a.disableOnMaximized&&"maximized"===e.status)return!1;var v=void 0,w=void 0,j=void 0,C=void 0,E=void 0,F=void 0,P=void 0,x=void 0,z=void 0,S=void 0,A=n.touches?n.touches[0].clientX:n.clientX,B=n.touches?n.touches[0].clientY:n.clientY,T=window.getComputedStyle(e);if(u===document.body){var L=e.getBoundingClientRect();z=window.innerWidth-parseInt(m.borderLeftWidth,10)-parseInt(m.borderRightWidth,10)-(L.left+L.width),S=window.innerHeight-parseInt(m.borderTopWidth,10)-parseInt(m.borderBottomWidth,10)-(L.top+L.height)}else z=parseInt(m.width,10)-parseInt(m.borderLeftWidth,10)-parseInt(m.borderRightWidth,10)-(parseInt(T.left,10)+parseInt(T.width,10)),S=parseInt(m.height,10)-parseInt(m.borderTopWidth,10)-parseInt(m.borderBottomWidth,10)-(parseInt(T.top,10)+parseInt(T.height,10));v=parseFloat(T.left),j=parseFloat(T.top),E=z,P=S,a.snap&&("panel"===a.snap.trigger?w=Math.pow(v,2):"pointer"===a.snap.trigger&&(v=A,w=Math.pow(A,2),j=B,E=window.innerWidth-A,P=window.innerHeight-B),C=Math.pow(j,2),F=Math.pow(E,2),x=Math.pow(P,2));var D=Math.sqrt(w+C),k=Math.sqrt(w+x),q=Math.sqrt(F+C),R=Math.sqrt(F+x),W=Math.abs(v-E)/2,M=Math.abs(j-P)/2,O=Math.sqrt(w+Math.pow(M,2)),I=Math.sqrt(C+Math.pow(W,2)),$=Math.sqrt(F+Math.pow(M,2)),H=Math.sqrt(x+Math.pow(W,2));if(window.getSelection().removeAllRanges(),document.dispatchEvent(l),a.axis&&"x"!==a.axis||(e.style.left=d+(A-f)/b.x+y+"px"),a.axis&&"y"!==a.axis||(e.style.top=p+(B-h)/b.y+"px"),a.grid){var N=a.grid[0]*Math.round((d+(A-f))/a.grid[0]),X=a.grid[1]*Math.round((p+(B-h))/a.grid[1]);e.style.left=N+"px",e.style.top=X+"px"}if(a.containment||0===a.containment){var Y=void 0,_=void 0;if(e.options.container===document.body)Y=window.innerWidth-parseFloat(T.width)-t[1],_=window.innerHeight-parseFloat(T.height)-t[2];else{var V=parseFloat(m.borderLeftWidth)+parseFloat(m.borderRightWidth),U=parseFloat(m.borderTopWidth)+parseFloat(m.borderBottomWidth);Y=g.width/b.x-parseFloat(T.width)-t[1]-V,_=g.height/b.y-parseFloat(T.height)-t[2]-U}parseFloat(e.style.left)<=t[3]&&(e.style.left=t[3]+"px"),parseFloat(e.style.top)<=t[0]&&(e.style.top=t[0]+"px"),parseFloat(e.style.left)>=Y&&(e.style.left=Y+"px"),parseFloat(e.style.top)>=_&&(e.style.top=_+"px")}if(a.drag&&jsPanel.processCallbacks(e,a.drag,!1,{left:v,top:j,right:E,bottom:P},n),a.snap){var Z=a.snap.sensitivity,G=u===document.body?window.innerWidth/8:g.width/8,J=u===document.body?window.innerHeight/8:g.height/8;e.snappableTo=!1,jsPanel.removeSnapAreas(),D<Z?(e.snappableTo="left-top",!1!==a.snap.snapLeftTop&&jsPanel.createSnapArea(e,"lt",Z)):k<Z?(e.snappableTo="left-bottom",!1!==a.snap.snapLeftBottom&&jsPanel.createSnapArea(e,"lb",Z)):q<Z?(e.snappableTo="right-top",!1!==a.snap.snapRightTop&&jsPanel.createSnapArea(e,"rt",Z)):R<Z?(e.snappableTo="right-bottom",!1!==a.snap.snapRightBottom&&jsPanel.createSnapArea(e,"rb",Z)):j<Z&&I<G?(e.snappableTo="center-top",!1!==a.snap.snapCenterTop&&jsPanel.createSnapArea(e,"ct",Z)):v<Z&&O<J?(e.snappableTo="left-center",!1!==a.snap.snapLeftCenter&&jsPanel.createSnapArea(e,"lc",Z)):E<Z&&$<J?(e.snappableTo="right-center",!1!==a.snap.snapRightCenter&&jsPanel.createSnapArea(e,"rc",Z)):P<Z&&H<G&&(e.snappableTo="center-bottom",!1!==a.snap.snapCenterBottom&&jsPanel.createSnapArea(e,"cb",Z))}},jsPanel.pointermove.forEach(function(e){document.addEventListener(e,i)}),document.addEventListener("mouseleave",c)}})}),jsPanel.pointerup.forEach(function(t){document.addEventListener(t,function(t){jsPanel.pointermove.forEach(function(e){document.removeEventListener(e,i)}),document.body.style.overflow="inherit",jsPanel.removeSnapAreas(),o&&(document.dispatchEvent(s),e.style.opacity=1,o=void 0,e.saveCurrentPosition(),e.calcSizeFactors(),a.snap&&("left-top"===e.snappableTo?jsPanel.snapPanel(e,a.snap.snapLeftTop):"center-top"===e.snappableTo?jsPanel.snapPanel(e,a.snap.snapCenterTop):"right-top"===e.snappableTo?jsPanel.snapPanel(e,a.snap.snapRightTop):"right-center"===e.snappableTo?jsPanel.snapPanel(e,a.snap.snapRightCenter):"right-bottom"===e.snappableTo?jsPanel.snapPanel(e,a.snap.snapRightBottom):"center-bottom"===e.snappableTo?jsPanel.snapPanel(e,a.snap.snapCenterBottom):"left-bottom"===e.snappableTo?jsPanel.snapPanel(e,a.snap.snapLeftBottom):"left-center"===e.snappableTo&&jsPanel.snapPanel(e,a.snap.snapLeftCenter),a.snap.callback&&e.snappableTo&&"function"==typeof a.snap.callback&&a.snap.callback.call(e,e),e.snappableTo&&a.snap.repositionOnSnap&&e.repositionOnSnap(e.snappableTo)),a.stop&&jsPanel.processCallbacks(e,a.stop,!1,{left:parseFloat(e.style.left),top:parseFloat(e.style.top)},t)),e.controlbar.style.pointerEvents="inherit",e.content.style.pointerEvents="inherit",document.removeEventListener("mouseleave",c)})}),a.disable&&(n.style.pointerEvents="none")}),e},emptyNode:function(e){for(;e.firstChild;)e.removeChild(e.firstChild);return e},extend:function(e){if("[object Object]"===Object.prototype.toString.call(e))for(var t in e)e.hasOwnProperty(t)&&(this.extensions[t]=e[t])},fetch:function(e){function t(t){return e.apply(this,arguments)}return t.toString=function(){return e.toString()},t}(function(obj){var conf=obj.options.contentFetch,confDefaults={bodyMethod:"text",evalscripttags:!0,autoresize:!0,autoreposition:!0,done:function(e,t){e.content.innerHTML=t}};conf="string"==typeof conf?Object.assign({resource:obj.options.contentFetch},confDefaults):Object.assign(confDefaults,conf);var fetchInit=conf.fetchInit||{};conf.beforeSend&&conf.beforeSend.call(obj,obj),fetch(conf.resource,fetchInit).then(function(e){if(e.ok)return e[conf.bodyMethod]();throw new Error("Network response was not ok.")}).then(function(response){if(conf.done.call(obj,obj,response),conf.evalscripttags){var scripttags=response.match(/<script\b[^>]*>([\s\S]*?)<\/script>/gi);scripttags&&scripttags.forEach(function(tag){var js=tag.replace(/<script\b[^>]*>/i,"").replace(/<\/script>/i,"").trim();eval(js)})}var oContentSize=obj.options.contentSize;if(conf.autoresize||conf.autoreposition)if("string"==typeof oContentSize&&oContentSize.match(/auto/i)){var parts=oContentSize.split(" "),sizes=Object.assign({},{width:parts[0],height:parts[1]});conf.autoresize&&obj.resize(sizes),obj.classList.contains("jsPanel-contextmenu")||conf.autoreposition&&obj.reposition()}else if("object"===(void 0===oContentSize?"undefined":_typeof(oContentSize))&&("auto"===oContentSize.width||"auto"===oContentSize.height)){var _sizes2=Object.assign({},oContentSize);conf.autoresize&&obj.resize(_sizes2),obj.classList.contains("jsPanel-contextmenu")||conf.autoreposition&&obj.reposition()}}).catch(function(e){console.error("There has been a problem with your fetch operation: "+e.message)})}),front:function(e){if("minimized"===e.status)"maximized"===e.statusBefore?e.maximize():e.normalize();else{var t=Array.prototype.slice.call(document.querySelectorAll(".jsPanel-standard")).map(function(e){return e.style.zIndex});Math.max.apply(Math,_toConsumableArray(t))>e.style.zIndex&&(e.style.zIndex=jsPanel.zi.next()),this.resetZi()}this.getPanels().forEach(function(e,t){var n=e.content.querySelector(".jsPanel-iframe-overlay");if(t>0){if(e.content.querySelector("iframe")&&!n){var o=document.createElement("div");o.className="jsPanel-iframe-overlay",e.content.appendChild(o)}}else n&&e.content.removeChild(n)})},getPanels:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){return this.classList.contains("jsPanel-standard")};return Array.prototype.slice.call(document.querySelectorAll(".jsPanel")).filter(function(t){return e.call(t,t)}).sort(function(e,t){return t.style.zIndex-e.style.zIndex})},overlaps:function(e,t,n){var o="string"==typeof e?document.querySelector(e):e,a=void 0,i=o.getBoundingClientRect(),r={top:0,right:0,bottom:0,left:0},l=o.getScaleFactor(),s=getComputedStyle(o.parentElement);return"window"!==o.options.container&&"paddingbox"===n&&(r={top:parseInt(s.borderTopWidth,10)*l.y,right:parseInt(s.borderRightWidth,10)*l.x,bottom:parseInt(s.borderBottomWidth,10)*l.y,left:parseInt(s.borderLeftWidth,10)*l.x}),a="string"==typeof t?"window"===t?{left:0,top:0,right:window.innerWidth,bottom:window.innerHeight}:"parent"===t?o.parentElement.getBoundingClientRect():document.querySelector(t).getBoundingClientRect():t.getBoundingClientRect(),{top:i.top-a.top-r.top,right:a.right-i.right-r.right,bottom:a.bottom-i.bottom-r.bottom,left:i.left-a.left-r.left,parentBorderWidth:r,panelRect:i}},pOcontainer:function(e){if(e){if("string"==typeof e)return"window"===e?document.body:document.querySelector(e);if(1===e.nodeType)return e;if(e.length)return e[0]}return!1},pOcontainment:function(e){var t=e;if("function"==typeof e&&(t=e()),"number"==typeof t)return[t,t,t,t];if(Array.isArray(t)){if(1===t.length)return[t[0],t[0],t[0],t[0]];if(2===t.length)return t.concat(t);3===t.length&&(t[3]=t[1])}return t},pOsize:function(e,t){var n=t||this.defaults.contentSize,o=e.parentElement;if("string"==typeof n){var a=n.trim().split(" ");(n={}).width=a[0],2===a.length?n.height=a[1]:n.height=a[0]}else n.width&&!n.height?n.height=n.width:n.height&&!n.width&&(n.width=n.height);if(String(n.width).match(/^[0-9.]+$/gi))n.width+="px";else if("string"==typeof n.width&&n.width.endsWith("%"))if(o===document.body)n.width=window.innerWidth*(parseFloat(n.width)/100)+"px";else{var i=window.getComputedStyle(o),r=parseFloat(i.borderLeftWidth)+parseFloat(i.borderRightWidth);n.width=(parseFloat(i.width)-r)*(parseFloat(n.width)/100)+"px"}else"function"==typeof n.width&&(n.width=n.width.call(e,e),"number"==typeof n.width?n.width+="px":"string"==typeof n.width&&n.width.match(/^[0-9.]+$/gi)&&(n.width+="px"));if(String(n.height).match(/^[0-9.]+$/gi))n.height+="px";else if("string"==typeof n.height&&n.height.endsWith("%"))if(o===document.body)n.height=window.innerHeight*(parseFloat(n.height)/100)+"px";else{var l=window.getComputedStyle(o),s=parseFloat(l.borderTopWidth)+parseFloat(l.borderBottomWidth);n.height=(parseFloat(l.height)-s)*(parseFloat(n.height)/100)+"px"}else"function"==typeof n.height&&(n.height=n.height.call(e,e),"number"==typeof n.height?n.height+="px":"string"==typeof n.height&&n.height.match(/^[0-9.]+$/gi)&&(n.height+="px"));return n},pOposition:function(e){var t=e.match(/\b[a-z]{4,6}-{1}[a-z]{3,6}\b/i),n=e.match(/down|up|right([^-]|$)|left([^-]|$)/i),o=e.match(/[+-]?\d?\.?\d+([a-z%]{2,4}\b|%?)/gi),a=void 0;return a=t?{my:t[0].toLowerCase(),at:t[0].toLowerCase()}:{my:"center",at:"center"},n&&(a.autoposition=n[0].toLowerCase()),o&&(o.forEach(function(e,t){e.match(/^[+-]?[0-9]*$/)&&(o[t]+="px"),o[t]=o[t].toLowerCase()}),1===o.length?(a.offsetX=o[0],a.offsetY=o[0]):(a.offsetX=o[0],a.offsetY=o[1])),a},position:function(e,t){var n=void 0,o=void 0,a=void 0,i={left:0,top:0},r=0,l=0,s=0,c=0,d={my:"center",at:"center",of:"window",offsetX:"0px",offsetY:"0px"};e.options.container===document.body&&(d.of=document.body);var p={width:document.documentElement.clientWidth,height:window.innerHeight},f=pageXOffset,h=pageYOffset;if(n="string"==typeof e?document.querySelector(e):e,!t)return n.style.opacity=1,n;var u=n.getBoundingClientRect();"string"==typeof t?o=Object.assign({},d,jsPanel.pOposition(t)):(o=Object.assign({},d,t),["my","at","of","offsetX","offsetY","minLeft","maxLeft","minTop","maxTop"].forEach(function(t){"function"==typeof o[t]&&(o[t]=o[t].call(e,e))}));var g=n.parentElement,m=window.getComputedStyle(g),b=g.getBoundingClientRect(),y=g.tagName.toLowerCase();if(o.of&&"window"!==o.of&&(a="string"==typeof o.of?document.querySelector(o.of):o.of),o.my.match(/^center-top$|^center$|^center-bottom$/i)?r=u.width/2:o.my.match(/right/i)&&(r=u.width),o.my.match(/^left-center$|^center$|^right-center$/i)?l=u.height/2:o.my.match(/bottom/i)&&(l=u.height),"window"===e.options.container&&"body"===y&&"window"===o.of)o.at.match(/^center-top$|^center$|^center-bottom$/i)?s=p.width/2:o.at.match(/right/i)&&(s=p.width),o.at.match(/^left-center$|^center$|^right-center$/i)?c=p.height/2:o.at.match(/bottom/i)&&(c=p.height),i.left=s-r-parseFloat(m.borderLeftWidth),i.top=c-l-parseFloat(m.borderTopWidth),n.style.position="fixed";else if("body"===y&&"window"!==o.of){var v=a.getBoundingClientRect();s=o.at.match(/^center-top$|^center$|^center-bottom$/i)?v.width/2+v.left+f:o.at.match(/right/i)?v.width+v.left+f:v.left+f,c=o.at.match(/^left-center$|^center$|^right-center$/i)?v.height/2+v.top+h:o.at.match(/bottom/i)?v.height+v.top+h:v.top+h,i.left=s-r-parseFloat(m.borderLeftWidth),i.top=c-l-parseFloat(m.borderTopWidth)}else if("body"===y||"window"!==o.of&&o.of){if("body"!==y&&g.contains(a)){var w=a.getBoundingClientRect();s=o.at.match(/^center-top$|^center$|^center-bottom$/i)?w.left-b.left+w.width/2:o.at.match(/right/i)?w.left-b.left+w.width:w.left-b.left,c=o.at.match(/^left-center$|^center$|^right-center$/i)?w.top-b.top+w.height/2:o.at.match(/bottom/i)?w.top-b.top+w.height:w.top-b.top,i.left=s-r-parseFloat(m.borderLeftWidth),i.top=c-l-parseFloat(m.borderTopWidth)}}else{var j=parseFloat(m.borderLeftWidth)+parseFloat(m.borderRightWidth),C=parseFloat(m.borderTopWidth)+parseFloat(m.borderBottomWidth);o.at.match(/^center-top$|^center$|^center-bottom$/i)?s=b.width/2-j/2:o.at.match(/right/i)&&(s=b.width-j),o.at.match(/^left-center$|^center$|^right-center$/i)?c=b.height/2-C/2:o.at.match(/bottom/i)&&(c=b.height-C),i.left=s-r,i.top=c-l}if(o.autoposition&&o.my===o.at&&["left-top","center-top","right-top","left-bottom","center-bottom","right-bottom"].indexOf(o.my)>=0){"function"==typeof o.autoposition&&(o.autoposition=o.autoposition());var E=o.my+"-"+o.autoposition.toLowerCase();n.classList.add(E);var F=Array.prototype.slice.call(document.querySelectorAll("."+E)),P=F.indexOf(n);F.length>1&&("down"===o.autoposition?F.forEach(function(e,t){t>0&&t<=P&&(i.top+=F[--t].getBoundingClientRect().height+jsPanel.autopositionSpacing)}):"up"===o.autoposition?F.forEach(function(e,t){t>0&&t<=P&&(i.top-=F[--t].getBoundingClientRect().height+jsPanel.autopositionSpacing)}):"right"===o.autoposition?F.forEach(function(e,t){t>0&&t<=P&&(i.left+=F[--t].getBoundingClientRect().width+jsPanel.autopositionSpacing)}):"left"===o.autoposition&&F.forEach(function(e,t){t>0&&t<=P&&(i.left-=F[--t].getBoundingClientRect().width+jsPanel.autopositionSpacing)}))}var x=n.getScaleFactor();i.left/=x.x,i.top/=x.y;var z=parseFloat(m.borderLeftWidth)+parseFloat(m.borderRightWidth),S=parseFloat(m.borderTopWidth)+parseFloat(m.borderBottomWidth),A=z*(1-x.x)/x.x,B=S*(1-x.y)/x.y;if(o.at.match(/^right-top$|^right-center$|^right-bottom$/i)?i.left+=A:o.at.match(/^center-top$|^center$|^center-bottom$/i)&&(i.left+=A/2),o.at.match(/^left-bottom$|^center-bottom$|^right-bottom$/i)?i.top+=B:o.at.match(/^left-center$|^center$|^right-center$/i)&&(i.top+=B/2),i.left+="px",i.top+="px",n.style.left=i.left,n.style.top=i.top,o.offsetX&&("number"==typeof o.offsetX?n.style.left="calc("+i.left+" + "+o.offsetX+"px)":n.style.left="calc("+i.left+" + "+o.offsetX+")",i.left=window.getComputedStyle(n).left),o.offsetY&&("number"==typeof o.offsetY?n.style.top="calc("+i.top+" + "+o.offsetY+"px)":n.style.top="calc("+i.top+" + "+o.offsetY+")",i.top=window.getComputedStyle(n).top),o.minLeft){var T=parseFloat(i.left);"number"==typeof o.minLeft&&(o.minLeft+="px"),n.style.left=o.minLeft,T>parseFloat(window.getComputedStyle(n).left)&&(n.style.left=T+"px"),i.left=window.getComputedStyle(n).left}if(o.maxLeft){var L=parseFloat(i.left);"number"==typeof o.maxLeft&&(o.maxLeft+="px"),n.style.left=o.maxLeft,L<parseFloat(window.getComputedStyle(n).left)&&(n.style.left=L+"px"),i.left=window.getComputedStyle(n).left}if(o.maxTop){var D=parseFloat(i.top);"number"==typeof o.maxTop&&(o.maxTop+="px"),n.style.top=o.maxTop,D<parseFloat(window.getComputedStyle(n).top)&&(n.style.top=D+"px"),i.top=window.getComputedStyle(n).top}if(o.minTop){var k=parseFloat(i.top);"number"==typeof o.minTop&&(o.minTop+="px"),n.style.top=o.minTop,k>parseFloat(window.getComputedStyle(n).top)&&(n.style.top=k+"px"),i.top=window.getComputedStyle(n).top}if("function"==typeof o.modify){var q=o.modify.call(i,i);n.style.left=q.left,n.style.top=q.top}return n.style.opacity=1,n.style.left=window.getComputedStyle(n).left,n.style.top=window.getComputedStyle(n).top,n},processCallbacks:function(e,t){var n=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"some",o=arguments[3],a=arguments[4];if("function"==typeof t&&(t=[t]),n)return t[n](function(t){return t.call(e,e,o,a)});t.forEach(function(t){t.call(e,e,o,a)})},removeSnapAreas:function(){document.querySelectorAll(".jsPanel-snap-area").forEach(function(e){e.parentElement.removeChild(e)})},resetZi:function(){this.zi=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:jsPanel.ziBase;return{next:function(){return e++}}}(),Array.prototype.slice.call(document.querySelectorAll(".jsPanel-standard")).sort(function(e,t){return e.style.zIndex-t.style.zIndex}).forEach(function(e){e.style.zIndex=jsPanel.zi.next()})},resizeit:function(e){var t,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},o=Object.assign({},this.defaults.resizeit,n),a=e.parentElement,i=a.tagName.toLowerCase(),r="function"==typeof o.maxWidth?o.maxWidth():o.maxWidth||1e4,l="function"==typeof o.maxHeight?o.maxHeight():o.maxHeight||1e4,s="function"==typeof o.minWidth?o.minWidth():o.minWidth,c="function"==typeof o.minHeight?o.minHeight():o.minHeight,d=void 0,p=void 0,f=void 0,h=void 0,u=new CustomEvent("jspanelresizestart",{detail:e.id}),g=new CustomEvent("jspanelresize",{detail:e.id}),m=new CustomEvent("jspanelresizestop",{detail:e.id});return t=this.pOcontainment(o.containment),o.handles.split(",").forEach(function(t){var n=document.createElement("DIV");n.className="jsPanel-resizeit-handle jsPanel-resizeit-"+t.trim(),n.style.zIndex=90,e.append(n)}),e.querySelectorAll(".jsPanel-resizeit-handle").forEach(function(n){jsPanel.pointerdown.forEach(function(m){n.addEventListener(m,function(n){if(n.preventDefault(),n.button&&n.button>0)return!1;e.content.style.pointerEvents="none";var m=e.getBoundingClientRect(),b=a.getBoundingClientRect(),y=window.getComputedStyle(a,null),v=parseInt(y.borderLeftWidth,10),w=parseInt(y.borderTopWidth,10),j=y.getPropertyValue("position"),C=n.clientX||n.touches[0].clientX,E=n.clientY||n.touches[0].clientY,F=C/E,P=m.width,x=m.height,z=n.target.classList,S=e.getScaleFactor(),A=m.width/m.height,B=m.left,T=m.top,L=1e4,D=1e4,k=1e4,q=1e4;"body"!==i&&(B=m.left-b.left+a.scrollLeft,T=m.top-b.top+a.scrollTop),"body"===i&&t?(L=document.documentElement.clientWidth-m.left,k=document.documentElement.clientHeight-m.top,D=m.width+m.left,q=m.height+m.top):t&&("static"===j?(L=b.width-m.left+v,k=b.height+b.top-m.top+w,D=m.width+(m.left-b.left)-v,q=m.height+(m.top-b.top)-w):(L=a.clientWidth-(m.left-b.left)/S.x+v,k=a.clientHeight-(m.top-b.top)/S.y+w,D=(m.width+m.left-b.left)/S.x-v,q=e.clientHeight+(m.top-b.top)/S.y-w)),t&&(D-=t[3],q-=t[0],L-=t[1],k-=t[2]);var R=window.getComputedStyle(e),W=parseFloat(R.width)-m.width,M=parseFloat(R.height)-m.height,O=parseFloat(R.left)-m.left,I=parseFloat(R.top)-m.top;a!==document.body&&(O+=b.left,I+=b.top),d=function(n){p||(document.dispatchEvent(u),o.start&&jsPanel.processCallbacks(e,o.start,!1,{width:P,height:x},n),jsPanel.front(e)),p=1,document.dispatchEvent(g);var i=n.touches?n.touches[0].clientX:n.clientX,d=n.touches?n.touches[0].clientY:n.clientY;z.contains("jsPanel-resizeit-e")?((f=P+(i-C)/S.x+W)>=L&&(f=L),f>=r?f=r:f<=s&&(f=s),e.style.width=f+"px",o.aspectRatio&&(e.style.height=f/A+"px",o.containment&&e.overlaps(a).bottom<=t[2]&&(e.style.height=k+"px",e.style.width=k*A+"px"))):z.contains("jsPanel-resizeit-s")?((h=x+(d-E)/S.y+M)>=k&&(h=k),h>=l?h=l:h<=c&&(h=c),e.style.height=h+"px",o.aspectRatio&&(e.style.width=h*A+"px",o.containment&&e.overlaps(a).right<=t[1]&&(e.style.width=L+"px",e.style.height=L/A+"px"))):z.contains("jsPanel-resizeit-w")?((f=P+(C-i)/S.x+W)<=r&&f>=s&&f<=D&&(e.style.left=B+(i-C)/S.x+O+"px"),f>=D&&(f=D),f>=r?f=r:f<=s&&(f=s),e.style.width=f+"px",o.aspectRatio&&(e.style.height=f/A+"px",o.containment&&e.overlaps(a).bottom<=t[2]&&(e.style.height=k+"px",e.style.width=k*A+"px"))):z.contains("jsPanel-resizeit-n")?((h=x+(E-d)/S.y+M)<=l&&h>=c&&h<=q&&(e.style.top=T+(d-E)/S.y+I+"px"),h>=q&&(h=q),h>=l?h=l:h<=c&&(h=c),e.style.height=h+"px",o.aspectRatio&&(e.style.width=h*A+"px",o.containment&&e.overlaps(a).right<=t[1]&&(e.style.width=L+"px",e.style.height=L/A+"px"))):z.contains("jsPanel-resizeit-se")?((f=P+(i-C)/S.x+W)>=L&&(f=L),f>=r?f=r:f<=s&&(f=s),e.style.width=f+"px",o.aspectRatio&&(e.style.height=f/A+"px"),(h=x+(d-E)/S.y+M)>=k&&(h=k),h>=l?h=l:h<=c&&(h=c),e.style.height=h+"px",o.aspectRatio&&(e.style.width=h*A+"px",o.containment&&e.overlaps(a).right<=t[1]&&(e.style.width=L+"px",e.style.height=L/A+"px"))):z.contains("jsPanel-resizeit-sw")?((h=x+(d-E)/S.y+M)>=k&&(h=k),h>=l?h=l:h<=c&&(h=c),e.style.height=h+"px",o.aspectRatio&&(e.style.width=h*A+"px"),(f=P+(C-i)/S.x+W)<=r&&f>=s&&f<=D&&(e.style.left=B+(i-C)/S.x+O+"px"),f>=D&&(f=D),f>=r?f=r:f<=s&&(f=s),e.style.width=f+"px",o.aspectRatio&&(e.style.height=f/A+"px",o.containment&&e.overlaps(a).bottom<=t[2]&&(e.style.height=k+"px",e.style.width=k*A+"px"))):z.contains("jsPanel-resizeit-ne")?((f=P+(i-C)/S.x+W)>=L&&(f=L),f>=r?f=r:f<=s&&(f=s),e.style.width=f+"px",o.aspectRatio&&(e.style.height=f/A+"px"),(h=x+(E-d)/S.y+M)<=l&&h>=c&&h<=q&&(e.style.top=T+(d-E)/S.y+I+"px"),h>=q&&(h=q),h>=l?h=l:h<=c&&(h=c),e.style.height=h+"px",o.aspectRatio&&(e.style.width=h*A+"px",o.containment&&e.overlaps(a).right<=t[1]&&(e.style.width=L+"px",e.style.height=L/A+"px"))):z.contains("jsPanel-resizeit-nw")&&(o.aspectRatio&&z.contains("jsPanel-resizeit-nw")&&(d=(i=d*F)/F),(f=P+(C-i)/S.x+W)<=r&&f>=s&&f<=D&&(e.style.left=B+(i-C)/S.x+O+"px"),f>=D&&(f=D),f>=r?f=r:f<=s&&(f=s),e.style.width=f+"px",o.aspectRatio&&(e.style.height=f/A+"px"),(h=x+(E-d)/S.y+M)<=l&&h>=c&&h<=q&&(e.style.top=T+(d-E)/S.y+I+"px"),h>=q&&(h=q),h>=l?h=l:h<=c&&(h=c),e.style.height=h+"px",o.aspectRatio&&(e.style.width=h*A+"px")),window.getSelection().removeAllRanges();var m=window.getComputedStyle(e),b={left:parseFloat(m.left),top:parseFloat(m.top),right:parseFloat(m.right),bottom:parseFloat(m.bottom),width:parseFloat(m.width),height:parseFloat(m.height)};o.resize&&jsPanel.processCallbacks(e,o.resize,!1,b,n)},jsPanel.pointermove.forEach(function(e){document.addEventListener(e,d,!1)}),window.addEventListener("mouseout",function(e){null===e.relatedTarget&&jsPanel.pointermove.forEach(function(e){document.removeEventListener(e,d,!1)})},!1)})})}),jsPanel.pointerup.forEach(function(t){document.addEventListener(t,function(t){if(jsPanel.pointermove.forEach(function(e){document.removeEventListener(e,d,!1)}),t.target.classList&&t.target.classList.contains("jsPanel-resizeit-handle")){var n=void 0,a=void 0,i=t.target.className;if(i.match(/jsPanel-resizeit-nw|jsPanel-resizeit-w|jsPanel-resizeit-sw/i)&&(n=!0),i.match(/jsPanel-resizeit-nw|jsPanel-resizeit-n|jsPanel-resizeit-ne/i)&&(a=!0),o.grid&&Array.isArray(o.grid)){1===o.grid.length&&(o.grid[1]=o.grid[0]);var r=parseFloat(e.style.width),l=parseFloat(e.style.height),s=r%o.grid[0],c=l%o.grid[1],f=parseFloat(e.style.left),h=parseFloat(e.style.top),u=f%o.grid[0],g=h%o.grid[1];s<o.grid[0]/2?e.style.width=r-s+"px":e.style.width=r+(o.grid[0]-s)+"px",c<o.grid[1]/2?e.style.height=l-c+"px":e.style.height=l+(o.grid[1]-c)+"px",n&&(u<o.grid[0]/2?e.style.left=f-u+"px":e.style.left=f+(o.grid[0]-u)+"px"),a&&(g<o.grid[1]/2?e.style.top=h-g+"px":e.style.top=h+(o.grid[1]-g)+"px")}}p&&(e.content.style.pointerEvents="inherit",document.dispatchEvent(m),p=void 0,e.saveCurrentDimensions(),e.saveCurrentPosition(),o.stop&&jsPanel.processCallbacks(e,o.stop,!1,{width:parseFloat(e.style.width),height:parseFloat(e.style.height)},t)),e.content.style.pointerEvents="inherit"},!1)}),o.disable&&e.querySelectorAll(".jsPanel-resizeit-handle").forEach(function(e){e.style.pointerEvents="none"}),e},setClass:function(e,t){return t.split(" ").forEach(function(t){return e.classList.add(t)}),e},remClass:function(e,t){return t.split(" ").forEach(function(t){return e.classList.remove(t)}),e},setStyle:function(e,t){for(var n in t)if(t.hasOwnProperty(n)){var o=String(n).replace(/-\w/gi,function(e){return e.substr(-1).toUpperCase()});e.style[o]=t[n]}return e},snapPanel:function(e,t){if(e.currentData.beforeSnap={width:e.currentData.width,height:e.currentData.height},t&&"function"==typeof t)t.call(e,e,e.snappableTo);else if(!1!==t){var n=[0,0];if(e.options.dragit.snap.containment&&e.options.dragit.containment){var o=this.pOcontainment(e.options.dragit.containment),a=e.snappableTo;a.startsWith("left")?n[0]=o[3]:a.startsWith("right")&&(n[0]=-o[1]),a.endsWith("top")?n[1]=o[0]:a.endsWith("bottom")&&(n[1]=-o[2])}e.reposition(e.snappableTo+" "+n[0]+" "+n[1]),e.snapped=e.snappableTo}},create:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},n=arguments[1];jsPanel.zi||(jsPanel.zi=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:jsPanel.ziBase;return{next:function(){return e++}}}());var o=void 0;t.config?delete(t=Object.assign({},this.defaults,t.config,t)).config:t=Object.assign({},this.defaults,t),t.id?"function"==typeof t.id&&(t.id=t.id()):t.id="jsPanel-"+(jsPanel.idCounter+=1);var a=document.getElementById(t.id);if(null!==a)return a.classList.contains("jsPanel")&&a.front(),console.error("NO NEW PANEL CREATED!\nAn element with the ID <"+t.id+"> already exists in the document."),!1;var i=this.pOcontainer(t.container,n);if(!i)return console.error("NO NEW PANEL CREATED!\nThe container to append the panel to does not exist or a container was not specified!"),!1;t.maximizedMargin=this.pOcontainment(t.maximizedMargin),t.dragit&&(["start","drag","stop"].forEach(function(e){t.dragit[e]?"function"==typeof t.dragit[e]&&(t.dragit[e]=[t.dragit[e]]):t.dragit[e]=[]}),t.dragit.snap&&("object"===_typeof(t.dragit.snap)?t.dragit.snap=Object.assign({},this.defaultSnapConfig,t.dragit.snap):t.dragit.snap=this.defaultSnapConfig)),t.resizeit&&["start","resize","stop"].forEach(function(e){t.resizeit[e]?"function"==typeof t.resizeit[e]&&(t.resizeit[e]=[t.resizeit[e]]):t.resizeit[e]=[]}),["onbeforeclose","onbeforemaximize","onbeforeminimize","onbeforenormalize","onbeforesmallify","onbeforeunsmallify","onclosed","onfronted","onmaximized","onminimized","onnormalized","onsmallified","onstatuschange","onunsmallified"].forEach(function(e){t[e]?"function"==typeof t[e]&&(t[e]=[t[e]]):t[e]=[]}),t.headerRemove&&(t.header=!1);var r=t.template?t.template:this.createPanelTemplate();r.options=t,r.status="initialized",r.currentData={},r.header=r.querySelector(".jsPanel-hdr"),r.headerbar=r.header.querySelector(".jsPanel-headerbar"),r.titlebar=r.header.querySelector(".jsPanel-titlebar"),r.headerlogo=r.headerbar.querySelector(".jsPanel-headerlogo"),r.headertitle=r.headerbar.querySelector(".jsPanel-title"),r.controlbar=r.headerbar.querySelector(".jsPanel-controlbar"),r.headertoolbar=r.header.querySelector(".jsPanel-hdr-toolbar"),r.content=r.querySelector(".jsPanel-content"),r.footer=r.querySelector(".jsPanel-ftr"),r.snappableTo=!1,r.snapped=!1;var l=new CustomEvent("jspanelloaded",{detail:t.id}),s=new CustomEvent("jspanelbeforeclose",{detail:t.id}),c=new CustomEvent("jspanelclosed",{detail:t.id}),d=new CustomEvent("jspanelcloseduser",{detail:t.id}),p=new CustomEvent("jspanelstatuschange",{detail:t.id}),f=new CustomEvent("jspanelbeforenormalize",{detail:t.id}),h=new CustomEvent("jspanelnormalized",{detail:t.id}),u=new CustomEvent("jspanelbeforemaximize",{detail:t.id}),g=new CustomEvent("jspanelmaximized",{detail:t.id}),m=new CustomEvent("jspanelbeforeminimize",{detail:t.id}),b=new CustomEvent("jspanelminimized",{detail:t.id}),y=new CustomEvent("jspanelbeforesmallify",{detail:t.id}),v=new CustomEvent("jspanelsmallified",{detail:t.id}),w=new CustomEvent("jspanelsmallifiedmax",{detail:t.id}),j=new CustomEvent("jspanelbeforeunsmallify",{detail:t.id}),C=new CustomEvent("jspanelfronted",{detail:t.id}),E=r.querySelector(".jsPanel-btn-close"),F=r.querySelector(".jsPanel-btn-maximize"),P=r.querySelector(".jsPanel-btn-normalize"),x=r.querySelector(".jsPanel-btn-smallify"),z=r.querySelector(".jsPanel-btn-smallifyrev"),S=r.querySelector(".jsPanel-btn-minimize");E&&jsPanel.pointerup.forEach(function(e){E.addEventListener(e,function(e){if(e.preventDefault(),e.button&&e.button>0)return!1;r.close(),document.dispatchEvent(d)})}),F&&jsPanel.pointerup.forEach(function(e){F.addEventListener(e,function(e){if(e.preventDefault(),e.button&&e.button>0)return!1;r.maximize()})}),P&&jsPanel.pointerup.forEach(function(e){P.addEventListener(e,function(e){if(e.preventDefault(),e.button&&e.button>0)return!1;r.normalize()})}),x&&jsPanel.pointerup.forEach(function(e){x.addEventListener(e,function(e){if(e.preventDefault(),e.button&&e.button>0)return!1;r.smallify()})}),z&&jsPanel.pointerup.forEach(function(e){z.addEventListener(e,function(e){if(e.preventDefault(),e.button&&e.button>0)return!1;r.unsmallify()})}),S&&jsPanel.pointerup.forEach(function(e){S.addEventListener(e,function(e){if(e.preventDefault(),e.button&&e.button>0)return!1;r.minimize()})});var A=jsPanel.extensions;for(var B in A)A.hasOwnProperty(B)&&(r[B]=A[B]);if(r.addToolbar=function(e,t,n){if("header"===e?e=r.headertoolbar:"footer"===e&&(e=r.footer),"string"==typeof t)e.innerHTML=t;else if(Array.isArray(t))t.forEach(function(t){"string"==typeof t?e.innerHTML+=t:e.append(t)});else if("function"==typeof t){var o=t.call(r,r);"string"==typeof o?e.innerHTML=o:e.append(o)}else e.append(t);return e.classList.add("active"),n&&n.call(r,r),r},r.applyBuiltInTheme=function(e){if(r.classList.add("jsPanel-theme-"+e.color),r.header.classList.add("jsPanel-theme-"+e.color),e.filling){var n=e.filling;if("filled"===n||"filledlight"===n)r.content.style.background="",r.content.classList.add("jsPanel-content-"+n);else{var o=jsPanel.perceivedBrightness(n)<=jsPanel.colorBrightnessThreshold?"#fff":"#000";r.content.style.backgroundColor=n,r.content.style.color=o}}return t.headerToolbar||(r.content.style.borderTop="1px solid "+r.headertitle.style.color),r},r.applyArbitraryTheme=function(e){r.style.backgroundColor=e.colors[0],r.header.style.backgroundColor=e.colors[0],[".jsPanel-headerlogo",".jsPanel-title",".jsPanel-hdr-toolbar"].forEach(function(t){r.querySelector(t).style.color=e.colors[3]},r),r.querySelectorAll(".jsPanel-controlbar .jsPanel-btn").forEach(function(t){t.style.color=e.colors[3]});var n="#000000"===e.colors[3]?"1px solid rgba(0,0,0,0.2)":"1px solid rgba(255,255,255,0.2)";if(t.headerToolbar?(e.colors[3],r.headertoolbar.style.borderTop=n,jsPanel.setStyle(r.headertoolbar,{boxShadow:"0 0 1px "+e.colors[3]+" inset",width:"calc(100% + 4px)",marginLeft:"-1px"})):r.content.style.borderTop=n,e.filling){var o=e.filling;if("filled"===o)jsPanel.setStyle(r.content,{backgroundColor:e.colors[0],color:e.colors[3],borderTop:n});else if("filledlight"===o)r.content.style.backgroundColor=e.colors[1];else{var a=jsPanel.perceivedBrightness(o)<=jsPanel.colorBrightnessThreshold?"#fff":"#000";r.content.style.backgroundColor=o,r.content.style.color=a}}return r},r.applyBootstrapTheme=function(e){var t=e.bstheme,n=$.fn.button.Constructor.VERSION[0];if("4"===n?r.classList.add("bg-"+t):(["panel","panel-"+t].forEach(function(e){r.classList.add(e)}),r.header.classList.add("panel-heading")),"mdb"===e.bs){var o=t+"-color";e.mdbStyle&&(o+="-dark"),r.classList.add(o)}var a=void 0;a="4"===n?window.getComputedStyle(r).backgroundColor.replace(/\s+/g,""):window.getComputedStyle(r.header).backgroundColor.replace(/\s+/g,"");var i=jsPanel.calcColors(a);if(r.header.style.color=i[3],e.filling){var l=e.filling;if("filled"===l||"filledlight"===l)r.setTheme(a+" "+e.filling);else{r.setTheme(a);var s=jsPanel.perceivedBrightness(l)<=jsPanel.colorBrightnessThreshold?"#fff":"#000";r.content.style.backgroundColor=l,r.content.style.color=s}}return r},r.applyThemeBorder=function(e){var n=t.border.split(/\s+/gi);if(n[2]&&(jsPanel.colorNames[n[2]]?jsPanel.colorNames[n[2]].match(/^([0-9a-f]{3}|[0-9a-f]{6})$/gi)?n[2]="#"+jsPanel.colorNames[n[2]]:n[2]=jsPanel.colorNames[n[2]]:n[2].match(/^([0-9a-f]{3}|[0-9a-f]{6})$/gi)&&(n[2]="#"+n[2])),r.style.borderWidth=n[0],r.style.borderStyle=n[1],r.style.borderColor=n[2],e.bs){var o=void 0;o="transparent"===window.getComputedStyle(r.header).backgroundColor?window.getComputedStyle(r).backgroundColor.replace(/\s+/g,""):window.getComputedStyle(r.header).backgroundColor.replace(/\s+/g,""),n[2]?r.style.borderColor=n[2]:r.style.borderColor=o}else-1===jsPanel.themes.indexOf(e.color)&&(n[2]?r.style.borderColor=n[2]:r.style.borderColor=e.colors[0]);return r},r.autopositionRemaining=function(){var e=void 0;(["left-top-down","left-top-right","center-top-down","right-top-down","right-top-left","left-bottom-up","left-bottom-right","center-bottom-up","right-bottom-up","right-bottom-left"].forEach(function(t){r.classList.contains(t)&&(e=t)}),e)&&("window"===t.container?document.body:t.container).querySelectorAll("."+e).forEach(function(e){e.reposition()})},r.borderRadius=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:5,t="string"==typeof e?e:e+"px",n=r.header.style,o=r.content.style,a=r.footer.style;return r.style.borderRadius=t,r.querySelector(".jsPanel-hdr")?(n.borderTopLeftRadius=t,n.borderTopRightRadius=t):(o.borderTopLeftRadius=t,o.borderTopRightRadius=t),r.querySelector(".jsPanel-ftr.active")?(a.borderBottomLeftRadius=t,a.borderBottomRightRadius=t):(o.borderBottomLeftRadius=t,o.borderBottomRightRadius=t),r},r.calcSizeFactors=function(){var e=window.getComputedStyle(r);if(t.container===document.body)r.hf=parseFloat(r.style.left)/(document.body.clientWidth-parseFloat(r.style.width)),r.vf=parseFloat(r.style.top)/(window.innerHeight-parseFloat(e.height));else{var n=r.parentElement.getBoundingClientRect();r.hf=parseFloat(r.style.left)/(n.width-parseFloat(r.style.width)),r.vf=parseFloat(r.style.top)/(n.height-parseFloat(e.height))}},r.clearTheme=function(e){return jsPanel.themes.concat(jsPanel.mdbthemes).forEach(function(e){["panel","jsPanel-theme-"+e,"panel-"+e,e+"-color"].forEach(function(e){r.classList.remove(e)}),r.header.classList.remove("panel-heading","jsPanel-theme-"+e)},r),r.headertitle.classList.remove("panel-title"),r.content.classList.remove("panel-body","jsPanel-content-filled","jsPanel-content-filledlight"),r.footer.classList.remove("panel-footer"),jsPanel.setStyle(r,{backgroundColor:"",borderWidth:"",borderStyle:"",borderColor:""}),jsPanel.setStyle(r.content,{background:"",border:""}),jsPanel.setStyle(r.headertoolbar,{boxShadow:"",width:"",marginLeft:""}),r.header.style.background="",Array.prototype.slice.call(r.controlbar.querySelectorAll(".jsPanel-icon")).concat([r.headerlogo,r.headertitle,r.headertoolbar,r.content]).forEach(function(e){e.style.color=""}),e&&e.call(r,r),r},r.close=function(e){var n=t.id,a=void 0,i=function(){if(o&&window.clearTimeout(o),r.closeChildpanels(),r.parentElement&&(a=r.parentElement.removeChild(r)),!a)return!1;r.removeMinimizedReplacement(),document.dispatchEvent(c),t.onclosed&&jsPanel.processCallbacks(r,t.onclosed,"every"),r.autopositionRemaining()};return document.dispatchEvent(s),t.onbeforeclose&&t.onbeforeclose.length>0&&!jsPanel.processCallbacks(r,t.onbeforeclose)?r:(t.animateOut?(t.animateIn&&jsPanel.remClass(r,t.animateIn),jsPanel.setClass(r,t.animateOut),r.addEventListener("animationend",function(){i()})):i(),a?(e&&e.call(n,n),a=void 0,n):(e&&e.call(r,n,r),!1))},r.closeChildpanels=function(e){return r.getChildpanels().forEach(function(e){return e.close()}),e&&e.call(r,r),r},r.contentRemove=function(e){return jsPanel.emptyNode(r.content),e&&e.call(r,r),r},r.createMinimizedReplacement=function(){var e=jsPanel.createMinimizedTemplate(),n=window.getComputedStyle(r.headertitle).color,o=t.iconfont,a=e.querySelector(".jsPanel-controlbar");return e.style.backgroundColor="transparent"===window.getComputedStyle(r.header).backgroundColor?window.getComputedStyle(r).backgroundColor:window.getComputedStyle(r.header).backgroundColor,e.id=r.id+"-min",e.querySelector(".jsPanel-headerbar").replaceChild(r.headerlogo.cloneNode(!0),e.querySelector(".jsPanel-headerlogo")),e.querySelector(".jsPanel-titlebar").replaceChild(r.headertitle.cloneNode(!0),e.querySelector(".jsPanel-title")),e.querySelector(".jsPanel-title").style.color=n,a.style.color=n,r.setIconfont(o,e),"enabled"===r.dataset.btnnormalize?jsPanel.pointerup.forEach(function(t){e.querySelector(".jsPanel-btn-normalize").addEventListener(t,function(){r.normalize()})}):a.querySelector(".jsPanel-btn-normalize").style.display="none","enabled"===r.dataset.btnmaximize?jsPanel.pointerup.forEach(function(t){e.querySelector(".jsPanel-btn-maximize").addEventListener(t,function(){r.maximize()})}):a.querySelector(".jsPanel-btn-maximize").style.display="none","enabled"===r.dataset.btnclose?jsPanel.pointerup.forEach(function(t){e.querySelector(".jsPanel-btn-close").addEventListener(t,function(){r.close()})}):a.querySelector(".jsPanel-btn-close").style.display="none",e},r.dragit=function(e){var n=Object.assign({},jsPanel.defaults.dragit,t.dragit),o=r.querySelectorAll(n.handles);return"disable"===e?o.forEach(function(e){e.style.pointerEvents="none"}):o.forEach(function(e){e.style.pointerEvents="auto"}),r},r.front=function(e){var n=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];return jsPanel.front(r),document.dispatchEvent(C),e&&e.call(r,r),t.onfronted&&n&&jsPanel.processCallbacks(r,t.onfronted,"every"),r},r.getChildpanels=function(){return Array.prototype.slice.call(r.content.querySelectorAll(".jsPanel"))},r.getScaleFactor=function(){var e=r.getBoundingClientRect();return{x:e.width/r.offsetWidth,y:e.height/r.offsetHeight}},r.getThemeDetails=function(e){var t=e.toLowerCase().replace(/ /g,""),n={color:!1,colors:!1,filling:!1,bs:!1,bstheme:!1};if(t.endsWith("filled"))n.filling="filled",n.color=t.substr(0,t.length-6);else if(t.endsWith("filledlight"))n.filling="filledlight",n.color=t.substr(0,t.length-11);else if(t.includes("fillcolor")){var o=t.split("fillcolor");jsPanel.colorNames[o[1]]&&(o[1]="#"+jsPanel.colorNames[o[1]]),o[1].match(/^([0-9a-f]{3}|[0-9a-f]{6})$/gi)&&(o[1]="#"+o[1]),n.filling=o[1],n.color=o[0]}else n.filling="",n.color=t;if(n.colors=jsPanel.calcColors(n.color),n.color.match("-")){var a=n.color.split("-");n.bs=a[0],n.bstheme=a[1],n.mdbStyle=a[2]||void 0}return n},r.isChildpanel=function(){var e=r.closest(".jsPanel-content");return!!e&&e.parentElement},r.maximize=function(e){if(t.onbeforemaximize&&t.onbeforemaximize.length>0&&!jsPanel.processCallbacks(r,t.onbeforemaximize))return r;document.dispatchEvent(u);var n=r.parentElement,o=t.maximizedMargin;return n===document.body?(r.style.width=document.documentElement.clientWidth-o[1]-o[3]+"px",r.style.height=document.documentElement.clientHeight-o[0]-o[2]+"px",r.style.left=o[3]+"px",r.style.top=o[0]+"px",t.position.fixed||(r.style.left=window.pageXOffset+o[3]+"px",r.style.top=window.pageYOffset+o[0]+"px")):(r.style.width=n.clientWidth-o[1]-o[3]+"px",r.style.height=n.clientHeight-o[0]-o[2]+"px",r.style.left=o[3]+"px",r.style.top=o[0]+"px"),r.removeMinimizedReplacement(),r.status="maximized",r.setControls([".jsPanel-btn-maximize",".jsPanel-btn-smallifyrev"]),jsPanel.front(r),document.dispatchEvent(g),document.dispatchEvent(p),t.onstatuschange&&jsPanel.processCallbacks(r,t.onstatuschange,"every"),e&&e.call(r,r),t.onmaximized&&jsPanel.processCallbacks(r,t.onmaximized,"every"),r},r.minimize=function(e){if("minimized"===r.status)return r;if(t.onbeforeminimize&&t.onbeforeminimize.length>0&&!jsPanel.processCallbacks(r,t.onbeforeminimize))return r;if(document.dispatchEvent(m),!document.getElementById("jsPanel-replacement-container")){var n=document.createElement("div");n.id="jsPanel-replacement-container",document.body.append(n)}if(r.style.left="-9999px",r.statusBefore=r.status,r.status="minimized",document.dispatchEvent(b),document.dispatchEvent(p),t.onstatuschange&&jsPanel.processCallbacks(r,t.onstatuschange,"every"),t.minimizeTo){var o=r.createMinimizedReplacement(),a=void 0,i=void 0,l=void 0;"default"===t.minimizeTo?document.getElementById("jsPanel-replacement-container").append(o):"parentpanel"===t.minimizeTo?(a=(l=(i=r.closest(".jsPanel-content").parentElement).querySelectorAll(".jsPanel-minimized-box"))[l.length-1]).append(o):"parent"===t.minimizeTo?((a=(i=r.parentElement).querySelector(".jsPanel-minimized-container"))||((a=document.createElement("div")).className="jsPanel-minimized-container",i.append(a)),a.append(o)):document.querySelector(t.minimizeTo).append(o)}return e&&e.call(r,r),t.onminimized&&jsPanel.processCallbacks(r,t.onminimized,"every"),r},r.normalize=function(e){return"normalized"===r.status?r:t.onbeforenormalize&&t.onbeforenormalize.length>0&&!jsPanel.processCallbacks(r,t.onbeforenormalize)?r:(document.dispatchEvent(f),r.style.width=r.currentData.width,r.style.height=r.currentData.height,r.style.left=r.currentData.left,r.style.top=r.currentData.top,r.removeMinimizedReplacement(),r.status="normalized",r.setControls([".jsPanel-btn-normalize",".jsPanel-btn-smallifyrev"]),jsPanel.front(r),document.dispatchEvent(h),document.dispatchEvent(p),t.onstatuschange&&jsPanel.processCallbacks(r,t.onstatuschange,"every"),e&&e.call(r,r),t.onnormalized&&jsPanel.processCallbacks(r,t.onnormalized,"every"),r)},r.overlaps=function(e,t){return jsPanel.overlaps(r,e,t)},r.removeMinimizedReplacement=function(){var e=document.getElementById(r.id+"-min");return e&&e.parentElement.removeChild(e),r},r.reposition=function(){for(var e=arguments.length,n=Array(e),o=0;o<e;o++)n[o]=arguments[o];var a=t.position,i=!0,l=void 0;return n.forEach(function(e){"string"==typeof e||"object"===(void 0===e?"undefined":_typeof(e))?a=e:"boolean"==typeof e?i=e:"function"==typeof e&&(l=e)}),jsPanel.position(r,a),i&&r.saveCurrentPosition(),l&&l.call(r,r),r},r.repositionOnSnap=function(e){var n="0",o="0",a=jsPanel.pOcontainment(t.dragit.containment);t.dragit.snap.containment&&("left-top"===e?(n=a[3],o=a[0]):"right-top"===e?(n=-a[1],o=a[0]):"right-bottom"===e?(n=-a[1],o=-a[2]):"left-bottom"===e?(n=a[3],o=-a[2]):"center-top"===e?(n=a[3]/2-a[1]/2,o=a[0]):"center-bottom"===e?(n=a[3]/2-a[1]/2,o=-a[2]):"left-center"===e?(n=a[3],o=a[0]/2-a[2]/2):"right-center"===e&&(n=-a[1],o=a[0]/2-a[2]/2)),jsPanel.position(r,e),jsPanel.setStyle(r,{left:"calc("+r.style.left+" + "+n+"px)",top:"calc("+r.style.top+" + "+o+"px)"})},r.resize=function(){for(var e=arguments.length,t=Array(e),n=0;n<e;n++)t[n]=arguments[n];var o=window.getComputedStyle(r),a={width:o.width,height:o.height},i=!0,l=void 0;t.forEach(function(e){"string"==typeof e?a=e:"object"===(void 0===e?"undefined":_typeof(e))?a=Object.assign(a,e):"boolean"==typeof e?i=e:"function"==typeof e&&(l=e)});var s=jsPanel.pOsize(r,a);return r.style.width=s.width,r.style.height=s.height,i&&r.saveCurrentDimensions(),l&&l.call(r,r),r},r.resizeit=function(e){var t=r.querySelectorAll(".jsPanel-resizeit-handle");return"disable"===e?t.forEach(function(e){e.style.pointerEvents="none"}):t.forEach(function(e){e.style.pointerEvents="auto"}),r},r.saveCurrentDimensions=function(){var e=window.getComputedStyle(r);r.currentData.width=e.width,"normalized"===r.status&&(r.currentData.height=e.height)},r.saveCurrentPosition=function(){var e=window.getComputedStyle(r);r.currentData.left=e.left,r.currentData.top=e.top},r.setControls=function(e,t){return r.header.querySelectorAll(".jsPanel-btn").forEach(function(e){e.style.display="block"}),e.forEach(function(e){var t=r.controlbar.querySelector(e);t&&(t.style.display="none")}),t&&t.call(r,r),r},r.setControlStatus=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"enable",n=arguments[2];if("disable"===t){if("removed"!==r.getAttribute("data-btn"+e)){r.setAttribute("data-btn"+e,"disabled");var o=r.controlbar.querySelector(".jsPanel-btn-"+e);o.style.pointerEvents="none",o.style.opacity=.4,o.style.cursor="default"}}else if("enable"===t){if("removed"!==r.getAttribute("data-btn"+e)){r.setAttribute("data-btn"+e,"enabled");var a=r.controlbar.querySelector(".jsPanel-btn-"+e);a.style.pointerEvents="auto",a.style.opacity=1,a.style.cursor="pointer"}}else if("remove"===t){var i=r.controlbar.querySelector(".jsPanel-btn-"+e);r.controlbar.removeChild(i),r.setAttribute("data-btn"+e,"removed")}return n&&n.call(r,r),r},r.setHeaderControls=function(e){var n=["close","maximize","normalize","minimize","smallify","smallifyrev"],o=t.headerControls;return"string"==typeof o?"none"===o?n.forEach(function(e){r.setControlStatus(e,"remove")}):"closeonly"===o&&n.forEach(function(e){"close"!==e&&r.setControlStatus(e,"remove")}):n.forEach(function(e){o[e]&&r.setControlStatus(e,o[e])}),e&&e.call(r,r),r},r.setHeaderLogo=function(e,t){var n=[r.headerlogo],o=document.querySelector("#"+r.id+"-min");return o&&n.push(o.querySelector(".jsPanel-headerlogo")),"string"==typeof e?"<"!==e.substr(0,1)?n.forEach(function(t){jsPanel.emptyNode(t);var n=document.createElement("img");n.src=e,t.append(n)}):n.forEach(function(t){t.innerHTML=e}):n.forEach(function(t){jsPanel.emptyNode(t),t.append(e)}),n.forEach(function(e){e.querySelectorAll("img").forEach(function(e){e.style.maxHeight=getComputedStyle(r.headerbar).height})}),t&&t.call(r,r),r},r.setHeaderRemove=function(e){return r.removeChild(r.header),r.content.classList.add("jsPanel-content-noheader"),["close","maximize","normalize","minimize","smallify","smallifyrev"].forEach(function(e){r.setAttribute("data-btn"+e,"removed")}),e&&e.call(r,r),r},r.setHeaderTitle=function(e,t){var n=[r.headertitle],o=document.querySelector("#"+r.id+"-min");return o&&n.push(o.querySelector(".jsPanel-title")),"string"==typeof e?n.forEach(function(t){t.innerHTML=e}):"function"==typeof e?n.forEach(function(t){jsPanel.emptyNode(t),t.innerHTML=e()}):n.forEach(function(t){jsPanel.emptyNode(t),t.append(e)}),t&&t.call(r,r),r},r.setIconfont=function(){var e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:r,n=arguments[2];if(!1!==e){var o=void 0,a=void 0;if("bootstrap"===e||"glyphicon"===e)o=["glyphicon glyphicon-remove","glyphicon glyphicon-fullscreen","glyphicon glyphicon-resize-full","glyphicon glyphicon-minus","glyphicon glyphicon-chevron-down","glyphicon glyphicon-chevron-up"];else if("fa"===e||"far"===e||"fal"===e||"fas"===e)o=[e+" fa-window-close",e+" fa-window-maximize",e+" fa-window-restore",e+" fa-window-minimize",e+" fa-chevron-down",e+" fa-chevron-up"];else if("material-icons"===e)o=[e,e,e,e,e,e],a=["close","fullscreen","fullscreen_exit","call_received","expand_more","expand_less"],t.controlbar.querySelectorAll(".jsPanel-btn").forEach(function(e){e.style.padding="6px 0 8px 0"});else{if(!Array.isArray(e))return t;o=["custom-control-icon "+e[5],"custom-control-icon "+e[4],"custom-control-icon "+e[3],"custom-control-icon "+e[2],"custom-control-icon "+e[1],"custom-control-icon "+e[0]]}t.querySelectorAll(".jsPanel-controlbar .jsPanel-btn").forEach(function(e){jsPanel.emptyNode(e).innerHTML="<span></span>"}),Array.prototype.slice.call(t.querySelectorAll(".jsPanel-controlbar .jsPanel-btn > span")).reverse().forEach(function(t,n){t.className=o[n],"material-icons"===e&&(t.textContent=a[n])})}return n&&n.call(t,t),t},r.setRtl=function(){[r.header,r.headerbar,r.titlebar,r.controlbar,r.headertoolbar,r.footer].forEach(function(e){e.classList.add("jsPanel-rtl")}),[r.headertitle,r.headertoolbar,r.content,r.footer].forEach(function(e){e.dir="rtl",t.rtl.lang&&(e.lang=t.rtl.lang)})},r.setSize=function(){if(t.panelSize){var e=jsPanel.pOsize(r,t.panelSize);r.style.width=e.width,r.style.height=e.height}else if(t.contentSize){var n=jsPanel.pOsize(r,t.contentSize);r.content.style.width=n.width,r.content.style.height=n.height,r.style.width=n.width,r.content.style.width="100%"}return r},r.setTheme=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:t.theme,n=arguments[1];if(r.clearTheme(),"none"===e)return r.style.backgroundColor="#fff",r;var o=r.getThemeDetails(e);return o.bs?r.applyBootstrapTheme(o):-1!==jsPanel.themes.indexOf(o.color)?r.applyBuiltInTheme(o):r.applyArbitraryTheme(o),t.border?r.applyThemeBorder(o):(r.style.borderWidth="",r.style.borderStyle="",r.style.borderColor=""),n&&n.call(r,r),r},r.smallify=function(e){if("smallified"===r.status||"smallifiedmax"===r.status)return r;if(t.onbeforesmallify&&t.onbeforesmallify.length>0&&!jsPanel.processCallbacks(r,t.onbeforesmallify))return r;document.dispatchEvent(y),"normalized"===r.status&&r.saveCurrentDimensions(),r.style.overflow="hidden";var n=window.getComputedStyle(r),o=parseFloat(window.getComputedStyle(r.headerbar).height);r.style.height=parseFloat(n.borderTopWidth)+parseFloat(n.borderBottomWidth)+o+"px","normalized"===r.status?(r.setControls([".jsPanel-btn-normalize",".jsPanel-btn-smallify"]),r.status="smallified",document.dispatchEvent(v),document.dispatchEvent(p),t.onstatuschange&&jsPanel.processCallbacks(r,t.onstatuschange,"every")):"maximized"===r.status&&(r.setControls([".jsPanel-btn-maximize",".jsPanel-btn-smallify"]),r.status="smallifiedmax",document.dispatchEvent(w),document.dispatchEvent(p),t.onstatuschange&&jsPanel.processCallbacks(r,t.onstatuschange,"every"));var a=r.querySelectorAll(".jsPanel-minimized-box");return a[a.length-1].style.display="none",e&&e.call(r,r),t.onsmallified&&jsPanel.processCallbacks(r,t.onsmallified,"every"),r},r.unsmallify=function(e){if("smallified"===r.status||"smallifiedmax"===r.status){if(t.onbeforeunsmallify&&t.onbeforeunsmallify.length>0&&!jsPanel.processCallbacks(r,t.onbeforeunsmallify))return r;document.dispatchEvent(j),r.style.overflow="visible",jsPanel.front(r),"smallified"===r.status?(r.style.height=r.currentData.height,r.setControls([".jsPanel-btn-normalize",".jsPanel-btn-smallifyrev"]),r.status="normalized",document.dispatchEvent(h),document.dispatchEvent(p),t.onstatuschange&&jsPanel.processCallbacks(r,t.onstatuschange,"every")):"smallifiedmax"===r.status?r.maximize():"minimized"===r.status&&r.normalize();var n=r.querySelectorAll(".jsPanel-minimized-box");n[n.length-1].style.display="flex",e&&e.call(r,r),t.onunsmallified&&jsPanel.processCallbacks(r,t.onunsmallified,"every")}return r},r.id=t.id,r.classList.add("jsPanel-"+t.paneltype),"standard"===t.paneltype&&(r.style.zIndex=this.zi.next()),i.append(r),r.front(!1,!1),r.setTheme(t.theme),t.boxShadow&&r.classList.add("jsPanel-depth-"+t.boxShadow),t.header){if(t.headerLogo&&r.setHeaderLogo(t.headerLogo),r.setIconfont(t.iconfont),r.setHeaderTitle(t.headerTitle),r.setHeaderControls(),"auto-show-hide"===t.header){var T=t.theme.split("-"),L="jsPanel-depth-"+t.boxShadow,D="bg-",k=void 0;T[1]&&(D+=T[1]),T[2]&&(k=T[1]+"-color-"+T[2]),r.header.style.opacity=0,"bootstrap"!==T[0]&&"mdb"!==T[0]||(this.remClass(r,D),"mdb"===T[0]&&this.remClass(r,k)),r.style.backgroundColor="transparent",this.remClass(r,L),this.setClass(r.content,L),r.header.addEventListener("mouseenter",function(){r.header.style.opacity=1,"bootstrap"!==T[0]&&"mdb"!==T[0]||(jsPanel.setClass(r,D),"mdb"===T[0]&&jsPanel.setClass(r,k)),jsPanel.setClass(r,L),jsPanel.remClass(r.content,L)}),r.header.addEventListener("mouseleave",function(){r.header.style.opacity=0,"bootstrap"!==T[0]&&"mdb"!==T[0]||(jsPanel.remClass(r,D),"mdb"===T[0]&&jsPanel.remClass(r,k)),jsPanel.remClass(r,L),jsPanel.setClass(r.content,L)})}}else r.setHeaderRemove();if(t.headerToolbar&&r.addToolbar(r.headertoolbar,t.headerToolbar),t.footerToolbar&&r.addToolbar(r.footer,t.footerToolbar),t.borderRadius&&r.borderRadius(t.borderRadius),t.content&&("function"==typeof t.content?t.content.call(r,r):"string"==typeof t.content?r.content.innerHTML=t.content:r.content.append(t.content)),t.contentAjax&&this.ajax(r,t.contentAjax),t.contentFetch&&this.fetch(r),t.contentOverflow){var q=t.contentOverflow.split(" ");1===q.length?r.content.style.overflow=q[0]:2===q.length&&(r.content.style.overflowX=q[0],r.content.style.overflowY=q[1])}if(t.rtl&&r.setRtl(),r.setSize(),r.status="normalized",t.position||"cursor"!==t.position?this.position(r,t.position):r.style.opacity=1,document.dispatchEvent(h),r.calcSizeFactors(),t.animateIn&&(r.addEventListener("animationend",function(){e.remClass(r,t.animateIn)}),this.setClass(r,t.animateIn)),t.syncMargins){var R=this.pOcontainment(t.maximizedMargin);t.dragit&&(t.dragit.containment=R,t.dragit.snap&&(t.dragit.snap.containment=!0)),t.resizeit&&(t.resizeit.containment=R)}if(t.dragit?(this.dragit(r,t.dragit),r.addEventListener("jspaneldragstop",function(e){e.detail===r.id&&r.calcSizeFactors()},!1)):r.titlebar.style.cursor="default",t.resizeit){this.resizeit(r,t.resizeit);var W=void 0;r.addEventListener("jspanelresizestart",function(e){e.detail===r.id&&(W=r.status)},!1),r.addEventListener("jspanelresizestop",function(e){e.detail===r.id&&("smallified"===W||"smallifiedmax"===W||"maximized"===W)&&parseFloat(r.style.height)>parseFloat(window.getComputedStyle(r.header).height)&&(r.setControls([".jsPanel-btn-normalize",".jsPanel-btn-smallifyrev"]),r.status="normalized",document.dispatchEvent(h),document.dispatchEvent(p),t.onstatuschange&&jsPanel.processCallbacks(r,t.onstatuschange,"every"),r.calcSizeFactors())},!1)}if(r.saveCurrentDimensions(),r.saveCurrentPosition(),t.setStatus){var M=t.setStatus;if("smallifiedmax"===M)r.maximize().smallify();else if("smallified"===M)r.smallify();else{var O=M.substr(0,M.length-1);r[O]()}}return t.autoclose&&(o=window.setTimeout(function(){r&&r.close()},t.autoclose)),this.pointerdown.forEach(function(e){r.addEventListener(e,function(e){e.target.closest(".jsPanel-btn-close")||e.target.closest(".jsPanel-btn-minimize")||"standard"!==t.paneltype||r.front()},!1)}),t.onwindowresize&&window.addEventListener("resize",function(e){if(e.target===window){var n=t.onwindowresize,o=r.status,a=void 0;if(!r.parentElement)return!1;a=window.getComputedStyle(r.parentElement),"maximized"===o&&!0===n?r.maximize():"normalized"!==o&&"smallified"!==o&&"maximized"!==o||("function"==typeof n?n.call(r,e,r):(r.style.left=(l=void 0,(l="window"===t.container?(window.innerWidth-parseFloat(r.style.width))*r.hf:(parseFloat(a.width)-parseFloat(r.style.width))*r.hf)<=0?0:l+"px"),r.style.top=(i=void 0,(i="window"===t.container?(window.innerHeight-parseFloat(r.currentData.height))*r.vf:(parseFloat(a.height)-parseFloat(r.currentData.height))*r.vf)<=0?0:i+"px")))}var i,l},!1),this.pointerup.forEach(function(e){r.addEventListener(e,function(){r.content.style.pointerEvents="inherit"})}),this.globalCallbacks&&(Array.isArray(this.globalCallbacks)?this.globalCallbacks.forEach(function(e){e.call(r,r)}):this.globalCallbacks.call(r,r)),t.callback&&(Array.isArray(t.callback)?t.callback.forEach(function(e){e.call(r,r)}):t.callback.call(r,r)),n&&n.call(r,r),document.dispatchEvent(l),r}};

/***/ }),

/***/ "./node_modules/process/browser.js":
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/style-loader/lib/addStyles.js":
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/

var stylesInDom = {};

var	memoize = function (fn) {
	var memo;

	return function () {
		if (typeof memo === "undefined") memo = fn.apply(this, arguments);
		return memo;
	};
};

var isOldIE = memoize(function () {
	// Test for IE <= 9 as proposed by Browserhacks
	// @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
	// Tests for existence of standard globals is to allow style-loader
	// to operate correctly into non-standard environments
	// @see https://github.com/webpack-contrib/style-loader/issues/177
	return window && document && document.all && !window.atob;
});

var getTarget = function (target, parent) {
  if (parent){
    return parent.querySelector(target);
  }
  return document.querySelector(target);
};

var getElement = (function (fn) {
	var memo = {};

	return function(target, parent) {
                // If passing function in options, then use it for resolve "head" element.
                // Useful for Shadow Root style i.e
                // {
                //   insertInto: function () { return document.querySelector("#foo").shadowRoot }
                // }
                if (typeof target === 'function') {
                        return target();
                }
                if (typeof memo[target] === "undefined") {
			var styleTarget = getTarget.call(this, target, parent);
			// Special case to return head of iframe instead of iframe itself
			if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
				try {
					// This will throw an exception if access to iframe is blocked
					// due to cross-origin restrictions
					styleTarget = styleTarget.contentDocument.head;
				} catch(e) {
					styleTarget = null;
				}
			}
			memo[target] = styleTarget;
		}
		return memo[target]
	};
})();

var singleton = null;
var	singletonCounter = 0;
var	stylesInsertedAtTop = [];

var	fixUrls = __webpack_require__("./node_modules/style-loader/lib/urls.js");

module.exports = function(list, options) {
	if (typeof DEBUG !== "undefined" && DEBUG) {
		if (typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};

	options.attrs = typeof options.attrs === "object" ? options.attrs : {};

	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (!options.singleton && typeof options.singleton !== "boolean") options.singleton = isOldIE();

	// By default, add <style> tags to the <head> element
        if (!options.insertInto) options.insertInto = "head";

	// By default, add <style> tags to the bottom of the target
	if (!options.insertAt) options.insertAt = "bottom";

	var styles = listToStyles(list, options);

	addStylesToDom(styles, options);

	return function update (newList) {
		var mayRemove = [];

		for (var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];

			domStyle.refs--;
			mayRemove.push(domStyle);
		}

		if(newList) {
			var newStyles = listToStyles(newList, options);
			addStylesToDom(newStyles, options);
		}

		for (var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];

			if(domStyle.refs === 0) {
				for (var j = 0; j < domStyle.parts.length; j++) domStyle.parts[j]();

				delete stylesInDom[domStyle.id];
			}
		}
	};
};

function addStylesToDom (styles, options) {
	for (var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];

		if(domStyle) {
			domStyle.refs++;

			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}

			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];

			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}

			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles (list, options) {
	var styles = [];
	var newStyles = {};

	for (var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = options.base ? item[0] + options.base : item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};

		if(!newStyles[id]) styles.push(newStyles[id] = {id: id, parts: [part]});
		else newStyles[id].parts.push(part);
	}

	return styles;
}

function insertStyleElement (options, style) {
	var target = getElement(options.insertInto)

	if (!target) {
		throw new Error("Couldn't find a style target. This probably means that the value for the 'insertInto' parameter is invalid.");
	}

	var lastStyleElementInsertedAtTop = stylesInsertedAtTop[stylesInsertedAtTop.length - 1];

	if (options.insertAt === "top") {
		if (!lastStyleElementInsertedAtTop) {
			target.insertBefore(style, target.firstChild);
		} else if (lastStyleElementInsertedAtTop.nextSibling) {
			target.insertBefore(style, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			target.appendChild(style);
		}
		stylesInsertedAtTop.push(style);
	} else if (options.insertAt === "bottom") {
		target.appendChild(style);
	} else if (typeof options.insertAt === "object" && options.insertAt.before) {
		var nextSibling = getElement(options.insertAt.before, target);
		target.insertBefore(style, nextSibling);
	} else {
		throw new Error("[Style Loader]\n\n Invalid value for parameter 'insertAt' ('options.insertAt') found.\n Must be 'top', 'bottom', or Object.\n (https://github.com/webpack-contrib/style-loader#insertat)\n");
	}
}

function removeStyleElement (style) {
	if (style.parentNode === null) return false;
	style.parentNode.removeChild(style);

	var idx = stylesInsertedAtTop.indexOf(style);
	if(idx >= 0) {
		stylesInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement (options) {
	var style = document.createElement("style");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}

	if(options.attrs.nonce === undefined) {
		var nonce = getNonce();
		if (nonce) {
			options.attrs.nonce = nonce;
		}
	}

	addAttrs(style, options.attrs);
	insertStyleElement(options, style);

	return style;
}

function createLinkElement (options) {
	var link = document.createElement("link");

	if(options.attrs.type === undefined) {
		options.attrs.type = "text/css";
	}
	options.attrs.rel = "stylesheet";

	addAttrs(link, options.attrs);
	insertStyleElement(options, link);

	return link;
}

function addAttrs (el, attrs) {
	Object.keys(attrs).forEach(function (key) {
		el.setAttribute(key, attrs[key]);
	});
}

function getNonce() {
	if (false) {}

	return __webpack_require__.nc;
}

function addStyle (obj, options) {
	var style, update, remove, result;

	// If a transform function was defined, run it on the css
	if (options.transform && obj.css) {
	    result = typeof options.transform === 'function'
		 ? options.transform(obj.css) 
		 : options.transform.default(obj.css);

	    if (result) {
	    	// If transform returns a value, use that instead of the original css.
	    	// This allows running runtime transformations on the css.
	    	obj.css = result;
	    } else {
	    	// If the transform function returns a falsy value, don't add this css.
	    	// This allows conditional loading of css
	    	return function() {
	    		// noop
	    	};
	    }
	}

	if (options.singleton) {
		var styleIndex = singletonCounter++;

		style = singleton || (singleton = createStyleElement(options));

		update = applyToSingletonTag.bind(null, style, styleIndex, false);
		remove = applyToSingletonTag.bind(null, style, styleIndex, true);

	} else if (
		obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function"
	) {
		style = createLinkElement(options);
		update = updateLink.bind(null, style, options);
		remove = function () {
			removeStyleElement(style);

			if(style.href) URL.revokeObjectURL(style.href);
		};
	} else {
		style = createStyleElement(options);
		update = applyToTag.bind(null, style);
		remove = function () {
			removeStyleElement(style);
		};
	}

	update(obj);

	return function updateStyle (newObj) {
		if (newObj) {
			if (
				newObj.css === obj.css &&
				newObj.media === obj.media &&
				newObj.sourceMap === obj.sourceMap
			) {
				return;
			}

			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;

		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag (style, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (style.styleSheet) {
		style.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = style.childNodes;

		if (childNodes[index]) style.removeChild(childNodes[index]);

		if (childNodes.length) {
			style.insertBefore(cssNode, childNodes[index]);
		} else {
			style.appendChild(cssNode);
		}
	}
}

function applyToTag (style, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		style.setAttribute("media", media)
	}

	if(style.styleSheet) {
		style.styleSheet.cssText = css;
	} else {
		while(style.firstChild) {
			style.removeChild(style.firstChild);
		}

		style.appendChild(document.createTextNode(css));
	}
}

function updateLink (link, options, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	/*
		If convertToAbsoluteUrls isn't defined, but sourcemaps are enabled
		and there is no publicPath defined then lets turn convertToAbsoluteUrls
		on by default.  Otherwise default to the convertToAbsoluteUrls option
		directly
	*/
	var autoFixUrls = options.convertToAbsoluteUrls === undefined && sourceMap;

	if (options.convertToAbsoluteUrls || autoFixUrls) {
		css = fixUrls(css);
	}

	if (sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = link.href;

	link.href = URL.createObjectURL(blob);

	if(oldSrc) URL.revokeObjectURL(oldSrc);
}


/***/ }),

/***/ "./node_modules/style-loader/lib/urls.js":
/***/ (function(module, exports) {


/**
 * When source maps are enabled, `style-loader` uses a link element with a data-uri to
 * embed the css on the page. This breaks all relative urls because now they are relative to a
 * bundle instead of the current page.
 *
 * One solution is to only use full urls, but that may be impossible.
 *
 * Instead, this function "fixes" the relative urls to be absolute according to the current page location.
 *
 * A rudimentary test suite is located at `test/fixUrls.js` and can be run via the `npm test` command.
 *
 */

module.exports = function (css) {
  // get current location
  var location = typeof window !== "undefined" && window.location;

  if (!location) {
    throw new Error("fixUrls requires window.location");
  }

	// blank or null?
	if (!css || typeof css !== "string") {
	  return css;
  }

  var baseUrl = location.protocol + "//" + location.host;
  var currentDir = baseUrl + location.pathname.replace(/\/[^\/]*$/, "/");

	// convert each url(...)
	/*
	This regular expression is just a way to recursively match brackets within
	a string.

	 /url\s*\(  = Match on the word "url" with any whitespace after it and then a parens
	   (  = Start a capturing group
	     (?:  = Start a non-capturing group
	         [^)(]  = Match anything that isn't a parentheses
	         |  = OR
	         \(  = Match a start parentheses
	             (?:  = Start another non-capturing groups
	                 [^)(]+  = Match anything that isn't a parentheses
	                 |  = OR
	                 \(  = Match a start parentheses
	                     [^)(]*  = Match anything that isn't a parentheses
	                 \)  = Match a end parentheses
	             )  = End Group
              *\) = Match anything and then a close parens
          )  = Close non-capturing group
          *  = Match anything
       )  = Close capturing group
	 \)  = Match a close parens

	 /gi  = Get all matches, not the first.  Be case insensitive.
	 */
	var fixedCss = css.replace(/url\s*\(((?:[^)(]|\((?:[^)(]+|\([^)(]*\))*\))*)\)/gi, function(fullMatch, origUrl) {
		// strip quotes (if they exist)
		var unquotedOrigUrl = origUrl
			.trim()
			.replace(/^"(.*)"$/, function(o, $1){ return $1; })
			.replace(/^'(.*)'$/, function(o, $1){ return $1; });

		// already a full url? no change
		if (/^(#|data:|http:\/\/|https:\/\/|file:\/\/\/|\s*$)/i.test(unquotedOrigUrl)) {
		  return fullMatch;
		}

		// convert the url to a full url
		var newUrl;

		if (unquotedOrigUrl.indexOf("//") === 0) {
		  	//TODO: should we add protocol?
			newUrl = unquotedOrigUrl;
		} else if (unquotedOrigUrl.indexOf("/") === 0) {
			// path should be relative to the base url
			newUrl = baseUrl + unquotedOrigUrl; // already starts with '/'
		} else {
			// path should be relative to current directory
			newUrl = currentDir + unquotedOrigUrl.replace(/^\.\//, ""); // Strip leading './'
		}

		// send back the fixed url(...)
		return "url(" + JSON.stringify(newUrl) + ")";
	});

	// send back the fixed css
	return fixedCss;
};


/***/ }),

/***/ "./src/devtools/TestDevice.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__("../index");
const Messages = __webpack_require__("../index");
class TestDevice extends index_1.ButtplugDevice {
    constructor(name, shouldVibrate = false, shouldLinear = false, shouldRotate = false) {
        super(`Test Device - ${name}`, "TestDevice" + (shouldVibrate ? "Vibrate" : "") + (shouldLinear ? "Linear" : ""));
        this._connected = false;
        this._linearSpeed = 0;
        this._linearPosition = 0;
        this._vibrateSpeed = 0;
        this._rotateSpeed = 0;
        this._rotateClockwise = false;
        this.HandleStopDeviceCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (this.MsgFuncs.has(Messages.VibrateCmd)) {
                this.emit("vibrate", 0);
            }
            else if (this.MsgFuncs.has(Messages.LinearCmd)) {
                this.emit("linear", { position: this._linearPosition,
                    speed: this._linearSpeed });
            }
            return Promise.resolve(new Messages.Ok(aMsg.Id));
        });
        this.HandleSingleMotorVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            this._vibrateSpeed = aMsg.Speed;
            this.emit("vibrate", aMsg.Speed);
            return Promise.resolve(new Messages.Ok(aMsg.Id));
        });
        this.HandleVibrateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            return this.HandleSingleMotorVibrateCmd(new index_1.SingleMotorVibrateCmd(aMsg.Speeds[0].Speed, aMsg.DeviceIndex, aMsg.Id));
        });
        this.HandleRotateCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            this._rotateSpeed = aMsg.Rotations[0].Speed;
            this._rotateClockwise = aMsg.Rotations[0].Clockwise;
            this.emit("vibrate", { speed: this._rotateSpeed,
                clockwise: this._rotateClockwise });
            return Promise.resolve(new Messages.Ok(aMsg.Id));
        });
        this.HandleFleshlightLaunchFW12Cmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            this._linearPosition = aMsg.Position;
            this._linearSpeed = aMsg.Speed;
            this.emit("linear", { position: this._linearPosition,
                speed: this._linearSpeed });
            return Promise.resolve(new Messages.Ok(aMsg.Id));
        });
        this.HandleLinearCmd = (aMsg) => __awaiter(this, void 0, void 0, function* () {
            if (aMsg.Vectors.length !== 1) {
                return new Messages.Error("LinearCmd requires 1 vector for this device.", Messages.ErrorClass.ERROR_DEVICE, aMsg.Id);
            }
            // Move between 5/95, otherwise we'll allow the device to smack into hard
            // stops because of braindead firmware.
            const range = 90;
            const vector = aMsg.Vectors[0];
            const currentPosition = vector.Position * 100;
            const positionDelta = Math.abs(currentPosition - this._linearPosition);
            let speed = Math.floor(25000 * Math.pow(((vector.Duration * 90) / positionDelta), -1.05));
            // Clamp speed on 0 <= x <= 95 so we don't break the launch.
            speed = Math.min(Math.max(speed, 0), 95);
            const positionGoal = Math.floor(((currentPosition / 99) * range) + ((99 - range) / 2));
            // We'll set this._lastPosition in FleshlightLaunchFW12Cmd, since
            // everything kinda funnels to that.
            return yield this.HandleFleshlightLaunchFW12Cmd(new Messages.FleshlightLaunchFW12Cmd(speed, positionGoal, aMsg.DeviceIndex, aMsg.Id));
        });
        this.MsgFuncs.set(Messages.StopDeviceCmd, this.HandleStopDeviceCmd);
        if (shouldVibrate) {
            this.MsgFuncs.set(Messages.SingleMotorVibrateCmd, this.HandleSingleMotorVibrateCmd);
            this.MsgFuncs.set(Messages.VibrateCmd, this.HandleVibrateCmd);
        }
        if (shouldLinear) {
            this.MsgFuncs.set(Messages.FleshlightLaunchFW12Cmd, this.HandleFleshlightLaunchFW12Cmd);
            this.MsgFuncs.set(Messages.LinearCmd, this.HandleLinearCmd);
        }
        if (shouldRotate) {
            this.MsgFuncs.set(Messages.RotateCmd, this.HandleRotateCmd);
        }
    }
    get Connected() {
        return this._connected;
    }
    set Connected(connected) {
        this._connected = connected;
    }
    get MessageSpecifications() {
        if (this.MsgFuncs.has(Messages.VibrateCmd)) {
            return {
                VibrateCmd: { FeatureCount: 2 },
                SingleMotorVibrateCmd: {},
                StopDeviceCmd: {},
            };
        }
        else if (this.MsgFuncs.has(Messages.LinearCmd)) {
            return {
                LinearCmd: { FeatureCount: 1 },
                FleshlightLaunchFW12Cmd: {},
                StopDeviceCmd: {},
            };
        }
        else if (this.MsgFuncs.has(Messages.RotateCmd)) {
            return {
                RotateCmd: { FeatureCount: 1 },
                StopDeviceCmd: {},
            };
        }
        return {};
    }
    Disconnect() {
        this._connected = false;
        this.emit("deviceremoved", this);
    }
}
exports.TestDevice = TestDevice;


/***/ }),

/***/ "./src/devtools/TestDeviceManager.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const events_1 = __webpack_require__("./node_modules/events/events.js");
const TestDevice_1 = __webpack_require__("./src/devtools/TestDevice.ts");
const index_1 = __webpack_require__("../index");
class TestDeviceManager extends events_1.EventEmitter {
    constructor() {
        super();
        this._logger = index_1.ButtplugLogger.Logger;
        this._isScanning = false;
        this._testVibrationDevice = new TestDevice_1.TestDevice("Test Vibration Device", true, false, false);
        this._testLinearDevice = new TestDevice_1.TestDevice("Test Linear Device", false, true, false);
        this._testRotationDevice = new TestDevice_1.TestDevice("Test Rotation Device", false, false, true);
    }
    SetLogger(aLogger) {
        this._logger = aLogger;
    }
    ConnectVibrationDevice() {
        this._logger.Debug("TestDeviceManager: Connecting Vibration Device");
        this._testVibrationDevice.Connected = true;
        this.emit("deviceadded", this._testVibrationDevice);
    }
    ConnectLinearDevice() {
        this._logger.Debug("TestDeviceManager: Connecting Linear Device");
        this._testLinearDevice.Connected = true;
        this.emit("deviceadded", this._testLinearDevice);
    }
    ConnectRotationDevice() {
        this._logger.Debug("TestDeviceManager: Connecting Rotation Device");
        this._testRotationDevice.Connected = true;
        this.emit("deviceadded", this._testRotationDevice);
    }
    StartScanning() {
        this._logger.Debug("TestDeviceManager: Starting Scan");
        this._isScanning = true;
        // Always emit devices. If they're duplicates, the device manager will weed
        // them out.
        setTimeout(() => {
            this.ConnectVibrationDevice();
            this.ConnectLinearDevice();
            this.ConnectRotationDevice();
        }, 50);
        setTimeout(() => this.StopScanning(), 100);
    }
    get VibrationDevice() {
        return this._testVibrationDevice;
    }
    get LinearDevice() {
        return this._testLinearDevice;
    }
    get RotationDevice() {
        return this._testRotationDevice;
    }
    StopScanning() {
        this._logger.Debug("TestDeviceManager: Stopping Scan");
        this._isScanning = false;
        this.emit("scanningfinished");
    }
    get IsScanning() {
        return this._isScanning;
    }
}
exports.TestDeviceManager = TestDeviceManager;


/***/ }),

/***/ "./src/devtools/utils.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__("../index");
const TestDeviceManager_1 = __webpack_require__("./src/devtools/TestDeviceManager.ts");
function CreateDevToolsClient() {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new index_1.ButtplugClient("Test Client");
        const server = new index_1.ButtplugServer("Test Server");
        server.ClearDeviceManagers();
        server.AddDeviceManager(new TestDeviceManager_1.TestDeviceManager());
        const localConnector = new index_1.ButtplugEmbeddedServerConnector();
        localConnector.Server = server;
        yield client.Connect(localConnector);
        return Promise.resolve(client);
    });
}
exports.CreateDevToolsClient = CreateDevToolsClient;


/***/ }),

/***/ "./src/devtools/web/LogPanel.css":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("./node_modules/css-loader/index.js!./src/devtools/web/LogPanel.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/devtools/web/LogPanel.html":
/***/ (function(module, exports) {

module.exports = "<div id=\"buttplugdevtoolslogpanel\">\n  <textarea id=\"buttplugdevtoolslogtextarea\" readonly></textarea>\n  <div id=\"buttplugdevtoolsloglevel\">\n    <label>Panel Log Level:</label>\n    <select id=\"buttplugdevtoolsloglevelpanelselect\">\n      <option value=\"Off\">Off</option>\n      <option value=\"Fatal\">Fatal</option>\n      <option value=\"Error\">Error</option>\n      <option value=\"Warn\">Warn</option>\n      <option value=\"Info\">Info</option>\n      <option value=\"Debug\" selected>Debug</option>\n      <option value=\"Trace\">Trace</option>\n    </select>\n    <label>Console Log Level:</label>\n    <select id=\"buttplugdevtoolsloglevelconsoleselect\">\n      <option value=\"Off\" selected>Off</option>\n      <option value=\"Fatal\">Fatal</option>\n      <option value=\"Error\">Error</option>\n      <option value=\"Warn\">Warn</option>\n      <option value=\"Info\">Info</option>\n      <option value=\"Debug\">Debug</option>\n      <option value=\"Trace\">Trace</option>\n    </select>\n  </div>\n</div>\n";

/***/ }),

/***/ "./src/devtools/web/LogPanel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__("../index");
const jsPanel = __webpack_require__("./node_modules/jspanel4/es6module/jspanel.min.js");
__webpack_require__("./node_modules/jspanel4/dist/jspanel.css");
const logPanelHTML = __webpack_require__("./src/devtools/web/LogPanel.html").toString();
__webpack_require__("./src/devtools/web/LogPanel.css");
class LogPanel {
    constructor() {
        this.logTextArea = document.getElementById("buttplugdevtoolslogtextarea");
        this.panelLevelSelect = document.getElementById("buttplugdevtoolsloglevelpanelselect");
        this.consoleLevelSelect = document.getElementById("buttplugdevtoolsloglevelconsoleselect");
        const log = index_1.ButtplugLogger.Logger;
        log.addListener("log", (msg) => {
            this.addLogMessage(msg);
        });
        this.panelLevelSelect.addEventListener("change", () => {
            log.MaximumEventLogLevel = index_1.ButtplugLogLevel[this.panelLevelSelect.value];
        });
        this.consoleLevelSelect.addEventListener("change", () => {
            log.MaximumConsoleLogLevel = index_1.ButtplugLogLevel[this.consoleLevelSelect.value];
        });
        log.MaximumEventLogLevel = index_1.ButtplugLogLevel.Debug;
        log.Debug("LogPanel: DevTools Log panel enabled.");
    }
    static ShowLogPanel() {
        jsPanel.jsPanel.create({
            id: () => "buttplug-logger-panel",
            theme: "primary",
            headerTitle: "Buttplug Log",
            position: "center-top 0 80",
            contentSize: "650 250",
            callback() {
                this.content.innerHTML = logPanelHTML;
                LogPanel._panel = new LogPanel();
            },
        });
    }
    addLogMessage(msg) {
        this.logTextArea.value = this.logTextArea.value + "\n" + msg.FormattedMessage;
    }
}
LogPanel._panel = null;
exports.LogPanel = LogPanel;


/***/ }),

/***/ "./src/devtools/web/TestDeviceManagerPanel.css":
/***/ (function(module, exports, __webpack_require__) {


var content = __webpack_require__("./node_modules/css-loader/index.js!./src/devtools/web/TestDeviceManagerPanel.css");

if(typeof content === 'string') content = [[module.i, content, '']];

var transform;
var insertInto;



var options = {"hmr":true}

options.transform = transform
options.insertInto = undefined;

var update = __webpack_require__("./node_modules/style-loader/lib/addStyles.js")(content, options);

if(content.locals) module.exports = content.locals;

if(false) {}

/***/ }),

/***/ "./src/devtools/web/TestDeviceManagerPanel.html":
/***/ (function(module, exports, __webpack_require__) {

module.exports = "<buttplug-devtools-main>\n  <input id=\"tab1\" type=\"radio\" name=\"tabs\" checked>\n  <label for=\"tab1\">Test Devices</label>\n  <section id=\"content1\">\n    <div id=\"simulator\">\n      <div class=\"vibrator-simulator-component\">\n        <div class=\"vibrator\">\n          <img src=\"" + __webpack_require__("./src/devtools/web/hush.png") + "\"\n               id=\"vibrator-image\">\n        </div>\n        <div id=\"vibrator-info\">\n          <b>Speed:</b> <span id=\"vibrationspeed\">0</span><br/>\n          <button id=\"vibratedisconnect\">Disconnect</button>\n        </div>\n      </div>\n      <div class=\"simulator-divider\"></div>\n      <div class=\"fleshlight-sim\">\n        <div class=\"c-fleshlight\">\n          <div>\n            <img src=\"" + __webpack_require__("./src/devtools/web/ruler.png") + "\">\n          </div>\n          <div>\n            <img src=\"" + __webpack_require__("./src/devtools/web/fleshlight.png") + "\"\n                 class=\"o-fleshlight\"\n                 id=\"fleshlight-image\">\n          </div>\n        </div>\n        <div>\n          <b>Speed:</b> <span id=\"linearspeed\">0</span><br/>\n          <b>Position:</b> <span id=\"linearposition\">0</span><br/>\n          <button id=\"lineardisconnect\">Disconnect</button>\n        </div>\n      </div>\n    </div>\n  </section>\n</buttplug-devtools-main>\n";

/***/ }),

/***/ "./src/devtools/web/TestDeviceManagerPanel.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = __webpack_require__("../index");
const TWEEN = __webpack_require__("./node_modules/@tweenjs/tween.js/src/Tween.js");
const jsPanel = __webpack_require__("./node_modules/jspanel4/es6module/jspanel.min.js");
__webpack_require__("./node_modules/jspanel4/dist/jspanel.css");
const testPanelHTML = __webpack_require__("./src/devtools/web/TestDeviceManagerPanel.html").toString();
__webpack_require__("./src/devtools/web/TestDeviceManagerPanel.css");
class TestDeviceManagerPanel {
    constructor(tdm) {
        this.vibratorTween = null;
        this.launchTween = null;
        this.currentLaunchPosition = { x: 0, y: 0 };
        this.lastPosition = 0;
        this.moveRadius = 0;
        this.currentVibratePosition = { x: 0, y: 0 };
        this.elementObserver = null;
        this.hasRAFBeenCalled = false;
        this.requestAnimate = () => {
            if (this.hasRAFBeenCalled) {
                return;
            }
            this.hasRAFBeenCalled = true;
            requestAnimationFrame(this.animate);
        };
        this.animate = (currentTime) => {
            this.hasRAFBeenCalled = false;
            if (this.vibratorTween && !this.vibratorTween.update(currentTime)) {
                if (this.moveRadius !== 0) {
                    this.vibrateMove(this.moveRadius);
                }
                else {
                    this.vibratorTween = null;
                }
            }
            if (this.launchTween && !this.launchTween.update(currentTime)) {
                this.launchTween = null;
            }
            else {
                this.requestAnimate();
            }
            this.vibratorElement.style.top = `${this.currentVibratePosition.x}px`;
            this.vibratorElement.style.right = `${this.currentVibratePosition.y}px`;
            this.fleshlightElement.style.bottom = `${this.currentLaunchPosition.y}%`;
        };
        this.launchMove = (position, speed) => {
            const p = -((100 - position) * 0.22);
            const duration = this.moveDuration(position, speed);
            this.launchTween = new TWEEN.Tween(this.currentLaunchPosition)
                .to({ x: 0, y: p }, duration)
                .start();
            this.requestAnimate();
        };
        // moveDuration returns the time in milliseconds it will take to move
        // to position at speed.
        //
        // position: position in percent (0-100).
        // speed:    speed in percent (20-100).
        this.moveDuration = (position, speed) => {
            const distance = Math.abs(position - this.lastPosition);
            this.lastPosition = position;
            return this.calcDuration(distance, speed);
        };
        // _calcDuration returns duration of a move in milliseconds for a given
        // distance/speed.
        //
        // distance: amount to move percent (0-100).
        // speed: speed to move at in percent (20-100).
        this.calcDuration = (distance, speed) => {
            return Math.pow(speed / 25000, -0.95) / (90 / distance);
        };
        this.vibrateMove = (speed) => {
            this.moveRadius = speed;
            this.vibratorTween = new TWEEN.Tween(this.currentVibratePosition)
                .to({ x: Math.floor(Math.random() * this.moveRadius * 20),
                y: Math.floor(Math.random() * this.moveRadius * 20) }, 34)
                .start();
            this.requestAnimate();
        };
        this._testManager = tdm;
        document.getElementById("vibratedisconnect").addEventListener("click", () => {
            this._testManager.VibrationDevice.Disconnect();
        });
        document.getElementById("lineardisconnect").addEventListener("click", () => {
            this._testManager.LinearDevice.Disconnect();
        });
        const speedHandler = (speed) => {
            document.getElementById("vibrationspeed").innerHTML = (speed * 100).toFixed(1);
            this.vibrateMove(speed);
        };
        this._testManager.VibrationDevice.addListener("vibrate", speedHandler);
        const positionHandler = (linearobj) => {
            document.getElementById("linearposition").innerHTML = (linearobj.position);
            document.getElementById("linearspeed").innerHTML = (linearobj.speed);
            this.launchMove(linearobj.position, linearobj.speed);
        };
        this._testManager.LinearDevice.addListener("linear", positionHandler);
        this.fleshlightElement = document.getElementById("fleshlight-image");
        this.vibratorElement = document.getElementById("vibrator-image");
        // After the node has been created, attach a mutation observer to disconnect
        // events when the panel is closed, otherwise we'll get events going to
        // elements that no longer exist.
        process.nextTick(() => {
            const el = document.getElementById("buttplug-test-device-manager-panel");
            if (!el) {
                return;
            }
            const observer = new MutationObserver((mutations) => {
                if (!document.getElementById("buttplug-test-device-manager-panel")) {
                    this._testManager.VibrationDevice.removeListener("vibrate", speedHandler);
                    this._testManager.LinearDevice.removeListener("linear", positionHandler);
                    observer.disconnect();
                }
            });
            observer.observe(el.parentNode, { childList: true });
        });
    }
    static ShowTestDeviceManagerPanel(buttplugServer) {
        let tdm = null;
        for (const mgr of buttplugServer.DeviceManagers) {
            if (mgr.constructor.name === "TestDeviceManager") {
                tdm = mgr;
                break;
            }
        }
        if (tdm === null) {
            index_1.ButtplugLogger.Logger.Error("TestDeviceManagerPanel: Cannot get test device manager from server.");
            throw new Error("Cannot get test device manager from server.");
        }
        jsPanel.jsPanel.create({
            id: () => "buttplug-test-device-manager-panel",
            theme: "primary",
            headerTitle: "Test Device Manager",
            position: "center-top 0 80",
            contentSize: "400 250",
            callback() {
                this.content.innerHTML = testPanelHTML;
                TestDeviceManagerPanel._panel = new TestDeviceManagerPanel(tdm);
            },
        });
    }
}
exports.TestDeviceManagerPanel = TestDeviceManagerPanel;
// Some code in this file taken from https://github.com/funjack/launchcontrol
// MIT License:
/*
  Lauchcontrol UI Fleshlight

  https://github.com/funjack/launchcontrol

  Copyright 2017 Funjack

  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:

  1. Redistributions of source code must retain the above copyright notice, this
  list of conditions and the following disclaimer.

  2. Redistributions in binary form must reproduce the above copyright notice,
  this list of conditions and the following disclaimer in the documentation
  and/or other materials provided with the distribution.

  3. Neither the name of the copyright holder nor the names of its contributors
  may be used to endorse or promote products derived from this software without
  specific prior written permission.

  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
  ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
  DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
  FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
  DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
  SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
  CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
  OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
  OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("./node_modules/process/browser.js")))

/***/ }),

/***/ "./src/devtools/web/fleshlight.png":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADQAAABnCAYAAABPYmGyAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QQeCycTBqT4sQAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAANJSURBVHja7Zy/b5tAFMffIdShaTdLjp2tktm68A9075oBpkqZ+wf0b+gf0NlSJjx4zZ7Vw0lWNyN1S1xLWVDVJbJ5HexLAPPjOLgDu+87hRjfvQ/vF3eQMGgmBD1ixr8oYHzfBwCA1WqV+nCz/l365cvxKHU8mUwAACAIgka22aowAqRtiXGDIEAVKAvOTATUrILgeQGxnJRAxNMEQkQjHrKNeYfp945RIFnIrjoyGks7Ux7KNtayOwVEPPLGcHSZOnYcJ3WcuGOgPnSSudI6kGpI6B5bBQh93wff92tPXOQpy7JSMGJ8leKjtWw/rB9zf381GqeO4zjuR9lOVrpsleOcHxmeBHVdt7DKNVkTKedQ2XqoDEZ4iHMOu92u9tjGqxzn/Ojq58l1XVgul2DbNth2e5FvdQGThFosFrTAIyBqrC3DNGmsZxdyKvWSHfbMQMfeXMbz/WisbUBRlSMg6kPUh6gPUR+iPkRlm4CoD1Efoj5EfYiqHAEREDVWaqzUWKmxnnZjzT5fravtdtt4jMZFIU+u6wLnXHqgsid+VBQUkw49z0u9QJEXKsJLZY/1hUezchwn9R7dbDarZaelI3dkn4LryEdtb5JcjcbSb5J03Yekr6Sq4WEYvrxpr7MooOd55pL7kKeHOVFrDlV5p+rvHmTOUc2l/3b5YDTcshJhF/z89uGsPOR//P7LOJBM/qicSzlEQAREQN0DqVSttisdeYiACMgwUBiGrSd30XeL5iIPEdAJAWHXi7vsIq9qf6Fs1wfFrs1hsw+6AhPzC3se1o+F/5qAyQAJFe2zJSdTVZ2xD+fWBhIuljK2zCAZ1Zyj0G4pD4mBdO54yoBk7GF1c+jo6vUl5MpEIdf3kKvloa5DTsZDVTnEcDpHdnNdabTOkIuiCOI4BpzOgd1cM9XGur+TGA4A7+4BNk8gwITevb1ozUNRFBV+9ufH7f6H4UDc3cSqQK9fHA4Ap/PCE99//dII6MXoPO1Bjm1SALooGRhg8yRnkIqyc73qDQA8qwL9rT1pArKh4UV6buKhNq+sEUk9Lse7e4QeiH3+VGkvrVj7Luk3NLoOO5lwqwXUFZgsiDKQSai6MMpAusFUQFoBahusCYjQPxjiryCopLWbAAAAAElFTkSuQmCC"

/***/ }),

/***/ "./src/devtools/web/hush.png":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./src/devtools/web/index.web.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
Object.defineProperty(exports, "__esModule", { value: true });
__export(__webpack_require__("./src/devtools/TestDevice.ts"));
__export(__webpack_require__("./src/devtools/TestDeviceManager.ts"));
__export(__webpack_require__("./src/devtools/utils.ts"));
__export(__webpack_require__("./src/devtools/web/LogPanel.ts"));
__export(__webpack_require__("./src/devtools/web/TestDeviceManagerPanel.ts"));
__export(__webpack_require__("./src/devtools/web/utils.web.ts"));


/***/ }),

/***/ "./src/devtools/web/ruler.png":
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAACFCAYAAACT3zI9AAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4QQeCh4AjVxe4gAAABl0RVh0Q29tbWVudABDcmVhdGVkIHdpdGggR0lNUFeBDhcAAAA+SURBVEjHY2RgYPjPgAVgCDJhU8WES/UI0M6IppJxNOjIDToybR8VHBUcMoKjaX5UcDTNj1aRo62LAWldAAC8EC2tAEBYXAAAAABJRU5ErkJggg=="

/***/ }),

/***/ "./src/devtools/web/utils.web.ts":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const TestDeviceManagerPanel_1 = __webpack_require__("./src/devtools/web/TestDeviceManagerPanel.ts");
const LogPanel_1 = __webpack_require__("./src/devtools/web/LogPanel.ts");
function CreateLoggerPanel() {
    LogPanel_1.LogPanel.ShowLogPanel();
}
exports.CreateLoggerPanel = CreateLoggerPanel;
function CreateDeviceManagerPanel(buttplugServer) {
    TestDeviceManagerPanel_1.TestDeviceManagerPanel.ShowTestDeviceManagerPanel(buttplugServer);
}
exports.CreateDeviceManagerPanel = CreateDeviceManagerPanel;
function RemoveDeviceManagerPanel() {
    const el = document.getElementById("buttplug-test-device-manager-panel");
    if (!el || !el.parentNode) {
        return;
    }
    el.parentNode.removeChild(el);
}
exports.RemoveDeviceManagerPanel = RemoveDeviceManagerPanel;


/***/ })

/******/ });
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvZXh0ZXJuYWwgXCJCdXR0cGx1Z1wiIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9ub2RlX21vZHVsZXMvQHR3ZWVuanMvdHdlZW4uanMvc3JjL1R3ZWVuLmpzIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzPzM2MWEiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9lczZtb2R1bGUvanNwYW5lbC5taW4uanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL1Rlc3REZXZpY2UudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy9UZXN0RGV2aWNlTWFuYWdlci50cyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3V0aWxzLnRzIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmNzcz9hZmE2Iiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3M/ZDFmYyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC50cyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9mbGVzaGxpZ2h0LnBuZyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9odXNoLnBuZyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9pbmRleC53ZWIudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvcnVsZXIucG5nIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL3V0aWxzLndlYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7QUNsRkEsMEI7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVILEVBQUU7O0FBRUY7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHFCQUFxQjs7QUFFdkM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QztBQUN2Qzs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBLGdFQUFnRSxzQkFBc0I7QUFDdEY7QUFDQTs7QUFFQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTs7QUFFQSxrRUFBa0Usc0JBQXNCO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7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LGNBQWM7O0FBRWxFO0FBQ0E7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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QUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBLGNBQWMsbUJBQU8sQ0FBQyx5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OztBQ0w1QixpQ0FBaUMsd1M7Ozs7Ozs7Ozs7QUNBakMscUdBQWtFO0FBQ2xFLHlFQUFzQztBQUd0QyxTQUFnQixpQkFBaUI7SUFDL0IsbUJBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQztBQUMxQixDQUFDO0FBRkQsOENBRUM7QUFFRCxTQUFnQix3QkFBd0IsQ0FBQyxjQUE4QjtJQUNyRSwrQ0FBc0IsQ0FBQywwQkFBMEIsQ0FBQyxjQUFjLENBQUMsQ0FBQztBQUNwRSxDQUFDO0FBRkQsNERBRUM7QUFFRCxTQUFnQix3QkFBd0I7SUFDdEMsTUFBTSxFQUFFLEdBQUcsUUFBUSxDQUFDLGNBQWMsQ0FBQyxvQ0FBb0MsQ0FBQyxDQUFDO0lBQ3pFLElBQUksQ0FBQyxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUMsVUFBVSxFQUFFO1FBQ3pCLE9BQU87S0FDUjtJQUNELEVBQUUsQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDO0FBQ2hDLENBQUM7QUFORCw0REFNQyIsImZpbGUiOiJidXR0cGx1Zy1kZXZ0b29scy5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImJ1dHRwbHVnLWRldnRvb2xzLWNvbW1vbmpzXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIkJ1dHRwbHVnRGV2VG9vbHNcIl0gPSBmYWN0b3J5KCk7XG59KSh3aW5kb3csIGZ1bmN0aW9uKCkge1xucmV0dXJuICIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSBcIi4vc3JjL2RldnRvb2xzL3dlYi9pbmRleC53ZWIudHNcIik7XG4iLCJtb2R1bGUuZXhwb3J0cyA9IEJ1dHRwbHVnOyIsIi8qKlxuICogVHdlZW4uanMgLSBMaWNlbnNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzXG4gKiAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4gKlxuICogU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS90d2VlbmpzL3R3ZWVuLmpzL2dyYXBocy9jb250cmlidXRvcnMgZm9yIHRoZSBmdWxsIGxpc3Qgb2YgY29udHJpYnV0b3JzLlxuICogVGhhbmsgeW91IGFsbCwgeW91J3JlIGF3ZXNvbWUhXG4gKi9cblxuXG52YXIgX0dyb3VwID0gZnVuY3Rpb24gKCkge1xuXHR0aGlzLl90d2VlbnMgPSB7fTtcblx0dGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUgPSB7fTtcbn07XG5cbl9Hcm91cC5wcm90b3R5cGUgPSB7XG5cdGdldEFsbDogZnVuY3Rpb24gKCkge1xuXG5cdFx0cmV0dXJuIE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucykubWFwKGZ1bmN0aW9uICh0d2VlbklkKSB7XG5cdFx0XHRyZXR1cm4gdGhpcy5fdHdlZW5zW3R3ZWVuSWRdO1xuXHRcdH0uYmluZCh0aGlzKSk7XG5cblx0fSxcblxuXHRyZW1vdmVBbGw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHRoaXMuX3R3ZWVucyA9IHt9O1xuXG5cdH0sXG5cblx0YWRkOiBmdW5jdGlvbiAodHdlZW4pIHtcblxuXHRcdHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xuXHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldID0gdHdlZW47XG5cblx0fSxcblxuXHRyZW1vdmU6IGZ1bmN0aW9uICh0d2Vlbikge1xuXG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbi5nZXRJZCgpXTtcblx0XHRkZWxldGUgdGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGVbdHdlZW4uZ2V0SWQoKV07XG5cblx0fSxcblxuXHR1cGRhdGU6IGZ1bmN0aW9uICh0aW1lLCBwcmVzZXJ2ZSkge1xuXG5cdFx0dmFyIHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zKTtcblxuXHRcdGlmICh0d2Vlbklkcy5sZW5ndGggPT09IDApIHtcblx0XHRcdHJldHVybiBmYWxzZTtcblx0XHR9XG5cblx0XHR0aW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdGltZSA6IFRXRUVOLm5vdygpO1xuXG5cdFx0Ly8gVHdlZW5zIGFyZSB1cGRhdGVkIGluIFwiYmF0Y2hlc1wiLiBJZiB5b3UgYWRkIGEgbmV3IHR3ZWVuIGR1cmluZyBhbiB1cGRhdGUsIHRoZW4gdGhlXG5cdFx0Ly8gbmV3IHR3ZWVuIHdpbGwgYmUgdXBkYXRlZCBpbiB0aGUgbmV4dCBiYXRjaC5cblx0XHQvLyBJZiB5b3UgcmVtb3ZlIGEgdHdlZW4gZHVyaW5nIGFuIHVwZGF0ZSwgaXQgbWF5IG9yIG1heSBub3QgYmUgdXBkYXRlZC4gSG93ZXZlcixcblx0XHQvLyBpZiB0aGUgcmVtb3ZlZCB0d2VlbiB3YXMgYWRkZWQgZHVyaW5nIHRoZSBjdXJyZW50IGJhdGNoLCB0aGVuIGl0IHdpbGwgbm90IGJlIHVwZGF0ZWQuXG5cdFx0d2hpbGUgKHR3ZWVuSWRzLmxlbmd0aCA+IDApIHtcblx0XHRcdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XG5cblx0XHRcdGZvciAodmFyIGkgPSAwOyBpIDwgdHdlZW5JZHMubGVuZ3RoOyBpKyspIHtcblxuXHRcdFx0XHR2YXIgdHdlZW4gPSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xuXG5cdFx0XHRcdGlmICh0d2VlbiAmJiB0d2Vlbi51cGRhdGUodGltZSkgPT09IGZhbHNlKSB7XG5cdFx0XHRcdFx0dHdlZW4uX2lzUGxheWluZyA9IGZhbHNlO1xuXG5cdFx0XHRcdFx0aWYgKCFwcmVzZXJ2ZSkge1xuXHRcdFx0XHRcdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc1t0d2Vlbklkc1tpXV07XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cblx0XHRcdHR3ZWVuSWRzID0gT2JqZWN0LmtleXModGhpcy5fdHdlZW5zQWRkZWREdXJpbmdVcGRhdGUpO1xuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH1cbn07XG5cbnZhciBUV0VFTiA9IG5ldyBfR3JvdXAoKTtcblxuVFdFRU4uR3JvdXAgPSBfR3JvdXA7XG5UV0VFTi5fbmV4dElkID0gMDtcblRXRUVOLm5leHRJZCA9IGZ1bmN0aW9uICgpIHtcblx0cmV0dXJuIFRXRUVOLl9uZXh0SWQrKztcbn07XG5cblxuLy8gSW5jbHVkZSBhIHBlcmZvcm1hbmNlLm5vdyBwb2x5ZmlsbC5cbi8vIEluIG5vZGUuanMsIHVzZSBwcm9jZXNzLmhydGltZS5cbmlmICh0eXBlb2YgKHdpbmRvdykgPT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiAocHJvY2VzcykgIT09ICd1bmRlZmluZWQnKSB7XG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcblx0XHR2YXIgdGltZSA9IHByb2Nlc3MuaHJ0aW1lKCk7XG5cblx0XHQvLyBDb252ZXJ0IFtzZWNvbmRzLCBuYW5vc2Vjb25kc10gdG8gbWlsbGlzZWNvbmRzLlxuXHRcdHJldHVybiB0aW1lWzBdICogMTAwMCArIHRpbWVbMV0gLyAxMDAwMDAwO1xuXHR9O1xufVxuLy8gSW4gYSBicm93c2VyLCB1c2Ugd2luZG93LnBlcmZvcm1hbmNlLm5vdyBpZiBpdCBpcyBhdmFpbGFibGUuXG5lbHNlIGlmICh0eXBlb2YgKHdpbmRvdykgIT09ICd1bmRlZmluZWQnICYmXG4gICAgICAgICB3aW5kb3cucGVyZm9ybWFuY2UgIT09IHVuZGVmaW5lZCAmJlxuXHRcdCB3aW5kb3cucGVyZm9ybWFuY2Uubm93ICE9PSB1bmRlZmluZWQpIHtcblx0Ly8gVGhpcyBtdXN0IGJlIGJvdW5kLCBiZWNhdXNlIGRpcmVjdGx5IGFzc2lnbmluZyB0aGlzIGZ1bmN0aW9uXG5cdC8vIGxlYWRzIHRvIGFuIGludm9jYXRpb24gZXhjZXB0aW9uIGluIENocm9tZS5cblx0VFdFRU4ubm93ID0gd2luZG93LnBlcmZvcm1hbmNlLm5vdy5iaW5kKHdpbmRvdy5wZXJmb3JtYW5jZSk7XG59XG4vLyBVc2UgRGF0ZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAoRGF0ZS5ub3cgIT09IHVuZGVmaW5lZCkge1xuXHRUV0VFTi5ub3cgPSBEYXRlLm5vdztcbn1cbi8vIE90aGVyd2lzZSwgdXNlICduZXcgRGF0ZSgpLmdldFRpbWUoKScuXG5lbHNlIHtcblx0VFdFRU4ubm93ID0gZnVuY3Rpb24gKCkge1xuXHRcdHJldHVybiBuZXcgRGF0ZSgpLmdldFRpbWUoKTtcblx0fTtcbn1cblxuXG5UV0VFTi5Ud2VlbiA9IGZ1bmN0aW9uIChvYmplY3QsIGdyb3VwKSB7XG5cdHRoaXMuX29iamVjdCA9IG9iamVjdDtcblx0dGhpcy5fdmFsdWVzU3RhcnQgPSB7fTtcblx0dGhpcy5fdmFsdWVzRW5kID0ge307XG5cdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0ID0ge307XG5cdHRoaXMuX2R1cmF0aW9uID0gMTAwMDtcblx0dGhpcy5fcmVwZWF0ID0gMDtcblx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gdW5kZWZpbmVkO1xuXHR0aGlzLl95b3lvID0gZmFsc2U7XG5cdHRoaXMuX2lzUGxheWluZyA9IGZhbHNlO1xuXHR0aGlzLl9yZXZlcnNlZCA9IGZhbHNlO1xuXHR0aGlzLl9kZWxheVRpbWUgPSAwO1xuXHR0aGlzLl9zdGFydFRpbWUgPSBudWxsO1xuXHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IFRXRUVOLkVhc2luZy5MaW5lYXIuTm9uZTtcblx0dGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5MaW5lYXI7XG5cdHRoaXMuX2NoYWluZWRUd2VlbnMgPSBbXTtcblx0dGhpcy5fb25TdGFydENhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPSBmYWxzZTtcblx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uU3RvcENhbGxiYWNrID0gbnVsbDtcblx0dGhpcy5fZ3JvdXAgPSBncm91cCB8fCBUV0VFTjtcblx0dGhpcy5faWQgPSBUV0VFTi5uZXh0SWQoKTtcblxufTtcblxuVFdFRU4uVHdlZW4ucHJvdG90eXBlID0ge1xuXHRnZXRJZDogZnVuY3Rpb24gZ2V0SWQoKSB7XG5cdFx0cmV0dXJuIHRoaXMuX2lkO1xuXHR9LFxuXG5cdGlzUGxheWluZzogZnVuY3Rpb24gaXNQbGF5aW5nKCkge1xuXHRcdHJldHVybiB0aGlzLl9pc1BsYXlpbmc7XG5cdH0sXG5cblx0dG86IGZ1bmN0aW9uIHRvKHByb3BlcnRpZXMsIGR1cmF0aW9uKSB7XG5cblx0XHR0aGlzLl92YWx1ZXNFbmQgPSBwcm9wZXJ0aWVzO1xuXG5cdFx0aWYgKGR1cmF0aW9uICE9PSB1bmRlZmluZWQpIHtcblx0XHRcdHRoaXMuX2R1cmF0aW9uID0gZHVyYXRpb247XG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdGFydDogZnVuY3Rpb24gc3RhcnQodGltZSkge1xuXG5cdFx0dGhpcy5fZ3JvdXAuYWRkKHRoaXMpO1xuXG5cdFx0dGhpcy5faXNQbGF5aW5nID0gdHJ1ZTtcblxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG5cblx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICE9PSB1bmRlZmluZWQgPyB0eXBlb2YgdGltZSA9PT0gJ3N0cmluZycgPyBUV0VFTi5ub3coKSArIHBhcnNlRmxvYXQodGltZSkgOiB0aW1lIDogVFdFRU4ubm93KCk7XG5cdFx0dGhpcy5fc3RhcnRUaW1lICs9IHRoaXMuX2RlbGF5VGltZTtcblxuXHRcdGZvciAodmFyIHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xuXG5cdFx0XHQvLyBDaGVjayBpZiBhbiBBcnJheSB3YXMgcHJvdmlkZWQgYXMgcHJvcGVydHkgdmFsdWVcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpIHtcblxuXHRcdFx0XHRpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XS5sZW5ndGggPT09IDApIHtcblx0XHRcdFx0XHRjb250aW51ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIENyZWF0ZSBhIGxvY2FsIGNvcHkgb2YgdGhlIEFycmF5IHdpdGggdGhlIHN0YXJ0IHZhbHVlIGF0IHRoZSBmcm9udFxuXHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gW3RoaXMuX29iamVjdFtwcm9wZXJ0eV1dLmNvbmNhdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJZiBgdG8oKWAgc3BlY2lmaWVzIGEgcHJvcGVydHkgdGhhdCBkb2Vzbid0IGV4aXN0IGluIHRoZSBzb3VyY2Ugb2JqZWN0LFxuXHRcdFx0Ly8gd2Ugc2hvdWxkIG5vdCBzZXQgdGhhdCBwcm9wZXJ0eSBpbiB0aGUgb2JqZWN0XG5cdFx0XHRpZiAodGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHQvLyBTYXZlIHRoZSBzdGFydGluZyB2YWx1ZS5cblx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX29iamVjdFtwcm9wZXJ0eV07XG5cblx0XHRcdGlmICgodGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIGluc3RhbmNlb2YgQXJyYXkpID09PSBmYWxzZSkge1xuXHRcdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gKj0gMS4wOyAvLyBFbnN1cmVzIHdlJ3JlIHVzaW5nIG51bWJlcnMsIG5vdCBzdHJpbmdzXG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSB8fCAwO1xuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdG9wOiBmdW5jdGlvbiBzdG9wKCkge1xuXG5cdFx0aWYgKCF0aGlzLl9pc1BsYXlpbmcpIHtcblx0XHRcdHJldHVybiB0aGlzO1xuXHRcdH1cblxuXHRcdHRoaXMuX2dyb3VwLnJlbW92ZSh0aGlzKTtcblx0XHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcblxuXHRcdGlmICh0aGlzLl9vblN0b3BDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHR9XG5cblx0XHR0aGlzLnN0b3BDaGFpbmVkVHdlZW5zKCk7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRlbmQ6IGZ1bmN0aW9uIGVuZCgpIHtcblxuXHRcdHRoaXMudXBkYXRlKHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX2R1cmF0aW9uKTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHN0b3BDaGFpbmVkVHdlZW5zOiBmdW5jdGlvbiBzdG9wQ2hhaW5lZFR3ZWVucygpIHtcblxuXHRcdGZvciAodmFyIGkgPSAwLCBudW1DaGFpbmVkVHdlZW5zID0gdGhpcy5fY2hhaW5lZFR3ZWVucy5sZW5ndGg7IGkgPCBudW1DaGFpbmVkVHdlZW5zOyBpKyspIHtcblx0XHRcdHRoaXMuX2NoYWluZWRUd2VlbnNbaV0uc3RvcCgpO1xuXHRcdH1cblxuXHR9LFxuXG5cdGdyb3VwOiBmdW5jdGlvbiBncm91cChncm91cCkge1xuXHRcdHRoaXMuX2dyb3VwID0gZ3JvdXA7XG5cdFx0cmV0dXJuIHRoaXM7XG5cdH0sXG5cblx0ZGVsYXk6IGZ1bmN0aW9uIGRlbGF5KGFtb3VudCkge1xuXG5cdFx0dGhpcy5fZGVsYXlUaW1lID0gYW1vdW50O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cmVwZWF0OiBmdW5jdGlvbiByZXBlYXQodGltZXMpIHtcblxuXHRcdHRoaXMuX3JlcGVhdCA9IHRpbWVzO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0cmVwZWF0RGVsYXk6IGZ1bmN0aW9uIHJlcGVhdERlbGF5KGFtb3VudCkge1xuXG5cdFx0dGhpcy5fcmVwZWF0RGVsYXlUaW1lID0gYW1vdW50O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0eW95bzogZnVuY3Rpb24geW95byh5eSkge1xuXG5cdFx0dGhpcy5feW95byA9IHl5O1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZWFzaW5nOiBmdW5jdGlvbiBlYXNpbmcoZWFzKSB7XG5cblx0XHR0aGlzLl9lYXNpbmdGdW5jdGlvbiA9IGVhcztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGludGVycG9sYXRpb246IGZ1bmN0aW9uIGludGVycG9sYXRpb24oaW50ZXIpIHtcblxuXHRcdHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IGludGVyO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0Y2hhaW46IGZ1bmN0aW9uIGNoYWluKCkge1xuXG5cdFx0dGhpcy5fY2hhaW5lZFR3ZWVucyA9IGFyZ3VtZW50cztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uU3RhcnQ6IGZ1bmN0aW9uIG9uU3RhcnQoY2FsbGJhY2spIHtcblxuXHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25VcGRhdGU6IGZ1bmN0aW9uIG9uVXBkYXRlKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblVwZGF0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvbkNvbXBsZXRlOiBmdW5jdGlvbiBvbkNvbXBsZXRlKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uU3RvcDogZnVuY3Rpb24gb25TdG9wKGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblN0b3BDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbiB1cGRhdGUodGltZSkge1xuXG5cdFx0dmFyIHByb3BlcnR5O1xuXHRcdHZhciBlbGFwc2VkO1xuXHRcdHZhciB2YWx1ZTtcblxuXHRcdGlmICh0aW1lIDwgdGhpcy5fc3RhcnRUaW1lKSB7XG5cdFx0XHRyZXR1cm4gdHJ1ZTtcblx0XHR9XG5cblx0XHRpZiAodGhpcy5fb25TdGFydENhbGxiYWNrRmlyZWQgPT09IGZhbHNlKSB7XG5cblx0XHRcdGlmICh0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdFx0dGhpcy5fb25TdGFydENhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0XHR9XG5cblx0XHRcdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gdHJ1ZTtcblx0XHR9XG5cblx0XHRlbGFwc2VkID0gKHRpbWUgLSB0aGlzLl9zdGFydFRpbWUpIC8gdGhpcy5fZHVyYXRpb247XG5cdFx0ZWxhcHNlZCA9ICh0aGlzLl9kdXJhdGlvbiA9PT0gMCB8fCBlbGFwc2VkID4gMSkgPyAxIDogZWxhcHNlZDtcblxuXHRcdHZhbHVlID0gdGhpcy5fZWFzaW5nRnVuY3Rpb24oZWxhcHNlZCk7XG5cblx0XHRmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc0VuZCkge1xuXG5cdFx0XHQvLyBEb24ndCB1cGRhdGUgcHJvcGVydGllcyB0aGF0IGRvIG5vdCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdFxuXHRcdFx0aWYgKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdGNvbnRpbnVlO1xuXHRcdFx0fVxuXG5cdFx0XHR2YXIgc3RhcnQgPSB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcblx0XHRcdHZhciBlbmQgPSB0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldO1xuXG5cdFx0XHRpZiAoZW5kIGluc3RhbmNlb2YgQXJyYXkpIHtcblxuXHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gdGhpcy5faW50ZXJwb2xhdGlvbkZ1bmN0aW9uKGVuZCwgdmFsdWUpO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdC8vIFBhcnNlcyByZWxhdGl2ZSBlbmQgdmFsdWVzIHdpdGggc3RhcnQgYXMgYmFzZSAoZS5nLjogKzEwLCAtMylcblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ3N0cmluZycpIHtcblxuXHRcdFx0XHRcdGlmIChlbmQuY2hhckF0KDApID09PSAnKycgfHwgZW5kLmNoYXJBdCgwKSA9PT0gJy0nKSB7XG5cdFx0XHRcdFx0XHRlbmQgPSBzdGFydCArIHBhcnNlRmxvYXQoZW5kKTtcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZW5kID0gcGFyc2VGbG9hdChlbmQpO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFByb3RlY3QgYWdhaW5zdCBub24gbnVtZXJpYyBwcm9wZXJ0aWVzLlxuXHRcdFx0XHRpZiAodHlwZW9mIChlbmQpID09PSAnbnVtYmVyJykge1xuXHRcdFx0XHRcdHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPSBzdGFydCArIChlbmQgLSBzdGFydCkgKiB2YWx1ZTtcblx0XHRcdFx0fVxuXG5cdFx0XHR9XG5cblx0XHR9XG5cblx0XHRpZiAodGhpcy5fb25VcGRhdGVDYWxsYmFjayAhPT0gbnVsbCkge1xuXHRcdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdH1cblxuXHRcdGlmIChlbGFwc2VkID09PSAxKSB7XG5cblx0XHRcdGlmICh0aGlzLl9yZXBlYXQgPiAwKSB7XG5cblx0XHRcdFx0aWYgKGlzRmluaXRlKHRoaXMuX3JlcGVhdCkpIHtcblx0XHRcdFx0XHR0aGlzLl9yZXBlYXQtLTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdC8vIFJlYXNzaWduIHN0YXJ0aW5nIHZhbHVlcywgcmVzdGFydCBieSBtYWtpbmcgc3RhcnRUaW1lID0gbm93XG5cdFx0XHRcdGZvciAocHJvcGVydHkgaW4gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXQpIHtcblxuXHRcdFx0XHRcdGlmICh0eXBlb2YgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0pID09PSAnc3RyaW5nJykge1xuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldICsgcGFyc2VGbG9hdCh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKTtcblx0XHRcdFx0XHR9XG5cblx0XHRcdFx0XHRpZiAodGhpcy5feW95bykge1xuXHRcdFx0XHRcdFx0dmFyIHRtcCA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcblxuXHRcdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0gPSB0bXA7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldID0gdGhpcy5fdmFsdWVzU3RhcnRSZXBlYXRbcHJvcGVydHldO1xuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpZiAodGhpcy5feW95bykge1xuXHRcdFx0XHRcdHRoaXMuX3JldmVyc2VkID0gIXRoaXMuX3JldmVyc2VkO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX3JlcGVhdERlbGF5VGltZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSArIHRoaXMuX3JlcGVhdERlbGF5VGltZTtcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHR0aGlzLl9zdGFydFRpbWUgPSB0aW1lICsgdGhpcy5fZGVsYXlUaW1lO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0cmV0dXJuIHRydWU7XG5cblx0XHRcdH0gZWxzZSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayAhPT0gbnVsbCkge1xuXG5cdFx0XHRcdFx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XG5cdFx0XHRcdFx0Ly8gTWFrZSB0aGUgY2hhaW5lZCB0d2VlbnMgc3RhcnQgZXhhY3RseSBhdCB0aGUgdGltZSB0aGV5IHNob3VsZCxcblx0XHRcdFx0XHQvLyBldmVuIGlmIHRoZSBgdXBkYXRlKClgIG1ldGhvZCB3YXMgY2FsbGVkIHdheSBwYXN0IHRoZSBkdXJhdGlvbiBvZiB0aGUgdHdlZW5cblx0XHRcdFx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0YXJ0KHRoaXMuX3N0YXJ0VGltZSArIHRoaXMuX2R1cmF0aW9uKTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiBmYWxzZTtcblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0cmV0dXJuIHRydWU7XG5cblx0fVxufTtcblxuXG5UV0VFTi5FYXNpbmcgPSB7XG5cblx0TGluZWFyOiB7XG5cblx0XHROb25lOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gaztcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1YWRyYXRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogKDIgLSBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtIDAuNSAqICgtLWsgKiAoayAtIDIpIC0gMSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRDdWJpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqIGsgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVhcnRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSAoLS1rICogayAqIGsgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC0gMC41ICogKChrIC09IDIpICogayAqIGsgKiBrIC0gMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWludGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICogayAqIGsgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBrICogayAqIGsgKiBrICogaztcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAqIGsgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFNpbnVzb2lkYWw6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtIE1hdGguY29zKGsgKiBNYXRoLlBJIC8gMik7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5zaW4oayAqIE1hdGguUEkgLyAyKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDAuNSAqICgxIC0gTWF0aC5jb3MoTWF0aC5QSSAqIGspKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEV4cG9uZW50aWFsOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgPT09IDAgPyAwIDogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGsgPT09IDEgPyAxIDogMSAtIE1hdGgucG93KDIsIC0gMTAgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAwLjUgKiBNYXRoLnBvdygxMDI0LCBrIC0gMSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoLSBNYXRoLnBvdygyLCAtIDEwICogKGsgLSAxKSkgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdENpcmN1bGFyOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLnNxcnQoMSAtIGsgKiBrKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBNYXRoLnNxcnQoMSAtICgtLWsgKiBrKSk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIC0gMC41ICogKE1hdGguc3FydCgxIC0gayAqIGspIC0gMSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoTWF0aC5zcXJ0KDEgLSAoayAtPSAyKSAqIGspICsgMSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRFbGFzdGljOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLU1hdGgucG93KDIsIDEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBNYXRoLnBvdygyLCAtMTAgKiBrKSAqIE1hdGguc2luKChrIC0gMC4xKSAqIDUgKiBNYXRoLlBJKSArIDE7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0ayAqPSAyO1xuXG5cdFx0XHRpZiAoayA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIC0wLjUgKiBNYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogTWF0aC5wb3coMiwgLTEwICogKGsgLSAxKSkgKiBNYXRoLnNpbigoayAtIDEuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0QmFjazoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHZhciBzID0gMS43MDE1ODtcblxuXHRcdFx0cmV0dXJuIGsgKiBrICogKChzICsgMSkgKiBrIC0gcyk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogKChzICsgMSkgKiBrICsgcykgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTggKiAxLjUyNTtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogKGsgKiBrICogKChzICsgMSkgKiBrIC0gcykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqICgocyArIDEpICogayArIHMpICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRCb3VuY2U6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gMSAtIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KDEgLSBrKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrIDwgKDEgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogayAqIGs7XG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMiAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMS41IC8gMi43NSkpICogayArIDAuNzU7XG5cdFx0XHR9IGVsc2UgaWYgKGsgPCAoMi41IC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIChrIC09ICgyLjI1IC8gMi43NSkpICogayArIDAuOTM3NTtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi42MjUgLyAyLjc1KSkgKiBrICsgMC45ODQzNzU7XG5cdFx0XHR9XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrIDwgMC41KSB7XG5cdFx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLkluKGsgKiAyKSAqIDAuNTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIFRXRUVOLkVhc2luZy5Cb3VuY2UuT3V0KGsgKiAyIC0gMSkgKiAwLjUgKyAwLjU7XG5cblx0XHR9XG5cblx0fVxuXG59O1xuXG5UV0VFTi5JbnRlcnBvbGF0aW9uID0ge1xuXG5cdExpbmVhcjogZnVuY3Rpb24gKHYsIGspIHtcblxuXHRcdHZhciBtID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBmID0gbSAqIGs7XG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xuXHRcdHZhciBmbiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuTGluZWFyO1xuXG5cdFx0aWYgKGsgPCAwKSB7XG5cdFx0XHRyZXR1cm4gZm4odlswXSwgdlsxXSwgZik7XG5cdFx0fVxuXG5cdFx0aWYgKGsgPiAxKSB7XG5cdFx0XHRyZXR1cm4gZm4odlttXSwgdlttIC0gMV0sIG0gLSBmKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gZm4odltpXSwgdltpICsgMSA+IG0gPyBtIDogaSArIDFdLCBmIC0gaSk7XG5cblx0fSxcblxuXHRCZXppZXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgYiA9IDA7XG5cdFx0dmFyIG4gPSB2Lmxlbmd0aCAtIDE7XG5cdFx0dmFyIHB3ID0gTWF0aC5wb3c7XG5cdFx0dmFyIGJuID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5CZXJuc3RlaW47XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8PSBuOyBpKyspIHtcblx0XHRcdGIgKz0gcHcoMSAtIGssIG4gLSBpKSAqIHB3KGssIGkpICogdltpXSAqIGJuKG4sIGkpO1xuXHRcdH1cblxuXHRcdHJldHVybiBiO1xuXG5cdH0sXG5cblx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHYsIGspIHtcblxuXHRcdHZhciBtID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBmID0gbSAqIGs7XG5cdFx0dmFyIGkgPSBNYXRoLmZsb29yKGYpO1xuXHRcdHZhciBmbiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQ2F0bXVsbFJvbTtcblxuXHRcdGlmICh2WzBdID09PSB2W21dKSB7XG5cblx0XHRcdGlmIChrIDwgMCkge1xuXHRcdFx0XHRpID0gTWF0aC5mbG9vcihmID0gbSAqICgxICsgaykpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm4odlsoaSAtIDEgKyBtKSAlIG1dLCB2W2ldLCB2WyhpICsgMSkgJSBtXSwgdlsoaSArIDIpICUgbV0sIGYgLSBpKTtcblxuXHRcdH0gZWxzZSB7XG5cblx0XHRcdGlmIChrIDwgMCkge1xuXHRcdFx0XHRyZXR1cm4gdlswXSAtIChmbih2WzBdLCB2WzBdLCB2WzFdLCB2WzFdLCAtZikgLSB2WzBdKTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPiAxKSB7XG5cdFx0XHRcdHJldHVybiB2W21dIC0gKGZuKHZbbV0sIHZbbV0sIHZbbSAtIDFdLCB2W20gLSAxXSwgZiAtIG0pIC0gdlttXSk7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBmbih2W2kgPyBpIC0gMSA6IDBdLCB2W2ldLCB2W20gPCBpICsgMSA/IG0gOiBpICsgMV0sIHZbbSA8IGkgKyAyID8gbSA6IGkgKyAyXSwgZiAtIGkpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0VXRpbHM6IHtcblxuXHRcdExpbmVhcjogZnVuY3Rpb24gKHAwLCBwMSwgdCkge1xuXG5cdFx0XHRyZXR1cm4gKHAxIC0gcDApICogdCArIHAwO1xuXG5cdFx0fSxcblxuXHRcdEJlcm5zdGVpbjogZnVuY3Rpb24gKG4sIGkpIHtcblxuXHRcdFx0dmFyIGZjID0gVFdFRU4uSW50ZXJwb2xhdGlvbi5VdGlscy5GYWN0b3JpYWw7XG5cblx0XHRcdHJldHVybiBmYyhuKSAvIGZjKGkpIC8gZmMobiAtIGkpO1xuXG5cdFx0fSxcblxuXHRcdEZhY3RvcmlhbDogKGZ1bmN0aW9uICgpIHtcblxuXHRcdFx0dmFyIGEgPSBbMV07XG5cblx0XHRcdHJldHVybiBmdW5jdGlvbiAobikge1xuXG5cdFx0XHRcdHZhciBzID0gMTtcblxuXHRcdFx0XHRpZiAoYVtuXSkge1xuXHRcdFx0XHRcdHJldHVybiBhW25dO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IG47IGkgPiAxOyBpLS0pIHtcblx0XHRcdFx0XHRzICo9IGk7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRhW25dID0gcztcblx0XHRcdFx0cmV0dXJuIHM7XG5cblx0XHRcdH07XG5cblx0XHR9KSgpLFxuXG5cdFx0Q2F0bXVsbFJvbTogZnVuY3Rpb24gKHAwLCBwMSwgcDIsIHAzLCB0KSB7XG5cblx0XHRcdHZhciB2MCA9IChwMiAtIHAwKSAqIDAuNTtcblx0XHRcdHZhciB2MSA9IChwMyAtIHAxKSAqIDAuNTtcblx0XHRcdHZhciB0MiA9IHQgKiB0O1xuXHRcdFx0dmFyIHQzID0gdCAqIHQyO1xuXG5cdFx0XHRyZXR1cm4gKDIgKiBwMSAtIDIgKiBwMiArIHYwICsgdjEpICogdDMgKyAoLSAzICogcDEgKyAzICogcDIgLSAyICogdjAgLSB2MSkgKiB0MiArIHYwICogdCArIHAxO1xuXG5cdFx0fVxuXG5cdH1cblxufTtcblxuLy8gVU1EIChVbml2ZXJzYWwgTW9kdWxlIERlZmluaXRpb24pXG4oZnVuY3Rpb24gKHJvb3QpIHtcblxuXHRpZiAodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKSB7XG5cblx0XHQvLyBBTURcblx0XHRkZWZpbmUoW10sIGZ1bmN0aW9uICgpIHtcblx0XHRcdHJldHVybiBUV0VFTjtcblx0XHR9KTtcblxuXHR9IGVsc2UgaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jykge1xuXG5cdFx0Ly8gTm9kZS5qc1xuXHRcdG1vZHVsZS5leHBvcnRzID0gVFdFRU47XG5cblx0fSBlbHNlIGlmIChyb290ICE9PSB1bmRlZmluZWQpIHtcblxuXHRcdC8vIEdsb2JhbCB2YXJpYWJsZVxuXHRcdHJvb3QuVFdFRU4gPSBUV0VFTjtcblxuXHR9XG5cbn0pKHRoaXMpO1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcIi8qIGpzcGFuZWwuc2FzczogMjAxOC0xMC0yMSAxMzo0MSAqL1xcbi8qIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMzA0MjE1NzAvc2Fzcy11bmljb2RlLWVzY2FwZS1pcy1ub3QtcHJlc2VydmVkLWluLWNzcy1maWxlICovXFxuLmpzUGFuZWwge1xcbiAgYm9yZGVyOiAwO1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sXFxcIk9wZW4gU2Fuc1xcXCIsTGF0byxcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEFyaWFsLHNhbnMtc2VyaWY7XFxuICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICBvcGFjaXR5OiAwO1xcbiAgb3ZlcmZsb3c6IHZpc2libGU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICB6LWluZGV4OiAxMDA7IH1cXG4gIC5qc1BhbmVsIC5qc1BhbmVsLWhkciB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbiAgICBmb250LWZhbWlseTogUm9ib3RvLFxcXCJPcGVuIFNhbnNcXFwiLExhdG8sXFxcIkhlbHZldGljYSBOZXVlXFxcIixBcmlhbCxzYW5zLXNlcmlmO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIGZsZXgtc2hyaW5rOiAwOyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1jb250ZW50IHtcXG4gICAgYm9yZGVyOiAwO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG8sXFxcIk9wZW4gU2Fuc1xcXCIsTGF0byxcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEFyaWFsLHNhbnMtc2VyaWY7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGJhY2tncm91bmQ6ICNmZmZmZmY7XFxuICAgIGNvbG9yOiAjMDAwMDAwO1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgb3ZlcmZsb3cteDogaGlkZGVuO1xcbiAgICBvdmVyZmxvdy15OiBhdXRvO1xcbiAgICBmbGV4LWdyb3c6IDE7IH1cXG4gICAgLmpzUGFuZWwgLmpzUGFuZWwtY29udGVudCBwcmUge1xcbiAgICAgIGNvbG9yOiBpbmhlcml0OyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1mdHIge1xcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xcbiAgICBmbGV4LXdyYXA6IG5vd3JhcDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNlMGUwZTA7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIGZvbnQtc2l6ZTogMXJlbTtcXG4gICAgaGVpZ2h0OiBhdXRvO1xcbiAgICBiYWNrZ3JvdW5kOiAjZjVmNWY1O1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBjb2xvcjogYmxhY2s7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47IH1cXG4gIC5qc1BhbmVsIC5qc1BhbmVsLWZ0ci5hY3RpdmUge1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LXNocmluazogMDsgfVxcbiAgICAuanNQYW5lbCAuanNQYW5lbC1mdHIuYWN0aXZlID4gKiB7XFxuICAgICAgbWFyZ2luOiAzcHggOHB4OyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1mdHIucGFuZWwtZm9vdGVyIHtcXG4gICAgcGFkZGluZzogMDsgfVxcblxcbi5qc1BhbmVsLWhlYWRlcmJhciwgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgZm9udC1zaXplOiAxcmVtOyB9XFxuXFxuLmpzUGFuZWwtaGVhZGVyYmFyIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGZsZXgtd3JhcDogbm93cmFwO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcbiAgLmpzUGFuZWwtaGVhZGVyYmFyIGltZyB7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgIG1heC1oZWlnaHQ6IDM4cHg7IH1cXG5cXG4uanNQYW5lbC10aXRsZWJhciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gIGZsZXg6IDEgMSAwcHg7XFxuICBjdXJzb3I6IG1vdmU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAuanNQYW5lbC10aXRsZWJhciAuanNQYW5lbC10aXRsZSB7XFxuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XFxuICAgIG92ZXJmbG93OiBoaWRkZW47XFxuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIGZvbnQtdmFyaWFudDogc21hbGwtY2FwcztcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgbGluZS1oZWlnaHQ6IDEuNTtcXG4gICAgbWFyZ2luOiAwIDVweCAwIDhweDtcXG4gICAgbWluLXdpZHRoOiAwOyB9XFxuICAgIC5qc1BhbmVsLXRpdGxlYmFyIC5qc1BhbmVsLXRpdGxlIHNtYWxsIHtcXG4gICAgICBmb250LXNpemU6IDcwJTtcXG4gICAgICBjb2xvcjogaW5oZXJpdDsgfVxcblxcbi5qc1BhbmVsLXRpdGxlYmFyLmpzUGFuZWwtcnRsIHtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTsgfVxcblxcbi5qc1BhbmVsLWNvbnRyb2xiYXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICB0b3VjaC1hY3Rpb246IG5vbmU7IH1cXG4gIC5qc1BhbmVsLWNvbnRyb2xiYXIgZGl2IHNwYW46aG92ZXIsIC5qc1BhbmVsLWNvbnRyb2xiYXIgZGl2IHN2Zzpob3ZlciB7XFxuICAgIG9wYWNpdHk6IC42OyB9XFxuICAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biB7XFxuICAgIGN1cnNvcjogcG9pbnRlcjtcXG4gICAgdG91Y2gtYWN0aW9uOiBub25lO1xcbiAgICBwYWRkaW5nOiA2cHggOHB4IDhweCAzcHg7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gc3BhbiB7XFxuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcXG4gICAgICBwYWRkaW5nOiAwIDRweCAwIDJweDsgfVxcbiAgICAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biBzcGFuLmdseXBoaWNvbiB7XFxuICAgICAgcGFkZGluZzogMCAycHg7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gc3ZnLmpzUGFuZWwtaWNvbiB7XFxuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTsgfVxcbiAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4tbm9ybWFsaXplLCAuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldiB7XFxuICAgIGRpc3BsYXk6IG5vbmU7IH1cXG5cXG4uanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBkaXNwbGF5OiBub25lO1xcbiAgd2lkdGg6IGF1dG87XFxuICBoZWlnaHQ6IGF1dG87IH1cXG5cXG4uanNQYW5lbC1oZHItdG9vbGJhci5hY3RpdmUge1xcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93O1xcbiAgZmxleC13cmFwOiBub3dyYXA7XFxuICBhbGlnbi1pdGVtczogY2VudGVyOyB9XFxuICAuanNQYW5lbC1oZHItdG9vbGJhci5hY3RpdmUgPiAqIHtcXG4gICAgbWFyZ2luOiAzcHggOHB4OyB9XFxuXFxuLyogc3R5bGVzIGZvciBwYW5lbHMgdXNpbmcgb3B0aW9uLnJ0bCAqL1xcbi5qc1BhbmVsLWhlYWRlcmJhci5qc1BhbmVsLXJ0bCwgLmpzUGFuZWwtY29udHJvbGJhci5qc1BhbmVsLXJ0bCwgLmpzUGFuZWwtaGRyLXRvb2xiYXIuanNQYW5lbC1ydGwge1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdy1yZXZlcnNlOyB9XFxuXFxuLmpzUGFuZWwtaGRyLXRvb2xiYXIuYWN0aXZlLmpzUGFuZWwtcnRsIHtcXG4gIHBhZGRpbmc6IDdweCAwIDEwcHggMDsgfVxcblxcbi5qc1BhbmVsLWZ0ci5qc1BhbmVsLXJ0bCB7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93OyB9XFxuXFxuLyogY29udGFpbmVyIHRoYXQgdGFrZXMgdGhlIG1pbmlmaWVkIGpzUGFuZWxzICovXFxuI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyLCAuanNQYW5lbC1taW5pbWl6ZWQtYm94LCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwLXJldmVyc2U7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudCBub25lIHJlcGVhdCBzY3JvbGwgMCAwO1xcbiAgYm90dG9tOiAwO1xcbiAgaGVpZ2h0OiBhdXRvO1xcbiAgbGVmdDogMDtcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHdpZHRoOiBhdXRvO1xcbiAgei1pbmRleDogOTk5ODsgfVxcbiAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50LCAuanNQYW5lbC1taW5pbWl6ZWQtYm94IC5qc1BhbmVsLXJlcGxhY2VtZW50LCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IHtcXG4gICAgZm9udC1mYW1pbHk6IFJvYm90byxcXFwiT3BlbiBTYW5zXFxcIixMYXRvLFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsQXJpYWwsc2Fucy1zZXJpZjtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAgd2lkdGg6IDIwMHB4O1xcbiAgICBoZWlnaHQ6IDQwcHg7XFxuICAgIG1hcmdpbjogMXB4IDFweCAwIDA7XFxuICAgIHotaW5kZXg6IDk5OTk7IH1cXG4gICAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIsIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIHtcXG4gICAgICBmbGV4LWdyb3c6IDE7XFxuICAgICAgbWluLXdpZHRoOiAwO1xcbiAgICAgIHBhZGRpbmc6IDA7IH1cXG4gICAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28sIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28sIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28ge1xcbiAgICAgICAgbWF4LXdpZHRoOiA1MCU7XFxuICAgICAgICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAgICAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28gaW1nLCAuanNQYW5lbC1taW5pbWl6ZWQtYm94IC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvIGltZywgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGVhZGVybG9nbyBpbWcge1xcbiAgICAgICAgICBtYXgtd2lkdGg6IDEwMHB4O1xcbiAgICAgICAgICBtYXgtaGVpZ2h0OiAzOHB4OyB9XFxuICAgICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC10aXRsZWJhciwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC10aXRsZWJhciwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC10aXRsZWJhciB7XFxuICAgICAgY3Vyc29yOiBkZWZhdWx0O1xcbiAgICAgIG1pbi13aWR0aDogMDsgfVxcbiAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtYnRuLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZSwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1idG4uanNQYW5lbC1idG4tbm9ybWFsaXplLCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWJ0bi5qc1BhbmVsLWJ0bi1ub3JtYWxpemUge1xcbiAgICAgIGRpc3BsYXk6IGJsb2NrOyB9XFxuXFxuLmpzUGFuZWwtbWluaW1pemVkLWJveCwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB3aWR0aDogMTAwJTtcXG4gIG92ZXJmbG93OiBoaWRkZW47IH1cXG5cXG4vKiBoZWxwZXIgY2xhc3NlcyB0byBtYWtlIC5qc1BhbmVsLWNvbnRlbnQgYSBmbGV4IGJveCAqL1xcbi5mbGV4T25lIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWZsb3c6IHJvdyB3cmFwOyB9XFxuXFxuLyogY3NzIGZvciByZXNpemVpdCBoYW5kbGVzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUge1xcbiAgZGlzcGxheTogYmxvY2s7XFxuICBmb250LXNpemU6IDAuMXB4O1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG91Y2gtYWN0aW9uOiBub25lOyB9XFxuXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlLmpzUGFuZWwtcmVzaXplaXQtbiB7XFxuICBjdXJzb3I6IG4tcmVzaXplO1xcbiAgaGVpZ2h0OiAxMnB4O1xcbiAgbGVmdDogOXB4O1xcbiAgdG9wOiAtNXB4O1xcbiAgd2lkdGg6IGNhbGMoMTAwJSAtIDE4cHgpOyB9XFxuXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlLmpzUGFuZWwtcmVzaXplaXQtZSB7XFxuICBjdXJzb3I6IGUtcmVzaXplO1xcbiAgaGVpZ2h0OiBjYWxjKDEwMCUgLSAxOHB4KTtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgdG9wOiA5cHg7XFxuICB3aWR0aDogMTJweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXMge1xcbiAgYm90dG9tOiAtOXB4O1xcbiAgY3Vyc29yOiBzLXJlc2l6ZTtcXG4gIGhlaWdodDogMTJweDtcXG4gIGxlZnQ6IDlweDtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAxOHB4KTsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXcge1xcbiAgY3Vyc29yOiB3LXJlc2l6ZTtcXG4gIGhlaWdodDogY2FsYygxMDAlIC0gMThweCk7XFxuICBsZWZ0OiAtOXB4O1xcbiAgdG9wOiA5cHg7XFxuICB3aWR0aDogMTJweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LW5lIHtcXG4gIGN1cnNvcjogbmUtcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgcmlnaHQ6IC05cHg7XFxuICB0b3A6IC05cHg7XFxuICB3aWR0aDogMThweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXNlIHtcXG4gIGJvdHRvbTogLTlweDtcXG4gIGN1cnNvcjogc2UtcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgcmlnaHQ6IC05cHg7XFxuICB3aWR0aDogMThweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LXN3IHtcXG4gIGJvdHRvbTogLTlweDtcXG4gIGN1cnNvcjogc3ctcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgbGVmdDogLTlweDtcXG4gIHdpZHRoOiAxOHB4OyB9XFxuXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlLmpzUGFuZWwtcmVzaXplaXQtbncge1xcbiAgY3Vyc29yOiBudy1yZXNpemU7XFxuICBoZWlnaHQ6IDE4cHg7XFxuICBsZWZ0OiAtOXB4O1xcbiAgdG9wOiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7IH1cXG5cXG4uanNQYW5lbC1kcmFnLW92ZXJsYXkge1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBsZWZ0OiAwO1xcbiAgdG9wOiAwOyB9XFxuXFxuLyogYm94LXNoYWRvd3MgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtZGVwdGgtMSB7XFxuICBib3gtc2hhZG93OiAwIDNweCA2cHggcmdiYSgwLCAwLCAwLCAwLjE2KSwgMCAzcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4yMyk7IH1cXG5cXG4uanNQYW5lbC1kZXB0aC0yIHtcXG4gIGJveC1zaGFkb3c6IDAgMTBweCAyMHB4IHJnYmEoMCwgMCwgMCwgMC4xOSksIDAgNnB4IDZweCByZ2JhKDAsIDAsIDAsIDAuMjMpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtMyB7XFxuICBib3gtc2hhZG93OiAwIDE0cHggMjhweCByZ2JhKDAsIDAsIDAsIDAuMjUpLCAwIDEwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuMjIpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtNCB7XFxuICBib3gtc2hhZG93OiAwIDE5cHggMzhweCByZ2JhKDAsIDAsIDAsIDAuMyksIDAgMTVweCAxMnB4IHJnYmEoMCwgMCwgMCwgMC4yMik7IH1cXG5cXG4uanNQYW5lbC1kZXB0aC01IHtcXG4gIGJveC1zaGFkb3c6IDAgMjRweCA0OHB4IHJnYmEoMCwgMCwgMCwgMC4zKSwgMCAyMHB4IDE0cHggcmdiYSgwLCAwLCAwLCAwLjIyKTsgfVxcblxcbi8qIHNuYXAgc2Vuc2l0aXZlIGFyZWFzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXNuYXAtYXJlYSB7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICBiYWNrZ3JvdW5kOiBibGFjaztcXG4gIG9wYWNpdHk6IC4yO1xcbiAgYm9yZGVyOiAxcHggc29saWQgc2lsdmVyO1xcbiAgYm94LXNoYWRvdzogMCAxNHB4IDI4cHggcmdiYSgwLCAwLCAwLCAwLjUpLCAwIDEwcHggMTBweCByZ2JhKDAsIDAsIDAsIDAuNSk7XFxuICB6LWluZGV4OiA5OTk5OyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWx0LCAuanNQYW5lbC1zbmFwLWFyZWEtbGMsIC5qc1BhbmVsLXNuYXAtYXJlYS1sYiwgLmpzUGFuZWwtc25hcC1hcmVhLWxlZnQtdG9wLCAuanNQYW5lbC1zbmFwLWFyZWEtbGVmdC1jZW50ZXIsIC5qc1BhbmVsLXNuYXAtYXJlYS1sZWZ0LWJvdHRvbSB7XFxuICBsZWZ0OiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWN0LCAuanNQYW5lbC1zbmFwLWFyZWEtY2Ige1xcbiAgbGVmdDogMzcuNSU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtcnQsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYywgLmpzUGFuZWwtc25hcC1hcmVhLXJiLCAuanNQYW5lbC1zbmFwLWFyZWEtcmlnaHQtdG9wLCAuanNQYW5lbC1zbmFwLWFyZWEtcmlnaHQtY2VudGVyLCAuanNQYW5lbC1zbmFwLWFyZWEtcmlnaHQtYm90dG9tIHtcXG4gIHJpZ2h0OiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWx0LCAuanNQYW5lbC1zbmFwLWFyZWEtY3QsIC5qc1BhbmVsLXNuYXAtYXJlYS1ydCwgLmpzUGFuZWwtc25hcC1hcmVhLWxlZnQtdG9wLCAuanNQYW5lbC1zbmFwLWFyZWEtY2VudGVyLXRvcCwgLmpzUGFuZWwtc25hcC1hcmVhLXJpZ2h0LXRvcCB7XFxuICB0b3A6IDA7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtbGMsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYyB7XFxuICB0b3A6IDM3LjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxiLCAuanNQYW5lbC1zbmFwLWFyZWEtY2IsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYiwgLmpzUGFuZWwtc25hcC1hcmVhLWxlZnQtYm90dG9tLCAuanNQYW5lbC1zbmFwLWFyZWEtY2VudGVyLWJvdHRvbSwgLmpzUGFuZWwtc25hcC1hcmVhLXJpZ2h0LWJvdHRvbSB7XFxuICBib3R0b206IDA7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtY3QsIC5qc1BhbmVsLXNuYXAtYXJlYS1jYiB7XFxuICB3aWR0aDogMjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxjLCAuanNQYW5lbC1zbmFwLWFyZWEtcmMge1xcbiAgaGVpZ2h0OiAyNSU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtbHQsIC5qc1BhbmVsLXNuYXAtYXJlYS1sZWZ0LXRvcCB7XFxuICBib3JkZXItYm90dG9tLXJpZ2h0LXJhZGl1czogMTAwJTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1ydCwgLmpzUGFuZWwtc25hcC1hcmVhLXJpZ2h0LXRvcCB7XFxuICBib3JkZXItYm90dG9tLWxlZnQtcmFkaXVzOiAxMDAlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLXJiLCAuanNQYW5lbC1zbmFwLWFyZWEtcmlnaHQtYm90dG9tIHtcXG4gIGJvcmRlci10b3AtbGVmdC1yYWRpdXM6IDEwMCU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtbGIsIC5qc1BhbmVsLXNuYXAtYXJlYS1sZWZ0LWJvdHRvbSB7XFxuICBib3JkZXItdG9wLXJpZ2h0LXJhZGl1czogMTAwJTsgfVxcblxcbi8qIHRvb2x0aXAgYW5kIHRvb2x0aXAgY29ubmVjdG9ycyAqL1xcbi5qc1BhbmVsLWNvbm5lY3Rvci1sZWZ0LXRvcC1jb3JuZXIsXFxuLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0LXRvcC1jb3JuZXIsXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQtYm90dG9tLWNvcm5lcixcXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHQtYm90dG9tLWNvcm5lciB7XFxuICB3aWR0aDogMTJweDtcXG4gIGhlaWdodDogMTJweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIGJvcmRlci1yYWRpdXM6IDUwJTsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci1sZWZ0LXRvcC1jb3JuZXIge1xcbiAgbGVmdDogY2FsYygxMDAlIC0gNnB4KTtcXG4gIHRvcDogY2FsYygxMDAlIC0gNnB4KTsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci1yaWdodC10b3AtY29ybmVyIHtcXG4gIGxlZnQ6IC02cHg7XFxuICB0b3A6IGNhbGMoMTAwJSAtIDZweCk7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHQtYm90dG9tLWNvcm5lciB7XFxuICBsZWZ0OiAtNnB4O1xcbiAgdG9wOiAtNnB4OyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQtYm90dG9tLWNvcm5lciB7XFxuICBsZWZ0OiBjYWxjKDEwMCUgLSA2cHgpO1xcbiAgdG9wOiAtNnB4OyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLXRvcCxcXG4uanNQYW5lbC1jb25uZWN0b3ItdG9wbGVmdCxcXG4uanNQYW5lbC1jb25uZWN0b3ItdG9wcmlnaHQsXFxuLmpzUGFuZWwtY29ubmVjdG9yLWJvdHRvbSxcXG4uanNQYW5lbC1jb25uZWN0b3ItYm90dG9tbGVmdCxcXG4uanNQYW5lbC1jb25uZWN0b3ItYm90dG9tcmlnaHQsXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQsXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnR0b3AsXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnRib3R0b20sXFxuLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0LFxcbi5qc1BhbmVsLWNvbm5lY3Rvci1yaWdodHRvcCxcXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHRib3R0b20ge1xcbiAgd2lkdGg6IDA7XFxuICBoZWlnaHQ6IDA7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3JkZXI6IDEycHggc29saWQgdHJhbnNwYXJlbnQ7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItdG9wLFxcbi5qc1BhbmVsLWNvbm5lY3Rvci10b3BsZWZ0LFxcbi5qc1BhbmVsLWNvbm5lY3Rvci10b3ByaWdodCB7XFxuICB0b3A6IDEwMCU7XFxuICBib3JkZXItYm90dG9tLXdpZHRoOiAwOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLXRvcCB7XFxuICBsZWZ0OiBjYWxjKDUwJSAtIDEycHgpOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLXRvcGxlZnQge1xcbiAgbGVmdDogMHB4OyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLXRvcHJpZ2h0IHtcXG4gIGxlZnQ6IGNhbGMoMTAwJSAtIDI0cHgpOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWJvdHRvbSxcXG4uanNQYW5lbC1jb25uZWN0b3ItYm90dG9tbGVmdCxcXG4uanNQYW5lbC1jb25uZWN0b3ItYm90dG9tcmlnaHQge1xcbiAgdG9wOiAtMTJweDtcXG4gIGJvcmRlci10b3Atd2lkdGg6IDA7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItYm90dG9tIHtcXG4gIGxlZnQ6IGNhbGMoNTAlIC0gMTJweCk7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItYm90dG9tbGVmdCB7XFxuICBsZWZ0OiAwcHg7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItYm90dG9tcmlnaHQge1xcbiAgbGVmdDogY2FsYygxMDAlIC0gMjRweCk7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItbGVmdCxcXG4uanNQYW5lbC1jb25uZWN0b3ItbGVmdHRvcCxcXG4uanNQYW5lbC1jb25uZWN0b3ItbGVmdGJvdHRvbSB7XFxuICBsZWZ0OiAxMDAlO1xcbiAgYm9yZGVyLXJpZ2h0LXdpZHRoOiAwOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQge1xcbiAgdG9wOiBjYWxjKDUwJSAtIDEycHgpOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnR0b3Age1xcbiAgdG9wOiAwcHg7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItbGVmdGJvdHRvbSB7XFxuICB0b3A6IGNhbGMoMTAwJSAtIDI0cHgpOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0LFxcbi5qc1BhbmVsLWNvbm5lY3Rvci1yaWdodHRvcCxcXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHRib3R0b20ge1xcbiAgbGVmdDogLTEycHg7XFxuICBib3JkZXItbGVmdC13aWR0aDogMDsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci1yaWdodCB7XFxuICB0b3A6IGNhbGMoNTAlIC0gMTJweCk7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHR0b3Age1xcbiAgdG9wOiAwcHg7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHRib3R0b20ge1xcbiAgdG9wOiBjYWxjKDEwMCUgLSAyNHB4KTsgfVxcblxcbi8qIElFMTEgQ1NTIHN0eWxlcyBnbyBoZXJlICovXFxuQG1lZGlhIGFsbCBhbmQgKC1tcy1oaWdoLWNvbnRyYXN0OiBub25lKSwgKC1tcy1oaWdoLWNvbnRyYXN0OiBhY3RpdmUpIHtcXG4gICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC10aXRsZWJhciB7XFxuICAgIG1heC13aWR0aDogMTA1cHg7IH0gfVxcblxcbi8qIFhYWFhYWFhYWFhYWFhYWFhYWFhYWFhYICovXFxuLyogYm9vdHN0cmFwIGFkanVzdG1lbnRzICovXFxuLmpzUGFuZWwucGFuZWwtZGVmYXVsdCwgLmpzUGFuZWwucGFuZWwtcHJpbWFyeSwgLmpzUGFuZWwucGFuZWwtaW5mbywgLmpzUGFuZWwucGFuZWwtc3VjY2VzcywgLmpzUGFuZWwucGFuZWwtd2FybmluZywgLmpzUGFuZWwucGFuZWwtZGFuZ2VyLCAuanNQYW5lbC5jYXJkLmNhcmQtaW52ZXJzZSB7XFxuICBib3gtc2hhZG93OiAwIDAgNnB4IHJnYmEoMCwgMzMsIDUwLCAwLjEpLCAwIDdweCAyNXB4IHJnYmEoMTcsIDM4LCA2MCwgMC40KTsgfVxcblxcbi5qc1BhbmVsLnBhbmVsIHtcXG4gIG1hcmdpbjogMDsgfVxcblxcbi5qc1BhbmVsLWhkci5wYW5lbC1oZWFkaW5nIHtcXG4gIGJvcmRlci1ib3R0b206IG5vbmU7XFxuICBwYWRkaW5nOiAwOyB9XFxuXFxuLmpzUGFuZWwtdGl0bGUucGFuZWwtdGl0bGUgLnNtYWxsLCAuanNQYW5lbC10aXRsZS5wYW5lbC10aXRsZSBzbWFsbCB7XFxuICBmb250LXNpemU6IDc1JTsgfVxcblxcbi8qIGJvb3RzdHJhcCA0IGFkanVzdG1lbnRzICovXFxuLmpzUGFuZWwuY2FyZC5jYXJkLWludmVyc2Uge1xcbiAgYm94LXNoYWRvdzogMCAwIDZweCByZ2JhKDAsIDMzLCA1MCwgMC4xKSwgMCA3cHggMjVweCByZ2JhKDE3LCAzOCwgNjAsIDAuNCk7IH1cXG5cXG4uY2FyZC1kZWZhdWx0IHtcXG4gIGJhY2tncm91bmQ6ICNmNWY1ZjU7IH1cXG5cXG4uY2FyZC1wcmltYXJ5ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkLFxcbi5jYXJkLXN1Y2Nlc3MgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQsXFxuLmNhcmQtaW5mbyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCxcXG4uY2FyZC13YXJuaW5nID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkLFxcbi5jYXJkLWRhbmdlciA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjZjVmNWY1OyB9XFxuXFxuLmNhcmQtZGVmYXVsdCA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogY3NzMyBhbmltYXRpb25zICovXFxuQGtleWZyYW1lcyBqc1BhbmVsRmFkZUluIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDE7IH0gfVxcblxcbi5qc1BhbmVsRmFkZUluIHtcXG4gIG9wYWNpdHk6IDA7XFxuICBhbmltYXRpb246IGpzUGFuZWxGYWRlSW4gZWFzZS1pbiAxO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDYwMG1zOyB9XFxuXFxuQGtleWZyYW1lcyBqc1BhbmVsRmFkZU91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4uanNQYW5lbEZhZGVPdXQge1xcbiAgYW5pbWF0aW9uOiBqc1BhbmVsRmFkZU91dCBlYXNlLWluIDE7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNjAwbXM7IH1cXG5cXG5Aa2V5ZnJhbWVzIG1vZGFsQmFja2Ryb3BGYWRlSW4ge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDA7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMC42NTsgfSB9XFxuXFxuLmpzUGFuZWwtbW9kYWwtYmFja2Ryb3Age1xcbiAgYW5pbWF0aW9uOiBtb2RhbEJhY2tkcm9wRmFkZUluIGVhc2UtaW4gMTtcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA3NTBtcztcXG4gIGJhY2tncm91bmQ6IGJsYWNrO1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgdG9wOiAwO1xcbiAgbGVmdDogMDtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlOyB9XFxuXFxuQGtleWZyYW1lcyBtb2RhbEJhY2tkcm9wRmFkZU91dCB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMC42NTsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAwOyB9IH1cXG5cXG4uanNQYW5lbC1tb2RhbC1iYWNrZHJvcC1vdXQge1xcbiAgYW5pbWF0aW9uOiBtb2RhbEJhY2tkcm9wRmFkZU91dCBlYXNlLWluIDE7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNDAwbXM7IH1cXG5cXG4uanNQYW5lbC1tb2RhbC1iYWNrZHJvcC1tdWx0aSB7XFxuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMTUpOyB9XFxuXFxuLmpzUGFuZWwtY29udGVudCAuanNQYW5lbC1pZnJhbWUtb3ZlcmxheSB7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICB0b3A6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTtcXG4gIGJhY2tncm91bmQ6IHRyYW5zcGFyZW50OyB9XFxuXFxuLyogX3RoZW1lcy5zYXNzOiAyMDE3LTA3LTEyIDE5OjE2ICovXFxuLyogZGVmYXVsdCAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2ZkOGRjO1xcbiAgYm9yZGVyLWNvbG9yOiAjY2ZkOGRjOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzkwYTRhZTsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1jb250ZW50IHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjOTBhNGFlOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjY2ZkOGRjO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM5MGE0YWU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2VjZWZmMTsgfVxcblxcbi8qIHByaW1hcnkgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcXG4gIGJvcmRlci1jb2xvcjogIzIxOTZmMzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkgPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0MmE1ZjU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtY29udGVudCB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzQyYTVmNTsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXByaW1hcnkgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzIxOTZmMztcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDJhNWY1O1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2JiZGVmYjtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogaW5mbyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjliNmY2O1xcbiAgYm9yZGVyLWNvbG9yOiAjMjliNmY2OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzRmYzNmNzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1jb250ZW50IHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNGZjM2Y3OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtaW5mbyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjliNmY2O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0ZmMzZjc7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZTFmNWZlO1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4vKiBzdWNjZXNzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICM0Y2FmNTA7XFxuICBib3JkZXItY29sb3I6ICM0Y2FmNTA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjODFjNzg0OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGNhZjUwO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM4MWM3ODQ7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXN1Y2Nlc3MgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZThmNWU5O1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4vKiB3YXJuaW5nIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmMxMDc7XFxuICBib3JkZXItY29sb3I6ICNmZmMxMDc7IH1cXG5cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmZkNTRmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjMTA3O1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZmQ1NGY7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXdhcm5pbmcgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWRsaWdodCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmM2UwO1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4vKiBkYW5nZXIgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS1kYW5nZXIge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmM2QwMDtcXG4gIGJvcmRlci1jb2xvcjogI2ZmM2QwMDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmY2ZTQwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjNkMDA7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmNmU0MDtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmOWU4MDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtbm9oZWFkZXIge1xcbiAgYm9yZGVyOiBub25lICFpbXBvcnRhbnQ7IH1cXG5cXG5ib2R5IHtcXG4gIC1tcy1vdmVyZmxvdy1zdHlsZTogc2Nyb2xsYmFyOyB9XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIjYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsIHtcXG4gICAgZGlzcGxheTpmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjpjb2x1bW47XFxuICAgIHdpZHRoOjEwMCU7XFxuICAgIGhlaWdodDoxMDAlO1xcbiAgICBhbGlnbi1pdGVtczpjZW50ZXI7XFxuICAgIGNvbG9yOiAjMDAwO1xcbn1cXG5cXG4jYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsIGlucHV0LHNlbGVjdCx0ZXh0YXJlYSB7XFxuICAgIGNvbG9yOiAjMDAwO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmO1xcbn1cXG5cXG4jYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsICNidXR0cGx1Z2RldnRvb2xzbG9ndGV4dGFyZWEge1xcbiAgICBmb250LXNpemU6IDhwdDtcXG4gICAgd2lkdGg6MTAwJTtcXG4gICAgZmxleDoxIDE7XFxuICAgIHBhZGRpbmc6NXB4O1xcbiAgICBib3gtc2l6aW5nOmJvcmRlci1ib3g7XFxufVxcbiNidXR0cGx1Z2RldnRvb2xzbG9ncGFuZWwgI2J1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbCB7XFxuICAgIHdpZHRoOjk4JTtcXG4gICAgZmxleDpub25lO1xcbiAgICBwYWRkaW5nOjVweDtcXG4gICAgYm94LXNpemluZzpib3JkZXItYm94O1xcbn1cXG5cIiwgXCJcIl0pO1xuXG4vLyBleHBvcnRzXG4iLCJleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvbGliL2Nzcy1iYXNlLmpzXCIpKGZhbHNlKTtcbi8vIGltcG9ydHNcblxuXG4vLyBtb2R1bGVcbmV4cG9ydHMucHVzaChbbW9kdWxlLmlkLCBcImJ1dHRwbHVnLWRldnRvb2xzLW1haW4ge1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluIHNlY3Rpb24ge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBwYWRkaW5nOiAyMHB4O1xcbiAgICBib3JkZXItdG9wOiAxcHggc29saWQgI2RkZDtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBpbnB1dCB7XFxuICAgIGRpc3BsYXk6IG5vbmU7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gbGFiZWwge1xcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XFxuICAgIG1hcmdpbjogMCAwIC0xcHg7XFxuICAgIHBhZGRpbmc6IDVweCAxMHB4O1xcbiAgICBmb250LXdlaWdodDogNjAwO1xcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XFxuICAgIGNvbG9yOiAjYmJiO1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCB0cmFuc3BhcmVudDtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBsYWJlbDpiZWZvcmUge1xcbiAgICBmb250LWZhbWlseTogZm9udGF3ZXNvbWU7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIG1hcmdpbi1yaWdodDogMTBweDtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBsYWJlbDpob3ZlciB7XFxuICAgIGNvbG9yOiAjODg4O1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gaW5wdXQ6Y2hlY2tlZCArIGxhYmVsIHtcXG4gICAgY29sb3I6ICM1NTU7XFxuICAgIGJvcmRlcjogMXB4IHNvbGlkICNkZGQ7XFxuICAgIGJvcmRlci10b3A6IDJweCBzb2xpZCBvcmFuZ2U7XFxuICAgIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjZmZmO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluICN0YWIxOmNoZWNrZWQgfiAjY29udGVudDEsXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAjdGFiMjpjaGVja2VkIH4gI2NvbnRlbnQyLFxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gI3RhYjM6Y2hlY2tlZCB+ICNjb250ZW50MyxcXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluICN0YWI0OmNoZWNrZWQgfiAjY29udGVudDQge1xcbiAgICBkaXNwbGF5OiBibG9jaztcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAjY29udGVudDEge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gI2NvbnRlbnQyIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluICNzaW11bGF0b3Ige1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA2MHB4KTtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAuZmxlc2hsaWdodC1zaW0ge1xcbiAgICBmbGV4OiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBkaXYuYy1mbGVzaGxpZ2h0IHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleDogMTtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBkaXYuYy1mbGVzaGxpZ2h0IGltZyB7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgd2lkdGg6IGF1dG87XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IC1tb3otY3Jpc3AtZWRnZXM7XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IC1vLWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtd2Via2l0LW9wdGltaXplLWNvbnRyYXN0O1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiBwaXhlbGF0ZWQ7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gZGl2LmMtZmxlc2hsaWdodCAuby1mbGVzaGxpZ2h0IHtcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBoZWlnaHQ6IDc3JTtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAudmlicmF0b3Itc2ltdWxhdG9yLWNvbXBvbmVudCB7XFxuICAgIGZsZXg6IDE7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XFxuICAgIHdpZHRoOiAxMDAlO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluIGRpdi52aWJyYXRvciB7XFxuICAgIGZsZXg6IDEgMTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBkaXYudmlicmF0b3Itc2ltdWxhdG9yLWNvbXBvbmVudCBpbWcge1xcbiAgICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDQwcHgpO1xcbiAgICB3aWR0aDogYXV0bztcXG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xcbiAgICBpbWFnZS1yZW5kZXJpbmc6IC1tb3otY3Jpc3AtZWRnZXM7XFxuXFx0ICBpbWFnZS1yZW5kZXJpbmc6IC1vLWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtd2Via2l0LW9wdGltaXplLWNvbnRyYXN0O1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiBwaXhlbGF0ZWQ7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gZGl2LnZpYnJhdG9yLWluZm8ge1xcbiAgICBmbGV4OiAwO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluIC5zaW11bGF0b3ItZGl2aWRlciB7XFxuICAgIGJvcmRlci1sZWZ0OiAxcHggIzAwMCBkYXNoZWQ7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cbi8vIGNzcyBiYXNlIGNvZGUsIGluamVjdGVkIGJ5IHRoZSBjc3MtbG9hZGVyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgbGlzdCA9IFtdO1xuXG5cdC8vIHJldHVybiB0aGUgbGlzdCBvZiBtb2R1bGVzIGFzIGNzcyBzdHJpbmdcblx0bGlzdC50b1N0cmluZyA9IGZ1bmN0aW9uIHRvU3RyaW5nKCkge1xuXHRcdHJldHVybiB0aGlzLm1hcChmdW5jdGlvbiAoaXRlbSkge1xuXHRcdFx0dmFyIGNvbnRlbnQgPSBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCk7XG5cdFx0XHRpZihpdGVtWzJdKSB7XG5cdFx0XHRcdHJldHVybiBcIkBtZWRpYSBcIiArIGl0ZW1bMl0gKyBcIntcIiArIGNvbnRlbnQgKyBcIn1cIjtcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHJldHVybiBjb250ZW50O1xuXHRcdFx0fVxuXHRcdH0pLmpvaW4oXCJcIik7XG5cdH07XG5cblx0Ly8gaW1wb3J0IGEgbGlzdCBvZiBtb2R1bGVzIGludG8gdGhlIGxpc3Rcblx0bGlzdC5pID0gZnVuY3Rpb24obW9kdWxlcywgbWVkaWFRdWVyeSkge1xuXHRcdGlmKHR5cGVvZiBtb2R1bGVzID09PSBcInN0cmluZ1wiKVxuXHRcdFx0bW9kdWxlcyA9IFtbbnVsbCwgbW9kdWxlcywgXCJcIl1dO1xuXHRcdHZhciBhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzID0ge307XG5cdFx0Zm9yKHZhciBpID0gMDsgaSA8IHRoaXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpZCA9IHRoaXNbaV1bMF07XG5cdFx0XHRpZih0eXBlb2YgaWQgPT09IFwibnVtYmVyXCIpXG5cdFx0XHRcdGFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaWRdID0gdHJ1ZTtcblx0XHR9XG5cdFx0Zm9yKGkgPSAwOyBpIDwgbW9kdWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGl0ZW0gPSBtb2R1bGVzW2ldO1xuXHRcdFx0Ly8gc2tpcCBhbHJlYWR5IGltcG9ydGVkIG1vZHVsZVxuXHRcdFx0Ly8gdGhpcyBpbXBsZW1lbnRhdGlvbiBpcyBub3QgMTAwJSBwZXJmZWN0IGZvciB3ZWlyZCBtZWRpYSBxdWVyeSBjb21iaW5hdGlvbnNcblx0XHRcdC8vICB3aGVuIGEgbW9kdWxlIGlzIGltcG9ydGVkIG11bHRpcGxlIHRpbWVzIHdpdGggZGlmZmVyZW50IG1lZGlhIHF1ZXJpZXMuXG5cdFx0XHQvLyAgSSBob3BlIHRoaXMgd2lsbCBuZXZlciBvY2N1ciAoSGV5IHRoaXMgd2F5IHdlIGhhdmUgc21hbGxlciBidW5kbGVzKVxuXHRcdFx0aWYodHlwZW9mIGl0ZW1bMF0gIT09IFwibnVtYmVyXCIgfHwgIWFscmVhZHlJbXBvcnRlZE1vZHVsZXNbaXRlbVswXV0pIHtcblx0XHRcdFx0aWYobWVkaWFRdWVyeSAmJiAhaXRlbVsyXSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBtZWRpYVF1ZXJ5O1xuXHRcdFx0XHR9IGVsc2UgaWYobWVkaWFRdWVyeSkge1xuXHRcdFx0XHRcdGl0ZW1bMl0gPSBcIihcIiArIGl0ZW1bMl0gKyBcIikgYW5kIChcIiArIG1lZGlhUXVlcnkgKyBcIilcIjtcblx0XHRcdFx0fVxuXHRcdFx0XHRsaXN0LnB1c2goaXRlbSk7XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xuXHRyZXR1cm4gbGlzdDtcbn07XG5cbmZ1bmN0aW9uIGNzc1dpdGhNYXBwaW5nVG9TdHJpbmcoaXRlbSwgdXNlU291cmNlTWFwKSB7XG5cdHZhciBjb250ZW50ID0gaXRlbVsxXSB8fCAnJztcblx0dmFyIGNzc01hcHBpbmcgPSBpdGVtWzNdO1xuXHRpZiAoIWNzc01hcHBpbmcpIHtcblx0XHRyZXR1cm4gY29udGVudDtcblx0fVxuXG5cdGlmICh1c2VTb3VyY2VNYXAgJiYgdHlwZW9mIGJ0b2EgPT09ICdmdW5jdGlvbicpIHtcblx0XHR2YXIgc291cmNlTWFwcGluZyA9IHRvQ29tbWVudChjc3NNYXBwaW5nKTtcblx0XHR2YXIgc291cmNlVVJMcyA9IGNzc01hcHBpbmcuc291cmNlcy5tYXAoZnVuY3Rpb24gKHNvdXJjZSkge1xuXHRcdFx0cmV0dXJuICcvKiMgc291cmNlVVJMPScgKyBjc3NNYXBwaW5nLnNvdXJjZVJvb3QgKyBzb3VyY2UgKyAnICovJ1xuXHRcdH0pO1xuXG5cdFx0cmV0dXJuIFtjb250ZW50XS5jb25jYXQoc291cmNlVVJMcykuY29uY2F0KFtzb3VyY2VNYXBwaW5nXSkuam9pbignXFxuJyk7XG5cdH1cblxuXHRyZXR1cm4gW2NvbnRlbnRdLmpvaW4oJ1xcbicpO1xufVxuXG4vLyBBZGFwdGVkIGZyb20gY29udmVydC1zb3VyY2UtbWFwIChNSVQpXG5mdW5jdGlvbiB0b0NvbW1lbnQoc291cmNlTWFwKSB7XG5cdC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxuXHR2YXIgYmFzZTY0ID0gYnRvYSh1bmVzY2FwZShlbmNvZGVVUklDb21wb25lbnQoSlNPTi5zdHJpbmdpZnkoc291cmNlTWFwKSkpKTtcblx0dmFyIGRhdGEgPSAnc291cmNlTWFwcGluZ1VSTD1kYXRhOmFwcGxpY2F0aW9uL2pzb247Y2hhcnNldD11dGYtODtiYXNlNjQsJyArIGJhc2U2NDtcblxuXHRyZXR1cm4gJy8qIyAnICsgZGF0YSArICcgKi8nO1xufVxuIiwiLy8gQ29weXJpZ2h0IEpveWVudCwgSW5jLiBhbmQgb3RoZXIgTm9kZSBjb250cmlidXRvcnMuXG4vL1xuLy8gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGFcbi8vIGNvcHkgb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGVcbi8vIFwiU29mdHdhcmVcIiksIHRvIGRlYWwgaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZ1xuLy8gd2l0aG91dCBsaW1pdGF0aW9uIHRoZSByaWdodHMgdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLFxuLy8gZGlzdHJpYnV0ZSwgc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdFxuLy8gcGVyc29ucyB0byB3aG9tIHRoZSBTb2Z0d2FyZSBpcyBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlXG4vLyBmb2xsb3dpbmcgY29uZGl0aW9uczpcbi8vXG4vLyBUaGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSBhbmQgdGhpcyBwZXJtaXNzaW9uIG5vdGljZSBzaGFsbCBiZSBpbmNsdWRlZFxuLy8gaW4gYWxsIGNvcGllcyBvciBzdWJzdGFudGlhbCBwb3J0aW9ucyBvZiB0aGUgU29mdHdhcmUuXG4vL1xuLy8gVEhFIFNPRlRXQVJFIElTIFBST1ZJREVEIFwiQVMgSVNcIiwgV0lUSE9VVCBXQVJSQU5UWSBPRiBBTlkgS0lORCwgRVhQUkVTU1xuLy8gT1IgSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRlxuLy8gTUVSQ0hBTlRBQklMSVRZLCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBTkQgTk9OSU5GUklOR0VNRU5ULiBJTlxuLy8gTk8gRVZFTlQgU0hBTEwgVEhFIEFVVEhPUlMgT1IgQ09QWVJJR0hUIEhPTERFUlMgQkUgTElBQkxFIEZPUiBBTlkgQ0xBSU0sXG4vLyBEQU1BR0VTIE9SIE9USEVSIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1Jcbi8vIE9USEVSV0lTRSwgQVJJU0lORyBGUk9NLCBPVVQgT0YgT1IgSU4gQ09OTkVDVElPTiBXSVRIIFRIRSBTT0ZUV0FSRSBPUiBUSEVcbi8vIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTiBUSEUgU09GVFdBUkUuXG5cbmZ1bmN0aW9uIEV2ZW50RW1pdHRlcigpIHtcbiAgdGhpcy5fZXZlbnRzID0gdGhpcy5fZXZlbnRzIHx8IHt9O1xuICB0aGlzLl9tYXhMaXN0ZW5lcnMgPSB0aGlzLl9tYXhMaXN0ZW5lcnMgfHwgdW5kZWZpbmVkO1xufVxubW9kdWxlLmV4cG9ydHMgPSBFdmVudEVtaXR0ZXI7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXQgd2l0aCBub2RlIDAuMTAueFxuRXZlbnRFbWl0dGVyLkV2ZW50RW1pdHRlciA9IEV2ZW50RW1pdHRlcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fZXZlbnRzID0gdW5kZWZpbmVkO1xuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5fbWF4TGlzdGVuZXJzID0gdW5kZWZpbmVkO1xuXG4vLyBCeSBkZWZhdWx0IEV2ZW50RW1pdHRlcnMgd2lsbCBwcmludCBhIHdhcm5pbmcgaWYgbW9yZSB0aGFuIDEwIGxpc3RlbmVycyBhcmVcbi8vIGFkZGVkIHRvIGl0LiBUaGlzIGlzIGEgdXNlZnVsIGRlZmF1bHQgd2hpY2ggaGVscHMgZmluZGluZyBtZW1vcnkgbGVha3MuXG5FdmVudEVtaXR0ZXIuZGVmYXVsdE1heExpc3RlbmVycyA9IDEwO1xuXG4vLyBPYnZpb3VzbHkgbm90IGFsbCBFbWl0dGVycyBzaG91bGQgYmUgbGltaXRlZCB0byAxMC4gVGhpcyBmdW5jdGlvbiBhbGxvd3Ncbi8vIHRoYXQgdG8gYmUgaW5jcmVhc2VkLiBTZXQgdG8gemVybyBmb3IgdW5saW1pdGVkLlxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5zZXRNYXhMaXN0ZW5lcnMgPSBmdW5jdGlvbihuKSB7XG4gIGlmICghaXNOdW1iZXIobikgfHwgbiA8IDAgfHwgaXNOYU4obikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCduIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXInKTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gbjtcbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmVtaXQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBlciwgaGFuZGxlciwgbGVuLCBhcmdzLCBpLCBsaXN0ZW5lcnM7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMpXG4gICAgdGhpcy5fZXZlbnRzID0ge307XG5cbiAgLy8gSWYgdGhlcmUgaXMgbm8gJ2Vycm9yJyBldmVudCBsaXN0ZW5lciB0aGVuIHRocm93LlxuICBpZiAodHlwZSA9PT0gJ2Vycm9yJykge1xuICAgIGlmICghdGhpcy5fZXZlbnRzLmVycm9yIHx8XG4gICAgICAgIChpc09iamVjdCh0aGlzLl9ldmVudHMuZXJyb3IpICYmICF0aGlzLl9ldmVudHMuZXJyb3IubGVuZ3RoKSkge1xuICAgICAgZXIgPSBhcmd1bWVudHNbMV07XG4gICAgICBpZiAoZXIgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICB0aHJvdyBlcjsgLy8gVW5oYW5kbGVkICdlcnJvcicgZXZlbnRcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIEF0IGxlYXN0IGdpdmUgc29tZSBraW5kIG9mIGNvbnRleHQgdG8gdGhlIHVzZXJcbiAgICAgICAgdmFyIGVyciA9IG5ldyBFcnJvcignVW5jYXVnaHQsIHVuc3BlY2lmaWVkIFwiZXJyb3JcIiBldmVudC4gKCcgKyBlciArICcpJyk7XG4gICAgICAgIGVyci5jb250ZXh0ID0gZXI7XG4gICAgICAgIHRocm93IGVycjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBoYW5kbGVyID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc1VuZGVmaW5lZChoYW5kbGVyKSlcbiAgICByZXR1cm4gZmFsc2U7XG5cbiAgaWYgKGlzRnVuY3Rpb24oaGFuZGxlcikpIHtcbiAgICBzd2l0Y2ggKGFyZ3VtZW50cy5sZW5ndGgpIHtcbiAgICAgIC8vIGZhc3QgY2FzZXNcbiAgICAgIGNhc2UgMTpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMjpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAzOlxuICAgICAgICBoYW5kbGVyLmNhbGwodGhpcywgYXJndW1lbnRzWzFdLCBhcmd1bWVudHNbMl0pO1xuICAgICAgICBicmVhaztcbiAgICAgIC8vIHNsb3dlclxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgICAgIGhhbmRsZXIuYXBwbHkodGhpcywgYXJncyk7XG4gICAgfVxuICB9IGVsc2UgaWYgKGlzT2JqZWN0KGhhbmRsZXIpKSB7XG4gICAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cywgMSk7XG4gICAgbGlzdGVuZXJzID0gaGFuZGxlci5zbGljZSgpO1xuICAgIGxlbiA9IGxpc3RlbmVycy5sZW5ndGg7XG4gICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgbGlzdGVuZXJzW2ldLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmFkZExpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIG07XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIFRvIGF2b2lkIHJlY3Vyc2lvbiBpbiB0aGUgY2FzZSB0aGF0IHR5cGUgPT09IFwibmV3TGlzdGVuZXJcIiEgQmVmb3JlXG4gIC8vIGFkZGluZyBpdCB0byB0aGUgbGlzdGVuZXJzLCBmaXJzdCBlbWl0IFwibmV3TGlzdGVuZXJcIi5cbiAgaWYgKHRoaXMuX2V2ZW50cy5uZXdMaXN0ZW5lcilcbiAgICB0aGlzLmVtaXQoJ25ld0xpc3RlbmVyJywgdHlwZSxcbiAgICAgICAgICAgICAgaXNGdW5jdGlvbihsaXN0ZW5lci5saXN0ZW5lcikgP1xuICAgICAgICAgICAgICBsaXN0ZW5lci5saXN0ZW5lciA6IGxpc3RlbmVyKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAvLyBPcHRpbWl6ZSB0aGUgY2FzZSBvZiBvbmUgbGlzdGVuZXIuIERvbid0IG5lZWQgdGhlIGV4dHJhIGFycmF5IG9iamVjdC5cbiAgICB0aGlzLl9ldmVudHNbdHlwZV0gPSBsaXN0ZW5lcjtcbiAgZWxzZSBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICAvLyBJZiB3ZSd2ZSBhbHJlYWR5IGdvdCBhbiBhcnJheSwganVzdCBhcHBlbmQuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdLnB1c2gobGlzdGVuZXIpO1xuICBlbHNlXG4gICAgLy8gQWRkaW5nIHRoZSBzZWNvbmQgZWxlbWVudCwgbmVlZCB0byBjaGFuZ2UgdG8gYXJyYXkuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gW3RoaXMuX2V2ZW50c1t0eXBlXSwgbGlzdGVuZXJdO1xuXG4gIC8vIENoZWNrIGZvciBsaXN0ZW5lciBsZWFrXG4gIGlmIChpc09iamVjdCh0aGlzLl9ldmVudHNbdHlwZV0pICYmICF0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkKSB7XG4gICAgaWYgKCFpc1VuZGVmaW5lZCh0aGlzLl9tYXhMaXN0ZW5lcnMpKSB7XG4gICAgICBtID0gdGhpcy5fbWF4TGlzdGVuZXJzO1xuICAgIH0gZWxzZSB7XG4gICAgICBtID0gRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnM7XG4gICAgfVxuXG4gICAgaWYgKG0gJiYgbSA+IDAgJiYgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCA+IG0pIHtcbiAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS53YXJuZWQgPSB0cnVlO1xuICAgICAgY29uc29sZS5lcnJvcignKG5vZGUpIHdhcm5pbmc6IHBvc3NpYmxlIEV2ZW50RW1pdHRlciBtZW1vcnkgJyArXG4gICAgICAgICAgICAgICAgICAgICdsZWFrIGRldGVjdGVkLiAlZCBsaXN0ZW5lcnMgYWRkZWQuICcgK1xuICAgICAgICAgICAgICAgICAgICAnVXNlIGVtaXR0ZXIuc2V0TWF4TGlzdGVuZXJzKCkgdG8gaW5jcmVhc2UgbGltaXQuJyxcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5fZXZlbnRzW3R5cGVdLmxlbmd0aCk7XG4gICAgICBpZiAodHlwZW9mIGNvbnNvbGUudHJhY2UgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgLy8gbm90IHN1cHBvcnRlZCBpbiBJRSAxMFxuICAgICAgICBjb25zb2xlLnRyYWNlKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLm9uID0gRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lcjtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbmNlID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIHZhciBmaXJlZCA9IGZhbHNlO1xuXG4gIGZ1bmN0aW9uIGcoKSB7XG4gICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBnKTtcblxuICAgIGlmICghZmlyZWQpIHtcbiAgICAgIGZpcmVkID0gdHJ1ZTtcbiAgICAgIGxpc3RlbmVyLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG5cbiAgZy5saXN0ZW5lciA9IGxpc3RlbmVyO1xuICB0aGlzLm9uKHR5cGUsIGcpO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuLy8gZW1pdHMgYSAncmVtb3ZlTGlzdGVuZXInIGV2ZW50IGlmZiB0aGUgbGlzdGVuZXIgd2FzIHJlbW92ZWRcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUucmVtb3ZlTGlzdGVuZXIgPSBmdW5jdGlvbih0eXBlLCBsaXN0ZW5lcikge1xuICB2YXIgbGlzdCwgcG9zaXRpb24sIGxlbmd0aCwgaTtcblxuICBpZiAoIWlzRnVuY3Rpb24obGlzdGVuZXIpKVxuICAgIHRocm93IFR5cGVFcnJvcignbGlzdGVuZXIgbXVzdCBiZSBhIGZ1bmN0aW9uJyk7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXR1cm4gdGhpcztcblxuICBsaXN0ID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuICBsZW5ndGggPSBsaXN0Lmxlbmd0aDtcbiAgcG9zaXRpb24gPSAtMTtcblxuICBpZiAobGlzdCA9PT0gbGlzdGVuZXIgfHxcbiAgICAgIChpc0Z1bmN0aW9uKGxpc3QubGlzdGVuZXIpICYmIGxpc3QubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgaWYgKHRoaXMuX2V2ZW50cy5yZW1vdmVMaXN0ZW5lcilcbiAgICAgIHRoaXMuZW1pdCgncmVtb3ZlTGlzdGVuZXInLCB0eXBlLCBsaXN0ZW5lcik7XG5cbiAgfSBlbHNlIGlmIChpc09iamVjdChsaXN0KSkge1xuICAgIGZvciAoaSA9IGxlbmd0aDsgaS0tID4gMDspIHtcbiAgICAgIGlmIChsaXN0W2ldID09PSBsaXN0ZW5lciB8fFxuICAgICAgICAgIChsaXN0W2ldLmxpc3RlbmVyICYmIGxpc3RbaV0ubGlzdGVuZXIgPT09IGxpc3RlbmVyKSkge1xuICAgICAgICBwb3NpdGlvbiA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChwb3NpdGlvbiA8IDApXG4gICAgICByZXR1cm4gdGhpcztcblxuICAgIGlmIChsaXN0Lmxlbmd0aCA9PT0gMSkge1xuICAgICAgbGlzdC5sZW5ndGggPSAwO1xuICAgICAgZGVsZXRlIHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgICB9IGVsc2Uge1xuICAgICAgbGlzdC5zcGxpY2UocG9zaXRpb24sIDEpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUFsbExpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIGtleSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHJldHVybiB0aGlzO1xuXG4gIC8vIG5vdCBsaXN0ZW5pbmcgZm9yIHJlbW92ZUxpc3RlbmVyLCBubyBuZWVkIHRvIGVtaXRcbiAgaWYgKCF0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpIHtcbiAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA9PT0gMClcbiAgICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIGVsc2UgaWYgKHRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICAvLyBlbWl0IHJlbW92ZUxpc3RlbmVyIGZvciBhbGwgbGlzdGVuZXJzIG9uIGFsbCBldmVudHNcbiAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApIHtcbiAgICBmb3IgKGtleSBpbiB0aGlzLl9ldmVudHMpIHtcbiAgICAgIGlmIChrZXkgPT09ICdyZW1vdmVMaXN0ZW5lcicpIGNvbnRpbnVlO1xuICAgICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoa2V5KTtcbiAgICB9XG4gICAgdGhpcy5yZW1vdmVBbGxMaXN0ZW5lcnMoJ3JlbW92ZUxpc3RlbmVyJyk7XG4gICAgdGhpcy5fZXZlbnRzID0ge307XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cblxuICBsaXN0ZW5lcnMgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgaWYgKGlzRnVuY3Rpb24obGlzdGVuZXJzKSkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgbGlzdGVuZXJzKTtcbiAgfSBlbHNlIGlmIChsaXN0ZW5lcnMpIHtcbiAgICAvLyBMSUZPIG9yZGVyXG4gICAgd2hpbGUgKGxpc3RlbmVycy5sZW5ndGgpXG4gICAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyc1tsaXN0ZW5lcnMubGVuZ3RoIC0gMV0pO1xuICB9XG4gIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgcmV0dXJuIHRoaXM7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVycyA9IGZ1bmN0aW9uKHR5cGUpIHtcbiAgdmFyIHJldDtcbiAgaWYgKCF0aGlzLl9ldmVudHMgfHwgIXRoaXMuX2V2ZW50c1t0eXBlXSlcbiAgICByZXQgPSBbXTtcbiAgZWxzZSBpZiAoaXNGdW5jdGlvbih0aGlzLl9ldmVudHNbdHlwZV0pKVxuICAgIHJldCA9IFt0aGlzLl9ldmVudHNbdHlwZV1dO1xuICBlbHNlXG4gICAgcmV0ID0gdGhpcy5fZXZlbnRzW3R5cGVdLnNsaWNlKCk7XG4gIHJldHVybiByZXQ7XG59O1xuXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLmxpc3RlbmVyQ291bnQgPSBmdW5jdGlvbih0eXBlKSB7XG4gIGlmICh0aGlzLl9ldmVudHMpIHtcbiAgICB2YXIgZXZsaXN0ZW5lciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICAgIGlmIChpc0Z1bmN0aW9uKGV2bGlzdGVuZXIpKVxuICAgICAgcmV0dXJuIDE7XG4gICAgZWxzZSBpZiAoZXZsaXN0ZW5lcilcbiAgICAgIHJldHVybiBldmxpc3RlbmVyLmxlbmd0aDtcbiAgfVxuICByZXR1cm4gMDtcbn07XG5cbkV2ZW50RW1pdHRlci5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24oZW1pdHRlciwgdHlwZSkge1xuICByZXR1cm4gZW1pdHRlci5saXN0ZW5lckNvdW50KHR5cGUpO1xufTtcblxuZnVuY3Rpb24gaXNGdW5jdGlvbihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdmdW5jdGlvbic7XG59XG5cbmZ1bmN0aW9uIGlzTnVtYmVyKGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ251bWJlcic7XG59XG5cbmZ1bmN0aW9uIGlzT2JqZWN0KGFyZykge1xuICByZXR1cm4gdHlwZW9mIGFyZyA9PT0gJ29iamVjdCcgJiYgYXJnICE9PSBudWxsO1xufVxuXG5mdW5jdGlvbiBpc1VuZGVmaW5lZChhcmcpIHtcbiAgcmV0dXJuIGFyZyA9PT0gdm9pZCAwO1xufVxuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9qc3BhbmVsLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vanNwYW5lbC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vanNwYW5lbC5jc3NcIik7XG5cblx0XHRpZih0eXBlb2YgbmV3Q29udGVudCA9PT0gJ3N0cmluZycpIG5ld0NvbnRlbnQgPSBbW21vZHVsZS5pZCwgbmV3Q29udGVudCwgJyddXTtcblxuXHRcdHZhciBsb2NhbHMgPSAoZnVuY3Rpb24oYSwgYikge1xuXHRcdFx0dmFyIGtleSwgaWR4ID0gMDtcblxuXHRcdFx0Zm9yKGtleSBpbiBhKSB7XG5cdFx0XHRcdGlmKCFiIHx8IGFba2V5XSAhPT0gYltrZXldKSByZXR1cm4gZmFsc2U7XG5cdFx0XHRcdGlkeCsrO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3Ioa2V5IGluIGIpIGlkeC0tO1xuXG5cdFx0XHRyZXR1cm4gaWR4ID09PSAwO1xuXHRcdH0oY29udGVudC5sb2NhbHMsIG5ld0NvbnRlbnQubG9jYWxzKSk7XG5cblx0XHRpZighbG9jYWxzKSB0aHJvdyBuZXcgRXJyb3IoJ0Fib3J0aW5nIENTUyBITVIgZHVlIHRvIGNoYW5nZWQgY3NzLW1vZHVsZXMgbG9jYWxzLicpO1xuXG5cdFx0dXBkYXRlKG5ld0NvbnRlbnQpO1xuXHR9KTtcblxuXHRtb2R1bGUuaG90LmRpc3Bvc2UoZnVuY3Rpb24oKSB7IHVwZGF0ZSgpOyB9KTtcbn0iLCJcInVzZSBzdHJpY3RcIjt2YXIgX3R5cGVvZj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBTeW1ib2wmJlwic3ltYm9sXCI9PXR5cGVvZiBTeW1ib2wuaXRlcmF0b3I/ZnVuY3Rpb24oZSl7cmV0dXJuIHR5cGVvZiBlfTpmdW5jdGlvbihlKXtyZXR1cm4gZSYmXCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZlLmNvbnN0cnVjdG9yPT09U3ltYm9sJiZlIT09U3ltYm9sLnByb3RvdHlwZT9cInN5bWJvbFwiOnR5cGVvZiBlfTtmdW5jdGlvbiBfdG9Db25zdW1hYmxlQXJyYXkoZSl7aWYoQXJyYXkuaXNBcnJheShlKSl7Zm9yKHZhciB0PTAsbj1BcnJheShlLmxlbmd0aCk7dDxlLmxlbmd0aDt0Kyspblt0XT1lW3RdO3JldHVybiBufXJldHVybiBBcnJheS5mcm9tKGUpfWV4cG9ydCB2YXIganNQYW5lbD17dmVyc2lvbjpcIjQuNC4wXCIsZGF0ZTpcIjIwMTgtMTEtMzAgMTA6MzBcIixhamF4QWx3YXlzQ2FsbGJhY2tzOltdLGF1dG9wb3NpdGlvblNwYWNpbmc6NCxjbG9zZU9uRXNjYXBlOnZvaWQgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIixmdW5jdGlvbihlKXtcIkVzY2FwZVwiIT09ZS5rZXkmJlwiRXNjXCIhPT1lLmNvZGUmJjI3IT09ZS5rZXlDb2RlfHxqc1BhbmVsLmdldFBhbmVscyhmdW5jdGlvbigpe3JldHVybiB0aGlzLmNsYXNzTGlzdC5jb250YWlucyhcImpzUGFuZWxcIil9KS5zb21lKGZ1bmN0aW9uKGUpe3JldHVybiEhZS5vcHRpb25zLmNsb3NlT25Fc2NhcGUmJihlLmNsb3NlKCksITApfSl9LCExKSxkZWZhdWx0czp7Ym94U2hhZG93OjMsY29udGFpbmVyOlwid2luZG93XCIsY29udGVudFNpemU6e3dpZHRoOlwiNDAwcHhcIixoZWlnaHQ6XCIyMDBweFwifSxkcmFnaXQ6e2N1cnNvcjpcIm1vdmVcIixoYW5kbGVzOlwiLmpzUGFuZWwtaGVhZGVybG9nbywgLmpzUGFuZWwtdGl0bGViYXIsIC5qc1BhbmVsLWZ0clwiLG9wYWNpdHk6LjgsZGlzYWJsZU9uTWF4aW1pemVkOiEwfSxoZWFkZXI6ITAsaGVhZGVyVGl0bGU6XCJqc1BhbmVsXCIsaGVhZGVyQ29udHJvbHM6XCJhbGxcIixpY29uZm9udDohMSxtYXhpbWl6ZWRNYXJnaW46MCxtaW5pbWl6ZVRvOlwiZGVmYXVsdFwiLHBhbmVsdHlwZTpcInN0YW5kYXJkXCIscG9zaXRpb246XCJjZW50ZXJcIixyZXNpemVpdDp7aGFuZGxlczpcIm4sIGUsIHMsIHcsIG5lLCBzZSwgc3csIG53XCIsbWluV2lkdGg6MTI4LG1pbkhlaWdodDoxMjh9LHRoZW1lOlwiZGVmYXVsdFwifSxkZWZhdWx0U25hcENvbmZpZzp7c2Vuc2l0aXZpdHk6NzAsdHJpZ2dlcjpcInBhbmVsXCJ9LGV4dGVuc2lvbnM6e30sZ2xvYmFsQ2FsbGJhY2tzOiExLGljb25zOntjbG9zZTonPHN2ZyBjbGFzcz1cImpzUGFuZWwtaWNvblwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyOCAyOFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE3Ljc1IDE2bDkuODUtOS44NWMwLjUtMC41IDAuNS0xLjMgMC0xLjc1LTAuNS0wLjUtMS4zLTAuNS0xLjc1IDBsLTkuODUgOS44NS05Ljg1LTkuOWMtMC41LTAuNS0xLjMtMC41LTEuNzUgMC0wLjUgMC41LTAuNSAxLjMgMCAxLjc1bDkuODUgOS45LTkuOSA5Ljg1Yy0wLjUgMC41LTAuNSAxLjMgMCAxLjc1IDAuMjUgMC4yNSAwLjU1IDAuMzUgMC45IDAuMzVzMC42NS0wLjEgMC45LTAuMzVsOS44NS05Ljg1IDkuODUgOS44NWMwLjI1IDAuMjUgMC41NSAwLjM1IDAuOSAwLjM1czAuNjUtMC4xIDAuOS0wLjM1YzAuNS0wLjUgMC41LTEuMyAwLTEuNzVsLTkuOS05Ljg1elwiPjwvcGF0aD48L3N2Zz4nLG1heGltaXplOic8c3ZnIGNsYXNzPVwianNQYW5lbC1pY29uXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI4IDI4XCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjcuNTUgMy45aC0yMi42Yy0wLjU1IDAtMSAwLjQ1LTEgMXYyMi4zYzAgMC41NSAwLjQ1IDEgMSAxaDIyLjU1YzAuNTUgMCAxLTAuNDUgMS0xdi0yMi4zYzAuMDUwLTAuNTUtMC40LTEtMC45NS0xek01Ljk1IDI2LjE1di0xOGgyMC41NXYxOGgtMjAuNTV6XCI+PC9wYXRoPjwvc3ZnPicsbm9ybWFsaXplOic8c3ZnIGNsYXNzPVwianNQYW5lbC1pY29uXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI4IDI4XCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjcuOSAzLjc1aC0xOC44Yy0wLjQgMC0wLjc1IDAuMzUtMC43NSAwLjc1djQuM2MwIDAuMSAwIDAuMiAwLjA1MCAwLjNoLTQuMmMtMC41NSAwLTEgMC40NS0xIDF2MTcuNGMwIDAuNTUgMC40NSAxIDEgMWgxNy42NWMwLjU1IDAgMS0wLjQ1IDEtMXYtMy43YzAuMDUwIDAgMC4xIDAuMDUwIDAuMiAwLjA1MGg0LjljMC40IDAgMC43NS0wLjM1IDAuNzUtMC43NXYtMTguNmMtMC4wNTAtMC40LTAuNC0wLjc1LTAuOC0wLjc1ek01LjIgMjYuNXYtMTIuOTVjMC4wNTAgMCAwLjEgMCAwLjE1IDBoMTUuNGMwLjA1MCAwIDAuMSAwIDAuMTUgMHYxMi45NWgtMTUuN3pNMjcuMTUgMjIuMzVoLTQuMTVjLTAuMDUwIDAtMC4xNSAwLTAuMiAwLjA1MHYtMTIuM2MwLTAuNTUtMC40NS0xLTEtMWgtMTJjMC4wNTAtMC4xIDAuMDUwLTAuMiAwLjA1MC0wLjN2LTMuNTVoMTcuM3YxNy4xelwiPjwvcGF0aD48L3N2Zz4nLG1pbmltaXplOic8c3ZnIGNsYXNzPVwianNQYW5lbC1pY29uXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI4IDI4XCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjcuMyAyOC41aC0yMi42Yy0wLjg1IDAtMS41LTAuNjUtMS41LTEuNXMwLjY1LTEuNSAxLjUtMS41aDIyLjU1YzAuODUgMCAxLjUgMC42NSAxLjUgMS41cy0wLjY1IDEuNS0xLjQ1IDEuNXpcIj48L3BhdGg+PC9zdmc+JyxzbWFsbGlmeXJldjonPHN2ZyBjbGFzcz1cImpzUGFuZWwtaWNvblwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyOCAyOFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTE1Ljk1IDIzLjJjMCAwIDAgMCAwIDAtMC4zNSAwLTAuNjUtMC4xNS0wLjktMC4zNWwtMTEuNy0xMS45Yy0wLjUtMC41LTAuNS0xLjMgMC0xLjc1IDAuNS0wLjUgMS4zLTAuNSAxLjc1IDBsMTAuODUgMTAuOTUgMTAuOS0xMC44YzAuNS0wLjUgMS4zLTAuNSAxLjc1IDBzMC41IDEuMyAwIDEuNzVsLTExLjc1IDExLjdjLTAuMjUgMC4yNS0wLjU1IDAuNC0wLjkgMC40elwiPjwvcGF0aD48L3N2Zz4nLHNtYWxsaWZ5Oic8c3ZnIGNsYXNzPVwianNQYW5lbC1pY29uXCIgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB3aWR0aD1cIjIwXCIgaGVpZ2h0PVwiMjBcIiB2aWV3Qm94PVwiMCAwIDI4IDI4XCI+PHBhdGggZmlsbD1cImN1cnJlbnRDb2xvclwiIGQ9XCJNMjguNjUgMjAuODVsLTExLjgtMTEuNjVjLTAuNS0wLjUtMS4zLTAuNS0xLjc1IDBsLTExLjc1IDExLjg1Yy0wLjUgMC41LTAuNSAxLjMgMCAxLjc1IDAuMjUgMC4yNSAwLjU1IDAuMzUgMC45IDAuMzUgMC4zIDAgMC42NS0wLjEgMC45LTAuMzVsMTAuODUtMTAuOTUgMTAuOSAxMC44YzAuNSAwLjUgMS4zIDAuNSAxLjc1IDAgMC41LTAuNSAwLjUtMS4zIDAtMS44elwiPjwvcGF0aD48L3N2Zz4nfSxpZENvdW50ZXI6MCxpc0lFOm5hdmlnYXRvci5hcHBWZXJzaW9uLm1hdGNoKC9UcmlkZW50LyksbWRidGhlbWVzOltcInNlY29uZGFyeVwiLFwiZWxlZ2FudFwiLFwic3R5bGlzaFwiLFwidW5pcXVlXCIsXCJzcGVjaWFsXCJdLHBvaW50ZXJkb3duOlwib250b3VjaGVuZFwiaW4gd2luZG93P1tcInRvdWNoc3RhcnRcIixcIm1vdXNlZG93blwiXTpbXCJtb3VzZWRvd25cIl0scG9pbnRlcm1vdmU6XCJvbnRvdWNoZW5kXCJpbiB3aW5kb3c/W1widG91Y2htb3ZlXCIsXCJtb3VzZW1vdmVcIl06W1wibW91c2Vtb3ZlXCJdLHBvaW50ZXJ1cDpcIm9udG91Y2hlbmRcImluIHdpbmRvdz9bXCJ0b3VjaGVuZFwiLFwibW91c2V1cFwiXTpbXCJtb3VzZXVwXCJdLHBvbHlmaWxsczooW0VsZW1lbnQucHJvdG90eXBlLERvY3VtZW50LnByb3RvdHlwZSxEb2N1bWVudEZyYWdtZW50LnByb3RvdHlwZV0uZm9yRWFjaChmdW5jdGlvbihlKXtlLmFwcGVuZD1lLmFwcGVuZHx8ZnVuY3Rpb24oKXt2YXIgZT1BcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpLHQ9ZG9jdW1lbnQuY3JlYXRlRG9jdW1lbnRGcmFnbWVudCgpO2UuZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgbj1lIGluc3RhbmNlb2YgTm9kZTt0LmFwcGVuZENoaWxkKG4/ZTpkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShTdHJpbmcoZSkpKX0pLHRoaXMuYXBwZW5kQ2hpbGQodCl9fSksd2luZG93LkVsZW1lbnQmJiFFbGVtZW50LnByb3RvdHlwZS5jbG9zZXN0JiYoRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdD1mdW5jdGlvbihlKXt2YXIgdD0odGhpcy5kb2N1bWVudHx8dGhpcy5vd25lckRvY3VtZW50KS5xdWVyeVNlbGVjdG9yQWxsKGUpLG49dm9pZCAwLG89dGhpcztkb3tmb3Iobj10Lmxlbmd0aDstLW4+PTAmJnQuaXRlbShuKSE9PW87KTt9d2hpbGUobjwwJiYobz1vLnBhcmVudEVsZW1lbnQpKTtyZXR1cm4gb30pLHdpbmRvdy5Ob2RlTGlzdCYmIU5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoJiYoTm9kZUxpc3QucHJvdG90eXBlLmZvckVhY2g9ZnVuY3Rpb24oZSx0KXt0PXR8fHdpbmRvdztmb3IodmFyIG49MDtuPHRoaXMubGVuZ3RoO24rKyllLmNhbGwodCx0aGlzW25dLG4sdGhpcyl9KSxPYmplY3QuYXNzaWdufHxPYmplY3QuZGVmaW5lUHJvcGVydHkoT2JqZWN0LFwiYXNzaWduXCIse2VudW1lcmFibGU6ITEsY29uZmlndXJhYmxlOiEwLHdyaXRhYmxlOiEwLHZhbHVlOmZ1bmN0aW9uKGUpe2lmKG51bGw9PWUpdGhyb3cgbmV3IFR5cGVFcnJvcihcIkNhbm5vdCBjb252ZXJ0IGZpcnN0IGFyZ3VtZW50IHRvIG9iamVjdFwiKTtmb3IodmFyIHQ9T2JqZWN0KGUpLG49MTtuPGFyZ3VtZW50cy5sZW5ndGg7bisrKXt2YXIgbz1hcmd1bWVudHNbbl07aWYobnVsbCE9byl7bz1PYmplY3Qobyk7Zm9yKHZhciBhPU9iamVjdC5rZXlzKE9iamVjdChvKSksaT0wLHI9YS5sZW5ndGg7aTxyO2krKyl7dmFyIGw9YVtpXSxzPU9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IobyxsKTt2b2lkIDAhPT1zJiZzLmVudW1lcmFibGUmJih0W2xdPW9bbF0pfX19cmV0dXJuIHR9fSksZnVuY3Rpb24oKXtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiB3aW5kb3cuQ3VzdG9tRXZlbnQpcmV0dXJuITE7ZnVuY3Rpb24gZShlLHQpe3Q9dHx8e2J1YmJsZXM6ITEsY2FuY2VsYWJsZTohMSxkZXRhaWw6dm9pZCAwfTt2YXIgbj1kb2N1bWVudC5jcmVhdGVFdmVudChcIkN1c3RvbUV2ZW50XCIpO3JldHVybiBuLmluaXRDdXN0b21FdmVudChlLHQuYnViYmxlcyx0LmNhbmNlbGFibGUsdC5kZXRhaWwpLG59ZS5wcm90b3R5cGU9d2luZG93LkV2ZW50LnByb3RvdHlwZSx3aW5kb3cuQ3VzdG9tRXZlbnQ9ZX0oKSxTdHJpbmcucHJvdG90eXBlLmVuZHNXaXRofHwoU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aD1mdW5jdGlvbihlLHQpe3JldHVybiB0PHRoaXMubGVuZ3RoP3R8PTA6dD10aGlzLmxlbmd0aCx0aGlzLnN1YnN0cih0LWUubGVuZ3RoLGUubGVuZ3RoKT09PWV9KSxTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGh8fChTdHJpbmcucHJvdG90eXBlLnN0YXJ0c1dpdGg9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdGhpcy5zdWJzdHIodHx8MCxlLmxlbmd0aCk9PT1lfSksdm9pZChTdHJpbmcucHJvdG90eXBlLmluY2x1ZGVzfHwoU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlcz1mdW5jdGlvbihlLHQpe3JldHVyblwibnVtYmVyXCIhPXR5cGVvZiB0JiYodD0wKSwhKHQrZS5sZW5ndGg+dGhpcy5sZW5ndGgpJiYtMSE9PXRoaXMuaW5kZXhPZihlLHQpfSkpKSx0aGVtZXM6W1wiZGVmYXVsdFwiLFwicHJpbWFyeVwiLFwiaW5mb1wiLFwic3VjY2Vzc1wiLFwid2FybmluZ1wiLFwiZGFuZ2VyXCJdLHppQmFzZToxMDAsY29sb3JMaWdodGVuaW5nRmFjdG9yOi44MSxjb2xvckRhcmtlbmluZ0ZhY3RvcjouNSxjb2xvckJyaWdodG5lc3NUaHJlc2hvbGQ6LjU1LGNvbG9yTmFtZXM6e2FsaWNlYmx1ZTpcImYwZjhmZlwiLGFudGlxdWV3aGl0ZTpcImZhZWJkN1wiLGFxdWE6XCIwZmZcIixhcXVhbWFyaW5lOlwiN2ZmZmQ0XCIsYXp1cmU6XCJmMGZmZmZcIixiZWlnZTpcImY1ZjVkY1wiLGJpc3F1ZTpcImZmZTRjNFwiLGJsYWNrOlwiMDAwXCIsYmxhbmNoZWRhbG1vbmQ6XCJmZmViY2RcIixibHVlOlwiMDBmXCIsYmx1ZXZpb2xldDpcIjhhMmJlMlwiLGJyb3duOlwiYTUyYTJhXCIsYnVybHl3b29kOlwiZGViODg3XCIsY2FkZXRibHVlOlwiNWY5ZWEwXCIsY2hhcnRyZXVzZTpcIjdmZmYwMFwiLGNob2NvbGF0ZTpcImQyNjkxZVwiLGNvcmFsOlwiZmY3ZjUwXCIsY29ybmZsb3dlcmJsdWU6XCI2NDk1ZWRcIixjb3Juc2lsazpcImZmZjhkY1wiLGNyaW1zb246XCJkYzE0M2NcIixjeWFuOlwiMGZmXCIsZGFya2JsdWU6XCIwMDAwOGJcIixkYXJrY3lhbjpcIjAwOGI4YlwiLGRhcmtnb2xkZW5yb2Q6XCJiODg2MGJcIixkYXJrZ3JheTpcImE5YTlhOVwiLGRhcmtncmV5OlwiYTlhOWE5XCIsZGFya2dyZWVuOlwiMDA2NDAwXCIsZGFya2toYWtpOlwiYmRiNzZiXCIsZGFya21hZ2VudGE6XCI4YjAwOGJcIixkYXJrb2xpdmVncmVlbjpcIjU1NmIyZlwiLGRhcmtvcmFuZ2U6XCJmZjhjMDBcIixkYXJrb3JjaGlkOlwiOTkzMmNjXCIsZGFya3JlZDpcIjhiMDAwMFwiLGRhcmtzYWxtb246XCJlOTk2N2FcIixkYXJrc2VhZ3JlZW46XCI4ZmJjOGZcIixkYXJrc2xhdGVibHVlOlwiNDgzZDhiXCIsZGFya3NsYXRlZ3JheTpcIjJmNGY0ZlwiLGRhcmtzbGF0ZWdyZXk6XCIyZjRmNGZcIixkYXJrdHVycXVvaXNlOlwiMDBjZWQxXCIsZGFya3Zpb2xldDpcIjk0MDBkM1wiLGRlZXBwaW5rOlwiZmYxNDkzXCIsZGVlcHNreWJsdWU6XCIwMGJmZmZcIixkaW1ncmF5OlwiNjk2OTY5XCIsZGltZ3JleTpcIjY5Njk2OVwiLGRvZGdlcmJsdWU6XCIxZTkwZmZcIixmaXJlYnJpY2s6XCJiMjIyMjJcIixmbG9yYWx3aGl0ZTpcImZmZmFmMFwiLGZvcmVzdGdyZWVuOlwiMjI4YjIyXCIsZnVjaHNpYTpcImYwZlwiLGdhaW5zYm9ybzpcImRjZGNkY1wiLGdob3N0d2hpdGU6XCJmOGY4ZmZcIixnb2xkOlwiZmZkNzAwXCIsZ29sZGVucm9kOlwiZGFhNTIwXCIsZ3JheTpcIjgwODA4MFwiLGdyZXk6XCI4MDgwODBcIixncmVlbjpcIjAwODAwMFwiLGdyZWVueWVsbG93OlwiYWRmZjJmXCIsaG9uZXlkZXc6XCJmMGZmZjBcIixob3RwaW5rOlwiZmY2OWI0XCIsaW5kaWFucmVkOlwiY2Q1YzVjXCIsaW5kaWdvOlwiNGIwMDgyXCIsaXZvcnk6XCJmZmZmZjBcIixraGFraTpcImYwZTY4Y1wiLGxhdmVuZGVyOlwiZTZlNmZhXCIsbGF2ZW5kZXJibHVzaDpcImZmZjBmNVwiLGxhd25ncmVlbjpcIjdjZmMwMFwiLGxlbW9uY2hpZmZvbjpcImZmZmFjZFwiLGxpZ2h0Ymx1ZTpcImFkZDhlNlwiLGxpZ2h0Y29yYWw6XCJmMDgwODBcIixsaWdodGN5YW46XCJlMGZmZmZcIixsaWdodGdvbGRlbnJvZHllbGxvdzpcImZhZmFkMlwiLGxpZ2h0Z3JheTpcImQzZDNkM1wiLGxpZ2h0Z3JleTpcImQzZDNkM1wiLGxpZ2h0Z3JlZW46XCI5MGVlOTBcIixsaWdodHBpbms6XCJmZmI2YzFcIixsaWdodHNhbG1vbjpcImZmYTA3YVwiLGxpZ2h0c2VhZ3JlZW46XCIyMGIyYWFcIixsaWdodHNreWJsdWU6XCI4N2NlZmFcIixsaWdodHNsYXRlZ3JheTpcIjc4OVwiLGxpZ2h0c2xhdGVncmV5OlwiNzg5XCIsbGlnaHRzdGVlbGJsdWU6XCJiMGM0ZGVcIixsaWdodHllbGxvdzpcImZmZmZlMFwiLGxpbWU6XCIwZjBcIixsaW1lZ3JlZW46XCIzMmNkMzJcIixsaW5lbjpcImZhZjBlNlwiLG1hZ2VudGE6XCJmMGZcIixtYXJvb246XCI4MDAwMDBcIixtZWRpdW1hcXVhbWFyaW5lOlwiNjZjZGFhXCIsbWVkaXVtYmx1ZTpcIjAwMDBjZFwiLG1lZGl1bW9yY2hpZDpcImJhNTVkM1wiLG1lZGl1bXB1cnBsZTpcIjkzNzBkOFwiLG1lZGl1bXNlYWdyZWVuOlwiM2NiMzcxXCIsbWVkaXVtc2xhdGVibHVlOlwiN2I2OGVlXCIsbWVkaXVtc3ByaW5nZ3JlZW46XCIwMGZhOWFcIixtZWRpdW10dXJxdW9pc2U6XCI0OGQxY2NcIixtZWRpdW12aW9sZXRyZWQ6XCJjNzE1ODVcIixtaWRuaWdodGJsdWU6XCIxOTE5NzBcIixtaW50Y3JlYW06XCJmNWZmZmFcIixtaXN0eXJvc2U6XCJmZmU0ZTFcIixtb2NjYXNpbjpcImZmZTRiNVwiLG5hdmFqb3doaXRlOlwiZmZkZWFkXCIsbmF2eTpcIjAwMDA4MFwiLG9sZGxhY2U6XCJmZGY1ZTZcIixvbGl2ZTpcIjgwODAwMFwiLG9saXZlZHJhYjpcIjZiOGUyM1wiLG9yYW5nZTpcImZmYTUwMFwiLG9yYW5nZXJlZDpcImZmNDUwMFwiLG9yY2hpZDpcImRhNzBkNlwiLHBhbGVnb2xkZW5yb2Q6XCJlZWU4YWFcIixwYWxlZ3JlZW46XCI5OGZiOThcIixwYWxldHVycXVvaXNlOlwiYWZlZWVlXCIscGFsZXZpb2xldHJlZDpcImQ4NzA5M1wiLHBhcGF5YXdoaXA6XCJmZmVmZDVcIixwZWFjaHB1ZmY6XCJmZmRhYjlcIixwZXJ1OlwiY2Q4NTNmXCIscGluazpcImZmYzBjYlwiLHBsdW06XCJkZGEwZGRcIixwb3dkZXJibHVlOlwiYjBlMGU2XCIscHVycGxlOlwiODAwMDgwXCIscmViZWNjYXB1cnBsZTpcIjYzOVwiLHJlZDpcImYwMFwiLHJvc3licm93bjpcImJjOGY4ZlwiLHJveWFsYmx1ZTpcIjQxNjllMVwiLHNhZGRsZWJyb3duOlwiOGI0NTEzXCIsc2FsbW9uOlwiZmE4MDcyXCIsc2FuZHlicm93bjpcImY0YTQ2MFwiLHNlYWdyZWVuOlwiMmU4YjU3XCIsc2Vhc2hlbGw6XCJmZmY1ZWVcIixzaWVubmE6XCJhMDUyMmRcIixzaWx2ZXI6XCJjMGMwYzBcIixza3libHVlOlwiODdjZWViXCIsc2xhdGVibHVlOlwiNmE1YWNkXCIsc2xhdGVncmF5OlwiNzA4MDkwXCIsc2xhdGVncmV5OlwiNzA4MDkwXCIsc25vdzpcImZmZmFmYVwiLHNwcmluZ2dyZWVuOlwiMDBmZjdmXCIsc3RlZWxibHVlOlwiNDY4MmI0XCIsdGFuOlwiZDJiNDhjXCIsdGVhbDpcIjAwODA4MFwiLHRoaXN0bGU6XCJkOGJmZDhcIix0b21hdG86XCJmZjYzNDdcIix0dXJxdW9pc2U6XCI0MGUwZDBcIix2aW9sZXQ6XCJlZTgyZWVcIix3aGVhdDpcImY1ZGViM1wiLHdoaXRlOlwiZmZmXCIsd2hpdGVzbW9rZTpcImY1ZjVmNVwiLHllbGxvdzpcImZmMFwiLHllbGxvd2dyZWVuOlwiOWFjZDMyXCIsZ3JleTUwOlwiZmFmYWZhXCIsZ3JheTUwOlwiZmFmYWZhXCIsZ3JleTEwMDpcImY1ZjVmNVwiLGdyYXkxMDA6XCJmNWY1ZjVcIixncmV5MjAwOlwiZWVlXCIsZ3JheTIwMDpcImVlZVwiLGdyZXkzMDA6XCJlMGUwZTBcIixncmF5MzAwOlwiZTBlMGUwXCIsZ3JleTQwMDpcImJkYmRiZFwiLGdyYXk0MDA6XCJiZGJkYmRcIixncmV5NTAwOlwiOWU5ZTllXCIsZ3JheTUwMDpcIjllOWU5ZVwiLGdyZXk2MDA6XCI3NTc1NzVcIixncmF5NjAwOlwiNzU3NTc1XCIsZ3JleTcwMDpcIjYxNjE2MVwiLGdyYXk3MDA6XCI2MTYxNjFcIixncmV5ODAwOlwiNDI0MjQyXCIsZ3JheTgwMDpcIjQyNDI0MlwiLGdyZXk5MDA6XCIyMTIxMjFcIixncmF5OTAwOlwiMjEyMTIxXCIsYmx1ZWdyZXk1MDpcImVjZWZmMVwiLGJsdWVncmF5NTA6XCJlY2VmZjFcIixibHVlZ3JleTEwMDpcIkNGRDhEQ1wiLGJsdWVncmF5MTAwOlwiQ0ZEOERDXCIsYmx1ZWdyZXkyMDA6XCJCMEJFQzVcIixibHVlZ3JheTIwMDpcIkIwQkVDNVwiLGJsdWVncmV5MzAwOlwiOTBBNEFFXCIsYmx1ZWdyYXkzMDA6XCI5MEE0QUVcIixibHVlZ3JleTQwMDpcIjc4OTA5Q1wiLGJsdWVncmF5NDAwOlwiNzg5MDlDXCIsYmx1ZWdyZXk1MDA6XCI2MDdEOEJcIixibHVlZ3JheTUwMDpcIjYwN0Q4QlwiLGJsdWVncmV5NjAwOlwiNTQ2RTdBXCIsYmx1ZWdyYXk2MDA6XCI1NDZFN0FcIixibHVlZ3JleTcwMDpcIjQ1NUE2NFwiLGJsdWVncmF5NzAwOlwiNDU1QTY0XCIsYmx1ZWdyZXk4MDA6XCIzNzQ3NEZcIixibHVlZ3JheTgwMDpcIjM3NDc0RlwiLGJsdWVncmV5OTAwOlwiMjYzMjM4XCIsYmx1ZWdyYXk5MDA6XCIyNjMyMzhcIixyZWQ1MDpcIkZGRUJFRVwiLHJlZDEwMDpcIkZGQ0REMlwiLHJlZDIwMDpcIkVGOUE5QVwiLHJlZDMwMDpcIkU1NzM3M1wiLHJlZDQwMDpcIkVGNTM1MFwiLHJlZDUwMDpcIkY0NDMzNlwiLHJlZDYwMDpcIkU1MzkzNVwiLHJlZDcwMDpcIkQzMkYyRlwiLHJlZDgwMDpcIkM2MjgyOFwiLHJlZDkwMDpcIkI3MUMxQ1wiLHJlZGExMDA6XCJGRjhBODBcIixyZWRhMjAwOlwiRkY1MjUyXCIscmVkYTQwMDpcIkZGMTc0NFwiLHJlZGE3MDA6XCJENTAwMDBcIixwaW5rNTA6XCJGQ0U0RUNcIixwaW5rMTAwOlwiRjhCQkQwXCIscGluazIwMDpcIkY0OEZCMVwiLHBpbmszMDA6XCJGMDYyOTJcIixwaW5rNDAwOlwiRUM0MDdBXCIscGluazUwMDpcIkU5MUU2M1wiLHBpbms2MDA6XCJEODFCNjBcIixwaW5rNzAwOlwiQzIxODVCXCIscGluazgwMDpcIkFEMTQ1N1wiLHBpbms5MDA6XCI4ODBFNEZcIixwaW5rYTEwMDpcIkZGODBBQlwiLHBpbmthMjAwOlwiRkY0MDgxXCIscGlua2E0MDA6XCJGNTAwNTdcIixwaW5rYTcwMDpcIkM1MTE2MlwiLHB1cnBsZTUwOlwiRjNFNUY1XCIscHVycGxlMTAwOlwiRTFCRUU3XCIscHVycGxlMjAwOlwiQ0U5M0Q4XCIscHVycGxlMzAwOlwiQkE2OEM4XCIscHVycGxlNDAwOlwiQUI0N0JDXCIscHVycGxlNTAwOlwiOUMyN0IwXCIscHVycGxlNjAwOlwiOEUyNEFBXCIscHVycGxlNzAwOlwiN0IxRkEyXCIscHVycGxlODAwOlwiNkExQjlBXCIscHVycGxlOTAwOlwiNEExNDhDXCIscHVycGxlYTEwMDpcIkVBODBGQ1wiLHB1cnBsZWEyMDA6XCJFMDQwRkJcIixwdXJwbGVhNDAwOlwiRDUwMEY5XCIscHVycGxlYTcwMDpcIkFBMDBGRlwiLGRlZXBwdXJwbGU1MDpcIkVERTdGNlwiLGRlZXBwdXJwbGUxMDA6XCJEMUM0RTlcIixkZWVwcHVycGxlMjAwOlwiQjM5RERCXCIsZGVlcHB1cnBsZTMwMDpcIjk1NzVDRFwiLGRlZXBwdXJwbGU0MDA6XCI3RTU3QzJcIixkZWVwcHVycGxlNTAwOlwiNjczQUI3XCIsZGVlcHB1cnBsZTYwMDpcIjVFMzVCMVwiLGRlZXBwdXJwbGU3MDA6XCI1MTJEQThcIixkZWVwcHVycGxlODAwOlwiNDUyN0EwXCIsZGVlcHB1cnBsZTkwMDpcIjMxMUI5MlwiLGRlZXBwdXJwbGVhMTAwOlwiQjM4OEZGXCIsZGVlcHB1cnBsZWEyMDA6XCI3QzRERkZcIixkZWVwcHVycGxlYTQwMDpcIjY1MUZGRlwiLGRlZXBwdXJwbGVhNzAwOlwiNjIwMEVBXCIsaW5kaWdvNTA6XCJFOEVBRjZcIixpbmRpZ28xMDA6XCJDNUNBRTlcIixpbmRpZ28yMDA6XCI5RkE4REFcIixpbmRpZ28zMDA6XCI3OTg2Q0JcIixpbmRpZ280MDA6XCI1QzZCQzBcIixpbmRpZ281MDA6XCIzRjUxQjVcIixpbmRpZ282MDA6XCIzOTQ5QUJcIixpbmRpZ283MDA6XCIzMDNGOUZcIixpbmRpZ284MDA6XCIyODM1OTNcIixpbmRpZ285MDA6XCIxQTIzN0VcIixpbmRpZ29hMTAwOlwiOEM5RUZGXCIsaW5kaWdvYTIwMDpcIjUzNkRGRVwiLGluZGlnb2E0MDA6XCIzRDVBRkVcIixpbmRpZ29hNzAwOlwiMzA0RkZFXCIsYmx1ZTUwOlwiRTNGMkZEXCIsYmx1ZTEwMDpcIkJCREVGQlwiLGJsdWUyMDA6XCI5MENBRjlcIixibHVlMzAwOlwiNjRCNUY2XCIsYmx1ZTQwMDpcIjQyQTVGNVwiLGJsdWU1MDA6XCIyMTk2RjNcIixibHVlNjAwOlwiMUU4OEU1XCIsYmx1ZTcwMDpcIjE5NzZEMlwiLGJsdWU4MDA6XCIxNTY1QzBcIixibHVlOTAwOlwiMEQ0N0ExXCIsYmx1ZWExMDA6XCI4MkIxRkZcIixibHVlYTIwMDpcIjQ0OEFGRlwiLGJsdWVhNDAwOlwiMjk3OUZGXCIsYmx1ZWE3MDA6XCIyOTYyRkZcIixsaWdodGJsdWU1MDpcIkUxRjVGRVwiLGxpZ2h0Ymx1ZTEwMDpcIkIzRTVGQ1wiLGxpZ2h0Ymx1ZTIwMDpcIjgxRDRGQVwiLGxpZ2h0Ymx1ZTMwMDpcIjRGQzNGN1wiLGxpZ2h0Ymx1ZTQwMDpcIjI5QjZGNlwiLGxpZ2h0Ymx1ZTUwMDpcIjAzQTlGNFwiLGxpZ2h0Ymx1ZTYwMDpcIjAzOUJFNVwiLGxpZ2h0Ymx1ZTcwMDpcIjAyODhEMVwiLGxpZ2h0Ymx1ZTgwMDpcIjAyNzdCRFwiLGxpZ2h0Ymx1ZTkwMDpcIjAxNTc5QlwiLGxpZ2h0Ymx1ZWExMDA6XCI4MEQ4RkZcIixsaWdodGJsdWVhMjAwOlwiNDBDNEZGXCIsbGlnaHRibHVlYTQwMDpcIjAwQjBGRlwiLGxpZ2h0Ymx1ZWE3MDA6XCIwMDkxRUFcIixjeWFuNTA6XCJFMEY3RkFcIixjeWFuMTAwOlwiQjJFQkYyXCIsY3lhbjIwMDpcIjgwREVFQVwiLGN5YW4zMDA6XCI0REQwRTFcIixjeWFuNDAwOlwiMjZDNkRBXCIsY3lhbjUwMDpcIjAwQkNENFwiLGN5YW42MDA6XCIwMEFDQzFcIixjeWFuNzAwOlwiMDA5N0E3XCIsY3lhbjgwMDpcIjAwODM4RlwiLGN5YW45MDA6XCIwMDYwNjRcIixjeWFuYTEwMDpcIjg0RkZGRlwiLGN5YW5hMjAwOlwiMThGRkZGXCIsY3lhbmE0MDA6XCIwMEU1RkZcIixjeWFuYTcwMDpcIjAwQjhENFwiLHRlYWw1MDpcIkUwRjJGMVwiLHRlYWwxMDA6XCJCMkRGREJcIix0ZWFsMjAwOlwiODBDQkM0XCIsdGVhbDMwMDpcIjREQjZBQ1wiLHRlYWw0MDA6XCIyNkE2OUFcIix0ZWFsNTAwOlwiMDA5Njg4XCIsdGVhbDYwMDpcIjAwODk3QlwiLHRlYWw3MDA6XCIwMDc5NkJcIix0ZWFsODAwOlwiMDA2OTVDXCIsdGVhbDkwMDpcIjAwNEQ0MFwiLHRlYWxhMTAwOlwiQTdGRkVCXCIsdGVhbGEyMDA6XCI2NEZGREFcIix0ZWFsYTQwMDpcIjFERTlCNlwiLHRlYWxhNzAwOlwiMDBCRkE1XCIsZ3JlZW41MDpcIkU4RjVFOVwiLGdyZWVuMTAwOlwiQzhFNkM5XCIsZ3JlZW4yMDA6XCJBNUQ2QTdcIixncmVlbjMwMDpcIjgxQzc4NFwiLGdyZWVuNDAwOlwiNjZCQjZBXCIsZ3JlZW41MDA6XCI0Q0FGNTBcIixncmVlbjYwMDpcIjQzQTA0N1wiLGdyZWVuNzAwOlwiMzg4RTNDXCIsZ3JlZW44MDA6XCIyRTdEMzJcIixncmVlbjkwMDpcIjFCNUUyMFwiLGdyZWVuYTEwMDpcIkI5RjZDQVwiLGdyZWVuYTIwMDpcIjY5RjBBRVwiLGdyZWVuYTQwMDpcIjAwRTY3NlwiLGdyZWVuYTcwMDpcIjAwQzg1M1wiLGxpZ2h0Z3JlZW41MDpcIkYxRjhFOVwiLGxpZ2h0Z3JlZW4xMDA6XCJEQ0VEQzhcIixsaWdodGdyZWVuMjAwOlwiQzVFMUE1XCIsbGlnaHRncmVlbjMwMDpcIkFFRDU4MVwiLGxpZ2h0Z3JlZW40MDA6XCI5Q0NDNjVcIixsaWdodGdyZWVuNTAwOlwiOEJDMzRBXCIsbGlnaHRncmVlbjYwMDpcIjdDQjM0MlwiLGxpZ2h0Z3JlZW43MDA6XCI2ODlGMzhcIixsaWdodGdyZWVuODAwOlwiNTU4QjJGXCIsbGlnaHRncmVlbjkwMDpcIjMzNjkxRVwiLGxpZ2h0Z3JlZW5hMTAwOlwiQ0NGRjkwXCIsbGlnaHRncmVlbmEyMDA6XCJCMkZGNTlcIixsaWdodGdyZWVuYTQwMDpcIjc2RkYwM1wiLGxpZ2h0Z3JlZW5hNzAwOlwiNjRERDE3XCIsbGltZTUwOlwiRjlGQkU3XCIsbGltZTEwMDpcIkYwRjRDM1wiLGxpbWUyMDA6XCJFNkVFOUNcIixsaW1lMzAwOlwiRENFNzc1XCIsbGltZTQwMDpcIkQ0RTE1N1wiLGxpbWU1MDA6XCJDRERDMzlcIixsaW1lNjAwOlwiQzBDQTMzXCIsbGltZTcwMDpcIkFGQjQyQlwiLGxpbWU4MDA6XCI5RTlEMjRcIixsaW1lOTAwOlwiODI3NzE3XCIsbGltZWExMDA6XCJGNEZGODFcIixsaW1lYTIwMDpcIkVFRkY0MVwiLGxpbWVhNDAwOlwiQzZGRjAwXCIsbGltZWE3MDA6XCJBRUVBMDBcIix5ZWxsb3c1MDpcIkZGRkRFN1wiLHllbGxvdzEwMDpcIkZGRjlDNFwiLHllbGxvdzIwMDpcIkZGRjU5RFwiLHllbGxvdzMwMDpcIkZGRjE3NlwiLHllbGxvdzQwMDpcIkZGRUU1OFwiLHllbGxvdzUwMDpcIkZGRUIzQlwiLHllbGxvdzYwMDpcIkZERDgzNVwiLHllbGxvdzcwMDpcIkZCQzAyRFwiLHllbGxvdzgwMDpcIkY5QTgyNVwiLHllbGxvdzkwMDpcIkY1N0YxN1wiLHllbGxvd2ExMDA6XCJGRkZGOERcIix5ZWxsb3dhMjAwOlwiRkZGRjAwXCIseWVsbG93YTQwMDpcIkZGRUEwMFwiLHllbGxvd2E3MDA6XCJGRkQ2MDBcIixhbWJlcjUwOlwiRkZGOEUxXCIsYW1iZXIxMDA6XCJGRkVDQjNcIixhbWJlcjIwMDpcIkZGRTA4MlwiLGFtYmVyMzAwOlwiRkZENTRGXCIsYW1iZXI0MDA6XCJGRkNBMjhcIixhbWJlcjUwMDpcIkZGQzEwN1wiLGFtYmVyNjAwOlwiRkZCMzAwXCIsYW1iZXI3MDA6XCJGRkEwMDBcIixhbWJlcjgwMDpcIkZGOEYwMFwiLGFtYmVyOTAwOlwiRkY2RjAwXCIsYW1iZXJhMTAwOlwiRkZFNTdGXCIsYW1iZXJhMjAwOlwiRkZENzQwXCIsYW1iZXJhNDAwOlwiRkZDNDAwXCIsYW1iZXJhNzAwOlwiRkZBQjAwXCIsb3JhbmdlNTA6XCJGRkYzRTBcIixvcmFuZ2UxMDA6XCJGRkUwQjJcIixvcmFuZ2UyMDA6XCJGRkNDODBcIixvcmFuZ2UzMDA6XCJGRkI3NERcIixvcmFuZ2U0MDA6XCJGRkE3MjZcIixvcmFuZ2U1MDA6XCJGRjk4MDBcIixvcmFuZ2U2MDA6XCJGQjhDMDBcIixvcmFuZ2U3MDA6XCJGNTdDMDBcIixvcmFuZ2U4MDA6XCJFRjZDMDBcIixvcmFuZ2U5MDA6XCJFNjUxMDBcIixvcmFuZ2VhMTAwOlwiRkZEMTgwXCIsb3JhbmdlYTIwMDpcIkZGQUI0MFwiLG9yYW5nZWE0MDA6XCJGRjkxMDBcIixvcmFuZ2VhNzAwOlwiRkY2RDAwXCIsZGVlcG9yYW5nZTUwOlwiRkJFOUU3XCIsZGVlcG9yYW5nZTEwMDpcIkZGQ0NCQ1wiLGRlZXBvcmFuZ2UyMDA6XCJGRkFCOTFcIixkZWVwb3JhbmdlMzAwOlwiRkY4QTY1XCIsZGVlcG9yYW5nZTQwMDpcIkZGNzA0M1wiLGRlZXBvcmFuZ2U1MDA6XCJGRjU3MjJcIixkZWVwb3JhbmdlNjAwOlwiRjQ1MTFFXCIsZGVlcG9yYW5nZTcwMDpcIkU2NEExOVwiLGRlZXBvcmFuZ2U4MDA6XCJEODQzMTVcIixkZWVwb3JhbmdlOTAwOlwiQkYzNjBDXCIsZGVlcG9yYW5nZWExMDA6XCJGRjlFODBcIixkZWVwb3JhbmdlYTIwMDpcIkZGNkU0MFwiLGRlZXBvcmFuZ2VhNDAwOlwiRkYzRDAwXCIsZGVlcG9yYW5nZWE3MDA6XCJERDJDMDBcIixicm93bjUwOlwiRUZFQkU5XCIsYnJvd24xMDA6XCJEN0NDQzhcIixicm93bjIwMDpcIkJDQUFBNFwiLGJyb3duMzAwOlwiQTE4ODdGXCIsYnJvd240MDA6XCI4RDZFNjNcIixicm93bjUwMDpcIjc5NTU0OFwiLGJyb3duNjAwOlwiNkQ0QzQxXCIsYnJvd243MDA6XCI1RDQwMzdcIixicm93bjgwMDpcIjRFMzQyRVwiLGJyb3duOTAwOlwiM0UyNzIzXCJ9LGNvbG9yOmZ1bmN0aW9uKGUpe3ZhciB0PWUudG9Mb3dlckNhc2UoKSxuPXZvaWQgMCxvPXZvaWQgMCxhPXZvaWQgMCxpPXZvaWQgMCxyPXZvaWQgMCxsPXZvaWQgMCxzPXZvaWQgMCxjPXZvaWQgMCxkPXZvaWQgMCxwPXt9LGY9L15yZ2JhP1xcKChbMC05XXsxLDN9KSwoWzAtOV17MSwzfSksKFswLTldezEsM30pLD8oMHwxfDBcXC5bMC05XXsxLDJ9fFxcLlswLTldezEsMn0pP1xcKSQvZ2ksaD0vXmhzbGE/XFwoKFswLTldezEsM30pLChbMC05XXsxLDN9JSksKFswLTldezEsM30lKSw/KDB8MXwwXFwuWzAtOV17MSwyfXxcXC5bMC05XXsxLDJ9KT9cXCkkL2dpLHU9dGhpcy5jb2xvck5hbWVzO3JldHVybiB1W3RdJiYodD11W3RdKSxudWxsIT09dC5tYXRjaCgvXiM/KFswLTlhLWZdezN9fFswLTlhLWZdezZ9KSQvZ2kpPyh0PXQucmVwbGFjZShcIiNcIixcIlwiKSx0Lmxlbmd0aCUyPT0xPyhuPVN0cmluZyh0LnN1YnN0cigwLDEpKSt0LnN1YnN0cigwLDEpLG89U3RyaW5nKHQuc3Vic3RyKDEsMSkpK3Quc3Vic3RyKDEsMSksYT1TdHJpbmcodC5zdWJzdHIoMiwxKSkrdC5zdWJzdHIoMiwxKSxwLnJnYj17cjpwYXJzZUludChuLDE2KSxnOnBhcnNlSW50KG8sMTYpLGI6cGFyc2VJbnQoYSwxNil9LHAuaGV4PVwiI1wiK24rbythKToocC5yZ2I9e3I6cGFyc2VJbnQodC5zdWJzdHIoMCwyKSwxNiksZzpwYXJzZUludCh0LnN1YnN0cigyLDIpLDE2KSxiOnBhcnNlSW50KHQuc3Vic3RyKDQsMiksMTYpfSxwLmhleD1cIiNcIit0KSxkPXRoaXMucmdiVG9Ic2wocC5yZ2IucixwLnJnYi5nLHAucmdiLmIpLHAuaHNsPWQscC5yZ2IuY3NzPVwicmdiKFwiK3AucmdiLnIrXCIsXCIrcC5yZ2IuZytcIixcIitwLnJnYi5iK1wiKVwiKTp0Lm1hdGNoKGYpPyhzPWYuZXhlYyh0KSxwLnJnYj17Y3NzOnQscjpzWzFdLGc6c1syXSxiOnNbM119LHAuaGV4PXRoaXMucmdiVG9IZXgoc1sxXSxzWzJdLHNbM10pLGQ9dGhpcy5yZ2JUb0hzbChzWzFdLHNbMl0sc1szXSkscC5oc2w9ZCk6dC5tYXRjaChoKT8oaT0ocz1oLmV4ZWModCkpWzFdLzM2MCxyPXNbMl0uc3Vic3RyKDAsc1syXS5sZW5ndGgtMSkvMTAwLGw9c1szXS5zdWJzdHIoMCxzWzNdLmxlbmd0aC0xKS8xMDAsYz10aGlzLmhzbFRvUmdiKGkscixsKSxwLnJnYj17Y3NzOlwicmdiKFwiK2NbMF0rXCIsXCIrY1sxXStcIixcIitjWzJdK1wiKVwiLHI6Y1swXSxnOmNbMV0sYjpjWzJdfSxwLmhleD10aGlzLnJnYlRvSGV4KHAucmdiLnIscC5yZ2IuZyxwLnJnYi5iKSxwLmhzbD17Y3NzOlwiaHNsKFwiK3NbMV0rXCIsXCIrc1syXStcIixcIitzWzNdK1wiKVwiLGg6c1sxXSxzOnNbMl0sbDpzWzNdfSk6KHAuaGV4PVwiI2Y1ZjVmNVwiLHAucmdiPXtjc3M6XCJyZ2IoMjQ1LDI0NSwyNDUpXCIscjoyNDUsZzoyNDUsYjoyNDV9LHAuaHNsPXtjc3M6XCJoc2woMCwwJSw5NiUpXCIsaDowLHM6XCIwJVwiLGw6XCI5NiVcIn0pLHB9LGNhbGNDb2xvcnM6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5jb2xvckJyaWdodG5lc3NUaHJlc2hvbGQsbj10aGlzLmNvbG9yKGUpLG89dGhpcy5saWdodGVuKGUsdGhpcy5jb2xvckxpZ2h0ZW5pbmdGYWN0b3IpLGE9dGhpcy5kYXJrZW4oZSx0aGlzLmNvbG9yRGFya2VuaW5nRmFjdG9yKSxpPXRoaXMucGVyY2VpdmVkQnJpZ2h0bmVzcyhlKTw9dD9cIiNmZmZmZmZcIjpcIiMwMDAwMDBcIixyPXRoaXMucGVyY2VpdmVkQnJpZ2h0bmVzcyhvKTw9dD9cIiNmZmZmZmZcIjpcIiMwMDAwMDBcIixsPXRoaXMucGVyY2VpdmVkQnJpZ2h0bmVzcyhhKTw9dD9cIiNmZmZmZmZcIjpcIiMwMDAwMDBcIjtyZXR1cm5bbi5oc2wuY3NzLG8sYSxpLHIsbF19LGRhcmtlbjpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMuY29sb3IoZSkuaHNsLG89cGFyc2VGbG9hdChuLmwpLGE9TWF0aC5yb3VuZChvLW8qdCkrXCIlXCI7cmV0dXJuXCJoc2woXCIrbi5oK1wiLFwiK24ucytcIixcIithK1wiKVwifSxsaWdodGVuOmZ1bmN0aW9uKGUsdCl7dmFyIG49dGhpcy5jb2xvcihlKS5oc2wsbz1wYXJzZUZsb2F0KG4ubCksYT1NYXRoLnJvdW5kKG8rKDEwMC1vKSp0KStcIiVcIjtyZXR1cm5cImhzbChcIituLmgrXCIsXCIrbi5zK1wiLFwiK2ErXCIpXCJ9LGhzbFRvUmdiOmZ1bmN0aW9uKGUsdCxuKXt2YXIgbz12b2lkIDAsYT12b2lkIDAsaT12b2lkIDA7aWYoMD09PXQpbz1hPWk9bjtlbHNle3ZhciByPWZ1bmN0aW9uKGUsdCxuKXtyZXR1cm4gbjwwJiYobis9MSksbj4xJiYobi09MSksbjwxLzY/ZSs2Kih0LWUpKm46bjwuNT90Om48Mi8zP2UrKHQtZSkqKDIvMy1uKSo2OmV9LGw9bjwuNT9uKigxK3QpOm4rdC1uKnQscz0yKm4tbDtvPXIocyxsLGUrMS8zKSxhPXIocyxsLGUpLGk9cihzLGwsZS0xLzMpfXJldHVybltNYXRoLnJvdW5kKDI1NSpvKSxNYXRoLnJvdW5kKDI1NSphKSxNYXRoLnJvdW5kKDI1NSppKV19LHJnYlRvSHNsOmZ1bmN0aW9uKGUsdCxuKXtlLz0yNTUsdC89MjU1LG4vPTI1NTt2YXIgbz1NYXRoLm1heChlLHQsbiksYT1NYXRoLm1pbihlLHQsbiksaT12b2lkIDAscj12b2lkIDAsbD0obythKS8yO2lmKG89PT1hKWk9cj0wO2Vsc2V7dmFyIHM9by1hO3N3aXRjaChyPWw+LjU/cy8oMi1vLWEpOnMvKG8rYSksbyl7Y2FzZSBlOmk9KHQtbikvcysodDxuPzY6MCk7YnJlYWs7Y2FzZSB0Omk9KG4tZSkvcysyO2JyZWFrO2Nhc2UgbjppPShlLXQpL3MrNH1pLz02fXJldHVybntjc3M6XCJoc2woXCIrKGk9TWF0aC5yb3VuZCgzNjAqaSkpK1wiLFwiKyhyPU1hdGgucm91bmQoMTAwKnIpK1wiJVwiKStcIixcIisobD1NYXRoLnJvdW5kKDEwMCpsKStcIiVcIikrXCIpXCIsaDppLHM6cixsOmx9fSxyZ2JUb0hleDpmdW5jdGlvbihlLHQsbil7dmFyIG89TnVtYmVyKGUpLnRvU3RyaW5nKDE2KSxhPU51bWJlcih0KS50b1N0cmluZygxNiksaT1OdW1iZXIobikudG9TdHJpbmcoMTYpO3JldHVybiAxPT09by5sZW5ndGgmJihvPVwiMFwiK28pLDE9PT1hLmxlbmd0aCYmKGE9XCIwXCIrYSksMT09PWkubGVuZ3RoJiYoaT1cIjBcIitpKSxcIiNcIitvK2EraX0scGVyY2VpdmVkQnJpZ2h0bmVzczpmdW5jdGlvbihlKXt2YXIgdD10aGlzLmNvbG9yKGUpLnJnYjtyZXR1cm4gdC5yLzI1NSouMjEyNit0LmcvMjU1Ki43MTUyK3QuYi8yNTUqLjA3MjJ9LGFkZFNjcmlwdDpmdW5jdGlvbihlKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06XCJ0ZXh0L2phdmFzY3JpcHRcIixuPWFyZ3VtZW50c1syXSxvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIik7by5vbmxvYWQ9bixvLnNyYz1lLG8udHlwZT10LGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobyl9LGFqYXg6ZnVuY3Rpb24gYWpheChvYmosYWpheENvbmZpZyl7dmFyIG9iaklzUGFuZWw9dm9pZCAwO1wib2JqZWN0XCI9PT0odm9pZCAwPT09b2JqP1widW5kZWZpbmVkXCI6X3R5cGVvZihvYmopKSYmb2JqLmNsYXNzTGlzdC5jb250YWlucyhcImpzUGFuZWxcIik/b2JqSXNQYW5lbD0hMDoob2JqSXNQYW5lbD0hMSxcInN0cmluZ1wiPT10eXBlb2Ygb2JqJiYob2JqPWRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Iob2JqKSkpO3ZhciBjb25mPWFqYXhDb25maWcsY29uZmlnRGVmYXVsdHM9e21ldGhvZDpcIkdFVFwiLGFzeW5jOiEwLHVzZXI6XCJcIixwd2Q6XCJcIixkb25lOmZ1bmN0aW9uKCl7b2JqSXNQYW5lbD9vYmouY29udGVudC5pbm5lckhUTUw9dGhpcy5yZXNwb25zZVRleHQ6b2JqLmlubmVySFRNTD10aGlzLnJlc3BvbnNlVGV4dH0sYXV0b3Jlc2l6ZTohMCxhdXRvcmVwb3NpdGlvbjohMH0sY29uZmlnPXZvaWQgMDtpZihcInN0cmluZ1wiPT10eXBlb2YgY29uZiljb25maWc9T2JqZWN0LmFzc2lnbih7fSxjb25maWdEZWZhdWx0cyx7dXJsOmVuY29kZVVSSShjb25mKSxldmFsc2NyaXB0dGFnczohMH0pO2Vsc2V7aWYoXCJvYmplY3RcIiE9PSh2b2lkIDA9PT1jb25mP1widW5kZWZpbmVkXCI6X3R5cGVvZihjb25mKSl8fCFjb25mLnVybClyZXR1cm4gY29uc29sZS5pbmZvKFwiWE1MSHR0cFJlcXVlc3Qgc2VlbXMgdG8gbWlzcyB0aGUgcmVxdWVzdCB1cmwhXCIpLG9iajtjb25maWc9T2JqZWN0LmFzc2lnbih7fSxjb25maWdEZWZhdWx0cyxjb25mKSxjb25maWcudXJsPWVuY29kZVVSSShjb25mLnVybCksITE9PT1jb25maWcuYXN5bmMmJihjb25maWcudGltZW91dD0wLGNvbmZpZy53aXRoQ3JlZGVudGlhbHMmJihjb25maWcud2l0aENyZWRlbnRpYWxzPXZvaWQgMCksY29uZmlnLnJlc3BvbnNlVHlwZSYmKGNvbmZpZy5yZXNwb25zZVR5cGU9dm9pZCAwKSl9dmFyIHhocj1uZXcgWE1MSHR0cFJlcXVlc3Q7cmV0dXJuIHhoci5vbnJlYWR5c3RhdGVjaGFuZ2U9ZnVuY3Rpb24oKXtpZig0PT09eGhyLnJlYWR5U3RhdGUpe2lmKDIwMD09PXhoci5zdGF0dXMpe2lmKGNvbmZpZy5kb25lLmNhbGwoeGhyLG9iaiksY29uZmlnLmV2YWxzY3JpcHR0YWdzKXt2YXIgc2NyaXB0dGFncz14aHIucmVzcG9uc2VUZXh0Lm1hdGNoKC88c2NyaXB0XFxiW14+XSo+KFtcXHNcXFNdKj8pPFxcL3NjcmlwdD4vZ2kpO3NjcmlwdHRhZ3MmJnNjcmlwdHRhZ3MuZm9yRWFjaChmdW5jdGlvbih0YWcpe3ZhciBqcz10YWcucmVwbGFjZSgvPHNjcmlwdFxcYltePl0qPi9pLFwiXCIpLnJlcGxhY2UoLzxcXC9zY3JpcHQ+L2ksXCJcIikudHJpbSgpO2V2YWwoanMpfSl9fWVsc2UgY29uZmlnLmZhaWwmJmNvbmZpZy5mYWlsLmNhbGwoeGhyLG9iaik7aWYoY29uZmlnLmFsd2F5cyYmY29uZmlnLmFsd2F5cy5jYWxsKHhocixvYmopLG9iaklzUGFuZWwpe3ZhciBvQ29udGVudFNpemU9b2JqLm9wdGlvbnMuY29udGVudFNpemU7aWYoXCJzdHJpbmdcIj09dHlwZW9mIG9Db250ZW50U2l6ZSYmb0NvbnRlbnRTaXplLm1hdGNoKC9hdXRvL2kpKXt2YXIgcGFydHM9b0NvbnRlbnRTaXplLnNwbGl0KFwiIFwiKSxzaXplcz1PYmplY3QuYXNzaWduKHt9LHt3aWR0aDpwYXJ0c1swXSxoZWlnaHQ6cGFydHNbMV19KTtjb25maWcuYXV0b3Jlc2l6ZSYmb2JqLnJlc2l6ZShzaXplcyksb2JqLmNsYXNzTGlzdC5jb250YWlucyhcImpzUGFuZWwtY29udGV4dG1lbnVcIil8fGNvbmZpZy5hdXRvcmVwb3NpdGlvbiYmb2JqLnJlcG9zaXRpb24oKX1lbHNlIGlmKFwib2JqZWN0XCI9PT0odm9pZCAwPT09b0NvbnRlbnRTaXplP1widW5kZWZpbmVkXCI6X3R5cGVvZihvQ29udGVudFNpemUpKSYmKFwiYXV0b1wiPT09b0NvbnRlbnRTaXplLndpZHRofHxcImF1dG9cIj09PW9Db250ZW50U2l6ZS5oZWlnaHQpKXt2YXIgX3NpemVzPU9iamVjdC5hc3NpZ24oe30sb0NvbnRlbnRTaXplKTtjb25maWcuYXV0b3Jlc2l6ZSYmb2JqLnJlc2l6ZShfc2l6ZXMpLG9iai5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsLWNvbnRleHRtZW51XCIpfHxjb25maWcuYXV0b3JlcG9zaXRpb24mJm9iai5yZXBvc2l0aW9uKCl9fWpzUGFuZWwuYWpheEFsd2F5c0NhbGxiYWNrcy5sZW5ndGgmJmpzUGFuZWwuYWpheEFsd2F5c0NhbGxiYWNrcy5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UuY2FsbChvYmosb2JqKX0pfX0seGhyLm9wZW4oY29uZmlnLm1ldGhvZCxjb25maWcudXJsLGNvbmZpZy5hc3luYyxjb25maWcudXNlcixjb25maWcucHdkKSx4aHIudGltZW91dD1jb25maWcudGltZW91dHx8MCxjb25maWcud2l0aENyZWRlbnRpYWxzJiYoeGhyLndpdGhDcmVkZW50aWFscz1jb25maWcud2l0aENyZWRlbnRpYWxzKSxjb25maWcucmVzcG9uc2VUeXBlJiYoeGhyLnJlc3BvbnNlVHlwZT1jb25maWcucmVzcG9uc2VUeXBlKSxjb25maWcuYmVmb3JlU2VuZCYmY29uZmlnLmJlZm9yZVNlbmQuY2FsbCh4aHIpLGNvbmZpZy5kYXRhP3hoci5zZW5kKGNvbmZpZy5kYXRhKTp4aHIuc2VuZChudWxsKSxvYmp9LGNyZWF0ZVBhbmVsVGVtcGxhdGU6ZnVuY3Rpb24oKXt2YXIgZT0hKGFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdKXx8YXJndW1lbnRzWzBdLHQ9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gdC5jbGFzc05hbWU9XCJqc1BhbmVsXCIsZSYmW1wiY2xvc2VcIixcIm1heGltaXplXCIsXCJub3JtYWxpemVcIixcIm1pbmltaXplXCIsXCJzbWFsbGlmeVwiLFwic21hbGxpZnlyZXZcIl0uZm9yRWFjaChmdW5jdGlvbihlKXt0LnNldEF0dHJpYnV0ZShcImRhdGEtYnRuXCIrZSxcImVuYWJsZWRcIil9KSx0LmlubmVySFRNTD0nPGRpdiBjbGFzcz1cImpzUGFuZWwtaGRyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1oZWFkZXJiYXJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1oZWFkZXJsb2dvXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtdGl0bGViYXJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJqc1BhbmVsLXRpdGxlXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWNvbnRyb2xiYXJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLXNtYWxsaWZ5XCI+Jyt0aGlzLmljb25zLnNtYWxsaWZ5Kyc8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2XCI+Jyt0aGlzLmljb25zLnNtYWxsaWZ5cmV2Kyc8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW1pbmltaXplXCI+Jyt0aGlzLmljb25zLm1pbmltaXplKyc8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiPicrdGhpcy5pY29ucy5ub3JtYWxpemUrJzwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tbWF4aW1pemVcIj4nK3RoaXMuaWNvbnMubWF4aW1pemUrJzwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tY2xvc2VcIj4nK3RoaXMuaWNvbnMuY2xvc2UrJzwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1oZHItdG9vbGJhclwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtY29udGVudFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1taW5pbWl6ZWQtYm94XCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWZ0clwiPjwvZGl2PicsdH0sY3JlYXRlTWluaW1pemVkVGVtcGxhdGU6ZnVuY3Rpb24oKXt2YXIgZT1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO3JldHVybiBlLmNsYXNzTmFtZT1cImpzUGFuZWwtcmVwbGFjZW1lbnRcIixlLmlubmVySFRNTD0nPGRpdiBjbGFzcz1cImpzUGFuZWwtaGRyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1oZWFkZXJiYXJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1oZWFkZXJsb2dvXCI+PC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtdGl0bGViYXJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJqc1BhbmVsLXRpdGxlXCI+PC9zcGFuPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWNvbnRyb2xiYXJcIj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiPicrdGhpcy5pY29ucy5ub3JtYWxpemUrJzwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tbWF4aW1pemVcIj4nK3RoaXMuaWNvbnMubWF4aW1pemUrJzwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1idG4ganNQYW5lbC1idG4tY2xvc2VcIj4nK3RoaXMuaWNvbnMuY2xvc2UrXCI8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cIixlfSxjcmVhdGVTbmFwQXJlYTpmdW5jdGlvbihlLHQsbil7dmFyIG89ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSxhPWUucGFyZW50RWxlbWVudDtvLmNsYXNzTmFtZT1cImpzUGFuZWwtc25hcC1hcmVhIGpzUGFuZWwtc25hcC1hcmVhLVwiK3QsXCJsdFwiPT09dHx8XCJydFwiPT09dHx8XCJyYlwiPT09dHx8XCJsYlwiPT09dD8oby5zdHlsZS53aWR0aD1uK1wicHhcIixvLnN0eWxlLmhlaWdodD1uK1wicHhcIik6XCJjdFwiPT09dHx8XCJjYlwiPT09dD9vLnN0eWxlLmhlaWdodD1uK1wicHhcIjpcImxjXCIhPT10JiZcInJjXCIhPT10fHwoby5zdHlsZS53aWR0aD1uK1wicHhcIiksYSE9PWRvY3VtZW50LmJvZHkmJihvLnN0eWxlLnBvc2l0aW9uPVwiYWJzb2x1dGVcIiksZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLXNuYXAtYXJlYS5qc1BhbmVsLXNuYXAtYXJlYS1cIit0KXx8ZS5wYXJlbnRFbGVtZW50LmFwcGVuZENoaWxkKG8pfSxkcmFnaXQ6ZnVuY3Rpb24oZSl7dmFyIHQsbj1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06e30sbz12b2lkIDAsYT1PYmplY3QuYXNzaWduKHt9LHRoaXMuZGVmYXVsdHMuZHJhZ2l0LG4pLGk9dm9pZCAwLHI9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGRyYWdzdGFydFwiLHtkZXRhaWw6ZS5pZH0pLGw9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGRyYWdcIix7ZGV0YWlsOmUuaWR9KSxzPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxkcmFnc3RvcFwiLHtkZXRhaWw6ZS5pZH0pO2EuZ3JpZCYmQXJyYXkuaXNBcnJheShhLmdyaWQpJiYxPT09YS5ncmlkLmxlbmd0aCYmKGEuZ3JpZFsxXT1hLmdyaWRbMF0pLHQ9dGhpcy5wT2NvbnRhaW5tZW50KGEuY29udGFpbm1lbnQpO3ZhciBjPWZ1bmN0aW9uKCl7ZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbW92ZVwiLGkpLGUuc3R5bGUub3BhY2l0eT0xfTtyZXR1cm4gZS5xdWVyeVNlbGVjdG9yQWxsKGEuaGFuZGxlcykuZm9yRWFjaChmdW5jdGlvbihuKXtuLnN0eWxlLnRvdWNoQWN0aW9uPVwibm9uZVwiLG4uc3R5bGUuY3Vyc29yPWEuY3Vyc29yLGpzUGFuZWwucG9pbnRlcmRvd24uZm9yRWFjaChmdW5jdGlvbihzKXtuLmFkZEV2ZW50TGlzdGVuZXIocyxmdW5jdGlvbihuKXtpZihuLnByZXZlbnREZWZhdWx0KCksbi5idXR0b24mJm4uYnV0dG9uPjApcmV0dXJuITE7aWYoIW4udGFyZ2V0LmNsb3Nlc3QoXCIuanNQYW5lbC1mdHItYnRuXCIpKXtlLmNvbnRyb2xiYXIuc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIixlLmNvbnRlbnQuc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIjt2YXIgcz13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlKSxkPXBhcnNlRmxvYXQocy5sZWZ0KSxwPXBhcnNlRmxvYXQocy50b3ApLGY9bi50b3VjaGVzP24udG91Y2hlc1swXS5jbGllbnRYOm4uY2xpZW50WCxoPW4udG91Y2hlcz9uLnRvdWNoZXNbMF0uY2xpZW50WTpuLmNsaWVudFksdT1lLnBhcmVudEVsZW1lbnQsZz11LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLG09d2luZG93LmdldENvbXB1dGVkU3R5bGUodSksYj1lLmdldFNjYWxlRmFjdG9yKCkseT0wO2k9ZnVuY3Rpb24obil7aWYobi5wcmV2ZW50RGVmYXVsdCgpLCFvKXtpZihkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHIpLGUuc3R5bGUub3BhY2l0eT1hLm9wYWNpdHksZS5zbmFwcGVkJiZhLnNuYXAucmVzaXplVG9QcmVTbmFwJiZlLmN1cnJlbnREYXRhLmJlZm9yZVNuYXApe2UucmVzaXplKGUuY3VycmVudERhdGEuYmVmb3JlU25hcC53aWR0aCtcIiBcIitlLmN1cnJlbnREYXRhLmJlZm9yZVNuYXAuaGVpZ2h0KTt2YXIgaT1lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLHM9Zi0oaS5sZWZ0K2kud2lkdGgpLGM9aS53aWR0aC8yO3M+LWMmJih5PXMrYyl9YS5zdGFydCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKGUsYS5zdGFydCwhMSx7bGVmdDpkLHRvcDpwfSxuKSxqc1BhbmVsLmZyb250KGUpLGUuc25hcHBlZD0hMX1pZihvPTEsYS5kaXNhYmxlT25NYXhpbWl6ZWQmJlwibWF4aW1pemVkXCI9PT1lLnN0YXR1cylyZXR1cm4hMTt2YXIgdj12b2lkIDAsdz12b2lkIDAsaj12b2lkIDAsQz12b2lkIDAsRT12b2lkIDAsRj12b2lkIDAsUD12b2lkIDAseD12b2lkIDAsej12b2lkIDAsUz12b2lkIDAsQT1uLnRvdWNoZXM/bi50b3VjaGVzWzBdLmNsaWVudFg6bi5jbGllbnRYLEI9bi50b3VjaGVzP24udG91Y2hlc1swXS5jbGllbnRZOm4uY2xpZW50WSxUPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGUpO2lmKHU9PT1kb2N1bWVudC5ib2R5KXt2YXIgTD1lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3o9d2luZG93LmlubmVyV2lkdGgtcGFyc2VJbnQobS5ib3JkZXJMZWZ0V2lkdGgsMTApLXBhcnNlSW50KG0uYm9yZGVyUmlnaHRXaWR0aCwxMCktKEwubGVmdCtMLndpZHRoKSxTPXdpbmRvdy5pbm5lckhlaWdodC1wYXJzZUludChtLmJvcmRlclRvcFdpZHRoLDEwKS1wYXJzZUludChtLmJvcmRlckJvdHRvbVdpZHRoLDEwKS0oTC50b3ArTC5oZWlnaHQpfWVsc2Ugej1wYXJzZUludChtLndpZHRoLDEwKS1wYXJzZUludChtLmJvcmRlckxlZnRXaWR0aCwxMCktcGFyc2VJbnQobS5ib3JkZXJSaWdodFdpZHRoLDEwKS0ocGFyc2VJbnQoVC5sZWZ0LDEwKStwYXJzZUludChULndpZHRoLDEwKSksUz1wYXJzZUludChtLmhlaWdodCwxMCktcGFyc2VJbnQobS5ib3JkZXJUb3BXaWR0aCwxMCktcGFyc2VJbnQobS5ib3JkZXJCb3R0b21XaWR0aCwxMCktKHBhcnNlSW50KFQudG9wLDEwKStwYXJzZUludChULmhlaWdodCwxMCkpO3Y9cGFyc2VGbG9hdChULmxlZnQpLGo9cGFyc2VGbG9hdChULnRvcCksRT16LFA9UyxhLnNuYXAmJihcInBhbmVsXCI9PT1hLnNuYXAudHJpZ2dlcj93PU1hdGgucG93KHYsMik6XCJwb2ludGVyXCI9PT1hLnNuYXAudHJpZ2dlciYmKHY9QSx3PU1hdGgucG93KEEsMiksaj1CLEU9d2luZG93LmlubmVyV2lkdGgtQSxQPXdpbmRvdy5pbm5lckhlaWdodC1CKSxDPU1hdGgucG93KGosMiksRj1NYXRoLnBvdyhFLDIpLHg9TWF0aC5wb3coUCwyKSk7dmFyIEQ9TWF0aC5zcXJ0KHcrQyksaz1NYXRoLnNxcnQodyt4KSxxPU1hdGguc3FydChGK0MpLFI9TWF0aC5zcXJ0KEYreCksVz1NYXRoLmFicyh2LUUpLzIsTT1NYXRoLmFicyhqLVApLzIsTz1NYXRoLnNxcnQodytNYXRoLnBvdyhNLDIpKSxJPU1hdGguc3FydChDK01hdGgucG93KFcsMikpLCQ9TWF0aC5zcXJ0KEYrTWF0aC5wb3coTSwyKSksSD1NYXRoLnNxcnQoeCtNYXRoLnBvdyhXLDIpKTtpZih3aW5kb3cuZ2V0U2VsZWN0aW9uKCkucmVtb3ZlQWxsUmFuZ2VzKCksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChsKSxhLmF4aXMmJlwieFwiIT09YS5heGlzfHwoZS5zdHlsZS5sZWZ0PWQrKEEtZikvYi54K3krXCJweFwiKSxhLmF4aXMmJlwieVwiIT09YS5heGlzfHwoZS5zdHlsZS50b3A9cCsoQi1oKS9iLnkrXCJweFwiKSxhLmdyaWQpe3ZhciBOPWEuZ3JpZFswXSpNYXRoLnJvdW5kKChkKyhBLWYpKS9hLmdyaWRbMF0pLFg9YS5ncmlkWzFdKk1hdGgucm91bmQoKHArKEItaCkpL2EuZ3JpZFsxXSk7ZS5zdHlsZS5sZWZ0PU4rXCJweFwiLGUuc3R5bGUudG9wPVgrXCJweFwifWlmKGEuY29udGFpbm1lbnR8fDA9PT1hLmNvbnRhaW5tZW50KXt2YXIgWT12b2lkIDAsXz12b2lkIDA7aWYoZS5vcHRpb25zLmNvbnRhaW5lcj09PWRvY3VtZW50LmJvZHkpWT13aW5kb3cuaW5uZXJXaWR0aC1wYXJzZUZsb2F0KFQud2lkdGgpLXRbMV0sXz13aW5kb3cuaW5uZXJIZWlnaHQtcGFyc2VGbG9hdChULmhlaWdodCktdFsyXTtlbHNle3ZhciBWPXBhcnNlRmxvYXQobS5ib3JkZXJMZWZ0V2lkdGgpK3BhcnNlRmxvYXQobS5ib3JkZXJSaWdodFdpZHRoKSxVPXBhcnNlRmxvYXQobS5ib3JkZXJUb3BXaWR0aCkrcGFyc2VGbG9hdChtLmJvcmRlckJvdHRvbVdpZHRoKTtZPWcud2lkdGgvYi54LXBhcnNlRmxvYXQoVC53aWR0aCktdFsxXS1WLF89Zy5oZWlnaHQvYi55LXBhcnNlRmxvYXQoVC5oZWlnaHQpLXRbMl0tVX1wYXJzZUZsb2F0KGUuc3R5bGUubGVmdCk8PXRbM10mJihlLnN0eWxlLmxlZnQ9dFszXStcInB4XCIpLHBhcnNlRmxvYXQoZS5zdHlsZS50b3ApPD10WzBdJiYoZS5zdHlsZS50b3A9dFswXStcInB4XCIpLHBhcnNlRmxvYXQoZS5zdHlsZS5sZWZ0KT49WSYmKGUuc3R5bGUubGVmdD1ZK1wicHhcIikscGFyc2VGbG9hdChlLnN0eWxlLnRvcCk+PV8mJihlLnN0eWxlLnRvcD1fK1wicHhcIil9aWYoYS5kcmFnJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MoZSxhLmRyYWcsITEse2xlZnQ6dix0b3A6aixyaWdodDpFLGJvdHRvbTpQfSxuKSxhLnNuYXApe3ZhciBaPWEuc25hcC5zZW5zaXRpdml0eSxHPXU9PT1kb2N1bWVudC5ib2R5P3dpbmRvdy5pbm5lcldpZHRoLzg6Zy53aWR0aC84LEo9dT09PWRvY3VtZW50LmJvZHk/d2luZG93LmlubmVySGVpZ2h0Lzg6Zy5oZWlnaHQvODtlLnNuYXBwYWJsZVRvPSExLGpzUGFuZWwucmVtb3ZlU25hcEFyZWFzKCksRDxaPyhlLnNuYXBwYWJsZVRvPVwibGVmdC10b3BcIiwhMSE9PWEuc25hcC5zbmFwTGVmdFRvcCYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYShlLFwibHRcIixaKSk6azxaPyhlLnNuYXBwYWJsZVRvPVwibGVmdC1ib3R0b21cIiwhMSE9PWEuc25hcC5zbmFwTGVmdEJvdHRvbSYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYShlLFwibGJcIixaKSk6cTxaPyhlLnNuYXBwYWJsZVRvPVwicmlnaHQtdG9wXCIsITEhPT1hLnNuYXAuc25hcFJpZ2h0VG9wJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKGUsXCJydFwiLFopKTpSPFo/KGUuc25hcHBhYmxlVG89XCJyaWdodC1ib3R0b21cIiwhMSE9PWEuc25hcC5zbmFwUmlnaHRCb3R0b20mJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEoZSxcInJiXCIsWikpOmo8WiYmSTxHPyhlLnNuYXBwYWJsZVRvPVwiY2VudGVyLXRvcFwiLCExIT09YS5zbmFwLnNuYXBDZW50ZXJUb3AmJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEoZSxcImN0XCIsWikpOnY8WiYmTzxKPyhlLnNuYXBwYWJsZVRvPVwibGVmdC1jZW50ZXJcIiwhMSE9PWEuc25hcC5zbmFwTGVmdENlbnRlciYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYShlLFwibGNcIixaKSk6RTxaJiYkPEo/KGUuc25hcHBhYmxlVG89XCJyaWdodC1jZW50ZXJcIiwhMSE9PWEuc25hcC5zbmFwUmlnaHRDZW50ZXImJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEoZSxcInJjXCIsWikpOlA8WiYmSDxHJiYoZS5zbmFwcGFibGVUbz1cImNlbnRlci1ib3R0b21cIiwhMSE9PWEuc25hcC5zbmFwQ2VudGVyQm90dG9tJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKGUsXCJjYlwiLFopKX19LGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbihlKXtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGUsaSl9KSxkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLGMpfX0pfSksanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbih0KXtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHQsZnVuY3Rpb24odCl7anNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZSxpKX0pLGRvY3VtZW50LmJvZHkuc3R5bGUub3ZlcmZsb3c9XCJpbmhlcml0XCIsanNQYW5lbC5yZW1vdmVTbmFwQXJlYXMoKSxvJiYoZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChzKSxlLnN0eWxlLm9wYWNpdHk9MSxvPXZvaWQgMCxlLnNhdmVDdXJyZW50UG9zaXRpb24oKSxlLmNhbGNTaXplRmFjdG9ycygpLGEuc25hcCYmKFwibGVmdC10b3BcIj09PWUuc25hcHBhYmxlVG8/anNQYW5lbC5zbmFwUGFuZWwoZSxhLnNuYXAuc25hcExlZnRUb3ApOlwiY2VudGVyLXRvcFwiPT09ZS5zbmFwcGFibGVUbz9qc1BhbmVsLnNuYXBQYW5lbChlLGEuc25hcC5zbmFwQ2VudGVyVG9wKTpcInJpZ2h0LXRvcFwiPT09ZS5zbmFwcGFibGVUbz9qc1BhbmVsLnNuYXBQYW5lbChlLGEuc25hcC5zbmFwUmlnaHRUb3ApOlwicmlnaHQtY2VudGVyXCI9PT1lLnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKGUsYS5zbmFwLnNuYXBSaWdodENlbnRlcik6XCJyaWdodC1ib3R0b21cIj09PWUuc25hcHBhYmxlVG8/anNQYW5lbC5zbmFwUGFuZWwoZSxhLnNuYXAuc25hcFJpZ2h0Qm90dG9tKTpcImNlbnRlci1ib3R0b21cIj09PWUuc25hcHBhYmxlVG8/anNQYW5lbC5zbmFwUGFuZWwoZSxhLnNuYXAuc25hcENlbnRlckJvdHRvbSk6XCJsZWZ0LWJvdHRvbVwiPT09ZS5zbmFwcGFibGVUbz9qc1BhbmVsLnNuYXBQYW5lbChlLGEuc25hcC5zbmFwTGVmdEJvdHRvbSk6XCJsZWZ0LWNlbnRlclwiPT09ZS5zbmFwcGFibGVUbyYmanNQYW5lbC5zbmFwUGFuZWwoZSxhLnNuYXAuc25hcExlZnRDZW50ZXIpLGEuc25hcC5jYWxsYmFjayYmZS5zbmFwcGFibGVUbyYmXCJmdW5jdGlvblwiPT10eXBlb2YgYS5zbmFwLmNhbGxiYWNrJiZhLnNuYXAuY2FsbGJhY2suY2FsbChlLGUpLGUuc25hcHBhYmxlVG8mJmEuc25hcC5yZXBvc2l0aW9uT25TbmFwJiZlLnJlcG9zaXRpb25PblNuYXAoZS5zbmFwcGFibGVUbykpLGEuc3RvcCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKGUsYS5zdG9wLCExLHtsZWZ0OnBhcnNlRmxvYXQoZS5zdHlsZS5sZWZ0KSx0b3A6cGFyc2VGbG9hdChlLnN0eWxlLnRvcCl9LHQpKSxlLmNvbnRyb2xiYXIuc3R5bGUucG9pbnRlckV2ZW50cz1cImluaGVyaXRcIixlLmNvbnRlbnQuc3R5bGUucG9pbnRlckV2ZW50cz1cImluaGVyaXRcIixkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKFwibW91c2VsZWF2ZVwiLGMpfSl9KSxhLmRpc2FibGUmJihuLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCIpfSksZX0sZW1wdHlOb2RlOmZ1bmN0aW9uKGUpe2Zvcig7ZS5maXJzdENoaWxkOyllLnJlbW92ZUNoaWxkKGUuZmlyc3RDaGlsZCk7cmV0dXJuIGV9LGV4dGVuZDpmdW5jdGlvbihlKXtpZihcIltvYmplY3QgT2JqZWN0XVwiPT09T2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKGUpKWZvcih2YXIgdCBpbiBlKWUuaGFzT3duUHJvcGVydHkodCkmJih0aGlzLmV4dGVuc2lvbnNbdF09ZVt0XSl9LGZldGNoOmZ1bmN0aW9uKGUpe2Z1bmN0aW9uIHQodCl7cmV0dXJuIGUuYXBwbHkodGhpcyxhcmd1bWVudHMpfXJldHVybiB0LnRvU3RyaW5nPWZ1bmN0aW9uKCl7cmV0dXJuIGUudG9TdHJpbmcoKX0sdH0oZnVuY3Rpb24ob2JqKXt2YXIgY29uZj1vYmoub3B0aW9ucy5jb250ZW50RmV0Y2gsY29uZkRlZmF1bHRzPXtib2R5TWV0aG9kOlwidGV4dFwiLGV2YWxzY3JpcHR0YWdzOiEwLGF1dG9yZXNpemU6ITAsYXV0b3JlcG9zaXRpb246ITAsZG9uZTpmdW5jdGlvbihlLHQpe2UuY29udGVudC5pbm5lckhUTUw9dH19O2NvbmY9XCJzdHJpbmdcIj09dHlwZW9mIGNvbmY/T2JqZWN0LmFzc2lnbih7cmVzb3VyY2U6b2JqLm9wdGlvbnMuY29udGVudEZldGNofSxjb25mRGVmYXVsdHMpOk9iamVjdC5hc3NpZ24oY29uZkRlZmF1bHRzLGNvbmYpO3ZhciBmZXRjaEluaXQ9Y29uZi5mZXRjaEluaXR8fHt9O2NvbmYuYmVmb3JlU2VuZCYmY29uZi5iZWZvcmVTZW5kLmNhbGwob2JqLG9iaiksZmV0Y2goY29uZi5yZXNvdXJjZSxmZXRjaEluaXQpLnRoZW4oZnVuY3Rpb24oZSl7aWYoZS5vaylyZXR1cm4gZVtjb25mLmJvZHlNZXRob2RdKCk7dGhyb3cgbmV3IEVycm9yKFwiTmV0d29yayByZXNwb25zZSB3YXMgbm90IG9rLlwiKX0pLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2Upe2lmKGNvbmYuZG9uZS5jYWxsKG9iaixvYmoscmVzcG9uc2UpLGNvbmYuZXZhbHNjcmlwdHRhZ3Mpe3ZhciBzY3JpcHR0YWdzPXJlc3BvbnNlLm1hdGNoKC88c2NyaXB0XFxiW14+XSo+KFtcXHNcXFNdKj8pPFxcL3NjcmlwdD4vZ2kpO3NjcmlwdHRhZ3MmJnNjcmlwdHRhZ3MuZm9yRWFjaChmdW5jdGlvbih0YWcpe3ZhciBqcz10YWcucmVwbGFjZSgvPHNjcmlwdFxcYltePl0qPi9pLFwiXCIpLnJlcGxhY2UoLzxcXC9zY3JpcHQ+L2ksXCJcIikudHJpbSgpO2V2YWwoanMpfSl9dmFyIG9Db250ZW50U2l6ZT1vYmoub3B0aW9ucy5jb250ZW50U2l6ZTtpZihjb25mLmF1dG9yZXNpemV8fGNvbmYuYXV0b3JlcG9zaXRpb24paWYoXCJzdHJpbmdcIj09dHlwZW9mIG9Db250ZW50U2l6ZSYmb0NvbnRlbnRTaXplLm1hdGNoKC9hdXRvL2kpKXt2YXIgcGFydHM9b0NvbnRlbnRTaXplLnNwbGl0KFwiIFwiKSxzaXplcz1PYmplY3QuYXNzaWduKHt9LHt3aWR0aDpwYXJ0c1swXSxoZWlnaHQ6cGFydHNbMV19KTtjb25mLmF1dG9yZXNpemUmJm9iai5yZXNpemUoc2l6ZXMpLG9iai5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsLWNvbnRleHRtZW51XCIpfHxjb25mLmF1dG9yZXBvc2l0aW9uJiZvYmoucmVwb3NpdGlvbigpfWVsc2UgaWYoXCJvYmplY3RcIj09PSh2b2lkIDA9PT1vQ29udGVudFNpemU/XCJ1bmRlZmluZWRcIjpfdHlwZW9mKG9Db250ZW50U2l6ZSkpJiYoXCJhdXRvXCI9PT1vQ29udGVudFNpemUud2lkdGh8fFwiYXV0b1wiPT09b0NvbnRlbnRTaXplLmhlaWdodCkpe3ZhciBfc2l6ZXMyPU9iamVjdC5hc3NpZ24oe30sb0NvbnRlbnRTaXplKTtjb25mLmF1dG9yZXNpemUmJm9iai5yZXNpemUoX3NpemVzMiksb2JqLmNsYXNzTGlzdC5jb250YWlucyhcImpzUGFuZWwtY29udGV4dG1lbnVcIil8fGNvbmYuYXV0b3JlcG9zaXRpb24mJm9iai5yZXBvc2l0aW9uKCl9fSkuY2F0Y2goZnVuY3Rpb24oZSl7Y29uc29sZS5lcnJvcihcIlRoZXJlIGhhcyBiZWVuIGEgcHJvYmxlbSB3aXRoIHlvdXIgZmV0Y2ggb3BlcmF0aW9uOiBcIitlLm1lc3NhZ2UpfSl9KSxmcm9udDpmdW5jdGlvbihlKXtpZihcIm1pbmltaXplZFwiPT09ZS5zdGF0dXMpXCJtYXhpbWl6ZWRcIj09PWUuc3RhdHVzQmVmb3JlP2UubWF4aW1pemUoKTplLm5vcm1hbGl6ZSgpO2Vsc2V7dmFyIHQ9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLXN0YW5kYXJkXCIpKS5tYXAoZnVuY3Rpb24oZSl7cmV0dXJuIGUuc3R5bGUuekluZGV4fSk7TWF0aC5tYXguYXBwbHkoTWF0aCxfdG9Db25zdW1hYmxlQXJyYXkodCkpPmUuc3R5bGUuekluZGV4JiYoZS5zdHlsZS56SW5kZXg9anNQYW5lbC56aS5uZXh0KCkpLHRoaXMucmVzZXRaaSgpfXRoaXMuZ2V0UGFuZWxzKCkuZm9yRWFjaChmdW5jdGlvbihlLHQpe3ZhciBuPWUuY29udGVudC5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtaWZyYW1lLW92ZXJsYXlcIik7aWYodD4wKXtpZihlLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcImlmcmFtZVwiKSYmIW4pe3ZhciBvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7by5jbGFzc05hbWU9XCJqc1BhbmVsLWlmcmFtZS1vdmVybGF5XCIsZS5jb250ZW50LmFwcGVuZENoaWxkKG8pfX1lbHNlIG4mJmUuY29udGVudC5yZW1vdmVDaGlsZChuKX0pfSxnZXRQYW5lbHM6ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsLXN0YW5kYXJkXCIpfTtyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsXCIpKS5maWx0ZXIoZnVuY3Rpb24odCl7cmV0dXJuIGUuY2FsbCh0LHQpfSkuc29ydChmdW5jdGlvbihlLHQpe3JldHVybiB0LnN0eWxlLnpJbmRleC1lLnN0eWxlLnpJbmRleH0pfSxvdmVybGFwczpmdW5jdGlvbihlLHQsbil7dmFyIG89XCJzdHJpbmdcIj09dHlwZW9mIGU/ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihlKTplLGE9dm9pZCAwLGk9by5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxyPXt0b3A6MCxyaWdodDowLGJvdHRvbTowLGxlZnQ6MH0sbD1vLmdldFNjYWxlRmFjdG9yKCkscz1nZXRDb21wdXRlZFN0eWxlKG8ucGFyZW50RWxlbWVudCk7cmV0dXJuXCJ3aW5kb3dcIiE9PW8ub3B0aW9ucy5jb250YWluZXImJlwicGFkZGluZ2JveFwiPT09biYmKHI9e3RvcDpwYXJzZUludChzLmJvcmRlclRvcFdpZHRoLDEwKSpsLnkscmlnaHQ6cGFyc2VJbnQocy5ib3JkZXJSaWdodFdpZHRoLDEwKSpsLngsYm90dG9tOnBhcnNlSW50KHMuYm9yZGVyQm90dG9tV2lkdGgsMTApKmwueSxsZWZ0OnBhcnNlSW50KHMuYm9yZGVyTGVmdFdpZHRoLDEwKSpsLnh9KSxhPVwic3RyaW5nXCI9PXR5cGVvZiB0P1wid2luZG93XCI9PT10P3tsZWZ0OjAsdG9wOjAscmlnaHQ6d2luZG93LmlubmVyV2lkdGgsYm90dG9tOndpbmRvdy5pbm5lckhlaWdodH06XCJwYXJlbnRcIj09PXQ/by5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IodCkuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk6dC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSx7dG9wOmkudG9wLWEudG9wLXIudG9wLHJpZ2h0OmEucmlnaHQtaS5yaWdodC1yLnJpZ2h0LGJvdHRvbTphLmJvdHRvbS1pLmJvdHRvbS1yLmJvdHRvbSxsZWZ0OmkubGVmdC1hLmxlZnQtci5sZWZ0LHBhcmVudEJvcmRlcldpZHRoOnIscGFuZWxSZWN0Oml9fSxwT2NvbnRhaW5lcjpmdW5jdGlvbihlKXtpZihlKXtpZihcInN0cmluZ1wiPT10eXBlb2YgZSlyZXR1cm5cIndpbmRvd1wiPT09ZT9kb2N1bWVudC5ib2R5OmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZSk7aWYoMT09PWUubm9kZVR5cGUpcmV0dXJuIGU7aWYoZS5sZW5ndGgpcmV0dXJuIGVbMF19cmV0dXJuITF9LHBPY29udGFpbm1lbnQ6ZnVuY3Rpb24oZSl7dmFyIHQ9ZTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYodD1lKCkpLFwibnVtYmVyXCI9PXR5cGVvZiB0KXJldHVyblt0LHQsdCx0XTtpZihBcnJheS5pc0FycmF5KHQpKXtpZigxPT09dC5sZW5ndGgpcmV0dXJuW3RbMF0sdFswXSx0WzBdLHRbMF1dO2lmKDI9PT10Lmxlbmd0aClyZXR1cm4gdC5jb25jYXQodCk7Mz09PXQubGVuZ3RoJiYodFszXT10WzFdKX1yZXR1cm4gdH0scE9zaXplOmZ1bmN0aW9uKGUsdCl7dmFyIG49dHx8dGhpcy5kZWZhdWx0cy5jb250ZW50U2l6ZSxvPWUucGFyZW50RWxlbWVudDtpZihcInN0cmluZ1wiPT10eXBlb2Ygbil7dmFyIGE9bi50cmltKCkuc3BsaXQoXCIgXCIpOyhuPXt9KS53aWR0aD1hWzBdLDI9PT1hLmxlbmd0aD9uLmhlaWdodD1hWzFdOm4uaGVpZ2h0PWFbMF19ZWxzZSBuLndpZHRoJiYhbi5oZWlnaHQ/bi5oZWlnaHQ9bi53aWR0aDpuLmhlaWdodCYmIW4ud2lkdGgmJihuLndpZHRoPW4uaGVpZ2h0KTtpZihTdHJpbmcobi53aWR0aCkubWF0Y2goL15bMC05Ll0rJC9naSkpbi53aWR0aCs9XCJweFwiO2Vsc2UgaWYoXCJzdHJpbmdcIj09dHlwZW9mIG4ud2lkdGgmJm4ud2lkdGguZW5kc1dpdGgoXCIlXCIpKWlmKG89PT1kb2N1bWVudC5ib2R5KW4ud2lkdGg9d2luZG93LmlubmVyV2lkdGgqKHBhcnNlRmxvYXQobi53aWR0aCkvMTAwKStcInB4XCI7ZWxzZXt2YXIgaT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShvKSxyPXBhcnNlRmxvYXQoaS5ib3JkZXJMZWZ0V2lkdGgpK3BhcnNlRmxvYXQoaS5ib3JkZXJSaWdodFdpZHRoKTtuLndpZHRoPShwYXJzZUZsb2F0KGkud2lkdGgpLXIpKihwYXJzZUZsb2F0KG4ud2lkdGgpLzEwMCkrXCJweFwifWVsc2VcImZ1bmN0aW9uXCI9PXR5cGVvZiBuLndpZHRoJiYobi53aWR0aD1uLndpZHRoLmNhbGwoZSxlKSxcIm51bWJlclwiPT10eXBlb2Ygbi53aWR0aD9uLndpZHRoKz1cInB4XCI6XCJzdHJpbmdcIj09dHlwZW9mIG4ud2lkdGgmJm4ud2lkdGgubWF0Y2goL15bMC05Ll0rJC9naSkmJihuLndpZHRoKz1cInB4XCIpKTtpZihTdHJpbmcobi5oZWlnaHQpLm1hdGNoKC9eWzAtOS5dKyQvZ2kpKW4uaGVpZ2h0Kz1cInB4XCI7ZWxzZSBpZihcInN0cmluZ1wiPT10eXBlb2Ygbi5oZWlnaHQmJm4uaGVpZ2h0LmVuZHNXaXRoKFwiJVwiKSlpZihvPT09ZG9jdW1lbnQuYm9keSluLmhlaWdodD13aW5kb3cuaW5uZXJIZWlnaHQqKHBhcnNlRmxvYXQobi5oZWlnaHQpLzEwMCkrXCJweFwiO2Vsc2V7dmFyIGw9d2luZG93LmdldENvbXB1dGVkU3R5bGUobykscz1wYXJzZUZsb2F0KGwuYm9yZGVyVG9wV2lkdGgpK3BhcnNlRmxvYXQobC5ib3JkZXJCb3R0b21XaWR0aCk7bi5oZWlnaHQ9KHBhcnNlRmxvYXQobC5oZWlnaHQpLXMpKihwYXJzZUZsb2F0KG4uaGVpZ2h0KS8xMDApK1wicHhcIn1lbHNlXCJmdW5jdGlvblwiPT10eXBlb2Ygbi5oZWlnaHQmJihuLmhlaWdodD1uLmhlaWdodC5jYWxsKGUsZSksXCJudW1iZXJcIj09dHlwZW9mIG4uaGVpZ2h0P24uaGVpZ2h0Kz1cInB4XCI6XCJzdHJpbmdcIj09dHlwZW9mIG4uaGVpZ2h0JiZuLmhlaWdodC5tYXRjaCgvXlswLTkuXSskL2dpKSYmKG4uaGVpZ2h0Kz1cInB4XCIpKTtyZXR1cm4gbn0scE9wb3NpdGlvbjpmdW5jdGlvbihlKXt2YXIgdD1lLm1hdGNoKC9cXGJbYS16XXs0LDZ9LXsxfVthLXpdezMsNn1cXGIvaSksbj1lLm1hdGNoKC9kb3dufHVwfHJpZ2h0KFteLV18JCl8bGVmdChbXi1dfCQpL2kpLG89ZS5tYXRjaCgvWystXT9cXGQ/XFwuP1xcZCsoW2EteiVdezIsNH1cXGJ8JT8pL2dpKSxhPXZvaWQgMDtyZXR1cm4gYT10P3tteTp0WzBdLnRvTG93ZXJDYXNlKCksYXQ6dFswXS50b0xvd2VyQ2FzZSgpfTp7bXk6XCJjZW50ZXJcIixhdDpcImNlbnRlclwifSxuJiYoYS5hdXRvcG9zaXRpb249blswXS50b0xvd2VyQ2FzZSgpKSxvJiYoby5mb3JFYWNoKGZ1bmN0aW9uKGUsdCl7ZS5tYXRjaCgvXlsrLV0/WzAtOV0qJC8pJiYob1t0XSs9XCJweFwiKSxvW3RdPW9bdF0udG9Mb3dlckNhc2UoKX0pLDE9PT1vLmxlbmd0aD8oYS5vZmZzZXRYPW9bMF0sYS5vZmZzZXRZPW9bMF0pOihhLm9mZnNldFg9b1swXSxhLm9mZnNldFk9b1sxXSkpLGF9LHBvc2l0aW9uOmZ1bmN0aW9uKGUsdCl7dmFyIG49dm9pZCAwLG89dm9pZCAwLGE9dm9pZCAwLGk9e2xlZnQ6MCx0b3A6MH0scj0wLGw9MCxzPTAsYz0wLGQ9e215OlwiY2VudGVyXCIsYXQ6XCJjZW50ZXJcIixvZjpcIndpbmRvd1wiLG9mZnNldFg6XCIwcHhcIixvZmZzZXRZOlwiMHB4XCJ9O2Uub3B0aW9ucy5jb250YWluZXI9PT1kb2N1bWVudC5ib2R5JiYoZC5vZj1kb2N1bWVudC5ib2R5KTt2YXIgcD17d2lkdGg6ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLGhlaWdodDp3aW5kb3cuaW5uZXJIZWlnaHR9LGY9cGFnZVhPZmZzZXQsaD1wYWdlWU9mZnNldDtpZihuPVwic3RyaW5nXCI9PXR5cGVvZiBlP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZSk6ZSwhdClyZXR1cm4gbi5zdHlsZS5vcGFjaXR5PTEsbjt2YXIgdT1uLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1wic3RyaW5nXCI9PXR5cGVvZiB0P289T2JqZWN0LmFzc2lnbih7fSxkLGpzUGFuZWwucE9wb3NpdGlvbih0KSk6KG89T2JqZWN0LmFzc2lnbih7fSxkLHQpLFtcIm15XCIsXCJhdFwiLFwib2ZcIixcIm9mZnNldFhcIixcIm9mZnNldFlcIixcIm1pbkxlZnRcIixcIm1heExlZnRcIixcIm1pblRvcFwiLFwibWF4VG9wXCJdLmZvckVhY2goZnVuY3Rpb24odCl7XCJmdW5jdGlvblwiPT10eXBlb2Ygb1t0XSYmKG9bdF09b1t0XS5jYWxsKGUsZSkpfSkpO3ZhciBnPW4ucGFyZW50RWxlbWVudCxtPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGcpLGI9Zy5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSx5PWcudGFnTmFtZS50b0xvd2VyQ2FzZSgpO2lmKG8ub2YmJlwid2luZG93XCIhPT1vLm9mJiYoYT1cInN0cmluZ1wiPT10eXBlb2Ygby5vZj9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG8ub2YpOm8ub2YpLG8ubXkubWF0Y2goL15jZW50ZXItdG9wJHxeY2VudGVyJHxeY2VudGVyLWJvdHRvbSQvaSk/cj11LndpZHRoLzI6by5teS5tYXRjaCgvcmlnaHQvaSkmJihyPXUud2lkdGgpLG8ubXkubWF0Y2goL15sZWZ0LWNlbnRlciR8XmNlbnRlciR8XnJpZ2h0LWNlbnRlciQvaSk/bD11LmhlaWdodC8yOm8ubXkubWF0Y2goL2JvdHRvbS9pKSYmKGw9dS5oZWlnaHQpLFwid2luZG93XCI9PT1lLm9wdGlvbnMuY29udGFpbmVyJiZcImJvZHlcIj09PXkmJlwid2luZG93XCI9PT1vLm9mKW8uYXQubWF0Y2goL15jZW50ZXItdG9wJHxeY2VudGVyJHxeY2VudGVyLWJvdHRvbSQvaSk/cz1wLndpZHRoLzI6by5hdC5tYXRjaCgvcmlnaHQvaSkmJihzPXAud2lkdGgpLG8uYXQubWF0Y2goL15sZWZ0LWNlbnRlciR8XmNlbnRlciR8XnJpZ2h0LWNlbnRlciQvaSk/Yz1wLmhlaWdodC8yOm8uYXQubWF0Y2goL2JvdHRvbS9pKSYmKGM9cC5oZWlnaHQpLGkubGVmdD1zLXItcGFyc2VGbG9hdChtLmJvcmRlckxlZnRXaWR0aCksaS50b3A9Yy1sLXBhcnNlRmxvYXQobS5ib3JkZXJUb3BXaWR0aCksbi5zdHlsZS5wb3NpdGlvbj1cImZpeGVkXCI7ZWxzZSBpZihcImJvZHlcIj09PXkmJlwid2luZG93XCIhPT1vLm9mKXt2YXIgdj1hLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3M9by5hdC5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKT92LndpZHRoLzIrdi5sZWZ0K2Y6by5hdC5tYXRjaCgvcmlnaHQvaSk/di53aWR0aCt2LmxlZnQrZjp2LmxlZnQrZixjPW8uYXQubWF0Y2goL15sZWZ0LWNlbnRlciR8XmNlbnRlciR8XnJpZ2h0LWNlbnRlciQvaSk/di5oZWlnaHQvMit2LnRvcCtoOm8uYXQubWF0Y2goL2JvdHRvbS9pKT92LmhlaWdodCt2LnRvcCtoOnYudG9wK2gsaS5sZWZ0PXMtci1wYXJzZUZsb2F0KG0uYm9yZGVyTGVmdFdpZHRoKSxpLnRvcD1jLWwtcGFyc2VGbG9hdChtLmJvcmRlclRvcFdpZHRoKX1lbHNlIGlmKFwiYm9keVwiPT09eXx8XCJ3aW5kb3dcIiE9PW8ub2YmJm8ub2Ype2lmKFwiYm9keVwiIT09eSYmZy5jb250YWlucyhhKSl7dmFyIHc9YS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtzPW8uYXQubWF0Y2goL15jZW50ZXItdG9wJHxeY2VudGVyJHxeY2VudGVyLWJvdHRvbSQvaSk/dy5sZWZ0LWIubGVmdCt3LndpZHRoLzI6by5hdC5tYXRjaCgvcmlnaHQvaSk/dy5sZWZ0LWIubGVmdCt3LndpZHRoOncubGVmdC1iLmxlZnQsYz1vLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpP3cudG9wLWIudG9wK3cuaGVpZ2h0LzI6by5hdC5tYXRjaCgvYm90dG9tL2kpP3cudG9wLWIudG9wK3cuaGVpZ2h0OncudG9wLWIudG9wLGkubGVmdD1zLXItcGFyc2VGbG9hdChtLmJvcmRlckxlZnRXaWR0aCksaS50b3A9Yy1sLXBhcnNlRmxvYXQobS5ib3JkZXJUb3BXaWR0aCl9fWVsc2V7dmFyIGo9cGFyc2VGbG9hdChtLmJvcmRlckxlZnRXaWR0aCkrcGFyc2VGbG9hdChtLmJvcmRlclJpZ2h0V2lkdGgpLEM9cGFyc2VGbG9hdChtLmJvcmRlclRvcFdpZHRoKStwYXJzZUZsb2F0KG0uYm9yZGVyQm90dG9tV2lkdGgpO28uYXQubWF0Y2goL15jZW50ZXItdG9wJHxeY2VudGVyJHxeY2VudGVyLWJvdHRvbSQvaSk/cz1iLndpZHRoLzItai8yOm8uYXQubWF0Y2goL3JpZ2h0L2kpJiYocz1iLndpZHRoLWopLG8uYXQubWF0Y2goL15sZWZ0LWNlbnRlciR8XmNlbnRlciR8XnJpZ2h0LWNlbnRlciQvaSk/Yz1iLmhlaWdodC8yLUMvMjpvLmF0Lm1hdGNoKC9ib3R0b20vaSkmJihjPWIuaGVpZ2h0LUMpLGkubGVmdD1zLXIsaS50b3A9Yy1sfWlmKG8uYXV0b3Bvc2l0aW9uJiZvLm15PT09by5hdCYmW1wibGVmdC10b3BcIixcImNlbnRlci10b3BcIixcInJpZ2h0LXRvcFwiLFwibGVmdC1ib3R0b21cIixcImNlbnRlci1ib3R0b21cIixcInJpZ2h0LWJvdHRvbVwiXS5pbmRleE9mKG8ubXkpPj0wKXtcImZ1bmN0aW9uXCI9PXR5cGVvZiBvLmF1dG9wb3NpdGlvbiYmKG8uYXV0b3Bvc2l0aW9uPW8uYXV0b3Bvc2l0aW9uKCkpO3ZhciBFPW8ubXkrXCItXCIrby5hdXRvcG9zaXRpb24udG9Mb3dlckNhc2UoKTtuLmNsYXNzTGlzdC5hZGQoRSk7dmFyIEY9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5cIitFKSksUD1GLmluZGV4T2Yobik7Ri5sZW5ndGg+MSYmKFwiZG93blwiPT09by5hdXRvcG9zaXRpb24/Ri5mb3JFYWNoKGZ1bmN0aW9uKGUsdCl7dD4wJiZ0PD1QJiYoaS50b3ArPUZbLS10XS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS5oZWlnaHQranNQYW5lbC5hdXRvcG9zaXRpb25TcGFjaW5nKX0pOlwidXBcIj09PW8uYXV0b3Bvc2l0aW9uP0YuZm9yRWFjaChmdW5jdGlvbihlLHQpe3Q+MCYmdDw9UCYmKGkudG9wLT1GWy0tdF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0K2pzUGFuZWwuYXV0b3Bvc2l0aW9uU3BhY2luZyl9KTpcInJpZ2h0XCI9PT1vLmF1dG9wb3NpdGlvbj9GLmZvckVhY2goZnVuY3Rpb24oZSx0KXt0PjAmJnQ8PVAmJihpLmxlZnQrPUZbLS10XS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS53aWR0aCtqc1BhbmVsLmF1dG9wb3NpdGlvblNwYWNpbmcpfSk6XCJsZWZ0XCI9PT1vLmF1dG9wb3NpdGlvbiYmRi5mb3JFYWNoKGZ1bmN0aW9uKGUsdCl7dD4wJiZ0PD1QJiYoaS5sZWZ0LT1GWy0tdF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgranNQYW5lbC5hdXRvcG9zaXRpb25TcGFjaW5nKX0pKX12YXIgeD1uLmdldFNjYWxlRmFjdG9yKCk7aS5sZWZ0Lz14LngsaS50b3AvPXgueTt2YXIgej1wYXJzZUZsb2F0KG0uYm9yZGVyTGVmdFdpZHRoKStwYXJzZUZsb2F0KG0uYm9yZGVyUmlnaHRXaWR0aCksUz1wYXJzZUZsb2F0KG0uYm9yZGVyVG9wV2lkdGgpK3BhcnNlRmxvYXQobS5ib3JkZXJCb3R0b21XaWR0aCksQT16KigxLXgueCkveC54LEI9UyooMS14LnkpL3gueTtpZihvLmF0Lm1hdGNoKC9ecmlnaHQtdG9wJHxecmlnaHQtY2VudGVyJHxecmlnaHQtYm90dG9tJC9pKT9pLmxlZnQrPUE6by5hdC5tYXRjaCgvXmNlbnRlci10b3AkfF5jZW50ZXIkfF5jZW50ZXItYm90dG9tJC9pKSYmKGkubGVmdCs9QS8yKSxvLmF0Lm1hdGNoKC9ebGVmdC1ib3R0b20kfF5jZW50ZXItYm90dG9tJHxecmlnaHQtYm90dG9tJC9pKT9pLnRvcCs9QjpvLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpJiYoaS50b3ArPUIvMiksaS5sZWZ0Kz1cInB4XCIsaS50b3ArPVwicHhcIixuLnN0eWxlLmxlZnQ9aS5sZWZ0LG4uc3R5bGUudG9wPWkudG9wLG8ub2Zmc2V0WCYmKFwibnVtYmVyXCI9PXR5cGVvZiBvLm9mZnNldFg/bi5zdHlsZS5sZWZ0PVwiY2FsYyhcIitpLmxlZnQrXCIgKyBcIitvLm9mZnNldFgrXCJweClcIjpuLnN0eWxlLmxlZnQ9XCJjYWxjKFwiK2kubGVmdCtcIiArIFwiK28ub2Zmc2V0WCtcIilcIixpLmxlZnQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUobikubGVmdCksby5vZmZzZXRZJiYoXCJudW1iZXJcIj09dHlwZW9mIG8ub2Zmc2V0WT9uLnN0eWxlLnRvcD1cImNhbGMoXCIraS50b3ArXCIgKyBcIitvLm9mZnNldFkrXCJweClcIjpuLnN0eWxlLnRvcD1cImNhbGMoXCIraS50b3ArXCIgKyBcIitvLm9mZnNldFkrXCIpXCIsaS50b3A9d2luZG93LmdldENvbXB1dGVkU3R5bGUobikudG9wKSxvLm1pbkxlZnQpe3ZhciBUPXBhcnNlRmxvYXQoaS5sZWZ0KTtcIm51bWJlclwiPT10eXBlb2Ygby5taW5MZWZ0JiYoby5taW5MZWZ0Kz1cInB4XCIpLG4uc3R5bGUubGVmdD1vLm1pbkxlZnQsVD5wYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLmxlZnQpJiYobi5zdHlsZS5sZWZ0PVQrXCJweFwiKSxpLmxlZnQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUobikubGVmdH1pZihvLm1heExlZnQpe3ZhciBMPXBhcnNlRmxvYXQoaS5sZWZ0KTtcIm51bWJlclwiPT10eXBlb2Ygby5tYXhMZWZ0JiYoby5tYXhMZWZ0Kz1cInB4XCIpLG4uc3R5bGUubGVmdD1vLm1heExlZnQsTDxwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLmxlZnQpJiYobi5zdHlsZS5sZWZ0PUwrXCJweFwiKSxpLmxlZnQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUobikubGVmdH1pZihvLm1heFRvcCl7dmFyIEQ9cGFyc2VGbG9hdChpLnRvcCk7XCJudW1iZXJcIj09dHlwZW9mIG8ubWF4VG9wJiYoby5tYXhUb3ArPVwicHhcIiksbi5zdHlsZS50b3A9by5tYXhUb3AsRDxwYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLnRvcCkmJihuLnN0eWxlLnRvcD1EK1wicHhcIiksaS50b3A9d2luZG93LmdldENvbXB1dGVkU3R5bGUobikudG9wfWlmKG8ubWluVG9wKXt2YXIgaz1wYXJzZUZsb2F0KGkudG9wKTtcIm51bWJlclwiPT10eXBlb2Ygby5taW5Ub3AmJihvLm1pblRvcCs9XCJweFwiKSxuLnN0eWxlLnRvcD1vLm1pblRvcCxrPnBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUobikudG9wKSYmKG4uc3R5bGUudG9wPWsrXCJweFwiKSxpLnRvcD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKS50b3B9aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygby5tb2RpZnkpe3ZhciBxPW8ubW9kaWZ5LmNhbGwoaSxpKTtuLnN0eWxlLmxlZnQ9cS5sZWZ0LG4uc3R5bGUudG9wPXEudG9wfXJldHVybiBuLnN0eWxlLm9wYWNpdHk9MSxuLnN0eWxlLmxlZnQ9d2luZG93LmdldENvbXB1dGVkU3R5bGUobikubGVmdCxuLnN0eWxlLnRvcD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKS50b3Asbn0scHJvY2Vzc0NhbGxiYWNrczpmdW5jdGlvbihlLHQpe3ZhciBuPWFyZ3VtZW50cy5sZW5ndGg+MiYmdm9pZCAwIT09YXJndW1lbnRzWzJdP2FyZ3VtZW50c1syXTpcInNvbWVcIixvPWFyZ3VtZW50c1szXSxhPWFyZ3VtZW50c1s0XTtpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiB0JiYodD1bdF0pLG4pcmV0dXJuIHRbbl0oZnVuY3Rpb24odCl7cmV0dXJuIHQuY2FsbChlLGUsbyxhKX0pO3QuZm9yRWFjaChmdW5jdGlvbih0KXt0LmNhbGwoZSxlLG8sYSl9KX0scmVtb3ZlU25hcEFyZWFzOmZ1bmN0aW9uKCl7ZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLXNuYXAtYXJlYVwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlKX0pfSxyZXNldFppOmZ1bmN0aW9uKCl7dGhpcy56aT1mdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpqc1BhbmVsLnppQmFzZTtyZXR1cm57bmV4dDpmdW5jdGlvbigpe3JldHVybiBlKyt9fX0oKSxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtc3RhbmRhcmRcIikpLnNvcnQoZnVuY3Rpb24oZSx0KXtyZXR1cm4gZS5zdHlsZS56SW5kZXgtdC5zdHlsZS56SW5kZXh9KS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2Uuc3R5bGUuekluZGV4PWpzUGFuZWwuemkubmV4dCgpfSl9LHJlc2l6ZWl0OmZ1bmN0aW9uKGUpe3ZhciB0LG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnt9LG89T2JqZWN0LmFzc2lnbih7fSx0aGlzLmRlZmF1bHRzLnJlc2l6ZWl0LG4pLGE9ZS5wYXJlbnRFbGVtZW50LGk9YS50YWdOYW1lLnRvTG93ZXJDYXNlKCkscj1cImZ1bmN0aW9uXCI9PXR5cGVvZiBvLm1heFdpZHRoP28ubWF4V2lkdGgoKTpvLm1heFdpZHRofHwxZTQsbD1cImZ1bmN0aW9uXCI9PXR5cGVvZiBvLm1heEhlaWdodD9vLm1heEhlaWdodCgpOm8ubWF4SGVpZ2h0fHwxZTQscz1cImZ1bmN0aW9uXCI9PXR5cGVvZiBvLm1pbldpZHRoP28ubWluV2lkdGgoKTpvLm1pbldpZHRoLGM9XCJmdW5jdGlvblwiPT10eXBlb2Ygby5taW5IZWlnaHQ/by5taW5IZWlnaHQoKTpvLm1pbkhlaWdodCxkPXZvaWQgMCxwPXZvaWQgMCxmPXZvaWQgMCxoPXZvaWQgMCx1PW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxyZXNpemVzdGFydFwiLHtkZXRhaWw6ZS5pZH0pLGc9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbHJlc2l6ZVwiLHtkZXRhaWw6ZS5pZH0pLG09bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbHJlc2l6ZXN0b3BcIix7ZGV0YWlsOmUuaWR9KTtyZXR1cm4gdD10aGlzLnBPY29udGFpbm1lbnQoby5jb250YWlubWVudCksby5oYW5kbGVzLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3ZhciBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJESVZcIik7bi5jbGFzc05hbWU9XCJqc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZSBqc1BhbmVsLXJlc2l6ZWl0LVwiK3QudHJpbSgpLG4uc3R5bGUuekluZGV4PTkwLGUuYXBwZW5kKG4pfSksZS5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlXCIpLmZvckVhY2goZnVuY3Rpb24obil7anNQYW5lbC5wb2ludGVyZG93bi5mb3JFYWNoKGZ1bmN0aW9uKG0pe24uYWRkRXZlbnRMaXN0ZW5lcihtLGZ1bmN0aW9uKG4pe2lmKG4ucHJldmVudERlZmF1bHQoKSxuLmJ1dHRvbiYmbi5idXR0b24+MClyZXR1cm4hMTtlLmNvbnRlbnQuc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIjt2YXIgbT1lLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLGI9YS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSx5PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGEsbnVsbCksdj1wYXJzZUludCh5LmJvcmRlckxlZnRXaWR0aCwxMCksdz1wYXJzZUludCh5LmJvcmRlclRvcFdpZHRoLDEwKSxqPXkuZ2V0UHJvcGVydHlWYWx1ZShcInBvc2l0aW9uXCIpLEM9bi5jbGllbnRYfHxuLnRvdWNoZXNbMF0uY2xpZW50WCxFPW4uY2xpZW50WXx8bi50b3VjaGVzWzBdLmNsaWVudFksRj1DL0UsUD1tLndpZHRoLHg9bS5oZWlnaHQsej1uLnRhcmdldC5jbGFzc0xpc3QsUz1lLmdldFNjYWxlRmFjdG9yKCksQT1tLndpZHRoL20uaGVpZ2h0LEI9bS5sZWZ0LFQ9bS50b3AsTD0xZTQsRD0xZTQsaz0xZTQscT0xZTQ7XCJib2R5XCIhPT1pJiYoQj1tLmxlZnQtYi5sZWZ0K2Euc2Nyb2xsTGVmdCxUPW0udG9wLWIudG9wK2Euc2Nyb2xsVG9wKSxcImJvZHlcIj09PWkmJnQ/KEw9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLW0ubGVmdCxrPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRIZWlnaHQtbS50b3AsRD1tLndpZHRoK20ubGVmdCxxPW0uaGVpZ2h0K20udG9wKTp0JiYoXCJzdGF0aWNcIj09PWo/KEw9Yi53aWR0aC1tLmxlZnQrdixrPWIuaGVpZ2h0K2IudG9wLW0udG9wK3csRD1tLndpZHRoKyhtLmxlZnQtYi5sZWZ0KS12LHE9bS5oZWlnaHQrKG0udG9wLWIudG9wKS13KTooTD1hLmNsaWVudFdpZHRoLShtLmxlZnQtYi5sZWZ0KS9TLngrdixrPWEuY2xpZW50SGVpZ2h0LShtLnRvcC1iLnRvcCkvUy55K3csRD0obS53aWR0aCttLmxlZnQtYi5sZWZ0KS9TLngtdixxPWUuY2xpZW50SGVpZ2h0KyhtLnRvcC1iLnRvcCkvUy55LXcpKSx0JiYoRC09dFszXSxxLT10WzBdLEwtPXRbMV0say09dFsyXSk7dmFyIFI9d2luZG93LmdldENvbXB1dGVkU3R5bGUoZSksVz1wYXJzZUZsb2F0KFIud2lkdGgpLW0ud2lkdGgsTT1wYXJzZUZsb2F0KFIuaGVpZ2h0KS1tLmhlaWdodCxPPXBhcnNlRmxvYXQoUi5sZWZ0KS1tLmxlZnQsST1wYXJzZUZsb2F0KFIudG9wKS1tLnRvcDthIT09ZG9jdW1lbnQuYm9keSYmKE8rPWIubGVmdCxJKz1iLnRvcCksZD1mdW5jdGlvbihuKXtwfHwoZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh1KSxvLnN0YXJ0JiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MoZSxvLnN0YXJ0LCExLHt3aWR0aDpQLGhlaWdodDp4fSxuKSxqc1BhbmVsLmZyb250KGUpKSxwPTEsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChnKTt2YXIgaT1uLnRvdWNoZXM/bi50b3VjaGVzWzBdLmNsaWVudFg6bi5jbGllbnRYLGQ9bi50b3VjaGVzP24udG91Y2hlc1swXS5jbGllbnRZOm4uY2xpZW50WTt6LmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1lXCIpPygoZj1QKyhpLUMpL1MueCtXKT49TCYmKGY9TCksZj49cj9mPXI6Zjw9cyYmKGY9cyksZS5zdHlsZS53aWR0aD1mK1wicHhcIixvLmFzcGVjdFJhdGlvJiYoZS5zdHlsZS5oZWlnaHQ9Zi9BK1wicHhcIixvLmNvbnRhaW5tZW50JiZlLm92ZXJsYXBzKGEpLmJvdHRvbTw9dFsyXSYmKGUuc3R5bGUuaGVpZ2h0PWsrXCJweFwiLGUuc3R5bGUud2lkdGg9aypBK1wicHhcIikpKTp6LmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1zXCIpPygoaD14KyhkLUUpL1MueStNKT49ayYmKGg9ayksaD49bD9oPWw6aDw9YyYmKGg9YyksZS5zdHlsZS5oZWlnaHQ9aCtcInB4XCIsby5hc3BlY3RSYXRpbyYmKGUuc3R5bGUud2lkdGg9aCpBK1wicHhcIixvLmNvbnRhaW5tZW50JiZlLm92ZXJsYXBzKGEpLnJpZ2h0PD10WzFdJiYoZS5zdHlsZS53aWR0aD1MK1wicHhcIixlLnN0eWxlLmhlaWdodD1ML0ErXCJweFwiKSkpOnouY29udGFpbnMoXCJqc1BhbmVsLXJlc2l6ZWl0LXdcIik/KChmPVArKEMtaSkvUy54K1cpPD1yJiZmPj1zJiZmPD1EJiYoZS5zdHlsZS5sZWZ0PUIrKGktQykvUy54K08rXCJweFwiKSxmPj1EJiYoZj1EKSxmPj1yP2Y9cjpmPD1zJiYoZj1zKSxlLnN0eWxlLndpZHRoPWYrXCJweFwiLG8uYXNwZWN0UmF0aW8mJihlLnN0eWxlLmhlaWdodD1mL0ErXCJweFwiLG8uY29udGFpbm1lbnQmJmUub3ZlcmxhcHMoYSkuYm90dG9tPD10WzJdJiYoZS5zdHlsZS5oZWlnaHQ9aytcInB4XCIsZS5zdHlsZS53aWR0aD1rKkErXCJweFwiKSkpOnouY29udGFpbnMoXCJqc1BhbmVsLXJlc2l6ZWl0LW5cIik/KChoPXgrKEUtZCkvUy55K00pPD1sJiZoPj1jJiZoPD1xJiYoZS5zdHlsZS50b3A9VCsoZC1FKS9TLnkrSStcInB4XCIpLGg+PXEmJihoPXEpLGg+PWw/aD1sOmg8PWMmJihoPWMpLGUuc3R5bGUuaGVpZ2h0PWgrXCJweFwiLG8uYXNwZWN0UmF0aW8mJihlLnN0eWxlLndpZHRoPWgqQStcInB4XCIsby5jb250YWlubWVudCYmZS5vdmVybGFwcyhhKS5yaWdodDw9dFsxXSYmKGUuc3R5bGUud2lkdGg9TCtcInB4XCIsZS5zdHlsZS5oZWlnaHQ9TC9BK1wicHhcIikpKTp6LmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1zZVwiKT8oKGY9UCsoaS1DKS9TLngrVyk+PUwmJihmPUwpLGY+PXI/Zj1yOmY8PXMmJihmPXMpLGUuc3R5bGUud2lkdGg9ZitcInB4XCIsby5hc3BlY3RSYXRpbyYmKGUuc3R5bGUuaGVpZ2h0PWYvQStcInB4XCIpLChoPXgrKGQtRSkvUy55K00pPj1rJiYoaD1rKSxoPj1sP2g9bDpoPD1jJiYoaD1jKSxlLnN0eWxlLmhlaWdodD1oK1wicHhcIixvLmFzcGVjdFJhdGlvJiYoZS5zdHlsZS53aWR0aD1oKkErXCJweFwiLG8uY29udGFpbm1lbnQmJmUub3ZlcmxhcHMoYSkucmlnaHQ8PXRbMV0mJihlLnN0eWxlLndpZHRoPUwrXCJweFwiLGUuc3R5bGUuaGVpZ2h0PUwvQStcInB4XCIpKSk6ei5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtc3dcIik/KChoPXgrKGQtRSkvUy55K00pPj1rJiYoaD1rKSxoPj1sP2g9bDpoPD1jJiYoaD1jKSxlLnN0eWxlLmhlaWdodD1oK1wicHhcIixvLmFzcGVjdFJhdGlvJiYoZS5zdHlsZS53aWR0aD1oKkErXCJweFwiKSwoZj1QKyhDLWkpL1MueCtXKTw9ciYmZj49cyYmZjw9RCYmKGUuc3R5bGUubGVmdD1CKyhpLUMpL1MueCtPK1wicHhcIiksZj49RCYmKGY9RCksZj49cj9mPXI6Zjw9cyYmKGY9cyksZS5zdHlsZS53aWR0aD1mK1wicHhcIixvLmFzcGVjdFJhdGlvJiYoZS5zdHlsZS5oZWlnaHQ9Zi9BK1wicHhcIixvLmNvbnRhaW5tZW50JiZlLm92ZXJsYXBzKGEpLmJvdHRvbTw9dFsyXSYmKGUuc3R5bGUuaGVpZ2h0PWsrXCJweFwiLGUuc3R5bGUud2lkdGg9aypBK1wicHhcIikpKTp6LmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1uZVwiKT8oKGY9UCsoaS1DKS9TLngrVyk+PUwmJihmPUwpLGY+PXI/Zj1yOmY8PXMmJihmPXMpLGUuc3R5bGUud2lkdGg9ZitcInB4XCIsby5hc3BlY3RSYXRpbyYmKGUuc3R5bGUuaGVpZ2h0PWYvQStcInB4XCIpLChoPXgrKEUtZCkvUy55K00pPD1sJiZoPj1jJiZoPD1xJiYoZS5zdHlsZS50b3A9VCsoZC1FKS9TLnkrSStcInB4XCIpLGg+PXEmJihoPXEpLGg+PWw/aD1sOmg8PWMmJihoPWMpLGUuc3R5bGUuaGVpZ2h0PWgrXCJweFwiLG8uYXNwZWN0UmF0aW8mJihlLnN0eWxlLndpZHRoPWgqQStcInB4XCIsby5jb250YWlubWVudCYmZS5vdmVybGFwcyhhKS5yaWdodDw9dFsxXSYmKGUuc3R5bGUud2lkdGg9TCtcInB4XCIsZS5zdHlsZS5oZWlnaHQ9TC9BK1wicHhcIikpKTp6LmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1ud1wiKSYmKG8uYXNwZWN0UmF0aW8mJnouY29udGFpbnMoXCJqc1BhbmVsLXJlc2l6ZWl0LW53XCIpJiYoZD0oaT1kKkYpL0YpLChmPVArKEMtaSkvUy54K1cpPD1yJiZmPj1zJiZmPD1EJiYoZS5zdHlsZS5sZWZ0PUIrKGktQykvUy54K08rXCJweFwiKSxmPj1EJiYoZj1EKSxmPj1yP2Y9cjpmPD1zJiYoZj1zKSxlLnN0eWxlLndpZHRoPWYrXCJweFwiLG8uYXNwZWN0UmF0aW8mJihlLnN0eWxlLmhlaWdodD1mL0ErXCJweFwiKSwoaD14KyhFLWQpL1MueStNKTw9bCYmaD49YyYmaDw9cSYmKGUuc3R5bGUudG9wPVQrKGQtRSkvUy55K0krXCJweFwiKSxoPj1xJiYoaD1xKSxoPj1sP2g9bDpoPD1jJiYoaD1jKSxlLnN0eWxlLmhlaWdodD1oK1wicHhcIixvLmFzcGVjdFJhdGlvJiYoZS5zdHlsZS53aWR0aD1oKkErXCJweFwiKSksd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO3ZhciBtPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGUpLGI9e2xlZnQ6cGFyc2VGbG9hdChtLmxlZnQpLHRvcDpwYXJzZUZsb2F0KG0udG9wKSxyaWdodDpwYXJzZUZsb2F0KG0ucmlnaHQpLGJvdHRvbTpwYXJzZUZsb2F0KG0uYm90dG9tKSx3aWR0aDpwYXJzZUZsb2F0KG0ud2lkdGgpLGhlaWdodDpwYXJzZUZsb2F0KG0uaGVpZ2h0KX07by5yZXNpemUmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhlLG8ucmVzaXplLCExLGIsbil9LGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbihlKXtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGUsZCwhMSl9KSx3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlb3V0XCIsZnVuY3Rpb24oZSl7bnVsbD09PWUucmVsYXRlZFRhcmdldCYmanNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZSxkLCExKX0pfSwhMSl9KX0pfSksanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbih0KXtkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKHQsZnVuY3Rpb24odCl7aWYoanNQYW5lbC5wb2ludGVybW92ZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoZSxkLCExKX0pLHQudGFyZ2V0LmNsYXNzTGlzdCYmdC50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1oYW5kbGVcIikpe3ZhciBuPXZvaWQgMCxhPXZvaWQgMCxpPXQudGFyZ2V0LmNsYXNzTmFtZTtpZihpLm1hdGNoKC9qc1BhbmVsLXJlc2l6ZWl0LW53fGpzUGFuZWwtcmVzaXplaXQtd3xqc1BhbmVsLXJlc2l6ZWl0LXN3L2kpJiYobj0hMCksaS5tYXRjaCgvanNQYW5lbC1yZXNpemVpdC1ud3xqc1BhbmVsLXJlc2l6ZWl0LW58anNQYW5lbC1yZXNpemVpdC1uZS9pKSYmKGE9ITApLG8uZ3JpZCYmQXJyYXkuaXNBcnJheShvLmdyaWQpKXsxPT09by5ncmlkLmxlbmd0aCYmKG8uZ3JpZFsxXT1vLmdyaWRbMF0pO3ZhciByPXBhcnNlRmxvYXQoZS5zdHlsZS53aWR0aCksbD1wYXJzZUZsb2F0KGUuc3R5bGUuaGVpZ2h0KSxzPXIlby5ncmlkWzBdLGM9bCVvLmdyaWRbMV0sZj1wYXJzZUZsb2F0KGUuc3R5bGUubGVmdCksaD1wYXJzZUZsb2F0KGUuc3R5bGUudG9wKSx1PWYlby5ncmlkWzBdLGc9aCVvLmdyaWRbMV07czxvLmdyaWRbMF0vMj9lLnN0eWxlLndpZHRoPXItcytcInB4XCI6ZS5zdHlsZS53aWR0aD1yKyhvLmdyaWRbMF0tcykrXCJweFwiLGM8by5ncmlkWzFdLzI/ZS5zdHlsZS5oZWlnaHQ9bC1jK1wicHhcIjplLnN0eWxlLmhlaWdodD1sKyhvLmdyaWRbMV0tYykrXCJweFwiLG4mJih1PG8uZ3JpZFswXS8yP2Uuc3R5bGUubGVmdD1mLXUrXCJweFwiOmUuc3R5bGUubGVmdD1mKyhvLmdyaWRbMF0tdSkrXCJweFwiKSxhJiYoZzxvLmdyaWRbMV0vMj9lLnN0eWxlLnRvcD1oLWcrXCJweFwiOmUuc3R5bGUudG9wPWgrKG8uZ3JpZFsxXS1nKStcInB4XCIpfX1wJiYoZS5jb250ZW50LnN0eWxlLnBvaW50ZXJFdmVudHM9XCJpbmhlcml0XCIsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChtKSxwPXZvaWQgMCxlLnNhdmVDdXJyZW50RGltZW5zaW9ucygpLGUuc2F2ZUN1cnJlbnRQb3NpdGlvbigpLG8uc3RvcCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKGUsby5zdG9wLCExLHt3aWR0aDpwYXJzZUZsb2F0KGUuc3R5bGUud2lkdGgpLGhlaWdodDpwYXJzZUZsb2F0KGUuc3R5bGUuaGVpZ2h0KX0sdCkpLGUuY29udGVudC5zdHlsZS5wb2ludGVyRXZlbnRzPVwiaW5oZXJpdFwifSwhMSl9KSxvLmRpc2FibGUmJmUucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZVwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2Uuc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIn0pLGV9LHNldENsYXNzOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGUuY2xhc3NMaXN0LmFkZCh0KX0pLGV9LHJlbUNsYXNzOmZ1bmN0aW9uKGUsdCl7cmV0dXJuIHQuc3BsaXQoXCIgXCIpLmZvckVhY2goZnVuY3Rpb24odCl7cmV0dXJuIGUuY2xhc3NMaXN0LnJlbW92ZSh0KX0pLGV9LHNldFN0eWxlOmZ1bmN0aW9uKGUsdCl7Zm9yKHZhciBuIGluIHQpaWYodC5oYXNPd25Qcm9wZXJ0eShuKSl7dmFyIG89U3RyaW5nKG4pLnJlcGxhY2UoLy1cXHcvZ2ksZnVuY3Rpb24oZSl7cmV0dXJuIGUuc3Vic3RyKC0xKS50b1VwcGVyQ2FzZSgpfSk7ZS5zdHlsZVtvXT10W25dfXJldHVybiBlfSxzbmFwUGFuZWw6ZnVuY3Rpb24oZSx0KXtpZihlLmN1cnJlbnREYXRhLmJlZm9yZVNuYXA9e3dpZHRoOmUuY3VycmVudERhdGEud2lkdGgsaGVpZ2h0OmUuY3VycmVudERhdGEuaGVpZ2h0fSx0JiZcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXQuY2FsbChlLGUsZS5zbmFwcGFibGVUbyk7ZWxzZSBpZighMSE9PXQpe3ZhciBuPVswLDBdO2lmKGUub3B0aW9ucy5kcmFnaXQuc25hcC5jb250YWlubWVudCYmZS5vcHRpb25zLmRyYWdpdC5jb250YWlubWVudCl7dmFyIG89dGhpcy5wT2NvbnRhaW5tZW50KGUub3B0aW9ucy5kcmFnaXQuY29udGFpbm1lbnQpLGE9ZS5zbmFwcGFibGVUbzthLnN0YXJ0c1dpdGgoXCJsZWZ0XCIpP25bMF09b1szXTphLnN0YXJ0c1dpdGgoXCJyaWdodFwiKSYmKG5bMF09LW9bMV0pLGEuZW5kc1dpdGgoXCJ0b3BcIik/blsxXT1vWzBdOmEuZW5kc1dpdGgoXCJib3R0b21cIikmJihuWzFdPS1vWzJdKX1lLnJlcG9zaXRpb24oZS5zbmFwcGFibGVUbytcIiBcIituWzBdK1wiIFwiK25bMV0pLGUuc25hcHBlZD1lLnNuYXBwYWJsZVRvfX0sY3JlYXRlOmZ1bmN0aW9uKCl7dmFyIGU9dGhpcyx0PWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp7fSxuPWFyZ3VtZW50c1sxXTtqc1BhbmVsLnppfHwoanNQYW5lbC56aT1mdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTpqc1BhbmVsLnppQmFzZTtyZXR1cm57bmV4dDpmdW5jdGlvbigpe3JldHVybiBlKyt9fX0oKSk7dmFyIG89dm9pZCAwO3QuY29uZmlnP2RlbGV0ZSh0PU9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWZhdWx0cyx0LmNvbmZpZyx0KSkuY29uZmlnOnQ9T2JqZWN0LmFzc2lnbih7fSx0aGlzLmRlZmF1bHRzLHQpLHQuaWQ/XCJmdW5jdGlvblwiPT10eXBlb2YgdC5pZCYmKHQuaWQ9dC5pZCgpKTp0LmlkPVwianNQYW5lbC1cIisoanNQYW5lbC5pZENvdW50ZXIrPTEpO3ZhciBhPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHQuaWQpO2lmKG51bGwhPT1hKXJldHVybiBhLmNsYXNzTGlzdC5jb250YWlucyhcImpzUGFuZWxcIikmJmEuZnJvbnQoKSxjb25zb2xlLmVycm9yKFwiTk8gTkVXIFBBTkVMIENSRUFURUQhXFxuQW4gZWxlbWVudCB3aXRoIHRoZSBJRCA8XCIrdC5pZCtcIj4gYWxyZWFkeSBleGlzdHMgaW4gdGhlIGRvY3VtZW50LlwiKSwhMTt2YXIgaT10aGlzLnBPY29udGFpbmVyKHQuY29udGFpbmVyLG4pO2lmKCFpKXJldHVybiBjb25zb2xlLmVycm9yKFwiTk8gTkVXIFBBTkVMIENSRUFURUQhXFxuVGhlIGNvbnRhaW5lciB0byBhcHBlbmQgdGhlIHBhbmVsIHRvIGRvZXMgbm90IGV4aXN0IG9yIGEgY29udGFpbmVyIHdhcyBub3Qgc3BlY2lmaWVkIVwiKSwhMTt0Lm1heGltaXplZE1hcmdpbj10aGlzLnBPY29udGFpbm1lbnQodC5tYXhpbWl6ZWRNYXJnaW4pLHQuZHJhZ2l0JiYoW1wic3RhcnRcIixcImRyYWdcIixcInN0b3BcIl0uZm9yRWFjaChmdW5jdGlvbihlKXt0LmRyYWdpdFtlXT9cImZ1bmN0aW9uXCI9PXR5cGVvZiB0LmRyYWdpdFtlXSYmKHQuZHJhZ2l0W2VdPVt0LmRyYWdpdFtlXV0pOnQuZHJhZ2l0W2VdPVtdfSksdC5kcmFnaXQuc25hcCYmKFwib2JqZWN0XCI9PT1fdHlwZW9mKHQuZHJhZ2l0LnNuYXApP3QuZHJhZ2l0LnNuYXA9T2JqZWN0LmFzc2lnbih7fSx0aGlzLmRlZmF1bHRTbmFwQ29uZmlnLHQuZHJhZ2l0LnNuYXApOnQuZHJhZ2l0LnNuYXA9dGhpcy5kZWZhdWx0U25hcENvbmZpZykpLHQucmVzaXplaXQmJltcInN0YXJ0XCIsXCJyZXNpemVcIixcInN0b3BcIl0uZm9yRWFjaChmdW5jdGlvbihlKXt0LnJlc2l6ZWl0W2VdP1wiZnVuY3Rpb25cIj09dHlwZW9mIHQucmVzaXplaXRbZV0mJih0LnJlc2l6ZWl0W2VdPVt0LnJlc2l6ZWl0W2VdXSk6dC5yZXNpemVpdFtlXT1bXX0pLFtcIm9uYmVmb3JlY2xvc2VcIixcIm9uYmVmb3JlbWF4aW1pemVcIixcIm9uYmVmb3JlbWluaW1pemVcIixcIm9uYmVmb3Jlbm9ybWFsaXplXCIsXCJvbmJlZm9yZXNtYWxsaWZ5XCIsXCJvbmJlZm9yZXVuc21hbGxpZnlcIixcIm9uY2xvc2VkXCIsXCJvbmZyb250ZWRcIixcIm9ubWF4aW1pemVkXCIsXCJvbm1pbmltaXplZFwiLFwib25ub3JtYWxpemVkXCIsXCJvbnNtYWxsaWZpZWRcIixcIm9uc3RhdHVzY2hhbmdlXCIsXCJvbnVuc21hbGxpZmllZFwiXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3RbZV0/XCJmdW5jdGlvblwiPT10eXBlb2YgdFtlXSYmKHRbZV09W3RbZV1dKTp0W2VdPVtdfSksdC5oZWFkZXJSZW1vdmUmJih0LmhlYWRlcj0hMSk7dmFyIHI9dC50ZW1wbGF0ZT90LnRlbXBsYXRlOnRoaXMuY3JlYXRlUGFuZWxUZW1wbGF0ZSgpO3Iub3B0aW9ucz10LHIuc3RhdHVzPVwiaW5pdGlhbGl6ZWRcIixyLmN1cnJlbnREYXRhPXt9LHIuaGVhZGVyPXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWhkclwiKSxyLmhlYWRlcmJhcj1yLmhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtaGVhZGVyYmFyXCIpLHIudGl0bGViYXI9ci5oZWFkZXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLXRpdGxlYmFyXCIpLHIuaGVhZGVybG9nbz1yLmhlYWRlcmJhci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtaGVhZGVybG9nb1wiKSxyLmhlYWRlcnRpdGxlPXIuaGVhZGVyYmFyLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC10aXRsZVwiKSxyLmNvbnRyb2xiYXI9ci5oZWFkZXJiYXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWNvbnRyb2xiYXJcIiksci5oZWFkZXJ0b29sYmFyPXIuaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1oZHItdG9vbGJhclwiKSxyLmNvbnRlbnQ9ci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtY29udGVudFwiKSxyLmZvb3Rlcj1yLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1mdHJcIiksci5zbmFwcGFibGVUbz0hMSxyLnNuYXBwZWQ9ITE7dmFyIGw9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGxvYWRlZFwiLHtkZXRhaWw6dC5pZH0pLHM9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGJlZm9yZWNsb3NlXCIse2RldGFpbDp0LmlkfSksYz1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsY2xvc2VkXCIse2RldGFpbDp0LmlkfSksZD1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsY2xvc2VkdXNlclwiLHtkZXRhaWw6dC5pZH0pLHA9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbHN0YXR1c2NoYW5nZVwiLHtkZXRhaWw6dC5pZH0pLGY9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGJlZm9yZW5vcm1hbGl6ZVwiLHtkZXRhaWw6dC5pZH0pLGg9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbG5vcm1hbGl6ZWRcIix7ZGV0YWlsOnQuaWR9KSx1PW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxiZWZvcmVtYXhpbWl6ZVwiLHtkZXRhaWw6dC5pZH0pLGc9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbG1heGltaXplZFwiLHtkZXRhaWw6dC5pZH0pLG09bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGJlZm9yZW1pbmltaXplXCIse2RldGFpbDp0LmlkfSksYj1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsbWluaW1pemVkXCIse2RldGFpbDp0LmlkfSkseT1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsYmVmb3Jlc21hbGxpZnlcIix7ZGV0YWlsOnQuaWR9KSx2PW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxzbWFsbGlmaWVkXCIse2RldGFpbDp0LmlkfSksdz1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsc21hbGxpZmllZG1heFwiLHtkZXRhaWw6dC5pZH0pLGo9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGJlZm9yZXVuc21hbGxpZnlcIix7ZGV0YWlsOnQuaWR9KSxDPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxmcm9udGVkXCIse2RldGFpbDp0LmlkfSksRT1yLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tY2xvc2VcIiksRj1yLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tbWF4aW1pemVcIiksUD1yLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tbm9ybWFsaXplXCIpLHg9ci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLXNtYWxsaWZ5XCIpLHo9ci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2XCIpLFM9ci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLW1pbmltaXplXCIpO0UmJmpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oZSl7RS5hZGRFdmVudExpc3RlbmVyKGUsZnVuY3Rpb24oZSl7aWYoZS5wcmV2ZW50RGVmYXVsdCgpLGUuYnV0dG9uJiZlLmJ1dHRvbj4wKXJldHVybiExO3IuY2xvc2UoKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGQpfSl9KSxGJiZqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKGUpe0YuYWRkRXZlbnRMaXN0ZW5lcihlLGZ1bmN0aW9uKGUpe2lmKGUucHJldmVudERlZmF1bHQoKSxlLmJ1dHRvbiYmZS5idXR0b24+MClyZXR1cm4hMTtyLm1heGltaXplKCl9KX0pLFAmJmpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oZSl7UC5hZGRFdmVudExpc3RlbmVyKGUsZnVuY3Rpb24oZSl7aWYoZS5wcmV2ZW50RGVmYXVsdCgpLGUuYnV0dG9uJiZlLmJ1dHRvbj4wKXJldHVybiExO3Iubm9ybWFsaXplKCl9KX0pLHgmJmpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oZSl7eC5hZGRFdmVudExpc3RlbmVyKGUsZnVuY3Rpb24oZSl7aWYoZS5wcmV2ZW50RGVmYXVsdCgpLGUuYnV0dG9uJiZlLmJ1dHRvbj4wKXJldHVybiExO3Iuc21hbGxpZnkoKX0pfSkseiYmanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbihlKXt6LmFkZEV2ZW50TGlzdGVuZXIoZSxmdW5jdGlvbihlKXtpZihlLnByZXZlbnREZWZhdWx0KCksZS5idXR0b24mJmUuYnV0dG9uPjApcmV0dXJuITE7ci51bnNtYWxsaWZ5KCl9KX0pLFMmJmpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oZSl7Uy5hZGRFdmVudExpc3RlbmVyKGUsZnVuY3Rpb24oZSl7aWYoZS5wcmV2ZW50RGVmYXVsdCgpLGUuYnV0dG9uJiZlLmJ1dHRvbj4wKXJldHVybiExO3IubWluaW1pemUoKX0pfSk7dmFyIEE9anNQYW5lbC5leHRlbnNpb25zO2Zvcih2YXIgQiBpbiBBKUEuaGFzT3duUHJvcGVydHkoQikmJihyW0JdPUFbQl0pO2lmKHIuYWRkVG9vbGJhcj1mdW5jdGlvbihlLHQsbil7aWYoXCJoZWFkZXJcIj09PWU/ZT1yLmhlYWRlcnRvb2xiYXI6XCJmb290ZXJcIj09PWUmJihlPXIuZm9vdGVyKSxcInN0cmluZ1wiPT10eXBlb2YgdCllLmlubmVySFRNTD10O2Vsc2UgaWYoQXJyYXkuaXNBcnJheSh0KSl0LmZvckVhY2goZnVuY3Rpb24odCl7XCJzdHJpbmdcIj09dHlwZW9mIHQ/ZS5pbm5lckhUTUwrPXQ6ZS5hcHBlbmQodCl9KTtlbHNlIGlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHQpe3ZhciBvPXQuY2FsbChyLHIpO1wic3RyaW5nXCI9PXR5cGVvZiBvP2UuaW5uZXJIVE1MPW86ZS5hcHBlbmQobyl9ZWxzZSBlLmFwcGVuZCh0KTtyZXR1cm4gZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpLG4mJm4uY2FsbChyLHIpLHJ9LHIuYXBwbHlCdWlsdEluVGhlbWU9ZnVuY3Rpb24oZSl7aWYoci5jbGFzc0xpc3QuYWRkKFwianNQYW5lbC10aGVtZS1cIitlLmNvbG9yKSxyLmhlYWRlci5jbGFzc0xpc3QuYWRkKFwianNQYW5lbC10aGVtZS1cIitlLmNvbG9yKSxlLmZpbGxpbmcpe3ZhciBuPWUuZmlsbGluZztpZihcImZpbGxlZFwiPT09bnx8XCJmaWxsZWRsaWdodFwiPT09bilyLmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZD1cIlwiLHIuY29udGVudC5jbGFzc0xpc3QuYWRkKFwianNQYW5lbC1jb250ZW50LVwiK24pO2Vsc2V7dmFyIG89anNQYW5lbC5wZXJjZWl2ZWRCcmlnaHRuZXNzKG4pPD1qc1BhbmVsLmNvbG9yQnJpZ2h0bmVzc1RocmVzaG9sZD9cIiNmZmZcIjpcIiMwMDBcIjtyLmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yPW4sci5jb250ZW50LnN0eWxlLmNvbG9yPW99fXJldHVybiB0LmhlYWRlclRvb2xiYXJ8fChyLmNvbnRlbnQuc3R5bGUuYm9yZGVyVG9wPVwiMXB4IHNvbGlkIFwiK3IuaGVhZGVydGl0bGUuc3R5bGUuY29sb3IpLHJ9LHIuYXBwbHlBcmJpdHJhcnlUaGVtZT1mdW5jdGlvbihlKXtyLnN0eWxlLmJhY2tncm91bmRDb2xvcj1lLmNvbG9yc1swXSxyLmhlYWRlci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9ZS5jb2xvcnNbMF0sW1wiLmpzUGFuZWwtaGVhZGVybG9nb1wiLFwiLmpzUGFuZWwtdGl0bGVcIixcIi5qc1BhbmVsLWhkci10b29sYmFyXCJdLmZvckVhY2goZnVuY3Rpb24odCl7ci5xdWVyeVNlbGVjdG9yKHQpLnN0eWxlLmNvbG9yPWUuY29sb3JzWzNdfSxyKSxyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0blwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3Quc3R5bGUuY29sb3I9ZS5jb2xvcnNbM119KTt2YXIgbj1cIiMwMDAwMDBcIj09PWUuY29sb3JzWzNdP1wiMXB4IHNvbGlkIHJnYmEoMCwwLDAsMC4yKVwiOlwiMXB4IHNvbGlkIHJnYmEoMjU1LDI1NSwyNTUsMC4yKVwiO2lmKHQuaGVhZGVyVG9vbGJhcj8oZS5jb2xvcnNbM10sci5oZWFkZXJ0b29sYmFyLnN0eWxlLmJvcmRlclRvcD1uLGpzUGFuZWwuc2V0U3R5bGUoci5oZWFkZXJ0b29sYmFyLHtib3hTaGFkb3c6XCIwIDAgMXB4IFwiK2UuY29sb3JzWzNdK1wiIGluc2V0XCIsd2lkdGg6XCJjYWxjKDEwMCUgKyA0cHgpXCIsbWFyZ2luTGVmdDpcIi0xcHhcIn0pKTpyLmNvbnRlbnQuc3R5bGUuYm9yZGVyVG9wPW4sZS5maWxsaW5nKXt2YXIgbz1lLmZpbGxpbmc7aWYoXCJmaWxsZWRcIj09PW8panNQYW5lbC5zZXRTdHlsZShyLmNvbnRlbnQse2JhY2tncm91bmRDb2xvcjplLmNvbG9yc1swXSxjb2xvcjplLmNvbG9yc1szXSxib3JkZXJUb3A6bn0pO2Vsc2UgaWYoXCJmaWxsZWRsaWdodFwiPT09bylyLmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yPWUuY29sb3JzWzFdO2Vsc2V7dmFyIGE9anNQYW5lbC5wZXJjZWl2ZWRCcmlnaHRuZXNzKG8pPD1qc1BhbmVsLmNvbG9yQnJpZ2h0bmVzc1RocmVzaG9sZD9cIiNmZmZcIjpcIiMwMDBcIjtyLmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yPW8sci5jb250ZW50LnN0eWxlLmNvbG9yPWF9fXJldHVybiByfSxyLmFwcGx5Qm9vdHN0cmFwVGhlbWU9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5ic3RoZW1lLG49JC5mbi5idXR0b24uQ29uc3RydWN0b3IuVkVSU0lPTlswXTtpZihcIjRcIj09PW4/ci5jbGFzc0xpc3QuYWRkKFwiYmctXCIrdCk6KFtcInBhbmVsXCIsXCJwYW5lbC1cIit0XS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3IuY2xhc3NMaXN0LmFkZChlKX0pLHIuaGVhZGVyLmNsYXNzTGlzdC5hZGQoXCJwYW5lbC1oZWFkaW5nXCIpKSxcIm1kYlwiPT09ZS5icyl7dmFyIG89dCtcIi1jb2xvclwiO2UubWRiU3R5bGUmJihvKz1cIi1kYXJrXCIpLHIuY2xhc3NMaXN0LmFkZChvKX12YXIgYT12b2lkIDA7YT1cIjRcIj09PW4/d2luZG93LmdldENvbXB1dGVkU3R5bGUocikuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZyxcIlwiKTp3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShyLmhlYWRlcikuYmFja2dyb3VuZENvbG9yLnJlcGxhY2UoL1xccysvZyxcIlwiKTt2YXIgaT1qc1BhbmVsLmNhbGNDb2xvcnMoYSk7aWYoci5oZWFkZXIuc3R5bGUuY29sb3I9aVszXSxlLmZpbGxpbmcpe3ZhciBsPWUuZmlsbGluZztpZihcImZpbGxlZFwiPT09bHx8XCJmaWxsZWRsaWdodFwiPT09bClyLnNldFRoZW1lKGErXCIgXCIrZS5maWxsaW5nKTtlbHNle3Iuc2V0VGhlbWUoYSk7dmFyIHM9anNQYW5lbC5wZXJjZWl2ZWRCcmlnaHRuZXNzKGwpPD1qc1BhbmVsLmNvbG9yQnJpZ2h0bmVzc1RocmVzaG9sZD9cIiNmZmZcIjpcIiMwMDBcIjtyLmNvbnRlbnQuc3R5bGUuYmFja2dyb3VuZENvbG9yPWwsci5jb250ZW50LnN0eWxlLmNvbG9yPXN9fXJldHVybiByfSxyLmFwcGx5VGhlbWVCb3JkZXI9ZnVuY3Rpb24oZSl7dmFyIG49dC5ib3JkZXIuc3BsaXQoL1xccysvZ2kpO2lmKG5bMl0mJihqc1BhbmVsLmNvbG9yTmFtZXNbblsyXV0/anNQYW5lbC5jb2xvck5hbWVzW25bMl1dLm1hdGNoKC9eKFswLTlhLWZdezN9fFswLTlhLWZdezZ9KSQvZ2kpP25bMl09XCIjXCIranNQYW5lbC5jb2xvck5hbWVzW25bMl1dOm5bMl09anNQYW5lbC5jb2xvck5hbWVzW25bMl1dOm5bMl0ubWF0Y2goL14oWzAtOWEtZl17M318WzAtOWEtZl17Nn0pJC9naSkmJihuWzJdPVwiI1wiK25bMl0pKSxyLnN0eWxlLmJvcmRlcldpZHRoPW5bMF0sci5zdHlsZS5ib3JkZXJTdHlsZT1uWzFdLHIuc3R5bGUuYm9yZGVyQ29sb3I9blsyXSxlLmJzKXt2YXIgbz12b2lkIDA7bz1cInRyYW5zcGFyZW50XCI9PT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShyLmhlYWRlcikuYmFja2dyb3VuZENvbG9yP3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHIpLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKC9cXHMrL2csXCJcIik6d2luZG93LmdldENvbXB1dGVkU3R5bGUoci5oZWFkZXIpLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKC9cXHMrL2csXCJcIiksblsyXT9yLnN0eWxlLmJvcmRlckNvbG9yPW5bMl06ci5zdHlsZS5ib3JkZXJDb2xvcj1vfWVsc2UtMT09PWpzUGFuZWwudGhlbWVzLmluZGV4T2YoZS5jb2xvcikmJihuWzJdP3Iuc3R5bGUuYm9yZGVyQ29sb3I9blsyXTpyLnN0eWxlLmJvcmRlckNvbG9yPWUuY29sb3JzWzBdKTtyZXR1cm4gcn0sci5hdXRvcG9zaXRpb25SZW1haW5pbmc9ZnVuY3Rpb24oKXt2YXIgZT12b2lkIDA7KFtcImxlZnQtdG9wLWRvd25cIixcImxlZnQtdG9wLXJpZ2h0XCIsXCJjZW50ZXItdG9wLWRvd25cIixcInJpZ2h0LXRvcC1kb3duXCIsXCJyaWdodC10b3AtbGVmdFwiLFwibGVmdC1ib3R0b20tdXBcIixcImxlZnQtYm90dG9tLXJpZ2h0XCIsXCJjZW50ZXItYm90dG9tLXVwXCIsXCJyaWdodC1ib3R0b20tdXBcIixcInJpZ2h0LWJvdHRvbS1sZWZ0XCJdLmZvckVhY2goZnVuY3Rpb24odCl7ci5jbGFzc0xpc3QuY29udGFpbnModCkmJihlPXQpfSksZSkmJihcIndpbmRvd1wiPT09dC5jb250YWluZXI/ZG9jdW1lbnQuYm9keTp0LmNvbnRhaW5lcikucXVlcnlTZWxlY3RvckFsbChcIi5cIitlKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UucmVwb3NpdGlvbigpfSl9LHIuYm9yZGVyUmFkaXVzPWZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOjUsdD1cInN0cmluZ1wiPT10eXBlb2YgZT9lOmUrXCJweFwiLG49ci5oZWFkZXIuc3R5bGUsbz1yLmNvbnRlbnQuc3R5bGUsYT1yLmZvb3Rlci5zdHlsZTtyZXR1cm4gci5zdHlsZS5ib3JkZXJSYWRpdXM9dCxyLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1oZHJcIik/KG4uYm9yZGVyVG9wTGVmdFJhZGl1cz10LG4uYm9yZGVyVG9wUmlnaHRSYWRpdXM9dCk6KG8uYm9yZGVyVG9wTGVmdFJhZGl1cz10LG8uYm9yZGVyVG9wUmlnaHRSYWRpdXM9dCksci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtZnRyLmFjdGl2ZVwiKT8oYS5ib3JkZXJCb3R0b21MZWZ0UmFkaXVzPXQsYS5ib3JkZXJCb3R0b21SaWdodFJhZGl1cz10KTooby5ib3JkZXJCb3R0b21MZWZ0UmFkaXVzPXQsby5ib3JkZXJCb3R0b21SaWdodFJhZGl1cz10KSxyfSxyLmNhbGNTaXplRmFjdG9ycz1mdW5jdGlvbigpe3ZhciBlPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHIpO2lmKHQuY29udGFpbmVyPT09ZG9jdW1lbnQuYm9keSlyLmhmPXBhcnNlRmxvYXQoci5zdHlsZS5sZWZ0KS8oZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aC1wYXJzZUZsb2F0KHIuc3R5bGUud2lkdGgpKSxyLnZmPXBhcnNlRmxvYXQoci5zdHlsZS50b3ApLyh3aW5kb3cuaW5uZXJIZWlnaHQtcGFyc2VGbG9hdChlLmhlaWdodCkpO2Vsc2V7dmFyIG49ci5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3IuaGY9cGFyc2VGbG9hdChyLnN0eWxlLmxlZnQpLyhuLndpZHRoLXBhcnNlRmxvYXQoci5zdHlsZS53aWR0aCkpLHIudmY9cGFyc2VGbG9hdChyLnN0eWxlLnRvcCkvKG4uaGVpZ2h0LXBhcnNlRmxvYXQoZS5oZWlnaHQpKX19LHIuY2xlYXJUaGVtZT1mdW5jdGlvbihlKXtyZXR1cm4ganNQYW5lbC50aGVtZXMuY29uY2F0KGpzUGFuZWwubWRidGhlbWVzKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe1tcInBhbmVsXCIsXCJqc1BhbmVsLXRoZW1lLVwiK2UsXCJwYW5lbC1cIitlLGUrXCItY29sb3JcIl0uZm9yRWFjaChmdW5jdGlvbihlKXtyLmNsYXNzTGlzdC5yZW1vdmUoZSl9KSxyLmhlYWRlci5jbGFzc0xpc3QucmVtb3ZlKFwicGFuZWwtaGVhZGluZ1wiLFwianNQYW5lbC10aGVtZS1cIitlKX0sciksci5oZWFkZXJ0aXRsZS5jbGFzc0xpc3QucmVtb3ZlKFwicGFuZWwtdGl0bGVcIiksci5jb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJwYW5lbC1ib2R5XCIsXCJqc1BhbmVsLWNvbnRlbnQtZmlsbGVkXCIsXCJqc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHRcIiksci5mb290ZXIuY2xhc3NMaXN0LnJlbW92ZShcInBhbmVsLWZvb3RlclwiKSxqc1BhbmVsLnNldFN0eWxlKHIse2JhY2tncm91bmRDb2xvcjpcIlwiLGJvcmRlcldpZHRoOlwiXCIsYm9yZGVyU3R5bGU6XCJcIixib3JkZXJDb2xvcjpcIlwifSksanNQYW5lbC5zZXRTdHlsZShyLmNvbnRlbnQse2JhY2tncm91bmQ6XCJcIixib3JkZXI6XCJcIn0pLGpzUGFuZWwuc2V0U3R5bGUoci5oZWFkZXJ0b29sYmFyLHtib3hTaGFkb3c6XCJcIix3aWR0aDpcIlwiLG1hcmdpbkxlZnQ6XCJcIn0pLHIuaGVhZGVyLnN0eWxlLmJhY2tncm91bmQ9XCJcIixBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChyLmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLWljb25cIikpLmNvbmNhdChbci5oZWFkZXJsb2dvLHIuaGVhZGVydGl0bGUsci5oZWFkZXJ0b29sYmFyLHIuY29udGVudF0pLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5jb2xvcj1cIlwifSksZSYmZS5jYWxsKHIscikscn0sci5jbG9zZT1mdW5jdGlvbihlKXt2YXIgbj10LmlkLGE9dm9pZCAwLGk9ZnVuY3Rpb24oKXtpZihvJiZ3aW5kb3cuY2xlYXJUaW1lb3V0KG8pLHIuY2xvc2VDaGlsZHBhbmVscygpLHIucGFyZW50RWxlbWVudCYmKGE9ci5wYXJlbnRFbGVtZW50LnJlbW92ZUNoaWxkKHIpKSwhYSlyZXR1cm4hMTtyLnJlbW92ZU1pbmltaXplZFJlcGxhY2VtZW50KCksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChjKSx0Lm9uY2xvc2VkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3Mocix0Lm9uY2xvc2VkLFwiZXZlcnlcIiksci5hdXRvcG9zaXRpb25SZW1haW5pbmcoKX07cmV0dXJuIGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocyksdC5vbmJlZm9yZWNsb3NlJiZ0Lm9uYmVmb3JlY2xvc2UubGVuZ3RoPjAmJiFqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3Mocix0Lm9uYmVmb3JlY2xvc2UpP3I6KHQuYW5pbWF0ZU91dD8odC5hbmltYXRlSW4mJmpzUGFuZWwucmVtQ2xhc3Mocix0LmFuaW1hdGVJbiksanNQYW5lbC5zZXRDbGFzcyhyLHQuYW5pbWF0ZU91dCksci5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsZnVuY3Rpb24oKXtpKCl9KSk6aSgpLGE/KGUmJmUuY2FsbChuLG4pLGE9dm9pZCAwLG4pOihlJiZlLmNhbGwocixuLHIpLCExKSl9LHIuY2xvc2VDaGlsZHBhbmVscz1mdW5jdGlvbihlKXtyZXR1cm4gci5nZXRDaGlsZHBhbmVscygpLmZvckVhY2goZnVuY3Rpb24oZSl7cmV0dXJuIGUuY2xvc2UoKX0pLGUmJmUuY2FsbChyLHIpLHJ9LHIuY29udGVudFJlbW92ZT1mdW5jdGlvbihlKXtyZXR1cm4ganNQYW5lbC5lbXB0eU5vZGUoci5jb250ZW50KSxlJiZlLmNhbGwocixyKSxyfSxyLmNyZWF0ZU1pbmltaXplZFJlcGxhY2VtZW50PWZ1bmN0aW9uKCl7dmFyIGU9anNQYW5lbC5jcmVhdGVNaW5pbWl6ZWRUZW1wbGF0ZSgpLG49d2luZG93LmdldENvbXB1dGVkU3R5bGUoci5oZWFkZXJ0aXRsZSkuY29sb3Isbz10Lmljb25mb250LGE9ZS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtY29udHJvbGJhclwiKTtyZXR1cm4gZS5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9XCJ0cmFuc3BhcmVudFwiPT09d2luZG93LmdldENvbXB1dGVkU3R5bGUoci5oZWFkZXIpLmJhY2tncm91bmRDb2xvcj93aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShyKS5iYWNrZ3JvdW5kQ29sb3I6d2luZG93LmdldENvbXB1dGVkU3R5bGUoci5oZWFkZXIpLmJhY2tncm91bmRDb2xvcixlLmlkPXIuaWQrXCItbWluXCIsZS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtaGVhZGVyYmFyXCIpLnJlcGxhY2VDaGlsZChyLmhlYWRlcmxvZ28uY2xvbmVOb2RlKCEwKSxlLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1oZWFkZXJsb2dvXCIpKSxlLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC10aXRsZWJhclwiKS5yZXBsYWNlQ2hpbGQoci5oZWFkZXJ0aXRsZS5jbG9uZU5vZGUoITApLGUucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLXRpdGxlXCIpKSxlLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC10aXRsZVwiKS5zdHlsZS5jb2xvcj1uLGEuc3R5bGUuY29sb3I9bixyLnNldEljb25mb250KG8sZSksXCJlbmFibGVkXCI9PT1yLmRhdGFzZXQuYnRubm9ybWFsaXplP2pzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24odCl7ZS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiKS5hZGRFdmVudExpc3RlbmVyKHQsZnVuY3Rpb24oKXtyLm5vcm1hbGl6ZSgpfSl9KTphLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tbm9ybWFsaXplXCIpLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsXCJlbmFibGVkXCI9PT1yLmRhdGFzZXQuYnRubWF4aW1pemU/anNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbih0KXtlLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tbWF4aW1pemVcIikuYWRkRXZlbnRMaXN0ZW5lcih0LGZ1bmN0aW9uKCl7ci5tYXhpbWl6ZSgpfSl9KTphLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tbWF4aW1pemVcIikuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixcImVuYWJsZWRcIj09PXIuZGF0YXNldC5idG5jbG9zZT9qc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKHQpe2UucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1jbG9zZVwiKS5hZGRFdmVudExpc3RlbmVyKHQsZnVuY3Rpb24oKXtyLmNsb3NlKCl9KX0pOmEucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1jbG9zZVwiKS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGV9LHIuZHJhZ2l0PWZ1bmN0aW9uKGUpe3ZhciBuPU9iamVjdC5hc3NpZ24oe30sanNQYW5lbC5kZWZhdWx0cy5kcmFnaXQsdC5kcmFnaXQpLG89ci5xdWVyeVNlbGVjdG9yQWxsKG4uaGFuZGxlcyk7cmV0dXJuXCJkaXNhYmxlXCI9PT1lP28uZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCJ9KTpvLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5wb2ludGVyRXZlbnRzPVwiYXV0b1wifSkscn0sci5mcm9udD1mdW5jdGlvbihlKXt2YXIgbj0hKGFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdKXx8YXJndW1lbnRzWzFdO3JldHVybiBqc1BhbmVsLmZyb250KHIpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoQyksZSYmZS5jYWxsKHIsciksdC5vbmZyb250ZWQmJm4mJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub25mcm9udGVkLFwiZXZlcnlcIikscn0sci5nZXRDaGlsZHBhbmVscz1mdW5jdGlvbigpe3JldHVybiBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChyLmNvbnRlbnQucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsXCIpKX0sci5nZXRTY2FsZUZhY3Rvcj1mdW5jdGlvbigpe3ZhciBlPXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cmV0dXJue3g6ZS53aWR0aC9yLm9mZnNldFdpZHRoLHk6ZS5oZWlnaHQvci5vZmZzZXRIZWlnaHR9fSxyLmdldFRoZW1lRGV0YWlscz1mdW5jdGlvbihlKXt2YXIgdD1lLnRvTG93ZXJDYXNlKCkucmVwbGFjZSgvIC9nLFwiXCIpLG49e2NvbG9yOiExLGNvbG9yczohMSxmaWxsaW5nOiExLGJzOiExLGJzdGhlbWU6ITF9O2lmKHQuZW5kc1dpdGgoXCJmaWxsZWRcIikpbi5maWxsaW5nPVwiZmlsbGVkXCIsbi5jb2xvcj10LnN1YnN0cigwLHQubGVuZ3RoLTYpO2Vsc2UgaWYodC5lbmRzV2l0aChcImZpbGxlZGxpZ2h0XCIpKW4uZmlsbGluZz1cImZpbGxlZGxpZ2h0XCIsbi5jb2xvcj10LnN1YnN0cigwLHQubGVuZ3RoLTExKTtlbHNlIGlmKHQuaW5jbHVkZXMoXCJmaWxsY29sb3JcIikpe3ZhciBvPXQuc3BsaXQoXCJmaWxsY29sb3JcIik7anNQYW5lbC5jb2xvck5hbWVzW29bMV1dJiYob1sxXT1cIiNcIitqc1BhbmVsLmNvbG9yTmFtZXNbb1sxXV0pLG9bMV0ubWF0Y2goL14oWzAtOWEtZl17M318WzAtOWEtZl17Nn0pJC9naSkmJihvWzFdPVwiI1wiK29bMV0pLG4uZmlsbGluZz1vWzFdLG4uY29sb3I9b1swXX1lbHNlIG4uZmlsbGluZz1cIlwiLG4uY29sb3I9dDtpZihuLmNvbG9ycz1qc1BhbmVsLmNhbGNDb2xvcnMobi5jb2xvciksbi5jb2xvci5tYXRjaChcIi1cIikpe3ZhciBhPW4uY29sb3Iuc3BsaXQoXCItXCIpO24uYnM9YVswXSxuLmJzdGhlbWU9YVsxXSxuLm1kYlN0eWxlPWFbMl18fHZvaWQgMH1yZXR1cm4gbn0sci5pc0NoaWxkcGFuZWw9ZnVuY3Rpb24oKXt2YXIgZT1yLmNsb3Nlc3QoXCIuanNQYW5lbC1jb250ZW50XCIpO3JldHVybiEhZSYmZS5wYXJlbnRFbGVtZW50fSxyLm1heGltaXplPWZ1bmN0aW9uKGUpe2lmKHQub25iZWZvcmVtYXhpbWl6ZSYmdC5vbmJlZm9yZW1heGltaXplLmxlbmd0aD4wJiYhanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHIsdC5vbmJlZm9yZW1heGltaXplKSlyZXR1cm4gcjtkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHUpO3ZhciBuPXIucGFyZW50RWxlbWVudCxvPXQubWF4aW1pemVkTWFyZ2luO3JldHVybiBuPT09ZG9jdW1lbnQuYm9keT8oci5zdHlsZS53aWR0aD1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50V2lkdGgtb1sxXS1vWzNdK1wicHhcIixyLnN0eWxlLmhlaWdodD1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LW9bMF0tb1syXStcInB4XCIsci5zdHlsZS5sZWZ0PW9bM10rXCJweFwiLHIuc3R5bGUudG9wPW9bMF0rXCJweFwiLHQucG9zaXRpb24uZml4ZWR8fChyLnN0eWxlLmxlZnQ9d2luZG93LnBhZ2VYT2Zmc2V0K29bM10rXCJweFwiLHIuc3R5bGUudG9wPXdpbmRvdy5wYWdlWU9mZnNldCtvWzBdK1wicHhcIikpOihyLnN0eWxlLndpZHRoPW4uY2xpZW50V2lkdGgtb1sxXS1vWzNdK1wicHhcIixyLnN0eWxlLmhlaWdodD1uLmNsaWVudEhlaWdodC1vWzBdLW9bMl0rXCJweFwiLHIuc3R5bGUubGVmdD1vWzNdK1wicHhcIixyLnN0eWxlLnRvcD1vWzBdK1wicHhcIiksci5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpLHIuc3RhdHVzPVwibWF4aW1pemVkXCIsci5zZXRDb250cm9scyhbXCIuanNQYW5lbC1idG4tbWF4aW1pemVcIixcIi5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldlwiXSksanNQYW5lbC5mcm9udChyKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGcpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocCksdC5vbnN0YXR1c2NoYW5nZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHIsdC5vbnN0YXR1c2NoYW5nZSxcImV2ZXJ5XCIpLGUmJmUuY2FsbChyLHIpLHQub25tYXhpbWl6ZWQmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub25tYXhpbWl6ZWQsXCJldmVyeVwiKSxyfSxyLm1pbmltaXplPWZ1bmN0aW9uKGUpe2lmKFwibWluaW1pemVkXCI9PT1yLnN0YXR1cylyZXR1cm4gcjtpZih0Lm9uYmVmb3JlbWluaW1pemUmJnQub25iZWZvcmVtaW5pbWl6ZS5sZW5ndGg+MCYmIWpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub25iZWZvcmVtaW5pbWl6ZSkpcmV0dXJuIHI7aWYoZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChtKSwhZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lclwiKSl7dmFyIG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtuLmlkPVwianNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXJcIixkb2N1bWVudC5ib2R5LmFwcGVuZChuKX1pZihyLnN0eWxlLmxlZnQ9XCItOTk5OXB4XCIsci5zdGF0dXNCZWZvcmU9ci5zdGF0dXMsci5zdGF0dXM9XCJtaW5pbWl6ZWRcIixkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGIpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocCksdC5vbnN0YXR1c2NoYW5nZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHIsdC5vbnN0YXR1c2NoYW5nZSxcImV2ZXJ5XCIpLHQubWluaW1pemVUbyl7dmFyIG89ci5jcmVhdGVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpLGE9dm9pZCAwLGk9dm9pZCAwLGw9dm9pZCAwO1wiZGVmYXVsdFwiPT09dC5taW5pbWl6ZVRvP2RvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXJcIikuYXBwZW5kKG8pOlwicGFyZW50cGFuZWxcIj09PXQubWluaW1pemVUbz8oYT0obD0oaT1yLmNsb3Nlc3QoXCIuanNQYW5lbC1jb250ZW50XCIpLnBhcmVudEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1taW5pbWl6ZWQtYm94XCIpKVtsLmxlbmd0aC0xXSkuYXBwZW5kKG8pOlwicGFyZW50XCI9PT10Lm1pbmltaXplVG8/KChhPShpPXIucGFyZW50RWxlbWVudCkucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXJcIikpfHwoKGE9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSkuY2xhc3NOYW1lPVwianNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyXCIsaS5hcHBlbmQoYSkpLGEuYXBwZW5kKG8pKTpkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQubWluaW1pemVUbykuYXBwZW5kKG8pfXJldHVybiBlJiZlLmNhbGwocixyKSx0Lm9ubWluaW1pemVkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3Mocix0Lm9ubWluaW1pemVkLFwiZXZlcnlcIikscn0sci5ub3JtYWxpemU9ZnVuY3Rpb24oZSl7cmV0dXJuXCJub3JtYWxpemVkXCI9PT1yLnN0YXR1cz9yOnQub25iZWZvcmVub3JtYWxpemUmJnQub25iZWZvcmVub3JtYWxpemUubGVuZ3RoPjAmJiFqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3Mocix0Lm9uYmVmb3Jlbm9ybWFsaXplKT9yOihkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGYpLHIuc3R5bGUud2lkdGg9ci5jdXJyZW50RGF0YS53aWR0aCxyLnN0eWxlLmhlaWdodD1yLmN1cnJlbnREYXRhLmhlaWdodCxyLnN0eWxlLmxlZnQ9ci5jdXJyZW50RGF0YS5sZWZ0LHIuc3R5bGUudG9wPXIuY3VycmVudERhdGEudG9wLHIucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKSxyLnN0YXR1cz1cIm5vcm1hbGl6ZWRcIixyLnNldENvbnRyb2xzKFtcIi5qc1BhbmVsLWJ0bi1ub3JtYWxpemVcIixcIi5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldlwiXSksanNQYW5lbC5mcm9udChyKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGgpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocCksdC5vbnN0YXR1c2NoYW5nZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHIsdC5vbnN0YXR1c2NoYW5nZSxcImV2ZXJ5XCIpLGUmJmUuY2FsbChyLHIpLHQub25ub3JtYWxpemVkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3Mocix0Lm9ubm9ybWFsaXplZCxcImV2ZXJ5XCIpLHIpfSxyLm92ZXJsYXBzPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIGpzUGFuZWwub3ZlcmxhcHMocixlLHQpfSxyLnJlbW92ZU1pbmltaXplZFJlcGxhY2VtZW50PWZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoci5pZCtcIi1taW5cIik7cmV0dXJuIGUmJmUucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChlKSxyfSxyLnJlcG9zaXRpb249ZnVuY3Rpb24oKXtmb3IodmFyIGU9YXJndW1lbnRzLmxlbmd0aCxuPUFycmF5KGUpLG89MDtvPGU7bysrKW5bb109YXJndW1lbnRzW29dO3ZhciBhPXQucG9zaXRpb24saT0hMCxsPXZvaWQgMDtyZXR1cm4gbi5mb3JFYWNoKGZ1bmN0aW9uKGUpe1wic3RyaW5nXCI9PXR5cGVvZiBlfHxcIm9iamVjdFwiPT09KHZvaWQgMD09PWU/XCJ1bmRlZmluZWRcIjpfdHlwZW9mKGUpKT9hPWU6XCJib29sZWFuXCI9PXR5cGVvZiBlP2k9ZTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBlJiYobD1lKX0pLGpzUGFuZWwucG9zaXRpb24ocixhKSxpJiZyLnNhdmVDdXJyZW50UG9zaXRpb24oKSxsJiZsLmNhbGwocixyKSxyfSxyLnJlcG9zaXRpb25PblNuYXA9ZnVuY3Rpb24oZSl7dmFyIG49XCIwXCIsbz1cIjBcIixhPWpzUGFuZWwucE9jb250YWlubWVudCh0LmRyYWdpdC5jb250YWlubWVudCk7dC5kcmFnaXQuc25hcC5jb250YWlubWVudCYmKFwibGVmdC10b3BcIj09PWU/KG49YVszXSxvPWFbMF0pOlwicmlnaHQtdG9wXCI9PT1lPyhuPS1hWzFdLG89YVswXSk6XCJyaWdodC1ib3R0b21cIj09PWU/KG49LWFbMV0sbz0tYVsyXSk6XCJsZWZ0LWJvdHRvbVwiPT09ZT8obj1hWzNdLG89LWFbMl0pOlwiY2VudGVyLXRvcFwiPT09ZT8obj1hWzNdLzItYVsxXS8yLG89YVswXSk6XCJjZW50ZXItYm90dG9tXCI9PT1lPyhuPWFbM10vMi1hWzFdLzIsbz0tYVsyXSk6XCJsZWZ0LWNlbnRlclwiPT09ZT8obj1hWzNdLG89YVswXS8yLWFbMl0vMik6XCJyaWdodC1jZW50ZXJcIj09PWUmJihuPS1hWzFdLG89YVswXS8yLWFbMl0vMikpLGpzUGFuZWwucG9zaXRpb24ocixlKSxqc1BhbmVsLnNldFN0eWxlKHIse2xlZnQ6XCJjYWxjKFwiK3Iuc3R5bGUubGVmdCtcIiArIFwiK24rXCJweClcIix0b3A6XCJjYWxjKFwiK3Iuc3R5bGUudG9wK1wiICsgXCIrbytcInB4KVwifSl9LHIucmVzaXplPWZ1bmN0aW9uKCl7Zm9yKHZhciBlPWFyZ3VtZW50cy5sZW5ndGgsdD1BcnJheShlKSxuPTA7bjxlO24rKyl0W25dPWFyZ3VtZW50c1tuXTt2YXIgbz13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShyKSxhPXt3aWR0aDpvLndpZHRoLGhlaWdodDpvLmhlaWdodH0saT0hMCxsPXZvaWQgMDt0LmZvckVhY2goZnVuY3Rpb24oZSl7XCJzdHJpbmdcIj09dHlwZW9mIGU/YT1lOlwib2JqZWN0XCI9PT0odm9pZCAwPT09ZT9cInVuZGVmaW5lZFwiOl90eXBlb2YoZSkpP2E9T2JqZWN0LmFzc2lnbihhLGUpOlwiYm9vbGVhblwiPT10eXBlb2YgZT9pPWU6XCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKGw9ZSl9KTt2YXIgcz1qc1BhbmVsLnBPc2l6ZShyLGEpO3JldHVybiByLnN0eWxlLndpZHRoPXMud2lkdGgsci5zdHlsZS5oZWlnaHQ9cy5oZWlnaHQsaSYmci5zYXZlQ3VycmVudERpbWVuc2lvbnMoKSxsJiZsLmNhbGwocixyKSxyfSxyLnJlc2l6ZWl0PWZ1bmN0aW9uKGUpe3ZhciB0PXIucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZVwiKTtyZXR1cm5cImRpc2FibGVcIj09PWU/dC5mb3JFYWNoKGZ1bmN0aW9uKGUpe2Uuc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIn0pOnQuZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJhdXRvXCJ9KSxyfSxyLnNhdmVDdXJyZW50RGltZW5zaW9ucz1mdW5jdGlvbigpe3ZhciBlPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHIpO3IuY3VycmVudERhdGEud2lkdGg9ZS53aWR0aCxcIm5vcm1hbGl6ZWRcIj09PXIuc3RhdHVzJiYoci5jdXJyZW50RGF0YS5oZWlnaHQ9ZS5oZWlnaHQpfSxyLnNhdmVDdXJyZW50UG9zaXRpb249ZnVuY3Rpb24oKXt2YXIgZT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShyKTtyLmN1cnJlbnREYXRhLmxlZnQ9ZS5sZWZ0LHIuY3VycmVudERhdGEudG9wPWUudG9wfSxyLnNldENvbnRyb2xzPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHIuaGVhZGVyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1idG5cIikuZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLmRpc3BsYXk9XCJibG9ja1wifSksZS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3ZhciB0PXIuY29udHJvbGJhci5xdWVyeVNlbGVjdG9yKGUpO3QmJih0LnN0eWxlLmRpc3BsYXk9XCJub25lXCIpfSksdCYmdC5jYWxsKHIscikscn0sci5zZXRDb250cm9sU3RhdHVzPWZ1bmN0aW9uKGUpe3ZhciB0PWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTpcImVuYWJsZVwiLG49YXJndW1lbnRzWzJdO2lmKFwiZGlzYWJsZVwiPT09dCl7aWYoXCJyZW1vdmVkXCIhPT1yLmdldEF0dHJpYnV0ZShcImRhdGEtYnRuXCIrZSkpe3Iuc2V0QXR0cmlidXRlKFwiZGF0YS1idG5cIitlLFwiZGlzYWJsZWRcIik7dmFyIG89ci5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tXCIrZSk7by5zdHlsZS5wb2ludGVyRXZlbnRzPVwibm9uZVwiLG8uc3R5bGUub3BhY2l0eT0uNCxvLnN0eWxlLmN1cnNvcj1cImRlZmF1bHRcIn19ZWxzZSBpZihcImVuYWJsZVwiPT09dCl7aWYoXCJyZW1vdmVkXCIhPT1yLmdldEF0dHJpYnV0ZShcImRhdGEtYnRuXCIrZSkpe3Iuc2V0QXR0cmlidXRlKFwiZGF0YS1idG5cIitlLFwiZW5hYmxlZFwiKTt2YXIgYT1yLmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1cIitlKTthLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJhdXRvXCIsYS5zdHlsZS5vcGFjaXR5PTEsYS5zdHlsZS5jdXJzb3I9XCJwb2ludGVyXCJ9fWVsc2UgaWYoXCJyZW1vdmVcIj09PXQpe3ZhciBpPXIuY29udHJvbGJhci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLVwiK2UpO3IuY29udHJvbGJhci5yZW1vdmVDaGlsZChpKSxyLnNldEF0dHJpYnV0ZShcImRhdGEtYnRuXCIrZSxcInJlbW92ZWRcIil9cmV0dXJuIG4mJm4uY2FsbChyLHIpLHJ9LHIuc2V0SGVhZGVyQ29udHJvbHM9ZnVuY3Rpb24oZSl7dmFyIG49W1wiY2xvc2VcIixcIm1heGltaXplXCIsXCJub3JtYWxpemVcIixcIm1pbmltaXplXCIsXCJzbWFsbGlmeVwiLFwic21hbGxpZnlyZXZcIl0sbz10LmhlYWRlckNvbnRyb2xzO3JldHVyblwic3RyaW5nXCI9PXR5cGVvZiBvP1wibm9uZVwiPT09bz9uLmZvckVhY2goZnVuY3Rpb24oZSl7ci5zZXRDb250cm9sU3RhdHVzKGUsXCJyZW1vdmVcIil9KTpcImNsb3Nlb25seVwiPT09byYmbi5mb3JFYWNoKGZ1bmN0aW9uKGUpe1wiY2xvc2VcIiE9PWUmJnIuc2V0Q29udHJvbFN0YXR1cyhlLFwicmVtb3ZlXCIpfSk6bi5mb3JFYWNoKGZ1bmN0aW9uKGUpe29bZV0mJnIuc2V0Q29udHJvbFN0YXR1cyhlLG9bZV0pfSksZSYmZS5jYWxsKHIscikscn0sci5zZXRIZWFkZXJMb2dvPWZ1bmN0aW9uKGUsdCl7dmFyIG49W3IuaGVhZGVybG9nb10sbz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiK3IuaWQrXCItbWluXCIpO3JldHVybiBvJiZuLnB1c2goby5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtaGVhZGVybG9nb1wiKSksXCJzdHJpbmdcIj09dHlwZW9mIGU/XCI8XCIhPT1lLnN1YnN0cigwLDEpP24uZm9yRWFjaChmdW5jdGlvbih0KXtqc1BhbmVsLmVtcHR5Tm9kZSh0KTt2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaW1nXCIpO24uc3JjPWUsdC5hcHBlbmQobil9KTpuLmZvckVhY2goZnVuY3Rpb24odCl7dC5pbm5lckhUTUw9ZX0pOm4uZm9yRWFjaChmdW5jdGlvbih0KXtqc1BhbmVsLmVtcHR5Tm9kZSh0KSx0LmFwcGVuZChlKX0pLG4uZm9yRWFjaChmdW5jdGlvbihlKXtlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJpbWdcIikuZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLm1heEhlaWdodD1nZXRDb21wdXRlZFN0eWxlKHIuaGVhZGVyYmFyKS5oZWlnaHR9KX0pLHQmJnQuY2FsbChyLHIpLHJ9LHIuc2V0SGVhZGVyUmVtb3ZlPWZ1bmN0aW9uKGUpe3JldHVybiByLnJlbW92ZUNoaWxkKHIuaGVhZGVyKSxyLmNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImpzUGFuZWwtY29udGVudC1ub2hlYWRlclwiKSxbXCJjbG9zZVwiLFwibWF4aW1pemVcIixcIm5vcm1hbGl6ZVwiLFwibWluaW1pemVcIixcInNtYWxsaWZ5XCIsXCJzbWFsbGlmeXJldlwiXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3Iuc2V0QXR0cmlidXRlKFwiZGF0YS1idG5cIitlLFwicmVtb3ZlZFwiKX0pLGUmJmUuY2FsbChyLHIpLHJ9LHIuc2V0SGVhZGVyVGl0bGU9ZnVuY3Rpb24oZSx0KXt2YXIgbj1bci5oZWFkZXJ0aXRsZV0sbz1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI1wiK3IuaWQrXCItbWluXCIpO3JldHVybiBvJiZuLnB1c2goby5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtdGl0bGVcIikpLFwic3RyaW5nXCI9PXR5cGVvZiBlP24uZm9yRWFjaChmdW5jdGlvbih0KXt0LmlubmVySFRNTD1lfSk6XCJmdW5jdGlvblwiPT10eXBlb2YgZT9uLmZvckVhY2goZnVuY3Rpb24odCl7anNQYW5lbC5lbXB0eU5vZGUodCksdC5pbm5lckhUTUw9ZSgpfSk6bi5mb3JFYWNoKGZ1bmN0aW9uKHQpe2pzUGFuZWwuZW1wdHlOb2RlKHQpLHQuYXBwZW5kKGUpfSksdCYmdC5jYWxsKHIscikscn0sci5zZXRJY29uZm9udD1mdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdJiZhcmd1bWVudHNbMF0sdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06cixuPWFyZ3VtZW50c1syXTtpZighMSE9PWUpe3ZhciBvPXZvaWQgMCxhPXZvaWQgMDtpZihcImJvb3RzdHJhcFwiPT09ZXx8XCJnbHlwaGljb25cIj09PWUpbz1bXCJnbHlwaGljb24gZ2x5cGhpY29uLXJlbW92ZVwiLFwiZ2x5cGhpY29uIGdseXBoaWNvbi1mdWxsc2NyZWVuXCIsXCJnbHlwaGljb24gZ2x5cGhpY29uLXJlc2l6ZS1mdWxsXCIsXCJnbHlwaGljb24gZ2x5cGhpY29uLW1pbnVzXCIsXCJnbHlwaGljb24gZ2x5cGhpY29uLWNoZXZyb24tZG93blwiLFwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLXVwXCJdO2Vsc2UgaWYoXCJmYVwiPT09ZXx8XCJmYXJcIj09PWV8fFwiZmFsXCI9PT1lfHxcImZhc1wiPT09ZSlvPVtlK1wiIGZhLXdpbmRvdy1jbG9zZVwiLGUrXCIgZmEtd2luZG93LW1heGltaXplXCIsZStcIiBmYS13aW5kb3ctcmVzdG9yZVwiLGUrXCIgZmEtd2luZG93LW1pbmltaXplXCIsZStcIiBmYS1jaGV2cm9uLWRvd25cIixlK1wiIGZhLWNoZXZyb24tdXBcIl07ZWxzZSBpZihcIm1hdGVyaWFsLWljb25zXCI9PT1lKW89W2UsZSxlLGUsZSxlXSxhPVtcImNsb3NlXCIsXCJmdWxsc2NyZWVuXCIsXCJmdWxsc2NyZWVuX2V4aXRcIixcImNhbGxfcmVjZWl2ZWRcIixcImV4cGFuZF9tb3JlXCIsXCJleHBhbmRfbGVzc1wiXSx0LmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLWJ0blwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2Uuc3R5bGUucGFkZGluZz1cIjZweCAwIDhweCAwXCJ9KTtlbHNle2lmKCFBcnJheS5pc0FycmF5KGUpKXJldHVybiB0O289W1wiY3VzdG9tLWNvbnRyb2wtaWNvbiBcIitlWzVdLFwiY3VzdG9tLWNvbnRyb2wtaWNvbiBcIitlWzRdLFwiY3VzdG9tLWNvbnRyb2wtaWNvbiBcIitlWzNdLFwiY3VzdG9tLWNvbnRyb2wtaWNvbiBcIitlWzJdLFwiY3VzdG9tLWNvbnRyb2wtaWNvbiBcIitlWzFdLFwiY3VzdG9tLWNvbnRyb2wtaWNvbiBcIitlWzBdXX10LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0blwiKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2pzUGFuZWwuZW1wdHlOb2RlKGUpLmlubmVySFRNTD1cIjxzcGFuPjwvc3Bhbj5cIn0pLEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKHQucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuID4gc3BhblwiKSkucmV2ZXJzZSgpLmZvckVhY2goZnVuY3Rpb24odCxuKXt0LmNsYXNzTmFtZT1vW25dLFwibWF0ZXJpYWwtaWNvbnNcIj09PWUmJih0LnRleHRDb250ZW50PWFbbl0pfSl9cmV0dXJuIG4mJm4uY2FsbCh0LHQpLHR9LHIuc2V0UnRsPWZ1bmN0aW9uKCl7W3IuaGVhZGVyLHIuaGVhZGVyYmFyLHIudGl0bGViYXIsci5jb250cm9sYmFyLHIuaGVhZGVydG9vbGJhcixyLmZvb3Rlcl0uZm9yRWFjaChmdW5jdGlvbihlKXtlLmNsYXNzTGlzdC5hZGQoXCJqc1BhbmVsLXJ0bFwiKX0pLFtyLmhlYWRlcnRpdGxlLHIuaGVhZGVydG9vbGJhcixyLmNvbnRlbnQsci5mb290ZXJdLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5kaXI9XCJydGxcIix0LnJ0bC5sYW5nJiYoZS5sYW5nPXQucnRsLmxhbmcpfSl9LHIuc2V0U2l6ZT1mdW5jdGlvbigpe2lmKHQucGFuZWxTaXplKXt2YXIgZT1qc1BhbmVsLnBPc2l6ZShyLHQucGFuZWxTaXplKTtyLnN0eWxlLndpZHRoPWUud2lkdGgsci5zdHlsZS5oZWlnaHQ9ZS5oZWlnaHR9ZWxzZSBpZih0LmNvbnRlbnRTaXplKXt2YXIgbj1qc1BhbmVsLnBPc2l6ZShyLHQuY29udGVudFNpemUpO3IuY29udGVudC5zdHlsZS53aWR0aD1uLndpZHRoLHIuY29udGVudC5zdHlsZS5oZWlnaHQ9bi5oZWlnaHQsci5zdHlsZS53aWR0aD1uLndpZHRoLHIuY29udGVudC5zdHlsZS53aWR0aD1cIjEwMCVcIn1yZXR1cm4gcn0sci5zZXRUaGVtZT1mdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTp0LnRoZW1lLG49YXJndW1lbnRzWzFdO2lmKHIuY2xlYXJUaGVtZSgpLFwibm9uZVwiPT09ZSlyZXR1cm4gci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9XCIjZmZmXCIscjt2YXIgbz1yLmdldFRoZW1lRGV0YWlscyhlKTtyZXR1cm4gby5icz9yLmFwcGx5Qm9vdHN0cmFwVGhlbWUobyk6LTEhPT1qc1BhbmVsLnRoZW1lcy5pbmRleE9mKG8uY29sb3IpP3IuYXBwbHlCdWlsdEluVGhlbWUobyk6ci5hcHBseUFyYml0cmFyeVRoZW1lKG8pLHQuYm9yZGVyP3IuYXBwbHlUaGVtZUJvcmRlcihvKTooci5zdHlsZS5ib3JkZXJXaWR0aD1cIlwiLHIuc3R5bGUuYm9yZGVyU3R5bGU9XCJcIixyLnN0eWxlLmJvcmRlckNvbG9yPVwiXCIpLG4mJm4uY2FsbChyLHIpLHJ9LHIuc21hbGxpZnk9ZnVuY3Rpb24oZSl7aWYoXCJzbWFsbGlmaWVkXCI9PT1yLnN0YXR1c3x8XCJzbWFsbGlmaWVkbWF4XCI9PT1yLnN0YXR1cylyZXR1cm4gcjtpZih0Lm9uYmVmb3Jlc21hbGxpZnkmJnQub25iZWZvcmVzbWFsbGlmeS5sZW5ndGg+MCYmIWpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub25iZWZvcmVzbWFsbGlmeSkpcmV0dXJuIHI7ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh5KSxcIm5vcm1hbGl6ZWRcIj09PXIuc3RhdHVzJiZyLnNhdmVDdXJyZW50RGltZW5zaW9ucygpLHIuc3R5bGUub3ZlcmZsb3c9XCJoaWRkZW5cIjt2YXIgbj13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShyKSxvPXBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoci5oZWFkZXJiYXIpLmhlaWdodCk7ci5zdHlsZS5oZWlnaHQ9cGFyc2VGbG9hdChuLmJvcmRlclRvcFdpZHRoKStwYXJzZUZsb2F0KG4uYm9yZGVyQm90dG9tV2lkdGgpK28rXCJweFwiLFwibm9ybWFsaXplZFwiPT09ci5zdGF0dXM/KHIuc2V0Q29udHJvbHMoW1wiLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiLFwiLmpzUGFuZWwtYnRuLXNtYWxsaWZ5XCJdKSxyLnN0YXR1cz1cInNtYWxsaWZpZWRcIixkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHYpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocCksdC5vbnN0YXR1c2NoYW5nZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHIsdC5vbnN0YXR1c2NoYW5nZSxcImV2ZXJ5XCIpKTpcIm1heGltaXplZFwiPT09ci5zdGF0dXMmJihyLnNldENvbnRyb2xzKFtcIi5qc1BhbmVsLWJ0bi1tYXhpbWl6ZVwiLFwiLmpzUGFuZWwtYnRuLXNtYWxsaWZ5XCJdKSxyLnN0YXR1cz1cInNtYWxsaWZpZWRtYXhcIixkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHcpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocCksdC5vbnN0YXR1c2NoYW5nZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHIsdC5vbnN0YXR1c2NoYW5nZSxcImV2ZXJ5XCIpKTt2YXIgYT1yLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1taW5pbWl6ZWQtYm94XCIpO3JldHVybiBhW2EubGVuZ3RoLTFdLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsZSYmZS5jYWxsKHIsciksdC5vbnNtYWxsaWZpZWQmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub25zbWFsbGlmaWVkLFwiZXZlcnlcIikscn0sci51bnNtYWxsaWZ5PWZ1bmN0aW9uKGUpe2lmKFwic21hbGxpZmllZFwiPT09ci5zdGF0dXN8fFwic21hbGxpZmllZG1heFwiPT09ci5zdGF0dXMpe2lmKHQub25iZWZvcmV1bnNtYWxsaWZ5JiZ0Lm9uYmVmb3JldW5zbWFsbGlmeS5sZW5ndGg+MCYmIWpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub25iZWZvcmV1bnNtYWxsaWZ5KSlyZXR1cm4gcjtkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGopLHIuc3R5bGUub3ZlcmZsb3c9XCJ2aXNpYmxlXCIsanNQYW5lbC5mcm9udChyKSxcInNtYWxsaWZpZWRcIj09PXIuc3RhdHVzPyhyLnN0eWxlLmhlaWdodD1yLmN1cnJlbnREYXRhLmhlaWdodCxyLnNldENvbnRyb2xzKFtcIi5qc1BhbmVsLWJ0bi1ub3JtYWxpemVcIixcIi5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldlwiXSksci5zdGF0dXM9XCJub3JtYWxpemVkXCIsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChoKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHApLHQub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub25zdGF0dXNjaGFuZ2UsXCJldmVyeVwiKSk6XCJzbWFsbGlmaWVkbWF4XCI9PT1yLnN0YXR1cz9yLm1heGltaXplKCk6XCJtaW5pbWl6ZWRcIj09PXIuc3RhdHVzJiZyLm5vcm1hbGl6ZSgpO3ZhciBuPXIucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLW1pbmltaXplZC1ib3hcIik7bltuLmxlbmd0aC0xXS5zdHlsZS5kaXNwbGF5PVwiZmxleFwiLGUmJmUuY2FsbChyLHIpLHQub251bnNtYWxsaWZpZWQmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub251bnNtYWxsaWZpZWQsXCJldmVyeVwiKX1yZXR1cm4gcn0sci5pZD10LmlkLHIuY2xhc3NMaXN0LmFkZChcImpzUGFuZWwtXCIrdC5wYW5lbHR5cGUpLFwic3RhbmRhcmRcIj09PXQucGFuZWx0eXBlJiYoci5zdHlsZS56SW5kZXg9dGhpcy56aS5uZXh0KCkpLGkuYXBwZW5kKHIpLHIuZnJvbnQoITEsITEpLHIuc2V0VGhlbWUodC50aGVtZSksdC5ib3hTaGFkb3cmJnIuY2xhc3NMaXN0LmFkZChcImpzUGFuZWwtZGVwdGgtXCIrdC5ib3hTaGFkb3cpLHQuaGVhZGVyKXtpZih0LmhlYWRlckxvZ28mJnIuc2V0SGVhZGVyTG9nbyh0LmhlYWRlckxvZ28pLHIuc2V0SWNvbmZvbnQodC5pY29uZm9udCksci5zZXRIZWFkZXJUaXRsZSh0LmhlYWRlclRpdGxlKSxyLnNldEhlYWRlckNvbnRyb2xzKCksXCJhdXRvLXNob3ctaGlkZVwiPT09dC5oZWFkZXIpe3ZhciBUPXQudGhlbWUuc3BsaXQoXCItXCIpLEw9XCJqc1BhbmVsLWRlcHRoLVwiK3QuYm94U2hhZG93LEQ9XCJiZy1cIixrPXZvaWQgMDtUWzFdJiYoRCs9VFsxXSksVFsyXSYmKGs9VFsxXStcIi1jb2xvci1cIitUWzJdKSxyLmhlYWRlci5zdHlsZS5vcGFjaXR5PTAsXCJib290c3RyYXBcIiE9PVRbMF0mJlwibWRiXCIhPT1UWzBdfHwodGhpcy5yZW1DbGFzcyhyLEQpLFwibWRiXCI9PT1UWzBdJiZ0aGlzLnJlbUNsYXNzKHIsaykpLHIuc3R5bGUuYmFja2dyb3VuZENvbG9yPVwidHJhbnNwYXJlbnRcIix0aGlzLnJlbUNsYXNzKHIsTCksdGhpcy5zZXRDbGFzcyhyLmNvbnRlbnQsTCksci5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlZW50ZXJcIixmdW5jdGlvbigpe3IuaGVhZGVyLnN0eWxlLm9wYWNpdHk9MSxcImJvb3RzdHJhcFwiIT09VFswXSYmXCJtZGJcIiE9PVRbMF18fChqc1BhbmVsLnNldENsYXNzKHIsRCksXCJtZGJcIj09PVRbMF0mJmpzUGFuZWwuc2V0Q2xhc3MocixrKSksanNQYW5lbC5zZXRDbGFzcyhyLEwpLGpzUGFuZWwucmVtQ2xhc3Moci5jb250ZW50LEwpfSksci5oZWFkZXIuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIixmdW5jdGlvbigpe3IuaGVhZGVyLnN0eWxlLm9wYWNpdHk9MCxcImJvb3RzdHJhcFwiIT09VFswXSYmXCJtZGJcIiE9PVRbMF18fChqc1BhbmVsLnJlbUNsYXNzKHIsRCksXCJtZGJcIj09PVRbMF0mJmpzUGFuZWwucmVtQ2xhc3MocixrKSksanNQYW5lbC5yZW1DbGFzcyhyLEwpLGpzUGFuZWwuc2V0Q2xhc3Moci5jb250ZW50LEwpfSl9fWVsc2Ugci5zZXRIZWFkZXJSZW1vdmUoKTtpZih0LmhlYWRlclRvb2xiYXImJnIuYWRkVG9vbGJhcihyLmhlYWRlcnRvb2xiYXIsdC5oZWFkZXJUb29sYmFyKSx0LmZvb3RlclRvb2xiYXImJnIuYWRkVG9vbGJhcihyLmZvb3Rlcix0LmZvb3RlclRvb2xiYXIpLHQuYm9yZGVyUmFkaXVzJiZyLmJvcmRlclJhZGl1cyh0LmJvcmRlclJhZGl1cyksdC5jb250ZW50JiYoXCJmdW5jdGlvblwiPT10eXBlb2YgdC5jb250ZW50P3QuY29udGVudC5jYWxsKHIscik6XCJzdHJpbmdcIj09dHlwZW9mIHQuY29udGVudD9yLmNvbnRlbnQuaW5uZXJIVE1MPXQuY29udGVudDpyLmNvbnRlbnQuYXBwZW5kKHQuY29udGVudCkpLHQuY29udGVudEFqYXgmJnRoaXMuYWpheChyLHQuY29udGVudEFqYXgpLHQuY29udGVudEZldGNoJiZ0aGlzLmZldGNoKHIpLHQuY29udGVudE92ZXJmbG93KXt2YXIgcT10LmNvbnRlbnRPdmVyZmxvdy5zcGxpdChcIiBcIik7MT09PXEubGVuZ3RoP3IuY29udGVudC5zdHlsZS5vdmVyZmxvdz1xWzBdOjI9PT1xLmxlbmd0aCYmKHIuY29udGVudC5zdHlsZS5vdmVyZmxvd1g9cVswXSxyLmNvbnRlbnQuc3R5bGUub3ZlcmZsb3dZPXFbMV0pfWlmKHQucnRsJiZyLnNldFJ0bCgpLHIuc2V0U2l6ZSgpLHIuc3RhdHVzPVwibm9ybWFsaXplZFwiLHQucG9zaXRpb258fFwiY3Vyc29yXCIhPT10LnBvc2l0aW9uP3RoaXMucG9zaXRpb24ocix0LnBvc2l0aW9uKTpyLnN0eWxlLm9wYWNpdHk9MSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGgpLHIuY2FsY1NpemVGYWN0b3JzKCksdC5hbmltYXRlSW4mJihyLmFkZEV2ZW50TGlzdGVuZXIoXCJhbmltYXRpb25lbmRcIixmdW5jdGlvbigpe2UucmVtQ2xhc3Mocix0LmFuaW1hdGVJbil9KSx0aGlzLnNldENsYXNzKHIsdC5hbmltYXRlSW4pKSx0LnN5bmNNYXJnaW5zKXt2YXIgUj10aGlzLnBPY29udGFpbm1lbnQodC5tYXhpbWl6ZWRNYXJnaW4pO3QuZHJhZ2l0JiYodC5kcmFnaXQuY29udGFpbm1lbnQ9Uix0LmRyYWdpdC5zbmFwJiYodC5kcmFnaXQuc25hcC5jb250YWlubWVudD0hMCkpLHQucmVzaXplaXQmJih0LnJlc2l6ZWl0LmNvbnRhaW5tZW50PVIpfWlmKHQuZHJhZ2l0Pyh0aGlzLmRyYWdpdChyLHQuZHJhZ2l0KSxyLmFkZEV2ZW50TGlzdGVuZXIoXCJqc3BhbmVsZHJhZ3N0b3BcIixmdW5jdGlvbihlKXtlLmRldGFpbD09PXIuaWQmJnIuY2FsY1NpemVGYWN0b3JzKCl9LCExKSk6ci50aXRsZWJhci5zdHlsZS5jdXJzb3I9XCJkZWZhdWx0XCIsdC5yZXNpemVpdCl7dGhpcy5yZXNpemVpdChyLHQucmVzaXplaXQpO3ZhciBXPXZvaWQgMDtyLmFkZEV2ZW50TGlzdGVuZXIoXCJqc3BhbmVscmVzaXplc3RhcnRcIixmdW5jdGlvbihlKXtlLmRldGFpbD09PXIuaWQmJihXPXIuc3RhdHVzKX0sITEpLHIuYWRkRXZlbnRMaXN0ZW5lcihcImpzcGFuZWxyZXNpemVzdG9wXCIsZnVuY3Rpb24oZSl7ZS5kZXRhaWw9PT1yLmlkJiYoXCJzbWFsbGlmaWVkXCI9PT1XfHxcInNtYWxsaWZpZWRtYXhcIj09PVd8fFwibWF4aW1pemVkXCI9PT1XKSYmcGFyc2VGbG9hdChyLnN0eWxlLmhlaWdodCk+cGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShyLmhlYWRlcikuaGVpZ2h0KSYmKHIuc2V0Q29udHJvbHMoW1wiLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiLFwiLmpzUGFuZWwtYnRuLXNtYWxsaWZ5cmV2XCJdKSxyLnN0YXR1cz1cIm5vcm1hbGl6ZWRcIixkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGgpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocCksdC5vbnN0YXR1c2NoYW5nZSYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHIsdC5vbnN0YXR1c2NoYW5nZSxcImV2ZXJ5XCIpLHIuY2FsY1NpemVGYWN0b3JzKCkpfSwhMSl9aWYoci5zYXZlQ3VycmVudERpbWVuc2lvbnMoKSxyLnNhdmVDdXJyZW50UG9zaXRpb24oKSx0LnNldFN0YXR1cyl7dmFyIE09dC5zZXRTdGF0dXM7aWYoXCJzbWFsbGlmaWVkbWF4XCI9PT1NKXIubWF4aW1pemUoKS5zbWFsbGlmeSgpO2Vsc2UgaWYoXCJzbWFsbGlmaWVkXCI9PT1NKXIuc21hbGxpZnkoKTtlbHNle3ZhciBPPU0uc3Vic3RyKDAsTS5sZW5ndGgtMSk7cltPXSgpfX1yZXR1cm4gdC5hdXRvY2xvc2UmJihvPXdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCl7ciYmci5jbG9zZSgpfSx0LmF1dG9jbG9zZSkpLHRoaXMucG9pbnRlcmRvd24uZm9yRWFjaChmdW5jdGlvbihlKXtyLmFkZEV2ZW50TGlzdGVuZXIoZSxmdW5jdGlvbihlKXtlLnRhcmdldC5jbG9zZXN0KFwiLmpzUGFuZWwtYnRuLWNsb3NlXCIpfHxlLnRhcmdldC5jbG9zZXN0KFwiLmpzUGFuZWwtYnRuLW1pbmltaXplXCIpfHxcInN0YW5kYXJkXCIhPT10LnBhbmVsdHlwZXx8ci5mcm9udCgpfSwhMSl9KSx0Lm9ud2luZG93cmVzaXplJiZ3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInJlc2l6ZVwiLGZ1bmN0aW9uKGUpe2lmKGUudGFyZ2V0PT09d2luZG93KXt2YXIgbj10Lm9ud2luZG93cmVzaXplLG89ci5zdGF0dXMsYT12b2lkIDA7aWYoIXIucGFyZW50RWxlbWVudClyZXR1cm4hMTthPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHIucGFyZW50RWxlbWVudCksXCJtYXhpbWl6ZWRcIj09PW8mJiEwPT09bj9yLm1heGltaXplKCk6XCJub3JtYWxpemVkXCIhPT1vJiZcInNtYWxsaWZpZWRcIiE9PW8mJlwibWF4aW1pemVkXCIhPT1vfHwoXCJmdW5jdGlvblwiPT10eXBlb2Ygbj9uLmNhbGwocixlLHIpOihyLnN0eWxlLmxlZnQ9KGw9dm9pZCAwLChsPVwid2luZG93XCI9PT10LmNvbnRhaW5lcj8od2luZG93LmlubmVyV2lkdGgtcGFyc2VGbG9hdChyLnN0eWxlLndpZHRoKSkqci5oZjoocGFyc2VGbG9hdChhLndpZHRoKS1wYXJzZUZsb2F0KHIuc3R5bGUud2lkdGgpKSpyLmhmKTw9MD8wOmwrXCJweFwiKSxyLnN0eWxlLnRvcD0oaT12b2lkIDAsKGk9XCJ3aW5kb3dcIj09PXQuY29udGFpbmVyPyh3aW5kb3cuaW5uZXJIZWlnaHQtcGFyc2VGbG9hdChyLmN1cnJlbnREYXRhLmhlaWdodCkpKnIudmY6KHBhcnNlRmxvYXQoYS5oZWlnaHQpLXBhcnNlRmxvYXQoci5jdXJyZW50RGF0YS5oZWlnaHQpKSpyLnZmKTw9MD8wOmkrXCJweFwiKSkpfXZhciBpLGx9LCExKSx0aGlzLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKGUpe3IuYWRkRXZlbnRMaXN0ZW5lcihlLGZ1bmN0aW9uKCl7ci5jb250ZW50LnN0eWxlLnBvaW50ZXJFdmVudHM9XCJpbmhlcml0XCJ9KX0pLHRoaXMuZ2xvYmFsQ2FsbGJhY2tzJiYoQXJyYXkuaXNBcnJheSh0aGlzLmdsb2JhbENhbGxiYWNrcyk/dGhpcy5nbG9iYWxDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihlKXtlLmNhbGwocixyKX0pOnRoaXMuZ2xvYmFsQ2FsbGJhY2tzLmNhbGwocixyKSksdC5jYWxsYmFjayYmKEFycmF5LmlzQXJyYXkodC5jYWxsYmFjayk/dC5jYWxsYmFjay5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UuY2FsbChyLHIpfSk6dC5jYWxsYmFjay5jYWxsKHIscikpLG4mJm4uY2FsbChyLHIpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobCkscn19OyIsIi8vIHNoaW0gZm9yIHVzaW5nIHByb2Nlc3MgaW4gYnJvd3NlclxudmFyIHByb2Nlc3MgPSBtb2R1bGUuZXhwb3J0cyA9IHt9O1xuXG4vLyBjYWNoZWQgZnJvbSB3aGF0ZXZlciBnbG9iYWwgaXMgcHJlc2VudCBzbyB0aGF0IHRlc3QgcnVubmVycyB0aGF0IHN0dWIgaXRcbi8vIGRvbid0IGJyZWFrIHRoaW5ncy4gIEJ1dCB3ZSBuZWVkIHRvIHdyYXAgaXQgaW4gYSB0cnkgY2F0Y2ggaW4gY2FzZSBpdCBpc1xuLy8gd3JhcHBlZCBpbiBzdHJpY3QgbW9kZSBjb2RlIHdoaWNoIGRvZXNuJ3QgZGVmaW5lIGFueSBnbG9iYWxzLiAgSXQncyBpbnNpZGUgYVxuLy8gZnVuY3Rpb24gYmVjYXVzZSB0cnkvY2F0Y2hlcyBkZW9wdGltaXplIGluIGNlcnRhaW4gZW5naW5lcy5cblxudmFyIGNhY2hlZFNldFRpbWVvdXQ7XG52YXIgY2FjaGVkQ2xlYXJUaW1lb3V0O1xuXG5mdW5jdGlvbiBkZWZhdWx0U2V0VGltb3V0KCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2V0VGltZW91dCBoYXMgbm90IGJlZW4gZGVmaW5lZCcpO1xufVxuZnVuY3Rpb24gZGVmYXVsdENsZWFyVGltZW91dCAoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdjbGVhclRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbihmdW5jdGlvbiAoKSB7XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBzZXRUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBkZWZhdWx0U2V0VGltb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgaWYgKHR5cGVvZiBjbGVhclRpbWVvdXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgICAgIH1cbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGRlZmF1bHRDbGVhclRpbWVvdXQ7XG4gICAgfVxufSAoKSlcbmZ1bmN0aW9uIHJ1blRpbWVvdXQoZnVuKSB7XG4gICAgaWYgKGNhY2hlZFNldFRpbWVvdXQgPT09IHNldFRpbWVvdXQpIHtcbiAgICAgICAgLy9ub3JtYWwgZW52aXJvbWVudHMgaW4gc2FuZSBzaXR1YXRpb25zXG4gICAgICAgIHJldHVybiBzZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfVxuICAgIC8vIGlmIHNldFRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRTZXRUaW1lb3V0ID09PSBkZWZhdWx0U2V0VGltb3V0IHx8ICFjYWNoZWRTZXRUaW1lb3V0KSAmJiBzZXRUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZFNldFRpbWVvdXQgPSBzZXRUaW1lb3V0O1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0KGZ1biwgMCk7XG4gICAgfSBjYXRjaChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZFNldFRpbWVvdXQuY2FsbChudWxsLCBmdW4sIDApO1xuICAgICAgICB9IGNhdGNoKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3JcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwodGhpcywgZnVuLCAwKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG59XG5mdW5jdGlvbiBydW5DbGVhclRpbWVvdXQobWFya2VyKSB7XG4gICAgaWYgKGNhY2hlZENsZWFyVGltZW91dCA9PT0gY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIC8vIGlmIGNsZWFyVGltZW91dCB3YXNuJ3QgYXZhaWxhYmxlIGJ1dCB3YXMgbGF0dGVyIGRlZmluZWRcbiAgICBpZiAoKGNhY2hlZENsZWFyVGltZW91dCA9PT0gZGVmYXVsdENsZWFyVGltZW91dCB8fCAhY2FjaGVkQ2xlYXJUaW1lb3V0KSAmJiBjbGVhclRpbWVvdXQpIHtcbiAgICAgICAgY2FjaGVkQ2xlYXJUaW1lb3V0ID0gY2xlYXJUaW1lb3V0O1xuICAgICAgICByZXR1cm4gY2xlYXJUaW1lb3V0KG1hcmtlcik7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIC8vIHdoZW4gd2hlbiBzb21lYm9keSBoYXMgc2NyZXdlZCB3aXRoIHNldFRpbWVvdXQgYnV0IG5vIEkuRS4gbWFkZG5lc3NcbiAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICB0cnkge1xuICAgICAgICAgICAgLy8gV2hlbiB3ZSBhcmUgaW4gSS5FLiBidXQgdGhlIHNjcmlwdCBoYXMgYmVlbiBldmFsZWQgc28gSS5FLiBkb2Vzbid0ICB0cnVzdCB0aGUgZ2xvYmFsIG9iamVjdCB3aGVuIGNhbGxlZCBub3JtYWxseVxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKG51bGwsIG1hcmtlcik7XG4gICAgICAgIH0gY2F0Y2ggKGUpe1xuICAgICAgICAgICAgLy8gc2FtZSBhcyBhYm92ZSBidXQgd2hlbiBpdCdzIGEgdmVyc2lvbiBvZiBJLkUuIHRoYXQgbXVzdCBoYXZlIHRoZSBnbG9iYWwgb2JqZWN0IGZvciAndGhpcycsIGhvcGZ1bGx5IG91ciBjb250ZXh0IGNvcnJlY3Qgb3RoZXJ3aXNlIGl0IHdpbGwgdGhyb3cgYSBnbG9iYWwgZXJyb3IuXG4gICAgICAgICAgICAvLyBTb21lIHZlcnNpb25zIG9mIEkuRS4gaGF2ZSBkaWZmZXJlbnQgcnVsZXMgZm9yIGNsZWFyVGltZW91dCB2cyBzZXRUaW1lb3V0XG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkQ2xlYXJUaW1lb3V0LmNhbGwodGhpcywgbWFya2VyKTtcbiAgICAgICAgfVxuICAgIH1cblxuXG5cbn1cbnZhciBxdWV1ZSA9IFtdO1xudmFyIGRyYWluaW5nID0gZmFsc2U7XG52YXIgY3VycmVudFF1ZXVlO1xudmFyIHF1ZXVlSW5kZXggPSAtMTtcblxuZnVuY3Rpb24gY2xlYW5VcE5leHRUaWNrKCkge1xuICAgIGlmICghZHJhaW5pbmcgfHwgIWN1cnJlbnRRdWV1ZSkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGRyYWluaW5nID0gZmFsc2U7XG4gICAgaWYgKGN1cnJlbnRRdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgcXVldWUgPSBjdXJyZW50UXVldWUuY29uY2F0KHF1ZXVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgfVxuICAgIGlmIChxdWV1ZS5sZW5ndGgpIHtcbiAgICAgICAgZHJhaW5RdWV1ZSgpO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gZHJhaW5RdWV1ZSgpIHtcbiAgICBpZiAoZHJhaW5pbmcpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2YXIgdGltZW91dCA9IHJ1blRpbWVvdXQoY2xlYW5VcE5leHRUaWNrKTtcbiAgICBkcmFpbmluZyA9IHRydWU7XG5cbiAgICB2YXIgbGVuID0gcXVldWUubGVuZ3RoO1xuICAgIHdoaWxlKGxlbikge1xuICAgICAgICBjdXJyZW50UXVldWUgPSBxdWV1ZTtcbiAgICAgICAgcXVldWUgPSBbXTtcbiAgICAgICAgd2hpbGUgKCsrcXVldWVJbmRleCA8IGxlbikge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRRdWV1ZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRRdWV1ZVtxdWV1ZUluZGV4XS5ydW4oKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICBxdWV1ZUluZGV4ID0gLTE7XG4gICAgICAgIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB9XG4gICAgY3VycmVudFF1ZXVlID0gbnVsbDtcbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIHJ1bkNsZWFyVGltZW91dCh0aW1lb3V0KTtcbn1cblxucHJvY2Vzcy5uZXh0VGljayA9IGZ1bmN0aW9uIChmdW4pIHtcbiAgICB2YXIgYXJncyA9IG5ldyBBcnJheShhcmd1bWVudHMubGVuZ3RoIC0gMSk7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICAgIGZvciAodmFyIGkgPSAxOyBpIDwgYXJndW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgICAgICBhcmdzW2kgLSAxXSA9IGFyZ3VtZW50c1tpXTtcbiAgICAgICAgfVxuICAgIH1cbiAgICBxdWV1ZS5wdXNoKG5ldyBJdGVtKGZ1biwgYXJncykpO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDEgJiYgIWRyYWluaW5nKSB7XG4gICAgICAgIHJ1blRpbWVvdXQoZHJhaW5RdWV1ZSk7XG4gICAgfVxufTtcblxuLy8gdjggbGlrZXMgcHJlZGljdGlibGUgb2JqZWN0c1xuZnVuY3Rpb24gSXRlbShmdW4sIGFycmF5KSB7XG4gICAgdGhpcy5mdW4gPSBmdW47XG4gICAgdGhpcy5hcnJheSA9IGFycmF5O1xufVxuSXRlbS5wcm90b3R5cGUucnVuID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuZnVuLmFwcGx5KG51bGwsIHRoaXMuYXJyYXkpO1xufTtcbnByb2Nlc3MudGl0bGUgPSAnYnJvd3Nlcic7XG5wcm9jZXNzLmJyb3dzZXIgPSB0cnVlO1xucHJvY2Vzcy5lbnYgPSB7fTtcbnByb2Nlc3MuYXJndiA9IFtdO1xucHJvY2Vzcy52ZXJzaW9uID0gJyc7IC8vIGVtcHR5IHN0cmluZyB0byBhdm9pZCByZWdleHAgaXNzdWVzXG5wcm9jZXNzLnZlcnNpb25zID0ge307XG5cbmZ1bmN0aW9uIG5vb3AoKSB7fVxuXG5wcm9jZXNzLm9uID0gbm9vcDtcbnByb2Nlc3MuYWRkTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5vbmNlID0gbm9vcDtcbnByb2Nlc3Mub2ZmID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlTGlzdGVuZXIgPSBub29wO1xucHJvY2Vzcy5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBub29wO1xucHJvY2Vzcy5lbWl0ID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucHJlcGVuZE9uY2VMaXN0ZW5lciA9IG5vb3A7XG5cbnByb2Nlc3MubGlzdGVuZXJzID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIFtdIH1cblxucHJvY2Vzcy5iaW5kaW5nID0gZnVuY3Rpb24gKG5hbWUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuYmluZGluZyBpcyBub3Qgc3VwcG9ydGVkJyk7XG59O1xuXG5wcm9jZXNzLmN3ZCA9IGZ1bmN0aW9uICgpIHsgcmV0dXJuICcvJyB9O1xucHJvY2Vzcy5jaGRpciA9IGZ1bmN0aW9uIChkaXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3MuY2hkaXIgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcbnByb2Nlc3MudW1hc2sgPSBmdW5jdGlvbigpIHsgcmV0dXJuIDA7IH07XG4iLCIvKlxuXHRNSVQgTGljZW5zZSBodHRwOi8vd3d3Lm9wZW5zb3VyY2Uub3JnL2xpY2Vuc2VzL21pdC1saWNlbnNlLnBocFxuXHRBdXRob3IgVG9iaWFzIEtvcHBlcnMgQHNva3JhXG4qL1xuXG52YXIgc3R5bGVzSW5Eb20gPSB7fTtcblxudmFyXHRtZW1vaXplID0gZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vO1xuXG5cdHJldHVybiBmdW5jdGlvbiAoKSB7XG5cdFx0aWYgKHR5cGVvZiBtZW1vID09PSBcInVuZGVmaW5lZFwiKSBtZW1vID0gZm4uYXBwbHkodGhpcywgYXJndW1lbnRzKTtcblx0XHRyZXR1cm4gbWVtbztcblx0fTtcbn07XG5cbnZhciBpc09sZElFID0gbWVtb2l6ZShmdW5jdGlvbiAoKSB7XG5cdC8vIFRlc3QgZm9yIElFIDw9IDkgYXMgcHJvcG9zZWQgYnkgQnJvd3NlcmhhY2tzXG5cdC8vIEBzZWUgaHR0cDovL2Jyb3dzZXJoYWNrcy5jb20vI2hhY2stZTcxZDg2OTJmNjUzMzQxNzNmZWU3MTVjMjIyY2I4MDVcblx0Ly8gVGVzdHMgZm9yIGV4aXN0ZW5jZSBvZiBzdGFuZGFyZCBnbG9iYWxzIGlzIHRvIGFsbG93IHN0eWxlLWxvYWRlclxuXHQvLyB0byBvcGVyYXRlIGNvcnJlY3RseSBpbnRvIG5vbi1zdGFuZGFyZCBlbnZpcm9ubWVudHNcblx0Ly8gQHNlZSBodHRwczovL2dpdGh1Yi5jb20vd2VicGFjay1jb250cmliL3N0eWxlLWxvYWRlci9pc3N1ZXMvMTc3XG5cdHJldHVybiB3aW5kb3cgJiYgZG9jdW1lbnQgJiYgZG9jdW1lbnQuYWxsICYmICF3aW5kb3cuYXRvYjtcbn0pO1xuXG52YXIgZ2V0VGFyZ2V0ID0gZnVuY3Rpb24gKHRhcmdldCwgcGFyZW50KSB7XG4gIGlmIChwYXJlbnQpe1xuICAgIHJldHVybiBwYXJlbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xuICB9XG4gIHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhcmdldCk7XG59O1xuXG52YXIgZ2V0RWxlbWVudCA9IChmdW5jdGlvbiAoZm4pIHtcblx0dmFyIG1lbW8gPSB7fTtcblxuXHRyZXR1cm4gZnVuY3Rpb24odGFyZ2V0LCBwYXJlbnQpIHtcbiAgICAgICAgICAgICAgICAvLyBJZiBwYXNzaW5nIGZ1bmN0aW9uIGluIG9wdGlvbnMsIHRoZW4gdXNlIGl0IGZvciByZXNvbHZlIFwiaGVhZFwiIGVsZW1lbnQuXG4gICAgICAgICAgICAgICAgLy8gVXNlZnVsIGZvciBTaGFkb3cgUm9vdCBzdHlsZSBpLmVcbiAgICAgICAgICAgICAgICAvLyB7XG4gICAgICAgICAgICAgICAgLy8gICBpbnNlcnRJbnRvOiBmdW5jdGlvbiAoKSB7IHJldHVybiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2Zvb1wiKS5zaGFkb3dSb290IH1cbiAgICAgICAgICAgICAgICAvLyB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiB0YXJnZXQgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiB0YXJnZXQoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBtZW1vW3RhcmdldF0gPT09IFwidW5kZWZpbmVkXCIpIHtcblx0XHRcdHZhciBzdHlsZVRhcmdldCA9IGdldFRhcmdldC5jYWxsKHRoaXMsIHRhcmdldCwgcGFyZW50KTtcblx0XHRcdC8vIFNwZWNpYWwgY2FzZSB0byByZXR1cm4gaGVhZCBvZiBpZnJhbWUgaW5zdGVhZCBvZiBpZnJhbWUgaXRzZWxmXG5cdFx0XHRpZiAod2luZG93LkhUTUxJRnJhbWVFbGVtZW50ICYmIHN0eWxlVGFyZ2V0IGluc3RhbmNlb2Ygd2luZG93LkhUTUxJRnJhbWVFbGVtZW50KSB7XG5cdFx0XHRcdHRyeSB7XG5cdFx0XHRcdFx0Ly8gVGhpcyB3aWxsIHRocm93IGFuIGV4Y2VwdGlvbiBpZiBhY2Nlc3MgdG8gaWZyYW1lIGlzIGJsb2NrZWRcblx0XHRcdFx0XHQvLyBkdWUgdG8gY3Jvc3Mtb3JpZ2luIHJlc3RyaWN0aW9uc1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gc3R5bGVUYXJnZXQuY29udGVudERvY3VtZW50LmhlYWQ7XG5cdFx0XHRcdH0gY2F0Y2goZSkge1xuXHRcdFx0XHRcdHN0eWxlVGFyZ2V0ID0gbnVsbDtcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0bWVtb1t0YXJnZXRdID0gc3R5bGVUYXJnZXQ7XG5cdFx0fVxuXHRcdHJldHVybiBtZW1vW3RhcmdldF1cblx0fTtcbn0pKCk7XG5cbnZhciBzaW5nbGV0b24gPSBudWxsO1xudmFyXHRzaW5nbGV0b25Db3VudGVyID0gMDtcbnZhclx0c3R5bGVzSW5zZXJ0ZWRBdFRvcCA9IFtdO1xuXG52YXJcdGZpeFVybHMgPSByZXF1aXJlKFwiLi91cmxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxpc3QsIG9wdGlvbnMpIHtcblx0aWYgKHR5cGVvZiBERUJVRyAhPT0gXCJ1bmRlZmluZWRcIiAmJiBERUJVRykge1xuXHRcdGlmICh0eXBlb2YgZG9jdW1lbnQgIT09IFwib2JqZWN0XCIpIHRocm93IG5ldyBFcnJvcihcIlRoZSBzdHlsZS1sb2FkZXIgY2Fubm90IGJlIHVzZWQgaW4gYSBub24tYnJvd3NlciBlbnZpcm9ubWVudFwiKTtcblx0fVxuXG5cdG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuXG5cdG9wdGlvbnMuYXR0cnMgPSB0eXBlb2Ygb3B0aW9ucy5hdHRycyA9PT0gXCJvYmplY3RcIiA/IG9wdGlvbnMuYXR0cnMgOiB7fTtcblxuXHQvLyBGb3JjZSBzaW5nbGUtdGFnIHNvbHV0aW9uIG9uIElFNi05LCB3aGljaCBoYXMgYSBoYXJkIGxpbWl0IG9uIHRoZSAjIG9mIDxzdHlsZT5cblx0Ly8gdGFncyBpdCB3aWxsIGFsbG93IG9uIGEgcGFnZVxuXHRpZiAoIW9wdGlvbnMuc2luZ2xldG9uICYmIHR5cGVvZiBvcHRpb25zLnNpbmdsZXRvbiAhPT0gXCJib29sZWFuXCIpIG9wdGlvbnMuc2luZ2xldG9uID0gaXNPbGRJRSgpO1xuXG5cdC8vIEJ5IGRlZmF1bHQsIGFkZCA8c3R5bGU+IHRhZ3MgdG8gdGhlIDxoZWFkPiBlbGVtZW50XG4gICAgICAgIGlmICghb3B0aW9ucy5pbnNlcnRJbnRvKSBvcHRpb25zLmluc2VydEludG8gPSBcImhlYWRcIjtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSBib3R0b20gb2YgdGhlIHRhcmdldFxuXHRpZiAoIW9wdGlvbnMuaW5zZXJ0QXQpIG9wdGlvbnMuaW5zZXJ0QXQgPSBcImJvdHRvbVwiO1xuXG5cdHZhciBzdHlsZXMgPSBsaXN0VG9TdHlsZXMobGlzdCwgb3B0aW9ucyk7XG5cblx0YWRkU3R5bGVzVG9Eb20oc3R5bGVzLCBvcHRpb25zKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlIChuZXdMaXN0KSB7XG5cdFx0dmFyIG1heVJlbW92ZSA9IFtdO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBzdHlsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRcdGRvbVN0eWxlLnJlZnMtLTtcblx0XHRcdG1heVJlbW92ZS5wdXNoKGRvbVN0eWxlKTtcblx0XHR9XG5cblx0XHRpZihuZXdMaXN0KSB7XG5cdFx0XHR2YXIgbmV3U3R5bGVzID0gbGlzdFRvU3R5bGVzKG5ld0xpc3QsIG9wdGlvbnMpO1xuXHRcdFx0YWRkU3R5bGVzVG9Eb20obmV3U3R5bGVzLCBvcHRpb25zKTtcblx0XHR9XG5cblx0XHRmb3IgKHZhciBpID0gMDsgaSA8IG1heVJlbW92ZS5sZW5ndGg7IGkrKykge1xuXHRcdFx0dmFyIGRvbVN0eWxlID0gbWF5UmVtb3ZlW2ldO1xuXG5cdFx0XHRpZihkb21TdHlsZS5yZWZzID09PSAwKSB7XG5cdFx0XHRcdGZvciAodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIGRvbVN0eWxlLnBhcnRzW2pdKCk7XG5cblx0XHRcdFx0ZGVsZXRlIHN0eWxlc0luRG9tW2RvbVN0eWxlLmlkXTtcblx0XHRcdH1cblx0XHR9XG5cdH07XG59O1xuXG5mdW5jdGlvbiBhZGRTdHlsZXNUb0RvbSAoc3R5bGVzLCBvcHRpb25zKSB7XG5cdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBzdHlsZXNbaV07XG5cdFx0dmFyIGRvbVN0eWxlID0gc3R5bGVzSW5Eb21baXRlbS5pZF07XG5cblx0XHRpZihkb21TdHlsZSkge1xuXHRcdFx0ZG9tU3R5bGUucmVmcysrO1xuXG5cdFx0XHRmb3IodmFyIGogPSAwOyBqIDwgZG9tU3R5bGUucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0ZG9tU3R5bGUucGFydHNbal0oaXRlbS5wYXJ0c1tqXSk7XG5cdFx0XHR9XG5cblx0XHRcdGZvcig7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXHRcdH0gZWxzZSB7XG5cdFx0XHR2YXIgcGFydHMgPSBbXTtcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGl0ZW0ucGFydHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdFx0cGFydHMucHVzaChhZGRTdHlsZShpdGVtLnBhcnRzW2pdLCBvcHRpb25zKSk7XG5cdFx0XHR9XG5cblx0XHRcdHN0eWxlc0luRG9tW2l0ZW0uaWRdID0ge2lkOiBpdGVtLmlkLCByZWZzOiAxLCBwYXJ0czogcGFydHN9O1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBsaXN0VG9TdHlsZXMgKGxpc3QsIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlcyA9IFtdO1xuXHR2YXIgbmV3U3R5bGVzID0ge307XG5cblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIGl0ZW0gPSBsaXN0W2ldO1xuXHRcdHZhciBpZCA9IG9wdGlvbnMuYmFzZSA/IGl0ZW1bMF0gKyBvcHRpb25zLmJhc2UgOiBpdGVtWzBdO1xuXHRcdHZhciBjc3MgPSBpdGVtWzFdO1xuXHRcdHZhciBtZWRpYSA9IGl0ZW1bMl07XG5cdFx0dmFyIHNvdXJjZU1hcCA9IGl0ZW1bM107XG5cdFx0dmFyIHBhcnQgPSB7Y3NzOiBjc3MsIG1lZGlhOiBtZWRpYSwgc291cmNlTWFwOiBzb3VyY2VNYXB9O1xuXG5cdFx0aWYoIW5ld1N0eWxlc1tpZF0pIHN0eWxlcy5wdXNoKG5ld1N0eWxlc1tpZF0gPSB7aWQ6IGlkLCBwYXJ0czogW3BhcnRdfSk7XG5cdFx0ZWxzZSBuZXdTdHlsZXNbaWRdLnBhcnRzLnB1c2gocGFydCk7XG5cdH1cblxuXHRyZXR1cm4gc3R5bGVzO1xufVxuXG5mdW5jdGlvbiBpbnNlcnRTdHlsZUVsZW1lbnQgKG9wdGlvbnMsIHN0eWxlKSB7XG5cdHZhciB0YXJnZXQgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0SW50bylcblxuXHRpZiAoIXRhcmdldCkge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIkNvdWxkbid0IGZpbmQgYSBzdHlsZSB0YXJnZXQuIFRoaXMgcHJvYmFibHkgbWVhbnMgdGhhdCB0aGUgdmFsdWUgZm9yIHRoZSAnaW5zZXJ0SW50bycgcGFyYW1ldGVyIGlzIGludmFsaWQuXCIpO1xuXHR9XG5cblx0dmFyIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wID0gc3R5bGVzSW5zZXJ0ZWRBdFRvcFtzdHlsZXNJbnNlcnRlZEF0VG9wLmxlbmd0aCAtIDFdO1xuXG5cdGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcInRvcFwiKSB7XG5cdFx0aWYgKCFsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCkge1xuXHRcdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgdGFyZ2V0LmZpcnN0Q2hpbGQpO1xuXHRcdH0gZWxzZSBpZiAobGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3AubmV4dFNpYmxpbmcpIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0XHR9XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5wdXNoKHN0eWxlKTtcblx0fSBlbHNlIGlmIChvcHRpb25zLmluc2VydEF0ID09PSBcImJvdHRvbVwiKSB7XG5cdFx0dGFyZ2V0LmFwcGVuZENoaWxkKHN0eWxlKTtcblx0fSBlbHNlIGlmICh0eXBlb2Ygb3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJvYmplY3RcIiAmJiBvcHRpb25zLmluc2VydEF0LmJlZm9yZSkge1xuXHRcdHZhciBuZXh0U2libGluZyA9IGdldEVsZW1lbnQob3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUsIHRhcmdldCk7XG5cdFx0dGFyZ2V0Lmluc2VydEJlZm9yZShzdHlsZSwgbmV4dFNpYmxpbmcpO1xuXHR9IGVsc2Uge1xuXHRcdHRocm93IG5ldyBFcnJvcihcIltTdHlsZSBMb2FkZXJdXFxuXFxuIEludmFsaWQgdmFsdWUgZm9yIHBhcmFtZXRlciAnaW5zZXJ0QXQnICgnb3B0aW9ucy5pbnNlcnRBdCcpIGZvdW5kLlxcbiBNdXN0IGJlICd0b3AnLCAnYm90dG9tJywgb3IgT2JqZWN0LlxcbiAoaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIjaW5zZXJ0YXQpXFxuXCIpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHJlbW92ZVN0eWxlRWxlbWVudCAoc3R5bGUpIHtcblx0aWYgKHN0eWxlLnBhcmVudE5vZGUgPT09IG51bGwpIHJldHVybiBmYWxzZTtcblx0c3R5bGUucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChzdHlsZSk7XG5cblx0dmFyIGlkeCA9IHN0eWxlc0luc2VydGVkQXRUb3AuaW5kZXhPZihzdHlsZSk7XG5cdGlmKGlkeCA+PSAwKSB7XG5cdFx0c3R5bGVzSW5zZXJ0ZWRBdFRvcC5zcGxpY2UoaWR4LCAxKTtcblx0fVxufVxuXG5mdW5jdGlvbiBjcmVhdGVTdHlsZUVsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInN0eWxlXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cblx0aWYob3B0aW9ucy5hdHRycy5ub25jZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0dmFyIG5vbmNlID0gZ2V0Tm9uY2UoKTtcblx0XHRpZiAobm9uY2UpIHtcblx0XHRcdG9wdGlvbnMuYXR0cnMubm9uY2UgPSBub25jZTtcblx0XHR9XG5cdH1cblxuXHRhZGRBdHRycyhzdHlsZSwgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBzdHlsZSk7XG5cblx0cmV0dXJuIHN0eWxlO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVMaW5rRWxlbWVudCAob3B0aW9ucykge1xuXHR2YXIgbGluayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpO1xuXG5cdGlmKG9wdGlvbnMuYXR0cnMudHlwZSA9PT0gdW5kZWZpbmVkKSB7XG5cdFx0b3B0aW9ucy5hdHRycy50eXBlID0gXCJ0ZXh0L2Nzc1wiO1xuXHR9XG5cdG9wdGlvbnMuYXR0cnMucmVsID0gXCJzdHlsZXNoZWV0XCI7XG5cblx0YWRkQXR0cnMobGluaywgb3B0aW9ucy5hdHRycyk7XG5cdGluc2VydFN0eWxlRWxlbWVudChvcHRpb25zLCBsaW5rKTtcblxuXHRyZXR1cm4gbGluaztcbn1cblxuZnVuY3Rpb24gYWRkQXR0cnMgKGVsLCBhdHRycykge1xuXHRPYmplY3Qua2V5cyhhdHRycykuZm9yRWFjaChmdW5jdGlvbiAoa2V5KSB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKGtleSwgYXR0cnNba2V5XSk7XG5cdH0pO1xufVxuXG5mdW5jdGlvbiBnZXROb25jZSgpIHtcblx0aWYgKHR5cGVvZiBfX3dlYnBhY2tfbm9uY2VfXyA9PT0gJ3VuZGVmaW5lZCcpIHtcblx0XHRyZXR1cm4gbnVsbDtcblx0fVxuXG5cdHJldHVybiBfX3dlYnBhY2tfbm9uY2VfXztcbn1cblxuZnVuY3Rpb24gYWRkU3R5bGUgKG9iaiwgb3B0aW9ucykge1xuXHR2YXIgc3R5bGUsIHVwZGF0ZSwgcmVtb3ZlLCByZXN1bHQ7XG5cblx0Ly8gSWYgYSB0cmFuc2Zvcm0gZnVuY3Rpb24gd2FzIGRlZmluZWQsIHJ1biBpdCBvbiB0aGUgY3NzXG5cdGlmIChvcHRpb25zLnRyYW5zZm9ybSAmJiBvYmouY3NzKSB7XG5cdCAgICByZXN1bHQgPSB0eXBlb2Ygb3B0aW9ucy50cmFuc2Zvcm0gPT09ICdmdW5jdGlvbidcblx0XHQgPyBvcHRpb25zLnRyYW5zZm9ybShvYmouY3NzKSBcblx0XHQgOiBvcHRpb25zLnRyYW5zZm9ybS5kZWZhdWx0KG9iai5jc3MpO1xuXG5cdCAgICBpZiAocmVzdWx0KSB7XG5cdCAgICBcdC8vIElmIHRyYW5zZm9ybSByZXR1cm5zIGEgdmFsdWUsIHVzZSB0aGF0IGluc3RlYWQgb2YgdGhlIG9yaWdpbmFsIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgcnVubmluZyBydW50aW1lIHRyYW5zZm9ybWF0aW9ucyBvbiB0aGUgY3NzLlxuXHQgICAgXHRvYmouY3NzID0gcmVzdWx0O1xuXHQgICAgfSBlbHNlIHtcblx0ICAgIFx0Ly8gSWYgdGhlIHRyYW5zZm9ybSBmdW5jdGlvbiByZXR1cm5zIGEgZmFsc3kgdmFsdWUsIGRvbid0IGFkZCB0aGlzIGNzcy5cblx0ICAgIFx0Ly8gVGhpcyBhbGxvd3MgY29uZGl0aW9uYWwgbG9hZGluZyBvZiBjc3Ncblx0ICAgIFx0cmV0dXJuIGZ1bmN0aW9uKCkge1xuXHQgICAgXHRcdC8vIG5vb3Bcblx0ICAgIFx0fTtcblx0ICAgIH1cblx0fVxuXG5cdGlmIChvcHRpb25zLnNpbmdsZXRvbikge1xuXHRcdHZhciBzdHlsZUluZGV4ID0gc2luZ2xldG9uQ291bnRlcisrO1xuXG5cdFx0c3R5bGUgPSBzaW5nbGV0b24gfHwgKHNpbmdsZXRvbiA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKSk7XG5cblx0XHR1cGRhdGUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIGZhbHNlKTtcblx0XHRyZW1vdmUgPSBhcHBseVRvU2luZ2xldG9uVGFnLmJpbmQobnVsbCwgc3R5bGUsIHN0eWxlSW5kZXgsIHRydWUpO1xuXG5cdH0gZWxzZSBpZiAoXG5cdFx0b2JqLnNvdXJjZU1hcCAmJlxuXHRcdHR5cGVvZiBVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBVUkwuY3JlYXRlT2JqZWN0VVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLnJldm9rZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIEJsb2IgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBidG9hID09PSBcImZ1bmN0aW9uXCJcblx0KSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVMaW5rRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSB1cGRhdGVMaW5rLmJpbmQobnVsbCwgc3R5bGUsIG9wdGlvbnMpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cblx0XHRcdGlmKHN0eWxlLmhyZWYpIFVSTC5yZXZva2VPYmplY3RVUkwoc3R5bGUuaHJlZik7XG5cdFx0fTtcblx0fSBlbHNlIHtcblx0XHRzdHlsZSA9IGNyZWF0ZVN0eWxlRWxlbWVudChvcHRpb25zKTtcblx0XHR1cGRhdGUgPSBhcHBseVRvVGFnLmJpbmQobnVsbCwgc3R5bGUpO1xuXHRcdHJlbW92ZSA9IGZ1bmN0aW9uICgpIHtcblx0XHRcdHJlbW92ZVN0eWxlRWxlbWVudChzdHlsZSk7XG5cdFx0fTtcblx0fVxuXG5cdHVwZGF0ZShvYmopO1xuXG5cdHJldHVybiBmdW5jdGlvbiB1cGRhdGVTdHlsZSAobmV3T2JqKSB7XG5cdFx0aWYgKG5ld09iaikge1xuXHRcdFx0aWYgKFxuXHRcdFx0XHRuZXdPYmouY3NzID09PSBvYmouY3NzICYmXG5cdFx0XHRcdG5ld09iai5tZWRpYSA9PT0gb2JqLm1lZGlhICYmXG5cdFx0XHRcdG5ld09iai5zb3VyY2VNYXAgPT09IG9iai5zb3VyY2VNYXBcblx0XHRcdCkge1xuXHRcdFx0XHRyZXR1cm47XG5cdFx0XHR9XG5cblx0XHRcdHVwZGF0ZShvYmogPSBuZXdPYmopO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRyZW1vdmUoKTtcblx0XHR9XG5cdH07XG59XG5cbnZhciByZXBsYWNlVGV4dCA9IChmdW5jdGlvbiAoKSB7XG5cdHZhciB0ZXh0U3RvcmUgPSBbXTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gKGluZGV4LCByZXBsYWNlbWVudCkge1xuXHRcdHRleHRTdG9yZVtpbmRleF0gPSByZXBsYWNlbWVudDtcblxuXHRcdHJldHVybiB0ZXh0U3RvcmUuZmlsdGVyKEJvb2xlYW4pLmpvaW4oJ1xcbicpO1xuXHR9O1xufSkoKTtcblxuZnVuY3Rpb24gYXBwbHlUb1NpbmdsZXRvblRhZyAoc3R5bGUsIGluZGV4LCByZW1vdmUsIG9iaikge1xuXHR2YXIgY3NzID0gcmVtb3ZlID8gXCJcIiA6IG9iai5jc3M7XG5cblx0aWYgKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSByZXBsYWNlVGV4dChpbmRleCwgY3NzKTtcblx0fSBlbHNlIHtcblx0XHR2YXIgY3NzTm9kZSA9IGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcyk7XG5cdFx0dmFyIGNoaWxkTm9kZXMgPSBzdHlsZS5jaGlsZE5vZGVzO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXNbaW5kZXhdKSBzdHlsZS5yZW1vdmVDaGlsZChjaGlsZE5vZGVzW2luZGV4XSk7XG5cblx0XHRpZiAoY2hpbGROb2Rlcy5sZW5ndGgpIHtcblx0XHRcdHN0eWxlLmluc2VydEJlZm9yZShjc3NOb2RlLCBjaGlsZE5vZGVzW2luZGV4XSk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHN0eWxlLmFwcGVuZENoaWxkKGNzc05vZGUpO1xuXHRcdH1cblx0fVxufVxuXG5mdW5jdGlvbiBhcHBseVRvVGFnIChzdHlsZSwgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgbWVkaWEgPSBvYmoubWVkaWE7XG5cblx0aWYobWVkaWEpIHtcblx0XHRzdHlsZS5zZXRBdHRyaWJ1dGUoXCJtZWRpYVwiLCBtZWRpYSlcblx0fVxuXG5cdGlmKHN0eWxlLnN0eWxlU2hlZXQpIHtcblx0XHRzdHlsZS5zdHlsZVNoZWV0LmNzc1RleHQgPSBjc3M7XG5cdH0gZWxzZSB7XG5cdFx0d2hpbGUoc3R5bGUuZmlyc3RDaGlsZCkge1xuXHRcdFx0c3R5bGUucmVtb3ZlQ2hpbGQoc3R5bGUuZmlyc3RDaGlsZCk7XG5cdFx0fVxuXG5cdFx0c3R5bGUuYXBwZW5kQ2hpbGQoZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoY3NzKSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gdXBkYXRlTGluayAobGluaywgb3B0aW9ucywgb2JqKSB7XG5cdHZhciBjc3MgPSBvYmouY3NzO1xuXHR2YXIgc291cmNlTWFwID0gb2JqLnNvdXJjZU1hcDtcblxuXHQvKlxuXHRcdElmIGNvbnZlcnRUb0Fic29sdXRlVXJscyBpc24ndCBkZWZpbmVkLCBidXQgc291cmNlbWFwcyBhcmUgZW5hYmxlZFxuXHRcdGFuZCB0aGVyZSBpcyBubyBwdWJsaWNQYXRoIGRlZmluZWQgdGhlbiBsZXRzIHR1cm4gY29udmVydFRvQWJzb2x1dGVVcmxzXG5cdFx0b24gYnkgZGVmYXVsdC4gIE90aGVyd2lzZSBkZWZhdWx0IHRvIHRoZSBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgb3B0aW9uXG5cdFx0ZGlyZWN0bHlcblx0Ki9cblx0dmFyIGF1dG9GaXhVcmxzID0gb3B0aW9ucy5jb252ZXJ0VG9BYnNvbHV0ZVVybHMgPT09IHVuZGVmaW5lZCAmJiBzb3VyY2VNYXA7XG5cblx0aWYgKG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzIHx8IGF1dG9GaXhVcmxzKSB7XG5cdFx0Y3NzID0gZml4VXJscyhjc3MpO1xuXHR9XG5cblx0aWYgKHNvdXJjZU1hcCkge1xuXHRcdC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9hLzI2NjAzODc1XG5cdFx0Y3NzICs9IFwiXFxuLyojIHNvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2Jhc2U2NCxcIiArIGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSkgKyBcIiAqL1wiO1xuXHR9XG5cblx0dmFyIGJsb2IgPSBuZXcgQmxvYihbY3NzXSwgeyB0eXBlOiBcInRleHQvY3NzXCIgfSk7XG5cblx0dmFyIG9sZFNyYyA9IGxpbmsuaHJlZjtcblxuXHRsaW5rLmhyZWYgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGJsb2IpO1xuXG5cdGlmKG9sZFNyYykgVVJMLnJldm9rZU9iamVjdFVSTChvbGRTcmMpO1xufVxuIiwiXG4vKipcbiAqIFdoZW4gc291cmNlIG1hcHMgYXJlIGVuYWJsZWQsIGBzdHlsZS1sb2FkZXJgIHVzZXMgYSBsaW5rIGVsZW1lbnQgd2l0aCBhIGRhdGEtdXJpIHRvXG4gKiBlbWJlZCB0aGUgY3NzIG9uIHRoZSBwYWdlLiBUaGlzIGJyZWFrcyBhbGwgcmVsYXRpdmUgdXJscyBiZWNhdXNlIG5vdyB0aGV5IGFyZSByZWxhdGl2ZSB0byBhXG4gKiBidW5kbGUgaW5zdGVhZCBvZiB0aGUgY3VycmVudCBwYWdlLlxuICpcbiAqIE9uZSBzb2x1dGlvbiBpcyB0byBvbmx5IHVzZSBmdWxsIHVybHMsIGJ1dCB0aGF0IG1heSBiZSBpbXBvc3NpYmxlLlxuICpcbiAqIEluc3RlYWQsIHRoaXMgZnVuY3Rpb24gXCJmaXhlc1wiIHRoZSByZWxhdGl2ZSB1cmxzIHRvIGJlIGFic29sdXRlIGFjY29yZGluZyB0byB0aGUgY3VycmVudCBwYWdlIGxvY2F0aW9uLlxuICpcbiAqIEEgcnVkaW1lbnRhcnkgdGVzdCBzdWl0ZSBpcyBsb2NhdGVkIGF0IGB0ZXN0L2ZpeFVybHMuanNgIGFuZCBjYW4gYmUgcnVuIHZpYSB0aGUgYG5wbSB0ZXN0YCBjb21tYW5kLlxuICpcbiAqL1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChjc3MpIHtcbiAgLy8gZ2V0IGN1cnJlbnQgbG9jYXRpb25cbiAgdmFyIGxvY2F0aW9uID0gdHlwZW9mIHdpbmRvdyAhPT0gXCJ1bmRlZmluZWRcIiAmJiB3aW5kb3cubG9jYXRpb247XG5cbiAgaWYgKCFsb2NhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcImZpeFVybHMgcmVxdWlyZXMgd2luZG93LmxvY2F0aW9uXCIpO1xuICB9XG5cblx0Ly8gYmxhbmsgb3IgbnVsbD9cblx0aWYgKCFjc3MgfHwgdHlwZW9mIGNzcyAhPT0gXCJzdHJpbmdcIikge1xuXHQgIHJldHVybiBjc3M7XG4gIH1cblxuICB2YXIgYmFzZVVybCA9IGxvY2F0aW9uLnByb3RvY29sICsgXCIvL1wiICsgbG9jYXRpb24uaG9zdDtcbiAgdmFyIGN1cnJlbnREaXIgPSBiYXNlVXJsICsgbG9jYXRpb24ucGF0aG5hbWUucmVwbGFjZSgvXFwvW15cXC9dKiQvLCBcIi9cIik7XG5cblx0Ly8gY29udmVydCBlYWNoIHVybCguLi4pXG5cdC8qXG5cdFRoaXMgcmVndWxhciBleHByZXNzaW9uIGlzIGp1c3QgYSB3YXkgdG8gcmVjdXJzaXZlbHkgbWF0Y2ggYnJhY2tldHMgd2l0aGluXG5cdGEgc3RyaW5nLlxuXG5cdCAvdXJsXFxzKlxcKCAgPSBNYXRjaCBvbiB0aGUgd29yZCBcInVybFwiIHdpdGggYW55IHdoaXRlc3BhY2UgYWZ0ZXIgaXQgYW5kIHRoZW4gYSBwYXJlbnNcblx0ICAgKCAgPSBTdGFydCBhIGNhcHR1cmluZyBncm91cFxuXHQgICAgICg/OiAgPSBTdGFydCBhIG5vbi1jYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAgICAgW14pKF0gID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICg/OiAgPSBTdGFydCBhbm90aGVyIG5vbi1jYXB0dXJpbmcgZ3JvdXBzXG5cdCAgICAgICAgICAgICAgICAgW14pKF0rICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIHwgID0gT1Jcblx0ICAgICAgICAgICAgICAgICBcXCggID0gTWF0Y2ggYSBzdGFydCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgICAgICBbXikoXSogID0gTWF0Y2ggYW55dGhpbmcgdGhhdCBpc24ndCBhIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAgICAgXFwpICA9IE1hdGNoIGEgZW5kIHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICApICA9IEVuZCBHcm91cFxuICAgICAgICAgICAgICAqXFwpID0gTWF0Y2ggYW55dGhpbmcgYW5kIHRoZW4gYSBjbG9zZSBwYXJlbnNcbiAgICAgICAgICApICA9IENsb3NlIG5vbi1jYXB0dXJpbmcgZ3JvdXBcbiAgICAgICAgICAqICA9IE1hdGNoIGFueXRoaW5nXG4gICAgICAgKSAgPSBDbG9zZSBjYXB0dXJpbmcgZ3JvdXBcblx0IFxcKSAgPSBNYXRjaCBhIGNsb3NlIHBhcmVuc1xuXG5cdCAvZ2kgID0gR2V0IGFsbCBtYXRjaGVzLCBub3QgdGhlIGZpcnN0LiAgQmUgY2FzZSBpbnNlbnNpdGl2ZS5cblx0ICovXG5cdHZhciBmaXhlZENzcyA9IGNzcy5yZXBsYWNlKC91cmxcXHMqXFwoKCg/OlteKShdfFxcKCg/OlteKShdK3xcXChbXikoXSpcXCkpKlxcKSkqKVxcKS9naSwgZnVuY3Rpb24oZnVsbE1hdGNoLCBvcmlnVXJsKSB7XG5cdFx0Ly8gc3RyaXAgcXVvdGVzIChpZiB0aGV5IGV4aXN0KVxuXHRcdHZhciB1bnF1b3RlZE9yaWdVcmwgPSBvcmlnVXJsXG5cdFx0XHQudHJpbSgpXG5cdFx0XHQucmVwbGFjZSgvXlwiKC4qKVwiJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KVxuXHRcdFx0LnJlcGxhY2UoL14nKC4qKSckLywgZnVuY3Rpb24obywgJDEpeyByZXR1cm4gJDE7IH0pO1xuXG5cdFx0Ly8gYWxyZWFkeSBhIGZ1bGwgdXJsPyBubyBjaGFuZ2Vcblx0XHRpZiAoL14oI3xkYXRhOnxodHRwOlxcL1xcL3xodHRwczpcXC9cXC98ZmlsZTpcXC9cXC9cXC98XFxzKiQpL2kudGVzdCh1bnF1b3RlZE9yaWdVcmwpKSB7XG5cdFx0ICByZXR1cm4gZnVsbE1hdGNoO1xuXHRcdH1cblxuXHRcdC8vIGNvbnZlcnQgdGhlIHVybCB0byBhIGZ1bGwgdXJsXG5cdFx0dmFyIG5ld1VybDtcblxuXHRcdGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi8vXCIpID09PSAwKSB7XG5cdFx0ICBcdC8vVE9ETzogc2hvdWxkIHdlIGFkZCBwcm90b2NvbD9cblx0XHRcdG5ld1VybCA9IHVucXVvdGVkT3JpZ1VybDtcblx0XHR9IGVsc2UgaWYgKHVucXVvdGVkT3JpZ1VybC5pbmRleE9mKFwiL1wiKSA9PT0gMCkge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gdGhlIGJhc2UgdXJsXG5cdFx0XHRuZXdVcmwgPSBiYXNlVXJsICsgdW5xdW90ZWRPcmlnVXJsOyAvLyBhbHJlYWR5IHN0YXJ0cyB3aXRoICcvJ1xuXHRcdH0gZWxzZSB7XG5cdFx0XHQvLyBwYXRoIHNob3VsZCBiZSByZWxhdGl2ZSB0byBjdXJyZW50IGRpcmVjdG9yeVxuXHRcdFx0bmV3VXJsID0gY3VycmVudERpciArIHVucXVvdGVkT3JpZ1VybC5yZXBsYWNlKC9eXFwuXFwvLywgXCJcIik7IC8vIFN0cmlwIGxlYWRpbmcgJy4vJ1xuXHRcdH1cblxuXHRcdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgdXJsKC4uLilcblx0XHRyZXR1cm4gXCJ1cmwoXCIgKyBKU09OLnN0cmluZ2lmeShuZXdVcmwpICsgXCIpXCI7XG5cdH0pO1xuXG5cdC8vIHNlbmQgYmFjayB0aGUgZml4ZWQgY3NzXG5cdHJldHVybiBmaXhlZENzcztcbn07XG4iLCJpbXBvcnQgeyBCdXR0cGx1Z0RldmljZSwgU2luZ2xlTW90b3JWaWJyYXRlQ21kLCBGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCB9IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0ICogYXMgTWVzc2FnZXMgZnJvbSBcIi4uL2luZGV4XCI7XG5cbmV4cG9ydCBjbGFzcyBUZXN0RGV2aWNlIGV4dGVuZHMgQnV0dHBsdWdEZXZpY2Uge1xuXG4gIHByaXZhdGUgX2Nvbm5lY3RlZDogYm9vbGVhbiA9IGZhbHNlO1xuICBwcml2YXRlIF9saW5lYXJTcGVlZDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfbGluZWFyUG9zaXRpb246IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3ZpYnJhdGVTcGVlZDogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBfcm90YXRlU3BlZWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3JvdGF0ZUNsb2Nrd2lzZTogYm9vbGVhbiA9IGZhbHNlO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcsXG4gICAgICAgICAgICAgICAgICAgICBzaG91bGRWaWJyYXRlOiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICBzaG91bGRMaW5lYXI6IGJvb2xlYW4gPSBmYWxzZSxcbiAgICAgICAgICAgICAgICAgICAgIHNob3VsZFJvdGF0ZTogYm9vbGVhbiA9IGZhbHNlKSB7XG4gICAgc3VwZXIoYFRlc3QgRGV2aWNlIC0gJHtuYW1lfWAsIFwiVGVzdERldmljZVwiICsgKHNob3VsZFZpYnJhdGUgPyBcIlZpYnJhdGVcIiA6IFwiXCIpICsgKHNob3VsZExpbmVhciA/IFwiTGluZWFyXCIgOiBcIlwiKSk7XG4gICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuU3RvcERldmljZUNtZCwgdGhpcy5IYW5kbGVTdG9wRGV2aWNlQ21kKTtcbiAgICBpZiAoc2hvdWxkVmlicmF0ZSkge1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuU2luZ2xlTW90b3JWaWJyYXRlQ21kLCB0aGlzLkhhbmRsZVNpbmdsZU1vdG9yVmlicmF0ZUNtZCk7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5WaWJyYXRlQ21kLCB0aGlzLkhhbmRsZVZpYnJhdGVDbWQpO1xuICAgIH1cbiAgICBpZiAoc2hvdWxkTGluZWFyKSB7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5GbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCwgdGhpcy5IYW5kbGVGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCk7XG4gICAgICB0aGlzLk1zZ0Z1bmNzLnNldChNZXNzYWdlcy5MaW5lYXJDbWQsIHRoaXMuSGFuZGxlTGluZWFyQ21kKTtcbiAgICB9XG4gICAgaWYgKHNob3VsZFJvdGF0ZSkge1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuUm90YXRlQ21kLCB0aGlzLkhhbmRsZVJvdGF0ZUNtZCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIGdldCBDb25uZWN0ZWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2Nvbm5lY3RlZDtcbiAgfVxuXG4gIHB1YmxpYyBzZXQgQ29ubmVjdGVkKGNvbm5lY3RlZDogYm9vbGVhbikge1xuICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGNvbm5lY3RlZDtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgTWVzc2FnZVNwZWNpZmljYXRpb25zKCk6IG9iamVjdCB7XG4gICAgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLlZpYnJhdGVDbWQpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBWaWJyYXRlQ21kOiB7IEZlYXR1cmVDb3VudDogMiB9LFxuICAgICAgICBTaW5nbGVNb3RvclZpYnJhdGVDbWQ6IHt9LFxuICAgICAgICBTdG9wRGV2aWNlQ21kOiB7fSxcbiAgICAgIH07XG4gICAgfSBlbHNlIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5MaW5lYXJDbWQpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBMaW5lYXJDbWQ6IHsgRmVhdHVyZUNvdW50OiAxIH0sXG4gICAgICAgIEZsZXNobGlnaHRMYXVuY2hGVzEyQ21kOiB7fSxcbiAgICAgICAgU3RvcERldmljZUNtZDoge30sXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5Nc2dGdW5jcy5oYXMoTWVzc2FnZXMuUm90YXRlQ21kKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgUm90YXRlQ21kOiB7IEZlYXR1cmVDb3VudDogMSB9LFxuICAgICAgICBTdG9wRGV2aWNlQ21kOiB7fSxcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIHB1YmxpYyBEaXNjb25uZWN0KCkge1xuICAgIHRoaXMuX2Nvbm5lY3RlZCA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdChcImRldmljZXJlbW92ZWRcIiwgdGhpcyk7XG4gIH1cblxuICBwcml2YXRlIEhhbmRsZVN0b3BEZXZpY2VDbWQgPSBhc3luYyAoYU1zZzogTWVzc2FnZXMuU3RvcERldmljZUNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLlZpYnJhdGVDbWQpKSB7XG4gICAgICB0aGlzLmVtaXQoXCJ2aWJyYXRlXCIsIDApO1xuICAgIH0gZWxzZSBpZiAodGhpcy5Nc2dGdW5jcy5oYXMoTWVzc2FnZXMuTGluZWFyQ21kKSkge1xuICAgICAgdGhpcy5lbWl0KFwibGluZWFyXCIsIHsgcG9zaXRpb246IHRoaXMuX2xpbmVhclBvc2l0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNwZWVkOiB0aGlzLl9saW5lYXJTcGVlZH0pO1xuICAgIH1cbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBNZXNzYWdlcy5PayhhTXNnLklkKSk7XG4gIH1cblxuICBwcml2YXRlIEhhbmRsZVNpbmdsZU1vdG9yVmlicmF0ZUNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLlNpbmdsZU1vdG9yVmlicmF0ZUNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICB0aGlzLl92aWJyYXRlU3BlZWQgPSBhTXNnLlNwZWVkO1xuICAgICAgdGhpcy5lbWl0KFwidmlicmF0ZVwiLCBhTXNnLlNwZWVkKTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IE1lc3NhZ2VzLk9rKGFNc2cuSWQpKTtcbiAgICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVWaWJyYXRlQ21kID1cbiAgICBhc3luYyAoYU1zZzogTWVzc2FnZXMuVmlicmF0ZUNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5IYW5kbGVTaW5nbGVNb3RvclZpYnJhdGVDbWQobmV3IFNpbmdsZU1vdG9yVmlicmF0ZUNtZChhTXNnLlNwZWVkc1swXS5TcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFNc2cuRGV2aWNlSW5kZXgsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLklkKSk7XG4gICAgfVxuXG4gIHByaXZhdGUgSGFuZGxlUm90YXRlQ21kID1cbiAgICBhc3luYyAoYU1zZzogTWVzc2FnZXMuUm90YXRlQ21kKTogUHJvbWlzZTxNZXNzYWdlcy5CdXR0cGx1Z01lc3NhZ2U+ID0+IHtcbiAgICAgIHRoaXMuX3JvdGF0ZVNwZWVkID0gYU1zZy5Sb3RhdGlvbnNbMF0uU3BlZWQ7XG4gICAgICB0aGlzLl9yb3RhdGVDbG9ja3dpc2UgPSBhTXNnLlJvdGF0aW9uc1swXS5DbG9ja3dpc2U7XG4gICAgICB0aGlzLmVtaXQoXCJ2aWJyYXRlXCIsIHsgc3BlZWQ6IHRoaXMuX3JvdGF0ZVNwZWVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbG9ja3dpc2U6IHRoaXMuX3JvdGF0ZUNsb2Nrd2lzZSB9KTtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUobmV3IE1lc3NhZ2VzLk9rKGFNc2cuSWQpKTtcbiAgICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLkZsZXNobGlnaHRMYXVuY2hGVzEyQ21kKTogUHJvbWlzZTxNZXNzYWdlcy5CdXR0cGx1Z01lc3NhZ2U+ID0+IHtcbiAgICAgIHRoaXMuX2xpbmVhclBvc2l0aW9uID0gYU1zZy5Qb3NpdGlvbjtcbiAgICAgIHRoaXMuX2xpbmVhclNwZWVkID0gYU1zZy5TcGVlZDtcbiAgICAgIHRoaXMuZW1pdChcImxpbmVhclwiLCB7IHBvc2l0aW9uOiB0aGlzLl9saW5lYXJQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogdGhpcy5fbGluZWFyU3BlZWQgfSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBNZXNzYWdlcy5PayhhTXNnLklkKSk7XG4gICAgfVxuXG4gIHByaXZhdGUgSGFuZGxlTGluZWFyQ21kID1cbiAgICBhc3luYyAoYU1zZzogTWVzc2FnZXMuTGluZWFyQ21kKTogUHJvbWlzZTxNZXNzYWdlcy5CdXR0cGx1Z01lc3NhZ2U+ID0+IHtcbiAgICAgIGlmIChhTXNnLlZlY3RvcnMubGVuZ3RoICE9PSAxKSB7XG4gICAgICAgIHJldHVybiBuZXcgTWVzc2FnZXMuRXJyb3IoXCJMaW5lYXJDbWQgcmVxdWlyZXMgMSB2ZWN0b3IgZm9yIHRoaXMgZGV2aWNlLlwiLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIE1lc3NhZ2VzLkVycm9yQ2xhc3MuRVJST1JfREVWSUNFLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFNc2cuSWQpO1xuICAgICAgfVxuICAgICAgLy8gTW92ZSBiZXR3ZWVuIDUvOTUsIG90aGVyd2lzZSB3ZSdsbCBhbGxvdyB0aGUgZGV2aWNlIHRvIHNtYWNrIGludG8gaGFyZFxuICAgICAgLy8gc3RvcHMgYmVjYXVzZSBvZiBicmFpbmRlYWQgZmlybXdhcmUuXG4gICAgICBjb25zdCByYW5nZTogbnVtYmVyID0gOTA7XG4gICAgICBjb25zdCB2ZWN0b3IgPSBhTXNnLlZlY3RvcnNbMF07XG4gICAgICBjb25zdCBjdXJyZW50UG9zaXRpb24gPSB2ZWN0b3IuUG9zaXRpb24gKiAxMDA7XG4gICAgICBjb25zdCBwb3NpdGlvbkRlbHRhOiBudW1iZXIgPSBNYXRoLmFicyhjdXJyZW50UG9zaXRpb24gLSB0aGlzLl9saW5lYXJQb3NpdGlvbik7XG4gICAgICBsZXQgc3BlZWQ6IG51bWJlciA9IE1hdGguZmxvb3IoMjUwMDAgKiBNYXRoLnBvdygoKHZlY3Rvci5EdXJhdGlvbiAqIDkwKSAvIHBvc2l0aW9uRGVsdGEpLCAtMS4wNSkpO1xuXG4gICAgICAvLyBDbGFtcCBzcGVlZCBvbiAwIDw9IHggPD0gOTUgc28gd2UgZG9uJ3QgYnJlYWsgdGhlIGxhdW5jaC5cbiAgICAgIHNwZWVkID0gTWF0aC5taW4oTWF0aC5tYXgoc3BlZWQsIDApLCA5NSk7XG5cbiAgICAgIGNvbnN0IHBvc2l0aW9uR29hbCA9IE1hdGguZmxvb3IoKChjdXJyZW50UG9zaXRpb24gLyA5OSkgKiByYW5nZSkgKyAoKDk5IC0gcmFuZ2UpIC8gMikpO1xuICAgICAgLy8gV2UnbGwgc2V0IHRoaXMuX2xhc3RQb3NpdGlvbiBpbiBGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCwgc2luY2VcbiAgICAgIC8vIGV2ZXJ5dGhpbmcga2luZGEgZnVubmVscyB0byB0aGF0LlxuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuSGFuZGxlRmxlc2hsaWdodExhdW5jaEZXMTJDbWQobmV3IE1lc3NhZ2VzLkZsZXNobGlnaHRMYXVuY2hGVzEyQ21kKHNwZWVkLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBvc2l0aW9uR29hbCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLkRldmljZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGFNc2cuSWQpKTtcbiAgICB9XG59XG4iLCJpbXBvcnQgeyBFdmVudEVtaXR0ZXIgfSBmcm9tIFwiZXZlbnRzXCI7XG5pbXBvcnQgeyBJRGV2aWNlU3VidHlwZU1hbmFnZXIgfSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCB7IFRlc3REZXZpY2UgfSBmcm9tIFwiLi9UZXN0RGV2aWNlXCI7XG5pbXBvcnQgeyBCdXR0cGx1Z0xvZ2dlciB9IGZyb20gXCIuLi9pbmRleFwiO1xuXG5leHBvcnQgY2xhc3MgVGVzdERldmljZU1hbmFnZXIgZXh0ZW5kcyBFdmVudEVtaXR0ZXIgaW1wbGVtZW50cyBJRGV2aWNlU3VidHlwZU1hbmFnZXIge1xuXG4gIHByaXZhdGUgX2xvZ2dlcjogQnV0dHBsdWdMb2dnZXIgPSBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXI7XG4gIHByaXZhdGUgX2lzU2Nhbm5pbmcgPSBmYWxzZTtcbiAgcHJpdmF0ZSBfdGVzdFZpYnJhdGlvbkRldmljZSA9IG5ldyBUZXN0RGV2aWNlKFwiVGVzdCBWaWJyYXRpb24gRGV2aWNlXCIsIHRydWUsIGZhbHNlLCBmYWxzZSk7XG4gIHByaXZhdGUgX3Rlc3RMaW5lYXJEZXZpY2UgPSBuZXcgVGVzdERldmljZShcIlRlc3QgTGluZWFyIERldmljZVwiLCBmYWxzZSwgdHJ1ZSwgZmFsc2UpO1xuICBwcml2YXRlIF90ZXN0Um90YXRpb25EZXZpY2UgPSBuZXcgVGVzdERldmljZShcIlRlc3QgUm90YXRpb24gRGV2aWNlXCIsIGZhbHNlLCBmYWxzZSwgdHJ1ZSk7XG5cbiAgcHVibGljIGNvbnN0cnVjdG9yKCkge1xuICAgIHN1cGVyKCk7XG4gIH1cblxuICBwdWJsaWMgU2V0TG9nZ2VyKGFMb2dnZXI6IEJ1dHRwbHVnTG9nZ2VyKSB7XG4gICAgdGhpcy5fbG9nZ2VyID0gYUxvZ2dlcjtcbiAgfVxuXG4gIHB1YmxpYyBDb25uZWN0VmlicmF0aW9uRGV2aWNlKCkge1xuICAgIHRoaXMuX2xvZ2dlci5EZWJ1ZyhcIlRlc3REZXZpY2VNYW5hZ2VyOiBDb25uZWN0aW5nIFZpYnJhdGlvbiBEZXZpY2VcIik7XG4gICAgdGhpcy5fdGVzdFZpYnJhdGlvbkRldmljZS5Db25uZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuZW1pdChcImRldmljZWFkZGVkXCIsIHRoaXMuX3Rlc3RWaWJyYXRpb25EZXZpY2UpO1xuICB9XG5cbiAgcHVibGljIENvbm5lY3RMaW5lYXJEZXZpY2UoKSB7XG4gICAgdGhpcy5fbG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IENvbm5lY3RpbmcgTGluZWFyIERldmljZVwiKTtcbiAgICB0aGlzLl90ZXN0TGluZWFyRGV2aWNlLkNvbm5lY3RlZCA9IHRydWU7XG4gICAgdGhpcy5lbWl0KFwiZGV2aWNlYWRkZWRcIiwgdGhpcy5fdGVzdExpbmVhckRldmljZSk7XG4gIH1cblxuICBwdWJsaWMgQ29ubmVjdFJvdGF0aW9uRGV2aWNlKCkge1xuICAgIHRoaXMuX2xvZ2dlci5EZWJ1ZyhcIlRlc3REZXZpY2VNYW5hZ2VyOiBDb25uZWN0aW5nIFJvdGF0aW9uIERldmljZVwiKTtcbiAgICB0aGlzLl90ZXN0Um90YXRpb25EZXZpY2UuQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmVtaXQoXCJkZXZpY2VhZGRlZFwiLCB0aGlzLl90ZXN0Um90YXRpb25EZXZpY2UpO1xuICB9XG5cbiAgcHVibGljIFN0YXJ0U2Nhbm5pbmcoKTogdm9pZCB7XG4gICAgdGhpcy5fbG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IFN0YXJ0aW5nIFNjYW5cIik7XG4gICAgdGhpcy5faXNTY2FubmluZyA9IHRydWU7XG4gICAgLy8gQWx3YXlzIGVtaXQgZGV2aWNlcy4gSWYgdGhleSdyZSBkdXBsaWNhdGVzLCB0aGUgZGV2aWNlIG1hbmFnZXIgd2lsbCB3ZWVkXG4gICAgLy8gdGhlbSBvdXQuXG4gICAgc2V0VGltZW91dCgoKSA9PiAge1xuICAgICAgdGhpcy5Db25uZWN0VmlicmF0aW9uRGV2aWNlKCk7XG4gICAgICB0aGlzLkNvbm5lY3RMaW5lYXJEZXZpY2UoKTtcbiAgICAgIHRoaXMuQ29ubmVjdFJvdGF0aW9uRGV2aWNlKCk7XG4gICAgfSwgNTApO1xuICAgIHNldFRpbWVvdXQoKCkgPT4gdGhpcy5TdG9wU2Nhbm5pbmcoKSwgMTAwKTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgVmlicmF0aW9uRGV2aWNlKCkge1xuICAgIHJldHVybiB0aGlzLl90ZXN0VmlicmF0aW9uRGV2aWNlO1xuICB9XG5cbiAgcHVibGljIGdldCBMaW5lYXJEZXZpY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlc3RMaW5lYXJEZXZpY2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IFJvdGF0aW9uRGV2aWNlKCkge1xuICAgIHJldHVybiB0aGlzLl90ZXN0Um90YXRpb25EZXZpY2U7XG4gIH1cblxuICBwdWJsaWMgU3RvcFNjYW5uaW5nKCk6IHZvaWQge1xuICAgIHRoaXMuX2xvZ2dlci5EZWJ1ZyhcIlRlc3REZXZpY2VNYW5hZ2VyOiBTdG9wcGluZyBTY2FuXCIpO1xuICAgIHRoaXMuX2lzU2Nhbm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXQoXCJzY2FubmluZ2ZpbmlzaGVkXCIpO1xuICB9XG5cbiAgcHVibGljIGdldCBJc1NjYW5uaW5nKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLl9pc1NjYW5uaW5nO1xuICB9XG59XG4iLCJpbXBvcnQgeyBCdXR0cGx1Z0NsaWVudCwgQnV0dHBsdWdFbWJlZGRlZFNlcnZlckNvbm5lY3RvciwgQnV0dHBsdWdTZXJ2ZXIgfSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCB7IFRlc3REZXZpY2VNYW5hZ2VyIH0gZnJvbSBcIi4vVGVzdERldmljZU1hbmFnZXJcIjtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIENyZWF0ZURldlRvb2xzQ2xpZW50KCk6IFByb21pc2U8QnV0dHBsdWdDbGllbnQ+IHtcbiAgY29uc3QgY2xpZW50ID0gbmV3IEJ1dHRwbHVnQ2xpZW50KFwiVGVzdCBDbGllbnRcIik7XG4gIGNvbnN0IHNlcnZlciA9IG5ldyBCdXR0cGx1Z1NlcnZlcihcIlRlc3QgU2VydmVyXCIpO1xuICBzZXJ2ZXIuQ2xlYXJEZXZpY2VNYW5hZ2VycygpO1xuICBzZXJ2ZXIuQWRkRGV2aWNlTWFuYWdlcihuZXcgVGVzdERldmljZU1hbmFnZXIoKSk7XG4gIGNvbnN0IGxvY2FsQ29ubmVjdG9yID0gbmV3IEJ1dHRwbHVnRW1iZWRkZWRTZXJ2ZXJDb25uZWN0b3IoKTtcbiAgbG9jYWxDb25uZWN0b3IuU2VydmVyID0gc2VydmVyO1xuICBhd2FpdCBjbGllbnQuQ29ubmVjdChsb2NhbENvbm5lY3Rvcik7XG4gIHJldHVybiBQcm9taXNlLnJlc29sdmUoY2xpZW50KTtcbn1cbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0xvZ1BhbmVsLmNzc1wiKTtcblxuaWYodHlwZW9mIGNvbnRlbnQgPT09ICdzdHJpbmcnKSBjb250ZW50ID0gW1ttb2R1bGUuaWQsIGNvbnRlbnQsICcnXV07XG5cbnZhciB0cmFuc2Zvcm07XG52YXIgaW5zZXJ0SW50bztcblxuXG5cbnZhciBvcHRpb25zID0ge1wiaG1yXCI6dHJ1ZX1cblxub3B0aW9ucy50cmFuc2Zvcm0gPSB0cmFuc2Zvcm1cbm9wdGlvbnMuaW5zZXJ0SW50byA9IHVuZGVmaW5lZDtcblxudmFyIHVwZGF0ZSA9IHJlcXVpcmUoXCIhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9Mb2dQYW5lbC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0xvZ1BhbmVsLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9ncGFuZWxcXFwiPlxcbiAgPHRleHRhcmVhIGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9ndGV4dGFyZWFcXFwiIHJlYWRvbmx5PjwvdGV4dGFyZWE+XFxuICA8ZGl2IGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxcXFwiPlxcbiAgICA8bGFiZWw+UGFuZWwgTG9nIExldmVsOjwvbGFiZWw+XFxuICAgIDxzZWxlY3QgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbHBhbmVsc2VsZWN0XFxcIj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJPZmZcXFwiPk9mZjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkZhdGFsXFxcIj5GYXRhbDwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkVycm9yXFxcIj5FcnJvcjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIldhcm5cXFwiPldhcm48L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJJbmZvXFxcIj5JbmZvPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRGVidWdcXFwiIHNlbGVjdGVkPkRlYnVnPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiVHJhY2VcXFwiPlRyYWNlPC9vcHRpb24+XFxuICAgIDwvc2VsZWN0PlxcbiAgICA8bGFiZWw+Q29uc29sZSBMb2cgTGV2ZWw6PC9sYWJlbD5cXG4gICAgPHNlbGVjdCBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ2xldmVsY29uc29sZXNlbGVjdFxcXCI+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiT2ZmXFxcIiBzZWxlY3RlZD5PZmY8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJGYXRhbFxcXCI+RmF0YWw8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJFcnJvclxcXCI+RXJyb3I8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJXYXJuXFxcIj5XYXJuPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiSW5mb1xcXCI+SW5mbzwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkRlYnVnXFxcIj5EZWJ1Zzwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIlRyYWNlXFxcIj5UcmFjZTwvb3B0aW9uPlxcbiAgICA8L3NlbGVjdD5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiOyIsImltcG9ydCB7IEJ1dHRwbHVnTG9nZ2VyLCBMb2dNZXNzYWdlLCBCdXR0cGx1Z0xvZ0xldmVsIH0gZnJvbSBcIi4uLy4uL2luZGV4XCI7XG5jb25zdCBqc1BhbmVsID0gcmVxdWlyZShcImpzcGFuZWw0XCIpO1xucmVxdWlyZShcImpzcGFuZWw0L2Rpc3QvanNwYW5lbC5jc3NcIik7XG5jb25zdCBsb2dQYW5lbEhUTUwgPSByZXF1aXJlKFwiLi9Mb2dQYW5lbC5odG1sXCIpLnRvU3RyaW5nKCk7XG5yZXF1aXJlKFwiLi9Mb2dQYW5lbC5jc3NcIik7XG5cbmV4cG9ydCBjbGFzcyBMb2dQYW5lbCB7XG5cbiAgcHVibGljIHN0YXRpYyBTaG93TG9nUGFuZWwoKSB7XG4gICAganNQYW5lbC5qc1BhbmVsLmNyZWF0ZSh7XG4gICAgICBpZDogKCkgPT4gXCJidXR0cGx1Zy1sb2dnZXItcGFuZWxcIixcbiAgICAgIHRoZW1lOiAgICAgICBcInByaW1hcnlcIixcbiAgICAgIGhlYWRlclRpdGxlOiBcIkJ1dHRwbHVnIExvZ1wiLFxuICAgICAgcG9zaXRpb246ICAgIFwiY2VudGVyLXRvcCAwIDgwXCIsXG4gICAgICBjb250ZW50U2l6ZTogXCI2NTAgMjUwXCIsXG4gICAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IGxvZ1BhbmVsSFRNTDtcbiAgICAgICAgTG9nUGFuZWwuX3BhbmVsID0gbmV3IExvZ1BhbmVsKCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX3BhbmVsOiBMb2dQYW5lbCB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGxvZ1RleHRBcmVhOiBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICBwcml2YXRlIHBhbmVsTGV2ZWxTZWxlY3Q6IEhUTUxTZWxlY3RFbGVtZW50O1xuICBwcml2YXRlIGNvbnNvbGVMZXZlbFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5sb2dUZXh0QXJlYSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dHBsdWdkZXZ0b29sc2xvZ3RleHRhcmVhXCIpISBhcyBIVE1MVGV4dEFyZWFFbGVtZW50O1xuICAgIHRoaXMucGFuZWxMZXZlbFNlbGVjdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dHBsdWdkZXZ0b29sc2xvZ2xldmVscGFuZWxzZWxlY3RcIikhIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIHRoaXMuY29uc29sZUxldmVsU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxjb25zb2xlc2VsZWN0XCIpISBhcyBIVE1MU2VsZWN0RWxlbWVudDtcbiAgICBjb25zdCBsb2cgPSBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXI7XG4gICAgbG9nLmFkZExpc3RlbmVyKFwibG9nXCIsIChtc2cpID0+IHtcbiAgICAgIHRoaXMuYWRkTG9nTWVzc2FnZShtc2cpO1xuICAgIH0pO1xuICAgIHRoaXMucGFuZWxMZXZlbFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGxvZy5NYXhpbXVtRXZlbnRMb2dMZXZlbCA9IEJ1dHRwbHVnTG9nTGV2ZWxbdGhpcy5wYW5lbExldmVsU2VsZWN0LnZhbHVlXTtcbiAgICB9KTtcbiAgICB0aGlzLmNvbnNvbGVMZXZlbFNlbGVjdC5hZGRFdmVudExpc3RlbmVyKFwiY2hhbmdlXCIsICgpID0+IHtcbiAgICAgIGxvZy5NYXhpbXVtQ29uc29sZUxvZ0xldmVsID0gQnV0dHBsdWdMb2dMZXZlbFt0aGlzLmNvbnNvbGVMZXZlbFNlbGVjdC52YWx1ZV07XG4gICAgfSk7XG4gICAgbG9nLk1heGltdW1FdmVudExvZ0xldmVsID0gQnV0dHBsdWdMb2dMZXZlbC5EZWJ1ZztcbiAgICBsb2cuRGVidWcoXCJMb2dQYW5lbDogRGV2VG9vbHMgTG9nIHBhbmVsIGVuYWJsZWQuXCIpO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRMb2dNZXNzYWdlKG1zZzogTG9nTWVzc2FnZSkge1xuICAgIHRoaXMubG9nVGV4dEFyZWEudmFsdWUgPSB0aGlzLmxvZ1RleHRBcmVhLnZhbHVlICsgXCJcXG5cIiArIG1zZy5Gb3JtYXR0ZWRNZXNzYWdlO1xuICB9XG5cbn1cbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vLi4vbm9kZV9tb2R1bGVzL2Nzcy1sb2FkZXIvaW5kZXguanMhLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1wiKTtcblxuXHRcdGlmKHR5cGVvZiBuZXdDb250ZW50ID09PSAnc3RyaW5nJykgbmV3Q29udGVudCA9IFtbbW9kdWxlLmlkLCBuZXdDb250ZW50LCAnJ11dO1xuXG5cdFx0dmFyIGxvY2FscyA9IChmdW5jdGlvbihhLCBiKSB7XG5cdFx0XHR2YXIga2V5LCBpZHggPSAwO1xuXG5cdFx0XHRmb3Ioa2V5IGluIGEpIHtcblx0XHRcdFx0aWYoIWIgfHwgYVtrZXldICE9PSBiW2tleV0pIHJldHVybiBmYWxzZTtcblx0XHRcdFx0aWR4Kys7XG5cdFx0XHR9XG5cblx0XHRcdGZvcihrZXkgaW4gYikgaWR4LS07XG5cblx0XHRcdHJldHVybiBpZHggPT09IDA7XG5cdFx0fShjb250ZW50LmxvY2FscywgbmV3Q29udGVudC5sb2NhbHMpKTtcblxuXHRcdGlmKCFsb2NhbHMpIHRocm93IG5ldyBFcnJvcignQWJvcnRpbmcgQ1NTIEhNUiBkdWUgdG8gY2hhbmdlZCBjc3MtbW9kdWxlcyBsb2NhbHMuJyk7XG5cblx0XHR1cGRhdGUobmV3Q29udGVudCk7XG5cdH0pO1xuXG5cdG1vZHVsZS5ob3QuZGlzcG9zZShmdW5jdGlvbigpIHsgdXBkYXRlKCk7IH0pO1xufSIsIm1vZHVsZS5leHBvcnRzID0gXCI8YnV0dHBsdWctZGV2dG9vbHMtbWFpbj5cXG4gIDxpbnB1dCBpZD1cXFwidGFiMVxcXCIgdHlwZT1cXFwicmFkaW9cXFwiIG5hbWU9XFxcInRhYnNcXFwiIGNoZWNrZWQ+XFxuICA8bGFiZWwgZm9yPVxcXCJ0YWIxXFxcIj5UZXN0IERldmljZXM8L2xhYmVsPlxcbiAgPHNlY3Rpb24gaWQ9XFxcImNvbnRlbnQxXFxcIj5cXG4gICAgPGRpdiBpZD1cXFwic2ltdWxhdG9yXFxcIj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJ2aWJyYXRvci1zaW11bGF0b3ItY29tcG9uZW50XFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcInZpYnJhdG9yXFxcIj5cXG4gICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vaHVzaC5wbmdcIikgKyBcIlxcXCJcXG4gICAgICAgICAgICAgICBpZD1cXFwidmlicmF0b3ItaW1hZ2VcXFwiPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2IGlkPVxcXCJ2aWJyYXRvci1pbmZvXFxcIj5cXG4gICAgICAgICAgPGI+U3BlZWQ6PC9iPiA8c3BhbiBpZD1cXFwidmlicmF0aW9uc3BlZWRcXFwiPjA8L3NwYW4+PGJyLz5cXG4gICAgICAgICAgPGJ1dHRvbiBpZD1cXFwidmlicmF0ZWRpc2Nvbm5lY3RcXFwiPkRpc2Nvbm5lY3Q8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInNpbXVsYXRvci1kaXZpZGVyXFxcIj48L2Rpdj5cXG4gICAgICA8ZGl2IGNsYXNzPVxcXCJmbGVzaGxpZ2h0LXNpbVxcXCI+XFxuICAgICAgICA8ZGl2IGNsYXNzPVxcXCJjLWZsZXNobGlnaHRcXFwiPlxcbiAgICAgICAgICA8ZGl2PlxcbiAgICAgICAgICAgIDxpbWcgc3JjPVxcXCJcIiArIHJlcXVpcmUoXCIuL3J1bGVyLnBuZ1wiKSArIFwiXFxcIj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vZmxlc2hsaWdodC5wbmdcIikgKyBcIlxcXCJcXG4gICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJvLWZsZXNobGlnaHRcXFwiXFxuICAgICAgICAgICAgICAgICBpZD1cXFwiZmxlc2hsaWdodC1pbWFnZVxcXCI+XFxuICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgICA8ZGl2PlxcbiAgICAgICAgICA8Yj5TcGVlZDo8L2I+IDxzcGFuIGlkPVxcXCJsaW5lYXJzcGVlZFxcXCI+MDwvc3Bhbj48YnIvPlxcbiAgICAgICAgICA8Yj5Qb3NpdGlvbjo8L2I+IDxzcGFuIGlkPVxcXCJsaW5lYXJwb3NpdGlvblxcXCI+MDwvc3Bhbj48YnIvPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJsaW5lYXJkaXNjb25uZWN0XFxcIj5EaXNjb25uZWN0PC9idXR0b24+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICA8L2Rpdj5cXG4gICAgPC9kaXY+XFxuICA8L3NlY3Rpb24+XFxuPC9idXR0cGx1Zy1kZXZ0b29scy1tYWluPlxcblwiOyIsImltcG9ydCB7IEJ1dHRwbHVnU2VydmVyLCBCdXR0cGx1Z0xvZ2dlciB9IGZyb20gXCIuLi8uLi9pbmRleFwiO1xuaW1wb3J0IHsgVGVzdERldmljZU1hbmFnZXIgfSBmcm9tIFwiLi4vVGVzdERldmljZU1hbmFnZXJcIjtcbmltcG9ydCAqIGFzIFRXRUVOIGZyb20gXCJAdHdlZW5qcy90d2Vlbi5qc1wiO1xuXG5jb25zdCBqc1BhbmVsID0gcmVxdWlyZShcImpzcGFuZWw0XCIpO1xucmVxdWlyZShcImpzcGFuZWw0L2Rpc3QvanNwYW5lbC5jc3NcIik7XG5jb25zdCB0ZXN0UGFuZWxIVE1MID0gcmVxdWlyZShcIi4vVGVzdERldmljZU1hbmFnZXJQYW5lbC5odG1sXCIpLnRvU3RyaW5nKCk7XG5yZXF1aXJlKFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmNzc1wiKTtcblxuZXhwb3J0IGNsYXNzIFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwge1xuICBwdWJsaWMgc3RhdGljIFNob3dUZXN0RGV2aWNlTWFuYWdlclBhbmVsKGJ1dHRwbHVnU2VydmVyOiBCdXR0cGx1Z1NlcnZlcikge1xuICAgIGxldCB0ZG06IFRlc3REZXZpY2VNYW5hZ2VyIHwgbnVsbCA9IG51bGw7XG4gICAgZm9yIChjb25zdCBtZ3Igb2YgYnV0dHBsdWdTZXJ2ZXIuRGV2aWNlTWFuYWdlcnMpIHtcbiAgICAgIGlmIChtZ3IuY29uc3RydWN0b3IubmFtZSA9PT0gXCJUZXN0RGV2aWNlTWFuYWdlclwiKSB7XG4gICAgICAgIHRkbSA9IChtZ3IgYXMgVGVzdERldmljZU1hbmFnZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHRkbSA9PT0gbnVsbCkge1xuICAgICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkVycm9yKFwiVGVzdERldmljZU1hbmFnZXJQYW5lbDogQ2Fubm90IGdldCB0ZXN0IGRldmljZSBtYW5hZ2VyIGZyb20gc2VydmVyLlwiKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcIkNhbm5vdCBnZXQgdGVzdCBkZXZpY2UgbWFuYWdlciBmcm9tIHNlcnZlci5cIik7XG4gICAgfVxuICAgIGpzUGFuZWwuanNQYW5lbC5jcmVhdGUoe1xuICAgICAgaWQ6ICgpID0+IFwiYnV0dHBsdWctdGVzdC1kZXZpY2UtbWFuYWdlci1wYW5lbFwiLFxuICAgICAgdGhlbWU6ICAgICAgIFwicHJpbWFyeVwiLFxuICAgICAgaGVhZGVyVGl0bGU6IFwiVGVzdCBEZXZpY2UgTWFuYWdlclwiLFxuICAgICAgcG9zaXRpb246ICAgIFwiY2VudGVyLXRvcCAwIDgwXCIsXG4gICAgICBjb250ZW50U2l6ZTogXCI0MDAgMjUwXCIsXG4gICAgICBjYWxsYmFjaygpIHtcbiAgICAgICAgdGhpcy5jb250ZW50LmlubmVySFRNTCA9IHRlc3RQYW5lbEhUTUw7XG4gICAgICAgIFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwuX3BhbmVsID0gbmV3IFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwodGRtISk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgcHJvdGVjdGVkIHN0YXRpYyBfcGFuZWw6IFRlc3REZXZpY2VNYW5hZ2VyUGFuZWw7XG4gIHByaXZhdGUgdmlicmF0b3JUd2VlbjogVFdFRU4uVHdlZW4gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBsYXVuY2hUd2VlbjogVFdFRU4uVHdlZW4gfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBfdGVzdE1hbmFnZXI6IFRlc3REZXZpY2VNYW5hZ2VyO1xuICBwcml2YXRlIGZsZXNobGlnaHRFbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgcHJpdmF0ZSB2aWJyYXRvckVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIGN1cnJlbnRMYXVuY2hQb3NpdGlvbjogYW55ID0geyB4OiAwLCB5OiAwIH07XG4gIHByaXZhdGUgbGFzdFBvc2l0aW9uOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIG1vdmVSYWRpdXM6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgY3VycmVudFZpYnJhdGVQb3NpdGlvbjogYW55ID0geyB4OiAwLCB5OiAwIH07XG4gIHByaXZhdGUgZWxlbWVudE9ic2VydmVyOiBNdXRhdGlvbk9ic2VydmVyIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgaGFzUkFGQmVlbkNhbGxlZCA9IGZhbHNlO1xuXG4gIGNvbnN0cnVjdG9yKHRkbTogVGVzdERldmljZU1hbmFnZXIpIHtcbiAgICB0aGlzLl90ZXN0TWFuYWdlciA9IHRkbTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpYnJhdGVkaXNjb25uZWN0XCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5fdGVzdE1hbmFnZXIhLlZpYnJhdGlvbkRldmljZS5EaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5lYXJkaXNjb25uZWN0XCIpIS5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgKCkgPT4ge1xuICAgICAgdGhpcy5fdGVzdE1hbmFnZXIhLkxpbmVhckRldmljZS5EaXNjb25uZWN0KCk7XG4gICAgfSk7XG4gICAgY29uc3Qgc3BlZWRIYW5kbGVyID0gKHNwZWVkKSA9PiB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpYnJhdGlvbnNwZWVkXCIpIS5pbm5lckhUTUwgPSAoc3BlZWQgKiAxMDApLnRvRml4ZWQoMSk7XG4gICAgICB0aGlzLnZpYnJhdGVNb3ZlKHNwZWVkKTtcbiAgICB9O1xuICAgIHRoaXMuX3Rlc3RNYW5hZ2VyLlZpYnJhdGlvbkRldmljZS5hZGRMaXN0ZW5lcihcInZpYnJhdGVcIiwgc3BlZWRIYW5kbGVyKTtcblxuICAgIGNvbnN0IHBvc2l0aW9uSGFuZGxlciA9IChsaW5lYXJvYmo6IGFueSkgPT4ge1xuICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJsaW5lYXJwb3NpdGlvblwiKSEuaW5uZXJIVE1MID0gKGxpbmVhcm9iai5wb3NpdGlvbik7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmVhcnNwZWVkXCIpIS5pbm5lckhUTUwgPSAobGluZWFyb2JqLnNwZWVkKTtcbiAgICAgIHRoaXMubGF1bmNoTW92ZShsaW5lYXJvYmoucG9zaXRpb24sIGxpbmVhcm9iai5zcGVlZCk7XG4gICAgfTtcblxuICAgIHRoaXMuX3Rlc3RNYW5hZ2VyLkxpbmVhckRldmljZS5hZGRMaXN0ZW5lcihcImxpbmVhclwiLCBwb3NpdGlvbkhhbmRsZXIpO1xuICAgIHRoaXMuZmxlc2hsaWdodEVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImZsZXNobGlnaHQtaW1hZ2VcIikhO1xuICAgIHRoaXMudmlicmF0b3JFbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJ2aWJyYXRvci1pbWFnZVwiKSE7XG5cbiAgICAvLyBBZnRlciB0aGUgbm9kZSBoYXMgYmVlbiBjcmVhdGVkLCBhdHRhY2ggYSBtdXRhdGlvbiBvYnNlcnZlciB0byBkaXNjb25uZWN0XG4gICAgLy8gZXZlbnRzIHdoZW4gdGhlIHBhbmVsIGlzIGNsb3NlZCwgb3RoZXJ3aXNlIHdlJ2xsIGdldCBldmVudHMgZ29pbmcgdG9cbiAgICAvLyBlbGVtZW50cyB0aGF0IG5vIGxvbmdlciBleGlzdC5cbiAgICBwcm9jZXNzLm5leHRUaWNrKCgpID0+IHtcbiAgICAgIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0cGx1Zy10ZXN0LWRldmljZS1tYW5hZ2VyLXBhbmVsXCIpO1xuICAgICAgaWYgKCFlbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvYnNlcnZlciA9IG5ldyBNdXRhdGlvbk9ic2VydmVyKChtdXRhdGlvbnMpID0+IHtcbiAgICAgICAgaWYgKCFkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRwbHVnLXRlc3QtZGV2aWNlLW1hbmFnZXItcGFuZWxcIikpIHtcbiAgICAgICAgICB0aGlzLl90ZXN0TWFuYWdlci5WaWJyYXRpb25EZXZpY2UucmVtb3ZlTGlzdGVuZXIoXCJ2aWJyYXRlXCIsIHNwZWVkSGFuZGxlcik7XG4gICAgICAgICAgdGhpcy5fdGVzdE1hbmFnZXIuTGluZWFyRGV2aWNlLnJlbW92ZUxpc3RlbmVyKFwibGluZWFyXCIsIHBvc2l0aW9uSGFuZGxlcik7XG4gICAgICAgICAgb2JzZXJ2ZXIuZGlzY29ubmVjdCgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIG9ic2VydmVyLm9ic2VydmUoZWwhLnBhcmVudE5vZGUhLCB7IGNoaWxkTGlzdDogdHJ1ZSB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWVzdEFuaW1hdGUgPSAoKSA9PiB7XG4gICAgaWYgKHRoaXMuaGFzUkFGQmVlbkNhbGxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aGlzLmhhc1JBRkJlZW5DYWxsZWQgPSB0cnVlO1xuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZSh0aGlzLmFuaW1hdGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBhbmltYXRlID0gKGN1cnJlbnRUaW1lOiBudW1iZXIpID0+IHtcbiAgICB0aGlzLmhhc1JBRkJlZW5DYWxsZWQgPSBmYWxzZTtcbiAgICBpZiAodGhpcy52aWJyYXRvclR3ZWVuICYmICF0aGlzLnZpYnJhdG9yVHdlZW4udXBkYXRlKGN1cnJlbnRUaW1lKSkge1xuICAgICAgaWYgKHRoaXMubW92ZVJhZGl1cyAhPT0gMCkge1xuICAgICAgICB0aGlzLnZpYnJhdGVNb3ZlKHRoaXMubW92ZVJhZGl1cyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnZpYnJhdG9yVHdlZW4gPSBudWxsO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5sYXVuY2hUd2VlbiAmJiAhdGhpcy5sYXVuY2hUd2Vlbi51cGRhdGUoY3VycmVudFRpbWUpKSB7XG4gICAgICB0aGlzLmxhdW5jaFR3ZWVuID0gbnVsbDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5yZXF1ZXN0QW5pbWF0ZSgpO1xuICAgIH1cbiAgICB0aGlzLnZpYnJhdG9yRWxlbWVudC5zdHlsZS50b3AgPSBgJHt0aGlzLmN1cnJlbnRWaWJyYXRlUG9zaXRpb24ueH1weGA7XG4gICAgdGhpcy52aWJyYXRvckVsZW1lbnQuc3R5bGUucmlnaHQgPSBgJHt0aGlzLmN1cnJlbnRWaWJyYXRlUG9zaXRpb24ueX1weGA7XG4gICAgdGhpcy5mbGVzaGxpZ2h0RWxlbWVudC5zdHlsZS5ib3R0b20gPSBgJHt0aGlzLmN1cnJlbnRMYXVuY2hQb3NpdGlvbi55fSVgO1xuICB9XG5cbiAgcHJpdmF0ZSBsYXVuY2hNb3ZlID0gKHBvc2l0aW9uLCBzcGVlZCkgPT4ge1xuICAgIGNvbnN0IHAgPSAtKCgxMDAgLSBwb3NpdGlvbikgKiAwLjIyKTtcbiAgICBjb25zdCBkdXJhdGlvbiA9IHRoaXMubW92ZUR1cmF0aW9uKHBvc2l0aW9uLCBzcGVlZCk7XG4gICAgdGhpcy5sYXVuY2hUd2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbih0aGlzLmN1cnJlbnRMYXVuY2hQb3NpdGlvbilcbiAgICAgIC50byh7eDogMCwgeTogcH0sIGR1cmF0aW9uKVxuICAgICAgLnN0YXJ0KCk7XG4gICAgdGhpcy5yZXF1ZXN0QW5pbWF0ZSgpO1xuICB9XG5cbiAgLy8gbW92ZUR1cmF0aW9uIHJldHVybnMgdGhlIHRpbWUgaW4gbWlsbGlzZWNvbmRzIGl0IHdpbGwgdGFrZSB0byBtb3ZlXG4gIC8vIHRvIHBvc2l0aW9uIGF0IHNwZWVkLlxuICAvL1xuICAvLyBwb3NpdGlvbjogcG9zaXRpb24gaW4gcGVyY2VudCAoMC0xMDApLlxuICAvLyBzcGVlZDogICAgc3BlZWQgaW4gcGVyY2VudCAoMjAtMTAwKS5cbiAgcHJpdmF0ZSBtb3ZlRHVyYXRpb24gPSAocG9zaXRpb246IG51bWJlciwgc3BlZWQ6IG51bWJlcikgPT4ge1xuICAgIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5hYnMocG9zaXRpb24gLSB0aGlzLmxhc3RQb3NpdGlvbik7XG4gICAgdGhpcy5sYXN0UG9zaXRpb24gPSBwb3NpdGlvbjtcbiAgICByZXR1cm4gdGhpcy5jYWxjRHVyYXRpb24oZGlzdGFuY2UsIHNwZWVkKTtcbiAgfVxuXG4gIC8vIF9jYWxjRHVyYXRpb24gcmV0dXJucyBkdXJhdGlvbiBvZiBhIG1vdmUgaW4gbWlsbGlzZWNvbmRzIGZvciBhIGdpdmVuXG4gIC8vIGRpc3RhbmNlL3NwZWVkLlxuICAvL1xuICAvLyBkaXN0YW5jZTogYW1vdW50IHRvIG1vdmUgcGVyY2VudCAoMC0xMDApLlxuICAvLyBzcGVlZDogc3BlZWQgdG8gbW92ZSBhdCBpbiBwZXJjZW50ICgyMC0xMDApLlxuICBwcml2YXRlIGNhbGNEdXJhdGlvbiA9IChkaXN0YW5jZTogbnVtYmVyLCBzcGVlZDogbnVtYmVyKSA9PiB7XG4gICAgcmV0dXJuIE1hdGgucG93KHNwZWVkIC8gMjUwMDAsIC0wLjk1KSAvICg5MCAvIGRpc3RhbmNlKTtcbiAgfVxuXG4gIHByaXZhdGUgdmlicmF0ZU1vdmUgPSAoc3BlZWQpID0+IHtcbiAgICB0aGlzLm1vdmVSYWRpdXMgPSBzcGVlZDtcbiAgICB0aGlzLnZpYnJhdG9yVHdlZW4gPSBuZXcgVFdFRU4uVHdlZW4odGhpcy5jdXJyZW50VmlicmF0ZVBvc2l0aW9uKVxuICAgICAgLnRvKHt4OiBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiB0aGlzLm1vdmVSYWRpdXMgKiAyMCksXG4gICAgICAgICAgIHk6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMubW92ZVJhZGl1cyAqIDIwKX1cbiAgICAgICAgICAsIDM0KVxuICAgICAgLnN0YXJ0KCk7XG4gICAgdGhpcy5yZXF1ZXN0QW5pbWF0ZSgpO1xuICB9XG59XG5cbi8vIFNvbWUgY29kZSBpbiB0aGlzIGZpbGUgdGFrZW4gZnJvbSBodHRwczovL2dpdGh1Yi5jb20vZnVuamFjay9sYXVuY2hjb250cm9sXG4vLyBNSVQgTGljZW5zZTpcbi8qXG4gIExhdWNoY29udHJvbCBVSSBGbGVzaGxpZ2h0XG5cbiAgaHR0cHM6Ly9naXRodWIuY29tL2Z1bmphY2svbGF1bmNoY29udHJvbFxuXG4gIENvcHlyaWdodCAyMDE3IEZ1bmphY2tcblxuICBSZWRpc3RyaWJ1dGlvbiBhbmQgdXNlIGluIHNvdXJjZSBhbmQgYmluYXJ5IGZvcm1zLCB3aXRoIG9yIHdpdGhvdXRcbiAgbW9kaWZpY2F0aW9uLCBhcmUgcGVybWl0dGVkIHByb3ZpZGVkIHRoYXQgdGhlIGZvbGxvd2luZyBjb25kaXRpb25zIGFyZSBtZXQ6XG5cbiAgMS4gUmVkaXN0cmlidXRpb25zIG9mIHNvdXJjZSBjb2RlIG11c3QgcmV0YWluIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLCB0aGlzXG4gIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyLlxuXG4gIDIuIFJlZGlzdHJpYnV0aW9ucyBpbiBiaW5hcnkgZm9ybSBtdXN0IHJlcHJvZHVjZSB0aGUgYWJvdmUgY29weXJpZ2h0IG5vdGljZSxcbiAgdGhpcyBsaXN0IG9mIGNvbmRpdGlvbnMgYW5kIHRoZSBmb2xsb3dpbmcgZGlzY2xhaW1lciBpbiB0aGUgZG9jdW1lbnRhdGlvblxuICBhbmQvb3Igb3RoZXIgbWF0ZXJpYWxzIHByb3ZpZGVkIHdpdGggdGhlIGRpc3RyaWJ1dGlvbi5cblxuICAzLiBOZWl0aGVyIHRoZSBuYW1lIG9mIHRoZSBjb3B5cmlnaHQgaG9sZGVyIG5vciB0aGUgbmFtZXMgb2YgaXRzIGNvbnRyaWJ1dG9yc1xuICBtYXkgYmUgdXNlZCB0byBlbmRvcnNlIG9yIHByb21vdGUgcHJvZHVjdHMgZGVyaXZlZCBmcm9tIHRoaXMgc29mdHdhcmUgd2l0aG91dFxuICBzcGVjaWZpYyBwcmlvciB3cml0dGVuIHBlcm1pc3Npb24uXG5cbiAgVEhJUyBTT0ZUV0FSRSBJUyBQUk9WSURFRCBCWSBUSEUgQ09QWVJJR0hUIEhPTERFUlMgQU5EIENPTlRSSUJVVE9SUyBcIkFTIElTXCIgQU5EXG4gIEFOWSBFWFBSRVNTIE9SIElNUExJRUQgV0FSUkFOVElFUywgSU5DTFVESU5HLCBCVVQgTk9UIExJTUlURUQgVE8sIFRIRSBJTVBMSUVEXG4gIFdBUlJBTlRJRVMgT0YgTUVSQ0hBTlRBQklMSVRZIEFORCBGSVRORVNTIEZPUiBBIFBBUlRJQ1VMQVIgUFVSUE9TRSBBUkVcbiAgRElTQ0xBSU1FRC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFIENPUFlSSUdIVCBIT0xERVIgT1IgQ09OVFJJQlVUT1JTIEJFIExJQUJMRVxuICBGT1IgQU5ZIERJUkVDVCwgSU5ESVJFQ1QsIElOQ0lERU5UQUwsIFNQRUNJQUwsIEVYRU1QTEFSWSwgT1IgQ09OU0VRVUVOVElBTFxuICBEQU1BR0VTIChJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgUFJPQ1VSRU1FTlQgT0YgU1VCU1RJVFVURSBHT09EUyBPUlxuICBTRVJWSUNFUzsgTE9TUyBPRiBVU0UsIERBVEEsIE9SIFBST0ZJVFM7IE9SIEJVU0lORVNTIElOVEVSUlVQVElPTikgSE9XRVZFUlxuICBDQVVTRUQgQU5EIE9OIEFOWSBUSEVPUlkgT0YgTElBQklMSVRZLCBXSEVUSEVSIElOIENPTlRSQUNULCBTVFJJQ1QgTElBQklMSVRZLFxuICBPUiBUT1JUIChJTkNMVURJTkcgTkVHTElHRU5DRSBPUiBPVEhFUldJU0UpIEFSSVNJTkcgSU4gQU5ZIFdBWSBPVVQgT0YgVEhFIFVTRVxuICBPRiBUSElTIFNPRlRXQVJFLCBFVkVOIElGIEFEVklTRUQgT0YgVEhFIFBPU1NJQklMSVRZIE9GIFNVQ0ggREFNQUdFLlxuKi9cbiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQURRQUFBQm5DQVlBQUFCUFltR3lBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVINFFRZUN5Y1RCcVQ0c1FBQUFCbDBSVmgwUTI5dGJXVnVkQUJEY21WaGRHVmtJSGRwZEdnZ1IwbE5VRmVCRGhjQUFBTkpTVVJCVkhqYTdaeS9iNXRBRk1mZklkU2hhVGRManAydGt0bTY4QTkwNzVvQnBrcVord2YwYitnZjBObFNKang0elo3VncwbFdOeU4xUzF4TFdWRFZKYko1SGV4TEFQUGpPTGdEdSs4N2hSamZ2US92RjNlUU1HZ21CRDFpeHI4b1lIemZCd0NBMVdxVituQ3ovbDM2NWN2eEtIVThtVXdBQUNBSWdrYTIyYW93QXFSdGlYR0RJRUFWS0F2T1RBVFVySUxnZVFHeG5KUkF4Tk1FUWtRakhyS05lWWZwOTQ1UklGbklyam95R2tzN1V4N0tOdGF5T3dWRVBQTEdjSFNaT25ZY0ozV2N1R09nUG5TU3VkSTZrR3BJNkI1YkJRaDkzd2ZmOTJ0UFhPUXB5N0pTTUdKOGxlS2p0V3cvckI5emYzODFHcWVPNHpqdVI5bE9WcnBzbGVPY0h4bWVCSFZkdDdES05Wa1RLZWRRMlhxb0RFWjRpSE1PdTkydTl0akdxeHpuL09qcTU4bDFYVmd1bDJEYk50aDJlNUZ2ZFFHVGhGb3NGclRBSXlCcXJDM0ROR21zWnhkeUt2V1NIZmJNUU1mZVhNYnovV2lzYlVCUmxTTWc2a1BVaDZnUFVSK2lQa1JsbTRDb0QxRWZvajVFZllpcUhBRVJFRFZXYXF6VVdLbXhublpqelQ1ZnJhdnRkdHQ0ak1aRklVK3U2d0xuWEhxZ3NpZCtWQlFVa3c0OXowdTlRSkVYS3NKTFpZLzFoVWV6Y2h3bjlSN2RiRGFyWmFlbEkzZGtuNExyeUVkdGI1SmNqY2JTYjVKMDNZZWtyNlNxNFdFWXZyeHByN01vb09kNTVwTDdrS2VIT1ZGckRsVjVwK3J2SG1UT1VjMmwvM2I1WURUY3NoSmhGL3o4OXVHc1BPUi8vUDdMT0pCTS9xaWNTemxFUUFSRVFOMERxVlN0dGlzZGVZaUFDTWd3VUJpR3JTZDMwWGVMNWlJUEVkQUpBV0hYaTd2c0lxOXFmNkZzMXdmRnJzMWhzdys2QWhQekMzc2UxbytGLzVxQXlRQUpGZTJ6SlNkVFZaMnhEK2ZXQmhJdWxqSzJ6Q0FaMVp5ajBHNHBENG1CZE81NHlvQms3R0YxYytqbzZ2VWw1TXBFSWRmM2tLdmxvYTVEVHNaRFZUbkVjRHBIZG5OZGFiVE9rSXVpQ09JNEJwek9nZDFjTTlYR3VyK1RHQTRBNys0Qk5rOGd3SVRldmIxb3pVTlJGQlYrOXVmSDdmNkg0VURjM2NTcVFLOWZIQTRBcC9QQ0U5OS8vZElJNk1Yb1BPMUJqbTFTQUxvb0dSaGc4eVJua0lxeWM3M3FEUUE4cXdMOXJUMXBBcktoNFVWNmJ1S2hOcStzRVVrOUxzZTdlNFFlaUgzK1ZHa3ZyVmo3THVrM05Mb09PNWx3cXdYVUZaZ3NpREtRU2FpNk1NcEF1c0ZVUUZvQmFodXNDWWpRUHhqaXJ5Q29wTFdiQUFBQUFFbEZUa1N1UW1DQ1wiIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRElBQUFCQkNBSUFBQUFjNjJDSkFBQUFCR2RCVFVFQUFMR1BDL3hoQlFBQUFDQmpTRkpOQUFCNkpnQUFnSVFBQVBvQUFBQ0E2QUFBZFRBQUFPcGdBQUE2bUFBQUYzQ2N1bEU4QUFBQUJtSkxSMFFBL3dEL0FQK2d2YWVUQUFBQUNYQklXWE1BQUFzU0FBQUxFZ0hTM1g3OEFBQUFCM1JKVFVVSDRRb09GU29EVnl6eEhBQUFDVmxKUkVGVWFON2RXbDFzRTFjV1BuZit4eDZQLzhZMktVbk1MazBVRnJwU1VXa0xLdEpXVlo4V3lUSnNKRVFRa1doQkxSSThWU29QQzZqcVE2SktmV0NsVm1vVGlVSjJ1MVdraHZTbExXckxBeERDOHFPdGhOUUdWRW9TWjJteGpYOWlPOU1aejcxM0h5NFlOd25GUDVpVjlqeFlNM2ZtbnZudU9lZWV2MnRFS1lYbWlCQUNBTVBEd3dDd2UvZHVudWNSUWszeUJOb2NFVUl3eHNlUEh3K0h3OUZvZEdSa0JHTk1DR21TYmJPd0hNYzVkT2lRWVJoUFB2bmsrdlhydTd1N2p4dzVnakZ1a2kxcVVvbUVFSmVxR29aaGhFSTh6d1BBdFd2WDV1Zm5PWTVyaG0xVGt5bWwrL2J0TTR3UVVHQ1lBS0M3dTN2ZnZuMU5ycllwV05ldlhmdm1xNjhwSVpxbVZRWVJRdWZQbi8vKysrK2JRZFk0TEl6eHFWT244dms4UW1pUnltemJQbjM2Tk5zUWp4dFdJcEU0ZnVLRUpFbUNJQ2lLVXYzSTdYWi8vUEhITXpNekRRdXNFVmlVVW96eDRNREFmeEp6QUFBSUVMK1lUemFiSFJ3Y2JIak5EVXByYW1ycXE2KytacnJ6K254TFgxQVVaWEp5Y21wcTZySENLcFZLMld5R3dSSjRZUm0rSEZjb0ZCWVdGaHJqMzZEZjJyaHhZMkptRmdCMG4xZFYxV28wQUlBeFp2SEg3WGFmT1hQbWNVbUxBZ0lFQUVzWHBPdjZpaFVybW8rSmpjQWFHaDY2OGNNUHl6NEtoOE9hcHJsY0xuYWJUcWMvK09DREJoUlNOeXdXaHRtMXdQT2lLRlllVllUazhYaXFwelFBcTI3YnVuejU4b3QvZXRHcjZ3QWdpbUxBQ0ZhTHl1ZnpBWUJwbXJkdTNjSVlBMEFpa2ZqODg4K2ZlZWFaMWtvTG9ZZXZSRlhWU0NTeVZJb3RoRFV4TVNGTDB0SnhTWkprV2E3Y0NzSmRyK0YydXljbkoxc082NU4vZnVLcThnalZFcXIyRkxJc0J3SUJBQWdFQXFPam95MkhWU01oaEtwM1EydGhwVklweTdKcWZMbGlnbzdqcEZLcEZzSWFHeHViU3lScTNMb3VsNHNKTEp2Tm5qeDVzbFd3S0tXTDl0UnZaOGFTSkZWUzFucXBQbGlmZnZwcE5SVE5vejEwQ2dESXN2elpaNSsxQ2hiSGNlZk9uZnVWQUdwVEo4L3pseTVkYWhXc3gwbi9sN0NhTCtwYkFTdWZ6MWRmc3lyb2Z3OXJFWVJNSmxOZGdSV0xSZHUyRytNc05EWnRXU3FYeTNOemM3cXVzK3RNSnRNd3EwY0dpMUxLODd4cG1xWnBOcyt0RGlVU1FsNTQ0UVdXM0ZWR0hNZGgxd2loQjlYUUdPTU5HemEwQ2haQ2FOdTJiZFhmeGhqL1VvTnNMTXVLeFdJdGhMVTBMeTBXaW5WOTc5SERBb0N0VzdlMmQzWlV1eXVFVUQ2WGh3ZUhiVXFwMysrUHhXSjFGUTMxd1FxRlF2MzkvYWI1cTFvWll3Y29QTWl3Y3JuYzl1M2JEY05vb2JRQTRLV1hYZ3BISWhWTEJ3RGJzblBaN01MQ1F2VWdJMEtJcnVzdnYveHl2WDNldWdzeVN1blUxTlNXUDI5SkptK3pEQUloNU5FOWdpaHFtcmFvb3lRSXdrY2ZmZFRUMDFPdjk2L2JieUdFZW5wNjRsdmoveGo1ZXlYSjBYVmRkZCt0cEhPNUhCTWJRbWo3OXUxcjFxeXA5eE9OU0lzSkxKVks3ZHk1OCtyVnF6emlNTUdXYlZmVUpNc3l4M0hsY3JtcnEydDBkTFM2WUt5ZEdveUpobUhzMnJVTEFQTDV2R21hQVgrZ3M3T3pvNk5qdzRZTnJGcmtlWDdQbmozaGNMZ3gvazAxd0RkdDNKaVlUVkJLaThXaVF6QkNxTDI5WFpJazI3WU53emg3OW16RG5CdVBpWVNRNTU1Ly90dC9mOHZ6dk12bFd0M1pBUUNDSU55NWN3ZGp2R25UcHFVbFNlM1VWR0xUMTljblNxTEw1YUlBczdPemlVVEM3L2RybW1aWlZtOXZiek9jRzVjV3gzRUlJY3UyQ1NGQVlkWHZmeWZMY2lhVEtaVks1WElaR3VxSVBBSllqQ1JKVW1VRkFjek56WW1pdUg3OWV0dTJpOFZtQTJXenNBZ2haYWNNRklKRzBPdjEzcmh4bzFnc2xrcWxabUd4L09uS2xTc2N4eG1HMGRIUndiUlQ0M3lPNHdSQkJFcXoyZXo4L1B6YXRXdlQ2WFR6R2IwQUFJT0RnME5EUTJ4N2o0eU1SS1BSV21ZeXowSXdMcGZMTGxYdGVLSU5BT2JuNTBWUlpLMEg5a0pqRUxuaDRlR2pSNDhHZzhGQUlMQ3dzTEJqeDQ1ME9sM0xURUxJOVBTMElpdHVsOHZyOVFLQUtJcUtvaWlLSW9yaTlldlhiOTY4MmZqaFNtVTF3V0JRMS9WY0xqYzJOdmJiUjBqc2pJbFMrdTY3NzFaaWN5UVNXYmx5Wldkblp6UWFiVzl2Zi92dHQvZnYzejh6TXdQM0RtUHFnd1VBUU1FMFRkYk80M24rOHVYTEQyMUhqWTJOeFdLeDZadlRsUkZkMTZWN3pjdTJ0clpRS0NTS1lqd2U3K3JxMnJ4NTgvRHc4TjNUM3RybzdrNmN6K1Z6Mlp3Uk10eHU5L2o0K0d1dnZiWTB4RElKdmZQT096TXpNeE1URTBDb0xFbk1SUUZBb1ZCZ3BSZ2psOHVWVENZRGdVQTBHdVY1L3RpeFkrbDArdURCZ3pXMmx2ZzMzbmpqeXkrK3dBNldaRW5UTk5NMHkrVXlDN3BNdjJ5VlUxTlQ0K1BqVzdacytmSEhIMi9mdnMzemZLbTB3RHFEaUVOdXQ5czBUWGFDVnl3V1RkUE1ack8yYmR1MlhTZ1VFRUxoY0RpUlNFeE9Ubm84bmxxMkZNSVlQL2Zzc3ovZCtrbFc1S0JoK0h5K1RDWmpXZFpiYjcwVmo4ZFpXVEV3TURBNk9tcFpGanVlc0g2eEZvcEZCMk5DaUtacHNxcXd2cklvaWh6SDJiYTlWRm1DSUt4ZXZicFFLQlNMeFFNSERzVGo4WWZBY2h4bmNHRHdiMGVQaXFLb3FtclBIOWFrVWlsV0V6Tm5qUkR5Ky8wODRrcWxVc1Z5T1k2VEZObmo4VHowcUx3NllPdTZIb2xFRW9sRWYzOS9MQllMaFVJUG1vNElJWVNRUHo3MVZDNlhVeFQxaVpWUGhNUGhWQ3BWS3BWeXVSeDJNQ0FBQ3M0OUcySmE4M2w5a25LM0M2OG9pc2ZqVVpmcmlqTzZjK2VPNHpnSW9YSzU3UFY2bWFrUVFvYUdoam83TzVkMWJJaVp6b2NmZm5qNHI0ZEVVZFIwVDF0Ym04L255K2Z6dG0zUHpTYVdGZzZxUzlXOTNvcHB0N2UzMTJMRkxDMzcrZWVmS2FXUlNFVFRORUxJZSsrOXQyejZlamNOVEtWU2UvZnN2WERoZ3NEem1xWnBtb1lRY3JDVFNxWVdHWW9vaVQ2LzMrUHhHSWJCRkZUNVhWNGQ5L1lOODNBc1JsbVdKVWxTS0JRS0JvT0hEeCtPUnFPTHRIbWZYVEtaZlBQTk4wOTk4ZVZ2bUlza1NiNkFuMWtKaHhCQ3lEVE5aQ3FGWUlraUVBQ2w5M3BOVkZIVlVDZ0VBRUJCOStyNWZKNkZxWEE0N0RqTysrKy9INDFHcTdWNUh4WWhKSmxNdnY3NjYvKzZjSUZEeXlDamxLcXFxdnU4ekd0emdOaTZIZXdzN2UwS2dsRDlHWjduMldwRlVmUjQ5VXE0ZEx2ZFBwOHZHQXdPRGc2R3crSEtsUHV3MkVVNm5lN3I2N3Q0OGFMbWNpL0tldG10cE1pV1pSVUtCWUlKSVdUYlg3WnQzcnk1V2xhRTByTm56b3lkUExsb2JRZ2hsMHNWUlpIOXNVZFZGVVZSRlZVUlJWSFR0TjdlM3IxNzl5NEQ2ejVmUXI3NzdydFhkcjh5TXoyOTZGRjAxU3BDQ1FBY08zWnMzYnAxTERndVNvUllNRmpxelFraEF3TUQ0K1BqQ0dCMlpoWUFLRkN2enljSXd0TlBQMzNpeElscVBnODBWWXd4KzB0V05iMzY2cXNOSDB4VTQyTWhzaklTajhjWGxXNy9CZWRRYjZET2xiNkhBQUFBR1hSRldIUmpiMjF0Wlc1MEFFTnlaV0YwWldRZ2QybDBhQ0JIU1UxUTU2OUF5d0FBQUNWMFJWaDBaR0YwWlRwamNtVmhkR1VBTWpBeE55MHhNQzB4TkZReU1UbzBNam93TXkwd056b3dNTnZpb3FNQUFBQWxkRVZZZEdSaGRHVTZiVzlrYVdaNUFESXdNVGN0TVRBdE1UUlVNakU2TkRJNk1ETXRNRGM2TURDcXZ4b2ZBQUFBQUVsRlRrU3VRbUNDXCIiLCJleHBvcnQgKiBmcm9tIFwiLi4vVGVzdERldmljZVwiO1xuZXhwb3J0ICogZnJvbSBcIi4uL1Rlc3REZXZpY2VNYW5hZ2VyXCI7XG5leHBvcnQgKiBmcm9tIFwiLi4vdXRpbHNcIjtcbmV4cG9ydCAqIGZyb20gXCIuL0xvZ1BhbmVsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsXCI7XG5leHBvcnQgKiBmcm9tIFwiLi91dGlscy53ZWJcIjtcbiIsIm1vZHVsZS5leHBvcnRzID0gXCJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUFVQUFBQ0ZDQVlBQUFDVDN6STlBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFBQ1hCSVdYTUFBQXNUQUFBTEV3RUFtcHdZQUFBQUIzUkpUVVVINFFRZUNoNEFqVnhlNGdBQUFCbDBSVmgwUTI5dGJXVnVkQUJEY21WaGRHVmtJSGRwZEdnZ1IwbE5VRmVCRGhjQUFBQStTVVJCVkVqSFkyUmdZUGpQZ0FWZ0NESmhVOFdFUy9VSTBNNklwcEp4Tk9qSURUb3liUjhWSEJVY01vS2phWDVVY0RUTmoxYVJvNjJMQVdsZEFBQzhFQzJ0QUVCWVhBQUFBQUJKUlU1RXJrSmdnZz09XCIiLCJpbXBvcnQgeyBUZXN0RGV2aWNlTWFuYWdlclBhbmVsIH0gZnJvbSBcIi4vVGVzdERldmljZU1hbmFnZXJQYW5lbFwiO1xuaW1wb3J0IHsgTG9nUGFuZWwgfSBmcm9tIFwiLi9Mb2dQYW5lbFwiO1xuaW1wb3J0IHsgQnV0dHBsdWdTZXJ2ZXIgfSBmcm9tIFwiLi4vLi4vaW5kZXhcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZUxvZ2dlclBhbmVsKCkge1xuICBMb2dQYW5lbC5TaG93TG9nUGFuZWwoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIENyZWF0ZURldmljZU1hbmFnZXJQYW5lbChidXR0cGx1Z1NlcnZlcjogQnV0dHBsdWdTZXJ2ZXIpIHtcbiAgVGVzdERldmljZU1hbmFnZXJQYW5lbC5TaG93VGVzdERldmljZU1hbmFnZXJQYW5lbChidXR0cGx1Z1NlcnZlcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBSZW1vdmVEZXZpY2VNYW5hZ2VyUGFuZWwoKSB7XG4gIGNvbnN0IGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0cGx1Zy10ZXN0LWRldmljZS1tYW5hZ2VyLXBhbmVsXCIpO1xuICBpZiAoIWVsIHx8ICFlbC5wYXJlbnROb2RlKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGVsLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWwpO1xufVxuIl0sInNvdXJjZVJvb3QiOiIifQ==