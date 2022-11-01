const express = require('express');
const { auth } = require('../middlewares/auth');
const {getOrders, order} = require('../controllers/orders')

const router = express.Router()

router.use(auth);

router.post('/' , async function(req, res){
    try{
        let userId = req.user.userID
        if(userId){
            let orderMade = await order(userId, req.body.products)
            res.json(orderMade);
        }else {
            res.status(403).json("invalied token")
        }
    }catch(err){
        res.json(err)
    }
})


router.get('/', async function(req,res){
    try{
        let userId = req.user.userID
        if(userId){
            let orderDetails = await getOrders(userId)
            res.json(orderDetails)
        }else {
            res.status(403).json("invalied token")
        }
    }catch(err){
        res.status(403).json(err);
    }
})

module.exports=router;