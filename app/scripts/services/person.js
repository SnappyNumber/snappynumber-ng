'use strict';

app.factory('Person',
  function ($firebase, FIREBASE_URL, $q) {
    var ref = new Firebase(FIREBASE_URL + 'persons');
    var persons = $firebase(ref).$asArray();
    var Person = {
      all: persons,
      create: function (person) {
        return persons.$add(person);
      },
      get: function (id) {
        var deferred = $q.defer();
        ref.child(id).once('value', function(snap) {
          deferred.resolve(snap.val());
        });
        return deferred.promise;
      },
      delete: function (personId) {
        return persons.$remove(personId);
      }
    };
    return Person;
  });
