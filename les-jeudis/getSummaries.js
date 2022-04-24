import scrapSummaries from './scrapSummaries.js';
import saveSummaries from './saveSummaries.js';

const getSummaries = async () => {
	const summaries = await scrapSummaries();
	await saveSummaries(summaries);
};

export default getSummaries;
