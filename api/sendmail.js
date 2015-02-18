var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: "ankush.nek@gmail.com",
       pass: "ankush2neknoor"
   }
});
 exports.sendmail = function(req, res) {
	smtpTransport.sendMail({
   from: "ankush.nek@gmail.com", // sender address
   to: "ankush.lomte@fountaintechies.com", // comma separated list of receivers
   subject: "Hello ..........", // Subject line
   text: "Hello world this is my first mail" // plaintext body
}, function(error, response){
   if(error){
       console.log(error);
   }else{
       console.log("------------------------Message sent:  " + response.message);
   }
});	
};