(function () {
"use strict";

angular.module('public')
.controller('UserItemsController', UserItemsController);

UserItemsController.$inject=['MenuDataService'];
function UserItemsController(MenuDataService) {
	var itemctrl=this;
	itemctrl.items=MenuDataService.getItemsForCategory();
	itemctrl.user=MenuDataService.getUserDetails();
	itemctrl.uservalidity=MenuDataService.checkuserregistered();
}
})();