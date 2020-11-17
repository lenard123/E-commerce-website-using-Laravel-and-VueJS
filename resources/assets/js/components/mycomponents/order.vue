<template>
<div class="col-md-9" v-if="orders.length > 0">
	<div class="panel panel-default">
		<div class="panel-body">
			<h4>{{ name }}</h4>
			<div class="table-responsive">
				<table class="table table-hover">
					<thead>
						<tr>
							<th>Order date</th>
							<th>Items</th>
							<th>Price</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						<tr v-for="order in orders">
							<td>{{ toDate(order.created_at) }}</td>
							<td>{{ order.order_quantity }}</td>
							<td>{{ toCurrency(order.order_price) }}</td>
							<td><span class="pull-right">
									<router-link :to="{path:detailLink, query:{id:order.id}}">View</router-link>
								</span>
							</td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>
	</div>
</div>
</template>

<script type="text/javascript">
export default{
	props: {
		name: {default:''},
		orders: {default:[]},
		detailLink: {default: '/order-details'}
	},

	methods:{
		toDate: function(date) {
			//return (new Date(date)).toDateString();
			return util.toDate(date);
		},

		toCurrency: function(x) {
			return util.toCurrency(x);
		}
	}
}
</script>