(function () {
"use strict";

angular.module('public')
.component('storeitems', {
  templateUrl: 'src/public/myinfo/getuseritems.html',
  bindings: {
    item: '<',
    user: '<',
    uservalidity: '<'
  }
});


})();