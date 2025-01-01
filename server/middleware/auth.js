const jwt = require('jsonwebtoken');
require('dotenv').config();



const validation = async (req, res, next) => {
    const token = req.header("token")

    if (!token) {
        return res.status(401).json({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;  // Add user info to request object to be used in other routes or middleware
        
        if (decoded) {
            return next()
        }
    } catch (error) {
        return res.status(401).json({ error: 'Access denied. Invalid token.' });
    }
}

module.exports = {validation};