const mongoose = require('mongoose');

const UserSchema= new mongoose.Schema({
    userName:{
        type:String,
        required:true,
        minLength:8,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minLength:8
    },
    firstName:{
        type:String,
        required: true
    },
    lastName:{
        type:String,
        required: true
    },
    DOB:{
        type:Date
    },
    ordersMade:[{type:mongoose.Types.ObjectId,ref:'order'}]
},
{timestamps:true}
);

const userModel= mongoose.model('user', UserSchema);

module.exports = userModel;