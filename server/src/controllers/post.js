const asyncHandler = require('express-async-handler')
const postService = require('../services/post')
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

const getPostsLimit = asyncHandler(async (req, res) => {
    const { page, priceNumber, areaNumber, ...query } = req.query
    try {
        const response = await postService.getPostsLimitService(page, query, { priceNumber, areaNumber })
        return res.status(200).json(response)
    } catch (error) {
        return res.json({
            success: false,
            msg: 'Can not get posts limit'
        })
    }
})

const getNewPosts = asyncHandler(async (req, res) => {
    try {
        const response = await postService.getNewPostsService()
        return res.status(200).json(response)
    } catch (error) {
        return res.json({
            success: false,
            msg: 'Can not get new posts'
        })
    }
})

const createNewPost = asyncHandler(async (req, res) => {
    try {
        const { id } = req.user
        const response = await postService.createNewPostService(req.body, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.json({
            success: false,
            msg: 'Create new post was failed'
        })
    }
})

const getPostsLimitAdmin = asyncHandler(async (req, res) => {
    const { page, ...query } = req.query;
    const {id} = req.user;
    try {
        if (!id) {
            return res.status(401).json({
                success: false,
                msg: 'Unauthorized'
            })
        }
        const response = await postService.getPostsLimitAdminService(page, id, query)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            success: false,
            msg: 'Can not get posts limit' + error.message
        })
    }
})

module.exports = {
    getPosts,
    getPostsLimit,
    getNewPosts,
    createNewPost,
    getPostsLimitAdmin
}