const db = require('../models')
const { Op } = require('sequelize')
const { v4 } = require('uuid')
const moment = require('moment')
require('moment/locale/vi');
const { generateCode } = require('../ultils/generateCode');

const getPostsLimitService = (page, { limitPost, order, ...query }, { priceNumber, areaNumber }) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const queries = { ...query }
        const limit = +limitPost ? +limitPost : +process.env.LIMIT
        queries.limit = limit
        if (priceNumber) {
            query.priceNumber = { [Op.between]: priceNumber }
        }
        if (areaNumber) {
            query.areaNumber = { [Op.between]: areaNumber }
        }
        if (order) {
            queries.order = [order]
        }
        const response = await db.Post.findAndCountAll({
            where: query,
            raw: true,
            nest: true,
            offset: offset * limit,
            ...queries,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
                { model: db.Overview, as: 'overviews' }
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
        const labelCode = generateCode(body.label)
        const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`
        const currentDate = new Date()
        await db.Post.create({
            id: v4(),
            title: body?.title,
            labelCode,
            address: body?.address,
            attributesId,
            categoryCode: body?.categoryCode,
            description: JSON.stringify(body?.description),
            userId,
            overviewId,
            imagesId,
            areaCode: body?.areaCode,
            priceCode: body?.priceCode,
            priceNumber: body?.priceNumber,
            areaNumber: body?.areaNumber,
            provinceCode: body?.province?.includes('Thành phố')
                ? generateCode(body?.province?.replace('Thành phố ', ''))
                : generateCode(body?.province?.replace('Tỉnh ', ''))
        })
        await db.Attribute.create({
            id: attributesId,
            price: +body?.priceNumber < 1 ? `${+body?.priceNumber * 1000000} đồng/tháng` : `${body?.priceNumber} triệu/tháng`,
            acreage: `${+body?.areaNumber} m2`,
            published: moment(currentDate).fromNow().toString(),
            hashtag
        })
        await db.Image.create({
            id: imagesId,
            image: JSON.stringify(body?.images),
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
        await db.Overview.create({
            id: overviewId,
            code: hashtag,
            area: body?.area?.includes('Thành phố')
                ? body?.area?.replace('Thành phố ', '')
                : body?.area?.replace('Tỉnh ', ''),
            type: body.categoryCode,
            target: body.target,
            bonus: 'Tin thường',
            created: currentDate,
            expire: moment(currentDate).add(10, 'd').toDate()
        })
        await db.Province.findOrCreate({
            where: {
                [Op.or]: [
                    { value: body?.province?.replace('Thành phố ', '') },
                    { value: body?.province?.replace('Tỉnh ', '') },
                ]
            },
            defaults: {
                code: body?.province?.includes('Thành phố')
                    ? generateCode(body?.province?.replace('Thành phố ', ''))
                    : generateCode(body?.province?.replace('Tỉnh ', '')),
                value: body?.province?.includes('Thành phố')
                    ? body?.province?.replace('Thành phố ', '')
                    : body?.province?.replace('Tỉnh ', '')
            }
        })
        resolve({
            success: true,
            msg: 'Create new post successfully',
        })
    } catch (error) {
        reject(error)
    }
})

const getPostsLimitAdminService = (page, id, query) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const queries = { ...query, userId: id }
        const response = await db.Post.findAndCountAll({
            where: queries,
            raw: true,
            nest: true,
            order: [['createdAt', 'DESC']],
            offset: offset * (+process.env.LIMIT),
            limit: +process.env.LIMIT,
            include: [
                { model: db.Image, as: 'images', attributes: ['image'] },
                { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
                { model: db.Overview, as: 'overviews' },
                { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] }
            ],
            //attributes: ['id', 'title', 'star', 'address', 'description']
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

const updatePostService = (postId, attributesId, imagesId, overviewId, body) => new Promise(async (resolve, reject) => {
    try {
        const labelCode = generateCode(body.label)
        await db.Post.update({
            title: body?.title,
            labelCode,
            address: body?.address,
            categoryCode: body?.categoryCode,
            description: JSON.stringify(body?.description),
            areaCode: body?.areaCode,
            priceCode: body?.priceCode,
            priceNumber: body?.priceNumber,
            areaNumber: body?.areaNumber,
            provinceCode: body?.province?.includes('Thành phố')
                ? generateCode(body?.province?.replace('Thành phố ', ''))
                : generateCode(body?.province?.replace('Tỉnh ', ''))
        }, {
            where: { id: postId }
        })
        await db.Attribute.update({
            price: +body?.priceNumber < 1 ? `${+body?.priceNumber * 1000000} đồng/tháng` : `${body?.priceNumber} triệu/tháng`,
            acreage: `${+body?.areaNumber} m2`
        }, {
            where: { id: attributesId }
        })
        await db.Image.update({
            image: JSON.stringify(body?.images),
        }, {
            where: { id: imagesId }
        })
        await db.Overview.update({
            code: hashtag,
            area: body?.area?.includes('Thành phố')
                ? body?.area?.replace('Thành phố ', '')
                : body?.area?.replace('Tỉnh ', ''),
            type: body.categoryCode,
            target: body.target,
            updatedAt: currentDate
        }, {
            where: { id: overviewId }
        })
        await db.Province.findOrCreate({
            where: {
                [Op.or]: [
                    { value: body?.province?.replace('Thành phố ', '') },
                    { value: body?.province?.replace('Tỉnh ', '') },
                ]
            },
            defaults: {
                code: body?.province?.includes('Thành phố')
                    ? generateCode(body?.province?.replace('Thành phố ', ''))
                    : generateCode(body?.province?.replace('Tỉnh ', '')),
                value: body?.province?.includes('Thành phố')
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
            success: true,
            msg: 'Updated post successfully'
        })
    } catch (error) {
        reject(error)
    }
})

const deletePostService = (postId) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Post.destroy({
            where: { id: postId }
        })
        resolve({
            error: response > 0 ? 0 : 1,
            success: response > 0 ? true : false,
            msg: response > 0 ? 'Deleted post successfully' : 'Failed to delete post'
        })
    } catch (error) {
        reject(error)
    }
})
module.exports = {
    getPostsLimitService,
    getNewPostsService,
    createNewPostService,
    getPostsLimitAdminService,
    updatePostService,
    deletePostService
}