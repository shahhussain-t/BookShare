// server/src/models/userModel.js
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    city: String,
    state: String,
    country: String,
    profilepic: String,
    countryFlag: String,
    phone: String,
    pinCode: String,
    role: { type: String, default: 'student' },
    theme: { type: String, default: 'light' },
    password: { type: String, required: true },
});

// Hash the password before saving to the database
userSchema.pre('save', async function (next) {
    const user = this;
    if (!user.isModified('password')) return next();

    try {
        const hashedPassword = await bcrypt.hash(user.password, 10);
        user.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
