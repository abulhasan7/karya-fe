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
        //todo enum
    },
    userRating: {
        type: Number,
        default: 10
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
    services: [{
        type: Schema.Types.ObjectId, ref: 'Service',
    }],
});