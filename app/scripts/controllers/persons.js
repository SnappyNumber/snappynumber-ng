'use strict';

app.controller('PersonsCtrl', function ($scope, Person, Google) {
  $scope.persons = Person.all;
  $scope.person = {
    title: '',
    forename: '',
    surname: '',
    email: '',
    mobile: '',
    postcode: ''
  };
  $scope.submitPerson = function () {
    Google.geocode($scope.person.postcode).then(function (location) {
      $scope.person.location = {
        latitude: location.lat,
        longitude: location.lng
      };
      Person.create($scope.person).then(function () {
        $scope.person = {
          title: '',
          forename: '',
          surname: '',
          email: '',
          mobile: '',
          postcode: ''
        };
      });
    });
  };
  $scope.deletePerson = function (person) {
    Person.delete(person);
  };
});
