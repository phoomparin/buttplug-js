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
        this._isScanning = false;
        this._testVibrationDevice = new TestDevice_1.TestDevice("Test Vibration Device", true, false, false);
        this._testLinearDevice = new TestDevice_1.TestDevice("Test Linear Device", false, true, false);
        this._testRotationDevice = new TestDevice_1.TestDevice("Test Rotation Device", false, false, true);
    }
    ConnectVibrationDevice() {
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Connecting Vibration Device");
        this._testVibrationDevice.Connected = true;
        this.emit("deviceadded", this._testVibrationDevice);
    }
    ConnectLinearDevice() {
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Connecting Linear Device");
        this._testLinearDevice.Connected = true;
        this.emit("deviceadded", this._testLinearDevice);
    }
    ConnectRotationDevice() {
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Connecting Rotation Device");
        this._testRotationDevice.Connected = true;
        this.emit("deviceadded", this._testRotationDevice);
    }
    StartScanning() {
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Starting Scan");
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
        index_1.ButtplugLogger.Logger.Debug("TestDeviceManager: Stopping Scan");
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzL3dlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbiIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvZXh0ZXJuYWwgXCJCdXR0cGx1Z1wiIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9ub2RlX21vZHVsZXMvQHR3ZWVuanMvdHdlZW4uanMvc3JjL1R3ZWVuLmpzIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9ub2RlX21vZHVsZXMvanNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9Mb2dQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3MiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vbm9kZV9tb2R1bGVzL2V2ZW50cy9ldmVudHMuanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9kaXN0L2pzcGFuZWwuY3NzPzM2MWEiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9qc3BhbmVsNC9lczZtb2R1bGUvanNwYW5lbC5taW4uanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9wcm9jZXNzL2Jyb3dzZXIuanMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vbm9kZV9tb2R1bGVzL3N0eWxlLWxvYWRlci9saWIvdXJscy5qcyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL1Rlc3REZXZpY2UudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy9UZXN0RGV2aWNlTWFuYWdlci50cyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3V0aWxzLnRzIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmNzcz9hZmE2Iiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL0xvZ1BhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvTG9nUGFuZWwudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3M/ZDFmYyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmh0bWwiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvVGVzdERldmljZU1hbmFnZXJQYW5lbC50cyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9mbGVzaGxpZ2h0LnBuZyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9odXNoLnBuZyIsIndlYnBhY2s6Ly9CdXR0cGx1Z0RldlRvb2xzLy4vc3JjL2RldnRvb2xzL3dlYi9pbmRleC53ZWIudHMiLCJ3ZWJwYWNrOi8vQnV0dHBsdWdEZXZUb29scy8uL3NyYy9kZXZ0b29scy93ZWIvcnVsZXIucG5nIiwid2VicGFjazovL0J1dHRwbHVnRGV2VG9vbHMvLi9zcmMvZGV2dG9vbHMvd2ViL3V0aWxzLndlYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0Esa0RBQTBDLGdDQUFnQztBQUMxRTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdFQUF3RCxrQkFBa0I7QUFDMUU7QUFDQSx5REFBaUQsY0FBYztBQUMvRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsaURBQXlDLGlDQUFpQztBQUMxRSx3SEFBZ0gsbUJBQW1CLEVBQUU7QUFDckk7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxtQ0FBMkIsMEJBQTBCLEVBQUU7QUFDdkQseUNBQWlDLGVBQWU7QUFDaEQ7QUFDQTtBQUNBOztBQUVBO0FBQ0EsOERBQXNELCtEQUErRDs7QUFFckg7QUFDQTs7O0FBR0E7QUFDQTs7Ozs7Ozs7QUNsRkEsMEI7Ozs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxHQUFHOztBQUVILEVBQUU7O0FBRUY7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsa0JBQWtCLHFCQUFxQjs7QUFFdkM7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHVDQUF1QztBQUN2Qzs7QUFFQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBLGdFQUFnRSxzQkFBc0I7QUFDdEY7QUFDQTs7QUFFQSxFQUFFOztBQUVGO0FBQ0E7QUFDQTtBQUNBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7QUFDQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBO0FBQ0E7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxJQUFJOztBQUVKO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBOztBQUVBLElBQUk7O0FBRUo7O0FBRUE7QUFDQTs7QUFFQSxrRUFBa0Usc0JBQXNCO0FBQ3hGO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7OztBQUdBOztBQUVBOztBQUVBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7O0FBRUEsRUFBRTs7QUFFRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBLEVBQUU7O0FBRUY7O0FBRUE7O0FBRUE7O0FBRUE7O0FBRUEsR0FBRzs7QUFFSDs7QUFFQTs7QUFFQTs7QUFFQSxHQUFHOztBQUVIOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTs7QUFFQSxFQUFFOztBQUVGOztBQUVBOztBQUVBOztBQUVBLEdBQUc7O0FBRUg7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LGNBQWM7O0FBRWxFO0FBQ0E7Ozs7Ozs7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGlCQUFpQjtBQUNqQixPQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsR0FBRztBQUNIO0FBQ0E7QUFDQTtBQUNBLGVBQWUsU0FBUztBQUN4QjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FB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QUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxTQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSx1QkFBdUIsc0JBQXNCO0FBQzdDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUJBQXFCO0FBQ3JCOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxxQ0FBcUM7O0FBRXJDO0FBQ0E7QUFDQTs7QUFFQSwyQkFBMkI7QUFDM0I7QUFDQTtBQUNBO0FBQ0EsNEJBQTRCLFVBQVU7Ozs7Ozs7O0FDdkx0QztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsOENBQThDO0FBQzlDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEtBQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQ7QUFDQTtBQUNBOztBQUVBLGNBQWMsbUJBQU8sQ0FBQyx5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QUM7QUFDMUIsQ0FBQztBQUZELDhDQUVDO0FBRUQsU0FBZ0Isd0JBQXdCLENBQUMsY0FBOEI7SUFDckUsK0NBQXNCLENBQUMsMEJBQTBCLENBQUMsY0FBYyxDQUFDLENBQUM7QUFDcEUsQ0FBQztBQUZELDREQUVDO0FBRUQsU0FBZ0Isd0JBQXdCO0lBQ3RDLE1BQU0sRUFBRSxHQUFHLFFBQVEsQ0FBQyxjQUFjLENBQUMsb0NBQW9DLENBQUMsQ0FBQztJQUN6RSxJQUFJLENBQUMsRUFBRSxJQUFJLENBQUMsRUFBRSxDQUFDLFVBQVUsRUFBRTtRQUN6QixPQUFPO0tBQ1I7SUFDRCxFQUFFLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztBQUNoQyxDQUFDO0FBTkQsNERBTUMiLCJmaWxlIjoiYnV0dHBsdWctZGV2dG9vbHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJidXR0cGx1Zy1kZXZ0b29scy1jb21tb25qc1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJCdXR0cGx1Z0RldlRvb2xzXCJdID0gZmFjdG9yeSgpO1xufSkod2luZG93LCBmdW5jdGlvbigpIHtcbnJldHVybiAiLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gXCIuL3NyYy9kZXZ0b29scy93ZWIvaW5kZXgud2ViLnRzXCIpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBCdXR0cGx1ZzsiLCIvKipcbiAqIFR3ZWVuLmpzIC0gTGljZW5zZWQgdW5kZXIgdGhlIE1JVCBsaWNlbnNlXG4gKiBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qc1xuICogLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLVxuICpcbiAqIFNlZSBodHRwczovL2dpdGh1Yi5jb20vdHdlZW5qcy90d2Vlbi5qcy9ncmFwaHMvY29udHJpYnV0b3JzIGZvciB0aGUgZnVsbCBsaXN0IG9mIGNvbnRyaWJ1dG9ycy5cbiAqIFRoYW5rIHlvdSBhbGwsIHlvdSdyZSBhd2Vzb21lIVxuICovXG5cblxudmFyIF9Hcm91cCA9IGZ1bmN0aW9uICgpIHtcblx0dGhpcy5fdHdlZW5zID0ge307XG5cdHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlID0ge307XG59O1xuXG5fR3JvdXAucHJvdG90eXBlID0ge1xuXHRnZXRBbGw6IGZ1bmN0aW9uICgpIHtcblxuXHRcdHJldHVybiBPYmplY3Qua2V5cyh0aGlzLl90d2VlbnMpLm1hcChmdW5jdGlvbiAodHdlZW5JZCkge1xuXHRcdFx0cmV0dXJuIHRoaXMuX3R3ZWVuc1t0d2VlbklkXTtcblx0XHR9LmJpbmQodGhpcykpO1xuXG5cdH0sXG5cblx0cmVtb3ZlQWxsOiBmdW5jdGlvbiAoKSB7XG5cblx0XHR0aGlzLl90d2VlbnMgPSB7fTtcblxuXHR9LFxuXG5cdGFkZDogZnVuY3Rpb24gKHR3ZWVuKSB7XG5cblx0XHR0aGlzLl90d2VlbnNbdHdlZW4uZ2V0SWQoKV0gPSB0d2Vlbjtcblx0XHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZVt0d2Vlbi5nZXRJZCgpXSA9IHR3ZWVuO1xuXG5cdH0sXG5cblx0cmVtb3ZlOiBmdW5jdGlvbiAodHdlZW4pIHtcblxuXHRcdGRlbGV0ZSB0aGlzLl90d2VlbnNbdHdlZW4uZ2V0SWQoKV07XG5cdFx0ZGVsZXRlIHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlW3R3ZWVuLmdldElkKCldO1xuXG5cdH0sXG5cblx0dXBkYXRlOiBmdW5jdGlvbiAodGltZSwgcHJlc2VydmUpIHtcblxuXHRcdHZhciB0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVucyk7XG5cblx0XHRpZiAodHdlZW5JZHMubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRyZXR1cm4gZmFsc2U7XG5cdFx0fVxuXG5cdFx0dGltZSA9IHRpbWUgIT09IHVuZGVmaW5lZCA/IHRpbWUgOiBUV0VFTi5ub3coKTtcblxuXHRcdC8vIFR3ZWVucyBhcmUgdXBkYXRlZCBpbiBcImJhdGNoZXNcIi4gSWYgeW91IGFkZCBhIG5ldyB0d2VlbiBkdXJpbmcgYW4gdXBkYXRlLCB0aGVuIHRoZVxuXHRcdC8vIG5ldyB0d2VlbiB3aWxsIGJlIHVwZGF0ZWQgaW4gdGhlIG5leHQgYmF0Y2guXG5cdFx0Ly8gSWYgeW91IHJlbW92ZSBhIHR3ZWVuIGR1cmluZyBhbiB1cGRhdGUsIGl0IG1heSBvciBtYXkgbm90IGJlIHVwZGF0ZWQuIEhvd2V2ZXIsXG5cdFx0Ly8gaWYgdGhlIHJlbW92ZWQgdHdlZW4gd2FzIGFkZGVkIGR1cmluZyB0aGUgY3VycmVudCBiYXRjaCwgdGhlbiBpdCB3aWxsIG5vdCBiZSB1cGRhdGVkLlxuXHRcdHdoaWxlICh0d2Vlbklkcy5sZW5ndGggPiAwKSB7XG5cdFx0XHR0aGlzLl90d2VlbnNBZGRlZER1cmluZ1VwZGF0ZSA9IHt9O1xuXG5cdFx0XHRmb3IgKHZhciBpID0gMDsgaSA8IHR3ZWVuSWRzLmxlbmd0aDsgaSsrKSB7XG5cblx0XHRcdFx0dmFyIHR3ZWVuID0gdGhpcy5fdHdlZW5zW3R3ZWVuSWRzW2ldXTtcblxuXHRcdFx0XHRpZiAodHdlZW4gJiYgdHdlZW4udXBkYXRlKHRpbWUpID09PSBmYWxzZSkge1xuXHRcdFx0XHRcdHR3ZWVuLl9pc1BsYXlpbmcgPSBmYWxzZTtcblxuXHRcdFx0XHRcdGlmICghcHJlc2VydmUpIHtcblx0XHRcdFx0XHRcdGRlbGV0ZSB0aGlzLl90d2VlbnNbdHdlZW5JZHNbaV1dO1xuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXG5cdFx0XHR0d2VlbklkcyA9IE9iamVjdC5rZXlzKHRoaXMuX3R3ZWVuc0FkZGVkRHVyaW5nVXBkYXRlKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gdHJ1ZTtcblxuXHR9XG59O1xuXG52YXIgVFdFRU4gPSBuZXcgX0dyb3VwKCk7XG5cblRXRUVOLkdyb3VwID0gX0dyb3VwO1xuVFdFRU4uX25leHRJZCA9IDA7XG5UV0VFTi5uZXh0SWQgPSBmdW5jdGlvbiAoKSB7XG5cdHJldHVybiBUV0VFTi5fbmV4dElkKys7XG59O1xuXG5cbi8vIEluY2x1ZGUgYSBwZXJmb3JtYW5jZS5ub3cgcG9seWZpbGwuXG4vLyBJbiBub2RlLmpzLCB1c2UgcHJvY2Vzcy5ocnRpbWUuXG5pZiAodHlwZW9mICh3aW5kb3cpID09PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgKHByb2Nlc3MpICE9PSAndW5kZWZpbmVkJykge1xuXHRUV0VFTi5ub3cgPSBmdW5jdGlvbiAoKSB7XG5cdFx0dmFyIHRpbWUgPSBwcm9jZXNzLmhydGltZSgpO1xuXG5cdFx0Ly8gQ29udmVydCBbc2Vjb25kcywgbmFub3NlY29uZHNdIHRvIG1pbGxpc2Vjb25kcy5cblx0XHRyZXR1cm4gdGltZVswXSAqIDEwMDAgKyB0aW1lWzFdIC8gMTAwMDAwMDtcblx0fTtcbn1cbi8vIEluIGEgYnJvd3NlciwgdXNlIHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cgaWYgaXQgaXMgYXZhaWxhYmxlLlxuZWxzZSBpZiAodHlwZW9mICh3aW5kb3cpICE9PSAndW5kZWZpbmVkJyAmJlxuICAgICAgICAgd2luZG93LnBlcmZvcm1hbmNlICE9PSB1bmRlZmluZWQgJiZcblx0XHQgd2luZG93LnBlcmZvcm1hbmNlLm5vdyAhPT0gdW5kZWZpbmVkKSB7XG5cdC8vIFRoaXMgbXVzdCBiZSBib3VuZCwgYmVjYXVzZSBkaXJlY3RseSBhc3NpZ25pbmcgdGhpcyBmdW5jdGlvblxuXHQvLyBsZWFkcyB0byBhbiBpbnZvY2F0aW9uIGV4Y2VwdGlvbiBpbiBDaHJvbWUuXG5cdFRXRUVOLm5vdyA9IHdpbmRvdy5wZXJmb3JtYW5jZS5ub3cuYmluZCh3aW5kb3cucGVyZm9ybWFuY2UpO1xufVxuLy8gVXNlIERhdGUubm93IGlmIGl0IGlzIGF2YWlsYWJsZS5cbmVsc2UgaWYgKERhdGUubm93ICE9PSB1bmRlZmluZWQpIHtcblx0VFdFRU4ubm93ID0gRGF0ZS5ub3c7XG59XG4vLyBPdGhlcndpc2UsIHVzZSAnbmV3IERhdGUoKS5nZXRUaW1lKCknLlxuZWxzZSB7XG5cdFRXRUVOLm5vdyA9IGZ1bmN0aW9uICgpIHtcblx0XHRyZXR1cm4gbmV3IERhdGUoKS5nZXRUaW1lKCk7XG5cdH07XG59XG5cblxuVFdFRU4uVHdlZW4gPSBmdW5jdGlvbiAob2JqZWN0LCBncm91cCkge1xuXHR0aGlzLl9vYmplY3QgPSBvYmplY3Q7XG5cdHRoaXMuX3ZhbHVlc1N0YXJ0ID0ge307XG5cdHRoaXMuX3ZhbHVlc0VuZCA9IHt9O1xuXHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdCA9IHt9O1xuXHR0aGlzLl9kdXJhdGlvbiA9IDEwMDA7XG5cdHRoaXMuX3JlcGVhdCA9IDA7XG5cdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IHVuZGVmaW5lZDtcblx0dGhpcy5feW95byA9IGZhbHNlO1xuXHR0aGlzLl9pc1BsYXlpbmcgPSBmYWxzZTtcblx0dGhpcy5fcmV2ZXJzZWQgPSBmYWxzZTtcblx0dGhpcy5fZGVsYXlUaW1lID0gMDtcblx0dGhpcy5fc3RhcnRUaW1lID0gbnVsbDtcblx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBUV0VFTi5FYXNpbmcuTGluZWFyLk5vbmU7XG5cdHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbiA9IFRXRUVOLkludGVycG9sYXRpb24uTGluZWFyO1xuXHR0aGlzLl9jaGFpbmVkVHdlZW5zID0gW107XG5cdHRoaXMuX29uU3RhcnRDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID0gZmFsc2U7XG5cdHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgPSBudWxsO1xuXHR0aGlzLl9vblN0b3BDYWxsYmFjayA9IG51bGw7XG5cdHRoaXMuX2dyb3VwID0gZ3JvdXAgfHwgVFdFRU47XG5cdHRoaXMuX2lkID0gVFdFRU4ubmV4dElkKCk7XG5cbn07XG5cblRXRUVOLlR3ZWVuLnByb3RvdHlwZSA9IHtcblx0Z2V0SWQ6IGZ1bmN0aW9uIGdldElkKCkge1xuXHRcdHJldHVybiB0aGlzLl9pZDtcblx0fSxcblxuXHRpc1BsYXlpbmc6IGZ1bmN0aW9uIGlzUGxheWluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5faXNQbGF5aW5nO1xuXHR9LFxuXG5cdHRvOiBmdW5jdGlvbiB0byhwcm9wZXJ0aWVzLCBkdXJhdGlvbikge1xuXG5cdFx0dGhpcy5fdmFsdWVzRW5kID0gcHJvcGVydGllcztcblxuXHRcdGlmIChkdXJhdGlvbiAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0XHR0aGlzLl9kdXJhdGlvbiA9IGR1cmF0aW9uO1xuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3RhcnQ6IGZ1bmN0aW9uIHN0YXJ0KHRpbWUpIHtcblxuXHRcdHRoaXMuX2dyb3VwLmFkZCh0aGlzKTtcblxuXHRcdHRoaXMuX2lzUGxheWluZyA9IHRydWU7XG5cblx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IGZhbHNlO1xuXG5cdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSAhPT0gdW5kZWZpbmVkID8gdHlwZW9mIHRpbWUgPT09ICdzdHJpbmcnID8gVFdFRU4ubm93KCkgKyBwYXJzZUZsb2F0KHRpbWUpIDogdGltZSA6IFRXRUVOLm5vdygpO1xuXHRcdHRoaXMuX3N0YXJ0VGltZSArPSB0aGlzLl9kZWxheVRpbWU7XG5cblx0XHRmb3IgKHZhciBwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcblxuXHRcdFx0Ly8gQ2hlY2sgaWYgYW4gQXJyYXkgd2FzIHByb3ZpZGVkIGFzIHByb3BlcnR5IHZhbHVlXG5cdFx0XHRpZiAodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRcdFx0aWYgKHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV0ubGVuZ3RoID09PSAwKSB7XG5cdFx0XHRcdFx0Y29udGludWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBDcmVhdGUgYSBsb2NhbCBjb3B5IG9mIHRoZSBBcnJheSB3aXRoIHRoZSBzdGFydCB2YWx1ZSBhdCB0aGUgZnJvbnRcblx0XHRcdFx0dGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSA9IFt0aGlzLl9vYmplY3RbcHJvcGVydHldXS5jb25jYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XG5cblx0XHRcdH1cblxuXHRcdFx0Ly8gSWYgYHRvKClgIHNwZWNpZmllcyBhIHByb3BlcnR5IHRoYXQgZG9lc24ndCBleGlzdCBpbiB0aGUgc291cmNlIG9iamVjdCxcblx0XHRcdC8vIHdlIHNob3VsZCBub3Qgc2V0IHRoYXQgcHJvcGVydHkgaW4gdGhlIG9iamVjdFxuXHRcdFx0aWYgKHRoaXMuX29iamVjdFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0Ly8gU2F2ZSB0aGUgc3RhcnRpbmcgdmFsdWUuXG5cdFx0XHR0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPSB0aGlzLl9vYmplY3RbcHJvcGVydHldO1xuXG5cdFx0XHRpZiAoKHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSBpbnN0YW5jZW9mIEFycmF5KSA9PT0gZmFsc2UpIHtcblx0XHRcdFx0dGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldICo9IDEuMDsgLy8gRW5zdXJlcyB3ZSdyZSB1c2luZyBudW1iZXJzLCBub3Qgc3RyaW5nc1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV0gPSB0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gfHwgMDtcblxuXHRcdH1cblxuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0c3RvcDogZnVuY3Rpb24gc3RvcCgpIHtcblxuXHRcdGlmICghdGhpcy5faXNQbGF5aW5nKSB7XG5cdFx0XHRyZXR1cm4gdGhpcztcblx0XHR9XG5cblx0XHR0aGlzLl9ncm91cC5yZW1vdmUodGhpcyk7XG5cdFx0dGhpcy5faXNQbGF5aW5nID0gZmFsc2U7XG5cblx0XHRpZiAodGhpcy5fb25TdG9wQ2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuX29uU3RvcENhbGxiYWNrKHRoaXMuX29iamVjdCk7XG5cdFx0fVxuXG5cdFx0dGhpcy5zdG9wQ2hhaW5lZFR3ZWVucygpO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0ZW5kOiBmdW5jdGlvbiBlbmQoKSB7XG5cblx0XHR0aGlzLnVwZGF0ZSh0aGlzLl9zdGFydFRpbWUgKyB0aGlzLl9kdXJhdGlvbik7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRzdG9wQ2hhaW5lZFR3ZWVuczogZnVuY3Rpb24gc3RvcENoYWluZWRUd2VlbnMoKSB7XG5cblx0XHRmb3IgKHZhciBpID0gMCwgbnVtQ2hhaW5lZFR3ZWVucyA9IHRoaXMuX2NoYWluZWRUd2VlbnMubGVuZ3RoOyBpIDwgbnVtQ2hhaW5lZFR3ZWVuczsgaSsrKSB7XG5cdFx0XHR0aGlzLl9jaGFpbmVkVHdlZW5zW2ldLnN0b3AoKTtcblx0XHR9XG5cblx0fSxcblxuXHRncm91cDogZnVuY3Rpb24gZ3JvdXAoZ3JvdXApIHtcblx0XHR0aGlzLl9ncm91cCA9IGdyb3VwO1xuXHRcdHJldHVybiB0aGlzO1xuXHR9LFxuXG5cdGRlbGF5OiBmdW5jdGlvbiBkZWxheShhbW91bnQpIHtcblxuXHRcdHRoaXMuX2RlbGF5VGltZSA9IGFtb3VudDtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJlcGVhdDogZnVuY3Rpb24gcmVwZWF0KHRpbWVzKSB7XG5cblx0XHR0aGlzLl9yZXBlYXQgPSB0aW1lcztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHJlcGVhdERlbGF5OiBmdW5jdGlvbiByZXBlYXREZWxheShhbW91bnQpIHtcblxuXHRcdHRoaXMuX3JlcGVhdERlbGF5VGltZSA9IGFtb3VudDtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHlveW86IGZ1bmN0aW9uIHlveW8oeXkpIHtcblxuXHRcdHRoaXMuX3lveW8gPSB5eTtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGVhc2luZzogZnVuY3Rpb24gZWFzaW5nKGVhcykge1xuXG5cdFx0dGhpcy5fZWFzaW5nRnVuY3Rpb24gPSBlYXM7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRpbnRlcnBvbGF0aW9uOiBmdW5jdGlvbiBpbnRlcnBvbGF0aW9uKGludGVyKSB7XG5cblx0XHR0aGlzLl9pbnRlcnBvbGF0aW9uRnVuY3Rpb24gPSBpbnRlcjtcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdGNoYWluOiBmdW5jdGlvbiBjaGFpbigpIHtcblxuXHRcdHRoaXMuX2NoYWluZWRUd2VlbnMgPSBhcmd1bWVudHM7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvblN0YXJ0OiBmdW5jdGlvbiBvblN0YXJ0KGNhbGxiYWNrKSB7XG5cblx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdG9uVXBkYXRlOiBmdW5jdGlvbiBvblVwZGF0ZShjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25VcGRhdGVDYWxsYmFjayA9IGNhbGxiYWNrO1xuXHRcdHJldHVybiB0aGlzO1xuXG5cdH0sXG5cblx0b25Db21wbGV0ZTogZnVuY3Rpb24gb25Db21wbGV0ZShjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25Db21wbGV0ZUNhbGxiYWNrID0gY2FsbGJhY2s7XG5cdFx0cmV0dXJuIHRoaXM7XG5cblx0fSxcblxuXHRvblN0b3A6IGZ1bmN0aW9uIG9uU3RvcChjYWxsYmFjaykge1xuXG5cdFx0dGhpcy5fb25TdG9wQ2FsbGJhY2sgPSBjYWxsYmFjaztcblx0XHRyZXR1cm4gdGhpcztcblxuXHR9LFxuXG5cdHVwZGF0ZTogZnVuY3Rpb24gdXBkYXRlKHRpbWUpIHtcblxuXHRcdHZhciBwcm9wZXJ0eTtcblx0XHR2YXIgZWxhcHNlZDtcblx0XHR2YXIgdmFsdWU7XG5cblx0XHRpZiAodGltZSA8IHRoaXMuX3N0YXJ0VGltZSkge1xuXHRcdFx0cmV0dXJuIHRydWU7XG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29uU3RhcnRDYWxsYmFja0ZpcmVkID09PSBmYWxzZSkge1xuXG5cdFx0XHRpZiAodGhpcy5fb25TdGFydENhbGxiYWNrICE9PSBudWxsKSB7XG5cdFx0XHRcdHRoaXMuX29uU3RhcnRDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdFx0fVxuXG5cdFx0XHR0aGlzLl9vblN0YXJ0Q2FsbGJhY2tGaXJlZCA9IHRydWU7XG5cdFx0fVxuXG5cdFx0ZWxhcHNlZCA9ICh0aW1lIC0gdGhpcy5fc3RhcnRUaW1lKSAvIHRoaXMuX2R1cmF0aW9uO1xuXHRcdGVsYXBzZWQgPSAodGhpcy5fZHVyYXRpb24gPT09IDAgfHwgZWxhcHNlZCA+IDEpID8gMSA6IGVsYXBzZWQ7XG5cblx0XHR2YWx1ZSA9IHRoaXMuX2Vhc2luZ0Z1bmN0aW9uKGVsYXBzZWQpO1xuXG5cdFx0Zm9yIChwcm9wZXJ0eSBpbiB0aGlzLl92YWx1ZXNFbmQpIHtcblxuXHRcdFx0Ly8gRG9uJ3QgdXBkYXRlIHByb3BlcnRpZXMgdGhhdCBkbyBub3QgZXhpc3QgaW4gdGhlIHNvdXJjZSBvYmplY3Rcblx0XHRcdGlmICh0aGlzLl92YWx1ZXNTdGFydFtwcm9wZXJ0eV0gPT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRjb250aW51ZTtcblx0XHRcdH1cblxuXHRcdFx0dmFyIHN0YXJ0ID0gdGhpcy5fdmFsdWVzU3RhcnRbcHJvcGVydHldIHx8IDA7XG5cdFx0XHR2YXIgZW5kID0gdGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XTtcblxuXHRcdFx0aWYgKGVuZCBpbnN0YW5jZW9mIEFycmF5KSB7XG5cblx0XHRcdFx0dGhpcy5fb2JqZWN0W3Byb3BlcnR5XSA9IHRoaXMuX2ludGVycG9sYXRpb25GdW5jdGlvbihlbmQsIHZhbHVlKTtcblxuXHRcdFx0fSBlbHNlIHtcblxuXHRcdFx0XHQvLyBQYXJzZXMgcmVsYXRpdmUgZW5kIHZhbHVlcyB3aXRoIHN0YXJ0IGFzIGJhc2UgKGUuZy46ICsxMCwgLTMpXG5cdFx0XHRcdGlmICh0eXBlb2YgKGVuZCkgPT09ICdzdHJpbmcnKSB7XG5cblx0XHRcdFx0XHRpZiAoZW5kLmNoYXJBdCgwKSA9PT0gJysnIHx8IGVuZC5jaGFyQXQoMCkgPT09ICctJykge1xuXHRcdFx0XHRcdFx0ZW5kID0gc3RhcnQgKyBwYXJzZUZsb2F0KGVuZCk7XG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGVuZCA9IHBhcnNlRmxvYXQoZW5kKTtcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBQcm90ZWN0IGFnYWluc3Qgbm9uIG51bWVyaWMgcHJvcGVydGllcy5cblx0XHRcdFx0aWYgKHR5cGVvZiAoZW5kKSA9PT0gJ251bWJlcicpIHtcblx0XHRcdFx0XHR0aGlzLl9vYmplY3RbcHJvcGVydHldID0gc3RhcnQgKyAoZW5kIC0gc3RhcnQpICogdmFsdWU7XG5cdFx0XHRcdH1cblxuXHRcdFx0fVxuXG5cdFx0fVxuXG5cdFx0aWYgKHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcblx0XHRcdHRoaXMuX29uVXBkYXRlQ2FsbGJhY2sodGhpcy5fb2JqZWN0KTtcblx0XHR9XG5cblx0XHRpZiAoZWxhcHNlZCA9PT0gMSkge1xuXG5cdFx0XHRpZiAodGhpcy5fcmVwZWF0ID4gMCkge1xuXG5cdFx0XHRcdGlmIChpc0Zpbml0ZSh0aGlzLl9yZXBlYXQpKSB7XG5cdFx0XHRcdFx0dGhpcy5fcmVwZWF0LS07XG5cdFx0XHRcdH1cblxuXHRcdFx0XHQvLyBSZWFzc2lnbiBzdGFydGluZyB2YWx1ZXMsIHJlc3RhcnQgYnkgbWFraW5nIHN0YXJ0VGltZSA9IG5vd1xuXHRcdFx0XHRmb3IgKHByb3BlcnR5IGluIHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0KSB7XG5cblx0XHRcdFx0XHRpZiAodHlwZW9mICh0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldKSA9PT0gJ3N0cmluZycpIHtcblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSArIHBhcnNlRmxvYXQodGhpcy5fdmFsdWVzRW5kW3Byb3BlcnR5XSk7XG5cdFx0XHRcdFx0fVxuXG5cdFx0XHRcdFx0aWYgKHRoaXMuX3lveW8pIHtcblx0XHRcdFx0XHRcdHZhciB0bXAgPSB0aGlzLl92YWx1ZXNTdGFydFJlcGVhdFtwcm9wZXJ0eV07XG5cblx0XHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc0VuZFtwcm9wZXJ0eV07XG5cdFx0XHRcdFx0XHR0aGlzLl92YWx1ZXNFbmRbcHJvcGVydHldID0gdG1wO1xuXHRcdFx0XHRcdH1cblxuXHRcdFx0XHRcdHRoaXMuX3ZhbHVlc1N0YXJ0W3Byb3BlcnR5XSA9IHRoaXMuX3ZhbHVlc1N0YXJ0UmVwZWF0W3Byb3BlcnR5XTtcblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aWYgKHRoaXMuX3lveW8pIHtcblx0XHRcdFx0XHR0aGlzLl9yZXZlcnNlZCA9ICF0aGlzLl9yZXZlcnNlZDtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGlmICh0aGlzLl9yZXBlYXREZWxheVRpbWUgIT09IHVuZGVmaW5lZCkge1xuXHRcdFx0XHRcdHRoaXMuX3N0YXJ0VGltZSA9IHRpbWUgKyB0aGlzLl9yZXBlYXREZWxheVRpbWU7XG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0dGhpcy5fc3RhcnRUaW1lID0gdGltZSArIHRoaXMuX2RlbGF5VGltZTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdHJldHVybiB0cnVlO1xuXG5cdFx0XHR9IGVsc2Uge1xuXG5cdFx0XHRcdGlmICh0aGlzLl9vbkNvbXBsZXRlQ2FsbGJhY2sgIT09IG51bGwpIHtcblxuXHRcdFx0XHRcdHRoaXMuX29uQ29tcGxldGVDYWxsYmFjayh0aGlzLl9vYmplY3QpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0Zm9yICh2YXIgaSA9IDAsIG51bUNoYWluZWRUd2VlbnMgPSB0aGlzLl9jaGFpbmVkVHdlZW5zLmxlbmd0aDsgaSA8IG51bUNoYWluZWRUd2VlbnM7IGkrKykge1xuXHRcdFx0XHRcdC8vIE1ha2UgdGhlIGNoYWluZWQgdHdlZW5zIHN0YXJ0IGV4YWN0bHkgYXQgdGhlIHRpbWUgdGhleSBzaG91bGQsXG5cdFx0XHRcdFx0Ly8gZXZlbiBpZiB0aGUgYHVwZGF0ZSgpYCBtZXRob2Qgd2FzIGNhbGxlZCB3YXkgcGFzdCB0aGUgZHVyYXRpb24gb2YgdGhlIHR3ZWVuXG5cdFx0XHRcdFx0dGhpcy5fY2hhaW5lZFR3ZWVuc1tpXS5zdGFydCh0aGlzLl9zdGFydFRpbWUgKyB0aGlzLl9kdXJhdGlvbik7XG5cdFx0XHRcdH1cblxuXHRcdFx0XHRyZXR1cm4gZmFsc2U7XG5cblx0XHRcdH1cblxuXHRcdH1cblxuXHRcdHJldHVybiB0cnVlO1xuXG5cdH1cbn07XG5cblxuVFdFRU4uRWFzaW5nID0ge1xuXG5cdExpbmVhcjoge1xuXG5cdFx0Tm9uZTogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIGs7XG5cblx0XHR9XG5cblx0fSxcblxuXHRRdWFkcmF0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGs7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqICgyIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gLSAwLjUgKiAoLS1rICogKGsgLSAyKSAtIDEpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Q3ViaWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIC0tayAqIGsgKiBrICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKChrIC09IDIpICogayAqIGsgKyAyKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFF1YXJ0aWM6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gayAqIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gKC0tayAqIGsgKiBrICogayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIGsgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAtIDAuNSAqICgoayAtPSAyKSAqIGsgKiBrICogayAtIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0UXVpbnRpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrICogayAqIGsgKiBrICogaztcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAtLWsgKiBrICogayAqIGsgKiBrICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogayAqIGsgKiBrICogayAqIGs7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiAwLjUgKiAoKGsgLT0gMikgKiBrICogayAqIGsgKiBrICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRTaW51c29pZGFsOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBNYXRoLmNvcyhrICogTWF0aC5QSSAvIDIpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIE1hdGguc2luKGsgKiBNYXRoLlBJIC8gMik7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAwLjUgKiAoMSAtIE1hdGguY29zKE1hdGguUEkgKiBrKSk7XG5cblx0XHR9XG5cblx0fSxcblxuXHRFeHBvbmVudGlhbDoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrID09PSAwID8gMCA6IE1hdGgucG93KDEwMjQsIGsgLSAxKTtcblxuXHRcdH0sXG5cblx0XHRPdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiBrID09PSAxID8gMSA6IDEgLSBNYXRoLnBvdygyLCAtIDEwICogayk7XG5cblx0XHR9LFxuXG5cdFx0SW5PdXQ6IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0aWYgKChrICo9IDIpIDwgMSkge1xuXHRcdFx0XHRyZXR1cm4gMC41ICogTWF0aC5wb3coMTAyNCwgayAtIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKC0gTWF0aC5wb3coMiwgLSAxMCAqIChrIC0gMSkpICsgMik7XG5cblx0XHR9XG5cblx0fSxcblxuXHRDaXJjdWxhcjoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdHJldHVybiAxIC0gTWF0aC5zcXJ0KDEgLSBrICogayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRyZXR1cm4gTWF0aC5zcXJ0KDEgLSAoLS1rICogaykpO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoKGsgKj0gMikgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtIDAuNSAqIChNYXRoLnNxcnQoMSAtIGsgKiBrKSAtIDEpO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gMC41ICogKE1hdGguc3FydCgxIC0gKGsgLT0gMikgKiBrKSArIDEpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0RWxhc3RpYzoge1xuXG5cdFx0SW46IGZ1bmN0aW9uIChrKSB7XG5cblx0XHRcdGlmIChrID09PSAwKSB7XG5cdFx0XHRcdHJldHVybiAwO1xuXHRcdFx0fVxuXG5cdFx0XHRpZiAoayA9PT0gMSkge1xuXHRcdFx0XHRyZXR1cm4gMTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIC1NYXRoLnBvdygyLCAxMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0aWYgKGsgPT09IDApIHtcblx0XHRcdFx0cmV0dXJuIDA7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID09PSAxKSB7XG5cdFx0XHRcdHJldHVybiAxO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gTWF0aC5wb3coMiwgLTEwICogaykgKiBNYXRoLnNpbigoayAtIDAuMSkgKiA1ICogTWF0aC5QSSkgKyAxO1xuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA9PT0gMCkge1xuXHRcdFx0XHRyZXR1cm4gMDtcblx0XHRcdH1cblxuXHRcdFx0aWYgKGsgPT09IDEpIHtcblx0XHRcdFx0cmV0dXJuIDE7XG5cdFx0XHR9XG5cblx0XHRcdGsgKj0gMjtcblxuXHRcdFx0aWYgKGsgPCAxKSB7XG5cdFx0XHRcdHJldHVybiAtMC41ICogTWF0aC5wb3coMiwgMTAgKiAoayAtIDEpKSAqIE1hdGguc2luKChrIC0gMS4xKSAqIDUgKiBNYXRoLlBJKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqIE1hdGgucG93KDIsIC0xMCAqIChrIC0gMSkpICogTWF0aC5zaW4oKGsgLSAxLjEpICogNSAqIE1hdGguUEkpICsgMTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdEJhY2s6IHtcblxuXHRcdEluOiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHR2YXIgcyA9IDEuNzAxNTg7XG5cblx0XHRcdHJldHVybiBrICogayAqICgocyArIDEpICogayAtIHMpO1xuXG5cdFx0fSxcblxuXHRcdE91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4O1xuXG5cdFx0XHRyZXR1cm4gLS1rICogayAqICgocyArIDEpICogayArIHMpICsgMTtcblxuXHRcdH0sXG5cblx0XHRJbk91dDogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0dmFyIHMgPSAxLjcwMTU4ICogMS41MjU7XG5cblx0XHRcdGlmICgoayAqPSAyKSA8IDEpIHtcblx0XHRcdFx0cmV0dXJuIDAuNSAqIChrICogayAqICgocyArIDEpICogayAtIHMpKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIDAuNSAqICgoayAtPSAyKSAqIGsgKiAoKHMgKyAxKSAqIGsgKyBzKSArIDIpO1xuXG5cdFx0fVxuXG5cdH0sXG5cblx0Qm91bmNlOiB7XG5cblx0XHRJbjogZnVuY3Rpb24gKGspIHtcblxuXHRcdFx0cmV0dXJuIDEgLSBUV0VFTi5FYXNpbmcuQm91bmNlLk91dCgxIC0gayk7XG5cblx0XHR9LFxuXG5cdFx0T3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8ICgxIC8gMi43NSkpIHtcblx0XHRcdFx0cmV0dXJuIDcuNTYyNSAqIGsgKiBrO1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIgLyAyLjc1KSkge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDEuNSAvIDIuNzUpKSAqIGsgKyAwLjc1O1xuXHRcdFx0fSBlbHNlIGlmIChrIDwgKDIuNSAvIDIuNzUpKSB7XG5cdFx0XHRcdHJldHVybiA3LjU2MjUgKiAoayAtPSAoMi4yNSAvIDIuNzUpKSAqIGsgKyAwLjkzNzU7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gNy41NjI1ICogKGsgLT0gKDIuNjI1IC8gMi43NSkpICogayArIDAuOTg0Mzc1O1xuXHRcdFx0fVxuXG5cdFx0fSxcblxuXHRcdEluT3V0OiBmdW5jdGlvbiAoaykge1xuXG5cdFx0XHRpZiAoayA8IDAuNSkge1xuXHRcdFx0XHRyZXR1cm4gVFdFRU4uRWFzaW5nLkJvdW5jZS5JbihrICogMikgKiAwLjU7XG5cdFx0XHR9XG5cblx0XHRcdHJldHVybiBUV0VFTi5FYXNpbmcuQm91bmNlLk91dChrICogMiAtIDEpICogMC41ICsgMC41O1xuXG5cdFx0fVxuXG5cdH1cblxufTtcblxuVFdFRU4uSW50ZXJwb2xhdGlvbiA9IHtcblxuXHRMaW5lYXI6IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkxpbmVhcjtcblxuXHRcdGlmIChrIDwgMCkge1xuXHRcdFx0cmV0dXJuIGZuKHZbMF0sIHZbMV0sIGYpO1xuXHRcdH1cblxuXHRcdGlmIChrID4gMSkge1xuXHRcdFx0cmV0dXJuIGZuKHZbbV0sIHZbbSAtIDFdLCBtIC0gZik7XG5cdFx0fVxuXG5cdFx0cmV0dXJuIGZuKHZbaV0sIHZbaSArIDEgPiBtID8gbSA6IGkgKyAxXSwgZiAtIGkpO1xuXG5cdH0sXG5cblx0QmV6aWVyOiBmdW5jdGlvbiAodiwgaykge1xuXG5cdFx0dmFyIGIgPSAwO1xuXHRcdHZhciBuID0gdi5sZW5ndGggLSAxO1xuXHRcdHZhciBwdyA9IE1hdGgucG93O1xuXHRcdHZhciBibiA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuQmVybnN0ZWluO1xuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPD0gbjsgaSsrKSB7XG5cdFx0XHRiICs9IHB3KDEgLSBrLCBuIC0gaSkgKiBwdyhrLCBpKSAqIHZbaV0gKiBibihuLCBpKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gYjtcblxuXHR9LFxuXG5cdENhdG11bGxSb206IGZ1bmN0aW9uICh2LCBrKSB7XG5cblx0XHR2YXIgbSA9IHYubGVuZ3RoIC0gMTtcblx0XHR2YXIgZiA9IG0gKiBrO1xuXHRcdHZhciBpID0gTWF0aC5mbG9vcihmKTtcblx0XHR2YXIgZm4gPSBUV0VFTi5JbnRlcnBvbGF0aW9uLlV0aWxzLkNhdG11bGxSb207XG5cblx0XHRpZiAodlswXSA9PT0gdlttXSkge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0aSA9IE1hdGguZmxvb3IoZiA9IG0gKiAoMSArIGspKTtcblx0XHRcdH1cblxuXHRcdFx0cmV0dXJuIGZuKHZbKGkgLSAxICsgbSkgJSBtXSwgdltpXSwgdlsoaSArIDEpICUgbV0sIHZbKGkgKyAyKSAlIG1dLCBmIC0gaSk7XG5cblx0XHR9IGVsc2Uge1xuXG5cdFx0XHRpZiAoayA8IDApIHtcblx0XHRcdFx0cmV0dXJuIHZbMF0gLSAoZm4odlswXSwgdlswXSwgdlsxXSwgdlsxXSwgLWYpIC0gdlswXSk7XG5cdFx0XHR9XG5cblx0XHRcdGlmIChrID4gMSkge1xuXHRcdFx0XHRyZXR1cm4gdlttXSAtIChmbih2W21dLCB2W21dLCB2W20gLSAxXSwgdlttIC0gMV0sIGYgLSBtKSAtIHZbbV0pO1xuXHRcdFx0fVxuXG5cdFx0XHRyZXR1cm4gZm4odltpID8gaSAtIDEgOiAwXSwgdltpXSwgdlttIDwgaSArIDEgPyBtIDogaSArIDFdLCB2W20gPCBpICsgMiA/IG0gOiBpICsgMl0sIGYgLSBpKTtcblxuXHRcdH1cblxuXHR9LFxuXG5cdFV0aWxzOiB7XG5cblx0XHRMaW5lYXI6IGZ1bmN0aW9uIChwMCwgcDEsIHQpIHtcblxuXHRcdFx0cmV0dXJuIChwMSAtIHAwKSAqIHQgKyBwMDtcblxuXHRcdH0sXG5cblx0XHRCZXJuc3RlaW46IGZ1bmN0aW9uIChuLCBpKSB7XG5cblx0XHRcdHZhciBmYyA9IFRXRUVOLkludGVycG9sYXRpb24uVXRpbHMuRmFjdG9yaWFsO1xuXG5cdFx0XHRyZXR1cm4gZmMobikgLyBmYyhpKSAvIGZjKG4gLSBpKTtcblxuXHRcdH0sXG5cblx0XHRGYWN0b3JpYWw6IChmdW5jdGlvbiAoKSB7XG5cblx0XHRcdHZhciBhID0gWzFdO1xuXG5cdFx0XHRyZXR1cm4gZnVuY3Rpb24gKG4pIHtcblxuXHRcdFx0XHR2YXIgcyA9IDE7XG5cblx0XHRcdFx0aWYgKGFbbl0pIHtcblx0XHRcdFx0XHRyZXR1cm4gYVtuXTtcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGZvciAodmFyIGkgPSBuOyBpID4gMTsgaS0tKSB7XG5cdFx0XHRcdFx0cyAqPSBpO1xuXHRcdFx0XHR9XG5cblx0XHRcdFx0YVtuXSA9IHM7XG5cdFx0XHRcdHJldHVybiBzO1xuXG5cdFx0XHR9O1xuXG5cdFx0fSkoKSxcblxuXHRcdENhdG11bGxSb206IGZ1bmN0aW9uIChwMCwgcDEsIHAyLCBwMywgdCkge1xuXG5cdFx0XHR2YXIgdjAgPSAocDIgLSBwMCkgKiAwLjU7XG5cdFx0XHR2YXIgdjEgPSAocDMgLSBwMSkgKiAwLjU7XG5cdFx0XHR2YXIgdDIgPSB0ICogdDtcblx0XHRcdHZhciB0MyA9IHQgKiB0MjtcblxuXHRcdFx0cmV0dXJuICgyICogcDEgLSAyICogcDIgKyB2MCArIHYxKSAqIHQzICsgKC0gMyAqIHAxICsgMyAqIHAyIC0gMiAqIHYwIC0gdjEpICogdDIgKyB2MCAqIHQgKyBwMTtcblxuXHRcdH1cblxuXHR9XG5cbn07XG5cbi8vIFVNRCAoVW5pdmVyc2FsIE1vZHVsZSBEZWZpbml0aW9uKVxuKGZ1bmN0aW9uIChyb290KSB7XG5cblx0aWYgKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZCkge1xuXG5cdFx0Ly8gQU1EXG5cdFx0ZGVmaW5lKFtdLCBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZXR1cm4gVFdFRU47XG5cdFx0fSk7XG5cblx0fSBlbHNlIGlmICh0eXBlb2YgbW9kdWxlICE9PSAndW5kZWZpbmVkJyAmJiB0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpIHtcblxuXHRcdC8vIE5vZGUuanNcblx0XHRtb2R1bGUuZXhwb3J0cyA9IFRXRUVOO1xuXG5cdH0gZWxzZSBpZiAocm9vdCAhPT0gdW5kZWZpbmVkKSB7XG5cblx0XHQvLyBHbG9iYWwgdmFyaWFibGVcblx0XHRyb290LlRXRUVOID0gVFdFRU47XG5cblx0fVxuXG59KSh0aGlzKTtcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCIvKiBqc3BhbmVsLnNhc3M6IDIwMTgtMTAtMjEgMTM6NDEgKi9cXG4vKiBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzMwNDIxNTcwL3Nhc3MtdW5pY29kZS1lc2NhcGUtaXMtbm90LXByZXNlcnZlZC1pbi1jc3MtZmlsZSAqL1xcbi5qc1BhbmVsIHtcXG4gIGJvcmRlcjogMDtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICB2ZXJ0aWNhbC1hbGlnbjogYmFzZWxpbmU7XFxuICBmb250LWZhbWlseTogUm9ib3RvLFxcXCJPcGVuIFNhbnNcXFwiLExhdG8sXFxcIkhlbHZldGljYSBOZXVlXFxcIixBcmlhbCxzYW5zLXNlcmlmO1xcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgb3BhY2l0eTogMDtcXG4gIG92ZXJmbG93OiB2aXNpYmxlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgei1pbmRleDogMTAwOyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1oZHIge1xcbiAgICBib3JkZXI6IDA7XFxuICAgIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICAgIHZlcnRpY2FsLWFsaWduOiBiYXNlbGluZTtcXG4gICAgZm9udC1mYW1pbHk6IFJvYm90byxcXFwiT3BlbiBTYW5zXFxcIixMYXRvLFxcXCJIZWx2ZXRpY2EgTmV1ZVxcXCIsQXJpYWwsc2Fucy1zZXJpZjtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICBmbGV4LXNocmluazogMDsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtY29udGVudCB7XFxuICAgIGJvcmRlcjogMDtcXG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcXG4gICAgdmVydGljYWwtYWxpZ246IGJhc2VsaW5lO1xcbiAgICBmb250LWZhbWlseTogUm9ib3RvLFxcXCJPcGVuIFNhbnNcXFwiLExhdG8sXFxcIkhlbHZldGljYSBOZXVlXFxcIixBcmlhbCxzYW5zLXNlcmlmO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xcbiAgICBjb2xvcjogIzAwMDAwMDtcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBwb3NpdGlvbjogcmVsYXRpdmU7XFxuICAgIG92ZXJmbG93LXg6IGhpZGRlbjtcXG4gICAgb3ZlcmZsb3cteTogYXV0bztcXG4gICAgZmxleC1ncm93OiAxOyB9XFxuICAgIC5qc1BhbmVsIC5qc1BhbmVsLWNvbnRlbnQgcHJlIHtcXG4gICAgICBjb2xvcjogaW5oZXJpdDsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyIHtcXG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcXG4gICAgZmxleC13cmFwOiBub3dyYXA7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZTBlMGUwO1xcbiAgICBkaXNwbGF5OiBub25lO1xcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgICBmb250LXNpemU6IDFyZW07XFxuICAgIGhlaWdodDogYXV0bztcXG4gICAgYmFja2dyb3VuZDogI2Y1ZjVmNTtcXG4gICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcXG4gICAgY29sb3I6IGJsYWNrO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuICAuanNQYW5lbCAuanNQYW5lbC1mdHIuYWN0aXZlIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1zaHJpbms6IDA7IH1cXG4gICAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyLmFjdGl2ZSA+ICoge1xcbiAgICAgIG1hcmdpbjogM3B4IDhweDsgfVxcbiAgLmpzUGFuZWwgLmpzUGFuZWwtZnRyLnBhbmVsLWZvb3RlciB7XFxuICAgIHBhZGRpbmc6IDA7IH1cXG5cXG4uanNQYW5lbC1oZWFkZXJiYXIsIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGZvbnQtc2l6ZTogMXJlbTsgfVxcblxcbi5qc1BhbmVsLWhlYWRlcmJhciB7XFxuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxuICBmbGV4LXdyYXA6IG5vd3JhcDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7IH1cXG4gIC5qc1BhbmVsLWhlYWRlcmJhciBpbWcge1xcbiAgICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xcbiAgICBtYXgtaGVpZ2h0OiAzOHB4OyB9XFxuXFxuLmpzUGFuZWwtdGl0bGViYXIge1xcbiAgZGlzcGxheTogZmxleDtcXG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICBmbGV4OiAxIDEgMHB4O1xcbiAgY3Vyc29yOiBtb3ZlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgLmpzUGFuZWwtdGl0bGViYXIgLmpzUGFuZWwtdGl0bGUge1xcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xcbiAgICBvdmVyZmxvdzogaGlkZGVuO1xcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcXG4gICAgZm9udC1zaXplOiAxcmVtO1xcbiAgICBmb250LXZhcmlhbnQ6IHNtYWxsLWNhcHM7XFxuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XFxuICAgIGxpbmUtaGVpZ2h0OiAxLjU7XFxuICAgIG1hcmdpbjogMCA1cHggMCA4cHg7XFxuICAgIG1pbi13aWR0aDogMDsgfVxcbiAgICAuanNQYW5lbC10aXRsZWJhciAuanNQYW5lbC10aXRsZSBzbWFsbCB7XFxuICAgICAgZm9udC1zaXplOiA3MCU7XFxuICAgICAgY29sb3I6IGluaGVyaXQ7IH1cXG5cXG4uanNQYW5lbC10aXRsZWJhci5qc1BhbmVsLXJ0bCB7XFxuICBmbGV4LWRpcmVjdGlvbjogcm93LXJldmVyc2U7IH1cXG5cXG4uanNQYW5lbC1jb250cm9sYmFyIHtcXG4gIGRpc3BsYXk6IGZsZXg7XFxuICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgdG91Y2gtYWN0aW9uOiBub25lOyB9XFxuICAuanNQYW5lbC1jb250cm9sYmFyIGRpdiBzcGFuOmhvdmVyLCAuanNQYW5lbC1jb250cm9sYmFyIGRpdiBzdmc6aG92ZXIge1xcbiAgICBvcGFjaXR5OiAuNjsgfVxcbiAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4ge1xcbiAgICBjdXJzb3I6IHBvaW50ZXI7XFxuICAgIHRvdWNoLWFjdGlvbjogbm9uZTtcXG4gICAgcGFkZGluZzogNnB4IDhweCA4cHggM3B4OyB9XFxuICAgIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHNwYW4ge1xcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XFxuICAgICAgcGFkZGluZzogMCA0cHggMCAycHg7IH1cXG4gICAgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4gc3Bhbi5nbHlwaGljb24ge1xcbiAgICAgIHBhZGRpbmc6IDAgMnB4OyB9XFxuICAgIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuIHN2Zy5qc1BhbmVsLWljb24ge1xcbiAgICAgIHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7IH1cXG4gIC5qc1BhbmVsLWNvbnRyb2xiYXIgLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZSwgLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG4tc21hbGxpZnlyZXYge1xcbiAgICBkaXNwbGF5OiBub25lOyB9XFxuXFxuLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgZGlzcGxheTogbm9uZTtcXG4gIHdpZHRoOiBhdXRvO1xcbiAgaGVpZ2h0OiBhdXRvOyB9XFxuXFxuLmpzUGFuZWwtaGRyLXRvb2xiYXIuYWN0aXZlIHtcXG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcXG4gIGZsZXgtd3JhcDogbm93cmFwO1xcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjsgfVxcbiAgLmpzUGFuZWwtaGRyLXRvb2xiYXIuYWN0aXZlID4gKiB7XFxuICAgIG1hcmdpbjogM3B4IDhweDsgfVxcblxcbi8qIHN0eWxlcyBmb3IgcGFuZWxzIHVzaW5nIG9wdGlvbi5ydGwgKi9cXG4uanNQYW5lbC1oZWFkZXJiYXIuanNQYW5lbC1ydGwsIC5qc1BhbmVsLWNvbnRyb2xiYXIuanNQYW5lbC1ydGwsIC5qc1BhbmVsLWhkci10b29sYmFyLmpzUGFuZWwtcnRsIHtcXG4gIGZsZXgtZGlyZWN0aW9uOiByb3ctcmV2ZXJzZTsgfVxcblxcbi5qc1BhbmVsLWhkci10b29sYmFyLmFjdGl2ZS5qc1BhbmVsLXJ0bCB7XFxuICBwYWRkaW5nOiA3cHggMCAxMHB4IDA7IH1cXG5cXG4uanNQYW5lbC1mdHIuanNQYW5lbC1ydGwge1xcbiAgZmxleC1kaXJlY3Rpb246IHJvdzsgfVxcblxcbi8qIGNvbnRhaW5lciB0aGF0IHRha2VzIHRoZSBtaW5pZmllZCBqc1BhbmVscyAqL1xcbiNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciwgLmpzUGFuZWwtbWluaW1pemVkLWJveCwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgd3JhcC1yZXZlcnNlO1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQgbm9uZSByZXBlYXQgc2Nyb2xsIDAgMDtcXG4gIGJvdHRvbTogMDtcXG4gIGhlaWdodDogYXV0bztcXG4gIGxlZnQ6IDA7XFxuICBwb3NpdGlvbjogZml4ZWQ7XFxuICB3aWR0aDogYXV0bztcXG4gIHotaW5kZXg6IDk5OTg7IH1cXG4gICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCwgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCB7XFxuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG8sXFxcIk9wZW4gU2Fuc1xcXCIsTGF0byxcXFwiSGVsdmV0aWNhIE5ldWVcXFwiLEFyaWFsLHNhbnMtc2VyaWY7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxuICAgIHdpZHRoOiAyMDBweDtcXG4gICAgaGVpZ2h0OiA0MHB4O1xcbiAgICBtYXJnaW46IDFweCAxcHggMCAwO1xcbiAgICB6LWluZGV4OiA5OTk5OyB9XFxuICAgICNqc1BhbmVsLXJlcGxhY2VtZW50LWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyLCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciB7XFxuICAgICAgZmxleC1ncm93OiAxO1xcbiAgICAgIG1pbi13aWR0aDogMDtcXG4gICAgICBwYWRkaW5nOiAwOyB9XFxuICAgICAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvLCAuanNQYW5lbC1taW5pbWl6ZWQtYm94IC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvLCAuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvIHtcXG4gICAgICAgIG1heC13aWR0aDogNTAlO1xcbiAgICAgICAgb3ZlcmZsb3c6IGhpZGRlbjsgfVxcbiAgICAgICAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZWFkZXJsb2dvIGltZywgLmpzUGFuZWwtbWluaW1pemVkLWJveCAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGVhZGVybG9nbyBpbWcsIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhlYWRlcmxvZ28gaW1nIHtcXG4gICAgICAgICAgbWF4LXdpZHRoOiAxMDBweDtcXG4gICAgICAgICAgbWF4LWhlaWdodDogMzhweDsgfVxcbiAgICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtdGl0bGViYXIsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtdGl0bGViYXIsIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtdGl0bGViYXIge1xcbiAgICAgIGN1cnNvcjogZGVmYXVsdDtcXG4gICAgICBtaW4td2lkdGg6IDA7IH1cXG4gICAgI2pzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyIC5qc1BhbmVsLXJlcGxhY2VtZW50IC5qc1BhbmVsLWJ0bi5qc1BhbmVsLWJ0bi1ub3JtYWxpemUsIC5qc1BhbmVsLW1pbmltaXplZC1ib3ggLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtYnRuLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZSwgLmpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lciAuanNQYW5lbC1yZXBsYWNlbWVudCAuanNQYW5lbC1idG4uanNQYW5lbC1idG4tbm9ybWFsaXplIHtcXG4gICAgICBkaXNwbGF5OiBibG9jazsgfVxcblxcbi5qc1BhbmVsLW1pbmltaXplZC1ib3gsIC5qc1BhbmVsLW1pbmltaXplZC1jb250YWluZXIge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBvdmVyZmxvdzogaGlkZGVuOyB9XFxuXFxuLyogaGVscGVyIGNsYXNzZXMgdG8gbWFrZSAuanNQYW5lbC1jb250ZW50IGEgZmxleCBib3ggKi9cXG4uZmxleE9uZSB7XFxuICBkaXNwbGF5OiBmbGV4O1xcbiAgZmxleC1mbG93OiByb3cgd3JhcDsgfVxcblxcbi8qIGNzcyBmb3IgcmVzaXplaXQgaGFuZGxlcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtcmVzaXplaXQtaGFuZGxlIHtcXG4gIGRpc3BsYXk6IGJsb2NrO1xcbiAgZm9udC1zaXplOiAwLjFweDtcXG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcXG4gIHRvdWNoLWFjdGlvbjogbm9uZTsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LW4ge1xcbiAgY3Vyc29yOiBuLXJlc2l6ZTtcXG4gIGhlaWdodDogMTJweDtcXG4gIGxlZnQ6IDlweDtcXG4gIHRvcDogLTVweDtcXG4gIHdpZHRoOiBjYWxjKDEwMCUgLSAxOHB4KTsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LWUge1xcbiAgY3Vyc29yOiBlLXJlc2l6ZTtcXG4gIGhlaWdodDogY2FsYygxMDAlIC0gMThweCk7XFxuICByaWdodDogLTlweDtcXG4gIHRvcDogOXB4O1xcbiAgd2lkdGg6IDEycHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zIHtcXG4gIGJvdHRvbTogLTlweDtcXG4gIGN1cnNvcjogcy1yZXNpemU7XFxuICBoZWlnaHQ6IDEycHg7XFxuICBsZWZ0OiA5cHg7XFxuICB3aWR0aDogY2FsYygxMDAlIC0gMThweCk7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC13IHtcXG4gIGN1cnNvcjogdy1yZXNpemU7XFxuICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDE4cHgpO1xcbiAgbGVmdDogLTlweDtcXG4gIHRvcDogOXB4O1xcbiAgd2lkdGg6IDEycHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1uZSB7XFxuICBjdXJzb3I6IG5lLXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgdG9wOiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zZSB7XFxuICBib3R0b206IC05cHg7XFxuICBjdXJzb3I6IHNlLXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIHJpZ2h0OiAtOXB4O1xcbiAgd2lkdGg6IDE4cHg7IH1cXG5cXG4uanNQYW5lbC1yZXNpemVpdC1oYW5kbGUuanNQYW5lbC1yZXNpemVpdC1zdyB7XFxuICBib3R0b206IC05cHg7XFxuICBjdXJzb3I6IHN3LXJlc2l6ZTtcXG4gIGhlaWdodDogMThweDtcXG4gIGxlZnQ6IC05cHg7XFxuICB3aWR0aDogMThweDsgfVxcblxcbi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZS5qc1BhbmVsLXJlc2l6ZWl0LW53IHtcXG4gIGN1cnNvcjogbnctcmVzaXplO1xcbiAgaGVpZ2h0OiAxOHB4O1xcbiAgbGVmdDogLTlweDtcXG4gIHRvcDogLTlweDtcXG4gIHdpZHRoOiAxOHB4OyB9XFxuXFxuLmpzUGFuZWwtZHJhZy1vdmVybGF5IHtcXG4gIHdpZHRoOiAxMDAlO1xcbiAgaGVpZ2h0OiAxMDAlO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgbGVmdDogMDtcXG4gIHRvcDogMDsgfVxcblxcbi8qIGJveC1zaGFkb3dzIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLWRlcHRoLTEge1xcbiAgYm94LXNoYWRvdzogMCAzcHggNnB4IHJnYmEoMCwgMCwgMCwgMC4xNiksIDAgM3B4IDZweCByZ2JhKDAsIDAsIDAsIDAuMjMpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtMiB7XFxuICBib3gtc2hhZG93OiAwIDEwcHggMjBweCByZ2JhKDAsIDAsIDAsIDAuMTkpLCAwIDZweCA2cHggcmdiYSgwLCAwLCAwLCAwLjIzKTsgfVxcblxcbi5qc1BhbmVsLWRlcHRoLTMge1xcbiAgYm94LXNoYWRvdzogMCAxNHB4IDI4cHggcmdiYSgwLCAwLCAwLCAwLjI1KSwgMCAxMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjIyKTsgfVxcblxcbi5qc1BhbmVsLWRlcHRoLTQge1xcbiAgYm94LXNoYWRvdzogMCAxOXB4IDM4cHggcmdiYSgwLCAwLCAwLCAwLjMpLCAwIDE1cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMjIpOyB9XFxuXFxuLmpzUGFuZWwtZGVwdGgtNSB7XFxuICBib3gtc2hhZG93OiAwIDI0cHggNDhweCByZ2JhKDAsIDAsIDAsIDAuMyksIDAgMjBweCAxNHB4IHJnYmEoMCwgMCwgMCwgMC4yMik7IH1cXG5cXG4vKiBzbmFwIHNlbnNpdGl2ZSBhcmVhcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC1zbmFwLWFyZWEge1xcbiAgcG9zaXRpb246IGZpeGVkO1xcbiAgYmFja2dyb3VuZDogYmxhY2s7XFxuICBvcGFjaXR5OiAuMjtcXG4gIGJvcmRlcjogMXB4IHNvbGlkIHNpbHZlcjtcXG4gIGJveC1zaGFkb3c6IDAgMTRweCAyOHB4IHJnYmEoMCwgMCwgMCwgMC41KSwgMCAxMHB4IDEwcHggcmdiYSgwLCAwLCAwLCAwLjUpO1xcbiAgei1pbmRleDogOTk5OTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sdCwgLmpzUGFuZWwtc25hcC1hcmVhLWxjLCAuanNQYW5lbC1zbmFwLWFyZWEtbGIsIC5qc1BhbmVsLXNuYXAtYXJlYS1sZWZ0LXRvcCwgLmpzUGFuZWwtc25hcC1hcmVhLWxlZnQtY2VudGVyLCAuanNQYW5lbC1zbmFwLWFyZWEtbGVmdC1ib3R0b20ge1xcbiAgbGVmdDogMDsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1jdCwgLmpzUGFuZWwtc25hcC1hcmVhLWNiIHtcXG4gIGxlZnQ6IDM3LjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLXJ0LCAuanNQYW5lbC1zbmFwLWFyZWEtcmMsIC5qc1BhbmVsLXNuYXAtYXJlYS1yYiwgLmpzUGFuZWwtc25hcC1hcmVhLXJpZ2h0LXRvcCwgLmpzUGFuZWwtc25hcC1hcmVhLXJpZ2h0LWNlbnRlciwgLmpzUGFuZWwtc25hcC1hcmVhLXJpZ2h0LWJvdHRvbSB7XFxuICByaWdodDogMDsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sdCwgLmpzUGFuZWwtc25hcC1hcmVhLWN0LCAuanNQYW5lbC1zbmFwLWFyZWEtcnQsIC5qc1BhbmVsLXNuYXAtYXJlYS1sZWZ0LXRvcCwgLmpzUGFuZWwtc25hcC1hcmVhLWNlbnRlci10b3AsIC5qc1BhbmVsLXNuYXAtYXJlYS1yaWdodC10b3Age1xcbiAgdG9wOiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxjLCAuanNQYW5lbC1zbmFwLWFyZWEtcmMge1xcbiAgdG9wOiAzNy41JTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sYiwgLmpzUGFuZWwtc25hcC1hcmVhLWNiLCAuanNQYW5lbC1zbmFwLWFyZWEtcmIsIC5qc1BhbmVsLXNuYXAtYXJlYS1sZWZ0LWJvdHRvbSwgLmpzUGFuZWwtc25hcC1hcmVhLWNlbnRlci1ib3R0b20sIC5qc1BhbmVsLXNuYXAtYXJlYS1yaWdodC1ib3R0b20ge1xcbiAgYm90dG9tOiAwOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWN0LCAuanNQYW5lbC1zbmFwLWFyZWEtY2Ige1xcbiAgd2lkdGg6IDI1JTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1sYywgLmpzUGFuZWwtc25hcC1hcmVhLXJjIHtcXG4gIGhlaWdodDogMjUlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWx0LCAuanNQYW5lbC1zbmFwLWFyZWEtbGVmdC10b3Age1xcbiAgYm9yZGVyLWJvdHRvbS1yaWdodC1yYWRpdXM6IDEwMCU7IH1cXG5cXG4uanNQYW5lbC1zbmFwLWFyZWEtcnQsIC5qc1BhbmVsLXNuYXAtYXJlYS1yaWdodC10b3Age1xcbiAgYm9yZGVyLWJvdHRvbS1sZWZ0LXJhZGl1czogMTAwJTsgfVxcblxcbi5qc1BhbmVsLXNuYXAtYXJlYS1yYiwgLmpzUGFuZWwtc25hcC1hcmVhLXJpZ2h0LWJvdHRvbSB7XFxuICBib3JkZXItdG9wLWxlZnQtcmFkaXVzOiAxMDAlOyB9XFxuXFxuLmpzUGFuZWwtc25hcC1hcmVhLWxiLCAuanNQYW5lbC1zbmFwLWFyZWEtbGVmdC1ib3R0b20ge1xcbiAgYm9yZGVyLXRvcC1yaWdodC1yYWRpdXM6IDEwMCU7IH1cXG5cXG4vKiB0b29sdGlwIGFuZCB0b29sdGlwIGNvbm5lY3RvcnMgKi9cXG4uanNQYW5lbC1jb25uZWN0b3ItbGVmdC10b3AtY29ybmVyLFxcbi5qc1BhbmVsLWNvbm5lY3Rvci1yaWdodC10b3AtY29ybmVyLFxcbi5qc1BhbmVsLWNvbm5lY3Rvci1sZWZ0LWJvdHRvbS1jb3JuZXIsXFxuLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0LWJvdHRvbS1jb3JuZXIge1xcbiAgd2lkdGg6IDEycHg7XFxuICBoZWlnaHQ6IDEycHg7XFxuICBwb3NpdGlvbjogYWJzb2x1dGU7XFxuICBib3JkZXItcmFkaXVzOiA1MCU7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItbGVmdC10b3AtY29ybmVyIHtcXG4gIGxlZnQ6IGNhbGMoMTAwJSAtIDZweCk7XFxuICB0b3A6IGNhbGMoMTAwJSAtIDZweCk7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHQtdG9wLWNvcm5lciB7XFxuICBsZWZ0OiAtNnB4O1xcbiAgdG9wOiBjYWxjKDEwMCUgLSA2cHgpOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0LWJvdHRvbS1jb3JuZXIge1xcbiAgbGVmdDogLTZweDtcXG4gIHRvcDogLTZweDsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci1sZWZ0LWJvdHRvbS1jb3JuZXIge1xcbiAgbGVmdDogY2FsYygxMDAlIC0gNnB4KTtcXG4gIHRvcDogLTZweDsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci10b3AsXFxuLmpzUGFuZWwtY29ubmVjdG9yLXRvcGxlZnQsXFxuLmpzUGFuZWwtY29ubmVjdG9yLXRvcHJpZ2h0LFxcbi5qc1BhbmVsLWNvbm5lY3Rvci1ib3R0b20sXFxuLmpzUGFuZWwtY29ubmVjdG9yLWJvdHRvbWxlZnQsXFxuLmpzUGFuZWwtY29ubmVjdG9yLWJvdHRvbXJpZ2h0LFxcbi5qc1BhbmVsLWNvbm5lY3Rvci1sZWZ0LFxcbi5qc1BhbmVsLWNvbm5lY3Rvci1sZWZ0dG9wLFxcbi5qc1BhbmVsLWNvbm5lY3Rvci1sZWZ0Ym90dG9tLFxcbi5qc1BhbmVsLWNvbm5lY3Rvci1yaWdodCxcXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHR0b3AsXFxuLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0Ym90dG9tIHtcXG4gIHdpZHRoOiAwO1xcbiAgaGVpZ2h0OiAwO1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgYm9yZGVyOiAxMnB4IHNvbGlkIHRyYW5zcGFyZW50OyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLXRvcCxcXG4uanNQYW5lbC1jb25uZWN0b3ItdG9wbGVmdCxcXG4uanNQYW5lbC1jb25uZWN0b3ItdG9wcmlnaHQge1xcbiAgdG9wOiAxMDAlO1xcbiAgYm9yZGVyLWJvdHRvbS13aWR0aDogMDsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci10b3Age1xcbiAgbGVmdDogY2FsYyg1MCUgLSAxMnB4KTsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci10b3BsZWZ0IHtcXG4gIGxlZnQ6IDBweDsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci10b3ByaWdodCB7XFxuICBsZWZ0OiBjYWxjKDEwMCUgLSAyNHB4KTsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci1ib3R0b20sXFxuLmpzUGFuZWwtY29ubmVjdG9yLWJvdHRvbWxlZnQsXFxuLmpzUGFuZWwtY29ubmVjdG9yLWJvdHRvbXJpZ2h0IHtcXG4gIHRvcDogLTEycHg7XFxuICBib3JkZXItdG9wLXdpZHRoOiAwOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWJvdHRvbSB7XFxuICBsZWZ0OiBjYWxjKDUwJSAtIDEycHgpOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWJvdHRvbWxlZnQge1xcbiAgbGVmdDogMHB4OyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWJvdHRvbXJpZ2h0IHtcXG4gIGxlZnQ6IGNhbGMoMTAwJSAtIDI0cHgpOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnQsXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnR0b3AsXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnRib3R0b20ge1xcbiAgbGVmdDogMTAwJTtcXG4gIGJvcmRlci1yaWdodC13aWR0aDogMDsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci1sZWZ0IHtcXG4gIHRvcDogY2FsYyg1MCUgLSAxMnB4KTsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci1sZWZ0dG9wIHtcXG4gIHRvcDogMHB4OyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLWxlZnRib3R0b20ge1xcbiAgdG9wOiBjYWxjKDEwMCUgLSAyNHB4KTsgfVxcblxcbi5qc1BhbmVsLWNvbm5lY3Rvci1yaWdodCxcXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHR0b3AsXFxuLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0Ym90dG9tIHtcXG4gIGxlZnQ6IC0xMnB4O1xcbiAgYm9yZGVyLWxlZnQtd2lkdGg6IDA7IH1cXG5cXG4uanNQYW5lbC1jb25uZWN0b3ItcmlnaHQge1xcbiAgdG9wOiBjYWxjKDUwJSAtIDEycHgpOyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0dG9wIHtcXG4gIHRvcDogMHB4OyB9XFxuXFxuLmpzUGFuZWwtY29ubmVjdG9yLXJpZ2h0Ym90dG9tIHtcXG4gIHRvcDogY2FsYygxMDAlIC0gMjRweCk7IH1cXG5cXG4vKiBJRTExIENTUyBzdHlsZXMgZ28gaGVyZSAqL1xcbkBtZWRpYSBhbGwgYW5kICgtbXMtaGlnaC1jb250cmFzdDogbm9uZSksICgtbXMtaGlnaC1jb250cmFzdDogYWN0aXZlKSB7XFxuICAjanNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXIgLmpzUGFuZWwtcmVwbGFjZW1lbnQgLmpzUGFuZWwtdGl0bGViYXIge1xcbiAgICBtYXgtd2lkdGg6IDEwNXB4OyB9IH1cXG5cXG4vKiBYWFhYWFhYWFhYWFhYWFhYWFhYWFhYWCAqL1xcbi8qIGJvb3RzdHJhcCBhZGp1c3RtZW50cyAqL1xcbi5qc1BhbmVsLnBhbmVsLWRlZmF1bHQsIC5qc1BhbmVsLnBhbmVsLXByaW1hcnksIC5qc1BhbmVsLnBhbmVsLWluZm8sIC5qc1BhbmVsLnBhbmVsLXN1Y2Nlc3MsIC5qc1BhbmVsLnBhbmVsLXdhcm5pbmcsIC5qc1BhbmVsLnBhbmVsLWRhbmdlciwgLmpzUGFuZWwuY2FyZC5jYXJkLWludmVyc2Uge1xcbiAgYm94LXNoYWRvdzogMCAwIDZweCByZ2JhKDAsIDMzLCA1MCwgMC4xKSwgMCA3cHggMjVweCByZ2JhKDE3LCAzOCwgNjAsIDAuNCk7IH1cXG5cXG4uanNQYW5lbC5wYW5lbCB7XFxuICBtYXJnaW46IDA7IH1cXG5cXG4uanNQYW5lbC1oZHIucGFuZWwtaGVhZGluZyB7XFxuICBib3JkZXItYm90dG9tOiBub25lO1xcbiAgcGFkZGluZzogMDsgfVxcblxcbi5qc1BhbmVsLXRpdGxlLnBhbmVsLXRpdGxlIC5zbWFsbCwgLmpzUGFuZWwtdGl0bGUucGFuZWwtdGl0bGUgc21hbGwge1xcbiAgZm9udC1zaXplOiA3NSU7IH1cXG5cXG4vKiBib290c3RyYXAgNCBhZGp1c3RtZW50cyAqL1xcbi5qc1BhbmVsLmNhcmQuY2FyZC1pbnZlcnNlIHtcXG4gIGJveC1zaGFkb3c6IDAgMCA2cHggcmdiYSgwLCAzMywgNTAsIDAuMSksIDAgN3B4IDI1cHggcmdiYSgxNywgMzgsIDYwLCAwLjQpOyB9XFxuXFxuLmNhcmQtZGVmYXVsdCB7XFxuICBiYWNrZ3JvdW5kOiAjZjVmNWY1OyB9XFxuXFxuLmNhcmQtcHJpbWFyeSA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCxcXG4uY2FyZC1zdWNjZXNzID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkLFxcbi5jYXJkLWluZm8gPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQsXFxuLmNhcmQtd2FybmluZyA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCxcXG4uY2FyZC1kYW5nZXIgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogI2Y1ZjVmNTsgfVxcblxcbi5jYXJkLWRlZmF1bHQgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi8qIGNzczMgYW5pbWF0aW9ucyAqL1xcbkBrZXlmcmFtZXMganNQYW5lbEZhZGVJbiB7XFxuICBmcm9tIHtcXG4gICAgb3BhY2l0eTogMDsgfVxcbiAgdG8ge1xcbiAgICBvcGFjaXR5OiAxOyB9IH1cXG5cXG4uanNQYW5lbEZhZGVJbiB7XFxuICBvcGFjaXR5OiAwO1xcbiAgYW5pbWF0aW9uOiBqc1BhbmVsRmFkZUluIGVhc2UtaW4gMTtcXG4gIGFuaW1hdGlvbi1maWxsLW1vZGU6IGZvcndhcmRzO1xcbiAgYW5pbWF0aW9uLWR1cmF0aW9uOiA2MDBtczsgfVxcblxcbkBrZXlmcmFtZXMganNQYW5lbEZhZGVPdXQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDE7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLmpzUGFuZWxGYWRlT3V0IHtcXG4gIGFuaW1hdGlvbjoganNQYW5lbEZhZGVPdXQgZWFzZS1pbiAxO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDYwMG1zOyB9XFxuXFxuQGtleWZyYW1lcyBtb2RhbEJhY2tkcm9wRmFkZUluIHtcXG4gIGZyb20ge1xcbiAgICBvcGFjaXR5OiAwOyB9XFxuICB0byB7XFxuICAgIG9wYWNpdHk6IDAuNjU7IH0gfVxcblxcbi5qc1BhbmVsLW1vZGFsLWJhY2tkcm9wIHtcXG4gIGFuaW1hdGlvbjogbW9kYWxCYWNrZHJvcEZhZGVJbiBlYXNlLWluIDE7XFxuICBhbmltYXRpb24tZmlsbC1tb2RlOiBmb3J3YXJkcztcXG4gIGFuaW1hdGlvbi1kdXJhdGlvbjogNzUwbXM7XFxuICBiYWNrZ3JvdW5kOiBibGFjaztcXG4gIHBvc2l0aW9uOiBmaXhlZDtcXG4gIHRvcDogMDtcXG4gIGxlZnQ6IDA7XFxuICB3aWR0aDogMTAwJTtcXG4gIGhlaWdodDogMTAwJTsgfVxcblxcbkBrZXlmcmFtZXMgbW9kYWxCYWNrZHJvcEZhZGVPdXQge1xcbiAgZnJvbSB7XFxuICAgIG9wYWNpdHk6IDAuNjU7IH1cXG4gIHRvIHtcXG4gICAgb3BhY2l0eTogMDsgfSB9XFxuXFxuLmpzUGFuZWwtbW9kYWwtYmFja2Ryb3Atb3V0IHtcXG4gIGFuaW1hdGlvbjogbW9kYWxCYWNrZHJvcEZhZGVPdXQgZWFzZS1pbiAxO1xcbiAgYW5pbWF0aW9uLWZpbGwtbW9kZTogZm9yd2FyZHM7XFxuICBhbmltYXRpb24tZHVyYXRpb246IDQwMG1zOyB9XFxuXFxuLmpzUGFuZWwtbW9kYWwtYmFja2Ryb3AtbXVsdGkge1xcbiAgYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjE1KTsgfVxcblxcbi5qc1BhbmVsLWNvbnRlbnQgLmpzUGFuZWwtaWZyYW1lLW92ZXJsYXkge1xcbiAgcG9zaXRpb246IGFic29sdXRlO1xcbiAgdG9wOiAwO1xcbiAgd2lkdGg6IDEwMCU7XFxuICBoZWlnaHQ6IDEwMCU7XFxuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDsgfVxcblxcbi8qIF90aGVtZXMuc2FzczogMjAxNy0wNy0xMiAxOToxNiAqL1xcbi8qIGRlZmF1bHQgLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcXG4gIGJvcmRlci1jb2xvcjogI2NmZDhkYzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM5MGE0YWU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kZWZhdWx0ID4gLmpzUGFuZWwtY29udGVudCB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzkwYTRhZTsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRlZmF1bHQgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2NmZDhkYztcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjOTBhNGFlOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtZGVmYXVsdCA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNlY2VmZjE7IH1cXG5cXG4vKiBwcmltYXJ5IC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0gKi9cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XFxuICBib3JkZXItY29sb3I6ICMyMTk2ZjM7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtaGRyICoge1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtaGRyIC5qc1BhbmVsLWhkci10b29sYmFyIHtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNDJhNWY1OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSA+IC5qc1BhbmVsLWNvbnRlbnQge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0MmE1ZjU7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1wcmltYXJ5ID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICMyMTk2ZjM7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzQyYTVmNTtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtcHJpbWFyeSA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNiYmRlZmI7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi8qIGluZm8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLSAqL1xcbi5qc1BhbmVsLXRoZW1lLWluZm8ge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI5YjZmNjtcXG4gIGJvcmRlci1jb2xvcjogIzI5YjZmNjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1oZHIgLmpzUGFuZWwtaGRyLXRvb2xiYXIge1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICM0ZmMzZjc7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1pbmZvID4gLmpzUGFuZWwtY29udGVudCB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzRmYzNmNzsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWluZm8gPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI5YjZmNjtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjNGZjM2Y3O1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1pbmZvID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UxZjVmZTtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogc3VjY2VzcyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjNGNhZjUwO1xcbiAgYm9yZGVyLWNvbG9yOiAjNGNhZjUwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjZmZmZmZmOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtc3VjY2VzcyA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgIzgxYzc4NDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXN1Y2Nlc3MgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogIzRjYWY1MDtcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjODFjNzg0O1xcbiAgY29sb3I6ICNmZmZmZmY7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1zdWNjZXNzID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2U4ZjVlOTtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogd2FybmluZyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZjMTA3O1xcbiAgYm9yZGVyLWNvbG9yOiAjZmZjMTA3OyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyA+IC5qc1BhbmVsLWhkciAqIHtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLmpzUGFuZWwtdGhlbWUtd2FybmluZyA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmZDU0ZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLXdhcm5pbmcgPiAuanNQYW5lbC1jb250ZW50LmpzUGFuZWwtY29udGVudC1maWxsZWQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmYzEwNztcXG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjZmZkNTRmO1xcbiAgY29sb3I6ICMwMDAwMDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS13YXJuaW5nID4gLmpzUGFuZWwtY29udGVudC5qc1BhbmVsLWNvbnRlbnQtZmlsbGVkbGlnaHQge1xcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZjNlMDtcXG4gIGNvbG9yOiAjMDAwMDAwOyB9XFxuXFxuLyogZGFuZ2VyIC0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tICovXFxuLmpzUGFuZWwtdGhlbWUtZGFuZ2VyIHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjNkMDA7XFxuICBib3JkZXItY29sb3I6ICNmZjNkMDA7IH1cXG5cXG4uanNQYW5lbC10aGVtZS1kYW5nZXIgPiAuanNQYW5lbC1oZHIgKiB7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWhkciAuanNQYW5lbC1oZHItdG9vbGJhciB7XFxuICBib3JkZXItdG9wOiAxcHggc29saWQgI2ZmNmU0MDsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZCB7XFxuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmYzZDAwO1xcbiAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNmZjZlNDA7XFxuICBjb2xvcjogI2ZmZmZmZjsgfVxcblxcbi5qc1BhbmVsLXRoZW1lLWRhbmdlciA+IC5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0IHtcXG4gIGJhY2tncm91bmQtY29sb3I6ICNmZjllODA7XFxuICBjb2xvcjogIzAwMDAwMDsgfVxcblxcbi5qc1BhbmVsLWNvbnRlbnQuanNQYW5lbC1jb250ZW50LW5vaGVhZGVyIHtcXG4gIGJvcmRlcjogbm9uZSAhaW1wb3J0YW50OyB9XFxuXFxuYm9keSB7XFxuICAtbXMtb3ZlcmZsb3ctc3R5bGU6IHNjcm9sbGJhcjsgfVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsImV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9saWIvY3NzLWJhc2UuanNcIikoZmFsc2UpO1xuLy8gaW1wb3J0c1xuXG5cbi8vIG1vZHVsZVxuZXhwb3J0cy5wdXNoKFttb2R1bGUuaWQsIFwiI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCB7XFxuICAgIGRpc3BsYXk6ZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246Y29sdW1uO1xcbiAgICB3aWR0aDoxMDAlO1xcbiAgICBoZWlnaHQ6MTAwJTtcXG4gICAgYWxpZ24taXRlbXM6Y2VudGVyO1xcbiAgICBjb2xvcjogIzAwMDtcXG59XFxuXFxuI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCBpbnB1dCxzZWxlY3QsdGV4dGFyZWEge1xcbiAgICBjb2xvcjogIzAwMDtcXG4gICAgYmFja2dyb3VuZDogI2ZmZjtcXG59XFxuXFxuI2J1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbCAjYnV0dHBsdWdkZXZ0b29sc2xvZ3RleHRhcmVhIHtcXG4gICAgZm9udC1zaXplOiA4cHQ7XFxuICAgIHdpZHRoOjEwMCU7XFxuICAgIGZsZXg6MSAxO1xcbiAgICBwYWRkaW5nOjVweDtcXG4gICAgYm94LXNpemluZzpib3JkZXItYm94O1xcbn1cXG4jYnV0dHBsdWdkZXZ0b29sc2xvZ3BhbmVsICNidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWwge1xcbiAgICB3aWR0aDo5OCU7XFxuICAgIGZsZXg6bm9uZTtcXG4gICAgcGFkZGluZzo1cHg7XFxuICAgIGJveC1zaXppbmc6Ym9yZGVyLWJveDtcXG59XFxuXCIsIFwiXCJdKTtcblxuLy8gZXhwb3J0c1xuIiwiZXhwb3J0cyA9IG1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2xpYi9jc3MtYmFzZS5qc1wiKShmYWxzZSk7XG4vLyBpbXBvcnRzXG5cblxuLy8gbW9kdWxlXG5leHBvcnRzLnB1c2goW21vZHVsZS5pZCwgXCJidXR0cGx1Zy1kZXZ0b29scy1tYWluIHtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBzZWN0aW9uIHtcXG4gICAgZGlzcGxheTogbm9uZTtcXG4gICAgcGFkZGluZzogMjBweDtcXG4gICAgYm9yZGVyLXRvcDogMXB4IHNvbGlkICNkZGQ7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gaW5wdXQge1xcbiAgICBkaXNwbGF5OiBub25lO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluIGxhYmVsIHtcXG4gICAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xcbiAgICBtYXJnaW46IDAgMCAtMXB4O1xcbiAgICBwYWRkaW5nOiA1cHggMTBweDtcXG4gICAgZm9udC13ZWlnaHQ6IDYwMDtcXG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xcbiAgICBjb2xvcjogI2JiYjtcXG4gICAgYm9yZGVyOiAxcHggc29saWQgdHJhbnNwYXJlbnQ7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gbGFiZWw6YmVmb3JlIHtcXG4gICAgZm9udC1mYW1pbHk6IGZvbnRhd2Vzb21lO1xcbiAgICBmb250LXdlaWdodDogbm9ybWFsO1xcbiAgICBtYXJnaW4tcmlnaHQ6IDEwcHg7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gbGFiZWw6aG92ZXIge1xcbiAgICBjb2xvcjogIzg4ODtcXG4gICAgY3Vyc29yOiBwb2ludGVyO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluIGlucHV0OmNoZWNrZWQgKyBsYWJlbCB7XFxuICAgIGNvbG9yOiAjNTU1O1xcbiAgICBib3JkZXI6IDFweCBzb2xpZCAjZGRkO1xcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgb3JhbmdlO1xcbiAgICBib3JkZXItYm90dG9tOiAxcHggc29saWQgI2ZmZjtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAjdGFiMTpjaGVja2VkIH4gI2NvbnRlbnQxLFxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gI3RhYjI6Y2hlY2tlZCB+ICNjb250ZW50MixcXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluICN0YWIzOmNoZWNrZWQgfiAjY29udGVudDMsXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAjdGFiNDpjaGVja2VkIH4gI2NvbnRlbnQ0IHtcXG4gICAgZGlzcGxheTogYmxvY2s7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gI2NvbnRlbnQxIHtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluICNjb250ZW50MiB7XFxuICAgIGhlaWdodDogMTAwJTtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAjc2ltdWxhdG9yIHtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogY2FsYygxMDAlIC0gNjBweCk7XFxuICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gLmZsZXNobGlnaHQtc2ltIHtcXG4gICAgZmxleDogMTtcXG4gICAgZGlzcGxheTogZmxleDtcXG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcXG4gICAgd2lkdGg6IDEwMCU7XFxuICAgIGhlaWdodDogMTAwJTtcXG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcXG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gZGl2LmMtZmxlc2hsaWdodCB7XFxuICAgIGRpc3BsYXk6IGZsZXg7XFxuICAgIGZsZXg6IDE7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gZGl2LmMtZmxlc2hsaWdodCBpbWcge1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxuICAgIHdpZHRoOiBhdXRvO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtbW96LWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtby1jcmlzcC1lZGdlcztcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogLXdlYmtpdC1vcHRpbWl6ZS1jb250cmFzdDtcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluIGRpdi5jLWZsZXNobGlnaHQgLm8tZmxlc2hsaWdodCB7XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaGVpZ2h0OiA3NyU7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gLnZpYnJhdG9yLXNpbXVsYXRvci1jb21wb25lbnQge1xcbiAgICBmbGV4OiAxO1xcbiAgICBkaXNwbGF5OiBmbGV4O1xcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xcbiAgICB3aWR0aDogMTAwJTtcXG4gICAgaGVpZ2h0OiAxMDAlO1xcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiBkaXYudmlicmF0b3Ige1xcbiAgICBmbGV4OiAxIDE7XFxuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XFxufVxcblxcbmJ1dHRwbHVnLWRldnRvb2xzLW1haW4gZGl2LnZpYnJhdG9yLXNpbXVsYXRvci1jb21wb25lbnQgaW1nIHtcXG4gICAgaGVpZ2h0OiBjYWxjKDEwMCUgLSA0MHB4KTtcXG4gICAgd2lkdGg6IGF1dG87XFxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcXG4gICAgaW1hZ2UtcmVuZGVyaW5nOiAtbW96LWNyaXNwLWVkZ2VzO1xcblxcdCAgaW1hZ2UtcmVuZGVyaW5nOiAtby1jcmlzcC1lZGdlcztcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogLXdlYmtpdC1vcHRpbWl6ZS1jb250cmFzdDtcXG5cXHQgIGltYWdlLXJlbmRlcmluZzogcGl4ZWxhdGVkO1xcbn1cXG5cXG5idXR0cGx1Zy1kZXZ0b29scy1tYWluIGRpdi52aWJyYXRvci1pbmZvIHtcXG4gICAgZmxleDogMDtcXG59XFxuXFxuYnV0dHBsdWctZGV2dG9vbHMtbWFpbiAuc2ltdWxhdG9yLWRpdmlkZXIge1xcbiAgICBib3JkZXItbGVmdDogMXB4ICMwMDAgZGFzaGVkO1xcbiAgICBoZWlnaHQ6IDEwMCU7XFxufVxcblwiLCBcIlwiXSk7XG5cbi8vIGV4cG9ydHNcbiIsIi8qXG5cdE1JVCBMaWNlbnNlIGh0dHA6Ly93d3cub3BlbnNvdXJjZS5vcmcvbGljZW5zZXMvbWl0LWxpY2Vuc2UucGhwXG5cdEF1dGhvciBUb2JpYXMgS29wcGVycyBAc29rcmFcbiovXG4vLyBjc3MgYmFzZSBjb2RlLCBpbmplY3RlZCBieSB0aGUgY3NzLWxvYWRlclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbih1c2VTb3VyY2VNYXApIHtcblx0dmFyIGxpc3QgPSBbXTtcblxuXHQvLyByZXR1cm4gdGhlIGxpc3Qgb2YgbW9kdWxlcyBhcyBjc3Mgc3RyaW5nXG5cdGxpc3QudG9TdHJpbmcgPSBmdW5jdGlvbiB0b1N0cmluZygpIHtcblx0XHRyZXR1cm4gdGhpcy5tYXAoZnVuY3Rpb24gKGl0ZW0pIHtcblx0XHRcdHZhciBjb250ZW50ID0gY3NzV2l0aE1hcHBpbmdUb1N0cmluZyhpdGVtLCB1c2VTb3VyY2VNYXApO1xuXHRcdFx0aWYoaXRlbVsyXSkge1xuXHRcdFx0XHRyZXR1cm4gXCJAbWVkaWEgXCIgKyBpdGVtWzJdICsgXCJ7XCIgKyBjb250ZW50ICsgXCJ9XCI7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRyZXR1cm4gY29udGVudDtcblx0XHRcdH1cblx0XHR9KS5qb2luKFwiXCIpO1xuXHR9O1xuXG5cdC8vIGltcG9ydCBhIGxpc3Qgb2YgbW9kdWxlcyBpbnRvIHRoZSBsaXN0XG5cdGxpc3QuaSA9IGZ1bmN0aW9uKG1vZHVsZXMsIG1lZGlhUXVlcnkpIHtcblx0XHRpZih0eXBlb2YgbW9kdWxlcyA9PT0gXCJzdHJpbmdcIilcblx0XHRcdG1vZHVsZXMgPSBbW251bGwsIG1vZHVsZXMsIFwiXCJdXTtcblx0XHR2YXIgYWxyZWFkeUltcG9ydGVkTW9kdWxlcyA9IHt9O1xuXHRcdGZvcih2YXIgaSA9IDA7IGkgPCB0aGlzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaWQgPSB0aGlzW2ldWzBdO1xuXHRcdFx0aWYodHlwZW9mIGlkID09PSBcIm51bWJlclwiKVxuXHRcdFx0XHRhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2lkXSA9IHRydWU7XG5cdFx0fVxuXHRcdGZvcihpID0gMDsgaSA8IG1vZHVsZXMubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBpdGVtID0gbW9kdWxlc1tpXTtcblx0XHRcdC8vIHNraXAgYWxyZWFkeSBpbXBvcnRlZCBtb2R1bGVcblx0XHRcdC8vIHRoaXMgaW1wbGVtZW50YXRpb24gaXMgbm90IDEwMCUgcGVyZmVjdCBmb3Igd2VpcmQgbWVkaWEgcXVlcnkgY29tYmluYXRpb25zXG5cdFx0XHQvLyAgd2hlbiBhIG1vZHVsZSBpcyBpbXBvcnRlZCBtdWx0aXBsZSB0aW1lcyB3aXRoIGRpZmZlcmVudCBtZWRpYSBxdWVyaWVzLlxuXHRcdFx0Ly8gIEkgaG9wZSB0aGlzIHdpbGwgbmV2ZXIgb2NjdXIgKEhleSB0aGlzIHdheSB3ZSBoYXZlIHNtYWxsZXIgYnVuZGxlcylcblx0XHRcdGlmKHR5cGVvZiBpdGVtWzBdICE9PSBcIm51bWJlclwiIHx8ICFhbHJlYWR5SW1wb3J0ZWRNb2R1bGVzW2l0ZW1bMF1dKSB7XG5cdFx0XHRcdGlmKG1lZGlhUXVlcnkgJiYgIWl0ZW1bMl0pIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gbWVkaWFRdWVyeTtcblx0XHRcdFx0fSBlbHNlIGlmKG1lZGlhUXVlcnkpIHtcblx0XHRcdFx0XHRpdGVtWzJdID0gXCIoXCIgKyBpdGVtWzJdICsgXCIpIGFuZCAoXCIgKyBtZWRpYVF1ZXJ5ICsgXCIpXCI7XG5cdFx0XHRcdH1cblx0XHRcdFx0bGlzdC5wdXNoKGl0ZW0pO1xuXHRcdFx0fVxuXHRcdH1cblx0fTtcblx0cmV0dXJuIGxpc3Q7XG59O1xuXG5mdW5jdGlvbiBjc3NXaXRoTWFwcGluZ1RvU3RyaW5nKGl0ZW0sIHVzZVNvdXJjZU1hcCkge1xuXHR2YXIgY29udGVudCA9IGl0ZW1bMV0gfHwgJyc7XG5cdHZhciBjc3NNYXBwaW5nID0gaXRlbVszXTtcblx0aWYgKCFjc3NNYXBwaW5nKSB7XG5cdFx0cmV0dXJuIGNvbnRlbnQ7XG5cdH1cblxuXHRpZiAodXNlU291cmNlTWFwICYmIHR5cGVvZiBidG9hID09PSAnZnVuY3Rpb24nKSB7XG5cdFx0dmFyIHNvdXJjZU1hcHBpbmcgPSB0b0NvbW1lbnQoY3NzTWFwcGluZyk7XG5cdFx0dmFyIHNvdXJjZVVSTHMgPSBjc3NNYXBwaW5nLnNvdXJjZXMubWFwKGZ1bmN0aW9uIChzb3VyY2UpIHtcblx0XHRcdHJldHVybiAnLyojIHNvdXJjZVVSTD0nICsgY3NzTWFwcGluZy5zb3VyY2VSb290ICsgc291cmNlICsgJyAqLydcblx0XHR9KTtcblxuXHRcdHJldHVybiBbY29udGVudF0uY29uY2F0KHNvdXJjZVVSTHMpLmNvbmNhdChbc291cmNlTWFwcGluZ10pLmpvaW4oJ1xcbicpO1xuXHR9XG5cblx0cmV0dXJuIFtjb250ZW50XS5qb2luKCdcXG4nKTtcbn1cblxuLy8gQWRhcHRlZCBmcm9tIGNvbnZlcnQtc291cmNlLW1hcCAoTUlUKVxuZnVuY3Rpb24gdG9Db21tZW50KHNvdXJjZU1hcCkge1xuXHQvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcblx0dmFyIGJhc2U2NCA9IGJ0b2EodW5lc2NhcGUoZW5jb2RlVVJJQ29tcG9uZW50KEpTT04uc3RyaW5naWZ5KHNvdXJjZU1hcCkpKSk7XG5cdHZhciBkYXRhID0gJ3NvdXJjZU1hcHBpbmdVUkw9ZGF0YTphcHBsaWNhdGlvbi9qc29uO2NoYXJzZXQ9dXRmLTg7YmFzZTY0LCcgKyBiYXNlNjQ7XG5cblx0cmV0dXJuICcvKiMgJyArIGRhdGEgKyAnICovJztcbn1cbiIsIi8vIENvcHlyaWdodCBKb3llbnQsIEluYy4gYW5kIG90aGVyIE5vZGUgY29udHJpYnV0b3JzLlxuLy9cbi8vIFBlcm1pc3Npb24gaXMgaGVyZWJ5IGdyYW50ZWQsIGZyZWUgb2YgY2hhcmdlLCB0byBhbnkgcGVyc29uIG9idGFpbmluZyBhXG4vLyBjb3B5IG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZG9jdW1lbnRhdGlvbiBmaWxlcyAodGhlXG4vLyBcIlNvZnR3YXJlXCIpLCB0byBkZWFsIGluIHRoZSBTb2Z0d2FyZSB3aXRob3V0IHJlc3RyaWN0aW9uLCBpbmNsdWRpbmdcbi8vIHdpdGhvdXQgbGltaXRhdGlvbiB0aGUgcmlnaHRzIHRvIHVzZSwgY29weSwgbW9kaWZ5LCBtZXJnZSwgcHVibGlzaCxcbi8vIGRpc3RyaWJ1dGUsIHN1YmxpY2Vuc2UsIGFuZC9vciBzZWxsIGNvcGllcyBvZiB0aGUgU29mdHdhcmUsIGFuZCB0byBwZXJtaXRcbi8vIHBlcnNvbnMgdG8gd2hvbSB0aGUgU29mdHdhcmUgaXMgZnVybmlzaGVkIHRvIGRvIHNvLCBzdWJqZWN0IHRvIHRoZVxuLy8gZm9sbG93aW5nIGNvbmRpdGlvbnM6XG4vL1xuLy8gVGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UgYW5kIHRoaXMgcGVybWlzc2lvbiBub3RpY2Ugc2hhbGwgYmUgaW5jbHVkZWRcbi8vIGluIGFsbCBjb3BpZXMgb3Igc3Vic3RhbnRpYWwgcG9ydGlvbnMgb2YgdGhlIFNvZnR3YXJlLlxuLy9cbi8vIFRIRSBTT0ZUV0FSRSBJUyBQUk9WSURFRCBcIkFTIElTXCIsIFdJVEhPVVQgV0FSUkFOVFkgT0YgQU5ZIEtJTkQsIEVYUFJFU1Ncbi8vIE9SIElNUExJRUQsIElOQ0xVRElORyBCVVQgTk9UIExJTUlURUQgVE8gVEhFIFdBUlJBTlRJRVMgT0Zcbi8vIE1FUkNIQU5UQUJJTElUWSwgRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU5cbi8vIE5PIEVWRU5UIFNIQUxMIFRIRSBBVVRIT1JTIE9SIENPUFlSSUdIVCBIT0xERVJTIEJFIExJQUJMRSBGT1IgQU5ZIENMQUlNLFxuLy8gREFNQUdFUyBPUiBPVEhFUiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQU4gQUNUSU9OIE9GIENPTlRSQUNULCBUT1JUIE9SXG4vLyBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSwgT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFXG4vLyBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU4gVEhFIFNPRlRXQVJFLlxuXG5mdW5jdGlvbiBFdmVudEVtaXR0ZXIoKSB7XG4gIHRoaXMuX2V2ZW50cyA9IHRoaXMuX2V2ZW50cyB8fCB7fTtcbiAgdGhpcy5fbWF4TGlzdGVuZXJzID0gdGhpcy5fbWF4TGlzdGVuZXJzIHx8IHVuZGVmaW5lZDtcbn1cbm1vZHVsZS5leHBvcnRzID0gRXZlbnRFbWl0dGVyO1xuXG4vLyBCYWNrd2FyZHMtY29tcGF0IHdpdGggbm9kZSAwLjEwLnhcbkV2ZW50RW1pdHRlci5FdmVudEVtaXR0ZXIgPSBFdmVudEVtaXR0ZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX2V2ZW50cyA9IHVuZGVmaW5lZDtcbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuX21heExpc3RlbmVycyA9IHVuZGVmaW5lZDtcblxuLy8gQnkgZGVmYXVsdCBFdmVudEVtaXR0ZXJzIHdpbGwgcHJpbnQgYSB3YXJuaW5nIGlmIG1vcmUgdGhhbiAxMCBsaXN0ZW5lcnMgYXJlXG4vLyBhZGRlZCB0byBpdC4gVGhpcyBpcyBhIHVzZWZ1bCBkZWZhdWx0IHdoaWNoIGhlbHBzIGZpbmRpbmcgbWVtb3J5IGxlYWtzLlxuRXZlbnRFbWl0dGVyLmRlZmF1bHRNYXhMaXN0ZW5lcnMgPSAxMDtcblxuLy8gT2J2aW91c2x5IG5vdCBhbGwgRW1pdHRlcnMgc2hvdWxkIGJlIGxpbWl0ZWQgdG8gMTAuIFRoaXMgZnVuY3Rpb24gYWxsb3dzXG4vLyB0aGF0IHRvIGJlIGluY3JlYXNlZC4gU2V0IHRvIHplcm8gZm9yIHVubGltaXRlZC5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUuc2V0TWF4TGlzdGVuZXJzID0gZnVuY3Rpb24obikge1xuICBpZiAoIWlzTnVtYmVyKG4pIHx8IG4gPCAwIHx8IGlzTmFOKG4pKVxuICAgIHRocm93IFR5cGVFcnJvcignbiBtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyJyk7XG4gIHRoaXMuX21heExpc3RlbmVycyA9IG47XG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5lbWl0ID0gZnVuY3Rpb24odHlwZSkge1xuICB2YXIgZXIsIGhhbmRsZXIsIGxlbiwgYXJncywgaSwgbGlzdGVuZXJzO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzKVxuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuXG4gIC8vIElmIHRoZXJlIGlzIG5vICdlcnJvcicgZXZlbnQgbGlzdGVuZXIgdGhlbiB0aHJvdy5cbiAgaWYgKHR5cGUgPT09ICdlcnJvcicpIHtcbiAgICBpZiAoIXRoaXMuX2V2ZW50cy5lcnJvciB8fFxuICAgICAgICAoaXNPYmplY3QodGhpcy5fZXZlbnRzLmVycm9yKSAmJiAhdGhpcy5fZXZlbnRzLmVycm9yLmxlbmd0aCkpIHtcbiAgICAgIGVyID0gYXJndW1lbnRzWzFdO1xuICAgICAgaWYgKGVyIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgdGhyb3cgZXI7IC8vIFVuaGFuZGxlZCAnZXJyb3InIGV2ZW50XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBBdCBsZWFzdCBnaXZlIHNvbWUga2luZCBvZiBjb250ZXh0IHRvIHRoZSB1c2VyXG4gICAgICAgIHZhciBlcnIgPSBuZXcgRXJyb3IoJ1VuY2F1Z2h0LCB1bnNwZWNpZmllZCBcImVycm9yXCIgZXZlbnQuICgnICsgZXIgKyAnKScpO1xuICAgICAgICBlcnIuY29udGV4dCA9IGVyO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaGFuZGxlciA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcblxuICBpZiAoaXNVbmRlZmluZWQoaGFuZGxlcikpXG4gICAgcmV0dXJuIGZhbHNlO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGhhbmRsZXIpKSB7XG4gICAgc3dpdGNoIChhcmd1bWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBmYXN0IGNhc2VzXG4gICAgICBjYXNlIDE6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIDI6XG4gICAgICAgIGhhbmRsZXIuY2FsbCh0aGlzLCBhcmd1bWVudHNbMV0pO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgMzpcbiAgICAgICAgaGFuZGxlci5jYWxsKHRoaXMsIGFyZ3VtZW50c1sxXSwgYXJndW1lbnRzWzJdKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICAvLyBzbG93ZXJcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgICAgICBoYW5kbGVyLmFwcGx5KHRoaXMsIGFyZ3MpO1xuICAgIH1cbiAgfSBlbHNlIGlmIChpc09iamVjdChoYW5kbGVyKSkge1xuICAgIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMsIDEpO1xuICAgIGxpc3RlbmVycyA9IGhhbmRsZXIuc2xpY2UoKTtcbiAgICBsZW4gPSBsaXN0ZW5lcnMubGVuZ3RoO1xuICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKylcbiAgICAgIGxpc3RlbmVyc1tpXS5hcHBseSh0aGlzLCBhcmdzKTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5hZGRMaXN0ZW5lciA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIHZhciBtO1xuXG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICB0aGlzLl9ldmVudHMgPSB7fTtcblxuICAvLyBUbyBhdm9pZCByZWN1cnNpb24gaW4gdGhlIGNhc2UgdGhhdCB0eXBlID09PSBcIm5ld0xpc3RlbmVyXCIhIEJlZm9yZVxuICAvLyBhZGRpbmcgaXQgdG8gdGhlIGxpc3RlbmVycywgZmlyc3QgZW1pdCBcIm5ld0xpc3RlbmVyXCIuXG4gIGlmICh0aGlzLl9ldmVudHMubmV3TGlzdGVuZXIpXG4gICAgdGhpcy5lbWl0KCduZXdMaXN0ZW5lcicsIHR5cGUsXG4gICAgICAgICAgICAgIGlzRnVuY3Rpb24obGlzdGVuZXIubGlzdGVuZXIpID9cbiAgICAgICAgICAgICAgbGlzdGVuZXIubGlzdGVuZXIgOiBsaXN0ZW5lcik7XG5cbiAgaWYgKCF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgLy8gT3B0aW1pemUgdGhlIGNhc2Ugb2Ygb25lIGxpc3RlbmVyLiBEb24ndCBuZWVkIHRoZSBleHRyYSBhcnJheSBvYmplY3QuXG4gICAgdGhpcy5fZXZlbnRzW3R5cGVdID0gbGlzdGVuZXI7XG4gIGVsc2UgaWYgKGlzT2JqZWN0KHRoaXMuX2V2ZW50c1t0eXBlXSkpXG4gICAgLy8gSWYgd2UndmUgYWxyZWFkeSBnb3QgYW4gYXJyYXksIGp1c3QgYXBwZW5kLlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5wdXNoKGxpc3RlbmVyKTtcbiAgZWxzZVxuICAgIC8vIEFkZGluZyB0aGUgc2Vjb25kIGVsZW1lbnQsIG5lZWQgdG8gY2hhbmdlIHRvIGFycmF5LlxuICAgIHRoaXMuX2V2ZW50c1t0eXBlXSA9IFt0aGlzLl9ldmVudHNbdHlwZV0sIGxpc3RlbmVyXTtcblxuICAvLyBDaGVjayBmb3IgbGlzdGVuZXIgbGVha1xuICBpZiAoaXNPYmplY3QodGhpcy5fZXZlbnRzW3R5cGVdKSAmJiAhdGhpcy5fZXZlbnRzW3R5cGVdLndhcm5lZCkge1xuICAgIGlmICghaXNVbmRlZmluZWQodGhpcy5fbWF4TGlzdGVuZXJzKSkge1xuICAgICAgbSA9IHRoaXMuX21heExpc3RlbmVycztcbiAgICB9IGVsc2Uge1xuICAgICAgbSA9IEV2ZW50RW1pdHRlci5kZWZhdWx0TWF4TGlzdGVuZXJzO1xuICAgIH1cblxuICAgIGlmIChtICYmIG0gPiAwICYmIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGggPiBtKSB7XG4gICAgICB0aGlzLl9ldmVudHNbdHlwZV0ud2FybmVkID0gdHJ1ZTtcbiAgICAgIGNvbnNvbGUuZXJyb3IoJyhub2RlKSB3YXJuaW5nOiBwb3NzaWJsZSBFdmVudEVtaXR0ZXIgbWVtb3J5ICcgK1xuICAgICAgICAgICAgICAgICAgICAnbGVhayBkZXRlY3RlZC4gJWQgbGlzdGVuZXJzIGFkZGVkLiAnICtcbiAgICAgICAgICAgICAgICAgICAgJ1VzZSBlbWl0dGVyLnNldE1heExpc3RlbmVycygpIHRvIGluY3JlYXNlIGxpbWl0LicsXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuX2V2ZW50c1t0eXBlXS5sZW5ndGgpO1xuICAgICAgaWYgKHR5cGVvZiBjb25zb2xlLnRyYWNlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgIC8vIG5vdCBzdXBwb3J0ZWQgaW4gSUUgMTBcbiAgICAgICAgY29uc29sZS50cmFjZSgpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5vbiA9IEV2ZW50RW1pdHRlci5wcm90b3R5cGUuYWRkTGlzdGVuZXI7XG5cbkV2ZW50RW1pdHRlci5wcm90b3R5cGUub25jZSA9IGZ1bmN0aW9uKHR5cGUsIGxpc3RlbmVyKSB7XG4gIGlmICghaXNGdW5jdGlvbihsaXN0ZW5lcikpXG4gICAgdGhyb3cgVHlwZUVycm9yKCdsaXN0ZW5lciBtdXN0IGJlIGEgZnVuY3Rpb24nKTtcblxuICB2YXIgZmlyZWQgPSBmYWxzZTtcblxuICBmdW5jdGlvbiBnKCkge1xuICAgIHRoaXMucmVtb3ZlTGlzdGVuZXIodHlwZSwgZyk7XG5cbiAgICBpZiAoIWZpcmVkKSB7XG4gICAgICBmaXJlZCA9IHRydWU7XG4gICAgICBsaXN0ZW5lci5hcHBseSh0aGlzLCBhcmd1bWVudHMpO1xuICAgIH1cbiAgfVxuXG4gIGcubGlzdGVuZXIgPSBsaXN0ZW5lcjtcbiAgdGhpcy5vbih0eXBlLCBnKTtcblxuICByZXR1cm4gdGhpcztcbn07XG5cbi8vIGVtaXRzIGEgJ3JlbW92ZUxpc3RlbmVyJyBldmVudCBpZmYgdGhlIGxpc3RlbmVyIHdhcyByZW1vdmVkXG5FdmVudEVtaXR0ZXIucHJvdG90eXBlLnJlbW92ZUxpc3RlbmVyID0gZnVuY3Rpb24odHlwZSwgbGlzdGVuZXIpIHtcbiAgdmFyIGxpc3QsIHBvc2l0aW9uLCBsZW5ndGgsIGk7XG5cbiAgaWYgKCFpc0Z1bmN0aW9uKGxpc3RlbmVyKSlcbiAgICB0aHJvdyBUeXBlRXJyb3IoJ2xpc3RlbmVyIG11c3QgYmUgYSBmdW5jdGlvbicpO1xuXG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0dXJuIHRoaXM7XG5cbiAgbGlzdCA9IHRoaXMuX2V2ZW50c1t0eXBlXTtcbiAgbGVuZ3RoID0gbGlzdC5sZW5ndGg7XG4gIHBvc2l0aW9uID0gLTE7XG5cbiAgaWYgKGxpc3QgPT09IGxpc3RlbmVyIHx8XG4gICAgICAoaXNGdW5jdGlvbihsaXN0Lmxpc3RlbmVyKSAmJiBsaXN0Lmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIGlmICh0aGlzLl9ldmVudHMucmVtb3ZlTGlzdGVuZXIpXG4gICAgICB0aGlzLmVtaXQoJ3JlbW92ZUxpc3RlbmVyJywgdHlwZSwgbGlzdGVuZXIpO1xuXG4gIH0gZWxzZSBpZiAoaXNPYmplY3QobGlzdCkpIHtcbiAgICBmb3IgKGkgPSBsZW5ndGg7IGktLSA+IDA7KSB7XG4gICAgICBpZiAobGlzdFtpXSA9PT0gbGlzdGVuZXIgfHxcbiAgICAgICAgICAobGlzdFtpXS5saXN0ZW5lciAmJiBsaXN0W2ldLmxpc3RlbmVyID09PSBsaXN0ZW5lcikpIHtcbiAgICAgICAgcG9zaXRpb24gPSBpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAocG9zaXRpb24gPCAwKVxuICAgICAgcmV0dXJuIHRoaXM7XG5cbiAgICBpZiAobGlzdC5sZW5ndGggPT09IDEpIHtcbiAgICAgIGxpc3QubGVuZ3RoID0gMDtcbiAgICAgIGRlbGV0ZSB0aGlzLl9ldmVudHNbdHlwZV07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxpc3Quc3BsaWNlKHBvc2l0aW9uLCAxKTtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKVxuICAgICAgdGhpcy5lbWl0KCdyZW1vdmVMaXN0ZW5lcicsIHR5cGUsIGxpc3RlbmVyKTtcbiAgfVxuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5yZW1vdmVBbGxMaXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciBrZXksIGxpc3RlbmVycztcblxuICBpZiAoIXRoaXMuX2V2ZW50cylcbiAgICByZXR1cm4gdGhpcztcblxuICAvLyBub3QgbGlzdGVuaW5nIGZvciByZW1vdmVMaXN0ZW5lciwgbm8gbmVlZCB0byBlbWl0XG4gIGlmICghdGhpcy5fZXZlbnRzLnJlbW92ZUxpc3RlbmVyKSB7XG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPT09IDApXG4gICAgICB0aGlzLl9ldmVudHMgPSB7fTtcbiAgICBlbHNlIGlmICh0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgLy8gZW1pdCByZW1vdmVMaXN0ZW5lciBmb3IgYWxsIGxpc3RlbmVycyBvbiBhbGwgZXZlbnRzXG4gIGlmIChhcmd1bWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgZm9yIChrZXkgaW4gdGhpcy5fZXZlbnRzKSB7XG4gICAgICBpZiAoa2V5ID09PSAncmVtb3ZlTGlzdGVuZXInKSBjb250aW51ZTtcbiAgICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKGtleSk7XG4gICAgfVxuICAgIHRoaXMucmVtb3ZlQWxsTGlzdGVuZXJzKCdyZW1vdmVMaXN0ZW5lcicpO1xuICAgIHRoaXMuX2V2ZW50cyA9IHt9O1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgbGlzdGVuZXJzID0gdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIGlmIChpc0Z1bmN0aW9uKGxpc3RlbmVycykpIHtcbiAgICB0aGlzLnJlbW92ZUxpc3RlbmVyKHR5cGUsIGxpc3RlbmVycyk7XG4gIH0gZWxzZSBpZiAobGlzdGVuZXJzKSB7XG4gICAgLy8gTElGTyBvcmRlclxuICAgIHdoaWxlIChsaXN0ZW5lcnMubGVuZ3RoKVxuICAgICAgdGhpcy5yZW1vdmVMaXN0ZW5lcih0eXBlLCBsaXN0ZW5lcnNbbGlzdGVuZXJzLmxlbmd0aCAtIDFdKTtcbiAgfVxuICBkZWxldGUgdGhpcy5fZXZlbnRzW3R5cGVdO1xuXG4gIHJldHVybiB0aGlzO1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lcnMgPSBmdW5jdGlvbih0eXBlKSB7XG4gIHZhciByZXQ7XG4gIGlmICghdGhpcy5fZXZlbnRzIHx8ICF0aGlzLl9ldmVudHNbdHlwZV0pXG4gICAgcmV0ID0gW107XG4gIGVsc2UgaWYgKGlzRnVuY3Rpb24odGhpcy5fZXZlbnRzW3R5cGVdKSlcbiAgICByZXQgPSBbdGhpcy5fZXZlbnRzW3R5cGVdXTtcbiAgZWxzZVxuICAgIHJldCA9IHRoaXMuX2V2ZW50c1t0eXBlXS5zbGljZSgpO1xuICByZXR1cm4gcmV0O1xufTtcblxuRXZlbnRFbWl0dGVyLnByb3RvdHlwZS5saXN0ZW5lckNvdW50ID0gZnVuY3Rpb24odHlwZSkge1xuICBpZiAodGhpcy5fZXZlbnRzKSB7XG4gICAgdmFyIGV2bGlzdGVuZXIgPSB0aGlzLl9ldmVudHNbdHlwZV07XG5cbiAgICBpZiAoaXNGdW5jdGlvbihldmxpc3RlbmVyKSlcbiAgICAgIHJldHVybiAxO1xuICAgIGVsc2UgaWYgKGV2bGlzdGVuZXIpXG4gICAgICByZXR1cm4gZXZsaXN0ZW5lci5sZW5ndGg7XG4gIH1cbiAgcmV0dXJuIDA7XG59O1xuXG5FdmVudEVtaXR0ZXIubGlzdGVuZXJDb3VudCA9IGZ1bmN0aW9uKGVtaXR0ZXIsIHR5cGUpIHtcbiAgcmV0dXJuIGVtaXR0ZXIubGlzdGVuZXJDb3VudCh0eXBlKTtcbn07XG5cbmZ1bmN0aW9uIGlzRnVuY3Rpb24oYXJnKSB7XG4gIHJldHVybiB0eXBlb2YgYXJnID09PSAnZnVuY3Rpb24nO1xufVxuXG5mdW5jdGlvbiBpc051bWJlcihhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdudW1iZXInO1xufVxuXG5mdW5jdGlvbiBpc09iamVjdChhcmcpIHtcbiAgcmV0dXJuIHR5cGVvZiBhcmcgPT09ICdvYmplY3QnICYmIGFyZyAhPT0gbnVsbDtcbn1cblxuZnVuY3Rpb24gaXNVbmRlZmluZWQoYXJnKSB7XG4gIHJldHVybiBhcmcgPT09IHZvaWQgMDtcbn1cbiIsIlxudmFyIGNvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi9jc3MtbG9hZGVyL2luZGV4LmpzIS4vanNwYW5lbC5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uL3N0eWxlLWxvYWRlci9saWIvYWRkU3R5bGVzLmpzXCIpKGNvbnRlbnQsIG9wdGlvbnMpO1xuXG5pZihjb250ZW50LmxvY2FscykgbW9kdWxlLmV4cG9ydHMgPSBjb250ZW50LmxvY2FscztcblxuaWYobW9kdWxlLmhvdCkge1xuXHRtb2R1bGUuaG90LmFjY2VwdChcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2pzcGFuZWwuY3NzXCIsIGZ1bmN0aW9uKCkge1xuXHRcdHZhciBuZXdDb250ZW50ID0gcmVxdWlyZShcIiEhLi4vLi4vY3NzLWxvYWRlci9pbmRleC5qcyEuL2pzcGFuZWwuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwiXCJ1c2Ugc3RyaWN0XCI7dmFyIF90eXBlb2Y9XCJmdW5jdGlvblwiPT10eXBlb2YgU3ltYm9sJiZcInN5bWJvbFwiPT10eXBlb2YgU3ltYm9sLml0ZXJhdG9yP2Z1bmN0aW9uKGUpe3JldHVybiB0eXBlb2YgZX06ZnVuY3Rpb24oZSl7cmV0dXJuIGUmJlwiZnVuY3Rpb25cIj09dHlwZW9mIFN5bWJvbCYmZS5jb25zdHJ1Y3Rvcj09PVN5bWJvbCYmZSE9PVN5bWJvbC5wcm90b3R5cGU/XCJzeW1ib2xcIjp0eXBlb2YgZX07ZnVuY3Rpb24gX3RvQ29uc3VtYWJsZUFycmF5KGUpe2lmKEFycmF5LmlzQXJyYXkoZSkpe2Zvcih2YXIgdD0wLG49QXJyYXkoZS5sZW5ndGgpO3Q8ZS5sZW5ndGg7dCsrKW5bdF09ZVt0XTtyZXR1cm4gbn1yZXR1cm4gQXJyYXkuZnJvbShlKX1leHBvcnQgdmFyIGpzUGFuZWw9e3ZlcnNpb246XCI0LjQuMFwiLGRhdGU6XCIyMDE4LTExLTMwIDEwOjMwXCIsYWpheEFsd2F5c0NhbGxiYWNrczpbXSxhdXRvcG9zaXRpb25TcGFjaW5nOjQsY2xvc2VPbkVzY2FwZTp2b2lkIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsZnVuY3Rpb24oZSl7XCJFc2NhcGVcIiE9PWUua2V5JiZcIkVzY1wiIT09ZS5jb2RlJiYyNyE9PWUua2V5Q29kZXx8anNQYW5lbC5nZXRQYW5lbHMoZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsXCIpfSkuc29tZShmdW5jdGlvbihlKXtyZXR1cm4hIWUub3B0aW9ucy5jbG9zZU9uRXNjYXBlJiYoZS5jbG9zZSgpLCEwKX0pfSwhMSksZGVmYXVsdHM6e2JveFNoYWRvdzozLGNvbnRhaW5lcjpcIndpbmRvd1wiLGNvbnRlbnRTaXplOnt3aWR0aDpcIjQwMHB4XCIsaGVpZ2h0OlwiMjAwcHhcIn0sZHJhZ2l0OntjdXJzb3I6XCJtb3ZlXCIsaGFuZGxlczpcIi5qc1BhbmVsLWhlYWRlcmxvZ28sIC5qc1BhbmVsLXRpdGxlYmFyLCAuanNQYW5lbC1mdHJcIixvcGFjaXR5Oi44LGRpc2FibGVPbk1heGltaXplZDohMH0saGVhZGVyOiEwLGhlYWRlclRpdGxlOlwianNQYW5lbFwiLGhlYWRlckNvbnRyb2xzOlwiYWxsXCIsaWNvbmZvbnQ6ITEsbWF4aW1pemVkTWFyZ2luOjAsbWluaW1pemVUbzpcImRlZmF1bHRcIixwYW5lbHR5cGU6XCJzdGFuZGFyZFwiLHBvc2l0aW9uOlwiY2VudGVyXCIscmVzaXplaXQ6e2hhbmRsZXM6XCJuLCBlLCBzLCB3LCBuZSwgc2UsIHN3LCBud1wiLG1pbldpZHRoOjEyOCxtaW5IZWlnaHQ6MTI4fSx0aGVtZTpcImRlZmF1bHRcIn0sZGVmYXVsdFNuYXBDb25maWc6e3NlbnNpdGl2aXR5OjcwLHRyaWdnZXI6XCJwYW5lbFwifSxleHRlbnNpb25zOnt9LGdsb2JhbENhbGxiYWNrczohMSxpY29uczp7Y2xvc2U6JzxzdmcgY2xhc3M9XCJqc1BhbmVsLWljb25cIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjggMjhcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNy43NSAxNmw5Ljg1LTkuODVjMC41LTAuNSAwLjUtMS4zIDAtMS43NS0wLjUtMC41LTEuMy0wLjUtMS43NSAwbC05Ljg1IDkuODUtOS44NS05LjljLTAuNS0wLjUtMS4zLTAuNS0xLjc1IDAtMC41IDAuNS0wLjUgMS4zIDAgMS43NWw5Ljg1IDkuOS05LjkgOS44NWMtMC41IDAuNS0wLjUgMS4zIDAgMS43NSAwLjI1IDAuMjUgMC41NSAwLjM1IDAuOSAwLjM1czAuNjUtMC4xIDAuOS0wLjM1bDkuODUtOS44NSA5Ljg1IDkuODVjMC4yNSAwLjI1IDAuNTUgMC4zNSAwLjkgMC4zNXMwLjY1LTAuMSAwLjktMC4zNWMwLjUtMC41IDAuNS0xLjMgMC0xLjc1bC05LjktOS44NXpcIj48L3BhdGg+PC9zdmc+JyxtYXhpbWl6ZTonPHN2ZyBjbGFzcz1cImpzUGFuZWwtaWNvblwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyOCAyOFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI3LjU1IDMuOWgtMjIuNmMtMC41NSAwLTEgMC40NS0xIDF2MjIuM2MwIDAuNTUgMC40NSAxIDEgMWgyMi41NWMwLjU1IDAgMS0wLjQ1IDEtMXYtMjIuM2MwLjA1MC0wLjU1LTAuNC0xLTAuOTUtMXpNNS45NSAyNi4xNXYtMThoMjAuNTV2MThoLTIwLjU1elwiPjwvcGF0aD48L3N2Zz4nLG5vcm1hbGl6ZTonPHN2ZyBjbGFzcz1cImpzUGFuZWwtaWNvblwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyOCAyOFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI3LjkgMy43NWgtMTguOGMtMC40IDAtMC43NSAwLjM1LTAuNzUgMC43NXY0LjNjMCAwLjEgMCAwLjIgMC4wNTAgMC4zaC00LjJjLTAuNTUgMC0xIDAuNDUtMSAxdjE3LjRjMCAwLjU1IDAuNDUgMSAxIDFoMTcuNjVjMC41NSAwIDEtMC40NSAxLTF2LTMuN2MwLjA1MCAwIDAuMSAwLjA1MCAwLjIgMC4wNTBoNC45YzAuNCAwIDAuNzUtMC4zNSAwLjc1LTAuNzV2LTE4LjZjLTAuMDUwLTAuNC0wLjQtMC43NS0wLjgtMC43NXpNNS4yIDI2LjV2LTEyLjk1YzAuMDUwIDAgMC4xIDAgMC4xNSAwaDE1LjRjMC4wNTAgMCAwLjEgMCAwLjE1IDB2MTIuOTVoLTE1Ljd6TTI3LjE1IDIyLjM1aC00LjE1Yy0wLjA1MCAwLTAuMTUgMC0wLjIgMC4wNTB2LTEyLjNjMC0wLjU1LTAuNDUtMS0xLTFoLTEyYzAuMDUwLTAuMSAwLjA1MC0wLjIgMC4wNTAtMC4zdi0zLjU1aDE3LjN2MTcuMXpcIj48L3BhdGg+PC9zdmc+JyxtaW5pbWl6ZTonPHN2ZyBjbGFzcz1cImpzUGFuZWwtaWNvblwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyOCAyOFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI3LjMgMjguNWgtMjIuNmMtMC44NSAwLTEuNS0wLjY1LTEuNS0xLjVzMC42NS0xLjUgMS41LTEuNWgyMi41NWMwLjg1IDAgMS41IDAuNjUgMS41IDEuNXMtMC42NSAxLjUtMS40NSAxLjV6XCI+PC9wYXRoPjwvc3ZnPicsc21hbGxpZnlyZXY6JzxzdmcgY2xhc3M9XCJqc1BhbmVsLWljb25cIiB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHdpZHRoPVwiMjBcIiBoZWlnaHQ9XCIyMFwiIHZpZXdCb3g9XCIwIDAgMjggMjhcIj48cGF0aCBmaWxsPVwiY3VycmVudENvbG9yXCIgZD1cIk0xNS45NSAyMy4yYzAgMCAwIDAgMCAwLTAuMzUgMC0wLjY1LTAuMTUtMC45LTAuMzVsLTExLjctMTEuOWMtMC41LTAuNS0wLjUtMS4zIDAtMS43NSAwLjUtMC41IDEuMy0wLjUgMS43NSAwbDEwLjg1IDEwLjk1IDEwLjktMTAuOGMwLjUtMC41IDEuMy0wLjUgMS43NSAwczAuNSAxLjMgMCAxLjc1bC0xMS43NSAxMS43Yy0wLjI1IDAuMjUtMC41NSAwLjQtMC45IDAuNHpcIj48L3BhdGg+PC9zdmc+JyxzbWFsbGlmeTonPHN2ZyBjbGFzcz1cImpzUGFuZWwtaWNvblwiIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgd2lkdGg9XCIyMFwiIGhlaWdodD1cIjIwXCIgdmlld0JveD1cIjAgMCAyOCAyOFwiPjxwYXRoIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBkPVwiTTI4LjY1IDIwLjg1bC0xMS44LTExLjY1Yy0wLjUtMC41LTEuMy0wLjUtMS43NSAwbC0xMS43NSAxMS44NWMtMC41IDAuNS0wLjUgMS4zIDAgMS43NSAwLjI1IDAuMjUgMC41NSAwLjM1IDAuOSAwLjM1IDAuMyAwIDAuNjUtMC4xIDAuOS0wLjM1bDEwLjg1LTEwLjk1IDEwLjkgMTAuOGMwLjUgMC41IDEuMyAwLjUgMS43NSAwIDAuNS0wLjUgMC41LTEuMyAwLTEuOHpcIj48L3BhdGg+PC9zdmc+J30saWRDb3VudGVyOjAsaXNJRTpuYXZpZ2F0b3IuYXBwVmVyc2lvbi5tYXRjaCgvVHJpZGVudC8pLG1kYnRoZW1lczpbXCJzZWNvbmRhcnlcIixcImVsZWdhbnRcIixcInN0eWxpc2hcIixcInVuaXF1ZVwiLFwic3BlY2lhbFwiXSxwb2ludGVyZG93bjpcIm9udG91Y2hlbmRcImluIHdpbmRvdz9bXCJ0b3VjaHN0YXJ0XCIsXCJtb3VzZWRvd25cIl06W1wibW91c2Vkb3duXCJdLHBvaW50ZXJtb3ZlOlwib250b3VjaGVuZFwiaW4gd2luZG93P1tcInRvdWNobW92ZVwiLFwibW91c2Vtb3ZlXCJdOltcIm1vdXNlbW92ZVwiXSxwb2ludGVydXA6XCJvbnRvdWNoZW5kXCJpbiB3aW5kb3c/W1widG91Y2hlbmRcIixcIm1vdXNldXBcIl06W1wibW91c2V1cFwiXSxwb2x5ZmlsbHM6KFtFbGVtZW50LnByb3RvdHlwZSxEb2N1bWVudC5wcm90b3R5cGUsRG9jdW1lbnRGcmFnbWVudC5wcm90b3R5cGVdLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5hcHBlbmQ9ZS5hcHBlbmR8fGZ1bmN0aW9uKCl7dmFyIGU9QXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKSx0PWRvY3VtZW50LmNyZWF0ZURvY3VtZW50RnJhZ21lbnQoKTtlLmZvckVhY2goZnVuY3Rpb24oZSl7dmFyIG49ZSBpbnN0YW5jZW9mIE5vZGU7dC5hcHBlbmRDaGlsZChuP2U6ZG9jdW1lbnQuY3JlYXRlVGV4dE5vZGUoU3RyaW5nKGUpKSl9KSx0aGlzLmFwcGVuZENoaWxkKHQpfX0pLHdpbmRvdy5FbGVtZW50JiYhRWxlbWVudC5wcm90b3R5cGUuY2xvc2VzdCYmKEVsZW1lbnQucHJvdG90eXBlLmNsb3Nlc3Q9ZnVuY3Rpb24oZSl7dmFyIHQ9KHRoaXMuZG9jdW1lbnR8fHRoaXMub3duZXJEb2N1bWVudCkucXVlcnlTZWxlY3RvckFsbChlKSxuPXZvaWQgMCxvPXRoaXM7ZG97Zm9yKG49dC5sZW5ndGg7LS1uPj0wJiZ0Lml0ZW0obikhPT1vOyk7fXdoaWxlKG48MCYmKG89by5wYXJlbnRFbGVtZW50KSk7cmV0dXJuIG99KSx3aW5kb3cuTm9kZUxpc3QmJiFOb2RlTGlzdC5wcm90b3R5cGUuZm9yRWFjaCYmKE5vZGVMaXN0LnByb3RvdHlwZS5mb3JFYWNoPWZ1bmN0aW9uKGUsdCl7dD10fHx3aW5kb3c7Zm9yKHZhciBuPTA7bjx0aGlzLmxlbmd0aDtuKyspZS5jYWxsKHQsdGhpc1tuXSxuLHRoaXMpfSksT2JqZWN0LmFzc2lnbnx8T2JqZWN0LmRlZmluZVByb3BlcnR5KE9iamVjdCxcImFzc2lnblwiLHtlbnVtZXJhYmxlOiExLGNvbmZpZ3VyYWJsZTohMCx3cml0YWJsZTohMCx2YWx1ZTpmdW5jdGlvbihlKXtpZihudWxsPT1lKXRocm93IG5ldyBUeXBlRXJyb3IoXCJDYW5ub3QgY29udmVydCBmaXJzdCBhcmd1bWVudCB0byBvYmplY3RcIik7Zm9yKHZhciB0PU9iamVjdChlKSxuPTE7bjxhcmd1bWVudHMubGVuZ3RoO24rKyl7dmFyIG89YXJndW1lbnRzW25dO2lmKG51bGwhPW8pe289T2JqZWN0KG8pO2Zvcih2YXIgYT1PYmplY3Qua2V5cyhPYmplY3QobykpLGk9MCxyPWEubGVuZ3RoO2k8cjtpKyspe3ZhciBsPWFbaV0scz1PYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKG8sbCk7dm9pZCAwIT09cyYmcy5lbnVtZXJhYmxlJiYodFtsXT1vW2xdKX19fXJldHVybiB0fX0pLGZ1bmN0aW9uKCl7aWYoXCJmdW5jdGlvblwiPT10eXBlb2Ygd2luZG93LkN1c3RvbUV2ZW50KXJldHVybiExO2Z1bmN0aW9uIGUoZSx0KXt0PXR8fHtidWJibGVzOiExLGNhbmNlbGFibGU6ITEsZGV0YWlsOnZvaWQgMH07dmFyIG49ZG9jdW1lbnQuY3JlYXRlRXZlbnQoXCJDdXN0b21FdmVudFwiKTtyZXR1cm4gbi5pbml0Q3VzdG9tRXZlbnQoZSx0LmJ1YmJsZXMsdC5jYW5jZWxhYmxlLHQuZGV0YWlsKSxufWUucHJvdG90eXBlPXdpbmRvdy5FdmVudC5wcm90b3R5cGUsd2luZG93LkN1c3RvbUV2ZW50PWV9KCksU3RyaW5nLnByb3RvdHlwZS5lbmRzV2l0aHx8KFN0cmluZy5wcm90b3R5cGUuZW5kc1dpdGg9ZnVuY3Rpb24oZSx0KXtyZXR1cm4gdDx0aGlzLmxlbmd0aD90fD0wOnQ9dGhpcy5sZW5ndGgsdGhpcy5zdWJzdHIodC1lLmxlbmd0aCxlLmxlbmd0aCk9PT1lfSksU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRofHwoU3RyaW5nLnByb3RvdHlwZS5zdGFydHNXaXRoPWZ1bmN0aW9uKGUsdCl7cmV0dXJuIHRoaXMuc3Vic3RyKHR8fDAsZS5sZW5ndGgpPT09ZX0pLHZvaWQoU3RyaW5nLnByb3RvdHlwZS5pbmNsdWRlc3x8KFN0cmluZy5wcm90b3R5cGUuaW5jbHVkZXM9ZnVuY3Rpb24oZSx0KXtyZXR1cm5cIm51bWJlclwiIT10eXBlb2YgdCYmKHQ9MCksISh0K2UubGVuZ3RoPnRoaXMubGVuZ3RoKSYmLTEhPT10aGlzLmluZGV4T2YoZSx0KX0pKSksdGhlbWVzOltcImRlZmF1bHRcIixcInByaW1hcnlcIixcImluZm9cIixcInN1Y2Nlc3NcIixcIndhcm5pbmdcIixcImRhbmdlclwiXSx6aUJhc2U6MTAwLGNvbG9yTGlnaHRlbmluZ0ZhY3RvcjouODEsY29sb3JEYXJrZW5pbmdGYWN0b3I6LjUsY29sb3JCcmlnaHRuZXNzVGhyZXNob2xkOi41NSxjb2xvck5hbWVzOnthbGljZWJsdWU6XCJmMGY4ZmZcIixhbnRpcXVld2hpdGU6XCJmYWViZDdcIixhcXVhOlwiMGZmXCIsYXF1YW1hcmluZTpcIjdmZmZkNFwiLGF6dXJlOlwiZjBmZmZmXCIsYmVpZ2U6XCJmNWY1ZGNcIixiaXNxdWU6XCJmZmU0YzRcIixibGFjazpcIjAwMFwiLGJsYW5jaGVkYWxtb25kOlwiZmZlYmNkXCIsYmx1ZTpcIjAwZlwiLGJsdWV2aW9sZXQ6XCI4YTJiZTJcIixicm93bjpcImE1MmEyYVwiLGJ1cmx5d29vZDpcImRlYjg4N1wiLGNhZGV0Ymx1ZTpcIjVmOWVhMFwiLGNoYXJ0cmV1c2U6XCI3ZmZmMDBcIixjaG9jb2xhdGU6XCJkMjY5MWVcIixjb3JhbDpcImZmN2Y1MFwiLGNvcm5mbG93ZXJibHVlOlwiNjQ5NWVkXCIsY29ybnNpbGs6XCJmZmY4ZGNcIixjcmltc29uOlwiZGMxNDNjXCIsY3lhbjpcIjBmZlwiLGRhcmtibHVlOlwiMDAwMDhiXCIsZGFya2N5YW46XCIwMDhiOGJcIixkYXJrZ29sZGVucm9kOlwiYjg4NjBiXCIsZGFya2dyYXk6XCJhOWE5YTlcIixkYXJrZ3JleTpcImE5YTlhOVwiLGRhcmtncmVlbjpcIjAwNjQwMFwiLGRhcmtraGFraTpcImJkYjc2YlwiLGRhcmttYWdlbnRhOlwiOGIwMDhiXCIsZGFya29saXZlZ3JlZW46XCI1NTZiMmZcIixkYXJrb3JhbmdlOlwiZmY4YzAwXCIsZGFya29yY2hpZDpcIjk5MzJjY1wiLGRhcmtyZWQ6XCI4YjAwMDBcIixkYXJrc2FsbW9uOlwiZTk5NjdhXCIsZGFya3NlYWdyZWVuOlwiOGZiYzhmXCIsZGFya3NsYXRlYmx1ZTpcIjQ4M2Q4YlwiLGRhcmtzbGF0ZWdyYXk6XCIyZjRmNGZcIixkYXJrc2xhdGVncmV5OlwiMmY0ZjRmXCIsZGFya3R1cnF1b2lzZTpcIjAwY2VkMVwiLGRhcmt2aW9sZXQ6XCI5NDAwZDNcIixkZWVwcGluazpcImZmMTQ5M1wiLGRlZXBza3libHVlOlwiMDBiZmZmXCIsZGltZ3JheTpcIjY5Njk2OVwiLGRpbWdyZXk6XCI2OTY5NjlcIixkb2RnZXJibHVlOlwiMWU5MGZmXCIsZmlyZWJyaWNrOlwiYjIyMjIyXCIsZmxvcmFsd2hpdGU6XCJmZmZhZjBcIixmb3Jlc3RncmVlbjpcIjIyOGIyMlwiLGZ1Y2hzaWE6XCJmMGZcIixnYWluc2Jvcm86XCJkY2RjZGNcIixnaG9zdHdoaXRlOlwiZjhmOGZmXCIsZ29sZDpcImZmZDcwMFwiLGdvbGRlbnJvZDpcImRhYTUyMFwiLGdyYXk6XCI4MDgwODBcIixncmV5OlwiODA4MDgwXCIsZ3JlZW46XCIwMDgwMDBcIixncmVlbnllbGxvdzpcImFkZmYyZlwiLGhvbmV5ZGV3OlwiZjBmZmYwXCIsaG90cGluazpcImZmNjliNFwiLGluZGlhbnJlZDpcImNkNWM1Y1wiLGluZGlnbzpcIjRiMDA4MlwiLGl2b3J5OlwiZmZmZmYwXCIsa2hha2k6XCJmMGU2OGNcIixsYXZlbmRlcjpcImU2ZTZmYVwiLGxhdmVuZGVyYmx1c2g6XCJmZmYwZjVcIixsYXduZ3JlZW46XCI3Y2ZjMDBcIixsZW1vbmNoaWZmb246XCJmZmZhY2RcIixsaWdodGJsdWU6XCJhZGQ4ZTZcIixsaWdodGNvcmFsOlwiZjA4MDgwXCIsbGlnaHRjeWFuOlwiZTBmZmZmXCIsbGlnaHRnb2xkZW5yb2R5ZWxsb3c6XCJmYWZhZDJcIixsaWdodGdyYXk6XCJkM2QzZDNcIixsaWdodGdyZXk6XCJkM2QzZDNcIixsaWdodGdyZWVuOlwiOTBlZTkwXCIsbGlnaHRwaW5rOlwiZmZiNmMxXCIsbGlnaHRzYWxtb246XCJmZmEwN2FcIixsaWdodHNlYWdyZWVuOlwiMjBiMmFhXCIsbGlnaHRza3libHVlOlwiODdjZWZhXCIsbGlnaHRzbGF0ZWdyYXk6XCI3ODlcIixsaWdodHNsYXRlZ3JleTpcIjc4OVwiLGxpZ2h0c3RlZWxibHVlOlwiYjBjNGRlXCIsbGlnaHR5ZWxsb3c6XCJmZmZmZTBcIixsaW1lOlwiMGYwXCIsbGltZWdyZWVuOlwiMzJjZDMyXCIsbGluZW46XCJmYWYwZTZcIixtYWdlbnRhOlwiZjBmXCIsbWFyb29uOlwiODAwMDAwXCIsbWVkaXVtYXF1YW1hcmluZTpcIjY2Y2RhYVwiLG1lZGl1bWJsdWU6XCIwMDAwY2RcIixtZWRpdW1vcmNoaWQ6XCJiYTU1ZDNcIixtZWRpdW1wdXJwbGU6XCI5MzcwZDhcIixtZWRpdW1zZWFncmVlbjpcIjNjYjM3MVwiLG1lZGl1bXNsYXRlYmx1ZTpcIjdiNjhlZVwiLG1lZGl1bXNwcmluZ2dyZWVuOlwiMDBmYTlhXCIsbWVkaXVtdHVycXVvaXNlOlwiNDhkMWNjXCIsbWVkaXVtdmlvbGV0cmVkOlwiYzcxNTg1XCIsbWlkbmlnaHRibHVlOlwiMTkxOTcwXCIsbWludGNyZWFtOlwiZjVmZmZhXCIsbWlzdHlyb3NlOlwiZmZlNGUxXCIsbW9jY2FzaW46XCJmZmU0YjVcIixuYXZham93aGl0ZTpcImZmZGVhZFwiLG5hdnk6XCIwMDAwODBcIixvbGRsYWNlOlwiZmRmNWU2XCIsb2xpdmU6XCI4MDgwMDBcIixvbGl2ZWRyYWI6XCI2YjhlMjNcIixvcmFuZ2U6XCJmZmE1MDBcIixvcmFuZ2VyZWQ6XCJmZjQ1MDBcIixvcmNoaWQ6XCJkYTcwZDZcIixwYWxlZ29sZGVucm9kOlwiZWVlOGFhXCIscGFsZWdyZWVuOlwiOThmYjk4XCIscGFsZXR1cnF1b2lzZTpcImFmZWVlZVwiLHBhbGV2aW9sZXRyZWQ6XCJkODcwOTNcIixwYXBheWF3aGlwOlwiZmZlZmQ1XCIscGVhY2hwdWZmOlwiZmZkYWI5XCIscGVydTpcImNkODUzZlwiLHBpbms6XCJmZmMwY2JcIixwbHVtOlwiZGRhMGRkXCIscG93ZGVyYmx1ZTpcImIwZTBlNlwiLHB1cnBsZTpcIjgwMDA4MFwiLHJlYmVjY2FwdXJwbGU6XCI2MzlcIixyZWQ6XCJmMDBcIixyb3N5YnJvd246XCJiYzhmOGZcIixyb3lhbGJsdWU6XCI0MTY5ZTFcIixzYWRkbGVicm93bjpcIjhiNDUxM1wiLHNhbG1vbjpcImZhODA3MlwiLHNhbmR5YnJvd246XCJmNGE0NjBcIixzZWFncmVlbjpcIjJlOGI1N1wiLHNlYXNoZWxsOlwiZmZmNWVlXCIsc2llbm5hOlwiYTA1MjJkXCIsc2lsdmVyOlwiYzBjMGMwXCIsc2t5Ymx1ZTpcIjg3Y2VlYlwiLHNsYXRlYmx1ZTpcIjZhNWFjZFwiLHNsYXRlZ3JheTpcIjcwODA5MFwiLHNsYXRlZ3JleTpcIjcwODA5MFwiLHNub3c6XCJmZmZhZmFcIixzcHJpbmdncmVlbjpcIjAwZmY3ZlwiLHN0ZWVsYmx1ZTpcIjQ2ODJiNFwiLHRhbjpcImQyYjQ4Y1wiLHRlYWw6XCIwMDgwODBcIix0aGlzdGxlOlwiZDhiZmQ4XCIsdG9tYXRvOlwiZmY2MzQ3XCIsdHVycXVvaXNlOlwiNDBlMGQwXCIsdmlvbGV0OlwiZWU4MmVlXCIsd2hlYXQ6XCJmNWRlYjNcIix3aGl0ZTpcImZmZlwiLHdoaXRlc21va2U6XCJmNWY1ZjVcIix5ZWxsb3c6XCJmZjBcIix5ZWxsb3dncmVlbjpcIjlhY2QzMlwiLGdyZXk1MDpcImZhZmFmYVwiLGdyYXk1MDpcImZhZmFmYVwiLGdyZXkxMDA6XCJmNWY1ZjVcIixncmF5MTAwOlwiZjVmNWY1XCIsZ3JleTIwMDpcImVlZVwiLGdyYXkyMDA6XCJlZWVcIixncmV5MzAwOlwiZTBlMGUwXCIsZ3JheTMwMDpcImUwZTBlMFwiLGdyZXk0MDA6XCJiZGJkYmRcIixncmF5NDAwOlwiYmRiZGJkXCIsZ3JleTUwMDpcIjllOWU5ZVwiLGdyYXk1MDA6XCI5ZTllOWVcIixncmV5NjAwOlwiNzU3NTc1XCIsZ3JheTYwMDpcIjc1NzU3NVwiLGdyZXk3MDA6XCI2MTYxNjFcIixncmF5NzAwOlwiNjE2MTYxXCIsZ3JleTgwMDpcIjQyNDI0MlwiLGdyYXk4MDA6XCI0MjQyNDJcIixncmV5OTAwOlwiMjEyMTIxXCIsZ3JheTkwMDpcIjIxMjEyMVwiLGJsdWVncmV5NTA6XCJlY2VmZjFcIixibHVlZ3JheTUwOlwiZWNlZmYxXCIsYmx1ZWdyZXkxMDA6XCJDRkQ4RENcIixibHVlZ3JheTEwMDpcIkNGRDhEQ1wiLGJsdWVncmV5MjAwOlwiQjBCRUM1XCIsYmx1ZWdyYXkyMDA6XCJCMEJFQzVcIixibHVlZ3JleTMwMDpcIjkwQTRBRVwiLGJsdWVncmF5MzAwOlwiOTBBNEFFXCIsYmx1ZWdyZXk0MDA6XCI3ODkwOUNcIixibHVlZ3JheTQwMDpcIjc4OTA5Q1wiLGJsdWVncmV5NTAwOlwiNjA3RDhCXCIsYmx1ZWdyYXk1MDA6XCI2MDdEOEJcIixibHVlZ3JleTYwMDpcIjU0NkU3QVwiLGJsdWVncmF5NjAwOlwiNTQ2RTdBXCIsYmx1ZWdyZXk3MDA6XCI0NTVBNjRcIixibHVlZ3JheTcwMDpcIjQ1NUE2NFwiLGJsdWVncmV5ODAwOlwiMzc0NzRGXCIsYmx1ZWdyYXk4MDA6XCIzNzQ3NEZcIixibHVlZ3JleTkwMDpcIjI2MzIzOFwiLGJsdWVncmF5OTAwOlwiMjYzMjM4XCIscmVkNTA6XCJGRkVCRUVcIixyZWQxMDA6XCJGRkNERDJcIixyZWQyMDA6XCJFRjlBOUFcIixyZWQzMDA6XCJFNTczNzNcIixyZWQ0MDA6XCJFRjUzNTBcIixyZWQ1MDA6XCJGNDQzMzZcIixyZWQ2MDA6XCJFNTM5MzVcIixyZWQ3MDA6XCJEMzJGMkZcIixyZWQ4MDA6XCJDNjI4MjhcIixyZWQ5MDA6XCJCNzFDMUNcIixyZWRhMTAwOlwiRkY4QTgwXCIscmVkYTIwMDpcIkZGNTI1MlwiLHJlZGE0MDA6XCJGRjE3NDRcIixyZWRhNzAwOlwiRDUwMDAwXCIscGluazUwOlwiRkNFNEVDXCIscGluazEwMDpcIkY4QkJEMFwiLHBpbmsyMDA6XCJGNDhGQjFcIixwaW5rMzAwOlwiRjA2MjkyXCIscGluazQwMDpcIkVDNDA3QVwiLHBpbms1MDA6XCJFOTFFNjNcIixwaW5rNjAwOlwiRDgxQjYwXCIscGluazcwMDpcIkMyMTg1QlwiLHBpbms4MDA6XCJBRDE0NTdcIixwaW5rOTAwOlwiODgwRTRGXCIscGlua2ExMDA6XCJGRjgwQUJcIixwaW5rYTIwMDpcIkZGNDA4MVwiLHBpbmthNDAwOlwiRjUwMDU3XCIscGlua2E3MDA6XCJDNTExNjJcIixwdXJwbGU1MDpcIkYzRTVGNVwiLHB1cnBsZTEwMDpcIkUxQkVFN1wiLHB1cnBsZTIwMDpcIkNFOTNEOFwiLHB1cnBsZTMwMDpcIkJBNjhDOFwiLHB1cnBsZTQwMDpcIkFCNDdCQ1wiLHB1cnBsZTUwMDpcIjlDMjdCMFwiLHB1cnBsZTYwMDpcIjhFMjRBQVwiLHB1cnBsZTcwMDpcIjdCMUZBMlwiLHB1cnBsZTgwMDpcIjZBMUI5QVwiLHB1cnBsZTkwMDpcIjRBMTQ4Q1wiLHB1cnBsZWExMDA6XCJFQTgwRkNcIixwdXJwbGVhMjAwOlwiRTA0MEZCXCIscHVycGxlYTQwMDpcIkQ1MDBGOVwiLHB1cnBsZWE3MDA6XCJBQTAwRkZcIixkZWVwcHVycGxlNTA6XCJFREU3RjZcIixkZWVwcHVycGxlMTAwOlwiRDFDNEU5XCIsZGVlcHB1cnBsZTIwMDpcIkIzOUREQlwiLGRlZXBwdXJwbGUzMDA6XCI5NTc1Q0RcIixkZWVwcHVycGxlNDAwOlwiN0U1N0MyXCIsZGVlcHB1cnBsZTUwMDpcIjY3M0FCN1wiLGRlZXBwdXJwbGU2MDA6XCI1RTM1QjFcIixkZWVwcHVycGxlNzAwOlwiNTEyREE4XCIsZGVlcHB1cnBsZTgwMDpcIjQ1MjdBMFwiLGRlZXBwdXJwbGU5MDA6XCIzMTFCOTJcIixkZWVwcHVycGxlYTEwMDpcIkIzODhGRlwiLGRlZXBwdXJwbGVhMjAwOlwiN0M0REZGXCIsZGVlcHB1cnBsZWE0MDA6XCI2NTFGRkZcIixkZWVwcHVycGxlYTcwMDpcIjYyMDBFQVwiLGluZGlnbzUwOlwiRThFQUY2XCIsaW5kaWdvMTAwOlwiQzVDQUU5XCIsaW5kaWdvMjAwOlwiOUZBOERBXCIsaW5kaWdvMzAwOlwiNzk4NkNCXCIsaW5kaWdvNDAwOlwiNUM2QkMwXCIsaW5kaWdvNTAwOlwiM0Y1MUI1XCIsaW5kaWdvNjAwOlwiMzk0OUFCXCIsaW5kaWdvNzAwOlwiMzAzRjlGXCIsaW5kaWdvODAwOlwiMjgzNTkzXCIsaW5kaWdvOTAwOlwiMUEyMzdFXCIsaW5kaWdvYTEwMDpcIjhDOUVGRlwiLGluZGlnb2EyMDA6XCI1MzZERkVcIixpbmRpZ29hNDAwOlwiM0Q1QUZFXCIsaW5kaWdvYTcwMDpcIjMwNEZGRVwiLGJsdWU1MDpcIkUzRjJGRFwiLGJsdWUxMDA6XCJCQkRFRkJcIixibHVlMjAwOlwiOTBDQUY5XCIsYmx1ZTMwMDpcIjY0QjVGNlwiLGJsdWU0MDA6XCI0MkE1RjVcIixibHVlNTAwOlwiMjE5NkYzXCIsYmx1ZTYwMDpcIjFFODhFNVwiLGJsdWU3MDA6XCIxOTc2RDJcIixibHVlODAwOlwiMTU2NUMwXCIsYmx1ZTkwMDpcIjBENDdBMVwiLGJsdWVhMTAwOlwiODJCMUZGXCIsYmx1ZWEyMDA6XCI0NDhBRkZcIixibHVlYTQwMDpcIjI5NzlGRlwiLGJsdWVhNzAwOlwiMjk2MkZGXCIsbGlnaHRibHVlNTA6XCJFMUY1RkVcIixsaWdodGJsdWUxMDA6XCJCM0U1RkNcIixsaWdodGJsdWUyMDA6XCI4MUQ0RkFcIixsaWdodGJsdWUzMDA6XCI0RkMzRjdcIixsaWdodGJsdWU0MDA6XCIyOUI2RjZcIixsaWdodGJsdWU1MDA6XCIwM0E5RjRcIixsaWdodGJsdWU2MDA6XCIwMzlCRTVcIixsaWdodGJsdWU3MDA6XCIwMjg4RDFcIixsaWdodGJsdWU4MDA6XCIwMjc3QkRcIixsaWdodGJsdWU5MDA6XCIwMTU3OUJcIixsaWdodGJsdWVhMTAwOlwiODBEOEZGXCIsbGlnaHRibHVlYTIwMDpcIjQwQzRGRlwiLGxpZ2h0Ymx1ZWE0MDA6XCIwMEIwRkZcIixsaWdodGJsdWVhNzAwOlwiMDA5MUVBXCIsY3lhbjUwOlwiRTBGN0ZBXCIsY3lhbjEwMDpcIkIyRUJGMlwiLGN5YW4yMDA6XCI4MERFRUFcIixjeWFuMzAwOlwiNEREMEUxXCIsY3lhbjQwMDpcIjI2QzZEQVwiLGN5YW41MDA6XCIwMEJDRDRcIixjeWFuNjAwOlwiMDBBQ0MxXCIsY3lhbjcwMDpcIjAwOTdBN1wiLGN5YW44MDA6XCIwMDgzOEZcIixjeWFuOTAwOlwiMDA2MDY0XCIsY3lhbmExMDA6XCI4NEZGRkZcIixjeWFuYTIwMDpcIjE4RkZGRlwiLGN5YW5hNDAwOlwiMDBFNUZGXCIsY3lhbmE3MDA6XCIwMEI4RDRcIix0ZWFsNTA6XCJFMEYyRjFcIix0ZWFsMTAwOlwiQjJERkRCXCIsdGVhbDIwMDpcIjgwQ0JDNFwiLHRlYWwzMDA6XCI0REI2QUNcIix0ZWFsNDAwOlwiMjZBNjlBXCIsdGVhbDUwMDpcIjAwOTY4OFwiLHRlYWw2MDA6XCIwMDg5N0JcIix0ZWFsNzAwOlwiMDA3OTZCXCIsdGVhbDgwMDpcIjAwNjk1Q1wiLHRlYWw5MDA6XCIwMDRENDBcIix0ZWFsYTEwMDpcIkE3RkZFQlwiLHRlYWxhMjAwOlwiNjRGRkRBXCIsdGVhbGE0MDA6XCIxREU5QjZcIix0ZWFsYTcwMDpcIjAwQkZBNVwiLGdyZWVuNTA6XCJFOEY1RTlcIixncmVlbjEwMDpcIkM4RTZDOVwiLGdyZWVuMjAwOlwiQTVENkE3XCIsZ3JlZW4zMDA6XCI4MUM3ODRcIixncmVlbjQwMDpcIjY2QkI2QVwiLGdyZWVuNTAwOlwiNENBRjUwXCIsZ3JlZW42MDA6XCI0M0EwNDdcIixncmVlbjcwMDpcIjM4OEUzQ1wiLGdyZWVuODAwOlwiMkU3RDMyXCIsZ3JlZW45MDA6XCIxQjVFMjBcIixncmVlbmExMDA6XCJCOUY2Q0FcIixncmVlbmEyMDA6XCI2OUYwQUVcIixncmVlbmE0MDA6XCIwMEU2NzZcIixncmVlbmE3MDA6XCIwMEM4NTNcIixsaWdodGdyZWVuNTA6XCJGMUY4RTlcIixsaWdodGdyZWVuMTAwOlwiRENFREM4XCIsbGlnaHRncmVlbjIwMDpcIkM1RTFBNVwiLGxpZ2h0Z3JlZW4zMDA6XCJBRUQ1ODFcIixsaWdodGdyZWVuNDAwOlwiOUNDQzY1XCIsbGlnaHRncmVlbjUwMDpcIjhCQzM0QVwiLGxpZ2h0Z3JlZW42MDA6XCI3Q0IzNDJcIixsaWdodGdyZWVuNzAwOlwiNjg5RjM4XCIsbGlnaHRncmVlbjgwMDpcIjU1OEIyRlwiLGxpZ2h0Z3JlZW45MDA6XCIzMzY5MUVcIixsaWdodGdyZWVuYTEwMDpcIkNDRkY5MFwiLGxpZ2h0Z3JlZW5hMjAwOlwiQjJGRjU5XCIsbGlnaHRncmVlbmE0MDA6XCI3NkZGMDNcIixsaWdodGdyZWVuYTcwMDpcIjY0REQxN1wiLGxpbWU1MDpcIkY5RkJFN1wiLGxpbWUxMDA6XCJGMEY0QzNcIixsaW1lMjAwOlwiRTZFRTlDXCIsbGltZTMwMDpcIkRDRTc3NVwiLGxpbWU0MDA6XCJENEUxNTdcIixsaW1lNTAwOlwiQ0REQzM5XCIsbGltZTYwMDpcIkMwQ0EzM1wiLGxpbWU3MDA6XCJBRkI0MkJcIixsaW1lODAwOlwiOUU5RDI0XCIsbGltZTkwMDpcIjgyNzcxN1wiLGxpbWVhMTAwOlwiRjRGRjgxXCIsbGltZWEyMDA6XCJFRUZGNDFcIixsaW1lYTQwMDpcIkM2RkYwMFwiLGxpbWVhNzAwOlwiQUVFQTAwXCIseWVsbG93NTA6XCJGRkZERTdcIix5ZWxsb3cxMDA6XCJGRkY5QzRcIix5ZWxsb3cyMDA6XCJGRkY1OURcIix5ZWxsb3czMDA6XCJGRkYxNzZcIix5ZWxsb3c0MDA6XCJGRkVFNThcIix5ZWxsb3c1MDA6XCJGRkVCM0JcIix5ZWxsb3c2MDA6XCJGREQ4MzVcIix5ZWxsb3c3MDA6XCJGQkMwMkRcIix5ZWxsb3c4MDA6XCJGOUE4MjVcIix5ZWxsb3c5MDA6XCJGNTdGMTdcIix5ZWxsb3dhMTAwOlwiRkZGRjhEXCIseWVsbG93YTIwMDpcIkZGRkYwMFwiLHllbGxvd2E0MDA6XCJGRkVBMDBcIix5ZWxsb3dhNzAwOlwiRkZENjAwXCIsYW1iZXI1MDpcIkZGRjhFMVwiLGFtYmVyMTAwOlwiRkZFQ0IzXCIsYW1iZXIyMDA6XCJGRkUwODJcIixhbWJlcjMwMDpcIkZGRDU0RlwiLGFtYmVyNDAwOlwiRkZDQTI4XCIsYW1iZXI1MDA6XCJGRkMxMDdcIixhbWJlcjYwMDpcIkZGQjMwMFwiLGFtYmVyNzAwOlwiRkZBMDAwXCIsYW1iZXI4MDA6XCJGRjhGMDBcIixhbWJlcjkwMDpcIkZGNkYwMFwiLGFtYmVyYTEwMDpcIkZGRTU3RlwiLGFtYmVyYTIwMDpcIkZGRDc0MFwiLGFtYmVyYTQwMDpcIkZGQzQwMFwiLGFtYmVyYTcwMDpcIkZGQUIwMFwiLG9yYW5nZTUwOlwiRkZGM0UwXCIsb3JhbmdlMTAwOlwiRkZFMEIyXCIsb3JhbmdlMjAwOlwiRkZDQzgwXCIsb3JhbmdlMzAwOlwiRkZCNzREXCIsb3JhbmdlNDAwOlwiRkZBNzI2XCIsb3JhbmdlNTAwOlwiRkY5ODAwXCIsb3JhbmdlNjAwOlwiRkI4QzAwXCIsb3JhbmdlNzAwOlwiRjU3QzAwXCIsb3JhbmdlODAwOlwiRUY2QzAwXCIsb3JhbmdlOTAwOlwiRTY1MTAwXCIsb3JhbmdlYTEwMDpcIkZGRDE4MFwiLG9yYW5nZWEyMDA6XCJGRkFCNDBcIixvcmFuZ2VhNDAwOlwiRkY5MTAwXCIsb3JhbmdlYTcwMDpcIkZGNkQwMFwiLGRlZXBvcmFuZ2U1MDpcIkZCRTlFN1wiLGRlZXBvcmFuZ2UxMDA6XCJGRkNDQkNcIixkZWVwb3JhbmdlMjAwOlwiRkZBQjkxXCIsZGVlcG9yYW5nZTMwMDpcIkZGOEE2NVwiLGRlZXBvcmFuZ2U0MDA6XCJGRjcwNDNcIixkZWVwb3JhbmdlNTAwOlwiRkY1NzIyXCIsZGVlcG9yYW5nZTYwMDpcIkY0NTExRVwiLGRlZXBvcmFuZ2U3MDA6XCJFNjRBMTlcIixkZWVwb3JhbmdlODAwOlwiRDg0MzE1XCIsZGVlcG9yYW5nZTkwMDpcIkJGMzYwQ1wiLGRlZXBvcmFuZ2VhMTAwOlwiRkY5RTgwXCIsZGVlcG9yYW5nZWEyMDA6XCJGRjZFNDBcIixkZWVwb3JhbmdlYTQwMDpcIkZGM0QwMFwiLGRlZXBvcmFuZ2VhNzAwOlwiREQyQzAwXCIsYnJvd241MDpcIkVGRUJFOVwiLGJyb3duMTAwOlwiRDdDQ0M4XCIsYnJvd24yMDA6XCJCQ0FBQTRcIixicm93bjMwMDpcIkExODg3RlwiLGJyb3duNDAwOlwiOEQ2RTYzXCIsYnJvd241MDA6XCI3OTU1NDhcIixicm93bjYwMDpcIjZENEM0MVwiLGJyb3duNzAwOlwiNUQ0MDM3XCIsYnJvd244MDA6XCI0RTM0MkVcIixicm93bjkwMDpcIjNFMjcyM1wifSxjb2xvcjpmdW5jdGlvbihlKXt2YXIgdD1lLnRvTG93ZXJDYXNlKCksbj12b2lkIDAsbz12b2lkIDAsYT12b2lkIDAsaT12b2lkIDAscj12b2lkIDAsbD12b2lkIDAscz12b2lkIDAsYz12b2lkIDAsZD12b2lkIDAscD17fSxmPS9ecmdiYT9cXCgoWzAtOV17MSwzfSksKFswLTldezEsM30pLChbMC05XXsxLDN9KSw/KDB8MXwwXFwuWzAtOV17MSwyfXxcXC5bMC05XXsxLDJ9KT9cXCkkL2dpLGg9L15oc2xhP1xcKChbMC05XXsxLDN9KSwoWzAtOV17MSwzfSUpLChbMC05XXsxLDN9JSksPygwfDF8MFxcLlswLTldezEsMn18XFwuWzAtOV17MSwyfSk/XFwpJC9naSx1PXRoaXMuY29sb3JOYW1lcztyZXR1cm4gdVt0XSYmKHQ9dVt0XSksbnVsbCE9PXQubWF0Y2goL14jPyhbMC05YS1mXXszfXxbMC05YS1mXXs2fSkkL2dpKT8odD10LnJlcGxhY2UoXCIjXCIsXCJcIiksdC5sZW5ndGglMj09MT8obj1TdHJpbmcodC5zdWJzdHIoMCwxKSkrdC5zdWJzdHIoMCwxKSxvPVN0cmluZyh0LnN1YnN0cigxLDEpKSt0LnN1YnN0cigxLDEpLGE9U3RyaW5nKHQuc3Vic3RyKDIsMSkpK3Quc3Vic3RyKDIsMSkscC5yZ2I9e3I6cGFyc2VJbnQobiwxNiksZzpwYXJzZUludChvLDE2KSxiOnBhcnNlSW50KGEsMTYpfSxwLmhleD1cIiNcIituK28rYSk6KHAucmdiPXtyOnBhcnNlSW50KHQuc3Vic3RyKDAsMiksMTYpLGc6cGFyc2VJbnQodC5zdWJzdHIoMiwyKSwxNiksYjpwYXJzZUludCh0LnN1YnN0cig0LDIpLDE2KX0scC5oZXg9XCIjXCIrdCksZD10aGlzLnJnYlRvSHNsKHAucmdiLnIscC5yZ2IuZyxwLnJnYi5iKSxwLmhzbD1kLHAucmdiLmNzcz1cInJnYihcIitwLnJnYi5yK1wiLFwiK3AucmdiLmcrXCIsXCIrcC5yZ2IuYitcIilcIik6dC5tYXRjaChmKT8ocz1mLmV4ZWModCkscC5yZ2I9e2Nzczp0LHI6c1sxXSxnOnNbMl0sYjpzWzNdfSxwLmhleD10aGlzLnJnYlRvSGV4KHNbMV0sc1syXSxzWzNdKSxkPXRoaXMucmdiVG9Ic2woc1sxXSxzWzJdLHNbM10pLHAuaHNsPWQpOnQubWF0Y2goaCk/KGk9KHM9aC5leGVjKHQpKVsxXS8zNjAscj1zWzJdLnN1YnN0cigwLHNbMl0ubGVuZ3RoLTEpLzEwMCxsPXNbM10uc3Vic3RyKDAsc1szXS5sZW5ndGgtMSkvMTAwLGM9dGhpcy5oc2xUb1JnYihpLHIsbCkscC5yZ2I9e2NzczpcInJnYihcIitjWzBdK1wiLFwiK2NbMV0rXCIsXCIrY1syXStcIilcIixyOmNbMF0sZzpjWzFdLGI6Y1syXX0scC5oZXg9dGhpcy5yZ2JUb0hleChwLnJnYi5yLHAucmdiLmcscC5yZ2IuYikscC5oc2w9e2NzczpcImhzbChcIitzWzFdK1wiLFwiK3NbMl0rXCIsXCIrc1szXStcIilcIixoOnNbMV0sczpzWzJdLGw6c1szXX0pOihwLmhleD1cIiNmNWY1ZjVcIixwLnJnYj17Y3NzOlwicmdiKDI0NSwyNDUsMjQ1KVwiLHI6MjQ1LGc6MjQ1LGI6MjQ1fSxwLmhzbD17Y3NzOlwiaHNsKDAsMCUsOTYlKVwiLGg6MCxzOlwiMCVcIixsOlwiOTYlXCJ9KSxwfSxjYWxjQ29sb3JzOmZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMuY29sb3JCcmlnaHRuZXNzVGhyZXNob2xkLG49dGhpcy5jb2xvcihlKSxvPXRoaXMubGlnaHRlbihlLHRoaXMuY29sb3JMaWdodGVuaW5nRmFjdG9yKSxhPXRoaXMuZGFya2VuKGUsdGhpcy5jb2xvckRhcmtlbmluZ0ZhY3RvciksaT10aGlzLnBlcmNlaXZlZEJyaWdodG5lc3MoZSk8PXQ/XCIjZmZmZmZmXCI6XCIjMDAwMDAwXCIscj10aGlzLnBlcmNlaXZlZEJyaWdodG5lc3Mobyk8PXQ/XCIjZmZmZmZmXCI6XCIjMDAwMDAwXCIsbD10aGlzLnBlcmNlaXZlZEJyaWdodG5lc3MoYSk8PXQ/XCIjZmZmZmZmXCI6XCIjMDAwMDAwXCI7cmV0dXJuW24uaHNsLmNzcyxvLGEsaSxyLGxdfSxkYXJrZW46ZnVuY3Rpb24oZSx0KXt2YXIgbj10aGlzLmNvbG9yKGUpLmhzbCxvPXBhcnNlRmxvYXQobi5sKSxhPU1hdGgucm91bmQoby1vKnQpK1wiJVwiO3JldHVyblwiaHNsKFwiK24uaCtcIixcIituLnMrXCIsXCIrYStcIilcIn0sbGlnaHRlbjpmdW5jdGlvbihlLHQpe3ZhciBuPXRoaXMuY29sb3IoZSkuaHNsLG89cGFyc2VGbG9hdChuLmwpLGE9TWF0aC5yb3VuZChvKygxMDAtbykqdCkrXCIlXCI7cmV0dXJuXCJoc2woXCIrbi5oK1wiLFwiK24ucytcIixcIithK1wiKVwifSxoc2xUb1JnYjpmdW5jdGlvbihlLHQsbil7dmFyIG89dm9pZCAwLGE9dm9pZCAwLGk9dm9pZCAwO2lmKDA9PT10KW89YT1pPW47ZWxzZXt2YXIgcj1mdW5jdGlvbihlLHQsbil7cmV0dXJuIG48MCYmKG4rPTEpLG4+MSYmKG4tPTEpLG48MS82P2UrNioodC1lKSpuOm48LjU/dDpuPDIvMz9lKyh0LWUpKigyLzMtbikqNjplfSxsPW48LjU/biooMSt0KTpuK3Qtbip0LHM9MipuLWw7bz1yKHMsbCxlKzEvMyksYT1yKHMsbCxlKSxpPXIocyxsLGUtMS8zKX1yZXR1cm5bTWF0aC5yb3VuZCgyNTUqbyksTWF0aC5yb3VuZCgyNTUqYSksTWF0aC5yb3VuZCgyNTUqaSldfSxyZ2JUb0hzbDpmdW5jdGlvbihlLHQsbil7ZS89MjU1LHQvPTI1NSxuLz0yNTU7dmFyIG89TWF0aC5tYXgoZSx0LG4pLGE9TWF0aC5taW4oZSx0LG4pLGk9dm9pZCAwLHI9dm9pZCAwLGw9KG8rYSkvMjtpZihvPT09YSlpPXI9MDtlbHNle3ZhciBzPW8tYTtzd2l0Y2gocj1sPi41P3MvKDItby1hKTpzLyhvK2EpLG8pe2Nhc2UgZTppPSh0LW4pL3MrKHQ8bj82OjApO2JyZWFrO2Nhc2UgdDppPShuLWUpL3MrMjticmVhaztjYXNlIG46aT0oZS10KS9zKzR9aS89Nn1yZXR1cm57Y3NzOlwiaHNsKFwiKyhpPU1hdGgucm91bmQoMzYwKmkpKStcIixcIisocj1NYXRoLnJvdW5kKDEwMCpyKStcIiVcIikrXCIsXCIrKGw9TWF0aC5yb3VuZCgxMDAqbCkrXCIlXCIpK1wiKVwiLGg6aSxzOnIsbDpsfX0scmdiVG9IZXg6ZnVuY3Rpb24oZSx0LG4pe3ZhciBvPU51bWJlcihlKS50b1N0cmluZygxNiksYT1OdW1iZXIodCkudG9TdHJpbmcoMTYpLGk9TnVtYmVyKG4pLnRvU3RyaW5nKDE2KTtyZXR1cm4gMT09PW8ubGVuZ3RoJiYobz1cIjBcIitvKSwxPT09YS5sZW5ndGgmJihhPVwiMFwiK2EpLDE9PT1pLmxlbmd0aCYmKGk9XCIwXCIraSksXCIjXCIrbythK2l9LHBlcmNlaXZlZEJyaWdodG5lc3M6ZnVuY3Rpb24oZSl7dmFyIHQ9dGhpcy5jb2xvcihlKS5yZ2I7cmV0dXJuIHQuci8yNTUqLjIxMjYrdC5nLzI1NSouNzE1Mit0LmIvMjU1Ki4wNzIyfSxhZGRTY3JpcHQ6ZnVuY3Rpb24oZSl7dmFyIHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOlwidGV4dC9qYXZhc2NyaXB0XCIsbj1hcmd1bWVudHNbMl0sbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpO28ub25sb2FkPW4sby5zcmM9ZSxvLnR5cGU9dCxkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG8pfSxhamF4OmZ1bmN0aW9uIGFqYXgob2JqLGFqYXhDb25maWcpe3ZhciBvYmpJc1BhbmVsPXZvaWQgMDtcIm9iamVjdFwiPT09KHZvaWQgMD09PW9iaj9cInVuZGVmaW5lZFwiOl90eXBlb2Yob2JqKSkmJm9iai5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsXCIpP29iaklzUGFuZWw9ITA6KG9iaklzUGFuZWw9ITEsXCJzdHJpbmdcIj09dHlwZW9mIG9iaiYmKG9iaj1kb2N1bWVudC5xdWVyeVNlbGVjdG9yKG9iaikpKTt2YXIgY29uZj1hamF4Q29uZmlnLGNvbmZpZ0RlZmF1bHRzPXttZXRob2Q6XCJHRVRcIixhc3luYzohMCx1c2VyOlwiXCIscHdkOlwiXCIsZG9uZTpmdW5jdGlvbigpe29iaklzUGFuZWw/b2JqLmNvbnRlbnQuaW5uZXJIVE1MPXRoaXMucmVzcG9uc2VUZXh0Om9iai5pbm5lckhUTUw9dGhpcy5yZXNwb25zZVRleHR9LGF1dG9yZXNpemU6ITAsYXV0b3JlcG9zaXRpb246ITB9LGNvbmZpZz12b2lkIDA7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGNvbmYpY29uZmlnPU9iamVjdC5hc3NpZ24oe30sY29uZmlnRGVmYXVsdHMse3VybDplbmNvZGVVUkkoY29uZiksZXZhbHNjcmlwdHRhZ3M6ITB9KTtlbHNle2lmKFwib2JqZWN0XCIhPT0odm9pZCAwPT09Y29uZj9cInVuZGVmaW5lZFwiOl90eXBlb2YoY29uZikpfHwhY29uZi51cmwpcmV0dXJuIGNvbnNvbGUuaW5mbyhcIlhNTEh0dHBSZXF1ZXN0IHNlZW1zIHRvIG1pc3MgdGhlIHJlcXVlc3QgdXJsIVwiKSxvYmo7Y29uZmlnPU9iamVjdC5hc3NpZ24oe30sY29uZmlnRGVmYXVsdHMsY29uZiksY29uZmlnLnVybD1lbmNvZGVVUkkoY29uZi51cmwpLCExPT09Y29uZmlnLmFzeW5jJiYoY29uZmlnLnRpbWVvdXQ9MCxjb25maWcud2l0aENyZWRlbnRpYWxzJiYoY29uZmlnLndpdGhDcmVkZW50aWFscz12b2lkIDApLGNvbmZpZy5yZXNwb25zZVR5cGUmJihjb25maWcucmVzcG9uc2VUeXBlPXZvaWQgMCkpfXZhciB4aHI9bmV3IFhNTEh0dHBSZXF1ZXN0O3JldHVybiB4aHIub25yZWFkeXN0YXRlY2hhbmdlPWZ1bmN0aW9uKCl7aWYoND09PXhoci5yZWFkeVN0YXRlKXtpZigyMDA9PT14aHIuc3RhdHVzKXtpZihjb25maWcuZG9uZS5jYWxsKHhocixvYmopLGNvbmZpZy5ldmFsc2NyaXB0dGFncyl7dmFyIHNjcmlwdHRhZ3M9eGhyLnJlc3BvbnNlVGV4dC5tYXRjaCgvPHNjcmlwdFxcYltePl0qPihbXFxzXFxTXSo/KTxcXC9zY3JpcHQ+L2dpKTtzY3JpcHR0YWdzJiZzY3JpcHR0YWdzLmZvckVhY2goZnVuY3Rpb24odGFnKXt2YXIganM9dGFnLnJlcGxhY2UoLzxzY3JpcHRcXGJbXj5dKj4vaSxcIlwiKS5yZXBsYWNlKC88XFwvc2NyaXB0Pi9pLFwiXCIpLnRyaW0oKTtldmFsKGpzKX0pfX1lbHNlIGNvbmZpZy5mYWlsJiZjb25maWcuZmFpbC5jYWxsKHhocixvYmopO2lmKGNvbmZpZy5hbHdheXMmJmNvbmZpZy5hbHdheXMuY2FsbCh4aHIsb2JqKSxvYmpJc1BhbmVsKXt2YXIgb0NvbnRlbnRTaXplPW9iai5vcHRpb25zLmNvbnRlbnRTaXplO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBvQ29udGVudFNpemUmJm9Db250ZW50U2l6ZS5tYXRjaCgvYXV0by9pKSl7dmFyIHBhcnRzPW9Db250ZW50U2l6ZS5zcGxpdChcIiBcIiksc2l6ZXM9T2JqZWN0LmFzc2lnbih7fSx7d2lkdGg6cGFydHNbMF0saGVpZ2h0OnBhcnRzWzFdfSk7Y29uZmlnLmF1dG9yZXNpemUmJm9iai5yZXNpemUoc2l6ZXMpLG9iai5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsLWNvbnRleHRtZW51XCIpfHxjb25maWcuYXV0b3JlcG9zaXRpb24mJm9iai5yZXBvc2l0aW9uKCl9ZWxzZSBpZihcIm9iamVjdFwiPT09KHZvaWQgMD09PW9Db250ZW50U2l6ZT9cInVuZGVmaW5lZFwiOl90eXBlb2Yob0NvbnRlbnRTaXplKSkmJihcImF1dG9cIj09PW9Db250ZW50U2l6ZS53aWR0aHx8XCJhdXRvXCI9PT1vQ29udGVudFNpemUuaGVpZ2h0KSl7dmFyIF9zaXplcz1PYmplY3QuYXNzaWduKHt9LG9Db250ZW50U2l6ZSk7Y29uZmlnLmF1dG9yZXNpemUmJm9iai5yZXNpemUoX3NpemVzKSxvYmouY2xhc3NMaXN0LmNvbnRhaW5zKFwianNQYW5lbC1jb250ZXh0bWVudVwiKXx8Y29uZmlnLmF1dG9yZXBvc2l0aW9uJiZvYmoucmVwb3NpdGlvbigpfX1qc1BhbmVsLmFqYXhBbHdheXNDYWxsYmFja3MubGVuZ3RoJiZqc1BhbmVsLmFqYXhBbHdheXNDYWxsYmFja3MuZm9yRWFjaChmdW5jdGlvbihlKXtlLmNhbGwob2JqLG9iail9KX19LHhoci5vcGVuKGNvbmZpZy5tZXRob2QsY29uZmlnLnVybCxjb25maWcuYXN5bmMsY29uZmlnLnVzZXIsY29uZmlnLnB3ZCkseGhyLnRpbWVvdXQ9Y29uZmlnLnRpbWVvdXR8fDAsY29uZmlnLndpdGhDcmVkZW50aWFscyYmKHhoci53aXRoQ3JlZGVudGlhbHM9Y29uZmlnLndpdGhDcmVkZW50aWFscyksY29uZmlnLnJlc3BvbnNlVHlwZSYmKHhoci5yZXNwb25zZVR5cGU9Y29uZmlnLnJlc3BvbnNlVHlwZSksY29uZmlnLmJlZm9yZVNlbmQmJmNvbmZpZy5iZWZvcmVTZW5kLmNhbGwoeGhyKSxjb25maWcuZGF0YT94aHIuc2VuZChjb25maWcuZGF0YSk6eGhyLnNlbmQobnVsbCksb2JqfSxjcmVhdGVQYW5lbFRlbXBsYXRlOmZ1bmN0aW9uKCl7dmFyIGU9IShhcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSl8fGFyZ3VtZW50c1swXSx0PWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7cmV0dXJuIHQuY2xhc3NOYW1lPVwianNQYW5lbFwiLGUmJltcImNsb3NlXCIsXCJtYXhpbWl6ZVwiLFwibm9ybWFsaXplXCIsXCJtaW5pbWl6ZVwiLFwic21hbGxpZnlcIixcInNtYWxsaWZ5cmV2XCJdLmZvckVhY2goZnVuY3Rpb24oZSl7dC5zZXRBdHRyaWJ1dGUoXCJkYXRhLWJ0blwiK2UsXCJlbmFibGVkXCIpfSksdC5pbm5lckhUTUw9JzxkaXYgY2xhc3M9XCJqc1BhbmVsLWhkclwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtaGVhZGVyYmFyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtaGVhZGVybG9nb1wiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLXRpdGxlYmFyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwianNQYW5lbC10aXRsZVwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1jb250cm9sYmFyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1zbWFsbGlmeVwiPicrdGhpcy5pY29ucy5zbWFsbGlmeSsnPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1zbWFsbGlmeXJldlwiPicrdGhpcy5pY29ucy5zbWFsbGlmeXJldisnPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1taW5pbWl6ZVwiPicrdGhpcy5pY29ucy5taW5pbWl6ZSsnPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1ub3JtYWxpemVcIj4nK3RoaXMuaWNvbnMubm9ybWFsaXplKyc8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW1heGltaXplXCI+Jyt0aGlzLmljb25zLm1heGltaXplKyc8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLWNsb3NlXCI+Jyt0aGlzLmljb25zLmNsb3NlKyc8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtaGRyLXRvb2xiYXJcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWNvbnRlbnRcIj48L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtbWluaW1pemVkLWJveFwiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1mdHJcIj48L2Rpdj4nLHR9LGNyZWF0ZU1pbmltaXplZFRlbXBsYXRlOmZ1bmN0aW9uKCl7dmFyIGU9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtyZXR1cm4gZS5jbGFzc05hbWU9XCJqc1BhbmVsLXJlcGxhY2VtZW50XCIsZS5pbm5lckhUTUw9JzxkaXYgY2xhc3M9XCJqc1BhbmVsLWhkclwiPlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtaGVhZGVyYmFyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtaGVhZGVybG9nb1wiPjwvZGl2PlxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLXRpdGxlYmFyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwianNQYW5lbC10aXRsZVwiPjwvc3Bhbj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwianNQYW5lbC1jb250cm9sYmFyXCI+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJqc1BhbmVsLWJ0biBqc1BhbmVsLWJ0bi1ub3JtYWxpemVcIj4nK3RoaXMuaWNvbnMubm9ybWFsaXplKyc8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLW1heGltaXplXCI+Jyt0aGlzLmljb25zLm1heGltaXplKyc8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImpzUGFuZWwtYnRuIGpzUGFuZWwtYnRuLWNsb3NlXCI+Jyt0aGlzLmljb25zLmNsb3NlK1wiPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XCIsZX0sY3JlYXRlU25hcEFyZWE6ZnVuY3Rpb24oZSx0LG4pe3ZhciBvPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIiksYT1lLnBhcmVudEVsZW1lbnQ7by5jbGFzc05hbWU9XCJqc1BhbmVsLXNuYXAtYXJlYSBqc1BhbmVsLXNuYXAtYXJlYS1cIit0LFwibHRcIj09PXR8fFwicnRcIj09PXR8fFwicmJcIj09PXR8fFwibGJcIj09PXQ/KG8uc3R5bGUud2lkdGg9bitcInB4XCIsby5zdHlsZS5oZWlnaHQ9bitcInB4XCIpOlwiY3RcIj09PXR8fFwiY2JcIj09PXQ/by5zdHlsZS5oZWlnaHQ9bitcInB4XCI6XCJsY1wiIT09dCYmXCJyY1wiIT09dHx8KG8uc3R5bGUud2lkdGg9bitcInB4XCIpLGEhPT1kb2N1bWVudC5ib2R5JiYoby5zdHlsZS5wb3NpdGlvbj1cImFic29sdXRlXCIpLGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1zbmFwLWFyZWEuanNQYW5lbC1zbmFwLWFyZWEtXCIrdCl8fGUucGFyZW50RWxlbWVudC5hcHBlbmRDaGlsZChvKX0sZHJhZ2l0OmZ1bmN0aW9uKGUpe3ZhciB0LG49YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnt9LG89dm9pZCAwLGE9T2JqZWN0LmFzc2lnbih7fSx0aGlzLmRlZmF1bHRzLmRyYWdpdCxuKSxpPXZvaWQgMCxyPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxkcmFnc3RhcnRcIix7ZGV0YWlsOmUuaWR9KSxsPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxkcmFnXCIse2RldGFpbDplLmlkfSkscz1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsZHJhZ3N0b3BcIix7ZGV0YWlsOmUuaWR9KTthLmdyaWQmJkFycmF5LmlzQXJyYXkoYS5ncmlkKSYmMT09PWEuZ3JpZC5sZW5ndGgmJihhLmdyaWRbMV09YS5ncmlkWzBdKSx0PXRoaXMucE9jb250YWlubWVudChhLmNvbnRhaW5tZW50KTt2YXIgYz1mdW5jdGlvbigpe2RvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoXCJtb3VzZW1vdmVcIixpKSxlLnN0eWxlLm9wYWNpdHk9MX07cmV0dXJuIGUucXVlcnlTZWxlY3RvckFsbChhLmhhbmRsZXMpLmZvckVhY2goZnVuY3Rpb24obil7bi5zdHlsZS50b3VjaEFjdGlvbj1cIm5vbmVcIixuLnN0eWxlLmN1cnNvcj1hLmN1cnNvcixqc1BhbmVsLnBvaW50ZXJkb3duLmZvckVhY2goZnVuY3Rpb24ocyl7bi5hZGRFdmVudExpc3RlbmVyKHMsZnVuY3Rpb24obil7aWYobi5wcmV2ZW50RGVmYXVsdCgpLG4uYnV0dG9uJiZuLmJ1dHRvbj4wKXJldHVybiExO2lmKCFuLnRhcmdldC5jbG9zZXN0KFwiLmpzUGFuZWwtZnRyLWJ0blwiKSl7ZS5jb250cm9sYmFyLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCIsZS5jb250ZW50LnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCI7dmFyIHM9d2luZG93LmdldENvbXB1dGVkU3R5bGUoZSksZD1wYXJzZUZsb2F0KHMubGVmdCkscD1wYXJzZUZsb2F0KHMudG9wKSxmPW4udG91Y2hlcz9uLnRvdWNoZXNbMF0uY2xpZW50WDpuLmNsaWVudFgsaD1uLnRvdWNoZXM/bi50b3VjaGVzWzBdLmNsaWVudFk6bi5jbGllbnRZLHU9ZS5wYXJlbnRFbGVtZW50LGc9dS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxtPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHUpLGI9ZS5nZXRTY2FsZUZhY3RvcigpLHk9MDtpPWZ1bmN0aW9uKG4pe2lmKG4ucHJldmVudERlZmF1bHQoKSwhbyl7aWYoZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChyKSxlLnN0eWxlLm9wYWNpdHk9YS5vcGFjaXR5LGUuc25hcHBlZCYmYS5zbmFwLnJlc2l6ZVRvUHJlU25hcCYmZS5jdXJyZW50RGF0YS5iZWZvcmVTbmFwKXtlLnJlc2l6ZShlLmN1cnJlbnREYXRhLmJlZm9yZVNuYXAud2lkdGgrXCIgXCIrZS5jdXJyZW50RGF0YS5iZWZvcmVTbmFwLmhlaWdodCk7dmFyIGk9ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxzPWYtKGkubGVmdCtpLndpZHRoKSxjPWkud2lkdGgvMjtzPi1jJiYoeT1zK2MpfWEuc3RhcnQmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhlLGEuc3RhcnQsITEse2xlZnQ6ZCx0b3A6cH0sbiksanNQYW5lbC5mcm9udChlKSxlLnNuYXBwZWQ9ITF9aWYobz0xLGEuZGlzYWJsZU9uTWF4aW1pemVkJiZcIm1heGltaXplZFwiPT09ZS5zdGF0dXMpcmV0dXJuITE7dmFyIHY9dm9pZCAwLHc9dm9pZCAwLGo9dm9pZCAwLEM9dm9pZCAwLEU9dm9pZCAwLEY9dm9pZCAwLFA9dm9pZCAwLHg9dm9pZCAwLHo9dm9pZCAwLFM9dm9pZCAwLEE9bi50b3VjaGVzP24udG91Y2hlc1swXS5jbGllbnRYOm4uY2xpZW50WCxCPW4udG91Y2hlcz9uLnRvdWNoZXNbMF0uY2xpZW50WTpuLmNsaWVudFksVD13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlKTtpZih1PT09ZG9jdW1lbnQuYm9keSl7dmFyIEw9ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTt6PXdpbmRvdy5pbm5lcldpZHRoLXBhcnNlSW50KG0uYm9yZGVyTGVmdFdpZHRoLDEwKS1wYXJzZUludChtLmJvcmRlclJpZ2h0V2lkdGgsMTApLShMLmxlZnQrTC53aWR0aCksUz13aW5kb3cuaW5uZXJIZWlnaHQtcGFyc2VJbnQobS5ib3JkZXJUb3BXaWR0aCwxMCktcGFyc2VJbnQobS5ib3JkZXJCb3R0b21XaWR0aCwxMCktKEwudG9wK0wuaGVpZ2h0KX1lbHNlIHo9cGFyc2VJbnQobS53aWR0aCwxMCktcGFyc2VJbnQobS5ib3JkZXJMZWZ0V2lkdGgsMTApLXBhcnNlSW50KG0uYm9yZGVyUmlnaHRXaWR0aCwxMCktKHBhcnNlSW50KFQubGVmdCwxMCkrcGFyc2VJbnQoVC53aWR0aCwxMCkpLFM9cGFyc2VJbnQobS5oZWlnaHQsMTApLXBhcnNlSW50KG0uYm9yZGVyVG9wV2lkdGgsMTApLXBhcnNlSW50KG0uYm9yZGVyQm90dG9tV2lkdGgsMTApLShwYXJzZUludChULnRvcCwxMCkrcGFyc2VJbnQoVC5oZWlnaHQsMTApKTt2PXBhcnNlRmxvYXQoVC5sZWZ0KSxqPXBhcnNlRmxvYXQoVC50b3ApLEU9eixQPVMsYS5zbmFwJiYoXCJwYW5lbFwiPT09YS5zbmFwLnRyaWdnZXI/dz1NYXRoLnBvdyh2LDIpOlwicG9pbnRlclwiPT09YS5zbmFwLnRyaWdnZXImJih2PUEsdz1NYXRoLnBvdyhBLDIpLGo9QixFPXdpbmRvdy5pbm5lcldpZHRoLUEsUD13aW5kb3cuaW5uZXJIZWlnaHQtQiksQz1NYXRoLnBvdyhqLDIpLEY9TWF0aC5wb3coRSwyKSx4PU1hdGgucG93KFAsMikpO3ZhciBEPU1hdGguc3FydCh3K0MpLGs9TWF0aC5zcXJ0KHcreCkscT1NYXRoLnNxcnQoRitDKSxSPU1hdGguc3FydChGK3gpLFc9TWF0aC5hYnModi1FKS8yLE09TWF0aC5hYnMoai1QKS8yLE89TWF0aC5zcXJ0KHcrTWF0aC5wb3coTSwyKSksST1NYXRoLnNxcnQoQytNYXRoLnBvdyhXLDIpKSwkPU1hdGguc3FydChGK01hdGgucG93KE0sMikpLEg9TWF0aC5zcXJ0KHgrTWF0aC5wb3coVywyKSk7aWYod2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobCksYS5heGlzJiZcInhcIiE9PWEuYXhpc3x8KGUuc3R5bGUubGVmdD1kKyhBLWYpL2IueCt5K1wicHhcIiksYS5heGlzJiZcInlcIiE9PWEuYXhpc3x8KGUuc3R5bGUudG9wPXArKEItaCkvYi55K1wicHhcIiksYS5ncmlkKXt2YXIgTj1hLmdyaWRbMF0qTWF0aC5yb3VuZCgoZCsoQS1mKSkvYS5ncmlkWzBdKSxYPWEuZ3JpZFsxXSpNYXRoLnJvdW5kKChwKyhCLWgpKS9hLmdyaWRbMV0pO2Uuc3R5bGUubGVmdD1OK1wicHhcIixlLnN0eWxlLnRvcD1YK1wicHhcIn1pZihhLmNvbnRhaW5tZW50fHwwPT09YS5jb250YWlubWVudCl7dmFyIFk9dm9pZCAwLF89dm9pZCAwO2lmKGUub3B0aW9ucy5jb250YWluZXI9PT1kb2N1bWVudC5ib2R5KVk9d2luZG93LmlubmVyV2lkdGgtcGFyc2VGbG9hdChULndpZHRoKS10WzFdLF89d2luZG93LmlubmVySGVpZ2h0LXBhcnNlRmxvYXQoVC5oZWlnaHQpLXRbMl07ZWxzZXt2YXIgVj1wYXJzZUZsb2F0KG0uYm9yZGVyTGVmdFdpZHRoKStwYXJzZUZsb2F0KG0uYm9yZGVyUmlnaHRXaWR0aCksVT1wYXJzZUZsb2F0KG0uYm9yZGVyVG9wV2lkdGgpK3BhcnNlRmxvYXQobS5ib3JkZXJCb3R0b21XaWR0aCk7WT1nLndpZHRoL2IueC1wYXJzZUZsb2F0KFQud2lkdGgpLXRbMV0tVixfPWcuaGVpZ2h0L2IueS1wYXJzZUZsb2F0KFQuaGVpZ2h0KS10WzJdLVV9cGFyc2VGbG9hdChlLnN0eWxlLmxlZnQpPD10WzNdJiYoZS5zdHlsZS5sZWZ0PXRbM10rXCJweFwiKSxwYXJzZUZsb2F0KGUuc3R5bGUudG9wKTw9dFswXSYmKGUuc3R5bGUudG9wPXRbMF0rXCJweFwiKSxwYXJzZUZsb2F0KGUuc3R5bGUubGVmdCk+PVkmJihlLnN0eWxlLmxlZnQ9WStcInB4XCIpLHBhcnNlRmxvYXQoZS5zdHlsZS50b3ApPj1fJiYoZS5zdHlsZS50b3A9XytcInB4XCIpfWlmKGEuZHJhZyYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKGUsYS5kcmFnLCExLHtsZWZ0OnYsdG9wOmoscmlnaHQ6RSxib3R0b206UH0sbiksYS5zbmFwKXt2YXIgWj1hLnNuYXAuc2Vuc2l0aXZpdHksRz11PT09ZG9jdW1lbnQuYm9keT93aW5kb3cuaW5uZXJXaWR0aC84Omcud2lkdGgvOCxKPXU9PT1kb2N1bWVudC5ib2R5P3dpbmRvdy5pbm5lckhlaWdodC84OmcuaGVpZ2h0Lzg7ZS5zbmFwcGFibGVUbz0hMSxqc1BhbmVsLnJlbW92ZVNuYXBBcmVhcygpLEQ8Wj8oZS5zbmFwcGFibGVUbz1cImxlZnQtdG9wXCIsITEhPT1hLnNuYXAuc25hcExlZnRUb3AmJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEoZSxcImx0XCIsWikpOms8Wj8oZS5zbmFwcGFibGVUbz1cImxlZnQtYm90dG9tXCIsITEhPT1hLnNuYXAuc25hcExlZnRCb3R0b20mJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEoZSxcImxiXCIsWikpOnE8Wj8oZS5zbmFwcGFibGVUbz1cInJpZ2h0LXRvcFwiLCExIT09YS5zbmFwLnNuYXBSaWdodFRvcCYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYShlLFwicnRcIixaKSk6UjxaPyhlLnNuYXBwYWJsZVRvPVwicmlnaHQtYm90dG9tXCIsITEhPT1hLnNuYXAuc25hcFJpZ2h0Qm90dG9tJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKGUsXCJyYlwiLFopKTpqPFomJkk8Rz8oZS5zbmFwcGFibGVUbz1cImNlbnRlci10b3BcIiwhMSE9PWEuc25hcC5zbmFwQ2VudGVyVG9wJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKGUsXCJjdFwiLFopKTp2PFomJk88Sj8oZS5zbmFwcGFibGVUbz1cImxlZnQtY2VudGVyXCIsITEhPT1hLnNuYXAuc25hcExlZnRDZW50ZXImJmpzUGFuZWwuY3JlYXRlU25hcEFyZWEoZSxcImxjXCIsWikpOkU8WiYmJDxKPyhlLnNuYXBwYWJsZVRvPVwicmlnaHQtY2VudGVyXCIsITEhPT1hLnNuYXAuc25hcFJpZ2h0Q2VudGVyJiZqc1BhbmVsLmNyZWF0ZVNuYXBBcmVhKGUsXCJyY1wiLFopKTpQPFomJkg8RyYmKGUuc25hcHBhYmxlVG89XCJjZW50ZXItYm90dG9tXCIsITEhPT1hLnNuYXAuc25hcENlbnRlckJvdHRvbSYmanNQYW5lbC5jcmVhdGVTbmFwQXJlYShlLFwiY2JcIixaKSl9fSxqc1BhbmVsLnBvaW50ZXJtb3ZlLmZvckVhY2goZnVuY3Rpb24oZSl7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihlLGkpfSksZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIixjKX19KX0pLGpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24odCl7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0LGZ1bmN0aW9uKHQpe2pzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbihlKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGUsaSl9KSxkb2N1bWVudC5ib2R5LnN0eWxlLm92ZXJmbG93PVwiaW5oZXJpdFwiLGpzUGFuZWwucmVtb3ZlU25hcEFyZWFzKCksbyYmKGRvY3VtZW50LmRpc3BhdGNoRXZlbnQocyksZS5zdHlsZS5vcGFjaXR5PTEsbz12b2lkIDAsZS5zYXZlQ3VycmVudFBvc2l0aW9uKCksZS5jYWxjU2l6ZUZhY3RvcnMoKSxhLnNuYXAmJihcImxlZnQtdG9wXCI9PT1lLnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKGUsYS5zbmFwLnNuYXBMZWZ0VG9wKTpcImNlbnRlci10b3BcIj09PWUuc25hcHBhYmxlVG8/anNQYW5lbC5zbmFwUGFuZWwoZSxhLnNuYXAuc25hcENlbnRlclRvcCk6XCJyaWdodC10b3BcIj09PWUuc25hcHBhYmxlVG8/anNQYW5lbC5zbmFwUGFuZWwoZSxhLnNuYXAuc25hcFJpZ2h0VG9wKTpcInJpZ2h0LWNlbnRlclwiPT09ZS5zbmFwcGFibGVUbz9qc1BhbmVsLnNuYXBQYW5lbChlLGEuc25hcC5zbmFwUmlnaHRDZW50ZXIpOlwicmlnaHQtYm90dG9tXCI9PT1lLnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKGUsYS5zbmFwLnNuYXBSaWdodEJvdHRvbSk6XCJjZW50ZXItYm90dG9tXCI9PT1lLnNuYXBwYWJsZVRvP2pzUGFuZWwuc25hcFBhbmVsKGUsYS5zbmFwLnNuYXBDZW50ZXJCb3R0b20pOlwibGVmdC1ib3R0b21cIj09PWUuc25hcHBhYmxlVG8/anNQYW5lbC5zbmFwUGFuZWwoZSxhLnNuYXAuc25hcExlZnRCb3R0b20pOlwibGVmdC1jZW50ZXJcIj09PWUuc25hcHBhYmxlVG8mJmpzUGFuZWwuc25hcFBhbmVsKGUsYS5zbmFwLnNuYXBMZWZ0Q2VudGVyKSxhLnNuYXAuY2FsbGJhY2smJmUuc25hcHBhYmxlVG8mJlwiZnVuY3Rpb25cIj09dHlwZW9mIGEuc25hcC5jYWxsYmFjayYmYS5zbmFwLmNhbGxiYWNrLmNhbGwoZSxlKSxlLnNuYXBwYWJsZVRvJiZhLnNuYXAucmVwb3NpdGlvbk9uU25hcCYmZS5yZXBvc2l0aW9uT25TbmFwKGUuc25hcHBhYmxlVG8pKSxhLnN0b3AmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhlLGEuc3RvcCwhMSx7bGVmdDpwYXJzZUZsb2F0KGUuc3R5bGUubGVmdCksdG9wOnBhcnNlRmxvYXQoZS5zdHlsZS50b3ApfSx0KSksZS5jb250cm9sYmFyLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJpbmhlcml0XCIsZS5jb250ZW50LnN0eWxlLnBvaW50ZXJFdmVudHM9XCJpbmhlcml0XCIsZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcIm1vdXNlbGVhdmVcIixjKX0pfSksYS5kaXNhYmxlJiYobi5zdHlsZS5wb2ludGVyRXZlbnRzPVwibm9uZVwiKX0pLGV9LGVtcHR5Tm9kZTpmdW5jdGlvbihlKXtmb3IoO2UuZmlyc3RDaGlsZDspZS5yZW1vdmVDaGlsZChlLmZpcnN0Q2hpbGQpO3JldHVybiBlfSxleHRlbmQ6ZnVuY3Rpb24oZSl7aWYoXCJbb2JqZWN0IE9iamVjdF1cIj09PU9iamVjdC5wcm90b3R5cGUudG9TdHJpbmcuY2FsbChlKSlmb3IodmFyIHQgaW4gZSllLmhhc093blByb3BlcnR5KHQpJiYodGhpcy5leHRlbnNpb25zW3RdPWVbdF0pfSxmZXRjaDpmdW5jdGlvbihlKXtmdW5jdGlvbiB0KHQpe3JldHVybiBlLmFwcGx5KHRoaXMsYXJndW1lbnRzKX1yZXR1cm4gdC50b1N0cmluZz1mdW5jdGlvbigpe3JldHVybiBlLnRvU3RyaW5nKCl9LHR9KGZ1bmN0aW9uKG9iail7dmFyIGNvbmY9b2JqLm9wdGlvbnMuY29udGVudEZldGNoLGNvbmZEZWZhdWx0cz17Ym9keU1ldGhvZDpcInRleHRcIixldmFsc2NyaXB0dGFnczohMCxhdXRvcmVzaXplOiEwLGF1dG9yZXBvc2l0aW9uOiEwLGRvbmU6ZnVuY3Rpb24oZSx0KXtlLmNvbnRlbnQuaW5uZXJIVE1MPXR9fTtjb25mPVwic3RyaW5nXCI9PXR5cGVvZiBjb25mP09iamVjdC5hc3NpZ24oe3Jlc291cmNlOm9iai5vcHRpb25zLmNvbnRlbnRGZXRjaH0sY29uZkRlZmF1bHRzKTpPYmplY3QuYXNzaWduKGNvbmZEZWZhdWx0cyxjb25mKTt2YXIgZmV0Y2hJbml0PWNvbmYuZmV0Y2hJbml0fHx7fTtjb25mLmJlZm9yZVNlbmQmJmNvbmYuYmVmb3JlU2VuZC5jYWxsKG9iaixvYmopLGZldGNoKGNvbmYucmVzb3VyY2UsZmV0Y2hJbml0KS50aGVuKGZ1bmN0aW9uKGUpe2lmKGUub2spcmV0dXJuIGVbY29uZi5ib2R5TWV0aG9kXSgpO3Rocm93IG5ldyBFcnJvcihcIk5ldHdvcmsgcmVzcG9uc2Ugd2FzIG5vdCBvay5cIil9KS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKXtpZihjb25mLmRvbmUuY2FsbChvYmosb2JqLHJlc3BvbnNlKSxjb25mLmV2YWxzY3JpcHR0YWdzKXt2YXIgc2NyaXB0dGFncz1yZXNwb25zZS5tYXRjaCgvPHNjcmlwdFxcYltePl0qPihbXFxzXFxTXSo/KTxcXC9zY3JpcHQ+L2dpKTtzY3JpcHR0YWdzJiZzY3JpcHR0YWdzLmZvckVhY2goZnVuY3Rpb24odGFnKXt2YXIganM9dGFnLnJlcGxhY2UoLzxzY3JpcHRcXGJbXj5dKj4vaSxcIlwiKS5yZXBsYWNlKC88XFwvc2NyaXB0Pi9pLFwiXCIpLnRyaW0oKTtldmFsKGpzKX0pfXZhciBvQ29udGVudFNpemU9b2JqLm9wdGlvbnMuY29udGVudFNpemU7aWYoY29uZi5hdXRvcmVzaXplfHxjb25mLmF1dG9yZXBvc2l0aW9uKWlmKFwic3RyaW5nXCI9PXR5cGVvZiBvQ29udGVudFNpemUmJm9Db250ZW50U2l6ZS5tYXRjaCgvYXV0by9pKSl7dmFyIHBhcnRzPW9Db250ZW50U2l6ZS5zcGxpdChcIiBcIiksc2l6ZXM9T2JqZWN0LmFzc2lnbih7fSx7d2lkdGg6cGFydHNbMF0saGVpZ2h0OnBhcnRzWzFdfSk7Y29uZi5hdXRvcmVzaXplJiZvYmoucmVzaXplKHNpemVzKSxvYmouY2xhc3NMaXN0LmNvbnRhaW5zKFwianNQYW5lbC1jb250ZXh0bWVudVwiKXx8Y29uZi5hdXRvcmVwb3NpdGlvbiYmb2JqLnJlcG9zaXRpb24oKX1lbHNlIGlmKFwib2JqZWN0XCI9PT0odm9pZCAwPT09b0NvbnRlbnRTaXplP1widW5kZWZpbmVkXCI6X3R5cGVvZihvQ29udGVudFNpemUpKSYmKFwiYXV0b1wiPT09b0NvbnRlbnRTaXplLndpZHRofHxcImF1dG9cIj09PW9Db250ZW50U2l6ZS5oZWlnaHQpKXt2YXIgX3NpemVzMj1PYmplY3QuYXNzaWduKHt9LG9Db250ZW50U2l6ZSk7Y29uZi5hdXRvcmVzaXplJiZvYmoucmVzaXplKF9zaXplczIpLG9iai5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsLWNvbnRleHRtZW51XCIpfHxjb25mLmF1dG9yZXBvc2l0aW9uJiZvYmoucmVwb3NpdGlvbigpfX0pLmNhdGNoKGZ1bmN0aW9uKGUpe2NvbnNvbGUuZXJyb3IoXCJUaGVyZSBoYXMgYmVlbiBhIHByb2JsZW0gd2l0aCB5b3VyIGZldGNoIG9wZXJhdGlvbjogXCIrZS5tZXNzYWdlKX0pfSksZnJvbnQ6ZnVuY3Rpb24oZSl7aWYoXCJtaW5pbWl6ZWRcIj09PWUuc3RhdHVzKVwibWF4aW1pemVkXCI9PT1lLnN0YXR1c0JlZm9yZT9lLm1heGltaXplKCk6ZS5ub3JtYWxpemUoKTtlbHNle3ZhciB0PUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1zdGFuZGFyZFwiKSkubWFwKGZ1bmN0aW9uKGUpe3JldHVybiBlLnN0eWxlLnpJbmRleH0pO01hdGgubWF4LmFwcGx5KE1hdGgsX3RvQ29uc3VtYWJsZUFycmF5KHQpKT5lLnN0eWxlLnpJbmRleCYmKGUuc3R5bGUuekluZGV4PWpzUGFuZWwuemkubmV4dCgpKSx0aGlzLnJlc2V0WmkoKX10aGlzLmdldFBhbmVscygpLmZvckVhY2goZnVuY3Rpb24oZSx0KXt2YXIgbj1lLmNvbnRlbnQucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWlmcmFtZS1vdmVybGF5XCIpO2lmKHQ+MCl7aWYoZS5jb250ZW50LnF1ZXJ5U2VsZWN0b3IoXCJpZnJhbWVcIikmJiFuKXt2YXIgbz1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO28uY2xhc3NOYW1lPVwianNQYW5lbC1pZnJhbWUtb3ZlcmxheVwiLGUuY29udGVudC5hcHBlbmRDaGlsZChvKX19ZWxzZSBuJiZlLmNvbnRlbnQucmVtb3ZlQ2hpbGQobil9KX0sZ2V0UGFuZWxzOmZ1bmN0aW9uKCl7dmFyIGU9YXJndW1lbnRzLmxlbmd0aD4wJiZ2b2lkIDAhPT1hcmd1bWVudHNbMF0/YXJndW1lbnRzWzBdOmZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuY2xhc3NMaXN0LmNvbnRhaW5zKFwianNQYW5lbC1zdGFuZGFyZFwiKX07cmV0dXJuIEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbFwiKSkuZmlsdGVyKGZ1bmN0aW9uKHQpe3JldHVybiBlLmNhbGwodCx0KX0pLnNvcnQoZnVuY3Rpb24oZSx0KXtyZXR1cm4gdC5zdHlsZS56SW5kZXgtZS5zdHlsZS56SW5kZXh9KX0sb3ZlcmxhcHM6ZnVuY3Rpb24oZSx0LG4pe3ZhciBvPVwic3RyaW5nXCI9PXR5cGVvZiBlP2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoZSk6ZSxhPXZvaWQgMCxpPW8uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkscj17dG9wOjAscmlnaHQ6MCxib3R0b206MCxsZWZ0OjB9LGw9by5nZXRTY2FsZUZhY3RvcigpLHM9Z2V0Q29tcHV0ZWRTdHlsZShvLnBhcmVudEVsZW1lbnQpO3JldHVyblwid2luZG93XCIhPT1vLm9wdGlvbnMuY29udGFpbmVyJiZcInBhZGRpbmdib3hcIj09PW4mJihyPXt0b3A6cGFyc2VJbnQocy5ib3JkZXJUb3BXaWR0aCwxMCkqbC55LHJpZ2h0OnBhcnNlSW50KHMuYm9yZGVyUmlnaHRXaWR0aCwxMCkqbC54LGJvdHRvbTpwYXJzZUludChzLmJvcmRlckJvdHRvbVdpZHRoLDEwKSpsLnksbGVmdDpwYXJzZUludChzLmJvcmRlckxlZnRXaWR0aCwxMCkqbC54fSksYT1cInN0cmluZ1wiPT10eXBlb2YgdD9cIndpbmRvd1wiPT09dD97bGVmdDowLHRvcDowLHJpZ2h0OndpbmRvdy5pbm5lcldpZHRoLGJvdHRvbTp3aW5kb3cuaW5uZXJIZWlnaHR9OlwicGFyZW50XCI9PT10P28ucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTpkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHQpLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpOnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkse3RvcDppLnRvcC1hLnRvcC1yLnRvcCxyaWdodDphLnJpZ2h0LWkucmlnaHQtci5yaWdodCxib3R0b206YS5ib3R0b20taS5ib3R0b20tci5ib3R0b20sbGVmdDppLmxlZnQtYS5sZWZ0LXIubGVmdCxwYXJlbnRCb3JkZXJXaWR0aDpyLHBhbmVsUmVjdDppfX0scE9jb250YWluZXI6ZnVuY3Rpb24oZSl7aWYoZSl7aWYoXCJzdHJpbmdcIj09dHlwZW9mIGUpcmV0dXJuXCJ3aW5kb3dcIj09PWU/ZG9jdW1lbnQuYm9keTpkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGUpO2lmKDE9PT1lLm5vZGVUeXBlKXJldHVybiBlO2lmKGUubGVuZ3RoKXJldHVybiBlWzBdfXJldHVybiExfSxwT2NvbnRhaW5tZW50OmZ1bmN0aW9uKGUpe3ZhciB0PWU7aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKHQ9ZSgpKSxcIm51bWJlclwiPT10eXBlb2YgdClyZXR1cm5bdCx0LHQsdF07aWYoQXJyYXkuaXNBcnJheSh0KSl7aWYoMT09PXQubGVuZ3RoKXJldHVyblt0WzBdLHRbMF0sdFswXSx0WzBdXTtpZigyPT09dC5sZW5ndGgpcmV0dXJuIHQuY29uY2F0KHQpOzM9PT10Lmxlbmd0aCYmKHRbM109dFsxXSl9cmV0dXJuIHR9LHBPc2l6ZTpmdW5jdGlvbihlLHQpe3ZhciBuPXR8fHRoaXMuZGVmYXVsdHMuY29udGVudFNpemUsbz1lLnBhcmVudEVsZW1lbnQ7aWYoXCJzdHJpbmdcIj09dHlwZW9mIG4pe3ZhciBhPW4udHJpbSgpLnNwbGl0KFwiIFwiKTsobj17fSkud2lkdGg9YVswXSwyPT09YS5sZW5ndGg/bi5oZWlnaHQ9YVsxXTpuLmhlaWdodD1hWzBdfWVsc2Ugbi53aWR0aCYmIW4uaGVpZ2h0P24uaGVpZ2h0PW4ud2lkdGg6bi5oZWlnaHQmJiFuLndpZHRoJiYobi53aWR0aD1uLmhlaWdodCk7aWYoU3RyaW5nKG4ud2lkdGgpLm1hdGNoKC9eWzAtOS5dKyQvZ2kpKW4ud2lkdGgrPVwicHhcIjtlbHNlIGlmKFwic3RyaW5nXCI9PXR5cGVvZiBuLndpZHRoJiZuLndpZHRoLmVuZHNXaXRoKFwiJVwiKSlpZihvPT09ZG9jdW1lbnQuYm9keSluLndpZHRoPXdpbmRvdy5pbm5lcldpZHRoKihwYXJzZUZsb2F0KG4ud2lkdGgpLzEwMCkrXCJweFwiO2Vsc2V7dmFyIGk9d2luZG93LmdldENvbXB1dGVkU3R5bGUobykscj1wYXJzZUZsb2F0KGkuYm9yZGVyTGVmdFdpZHRoKStwYXJzZUZsb2F0KGkuYm9yZGVyUmlnaHRXaWR0aCk7bi53aWR0aD0ocGFyc2VGbG9hdChpLndpZHRoKS1yKSoocGFyc2VGbG9hdChuLndpZHRoKS8xMDApK1wicHhcIn1lbHNlXCJmdW5jdGlvblwiPT10eXBlb2Ygbi53aWR0aCYmKG4ud2lkdGg9bi53aWR0aC5jYWxsKGUsZSksXCJudW1iZXJcIj09dHlwZW9mIG4ud2lkdGg/bi53aWR0aCs9XCJweFwiOlwic3RyaW5nXCI9PXR5cGVvZiBuLndpZHRoJiZuLndpZHRoLm1hdGNoKC9eWzAtOS5dKyQvZ2kpJiYobi53aWR0aCs9XCJweFwiKSk7aWYoU3RyaW5nKG4uaGVpZ2h0KS5tYXRjaCgvXlswLTkuXSskL2dpKSluLmhlaWdodCs9XCJweFwiO2Vsc2UgaWYoXCJzdHJpbmdcIj09dHlwZW9mIG4uaGVpZ2h0JiZuLmhlaWdodC5lbmRzV2l0aChcIiVcIikpaWYobz09PWRvY3VtZW50LmJvZHkpbi5oZWlnaHQ9d2luZG93LmlubmVySGVpZ2h0KihwYXJzZUZsb2F0KG4uaGVpZ2h0KS8xMDApK1wicHhcIjtlbHNle3ZhciBsPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG8pLHM9cGFyc2VGbG9hdChsLmJvcmRlclRvcFdpZHRoKStwYXJzZUZsb2F0KGwuYm9yZGVyQm90dG9tV2lkdGgpO24uaGVpZ2h0PShwYXJzZUZsb2F0KGwuaGVpZ2h0KS1zKSoocGFyc2VGbG9hdChuLmhlaWdodCkvMTAwKStcInB4XCJ9ZWxzZVwiZnVuY3Rpb25cIj09dHlwZW9mIG4uaGVpZ2h0JiYobi5oZWlnaHQ9bi5oZWlnaHQuY2FsbChlLGUpLFwibnVtYmVyXCI9PXR5cGVvZiBuLmhlaWdodD9uLmhlaWdodCs9XCJweFwiOlwic3RyaW5nXCI9PXR5cGVvZiBuLmhlaWdodCYmbi5oZWlnaHQubWF0Y2goL15bMC05Ll0rJC9naSkmJihuLmhlaWdodCs9XCJweFwiKSk7cmV0dXJuIG59LHBPcG9zaXRpb246ZnVuY3Rpb24oZSl7dmFyIHQ9ZS5tYXRjaCgvXFxiW2Etel17NCw2fS17MX1bYS16XXszLDZ9XFxiL2kpLG49ZS5tYXRjaCgvZG93bnx1cHxyaWdodChbXi1dfCQpfGxlZnQoW14tXXwkKS9pKSxvPWUubWF0Y2goL1srLV0/XFxkP1xcLj9cXGQrKFthLXolXXsyLDR9XFxifCU/KS9naSksYT12b2lkIDA7cmV0dXJuIGE9dD97bXk6dFswXS50b0xvd2VyQ2FzZSgpLGF0OnRbMF0udG9Mb3dlckNhc2UoKX06e215OlwiY2VudGVyXCIsYXQ6XCJjZW50ZXJcIn0sbiYmKGEuYXV0b3Bvc2l0aW9uPW5bMF0udG9Mb3dlckNhc2UoKSksbyYmKG8uZm9yRWFjaChmdW5jdGlvbihlLHQpe2UubWF0Y2goL15bKy1dP1swLTldKiQvKSYmKG9bdF0rPVwicHhcIiksb1t0XT1vW3RdLnRvTG93ZXJDYXNlKCl9KSwxPT09by5sZW5ndGg/KGEub2Zmc2V0WD1vWzBdLGEub2Zmc2V0WT1vWzBdKTooYS5vZmZzZXRYPW9bMF0sYS5vZmZzZXRZPW9bMV0pKSxhfSxwb3NpdGlvbjpmdW5jdGlvbihlLHQpe3ZhciBuPXZvaWQgMCxvPXZvaWQgMCxhPXZvaWQgMCxpPXtsZWZ0OjAsdG9wOjB9LHI9MCxsPTAscz0wLGM9MCxkPXtteTpcImNlbnRlclwiLGF0OlwiY2VudGVyXCIsb2Y6XCJ3aW5kb3dcIixvZmZzZXRYOlwiMHB4XCIsb2Zmc2V0WTpcIjBweFwifTtlLm9wdGlvbnMuY29udGFpbmVyPT09ZG9jdW1lbnQuYm9keSYmKGQub2Y9ZG9jdW1lbnQuYm9keSk7dmFyIHA9e3dpZHRoOmRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aCxoZWlnaHQ6d2luZG93LmlubmVySGVpZ2h0fSxmPXBhZ2VYT2Zmc2V0LGg9cGFnZVlPZmZzZXQ7aWYobj1cInN0cmluZ1wiPT10eXBlb2YgZT9kb2N1bWVudC5xdWVyeVNlbGVjdG9yKGUpOmUsIXQpcmV0dXJuIG4uc3R5bGUub3BhY2l0eT0xLG47dmFyIHU9bi5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcInN0cmluZ1wiPT10eXBlb2YgdD9vPU9iamVjdC5hc3NpZ24oe30sZCxqc1BhbmVsLnBPcG9zaXRpb24odCkpOihvPU9iamVjdC5hc3NpZ24oe30sZCx0KSxbXCJteVwiLFwiYXRcIixcIm9mXCIsXCJvZmZzZXRYXCIsXCJvZmZzZXRZXCIsXCJtaW5MZWZ0XCIsXCJtYXhMZWZ0XCIsXCJtaW5Ub3BcIixcIm1heFRvcFwiXS5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wiZnVuY3Rpb25cIj09dHlwZW9mIG9bdF0mJihvW3RdPW9bdF0uY2FsbChlLGUpKX0pKTt2YXIgZz1uLnBhcmVudEVsZW1lbnQsbT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShnKSxiPWcuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkseT1nLnRhZ05hbWUudG9Mb3dlckNhc2UoKTtpZihvLm9mJiZcIndpbmRvd1wiIT09by5vZiYmKGE9XCJzdHJpbmdcIj09dHlwZW9mIG8ub2Y/ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihvLm9mKTpvLm9mKSxvLm15Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpP3I9dS53aWR0aC8yOm8ubXkubWF0Y2goL3JpZ2h0L2kpJiYocj11LndpZHRoKSxvLm15Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpP2w9dS5oZWlnaHQvMjpvLm15Lm1hdGNoKC9ib3R0b20vaSkmJihsPXUuaGVpZ2h0KSxcIndpbmRvd1wiPT09ZS5vcHRpb25zLmNvbnRhaW5lciYmXCJib2R5XCI9PT15JiZcIndpbmRvd1wiPT09by5vZilvLmF0Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpP3M9cC53aWR0aC8yOm8uYXQubWF0Y2goL3JpZ2h0L2kpJiYocz1wLndpZHRoKSxvLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpP2M9cC5oZWlnaHQvMjpvLmF0Lm1hdGNoKC9ib3R0b20vaSkmJihjPXAuaGVpZ2h0KSxpLmxlZnQ9cy1yLXBhcnNlRmxvYXQobS5ib3JkZXJMZWZ0V2lkdGgpLGkudG9wPWMtbC1wYXJzZUZsb2F0KG0uYm9yZGVyVG9wV2lkdGgpLG4uc3R5bGUucG9zaXRpb249XCJmaXhlZFwiO2Vsc2UgaWYoXCJib2R5XCI9PT15JiZcIndpbmRvd1wiIT09by5vZil7dmFyIHY9YS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtzPW8uYXQubWF0Y2goL15jZW50ZXItdG9wJHxeY2VudGVyJHxeY2VudGVyLWJvdHRvbSQvaSk/di53aWR0aC8yK3YubGVmdCtmOm8uYXQubWF0Y2goL3JpZ2h0L2kpP3Yud2lkdGgrdi5sZWZ0K2Y6di5sZWZ0K2YsYz1vLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpP3YuaGVpZ2h0LzIrdi50b3AraDpvLmF0Lm1hdGNoKC9ib3R0b20vaSk/di5oZWlnaHQrdi50b3AraDp2LnRvcCtoLGkubGVmdD1zLXItcGFyc2VGbG9hdChtLmJvcmRlckxlZnRXaWR0aCksaS50b3A9Yy1sLXBhcnNlRmxvYXQobS5ib3JkZXJUb3BXaWR0aCl9ZWxzZSBpZihcImJvZHlcIj09PXl8fFwid2luZG93XCIhPT1vLm9mJiZvLm9mKXtpZihcImJvZHlcIiE9PXkmJmcuY29udGFpbnMoYSkpe3ZhciB3PWEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7cz1vLmF0Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpP3cubGVmdC1iLmxlZnQrdy53aWR0aC8yOm8uYXQubWF0Y2goL3JpZ2h0L2kpP3cubGVmdC1iLmxlZnQrdy53aWR0aDp3LmxlZnQtYi5sZWZ0LGM9by5hdC5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKT93LnRvcC1iLnRvcCt3LmhlaWdodC8yOm8uYXQubWF0Y2goL2JvdHRvbS9pKT93LnRvcC1iLnRvcCt3LmhlaWdodDp3LnRvcC1iLnRvcCxpLmxlZnQ9cy1yLXBhcnNlRmxvYXQobS5ib3JkZXJMZWZ0V2lkdGgpLGkudG9wPWMtbC1wYXJzZUZsb2F0KG0uYm9yZGVyVG9wV2lkdGgpfX1lbHNle3ZhciBqPXBhcnNlRmxvYXQobS5ib3JkZXJMZWZ0V2lkdGgpK3BhcnNlRmxvYXQobS5ib3JkZXJSaWdodFdpZHRoKSxDPXBhcnNlRmxvYXQobS5ib3JkZXJUb3BXaWR0aCkrcGFyc2VGbG9hdChtLmJvcmRlckJvdHRvbVdpZHRoKTtvLmF0Lm1hdGNoKC9eY2VudGVyLXRvcCR8XmNlbnRlciR8XmNlbnRlci1ib3R0b20kL2kpP3M9Yi53aWR0aC8yLWovMjpvLmF0Lm1hdGNoKC9yaWdodC9pKSYmKHM9Yi53aWR0aC1qKSxvLmF0Lm1hdGNoKC9ebGVmdC1jZW50ZXIkfF5jZW50ZXIkfF5yaWdodC1jZW50ZXIkL2kpP2M9Yi5oZWlnaHQvMi1DLzI6by5hdC5tYXRjaCgvYm90dG9tL2kpJiYoYz1iLmhlaWdodC1DKSxpLmxlZnQ9cy1yLGkudG9wPWMtbH1pZihvLmF1dG9wb3NpdGlvbiYmby5teT09PW8uYXQmJltcImxlZnQtdG9wXCIsXCJjZW50ZXItdG9wXCIsXCJyaWdodC10b3BcIixcImxlZnQtYm90dG9tXCIsXCJjZW50ZXItYm90dG9tXCIsXCJyaWdodC1ib3R0b21cIl0uaW5kZXhPZihvLm15KT49MCl7XCJmdW5jdGlvblwiPT10eXBlb2Ygby5hdXRvcG9zaXRpb24mJihvLmF1dG9wb3NpdGlvbj1vLmF1dG9wb3NpdGlvbigpKTt2YXIgRT1vLm15K1wiLVwiK28uYXV0b3Bvc2l0aW9uLnRvTG93ZXJDYXNlKCk7bi5jbGFzc0xpc3QuYWRkKEUpO3ZhciBGPUFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrRSkpLFA9Ri5pbmRleE9mKG4pO0YubGVuZ3RoPjEmJihcImRvd25cIj09PW8uYXV0b3Bvc2l0aW9uP0YuZm9yRWFjaChmdW5jdGlvbihlLHQpe3Q+MCYmdDw9UCYmKGkudG9wKz1GWy0tdF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkuaGVpZ2h0K2pzUGFuZWwuYXV0b3Bvc2l0aW9uU3BhY2luZyl9KTpcInVwXCI9PT1vLmF1dG9wb3NpdGlvbj9GLmZvckVhY2goZnVuY3Rpb24oZSx0KXt0PjAmJnQ8PVAmJihpLnRvcC09RlstLXRdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLmhlaWdodCtqc1BhbmVsLmF1dG9wb3NpdGlvblNwYWNpbmcpfSk6XCJyaWdodFwiPT09by5hdXRvcG9zaXRpb24/Ri5mb3JFYWNoKGZ1bmN0aW9uKGUsdCl7dD4wJiZ0PD1QJiYoaS5sZWZ0Kz1GWy0tdF0uZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGgranNQYW5lbC5hdXRvcG9zaXRpb25TcGFjaW5nKX0pOlwibGVmdFwiPT09by5hdXRvcG9zaXRpb24mJkYuZm9yRWFjaChmdW5jdGlvbihlLHQpe3Q+MCYmdDw9UCYmKGkubGVmdC09RlstLXRdLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoK2pzUGFuZWwuYXV0b3Bvc2l0aW9uU3BhY2luZyl9KSl9dmFyIHg9bi5nZXRTY2FsZUZhY3RvcigpO2kubGVmdC89eC54LGkudG9wLz14Lnk7dmFyIHo9cGFyc2VGbG9hdChtLmJvcmRlckxlZnRXaWR0aCkrcGFyc2VGbG9hdChtLmJvcmRlclJpZ2h0V2lkdGgpLFM9cGFyc2VGbG9hdChtLmJvcmRlclRvcFdpZHRoKStwYXJzZUZsb2F0KG0uYm9yZGVyQm90dG9tV2lkdGgpLEE9eiooMS14LngpL3gueCxCPVMqKDEteC55KS94Lnk7aWYoby5hdC5tYXRjaCgvXnJpZ2h0LXRvcCR8XnJpZ2h0LWNlbnRlciR8XnJpZ2h0LWJvdHRvbSQvaSk/aS5sZWZ0Kz1BOm8uYXQubWF0Y2goL15jZW50ZXItdG9wJHxeY2VudGVyJHxeY2VudGVyLWJvdHRvbSQvaSkmJihpLmxlZnQrPUEvMiksby5hdC5tYXRjaCgvXmxlZnQtYm90dG9tJHxeY2VudGVyLWJvdHRvbSR8XnJpZ2h0LWJvdHRvbSQvaSk/aS50b3ArPUI6by5hdC5tYXRjaCgvXmxlZnQtY2VudGVyJHxeY2VudGVyJHxecmlnaHQtY2VudGVyJC9pKSYmKGkudG9wKz1CLzIpLGkubGVmdCs9XCJweFwiLGkudG9wKz1cInB4XCIsbi5zdHlsZS5sZWZ0PWkubGVmdCxuLnN0eWxlLnRvcD1pLnRvcCxvLm9mZnNldFgmJihcIm51bWJlclwiPT10eXBlb2Ygby5vZmZzZXRYP24uc3R5bGUubGVmdD1cImNhbGMoXCIraS5sZWZ0K1wiICsgXCIrby5vZmZzZXRYK1wicHgpXCI6bi5zdHlsZS5sZWZ0PVwiY2FsYyhcIitpLmxlZnQrXCIgKyBcIitvLm9mZnNldFgrXCIpXCIsaS5sZWZ0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLmxlZnQpLG8ub2Zmc2V0WSYmKFwibnVtYmVyXCI9PXR5cGVvZiBvLm9mZnNldFk/bi5zdHlsZS50b3A9XCJjYWxjKFwiK2kudG9wK1wiICsgXCIrby5vZmZzZXRZK1wicHgpXCI6bi5zdHlsZS50b3A9XCJjYWxjKFwiK2kudG9wK1wiICsgXCIrby5vZmZzZXRZK1wiKVwiLGkudG9wPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLnRvcCksby5taW5MZWZ0KXt2YXIgVD1wYXJzZUZsb2F0KGkubGVmdCk7XCJudW1iZXJcIj09dHlwZW9mIG8ubWluTGVmdCYmKG8ubWluTGVmdCs9XCJweFwiKSxuLnN0eWxlLmxlZnQ9by5taW5MZWZ0LFQ+cGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKS5sZWZ0KSYmKG4uc3R5bGUubGVmdD1UK1wicHhcIiksaS5sZWZ0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLmxlZnR9aWYoby5tYXhMZWZ0KXt2YXIgTD1wYXJzZUZsb2F0KGkubGVmdCk7XCJudW1iZXJcIj09dHlwZW9mIG8ubWF4TGVmdCYmKG8ubWF4TGVmdCs9XCJweFwiKSxuLnN0eWxlLmxlZnQ9by5tYXhMZWZ0LEw8cGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKS5sZWZ0KSYmKG4uc3R5bGUubGVmdD1MK1wicHhcIiksaS5sZWZ0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLmxlZnR9aWYoby5tYXhUb3Ape3ZhciBEPXBhcnNlRmxvYXQoaS50b3ApO1wibnVtYmVyXCI9PXR5cGVvZiBvLm1heFRvcCYmKG8ubWF4VG9wKz1cInB4XCIpLG4uc3R5bGUudG9wPW8ubWF4VG9wLEQ8cGFyc2VGbG9hdCh3aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShuKS50b3ApJiYobi5zdHlsZS50b3A9RCtcInB4XCIpLGkudG9wPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLnRvcH1pZihvLm1pblRvcCl7dmFyIGs9cGFyc2VGbG9hdChpLnRvcCk7XCJudW1iZXJcIj09dHlwZW9mIG8ubWluVG9wJiYoby5taW5Ub3ArPVwicHhcIiksbi5zdHlsZS50b3A9by5taW5Ub3Asaz5wYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLnRvcCkmJihuLnN0eWxlLnRvcD1rK1wicHhcIiksaS50b3A9d2luZG93LmdldENvbXB1dGVkU3R5bGUobikudG9wfWlmKFwiZnVuY3Rpb25cIj09dHlwZW9mIG8ubW9kaWZ5KXt2YXIgcT1vLm1vZGlmeS5jYWxsKGksaSk7bi5zdHlsZS5sZWZ0PXEubGVmdCxuLnN0eWxlLnRvcD1xLnRvcH1yZXR1cm4gbi5zdHlsZS5vcGFjaXR5PTEsbi5zdHlsZS5sZWZ0PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKG4pLmxlZnQsbi5zdHlsZS50b3A9d2luZG93LmdldENvbXB1dGVkU3R5bGUobikudG9wLG59LHByb2Nlc3NDYWxsYmFja3M6ZnVuY3Rpb24oZSx0KXt2YXIgbj1hcmd1bWVudHMubGVuZ3RoPjImJnZvaWQgMCE9PWFyZ3VtZW50c1syXT9hcmd1bWVudHNbMl06XCJzb21lXCIsbz1hcmd1bWVudHNbM10sYT1hcmd1bWVudHNbNF07aWYoXCJmdW5jdGlvblwiPT10eXBlb2YgdCYmKHQ9W3RdKSxuKXJldHVybiB0W25dKGZ1bmN0aW9uKHQpe3JldHVybiB0LmNhbGwoZSxlLG8sYSl9KTt0LmZvckVhY2goZnVuY3Rpb24odCl7dC5jYWxsKGUsZSxvLGEpfSl9LHJlbW92ZVNuYXBBcmVhczpmdW5jdGlvbigpe2RvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1zbmFwLWFyZWFcIikuZm9yRWFjaChmdW5jdGlvbihlKXtlLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZSl9KX0scmVzZXRaaTpmdW5jdGlvbigpe3RoaXMuemk9ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06anNQYW5lbC56aUJhc2U7cmV0dXJue25leHQ6ZnVuY3Rpb24oKXtyZXR1cm4gZSsrfX19KCksQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLXN0YW5kYXJkXCIpKS5zb3J0KGZ1bmN0aW9uKGUsdCl7cmV0dXJuIGUuc3R5bGUuekluZGV4LXQuc3R5bGUuekluZGV4fSkuZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLnpJbmRleD1qc1BhbmVsLnppLm5leHQoKX0pfSxyZXNpemVpdDpmdW5jdGlvbihlKXt2YXIgdCxuPWFyZ3VtZW50cy5sZW5ndGg+MSYmdm9pZCAwIT09YXJndW1lbnRzWzFdP2FyZ3VtZW50c1sxXTp7fSxvPU9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWZhdWx0cy5yZXNpemVpdCxuKSxhPWUucGFyZW50RWxlbWVudCxpPWEudGFnTmFtZS50b0xvd2VyQ2FzZSgpLHI9XCJmdW5jdGlvblwiPT10eXBlb2Ygby5tYXhXaWR0aD9vLm1heFdpZHRoKCk6by5tYXhXaWR0aHx8MWU0LGw9XCJmdW5jdGlvblwiPT10eXBlb2Ygby5tYXhIZWlnaHQ/by5tYXhIZWlnaHQoKTpvLm1heEhlaWdodHx8MWU0LHM9XCJmdW5jdGlvblwiPT10eXBlb2Ygby5taW5XaWR0aD9vLm1pbldpZHRoKCk6by5taW5XaWR0aCxjPVwiZnVuY3Rpb25cIj09dHlwZW9mIG8ubWluSGVpZ2h0P28ubWluSGVpZ2h0KCk6by5taW5IZWlnaHQsZD12b2lkIDAscD12b2lkIDAsZj12b2lkIDAsaD12b2lkIDAsdT1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVscmVzaXplc3RhcnRcIix7ZGV0YWlsOmUuaWR9KSxnPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxyZXNpemVcIix7ZGV0YWlsOmUuaWR9KSxtPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxyZXNpemVzdG9wXCIse2RldGFpbDplLmlkfSk7cmV0dXJuIHQ9dGhpcy5wT2NvbnRhaW5tZW50KG8uY29udGFpbm1lbnQpLG8uaGFuZGxlcy5zcGxpdChcIixcIikuZm9yRWFjaChmdW5jdGlvbih0KXt2YXIgbj1kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiRElWXCIpO24uY2xhc3NOYW1lPVwianNQYW5lbC1yZXNpemVpdC1oYW5kbGUganNQYW5lbC1yZXNpemVpdC1cIit0LnRyaW0oKSxuLnN0eWxlLnpJbmRleD05MCxlLmFwcGVuZChuKX0pLGUucXVlcnlTZWxlY3RvckFsbChcIi5qc1BhbmVsLXJlc2l6ZWl0LWhhbmRsZVwiKS5mb3JFYWNoKGZ1bmN0aW9uKG4pe2pzUGFuZWwucG9pbnRlcmRvd24uZm9yRWFjaChmdW5jdGlvbihtKXtuLmFkZEV2ZW50TGlzdGVuZXIobSxmdW5jdGlvbihuKXtpZihuLnByZXZlbnREZWZhdWx0KCksbi5idXR0b24mJm4uYnV0dG9uPjApcmV0dXJuITE7ZS5jb250ZW50LnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCI7dmFyIG09ZS5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKSxiPWEuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkseT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShhLG51bGwpLHY9cGFyc2VJbnQoeS5ib3JkZXJMZWZ0V2lkdGgsMTApLHc9cGFyc2VJbnQoeS5ib3JkZXJUb3BXaWR0aCwxMCksaj15LmdldFByb3BlcnR5VmFsdWUoXCJwb3NpdGlvblwiKSxDPW4uY2xpZW50WHx8bi50b3VjaGVzWzBdLmNsaWVudFgsRT1uLmNsaWVudFl8fG4udG91Y2hlc1swXS5jbGllbnRZLEY9Qy9FLFA9bS53aWR0aCx4PW0uaGVpZ2h0LHo9bi50YXJnZXQuY2xhc3NMaXN0LFM9ZS5nZXRTY2FsZUZhY3RvcigpLEE9bS53aWR0aC9tLmhlaWdodCxCPW0ubGVmdCxUPW0udG9wLEw9MWU0LEQ9MWU0LGs9MWU0LHE9MWU0O1wiYm9keVwiIT09aSYmKEI9bS5sZWZ0LWIubGVmdCthLnNjcm9sbExlZnQsVD1tLnRvcC1iLnRvcCthLnNjcm9sbFRvcCksXCJib2R5XCI9PT1pJiZ0PyhMPWRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGllbnRXaWR0aC1tLmxlZnQsaz1kb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xpZW50SGVpZ2h0LW0udG9wLEQ9bS53aWR0aCttLmxlZnQscT1tLmhlaWdodCttLnRvcCk6dCYmKFwic3RhdGljXCI9PT1qPyhMPWIud2lkdGgtbS5sZWZ0K3Ysaz1iLmhlaWdodCtiLnRvcC1tLnRvcCt3LEQ9bS53aWR0aCsobS5sZWZ0LWIubGVmdCktdixxPW0uaGVpZ2h0KyhtLnRvcC1iLnRvcCktdyk6KEw9YS5jbGllbnRXaWR0aC0obS5sZWZ0LWIubGVmdCkvUy54K3Ysaz1hLmNsaWVudEhlaWdodC0obS50b3AtYi50b3ApL1MueSt3LEQ9KG0ud2lkdGgrbS5sZWZ0LWIubGVmdCkvUy54LXYscT1lLmNsaWVudEhlaWdodCsobS50b3AtYi50b3ApL1MueS13KSksdCYmKEQtPXRbM10scS09dFswXSxMLT10WzFdLGstPXRbMl0pO3ZhciBSPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGUpLFc9cGFyc2VGbG9hdChSLndpZHRoKS1tLndpZHRoLE09cGFyc2VGbG9hdChSLmhlaWdodCktbS5oZWlnaHQsTz1wYXJzZUZsb2F0KFIubGVmdCktbS5sZWZ0LEk9cGFyc2VGbG9hdChSLnRvcCktbS50b3A7YSE9PWRvY3VtZW50LmJvZHkmJihPKz1iLmxlZnQsSSs9Yi50b3ApLGQ9ZnVuY3Rpb24obil7cHx8KGRvY3VtZW50LmRpc3BhdGNoRXZlbnQodSksby5zdGFydCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKGUsby5zdGFydCwhMSx7d2lkdGg6UCxoZWlnaHQ6eH0sbiksanNQYW5lbC5mcm9udChlKSkscD0xLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoZyk7dmFyIGk9bi50b3VjaGVzP24udG91Y2hlc1swXS5jbGllbnRYOm4uY2xpZW50WCxkPW4udG91Y2hlcz9uLnRvdWNoZXNbMF0uY2xpZW50WTpuLmNsaWVudFk7ei5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtZVwiKT8oKGY9UCsoaS1DKS9TLngrVyk+PUwmJihmPUwpLGY+PXI/Zj1yOmY8PXMmJihmPXMpLGUuc3R5bGUud2lkdGg9ZitcInB4XCIsby5hc3BlY3RSYXRpbyYmKGUuc3R5bGUuaGVpZ2h0PWYvQStcInB4XCIsby5jb250YWlubWVudCYmZS5vdmVybGFwcyhhKS5ib3R0b208PXRbMl0mJihlLnN0eWxlLmhlaWdodD1rK1wicHhcIixlLnN0eWxlLndpZHRoPWsqQStcInB4XCIpKSk6ei5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtc1wiKT8oKGg9eCsoZC1FKS9TLnkrTSk+PWsmJihoPWspLGg+PWw/aD1sOmg8PWMmJihoPWMpLGUuc3R5bGUuaGVpZ2h0PWgrXCJweFwiLG8uYXNwZWN0UmF0aW8mJihlLnN0eWxlLndpZHRoPWgqQStcInB4XCIsby5jb250YWlubWVudCYmZS5vdmVybGFwcyhhKS5yaWdodDw9dFsxXSYmKGUuc3R5bGUud2lkdGg9TCtcInB4XCIsZS5zdHlsZS5oZWlnaHQ9TC9BK1wicHhcIikpKTp6LmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC13XCIpPygoZj1QKyhDLWkpL1MueCtXKTw9ciYmZj49cyYmZjw9RCYmKGUuc3R5bGUubGVmdD1CKyhpLUMpL1MueCtPK1wicHhcIiksZj49RCYmKGY9RCksZj49cj9mPXI6Zjw9cyYmKGY9cyksZS5zdHlsZS53aWR0aD1mK1wicHhcIixvLmFzcGVjdFJhdGlvJiYoZS5zdHlsZS5oZWlnaHQ9Zi9BK1wicHhcIixvLmNvbnRhaW5tZW50JiZlLm92ZXJsYXBzKGEpLmJvdHRvbTw9dFsyXSYmKGUuc3R5bGUuaGVpZ2h0PWsrXCJweFwiLGUuc3R5bGUud2lkdGg9aypBK1wicHhcIikpKTp6LmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1uXCIpPygoaD14KyhFLWQpL1MueStNKTw9bCYmaD49YyYmaDw9cSYmKGUuc3R5bGUudG9wPVQrKGQtRSkvUy55K0krXCJweFwiKSxoPj1xJiYoaD1xKSxoPj1sP2g9bDpoPD1jJiYoaD1jKSxlLnN0eWxlLmhlaWdodD1oK1wicHhcIixvLmFzcGVjdFJhdGlvJiYoZS5zdHlsZS53aWR0aD1oKkErXCJweFwiLG8uY29udGFpbm1lbnQmJmUub3ZlcmxhcHMoYSkucmlnaHQ8PXRbMV0mJihlLnN0eWxlLndpZHRoPUwrXCJweFwiLGUuc3R5bGUuaGVpZ2h0PUwvQStcInB4XCIpKSk6ei5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtc2VcIik/KChmPVArKGktQykvUy54K1cpPj1MJiYoZj1MKSxmPj1yP2Y9cjpmPD1zJiYoZj1zKSxlLnN0eWxlLndpZHRoPWYrXCJweFwiLG8uYXNwZWN0UmF0aW8mJihlLnN0eWxlLmhlaWdodD1mL0ErXCJweFwiKSwoaD14KyhkLUUpL1MueStNKT49ayYmKGg9ayksaD49bD9oPWw6aDw9YyYmKGg9YyksZS5zdHlsZS5oZWlnaHQ9aCtcInB4XCIsby5hc3BlY3RSYXRpbyYmKGUuc3R5bGUud2lkdGg9aCpBK1wicHhcIixvLmNvbnRhaW5tZW50JiZlLm92ZXJsYXBzKGEpLnJpZ2h0PD10WzFdJiYoZS5zdHlsZS53aWR0aD1MK1wicHhcIixlLnN0eWxlLmhlaWdodD1ML0ErXCJweFwiKSkpOnouY29udGFpbnMoXCJqc1BhbmVsLXJlc2l6ZWl0LXN3XCIpPygoaD14KyhkLUUpL1MueStNKT49ayYmKGg9ayksaD49bD9oPWw6aDw9YyYmKGg9YyksZS5zdHlsZS5oZWlnaHQ9aCtcInB4XCIsby5hc3BlY3RSYXRpbyYmKGUuc3R5bGUud2lkdGg9aCpBK1wicHhcIiksKGY9UCsoQy1pKS9TLngrVyk8PXImJmY+PXMmJmY8PUQmJihlLnN0eWxlLmxlZnQ9QisoaS1DKS9TLngrTytcInB4XCIpLGY+PUQmJihmPUQpLGY+PXI/Zj1yOmY8PXMmJihmPXMpLGUuc3R5bGUud2lkdGg9ZitcInB4XCIsby5hc3BlY3RSYXRpbyYmKGUuc3R5bGUuaGVpZ2h0PWYvQStcInB4XCIsby5jb250YWlubWVudCYmZS5vdmVybGFwcyhhKS5ib3R0b208PXRbMl0mJihlLnN0eWxlLmhlaWdodD1rK1wicHhcIixlLnN0eWxlLndpZHRoPWsqQStcInB4XCIpKSk6ei5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtbmVcIik/KChmPVArKGktQykvUy54K1cpPj1MJiYoZj1MKSxmPj1yP2Y9cjpmPD1zJiYoZj1zKSxlLnN0eWxlLndpZHRoPWYrXCJweFwiLG8uYXNwZWN0UmF0aW8mJihlLnN0eWxlLmhlaWdodD1mL0ErXCJweFwiKSwoaD14KyhFLWQpL1MueStNKTw9bCYmaD49YyYmaDw9cSYmKGUuc3R5bGUudG9wPVQrKGQtRSkvUy55K0krXCJweFwiKSxoPj1xJiYoaD1xKSxoPj1sP2g9bDpoPD1jJiYoaD1jKSxlLnN0eWxlLmhlaWdodD1oK1wicHhcIixvLmFzcGVjdFJhdGlvJiYoZS5zdHlsZS53aWR0aD1oKkErXCJweFwiLG8uY29udGFpbm1lbnQmJmUub3ZlcmxhcHMoYSkucmlnaHQ8PXRbMV0mJihlLnN0eWxlLndpZHRoPUwrXCJweFwiLGUuc3R5bGUuaGVpZ2h0PUwvQStcInB4XCIpKSk6ei5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtbndcIikmJihvLmFzcGVjdFJhdGlvJiZ6LmNvbnRhaW5zKFwianNQYW5lbC1yZXNpemVpdC1ud1wiKSYmKGQ9KGk9ZCpGKS9GKSwoZj1QKyhDLWkpL1MueCtXKTw9ciYmZj49cyYmZjw9RCYmKGUuc3R5bGUubGVmdD1CKyhpLUMpL1MueCtPK1wicHhcIiksZj49RCYmKGY9RCksZj49cj9mPXI6Zjw9cyYmKGY9cyksZS5zdHlsZS53aWR0aD1mK1wicHhcIixvLmFzcGVjdFJhdGlvJiYoZS5zdHlsZS5oZWlnaHQ9Zi9BK1wicHhcIiksKGg9eCsoRS1kKS9TLnkrTSk8PWwmJmg+PWMmJmg8PXEmJihlLnN0eWxlLnRvcD1UKyhkLUUpL1MueStJK1wicHhcIiksaD49cSYmKGg9cSksaD49bD9oPWw6aDw9YyYmKGg9YyksZS5zdHlsZS5oZWlnaHQ9aCtcInB4XCIsby5hc3BlY3RSYXRpbyYmKGUuc3R5bGUud2lkdGg9aCpBK1wicHhcIikpLHdpbmRvdy5nZXRTZWxlY3Rpb24oKS5yZW1vdmVBbGxSYW5nZXMoKTt2YXIgbT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShlKSxiPXtsZWZ0OnBhcnNlRmxvYXQobS5sZWZ0KSx0b3A6cGFyc2VGbG9hdChtLnRvcCkscmlnaHQ6cGFyc2VGbG9hdChtLnJpZ2h0KSxib3R0b206cGFyc2VGbG9hdChtLmJvdHRvbSksd2lkdGg6cGFyc2VGbG9hdChtLndpZHRoKSxoZWlnaHQ6cGFyc2VGbG9hdChtLmhlaWdodCl9O28ucmVzaXplJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3MoZSxvLnJlc2l6ZSwhMSxiLG4pfSxqc1BhbmVsLnBvaW50ZXJtb3ZlLmZvckVhY2goZnVuY3Rpb24oZSl7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihlLGQsITEpfSksd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZW91dFwiLGZ1bmN0aW9uKGUpe251bGw9PT1lLnJlbGF0ZWRUYXJnZXQmJmpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbihlKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGUsZCwhMSl9KX0sITEpfSl9KX0pLGpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24odCl7ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcih0LGZ1bmN0aW9uKHQpe2lmKGpzUGFuZWwucG9pbnRlcm1vdmUuZm9yRWFjaChmdW5jdGlvbihlKXtkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKGUsZCwhMSl9KSx0LnRhcmdldC5jbGFzc0xpc3QmJnQudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucyhcImpzUGFuZWwtcmVzaXplaXQtaGFuZGxlXCIpKXt2YXIgbj12b2lkIDAsYT12b2lkIDAsaT10LnRhcmdldC5jbGFzc05hbWU7aWYoaS5tYXRjaCgvanNQYW5lbC1yZXNpemVpdC1ud3xqc1BhbmVsLXJlc2l6ZWl0LXd8anNQYW5lbC1yZXNpemVpdC1zdy9pKSYmKG49ITApLGkubWF0Y2goL2pzUGFuZWwtcmVzaXplaXQtbnd8anNQYW5lbC1yZXNpemVpdC1ufGpzUGFuZWwtcmVzaXplaXQtbmUvaSkmJihhPSEwKSxvLmdyaWQmJkFycmF5LmlzQXJyYXkoby5ncmlkKSl7MT09PW8uZ3JpZC5sZW5ndGgmJihvLmdyaWRbMV09by5ncmlkWzBdKTt2YXIgcj1wYXJzZUZsb2F0KGUuc3R5bGUud2lkdGgpLGw9cGFyc2VGbG9hdChlLnN0eWxlLmhlaWdodCkscz1yJW8uZ3JpZFswXSxjPWwlby5ncmlkWzFdLGY9cGFyc2VGbG9hdChlLnN0eWxlLmxlZnQpLGg9cGFyc2VGbG9hdChlLnN0eWxlLnRvcCksdT1mJW8uZ3JpZFswXSxnPWglby5ncmlkWzFdO3M8by5ncmlkWzBdLzI/ZS5zdHlsZS53aWR0aD1yLXMrXCJweFwiOmUuc3R5bGUud2lkdGg9cisoby5ncmlkWzBdLXMpK1wicHhcIixjPG8uZ3JpZFsxXS8yP2Uuc3R5bGUuaGVpZ2h0PWwtYytcInB4XCI6ZS5zdHlsZS5oZWlnaHQ9bCsoby5ncmlkWzFdLWMpK1wicHhcIixuJiYodTxvLmdyaWRbMF0vMj9lLnN0eWxlLmxlZnQ9Zi11K1wicHhcIjplLnN0eWxlLmxlZnQ9Zisoby5ncmlkWzBdLXUpK1wicHhcIiksYSYmKGc8by5ncmlkWzFdLzI/ZS5zdHlsZS50b3A9aC1nK1wicHhcIjplLnN0eWxlLnRvcD1oKyhvLmdyaWRbMV0tZykrXCJweFwiKX19cCYmKGUuY29udGVudC5zdHlsZS5wb2ludGVyRXZlbnRzPVwiaW5oZXJpdFwiLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobSkscD12b2lkIDAsZS5zYXZlQ3VycmVudERpbWVuc2lvbnMoKSxlLnNhdmVDdXJyZW50UG9zaXRpb24oKSxvLnN0b3AmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhlLG8uc3RvcCwhMSx7d2lkdGg6cGFyc2VGbG9hdChlLnN0eWxlLndpZHRoKSxoZWlnaHQ6cGFyc2VGbG9hdChlLnN0eWxlLmhlaWdodCl9LHQpKSxlLmNvbnRlbnQuc3R5bGUucG9pbnRlckV2ZW50cz1cImluaGVyaXRcIn0sITEpfSksby5kaXNhYmxlJiZlLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1yZXNpemVpdC1oYW5kbGVcIikuZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCJ9KSxlfSxzZXRDbGFzczpmdW5jdGlvbihlLHQpe3JldHVybiB0LnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBlLmNsYXNzTGlzdC5hZGQodCl9KSxlfSxyZW1DbGFzczpmdW5jdGlvbihlLHQpe3JldHVybiB0LnNwbGl0KFwiIFwiKS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3JldHVybiBlLmNsYXNzTGlzdC5yZW1vdmUodCl9KSxlfSxzZXRTdHlsZTpmdW5jdGlvbihlLHQpe2Zvcih2YXIgbiBpbiB0KWlmKHQuaGFzT3duUHJvcGVydHkobikpe3ZhciBvPVN0cmluZyhuKS5yZXBsYWNlKC8tXFx3L2dpLGZ1bmN0aW9uKGUpe3JldHVybiBlLnN1YnN0cigtMSkudG9VcHBlckNhc2UoKX0pO2Uuc3R5bGVbb109dFtuXX1yZXR1cm4gZX0sc25hcFBhbmVsOmZ1bmN0aW9uKGUsdCl7aWYoZS5jdXJyZW50RGF0YS5iZWZvcmVTbmFwPXt3aWR0aDplLmN1cnJlbnREYXRhLndpZHRoLGhlaWdodDplLmN1cnJlbnREYXRhLmhlaWdodH0sdCYmXCJmdW5jdGlvblwiPT10eXBlb2YgdCl0LmNhbGwoZSxlLGUuc25hcHBhYmxlVG8pO2Vsc2UgaWYoITEhPT10KXt2YXIgbj1bMCwwXTtpZihlLm9wdGlvbnMuZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQmJmUub3B0aW9ucy5kcmFnaXQuY29udGFpbm1lbnQpe3ZhciBvPXRoaXMucE9jb250YWlubWVudChlLm9wdGlvbnMuZHJhZ2l0LmNvbnRhaW5tZW50KSxhPWUuc25hcHBhYmxlVG87YS5zdGFydHNXaXRoKFwibGVmdFwiKT9uWzBdPW9bM106YS5zdGFydHNXaXRoKFwicmlnaHRcIikmJihuWzBdPS1vWzFdKSxhLmVuZHNXaXRoKFwidG9wXCIpP25bMV09b1swXTphLmVuZHNXaXRoKFwiYm90dG9tXCIpJiYoblsxXT0tb1syXSl9ZS5yZXBvc2l0aW9uKGUuc25hcHBhYmxlVG8rXCIgXCIrblswXStcIiBcIituWzFdKSxlLnNuYXBwZWQ9ZS5zbmFwcGFibGVUb319LGNyZWF0ZTpmdW5jdGlvbigpe3ZhciBlPXRoaXMsdD1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06e30sbj1hcmd1bWVudHNbMV07anNQYW5lbC56aXx8KGpzUGFuZWwuemk9ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06anNQYW5lbC56aUJhc2U7cmV0dXJue25leHQ6ZnVuY3Rpb24oKXtyZXR1cm4gZSsrfX19KCkpO3ZhciBvPXZvaWQgMDt0LmNvbmZpZz9kZWxldGUodD1PYmplY3QuYXNzaWduKHt9LHRoaXMuZGVmYXVsdHMsdC5jb25maWcsdCkpLmNvbmZpZzp0PU9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWZhdWx0cyx0KSx0LmlkP1wiZnVuY3Rpb25cIj09dHlwZW9mIHQuaWQmJih0LmlkPXQuaWQoKSk6dC5pZD1cImpzUGFuZWwtXCIrKGpzUGFuZWwuaWRDb3VudGVyKz0xKTt2YXIgYT1kb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0LmlkKTtpZihudWxsIT09YSlyZXR1cm4gYS5jbGFzc0xpc3QuY29udGFpbnMoXCJqc1BhbmVsXCIpJiZhLmZyb250KCksY29uc29sZS5lcnJvcihcIk5PIE5FVyBQQU5FTCBDUkVBVEVEIVxcbkFuIGVsZW1lbnQgd2l0aCB0aGUgSUQgPFwiK3QuaWQrXCI+IGFscmVhZHkgZXhpc3RzIGluIHRoZSBkb2N1bWVudC5cIiksITE7dmFyIGk9dGhpcy5wT2NvbnRhaW5lcih0LmNvbnRhaW5lcixuKTtpZighaSlyZXR1cm4gY29uc29sZS5lcnJvcihcIk5PIE5FVyBQQU5FTCBDUkVBVEVEIVxcblRoZSBjb250YWluZXIgdG8gYXBwZW5kIHRoZSBwYW5lbCB0byBkb2VzIG5vdCBleGlzdCBvciBhIGNvbnRhaW5lciB3YXMgbm90IHNwZWNpZmllZCFcIiksITE7dC5tYXhpbWl6ZWRNYXJnaW49dGhpcy5wT2NvbnRhaW5tZW50KHQubWF4aW1pemVkTWFyZ2luKSx0LmRyYWdpdCYmKFtcInN0YXJ0XCIsXCJkcmFnXCIsXCJzdG9wXCJdLmZvckVhY2goZnVuY3Rpb24oZSl7dC5kcmFnaXRbZV0/XCJmdW5jdGlvblwiPT10eXBlb2YgdC5kcmFnaXRbZV0mJih0LmRyYWdpdFtlXT1bdC5kcmFnaXRbZV1dKTp0LmRyYWdpdFtlXT1bXX0pLHQuZHJhZ2l0LnNuYXAmJihcIm9iamVjdFwiPT09X3R5cGVvZih0LmRyYWdpdC5zbmFwKT90LmRyYWdpdC5zbmFwPU9iamVjdC5hc3NpZ24oe30sdGhpcy5kZWZhdWx0U25hcENvbmZpZyx0LmRyYWdpdC5zbmFwKTp0LmRyYWdpdC5zbmFwPXRoaXMuZGVmYXVsdFNuYXBDb25maWcpKSx0LnJlc2l6ZWl0JiZbXCJzdGFydFwiLFwicmVzaXplXCIsXCJzdG9wXCJdLmZvckVhY2goZnVuY3Rpb24oZSl7dC5yZXNpemVpdFtlXT9cImZ1bmN0aW9uXCI9PXR5cGVvZiB0LnJlc2l6ZWl0W2VdJiYodC5yZXNpemVpdFtlXT1bdC5yZXNpemVpdFtlXV0pOnQucmVzaXplaXRbZV09W119KSxbXCJvbmJlZm9yZWNsb3NlXCIsXCJvbmJlZm9yZW1heGltaXplXCIsXCJvbmJlZm9yZW1pbmltaXplXCIsXCJvbmJlZm9yZW5vcm1hbGl6ZVwiLFwib25iZWZvcmVzbWFsbGlmeVwiLFwib25iZWZvcmV1bnNtYWxsaWZ5XCIsXCJvbmNsb3NlZFwiLFwib25mcm9udGVkXCIsXCJvbm1heGltaXplZFwiLFwib25taW5pbWl6ZWRcIixcIm9ubm9ybWFsaXplZFwiLFwib25zbWFsbGlmaWVkXCIsXCJvbnN0YXR1c2NoYW5nZVwiLFwib251bnNtYWxsaWZpZWRcIl0uZm9yRWFjaChmdW5jdGlvbihlKXt0W2VdP1wiZnVuY3Rpb25cIj09dHlwZW9mIHRbZV0mJih0W2VdPVt0W2VdXSk6dFtlXT1bXX0pLHQuaGVhZGVyUmVtb3ZlJiYodC5oZWFkZXI9ITEpO3ZhciByPXQudGVtcGxhdGU/dC50ZW1wbGF0ZTp0aGlzLmNyZWF0ZVBhbmVsVGVtcGxhdGUoKTtyLm9wdGlvbnM9dCxyLnN0YXR1cz1cImluaXRpYWxpemVkXCIsci5jdXJyZW50RGF0YT17fSxyLmhlYWRlcj1yLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1oZHJcIiksci5oZWFkZXJiYXI9ci5oZWFkZXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWhlYWRlcmJhclwiKSxyLnRpdGxlYmFyPXIuaGVhZGVyLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC10aXRsZWJhclwiKSxyLmhlYWRlcmxvZ289ci5oZWFkZXJiYXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWhlYWRlcmxvZ29cIiksci5oZWFkZXJ0aXRsZT1yLmhlYWRlcmJhci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtdGl0bGVcIiksci5jb250cm9sYmFyPXIuaGVhZGVyYmFyLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1jb250cm9sYmFyXCIpLHIuaGVhZGVydG9vbGJhcj1yLmhlYWRlci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtaGRyLXRvb2xiYXJcIiksci5jb250ZW50PXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWNvbnRlbnRcIiksci5mb290ZXI9ci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtZnRyXCIpLHIuc25hcHBhYmxlVG89ITEsci5zbmFwcGVkPSExO3ZhciBsPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxsb2FkZWRcIix7ZGV0YWlsOnQuaWR9KSxzPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxiZWZvcmVjbG9zZVwiLHtkZXRhaWw6dC5pZH0pLGM9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGNsb3NlZFwiLHtkZXRhaWw6dC5pZH0pLGQ9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGNsb3NlZHVzZXJcIix7ZGV0YWlsOnQuaWR9KSxwPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxzdGF0dXNjaGFuZ2VcIix7ZGV0YWlsOnQuaWR9KSxmPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxiZWZvcmVub3JtYWxpemVcIix7ZGV0YWlsOnQuaWR9KSxoPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxub3JtYWxpemVkXCIse2RldGFpbDp0LmlkfSksdT1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsYmVmb3JlbWF4aW1pemVcIix7ZGV0YWlsOnQuaWR9KSxnPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxtYXhpbWl6ZWRcIix7ZGV0YWlsOnQuaWR9KSxtPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxiZWZvcmVtaW5pbWl6ZVwiLHtkZXRhaWw6dC5pZH0pLGI9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbG1pbmltaXplZFwiLHtkZXRhaWw6dC5pZH0pLHk9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbGJlZm9yZXNtYWxsaWZ5XCIse2RldGFpbDp0LmlkfSksdj1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsc21hbGxpZmllZFwiLHtkZXRhaWw6dC5pZH0pLHc9bmV3IEN1c3RvbUV2ZW50KFwianNwYW5lbHNtYWxsaWZpZWRtYXhcIix7ZGV0YWlsOnQuaWR9KSxqPW5ldyBDdXN0b21FdmVudChcImpzcGFuZWxiZWZvcmV1bnNtYWxsaWZ5XCIse2RldGFpbDp0LmlkfSksQz1uZXcgQ3VzdG9tRXZlbnQoXCJqc3BhbmVsZnJvbnRlZFwiLHtkZXRhaWw6dC5pZH0pLEU9ci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLWNsb3NlXCIpLEY9ci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLW1heGltaXplXCIpLFA9ci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiKSx4PXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1zbWFsbGlmeVwiKSx6PXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldlwiKSxTPXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1taW5pbWl6ZVwiKTtFJiZqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKGUpe0UuYWRkRXZlbnRMaXN0ZW5lcihlLGZ1bmN0aW9uKGUpe2lmKGUucHJldmVudERlZmF1bHQoKSxlLmJ1dHRvbiYmZS5idXR0b24+MClyZXR1cm4hMTtyLmNsb3NlKCksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChkKX0pfSksRiYmanNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbihlKXtGLmFkZEV2ZW50TGlzdGVuZXIoZSxmdW5jdGlvbihlKXtpZihlLnByZXZlbnREZWZhdWx0KCksZS5idXR0b24mJmUuYnV0dG9uPjApcmV0dXJuITE7ci5tYXhpbWl6ZSgpfSl9KSxQJiZqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKGUpe1AuYWRkRXZlbnRMaXN0ZW5lcihlLGZ1bmN0aW9uKGUpe2lmKGUucHJldmVudERlZmF1bHQoKSxlLmJ1dHRvbiYmZS5idXR0b24+MClyZXR1cm4hMTtyLm5vcm1hbGl6ZSgpfSl9KSx4JiZqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKGUpe3guYWRkRXZlbnRMaXN0ZW5lcihlLGZ1bmN0aW9uKGUpe2lmKGUucHJldmVudERlZmF1bHQoKSxlLmJ1dHRvbiYmZS5idXR0b24+MClyZXR1cm4hMTtyLnNtYWxsaWZ5KCl9KX0pLHomJmpzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24oZSl7ei5hZGRFdmVudExpc3RlbmVyKGUsZnVuY3Rpb24oZSl7aWYoZS5wcmV2ZW50RGVmYXVsdCgpLGUuYnV0dG9uJiZlLmJ1dHRvbj4wKXJldHVybiExO3IudW5zbWFsbGlmeSgpfSl9KSxTJiZqc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKGUpe1MuYWRkRXZlbnRMaXN0ZW5lcihlLGZ1bmN0aW9uKGUpe2lmKGUucHJldmVudERlZmF1bHQoKSxlLmJ1dHRvbiYmZS5idXR0b24+MClyZXR1cm4hMTtyLm1pbmltaXplKCl9KX0pO3ZhciBBPWpzUGFuZWwuZXh0ZW5zaW9ucztmb3IodmFyIEIgaW4gQSlBLmhhc093blByb3BlcnR5KEIpJiYocltCXT1BW0JdKTtpZihyLmFkZFRvb2xiYXI9ZnVuY3Rpb24oZSx0LG4pe2lmKFwiaGVhZGVyXCI9PT1lP2U9ci5oZWFkZXJ0b29sYmFyOlwiZm9vdGVyXCI9PT1lJiYoZT1yLmZvb3RlciksXCJzdHJpbmdcIj09dHlwZW9mIHQpZS5pbm5lckhUTUw9dDtlbHNlIGlmKEFycmF5LmlzQXJyYXkodCkpdC5mb3JFYWNoKGZ1bmN0aW9uKHQpe1wic3RyaW5nXCI9PXR5cGVvZiB0P2UuaW5uZXJIVE1MKz10OmUuYXBwZW5kKHQpfSk7ZWxzZSBpZihcImZ1bmN0aW9uXCI9PXR5cGVvZiB0KXt2YXIgbz10LmNhbGwocixyKTtcInN0cmluZ1wiPT10eXBlb2Ygbz9lLmlubmVySFRNTD1vOmUuYXBwZW5kKG8pfWVsc2UgZS5hcHBlbmQodCk7cmV0dXJuIGUuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKSxuJiZuLmNhbGwocixyKSxyfSxyLmFwcGx5QnVpbHRJblRoZW1lPWZ1bmN0aW9uKGUpe2lmKHIuY2xhc3NMaXN0LmFkZChcImpzUGFuZWwtdGhlbWUtXCIrZS5jb2xvciksci5oZWFkZXIuY2xhc3NMaXN0LmFkZChcImpzUGFuZWwtdGhlbWUtXCIrZS5jb2xvciksZS5maWxsaW5nKXt2YXIgbj1lLmZpbGxpbmc7aWYoXCJmaWxsZWRcIj09PW58fFwiZmlsbGVkbGlnaHRcIj09PW4pci5jb250ZW50LnN0eWxlLmJhY2tncm91bmQ9XCJcIixyLmNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImpzUGFuZWwtY29udGVudC1cIituKTtlbHNle3ZhciBvPWpzUGFuZWwucGVyY2VpdmVkQnJpZ2h0bmVzcyhuKTw9anNQYW5lbC5jb2xvckJyaWdodG5lc3NUaHJlc2hvbGQ/XCIjZmZmXCI6XCIjMDAwXCI7ci5jb250ZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcj1uLHIuY29udGVudC5zdHlsZS5jb2xvcj1vfX1yZXR1cm4gdC5oZWFkZXJUb29sYmFyfHwoci5jb250ZW50LnN0eWxlLmJvcmRlclRvcD1cIjFweCBzb2xpZCBcIityLmhlYWRlcnRpdGxlLnN0eWxlLmNvbG9yKSxyfSxyLmFwcGx5QXJiaXRyYXJ5VGhlbWU9ZnVuY3Rpb24oZSl7ci5zdHlsZS5iYWNrZ3JvdW5kQ29sb3I9ZS5jb2xvcnNbMF0sci5oZWFkZXIuc3R5bGUuYmFja2dyb3VuZENvbG9yPWUuY29sb3JzWzBdLFtcIi5qc1BhbmVsLWhlYWRlcmxvZ29cIixcIi5qc1BhbmVsLXRpdGxlXCIsXCIuanNQYW5lbC1oZHItdG9vbGJhclwiXS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3IucXVlcnlTZWxlY3Rvcih0KS5zdHlsZS5jb2xvcj1lLmNvbG9yc1szXX0sciksci5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG5cIikuZm9yRWFjaChmdW5jdGlvbih0KXt0LnN0eWxlLmNvbG9yPWUuY29sb3JzWzNdfSk7dmFyIG49XCIjMDAwMDAwXCI9PT1lLmNvbG9yc1szXT9cIjFweCBzb2xpZCByZ2JhKDAsMCwwLDAuMilcIjpcIjFweCBzb2xpZCByZ2JhKDI1NSwyNTUsMjU1LDAuMilcIjtpZih0LmhlYWRlclRvb2xiYXI/KGUuY29sb3JzWzNdLHIuaGVhZGVydG9vbGJhci5zdHlsZS5ib3JkZXJUb3A9bixqc1BhbmVsLnNldFN0eWxlKHIuaGVhZGVydG9vbGJhcix7Ym94U2hhZG93OlwiMCAwIDFweCBcIitlLmNvbG9yc1szXStcIiBpbnNldFwiLHdpZHRoOlwiY2FsYygxMDAlICsgNHB4KVwiLG1hcmdpbkxlZnQ6XCItMXB4XCJ9KSk6ci5jb250ZW50LnN0eWxlLmJvcmRlclRvcD1uLGUuZmlsbGluZyl7dmFyIG89ZS5maWxsaW5nO2lmKFwiZmlsbGVkXCI9PT1vKWpzUGFuZWwuc2V0U3R5bGUoci5jb250ZW50LHtiYWNrZ3JvdW5kQ29sb3I6ZS5jb2xvcnNbMF0sY29sb3I6ZS5jb2xvcnNbM10sYm9yZGVyVG9wOm59KTtlbHNlIGlmKFwiZmlsbGVkbGlnaHRcIj09PW8pci5jb250ZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcj1lLmNvbG9yc1sxXTtlbHNle3ZhciBhPWpzUGFuZWwucGVyY2VpdmVkQnJpZ2h0bmVzcyhvKTw9anNQYW5lbC5jb2xvckJyaWdodG5lc3NUaHJlc2hvbGQ/XCIjZmZmXCI6XCIjMDAwXCI7ci5jb250ZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcj1vLHIuY29udGVudC5zdHlsZS5jb2xvcj1hfX1yZXR1cm4gcn0sci5hcHBseUJvb3RzdHJhcFRoZW1lPWZ1bmN0aW9uKGUpe3ZhciB0PWUuYnN0aGVtZSxuPSQuZm4uYnV0dG9uLkNvbnN0cnVjdG9yLlZFUlNJT05bMF07aWYoXCI0XCI9PT1uP3IuY2xhc3NMaXN0LmFkZChcImJnLVwiK3QpOihbXCJwYW5lbFwiLFwicGFuZWwtXCIrdF0uZm9yRWFjaChmdW5jdGlvbihlKXtyLmNsYXNzTGlzdC5hZGQoZSl9KSxyLmhlYWRlci5jbGFzc0xpc3QuYWRkKFwicGFuZWwtaGVhZGluZ1wiKSksXCJtZGJcIj09PWUuYnMpe3ZhciBvPXQrXCItY29sb3JcIjtlLm1kYlN0eWxlJiYobys9XCItZGFya1wiKSxyLmNsYXNzTGlzdC5hZGQobyl9dmFyIGE9dm9pZCAwO2E9XCI0XCI9PT1uP3dpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHIpLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKC9cXHMrL2csXCJcIik6d2luZG93LmdldENvbXB1dGVkU3R5bGUoci5oZWFkZXIpLmJhY2tncm91bmRDb2xvci5yZXBsYWNlKC9cXHMrL2csXCJcIik7dmFyIGk9anNQYW5lbC5jYWxjQ29sb3JzKGEpO2lmKHIuaGVhZGVyLnN0eWxlLmNvbG9yPWlbM10sZS5maWxsaW5nKXt2YXIgbD1lLmZpbGxpbmc7aWYoXCJmaWxsZWRcIj09PWx8fFwiZmlsbGVkbGlnaHRcIj09PWwpci5zZXRUaGVtZShhK1wiIFwiK2UuZmlsbGluZyk7ZWxzZXtyLnNldFRoZW1lKGEpO3ZhciBzPWpzUGFuZWwucGVyY2VpdmVkQnJpZ2h0bmVzcyhsKTw9anNQYW5lbC5jb2xvckJyaWdodG5lc3NUaHJlc2hvbGQ/XCIjZmZmXCI6XCIjMDAwXCI7ci5jb250ZW50LnN0eWxlLmJhY2tncm91bmRDb2xvcj1sLHIuY29udGVudC5zdHlsZS5jb2xvcj1zfX1yZXR1cm4gcn0sci5hcHBseVRoZW1lQm9yZGVyPWZ1bmN0aW9uKGUpe3ZhciBuPXQuYm9yZGVyLnNwbGl0KC9cXHMrL2dpKTtpZihuWzJdJiYoanNQYW5lbC5jb2xvck5hbWVzW25bMl1dP2pzUGFuZWwuY29sb3JOYW1lc1tuWzJdXS5tYXRjaCgvXihbMC05YS1mXXszfXxbMC05YS1mXXs2fSkkL2dpKT9uWzJdPVwiI1wiK2pzUGFuZWwuY29sb3JOYW1lc1tuWzJdXTpuWzJdPWpzUGFuZWwuY29sb3JOYW1lc1tuWzJdXTpuWzJdLm1hdGNoKC9eKFswLTlhLWZdezN9fFswLTlhLWZdezZ9KSQvZ2kpJiYoblsyXT1cIiNcIituWzJdKSksci5zdHlsZS5ib3JkZXJXaWR0aD1uWzBdLHIuc3R5bGUuYm9yZGVyU3R5bGU9blsxXSxyLnN0eWxlLmJvcmRlckNvbG9yPW5bMl0sZS5icyl7dmFyIG89dm9pZCAwO289XCJ0cmFuc3BhcmVudFwiPT09d2luZG93LmdldENvbXB1dGVkU3R5bGUoci5oZWFkZXIpLmJhY2tncm91bmRDb2xvcj93aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShyKS5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgvXFxzKy9nLFwiXCIpOndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHIuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3IucmVwbGFjZSgvXFxzKy9nLFwiXCIpLG5bMl0/ci5zdHlsZS5ib3JkZXJDb2xvcj1uWzJdOnIuc3R5bGUuYm9yZGVyQ29sb3I9b31lbHNlLTE9PT1qc1BhbmVsLnRoZW1lcy5pbmRleE9mKGUuY29sb3IpJiYoblsyXT9yLnN0eWxlLmJvcmRlckNvbG9yPW5bMl06ci5zdHlsZS5ib3JkZXJDb2xvcj1lLmNvbG9yc1swXSk7cmV0dXJuIHJ9LHIuYXV0b3Bvc2l0aW9uUmVtYWluaW5nPWZ1bmN0aW9uKCl7dmFyIGU9dm9pZCAwOyhbXCJsZWZ0LXRvcC1kb3duXCIsXCJsZWZ0LXRvcC1yaWdodFwiLFwiY2VudGVyLXRvcC1kb3duXCIsXCJyaWdodC10b3AtZG93blwiLFwicmlnaHQtdG9wLWxlZnRcIixcImxlZnQtYm90dG9tLXVwXCIsXCJsZWZ0LWJvdHRvbS1yaWdodFwiLFwiY2VudGVyLWJvdHRvbS11cFwiLFwicmlnaHQtYm90dG9tLXVwXCIsXCJyaWdodC1ib3R0b20tbGVmdFwiXS5mb3JFYWNoKGZ1bmN0aW9uKHQpe3IuY2xhc3NMaXN0LmNvbnRhaW5zKHQpJiYoZT10KX0pLGUpJiYoXCJ3aW5kb3dcIj09PXQuY29udGFpbmVyP2RvY3VtZW50LmJvZHk6dC5jb250YWluZXIpLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuXCIrZSkuZm9yRWFjaChmdW5jdGlvbihlKXtlLnJlcG9zaXRpb24oKX0pfSxyLmJvcmRlclJhZGl1cz1mdW5jdGlvbigpe3ZhciBlPWFyZ3VtZW50cy5sZW5ndGg+MCYmdm9pZCAwIT09YXJndW1lbnRzWzBdP2FyZ3VtZW50c1swXTo1LHQ9XCJzdHJpbmdcIj09dHlwZW9mIGU/ZTplK1wicHhcIixuPXIuaGVhZGVyLnN0eWxlLG89ci5jb250ZW50LnN0eWxlLGE9ci5mb290ZXIuc3R5bGU7cmV0dXJuIHIuc3R5bGUuYm9yZGVyUmFkaXVzPXQsci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtaGRyXCIpPyhuLmJvcmRlclRvcExlZnRSYWRpdXM9dCxuLmJvcmRlclRvcFJpZ2h0UmFkaXVzPXQpOihvLmJvcmRlclRvcExlZnRSYWRpdXM9dCxvLmJvcmRlclRvcFJpZ2h0UmFkaXVzPXQpLHIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWZ0ci5hY3RpdmVcIik/KGEuYm9yZGVyQm90dG9tTGVmdFJhZGl1cz10LGEuYm9yZGVyQm90dG9tUmlnaHRSYWRpdXM9dCk6KG8uYm9yZGVyQm90dG9tTGVmdFJhZGl1cz10LG8uYm9yZGVyQm90dG9tUmlnaHRSYWRpdXM9dCkscn0sci5jYWxjU2l6ZUZhY3RvcnM9ZnVuY3Rpb24oKXt2YXIgZT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShyKTtpZih0LmNvbnRhaW5lcj09PWRvY3VtZW50LmJvZHkpci5oZj1wYXJzZUZsb2F0KHIuc3R5bGUubGVmdCkvKGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgtcGFyc2VGbG9hdChyLnN0eWxlLndpZHRoKSksci52Zj1wYXJzZUZsb2F0KHIuc3R5bGUudG9wKS8od2luZG93LmlubmVySGVpZ2h0LXBhcnNlRmxvYXQoZS5oZWlnaHQpKTtlbHNle3ZhciBuPXIucGFyZW50RWxlbWVudC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtyLmhmPXBhcnNlRmxvYXQoci5zdHlsZS5sZWZ0KS8obi53aWR0aC1wYXJzZUZsb2F0KHIuc3R5bGUud2lkdGgpKSxyLnZmPXBhcnNlRmxvYXQoci5zdHlsZS50b3ApLyhuLmhlaWdodC1wYXJzZUZsb2F0KGUuaGVpZ2h0KSl9fSxyLmNsZWFyVGhlbWU9ZnVuY3Rpb24oZSl7cmV0dXJuIGpzUGFuZWwudGhlbWVzLmNvbmNhdChqc1BhbmVsLm1kYnRoZW1lcykuZm9yRWFjaChmdW5jdGlvbihlKXtbXCJwYW5lbFwiLFwianNQYW5lbC10aGVtZS1cIitlLFwicGFuZWwtXCIrZSxlK1wiLWNvbG9yXCJdLmZvckVhY2goZnVuY3Rpb24oZSl7ci5jbGFzc0xpc3QucmVtb3ZlKGUpfSksci5oZWFkZXIuY2xhc3NMaXN0LnJlbW92ZShcInBhbmVsLWhlYWRpbmdcIixcImpzUGFuZWwtdGhlbWUtXCIrZSl9LHIpLHIuaGVhZGVydGl0bGUuY2xhc3NMaXN0LnJlbW92ZShcInBhbmVsLXRpdGxlXCIpLHIuY29udGVudC5jbGFzc0xpc3QucmVtb3ZlKFwicGFuZWwtYm9keVwiLFwianNQYW5lbC1jb250ZW50LWZpbGxlZFwiLFwianNQYW5lbC1jb250ZW50LWZpbGxlZGxpZ2h0XCIpLHIuZm9vdGVyLmNsYXNzTGlzdC5yZW1vdmUoXCJwYW5lbC1mb290ZXJcIiksanNQYW5lbC5zZXRTdHlsZShyLHtiYWNrZ3JvdW5kQ29sb3I6XCJcIixib3JkZXJXaWR0aDpcIlwiLGJvcmRlclN0eWxlOlwiXCIsYm9yZGVyQ29sb3I6XCJcIn0pLGpzUGFuZWwuc2V0U3R5bGUoci5jb250ZW50LHtiYWNrZ3JvdW5kOlwiXCIsYm9yZGVyOlwiXCJ9KSxqc1BhbmVsLnNldFN0eWxlKHIuaGVhZGVydG9vbGJhcix7Ym94U2hhZG93OlwiXCIsd2lkdGg6XCJcIixtYXJnaW5MZWZ0OlwiXCJ9KSxyLmhlYWRlci5zdHlsZS5iYWNrZ3JvdW5kPVwiXCIsQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoci5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1pY29uXCIpKS5jb25jYXQoW3IuaGVhZGVybG9nbyxyLmhlYWRlcnRpdGxlLHIuaGVhZGVydG9vbGJhcixyLmNvbnRlbnRdKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2Uuc3R5bGUuY29sb3I9XCJcIn0pLGUmJmUuY2FsbChyLHIpLHJ9LHIuY2xvc2U9ZnVuY3Rpb24oZSl7dmFyIG49dC5pZCxhPXZvaWQgMCxpPWZ1bmN0aW9uKCl7aWYobyYmd2luZG93LmNsZWFyVGltZW91dChvKSxyLmNsb3NlQ2hpbGRwYW5lbHMoKSxyLnBhcmVudEVsZW1lbnQmJihhPXIucGFyZW50RWxlbWVudC5yZW1vdmVDaGlsZChyKSksIWEpcmV0dXJuITE7ci5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudCgpLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoYyksdC5vbmNsb3NlZCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHIsdC5vbmNsb3NlZCxcImV2ZXJ5XCIpLHIuYXV0b3Bvc2l0aW9uUmVtYWluaW5nKCl9O3JldHVybiBkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHMpLHQub25iZWZvcmVjbG9zZSYmdC5vbmJlZm9yZWNsb3NlLmxlbmd0aD4wJiYhanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHIsdC5vbmJlZm9yZWNsb3NlKT9yOih0LmFuaW1hdGVPdXQ/KHQuYW5pbWF0ZUluJiZqc1BhbmVsLnJlbUNsYXNzKHIsdC5hbmltYXRlSW4pLGpzUGFuZWwuc2V0Q2xhc3Mocix0LmFuaW1hdGVPdXQpLHIuYWRkRXZlbnRMaXN0ZW5lcihcImFuaW1hdGlvbmVuZFwiLGZ1bmN0aW9uKCl7aSgpfSkpOmkoKSxhPyhlJiZlLmNhbGwobixuKSxhPXZvaWQgMCxuKTooZSYmZS5jYWxsKHIsbixyKSwhMSkpfSxyLmNsb3NlQ2hpbGRwYW5lbHM9ZnVuY3Rpb24oZSl7cmV0dXJuIHIuZ2V0Q2hpbGRwYW5lbHMoKS5mb3JFYWNoKGZ1bmN0aW9uKGUpe3JldHVybiBlLmNsb3NlKCl9KSxlJiZlLmNhbGwocixyKSxyfSxyLmNvbnRlbnRSZW1vdmU9ZnVuY3Rpb24oZSl7cmV0dXJuIGpzUGFuZWwuZW1wdHlOb2RlKHIuY29udGVudCksZSYmZS5jYWxsKHIscikscn0sci5jcmVhdGVNaW5pbWl6ZWRSZXBsYWNlbWVudD1mdW5jdGlvbigpe3ZhciBlPWpzUGFuZWwuY3JlYXRlTWluaW1pemVkVGVtcGxhdGUoKSxuPXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHIuaGVhZGVydGl0bGUpLmNvbG9yLG89dC5pY29uZm9udCxhPWUucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWNvbnRyb2xiYXJcIik7cmV0dXJuIGUuc3R5bGUuYmFja2dyb3VuZENvbG9yPVwidHJhbnNwYXJlbnRcIj09PXdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHIuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3I/d2luZG93LmdldENvbXB1dGVkU3R5bGUocikuYmFja2dyb3VuZENvbG9yOndpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHIuaGVhZGVyKS5iYWNrZ3JvdW5kQ29sb3IsZS5pZD1yLmlkK1wiLW1pblwiLGUucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWhlYWRlcmJhclwiKS5yZXBsYWNlQ2hpbGQoci5oZWFkZXJsb2dvLmNsb25lTm9kZSghMCksZS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtaGVhZGVybG9nb1wiKSksZS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtdGl0bGViYXJcIikucmVwbGFjZUNoaWxkKHIuaGVhZGVydGl0bGUuY2xvbmVOb2RlKCEwKSxlLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC10aXRsZVwiKSksZS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtdGl0bGVcIikuc3R5bGUuY29sb3I9bixhLnN0eWxlLmNvbG9yPW4sci5zZXRJY29uZm9udChvLGUpLFwiZW5hYmxlZFwiPT09ci5kYXRhc2V0LmJ0bm5vcm1hbGl6ZT9qc1BhbmVsLnBvaW50ZXJ1cC5mb3JFYWNoKGZ1bmN0aW9uKHQpe2UucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1ub3JtYWxpemVcIikuYWRkRXZlbnRMaXN0ZW5lcih0LGZ1bmN0aW9uKCl7ci5ub3JtYWxpemUoKX0pfSk6YS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLW5vcm1hbGl6ZVwiKS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLFwiZW5hYmxlZFwiPT09ci5kYXRhc2V0LmJ0bm1heGltaXplP2pzUGFuZWwucG9pbnRlcnVwLmZvckVhY2goZnVuY3Rpb24odCl7ZS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLW1heGltaXplXCIpLmFkZEV2ZW50TGlzdGVuZXIodCxmdW5jdGlvbigpe3IubWF4aW1pemUoKX0pfSk6YS5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLW1heGltaXplXCIpLnN0eWxlLmRpc3BsYXk9XCJub25lXCIsXCJlbmFibGVkXCI9PT1yLmRhdGFzZXQuYnRuY2xvc2U/anNQYW5lbC5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbih0KXtlLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tY2xvc2VcIikuYWRkRXZlbnRMaXN0ZW5lcih0LGZ1bmN0aW9uKCl7ci5jbG9zZSgpfSl9KTphLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tY2xvc2VcIikuc3R5bGUuZGlzcGxheT1cIm5vbmVcIixlfSxyLmRyYWdpdD1mdW5jdGlvbihlKXt2YXIgbj1PYmplY3QuYXNzaWduKHt9LGpzUGFuZWwuZGVmYXVsdHMuZHJhZ2l0LHQuZHJhZ2l0KSxvPXIucXVlcnlTZWxlY3RvckFsbChuLmhhbmRsZXMpO3JldHVyblwiZGlzYWJsZVwiPT09ZT9vLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5wb2ludGVyRXZlbnRzPVwibm9uZVwifSk6by5mb3JFYWNoKGZ1bmN0aW9uKGUpe2Uuc3R5bGUucG9pbnRlckV2ZW50cz1cImF1dG9cIn0pLHJ9LHIuZnJvbnQ9ZnVuY3Rpb24oZSl7dmFyIG49IShhcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXSl8fGFyZ3VtZW50c1sxXTtyZXR1cm4ganNQYW5lbC5mcm9udChyKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KEMpLGUmJmUuY2FsbChyLHIpLHQub25mcm9udGVkJiZuJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3Mocix0Lm9uZnJvbnRlZCxcImV2ZXJ5XCIpLHJ9LHIuZ2V0Q2hpbGRwYW5lbHM9ZnVuY3Rpb24oKXtyZXR1cm4gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoci5jb250ZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbFwiKSl9LHIuZ2V0U2NhbGVGYWN0b3I9ZnVuY3Rpb24oKXt2YXIgZT1yLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO3JldHVybnt4OmUud2lkdGgvci5vZmZzZXRXaWR0aCx5OmUuaGVpZ2h0L3Iub2Zmc2V0SGVpZ2h0fX0sci5nZXRUaGVtZURldGFpbHM9ZnVuY3Rpb24oZSl7dmFyIHQ9ZS50b0xvd2VyQ2FzZSgpLnJlcGxhY2UoLyAvZyxcIlwiKSxuPXtjb2xvcjohMSxjb2xvcnM6ITEsZmlsbGluZzohMSxiczohMSxic3RoZW1lOiExfTtpZih0LmVuZHNXaXRoKFwiZmlsbGVkXCIpKW4uZmlsbGluZz1cImZpbGxlZFwiLG4uY29sb3I9dC5zdWJzdHIoMCx0Lmxlbmd0aC02KTtlbHNlIGlmKHQuZW5kc1dpdGgoXCJmaWxsZWRsaWdodFwiKSluLmZpbGxpbmc9XCJmaWxsZWRsaWdodFwiLG4uY29sb3I9dC5zdWJzdHIoMCx0Lmxlbmd0aC0xMSk7ZWxzZSBpZih0LmluY2x1ZGVzKFwiZmlsbGNvbG9yXCIpKXt2YXIgbz10LnNwbGl0KFwiZmlsbGNvbG9yXCIpO2pzUGFuZWwuY29sb3JOYW1lc1tvWzFdXSYmKG9bMV09XCIjXCIranNQYW5lbC5jb2xvck5hbWVzW29bMV1dKSxvWzFdLm1hdGNoKC9eKFswLTlhLWZdezN9fFswLTlhLWZdezZ9KSQvZ2kpJiYob1sxXT1cIiNcIitvWzFdKSxuLmZpbGxpbmc9b1sxXSxuLmNvbG9yPW9bMF19ZWxzZSBuLmZpbGxpbmc9XCJcIixuLmNvbG9yPXQ7aWYobi5jb2xvcnM9anNQYW5lbC5jYWxjQ29sb3JzKG4uY29sb3IpLG4uY29sb3IubWF0Y2goXCItXCIpKXt2YXIgYT1uLmNvbG9yLnNwbGl0KFwiLVwiKTtuLmJzPWFbMF0sbi5ic3RoZW1lPWFbMV0sbi5tZGJTdHlsZT1hWzJdfHx2b2lkIDB9cmV0dXJuIG59LHIuaXNDaGlsZHBhbmVsPWZ1bmN0aW9uKCl7dmFyIGU9ci5jbG9zZXN0KFwiLmpzUGFuZWwtY29udGVudFwiKTtyZXR1cm4hIWUmJmUucGFyZW50RWxlbWVudH0sci5tYXhpbWl6ZT1mdW5jdGlvbihlKXtpZih0Lm9uYmVmb3JlbWF4aW1pemUmJnQub25iZWZvcmVtYXhpbWl6ZS5sZW5ndGg+MCYmIWpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub25iZWZvcmVtYXhpbWl6ZSkpcmV0dXJuIHI7ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh1KTt2YXIgbj1yLnBhcmVudEVsZW1lbnQsbz10Lm1heGltaXplZE1hcmdpbjtyZXR1cm4gbj09PWRvY3VtZW50LmJvZHk/KHIuc3R5bGUud2lkdGg9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudFdpZHRoLW9bMV0tb1szXStcInB4XCIsci5zdHlsZS5oZWlnaHQ9ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsaWVudEhlaWdodC1vWzBdLW9bMl0rXCJweFwiLHIuc3R5bGUubGVmdD1vWzNdK1wicHhcIixyLnN0eWxlLnRvcD1vWzBdK1wicHhcIix0LnBvc2l0aW9uLmZpeGVkfHwoci5zdHlsZS5sZWZ0PXdpbmRvdy5wYWdlWE9mZnNldCtvWzNdK1wicHhcIixyLnN0eWxlLnRvcD13aW5kb3cucGFnZVlPZmZzZXQrb1swXStcInB4XCIpKTooci5zdHlsZS53aWR0aD1uLmNsaWVudFdpZHRoLW9bMV0tb1szXStcInB4XCIsci5zdHlsZS5oZWlnaHQ9bi5jbGllbnRIZWlnaHQtb1swXS1vWzJdK1wicHhcIixyLnN0eWxlLmxlZnQ9b1szXStcInB4XCIsci5zdHlsZS50b3A9b1swXStcInB4XCIpLHIucmVtb3ZlTWluaW1pemVkUmVwbGFjZW1lbnQoKSxyLnN0YXR1cz1cIm1heGltaXplZFwiLHIuc2V0Q29udHJvbHMoW1wiLmpzUGFuZWwtYnRuLW1heGltaXplXCIsXCIuanNQYW5lbC1idG4tc21hbGxpZnlyZXZcIl0pLGpzUGFuZWwuZnJvbnQociksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChnKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHApLHQub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub25zdGF0dXNjaGFuZ2UsXCJldmVyeVwiKSxlJiZlLmNhbGwocixyKSx0Lm9ubWF4aW1pemVkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3Mocix0Lm9ubWF4aW1pemVkLFwiZXZlcnlcIikscn0sci5taW5pbWl6ZT1mdW5jdGlvbihlKXtpZihcIm1pbmltaXplZFwiPT09ci5zdGF0dXMpcmV0dXJuIHI7aWYodC5vbmJlZm9yZW1pbmltaXplJiZ0Lm9uYmVmb3JlbWluaW1pemUubGVuZ3RoPjAmJiFqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3Mocix0Lm9uYmVmb3JlbWluaW1pemUpKXJldHVybiByO2lmKGRvY3VtZW50LmRpc3BhdGNoRXZlbnQobSksIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwianNQYW5lbC1yZXBsYWNlbWVudC1jb250YWluZXJcIikpe3ZhciBuPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIik7bi5pZD1cImpzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyXCIsZG9jdW1lbnQuYm9keS5hcHBlbmQobil9aWYoci5zdHlsZS5sZWZ0PVwiLTk5OTlweFwiLHIuc3RhdHVzQmVmb3JlPXIuc3RhdHVzLHIuc3RhdHVzPVwibWluaW1pemVkXCIsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChiKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHApLHQub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub25zdGF0dXNjaGFuZ2UsXCJldmVyeVwiKSx0Lm1pbmltaXplVG8pe3ZhciBvPXIuY3JlYXRlTWluaW1pemVkUmVwbGFjZW1lbnQoKSxhPXZvaWQgMCxpPXZvaWQgMCxsPXZvaWQgMDtcImRlZmF1bHRcIj09PXQubWluaW1pemVUbz9kb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImpzUGFuZWwtcmVwbGFjZW1lbnQtY29udGFpbmVyXCIpLmFwcGVuZChvKTpcInBhcmVudHBhbmVsXCI9PT10Lm1pbmltaXplVG8/KGE9KGw9KGk9ci5jbG9zZXN0KFwiLmpzUGFuZWwtY29udGVudFwiKS5wYXJlbnRFbGVtZW50KS5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtbWluaW1pemVkLWJveFwiKSlbbC5sZW5ndGgtMV0pLmFwcGVuZChvKTpcInBhcmVudFwiPT09dC5taW5pbWl6ZVRvPygoYT0oaT1yLnBhcmVudEVsZW1lbnQpLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1taW5pbWl6ZWQtY29udGFpbmVyXCIpKXx8KChhPWRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIikpLmNsYXNzTmFtZT1cImpzUGFuZWwtbWluaW1pemVkLWNvbnRhaW5lclwiLGkuYXBwZW5kKGEpKSxhLmFwcGVuZChvKSk6ZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0Lm1pbmltaXplVG8pLmFwcGVuZChvKX1yZXR1cm4gZSYmZS5jYWxsKHIsciksdC5vbm1pbmltaXplZCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHIsdC5vbm1pbmltaXplZCxcImV2ZXJ5XCIpLHJ9LHIubm9ybWFsaXplPWZ1bmN0aW9uKGUpe3JldHVyblwibm9ybWFsaXplZFwiPT09ci5zdGF0dXM/cjp0Lm9uYmVmb3Jlbm9ybWFsaXplJiZ0Lm9uYmVmb3Jlbm9ybWFsaXplLmxlbmd0aD4wJiYhanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHIsdC5vbmJlZm9yZW5vcm1hbGl6ZSk/cjooZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChmKSxyLnN0eWxlLndpZHRoPXIuY3VycmVudERhdGEud2lkdGgsci5zdHlsZS5oZWlnaHQ9ci5jdXJyZW50RGF0YS5oZWlnaHQsci5zdHlsZS5sZWZ0PXIuY3VycmVudERhdGEubGVmdCxyLnN0eWxlLnRvcD1yLmN1cnJlbnREYXRhLnRvcCxyLnJlbW92ZU1pbmltaXplZFJlcGxhY2VtZW50KCksci5zdGF0dXM9XCJub3JtYWxpemVkXCIsci5zZXRDb250cm9scyhbXCIuanNQYW5lbC1idG4tbm9ybWFsaXplXCIsXCIuanNQYW5lbC1idG4tc21hbGxpZnlyZXZcIl0pLGpzUGFuZWwuZnJvbnQociksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChoKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHApLHQub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub25zdGF0dXNjaGFuZ2UsXCJldmVyeVwiKSxlJiZlLmNhbGwocixyKSx0Lm9ubm9ybWFsaXplZCYmanNQYW5lbC5wcm9jZXNzQ2FsbGJhY2tzKHIsdC5vbm5vcm1hbGl6ZWQsXCJldmVyeVwiKSxyKX0sci5vdmVybGFwcz1mdW5jdGlvbihlLHQpe3JldHVybiBqc1BhbmVsLm92ZXJsYXBzKHIsZSx0KX0sci5yZW1vdmVNaW5pbWl6ZWRSZXBsYWNlbWVudD1mdW5jdGlvbigpe3ZhciBlPWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHIuaWQrXCItbWluXCIpO3JldHVybiBlJiZlLnBhcmVudEVsZW1lbnQucmVtb3ZlQ2hpbGQoZSkscn0sci5yZXBvc2l0aW9uPWZ1bmN0aW9uKCl7Zm9yKHZhciBlPWFyZ3VtZW50cy5sZW5ndGgsbj1BcnJheShlKSxvPTA7bzxlO28rKyluW29dPWFyZ3VtZW50c1tvXTt2YXIgYT10LnBvc2l0aW9uLGk9ITAsbD12b2lkIDA7cmV0dXJuIG4uZm9yRWFjaChmdW5jdGlvbihlKXtcInN0cmluZ1wiPT10eXBlb2YgZXx8XCJvYmplY3RcIj09PSh2b2lkIDA9PT1lP1widW5kZWZpbmVkXCI6X3R5cGVvZihlKSk/YT1lOlwiYm9vbGVhblwiPT10eXBlb2YgZT9pPWU6XCJmdW5jdGlvblwiPT10eXBlb2YgZSYmKGw9ZSl9KSxqc1BhbmVsLnBvc2l0aW9uKHIsYSksaSYmci5zYXZlQ3VycmVudFBvc2l0aW9uKCksbCYmbC5jYWxsKHIscikscn0sci5yZXBvc2l0aW9uT25TbmFwPWZ1bmN0aW9uKGUpe3ZhciBuPVwiMFwiLG89XCIwXCIsYT1qc1BhbmVsLnBPY29udGFpbm1lbnQodC5kcmFnaXQuY29udGFpbm1lbnQpO3QuZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQmJihcImxlZnQtdG9wXCI9PT1lPyhuPWFbM10sbz1hWzBdKTpcInJpZ2h0LXRvcFwiPT09ZT8obj0tYVsxXSxvPWFbMF0pOlwicmlnaHQtYm90dG9tXCI9PT1lPyhuPS1hWzFdLG89LWFbMl0pOlwibGVmdC1ib3R0b21cIj09PWU/KG49YVszXSxvPS1hWzJdKTpcImNlbnRlci10b3BcIj09PWU/KG49YVszXS8yLWFbMV0vMixvPWFbMF0pOlwiY2VudGVyLWJvdHRvbVwiPT09ZT8obj1hWzNdLzItYVsxXS8yLG89LWFbMl0pOlwibGVmdC1jZW50ZXJcIj09PWU/KG49YVszXSxvPWFbMF0vMi1hWzJdLzIpOlwicmlnaHQtY2VudGVyXCI9PT1lJiYobj0tYVsxXSxvPWFbMF0vMi1hWzJdLzIpKSxqc1BhbmVsLnBvc2l0aW9uKHIsZSksanNQYW5lbC5zZXRTdHlsZShyLHtsZWZ0OlwiY2FsYyhcIityLnN0eWxlLmxlZnQrXCIgKyBcIituK1wicHgpXCIsdG9wOlwiY2FsYyhcIityLnN0eWxlLnRvcCtcIiArIFwiK28rXCJweClcIn0pfSxyLnJlc2l6ZT1mdW5jdGlvbigpe2Zvcih2YXIgZT1hcmd1bWVudHMubGVuZ3RoLHQ9QXJyYXkoZSksbj0wO248ZTtuKyspdFtuXT1hcmd1bWVudHNbbl07dmFyIG89d2luZG93LmdldENvbXB1dGVkU3R5bGUociksYT17d2lkdGg6by53aWR0aCxoZWlnaHQ6by5oZWlnaHR9LGk9ITAsbD12b2lkIDA7dC5mb3JFYWNoKGZ1bmN0aW9uKGUpe1wic3RyaW5nXCI9PXR5cGVvZiBlP2E9ZTpcIm9iamVjdFwiPT09KHZvaWQgMD09PWU/XCJ1bmRlZmluZWRcIjpfdHlwZW9mKGUpKT9hPU9iamVjdC5hc3NpZ24oYSxlKTpcImJvb2xlYW5cIj09dHlwZW9mIGU/aT1lOlwiZnVuY3Rpb25cIj09dHlwZW9mIGUmJihsPWUpfSk7dmFyIHM9anNQYW5lbC5wT3NpemUocixhKTtyZXR1cm4gci5zdHlsZS53aWR0aD1zLndpZHRoLHIuc3R5bGUuaGVpZ2h0PXMuaGVpZ2h0LGkmJnIuc2F2ZUN1cnJlbnREaW1lbnNpb25zKCksbCYmbC5jYWxsKHIscikscn0sci5yZXNpemVpdD1mdW5jdGlvbihlKXt2YXIgdD1yLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1yZXNpemVpdC1oYW5kbGVcIik7cmV0dXJuXCJkaXNhYmxlXCI9PT1lP3QuZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLnBvaW50ZXJFdmVudHM9XCJub25lXCJ9KTp0LmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5wb2ludGVyRXZlbnRzPVwiYXV0b1wifSkscn0sci5zYXZlQ3VycmVudERpbWVuc2lvbnM9ZnVuY3Rpb24oKXt2YXIgZT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShyKTtyLmN1cnJlbnREYXRhLndpZHRoPWUud2lkdGgsXCJub3JtYWxpemVkXCI9PT1yLnN0YXR1cyYmKHIuY3VycmVudERhdGEuaGVpZ2h0PWUuaGVpZ2h0KX0sci5zYXZlQ3VycmVudFBvc2l0aW9uPWZ1bmN0aW9uKCl7dmFyIGU9d2luZG93LmdldENvbXB1dGVkU3R5bGUocik7ci5jdXJyZW50RGF0YS5sZWZ0PWUubGVmdCxyLmN1cnJlbnREYXRhLnRvcD1lLnRvcH0sci5zZXRDb250cm9scz1mdW5jdGlvbihlLHQpe3JldHVybiByLmhlYWRlci5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtYnRuXCIpLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5kaXNwbGF5PVwiYmxvY2tcIn0pLGUuZm9yRWFjaChmdW5jdGlvbihlKXt2YXIgdD1yLmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcihlKTt0JiYodC5zdHlsZS5kaXNwbGF5PVwibm9uZVwiKX0pLHQmJnQuY2FsbChyLHIpLHJ9LHIuc2V0Q29udHJvbFN0YXR1cz1mdW5jdGlvbihlKXt2YXIgdD1hcmd1bWVudHMubGVuZ3RoPjEmJnZvaWQgMCE9PWFyZ3VtZW50c1sxXT9hcmd1bWVudHNbMV06XCJlbmFibGVcIixuPWFyZ3VtZW50c1syXTtpZihcImRpc2FibGVcIj09PXQpe2lmKFwicmVtb3ZlZFwiIT09ci5nZXRBdHRyaWJ1dGUoXCJkYXRhLWJ0blwiK2UpKXtyLnNldEF0dHJpYnV0ZShcImRhdGEtYnRuXCIrZSxcImRpc2FibGVkXCIpO3ZhciBvPXIuY29udHJvbGJhci5xdWVyeVNlbGVjdG9yKFwiLmpzUGFuZWwtYnRuLVwiK2UpO28uc3R5bGUucG9pbnRlckV2ZW50cz1cIm5vbmVcIixvLnN0eWxlLm9wYWNpdHk9LjQsby5zdHlsZS5jdXJzb3I9XCJkZWZhdWx0XCJ9fWVsc2UgaWYoXCJlbmFibGVcIj09PXQpe2lmKFwicmVtb3ZlZFwiIT09ci5nZXRBdHRyaWJ1dGUoXCJkYXRhLWJ0blwiK2UpKXtyLnNldEF0dHJpYnV0ZShcImRhdGEtYnRuXCIrZSxcImVuYWJsZWRcIik7dmFyIGE9ci5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3IoXCIuanNQYW5lbC1idG4tXCIrZSk7YS5zdHlsZS5wb2ludGVyRXZlbnRzPVwiYXV0b1wiLGEuc3R5bGUub3BhY2l0eT0xLGEuc3R5bGUuY3Vyc29yPVwicG9pbnRlclwifX1lbHNlIGlmKFwicmVtb3ZlXCI9PT10KXt2YXIgaT1yLmNvbnRyb2xiYXIucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWJ0bi1cIitlKTtyLmNvbnRyb2xiYXIucmVtb3ZlQ2hpbGQoaSksci5zZXRBdHRyaWJ1dGUoXCJkYXRhLWJ0blwiK2UsXCJyZW1vdmVkXCIpfXJldHVybiBuJiZuLmNhbGwocixyKSxyfSxyLnNldEhlYWRlckNvbnRyb2xzPWZ1bmN0aW9uKGUpe3ZhciBuPVtcImNsb3NlXCIsXCJtYXhpbWl6ZVwiLFwibm9ybWFsaXplXCIsXCJtaW5pbWl6ZVwiLFwic21hbGxpZnlcIixcInNtYWxsaWZ5cmV2XCJdLG89dC5oZWFkZXJDb250cm9scztyZXR1cm5cInN0cmluZ1wiPT10eXBlb2Ygbz9cIm5vbmVcIj09PW8/bi5mb3JFYWNoKGZ1bmN0aW9uKGUpe3Iuc2V0Q29udHJvbFN0YXR1cyhlLFwicmVtb3ZlXCIpfSk6XCJjbG9zZW9ubHlcIj09PW8mJm4uZm9yRWFjaChmdW5jdGlvbihlKXtcImNsb3NlXCIhPT1lJiZyLnNldENvbnRyb2xTdGF0dXMoZSxcInJlbW92ZVwiKX0pOm4uZm9yRWFjaChmdW5jdGlvbihlKXtvW2VdJiZyLnNldENvbnRyb2xTdGF0dXMoZSxvW2VdKX0pLGUmJmUuY2FsbChyLHIpLHJ9LHIuc2V0SGVhZGVyTG9nbz1mdW5jdGlvbihlLHQpe3ZhciBuPVtyLmhlYWRlcmxvZ29dLG89ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIityLmlkK1wiLW1pblwiKTtyZXR1cm4gbyYmbi5wdXNoKG8ucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLWhlYWRlcmxvZ29cIikpLFwic3RyaW5nXCI9PXR5cGVvZiBlP1wiPFwiIT09ZS5zdWJzdHIoMCwxKT9uLmZvckVhY2goZnVuY3Rpb24odCl7anNQYW5lbC5lbXB0eU5vZGUodCk7dmFyIG49ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImltZ1wiKTtuLnNyYz1lLHQuYXBwZW5kKG4pfSk6bi5mb3JFYWNoKGZ1bmN0aW9uKHQpe3QuaW5uZXJIVE1MPWV9KTpuLmZvckVhY2goZnVuY3Rpb24odCl7anNQYW5lbC5lbXB0eU5vZGUodCksdC5hcHBlbmQoZSl9KSxuLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5xdWVyeVNlbGVjdG9yQWxsKFwiaW1nXCIpLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5zdHlsZS5tYXhIZWlnaHQ9Z2V0Q29tcHV0ZWRTdHlsZShyLmhlYWRlcmJhcikuaGVpZ2h0fSl9KSx0JiZ0LmNhbGwocixyKSxyfSxyLnNldEhlYWRlclJlbW92ZT1mdW5jdGlvbihlKXtyZXR1cm4gci5yZW1vdmVDaGlsZChyLmhlYWRlciksci5jb250ZW50LmNsYXNzTGlzdC5hZGQoXCJqc1BhbmVsLWNvbnRlbnQtbm9oZWFkZXJcIiksW1wiY2xvc2VcIixcIm1heGltaXplXCIsXCJub3JtYWxpemVcIixcIm1pbmltaXplXCIsXCJzbWFsbGlmeVwiLFwic21hbGxpZnlyZXZcIl0uZm9yRWFjaChmdW5jdGlvbihlKXtyLnNldEF0dHJpYnV0ZShcImRhdGEtYnRuXCIrZSxcInJlbW92ZWRcIil9KSxlJiZlLmNhbGwocixyKSxyfSxyLnNldEhlYWRlclRpdGxlPWZ1bmN0aW9uKGUsdCl7dmFyIG49W3IuaGVhZGVydGl0bGVdLG89ZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNcIityLmlkK1wiLW1pblwiKTtyZXR1cm4gbyYmbi5wdXNoKG8ucXVlcnlTZWxlY3RvcihcIi5qc1BhbmVsLXRpdGxlXCIpKSxcInN0cmluZ1wiPT10eXBlb2YgZT9uLmZvckVhY2goZnVuY3Rpb24odCl7dC5pbm5lckhUTUw9ZX0pOlwiZnVuY3Rpb25cIj09dHlwZW9mIGU/bi5mb3JFYWNoKGZ1bmN0aW9uKHQpe2pzUGFuZWwuZW1wdHlOb2RlKHQpLHQuaW5uZXJIVE1MPWUoKX0pOm4uZm9yRWFjaChmdW5jdGlvbih0KXtqc1BhbmVsLmVtcHR5Tm9kZSh0KSx0LmFwcGVuZChlKX0pLHQmJnQuY2FsbChyLHIpLHJ9LHIuc2V0SWNvbmZvbnQ9ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXSYmYXJndW1lbnRzWzBdLHQ9YXJndW1lbnRzLmxlbmd0aD4xJiZ2b2lkIDAhPT1hcmd1bWVudHNbMV0/YXJndW1lbnRzWzFdOnIsbj1hcmd1bWVudHNbMl07aWYoITEhPT1lKXt2YXIgbz12b2lkIDAsYT12b2lkIDA7aWYoXCJib290c3RyYXBcIj09PWV8fFwiZ2x5cGhpY29uXCI9PT1lKW89W1wiZ2x5cGhpY29uIGdseXBoaWNvbi1yZW1vdmVcIixcImdseXBoaWNvbiBnbHlwaGljb24tZnVsbHNjcmVlblwiLFwiZ2x5cGhpY29uIGdseXBoaWNvbi1yZXNpemUtZnVsbFwiLFwiZ2x5cGhpY29uIGdseXBoaWNvbi1taW51c1wiLFwiZ2x5cGhpY29uIGdseXBoaWNvbi1jaGV2cm9uLWRvd25cIixcImdseXBoaWNvbiBnbHlwaGljb24tY2hldnJvbi11cFwiXTtlbHNlIGlmKFwiZmFcIj09PWV8fFwiZmFyXCI9PT1lfHxcImZhbFwiPT09ZXx8XCJmYXNcIj09PWUpbz1bZStcIiBmYS13aW5kb3ctY2xvc2VcIixlK1wiIGZhLXdpbmRvdy1tYXhpbWl6ZVwiLGUrXCIgZmEtd2luZG93LXJlc3RvcmVcIixlK1wiIGZhLXdpbmRvdy1taW5pbWl6ZVwiLGUrXCIgZmEtY2hldnJvbi1kb3duXCIsZStcIiBmYS1jaGV2cm9uLXVwXCJdO2Vsc2UgaWYoXCJtYXRlcmlhbC1pY29uc1wiPT09ZSlvPVtlLGUsZSxlLGUsZV0sYT1bXCJjbG9zZVwiLFwiZnVsbHNjcmVlblwiLFwiZnVsbHNjcmVlbl9leGl0XCIsXCJjYWxsX3JlY2VpdmVkXCIsXCJleHBhbmRfbW9yZVwiLFwiZXhwYW5kX2xlc3NcIl0sdC5jb250cm9sYmFyLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1idG5cIikuZm9yRWFjaChmdW5jdGlvbihlKXtlLnN0eWxlLnBhZGRpbmc9XCI2cHggMCA4cHggMFwifSk7ZWxzZXtpZighQXJyYXkuaXNBcnJheShlKSlyZXR1cm4gdDtvPVtcImN1c3RvbS1jb250cm9sLWljb24gXCIrZVs1XSxcImN1c3RvbS1jb250cm9sLWljb24gXCIrZVs0XSxcImN1c3RvbS1jb250cm9sLWljb24gXCIrZVszXSxcImN1c3RvbS1jb250cm9sLWljb24gXCIrZVsyXSxcImN1c3RvbS1jb250cm9sLWljb24gXCIrZVsxXSxcImN1c3RvbS1jb250cm9sLWljb24gXCIrZVswXV19dC5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtY29udHJvbGJhciAuanNQYW5lbC1idG5cIikuZm9yRWFjaChmdW5jdGlvbihlKXtqc1BhbmVsLmVtcHR5Tm9kZShlKS5pbm5lckhUTUw9XCI8c3Bhbj48L3NwYW4+XCJ9KSxBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbCh0LnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1jb250cm9sYmFyIC5qc1BhbmVsLWJ0biA+IHNwYW5cIikpLnJldmVyc2UoKS5mb3JFYWNoKGZ1bmN0aW9uKHQsbil7dC5jbGFzc05hbWU9b1tuXSxcIm1hdGVyaWFsLWljb25zXCI9PT1lJiYodC50ZXh0Q29udGVudD1hW25dKX0pfXJldHVybiBuJiZuLmNhbGwodCx0KSx0fSxyLnNldFJ0bD1mdW5jdGlvbigpe1tyLmhlYWRlcixyLmhlYWRlcmJhcixyLnRpdGxlYmFyLHIuY29udHJvbGJhcixyLmhlYWRlcnRvb2xiYXIsci5mb290ZXJdLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5jbGFzc0xpc3QuYWRkKFwianNQYW5lbC1ydGxcIil9KSxbci5oZWFkZXJ0aXRsZSxyLmhlYWRlcnRvb2xiYXIsci5jb250ZW50LHIuZm9vdGVyXS5mb3JFYWNoKGZ1bmN0aW9uKGUpe2UuZGlyPVwicnRsXCIsdC5ydGwubGFuZyYmKGUubGFuZz10LnJ0bC5sYW5nKX0pfSxyLnNldFNpemU9ZnVuY3Rpb24oKXtpZih0LnBhbmVsU2l6ZSl7dmFyIGU9anNQYW5lbC5wT3NpemUocix0LnBhbmVsU2l6ZSk7ci5zdHlsZS53aWR0aD1lLndpZHRoLHIuc3R5bGUuaGVpZ2h0PWUuaGVpZ2h0fWVsc2UgaWYodC5jb250ZW50U2l6ZSl7dmFyIG49anNQYW5lbC5wT3NpemUocix0LmNvbnRlbnRTaXplKTtyLmNvbnRlbnQuc3R5bGUud2lkdGg9bi53aWR0aCxyLmNvbnRlbnQuc3R5bGUuaGVpZ2h0PW4uaGVpZ2h0LHIuc3R5bGUud2lkdGg9bi53aWR0aCxyLmNvbnRlbnQuc3R5bGUud2lkdGg9XCIxMDAlXCJ9cmV0dXJuIHJ9LHIuc2V0VGhlbWU9ZnVuY3Rpb24oKXt2YXIgZT1hcmd1bWVudHMubGVuZ3RoPjAmJnZvaWQgMCE9PWFyZ3VtZW50c1swXT9hcmd1bWVudHNbMF06dC50aGVtZSxuPWFyZ3VtZW50c1sxXTtpZihyLmNsZWFyVGhlbWUoKSxcIm5vbmVcIj09PWUpcmV0dXJuIHIuc3R5bGUuYmFja2dyb3VuZENvbG9yPVwiI2ZmZlwiLHI7dmFyIG89ci5nZXRUaGVtZURldGFpbHMoZSk7cmV0dXJuIG8uYnM/ci5hcHBseUJvb3RzdHJhcFRoZW1lKG8pOi0xIT09anNQYW5lbC50aGVtZXMuaW5kZXhPZihvLmNvbG9yKT9yLmFwcGx5QnVpbHRJblRoZW1lKG8pOnIuYXBwbHlBcmJpdHJhcnlUaGVtZShvKSx0LmJvcmRlcj9yLmFwcGx5VGhlbWVCb3JkZXIobyk6KHIuc3R5bGUuYm9yZGVyV2lkdGg9XCJcIixyLnN0eWxlLmJvcmRlclN0eWxlPVwiXCIsci5zdHlsZS5ib3JkZXJDb2xvcj1cIlwiKSxuJiZuLmNhbGwocixyKSxyfSxyLnNtYWxsaWZ5PWZ1bmN0aW9uKGUpe2lmKFwic21hbGxpZmllZFwiPT09ci5zdGF0dXN8fFwic21hbGxpZmllZG1heFwiPT09ci5zdGF0dXMpcmV0dXJuIHI7aWYodC5vbmJlZm9yZXNtYWxsaWZ5JiZ0Lm9uYmVmb3Jlc21hbGxpZnkubGVuZ3RoPjAmJiFqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3Mocix0Lm9uYmVmb3Jlc21hbGxpZnkpKXJldHVybiByO2RvY3VtZW50LmRpc3BhdGNoRXZlbnQoeSksXCJub3JtYWxpemVkXCI9PT1yLnN0YXR1cyYmci5zYXZlQ3VycmVudERpbWVuc2lvbnMoKSxyLnN0eWxlLm92ZXJmbG93PVwiaGlkZGVuXCI7dmFyIG49d2luZG93LmdldENvbXB1dGVkU3R5bGUociksbz1wYXJzZUZsb2F0KHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKHIuaGVhZGVyYmFyKS5oZWlnaHQpO3Iuc3R5bGUuaGVpZ2h0PXBhcnNlRmxvYXQobi5ib3JkZXJUb3BXaWR0aCkrcGFyc2VGbG9hdChuLmJvcmRlckJvdHRvbVdpZHRoKStvK1wicHhcIixcIm5vcm1hbGl6ZWRcIj09PXIuc3RhdHVzPyhyLnNldENvbnRyb2xzKFtcIi5qc1BhbmVsLWJ0bi1ub3JtYWxpemVcIixcIi5qc1BhbmVsLWJ0bi1zbWFsbGlmeVwiXSksci5zdGF0dXM9XCJzbWFsbGlmaWVkXCIsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh2KSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHApLHQub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub25zdGF0dXNjaGFuZ2UsXCJldmVyeVwiKSk6XCJtYXhpbWl6ZWRcIj09PXIuc3RhdHVzJiYoci5zZXRDb250cm9scyhbXCIuanNQYW5lbC1idG4tbWF4aW1pemVcIixcIi5qc1BhbmVsLWJ0bi1zbWFsbGlmeVwiXSksci5zdGF0dXM9XCJzbWFsbGlmaWVkbWF4XCIsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudCh3KSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHApLHQub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub25zdGF0dXNjaGFuZ2UsXCJldmVyeVwiKSk7dmFyIGE9ci5xdWVyeVNlbGVjdG9yQWxsKFwiLmpzUGFuZWwtbWluaW1pemVkLWJveFwiKTtyZXR1cm4gYVthLmxlbmd0aC0xXS5zdHlsZS5kaXNwbGF5PVwibm9uZVwiLGUmJmUuY2FsbChyLHIpLHQub25zbWFsbGlmaWVkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3Mocix0Lm9uc21hbGxpZmllZCxcImV2ZXJ5XCIpLHJ9LHIudW5zbWFsbGlmeT1mdW5jdGlvbihlKXtpZihcInNtYWxsaWZpZWRcIj09PXIuc3RhdHVzfHxcInNtYWxsaWZpZWRtYXhcIj09PXIuc3RhdHVzKXtpZih0Lm9uYmVmb3JldW5zbWFsbGlmeSYmdC5vbmJlZm9yZXVuc21hbGxpZnkubGVuZ3RoPjAmJiFqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3Mocix0Lm9uYmVmb3JldW5zbWFsbGlmeSkpcmV0dXJuIHI7ZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChqKSxyLnN0eWxlLm92ZXJmbG93PVwidmlzaWJsZVwiLGpzUGFuZWwuZnJvbnQociksXCJzbWFsbGlmaWVkXCI9PT1yLnN0YXR1cz8oci5zdHlsZS5oZWlnaHQ9ci5jdXJyZW50RGF0YS5oZWlnaHQsci5zZXRDb250cm9scyhbXCIuanNQYW5lbC1idG4tbm9ybWFsaXplXCIsXCIuanNQYW5lbC1idG4tc21hbGxpZnlyZXZcIl0pLHIuc3RhdHVzPVwibm9ybWFsaXplZFwiLGRvY3VtZW50LmRpc3BhdGNoRXZlbnQoaCksZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChwKSx0Lm9uc3RhdHVzY2hhbmdlJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3Mocix0Lm9uc3RhdHVzY2hhbmdlLFwiZXZlcnlcIikpOlwic21hbGxpZmllZG1heFwiPT09ci5zdGF0dXM/ci5tYXhpbWl6ZSgpOlwibWluaW1pemVkXCI9PT1yLnN0YXR1cyYmci5ub3JtYWxpemUoKTt2YXIgbj1yLnF1ZXJ5U2VsZWN0b3JBbGwoXCIuanNQYW5lbC1taW5pbWl6ZWQtYm94XCIpO25bbi5sZW5ndGgtMV0uc3R5bGUuZGlzcGxheT1cImZsZXhcIixlJiZlLmNhbGwocixyKSx0Lm9udW5zbWFsbGlmaWVkJiZqc1BhbmVsLnByb2Nlc3NDYWxsYmFja3Mocix0Lm9udW5zbWFsbGlmaWVkLFwiZXZlcnlcIil9cmV0dXJuIHJ9LHIuaWQ9dC5pZCxyLmNsYXNzTGlzdC5hZGQoXCJqc1BhbmVsLVwiK3QucGFuZWx0eXBlKSxcInN0YW5kYXJkXCI9PT10LnBhbmVsdHlwZSYmKHIuc3R5bGUuekluZGV4PXRoaXMuemkubmV4dCgpKSxpLmFwcGVuZChyKSxyLmZyb250KCExLCExKSxyLnNldFRoZW1lKHQudGhlbWUpLHQuYm94U2hhZG93JiZyLmNsYXNzTGlzdC5hZGQoXCJqc1BhbmVsLWRlcHRoLVwiK3QuYm94U2hhZG93KSx0LmhlYWRlcil7aWYodC5oZWFkZXJMb2dvJiZyLnNldEhlYWRlckxvZ28odC5oZWFkZXJMb2dvKSxyLnNldEljb25mb250KHQuaWNvbmZvbnQpLHIuc2V0SGVhZGVyVGl0bGUodC5oZWFkZXJUaXRsZSksci5zZXRIZWFkZXJDb250cm9scygpLFwiYXV0by1zaG93LWhpZGVcIj09PXQuaGVhZGVyKXt2YXIgVD10LnRoZW1lLnNwbGl0KFwiLVwiKSxMPVwianNQYW5lbC1kZXB0aC1cIit0LmJveFNoYWRvdyxEPVwiYmctXCIsaz12b2lkIDA7VFsxXSYmKEQrPVRbMV0pLFRbMl0mJihrPVRbMV0rXCItY29sb3ItXCIrVFsyXSksci5oZWFkZXIuc3R5bGUub3BhY2l0eT0wLFwiYm9vdHN0cmFwXCIhPT1UWzBdJiZcIm1kYlwiIT09VFswXXx8KHRoaXMucmVtQ2xhc3MocixEKSxcIm1kYlwiPT09VFswXSYmdGhpcy5yZW1DbGFzcyhyLGspKSxyLnN0eWxlLmJhY2tncm91bmRDb2xvcj1cInRyYW5zcGFyZW50XCIsdGhpcy5yZW1DbGFzcyhyLEwpLHRoaXMuc2V0Q2xhc3Moci5jb250ZW50LEwpLHIuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWVudGVyXCIsZnVuY3Rpb24oKXtyLmhlYWRlci5zdHlsZS5vcGFjaXR5PTEsXCJib290c3RyYXBcIiE9PVRbMF0mJlwibWRiXCIhPT1UWzBdfHwoanNQYW5lbC5zZXRDbGFzcyhyLEQpLFwibWRiXCI9PT1UWzBdJiZqc1BhbmVsLnNldENsYXNzKHIsaykpLGpzUGFuZWwuc2V0Q2xhc3MocixMKSxqc1BhbmVsLnJlbUNsYXNzKHIuY29udGVudCxMKX0pLHIuaGVhZGVyLmFkZEV2ZW50TGlzdGVuZXIoXCJtb3VzZWxlYXZlXCIsZnVuY3Rpb24oKXtyLmhlYWRlci5zdHlsZS5vcGFjaXR5PTAsXCJib290c3RyYXBcIiE9PVRbMF0mJlwibWRiXCIhPT1UWzBdfHwoanNQYW5lbC5yZW1DbGFzcyhyLEQpLFwibWRiXCI9PT1UWzBdJiZqc1BhbmVsLnJlbUNsYXNzKHIsaykpLGpzUGFuZWwucmVtQ2xhc3MocixMKSxqc1BhbmVsLnNldENsYXNzKHIuY29udGVudCxMKX0pfX1lbHNlIHIuc2V0SGVhZGVyUmVtb3ZlKCk7aWYodC5oZWFkZXJUb29sYmFyJiZyLmFkZFRvb2xiYXIoci5oZWFkZXJ0b29sYmFyLHQuaGVhZGVyVG9vbGJhciksdC5mb290ZXJUb29sYmFyJiZyLmFkZFRvb2xiYXIoci5mb290ZXIsdC5mb290ZXJUb29sYmFyKSx0LmJvcmRlclJhZGl1cyYmci5ib3JkZXJSYWRpdXModC5ib3JkZXJSYWRpdXMpLHQuY29udGVudCYmKFwiZnVuY3Rpb25cIj09dHlwZW9mIHQuY29udGVudD90LmNvbnRlbnQuY2FsbChyLHIpOlwic3RyaW5nXCI9PXR5cGVvZiB0LmNvbnRlbnQ/ci5jb250ZW50LmlubmVySFRNTD10LmNvbnRlbnQ6ci5jb250ZW50LmFwcGVuZCh0LmNvbnRlbnQpKSx0LmNvbnRlbnRBamF4JiZ0aGlzLmFqYXgocix0LmNvbnRlbnRBamF4KSx0LmNvbnRlbnRGZXRjaCYmdGhpcy5mZXRjaChyKSx0LmNvbnRlbnRPdmVyZmxvdyl7dmFyIHE9dC5jb250ZW50T3ZlcmZsb3cuc3BsaXQoXCIgXCIpOzE9PT1xLmxlbmd0aD9yLmNvbnRlbnQuc3R5bGUub3ZlcmZsb3c9cVswXToyPT09cS5sZW5ndGgmJihyLmNvbnRlbnQuc3R5bGUub3ZlcmZsb3dYPXFbMF0sci5jb250ZW50LnN0eWxlLm92ZXJmbG93WT1xWzFdKX1pZih0LnJ0bCYmci5zZXRSdGwoKSxyLnNldFNpemUoKSxyLnN0YXR1cz1cIm5vcm1hbGl6ZWRcIix0LnBvc2l0aW9ufHxcImN1cnNvclwiIT09dC5wb3NpdGlvbj90aGlzLnBvc2l0aW9uKHIsdC5wb3NpdGlvbik6ci5zdHlsZS5vcGFjaXR5PTEsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChoKSxyLmNhbGNTaXplRmFjdG9ycygpLHQuYW5pbWF0ZUluJiYoci5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsZnVuY3Rpb24oKXtlLnJlbUNsYXNzKHIsdC5hbmltYXRlSW4pfSksdGhpcy5zZXRDbGFzcyhyLHQuYW5pbWF0ZUluKSksdC5zeW5jTWFyZ2lucyl7dmFyIFI9dGhpcy5wT2NvbnRhaW5tZW50KHQubWF4aW1pemVkTWFyZ2luKTt0LmRyYWdpdCYmKHQuZHJhZ2l0LmNvbnRhaW5tZW50PVIsdC5kcmFnaXQuc25hcCYmKHQuZHJhZ2l0LnNuYXAuY29udGFpbm1lbnQ9ITApKSx0LnJlc2l6ZWl0JiYodC5yZXNpemVpdC5jb250YWlubWVudD1SKX1pZih0LmRyYWdpdD8odGhpcy5kcmFnaXQocix0LmRyYWdpdCksci5hZGRFdmVudExpc3RlbmVyKFwianNwYW5lbGRyYWdzdG9wXCIsZnVuY3Rpb24oZSl7ZS5kZXRhaWw9PT1yLmlkJiZyLmNhbGNTaXplRmFjdG9ycygpfSwhMSkpOnIudGl0bGViYXIuc3R5bGUuY3Vyc29yPVwiZGVmYXVsdFwiLHQucmVzaXplaXQpe3RoaXMucmVzaXplaXQocix0LnJlc2l6ZWl0KTt2YXIgVz12b2lkIDA7ci5hZGRFdmVudExpc3RlbmVyKFwianNwYW5lbHJlc2l6ZXN0YXJ0XCIsZnVuY3Rpb24oZSl7ZS5kZXRhaWw9PT1yLmlkJiYoVz1yLnN0YXR1cyl9LCExKSxyLmFkZEV2ZW50TGlzdGVuZXIoXCJqc3BhbmVscmVzaXplc3RvcFwiLGZ1bmN0aW9uKGUpe2UuZGV0YWlsPT09ci5pZCYmKFwic21hbGxpZmllZFwiPT09V3x8XCJzbWFsbGlmaWVkbWF4XCI9PT1XfHxcIm1heGltaXplZFwiPT09VykmJnBhcnNlRmxvYXQoci5zdHlsZS5oZWlnaHQpPnBhcnNlRmxvYXQod2luZG93LmdldENvbXB1dGVkU3R5bGUoci5oZWFkZXIpLmhlaWdodCkmJihyLnNldENvbnRyb2xzKFtcIi5qc1BhbmVsLWJ0bi1ub3JtYWxpemVcIixcIi5qc1BhbmVsLWJ0bi1zbWFsbGlmeXJldlwiXSksci5zdGF0dXM9XCJub3JtYWxpemVkXCIsZG9jdW1lbnQuZGlzcGF0Y2hFdmVudChoKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KHApLHQub25zdGF0dXNjaGFuZ2UmJmpzUGFuZWwucHJvY2Vzc0NhbGxiYWNrcyhyLHQub25zdGF0dXNjaGFuZ2UsXCJldmVyeVwiKSxyLmNhbGNTaXplRmFjdG9ycygpKX0sITEpfWlmKHIuc2F2ZUN1cnJlbnREaW1lbnNpb25zKCksci5zYXZlQ3VycmVudFBvc2l0aW9uKCksdC5zZXRTdGF0dXMpe3ZhciBNPXQuc2V0U3RhdHVzO2lmKFwic21hbGxpZmllZG1heFwiPT09TSlyLm1heGltaXplKCkuc21hbGxpZnkoKTtlbHNlIGlmKFwic21hbGxpZmllZFwiPT09TSlyLnNtYWxsaWZ5KCk7ZWxzZXt2YXIgTz1NLnN1YnN0cigwLE0ubGVuZ3RoLTEpO3JbT10oKX19cmV0dXJuIHQuYXV0b2Nsb3NlJiYobz13aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpe3ImJnIuY2xvc2UoKX0sdC5hdXRvY2xvc2UpKSx0aGlzLnBvaW50ZXJkb3duLmZvckVhY2goZnVuY3Rpb24oZSl7ci5hZGRFdmVudExpc3RlbmVyKGUsZnVuY3Rpb24oZSl7ZS50YXJnZXQuY2xvc2VzdChcIi5qc1BhbmVsLWJ0bi1jbG9zZVwiKXx8ZS50YXJnZXQuY2xvc2VzdChcIi5qc1BhbmVsLWJ0bi1taW5pbWl6ZVwiKXx8XCJzdGFuZGFyZFwiIT09dC5wYW5lbHR5cGV8fHIuZnJvbnQoKX0sITEpfSksdC5vbndpbmRvd3Jlc2l6ZSYmd2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJyZXNpemVcIixmdW5jdGlvbihlKXtpZihlLnRhcmdldD09PXdpbmRvdyl7dmFyIG49dC5vbndpbmRvd3Jlc2l6ZSxvPXIuc3RhdHVzLGE9dm9pZCAwO2lmKCFyLnBhcmVudEVsZW1lbnQpcmV0dXJuITE7YT13aW5kb3cuZ2V0Q29tcHV0ZWRTdHlsZShyLnBhcmVudEVsZW1lbnQpLFwibWF4aW1pemVkXCI9PT1vJiYhMD09PW4/ci5tYXhpbWl6ZSgpOlwibm9ybWFsaXplZFwiIT09byYmXCJzbWFsbGlmaWVkXCIhPT1vJiZcIm1heGltaXplZFwiIT09b3x8KFwiZnVuY3Rpb25cIj09dHlwZW9mIG4/bi5jYWxsKHIsZSxyKTooci5zdHlsZS5sZWZ0PShsPXZvaWQgMCwobD1cIndpbmRvd1wiPT09dC5jb250YWluZXI/KHdpbmRvdy5pbm5lcldpZHRoLXBhcnNlRmxvYXQoci5zdHlsZS53aWR0aCkpKnIuaGY6KHBhcnNlRmxvYXQoYS53aWR0aCktcGFyc2VGbG9hdChyLnN0eWxlLndpZHRoKSkqci5oZik8PTA/MDpsK1wicHhcIiksci5zdHlsZS50b3A9KGk9dm9pZCAwLChpPVwid2luZG93XCI9PT10LmNvbnRhaW5lcj8od2luZG93LmlubmVySGVpZ2h0LXBhcnNlRmxvYXQoci5jdXJyZW50RGF0YS5oZWlnaHQpKSpyLnZmOihwYXJzZUZsb2F0KGEuaGVpZ2h0KS1wYXJzZUZsb2F0KHIuY3VycmVudERhdGEuaGVpZ2h0KSkqci52Zik8PTA/MDppK1wicHhcIikpKX12YXIgaSxsfSwhMSksdGhpcy5wb2ludGVydXAuZm9yRWFjaChmdW5jdGlvbihlKXtyLmFkZEV2ZW50TGlzdGVuZXIoZSxmdW5jdGlvbigpe3IuY29udGVudC5zdHlsZS5wb2ludGVyRXZlbnRzPVwiaW5oZXJpdFwifSl9KSx0aGlzLmdsb2JhbENhbGxiYWNrcyYmKEFycmF5LmlzQXJyYXkodGhpcy5nbG9iYWxDYWxsYmFja3MpP3RoaXMuZ2xvYmFsQ2FsbGJhY2tzLmZvckVhY2goZnVuY3Rpb24oZSl7ZS5jYWxsKHIscil9KTp0aGlzLmdsb2JhbENhbGxiYWNrcy5jYWxsKHIscikpLHQuY2FsbGJhY2smJihBcnJheS5pc0FycmF5KHQuY2FsbGJhY2spP3QuY2FsbGJhY2suZm9yRWFjaChmdW5jdGlvbihlKXtlLmNhbGwocixyKX0pOnQuY2FsbGJhY2suY2FsbChyLHIpKSxuJiZuLmNhbGwocixyKSxkb2N1bWVudC5kaXNwYXRjaEV2ZW50KGwpLHJ9fTsiLCIvLyBzaGltIGZvciB1c2luZyBwcm9jZXNzIGluIGJyb3dzZXJcbnZhciBwcm9jZXNzID0gbW9kdWxlLmV4cG9ydHMgPSB7fTtcblxuLy8gY2FjaGVkIGZyb20gd2hhdGV2ZXIgZ2xvYmFsIGlzIHByZXNlbnQgc28gdGhhdCB0ZXN0IHJ1bm5lcnMgdGhhdCBzdHViIGl0XG4vLyBkb24ndCBicmVhayB0aGluZ3MuICBCdXQgd2UgbmVlZCB0byB3cmFwIGl0IGluIGEgdHJ5IGNhdGNoIGluIGNhc2UgaXQgaXNcbi8vIHdyYXBwZWQgaW4gc3RyaWN0IG1vZGUgY29kZSB3aGljaCBkb2Vzbid0IGRlZmluZSBhbnkgZ2xvYmFscy4gIEl0J3MgaW5zaWRlIGFcbi8vIGZ1bmN0aW9uIGJlY2F1c2UgdHJ5L2NhdGNoZXMgZGVvcHRpbWl6ZSBpbiBjZXJ0YWluIGVuZ2luZXMuXG5cbnZhciBjYWNoZWRTZXRUaW1lb3V0O1xudmFyIGNhY2hlZENsZWFyVGltZW91dDtcblxuZnVuY3Rpb24gZGVmYXVsdFNldFRpbW91dCgpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldFRpbWVvdXQgaGFzIG5vdCBiZWVuIGRlZmluZWQnKTtcbn1cbmZ1bmN0aW9uIGRlZmF1bHRDbGVhclRpbWVvdXQgKCkge1xuICAgIHRocm93IG5ldyBFcnJvcignY2xlYXJUaW1lb3V0IGhhcyBub3QgYmVlbiBkZWZpbmVkJyk7XG59XG4oZnVuY3Rpb24gKCkge1xuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2Ygc2V0VGltZW91dCA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IHNldFRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gZGVmYXVsdFNldFRpbW91dDtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgY2FjaGVkU2V0VGltZW91dCA9IGRlZmF1bHRTZXRUaW1vdXQ7XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICAgIGlmICh0eXBlb2YgY2xlYXJUaW1lb3V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBjbGVhclRpbWVvdXQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgICAgICB9XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgICBjYWNoZWRDbGVhclRpbWVvdXQgPSBkZWZhdWx0Q2xlYXJUaW1lb3V0O1xuICAgIH1cbn0gKCkpXG5mdW5jdGlvbiBydW5UaW1lb3V0KGZ1bikge1xuICAgIGlmIChjYWNoZWRTZXRUaW1lb3V0ID09PSBzZXRUaW1lb3V0KSB7XG4gICAgICAgIC8vbm9ybWFsIGVudmlyb21lbnRzIGluIHNhbmUgc2l0dWF0aW9uc1xuICAgICAgICByZXR1cm4gc2V0VGltZW91dChmdW4sIDApO1xuICAgIH1cbiAgICAvLyBpZiBzZXRUaW1lb3V0IHdhc24ndCBhdmFpbGFibGUgYnV0IHdhcyBsYXR0ZXIgZGVmaW5lZFxuICAgIGlmICgoY2FjaGVkU2V0VGltZW91dCA9PT0gZGVmYXVsdFNldFRpbW91dCB8fCAhY2FjaGVkU2V0VGltZW91dCkgJiYgc2V0VGltZW91dCkge1xuICAgICAgICBjYWNoZWRTZXRUaW1lb3V0ID0gc2V0VGltZW91dDtcbiAgICAgICAgcmV0dXJuIHNldFRpbWVvdXQoZnVuLCAwKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgICAgLy8gd2hlbiB3aGVuIHNvbWVib2R5IGhhcyBzY3Jld2VkIHdpdGggc2V0VGltZW91dCBidXQgbm8gSS5FLiBtYWRkbmVzc1xuICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dChmdW4sIDApO1xuICAgIH0gY2F0Y2goZSl7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgICAvLyBXaGVuIHdlIGFyZSBpbiBJLkUuIGJ1dCB0aGUgc2NyaXB0IGhhcyBiZWVuIGV2YWxlZCBzbyBJLkUuIGRvZXNuJ3QgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRTZXRUaW1lb3V0LmNhbGwobnVsbCwgZnVuLCAwKTtcbiAgICAgICAgfSBjYXRjaChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yXG4gICAgICAgICAgICByZXR1cm4gY2FjaGVkU2V0VGltZW91dC5jYWxsKHRoaXMsIGZ1biwgMCk7XG4gICAgICAgIH1cbiAgICB9XG5cblxufVxuZnVuY3Rpb24gcnVuQ2xlYXJUaW1lb3V0KG1hcmtlcikge1xuICAgIGlmIChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGNsZWFyVGltZW91dCkge1xuICAgICAgICAvL25vcm1hbCBlbnZpcm9tZW50cyBpbiBzYW5lIHNpdHVhdGlvbnNcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICAvLyBpZiBjbGVhclRpbWVvdXQgd2Fzbid0IGF2YWlsYWJsZSBidXQgd2FzIGxhdHRlciBkZWZpbmVkXG4gICAgaWYgKChjYWNoZWRDbGVhclRpbWVvdXQgPT09IGRlZmF1bHRDbGVhclRpbWVvdXQgfHwgIWNhY2hlZENsZWFyVGltZW91dCkgJiYgY2xlYXJUaW1lb3V0KSB7XG4gICAgICAgIGNhY2hlZENsZWFyVGltZW91dCA9IGNsZWFyVGltZW91dDtcbiAgICAgICAgcmV0dXJuIGNsZWFyVGltZW91dChtYXJrZXIpO1xuICAgIH1cbiAgICB0cnkge1xuICAgICAgICAvLyB3aGVuIHdoZW4gc29tZWJvZHkgaGFzIHNjcmV3ZWQgd2l0aCBzZXRUaW1lb3V0IGJ1dCBubyBJLkUuIG1hZGRuZXNzXG4gICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQobWFya2VyKTtcbiAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIC8vIFdoZW4gd2UgYXJlIGluIEkuRS4gYnV0IHRoZSBzY3JpcHQgaGFzIGJlZW4gZXZhbGVkIHNvIEkuRS4gZG9lc24ndCAgdHJ1c3QgdGhlIGdsb2JhbCBvYmplY3Qgd2hlbiBjYWxsZWQgbm9ybWFsbHlcbiAgICAgICAgICAgIHJldHVybiBjYWNoZWRDbGVhclRpbWVvdXQuY2FsbChudWxsLCBtYXJrZXIpO1xuICAgICAgICB9IGNhdGNoIChlKXtcbiAgICAgICAgICAgIC8vIHNhbWUgYXMgYWJvdmUgYnV0IHdoZW4gaXQncyBhIHZlcnNpb24gb2YgSS5FLiB0aGF0IG11c3QgaGF2ZSB0aGUgZ2xvYmFsIG9iamVjdCBmb3IgJ3RoaXMnLCBob3BmdWxseSBvdXIgY29udGV4dCBjb3JyZWN0IG90aGVyd2lzZSBpdCB3aWxsIHRocm93IGEgZ2xvYmFsIGVycm9yLlxuICAgICAgICAgICAgLy8gU29tZSB2ZXJzaW9ucyBvZiBJLkUuIGhhdmUgZGlmZmVyZW50IHJ1bGVzIGZvciBjbGVhclRpbWVvdXQgdnMgc2V0VGltZW91dFxuICAgICAgICAgICAgcmV0dXJuIGNhY2hlZENsZWFyVGltZW91dC5jYWxsKHRoaXMsIG1hcmtlcik7XG4gICAgICAgIH1cbiAgICB9XG5cblxuXG59XG52YXIgcXVldWUgPSBbXTtcbnZhciBkcmFpbmluZyA9IGZhbHNlO1xudmFyIGN1cnJlbnRRdWV1ZTtcbnZhciBxdWV1ZUluZGV4ID0gLTE7XG5cbmZ1bmN0aW9uIGNsZWFuVXBOZXh0VGljaygpIHtcbiAgICBpZiAoIWRyYWluaW5nIHx8ICFjdXJyZW50UXVldWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBkcmFpbmluZyA9IGZhbHNlO1xuICAgIGlmIChjdXJyZW50UXVldWUubGVuZ3RoKSB7XG4gICAgICAgIHF1ZXVlID0gY3VycmVudFF1ZXVlLmNvbmNhdChxdWV1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgIH1cbiAgICBpZiAocXVldWUubGVuZ3RoKSB7XG4gICAgICAgIGRyYWluUXVldWUoKTtcbiAgICB9XG59XG5cbmZ1bmN0aW9uIGRyYWluUXVldWUoKSB7XG4gICAgaWYgKGRyYWluaW5nKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmFyIHRpbWVvdXQgPSBydW5UaW1lb3V0KGNsZWFuVXBOZXh0VGljayk7XG4gICAgZHJhaW5pbmcgPSB0cnVlO1xuXG4gICAgdmFyIGxlbiA9IHF1ZXVlLmxlbmd0aDtcbiAgICB3aGlsZShsZW4pIHtcbiAgICAgICAgY3VycmVudFF1ZXVlID0gcXVldWU7XG4gICAgICAgIHF1ZXVlID0gW107XG4gICAgICAgIHdoaWxlICgrK3F1ZXVlSW5kZXggPCBsZW4pIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50UXVldWUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50UXVldWVbcXVldWVJbmRleF0ucnVuKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcXVldWVJbmRleCA9IC0xO1xuICAgICAgICBsZW4gPSBxdWV1ZS5sZW5ndGg7XG4gICAgfVxuICAgIGN1cnJlbnRRdWV1ZSA9IG51bGw7XG4gICAgZHJhaW5pbmcgPSBmYWxzZTtcbiAgICBydW5DbGVhclRpbWVvdXQodGltZW91dCk7XG59XG5cbnByb2Nlc3MubmV4dFRpY2sgPSBmdW5jdGlvbiAoZnVuKSB7XG4gICAgdmFyIGFyZ3MgPSBuZXcgQXJyYXkoYXJndW1lbnRzLmxlbmd0aCAtIDEpO1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoID4gMSkge1xuICAgICAgICBmb3IgKHZhciBpID0gMTsgaSA8IGFyZ3VtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgICAgYXJnc1tpIC0gMV0gPSBhcmd1bWVudHNbaV07XG4gICAgICAgIH1cbiAgICB9XG4gICAgcXVldWUucHVzaChuZXcgSXRlbShmdW4sIGFyZ3MpKTtcbiAgICBpZiAocXVldWUubGVuZ3RoID09PSAxICYmICFkcmFpbmluZykge1xuICAgICAgICBydW5UaW1lb3V0KGRyYWluUXVldWUpO1xuICAgIH1cbn07XG5cbi8vIHY4IGxpa2VzIHByZWRpY3RpYmxlIG9iamVjdHNcbmZ1bmN0aW9uIEl0ZW0oZnVuLCBhcnJheSkge1xuICAgIHRoaXMuZnVuID0gZnVuO1xuICAgIHRoaXMuYXJyYXkgPSBhcnJheTtcbn1cbkl0ZW0ucHJvdG90eXBlLnJ1biA9IGZ1bmN0aW9uICgpIHtcbiAgICB0aGlzLmZ1bi5hcHBseShudWxsLCB0aGlzLmFycmF5KTtcbn07XG5wcm9jZXNzLnRpdGxlID0gJ2Jyb3dzZXInO1xucHJvY2Vzcy5icm93c2VyID0gdHJ1ZTtcbnByb2Nlc3MuZW52ID0ge307XG5wcm9jZXNzLmFyZ3YgPSBbXTtcbnByb2Nlc3MudmVyc2lvbiA9ICcnOyAvLyBlbXB0eSBzdHJpbmcgdG8gYXZvaWQgcmVnZXhwIGlzc3Vlc1xucHJvY2Vzcy52ZXJzaW9ucyA9IHt9O1xuXG5mdW5jdGlvbiBub29wKCkge31cblxucHJvY2Vzcy5vbiA9IG5vb3A7XG5wcm9jZXNzLmFkZExpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3Mub25jZSA9IG5vb3A7XG5wcm9jZXNzLm9mZiA9IG5vb3A7XG5wcm9jZXNzLnJlbW92ZUxpc3RlbmVyID0gbm9vcDtcbnByb2Nlc3MucmVtb3ZlQWxsTGlzdGVuZXJzID0gbm9vcDtcbnByb2Nlc3MuZW1pdCA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRMaXN0ZW5lciA9IG5vb3A7XG5wcm9jZXNzLnByZXBlbmRPbmNlTGlzdGVuZXIgPSBub29wO1xuXG5wcm9jZXNzLmxpc3RlbmVycyA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBbXSB9XG5cbnByb2Nlc3MuYmluZGluZyA9IGZ1bmN0aW9uIChuYW1lKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmJpbmRpbmcgaXMgbm90IHN1cHBvcnRlZCcpO1xufTtcblxucHJvY2Vzcy5jd2QgPSBmdW5jdGlvbiAoKSB7IHJldHVybiAnLycgfTtcbnByb2Nlc3MuY2hkaXIgPSBmdW5jdGlvbiAoZGlyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzLmNoZGlyIGlzIG5vdCBzdXBwb3J0ZWQnKTtcbn07XG5wcm9jZXNzLnVtYXNrID0gZnVuY3Rpb24oKSB7IHJldHVybiAwOyB9O1xuIiwiLypcblx0TUlUIExpY2Vuc2UgaHR0cDovL3d3dy5vcGVuc291cmNlLm9yZy9saWNlbnNlcy9taXQtbGljZW5zZS5waHBcblx0QXV0aG9yIFRvYmlhcyBLb3BwZXJzIEBzb2tyYVxuKi9cblxudmFyIHN0eWxlc0luRG9tID0ge307XG5cbnZhclx0bWVtb2l6ZSA9IGZ1bmN0aW9uIChmbikge1xuXHR2YXIgbWVtbztcblxuXHRyZXR1cm4gZnVuY3Rpb24gKCkge1xuXHRcdGlmICh0eXBlb2YgbWVtbyA9PT0gXCJ1bmRlZmluZWRcIikgbWVtbyA9IGZuLmFwcGx5KHRoaXMsIGFyZ3VtZW50cyk7XG5cdFx0cmV0dXJuIG1lbW87XG5cdH07XG59O1xuXG52YXIgaXNPbGRJRSA9IG1lbW9pemUoZnVuY3Rpb24gKCkge1xuXHQvLyBUZXN0IGZvciBJRSA8PSA5IGFzIHByb3Bvc2VkIGJ5IEJyb3dzZXJoYWNrc1xuXHQvLyBAc2VlIGh0dHA6Ly9icm93c2VyaGFja3MuY29tLyNoYWNrLWU3MWQ4NjkyZjY1MzM0MTczZmVlNzE1YzIyMmNiODA1XG5cdC8vIFRlc3RzIGZvciBleGlzdGVuY2Ugb2Ygc3RhbmRhcmQgZ2xvYmFscyBpcyB0byBhbGxvdyBzdHlsZS1sb2FkZXJcblx0Ly8gdG8gb3BlcmF0ZSBjb3JyZWN0bHkgaW50byBub24tc3RhbmRhcmQgZW52aXJvbm1lbnRzXG5cdC8vIEBzZWUgaHR0cHM6Ly9naXRodWIuY29tL3dlYnBhY2stY29udHJpYi9zdHlsZS1sb2FkZXIvaXNzdWVzLzE3N1xuXHRyZXR1cm4gd2luZG93ICYmIGRvY3VtZW50ICYmIGRvY3VtZW50LmFsbCAmJiAhd2luZG93LmF0b2I7XG59KTtcblxudmFyIGdldFRhcmdldCA9IGZ1bmN0aW9uICh0YXJnZXQsIHBhcmVudCkge1xuICBpZiAocGFyZW50KXtcbiAgICByZXR1cm4gcGFyZW50LnF1ZXJ5U2VsZWN0b3IodGFyZ2V0KTtcbiAgfVxuICByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YXJnZXQpO1xufTtcblxudmFyIGdldEVsZW1lbnQgPSAoZnVuY3Rpb24gKGZuKSB7XG5cdHZhciBtZW1vID0ge307XG5cblx0cmV0dXJuIGZ1bmN0aW9uKHRhcmdldCwgcGFyZW50KSB7XG4gICAgICAgICAgICAgICAgLy8gSWYgcGFzc2luZyBmdW5jdGlvbiBpbiBvcHRpb25zLCB0aGVuIHVzZSBpdCBmb3IgcmVzb2x2ZSBcImhlYWRcIiBlbGVtZW50LlxuICAgICAgICAgICAgICAgIC8vIFVzZWZ1bCBmb3IgU2hhZG93IFJvb3Qgc3R5bGUgaS5lXG4gICAgICAgICAgICAgICAgLy8ge1xuICAgICAgICAgICAgICAgIC8vICAgaW5zZXJ0SW50bzogZnVuY3Rpb24gKCkgeyByZXR1cm4gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNmb29cIikuc2hhZG93Um9vdCB9XG4gICAgICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgdGFyZ2V0ID09PSAnZnVuY3Rpb24nKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gdGFyZ2V0KCk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0eXBlb2YgbWVtb1t0YXJnZXRdID09PSBcInVuZGVmaW5lZFwiKSB7XG5cdFx0XHR2YXIgc3R5bGVUYXJnZXQgPSBnZXRUYXJnZXQuY2FsbCh0aGlzLCB0YXJnZXQsIHBhcmVudCk7XG5cdFx0XHQvLyBTcGVjaWFsIGNhc2UgdG8gcmV0dXJuIGhlYWQgb2YgaWZyYW1lIGluc3RlYWQgb2YgaWZyYW1lIGl0c2VsZlxuXHRcdFx0aWYgKHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCAmJiBzdHlsZVRhcmdldCBpbnN0YW5jZW9mIHdpbmRvdy5IVE1MSUZyYW1lRWxlbWVudCkge1xuXHRcdFx0XHR0cnkge1xuXHRcdFx0XHRcdC8vIFRoaXMgd2lsbCB0aHJvdyBhbiBleGNlcHRpb24gaWYgYWNjZXNzIHRvIGlmcmFtZSBpcyBibG9ja2VkXG5cdFx0XHRcdFx0Ly8gZHVlIHRvIGNyb3NzLW9yaWdpbiByZXN0cmljdGlvbnNcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IHN0eWxlVGFyZ2V0LmNvbnRlbnREb2N1bWVudC5oZWFkO1xuXHRcdFx0XHR9IGNhdGNoKGUpIHtcblx0XHRcdFx0XHRzdHlsZVRhcmdldCA9IG51bGw7XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdG1lbW9bdGFyZ2V0XSA9IHN0eWxlVGFyZ2V0O1xuXHRcdH1cblx0XHRyZXR1cm4gbWVtb1t0YXJnZXRdXG5cdH07XG59KSgpO1xuXG52YXIgc2luZ2xldG9uID0gbnVsbDtcbnZhclx0c2luZ2xldG9uQ291bnRlciA9IDA7XG52YXJcdHN0eWxlc0luc2VydGVkQXRUb3AgPSBbXTtcblxudmFyXHRmaXhVcmxzID0gcmVxdWlyZShcIi4vdXJsc1wiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsaXN0LCBvcHRpb25zKSB7XG5cdGlmICh0eXBlb2YgREVCVUcgIT09IFwidW5kZWZpbmVkXCIgJiYgREVCVUcpIHtcblx0XHRpZiAodHlwZW9mIGRvY3VtZW50ICE9PSBcIm9iamVjdFwiKSB0aHJvdyBuZXcgRXJyb3IoXCJUaGUgc3R5bGUtbG9hZGVyIGNhbm5vdCBiZSB1c2VkIGluIGEgbm9uLWJyb3dzZXIgZW52aXJvbm1lbnRcIik7XG5cdH1cblxuXHRvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcblxuXHRvcHRpb25zLmF0dHJzID0gdHlwZW9mIG9wdGlvbnMuYXR0cnMgPT09IFwib2JqZWN0XCIgPyBvcHRpb25zLmF0dHJzIDoge307XG5cblx0Ly8gRm9yY2Ugc2luZ2xlLXRhZyBzb2x1dGlvbiBvbiBJRTYtOSwgd2hpY2ggaGFzIGEgaGFyZCBsaW1pdCBvbiB0aGUgIyBvZiA8c3R5bGU+XG5cdC8vIHRhZ3MgaXQgd2lsbCBhbGxvdyBvbiBhIHBhZ2Vcblx0aWYgKCFvcHRpb25zLnNpbmdsZXRvbiAmJiB0eXBlb2Ygb3B0aW9ucy5zaW5nbGV0b24gIT09IFwiYm9vbGVhblwiKSBvcHRpb25zLnNpbmdsZXRvbiA9IGlzT2xkSUUoKTtcblxuXHQvLyBCeSBkZWZhdWx0LCBhZGQgPHN0eWxlPiB0YWdzIHRvIHRoZSA8aGVhZD4gZWxlbWVudFxuICAgICAgICBpZiAoIW9wdGlvbnMuaW5zZXJ0SW50bykgb3B0aW9ucy5pbnNlcnRJbnRvID0gXCJoZWFkXCI7XG5cblx0Ly8gQnkgZGVmYXVsdCwgYWRkIDxzdHlsZT4gdGFncyB0byB0aGUgYm90dG9tIG9mIHRoZSB0YXJnZXRcblx0aWYgKCFvcHRpb25zLmluc2VydEF0KSBvcHRpb25zLmluc2VydEF0ID0gXCJib3R0b21cIjtcblxuXHR2YXIgc3R5bGVzID0gbGlzdFRvU3R5bGVzKGxpc3QsIG9wdGlvbnMpO1xuXG5cdGFkZFN0eWxlc1RvRG9tKHN0eWxlcywgb3B0aW9ucyk7XG5cblx0cmV0dXJuIGZ1bmN0aW9uIHVwZGF0ZSAobmV3TGlzdCkge1xuXHRcdHZhciBtYXlSZW1vdmUgPSBbXTtcblxuXHRcdGZvciAodmFyIGkgPSAwOyBpIDwgc3R5bGVzLmxlbmd0aDsgaSsrKSB7XG5cdFx0XHR2YXIgaXRlbSA9IHN0eWxlc1tpXTtcblx0XHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0XHRkb21TdHlsZS5yZWZzLS07XG5cdFx0XHRtYXlSZW1vdmUucHVzaChkb21TdHlsZSk7XG5cdFx0fVxuXG5cdFx0aWYobmV3TGlzdCkge1xuXHRcdFx0dmFyIG5ld1N0eWxlcyA9IGxpc3RUb1N0eWxlcyhuZXdMaXN0LCBvcHRpb25zKTtcblx0XHRcdGFkZFN0eWxlc1RvRG9tKG5ld1N0eWxlcywgb3B0aW9ucyk7XG5cdFx0fVxuXG5cdFx0Zm9yICh2YXIgaSA9IDA7IGkgPCBtYXlSZW1vdmUubGVuZ3RoOyBpKyspIHtcblx0XHRcdHZhciBkb21TdHlsZSA9IG1heVJlbW92ZVtpXTtcblxuXHRcdFx0aWYoZG9tU3R5bGUucmVmcyA9PT0gMCkge1xuXHRcdFx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSBkb21TdHlsZS5wYXJ0c1tqXSgpO1xuXG5cdFx0XHRcdGRlbGV0ZSBzdHlsZXNJbkRvbVtkb21TdHlsZS5pZF07XG5cdFx0XHR9XG5cdFx0fVxuXHR9O1xufTtcblxuZnVuY3Rpb24gYWRkU3R5bGVzVG9Eb20gKHN0eWxlcywgb3B0aW9ucykge1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IHN0eWxlcy5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gc3R5bGVzW2ldO1xuXHRcdHZhciBkb21TdHlsZSA9IHN0eWxlc0luRG9tW2l0ZW0uaWRdO1xuXG5cdFx0aWYoZG9tU3R5bGUpIHtcblx0XHRcdGRvbVN0eWxlLnJlZnMrKztcblxuXHRcdFx0Zm9yKHZhciBqID0gMDsgaiA8IGRvbVN0eWxlLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdGRvbVN0eWxlLnBhcnRzW2pdKGl0ZW0ucGFydHNbal0pO1xuXHRcdFx0fVxuXG5cdFx0XHRmb3IoOyBqIDwgaXRlbS5wYXJ0cy5sZW5ndGg7IGorKykge1xuXHRcdFx0XHRkb21TdHlsZS5wYXJ0cy5wdXNoKGFkZFN0eWxlKGl0ZW0ucGFydHNbal0sIG9wdGlvbnMpKTtcblx0XHRcdH1cblx0XHR9IGVsc2Uge1xuXHRcdFx0dmFyIHBhcnRzID0gW107XG5cblx0XHRcdGZvcih2YXIgaiA9IDA7IGogPCBpdGVtLnBhcnRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRcdHBhcnRzLnB1c2goYWRkU3R5bGUoaXRlbS5wYXJ0c1tqXSwgb3B0aW9ucykpO1xuXHRcdFx0fVxuXG5cdFx0XHRzdHlsZXNJbkRvbVtpdGVtLmlkXSA9IHtpZDogaXRlbS5pZCwgcmVmczogMSwgcGFydHM6IHBhcnRzfTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gbGlzdFRvU3R5bGVzIChsaXN0LCBvcHRpb25zKSB7XG5cdHZhciBzdHlsZXMgPSBbXTtcblx0dmFyIG5ld1N0eWxlcyA9IHt9O1xuXG5cdGZvciAodmFyIGkgPSAwOyBpIDwgbGlzdC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBpdGVtID0gbGlzdFtpXTtcblx0XHR2YXIgaWQgPSBvcHRpb25zLmJhc2UgPyBpdGVtWzBdICsgb3B0aW9ucy5iYXNlIDogaXRlbVswXTtcblx0XHR2YXIgY3NzID0gaXRlbVsxXTtcblx0XHR2YXIgbWVkaWEgPSBpdGVtWzJdO1xuXHRcdHZhciBzb3VyY2VNYXAgPSBpdGVtWzNdO1xuXHRcdHZhciBwYXJ0ID0ge2NzczogY3NzLCBtZWRpYTogbWVkaWEsIHNvdXJjZU1hcDogc291cmNlTWFwfTtcblxuXHRcdGlmKCFuZXdTdHlsZXNbaWRdKSBzdHlsZXMucHVzaChuZXdTdHlsZXNbaWRdID0ge2lkOiBpZCwgcGFydHM6IFtwYXJ0XX0pO1xuXHRcdGVsc2UgbmV3U3R5bGVzW2lkXS5wYXJ0cy5wdXNoKHBhcnQpO1xuXHR9XG5cblx0cmV0dXJuIHN0eWxlcztcbn1cblxuZnVuY3Rpb24gaW5zZXJ0U3R5bGVFbGVtZW50IChvcHRpb25zLCBzdHlsZSkge1xuXHR2YXIgdGFyZ2V0ID0gZ2V0RWxlbWVudChvcHRpb25zLmluc2VydEludG8pXG5cblx0aWYgKCF0YXJnZXQpIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJDb3VsZG4ndCBmaW5kIGEgc3R5bGUgdGFyZ2V0LiBUaGlzIHByb2JhYmx5IG1lYW5zIHRoYXQgdGhlIHZhbHVlIGZvciB0aGUgJ2luc2VydEludG8nIHBhcmFtZXRlciBpcyBpbnZhbGlkLlwiKTtcblx0fVxuXG5cdHZhciBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcCA9IHN0eWxlc0luc2VydGVkQXRUb3Bbc3R5bGVzSW5zZXJ0ZWRBdFRvcC5sZW5ndGggLSAxXTtcblxuXHRpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJ0b3BcIikge1xuXHRcdGlmICghbGFzdFN0eWxlRWxlbWVudEluc2VydGVkQXRUb3ApIHtcblx0XHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIHRhcmdldC5maXJzdENoaWxkKTtcblx0XHR9IGVsc2UgaWYgKGxhc3RTdHlsZUVsZW1lbnRJbnNlcnRlZEF0VG9wLm5leHRTaWJsaW5nKSB7XG5cdFx0XHR0YXJnZXQuaW5zZXJ0QmVmb3JlKHN0eWxlLCBsYXN0U3R5bGVFbGVtZW50SW5zZXJ0ZWRBdFRvcC5uZXh0U2libGluZyk7XG5cdFx0fSBlbHNlIHtcblx0XHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdFx0fVxuXHRcdHN0eWxlc0luc2VydGVkQXRUb3AucHVzaChzdHlsZSk7XG5cdH0gZWxzZSBpZiAob3B0aW9ucy5pbnNlcnRBdCA9PT0gXCJib3R0b21cIikge1xuXHRcdHRhcmdldC5hcHBlbmRDaGlsZChzdHlsZSk7XG5cdH0gZWxzZSBpZiAodHlwZW9mIG9wdGlvbnMuaW5zZXJ0QXQgPT09IFwib2JqZWN0XCIgJiYgb3B0aW9ucy5pbnNlcnRBdC5iZWZvcmUpIHtcblx0XHR2YXIgbmV4dFNpYmxpbmcgPSBnZXRFbGVtZW50KG9wdGlvbnMuaW5zZXJ0QXQuYmVmb3JlLCB0YXJnZXQpO1xuXHRcdHRhcmdldC5pbnNlcnRCZWZvcmUoc3R5bGUsIG5leHRTaWJsaW5nKTtcblx0fSBlbHNlIHtcblx0XHR0aHJvdyBuZXcgRXJyb3IoXCJbU3R5bGUgTG9hZGVyXVxcblxcbiBJbnZhbGlkIHZhbHVlIGZvciBwYXJhbWV0ZXIgJ2luc2VydEF0JyAoJ29wdGlvbnMuaW5zZXJ0QXQnKSBmb3VuZC5cXG4gTXVzdCBiZSAndG9wJywgJ2JvdHRvbScsIG9yIE9iamVjdC5cXG4gKGh0dHBzOi8vZ2l0aHViLmNvbS93ZWJwYWNrLWNvbnRyaWIvc3R5bGUtbG9hZGVyI2luc2VydGF0KVxcblwiKTtcblx0fVxufVxuXG5mdW5jdGlvbiByZW1vdmVTdHlsZUVsZW1lbnQgKHN0eWxlKSB7XG5cdGlmIChzdHlsZS5wYXJlbnROb2RlID09PSBudWxsKSByZXR1cm4gZmFsc2U7XG5cdHN0eWxlLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoc3R5bGUpO1xuXG5cdHZhciBpZHggPSBzdHlsZXNJbnNlcnRlZEF0VG9wLmluZGV4T2Yoc3R5bGUpO1xuXHRpZihpZHggPj0gMCkge1xuXHRcdHN0eWxlc0luc2VydGVkQXRUb3Auc3BsaWNlKGlkeCwgMSk7XG5cdH1cbn1cblxuZnVuY3Rpb24gY3JlYXRlU3R5bGVFbGVtZW50IChvcHRpb25zKSB7XG5cdHZhciBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzdHlsZVwiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXG5cdGlmKG9wdGlvbnMuYXR0cnMubm9uY2UgPT09IHVuZGVmaW5lZCkge1xuXHRcdHZhciBub25jZSA9IGdldE5vbmNlKCk7XG5cdFx0aWYgKG5vbmNlKSB7XG5cdFx0XHRvcHRpb25zLmF0dHJzLm5vbmNlID0gbm9uY2U7XG5cdFx0fVxuXHR9XG5cblx0YWRkQXR0cnMoc3R5bGUsIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgc3R5bGUpO1xuXG5cdHJldHVybiBzdHlsZTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlTGlua0VsZW1lbnQgKG9wdGlvbnMpIHtcblx0dmFyIGxpbmsgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKTtcblxuXHRpZihvcHRpb25zLmF0dHJzLnR5cGUgPT09IHVuZGVmaW5lZCkge1xuXHRcdG9wdGlvbnMuYXR0cnMudHlwZSA9IFwidGV4dC9jc3NcIjtcblx0fVxuXHRvcHRpb25zLmF0dHJzLnJlbCA9IFwic3R5bGVzaGVldFwiO1xuXG5cdGFkZEF0dHJzKGxpbmssIG9wdGlvbnMuYXR0cnMpO1xuXHRpbnNlcnRTdHlsZUVsZW1lbnQob3B0aW9ucywgbGluayk7XG5cblx0cmV0dXJuIGxpbms7XG59XG5cbmZ1bmN0aW9uIGFkZEF0dHJzIChlbCwgYXR0cnMpIHtcblx0T2JqZWN0LmtleXMoYXR0cnMpLmZvckVhY2goZnVuY3Rpb24gKGtleSkge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShrZXksIGF0dHJzW2tleV0pO1xuXHR9KTtcbn1cblxuZnVuY3Rpb24gZ2V0Tm9uY2UoKSB7XG5cdGlmICh0eXBlb2YgX193ZWJwYWNrX25vbmNlX18gPT09ICd1bmRlZmluZWQnKSB7XG5cdFx0cmV0dXJuIG51bGw7XG5cdH1cblxuXHRyZXR1cm4gX193ZWJwYWNrX25vbmNlX187XG59XG5cbmZ1bmN0aW9uIGFkZFN0eWxlIChvYmosIG9wdGlvbnMpIHtcblx0dmFyIHN0eWxlLCB1cGRhdGUsIHJlbW92ZSwgcmVzdWx0O1xuXG5cdC8vIElmIGEgdHJhbnNmb3JtIGZ1bmN0aW9uIHdhcyBkZWZpbmVkLCBydW4gaXQgb24gdGhlIGNzc1xuXHRpZiAob3B0aW9ucy50cmFuc2Zvcm0gJiYgb2JqLmNzcykge1xuXHQgICAgcmVzdWx0ID0gdHlwZW9mIG9wdGlvbnMudHJhbnNmb3JtID09PSAnZnVuY3Rpb24nXG5cdFx0ID8gb3B0aW9ucy50cmFuc2Zvcm0ob2JqLmNzcykgXG5cdFx0IDogb3B0aW9ucy50cmFuc2Zvcm0uZGVmYXVsdChvYmouY3NzKTtcblxuXHQgICAgaWYgKHJlc3VsdCkge1xuXHQgICAgXHQvLyBJZiB0cmFuc2Zvcm0gcmV0dXJucyBhIHZhbHVlLCB1c2UgdGhhdCBpbnN0ZWFkIG9mIHRoZSBvcmlnaW5hbCBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIHJ1bm5pbmcgcnVudGltZSB0cmFuc2Zvcm1hdGlvbnMgb24gdGhlIGNzcy5cblx0ICAgIFx0b2JqLmNzcyA9IHJlc3VsdDtcblx0ICAgIH0gZWxzZSB7XG5cdCAgICBcdC8vIElmIHRoZSB0cmFuc2Zvcm0gZnVuY3Rpb24gcmV0dXJucyBhIGZhbHN5IHZhbHVlLCBkb24ndCBhZGQgdGhpcyBjc3MuXG5cdCAgICBcdC8vIFRoaXMgYWxsb3dzIGNvbmRpdGlvbmFsIGxvYWRpbmcgb2YgY3NzXG5cdCAgICBcdHJldHVybiBmdW5jdGlvbigpIHtcblx0ICAgIFx0XHQvLyBub29wXG5cdCAgICBcdH07XG5cdCAgICB9XG5cdH1cblxuXHRpZiAob3B0aW9ucy5zaW5nbGV0b24pIHtcblx0XHR2YXIgc3R5bGVJbmRleCA9IHNpbmdsZXRvbkNvdW50ZXIrKztcblxuXHRcdHN0eWxlID0gc2luZ2xldG9uIHx8IChzaW5nbGV0b24gPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucykpO1xuXG5cdFx0dXBkYXRlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCBmYWxzZSk7XG5cdFx0cmVtb3ZlID0gYXBwbHlUb1NpbmdsZXRvblRhZy5iaW5kKG51bGwsIHN0eWxlLCBzdHlsZUluZGV4LCB0cnVlKTtcblxuXHR9IGVsc2UgaWYgKFxuXHRcdG9iai5zb3VyY2VNYXAgJiZcblx0XHR0eXBlb2YgVVJMID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgVVJMLmNyZWF0ZU9iamVjdFVSTCA9PT0gXCJmdW5jdGlvblwiICYmXG5cdFx0dHlwZW9mIFVSTC5yZXZva2VPYmplY3RVUkwgPT09IFwiZnVuY3Rpb25cIiAmJlxuXHRcdHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgJiZcblx0XHR0eXBlb2YgYnRvYSA9PT0gXCJmdW5jdGlvblwiXG5cdCkge1xuXHRcdHN0eWxlID0gY3JlYXRlTGlua0VsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gdXBkYXRlTGluay5iaW5kKG51bGwsIHN0eWxlLCBvcHRpb25zKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXG5cdFx0XHRpZihzdHlsZS5ocmVmKSBVUkwucmV2b2tlT2JqZWN0VVJMKHN0eWxlLmhyZWYpO1xuXHRcdH07XG5cdH0gZWxzZSB7XG5cdFx0c3R5bGUgPSBjcmVhdGVTdHlsZUVsZW1lbnQob3B0aW9ucyk7XG5cdFx0dXBkYXRlID0gYXBwbHlUb1RhZy5iaW5kKG51bGwsIHN0eWxlKTtcblx0XHRyZW1vdmUgPSBmdW5jdGlvbiAoKSB7XG5cdFx0XHRyZW1vdmVTdHlsZUVsZW1lbnQoc3R5bGUpO1xuXHRcdH07XG5cdH1cblxuXHR1cGRhdGUob2JqKTtcblxuXHRyZXR1cm4gZnVuY3Rpb24gdXBkYXRlU3R5bGUgKG5ld09iaikge1xuXHRcdGlmIChuZXdPYmopIHtcblx0XHRcdGlmIChcblx0XHRcdFx0bmV3T2JqLmNzcyA9PT0gb2JqLmNzcyAmJlxuXHRcdFx0XHRuZXdPYmoubWVkaWEgPT09IG9iai5tZWRpYSAmJlxuXHRcdFx0XHRuZXdPYmouc291cmNlTWFwID09PSBvYmouc291cmNlTWFwXG5cdFx0XHQpIHtcblx0XHRcdFx0cmV0dXJuO1xuXHRcdFx0fVxuXG5cdFx0XHR1cGRhdGUob2JqID0gbmV3T2JqKTtcblx0XHR9IGVsc2Uge1xuXHRcdFx0cmVtb3ZlKCk7XG5cdFx0fVxuXHR9O1xufVxuXG52YXIgcmVwbGFjZVRleHQgPSAoZnVuY3Rpb24gKCkge1xuXHR2YXIgdGV4dFN0b3JlID0gW107XG5cblx0cmV0dXJuIGZ1bmN0aW9uIChpbmRleCwgcmVwbGFjZW1lbnQpIHtcblx0XHR0ZXh0U3RvcmVbaW5kZXhdID0gcmVwbGFjZW1lbnQ7XG5cblx0XHRyZXR1cm4gdGV4dFN0b3JlLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXG4nKTtcblx0fTtcbn0pKCk7XG5cbmZ1bmN0aW9uIGFwcGx5VG9TaW5nbGV0b25UYWcgKHN0eWxlLCBpbmRleCwgcmVtb3ZlLCBvYmopIHtcblx0dmFyIGNzcyA9IHJlbW92ZSA/IFwiXCIgOiBvYmouY3NzO1xuXG5cdGlmIChzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gcmVwbGFjZVRleHQoaW5kZXgsIGNzcyk7XG5cdH0gZWxzZSB7XG5cdFx0dmFyIGNzc05vZGUgPSBkb2N1bWVudC5jcmVhdGVUZXh0Tm9kZShjc3MpO1xuXHRcdHZhciBjaGlsZE5vZGVzID0gc3R5bGUuY2hpbGROb2RlcztcblxuXHRcdGlmIChjaGlsZE5vZGVzW2luZGV4XSkgc3R5bGUucmVtb3ZlQ2hpbGQoY2hpbGROb2Rlc1tpbmRleF0pO1xuXG5cdFx0aWYgKGNoaWxkTm9kZXMubGVuZ3RoKSB7XG5cdFx0XHRzdHlsZS5pbnNlcnRCZWZvcmUoY3NzTm9kZSwgY2hpbGROb2Rlc1tpbmRleF0pO1xuXHRcdH0gZWxzZSB7XG5cdFx0XHRzdHlsZS5hcHBlbmRDaGlsZChjc3NOb2RlKTtcblx0XHR9XG5cdH1cbn1cblxuZnVuY3Rpb24gYXBwbHlUb1RhZyAoc3R5bGUsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIG1lZGlhID0gb2JqLm1lZGlhO1xuXG5cdGlmKG1lZGlhKSB7XG5cdFx0c3R5bGUuc2V0QXR0cmlidXRlKFwibWVkaWFcIiwgbWVkaWEpXG5cdH1cblxuXHRpZihzdHlsZS5zdHlsZVNoZWV0KSB7XG5cdFx0c3R5bGUuc3R5bGVTaGVldC5jc3NUZXh0ID0gY3NzO1xuXHR9IGVsc2Uge1xuXHRcdHdoaWxlKHN0eWxlLmZpcnN0Q2hpbGQpIHtcblx0XHRcdHN0eWxlLnJlbW92ZUNoaWxkKHN0eWxlLmZpcnN0Q2hpbGQpO1xuXHRcdH1cblxuXHRcdHN0eWxlLmFwcGVuZENoaWxkKGRvY3VtZW50LmNyZWF0ZVRleHROb2RlKGNzcykpO1xuXHR9XG59XG5cbmZ1bmN0aW9uIHVwZGF0ZUxpbmsgKGxpbmssIG9wdGlvbnMsIG9iaikge1xuXHR2YXIgY3NzID0gb2JqLmNzcztcblx0dmFyIHNvdXJjZU1hcCA9IG9iai5zb3VyY2VNYXA7XG5cblx0Lypcblx0XHRJZiBjb252ZXJ0VG9BYnNvbHV0ZVVybHMgaXNuJ3QgZGVmaW5lZCwgYnV0IHNvdXJjZW1hcHMgYXJlIGVuYWJsZWRcblx0XHRhbmQgdGhlcmUgaXMgbm8gcHVibGljUGF0aCBkZWZpbmVkIHRoZW4gbGV0cyB0dXJuIGNvbnZlcnRUb0Fic29sdXRlVXJsc1xuXHRcdG9uIGJ5IGRlZmF1bHQuICBPdGhlcndpc2UgZGVmYXVsdCB0byB0aGUgY29udmVydFRvQWJzb2x1dGVVcmxzIG9wdGlvblxuXHRcdGRpcmVjdGx5XG5cdCovXG5cdHZhciBhdXRvRml4VXJscyA9IG9wdGlvbnMuY29udmVydFRvQWJzb2x1dGVVcmxzID09PSB1bmRlZmluZWQgJiYgc291cmNlTWFwO1xuXG5cdGlmIChvcHRpb25zLmNvbnZlcnRUb0Fic29sdXRlVXJscyB8fCBhdXRvRml4VXJscykge1xuXHRcdGNzcyA9IGZpeFVybHMoY3NzKTtcblx0fVxuXG5cdGlmIChzb3VyY2VNYXApIHtcblx0XHQvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vYS8yNjYwMzg3NVxuXHRcdGNzcyArPSBcIlxcbi8qIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsXCIgKyBidG9hKHVuZXNjYXBlKGVuY29kZVVSSUNvbXBvbmVudChKU09OLnN0cmluZ2lmeShzb3VyY2VNYXApKSkpICsgXCIgKi9cIjtcblx0fVxuXG5cdHZhciBibG9iID0gbmV3IEJsb2IoW2Nzc10sIHsgdHlwZTogXCJ0ZXh0L2Nzc1wiIH0pO1xuXG5cdHZhciBvbGRTcmMgPSBsaW5rLmhyZWY7XG5cblx0bGluay5ocmVmID0gVVJMLmNyZWF0ZU9iamVjdFVSTChibG9iKTtcblxuXHRpZihvbGRTcmMpIFVSTC5yZXZva2VPYmplY3RVUkwob2xkU3JjKTtcbn1cbiIsIlxuLyoqXG4gKiBXaGVuIHNvdXJjZSBtYXBzIGFyZSBlbmFibGVkLCBgc3R5bGUtbG9hZGVyYCB1c2VzIGEgbGluayBlbGVtZW50IHdpdGggYSBkYXRhLXVyaSB0b1xuICogZW1iZWQgdGhlIGNzcyBvbiB0aGUgcGFnZS4gVGhpcyBicmVha3MgYWxsIHJlbGF0aXZlIHVybHMgYmVjYXVzZSBub3cgdGhleSBhcmUgcmVsYXRpdmUgdG8gYVxuICogYnVuZGxlIGluc3RlYWQgb2YgdGhlIGN1cnJlbnQgcGFnZS5cbiAqXG4gKiBPbmUgc29sdXRpb24gaXMgdG8gb25seSB1c2UgZnVsbCB1cmxzLCBidXQgdGhhdCBtYXkgYmUgaW1wb3NzaWJsZS5cbiAqXG4gKiBJbnN0ZWFkLCB0aGlzIGZ1bmN0aW9uIFwiZml4ZXNcIiB0aGUgcmVsYXRpdmUgdXJscyB0byBiZSBhYnNvbHV0ZSBhY2NvcmRpbmcgdG8gdGhlIGN1cnJlbnQgcGFnZSBsb2NhdGlvbi5cbiAqXG4gKiBBIHJ1ZGltZW50YXJ5IHRlc3Qgc3VpdGUgaXMgbG9jYXRlZCBhdCBgdGVzdC9maXhVcmxzLmpzYCBhbmQgY2FuIGJlIHJ1biB2aWEgdGhlIGBucG0gdGVzdGAgY29tbWFuZC5cbiAqXG4gKi9cblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoY3NzKSB7XG4gIC8vIGdldCBjdXJyZW50IGxvY2F0aW9uXG4gIHZhciBsb2NhdGlvbiA9IHR5cGVvZiB3aW5kb3cgIT09IFwidW5kZWZpbmVkXCIgJiYgd2luZG93LmxvY2F0aW9uO1xuXG4gIGlmICghbG9jYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXCJmaXhVcmxzIHJlcXVpcmVzIHdpbmRvdy5sb2NhdGlvblwiKTtcbiAgfVxuXG5cdC8vIGJsYW5rIG9yIG51bGw/XG5cdGlmICghY3NzIHx8IHR5cGVvZiBjc3MgIT09IFwic3RyaW5nXCIpIHtcblx0ICByZXR1cm4gY3NzO1xuICB9XG5cbiAgdmFyIGJhc2VVcmwgPSBsb2NhdGlvbi5wcm90b2NvbCArIFwiLy9cIiArIGxvY2F0aW9uLmhvc3Q7XG4gIHZhciBjdXJyZW50RGlyID0gYmFzZVVybCArIGxvY2F0aW9uLnBhdGhuYW1lLnJlcGxhY2UoL1xcL1teXFwvXSokLywgXCIvXCIpO1xuXG5cdC8vIGNvbnZlcnQgZWFjaCB1cmwoLi4uKVxuXHQvKlxuXHRUaGlzIHJlZ3VsYXIgZXhwcmVzc2lvbiBpcyBqdXN0IGEgd2F5IHRvIHJlY3Vyc2l2ZWx5IG1hdGNoIGJyYWNrZXRzIHdpdGhpblxuXHRhIHN0cmluZy5cblxuXHQgL3VybFxccypcXCggID0gTWF0Y2ggb24gdGhlIHdvcmQgXCJ1cmxcIiB3aXRoIGFueSB3aGl0ZXNwYWNlIGFmdGVyIGl0IGFuZCB0aGVuIGEgcGFyZW5zXG5cdCAgICggID0gU3RhcnQgYSBjYXB0dXJpbmcgZ3JvdXBcblx0ICAgICAoPzogID0gU3RhcnQgYSBub24tY2FwdHVyaW5nIGdyb3VwXG5cdCAgICAgICAgIFteKShdICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgIFxcKCAgPSBNYXRjaCBhIHN0YXJ0IHBhcmVudGhlc2VzXG5cdCAgICAgICAgICAgICAoPzogID0gU3RhcnQgYW5vdGhlciBub24tY2FwdHVyaW5nIGdyb3Vwc1xuXHQgICAgICAgICAgICAgICAgIFteKShdKyAgPSBNYXRjaCBhbnl0aGluZyB0aGF0IGlzbid0IGEgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICB8ICA9IE9SXG5cdCAgICAgICAgICAgICAgICAgXFwoICA9IE1hdGNoIGEgc3RhcnQgcGFyZW50aGVzZXNcblx0ICAgICAgICAgICAgICAgICAgICAgW14pKF0qICA9IE1hdGNoIGFueXRoaW5nIHRoYXQgaXNuJ3QgYSBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgICAgIFxcKSAgPSBNYXRjaCBhIGVuZCBwYXJlbnRoZXNlc1xuXHQgICAgICAgICAgICAgKSAgPSBFbmQgR3JvdXBcbiAgICAgICAgICAgICAgKlxcKSA9IE1hdGNoIGFueXRoaW5nIGFuZCB0aGVuIGEgY2xvc2UgcGFyZW5zXG4gICAgICAgICAgKSAgPSBDbG9zZSBub24tY2FwdHVyaW5nIGdyb3VwXG4gICAgICAgICAgKiAgPSBNYXRjaCBhbnl0aGluZ1xuICAgICAgICkgID0gQ2xvc2UgY2FwdHVyaW5nIGdyb3VwXG5cdCBcXCkgID0gTWF0Y2ggYSBjbG9zZSBwYXJlbnNcblxuXHQgL2dpICA9IEdldCBhbGwgbWF0Y2hlcywgbm90IHRoZSBmaXJzdC4gIEJlIGNhc2UgaW5zZW5zaXRpdmUuXG5cdCAqL1xuXHR2YXIgZml4ZWRDc3MgPSBjc3MucmVwbGFjZSgvdXJsXFxzKlxcKCgoPzpbXikoXXxcXCgoPzpbXikoXSt8XFwoW14pKF0qXFwpKSpcXCkpKilcXCkvZ2ksIGZ1bmN0aW9uKGZ1bGxNYXRjaCwgb3JpZ1VybCkge1xuXHRcdC8vIHN0cmlwIHF1b3RlcyAoaWYgdGhleSBleGlzdClcblx0XHR2YXIgdW5xdW90ZWRPcmlnVXJsID0gb3JpZ1VybFxuXHRcdFx0LnRyaW0oKVxuXHRcdFx0LnJlcGxhY2UoL15cIiguKilcIiQvLCBmdW5jdGlvbihvLCAkMSl7IHJldHVybiAkMTsgfSlcblx0XHRcdC5yZXBsYWNlKC9eJyguKiknJC8sIGZ1bmN0aW9uKG8sICQxKXsgcmV0dXJuICQxOyB9KTtcblxuXHRcdC8vIGFscmVhZHkgYSBmdWxsIHVybD8gbm8gY2hhbmdlXG5cdFx0aWYgKC9eKCN8ZGF0YTp8aHR0cDpcXC9cXC98aHR0cHM6XFwvXFwvfGZpbGU6XFwvXFwvXFwvfFxccyokKS9pLnRlc3QodW5xdW90ZWRPcmlnVXJsKSkge1xuXHRcdCAgcmV0dXJuIGZ1bGxNYXRjaDtcblx0XHR9XG5cblx0XHQvLyBjb252ZXJ0IHRoZSB1cmwgdG8gYSBmdWxsIHVybFxuXHRcdHZhciBuZXdVcmw7XG5cblx0XHRpZiAodW5xdW90ZWRPcmlnVXJsLmluZGV4T2YoXCIvL1wiKSA9PT0gMCkge1xuXHRcdCAgXHQvL1RPRE86IHNob3VsZCB3ZSBhZGQgcHJvdG9jb2w/XG5cdFx0XHRuZXdVcmwgPSB1bnF1b3RlZE9yaWdVcmw7XG5cdFx0fSBlbHNlIGlmICh1bnF1b3RlZE9yaWdVcmwuaW5kZXhPZihcIi9cIikgPT09IDApIHtcblx0XHRcdC8vIHBhdGggc2hvdWxkIGJlIHJlbGF0aXZlIHRvIHRoZSBiYXNlIHVybFxuXHRcdFx0bmV3VXJsID0gYmFzZVVybCArIHVucXVvdGVkT3JpZ1VybDsgLy8gYWxyZWFkeSBzdGFydHMgd2l0aCAnLydcblx0XHR9IGVsc2Uge1xuXHRcdFx0Ly8gcGF0aCBzaG91bGQgYmUgcmVsYXRpdmUgdG8gY3VycmVudCBkaXJlY3Rvcnlcblx0XHRcdG5ld1VybCA9IGN1cnJlbnREaXIgKyB1bnF1b3RlZE9yaWdVcmwucmVwbGFjZSgvXlxcLlxcLy8sIFwiXCIpOyAvLyBTdHJpcCBsZWFkaW5nICcuLydcblx0XHR9XG5cblx0XHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIHVybCguLi4pXG5cdFx0cmV0dXJuIFwidXJsKFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VXJsKSArIFwiKVwiO1xuXHR9KTtcblxuXHQvLyBzZW5kIGJhY2sgdGhlIGZpeGVkIGNzc1xuXHRyZXR1cm4gZml4ZWRDc3M7XG59O1xuIiwiaW1wb3J0IHsgQnV0dHBsdWdEZXZpY2UsIFNpbmdsZU1vdG9yVmlicmF0ZUNtZCwgRmxlc2hsaWdodExhdW5jaEZXMTJDbWQgfSBmcm9tIFwiLi4vaW5kZXhcIjtcbmltcG9ydCAqIGFzIE1lc3NhZ2VzIGZyb20gXCIuLi9pbmRleFwiO1xuXG5leHBvcnQgY2xhc3MgVGVzdERldmljZSBleHRlbmRzIEJ1dHRwbHVnRGV2aWNlIHtcblxuICBwcml2YXRlIF9jb25uZWN0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcbiAgcHJpdmF0ZSBfbGluZWFyU3BlZWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX2xpbmVhclBvc2l0aW9uOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF92aWJyYXRlU3BlZWQ6IG51bWJlciA9IDA7XG4gIHByaXZhdGUgX3JvdGF0ZVNwZWVkOiBudW1iZXIgPSAwO1xuICBwcml2YXRlIF9yb3RhdGVDbG9ja3dpc2U6IGJvb2xlYW4gPSBmYWxzZTtcblxuICBwdWJsaWMgY29uc3RydWN0b3IobmFtZTogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICAgc2hvdWxkVmlicmF0ZTogYm9vbGVhbiA9IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICAgc2hvdWxkTGluZWFyOiBib29sZWFuID0gZmFsc2UsXG4gICAgICAgICAgICAgICAgICAgICBzaG91bGRSb3RhdGU6IGJvb2xlYW4gPSBmYWxzZSkge1xuICAgIHN1cGVyKGBUZXN0IERldmljZSAtICR7bmFtZX1gLCBcIlRlc3REZXZpY2VcIiArIChzaG91bGRWaWJyYXRlID8gXCJWaWJyYXRlXCIgOiBcIlwiKSArIChzaG91bGRMaW5lYXIgPyBcIkxpbmVhclwiIDogXCJcIikpO1xuICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLlN0b3BEZXZpY2VDbWQsIHRoaXMuSGFuZGxlU3RvcERldmljZUNtZCk7XG4gICAgaWYgKHNob3VsZFZpYnJhdGUpIHtcbiAgICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLlNpbmdsZU1vdG9yVmlicmF0ZUNtZCwgdGhpcy5IYW5kbGVTaW5nbGVNb3RvclZpYnJhdGVDbWQpO1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuVmlicmF0ZUNtZCwgdGhpcy5IYW5kbGVWaWJyYXRlQ21kKTtcbiAgICB9XG4gICAgaWYgKHNob3VsZExpbmVhcikge1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuRmxlc2hsaWdodExhdW5jaEZXMTJDbWQsIHRoaXMuSGFuZGxlRmxlc2hsaWdodExhdW5jaEZXMTJDbWQpO1xuICAgICAgdGhpcy5Nc2dGdW5jcy5zZXQoTWVzc2FnZXMuTGluZWFyQ21kLCB0aGlzLkhhbmRsZUxpbmVhckNtZCk7XG4gICAgfVxuICAgIGlmIChzaG91bGRSb3RhdGUpIHtcbiAgICAgIHRoaXMuTXNnRnVuY3Muc2V0KE1lc3NhZ2VzLlJvdGF0ZUNtZCwgdGhpcy5IYW5kbGVSb3RhdGVDbWQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBnZXQgQ29ubmVjdGVkKCkge1xuICAgIHJldHVybiB0aGlzLl9jb25uZWN0ZWQ7XG4gIH1cblxuICBwdWJsaWMgc2V0IENvbm5lY3RlZChjb25uZWN0ZWQ6IGJvb2xlYW4pIHtcbiAgICB0aGlzLl9jb25uZWN0ZWQgPSBjb25uZWN0ZWQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0IE1lc3NhZ2VTcGVjaWZpY2F0aW9ucygpOiBvYmplY3Qge1xuICAgIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5WaWJyYXRlQ21kKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgVmlicmF0ZUNtZDogeyBGZWF0dXJlQ291bnQ6IDIgfSxcbiAgICAgICAgU2luZ2xlTW90b3JWaWJyYXRlQ21kOiB7fSxcbiAgICAgICAgU3RvcERldmljZUNtZDoge30sXG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAodGhpcy5Nc2dGdW5jcy5oYXMoTWVzc2FnZXMuTGluZWFyQ21kKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgTGluZWFyQ21kOiB7IEZlYXR1cmVDb3VudDogMSB9LFxuICAgICAgICBGbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZDoge30sXG4gICAgICAgIFN0b3BEZXZpY2VDbWQ6IHt9LFxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLlJvdGF0ZUNtZCkpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIFJvdGF0ZUNtZDogeyBGZWF0dXJlQ291bnQ6IDEgfSxcbiAgICAgICAgU3RvcERldmljZUNtZDoge30sXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge307XG4gIH1cblxuICBwdWJsaWMgRGlzY29ubmVjdCgpIHtcbiAgICB0aGlzLl9jb25uZWN0ZWQgPSBmYWxzZTtcbiAgICB0aGlzLmVtaXQoXCJkZXZpY2VyZW1vdmVkXCIsIHRoaXMpO1xuICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVTdG9wRGV2aWNlQ21kID0gYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLlN0b3BEZXZpY2VDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgIGlmICh0aGlzLk1zZ0Z1bmNzLmhhcyhNZXNzYWdlcy5WaWJyYXRlQ21kKSkge1xuICAgICAgdGhpcy5lbWl0KFwidmlicmF0ZVwiLCAwKTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuTXNnRnVuY3MuaGFzKE1lc3NhZ2VzLkxpbmVhckNtZCkpIHtcbiAgICAgIHRoaXMuZW1pdChcImxpbmVhclwiLCB7IHBvc2l0aW9uOiB0aGlzLl9saW5lYXJQb3NpdGlvbixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzcGVlZDogdGhpcy5fbGluZWFyU3BlZWR9KTtcbiAgICB9XG4gICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgTWVzc2FnZXMuT2soYU1zZy5JZCkpO1xuICB9XG5cbiAgcHJpdmF0ZSBIYW5kbGVTaW5nbGVNb3RvclZpYnJhdGVDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5TaW5nbGVNb3RvclZpYnJhdGVDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgdGhpcy5fdmlicmF0ZVNwZWVkID0gYU1zZy5TcGVlZDtcbiAgICAgIHRoaXMuZW1pdChcInZpYnJhdGVcIiwgYU1zZy5TcGVlZCk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBNZXNzYWdlcy5PayhhTXNnLklkKSk7XG4gICAgfVxuXG4gIHByaXZhdGUgSGFuZGxlVmlicmF0ZUNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLlZpYnJhdGVDbWQpOiBQcm9taXNlPE1lc3NhZ2VzLkJ1dHRwbHVnTWVzc2FnZT4gPT4ge1xuICAgICAgcmV0dXJuIHRoaXMuSGFuZGxlU2luZ2xlTW90b3JWaWJyYXRlQ21kKG5ldyBTaW5nbGVNb3RvclZpYnJhdGVDbWQoYU1zZy5TcGVlZHNbMF0uU3BlZWQsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLkRldmljZUluZGV4LFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5JZCkpO1xuICAgIH1cblxuICBwcml2YXRlIEhhbmRsZVJvdGF0ZUNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLlJvdGF0ZUNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICB0aGlzLl9yb3RhdGVTcGVlZCA9IGFNc2cuUm90YXRpb25zWzBdLlNwZWVkO1xuICAgICAgdGhpcy5fcm90YXRlQ2xvY2t3aXNlID0gYU1zZy5Sb3RhdGlvbnNbMF0uQ2xvY2t3aXNlO1xuICAgICAgdGhpcy5lbWl0KFwidmlicmF0ZVwiLCB7IHNwZWVkOiB0aGlzLl9yb3RhdGVTcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgY2xvY2t3aXNlOiB0aGlzLl9yb3RhdGVDbG9ja3dpc2UgfSk7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKG5ldyBNZXNzYWdlcy5PayhhTXNnLklkKSk7XG4gICAgfVxuXG4gIHByaXZhdGUgSGFuZGxlRmxlc2hsaWdodExhdW5jaEZXMTJDbWQgPVxuICAgIGFzeW5jIChhTXNnOiBNZXNzYWdlcy5GbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICB0aGlzLl9saW5lYXJQb3NpdGlvbiA9IGFNc2cuUG9zaXRpb247XG4gICAgICB0aGlzLl9saW5lYXJTcGVlZCA9IGFNc2cuU3BlZWQ7XG4gICAgICB0aGlzLmVtaXQoXCJsaW5lYXJcIiwgeyBwb3NpdGlvbjogdGhpcy5fbGluZWFyUG9zaXRpb24sXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3BlZWQ6IHRoaXMuX2xpbmVhclNwZWVkIH0pO1xuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShuZXcgTWVzc2FnZXMuT2soYU1zZy5JZCkpO1xuICAgIH1cblxuICBwcml2YXRlIEhhbmRsZUxpbmVhckNtZCA9XG4gICAgYXN5bmMgKGFNc2c6IE1lc3NhZ2VzLkxpbmVhckNtZCk6IFByb21pc2U8TWVzc2FnZXMuQnV0dHBsdWdNZXNzYWdlPiA9PiB7XG4gICAgICBpZiAoYU1zZy5WZWN0b3JzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgICByZXR1cm4gbmV3IE1lc3NhZ2VzLkVycm9yKFwiTGluZWFyQ21kIHJlcXVpcmVzIDEgdmVjdG9yIGZvciB0aGlzIGRldmljZS5cIixcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBNZXNzYWdlcy5FcnJvckNsYXNzLkVSUk9SX0RFVklDRSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLklkKTtcbiAgICAgIH1cbiAgICAgIC8vIE1vdmUgYmV0d2VlbiA1Lzk1LCBvdGhlcndpc2Ugd2UnbGwgYWxsb3cgdGhlIGRldmljZSB0byBzbWFjayBpbnRvIGhhcmRcbiAgICAgIC8vIHN0b3BzIGJlY2F1c2Ugb2YgYnJhaW5kZWFkIGZpcm13YXJlLlxuICAgICAgY29uc3QgcmFuZ2U6IG51bWJlciA9IDkwO1xuICAgICAgY29uc3QgdmVjdG9yID0gYU1zZy5WZWN0b3JzWzBdO1xuICAgICAgY29uc3QgY3VycmVudFBvc2l0aW9uID0gdmVjdG9yLlBvc2l0aW9uICogMTAwO1xuICAgICAgY29uc3QgcG9zaXRpb25EZWx0YTogbnVtYmVyID0gTWF0aC5hYnMoY3VycmVudFBvc2l0aW9uIC0gdGhpcy5fbGluZWFyUG9zaXRpb24pO1xuICAgICAgbGV0IHNwZWVkOiBudW1iZXIgPSBNYXRoLmZsb29yKDI1MDAwICogTWF0aC5wb3coKCh2ZWN0b3IuRHVyYXRpb24gKiA5MCkgLyBwb3NpdGlvbkRlbHRhKSwgLTEuMDUpKTtcblxuICAgICAgLy8gQ2xhbXAgc3BlZWQgb24gMCA8PSB4IDw9IDk1IHNvIHdlIGRvbid0IGJyZWFrIHRoZSBsYXVuY2guXG4gICAgICBzcGVlZCA9IE1hdGgubWluKE1hdGgubWF4KHNwZWVkLCAwKSwgOTUpO1xuXG4gICAgICBjb25zdCBwb3NpdGlvbkdvYWwgPSBNYXRoLmZsb29yKCgoY3VycmVudFBvc2l0aW9uIC8gOTkpICogcmFuZ2UpICsgKCg5OSAtIHJhbmdlKSAvIDIpKTtcbiAgICAgIC8vIFdlJ2xsIHNldCB0aGlzLl9sYXN0UG9zaXRpb24gaW4gRmxlc2hsaWdodExhdW5jaEZXMTJDbWQsIHNpbmNlXG4gICAgICAvLyBldmVyeXRoaW5nIGtpbmRhIGZ1bm5lbHMgdG8gdGhhdC5cbiAgICAgIHJldHVybiBhd2FpdCB0aGlzLkhhbmRsZUZsZXNobGlnaHRMYXVuY2hGVzEyQ21kKG5ldyBNZXNzYWdlcy5GbGVzaGxpZ2h0TGF1bmNoRlcxMkNtZChzcGVlZCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwb3NpdGlvbkdvYWwsXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYU1zZy5EZXZpY2VJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBhTXNnLklkKSk7XG4gICAgfVxufVxuIiwiaW1wb3J0IHsgRXZlbnRFbWl0dGVyIH0gZnJvbSBcImV2ZW50c1wiO1xuaW1wb3J0IHsgSURldmljZVN1YnR5cGVNYW5hZ2VyIH0gZnJvbSBcIi4uL2luZGV4XCI7XG5pbXBvcnQgeyBUZXN0RGV2aWNlIH0gZnJvbSBcIi4vVGVzdERldmljZVwiO1xuaW1wb3J0IHsgQnV0dHBsdWdMb2dnZXIgfSBmcm9tIFwiLi4vaW5kZXhcIjtcblxuZXhwb3J0IGNsYXNzIFRlc3REZXZpY2VNYW5hZ2VyIGV4dGVuZHMgRXZlbnRFbWl0dGVyIGltcGxlbWVudHMgSURldmljZVN1YnR5cGVNYW5hZ2VyIHtcblxuICBwcml2YXRlIF9pc1NjYW5uaW5nID0gZmFsc2U7XG4gIHByaXZhdGUgX3Rlc3RWaWJyYXRpb25EZXZpY2UgPSBuZXcgVGVzdERldmljZShcIlRlc3QgVmlicmF0aW9uIERldmljZVwiLCB0cnVlLCBmYWxzZSwgZmFsc2UpO1xuICBwcml2YXRlIF90ZXN0TGluZWFyRGV2aWNlID0gbmV3IFRlc3REZXZpY2UoXCJUZXN0IExpbmVhciBEZXZpY2VcIiwgZmFsc2UsIHRydWUsIGZhbHNlKTtcbiAgcHJpdmF0ZSBfdGVzdFJvdGF0aW9uRGV2aWNlID0gbmV3IFRlc3REZXZpY2UoXCJUZXN0IFJvdGF0aW9uIERldmljZVwiLCBmYWxzZSwgZmFsc2UsIHRydWUpO1xuXG4gIHB1YmxpYyBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG5cbiAgcHVibGljIENvbm5lY3RWaWJyYXRpb25EZXZpY2UoKSB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IENvbm5lY3RpbmcgVmlicmF0aW9uIERldmljZVwiKTtcbiAgICB0aGlzLl90ZXN0VmlicmF0aW9uRGV2aWNlLkNvbm5lY3RlZCA9IHRydWU7XG4gICAgdGhpcy5lbWl0KFwiZGV2aWNlYWRkZWRcIiwgdGhpcy5fdGVzdFZpYnJhdGlvbkRldmljZSk7XG4gIH1cblxuICBwdWJsaWMgQ29ubmVjdExpbmVhckRldmljZSgpIHtcbiAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRGVidWcoXCJUZXN0RGV2aWNlTWFuYWdlcjogQ29ubmVjdGluZyBMaW5lYXIgRGV2aWNlXCIpO1xuICAgIHRoaXMuX3Rlc3RMaW5lYXJEZXZpY2UuQ29ubmVjdGVkID0gdHJ1ZTtcbiAgICB0aGlzLmVtaXQoXCJkZXZpY2VhZGRlZFwiLCB0aGlzLl90ZXN0TGluZWFyRGV2aWNlKTtcbiAgfVxuXG4gIHB1YmxpYyBDb25uZWN0Um90YXRpb25EZXZpY2UoKSB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IENvbm5lY3RpbmcgUm90YXRpb24gRGV2aWNlXCIpO1xuICAgIHRoaXMuX3Rlc3RSb3RhdGlvbkRldmljZS5Db25uZWN0ZWQgPSB0cnVlO1xuICAgIHRoaXMuZW1pdChcImRldmljZWFkZGVkXCIsIHRoaXMuX3Rlc3RSb3RhdGlvbkRldmljZSk7XG4gIH1cblxuICBwdWJsaWMgU3RhcnRTY2FubmluZygpOiB2b2lkIHtcbiAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRGVidWcoXCJUZXN0RGV2aWNlTWFuYWdlcjogU3RhcnRpbmcgU2NhblwiKTtcbiAgICB0aGlzLl9pc1NjYW5uaW5nID0gdHJ1ZTtcbiAgICAvLyBBbHdheXMgZW1pdCBkZXZpY2VzLiBJZiB0aGV5J3JlIGR1cGxpY2F0ZXMsIHRoZSBkZXZpY2UgbWFuYWdlciB3aWxsIHdlZWRcbiAgICAvLyB0aGVtIG91dC5cbiAgICBzZXRUaW1lb3V0KCgpID0+ICB7XG4gICAgICB0aGlzLkNvbm5lY3RWaWJyYXRpb25EZXZpY2UoKTtcbiAgICAgIHRoaXMuQ29ubmVjdExpbmVhckRldmljZSgpO1xuICAgICAgdGhpcy5Db25uZWN0Um90YXRpb25EZXZpY2UoKTtcbiAgICB9LCA1MCk7XG4gICAgc2V0VGltZW91dCgoKSA9PiB0aGlzLlN0b3BTY2FubmluZygpLCAxMDApO1xuICB9XG5cbiAgcHVibGljIGdldCBWaWJyYXRpb25EZXZpY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlc3RWaWJyYXRpb25EZXZpY2U7XG4gIH1cblxuICBwdWJsaWMgZ2V0IExpbmVhckRldmljZSgpIHtcbiAgICByZXR1cm4gdGhpcy5fdGVzdExpbmVhckRldmljZTtcbiAgfVxuXG4gIHB1YmxpYyBnZXQgUm90YXRpb25EZXZpY2UoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3Rlc3RSb3RhdGlvbkRldmljZTtcbiAgfVxuXG4gIHB1YmxpYyBTdG9wU2Nhbm5pbmcoKTogdm9pZCB7XG4gICAgQnV0dHBsdWdMb2dnZXIuTG9nZ2VyLkRlYnVnKFwiVGVzdERldmljZU1hbmFnZXI6IFN0b3BwaW5nIFNjYW5cIik7XG4gICAgdGhpcy5faXNTY2FubmluZyA9IGZhbHNlO1xuICAgIHRoaXMuZW1pdChcInNjYW5uaW5nZmluaXNoZWRcIik7XG4gIH1cblxuICBwdWJsaWMgZ2V0IElzU2Nhbm5pbmcoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuX2lzU2Nhbm5pbmc7XG4gIH1cbn1cbiIsImltcG9ydCB7IEJ1dHRwbHVnQ2xpZW50LCBCdXR0cGx1Z0VtYmVkZGVkU2VydmVyQ29ubmVjdG9yLCBCdXR0cGx1Z1NlcnZlciB9IGZyb20gXCIuLi9pbmRleFwiO1xuaW1wb3J0IHsgVGVzdERldmljZU1hbmFnZXIgfSBmcm9tIFwiLi9UZXN0RGV2aWNlTWFuYWdlclwiO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gQ3JlYXRlRGV2VG9vbHNDbGllbnQoKTogUHJvbWlzZTxCdXR0cGx1Z0NsaWVudD4ge1xuICBjb25zdCBjbGllbnQgPSBuZXcgQnV0dHBsdWdDbGllbnQoXCJUZXN0IENsaWVudFwiKTtcbiAgY29uc3Qgc2VydmVyID0gbmV3IEJ1dHRwbHVnU2VydmVyKFwiVGVzdCBTZXJ2ZXJcIik7XG4gIHNlcnZlci5DbGVhckRldmljZU1hbmFnZXJzKCk7XG4gIHNlcnZlci5BZGREZXZpY2VNYW5hZ2VyKG5ldyBUZXN0RGV2aWNlTWFuYWdlcigpKTtcbiAgY29uc3QgbG9jYWxDb25uZWN0b3IgPSBuZXcgQnV0dHBsdWdFbWJlZGRlZFNlcnZlckNvbm5lY3RvcigpO1xuICBsb2NhbENvbm5lY3Rvci5TZXJ2ZXIgPSBzZXJ2ZXI7XG4gIGF3YWl0IGNsaWVudC5Db25uZWN0KGxvY2FsQ29ubmVjdG9yKTtcbiAgcmV0dXJuIFByb21pc2UucmVzb2x2ZShjbGllbnQpO1xufVxuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTG9nUGFuZWwuY3NzXCIpO1xuXG5pZih0eXBlb2YgY29udGVudCA9PT0gJ3N0cmluZycpIGNvbnRlbnQgPSBbW21vZHVsZS5pZCwgY29udGVudCwgJyddXTtcblxudmFyIHRyYW5zZm9ybTtcbnZhciBpbnNlcnRJbnRvO1xuXG5cblxudmFyIG9wdGlvbnMgPSB7XCJobXJcIjp0cnVlfVxuXG5vcHRpb25zLnRyYW5zZm9ybSA9IHRyYW5zZm9ybVxub3B0aW9ucy5pbnNlcnRJbnRvID0gdW5kZWZpbmVkO1xuXG52YXIgdXBkYXRlID0gcmVxdWlyZShcIiEuLi8uLi8uLi9ub2RlX21vZHVsZXMvc3R5bGUtbG9hZGVyL2xpYi9hZGRTdHlsZXMuanNcIikoY29udGVudCwgb3B0aW9ucyk7XG5cbmlmKGNvbnRlbnQubG9jYWxzKSBtb2R1bGUuZXhwb3J0cyA9IGNvbnRlbnQubG9jYWxzO1xuXG5pZihtb2R1bGUuaG90KSB7XG5cdG1vZHVsZS5ob3QuYWNjZXB0KFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL0xvZ1BhbmVsLmNzc1wiLCBmdW5jdGlvbigpIHtcblx0XHR2YXIgbmV3Q29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vTG9nUGFuZWwuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2dwYW5lbFxcXCI+XFxuICA8dGV4dGFyZWEgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2d0ZXh0YXJlYVxcXCIgcmVhZG9ubHk+PC90ZXh0YXJlYT5cXG4gIDxkaXYgaWQ9XFxcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbFxcXCI+XFxuICAgIDxsYWJlbD5QYW5lbCBMb2cgTGV2ZWw6PC9sYWJlbD5cXG4gICAgPHNlbGVjdCBpZD1cXFwiYnV0dHBsdWdkZXZ0b29sc2xvZ2xldmVscGFuZWxzZWxlY3RcXFwiPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIk9mZlxcXCI+T2ZmPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRmF0YWxcXFwiPkZhdGFsPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRXJyb3JcXFwiPkVycm9yPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiV2FyblxcXCI+V2Fybjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkluZm9cXFwiPkluZm88L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJEZWJ1Z1xcXCIgc2VsZWN0ZWQ+RGVidWc8L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJUcmFjZVxcXCI+VHJhY2U8L29wdGlvbj5cXG4gICAgPC9zZWxlY3Q+XFxuICAgIDxsYWJlbD5Db25zb2xlIExvZyBMZXZlbDo8L2xhYmVsPlxcbiAgICA8c2VsZWN0IGlkPVxcXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxjb25zb2xlc2VsZWN0XFxcIj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJPZmZcXFwiIHNlbGVjdGVkPk9mZjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkZhdGFsXFxcIj5GYXRhbDwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIkVycm9yXFxcIj5FcnJvcjwvb3B0aW9uPlxcbiAgICAgIDxvcHRpb24gdmFsdWU9XFxcIldhcm5cXFwiPldhcm48L29wdGlvbj5cXG4gICAgICA8b3B0aW9uIHZhbHVlPVxcXCJJbmZvXFxcIj5JbmZvPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiRGVidWdcXFwiPkRlYnVnPC9vcHRpb24+XFxuICAgICAgPG9wdGlvbiB2YWx1ZT1cXFwiVHJhY2VcXFwiPlRyYWNlPC9vcHRpb24+XFxuICAgIDwvc2VsZWN0PlxcbiAgPC9kaXY+XFxuPC9kaXY+XFxuXCI7IiwiaW1wb3J0IHsgQnV0dHBsdWdMb2dnZXIsIExvZ01lc3NhZ2UsIEJ1dHRwbHVnTG9nTGV2ZWwgfSBmcm9tIFwiLi4vLi4vaW5kZXhcIjtcbmNvbnN0IGpzUGFuZWwgPSByZXF1aXJlKFwianNwYW5lbDRcIik7XG5yZXF1aXJlKFwianNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzc1wiKTtcbmNvbnN0IGxvZ1BhbmVsSFRNTCA9IHJlcXVpcmUoXCIuL0xvZ1BhbmVsLmh0bWxcIikudG9TdHJpbmcoKTtcbnJlcXVpcmUoXCIuL0xvZ1BhbmVsLmNzc1wiKTtcblxuZXhwb3J0IGNsYXNzIExvZ1BhbmVsIHtcblxuICBwdWJsaWMgc3RhdGljIFNob3dMb2dQYW5lbCgpIHtcbiAgICBqc1BhbmVsLmpzUGFuZWwuY3JlYXRlKHtcbiAgICAgIGlkOiAoKSA9PiBcImJ1dHRwbHVnLWxvZ2dlci1wYW5lbFwiLFxuICAgICAgdGhlbWU6ICAgICAgIFwicHJpbWFyeVwiLFxuICAgICAgaGVhZGVyVGl0bGU6IFwiQnV0dHBsdWcgTG9nXCIsXG4gICAgICBwb3NpdGlvbjogICAgXCJjZW50ZXItdG9wIDAgODBcIixcbiAgICAgIGNvbnRlbnRTaXplOiBcIjY1MCAyNTBcIixcbiAgICAgIGNhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gbG9nUGFuZWxIVE1MO1xuICAgICAgICBMb2dQYW5lbC5fcGFuZWwgPSBuZXcgTG9nUGFuZWwoKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfcGFuZWw6IExvZ1BhbmVsIHwgbnVsbCA9IG51bGw7XG4gIHByaXZhdGUgbG9nVGV4dEFyZWE6IEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gIHByaXZhdGUgcGFuZWxMZXZlbFNlbGVjdDogSFRNTFNlbGVjdEVsZW1lbnQ7XG4gIHByaXZhdGUgY29uc29sZUxldmVsU2VsZWN0OiBIVE1MU2VsZWN0RWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLmxvZ1RleHRBcmVhID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0cGx1Z2RldnRvb2xzbG9ndGV4dGFyZWFcIikhIGFzIEhUTUxUZXh0QXJlYUVsZW1lbnQ7XG4gICAgdGhpcy5wYW5lbExldmVsU2VsZWN0ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJidXR0cGx1Z2RldnRvb2xzbG9nbGV2ZWxwYW5lbHNlbGVjdFwiKSEgYXMgSFRNTFNlbGVjdEVsZW1lbnQ7XG4gICAgdGhpcy5jb25zb2xlTGV2ZWxTZWxlY3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRwbHVnZGV2dG9vbHNsb2dsZXZlbGNvbnNvbGVzZWxlY3RcIikhIGFzIEhUTUxTZWxlY3RFbGVtZW50O1xuICAgIGNvbnN0IGxvZyA9IEJ1dHRwbHVnTG9nZ2VyLkxvZ2dlcjtcbiAgICBsb2cuYWRkTGlzdGVuZXIoXCJsb2dcIiwgKG1zZykgPT4ge1xuICAgICAgdGhpcy5hZGRMb2dNZXNzYWdlKG1zZyk7XG4gICAgfSk7XG4gICAgdGhpcy5wYW5lbExldmVsU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgbG9nLk1heGltdW1FdmVudExvZ0xldmVsID0gQnV0dHBsdWdMb2dMZXZlbFt0aGlzLnBhbmVsTGV2ZWxTZWxlY3QudmFsdWVdO1xuICAgIH0pO1xuICAgIHRoaXMuY29uc29sZUxldmVsU2VsZWN0LmFkZEV2ZW50TGlzdGVuZXIoXCJjaGFuZ2VcIiwgKCkgPT4ge1xuICAgICAgbG9nLk1heGltdW1Db25zb2xlTG9nTGV2ZWwgPSBCdXR0cGx1Z0xvZ0xldmVsW3RoaXMuY29uc29sZUxldmVsU2VsZWN0LnZhbHVlXTtcbiAgICB9KTtcbiAgICBsb2cuTWF4aW11bUV2ZW50TG9nTGV2ZWwgPSBCdXR0cGx1Z0xvZ0xldmVsLkRlYnVnO1xuICAgIGxvZy5EZWJ1ZyhcIkxvZ1BhbmVsOiBEZXZUb29scyBMb2cgcGFuZWwgZW5hYmxlZC5cIik7XG4gIH1cblxuICBwcml2YXRlIGFkZExvZ01lc3NhZ2UobXNnOiBMb2dNZXNzYWdlKSB7XG4gICAgdGhpcy5sb2dUZXh0QXJlYS52YWx1ZSA9IHRoaXMubG9nVGV4dEFyZWEudmFsdWUgKyBcIlxcblwiICsgbXNnLkZvcm1hdHRlZE1lc3NhZ2U7XG4gIH1cblxufVxuIiwiXG52YXIgY29udGVudCA9IHJlcXVpcmUoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3NcIik7XG5cbmlmKHR5cGVvZiBjb250ZW50ID09PSAnc3RyaW5nJykgY29udGVudCA9IFtbbW9kdWxlLmlkLCBjb250ZW50LCAnJ11dO1xuXG52YXIgdHJhbnNmb3JtO1xudmFyIGluc2VydEludG87XG5cblxuXG52YXIgb3B0aW9ucyA9IHtcImhtclwiOnRydWV9XG5cbm9wdGlvbnMudHJhbnNmb3JtID0gdHJhbnNmb3JtXG5vcHRpb25zLmluc2VydEludG8gPSB1bmRlZmluZWQ7XG5cbnZhciB1cGRhdGUgPSByZXF1aXJlKFwiIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9zdHlsZS1sb2FkZXIvbGliL2FkZFN0eWxlcy5qc1wiKShjb250ZW50LCBvcHRpb25zKTtcblxuaWYoY29udGVudC5sb2NhbHMpIG1vZHVsZS5leHBvcnRzID0gY29udGVudC5sb2NhbHM7XG5cbmlmKG1vZHVsZS5ob3QpIHtcblx0bW9kdWxlLmhvdC5hY2NlcHQoXCIhIS4uLy4uLy4uL25vZGVfbW9kdWxlcy9jc3MtbG9hZGVyL2luZGV4LmpzIS4vVGVzdERldmljZU1hbmFnZXJQYW5lbC5jc3NcIiwgZnVuY3Rpb24oKSB7XG5cdFx0dmFyIG5ld0NvbnRlbnQgPSByZXF1aXJlKFwiISEuLi8uLi8uLi9ub2RlX21vZHVsZXMvY3NzLWxvYWRlci9pbmRleC5qcyEuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIpO1xuXG5cdFx0aWYodHlwZW9mIG5ld0NvbnRlbnQgPT09ICdzdHJpbmcnKSBuZXdDb250ZW50ID0gW1ttb2R1bGUuaWQsIG5ld0NvbnRlbnQsICcnXV07XG5cblx0XHR2YXIgbG9jYWxzID0gKGZ1bmN0aW9uKGEsIGIpIHtcblx0XHRcdHZhciBrZXksIGlkeCA9IDA7XG5cblx0XHRcdGZvcihrZXkgaW4gYSkge1xuXHRcdFx0XHRpZighYiB8fCBhW2tleV0gIT09IGJba2V5XSkgcmV0dXJuIGZhbHNlO1xuXHRcdFx0XHRpZHgrKztcblx0XHRcdH1cblxuXHRcdFx0Zm9yKGtleSBpbiBiKSBpZHgtLTtcblxuXHRcdFx0cmV0dXJuIGlkeCA9PT0gMDtcblx0XHR9KGNvbnRlbnQubG9jYWxzLCBuZXdDb250ZW50LmxvY2FscykpO1xuXG5cdFx0aWYoIWxvY2FscykgdGhyb3cgbmV3IEVycm9yKCdBYm9ydGluZyBDU1MgSE1SIGR1ZSB0byBjaGFuZ2VkIGNzcy1tb2R1bGVzIGxvY2Fscy4nKTtcblxuXHRcdHVwZGF0ZShuZXdDb250ZW50KTtcblx0fSk7XG5cblx0bW9kdWxlLmhvdC5kaXNwb3NlKGZ1bmN0aW9uKCkgeyB1cGRhdGUoKTsgfSk7XG59IiwibW9kdWxlLmV4cG9ydHMgPSBcIjxidXR0cGx1Zy1kZXZ0b29scy1tYWluPlxcbiAgPGlucHV0IGlkPVxcXCJ0YWIxXFxcIiB0eXBlPVxcXCJyYWRpb1xcXCIgbmFtZT1cXFwidGFic1xcXCIgY2hlY2tlZD5cXG4gIDxsYWJlbCBmb3I9XFxcInRhYjFcXFwiPlRlc3QgRGV2aWNlczwvbGFiZWw+XFxuICA8c2VjdGlvbiBpZD1cXFwiY29udGVudDFcXFwiPlxcbiAgICA8ZGl2IGlkPVxcXCJzaW11bGF0b3JcXFwiPlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcInZpYnJhdG9yLXNpbXVsYXRvci1jb21wb25lbnRcXFwiPlxcbiAgICAgICAgPGRpdiBjbGFzcz1cXFwidmlicmF0b3JcXFwiPlxcbiAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9odXNoLnBuZ1wiKSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgIGlkPVxcXCJ2aWJyYXRvci1pbWFnZVxcXCI+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXYgaWQ9XFxcInZpYnJhdG9yLWluZm9cXFwiPlxcbiAgICAgICAgICA8Yj5TcGVlZDo8L2I+IDxzcGFuIGlkPVxcXCJ2aWJyYXRpb25zcGVlZFxcXCI+MDwvc3Bhbj48YnIvPlxcbiAgICAgICAgICA8YnV0dG9uIGlkPVxcXCJ2aWJyYXRlZGlzY29ubmVjdFxcXCI+RGlzY29ubmVjdDwvYnV0dG9uPlxcbiAgICAgICAgPC9kaXY+XFxuICAgICAgPC9kaXY+XFxuICAgICAgPGRpdiBjbGFzcz1cXFwic2ltdWxhdG9yLWRpdmlkZXJcXFwiPjwvZGl2PlxcbiAgICAgIDxkaXYgY2xhc3M9XFxcImZsZXNobGlnaHQtc2ltXFxcIj5cXG4gICAgICAgIDxkaXYgY2xhc3M9XFxcImMtZmxlc2hsaWdodFxcXCI+XFxuICAgICAgICAgIDxkaXY+XFxuICAgICAgICAgICAgPGltZyBzcmM9XFxcIlwiICsgcmVxdWlyZShcIi4vcnVsZXIucG5nXCIpICsgXCJcXFwiPlxcbiAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgPGRpdj5cXG4gICAgICAgICAgICA8aW1nIHNyYz1cXFwiXCIgKyByZXF1aXJlKFwiLi9mbGVzaGxpZ2h0LnBuZ1wiKSArIFwiXFxcIlxcbiAgICAgICAgICAgICAgICAgY2xhc3M9XFxcIm8tZmxlc2hsaWdodFxcXCJcXG4gICAgICAgICAgICAgICAgIGlkPVxcXCJmbGVzaGxpZ2h0LWltYWdlXFxcIj5cXG4gICAgICAgICAgPC9kaXY+XFxuICAgICAgICA8L2Rpdj5cXG4gICAgICAgIDxkaXY+XFxuICAgICAgICAgIDxiPlNwZWVkOjwvYj4gPHNwYW4gaWQ9XFxcImxpbmVhcnNwZWVkXFxcIj4wPC9zcGFuPjxici8+XFxuICAgICAgICAgIDxiPlBvc2l0aW9uOjwvYj4gPHNwYW4gaWQ9XFxcImxpbmVhcnBvc2l0aW9uXFxcIj4wPC9zcGFuPjxici8+XFxuICAgICAgICAgIDxidXR0b24gaWQ9XFxcImxpbmVhcmRpc2Nvbm5lY3RcXFwiPkRpc2Nvbm5lY3Q8L2J1dHRvbj5cXG4gICAgICAgIDwvZGl2PlxcbiAgICAgIDwvZGl2PlxcbiAgICA8L2Rpdj5cXG4gIDwvc2VjdGlvbj5cXG48L2J1dHRwbHVnLWRldnRvb2xzLW1haW4+XFxuXCI7IiwiaW1wb3J0IHsgQnV0dHBsdWdTZXJ2ZXIsIEJ1dHRwbHVnTG9nZ2VyIH0gZnJvbSBcIi4uLy4uL2luZGV4XCI7XG5pbXBvcnQgeyBUZXN0RGV2aWNlTWFuYWdlciB9IGZyb20gXCIuLi9UZXN0RGV2aWNlTWFuYWdlclwiO1xuaW1wb3J0ICogYXMgVFdFRU4gZnJvbSBcIkB0d2VlbmpzL3R3ZWVuLmpzXCI7XG5cbmNvbnN0IGpzUGFuZWwgPSByZXF1aXJlKFwianNwYW5lbDRcIik7XG5yZXF1aXJlKFwianNwYW5lbDQvZGlzdC9qc3BhbmVsLmNzc1wiKTtcbmNvbnN0IHRlc3RQYW5lbEhUTUwgPSByZXF1aXJlKFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsLmh0bWxcIikudG9TdHJpbmcoKTtcbnJlcXVpcmUoXCIuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwuY3NzXCIpO1xuXG5leHBvcnQgY2xhc3MgVGVzdERldmljZU1hbmFnZXJQYW5lbCB7XG4gIHB1YmxpYyBzdGF0aWMgU2hvd1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWwoYnV0dHBsdWdTZXJ2ZXI6IEJ1dHRwbHVnU2VydmVyKSB7XG4gICAgbGV0IHRkbTogVGVzdERldmljZU1hbmFnZXIgfCBudWxsID0gbnVsbDtcbiAgICBmb3IgKGNvbnN0IG1nciBvZiBidXR0cGx1Z1NlcnZlci5EZXZpY2VNYW5hZ2Vycykge1xuICAgICAgaWYgKG1nci5jb25zdHJ1Y3Rvci5uYW1lID09PSBcIlRlc3REZXZpY2VNYW5hZ2VyXCIpIHtcbiAgICAgICAgdGRtID0gKG1nciBhcyBUZXN0RGV2aWNlTWFuYWdlcik7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGRtID09PSBudWxsKSB7XG4gICAgICBCdXR0cGx1Z0xvZ2dlci5Mb2dnZXIuRXJyb3IoXCJUZXN0RGV2aWNlTWFuYWdlclBhbmVsOiBDYW5ub3QgZ2V0IHRlc3QgZGV2aWNlIG1hbmFnZXIgZnJvbSBzZXJ2ZXIuXCIpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFwiQ2Fubm90IGdldCB0ZXN0IGRldmljZSBtYW5hZ2VyIGZyb20gc2VydmVyLlwiKTtcbiAgICB9XG4gICAganNQYW5lbC5qc1BhbmVsLmNyZWF0ZSh7XG4gICAgICBpZDogKCkgPT4gXCJidXR0cGx1Zy10ZXN0LWRldmljZS1tYW5hZ2VyLXBhbmVsXCIsXG4gICAgICB0aGVtZTogICAgICAgXCJwcmltYXJ5XCIsXG4gICAgICBoZWFkZXJUaXRsZTogXCJUZXN0IERldmljZSBNYW5hZ2VyXCIsXG4gICAgICBwb3NpdGlvbjogICAgXCJjZW50ZXItdG9wIDAgODBcIixcbiAgICAgIGNvbnRlbnRTaXplOiBcIjQwMCAyNTBcIixcbiAgICAgIGNhbGxiYWNrKCkge1xuICAgICAgICB0aGlzLmNvbnRlbnQuaW5uZXJIVE1MID0gdGVzdFBhbmVsSFRNTDtcbiAgICAgICAgVGVzdERldmljZU1hbmFnZXJQYW5lbC5fcGFuZWwgPSBuZXcgVGVzdERldmljZU1hbmFnZXJQYW5lbCh0ZG0hKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgc3RhdGljIF9wYW5lbDogVGVzdERldmljZU1hbmFnZXJQYW5lbDtcbiAgcHJpdmF0ZSB2aWJyYXRvclR3ZWVuOiBUV0VFTi5Ud2VlbiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIGxhdW5jaFR3ZWVuOiBUV0VFTi5Ud2VlbiB8IG51bGwgPSBudWxsO1xuICBwcml2YXRlIF90ZXN0TWFuYWdlcjogVGVzdERldmljZU1hbmFnZXI7XG4gIHByaXZhdGUgZmxlc2hsaWdodEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xuICBwcml2YXRlIHZpYnJhdG9yRWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIHByaXZhdGUgY3VycmVudExhdW5jaFBvc2l0aW9uOiBhbnkgPSB7IHg6IDAsIHk6IDAgfTtcbiAgcHJpdmF0ZSBsYXN0UG9zaXRpb246IG51bWJlciA9IDA7XG4gIHByaXZhdGUgbW92ZVJhZGl1czogbnVtYmVyID0gMDtcbiAgcHJpdmF0ZSBjdXJyZW50VmlicmF0ZVBvc2l0aW9uOiBhbnkgPSB7IHg6IDAsIHk6IDAgfTtcbiAgcHJpdmF0ZSBlbGVtZW50T2JzZXJ2ZXI6IE11dGF0aW9uT2JzZXJ2ZXIgfCBudWxsID0gbnVsbDtcbiAgcHJpdmF0ZSBoYXNSQUZCZWVuQ2FsbGVkID0gZmFsc2U7XG5cbiAgY29uc3RydWN0b3IodGRtOiBUZXN0RGV2aWNlTWFuYWdlcikge1xuICAgIHRoaXMuX3Rlc3RNYW5hZ2VyID0gdGRtO1xuICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlicmF0ZWRpc2Nvbm5lY3RcIikhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLl90ZXN0TWFuYWdlciEuVmlicmF0aW9uRGV2aWNlLkRpc2Nvbm5lY3QoKTtcbiAgICB9KTtcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmVhcmRpc2Nvbm5lY3RcIikhLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCAoKSA9PiB7XG4gICAgICB0aGlzLl90ZXN0TWFuYWdlciEuTGluZWFyRGV2aWNlLkRpc2Nvbm5lY3QoKTtcbiAgICB9KTtcbiAgICBjb25zdCBzcGVlZEhhbmRsZXIgPSAoc3BlZWQpID0+IHtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwidmlicmF0aW9uc3BlZWRcIikhLmlubmVySFRNTCA9IChzcGVlZCAqIDEwMCkudG9GaXhlZCgxKTtcbiAgICAgIHRoaXMudmlicmF0ZU1vdmUoc3BlZWQpO1xuICAgIH07XG4gICAgdGhpcy5fdGVzdE1hbmFnZXIuVmlicmF0aW9uRGV2aWNlLmFkZExpc3RlbmVyKFwidmlicmF0ZVwiLCBzcGVlZEhhbmRsZXIpO1xuXG4gICAgY29uc3QgcG9zaXRpb25IYW5kbGVyID0gKGxpbmVhcm9iajogYW55KSA9PiB7XG4gICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImxpbmVhcnBvc2l0aW9uXCIpIS5pbm5lckhUTUwgPSAobGluZWFyb2JqLnBvc2l0aW9uKTtcbiAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwibGluZWFyc3BlZWRcIikhLmlubmVySFRNTCA9IChsaW5lYXJvYmouc3BlZWQpO1xuICAgICAgdGhpcy5sYXVuY2hNb3ZlKGxpbmVhcm9iai5wb3NpdGlvbiwgbGluZWFyb2JqLnNwZWVkKTtcbiAgICB9O1xuXG4gICAgdGhpcy5fdGVzdE1hbmFnZXIuTGluZWFyRGV2aWNlLmFkZExpc3RlbmVyKFwibGluZWFyXCIsIHBvc2l0aW9uSGFuZGxlcik7XG4gICAgdGhpcy5mbGVzaGxpZ2h0RWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiZmxlc2hsaWdodC1pbWFnZVwiKSE7XG4gICAgdGhpcy52aWJyYXRvckVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInZpYnJhdG9yLWltYWdlXCIpITtcblxuICAgIC8vIEFmdGVyIHRoZSBub2RlIGhhcyBiZWVuIGNyZWF0ZWQsIGF0dGFjaCBhIG11dGF0aW9uIG9ic2VydmVyIHRvIGRpc2Nvbm5lY3RcbiAgICAvLyBldmVudHMgd2hlbiB0aGUgcGFuZWwgaXMgY2xvc2VkLCBvdGhlcndpc2Ugd2UnbGwgZ2V0IGV2ZW50cyBnb2luZyB0b1xuICAgIC8vIGVsZW1lbnRzIHRoYXQgbm8gbG9uZ2VyIGV4aXN0LlxuICAgIHByb2Nlc3MubmV4dFRpY2soKCkgPT4ge1xuICAgICAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRwbHVnLXRlc3QtZGV2aWNlLW1hbmFnZXItcGFuZWxcIik7XG4gICAgICBpZiAoIWVsKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIoKG11dGF0aW9ucykgPT4ge1xuICAgICAgICBpZiAoIWRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwiYnV0dHBsdWctdGVzdC1kZXZpY2UtbWFuYWdlci1wYW5lbFwiKSkge1xuICAgICAgICAgIHRoaXMuX3Rlc3RNYW5hZ2VyLlZpYnJhdGlvbkRldmljZS5yZW1vdmVMaXN0ZW5lcihcInZpYnJhdGVcIiwgc3BlZWRIYW5kbGVyKTtcbiAgICAgICAgICB0aGlzLl90ZXN0TWFuYWdlci5MaW5lYXJEZXZpY2UucmVtb3ZlTGlzdGVuZXIoXCJsaW5lYXJcIiwgcG9zaXRpb25IYW5kbGVyKTtcbiAgICAgICAgICBvYnNlcnZlci5kaXNjb25uZWN0KCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgb2JzZXJ2ZXIub2JzZXJ2ZShlbCEucGFyZW50Tm9kZSEsIHsgY2hpbGRMaXN0OiB0cnVlIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSByZXF1ZXN0QW5pbWF0ZSA9ICgpID0+IHtcbiAgICBpZiAodGhpcy5oYXNSQUZCZWVuQ2FsbGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuaGFzUkFGQmVlbkNhbGxlZCA9IHRydWU7XG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHRoaXMuYW5pbWF0ZSk7XG4gIH1cblxuICBwcml2YXRlIGFuaW1hdGUgPSAoY3VycmVudFRpbWU6IG51bWJlcikgPT4ge1xuICAgIHRoaXMuaGFzUkFGQmVlbkNhbGxlZCA9IGZhbHNlO1xuICAgIGlmICh0aGlzLnZpYnJhdG9yVHdlZW4gJiYgIXRoaXMudmlicmF0b3JUd2Vlbi51cGRhdGUoY3VycmVudFRpbWUpKSB7XG4gICAgICBpZiAodGhpcy5tb3ZlUmFkaXVzICE9PSAwKSB7XG4gICAgICAgIHRoaXMudmlicmF0ZU1vdmUodGhpcy5tb3ZlUmFkaXVzKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRoaXMudmlicmF0b3JUd2VlbiA9IG51bGw7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmxhdW5jaFR3ZWVuICYmICF0aGlzLmxhdW5jaFR3ZWVuLnVwZGF0ZShjdXJyZW50VGltZSkpIHtcbiAgICAgIHRoaXMubGF1bmNoVHdlZW4gPSBudWxsO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aGlzLnJlcXVlc3RBbmltYXRlKCk7XG4gICAgfVxuICAgIHRoaXMudmlicmF0b3JFbGVtZW50LnN0eWxlLnRvcCA9IGAke3RoaXMuY3VycmVudFZpYnJhdGVQb3NpdGlvbi54fXB4YDtcbiAgICB0aGlzLnZpYnJhdG9yRWxlbWVudC5zdHlsZS5yaWdodCA9IGAke3RoaXMuY3VycmVudFZpYnJhdGVQb3NpdGlvbi55fXB4YDtcbiAgICB0aGlzLmZsZXNobGlnaHRFbGVtZW50LnN0eWxlLmJvdHRvbSA9IGAke3RoaXMuY3VycmVudExhdW5jaFBvc2l0aW9uLnl9JWA7XG4gIH1cblxuICBwcml2YXRlIGxhdW5jaE1vdmUgPSAocG9zaXRpb24sIHNwZWVkKSA9PiB7XG4gICAgY29uc3QgcCA9IC0oKDEwMCAtIHBvc2l0aW9uKSAqIDAuMjIpO1xuICAgIGNvbnN0IGR1cmF0aW9uID0gdGhpcy5tb3ZlRHVyYXRpb24ocG9zaXRpb24sIHNwZWVkKTtcbiAgICB0aGlzLmxhdW5jaFR3ZWVuID0gbmV3IFRXRUVOLlR3ZWVuKHRoaXMuY3VycmVudExhdW5jaFBvc2l0aW9uKVxuICAgICAgLnRvKHt4OiAwLCB5OiBwfSwgZHVyYXRpb24pXG4gICAgICAuc3RhcnQoKTtcbiAgICB0aGlzLnJlcXVlc3RBbmltYXRlKCk7XG4gIH1cblxuICAvLyBtb3ZlRHVyYXRpb24gcmV0dXJucyB0aGUgdGltZSBpbiBtaWxsaXNlY29uZHMgaXQgd2lsbCB0YWtlIHRvIG1vdmVcbiAgLy8gdG8gcG9zaXRpb24gYXQgc3BlZWQuXG4gIC8vXG4gIC8vIHBvc2l0aW9uOiBwb3NpdGlvbiBpbiBwZXJjZW50ICgwLTEwMCkuXG4gIC8vIHNwZWVkOiAgICBzcGVlZCBpbiBwZXJjZW50ICgyMC0xMDApLlxuICBwcml2YXRlIG1vdmVEdXJhdGlvbiA9IChwb3NpdGlvbjogbnVtYmVyLCBzcGVlZDogbnVtYmVyKSA9PiB7XG4gICAgY29uc3QgZGlzdGFuY2UgPSBNYXRoLmFicyhwb3NpdGlvbiAtIHRoaXMubGFzdFBvc2l0aW9uKTtcbiAgICB0aGlzLmxhc3RQb3NpdGlvbiA9IHBvc2l0aW9uO1xuICAgIHJldHVybiB0aGlzLmNhbGNEdXJhdGlvbihkaXN0YW5jZSwgc3BlZWQpO1xuICB9XG5cbiAgLy8gX2NhbGNEdXJhdGlvbiByZXR1cm5zIGR1cmF0aW9uIG9mIGEgbW92ZSBpbiBtaWxsaXNlY29uZHMgZm9yIGEgZ2l2ZW5cbiAgLy8gZGlzdGFuY2Uvc3BlZWQuXG4gIC8vXG4gIC8vIGRpc3RhbmNlOiBhbW91bnQgdG8gbW92ZSBwZXJjZW50ICgwLTEwMCkuXG4gIC8vIHNwZWVkOiBzcGVlZCB0byBtb3ZlIGF0IGluIHBlcmNlbnQgKDIwLTEwMCkuXG4gIHByaXZhdGUgY2FsY0R1cmF0aW9uID0gKGRpc3RhbmNlOiBudW1iZXIsIHNwZWVkOiBudW1iZXIpID0+IHtcbiAgICByZXR1cm4gTWF0aC5wb3coc3BlZWQgLyAyNTAwMCwgLTAuOTUpIC8gKDkwIC8gZGlzdGFuY2UpO1xuICB9XG5cbiAgcHJpdmF0ZSB2aWJyYXRlTW92ZSA9IChzcGVlZCkgPT4ge1xuICAgIHRoaXMubW92ZVJhZGl1cyA9IHNwZWVkO1xuICAgIHRoaXMudmlicmF0b3JUd2VlbiA9IG5ldyBUV0VFTi5Ud2Vlbih0aGlzLmN1cnJlbnRWaWJyYXRlUG9zaXRpb24pXG4gICAgICAudG8oe3g6IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIHRoaXMubW92ZVJhZGl1cyAqIDIwKSxcbiAgICAgICAgICAgeTogTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogdGhpcy5tb3ZlUmFkaXVzICogMjApfVxuICAgICAgICAgICwgMzQpXG4gICAgICAuc3RhcnQoKTtcbiAgICB0aGlzLnJlcXVlc3RBbmltYXRlKCk7XG4gIH1cbn1cblxuLy8gU29tZSBjb2RlIGluIHRoaXMgZmlsZSB0YWtlbiBmcm9tIGh0dHBzOi8vZ2l0aHViLmNvbS9mdW5qYWNrL2xhdW5jaGNvbnRyb2xcbi8vIE1JVCBMaWNlbnNlOlxuLypcbiAgTGF1Y2hjb250cm9sIFVJIEZsZXNobGlnaHRcblxuICBodHRwczovL2dpdGh1Yi5jb20vZnVuamFjay9sYXVuY2hjb250cm9sXG5cbiAgQ29weXJpZ2h0IDIwMTcgRnVuamFja1xuXG4gIFJlZGlzdHJpYnV0aW9uIGFuZCB1c2UgaW4gc291cmNlIGFuZCBiaW5hcnkgZm9ybXMsIHdpdGggb3Igd2l0aG91dFxuICBtb2RpZmljYXRpb24sIGFyZSBwZXJtaXR0ZWQgcHJvdmlkZWQgdGhhdCB0aGUgZm9sbG93aW5nIGNvbmRpdGlvbnMgYXJlIG1ldDpcblxuICAxLiBSZWRpc3RyaWJ1dGlvbnMgb2Ygc291cmNlIGNvZGUgbXVzdCByZXRhaW4gdGhlIGFib3ZlIGNvcHlyaWdodCBub3RpY2UsIHRoaXNcbiAgbGlzdCBvZiBjb25kaXRpb25zIGFuZCB0aGUgZm9sbG93aW5nIGRpc2NsYWltZXIuXG5cbiAgMi4gUmVkaXN0cmlidXRpb25zIGluIGJpbmFyeSBmb3JtIG11c3QgcmVwcm9kdWNlIHRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlLFxuICB0aGlzIGxpc3Qgb2YgY29uZGl0aW9ucyBhbmQgdGhlIGZvbGxvd2luZyBkaXNjbGFpbWVyIGluIHRoZSBkb2N1bWVudGF0aW9uXG4gIGFuZC9vciBvdGhlciBtYXRlcmlhbHMgcHJvdmlkZWQgd2l0aCB0aGUgZGlzdHJpYnV0aW9uLlxuXG4gIDMuIE5laXRoZXIgdGhlIG5hbWUgb2YgdGhlIGNvcHlyaWdodCBob2xkZXIgbm9yIHRoZSBuYW1lcyBvZiBpdHMgY29udHJpYnV0b3JzXG4gIG1heSBiZSB1c2VkIHRvIGVuZG9yc2Ugb3IgcHJvbW90ZSBwcm9kdWN0cyBkZXJpdmVkIGZyb20gdGhpcyBzb2Z0d2FyZSB3aXRob3V0XG4gIHNwZWNpZmljIHByaW9yIHdyaXR0ZW4gcGVybWlzc2lvbi5cblxuICBUSElTIFNPRlRXQVJFIElTIFBST1ZJREVEIEJZIFRIRSBDT1BZUklHSFQgSE9MREVSUyBBTkQgQ09OVFJJQlVUT1JTIFwiQVMgSVNcIiBBTkRcbiAgQU5ZIEVYUFJFU1MgT1IgSU1QTElFRCBXQVJSQU5USUVTLCBJTkNMVURJTkcsIEJVVCBOT1QgTElNSVRFRCBUTywgVEhFIElNUExJRURcbiAgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFkgQU5EIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFSRVxuICBESVNDTEFJTUVELiBJTiBOTyBFVkVOVCBTSEFMTCBUSEUgQ09QWVJJR0hUIEhPTERFUiBPUiBDT05UUklCVVRPUlMgQkUgTElBQkxFXG4gIEZPUiBBTlkgRElSRUNULCBJTkRJUkVDVCwgSU5DSURFTlRBTCwgU1BFQ0lBTCwgRVhFTVBMQVJZLCBPUiBDT05TRVFVRU5USUFMXG4gIERBTUFHRVMgKElOQ0xVRElORywgQlVUIE5PVCBMSU1JVEVEIFRPLCBQUk9DVVJFTUVOVCBPRiBTVUJTVElUVVRFIEdPT0RTIE9SXG4gIFNFUlZJQ0VTOyBMT1NTIE9GIFVTRSwgREFUQSwgT1IgUFJPRklUUzsgT1IgQlVTSU5FU1MgSU5URVJSVVBUSU9OKSBIT1dFVkVSXG4gIENBVVNFRCBBTkQgT04gQU5ZIFRIRU9SWSBPRiBMSUFCSUxJVFksIFdIRVRIRVIgSU4gQ09OVFJBQ1QsIFNUUklDVCBMSUFCSUxJVFksXG4gIE9SIFRPUlQgKElOQ0xVRElORyBORUdMSUdFTkNFIE9SIE9USEVSV0lTRSkgQVJJU0lORyBJTiBBTlkgV0FZIE9VVCBPRiBUSEUgVVNFXG4gIE9GIFRISVMgU09GVFdBUkUsIEVWRU4gSUYgQURWSVNFRCBPRiBUSEUgUE9TU0lCSUxJVFkgT0YgU1VDSCBEQU1BR0UuXG4qL1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBRFFBQUFCbkNBWUFBQUJQWW1HeUFBQUFCbUpMUjBRQS93RC9BUCtndmFlVEFBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFBQjNSSlRVVUg0UVFlQ3ljVEJxVDRzUUFBQUJsMFJWaDBRMjl0YldWdWRBQkRjbVZoZEdWa0lIZHBkR2dnUjBsTlVGZUJEaGNBQUFOSlNVUkJWSGphN1p5L2I1dEFGTWZmSWRTaGFUZExqcDJ0a3RtNjhBOTA3NW9CcGtxWit3ZjBiK2dmME5sU0pqeDR6WjdWdzBsV055TjFTMXhMV1ZEVkpiSjVIZXhMQVBQak9MZ0R1Kzg3aFJqZnZRL3ZGM2VRTUdnbUJEMWl4cjhvWUh6ZkJ3Q0ExV3FWK25Dei9sMzY1Y3Z4S0hVOG1Vd0FBQ0FJZ2thMjJhb3dBcVJ0aVhHRElFQVZLQXZPVEFUVXJJTGdlUUd4bkpSQXhOTUVRa1FqSHJLTmVZZnA5NDVSSUZuSXJqb3lHa3M3VXg3S050YXlPd1ZFUFBMR2NIU1pPblljSjNXY3VHT2dQblNTdWRJNmtHcEk2QjViQlFoOTN3ZmY5MnRQWE9RcHk3SlNNR0o4bGVLanRXdy9yQjl6ZjM4MUdxZU80emp1UjlsT1ZycHNsZU9jSHhtZUJIVmR0N0RLTlZrVEtlZFEyWHFvREVaNGlITU91OTJ1OXRqR3F4em4vT2pxNThsMVhWZ3VsMkRiTnRoMmU1RnZkUUdUaEZvc0ZyVEFJeUJxckMzRE5HbXNaeGR5S3ZXU0hmYk1RTWZlWE1iei9XaXNiVUJSbFNNZzZrUFVoNmdQVVIraVBrUmxtNENvRDFFZm9qNUVmWWlxSEFFUkVEVldhcXpVV0tteG5uWmp6VDVmcmF2dGR0dDRqTVpGSVUrdTZ3TG5YSHFnc2lkK1ZCUVVrdzQ5ejB1OVFKRVhLc0pMWlkvMWhVZXpjaHduOVI3ZGJEYXJaYWVsSTNka240THJ5RWR0YjVKY2pjYlNiNUowM1lla3I2U3E0V0VZdnJ4cHI3TW9vT2Q1NXBMN2tLZUhPVkZyRGxWNXArcnZIbVRPVWMybC8zYjVZRFRjc2hKaEYvejg5dUdzUE9SLy9QN0xPSkJNL3FpY1N6bEVRQVJFUU4wRHFWU3R0aXNkZVlpQUNNZ3dVQmlHclNkMzBYZUw1aUlQRWRBSkFXSFhpN3ZzSXE5cWY2RnMxd2ZGcnMxaHN3KzZBaFB6QzNzZTFvK0YvNXFBeVFBSkZlMnpKU2RUVloyeEQrZldCaEl1bGpLMnpDQVoxWnlqMEc0cEQ0bUJkTzU0eW9CazdHRjFjK2pvNnZVbDVNcEVJZGYza0t2bG9hNURUc1pEVlRuRWNEcEhkbk5kYWJUT2tJdWlDT0k0QnB6T2dkMWNNOVhHdXIrVEdBNEE3KzRCTms4Z3dJVGV2YjFvelVOUkZCVis5dWZIN2Y2SDRVRGMzY1NxUUs5ZkhBNEFwL1BDRTk5Ly9kSUk2TVhvUE8xQmptMVNBTG9vR1JoZzh5Um5rSXF5YzczcURRQThxd0w5clQxcEFyS2g0VVY2YnVLaE5xK3NFVWs5THNlN2U0UWVpSDMrVkdrdnJWajdMdWszTkxvT081bHdxd1hVRlpnc2lES1FTYWk2TU1wQXVzRlVRRm9CYWh1c0NZalFQeGppcnlDb3BMV2JBQUFBQUVsRlRrU3VRbUNDXCIiLCJtb2R1bGUuZXhwb3J0cyA9IFwiZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFESUFBQUJCQ0FJQUFBQWM2MkNKQUFBQUJHZEJUVUVBQUxHUEMveGhCUUFBQUNCalNGSk5BQUI2SmdBQWdJUUFBUG9BQUFDQTZBQUFkVEFBQU9wZ0FBQTZtQUFBRjNDY3VsRThBQUFBQm1KTFIwUUEvd0QvQVArZ3ZhZVRBQUFBQ1hCSVdYTUFBQXNTQUFBTEVnSFMzWDc4QUFBQUIzUkpUVVVINFFvT0ZTb0RWeXp4SEFBQUNWbEpSRUZVYU43ZFdsMXNFMWNXUG5mK3h4NlAvOFkyS1VuTUxrMFVGcnBTVVdrTEt0SldWWjhXeVRKc0pFUVFrV2hCTFJJOFZTb1BDNmpxUTZKS2ZXQ2xWbW9UaVVKMnUxV2todlNsTFdyTEF4REM4cU90aE5RR1ZFb1NaMm14alg5aU85TVp6NzEzSHk0WU53bkZQNWlWOWp4WU0zZm1udm51T2VlZXYydEVLWVhtaUJBQ0FNUER3d0N3ZS9kdW51Y1JRazN5Qk5vY0VVSXd4c2VQSHcrSHc5Rm9kR1JrQkdOTUNHbVNiYk93SE1jNWRPaVFZUmhQUHZuayt2WHJ1N3U3anh3NWdqRnVraTFxVW9tRUVKZXFHb1poaEVJOHp3UEF0V3ZYNXVmbk9ZNXJobTFUa3ltbCsvYnRNNHdRVUdDWUFLQzd1M3Zmdm4xTnJyWXBXTmV2WGZ2bXE2OHBJWnFtVlFZUlF1ZlBuLy8rKysrYlFkWTRMSXp4cVZPbjh2azhRbWlSeW16YlBuMzZOTnNRanh0V0lwRTRmdUtFSkVtQ0lDaUtVdjNJN1haLy9QSEhNek16RFF1c0VWaVVVb3p4NE1EQWZ4SnpBQUFJRUwrWVR6YWJIUndjYkhqTkRVcHJhbXJxcTYrK1pycnorbnhMWDFBVVpYSnljbXBxNnJIQ0twVksyV3lHd1JKNFlSbStIRmNvRkJZV0ZocmozNkRmMnJoeFkySm1GZ0IwbjFkVjFXbzBBSUF4WnZISDdYYWZPWFBtY1VtTEFnSUVBRXNYcE92NmloVXJtbytKamNBYUdoNjY4Y01QeXo0S2g4T2FwcmxjTG5hYlRxYy8rT0NEQmhSU055d1dodG0xd1BPaUtGWWVWWVRrOFhpcXB6UUFxMjdidW56NThvdC9ldEdyNndBZ2ltTEFDRmFMeXVmekFZQnBtcmR1M2NJWUEwQWlrZmo4ODgrZmVlYVoxa29Mb1lldlJGWFZTQ1N5VklvdGhEVXhNU0ZMMHRKeFNaSmtXYTdjQ3NKZHIrRjJ1eWNuSjFzTzY1Ti9mdUtxOGdqVkVxcjJGTElzQndJQkFBZ0VBcU9qb3kySFZTTWhoS3AzUTJ0aHBWSXB5N0pxZkxsaWdvN2pwRktwRnNJYUd4dWJTeVJxM0xvdWw0c0pMSnZObmp4NXNsV3dLS1dMOXRSdlo4YVNKRlZTMW5xcFBsaWZmdnBwTlJUTm96MTBDZ0RJc3Z6Wlo1KzFDaGJIY2VmT25mdVZBR3BUSjgvemx5NWRhaFdzeDBuL2w3Q2FMK3BiQVN1ZnoxZGZzeXJvZnc5ckVZUk1KbE5kZ1JXTFJkdTJHK01zTkRadFdTcVh5M056YzdxdXMrdE1KdE13cTBjR2kxTEs4N3hwbXFacE5zK3REaVVTUWw1NDRRV1czRlZHSE1kaDF3aWhCOVhRR09NTkd6YTBDaFpDYU51MmJkWGZ4aGovVW9Oc0xNdUt4V0l0aExVMEx5MFdpblY5NzlIREFvQ3RXN2UyZDNaVXV5dUVVRDZYaHdlSGJVcXAzKytQeFdKMUZRMzF3UXFGUXYzOS9hYjVxMW9aWXdjb1BNaXdjcm5jOXUzYkRjTm9vYlFBNEtXWFhncEhJaFZMQndEYnNuUFo3TUxDUXZVZ0kwS0lydXN2di94eXZYM2V1Z3N5U3VuVTFOU1dQMjlKSm0rekRBSWg1TkU5Z2locW1yYW9veVFJd2tjZmZkVFQwMU92OTYvYmJ5R0VlbnA2NGx2ai94ajVleVhKMFhWZGRkK3RwSE81SEJNYlFtajc5dTFyMXF5cDl4T05TSXNKTEpWSzdkeTU4K3JWcXp6aU1NR1diVmZVSk1zeXgzSGxjcm1ycTJ0MGRMUzZZS3lkR295SmhtSHMyclVMQVBMNXZHbWFBWCtnczdPem82Tmp3NFlOckZya2VYN1BuajNoY0xneC9rMDF3RGR0M0ppWVRWQktpOFdpUXpCQ3FMMjlYWklrMjdZTnd6aDc5bXpEbkJ1UGlZU1E1NTUvL3R0L2Y4dnp2TXZsV3QzWkFRQ0NJTnk1Y3dkanZHblRwcVVsU2UzVVZHTFQxOWNuU3FMTDVhSUFzN096aVVUQzcvZHJtbVpaVm05dmJ6T2NHNWNXeDNFSUljdTJDU0ZBWWRYdmZ5ZkxjaWFUS1pWSzVYSVpHdXFJUEFKWWpDUkpVbVVGQWN6TnpZbWl1SDc5ZXR1Mmk4Vm1BMld6c0FnaFphY01GSUpHME92MTNyaHhvMWdzbGtxbFptR3gvT25LbFNzY3h4bUcwZEhSd2JSVDQzeU80d1JCQkVxejJlejgvUHphdFd2VDZYVHpHYjBBQUlPRGcwTkRRMng3ajR5TVJLUFJXbVl5ejBJd0xwZkxMbFh0ZUtJTkFPYm41MFZSWkswSDlrSmpFTG5oNGVHalI0OEdnOEZBSUxDd3NMQmp4NDUwT2wzTFRFTEk5UFMwSWl0dWw4dnI5UUtBS0lxS29paUtJb3JpOWV2WGI5NjgyZmpoU21VMXdXQlExL1ZjTGpjMk52YmJSMGpzaklsUyt1Njc3MVppY3lRU1dibHlaV2RuWnpRYWJXOXZmL3Z0dC9mdjN6OHpNd1AzRG1QcWd3VUFRTUUwVGRiTzQzbis4dVhMRDIxSGpZMk54V0t4Nlp2VGxSRmQxNlY3emN1MnRyWlFLQ1NLWWp3ZTcrcnEycng1OC9EdzhOM1QzdHJvN2s2Y3orVnoyWndSTXR4dTkvajQrR3V2dmJZMHhESUp2ZlBPT3pNek14TVRFMENvTEVuTVJRRkFvVkJncFJnamw4dVZUQ1lEZ1VBMEd1VjUvdGl4WStsMCt1REJnelcybHZnMzNuamp5eSsrd0E2V1pFblROTk0weStVeUM3cE12MnlWVTFOVDQrUGpXN1pzK2ZISEgyL2Z2czN6ZkttMHdEcURpRU51dDlzMFRYYUNWeXdXVGRQTVpyTzJiZHUyWFNnVUVFTGhjRGlSU0V4T1RubzhubHEyRk1JWVAvZnNzei9kK2tsVzVLQmgrSHkrVENaaldkWmJiNzBWajhkWldURXdNREE2T21wWkZqdWVzSDZ4Rm9wRkIyTkNpS1pwc3Fxd3ZySW9paHpIMmJhOVZGbUNJS3hldmJwUUtCU0x4UU1IRHNUajhZZkFjaHhuY0dEd2IwZVBpcUtvcW1yUEg5YWtVaWxXRXpObmpSRHkrLzA4NGtxbFVzVnlPWTZURk5uajhUejBxTHc2WU91NkhvbEVFb2xFZjM5L0xCWUxoVUlQbW80SUlZU1FQejcxVkM2WFV4VDFpWlZQaE1QaFZDcFZLcFZ5dVJ4Mk1DQUFDczQ5RzJKYTgzbDlrbkszQzY4b2lzZmpVWmZyaWpPNmMrZU80emdJb1hLNTdQVjZtYWtRUW9hR2hqbzdPNWQxYklpWnpvY2Zmbmo0cjRkRVVkUjBUMXRibTgvbnkrZnp0bTNQelNhV0ZnNnFTOVc5M29wcHQ3ZTMxMkxGTEMzNytlZWZLYVdSU0VUVE5FTEllKys5dDJ6NmVqY05US1ZTZS9mc3ZYRGhnc0R6bXFacG1vWVFjckNUU3FZV0dZb29pVDYvMytQeEdJYkJGRlQ1WFY0ZDkvWU44M0FzUmxtV0pVbFNLQlFLQm9PSER4K09ScU9MdEhtZlhUS1pmUFBOTjA5OThlVnZtSXNrU2I2QW4xa0poeEJDeURUTlpDcUZZSWtpRUFDbDkzcE5WRkhWVUNnRUFFQkI5K3I1Zko2RnFYQTQ3RGpPKysrL0g0MUdxN1Y1SHhZaEpKbE12djc2Ni8rNmNJRkR5eUNqbEtxcXF2dTh6R3R6Z05pNkhld3M3ZTBLZ2xEOUdaN24yV3BGVWZSNDlVcTRkTHZkUHA4dkdBd09EZzZHdytIS2xQdXcyRVU2bmU3cjY3dDQ4YUxtY2kvS2V0bXRwTWlXWlJVS0JZSUpJV1RiWDdadDNyeTVXbGFFMHJObnpveWRQTGxvYlFnaGwwc1ZSWkg5c1VkVkZVVlJGVlVSUlZIVHRON2UzcjE3OXk0RDZ6NWZRcjc3N3J0WGRyOHlNejI5NkZGMDFTcENDUUFjTzNaczNicDFMRGd1U29SWU1GanF6UWtoQXdNRDQrUGpDR0IyWmhZQUtGQ3Z6eWNJd3ROUFAzM2l4SWxxUGc4MFZZd3grMHRXTmIzNjZxc05IMHhVNDJNaHNqSVNqOGNYbFc3L0JlZFFiNkRPbGI2SEFBQUFHWFJGV0hSamIyMXRaVzUwQUVOeVpXRjBaV1FnZDJsMGFDQkhTVTFRNTY5QXl3QUFBQ1YwUlZoMFpHRjBaVHBqY21WaGRHVUFNakF4TnkweE1DMHhORlF5TVRvME1qb3dNeTB3Tnpvd01OdmlvcU1BQUFBbGRFVllkR1JoZEdVNmJXOWthV1o1QURJd01UY3RNVEF0TVRSVU1qRTZOREk2TURNdE1EYzZNRENxdnhvZkFBQUFBRWxGVGtTdVFtQ0NcIiIsImV4cG9ydCAqIGZyb20gXCIuLi9UZXN0RGV2aWNlXCI7XG5leHBvcnQgKiBmcm9tIFwiLi4vVGVzdERldmljZU1hbmFnZXJcIjtcbmV4cG9ydCAqIGZyb20gXCIuLi91dGlsc1wiO1xuZXhwb3J0ICogZnJvbSBcIi4vTG9nUGFuZWxcIjtcbmV4cG9ydCAqIGZyb20gXCIuL1Rlc3REZXZpY2VNYW5hZ2VyUGFuZWxcIjtcbmV4cG9ydCAqIGZyb20gXCIuL3V0aWxzLndlYlwiO1xuIiwibW9kdWxlLmV4cG9ydHMgPSBcImRhdGE6aW1hZ2UvcG5nO2Jhc2U2NCxpVkJPUncwS0dnb0FBQUFOU1VoRVVnQUFBQVVBQUFDRkNBWUFBQUNUM3pJOUFBQUFCbUpMUjBRQS93RC9BUCtndmFlVEFBQUFDWEJJV1hNQUFBc1RBQUFMRXdFQW1wd1lBQUFBQjNSSlRVVUg0UVFlQ2g0QWpWeGU0Z0FBQUJsMFJWaDBRMjl0YldWdWRBQkRjbVZoZEdWa0lIZHBkR2dnUjBsTlVGZUJEaGNBQUFBK1NVUkJWRWpIWTJSZ1lQalBnQVZnQ0RKaFU4V0VTL1VJME02SXBwSnhOT2pJRFRveWJSOFZIQlVjTW9LamFYNVVjRFROajFhUm82MkxBV2xkQUFDOEVDMnRBRUJZWEFBQUFBQkpSVTVFcmtKZ2dnPT1cIiIsImltcG9ydCB7IFRlc3REZXZpY2VNYW5hZ2VyUGFuZWwgfSBmcm9tIFwiLi9UZXN0RGV2aWNlTWFuYWdlclBhbmVsXCI7XG5pbXBvcnQgeyBMb2dQYW5lbCB9IGZyb20gXCIuL0xvZ1BhbmVsXCI7XG5pbXBvcnQgeyBCdXR0cGx1Z1NlcnZlciB9IGZyb20gXCIuLi8uLi9pbmRleFwiO1xuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlTG9nZ2VyUGFuZWwoKSB7XG4gIExvZ1BhbmVsLlNob3dMb2dQYW5lbCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gQ3JlYXRlRGV2aWNlTWFuYWdlclBhbmVsKGJ1dHRwbHVnU2VydmVyOiBCdXR0cGx1Z1NlcnZlcikge1xuICBUZXN0RGV2aWNlTWFuYWdlclBhbmVsLlNob3dUZXN0RGV2aWNlTWFuYWdlclBhbmVsKGJ1dHRwbHVnU2VydmVyKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIFJlbW92ZURldmljZU1hbmFnZXJQYW5lbCgpIHtcbiAgY29uc3QgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcImJ1dHRwbHVnLXRlc3QtZGV2aWNlLW1hbmFnZXItcGFuZWxcIik7XG4gIGlmICghZWwgfHwgIWVsLnBhcmVudE5vZGUpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZWwucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChlbCk7XG59XG4iXSwic291cmNlUm9vdCI6IiJ9