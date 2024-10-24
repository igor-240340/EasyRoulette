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
/******/ 	var __webpack_modules__ = ({

/***/ "../static/assets/common/constants.ts":
/*!********************************************!*\
  !*** ../static/assets/common/constants.ts ***!
  \********************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.PACKAGE_NAME = exports.L10N_BUNDLE = void 0;
const PACKAGE_NAME = "yandex-games-sdk";
exports.PACKAGE_NAME = PACKAGE_NAME;
const L10N_BUNDLE = {
  NAME: "ysdk-i18n-bundle",
  BUNDLE_PATH: "translations"
};
exports.L10N_BUNDLE = L10N_BUNDLE;

/***/ }),

/***/ "../static/assets/common/index.ts":
/*!****************************************!*\
  !*** ../static/assets/common/index.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
var _constants = __webpack_require__(/*! ./constants */ "../static/assets/common/constants.ts");
Object.keys(_constants).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _constants[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _constants[key];
    }
  });
});
var _l10n = __webpack_require__(/*! ./l10n */ "../static/assets/common/l10n.ts");
Object.keys(_l10n).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _l10n[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _l10n[key];
    }
  });
});
var _localization = __webpack_require__(/*! ./localization */ "../static/assets/common/localization.ts");
Object.keys(_localization).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _localization[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _localization[key];
    }
  });
});
var _log = __webpack_require__(/*! ./log */ "../static/assets/common/log.ts");
Object.keys(_log).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _log[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _log[key];
    }
  });
});
var _schema = __webpack_require__(/*! ./schema */ "../static/assets/common/schema.ts");
Object.keys(_schema).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _schema[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _schema[key];
    }
  });
});
var _server = __webpack_require__(/*! ./server */ "../static/assets/common/server.ts");
Object.keys(_server).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _server[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _server[key];
    }
  });
});
var _text = __webpack_require__(/*! ./text */ "../static/assets/common/text.ts");
Object.keys(_text).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _text[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _text[key];
    }
  });
});
var _ipc = __webpack_require__(/*! ./ipc */ "../static/assets/common/ipc.ts");
Object.keys(_ipc).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (key in exports && exports[key] === _ipc[key]) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function () {
      return _ipc[key];
    }
  });
});

/***/ }),

/***/ "../static/assets/common/ipc.ts":
/*!**************************************!*\
  !*** ../static/assets/common/ipc.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.ipc = void 0;
var _constants = __webpack_require__(/*! ./constants */ "../static/assets/common/constants.ts");
/**
 *
 * Working with Editor.Message methods can be a pain in the ass,
 * so i made a little type-safe(ish) wrapper around all for better
 * developing experience.
 *
 * DISCLAIMER: You can use ipc ONLY in editor!
 *
 * @author koteelok
 *
 */ //#region Main process
const MainMethodsNames = {
  "open-localization-editor": "openLocalizationEditor",
  "check-templates": "checkTemplates",
  "generate-templates": "generateTemplates",
  "get-l10n-bundle": "getL10NBundle"
};
function mainRequest(name) {
  return Editor.Message.request(_constants.PACKAGE_NAME, name);
}
function mainON(message, callback) {
  Editor.Message.addBroadcastListener(message, callback);
}
function mainOFF(message, callback) {
  Editor.Message.removeBroadcastListener(message, callback);
}
function mainBroadcast(message, ...args) {
  Editor.Message.broadcast(message, ...args);
}

//#endregion

//#region Scene process
function sceneRequest(method, ...args) {
  return Editor.Message.request("scene", "execute-scene-script", {
    name: _constants.PACKAGE_NAME,
    method,
    args
  });
}

//#endregion

const ipc = {
  main: {
    request: mainRequest,
    on: mainON,
    off: mainOFF,
    broadcast: mainBroadcast
  },
  scene: {
    request: sceneRequest,
    softReload: () => {
      Editor.Message.send("scene", "soft-reload");
    }
  }
};
exports.ipc = ipc;

/***/ }),

/***/ "../static/assets/common/l10n.ts":
/*!***************************************!*\
  !*** ../static/assets/common/l10n.ts ***!
  \***************************************/
/***/ (() => {



/***/ }),

/***/ "../static/assets/common/localization.ts":
/*!***********************************************!*\
  !*** ../static/assets/common/localization.ts ***!
  \***********************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.isLanguageCode = exports.getLanguageNativeName = exports.getLanguageName = exports.domainToLanguageCode = exports.LanguageCode = void 0;
const LanguageCode = {
  AF: "af",
  AM: "am",
  AR: "ar",
  AZ: "az",
  BE: "be",
  BG: "bg",
  BN: "bn",
  CA: "ca",
  CS: "cs",
  DA: "da",
  DE: "de",
  EL: "el",
  EN: "en",
  ES: "es",
  ET: "et",
  EU: "eu",
  FA: "fa",
  FI: "fi",
  FR: "fr",
  GL: "gl",
  HE: "he",
  HI: "hi",
  HR: "hr",
  HU: "hu",
  HY: "hy",
  ID: "id",
  IS: "is",
  IT: "it",
  JA: "ja",
  KA: "ka",
  KK: "kk",
  KM: "km",
  KN: "kn",
  KO: "ko",
  KY: "ky",
  LO: "lo",
  LT: "lt",
  LV: "lv",
  MK: "mk",
  ML: "ml",
  MN: "mn",
  MR: "mr",
  MS: "ms",
  MY: "my",
  NE: "ne",
  NL: "nl",
  NO: "no",
  PL: "pl",
  PT: "pt",
  RO: "ro",
  RU: "ru",
  SI: "si",
  SK: "sk",
  SL: "sl",
  SR: "sr",
  SV: "sv",
  SW: "sw",
  TA: "ta",
  TE: "te",
  TG: "tg",
  TH: "th",
  TK: "tk",
  TL: "tl",
  TR: "tr",
  UK: "uk",
  UR: "ur",
  UZ: "uz",
  VI: "vi",
  ZH: "zh",
  ZU: "zu"
};
exports.LanguageCode = LanguageCode;
const LANGUAGES_LIST = {
  af: {
    name: "afrikaans",
    nativeName: "afrikaans"
  },
  am: {
    name: "amharic",
    nativeName: "አማርኛ"
  },
  ar: {
    name: "arabic",
    nativeName: "اَلْعَرَبِيَّةُ"
  },
  az: {
    name: "azerbaijani",
    nativeName: "azərbaycan dili"
  },
  be: {
    name: "belarusian",
    nativeName: "беларуская мова"
  },
  bg: {
    name: "bulgarian",
    nativeName: "български език"
  },
  bn: {
    name: "bengali",
    nativeName: "বাংলা"
  },
  ca: {
    name: "catalan",
    nativeName: "català"
  },
  cs: {
    name: "czech",
    nativeName: "čeština"
  },
  da: {
    name: "danish",
    nativeName: "dansk"
  },
  de: {
    name: "german",
    nativeName: "deutsch"
  },
  el: {
    name: "greek",
    nativeName: "ελληνικά"
  },
  en: {
    name: "english",
    nativeName: "english"
  },
  es: {
    name: "spanish",
    nativeName: "español"
  },
  et: {
    name: "estonian",
    nativeName: "eesti"
  },
  eu: {
    name: "basque",
    nativeName: "euskara"
  },
  fa: {
    name: "persian",
    nativeName: "فارسی"
  },
  fi: {
    name: "finnish",
    nativeName: "suomi"
  },
  fr: {
    name: "french",
    nativeName: "français"
  },
  gl: {
    name: "galician",
    nativeName: "galego"
  },
  he: {
    name: "hebrew",
    nativeName: "עברית"
  },
  hi: {
    name: "hindi",
    nativeName: "हिन्दी"
  },
  hr: {
    name: "croatian",
    nativeName: "hrvatski"
  },
  hu: {
    name: "hungarian",
    nativeName: "magyar"
  },
  hy: {
    name: "armenian",
    nativeName: "հայերեն"
  },
  id: {
    name: "indonesian",
    nativeName: "bahasa indonesia"
  },
  is: {
    name: "icelandic",
    nativeName: "íslenska"
  },
  it: {
    name: "italian",
    nativeName: "italiano"
  },
  ja: {
    name: "japanese",
    nativeName: "日本語"
  },
  ka: {
    name: "georgian",
    nativeName: "ქართული"
  },
  kk: {
    name: "kazakh",
    nativeName: "қазақ тілі"
  },
  km: {
    name: "khmer",
    nativeName: "ខេមរភាសា"
  },
  kn: {
    name: "kannada",
    nativeName: "ಕನ್ನಡ"
  },
  ko: {
    name: "korean",
    nativeName: "한국어"
  },
  ky: {
    name: "kyrgyz",
    nativeName: "кыргызча"
  },
  lo: {
    name: "lao",
    nativeName: "ພາສາລາວ"
  },
  lt: {
    name: "lithuanian",
    nativeName: "lietuvių kalba"
  },
  lv: {
    name: "latvian",
    nativeName: "latviešu valoda"
  },
  mk: {
    name: "macedonian",
    nativeName: "македонски јазик"
  },
  ml: {
    name: "malayalam",
    nativeName: "മലയാളം"
  },
  mn: {
    name: "mongolian",
    nativeName: "монгол хэл"
  },
  mr: {
    name: "marathi",
    nativeName: "मराठी"
  },
  ms: {
    name: "malay",
    nativeName: "bahasa melayu"
  },
  my: {
    name: "burmese",
    nativeName: "ဗမာစာ"
  },
  ne: {
    name: "nepali",
    nativeName: "नेपाली"
  },
  nl: {
    name: "dutch",
    nativeName: "nederlands"
  },
  no: {
    name: "norwegian",
    nativeName: "norsk"
  },
  pl: {
    name: "polish",
    nativeName: "polski"
  },
  pt: {
    name: "portuguese",
    nativeName: "português"
  },
  ro: {
    name: "romanian",
    nativeName: "română"
  },
  ru: {
    name: "russian",
    nativeName: "русский"
  },
  si: {
    name: "sinhala",
    nativeName: "සිංහල"
  },
  sk: {
    name: "slovak",
    nativeName: "slovenčina"
  },
  sl: {
    name: "slovenian",
    nativeName: "slovenščina"
  },
  sr: {
    name: "serbian",
    nativeName: "српски језик"
  },
  sv: {
    name: "swedish",
    nativeName: "svenska"
  },
  sw: {
    name: "swahili",
    nativeName: "kiswahili"
  },
  ta: {
    name: "tamil",
    nativeName: "தமிழ்"
  },
  te: {
    name: "telugu",
    nativeName: "తెలుగు"
  },
  tg: {
    name: "tajik",
    nativeName: "тоҷикӣ"
  },
  th: {
    name: "thai",
    nativeName: "ไทย"
  },
  tk: {
    name: "turkmen",
    nativeName: "türkmençe"
  },
  tl: {
    name: "tagalog",
    nativeName: "wikang tagalog"
  },
  tr: {
    name: "turkish",
    nativeName: "türkçe"
  },
  uk: {
    name: "ukrainian",
    nativeName: "українська"
  },
  ur: {
    name: "urdu",
    nativeName: "اردو"
  },
  uz: {
    name: "uzbek",
    nativeName: "ўзбек"
  },
  vi: {
    name: "vietnamese",
    nativeName: "tiếng việt"
  },
  zh: {
    name: "chinese",
    nativeName: "中文"
  },
  zu: {
    name: "zulu",
    nativeName: "isizulu"
  }
};
const getLanguageName = code => LANGUAGES_LIST[code].name;
exports.getLanguageName = getLanguageName;
const getLanguageNativeName = code => LANGUAGES_LIST[code].nativeName;
exports.getLanguageNativeName = getLanguageNativeName;
const validCodes = Object.keys(LANGUAGES_LIST);
const isLanguageCode = str => {
  if (str.length != 2) return false;
  return validCodes.includes(str.toLowerCase());
};
exports.isLanguageCode = isLanguageCode;
const TLD2LangCodeMap = {
  az: "az",
  by: "be",
  "co.il": "he",
  com: "en",
  "com.am": "hy",
  "com.ge": "ka",
  "com.tr": "tr",
  ee: "et",
  fr: "fr",
  kz: "kk",
  kg: "ky",
  lt: "lt",
  lv: "lv",
  md: "ro",
  ru: "ru",
  tj: "tg",
  tm: "tk",
  ua: "uk",
  uz: "uz"
};
const domainToLanguageCode = domain => TLD2LangCodeMap[domain];
exports.domainToLanguageCode = domainToLanguageCode;

/***/ }),

/***/ "../static/assets/common/log.ts":
/*!**************************************!*\
  !*** ../static/assets/common/log.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.warn = exports.log = exports.error = void 0;
var _constants = __webpack_require__(/*! ./constants */ "../static/assets/common/constants.ts");
const log = (...data) => {
  console.log(`[${_constants.PACKAGE_NAME}]`, ...data);
};
exports.log = log;
const warn = (...data) => {
  console.warn(`[${_constants.PACKAGE_NAME}]`, ...data);
};
exports.warn = warn;
const error = (...data) => {
  console.error(`[${_constants.PACKAGE_NAME}]`, ...data);
};
exports.error = error;

/***/ }),

/***/ "../static/assets/common/schema.ts":
/*!*****************************************!*\
  !*** ../static/assets/common/schema.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.generateSchema = generateSchema;
// JS object to JSON schema

function generateSchema(obj) {
  if (Array.isArray(obj)) return;
  const properties = {};
  for (const [key, value] of Object.entries(obj)) {
    switch (typeof value) {
      case "string":
        properties[key] = {
          type: "string"
        };
        break;
      case "object":
        const schema = generateSchema(value);
        if (schema) properties[key] = schema;
        break;
    }
  }
  return {
    type: "object",
    properties,
    required: Object.keys(properties)
  };
}

/***/ }),

/***/ "../static/assets/common/server.ts":
/*!*****************************************!*\
  !*** ../static/assets/common/server.ts ***!
  \*****************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.editorServerFetch = void 0;
const editorServerFetch = url => {
  return new Promise((resolve, reject) => {
    fetch(url).then(v => {
      resolve(v.json());
    }).catch(() => reject());
  });
};
exports.editorServerFetch = editorServerFetch;

/***/ }),

/***/ "../static/assets/common/text.ts":
/*!***************************************!*\
  !*** ../static/assets/common/text.ts ***!
  \***************************************/
/***/ ((__unused_webpack_module, exports) => {



Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.capitalizeEachWord = capitalizeEachWord;
exports.capitalizeFirstLetter = capitalizeFirstLetter;
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
function capitalizeEachWord(string) {
  return string.split(" ").map(word => capitalizeFirstLetter(word)).join(" ");
}

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
var exports = __webpack_exports__;
/*!***********************!*\
  !*** ./src/server.ts ***!
  \***********************/


Object.defineProperty(exports, "__esModule", ({
  value: true
}));
exports.get = void 0;
var _common = __webpack_require__(/*! @common */ "../static/assets/common/index.ts");
const get = [{
  url: `/${_common.PACKAGE_NAME}/translations`,
  async handle(req, res, next) {
    const bundle = await _common.ipc.main.request("get-l10n-bundle");
    res.json(bundle);
  }
}];
exports.get = get;
})();

/******/ 	return __webpack_exports__;
/******/ })()
;
});
//# sourceMappingURL=server.js.map