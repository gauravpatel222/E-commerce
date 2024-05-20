const express=require('express');
const Product=require('../Modals/Product');
const reviews=require('../Modals/Review');
const router=express.Router();
const {validateproduct,loggiedin,issignedin,isAuthorized_del}=require('../middleware');
// const {} = require('../')

router.get('/products',loggiedin,async(req,res)=>{
    try{
    const products=await Product.find({});
    res.render('product/index',{products});
    }
    catch(e){
        res.status(500).render('error' , {err : e.message});
    }
})
router.get('/products/new',loggiedin,issignedin,(req,res)=>{
    try{
    res.render('product/new');
    }
    catch(e){
        res.status(500).render('error' , {err : e.message});
    }
});
router.post('/products',loggiedin,validateproduct,async(req,res)=>{
    try{
    const{name,img,price,description}=req.body;
    await Product.create({name,img,price,description,author:req.user._id});
    req.flash('success' , 'Product edited successfully');
    res.redirect('/products');
   // console.log("kaam hogya bero");
    }
    catch(e){

     res.status(500).render('error' , {err : e.message});
}
})
// to show a particular product
router.get('/products/:id',loggiedin,async(req,res)=>{
    try{
    let {id}=req.params;
    const product=await Product.findById(id).populate('review');// WE DO POPULATE WITH THE HELP OF ID
   console.log(product);
    res.render('product/show',{product});
    }
    catch(e){
        res.status(500).render('error' , {err : e.message});
    }
})
router.get('/products/:id/edit',loggiedin,async(req,res)=>{
    try{
    let{id}=req.params;
    const founditem=await Product.findById(id);
    res.render('product/edit',{founditem});
    }
    catch(e){
        res.status(500).render('error' , {err : e.message});
    }

});
router.patch('/products/:id',loggiedin,async(req,res)=>{
    try{
    let{id}=req.params;
    let{name,img,price,description}=req.body;
    await Product.findByIdAndUpdate(id,{name,img,price,description});
    req.flash('success' , 'Product edited successfully');
    res.redirect(`/products/${id}`);
    }
    catch(e){
        res.status(500).render('error' , {err : e.message});
    }
})
router.delete('/products/:id',loggiedin,isAuthorized_del,async(req,res)=>{
    try{
    let{id}=req.params;
    let{name,img,price,description,reviews}=req.body;
    const product=await Product.findById(id);
    await Product.findByIdAndDelete(id,product);
    req.flash('success' , 'Product deleted successfully');
    res.redirect('/products');
    }
    catch(e){
        res.status(500).render('error' , {err : e.message});
    }
})






module.exports=router;