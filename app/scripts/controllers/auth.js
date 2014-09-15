'use strict';

function onGoogleApiReady() {
}

app.controller('AuthCtrl',
  function ($scope, $location, Auth, Google, Person, POSTCODE_PATTERN, MOBILE_PATTERN) {
    $scope.PostcodePattern = POSTCODE_PATTERN;
    $scope.MobilePattern = MOBILE_PATTERN;

    if (Auth.signedIn()) {
      $location.path('/');
    }

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
        //user record is registered
        Google.geocode($scope.person.postcode).then(function (location) {
          //postcode is geocoded
          $scope.person.location = {
            lat: location.lat,
            lon: location.lng
          };
          $scope.person.email = $scope.user.email;
          Person.create($scope.person).then(function () {
            //person record is created
            Auth.login($scope.user).then(function () {
              //user is logged in
              $location.path('/');
            }, function (error) {
              $scope.error = error.toString();
            });
          });
        });
      }, function (error) {
        $scope.error = error.toString();
      });
    };
  });
