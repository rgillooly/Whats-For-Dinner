// variables

// selector for the search bar
var searchBar = document.getElementById("searchBar");
// event listener for the search bar
searchBar.addEventListener("submit", executeApiCall());
// set searchterm to form content
var searchTerm = searchBar.textContent;
// function that creates an array of recipes
var recipes = [];
function executeApiCall() {
    var recipes = fetch('https://api.edamam.com/api/recipes/v2?type=public&q=' + searchTerm + '$app_id=4f980683&app_key=f3199e18b74f147cdd500e68e350a6a6&imageSize=LARGE');
}

fetch('https://api.edamam.com/api/recipes/v2?type=public&q=' + selectedRecipe + '&app_id=4f980683&app_key=f3199e18b74f147cdd500e68e350a6a6&imageSize=LARGE&field=ingredients')
// function that adds event listener to each entry
