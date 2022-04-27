import puppeteer from 'puppeteer';

const scrapDetailsOnOnePage = async (page, url) => {
	try {
		console.time('scrapDetailsOnOnePage');
		await page.goto(url);
		if ((await page.$('#job-description')) === null) {
			return;
		} else {
			const description = await page.evaluate(() => {
				return document.querySelector('#job-description').textContent;
			});
			console.timeEnd('scrapDetailsOnOnePage');
			return { description };
		}
	} catch (error) {
		console.log('Error in scrapDetailsOnOnePage: ', error);
	}
};

const scrapDetails = async (urls) => {
	try {
		console.time('scrapDetails');
		const browser = await puppeteer.launch({
			headless: true,
			args: ['--no-sandbox'],
		});
		const page = await browser.newPage();

		let results = [];
		for (let url of urls) {
			const details = await scrapDetailsOnOnePage(page, url);
			if (details !== null && details !== undefined) {
				results.push({
					url,
					description: details.description,
				});
			}
		}
		console.timeEnd('scrapDetails');
		return results;
	} catch (error) {
		console.log('Error in scrapDetails: ', error);
	}
};

export default scrapDetails;
