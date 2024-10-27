import { ServerError } from "../../commons/exceptions.js"
import { getAllEvents, getSpecificEvent, addEvent, updateEvent, deleteEvent } from "../../services/eventsService.js"

const getAllEventsHandler = (req, res) => {
    getAllEvents()
    .then(data => {
        return res.json({
            status: 'success',
            message: 'Retrieve all events',
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

const getSpecificEventHandler = (req, res) => {
    getSpecificEvent(req.params.id)
    .then(data => {
        return res.json({
            status: 'success',
            message: `Retrieve event with id ${req.params.id}`,
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

const addEventHandler = (req, res) => {
    const {title, location, date_time, is_open} = req.body
    addEvent(title, location, date_time, is_open)
    .then(data => {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        data.links = `${fullUrl}/${data.id}`
        res.status(201)
        return res.json({
            status: 'success',
            message: `Store event success`,
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

const updateEventHandler = (req, res) => {
    const {title, location, date_time, is_open} = req.body
    updateEvent(req.params.id, title, location, date_time, is_open)
    .then(data => {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        data.links = `${fullUrl}`
        res.status(200)
        return res.json({
            status: 'success',
            message: `Update event with id ${req.params.id} success`,
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

const deleteEventHandler = (req, res) => {
    deleteEvent(req.params.id)
    .then(data => {
        res.status(200)
        return res.json({
            status: 'success',
            message: `Delete event with id ${req.params.id} success`
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

export { getAllEventsHandler, getSpecificEventHandler, addEventHandler, updateEventHandler, deleteEventHandler }