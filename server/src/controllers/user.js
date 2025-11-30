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

const updateUser = asyncHandler(async (req, res) => {
    const { id } = req.user
    const payload = req.body
    try {
        if (!payload) {
            return res.status(400).json({
                success: false,
                msg: 'Payload is required'
            })
        }
        const response = await userService.updatedUserService(payload, id)
        return res.status(200).json(response)
    } catch (error) {
        return res.json({
            success: false,
            msg: 'Failed to update user: ' + error
        })
    }
})

module.exports = {
    getCurrent,
    updateUser
}