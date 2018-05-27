const login_app = new Vue({
	el: '#login_app',
	data: {
		email:'',
		password:''
	},

	created() {

	},

	methods: {
		submit: function() {
			let notif = util.notify('Logging in', 'loading');
			let loginData = this.getData();
			let URL = data.getBaseURL() + 'api/v1/login';

			axios.post(URL, loginData)
				.then( function(response) {
					notif.close();
					if (util.showResult(response))
						location.href = data.getBaseURL() + 'admin';
				})
				.catch( function(error) {
					notif.close();
					util.showResult(error);
				})
		},

		getData: function() {
			/*let data = new util.FormData();
			data.append('email', this.email);
			data.append('password', this.password);*/
			return $('#login_form').serialize();
		}		
	}
})
