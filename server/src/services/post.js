const db = require('../models')
const { Op } = require('sequelize')
const { v4 } = require('uuid')
const { moment } = require('moment')
const { generateCode } = require('../ultils/generateCode')
const getPostsLimitService = (page, query, { priceNumber, areaNumber }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const queries = { ...query }
        if (priceNumber) {
            queries.priceNumber = { [Op.between]: priceNumber }
        }
        if (areaNumber) {
            queries.areaNumber = { [Op.between]: areaNumber }
        }
        const response = await db.Post.findAndCountAll({
            where: queries,
            raw: true,
            nest: true,
            offset: offset * (+process.env.LIMIT),
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
            ],
            attributes: ['id', 'title', 'star', 'address', 'description']
        })
        resolve({
            success: response ? true : false,
            msg: response ? 'Get posts successfully' : 'Can not get posts',
            response
        })
    } catch (error) {
        reject(error)
    }
})
const getNewPostsService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.findAll({
            raw: true,
            nest: true,
            offset: 0,
            order: [['createdAt', 'DESC']],
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
            ],
            attributes: ['id', 'title', 'star', 'createdAt']
        })
        resolve({
            success: response ? true : false,
            msg: response ? 'Get posts successfully' : 'Can not get posts',
            response
        })
    } catch (error) {
        reject(error)
    }
})
const createNewPostService = (body, userId) => new Promise(async (resolve, reject) => {
    try {
        const attributesId = v4()
        const imagesId = v4()
        const overviewId = v4()
        const labelCode = v4(body.label)
        const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`
        const currentDate = new Date()
        await db.Post.create({
            id: v4(),
            title: body.title,
            labelCode,
            address: body.address || '',
            attributesId,
            categoryCode: body.categoryCode,
            description: body.description || '',
            userId,
            overviewId,
            imagesId,
            areaCode: body.areaCode || '',
            priceCode: body.priceCode || '',
            priceNumber: body.priceNumber,
            areaNumber: body.areaNumber,
            provinceCode: body.provinceCode || ''
        })
        await db.Attribute.create({
            id: attributesId,
            price: +priceNumber < 1 ? `${+priceNumber * 1000000} đồng/tháng` : `${priceNumber} triệu/tháng`,
            acreage: `${areaNumber} m2`,
            published: moment(new Date).format('DD/MM/YYYY'),
            hashtag
        })
        await db.Image.create({
            id: imagesId,
            image: JSON.stringify(body?.images),
        })
        await db.Overview.create({
            id: overviewId,
            code: hashtag,
            area: body.label,
            type: body.category,
            target: body.target,
            bonus: 'Tin thường',
            created: currentDate,
            expire: currentDate.setDate(currentDate.getDate() + 10),
        })
        await db.Province.findOrCreate({
            where: {
                [Op.or]: [
                    { value: body?.province?.replace('Thành phố ', '') },
                    { value: body?.province?.replace('Tỉnh ', '') },
                ]
            },
            defaults: {
                code: body?.province?.include('Thành phố')
                    ? generateCode(body?.province?.replace('Thành phố ', ''))
                    : generateCode(body?.province?.replace('Tỉnh ', '')),
                value: body?.province?.include('Thành phố')
                    ? body?.province?.replace('Thành phố ', '')
                    : body?.province?.replace('Tỉnh ', '')
            }
        })
        await db.Label.findOrCreate({
            where: {
                code: labelCode
            },
            defaults: {
                code: labelCode,
                value: body.label
            }
        })
        resolve({
            success: response ? true : false,
            msg: response ? 'Create new post successfully' : 'Create new post was failed',
            response
        })
    } catch (error) {
        reject(error)
    }
})
module.exports = {
    getPostsLimitService,
    getNewPostsService,
    createNewPostService
}