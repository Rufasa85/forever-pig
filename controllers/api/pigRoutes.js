const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const { Pig, Trait, Farmer, Adopter } = require("../../models");
const { farmerAuth, isMyFarmedPig, adopterAuth } = require("../../middleware");

//get all, GET /api/pigs
router.get("/", (req, res) => {
  Pig.findAll()
    .then((pigs) => {
      res.json(pigs);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no", err });
    });
});
//get one GET /api/pigs/:id
router.get("/:id", (req, res) => {
  Pig.findByPk(req.params.id, {
    include: [Farmer, Adopter, Trait],
  })
    .then((pig) => {
      if (!pig) {
        return res.status(404).json({ msg: "no such pig!" });
      }
      res.json(pig);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no", err });
    });
});
//protected
//create POST /api/pigs
router.post("/", farmerAuth, (req, res) => {
  Pig.create({
    name: req.body.name,
    image: req.body.image,
    isAdoptable: req.body.isAdoptable,
    AdopterId: req.body.AdopterId,
    FarmerId: req.session.user.id,
  })
    .then((newPig) => {
      res.json(newPig);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no", err });
    });
});
//edit PUT /api/pigs/:id
router.put("/:id", farmerAuth, isMyFarmedPig, (req, res) => {
  Pig.update(
    {
      name: req.body.name,
      image: req.body.image,
      isAdoptable: req.body.isAdoptable,
      AdopterId: req.body.AdopterId,
    },
    {
      where: {
        id: req.params.id,
      },
    }
  )
    .then((changedPig) => {
      res.json(changedPig);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no", err });
    });
});
//delete DELETE /api/pigs/:id
router.delete("/:id", farmerAuth, isMyFarmedPig, (req, res) => {
  Pig.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((delPig) => {
      res.json(delPig);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no", err });
    });
});
//addTrait POST /api/pigs/:pigId/traits/:traitId
router.post(
  "/:pigId/traits/:traitId",
  farmerAuth,
  isMyFarmedPig,
  async (req, res) => {
    try {
      const foundPig = await Pig.findByPk(req.params.pigId);
      await foundPig.addTrait(req.params.traitId);
      res.json({ msg: "trait added" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "oh no", error });
    }
  }
);
//removeTrait DELETE /api/pigs/:pigId/traits/:traitId
router.delete(
  "/:pigId/traits/:traitId",
  farmerAuth,
  isMyFarmedPig,
  async (req, res) => {
    try {
      const foundPig = await Pig.findByPk(req.params.pigId);
      await foundPig.removeTrait(req.params.traitId);
      res.json({ msg: "trait removed" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ msg: "oh no", error });
    }
  }
);

//need to be logged in as adopter
//adopt PUT /api/pigs/:id/adopt
router.put("/:id/adopt", adopterAuth, async (req, res) => {
  try {
    const changedPig = await Pig.update(
      {
        AdopterId: req.session.user.id,
        isAdoptable: false,
      },
      {
        where: {
          id: req.params.id,
          isAdoptable: true,
        },
      }
    );
    // console.log
    if(!changedPig[0]){
      return res.status(400).json({msg:"pig not avaialable"})
    }
    res.json(changedPig);
  } catch (error) {
    console.log(err);
    res.status(500).json({ msg: "oh no", err });
  }
});

//also needs to be your pig
//return PUT /api/pigs/:id/adopt

module.exports = router;
router.put("/:id/return", adopterAuth, async (req, res) => {
  try {
    const changedPig = await Pig.update(
      {
        AdopterId: null,
        isAdoptable: true,
      },
      {
        where: {
          id: req.params.id,
          AdopterId:req.session.user.id
        },
      }
    );
    // console.log
    if(!changedPig[0]){
      return res.status(400).json({msg:"pig not in your care"})
    }
    res.json(changedPig);
  } catch (error) {
    console.log(err);
    res.status(500).json({ msg: "oh no", err });
  }
});
