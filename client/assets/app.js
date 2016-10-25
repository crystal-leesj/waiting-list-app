var app = angular.module('app', ['ngRoute', 'ngMessages', 'ngCookies', 'btford.socket-io']);


app.config(function ($routeProvider) {
  $routeProvider
  .when('/login',{
    templateUrl: 'partials/login.html',
    controller: 'LoginController'
  })
  .when('/register',{
    templateUrl: 'partials/register.html',
    controller: 'RegisterController'
  })
  .when('/:urlname',{
    templateUrl: 'partials/waitlist.html',
    controller: 'WaitlistController'
  })
  .when('/:urlname/dashboard',{
    templateUrl: 'partials/dashboard.html',
    controller: 'DashboardController'
  })
  .when('/:urlname/new',{
    templateUrl: 'partials/new.html',
    controller: 'NewController'
  })
  .otherwise({
    redirectTo: '/login'
  });
});
