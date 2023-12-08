const User = require('../models/User.model')
const saltRounds = 10
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const signup = (req, res, next) => {

    const { companyName, email, password, location, sector, contact, description, imageUrl } = req.body

    User
        .findOne({ email })
        .then((foundUser) => {

            if (foundUser) {
                res.status(400).json({ message: 'Este usuario ya existe' })
                return
            }

            const salt = bcrypt.genSaltSync(saltRounds)
            const hashedPassword = bcrypt.hashSync(password, salt)

            return User.create({ companyName, email, password: hashedPassword, location, sector, contact, description, imageUrl })
        })
        .then(() => res.sendStatus(201))
        .catch(err => next(err))
}

const login = (req, res, next) => {

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
                return
            }

            if (bcrypt.compareSync(password, foundUser.password)) {

                const { _id, email, companyName } = foundUser
                const payload = { _id, email, companyName }  ////////////meter roll 

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
}

const verify = (req, res, next) => {

    res.json(req.payload)
}


module.exports = {
    signup,
    login,
    verify

}
