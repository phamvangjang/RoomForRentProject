const express = require('express') 
const ctrls = require('../controllers/area')
const router = express.Router()

router.get('/', ctrls.getAreas)

module.exports = router