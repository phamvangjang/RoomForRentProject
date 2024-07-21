const db = require('../models')

//get all categories
const getCategoriesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Category.findAll({
            raw: true,
            attributes: {
                exclude: ['createdAt', 'updatedAt']
            }
        })
        resolve({
            success: response ? true : false,
            msg: response ? 'Successfully' : 'Failed',
            response
        })
    } catch (error) {
        reject(error)
    }
})
module.exports = {
    getCategoriesService
}