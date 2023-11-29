const User = require('./User');
const Dish = require('./dish');
const Review = require('./review');

User.hasMany(Dish, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});

User.hasMany(Review, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});

Dish.belongsTo(User, {
    foreignKey: 'id'
});

Dish.hasMany(Review, {
    foreignKey: 'id',
    onDelete: 'CASCADE'
});

Review.belongsTo(Dish, {
    foreignKey: 'id'
});

Review. belongsTo(User, {
    foreignKey: 'id'
});

module.exports = { User, Dish, Review };