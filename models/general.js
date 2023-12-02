const mongoose = require('mongoose');


const GeneralSchema = new mongoose.Schema({
  avatar: {type: String, required: true},
  title: {type: String, required: true},
  content: {type: String, required: true},
  category_id: {type: String, ref:'categories'},
},
// {timestamps: true}
);

const General = mongoose.model('general', GeneralSchema);
module.exports = General;