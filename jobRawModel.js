import mongoose from 'mongoose';

const jobRawSchema = new mongoose.Schema({
	title: String,
	url: String,
	date: String,
	collectDate: Date,
	company: String,
	city: String,
	salary: String,
	contract: String,
	tags: [String],
	description: String,
});
const JobRaw = mongoose.model('JobRaw', jobRawSchema);
export default JobRaw;
