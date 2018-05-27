webpackJsonp([9],{

/***/ 53:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(96)
/* template */
var __vue_template__ = __webpack_require__(97)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\product\\index.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-48f9e95e", Component.options)
  } else {
    hotAPI.reload("data-v-48f9e95e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 96:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	data: function data() {
		return {
			err: 3,
			product_id: 0
		};
	},

	created: function created() {
		if (this.subcategories.length < 1) this.refreshSubcategories();else this.refreshProducts();
	},


	methods: {
		/**
   * Delete Product
   * @param {Int} product id
   */
		deleteProduct: function deleteProduct(id) {
			var vm = this;
			util.hideModal('#deleteProductModal');
			util.notify('Deleting product...', 'loading');
			axios.delete(data.getBaseURL() + 'api/v1/product/' + id).then(function (response) {
				$.notifyClose();
				if (util.showResult(response)) vm.refreshProducts();
			}).catch(function (error) {
				util.showResult(error);
			});
		},

		/**
   * Refresh Product list
   *
   */
		refreshProducts: function refreshProducts() {
			var vm = this;
			var baseURL = data.getBaseURL();
			util.notify('Refreshing Products', 'loading');
			axios.get(baseURL + 'api/v1/product?id=' + this.category_id).then(function (response) {
				$.notifyClose();
				vm.err = 3;
				data.setProducts(response.data);
				if (response.data.length < 1) {
					vm.$nextTick(function () {
						$.notifyClose();
						var rows = this.transformData(this.products);
						this.initDatatable(rows);
					});
				}
			}).catch(function (error) {
				if (vm.err > 0) {
					vm.err--;
					vm.refreshProducts();
				} else {
					util.showResult(error);
				}
			});
		},

		/**
   * Get subcategories
   *
   */
		refreshSubcategories: function refreshSubcategories() {
			var vm = this;
			util.notify('Refreshing Products', 'loading');
			axios.get(data.getBaseURL() + 'api/v1/subcategory').then(function (response) {
				$.notifyClose();
				data.setSubcategories(response.data);
				vm.err = 3;
				if (response.data.length < 1) {
					vm.$nextTick(function () {
						$.notifyClose();
						var rows = this.transformData(this.products);
						this.initDatatable(rows);
					});
				} else {
					vm.refreshProducts();
				}
			}).catch(function (error) {
				if (vm.err > 0) {
					vm.err--;
					vm.refreshSubcategories();
				} else {
					util.showResult(error);
				}
			});
		},

		/**
   * Transform Data to HTML rows
   * @param [{Object}] Products
   * @return [['String']] Html rows
   */
		transformData: function transformData(products) {
			var res = [];
			for (var i in products) {
				var row = [];
				var image = data.getStorageURL() + products[i]['product_image'];
				var id = products[i]['id'];
				row.push('<img src="' + image + '" class="thumbnail" height="50px" width="50px" />');
				row.push(util.minify(products[i]['product_name'], 15));
				row.push(util.minify(products[i]['product_description'], 15));
				row.push(products[i]['product_price']);
				row.push(products[i]['product_quantity']);
				row.push('<button class="btn btn-link edit" id="' + id + '">\
						 	<span class="fa fa-edit"></span>\
						  </button>');
				row.push('<button class="btn btn-link delete" id="' + id + '">\
							<span class="fa fa-trash"></span>\
						  </button>');
				res.push(row);
			}
			return res;
		},

		/**
   * Initialize datatable
   * @param [[String]] rows
   *
   */
		initDatatable: function initDatatable(rows) {
			var vm = this;

			$('#productsTable').DataTable({
				destroy: true,
				aaData: rows,
				paging: true,
				ordering: false,
				searching: false,
				info: false,
				autoWidth: false,
				dom: 'Bfrtip',
				buttons: [{
					text: '<span class="fa fa-plus"></span> Add Products',
					action: function action(e, dt, node, config) {
						vm.$router.push('/products/' + vm.category_id + '/' + vm.subcategory_id + '/add');
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
   * Add event listener on Edit and delete button
   *
   */
		addListener: function addListener() {
			var vm = this;

			//refresh listener on next page
			$('#productsTable_next').click(function () {
				vm.addListener();
			});

			//Add listener on Edit Button
			$('.edit').click(function () {
				var id = $(this).attr('id');
				data.setProduct(vm.getProduct(id));
				vm.$router.push('/products/' + vm.category_id + '/' + vm.subcategory_id + '/edit/' + id);
			});

			//Add Listener on Delete Button
			$('.delete').click(function () {
				vm.product_id = $(this).attr('id');
				util.showModal('#deleteProductModal');
			});
		},

		/**
   * Get Product by Id
   * @param {Int} id Product id
   * @return {Object} Product
   */
		getProduct: function getProduct(id) {
			for (var i in this.products) {
				if (this.products[i].id == id) return this.products[i];
			}return {};
		},

		/**
   * Minify the Category name to fit to the screen
   * @param String category name
   * @return String Minified Category name
   */
		minify: function minify(string) {
			return util.minify(util.unescapeHTML(string), 20);
		}
	},

	watch: {
		category_id: function category_id(id) {
			this.refreshProducts();
		},

		products: function products(val) {
			var rows = this.transformData(val);
			this.initDatatable(rows);
		}
	},

	computed: {
		subcategory_id: function subcategory_id() {
			return this.$route.params.subcategory_id;
		},

		category_id: function category_id() {
			return this.$route.params.category_id;
		},

		subcategories: function subcategories() {
			var subcategories = data.subcategories;
			var res = [];
			for (var i in subcategories) {
				if (subcategories[i].category_id != this.category_id) continue;
				res.push(subcategories[i]);
			}
			return res;
		},

		subcategory_name: function subcategory_name() {
			if (this.subcategory_id == 0) return 'All Subcategories';
			for (var i in this.subcategories) {
				if (this.subcategories[i].id == this.subcategory_id) return this.subcategories[i].subcategory_name;
			}
		},

		products: function products() {
			var products = data.products;
			var res = [];
			for (var i in products) {
				if (this.subcategory_id != 0 && products[i].subcategory_id != this.subcategory_id) continue;
				res.push(products[i]);
			}
			return res;
		}
	}
});

/***/ }),

/***/ 97:
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
            _c("div", { staticClass: "panel panel-heading" }, [
              _c(
                "h4",
                {
                  staticClass: "panel-title",
                  attrs: { "data-toggle": "collapse", href: "#collapse1" }
                },
                [
                  _vm._v(
                    "\r\n\t\t\t\t\t\t" +
                      _vm._s(_vm.minify(_vm.subcategory_name)) +
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
                      "router-link",
                      {
                        staticClass: "list-group-item",
                        attrs: {
                          tag: "li",
                          to: { params: { subcategory_id: 0 } },
                          "active-class": "active"
                        }
                      },
                      [_vm._v("All Subcategories")]
                    ),
                    _vm._v(" "),
                    _vm._l(_vm.subcategories, function(subcategory) {
                      return _c(
                        "li",
                        {
                          staticClass: "list-group-item",
                          class: {
                            active: subcategory.id == _vm.subcategory_id
                          },
                          on: {
                            click: function($event) {
                              _vm.$router.push({
                                params: { subcategory_id: subcategory.id }
                              })
                            }
                          }
                        },
                        [
                          _c(
                            "router-link",
                            {
                              attrs: {
                                tag: "span",
                                to: {
                                  params: { subcategory_id: subcategory.id }
                                }
                              }
                            },
                            [
                              _vm._v(
                                _vm._s(
                                  _vm.minify(subcategory.subcategory_name)
                                ) + "\r\n\t\t\t\t\t\t\t"
                              )
                            ]
                          )
                        ],
                        1
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
        { attrs: { id: "deleteProductModal" } },
        [
          _c("modal-header", [_vm._v("Delete Product")]),
          _vm._v(" "),
          _c("modal-body", [
            _c("p", [_vm._v("Are you sure to delete product?")]),
            _vm._v(" "),
            _c("p", [
              _c("b", [_vm._v("Warning : ")]),
              _vm._v("deleting product can't be undone")
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
                    _vm.deleteProduct(_vm.product_id)
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
    return _c("div", { staticClass: "col-md-9" }, [
      _c("div", { staticClass: "panel panel-default" }, [
        _c("div", { staticClass: "panel-body table-responsive" }, [
          _c(
            "table",
            {
              staticClass: "table table-hover",
              attrs: { id: "productsTable" }
            },
            [
              _c("thead", [
                _c("tr", [
                  _c("th", { attrs: { width: "50px" } }),
                  _vm._v(" "),
                  _c("th", [_vm._v("Name")]),
                  _vm._v(" "),
                  _c("th", [_vm._v("Description")]),
                  _vm._v(" "),
                  _c("th", [_vm._v("Price")]),
                  _vm._v(" "),
                  _c("th", [_vm._v("Quantity")]),
                  _vm._v(" "),
                  _c("th", [_vm._v("Edit")]),
                  _vm._v(" "),
                  _c("th", [_vm._v("Delete")])
                ])
              ])
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
    require("vue-hot-reload-api")      .rerender("data-v-48f9e95e", module.exports)
  }
}

/***/ })

});