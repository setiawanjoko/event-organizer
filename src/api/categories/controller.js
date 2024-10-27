import { ServerError } from "../../commons/exceptions.js"
import { getAllCategories, getSpecificCategory, addCategory, updateCategory, deleteCategory } from "../../services/categoriesService.js"

const getAllCategoriesHandler = (req, res) => {
    getAllCategories()
    .then(data => {
        return res.json({
            status: 'success',
            message: 'Retrieve all categories',
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

const getSpecificCategoryHandler = (req, res) => {
    getSpecificCategory(req.params.id)
    .then(data => {
        return res.json({
            status: 'success',
            message: `Retrieve category with id ${req.params.id}`,
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

const addCategoryHandler = (req, res) => {
    addCategory(req.body.category)
    .then(data => {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        data.links = `${fullUrl}/${data.id}`
        res.status(201)
        return res.json({
            status: 'success',
            message: `Store category success`,
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

const updateCategoryHandler = (req, res) => {
    updateCategory(req.params.id, req.body.category)
    .then(data => {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        data.links = `${fullUrl}`
        res.status(200)
        return res.json({
            status: 'success',
            message: `Update category with id ${req.params.id} success`,
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

const deleteCategoryHandler = (req, res) => {
    deleteCategory(req.params.id)
    .then(data => {
        res.status(200)
        return res.json({
            status: 'success',
            message: `Delete category with id ${req.params.id} success`
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

export { getAllCategoriesHandler, getSpecificCategoryHandler, addCategoryHandler, updateCategoryHandler, deleteCategoryHandler }