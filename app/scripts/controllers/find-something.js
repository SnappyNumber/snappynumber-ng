'use strict';

app.controller('FindSomethingCtrl', function ($scope, Search, Service) {
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
    var queryId = Search.query(term, 'service', geometry);
    Search.results(queryId).then(function(results) {
      if (typeof results != 'undefined') {
        results.forEach(function(result) {
          Service.get(result._id).then(function(service){
            service.id = result._id;
            service.score = result._score;
            $scope.results.push(service);
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
