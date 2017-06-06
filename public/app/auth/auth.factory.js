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
			return $http
				.post('/users/authenticate', user)
				.then(loginSuccess, loginError);
		}

		function loginSuccess(response) {
			console.log('Login success');
			console.log(response);
		}

		function loginError(response) {
			console.log('Login error');
			console.log(response);
		}

		function register(user) {
			return $http
				.post('/users/register', user)
				.then(registerSuccess, registerError);
		}

		function registerSuccess(response) {
			console.log('Register success');
			console.log(response);
		}

		function registerError(response) {
			console.log('Register error');
			console.log(response);
		}
	}
})();