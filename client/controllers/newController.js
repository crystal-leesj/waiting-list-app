app.controller('NewController',
  ['$scope', 'socket', 'adminsFactory', 'waitlistsFactory', '$routeParams', '$location', '$cookies',
  function ($scope, socket, adminsFactory, waitlistsFactory, $routeParams, $location, $cookies){

  var username = $cookies.get('username');
  if (username){
    $scope.username = username;
  } else {
    $location.url('/');
  }

  $scope.logout = function(){
    $cookies.remove('username');
    $cookies.remove('adminId');
    $location.url('/');
  }


  var adminId = $cookies.get('adminId');

  $scope.add_to_list = function(){
    // console.log('controller-userId :::',userId);
    waitlistsFactory.create(adminId, $scope.new_waitlist, function(waitlist){
      // console.log('userID:::::::',userId);
      socket.emit("data_updated", $routeParams.urlname);
      $scope.new_waitlist = "";
      $location.url($routeParams.urlname+'/dashboard/');
    });
  }
  $scope.goBack = function(){
    $location.url($routeParams.urlname+'/dashboard/');
  }
}])
