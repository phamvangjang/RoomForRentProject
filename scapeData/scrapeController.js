const scrapers = require('./scraper')
const fs = require('fs')

const scrapeController = async (browserInstance) => {
    const url = 'https://phongtro123.com/'
    const indexs = [1, 2, 3, 4]
    try {
        let browser = await browserInstance;
        const categories = await scrapers.scrapeCategory(browser, url)

        const selectedCategories = categories.filter((category, index) => indexs.some(i => i === index))
        console.log(selectedCategories)

        // let result = await scrapers.scraper(browser, selectedCategories[0].link)
        // fs.writeFile('chothuephongtro.json', JSON.stringify(result), (err) => {
        //     if (err) console.log('write data to file json failed ' + err)
        //     console.log('write data to file json success ')   
        // })

        let result2 = await scrapers.scraper(browser, selectedCategories[1].link)
        fs.writeFile('nhachothue.json', JSON.stringify(result2), (err) => {
            if (err) console.log('write data to file json failed ' + err)
            console.log('write data to file json success ')   
        })

        let result3 = await scrapers.scraper(browser, selectedCategories[2].link)
        fs.writeFile('chothuecanho.json', JSON.stringify(result3), (err) => {
            if (err) console.log('write data to file json failed ' + err)
            console.log('write data to file json success ')   
        })

        let result4 = await scrapers.scraper(browser, selectedCategories[3].link)
        fs.writeFile('chothuematbang.json', JSON.stringify(result4), (err) => {
            if (err) console.log('write data to file json failed ' + err)
            console.log('write data to file json success ')   
        })

        await browser.close()
    } catch (error) {
        console.log('This error in scrapeController: ' + error)
    }
}

module.exports = scrapeController;