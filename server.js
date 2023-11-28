// Import express
const express = require('express');
// import sequelize
const sequelize = require('sequelize');
// import express-handlebars
const exphbs = require('express-handlbars');

const recipe = require('./utils/recipe.js')
// set express as app
const app = express();

// load the page with a search bar (Get Request)
app.get('/', (req, res => {
    res.render('index.handlebars')
}))

// route to make an api call with the search term as a parameter
app.get('/recipes', (req, res => {
    
}))

// route to get ingredients
app.get('/recipes/ingredients', (req, res => {
    
}))
// post route to sned entered dish data
 app.post('/newrecipe', (rew, res => {
    res.send( new DISH )
 }))