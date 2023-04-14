module.exports = (Schema) =>
({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false
    },
    phone: {
        type: String,
    },
    about: {
        type: String,
    },
    workingHours: {
        open: {
            type: String,
        },
        close: {
            type: String
        }
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
    //todo tuple
    services: [{
        type: Schema.Types.ObjectId, ref: 'ServiceToRate' }
    ],
    address: {
        type: Schema.Types.ObjectId, ref: 'Address',
    },
});
