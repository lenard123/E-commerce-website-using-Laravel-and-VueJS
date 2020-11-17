<template>
<div class="panel panel-default col-md-8 col-md-offset-2">
	<div class="panel-body">

		<form 
			@submit.prevent="submit()" 
			:action="baseURL+'api/v1/subcategory'" 
			id="subcatForm" 
			enctype="multipart/form-data"
			method="POST" 
			class="row">

			<div class="col-md-4">
				<uploader 
					fileId="subcategoryImageFile" 
					fileName="subcategory_image"
					imageId="selectedImage" />
			</div>

			<div class="col-md-8">
				
				<div class="form-group">
					<label>Select Category</label>
					<select 
						class="form-control" 
						name="category_id" 
						v-model="category_id" 
						@change="changeId(category_id)"
						required>
						<option value="0" disabled>--- No Categories Selected ---</option>
						<option v-for="category in categories" :value="category.id">
							{{ unescapeHTML(category.category_name) }}
						</option>
					</select>
				</div>

				<div class="form-group">
					<label>Name</label>
					<input type="text" class="form-control" v-model="subcat.name" name="subcategory_name" required/>
				</div>

				<div class="form-group">
					<label>Description</label>
					<textarea class="form-control" v-model="subcat.description" name="subcategory_description"></textarea>
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
			category_id: this.$route.params.category_id,
			
			subcat:{
				name:'',
				description:''
			},

			submitButton: {
				message: 'Submit',
				loading: false
			}
		}
	},

	created() {
		$('#subcatForm').ajaxForm();
	},

	methods: {
		/**
		 * Go back to Previos page
		 * @param Int cat id
		 *
		 */
		back: function() {
			this.$router.push(`/subcategory/${this.category_id}`);
		},

		/** 
		 * Submit Form and Add category
		 *
		 */
		submit: function() {
			if (this.submitButton.loading) return;
			var vm = this;
			var notif = util.notify(util.getProgressbarMessage('Adding Subcategory', 0), 'loading');
			this.startLoading();
			$('#subcatForm').ajaxSubmit({
				success: function(response, status, xhr, $form) {
					if(util.showResult(response, 'ajax')){
						data.setSubcategories([]);
						vm.back();
					}
					vm.stopLoading();
				},

				error: function(response) {
					util.showResult(response, 'ajax');
					vm.stopLoading();
				},

				uploadProgress: function(a, b, c, d) {
					notif.update('message', util.getProgressbarMessage('Adding category', d));
				}
			})
		},

		/**
		 * Start Loading 
		 * Prevent User to continuall submit the form
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
			this.submitButton = {
				message: 'Submit',
				loading: false
			}
		},

		/**
		 * Unescape HTML
		 * Example : &lt;h1&gt; -> <h1>
		 * @param String 
		 */
		unescapeHTML: function(string) {
			return util.unescapeHTML(string);
		},

		/**
		 * Change Params Category id
		 * //subcategory/:category_id/add
		 * @param Int Id
		 */
		changeId: function(id) {
			this.$router.push({params:{category_id:id}});
		}
	},

	computed: {
		categories: function() {
			return data.categories;
		}
	}
}
</script>