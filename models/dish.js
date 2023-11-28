const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection');

class Dish extends Model {}

Dish.init(
    {
       id: {
        type: DataTypes.INTEGER,
        allowNull: false
        },
        name: {
        type: DataTypes.STRING,
        allowNull: false
        },
        creator: {
        type: DataTypes.STRING,
        allowNull: true
        },
        ingredients: {
        type: DataTypes.ARRAY,
        allowNull: false
        }
    },
    {
        sequelize,
        freezeTableName: true,
        underscored: true,
        modelName: 'Dish',
      }
    );
    
    module.exports = Dish;