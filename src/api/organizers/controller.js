import { ServerError } from "../../commons/exceptions.js"
import { getAllOrganizers, getSpecificOrganizer, addOrganizer, updateOrganizer, deleteOrganizer } from "../../services/organizersService.js"

const getAllOrganizersHandler = (req, res) => {
    getAllOrganizers()
    .then(data => {
        return res.json({
            status: 'success',
            message: 'Retrieve all organizers',
            data: data
        })
    })
    .catch ( error => {
        if(error instanceof ServerError) {
            res.status(500)
        }
        return res.json({
            status: 'fail',
            message: `${error.name}: ${error.message}`
        })
    })
}

const getSpecificOrganizerHandler = (req, res) => {
    getSpecificOrganizer(req.params.id)
    .then(data => {
        return res.json({
            status: 'success',
            message: `Retrieve organizer with id ${req.params.id}`,
            data: data
        })
    })
    .catch ( error => {
        res.status(error.code)
        return res.json({
            status: 'fail',
            message: `${error.name}: ${error.message}`
        })
    })
}

const addOrganizerHandler = (req, res) => {
    addOrganizer(req.body.organizer, req.body.email, req.body.phone)
    .then(data => {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        data.links = `${fullUrl}/${data.id}`
        res.status(201)
        return res.json({
            status: 'success',
            message: `Store organizer success`,
            data: data
        })
    })
    .catch ( error => {
        res.status(error.code)
        return res.json({
            status: 'fail',
            message: `${error.name}: ${error.message}`
        })
    })
}

const updateOrganizerHandler = (req, res) => {
    updateOrganizer(req.params.id, req.body.organizer, req.body.email, req.body.phone)
    .then(data => {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        data.links = `${fullUrl}`
        res.status(200)
        return res.json({
            status: 'success',
            message: `Update organizer with id ${req.params.id} success`,
            data: data
        })
    })
    .catch ( error => {
        res.status(error.code)
        return res.json({
            status: 'fail',
            message: `${error.name}: ${error.message}`
        })
    })
}

const deleteOrganizerHandler = (req, res) => {
    deleteOrganizer(req.params.id)
    .then(data => {
        res.status(200)
        return res.json({
            status: 'success',
            message: `Delete organizer with id ${req.params.id} success`
        })
    })
    .catch ( error => {
        res.status(error.code)
        return res.json({
            status: 'fail',
            message: `${error.name}: ${error.message}`
        })
    })
}

export { getAllOrganizersHandler, getSpecificOrganizerHandler, addOrganizerHandler, updateOrganizerHandler, deleteOrganizerHandler }