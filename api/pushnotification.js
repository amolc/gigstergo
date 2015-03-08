exports.notification = function(req, res) {
  var messagetitle=req.body.messagetitle;
  var message=req.body.message;
  var userid = parseInt( req.body.userid );
  console.log('userid= '+userid);

    var mysql = require('mysql');
    var db = mysql.createPool({   
    database : 'gigster',
    user : 'gigstermobile',
    password : '10gXWOqeaf',
    host :'gigster2.fountaintechies.com'

   });
    // android notifications
    var gcm = require('node-gcm');
    var anDmessage = new gcm.Message();
    anDmessage.addData('message',message);
    anDmessage.addData('title', messagetitle );
    anDmessage.addData('msgcnt','3'); // Shows up in the notification in the status bar
    anDmessage.addData('soundname','beep.wav'); 
    anDmessage.timeToLive = 3000;

    var sender = new gcm.Sender('AIzaSyD0v3bd7l2Pl2w-rx3HnuDJUBT_Yi8bIFw');
    var registrationIds = [];


    var totalrows={};
    var CRUD = require('mysql-crud');
    var notifCrud=CRUD(db, 'btr_notification');
     
     notifCrud.load({'userid': userid}, function (err, val) {       
        totalrows=val;  
        
      for(i=0;i<totalrows.length;i++){
        console.log('----------------------' + totalrows[i].token_id + '---------------------------');
        if( totalrows[i].platform == 'android' || totalrows[i].platform == 'Android' ){
          var currenttoken_id = totalrows[i].token_id;
          if( typeof currenttoken_id != undefined ){
            console.log( 'currenttoken_id ='+currenttoken_id );    
            registrationIds.push( totalrows[i].token_id );            
          }
          
        }

      } 

      console.log( '---------------------------------------android-----------------------------' );  
        console.log( registrationIds );  
          // android bulk sending
          sender.sendNoRetry(anDmessage, registrationIds, function(err, result) {
              console.log( result );
              console.log( err );
          });
          

      var resdata={
        status:true
      };

      res.jsonp(resdata);       
    });     
};




