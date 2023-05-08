const {
	default: mongoose
} = require('mongoose');
const {
	Message
} = require('../model/index');

async function getMessages(job) {
	let messages = await Message.find({
		job
	}).sort({
		'createdAt': "desc"
	}).exec();
	if (messages) {
		return messages;
	}
	throw new Error('No messages found for the job proposal');
}

async function postMessage(body) {
	let message = new Message(body);
	message.save();
}

module.exports = {
	getMessages,
	postMessage
}