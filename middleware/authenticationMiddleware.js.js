const { validateToken } = require("../services/authentication");

function chechForAuthenticationCookie(CookieName){
    return (req, res, next)=>{
        const tokenCokkieValue = req.cookies[CookieName]
        if(!tokenCokkieValue){
            next();
        }
        try{
        const userPayload = validateToken(tokenCokkieValue);
        req.user = userPayload;
        }
        catch(error) {}

        next();
    };
}


module.exports ={
    chechForAuthenticationCookie,
}