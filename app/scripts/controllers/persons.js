'use strict';

app.controller('PersonsCtrl', function ($scope, Person) {
  $scope.persons = Person.all;
  $scope.person = { title: '', forename: '', surname: '', email: '', mobile: '' };
  $scope.submitPerson = function () {
    Person.create($scope.person).then(function () {
      $scope.person = { title: '', forename: '', surname: '', email: '', mobile: '' };;
    });
  };
  $scope.deletePerson = function (person) {
    Person.delete(person);
  };
});
