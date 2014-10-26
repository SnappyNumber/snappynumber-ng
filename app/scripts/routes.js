
'use strict';

app.config(function ($routeProvider) {
  $routeProvider
    .when('/find-someone', {
      templateUrl: 'views/find-someone.html',
      controller: 'FindSomeoneCtrl',
      activeRoute: 'find-someone'
    })
    .when('/find-something', {
      templateUrl: 'views/find-something.html',
      controller: 'FindSomethingCtrl',
      activeRoute: 'find-something'
    })
    .when('/list-someone', {
      templateUrl: 'views/list-someone.html',
      controller: 'ListCtrl',
      activeRoute: 'list-someone'
    })
    .when('/list-something', {
      templateUrl: 'views/list-something.html',
      controller: 'ListCtrl',
      activeRoute: 'list-something'
    })
    .otherwise({
      redirectTo: '/find-someone'
    });
});
