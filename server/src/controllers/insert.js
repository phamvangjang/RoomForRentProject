const createPricesAndAreas = require('../services/insert')
const insertService = require('../services/insert')

const insertOrther = async (req, res) => {
    try {
        // 1. Insert data from JSON to database
        const response = await insertService.insertService()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Insert data failed'
        })
    }
}

const insertPricesAndAreas = async (req, res) => {
    try {
        // 2. Create data Price and Area
        const response = await createPricesAndAreas.createPricesAndAreas()
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Insert data failed'
        })
    }
}

module.exports = {
    insertOrther,
    insertPricesAndAreas
}