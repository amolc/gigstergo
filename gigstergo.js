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


app.all('*', function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type");
  next();
 });  
app.use(express.static(path.join(__dirname, 'public')));
app.use('/mobile', express.static(__dirname + '/gigsterm/www'));



app.get('/api/assignall', assignments.assignall);
app.get('/api/getbid', assignments.getbid);
app.post('/api/listgig', assignments.listgig);
app.post('/api/loginval',assignments.loginval);
app.post('/api/progressassignments',assignments.progressassignments);
app.post('/api/postgig',assignments.postgig);
app.post('/api/signup',assignments.signup);
app.post('/api/biddingmygigs',assignments.biddingmygigs);
app.post('/api/completedmygigs',assignments.completedmygigs);
app.post('/api/userallmasseges',assignments.userallmasseges);
app.post('/api/bidsawarded',assignments.bidsawarded);
app.post('/api/bidsbidding',assignments.bidsbidding);
app.post('/api/bidscompleted',assignments.bidscompleted);
app.post('/api/bidongig',assignments.bidongig);
app.post('/api/biddingdetails',assignments.biddingdetails);





app.listen(7000);
console.log('Listening.. on port 7000...'); 
