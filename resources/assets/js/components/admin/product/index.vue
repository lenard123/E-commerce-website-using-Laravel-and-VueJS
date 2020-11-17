<template>
<div class="row">
	<div class="col-md-3">
		<div class="panel-group">
			<div class="panel panel-default">
				<div class="panel panel-heading">
					<h4 class="panel-title" data-toggle="collapse" href="#collapse1">
						{{ minify(subcategory_name) }}
					</h4>
				</div>
				<div id="collapse1" class="panel-collapse collapse">
					<ul class="list-group">
						<router-link 
							class="list-group-item"
							tag="li"
							:to="{params:{subcategory_id:0}}"
							active-class="active">All Subcategories</router-link>
						<li 
							v-for="subcategory in subcategories" 
							class="list-group-item" 
							:class="{'active':subcategory.id==subcategory_id}"
							@click="$router.push({params:{subcategory_id:subcategory.id}})">
							<router-link 
								tag="span"
								:to="{params:{subcategory_id:subcategory.id}}">{{minify(subcategory.subcategory_name) }}
							</router-link>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	<div class="col-md-9">
		<div class="panel panel-default">
			<div class="panel-body table-responsive">
				<table class="table table-hover" id="productsTable">
					<thead>
						<tr>
							<th width="50px"></th>
							<th>Name</th>
							<th>Description</th>
							<th>Price</th>
							<th>Quantity</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>
				</table>
			</div>
		</div>
	</div>
	<modal id="deleteProductModal">
		<modal-header>Delete Product</modal-header>
		<modal-body>
			<p>Are you sure to delete product?</p>
			<p><b>Warning : </b>deleting product can't be undone</p>
		</modal-body>
		<modal-footer>
			<button class="btn btn-danger" @click="deleteProduct(product_id)">Delete</button>
			<button class="btn btn-default" data-dismiss="modal">Cancel</button>
		</modal-footer>
	</modal>
</div>
</template>

<script type="text/javascript">
export default{
	data: function() {
		return {
			err: 3,
			product_id: 0
		}
	},

	created() {
		if (this.subcategories.length < 1)
			this.refreshSubcategories();
		else
			this.refreshProducts();
	},

	methods: {
		/**
		 * Delete Product
		 * @param {Int} product id
		 */
		deleteProduct: function(id) {
			var vm = this;
			util.hideModal('#deleteProductModal');
			util.notify('Deleting product...', 'loading');
			axios.delete(data.getBaseURL()+'api/v1/product/'+id)
				.then(function(response){
					$.notifyClose();
					if (util.showResult(response)) 
						vm.refreshProducts();
				})
				.catch(function(error){
					util.showResult(error);
				})
		},

		/**
		 * Refresh Product list
		 *
		 */
		refreshProducts: function() {
			var vm = this;
			var baseURL = data.getBaseURL();
			util.notify('Refreshing Products', 'loading');
			axios.get(baseURL+'api/v1/product?id='+this.category_id).then(function(response){
				$.notifyClose();
				vm.err = 3;
				data.setProducts(response.data);
				if (response.data.length < 1) {
					vm.$nextTick(function(){
						$.notifyClose();
						var rows = this.transformData(this.products);
						this.initDatatable(rows);
					});	
				}
			}).catch(function(error){
				if (vm.err > 0) {
					vm.err--;
					vm.refreshProducts();
				} else {
					util.showResult(error);
				}
			})
		},

		/**
		 * Get subcategories
		 *
		 */
		refreshSubcategories: function() {
			var vm = this;
			util.notify('Refreshing Products', 'loading');
			axios.get(data.getBaseURL()+'api/v1/subcategory')
				.then(function (response) {
					$.notifyClose();
					data.setSubcategories(response.data);
					vm.err = 3;
					if (response.data.length < 1) {
						vm.$nextTick(function(){
							$.notifyClose();
							var rows = this.transformData(this.products);
							this.initDatatable(rows);
						}); 
					} else {
						vm.refreshProducts();
					}
				})
				.catch(function (error) {
					if (vm.err > 0) {
						vm.err--;
						vm.refreshSubcategories();
					} else {
						util.showResult(error);
					}
				})
		},

		/**
		 * Transform Data to HTML rows
		 * @param [{Object}] Products
		 * @return [['String']] Html rows
		 */
		transformData: function(products) {
			var res = [];
			for (var i in products) {
				var row = [];
				var image = data.getStorageURL()+products[i]['product_image'];
				var id = products[i]['id'];
				row.push('<img src="'+image+'" class="thumbnail" height="50px" width="50px" />');
				row.push(util.minify(products[i]['product_name'], 15));
				row.push(util.minify(products[i]['product_description'], 15));
				row.push(products[i]['product_price']);
				row.push(products[i]['product_quantity']);
				row.push('<button class="btn btn-link edit" id="'+id+'">\
						 	<span class="fa fa-edit"></span>\
						  </button>');
				row.push('<button class="btn btn-link delete" id="'+id+'">\
							<span class="fa fa-trash"></span>\
						  </button>')
				res.push(row);
			}
			return res;
		},

		/**
		 * Initialize datatable
		 * @param [[String]] rows
		 *
		 */
		initDatatable: function(rows) {
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
				buttons:[
					{
						text: '<span class="fa fa-plus"></span> Add Products',
						action: function(e, dt, node, config) {
							vm.$router.push(`/products/${vm.category_id}/${vm.subcategory_id}/add`);
						},
						className: 'btn btn-success'
					},
					{
						text: '<span class="fa fa-refresh"></span> Refresh',
						className: 'btn btn-primary',
						action: function(a, b, c, d, e) {
							vm.refreshSubcategories();
						}
					}
				]
			})

			this.addListener();
		},

		/**
		 * Add event listener on Edit and delete button
		 *
		 */
		addListener: function() {
			var vm = this;

			//refresh listener on next page
			$('#productsTable_next').click(function(){
				vm.addListener();
			})

			//Add listener on Edit Button
			$('.edit').click(function(){
				var id = $(this).attr('id');
				data.setProduct(vm.getProduct(id));
				vm.$router.push(`/products/${vm.category_id}/${vm.subcategory_id}/edit/${id}`);
			})

			//Add Listener on Delete Button
			$('.delete').click(function(){
				vm.product_id = $(this).attr('id');
				util.showModal('#deleteProductModal')
			})
		},

		/**
		 * Get Product by Id
		 * @param {Int} id Product id
		 * @return {Object} Product
		 */
		getProduct: function(id) {
			for (var i in this.products) 
				if (this.products[i].id == id)
					return this.products[i];
			return {};
		},

		/**
		 * Minify the Category name to fit to the screen
		 * @param String category name
		 * @return String Minified Category name
		 */
		minify: function(string) {
			return util.minify(util.unescapeHTML(string), 20);
		}
	},

	watch: {
		category_id: function(id) {
			this.refreshProducts();
		},

		products: function(val) {
			var rows = this.transformData(val);
			this.initDatatable(rows);
		}
	},

	computed: {
		subcategory_id: function() {
			return this.$route.params.subcategory_id;
		},

		category_id: function() {
			return this.$route.params.category_id;
		},

		subcategories: function() {
			var subcategories = data.subcategories;
			var res = [];
			for (var i in subcategories) {
				if (subcategories[i].category_id != this.category_id) continue;
				res.push(subcategories[i]);
			}
			return res;
		},

		subcategory_name: function() {
			if (this.subcategory_id == 0) return 'All Subcategories';
			for (var i in this.subcategories)
				if (this.subcategories[i].id == this.subcategory_id)
					return this.subcategories[i].subcategory_name;
		},


		products: function() {
			var products = data.products;
			var res = [];
			for (var i in products) {
				if (this.subcategory_id != 0 && products[i].subcategory_id != this.subcategory_id) continue;
				res.push(products[i]);
			}
			return res;
		}
	}
}
</script>