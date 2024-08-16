const express = require('express') 
const ctrls = require('../controllers/province')
const router = express.Router()

router.get('/', ctrls.getProvinces)

module.exports = router