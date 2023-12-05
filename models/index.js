const User = require('./User');
const Dish = require('./dish');
const Review = require('./review');
const Favorite = require('./favorite')

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

Review.belongsTo(User, {
    foreignKey: 'id'
});

// Add Favorite model to associate users with their favorite dishes
User.belongsToMany(Dish, { through: Favorite, as: 'favoriteDishes', foreignKey: 'userId' });
Dish.belongsToMany(User, { through: Favorite, as: 'favoritedBy', foreignKey: 'dishId' });


module.exports = { User, Dish, Review };