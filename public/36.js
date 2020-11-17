webpackJsonp([36],{

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

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			orders: []
		};
	},

	created: function created() {
		this.$nextTick(function () {
			this.initDataTable(this._orders);
		});

		this.refreshOrders();
	},

	methods: {
		getOrders: function getOrders(type) {
			var orders = [];
			for (var i in this.orders) {
				if (this.orders[i].order_status == type || type == 'all') orders.push(this.orders[i]);
			}return orders;
		},

		refreshOrders: function refreshOrders() {
			var vm = this;
			util.notify('Refreshing orders', 'loading');
			axios.get(data.getBaseURL() + 'api/v1/order').then(function (response) {
				$.notifyClose();
				vm.orders = response.data;
			}).catch(function (response) {
				util.log(response);
				util.notify('An error occured', 'error');
			});
		},

		initDataTable: function initDataTable(rows) {
			var vm = this;
			var data = this.transformData(rows);
			$('#order-table').DataTable({
				destroy: true,
				aaData: data,
				paging: true,
				ordering: false,
				searching: false,
				info: false,
				autoWidth: false
			});

			this.addListener();
		},

		transformData: function transformData(orders) {
			var res = [];
			for (var i in orders) {
				var row = [];
				row.push(orders[i]['customer_name']);
				row.push(util.toCurrency(orders[i]['order_price']));
				row.push(this.getStatus(orders[i]['order_status']));
				row.push(util.toDate(orders[i]['created_at']['date']));
				row.push('<button class="btn btn-info details" id="' + orders[i]['id'] + '">\t\t\t\t\t\t\tview details \t\t\t\t\t\t\t<sup><span class="badge">' + orders[i]['order_item'] + '</span></sup>\t\t\t\t\t\t  </button>');
				res.push(row);
			}

			return res;
		},

		addListener: function addListener() {
			var vm = this;

			$('#order-table_next').click(function () {
				vm.addListener();
			});

			$('.details').click(function () {
				var id = $(this).attr('id');
				vm.$router.push('/order/' + vm.type + '/details/' + id);
			});
		},

		getStatus: function getStatus(type) {
			switch (type) {
				case 'complete':
					return '<span class="label label-success">' + type + 'd</span>';
					break;
				case 'cancel':
					return '<span class="label label-danger">' + type + 'led</span>';
					break;
				default:
					return '<span class="label label-info">' + type + '</span>';
					break;
			}
		},

		toDate: function toDate(date) {
			return new Date(date).toDateString();
		}
	},

	watch: {
		_orders: function _orders(val) {
			this.initDataTable(val);
		}
	},

	computed: {
		_orders: function _orders() {
			return this.getOrders(this.type);
		},

		type: function type() {
			return this.$route.params.type;
		},

		title: function title() {
			switch (this.type) {
				case 'new':
					return 'New orders';
					break;
				case 'complete':
					return 'Completed orders';
					break;
				case 'cancel':
					return 'Cancelled orders';
				default:
					return 'All orders';
					break;
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
  return _c("div", { staticClass: "panel panel-default" }, [
    _c("div", { staticClass: "panel-body" }, [
      _c("h4", [_vm._v(_vm._s(_vm.title))]),
      _vm._v(" "),
      _vm._m(0)
    ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "table-responsive" }, [
      _c(
        "table",
        { staticClass: "table table-hover", attrs: { id: "order-table" } },
        [
          _c("thead", [
            _c("tr", [
              _c("th", [_vm._v("Customer Name")]),
              _vm._v(" "),
              _c("th", [_vm._v("Price")]),
              _vm._v(" "),
              _c("th", [_vm._v("Status")]),
              _vm._v(" "),
              _c("th", [_vm._v("Date")]),
              _vm._v(" "),
              _c("th")
            ])
          ]),
          _vm._v(" "),
          _c("tbody")
        ]
      )
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7b7c6ff0", module.exports)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\order\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7b7c6ff0", Component.options)
  } else {
    hotAPI.reload("data-v-7b7c6ff0", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});