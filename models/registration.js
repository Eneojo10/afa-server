const mongoose = require('mongoose');


const RegistrationSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, unique: true},
  address: {type: String, required: true},
  phone: {type: Number, required: true},
  country: {type: String, required: true},
  passport: {type: Number}
},
// {timestamps: true}
);

const Registration = mongoose.model('register', RegistrationSchema);
module.exports = Registration;