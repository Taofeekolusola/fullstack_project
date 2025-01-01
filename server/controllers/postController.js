const Post = require('../models/Posts'); // Ensure singular names match model file names
const Like = require('../models/Likes'); // Ensure consistent naming

// Create a new post
const createPostsHandler = async (req, res) => {
  try {
    const { title, content, username } = req.body;

    if (!title || !content || !username) {
      return res.status(400).json({ error: 'Please provide all required fields' });
    }

    const newPost = await Post.create({ title, content, username });
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all posts
const getAllPostsHandler = async (req, res) => {
  try {
    const posts = await Post.find().populate('likes'); // Populate the `likes` field
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Get a single post by ID
const getSinglePostHandler = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate('likes'); // Use `findById`
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a post by ID
const updatePostHandler = async (req, res) => {
  try {
    const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete a post by ID
const deletePostHandler = async (req, res) => {
  try {
    const userId = req.user.id;
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createPostsHandler,
  getAllPostsHandler,
  getSinglePostHandler,
  updatePostHandler,
  deletePostHandler,
};
