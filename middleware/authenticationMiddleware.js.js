const { validateToken } = require("../services/authentication");

function chechForAuthenticationCookie(CookieName){
    return (req, res, next)=>{
        const tokenCokkieValue = req.cookies[CookieName]
        if(!tokenCokkieValue){
          return  next();
        }
        try{
        const userPayload = validateToken(tokenCokkieValue);
        req.user = userPayload;
        }
        catch(error) {}

        return next();
    };
}


module.exports ={
    chechForAuthenticationCookie,
}