
'use strict';

angular
  .module('placesAutocomplete', [])
  .directive('placesAutocomplete', function() {
  return {
    require: 'ngModel',
    scope: {
      ngModel: '=',
      options: '=?',
      details: '=?'
    },
    link: function(scope, element, attrs, controller) {
      var watchEnter = false;
      var initOpts = function() {
        if (scope.options) {
          watchEnter = !(scope.options.watchEnter !== true);
          scope.gPlace.setTypes([]);
          scope.gPlace.setBounds((scope.options.bounds) ? scope.options.bounds : null);
          scope.gPlace.setComponentRestrictions((scope.options.country) ? { country: scope.options.country } : null);
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
                  }
                );
              }
            }
          );
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
