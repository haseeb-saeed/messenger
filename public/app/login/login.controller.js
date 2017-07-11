'use strict';

(function() {
	angular
		.module('messengerApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', 'AuthService'];

	function LoginController($location, AuthService) {
		let vm = this;
		vm.login = login;
		vm.error = null;

		function login(user) {
			AuthService.login(user, loginSuccess, loginError);
		}

		function loginSuccess(response) {
			vm.error = null;
			$location.path('/');
		}

		function loginError(response) {
			if (response.status === 422) {
				vm.error = response.data.error;
			} else {
				vm.error = 'An unknown error occured';
			}
			// TODO: Handle logging in errors
		}
	}
})();