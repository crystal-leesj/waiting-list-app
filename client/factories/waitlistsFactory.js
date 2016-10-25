app.factory('waitlistsFactory', ['$http', function($http){
  var factory = {};
  factory.create = function(adminId, new_waitlist, callback){
    console.log("factory-adminId::",adminId, new_waitlist);
    $http.post('/dashboard', {adminId: adminId, new_waitlist: new_waitlist}).then(function(data){
      console.log('check data::::::',data);
      if (typeof(callback) == 'function'){
        callback(data.data.waitlist);
      }
    })
  }
  factory.index_by_urlname = function(urlname, callback){
    $http.get('/dashboard/'+urlname).then(function(data){
      callback(data.data.waitlists)
    })
  }
  factory.customer_view_waitlist = function(urlname, callback){
    console.log('urlname:::',urlname);
    $http.get('/waitlist/'+urlname).then(function(data){
      callback(data.data)
    })
  }
  factory.change_status = function(id, status, callback){
    $http.post('/waitlist/change_status', {id:id, status:status}).then(function(data){
      if (typeof(callback) == 'function'){
        callback(data.data.waitlist);
      }
    })
  }
  return factory;
}]);
