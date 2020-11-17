webpackJsonp([3],{

/***/ 42:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(78)
/* template */
var __vue_template__ = __webpack_require__(79)
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
Component.options.__file = "resources\\assets\\js\\components\\index\\order-details.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-25c34632", Component.options)
  } else {
    hotAPI.reload("data-v-25c34632", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 78:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			order_item: []
		};
	},

	created: function created() {
		if (!this.$route.query.id) {
			this.$router.push('/order');
			return;
		}
		this.refreshOrder();
	},

	methods: {
		refreshOrder: function refreshOrder() {
			var id = this.$route.query.id;
			var vm = this;
			util.notify('Getting information, please wait', 'loading');
			axios.get(data.getBaseURL() + 'api/v1/user/order/' + id).then(function (response) {
				$.notifyClose();
				response = util.getResponse(response);
				vm.order_item = response;
			}).catch(function (error) {
				util.notify('An error occured', error);
			});
		},

		cancel: function cancel() {
			util.hideModal('#cancelModal');
			var id = this.$route.query.id;
			var vm = this;
			util.notify('Cancelling your order, please wait', 'loading');
			axios.get(data.getBaseURL() + 'api/v1/user/order/cancel/' + id).then(function (response) {
				response = util.getResponse(response);
				if (response.status) {
					if (response.status == 'success') {
						util.notify('Your order has been canceled', 'success');
						vm.$router.push('/order');
					} else util.notify('An error occured', 'error');
				} else util.notify('An error occured', 'error');
			}).catch(function (error) {
				util.notify('An error occured', 'error');
			});
		},

		toCurrency: function toCurrency(x) {
			return util.toCurrency(x);
		}
	},

	computed: {

		totalItem: function totalItem() {
			if (data.getStatus().LOG != 'IN') this.$router.push('/');
			var orders = this.order_item;
			var totalItem = 0;
			for (var i in orders) {
				if (i != 'order') totalItem += orders[i].order_item_quantity;
			}return totalItem;
		},

		totalPrice: function totalPrice() {
			var orders = this.order_item;
			var totalPrice = 0;
			for (var i in orders) {
				if (i != 'order') totalPrice += orders[i].order_item_quantity * orders[i].product.product_price;
			}return totalPrice;
		},

		_new: function _new() {
			var _new = false;
			if (this.order_item.order) _new = this.order_item.order.order_status == 'new' ? true : false;
			return _new;
		}
	}
});

/***/ }),

/***/ 79:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "container" },
    [
      _c("div", { staticClass: "col-md-9" }, [
        _c("div", { staticClass: "panel panel-default" }, [
          _c(
            "div",
            { staticClass: "panel-body" },
            [
              _c(
                "router-link",
                { staticClass: "btn btn-default", attrs: { to: "/order" } },
                [_vm._v(" < Go Back")]
              ),
              _vm._v(" "),
              _vm._new
                ? _c(
                    "button",
                    {
                      staticClass: "btn btn-danger",
                      attrs: { onclick: "util.showModal('#cancelModal')" }
                    },
                    [_vm._v("Cancel Order")]
                  )
                : _vm._e(),
              _vm._v(" "),
              _c("h2", [_vm._v("Order Details")]),
              _vm._v(" "),
              _c("h6", [
                _vm._v("You have " + _vm._s(_vm.totalItem) + " items.")
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "table-responsive" }, [
                _c("table", { staticClass: "table table-hover" }, [
                  _c(
                    "tbody",
                    [
                      _vm._l(_vm.order_item, function(order, index) {
                        return index != "order"
                          ? _c("tr", [
                              _c("td", [
                                _c("h5", [
                                  _vm._v(
                                    _vm._s(order.order_item_quantity) +
                                      " x " +
                                      _vm._s(order.product.product_name)
                                  )
                                ])
                              ]),
                              _vm._v(" "),
                              _c("td", [
                                _c("h5", { staticClass: "pull-right" }, [
                                  _vm._v(
                                    "\r\n\t\t\t\t\t\t\t\t\t\t" +
                                      _vm._s(
                                        _vm.toCurrency(
                                          order.order_item_quantity *
                                            order.product.product_price
                                        )
                                      ) +
                                      "\r\n\t\t\t\t\t\t\t\t\t"
                                  )
                                ])
                              ])
                            ])
                          : _vm._e()
                      }),
                      _vm._v(" "),
                      _c("tr", [
                        _vm._m(0),
                        _vm._v(" "),
                        _c("td", [
                          _c("h5", { staticClass: "pull-right" }, [
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
              ])
            ],
            1
          )
        ])
      ]),
      _vm._v(" "),
      _c(
        "modal",
        { attrs: { id: "cancelModal" } },
        [
          _c("modal-header", [_vm._v("Cancel Order")]),
          _vm._v(" "),
          _c("modal-body", [
            _c("h1", [_vm._v("Are you sure to cancel your order?")])
          ]),
          _vm._v(" "),
          _c("modal-footer", [
            _c(
              "button",
              { staticClass: "btn btn-danger", on: { click: _vm.cancel } },
              [_vm._v("Cancel Order")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-default",
                attrs: { onclick: "util.hideModal('#cancelModal')" }
              },
              [_vm._v("Back")]
            )
          ])
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("td", [_c("h5", [_c("b", [_vm._v("Total")])])])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-25c34632", module.exports)
  }
}

/***/ })

});