module.exports = app => {

    const authRoutes = require('./auth.routes')
    app.use('/api/auth', authRoutes)

    const usersRoutes = require('./users.routes')
    app.use('/api/users', usersRoutes)

    const publicationsRoutes = require('./publications.routes')
    app.use('/api/publications', publicationsRoutes)

    const uploadRoutes = require('./upload.routes')
    app.use('/api/upload', uploadRoutes)



} 