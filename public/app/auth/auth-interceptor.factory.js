'use strict';

(function() {
	angular
		.module('messengerApp')
		.factory('AuthInterceptor', AuthInterceptor);

	AuthInterceptor.$inject = ['$injector'];

	function AuthInterceptor($injector) {
		const service = {
			request: request,
		};

		return service;

		function request(config) {
			const AuthService = $injector.get('AuthService');
			const token = AuthService.getToken();

			if (token) {
				config.headers = config.headers || {};
				config.headers['x-access-token'] = AuthService.getToken();	
			}

			return config;
		}
	}
})();