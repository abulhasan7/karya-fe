const mongoose = require('mongoose');
const user = require('./user');
const address = require('./address');
const jobProposal = require('./jobProposal');
const job = require('./job');
const message = require('./message');
const service = require('./service');
const serviceProvider = require('./serviceProvider');

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

  const serviceProviderSchema = new Schema(serviceProvider(Schema));
  serviceProviderSchema.set('toJSON', {
    transform(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  });

  const servicesSchema = new Schema(service(Schema));
  servicesSchema.set('toJSON', {
    transform(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  });

  const jobSchema = new Schema(job(Schema));
  jobSchema.set('toJSON', {
    transform(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  });

  const jobProposalSchema = new Schema(jobProposal(Schema));
  jobProposalSchema.set('toJSON', {
    transform(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  });

  const messageSchema = new Schema(message(Schema));
  messageSchema.set('toJSON', {
    transform(doc, ret, options) {
      delete ret._id;
      delete ret.__v;
    },
  });

  const User = mongoose.model('User', userSchema);
  const Address = mongoose.model('Address', addressSchema);
  const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);
  const Service = mongoose.model('Services', servicesSchema);
  const Job = mongoose.model('job', jobSchema);
  const JobProposal = mongoose.model('jobProposal', jobProposalSchema);
  const Message = mongoose.model('message', messageSchema);


  module.exports = {
    User,
    Address,
    ServiceProvider,
    Service,
    Job,
    JobProposal,
    Message
  }