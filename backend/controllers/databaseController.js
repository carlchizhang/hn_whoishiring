var Posting = require('../models/posting');
var async = require('async');

exports.getPostingList = function(callback) {
	Posting.find().exec(callback);
}