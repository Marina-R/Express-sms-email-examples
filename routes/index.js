var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var smsConfig = require('../config/sms');
var emailConfig = require('../config/email');
var client = require('twilio')(smsConfig.accountSid, smsConfig.authToken);

/* GET home page. */
router.get('/', function(req, res, next) {
	console.log(req.query); //shows up in terminal, not console
  	res.render('index', { title: req.query.firstName });
});

router.get('/send-text', function(req, res, next) {
	client.messages.create({
    body: "Jenny please?! I love you <3",
    to: "+15127856580",
    from: smsConfig, fromNumber
	}, function(err, message) {
	    if(err) {
	    	console.log(err)
	    } else {
	    	console.log(message)
	    } 
	    res.send('finished')
	});
});

router.get("/send-email", function(req, res) {
	var transporter = nodemailer.createTransport(emailConfig);
	var message = {
		from: 'this@thi.com',
		to: 'luv_this_world@hotmail.com', 
		subject: 'this is a test',
		text: 'hello world',
		html: '<b>Hello</b>'
	};

	transporter.sendMail(message, function(error, info){
		if(error) {
			console.log(error);
		} else {
			console.log(info);
		}
	})
});
module.exports = router;
