const asyncHandler = require('express-async-handler')
const provinceService = require('../services/province')

const getProvinces = asyncHandler(async (req, res) => {
    try {
        const response = await provinceService.getProvincesService()
        return res.status(200).json(response)
    } catch (error) {
        return res.json({
            success: false,
            msg: 'Can not get provinces'
        })
    }
})

module.exports = {
    getProvinces
}