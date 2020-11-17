<template>
<div  class="row">

	<div class="col-md-3">

		<div class="panel-group">
			<div class="panel panel-default">
				<div class="panel-heading">
					<h4 class="panel-title" data-toggle="collapse" href="#collapse1">
						{{ minify(category_name) }}
					</h4>
				</div>
				<div id="collapse1" class="panel-collapse collapse">
					<ul class="list-group">
						<li 
							v-on:click.prevent="goto(0)" 
							class="list-group-item" 
							:class="{'active':(0==category_id)}">All Categories</li>
						<li
							class="list-group-item"
							v-for="category in categories"
							v-on:click="goto(category.id)"
							:class="{'active':(category.id==category_id)}">{{ minify(category.category_name) }}</li>
					</ul>
				</div>					
			</div>
		</div> 
	

	</div>
	

	<div class="col-md-9">
		<div class="panel panel-default" id="subcat">	
			<div class="panel-body table-responsive">
				<table class="table table-hover" id="subcategories">
					<thead>
						<tr>
							<th style="width:50px"></th>
							<th style="width: 200px">Name</th>
							<th style="width: 200px">Description</th>
							<th>Edit</th>
							<th>Delete</th>
						</tr>
					</thead>			
					<tbody>
					</tbody>
				</table>
			</div>
		</div>
	</div>

	<modal id="deleteSubcategoriesModal">
		<modal-header>Delete Subcategory</modal-header>
		<modal-body>
			<p><b>Warning : </b> Deleting Subcategory will also delete products under it</p>
		</modal-body>
		<modal-footer>
			<button class="btn btn-danger" @click="deleteSubcategories(getSubcategoryId())">Delete</button>
			<button class="btn btn-default" data-dismiss="modal">Back</button>
		</modal-footer>
	</modal>

</div>
</template>

<script>
export default{
	data: function() {
		return {
			subcategory_id:0,
			baseURL: data.getBaseURL()
		}
	},

	created: function() {
		if (this.subcategories.length < 1)
			this.refreshSubcategories();
		else
			this.$nextTick(function(){
				var rows = this.transformData(this.subcategories)
				this.initDatatable(rows);
			});
	},

	methods: {

		/**
		 * Get All Subcategory
		 *
		 * @return Response JSON result
		 */
		refreshSubcategories: function() {
			var vm = this;
			util.notify('Refreshing Subcategories', 'loading');
			axios.get(this.baseURL+'api/v1/subcategory')
				.then(function (response) {
					$.notifyClose();
					data.setSubcategories(response.data);
				})
				.catch(function (error) {
					util.showResult(error);
				})
		},

		/**
		 * Delete Subcategories
		 * @param Int id Subcategory Id
		 *
		 */
		deleteSubcategories: function(id) {
			var vm = this;
			util.hideModal('#deleteSubcategoriesModal');
			util.notify('Deleting Subcategory', 'loading');
			axios.delete(this.baseURL+'api/v1/subcategory/'+id)
				.then(function(response){
					if (util.showResult(response))
						vm.refreshSubcategories();
				})
				.catch(function(error){
					util.showResult(error);
				})
		},

		/**
		 * Set Subcategory id
		 * @param int Id SubcategoryId
		 *
		 */
		setSubcategoryId: function(id) {
			this.subcategory_id = id;
		},

		/**
		 * Get Subcategory Id
		 * 
		 * @return Int Subcategory id
		 */
		getSubcategoryId: function() {
			return this.subcategory_id;
		},


		/**
		 * Navigate to different Category
		 * @param Int id Category id
		 *
		 */
		goto: function(id) {
			this.$router.push({params:{category_id:id}});
		},

		/**
		 * Minify the Category name to fit to the screen
		 * @param String category name
		 * @return String Minified Category name
		 */
		minify: function(string) {
			return util.minify(util.unescapeHTML(string), 20);
		},

		/**
		 * Transform Subcategories data into HTML rows
		 * @param Object[] subcategory
		 * @return String[][] subcategories
		 */
		transformData: function(subcat) {
			var subcategories = [];
			for (var i in subcat) {
				var row = [];
				var image = data.getStorageURL()+subcat[i]['subcategory_image'];
				var id = subcat[i]['id'];

				row.push('<img src="'+image+'" class="thumbnail" height="50px" width="50px" />');
				row.push(util.minify(subcat[i]['subcategory_name'], 15));
				row.push(util.minify(subcat[i]['subcategory_description'], 15));
				row.push('<button class="btn btn-link edit" id="'+id+'">\
						 	<span class="fa fa-edit"></span>\
						  </button>');
				row.push('<button class="btn btn-link delete" id="'+id+'">\
							<span class="fa fa-trash"></span>\
						  </button>');
				subcategories.push(row);
			}

			return subcategories;
		},

		/**
		 * Initialize datatable
		 * @param Sting[][] rows Subcategory
		 * @return Object Datatable
		 */
		initDatatable: function(rows) {
			var vm = this;

			$('#subcategories').DataTable({
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
						text: '<span class="fa fa-plus"></span> Add Subcategory',
						action: function(e, dt, node, config) {
							vm.$router.push({path:`/subcategory/${vm.category_id}/add`});
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
		 * Add Event Listener on Edit and Delete Button
		 *
		 */
		addListener: function() {

			var vm = this;

			//refresh listener on next page
			$('#subcategories_next').click(function(){
				vm.addListener();
			})

			//Add listener on Edit Button
			$('.edit').click(function(){
				var id = $(this).attr('id');
				data.setSubcategory(vm.getSubcategory(id));
				vm.$router.push(`/subcategory/${vm.category_id}/edit/${id}`);
			})

			//Add Listener on Delete Button
			$('.delete').click(function(){
				vm.setSubcategoryId($(this).attr('id'));
				util.showModal('#deleteSubcategoriesModal')
			})

		},

		/** 
		 * Get Subcategory
		 * @param (int) Subcategory id
		 * @return {Object} Subcategory
		 */
		getSubcategory: function(id) {
			var subcat = this.subcategories;
			for (var i in subcat) 
				if (subcat[i]['id'] == id) 
					return subcat[i];
			return {};
		}
	},

	watch: {
		subcategories: function (subcategories) {
			var rows = this.transformData(subcategories);
			this.initDatatable(rows);
		},

		category_id: function (value) {
			var rows = this.transformData(this.subcategories);
			this.initDatatable(rows);
		}
	},

	computed: {
		category_id: function() {
			return this.$route.params.category_id;
		},

		category_name: function() {
			if (this.category_id == 0 ) return 'All Categories';
			for (var i in this.categories)
				if (this.categories[i].id == this.category_id)
					return util.unescapeHTML(this.categories[i].category_name);
		},

		categories: function() {
			return data.categories;
		},

		subcategories: function() {
			var subcategories = data.subcategories;
			var res = [];
			for (var i in subcategories) {
				if (this.category_id != 0 && subcategories[i].category_id != this.category_id) continue;
				res.push(subcategories[i]);
			}
			return res;
		}
	}
}
</script>