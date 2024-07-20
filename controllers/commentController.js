require('dotenv').config()
const User = require('../models/user');
const BlogPost = require('../models/blogpost');
const Comment = require('../models/comment');


const asyncHandler = require("express-async-handler");
const { body, validationResult, Result } = require("express-validator");

exports.get_comment = asyncHandler(async (req, res, next) => {
    // Get specific comment
    return res.json(await Comment.find({ _id: req.params.commentId }).exec());
});

exports.post_comment = asyncHandler(async (req, res, next) => {
    // Post comment to server

    const user = req.body.author;
    const blogpost = req.body.blogpost;

    const comment = new Comment({
        author: user,
        message: req.body.message,
        timestamp: Date.now(),
        blogpost: blogpost,
    });

    const newComment = await comment.save();

    await User.findByIdAndUpdate(user, { $push: { comments: newComment } })
    await BlogPost.findByIdAndUpdate(blogpost, { $push: { comments: newComment } })

    return res.json(comment);
});

exports.put_comment = asyncHandler(async (req, res, next) => {
    // Update comment
    return res.json(await Comment.findByIdAndUpdate(req.params.commentId, { message: req.body.message }));
});

exports.delete_comment = asyncHandler(async (req, res, next) => {
    // Delete comment
    return res.json(await Comment.deleteOne({ _id: req.params.commentId }).exec());
});