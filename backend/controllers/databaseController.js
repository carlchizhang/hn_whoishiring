var Posting = require('../models/posting');
var async = require('async');
var fetch = require('node-fetch');
var debug = require('debug')('backend:databaseController');

//parsing stuff
var parseConsts = require('./parseConsts');
var Entities = require('html-entities').AllHtmlEntities;
var entities = new Entities();

const HN_API_ADDRESS = process.env.HN_API_URI || 'https://hacker-news.firebaseio.com/v0/';

//refresh postings using hackernews api
//TODO: speed this up, currently it takes over 10 seconds to poll the api
exports.refreshPostingsFromHN = function(numMonths) {
	// //get threads submitted by hn bot user/whoishiring, trim the freelancer threads
	const whoishiringUserAddr = HN_API_ADDRESS + 'user/whoishiring.json';
	return (fetch(whoishiringUserAddr)
	//convert threads into json and grab thread details
	.then(res => res.json())
	.then(resJSON => {
		let submitted = resJSON.submitted.slice(0, numMonths*3);
		let threadUrls = submitted.map(id => HN_API_ADDRESS + 'item/' + id + '.json');
		return Promise.all(threadUrls.map(url =>
			fetch(url).then(res => res.json())
		))
	})
	//filter out threads that aren't whoishiring threads
	.then(resJSON => {
		let whoishiringThreadsCount = 0;
		let whoishiringComments = [];
		resJSON.forEach((element) => {
			if(element.title.includes('hiring?') && whoishiringThreadsCount < numMonths) {
				whoishiringComments = whoishiringComments.concat(element.kids);
				++whoishiringThreadsCount;
			}
		});
		//whoishiringThreads.forEach(element => debug(element));
		commentUrls = whoishiringComments.map(id => HN_API_ADDRESS + 'item/' + id + '.json');
		//debug(commentUrls);
		debug('Total top level comments: ' + commentUrls.length);
		return Promise.all(commentUrls.map(url =>
			fetch(url).then(res => res.json()).catch(error => null)
		));
	})
	//grab raw text of these comments and parse & store them in MongoDB
	.then(resJSON => {
		debug('Retrieved: ' + resJSON.length);
		parseStorePromises = [];
		resJSON.forEach((element, i) => {
			if(element != null && element != undefined && element.text != undefined && element.text != null) {
				debug('Parsing & storing comment at index: ' + i);
				parseStorePromises.push(parseStoreRawText(
					'https://news.ycombinator.com/item?id=' + element.id, element.text));
			}
			else {
				debug(i);
				debug('NULLLLLLLLLLLLLLLLLLL');
				debug('NULLLLLLLLLLLLLLLLLLL');
				debug('NULLLLLLLLLLLLLLLLLLL');
				debug('NULLLLLLLLLLLLLLLLLLL');
			}
		});
		return Promise.all(parseStorePromises);
	})
	.catch(error => console.error('Error fetching & storing data from HackerNews API: ', error)));
}

 function parseStoreRawText(commentUrl, rawText) {
	return ( new Promise(function(resolve, reject) {
		let plainText = unicodeToChar(rawText.trim());
		debug('Parsing comment: ' + commentUrl);
		debug('Raw Text: ' + plainText);

		//extract all data between square brackets
		let regexExpression = new RegExp(parseConsts.lineBracketsRegex);
		let match = regexExpression.exec(plainText);
		// while ((match = regexExpression.exec(plainText)) != null ) { 
		// 	if(match.index === regexExpression.lastIndex) {
		// 		regexExpression.lastIndex++;
		// 	}
		// 	debug(cleanupExtractionContent(match[1]));
		// 	extractionResults.push(cleanupExtractionContent(match[1]));
		// }
		let company = '!error parsing company name';
		if(match != null) {
			company = cleanupExtractionContent(match[1]);
			let matchedJobTitle = false;
			let filterJobTitles = parseConsts.jobTitleFilters;
			filterJobTitles.forEach((title) => {
				if(company.search(new RegExp(title)) != -1) {
					matchedJobTitle = true;
					debug('Not a company: ' + company + title);
				}
			});
			if (matchedJobTitle === true) {
				company = '!unable to parse company name';
			}
		}
		debug('Results: ' + company);

		resolve({url: commentUrl, rawText: plainText, company: company});
	}));
}

//return a list of postings stored in the database
exports.getPostingList = function(callback) {
	Posting.find().exec(callback);
}

//utilities
function unicodeToChar(text) {
   return text.replace(/\\u[\dA-F]{4}/gi, 
      function (match) {
           return String.fromCharCode(parseInt(match.replace(/\\u/g, ''), 16));
      });
}

function cleanupExtractionContent(string) {
	let cleanedMatch = string;
	cleanedMatch = cleanedMatch.replace(/\|/gi, '');
	cleanedMatch = cleanedMatch.replace(/<p>/gi, '');
	cleanedMatch = cleanedMatch.replace(/:/gi, '');
	cleanedMatch = cleanedMatch.replace(/,/gi, '');
	cleanedMatch = cleanedMatch.replace(/;/gi, '');
	cleanedMatch = cleanedMatch.replace(/\bis\b/gi, '');
	return entities.decode(cleanedMatch.trim());
}