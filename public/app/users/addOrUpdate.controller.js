(function () {
  angular
    .module('backend')
    .controller('addOrUpdateCtrl', addOrUpdateCtrl);

  function addOrUpdateCtrl (usersService, $location, $routeParams) {
    var vm = this;
    if ($routeParams.id === 'new') {
      vm.message = 'Add a new user';
    } else {
      vm.message = 'Update user';
      usersService.getUser($routeParams.id)
        .then(function (data) {
          vm.user = data;
        })
        .catch(function (err) {
          vm.error = err.data.name;
        });
    }

    vm.back = function () {
      $location.path('/users');
    };

    vm.saveUser = function () {
      usersService.saveUser(vm.user)
        .then(function () {
          $location.path('/users');
        })
        .catch(function (err) {
          vm.error = err.data.name;
        });
    };
  }
})();