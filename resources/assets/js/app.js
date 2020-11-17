//Importing Asynchronous Components
const home = (resolve) => require(['./components/admin/home/home.vue'], resolve);

const category = (resolve) => require(['./components/admin/category/category.vue'], resolve);
const categoryIndex = (resolve) => require(['./components/admin/category/index.vue'], resolve);
const categoryAdd = (resolve) => require(['./components/admin/category/add.vue'], resolve);
const categoryEdit = (resolve) => require(['./components/admin/category/edit.vue'], resolve);

const subcategory = (resolve) => require(['./components/admin/subcategory/subcategory.vue'], resolve);
const subcategoryIndex = (resolve) => require(['./components/admin/subcategory/index.vue'], resolve);
const subcategoryAdd = (resolve) => require(['./components/admin/subcategory/add.vue'], resolve);
const subcategoryEdit = (resolve) => require(['./components/admin/subcategory/edit.vue'], resolve);

const product = (resolve) => require(['./components/admin/product/product.vue'], resolve);
const productIndex = (resolve) => require(['./components/admin/product/index.vue'], resolve);
const productAdd = (resolve) => require(['./components/admin/product/add.vue'], resolve);
const productEdit = (resolve) => require(['./components/admin/product/edit.vue'], resolve);

const order = (resolve) => require(['./components/admin/order/order.vue'], resolve);
const orderIndex = (resolve) => require(['./components/admin/order/index.vue'], resolve);
const orderDetails = (resolve) => require(['./components/admin/order/details.vue'], resolve);

const customer = (resolve) => require(['./components/admin/customer/customer.vue'], resolve);
const customerIndex = (resolve) => require(['./components/admin/customer/index.vue'], resolve);
const customerOrders = (resolve) => require(['./components/admin/customer/orders.vue'], resolve);
const customerDetails = (resolve) => require(['./components/admin/customer/details.vue'], resolve);

const admin = (resolve) => require(['./components/admin/admin/admin.vue'], resolve);
const adminIndex = (resolve) => require(['./components/admin/admin/index.vue'], resolve);
const adminAdd = (resolve) => require(['./components/admin/admin/add.vue'], resolve);

require('./components.js');

//Setting up Routes
const routes = [
	{path: '/', component: home},
	{path: '/subcategory', redirect: {path: `/subcategory/${0}`}},
	{path: '/products/:category_id', component: product},
    {
		path: '/category',
		component: category,
		children: [
			{path: '', component: categoryIndex},
			{path: 'add', component: categoryAdd},
			{path: 'edit/:category_id', component: categoryEdit}
		]
	},

	{
		path: '/subcategory/:category_id',
		component: subcategory,
		children: [
			{path: '', component: subcategoryIndex},
			{path:'add', component: subcategoryAdd},
			{path:'edit/:subcategory_id', component: subcategoryEdit}
		]
	},

	{
		path: '/products/:category_id/:subcategory_id',
		component: product,
		children:[
			{path:'', component: productIndex},
            {path:'add', component: productAdd},
            {path:'edit/:product_id', component: productEdit}
		]
	},

    {
        path: '/order/:type',
        component: order,
        children:[
            {path:'', component: orderIndex},
            {path:'details/:order_id', component: orderDetails}
        ]
    },

    {
        path: '/customer',
        component: customer,
        children:[
            {path:'', component: customerIndex },
            {path:'orders/:customer_id', component: customerOrders},
            {path:'orders/:customer_id/details', component: customerDetails}
        ]
    },

    {
        path: '/admin',
        component: admin,
        children: [
            {path: '', component: adminIndex},
            {path: 'add', component: adminAdd}
        ]
    }
];

//Registering routes
const router = new VueRouter({
	routes
});

//Initialize Vue 
const app = new Vue({
	router, 
    el: '#app',
    data: {
    	baseURL: data.getBaseURL(),
    	storageURL: data.getStorageURL(),
    	adminId: data.getAdminId(),

    	try: 0,
    	notif:''
    },

    created() {
        data.setAdmin({
            admin_name: 'Loading...',
            admin_image: 'storage/images/loading.jpg'
        });
    	this.notif = util.notify('Please wait', 'loading');
    	this.getAdmin(this.adminId);
    },

    methods: {

    	/**
    	 * Get Admin information
    	 * @param Int Admin Id
    	 * @return Object admin
    	 */
    	getAdmin: function(adminId) {
    		var vm = this;
    		axios.get(this.baseURL+'api/v1/admin/'+adminId)
    			 .then( function(response) {
    			 	vm.try = 0;
    			 	response.data.admin_image = vm.storageURL+response.data.admin_image;
    			 	data.setAdmin(response.data);
    			 	vm.getCategories();
    			 })
    			 .catch( function(error) {
    			 	util.log(error);
    			 	if (vm.try < 3) {
    			 		vm.try++;
    			 		vm.getAdmin(adminId);
    			 	} else 
    			 		util.notif('An error occured, try to refresh', 'error');
    			 })
    	},

    	/**
    	 * Get Categories
    	 * 
    	 * @return Object[] category
    	 */
    	getCategories: function() {
    		var vm = this;
    		axios.get(this.baseURL+'api/v1/category')
    			.then( function(response) {
    				vm.try = 0;
    				vm.notif.close();
    				data.setCategories(response.data);
                    vm.getSubcategories();
    			})
    			.catch( function(error) {
    				util.log(error);
    				if (vm.try < 3) {
    					vm.try++;
    					vm.getCategories();
    				} else
    					util.notify('An error occured, try to refresh', 'error');
    			})
    	},

        /**
         * Get subcategories
         *
         */
        getSubcategories: function() {
            var vm = this;
            axios.get(this.baseURL+'api/v1/subcategory')
                .then(function(response){
                    vm.try = 0;
                    vm.notif.close();
                    data.setSubcategories(response.data);
                })
                .catch( function(error){
                    util.log(error);
                    if(vm.try < 3) {
                        vm.try++;
                        vm.getSubcategories();
                    } else 
                        util.showResult(error);
                })
        },

    	/**
    	 * End Session / Log out
		 * 
		 * @return Redirect to login page
		 */
    	logout: function() {
    		var vm = this;
    		util.notify('Logging out', 'loading');
    		axios.get(this.baseURL+'api/v1/logout')
    			.then( function(response) {
    				location.href = vm.baseURL+"admin/login";
    			})
    			.catch( function(error) {
    				util.log(error);
    				util.notify('An error occured', 'error');
    			});
    	},

    	/**
    	 * Unescape HTML
    	 * @param "String" html
    	 * @return "String" unescaped html
    	 */
    	minify: function(html) {
    		return util.minify(util.unescapeHTML(html), 15);
    	}
    },

    computed: {
        admin: function() {
            return data.admin;
        },

        categories: function() {
            return data.categories;
        }
    }
});
