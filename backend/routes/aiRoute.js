import express from 'express'
import authUser from "../middleware/auth.js"
import { popular,recommendations } from '../controllers/AIController.js'
const aiRoute = express.Router()

aiRoute.get('/get-popular-dishes',popular)
aiRoute.post('/get-recommendations',authUser,recommendations)



export default aiRoute