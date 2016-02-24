(function () {
  'use strict';

  function adminService($http) {
    var getUsers = function () {
      return [
        {
          username: 'Peter',
          name: 'Peter Tanderup'
        },
        {
          username: 'Jesper',
          name: 'Jesper Purup'
        },
        {
          username: 'test',
          name: 'test'
        }
      ];
    };

    return {
      getUsers: getUsers
    };
  }

  angular.module('admin').factory('adminService', adminService);
})();