var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var PostingSchema = new Schema(
	{
		company: {type: String, required: true, max: 100},
		location: {type: String, required: true, max: 100},
		costOfLivingIndex: {type: Number, min: 0},
		jobTitle: {type: String, required: true, max: 100},
		salary: {type: Number, min: 0},
		tags: [String],

		postingText: {type: String, required: true},
		postingUrl: {type: String, required: true, max: 100},

		companyRating: {type: Number, min: 0, max: 5},
		companySize: {type: Number, min: 0},
		companyRevenue: {type: Number, min: 0},
		companyIndustry: [String]
	}
);

PostingSchema
.virtual('url')
.get(function () {
	return '/api/posting/' + this._id;
});

module.exports = mongoose.model('Posting', PostingSchema);