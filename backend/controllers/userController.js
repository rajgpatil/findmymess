import validator from 'validator'
import bcrypt from 'bcrypt' //for password hashing, store password in hash format
import jwt from 'jsonwebtoken' //for user authontication
import userModel from "../models/userModel.js";

const createToken = (id)=>{
    return jwt.sign({id},process.env.JWT_SECRET)
}

//route for user login
const loginUser = async(req,res)=>{
    try{
        const {email,password} = req.body;

        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message:"User doesn't exists"})
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(isMatch){
            const token = createToken(user._id)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:'Invalid credentials'})
        }
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err})
    }
}

//route for user registretion
const registerUser = async(req,res)=>{
    // res.json({msg:"Registor Api working"})
    try{
        const {name,email,password} = req.body;
        //checking user already exists or not
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success:false, message:"User already exists"})
        }

        //validating name email format and strong password
        if(validator.isEmpty(name.trim()) || name.length < 2){
            return res.json({success:false,message:"Please enter a valid name"})
        }
        if(!validator.isEmail(email)){
            return res.json({success:false,message:"Please enter a valid email"})
        }
        if(!validator.isStrongPassword(password)){
            return res.json({success:false,message:"Password must be at least 8 characters long and include uppercase, lowercase, number, and special character."})
        }
        //hashing user password
        //This generates a "salt," which is a random string added to the password before hashing.
        // The number 10 is the "salt rounds," determining how many times the hashing algorithm will run. A higher number means more secure but slower.

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password,salt);

        const newUser = new userModel({
            name,
            email,
            password:hashedPassword
        })
        //save the user in our database
        const user = await newUser.save();
        const userId = user._id
        const token = createToken(userId);
        res.json({success:true,token,userId})
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}

//route for admin login
const adminLogin = async(req,res)=>{
    try{
        const {email,password} = req.body

        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password,process.env.JWT_SECRET)
            res.json({success:true,token})
        }
        else{
            res.json({success:false,message:"Invalid Credentials"})
        }
    }
    catch(err){
        console.log(err)
        res.json({success:false,message:err.message})
    }
}
export {loginUser,registerUser,adminLogin}