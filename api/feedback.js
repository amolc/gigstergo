/*var http = require('http');

exports.loginval = function(req, res) {

  var handleFeedback = function(feedbackData) {
    feedbackData.forEach(function(feedbackItem) {
      console.log("Device: " + feedbackItem.device.toString("hex") + " has been unreachable, since: " + feedbackItem.time);
    });
  }

  var apn = require('apn');
  var note = new apn.Notification();

  var feedback = new apn.feedback({ production: false, interval: 10 });
  feedback.on("feedback", handleFeedback);
  feedback.on("feedbackError", console.error);

  resdata.status=false;
  resdata.message='Wrong user name or password Or Verify your account';
  res.jsonp(resdata);

 }; 

*/



  var messagetitle= 'msg title';
  var message='msg description';
  
    // ios notification settings 
    var apn = require('apn');
    var note = new apn.Notification();
    note.expiry = Math.floor(Date.now() / 1000) + 3600;
    note.badge = Number(1) || 0 ;
    note.sound = "";
    note.alert = { "body" : messagetitle +' '+message, "action-loc-key" : "Play" , "launch-image" : "mysplash.png"};
    note.payload = {'messageFrom': 'admin'};
 
     
    var callback = function(errorNum, notification){
      console.log('Error is: %s', errorNum);
      console.log("Note " );
      //console.log( notification );
    };
    var iosOptions = {
      production : false,
      gateway: 'gateway.sandbox.push.apple.com', // this URL is different for Apple's Production Servers and changes when you go to production
      errorCallback: callback,
      cert: '/var/www/gigstergo/assets/gigstergo.Cert.pem',                 
      key:  '/var/www/gigstergo/assets/gigstergo.Key.pem',                 
      passphrase: 'ferrari1234',                 
      port: 2195,                       
      enhanced: true,                   
      cacheLength: 100                  
    };
    var apnsConnection = new apn.Connection(iosOptions);
    apnsConnection.on('error', function(error) { console.log("error",error);},true);
    apnsConnection.on('connected', function(connected) { console.log("connected",connected); });
    apnsConnection.on('transmitted', function(transmitted) { console.log("transmitted",transmitted); });
    apnsConnection.on('disconnected', function() { console.log("disconnected");});
    apnsConnection.pushNotification( note, 'ce1c081e03ad5c16aa400756f274e753ec0b52b0d32ab6e10de5962f2d0393c6' );

   

