const User = require('./User');
const Dish = require('./dish');
const Review = require('./review');
const Favorite = require('./favorite')

User.hasMany(Dish, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Review, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Dish.belongsTo(User, {
    foreignKey: 'user_id'
});

Dish.hasMany(Review, {
    foreignKey: 'dish_id',
    onDelete: 'CASCADE'
});

Review.belongsTo(Dish, {
    foreignKey: 'dish_id'
});

Review.belongsTo(User, {
    foreignKey: 'user_id'
});

// Add Favorite model to associate users with their favorite dishes
User.belongsToMany(Dish, { through: Favorite, as: 'favoriteDishes', foreignKey: 'userId' });
Dish.belongsToMany(User, { through: Favorite, as: 'favoritedBy', foreignKey: 'dishId' });


module.exports = { User, Dish, Review };