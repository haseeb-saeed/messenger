'use strict';

(function() {
	const app = angular
		.module('messengerApp', ['ui.router', 'ngResource', 'ngStorage', 'ui.bootstrap'])
		.config(['$stateProvider', '$urlRouterProvider', '$httpProvider', config])
		.run(['$transitions', '$location', 'AuthService', run]);

	function config($stateProvider, $urlRouterProvider, $httpProvider) {
		$urlRouterProvider.otherwise('/');

		$stateProvider
			.state('home', {
				url: '/',
				templateUrl: 'public/app/main/main.view.html',
				controller: 'MainController as mainCtrl',
				authenticate: true,
			})
			.state('login', {
				url: '/login',
				templateUrl: 'public/app/login/login.view.html',
				controller: 'LoginController as loginCtrl',
				authenticate: false,
			})
			.state('register', {
				url: '/register',
				templateUrl: 'public/app/register/register.view.html',
				controller: 'RegisterController as registerCtrl',
				authenticate: false,
			});

		$httpProvider.interceptors.push('AuthInterceptor');
	}

	function run($transitions, $location, AuthService) {
		$transitions.onBefore({}, onBeforeTransition);

		function onBeforeTransition(trans) {
			const authenticate = trans.$to().authenticate;

			// Redirect to login if not logged in
			if (!AuthService.isLoggedIn() && authenticate) {
				$location.path('/login');
				return false;
			} else if (AuthService.isLoggedIn() && !authenticate) {
				$location.path('/');
				return false;
			}

			return true;
		}
	}
})();