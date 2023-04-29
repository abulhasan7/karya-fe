const { default: mongoose } = require('mongoose');
const { Message } = require('../model/index');

async function getMessages(jobProposal){
    let messages = await Message.find({jobProposal}).sort({'createdAt':"desc"}).exec();
    if(messages){
        return messages;
    }
    throw new Error('No messages found for the job proposal');
}

async function postMessage(from,to, jobProposal){
    let message = new Message(from,to,jobProposal);
    message.save();
}

module.exports = {
    getMessages, postMessage
}