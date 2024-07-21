const authRouter = require('./auth')
const insertRouter = require('./insert')
const categoryRouter = require('./category')

const initRoutes = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/insert', insertRouter)
    app.use('/api/category', categoryRouter)

    return app.use('/', (req, res) => {
        res.send('server on...')
    })
}

module.exports = initRoutes