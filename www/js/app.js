// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


//var requestToken = "";
//var accessToken = "";
var clientId = "683383756975-ju6l6ufitj2pfnhbkd9js4t2riqljj9e.apps.googleusercontent.com";
var clientSecret = "X3KFDDYgMoE0ZZeKD6hIoGYU ";





var exampleApp=angular.module('starter', ['ionic', 'starter.controllers','ngStorage', 'ngCordova'])

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


.state('secure', {
                url: "/secure",
                templateUrl: "templates/secure.html",
      
            })

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      //controller: 'AppCtrl'
    })

.state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html"
        }
      }
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
      //abstract: true,
      views: {
        'menuContent' :{
        templateUrl: "templates/postg.html",
        //controller: 'tabsCtrl'

        }
      }  
    })
/*
.state('app.postgig.progress', {
      url: "/progress",
      //abstract: true,
      views: {
        'home-tab' :{
        templateUrl: "templates/progress.html",
        //controller: 'tabsCtrl'
        }
      }  
    })
    .state('app.postgig.bid', {
      url: "/bid",
      //abstract: true,
      views: {
        'home-tab' :{
        templateUrl: "templates/bid.html",
        //controller: 'tabsCtrl'
        }
      }  
    })
    .state('app.postgig.completed', {
      url: "/progress",
      //abstract: true,
      views: {
        'home-tab' :{
        templateUrl: "templates/progress.html",
        //controller: 'tabsCtrl'
        }
      }  
    })
          */
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
      abstract:true,
      views: {
        'menuContent' :{
          templateUrl: "templates/mygigs.html",
          controller: 'PlaylistCtrl'
        }
      }
    })  


.state('app.mygigs.progress', {
      url: "/progress",
      views: {
        'home-tab' :{
          templateUrl: "templates/progress.html",
          controller: 'PlaylistCtrl'
        }
      }
    })  

.state('app.mygigs.bid', {
      url: "/bid",
      views: {
        'about-tab' :{
          templateUrl: "templates/bid.html",
     
        }
      }
    })  
.state('app.mygigs.completed', {
      url: "/completed",
      views: {
        'contact-tab' :{
          templateUrl: "templates/completed.html",
         
        }
      }
    })  

       .state('app.assignment', {
      url: "/assignment",
      views: {
        'menuContent' :{
          templateUrl: "templates/assignment.html",
          
        }
      }
    })   

       .state('app.assignment.assignprogress', {
      url: "/assignprogress",
      views: {
        'home-tab' :{
          templateUrl: "templates/assignprogress.html",
          controller: 'PlaylistCtrl'
        }
      }
    })  

.state('app.assignment.assignbid', {
      url: "/assignbid",
      views: {
        'about-tab' :{
          templateUrl: "templates/assignbid.html",
     
        }
      }
    })  
.state('app.assignment.assigncompleted', {
      url: "/assigncompleted",
      views: {
        'contact-tab' :{
          templateUrl: "templates/assigncompleted.html",
         
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
  $urlRouterProvider.otherwise('/app/login');
});

exampleApp.controller("LoginController", function($scope, $http,$cordovaOauth, $localStorage, $location) {

    $scope.login = function() {
        $cordovaOauth.facebook("1500472286892894", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
            $localStorage.accessToken = result.access_token;
            console.log("Entered");
            $location.path("/home");
            console.log("HOme Page");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };

      $scope.twitterLogin = function() {
            $cordovaOauth.twitter("CONSUMER_ID_HERE", "CONSUMER_SECRET_HERE").then(function(result) {
                $scope.oauthResult = result;
                  $location.path("/home");
            }, function(error) {
                $scope.oauthResult = "OAUTH ERROR (see console)";
                console.log(error);
            });
        }

 $scope.googlelogin = function() {
        var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=http://localhost/callback&scope=https://www.googleapis.com/auth/urlshortener&approval_prompt=force&response_type=code&access_type=offline', '_blank', 'location=no');
            console.log("hi");
        ref.addEventListener('loadstart', function(event) {
            if((event.url).startsWith("http://localhost/callback")) {
                requestToken = (event.url).split("code=")[1];
                $http({method: "post", url: "https://accounts.google.com/o/oauth2/token", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=http://localhost/callback" + "&grant_type=authorization_code" + "&code=" + requestToken })
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

});