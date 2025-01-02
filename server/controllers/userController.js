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

// desc: update user password
// route: PUT /info
// access public methods

const updatePassword = async (req, res) => {
  try {
      let { oldPassword, newPassword, username } = req.body;
      username = req.user.username;

    // Validate inputs
    if (!username || !oldPassword || !newPassword) {
      return res
        .status(400)
        .json({ error: "Username, old password, and new password are required." });
    }

    // Find the user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ error: "User not found." });
    }

    // Compare old password
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Old password is incorrect." });
    }

    // Ensure the new password is not the same as the old password
    const isNewPasswordSame = await bcrypt.compare(newPassword, user.password);
    if (isNewPasswordSame) {
      return res.status(400).json({ error: "New password cannot be the same as the old password." });
    }

    // Hash and update the password
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({ message: "Password updated successfully." });
  } catch (error) {
    console.error("Error updating password:", error.message);
    res.status(500).json({ error: "Internal server error." });
  }
};

  
module.exports = {
    signupHandler,
    loginHandler,
    getUserDetails,
    updatePassword
};