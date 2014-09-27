'use strict';

app.factory('Person',
  function ($firebase, FIREBASE_URL, $q) {
    var ref = new Firebase(FIREBASE_URL + 'persons');
    var sync = $firebase(ref);
    //var persons = $firebase(ref).$asArray();
    var Person = {
      create: function (person) {
        var deferred = $q.defer();
        sync.$push(person).then(function(createRef) {
          deferred.resolve(createRef.name());
        });
        return deferred.promise;
        //return persons.$add(person);
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
