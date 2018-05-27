<template>
<div class="container">
	<h1><b>Shipping</b></h1>
	<div class="row">
		<div class="col-md-6">
			<form @submit.prevent="submit" id="checkoutForm">
				<div class="form-group">
					<label for="firstname">Firstname</label>
					<input type="text" name="firstname" class="form-control" required/>
				</div>

				<div class="form-group">
					<label for="lastname">Lastname</label>
					<input type="text" name="lastname" class="form-control" required/>
				</div>

				<div class="form-group">
					<label for="address1">Address1</label>
					<input type="text" name="address1" class="form-control" required/>
				</div>

				<div class="form-group">
					<label for="address2">Address2</label>
					<input type="text" name="address2" class="form-control" placeholder="Optional"/>
				</div>

				<div class="form-group">
					<label for="phone">Phone</label>
					<input type="text" name="phone" class="form-control" required/>
				</div>

				<div class="form-group">
					<label for="city">City</label>
					<input type="text" name="city" class="form-control" required/>
				</div>

				<div class="form-group">
					<label for="state">State</label>
					<input type="text" name="state" class="form-control" required/>
				</div>

				<div class="form-group">
					<label for="postalcode">Postal Code</label>
					<input type="text" name="postalcode" class="form-control" required/>
				</div>

				<div class="form-group">
					<button class="btn btn-info" type="submit"><b>Place Order</b></button>
				</div>
			</form>
		</div>

		<div class="col-md-6">
			<div class="panel panel-default">
				<div class="panel-body">
					<h2>Order Summary</h2>
					<h6>You have {{ totalItem }} items in your shopping cart.</h6>
					<div class="table-responsive">
						<table class="table table-hover">
							<tbody>
								<tr v-for="cart in carts">
									<td><h5>{{ cart.cart_quantity }} x {{ cart.product.product_name }}</h5></td>
									<td>
										<h5 class="pull-right">
											{{ toCurrency(cart.cart_quantity*cart.product.product_price) }}
										</h5>
									</td>
								</tr>
								<tr>
									<td><b>Total</b></td>
									<td><b class="pull-right">{{ toCurrency(totalPrice) }}</b></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</template>
<script type="text/javascript">
export default{
	created: function() {
		if (this.totalItem < 1)
			this.$router.push('/');
	},

	methods: {
		submit: function() {
			var vm = this;
			util.notify('Submitting your order, please wait...', 'loading');
			var url = data.getBaseURL()+'api/v1/user/order/add';
			var params = $('#checkoutForm').serialize();
			axios.post(url, params).then(function(response){
				var response = util.getResponse(response);
				if (response.status) {
					if (response.status == 'success'){
						util.notify('Ordered successfully', 'success');
						vm.$router.push('/');
					} else {
						util.notify('An error occured', 'success');
					}
				} else {
					var error = util.validateErrorMessage(response);
					util.notify(error, 'error');
				}
			}).catch(function(error){
				util.notify('An error occured', 'error');
				util.log(error);
			})
		},

		toCurrency: function(x) {
			return util.toCurrency(x);
		}
	},

	computed: {
		totalItem: function(){
			if (data.getStatus().LOG != 'IN')
				return this.$router.push('/');
			var quantity = 0;
			var carts = data.getStatus().CARTS;
			for (var i in carts)
				quantity += carts[i].cart_quantity;
			return quantity;
		},

		carts: function(){
			return data.getStatus().CARTS;
		},

		totalPrice: function(){
			var price = 0;
			for(var i in this.carts)
				price += this.carts[i].cart_quantity*this.carts[i].product.product_price;
			return price;
		}
	}
}
</script>