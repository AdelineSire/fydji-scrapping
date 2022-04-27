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

app.get('/api/actions/scrap/lesjeudis/summary', async (req, res) => {
	console.time('scrap summary');
	await getSummaries();
	console.timeEnd('scrap summary');
	res.send('scrap 1 terminé');
});

app.get('/api/actions/scrap/lesjeudis/details', async (req, res) => {
	console.time('scrap detail');
	await getDetails();
	console.timeEnd('scrap detail');
	res.send('scrap 2 terminé');
});

app.listen(process.env.PORT || 3000);
