// Import express
const express = require('express');
// import sequelize
const sequelize = require('./config/connection');
// import express-handlebars
const exphbs = require('express-handlebars');
// import additional modules
const session = require('express-session'); // Session middleware
const routes = require('./controllers'); // Import routes
const path = require('path'); // Path module for file path manipulation

const SequelizeStore = require('connect-session-sequelize')(session.Store); // Sequelize session store

// Create an Express app instance
const app = express();
const PORT = process.env.PORT || 3001; // Define the port number

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create();

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
app.get('/', (req, res) => {
    res.render('index.handlebars')
});
