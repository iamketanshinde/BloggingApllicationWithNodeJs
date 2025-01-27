const { Router } = require("express");
const router  = Router();


router.get("/Addnew",(req, res)=>{
    return res.render('addblog', {
        user:req.user,
    })
})

module.exports = router;
