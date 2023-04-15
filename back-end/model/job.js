module.exports = (Schema) =>
({
    name: {
        type: String,
    },
    description: {
        type: String,
    },
    attachmentUrls: [
        {
            type: String,
        }
    ],
    estimatedTime: {
        //In hours
        type: Number,
    },
    estimatedBudget: {
        type: Number,
    },
    estimatedHourlyBudget: {
        type: Number,
    },
    acceptedProposal: {
        type: Schema.Types.ObjectId, ref: 'JobProposal',
    },
    status: {
        type: String,
        enum: ["POSTED","ACCEPTING-PROPOSALS","PROPOSAL-ACCEPTED","IN-PROGRESS","DELAYED","COMPLETED"]
    },
    userRating: {
        type: Number,
        default: 0
    },
    address: {
        type: Schema.Types.ObjectId, ref: 'Address',
    },
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
    serviceProvider: {
        type: Schema.Types.ObjectId, ref: 'ServiceProvider',
    },
    service: {
        type: Schema.Types.ObjectId, ref: 'Service',
    },
});