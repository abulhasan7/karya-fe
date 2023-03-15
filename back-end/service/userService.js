const bcrypt = require('bcrypt');
const { User, Address } = require('../model/index');
const jwtUtil = require('../util/jwtUtil');


async function register(userDetails){
    return new Promise((resolve, reject) => {
        bcrypt
          .hash(userDetails.password, 10)
          .then((hashedValue) => {
            const createUser = new User({
              name: userDetails.name,
              email: userDetails.email,
              password: hashedValue,
            });
            return createUser.save();
          })
          .then((createdUser) => {
            console.log(createdUser);
            const token = jwtUtil.generateToken(createdUser._id);
            resolve({ token });
          })
          .catch((error) => {
            console.log('error occured', error);
            reject(new Error('User already registered'));
          });
      });
}

module.exports = {
    register
}