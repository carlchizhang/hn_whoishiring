var Posting = require('../models/posting');
var async = require('async');
var fetch = require('node-fetch');
var mongoose = require('mongoose');
var fs = require('fs');

const POSTING_LIST_CACHE_PATH = '../controllers/postingsList.json'

function wipeEverything() {
  let obj = {postings: []};
  let rawdata = JSON.stringify(obj);
  fs.writeFileSync(POSTING_LIST_CACHE_PATH, rawdata);

}

wipeEverything();