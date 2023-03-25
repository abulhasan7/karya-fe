module.exports =  (Schema) =>
   ({ name: {
        type: String,
    },
    description : {
        type: String,
    },

    servicepPovider: {
        type: Schema.Types.ObjectId, ref: 'ServicePovider',
      },
});
