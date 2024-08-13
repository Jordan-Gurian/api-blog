require('dotenv').config()
var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', (req, res) => {
  jwt.sign({user: req.body.user}, process.env.SECRET, { expiresIn: '300s' }, (err, token) => {
    res.json({
      token: token
    });
  });
});

module.exports = router;
