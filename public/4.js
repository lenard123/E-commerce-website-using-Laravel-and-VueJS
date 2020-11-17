webpackJsonp([4],{

/***/ 40:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(74)
/* template */
var __vue_template__ = __webpack_require__(75)
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
Component.options.__file = "resources\\assets\\js\\components\\index\\check-out.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7c638cf8", Component.options)
  } else {
    hotAPI.reload("data-v-7c638cf8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 74:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	created: function created() {
		if (this.totalItem < 1) this.$router.push('/');
	},

	methods: {
		submit: function submit() {
			var vm = this;
			util.notify('Submitting your order, please wait...', 'loading');
			var url = data.getBaseURL() + 'api/v1/user/order/add';
			var params = $('#checkoutForm').serialize();
			axios.post(url, params).then(function (response) {
				var response = util.getResponse(response);
				if (response.status) {
					if (response.status == 'success') {
						util.notify('Ordered successfully', 'success');
						vm.$router.push('/');
					} else {
						util.notify('An error occured', 'success');
					}
				} else {
					var error = util.validateErrorMessage(response);
					util.notify(error, 'error');
				}
			}).catch(function (error) {
				util.notify('An error occured', 'error');
				util.log(error);
			});
		},

		toCurrency: function toCurrency(x) {
			return util.toCurrency(x);
		}
	},

	computed: {
		totalItem: function totalItem() {
			if (data.getStatus().LOG != 'IN') return this.$router.push('/');
			var quantity = 0;
			var carts = data.getStatus().CARTS;
			for (var i in carts) {
				quantity += carts[i].cart_quantity;
			}return quantity;
		},

		carts: function carts() {
			return data.getStatus().CARTS;
		},

		totalPrice: function totalPrice() {
			var price = 0;
			for (var i in this.carts) {
				price += this.carts[i].cart_quantity * this.carts[i].product.product_price;
			}return price;
		}
	}
});

/***/ }),

/***/ 75:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _vm._m(0),
    _vm._v(" "),
    _c("div", { staticClass: "row" }, [
      _c("div", { staticClass: "col-md-6" }, [
        _c(
          "form",
          {
            attrs: { id: "checkoutForm" },
            on: {
              submit: function($event) {
                $event.preventDefault()
                return _vm.submit($event)
              }
            }
          },
          [
            _vm._m(1),
            _vm._v(" "),
            _vm._m(2),
            _vm._v(" "),
            _vm._m(3),
            _vm._v(" "),
            _vm._m(4),
            _vm._v(" "),
            _vm._m(5),
            _vm._v(" "),
            _vm._m(6),
            _vm._v(" "),
            _vm._m(7),
            _vm._v(" "),
            _vm._m(8),
            _vm._v(" "),
            _vm._m(9)
          ]
        )
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "col-md-6" }, [
        _c("div", { staticClass: "panel panel-default" }, [
          _c("div", { staticClass: "panel-body" }, [
            _c("h2", [_vm._v("Order Summary")]),
            _vm._v(" "),
            _c("h6", [
              _vm._v(
                "You have " +
                  _vm._s(_vm.totalItem) +
                  " items in your shopping cart."
              )
            ]),
            _vm._v(" "),
            _c("div", { staticClass: "table-responsive" }, [
              _c("table", { staticClass: "table table-hover" }, [
                _c(
                  "tbody",
                  [
                    _vm._l(_vm.carts, function(cart) {
                      return _c("tr", [
                        _c("td", [
                          _c("h5", [
                            _vm._v(
                              _vm._s(cart.cart_quantity) +
                                " x " +
                                _vm._s(cart.product.product_name)
                            )
                          ])
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _c("h5", { staticClass: "pull-right" }, [
                            _vm._v(
                              "\r\n\t\t\t\t\t\t\t\t\t\t\t" +
                                _vm._s(
                                  _vm.toCurrency(
                                    cart.cart_quantity *
                                      cart.product.product_price
                                  )
                                ) +
                                "\r\n\t\t\t\t\t\t\t\t\t\t"
                            )
                          ])
                        ])
                      ])
                    }),
                    _vm._v(" "),
                    _c("tr", [
                      _vm._m(10),
                      _vm._v(" "),
                      _c("td", [
                        _c("b", { staticClass: "pull-right" }, [
                          _vm._v(_vm._s(_vm.toCurrency(_vm.totalPrice)))
                        ])
                      ])
                    ])
                  ],
                  2
                )
              ])
            ])
          ])
        ])
      ])
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h1", [_c("b", [_vm._v("Shipping")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", { attrs: { for: "firstname" } }, [_vm._v("Firstname")]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "text", name: "firstname", required: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", { attrs: { for: "lastname" } }, [_vm._v("Lastname")]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "text", name: "lastname", required: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", { attrs: { for: "address1" } }, [_vm._v("Address1")]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "text", name: "address1", required: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", { attrs: { for: "address2" } }, [_vm._v("Address2")]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "text", name: "address2", placeholder: "Optional" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", { attrs: { for: "phone" } }, [_vm._v("Phone")]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "text", name: "phone", required: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", { attrs: { for: "city" } }, [_vm._v("City")]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "text", name: "city", required: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", { attrs: { for: "state" } }, [_vm._v("State")]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "text", name: "state", required: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("label", { attrs: { for: "postalcode" } }, [_vm._v("Postal Code")]),
      _vm._v(" "),
      _c("input", {
        staticClass: "form-control",
        attrs: { type: "text", name: "postalcode", required: "" }
      })
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "form-group" }, [
      _c("button", { staticClass: "btn btn-info", attrs: { type: "submit" } }, [
        _c("b", [_vm._v("Place Order")])
      ])
    ])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", [_c("b", [_vm._v("Total")])])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7c638cf8", module.exports)
  }
}

/***/ })

});