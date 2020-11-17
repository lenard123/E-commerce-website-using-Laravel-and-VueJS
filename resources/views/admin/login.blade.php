<!Doctype HTML>
<html>
<head>
	<title>E-commerce Admin Login</title>
	<link rel="stylesheet" href="{{ asset('css/bootstrap/dist/css/bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/font-awesome/css/font-awesome.min.css') }}">
	<style type="text/css">
		body{
			padding: 50px 5px;
		}
	</style>
</head>
<body>
<div id="login_app" class="col-md-5 col-md-offset-3">
	<div class="panel panel-default">
		<div class="panel-heading">
			<h4>Admin Login</h4>
		</div>
		<div class="panel-body">
			<form @submit.prevent="submit" id="login_form">
				<div class="form-group">
					<label for="user">Username or Email</label>
					<input type="text" name="email" class="form-control" required/>
				</div>
				<div class="form-group">
					<label for="password">Password</label>
					<input type="password" name="password" class="form-control" id="password" required/>
				</div>

				<label>
					<input 
						type="checkbox" 
						id="visibility"  
						onclick=" $(this)[0].checked ? 
									$('#password').attr('type','text'):
									$('#password').attr('type','password')"/> Show Password
				</label>
				<div class="form-group">
					<input type="submit" class="btn btn-primary form-control" value="Login"/>
				</div>
			</form>
		</div>
	</div>
</div>

<script src="{{ asset('js/Vue.js') }}"></script>
<script src="{{ asset('js/vue-router.js') }}"></script> 
<script src="{{ asset('js/axios.js') }}"></script>
<script src="{{ asset('js/jquery/dist/jquery.min.js') }}"></script>
<script src="{{ asset('js/jquery.form.js') }}"></script>
<script src="{{ asset('css/bootstrap/dist/js/bootstrap.min.js') }}"></script> 
<script src="{{ asset('js/bootstrap-notify.js') }}"></script>
<script src="{{ asset('js/util.js') }}"></script>
<script src="{{ asset('js/data.js') }}"></script>
<script src="{{ asset('js/login_app.js') }}"></script>
<script>
//config
var util = new util(true);
data.setBaseURL("{{ asset('') }}");
</script>

</body>
</html>