const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const fromNumber = process.env.TWILIO_FROM_NUMBER;

const sendMessage = (toNumber, message) => {

  let client = require('twilio')(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

  client.messages
    .create({
      body: message,
      from: process.env.TWILIO_FROM_NUMBER,
      to: toNumber
    })
    .then(message => console.log(message.sid));
};

module.exports = { sendMessage }