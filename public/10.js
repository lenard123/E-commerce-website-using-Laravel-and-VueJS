webpackJsonp([10],{

/***/ 100:
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
			storageURL: data.getStorageURL(),
			product_id: this.$route.params.product_id,
			submitButton: {
				loading: false,
				message: 'Submit'
			}
		};
	}),

	created: function created() {
		if (!data.getProduct().id) this.getProduct(this.product_id);
	},


	methods: {
		/**
   * Get product
   * @param {Int} Product id
   *
   */
		getProduct: function getProduct(id) {
			var vm = this;
			util.notify('Getting information', 'loading');
			axios.get(this.baseURL + 'api/v1/product/' + id).then(function (response) {
				vm.stopLoading();
				data.setProduct(response.data);
			}).catch(function (response) {
				vm.stopLoading();
				util.showResult(response);
			});
		},

		/**
   * Start Loading
   * 
   */
		startLoading: function startLoading() {
			this.submitButton = {
				loading: true,
				message: 'Loading...'
			};
		},

		/**
   * Stop Loading
   *
   */
		stopLoading: function stopLoading() {
			$.notifyClose();
			this.submitButton = {
				loading: false,
				message: 'Submit'
			};
		},

		/**
   * Back to previous page
   * 
   */
		back: function back() {
			this.$router.push('/products/' + this.category_id + '/' + this.subcategory_id);
		},

		submit: function submit() {
			if (this.submitButton.loading) return;
			var vm = this;
			this.startLoading();
			var notif = util.notify('Updating categories', 'loading');
			$('#productForm').ajaxSubmit({
				success: function success(response, status, xhr, $form) {
					vm.stopLoading();
					if (util.showResult(response, 'ajax')) vm.back();
				},

				error: function error(response) {
					vm.stopLoading();
					util.showResult(response, 'ajax');
				},

				uploadProgress: function uploadProgress(a, b, c, d) {
					notif.update('message', util.getProgressbarMessage('Updating category', d));
				}
			});
		},

		/**
   * Unescape HTML
   * @param "String" html
   * @return "String" unescaped html
   */
		minify: function minify(html) {
			return util.unescapeHTML(html);
		}
	},

	computed: {
		category_id: function category_id() {
			return this.$route.params.category_id;
		},

		subcategory_id: function subcategory_id() {
			return this.$route.params.subcategory_id;
		},

		subcategories: function subcategories() {
			var subcategories = [];
			for (var i in data.getSubcategories()) {
				if (data.getSubcategories()[i]['category_id'] == this.category_id) subcategories.push(data.getSubcategories()[i]);
			}
			return subcategories;
		},

		product: function product() {
			return data.getProduct();
		},

		product_quantity: {
			get: function get() {
				return data.getProduct().product_quantity ? data.getProduct().product_quantity : 0;
			},
			set: function set(value) {
				if (value < 1) data.getProduct().product_quantity = 0;else data.getProduct().product_quantity = value;
			}
		},

		product_name: {
			get: function get() {
				return this.minify(this.product.product_name);
			},
			set: function set(val) {
				this.product.product_name = val;
			}
		}
	}
});

/***/ }),

/***/ 101:
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
              action: _vm.baseURL + "api/v1/product/" + _vm.product_id,
              method: "POST",
              id: "productForm",
              enctype: "mutlipart/form-data"
            },
            on: {
              submit: function($event) {
                $event.preventDefault()
                _vm.submit()
              }
            }
          },
          [
            _c("input", {
              attrs: { type: "hidden", name: "_method", value: "PUT" }
            }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-md-4" },
              [
                _c("uploader", {
                  attrs: {
                    fileName: "product_image",
                    imageSrc: _vm.storageURL + _vm.product.product_image
                  }
                })
              ],
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
                        value: _vm.product.subcategory_id,
                        expression: "product.subcategory_id"
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
                        _vm.$set(
                          _vm.product,
                          "subcategory_id",
                          $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        )
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
              _c("div", { staticClass: "form-group" }, [
                _c("label", [_vm._v("Product Name")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.product_name,
                      expression: "product_name"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text", name: "product_name", required: "" },
                  domProps: { value: _vm.product_name },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.product_name = $event.target.value
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", [_vm._v("Description")]),
                _vm._v(" "),
                _c(
                  "textarea",
                  {
                    staticClass: "form-control",
                    attrs: { name: "product_description" }
                  },
                  [_vm._v(_vm._s(_vm.minify(_vm.product.product_description)))]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", [_vm._v("Price")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.product.product_price,
                      expression: "product.product_price"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { type: "text", name: "product_price", required: "" },
                  domProps: { value: _vm.product.product_price },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(
                        _vm.product,
                        "product_price",
                        $event.target.value
                      )
                    }
                  }
                })
              ]),
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
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-171c2c4a", module.exports)
  }
}

/***/ }),

/***/ 55:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(100)
/* template */
var __vue_template__ = __webpack_require__(101)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\product\\edit.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-171c2c4a", Component.options)
  } else {
    hotAPI.reload("data-v-171c2c4a", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});