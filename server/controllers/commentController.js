const Comment = require('../models/Comment');
const Post = require('../models/Posts');
const mongoose = require('mongoose');

// desc add comment to a post
// route: POST comment/posts
// acc: private

const addCommentHandler = async (req, res) => {
  try {
    const { comment, postId } = req.body;
    const username = req.user.username;
    comment.username = username

    if (!comment || !postId) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    const newComment = new Comment({ comment, postId, username});
    await newComment.save();

    res.status(201).json(newComment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// desc get all comments for a post
// route: GET comment/get/id
// acc: private

const getCommentsHandler = async (req, res) => {
  try {
    const postId = req.params.id;

    if (!postId) {
      return res.status(400).json({ error: 'Please provide a post ID' });
    }

    const comments = await Comment.find({ postId });

    res.json(comments);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// desc update a comment by id
// route: PUT comment/update/{id}
// acc: private

const updateCommentHandler = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    if (!id || !comment) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const updatedComment = await Comment.findByIdAndUpdate(id, { comment }, { new: true });

    if (!updatedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    res.json(updatedComment);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// desc delete a comment by id
// route: DELETE comment/del/{id}
// acc: private

const deleteCommentHandler = async (req, res) => {
  const { id } = req.params;

  // Function to validate ObjectId
  function isValidObjectId(id) {
    return mongoose.Types.ObjectId.isValid(id);
  }

  // Validate if the provided ID is valid
  if (!isValidObjectId(id)) {
    return res.status(400).json({ error: 'Invalid or missing ID' });
  }

  try {
    // Attempt to delete the comment by its ID
    const deletedComment = await Comment.findByIdAndDelete(id);

    if (!deletedComment) {
      return res.status(404).json({ error: 'Comment not found' });
    }

    // Send success response after deletion
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
};


module.exports = {
    addCommentHandler,
    getCommentsHandler,
    updateCommentHandler,
    deleteCommentHandler,
}