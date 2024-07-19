const authRouter = require('./auth') 
const initRoutes = (app) => {
    app.use('/api/auth', authRouter)

    return app.use('/', (req, res) => {
        res.send('first')
    })
}

module.exports = initRoutes