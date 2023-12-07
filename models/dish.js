const { Model, DataTypes } = require('sequelize')
const sequelize = require('../config/connection');

class Dish extends Model {}

Dish.init(
    {
       id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        },
        name: {
        type: DataTypes.STRING,
        allowNull: false
        },
        ingredients: {
          type: DataTypes.TEXT, // Storing as TEXT
          allowNull: false,
          get() {
            const rawValue = this.getDataValue('ingredients');
            return rawValue ? JSON.parse(rawValue) : []; // Parse stringified array back to an array
          },
          set(value) {
            this.setDataValue('ingredients', JSON.stringify(value)); // Stringify array before saving
          },
        },
        user_id: {
          type: DataTypes.INTEGER,
          references: {
            model: 'user',
            key: 'id',
          },
        },
    },
    {
        sequelize,
        timestamps: false,
        freezeTableName: true,
        underscored: true,
        modelName: 'dish',
      }
    );
    
    module.exports = Dish;