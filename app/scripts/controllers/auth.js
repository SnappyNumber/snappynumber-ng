'use strict';

app.controller('AuthCtrl',
  function ($scope, $location, Auth) {
    //if (Auth.signedIn()) {
    //  $location.path('/');
    //}

    //$scope.$on('$firebaseSimpleLogin:login', function () {
    //  $location.path('/');
    //});

    $scope.login = function () {
      Auth.login($scope.user).then(function () {
        $location.path('/');
      }, function (error) {
        $scope.error = error.toString();
      });
    };

    $scope.register = function () {
      Auth.register($scope.user).then(function () {
        //user is registered
        Auth.login($scope.user).then(function () {
          //user is logged in
          $location.path('/');
        }, function (error) {
          $scope.error = error.toString();
        });
      }, function (error) {
        $scope.error = error.toString();
      });
    };
  });
