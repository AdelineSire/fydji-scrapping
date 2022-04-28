import scrapSummaries from './scrapSummaries.js';
import saveSummaries from './saveSummaries.js';

const getSummaries = async (nbDay) => {
	const summaries = await scrapSummaries(nbDay);
	await saveSummaries(summaries);
};

export default getSummaries;
