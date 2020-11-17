<template>
<div class="panel panel-default col-md-8 col-md-offset-2">
	<div class="panel-body table-responsive">
		<table class="table table-hover" id="categories">
			<thead>
				<tr>
					<th width="50px"></th>
					<th>Name</th>
					<th>Description</th>
					<th>Edit</th>
					<th>Delete</th>
				</tr>
			</thead>
			<tbody>
			</tbody>
		</table>
	</div>
	<modal id="deleteCategoryModal">
		<modal-header>Delete Category</modal-header>
		<modal-body>
			<p><b>Warning :</b> Deleting category will also delete Subcategory and products under it</p>
		</modal-body>
		<modal-footer>
			<button class="btn btn-danger" v-on:click="deleteCategory(getCategoryId())">Delete</button>
			<button class="btn btn-default" data-dismiss="modal">Cancel</button>
		</modal-footer>
	</modal>
</div>
</template>

<script>
export default {
	data: function() {
		return {
			categoryId:0
		}
	},

	created() {
		if(this.categories.length < 1)
			this.refreshCategories();
		else 
			this.$nextTick(function(){
				var rows = this.transformData(this.categories)
				this.initDatatable(rows);
			});		
	},

	methods: {

		/**
		 * Refresh categories
		 * 
		 * @return Object[] categories
		 */
		refreshCategories: function() {
			var vm = this;
			util.notify('Refreshing categories', 'loading');
			axios.get(data.getBaseURL()+'api/v1/category')
				.then( function(response) {
					$.notifyClose();
					data.setCategories(response.data);
				})
				.catch( function(error) {
					util.showResult(error);
				})
		},

		/**
		 * Delete an Item on categories
		 * @param Int Category Id
		 * @return JSON delete result
		 */
		deleteCategory: function(id) {
			var vm = this;
			util.hideModal('#deleteCategoryModal');
			util.notify('Deleting Category', 'loading');
			axios.delete(data.getBaseURL()+'api/v1/category/'+id)
				 .then( function(response){
				 	if (util.showResult(response))
				 		vm.refreshCategories();
				 })
				 .catch( function(error){
				 	util.showResult(error);
				 })
		},

		/**
		 * Transform category data into html rows
		 * @param Object[] categories
		 * @return String[][] data
		 */
		transformData: function(categories) {
			var result = [];
			for (var i in categories) {
				var row = [];
				var image = data.getStorageURL() + categories[i]['category_image'];
				var id = categories[i]['id'];

				
				row.push('<img src="'+image+'" class="thumbnail" height="50px" width="50px" />');
				row.push(util.minify(categories[i]['category_name'], 15));
				row.push(util.minify(categories[i]['category_description'], 15));
				row.push('<button class="btn btn-link edit" name="'+id+'"><span class="fa fa-edit"></span></button>');
				row.push('<button class="btn btn-link delete" name="'+id+'"><span class="fa fa-trash"></span></button>');
				result.push(row);
			}
			return result;
		},


		/**
		 * Initialize Data Table
		 * @param String[][] rows
		 * @return Object Datatable
		 */
		initDatatable: function(rows) {
			var vm = this;

			$('#categories').DataTable({
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
						text: '<span class="fa fa-plus"></span> Add Category',
						action: function(e, dt, node, config) {
							vm.$router.push('/category/add')
						},
						className: 'btn btn-success'
					},
					{
						text: '<span class="fa fa-refresh"></span> Refresh',
						className: 'btn btn-primary',
						action: function(a, b, c, d, e) {
							vm.refreshCategories();
						}
					}
				]
			})
			this.addListener();
		},

		/**
		 * Set Category Id
		 * @param Int Category Id
		 *
		 */
		setCategoryId: function(id) {
			this.categoryId = id;
		},

		/**
		 * Get Category Id
		 * 
		 * @return Int Category ID
		 */
		getCategoryId: function() {
			return this.categoryId;
		},

		/**
		 * Get Category by id
		 * @param Int category id
		 * @return Object category
		 */
		getCategory: function(id) {
			var cat = this.categories;
			for (var i in cat) 
				if (cat[i].id ==id)
					return cat[i];
		},

		/**
		 * Add listener on every edit and delete button
		 *
		 */
		addListener: function() {
			var vm = this;

			//Refresh Listener everytime the page change
			$('#categories_next').click(function(){
				vm.addListener();
			})

			$('.edit').click( function(){
				var id = $(this).attr('name');
				data.setCategory(vm.getCategory(id));
				vm.$router.push('/category/edit/'+id);
			})

			$('.delete').click( function(){
				util.showModal('#deleteCategoryModal');
				vm.setCategoryId($(this).attr('name'));
			} )
		}
	},

	watch: {
		categories: function(val) {
			var rows = this.transformData(val);
			this.initDatatable(rows);
		}
	},

	computed: {
		categories: function() {
			return data.getCategories();
		}
	}
}
</script>