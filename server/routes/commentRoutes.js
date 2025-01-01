const express = require('express');
const route = express.Router();
const { validation } = require('../middleware/auth');
const {
    addCommentHandler,
    getCommentsHandler,
    updateCommentHandler,
    deleteCommentHandler,
} = require('../controllers/commentController');


route.post('/add', validation, addCommentHandler)
route.get('/get/:id', getCommentsHandler)
route.put('/update/:id', updateCommentHandler)
route.delete('/del/:id', validation, deleteCommentHandler)


module.exports = route;