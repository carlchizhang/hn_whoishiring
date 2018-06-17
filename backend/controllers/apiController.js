var databaseController = require('./databaseController');
var debug = require('debug')('backend:apiController');
var fetch = require('node-fetch');

exports.hello = function(req, res) {
  res.send({express: 'Hello from the hn_jobs API.'});
}

exports.postingList = function(req, res) {
  //maybe do querying HackerNews api here
  databaseController.getPostingList()
  .then(postingList => {
    //debug(postingList);
    res.send(postingList);
  })
  .catch(err => next(err));
}

exports.postingById = function(req, res, next) {
  databaseController.getPostingById(req.params.id)
  .then(postingDocs => {
    if(postingDocs.length == 0 || isTooOld(postingDocs[0].timeUpdated)) {
      debug('DB cache too old');
      fetch(databaseController.HN_API_ADDRESS + 'item/' + req.params.id + '.json')
      .then(results => results.json())
      .then(resJSON => {
        if(resJSON === null || resJSON === undefined) {
          debug('Couldnt find posting');
          res.send(null);
        }
        else if(resJSON.deleted) {
          databaseController.deletePosting(element.id);
          debug('Posting has been deleted');
          res.send(null);
        }
        else {
          databaseController.parseStoreRawText(resJSON.id, resJSON.time, resJSON.text)
          .then(posting => {
            databaseController.findAndUpdatePosting(posting);
            debug('Posting found');
            res.send(posting);
          })
          .catch(err => console.error('Error parsing entry: ', error));
        }
      })
    }
    else {
      debug('Posting found in DB');
      res.send(postingDocs[0]);
    }
  })
  .catch(err => next(err));
}

//testing endpoints
exports.refreshPostings = function(req, res) {
  var refreshPromise = databaseController.refreshPostingsFromHN(1, false);
  refreshPromise.then(results => {
    debug(results);
    //res.render('refreshTest', {results: results});
    res.send('Refresh complete, see console for details.');
  });
}

exports.getAvailableTags = function(req, res) {
  res.send(databaseController.getAllTags());
}

//helpers
const CACHE_TOO_OLD_MILLISECONDS = 900000;
function isTooOld(timeUpdated) {
  if(timeUpdated === null || timeUpdated === undefined) {
    return true;
  }
  if((Date.now() - timeUpdated.getTime()) > CACHE_TOO_OLD_MILLISECONDS) {
    return true;
  }
  else {
    return false;
  }
}