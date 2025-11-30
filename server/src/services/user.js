const db = require('../models')

//get current
const getOneService = (id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { id },
            raw: true,
            attributes: {
                exclude: ['createdAt', 'updatedAt', 'password']
            }
        })
        resolve({
            success: response ? true : false,
            msg: response ? 'Successfully' : 'Something was wrong',
            response
        })
    } catch (error) {
        reject(error)
    }
})

const updatedUserService = (payload, id) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.update(payload, {
            where: { id }
        })
        resolve({
            success: response ? true : false,
            msg: response ? 'Updated Successfully' : 'Failed to update'
        })
    } catch (error) {
        reject(error)
    }
})
module.exports = {
    getOneService,
    updatedUserService
}