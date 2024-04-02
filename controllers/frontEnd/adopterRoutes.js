const express = require('express');
const router = express.Router();
const {getDistance,convertDistance} = require("geolib")
const {Pig, Adopter, Farmer, Trait} = require("../../models");
const { adopterFrontEndProfileRedirect, adopterFrontEndLoginRedirect } = require('../../middleware');
router.get("/",(req,res)=>{
    Pig.findAll({
        where:{
            isAdoptable:true
        }
    }).then(foundPiggies=>{
        const hbsPigs = foundPiggies.map(pigg=>pigg.toJSON())
        res.render("home",{
            loggedIn:req.session.loggedIn,
            piggies:hbsPigs
        })
    })
})

router.get("/login",adopterFrontEndProfileRedirect,(req,res)=>{
    res.render("login")
})

router.get("/signup",adopterFrontEndProfileRedirect,(req,res)=>{
    res.render("signup")
})

router.get("/profile",adopterFrontEndLoginRedirect,async (req,res)=>{
try {
    const me = await Adopter.findByPk(req.session.user.id,{
        include:[{
            model:Pig,
            include:[Farmer,Trait]
        }]
    })
    const hbsMe = me.toJSON()
    const availPiggies =await  Pig.findAll({
        where:{
            isAdoptable:true
        },
        include:[Farmer,Trait]
    })
    const availHbsPiggies = availPiggies.map(ap=>{
        const formatted = ap.toJSON()
        const distance = getDistance({latitude:ap.Farmer.lat,longitude:ap.Farmer.lng},{latitude:hbsMe.lat,longitude:hbsMe.lng})
        const convertedDistance = convertDistance(distance,"mi")
        formatted.distance = convertedDistance;
        return formatted
    }).sort((a,b)=>{
        if(a.distance<b.distance) {
            return -1
        } else {
            return 1
        }
    }).map(ap=>{
        return {
            ...ap,
            distance:ap.distance.toFixed(2)
        }
    })
  const hbsData = {
        loggedIn:true,
        availablePigs:availHbsPiggies,
        ...hbsMe,
        hasPigs:hbsMe.Pigs.length>0
    }
    // console.log('hbsData', hbsData)
    res.render("profile",hbsData)
} catch (error) {
    console.log(error);
    res.status(500).json({msg:"wtf"})
}
})

module.exports = router;