
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
