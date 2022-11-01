const express = require('express');
const {addUser, login, editProfile, getUserData} = require('../controllers/users.js');
const { auth } = require('../middlewares/auth.js');


const router = express.Router();

router.get('/', auth, async function(req, res){
    try{
        let userID = req.body.userID
        if(!userID){
            res.json("unauthorized")
        }
        let userData = await getUserData(req.user.usedID)
        res.json(userData)
    }catch(err){
        res.status(403).json(err)
    }
})

router.post('/', async function(req, res){
    try{
        let token = await addUser(req.body)
        res.send(token)
    }catch(err){
        res.status(405).json(err)
    }
})

router.post('/login', async function(req, res){
    try{
        let token = await login(req.body.userName, req.body.password);
        res.send(token)
    }catch(err){
        res.json({err})
    }
})


router.patch('/', auth, async function(req, res){
    try{
        let userID = req.user.userID
        if(!userID){
            res.status(401).json("unauthorized");
        }
        if(req.body.password){
            res.json("to edit password you'll have to send two properties 1-oldPassword 2-newPassword along side your other data if you have any") 
        }else {
            await editProfile(userID, req.body)
            res.json("edited")
        }
    }catch(err){
        res.status(403).json(err.messages);
    }
})

module.exports =router;