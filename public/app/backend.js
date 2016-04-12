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
      .otherwise({redirectTo: '/'});
  }

  angular
    .module('backend')
    .config(['$routeProvider', config]);
})();