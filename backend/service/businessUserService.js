const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const { ServiceProvider, Address, Service, ServiceToRate, JobProposal, Job } = require('../model/index');
const jwtUtil = require('../util/jwtUtil');
const { sendMessage } = require('./twilioService');


async function register(ServiceProviderDetails) {
  return new Promise((resolve, reject) => {
    bcrypt
      .hash(ServiceProviderDetails.password, 10)
      .then((hashedValue) => {
        const createdServiceProvider = new ServiceProvider({
          name: ServiceProviderDetails.name,
          email: ServiceProviderDetails.email,
          password: hashedValue,
          address: ServiceProviderDetails.address,
          about: ServiceProviderDetails.about,
          workingHours: ServiceProviderDetails.workingHours
        });
        return createdServiceProvider.save();
      })
      .then((createdServiceProvider) => {
        console.log(createdServiceProvider);
        const token = jwtUtil.generateTokenForBusiness(createdServiceProvider._id, false);
        resolve({ token });
      })
      .catch((error) => {
        console.log('error occured', error);
        reject(new Error('User already registered'));
      });
  });
}

async function login(ServiceProviderDetails) {
  try {
    console.log('logincalled with ', ServiceProviderDetails);
    const dbData = await ServiceProvider.findOne({ email: ServiceProviderDetails.email }, { __v: 0 }).exec();
    console.log('dbdata', dbData);
    if (!dbData) {
      throw new Error('User not found');
    } else {
      const result = await bcrypt.compare(
        ServiceProviderDetails.password,
        dbData.password,
      );
      if (!result) {
        throw new Error('Invalid Password');
      } else {
        const obj = {
          token: jwtUtil.generateTokenForBusiness(
            dbData._id, dbData.verified),
          profile: dbData,
        };
        obj.profile.user_id = dbData._id;
        return obj;
      }
    }
  } catch (error) {
    console.error('Error occured:', error);
    throw error;
  }
}

async function getProfile(_id) {
  try {
    console.log('getProfile with _id', _id);
    const dbData = await ServiceProvider.findOne({ _id }, { __v: 0 }).exec();
    const a = await dbData.populate({ path: 'services', model: 'ServiceToRate', populate: { path: 'service', model: 'Service' } });
    console.log('dbdata', a);
    if (!dbData) {
      throw new Error('ServiceProvider not found');
    } else {
      return dbData;
    }
  } catch (error) {
    console.error('Error occured:', error);
    throw error;
  }
}

//todo 
async function updateProfile(serviceProviderDetails) {
  console.log('ServiceProviderDetails are', serviceProviderDetails);

  const address = {
    street: serviceProviderDetails.address.street,
    city: serviceProviderDetails.address.city,
    state: serviceProviderDetails.address.state,
    zip: serviceProviderDetails.address.zip
  }
  //TODO ADD A SERVICE
  const addressfilter = { _id: serviceProviderDetails.address._id || new mongoose.mongo.ObjectId() };
  const doc = await Address.findOneAndUpdate(addressfilter, address, {
    new: true,
    upsert: true // Make this update into an upsert
  })
  const services1 = await ServiceToRate.insertMany(serviceProviderDetails.services, { ordered: false })
  let services11 = [];
  services1.forEach(service => services11.push(service._id))
  console.log("services 1", services1);
  const datatoUpdate = {
    name: serviceProviderDetails.name,
    phone: serviceProviderDetails.phone,
    about: serviceProviderDetails.about,
    address: doc._id,
    workingHours: serviceProviderDetails.workingHours,
    services: services11,
    primaryImage: serviceProviderDetails.primaryImage,
    secondaryImages: serviceProviderDetails.secondaryImages
  };
  // await ServiceProvider.collection.bulkWrite()
  const created = await ServiceProvider.updateOne({ _id: serviceProviderDetails._id }, datatoUpdate).exec();
  console.log('services11', services11)
  services1.forEach(ser => {
    Service.updateOne({ _id: ser.service }, {
      $addToSet: { serviceProviders: serviceProviderDetails._id }
    }).exec()
  });
  if (created.modifiedCount > 0) {
    return 'ServiceProvider Profile updated successfully';
  } else {
    throw new Error('ServiceProvider not found or No Changes');
  }


}


async function addService(serviceDetails) {
  return new Promise((resolve, reject) => {
    const service = new Service({
      name: serviceDetails.name,
      description: serviceDetails.description,
      // serviceProviders: [serviceDetails._id]
    });
    service.save()
      .then((e) => { console.log(e), resolve("Service Added successfully") })
      .catch((error) => {
        console.log('error occured', error);
        reject(new Error('Either Service Name or Description is duplicate'));
      })
  });
}

async function postProposal(jobDetails) {

  let job = new JobProposal({
    description: jobDetails.description,
    hours: jobDetails.hours,
    hourlyRate: jobDetails.hourlyRate,
    price: jobDetails.price,
    status: "POSTED",
    serviceProvider: jobDetails._id,
    job: jobDetails.job
  })
  let jobsaved = await job.save();
  let jobprop = await Job.updateOne({ _id: jobDetails.job }, { $push: { proposals: jobsaved._id } })
  let sp = await ServiceProvider.updateOne({ _id: jobDetails._id }, { $push: { proposals: jobDetails.job } })
  sendMessage(jobDetails.toNumber,`New proposal submitted for your job: "${jobDetails.name}"`);
  return "Job proposal created successfully"
}
async function getServices() {
  const services = await Service.find().populate('serviceProviders').exec();
  console.log("services are", services);
  return services;
}

async function getServiceProviders(service) {
  const services = await Service.find({ name: service }).populate({ path: 'serviceProviders', model: 'ServiceProvider', populate: [{ path: 'address', model: 'Address' }, { path: 'services', model: 'ServiceToRate', populate: { path: 'service', model: 'Service' } }] }).exec();
  console.log("services are", services);
  return services;
}

async function getJobs(_id) {
  console.log("_id is ", _id)
  //,status:{$nin:["Closed Complete","Closed Incomplete"]}
  let jobs = await Job.find({ serviceProvider: _id}).exec();
  // if (jobs && jobs.length > 0) {
    return jobs;
  // } else {
  //   throw new Error("No Jobs found for the service provider");
  // }
}

async function getAllOpenJobs() {
  let jobs = await Job.find({ status: "Posted" }).populate('user').exec();
  if (jobs && jobs.length > 0) {
    return jobs;
  } else {
    throw new Error("No Open jobs found");
  }
}
async function getAllOpenJobsByCategory(body) {
  console.log("_id is ", body)
  let jobs = await Job.find({ service:{$in:body.services},status:"Posted" }).exec();
  // if (jobs && jobs.length > 0) {
    return jobs;
  // } else {
  //   ;
  // }
}
async function updateStatus(body) {
  let jobs = await Job.updateOne({ _id: body.jobId}, {status: body.status }).exec();
  sendMessage(body.phone1,`Job: "${body.name}" moved to ${body.status} by the ServiceProvider`);
  if (jobs) {
    return jobs;
  } else {
    throw new Error("No Jobs found for the id");
  }
}

module.exports = {
  register, login, getProfile, getAllOpenJobs, getServiceProviders, getAllOpenJobsByCategory, updateStatus, getJobs, postProposal, updateProfile, addService, getServices
}