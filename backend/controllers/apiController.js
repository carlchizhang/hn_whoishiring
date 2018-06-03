var databaseController = require('./databaseController');
debug = require('debug')('backend:apiController');

exports.hello = function(req, res) {
	res.send({express: 'Hello from the hn_jobs API.'});
}

exports.postingList = function(req, res) {
	//maybe do querying HackerNews api here
	databaseController.getPostingList(function (err, postingList) {
		if (err) { return next(err); }
		debug(postingList);
		res.send(postingList);
	});
}

exports.postingById = function(req, res, next) {
	databaseController.getPostingById(req.params.id, function (err, postingDoc) {
		if (err) { return next(err); }
		debug(postingDoc);
		res.send(postingDoc[0]);
	});
}

//testing endpoints
exports.fetchNewPostings = function(req, res) {
	var refreshPromise = databaseController.refreshPostingsFromHN(1);
	refreshPromise.then(results => {
		debug(results);
		//res.render('refreshTest', {results: results});
    res.send('Refresh complete, see console for details.');
	});
}