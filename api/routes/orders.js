const express=require("express")
const router=express.Router()
const mongoose = require('mongoose');
const Order= require('../models/orders')
const Product= require('../models/products')

router.get('/', (req, res, next) => {
    Order.find()
      .select('product quantity _id')
      .exec()
      .then(docs => {
        res.status(200).json({
          count: docs.length,
          orders: docs.map(doc => {
            return {
              id: doc.id,
              quantity: doc.quantity,
              product: doc.product,
              name:doc.name,
              address: doc.address,
              phone: doc.phone,
              mail: doc.mail,
              request: {
                type: 'GET',
                url: 'http://localhost:3000/orders/' + doc._id
              }
            };
          })
        });
      })
      .catch(err => {
        console.log(err);
        res.status(500).json({
          error: err
        });
      });
  });
router.post('/',(req,res,next)=>{
Product.findById(req.body.productId)
.then(
    product=>{
        if(!product){
            res.status(400).json({
                message: 'Product not found'
            })
        }
        const order= new Order( {
            _id: new mongoose.Types.ObjectId(),
            quantity: req.body.quantity, 
            product: req.body.productId,
            name:req.body.name,
            address:req.body.address,
            phone:req.body.phone,
            mail:req.body.mail
        })
        return order.save()
        .then(result=> {
            console.log(result)
            res.status(201).json(result);
        })
    
    }
    
)


.catch(err=>{
    console.log(err)
    res.status(500).json({
        error:err
    })
})

   
    

})
router.get('/:orderID',(req,res,next)=>{
   Order.findById(req.params.orderID).exec()
   .then(order=>{ 
    if(!order){
       return res.status(404).json({
            message: 'Not found'
        })
    }
    
    res.status(200).json({
        order: order,
        request:{
            type: 'GET',
            url: 'http://localhost:3000/orders'
        }
    })
   })
   .catch(err=>{
    console.log(err)
    res.status(500).json({
        error: err
    })
   })

})
router.patch('/:orderID',(req,res,next)=>{
    res.status(201).json({
        message: "order patch",
        orderID: req.params.orderID
       
    })
})
router.delete('/:orderID',(req,res,next)=>{
   Order.findByIdAndRemove(req.params.orderID)
   .exec()
   .then(result=>{
    res.status(200).json({
        message: 'Order '+ req.params.orderID+' deleted'
    })
   })
   .catch( err=> {
    res.status(500).json({
        error: err
    })
   })
})

module.exports=router