const express = require('express') 
const router = express.Router()
const ctrls = require('../controllers/auth')

router.post('/register', ctrls.register)
router.post('/signIn', ctrls.signIn)

module.exports = router