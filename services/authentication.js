const JWT = require("jsonwebtoken");
const secret = "$ECRET@KEY";



function createTokenForUser(user){
    const payload={
        _id:user._id,
        email:user.email,
        profileImgUrl:user.profileImgUrl,
        role:user.role,
    }
    const token = JWT.sign(payload,secret)
    return token;
}