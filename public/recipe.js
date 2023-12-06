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
    
            const recipeDivs = [];  // Create an array to store recipeDiv elements

hits.forEach((hit, index) => {
    const recipeDiv = document.createElement('div');
    recipeDiv.className = 'recipe';
    recipeDiv.innerHTML = `
        <img src="${hit.recipe.image}" alt="${hit.recipe.label}" />
        <p>${hit.recipe.label}</p>
        <button class="favorite">Favorite This Recipe</button>
        <div id="ingredients-${index}" class='modal-hidden ingredients'>
            <p>Ingredients: ${hit.recipe.ingredientLines.join(', ')}</p>
        </div>
    `;
    
    recipeDiv.addEventListener('click', function () {
        console.log(`Div clicked for recipe: ${hit.recipe.label}`);
        var modal = document.getElementById(`ingredients-${index}`);
        
        if (modal) {  // Check if the modal element exists
            modal.classList.toggle('modal-hidden');
            modal.classList.toggle('modal-visible');
        } else {
            console.error(`Modal not found for index: ${index}`);
        }
    });

    function insertData() {
        var div1Content = document.getElementById('recipeDiv-${index}').innerText;
        var div2Content = document.getElementById('ingredients-${index}').innerText;
    
        fetch('http://localhost:3000/insert', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ div1Content, div2Content }),
        })
        .then(response => response.text())
        .then(data => {
            console.log(data); // You can handle the response from the server here
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    recipeDivs.push(recipeDiv);  // Add the recipeDiv to the array

    resultsContainer.appendChild(recipeDiv);
});            
    
        } catch (error) {
            console.error('Error fetching or parsing data:', error);
        }
    }
})
