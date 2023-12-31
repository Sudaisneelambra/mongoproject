const mongoose= require('mongoose')

const userSchema= new mongoose.Schema({
    PDname:{type:String,required:true},
    PDdiscription:{type:String,required:true},
    PDprice:{type:Number,required:true},
    USERID:{type:mongoose.Types.ObjectId,required:true},
    imagePath: {type: String,required: true},
    totalQuantity:{type:Number,required:true}
})

const cart=mongoose.model('Cart',userSchema)

module.exports=cart