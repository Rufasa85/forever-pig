const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Pig, Trait } = require("../../models");
const { farmerAuth, isMyFarmedPig } = require("../../middleware");

//get all, GET /api/traits
router.get("/", (req, res) => {
  Trait.findAll()
    .then((traits) => {
      res.json(traits);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({msg:"oh no", err})
    });
});
//get one GET /api/traits/:id
router.get("/:id", (req, res) => {
  Trait.findByPk(req.params.id, {
    include: [Pig],
  })
    .then((trait) => {
      if (!trait) {
        return res.status(404).json({ msg: "no such trait!" });
      }
      res.json(trait);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({msg:"oh no", err})
    });
});
//protected
//create POST /api/pigs
router.post("/", farmerAuth, (req, res) => {
  Trait.create({
    trait:req.body.trait
  })
    .then((newTrait) => {
      res.json(newTrait);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({msg:"oh no", err})
    });
});

module.exports = router;
