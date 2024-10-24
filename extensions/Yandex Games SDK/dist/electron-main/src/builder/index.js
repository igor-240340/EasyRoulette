(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(global, () => {
return /******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it uses a non-standard name for the exports (exports).
(() => {
var exports = __webpack_exports__;
/*!******************************!*\
  !*** ./src/builder/index.ts ***!
  \******************************/


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.configs = exports.assetHandlers = void 0;
const configs = {
  "web-mobile": {
    hooks: "./web-hooks",
    options: {},
    verifyRuleMap: {}
  },
  "web-desktop": {
    hooks: "./web-hooks",
    options: {},
    verifyRuleMap: {}
  }
};
exports.configs = configs;
const assetHandlers = "./asset-handlers";
exports.assetHandlers = assetHandlers;
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=index.js.map