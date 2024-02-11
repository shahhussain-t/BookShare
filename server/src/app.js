// server/src/app.js
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');

const app = express();

// Middleware
app.use(express.json());

// Connect to MongoDB (ensure you have your MongoDB URI)
mongoose.connect('mongodb://localhost:27017/BookShare', { useNewUrlParser: true, useUnifiedTopology: true });

// Use user routes
app.use('/api', userRoutes);

module.exports = app;
