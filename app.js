const express=require('express')
const morgan= require('morgan') 
const bodyParser= require('body-parser')
const mongoose= require('mongoose')
const cors= require('cors')
//const { json } = require('express/lib/response')
const productRoutes= require('./api/routes/products')
const orderRoutes=require("./api/routes/orders")
const nodemon = require('nodemon')

async function connect(){
    try{
        await mongoose.connect('mongodb+srv://veltandev:kbGNXoYvZhsEJhFS@node-rest-shop.vx5e3hs.mongodb.net/?retryWrites=true&w=majority')
        console.log('connected to MONGODB')

    }
    catch(error){
        console.error(error);

    }
}
//mongoose.connect('mongodb+srv://veltandev:kbGNXoYvZhsEJhFS@node-rest-shop.vx5e3hs.mongodb.net/?retryWrites=true&w=majority')
  connect()  

const app= express()
app.use(cors());
//il folosim inainte de a face ceva cu req
app.use(morgan('dev'))
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use((req,res,next)=>{
    res.header('Acces-Control-Allow-Origin', '*')
    res.header('Acces-Control-Allow-Headers', '*')
    if(req.method==='OPTIONS'){
        res.header("Acces-Control-Allow-Headers",'*')
        return res.status(200).json({ })
    }
    next()
})
//routes
app.use('/products',productRoutes) //tot ce incepe cu /routes va utiliza scriptul (adica get, porst etc) din products.js
app.use('/orders',orderRoutes)

app.use((req, res, next)=>{
    const error= new Error('not found')
    error.status= 404 // setam proprietatea status 
    next(error)
}) //tratam tot ce nu e gasit

app.use((error,req, res, next)=>{
    res.status(error.status || 500)
    res.json({
        error:{
            message: error.message
        }
    })
}) //in caz ca se arunca o eroare
module.exports= app; 