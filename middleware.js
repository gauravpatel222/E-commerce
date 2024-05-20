const {productSchema,reviewschema}=require('./schema');
const Product = require("./Modals/Product");
const validateproduct=(req,res,next)=>{
   const {name,img,price,description}=req.body;
   const {error} = productSchema.validate({name,img,price,description});
   console.log(error);
   if(error){
    return res.render('error' , {error:'sam'});
   }
   next();
}
/*const validatereview = (req,res,next)=>{
    const {rating,comments} = req.body;
    const {error} = reviewschema.validate({rating,comments})
    //console.log(error);
    if(error){
        return res.render('error','samarth');
    }
    next();
}*/
const loggiedin=(req,res,next)=>{
    if(!req.isAuthenticated()){
        req.flash('error','plzz first login');
        res.redirect('/login');
    }
    next();
}
const issignedin=(req,res,next)=>{
    if(!req.user.role){
        req.flash('error','you can not add the product');
        return res.redirect('/register');
    }
    if(req.user.role !== 'seller'){
        req.flash('error','you can not add the product');
        return res.redirect('/register');
    }
    next();
}
const isAuthorized_del=async(req,res,next)=>{
    const{id}=req.params;
    const product=await Product.findById(id);
    if(!product.author.equals(req.user._id)){
        req.flash('error','you are not allowed to delete any thing');
        return res.redirect('/products');
    }
    next();

}

module.exports= {validateproduct,loggiedin,issignedin,isAuthorized_del};