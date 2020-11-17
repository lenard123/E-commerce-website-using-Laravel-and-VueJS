<template>
<div class="panel panel-default col-md-8 col-md-offset-2">
	<div class="panel-body">
		<form 
			@submit.prevent="submit()"
			:action="baseURL+'api/v1/product/'+product_id"
			method="POST"
			id="productForm"
			enctype="mutlipart/form-data"
			class="row">

			<input type="hidden" name="_method" value="PUT" />

			<div class="col-md-4">
				<uploader fileName="product_image" :imageSrc="storageURL+product.product_image" />
			</div>

			<div class="col-md-8">
				
				<div class="form-group">
					<label>Select Subcategory</label>
					<select class="form-control" name="subcategory_id" v-model="product.subcategory_id" required>
						<option value="0" disabled>-- No Subcategory Selected --</option>
						<option v-for="subcategory in subcategories" :value="subcategory.id">
							{{ minify(subcategory.subcategory_name) }}
						</option>
					</select>
				</div>

				<div class="form-group">
					<label>Product Name</label>
					<input 
						type="text" 
						name="product_name" 
						class="form-control" 
						v-model="product_name" 
						required/>
				</div>

				<div class="form-group">
					<label>Description</label>
					<textarea name="product_description" class="form-control">{{ minify(product.product_description) }}</textarea>
				</div>

				<div class="form-group">
					<label>Price</label>
					<input 
						type="text" 
						name="product_price" 
						class="form-control" 
						v-model="product.product_price" 
						required/>
				</div>

				<div class="form-group">
					<label>Quantity</label>
					<div class="input-group">
						<div class="input-group-btn">
							<span @click="product_quantity--" class="btn btn-info">
								<i class="fa fa-minus"></i>
							</span>
						</div>
						<div class="form-control" style="text-align: center;">
							<input type="hidden" name="product_quantity" v-model="product_quantity">
							<b><span>{{ product_quantity }}</span> in stock</b>
						</div>
						<div class="input-group-btn">
							<span class="btn btn-info" @click="product_quantity++">
								<i class="fa fa-plus"></i>
							</span>
						</div>
					</div>
				</div>

				<div class="pull-right">
					<input 
						type="submit" 
						class="btn btn-primary" 
						:value="submitButton.message"
						:class="{'disabled':submitButton.loading}"/>
					<input type="button" class="btn btn-default" value="Back" @click="back()"/>
				</div>
			</div>
		</form>
	</div>
</div>
</template>

<script type="text/javascript">
export default{
	data: function() {
		return {
			baseURL: data.getBaseURL(),
			storageURL: data.getStorageURL(),
			product_id: this.$route.params.product_id,
			submitButton: {
				loading: false,
				message: 'Submit'
			}
		}
	},

	created(){
		if (!data.getProduct().id)
			this.getProduct(this.product_id);
	},

	methods: {
		/**
		 * Get product
		 * @param {Int} Product id
		 *
		 */
		getProduct: function(id) {
			var vm = this;
			util.notify('Getting information', 'loading')
			axios.get(this.baseURL+'api/v1/product/'+id)
				.then(function(response){
					vm.stopLoading();
					data.setProduct(response.data);
				})
				.catch(function(response){
					vm.stopLoading();
					util.showResult(response);
				})
		},

		/**
		 * Start Loading
		 * 
		 */
		startLoading: function() {
			this.submitButton = {
				loading: true,
				message: 'Loading...'
			}
		},

		/**
		 * Stop Loading
		 *
		 */
		stopLoading: function() {
			$.notifyClose();
			this.submitButton = {
				loading: false,
				message: 'Submit'
			}
		},

		/**
		 * Back to previous page
		 * 
		 */
		back: function() {
			this.$router.push(`/products/${this.category_id}/${this.subcategory_id}`);
		},

		submit: function() {
			if (this.submitButton.loading) return;
			var vm = this;
			this.startLoading();
			var notif = util.notify('Updating categories', 'loading');
			$('#productForm').ajaxSubmit({
				success: function(response, status, xhr, $form) {
					vm.stopLoading();
					if (util.showResult(response, 'ajax'))
						vm.back();
				},

				error: function(response) {
					vm.stopLoading();
					util.showResult(response, 'ajax');
				},

				uploadProgress: function(a, b, c, d) {
					notif.update('message', util.getProgressbarMessage('Updating category', d));
				}
			})
		},

    	/**
    	 * Unescape HTML
    	 * @param "String" html
    	 * @return "String" unescaped html
    	 */
    	minify: function(html) {
    		return util.unescapeHTML(html);
    	}
	},

	computed: {
		category_id: function() {
			return this.$route.params.category_id;
		},

		subcategory_id: function() {
			return this.$route.params.subcategory_id;
		},

		subcategories: function() {
			var subcategories = [];
			for (var i in data.getSubcategories()) {
				if (data.getSubcategories()[i]['category_id'] == this.category_id)
					subcategories.push(data.getSubcategories()[i]);
			}
			return subcategories;
		},

		product: function() {
			return data.getProduct();
		},

		product_quantity: {
			get: function() {
				return data.getProduct().product_quantity ? data.getProduct().product_quantity : 0;
			},
			set: function(value) {
				if (value < 1)
					data.getProduct().product_quantity = 0;
				else
					data.getProduct().product_quantity = value;
			}
		},

		product_name: {
			get: function() {
				return this.minify(this.product.product_name);
			},
			set: function(val) {
				this.product.product_name = val;
			}
		}
	}
}
</script>