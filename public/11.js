webpackJsonp([11],{

/***/ 54:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(98)
/* template */
var __vue_template__ = __webpack_require__(99)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\product\\add.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2cdc2d40", Component.options)
  } else {
    hotAPI.reload("data-v-2cdc2d40", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 98:
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
			quantity: 1,
			baseURL: data.getBaseURL(),
			submitButton: {
				loading: false,
				message: 'Submit'
			}
		};
	}),

	methods: {
		back: function back() {
			this.$router.push('/products/' + this.category_id + '/' + this.subcategory_id);
		},

		/**
   * Start Loading
   * 
   */
		startLoading: function startLoading() {
			this.submitButton = {
				message: 'Loading',
				loading: true
			};
		},

		/**
   * Stop Loading
   *
   */
		stopLoading: function stopLoading() {
			$.notifyClose();
			this.submitButton = {
				message: 'Submit',
				loading: false
			};
		},

		/**
   * Submit the form and add product
   *
   */
		submit: function submit() {
			var vm = this;
			if (vm.submitButton.loading) return;
			this.startLoading();
			var notif = util.notify(util.getProgressbarMessage('Adding product', 0), 'loading');
			$('#productForm').ajaxSubmit({
				success: function success(response, a, b, c) {
					if (util.showResult(response, 'ajax')) vm.back();
					vm.stopLoading();
				},

				error: function error(response) {
					vm.stopLoading();
					util.showResult(response, 'ajax');
				},

				uploadProgress: function uploadProgress(a, b, c, percentCompleted) {
					notif.update('message', util.getProgressbarMessage('Adding product', percentCompleted));
				}
			});
		},

		/**
   * Unescape HTML
   * @param "String" html
   * @return "String" unescaped html
   */
		minify: function minify(html) {
			return util.minify(util.unescapeHTML(html), 20);
		}
	},

	computed: {
		subcategories: function subcategories() {
			var x = data.subcategories;
			var y = [];
			for (var i in x) {
				if (x[i].category_id == this.category_id) y.push(x[i]);
			}return y;
		},

		category_id: function category_id() {
			return this.$route.params.category_id;
		},

		subcategory_id: {
			get: function get() {
				return this.$route.params.subcategory_id;
			},
			set: function set(value) {
				this.$router.push({ params: { subcategory_id: value } });
			}
		},

		product_quantity: {
			get: function get() {
				return this.quantity;
			},
			set: function set(value) {
				if (value < 1) this.quantity = 0;else this.quantity = value;
			}
		}
	}
});

/***/ }),

/***/ 99:
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
              action: _vm.baseURL + "api/v1/product",
              method: "POST",
              id: "productForm",
              enctype: "mutlipart/formdata"
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
              [_c("uploader", { attrs: { fileName: "product_image" } })],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "col-md-8" }, [
              _c("div", { staticClass: "form-group" }, [
                _c("label", [_vm._v("Select Subcategory")]),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.subcategory_id,
                        expression: "subcategory_id"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { name: "subcategory_id", required: "" },
                    on: {
                      change: function($event) {
                        var $$selectedVal = Array.prototype.filter
                          .call($event.target.options, function(o) {
                            return o.selected
                          })
                          .map(function(o) {
                            var val = "_value" in o ? o._value : o.value
                            return val
                          })
                        _vm.subcategory_id = $event.target.multiple
                          ? $$selectedVal
                          : $$selectedVal[0]
                      }
                    }
                  },
                  [
                    _c("option", { attrs: { value: "0", disabled: "" } }, [
                      _vm._v("-- No Subcategory Selected --")
                    ]),
                    _vm._v(" "),
                    _vm._l(_vm.subcategories, function(subcategory) {
                      return _c(
                        "option",
                        { domProps: { value: subcategory.id } },
                        [
                          _vm._v(
                            "\r\n\t\t\t\t\t\t\t" +
                              _vm._s(_vm.minify(subcategory.subcategory_name)) +
                              "\r\n\t\t\t\t\t\t"
                          )
                        ]
                      )
                    })
                  ],
                  2
                )
              ]),
              _vm._v(" "),
              _vm._m(0),
              _vm._v(" "),
              _vm._m(1),
              _vm._v(" "),
              _vm._m(2),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", [_vm._v("Quantity")]),
                _vm._v(" "),
                _c("div", { staticClass: "input-group" }, [
                  _c("div", { staticClass: "input-group-btn" }, [
                    _c(
                      "span",
                      {
                        staticClass: "btn btn-info",
                        on: {
                          click: function($event) {
                            _vm.product_quantity--
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
                      _c("input", {
                        directives: [
                          {
                            name: "model",
                            rawName: "v-model",
                            value: _vm.product_quantity,
                            expression: "product_quantity"
                          }
                        ],
                        attrs: { type: "hidden", name: "product_quantity" },
                        domProps: { value: _vm.product_quantity },
                        on: {
                          input: function($event) {
                            if ($event.target.composing) {
                              return
                            }
                            _vm.product_quantity = $event.target.value
                          }
                        }
                      }),
                      _vm._v(" "),
                      _c("b", [
                        _c("span", [_vm._v(_vm._s(_vm.product_quantity))]),
                        _vm._v(" in stock")
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
                            _vm.product_quantity++
                          }
                        }
                      },
                      [_c("i", { staticClass: "fa fa-plus" })]
                    )
                  ])
                ])
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "pull-right" }, [
                _c("input", {
                  staticClass: "btn btn-primary",
                  class: { disabled: _vm.submitButton.loading },
                  attrs: { type: "submit" },
                  domProps: { value: _vm.submitButton.message }
                }),
                _vm._v(" "),
                _c("input", {
                  staticClass: "btn btn-default",
                  attrs: { type: "button", value: "Back" },
                  on: {
                    click: function($event) {
                      _vm.back()
                    }
                  }
                })
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
      _c("label", [_vm._v("Product Name")]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "text", name: "product_name", required: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", [_vm._v("Description")]),
      _vm._v(" "),
      _c("textarea", {
        staticClass: "form-control",
        attrs: { name: "product_description" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", [_vm._v("Price")]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "text", name: "product_price", required: "" }
      })
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-2cdc2d40", module.exports)
  }
}

/***/ })

});