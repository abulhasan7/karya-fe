module.exports = (Schema) =>
({
    street: {
        type: String
    },
    city: {
        type: String
    },
    state: {
        type: String
    },
    zip: {
        type: Number
    },
    
});

/*
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);

client.messages
  .create({
     body: 'This is the ship that made the Kessel Run in fourteen parsecs?',
     from: '+15017122661',
     to: '+15558675310'
   })
  .then(message => console.log(message.sid));

  SID: ACeb36e93c9ba6e4efe984318e9813c9cc
Token: b8353dd7c39bf972c2ef7e0873385609
+18559550976

1st when proposal is created, send to user
2. Proposal accept/reject, send message to seller
3. job state after accepted, send messages to both

*/