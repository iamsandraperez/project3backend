const router = require('express').Router()
const User = require('../models/User.model')

router.get('/list', (req, res, next) => {

    User
        .find({})
        .then(users => {
            res.json(users)
        })
        .catch(err => next(err))
})

router.get("/:_id", (req, res, next) => {

    const { _id } = req.params

    User
        .findById(_id)
        .then(response => res.json(response))
        .catch(err => next(err))
})






module.exports = router
