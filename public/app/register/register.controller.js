'use strict';

(function() {
	angular
		.module('messengerApp')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$location', 'AuthService'];

	function RegisterController($location, AuthService) {
		let vm = this;
		vm.register = register;

		function register(user) {
			AuthService.register(user, registerSuccess, registerError);
		}

		function registerSuccess(response) {
			$location.path('/');
		}

		function registerError(response) {
			// TODO: Handle registration errors
		}
	}
})();