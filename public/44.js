webpackJsonp([44],{

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

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			admins: [],
			admin_id: 0
		};
	},

	created: function created() {
		this.$nextTick(function () {
			this.initDataTable();
		});

		this.refreshAdmin();
	},

	methods: {
		refreshAdmin: function refreshAdmin() {
			var vm = this;
			util.notify('Refreshing admin', 'loading');
			axios.get(data.getBaseURL() + 'api/v1/admin').then(function (response) {
				$.notifyClose();
				vm.admins = response.data;
			}).catch(function (error) {
				util.notify('An error occured', 'error');
			});
		},

		initDataTable: function initDataTable() {
			var vm = this;
			$('#admin_table').DataTable({
				destroy: true,
				aaData: vm.data,
				autoWidth: false,
				info: false,
				searching: false,
				dom: 'Bfrtip',
				buttons: [{
					text: '<i class="fa fa-plus"></i> Add Admin',
					action: function action() {
						vm.$router.push('/admin/add');
					},
					className: 'btn btn-success'
				}]
			});

			this.addListener();
		},

		addListener: function addListener() {
			var vm = this;

			$('#admin_table_next').click(function () {
				vm.addListener();
			});

			$('.delete').click(function () {
				var id = $(this).attr('id');
				vm.admin_id = id;
				util.showModal('#deleteAdminModal');
			});
		},

		deleteAdmin: function deleteAdmin() {
			util.hideModal('#deleteAdminModal');
			util.notify('Deleting admin', 'loading');
			var vm = this;
			axios.delete(data.getBaseURL() + 'api/v1/admin/' + this.admin_id).then(function (response) {
				if (util.showResult(response)) vm.refreshAdmin();
			}).catch(function (error) {
				util.showResult(error);
			});
		},

		getType: function getType(x) {
			var type = x == 1 ? 'admin' : 'co-admin';
			var label = x == 1 ? 'success' : 'info';
			return '<span class="label label-' + label + '">' + type + '</span>';
		},

		isAdmin: function isAdmin(x) {
			return x == 1;
		},

		deleteButton: function deleteButton(id) {
			return '<i class="fa fa-trash delete" id="' + id + '"></i>';
		}
	},

	watch: {
		admins: function admins(val) {
			this.initDataTable();
		}
	},

	computed: {
		data: function (_data) {
			function data() {
				return _data.apply(this, arguments);
			}

			data.toString = function () {
				return _data.toString();
			};

			return data;
		}(function () {
			var admins = this.admins;
			var res = [];
			for (var i in admins) {
				var row = [];
				row.push('<img src="' + (data.getStorageURL() + admins[i]['admin_image']) + '" class="thumbnail" heigh="60px" width="60px" alt="' + admins[i]['admin_name'] + '"/>');
				row.push(admins[i]['admin_name']);
				row.push(admins[i]['admin_user']);
				row.push(this.getType(admins[i]['admin_type']));
				row.push(this.deleteButton(admins[i]['id']));
				res.push(row);
			}
			return res;
		})
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
    { staticClass: "col-md-8 col-md-offset-2" },
    [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "modal",
        { attrs: { id: "deleteAdminModal" } },
        [
          _c("modal-header", [_vm._v("Delete Admin")]),
          _vm._v(" "),
          _c("modal-body", [
            _c("h1", [_vm._v("Are you sure to delete Admin?")])
          ]),
          _vm._v(" "),
          _c("modal-footer", [
            _c(
              "button",
              { staticClass: "btn btn-danger", on: { click: _vm.deleteAdmin } },
              [_vm._v("Delete Admin")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-default",
                attrs: { onclick: "util.hideModal('#deleteAdminModal')" }
              },
              [_vm._v("Cancel")]
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
    return _c("div", { staticClass: "panel panel-default" }, [
      _c("div", { staticClass: "panel-body" }, [
        _c("div", { staticClass: "table-responsive" }, [
          _c(
            "table",
            { staticClass: "table table-hover", attrs: { id: "admin_table" } },
            [
              _c("thead", [
                _c("tr", [
                  _c("th"),
                  _vm._v(" "),
                  _c("th", [_vm._v("Name")]),
                  _vm._v(" "),
                  _c("th", [_vm._v("Username")]),
                  _vm._v(" "),
                  _c("th", [_vm._v("Type")]),
                  _vm._v(" "),
                  _c("th", [_vm._v("Delete")])
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
    require("vue-hot-reload-api")      .rerender("data-v-652a9eb1", module.exports)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\admin\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-652a9eb1", Component.options)
  } else {
    hotAPI.reload("data-v-652a9eb1", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ })

});