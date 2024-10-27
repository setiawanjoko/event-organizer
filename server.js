import './src/commons/config.js'
import express from 'express'
import categoryRoutes from './src/api/categories/index.js'
import organizerRoutes from './src/api/organizers/index.js'

const app = express()
const port = 3000

app.use(express.json())
app.use('/categories', categoryRoutes)
app.use('/organizers', organizerRoutes)

app.listen(port, () => {
    console.log(`Server is running in http://localhost:${port}/`);
})