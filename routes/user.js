const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

// Require controller modules.
const user_controller = require("../controllers/userController");

// GET all users in server
router.get('/', user_controller.get_all_users);

// // GET specific user from server
router.get('/:userId', user_controller.get_user);

// GET all posts from a specific user from server
router.get('/:userId/posts', user_controller.get_user_posts);

// GET all comments from a specific user from server
router.get('/:userId/comments', user_controller.get_user_comments);

// POST new user to server
router.post('/register', user_controller.post_user);

// DELETE user from server
router.delete('/:userId/delete', user_controller.delete_user);

module.exports = router;
