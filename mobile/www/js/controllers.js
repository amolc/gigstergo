/*document.addEventListener("deviceready", deviceready, false);
function deviceready() {
  if ( device.platform == 'android' || device.platform == 'Android'  ){
    var pushconfig = {
      "senderID":"549393134350",
      "ecb":"onNotificationAPN"
    };
  }else {
    var pushconfig = {
      "badge":"true",
      "sound":"true",
      "alert":"true"
      //"ecb":"onNotificationAPN"
    };
  }
  try{
    //alert( device.platform +' '+ device.uuid );
    window.localStorage.setItem("uid", device.uuid );    
    window.localStorage.setItem("platform", device.platform );    
    pushNotification = window.plugins.pushNotification;
    //pushNotification.unregister(successHandler, errorHandler);
    pushNotification.register(
    successHandler,
    errorHandler, pushconfig );
    } catch (e) {
        alert('this alet is because'+e)
        alert(e);
    }
}
function successHandler(data) {
  alert( 'in successHandler=' + device.platform +' '+ device.uuid );
  if( device.platform == 'ios' || device.platform == 'iOS' ){
    console.log( 'token id ='+ data );
    alert('this is token_id='+data);
    window.localStorage.setItem("token_id", data );    
  }
};
function errorHandler(e) {
    //alert("ERROR" + e);
}
function onNotificationAPN (event) {
  //alert("NO: " + JSON.stringify(event));
  window.localStorage.setItem("token_id", event.regid );    
  if ( event.regid ){
    //alert('this is regid '+event.regid);
    navigator.notification.alert(event.alert);
  }
  if ( event.alert ){
        navigator.notification.alert(event.alert);
  }
  if ( event.sound ){
    var snd = new Media(event.sound);
    snd.play();
  }
  if ( event.badge ){
    pushNotification.setApplicationIconBadgeNumber(successHandler, errorHandler, event.badge);
  }
}*/
angular.module('starter.controllers', [])
.controller('AppCtrl', function($scope, $ionicModal, $cordovaPush , $state, $http, $stateParams, $ionicLoading, OpenFB, ionPlatform ) {

  // call to register automatically upon device ready
    ionPlatform.ready.then(function (device) {
        $scope.register();
    });


    // Register
    $scope.register = function () {
        var config = null;

        if (ionic.Platform.isAndroid()) {
            config = {
                "senderID": "19731243997" // REPLACE THIS WITH YOURS FROM GCM CONSOLE - also in the project URL like: https://console.developers.google.com/project/434205989073
            };
        }
        else if (ionic.Platform.isIOS()) {
            config = {
                "badge": "true",
                "sound": "true",
                "alert": "true"
            }
        }

        $cordovaPush.register(config).then(function (result) {
            console.log("Register success " + result);

            $cordovaToast.showShortCenter('Registered for push notifications');
            $scope.registerDisabled=true;
            // ** NOTE: Android regid result comes back in the pushNotificationReceived, only iOS returned here
            if (ionic.Platform.isIOS()) {
                $scope.regId = result;
                console.log( 'Token id ='+$scope.regId );
                alert( 'Token id ='+$scope.regId );
                storeDeviceToken("ios");
            }
        }, function (err) {
            console.log("Register error " + err)
        });
    }


  $scope.user=window.localStorage.getItem('username');
  $scope.loginstatus = window.localStorage.getItem('islogin');
  $scope.myvar = true;
  $scope.setFocus =  function(){
    $scope.myvar= !$scope.myvar;
  };
  if( $scope.loginstatus ){
    $scope.loginstatus = false;
    $scope.username = window.localStorage.getItem('username');
    $scope.profileimage = profileUrl+window.localStorage.getItem('profileimage');
  }
})

.controller('ProgressCtrl', function($scope,$http,$stateParams, $state, $ionicModal) {
  if( window.localStorage.getItem('islogin') != 'true' ){
    $state.go('applogin')
  }
  $scope.progress= {};
  var userididid=parseInt(window.localStorage.getItem('userid1'));
  console.log(userididid);
  //console.log(user);
  var reqdata={
      userid:userididid
  };
  //controller.log(reqdata);
  $http.post(baseURL + 'progressassignments',reqdata).success(function(res) {
    console.log(res);
    $scope.progress = res;
    // console.log(progress);
    if (res.status == 'false') {
      alert(res.message);
    } else {
      console.log("No data");
      //$scope.states=res;
    }
  }).error(function() {
        alert("Please check your internet connection or data source..");
    });
  $ionicModal.fromTemplateUrl('templates/MygigAwardedgigdtls.html', {
      scope:$scope
    }).then(function(modal){
        $scope.modal4=modal;
      });
  $scope.closegigdetailmodel = function(){
    $scope.modal4.hide();
  };
  $scope.awardmygig = function(data, index){
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
    }else{
       $scope.index=index;
       $scope.progressmygigdetails=data;
       $scope.biddersinmygig={};
       var reqdata={
        prjid: $scope.progressmygigdetails.prjId
       };
       $http.post(baseURL + 'biddingdetails',reqdata).success(function(res) {
          $scope.biddersinmygig = res;
          console.log(res);
          console.log($scope.biddersinmygig);
          if (res.status == 'false') {
            alert(res.message);
          } else {
              $scope.bidders=res;
            console.log($scope.biddersinmygig);
          }
        }).error(function() {
        alert("Please check your internet connection or data source..");
      });
      $scope.modal4.show();
    }
  }
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/messages.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Triggered in the login modal to close it
  $scope.closemsgmodel = function() {
    $scope.modal.hide();
  };
  $scope.msgmodel = function(sender,reciever,projectid) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }else{
          // $scope.recordinmygawarded=data;
          var stampo=event.timeStamp;
          $scope.sendmsgdata={
          projectid : projectid,
          msgfrom : sender,
          msgto : reciever,
          msgon: stampo,
          isread:'0',
          msgtype:'d',
          reportid:'',
          haveattachment : '0',
          };
       }
       var reqdata={
         prjid : projectid,
         msgfrom : sender,
         msgto : reciever
       };
       console.log(reqdata);
       $http.post(baseURL + 'getpreviousmsgs',reqdata).success(function(res) {
        console.log(res);
        $scope.msgs=res;
        $scope.from=sender;
        $scope.to=reciever;
        $scope.sender=$scope.msgs.sender[0].fname+" "+$scope.msgs.sender[0].lname;
        $scope.reciever=$scope.msgs.reciever[0].fname+" "+$scope.msgs.reciever[0].lname;
      }).error(function() {
        alert("Please check your internet connection or data source..");
      });
    $scope.modal.show();
  };
$scope.sendmsg=function(data){
  msgcontent=data.data;
  $scope.data=data;
  console.log(msgcontent);
  if(msgcontent.length>0){
    console.log(data);
      $http.post(baseURL + 'sendmsg',data).success(function(res) {
        console.log(res);
        if(res.status==true){
          $scope.msgs.msgs.push($scope.data);
          console.log($scope.data);
        }
      }).error(function() {
        alert("Please check your internet connection or data source..");
      });
  }   
};
/*
 // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/statusreport.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });
  // Triggered in the login modal to close it
  $scope.closestatusreportmodel = function() {
    $scope.modal2.hide();
  };
  $scope.statusreportmodel = function(data,index) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }else{
        $scope.reportdata=data;
        $scope.indexinreport=index;
         var stampo=event.timeStamp;
        $scope.record={
            rpId:$scope.reportdata.rpId,
            rpdate:stampo,
            projectId:$scope.reportdata.prjId,
            reportto:$scope.reportdata.awardedto,
            reportfrom:$scope.reportdata.projectowner,
            isapproved:'0',
            
        };
        $scope.modal2.show();
       }
  };

$scope.sendreport=function(record){
  console.log(record);
  record.completion=parseInt(record.completion);
  console.log(record);
  $http.post(baseURL + 'sendreport',record).success(function(res) {
        console.log(res);
        if(res.status==true){
            $scope.progress[$scope.indexinreport].rpId=record.rpId;
            $scope.progress[$scope.indexinreport].completion=record.completion;
             $scope.modal2.hide();
        }

      }).error(function() {
        alert("Please check your internet connection or data source..");
      });

};
*/


// Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/sendfeedback.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal3 = modal;
  });
  // Triggered in the login modal to close it
  $scope.closefeedbackmodel = function() {
    $scope.modal3.hide();
  };
  $scope.feedbackmodel = function(data,index) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }else{
       $scope.feedbackdata=data;
        $scope.feedbackindex=index;

       var stampo=event.timeStamp;
       $scope.feedback={
        ratefrom:$scope.feedbackdata.projectowner,
        rateto:$scope.feedbackdata.awardedto,
        projectId:$scope.feedbackdata.prjId,
        ratedon:stampo,
        rating:'3'
       };

        $scope.modal3.show();
       }
  };



$scope.sendfeedback=function(feedback){
  $http.post(baseURL + 'sendfeedback',feedback).success(function(res) {
    console.log(res);
    if(res.status==true){
      $scope.progress[ $scope.feedbackindex ].status= '3';
      $scope.modal3.hide();
    }
  }).error(function() {
        alert("Please check your internet connection or data source..");
    });
};
})
.controller('ListgCtrl', function($scope,$http,$stateParams,$state,$ionicModal , $ionicLoading , OpenFB) {
  if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
  }   

  var stampo = Date.now();
  console.log("timeStamp----------");
  console.log(stampo);
  var userididid=window.localStorage.getItem('userid1');
  $scope.currentuser= userididid;
  $scope.profileUrl = profileUrl;
  $scope.myvar = false;
  $scope.setFocus =  function(){
    $scope.myvar= !$scope.myvar;
  };
  $scope.listgigster = { };
  $scope.$on('$stateChangeSuccess', function() {
    $scope.loadMoreGigs();
  });
  $scope.listgigster = [];
  $scope.page = 1;
  $scope.loadMoreGigs = function(){
    $http.get( baseURL + 'listgig/' + $scope.page ).success(function(res) {
      // console.log("resource log");
      //console.log(res);
      $scope.listgigster = res;
      console.log(res);
      for(i=0; i<$scope.listgigster.length; i++){
        if($scope.listgigster[i].bidders!=null){
          //console.log($scope.listgigster[i].bidders);
          var res1 = $scope.listgigster[i].bidders.split(","); 
          //console.log(res1);        
          var len = res1.length;
          var posts = [];
          var bidderTemp= [];
          $scope.listgigster.bidsent=false;
          for(m=0; m<len; m++){
            posts.push ( profileUrl+res1[m]+'.jpg' );
            bidderTemp.push(res1[m]);
          }
          $scope.listgigster[i].bidders=posts;
          //console.log(bidderTemp);
          if(bidderTemp.indexOf($scope.currentuser)){
            $scope.listgigster[i].bidsent=true;
            }else{
            $scope.listgigster[i].bidsent=false;
            }
        }
        if ( $scope.listgigster[i].prjdesc.length > 100 ) {
                $scope.listgigster[i].showmore=true;
            
            }else{
              $scope.listgigster[i].showmore=false;
              }
      }

      //$scope.$broadcast('scroll.infiniteScrollComplete');
    });
  }
    $scope.isRecentOrder = function(date) {
      // Assuming date is a string of parsable format: ie. "2014-01-27T01:00:00+00:00"
      var diff = new Date() - new Date(date);
      // Calculate from milliseconds
      var days = ((((diff / 1000) / 60) / 60) / 24);
      // var nWeeks = parseInt(days / 7);
      //var nmonths = parseInt(days / 30);
      return days | 0;
    }
          
   
 // Form data for the login modal  kv
    $scope.gigdata = {};

  // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/bidongig.html', {
         scope: $scope,
         animation : 'slide-in-right'
    }).then(function(modal) {
        $scope.modal = modal;
    });
 
    // Triggered in the login modal to close it
        $scope.closegigdetail = function() {
        $scope.modal.hide();
     };

  // Open the login modal
  $scope.bidongigform = function(data,index) {
    if( window.localStorage.getItem('islogin') != 'true' ){
            $state.go('applogin')
    } else {
      $scope.recordindex=index;
      var userididid=window.localStorage.getItem('userid1');
      $scope.currentuser= userididid;
      var stampo = event.timeStamp;
      $scope.record = data;
      console.log(data);
      console.log("this is gigdetails");
      $scope.modal.show();
      $scope.bid={
          record : data,
          currentuser:userididid,
          bidon:stampo,
        }
    }
  };

  // Perform the login action when the user submits the login form
  $scope.doBid = function(formstatus,bid) {
    console.log("formstatus");
    console.log(bid);
    if(formstatus==true){
            $http.post(baseURL + 'bidongig', bid).success(function(req,res){
                $scope.warning = req.message; 
                $scope.listgigster[ $scope.recordindex ].bidfrom= $scope.currentuser;
               // $scope.modal.hide();
    $http.post(baseURL + 'pushnotification',bid).success(function(res) {
               $scope.response = res;
               console.log("res");
               console.log(res);
               //alert("Request is sent");
               //alert($scope.response);
               }).error(function() {
                 alert("Please check your internet connection or data source..for pushNotification");
             });
          }).error(function(res){
            alert(res);
          });
          console.log("bidding success...............");
          $scope.modal.hide();
          $state.go('app.listgig');
     }
};

 // Create the sentbid modal that we will use later
  $ionicModal.fromTemplateUrl('templates/sentbid.html', {
    scope: $scope,
    animation : 'slide-in-right'
  }).then(function(modal) {
    $scope.modal2 = modal;
  });
  // Triggered in the sentbid modal to close it
  $scope.closebiddetail = function() {
    $scope.modal2.hide();
  };
  $scope.sentbid = function(bid) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }else{
      $scope.bidsentrecord=bid;
      console.log(bid);
      console.log('sentbid.......--------------------------------');
      $scope.modal2.show();
       }
  };



 // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/gigdetails.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal3 = modal;
  });
  // Triggered in the login modal to close it
  $scope.closegigdetailmodel = function() {
    $scope.modal3.hide();
  };
  
  $scope.gotogigdetails = function( projectid ) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
    } else {

        $state.go('app.gigdetails', { 'gigid' : projectid } );
    }
    
  };


 $scope.cancelgig=function(projectid,index){
  projectid= $scope.cancelgigrecord;
  index = $scope.cancelgigindex;
  console.log("cancelgig fired");
       var reqdata={
      prjid:projectid
       };
       console.log("project id is--------");
       console.log(projectid);
       $http.post(baseURL + 'cancelgig',reqdata).success(function(res) {
        console.log(res);
       //$scope.bidding[ index ].status= '5';
         $scope.modal2.hide();
         $scope.modal3.hide();
         

      }).error(function() {
        alert("Please check your internet connection or data source..");
      });
      //$state.go('app.mygigs.progress');
      console.log("success")
      $state.go('app.listgig');
    };


    


})



.controller('gigdetailsCtrl' , function($scope, $http, $state, $stateParams, $ionicModal ){
  if( window.localStorage.getItem('islogin') != 'true' ){
    $state.go('applogin')
  }else {
    var userididid=window.localStorage.getItem('userid1');
    $scope.currentuser= userididid;
    var reqdata={
      prjid: $stateParams.gigid
    };
    console.log("gigid is");
    console.log(reqdata);
    $http.post(baseURL + 'gigdetails',reqdata).success(function(res) {
      $scope.gig = res;
      console.log("resorces");
      console.log(res);
      if (res.status == 'false') {
        alert(res.message);
      } else {
        $scope.gig=res;
        console.log("$scope.gig");
        console.log($scope.gig);
      }
    }).error(function() {
        alert("Please check your internet connection or data source..");
      });
  $http.post(baseURL + 'biddingdetails',reqdata).success(function(res) {
    $scope.bidders = res;
    if (res.status == 'false') {
      alert(res.message);
    } else {
        $scope.bidders=res;
        console.log("$scope.bidders");
        console.log($scope.bidders);
      }
  }).error(function() {
      alert("Please check your internet connection or data source..");
    });
  $scope.closecancelgigmodel = function() {
      $state.go('app.listgig')
  };
// Create the cancel gig modal that we will use later
  $ionicModal.fromTemplateUrl('templates/cancelgigmodel.html', {
    scope: $scope,
    animation : 'slide-in-right'
  }).then(function(modal) {
    $scope.modal2 = modal;
  });
  $scope.closecancelgigmodel = function() {
    $scope.modal2.hide();
  };
  $scope.cancelgigmodel = function(projectid,index) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
    }else{
        var reqdata={
          prjid: $stateParams.gigid
        };
        $scope.cancelgigrecord=reqdata;
        $scope.cancelgigindex=index;
        console.log("$scope.cancelgigrecord");
        console.log($scope.cancelgigrecord);
      }
    $scope.modal2.show();
  };
  $scope.cancelgig=function(projectid,index){
    console.log("cancelgig fired");
    var reqdata={
      prjid: $stateParams.gigid
    };
    console.log("this is project id ,,,,,,,,,,,,,,,,,,,");
    console.log(reqdata);
    $http.post(baseURL + 'cancelgig',reqdata).success(function(res) {
      console.log(res);
      //$scope.bidding[ $scope.cancelgigindex ].status= '5';
    }).error(function() {
          alert("Please check your internet connection or data source..");
        });
        //$state.go('app.mygigs.progress');
        $scope.modal2.hide();
        $state.go('app.listgig');
  };
}

})



//new controllers
.controller('homeCtrl', function($scope,$http,$state){
   if( window.localStorage.getItem('islogin') != 'true' ){
      $state.go('applogin')
   }
})

.controller('mainloginctrl', function($scope , $http , $state , $ionicModal ,$stateParams, $location , OpenFB , $cordovaPush){
  if( window.localStorage.getItem('islogin')=='true' ){
    $state.go('app.listgig')
  }
  $scope.social=true;
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/emaillogin2.html', {
    scope: $scope,
    animation : 'slide-in-right'
  }).then(function(modal) {
       $scope.modal = modal;
     });
    // Triggered in the login modal to close it
  $scope.closeemaillogin = function() {
    $scope.modal.hide();
  };
  // Open the login modal
  $scope.emaillogin = function(data) {
    $scope.modal.show();
  };
  // Perform the login action when the user submits the login form
  $scope.user = {
      device : window.localStorage.getItem("uid"),
      platform : window.localStorage.getItem("platform"),
      token_id : window.localStorage.getItem("token_id")
  };
    $scope.dologin = function(formstatus,user) {
        if(formstatus==true){
            console.log(user);
        $http.post(baseURL + 'loginval',user).success(function(res) {
        if (res.status == false) {
           var div = document.getElementById('errmsg');
            div.innerHTML = res.message;

           } else {
              window.localStorage.setItem('islogin',true);
              window.localStorage.setItem('profileimage',res.record[0].profileimage);
              window.localStorage.setItem('username',res.record[0].username);
              window.localStorage.setItem('useremail',res.record[0].usermail);
              window.localStorage.setItem('userid1',res.record[0].userId);
              $scope.modal.hide();
              $state.go("app.profile");
           }
              }).error(function() {
                     alert("Please check your internet connection or data source..");
          });
        }
};

// Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/signupmodal.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal1 = modal;
  });
 
// Triggered in the login modal to close it
  $scope.closesignupmodal = function() {
    $scope.modal1.hide();
  };

  // Open the login modal
  $scope.signupmodalwindow = function(data) {
     $scope.user={
          profileimage : '118XX1419939486.jpg',
        }
    $scope.modal1.show();
  };

$ionicModal.fromTemplateUrl('templates/forgotpass.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });
 
// Triggered in the login modal to close it
  $scope.closeforgotpasmodal = function() {
    $scope.modal2.hide();
  };

  // Open the login modal
  $scope.forgotpasswindow = function(data) {
     
    $scope.modal2.show();
  };
 // Perform the login action when the user submits the login form


  $scope.doforgotpass = function(formstatus,user){
    if (formstatus==true) {

    alert("Email has been send to your E-mail, Please check the mail for login");

        
    };
     
  };
//for verify A/c start
$ionicModal.fromTemplateUrl('templates/verifyacc.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal3 = modal;
  });
 
// Triggered in the login modal to close it
  $scope.closeverifyaccmodal = function() {
    $scope.modal3.hide();
  };

  // Open the login modal
  $scope.verifyaccwindow = function(data) { 
    $scope.modal3.show();
  };
 // Perform the login action when the user submits the login form


  $scope.doverifyacc = function(formstatus,user){
    if (formstatus==true) {
           $http.post(baseURL + 'verifyacc', user).success(function(res){
        }).error(function(res){
      alert(res);
    });
        $scope.modal3.hide();
       }
  };
//for verify A/c end
  $scope.dosignup = function(formstatus,user) {
       if(formstatus==true){
          $http.post(baseURL + 'signup', user).success(function(res){
          // $scope.warning = req.message; 
          console.log(res);
          alert("signUp successful");
          if(res.status==true){
            $scope.modal1.hide();
            $state.go('applogin');
          }else{
            var div = document.getElementById('errmsg');
            div.innerHTML = res.message;
          }
          //$state.go('applogin');
        }).error(function(res){
      alert(res);
    });
       }
  };
// function to submit the form after all validation has occurred      
  $scope.submitForm = function(isValid) {
    // check to make sure the form is completely valid
    if (isValid) { 
      alert('our form is amazing');
    }
  };
// facebook login
  $scope.facebookLogin = function ( ) {
    OpenFB.login('email,read_stream,publish_stream').then(
      function () {
        //$scope.user = user ;
        //alert('Login successful');
        OpenFB.get('/me').success(function (user) {
				  $scope.user = user;
          //alert(user.name +' '+ user.email + +user.id );
          console.log(user);                     
          $http.post(baseURL + 'loginfb', user).success(function(res) {
            console.log(res);
            $scope.response = res;
            if (res.status == false) {
            } else {
                console.log(res.record[0]);
                $scope.linprofile = res.record[0];
                console.log( $scope.linprofile.profileimage )
                window.localStorage.setItem('islogin',true);
                //window.localStorage.setItem('userdetails',JSON.stringify(res.record[0]));
                window.localStorage.setItem('username',res.record[0].usermail);
                window.localStorage.setItem('userid1',res.record[0].userId);
                $scope.modal.hide();
                $state.go("app.profile");
              }
            }).error(function() {
                alert("Please check your internet connection or data source..");
              });
        });			
      },
      function () {
        alert('OpenFB login failed');
      });
  };

})

.controller('mygigsctrl', function($scope,$http,$state){
       if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }
})

.controller('mainassognmentctrl', function($scope,$http,$state){
       if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }
})

.controller('assignmentCtrl', function($scope,$http,$state, $ionicModal){
       if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }
$scope.biddingawarded= {};
 var userididid=window.localStorage.getItem('userid1');
  console.log(userididid);






  $scope.currentuser=parseInt(userididid);
  //console.log(user);
  var reqdata={
      userid:userididid
  };
   $http.post(baseURL + 'bidsawarded',reqdata).success(function(res) {
        //console.log(res);
        $scope.biddingawarded = res;
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


// Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/messages.html', {
    scope: $scope,
    animation : 'slide-in-right'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Triggered in the login modal to close it
  $scope.closemsgmodel = function() {
    $scope.modal.hide();
  };
  $scope.msgmodel = function(sender,reciever,projectid) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }else{
                   // $scope.recordinmygawarded=data;
                  var stampo=event.timeStamp;
                  $scope.sendmsgdata={
                              projectid : projectid,
                              msgfrom : sender,
                              msgto : reciever,
                              msgon: stampo,
                              isread:'0',
                              msgtype:'d',
                              reportid:'',
                              haveattachment : '0',
                                  };
             }
     var reqdata={
      prjid : projectid,
      msgfrom : sender,
      msgto : reciever
      };

      console.log(reqdata);
       $http.post(baseURL + 'getpreviousmsgs',reqdata).success(function(res) {
        console.log(res);
        $scope.msgs=res;
        $scope.from=sender;
        $scope.to=reciever;
        $scope.sender=$scope.msgs.sender[0].fname+" "+$scope.msgs.sender[0].lname;
        $scope.reciever=$scope.msgs.reciever[0].fname+" "+$scope.msgs.reciever[0].lname;


      }).error(function() {
        alert("Please check your internet connection or data source..");
      });
 

    $scope.modal.show();
  };

$scope.sendmsg=function(data){
  msgcontent=data.data;
  $scope.data=data;
  console.log(msgcontent);
  if(msgcontent.length>0){
    console.log(data);
      $http.post(baseURL + 'sendmsg',data).success(function(res) {
        console.log(res);
        if(res.status==true){
          $scope.msgs.msgs.push($scope.data);
          console.log($scope.data);
        }
        

      }).error(function() {
        alert("Please check your internet connection or data source..");
      });

  }   
};


 // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/statusreport.html', {
    scope: $scope,
    animation : 'slide-in-right'
  }).then(function(modal) {
    $scope.modal5 = modal;
  });
  // Triggered in the login modal to close it
  $scope.closestatusreportmodel = function() {
    $scope.modal5.hide();
  };
  $scope.statusreportmodel = function(data,index) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }else{
        $scope.reportdata=data;
        $scope.indexinreport=index;
         var stampo=event.timeStamp;
        $scope.record={
            rpId:$scope.reportdata.rpId,
            rpdate:stampo,
            projectId:$scope.reportdata.prjId,
            reportto:$scope.reportdata.userId,
            reportfrom:$scope.currentuser,
            isapproved:'0',
            
        };
        $scope.modal5.show();
       }
  };

$scope.sendreport=function(record){
  console.log(record);
  record.completion=parseInt(record.completion);
  console.log(record);
  $http.post(baseURL + 'sendreport',record).success(function(res) {
        console.log(res);
        if(res.status==true){
            $scope.biddingawarded[$scope.indexinreport].rpId=record.rpId;
            $scope.biddingawarded[$scope.indexinreport].completion=record.completion;
             $scope.modal5.hide();
        }

      }).error(function() {
        alert("Please check your internet connection or data source..");
      });

};



// Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/sendfeedback.html', {
    scope: $scope,
    animation : 'slide-in-right'
  }).then(function(modal) {
    $scope.modal3 = modal;
  });
  // Triggered in the login modal to close it
  $scope.closefeedbackmodel = function() {
    $scope.modal3.hide();
  };
  $scope.feedbackmodel = function(data,index) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }else{
       $scope.feedbackdata=data;
        $scope.feedbackindex=index;

       var stampo=event.timeStamp;
       $scope.feedback={
        ratefrom:$scope.currentuser,
        rateto:$scope.feedbackdata.userId,
        projectId:$scope.feedbackdata.prjId,
        ratedon:stampo,
        rating:'3'
       };

        $scope.modal3.show();
       }
  };



$scope.sendfeedback=function(feedback){
  console.log(feedback);
     $http.post(baseURL + 'sendfeedbackfrmbidder',feedback).success(function(res) {
        console.log(res);
        if(res.status==true){
             $scope.modal3.hide();
        }

      }).error(function() {
        alert("Please check your internet connection or data source..");
      });
};



 // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/gigdetailsinmybid.html', {
    scope: $scope,
    animation : 'slide-in-right'
  }).then(function(modal) {
    $scope.modal2 = modal;
  });
  // Triggered in the login modal to close it
  $scope.closebiddetail = function() {
    $scope.modal2.hide();
  };
  $scope.showbiddetail = function(data) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }else{
      $scope.biddetailsrecord=data;

       var reqdata={
           prjid: $scope.biddetailsrecord.prjId
        };

  $http.post(baseURL + 'biddingdetails',reqdata).success(function(res) {
          $scope.bidders = res;
          console.log(res);
          console.log($scope.bidders);
          if (res.status == 'false') {
            alert(res.message);
          } else {
              $scope.bidders=res;
            console.log($scope.bidders);
          }
        
        }).error(function() {
          alert("Please check your internet connection or data source..");
        });


        $scope.modal2.show();
         }
    };



})

.controller('assignmentbidcontroller', function($scope,$http,$state, $ionicModal){
       if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }
$scope.progress= {};
  var userididid=window.localStorage.getItem('userid1');
  console.log(userididid);
  $scope.currentuser=parseInt(userididid);
  //console.log(user);
  var reqdata={
      userid:userididid
  };
  $http.post(baseURL + 'bidsbidding',reqdata).success(function(res) {
        //console.log(res);
        $scope.biddingbids = res;
       // console.log($scope.progress);
        if (res.status == 'false') {
          alert(res.message);
        } else {
          console.log("No data aaaa");
        //$scope.states=res;
        console.log($scope.biddingbids);
          
        }
      
      }).error(function() {
        alert("Please check your internet connection or data source..");
      });


// Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/messages.html', {
    scope: $scope,
    animation : 'slide-in-right'
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Triggered in the login modal to close it
  $scope.closemsgmodel = function() {
    $scope.modal.hide();
  };
  $scope.msgmodel = function(sender,reciever,projectid) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }else{
                   // $scope.recordinmygawarded=data;
                  var stampo=event.timeStamp;
                  $scope.sendmsgdata={
                              projectid : projectid,
                              msgfrom : sender,
                              msgto : reciever,
                              msgon: stampo,
                              isread:'0',
                              msgtype:'d',
                              reportid:'',
                              haveattachment : '0',
                                  };
             }
     var reqdata={
      prjid : projectid,
      msgfrom : sender,
      msgto : reciever
      };

      console.log(reqdata);
       $http.post(baseURL + 'getpreviousmsgs',reqdata).success(function(res) {
        console.log(res);
        $scope.msgs=res;
        $scope.from=sender;
        $scope.to=reciever;
        $scope.sender=$scope.msgs.sender[0].fname+" "+$scope.msgs.sender[0].lname;
        $scope.reciever=$scope.msgs.reciever[0].fname+" "+$scope.msgs.reciever[0].lname;


      }).error(function() {
        alert("Please check your internet connection or data source..");
      });
 

    $scope.modal.show();
  };

$scope.sendmsg=function(data){
  msgcontent=data.data;
  $scope.data=data;
  console.log(msgcontent);
  if(msgcontent.length>0){
    console.log(data);
      $http.post(baseURL + 'sendmsg',data).success(function(res) {
        console.log(res);
        if(res.status==true){
          $scope.msgs.msgs.push($scope.data);
          console.log($scope.data);
        }
        

      }).error(function() {
        alert("Please check your internet connection or data source..");
      });

  }   
};



 // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/gigdetailsinmybid.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal2 = modal;
  });
  // Triggered in the login modal to close it
  $scope.closebiddetail = function() {
    $scope.modal2.hide();
  };
  $scope.showbiddetail = function(data) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }else{
      $scope.biddetailsrecord=data;
      console.log("$scope.biddetailsrecord");
      console.log($scope.biddetailsrecord);
       var reqdata={
           prjid: $scope.biddetailsrecord.prjId
        };

$http.post(baseURL + 'biddingdetails',reqdata).success(function(res) {
        $scope.bidders = res;
        console.log(res);
        console.log($scope.bidders);
        if (res.status == 'false') {
          alert(res.message);
        } else {
            $scope.bidders=res;
          console.log($scope.bidders);
        }
      
      }).error(function() {
        alert("Please check your internet connection or data source..");
      });


      $scope.modal2.show();
       }
  };

})



.controller('assignmentbidcompleted', function($scope,$http,$state){
       if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }
        $scope.biddingbidscomplted= {};
  var userididid=window.localStorage.getItem('userid1');
  console.log(userididid);
  //console.log(user);
  var reqdata={
      userid:userididid
  };
        $http.post(baseURL + 'assignbidscompleted',reqdata).success(function(res) {          
        $scope.biddingbidscomplted = res;
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

.controller('biddingcontroller', function($scope,$http,$state, $ionicModal,$stateParams, $filter){
       if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }
       $scope.progress= {};
  var userididid=window.localStorage.getItem('userid1');
  console.log(userididid);
  //console.log(user);
  var reqdata={
      userid:userididid
  };
  $http.post(baseURL + 'biddingmygigs',reqdata).success(function(res) {
        console.log("res");
        console.log(res);
        $scope.bidding = res;
       // console.log($scope.progress);
        if (res.status == 'false') {
          alert(res.message);
        } else {
          console.log("No dataaaaaaaaaaaaaa-----------------");
          console.log($scope.bidding);
        //$scope.states=res;
        }
      }).error(function() {
        alert("Please check your internet connection or data source..");
      });
   console.log("in mygig bidding"); 
   // Create the login modal that we will use later
   $ionicModal.fromTemplateUrl('templates/gigdetailsinmygig.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal3 = modal;
  });
  // Triggered in the login modal to close it
  $scope.closegigdetailmodel = function() {
    $scope.modal3.hide();
    console.log("modal3 on hide");
  };
  $scope.gigdetailsmodelinmygig = function(data,index) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }else{
      $scope.index=index;
     $scope.progressmygigdetails=data;
     $scope.biddersinmygig={};


 var reqdata={
      prjid: $scope.progressmygigdetails.prjId
  };
  console.log("request projectid");
  console.log(reqdata);



$http.post(baseURL + 'biddingdetails',reqdata).success(function(res) {
        $scope.biddersinmygig = res;
        console.log(res);
        console.log($scope.biddersinmygig);
        if (res.status == 'false') {
          alert(res.message);
        } else {
            $scope.bidders=res;

          console.log($scope.biddersinmygig);
        }
      
      }).error(function() {
        alert("Please check your internet connection or data source..");
      });

      $scope.modal3.show();
    
      
       }
    
  };



// Create the awardgig modal that we will use later
  $ionicModal.fromTemplateUrl('templates/awardgig.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Triggered in the awardgig modal to close it
  $scope.closeawardgigmodel = function() {
    $scope.modal.hide();
  };
  $scope.awardgigmodel = function(data,index) {
       $scope.awardgigrecord=data;
        $scope.awardgigindex=index;
         $scope.stampo=event.timeStamp;
         $scope.date=$filter('date')($scope.stampo, "yyyy-MM-dd");
          var userididid=window.localStorage.getItem('userid1');
          console.log(userididid);
        $scope.awarddata={
            projectId:$scope.progressmygigdetails.prjId,
            awardedto:$scope.awardgigrecord.bidfrom,
            assignedon:$scope.stampo,
            startdate:$scope.date,
            rating:'0',
            feedback:'',
            feedbackowner:'',
            actualcompletion:'',
            termsaccepted:'0',
            projectowner:userididid,
            terms:'',
            status:'2',
            isread:'0',

        };
    $scope.modal.show();
  };

$scope.awardgigfunction=function(data){
  console.log('awarded');
  console.log(data.awardedto);
      $http.post(baseURL + 'awardgig',data).success(function(res) {
      console.log(res);
      $scope.bidding[ $scope.awardgigindex ].status= '2';

      /*$http.post(baseURL + 'pushnotification',data).success(function(res) {
               $scope.response = res;
               console.log("res");
               console.log(res);
               alert("Request is sent");
               alert($scope.response);
               }).error(function() {
                 alert("Please check your internet connection or data source..for pushNotification");
             });*/
       
        $scope.modal.hide();

      }).error(function() {
        alert("Please check your internet connection or data source..");
      });
};
          $scope.closecancelgigmodel = function() {
          $state.go('app.mygigs.bid');
        };


// Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/cancelgigmodel.html', {
    scope: $scope,
    animation : 'slide-in-right'
  }).then(function(modal) {
    $scope.modal2 = modal;
  });
  // Triggered in the login modal to close it
  $scope.closecancelgigmodel = function() {
    $scope.modal2.hide();
  };
  $scope.cancelgigmodel = function(prjId,index) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }else{
        $scope.cancelgigrecord=prjId;
        $scope.cancelgigindex=index;
        console.log("$scope.cancelgigrecord");
        console.log($scope.cancelgigrecord);
     }
    $scope.modal2.show();
  };
  

 $scope.cancelgig=function(prjId,index){
  console.log("cancelgig fired");


  

   var reqdata={
      prjid: $scope.cancelgigrecord.prjId
  };
        
       console.log("this is project id ,,,,,,,,,,,,,,,,,,,");
       console.log(reqdata);
       $http.post(baseURL + 'cancelgig',reqdata).success(function(res) {
        console.log(res);
        //$scope.bidding[ $scope.cancelgigindex ].status= '5';
         

      }).error(function() {
        alert("Please check your internet connection or data source..");
      });
      //$state.go('app.mygigs.progress');
      $scope.modal2.hide();
      $state.go('app.mygigs.bid');
      //$state.go('app.listgig');
      //$state.go('app.assignment.assignbid');
    };


})

.controller('completedcontroller', function($scope,$http,$state){
       if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }

       $scope.completed= {};
  var userididid=window.localStorage.getItem('userid1');
  console.log(userididid);
  //console.log(user);
  var reqdata={
      userid:userididid
  };
  $http.post(baseURL + 'completedmygigs',reqdata).success(function(res) {
        //console.log(res);
        $scope.completed = res;
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


.controller('profilecontroller', function($scope, $http, $state, $ionicModal ,  OpenFB){
       if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }
       /* OpenFB.get('/me').success(function (user) {
                  $scope.user = user;
        }); */

        $scope.editabout=false;
        $scope.editoverview=false;

        
        var reqdata={
            userid: window.localStorage.getItem('userid1')
        };
       $http.post(baseURL + 'getuserprofiledata', reqdata).success(function(res) {
        console.log(res);
        $scope.userprofiledata = res;
        $scope.userprofile = $scope.userprofiledata.profile[0];
        $scope.userprofile.profileimage = profileUrl + $scope.userprofile.profileimage;
        console.log($scope.userprofile);
        if (res.status == 'false') {
          alert(res.message);
        } else {
          console.log("No data");
        //$scope.states=res;
          
        }
      
      }).error(function() {
        alert("Please check your internet connection or data source..");
      });

     // Create the login modal that we will use later
    $ionicModal.fromTemplateUrl('templates/editprofile.html', {
      scope: $scope
    }).then(function(modal) {
      $scope.modal = modal;
    });
    // Triggered in the login modal to close it
    $scope.closeeditprofilmodel = function() {
      $scope.modal.hide();
    };

    $scope.showeditprofilemodel = function(data) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin');
       }else{
              $scope.editprofilerecord={
                  prfId:data.prfId,
                  userId:data.userId,
                  fname:data.fname,
                  lname:data.lname,
                  username:data.username,
                  usermail:data.usermail,
                  contactno:parseInt(data.contactno),
                  tagline:data.tagline,
                  skills:data.skills,
                  city:data.city,
                  notify:data.notify,
                  showGigs:data.showGigs,                  
                  country:parseInt(data.country)

              };
              
      $scope.modal.show();
       }
  };

      $scope.saveabout=function(userprofile){
       $http.post(baseURL + 'updateabout', userprofile).success(function(res) {
             
            }).error(function() {
              alert("Please check your internet connection or data source..");
            });

      return false;
      };

      $scope.saveoverview=function(userprofile){

       $http.post(baseURL + 'updateoverview', userprofile).success(function(res) {
             
            }).error(function() {
              alert("Please check your internet connection or data source..");
            });

      return false;
      };


      $scope.saveprofile=function(isvalid,userprofile){
        
        console.log(userprofile);
        if(isvalid==true){
          $http.post(baseURL + 'saveprofile', userprofile).success(function(res) {
             
                if(res.status==true){
                  console.log(userprofile);
                $scope.userprofile.fname=userprofile.fname;
                $scope.userprofile.lname=userprofile.lname;
                $scope.userprofile.username=userprofile.username;
                $scope.userprofile.usermail=userprofile.usermail;
                $scope.userprofile.contactno=parseInt(userprofile.contactno);
                $scope.userprofile.tagline=userprofile.tagline;
                $scope.userprofile.skills=userprofile.skills;
                $scope.userprofile.city=userprofile.city;
                $scope.userprofile.country=parseInt(userprofile.country);
                $scope.userprofile.notify=userprofile.notify;
                $scope.userprofile.showGigs=userprofile.showGigs;          
                }
            }).error(function() {
              alert("Please check your internet connection or data source..");
            });
            $scope.modal.hide();
        }

      };

      $ionicModal.fromTemplateUrl('templates/changepassword.html', {
        scope: $scope
      }).then(function(modal) {
        $scope.modal1 = modal;
      });
     
    // Triggered in the change password modal to close it
      $scope.updatepassword = function( validform, editprofilerecord ) {
        console.log( validform );
        console.log( editprofilerecord );
        //$scope.modal1.hide();
      };
      $scope.closechangepassword = function() {
        $scope.modal1.hide();
      };

      // Open the login modal
      $scope.showchangepassword = function( userprofile ) {
        if( window.localStorage.getItem('islogin') != 'true' ){
            $state.go('applogin');
           }else{
              console.log( userprofile );
                  $scope.editprofilerecord={
                      userId: userprofile.userId,
                      usermail: userprofile.usermail,
                      currentpassword:'',
                      newpassword:'',
                      newpasswordverify:'',


                     
                  };
               if($scope.editprofilerecord.newpass != $scope.editprofilerecord.confirmpass)
                alert

         $scope.modal1.show();
           }      
        
      };

})

.controller('postgigCtrl', function($scope,$http,$state,$filter){
 if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
    }
  var userididid=parseInt(window.localStorage.getItem('userid1'));
  console.log(userididid);
      var date = new Date();
      console.log(date);
     var date8 = new Date();
     date8.setDate(date8.getDate() + 7);
     if((date8.getMonth()+1)<10)
      var month = '0'+(date8.getMonth()+1);
     else 
       var month = (date8.getMonth()+1); 
     if(date8.getDate()<10)
        var day = '0'+date8.getDate();
     else 
        var day = date8.getDate(); 
       var date8 = date8.getFullYear()+'-'+month+'-'+day;             
          /*time=$filter('date')(date,"h:mm:ss a");
          date=$filter('date')(date,'yyyy/M/d');*/
          //var stampo=date.now/1000;
          var stampo = Math.floor(Date.now() / 1000)+(8*60*60);

          console.log("timeStamp----------");
          console.log(stampo);
          $scope.postg={
                 expdate:date8, 
                 userid:userididid,
                 postedon:stampo,
                 date:date,
               }
               
               console.log($scope.postg);

 $scope.insertgig =function(formstatus,postg)
 {   
     
    if(formstatus==true){
      console.log("post date..............");
      console.log(postg);

       var div = document.getElementById('errmsgpostgig');
       $http.post(baseURL + 'postgig', postg).success(function(res) {
                   
                    console.log(res);
                   $scope.response = res;
                       if (res.status == false) {
          
                        } else {
                         console.log("incomplete");
                        }
                     $state.go('app.listgig');
              }).error(function() {
                     alert("Please check your internet connection or data source..");
              });
    }
 
      }
})


.controller('inboxcontroller', function($scope,$http,$state,$filter, $ionicModal){
 if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
    }
     var userididid=window.localStorage.getItem('userid1');
  console.log(userididid);
  //console.log(user);
  var reqdata={
      userid:userididid
  };
    $http.post(baseURL + 'userallmasseges',reqdata).success(function(res) {
        console.log(res);
        $scope.msgsall=res;
      
      }).error(function() {
          alert("Please check your internet connection or data source..");
      });



// Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/messages.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });
  // Triggered in the login modal to close it
  $scope.closemsgmodel = function() {
    $scope.modal.hide();
  };
  $scope.msgmodel = function(sender,reciever,projectid) {
    if( window.localStorage.getItem('islogin') != 'true' ){
        $state.go('applogin')
       }else{
                   // $scope.recordinmygawarded=data;
                  var stampo=event.timeStamp;
                  $scope.sendmsgdata={
                              projectid : projectid,
                              msgfrom : sender,
                              msgto : reciever,
                              msgon: stampo,
                              isread:'0',
                              msgtype:'d',
                              reportid:'',
                              haveattachment : '0',
                                  };
             }
     var reqdata={
      prjid : projectid,
      msgfrom : sender,
      msgto : reciever
      };

      console.log(reqdata);
       $http.post(baseURL + 'getpreviousmsgs',reqdata).success(function(res) {
        console.log(res);
        $scope.msgs=res;
        $scope.from=sender;
        $scope.to=reciever;
        $scope.sender='';
        $scope.reciever='';
        if($scope.msgs.sender!=null){
           $scope.sender=$scope.msgs.sender[0].fname+" "+$scope.msgs.sender[0].lname;
        }
        if($scope.msgs.reciever!=null){
         $scope.reciever=$scope.msgs.reciever[0].fname+" "+$scope.msgs.reciever[0].lname;
       }

      }).error(function() {
        alert("Please check your internet connection or data source..");
      });
 

    $scope.modal.show();
  };

$scope.sendmsg=function(data){
  msgcontent=data.data;
  $scope.data=data;
  console.log(msgcontent);
  if(msgcontent.length>0){
    console.log(data);
      $http.post(baseURL + 'sendmsg',data).success(function(res) {
        console.log(res);
        if(res.status==true){
          $scope.msgs.msgs.push($scope.data);
          console.log($scope.data);
        }
        

      }).error(function() {
        alert("Please check your internet connection or data source..");
      });

  }   
};

})

//inject the twitterService into the controller
.controller('TwitterController', function($scope, $q, twitterService) {

    $scope.tweets; //array of tweets
    
        twitterService.initialize();
        //using the OAuth authorization result get the latest 20 tweets from twitter for the user
        $scope.refreshTimeline = function() {
        twitterService.getLatestTweets().then(function(data) {
        $scope.tweets = data;
        });
    }

          //when the user clicks the connect twitter button, the popup authorization window opens
  $scope.connectButton = function() {
    twitterService.connectTwitter().then(function() {
          if (twitterService.isReady()) {
          //if the authorization is successful, hide the connect button and display the tweets
          $('#connectButton').fadeOut(function(){
          $('#getTimelineButton, #signOut').fadeIn();
          $scope.refreshTimeline();
        });
    }
        });
  }

    //sign out clears the OAuth cache, the user will have to reauthenticate when returning
    $scope.signOut = function() {
        twitterService.clearCache();
        $scope.tweets.length = 0;
      $('#getTimelineButton, #signOut').fadeOut(function(){
            $('#connectButton').fadeIn();
      });
    }

    //if the user is a returning user, hide the sign in button and display the tweets
    if (twitterService.isReady()) {
        $('#connectButton').hide();
        $('#getTimelineButton, #signOut').show();
        $scope.refreshTimeline();
    }

})



