'use strict';

app.factory('Person',
  function ($firebase, FIREBASE_URL, $q) {
    var ref = new Firebase(FIREBASE_URL + 'persons');
    var sync = $firebase(ref);
    var Person = {
      create: function (person) {
        var deferred = $q.defer();
        sync.$push(person).then(function(personRef) {
          deferred.resolve(personRef.name());
          //personRef.setPriority(Firebase.ServerValue.TIMESTAMP, function(){
          //  deferred.resolve(personRef.name());
          //});
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
    return Person;
  });
