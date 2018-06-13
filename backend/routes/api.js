var express = require('express');
var router = express.Router();

//controllers
var apiController = require('../controllers/apiController');

/* GET home page. */
router.get('/', apiController.hello);

/* GET list of postings. */
router.get('/postings', apiController.postingList);

/* GET a single posting doc */
router.get('/posting/:id', apiController.postingById);

/* GET list of postings. */
router.get('/refresh', apiController.refreshPostings);

/* GET start interval to refresh postings */
router.get('/refresh/interval', apiController.startRefreshPostingsInterval);

/* GET list of tags to filter by */
router.get('/tags', apiController.getAvailableTags);

module.exports = router;
