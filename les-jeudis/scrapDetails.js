import puppeteer from 'puppeteer';

const scrapDetailsOnOnePage = async (page, url) => {
	try {
		await page.goto(url);
		if ((await page.$('#job-description')) === null) {
			return;
		} else {
			const description = await page.evaluate(() => {
				return document.querySelector('#job-description').textContent;
			});
			return { description };
		}
	} catch (error) {
		console.log('Error in scrapDetailsOnOnePage: ', error);
	}
};

const scrapDetails = async (urls) => {
	try {
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
		return results;
	} catch (error) {
		console.log('Error in scrapDetails: ', error);
	}
};

export default scrapDetails;
