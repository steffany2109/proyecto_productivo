document.addEventListener("DOMContentLoaded", () => {
  const cartIcon = document.getElementById("cart-icon");
  const cartPanel = document.getElementById("cart-panel");
  const closeCart = document.getElementById("close-cart");
  const cartItems = document.getElementById("cart-items");
  const cartCount = document.getElementById("cart-count");
  const cartTotal = document.getElementById("cart-total");
  const clearCart = document.getElementById("clear-cart");

  let cart = [];

  // Abrir / cerrar carrito
  cartIcon.addEventListener("click", () => {
    cartPanel.classList.toggle("open");
  });

  closeCart.addEventListener("click", () => {
    cartPanel.classList.remove("open");
  });

  // Agregar producto al carrito
  document.addEventListener("click", (e) => {
    if (e.target.classList.contains("add-to-cart")) { 
      debugger
      const idProduct = e.target.dataset.id;
      
      var option = "";
      if (!(idProduct == undefined)){
        option = document.getElementById("talla" +idProduct).value;
      }

      const name = e.target.dataset.name;
      const price = parseFloat(e.target.dataset.price);
      const selectElement = e.target.previousElementSibling; // select de tallas
      const talla = option == "" ?  "Única": option;

      const existingItem = cart.find(
        (p) => p.name === name && p.talla === talla
      );

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({ name, price, talla, quantity: 1 });
      }

      updateCart();
    }
  });

  // Vaciar carrito
  clearCart.addEventListener("click", () => {
    cart = [];
    updateCart();
  });

  // Eliminar producto individual
  cartItems.addEventListener("click", (e) => {
    if (e.target.classList.contains("remove-item")) {
      const index = e.target.dataset.index;
      cart.splice(index, 1);
      updateCart();
    }
  });

  // Actualizar el carrito
  function updateCart() {
    cartItems.innerHTML = "";
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;
debugger;
      const li = document.createElement("li");
      li.classList.add("cart-item");
      li.innerHTML = `
        <span>${item.name} (Talla ${item.talla}) x${item.quantity} - $${(
        item.price * item.quantity
      ).toLocaleString("es-CO")}</span>
        <button class="remove-item" data-index="${index}">🗑️</button>
      `;
      cartItems.appendChild(li);
    });

    cartCount.textContent = cart.reduce((acc, i) => acc + i.quantity, 0);
    cartTotal.textContent = total.toLocaleString("es-CO");
  }
});
