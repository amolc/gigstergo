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

.state('app.emailogin', {
      url: "/emailogin",
      views: {
        'menuContent' :{
          templateUrl: "templates/emailogin.html",
           controller:'emailoginCtrl' 
        }
      }
    })

.state('/app/signup', {
      url: "/emailogin",
      views: {
        'menuContent' :{
          templateUrl: "templates/signup.html",
           controller:'emailoginCtrl' 
        }
      }
    })
/*
.state('app.tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tab.html",
      //controller: 'AppCtrl'
    })

.state('app.tab.postgig', {
      url: "/postgig",
      views: {
        'menuContent' :{
          templateUrl: "templates/postgig.html",
          controller: 'postgigCtrl'
        }
      }
    })


.state('app.tab.postgig', {
      url: "/postgig",
      views: {
        'menuContent' :{
          templateUrl: "templates/postgig.html",
          controller: 'postgigCtrl'
        }
      }
    })

*/

        

.state('app.profile', {
      url: "/profile",
      views: {
        'menuContent' :{
          templateUrl: "templates/profile.html"
        }
      }
    })

/*.state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html"
        }
      }
    })*/

/*.state('app.emailogin', {
      url: "/emailogin",
      views: {
        'menuContent' :{
          templateUrl: "templates/emailogin.html",
           controller:'emailoginCtrl' 
        }
      }
    })*/


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
        controller: 'postgigCtrl'

        }
      }  
    })
    .state('app.listgig', {
      url: "/listgig",
      views: {
        'menuContent' :{
          templateUrl: "templates/listg.html",
          controller: 'ListgCtrl' 
        }
      }
    })
    .state('app.gigdetails', {
      url: "/gigdetails",
      views: {
        'menuContent' :{
          templateUrl: "templates/gigdetails.html",
          //controller: 'gigdetailsCtrl' 
        }
      }
    })
    .state('app.gigster', {
      url: "/gigster",
      views: {
        'menuContent' :{
          templateUrl: "templates/gigster.html",
        //  controller: 'PlaylistsCtrl'
        }
      }
    })

      


    .state('app.mygigs', {
      url: "/mygigs",
      abstract:true,
      views: {
        'menuContent' :{
          templateUrl: "templates/mygigs.html",
          //controller: 'PlaylistCtrl'
        }
      }
    })  


.state('app.mygigs.progress', {
      url: "/progress",
      views: {
        'home-tab' :{
          templateUrl: "templates/progress.html",
          controller: 'ProgressCtrl'
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
          controller: 'assignmentCtrl'
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
        abstract:true,
      views: {
        'menuContent' :{
          templateUrl: "templates/inbox.html",
          //controller: 'PlaylistCtrl'
        }
      }
    })

        .state('app.inbox.tab1', {
      url: "/tab1",
      views: {
        'tab-tab1' :{
          templateUrl: "templates/postg.html",
          controller: 'assignmentCtrl'
        }
      }
    })  

.state('app.inbox.tab2', {
      url: "/tab2",
      views: {
        'tab-tab2' :{
          templateUrl: "templates/listg.html",
     
        }
      }
    })  
.state('app.inbox.tab3', {
      url: "/tab3",
      views: {
        'tab-tab3' :{
          templateUrl: "templates/mygigs.html",
         
        }
      }
    })  
      .state('app.inbox.tab4', {
      url: "/tab4",
      views: {
        'tab-tab4' :{
          templateUrl: "templates/assignbid.html",
         
        }
      }
    })  

.state('app.inbox.tab5', {
      url: "/tab5",
      views: {
        'tab-tab5' :{
          templateUrl: "templates/inbox1.html",
         
        }
      }
    })  




      .state('app.bidsubmit', {
      url: "/bidsubmit",
      views: {
        'menuContent' :{
          templateUrl: "templates/bidsubmit.html",
          //controller: 'PlaylistCtrl'
        }
      }
    })   

        .state('app.statusreport', {
          url: "/statusreport",
          views: {
            'menuContent' :{
              templateUrl: "templates/statusreport.html",
              //controller: 'PlaylistCtrl'
            }
          }
        })

.state('app.ratencomment', {
          url: "/ratencomment",
          views: {
            'menuContent' :{
              templateUrl: "templates/ratencomment.html",
              //controller: 'PlaylistCtrl'
            }
          }
        })

.state('app.sendmsg', {
          url: "/sendmsg",
          views: {
            'menuContent' :{
              templateUrl: "templates/sendmsg.html",
              //controller: 'PlaylistCtrl'
            }
          }
        })


        .state('app.messages', {
      url: "/messages",
      views: {
        'menuContent' :{
          templateUrl: "templates/messages.html",
          
        }
      }
    });

    

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/login');
});

exampleApp.controller("LoginController", function($scope, $http,$cordovaOauth, $localStorage, $state) {

    $scope.login = function() {
        $cordovaOauth.facebook("1500472286892894", ["email", "read_stream", "user_website", "user_location", "user_relationships"]).then(function(result) {
            $localStorage.accessToken = result.access_token;

            $state.go("app.home");
            console.log("HOme Page");
        }, function(error) {
            alert("There was a problem signing in!  See the console for logs");
            console.log(error);
        });
    };

      $scope.twitterLogin = function() {
            $cordovaOauth.twitter("8YNLJvKqLvz80CyJcYzUE9gTT", "SZt4uIqme0uqahtixeKuKvXNOze5iZA4gTt2rqtOijT0gorw7X").then(function(result) {
                $scope.oauthResult = result;
                  $state.go("app.home");
            }, function(error) {
                $scope.oauthResult = "OAUTH ERROR (see console)";
                alert("There was a problem signing in!  See the console for logs");
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

                        $state.go("app.home");
                    })
                    .error(function(data, status) {
                        alert("ERROR: " + data);
                    });
                ref.close();
            }
        });
    }

});