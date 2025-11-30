const express = require('express')
const ctrls = require('../controllers/user')
const { verifyToken } = require('../middlewares/verifyToken')
const router = express.Router()

router.use(verifyToken)
router.get('/getCurrent', ctrls.getCurrent);
router.put('/updateUser', ctrls.updateUser);

module.exports = router