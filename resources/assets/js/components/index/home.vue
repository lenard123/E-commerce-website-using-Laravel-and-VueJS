<template>
<div>
	<div id="myCarousel" class="carousel slide" data-ride="carousel">

		<ol class="carousel-indicators">
			<li data-target="#myCarousel" data-slide-to="0" class="active"></li>
			<li data-target="#myCarousel" data-slide-to="1"></li>
			<li data-target="#myCarousel" data-slide-to="2"></li>
		</ol>

		<div class="carousel-inner" role="listbox">
			<div class="item active">
				<img :src="storageURL+'images/slide/slide1.png'" style="max-height: 350px">
			</div>

			<div class="item">
				<img :src="storageURL+'images/slide/slide2.png'" style="max-height: 350px">
			</div>

			<div class="item">
				<img :src="storageURL+'images/slide/slide3.png'" style="max-height: 350px">
			</div>
		</div>

		<a class="left carousel-control" href="#myCarousel" data-slide="prev">
			<span class="glyphicon glyphicon-chevron-left"></span>
			<span class="sr-only">Previous</span>
		</a>
		<a class="right carousel-control" href="#myCarousel" data-slide="next">
			<span class="glyphicon glyphicon-chevron-right"></span>
			<span class="sr-only">Next</span>
		</a>
	</div>

	<div style="text-align: left;">
		<category-card 
			v-for="(category, index) in categories"
			:name="category.category_name"
			:src="storageURL+category.category_image"
			:id="category.id"
			:key="category.id">
			{{ category.category_description }}
		</category-card>
	</div>
</div>
</template>

<script>
export default{
	data: function() {
		return {
			storageURL: data.getStorageURL()
		}
	},

	computed: {
		categories(){
			return data.getCategories();
		}
	}
}
</script>

<style>
  .carousel-inner > .item > img,
  .carousel-inner > .item > a > img {
      margin: auto;
  }

  #myCarousel {
  	margin-top: -20px;
  }


</style>
