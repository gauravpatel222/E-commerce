const mongoose= require('mongoose');
const Review=require('./Review');
const productschema= new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    img:{
        type:String,
        trim:true,
        required:true
    },
    price:{
        type:Number,
      //  min:0,
        required:true
    },
    description:{
        type:String,
        trim:true,
        required:true
    },
    review:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Review'
        }
    ],
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    }
});
productschema.post('findOneAndDelete' , async function(product){
    if(product.review.length > 0){
        await Review.deleteMany({_id:{$in:product.review}})
    }
})

let Product=new mongoose.model('Product', productschema);
module.exports=Product;