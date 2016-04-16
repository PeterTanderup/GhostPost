(function () {
  angular
    .module('backend')
    .controller('deleteTagCtrl', deleteTagCtrl);

  function deleteTagCtrl (tagsService, $location, $routeParams) {
    var vm = this;
    vm.message = 'Are you sure you want to delete this tag?';
    tagsService.getTags($routeParams.id)
        .then(function (data) {
          vm.tag = data;
        })
        .catch(function (err) {
          vm.error = err.data.name;
        });

    vm.back = function () {
      $location.path('/tags');
    };

    vm.deleteTag = function () {
      tagsService.deleteTag(vm.tag._id)
        .then(function () {
          $location.path('/tags');
        })
        .catch(function (err) {
          vm.error = err.data.name;
        });
    };
  }
})();