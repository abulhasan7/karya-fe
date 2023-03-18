const mongoose = require('mongoose');
const user = require('./user');
const address = require('./address');
const jobProposal = require('./jobProposal');

const { Schema } = mongoose;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 100,
};

mongoose.connect("mongodb+srv://admin:admin@cluster0.rggudu0.mongodb.net/?retryWrites=true&w=majority")
.  catch(error => console.log(error));

  
  const userSchema = new Schema(user(Schema));
  userSchema.set('toJSON', {
    transform(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  });

  const addressSchema = new Schema(address);
  addressSchema.set('toJSON', {
    transform(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  });

  const serviceProviderSchema = new Schema(ServiceProvider);
  serviceProviderSchema.set('toJSON', {
    transform(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  });

  const servicesSchema = new Schema(services);
  servicesSchema.set('toJSON', {
    transform(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  });

  const jobSchema = new Schema(job);
  jobSchema.set('toJSON', {
    transform(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  });

  const jobProposalSchema = new Schema(jobProposal);
  jobProposalSchema.set('toJSON', {
    transform(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  });

  const messageSchema = new Schema(message);
  messageSchema.set('toJSON', {
    transform(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  });

  const User = mongoose.model('User', userSchema);
  const Address = mongoose.model('Address', addressSchema);
  const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);
  const Services = mongoose.model('Services', serviceProviderSchema);
  const job = mongoose.model('job', serviceProviderSchema);
  const jobProposal = mongoose.model('jobProposal', serviceProviderSchema);
  const message = mongoose.model('message', serviceProviderSchema);


  module.exports = {
    User,
    Address,
    ServiceProvider,
    Services,
    job,
    jobProposal,
    message
  }