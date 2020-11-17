<!Doctype HTML>
<html>
<head>
	<title>E-commerce</title>
	<link rel="stylesheet" href="{{ asset('css/bootstrap/dist/css/bootstrap.min.css') }}">
	<link rel="stylesheet" href="{{ asset('css/font-awesome/css/font-awesome.min.css') }}">
	<style type="text/css">
		.navbar-default {
			box-shadow: 0 1px 10px rgba(0,0,0,.5);
			background-color: 	#ffffff;
		}

    .card{
      display: inline-block;
      text-align: left;
      width: 250px;
      margin: 10px;
      border-radius: 5px;
      box-shadow: 0px 5px 5px rgb(0, 0, 0, 0.5);
    }

    .card-btn{
      width: 100%;
      bottom: 0px;
    }
</style>
</head>
<body>
<div id="index_app">

<nav class="navbar navbar-default navbar-fixed-top">
  <div class="container-fluid">
    <div class="navbar-header">
      <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
        <span class="icon-bar"></span>
      </button>
      <a class="navbar-brand" href="">E-commerce</a>
    </div>
    <div class="collapse navbar-collapse" id="myNavbar">
      <ul class="nav navbar-nav">
        <router-link active-class="active" to="/" tag="li" exact><a href="#">Home</a></router-link>
        <li class="dropdown" :class="{'active':$route.path.match('category')}">
          <a class="dropdown-toggle" data-toggle="dropdown" href="#">Categories<span class="caret"></span></a>
          <ul class="dropdown-menu">
            <router-link 
              v-for="category in categories"
              :key="category.id"
              active-class="active" 
              :to="`/category/${category.id}`"
              tag="li"><a href="">@{{ category.category_name }}</a>
            </router-link>
          </ul>
        </li>
        <router-link active-class="active" to="/cart" tag="li" v-if="status.LOG == 'IN'">
          <a href="#">Cart <sup v-show="cart_quantity!=0"><span class="badge">@{{ cart_quantity }}</span></sup></a>
        </router-link>
        <router-link 
          active-class="active" 
          to="/order" 
          tag="li" 
          v-if="status.LOG == 'IN' && status.ORDER_QUANTITY > 0">
          <a href="#">Order  <sup v-show="status.ORDER_QUANTITY!=0">
                                <span class="badge">@{{ status.ORDER_QUANTITY }}</span>
                              </sup></a>
        </router-link>
      </ul>
      <ul class="nav navbar-nav navbar-right" v-if="status.LOG != 'IN'">
        <li><a :href="baseURL+'signup?ref='+$route.path"><span class="fa fa-user"></span> Sign Up</a></li>
        <li><a :href="baseURL+'login?ref='+$route.path"><span class="fa fa-sign-in"></span> Login</a></li>
      </ul>
      <ul class="nav navbar-nav navbar-right" v-if="status.LOG == 'IN'">
        <li class="dropdown">
          <a href="#" class="data-toggle" data-toggle="dropdown">
            <span class="fa fa-user"></span> @{{ (status.USER) ? status.USER.customer_name:'' }}
            <span class="caret"></span>
          </a>
          <ul class="dropdown-menu">
            <li><a @click.prevent="logout">Logout</a></li>
          </ul>
        </li>
       </ul> 
    </div>
  </div>
</nav>
<div style="margin-top: 70px"><router-view></router-view></div>

<modal id="loginModal">
  <modal-header>You need to login First!</modal-header>
  <modal-body>
    <div class="form-group">
      <a class="btn btn-info form-control" :href="baseURL+'login?ref='+$route.path">Login here</a>
    </div>
    <div class="form-group">
      <a class="btn btn-default form-control" :href="baseURL+'signup?ref='+$route.path">Doesn't have an account yet? Sign up here</a>
    </div>
  </modal-body>
</modal>

</div>
<div id="error"></div>

<script src="{{ asset('js/Vue.js') }}"></script>
<script src="{{ asset('js/vue-router.js') }}"></script> 
<script src="{{ asset('js/axios.js') }}"></script>
<script src="{{ asset('js/jquery/dist/jquery.min.js') }}"></script>
<script src="{{ asset('css/bootstrap/dist/js/bootstrap.min.js') }}"></script> 
<script src="{{ asset('js/bootstrap-notify.js') }}"></script>
<script src="{{ asset('js/moment.js') }}"></script>
<script src="{{ asset('js/util.js') }}"></script>
<script src="{{ asset('js/data.js') }}"></script>
<script>
//config
var util = new util(true);
data.setBaseURL("{{ asset('') }}");

function showLogin(){
  util.showModal('#loginModal');
}

function addToCart(productId, quantity) {
  if (data.getStatus().LOG != 'IN') return showLogin();
  
}

</script>
<script src="{{ asset('js/index.js') }}"></script>

</body>
</html>
