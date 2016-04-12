(function () {
  angular
    .module('backend')
    .controller('deleteCtrl', deleteCtrl);

  function deleteCtrl (usersService, $location, $routeParams) {
    var vm = this;
    vm.message = 'Are you sure you want to delete this user';
    usersService.getUser($routeParams.id)
        .then(function (data) {
          vm.user = data;
        })
        .catch(function (err) {
          vm.error = err.data.name;
        });

    vm.back = function () {
      $location.path('/users');
    };

    vm.deleteUser = function () {
      usersService.deleteUser(vm.user._id)
        .then(function () {
          $location.path('/users');
        })
        .catch(function (err) {
          vm.error = err.data.name;
        });
    };
  }
})();