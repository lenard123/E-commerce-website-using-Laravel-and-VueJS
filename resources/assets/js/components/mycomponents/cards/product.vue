<template>
<div class="card" :id="value.id">
	<img :src="storageURL+value.product_image" style="height: 200px; width: 250px" :alt="value.product_name">
	<div style="padding-left: 15px">
		<h3 style="overflow: hidden;"><b>{{ minify(value.product_name) }}</b></h3>
		<h5>Price : <span  style="color: lime;">{{ toCurrency(value.product_price) }}</span></h5>
		<h5>Stocks : {{ value.product_quantity }}</h5>
	</div>
	<div class="input-group card-btn" @click="addToCart();" v-if="cart_quantity==0">
		<button class="btn btn-info card-btn">Add to Card</button>
	</div>
	<div v-if="cart_quantity>0">
		<div class="input-group">
			<div class="input-group-btn">
				<span @click="subtractToCart();" class="btn btn-info">
					<i class="fa fa-minus"></i>
				</span>
			</div>
			<div class="form-control" style="text-align: center;">
				<b><span>{{ cart_quantity }}</span> in cart</b>
			</div>
			<div class="input-group-btn">
				<span class="btn btn-info" @click="addToCart();" :class="{'disabled':value.product_quantity==0}">
					<i class="fa fa-plus"></i>
				</span>
			</div>
		</div>
	</div>
</div>
</template>

<script type="text/javascript">
export default{

	data: function() {
		return {
			storageURL: data.getStorageURL(),
			time:0,
			lastClick:0
		}
	},

	props:
	{
		value: 
		{
			default:
			{
				id:'',
				product_name:'', 
				product_image:'',
				product_price:'',
				product_description:'',
				product_quantity:0
			}
		}
	},

	methods: {
		addToCart: function(){
			if (!this.checkLogin()) return;
			if ( this.value.product_quantity < 1) return;
			this.value.product_quantity--;
			this.cart_quantity++;
			this.add();
		},

		subtractToCart: function(){
			if (this.cart_quantity <0) this.cart_quantity = 0;
			this.value.product_quantity++;
			this.cart_quantity--;
			this.add();
		},

		add: function() {
			var vm =this;
			if (this.validate()) return;
			this.lastClick = this.time;						


			setTimeout(function(){
				if ((vm.time - vm.lastClick) == 3){
					vm.updateCart(vm.value.id, vm.cart_quantity);
				}
			}, 3000);

		},

		validate: function() {
			var preventMulticlick = (this.time - this.lastClick) < 3 && this.lastClick != 0;
			return (preventMulticlick);
		},

		checkLogin: function(){
			if (data.getStatus().LOG != 'IN')
				util.showModal('#loginModal');
			return data.getStatus().LOG == 'IN';
		},

		updateCart: function(product_id, cart_quantity){
			var url = data.getBaseURL()+'api/v1/user/cart/add';
			var param = 'id='+product_id+'&quantity='+cart_quantity;
			axios.post(url, param)
				.then(function(response){
					//console.log(response);		
				})
				.catch(function(error){
					util.notify('An error occured', 'error');
					util.log(error);
				})
		},

		toCurrency: function(x) {
			return util.toCurrency(x);
		},

		minify: function(x) {
			return util.minify(x, 15);
		}
	},

	created: function() {
		this.$nextTick(function(){
			$('#'+this.value.id).popover({
				title: 'Product description',
				content: this.value.product_description,
				trigger: 'hover'
			})
		});

		var vm = this;
		setInterval(function(){
			vm.time++;
		}, 1000);

	},

	computed: {
		carts: function(){
			return data.getStatus().CARTS;
		},

		cart: function(){
			for (var i in this.carts)
				if (this.value.id == this.carts[i].product_id)
					return this.carts[i];
			return {};
		},

		status: function(){
			return data.getStatus();
		},

		cart_quantity: {

			get: function(){
				return this.cart.cart_quantity ? this.cart.cart_quantity : 0;
			},

			set: function(val){
				var vm = this;
				for (var i in this.carts)
					if (this.carts[i].product_id == this.value.id){
						data.status.CARTS[i].cart_quantity = val;
						return;
					}
				data.status.CARTS.push({
					product_id: vm.value.id, 
					customer_id: data.getStatus().USERID,
					cart_quantity: val,
					product: vm.value
				})
			}
		}
	}
}
</script>