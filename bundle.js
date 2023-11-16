/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ([
/* 0 */,
/* 1 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(2);
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(3);

            

var options = {};

options.insert = "head";
options.singleton = false;

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default, options);



/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_styles_css__WEBPACK_IMPORTED_MODULE_1__.default.locals || {});

/***/ }),
/* 2 */
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

"use strict";


var isOldIE = function isOldIE() {
  var memo;
  return function memorize() {
    if (typeof memo === 'undefined') {
      // Test for IE <= 9 as proposed by Browserhacks
      // @see http://browserhacks.com/#hack-e71d8692f65334173fee715c222cb805
      // Tests for existence of standard globals is to allow style-loader
      // to operate correctly into non-standard environments
      // @see https://github.com/webpack-contrib/style-loader/issues/177
      memo = Boolean(window && document && document.all && !window.atob);
    }

    return memo;
  };
}();

var getTarget = function getTarget() {
  var memo = {};
  return function memorize(target) {
    if (typeof memo[target] === 'undefined') {
      var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

      if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
        try {
          // This will throw an exception if access to iframe is blocked
          // due to cross-origin restrictions
          styleTarget = styleTarget.contentDocument.head;
        } catch (e) {
          // istanbul ignore next
          styleTarget = null;
        }
      }

      memo[target] = styleTarget;
    }

    return memo[target];
  };
}();

var stylesInDom = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDom.length; i++) {
    if (stylesInDom[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var index = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3]
    };

    if (index !== -1) {
      stylesInDom[index].references++;
      stylesInDom[index].updater(obj);
    } else {
      stylesInDom.push({
        identifier: identifier,
        updater: addStyle(obj, options),
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function insertStyleElement(options) {
  var style = document.createElement('style');
  var attributes = options.attributes || {};

  if (typeof attributes.nonce === 'undefined') {
    var nonce =  true ? __webpack_require__.nc : 0;

    if (nonce) {
      attributes.nonce = nonce;
    }
  }

  Object.keys(attributes).forEach(function (key) {
    style.setAttribute(key, attributes[key]);
  });

  if (typeof options.insert === 'function') {
    options.insert(style);
  } else {
    var target = getTarget(options.insert || 'head');

    if (!target) {
      throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
    }

    target.appendChild(style);
  }

  return style;
}

function removeStyleElement(style) {
  // istanbul ignore if
  if (style.parentNode === null) {
    return false;
  }

  style.parentNode.removeChild(style);
}
/* istanbul ignore next  */


var replaceText = function replaceText() {
  var textStore = [];
  return function replace(index, replacement) {
    textStore[index] = replacement;
    return textStore.filter(Boolean).join('\n');
  };
}();

function applyToSingletonTag(style, index, remove, obj) {
  var css = remove ? '' : obj.media ? "@media ".concat(obj.media, " {").concat(obj.css, "}") : obj.css; // For old IE

  /* istanbul ignore if  */

  if (style.styleSheet) {
    style.styleSheet.cssText = replaceText(index, css);
  } else {
    var cssNode = document.createTextNode(css);
    var childNodes = style.childNodes;

    if (childNodes[index]) {
      style.removeChild(childNodes[index]);
    }

    if (childNodes.length) {
      style.insertBefore(cssNode, childNodes[index]);
    } else {
      style.appendChild(cssNode);
    }
  }
}

function applyToTag(style, options, obj) {
  var css = obj.css;
  var media = obj.media;
  var sourceMap = obj.sourceMap;

  if (media) {
    style.setAttribute('media', media);
  } else {
    style.removeAttribute('media');
  }

  if (sourceMap && typeof btoa !== 'undefined') {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    while (style.firstChild) {
      style.removeChild(style.firstChild);
    }

    style.appendChild(document.createTextNode(css));
  }
}

var singleton = null;
var singletonCounter = 0;

function addStyle(obj, options) {
  var style;
  var update;
  var remove;

  if (options.singleton) {
    var styleIndex = singletonCounter++;
    style = singleton || (singleton = insertStyleElement(options));
    update = applyToSingletonTag.bind(null, style, styleIndex, false);
    remove = applyToSingletonTag.bind(null, style, styleIndex, true);
  } else {
    style = insertStyleElement(options);
    update = applyToTag.bind(null, style, options);

    remove = function remove() {
      removeStyleElement(style);
    };
  }

  update(obj);
  return function updateStyle(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap) {
        return;
      }

      update(obj = newObj);
    } else {
      remove();
    }
  };
}

module.exports = function (list, options) {
  options = options || {}; // Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
  // tags it will allow on a page

  if (!options.singleton && typeof options.singleton !== 'boolean') {
    options.singleton = isOldIE();
  }

  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    if (Object.prototype.toString.call(newList) !== '[object Array]') {
      return;
    }

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDom[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDom[_index].references === 0) {
        stylesInDom[_index].updater();

        stylesInDom.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),
/* 3 */
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(4);
/* harmony import */ var _node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(5);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_cssWithMappingToString_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\nbody {\n  background-image: url('https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');\n  background-size: cover;\n  background-attachment: fixed;\n  font-family: 'Handlee', sans-serif;\n}\n\n.centered-form-wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n\n#login-form {\n  background-color: rgba(245, 245, 245, 0.664);\n  padding: 70px;\n  border-radius: 10px;\n  text-align: center;\n}\n\n.form-group input[type=\"date\"]\n.form-group input[type=\"number\"],\n.form-group input[type=\"text\"],\n.form-group input[type=\"password\"] {\n  width: 100%;\n  padding: 16px;\n  margin-bottom: 20px;\n  border: 1px solid #1e1c1c;\n  border-radius: 5px;\n  font-size: 20px;\n  font-weight: bold;\n}\n\n#start-date, \n#duration, #travelers {\n  padding: 14px;\n  font-size: 20;\n  font-weight: bold;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.custom-button,\n.dashboard-button {\n  width: auto;\n  padding: 12px 24px; \n  border: none;\n  border-radius: 5px;\n  font-size: 16px;\n  cursor: pointer;\n  background-color: #445570;\n  color: #fff;\n  margin-right: 10px;\n  margin-bottom: 10px;\n}\n\n.header-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 10px;\n  font-size: 20px ;\n}\n\n.header-content h1 {\n  font-size: 50px;\n  margin-bottom: 5px;\n}\n\n.header-content h2 {\n  font-size: 20px; /* Adjusted for consistency */\n  margin-bottom: 5px;\n}\n\n#total-cost {\n  margin-top: 10px;\n  font-weight: bold;\n  margin-bottom: 5px;\n}\n\n#trip-planner-form {\n  flex: 0 0 20%;\n  background-color: #ffffff;\n  padding: 20px;\n  border-radius: 10px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  font-weight: bold;\n}\n\n.form-group {\n  margin: 10px 0;\n}\n\n#estimated-cost {\n  font-weight: bold;\n  margin-top: 10px;\n}\n\n#dashboard {\n  display: none;\n  background-color: #f0f0f0c7;\n  padding: 20px;\n  border-radius: 10px;\n  color: #07162e;\n}\n\nheader {\n  display: flex;\n  justify-content: space-between;\n  background-color: #ffffffbf;\n  color: #445570;\n  padding: 10px;\n  border-radius: 10px;\n  align-items: center;\n  height: auto;\n  min-height: 150px;\n}\n\n.trip-planner {\n  flex-shrink: 0;\n  width: 30%;\n  padding: 20px;\n  background-color: #ffffffac;\n  border-radius: 10px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n  text-align: center;\n}\n\n.trip-columns {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  margin-top: 20px;\n}\n\n.trip-column {\n  flex: 1;\n  margin: 0 10px;\n}\n\n.trip-images {\n  max-height: 300px; \n  overflow-y: auto; \n  margin-bottom: 20px; \n  border-radius: 5px;\n}\n\n.trip-images img {\n  max-width: 100%;\n  height: auto;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n#destination-header h3 {\n  color: #0e3d89;\n  text-align: left;\n  font-size: 70px;\n  margin-bottom: 50px;\n  font-weight: bold;\n  max-width: 600px; \n}\n\n.header-top-content {\n  display: flex;\n  justify-content: space-between;\n}\n\n#login-form .form-group {\n  display: flex;\n  justify-content: center;\n}\n\n#login-form .custom-button,\n#login-form .dashboard-button {\n  width: 100%;\n  margin: 10px 0;\n}\n\n#destination-dropdown {\n  width: 100%; \n  padding: 12px; \n  font-size: 20px; \n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n.custom-button:active,\n.dashboard-button:active {\n  background-color: #2c3e50; \n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); \n  transform: translateY(2px); \n}\n\n\n\n\n", "",{"version":3,"sources":["webpack://./src/css/styles.css"],"names":[],"mappings":";AACA;EACE,4JAA4J;EAC5J,sBAAsB;EACtB,4BAA4B;EAC5B,kCAAkC;AACpC;;AAEA;EACE,aAAa;EACb,uBAAuB;EACvB,mBAAmB;EACnB,aAAa;AACf;;AAEA;EACE,4CAA4C;EAC5C,aAAa;EACb,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;;;;EAIE,WAAW;EACX,aAAa;EACb,mBAAmB;EACnB,yBAAyB;EACzB,kBAAkB;EAClB,eAAe;EACf,iBAAiB;AACnB;;AAEA;;EAEE,aAAa;EACb,aAAa;EACb,iBAAiB;EACjB,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;;EAEE,WAAW;EACX,kBAAkB;EAClB,YAAY;EACZ,kBAAkB;EAClB,eAAe;EACf,eAAe;EACf,yBAAyB;EACzB,WAAW;EACX,kBAAkB;EAClB,mBAAmB;AACrB;;AAEA;EACE,OAAO;EACP,aAAa;EACb,sBAAsB;EACtB,mBAAmB;EACnB,uBAAuB;EACvB,aAAa;EACb,gBAAgB;AAClB;;AAEA;EACE,eAAe;EACf,kBAAkB;AACpB;;AAEA;EACE,eAAe,EAAE,6BAA6B;EAC9C,kBAAkB;AACpB;;AAEA;EACE,gBAAgB;EAChB,iBAAiB;EACjB,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,yBAAyB;EACzB,aAAa;EACb,mBAAmB;EACnB,uCAAuC;EACvC,kBAAkB;EAClB,iBAAiB;AACnB;;AAEA;EACE,cAAc;AAChB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,2BAA2B;EAC3B,aAAa;EACb,mBAAmB;EACnB,cAAc;AAChB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,2BAA2B;EAC3B,cAAc;EACd,aAAa;EACb,mBAAmB;EACnB,mBAAmB;EACnB,YAAY;EACZ,iBAAiB;AACnB;;AAEA;EACE,cAAc;EACd,UAAU;EACV,aAAa;EACb,2BAA2B;EAC3B,mBAAmB;EACnB,uCAAuC;EACvC,kBAAkB;AACpB;;AAEA;EACE,aAAa;EACb,8BAA8B;EAC9B,WAAW;EACX,gBAAgB;AAClB;;AAEA;EACE,OAAO;EACP,cAAc;AAChB;;AAEA;EACE,iBAAiB;EACjB,gBAAgB;EAChB,mBAAmB;EACnB,kBAAkB;AACpB;;AAEA;EACE,eAAe;EACf,YAAY;EACZ,sBAAsB;EACtB,kBAAkB;AACpB;;AAEA;EACE,cAAc;EACd,gBAAgB;EAChB,eAAe;EACf,mBAAmB;EACnB,iBAAiB;EACjB,gBAAgB;AAClB;;AAEA;EACE,aAAa;EACb,8BAA8B;AAChC;;AAEA;EACE,aAAa;EACb,uBAAuB;AACzB;;AAEA;;EAEE,WAAW;EACX,cAAc;AAChB;;AAEA;EACE,WAAW;EACX,aAAa;EACb,eAAe;EACf,sBAAsB;EACtB,kBAAkB;AACpB;AACA;;EAEE,yBAAyB;EACzB,wCAAwC;EACxC,0BAA0B;AAC5B","sourcesContent":["\nbody {\n  background-image: url('https://images.unsplash.com/photo-1543785734-4b6e564642f8?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80');\n  background-size: cover;\n  background-attachment: fixed;\n  font-family: 'Handlee', sans-serif;\n}\n\n.centered-form-wrapper {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  height: 100vh;\n}\n\n#login-form {\n  background-color: rgba(245, 245, 245, 0.664);\n  padding: 70px;\n  border-radius: 10px;\n  text-align: center;\n}\n\n.form-group input[type=\"date\"]\n.form-group input[type=\"number\"],\n.form-group input[type=\"text\"],\n.form-group input[type=\"password\"] {\n  width: 100%;\n  padding: 16px;\n  margin-bottom: 20px;\n  border: 1px solid #1e1c1c;\n  border-radius: 5px;\n  font-size: 20px;\n  font-weight: bold;\n}\n\n#start-date, \n#duration, #travelers {\n  padding: 14px;\n  font-size: 20;\n  font-weight: bold;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n.custom-button,\n.dashboard-button {\n  width: auto;\n  padding: 12px 24px; \n  border: none;\n  border-radius: 5px;\n  font-size: 16px;\n  cursor: pointer;\n  background-color: #445570;\n  color: #fff;\n  margin-right: 10px;\n  margin-bottom: 10px;\n}\n\n.header-content {\n  flex: 1;\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 10px;\n  font-size: 20px ;\n}\n\n.header-content h1 {\n  font-size: 50px;\n  margin-bottom: 5px;\n}\n\n.header-content h2 {\n  font-size: 20px; /* Adjusted for consistency */\n  margin-bottom: 5px;\n}\n\n#total-cost {\n  margin-top: 10px;\n  font-weight: bold;\n  margin-bottom: 5px;\n}\n\n#trip-planner-form {\n  flex: 0 0 20%;\n  background-color: #ffffff;\n  padding: 20px;\n  border-radius: 10px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n  text-align: center;\n  font-weight: bold;\n}\n\n.form-group {\n  margin: 10px 0;\n}\n\n#estimated-cost {\n  font-weight: bold;\n  margin-top: 10px;\n}\n\n#dashboard {\n  display: none;\n  background-color: #f0f0f0c7;\n  padding: 20px;\n  border-radius: 10px;\n  color: #07162e;\n}\n\nheader {\n  display: flex;\n  justify-content: space-between;\n  background-color: #ffffffbf;\n  color: #445570;\n  padding: 10px;\n  border-radius: 10px;\n  align-items: center;\n  height: auto;\n  min-height: 150px;\n}\n\n.trip-planner {\n  flex-shrink: 0;\n  width: 30%;\n  padding: 20px;\n  background-color: #ffffffac;\n  border-radius: 10px;\n  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);\n  text-align: center;\n}\n\n.trip-columns {\n  display: flex;\n  justify-content: space-between;\n  width: 100%;\n  margin-top: 20px;\n}\n\n.trip-column {\n  flex: 1;\n  margin: 0 10px;\n}\n\n.trip-images {\n  max-height: 300px; \n  overflow-y: auto; \n  margin-bottom: 20px; \n  border-radius: 5px;\n}\n\n.trip-images img {\n  max-width: 100%;\n  height: auto;\n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n\n#destination-header h3 {\n  color: #0e3d89;\n  text-align: left;\n  font-size: 70px;\n  margin-bottom: 50px;\n  font-weight: bold;\n  max-width: 600px; \n}\n\n.header-top-content {\n  display: flex;\n  justify-content: space-between;\n}\n\n#login-form .form-group {\n  display: flex;\n  justify-content: center;\n}\n\n#login-form .custom-button,\n#login-form .dashboard-button {\n  width: 100%;\n  margin: 10px 0;\n}\n\n#destination-dropdown {\n  width: 100%; \n  padding: 12px; \n  font-size: 20px; \n  border: 1px solid #ccc;\n  border-radius: 5px;\n}\n.custom-button:active,\n.dashboard-button:active {\n  background-color: #2c3e50; \n  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); \n  transform: translateY(2px); \n}\n\n\n\n\n"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),
/* 4 */
/***/ ((module) => {

"use strict";


function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

module.exports = function cssWithMappingToString(item) {
  var _item = _slicedToArray(item, 4),
      content = _item[1],
      cssMapping = _item[3];

  if (typeof btoa === "function") {
    // eslint-disable-next-line no-undef
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || "").concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join("\n");
  }

  return [content].join("\n");
};

/***/ }),
/* 5 */
/***/ ((module) => {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (cssWithMappingToString) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join("");
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === "string") {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, ""]];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

/***/ }),
/* 6 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "fetchAllTheData": () => (/* binding */ fetchAllTheData),
/* harmony export */   "allTravelers": () => (/* binding */ allTravelers),
/* harmony export */   "allTrips": () => (/* binding */ allTrips),
/* harmony export */   "allDestinations": () => (/* binding */ allDestinations),
/* harmony export */   "postTripData": () => (/* binding */ postTripData)
/* harmony export */ });
/////////////////// Global Variables /////////////////////
const travelersApi = "https://travel-tracker-api-tau.vercel.app/api/v1/travelers";  //all travelers
const tripsApi = "https://travel-tracker-api-tau.vercel.app/api/v1/trips"; //all trips
const destinationsApi = "https://travel-tracker-api-tau.vercel.app/api/v1/destinations"; //all destinations
let allTravelers = null;
let allTrips = null;
let allDestinations = null;


//FETCH CALLS

////////// FETCH TRAVELERS ////////////
const fetchTravelers = () => {
	return fetch(travelersApi)
		.then(response => {
			if (!response.ok) {
				throw Error(`Something is amiss. Request Code: ${response.status}`);
			}
			return response.json();
		})
		.then(data => {
			allTravelers = data.travelers;
      return allTravelers;
		})
		.catch(error => {
			console.log(error);
		});
}

///////// FETCH TRIP DATA ////////////
const fetchTrips = () => {
	return fetch(tripsApi)
		.then(response => {
		if (!response.ok) {
			throw Error(`Something is amiss. Request Code: ${response.status}`);
		}
		return response.json();
	})
	.then(data => {
		allTrips = data.trips;
    return allTrips;
	})
	.catch(error => {
		console.log(error);
	});
}

////////// FETCH DESTINATIONS DATA ////////////
const fetchDestinations = () => {
	return fetch(destinationsApi)
		.then(response => {
		if (!response.ok) {
			throw Error(`Something is amiss. Request Code: ${response.status}`);
		}
		return response.json();
	})
	.then(data => {
		allDestinations = data.destinations;
    return allDestinations;
	})
	.catch(error => {
		console.log(error);
	});
}

/////////POST NEW TRIP//////////////
function postTripData(newTrip) {

    return fetch(tripsApi, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTrip)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Something went wrong: ${response.status} Error`);
        }
        return response.json();
    })
    .then(addedData => {
        
        return addedData; 
    })
    .catch(error => {
        alert(error.message);
        console.error(error);
    });
}




//////////// FETCH ALL THE DATA ////////////
const fetchAllTheData = () => {
	return Promise.all([
		fetchTravelers(travelersApi),
		fetchTrips(tripsApi),
		fetchDestinations(destinationsApi),
		
	])
}


//use this template to export

  

/***/ }),
/* 7 */
/***/ ((module) => {


  //// MAKE THE TRAVELER//////
  function addDataToCurrentTraveler(travelerNumber, travelersData, tripsData, tripDestinations) {
    // Find traveler
    const currentTraveler = travelersData.find((traveler) => traveler.id === travelerNumber);

    if (currentTraveler) {
      // Filter to find trips
      const currentTravelerTrips = tripsData.filter((trip) => trip.userID === travelerNumber);

      // Add destinations to traveler 
      const destinations = currentTravelerTrips.map((trip) => {
        
        const destination = tripDestinations.find((dest) => dest.id === trip.destinationID);
        return destination;
      });

      // CompleteCurrentTraveler object
      const completeCurrentTraveler = {
        traveler: currentTraveler,
        trips: currentTravelerTrips,
        destinations: destinations,
      };

      
      return completeCurrentTraveler;
    } else {
      //If no traveler
      return null;
    }
  }
 

  ///////////////PENDING TRIPS///////////////////
function getImageURLsOfPendingTrips(currentTravelerData) {
    // If valid
    if (currentTravelerData && currentTravelerData.trips) {
      //Find pending
      const pendingTrips = currentTravelerData.trips.filter((trip) => trip.status === 'pending');
  
      const pendingDestinationIDs = pendingTrips.map((trip) => trip.destinationID);

      const matchingDestinations = currentTravelerData.destinations.filter((destination) =>
        pendingDestinationIDs.includes(destination.id)
      );
  
      // Objects with image URL and destination name
      const imageURLsAndDestinationsOfPendingTrips = matchingDestinations.map((destination) => ({
        image: destination.image,
        destination: destination.destination,
      }));
  
      return imageURLsAndDestinationsOfPendingTrips;
    } else {

      return [];
    }
  }
  
  
 ///////////////PAST TRIPS ///////////////////
function getImageURLsOfPastTrips(currentTravelerData) {
    // If valid
    if (currentTravelerData && currentTravelerData.trips) {
      // Get past trips that are not pending
      const pastTrips = currentTravelerData.trips.filter((trip) => {
        return trip.status !== 'pending' && new Date(trip.date) < new Date(); 
      });
  
      // // Objects with image URL and destination name
      const imageURLsAndDestinationsOfPastTrips = pastTrips.map((trip) => {
        const matchingDestination = currentTravelerData.destinations.find(
          (destination) => destination.id === trip.destinationID
        );
  
        if (matchingDestination) {
          return {
            image: matchingDestination.image,
            destination: matchingDestination.destination,
          };
        }

        return {
          message: 'No matching destination found',
        };
      });
  
      return imageURLsAndDestinationsOfPastTrips;
    } else {
      
      return [];
    }
  }
  

  ///////////////FUTURE TRIPS ///////////////////
 
function getImageURLsOfFutureTrips(currentTravelerData) {
    // If valid
    if (currentTravelerData && currentTravelerData.trips) {
      // Get future trips that are not pending
      const futureTrips = currentTravelerData.trips.filter((trip) => {
        return trip.status !== 'pending' && new Date(trip.date) > new Date(); 
      });
  
      // Map future trips to image URLs and destinations
      const imageURLsAndDestinationsOfFutureTrips = futureTrips.map((trip) => {
        const matchingDestination = currentTravelerData.destinations.find(
          (destination) => destination.id === trip.destinationID
        );
  
        if (matchingDestination) {
          return {
            image: matchingDestination.image,
            destination: matchingDestination.destination,
          };
        }

        return {
          message: 'No matching destination found',
        };
      });
      
      return imageURLsAndDestinationsOfFutureTrips;
    } else {
      
      return [];
    }
  }
  
  /////////CALCULATE TOTAL COST FOR THE YEAR////////////////

	function calculateTotalSpentOnTrips(currentTravelerData) {
		// Get the current date
		const currentDate = new Date();
	
		// Calculate the date 4 years ago from the current date
		const threeYearsAgo = new Date(currentDate);
		threeYearsAgo.setFullYear(currentDate.getFullYear() - 4);
	
		// Filter trips for the past 4 years and with status approved
		const recentTrips = currentTravelerData.trips.filter((trip) => {
			const tripDate = new Date(trip.date);
			return tripDate >= threeYearsAgo && tripDate <= currentDate && trip.status === 'approved';
		});
	
		
	
		// Calculate the total cost spent on trips
		const totalCost = recentTrips.reduce((sum, trip) => {
			const destination = currentTravelerData.destinations.find((dest) => dest.id === trip.destinationID);
	
			if (destination) {
				const flightCost = trip.travelers * destination.estimatedFlightCostPerPerson;
				const lodgingCost = trip.duration * destination.estimatedLodgingCostPerDay;
				const tripTotalCost = flightCost + lodgingCost;

				return sum + tripTotalCost;
			}
	
			return sum;
		}, 0);
	
		// agent fee (10%)
		const totalSpentWithFee = totalCost * 1.1;
	
		return totalSpentWithFee.toFixed(2);
	}
	
	



///// CALCULATE SINGLE TRIP COST////////

function calculateTripCost(date, duration, travelers, selectedDestination) {
  // If duration or travelers is missing
  if (duration === null || travelers === null || duration === undefined || travelers === undefined) {
    return null;
  }

  const lodgingCost = duration * selectedDestination.estimatedLodgingCostPerDay;
  const flightCost = travelers * selectedDestination.estimatedFlightCostPerPerson;
  const agentFee = 0.1; // 10% agent fee
  const totalCost = (lodgingCost + flightCost) * (1 + agentFee);
  return totalCost;
}



// EXPORT EVERYTHING LIKE THIS
module.exports = {
    addDataToCurrentTraveler,
    getImageURLsOfPendingTrips,
    getImageURLsOfPastTrips,
    getImageURLsOfFutureTrips,
		calculateTotalSpentOnTrips,
		calculateTripCost
    
  };



/***/ }),
/* 8 */
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "tripSelectionIndex": () => (/* binding */ tripSelectionIndex),
/* harmony export */   "submitTripButton": () => (/* binding */ submitTripButton),
/* harmony export */   "calculateCost": () => (/* binding */ calculateCost),
/* harmony export */   "travelersInput": () => (/* binding */ travelersInput),
/* harmony export */   "durationInput": () => (/* binding */ durationInput),
/* harmony export */   "dateInput": () => (/* binding */ dateInput),
/* harmony export */   "username": () => (/* binding */ username),
/* harmony export */   "password": () => (/* binding */ password),
/* harmony export */   "loginButton": () => (/* binding */ loginButton),
/* harmony export */   "loginSection": () => (/* binding */ loginSection),
/* harmony export */   "dashboardSection": () => (/* binding */ dashboardSection),
/* harmony export */   "updateUserName": () => (/* binding */ updateUserName),
/* harmony export */   "updatePendingTrips": () => (/* binding */ updatePendingTrips),
/* harmony export */   "updatePastTrips": () => (/* binding */ updatePastTrips),
/* harmony export */   "updateFutureTrips": () => (/* binding */ updateFutureTrips),
/* harmony export */   "updateTotalAmountSpent": () => (/* binding */ updateTotalAmountSpent),
/* harmony export */   "updateDestinationDropdown": () => (/* binding */ updateDestinationDropdown),
/* harmony export */   "updateCostOfSingleTrip": () => (/* binding */ updateCostOfSingleTrip)
/* harmony export */ });
const username = document.querySelector('#username')
const password = document.querySelector('#password')
const loginButton = document.querySelector('#submitLogin')
const travelerName = document.querySelector('#traveler')
const loginSection = document.querySelector('#login-section');
const dashboardSection = document.querySelector('#dashboard');
const pendingTripsContainer = document.querySelector('#pending-trips')
const pastTripsContainer = document.querySelector('#past-trips')
const futureTripsContainer = document.querySelector('#upcoming-trips')
const totalAmountSpent = document.querySelector('#total-amount')
const destinationDropdown = document.querySelector('#destination-dropdown');
const dateInput = document.querySelector('#start-date')
const durationInput = document.querySelector('#duration')
const travelersInput = document.querySelector('#travelers')
const calculateCost = document.querySelector('#cost-button')
const submitTripButton = document.querySelector('#submit-trip')
const tripSelectionIndex = document.querySelector('#destination-dropdown')
const viewTripCost = document.querySelector('#trip-cost')






////////DOM UPDATES TO HERE/////////


//TRAVELER NAME
const updateUserName = (traveler) => {
    travelerName.innerHTML ='';
    travelerName.innerHTML += `<h1>${traveler.name}</h1></p>`;
  }

  //TOTAL SPENT
  const updateTotalAmountSpent = (total) => {
    totalAmountSpent.innerHTML = '';
    totalAmountSpent.innerHTML += `<p>$${total}</p>`;
}

 //COST OF SINGLE TRIP
 const updateCostOfSingleTrip = (cost) => {
        viewTripCost.innerHTML = '';
        viewTripCost.innerHTML += `<p>$${cost.toFixed(2)}</p>`;
 }


////PENDING - PAST - FUTURE TRIP IMAGES TO DOM////
const updatePendingTrips = (pendingTripData) => {
    
    pendingTripsContainer.innerHTML = '';
  
    // CREATE ELEMENTS 
    pendingTripData.forEach((tripData) => {
      
      const imageUrl = tripData.image;
      const destinationName = tripData.destination;
  
      
      if (imageUrl && destinationName) {
        // CONTAINER
        const tripContainer = document.createElement('div');
  
        // THUMBNAIL IMAGE ELEMENT
        const tripThumbnail = document.createElement('img');
        tripThumbnail.src = imageUrl; // Set the image URL
        tripThumbnail.alt = `Thumbnail of ${destinationName}`; // Set alt text with destination name for better accessibility
        tripThumbnail.tabIndex = 0
  
        // PARAGRAPH FOR DESTINATION NAME
        const destinationParagraph = document.createElement('p');
        destinationParagraph.textContent = destinationName;
  
        // ADD TO TRIP CONTAINER
        tripContainer.appendChild(tripThumbnail);
        tripContainer.appendChild(destinationParagraph);
  
        // ADD TRIP TO CONTAINER
        pendingTripsContainer.appendChild(tripContainer);
      } else {
        console.error('Image URL or destination name is missing:', tripData);
      }
    });
  };
  
const updatePastTrips = (pastTripImageData) => {
    
    pastTripsContainer.innerHTML = '';
  
    //CREATE ELEMENTS
    pastTripImageData.forEach((tripData) => {
      
      const imageUrl = tripData.image;
      const destinationName = tripData.destination;
  
      
      if (imageUrl && destinationName) {
        // DIV CONTAINEER
        const tripContainer = document.createElement('div');
  
        // IMG ELEMENT
        const tripThumbnail = document.createElement('img');
        tripThumbnail.src = imageUrl; // Set the image URL
        tripThumbnail.alt = `Thumbnail of ${destinationName}`; // Set alt text with destination name for better accessibility
        tripThumbnail.tabIndex = 0

        // PARAGRAPH ELEMENT
        const destinationParagraph = document.createElement('p');
        destinationParagraph.textContent = destinationName;
  
        // ADD TO TRIP CONTAINER
        tripContainer.appendChild(tripThumbnail);
        tripContainer.appendChild(destinationParagraph);
  
        // ADD TRIP TO CONTAINER
        pastTripsContainer.appendChild(tripContainer);
      } else {
        console.error('Image URL or destination name is missing:', tripData);
      }
    });
  };
  
  

  // Function to update the DOM with future trip images that are not pending
  function updateFutureTrips(futureTripImageData) {
    
    futureTripsContainer.innerHTML = '';
  
    // CREATE ELEMENTS
    futureTripImageData.forEach((tripData) => {
      
      const imageUrl = tripData.image;
      const destinationName = tripData.destination;
  
      
      if (imageUrl && destinationName) {
        // DIV CONTAINER
        const tripContainer = document.createElement('div');
  
        // IMAGE ELEMENT
        const tripThumbnail = document.createElement('img');
        tripThumbnail.src = imageUrl; // Set the image URL
        tripThumbnail.alt = `Thumbnail of ${destinationName}`; // Set alt text with destination name for better accessibility
        tripThumbnail.tabIndex = 0
  
        // PARAGRAPH ELEMENT
        const destinationParagraph = document.createElement('p');
        destinationParagraph.textContent = destinationName;
  
        // ADD TO TRIP CONTAINER
        tripContainer.appendChild(tripThumbnail);
        tripContainer.appendChild(destinationParagraph);
  
        // ADD TRIP TO CONTAINER
        futureTripsContainer.appendChild(tripContainer);
      } else {
        console.error('Image URL or destination name is missing:', tripData);
      }
    });
  }




  
//////FUNCTON TO ADD ALL DESTINATIONS VIA DROPDOWN TO THE DASHBOARD
 
const updateDestinationDropdown = (destinationData) => {
    
    destinationDropdown.innerHTML = '';

    destinationData.forEach((destination, index) => {
        const option = document.createElement('option');
        option.value = index; // Set the value to the index for reference
        option.text = destination.destination; // Set the text to the destination name
        destinationDropdown.appendChild(option);
    });
};



///EXPORTS GO HERE LIKE THIS TEMPLATE


/***/ })
/******/ 	]);
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
/******/ 			id: moduleId,
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
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
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
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _css_styles_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var _apiCall__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(6);
/* harmony import */ var _scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(7);
/* harmony import */ var _scriptDefinitions__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _domUpdates__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(8);
let currentTravelerData;

// An example of how you tell webpack to use a CSS (SCSS) file


// // An example of how you tell webpack to use an image (also need to link to it in the index.html)
// import './images/turing-logo.png'

//////////// Import fetch call from apiCalls.js //////////////


//////////// Import functions from scriptDefinitions //////////////




// ///////////// Import from domUpdates.js ///////////////



///RUN///

/////// LOGIN/////////////
_domUpdates__WEBPACK_IMPORTED_MODULE_3__.loginButton.addEventListener('click', (e) => {
    e.preventDefault(); 
  
    // USER NAME/PASSWORD
    const username = document.querySelector('#username').value;
    const password = document.querySelector('#password').value;
  
    
    const usernameParts = username.split('traveler');
  
    // TRAVELER + NUMBER
    if (usernameParts.length === 2) {
      const travelerNumber = parseInt(usernameParts[1]);
  
      
      if (travelerNumber > 0 && travelerNumber < 51 && password === 'traveler') {
        
  
        // HIDE LOGIN SHOW DASHBOARD
        _domUpdates__WEBPACK_IMPORTED_MODULE_3__.loginSection.style.display = 'none';
        _domUpdates__WEBPACK_IMPORTED_MODULE_3__.dashboardSection.style.display = 'block';
  
        // FETCH ALL DATA
        (0,_apiCall__WEBPACK_IMPORTED_MODULE_1__.fetchAllTheData)().then(() => {
          currentTravelerData = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.addDataToCurrentTraveler)(
            travelerNumber, // Pass the login ID
            _apiCall__WEBPACK_IMPORTED_MODULE_1__.allTravelers, // Pass the variable directly
            _apiCall__WEBPACK_IMPORTED_MODULE_1__.allTrips, // Pass the variable directly
            _apiCall__WEBPACK_IMPORTED_MODULE_1__.allDestinations // Pass the variable directly
          );

  
              //USER NAME
            (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.updateUserName)(currentTravelerData.traveler);

            //PENDING TRIPS
            const pendingTripImageURLs = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.getImageURLsOfPendingTrips)(currentTravelerData); 
            (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.updatePendingTrips)(pendingTripImageURLs)

            //PAST TRIPS
            const pastTripImageURLs = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.getImageURLsOfPastTrips)(currentTravelerData);      
            (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.updatePastTrips)(pastTripImageURLs);

            //FUTURE TRIPS
            const futureTripImageURLs = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.getImageURLsOfFutureTrips)(currentTravelerData);
            (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.updateFutureTrips)(futureTripImageURLs);


            //DROP DOWN
            (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.updateDestinationDropdown)(_apiCall__WEBPACK_IMPORTED_MODULE_1__.allDestinations)

            //TOTAL SPENT 4 YEARS
            const totalSpent = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.calculateTotalSpentOnTrips)(currentTravelerData);
            
            (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.updateTotalAmountSpent)(totalSpent)

        });
      } else {
        // Invalid login, show an error message or alert
        alert('Invalid credentials. Please try again.');
      }
    } else {
      // Invalid username format, show an error message or alert
      alert('Invalid username format. Please use "traveler" followed by a number between 1 and 50.');
    }
  });
  


/// CALCULATING SINGLE TRIP COST///
_domUpdates__WEBPACK_IMPORTED_MODULE_3__.calculateCost.addEventListener('click', () => {
 
  const duration = parseInt(_domUpdates__WEBPACK_IMPORTED_MODULE_3__.durationInput.value);
  const travelers = parseInt(_domUpdates__WEBPACK_IMPORTED_MODULE_3__.travelersInput.value);
  const selectedDestinationIndex = parseInt(_domUpdates__WEBPACK_IMPORTED_MODULE_3__.tripSelectionIndex.value);

  // DESTINATION INDEX
  const selectedDestination = _apiCall__WEBPACK_IMPORTED_MODULE_1__.allDestinations[selectedDestinationIndex];

  // VALID INPUT
  if (isNaN(duration) || isNaN(travelers) || isNaN(selectedDestinationIndex)) {
    // Display an error message
    alert('Please fill in all the required fields with valid values.');
    return; 
  }

  // TRIP COST
  const totalCost = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.calculateTripCost)(_domUpdates__WEBPACK_IMPORTED_MODULE_3__.dateInput, duration, travelers, selectedDestination);

  

  // DOM UPDATE
  (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.updateCostOfSingleTrip)(totalCost);
});




/////ADDING PENDING TRIPS//////////////

_domUpdates__WEBPACK_IMPORTED_MODULE_3__.submitTripButton.addEventListener('click', () => {
  
  const dateInputValue = _domUpdates__WEBPACK_IMPORTED_MODULE_3__.dateInput.value; 
  const duration = parseInt(_domUpdates__WEBPACK_IMPORTED_MODULE_3__.durationInput.value);
  const travelers = parseInt(_domUpdates__WEBPACK_IMPORTED_MODULE_3__.travelersInput.value);
  const selectedDestinationIndex = parseInt(_domUpdates__WEBPACK_IMPORTED_MODULE_3__.tripSelectionIndex.value);

  // IF VALID
  if (
    dateInputValue === '' ||
    isNaN(duration) ||
    isNaN(travelers) ||
    isNaN(selectedDestinationIndex)
  ) {
   
    alert('Please fill in all the required fields with valid values.');
    return; 
  }

  const tripDate = new Date(dateInputValue);

  const currentDate = new Date();

  if (tripDate <= currentDate) {
    alert('Trip date must be greater than the current date.');
    return;
  }

  // ALL TRIPS + 1
  const newTripId = _apiCall__WEBPACK_IMPORTED_MODULE_1__.allTrips.length + 1;

  // FORMATE DATE
  const date = new Date(dateInputValue);
  const formattedDate = `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

  // NEW TRIP OBJECT
  const newTrip = {
    id: newTripId, 
    userID: currentTravelerData.traveler.id, 
    destinationID: _apiCall__WEBPACK_IMPORTED_MODULE_1__.allDestinations[selectedDestinationIndex].id, 
    travelers: travelers,
    date: formattedDate,
    duration: duration,
    status: "pending", 
    suggestedActivities: []
  };

  // POST
  (0,_apiCall__WEBPACK_IMPORTED_MODULE_1__.postTripData)(newTrip)
    .then(() => {
      
      // GET UPDATED 
      (0,_apiCall__WEBPACK_IMPORTED_MODULE_1__.fetchAllTheData)()
        .then(() => {
          currentTravelerData = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.addDataToCurrentTraveler)(
            currentTravelerData.traveler.id, 
            _apiCall__WEBPACK_IMPORTED_MODULE_1__.allTravelers, 
            _apiCall__WEBPACK_IMPORTED_MODULE_1__.allTrips, 
            _apiCall__WEBPACK_IMPORTED_MODULE_1__.allDestinations 
          );

          //UPDATE DOM
          const pendingTripImageURLs = (0,_scriptDefinitions__WEBPACK_IMPORTED_MODULE_2__.getImageURLsOfPendingTrips)(currentTravelerData);
          (0,_domUpdates__WEBPACK_IMPORTED_MODULE_3__.updatePendingTrips)(pendingTripImageURLs);

        })
        .catch(error => {
       
          console.error('Fetch Data Error:', error);
        });
    })
    .catch(error => {
     
      console.error('POST Error:', error);
    });
});





//for the package.json
// "git+https://github.com/turingschool-examples/webpack-starter-kit.git",












})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map