var http = require('http');
var mysql = require('mysql');
var db = mysql.createPool({
	database : 'gigster',
     user : 'gigster2',
	password : 'ferrari4321',
    host :'localhost',
 }); 

var CRUD = require('mysql-crud');
var assignmentCRUD = CRUD(db, 'btr_assignment');
var projectsCRUD = CRUD (db,'btr_projects');
var projectsCRUD = CRUD (db,'btr_projects');
var userCRUD = CRUD (db,'btr_users');

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
    
    var query = "SELECT * FROM  btr_projects";  
    db.query( query, function (err, val) {  
        res.jsonp(val);
      });    
};

exports.signup=function(req,res){

    userCRUD.load({usermail :req.body.id }, function (err, val) {  
     
       userCRUD.create({'usermail': req.body.id,'userpass':req.body.password }, function (err, vals){
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

    var gigname=req.body.gigname;
    var password=req.body.password; 
      console.log(gigname);
      console.log(password);

    CRUD(db, 'btr_users').load({usermail :gigname,userpass : password }, function (err, val) {  
      var resdata={
        record:'',
        status:false,
        message :'err'
      };
      console.log(val)
      if(val!=null){
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

console.log(req.body.title);

projectsCRUD.create({'prjTitle': req.body.title,'prjdesc':req.body.desc,'proposedbudget':req.body.pay,'jobtype':req.body.jobtype,'skills':req.body.skill,'bidto':req.body.expdate,'bidfrom':req.body.date },
 function (err, vals){
    console.log(vals);
      
      var resdata={
        status:false,
        message :'err'
      };


      res.jsonp(resdata);   
    });

};
