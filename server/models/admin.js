const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const adminSchema = new Schema({
name :{
  type : String,
  required : true,
},
email : {
  type : String,
  required :true,
},
password : {
  type: String,
},
});

const Admin = mongoose.model('admin', adminSchema);

module.exports = Admin;