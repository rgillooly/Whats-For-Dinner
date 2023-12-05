const router = require('express').Router();
const { User, Dish, Favorite } = require('../models/index');
const withAuth = require('../../utils/auth');

// Route to add a dish to favorites
router.post('/add/:dishId', withAuth, async (req, res) => {
  try {
    const { dishId } = req.params;
    const { userId } = req.session;

    // Check if the dish is already favorited by the user
    const existingFavorite = await Favorite.findOne({
      where: {
        dishId,
        userId,
      },
    });

    if (existingFavorite) {
      // If the dish is already favorited, handle accordingly
      return res.status(400).json({ message: 'Dish already favorited' });
    }

    // Create a new favorite association between user and dish
    await Favorite.create({
      dishId,
      userId,
    });

    res.status(200).json({ message: 'Dish added to favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to add dish to favorites' });
  }
});

// Route to remove a dish from favorites
router.delete('/remove/:dishId', withAuth, async (req, res) => {
  try {
    const { dishId } = req.params;
    const { userId } = req.session;

    // Find and delete the favorite association
    await Favorite.destroy({
      where: {
        dishId,
        userId,
      },
    });

    res.status(200).json({ message: 'Dish removed from favorites' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to remove dish from favorites' });
  }
});

module.exports = router;