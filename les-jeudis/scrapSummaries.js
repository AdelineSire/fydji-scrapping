import dotenv from 'dotenv';
import puppeteer from 'puppeteer';
dotenv.config();
const DOMAIN = process.env.DOMAIN;
const collectDate = new Date();

const scrapSummaries = async () => {
	const browser = await puppeteer.launch({
		headless: true,
		args: ['--no-sandbox'],
	});
	const page = await browser.newPage();

	const scrapSummaryOnOnePage = async () => {
		try {
			const evaluatedJobs = await page.evaluate(
				(DOMAIN, collectDate) => {
					const jobs = [];
					document.querySelectorAll('.job-info').forEach((jobEl) => {
						const title = jobEl.querySelector('.job-title').innerText;
						const url = `${DOMAIN}${jobEl
							.querySelector('.job-title')
							.getAttribute('href')}`;
						const date = jobEl.querySelector('.date').innerText;

						let company = '';
						let city = '';
						let salary = '';
						let contract = '';

						jobEl
							.querySelectorAll('.snapshot > .snapshot-item')
							.forEach((el) => {
								const icon = el.querySelector('i');

								if (icon.className === 'fa fa-building-o') {
									company = el.querySelector('a').innerText;
								} else if (icon.className === 'fa fa-map-marker') {
									city = el.innerText;
								} else if (icon.className === 'fa bubble-icon fa-eur') {
									salary = el.innerText;
								} else if (icon.className === 'fa fa-suitcase') {
									contract = el.innerText;
								} else {
									return;
								}
							});

						let tags = [];

						jobEl.querySelectorAll('.tags > a.tag').forEach((el) => {
							const tag = el.innerText;
							tags.push(tag);
						});

						jobs.push({
							title: title,
							url: url,
							date: date,
							collectDate,
							company,
							city,
							salary,
							contract,
							tags,
						});
					});
					return jobs;
				},
				DOMAIN,
				collectDate
			);
			jobs = jobs.concat(evaluatedJobs);
		} catch (error) {
			console.log('Error in getJobsInOnePage: ', error);
		}
	};

	const checkForModal = async () => {
		try {
			if (hasOpened === false) {
				const selector = '.remodal-is-opened .remodal-close';
				await page.waitForTimeout(5000);
				const modalEl = await page.$(selector);
				if (modalEl !== null) {
					await page.click(selector);
					hasOpened = true;
				}
			}
		} catch (error) {
			console.log('Error in checkForModal: ', error);
		}
	};

	const checkIfLastPage = async () => {
		await page.waitForSelector('#jrp-pagination');
		try {
			const selector = 'i.fa.fa-chevron-right.show-mobile';
			const btnArrow = await page.$(selector);
			if (btnArrow !== null) {
				return false;
			} else {
				return true;
			}
		} catch (error) {
			console.log('Error in checkIfLastPage: ', error);
		}
	};

	let jobs = [];
	let hasOpened = false;
	let currentPage = 1;
	let isLastPage = false;

	do {
		await page.goto(`${DOMAIN}/recherche?pg=${currentPage}&posted=1`);
		await checkForModal();
		await scrapSummaryOnOnePage();
		isLastPage = await checkIfLastPage();
		currentPage = currentPage + 1;
	} while (isLastPage === false);

	return jobs;
};

export default scrapSummaries;
