const Post = require('../models/Posts')

// desc: create a new post
// route: POST /posts
// acc: private

const createPostsHandler = async (req, res) => { 
    try {
        const { title, content, username } = req.body

        if(!title ||!content ||!username) {
            return res.status(400).json({ error: 'Please provide all required fields' })
        }

        const newPost = await Post.create({ title, content, username })
        res.status(201).json(newPost)
        // const newPost = new Post(req.body)
        // await newPost.save()

        // res.status(201).json(newPost)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// desc: get all posts
// GET /get
// acc: private

const getAllPostsHandler = async (req, res) => { 
    try {
        const posts = await Post.find().sort({ createdAt: 1 })
        res.json(posts)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// desc: get single post by id
// route: GET /get/:id
// acc: private

const getSinglePostHandler = async (req, res) => { 
    try {
        const post = await Post.findById(req.params.id)

        if(!post) {
            return res.status(404).json({ error: 'Post not found' })
        }

        res.json(post)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// desc: update a post by id
// route PUT /update/:id
// acc: private

const updatePostHandler = async (req, res) => { 
    try {
        const post = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true })

        if(!post) {
            return res.status(404).json({ error: 'Post not found' })
        }

        res.json(post)
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}

// desc: delete a post by id
// route: DELETE /del/:id
// acc: private

const deletePostHandler = async (req, res) => { 
    try {
        const post = await Post.findByIdAndDelete(req.params.id)

        if(!post) {
            return res.status(404).json({ error: 'Post not found' })
        }

        res.json({ message: 'Post deleted successfully' })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}
module.exports = {
    createPostsHandler,
    getAllPostsHandler,
    getSinglePostHandler,
    updatePostHandler,
    deletePostHandler,
}