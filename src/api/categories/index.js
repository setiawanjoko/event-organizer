import { Router } from "express";
import { addCategoryHandler, deleteCategoryHandler, getAllCategoriesHandler, getSpecificCategoryHandler, updateCategoryHandler } from "./controller.js";
import validator from 'express-validator'
const {body, param} = validator

const router = new Router

router.get('/', getAllCategoriesHandler)
router.get('/:id', param('id').notEmpty(), getSpecificCategoryHandler)
router.post('/', body('category').exists().notEmpty(), addCategoryHandler)
router.put('/:id', [
    param('id').notEmpty(),
    body('category').notEmpty().isString().isLength({max: 15})
], updateCategoryHandler)
router.delete('/:id', param('id').notEmpty(), deleteCategoryHandler)

export default router