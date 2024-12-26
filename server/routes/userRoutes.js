const express = require('express');
const route = express.Router();
const { validation } = require('../middleware/auth');
const {
    signupHandler,
    loginHandler,
} = require('../controllers/userController');


route.post('/signup', signupHandler);
route.post('/login', loginHandler);


module.exports = route;