
'use strict';

app.config(function ($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'views/search.html',
      controller: 'SearchCtrl'
    })
    .when('/people', {
      templateUrl: 'views/persons.html',
      controller: 'PersonsCtrl'
    })
    .when('/about', {
      templateUrl: 'views/about.html',
      controller: 'AboutCtrl'
    })
    .otherwise({
      redirectTo: '/'
    });
});
