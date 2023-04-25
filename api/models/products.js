const mongoose= require('mongoose')
const productSchema= mongoose.Schema({

_id:mongoose.Schema.Types.ObjectId,
_name: String,
_price: Number

})
 
module.exports=mongoose.model('Product',productSchema)