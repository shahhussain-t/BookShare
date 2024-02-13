
const mongoose = require('mongoose');
const { mongoURI } = require('../config/database')

const connectDB = async () => {
    const URL = "mongodb+srv://bookShare:bookshare1234@cluster0.5qgqh.mongodb.net/bookshare?retryWrites=true&w=majority"
    try {
        await mongoose.connect(URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); 
    }
};

module.exports = connectDB;
