const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  title: {
    type: String,
    required: true,
  },
  photo: {
    type: String,
    required: false
  },
  login: {
    type: String,
    required: true
  },
  photoUser: {
    type: String,
    required:true
  },
  likesListUser: [
    {
      login: { type: String },
    }
  ],
  comments: [
    {
      date: { type: Number },
      content: { type: String },
      login: { type: String },
      photo: { type: String },
    }
  ]
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;