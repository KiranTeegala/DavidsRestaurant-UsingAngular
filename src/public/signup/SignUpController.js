(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController)
.service('MenuDataService',MenuDataService);

SignUpController.$inject=['$http','MenuDataService'];
function SignUpController($http,MenuDataService) {
  var reg = this;
  reg.MenuDataService=MenuDataService;
  reg.submit = function () {
    reg.completed = true;
    reg.MenuDataService.setItemsForCategory(reg.usermenuitem);
    reg.MenuDataService.setUserDetails(reg.user);
    reg.MenuDataService.checkuserregistered(reg.errorstatus);
  };
  reg.getItemValidated=function(shortname){
  	return $http({
  	method: 'GET',
    url: ("https://davids-restaurant.herokuapp.com/menu_items.json")
	}).then(function successCallback(response) {
			reg.items=response.data;
			for (var i = reg.items.menu_items.length - 1; i >= 0; i--) {
			//console.log("reg.items.menu_items[i].short_name"+reg.items.menu_items[i].short_name);

			if(reg.items.menu_items[i].short_name===reg.user.shortname){
				reg.message= reg.user.username+", is registered successfully. Your Information is saved";
				reg.Itemvalidationmessage="Validated Successfully";
				reg.errorstatus= true;
				reg.user.imagecode=reg.user.shortname.replace(/[0-9]/g, '');
				reg.usermenuitem=reg.items.menu_items[i];
				reg.submit();
				break;
			}else if(i==0){
				reg.Itemvalidationmessage="No such menu number exists";
				reg.message= reg.user.username+", NOT registered successfully";
				reg.errorstatus= false;
				break;
			}
		}
	return reg.errorstatus;
	  	});
	};
}

MenuDataService.$inject=['$http'];
function MenuDataService($http){

	var service=this;
	// this.getAllCategories = function(){
	// return $http({
	// 	method: "GET",
	// 	url: ("https://davids-restaurant.herokuapp.com/categories.json")
	// });
	// };

	// service.getAllCategories=function(){
	// $http({
	// 	method: "GET",
	// 	url: "https://davids-restaurant.herokuapp.com/categories.json"
	// }).then(function(response){
	// 	return response.data;
	// });
	// }
	service.items=[];
	service.user=[];
	service.setItemsForCategory=function(menuitem){
	// 	$http({
	// 	method: "GET",
	// 	url: ("https://davids-restaurant.herokuapp.com/menu_items.json?category="+categoryShortName)
	// })
	// .then(function(response){
	// 	console.log("in response");
	// 	service.items= response.data;
	// });
	service.items=menuitem;
	};


	service.getItemsForCategory=function(){
		return service.items;
	};	

	service.setUserDetails=function(user){
		service.user=user;
	};
	service.getUserDetails=function(){
		return service.user;
	};
	
	service.checkuserregistered=function(errorstatus){
		//var user=service.getUserDetails();
		if (errorstatus) {
			console.log("uservalidity"+1);
			return 1;
			console.log("uservalidity"+0);
			return 0;
		} else {
			console.log("uservalidity"+0);
			return 0;
		}
	};

};

})();