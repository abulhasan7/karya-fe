module.exports = (Schema) =>
	({
		from: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		to: {
			type: Schema.Types.ObjectId,
			ref: 'User',
		},
		message: {
			type: String,
		},
		job: {
			type: Schema.Types.ObjectId,
			ref: 'Job',
		},
	});