var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('Please use the API instead at /api');
});

module.exports = router;
