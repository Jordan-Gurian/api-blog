const express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const verifyToken = require('../authentication/tokenUtils');

// Require controller modules.
const comment_controller = require("../controllers/commentController");

// GET specific comment from server
router.get('/:commentId', comment_controller.get_comment);

// POST new comment to server
router.post('/', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            comment_controller.post_comment;
            res.json({ authData });
        };
    });
});

// PUT (update) comment
router.put('/:commentId', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            comment_controller.put_comment;
            res.json({ authData });
        };
    });
});

// DELETE comment from server
router.delete('/:commentId', verifyToken, (req, res) => {
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if(err) {
          res.sendStatus(403);
        } else {
            comment_controller.delete_comment;
            res.json({ authData });
        };
    });
});

module.exports = router;