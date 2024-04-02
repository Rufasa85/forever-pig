const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const {Farmer} = require('../../models');


//signup, /api/farmers
router.post("/",(req,res)=>{
    if(req.session.loggedIn){
        return res.status(400).json({msg:"Youre already logged in!"})
    }
    Farmer.create({
        displayName:req.body.displayName,
        email:req.body.email,
        password:req.body.password,
        lat:req.body.lat,
        lng:req.body.lng
    }).then(newFarmer=>{
        req.session.user = {
            id:newFarmer.id,
            displayName:newFarmer.displayName
        }
        req.session.loggedIn = true;
        res.status(201).json(newFarmer);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh no!",err})
    })
})
//login, /api/farmers/login
router.post("/login",(req,res)=>{
    if(req.session.loggedIn){
        return res.status(400).json({msg:"Youre already logged in!"})
    }
    Farmer.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundFarmer=>{
        if(!foundFarmer){
            return res.status(401).json({msg:"invalid email/password combo"})
        }
        if(!bcrypt.compareSync(req.body.password,foundFarmer.password)){
            return res.status(401).json({msg:"invalid email/password combo"})
        }
        req.session.user = {
            id:foundFarmer.id,
            displayName:foundFarmer.displayName
        }
        req.session.loggedIn = true;
        res.status(201).json(foundFarmer);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh no!",err})
    })
})
//logout /api/farmers/logout
router.delete("/logout",(req,res)=>{
    if(req.session?.user?.isAdopter){
        return res.status(403).json({msg:"you arent logged in as an farmer"})
    }
    req.session.destroy();
    res.send("logged out")
})

module.exports = router;