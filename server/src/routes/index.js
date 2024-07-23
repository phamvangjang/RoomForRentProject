const authRouter = require('./auth')
const insertRouter = require('./insert')
const categoryRouter = require('./category')
const postRouter = require('./post')

const initRoutes = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/insert', insertRouter)
    app.use('/api/category', categoryRouter)
    app.use('/api/post', postRouter)

    return app.use('/', (req, res) => {
        res.send('server on...')
    })
}

module.exports = initRoutes