webpackJsonp([10],{100:function(t,a,e){"use strict";Object.defineProperty(a,"__esModule",{value:!0}),a.default={data:function(t){function a(){return t.apply(this,arguments)}return a.toString=function(){return t.toString()},a}(function(){return{baseURL:data.getBaseURL(),storageURL:data.getStorageURL(),product_id:this.$route.params.product_id,submitButton:{loading:!1,message:"Submit"}}}),created:function(){data.getProduct().id||this.getProduct(this.product_id)},methods:{getProduct:function(t){var a=this;util.notify("Getting information","loading"),axios.get(this.baseURL+"api/v1/product/"+t).then(function(t){a.stopLoading(),data.setProduct(t.data)}).catch(function(t){a.stopLoading(),util.showResult(t)})},startLoading:function(){this.submitButton={loading:!0,message:"Loading..."}},stopLoading:function(){$.notifyClose(),this.submitButton={loading:!1,message:"Submit"}},back:function(){this.$router.push("/products/"+this.category_id+"/"+this.subcategory_id)},submit:function(){if(!this.submitButton.loading){var t=this;this.startLoading();var a=util.notify("Updating categories","loading");$("#productForm").ajaxSubmit({success:function(a,e,o,i){t.stopLoading(),util.showResult(a,"ajax")&&t.back()},error:function(a){t.stopLoading(),util.showResult(a,"ajax")},uploadProgress:function(t,e,o,i){a.update("message",util.getProgressbarMessage("Updating category",i))}})}},minify:function(t){return util.unescapeHTML(t)}},computed:{category_id:function(){return this.$route.params.category_id},subcategory_id:function(){return this.$route.params.subcategory_id},subcategories:function(){var t=[];for(var a in data.getSubcategories())data.getSubcategories()[a].category_id==this.category_id&&t.push(data.getSubcategories()[a]);return t},product:function(){return data.getProduct()},product_quantity:{get:function(){return data.getProduct().product_quantity?data.getProduct().product_quantity:0},set:function(t){data.getProduct().product_quantity=t<1?0:t}},product_name:{get:function(){return this.minify(this.product.product_name)},set:function(t){this.product.product_name=t}}}}},101:function(t,a){t.exports={render:function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"panel panel-default col-md-8 col-md-offset-2"},[e("div",{staticClass:"panel-body"},[e("form",{staticClass:"row",attrs:{action:t.baseURL+"api/v1/product/"+t.product_id,method:"POST",id:"productForm",enctype:"mutlipart/form-data"},on:{submit:function(a){return a.preventDefault(),t.submit()}}},[e("input",{attrs:{type:"hidden",name:"_method",value:"PUT"}}),t._v(" "),e("div",{staticClass:"col-md-4"},[e("uploader",{attrs:{fileName:"product_image",imageSrc:t.storageURL+t.product.product_image}})],1),t._v(" "),e("div",{staticClass:"col-md-8"},[e("div",{staticClass:"form-group"},[e("label",[t._v("Select Subcategory")]),t._v(" "),e("select",{directives:[{name:"model",rawName:"v-model",value:t.product.subcategory_id,expression:"product.subcategory_id"}],staticClass:"form-control",attrs:{name:"subcategory_id",required:""},on:{change:function(a){var e=Array.prototype.filter.call(a.target.options,function(t){return t.selected}).map(function(t){return"_value"in t?t._value:t.value});t.$set(t.product,"subcategory_id",a.target.multiple?e:e[0])}}},[e("option",{attrs:{value:"0",disabled:""}},[t._v("-- No Subcategory Selected --")]),t._v(" "),t._l(t.subcategories,function(a){return e("option",{domProps:{value:a.id}},[t._v("\n\t\t\t\t\t\t\t"+t._s(t.minify(a.subcategory_name))+"\n\t\t\t\t\t\t")])})],2)]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",[t._v("Product Name")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.product_name,expression:"product_name"}],staticClass:"form-control",attrs:{type:"text",name:"product_name",required:""},domProps:{value:t.product_name},on:{input:function(a){a.target.composing||(t.product_name=a.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",[t._v("Description")]),t._v(" "),e("textarea",{staticClass:"form-control",attrs:{name:"product_description"}},[t._v(t._s(t.minify(t.product.product_description)))])]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",[t._v("Price")]),t._v(" "),e("input",{directives:[{name:"model",rawName:"v-model",value:t.product.product_price,expression:"product.product_price"}],staticClass:"form-control",attrs:{type:"text",name:"product_price",required:""},domProps:{value:t.product.product_price},on:{input:function(a){a.target.composing||t.$set(t.product,"product_price",a.target.value)}}})]),t._v(" "),e("div",{staticClass:"form-group"},[e("label",[t._v("Quantity")]),t._v(" "),e("div",{staticClass:"input-group"},[e("div",{staticClass:"input-group-btn"},[e("span",{staticClass:"btn btn-info",on:{click:function(a){t.product_quantity--}}},[e("i",{staticClass:"fa fa-minus"})])]),t._v(" "),e("div",{staticClass:"form-control",staticStyle:{"text-align":"center"}},[e("input",{directives:[{name:"model",rawName:"v-model",value:t.product_quantity,expression:"product_quantity"}],attrs:{type:"hidden",name:"product_quantity"},domProps:{value:t.product_quantity},on:{input:function(a){a.target.composing||(t.product_quantity=a.target.value)}}}),t._v(" "),e("b",[e("span",[t._v(t._s(t.product_quantity))]),t._v(" in stock")])]),t._v(" "),e("div",{staticClass:"input-group-btn"},[e("span",{staticClass:"btn btn-info",on:{click:function(a){t.product_quantity++}}},[e("i",{staticClass:"fa fa-plus"})])])])]),t._v(" "),e("div",{staticClass:"pull-right"},[e("input",{staticClass:"btn btn-primary",class:{disabled:t.submitButton.loading},attrs:{type:"submit"},domProps:{value:t.submitButton.message}}),t._v(" "),e("input",{staticClass:"btn btn-default",attrs:{type:"button",value:"Back"},on:{click:function(a){return t.back()}}})])])])])])},staticRenderFns:[]}},55:function(t,a,e){var o=e(0)(e(100),e(101),!1,null,null,null);t.exports=o.exports}});