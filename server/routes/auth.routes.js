const router = require('express').Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')  /////// dependencia que puede crear tokens
const User = require('../models/User.model')
const { verifyToken } = require('../middlewares/verifyToken')
const saltRounds = 10


router.post('/signup', (req, res, next) => {

    const { companyName, email, password, sector, description } = req.body

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: 'Este usuario ya existe' })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ companyName, email, password: hashedPassword, sector, description })
        })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
})


router.post('/login', (req, res, next) => {

    const { email, password } = req.body

    if (email === '' || password === '') {
        res.status(400).json({ message: 'No te olvides de proporcionar el email y contraseña' })
        return
    }


    User
        .findOne({ email })
        .then((foundUser) => {

            if (!foundUser) {
                res.status(401).json({ message: 'Usuario no encontrado' })
                return;
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, companyName } = foundUser;
                const payload = { _id, email, companyName }

                const authToken = jwt.sign(
                    payload,
                    process.env.TOKEN_SECRET,
                    { algorithm: 'HS256', expiresIn: '6h' }
                )

                res.json({ authToken })

            }
            else {
                res.status(401).json({ message: 'Contraseña incorrecta' })
            }

        })
        .catch(err => next(err))
})


router.get('/verify', verifyToken, (req, res, next) => {

    const loggedUser = req.payload

    res.json({ loggedUser })
})




module.exports = router

