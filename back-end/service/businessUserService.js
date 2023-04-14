const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const { ServiceProvider, Address, Service, ServiceToRate } = require('../model/index');
const jwtUtil = require('../util/jwtUtil');


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
        const token = jwtUtil.generateTokenForBusiness(createdServiceProvider._id,false);
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
            dbData._id,dbData.verified),
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
    console.log('dbdata', dbData);
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
    services: services11
  };
  // await ServiceProvider.collection.bulkWrite()
  const created = await ServiceProvider.updateOne({ _id: serviceProviderDetails._id }, datatoUpdate).exec();
  console.log('services11',services11)
  services1.forEach(ser => {
    Service.updateOne({ _id: ser.service }, { $addToSet: { serviceProviders: serviceProviderDetails._id } 
    }).exec()});
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

async function getServices() {
  const services = await Service.find().exec();
  console.log("services are", services);
  return services;
}

module.exports = {
  register, login, getProfile, updateProfile, addService, getServices
}