const express = require('express');
const {
  register,
  login,
  getMe,
  updateDetails,
  updatePassword,
  logout,
  getUsers,
  getUser,
  updateUser,
  deleteUser
} = require('../controllers/authController');

const { protect, authorize } = require('../middleware/auth');
const {
  validateUserRegistration,
  validateUserLogin,
  validateUserUpdate,
  validateObjectId,
  validatePagination
} = require('../middleware/validation');

const router = express.Router();

// Public routes
router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);

// Protected routes
router.use(protect); // All routes after this middleware are protected

router.get('/me', getMe);
router.put('/me', validateUserUpdate, updateDetails);
router.put('/updatepassword', updatePassword);
router.post('/logout', logout);

// Admin only routes
router.use(authorize('admin')); // All routes after this middleware require admin role

router.get('/users', validatePagination, getUsers);
router.get('/users/:id', validateObjectId('id'), getUser);
router.put('/users/:id', [validateObjectId('id'), validateUserUpdate], updateUser);
router.delete('/users/:id', validateObjectId('id'), deleteUser);

module.exports = router;
