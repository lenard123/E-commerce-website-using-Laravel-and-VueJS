webpackJsonp([43],{

/***/ 44:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(81)
/* template */
var __vue_template__ = __webpack_require__(82)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\category\\add.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-03779bc7", Component.options)
  } else {
    hotAPI.reload("data-v-03779bc7", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 81:
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
			baseURL: data.getBaseURL(),
			submitButton: { loading: false, message: 'Submit' }
		};
	}),

	created: function created() {
		$('#catForm').ajaxForm();
	},


	methods: {
		submit: function submit() {
			if (this.submitButton.loading) return;
			var vm = this;
			var notif = util.notify(util.getProgressbarMessage('Adding category', 0), 'loading');
			this.startLoading();
			$('#catForm').ajaxSubmit({
				success: function success(response, status, xhr, $form) {
					vm.stopLoading();
					if (util.showResult(response, 'ajax')) {
						data.setCategories([]);
						vm.$router.push('/category');
					}
				},

				error: function error(response) {
					util.showResult(response, 'ajax');
					vm.stopLoading();
				},

				uploadProgress: function uploadProgress(a, b, c, d) {
					notif.update('message', util.getProgressbarMessage('Adding category', d));
				}

			});
		},

		/**
   * Start Loading
   *
   */
		startLoading: function startLoading() {
			this.submitButton = {
				loading: true,
				message: 'Loading'
			};
		},

		/**
   * Stop Loading
   *
   */
		stopLoading: function stopLoading() {
			this.submitButton = {
				loading: false,
				message: 'Submit'
			};
		}
	}
});

/***/ }),

/***/ 82:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "panel panel-default col-md-8 col-md-offset-2" },
    [
      _c("div", { staticClass: "panel-body" }, [
        _c(
          "form",
          {
            staticClass: "row",
            attrs: {
              action: _vm.baseURL + "api/v1/category",
              id: "catForm",
              enctype: "multipart/form-data",
              method: "POST"
            },
            on: {
              submit: function($event) {
                $event.preventDefault()
                _vm.submit()
              }
            }
          },
          [
            _c(
              "div",
              { staticClass: "col-md-4" },
              [
                _c("uploader", {
                  attrs: {
                    fileId: "categoryImageFile",
                    fileName: "category_image",
                    imageId: "selectedCategoryImage"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "col-md-8" }, [
              _vm._m(0),
              _vm._v(" "),
              _vm._m(1),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "form-group pull-right" },
                [
                  _c(
                    "button",
                    {
                      staticClass: "btn btn-primary",
                      class: { disabled: _vm.submitButton.loading },
                      attrs: { type: "submit" }
                    },
                    [_vm._v(_vm._s(_vm.submitButton.message))]
                  ),
                  _vm._v(" "),
                  _c(
                    "router-link",
                    {
                      staticClass: "btn btn-default",
                      attrs: { tag: "button", to: "/category" }
                    },
                    [_vm._v("Back")]
                  )
                ],
                1
              )
            ])
          ]
        )
      ])
    ]
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", [_vm._v("Category Name")]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "text", name: "category_name", required: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", [_vm._v("Category Description")]),
      _vm._v(" "),
      _c("textarea", {
        staticClass: "form-control",
        staticStyle: { height: "100%" },
        attrs: { name: "category_description" }
      })
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-03779bc7", module.exports)
  }
}

/***/ })

});