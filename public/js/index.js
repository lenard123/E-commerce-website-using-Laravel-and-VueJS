/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	var parentJsonpFunction = window["webpackJsonp"];
/******/ 	window["webpackJsonp"] = function webpackJsonpCallback(chunkIds, moreModules, executeModules) {
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [], result;
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(chunkIds, moreModules, executeModules);
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 	};
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// objects to store loaded and loading chunks
/******/ 	var installedChunks = {
/******/ 		29: 0
/******/ 	};
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
/******/ 	// This file contains only the entry chunk.
/******/ 	// The chunk loading function for additional chunks
/******/ 	__webpack_require__.e = function requireEnsure(chunkId) {
/******/ 		var installedChunkData = installedChunks[chunkId];
/******/ 		if(installedChunkData === 0) {
/******/ 			return new Promise(function(resolve) { resolve(); });
/******/ 		}
/******/
/******/ 		// a Promise means "currently loading".
/******/ 		if(installedChunkData) {
/******/ 			return installedChunkData[2];
/******/ 		}
/******/
/******/ 		// setup Promise in chunk cache
/******/ 		var promise = new Promise(function(resolve, reject) {
/******/ 			installedChunkData = installedChunks[chunkId] = [resolve, reject];
/******/ 		});
/******/ 		installedChunkData[2] = promise;
/******/
/******/ 		// start chunk loading
/******/ 		var head = document.getElementsByTagName('head')[0];
/******/ 		var script = document.createElement('script');
/******/ 		script.type = "text/javascript";
/******/ 		script.charset = 'utf-8';
/******/ 		script.async = true;
/******/ 		script.timeout = 120000;
/******/
/******/ 		if (__webpack_require__.nc) {
/******/ 			script.setAttribute("nonce", __webpack_require__.nc);
/******/ 		}
/******/ 		script.src = __webpack_require__.p + "" + ({}[chunkId]||chunkId) + ".js";
/******/ 		var timeout = setTimeout(onScriptComplete, 120000);
/******/ 		script.onerror = script.onload = onScriptComplete;
/******/ 		function onScriptComplete() {
/******/ 			// avoid mem leaks in IE.
/******/ 			script.onerror = script.onload = null;
/******/ 			clearTimeout(timeout);
/******/ 			var chunk = installedChunks[chunkId];
/******/ 			if(chunk !== 0) {
/******/ 				if(chunk) {
/******/ 					chunk[1](new Error('Loading chunk ' + chunkId + ' failed.'));
/******/ 				}
/******/ 				installedChunks[chunkId] = undefined;
/******/ 			}
/******/ 		};
/******/ 		head.appendChild(script);
/******/
/******/ 		return promise;
/******/ 	};
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
/******/ 	// on error function for async loading
/******/ 	__webpack_require__.oe = function(err) { console.error(err); throw err; };
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 31);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file.
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier /* server only */
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = injectStyles
  }

  if (hook) {
    var functional = options.functional
    var existing = functional
      ? options.render
      : options.beforeCreate

    if (!functional) {
      // inject component registration as beforeCreate hook
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    } else {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return existing(h, context)
      }
    }
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 1 */
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
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(16)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

//Global Components
Vue.component('modal', __webpack_require__(4));
Vue.component('modal-header', __webpack_require__(7));
Vue.component('modal-body', __webpack_require__(9));
Vue.component('modal-footer', __webpack_require__(11));

Vue.component('uploader', __webpack_require__(13));
Vue.component('order', __webpack_require__(19));

Vue.component('category-card', __webpack_require__(22));
Vue.component('product-card', __webpack_require__(25));
Vue.component('cart-card', __webpack_require__(28));

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(5)
/* template */
var __vue_template__ = __webpack_require__(6)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\mycomponents\\modal\\modal.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-87ecc00a", Component.options)
  } else {
    hotAPI.reload("data-v-87ecc00a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
    props: ['id']
});

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "modal fade", attrs: { id: _vm.id, role: "dialog" } },
    [
      _c("div", { staticClass: "modal-dialog" }, [
        _c("div", { staticClass: "modal-content" }, [_vm._t("default")], 2)
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-87ecc00a", module.exports)
  }
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(8)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\mycomponents\\modal\\header.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d86cc7a2", Component.options)
  } else {
    hotAPI.reload("data-v-d86cc7a2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "modal-header" }, [
    _c(
      "button",
      {
        staticClass: "close",
        attrs: { type: "button", "data-dismiss": "modal" }
      },
      [_vm._v("×")]
    ),
    _vm._v(" "),
    _c("h4", [_vm._t("default")], 2)
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d86cc7a2", module.exports)
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(10)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\mycomponents\\modal\\body.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-9cb98978", Component.options)
  } else {
    hotAPI.reload("data-v-9cb98978", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "modal-body" }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-9cb98978", module.exports)
  }
}

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = null
/* template */
var __vue_template__ = __webpack_require__(12)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\mycomponents\\modal\\footer.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7297383d", Component.options)
  } else {
    hotAPI.reload("data-v-7297383d", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "modal-footer" }, [_vm._t("default")], 2)
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7297383d", module.exports)
  }
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
function injectStyle (ssrContext) {
  if (disposed) return
  __webpack_require__(14)
}
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(17)
/* template */
var __vue_template__ = __webpack_require__(18)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\mycomponents\\uploader.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-485f7081", Component.options)
  } else {
    hotAPI.reload("data-v-485f7081", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(15);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3529ef2a", content, false, {});
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-485f7081\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./uploader.vue", function() {
     var newContent = require("!!../../../../../node_modules/css-loader/index.js!../../../../../node_modules/vue-loader/lib/style-compiler/index.js?{\"vue\":true,\"id\":\"data-v-485f7081\",\"scoped\":false,\"hasInlineConfig\":true}!../../../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./uploader.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(1)(false);
// imports


// module
exports.push([module.i, "\n.imgContainer {\r\n\tposition: relative; \r\n\theight: 200px; \r\n\twidth: 200px;\n}\n.file {\r\n\tposition: absolute; \r\n\theight: 100%; \r\n\twidth: 100%; \r\n\topacity: 0;\n}\n.imgUpload {\r\n\tbackground-color: #ffffff;\r\n\tborder:2px black solid;\n}\n.imgText {\r\n\tposition: absolute; \r\n\tleft: 0; \r\n\ttop: 45%; \r\n\twidth: 100%; \r\n\ttext-align: center;\n}\r\n", ""]);

// exports


/***/ }),
/* 16 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		fileId: { default: 'fileId' },
		fileName: { default: 'file_name' },
		imageId: { default: 'imageId' },
		imageSrc: { default: '#' }
	},
	methods: {
		/** 
   * Print the selected file into image
   * @param String fileID, String imageId
   * 
   */
		readFile: function readFile(fileId, imageId) {
			util.readFile('#' + fileId, '#' + imageId);
		}
	}
});

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("center", [
    _c("div", { staticClass: "imgContainer" }, [
      _c("input", {
        staticClass: "file",
        attrs: { type: "file", id: _vm.fileId, name: _vm.fileName },
        on: {
          change: function($event) {
            _vm.readFile(_vm.fileId, _vm.imageId)
          }
        }
      }),
      _vm._v(" "),
      _c("img", {
        staticClass: "imgUpload img-rounded",
        attrs: {
          src: _vm.imageSrc,
          height: "100%",
          width: "100%",
          id: _vm.imageId
        }
      }),
      _vm._v(" "),
      _c("span", { staticClass: "imgText" }, [_vm._v("Select Image")])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-485f7081", module.exports)
  }
}

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(20)
/* template */
var __vue_template__ = __webpack_require__(21)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\mycomponents\\order.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6f61e64b", Component.options)
  } else {
    hotAPI.reload("data-v-6f61e64b", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		name: { default: '' },
		orders: { default: [] },
		detailLink: { default: '/order-details' }
	},

	methods: {
		toDate: function toDate(date) {
			//return (new Date(date)).toDateString();
			return util.toDate(date);
		},

		toCurrency: function toCurrency(x) {
			return util.toCurrency(x);
		}
	}
});

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm.orders.length > 0
    ? _c("div", { staticClass: "col-md-9" }, [
        _c("div", { staticClass: "panel panel-default" }, [
          _c("div", { staticClass: "panel-body" }, [
            _c("h4", [_vm._v(_vm._s(_vm.name))]),
            _vm._v(" "),
            _c("div", { staticClass: "table-responsive" }, [
              _c("table", { staticClass: "table table-hover" }, [
                _vm._m(0),
                _vm._v(" "),
                _c(
                  "tbody",
                  _vm._l(_vm.orders, function(order) {
                    return _c("tr", [
                      _c("td", [_vm._v(_vm._s(_vm.toDate(order.created_at)))]),
                      _vm._v(" "),
                      _c("td", [_vm._v(_vm._s(order.order_quantity))]),
                      _vm._v(" "),
                      _c("td", [
                        _vm._v(_vm._s(_vm.toCurrency(order.order_price)))
                      ]),
                      _vm._v(" "),
                      _c("td", [
                        _c(
                          "span",
                          { staticClass: "pull-right" },
                          [
                            _c(
                              "router-link",
                              {
                                attrs: {
                                  to: {
                                    path: _vm.detailLink,
                                    query: { id: order.id }
                                  }
                                }
                              },
                              [_vm._v("View")]
                            )
                          ],
                          1
                        )
                      ])
                    ])
                  })
                )
              ])
            ])
          ])
        ])
      ])
    : _vm._e()
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("thead", [
      _c("tr", [
        _c("th", [_vm._v("Order date")]),
        _vm._v(" "),
        _c("th", [_vm._v("Items")]),
        _vm._v(" "),
        _c("th", [_vm._v("Price")]),
        _vm._v(" "),
        _c("th")
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6f61e64b", module.exports)
  }
}

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(23)
/* template */
var __vue_template__ = __webpack_require__(24)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\mycomponents\\cards\\category.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-224386aa", Component.options)
  } else {
    hotAPI.reload("data-v-224386aa", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	props: {
		src: { default: data.getStorageURL() + 'images/category/default.jpg' },
		name: { default: 'Unknown category' },
		id: { default: '' }
	},

	created: function created() {
		this.$nextTick(function () {
			var description = $('#' + this.id + ' #description').text();
			$('#' + this.id).popover({
				title: 'Category description',
				content: description,
				trigger: 'hover' });
		});
	},


	computed: {
		defaultId: function defaultId() {
			return 'cat' + Math.floor(Math.random() * 10000);
		},
		minifyName: function minifyName() {
			return util.minify(util.unescapeHTML(this.name, 16));
		}
	}
});

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "card thumbnail", attrs: { id: _vm.id } }, [
    _c("img", {
      staticStyle: { width: "250px", height: "250px" },
      attrs: { src: _vm.src, width: "250px", height: "250px", alt: _vm.name }
    }),
    _vm._v(" "),
    _c("div", { staticStyle: { "padding-left": "15px" } }, [
      _c("h3", { staticStyle: { overflow: "hidden" } }, [
        _c("b", [_vm._v(_vm._s(_vm.minifyName))])
      ])
    ]),
    _vm._v(" "),
    _c(
      "button",
      {
        staticClass: "btn btn-info card-btn",
        on: {
          click: function($event) {
            _vm.$router.push("/category/" + _vm.id)
          }
        }
      },
      [_vm._v("View Products")]
    ),
    _vm._v(" "),
    _c(
      "div",
      { staticStyle: { display: "none" }, attrs: { id: "description" } },
      [_vm._t("default")],
      2
    )
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-224386aa", module.exports)
  }
}

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(26)
/* template */
var __vue_template__ = __webpack_require__(27)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\mycomponents\\cards\\product.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3dc2d11a", Component.options)
  } else {
    hotAPI.reload("data-v-3dc2d11a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({

	data: function (_data) {
		function data() {
			return _data.apply(this, arguments);
		}

		data.toString = function () {
			return _data.toString();
		};

		return data;
	}(function () {
		return {
			storageURL: data.getStorageURL(),
			time: 0,
			lastClick: 0
		};
	}),

	props: {
		value: {
			default: {
				id: '',
				product_name: '',
				product_image: '',
				product_price: '',
				product_description: '',
				product_quantity: 0
			}
		}
	},

	methods: {
		addToCart: function addToCart() {
			if (!this.checkLogin()) return;
			if (this.value.product_quantity < 1) return;
			this.value.product_quantity--;
			this.cart_quantity++;
			this.add();
		},

		subtractToCart: function subtractToCart() {
			if (this.cart_quantity < 0) this.cart_quantity = 0;
			this.value.product_quantity++;
			this.cart_quantity--;
			this.add();
		},

		add: function add() {
			var vm = this;
			if (this.validate()) return;
			this.lastClick = this.time;

			setTimeout(function () {
				if (vm.time - vm.lastClick == 3) {
					vm.updateCart(vm.value.id, vm.cart_quantity);
				}
			}, 3000);
		},

		validate: function validate() {
			var preventMulticlick = this.time - this.lastClick < 3 && this.lastClick != 0;
			return preventMulticlick;
		},

		checkLogin: function checkLogin() {
			if (data.getStatus().LOG != 'IN') util.showModal('#loginModal');
			return data.getStatus().LOG == 'IN';
		},

		updateCart: function updateCart(product_id, cart_quantity) {
			var url = data.getBaseURL() + 'api/v1/user/cart/add';
			var param = 'id=' + product_id + '&quantity=' + cart_quantity;
			axios.post(url, param).then(function (response) {
				//console.log(response);		
			}).catch(function (error) {
				util.notify('An error occured', 'error');
				util.log(error);
			});
		},

		toCurrency: function toCurrency(x) {
			return util.toCurrency(x);
		},

		minify: function minify(x) {
			return util.minify(x, 15);
		}
	},

	created: function created() {
		this.$nextTick(function () {
			$('#' + this.value.id).popover({
				title: 'Product description',
				content: this.value.product_description,
				trigger: 'hover'
			});
		});

		var vm = this;
		setInterval(function () {
			vm.time++;
		}, 1000);
	},

	computed: {
		carts: function carts() {
			return data.getStatus().CARTS;
		},

		cart: function cart() {
			for (var i in this.carts) {
				if (this.value.id == this.carts[i].product_id) return this.carts[i];
			}return {};
		},

		status: function status() {
			return data.getStatus();
		},

		cart_quantity: {

			get: function get() {
				return this.cart.cart_quantity ? this.cart.cart_quantity : 0;
			},

			set: function set(val) {
				var vm = this;
				for (var i in this.carts) {
					if (this.carts[i].product_id == this.value.id) {
						data.status.CARTS[i].cart_quantity = val;
						return;
					}
				}data.status.CARTS.push({
					product_id: vm.value.id,
					customer_id: data.getStatus().USERID,
					cart_quantity: val,
					product: vm.value
				});
			}
		}
	}
});

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "card", attrs: { id: _vm.value.id } }, [
    _c("img", {
      staticStyle: { height: "200px", width: "250px" },
      attrs: {
        src: _vm.storageURL + _vm.value.product_image,
        alt: _vm.value.product_name
      }
    }),
    _vm._v(" "),
    _c("div", { staticStyle: { "padding-left": "15px" } }, [
      _c("h3", { staticStyle: { overflow: "hidden" } }, [
        _c("b", [_vm._v(_vm._s(_vm.minify(_vm.value.product_name)))])
      ]),
      _vm._v(" "),
      _c("h5", [
        _vm._v("Price : "),
        _c("span", { staticStyle: { color: "lime" } }, [
          _vm._v(_vm._s(_vm.toCurrency(_vm.value.product_price)))
        ])
      ]),
      _vm._v(" "),
      _c("h5", [_vm._v("Stocks : " + _vm._s(_vm.value.product_quantity))])
    ]),
    _vm._v(" "),
    _vm.cart_quantity == 0
      ? _c(
          "div",
          {
            staticClass: "input-group card-btn",
            on: {
              click: function($event) {
                _vm.addToCart()
              }
            }
          },
          [
            _c("button", { staticClass: "btn btn-info card-btn" }, [
              _vm._v("Add to Card")
            ])
          ]
        )
      : _vm._e(),
    _vm._v(" "),
    _vm.cart_quantity > 0
      ? _c("div", [
          _c("div", { staticClass: "input-group" }, [
            _c("div", { staticClass: "input-group-btn" }, [
              _c(
                "span",
                {
                  staticClass: "btn btn-info",
                  on: {
                    click: function($event) {
                      _vm.subtractToCart()
                    }
                  }
                },
                [_c("i", { staticClass: "fa fa-minus" })]
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "form-control",
                staticStyle: { "text-align": "center" }
              },
              [
                _c("b", [
                  _c("span", [_vm._v(_vm._s(_vm.cart_quantity))]),
                  _vm._v(" in cart")
                ])
              ]
            ),
            _vm._v(" "),
            _c("div", { staticClass: "input-group-btn" }, [
              _c(
                "span",
                {
                  staticClass: "btn btn-info",
                  class: { disabled: _vm.value.product_quantity == 0 },
                  on: {
                    click: function($event) {
                      _vm.addToCart()
                    }
                  }
                },
                [_c("i", { staticClass: "fa fa-plus" })]
              )
            ])
          ])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-3dc2d11a", module.exports)
  }
}

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(29)
/* template */
var __vue_template__ = __webpack_require__(30)
/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = null
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null
var Component = normalizeComponent(
  __vue_script__,
  __vue_template__,
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "resources\\assets\\js\\components\\mycomponents\\cards\\cart.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-471d8dcc", Component.options)
  } else {
    hotAPI.reload("data-v-471d8dcc", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
	props: ['value', 'index'],
	data: function (_data) {
		function data() {
			return _data.apply(this, arguments);
		}

		data.toString = function () {
			return _data.toString();
		};

		return data;
	}(function () {
		return {
			storageURL: data.getStorageURL(),
			time: 0,
			lastClick: 0,
			quantity: this.value.cart_quantity
		};
	}),

	created: function created() {
		var vm = this;
		setInterval(function () {
			vm.time++;
		}, 1000);
	},

	methods: {
		addToCart: function addToCart(index) {
			var cart = this.carts[index];
			if (cart.product.product_quantity < 1) {
				util.notify('Out of stocks').update('type', 'warning');
				return;
			}
			--cart.product.product_quantity;
			var quantity = ++cart.cart_quantity;

			this.add(this.value.product_id, quantity);
		},

		subtractToCart: function subtractToCart(index) {
			var cart = this.carts[index];
			++cart.product.product_quantity;

			var quantity = --cart.cart_quantity;
			var id = this.value.product_id;

			if (quantity < 1) this.carts.splice(index, 1);

			this.add(id, quantity);
		},

		add: function add(id, quantity) {
			var vm = this;
			vm.quantity = quantity;
			if (this.validate()) return;
			this.lastClick = this.time;
			setTimeout(function () {
				if (vm.time - vm.lastClick == 3) {
					vm.updateCart(id, vm.quantity);
				}
			}, 3000);
		},

		updateCart: function updateCart(product_id, cart_quantity) {
			var url = data.getBaseURL() + 'api/v1/user/cart/add';
			var param = 'id=' + product_id + '&quantity=' + cart_quantity;
			axios.post(url, param).then(function (response) {
				util.log(response);
			}).catch(function (error) {
				util.notify('An error occured', 'error');
				util.log(error);
			});
		},

		validate: function validate() {
			var checkLogin = !this.checkLogin();
			var preventMulticlick = this.time - this.lastClick < 3 && this.lastClick != 0;
			return checkLogin || preventMulticlick;
		},

		checkLogin: function checkLogin() {
			if (data.getStatus().LOG != 'IN') util.showModal('#loginModal');
			return data.getStatus().LOG == 'IN';
		},

		toCurrency: function toCurrency(x) {
			return util.toCurrency(x);
		}

	},

	computed: {
		carts: {
			get: function get() {
				return data.getStatus().CARTS;
			},

			set: function set(val) {
				data.status.CARTS = val;
			}
		}
	}
});

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("tr", [
    _c("td", [
      _c("img", {
        staticClass: "thumbnail",
        attrs: {
          src: _vm.storageURL + _vm.value.product.product_image,
          alt: _vm.value.product.product_name,
          height: "60px",
          width: "60px"
        }
      })
    ]),
    _vm._v(" "),
    _c("td", [_vm._v(_vm._s(_vm.value.product.product_name))]),
    _vm._v(" "),
    _c(
      "td",
      [
        _c("center", [
          _c(
            "div",
            {
              staticClass: "input-group",
              staticStyle: { "max-width": "200px" }
            },
            [
              _c("div", { staticClass: "input-group-btn" }, [
                _c(
                  "span",
                  {
                    staticClass: "btn btn-info",
                    on: {
                      click: function($event) {
                        _vm.subtractToCart(_vm.index)
                      }
                    }
                  },
                  [_c("i", { staticClass: "fa fa-minus" })]
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                {
                  staticStyle: { "text-align": "center", padding: "6px 12px" }
                },
                [
                  _c("b", [
                    _c("span", [_vm._v(_vm._s(_vm.value.cart_quantity))]),
                    _vm._v(" in cart")
                  ])
                ]
              ),
              _vm._v(" "),
              _c("div", { staticClass: "input-group-btn" }, [
                _c(
                  "span",
                  {
                    staticClass: "btn btn-info",
                    on: {
                      click: function($event) {
                        _vm.addToCart(_vm.index)
                      }
                    }
                  },
                  [_c("i", { staticClass: "fa fa-plus" })]
                )
              ])
            ]
          )
        ])
      ],
      1
    ),
    _vm._v(" "),
    _c("td", [
      _c("span", { staticClass: "pull-right" }, [
        _vm._v(
          _vm._s(
            _vm.toCurrency(
              _vm.value.cart_quantity * _vm.value.product.product_price
            )
          )
        )
      ])
    ])
  ])
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-471d8dcc", module.exports)
  }
}

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(32);


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

var home = function home(resolve) {
	return __webpack_require__.e/* require */(0).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(37)]; ((resolve).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
};
var product = function product(resolve) {
	return __webpack_require__.e/* require */(1).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(38)]; ((resolve).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
};
var cart = function cart(resolve) {
	return __webpack_require__.e/* require */(5).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(39)]; ((resolve).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
};
var checkout = function checkout(resolve) {
	return __webpack_require__.e/* require */(4).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(40)]; ((resolve).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
};
var order = function order(resolve) {
	return __webpack_require__.e/* require */(2).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(41)]; ((resolve).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
};
var order_details = function order_details(resolve) {
	return __webpack_require__.e/* require */(3).then(function() { var __WEBPACK_AMD_REQUIRE_ARRAY__ = [__webpack_require__(42)]; ((resolve).apply(null, __WEBPACK_AMD_REQUIRE_ARRAY__));}.bind(this)).catch(__webpack_require__.oe);
};

__webpack_require__(3);

var redir = {
	template: '<div>{{$router.push(`/category/${$route.params.category_id}/subcategory/0`)}}</div>'
};

var routes = [{ path: '/', component: home }, { path: '/category/:category_id', component: redir }, { path: '/check-out', component: checkout }, { path: '/cart', component: cart }, { path: '/order', component: order }, { path: '/order-details', component: order_details }, {
	path: '/category/:category_id/subcategory/:subcategory_id',
	component: product
}];

var router = new VueRouter({
	routes: routes
});

var app = new Vue({
	router: router,

	data: {
		baseURL: data.getBaseURL(),
		storageURL: data.getStorageURL()
	},

	created: function created() {
		this.refreshCategories();
	},


	methods: {
		refreshCategories: function refreshCategories() {
			var vm = this;
			util.notify('Loading please wait...', 'loading');
			axios.get(this.baseURL + 'api/v1/user/category').then(function (response) {
				$.notifyClose();
				data.setCategories(util.getResponse(response));
			}).catch(function (error) {
				util.showResult(error);
			});
		},

		logout: function logout() {
			util.notify('Logging out', 'loading');
			axios.get(this.baseURL + 'api/v1/user/customer/logout').then(function (response) {
				response = util.getResponse(response);
				if (response.status == 'success') util.notify('Logout successfully', 'success');else util.notify('An error occured', 'error');
			}).catch(function (response) {
				util.notify('An error occured', 'error');
			});
		}
	},

	computed: {
		categories: function categories() {
			return data.getCategories();
		},

		status: function status() {
			return data.getStatus();
		},

		cart_quantity: function cart_quantity() {
			var quantity = 0;
			var carts = data.getStatus().CARTS;
			for (var i in carts) {
				quantity += carts[i].cart_quantity;
			}return quantity;
		}
	}

}).$mount('#index_app');

/***/ })
/******/ ]);