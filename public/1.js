webpackJsonp([1],{

/***/ 38:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(70)
/* template */
var __vue_template__ = __webpack_require__(71)
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
Component.options.__file = "resources\\assets\\js\\components\\index\\product.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-56d33b9e", Component.options)
  } else {
    hotAPI.reload("data-v-56d33b9e", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 70:
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

/* harmony default export */ __webpack_exports__["default"] = ({
	created: function created() {
		this.refreshSubcategories(this.category_id);
	},


	methods: {

		refreshSubcategories: function refreshSubcategories(id) {
			util.notify('Refreshing Products, please wait', 'loading');
			axios.get(data.getBaseURL() + 'api/v1/user/subcategory?id=' + id).then(function (response) {
				$.notifyClose();
				data.setSubcategories(util.getResponse(response));
			}).catch(function (error) {
				util.showResult(error);
			});
		}
	},

	computed: {
		category_id: function category_id() {
			return this.$route.params.category_id;
		},

		subcategory_id: function subcategory_id() {
			return this.$route.params.subcategory_id;
		},

		subcategories: function subcategories() {
			return data.getSubcategories();
		},

		subcategory: function subcategory() {
			for (var i in this.subcategories) {
				if (this.subcategories[i].id == this.subcategory_id) return this.subcategories[i];
			}
			return {};
		},

		products: function products() {
			if (this.subcategory_id == 0) {
				var products = [];
				for (var i in this.subcategories) {
					products = products.concat(this.subcategories[i].products);
				}
				return products;
			}

			return this.subcategory.products ? this.subcategory.products : [];
		}
	}
});

/***/ }),

/***/ 71:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c("div", { staticClass: "container" }, [
    _vm.subcategories.length > 0
      ? _c("div", { staticClass: "row" }, [
          _c(
            "div",
            { staticClass: "col-md-3", staticStyle: { "max-width": "250px" } },
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
                    [_vm._v("All Subcategory")]
                  ),
                  _vm._v(" "),
                  _vm._l(_vm.subcategories, function(subcategory) {
                    return _c(
                      "router-link",
                      {
                        key: subcategory.id,
                        staticClass: "list-group-item",
                        attrs: {
                          tag: "li",
                          to: { params: { subcategory_id: subcategory.id } },
                          "active-class": "active"
                        }
                      },
                      [
                        _vm._v(
                          _vm._s(subcategory.subcategory_name) + "\n\t\t\t\t"
                        )
                      ]
                    )
                  })
                ],
                2
              )
            ]
          ),
          _vm._v(" "),
          _vm.products.length > 0
            ? _c(
                "div",
                { staticClass: "col-md-9" },
                _vm._l(_vm.products, function(product) {
                  return _c("product-card", {
                    key: product.id,
                    attrs: { value: product }
                  })
                })
              )
            : _c("div", { staticClass: "col-md-9" }, [_vm._m(0)])
        ])
      : _c("div", { staticClass: "jumbotron" }, [
          _c("h1", [_vm._v("No Products")])
        ])
  ])
}
var staticRenderFns = [
  function() {
    var _vm = this
    var _h = _vm.$createElement
    var _c = _vm._self._c || _h
    return _c("div", { staticClass: "jumbotron" }, [
      _c("h1", [_vm._v("No Products")])
    ])
  }
]
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-56d33b9e", module.exports)
  }
}

/***/ })

});