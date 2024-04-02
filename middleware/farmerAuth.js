const farmerAuth = (req,res,next)=>{
    if(!req.session.loggedIn || req.session.user.isAdopter){
        return res.status(403).json({msg:"You need to be a farmer"})
    } else {
        next();
    }
}

module.exports = farmerAuth