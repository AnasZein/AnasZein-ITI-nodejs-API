const express = require('express')
const router = express.Router()
const {getAllProducts, searchBySellerName, searchByProductName} = require('../controllers/products');
const { auth } = require('../middlewares/auth');


router.get('/', async function(req, res){
    try{
        let result = await getAllProducts(req.params.limit=10, req.params.skip=0);
        res.json(result);
    }catch(err){
        res.json({error:err.message})
    }
})

router.get('/search', auth, async function(req, res){
    try{
        let userId = req.user.userID
        if(!userId){
            res.status(401).json("unauthorizad")
        }
        if(req.query.sellerName){
            let sellerProducts = await searchBySellerName(req.query.sellerName)
            res.json(sellerProducts)
        }
        else if (req.query.productName){
            let foundProducts = await searchByProductName(req.query.productName)
            res.json(foundProducts)
        }else{
            res.json({error:"not found"})
        }
    }catch(err){
        res.status(401).json(err)
    }
})

module.exports=router