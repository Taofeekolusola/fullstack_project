const Post = require('../models/Posts'); // Ensure singular names match model file names
const Like = require('../models/Likes'); // Ensure consistent naming

// Create a new post
const createPostsHandler = async (req, res) => {
  try {
    const { title, content, username} = req.body;

    if (!title || !content || !username ) {
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
const updatePostTitleHandler = async (req, res) => {
  try {
    const { title, id } = req.body;

    // Ensure `title` and `id` are provided
    if (!title || !id) {
      return res.status(400).json({ error: "Title and ID are required." });
    }

    // Update the post's title where the ID matches
    const updatedPost = await Post.findByIdAndUpdate(
      id,                      // Filter: Find post by ID
      { title },               // Update: Set the new title
      { new: true, runValidators: true } // Options: Return updated doc and run validators
    );

    // If no post is found with the provided ID
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Send the updated post as the response
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
  
const updatePostTextHandler = async (req, res) => {
  try {
    const { content, id } = req.body;

    // Ensure `title` and `id` are provided
    if (!content || !id) {
      return res.status(400).json({ error: "content and ID are required." });
    }

    // Update the post's content where the ID matches
    const updatedPost = await Post.findByIdAndUpdate(
      id,                      // Filter: Find post by ID
      { content },               // Update: Set the new content
      { new: true, runValidators: true } // Options: Return updated doc and run validators
    );

    // If no post is found with the provided ID
    if (!updatedPost) {
      return res.status(404).json({ error: "Post not found." });
    }

    // Send the updated post as the response
    res.status(200).json(updatedPost);
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
  updatePostTitleHandler,
  deletePostHandler,
  updatePostTextHandler,
};
