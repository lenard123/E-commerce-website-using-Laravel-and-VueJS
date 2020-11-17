webpackJsonp([14],{

/***/ 110:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			orders: []
		};
	},

	created: function created() {
		this.getOrders();
	},

	methods: {
		getOrders: function getOrders() {
			var vm = this;
			util.notify('Refreshing orders', 'loading');
			axios.get(data.getBaseURL() + 'api/v1/customer/' + this.id).then(function (response) {
				$.notifyClose();
				vm.orders = response.data;
			}).catch(function (error) {
				util.log(error);
				util.notify('An error occured', 'error');
			});
		}
	},

	computed: {
		id: function id() {
			return this.$route.params.customer_id;
		},

		link: function link() {
			return this.$route.path + '/details';
		},

		newOrders: function newOrders() {
			return this.orders.filter(function (order) {
				order.created_at = order.created_at.date;
				return order.order_status == 'new';
			});
		},

		completeOrders: function completeOrders() {
			return this.orders.filter(function (order) {
				return order.order_status == 'complete';
			});
		},

		cancelOrders: function cancelOrders() {
			return this.orders.filter(function (order) {
				return order.order_status == 'cancel';
			});
		}
	}
});

/***/ }),

/***/ 111:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", [
    _c(
      "div",
      { staticClass: "form-group" },
      [
        _c(
          "router-link",
          { staticClass: "btn btn-default white", attrs: { to: "/customer" } },
          [_vm._v("< Go Back")]
        )
      ],
      1
    ),
    _vm._v(" "),
    _vm.orders.length > 0
      ? _c(
          "div",
          [
            _c("order", {
              attrs: {
                name: "New Orders",
                orders: _vm.newOrders,
                "detail-link": _vm.link
              }
            }),
            _vm._v(" "),
            _c("order", {
              attrs: {
                name: "Completed Orders",
                orders: _vm.completeOrders,
                "detail-link": _vm.link
              }
            }),
            _vm._v(" "),
            _c("order", {
              attrs: {
                name: "Cancelled Orders",
                orders: _vm.cancelOrders,
                "detail-link": _vm.link
              }
            })
          ],
          1
        )
      : _c("div", [_vm._m(0)])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "jumbotron white" }, [
      _c("h1", [_vm._v("No Orders")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-450fe04f", module.exports)
  }
}

/***/ }),

/***/ 61:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(110)
/* template */
var __vue_template__ = __webpack_require__(111)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\customer\\orders.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-450fe04f", Component.options)
  } else {
    hotAPI.reload("data-v-450fe04f", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});