const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
// const fromNumber = process.env.TWILIO_FROM_NUMBER;
const fromNumber = '+18559550976';
// const client = require('twilio')(accountSid, authToken);
const client = require('twilio')('ACeb36e93c9ba6e4efe984318e9813c9cc', 'b8353dd7c39bf972c2ef7e0873385609');

const sendMessage = (toNumber,message)=>{
    client.messages
    .create({
       body: message, 
       from: fromNumber,
       to: toNumber
     })
    .then(message => console.log(message.sid));
};

module.exports ={sendMessage}