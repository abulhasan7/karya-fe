const mongoose = require('mongoose');
const user = require('./user');
const address = require('./address');
const jobProposal = require('./jobProposal');
const job = require('./job');
const message = require('./message');
const service = require('./service');
const serviceProvider = require('./serviceProvider');
const serviceToRate = require('./serviceToRate');

const { Schema } = mongoose;

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  maxPoolSize: 100,
};

mongoose.connect("mongodb+srv://admin:admin@cluster0.rggudu0.mongodb.net/?retryWrites=true&w=majority")
  .catch(error => console.log(error));


const userSchema = new Schema(user(Schema), { timestamps: true });
userSchema.set('toJSON', {
  transform(doc, ret, options) {
    delete ret.__v;
  },
});

const addressSchema = new Schema(address(Schema), { timestamps: true });
addressSchema.set('toJSON', {
  transform(doc, ret, options) {
    delete ret.__v;
  },
});

const serviceProviderSchema = new Schema(serviceProvider(Schema), { timestamps: true });
serviceProviderSchema.set('toJSON', {
  transform(doc, ret, options) {
    delete ret.__v;
  },
});

const servicesSchema = new Schema(service(Schema), { timestamps: true });
servicesSchema.set('toJSON', {
  transform(doc, ret, options) {
    delete ret.__v;
  },
});

const serviceToRateSchema = new Schema(serviceToRate(Schema), { timestamps: true });
servicesSchema.set('toJSON', {
  transform(doc, ret, options) {
    delete ret.__v;
  },
});

const jobSchema = new Schema(job(Schema), { timestamps: true });
jobSchema.set('toJSON', {
  transform(doc, ret, options) {
    delete ret.__v;
  },
});

const jobProposalSchema = new Schema(jobProposal(Schema), { timestamps: true });
jobProposalSchema.set('toJSON', {
  transform(doc, ret, options) {
    delete ret.__v;
  },
});

const messageSchema = new Schema(message(Schema), { timestamps: true });
messageSchema.set('toJSON', {
  transform(doc, ret, options) {
    delete ret.__v;
  },
});

const User = mongoose.model('User', userSchema);
const Address = mongoose.model('Address', addressSchema);
const ServiceProvider = mongoose.model('ServiceProvider', serviceProviderSchema);
const Service = mongoose.model('Service', servicesSchema);
const Job = mongoose.model('Job', jobSchema);
const JobProposal = mongoose.model('JobProposal', jobProposalSchema);
const Message = mongoose.model('Message', messageSchema);
const ServiceToRate = mongoose.model('ServiceToRate',serviceToRateSchema);

module.exports = {
  User,
  Address,
  ServiceProvider,
  Service,
  Job,
  JobProposal,
  Message,
  ServiceToRate
}