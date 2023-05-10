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
		jobProposalId: {
			type: Schema.Types.ObjectId,
			ref: 'JobProposal',
		},
	});