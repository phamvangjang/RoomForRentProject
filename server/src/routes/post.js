const express = require('express') 
const router = express.Router()
const ctrls = require('../controllers/post')

router.get('/limit', ctrls.getPostsLimitService)
router.get('/', ctrls.getPosts)

module.exports = router