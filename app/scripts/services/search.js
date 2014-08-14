'use strict';

/*
app.factory('Search',
  function ($firebase, FIREBASE_URL) {
    var ref = new Firebase(FIREBASE_URL + 'search/request');
    var requests = $firebase(ref).$asArray();
    var Search = {
      create: function (request) {
        return requests.$add(request);
      }
    };
    return Search;
  });
*/

app.factory('Search',
  function ($firebase, FIREBASE_URL) {
    var queue = new Firebase(FIREBASE_URL + 'search');
    var Search = {
      query: function (term, callback) {
        var reqRef = queue.child('request').push({ index: 'snappynumber', type: 'person', query: term });
        queue.child('response/'+reqRef.name()).on('value', function fn(snap) {
          if(snap.val() !== null) {
             snap.ref().off('value', fn);
             snap.ref().remove();
             if(callback)
             {
               callback(snap.val());
             }
          }
       });
      }
    };
    return Search;
  });
