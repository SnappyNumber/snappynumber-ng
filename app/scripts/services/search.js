'use strict';

app.factory('Search',
  function ($firebase, FIREBASE_URL, $q) {
    var searchRef = new Firebase(FIREBASE_URL + 'search');
    var requestRef = searchRef.child("request");
    var responseRef = searchRef.child("response");
    var Search = {
      query: function (term, location) {
        var request = (typeof location === 'undefined')
          ? {
              index: 'sn-persons',
              type: 'person',
              query: {
                fuzzy_like_this:{
                  fields: ["forename", "surname"],
                  like_text: term
                }
              }
            }
          : {
              filtered : {
                  query : {
                      fuzzy_like_this:{
                        fields: ["forename", "surname"],
                        like_text: term
                      }
                  },
                  filter: {
                    geo_bounding_box : {
                      pin.location : {
                        top_left : {
                          lat : 40.73,
                          lon : -74.1
                        },
                        bottom_right : {
                          lat : 40.717,
                          lon : -73.99
                        }
                      }
                    }
                  }
                  /*
                  filter : {
                    geo_distance : {
                      distance : '12km',
                      pin.location : {
                        lat : location.lat,
                        lon : location.lon
                      }
                    }
                  }
                  */
              }
          };
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
