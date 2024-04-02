const { Pig } = require("../models")

const insMyFarmedPig = (req,res,next)=>{
    Pig.findByPk(req.params.id||req.params.pigId).then(foundPig=>{
        if(!foundPig){
            return res.status(404).json({msg:"no such pig"})
        }
        if(foundPig.FarmerId!==req.session.user.id){
            return res.status(403).json({msg:"not your pig"})
        }
        next();
    })
}

module.exports = insMyFarmedPig