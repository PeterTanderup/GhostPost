(function () {
  angular.module('backend', ['ngResource','ngRoute']);

  config.$inject = ['$routeProvider'];
  function config ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl : 'app/home/home.view.html',
        controller: 'homeCtrl',
        controllerAs: 'vm'
      })
      .when('/users', {
        templateUrl : 'app/users/users.home.view.html',
        controller: 'usersCtrl',
        controllerAs: 'vm'
      })
      .when('/users/user/:id', {
        templateUrl : 'app/users/users.AddOrUpdate.view.html',
        controller: 'addOrUpdateCtrl',
        controllerAs: 'vm'
      })
      .when('/users/delete/:id', {
        templateUrl : 'app/users/users.delete.view.html',
        controller: 'deleteCtrl',
        controllerAs: 'vm'
      })
      .when('/categories', {
        templateUrl: 'app/categories/categories.home.view.html',
        controller: 'categoriesCtrl',
        controllerAs: 'vm'
      })
      .when('/categories/category/:id', {
        templateUrl: 'app/categories/categories.AddOrUpdate.view.html',
        controller: 'catAddOrUpdateCtrl',
        controllerAs: 'vm'
      })
      .when('/categories/delete/:id', {
        templateUrl: 'app/categories/categories.delete.view.html',
        controller: 'deleteCtrl',
      })
      .when('/tags', {
        templateUrl : 'app/tags/tags.home.view.html',
        controller: 'tagsCtrl',
        controllerAs: 'vm'
      })
      .when('/tags/tag/:id', {
        templateUrl : 'app/tags/tags.AddTag.view.html',
        controller: 'addTagCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
  }

  angular
    .module('backend')
    .config(['$routeProvider', config]);
})();