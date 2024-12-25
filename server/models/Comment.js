const mongoose = require('mongoose');

const comment = new mongoose.Schema(
  {
    comment: {
      type: String,
      required: true,
    },
    postId: {
      type: mongoose.Schema.Types.ObjectId, // Reference to a Post
      ref: 'Post', // Reference the Post model
      required: true,
    },
  },
  {
    timestamps: true, // Automatically add createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Comment', comment);
