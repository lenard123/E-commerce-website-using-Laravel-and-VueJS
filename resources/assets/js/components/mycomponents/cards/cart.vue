<template>
	<tr>
		<td><img 
				:src="storageURL+value.product.product_image"
				:alt="value.product.product_name"
				class="thumbnail"
				height="60px"
				width="60px" />
		</td>
		<td>{{ value.product.product_name }}</td>
		<td>
			<center>
				<div class="input-group" style="max-width: 200px;">
					<div class="input-group-btn">
						<span @click="subtractToCart(index);" class="btn btn-info">
							<i class="fa fa-minus"></i>
						</span>
					</div>
					<div style="text-align: center;padding: 6px 12px;">
						<b><span>{{ value.cart_quantity }}</span> in cart</b>
					</div>
					<div class="input-group-btn">
						<span class="btn btn-info" @click="addToCart(index);">
							<i class="fa fa-plus"></i>
						</span>
					</div>
				</div>
			</center>
		</td>
		<td><span class="pull-right">{{ toCurrency(value.cart_quantity*value.product.product_price) }}</span></td>
	</tr>
</template>
<script type="text/javascript">
export default{
	props:['value', 'index'],
	data: function(){
		return {
			storageURL: data.getStorageURL(),
			time:0,
			lastClick:0,
			quantity:this.value.cart_quantity
		}
	},

	created: function(){
		var vm = this;
		setInterval(function(){
			vm.time++;
		}, 1000);		
	},

	methods: {
		addToCart: function(index){
			var cart = this.carts[index];
			if (cart.product.product_quantity < 1) {
				util.notify('Out of stocks').update('type', 'warning');
				return;
			}
			--cart.product.product_quantity;
			var quantity = ++cart.cart_quantity;

			this.add(this.value.product_id, quantity);
		},

		subtractToCart: function(index){
			var cart = this.carts[index];
			++cart.product.product_quantity;

			var quantity = --cart.cart_quantity;
			var id = this.value.product_id;

			if (quantity < 1)
				this.carts.splice(index,1);

			this.add(id, quantity);
		},

		add: function(id, quantity){
			var vm = this;
			vm.quantity = quantity;
			if (this.validate()) return;
			this.lastClick = this.time;
			setTimeout(function(){
				if ((vm.time - vm.lastClick) == 3){
					vm.updateCart(id, vm.quantity);
				}
			}, 3000)
		},

		updateCart: function(product_id, cart_quantity){
			var url = data.getBaseURL()+'api/v1/user/cart/add';
			var param = 'id='+product_id+'&quantity='+cart_quantity;
			axios.post(url, param)
				.then(function(response){
					util.log(response);		
				})
				.catch(function(error){
					util.notify('An error occured', 'error');
					util.log(error);
				})
		},

		validate: function() {
			var checkLogin = !this.checkLogin();
			var preventMulticlick = (this.time - this.lastClick) < 3 && this.lastClick != 0;
			return (checkLogin || preventMulticlick);
		},		

		checkLogin: function(){
			if (data.getStatus().LOG != 'IN')
				util.showModal('#loginModal');
			return data.getStatus().LOG == 'IN';
		},

		toCurrency: function(x) {
			return util.toCurrency(x);
		}		

	},

	computed: {
		carts:{
			get: function(){
				return data.getStatus().CARTS;
			},

			set: function(val){
				data.status.CARTS = val;
			}
		}
	}
}
</script>