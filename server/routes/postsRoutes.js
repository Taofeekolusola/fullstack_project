const express = require('express');
const route = express.Router();
const { validation } = require('../middleware/auth');
const {
    createPostsHandler,
    getAllPostsHandler,
    getSinglePostHandler,
    updatePostTitleHandler,
    updatePostTextHandler,
    deletePostHandler,
} = require('../controllers/postController');


route.post('/',  createPostsHandler)
route.get('/get', getAllPostsHandler)
route.get('/get/:id', getSinglePostHandler)
route.put('/title', validation, updatePostTitleHandler)
route.delete('/del/:id', validation, deletePostHandler)
route.put('/text', validation, updatePostTextHandler)


module.exports = route;