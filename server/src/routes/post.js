const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router();
const ctrls = require('../controllers/post');

router.get(`/limit`, ctrls.getPostsLimit);
router.get(`/newPost`, ctrls.getNewPosts);
router.get('/', ctrls.getPosts);

router.use(verifyToken);
router.post('/createPost', ctrls.createNewPost);
router.get('/limit-admin', ctrls.getPostsLimitAdmin);
router.put('/update-post', ctrls.updatePost);
router.delete('/delete-post', ctrls.deletePost);

module.exports = router;