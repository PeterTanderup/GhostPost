/**
 * Created by Jesper on 13-Apr-16.
 */
(function () {
    'use strict';
    angular
        .module('backend')
        .factory('categoriesService', categoriesService);

    function categoriesService($http, $resource) {
        var category = $resource('/api/categories/:id', {id: '@_id'}, {'update': {method: 'PUT'}});

        var getCategory = function (id) {
            return category.get({id: id}).$promise;
        };

        var getCategories = function () {
            return category.query().$promise;
        };

        var saveCategory = function (categoryData) {
            if (!categoryData._id) {
                return category.save(categoryData).$promise;
            } else {
                return category.update({id: categoryData._id}, categoryData).$promise;
            }
        };

        var deleteCategory = function (id) {
            return category.remove({id: id}).$promise;
        };

        return {
            getCategory: getCategory,
            getCategories: getCategories,
            saveCategory: saveCategory,
            deleteCategory: deleteCategory
        };
    }
})();