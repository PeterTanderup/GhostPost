/**
 * Created by Jesper on 13-Apr-16.
 */
(function () {
    angular
        .module('backend')
        .controller('categoriesCtrl', categoriesCtrl);

    function categoriesCtrl (categoriesService, $location) {
        var vm = this;
        vm.message = 'Manage Categories';
        vm.test = 'Test';
        categoriesService.getCategories().then(function (data) {
            vm.categories = data;
        });

        vm.addCategory = function() {
            $location.path('/categories/category/new');
        };

        vm.editCategory = function(id) {
            $location.path('/categories/category/' + id);
        };

        vm.deleteCategory = function (id) {
            $location.path('/categories/delete/' + id);
        };
    }
})();