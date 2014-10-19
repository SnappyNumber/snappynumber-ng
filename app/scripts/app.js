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
var app = angular.module('snappynumberNgApp', [
  'ngAnimate',
  'ngCookies',
  'ngResource',
  'ngRoute',
  'ngSanitize',
  'ngTouch',
  'ngStorage',
  'firebase',
  'placesAutocomplete',
  'angularPayments'//stripe
]);
