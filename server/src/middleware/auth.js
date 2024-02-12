const jwt = require('jsonwebtoken');
const User = require('../models/userModel');
const authMiddleware = async (req, res, next) => {
    try {
        let token = req.header('Authorization'); 
        const refreshToken = req.cookies.refreshToken;
        if (!token && !refreshToken) {
          
            throw new Error('Authorization token not provided');
        }

        if(token){
            token = token.replace('Bearer ', '');
        }

        if(refreshToken){
            token=refreshToken
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new Error('User not found');
        }
        req.user = user;
        next();
    } catch (error) {
        res.status(401).json({ message: error.message });
    }
};


module.exports=authMiddleware