const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Trait extends Model {}

Trait.init({
    // add properites here, ex:
    trait: {
         type: DataTypes.STRING,
         allowNull:false
    }
},{
    sequelize
});

module.exports=Trait