import userModel from "../models/userModel.js"

//add products to user cart
const addToCart = async(req,res)=>{
    try{
        const {userId,itemId,size} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        // check the in cartData the current itemId or productId is available or not
        if(cartData[itemId]){
            // if yes then check in the itemId the current size is available or not
            if(cartData[itemId][size]){
                // if yes then increase the quantity of product size 
                cartData[itemId][size] += 1
            }
            else{
                // if no then add the size and set the quantity as 1
                cartData[itemId][size] = 1
            }
        // if no then create the object of current product id in that create the size and set the quantity as 1
        }else{
            cartData[itemId] = {}
            cartData[itemId][size] = 1
        }

        // update the cartItems in user model
        await userModel.findByIdAndUpdate(userId,{cartData})

        res.json({success: true, message: "Added to Cart"})

    }
    catch(err){
        console.log(err)
        res.json({success: false, message: err.message})
    }
}

//update user cart
const updateCart = async(req,res)=>{
    try{
        const {userId, itemId,size,quantity} = req.body

        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        cartData[itemId][size] = quantity

        await userModel.findByIdAndUpdate(userId,{cartData})
        res.json({success: true,message:"Cart Updated"})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

//get user cart data  
const getUserCart = async(req,res)=>{
    try{
        const {userId} = req.body
        const userData = await userModel.findById(userId)
        let cartData = await userData.cartData

        res.json({success: true, cartData})
    }
    catch(err){
        console.log(err)
        res.json({success: false, message: err.message})

    }
}

export {addToCart,updateCart,getUserCart}