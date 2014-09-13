
'use strict';

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/home.html',
      controller: 'HomeCtrl',
      activeRoute: 'home'
    })
    .when('/register', {
      templateUrl: 'views/register.html',
      controller: 'AuthCtrl',
      activeRoute: 'register'
    })
    .when('/login', {
      templateUrl: 'views/login.html',
      controller: 'AuthCtrl',
      activeRoute: 'login'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl',
      activeRoute: 'about'
    })
    .otherwise({
      redirectTo: '/'
    });
});
