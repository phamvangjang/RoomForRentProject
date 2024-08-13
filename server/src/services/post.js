const db = require('../models')
const getPostsLimitService = (page, query) => new Promise(async (resolve, reject) => {
    try {
        let offset = (!page || +page <= 1) ? 0 : (+page - 1)
        const response = await db.Post.findAndCountAll({
            where: query,
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
module.exports = {
    getPostsLimitService,
    getNewPostsService
}