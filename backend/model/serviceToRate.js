module.exports = (Schema) =>
({
    rate: {
        type: Number,
        default: 0
    },
    service: {
        type: Schema.Types.ObjectId, ref: 'Service',
    }
});
