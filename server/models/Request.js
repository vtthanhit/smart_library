const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  books: [{
    type: Schema.Types.ObjectId,
    ref: 'books'
  }],
  status: {
    type: String,
    enum: ['PENDDING', 'ACCEPT', 'REJECT'],
    default: 'PENDDING',
  }
}, { timestamps: true });

module.exports = mongoose.model('request', RequestSchema);
