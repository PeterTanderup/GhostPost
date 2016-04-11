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
        templateUrl : 'app/users/users.view.html',
        controller: 'usersCtrl',
        controllerAs: 'vm'
      })
      .otherwise({redirectTo: '/'});
  }

  angular
    .module('backend')
    .config(['$routeProvider', config]);
})();