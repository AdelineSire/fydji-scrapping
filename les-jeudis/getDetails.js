import getDetailsUrls from './getDetailsUrls.js';
import scrapDetails from './scrapDetails.js';
import saveDetails from './saveDetails.js';

const getDetails = async () => {
	const urls = await getDetailsUrls();
	const details = await scrapDetails(urls);
	await saveDetails(details);
};

export default getDetails;
