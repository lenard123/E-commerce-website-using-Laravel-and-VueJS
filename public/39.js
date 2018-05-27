webpackJsonp([39],{

/***/ 105:
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
			customers: []
		};
	},

	created: function created() {
		this.refreshCustomer();
	},

	methods: {
		refreshCustomer: function refreshCustomer() {
			var vm = this;
			util.notify('Refreshing Customers', 'loading');
			axios.get(data.getBaseURL() + 'api/v1/customer').then(function (response) {
				$.notifyClose();
				vm.customers = response.data;
				vm.initDataTable();
			}).catch(function (error) {
				util.notify('An error occured', 'error');
			});
		},

		initDataTable: function initDataTable() {
			$('#customerTable').DataTable({
				destroy: true,
				aaData: this.data,
				ordering: false,
				searching: true,
				info: false,
				autoWidth: false
			});

			this.addListener();
		},

		addListener: function addListener() {
			var vm = this;

			$('#customerTable_next').click(function () {
				vm.addListener();
			});

			$('.details').click(function () {
				var id = $(this).attr('id');
				vm.$router.push('/customer/orders/' + id);
			});
		}
	},

	computed: {
		data: function data() {
			var customers = this.customers;
			var data = [];
			for (var i in customers) {
				var row = [];
				row.push(customers[i]['customer_name']);
				row.push(customers[i]['customer_user']);
				row.push(customers[i]['customer_email']);
				row.push('<button class="btn btn-info details" id="' + customers[i]['id'] + '">\
							' + customers[i]['orders'] + ' orders\
						  </button>');
				data.push(row);
			}
			return data;
		}
	}
});

/***/ }),

/***/ 106:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _vm._m(0)
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "col-md-9 panel panel-default" }, [
      _c("div", { staticClass: "panel-body" }, [
        _c("h4", [_c("b", [_vm._v("Customers")])]),
        _vm._v(" "),
        _c("div", { staticClass: "table-responsive" }, [
          _c(
            "table",
            {
              staticClass: "table table-hover",
              attrs: { id: "customerTable" }
            },
            [
              _c("thead", [
                _c("tr", [
                  _c("th", [_vm._v("Name")]),
                  _vm._v(" "),
                  _c("th", [_vm._v("User")]),
                  _vm._v(" "),
                  _c("th", [_vm._v("Email")]),
                  _vm._v(" "),
                  _c("th", [_vm._v("Orders")])
                ])
              ]),
              _vm._v(" "),
              _c("tbody")
            ]
          )
        ])
      ])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-7df66ad8", module.exports)
  }
}

/***/ }),

/***/ 58:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(105)
/* template */
var __vue_template__ = __webpack_require__(106)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\customer\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7df66ad8", Component.options)
  } else {
    hotAPI.reload("data-v-7df66ad8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});