const express = require('express');
const route = express.Router();
const {
    addCommentHandler,
    getCommentsHandler,
    updateCommentHandler,
    deleteCommentHandler,
} = require('../controllers/commentController');


route.post('/add', addCommentHandler)
route.get('/get/:id', getCommentsHandler)
route.put('/update/:id', updateCommentHandler)
route.delete('/del/:id', deleteCommentHandler)


module.exports = route;