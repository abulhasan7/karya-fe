const {
	default: mongoose
} = require('mongoose');
const {
	Message,
	JobProposal,
	Job,
	ServiceProvider
} = require('../model/index');

async function getMessages({_id,serviceProvider}) {
	console.log("id is ", _id);
	let proposals;
	if(serviceProvider){
		proposals = await JobProposal.find({serviceProvider:_id}).populate('job').populate('serviceProvider').exec();

	}else{
		proposals = await JobProposal.find({user:_id}).populate('job').populate('serviceProvider').exec();
	}
	// let proposalsIds = proposals.map(p=>p._id);
	// let messages = await Message.find({jobProposalId:{$in:proposalsIds}}).sort({
	// 	'createdAt': "desc"
	// }).exec();;
	// let messages = await Message.find({
	// 	$or: [{
	// 			"from": _id
	// 		},
	// 		{
	// 			"to": _id
	// 		}
	// 	]
	// }).sort({
	// 	'createdAt': "desc"
	// }).exec();
	let resp ={};
	console.log('proposals are ',proposals);
	for(let prop of proposals){
		let messages = await Message.find({jobProposalId:prop._id}).sort({
			'createdAt': "desc"
		}).exec();;
		resp[prop._id] = {
			messages,
			jobName:prop.job.name,
			serviceProvider:{
				_id:prop.serviceProvider._id,
				name:prop.serviceProvider.name,
				primaryImage:prop.serviceProvider.primaryImage
			},
			user:{
				_id:prop.job.user,
			}
		}
		console.log('resp is',resp);
	}
	return resp;
	// if (messages) {
	// 	// console.log("messages are",messages);
	// 	const newMessages = messages.reduce((map, obj) => {
	// 		const arra = map[obj.jobProposalId] || [];
	// 		arra.push(obj);
	// 		map[obj.jobProposalId] = arra;
	// 		return map;
	// 	}, {});
	// 	const finalObj = {};
	// 	for (k of Object.keys(newMessages)) {
	// 		const pr = await JobProposal.findOne({
	// 			_id: k
	// 		}).populate('serviceProvider').populate('job').exec();
	// 		const proposal = pr.toObject();
	// 		finalObj[k] = {
	// 			jobName: proposal.job.name,
	// 			serviceProvider: {
	// 				_id: proposal.serviceProvider._id,
	// 				name: proposal.serviceProvider.name,
	// 				primaryImage: proposal.serviceProvider.primaryImage
	// 			},
	// 			user: {
	// 				_id: proposal.job.user,
	// 			},
	// 			messages: newMessages[k]
	// 		};
	// 	}
	// 	return finalObj;
	// }
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