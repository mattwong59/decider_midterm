var mailgun = require("mailgun-js");
require('dotenv').config();
var api_key = 'key-28320ad7026e77b9e0628183ddcf4db2';
var DOMAIN = 'sandboxb55326195b3b4f61aec5dbf4be9b98de.mailgun.org';
var mailgun = require('mailgun-js')({apiKey: api_key, domain: DOMAIN});
const emailData = require('./routes/polls.js');

var sendEmail = function(email, id) {

var data = {
  from: 'decidermidterm@gmail.com',
  to: email,
  subject: 'Wow, someone voted!',
  html: `<p>Someone voted!&nbsp; Check out&nbsp;<a href="http://` + process.env.HOST + `/polls/`+ id + `/result">` + process.env.HOST + `/polls/1/result</a>&nbsp;to see your results!</p>`

};
  mailgun.messages().send(data, function (error, body) {
    console.log(body);
  });
};

module.exports = sendEmail;
