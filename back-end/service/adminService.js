const bcrypt = require('bcrypt');
const { default: mongoose } = require('mongoose');
const { User, ServiceProvider } = require('../model/index');
const jwtUtil = require('../util/jwtUtil');



async function login(userDetails) {
    try {
        console.log('logincalled with ', userDetails);
        const dbData = await User.findOne({ email: userDetails.email, isAdmin: true }, { __v: 0 }).exec();
        console.log('dbdata', dbData);
        if (!dbData) {
            throw new Error('User not found');
        } else {
            const result = await bcrypt.compare(
                userDetails.password,
                dbData.password,
            );
            if (!result) {
                throw new Error('Invalid Password');
            } else {
                const obj = {
                    token: jwtUtil.generateTokenForAdmin(
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
        const dbData = await User.findOne({ _id, isAdmin: true }, { __v: 0 }).exec();
        console.log('dbdata', dbData);
        if (!dbData) {
            throw new Error('User not found');
        } else {
            return dbData;
        }
    } catch (error) {
        console.error('Error occured:', error);
        throw error;
    }
}

async function getPendingBusiness() {
    try {
       const dbData = await ServiceProvider.find({verified:false}).exec();
       console.log('dbdata', dbData);
       if (!dbData || dbData.length ==0) {
           throw new Error('No Pending Business Found');
       } else {
           return dbData;
       }

    } catch (error) {
        console.error('Error occured:', error);
        throw error;
    }
}

async function approveBusiness(_id) {
    try {
       const dbData = await ServiceProvider.updateOne({_id},{verified:true}).exec();
       console.log('dbdata', dbData);
       if (!dbData || dbData.length ==0) {
           throw new Error('No Pending Business Found');
       } else {
           return "Business successfully approved";
       }

    } catch (error) {
        console.error('Error occured:', error);
        throw error;
    }
}

module.exports = {
    login, getProfile, getPendingBusiness,approveBusiness
}