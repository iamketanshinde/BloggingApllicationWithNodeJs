const express = require('express');
const path = require('path');
const app= express();
const PORT= 7001;
const userRoute = require("./routes/userRoutes")

app.set("view engine", "ejs");
app.set("views", path.resolve('./views'));


app.get('/', (req, res)=>{
    res.render('homepage');
})
app.use('/user',userRoute);

app.listen(PORT,()=>console.log(`Server Running On PORT: ${PORT}`));