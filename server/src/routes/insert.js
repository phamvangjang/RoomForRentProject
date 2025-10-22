const express = require('express') 
const router = express.Router()
const ctrls = require('../controllers/insert')

router.post('/orther', ctrls.insertOrther)
router.post('/prices-areas', ctrls.insertPricesAndAreas)

module.exports = router