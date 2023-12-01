const router = require('express').Router();
const { Dish, User, Review } = require('../models/index');
const withAuth = require('../utils/auth');

//Route to get all dishes with associated user data
router.get('/', async (req,res) => {
    try {
        const dishData = await Dish.findAll({
            include: [
                {
                model: User,
                attributes: ['username'],
             },
            ],
        });
        // Serialize data so the template can read it
        const dishes = dishData.map((dish) => dish.get({ plain: true}));
        
        // Pass serialized data and session flag into template
        res.render('homepage', {
            dishes,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dish/:id', async (req, res) => {
    try {
        const dishData = await Dish.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: ['username'],
                },
                {
                    model: Review,
                    include: [
                        {
                            model: User,
                            attributes: ['username'],
                        },
                    ],
                },
            ],
        });
        const dish = dishData.get({ plain: true});

        res.render('dish', {
            ...dish,
            logged_in: req.session.logged_in
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// Route to render user's profile
router.get('/profile', withAuth, async (req, res) => {
    try {
        // Retrieve user data based on the logged-in user session
        const userData = await User.findByPk(req.session.user_id, {
            attributes: {exclude: ['password'] },
            include: [{ model: Dish }],
        });

        const user=userData.get({ plain: true });

        res.render('profile', {
            ...user,
            logged_in: true,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});


router.get('/login', (req,res) => {
    if (req.session.logged_in) {
        res.redirect('/profile');
        return;
    }

    res.render('login');
});

module.exports = router;