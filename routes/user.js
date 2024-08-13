const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../authentication/tokenUtils');

// Require controller modules.
const user_controller = require("../controllers/userController");

// GET all users in server
router.get('/', user_controller.get_all_users);

// GET specific user from server
router.get('/:userId', user_controller.get_user);

// GET all posts from a specific user from server
router.get('/:userId/posts', user_controller.get_user_posts);

// GET all comments from a specific user from server
router.get('/:userId/comments', user_controller.get_user_comments);

// POST new user to server
router.post('/', user_controller.post_user);

// DELETE user from server
router.delete('/:userId', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            user_controller.delete_user;
            res.json({ authData });
        };
    });
});

module.exports = router;
