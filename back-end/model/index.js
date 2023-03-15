const mongoose = require('mongoose');
const user = require('./user');
const address = require('./address');

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

  const User = mongoose.model('User', userSchema);
  const Address = mongoose.model('Address', addressSchema);

  module.exports = {
    User,
    Address
  }