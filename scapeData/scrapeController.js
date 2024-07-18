const scrapers = require('./scraper')

const scrapeController = async (browserInstance) => {
    const url = 'https://phongtro123.com/'
    try {
        let browser = await browserInstance;
        let categories = scrapers.scrapeCategory(browser, url)
    } catch (error) {
        console.log('This error is scrapeController: ' + error)
    }
}

module.exports = scrapeController;