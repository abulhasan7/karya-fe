module.exports = (Schema) =>
({
    rating: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    },
    user:{
        type: Schema.Types.ObjectId, ref: 'User',
    },
    job:{
        type: Schema.Types.ObjectId, ref: 'Job',
    },
    serviceProvider:{
        type: Schema.Types.ObjectId, ref: 'ServiceProvider',
    }

});
