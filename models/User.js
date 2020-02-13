const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: {
    type: String,
    select: false
  },
  date: {
    type: Date,
    default: Date.now
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;