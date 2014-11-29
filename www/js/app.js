// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


//var requestToken = "";
//var accessToken = "";
var clientId = "683383756975-ju6l6ufitj2pfnhbkd9js4t2riqljj9e.apps.googleusercontent.com";
var clientSecret = "X3KFDDYgMoE0ZZeKD6hIoGYU ";





var exampleApp=angular.module('starter', ['ionic', 'starter.controllers','ngCordova'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

.state('login', {
      url: "/login",
      templateUrl: "templates/login.html",
      
       })

.state('secure', {
                url: "/secure",
                templateUrl: "templates/secure.html",
      
            })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

.state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html"
        }
      }
    })



    .state('app.postgig', {
      url: "/postgig",
      views: {
        'menuContent' :{
          templateUrl: "templates/postg.html"
        }
      }
    })

    .state('app.listgig', {
      url: "/listgig",
      views: {
        'menuContent' :{
          templateUrl: "templates/listg.html"
        }
      }
    })
    .state('app.gigster', {
      url: "/gigster",
      views: {
        'menuContent' :{
          templateUrl: "templates/gigster.html",
          controller: 'PlaylistsCtrl'
        }
      }
    })

      


    .state('app.mygigs', {
      url: "/mygigs",
      views: {
        'menuContent' :{
          templateUrl: "templates/mygigs.html",
          controller: 'PlaylistCtrl'
        }
      }
    })  

       .state('app.assignment', {
      url: "/assignment",
      views: {
        'menuContent' :{
          templateUrl: "templates/assignment.html",
          controller: 'PlaylistCtrl'
        }
      }
    })   


        .state('app.inbox', {
      url: "/inbox",
      views: {
        'menuContent' :{
          templateUrl: "templates/inbox.html",
          controller: 'PlaylistCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});



exampleApp.controller('LoginController', function($scope, $http, $location) {
 
    $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
 
    $scope.login = function() {
        var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=http://localhost:5000/gigster/oauth2callback&scope=https://www.googleapis.com/auth/urlshortener&approval_prompt=force&response_type=code&access_type=offline', '_blank', 'location=no');
            console.log("hi");
        ref.addEventListener('loadstart', function(event) {
            if((event.url).startsWith("http://localhost:5000/gigster/oauth2callback")) {
                requestToken = (event.url).split("code=")[1];
                $http({method: "post", url: "https://accounts.google.com/o/oauth2/token", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost:5000/gigster/oauth2callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
                    .success(function(data) {
                        accessToken = data.access_token;
                        console.log(oye);
                          alert(accessToken);
                        console.log(accessToken);

                        $location.path("/home");
                    })
                    .error(function(data, status) {
                        alert("ERROR: " + data);
                    });
                ref.close();
            }
        });
    }
 
    if (typeof String.prototype.startsWith != 'function') {
        String.prototype.startsWith = function (str){
            return this.indexOf(str) == 0;
        };
    }
    
});
 
 exampleApp.controller('SecureController', function($scope, $http) {
 
    $scope.accessToken = accessToken;
    
});

exampleApp.controller('FBlogin', function($scope, $cordovaOauth) {
$scope.facebookLogin = function() {
            $cordovaOauth.facebook("1500472286892894", ["http://localhost:5000/gigster/oauth2callback "]).then(function(result) {
                $scope.oauthResult = result;
            }, function(error) {
                $scope.oauthResult = "OAUTH ERROR (see console)";
                console.log(error);
            });
        }

 });

/*
exampleApp.controller('MyCtrl', function($scope, $cordovaOauth) {
   $scope.googleLogin = function() {
        $cordovaOauth.google("683383756975-ju6l6ufitj2pfnhbkd9js4t2riqljj9e.apps.googleusercontent.com", ["https://www.googleapis.com/auth/urlshortener", "https://www.googleapis.com/auth/userinfo.email"]).then(function(result) {
             $location.path("/secure");
            console.log(JSON.stringify(result));
        }, function(error) {
            console.log(error);
        });
    }


    });
    */