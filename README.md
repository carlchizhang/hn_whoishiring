# What is YCHiring?
[YCHiring](http://www.ychiring.me/)
Each month, a post is made on [Hacker News](http://news.ycombinator.com) containing tech employers looking to hire.

Unforunately, the Hacker News [whoishiring posts](https://news.ycombinator.com/submitted?id=whoishiring) aren't in a very easy to browse format.
They are sorted by popularity rather than time, you have to manually page through all the job posts in text form, and there's no easy way to search for terms.

I built YCHiring as an easier way to browse these posts. The whoishiring posts are pre-parsed to extract useful information, sorted by time, and displayed in a convenient card format. YCHiring also provides easy filtering options such as regular expressions and pre-parsed tags.

## About the code

There's two parts to YCHiring's codebase - a front-end built in React & Redux, as well as a back-end built using Node.js, Express.js & MongoDB.

All retrieving and parsing of comments is done via the Express backend. Data is fetched from the [HackerNews API](https://github.com/HackerNews/API) at a set time interval. The raw text is fed through a RegEx parsing pipeline to extract stuff like company name, location, job roles, and salary information. The parsed info is then stored in MongoDB. All the relevant parsing RegExes are in [parseConsts.js](https://github.com/carlchizhang/ychiring/blob/master/backend/controllers/parseConsts.js).

The front-end fetches all parsed postings from the back-end and handles the sorting of parsed data, searching with the various filters, favoriting posts etc.

## Building the code

Start the Express server by running npm install && npm run devstart in the back-end directory.

Start the React app by running npm install && npm start in the front-end directory. The API requests should already be setup to proxy to the Express server.

That's it!
