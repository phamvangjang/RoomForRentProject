const authService = require('../services/auth')

const register = async (req, res) => {
    const { name, password, phone } = req.body
    try {
        const response = await authService.registerService(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'Register failed'
        })
    }
}

const signIn = async (req, res) => {
    const { password, phone } = req.body
    try {
        const response = await authService.SignInService(req.body)
        return res.status(200).json(response)
    } catch (error) {
        return res.status(500).json({
            err: -1,
            msg: 'SignIn failed'
        })
    }
}

module.exports = {
    register,
    signIn
}