require('dotenv').config()
const User = require('../models/user');
const BlogPost = require('../models/blogpost');
const Comment = require('../models/comment');

const asyncHandler = require("express-async-handler");
const { body, validationResult, Result } = require("express-validator");

exports.get_all_blogposts = asyncHandler(async (req, res, next) => {
    // Get all posts
    return res.json(await BlogPost.find({}).exec());
});

exports.get_blogpost = asyncHandler(async (req, res, next) => {
    // Get specific post
    return res.json(await BlogPost.find({ _id: req.params.blogpostId }).exec());
});

exports.get_blogpost_comments = asyncHandler(async (req, res, next) => {
    const blogpost = await BlogPost.findOne({ _id: req.params.blogpostId }, "comments" ).exec();

    return res.json(await Comment.find({ _id: blogpost.comments }).sort({ timestamp: -1 }));
});

exports.post_blogpost = asyncHandler(async (req, res, next) => {
    // Post post to server
    const user = req.body.author;
    
    const blogpost = new BlogPost({
        author: user,
        title: req.body.title,
        message: req.body.message,
        published: req.body.published,
        timestamp: Date.now(),
        comments: [],
    });

    const newPost = await blogpost.save();

    await User.findByIdAndUpdate(user, { $push: { blogposts: newPost } })

    return blogpost;
});

exports.delete_blogpost = asyncHandler(async (req, res, next) => {
    // Delete blogpost
    
    // Delete post from user array as well
    await User.updateOne(req.body.author, { 
        $pullAll: { 
            blogposts: [{ _id: req.params.blogpostId }]
        }
    })

    return res.json(await BlogPost.deleteOne({ _id: req.params.blogpostId }).exec());
});