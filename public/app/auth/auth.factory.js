'use strict';

(function() {
	angular
		.module('messengerApp')
		.factory('AuthService', AuthService);

	AuthService.$inject = ['$http'];

	function AuthService($http) {
		const service = {
			login: login,
			register: register,
		};

		return service;

		function login(user) {
			console.log('Heh login');
			return $http
				.post('/users/authenticate', user)
				.success(loginSuccess)
				.error(loginError);
		}

		function loginSuccess(data) {
			console.log('Login success');
			console.log(data);
		}

		function loginError() {
			console.log('Login error');
		}

		function register(user) {
			return $http
				.post('/users/register', user)
				.success(registerSuccess)
				.error(registerError);
		}

		function registerSuccess(data) {
			console.log('Register success');
			console.log(data);
		}

		function registerError() {
			console.log('Register error');
		}
	}
})();