<template>
<div class="col-md-8 col-md-offset-2">
	<div class="panel panel-default">
		<div class="panel-body">
			<div class="table-responsive">
				<table class="table table-hover" id="admin_table">
					<thead>
						<tr>
							<th></th>
							<th>Name</th>
							<th>Username</th>
							<th>Type</th>
							<th>Delete</th>
						</tr>
					</thead>
					<tbody></tbody>
				</table>
			</div>
		</div>
	</div>
	<modal id="deleteAdminModal">
		<modal-header>Delete Admin</modal-header>
		<modal-body>
			<h1>Are you sure to delete Admin?</h1>
		</modal-body>
		<modal-footer>
			<button class="btn btn-danger" @click="deleteAdmin">Delete Admin</button>
			<button class="btn btn-default" onclick="util.hideModal('#deleteAdminModal')">Cancel</button>
		</modal-footer>
	</modal>
</div>
</template>

<script>
export default{
	data: function() {
		return {
			admins: [],
			admin_id: 0
		}
	},

	created: function() {
		this.$nextTick(function(){
			this.initDataTable();
		})

		this.refreshAdmin();
	},

	methods: {
		refreshAdmin: function() {
			var vm =this;
			util.notify('Refreshing admin', 'loading');
			axios.get(data.getBaseURL()+'api/v1/admin')
				 .then(function(response){
				 	$.notifyClose();
				 	vm.admins = response.data;
				 })
				 .catch(function(error){
				 	util.notify('An error occured', 'error');
				 })
		},

		initDataTable: function() {
			var vm =this;
 			$('#admin_table').DataTable({
				destroy: true,
				aaData: vm.data,
				autoWidth: false,
				info: false,
				searching: false,
				dom: 'Bfrtip',
				buttons:[
					{
						text: '<i class="fa fa-plus"></i> Add Admin',
						action: function() {
							vm.$router.push('/admin/add');
						},
						className: 'btn btn-success'
					}
				]
			});

			this.addListener();
		},

		addListener: function() {
			var vm =this;

			$('#admin_table_next').click(function(){
				vm.addListener();
			});

			$('.delete').click(function(){
				var id = $(this).attr('id');
				vm.admin_id = id;
				util.showModal('#deleteAdminModal');
			});
		},

		deleteAdmin: function () {
			util.hideModal('#deleteAdminModal');
			util.notify('Deleting admin', 'loading');
			var vm = this;
			axios.delete(data.getBaseURL()+'api/v1/admin/'+this.admin_id)
				 .then( function (response) {
				 	if (util.showResult(response))
				 		vm.refreshAdmin();
				 })
				 .catch( function (error) {
				 	util.showResult(error);
				 })
		},

		getType: function(x) {
			var type = x == 1 ? 'admin' : 'co-admin';
			var label = x == 1? 'success': 'info';
			return `<span class="label label-${label}">${type}</span>`;
		},

		isAdmin: function(x) {
			return x == 1;
		},

		deleteButton: function(id) {
			return `<i class="fa fa-trash delete" id="${id}"></i>`;
		}
	},

	watch: {
		admins: function(val) {
			this.initDataTable()
		}
	},

	computed: {
		data: function() {
			var admins = this.admins;
			var res = [];
			for (var i in admins) {
				var row  = [];
				row.push(`<img src="${data.getStorageURL()+admins[i]['admin_image']}" class="thumbnail" heigh="60px" width="60px" alt="${admins[i]['admin_name']}"/>`);
				row.push(admins[i]['admin_name']);
				row.push(admins[i]['admin_user']);
				row.push(this.getType(admins[i]['admin_type']));
				row.push(this.deleteButton(admins[i]['id']));
				res.push(row);
			}
			return res;
		}
	}
}
</script>