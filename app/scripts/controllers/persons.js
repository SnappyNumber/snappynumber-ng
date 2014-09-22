'use strict';

app.controller('PersonsCtrl', function ($scope, Person, Google) {
  $scope.persons = Person.all;
  $scope.person = {
    forename: '',
    surname: '',
    email: '',
    mobile: '',
    postcode: '',
    location: {
      lat: 0,
      lon: 0
    }
  };
  $scope.submitPerson = function () {
    Google.geocode($scope.person.postcode).then(function (location) {
      $scope.person.location = {
        lat: location.lat,
        lon: location.lng
      };
      Person.create($scope.person).then(function () {
        $scope.person = {
          forename: '',
          surname: '',
          email: '',
          mobile: '',
          postcode: '',
          location: {
            lat: 0,
            lon: 0
          }
        };
      });
    });
  };
  $scope.deletePerson = function (person) {
    Person.delete(person);
  };
});
