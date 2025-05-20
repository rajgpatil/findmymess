import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from "./config/mongodb.js"
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from "./routes/orderRoute.js"
import aiRoute from './routes/aiRoute.js'

//App Config

const app = express()
const port = process.env.PORT || 4000
// connect with db
connectDB();
// configure the cloudinary
connectCloudinary();

//middleware
// whatever request we get that parse using the json
app.use(express.json())

// using this we can access the  backend from any ip address
app.use(cors())

//api endpoints
// user router
app.use('/api/user',userRouter)
// product router
app.use('/api/product',productRouter)
//cart router
app.use('/api/cart',cartRouter)
//order router
app.use('/api/order',orderRouter)

//AI route
app.use('/api/ai',aiRoute)

app.get('/',(req,res)=>{
    res.send('API is Working')
})

app.listen(port,()=>{
    console.log('Server started on PORT : ' + port)
})



