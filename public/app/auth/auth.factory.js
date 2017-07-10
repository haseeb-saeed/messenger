'use strict';

(function() {
	angular
		.module('messengerApp')
		.factory('AuthService', AuthService);

	AuthService.$inject = ['$http', '$sessionStorage'];

	function AuthService($http, $sessionStorage) {
		let currentUser = $sessionStorage.user || null;
		let token = $sessionStorage.token || null;

		const service = {
			login: login,
			register: register,
			logout: logout,
			isLoggedIn: isLoggedIn,
			getCurrentUser: getCurrentUser,
			getToken: getToken,
		};

		return service;

		function login(user, onSuccess, onError) {
			return $http
				.post('/users/authenticate', user)
				.then(loginSuccess, loginError);

			function loginSuccess(response) {
				console.log('Login success');
				console.log(response);

				setSession(response.data);

				onSuccess && onSuccess(response);
			}

			function loginError(response) {
				console.log('Login error');
				console.log(response);

				onError && onError(response);
			}
		}


		function register(user, onSuccess, onError) {
			return $http
				.post('/users/register', user)
				.then(registerSuccess, registerError);

			function registerSuccess(response) {
				console.log('Register success');
				console.log(response);
				
				setSession(response.data);

				onSuccess && onSuccess(response);
			}

			function registerError(response) {
				console.log('Register error');
				console.log(response);

				onError && onError(response);
			}
		}


		function isLoggedIn() {
			return !!currentUser;
		}

		function getCurrentUser() {
			return currentUser;
		}

		function getToken() {
			return token;
		}

		function logout() {
			currentUser = null;
			token = null;

			delete $sessionStorage.user;
			delete $sessionStorage.token;
		}

		function setSession(data) {
			currentUser = data.user;
			token = data.token;

			$sessionStorage.user = currentUser;
			$sessionStorage.token = token;
		}
	}
})();