module.exports =  (Schema) =>
   ({ name: {
        type: String,
    },
    email: {
        type: String,
    },
    verified: {
        type: checkbox,
    },
    phone: {
        type: String,
    },
    about: {
        type: String,
    },
    workingHours: {
        type: TimeRanges,
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
        type: Array,
    },
    address: {
        type: Schema.Types.ObjectId, ref: 'Address',
      },
});
