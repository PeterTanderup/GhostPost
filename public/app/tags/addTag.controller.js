(function () {
  angular
    .module('backend')
    .controller('addTagCtrl', addTagCtrl);

  function addTagCtrl (tagsService, $location, $routeParams) {
    var vm = this;
    if ($routeParams.id === 'new') {
      vm.message = 'Add a new tag';
    } 

    vm.back = function () {
      $location.path('/tags');
    };

    vm.saveTag = function () {
      tagsService.saveTag(vm.tag)
        .then(function () {
          $location.path('/tags');
        })
        .catch(function (err) {
          vm.error = err.data.name;
        });
    };
  }
})();