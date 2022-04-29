import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import getSummaries from './les-jeudis/getSummaries.js';
import getDetails from './les-jeudis/getDetails.js';
dotenv.config();
const MONGODB_URI = process.env.MONGODB_URI;

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log('Connected to database ');
	})
	.catch((err) => {
		console.error(`Error connecting to the database. \n${err}`);
	});

const app = express();

app.get('/api/actions/scrap/lesjeudis/summary', (req, res) => {
	const nbDay = req.query.nbDay;
	getSummaries(nbDay);
	res.send('scrapping summaries in progress');
});

app.get('/api/actions/scrap/lesjeudis/details', (req, res) => {
	getDetails();
	res.send('scrapping details in progress');
});

app.listen(process.env.PORT || 3000);
