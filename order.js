let cart = [];
let favorites = [];

// Fetch the data (using the provided JSON or external source)
fetch('order.json')  
    .then(response => response.json())
    .then(data => {
        renderMedicines(data);
    })
    .catch(error => console.log('Error fetching data:', error));

// Render medicines on the page
function renderMedicines(data) {
    const container = document.getElementById('medicine-container');
    data.categories.forEach(category => {
        const categorySection = document.createElement('div');
        categorySection.classList.add('category-section');
        categorySection.innerHTML = `<h2>${category.category}</h2>`;
        category.medicines.forEach(medicine => {
            const medicineBox = document.createElement('div');
            medicineBox.classList.add('medicine-box');
            medicineBox.innerHTML = `
                <img src="${medicine.image}" alt="${medicine.alt}">
                <h3>${medicine.name}</h3>
                <p>$${medicine.price}</p>
                <input type="number" id="quantity-${medicine.name}" value="1" min="1">
                <button onclick="addToCart('${medicine.name}', ${medicine.price})">Add to Cart</button>
            `;
            categorySection.appendChild(medicineBox);
        });
        container.appendChild(categorySection);
    });
}

// Add item to cart
function addToCart(name, price) {
    const quantityInput = document.getElementById(`quantity-${name}`);
    const quantity = parseInt(quantityInput.value, 10);

    const item = { name, price, quantity };
    cart.push(item);
    updateCartDisplay();
}

// Update the cart display
function updateCartDisplay() {
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    cartItems.innerHTML = '';

    cart.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity}</td>
            <td>$${(item.price * item.quantity).toFixed(2)}</td>
        `;
        cartItems.appendChild(row);
    });

    const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartTotal.innerHTML = `Total: $${total.toFixed(2)}`;
}

// Add to favorites
document.getElementById('add-to-favs-btn').addEventListener('click', () => {
    favorites = [...cart];
    alert('Added to Favorites!');
});

// Apply favorites to cart
document.getElementById('apply-favs-btn').addEventListener('click', () => {
    cart = [...favorites];
    updateCartDisplay();
    alert('Favorites applied to cart!');
});

// View cart
document.getElementById('view-cart-btn').addEventListener('click', () => {
    document.getElementById('cart-container').style.display = 'block';
    document.getElementById('medicine-container').style.display = 'none';
    document.getElementById('favorites-container').style.display = 'none';
});

// View favorites
document.getElementById('view-favs-btn').addEventListener('click', () => {
    const favItems = document.getElementById('fav-items');
    favItems.innerHTML = '';
    favorites.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${item.name}</td><td>${item.quantity}</td><td>$${(item.price * item.quantity).toFixed(2)}</td>`;
        favItems.appendChild(row);
    });

    document.getElementById('favorites-container').style.display = 'block';
    document.getElementById('cart-container').style.display = 'none';
    document.getElementById('medicine-container').style.display = 'none';
});

// Checkout button functionality
document.getElementById('checkout-btn').addEventListener('click', () => {
    // Save cart data in localStorage before going to checkout page
    localStorage.setItem('cart', JSON.stringify(cart));
    
    // Redirect to checkout page
    window.location.href = 'checkout.html';  // This will redirect to checkout page
});

// Back to Order Page button functionality
document.getElementById('back-to-order-btn').addEventListener('click', () => {
    document.getElementById('cart-container').style.display = 'none';
    document.getElementById('favorites-container').style.display = 'none';
    document.getElementById('medicine-container').style.display = 'block';
});
