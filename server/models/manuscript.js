const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const manuscriptSchema = new Schema({
title :{
  type : String,
  required : true,
},
filePath :{
  type :String,
  required: true
},
abstract : {
  type : String,
  required :true,
},
affiliation : String,
coAuthor : String,
M_type : String,
upoladDate : {
  type : String,
  required: true
},
author : {
  type: Schema.Types.ObjectId,
  ref :'author',
  required : true
},
editor : {
  type : Schema.Types.ObjectId,
  ref : 'editor'
},
editorNote : String,
reviewers : [
  {
    reviewer : {
      type : Schema.Types.ObjectId,
      ref : 'reviewr'
  } ,
    respond : {
      type :Boolean ,
      default : false
     },
     review : String ,
     reviewStatus : String

  }
],
nonRegistReviewer :[
  {
    email : {
    type : String
  },
   respond : {
    type :Boolean ,
    default : false
   },
   reviewToken : String,
   reviewTokenExpires : Date,
   review : String ,
   reviewStatus : String
}
],

dueDate : { 
  type : Date ,
  required : false
},
status: {
  type: String,
  enum: ['Submitted','Under Disscussion', 'Under Review', 'Accepted', 'Rejected','Minor revision', 'Major revision', 'With Editor'],
  default: 'Submitted'
},
revised : {
  type : Boolean,
  default: false,
}

});

const Manuscript = mongoose.model('Manuscript', manuscriptSchema);

module.exports = Manuscript;