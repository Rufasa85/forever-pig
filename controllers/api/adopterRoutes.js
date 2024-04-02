const express = require('express');
const router = express.Router();
const bcrypt = require("bcrypt")
const {Adopter} = require('../../models');


//signup, /api/adopters
router.post("/",(req,res)=>{
    if(req.session.loggedIn){
        return res.status(400).json({msg:"Youre already logged in!"})
    }
    Adopter.create({
        displayName:req.body.displayName,
        email:req.body.email,
        password:req.body.password,
        lat:req.body.lat,
        lng:req.body.lng
    }).then(newAdopter=>{
        req.session.user = {
            id:newAdopter.id,
            displayName:newAdopter.displayName,
            isAdopter:true
        }
        req.session.loggedIn = true;
        res.status(201).json(newAdopter);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh no!",err})
    })
})
//login, /api/adopters/login
router.post("/login",(req,res)=>{
    if(req.session.loggedIn){
        return res.status(400).json({msg:"Youre already logged in!"})
    }
    Adopter.findOne({
        where:{
            email:req.body.email
        }
    }).then(foundAdopter=>{
        if(!foundAdopter){
            return res.status(401).json({msg:"invalid email/password combo"})
        }
        if(!bcrypt.compareSync(req.body.password,foundAdopter.password)){
            return res.status(401).json({msg:"invalid email/password combo"})
        }
        req.session.user = {
            id:foundAdopter.id,
            displayName:foundAdopter.displayName,
            isAdopter:true
        }
        req.session.loggedIn = true;
        res.status(201).json(foundAdopter);
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"oh no!",err})
    })
})
//logout /api/adopters/logout
router.delete("/logout",(req,res)=>{
    if(!req.session?.user?.isAdopter){
        return res.status(403).json({msg:"you arent logged in as an adopter"})
    }
    req.session.destroy();
    res.send("logged out")
})

module.exports = router;