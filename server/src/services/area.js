const db = require('../models')

//get 
const getAreaService = () => new Promise(async (resolve, reject) => {
    try {
        const response = await db.Area.findAll({
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
    getAreaService
}