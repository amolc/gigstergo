var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({   
  database : 'gigster',
  user : 'gigstermobile',
  password : '10gXWOqeaf',
  host :'gigster2.fountaintechies.com'
});
var CRUD = require('mysql-crud');
var notifCrud=CRUD(db,'btr_notification');
exports.notification = function(req, res) {
  console.log(req.body);
  var messagetitle=req.body.record.prjTitle;
  var message=req.body.record.prjdesc;
  var userid = req.body.record.userId;  
  //android notifications
  var gcm = require('node-gcm');
  var anDmessage = new gcm.Message();
  anDmessage.addData('message',message);
  anDmessage.addData('title', messagetitle );
  anDmessage.addData('msgcnt','3'); // Shows up in the notification in the status bar
  anDmessage.addData('soundname','beep.wav'); 
  anDmessage.timeToLive = 3000;
  var sender = new gcm.Sender('AIzaSyB7Qt1rwhf8jdwsmMP_SruxsqZDoM_Envs');
  var registrationIds = [];
  var totalrows={};
  // function for load token_id 
  notifCrud.load({'userid': userid}, function (err, totalrows) {       
    for(i=0;i<totalrows.length;i++){
      console.log('-------' + totalrows[i].token_id + '------');
      if( totalrows[i].platform == 'android' || totalrows[i].platform == 'Android' ){
        var currenttoken_id = totalrows[i].token_id;
        if( typeof currenttoken_id != undefined ){  
          console.log( 'currenttoken_id ='+currenttoken_id );    
          registrationIds.push( totalrows[i].token_id );            
        }
      }
    } 
  console.log('--android--');  
  console.log(registrationIds);  
  // android bulk sending
  sender.sendNoRetry(anDmessage, registrationIds, function(err, result) {
    console.log("the result is");
    console.log( result );
    console.log( err );
  });
  var resdatadata={
        status:true,
  };
    res.jsonp(resdatadata); 
});   


};