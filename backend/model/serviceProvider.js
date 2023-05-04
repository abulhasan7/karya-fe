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
    proposals: [{
        type: Schema.Types.ObjectId, ref: 'Job' }
    ],
    jobs: [{
        type: Schema.Types.ObjectId, ref: 'Job' }
    ],
    
    address: {
        type: Schema.Types.ObjectId, ref: 'Address',
    },
    primaryImage: {
        type: String,
        default: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSSAczsR8dlOMtNeUDQXeariQTixFl_dTyUUhW6TeTr1Q&usqp=CAU&ec=48665698"
    },
    secondaryImages: [{
        type: String
    }]
});
