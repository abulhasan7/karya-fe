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
        //enum
    },
    serviceProvider: {
        type: Schema.Types.ObjectId, ref: 'ServiceProvider',
    },
});
