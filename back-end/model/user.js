module.exports =  (Schema) =>
   ({ name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    phone: {
        type: String,
    },
    gender: {
        type: String,
    },
    dob: {
        type: Date,
    },
    about: {
        type: String,
    },
    noOfJobsPosted: {
        type: Number,
        default: 0
    },
    noOfJobsActive: {
        type: Number,
        default: 0
    },
    isAdmin:{
        type: Boolean,
        default: false
    },
    address: {
        type: Schema.Types.ObjectId, ref: 'Address',
      },
});
