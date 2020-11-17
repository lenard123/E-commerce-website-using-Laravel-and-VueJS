<!Doctype HTML>
<html>
<head>
	<title>E-commerce Login</title>
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
			<h4>Login</h4>
		</div>
		<div class="panel-body">
			<form @submit.prevent="submit" id="login_form">
				<div class="form-group">
					<label for="user">Username or Email</label>
					<input type="text" name="user" class="form-control" required/>
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
				<center>
					<h6>Doesn't have an account yet? Sign up <a :href="baseURL+'signup?ref='+ref">here</a></h6>
				</center>
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
<script>
//config
var util = new util(true);
data.setBaseURL("{{ asset('') }}");

var app = new Vue({
	el: '#login_app',
	data:{
		baseURL:data.getBaseURL(),
		ref: '{{ $request->ref }}'
	},

	methods:{
		submit: function() {
			var vm = this;
			util.notify('Logging in, please wait...', 'loading');
			axios.post(this.baseURL+'api/v1/user/customer/login', $('#login_form').serialize())
				.then(function(response){
					if (response.data.status == 'success') {
						util.notify(util.messageToString(response.data.message),'success');
						location.href = vm.baseURL+'#'+vm.ref;
					}  else {
						util.notify(util.messageToString(response.data.message), 'error');
					}
				})
				.catch(function(error){
					util.showResult(error);
				})
		}
	}
})

</script>

</body>
</html>