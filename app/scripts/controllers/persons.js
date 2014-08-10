'use strict';

app.controller('PersonsCtrl', function ($scope, Person, Google) {
  $scope.persons = Person.all;
  $scope.person = { title: '', forename: '', surname: '', email: '', mobile: '' };
  $scope.submitPerson = function () {
    Google.geocode($scope.person.postcode).then(function (location) {
      $scope.person.loc = location;
      Person.create($scope.person).then(function () {
        $scope.person = { title: '', forename: '', surname: '', email: '', mobile: '' };
      });
    });
  };
  $scope.deletePerson = function (person) {
    Person.delete(person);
  };
});
