'use strict';

app.controller('HomeCtrl', function ($scope, Search, Person) {
  $scope.results = [];
  $scope.search = function(term) {
    var queryId = Search.query(term);
    Search.results(queryId).then(function(results) {
      results.forEach(function(result) {
        Person.get(result._id).then(function(person){
          $scope.results.push(person);
        });
      });
    });
  };
});
