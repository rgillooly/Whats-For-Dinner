const router = require('express').Router();
const { Favorite } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to add a dish to favorites
router.post('/add/:dishId', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const dishId = req.params.dishId;

        // Create a favorite entry associating the dish with the user
        const newFavorite = await Favorite.create({ userId, dishId });

        res.status(200).json(newFavorite);
    } catch (err) {
        res.status(400).json(err);
    }
});

// Route to remove a dish from favorites
router.delete('/remove/:dishId', withAuth, async (req, res) => {
    try {
        const userId = req.session.user_id;
        const dishId = req.params.dishId;

        // Delete the favorite entry for the specified dish and user
        const deletedFavorite = await Favorite.destroy({ where: { userId, dishId } });

        if (!deletedFavorite) {
            res.status(404).json({ message: 'No favorite found with this id!' });
            return;
        }

        res.status(200).json({ message: 'Favorite removed successfully' });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;