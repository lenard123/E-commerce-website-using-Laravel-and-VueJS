<template>
<div class="card thumbnail" :id="id">
	<img :src="src" width="250px" height="250px" style="width: 250px; height: 250px;" :alt="name">
	<div style="padding-left: 15px;">
		<h3 style="overflow: hidden;"><b>{{ minifyName }}</b></h3>	
	</div>
	<button class="btn btn-info card-btn" @click="$router.push(`/category/${id}`)">View Products</button>
	<div id="description" style="display:none">
		<slot></slot>
	</div>
</div>
</template>

<script>
export default{
	props:{
		src: {default: data.getStorageURL()+'images/category/default.jpg'},
		name:{default:'Unknown category'},
		id: {default: ''}
	},

	created(){
		this.$nextTick(function(){
			var description = $('#'+ this.id + ' #description').text();
			$('#'+this.id).popover({
				title: 'Category description', 
				content: description, 
				trigger: 'hover'});
		})
	},

	computed: {
		defaultId(){
			return 'cat'+Math.floor(Math.random()*10000);
		},

		minifyName(){
			return util.minify(util.unescapeHTML(this.name, 16));
		}
	}
}
</script>

