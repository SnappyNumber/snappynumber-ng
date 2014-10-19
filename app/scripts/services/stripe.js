'use strict';

app.factory('Stripe',
  function ($firebase, FIREBASE_URL, $q) {
    var stripeRef = new Firebase(FIREBASE_URL + 'stripe');
    var requestRef = stripeRef.child('request');
    var responseRef = stripeRef.child('response');
    var Stripe = {
      queue: function (request) {
        return requestRef.push(request).name();
      },
      result: function (requestId) {
        var deferred = $q.defer();
        responseRef.child(requestId).on('value', function fn(snap) {
          if(snap.val() !== null) {
            deferred.resolve(snap.val());
            snap.ref().off('value', fn);
            snap.ref().remove();
          }
        });
        return deferred.promise;
      }
    };
    return Stripe;
  }
);

/*
app.service('StripeApi', ['$http', 'STRIPE_API', 'STRIPE_KEY', function ($http, STRIPE_API, STRIPE_KEY) {
  var config = { headers: { 'Authorization': 'Basic ' + STRIPE_KEY } };
  this.charge = function (cardToken, description) {
    var payload = {
      currency = 'gbp',
      amount = 180,
      card: cardToken,
      description: description
    };
    return $http.post(STRIPE_API + '/customers', payload, config);
  };
}]);

app.factory('StripeApi', ['$http', 'STRIPE_API', 'STRIPE_KEY',
  function($http, STRIPE_API, STRIPE_KEY) {
    var config = { headers: { 'Authorization': 'Bearer ' + STRIPE_KEY } };
    return {
      charge: function (cardToken, description) {
        var payload = {
          currency: 'gbp',
          amount: 180,
          card: cardToken,
          description: description
        };
        return $http.post(STRIPE_API + '/charges' + '?callback=JSON_CALLBACK', payload, config);
      }
    };
  }
]);
*/
