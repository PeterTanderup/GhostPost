(function () {
  'use strict';
  angular
    .module('backend')
    .factory('usersService', usersService);

  function usersService($http, $resource) {
    var user = $resource('/api/users/:id', {id: '@_id'}, {'update': {method: 'PUT'}});

    var getUser = function (id) {
      console.log(user);
      return user.get({id: id}).$promise;
    };

    var getUsers = function () {
      return user.query().$promise;
    };

    var saveUser = function (userData) {
      if (!userData._id) {
        return user.save(userData).$promise;
      } else {
        return user.update({id: userData._id}, userData).$promise;
      }
    };

    var deleteUser = function (id) {
      return user.remove({id: id}).$promise;
    };

    return {
      getUser: getUser,
      getUsers: getUsers,
      saveUser: saveUser,
      deleteUser: deleteUser
    };
  }
})();