'use strict';

(function() {
	angular
		.module('messengerApp', ['ui.router'])
		.controller('LoginController', LoginController)
		.factory('AuthService', AuthService)
		.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
			$urlRouterProvider.otherwise('/');

			$stateProvider
				.state('home', {
					url: '/',
					templateUrl: 'public/app/main/main.view.html',
					controller: 'MainController as mainCtrl',
				})
				.state('login', {
					url: '/login',
					templateUrl: 'public/app/login/login.view.html',
					controller: 'LoginController as loginCtrl',
				});
		}]);

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

		function loginSuccess(data) {
			console.log('Login success');
			console.log(data);
		}

		function loginError(data) {
			console.log('Login error');
			console.log(data);
		}

		function register(user) {
			return $http
				.post('/users/register', user)
				.then(registerSuccess, registerError);
		}

		function registerSuccess(data) {
			console.log('Register success');
			console.log(data);
		}

		function registerError(data) {
			console.log('Register error');
			console.log(data);
		}
	}

	LoginController.$inject = ['AuthService'];

	function LoginController(AuthService) {
		let vm = this;
		vm.login = login;

		function login(user) {
			console.log('Logging in');
			AuthService.login(user);
		}
	}

})();