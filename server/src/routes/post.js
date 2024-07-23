const express = require('express') 
const router = express.Router()
const ctrls = require('../controllers/post')

router.get('/', ctrls.getPosts)

module.exports = router