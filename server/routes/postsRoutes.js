const express = require('express');
const route = express.Router();
const {
    createPostsHandler,
    getAllPostsHandler,
    getSinglePostHandler,
    updatePostHandler,
    deletePostHandler,
} = require('../controllers/postController');


route.post('/', createPostsHandler)
route.get('/get', getAllPostsHandler)
route.get('/get/:id', getSinglePostHandler)
route.put('/update/:id', updatePostHandler)
route.delete('/del/:id', deletePostHandler)


module.exports = route;