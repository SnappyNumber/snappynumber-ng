/* global app:true */

'use strict';

/**
 * @ngdoc overview
 * @name snappynumberNgApp
 * @description
 * # snappynumberNgApp
 *
 * Main module of the application.
 */
var app = angular
  .module('snappynumberNgApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'firebase'
  ]);

app.config(function ($routeProvider) {
    $routeProvider
      .when('/', {
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

app.constant('FIREBASE_URL', 'https://snappynumber.firebaseio.com/');
