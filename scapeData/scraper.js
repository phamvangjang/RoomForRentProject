const scrapeCategory = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let page = await browser.newPage()
        console.log('>> Open new tab...');
        await page.goto(url)
        console.log('>>Access to...' + url)
        await page.waitForSelector('#webpage')
        console.log('>>Website was load done.')

        const dataCategory = await page.$$eval('#navbar-menu > ul > li', els => {
            dataCategory = els.map(el => {
                return {
                    category: el.querySelector('a').innerText,
                    link: el.querySelector('a').href
                }
            })
            return dataCategory
        })

        console.log('Tab was close')
        await page.close()
        resolve(dataCategory)
    } catch (error) {
        console.log('This is error in scrapeCategory: ' + error)
        reject(error)
    }
})

const scraper = (browser, url) => new Promise(async (resolve, reject) => {
    try {
        let newPage = await browser.newPage();
        console.log('Opened new tab...')
        await newPage.goto(url)
        console.log('>> Accessed to page...' + url)
        await newPage.waitForSelector('#main')
        console.log('>>Was loading tag main...')

        const scrapeData = {}
        //get header
        const headerData = await newPage.$eval('header', (el) => {
            return {
                title: el.querySelector('h1').innerText,
                description: el.querySelector('p').innerText
            }
        })
        scrapeData.header = headerData

        //get link detail item
        const detailLink = await newPage.$$eval('#left-col > section.section-post-listing > ul > li', (els) => {
            detailLink = els.map(el => {
                return el.querySelector('.post-meta > h3 > a').href
            })
            return detailLink
        })

        // console.log(detailLink)
        const scraperDetail = async (link) => new Promise(async (resolve, reject) => {
            try {
                let pageDetail = await browser.newPage()
                await pageDetail.goto(link)
                console.log('>> Access ' + link)
                await pageDetail.waitForSelector('#main')

                const detailData = {}
                //start scraper
                //images scraper
                const images = await pageDetail.$$eval('#left-col > article > div.post-images > div > div.swiper-wrapper > div.swiper-slide', (els) => {
                    images = els.map(el => {
                        return el.querySelector('img')?.src
                    })
                    return images.filter(i => !i === false)
                })
                detailData.images = images
                // console.log(images)

                //get header detail
                const header = await pageDetail.$eval('header.page-header', (el) => {
                    return {
                        title: el.querySelector('h1 > a').innerText,
                        star: el.querySelector('h1 > span')?.className?.replace(/^\D+/g, ''),
                        //khong ton tai chuyen muc
                        // class: {
                        //     content: el.querySelector('p').innerText,
                        //     classType: el.querySelector('p > a > strong').innerText
                        // },
                        address: el.querySelector('address').innerText,
                        attributes: {
                            price: el.querySelector('div.post-attributes > .price > span').innerText,
                            acreage: el.querySelector('div.post-attributes > .acreage > span').innerText,
                            published: el.querySelector('div.post-attributes > .published > span').innerText,
                            hashtag: el.querySelector('div.post-attributes > .hashtag > span').innerText
                        }
                    }
                })
                // console.log(header)
                detailData.header = header

                //infor desc
                const mainContent = {}
                const mainContentHeader = await pageDetail.$eval('#left-col > article.the-post > section.post-main-content', (el) => el.querySelector('div.section-header > h2').innerText)

                const mainContentContent = await pageDetail.$$eval('#left-col > article.the-post > section.post-main-content > .section-content > p', (els) => els.map(el => el.innerText))

                // console.log(mainContentHeader)
                // console.log(mainContentContent)
                detailData.mainContent = {
                    header: mainContentHeader,
                    content: mainContentContent
                }

                //overview features
                const overviewHeader = await pageDetail.$eval('#left-col > article.the-post > section.post-overview', (el) => el.querySelector('div.section-header > h3').innerText)

                const overviewContent = await pageDetail.$$eval('#left-col > article.the-post > section.post-overview > .section-content > table.table > tbody > tr', (els) => els.map(el => ({
                    name: el.querySelector('td:first-child').innerText,
                    content: el.querySelector('td:last-child').innerText,
                })))

                // console.log(overviewHeader)
                // console.log(overviewContent)
                detailData.mainContent = {
                    header: overviewHeader,
                    content: overviewContent
                }


                //infor contact
                const contactHeader = await pageDetail.$eval('#left-col > article.the-post > section.post-contact', (el) => el.querySelector('div.section-header > h3').innerText)

                const contactContent = await pageDetail.$$eval('#left-col > article.the-post > section.post-contact > .section-content > table.table > tbody > tr', (els) => els.map(el => ({
                    name: el.querySelector('td:first-child').innerText,
                    content: el.querySelector('td:last-child').innerText,
                })))

                // console.log(contactHeader)
                // console.log(contactContent)
                detailData.contact = {
                    header: contactHeader,
                    content: contactContent
                }
                // console.log(detailData.contact)


                await pageDetail.close()
                console.log('>> Tab was close...')
                resolve(detailData)
            } catch (error) {
                console.log('this error in scraperDetail: ' + error)
                reject(error)
            }
        })

        const details = []

        for (let link of detailLink) {
            const detail = await scraperDetail(link)
            details.push(detail)
        }

        scrapeData.body = details

        // await browser.close()
        console.log('>>Browser was close...')
        resolve(scrapeData)
    } catch (error) {
        reject(error)
    }
})

module.exports = {
    scrapeCategory,
    scraper
}