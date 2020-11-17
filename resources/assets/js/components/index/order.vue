<template>
<div class="container">
	<div v-if="orders.length > 0">
		<h1><b>Orders List</b></h1>
		<order name="New order" :orders="newOrder"/>
		<order name="Completed order" :orders="completeOrder"/>
		<order name="Cancelled order" :orders="cancelOrder"/>
	</div>
	<div v-else>
		<div class="jumbotron"><h2>No orders</h2></div>
	</div>
</div>
</template>

<script>
export default{
	created: function(){
		if (this.quantity < 1)
			this.$router.push('/');
		else
			this.refreshOrder();
	},

	methods: {
		refreshOrder: function() {
			var vm = this;
			util.notify('Refreshing order', 'loading');
			axios.get(data.getBaseURL()+'api/v1/user/order')
				.then(function(response){
					$.notifyClose();
					var response = util.getResponse(response);
					data.setOrders(response);
				})
				.catch(function(error){
					util.log(error);
					util.notify('An error occured', 'error');
				})
		},

		getOrder: function(orders, type) {
			var _typeOrder = [];
			for (var i in orders)
				if(orders[i].order_status == type)
					_typeOrder.push(orders[i]);
			return _typeOrder;
		}
	},

	computed: {
		quantity: function(){
			if (data.getStatus().LOG != 'IN')
				return this.$router.push('/');
			return data.getStatus().ORDER_QUANTITY;
		},

		orders: function(){
			return data.getOrders();
		},

		newOrder: function(){
			return this.getOrder(this.orders, 'new');
		},

		cancelOrder: function(){
			return this.getOrder(this.orders, 'cancel');
		},

		completeOrder: function(){
			return this.getOrder(this.orders, 'complete');
		}
	}
}
</script>