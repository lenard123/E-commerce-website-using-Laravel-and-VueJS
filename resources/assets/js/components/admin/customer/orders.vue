<template>
<div>
	<div class="form-group">
		<router-link class="btn btn-default white" to="/customer">&lt; Go Back</router-link>
	</div>
	<div v-if="orders.length > 0">
		<order name="New Orders" :orders="newOrders" :detail-link="link"/>
		<order name="Completed Orders" :orders="completeOrders" :detail-link="link"/>
		<order name="Cancelled Orders" :orders="cancelOrders" :detail-link="link"/>
	</div>
	<div v-else>
		<div class="jumbotron white">
			<h1>No Orders</h1>
		</div>
	</div>
</div>
</template>

<script>
export default{
	data: function() {
		return {
			orders:[]
		}
	},

	created: function(){
		this.getOrders();
	},

	methods: {
		getOrders: function(){
			var vm = this;
			util.notify('Refreshing orders', 'loading');
			axios.get(data.getBaseURL()+'api/v1/customer/'+this.id)
				 .then(function(response) {
				 	$.notifyClose();
				 	vm.orders = response.data;
				 })
				 .catch(function(error){
				 	util.log(error);
				 	util.notify('An error occured', 'error');
				 })
		}
	},

	computed: {
		id: function() {
			return this.$route.params.customer_id;
		},

		link: function(){
			return this.$route.path+'/details';
		},

		newOrders: function(){
			return this.orders.filter(function(order){
				order.created_at = order.created_at.date;
				return order.order_status == 'new';
			})
		},

		completeOrders: function(){
			return this.orders.filter(function(order){
				return order.order_status == 'complete';
			})
		},

		cancelOrders: function(){
			return this.orders.filter(function(order){
				return order.order_status == 'cancel';
			})
		}
	}
}
</script>