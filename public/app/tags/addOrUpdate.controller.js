/**
 * Created by Martin on 20-Apr-16.
 */
(function () {
    angular
        .module('backend')
        .controller('tagAddOrUpdateCtrl', tagAddOrUpdateCtrl);

    function tagAddOrUpdateCtrl (tagsService, $location, $routeParams) {
        var vm = this;
        if ($routeParams.id === 'new') {
            vm.message = 'Add a new tag';
        } else {
            vm.message = 'Update tag';
            tagsService.getTag($routeParams.id)
                .then(function (data) {
                    vm.tag = data;
                })
                .catch(function (err) {
                    vm.error = err.data.name;
                });
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