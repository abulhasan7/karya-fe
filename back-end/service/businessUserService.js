const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const { ServiceProvider, Address } = require('../model/index');
const jwtUtil = require('../util/jwtUtil');


async function register(ServiceProviderDetails){
    return new Promise((resolve, reject) => {
        bcrypt
          .hash(ServiceProviderDetails.password, 10)
          .then((hashedValue) => {
            const createdServiceProvider = new ServiceProviderDetails({
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
            const token = jwtUtil.generateTokenForBusiness(createdUser._id);
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
            dbData._id), 
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
    const dbData = await ServiceProviderDetails.findOne({ _id }, { __v: 0 }).exec();
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
async function updateProfile(ServiceProviderDetails) {
  return new Promise((resolve, reject) => {
    console.log('userdetails are',userDetails);

    const address = {
      street:userDetails.address.street,
      city: userDetails.address.city,
      state: userDetails.address.state,
      zip: userDetails.address.zip
    }
    const addressfilter = {_id:userDetails.address._id|| new mongoose.mongo.ObjectId()};
    const doc = Address.findOneAndUpdate(addressfilter, address, {
      new: true,
      upsert: true // Make this update into an upsert
    }).then(doc=>{
      const dob = userDetails.dob.split('-');
      const datatoUpdate = {
        name: userDetails.name,
        phone: userDetails.phone,
        gender: userDetails.gender,
        dob: new Date(dob[0], dob[1] - 1, dob[2]),
        about: userDetails.about,
        address: doc._id
      };
      User.updateOne({ _id: userDetails._id }, datatoUpdate).exec()
      .then((created) => {
        console.log(created);
        if (created.modifiedCount > 0) {
          resolve('User Profile updated successfully');
        } else {
          throw new Error('User not found or No Changes');
        }
      })
      .catch((error) => {
        console.log('error occured', error);
        reject(new Error(error.message));
      });
  });
    })


}


module.exports = {
    register,login,getProfile,updateProfile
}