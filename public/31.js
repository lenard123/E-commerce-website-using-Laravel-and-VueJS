webpackJsonp([31],{

/***/ 49:
/***/ (function(module, exports, __webpack_require__) {

var disposed = false
var normalizeComponent = __webpack_require__(0)
/* script */
var __vue_script__ = __webpack_require__(90)
/* template */
var __vue_template__ = __webpack_require__(91)
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
Component.options.__file = "resources\\assets\\js\\components\\admin\\subcategory\\edit.vue"

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-8f776328", Component.options)
  } else {
    hotAPI.reload("data-v-8f776328", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

module.exports = Component.exports


/***/ }),

/***/ 90:
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
			subcategory: data.getSubcategory(),

			subcategory_id: this.$route.params.subcategory_id,

			submitButton: {
				message: 'Submit',
				loading: false
			}
		};
	}),

	created: function created() {
		$('#subcatform').ajaxForm();
		if (!this.subcategory.id) {
			this.subcategory = {
				id: 0,
				subcategory_image: '#',
				subcategory_name: '',
				subcategory_description: ''
			};
			this.getSubcategory(this.subcategory_id);
		}
	},


	methods: {

		/**
   * Update Subcategory
   * 
   */
		submit: function submit() {
			if (this.submitButton.loading) return;
			var notif = util.notify(util.getProgressbarMessage('Updating subcategory', 0), 'loading');
			this.startLoading();
			var vm = this;
			$('#subcatform').ajaxSubmit({
				success: function success(response, status, xhr, $form) {
					vm.stopLoading();
					if (util.showResult(response, 'ajax')) {
						data.setSubcategories([]);
						$('#back').click();
					}
				},

				error: function error(response) {
					vm.stopLoading();
					util.showResult(response, 'ajax');
				},

				uploadProgress: function uploadProgress(a, b, c, d) {
					notif.update('message', util.getProgressbarMessage('Updating category', d));
				}
			});
		},

		/**
   * Get category
   * @param (int) Subcategory id
   * @return {Object} Subcategory
   */
		getSubcategory: function getSubcategory(id) {
			var vm = this;
			this.startLoading();
			util.notify('Getting information', 'loading');
			axios.get(this.baseURL + 'api/v1/subcategory/' + id).then(function (response) {
				vm.stopLoading();
				vm.subcategory = response.data;
			}).catch(function (error) {
				vm.stopLoading();
				util.showResult(error);
			});
		},

		/**
   * Start Loading
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
			$.notifyClose();
			this.submitButton = {
				message: 'Submit',
				loading: false
			};
		},

		/**
   * unescape html characters
   * @param 'String' html
   * @return 'String' decoded html
   */
		unescapeHTML: function unescapeHTML(html) {
			return util.unescapeHTML(html);
		}
	},

	computed: {
		categories: function categories() {
			return data.categories;
		}
	}
});

/***/ }),

/***/ 91:
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
              action: _vm.baseURL + "api/v1/subcategory/" + _vm.subcategory_id,
              id: "subcatform",
              method: "POST",
              enctype: "multipart/form-data"
            },
            on: {
              submit: function($event) {
                $event.preventDefault()
                return _vm.submit($event)
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
                    fileName: "subcategory_image",
                    imageSrc: _vm.storageURL + _vm.subcategory.subcategory_image
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
                        value: _vm.subcategory.category_id,
                        expression: "subcategory.category_id"
                      }
                    ],
                    staticClass: "form-control",
                    attrs: { name: "category_id" },
                    on: {
                      change: function($event) {
                        var $$selectedVal = Array.prototype.filter
                          .call($event.target.options, function(o) {
                            return o.selected
                          })
                          .map(function(o) {
                            var val = "_value" in o ? o._value : o.value
                            return val
                          })
                        _vm.$set(
                          _vm.subcategory,
                          "category_id",
                          $event.target.multiple
                            ? $$selectedVal
                            : $$selectedVal[0]
                        )
                      }
                    }
                  },
                  [
                    _c("option", { attrs: { value: "0", disabled: "" } }, [
                      _vm._v("-- No Category Selected--")
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
                  staticClass: "form-control",
                  attrs: { type: "text", name: "subcategory_name" },
                  domProps: {
                    value: _vm.unescapeHTML(_vm.subcategory.subcategory_name)
                  }
                })
              ]),
              _vm._v(" "),
              _c("div", { staticClass: "form-group" }, [
                _c("label", [_vm._v("Description")]),
                _vm._v(" "),
                _c(
                  "textarea",
                  {
                    staticClass: "form-control",
                    attrs: { name: "subcategory_description" }
                  },
                  [
                    _vm._v(
                      _vm._s(
                        _vm.unescapeHTML(
                          _vm.subcategory.subcategory_description
                        )
                      )
                    )
                  ]
                )
              ]),
              _vm._v(" "),
              _c(
                "div",
                { staticClass: "pull-right" },
                [
                  _c("input", {
                    staticClass: "btn btn-primary",
                    class: { disabled: _vm.submitButton.loading },
                    attrs: { type: "submit" },
                    domProps: { value: _vm.submitButton.message }
                  }),
                  _vm._v(" "),
                  _c(
                    "router-link",
                    {
                      staticClass: "btn btn-default",
                      attrs: {
                        to: {
                          path: "/subcategory/" + _vm.subcategory.category_id
                        },
                        id: "back",
                        tag: "button"
                      }
                    },
                    [_vm._v("\r\n\t\t\t\t\t\tBack\r\n\t\t\t\t\t")]
                  )
                ],
                1
              )
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
    require("vue-hot-reload-api")      .rerender("data-v-8f776328", module.exports)
  }
}

/***/ })

});