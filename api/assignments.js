var http = require('http');
var mysql = require('mysql');
var md5 = require('MD5');
var db = mysql.createPool({
	database : 'gigster',
     user : 'gigster2',
	password : 'ferrari4321',
    host :'localhost',
 }); 

var CRUD = require('mysql-crud');
var assignmentCRUD = CRUD(db, 'btr_assignment');
var projectsCRUD = CRUD (db,'btr_projects');
var userCRUD = CRUD (db,'btr_users');
var bidCRUD = CRUD (db,'btr_bids');
var btrmsgCRUD = CRUD (db,'btr_messages');


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
  console.log(req.body);
  var userid=req.body.userid;
  //SELECT * FROM btr_bids tbl1 INNER JOIN btr_projects AS tbl2 ON tbl2.prjId=tbl1.projectId INNER JOIN btr_userprofile AS tbl3 ON tbl3.userId=tbl2.userId INNER JOIN btr_reviews AS tbl4 ON tbl4.ratefrom=tbl3.userId where tbl1.bidfrom="+userid+" and tbl1.status='3' order by tbl1.bidon DESC";
    var query = "SELECT * FROM  btr_projects AS tbl1 LEFT JOIN btr_userprofile AS tbl2 ON tbl2.userId=tbl1.userId LEFT JOIN btr_bids AS tbl3 ON tbl3.bidfrom="+userid+" and tbl3.projectId=tbl1.prjId order by postedon DESC";  
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


              console.log(vals);
      
              var resdata={
               status: false,
               message :'Ooops! Error Occured...'
               };


              res.jsonp(resdata);   



              });




             
             });

     

};

















exports.loginval = function(req, res) {
    //console.log(req.body);
    console.log( md5(req.body.password) )
    
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

projectsCRUD.create({'userId': req.body.userid,'prjTitle': req.body.title,'prjdesc':req.body.desc,'postedon':req.body.postedon, 'proposedbudget':req.body.pay,'bidfrom':req.body.date,'bidto':req.body.expdate,'jobtype':req.body.jobtype,'keywords':req.body.skill },
 function (err, vals){
    console.log(vals);
      
      var resdata={
        status:false,
        message :'err'
      };


      res.jsonp(resdata);   
    });

};


exports.progressassignments=function(req,res){
var userid=req.body.userid;
console.log(userid);
    var query = "SELECT * FROM btr_projects AS tbl1 INNER JOIN btr_assignment AS tbl2 ON tbl2.projectId=tbl1.prjId INNER JOIN btr_userprofile AS tbl3 ON tbl3.userId=tbl2.awardedto where tbl1.userId="+userid+" and tbl1.status='2' order by tbl1.postedon DESC";
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
    var query = "SELECT * FROM btr_projects AS tbl1 LEFT JOIN btr_assignment AS tbl2 ON tbl2.projectId=tbl1.prjId LEFT JOIN btr_userprofile AS tbl3 ON tbl3.userId=tbl2.awardedto LEFT JOIN btr_reviews AS tbl4 ON tbl4.ratefrom=tbl3.userId and tbl4.projectId=tbl1.prjId where tbl1.userId="+userid+" and tbl1.status='3' order by tbl1.postedon DESC";  
    db.query( query, function (err, val) {  
      console.log(query);
      console.log(err);
        console.log(val);
        res.jsonp(val);
      });    
};

exports.userallmasseges=function(req,res){
var userid=req.body.userid;
    var query = "select * from btr_messages as tbl1 LEFT JOIN btr_userprofile as tbl2 on tbl2.userId=tbl1.msgfrom where msgto="+userid+" order by msgId DESC";  
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
    var query = "SELECT * FROM btr_bids tbl1 INNER JOIN btr_projects AS tbl2 ON tbl2.prjId=tbl1.projectId and tbl2.status='2' INNER JOIN btr_userprofile AS tbl3 ON tbl3.userId=tbl2.userId where tbl1.bidfrom="+userid+"   order by tbl1.bidon DESC";
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
    
    var query = "SELECT * FROM btr_messages where projectId = "+prjid+" and  msgfrom = "+msgfrom+" and msgto= "+msgto;
    db.query( query, function (err, val) { 
      console.log(query);
      console.log(err);
        console.log(val);
        res.jsonp(val);
      });    
};