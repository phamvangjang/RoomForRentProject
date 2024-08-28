const express = require('express')
const ctrls = require('../controllers/user')
const { verifyToken } = require('../middlewares/verifyToken')
const router = express.Router()

router.use(verifyToken)
router.get('/getCurrent', ctrls.getCurrent)

module.exports = router