import JobRaw from '../jobRawModel.js';

const getDetailsUrls = async () => {
	try {
		const jobs = await JobRaw.find({}).exec();
		const urls = jobs.map((job) => job.url);
		return urls;
	} catch (error) {
		console.log('Error in getDetailsUrls: ', error);
	}
};

export default getDetailsUrls;
