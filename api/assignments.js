var http = require('http');
var mysql = require('mysql');
var md5 = require('MD5');
var db = mysql.createPool({
  database : 'gigster',
     user : 'gigstermobile',
  password : '10gXWOqeaf',
    host :'gigster2.fountaintechies.com'
     }); 
// 14 feb
var CRUD = require('mysql-crud');
var assignmentCRUD = CRUD(db, 'btr_assignment');
var projectsCRUD = CRUD (db,'btr_projects');
var userCRUD = CRUD (db,'btr_users');
var bidCRUD = CRUD (db,'btr_bids');
var btrmsgCRUD = CRUD (db,'btr_messages');
var btrreportsCRUD=CRUD(db,'btr_reports');
var btrreviewsCRUD=CRUD(db,'btr_reviews');
var btrprofileCRUD=CRUD(db,'btr_userprofile');


exports.assignall = function(req, res) {
    
    var query = "SELECT * FROM btr_assignment";  
    db.query( query, function (err, val) {  
        res.jsonp(val);
      });    
};



exports.getbid = function(req, res) {
    
    var query = "SELECT * FROM btr_bids";  
    db.query( query, function (err, val) {  
        res.jsonp(val);
      });    
};

exports.listgig = function(req, res) {
 
  var userid = parseInt( req.body.userid );
  //SELECT * FROM btr_bids tbl1 INNER JOIN btr_projects AS tbl2 ON tbl2.prjId=tbl1.projectId INNER JOIN btr_userprofile AS tbl3 ON tbl3.userId=tbl2.userId INNER JOIN btr_reviews AS tbl4 ON tbl4.ratefrom=tbl3.userId where tbl1.bidfrom="+userid+" and tbl1.status='3' order by tbl1.bidon DESC";
    //var query = "SELECT tbl1.*,tbl2.fname, tbl2.lname,tbl2.city FROM  btr_projects AS tbl1 LEFT OUTER join btr_userprofile AS tbl2 ON tbl2.userId=tbl1.userId order by postedon DESC LIMIT 10";  
    /* var query ="SELECT tbl1.*,tbl2.fname, tbl2.lname,tbl2.city , tbl3.profileimage FROM btr_projects AS tbl1 LEFT OUTER join btr_userprofile AS tbl2 ON tbl2.userId=tbl1.userId LEFT OUTER join btr_users AS tbl3 ON tbl3.userId=tbl1.userId order by postedon DESC LIMIT 10";*/
    var query =  SELECT tbl1.*,tbl2.fname, tbl2.lname,tbl2.city , tbl3.profileimage,tbl4.* FROM btr_projects AS tbl1 LEFT OUTER join btr_userprofile AS tbl2 ON tbl2.userId=tbl1.userId LEFT OUTER join btr_users AS tbl3 ON tbl3.userId=tbl1.userId LEFT OUTER join btr_bids AS tbl4 ON tbl1.userId=tbl4.bidfrom order by postedon DESC LIMIT 100
    //var query1="SELECT tbl3.profileimage FROM btr_projects AS tbl1 LEFT OUTER join btr_users AS tbl3 ON tbl3.userId=tbl1.userId order by postedon DESC LIMIT 10";
   //var query = "SELECT tbl1.*,tbl2.fname, tbl2.lname,tbl2.city,tbl3.* FROM  btr_projects AS tbl1 LEFT OUTER join btr_userprofile AS tbl2 ON tbl2.userId=tbl1.userId LEFT OUTER JOIN btr_bids AS tbl3 ON tbl3.bidfrom=22 and tbl3.projectId=tbl1.prjId order by postedon DESC";  
//   var query = "SELECT tbl1.*,tbl2.fname, tbl2.lname,tbl2.city,tbl3.*,tbl4.profileimage,tbl4.username FROM btr_projects AS tbl1 LEFT OUTER join btr_users AS tbl4 ON tbl4.userId=tbl1.userId LEFT OUTER join btr_userprofile AS tbl2 ON tbl2.userId=tbl1.userId LEFT OUTER JOIN btr_bids AS tbl3 ON tbl3.bidfrom=22 and tbl3.projectId=tbl1.prjId order by postedon DESC LIMIT 10";  

    console.log(query);
    db.query( query, function (err, val) {  
            
        res.jsonp(val);

      });
      
};



exports.signup=function(req,res){

    var password=md5(req.body.password); 
    console.log(req.body);
    console.log(password);
    var resdata={};

   userCRUD.load({usermail :req.body.gigid }, function (err, val) {  
     if(val.length>0){
             resdata={
               status: false,
               message :'Ooops! User Already Exists..'
               };
                res.jsonp(resdata);

        }else{
                userCRUD.create({'usermail': req.body.gigid, 'userpass':password, 'username':req.body.username , 'profileimage':req.body.profileimage }, function (err, vals){
                console.log(vals);
                  if(parseInt(vals.affectedRows)>0){
                      resdata={
                                    status: true,
                                    message :'Yipeeee! Registered successfully!!!!'
                              };
                              res.jsonp(resdata);

                }else{
                resdata={
                   status: false,
                   message :'Ooops! Error Occured...'
                 };
                 res.jsonp(resdata);

                }
              
              });

        }

    
    
   
  });


};




exports.bidongig=function(req,res){
  
  console.log(req.body);
      bidCRUD.create({'bidfrom': req.body.currentuser,'bidon':req.body.bidon, 'projectId':req.body.record.prjId,'bidcontent':req.body.proposal,'bidprice':req.body.price}, function (err, vals){
           
            console.log(err);

            var mailmatter="<p>Hello "+req.body.record.fname+" "+req.body.record.lname+" </p><p>You have received a new bid on your Gig <a href='#'></a> from </p><p></p><p><a href='#'>Click here to see more details and award this Gig.</a></p>";
                       

              btrmsgCRUD.create({'msgfrom':req.body.currentuser,'msgto':req.body.record.userId, 'msgcontent':mailmatter,'msgon':req.body.bidon,'projectId':req.body.record.prjId,'isread':'0','msgtype':'r'}, function (err, vals){

              console.log("vals");
              console.log(vals);
      
              var resdata={
               status: false,
               message :'Ooops! Error Occured...sefksdck'
               };


              res.jsonp(resdata);   



              });




             
             });

     

};



exports.loginval = function(req, res) {
    //console.log(req.body);
    console.log( md5(req.body.password) );
    
    var gigname=req.body.gigname;
    var password=md5(req.body.password); 
      console.log(gigname);
      console.log(password);

    CRUD(db, 'btr_users').load({usermail :gigname, userpass : password }, function (err, val) {  
      var resdata={
        record:'',
        status:false,
        message :'err'
      };
      console.log(val)
      if(val.length>0){
        resdata.record=val;
        resdata.status=true;
        console.log("login");
        resdata.message='successfully login welcom to ..';      
      }else{
        resdata.status=false;
        resdata.message='Wrong user name or password';
      }
        
      res.jsonp(resdata);
    }); 
 }; 


exports.postgig= function (req,res){

console.log(req.body);

projectsCRUD.create({'userId': req.body.userid,'prjTitle': req.body.title,'prjdesc':req.body.desc,'postedon':req.body.postedon, 'proposedbudget':req.body.pay,'bidfrom':req.body.date,'bidto':req.body.expdate,'jobtype':req.body.jobtype,'keywords':req.body.skill,'gigLocation':req.body.gigLocation },
 function (err, vals){
    console.log(vals);
      if(parseInt(vals.affectedRows)>0){
         var resdata={
        status:true,
        message :'data added successfully!!!!'
        };
      }else{
        var resdata={
        status:false,
        message :'error occured!!!!'
        };
      }
     


      res.jsonp(resdata);   
    });

};

//for FB profile save start
exports.loginfb= function (req,res){
    console.log('facebook login---------------------------------------------------');
    console.log( req.body);
    var resdata={};
    userCRUD.load({usermail :req.body.email}, function (err, val) {     
        if(val.length>0) {

            resdata={
               status: false,
               message :'Ooops! User Already Exists..'

               };
        console.log(val)
        if(val.length>0){
        resdata.record=val;
        resdata.status=true;
        console.log("login");
        resdata.message='successfully login welcom to ..';      
      }else{
        resdata.status=false;
        resdata.message='Wrong user name or password';
      }
                res.jsonp(resdata);
                console.log('Ooops! User Already Exists..');

        }else{
        
                userCRUD.create({'usermail': req.body.email, 'username':req.body.name , 'fbId':req.body.id }, function (err, vals){
                  console.log(vals);
                  if(parseInt(vals.affectedRows)>0){
                      resdata={
                                    status: true,
                                    message :'Yipeeee! on FB Registered successfully!!!!'
                              };
                              res.jsonp(resdata);

                }else{
                resdata={
                   status: false,
                   message :'Ooops! Error Occured...'
                 };
                 res.jsonp(resdata);

                }
              
              });
              }

  });

};
//for FB profile save end


exports.progressassignments=function(req,res){
var userid=req.body.userid;
console.log(userid);
    var query = "SELECT * FROM btr_projects AS tbl1 LEFT JOIN btr_assignment AS tbl2 ON tbl2.projectId=tbl1.prjId LEFT JOIN btr_userprofile AS tbl3 ON tbl3.userId=tbl2.awardedto LEFT JOIN btr_reports AS tbl4 on tbl4.projectId=tbl1.prjId where tbl1.userId="+userid+" and tbl1.status='2' order by tbl1.postedon DESC";
    //SELECT * FROM btr_projects AS tbl1 INNER JOIN btr_assignment AS tbl2 ON tbl2.projectId=tbl1.prjId INNER JOIN btr_userprofile AS tbl3 ON tbl3.userId=tbl2.awardedto where tbl1.userId=6 and tbl1.status='2' order by tbl1.postedon DESC";  

    db.query( query, function (err, val) {  
      console.log(err);
        console.log(val);
        res.jsonp(val);
      });    
};

exports.biddingmygigs=function(req,res){
var userid=req.body.userid;
    var query = "SELECT * FROM btr_projects AS tbl1 LEFT JOIN btr_bids AS tbl2 ON tbl2.projectId=tbl1.prjId LEFT JOIN btr_userprofile AS tbl3 ON tbl3.userId=tbl2.bidfrom where tbl1.userId="+userid+" and tbl1.status='0' or tbl1.status='1' order by tbl1.postedon DESC";  
    db.query( query, function (err, val) {  
      console.log(query);
      console.log(err);
        console.log(val);
        res.jsonp(val);
      });    
};


exports.completedmygigs=function(req,res){
var userid=req.body.userid;
    var query = "SELECT * FROM btr_projects AS tbl1 LEFT JOIN btr_assignment AS tbl2 ON tbl2.projectId=tbl1.prjId LEFT JOIN btr_userprofile AS tbl3 ON tbl3.userId=tbl2.awardedto where tbl1.userId="+userid+" and tbl1.status='3' order by tbl1.postedon DESC";  
    db.query( query, function (err, val) {  
      console.log(query);
      console.log(err);
        console.log(val);
        res.jsonp(val);
      });    
};

exports.userallmasseges=function(req,res){
var userid=req.body.userid;
    var query = "select tbl2.fname, tbl2.lname, tbl1.* from btr_messages as tbl1 LEFT JOIN btr_userprofile as tbl2 on tbl2.userId=tbl1.msgfrom where msgto="+userid+" order by msgId DESC";  
    db.query( query, function (err, val) {  
      console.log(query);
      console.log(err);
        console.log(val);
        res.jsonp(val);
      });    
};

exports.bidsawarded=function(req,res){
var userid=req.body.userid;
console.log(userid);
    var query = "SELECT * FROM btr_bids tbl1 INNER JOIN btr_projects AS tbl2 ON tbl2.prjId=tbl1.projectId and tbl2.status='2' INNER JOIN btr_userprofile AS tbl3 ON tbl3.userId=tbl2.userId LEFT JOIN btr_reports AS tbl4 on tbl4.projectId=tbl2.prjId where tbl1.bidfrom="+userid+"   order by tbl1.bidon DESC";
    db.query( query, function (err, val) {  
      console.log(query);
      console.log(err);
        console.log(val);
        res.jsonp(val);
      });    
};


exports.bidsbidding=function(req,res){
var userid=req.body.userid;
    var query = "SELECT * FROM btr_bids tbl1 INNER JOIN btr_projects AS tbl2 ON tbl2.prjId=tbl1.projectId and tbl2.status='0' or tbl2.status='1' INNER JOIN btr_userprofile AS tbl3 ON tbl3.userId=tbl2.userId where tbl1.bidfrom="+userid+" order by tbl1.bidon DESC";
    db.query( query, function (err, val) {  
      console.log(query);
      console.log(err);
        console.log(val);
        res.jsonp(val);
      });    
};

exports.assignbidscompleted=function(req,res){
var userid=req.body.userid;
    var query = "SELECT * FROM btr_bids tbl1 INNER JOIN btr_projects AS tbl2 ON tbl2.prjId=tbl1.projectId INNER JOIN btr_userprofile AS tbl3 ON tbl3.userId=tbl2.userId where tbl1.bidfrom="+userid+" and tbl1.status='3' order by tbl1.bidon DESC";
    db.query( query, function (err, val) {  
      console.log(query);
      console.log(err);
        console.log(val);
        res.jsonp(val);
      });    
};

exports.bidscompleted=function(req,res){
var userid=req.body.userid;
    var query = "SELECT * FROM btr_bids tbl1 INNER JOIN btr_projects AS tbl2 ON tbl2.prjId=tbl1.projectId INNER JOIN btr_userprofile AS tbl3 ON tbl3.userId=tbl2.userId INNER JOIN btr_reviews AS tbl4 ON tbl4.ratefrom=tbl3.userId where tbl1.bidfrom="+userid+" and tbl1.status='3' order by tbl1.bidon DESC";
    db.query( query, function (err, val) {  
      console.log(query);
      console.log(err);
        console.log(val);
        res.jsonp(val);
      });    
};

exports.biddingdetails=function(req,res){
var prjid=req.body.prjid;
    var query = "SELECT * FROM btr_bids AS tbl1 LEFT JOIN btr_userprofile AS tbl2 ON tbl2.userId=tbl1.bidfrom where tbl1.projectId="+prjid;
  
    db.query( query, function (err, val) { 
      console.log(query);
      console.log(err);
        console.log(val);
        res.jsonp(val);
      });    
};

exports.cancelgig=function(req,res){
var prjid=req.body.prjid;
    var query = "UPDATE btr_projects SET status ='5' WHERE prjId ="+prjid;  
      db.query( query, function (err, rows ) { 
       // var rrr = rows;
        res.jsonp(rows);
      });    
};


exports.getpreviousmsgs=function(req,res){
var prjid=req.body.prjid;
var msgfrom=req.body.msgfrom;
var msgto=req.body.msgto;
   
    var query = "SELECT * FROM btr_userprofile where userId="+msgfrom;
    db.query( query, function (err1, val1) { 
          var query = "SELECT * FROM btr_userprofile where userId="+msgto;
          db.query( query, function (err2, val2) { 
                var query = "SELECT * FROM btr_messages where projectId = "+prjid+" and ( (msgfrom = "+msgto+" and msgto= "+msgfrom+")  or (msgfrom= "+msgfrom+" and msgto = "+msgto+") ) order by msgon ASC";
                db.query( query, function (err3, val3) { 
                   
                      var msgall={
                        sender: val1,
                        reciever: val2,
                        msgs: val3
                      };

                      res.jsonp(msgall);  
                  });  
               
              });  
         });  

    

};

exports.awardgig=function(req,res){
  console.log(req.body);

  assignmentCRUD.create({'projectId': req.body.projectId, 'awardedto': req.body.awardedto, 'assignedon': req.body.assignedon, 'startdate': req.body.startdate, 'rating': req.body.rating, 'termsaccepted': req.body.termsaccepted, 'projectowner': req.body.projectowner, 'status': req.body.status, 'isread': req.body.isread, 'completiondate': req.body.completiondate, 'amount': req.body.amount }, function (err, vals){ 
                console.log(vals);
                  if(parseInt(vals.affectedRows)>0){
                       var query = "UPDATE btr_projects SET status ='2' WHERE prjId ="+req.body.projectId;  
                       db.query( query, function (err, rows ) { 
                         // var rrr = rows;
                         res.jsonp(rows);
                      });    

                }else{
                resdata={
                   status: false,
                   message :'Ooops! Error Occured...'
                 };
                 res.jsonp(resdata);

                }
              
              });

};

exports.sendmsg=function(req,res){
  console.log(req.body);

  btrmsgCRUD.create({'msgfrom': req.body.msgfrom, 'msgto': req.body.msgto, 'msgcontent': req.body.data, 'haveattachment': req.body.haveattachment, 'msgon': req.body.msgon, 'projectId': req.body.projectid, 'isread': req.body.isread, 'msgtype': req.body.msgtype, 'reportid': req.body.reportid }, function (err, vals){ 
                console.log(vals);
                  if(parseInt(vals.affectedRows)>0){
                          resdata={
                   status: true,
                   message :'msg sent successfully!!!!'
                 };
                 res.jsonp(resdata);

                }else{
                resdata={
                   status: false,
                   message :'Ooops! Error Occured...'
                 };
                 res.jsonp(resdata);

                }
              
              });

};

exports.sendreport=function(req,res){
console.log(req.body);
var reportid=req.body.rpId;
console.log(reportid);
      if(parseInt(reportid)>0){

         btrreportsCRUD.update({'projectId' :req.body.projectId},{'rpdate' :req.body.rpdate,'description':req.body.description,'completion':req.body.completion }, function (err, val) {   
            if(parseInt(val.affectedRows)>0){
                var resdata={
                  status:true,
                  massage:'updated  successfuly'
                   };
                  }else{
                    var resdata={
                  status:false,
                  massage:'not updated'
                   };
                    
                  }
                res.jsonp(resdata);
            });   



      }else{


            btrreportsCRUD.create({'rpdate':req.body.rpdate, 'projectId':req.body.projectId, 'reportto':req.body.reportto, 'reportfrom':req.body.reportfrom, 'description':req.body.description, 'isapproved':req.body.isapproved, 'completion':req.body.completion }, function (err,vals){

             console.log(vals);
                  if(parseInt(vals.affectedRows)>0){
                          resdata={
                   status: true,
                   message :'report sent successfully!!!!'
                 };
                 res.jsonp(resdata);

                }else{
                resdata={
                   status: false,
                   message :'Ooops! Error Occured...'
                 };
                 res.jsonp(resdata);

                }
            });

      }


     
};




exports.sendfeedback=function(req,res){
  console.log(req.body);

  btrreviewsCRUD.create({'ratefrom': req.body.ratefrom, 'rateto': req.body.rateto, 'projectId': req.body.projectId, 'feedback': req.body.feedback, 'rating': req.body.rating, 'ratedon': req.body.ratedon }, function (err, vals){ 
                console.log(vals);
                  if(parseInt(vals.affectedRows)>0){

                          projectsCRUD.update({'prjId' :req.body.projectId},{'status' :'3'}, function (err, val) {   
                                  if(parseInt(val.affectedRows)>0){
                                      var resdata={
                                        status:true,
                                        massage:'feedback sent successfully!!!'
                                         };
                                        }else{
                                          var resdata={
                                        status:false,
                                        massage:'error!!!'
                                         };
                                          
                                        }
                                      res.jsonp(resdata);
                                  });   



                  

                }else{
                      resdata={
                         status: false,
                         message :'Ooops! Error Occured...'
                       };
                 res.jsonp(resdata);

                }
              
              });

};




exports.sendfeedbackfrmbidder=function(req,res){
  console.log(req.body);

  btrreviewsCRUD.create({'ratefrom': req.body.ratefrom, 'rateto': req.body.rateto, 'projectId': req.body.projectId, 'feedback': req.body.feedback, 'rating': req.body.rating, 'ratedon': req.body.ratedon }, function (err, vals){ 
                console.log(vals);
                  if(parseInt(vals.affectedRows)>0){

                                  if(parseInt(val.affectedRows)>0){
                                      var resdata={
                                        status:true,
                                        massage:'feedback sent successfully!!!'
                                         };
                                        }else{
                                          var resdata={
                                        status:false,
                                        massage:'error!!!'
                                         };
                                          
                                        }
                                      res.jsonp(resdata);
                          


                  

                }else{
                      resdata={
                         status: false,
                         message :'Ooops! Error Occured...'
                       };
                 res.jsonp(resdata);

                }
              
              });

};


exports.getuserprofiledata=function(req,res){
  console.log(req.body);
  userid=req.body.userid;
     var query1 = "SELECT tbl2.*,tbl1.*,tbl3.* FROM btr_userprofile as tbl2 LEft join btr_countries as tbl3 on tbl3.id = tbl2.country Right join btr_users as tbl1 on tbl2.userId=tbl1.userId where tbl1.userId="+userid;
        db.query( query1, function (err, val1) { 
          console.log(query1);
          console.log(err);
            //console.log(val1);
               var query2 = "SELECT prjId,prjTitle,proposedbudget FROM btr_projects where userId="+userid+" LIMIT 3";
                db.query( query2, function (err, val2) { 
                  console.log(query2);
                  console.log(err);
                    //console.log(val2);
                             var query3 = "SELECT * FROM btr_countries";
                                        db.query( query3, function (err, val3) { 
                                          console.log(query3);
                                          console.log(err);
                                        //    console.log(val3);
                                            var responce={
                                              profile:val1,
                                              prjs:val2,
                                              countries:val3
                                            }

                                             res.jsonp(responce);

                                          }); 

                  }); 
          });    
 };


 exports.updateabout=function(req,res){
  console.log(req.body);

   if(req.body.prfId>0){
           btrprofileCRUD.update({'prfId' :req.body.prfId},{'aboutus' :req.body.aboutus}, function (err, val) {   
            if(parseInt(val.affectedRows)>0){
                var resdata={
                  status:true,
                  massage:'updated  successfuly'
                   };
                  }else{
                    var resdata={
                  status:false,
                  massage:'not updated'
                   };
                    
                  }
                res.jsonp(resdata);
            }); 

}else{

         btrprofileCRUD.create({'aboutus' :req.body.aboutus}, function (err, val) {   
            if(parseInt(val.affectedRows)>0){
                var resdata={
                  status:true,
                  massage:'updated  successfuly'
                   };
                  }else{
                    var resdata={
                  status:false,
                  massage:'not updated'
                   };
                    
                  }
                res.jsonp(resdata);
            }); 


}
        
 };

 exports.updateoverview=function(req,res){
  console.log(req.body);
   if(req.body.prfId>0){

        btrprofileCRUD.update({'prfId' :req.body.prfId},{'overview' :req.body.overview}, function (err, val) {   
            if(parseInt(val.affectedRows)>0){
                var resdata={
                  status:true,
                  massage:'updated  successfuly'
                   };
                  }else{
                    var resdata={
                  status:false,
                  massage:'not updated'
                   };
                    
                  }
                res.jsonp(resdata);
            }); 


}else{


btrprofileCRUD.create({'overview' :req.body.overview}, function (err, val) {   
            if(parseInt(val.affectedRows)>0){
                var resdata={
                  status:true,
                  massage:'updated  successfuly'
                   };
                  }else{
                    var resdata={
                  status:false,
                  massage:'not updated'
                   };
                    
                  }
                res.jsonp(resdata);
            });
     
}
        
 };


 exports.saveprofile=function(req,res){
  console.log(req.body);
        if(req.body.prfId>0){

              if(req.body.notify==true)
                req.body.notify = '1';
              else
                req.body.notify = '0';
               if(req.body.showGigs==true)
                req.body.showGigs = '1';
              else
                req.body.showGigs = '0';
              console.log("Hiiiiiiiiiiiiii gggg "+req.body.showGigs );

               btrprofileCRUD.update({'prfId' :req.body.prfId},{'fname' :req.body.fname, 'lname' :req.body.lname, 'contactno' :req.body.contactno, 'tagline' :req.body.tagline, 'skills' :req.body.skills, 'city' :req.body.city, 'country' :req.body.country }, function (err, val) {   
              userCRUD.update({'userId' :req.body.userId},{'username' :req.body.username, 'usermail' :req.body.usermail,'notify' :req.body.notify, 'showGigs' :req.body.showGigs }, function (err, val2) {               
                          if(parseInt(val.affectedRows)>0){
                              var resdata={
                                status:true,
                                massage:'updated  successfuly'
                                 };
                                }else{
                                  var resdata={
                                status:false,
                                massage:'not updated'
                                 };
                                  
                                }
                                console.log(val2)
                                if(parseInt(val2.affectedRows)>0){
                              var resdata2={
                                status:true,
                                massage:'updated  successfuly val2'
                                 };
                                }else{
                                  var resdata2={
                                status:false,
                                massage:'not updated val2'
                                 };
                                  
                                }
                               
                              res.jsonp(resdata2);




                }); 


            }); 

        }else{

           if(req.body.notify==true)
                req.body.notify = '1';
              else
                req.body.notify = '0';
            if(req.body.showGigs==true)
                req.body.showGigs = '1';
              else
                req.body.showGigs = '0';
              console.log("Hiiiiiiiiiiiiii bbbbb "+req.body.notify);

           btrprofileCRUD.create({'fname' :req.body.fname, 'lname' :req.body.lname, 'contactno' :req.body.contactno, 'tagline' :req.body.tagline, 'skills' :req.body.skills, 'city' :req.body.city, 'country' :req.body.country }, function (err, val) {   
              userCRUD.update({'userId' :req.body.userId},{'username' :req.body.username, 'usermail' :req.body.usermail, 'notify' :req.body.notify, 'showGigs' :req.body.showGigs }, function (err, val2) {   
            


                          if(parseInt(val.affectedRows)>0){
                              var resdata={
                                status:true,
                                massage:'updated  successfuly'
                                 };
                                }else{
                                  var resdata={
                                status:false,
                                massage:'not updated'
                                 };
                                  
                                }
                              res.jsonp(resdata);


                }); 


            }); 
        }
        
 };