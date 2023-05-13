module.exports = (Schema) =>
({
    description: {
        type: String,
    },
    hours: {
        type: Number,
    },
    hourlyRate: {
        type: Number,
    },
    price: {
        type: Number,
    },
    status: {
        type: String,
        enum: ["POSTED","ACCEPTED","REJECTED"]
    },
    job: {
        type: Schema.Types.ObjectId, ref: 'Job',
    },
    serviceProvider: {
        type: Schema.Types.ObjectId, ref: 'ServiceProvider',
    },
    
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
});
