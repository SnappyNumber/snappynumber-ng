'use strict';

function onGoogleApiReady() {
}

app.controller('AuthCtrl',
  function ($scope, $location, Auth, Stripe, Google, Person, POSTCODE_PATTERN, MOBILE_PATTERN) {
    //if ($location.search().stripeToken){
    //  $scope.stripeToken = $location.search().stripeToken;
    //}
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
        if ($scope.error) {
          $scope.error.push(error.toString());
        } else {
          $scope.error = [ error.toString() ]
        }
      });
    };

    $scope.register = function (code, result) {

      //handle payment
      $scope.processingPayment = true;
      if (result.error) {
        if ($scope.error) { $scope.error.push(error.toString()); } else { $scope.error = [ error.toString() ]; }
      } else {
        var requestId = Stripe.queue(result);
        Stripe.result(requestId).then(function(payment) {
          if (typeof payment != 'undefined'){
            if (payment.error) {
              if ($scope.error) { $scope.error.push(payment.error.toString()); } else { $scope.error = [ payment.error.toString() ]; }
            } else {
              $scope.person.order = {
                stripe: {
                  token: result.id,
                  customerId: payment.customerId,
                  chargeId: payment.chargeId,
                },
                timestamp: Firebase.ServerValue.TIMESTAMP
              };
            }
          } else {
            if ($scope.error) { $scope.error.push('Payment Failed'); } else { $scope.error = [ 'Payment Failed' ]; }
          }
          $scope.processingPayment = false;
        });
      }
      //end handle payment

      Auth.register($scope.user).then(function (user) {
        //user record is registered
        $scope.person.profile = {
          uid: user.uid,
          created: {
            timestamp: Firebase.ServerValue.TIMESTAMP
          }
        };
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
              if ($scope.error) {
                $scope.error.push(error.toString());
              } else {
                $scope.error = [ error.toString() ]
              }
            });
          });
        });
      }, function (error) {
        if ($scope.error) {
          $scope.error.push(error.toString());
        } else {
          $scope.error = [ error.toString() ]
        }
      });
    };
  });
