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
/*!***************************************!*\
  !*** ./src/builder/asset-handlers.ts ***!
  \***************************************/

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=asset-handlers.js.map