const {getUser}=require("../service/auth");

async function handleRestrictToLoggedinUserOnly(req,res,next){
    const useruid=req.cookies.uid;
    if(!useruid) return res.redirect("/login");
    const user=getUser(useruid);
    if(!user) return res.redirect("/login");
    req.user=user;
    next();
}

async function checkAuth(req,res,next){
    const useruid=req.cookies.uid;
    const user=getUser(useruid);
    req.user=user;
    next();
}

module.exports={
    handleRestrictToLoggedinUserOnly,
    checkAuth
}