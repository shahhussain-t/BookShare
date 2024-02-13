const express = require('express');
const router = express.Router();
const bookController = require('../controllers/bookController');
const authMiddleware = require('../middleware/auth');

// GET all books with optional filters
router.get('/', bookController.getAllBooks);

// Get book info
router.get("/:id")

// POST a new book (apply authentication middleware here)
// router.post('/', authMiddleware, bookController.addBook);
router.post('/add', bookController.addBook);

// PUT update an existing book (apply authentication middleware here)
router.put('/:id', authMiddleware, bookController.updateBook);

// DELETE delete an existing book (apply authentication middleware here)
router.delete('/:id', authMiddleware, bookController.deleteBook);

module.exports = router;
