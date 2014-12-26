
angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {
 
var user=window.localStorage.getItem('username');
      
//$scope.user=userdetailsforprofile.usermail;

console.log(user);







  // Form data for the login modal
 /* $scope.loginData = {};
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
  };*/
})


.controller('ProgressCtrl', function($scope,$http,$stateParams) {
if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('app.login')
       }
  $scope.progress= {};
  var reqdata={
      userid:window.localStorage.getItem('userid1')
  };
  $http.get(baseURL + 'progressassignments',reqdata).success(function(res) {
        //console.log(res);
        $scope.progress = res;
       // console.log($scope.progress);
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


.controller('ListgCtrl', function($scope,$http,$stateParams,$state) {

/*if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('app.login')
       } */
  $scope.listgigster= {};
  var reqdata={
      userid:window.localStorage.getItem('userid1')
  };
console.log(reqdata);

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
   
          $scope.logout=function(){
            window.localStorage.setItem('islogin',false);
           $state.go('app.login');  
   
         };


})

.controller('signupCtrl', function($scope,$http,$state){
  if( window.localStorage.getItem('islogin') == 'true' ){
    $state.go('app.home')
  }
  $scope.warning = '';      
  $scope.signup=function(userdata){
    $http.post(baseURL + 'signup', userdata).success(function(req,res){
      console.log( res );
      $scope.warning = res.message; 
      //$state.go('app.login');
    }).error(function(res){
      alert(res);
    });
  };

})

//new controllers
.controller('homeCtrl', function($scope,$http,$state){
       if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('app.login')
       }
       

})

.controller('mainloginctrl', function($scope,$http,$state){
       if( window.localStorage.getItem('islogin') == 'true' ){
        $state.go('app.home')
       }
     
})



.controller('mygigsctrl', function($scope,$http,$state){
       if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('app.login')
       }
})

.controller('mainassognmentctrl', function($scope,$http,$state){
       if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('app.login')
       }
})

.controller('mainassognmentctrl', function($scope,$http,$state){
       if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('app.login')
       }
})

/*.controller('profilecontroller', function($scope,$http,$state){
       if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('app.login')
       }
       var userdetailsforprofile=window.localStorage.getItem('userdetails');
      console.log(userdetailsforprofile);
      $scope.user={
        fname:'',
        lname:'',
        username:'',
        email:'',
        phone:'',
        Tagline:'',
        Skills:'',
        City:'',
        Country:''

      }
      user.username=userdetailsforprofile.username;
      $scope.user.email='userdetailsforprofile.usermail';

})*/





.controller('emailoginCtrl', function($scope,$http,$state){
            if( window.localStorage.getItem('islogin') == 'true' ){
        $state.go('app.home')
       }

            $scope.login =function(user)
            {   
                    console.log(user);
         $http.post(baseURL + 'loginval',user).success(function(res) {
        $scope.response = res;
        console.log(res);
        if (res.status == false) {
          alert(res.message);
        } else {
          console.log(res.record[0]);
        window.localStorage.setItem('islogin',true);
        window.localStorage.setItem('userdetails',res.record[0]);
        window.localStorage.setItem('username',res.record[0].usermail);
        window.localStorage.setItem('userid1',res.record[0].userId);
        
          $state.go("app.home");
        }
      }).error(function() {
        alert("Please check your internet connection or data source..");
      });
     }   
})

.controller('postgigCtrl', function($scope,$http,$state,$filter){
 if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('app.login')
       }





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