import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
    name:{type:String,required:true},
    description:{
        type:String,
        required:true
    },
    fullprice:{
        type: Number,
        required:true
    },
    halfprice:{
        type: Number,
        required:true
    },
    image:{
        type:Array,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    sizes:{
        type:Array,
        required:true
    },
    bestseller:{
        type:Boolean
    },
    date:{
        type:Number,
        required:true
    }
})

//mongoose.models.product this is for if the product model is already created then not create once again, if we not write this line then our product model is created every time when we run and gives the error
const productModel = mongoose.models.product || mongoose.model("product",productSchema);

export default productModel;