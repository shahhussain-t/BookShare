const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    city: String,
    state: String,
    country: String,
    profilePic: String,
    countryFlag: String,
    phone: String,
    pinCode: String,
    role: {
        type: String,
        enum: ['admin', 'student'],
        default: 'student'
    },
    theme: {
        type: String,
        enum: ['light', 'dark'],
        default: 'light'
    },
    password: {
        type: String,
        required: true
    },
    token: String,
    refreshToken: String
});

// Hash password before saving the user
userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

// Compare password
userSchema.methods.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
