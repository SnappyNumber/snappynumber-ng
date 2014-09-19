
'use strict';

app.directive('toUpper', function($parse) {
  return {
    require: 'ngModel',
    link: function(scope, element, attrs, modelCtrl) {
      var toUpper = function(value) {
        if (typeof value === 'undefined'){
          return value;
        }
        var upperCased = value.toUpperCase();
        if(upperCased !== value) {
          modelCtrl.$setViewValue(upperCased);
          modelCtrl.$render();
        }
        return upperCased;
      }
      modelCtrl.$parsers.push(toUpper);
      toUpper($parse(attrs.ngModel)(scope));
    }
  };
});

angular
  .module( "placesAutocomplete", [])
  .directive('placesAutocomplete', function() {
  return {
    require: 'ngModel',
    scope: {
      ngModel: '=',
      options: '=?',
      details: '=?'
    },
    link: function(scope, element, attrs, controller) {
      var opts;
      var watchEnter = false;
      var initOpts = function() {
        opts = {};
        if (scope.options) {
          if (scope.options.watchEnter !== true) {
            watchEnter = false;
          } else {
            watchEnter = true;
          }
          scope.gPlace.setTypes([]);
          if (scope.options.bounds) {
            opts.bounds = scope.options.bounds;
            scope.gPlace.setBounds(opts.bounds);
          } else {
            scope.gPlace.setBounds(null);
          }
          if (scope.options.country) {
            opts.componentRestrictions = {
              country: scope.options.country
            };
            scope.gPlace.setComponentRestrictions(opts.componentRestrictions);
          } else {
            scope.gPlace.setComponentRestrictions(null);
          }
        }
      }
      if (scope.gPlace == undefined) {
        scope.gPlace = new google.maps.places.Autocomplete(element[0], {});
      }
      google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
        var result = scope.gPlace.getPlace();
        if (result !== undefined) {
          if (result.address_components !== undefined) {
            scope.$apply(function() {
              scope.details = result;
              controller.$setViewValue(element.val());
            });
          } else if (watchEnter) {
            getPlace(result);
          }
        }
      });
      var getPlace = function(result) {
        var autocompleteService = new google.maps.places.AutocompleteService();
        if (result.name.length > 0) {
          autocompleteService.getPlacePredictions(
            { input: result.name, offset: result.name.length },
            function listentoresult(list, status) {
              if(list == null || list.length == 0) {
                scope.$apply(function() {
                  scope.details = null;
                });
              } else {
                var placesService = new google.maps.places.PlacesService(element[0]);
                placesService.getDetails(
                  { 'reference': list[0].reference },
                  function detailsresult(detailsResult, placesServiceStatus) {
                    if (placesServiceStatus == google.maps.GeocoderStatus.OK) {
                      scope.$apply(function() {
                        controller.$setViewValue(detailsResult.formatted_address);
                        element.val(detailsResult.formatted_address);
                        scope.details = detailsResult;
                        var watchFocusOut = element.on('focusout', function(event) {
                          element.val(detailsResult.formatted_address);
                          element.unbind('focusout')
                        });
                      });
                    }
                  });
              }
            });
        }
      }
      controller.$render = function () {
        var location = controller.$viewValue;
        element.val(location);
      };
      scope.watchOptions = function () {
        return scope.options;
      };
      scope.$watch(scope.watchOptions, function () {
        initOpts();
      }, true);
    }
  };
});
