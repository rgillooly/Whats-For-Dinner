// Authorization middleware that checks wether the user is logged in
// If not they get redirected to the login page
const withAuth = (req, res, next) => {
    if (!req.session.logged_in) {
        res.redirect('/login');
    } else {
        next();
    }
};

module.exports = withAuth;