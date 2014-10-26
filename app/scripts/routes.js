
'use strict';

app.config(function ($routeProvider) {
  $routeProvider
    .when('/find-someone', {
      templateUrl: 'views/someone.html',
      controller: 'SomeoneCtrl',
      activeRoute: 'someone'
    })
    .when('/find-something', {
      templateUrl: 'views/something.html',
      controller: 'SomethingCtrl',
      activeRoute: 'something'
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
      redirectTo: '/find-someone'
    });
});
