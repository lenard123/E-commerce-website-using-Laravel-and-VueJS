webpackJsonp([32],{

/***/ 48:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(88)
/* template */
var __vue_template__ = __webpack_require__(89)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\subcategory\\add.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-f6efa2a2", Component.options)
  } else {
    hotAPI.reload("data-v-f6efa2a2", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 88:
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
			category_id: this.$route.params.category_id,

			subcat: {
				name: '',
				description: ''
			},

			submitButton: {
				message: 'Submit',
				loading: false
			}
		};
	}),

	created: function created() {
		$('#subcatForm').ajaxForm();
	},


	methods: {
		/**
   * Go back to Previos page
   * @param Int cat id
   *
   */
		back: function back() {
			this.$router.push('/subcategory/' + this.category_id);
		},

		/** 
   * Submit Form and Add category
   *
   */
		submit: function submit() {
			if (this.submitButton.loading) return;
			var vm = this;
			var notif = util.notify(util.getProgressbarMessage('Adding Subcategory', 0), 'loading');
			this.startLoading();
			$('#subcatForm').ajaxSubmit({
				success: function success(response, status, xhr, $form) {
					if (util.showResult(response, 'ajax')) {
						data.setSubcategories([]);
						vm.back();
					}
					vm.stopLoading();
				},

				error: function error(response) {
					util.showResult(response, 'ajax');
					vm.stopLoading();
				},

				uploadProgress: function uploadProgress(a, b, c, d) {
					notif.update('message', util.getProgressbarMessage('Adding category', d));
				}
			});
		},

		/**
   * Start Loading 
   * Prevent User to continuall submit the form
   *
   */
		startLoading: function startLoading() {
			this.submitButton = {
				message: 'Loading',
				loading: true
			};
		},

		/**
   * Stop Loading
   * 
   */
		stopLoading: function stopLoading() {
			this.submitButton = {
				message: 'Submit',
				loading: false
			};
		},

		/**
   * Unescape HTML
   * Example : &lt;h1&gt; -> <h1>
   * @param String 
   */
		unescapeHTML: function unescapeHTML(string) {
			return util.unescapeHTML(string);
		},

		/**
   * Change Params Category id
   * //subcategory/:category_id/add
   * @param Int Id
   */
		changeId: function changeId(id) {
			this.$router.push({ params: { category_id: id } });
		}
	},

	computed: {
		categories: function categories() {
			return data.categories;
		}
	}
});

/***/ }),

/***/ 89:
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
              action: _vm.baseURL + "api/v1/subcategory",
              id: "subcatForm",
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
            _c(
              "div",
              { staticClass: "col-md-4" },
              [
                _c("uploader", {
                  attrs: {
                    fileId: "subcategoryImageFile",
                    fileName: "subcategory_image",
                    imageId: "selectedImage"
                  }
                })
              ],
              1
            ),
            _vm._v(" "),
            _c("div", { staticClass: "col-md-8" }, [
              _c("div", { staticClass: "form-group" }, [
                _c("label", [_vm._v("Select Category")]),
                _vm._v(" "),
                _c(
                  "select",
                  {
                    directives: [
                      {
                        name: "model",
                        rawName: "v-model",
                        value: _vm.category_id,
                        expression: "category_id"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { name: "category_id", required: "" },
                    on: {
                      change: [
                        function($event) {
                          var $$selectedVal = Array.prototype.filter
                            .call($event.target.options, function(o) {
                              return o.selected
                            })
                            .map(function(o) {
                              var val = "_value" in o ? o._value : o.value
                              return val
                            })
                          _vm.category_id = $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        },
                        function($event) {
                          _vm.changeId(_vm.category_id)
                        }
                      ]
                    }
                  },
                  [
                    _c("option", { attrs: { value: "0", disabled: "" } }, [
                      _vm._v("--- No Categories Selected ---")
                    ]),
                    _vm._v(" "),
                    _vm._l(_vm.categories, function(category) {
                      return _c(
                        "option",
                        { domProps: { value: category.id } },
                        [
                          _vm._v(
                            "\r\n\t\t\t\t\t\t\t" +
                              _vm._s(_vm.unescapeHTML(category.category_name)) +
                              "\r\n\t\t\t\t\t\t"
                          )
                        ]
                      )
                    })
                  ],
                  2
                )
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", [_vm._v("Name")]),
                _vm._v(" "),
                _c("input", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.subcat.name,
                      expression: "subcat.name"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: {
                    type: "text",
                    name: "subcategory_name",
                    required: ""
                  },
                  domProps: { value: _vm.subcat.name },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.subcat, "name", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", [_vm._v("Description")]),
                _vm._v(" "),
                _c("textarea", {
                  directives: [
                    {
                      name: "model",
                      rawName: "v-model",
                      value: _vm.subcat.description,
                      expression: "subcat.description"
                    }
                  ],
                  staticClass: "form-control",
                  attrs: { name: "subcategory_description" },
                  domProps: { value: _vm.subcat.description },
                  on: {
                    input: function($event) {
                      if ($event.target.composing) {
                        return
                      }
                      _vm.$set(_vm.subcat, "description", $event.target.value)
                    }
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "pull-right" }, [
                _c("input", {
                  staticClass: "btn btn-primary",
                  class: { disabled: _vm.submitButton.loading },
                  attrs: { type: "submit" },
                  domProps: { value: _vm.submitButton.message }
                }),
                _vm._v(" "),
                _c("input", {
                  staticClass: "btn btn-default",
                  attrs: { type: "button", value: "Back" },
                  on: {
                    click: function($event) {
                      _vm.back()
                    }
                  }
                })
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
    require("vue-hot-reload-api")      .rerender("data-v-f6efa2a2", module.exports)
  }
}

/***/ })

});