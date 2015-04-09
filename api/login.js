var http = require('http');
var mysql = require('mysql');
var md5 = require('MD5');
var db = mysql.createPool({   
  database : 'gigster',
  user : 'ftdev',
  password : '10gXWOqeaf',
  host :'gigster2.fountaintechies.com'
});
var CRUD = require('mysql-crud');
var userCRUD = CRUD (db,'btr_users');
var btrdeviceCRUD=CRUD(db,'btr_notification');
exports.loginval = function(req, res) {
  var gigname=req.body.gigname;
  var password=md5(req.body.password); 
  console.log(req.body);
  CRUD(db, 'btr_users').load({usermail :gigname, userpass : password,isactive:'1' }, function (err, val) {  
      var resdata={
        record:'',
        status:false,
        message :'err'
      };
        if(val.length>0){
        resdata.record=val;
        resdata.status=true;
        console.log("login");
        resdata.message='successfully login welcom to ..';     
        //Device information 
        var platform = req.body.platform ; 
        var device = req.body.device;
        var token_id = req.body.token_id;
        var userid = val[0].userId;
        btrdeviceCRUD.create({ 'userid' : userid , 'platform' : platform , 'token_id' : token_id , 'device' : device },   
          function (err, val){
          console.log(err);
          console.log(val);
          if(parseInt(val.affectedRows)>0){
          resdata.status=true;
          resdata.message='data successfully added'; 
          res.jsonp(resdata);
          }else{
          resdata.status=false;
          resdata.message='record not added ';
          res.jsonp(resdata);
          }
          });
      }else{
        resdata.status=false;
        resdata.message='Wrong user name or password Or Verify your account';
        res.jsonp(resdata);
      }
              
    }); 
 }; 


exports.logOut = function(req, res) {
  // do logOut and delete device entry from notofication llist 
  var device = req.body.device; 
  console.log( 'Device='+device)
  btrdeviceCRUD.destroy({'device' : device },function (err, vals) { console.log( 'Del Erro='+err ) });
  var resdata ={
    status :true
  } 
  resdata.message='Delete';
  res.jsonp(resdata);      
};