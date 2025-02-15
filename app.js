require('dotenv').config();


const express = require('express');
const path = require('path');
const app= express();
const PORT= process.env.PORT || 7001;

const userRoute = require("./routes/userRoutes")
const blogRoute = require("./routes/blog.js")
const Blog  = require('./model/blog.js')

                                                                                              
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { chechForAuthenticationCookie } = require('./middleware/authenticationMiddleware.js.js');

app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(chechForAuthenticationCookie("token"));
app.use(express.static(path.resolve('./public')));


app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));

mongoose
.connect(process.env.MONGO_URl)
.then((e)=>console.log("mongodb Connected!"));

app.get('/', async(req, res)=>{
    const allblogs = await Blog.find({}); 
    res.render('homepage',{
        user:req.user,
        blogs:allblogs,
    });
});

app.use('/user',userRoute);
app.use('/blog',blogRoute);

app.listen(PORT,()=>console.log(`Server Running On PORT: ${PORT}`));