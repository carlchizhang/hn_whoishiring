var express = require('express');
var router = express.Router();

//controllers
var apiController = require('../controllers/apiController');

/* GET home page. */
router.get('/', apiController.hello);

/* GET list of postings. */
router.get('/postings', apiController.postingList);

/* GET list of postings. */
router.get('/refresh', apiController.fetchNewPostings);

module.exports = router;
