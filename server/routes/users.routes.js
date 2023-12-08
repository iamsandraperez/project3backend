const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')

const {
    getAllUsers,
    getOneUser,
    deleteUser,
    getAllColaborators,
    addColaborators,
    removeColaborators,

} = require('./../controllers/users.controllers')

router.get('/getAllUsers', getAllUsers)
router.get('/getOneUser/:_id', getOneUser)
router.delete('/deleteUser/:_id', deleteUser)
router.get('/getAllColaborators/:userId', getAllColaborators)
router.post('/addColaborators/:userId', addColaborators)
router.delete('/removeColaborators/:userId', removeColaborators)


module.exports = router
