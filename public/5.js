webpackJsonp([5],{

/***/ 39:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(72)
/* template */
var __vue_template__ = __webpack_require__(73)
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
Component.options.__file = "resources\\assets\\js\\components\\index\\cart.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-d9bf5cfe", Component.options)
  } else {
    hotAPI.reload("data-v-d9bf5cfe", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 72:
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

/* harmony default export */ __webpack_exports__["default"] = ({

	created: function created() {
		this.refreshCart();
	},

	methods: {
		refreshCart: function refreshCart() {
			var vm = this;
			util.notify('Refreshing cart...', 'loading');
			axios.get(this.baseURL + 'api/v1/user/category').then(function (response) {
				$.notifyClose();
				data.setCategories(util.getResponse(response));
			}).catch(function (error) {
				$.notifyClose();
			});
		},

		toCurrency: function toCurrency(x) {
			return util.toCurrency(x);
		}
	},

	computed: {
		cart_quantity: function cart_quantity() {
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
			var carts = this.carts;
			for (var i in carts) {
				price += carts[i].cart_quantity * carts[i].product.product_price;
			}
			return price;
		}

	}
});

/***/ }),

/***/ 73:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _vm.cart_quantity > 0
      ? _c("div", [
          _vm._m(0),
          _vm._v(" "),
          _c("div", { staticClass: "panel panel-default col-md-8" }, [
            _c(
              "div",
              { staticClass: "panel-body" },
              [
                _c("h6", [
                  _vm._v(
                    "You have " +
                      _vm._s(_vm.cart_quantity) +
                      " products in your shopping cart."
                  )
                ]),
                _vm._v(" "),
                _c("div", { staticClass: "table table-responsive" }, [
                  _c("table", { staticClass: "table table-hover" }, [
                    _c("thead", [
                      _c("tr", [
                        _c("th", { attrs: { width: "80px" } }),
                        _vm._v(" "),
                        _c("th", [_vm._v("Product")]),
                        _vm._v(" "),
                        _c("th", [_c("center", [_vm._v("Quantity")])], 1),
                        _vm._v(" "),
                        _vm._m(1)
                      ])
                    ]),
                    _vm._v(" "),
                    _c(
                      "tbody",
                      [
                        _vm._l(_vm.carts, function(cart, index) {
                          return _c("cart-card", {
                            key: index,
                            attrs: { index: index, value: cart }
                          })
                        }),
                        _vm._v(" "),
                        _c("tr", [
                          _c("td", { attrs: { colspan: "4" } }, [
                            _c("span", { staticClass: "pull-right" }, [
                              _c("b", [
                                _vm._v(_vm._s(_vm.toCurrency(_vm.totalPrice)))
                              ])
                            ])
                          ])
                        ])
                      ],
                      2
                    )
                  ])
                ]),
                _vm._v(" "),
                _c(
                  "router-link",
                  {
                    staticClass: "btn btn-success",
                    attrs: { tag: "button", to: "/check-out" }
                  },
                  [_vm._v("Check out")]
                )
              ],
              1
            )
          ])
        ])
      : _vm._e(),
    _vm._v(" "),
    _vm.cart_quantity < 1
      ? _c("div", { staticClass: "jumbotron" }, [
          _c("h1", [_vm._v("No products in cart")])
        ])
      : _vm._e()
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h1", [_c("b", [_vm._v("Shopping Cart")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("th", [
      _c("span", { staticClass: "pull-right" }, [_vm._v("Price")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-d9bf5cfe", module.exports)
  }
}

/***/ })

});