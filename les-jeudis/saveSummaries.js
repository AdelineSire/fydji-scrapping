import JobRaw from '../jobRawModel.js';

const saveSummaries = async (jobs) => {
	for (let job of jobs) {
		let exists = (await JobRaw.find({ url: job.url }).count()) > 0;
		if (exists === false) {
			const newjob = new JobRaw(job);
			newjob.save().catch((error) => console.log('error', error));
		}
	}
};

export default saveSummaries;
