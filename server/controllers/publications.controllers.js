const Publication = require('./../models/Publication.model')

const getAllPublications = (req, res, next) => {

    Publication
        .find()
        .populate('owner')
        .sort({ title: 1 })
        .then(response => {


            const formattedResponse = response.map(item => ({
                _id: item._id,
                title: item.title,
                date: new Date(item.date).toLocaleDateString(),
                description: item.description,
                owner: item.owner
            }))
            res.status(200).json(formattedResponse)
        })
        .catch(err => next(err))
}

const getOnePublication = (req, res, next) => {

    const { publication_id } = req.params

    Publication
        .findById(publication_id)
        .then(response => res.status(200).json(response))
        .catch(err => next(err))
}

const savePublication = (req, res, next) => {
    const { title, date, description } = req.body
    const { _id: owner } = req.payload


    const [day, month, year] = date.split('-')
    const dateObject = new Date(`${day}-${month}-${year}`)

    Publication
        .create({ title, date: dateObject, description, owner })
        .then(() => res.sendStatus(200))
        .catch(err => next(err))
}

const removePublication = (req, res, next) => {
    const { publication_id } = req.params
    Publication
        .findByIdAndDelete(publication_id)
        .then(deletedPublication => {
            if (!deletedPublication) {
                return res.status(404).send("Publicación no encontrada")
            }
            res.sendStatus(204)
        })
        .catch(err => next(err))
}

const editPublication = (req, res, next) => {
    const { publication_id } = req.params
    const { title, date, description } = req.body

    Publication
        .findByIdAndUpdate(publication_id, { title, date, description })
        .then(() => {
            res.status(200).json({ message: 'Publicación editada exitosamente' })
        })
        .catch(err => next(err))
}

const getPublicationsByOwner = (req, res, next) => {
    const { userId } = req.params

    Publication
        .find({ owner: userId })
        .then((publications) => {
            res.json(publications)
        })
        .catch(err => next(err))

}

const getLastPublication = (req, res, next) => {
    Publication
        .findOne()
        .sort({ timestamps: -1 })
        .limit(1)
        .populate('owner')
        .then(response => {
            const formattedResponse = {
                _id: response._id,
                title: response.title,
                date: new Date(response.date).toLocaleDateString(),
                description: response.description,
                owner: response.owner
            }
            res.status(200).json(formattedResponse)
        })
        .catch(err => next(err))
}


module.exports = {
    getAllPublications,
    getOnePublication,
    savePublication,
    removePublication,
    editPublication,
    getPublicationsByOwner,
    getLastPublication
}




