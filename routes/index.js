require('dotenv').config()
const asyncHandler = require("express-async-handler");
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const User = require('./../models/user');
const bcryptjs = require('bcryptjs');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', asyncHandler(async (req, res, next) => {
  body('username').not().isEmpty().withMessage('Username is not Empty'),
  body('password').not().isEmpty().withMessage('password is not Empty')

  const { username, password } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const user = await User.findOne({ username });
  try {
    if (user === null) {
      return res.status(500).json({ message: 'No username found' })
    }

    const hashed = user.password
    const passwordMatches = await bcryptjs.compare(password, hashed)

    if (!passwordMatches) {
      return res.status(401).json({ message: 'Invalid password' });
    }
    if (!process.env.SECRET) {
      const error = new Error("There is no JWT Secret Key")
      return next(error);
    }

    const token = jwt.sign({ user }, process.env.SECRET, { expiresIn: '10h' });   
    return res.json({ token });
    
  } catch (error) {
    if (error instanceof Error) {
      const payload = {
        errorMessage: error.message
      }
      return res.status(500).json(payload)
    }
    throw error
  }
}));

module.exports = router;
