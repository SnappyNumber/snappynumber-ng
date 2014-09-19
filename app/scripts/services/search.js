'use strict';

app.factory('Search',
  function ($firebase, FIREBASE_URL, $q) {
    var searchRef = new Firebase(FIREBASE_URL + 'search');
    var requestRef = searchRef.child("request");
    var responseRef = searchRef.child("response");
    var Search = {
      query: function (term, geometry) {
        var nameQuery = {
          fuzzy_like_this:{
            fields: ["forename", "surname"],
            like_text: term
          }
        };
        var request = {};
        if (typeof geometry !== 'undefined') {
          if (typeof geometry.viewport !== 'undefined') {
            var ne = geometry.viewport.getNorthEast();
            var sw = geometry.viewport.getSouthWest();
            request = {
              filtered : {
                query : nameQuery,
                filter: {
                  geo_bounding_box : {
                    location : {
                      top_left : {
                        lat : ne.lat(),
                        lon : sw.lng()
                      },
                      bottom_right : {
                        lat : sw.lat(),
                        lon : ne.lng()
                      }
                    }
                  }
                }
              }
            };
          } else {
            request = {
              filtered : {
                query : nameQuery,
                filter : {
                  geo_distance : {
                    distance : '12km',
                    location : {
                      lat : geometry.location.lat(),
                      lon : geometry.location.lng()
                    }
                  }
                }
              }
            };
          }
        } else {
          request = {
            index: 'sn-persons',
            type: 'person',
            query: nameQuery
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
