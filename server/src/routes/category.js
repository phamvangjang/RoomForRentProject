const express = require('express') 
const ctrls = require('../controllers/category')
const router = express.Router()

router.get('/', ctrls.getCategories)

module.exports = router