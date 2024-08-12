const express = require('express') 
const ctrls = require('../controllers/price')
const router = express.Router()

router.get('/', ctrls.getPrices)

module.exports = router