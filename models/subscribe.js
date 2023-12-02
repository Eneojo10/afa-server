const mongoose = require('mongoose');

const subscribeSchema = new mongoose.Schema({
  name: {type: String,required:true},
  email: { type: String, required: true },
  
});

const Subscribe = mongoose.model('Subscribe', subscribeSchema);

module.exports = Subscribe;
