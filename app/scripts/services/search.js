'use strict';

app.factory('Search',
  function ($firebase, FIREBASE_URL) {
    var searchRef = new Firebase(FIREBASE_URL + 'search');
    var requestRef = searchRef.child("request");
    var responseRef = searchRef.child("response");
    var Search = {
      //allRequests: requests,
      //allResponses: responses,
      query: function (term) {
        //var id = requestRef.push({index: 'sn-persons', type: 'person', query: term}).name();
        return requestRef.push({index: 'sn-persons', type: 'person', query: term}).name();
      },
      results: function (requestId, callback) {
        var response = responseRef.child(requestId).on('value', function fn(snap) {
          if(snap.val() !== null) {
            snap.ref().off('value', fn);
            snap.ref().remove();
            callback(snap.val());
            requestRef.child(requestId).remove();
          }
        });
      }
    };
    return Search;
  });
