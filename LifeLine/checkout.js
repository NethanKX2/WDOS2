// Fetch cart data from localStorage
const cart = JSON.parse(localStorage.getItem("cart")) || [];

// Function to update the order summary
function updateOrderSummary() {
  const orderSummary = document.getElementById("order-summary");
  orderSummary.innerHTML = ""; // Clear the summary before adding new items

  let total = 0;

  // Loop through cart items and display them
  cart.forEach((item) => {
    const itemRow = document.createElement("p");
    itemRow.innerHTML = `${item.name} x ${item.quantity} - $${(
      item.price * item.quantity
    ).toFixed(2)}`;
    orderSummary.appendChild(itemRow);

    total += item.price * item.quantity;
  });

  // Add total amount
  const totalRow = document.createElement("p");
  totalRow.classList.add("total");
  totalRow.innerHTML = `Total: $${total.toFixed(2)}`;
  orderSummary.appendChild(totalRow);
}

// Call the function to update the order summary
updateOrderSummary();

// Handle form submission
document
  .getElementById("payment-form")
  .addEventListener("submit", (e) => {
    e.preventDefault(); // Prevent the default form submission

    // Get form values
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const address = document.getElementById("address").value;
    const cardNumber = document.getElementById("card-number").value;
    const expDate = document.getElementById("exp-date").value;
    const cvv = document.getElementById("cvv").value;

    // Simple validation (you can improve this with more checks)
    if (!name || !email || !address || !cardNumber || !expDate || !cvv) {
      alert("Please fill in all the fields.");
      return;
    }

    // For now, let's just show a confirmation alert
    alert("Payment successful! Your order is being processed.");

    // Optionally, clear the cart after successful payment
    localStorage.removeItem("cart");

    // Redirect to the order confirmation page
    window.location.href = "confirmation.html";
  });
