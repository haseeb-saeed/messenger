'use strict';

(function() {
	angular
		.module('messengerApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = ['$location', 'AuthService'];

	function LoginController($location, AuthService) {
		let vm = this;
		vm.login = login;

		function login(user) {
			AuthService.login(user, loginSuccess, loginError);
		}

		function loginSuccess(response) {
			$location.path('/');
		}

		function loginError(response) {
			// TODO: Handle logging in errors
		}
	}
})();