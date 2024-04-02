const express = require('express');
const router = express.Router();

const farmerRoutes = require("./farmerRoutes")
router.use("/farmers",farmerRoutes)

const adopterRoutes = require("./adopterRoutes")
router.use("/adopters",adopterRoutes)

const pigRoutes = require("./pigRoutes")
router.use("/pigs",pigRoutes)

const traitRoutes = require("./traitRoutes")
router.use("/traits",traitRoutes)

module.exports = router;