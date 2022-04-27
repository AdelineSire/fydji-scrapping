import getDetailsUrls from './getDetailsUrls.js';
import scrapDetails from './scrapDetails.js';
import saveDetails from './saveDetails.js';

const getDetails = async () => {
	console.time('getDetails');
	const urls = await getDetailsUrls();
	const details = await scrapDetails(urls);
	await saveDetails(details);
	console.timeEnd('getDetails');
};

export default getDetails;
