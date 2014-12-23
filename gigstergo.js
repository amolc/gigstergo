var express = require('express'), path = require('path');
var app = express();

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
app.use('/mobile', express.static(__dirname + '/mobile/www'));

app.use('/mobile', express.static(__dirname + '/gigstergo/www'));


app.get('/api/assignall', assignments.assignall);
app.get('/api/getbid', assignments.getbid);
app.get('/api/listgig', assignments.listgig);
app.post('/api/loginval',assignments.loginval);

app.post('/api/postgig',assignments.postgig);
app.listen(7000);
console.log('Listening.. on port 7000...'); 
