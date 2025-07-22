const express = require('express');
const {
  getPosts,
  getPost,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
  getMyPosts,
  toggleLike,
  addComment,
  deleteComment,
  getPostStats
} = require('../controllers/postController');

const { protect, authorize, optionalAuth } = require('../middleware/auth');
const {
  validatePostCreation,
  validatePostUpdate,
  validateComment,
  validateObjectId,
  validatePagination,
  validateSearch
} = require('../middleware/validation');

const router = express.Router();

// Public routes
router.get('/', [validatePagination, validateSearch], getPosts);
router.get('/slug/:slug', getPostBySlug);
router.get('/:id', validateObjectId('id'), getPost);

// Protected routes
router.use(protect); // All routes after this middleware are protected

// Admin only routes (must come before other routes to avoid conflicts)
router.get('/admin/stats', authorize('admin'), getPostStats);

// User-specific routes
router.get('/user/my-posts', validatePagination, getMyPosts);

// CRUD operations
router.post('/', validatePostCreation, createPost);
router.put('/:id', [validateObjectId('id'), validatePostUpdate], updatePost);
router.delete('/:id', validateObjectId('id'), deletePost);

// Post interactions
router.put('/:id/like', validateObjectId('id'), toggleLike);
router.post('/:id/comments', [validateObjectId('id'), validateComment], addComment);
router.delete('/:id/comments/:commentId', [
  validateObjectId('id'),
  validateObjectId('commentId')
], deleteComment);

module.exports = router;
