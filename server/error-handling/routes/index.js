module.exports = app => {

    const authRoutes = require('./auth.routes')
    app.use('/api/auth', authRoutes)

    const usersRoutes = require('./users.routes')
    app.use('/api/users', usersRoutes)

} 