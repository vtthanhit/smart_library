const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
  },
  classname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
  },
  role: {
    type: String,
    enum: ['ADMIN', 'STUDENT'],
    default: 'STUDENT',
  },
}, { timestamps: true });

module.exports = mongoose.model('users', UserSchema);