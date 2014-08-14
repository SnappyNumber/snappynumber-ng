'use strict';

app.controller('SearchCtrl', function ($scope, Person) {
  $scope.persons = Person.all;
  $scope.query = '';
  var regex;
  $scope.$watch('query', function (value) {
    regex = new RegExp('\\b' + value.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'i');
  });
  $scope.filterBySearch = function(person) {
      return ($scope.query
        && $scope.query.length >= 2
        && regex.test(person.forename + ' ' + person.surname));
  };
});
