app.factory('adminsFactory', ['$http', function($http){
  var factory = {};
  factory.registration = function(new_admin,callback){
    $http.post('/register',new_admin).then(function(data){
      console.log('DATA::::::::::',data);
      var err = false;
      var message = '';
      if (data.data.placeholder == 'error'){
        err = true;
        message = data.data.message;
      }
      if (typeof(callback) == 'function'){
        callback(err, data.data.admin, message);
      }
    })
  }
  factory.login = function(admin, callback){
    $http.post('/login', admin).then(function(data){
      var err = false;
      var message = '';
      if (data.data.placeholder == 'error'){
        err = true;
        message = data.data.message;
      }
      if (typeof(callback) == 'function'){
        callback(err, data.data.admin, message);
      }
    })
  }
  // factory.getAdminName = function(userId, callback){
  //   $http.get('/users/'+userId).then(function(data){
  //     console.log('getUserName::::',data);
  //     callback(data.data.username);
  //   })
  // }
  return factory;
}]);
