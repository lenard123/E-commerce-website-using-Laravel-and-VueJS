<!Doctype HTML>
<html>
<head>
	<title>E-commerce Admin</title>
	<link rel="stylesheet" href="{{ asset('css/bootstrap/dist/css/bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/datatables.net-bs/datatables.bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/font-awesome/css/font-awesome.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/Ionicons/css/ionicons.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/AdminLTE/dist/css/AdminLTE.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/AdminLTE/dist/css/skins/skin-blue.min.css') }}">
	<style type="text/css">
		.child-active {
			color: #fff !important;
		}

		.white {
			background-color: #fff;
		}

		.lime {
			color: lime;
		}
	</style>
</head>
<body class="hold-transition skin-blue sidebar-mini">
<div id="app" class="wrapper">
	<header class="main-header">

		<!-- Logo-->
		<a href="" class="logo">
			<span class="logo-mini"><b>L's</b> online shop</span>
			<span class="logo-lg"><b>Lenard's</b> online shop</span>
		</a>

		<!-- Header Navbar -->
		<nav class="navbar navbar-static-top" role="navigation">
			<!-- Sidebar toggle button-->
			<a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
				<span class="sr-only">Toggle navigation</span>
			</a>

			<!-- Navbar Right Menu -->
			<div class="navbar-custom-menu">
				<ul class="nav navbar-nav">
					<!-- User Account Menu -->
					<li class="dropdown user user-menu">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">
							<img v-bind:src="admin.admin_image" class="user-image" alt="User Image">
							<span class="hidden-xs">@{{ admin.admin_name }}</span>
						</a>
						<ul class="dropdown-menu">
							<!-- The user image in the menu -->
							<li class="user-header">
								<img v-bind:src="admin.admin_image" class="img-circle" alt="User Image">
								<p>@{{ admin.admin_name }} - @{{ admin.admin_type==1?'Admin':'Co-admin' }} 
									<small>since @{{ admin.created_at }}</small>
								</p>
							</li>
							<!-- Menu Footer-->
							<li class="user-footer">
								<div class="pull-left">
									<a href="#" class="btn btn-default btn-flat">Profile</a>
								</div>
								<div class="pull-right">
									<a href="#" class="btn btn-default btn-flat" onclick="util.showModal('#logoutModal')">Sign out</a>
								</div>
							</li>
						</ul>
					</li>
				</ul>
			</div>
		</nav>
	</header>	
	<aside class="main-sidebar">

		<!-- sidebar: style can be found in sidebar.less -->
		<section class="sidebar">

			<!-- Sidebar user panel (optional) -->
			<div class="user-panel">
				<div class="pull-left image">
					<img v-bind:src="admin.admin_image" class="img-circle" alt="User Image">
				</div>
				<div class="pull-left info">
					<p>@{{ admin.admin_name }}</p>
					<!-- Status -->
					<a href="#"><i class="fa fa-circle text-success"></i> Online</a>
				</div>
			</div>

			<!-- search form (Optional) -->
			<form action="#" method="get" class="sidebar-form">
				<div class="input-group">
					<input type="text" name="q" class="form-control" placeholder="Search...">
					<span class="input-group-btn">
						<button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
						</button>
					</span>
				</div>
			</form>
			
			<!-- /.search form -->

			<!-- Sidebar Menu -->
			<ul class="sidebar-menu" data-widget="tree">
				<li class="header">Dashboard</li>
				<!-- Optionally, you can add icons to the links -->
				<!-- Home -->
				<router-link to="/" tag="li" active-class="active" exact>
					<a href=""><i class="glyphicon glyphicon-home"></i> <span>Home</span></a>
				</router-link>
				
				<!-- Manage Category -->
				<router-link to="/category" tag="li" active-class="active">
					<a href=""><i class="glyphicon glyphicon-th-large"></i> <span>Manage Category</span></a>
				</router-link>

				<!-- Manage Subcategory -->
				<router-link to="/subcategory" tag="li" active-class="active">
					<a href=""><i class="glyphicon glyphicon-th-list"></i> <span>Manage Subcategory</span></a>
				</router-link>

				<li class="treeview" :class="{'active':$route.path.match('products')}">
					<a href="#"><i class="fa fa-shopping-cart"></i> <span>Manage Products</span>
						<span class="pull-right-container"><i class="fa fa-angle-left pull-right"></i></span>
					</a>
					<ul class="treeview-menu">
						<li class="header child-active">Select Category</li>
						<li 
							v-for="category in categories" 
							@click="$router.push(`/products/${category.id}/0`)"
							:class="{'active':$route.path.match(`/products/${category.id}`)}">
							<a href="#" @click.prevent="">@{{ minify(category.category_name) }}</a>
						</li>
					</ul>
				</li>
				<li class="treeview" :class="{'active':$route.path.match('order/')}">
					<a href="#"><i class="fa fa-ship"></i> <span>Order Management</span>
						<span class="pull-right-container">
							<i class="fa fa-angle-left pull-right"></i>
						</span>
					</a>
					<ul class="treeview-menu">
						<router-link tag="li" to="/order/all" active-class="active">
							<a href="#">All</a>
						</router-link>
						
						<router-link tag="li" to="/order/new" active-class="active">
							<a href="#">New</a>
						</router-link>
						
						<router-link tag="li" to="/order/complete" active-class="active">
							<a href="#">Completed</a>
						</router-link>
						
						<router-link tag="li" to="/order/cancel" active-class="active">
							<a href="#">Cancelled</a>
						</router-link>
					</ul>
				</li>
				<router-link tag="li" to="/customer" active-class="active">
					<a href="#">
						<i class="fa fa-users"></i> 
						<span>Manage Customer</span>
					</a>
				</router-link>
				<router-link v-if="admin.id==1" tag="li" to="/admin" active-class="active">
					<a href="#"><i class="fa fa-shield"></i> <span>Manage Admin</span></a>
				</router-link>>
			</ul>
			
			<!-- /.sidebar-menu -->
		</section>
		<!-- /.sidebar -->
	</aside>			
		
	<!-- Content Wrapper. Contains page content -->
	<div class="content-wrapper">
		<router-view></router-view>
	</div>
	<!-- /.content-wrapper -->	

	<!-- Logout Modal -->
	<modal id="logoutModal">
		<modal-header>Logout</modal-header>
		<modal-body>
			<p>Are you sure to logout?</p>
		</modal-body>
		<modal-footer>
			<button class="btn btn-danger" v-on:click="logout()" data-dismiss="modal">Logout</button>	
			<button class="btn btn-default" data-dismiss="modal">Cancel</button>
		</modal-footer>
	</modal>
</div>
<div id="error"></div>

<script src="{{ asset('js/jquery/dist/jquery.min.js') }}"></script>
<script src="{{ asset('css/bootstrap/dist/js/bootstrap.min.js') }}"></script>
<script src="{{ asset('js/datatables.net/js/jquery.dataTables.min.js') }}"></script>
<script src="{{ asset('js/jquery.form.js') }}"></script>
<script src="{{ asset('css/datatables.net-bs/js/dataTables.bootstrap.min.js') }}"></script>
<script src="{{ asset('js/datatables.net/js/jquery.dataTables.buttons.min.js') }}"></script>
<script src="{{ asset('css/AdminLTE/dist/js/adminlte.min.js') }}"></script>
<script src="{{ asset('js/Vue.js') }}"></script>
<script src="{{ asset('js/vue-router.js') }}"></script>
<script src="{{ asset('js/bootstrap-notify.js') }}"></script>
<script src="{{ asset('js/axios.js') }}"></script>
<script src="{{ asset('js/moment.js') }}"></script>
<script src="{{ asset('js/util.js') }}"></script>
<script src="{{ asset('js/data.js') }}"></script>
<script>
//config
var util = new util(true);
data.setBaseURL("{{ asset('') }}");
data.setAdminId({{ session('ID') }});
</script>
<script src="{{ asset('js/app.js') }}"></script>
</body>
</html>