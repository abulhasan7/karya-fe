const {
	default: mongoose
} = require('mongoose');
const {
	Message
} = require('../model/index');

async function getMessages(_id) {
	console.log("id is ",_id);
	let messages = await Message.find({
		$or: [
			{ "from": _id },
			{ "to": _id }
		]
	}).sort({
		'createdAt': "desc"
	}).exec();
	if (messages) {
		console.log("messages are",messages);
		const newMessages = messages.reduce((map,obj)=>{
			const arra = map[obj.jobProposalId] || [];
			arra.push(obj);
			map[obj.jobProposalId] = arra;
			return map;
		},{});
		return newMessages;
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