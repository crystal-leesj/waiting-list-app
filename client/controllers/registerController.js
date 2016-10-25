app.controller('RegisterController',
  ['$scope', 'adminsFactory', '$location', '$route', '$cookies',
  function ($scope, adminsFactory, $location, $route, $cookies){

  $scope.adminRegister = function(data){
    adminsFactory.registration($scope.register,function(err, admin, message){
      if (err){
        $scope.message = message;
      } else {
        $scope.register = {};
        $cookies.put('username', admin.business_name);
        $cookies.put('adminId', admin._id);
        $location.url(admin.url_name+'/dashboard/');
      }
    });
  }
}])
