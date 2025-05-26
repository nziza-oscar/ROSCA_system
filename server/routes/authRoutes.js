const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isAuthorized } = require('../middleware/Authorized');

// Register a new user
router.post('/register', authController.register);
router.get('/my-data',isAuthorized, authController.userInfo);
router.post('/newuser',isAuthorized, authController.createUser);
router.get('/users',isAuthorized, authController.fetchUsers);
router.get('/system-users',isAuthorized, authController.systemUsers);

// Login user
router.post('/login', authController.login);

// Forgot password
router.post('/forgot-password', authController.forgotPassword);

// Reset password
router.put('/reset-password/:resetToken', authController.resetPassword);

module.exports = router;