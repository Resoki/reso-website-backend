const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  login: {
    type: String,
    required: true,
    unique: true
  },
  gender: {
    type: String,
    required: true
  },
  firstname: {
    type: String,
    required: true
  },
  lastname: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  photo : {
    type: String,
    required: true
  },
  date: {
    type: Number,
    required: true
  },
  posts: {
    type: String,
    required: false
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;