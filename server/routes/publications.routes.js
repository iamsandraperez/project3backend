const router = require('express').Router()
const { verifyToken } = require('../middlewares/verifyToken')

const {
    getAllPublications,
    getOnePublication,
    savePublication,
    removePublication,
    editPublication,
    getPublicationsByOwner,
    getLastPublication
} = require('./../controllers/publications.controllers')


router.get('/getAllPublications', getAllPublications)
router.get('/getOnePublication/:publication_id', getOnePublication)
router.get('/getLastPublication', getLastPublication)
router.post('/savePublication', verifyToken, savePublication)
router.delete('/removePublication/:publication_id', removePublication)
router.post('/editPublication/:userId', editPublication)
router.get('/getPublicationsByOwner/:userId', getPublicationsByOwner)

module.exports = router


