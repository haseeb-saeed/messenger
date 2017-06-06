'use strict';

(function() {
	const app = angular
		.module('messengerApp', ['ui.router'])
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
				})
				.state('register', {
					url: '/register',
					templateUrl: 'public/app/register/register.view.html',
					controller: 'RegisterController as registerCtrl',
				});
		}]);
})();