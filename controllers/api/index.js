const router = require('express').Router();
const userRoutes = require('./userRoutes');
const dishRoutes = require('./dishRoutes');
const reviewRoutes = require('./reviewRoutes');

router.use('/users', userRoutes);
router.use('/dishes', dishRoutes);
router.use('/reviews', reviewRoutes);

module.exports = router;