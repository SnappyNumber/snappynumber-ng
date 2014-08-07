'use strict';

app.factory('Person',
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + persons);
    var persons = $firebase(ref);
    var Person = {
      all: persons,
      create: function (person) {
        return persons.$add(person);
      },
      find: function (personId) {
        return persons.$child(personId);
      },
      delete: function (personId) {
        return persons.$remove(personId);
      }
    };
    return Person;
  });
