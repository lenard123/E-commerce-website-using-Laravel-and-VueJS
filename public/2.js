webpackJsonp([2],{

/***/ 41:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(76)
/* template */
var __vue_template__ = __webpack_require__(77)
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
Component.options.__file = "resources\\assets\\js\\components\\index\\order.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-a0feaf86", Component.options)
  } else {
    hotAPI.reload("data-v-a0feaf86", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 76:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	created: function created() {
		if (this.quantity < 1) this.$router.push('/');else this.refreshOrder();
	},

	methods: {
		refreshOrder: function refreshOrder() {
			var vm = this;
			util.notify('Refreshing order', 'loading');
			axios.get(data.getBaseURL() + 'api/v1/user/order').then(function (response) {
				$.notifyClose();
				var response = util.getResponse(response);
				data.setOrders(response);
			}).catch(function (error) {
				util.log(error);
				util.notify('An error occured', 'error');
			});
		},

		getOrder: function getOrder(orders, type) {
			var _typeOrder = [];
			for (var i in orders) {
				if (orders[i].order_status == type) _typeOrder.push(orders[i]);
			}return _typeOrder;
		}
	},

	computed: {
		quantity: function quantity() {
			if (data.getStatus().LOG != 'IN') return this.$router.push('/');
			return data.getStatus().ORDER_QUANTITY;
		},

		orders: function orders() {
			return data.getOrders();
		},

		newOrder: function newOrder() {
			return this.getOrder(this.orders, 'new');
		},

		cancelOrder: function cancelOrder() {
			return this.getOrder(this.orders, 'cancel');
		},

		completeOrder: function completeOrder() {
			return this.getOrder(this.orders, 'complete');
		}
	}
});

/***/ }),

/***/ 77:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _vm.orders.length > 0
      ? _c(
          "div",
          [
            _vm._m(0),
            _vm._v(" "),
            _c("order", { attrs: { name: "New order", orders: _vm.newOrder } }),
            _vm._v(" "),
            _c("order", {
              attrs: { name: "Completed order", orders: _vm.completeOrder }
            }),
            _vm._v(" "),
            _c("order", {
              attrs: { name: "Cancelled order", orders: _vm.cancelOrder }
            })
          ],
          1
        )
      : _c("div", [_vm._m(1)])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("h1", [_c("b", [_vm._v("Orders List")])])
  },
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "jumbotron" }, [
      _c("h2", [_vm._v("No orders")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-a0feaf86", module.exports)
  }
}

/***/ })

});