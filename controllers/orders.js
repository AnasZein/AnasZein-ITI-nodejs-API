const orderModel = require('../models/order');
const productModel = require('../models/products')
const userModel = require('../models/user')

function getOrders(id){
    return orderModel.find({user:id})
}


async function order(userID, productIDs){
    // adding the order to the database
    let order = await orderModel.create({user:userID, listOfProducts:productIDs})

    // adding the order to the user orders
    let user = await userModel.findById(userID);
    let orderID = order._id
    user.ordersMade.push(orderID)
    await userModel.findByIdAndUpdate(userID, user);

    // adding one to each product orderd times
    for(let i of productIDs){                                
        let product = await productModel.findById(i);
        product.ordered += 1;
        await productModel.findByIdAndUpdate(i, product);
    }
    return order
}



module.exports={getOrders, order}