require('dotenv').config()
const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../authentication/tokenUtils');

// Require controller modules.
const blogpost_controller = require("../controllers/blogpostController");

// GET all blog posts in server
router.get('/', blogpost_controller.get_all_blogposts);

// GET specific blog post from server
router.get('/:blogpostId', blogpost_controller.get_blogpost);

// GET blog post comments from server
router.get('/:blogpostId/comments', blogpost_controller.get_blogpost_comments);

// POST new blog post to server
router.post('/', verifyToken, blogpost_controller.post_blogpost);

// DELETE blog post from server
router.delete('/:blogpostId', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            blogpost_controller.delete_blogpost;
            res.json({ authData });
        };
    });
});

module.exports = router;
