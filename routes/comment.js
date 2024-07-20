const express = require('express');
var router = express.Router();

// Require controller modules.
const comment_controller = require("../controllers/commentController");

// GET specific comment from server
router.get('/:commentId', comment_controller.get_comment);

// POST new comment to server
router.post('/', comment_controller.post_comment);

// PUT (update) comment
router.put('/:commentId', comment_controller.put_comment);

// DELETE comment from server
router.delete('/:commentId', comment_controller.delete_comment);

module.exports = router;