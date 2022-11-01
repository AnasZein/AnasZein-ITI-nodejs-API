const productModel = require('../models/products');
const sellerModel = require('../models/sellers')
function getAllProducts(limit, skip){
    return productModel.find({}, null, {limit:limit, skip:skip})
}


async function searchBySellerName(sellerName){
    let seller = await sellerModel.findOne({sellerName});
    let sellerID = seller._id
    return productModel.find({seller:sellerID})
}

function searchByProductName(productName){
    return productModel.find({name:productName})
}


module.exports= {getAllProducts, searchBySellerName,searchByProductName};