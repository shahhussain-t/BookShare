const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const authMiddleware = async (req, res, next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        if (!token) {
            throw new Error('Authentication failed');
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }
        req.user = user; // Set the user object on the request
        next();
    } catch (error) {
        res.status(401).json({ message: 'Authentication failed' });
    }
};

module.exports = authMiddleware;
