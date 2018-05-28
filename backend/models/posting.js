var mongoose = require('mongoose');

var Schema = mongoose.Schema;

const HN_API_ADDRESS = process.env.HN_API_URI || 'https://hacker-news.firebaseio.com/v0/';

var PostingSchema = new Schema(
	{
		postingId: {type: Number, required: true, index: true, unique: true},
		postingText: {type: String, required: true},
		postingDate: {type: Date, required: true},

		company: {type: String, maxlength: 100},
		location: {type: String, maxlength: 100},
		costOfLivingIndex: {type: Number, min: 0},
		position: [String],
		salary: {type: String, max: 100},
		tags: [String],

		//not implemented yet
		// companyRating: {type: Number, min: 0, max: 5},
		// companySize: {type: Number, min: 0},
		// companyRevenue: {type: Number, min: 0},
		// companyIndustry: [String]
	}
);

PostingSchema
.virtual('url')
.get(function () {
	return '/api/posting/' + this._id;
});

PostingSchema
.virtual('postingUrl')
.get(function () {
	return HN_API_ADDRESS + 'item/' + this.postingId + '.json';
});

module.exports = mongoose.model('Posting', PostingSchema);