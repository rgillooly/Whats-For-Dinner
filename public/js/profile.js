const newFormHandler = async (event) => {
    event.preventDefault();

    const name = document.querySelector('#dish-name').value.trim();
    const ingredientsInput = document.querySelector('#ingredients').value.trim();

    const ingredients = ingredientsInput.split('\n').map(ingredients => ingredients.trim());

    if (name && ingredients) {
        const response = await fetch('/api/dishes', {
            method: 'POST',
            body: JSON.stringify({ name, ingredients }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to create dish');
        }
    }
};

const delButtonhandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
        const id = event.target.getAttribute('data-id');

        const response = await fetch(`/api/dishes/${id}`, {
            method: 'DELETE',
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert('Failed to delete dish');
        }
    }
};

document
    .querySelector('.new-dish-form')
    .addEventListener('submit', newFormHandler);

document
    .querySelector('.dish-list')
    .addEventListener('click', delButtonhandler);