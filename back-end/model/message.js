module.exports = (Schema) =>
({
    from: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
    to: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
    message: {
        type: String,
    },
    timeStamp: {
        type: Date,
        default: Date.now
    },
    jobProposal: {
        type: Schema.Types.ObjectId, ref: 'JobProposal',
    },
});
