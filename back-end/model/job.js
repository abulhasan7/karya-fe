module.exports =  (Schema) =>
   ({ name: {
        type: String,
    },
    Desrciption : {
        type: String,
    },
    estimatedTime: {
        type: Number,
    },
    estimatedBudget: {
        type:  Number,
    },
    estimatedHourlyBudget: {
        type: Number,
    },
    acceptedProposal: {
        type: Schema.Types.ObjectId, ref: 'JobProposal',
    },
    attachments: {
        type: Array,
    },
    status: {
        type: Array,
    },
    userRating: {
        type: Number,
        default: 0
    },
    noOfJobsActive: {
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
    services: {
        type: Schema.Types.ObjectId, ref: 'Services',
      },
});
