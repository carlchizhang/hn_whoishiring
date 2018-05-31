var databaseController = require('./databaseController');
debug = require('debug')('backend:apiController');

exports.hello = function(req, res) {
	res.send({express: 'Hello from the hn_jobs API.'});
}

exports.postingList = function(req, res) {
	//maybe do querying HackerNews api here
	databaseController.getPostingList(function (err, postingList) {
		if (err) { return next(err); }
		res.send(postingList);
	});
}

//testing endpoints
exports.fetchNewPostings = function(req, res) {
	var refreshPromise = databaseController.refreshPostingsFromHN(1);
	refreshPromise.then(results => {
		//debug(results);
		res.send('Refresh started, check console for more details');
	});
}