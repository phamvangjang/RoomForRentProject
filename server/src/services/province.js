const db = require('../models')

//get 
const getProvincesService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Province.findAll({
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
    getProvincesService
}