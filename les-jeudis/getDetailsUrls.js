import JobRaw from '../jobRawModel.js';

const getDetailsUrls = async () => {
	try {
		console.time('getDetailsUrls');
		const jobs = await JobRaw.find({ description: null }).exec();
		const urls = jobs.map((job) => job.url);
		console.log('urls.length getDetailsUrls : ', urls.length);
		console.timeEnd('getDetailsUrls');
		return urls;
	} catch (error) {
		console.log('Error in getDetailsUrls: ', error);
	}
};

export default getDetailsUrls;
