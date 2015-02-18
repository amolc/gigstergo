var nodemailer = require("nodemailer");
var smtpTransport = nodemailer.createTransport("SMTP",{
   service: "Gmail",
   auth: {
       user: "ashishhsharma1990@gmail.com",
       pass: "wastinglove"
   }
});
 exports.sendmail = function(req, res) {
	smtpTransport.sendMail({
   from: "ashishhsharma1990@gmail.com", // sender address
   to: "ankush.lomte@fountaintechies.com", // comma separated list of receivers
   subject: "Hello ✔", // Subject line
   text: "Hello world this is my challange ✔" // plaintext body
}, function(error, response){
   if(error){
       console.log(error);
   }else{
       console.log("Message sent: " + response.message);
   }
});	
};