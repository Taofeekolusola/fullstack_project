const express = require('express');
const route = express.Router();
const { validation } = require('../middleware/auth');
const {
    signupHandler,
    loginHandler,
    getUserDetails
} = require('../controllers/userController');


route.post('/signup', signupHandler);
route.post('/login', loginHandler);
route.get('/get/:id', getUserDetails);
route.get('/auth', validation, (req, res) => {
    res.json(req.user)
})


module.exports = route;