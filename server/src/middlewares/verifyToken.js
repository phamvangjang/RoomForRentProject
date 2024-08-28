const jwt = require('jsonwebtoken')
const verifyToken = (req, res, next) => {
    let accessToken = req.headers.authorization?.split(' ')[1]
    if (!accessToken) return res.status(401).json({
        success: false,
        msg: 'Missing access token'
    })
    jwt.verify(accessToken, process.env.SECRET_KEY, (error, user) => {
        if (error) return res.status(401).json({
            success: false,
            msg: 'Access token expired'
        })
        req.user = user
        next()
    })
}
module.exports = {
    verifyToken
} 