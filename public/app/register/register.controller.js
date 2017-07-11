'use strict';

(function() {
	angular
		.module('messengerApp')
		.controller('RegisterController', RegisterController);

	RegisterController.$inject = ['$location', 'AuthService'];

	function RegisterController($location, AuthService) {
		let vm = this;
		vm.register = register;
		vm.error = null;

		function register(user) {
			AuthService.register(user, registerSuccess, registerError);
		}

		function registerSuccess(response) {
			vm.error = null;
			$location.path('/');
		}

		function registerError(response) {
			if (response.status === 422) {
				vm.error = response.data.error;
			} else {
				vm.error = 'An unknown error occured';
			}
		}
	}
})();