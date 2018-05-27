webpackJsonp([18],{

/***/ 47:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(86)
/* template */
var __vue_template__ = __webpack_require__(87)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\category\\edit.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-17428454", Component.options)
  } else {
    hotAPI.reload("data-v-17428454", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 86:
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
			baseURL: data.getBaseURL(),
			storageURL: data.getStorageURL(),
			id: this.$route.params.category_id,
			submitButton: {
				loading: false,
				message: 'Submit'
			}
		};
	}),

	created: function created() {
		$('#catForm').ajaxForm();
		if (!data.getCategory().id) this.getCategory(this.id);
	},


	methods: {
		back: function back() {
			//data.getCategories() = this.escapeHTML(this.category)
			this.$router.push('/category');
		},

		/**
   * Update Category
   *
   */
		submit: function submit() {
			if (this.submitButton.loading) return;
			var notif = util.notify(util.getProgressbarMessage('Updating category', 0), 'loading');
			this.startLoading();
			var vm = this;
			$('#catForm').ajaxSubmit({
				success: function success(response, status, xhr, $form) {
					vm.stopLoading();
					if (util.showResult(response, 'ajax')) {
						data.setCategories([]);
						vm.back();
					}
				},

				error: function error(response) {
					util.showResult(response, 'ajax');
					vm.stopLoading();
				},

				uploadProgress: function uploadProgress(a, b, c, d) {
					notif.update('message', util.getProgressbarMessage('Updating category', d));
				}

			});
		},

		/**
   * Get Category 
   * @param Int $id Category id
   * @return Object Category
   */
		getCategory: function getCategory(id) {
			var vm = this;
			util.notify('Loading please wait', 'loading');
			axios.get(this.baseURL + 'api/v1/category/' + id).then(function (response) {
				util.log(response);
				vm.stopLoading();
				data.setCategory(response.data);
			}).catch(function (response) {
				vm.stopLoading();
				util.showResult(response);
			});
		},

		/**
   * Start Loading
   *
   */
		startLoading: function startLoading() {
			this.submitButton = {
				loading: true,
				message: 'Loading'
			};
		},

		/**
   * Stop Loading
   *
   */
		stopLoading: function stopLoading() {
			$.notifyClose();
			this.submitButton = {
				loading: false,
				message: 'Submit'
			};
		},

		/**
   * Unescape HTML
   * @param Object subcategory
   * @return Object unescape html
   */
		unescapeHTML: function unescapeHTML(subcategory) {
			return util.unescapeHTML(subcategory);
		}
	},

	computed: {
		category: function category() {
			return data.getCategory();
		}
	}
});

/***/ }),

/***/ 87:
/***/ (function(module, exports, __webpack_require__) {

var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { staticClass: "panel panel-default col-md-8 col-md-offset-2" },
    [
      _c("div", { staticClass: "panel-body" }, [
        _c(
          "form",
          {
            staticClass: "row",
            attrs: {
              action: _vm.baseURL + "api/v1/category/" + _vm.id,
              id: "catForm",
              enctype: "multipart/form-data",
              method: "POST"
            },
            on: {
              submit: function($event) {
                $event.preventDefault()
                _vm.submit()
              }
            }
          },
          [
            _c("input", {
              attrs: { type: "hidden", name: "_method", value: "PUT" }
            }),
            _vm._v(" "),
            _c(
              "div",
              { staticClass: "col-md-4" },
              [
                _c("uploader", {
                  attrs: {
                    fileId: "categoryImageFile",
                    fileName: "category_image",
                    imageId: "selectedCategoryImage",
                    imageSrc: _vm.storageURL + _vm.category.category_image
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "col-md-8" }, [
              _c("div", { staticClass: "form-group" }, [
                _c("label", [_vm._v("Category Name")]),
                _vm._v(" "),
                _c("input", {
                  staticClass: "form-control",
                  attrs: { type: "text", name: "category_name", required: "" },
                  domProps: {
                    value: _vm.unescapeHTML(_vm.category.category_name)
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", [_vm._v("Category Description")]),
                _vm._v(" "),
                _c(
                  "textarea",
                  {
                    staticClass: "form-control",
                    staticStyle: { height: "100%" },
                    attrs: { name: "category_description" }
                  },
                  [
                    _vm._v(
                      _vm._s(
                        _vm.unescapeHTML(_vm.category.category_description)
                      )
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group pull-right" }, [
                _c(
                  "button",
                  {
                    staticClass: "btn btn-primary",
                    class: { disabled: _vm.submitButton.loading },
                    attrs: { type: "submit" }
                  },
                  [_vm._v(_vm._s(_vm.submitButton.message))]
                ),
                _vm._v(" "),
                _c(
                  "span",
                  {
                    staticClass: "btn btn-default",
                    on: {
                      click: function($event) {
                        _vm.back()
                      }
                    }
                  },
                  [_vm._v("Back")]
                )
              ])
            ])
          ]
        )
      ])
    ]
  )
}
var staticRenderFns = []
render._withStripped = true
module.exports = { render: render, staticRenderFns: staticRenderFns }
if (false) {
  module.hot.accept()
  if (module.hot.data) {
    require("vue-hot-reload-api")      .rerender("data-v-17428454", module.exports)
  }
}

/***/ })

});