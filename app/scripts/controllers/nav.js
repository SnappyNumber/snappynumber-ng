'use strict';

app.controller('NavCtrl',
  function ($scope, $location, Auth) {
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
