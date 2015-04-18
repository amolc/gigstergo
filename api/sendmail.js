var nodemailer = require("nodemailer");
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'ankush.nek@gmail.com',
        pass: 'dvZ19kPylIgqIO6QvDLN5g'
    }
});

 exports.sendmail = function(req, res) {
	transporter.sendMail({
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
