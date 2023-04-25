const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Product = require("../models/products.js");
router.get("/", (req, res, next) => {
  Product.find().exec()
  .then(docs => {
    console.log(docs)
    res.status(200).json(docs)
  })
  .catch(err=> {
    console.log(err)
    res.status(500).json({error:err})
  })
}); //nu e nevoie de /products pentru ca i-am zis in
router.post("/", (req, res, next) => {
  // const product={
  //     name: req.body.name,
  //     price: req.body.price
  // }
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    _name: req.body.name,
    _price: req.body.price,
  });
  product
    .save()
    .then((res) => {
      console.log(res);
      
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({error:err })
    });
    res.status(201).json({
        message: "created prod",
        createdProduct: product
    })

  
});

router.get("/:prodID", (req, res, next) => {
  const id = req.params.prodID;
  Product.findById(id)
    .exec()
    .then((doc) => {
      console.log("from database" + doc);
      if(doc){
          
          res.status(200).json(doc);
      }
      else{

    res.status(404).json({message:"invalid"})
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
router.patch("/:prodID", (req, res, next) => {
const id= req.params.prodID
const updateOps={}
for(const ops of req.body){
    updateOps[ops.propName]= ops.value
}
Product.findByIdAndUpdate(id,{$set: updateOps } )
.exec()
.then(result=> {
    console.log(result)
    res.status(200).json(result)
.catch(err=>{
    console.log(err)
    res.status(500).json({error:err})
})
})

});
router.delete("/:prodID", (req, res, next) => {
const id= req.params.prodID
    Product.findByIdAndRemove(id)
    .exec()
    .then(
        result=>{
            res.status(200).json(result)

        }

    )
    .catch(err=>{
        console.log(err)
        res.status(500).json({error:err})
    })
})
module.exports = router;
