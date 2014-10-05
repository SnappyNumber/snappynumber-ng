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
  });
