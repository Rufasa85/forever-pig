const express = require('express');
const router = express.Router();

const frontEndRoutes = require("./frontEnd")
router.use("/",frontEndRoutes);

const apiRoutes = require("./api")
router.use("/api",apiRoutes);

router.get("/sess",(req,res)=>{
    res.json(req.session)
})
router.get("/forcelogout",(req,res)=>{
    req.session.destroy()
    res.json(req.session)
})
router.get("*",(req,res)=>{
    res.status(404).send("no such page!")
})

module.exports = router;