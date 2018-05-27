<template>
<div class="container">
	<div class="col-md-9">
		<div class="panel panel-default">
			<div class="panel-body">
				<router-link class="btn btn-default" to="/order"> &lt; Go Back</router-link>
				<button class="btn btn-danger" v-if="_new" onclick="util.showModal('#cancelModal')">Cancel Order</button>
				<h2>Order Details</h2>
				<h6>You have {{ totalItem }} items.</h6>
				<div class="table-responsive">
					<table class="table table-hover">
						<tbody>
							<tr v-for="(order, index) in order_item" v-if="index != 'order'">
								<td><h5>{{ order.order_item_quantity }} x {{ order.product.product_name }}</h5></td>
								<td>
									<h5 class="pull-right">
										{{ toCurrency(order.order_item_quantity*order.product.product_price)}}
									</h5>
								</td>
							</tr>
							<tr>
								<td><h5><b>Total</b></h5></td>
								<td><h5 class="pull-right"><b>{{ toCurrency(totalPrice) }}</b></h5></td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</div>
	<modal id="cancelModal">
		<modal-header>Cancel Order</modal-header>
		<modal-body>
			<h1>Are you sure to cancel your order?</h1>
		</modal-body>
		<modal-footer>
			<button class="btn btn-danger" @click="cancel">Cancel Order</button>
			<button class="btn btn-default" onclick="util.hideModal('#cancelModal')">Back</button>
		</modal-footer>
	</modal>
</div>
</template>

<script type="text/javascript">
export default{
	data: function(){
		return {
			order_item: []
		}
	},

	created: function() {
		if (!this.$route.query.id) {
			this.$router.push('/order');
			return;
		}
		this.refreshOrder();
	},

	methods: {
		refreshOrder: function() {
			var id = this.$route.query.id;
			var vm = this;
			util.notify('Getting information, please wait', 'loading');
			axios.get(data.getBaseURL()+'api/v1/user/order/'+id)
				.then(function(response){
					$.notifyClose();
					response = util.getResponse(response);
					vm.order_item = response;
				})
				.catch(function(error){
					util.notify('An error occured', error);
				})
		},

		cancel: function(){
			util.hideModal('#cancelModal');
			var id = this.$route.query.id;
			var vm = this;
			util.notify('Cancelling your order, please wait', 'loading');
			axios.get(data.getBaseURL()+'api/v1/user/order/cancel/'+id)
				 .then(function(response){
				 	response = util.getResponse(response);
				 	if (response.status) {
				 		if (response.status == 'success') {
				 			util.notify('Your order has been canceled', 'success');
				 			vm.$router.push('/order');
				 		} else 
				 			util.notify('An error occured', 'error')
				 	} else 
			 			util.notify('An error occured', 'error')	
				 })
				 .catch(function(error){
		 			util.notify('An error occured', 'error')
		 		})
		},

		toCurrency: function(x) {
			return util.toCurrency(x);
		}
	},

	computed: {

		totalItem: function(){
			if(data.getStatus().LOG != 'IN')
				this.$router.push('/');
			var orders = this.order_item;
			var totalItem = 0;
			for (var i in orders)
				if (i != 'order')
					totalItem+=orders[i].order_item_quantity;
			
			return totalItem;
		},

		totalPrice: function(){
			var orders = this.order_item;
			var totalPrice = 0;
			for (var i in orders)
				if (i != 'order')
					totalPrice+=orders[i].order_item_quantity*orders[i].product.product_price;
			return totalPrice;
		},

		_new: function(){
			var _new = false;
			if (this.order_item.order)
				_new = this.order_item.order.order_status == 'new' ? true : false;
			return _new;
		}
	}
}
</script>