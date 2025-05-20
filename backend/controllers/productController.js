import {v2 as cloudinary} from 'cloudinary'
import productModel from "../models/productModel.js"

//function for add product
const addProduct = async(req,res)=>{
    try{
        const{name,description,fullprice,halfprice,category,sizes,bestseller} = req.body

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]
        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]

        const images = [image1,image2,image3,image4].filter((item)=> item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item)=>{
                let result = await cloudinary.uploader.upload(item.path,{resource_type:'image'})
                // console.log(result)
                return result.secure_url
            })
        )
        // console.log(name,description,fullprice,halfprice,category,sizes,bestseller)
        // console.log(req.files)
        // console.log(images)

        // console.log(imagesUrl)

        const productData = {
            name,
            description,
            category,
            fullprice: JSON.parse(fullprice), //conver price from string to array
            halfprice: JSON.parse(halfprice),
            bestseller: bestseller === 'true' ? true : false, //conver bestseller from string to boolean
            sizes:JSON.parse(sizes), //convert the string into array
            image:imagesUrl,
            date: Date.now()
        }
        // console.log(productData)

        const product = new productModel(productData)
        // save in db
        await product.save()

        res.json({success:true, message:"Product Added"})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

//function for list product
const listProducts = async(req,res)=>{
    try{
        const products = await productModel.find({});
        res.json({success:true, products})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

//function for remove product
const removeProduct = async(req,res)=>{
    try{
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success:true,message:"Product Removed"})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

//function for single product info
const singleProduct = async(req,res)=>{
    try{
        const {productId} = req.body
        const product = await productModel.findById(productId)
        res.json({success:true,product})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

export {addProduct,listProducts,removeProduct,singleProduct};