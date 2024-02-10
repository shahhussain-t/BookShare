const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth=require("../middleware/auth")

// User registration route
router.post('/register', userController.register);

// User login route
router.post('/login', auth,userController.login);

module.exports = router;
