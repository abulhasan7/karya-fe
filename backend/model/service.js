module.exports =  (Schema) =>
   ({ name: {
        type: String,
    },
    description : {
        type: String,
    },
    serviceProviders: [{
        type: Schema.Types.ObjectId, ref: 'ServiceProvider',
    }],
});
