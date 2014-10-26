'use strict';

app.factory('Search',
  function ($firebase, FIREBASE_URL, $q) {
    var searchRef = new Firebase(FIREBASE_URL + 'search');
    var requestRef = searchRef.child('request');
    var responseRef = searchRef.child('response');
    var Search = {
      query: function (term, geometry) {
        var fuzzyQuery = {
          fuzzy_like_this: {
            fields: ['forename', 'surname'],
            like_text: term
          }
        };
        var request = {};
        if (typeof geometry !== 'undefined') {
          if (typeof geometry.viewport !== 'undefined') {
            var northEast = geometry.viewport.getNorthEast(),
                southWest = geometry.viewport.getSouthWest(),
                box = {
                  location: {
                    top_left: {
                      lat: northEast.lat(),
                      lon: southWest.lng()
                    },
                    bottom_right: {
                      lat: southWest.lat(),
                      lon: northEast.lng()
                    }
                  }
                };
            request = {
              index: 'person',
              type: 'person',
              query: {
                filtered: {
                  query: fuzzyQuery,
                  filter: {
                    geo_bounding_box : box
                  }
                }
              }
            };
          } else {
            request = {
              index: 'person',
              type: 'person',
              query: {
                filtered: {
                  query: fuzzyQuery,
                  filter: {
                    geo_distance: {
                      distance: '12km',
                      location: {
                        lat: geometry.location.lat(),
                        lon: geometry.location.lng()
                      }
                    }
                  }
                }
              }
            };
          }
        } else {
          request = {
            index: 'persons',
            type: 'person',
            query: fuzzyQuery
          };
        }
        return requestRef.push(request).name();
      },
      results: function (requestId) {
        var deferred = $q.defer();
        responseRef.child(requestId).on('value', function fn(snap) {
          if(snap.val() !== null) {
            deferred.resolve(snap.val().hits);
            snap.ref().off('value', fn);
            snap.ref().remove();
          }
        });
        return deferred.promise;
      }
    };
    return Search;
  });
