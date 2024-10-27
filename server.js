import './src/commons/config.js'
import express from 'express'
import categoryRoutes from './src/api/categories/index.js'

const app = express()
const port = 3000

app.use(express.json())
app.use('/categories', categoryRoutes)

app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}/`);
})