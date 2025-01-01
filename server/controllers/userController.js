const User = require('../models/Users')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
require('dotenv').config();

// desc: create a new user
// route: POST /signup
// access public methods

const signupHandler = async (req, res) => { 
    try {
        const { username, password } = req.body

        if(!username || !password) {
            return res.status(400).json({ error: 'Please provide all required fields' })
        }

        const existingUser = await User.findOne({ username });
        if(existingUser) {
            return res.status(400).json({ error: 'User already exists' })
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword });
        await user.save();

        res.status(201).json({ message: 'User created successfully' });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// desc: login user
// route: POST /login
// access public methods

const loginHandler = async (req, res) => { 
    try {
        const { username, password } = req.body

        if(!username ||!password) {
            return res.status(400).json({ error: 'Please provide all required fields' })
        }

        const user = await User.findOne({ username });
        if(!user) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch) {
            return res.status(401).json({ error: 'Invalid credentials' })
        }

        const payload = {
            id: user._id,
            username: user.username,
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });

        res.json({ success: true, token: token, username: username, id: user._id });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

// desc: get user basic info
// route: GET /info
// access public methods

const getUserDetails = async (req, res) => {
    try {
        const id = req.params.id; // Fetch user by `id`
        const user = await User.findById(id).select('-password'); // Exclude the `id` field from the response
        
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        
        res.status(200).json({ message: 'User fetched successfully', user });
    } catch (error) {
        console.error(error); // Log the error for debugging
        res.status(500).json({ message: "Internal server error", error });
    }
};

module.exports = {
    signupHandler,
    loginHandler,
    getUserDetails
};