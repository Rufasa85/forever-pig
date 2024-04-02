const express = require('express');
const router = express.Router();

const adopterRoutes = require("./adopterRoutes")
router.use("/",adopterRoutes)

module.exports = router;