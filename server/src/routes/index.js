const authRouter = require('./auth') 
const initRoutes = (app) => {
    app.use('/api/auth', authRouter)

    return app.use('/', (req, res) => {
        res.send('server on...')
    })
}

module.exports = initRoutes