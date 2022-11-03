const mongoose = require('mongoose')

let orderSchema = new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'user'
    },
    listOfProducts:[{
        type:mongoose.Types.ObjectId,
        ref:'products'
    }]
},{timestamps:true});

let orderModel = mongoose.model('order',orderSchema);

module.exports=orderModel;


// this is coming from my local repo