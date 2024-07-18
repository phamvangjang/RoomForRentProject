const scrapeCategory = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let page = await browser.newPage()
        console.log('>> Open new tab...');
        await page.goto(url)
        console.log('>>Access to...' + url)
        await page.waitForSelector('#webpage')
        console.log('>>Website was load done.')

        const dataCategory = await page.$$eval('#navbar-menu > ul > li',els =>{
            dataCategory=els.map(el=>{
                return {
                    category:el.querySelector('a').innerText,
                    link:el.querySelector('a').href
                }
            })
            return dataCategory
        })
        console.log(dataCategory)

        console.log('Tab was close')
        await page.close()
        resolve()
    } catch (error) {
        console.log('This is error in scrapeCategory: ' + error)
        reject(error)
    }
})

module.exports = {
    scrapeCategory
}