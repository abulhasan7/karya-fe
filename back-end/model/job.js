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
        type: Checkbox,
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
        type: Schema.Types.ObjectId, ref: 'user',
      },
    serviceProvider: {
        type: Schema.Types.ObjectId, ref: 'serviceProvider',
      },
    services: {
        type: Schema.Types.ObjectId, ref: 'services',
      },
});
