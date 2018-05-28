
function cleanupExtractionContent(string) {
	let cleanedMatch = string;
	cleanedMatch = cleanedMatch.replace(/\|/g, '');
	cleanedMatch = cleanedMatch.replace(/<p>/g, '');
	return cleanedMatch.trim();
}

function test() {
	var text = 'Internet Archive, archive.org | Senior Web Developer | San Francisco, CA or Remote - Full Time<p>The Senior Web Developer will be responsible for maintaining and building new functionality for our web archiving services.<p>Maintenance and development of backend and API systems written in Django&#x2F;Python, Maintenance of an application frontend written in Javascript&#x2F;AngularJS (1.x) Migration of a large Java codebase and legacy deployment systems to Python and Ansible Configuration and monitoring of complex distributed applications Contribute to development of tools for automated deployment and monitoring of production systems. Demonstrated experience delivering complex development projects, managing multiple deadlines and projects simultaneously, and working in a collaborative team of engineers and project&#x2F;product managers.<p>Skills &amp; Requirements<p>3-4 years of experience in Python and Unix&#x2F;Linux shell 3-4 years of experience in frontend&#x2F;Javascript coding Solid experience in Internet protocols (HTTP is must.) Strong knowledge of HTML, JavaScript and Web technologies in general Ability to work in, and enjoy, a loosely structured work environment<p>To apply please email cover letter, salary expectations, and resume to jkafader[at]archive[.]org. Full job description: <a href="https:&#x2F;&#x2F;archive.org&#x2F;about&#x2F;jobs" rel="nofollow">https:&#x2F;&#x2F;archive.org&#x2F;about&#x2F;jobs</a>';

	var regexExpression = /(?=((\||^).+?(\||<p>)))/g;;
	var extractionResults = [];
	var match;
	while ((match = regexExpression.exec(text)) != null ) { 
		if(match.index === regexExpression.lastIndex) {
			regexExpression.lastIndex++;
		}
		console.log(cleanupExtractionContent(match[1]));
		extractionResults.push(cleanupExtractionContent(match[1]));
	}
	console.log('Results: ' + extractionResults);
}

test();