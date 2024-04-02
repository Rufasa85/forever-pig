const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Pig extends Model {}

Pig.init({
    // add properites here, ex:
    name: {
         type: DataTypes.STRING,
         allowNull:false,
    },
    image:{
        type:DataTypes.STRING,
        validate:{
            isUrl:true
        }
    },
    isAdoptable:{
        type:DataTypes.BOOLEAN,
        allowNull:false,
        defaultValue:true
    }
},{
    sequelize
});

module.exports=Pig