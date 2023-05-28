const mongoose  = require('mongoose');

const orderSchema= mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    quantity: {type: Number, default: 1},
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
    name: {type: String},
    address: {type:String, reqire:true},
    phone: {type:String, reqire:true},
    mail: {type:String, reqire:true}
    


})

module.exports= mongoose.model('Order', orderSchema)