module.exports =  (Schema) =>
   ({ jobId: {
        type: String,
    },
    Description: {
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
        type: picklist ,
    },
    serviceProvider: {
        type: Schema.Types.ObjectId, ref: 'serviceProvider',
      },
});
