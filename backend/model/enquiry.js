module.exports = (Schema) =>
({
    user: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
    serviceProvider: {
        type: Schema.Types.ObjectId, ref: 'ServiceProvider',
    },
    message: {
        type: String,
    },
});
