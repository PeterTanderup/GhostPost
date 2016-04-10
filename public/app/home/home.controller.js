(function () {
  angular
    .module('backend')
    .controller('homeCtrl', homeCtrl);

  function homeCtrl () {
    var vm = this;
    vm.message = 'Welcome to the backend';
  }
})();