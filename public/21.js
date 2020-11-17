webpackJsonp([21],{

/***/ 117:
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
			loading: {
				isLoading: false,
				value: 'Submit'
			}
		};
	}),

	methods: {
		submit: function submit() {
			if (!this.isPasswordMatch()) return util.notify('Password not match', 'error');else if (this.loading.isLoading) return;

			this.startLoading();

			var vm = this;
			var url = this.baseURL + 'api/v1/admin';
			var params = $('#adminForm').serialize();

			axios.post(url, params).then(function (response) {
				vm.stopLoading();
				if (util.showResult(response)) vm.back();
			}).catch(function (error) {
				vm.stopLoading();
				util.showResult(error);
			});
		},

		back: function back() {
			this.$router.push('/admin');
		},

		isPasswordMatch: function isPasswordMatch() {
			return $('[name="admin_pass1"]').val() == $('[name="admin_pass"]').val();
		},

		startLoading: function startLoading() {
			util.notify('Adding admin', 'loading');
			this.loading = {
				isLoading: true,
				value: '<i class="fa fa-refresh fa-spin"></i> Submit'
			};
		},

		stopLoading: function stopLoading() {
			$.notifyClose();
			this.loading = {
				isLoading: false,
				value: 'Submit'
			};
		}
	}

});

/***/ }),

/***/ 118:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "panel panel-default col-md-8 col-md-offset-2" },
    [
      _c("div", { staticClass: "panel panel-body" }, [
        _c(
          "form",
          {
            staticClass: "row",
            attrs: {
              method: "POST",
              action: _vm.baseURL + "api/v1/admin",
              enctype: "multipart/form-data",
              id: "adminForm"
            },
            on: {
              submit: function($event) {
                $event.preventDefault()
                return _vm.submit($event)
              }
            }
          },
          [
            _c(
              "div",
              { staticClass: "col-md-4" },
              [_c("uploader", { attrs: { "file-name": "admin_image" } })],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "col-md-8" }, [
              _vm._m(0),
              _vm._v(" "),
              _vm._m(1),
              _vm._v(" "),
              _vm._m(2),
              _vm._v(" "),
              _vm._m(3),
              _vm._v(" "),
              _vm._m(4),
              _vm._v(" "),
              _c("div", { staticClass: "form-group pull-right" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-info",
                    class: { disabled: _vm.loading.isLoading },
                    attrs: { type: "submit" },
                    domProps: { innerHTML: _vm._s(_vm.loading.value) }
                  },
                  [
                    _vm._v(
                      "\r\n\t\t\t\t\t\t" +
                        _vm._s(_vm.loading.value) +
                        "\r\n\t\t\t\t\t"
                    )
                  ]
                ),
                _vm._v(" "),
                _c(
                  "button",
                  {
                    staticClass: "btn btn-default",
                    attrs: { type: "button" },
                    on: { click: _vm.back }
                  },
                  [_vm._v("Cancel")]
                )
              ])
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
      _c("label", { attrs: { for: "admin_name" } }, [_vm._v("Name")]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "text", name: "admin_name", required: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", { attrs: { for: "admin_user" } }, [_vm._v("Username")]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "text", name: "admin_user", required: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", { attrs: { for: "admin_type" } }, [_vm._v("Type")]),
      _vm._v(" "),
      _c(
        "select",
        {
          staticClass: "form-control",
          attrs: { name: "admin_type", required: "" }
        },
        [
          _c("option", { attrs: { value: "0", selected: "" } }, [
            _vm._v("Co-admin")
          ]),
          _vm._v(" "),
          _c("option", { attrs: { value: "1" } }, [_vm._v("Admin")])
        ]
      )
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", { attrs: { for: "admin_pass" } }, [_vm._v("Password")]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "password", name: "admin_pass", required: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", { attrs: { for: "admin_pass1" } }, [
        _vm._v("Confirm Password")
      ]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "password", name: "admin_pass1", required: "" }
      })
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-6cc6d4c0", module.exports)
  }
}

/***/ }),

/***/ 65:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(117)
/* template */
var __vue_template__ = __webpack_require__(118)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\admin\\add.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-6cc6d4c0", Component.options)
  } else {
    hotAPI.reload("data-v-6cc6d4c0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});