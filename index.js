// first initialization of all the files
const express=require('express');
const app=express();
const path=require('path');
const seeddb=require('./seed');
const mongoose = require('mongoose');
//const Product=require('../Modals/Product');
const ejsMate = require('ejs-mate');
const methodOverride = require('method-override');
const flash=require('connect-flash');
const session=require('express-session');
const passport=require('passport');
const localstrategy=require('passport-local');
const User=require('./Modals/User');
// 2 then connect router of all files


// 3 then tuse middlewares of it
let configSession = {
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true , 
    // cookie:{

    // }
}


mongoose.connect('mongodb://127.0.0.1:27017/e-commerce')
.then(()=>{
    console.log("DB connected successfully")
})
.catch((err)=>{
    console.log("DB error");
    console.log(err)
})
app.engine('ejs' , ejsMate);
app.set('view engine' , 'ejs');
app.set('views' , path.join(__dirname , 'views')); // views folder
app.use(express.static(path.join(__dirname , 'public'))); // public folder
app.use(express.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(session(configSession));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req,res,next)=>{
    res.locals.currentuser=req.user;
  //  console.log(currentuser);
    res.locals.success=req.flash('success');
    res.locals.error=req.flash('error');
    next();
})
const productroutes=require('./routes/product');
const reviewroutes=require('./routes/review');
const authroutes=require('./routes/auth');
const cartroutes =require('./routes/cart');
const productApi = require('./routes/api/productapi');
const payment=require('./routes/payment');

passport.use(new localstrategy(User.authenticate()));

app.use(productroutes);
app.use(reviewroutes);
app.use(authroutes);
app.use(cartroutes);
app.use(productApi);
app.use(payment);

//seeddb();
app.listen(5005,()=>{
    console.log('db connected');
});


//app id:1720410885136942
//app secret:1548fa46b5ebd0fae627c4df29984f3f