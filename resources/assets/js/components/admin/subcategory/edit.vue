<template>
<div class="panel panel-default col-md-8 col-md-offset-2">
	<div class="panel-body">
		<form 
			:action="baseURL+'api/v1/subcategory/'+subcategory_id" 
			@submit.prevent="submit" 
			class="row"
			id="subcatform"
			method="POST" 
			enctype="multipart/form-data">
			<input type="hidden" name="_method" value="PUT" />
			<div class="col-md-4">
				<uploader 
					fileName="subcategory_image"
					:imageSrc="storageURL+subcategory.subcategory_image"/>
			</div>
			<div class="col-md-8">
				<div class="form-group">
					<label>Select Category</label>
					<select class="form-control" v-model="subcategory.category_id" name="category_id">
						<option value="0" disabled>-- No Category Selected--</option>
						<option v-for="category in categories" :value="category.id">
							{{ unescapeHTML(category.category_name) }}
						</option>
					</select>
				</div>

				<div class="form-group">
					<label>Name</label>
					<input type="text" class="form-control" name="subcategory_name" :value="unescapeHTML(subcategory.subcategory_name)">
				</div>

				<div class="form-group">
					<label>Description</label>
					<textarea 
						class="form-control" 
						name="subcategory_description">{{ unescapeHTML(subcategory.subcategory_description) }}</textarea>
				</div>

				<div class="pull-right">
					<input
						type="submit" 
						class="btn btn-primary" 
						:value="submitButton.message"
						:class="{'disabled':submitButton.loading}"/>
					<router-link 
						:to="{path: `/subcategory/${subcategory.category_id}`}"
						class="btn btn-default"
						id="back"
						tag="button">
						Back
					</router-link>
				</div>
			</div>
		</form>
	</div>
</div>
</template>

<script>
export default{
	data: function() {
		return {
			baseURL: data.getBaseURL(),
			storageURL: data.getStorageURL(),
			subcategory: data.getSubcategory(),

			subcategory_id: this.$route.params.subcategory_id,

			submitButton: {
				message: 'Submit',
				loading: false
			}
		}
	},

	created() {
		$('#subcatform').ajaxForm();
		if (!this.subcategory.id) {
			this.subcategory = {
				id: 0,
				subcategory_image: '#',
				subcategory_name: '',
				subcategory_description: ''
			}
			this.getSubcategory(this.subcategory_id);
		}
	},

	methods: {

		/**
		 * Update Subcategory
		 * 
		 */
		submit: function() {
			if (this.submitButton.loading) return;
			var notif = util.notify(util.getProgressbarMessage('Updating subcategory',0), 'loading');
			this.startLoading();
			var vm = this;
			$('#subcatform').ajaxSubmit({
				success: function(response, status, xhr, $form) {
					vm.stopLoading();
					if (util.showResult(response, 'ajax')){
						data.setSubcategories([]);
						$('#back').click();
					}
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
		 * Get category
		 * @param (int) Subcategory id
		 * @return {Object} Subcategory
		 */
		getSubcategory: function(id) {
			var vm = this;
			this.startLoading();
			util.notify('Getting information', 'loading')
			axios.get(this.baseURL+'api/v1/subcategory/'+id)
				.then(function(response){
					vm.stopLoading();
					vm.subcategory = response.data;
				})
				.catch(function(error){
					vm.stopLoading();
					util.showResult(error);
				})
		},

		/**
		 * Start Loading
		 *
		 */
		startLoading: function() {
			this.submitButton = {
				message: 'Loading',
				loading: true
			}
		},

		/**
		 * Stop Loading 
		 *
		 */
		stopLoading: function() {
			$.notifyClose();
			this.submitButton = {
				message: 'Submit',
				loading: false
			}
		},

		/**
		 * unescape html characters
		 * @param 'String' html
		 * @return 'String' decoded html
		 */
		unescapeHTML: function(html) {
			return util.unescapeHTML(html);
		}
	},

	computed: { 
		categories: function(){
			return data.categories;
		}
	}
}
</script>