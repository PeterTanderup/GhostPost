(function () {
  'use strict';

  angular.module('admin', []).controller('adminController', adminController);

  function adminController($scope, adminService) {
    adminService.getUsers().then(function (data) {
      $scope.users = data;
    });
  }
})();