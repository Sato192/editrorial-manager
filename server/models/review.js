const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const reviewsSchema = new Schema({
manuscript :{
    type: Schema.Types.ObjectId,
    ref :'Manuscript',
    required : true
 },
 reviewDate : {
    type : String,
    required : true
 },
reviewer: {
    type : String,
    required : true
},
review :{
    type : String,
    required : true
},
status : {
    type : String,
    required : true
}

});

const Review = mongoose.model('Review', reviewsSchema);

module.exports = Review;