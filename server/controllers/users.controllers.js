const User = require('./../models/User.model')

const getAllUsers = (req, res, next) => {

    User
        .find({})
        .then(users => {
            res.json(users)
        })
        .catch(err => next(err))
}

const getOneUser = (req, res, next) => {

    const { _id } = req.params

    User
        .findById(_id)
        .then(response => res.json(response))
        .catch(err => next(err))
}

const deleteUser = (req, res, next) => {
    const { _id } = req.params

    User
        .findByIdAndDelete(_id)
        .then(res.sendStatus(204))
        .catch(err => next(err))
}

const getAllColaborators = (req, res, next) => {
    const { userId } = req.params
    User
        .findById(userId)
        .then(user => {
            if (!user) {
                res.status(404).json({ error: 'Usuario no encontrado' })
                return
            }

            return User.find({ _id: { $in: user.colaborators } })
        })
        .then(colaborators => {
            res.status(200).json(colaborators)
        })
        .catch(err => next(err))
}

const addColaborators = (req, res, next) => {
    const { colaboratorId } = req.body
    const { userId } = req.params
    let foundUSer

    User
        .findById(userId)
        .then(user => {
            if (!user) {
                res.status(404).json({ error: 'Usuario no encontrado' })
                return
            }
            foundUSer = user
            return User.findById(colaboratorId)
        })
        .then(colaborator => {
            if (!colaborator) {
                res.status(404).json({ error: 'Colaborador no encontrado' })
                return
            }
            foundUSer.colaborators.push(colaboratorId)
            return foundUSer.save()
        })
        .then(() => {
            res.status(200).json({ message: 'Colaborador añadido correctamente' })
        })
        .catch(err => next(err))

}

const removeColaborators = (req, res, next) => {
    const { colaboratorId } = req.body
    const { userId } = req.params
    let foundUSer

    User
        .findById(userId)
        .then(user => {
            if (!user) {
                res.status(404).json({ error: 'Usuario no encontrado' })
                return
            }

            foundUSer = user

            return User.findById(colaboratorId)
        })
        .then(colaborator => {
            if (!colaborator) {
                return (res.status(404).json({ error: 'Colaborador no encontrado' }))
            }

            const newColaboratorsArray = foundUSer.colaborators.filter(_id => _id != colaboratorId)
            foundUSer.colaborators = newColaboratorsArray

            return foundUSer.save()
        })
        .then(() => {
            res.status(200).json({
                message: 'Colaborador correctamente eliminado'
            })
        })
        .catch(err => next(err))

}




module.exports = {
    getAllUsers,
    getOneUser,
    deleteUser,
    getAllColaborators,
    addColaborators,
    removeColaborators,

}




