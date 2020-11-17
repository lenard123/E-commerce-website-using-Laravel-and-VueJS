<template>
	<div class="container">
		<div class="row" v-if="subcategories.length>0">
			<div class="col-md-3" style="max-width: 250px;">
				<ul class="list-group" >
					<router-link tag="li" class="list-group-item" :to="{params:{subcategory_id:0}}" active-class="active">All Subcategory</router-link>
					<router-link 
						v-for="subcategory in subcategories"
						:key="subcategory.id"
						tag="li"
						:to="{params:{subcategory_id:subcategory.id}}"
						class="list-group-item"
						active-class="active">{{ subcategory.subcategory_name }}
					</router-link>
				</ul>
			</div>
			<div class="col-md-9" v-if="products.length>0">
				<product-card v-for="product in products" :key="product.id" :value="product"></product-card>
			</div>
			<div class="col-md-9" v-else>
				<div class="jumbotron"><h1>No Products</h1></div>
			</div>
		</div>
		<div class="jumbotron" v-else><h1>No Products</h1></div>
	</div>
</template>

<script type="text/javascript">
export default{
	created(){
		this.refreshSubcategories(this.category_id);
	},

	methods:{

		refreshSubcategories: function(id) {
			util.notify('Refreshing Products, please wait', 'loading');
			axios.get(data.getBaseURL()+'api/v1/user/subcategory?id='+id)
				 .then(function(response){
				 	$.notifyClose();
				 	data.setSubcategories(util.getResponse(response));
				 })
				 .catch(function(error){
				 	util.showResult(error);
				 })
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
			return data.getSubcategories();
		},

		subcategory: function() {
			for (var i in this.subcategories) {
				if (this.subcategories[i].id == this.subcategory_id)
					return this.subcategories[i];
			}
			return {};
		},

		products: function() {
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
}
</script>