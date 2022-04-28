import scrapSummaries from './scrapSummaries.js';
import saveSummaries from './saveSummaries.js';

const getSummaries = async (nbDay) => {
	console.time('getSummaries');
	const summaries = await scrapSummaries(nbDay);
	await saveSummaries(summaries);
	console.timeEnd('getSummaries');
};

export default getSummaries;
