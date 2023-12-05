// Selector for the search bar
var searchBar = document.getElementById("searchBar");
var searchButton = document.getElementById("searchBtn");
var resultsContainer = document.getElementById("resultsContainer");


searchButton.addEventListener('click', async function (event) {
    event.preventDefault(); // Prevent form submission
    await executeRecipesCall();
});

// Function that creates an array of recipes
async function executeRecipesCall() {
    var searchTerm = searchBar.value;
        try {
            const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=4f980683&app_key=f3199e18b74f147cdd500e68e350a6a6&imageSize=LARGE`;
            
            // Fetch data from the API
            const response = await fetch(url);
            
            // Check if the response is successful (status code 200)
            if (!response.ok) {
                throw new Error(`API request failed with status: ${response.status}`);
            }
            
            // Parse the response JSON
            const data = await response.json();
    
            // Extract the hits array from the response
            const hits = data.hits;
        
        // Clear previous results
        resultsContainer.innerHTML = '';

        const apiResponse = hits; // Replace '...' with your actual API response

        // // Parse the string into an array of objects
        // const hits = apiResponse.split('},').map(item => JSON.parse(item));
        
        // Clear previous results
        resultsContainer.innerHTML = '';
        
        // Iterate through each object in the hits array
        hits.forEach(hit => {
            const recipeDiv = document.createElement('div');
            recipeDiv.className = 'recipe';
            recipeDiv.innerHTML = `
                <h3>${hit.recipe.label}</h3>
                <img src="${hit.recipe.image}" alt="${hit.recipe.label}" />
                <p>Calories: ${hit.recipe.calories.toFixed(2)}</p>
                <p>Ingredients: ${hit.recipe.ingredientLines.join(', ')}</p>
            `;
        
            // Append the main recipeDiv to the results container
            resultsContainer.appendChild(recipeDiv);
        });

    } catch (error) {
        console.error('Error fetching recipes', error);
        // You might want to provide user-friendly feedback here
    }
}


var selectedRecipe = document.getElementById("recipeId");

function executeIngredientsCall() {
    fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${selectedRecipe}&app_id=4f980683&app_key=f3199e18b74f147cdd500e68e350a6a6&imageSize=LARGE&field=ingredients`);
}
