/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/logger.js":
/*!**********************!*\
  !*** ./js/logger.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
var t = performance.now(),
    log = (message, alert) => {
  console.groupCollapsed("[MagicPH] Time: ".concat(t, "ms ").concat(alert === "err" ? "ERROR" : ""));
  return console.log(message), console.trace(message), console.groupEnd();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (log);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**************************!*\
  !*** ./js/background.js ***!
  \**************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _logger__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./logger */ "./js/logger.js");

var brws = typeof browser == "undefined" ? chrome : browser; //https://*.phncdn.com/html5player/videoPlayer/es6player/*/desktop-player-adaptive-hls.*

var blockList = ["https://static.trafficjunky.com/*", "https://hubt.pornhub.com/*", "https://*.phncdn.com/www-static/*/htmlPauseRoll/pb_block.*", "https://*.phncdn.com/www-static/js/lib/networkbar-*", "https://*.phncdn.com/www-static/js/lib/generated/front-index-*", "https://*.phncdn.com/www-static/css/front-index-pc.css", "https://*.phncdn.com/www-static/*/premium/premium-modals.*", "https://*.phncdn.com/www-static/js/ph-*", "https://*.phncdn.com/www-static/js/promo-*", "https://*.pornhub.com/_xa/ads_*"];

function blocked(details) {
  (0,_logger__WEBPACK_IMPORTED_MODULE_0__["default"])(details.url);
  return {
    cancel: true
  };
}

brws.webRequest.onBeforeRequest.addListener(blocked, {
  urls: blockList,
  types: ["image", "script", "stylesheet"]
}, ['blocking']);
})();

/******/ })()
;
//# sourceMappingURL=background.js.map