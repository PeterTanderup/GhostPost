(function () {
  'use strict';
  angular
    .module('backend')
    .factory('usersService', usersService);

  function usersService($http) {
    var getUsers = function () {
      return $http.get('/api/users')
        .then(function (res) {
          return res.data;
        });
    };

    return {
      getUsers: getUsers
    };
  }
})();