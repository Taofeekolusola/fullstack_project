const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema(
  {
    postId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Post', // Reference the Post model
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference the User model
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Like', likeSchema); // Use singular name 'Like'
