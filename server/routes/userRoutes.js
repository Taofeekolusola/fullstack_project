const express = require('express');
const route = express.Router();
const { validation } = require('../middleware/auth');
const {
    signupHandler,
    loginHandler,
} = require('../controllers/userController');


route.post('/signup', signupHandler);
route.post('/login', loginHandler);
route.get('/auth', validation, (req, res) => {
    res.json(req.user)
})


module.exports = route;