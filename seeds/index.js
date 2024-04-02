const sequelize = require("../config/connection")
const { Farmer, Adopter, Pig, Trait } = require("../models")
const { adopterSeeds } = require("./adopterSeeds")
const {farmerSeeds} = require("./farmerSeeds")
const { pigSeeds } = require("./pigSeeds")
const { traitSeeds } = require("./traitSeeds")

const seedz = async ()=>{
    try {
        await sequelize.sync({force:true})
        const farmerz = await Farmer.bulkCreate(farmerSeeds,{
            individualHooks:true
        })
        const adopterz = await Adopter.bulkCreate(adopterSeeds,{
            individualHooks:true
        })
        const pigz = await Pig.bulkCreate(pigSeeds)
        const traitz = await Trait.bulkCreate(traitSeeds)

        const farmerFormatted = farmerz.map(farm=>farm.toJSON());
        console.table(farmerFormatted);
        const adopterFormatted = adopterz.map(adop=>adop.toJSON());
        console.table(adopterFormatted);
        const pigsFormatted = pigz.map(pig=>pig.toJSON());
        console.table(pigsFormatted);
        const traitsFormatted = traitz.map(tra=>tra.toJSON());
        console.table(traitsFormatted);
        await pigz[0].addTrait(1)
        await pigz[0].addTrait(3)
        await pigz[1].addTraits([2,3])
        process.exit(0)
    } catch (error) {
        console.log(error)
    }
}

seedz();