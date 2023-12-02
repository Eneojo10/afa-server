const mongoose = require('mongoose');


const KontactSchema = new mongoose.Schema({
  name: {type:String, required:true},
  message: {type: String, required: true},
  email: {type: String, unique: true}
},
// {timestamps: true}
);

const Kontact = mongoose.model('contact', KontactSchema);
module.exports = Kontact;