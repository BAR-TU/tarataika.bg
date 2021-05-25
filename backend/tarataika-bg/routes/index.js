var express = require('express');
var path = require('path');
const db = require('./queries.js');
var router = express.Router();

/* GET home page. */
router.get('/cars', db.getCars);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
