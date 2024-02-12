const User = require('../models/userModel');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Middleware function to verify the token and attach the user to the request
const auth = require('../middleware/auth');

const userController = {
    register: async (req, res) => {
        try {
            const { username, email, password, confirmPassword } = req.body;
            if (password !== confirmPassword) {
                return res.status(400).json({ message: "Passwords do not match" });
            }
            const user = new User({ username, email, password });
            await user.save();
            // Generate the access token and the refresh token
            const token = await generateAccessToken(user);
            const refreshToken = await generateRefreshToken(user);
            // Send the token in the header with the Bearer scheme
            res.setHeader('Authorization', 'Bearer ' + token);
            // Send the refresh token in a cookie with the httpOnly and secure flags
            res.cookie('refreshToken', token, { httpOnly: true, secure: true });

            res.json({ message: 'User registered successfully' });
       
        } catch (error) {
            res.status(400).json({ message: error.message });
        }
    },

    login: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const isMatch = await user.comparePassword(password);
            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }
            // Generate the access token and the refresh token
            const token = await generateAccessToken(user);
            const refreshToken = await generateRefreshToken(user);
            // Send the token in the header with the Bearer scheme
          
            res.setHeader('Authorization', 'Bearer ' + token);
           
            // Send the refresh token in a cookie with the httpOnly and secure flags
            res.cookie('refreshToken', token, { httpOnly: true, secure: true }); // Use res.cookie instead of req.cookie

            res.json({message:"login succesfull"})


        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    refresh: async (req, res) => {
        try {
            const refreshToken = req.cookies.refreshToken;
            if (!refreshToken) {
                return res.status(401).json({ message: 'No refresh token provided' });
            }
            const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
            const user = await User.findById(decoded.userId);
            if (!user) {
                return res.status(404).json({ message: 'User not found' });
            }
            const token = await generateAccessToken(user);
            res.setHeader('Authorization', 'Bearer ' + token);
            res.cookie('access_token', token, { httpOnly: true, secure: true, maxAge: 3600000 }); // Expires in 1 hour
            res.json({ message: 'Token refreshed' });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    },
    

    auth: async (req, res) => {
        try {
            // Get the user from the request object
            const user = req.user;
            // Send the user information as a response
            res.json(user);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};

// Helper function to generate an access token
async function generateAccessToken(user) {
    try {
        const payload = {
            userId: user._id,
            username: user.username,
            email: user.email
        };
        const secret = process.env.JWT_SECRET;
        const options = {
            expiresIn: '1h',
            issuer: 'copilot',
            audience: 'user'
        };
        const token = await jwt.sign(payload, secret, options);
        return token;
    } catch (error) {
        throw error;
    }
}

// Helper function to generate a refresh token
async function generateRefreshToken(user) {
    try {
        const payload = {
            userId: user._id
        };
        const secret = process.env.JWT_REFRESH_SECRET;
        const options = {
            expiresIn: '7d',
            issuer: 'copilot',
            audience: 'user'
        };
        const token = await jwt.sign(payload, secret, options);
        return token;
    } catch (error) {
        throw error;
    }
}

module.exports = userController;
