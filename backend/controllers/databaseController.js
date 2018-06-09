var Posting = require('../models/posting');
var async = require('async');
var fetch = require('node-fetch');
var debug = require('debug')('backend:databaseController');
var mongoose = require('mongoose');
var fs = require('fs');

//parsing stuff
var parseConsts = require('./parseConsts');
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();
var allCities = require('all-the-cities');

const POSTING_LIST_CACHE_PATH = './controllers/postingsList.json'
exports.HN_API_ADDRESS = process.env.HN_API_URI || 'https://hacker-news.firebaseio.com/v0/';

const REFRESH_CYCLE_MILLISECONDS = 1800000;
var refreshInterval = null;
exports.startRefreshInterval = function() {
  if(!refreshInterval) {
    let _this = this;
    _this.refreshPostingsFromHN(1)
    interval = setInterval(function() { 
      debug('Times up! Start a refresh');
      _this.refreshPostingsFromHN(1); 
    }, 
    REFRESH_CYCLE_MILLISECONDS);
    return 'Interval started';
  }
  else {
    return 'Interval already running';
  }
}

//refresh postings using hackernews api
//TODO: speed this up, currently it takes over 60 seconds to poll the api & parse
exports.refreshPostingsFromHN = function(numMonths) {
  const whoishiringUserAddr = exports.HN_API_ADDRESS + 'user/whoishiring.json';

  return (
  fetch(whoishiringUserAddr)
  //convert threads into json and grab thread details
  .then(res => res.json())
  .then(resJSON => {
    let submitted = resJSON.submitted.slice(0, numMonths*3);
    let threadUrls = submitted.map(id => exports.HN_API_ADDRESS + 'item/' + id + '.json');
    return Promise.all(threadUrls.map(url =>
      fetch(url).then(res => res.json())
    ))
  })
  //grab relevant comments
  .then((results) => {
    let fetchRes = results;
    let whoishiringComments = extractKidsFromThreads(fetchRes, numMonths);
    //debug('allComments: ' + whoishiringComments);
    debug('Updating comment list: ' + whoishiringComments);

    commentUrls = whoishiringComments.map(id => exports.HN_API_ADDRESS + 'item/' + id + '.json');
    //debug(commentUrls);
    debug('Total new top level comments: ' + commentUrls.length);
    return Promise.all(commentUrls.map(url =>
      fetch(url).then(res => res.json()).catch(error => null)
    ));
  })
  //grab raw text of these comments and parse & save them / remove them from db if deleted
  .then(resJSON => {
    parsePromises = [];
    let previousElement = 0;
    resJSON.forEach((element, i) => {
      if(element != null && element != undefined) {
        if(element.deleted) {
          //debug('Tried to delete' + element.id);
          Posting.deleteOne({postingId: element.id}).then(query => {
            if(query !== null && query !== undefined) {
              //debug(query);
            }
          }).catch(err => console.error('Error delete entry: ', error));

          previousElement = element.id;
        }
        //debug('Parsing & storing comment at index: ' + element.id);
        else {
          parsePromises.push(exports.parseStoreRawText(element.id, element.time, element.text));

          previousElement = element.id;
        }
      }
      else {
        debug(previousElement + ': NULL AFTER THIS ONE');
      }
    });
    return Promise.all(parsePromises);
  })
  //save it into mongoDB
  .then(postings => {
    savePromises = [];
    postings.forEach((element) => {
      if(element === null || element === undefined) {
        return;
      }
      //debug(element);
      //debug('Saving element: ' + JSON.stringify(element));
      savePromises.push(Posting.findOneAndUpdate({postingId: element.postingId}, element, {upsert:true}))
    });
    return Promise.all(savePromises);
  })
  .then(query => {
    //sanity checks
    debug('Done saving ' + query.length + ' items to MongoDB!');
  })
  .catch(error => console.error('Error fetching & storing data from HackerNews API: ', error)));
}

 exports.parseStoreRawText = function(commentId, commentTime, rawText) {
  return ( new Promise(function(resolve, reject) {
    let plainText = entities.decode(rawText.trim()).replace(/\r?\n|\r/g, ' ');
    //debug('Parsing comment: ' + plainText);

    var posting = {};
    posting.postingId = commentId;
    posting.postingText = rawText;
    posting.postingTime = commentTime;

    //parse out vital info in first line
    let firstLineRegex = new RegExp(parseConsts.firstLineRegex);
    let firstLine = plainText;
    let match;
    if((match = firstLineRegex.exec(plainText)) != null) {
      firstLine = match[0].replace(/<p>/gi, '').trim();
    }
    //debug(match);
    //debug('First Line: ' + firstLine);
    posting.postingFirstLine = firstLine;

    //extract all data between square brackets
    let regexExpression = new RegExp(parseConsts.bracketsRegex);
    let bracketResults = [];
    while ((match = regexExpression.exec(firstLine)) != null ) { 
      if(match.index === regexExpression.lastIndex) {
        regexExpression.lastIndex++;
      }
      //debug('Matched: ' + cleanupExtractionContent(match[1]));
      bracketResults.push(cleanupExtractionContent(match[1]));
    }

    let company = null;
    let role = null;
    let location = null;
    let salary = null;
    let invalidCities = ['Of', 'San', 'Wa', 'Most', 'Mobile'];
    for(let i = 0; i < bracketResults.length; ++i){
      let isLocation = false;
      let isRole = false;
      let isSalary = false;

      if(role === null) {
        for(let key in parseConsts.jobPositions) {
          let tagObj = parseConsts.jobPositions[key];
          for(let j = 0; j < tagObj.regexes.length && !isRole; ++j) {
            if((new RegExp(tagObj.regexes[j])).test(bracketResults[i])) {
              isRole = true;
            }
          }
          if(isRole) {
            role = bracketResults[i];
            break;
          }
        }
      }

      if(location === null && !isRole) {
        for(let j = 0, count = allCities.length; j < count; ++j) {
          if(allCities[j].population > 100000 && !invalidCities.includes(allCities[j].name)) {
            let cityName = allCities[j].name;
            //edge cases
            let regex = new RegExp('\\b(' + cityName + ')\\b', 'gi');
            if(cityName == 'New York City') {regex = /\b(New York)|(NYC)\b/gi};
            if(cityName == 'York' && /\b(New York)\b/gi.test(bracketResults[i])) {continue;};
            //debug(regex);
            if(regex.test(bracketResults[i])) {
              isLocation = true;
              location = bracketResults[i];
              break;
            }
          }
        }        
      }

      if(salary === null && !isRole && !isLocation) {
        for(let j = 0; j < parseConsts.salary.length; ++j) {
          let regex = new RegExp(parseConsts.salary[j]);
          if(regex.test(bracketResults[i])) {
            isSalary = true;
            salary = bracketResults[i];
            //debug('regex: ' + regex + ' salary: ' + salary);
            break;
          }
        }
      }

      if(company === null && !isRole && !isLocation && !isSalary) {
        //debug('Company assigned: ' + bracketResults[i]);
        company = bracketResults[i];
      }
    };
    posting.company = company;
    posting.location = location;
    posting.role = role;
    posting.salary = salary;


    //extract all field tags
    let fieldTags = [];
    for(let key in parseConsts.jobPositions) {
      let tagObj = parseConsts.jobPositions[key];
      for(let i = 0; i < tagObj.regexes.length; ++i) {
        if((new RegExp(tagObj.regexes[i])).test(plainText)) {
          fieldTags.push(tagObj.tag);
          break;
        }
      }
    }
    //debug('Job tags:' + jobTags);
    posting.fieldTags = fieldTags.slice(0);

    //extract remote/onsite
    let remoteTags = [];
    for(let key in parseConsts.remoteTags) {
      let tagObj = parseConsts.remoteTags[key];
      for(let i = 0; i < tagObj.regexes.length; ++i) {
        if((new RegExp(tagObj.regexes[i])).test(plainText)) {
          remoteTags.push(tagObj.tag);
          break;
        }
      }
    }
    //debug('Onsite/Remote: ' + remoteTags);
    posting.remoteTags = remoteTags.slice(0);
    posting.timeUpdated = Date.now();
    //debug(posting);
    resolve(posting);
  }));
}

//return a list of postingIds stored in the database
exports.getPostingList = function() {
  return (Posting.find({}, ['postingId', 'timeUpdated']));
}

//return a single document stored in the database
exports.getPostingById = function(id) {
  return (Posting.find({postingId: id}));
}

exports.deletePosting = function(id) {
  return (Posting.deleteOne({postingId: id}).catch(err => console.error('Error delete entry: ', error)))
}

exports.findAndUpdatePosting = function(posting) {
  if(posting === null || posting === undefined) {
    return;
  }
  else {
    return (Posting.findOneAndUpdate({postingId: posting.postingId}, posting, {upsert:true})
      .catch(err => console.error('Error delete entry: ', error)));
  }
}

function cleanupExtractionContent(string) {
  let cleanedMatch = string;
  cleanedMatch = cleanedMatch.replace(/\|/gi, '');
  cleanedMatch = cleanedMatch.replace(/ - /gi, '');
  cleanedMatch = cleanedMatch.replace(/(<a>).+(<\/a>)/gi, '');
  return cleanedMatch.trim();
}

function extractKidsFromThreads(resJSON, numMonths) {
  let whoishiringThreadsCount = 0;
  let whoishiringComments = [];
  resJSON.forEach((element) => {
    if(element.title.includes('hiring?') && whoishiringThreadsCount < numMonths) {
      whoishiringComments = whoishiringComments.concat(element.kids);
      ++whoishiringThreadsCount;
    }
  });
  return whoishiringComments;
}

function arr_diff(a1, a2) {
    var a = [], diff = [];

    for (var i = 0; i < a1.length; i++) {
        a[a1[i]] = true;
    }

    for (var i = 0; i < a2.length; i++) {
        if (a[a2[i]]) {
          delete a[a2[i]];
        } 
        else {
            a[a2[i]] = true;
        }
    }

    for (var k in a) {
        diff.push(k);
    }

    return diff;
}