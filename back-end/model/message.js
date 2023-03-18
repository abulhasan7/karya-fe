module.exports =  (Schema) =>
   ({ from: {
        type: String,
    },
    to: {
        type: String,
    },
    Message: {
        type: picklist ,
    },
    timeStamp: {
        type: datetime,
    },
    jobProposal: {
        type: Schema.Types.ObjectId, ref: 'jobProposal',
      },
});
