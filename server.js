// Import express
const express = require('express');
// import sequelize
const sequelize = require('sequelize');
// import express-handlebars
const exphbs = require('express-handlbars');

// set express as app
const app = express();

// load the page with a search bar (Get Request)
app.get('/', (req, res => {
    res.render('index.handlebars')
}))

// route to make an api call with the search term as a parameter
app.get('/recipes', (req, res => {
    res.fetch('https://api.edamam.com/api/recipes/v2?type=public&q=' + searchTerm + '$app_id=4f980683&app_key=f3199e18b74f147cdd500e68e350a6a6&imageSize=LARGE')
}))

// route to get ingredients
app.get('/recipes/ingredients', (req, res => {
    res.fetch('https://api.edamam.com/api/recipes/v2?type=public&q=' + selectedRecipe + '&app_id=4f980683&app_key=f3199e18b74f147cdd500e68e350a6a6&imageSize=LARGE&field=ingredients')
}))
