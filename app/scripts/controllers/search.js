'use strict';

function onGoogleApiReady() {
  angular.bootstrap(document.getElementById("map"), ['snappynumberNgApp']);
}

app.controller('SearchCtrl', function ($scope, Person) {
  $scope.iconSelected = {
    url: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|fe7569',
    size: new google.maps.Size(21, 34),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(10, 34)
  };
  $scope.iconSearchResult = {
    url: 'http://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|cccccc',
    size: new google.maps.Size(21, 34),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(10, 34)
  };
  $scope.markers = [];
  $scope.mapOptions = {
    center: new google.maps.LatLng(54, -2.5),
    zoom: 6,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };

  $scope.addMarker = function(person) {
    var exists = false;
    for (var i = 0, l = $scope.markers.length; i < l; i ++) {
      if ($scope.markers[i].person === person) {
        exists = true;
        break;
      }
    }
    if (!exists) {
      var m = new google.maps.Marker({
        map: $scope.searchMap,
        position: new google.maps.LatLng(person.location.latitude, person.location.longitude),
        icon: $scope.iconSearchResult
      });
      m.person = person;
      $scope.markers.push(m);
    }
  };

  $scope.panTo = function(marker) {
    $scope.markers.forEach(function(m){
      m.setIcon(m === marker ? $scope.iconSelected : $scope.iconSearchResult);
    });
    $scope.currentMarker = marker;
    $scope.searchMap.panTo(marker.getPosition());
    $scope.infoWindow.open($scope.searchMap, marker);
  };

  $scope.persons = Person.all;
  $scope.query = '';
  var regex;
  $scope.$watch('query', function (value) {
    regex = new RegExp('\\b' + value.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1"), 'i');
    $scope.markers.forEach(function(marker){ marker.setMap(null); });
    $scope.markers = [];
    $scope.searchMap.panTo(new google.maps.LatLng(54, -2.5));
  });
  $scope.filterBySearch = function(person) {
      if ($scope.query
        && $scope.query.length >= 2
        && regex.test(person.forename + ' ' + person.surname)){
          $scope.addMarker(person);
          return true;
        }
        return false;
  };
});
