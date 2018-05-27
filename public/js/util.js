var util = function (debug) {
	var version = 'v1.2';
	var author = 'Lenard Mangay-ayam';
	if (debug == undefined) debug = false;
	if (debug) {
		console.log('You are running utility on debug');
		console.log('Version '+version)
		console.log('Author '+author)
	}
	return {
		fulllogs:[],
		/**
		 * Shows an alert message to notify the user
		 * @param String message, String type (info, loading, error, success), Integer delay
		 * @return Notify message
		 */
		notify: function(message, type, delay) {
			$.notifyClose()
			
			type = (type == undefined) ? 'info' : type;
			delay = (type == 'loading') ? 0 : 5000;

			var placement = {from: 'top', align: 'center'}
			var notif = $.notify({message: message},{placement: placement, delay: delay})
			notif.update('type', 'info');
			notif.update('icon', 'fa fa-info');

			switch (type) {
				case 'error':
					notif.update('type', 'danger');
					notif.update('icon', 'fa fa-warning');
					break;
				case 'loading':
					notif.update('icon', 'fa fa-refresh fa-spin');
					break;
				case 'success':
					notif.update('type', 'success');
					notif.update('icon', 'fa fa-check');
					break;
				default:
					break;
			}
			return notif;
		},

		/**
		* Deprecated
		* Show notification
		* @params String message Integer delay
		* @return notify
		*/
		notif: function(message, delay) {
			this.log('This method is deprecated use "notify.info(message,type,delay)" instead')
			if (delay == undefined) delay = 5000;
			return this.notify(message, 'info', delay);
		},

		/**
		* read a file and display the image
		* @params String fileId, String imageId
		*/
		readFile: function(fileId, imageId) {
			var inputFile = $(fileId)[0];
			var inputImage = $(imageId);
			if (inputFile.files && inputFile.files[0]) {
				var reader = new FileReader();
				reader.onload = function(e) { inputImage.attr('src', e.target.result)};
				reader.readAsDataURL(inputFile.files[0]);
			}
		},

		/**
		* escapeHTML to avoid XSS
		* @params  String text
		* @return string Escape HTML
		*/
		escapeHtml: function(text) {
			if (typeof input != 'string') return text;
			var map = {
				'&': '&amp;',
				'<': '&lt;',
				'>': '&gt;',
				'"': '&quot;',
				"'": '&#039;'
			};

			return text.replace(/[&<>"']/g, function(m) { return map[m]; });
		},

		/**
		* unescape HTML to get the actual text
		* @params String input
		* @return String unescape HTML
		*/
		unescapeHTML: function(input) {
			if (typeof input != 'string') return input;
			var map = {
		      '&amp;':'&',
		      '&lt;':'<',
		      '&gt;':'>',
		      '&quot;':'"',
		      '&#039;':'\''
		    };
		    return input.replace(/&amp;|&lt;|&gt;|&quot;|&#039;/g, function(x) {return map[x];});
			/*
			var e = document.createElement('div');
			e.innerHTML = input;
			return e.childNodes.length === 0 ? "" : e.childNodes[0].nodeValue;
			*/
		},

		lineBreak: function(string) {
			return string.replace(/\n/g, function(x) {
				return '<br/>';
			});
		},

		/**
		* get Progressbar Message
		* @params String title, Integer percent
		* @return String progressbarMessage
		*/
		getProgressbarMessage: function(title, percent) {
			return '<label>'+title+'</label>'+
					'<div class="progress">'+
						'<div class="progress-bar progress-bar-green" role="progressbar" aria-valuenow="'+percent+'" aria-valuemin="0" aria-valuemax="100" style="width: '+percent+'%">'+
						'</div>'+
					'</div>';
		},

		/**
		* convert array of message to string
		* @params String[] message
		* @return String message
		*/
		messageToString: function(message) {
			if (message == undefined) return ''; 
			var res = ''
			for (var i in message) 
				res += message[i] + '<br/>';
			return res;
		},

		/**
		* get the error message in error response
		* @params Sting[][] stat
		* @return String message
		*/
		validateErrorMessage: function(stat) {
			var message = '';
			for (var y in stat) 
	 			for (var z in stat[y])  
	 				message += stat[y][z] + '<br/>';
	 		return message;
		},

		/**
		* print log output if debug mode
		* @params Object message
		*/
		log: function(message) {
			if (debug) 
				console.log(message);
			this.fulllogs.push(message);
		},

		/**
		* minify the content string
		* @params String str, Integer length
		* @return String minified message
		*/
		minify: function(str, length) {
			if (str == undefined) str = '';
			if (str.length > length) 
				return str.slice(0, length) + '...';
			else 
				return str;
		},

		/**
		* Show the response mesage
		* @params Object response, String type (ajax/axios)
		* @return Notify message
		*/
		showResult: function(response, type) {
			this.log(response);

			var status = 0;
			var errMessage = 'An error occured';
			var message = '';
			var error = false;
			switch (type) {
				case 'ajax':
					error = response.responseText ? true:false;
					status = response.status;
					errMessage = status == 422 ? this.validateErrorMessage(response.responseJSON) : errMessage;
					message = response.message ? this.messageToString(response.message) : message;
					break;
				default:
					error = response.data ? false : true;
					status = error  ? response.response.status : response.data.status; 
					errMessage = status == 422 ? this.validateErrorMessage(response.response.data) : errMessage;
					message = response.data && response.data.message ? this.messageToString(response.data.message) : message;
					break;
			}

			if (error) {
				this.notify(errMessage, 'error');
			} else {
				switch (status) {
					case 'success':
						this.notify(message, 'success');
						return true;
						break;
					case 'failed':
						this.notify(message, 'error');
						break;
					default:
						this.notify('An error occured', 'error');
						break;
				}
			}
		},

		/**
		* Print error
		* @params Object error
		*/
		viewError: function(error) {
			document.getElementById('error').innerHTML = error;
		},

		/**
		* Close error
		*/
		closeError: function() {
			document.getElementById('error').innerHTML = ''
		},

		/**
		 * Create Custom Form data
		 * 
		 * @return Object form data
		 */

		FormData: function() 
		{
			return (
			{
				append: function (key, value) 
				{
					this[key] = value;
				}
			});
		},

		/**
		 * Show Modal
		 * @param String Modal Id
		 *
		 */
		showModal: function(modalId) {
			$(modalId).modal('show');
		},

		/**
		 * Hide Modal
		 * @param String Modal Id
		 *
		 */
		hideModal: function(modalId) {
			$(modalId).modal('hide');
		},

		/**
		 * Get Axios Config
		 * @param String Message
		 * @return Object axios config
		 */
		getAxiosConfig: function(message) {
			var progressbarMessage = this.getProgressbarMessage(message, 0)
			var progressbar = this.notify(progressbarMessage, 'info', 0);
			return {
				progressbar: progressbar,
				currentPercent: 0,
				onUploadProgress: function(progressEvent) {
					var percentCompleted = Math.round( (progressEvent.loaded * 100) / progressEvent.total );
					progressbar.update('message', util.getProgressbarMessage(message, percentCompleted));
				},
				close: function() {
					progressbar.close();
				}
			}
		},

		/**
		 * Return response and set status
		 * @param {Response} result
		 * @return {Response} data	 	
		 */
		getResponse: function(response) {
			util.log(response);
			var responseData = response.data ? response.data : response;
			data.setStatus(responseData.status);
			return responseData.result;
		},

		/**
		 * Transform integer into currency
		 * @param 	{Integer}	int
		 * @return 	{String}	currency
		 */
		toCurrency: function(x) {
			return '₱'+x.toLocaleString();
		},

		toDate: function(date) {
			return moment(date).fromNow();
		}	
	}
}
