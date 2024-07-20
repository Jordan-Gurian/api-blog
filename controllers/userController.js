require('dotenv').config()
const User = require('../models/user');
const BlogPost = require('../models/blogpost');
const Comment = require('../models/comment');

const asyncHandler = require("express-async-handler");
const { body, validationResult, Result } = require("express-validator");

exports.get_all_users = asyncHandler(async (req, res, next) => {
    // Get all users
    return res.json(await User.find({}).exec());
});

exports.get_user = asyncHandler(async (req, res, next) => {
    // Get specific users
    return res.json(await User.find({ _id: req.params.userId }).exec());
});

exports.get_user_posts = asyncHandler(async (req, res, next) => {
    // Get user's posts
    const user = await User.findOne({ _id: req.params.userId }, "blogposts" ).exec();

    return res.json(await BlogPost.find({ _id: user.blogposts }).sort({ timestamp: -1 }));
});

exports.get_user_comments = asyncHandler(async (req, res, next) => {
    // Get user's comments
    const user = await User.findOne({ _id: req.params.userId }, "comments" ).exec();

    return res.json(await Comment.find({ _id: user.comments }).sort({ timestamp: -1 }));
});

exports.post_user = asyncHandler(async (req, res, next) => {
    // Post user to server
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password,  
        blogposts: [],
        comments: [],
        admin: false,
    });

    await user.save();

    return res.json(user);
});

exports.delete_user = asyncHandler(async (req, res, next) => {
    // Delete user
    return res.json(await User.deleteOne({ _id: req.params.userId }).exec());
});