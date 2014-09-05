'use strict';

app.controller('HomeCtrl', function ($scope, Search) {
  $scope.results = [];
  $scope.search = function(term) {
    var queryId = Search.query(term);
    $scope.results = Search.results(queryId);
  };
});
