import { Router } from "express";
import { addOrganizerHandler, deleteOrganizerHandler, getAllOrganizersHandler, getSpecificOrganizerHandler, updateOrganizerHandler } from "./controller.js";
import validator from 'express-validator'
const {body, param} = validator

const router = new Router

router.get('/', getAllOrganizersHandler)
router.get('/:id', param('id').notEmpty(), getSpecificOrganizerHandler)
router.post('/', [
    body('organizer').notEmpty().isString().isLength({max: 15}),
    body('email').notEmpty().isEmail(),
    body('phone').notEmpty().isNumeric({no_symbols: true})
], addOrganizerHandler)
router.put('/:id', [
    param('id').notEmpty(),
    body('organizer').notEmpty().isString().isLength({max: 15}),
    body('email').notEmpty().isEmail(),
    body('phone').notEmpty().isNumeric({no_symbols: true})
], updateOrganizerHandler)
router.delete('/:id', param('id').notEmpty(), deleteOrganizerHandler)

export default router