'use strict';

app.controller('SomethingCtrl', function ($scope, Search, Person) {
  $scope.searching = false;
  $scope.noResults = false;
  $scope.results = [];
  $scope.whereChanged = function(){
    if($scope.where === ''){
      $scope.place = {
        options: { country: 'gb' },
        name: '',
        data: {}
      };
    }
  }
  $scope.search = function(term, geometry) {
    $scope.results = [];
    $scope.searching = true;
    $scope.noResults = false;
    var queryId = Search.query(term, geometry);
    Search.results(queryId).then(function(results) {
      if (typeof results != 'undefined'){
        results.forEach(function(result) {
          Person.get(result._id).then(function(person){
            person.id = result._id;
            person.score = result._score;
            $scope.results.push(person);
          });
        });
      } else {
        $scope.noResults = true;
      }
      $scope.searching = false;
    });
  };
  $scope.place = {
    options: { country: 'gb' },
    name: '',
    data: {}
  };
});
