const bcrypt = require('bcrypt');
const {
	default: mongoose
} = require('mongoose');
const {
	User,
	Address,
	Job,
	JobProposal,
	ServiceProvider,
	Enquiry
} = require('../model/index');
const jwtUtil = require('../util/jwtUtil');
const {
	sendMessage
} = require('./twilioService');


async function register(userDetails) {
	return new Promise((resolve, reject) => {
		bcrypt
			.hash(userDetails.password, 10)
			.then((hashedValue) => {
				const createUser = new User({
					name: userDetails.name,
					email: userDetails.email,
					password: hashedValue,
				});
				return createUser.save();
			})
			.then((createdUser) => {
				console.log(createdUser);
				const token = jwtUtil.generateToken(createdUser._id);
				resolve({
					token
				});
			})
			.catch((error) => {
				console.log('error occured', error);
				reject(new Error('User already registered'));
			});
	});
}

async function login(userDetails) {
	try {
		console.log('logincalled with ', userDetails);
		const dbData = await User.findOne({
			email: userDetails.email,
			isAdmin: false
		}, {
			__v: 0
		}).populate('address').exec();
		console.log('dbdata', dbData);
		if (!dbData) {
			throw new Error('User not found');
		} else {
			const result = await bcrypt.compare(
				userDetails.password,
				dbData.password,
			);
			if (!result) {
				throw new Error('Invalid Password');
			} else {
				const obj = {
					token: jwtUtil.generateToken(
						dbData._id),
					profile: dbData,
				};
				obj.profile.user_id = dbData._id;
				return obj;
			}
		}
	} catch (error) {
		console.error('Error occured:', error);
		throw error;
	}
}

async function getProfile(_id) {
	try {
		console.log('getProfile with _id', _id);
		const dbData = await User.findOne({
			_id
		}, {
			__v: 0
		}).populate('address').exec();
		console.log('dbdata', dbData);
		if (!dbData) {
			throw new Error('User not found');
		} else {
			return dbData;
		}
	} catch (error) {
		console.error('Error occured:', error);
		throw error;
	}
}

async function updateProfile(userDetails) {
	return new Promise((resolve, reject) => {
		console.log('userdetails are', userDetails);

		const address = {
			street: userDetails.address.street,
			city: userDetails.address.city,
			state: userDetails.address.state,
			zip: userDetails.address.zip
		}
		const addressfilter = {
			_id: userDetails.address._id || new mongoose.mongo.ObjectId()
		};
		const doc = Address.findOneAndUpdate(addressfilter, address, {
			new: true,
			upsert: true // Make this update into an upsert
		}).then(doc => {
			// const dob = userDetails.dob.split('-');
			const datatoUpdate = {
				picture: userDetails.picture,
				name: userDetails.name,
				phone: userDetails.phone,
				gender: userDetails.gender,
				dob: new Date(userDetails.dob),
				about: userDetails.about,
				address: doc._id
			};
			User.updateOne({
					_id: userDetails._id
				}, datatoUpdate).exec()
				.then((created) => {
					console.log(created);
					if (created.modifiedCount > 0) {
						resolve('User Profile updated successfully');
					} else {
						throw new Error('User not found or No Changes');
					}
				})
				.catch((error) => {
					console.log('error occured', error);
					reject(new Error(error.message));
				});
		});
	})


}

async function postJob(jobDetails) {
	// const address = {
	//   street: jobDetails.address.street,
	//   city: jobDetails.address.city,
	//   state: jobDetails.address.state,
	//   zip: jobDetails.address.zip
	// }
	// const addressfilter = { _id: jobDetails.address._id || new mongoose.mongo.ObjectId() };
	// const doc = await Address.findOneAndUpdate(addressfilter, address, {
	//   new: true,
	//   upsert: true // Make this update into an upsert
	// })
	// console.log("doc is",doc);

	let job = new Job({
		name: jobDetails.name,
		description: jobDetails.description,
		attachmentUrls: jobDetails.attachmentUrls,
		estimatedTime: jobDetails.estimatedTime,
		estimatedBudget: jobDetails.estimatedBudget,
		estimatedHourlyBudget: jobDetails.estimatedHourlyBudget,
		status: "Posted",
		// address: doc._id,
		user: jobDetails.user,
		service: jobDetails.service
	})
	let jobsaved = await job.save();
	console.log("user", jobDetails.user)
	let u = await User.updateOne({
		_id: jobDetails.user
	}, {
		$inc: {
			noOfJobsPosted: 1,
			noOfJobsActive: 1
		}
	});
	console.log("u is", u)
	return job._id;
}

async function getJobs(_id) {
	let jobs = await Job.find({
		user: _id
	}).populate('serviceProvider').exec();
	if (jobs) {
		return jobs;
	} else {
		throw new Error("No Jobs found for the user");
	}
}

async function getJobsByStatus(_id, status) {
	let jobs = await Job.find({
		user: _id,
		status
	}).populate('serviceProvider').exec();
	if (jobs && jobs.length > 0) {
		return jobs;
	} else {
		throw new Error("No Jobs found for the user with status " + status);
	}
}

async function getJobsNEByStatus(_id, status) {
	let jobs = await Job.find({
		user: _id,
		status: {
			$ne: status
		}
	}).populate('serviceProvider').exec();
	if (jobs && jobs.length > 0) {
		return jobs;
	} else {
		throw new Error("No Jobs found for the user with status " + status);
	}
}


async function getJob(_id) {
	// const a = await dbData.populate({ path: 'services', model: 'ServiceToRate', populate: { path: 'service', model: 'Service' } });

	let job = await Job.findOne({
		_id
	}).populate([{
			path: 'proposals',
			model: 'JobProposal',
			populate: {
				path: 'serviceProvider',
				model: 'ServiceProvider',
				populate: {
					path: 'address',
					model: 'Address'
				}
			}
		},
		{
			path: 'acceptedProposal',
			model: 'JobProposal',
			populate: {
				path: 'serviceProvider',
				model: 'ServiceProvider',
				populate: {
					path: 'address',
					model: 'Address'
				}
			}
		}, {
			path: 'address',
			model: 'Address'
		}, {
			path: 'serviceProvider',
			model: 'ServiceProvider'
		}, {
			path: 'service',
			model: 'Service'
		}
	]).exec();

	// let job = await Job.findOne({ _id }).populate(['proposals','acceptedProposal','address','serviceProvider','service']).exec();
	if (job) {
		return job;
	} else {
		throw new Error("No Jobs found for the id");
	}

}

async function acceptProposal(body) {
	if (body.status == 'ACCEPTED') {
		let jobs = await Job.updateOne({
			_id: body.jobId
		}, {
			status: "Accepted",
			acceptedProposal: body.jobProposalId,
			serviceProvider: body.serviceProviderId
		}).exec();
		let jobProposal = await JobProposal.updateOne({
			_id: body.jobProposalId
		}, {
			status: "ACCEPTED"
		}).exec();
		let sp = await ServiceProvider.updateOne({
			_id: body.serviceProviderId
		}, {
			$addToSet: {
				jobs: body.jobId
			}
		})
		if (!jobs) {
			throw new Error("No Jobs found for the id");
		}
	} else {
		let jobProposal = await JobProposal.updateOne({
			_id: body.jobProposalId
		}, {
			status: "REJECTED"
		}).exec();
		if (!jobProposal) {
			throw new Error("No Jobs found for the id");
		}

	}
	sendMessage(body.toNumber, `Proposal for job: ${body.name} ${body.status} by the user`);
	return `Proposal ${body.status} successfully`

}

async function enquiry(body) {
	const enquiry = new Enquiry({
		user: body.user,
		serviceProvider: body.serviceProvider,
		message: body.message
	});
	const sa = await enquiry.save();
	sendMessage(body.toNumber, `An enquiry has been posted by the user with the following content: ${body.message}`);
	return `Proposal ${body.status} successfully`

}

async function updateStatus(body) {
	let jobs = await Job.updateOne({
		_id: body.jobId
	}, {
		status: body.status
	}).exec();
	sendMessage(body.phone2, `Job: "${body.name}" moved to ${body.status} by the user`);
	if (jobs) {
		return jobs;
	} else {
		throw new Error("No Jobs found for the id");
	}
}


module.exports = {
	register,
	login,
	getProfile,
	getJobsByStatus,
	updateProfile,
	postJob,
	getJob,
	getJobs,
	acceptProposal,
	getJobsNEByStatus,
	updateStatus,
	enquiry
}