app.controller('DashboardController',
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

  getAll();

  function getAll() {
    waitlistsFactory.index_by_urlname($routeParams.urlname,function(waitlists){
      console.log('Get all waitlists:::::',waitlists);
      $scope.waitlists = waitlists;
    })
  }

  $scope.statuses = ['Canceled', 'Seated', 'Waiting'];

  $scope.create_waitlist = function(){
    $location.url($routeParams.urlname+'/new');
  }

  $scope.change_status = function(waitlistId, status){
    // console.log('change_status', waitlistId, status);
    waitlistsFactory.change_status(waitlistId, status, function(waitlist){
      socket.emit("data_updated", $routeParams.urlname);
      getAll();
    })
  }

  $scope.send_text = function(){
    alert("Text sent!");
  }
}])
