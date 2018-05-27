<template>
<div>
	<div class="form-group">
		<router-link :to="`/order/${type}`" class="btn btn-default white">&lt; Go Back</router-link>
		<button 
			class="btn btn-danger" 
			v-if="order_detail.order_status == 'new'" 
			onclick="util.showModal('#cancelModal')">
			<i class="fa fa-trash"></i> Cancel Order
		</button>
		<button 
			class="btn btn-success" 
			v-if="order_detail.order_status == 'new'"
			onclick="util.showModal('#completeModal')">
			<i class="fa fa-check"></i> Complete Order
		</button>	
	</div>
	<div class="row">
		<div class="col-md-6">
			<div class="panel panel-default">
				<div class="panel-body">
					<h4><b>Customer Details</b></h4>
					<table>
						<info _key="Name" :value="fullname"/>
						<info _key="Address1" :value="order_detail.order_address1" />
						<info _key="Address2" :value="order_detail.order_address2"/>
						<info _key="Phone" :value="order_detail.order_phone"/>
						<info _key="City" :value="order_detail.order_city"/>
						<info _key="State" :value="order_detail.order_state"/>
						<info _key="Postal Code" :value="order_detail.order_postalcode"/>
					</table>
				</div>
			</div>
		</div>
		<div class="col-md-6">
			<div class="panel panel-default">
				<div class="panel-body">
					<h4><b>Order Details</b></h4>
					<div class="table-responsive">
						<table class="table table-hover">
							<tr v-for="item in items">
								<td><h5>{{ getItem(item) }}</h5></td>
								<td><h5 class="pull-right">{{ toCurrency(item) }}</h5></td>
							</tr>
							<tr>
								<td><h5><b>Total</b></h5></td>
								<td><h5 class="pull-right"><b>{{ totalPrice }}</b></h5></td>
							</tr>
						</table>
					</div>
				</div>
			</div>
		</div>
	</div>

	<modal id="cancelModal">
		<modal-header><h4>Cancel Order</h4></modal-header>
		<modal-body>
			<h1>Are you sure to cancel this order?</h1>
		</modal-body>
		<modal-footer>
			<button class="btn btn-danger" @click="cancelOrder()">Cancel order</button>
			<button class="btn btn-default" onclick="util.hideModal('#cancelModal')">Back</button>
		</modal-footer>
	</modal>

	<modal id="completeModal">
		<modal-header><h4>Complete Order</h4></modal-header>
		<modal-body>
			<h1>Are you sure that this order is complete?</h1>
		</modal-body>
		<modal-footer>
			<button class="btn btn-success" @click="completeOrder()">Complete order</button>
			<button class="btn btn-default" onclick="util.hideModal('#completeModal')">Back</button>
		</modal-footer>
	</modal>	

</div>
</template>
<script type="text/javascript">
export default{
	data: function() {
		return {
			order_detail:{
				order_firstname:'',
				order_lastname:''
			}
		}
	},

	created: function() {
		this.refreshOrder();
	},

	methods:{
		refreshOrder: function() {
			var vm = this;
			util.notify('Getting details, please wait', 'loading');
			axios.get(data.getBaseURL()+'api/v1/order/'+this.order_id)
				 .then(function(response){
				 	$.notifyClose();
				 	vm.order_detail = response.data;
				 })
				 .catch(function(error){
				 	util.notify('An error occured', 'error')
				 })
		},

		getItem: function(item){
			return item.order_item_quantity+'  x  '+item.product.product_name;
		},

		toCurrency: function(item){
			return util.toCurrency(item.order_item_quantity*item.product.product_price);
		},

		cancelOrder: function(){
			var vm = this;
			util.hideModal('#cancelModal');
			util.notify('Cancelling your order, please wait...', 'loading');
			axios.get(data.getBaseURL()+'api/v1/order/cancel/'+this.order_id)
				 .then(function(response){
				 	if (response.data.status){
				 		if (response.data.status == 'success'){
				 			util.notify('Order cancelled');
					 		vm.$router.push('/order/'+vm.type);
				 		} else
					 		util.notify('An error occured', 'error');
				 	} else {
				 		util.notify('An error occured', 'error');				 		
				 	}
				 }).catch(function(error){
			 		util.notify('An error occured', 'error');
				 })
		},

		completeOrder: function(){
			var vm =this;
			util.hideModal('#completeModal');
			util.notify('Loading please wait...', 'loading');
			axios.get(data.getBaseURL()+'api/v1/order/complete/'+this.order_id)
				 .then(function(response){
				 	if (response.data.status){
				 		if (response.data.status == 'success'){
				 			util.notify('Order completed', 'success');
					 		vm.$router.push('/order/'+vm.type);
				 		} else
					 		util.notify('An error occured', 'error');
				 	} else {
				 		util.notify('An error occured', 'error');				 		
				 	}
				 }).catch(function(error){
			 		util.notify('An error occured', 'error');
				 })
		}
	},

	computed: {
		fullname: function() {
			var firstname = this.order_detail.order_firstname;
			var lastname = this.order_detail.order_lastname;
			return  firstname+' '+lastname;
		},

		items: function(){
			var item = [];
			if (this.order_detail.order_item)
				item = this.order_detail.order_item;
			return item;
		},

		totalPrice: function(){
			var price = 0;
			for (var i in this.items) {
				price += this.items[i].order_item_quantity*parseFloat(this.items[i].product.product_price);
			}
			return util.toCurrency(price);
		},

		type: function() {
			return this.$route.params.type;
		},

		order_id: function() {
			return this.$route.params.order_id;
		}
	},

	components: {
		'info': {
			props: ['_key','value'],
			template: '<tr>\
						<td>\
							<h5><b>{{ _key }}&nbsp;&nbsp;</b></h5>\
						</td>\
						<td>\
							<h5>{{ value }}</h5>\
						</td>\
					   </tr>'
		}
	}
}
</script>