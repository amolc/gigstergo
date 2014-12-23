
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use lat
  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('ProgressCtrl', function($scope,$http,$stateParams) {

  $scope.progress= {};

  $http.get(baseURL + 'assignall').success(function(res) {
        $scope.progress = res;
        console.log($scope.progress);
        if (res.status == 'false') {
          alert(res.message);
        } else {
          console.log("No data");
        //$scope.states=res;
          
        }
      
      }).error(function() {
        alert("Please check your internet connection or data source..");
      });
   

})


.controller('ListgCtrl', function($scope,$http,$stateParams) {

  $scope.listgigster= {};

  $http.get(baseURL + 'listgig').success(function(res) {
        $scope.listgigster = res;
        console.log(res);
        console.log($scope.listgigster);
        if (res.status == 'false') {
          alert(res.message);
        } else {
            $scope.listgigster=res;
          console.log($scope.listgigster);
        }
      
      }).error(function() {
        alert("Please check your internet connection or data source..");
      });
   

})

.controller('signupCtrl', function($scope,$http,$state){

           $scope.signup=function(userdata){

                       $http.post(baseURL + 'signup', userdata).success(function(req,res){
                      alert("user registerd successfully..!!!");
                      $state.go('app.login');

                      }).error(function(res){
                      alert(res);
                  });
                      
                  
           };

})

.controller('emailoginCtrl', function($scope,$http,$state){
           

            $scope.login =function(user)
            {   
                    console.log(user);
         $http.post(baseURL + 'loginval',user).success(function(res) {
        $scope.response = res;
        console.log(res);
        if (res.status == false) {
          alert(res.message);
        } else {
        window.localStorage.setItem('islogin',true);
          $state.go("app.home");
        }
      }).error(function() {
        alert("Please check your internet connection or data source..");
      });
     }   
})

.controller('postgigCtrl', function($scope,$http,$state,$filter){
            $scope.date = new Date();
              var date = $scope.date;
              time=$filter('date')(date,"h:mm:ss a");
              date=$filter('date')(date,'yyyy/M/d');
              console.log(date);
              console.log(time);
              $scope.postg={
                 date:date, 
                 
              }
            $scope.ins =function(postg)
            {   
                    console.log(postg);
         $http.post(baseURL + 'postgig',postg).success(function(res) {
        $scope.response = res;
        console.log(res);
        if (res.status == false) {
          console.log("done");
        } else {
            console.log("incomplete");
        }
      }).error(function() {
        alert("Please check your internet connection or data source..");
      });  
     }   
});