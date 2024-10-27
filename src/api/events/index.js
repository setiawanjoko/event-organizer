import { Router } from "express";
import { addEventHandler, deleteEventHandler, getAllEventsHandler, getSpecificEventHandler, updateEventHandler } from "./controller.js";
import validator from 'express-validator'
const {body, param} = validator

const router = new Router

router.get('/', getAllEventsHandler)
router.get('/:id', param('id').notEmpty(), getSpecificEventHandler)
router.post('/', [
    body('title').notEmpty().isString().isLength({min: 5, max: 50}),
    body('location').notEmpty().isString().isLength({min:5, max: 50}),
    body('date_time').isISO8601(),
    body('is_open').isBoolean()
], addEventHandler)
router.put('/:id', [
    body('title').notEmpty().isString().isLength({min: 5, max: 50}),
    body('location').notEmpty().isString().isLength({min:5, max: 50}),
    body('date_time').isISO8601(),
    body('is_open').isBoolean()
], updateEventHandler)
router.delete('/:id', param('id').notEmpty(), deleteEventHandler)

export default router