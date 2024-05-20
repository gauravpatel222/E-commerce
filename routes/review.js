const express= require('express');
const router=express.Router();
const Product=require('../Modals/Product');
const Reviews=require('../Modals/Review');
//const{validatereview}=require('../middleware');
router.post('/products/:id/review',async(req,res)=>{
    try{
    const {id}=req.params;
   // console.log(id);
    const {rating,comments}=req.body;
    const founditem=await Product.findById(id);
    const reviews=new Reviews({rating,comments});
 //   console.log(reviews);
    founditem.review.push(reviews);
    console.log( founditem.review.push(reviews));
    await reviews.save();
    await founditem.save();
    req.flash('success' , 'Review added successfully')
    res.redirect(`/products/${id}`);
    }
    catch(e){
        console.log(e.message);
        req.flash('error' , 'Review not added successfully')
        res.status(500).render('error' , {error:e.message});
    }
});
/*router.delete('/reviews/:id/check',async(req,res)=>{
    const{id}=req.params;
    console.log(id);
    await Reviews.findByIdAndDelete(id);
    console.log(product);
  //  const{rating,comments}=req.body;
 //   const review=await Reviews.find({rating,comments});
  //  const review_id=review._id;
  //  await Product.findByIdAndUpdate(id, { $pull: { review: review_id } });

})*/
module.exports=router;