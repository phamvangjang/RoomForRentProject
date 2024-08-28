const authRouter = require('./auth')
const insertRouter = require('./insert')
const categoryRouter = require('./category')
const postRouter = require('./post')
const priceRouter = require('./price')
const areaRouter = require('./area')
const provinceRouter = require('./province')
const userRouter = require('./user')

const initRoutes = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/insert', insertRouter)
    app.use('/api/category', categoryRouter)
    app.use('/api/post', postRouter)
    app.use('/api/price', priceRouter)
    app.use('/api/area', areaRouter)
    app.use('/api/province', provinceRouter)
    app.use('/api/user', userRouter)

    return app.use('/', (req, res) => {
        res.send('server on...')
    })
}

module.exports = initRoutes