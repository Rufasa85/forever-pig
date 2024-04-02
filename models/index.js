const Adopter = require("./Adopter")
const Farmer = require("./Farmer")
const Pig = require("./Pig")
const Trait = require("./Trait")
//Pig to Farmer 1:m
Pig.belongsTo(Farmer,{
    onDelete:"CASCADE"
})
Farmer.hasMany(Pig)
//Pig to Adopter 1:m
Pig.belongsTo(Adopter)
Adopter.hasMany(Pig)

//Pig to trait m:m
Pig.belongsToMany(Trait,{
    through:"PigsTraits"
})
Trait.belongsToMany(Pig,{
    through:"PigsTraits"
})

module.exports = {
    Adopter,
    Farmer,
    Pig,
    Trait
}