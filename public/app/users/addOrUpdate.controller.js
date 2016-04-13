(function () {
  angular
    .module('backend')
    .controller('addOrUpdateCtrl', addOrUpdateCtrl);

  function addOrUpdateCtrl (usersService, $location, $routeParams) {
    var vm = this;
    if ($routeParams.id === 'new') {
      vm.message = 'Add a new user';
      vm.user = {};
      vm.readonly = false;
    } else {
      vm.message = 'Update user';
      vm.user = {};
      vm.readonly = true;
      usersService.getUser($routeParams.id)
        .then(function (data) {
          vm.user = data;
        })
        .catch(function (err) {
          vm.error = err.data.name || err.data.message;
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
          vm.error = err.data.name || err.data.message;
        });
    };
  }
})();