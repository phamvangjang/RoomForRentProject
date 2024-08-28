const asyncHandler = require('express-async-handler')
const userService = require('../services/user')

const getCurrent = asyncHandler(async (req, res) => {
    const { id } = req.user
    try {
        const response = await userService.getOneService(id)
        return res.status(200).json(response)
    } catch (error) {
        return res.json({
            success: false,
            msg: 'Something was wrong: ' + error
        })
    }
})

module.exports = {
    getCurrent
}