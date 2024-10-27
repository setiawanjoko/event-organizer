import dotenv from 'dotenv'
import path from 'path'

const result = dotenv.config({
    path: path.resolve(import.meta.dirname, '../../.env')
})