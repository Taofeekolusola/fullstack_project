const Like = require('../models/Likes');
const Post = require('../models/Posts');
// desc: Like or unlike a post
// POST /likes/:postId
// access: Private
const likeHandler = async (req, res) => {
    try {
      const { postId } = req.body;
      const userId = req.user.id; // Get the userId from the token or session
  
      // Find the post by postId
      const post = await Post.findById(postId);
      const existingLike = await Like.findOne({ postId, userId });
  
      if (existingLike) {
        // If the post is already liked, we will unlike it
        await Like.deleteOne({ postId, userId });
        post.likes.pull(userId); // Remove the user from the post's like array
        await post.save();
        return res.json({ message: "Post unliked", post });
      } else {
        // If the post is not liked, we will like it
        const like = new Like({ postId, userId });
        await like.save();
        post.likes.push(userId); // Add the user to the post's like array
        await post.save();
        return res.json({ message: "Post liked", post });
      }
    } catch (error) {
      console.error("Error liking/unliking post:", error);
      res.status(500).json({ error: "Server error" });
    }
  };
// Get all likes for a user
const getUserLikesHandler = async (req, res) => {
    try {
        const userId = req.user.id; // Assuming req.user is populated

        const likes = await Like.find({ userId });

        res.json(likes);
    } catch (error) {
        console.error('Error in getUserLikesHandler:', error);
        res.status(500).json({ error: 'Server error' });
    }
};

const getPostLikesHandler = async (req, res) => {
    const { id: postId } = req.params; // Extract postId from the route parameter
  
    try {
      const likeCount = await Like.countDocuments({ postId });
      res.json({ postId, likeCount });
    } catch (error) {
      console.error('Error fetching like count:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
};  
  
module.exports = {
    likeHandler,
    getUserLikesHandler,
    getPostLikesHandler,
};
