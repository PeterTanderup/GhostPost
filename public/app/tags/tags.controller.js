(function () {
  angular
    .module('backend')
    .controller('tagsCtrl', tagsCtrl);

  function tagsCtrl (tagsService, $location) {
    var vm = this;
    vm.message = 'Manage tags';
    tagsService.getTags().then(function (data) {
      vm.tags = data;
    });

    vm.addTag = function() {
      $location.path('/tags/tag/new');
    };

    vm.editTag = function(id) {
      $location.path('/tags/tag/' + id);
    };

    vm.deleteTag = function (id) {
      $location.path('/tags/delete/' + id);
    };
  }
})();