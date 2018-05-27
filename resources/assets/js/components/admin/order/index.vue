<template>
<div class="panel panel-default">
	<div class="panel-body">
		<h4>{{ title }}</h4>
		<div class="table-responsive">
			<table class="table table-hover" id="order-table">
				<thead>
					<tr>
						<th>Customer Name</th>
						<th>Price</th>
						<th>Status</th>
						<th>Date</th>
						<th></th>
					</tr>
				</thead>
				<tbody></tbody>
			</table>
		</div>
	</div>
</div>
</template>

<script type="text/javascript">
export default{
	data: function(){
		return {
			orders: []
		}
	},

	created: function(){
		this.$nextTick(function(){
			this.initDataTable(this._orders);
		});

		this.refreshOrders();
	},

	methods: {
		getOrders: function(type) {
			var orders = [];
			for (var i in this.orders) 
				if (this.orders[i].order_status == type || type == 'all' )
					orders.push(this.orders[i]);
			return orders;
		},

		refreshOrders: function() {
			var vm = this;
			util.notify('Refreshing orders', 'loading');
			axios.get(data.getBaseURL()+'api/v1/order')
				 .then(function(response){
				 	$.notifyClose();
				 	vm.orders = response.data;
				 })
				 .catch(function(response){
				 	util.log(response);
				 	util.notify('An error occured', 'error');
				 })
		},

		initDataTable: function(rows) {
			var vm = this;
			var data = this.transformData(rows);
			$('#order-table').DataTable({
				destroy: true,
				aaData: data,
				paging: true,
				ordering: false,
				searching: false,
				info: false,
				autoWidth: false,
			})

			this.addListener();
		},

		transformData: function(orders) {
			var res = [];
			for (var i in orders) {
				var row = [];
				row.push(orders[i]['customer_name']);
				row.push(util.toCurrency(orders[i]['order_price']));
				row.push(this.getStatus(orders[i]['order_status']));
				row.push(util.toDate(orders[i]['created_at']['date']));
				row.push(`<button class="btn btn-info details" id="${orders[i]['id']}">\
							view details \
							<sup><span class="badge">${orders[i]['order_item']}</span></sup>\
						  </button>`);
				res.push(row);
			}

			return res;
		},

		addListener: function() {
			var vm = this;

			$('#order-table_next').click(function(){
				vm.addListener();
			});

			$('.details').click(function(){
				var id = $(this).attr('id');
				vm.$router.push(`/order/${vm.type}/details/${id}`);
			})
		},


		getStatus: function(type) {
			switch (type) {
				case 'complete':
					return `<span class="label label-success">${type}d</span>`;
					break;
				case 'cancel':
					return `<span class="label label-danger">${type}led</span>`;
					break;
				default:
					return `<span class="label label-info">${type}</span>`;
					break;
			}
		},

		toDate: function(date) {
			return (new Date(date)).toDateString();
		}
	},

	watch: {
		_orders: function(val) {
			this.initDataTable(val);
		}
	},

	computed: {
		_orders: function(){
			return this.getOrders(this.type);
		},

		type: function(){
			return this.$route.params.type;
		},

		title: function(){
			switch (this.type) {
				case 'new':
					return 'New orders';
					break;
				case 'complete':
					return 'Completed orders';
					break;
				case 'cancel':
					return 'Cancelled orders';
				default:
					return 'All orders';
					break;
			}
		}
	}
}
</script>