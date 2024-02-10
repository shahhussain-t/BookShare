const Book = require('../models/bookModel');

const bookController = {
    // Get all books with optional filters
    getAllBooks: async (req, res) => {
        try {
            let query = {};

            // Filter by city
            if (req.query.city) {
                query['location.city'] = { $regex: req.query.city, $options: 'i' }; // Case-insensitive search
            }

            // Filter by country
            if (req.query.country) {
                query['location.country'] = req.query.country;
            }

            // Filter by title
            if (req.query.title) {
                query.title = { $regex: req.query.title, $options: 'i' }; // Case-insensitive search
            }

            // Filter by tags
            if (req.query.tags) {
                const tags = req.query.tags.split(',');
                query.tags = { $in: tags };
            }

            const books = await Book.find(query);
            res.json(books);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Add a new book
    addBook: async (req, res) => {
        try {
            const { bookName, title, category, description, images, location, school, classes, collegeName, userAddress, price, isDonation, availability, tags } = req.body;
            const uploader = req.user._id; // Get the user ID from the request object

            const newBook = new Book({
                bookName,
                title,
                category,
                description,
                images,
                uploader,
                location,
                school,
                classes,
                collegeName,
                userAddress,
                price,
                isDonation,
                availability,
                tags
            });

            const savedBook = await newBook.save();
            res.status(201).json(savedBook);
        } catch (err) {
            res.status(400).json({ message: err.message });
        }
    },

    // Update a book
    updateBook: async (req, res) => {
        try {
            const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
            if (!updatedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json(updatedBook);
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    },

    // Delete a book
    deleteBook: async (req, res) => {
        try {
            const deletedBook = await Book.findByIdAndDelete(req.params.id);
            if (!deletedBook) {
                return res.status(404).json({ message: 'Book not found' });
            }
            res.json({ message: 'Book deleted' });
        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = bookController;
