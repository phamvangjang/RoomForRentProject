const express = require('express') 
const router = express.Router()
const ctrls = require('../controllers/post')

router.get(`/limit`, ctrls.getPostsLimit)
router.get(`/newPost`, ctrls.getNewPosts)
router.get('/', ctrls.getPosts)

module.exports = router