/**
 * Created by Jesper on 13-Apr-16.
 */
(function () {
    angular
        .module('backend')
        .controller('deleteCtrl', deleteCtrl);

    function deleteCtrl (categoriesService, $location, $routeParams) {
        var vm = this;
        vm.message = 'Are you sure you want to delete this category?';
        categoriesService.getCategory($routeParams.id)
            .then(function (data) {
                vm.category = data;
            })
            .catch(function (err) {
                vm.error = err.data.name;
            });

        vm.back = function () {
            $location.path('/categories');
        };

        vm.deleteCategory = function () {
            categoriesService.deleteCategory(vm.category._id)
                .then(function () {
                    $location.path('/categories');
                })
                .catch(function (err) {
                    vm.error = err.data.name;
                });
        };
    }
})();