'use strict';

app.factory('Search',
  function ($firebase, FIREBASE_URL, $q) {
    var searchRef = new Firebase(FIREBASE_URL + 'search');
    var requestRef = searchRef.child("request");
    var responseRef = searchRef.child("response");
    var Search = {
      //allRequests: requests,
      //allResponses: responses,
      query: function (term) {
        var request = {
          index: 'sn-persons',
          type: 'person',
          query: {
            fuzzy_like_this:{
              fields: ["forename", "surname"],
              like_text: term
            }
          }
        };
        return requestRef.push(request).name();
      },
      results: function (requestId) {
        var deferred = $q.defer();
        responseRef.child(requestId).on('value', function fn(snap) {
          if(snap.val() !== null) {
            var searchResults = snap.val().hits;
            deferred.resolve(searchResults);
            snap.ref().off('value', fn);
            snap.ref().remove();
            requestRef.child(requestId).remove();
          } else {
            deferred.reject('failed: ' + requestId);
          }
        });
        return deferred.promise;
      }
    };
    return Search;
  });
