const express = require('express');
const route = express.Router();
const { validation } = require('../middleware/auth'); // Import validation middleware
const { likeHandler, getUserLikesHandler, getPostLikesHandler} = require('../controllers/likeController');

// POST /likes - To like or unlike a post
route.post('/', validation, likeHandler);
route.get('/', validation, getUserLikesHandler);
route.get('/:id', validation, getPostLikesHandler);

module.exports = route;
