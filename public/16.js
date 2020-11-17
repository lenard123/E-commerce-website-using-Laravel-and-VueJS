webpackJsonp([16],{

/***/ 112:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			order_detail: {}
		};
	},

	created: function created() {
		this.refreshOrderDetails();
	},

	methods: {
		refreshOrderDetails: function refreshOrderDetails() {
			var vm = this;
			util.notify('Getting details, please wait', 'loading');
			axios.get(data.getBaseURL() + 'api/v1/order/' + this.id).then(function (response) {
				$.notifyClose();
				vm.order_detail = response.data;
			}).catch(function (error) {
				util.notify('An error occured', 'error');
			});
		},

		getItem: function getItem(item) {
			return item.order_item_quantity + '  x  ' + item.product.product_name;
		},

		toCurrency: function toCurrency(item) {
			return util.toCurrency(item.order_item_quantity * item.product.product_price);
		},

		back: function back() {
			this.$router.push('/customer/orders/' + this.customer_id);
		},

		cancelOrder: function cancelOrder() {
			var vm = this;
			util.hideModal('#cancelModal');
			util.notify('Cancelling your order, please wait...', 'loading');
			axios.get(data.getBaseURL() + 'api/v1/order/cancel/' + this.id).then(function (response) {
				if (response.data.status) {
					if (response.data.status == 'success') {
						util.notify('Order cancelled');
						vm.back();
					} else util.notify('An error occured', 'error');
				} else {
					util.notify('An error occured', 'error');
				}
			}).catch(function (error) {
				util.notify('An error occured', 'error');
			});
		},

		completeOrder: function completeOrder() {
			var vm = this;
			util.hideModal('#completeModal');
			util.notify('Loading please wait...', 'loading');
			axios.get(data.getBaseURL() + 'api/v1/order/complete/' + this.id).then(function (response) {
				if (response.data.status) {
					if (response.data.status == 'success') {
						util.notify('Order completed', 'success');
						vm.back();
					} else util.notify('An error occured', 'error');
				} else {
					util.notify('An error occured', 'error');
				}
			}).catch(function (error) {
				util.notify('An error occured', 'error');
			});
		}
	},

	computed: {
		fullname: function fullname() {
			var firstname = this.order_detail.order_firstname;
			var lastname = this.order_detail.order_lastname;
			var fullname = firstname + ' ' + lastname;
			return this.order_detail.order_status ? fullname : '';
		},

		customer_id: function customer_id() {
			return this.$route.params.customer_id;
		},

		id: function id() {
			return this.$route.query.id;
		},

		isNew: function isNew() {
			return this.order_detail.order_status == 'new';
		},

		items: function items() {
			var item = [];
			if (this.order_detail.order_item) item = this.order_detail.order_item;
			return item;
		},

		totalPrice: function totalPrice() {
			var price = 0;
			for (var i in this.items) {
				price += this.items[i].order_item_quantity * parseFloat(this.items[i].product.product_price);
			}
			return util.toCurrency(price);
		}
	},

	components: {
		'info': {
			props: ['_key', 'value'],
			template: '<tr>\
						<td>\
							<h5><b>{{ _key }}&nbsp;&nbsp;</b></h5>\
						</td>\
						<td>\
							<h5>{{ value }}</h5>\
						</td>\
					   </tr>'
		}
	}
});

/***/ }),

/***/ 113:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    [
      _c("div", { staticClass: "form-group" }, [
        _c(
          "button",
          { staticClass: "btn btn-default white", on: { click: _vm.back } },
          [_vm._v(" < Go Back ")]
        ),
        _vm._v(" "),
        _vm.isNew
          ? _c(
              "button",
              {
                staticClass: "btn btn-danger",
                attrs: { onclick: "util.showModal('#cancelModal')" }
              },
              [
                _c("i", { staticClass: "fa fa-trash" }),
                _vm._v(" Cancel Order\t\t\r\n\t\t")
              ]
            )
          : _vm._e(),
        _vm._v(" "),
        _vm.isNew
          ? _c(
              "button",
              {
                staticClass: "btn btn-success",
                attrs: { onclick: "util.showModal('#completeModal')" }
              },
              [
                _c("i", { staticClass: "fa fa-check" }),
                _vm._v(" Complete Order\r\n\t\t")
              ]
            )
          : _vm._e()
      ]),
      _vm._v(" "),
      _c("div", { staticClass: "row" }, [
        _c("div", { staticClass: "col-md-6" }, [
          _c("div", { staticClass: "panel panel-default" }, [
            _c("div", { staticClass: "panel-body" }, [
              _vm._m(0),
              _vm._v(" "),
              _c(
                "table",
                [
                  _c("info", { attrs: { _key: "Name", value: _vm.fullname } }),
                  _vm._v(" "),
                  _c("info", {
                    attrs: {
                      _key: "Address1",
                      value: _vm.order_detail.order_address1
                    }
                  }),
                  _vm._v(" "),
                  _c("info", {
                    attrs: {
                      _key: "Address2",
                      value: _vm.order_detail.order_address2
                    }
                  }),
                  _vm._v(" "),
                  _c("info", {
                    attrs: {
                      _key: "Phone",
                      value: _vm.order_detail.order_phone
                    }
                  }),
                  _vm._v(" "),
                  _c("info", {
                    attrs: { _key: "City", value: _vm.order_detail.order_city }
                  }),
                  _vm._v(" "),
                  _c("info", {
                    attrs: {
                      _key: "State",
                      value: _vm.order_detail.order_state
                    }
                  }),
                  _vm._v(" "),
                  _c("info", {
                    attrs: {
                      _key: "Postal Code",
                      value: _vm.order_detail.order_postalcode
                    }
                  })
                ],
                1
              )
            ])
          ])
        ]),
        _vm._v(" "),
        _c("div", { staticClass: "col-md-6" }, [
          _c("div", { staticClass: "panel panel-default" }, [
            _c("div", { staticClass: "panel-body" }, [
              _vm._m(1),
              _vm._v(" "),
              _c("div", { staticClass: "table-responsive" }, [
                _c(
                  "table",
                  { staticClass: "table table-hover" },
                  [
                    _vm._l(_vm.items, function(item) {
                      return _c("tr", [
                        _c("td", [
                          _c("h5", [_vm._v(_vm._s(_vm.getItem(item)))])
                        ]),
                        _vm._v(" "),
                        _c("td", [
                          _c("h5", { staticClass: "pull-right" }, [
                            _vm._v(_vm._s(_vm.toCurrency(item)))
                          ])
                        ])
                      ])
                    }),
                    _vm._v(" "),
                    _c("tr", [
                      _vm._m(2),
                      _vm._v(" "),
                      _c("td", [
                        _c("h5", { staticClass: "pull-right" }, [
                          _c("b", [_vm._v(_vm._s(_vm.totalPrice))])
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
      ]),
      _vm._v(" "),
      _c(
        "modal",
        { attrs: { id: "cancelModal" } },
        [
          _c("modal-header", [_c("h4", [_vm._v("Cancel Order")])]),
          _vm._v(" "),
          _c("modal-body", [
            _c("h1", [_vm._v("Are you sure to cancel this order?")])
          ]),
          _vm._v(" "),
          _c("modal-footer", [
            _c(
              "button",
              {
                staticClass: "btn btn-danger",
                on: {
                  click: function($event) {
                    _vm.cancelOrder()
                  }
                }
              },
              [_vm._v("Cancel order")]
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
      ),
      _vm._v(" "),
      _c(
        "modal",
        { attrs: { id: "completeModal" } },
        [
          _c("modal-header", [_c("h4", [_vm._v("Complete Order")])]),
          _vm._v(" "),
          _c("modal-body", [
            _c("h1", [_vm._v("Are you sure that this order is complete?")])
          ]),
          _vm._v(" "),
          _c("modal-footer", [
            _c(
              "button",
              {
                staticClass: "btn btn-success",
                on: {
                  click: function($event) {
                    _vm.completeOrder()
                  }
                }
              },
              [_vm._v("Complete order")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-default",
                attrs: { onclick: "util.hideModal('#completeModal')" }
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
    return _c("h4", [_c("b", [_vm._v("Customer's Details")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h4", [_c("b", [_vm._v("Order Details")])])
  },
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
    require("vue-hot-reload-api")      .rerender("data-v-4fc198c8", module.exports)
  }
}

/***/ }),

/***/ 62:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(112)
/* template */
var __vue_template__ = __webpack_require__(113)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\customer\\details.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-4fc198c8", Component.options)
  } else {
    hotAPI.reload("data-v-4fc198c8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});