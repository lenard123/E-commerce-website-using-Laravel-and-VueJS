<template>
<div class="panel panel-default col-md-8 col-md-offset-2">
	<div class="panel panel-body">
		<form 
			@submit.prevent="submit" 
			method="POST" 
			:action="baseURL+'api/v1/admin'"
			class="row"
			enctype="multipart/form-data"
			id="adminForm">
			<div class="col-md-4">
				<uploader file-name="admin_image"/>
			</div>
			<div class="col-md-8">
				<div class="form-group">
					<label for="admin_name">Name</label>
					<input type="text" name="admin_name" class="form-control" required/>
				</div>
				<div class="form-group">
					<label for="admin_user">Username</label>
					<input type="text" name="admin_user" class="form-control" required/>
				</div>
				<div class="form-group">
					<label for="admin_type">Type</label>
					<select name="admin_type" class="form-control" required>
						<option value="0" selected>Co-admin</option>
						<option value="1">Admin</option>
					</select>
				</div>
				<div class="form-group">
					<label for="admin_pass">Password</label>
					<input type="password" name="admin_pass" class="form-control" required/>
				</div>
				<div class="form-group">
					<label for="admin_pass1">Confirm Password</label>
					<input type="password" name="admin_pass1" class="form-control" required/>
				</div>
				<div class="form-group pull-right">
					<button type="submit" class="btn btn-info" :class="{'disabled': loading.isLoading}" v-html="loading.value">
						{{ loading.value }}
					</button>
					<button type="button" class="btn btn-default" @click="back">Cancel</button>
				</div>
			</div>
		</form>
	</div>
</div>
</template>
<script>
export default{

	data: function () {
		return {
			baseURL: data.getBaseURL(),
			loading: {
				isLoading: false,
				value: 'Submit'
			}
		}
	},


	methods: {
		submit: function () {
			if (!this.isPasswordMatch()) 
				return util.notify('Password not match', 'error');
			else if (this.loading.isLoading)
				return;

			this.startLoading();

			var vm = this;
			var url = this.baseURL+'api/v1/admin';
			var params = $('#adminForm').serialize();

			axios.post(url, params)
				 .then(function(response){
				 	vm.stopLoading();
				 	if (util.showResult(response)) 
				 		vm.back();
				 })
				 .catch(function(error){
				 	vm.stopLoading();
				 	util.showResult(error);
				 })
		},

		back: function () {
			this.$router.push('/admin');
		},

		isPasswordMatch: function () {
			return $('[name="admin_pass1"]').val() == $('[name="admin_pass"]').val();
		},

		startLoading: function () {
			util.notify('Adding admin', 'loading');
			this.loading = {
				isLoading: true,
				value: '<i class="fa fa-refresh fa-spin"></i> Submit'
			}
		},

		stopLoading: function () {
			$.notifyClose();
			this.loading = {
				isLoading: false,
				value: 'Submit'
			}
		} 
	}

}
</script>