const mongoose= require('mongoose');

const SellerSchema= new mongoose.Schema({
    sellerName:{
        type:String,
        required:true,
        minLength:8
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    products:[{type:mongoose.Types.ObjectId,ref:"products"}]
},{timestamps:true});

const sellerModel = mongoose.model('seller',SellerSchema)

module.exports= sellerModel;