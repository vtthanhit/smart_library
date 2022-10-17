const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequestSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  books: {
    book: {
      type: Schema.Types.ObjectId,
      ref: 'books',
      required: true,
    },
    quantity: {
      type: Number,
      default: 1,
    }
  },
  type: {
    type: String,
    enum: ['BORROW', 'RETURN'],
  },
  status: {
    type: String,
    enum: ['PENDING', 'ACCEPT', 'REJECT'],
    default: 'PENDING',
  },
  user_confirm: {
    type: Schema.Types.ObjectId,
    ref: 'users',
    default: null,
  }
}, { timestamps: true });

module.exports = mongoose.model('request', RequestSchema);
