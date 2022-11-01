const sellerModel = require('../models/sellers');
const productModel = require('../models/products')
const jwt= require('jsonwebtoken');
const bcrypt = require('bcrypt');


async function getSellerData(id){
    let seller = await sellerModel.findById(id).populate('products')
    return seller
}



async function addSeller(seller) {
    let newPass = bcrypt.hashSync(seller.password, 10)
    seller.password =newPass
    let newseller = await sellerModel.create(seller);
    if(!newseller){
        throw "not found"
    }else {
        let token = jwt.sign({
            data:{
                sellerName:seller.sellerName,
                sellerID:newseller.id
            }
        },
            process.env.SECRET,
            {expiresIn:'2h'}
        )
        return token
    }
}


async function login(usnm, pass){
    let seller = await sellerModel.findOne({sellerName:usnm})
    if(!seller){
        throw 'seller not found'
    }
    let valiedPass = bcrypt.compareSync(pass, seller.password)
    if(!valiedPass){
        throw 'password wrong'
    }
    let token = jwt.sign({
        data:{
            sellerName:usnm,
            sellerID:seller.id,
        }
    },
        process.env.SECRET,
        {expiresIn:'2h'}
    )
    return token
}


async function addProduct(sellerID, product){
    let seller = await sellerModel.findById(sellerID);
    product.seller = sellerID
    let addedProduct = await productModel.create(product);
    let prdID = addedProduct._id;
    seller.products.push(prdID);
    return sellerModel.findByIdAndUpdate(sellerID, seller).populate('products')
}

async function editProduct(sellerID,prdName, edited){
    let product = await productModel.findOne({name:prdName});
    if(sellerID === product.seller){
        return productModel.findOneAndUpdate({name:prdName}, edited, {returnDocument:'after'})
    }else {
        throw "not found"
    }
}

function deleteProduct(prdName){
    return productModel.findOneAndDelete({name:prdName});
}

module.exports={addSeller, login, getSellerData, editProduct, deleteProduct, addProduct}