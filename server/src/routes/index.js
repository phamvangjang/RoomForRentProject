const authRouter = require('./auth') 
const insertRouter = require('./insert') 

const initRoutes = (app) => {
    app.use('/api/auth', authRouter)
    app.use('/api/insert', insertRouter)

    return app.use('/', (req, res) => {
        res.send('server on...')
    })
}

module.exports = initRoutes