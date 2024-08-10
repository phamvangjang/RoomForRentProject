const asyncHandler = require('express-async-handler')
const db = require('../models')

const getPosts = asyncHandler(async (req, res) => {
    const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
            { model: db.Image, as: 'images', attributes: ['image'] },
            { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
            { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
        ],
        attributes: ['id', 'title', 'star', 'address', 'description']
    })
    return res.json({
        success: response ? true : false,
        msg: response ? 'Get posts successfully' : 'Can not get posts',
        response
    })
})

const getPostsLimitService = asyncHandler(async (req, res) => {
    const { page } = req.query
    const response = await db.Post.findAndCountAll({
        raw: true,
        nest: true,
        page: page*(+process.env.LIMIT) || 0,
        limit: +process.env.LIMIT,
        include: [
            { model: db.Image, as: 'images', attributes: ['image'] },
            { model: db.Attribute, as: 'attributes', attributes: ['price', 'acreage', 'published', 'hashtag'] },
            { model: db.User, as: 'user', attributes: ['name', 'zalo', 'phone'] },
        ],
        attributes: ['id', 'title', 'star', 'address', 'description']
    })
    return res.json({
        success: response ? true : false,
        msg: response ? 'Get posts limit successfully' : 'Can not get posts limit',
        response
    })
})

module.exports = {
    getPosts,
    getPostsLimitService
}