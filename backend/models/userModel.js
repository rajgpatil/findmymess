import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique: true
    },
    password:{
        type:String,
        required:true
    },
    cartData:{
        type:Object,
        default:{}
    },

},{minimize:false}) //Normally, Mongoose removes empty objects ({}) from the database by default to save space. This is called minimizing.
//By setting minimize: false, you are telling Mongoose to keep empty objects, even if they are empty.
// The cartData field has a default value of {} (an empty object).
// With minimize: false, Mongoose will not remove cartData even if it remains empty when saving the document.

const userModel = mongoose.models.user || mongoose.model('user',userSchema);

export default userModel;