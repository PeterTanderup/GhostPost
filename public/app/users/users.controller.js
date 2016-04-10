(function () {
  angular
    .module('backend')
    .controller('usersCtrl', usersCtrl);

  function usersCtrl (usersService) {
    var vm = this;
    vm.message = 'Managing users';
    usersService.getUsers().then(function (data) {
      vm.users = data;
    });
  }
})();