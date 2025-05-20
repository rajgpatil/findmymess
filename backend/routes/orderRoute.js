import express from 'express' 
import {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus, verifyStripe, verifyRazorpay} from "../controllers/orderController.js"
import adminAuth from "../middleware/adminAuth.js"
import authUser from "../middleware/auth.js"
import validate from '../middleware/validate.js'

const orderRouter = express.Router()

//Admin Features
orderRouter.post('/list',adminAuth,allOrders)
orderRouter.post('/status',adminAuth,updateStatus)

//Payment Features
orderRouter.post('/place',authUser,validate,placeOrder)
orderRouter.post('/stripe',authUser,validate,placeOrderStripe)
orderRouter.post('/razorpay',authUser,validate,placeOrderRazorpay)

//User feature
orderRouter.post('/userorders',authUser,userOrders)

//Verify payment
orderRouter.post('/verifyStripe',authUser,verifyStripe)
orderRouter.post('/verifyRazorpay',authUser,verifyRazorpay)
export default orderRouter