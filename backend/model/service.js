module.exports =  (Schema) =>
   ({ name: {
        type: String,
    },
    about : {
        type: String,
    },
    serviceProviders: [{
        type: Schema.Types.ObjectId, ref: 'ServiceProvider',
    }],
});
