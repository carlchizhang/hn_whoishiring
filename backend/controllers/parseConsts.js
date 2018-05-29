exports.companyRegex = /((\||^).+?(\||<p>|:|;|,|\bis\b|<|\(| - ))/gi;
exports.firstLineRegex = /(^).*?(<p>)/g;
exports.jobTitleFilters = [/engineers?\b/i, /developers?\b/i, /scientists?\b/i, /interns?\b/i, /administrators?\b/i, /managers?\b/i, /leads?\b/i, /devops\b/i];

exports.jobPositions = {
	intern: {
		tag: 'intern',
		regexes: [/\bintern(s|ship)?\b/i]
	},
	engineering: {
		tag: 'engineering',
		regexes: [/\bengineer(s|ing)?\b/i, /\bdevelopers?\b/i, /\bsoftware\b/i]
	},
	research: {
		tag: 'research',
		regexes: [/\bscientists?\b/i, /\bresearch\b/i]
	},
	data: {
		tag: 'data science',
		regexes: [/\b(data).{0,9}(analysts?|engineers?|engineering|science|scientists?)\b/i]
	},
	ai: {
		tag: 'AI/ML',
		regexes: [/\b(artificial|machine|deep).{0,9}(intelligence|learning)\b/i, /\bai|ml\b/i]
	},
	management: {
		tag: 'management',
		regexes: [/\bPM\b/, /\bdirector\b/i, /\b(product).{0,9}(manage(ment|rs?))\b/i, /\b(tech(nical)?|web|team)?.{0,9}(leads?)\b/i]
	},
	design: {
		tag: 'design',
		regexes: [/\bdesign(er)?s?\b/i]
	},
	sales: {
		tag: 'sales',
		regexes: [/\bmarketing\b/i, /\b(technical).{0,9}(sales)\b/i]
	},
	operations: {
		tag: 'operations',
		regexes: [/\bdevops\b/i, /\b(sys|systems?).{0,9}(admins?|administration)\b/i, /\bsre\b/i, /\b(site).{0,9}(reliability)\b/i]
	},
	systems: {
		tag: 'systems',
		regexes: [/\b(systems)\b/i, /\b(kernel)\b/i, /\binfrastructure\b/i]
	},
	security: {
		tag: 'security',
		regexes: [/security\b/i]
	},
	fullStack: {
		tag: 'full-stack',
		regexes: [/\b(full).{0,9}(stack)\b/i]
	},
	frontEnd: {
		tag: 'front-end',
		regexes: [/\b(front).{0,9}(end)\b/i]
	},
	backEnd: {
		tag: 'back-end',
		regexes: [/\b(back).{0,9}(end)\b/i]
	},
	web: {
		tag: 'web',
		regexes: [/\bweb\b/i]
	},
	desktop: {
		tag: 'desktop',
		regexes: [/\bdesktop\b/i, /\b(windows)\b/i]
	},
	mobile: {
		tag: 'mobile',
		regexes: [/\b(mobile)\b/i, /\b(android)\b/i, /\b(ios)\b/i, /\b(windows).{0,9}(phone)\b/i, /\b(blackberry).{0,9}(os)\b/i]
	},
	embedded: {
		tag: 'embedded',
		regexes: [/\b(embedded)\b/i, /\b(kernel)\b/i]
	},
	hardware: {
		tag: 'hardware',
		regexes: [/\b(hardware)\b/i, /\b(electronics)\b/i]
	},
}

exports.languages = {}