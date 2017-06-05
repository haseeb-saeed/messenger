'use strict';

(function() {
	angular
		.module('messengerApp')
		.controller('MainController', MainController);

	MainController.$inject = [];

	function MainController() {
		let vm = this;
		vm.name = 'Haseeb Saeed';
	}
})();