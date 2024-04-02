const adopterFrontEndProfileRedirect = (req,res,next)=>{
    if(req.session.loggedIn ){
        return res.redirect("/profile")
    } else {
        next();
    }
}

module.exports = adopterFrontEndProfileRedirect