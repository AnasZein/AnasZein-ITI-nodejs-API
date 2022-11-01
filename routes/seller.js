const express = require('express')
const {addSeller, login, getSellerData, editProduct, deleteProduct, addProduct}= require('../controllers/sellers')
const {auth} = require('../middlewares/auth')

const router = express.Router();

router.post('/', async function(req, res){
    try{
        let token = await addSeller(req.body)
        res.send(token)
    }catch(err){
        res.status(405).json(err)
    }
})

router.post('/login', async function(req, res){
    try{
        let token = await login(req.body.sellerName, req.body.password);
        res.send(token)
    }catch(err){
        res.json({err})
    }
})

router.post('/add-product', auth, async function(req, res){
    try{
        let sellerID = req.user.sellerID;
        if(!sellerID){
            res.status(403).json('not authorized')
        }
        let product = req.body;
        let addingProduct = await addProduct(sellerID, product)
        res.json(addingProduct);
    }catch(err){
        res.json({err})
    }
})

router.get('/',auth , async function(req, res){
    try{
        let sellerID =req.user.sellerID
        if(!sellerID){
            res.status(403).json('not authorized')
        }
        let returnedData = await getSellerData(sellerID);
        res.json({name:returnedData.sellerName, products:returnedData.products});
    }catch(err){
        res.json({error:err.message})
    }
})

router.patch('/:product', auth, async function(req, res){
    try{
        let sellerID =req.user.sellerID
        if(!sellerID){
            res.status(403).json('not authorized')
        }
        let productName = req.params.product;
        let editedPorduct = await editProduct(sellerID, productName, req.body)
        res.json(editedPorduct)

    }catch(err){
        res.json(err.message)
    }
})


router.delete('/', auth, async function(req, res){
    try{
        let sellerID =req.user.sellerID
        if(!sellerID){
            res.status(403).json('not authorized')
        }
        let productName = req.params.product;
        let deletedProduct = await deleteProduct(productName)
        res.json(deletedProduct)
        
    }catch(err){
        res.json(err.message)
    }
})


module.exports =router;