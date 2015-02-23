// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js


var exampleApp=angular.module('starter', ['ionic', 'starter.controllers','ngStorage', 'ngCordova','angular-md5', 'twitterApp.services' , 'openfb'])

.run(function($ionicPlatform , OpenFB) {

   OpenFB.init('842322769161509');
   
  $ionicPlatform.ready(function() {
       // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard for form inputs)
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
      controller: 'AppCtrl'
  })
.state('app.login', {
      url: "/login",
      views: {
        'menuContent' :{
          templateUrl: "templates/login.html",
            controller:'mainloginctrl'
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
.state('app.profile', {

      url: "/profile",
      views: {
        'menuContent' :{
          templateUrl: "templates/profile.html",
          controller: 'profilecontroller'
        }
      }
    })






.state('app.home', {
      url: "/home",
      views: {
        'menuContent' :{
          templateUrl: "templates/home.html",
          controller:'homeCtrl' 
        }
      }
    })

/*.state('app.tabs', {
      url: "/tabs",
      views: {
        'menuContent' :{
          templateUrl: "templates/tabs.html",
          //controller: 'PlaylistCtrl'
        }
      }
    })
*/
.state('app.listgig', {
      url: "/listgig",
      views: {
        'menuContent' :{
          templateUrl: "templates/listg.html",
          controller: 'ListgCtrl' 
        }
      }
    })

.state('app.postgig', {
      url: "/postgig",
      views: {
        'menuContent' :{
        templateUrl: "templates/postg.html",
        controller: 'postgigCtrl'

        }
      }  
  })

.state('app.gigdetails', {
      url: "/gigdetails",
      views: {
        'menuContent' :{
          templateUrl: "templates/gigdetails.html"
        //  controller: 'gigdetailsCtrl' 
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

.state('app.inbox', {
      url: "/inbox",
      views: {
        'menuContent' :{
          templateUrl: "templates/inbox1.html",
          controller : "inboxcontroller"
         
        }
      }
    })    


.state('app.mygigs', {
      url: "/mygigs",
      abstract:true,
      views: {
        'menuContent' :{
          templateUrl: "templates/mygigs.html",
          controller: 'mygigsctrl'
        }
      }
    })  


.state('app.changepassword', {
      url: "/changepassword",
      abstract:true,
      views: {
        'menuContent' :{
          templateUrl: "templates/changepassword.html",
          controller: 'changepasswordctrl'
        }
      }
    })  

.state('app.mygigs.progress', {
      url: "/progress",
      views: {
        'about-tab' :{
          templateUrl: "templates/progress.html",
          controller: 'ProgressCtrl'
        }
      }
    })  

.state('app.mygigs.bid', {
      url: "/bid",
      views: {
        'home-tab' :{
          templateUrl: "templates/bid.html",
          controller:'biddingcontroller'     
        }
      }
    })  

.state('app.mygigs.completed', {
      url: "/completed",
      views: {
        'contact-tab' :{
          templateUrl: "templates/completed.html",
          controller:'completedcontroller'
         
        }
      }
    })  

.state('app.assignment', {
      url: "/assignment",
      views: {
        'menuContent' :{
          templateUrl: "templates/assignment.html",
          controller: "mainassognmentctrl"
          
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
          controller: 'assignmentbidcontroller'
     
        }
      }
    })  
.state('app.assignment.assigncompleted', {
      url: "/assigncompleted",
      views: {
        'contact-tab' :{
          templateUrl: "templates/assigncompleted.html",
          controller: 'assignmentbidcompleted'
         
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





        /*

        .state('app.inbox.tab1', {
      url: "/<!--1",
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



    */


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
  $urlRouterProvider.otherwise('app/login');

}).directive('logout', function( $state ,  OpenFB){
    
if( window.localStorage.getItem('islogin') == 'true' ){
        
       }
    
    return {
      restrict:'E',
      template : '<span class="menu-space">LOGOUT</span>',
      compile : function(element, attributes) {
      element.attr("id", "ass_logout");
    return {
      pre: function(scope, element, attributes, controller, transcludeFn){
      scope.association_details = JSON.parse( window.localStorage.getItem("association_details") );                  
      },
      post:function( scope, elem, attrs ){
      elem.bind('click', function (){
      window.localStorage.clear();
      //window.localStorage.setItem('islogin',true);
      $state.go('app.login');
    })                  
               }
           }
        }
    }


});

exampleApp.controller("LoginController", function($scope, $http,$cordovaOauth, $localStorage, $state , $location , $window ) {
      

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
        

  //var requestToken = "";
//var accessToken = "";
var clientId = "93257858140-rf5fh69gvk2q90sivtkc3sglmrtbum80.apps.googleusercontent.com";
var clientSecret = "3cJKVKS9Jz3ukuckhGnlWoqg";
//var code="4/IIH-eIbJerIV9YyfOoOTnrLP3fMx8I2_ZU9ERnB5_n4.UqD-WpBOcR8Tcp7tdiljKKZpyqSzlgI";

        /*var ref = window.open('https://accounts.google.com/o/oauth2/auth?client_id=' + clientId + '&redirect_uri=urn:ietf:wg:oauth:2.0:oob&scope=https://www.googleapis.com/auth/urlshortener&approval_prompt=force&response_type=code&access_type=offline', '_blank', 'location=no');
            ref.addEventListener('loadstart', function(event) {
            if((event.url).startsWith("urn:ietf:wg:oauth:2.0:oob")) {
                requestToken = (event.url).split("code=")[1];
                $http({method: "post", url: "https://accounts.google.com/o/oauth2/token", data: "client_id=" + clientId + "&client_secret=" + clientSecret + "&redirect_uri=urn:ietf:wg:oauth:2.0:oob" + "&grant_type=authorization_code" + "&code=" + requestToken })
                   .success(function(data) {
                        accessToken = data.access_token;
                        alert(oye);
                          alert(accessToken);
                        console.log(accessToken);

                        $state.go("app.home");
                    })
                    .error(function(data, status) {
                        alert("ERROR: " + data);
                    });


                ref.close();
            }
        });*/
//////////////////

  
    $cordovaOauth.google("93257858140-rf5fh69gvk2q90sivtkc3sglmrtbum80.apps.googleusercontent.com" , ["https://www.googleapis.com/auth/urlshortener" , "https://www.googleapis.com/auth/userinfo.email "]).then(
      function(result) {
        alert(JSON.stringify(result));
        window.localStorage.setItem('islogin',true);
        alert('Login success');
        $state.go("app.tabs.listgig");
      },
      function(error){
        alert.log(error);
      });
    }

});
exampleApp.directive("passwordVerify", function() {
   return {
      require: "ngModel",
      scope: {
        passwordVerify: '='
      },
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function() {
            var combined;
            
            if (scope.passwordVerify || ctrl.$viewValue) {
               combined = scope.passwordVerify + '_' + ctrl.$viewValue; 
            }                    
            return combined;
        }, function(value) {
            if (value) {
                ctrl.$parsers.unshift(function(viewValue) {
                    var origin = scope.passwordVerify;
                    if (origin !== viewValue) {
                        ctrl.$setValidity("passwordVerify", false);
                        return undefined;
                    } else {
                        ctrl.$setValidity("passwordVerify", true);
                        return viewValue;
                    }
                });
            }
        });
     }
   };
});

'use strict';

exampleApp.directive('match', match);

function match ($parse) {
    return {
        require: '?ngModel',
        restrict: 'A',
        link: function(scope, elem, attrs, ctrl) {
            if(!ctrl) {
                if(console && console.warn){
                    console.warn('Match validation requires ngModel to be on the element');
                }
                return;
            }

            var matchGetter = $parse(attrs.match);

            scope.$watch(getMatchValue, function(){
                ctrl.$validate();
            });

            ctrl.$validators.match = function(){
                return ctrl.$viewValue === getMatchValue();
            };

            function getMatchValue(){
                var match = matchGetter(scope);
                if(angular.isObject(match) && match.hasOwnProperty('$viewValue')){
                    match = match.$viewValue;
                }
                return match;
            }
        }
    };
}