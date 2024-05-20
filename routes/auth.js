
const express=require('express');
const router=express.Router();
const User=require('../Modals/User');
const passport=require('passport');



router.get('/register',(req,res)=>{
    res.render('auth/signup');
})
router.post('/register',async(req,res)=>{
    try{
    const {username,email,password,role}=req.body;
    const user=new User({email,username,role});
    const newuser=await User.register(user,password);
    console.log(newuser);
    req.login( newuser , function(err){
        if(err){return next(err)}
        console.log(req.user);
        req.flash('success' , 'welcome,  you are registed succesfully');
        return res.redirect('/products');
    })
}
catch(e){
    console.log(e.message);
    req.flash('error','plz first sign up');
    res.render('/signup');
}

})
// to login the page
router.get('/login',(req,res)=>{
    res.render('auth/login')
})
router.post('/login', 
    passport.authenticate('local', { 
        failureRedirect: '/login', 
        failureMessage: true 
    }),
    (req,res)=>{
        // console.log(req.user,'sam');
        req.flash('success' , 'welcome back')
        res.redirect('/products');
})


// logout
router.get('/logout' , (req,res)=>{
    ()=>{
        req.logout();
    }
    req.flash('success' , 'goodbye friends, see you again')
    res.redirect('/login');

})

module.exports=router;