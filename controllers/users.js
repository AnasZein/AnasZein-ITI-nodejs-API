const userModel = require('../models/user');
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');


async function getUserData(id){
    let user = await userModel.findById(id)
    return {userName:user.userName, fistname:user.firstName, lastName:user.lastName}
}

async function addUser(user) {
    let newPass = bcrypt.hashSync(user.password, 10)
    user.password =newPass
    let newUser = await userModel.create(user);
    if(!newUser){
        return "error"
    }else
    return newUser;
    }



async function login(usnm, pass){
    let user = await userModel.findOne({userName:usnm})
    if(!user){
        throw 'user not found'
    }
    let valiedPass = bcrypt.compareSync(pass, user.password)
    if(!valiedPass){
        throw 'password wrong'
    }
    let token = jwt.sign({
        data:{
            userName:usnm,
            userID:user.id
        }
    },
        process.env.SECRET,
        {expiresIn:'2h'}
    )
    return token
}

async function editProfile(userID, newData){
    if(newData.newPassword){
        let user = await userModel.findById(userID);
        let valiedPass = bcrypt.compareSync(newData.oldPassword, user.password);
        if(!valiedPass){
            throw "wrong password try another way"
        }
        let password = bcrypt.hashSync(newData.newPassword, 10);
        newData.password = password;
        return userModel.findByIdAndUpdate(userID, newData, {returnDocument:'after'});
    }
    else{
        return userModel.findByIdAndUpdate(userID, newData, {returnDocument:'after'});
    }
}

module.exports={addUser, login, getUserData, editProfile}