const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dishRoutes = require('./dishRoutes');
const reviewRoutes = require('./reviewRoutes');

router.use('/users', userRoutes);
router.use('/dishes', dishRoutes);
router.use('/reviews', reviewRoutes);


const userRoutes = require('./userRoutes');
const dishRoutes = require('./dishRoutes');
const reviewRoutes = require('./reviewRoutes');
const favoriteRoutes = require('./favoriteRoutes');

router.use('/users', userRoutes);
router.use('/dishes', dishRoutes);
router.use('/reviews', reviewRoutes);
router.use('/favorites', favoriteRoutes);

module.exports = router;