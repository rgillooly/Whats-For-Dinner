const { v4: uuidv4 } = require('uuid');

// Selector for the search bar
var searchBar = document.getElementById("searchBar");

// Set search term to form content
var searchTerm = searchBar.textContent;

var searchButton = document.getElementById("searchBtn");

searchButton.addEventListener('click', executeRecipesCall);

// Function that creates an array of recipes
async function executeRecipesCall() {
    try {
        const url = 'https://api.edamam.com/api/recipes/v2?limit=5&type=public&q=' + searchTerm + '&app_id=4f980683&app_key=f3199e18b74f147cdd500e68e350a6a6&imageSize=LARGE';
        const response = await fetch(url);
        const hits = await response.json();
        assignUniqueIds(hits);
        return hits;
    } catch (error) {
        console.error('Error fetching recipes', error);
        throw error;
    }
}

async function fetchAndProcessHits() {
    try {
        const results = await executeRecipesCall(); // Call executeRecipesCall to get hits
        // Assuming results is an array in the fetched data
        if (Array.isArray(results)) {
            console.log('Array of recipes:', results);
        } else {
            console.error('Unexpected data structure (data may not be an array):', results);
        }
    } catch (error) {
        // Handle errors
        console.error('Error processing data:', error);
    }
}

var selectedRecipe = document.getElementById("recipeId");

function executeIngredientsCall() {
    fetch('https://api.edamam.com/api/recipes/v2?type=public&q=' + selectedRecipe + '&app_id=4f980683&app_key=f3199e18b74f147cdd500e68e350a6a6&imageSize=LARGE&field=ingredients');

function generateUniqueId() {
    return uuidv4();
}
}

function assignUniqueIds(recipes) {
    let counter = 0;

    recipes.forEach((element) => {
        // Add a unique ID property to each element
        element.uniqueId = generateUniqueId();
      
        element.counterId = counter++;
    });
}