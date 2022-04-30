import JobRaw from '../jobRawModel.js';

const saveDetails = async (details) => {
	try {
		console.log('details.length in saveDetails : ', details.length);
		console.time('saveDetails');
		for (let detail of details) {
			if (detail.description) {
				const job = await JobRaw.findOne({ url: detail.url });
				job.description = detail.description;
				await job.save();
			} else {
				await Job.deleteOne({ url: detail.url });
			}
		}
		console.timeEnd('saveDetails');
	} catch (error) {
		console.log('Error in saveDetails: ', error);
	}
};

export default saveDetails;
