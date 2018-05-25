var databaseController = require('../databaseController');

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