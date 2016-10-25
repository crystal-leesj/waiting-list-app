app.controller('LoginController',
  ['$scope', 'adminsFactory', '$location', '$route', '$cookies',
  function ($scope, adminsFactory, $location, $route, $cookies){

  $scope.adminLogin = function(){
    adminsFactory.login($scope.login,function(err, admin, message){
      if (err){
        $scope.message = message;
      }else{
        $scope.login = {};
        $cookies.put('username', admin.business_name);
        $cookies.put('adminId', admin._id);
        $location.url(admin.url_name+'/dashboard/');
      }
    });
  }
}])
