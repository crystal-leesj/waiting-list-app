app.controller('WaitlistController',
  ['$scope', 'socket', 'adminsFactory', 'waitlistsFactory', '$routeParams', '$location', '$cookies',
  function ($scope, socket, adminsFactory, waitlistsFactory, $routeParams, $location, $cookies){

  getAll();
  function getAll (){
    waitlistsFactory.customer_view_waitlist($routeParams.urlname,function(data){
      // console.log('customer view waitlists:::::',waitlists);
      if (data.placeholder == "error"){
        $scope.err_message = "Website is not found.";
      } else {
        $scope.waitlists = data.waitlists;
        $scope.business_name = data.business_name;
        $scope.business_phone = data.phone_number;
      }
    })
  }
  socket.on('updated_data', function(urlname){
    if (urlname == $routeParams.urlname){
      getAll();
    }
  })

}])
