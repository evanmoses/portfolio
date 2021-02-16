const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    index: {
      unique: true,
      collation: {
        locale: 'en',
        strength: 2,
      },
    },
  },
  lede: String,
  content: String,
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
