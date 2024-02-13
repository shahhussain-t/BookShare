const Book = require('../models/bookModel');
const ErrorHandler = require('../utils/errorHandler');

const bookController = {

    // Get book info
    getBookInfo : async (req, res, next) => {
        try {
            const {id} = req.params;

            const book = await Book.findById(id);

            if(!book){
                // return res.status(404).json({
                //     success : false,
                //     message : "Book does not exist with this id !"
                // })
                return next( new ErrorHandler("Book does not exist with this id !"), 404)
            }

            res.status(200).json({
                message : "",
                book
            });

        } catch (error) {
            // res.status(500).json({
            //     error
            // })
            return next( new ErrorHandler(err))
        }
    },

    // Get all books with optional filters
    getAllBooks: async (req, res, next) => {
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
            // res.status(500).json({ message: err.message });
            return next( new ErrorHandler(err))
        }
    },

    // Add a new book
    addBook: async (req, res, next) => {
        try {
            
            const { bookName, title, category, description, images, location, school, classes, collegeName, userAddress, price, isDonation, availability, tags } = req.body;
            
            //remove comments once user auth is implemented
            // const uploader = req.user._id; // Get the user ID from the request object

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
            // res.status(400).json({ message: err.message });
            return next( new ErrorHandler(err))
        }
    },

    // Update a book
    updateBook: async (req, res) => {
        try {

            const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
            
            if (!updatedBook) {
                // return res.status(404).json({ message: 'Book not found' });
                return next( new ErrorHandler("Book not found", 404))
            }

            res.json(updatedBook);

        } catch (err) {
            // res.status(500).json({ message: err.message });
            return next( new ErrorHandler(err))
        }
    },

    // Delete a book
    deleteBook: async (req, res) => {
        try {

            const deletedBook = await Book.findByIdAndDelete(req.params.id);
            
            if (!deletedBook) {
                // return res.status(404).json({ message: 'Book not found' });
                return next( new ErrorHandler("Book not found", 404))
            }

            res.json({ message: 'Book deleted' });

        } catch (err) {
            res.status(500).json({ message: err.message });
        }
    }
};

module.exports = bookController;
