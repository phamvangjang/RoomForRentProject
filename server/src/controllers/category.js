const asyncHandler = require('express-async-handler')
// const service = require('../services/category')
const db = require('../models')

// const getCategories = async (req, res) => {
//     try {
//         const response = await service.getCategoriesService()
//         return res.status(200).json(response)
//     } catch (error) {
//         return res.status(500).json({
//             success: false,
//             msg: 'Failed to get categories: ' + error
//         })
//     }
// }
const getCategories = asyncHandler(async (req, res) => {
    const response = await db.Category.findAll({
        raw: true,
    })
    return res.json({
        success: response ? true : false,
        msg: response ? 'Get categories successfully' : 'Get categories failed',
        response
    })
})

module.exports = {
    getCategories
}