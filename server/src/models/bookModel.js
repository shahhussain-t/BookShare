const mongoose = require('mongoose');
const bookSchema = new mongoose.Schema({
    bookName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        enum: ['Notes', 'Textbook'],
        required: true
    },
    description: String,
    images: [String],
    uploader: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    location: {
        city: String,
        country: String
    },
    school: {
        type: String,
        enum: ['College', 'University', 'School']
    },
    classes: String,
    collegeName: String,
    userAddress: String,
    price: {
        type: Number,
        default: 0
    },
    isDonation: {
        type: Boolean,
        default: true
    },
    availability: {
        type: String,
        enum: ['Donated', 'Available', 'Sold'],
        default: 'Available'
    },
    soldAt: {
        type: Date,
        default: null
    },
    comments: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        text: String,
        createdAt: {
            type: Date,
            default: Date.now
        }
    }],
    ratings: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        value: {
            type: Number,
            min: 1,
            max: 5
        }
    }],
    tags: [String]
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
