const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const editorSchema = new Schema({
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
reviewersInvited : [
 {
  manuscript:{
    type : Schema.Types.ObjectId,
    ref : 'Manuscript',
  },
  _id : {
    type : Schema.Types.ObjectId,
    ref : 'reviewr',
  },
  respond : {
    type: Boolean,
    default : false
  }
 }
],
manuscripts : [
  {
    type : Schema.Types.ObjectId,
    ref : 'Manuscript'
  }
] ,
admin : {
  type : Boolean,
  default : false 
}
});

const Editor = mongoose.model('editor', editorSchema);

module.exports = Editor;