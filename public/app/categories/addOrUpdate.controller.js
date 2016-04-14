/**
 * Created by Jesper on 13-Apr-16.
 */
(function () {
    angular
        .module('backend')
        .controller('catAddOrUpdateCtrl', catAddOrUpdateCtrl);

    function catAddOrUpdateCtrl (categoriesService, $location, $routeParams) {
        var vm = this;
        if ($routeParams.id === 'new') {
            vm.message = 'Add a new category';
        } else {
            vm.message = 'Update category';
            categoriesService.getCategory($routeParams.id)
                .then(function (data) {
                    vm.category = data;
                })
                .catch(function (err) {
                    vm.error = err.data.name;
                });
        }

        vm.back = function () {
            $location.path('/categories');
        };

        vm.saveCategory = function () {
            categoriesService.saveCategory(vm.category)
                .then(function () {
                    $location.path('/categories');
                })
                .catch(function (err) {
                    vm.error = err.data.name;
                });
        };
    }
})();