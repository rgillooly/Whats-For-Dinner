document.addEventListener('DOMContentLoaded', function () {
    var searchBar = document.getElementById("searchBar");
    var searchButton = document.getElementById("searchBtn");
    var resultsContainer = document.getElementById("resultsContainer");
  
    searchButton.addEventListener('click', async function (event) {
        event.preventDefault(); // Prevent form submission
        await executeRecipesCall();
    });
    
    async function executeRecipesCall() {
      var searchTerm = searchBar.value;
  
      try {
        const url = `https://api.edamam.com/api/recipes/v2?type=public&q=${searchTerm}&app_id=4f980683&app_key=f3199e18b74f147cdd500e68e350a6a6&imageSize=LARGE`;
        
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`API request failed with status: ${response.status}`);
        }
        
        const data = await response.json();
        const hits = data.hits;
  
        resultsContainer.innerHTML = '';
  
        hits.forEach(hit => {
          const recipeDiv = document.createElement('div');
          recipeDiv.className = 'recipe';
          recipeDiv.innerHTML = `
            <img src="${hit.recipe.image}" alt="${hit.recipe.label}" />
            <p>${hit.recipe.label}</p>
          `;

          recipeDiv.addEventListener('click', function () {
            console.log(`Div clicked for recipe: ${hit.recipe.label}`);
            // You can navigate or perform other actions here
          });
          
          resultsContainer.appendChild(recipeDiv);
        });
  
      } catch (error) {
        console.error('Error fetching or parsing data:', error);
      }
    }
  });
  