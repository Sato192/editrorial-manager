const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const authorSchema = new Schema({
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
manuscripts : [
 {
  type : Schema.Types.ObjectId,
    ref : 'Manuscript'
 }
]
});

const Author = mongoose.model('author', authorSchema);

module.exports = Author;