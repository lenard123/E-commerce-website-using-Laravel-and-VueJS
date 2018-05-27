webpackJsonp([41],{

/***/ 43:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(79)
/* template */
var __vue_template__ = __webpack_require__(80)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\category\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-12c5bff8", Component.options)
  } else {
    hotAPI.reload("data-v-12c5bff8", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 79:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			categoryId: 0
		};
	},

	created: function created() {
		if (this.categories.length < 1) this.refreshCategories();else this.$nextTick(function () {
			var rows = this.transformData(this.categories);
			this.initDatatable(rows);
		});
	},


	methods: {

		/**
   * Refresh categories
   * 
   * @return Object[] categories
   */
		refreshCategories: function refreshCategories() {
			var vm = this;
			util.notify('Refreshing categories', 'loading');
			axios.get(data.getBaseURL() + 'api/v1/category').then(function (response) {
				$.notifyClose();
				data.setCategories(response.data);
			}).catch(function (error) {
				util.showResult(error);
			});
		},

		/**
   * Delete an Item on categories
   * @param Int Category Id
   * @return JSON delete result
   */
		deleteCategory: function deleteCategory(id) {
			var vm = this;
			util.hideModal('#deleteCategoryModal');
			util.notify('Deleting Category', 'loading');
			axios.delete(data.getBaseURL() + 'api/v1/category/' + id).then(function (response) {
				if (util.showResult(response)) vm.refreshCategories();
			}).catch(function (error) {
				util.showResult(error);
			});
		},

		/**
   * Transform category data into html rows
   * @param Object[] categories
   * @return String[][] data
   */
		transformData: function transformData(categories) {
			var result = [];
			for (var i in categories) {
				var row = [];
				var image = data.getStorageURL() + categories[i]['category_image'];
				var id = categories[i]['id'];

				row.push('<img src="' + image + '" class="thumbnail" height="50px" width="50px" />');
				row.push(util.minify(categories[i]['category_name'], 15));
				row.push(util.minify(categories[i]['category_description'], 15));
				row.push('<button class="btn btn-link edit" name="' + id + '"><span class="fa fa-edit"></span></button>');
				row.push('<button class="btn btn-link delete" name="' + id + '"><span class="fa fa-trash"></span></button>');
				result.push(row);
			}
			return result;
		},

		/**
   * Initialize Data Table
   * @param String[][] rows
   * @return Object Datatable
   */
		initDatatable: function initDatatable(rows) {
			var vm = this;

			$('#categories').DataTable({
				destroy: true,
				aaData: rows,
				paging: true,
				ordering: false,
				searching: false,
				info: false,
				autoWidth: false,
				dom: 'Bfrtip',
				buttons: [{
					text: '<span class="fa fa-plus"></span> Add Category',
					action: function action(e, dt, node, config) {
						vm.$router.push('/category/add');
					},
					className: 'btn btn-success'
				}, {
					text: '<span class="fa fa-refresh"></span> Refresh',
					className: 'btn btn-primary',
					action: function action(a, b, c, d, e) {
						vm.refreshCategories();
					}
				}]
			});
			this.addListener();
		},

		/**
   * Set Category Id
   * @param Int Category Id
   *
   */
		setCategoryId: function setCategoryId(id) {
			this.categoryId = id;
		},

		/**
   * Get Category Id
   * 
   * @return Int Category ID
   */
		getCategoryId: function getCategoryId() {
			return this.categoryId;
		},

		/**
   * Get Category by id
   * @param Int category id
   * @return Object category
   */
		getCategory: function getCategory(id) {
			var cat = this.categories;
			for (var i in cat) {
				if (cat[i].id == id) return cat[i];
			}
		},

		/**
   * Add listener on every edit and delete button
   *
   */
		addListener: function addListener() {
			var vm = this;

			//Refresh Listener everytime the page change
			$('#categories_next').click(function () {
				vm.addListener();
			});

			$('.edit').click(function () {
				var id = $(this).attr('name');
				data.setCategory(vm.getCategory(id));
				vm.$router.push('/category/edit/' + id);
			});

			$('.delete').click(function () {
				util.showModal('#deleteCategoryModal');
				vm.setCategoryId($(this).attr('name'));
			});
		}
	},

	watch: {
		categories: function categories(val) {
			var rows = this.transformData(val);
			this.initDatatable(rows);
		}
	},

	computed: {
		categories: function categories() {
			return data.getCategories();
		}
	}
});

/***/ }),

/***/ 80:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "panel panel-default col-md-8 col-md-offset-2" },
    [
      _vm._m(0),
      _vm._v(" "),
      _c(
        "modal",
        { attrs: { id: "deleteCategoryModal" } },
        [
          _c("modal-header", [_vm._v("Delete Category")]),
          _vm._v(" "),
          _c("modal-body", [
            _c("p", [
              _c("b", [_vm._v("Warning :")]),
              _vm._v(
                " Deleting category will also delete Subcategory and products under it"
              )
            ])
          ]),
          _vm._v(" "),
          _c("modal-footer", [
            _c(
              "button",
              {
                staticClass: "btn btn-danger",
                on: {
                  click: function($event) {
                    _vm.deleteCategory(_vm.getCategoryId())
                  }
                }
              },
              [_vm._v("Delete")]
            ),
            _vm._v(" "),
            _c(
              "button",
              {
                staticClass: "btn btn-default",
                attrs: { "data-dismiss": "modal" }
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
    return _c("div", { staticClass: "panel-body table-responsive" }, [
      _c(
        "table",
        { staticClass: "table table-hover", attrs: { id: "categories" } },
        [
          _c("thead", [
            _c("tr", [
              _c("th", { attrs: { width: "50px" } }),
              _vm._v(" "),
              _c("th", [_vm._v("Name")]),
              _vm._v(" "),
              _c("th", [_vm._v("Description")]),
              _vm._v(" "),
              _c("th", [_vm._v("Edit")]),
              _vm._v(" "),
              _c("th", [_vm._v("Delete")])
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
    require("vue-hot-reload-api")      .rerender("data-v-12c5bff8", module.exports)
  }
}

/***/ })

});