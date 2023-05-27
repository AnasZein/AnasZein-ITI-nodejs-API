const express= require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const usersRouter = require('./routes/user.js')
const sellersRoutes = require('./routes/seller')
const productsRoures = require('./routes/product.js')
const ordersRoures = require('./routes/order')

const app = express()
//mongoose.connect('mongodb://localhost:27017/e-commerse-website')
mongoose.connect('mongodb+srv://anaselbadran:PrAN4BarJd!_L_P@cluster0.vfzmvxy.mongodb.net/')

app.use(cors({
    origin:"*",
    methods:'GET POST PATCH PUT DELETE'
}))



app.use(express.json())

app.use('/users', usersRouter);
app.use('/sellers', sellersRoutes);
app.use('/products', productsRoures);
app.use('/orders', ordersRoures)




app.listen( 8000,()=>{
    console.log('Back to bussiness')
})
