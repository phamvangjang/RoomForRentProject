const db = require('../models')
const bcrypt = require('bcrypt')
const { v4 } = require('uuid')
require('dotenv').config()
// const chothuecanho = require('../../data/chothuecanho.json')
const nhachothue = require('../../data/nhachothue.json')
const dataBody = nhachothue.body
const { generateCode } = require('../ultils/generateCode')
const { dataPrice, dataArea } = require('../ultils/data')
const { getNumberFromString } = require('../ultils/common')

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

const insertService = () => new Promise(async (resolve, reject) => {
    try {
        dataBody.forEach(async (item) => {
            let postId = v4()
            let labelCode = generateCode(item?.header?.class?.classType)
            let attributesId = v4()
            let userId = v4()
            let overviewId = v4()
            let imagesId = v4()
            let currentArea = getNumberFromString(item?.header?.attributes?.acreage)
            let currentPrice = getNumberFromString(item?.header?.attributes?.price)
            await db.Post.create({
                id: postId,
                title: item?.header?.title,
                star: item?.header?.star,
                labelCode,
                address: item?.header?.address,
                attributesId,
                categoryCode: 'CTCH',
                description: JSON.stringify(item?.mainContent?.content),
                userId,
                overviewId,
                imagesId,
                priceCode: dataPrice.find(price => price.max > currentPrice && price.min <= currentPrice)?.code,
                areaCode: dataArea.find(area => area.max > currentArea && area.min <= currentArea)?.code
            })
            await db.Attribute.create({
                id: attributesId,
                price: item?.header?.attributes?.price,
                acreage: item?.header?.attributes?.acreage,
                published: item?.header?.attributes?.published,
                hashtag: item?.header?.attributes?.hashtag
            })
            await db.Image.create({
                id: imagesId,
                image: JSON.stringify(item?.images),
            })
            await db.Label.findOrCreate({
                where: { code: labelCode },
                defaults: {
                    code: labelCode,
                    value: item?.header?.class?.classType
                }
            })
            await db.Overview.create({
                id: overviewId,
                code: item?.mainContent?.content.find(i => i.name === "Mã tin:")?.content,
                area: item?.mainContent?.content.find(i => i.name === "Khu vực")?.content,
                type: item?.mainContent?.content.find(i => i.name === "Loại tin rao:")?.content,
                target: item?.mainContent?.content.find(i => i.name === "Đối tượng thuê:")?.content,
                bonus: item?.mainContent?.content.find(i => i.name === "Gói tin:")?.content,
                created: item?.mainContent?.content.find(i => i.name === "Ngày đăng:")?.content,
                expire: item?.mainContent?.content.find(i => i.name === "Ngày hết hạn:")?.content,
            })
            await db.User.create({
                id: userId,
                name: item?.contact?.content.find(i => i.name === "Liên hệ:")?.content,
                password: hashPassword('123456'),
                phone: item?.contact?.content.find(i => i.name === "Điện thoại:")?.content,
                zalo: item?.contact?.content.find(i => i.name === "Zalo")?.content,
            })
        })
        resolve('Done Insert Data')
    } catch (error) {
        reject(error)
    }
})
const createPricesAndAreas = () => new Promise(async (resolve, reject) => {
    try {
        dataPrice.forEach(async (item, index) => {
            await db.Price.create({
                code: item.code,
                value: item.value,
                order: index + 1
            })
        })
        dataArea.forEach(async (item, index) => {
            await db.Area.create({
                code: item.code,
                value: item.value,
                order: index + 1
            })
        })
        resolve('done')
    } catch (error) {
        reject(error)
    }
})
module.exports = {
    insertService,
    createPricesAndAreas
}