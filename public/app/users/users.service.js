(function () {
  'use strict';
  angular
    .module('backend')
    .factory('usersService', usersService);

  function usersService($http, $resource) {
    var user = $resource('/api/users/:id', {id: '@_id'});

//    var getUsers = function () {
//      return $http.get('/api/users')
//        .then(function (res) {
//          return res.data;
//        });
//    };
    var getUsers = function () {
      return user.query().$promise;
    };

    return {
      getUsers: getUsers
    };
  }
})();