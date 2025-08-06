import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from "stripe"
import razorpay from "razorpay"

//global variables
const currency = 'INR'
const deliveryCharge = 10

//gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET,
})

//Placing orders using cash on dilivary method
const placeOrder = async(req,res)=>{
    try{
        const{userId,items,amount, address} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"COD",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId,{cartData:{}})

        res.json({success:true, message:"Order Placed"})

    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

//Placing orders using stripe method
const placeOrderStripe = async(req,res)=>{
    try{
        const {userId,items,amount,address} = req.body
        // console.log(items)
        const {origin} = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod:"Stripe",
            payment:false,
            date:Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()
        
        const line_items = items.map((item)=>({
            
            price_data:{
                currency: currency,
                product_data:{
                    name: item.name
                },
                unit_amount: (item.size == 'Full' ? item.fullprice : item.halfprice) * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data:{
                currency : currency,
                product_data:{
                    name: 'Delivery Charges'
                },
                unit_amount: deliveryCharge * 100
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: "payment",
        })

        res.json({success:true,session_url:session.url})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

//Verify Stripe
const verifyStripe = async(req,res)=>{
    const {orderId,success,userId} = req.body

    try{
        if(success === "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success: true})
        }
        else{
            await orderModel.findByIdAndDelete(orderId)
            res.json({success:false})
        }
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}



//Placing order using Razorpay Method
const placeOrderRazorpay = async(req,res)=>{
    try{
        const {userId, items, amount, address} = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString() 
        }

        await razorpayInstance.orders.create(options, (error,order)=>{
            if(error){
                console.log(error)
                return res.json({success:false, message: error})
            }
            res.json({success: true,order})
        })
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

const verifyRazorpay = async(req,res)=>{
    try{
        const {userId, razorpay_order_id} = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        // console.log(orderInfo)
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt,{payment:true})
            await userModel.findByIdAndUpdate(userId,{cartData:{}})
            res.json({success: true, message: "Payment Successful"})
        }
        else{
           await orderModel.deleteOne({ _id: orderInfo.receipt, payment: false, paymentMethod: { $ne: 'COD' } });
            res.json({success:false, message:'Payment Failed'})
        }
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}   

//All orders data for admin panel
const allOrders = async(req,res)=>{
    try{

        await orderModel.deleteMany({payment: false,paymentMethod: { $ne: 'COD' }});
        const orders = await orderModel.find({})
        res.json({success:true,orders})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

// User order data for frontend
const userOrders = async(req,res) =>{
    try{
        const {userId} = req.body
        const orders = await orderModel.find({userId})
        res.json({success:true,orders})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

//update order status from Admin Panel
const updateStatus = async(req,res)=>{
    try{
        const {orderId,status} = req.body
        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true,message:"Status Updated"})
    }
    catch(err){
        console.log(err)
        res.json({success: false, message:err.message})
    }
}

export {placeOrder,placeOrderStripe,placeOrderRazorpay,allOrders,userOrders,updateStatus, verifyStripe, verifyRazorpay}
