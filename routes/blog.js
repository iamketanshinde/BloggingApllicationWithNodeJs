const { Router } = require("express");
const router  = Router();


router.get("/addnew",(req, res)=>{
    return res.render('addblog', {
        user:req.user,
    })
})

module.exports = router;
