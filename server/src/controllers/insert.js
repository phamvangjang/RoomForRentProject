const createPricesAndAreas = require('../services/insert')
const insertService = require('../services/insert')

const insert = async (req, res) => {
    try {
        const response = await insertService.insertService()
        // const response = await createPricesAndAreas.createPricesAndAreas()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Insert data failed'
        })
    }
}

module.exports = {
    insert
}