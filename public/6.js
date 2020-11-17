webpackJsonp([6],{

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(89)
/* template */
var __vue_template__ = __webpack_require__(90)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\subcategory\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-dc058e40", Component.options)
  } else {
    hotAPI.reload("data-v-dc058e40", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 89:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function (_data) {
		function data() {
			return _data.apply(this, arguments);
		}

		data.toString = function () {
			return _data.toString();
		};

		return data;
	}(function () {
		return {
			subcategory_id: 0,
			baseURL: data.getBaseURL()
		};
	}),

	created: function created() {
		if (this.subcategories.length < 1) this.refreshSubcategories();else this.$nextTick(function () {
			var rows = this.transformData(this.subcategories);
			this.initDatatable(rows);
		});
	},

	methods: {

		/**
   * Get All Subcategory
   *
   * @return Response JSON result
   */
		refreshSubcategories: function refreshSubcategories() {
			var vm = this;
			util.notify('Refreshing Subcategories', 'loading');
			axios.get(this.baseURL + 'api/v1/subcategory').then(function (response) {
				$.notifyClose();
				data.setSubcategories(response.data);
			}).catch(function (error) {
				util.showResult(error);
			});
		},

		/**
   * Delete Subcategories
   * @param Int id Subcategory Id
   *
   */
		deleteSubcategories: function deleteSubcategories(id) {
			var vm = this;
			util.hideModal('#deleteSubcategoriesModal');
			util.notify('Deleting Subcategory', 'loading');
			axios.delete(this.baseURL + 'api/v1/subcategory/' + id).then(function (response) {
				if (util.showResult(response)) vm.refreshSubcategories();
			}).catch(function (error) {
				util.showResult(error);
			});
		},

		/**
   * Set Subcategory id
   * @param int Id SubcategoryId
   *
   */
		setSubcategoryId: function setSubcategoryId(id) {
			this.subcategory_id = id;
		},

		/**
   * Get Subcategory Id
   * 
   * @return Int Subcategory id
   */
		getSubcategoryId: function getSubcategoryId() {
			return this.subcategory_id;
		},

		/**
   * Navigate to different Category
   * @param Int id Category id
   *
   */
		goto: function goto(id) {
			this.$router.push({ params: { category_id: id } });
		},

		/**
   * Minify the Category name to fit to the screen
   * @param String category name
   * @return String Minified Category name
   */
		minify: function minify(string) {
			return util.minify(util.unescapeHTML(string), 20);
		},

		/**
   * Transform Subcategories data into HTML rows
   * @param Object[] subcategory
   * @return String[][] subcategories
   */
		transformData: function transformData(subcat) {
			var subcategories = [];
			for (var i in subcat) {
				var row = [];
				var image = data.getStorageURL() + subcat[i]['subcategory_image'];
				var id = subcat[i]['id'];

				row.push('<img src="' + image + '" class="thumbnail" height="50px" width="50px" />');
				row.push(util.minify(subcat[i]['subcategory_name'], 15));
				row.push(util.minify(subcat[i]['subcategory_description'], 15));
				row.push('<button class="btn btn-link edit" id="' + id + '">\
						 	<span class="fa fa-edit"></span>\
						  </button>');
				row.push('<button class="btn btn-link delete" id="' + id + '">\
							<span class="fa fa-trash"></span>\
						  </button>');
				subcategories.push(row);
			}

			return subcategories;
		},

		/**
   * Initialize datatable
   * @param Sting[][] rows Subcategory
   * @return Object Datatable
   */
		initDatatable: function initDatatable(rows) {
			var vm = this;

			$('#subcategories').DataTable({
				destroy: true,
				aaData: rows,
				paging: true,
				ordering: false,
				searching: false,
				info: false,
				autoWidth: false,
				dom: 'Bfrtip',
				buttons: [{
					text: '<span class="fa fa-plus"></span> Add Subcategory',
					action: function action(e, dt, node, config) {
						vm.$router.push({ path: '/subcategory/' + vm.category_id + '/add' });
					},
					className: 'btn btn-success'
				}, {
					text: '<span class="fa fa-refresh"></span> Refresh',
					className: 'btn btn-primary',
					action: function action(a, b, c, d, e) {
						vm.refreshSubcategories();
					}
				}]
			});

			this.addListener();
		},

		/**
   * Add Event Listener on Edit and Delete Button
   *
   */
		addListener: function addListener() {

			var vm = this;

			//refresh listener on next page
			$('#subcategories_next').click(function () {
				vm.addListener();
			});

			//Add listener on Edit Button
			$('.edit').click(function () {
				var id = $(this).attr('id');
				data.setSubcategory(vm.getSubcategory(id));
				vm.$router.push('/subcategory/' + vm.category_id + '/edit/' + id);
			});

			//Add Listener on Delete Button
			$('.delete').click(function () {
				vm.setSubcategoryId($(this).attr('id'));
				util.showModal('#deleteSubcategoriesModal');
			});
		},

		/** 
   * Get Subcategory
   * @param (int) Subcategory id
   * @return {Object} Subcategory
   */
		getSubcategory: function getSubcategory(id) {
			var subcat = this.subcategories;
			for (var i in subcat) {
				if (subcat[i]['id'] == id) return subcat[i];
			}return {};
		}
	},

	watch: {
		subcategories: function subcategories(_subcategories) {
			var rows = this.transformData(_subcategories);
			this.initDatatable(rows);
		},

		category_id: function category_id(value) {
			var rows = this.transformData(this.subcategories);
			this.initDatatable(rows);
		}
	},

	computed: {
		category_id: function category_id() {
			return this.$route.params.category_id;
		},

		category_name: function category_name() {
			if (this.category_id == 0) return 'All Categories';
			for (var i in this.categories) {
				if (this.categories[i].id == this.category_id) return util.unescapeHTML(this.categories[i].category_name);
			}
		},

		categories: function categories() {
			return data.categories;
		},

		subcategories: function subcategories() {
			var subcategories = data.subcategories;
			var res = [];
			for (var i in subcategories) {
				if (this.category_id != 0 && subcategories[i].category_id != this.category_id) continue;
				res.push(subcategories[i]);
			}
			return res;
		}
	}
});

/***/ }),

/***/ 90:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "row" },
    [
      _c("div", { staticClass: "col-md-3" }, [
        _c("div", { staticClass: "panel-group" }, [
          _c("div", { staticClass: "panel panel-default" }, [
            _c("div", { staticClass: "panel-heading" }, [
              _c(
                "h4",
                {
                  staticClass: "panel-title",
                  attrs: { "data-toggle": "collapse", href: "#collapse1" }
                },
                [
                  _vm._v(
                    "\r\n\t\t\t\t\t\t" +
                      _vm._s(_vm.minify(_vm.category_name)) +
                      "\r\n\t\t\t\t\t"
                  )
                ]
              )
            ]),
            _vm._v(" "),
            _c(
              "div",
              {
                staticClass: "panel-collapse collapse",
                attrs: { id: "collapse1" }
              },
              [
                _c(
                  "ul",
                  { staticClass: "list-group" },
                  [
                    _c(
                      "li",
                      {
                        staticClass: "list-group-item",
                        class: { active: 0 == _vm.category_id },
                        on: {
                          click: function($event) {
                            $event.preventDefault()
                            _vm.goto(0)
                          }
                        }
                      },
                      [_vm._v("All Categories")]
                    ),
                    _vm._v(" "),
                    _vm._l(_vm.categories, function(category) {
                      return _c(
                        "li",
                        {
                          staticClass: "list-group-item",
                          class: { active: category.id == _vm.category_id },
                          on: {
                            click: function($event) {
                              _vm.goto(category.id)
                            }
                          }
                        },
                        [_vm._v(_vm._s(_vm.minify(category.category_name)))]
                      )
                    })
                  ],
                  2
                )
              ]
            )
          ])
        ])
      ]),
      _vm._v(" "),
      _vm._m(0),
      _vm._v(" "),
      _c(
        "modal",
        { attrs: { id: "deleteSubcategoriesModal" } },
        [
          _c("modal-header", [_vm._v("Delete Subcategory")]),
          _vm._v(" "),
          _c("modal-body", [
            _c("p", [
              _c("b", [_vm._v("Warning : ")]),
              _vm._v(" Deleting Subcategory will also delete products under it")
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
                    _vm.deleteSubcategories(_vm.getSubcategoryId())
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
    return _c("div", { staticClass: "col-md-9" }, [
      _c(
        "div",
        { staticClass: "panel panel-default", attrs: { id: "subcat" } },
        [
          _c("div", { staticClass: "panel-body table-responsive" }, [
            _c(
              "table",
              {
                staticClass: "table table-hover",
                attrs: { id: "subcategories" }
              },
              [
                _c("thead", [
                  _c("tr", [
                    _c("th", { staticStyle: { width: "50px" } }),
                    _vm._v(" "),
                    _c("th", { staticStyle: { width: "200px" } }, [
                      _vm._v("Name")
                    ]),
                    _vm._v(" "),
                    _c("th", { staticStyle: { width: "200px" } }, [
                      _vm._v("Description")
                    ]),
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
    require("vue-hot-reload-api")      .rerender("data-v-dc058e40", module.exports)
  }
}

/***/ })

});