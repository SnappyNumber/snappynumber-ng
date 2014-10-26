'use strict';

app.factory('Service',
  function ($firebase, FIREBASE_URL, $q) {
    var ref = new Firebase(FIREBASE_URL + 'service');
    var sync = $firebase(ref);
    var Service = {
      create: function (service) {
        var deferred = $q.defer();
        sync.$push(service).then(function(newRef) {
          deferred.resolve(newRef.name());
        });
        return deferred.promise;
      },
      get: function (id) {
        var deferred = $q.defer();
        ref.child(id).once('value', function(snap) {
          deferred.resolve(snap.val());
        });
        return deferred.promise;
      }
    };
    return Service;
  }
);
