'use strict';

app.controller('NavCtrl',
  function ($scope, $location, $route, Auth) {
    $scope.isActive = function(route) {
        return route && $route && $route.current && route === $route.current.activeRoute;
    };
    $scope.signOut = function () {
      Auth.logout();
    };
    $scope.signedIn = function () {
      return Auth.signedIn();
    };
    $scope.user = function () {
      return Auth.user();
    };
  });
