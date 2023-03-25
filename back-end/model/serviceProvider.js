module.exports =  (Schema) =>
   ({ name: {
        type: String,
    },
    email: {
        type: String,
    },
    verified: {
        type: Boolean,
    },
    phone: {
        type: String,
    },
    about: {
        type: String,
    },
    workingHours: {
        type: String,
    },
    avgRating: {
        type: Number,
    },
    noOfReviews: {
        type: Number,
    },
    noOfJobs: {
        type: Number,
        default: 0
    },
    noOfJobsActive: {
        type: Number,
        default: 0
    },
    services: {
        type: Schema.Types.ObjectId, ref: 'Services',
    },
    address: {
        type: Schema.Types.ObjectId, ref: 'Address',
      },
});
