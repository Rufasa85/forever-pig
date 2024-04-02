const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const bcrypt = require("bcrypt")

class Adopter extends Model {}

Adopter.init(
  {
    // add properites here, ex:
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    displayName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [3],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
    lat: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: -90,
        min: 90,
      }
    },
    lng: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: -180,
        min: 180,
      },
    }
  },
  {
    sequelize,
    hooks:{
        beforeCreate:obj=>{
            obj.password = bcrypt.hashSync(obj.password,6);
            return obj;
        }
    }
  }
);

module.exports = Adopter;
