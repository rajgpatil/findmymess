import express from 'express'
import authUser from "../middleware/auth.js"
import { popular,recommendations } from '../controllers/AIController.js'
const aiRoute = express.Router()

aiRoute.post('/get-recommendations',authUser,recommendations)
aiRoute.get('/get-popular-dishes',popular)


export default aiRoute