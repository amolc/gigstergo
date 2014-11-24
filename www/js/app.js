// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers'])

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

    .state('app', {
      url: "/app",
      abstract: true,
      templateUrl: "templates/menu.html",
      controller: 'AppCtrl'
    })

.state('app.Home', {
      url: "/Home",
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
  $urlRouterProvider.otherwise('/app/home');
});

