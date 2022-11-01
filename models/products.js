const mongoose= require('mongoose');

const ProductSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discription:{
        type:String,
        required:true,
        // minLength:50
    },
    image:{
        type:String,
        required:true
    },
    seller:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"seller",
        required:true
    },
    ordered:{
        type:Number
    }
},{timestamps:true});

const productModel = mongoose.model('products',ProductSchema);

module.exports= productModel;