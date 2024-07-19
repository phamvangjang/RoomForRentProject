const db = require('../models')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { v4 } = require('uuid')
require('dotenv').config()

const hashPassword = password => bcrypt.hashSync(password, bcrypt.genSaltSync(12))

const registerService = ({ name, password, phone }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOrCreate({
            where: { phone },
            defaults: {
                phone,
                name,
                password: hashPassword(password),
                id: v4()
            }
        })
        const token = response[1] && jwt.sign({ id: response[0].id, phone: response[0].phone }, process.env.SECRET_KEY, { expiresIn: '2d' })
        resolve({
            success: token ? true : false,
            msg: token ? 'Register is successfully' : 'Phone number has been aldready used',
            token: token || null
        })
    } catch (error) {
        reject(error)
    }
})


const SignInService = ({ password, phone }) => new Promise(async (resolve, reject) => {
    try {
        const response = await db.User.findOne({
            where: { phone },
            raw: true
        })
        const isCorrectPassword = response && bcrypt.compareSync(password, response.password)
        const token = isCorrectPassword && jwt.sign({ id: response.id, phone: response.phone }, process.env.SECRET_KEY, { expiresIn: '2d' })
        resolve({
            success: token ? true : false,
            msg: token ? 'SignIn was successfully' : 'Phone number or password is invalid',
            token: token || null
        })
    } catch (error) {
        reject(error)
    }
})
module.exports = {
    registerService,
    SignInService
}