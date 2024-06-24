const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ReviewrSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
  },
  editors: [
    {
      editor:
      {
        type: Schema.Types.ObjectId,
        ref: 'editor'
      },
      manuscript:
      {
        type: Schema.Types.ObjectId,
        ref: 'Manuscript'
      }
      ,
      response:
      {
        type: Boolean,
        default: false
      }

    }
  ],
  manuscripts: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Manuscript'
    }
  ],
  completed: [
    {
      _id: {
        type: Schema.Types.ObjectId,
        ref: 'Manuscript'
      },
      reviewDate: Date,
      status: String
    }
  ]
});

const Reviewr = mongoose.model('reviewr', ReviewrSchema);

module.exports = Reviewr;