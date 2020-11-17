var data = new Vue({
	data: function() {
		return {
			baseURL: '',
			
			categories:[],
			category:{},
			
			subcategories:[],
			subcategory:{},
			
			products:[],
			product:{},
			
			admin: {},
			adminId: 0,

			status: {},

			orders: []
		}
	},

	methods: {
		/** 
		 * Get orders
		 * 
		 * @return {Array} orders
		 */
		getOrders: function() {
			return this.orders;
		},

		/**
		 * Set orders
		 * @param {Array} orders
		 *
		 */
		setOrders: function(orders) {
			this.orders = orders;
		},


		/** 
		 * Get Status
		 *
		 * @return {Object} status
		 */
		getStatus: function() {
			return this.status;
		},

		/**
		 * Set Status
		 * @param {Object} status
		 *
		 */
		setStatus: function(status) {
			this.status = status;
		},

		/** 
		 * Get Product
		 *
		 * @return {Object} product
		 */
		getProduct: function() {
			return this.product;
		},

		/**
		 * Set Product 
		 * @param {Object} product
		 * 
		 */
		setProduct: function(product) {
			this.product = product;
		},

		/**
		 * Get Products
		 * 
		 * @return [{Product}] 
		 */
		getProducts: function() {
			return this.products;
		},

		/**
		 * Set Products
		 * @param [{Products}]
		 */
		setProducts: function(products) {
			this.products = products;
		},




		/** 
		 * Get subcategories
		 *
		 * @return [{Subcategory}] subcategories
		 */
		getSubcategories: function() {
			return this.subcategories;
		},

		/**
		 * Set Subcategories
		 * [{Subcategories}]
		 *
		 */
		setSubcategories: function(subcategories) {
			this.subcategories = subcategories;
		},




		/**
		 * Get Storage URL
		 * 
		 * @return String Storage Url
		 */
		getStorageURL: function() {
			return this.getBaseURL()+'storage/';
		},



		/**
		 * Set Base URL
		 * @param String baseURL
		 * 
		 */
		setBaseURL: function(baseURL) { 
			this.baseURL = baseURL;
		},

		/**
		 * Get Base URL
		 *
		 * @return baseURL
		 */
		getBaseURL: function() { 
			return this.baseURL;
		},




		/**
		 * Set Categories
		 * @param Object[] categories
		 *
		 */
		setCategories: function(categories) {
			this.categories = categories;
		},

		/**
		 * Get Categories
		 * 
		 * @return Object[] categories
		 */
		getCategories: function() {
			return this.categories;
		},




		/**
		 * Set Admin
		 * @param Object admin
		 *
		 */
		setAdmin: function(admin) {
			this.admin = admin;
		},

		/** Get Admin
		 * 
		 * @return Object admin
		 */
		getAdmin: function() {
			return this.admin;
		},




		/**
		 * Set Admin Id
		 * @param Int admin id
		 *
		 */
		setAdminId: function(adminId) {
			this.adminId = adminId;
		},

		/**
		 * Get Admin Id
		 * 
		 * @return Int admin Id
		 */
		getAdminId: function() {
			return this.adminId;
		},




		/**
		 * Set Category
		 * @param Object Category
		 *
		 */
		setCategory: function(category) {
			this.category = category;
		},

		/**
		 * Get Category
		 * 
		 * @return Object category
		 */
		getCategory: function() {
			return this.category;
		},




		/**
		 * Set Subcategory
		 * @param {Object} Subcategory
		 *
		 */
		setSubcategory: function(subcategory) {
			this.subcategory = subcategory;
		},

		/**
		 * Get Subcategory
		 * 
		 * @return {Object} Subcategory
		 */
		getSubcategory: function() {
			return this.subcategory;
		}
	}
})