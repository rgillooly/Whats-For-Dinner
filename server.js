// Import express
const express = require('express');
// import sequelize
const sequelize = require('sequelize');
// import express-handlebars
const exphbs = require('express-handlebars');
// import additional modules
const session = require('express-session'); // Session middleware
const routes = require('./controllers'); // Import routes
const path = require('path'); // Path module for file path manipulation
const helpers = require('./utils/helpers'); // Custom helper functions

const SequelizeStore = require('connect-session-sequelize')(session.Store); // Sequelize session store

// Create an Express app instance
const app = express();
const PORT = process.env.PORT || 3001; // Define the port number

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'secret secret',
    cookie: {
      maxAge: 300000,
      httpOnly: true,
      secure: false,
      sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };

// Use session middleware
app.use(session(sess));

// Set Handlebars as the templating engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

// Use defined routes
app.use(routes);

// Sync the database and start the server
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  });

// load the page with a search bar (Get Request)
app.get('/', (req, res => {
    res.render('index.handlebars')
}))

// route to make an api call with the search term as a parameter
app.get('/recipes', (req, res => {
    res.fetch('https://api.edamam.com/api/recipes/v2?type=public&q=' + searchTerm + '$app_id=4f980683&app_key=f3199e18b74f147cdd500e68e350a6a6&imageSize=LARGE')
}))
d
// route to get ingredients
app.get('/recipes/ingredients', (req, res => {
    res.fetch('https://api.edamam.com/api/recipes/v2?type=public&q=' + selectedRecipe + '&app_id=4f980683&app_key=f3199e18b74f147cdd500e68e350a6a6&imageSize=LARGE&field=ingredients')
}))
// post route to sned entered dish data
 app.post('/newrecipe', (rew, res => {
    res.send( new DISH )
 }))