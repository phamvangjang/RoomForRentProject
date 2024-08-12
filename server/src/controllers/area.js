const asyncHandler = require('express-async-handler')
const areaService = require('../services/area')

const getAreas = asyncHandler(async (req, res) => {
    try {
        const response = await areaService.getAreaService()
        return res.status(200).json(response)
    } catch (error) {
        return res.json({
            success: false,
            msg: 'Can not get Areas'
        })
    }
})

module.exports = {
    getAreas
}