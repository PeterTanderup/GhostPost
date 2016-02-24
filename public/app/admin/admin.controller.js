(function () {
  'use strict';

  angular.module('admin', []).controller('adminController', adminController);
  
  function adminController($scope, adminService) {
    $scope.users = adminService.getUsers();
  }
})();