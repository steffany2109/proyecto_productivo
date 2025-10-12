document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cart-icon");
  const cartPanel = document.getElementById("cart-panel");
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const clearCart = document.getElementById("clear-cart");


  let cart = [];

  // Abrir y cerrar carrito
  cartIcon.addEventListener("click", () => {
    cartPanel.classList.toggle("open");
  });

  // Agregar productos
  document.querySelectorAll(".add-to-cart").forEach(button => {
    debugger;
    button.addEventListener("click", () => {
      const name = button.dataset.name;
      const price = parseFloat(button.dataset.price);
      const item = cart.find(p => p.name === name);

      if (item) {
        item.quantity++;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      updateCart();
    });
  });

  // Vaciar carrito
  clearCart.addEventListener("click", () => {
    cart = [];
    updateCart();
  });

  

  // Actualizar interfaz
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach(item => {
      total += item.price * item.quantity;
      const li = document.createElement("li");
      li.textContent = `${item.name} x${item.quantity} - $${item.price * item.quantity}`;
      cartItems.appendChild(li);
    });

    cartCount.textContent = cart.reduce((acc, item) => acc + item.quantity, 0);
    cartTotal.textContent = total.toLocaleString("es-CO");
  }
});
