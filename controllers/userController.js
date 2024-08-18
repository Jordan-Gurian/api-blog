require('dotenv').config()
const User = require('../models/user');
const BlogPost = require('../models/blogpost');
const Comment = require('../models/comment');

const asyncHandler = require("express-async-handler");
const { body, validationResult, Result } = require("express-validator");
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const verifyToken = require('../authentication/tokenUtils');

exports.get_all_users = asyncHandler(async (req, res, next) => {
    // Get all users
    return res.json(await User.find({}).exec());
});

// exports.get_user = asyncHandler(async (req, res, next) => {
//     // Get specific userspassword
//     return res.json(await User.find({ _id: req.params.userId }).exec());
// });

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
  body('username').not().isEmpty().withMessage('Username is not Empty'),
  body('email').not().isEmpty().withMessage('Email is not Empty'),
  body('password').not().isEmpty().withMessage('password is not Empty')

  const { username, email, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  let user = await User.findOne({ username });

  try {
    if (user !== null) {
      return res.status(500).json({ message: 'Username is already taken' })
    }

    if (!process.env.SECRET) {
      const error = new Error("There is no JWT Secret Key")
      return next(error);
    }

    const hashed = await bcryptjs.hash(req.body.password, 10);

    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      password: hashed,  
      blogposts: [],
      comments: [],
      admin: false,
    });

    user = await newUser.save();

    jwt.sign({ user }, process.env.SECRET, { expiresIn: '3000s' }, (err, token) => {
      res.json({ token });
    });
    
  } catch (error) {
    if (error instanceof Error) {
      const payload = {
        errorMessage: error.message
      }
      return res.status(500).json(payload)
    }
    throw error
  }
});

exports.delete_user = asyncHandler(async (req, res, next) => {
    // Delete user
    verifyToken(req, res, next);
    jwt.verify(req.token, process.env.SECRET, (err, authData) => {
        if(err) {
            res.sendStatus(403);
        } else {
            res.json({ authData });
        };
    });
    return res.json(await User.deleteOne({ _id: req.params.userId }).exec());
});