const { Router } = require("express");
const router  = Router();


router.get("/Addnew",(req, res)=>{
    return res.render('addblog', {
        user:req.user,
    })
})
router.post("/",(req, res)=>{
    console.log(req.body);
    return res.redirect("/")
})

module.exports = router;
