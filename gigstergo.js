var express = require('express'), path = require('path');
var app = express();
var md5 = require('MD5');
var querystring = require('querystring');
var request = require('request');


//var ipn = require('paypal-ipn');

var bodyParser = require('body-parser');




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

assignments = require('./api/assignments.js');
sendmail=require('./api/sendmail.js');

app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
 });  
app.use(express.static(path.join(__dirname, 'public')));
app.use('/mobile', express.static(__dirname + '/mobile/www'));



app.get('/api/assignall', assignments.assignall);
app.get('/api/getbid', assignments.getbid);
app.get('/api/listgig', assignments.listgig);
//app.get('/api/app', assignments.app);
app.get('/api/send', sendmail.sendmail);
app.post('/api/sendmail', sendmail.sendmail);
app.post('/api/loginval',assignments.loginval);
app.post('/api/progressassignments',assignments.progressassignments);
app.post('/api/postgig',assignments.postgig);
app.post('/api/loginfb',assignments.loginfb);
app.post('/api/signup',assignments.signup);
app.post('/api/biddingmygigs',assignments.biddingmygigs);
app.post('/api/completedmygigs',assignments.completedmygigs);
app.post('/api/userallmasseges',assignments.userallmasseges);
app.post('/api/bidsawarded',assignments.bidsawarded);
app.post('/api/bidsbidding',assignments.bidsbidding);
app.post('/api/bidscompleted',assignments.bidscompleted);
app.post('/api/bidongig',assignments.bidongig);
app.post('/api/biddingdetails',assignments.biddingdetails);
app.post('/api/cancelgig',assignments.cancelgig);
app.post('/api/getpreviousmsgs',assignments.getpreviousmsgs);
app.post('/api/awardgig',assignments.awardgig);
app.post('/api/sendmsg',assignments.sendmsg);							
app.post('/api/sendreport',assignments.sendreport);
app.post('/api/sendfeedback',assignments.sendfeedback);
app.post('/api/getuserprofiledata',assignments.getuserprofiledata);
app.post('/api/updateoverview',assignments.updateoverview);
app.post('/api/updateabout',assignments.updateabout);
app.post('/api/saveprofile',assignments.saveprofile);
app.post('/api/sendfeedbackfrmbidder',assignments.sendfeedbackfrmbidder);




app.listen(7000);
console.log('Listening.. on port 7000...'); 
