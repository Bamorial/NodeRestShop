const express=require("express")
const router=express.Router()
router.get('/',(req,res,next)=>{
    res.status(201).json({
        message: "order get",
        orderID: req.params.orderID
    })
})
router.post('/',(req,res,next)=>{
    const order={
        name: req.body.name,
        quantity: req.body.quantity
    }
    res.status(201).json({
        message: "order get",
        orderID: req.params.orderID,
        createdOrder: order
    })
})
router.get('/:orderID',(req,res,next)=>{
    res.status(201).json({
        message: "order get",
        orderID: req.params.orderID
    })
})
router.patch('/:orderID',(req,res,next)=>{
    res.status(201).json({
        message: "order patch",
        orderID: req.params.orderID
       
    })
})
router.delete('/:orderID',(req,res,next)=>{
    res.status(201).json({
        message: "order delete",
        orderID: req.params.orderID
    })
})

module.exports=router