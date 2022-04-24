import JobRaw from '../jobRawModel.js';

const saveDetails = async (details) => {
	try {
		for (let detail of details) {
			const job = await JobRaw.findOne({ url: detail.url });
			console.log('job in saveDetails: ', job);
			job.description = detail.description;
			await job.save();
		}
	} catch (error) {
		console.log('Error in saveDetails: ', error);
	}
};

export default saveDetails;
