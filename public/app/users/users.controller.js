(function () {
  angular
    .module('backend')
    .controller('usersCtrl', usersCtrl);

  function usersCtrl (usersService, $location) {
    var vm = this;
    vm.message = 'Manage users';
    usersService.getUsers().then(function (data) {
      vm.users = data;
    });

    vm.addUser = function() {
      $location.path('/users/user/new');
    };

    vm.editUser = function(id) {
      $location.path('/users/user/' + id);
    };

    vm.deleteUser = function (id) {
      $location.path('/users/delete/' + id);
    };
  }
})();