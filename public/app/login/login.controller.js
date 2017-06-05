'use strict';

(function() {
	angular
		.module('messengerApp')
		.controller('LoginController', LoginController);

	LoginController.$inject = [];

	function LoginController() {
		let vm = this;
		vm.name = 'Paul McCartney';
	}
})();