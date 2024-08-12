const asyncHandler = require('express-async-handler')
const pricesService = require('../services/price')

const getPrices = asyncHandler(async (req, res) => {
    try {
        const response = await pricesService.getPricesService()
        return res.status(200).json(response)
    } catch (error) {
        return res.json({
            success: false,
            msg: 'Can not get prices'
        })
    }
})

module.exports = {
    getPrices
}